"""
CI/CD Orchestrator Agent.

Implements WBS-2.4.2 & WBS-2.4.4: Primary orchestrator agent with tool integration.
"""

from typing import Any, Callable
from uuid import uuid4

import structlog
from anthropic import Anthropic

from pf_cicd_agent.agents.system_prompt import SYSTEM_PROMPT
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.audit.models import AuditEventCreate, AuditEventType
from pf_cicd_agent.config.settings import Settings, get_settings
from pf_cicd_agent.tools.registry import ToolRegistry
from pf_cicd_agent.tools.github import (
    CreateRepoTool,
    BranchProtectionTool,
    CreateEnvironmentTool,
    SetSecretTool,
    CreateWorkflowTool,
)
from pf_cicd_agent.tools.digitalocean import (
    CreateDropletTool,
    ConfigureFirewallTool,
    BootstrapDropletTool,
    CreateDNSRecordTool,
)


logger = structlog.get_logger(__name__)


class CICDOrchestrator:
    """
    Primary CI/CD Orchestrator Agent.

    Uses Claude to orchestrate infrastructure provisioning and
    deployment operations through available tools.
    """

    def __init__(
        self,
        settings: Settings | None = None,
        audit_service: AuditService | None = None,
        tool_registry: ToolRegistry | None = None,
        progress_callback: Callable[[str, dict[str, Any]], None] | None = None,
    ) -> None:
        """
        Initialize the orchestrator.

        Args:
            settings: Application settings
            audit_service: Audit service for logging
            tool_registry: Pre-configured tool registry
            progress_callback: Optional callback for progress updates
        """
        self.settings = settings or get_settings()
        self.audit_service = audit_service or AuditService(settings=self.settings)
        self.progress_callback = progress_callback

        # Initialize Anthropic client
        self._client = Anthropic(api_key=self.settings.anthropic_api_key.get_secret_value())

        # Initialize tool registry
        self.tools = tool_registry or self._create_tool_registry()

        # Conversation state
        self._messages: list[dict[str, Any]] = []
        self._session_id = uuid4()

        logger.info(
            "orchestrator_initialized",
            session_id=str(self._session_id),
            tool_count=len(self.tools),
        )

    def _create_tool_registry(self) -> ToolRegistry:
        """Create and populate the tool registry."""
        registry = ToolRegistry(audit_service=self.audit_service)

        # Register GitHub tools
        registry.register(CreateRepoTool)
        registry.register(BranchProtectionTool)
        registry.register(CreateEnvironmentTool)
        registry.register(SetSecretTool)
        registry.register(CreateWorkflowTool)

        # Register Digital Ocean tools
        registry.register(CreateDropletTool)
        registry.register(ConfigureFirewallTool)
        registry.register(BootstrapDropletTool)
        registry.register(CreateDNSRecordTool)

        return registry

    def _report_progress(self, status: str, data: dict[str, Any] | None = None) -> None:
        """Report progress to callback if set."""
        if self.progress_callback:
            self.progress_callback(status, data or {})

    def start_session(self) -> str:
        """
        Start a new agent session.

        Returns:
            Session ID
        """
        self._session_id = uuid4()
        self._messages = []
        self.audit_service.start_session()

        self.audit_service.log_event(
            AuditEventCreate(
                event_type=AuditEventType.AGENT_START,
                action="session.start",
                description="CI/CD Orchestrator session started",
                metadata={"session_id": str(self._session_id)},
            )
        )

        logger.info("session_started", session_id=str(self._session_id))
        return str(self._session_id)

    def end_session(self) -> dict[str, Any]:
        """
        End the current session.

        Returns:
            Session summary
        """
        summary = self.audit_service.get_session_summary()
        self.audit_service.end_session(success=True, summary=summary)

        logger.info("session_ended", session_id=str(self._session_id), summary=summary)
        return summary

    def chat(self, user_message: str) -> str:
        """
        Process a user message and return the agent's response.

        Args:
            user_message: The user's message

        Returns:
            Agent's response text
        """
        # Add user message to history
        self._messages.append({"role": "user", "content": user_message})

        # Log the interaction
        self.audit_service.log_event(
            AuditEventCreate(
                event_type=AuditEventType.TOOL_INVOKE,
                action="chat.user_message",
                description="User message received",
                input_data={"message_preview": user_message[:100]},
            )
        )

        self._report_progress("processing", {"message": "Processing your request..."})

        # Get response from Claude
        response = self._get_response()

        # Process the response (may involve tool calls)
        final_response = self._process_response(response)

        # Add assistant response to history
        self._messages.append({"role": "assistant", "content": final_response})

        return final_response

    def _get_response(self) -> Any:
        """Get a response from Claude."""
        return self._client.messages.create(
            model=self.settings.agent_model,
            max_tokens=self.settings.agent_max_tokens,
            system=SYSTEM_PROMPT,
            tools=self.tools.get_definitions(),
            messages=self._messages,
        )

    def _process_response(self, response: Any) -> str:
        """
        Process Claude's response, handling tool calls if needed.

        Args:
            response: Claude API response

        Returns:
            Final text response
        """
        # Check if response contains tool calls
        while response.stop_reason == "tool_use":
            # Extract tool calls from response
            tool_calls = [
                block for block in response.content if block.type == "tool_use"
            ]

            # Execute each tool call
            tool_results = []
            for tool_call in tool_calls:
                self._report_progress(
                    "executing_tool",
                    {"tool": tool_call.name, "id": tool_call.id},
                )

                result = self._execute_tool(tool_call.name, tool_call.input)

                tool_results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": tool_call.id,
                        "content": str(result.data) if result.is_success else result.error,
                        "is_error": result.is_error,
                    }
                )

                self._report_progress(
                    "tool_complete",
                    {
                        "tool": tool_call.name,
                        "success": result.is_success,
                        "message": result.message,
                    },
                )

            # Add assistant message with tool use and results
            self._messages.append(
                {"role": "assistant", "content": response.content}
            )
            self._messages.append(
                {"role": "user", "content": tool_results}
            )

            # Get next response
            response = self._get_response()

        # Extract final text response
        text_blocks = [block for block in response.content if hasattr(block, "text")]
        return "\n".join(block.text for block in text_blocks)

    def _execute_tool(self, tool_name: str, tool_input: dict[str, Any]) -> Any:
        """
        Execute a tool by name.

        Args:
            tool_name: Name of the tool
            tool_input: Tool input parameters

        Returns:
            ToolResult from execution
        """
        logger.info("executing_tool", tool=tool_name, input_keys=list(tool_input.keys()))

        result = self.tools.execute(tool_name, **tool_input)

        logger.info(
            "tool_executed",
            tool=tool_name,
            success=result.is_success,
            duration_ms=result.duration_ms,
        )

        return result

    def execute_command(self, command: str, **kwargs: Any) -> dict[str, Any]:
        """
        Execute a direct command without chat interface.

        Useful for programmatic usage.

        Args:
            command: Command to execute
            **kwargs: Command parameters

        Returns:
            Command result
        """
        # Map common commands to tool executions
        command_map = {
            "create_repo": "create_repo",
            "create_droplet": "create_droplet",
            "configure_branch_protection": "configure_branch_protection",
            "create_environment": "create_environment",
            "set_secret": "set_secret",
            "create_workflow": "create_workflow",
            "configure_firewall": "configure_firewall",
            "bootstrap_droplet": "bootstrap_droplet",
            "create_dns_record": "create_dns_record",
        }

        tool_name = command_map.get(command)
        if not tool_name:
            return {
                "success": False,
                "error": f"Unknown command: {command}",
            }

        result = self.tools.execute(tool_name, **kwargs)
        return {
            "success": result.is_success,
            "data": result.data,
            "message": result.message,
            "error": result.error,
        }

    def get_available_tools(self) -> list[dict[str, Any]]:
        """
        Get list of available tools.

        Returns:
            List of tool definitions
        """
        return [
            {
                "name": tool.name,
                "description": tool.description,
                "category": tool.category,
            }
            for tool in self.tools
        ]

    @property
    def session_id(self) -> str:
        """Get current session ID."""
        return str(self._session_id)

    @property
    def message_count(self) -> int:
        """Get number of messages in current session."""
        return len(self._messages)
