"""
Set Secret Tool.

Implements WBS-2.2.5: Set secret tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.github.client import GitHubClient, GitHubClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class SetSecretInput(BaseModel):
    """Input schema for set secret tool."""

    repo_name: str = Field(..., description="Repository name")
    secret_name: str = Field(..., description="Secret name")
    secret_value: str = Field(..., description="Secret value")
    environment_name: str | None = Field(
        default=None, description="Environment name (for environment secrets)"
    )


class SetSecretOutput(BaseModel):
    """Output schema for set secret tool."""

    repo_name: str
    secret_name: str
    environment_name: str | None
    scope: str


class SetSecretTool(BaseTool):
    """
    Tool for setting repository or environment secrets.

    Sets encrypted secrets that can be used in GitHub Actions workflows.
    Supports both repository-level and environment-level secrets.
    """

    name = "set_secret"
    description = """Set a secret for a GitHub repository or environment.

Secrets are encrypted and can be used in GitHub Actions workflows.
Environment secrets are scoped to a specific deployment environment."""
    version = "1.0.0"
    category = "github"
    audit_event_type = AuditEventType.SECRET_SET

    def __init__(
        self,
        audit_service: AuditService | None = None,
        settings: Settings | None = None,
    ) -> None:
        """Initialize the tool."""
        super().__init__(audit_service=audit_service)
        self._github_client = GitHubClient(settings=settings)

    def get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for tool input."""
        return {
            "type": "object",
            "properties": {
                "repo_name": {
                    "type": "string",
                    "description": "Repository name",
                },
                "secret_name": {
                    "type": "string",
                    "description": "Secret name (uppercase with underscores recommended)",
                },
                "secret_value": {
                    "type": "string",
                    "description": "Secret value",
                },
                "environment_name": {
                    "type": "string",
                    "description": "Environment name for environment-scoped secrets (optional)",
                },
            },
            "required": ["repo_name", "secret_name", "secret_value"],
        }

    def validate_input(self, **kwargs: Any) -> list[str]:
        """Validate input parameters."""
        errors = []

        secret_name = kwargs.get("secret_name", "")
        if not secret_name:
            errors.append("Secret name is required")
        elif not secret_name.replace("_", "").isalnum():
            errors.append("Secret name must be alphanumeric with underscores")
        elif secret_name.startswith("GITHUB_"):
            errors.append("Secret name cannot start with GITHUB_")

        secret_value = kwargs.get("secret_value", "")
        if not secret_value:
            errors.append("Secret value is required")

        return errors

    def execute(self, **kwargs: Any) -> ToolResult[SetSecretOutput]:
        """
        Execute the set secret tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with secret info (value is not returned)
        """
        # Validate input
        errors = self.validate_input(**kwargs)
        if errors:
            return ToolResult.error(
                error="; ".join(errors),
                error_code="VALIDATION_ERROR",
            )

        input_data = SetSecretInput(**kwargs)

        # Check repo exists
        if not self._github_client.repo_exists(input_data.repo_name):
            return ToolResult.error(
                error=f"Repository '{input_data.repo_name}' not found",
                error_code="REPO_NOT_FOUND",
            )

        try:
            if input_data.environment_name:
                # Set environment secret
                self._github_client.set_environment_secret(
                    repo_name=input_data.repo_name,
                    environment_name=input_data.environment_name,
                    secret_name=input_data.secret_name,
                    secret_value=input_data.secret_value,
                )
                scope = f"environment:{input_data.environment_name}"
            else:
                # Set repository secret
                self._github_client.set_repo_secret(
                    repo_name=input_data.repo_name,
                    secret_name=input_data.secret_name,
                    secret_value=input_data.secret_value,
                )
                scope = "repository"

            output = SetSecretOutput(
                repo_name=input_data.repo_name,
                secret_name=input_data.secret_name,
                environment_name=input_data.environment_name,
                scope=scope,
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Secret '{input_data.secret_name}' set successfully ({scope})",
            )

        except GitHubClientError as e:
            raise ToolError(
                message=e.message,
                code="GITHUB_ERROR",
                details={"status_code": e.status_code},
            )
