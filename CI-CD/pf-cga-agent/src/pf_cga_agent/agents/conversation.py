"""Conversation handling for CGA Agent."""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any
from uuid import UUID, uuid4

import structlog

logger = structlog.get_logger()


@dataclass
class Message:
    """A message in a conversation."""

    id: UUID = field(default_factory=uuid4)
    role: str = "user"  # 'user', 'assistant', 'system'
    content: str = ""
    timestamp: datetime = field(default_factory=datetime.utcnow)
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class ConversationState:
    """State of a conversation session."""

    session_id: UUID
    messages: list[Message] = field(default_factory=list)
    context: dict[str, Any] = field(default_factory=dict)
    analysis_request: Any | None = None
    analysis_report: Any | None = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


class ConversationHandler:
    """Handles conversation state and message management."""

    def __init__(self, session_id: UUID | None = None):
        """Initialize conversation handler.

        Args:
            session_id: Optional session ID, generates new one if not provided
        """
        self._state = ConversationState(session_id=session_id or uuid4())
        self._logger = structlog.get_logger().bind(
            session_id=str(self._state.session_id)
        )

    @property
    def session_id(self) -> UUID:
        """Get the session ID."""
        return self._state.session_id

    @property
    def messages(self) -> list[Message]:
        """Get all messages in the conversation."""
        return self._state.messages

    @property
    def context(self) -> dict[str, Any]:
        """Get conversation context."""
        return self._state.context

    def add_message(
        self,
        role: str,
        content: str,
        metadata: dict[str, Any] | None = None,
    ) -> Message:
        """Add a message to the conversation.

        Args:
            role: Message role ('user', 'assistant', 'system')
            content: Message content
            metadata: Optional metadata

        Returns:
            The created message
        """
        message = Message(
            role=role,
            content=content,
            metadata=metadata or {},
        )
        self._state.messages.append(message)
        self._state.updated_at = datetime.utcnow()

        self._logger.info(
            "Message added",
            role=role,
            content_length=len(content),
        )

        return message

    def add_user_message(self, content: str) -> Message:
        """Add a user message."""
        return self.add_message("user", content)

    def add_assistant_message(self, content: str) -> Message:
        """Add an assistant message."""
        return self.add_message("assistant", content)

    def add_system_message(self, content: str) -> Message:
        """Add a system message."""
        return self.add_message("system", content)

    def set_context(self, key: str, value: Any) -> None:
        """Set a context value.

        Args:
            key: Context key
            value: Context value
        """
        self._state.context[key] = value
        self._state.updated_at = datetime.utcnow()

    def get_context(self, key: str, default: Any = None) -> Any:
        """Get a context value.

        Args:
            key: Context key
            default: Default value if key not found

        Returns:
            Context value or default
        """
        return self._state.context.get(key, default)

    def set_analysis_request(self, request: Any) -> None:
        """Store the current analysis request."""
        self._state.analysis_request = request
        self._state.updated_at = datetime.utcnow()

    def set_analysis_report(self, report: Any) -> None:
        """Store the analysis report."""
        self._state.analysis_report = report
        self._state.updated_at = datetime.utcnow()

    def get_messages_for_api(self) -> list[dict[str, str]]:
        """Get messages formatted for Claude API.

        Returns:
            List of message dicts with role and content
        """
        return [
            {"role": msg.role, "content": msg.content}
            for msg in self._state.messages
            if msg.role in ("user", "assistant")
        ]

    def get_last_n_messages(self, n: int) -> list[Message]:
        """Get the last N messages.

        Args:
            n: Number of messages to return

        Returns:
            Last N messages
        """
        return self._state.messages[-n:] if n > 0 else []

    def clear(self) -> None:
        """Clear the conversation history."""
        self._state.messages = []
        self._state.context = {}
        self._state.analysis_request = None
        self._state.analysis_report = None
        self._state.updated_at = datetime.utcnow()

        self._logger.info("Conversation cleared")

    def to_dict(self) -> dict[str, Any]:
        """Serialize conversation state to dictionary.

        Returns:
            Dictionary representation of conversation
        """
        return {
            "session_id": str(self._state.session_id),
            "messages": [
                {
                    "id": str(msg.id),
                    "role": msg.role,
                    "content": msg.content,
                    "timestamp": msg.timestamp.isoformat(),
                    "metadata": msg.metadata,
                }
                for msg in self._state.messages
            ],
            "context": self._state.context,
            "created_at": self._state.created_at.isoformat(),
            "updated_at": self._state.updated_at.isoformat(),
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ConversationHandler":
        """Deserialize conversation from dictionary.

        Args:
            data: Dictionary representation

        Returns:
            ConversationHandler instance
        """
        handler = cls(session_id=UUID(data["session_id"]))
        handler._state.context = data.get("context", {})
        handler._state.created_at = datetime.fromisoformat(data["created_at"])
        handler._state.updated_at = datetime.fromisoformat(data["updated_at"])

        for msg_data in data.get("messages", []):
            handler._state.messages.append(
                Message(
                    id=UUID(msg_data["id"]),
                    role=msg_data["role"],
                    content=msg_data["content"],
                    timestamp=datetime.fromisoformat(msg_data["timestamp"]),
                    metadata=msg_data.get("metadata", {}),
                )
            )

        return handler
