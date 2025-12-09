"""
Create Workflow Tool.

Implements WBS-2.2.6: Create workflow tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.github.client import GitHubClient, GitHubClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class CreateWorkflowInput(BaseModel):
    """Input schema for create workflow tool."""

    repo_name: str = Field(..., description="Repository name")
    workflow_name: str = Field(..., description="Workflow filename (e.g., ci.yml)")
    workflow_content: str = Field(..., description="YAML content of the workflow")
    commit_message: str = Field(
        default="Add workflow", description="Commit message for the workflow file"
    )
    branch: str = Field(default="main", description="Branch to commit to")


class CreateWorkflowOutput(BaseModel):
    """Output schema for create workflow tool."""

    repo_name: str
    workflow_name: str
    workflow_path: str
    commit_sha: str
    branch: str


class CreateWorkflowTool(BaseTool):
    """
    Tool for creating GitHub Actions workflow files.

    Creates or updates workflow YAML files in the .github/workflows directory.
    """

    name = "create_workflow"
    description = """Create or update a GitHub Actions workflow file.

Workflows are defined in YAML and placed in .github/workflows/.
This tool creates the file and commits it to the repository."""
    version = "1.0.0"
    category = "github"
    audit_event_type = AuditEventType.WORKFLOW_CREATE

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
                "workflow_name": {
                    "type": "string",
                    "description": "Workflow filename (e.g., ci.yml, deploy-prod.yml)",
                },
                "workflow_content": {
                    "type": "string",
                    "description": "YAML content of the GitHub Actions workflow",
                },
                "commit_message": {
                    "type": "string",
                    "description": "Commit message",
                    "default": "Add workflow",
                },
                "branch": {
                    "type": "string",
                    "description": "Branch to commit the workflow to",
                    "default": "main",
                },
            },
            "required": ["repo_name", "workflow_name", "workflow_content"],
        }

    def validate_input(self, **kwargs: Any) -> list[str]:
        """Validate input parameters."""
        errors = []

        workflow_name = kwargs.get("workflow_name", "")
        if not workflow_name:
            errors.append("Workflow name is required")
        elif not workflow_name.endswith((".yml", ".yaml")):
            errors.append("Workflow name must end with .yml or .yaml")

        workflow_content = kwargs.get("workflow_content", "")
        if not workflow_content:
            errors.append("Workflow content is required")
        elif "name:" not in workflow_content:
            errors.append("Workflow content must include a 'name:' field")
        elif "on:" not in workflow_content:
            errors.append("Workflow content must include an 'on:' trigger field")

        return errors

    def execute(self, **kwargs: Any) -> ToolResult[CreateWorkflowOutput]:
        """
        Execute the create workflow tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with workflow info
        """
        # Validate input
        errors = self.validate_input(**kwargs)
        if errors:
            return ToolResult.error(
                error="; ".join(errors),
                error_code="VALIDATION_ERROR",
            )

        input_data = CreateWorkflowInput(**kwargs)

        # Check repo exists
        if not self._github_client.repo_exists(input_data.repo_name):
            return ToolResult.error(
                error=f"Repository '{input_data.repo_name}' not found",
                error_code="REPO_NOT_FOUND",
            )

        try:
            # Build workflow path
            workflow_path = f".github/workflows/{input_data.workflow_name}"

            # Create/update the file
            result = self._github_client.create_file(
                repo_name=input_data.repo_name,
                path=workflow_path,
                content=input_data.workflow_content,
                message=input_data.commit_message,
                branch=input_data.branch,
            )

            output = CreateWorkflowOutput(
                repo_name=input_data.repo_name,
                workflow_name=input_data.workflow_name,
                workflow_path=workflow_path,
                commit_sha=result["sha"],
                branch=input_data.branch,
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Workflow '{input_data.workflow_name}' created in {input_data.repo_name}",
            )

        except GitHubClientError as e:
            raise ToolError(
                message=e.message,
                code="GITHUB_ERROR",
                details={"status_code": e.status_code},
            )
