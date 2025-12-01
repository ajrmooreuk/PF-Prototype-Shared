"""
Create Droplet Tool.

Implements WBS-2.3.2: Create droplet tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.digitalocean.client import DOClient, DOClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class CreateDropletInput(BaseModel):
    """Input schema for create droplet tool."""

    name: str = Field(..., description="Droplet name")
    size: str = Field(default="s-1vcpu-1gb", description="Droplet size slug")
    region: str | None = Field(default=None, description="Region slug (default from settings)")
    image: str | None = Field(default=None, description="Image slug (default from settings)")
    backups: bool = Field(default=False, description="Enable automated backups")
    monitoring: bool = Field(default=True, description="Enable monitoring")
    tags: list[str] = Field(default_factory=list, description="Tags for the droplet")
    user_data: str | None = Field(default=None, description="Cloud-init script")
    wait_for_active: bool = Field(default=True, description="Wait for droplet to be active")


class CreateDropletOutput(BaseModel):
    """Output schema for create droplet tool."""

    id: int
    name: str
    ip_address: str | None
    status: str
    region: str
    size: str
    image: str
    tags: list[str]


class CreateDropletTool(BaseTool):
    """
    Tool for creating Digital Ocean Droplets.

    Creates a new VPS (droplet) with the specified configuration.
    """

    name = "create_droplet"
    description = """Create a new Digital Ocean Droplet (VPS).

Droplets are virtual machines used for hosting applications.
Supports various sizes, regions, and can include cloud-init scripts."""
    version = "1.0.0"
    category = "digitalocean"
    audit_event_type = AuditEventType.DROPLET_CREATE

    def __init__(
        self,
        audit_service: AuditService | None = None,
        settings: Settings | None = None,
    ) -> None:
        """Initialize the tool."""
        super().__init__(audit_service=audit_service)
        self._do_client = DOClient(settings=settings)

    def get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for tool input."""
        return {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Droplet name (must be unique)",
                },
                "size": {
                    "type": "string",
                    "description": "Size slug (e.g., s-1vcpu-1gb, s-1vcpu-2gb)",
                    "default": "s-1vcpu-1gb",
                    "enum": [
                        "s-1vcpu-1gb",
                        "s-1vcpu-2gb",
                        "s-2vcpu-4gb",
                        "s-4vcpu-8gb",
                    ],
                },
                "region": {
                    "type": "string",
                    "description": "Region slug (e.g., lon1, nyc1)",
                },
                "image": {
                    "type": "string",
                    "description": "Image slug (e.g., ubuntu-22-04-x64)",
                },
                "backups": {
                    "type": "boolean",
                    "description": "Enable automated backups",
                    "default": False,
                },
                "monitoring": {
                    "type": "boolean",
                    "description": "Enable monitoring",
                    "default": True,
                },
                "tags": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Tags for the droplet",
                    "default": [],
                },
                "user_data": {
                    "type": "string",
                    "description": "Cloud-init user data script",
                },
                "wait_for_active": {
                    "type": "boolean",
                    "description": "Wait for droplet to be active",
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
            errors.append("Droplet name is required")
        elif len(name) > 128:
            errors.append("Droplet name must be 128 characters or less")

        return errors

    def execute(self, **kwargs: Any) -> ToolResult[CreateDropletOutput]:
        """
        Execute the create droplet tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with droplet info
        """
        # Validate input
        errors = self.validate_input(**kwargs)
        if errors:
            return ToolResult.error(
                error="; ".join(errors),
                error_code="VALIDATION_ERROR",
            )

        input_data = CreateDropletInput(**kwargs)

        # Check if droplet with same name exists
        existing = self._do_client.get_droplet_by_name(input_data.name)
        if existing:
            return ToolResult.error(
                error=f"Droplet with name '{input_data.name}' already exists",
                error_code="DROPLET_EXISTS",
            )

        try:
            # Create the droplet
            droplet = self._do_client.create_droplet(
                name=input_data.name,
                size=input_data.size,
                region=input_data.region,
                image=input_data.image,
                backups=input_data.backups,
                monitoring=input_data.monitoring,
                tags=input_data.tags,
                user_data=input_data.user_data,
            )

            # Wait for droplet to be active if requested
            if input_data.wait_for_active:
                droplet = self._do_client.wait_for_droplet(droplet)

            output = CreateDropletOutput(
                id=droplet.id,
                name=droplet.name,
                ip_address=droplet.ip_address,
                status=droplet.status,
                region=droplet.region["slug"],
                size=droplet.size_slug,
                image=droplet.image["slug"],
                tags=droplet.tags,
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Droplet '{droplet.name}' created successfully (IP: {droplet.ip_address})",
            )

        except DOClientError as e:
            raise ToolError(
                message=e.message,
                code="DO_ERROR",
                details=e.details,
            )
