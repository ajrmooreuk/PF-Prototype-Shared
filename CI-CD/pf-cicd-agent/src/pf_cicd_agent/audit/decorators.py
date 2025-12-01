"""
Audit decorators for automatic action logging.

Implements WBS-1.4.4: Audit decorators.
"""

import functools
from typing import Any, Callable, ParamSpec, TypeVar

from pf_cicd_agent.audit.models import AuditEventCreate, AuditEventType, AuditSeverity
from pf_cicd_agent.audit.service import AuditService


P = ParamSpec("P")
R = TypeVar("R")


def audit_action(
    event_type: AuditEventType,
    action: str,
    target_type: str | None = None,
    target_id_param: str | None = None,
    target_name_param: str | None = None,
    description: str = "",
    include_input: bool = True,
    include_output: bool = True,
    severity: AuditSeverity = AuditSeverity.INFO,
    tags: list[str] | None = None,
) -> Callable[[Callable[P, R]], Callable[P, R]]:
    """
    Decorator to automatically audit function calls.

    Args:
        event_type: Type of audit event
        action: Action identifier
        target_type: Type of target being acted upon
        target_id_param: Parameter name containing target ID
        target_name_param: Parameter name containing target name
        description: Human-readable description
        include_input: Whether to log input parameters
        include_output: Whether to log output data
        severity: Event severity level
        tags: Optional tags for the event

    Returns:
        Decorated function
    """

    def decorator(func: Callable[P, R]) -> Callable[P, R]:
        @functools.wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            # Get audit service from first argument if it's an object with _audit_service
            audit_service: AuditService | None = None

            if args and hasattr(args[0], "_audit_service"):
                audit_service = getattr(args[0], "_audit_service")
            elif args and hasattr(args[0], "audit_service"):
                audit_service = getattr(args[0], "audit_service")

            # Extract target info from parameters
            target_id: str | None = None
            target_name: str | None = None

            if target_id_param and target_id_param in kwargs:
                target_id = str(kwargs[target_id_param])
            if target_name_param and target_name_param in kwargs:
                target_name = str(kwargs[target_name_param])

            # Build input data (sanitized)
            input_data: dict[str, Any] = {}
            if include_input:
                for key, value in kwargs.items():
                    # Don't log sensitive data
                    if any(s in key.lower() for s in ["secret", "token", "password", "key"]):
                        input_data[key] = "[REDACTED]"
                    elif isinstance(value, (str, int, float, bool, list)):
                        input_data[key] = value
                    else:
                        input_data[key] = str(type(value).__name__)

            # Create event
            event = None
            if audit_service:
                event = audit_service.log_event(
                    AuditEventCreate(
                        event_type=event_type,
                        action=action,
                        description=description or f"Executing {func.__name__}",
                        severity=severity,
                        target_type=target_type,
                        target_id=target_id,
                        target_name=target_name,
                        input_data=input_data,
                        tags=tags or [],
                    )
                )

            try:
                result = func(*args, **kwargs)

                # Complete event with success
                if event and audit_service:
                    output_data: dict[str, Any] = {}
                    if include_output and result is not None:
                        if isinstance(result, dict):
                            output_data = {
                                k: v
                                for k, v in result.items()
                                if not any(s in k.lower() for s in ["secret", "token", "password"])
                            }
                        elif hasattr(result, "model_dump"):
                            output_data = {"result": "pydantic_model"}
                        else:
                            output_data = {"result": str(type(result).__name__)}

                    audit_service.complete_event(
                        event,
                        success=True,
                        output_data=output_data,
                    )

                return result

            except Exception as e:
                # Complete event with failure
                if event and audit_service:
                    audit_service.complete_event(
                        event,
                        success=False,
                        error_message=str(e),
                        error_code=type(e).__name__,
                    )
                raise

        return wrapper

    return decorator


def audit_action_async(
    event_type: AuditEventType,
    action: str,
    target_type: str | None = None,
    target_id_param: str | None = None,
    target_name_param: str | None = None,
    description: str = "",
    include_input: bool = True,
    include_output: bool = True,
    severity: AuditSeverity = AuditSeverity.INFO,
    tags: list[str] | None = None,
) -> Callable[[Callable[P, R]], Callable[P, R]]:
    """
    Async version of audit_action decorator.

    Same parameters as audit_action.
    """

    def decorator(func: Callable[P, R]) -> Callable[P, R]:
        @functools.wraps(func)
        async def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            # Get audit service
            audit_service: AuditService | None = None

            if args and hasattr(args[0], "_audit_service"):
                audit_service = getattr(args[0], "_audit_service")
            elif args and hasattr(args[0], "audit_service"):
                audit_service = getattr(args[0], "audit_service")

            # Extract target info
            target_id: str | None = None
            target_name: str | None = None

            if target_id_param and target_id_param in kwargs:
                target_id = str(kwargs[target_id_param])
            if target_name_param and target_name_param in kwargs:
                target_name = str(kwargs[target_name_param])

            # Build input data
            input_data: dict[str, Any] = {}
            if include_input:
                for key, value in kwargs.items():
                    if any(s in key.lower() for s in ["secret", "token", "password", "key"]):
                        input_data[key] = "[REDACTED]"
                    elif isinstance(value, (str, int, float, bool, list)):
                        input_data[key] = value
                    else:
                        input_data[key] = str(type(value).__name__)

            # Create event
            event = None
            if audit_service:
                event = audit_service.log_event(
                    AuditEventCreate(
                        event_type=event_type,
                        action=action,
                        description=description or f"Executing {func.__name__}",
                        severity=severity,
                        target_type=target_type,
                        target_id=target_id,
                        target_name=target_name,
                        input_data=input_data,
                        tags=tags or [],
                    )
                )

            try:
                result = await func(*args, **kwargs)

                if event and audit_service:
                    output_data: dict[str, Any] = {}
                    if include_output and result is not None:
                        if isinstance(result, dict):
                            output_data = {
                                k: v
                                for k, v in result.items()
                                if not any(s in k.lower() for s in ["secret", "token", "password"])
                            }
                        elif hasattr(result, "model_dump"):
                            output_data = {"result": "pydantic_model"}
                        else:
                            output_data = {"result": str(type(result).__name__)}

                    audit_service.complete_event(
                        event,
                        success=True,
                        output_data=output_data,
                    )

                return result

            except Exception as e:
                if event and audit_service:
                    audit_service.complete_event(
                        event,
                        success=False,
                        error_message=str(e),
                        error_code=type(e).__name__,
                    )
                raise

        return wrapper

    return decorator
