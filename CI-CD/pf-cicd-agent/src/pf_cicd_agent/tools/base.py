"""
Base Tool Framework.

Implements WBS-2.1.1 & WBS-2.1.3: Tool base class and result handling.
"""

from abc import ABC, abstractmethod
from datetime import datetime
from enum import Enum
from typing import Any, Generic, TypeVar

import structlog
from pydantic import BaseModel, Field

from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService


logger = structlog.get_logger(__name__)


class ToolStatus(str, Enum):
    """Status of a tool execution."""

    SUCCESS = "success"
    ERROR = "error"
    PARTIAL = "partial"
    SKIPPED = "skipped"


class ToolError(Exception):
    """Custom exception for tool errors."""

    def __init__(
        self,
        message: str,
        code: str | None = None,
        details: dict[str, Any] | None = None,
        retryable: bool = False,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.code = code or "TOOL_ERROR"
        self.details = details or {}
        self.retryable = retryable


T = TypeVar("T")


class ToolResult(BaseModel, Generic[T]):
    """
    Result of a tool execution.

    Generic type T represents the data payload type.
    """

    status: ToolStatus = Field(default=ToolStatus.SUCCESS)
    message: str = Field(default="")
    data: Any = Field(default=None)  # Using Any due to Pydantic generic limitations
    error: str | None = Field(default=None)
    error_code: str | None = Field(default=None)
    duration_ms: int = Field(default=0)
    metadata: dict[str, Any] = Field(default_factory=dict)

    @classmethod
    def success(
        cls,
        data: T | None = None,
        message: str = "Operation completed successfully",
        metadata: dict[str, Any] | None = None,
    ) -> "ToolResult[T]":
        """Create a success result."""
        return cls(
            status=ToolStatus.SUCCESS,
            message=message,
            data=data,
            metadata=metadata or {},
        )

    @classmethod
    def error(
        cls,
        error: str,
        error_code: str = "ERROR",
        data: T | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> "ToolResult[T]":
        """Create an error result."""
        return cls(
            status=ToolStatus.ERROR,
            message=error,
            data=data,
            error=error,
            error_code=error_code,
            metadata=metadata or {},
        )

    @classmethod
    def partial(
        cls,
        message: str,
        data: T | None = None,
        error: str | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> "ToolResult[T]":
        """Create a partial success result."""
        return cls(
            status=ToolStatus.PARTIAL,
            message=message,
            data=data,
            error=error,
            metadata=metadata or {},
        )

    @property
    def is_success(self) -> bool:
        """Check if result is successful."""
        return self.status == ToolStatus.SUCCESS

    @property
    def is_error(self) -> bool:
        """Check if result is an error."""
        return self.status == ToolStatus.ERROR


class ToolInput(BaseModel):
    """Base class for tool input parameters."""

    pass


class ToolDefinition(BaseModel):
    """Definition of a tool for Claude."""

    name: str = Field(..., description="Tool name")
    description: str = Field(..., description="Tool description")
    input_schema: dict[str, Any] = Field(..., description="JSON schema for input")


class BaseTool(ABC):
    """
    Abstract base class for all tools.

    Provides:
    - Standard execution interface
    - Audit logging integration
    - Error handling
    - Retry logic support
    """

    # Tool metadata (override in subclasses)
    name: str = "base_tool"
    description: str = "Base tool description"
    version: str = "1.0.0"
    category: str = "general"

    # Audit configuration
    audit_event_type: AuditEventType = AuditEventType.TOOL_INVOKE

    def __init__(self, audit_service: AuditService | None = None) -> None:
        """
        Initialize the tool.

        Args:
            audit_service: Optional audit service for logging
        """
        self._audit_service = audit_service
        self._logger = structlog.get_logger(self.__class__.__name__)

    @property
    def audit_service(self) -> AuditService | None:
        """Get the audit service."""
        return self._audit_service

    @abstractmethod
    def get_input_schema(self) -> dict[str, Any]:
        """
        Get the JSON schema for tool input.

        Returns:
            JSON schema dict
        """
        pass

    @abstractmethod
    def execute(self, **kwargs: Any) -> ToolResult[Any]:
        """
        Execute the tool with given parameters.

        Args:
            **kwargs: Tool-specific parameters

        Returns:
            ToolResult with execution outcome
        """
        pass

    def get_definition(self) -> ToolDefinition:
        """
        Get the tool definition for Claude.

        Returns:
            ToolDefinition for the Anthropic API
        """
        return ToolDefinition(
            name=self.name,
            description=self.description,
            input_schema=self.get_input_schema(),
        )

    def to_anthropic_tool(self) -> dict[str, Any]:
        """
        Convert to Anthropic tool format.

        Returns:
            Dict in Anthropic tool format
        """
        return {
            "name": self.name,
            "description": self.description,
            "input_schema": self.get_input_schema(),
        }

    def run(self, **kwargs: Any) -> ToolResult[Any]:
        """
        Run the tool with logging and error handling.

        This is the main entry point that wraps execute()
        with audit logging and error handling.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with execution outcome
        """
        start_time = datetime.utcnow()

        # Log start
        self._logger.info(
            "tool_start",
            tool=self.name,
            params={k: v for k, v in kwargs.items() if "secret" not in k.lower()},
        )

        # Audit event
        audit_event = None
        if self._audit_service:
            from pf_cicd_agent.audit.models import AuditEventCreate

            audit_event = self._audit_service.log_event(
                AuditEventCreate(
                    event_type=self.audit_event_type,
                    action=f"tool.{self.name}",
                    description=f"Executing tool: {self.name}",
                    metadata={"params": {k: "***" if "secret" in k.lower() else v for k, v in kwargs.items()}},
                )
            )

        try:
            result = self.execute(**kwargs)

            # Calculate duration
            duration = datetime.utcnow() - start_time
            result.duration_ms = int(duration.total_seconds() * 1000)

            # Log completion
            self._logger.info(
                "tool_complete",
                tool=self.name,
                status=result.status.value,
                duration_ms=result.duration_ms,
            )

            # Complete audit
            if audit_event and self._audit_service:
                self._audit_service.complete_event(
                    audit_event,
                    success=result.is_success,
                    output_data={"status": result.status.value, "message": result.message},
                )

            return result

        except ToolError as e:
            duration = datetime.utcnow() - start_time
            self._logger.error(
                "tool_error",
                tool=self.name,
                error=e.message,
                code=e.code,
                duration_ms=int(duration.total_seconds() * 1000),
            )

            if audit_event and self._audit_service:
                self._audit_service.complete_event(
                    audit_event,
                    success=False,
                    error_message=e.message,
                    error_code=e.code,
                )

            return ToolResult.error(
                error=e.message,
                error_code=e.code,
                metadata=e.details,
            )

        except Exception as e:
            duration = datetime.utcnow() - start_time
            self._logger.exception(
                "tool_exception",
                tool=self.name,
                error=str(e),
                duration_ms=int(duration.total_seconds() * 1000),
            )

            if audit_event and self._audit_service:
                self._audit_service.complete_event(
                    audit_event,
                    success=False,
                    error_message=str(e),
                    error_code=type(e).__name__,
                )

            return ToolResult.error(
                error=str(e),
                error_code=type(e).__name__,
            )

    def validate_input(self, **kwargs: Any) -> list[str]:
        """
        Validate input parameters.

        Override in subclasses for custom validation.

        Args:
            **kwargs: Input parameters

        Returns:
            List of validation errors (empty if valid)
        """
        return []

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(name={self.name}, version={self.version})>"
