"""
Configure Firewall Tool.

Implements WBS-2.3.3: Configure firewall tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.digitalocean.client import DOClient, DOClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class FirewallRule(BaseModel):
    """Single firewall rule."""

    protocol: str = Field(default="tcp", description="Protocol (tcp, udp, icmp)")
    ports: str = Field(..., description="Port or port range (e.g., '22', '80-443', 'all')")
    addresses: list[str] = Field(
        default_factory=lambda: ["0.0.0.0/0", "::/0"],
        description="Source/destination addresses",
    )


class ConfigureFirewallInput(BaseModel):
    """Input schema for configure firewall tool."""

    name: str = Field(..., description="Firewall name")
    inbound_rules: list[FirewallRule] = Field(
        default_factory=lambda: [
            FirewallRule(protocol="tcp", ports="22"),
            FirewallRule(protocol="tcp", ports="80"),
            FirewallRule(protocol="tcp", ports="443"),
        ],
        description="Inbound firewall rules",
    )
    outbound_rules: list[FirewallRule] = Field(
        default_factory=lambda: [
            FirewallRule(protocol="tcp", ports="all"),
            FirewallRule(protocol="udp", ports="all"),
        ],
        description="Outbound firewall rules",
    )
    droplet_ids: list[int] = Field(
        default_factory=list, description="Droplet IDs to attach"
    )
    tags: list[str] = Field(default_factory=list, description="Tags for the firewall")


class ConfigureFirewallOutput(BaseModel):
    """Output schema for configure firewall tool."""

    id: str
    name: str
    inbound_rules_count: int
    outbound_rules_count: int
    droplet_ids: list[int]
    status: str


class ConfigureFirewallTool(BaseTool):
    """
    Tool for creating and configuring Digital Ocean firewalls.

    Creates a cloud firewall with specified inbound and outbound rules.
    """

    name = "configure_firewall"
    description = """Create or configure a Digital Ocean cloud firewall.

Firewalls control network access to droplets. Supports TCP, UDP, and ICMP rules
with port ranges and CIDR address blocks."""
    version = "1.0.0"
    category = "digitalocean"
    audit_event_type = AuditEventType.FIREWALL_CONFIGURE

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
                    "description": "Firewall name",
                },
                "inbound_rules": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "protocol": {
                                "type": "string",
                                "enum": ["tcp", "udp", "icmp"],
                                "default": "tcp",
                            },
                            "ports": {
                                "type": "string",
                                "description": "Port number, range (80-443), or 'all'",
                            },
                            "addresses": {
                                "type": "array",
                                "items": {"type": "string"},
                                "default": ["0.0.0.0/0", "::/0"],
                            },
                        },
                        "required": ["ports"],
                    },
                    "description": "Inbound firewall rules",
                },
                "outbound_rules": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "protocol": {
                                "type": "string",
                                "enum": ["tcp", "udp", "icmp"],
                                "default": "tcp",
                            },
                            "ports": {
                                "type": "string",
                                "description": "Port number, range, or 'all'",
                            },
                            "addresses": {
                                "type": "array",
                                "items": {"type": "string"},
                                "default": ["0.0.0.0/0", "::/0"],
                            },
                        },
                        "required": ["ports"],
                    },
                    "description": "Outbound firewall rules",
                },
                "droplet_ids": {
                    "type": "array",
                    "items": {"type": "integer"},
                    "description": "Droplet IDs to attach to the firewall",
                    "default": [],
                },
                "tags": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Tags for the firewall",
                    "default": [],
                },
            },
            "required": ["name"],
        }

    def execute(self, **kwargs: Any) -> ToolResult[ConfigureFirewallOutput]:
        """
        Execute the configure firewall tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with firewall info
        """
        input_data = ConfigureFirewallInput(**kwargs)

        try:
            # Convert rules to format expected by client
            inbound = [
                {
                    "protocol": rule.protocol,
                    "ports": rule.ports,
                    "sources": {"addresses": rule.addresses},
                }
                for rule in input_data.inbound_rules
            ]
            outbound = [
                {
                    "protocol": rule.protocol,
                    "ports": rule.ports,
                    "destinations": {"addresses": rule.addresses},
                }
                for rule in input_data.outbound_rules
            ]

            # Create the firewall
            firewall = self._do_client.create_firewall(
                name=input_data.name,
                inbound_rules=inbound,
                outbound_rules=outbound,
                droplet_ids=input_data.droplet_ids,
                tags=input_data.tags,
            )

            output = ConfigureFirewallOutput(
                id=firewall.id,
                name=firewall.name,
                inbound_rules_count=len(input_data.inbound_rules),
                outbound_rules_count=len(input_data.outbound_rules),
                droplet_ids=input_data.droplet_ids,
                status="active",
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"Firewall '{firewall.name}' configured successfully",
            )

        except DOClientError as e:
            raise ToolError(
                message=e.message,
                code="DO_ERROR",
                details=e.details,
            )
