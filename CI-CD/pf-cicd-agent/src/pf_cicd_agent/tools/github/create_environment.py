"""
Create Environment Tool.

Implements WBS-2.2.4: Create deployment environment tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.github.client import GitHubClient, GitHubClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class CreateEnvironmentInput(BaseModel):
    """Input schema for create environment tool."""

    repo_name: str = Field(..., description="Repository name")
    environment_name: str = Field(..., description="Environment name")
    wait_timer: int = Field(
        default=0, ge=0, le=43200, description="Wait timer in minutes (0-43200)"
    )
    reviewers: list[str] = Field(
        default_factory=list, description="GitHub usernames of required reviewers"
    )


class CreateEnvironmentOutput(BaseModel):
    """Output schema for create environment tool."""

    repo_name: str
    environment_name: str
    wait_timer: int
    reviewers: list[str]
    url: str


class CreateEnvironmentTool(BaseTool):
    """
    Tool for creating GitHub deployment environments.

    Creates environments with optional protection rules
    like wait timers and required reviewers.
    """

    name = "create_environment"
    description = """Create a GitHub deployment environment for a repository.

Environments are used to organize deployments (dev, staging, production)
and can include protection rules like required reviewers and wait timers."""
    version = "1.0.0"
    category = "github"
    audit_event_type = AuditEventType.ENVIRONMENT_CREATE

    def __init__(
        self,
        audit_service: AuditService | None = None,
        settings: Settings | None = None,
    ) -> None:
        """Initialize the tool."""
        super().__init__(audit_service=audit_service)
        self._github_client = GitHubClient(settings=settings)
        self._settings = settings

    def get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for tool input."""
        return {
            "type": "object",
            "properties": {
                "repo_name": {
                    "type": "string",
                    "description": "Repository name",
                },
                "environment_name": {
                    "type": "string",
                    "description": "Environment name (e.g., development, staging, production)",
                },
                "wait_timer": {
                    "type": "integer",
                    "description": "Wait timer in minutes before deployment can proceed",
                    "default": 0,
                    "minimum": 0,
                    "maximum": 43200,
                },
                "reviewers": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "GitHub usernames of required reviewers",
                    "default": [],
                },
            },
            "required": ["repo_name", "environment_name"],
        }

    def execute(self, **kwargs: Any) -> ToolResult[CreateEnvironmentOutput]:
        """
        Execute the create environment tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with environment info
        """
        input_data = CreateEnvironmentInput(**kwargs)

        # Check repo exists
        if not self._github_client.repo_exists(input_data.repo_name):
            return ToolResult.error(
                error=f"Repository '{input_data.repo_name}' not found",
                error_code="REPO_NOT_FOUND",
            )

        try:
            result = self._github_client.create_environment(
                repo_name=input_data.repo_name,
                environment_name=input_data.environment_name,
                wait_timer=input_data.wait_timer,
                reviewers=input_data.reviewers if input_data.reviewers else None,
            )

            # Build environment URL
            settings = self._settings or self._github_client.settings
            env_url = f"https://github.com/{settings.github_org}/{input_data.repo_name}/settings/environments/{input_data.environment_name}"

            output = CreateEnvironmentOutput(
                repo_name=input_data.repo_name,
                environment_name=input_data.environment_name,
                wait_timer=input_data.wait_timer,
                reviewers=input_data.reviewers,
                url=env_url,
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Environment '{input_data.environment_name}' created for {input_data.repo_name}",
            )

        except GitHubClientError as e:
            raise ToolError(
                message=e.message,
                code="GITHUB_ERROR",
                details={"status_code": e.status_code},
            )
