"""
Create Repository Tool.

Implements WBS-2.2.2: Create repository tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.github.client import GitHubClient, GitHubClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class CreateRepoInput(BaseModel):
    """Input schema for create_repo tool."""

    name: str = Field(..., description="Repository name")
    description: str = Field(default="", description="Repository description")
    private: bool = Field(default=True, description="Whether repository is private")
    template_repo: str | None = Field(
        default=None, description="Template repository to use"
    )
    has_issues: bool = Field(default=True, description="Enable issues")
    has_wiki: bool = Field(default=False, description="Enable wiki")
    has_projects: bool = Field(default=True, description="Enable projects")
    auto_init: bool = Field(default=True, description="Initialize with README")


class CreateRepoOutput(BaseModel):
    """Output schema for create_repo tool."""

    name: str
    full_name: str
    html_url: str
    clone_url: str
    ssh_url: str
    private: bool
    default_branch: str


class CreateRepoTool(BaseTool):
    """
    Tool for creating GitHub repositories.

    Creates a new repository in the configured organization,
    optionally from a template.
    """

    name = "create_repo"
    description = """Create a new GitHub repository in the organization.

Can create an empty repository or from a template. Supports configuring
visibility, features (issues, wiki, projects), and initialization options."""
    version = "1.0.0"
    category = "github"
    audit_event_type = AuditEventType.REPO_CREATE

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
                "name": {
                    "type": "string",
                    "description": "Repository name (without organization prefix)",
                },
                "description": {
                    "type": "string",
                    "description": "Repository description",
                    "default": "",
                },
                "private": {
                    "type": "boolean",
                    "description": "Whether the repository is private",
                    "default": True,
                },
                "template_repo": {
                    "type": "string",
                    "description": "Name of template repository to use (optional)",
                },
                "has_issues": {
                    "type": "boolean",
                    "description": "Enable issues",
                    "default": True,
                },
                "has_wiki": {
                    "type": "boolean",
                    "description": "Enable wiki",
                    "default": False,
                },
                "has_projects": {
                    "type": "boolean",
                    "description": "Enable projects",
                    "default": True,
                },
                "auto_init": {
                    "type": "boolean",
                    "description": "Initialize with README",
                    "default": True,
                },
            },
            "required": ["name"],
        }

    def validate_input(self, **kwargs: Any) -> list[str]:
        """Validate input parameters."""
        errors = []

        name = kwargs.get("name", "")
        if not name:
            errors.append("Repository name is required")
        elif not name.replace("-", "").replace("_", "").isalnum():
            errors.append("Repository name must be alphanumeric with hyphens/underscores")
        elif len(name) > 100:
            errors.append("Repository name must be 100 characters or less")

        return errors

    def execute(self, **kwargs: Any) -> ToolResult[CreateRepoOutput]:
        """
        Execute the create_repo tool.

        Args:
            **kwargs: Tool parameters matching CreateRepoInput

        Returns:
            ToolResult with repository information
        """
        # Validate input
        errors = self.validate_input(**kwargs)
        if errors:
            return ToolResult.error(
                error="; ".join(errors),
                error_code="VALIDATION_ERROR",
            )

        # Parse input
        input_data = CreateRepoInput(**kwargs)

        # Check if repo already exists
        if self._github_client.repo_exists(input_data.name):
            return ToolResult.error(
                error=f"Repository '{input_data.name}' already exists",
                error_code="REPO_EXISTS",
            )

        try:
            # Create the repository
            repo = self._github_client.create_repo(
                name=input_data.name,
                description=input_data.description,
                private=input_data.private,
                auto_init=input_data.auto_init,
                has_issues=input_data.has_issues,
                has_wiki=input_data.has_wiki,
                has_projects=input_data.has_projects,
                template_repo=input_data.template_repo,
            )

            # Build output
            output = CreateRepoOutput(
                name=repo.name,
                full_name=repo.full_name,
                html_url=repo.html_url,
                clone_url=repo.clone_url,
                ssh_url=repo.ssh_url,
                private=repo.private,
                default_branch=repo.default_branch or "main",
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Repository '{repo.full_name}' created successfully",
            )

        except GitHubClientError as e:
            raise ToolError(
                message=e.message,
                code="GITHUB_ERROR",
                details={"status_code": e.status_code},
                retryable=e.status_code in [500, 502, 503, 504] if e.status_code else False,
            )
