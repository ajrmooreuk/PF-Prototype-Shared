"""
Audit Service.

Implements WBS-1.4.2 & WBS-1.4.3: Audit service with Supabase storage.
"""

from datetime import datetime
from typing import Any
from uuid import UUID, uuid4

import structlog
from supabase import Client, create_client

from pf_cicd_agent.audit.models import (
    AuditEvent,
    AuditEventCreate,
    AuditEventType,
    AuditSeverity,
)
from pf_cicd_agent.config.settings import Settings, get_settings


logger = structlog.get_logger(__name__)


class AuditService:
    """
    Service for recording and querying audit events.

    Provides:
    - Event creation and storage
    - Session management
    - Event querying and filtering
    - Supabase integration
    """

    def __init__(
        self,
        settings: Settings | None = None,
        supabase_client: Client | None = None,
    ) -> None:
        """
        Initialize the audit service.

        Args:
            settings: Application settings
            supabase_client: Optional pre-configured Supabase client
        """
        self.settings = settings or get_settings()
        self._client = supabase_client
        self._session_id: UUID | None = None
        self._in_memory_events: list[AuditEvent] = []

    @property
    def client(self) -> Client | None:
        """Get or create Supabase client."""
        if self._client is None and self.settings.audit_enabled:
            try:
                self._client = create_client(
                    self.settings.supabase_url,
                    self.settings.supabase_service_role_key.get_secret_value(),
                )
            except Exception as e:
                logger.warning("Failed to create Supabase client for audit", error=str(e))
        return self._client

    def start_session(self) -> UUID:
        """
        Start a new audit session.

        Returns:
            New session UUID
        """
        self._session_id = uuid4()
        self.log_event(
            AuditEventCreate(
                event_type=AuditEventType.AGENT_START,
                action="session.start",
                description="Audit session started",
                metadata={"session_id": str(self._session_id)},
            )
        )
        return self._session_id

    def end_session(self, success: bool = True, summary: dict[str, Any] | None = None) -> None:
        """
        End the current audit session.

        Args:
            success: Whether the session completed successfully
            summary: Optional session summary data
        """
        self.log_event(
            AuditEventCreate(
                event_type=AuditEventType.AGENT_COMPLETE,
                action="session.end",
                description="Audit session ended",
                severity=AuditSeverity.INFO if success else AuditSeverity.ERROR,
                metadata={"summary": summary or {}},
            )
        )
        self._session_id = None

    @property
    def session_id(self) -> UUID | None:
        """Get current session ID."""
        return self._session_id

    def log_event(
        self,
        event_create: AuditEventCreate,
        correlation_id: UUID | None = None,
        parent_event_id: UUID | None = None,
    ) -> AuditEvent:
        """
        Log an audit event.

        Args:
            event_create: Event creation data
            correlation_id: Optional correlation ID for request tracing
            parent_event_id: Optional parent event ID for nested events

        Returns:
            Created AuditEvent
        """
        event = AuditEvent(
            event_type=event_create.event_type,
            action=event_create.action,
            description=event_create.description,
            severity=event_create.severity,
            target_type=event_create.target_type,
            target_id=event_create.target_id,
            target_name=event_create.target_name,
            input_data=event_create.input_data,
            metadata=event_create.metadata,
            tags=event_create.tags,
            session_id=self._session_id,
            correlation_id=correlation_id,
            parent_event_id=parent_event_id,
            started_at=datetime.utcnow(),
        )

        # Store event
        self._store_event(event)

        # Log to structured logger
        logger.info(
            "audit_event",
            event_type=event.event_type.value,
            action=event.action,
            target=event.target_id,
            severity=event.severity.value,
        )

        return event

    def complete_event(
        self,
        event: AuditEvent,
        success: bool = True,
        output_data: dict[str, Any] | None = None,
        error_message: str | None = None,
        error_code: str | None = None,
    ) -> AuditEvent:
        """
        Complete an in-progress event.

        Args:
            event: The event to complete
            success: Whether the action succeeded
            output_data: Optional output/result data
            error_message: Optional error message
            error_code: Optional error code

        Returns:
            Updated AuditEvent
        """
        event.completed_at = datetime.utcnow()
        event.success = success
        event.output_data = output_data or {}
        event.error_message = error_message
        event.error_code = error_code

        if event.started_at:
            delta = event.completed_at - event.started_at
            event.duration_ms = int(delta.total_seconds() * 1000)

        if not success:
            event.severity = AuditSeverity.ERROR

        # Update stored event
        self._update_event(event)

        return event

    def _store_event(self, event: AuditEvent) -> None:
        """Store an event in Supabase or in-memory."""
        # Always store in memory for session access
        self._in_memory_events.append(event)

        # Store in Supabase if available
        if self.settings.audit_enabled and self.client:
            try:
                self.client.table(self.settings.audit_table).insert(
                    event.to_supabase_record()
                ).execute()
            except Exception as e:
                logger.error("Failed to store audit event in Supabase", error=str(e))

    def _update_event(self, event: AuditEvent) -> None:
        """Update an event in Supabase."""
        if self.settings.audit_enabled and self.client:
            try:
                self.client.table(self.settings.audit_table).update(
                    event.to_supabase_record()
                ).eq("event_id", str(event.event_id)).execute()
            except Exception as e:
                logger.error("Failed to update audit event in Supabase", error=str(e))

    def get_session_events(self, session_id: UUID | None = None) -> list[AuditEvent]:
        """
        Get all events for a session.

        Args:
            session_id: Session ID (defaults to current session)

        Returns:
            List of events in the session
        """
        target_session = session_id or self._session_id
        return [e for e in self._in_memory_events if e.session_id == target_session]

    def get_events_by_type(
        self,
        event_type: AuditEventType,
        limit: int = 100,
    ) -> list[AuditEvent]:
        """
        Get events by type.

        Args:
            event_type: Type of events to retrieve
            limit: Maximum number of events

        Returns:
            List of matching events
        """
        matching = [e for e in self._in_memory_events if e.event_type == event_type]
        return matching[-limit:]

    def get_failed_events(self, session_id: UUID | None = None) -> list[AuditEvent]:
        """
        Get all failed events.

        Args:
            session_id: Optional session filter

        Returns:
            List of failed events
        """
        events = self._in_memory_events
        if session_id:
            events = [e for e in events if e.session_id == session_id]
        return [e for e in events if not e.success]

    def get_session_summary(self, session_id: UUID | None = None) -> dict[str, Any]:
        """
        Get a summary of session events.

        Args:
            session_id: Session ID (defaults to current session)

        Returns:
            Summary dict with event counts and stats
        """
        events = self.get_session_events(session_id)

        event_types: dict[str, int] = {}
        for e in events:
            event_types[e.event_type.value] = event_types.get(e.event_type.value, 0) + 1

        total_duration = sum(e.duration_ms or 0 for e in events)
        failed_count = len([e for e in events if not e.success])

        return {
            "session_id": str(session_id or self._session_id),
            "total_events": len(events),
            "failed_events": failed_count,
            "success_rate": (len(events) - failed_count) / len(events) if events else 0,
            "total_duration_ms": total_duration,
            "event_types": event_types,
        }

    def query_events(
        self,
        event_type: AuditEventType | None = None,
        target_type: str | None = None,
        target_id: str | None = None,
        success: bool | None = None,
        since: datetime | None = None,
        limit: int = 100,
    ) -> list[AuditEvent]:
        """
        Query events with filters (from Supabase if available).

        Args:
            event_type: Filter by event type
            target_type: Filter by target type
            target_id: Filter by target ID
            success: Filter by success status
            since: Filter events after this time
            limit: Maximum results

        Returns:
            List of matching events
        """
        if self.client and self.settings.audit_enabled:
            query = self.client.table(self.settings.audit_table).select("*")

            if event_type:
                query = query.eq("event_type", event_type.value)
            if target_type:
                query = query.eq("target_type", target_type)
            if target_id:
                query = query.eq("target_id", target_id)
            if success is not None:
                query = query.eq("success", success)
            if since:
                query = query.gte("timestamp", since.isoformat())

            query = query.limit(limit).order("timestamp", desc=True)

            try:
                result = query.execute()
                return [AuditEvent(**record) for record in result.data]
            except Exception as e:
                logger.error("Failed to query audit events", error=str(e))

        # Fallback to in-memory
        events = self._in_memory_events

        if event_type:
            events = [e for e in events if e.event_type == event_type]
        if target_type:
            events = [e for e in events if e.target_type == target_type]
        if target_id:
            events = [e for e in events if e.target_id == target_id]
        if success is not None:
            events = [e for e in events if e.success == success]
        if since:
            events = [e for e in events if e.timestamp >= since]

        return events[-limit:]
