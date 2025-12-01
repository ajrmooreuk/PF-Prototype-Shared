"""
Create DNS Record Tool.

Implements WBS-2.3.5: Create DNS record tool.
"""

from typing import Any

from pydantic import BaseModel, Field

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.digitalocean.client import DOClient, DOClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class CreateDNSRecordInput(BaseModel):
    """Input schema for create DNS record tool."""

    domain: str = Field(..., description="Domain name (must exist in DO)")
    record_type: str = Field(
        default="A",
        description="Record type (A, AAAA, CNAME, TXT, MX, NS, SRV)",
    )
    name: str = Field(..., description="Record name (subdomain or @ for root)")
    data: str = Field(..., description="Record data (IP for A, target for CNAME)")
    ttl: int = Field(default=3600, ge=30, description="Time to live in seconds")
    priority: int | None = Field(default=None, description="Priority (for MX, SRV)")


class CreateDNSRecordOutput(BaseModel):
    """Output schema for create DNS record tool."""

    id: int
    domain: str
    record_type: str
    name: str
    data: str
    ttl: int
    fqdn: str


class CreateDNSRecordTool(BaseTool):
    """
    Tool for creating DNS records in Digital Ocean.

    Creates DNS records in an existing Digital Ocean managed domain.
    """

    name = "create_dns_record"
    description = """Create a DNS record in a Digital Ocean managed domain.

Supports A, AAAA, CNAME, TXT, MX, NS, and SRV record types.
The domain must already exist and be managed by Digital Ocean."""
    version = "1.0.0"
    category = "digitalocean"
    audit_event_type = AuditEventType.DNS_CREATE

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
                "domain": {
                    "type": "string",
                    "description": "Domain name (must be managed by Digital Ocean)",
                },
                "record_type": {
                    "type": "string",
                    "description": "DNS record type",
                    "enum": ["A", "AAAA", "CNAME", "TXT", "MX", "NS", "SRV"],
                    "default": "A",
                },
                "name": {
                    "type": "string",
                    "description": "Record name (subdomain). Use @ for root domain.",
                },
                "data": {
                    "type": "string",
                    "description": "Record data (IP address for A, target for CNAME, etc.)",
                },
                "ttl": {
                    "type": "integer",
                    "description": "Time to live in seconds",
                    "default": 3600,
                    "minimum": 30,
                },
                "priority": {
                    "type": "integer",
                    "description": "Priority (required for MX and SRV records)",
                },
            },
            "required": ["domain", "name", "data"],
        }

    def validate_input(self, **kwargs: Any) -> list[str]:
        """Validate input parameters."""
        errors = []

        record_type = kwargs.get("record_type", "A")
        data = kwargs.get("data", "")

        # Validate A record has valid IP
        if record_type == "A":
            parts = data.split(".")
            if len(parts) != 4 or not all(
                p.isdigit() and 0 <= int(p) <= 255 for p in parts
            ):
                errors.append(f"Invalid IPv4 address for A record: {data}")

        # MX and SRV require priority
        if record_type in ["MX", "SRV"] and kwargs.get("priority") is None:
            errors.append(f"Priority is required for {record_type} records")

        return errors

    def execute(self, **kwargs: Any) -> ToolResult[CreateDNSRecordOutput]:
        """
        Execute the create DNS record tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with record info
        """
        # Validate input
        errors = self.validate_input(**kwargs)
        if errors:
            return ToolResult.error(
                error="; ".join(errors),
                error_code="VALIDATION_ERROR",
            )

        input_data = CreateDNSRecordInput(**kwargs)

        try:
            # Create the DNS record
            record = self._do_client.create_dns_record(
                domain_name=input_data.domain,
                record_type=input_data.record_type,
                name=input_data.name,
                data=input_data.data,
                ttl=input_data.ttl,
            )

            # Build FQDN
            if input_data.name == "@":
                fqdn = input_data.domain
            else:
                fqdn = f"{input_data.name}.{input_data.domain}"

            output = CreateDNSRecordOutput(
                id=record.id if hasattr(record, "id") else 0,
                domain=input_data.domain,
                record_type=input_data.record_type,
                name=input_data.name,
                data=input_data.data,
                ttl=input_data.ttl,
                fqdn=fqdn,
            )

            return ToolResult.success(
                data=output.model_dump(),
                message=f"DNS record created: {input_data.record_type} {fqdn} -> {input_data.data}",
            )

        except DOClientError as e:
            raise ToolError(
                message=e.message,
                code="DO_ERROR",
                details=e.details,
            )
