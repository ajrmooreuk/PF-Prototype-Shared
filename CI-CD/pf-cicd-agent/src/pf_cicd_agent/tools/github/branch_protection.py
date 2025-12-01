"""
Branch Protection Tool.

Implements WBS-2.2.3: Configure branch protection tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.github.client import GitHubClient, GitHubClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class BranchProtectionInput(BaseModel):
    """Input schema for branch protection tool."""

    repo_name: str = Field(..., description="Repository name")
    branch: str = Field(default="main", description="Branch to protect")
    required_reviews: int = Field(
        default=1, ge=0, le=6, description="Required approving reviews"
    )
    dismiss_stale_reviews: bool = Field(
        default=True, description="Dismiss stale reviews on new pushes"
    )
    require_code_owner_reviews: bool = Field(
        default=False, description="Require code owner review"
    )
    required_status_checks: list[str] = Field(
        default_factory=list, description="Required status check names"
    )
    enforce_admins: bool = Field(
        default=True, description="Enforce rules for admins"
    )


class BranchProtectionOutput(BaseModel):
    """Output schema for branch protection tool."""

    repo_name: str
    branch: str
    required_reviews: int
    status_checks: list[str]
    enforce_admins: bool


class BranchProtectionTool(BaseTool):
    """
    Tool for configuring branch protection rules.

    Sets up branch protection including required reviews,
    status checks, and admin enforcement.
    """

    name = "configure_branch_protection"
    description = """Configure branch protection rules for a repository.

Sets up required approvals, status checks, and admin enforcement
to protect important branches like main and develop."""
    version = "1.0.0"
    category = "github"
    audit_event_type = AuditEventType.BRANCH_PROTECTION_SET

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
                "branch": {
                    "type": "string",
                    "description": "Branch to protect",
                    "default": "main",
                },
                "required_reviews": {
                    "type": "integer",
                    "description": "Number of required approving reviews (0-6)",
                    "default": 1,
                    "minimum": 0,
                    "maximum": 6,
                },
                "dismiss_stale_reviews": {
                    "type": "boolean",
                    "description": "Dismiss stale reviews when new commits are pushed",
                    "default": True,
                },
                "require_code_owner_reviews": {
                    "type": "boolean",
                    "description": "Require review from code owners",
                    "default": False,
                },
                "required_status_checks": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Names of required status checks",
                    "default": [],
                },
                "enforce_admins": {
                    "type": "boolean",
                    "description": "Enforce rules for administrators",
                    "default": True,
                },
            },
            "required": ["repo_name"],
        }

    def execute(self, **kwargs: Any) -> ToolResult[BranchProtectionOutput]:
        """
        Execute the branch protection configuration.

        Args:
            **kwargs: Tool parameters matching BranchProtectionInput

        Returns:
            ToolResult with protection settings
        """
        input_data = BranchProtectionInput(**kwargs)

        # Check repo exists
        if not self._github_client.repo_exists(input_data.repo_name):
            return ToolResult.error(
                error=f"Repository '{input_data.repo_name}' not found",
                error_code="REPO_NOT_FOUND",
            )

        try:
            result = self._github_client.set_branch_protection(
                repo_name=input_data.repo_name,
                branch=input_data.branch,
                required_approving_review_count=input_data.required_reviews,
                dismiss_stale_reviews=input_data.dismiss_stale_reviews,
                require_code_owner_reviews=input_data.require_code_owner_reviews,
                required_status_checks=input_data.required_status_checks,
                enforce_admins=input_data.enforce_admins,
            )

            output = BranchProtectionOutput(
                repo_name=input_data.repo_name,
                branch=input_data.branch,
                required_reviews=input_data.required_reviews,
                status_checks=input_data.required_status_checks,
                enforce_admins=input_data.enforce_admins,
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Branch protection configured for {input_data.repo_name}:{input_data.branch}",
            )

        except GitHubClientError as e:
            raise ToolError(
                message=e.message,
                code="GITHUB_ERROR",
                details={"status_code": e.status_code},
            )
