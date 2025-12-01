"""
Conversation Handler.

Implements WBS-2.4.3: Conversation handling for the agent.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any
from uuid import UUID, uuid4

import structlog


logger = structlog.get_logger(__name__)


@dataclass
class Message:
    """Represents a message in the conversation."""

    id: UUID = field(default_factory=uuid4)
    role: str = "user"  # user, assistant, system
    content: str = ""
    timestamp: datetime = field(default_factory=datetime.utcnow)
    metadata: dict[str, Any] = field(default_factory=dict)
    tool_calls: list[dict[str, Any]] = field(default_factory=list)
    tool_results: list[dict[str, Any]] = field(default_factory=list)


@dataclass
class ConversationState:
    """Tracks the state of a conversation."""

    id: UUID = field(default_factory=uuid4)
    messages: list[Message] = field(default_factory=list)
    context: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)

    # Current operation state
    current_operation: str | None = None
    operation_step: int = 0
    pending_confirmations: list[str] = field(default_factory=list)


class ConversationHandler:
    """
    Handles conversation state and context management.

    Provides:
    - Message history management
    - Context extraction and tracking
    - Multi-turn conversation support
    - Operation state tracking
    """

    def __init__(self, max_history: int = 50) -> None:
        """
        Initialize the conversation handler.

        Args:
            max_history: Maximum messages to keep in history
        """
        self.max_history = max_history
        self._state = ConversationState()

    @property
    def state(self) -> ConversationState:
        """Get current conversation state."""
        return self._state

    @property
    def conversation_id(self) -> str:
        """Get conversation ID."""
        return str(self._state.id)

    def new_conversation(self) -> str:
        """
        Start a new conversation.

        Returns:
            New conversation ID
        """
        self._state = ConversationState()
        logger.info("new_conversation", id=str(self._state.id))
        return str(self._state.id)

    def add_user_message(self, content: str, metadata: dict[str, Any] | None = None) -> Message:
        """
        Add a user message to the conversation.

        Args:
            content: Message content
            metadata: Optional metadata

        Returns:
            Created Message
        """
        message = Message(
            role="user",
            content=content,
            metadata=metadata or {},
        )
        self._add_message(message)
        return message

    def add_assistant_message(
        self,
        content: str,
        tool_calls: list[dict[str, Any]] | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> Message:
        """
        Add an assistant message to the conversation.

        Args:
            content: Message content
            tool_calls: Optional tool calls made
            metadata: Optional metadata

        Returns:
            Created Message
        """
        message = Message(
            role="assistant",
            content=content,
            tool_calls=tool_calls or [],
            metadata=metadata or {},
        )
        self._add_message(message)
        return message

    def add_tool_result(
        self,
        tool_name: str,
        tool_call_id: str,
        result: Any,
        success: bool = True,
    ) -> None:
        """
        Add a tool result to the most recent assistant message.

        Args:
            tool_name: Name of the tool
            tool_call_id: Tool call ID
            result: Tool result
            success: Whether tool succeeded
        """
        # Find most recent assistant message
        for message in reversed(self._state.messages):
            if message.role == "assistant":
                message.tool_results.append(
                    {
                        "tool_name": tool_name,
                        "tool_call_id": tool_call_id,
                        "result": result,
                        "success": success,
                    }
                )
                break

    def _add_message(self, message: Message) -> None:
        """Add a message and maintain history limit."""
        self._state.messages.append(message)
        self._state.updated_at = datetime.utcnow()

        # Trim history if needed
        if len(self._state.messages) > self.max_history:
            self._state.messages = self._state.messages[-self.max_history :]

    def get_messages_for_api(self) -> list[dict[str, Any]]:
        """
        Get messages formatted for the Claude API.

        Returns:
            List of message dicts
        """
        return [
            {
                "role": msg.role,
                "content": msg.content,
            }
            for msg in self._state.messages
            if msg.role in ("user", "assistant")
        ]

    def get_context(self, key: str, default: Any = None) -> Any:
        """
        Get a context value.

        Args:
            key: Context key
            default: Default value

        Returns:
            Context value
        """
        return self._state.context.get(key, default)

    def set_context(self, key: str, value: Any) -> None:
        """
        Set a context value.

        Args:
            key: Context key
            value: Context value
        """
        self._state.context[key] = value
        self._state.updated_at = datetime.utcnow()

    def update_context(self, updates: dict[str, Any]) -> None:
        """
        Update multiple context values.

        Args:
            updates: Context updates
        """
        self._state.context.update(updates)
        self._state.updated_at = datetime.utcnow()

    def clear_context(self) -> None:
        """Clear all context."""
        self._state.context = {}

    def start_operation(self, operation_name: str) -> None:
        """
        Start tracking an operation.

        Args:
            operation_name: Name of the operation
        """
        self._state.current_operation = operation_name
        self._state.operation_step = 0
        logger.info("operation_started", operation=operation_name)

    def advance_operation(self, step_name: str | None = None) -> int:
        """
        Advance the operation step.

        Args:
            step_name: Optional step name for logging

        Returns:
            Current step number
        """
        self._state.operation_step += 1
        if step_name:
            logger.info(
                "operation_step",
                operation=self._state.current_operation,
                step=self._state.operation_step,
                name=step_name,
            )
        return self._state.operation_step

    def end_operation(self, success: bool = True) -> None:
        """
        End the current operation.

        Args:
            success: Whether operation succeeded
        """
        logger.info(
            "operation_ended",
            operation=self._state.current_operation,
            steps=self._state.operation_step,
            success=success,
        )
        self._state.current_operation = None
        self._state.operation_step = 0

    def request_confirmation(self, action: str) -> None:
        """
        Request user confirmation for an action.

        Args:
            action: Action description
        """
        self._state.pending_confirmations.append(action)

    def confirm_action(self, action: str) -> bool:
        """
        Confirm a pending action.

        Args:
            action: Action to confirm

        Returns:
            True if action was pending and is now confirmed
        """
        if action in self._state.pending_confirmations:
            self._state.pending_confirmations.remove(action)
            return True
        return False

    def has_pending_confirmations(self) -> bool:
        """Check if there are pending confirmations."""
        return len(self._state.pending_confirmations) > 0

    def get_summary(self) -> dict[str, Any]:
        """
        Get a summary of the conversation.

        Returns:
            Conversation summary
        """
        user_messages = [m for m in self._state.messages if m.role == "user"]
        assistant_messages = [m for m in self._state.messages if m.role == "assistant"]

        tool_calls_count = sum(
            len(m.tool_calls) for m in assistant_messages
        )

        return {
            "conversation_id": str(self._state.id),
            "message_count": len(self._state.messages),
            "user_messages": len(user_messages),
            "assistant_messages": len(assistant_messages),
            "tool_calls": tool_calls_count,
            "current_operation": self._state.current_operation,
            "context_keys": list(self._state.context.keys()),
            "created_at": self._state.created_at.isoformat(),
            "updated_at": self._state.updated_at.isoformat(),
        }

    def extract_intent(self, message: str) -> dict[str, Any]:
        """
        Extract intent from a user message.

        Basic intent extraction - can be enhanced with NLP.

        Args:
            message: User message

        Returns:
            Extracted intent information
        """
        message_lower = message.lower()

        # Define intent patterns
        intents = {
            "provision": ["create", "provision", "set up", "setup", "deploy", "new"],
            "configure": ["configure", "update", "modify", "change", "edit"],
            "delete": ["delete", "remove", "destroy", "tear down"],
            "query": ["show", "list", "get", "what", "status", "check"],
            "help": ["help", "how", "explain", "what can"],
        }

        # Detect intent
        detected_intents = []
        for intent, keywords in intents.items():
            if any(kw in message_lower for kw in keywords):
                detected_intents.append(intent)

        # Detect target entities
        entities = {
            "instance": ["instance", "air", "baiv", "w4m"],
            "product": ["product", "ep", "vhf", "wwg", "endv", "rnor"],
            "repository": ["repo", "repository"],
            "droplet": ["droplet", "server", "vm"],
            "environment": ["dev", "staging", "prod", "production", "development"],
        }

        detected_entities = []
        for entity, keywords in entities.items():
            if any(kw in message_lower for kw in keywords):
                detected_entities.append(entity)

        return {
            "intents": detected_intents or ["unknown"],
            "entities": detected_entities,
            "confidence": 0.8 if detected_intents else 0.3,
        }
