"""
Audit event models.

Implements WBS-1.4.1: Design audit event schema.
"""

from datetime import datetime
from enum import Enum
from typing import Any
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class AuditEventType(str, Enum):
    """Types of auditable events."""

    # Repository events
    REPO_CREATE = "repo.create"
    REPO_CONFIGURE = "repo.configure"
    REPO_DELETE = "repo.delete"

    # Branch protection events
    BRANCH_PROTECTION_SET = "branch.protection.set"
    BRANCH_PROTECTION_REMOVE = "branch.protection.remove"

    # Environment events
    ENVIRONMENT_CREATE = "environment.create"
    ENVIRONMENT_UPDATE = "environment.update"
    ENVIRONMENT_DELETE = "environment.delete"

    # Secret events
    SECRET_SET = "secret.set"
    SECRET_DELETE = "secret.delete"

    # Workflow events
    WORKFLOW_CREATE = "workflow.create"
    WORKFLOW_UPDATE = "workflow.update"
    WORKFLOW_TRIGGER = "workflow.trigger"

    # Infrastructure events
    DROPLET_CREATE = "droplet.create"
    DROPLET_DELETE = "droplet.delete"
    DROPLET_BOOTSTRAP = "droplet.bootstrap"
    FIREWALL_CONFIGURE = "firewall.configure"
    DNS_CREATE = "dns.create"

    # Database events
    DATABASE_CREATE = "database.create"
    MIGRATION_RUN = "migration.run"
    RLS_CONFIGURE = "rls.configure"

    # Agent events
    AGENT_START = "agent.start"
    AGENT_COMPLETE = "agent.complete"
    AGENT_ERROR = "agent.error"
    TOOL_INVOKE = "tool.invoke"
    TOOL_COMPLETE = "tool.complete"
    TOOL_ERROR = "tool.error"

    # Provisioning events
    INSTANCE_PROVISION = "instance.provision"
    PRODUCT_PROVISION = "product.provision"
    WHITELABEL_PROVISION = "whitelabel.provision"

    # Deployment events
    DEPLOY_START = "deploy.start"
    DEPLOY_COMPLETE = "deploy.complete"
    DEPLOY_FAIL = "deploy.fail"
    ROLLBACK_START = "rollback.start"
    ROLLBACK_COMPLETE = "rollback.complete"

    # Configuration events
    CONFIG_LOAD = "config.load"
    CONFIG_VALIDATE = "config.validate"
    CONFIG_MERGE = "config.merge"


class AuditSeverity(str, Enum):
    """Severity levels for audit events."""

    DEBUG = "debug"
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"


class AuditEvent(BaseModel):
    """
    Audit event record.

    Captures all relevant information about an action performed
    by the CI/CD agent for compliance and debugging purposes.
    """

    # Event identification
    event_id: UUID = Field(default_factory=uuid4)
    event_type: AuditEventType
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    # Context
    session_id: UUID | None = Field(default=None, description="Agent session ID")
    correlation_id: UUID | None = Field(default=None, description="Request correlation ID")
    parent_event_id: UUID | None = Field(default=None, description="Parent event for nesting")

    # Actor information
    actor_type: str = Field(default="agent", description="Type of actor (agent, user, system)")
    actor_id: str | None = Field(default=None, description="Identifier of the actor")

    # Target information
    target_type: str | None = Field(default=None, description="Type of target (repo, droplet, etc.)")
    target_id: str | None = Field(default=None, description="Identifier of the target")
    target_name: str | None = Field(default=None, description="Human-readable target name")

    # Event details
    action: str = Field(..., description="Action performed")
    description: str = Field(default="", description="Human-readable description")
    severity: AuditSeverity = Field(default=AuditSeverity.INFO)

    # Request/Response data
    input_data: dict[str, Any] = Field(default_factory=dict, description="Input parameters")
    output_data: dict[str, Any] = Field(default_factory=dict, description="Output/result data")

    # Status
    success: bool = Field(default=True)
    error_message: str | None = Field(default=None)
    error_code: str | None = Field(default=None)

    # Duration tracking
    started_at: datetime | None = Field(default=None)
    completed_at: datetime | None = Field(default=None)
    duration_ms: int | None = Field(default=None)

    # Metadata
    metadata: dict[str, Any] = Field(default_factory=dict)
    tags: list[str] = Field(default_factory=list)

    def to_supabase_record(self) -> dict[str, Any]:
        """Convert to a format suitable for Supabase insertion."""
        record = self.model_dump(mode="json")
        # Convert UUID to string
        for key in ["event_id", "session_id", "correlation_id", "parent_event_id"]:
            if record.get(key):
                record[key] = str(record[key])
        return record


class AuditEventCreate(BaseModel):
    """Schema for creating an audit event."""

    event_type: AuditEventType
    action: str
    description: str = ""
    severity: AuditSeverity = AuditSeverity.INFO
    target_type: str | None = None
    target_id: str | None = None
    target_name: str | None = None
    input_data: dict[str, Any] = Field(default_factory=dict)
    metadata: dict[str, Any] = Field(default_factory=dict)
    tags: list[str] = Field(default_factory=list)
