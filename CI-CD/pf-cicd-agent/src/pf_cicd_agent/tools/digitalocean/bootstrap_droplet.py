"""
Bootstrap Droplet Tool.

Implements WBS-2.3.4: Bootstrap droplet tool (SSH exec).
"""

from typing import Any
import time

from pydantic import BaseModel, Field
import paramiko

from pf_cicd_agent.tools.base import BaseTool, ToolResult, ToolError
from pf_cicd_agent.tools.digitalocean.client import DOClient, DOClientError
from pf_cicd_agent.audit.models import AuditEventType
from pf_cicd_agent.audit.service import AuditService
from pf_cicd_agent.config.settings import Settings


class BootstrapDropletInput(BaseModel):
    """Input schema for bootstrap droplet tool."""

    droplet_id: int | None = Field(default=None, description="Droplet ID to bootstrap")
    droplet_name: str | None = Field(
        default=None, description="Droplet name (alternative to ID)"
    )
    ssh_user: str = Field(default="root", description="SSH username")
    ssh_key_path: str | None = Field(
        default=None, description="Path to SSH private key"
    )
    bootstrap_script: str = Field(..., description="Bootstrap script to execute")
    timeout: int = Field(default=600, ge=60, le=3600, description="Timeout in seconds")
    retry_connection: bool = Field(
        default=True, description="Retry SSH connection if initial attempt fails"
    )


class BootstrapDropletOutput(BaseModel):
    """Output schema for bootstrap droplet tool."""

    droplet_id: int
    droplet_name: str
    ip_address: str
    exit_code: int
    stdout: str
    stderr: str
    duration_seconds: int


class BootstrapDropletTool(BaseTool):
    """
    Tool for bootstrapping droplets via SSH.

    Connects to a droplet over SSH and executes a bootstrap script
    to install software and configure the system.
    """

    name = "bootstrap_droplet"
    description = """Bootstrap a Digital Ocean droplet by executing a script via SSH.

Connects to the droplet and runs the provided bootstrap script to install
and configure software. Commonly used for initial server setup."""
    version = "1.0.0"
    category = "digitalocean"
    audit_event_type = AuditEventType.DROPLET_BOOTSTRAP

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
                "droplet_id": {
                    "type": "integer",
                    "description": "Droplet ID to bootstrap",
                },
                "droplet_name": {
                    "type": "string",
                    "description": "Droplet name (alternative to ID)",
                },
                "ssh_user": {
                    "type": "string",
                    "description": "SSH username",
                    "default": "root",
                },
                "ssh_key_path": {
                    "type": "string",
                    "description": "Path to SSH private key",
                },
                "bootstrap_script": {
                    "type": "string",
                    "description": "Bash script to execute on the droplet",
                },
                "timeout": {
                    "type": "integer",
                    "description": "Timeout in seconds",
                    "default": 600,
                    "minimum": 60,
                    "maximum": 3600,
                },
                "retry_connection": {
                    "type": "boolean",
                    "description": "Retry SSH connection on failure",
                    "default": True,
                },
            },
            "required": ["bootstrap_script"],
            "oneOf": [
                {"required": ["droplet_id"]},
                {"required": ["droplet_name"]},
            ],
        }

    def _connect_ssh(
        self,
        ip_address: str,
        username: str,
        key_path: str | None,
        retry: bool,
        max_retries: int = 10,
    ) -> paramiko.SSHClient:
        """
        Establish SSH connection with retry logic.

        Args:
            ip_address: Target IP
            username: SSH user
            key_path: Path to private key
            retry: Whether to retry on failure
            max_retries: Maximum retry attempts

        Returns:
            Connected SSHClient
        """
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        attempts = 0
        last_error = None

        while attempts < (max_retries if retry else 1):
            try:
                attempts += 1
                self._logger.info(
                    "ssh_connecting",
                    ip=ip_address,
                    attempt=attempts,
                )

                if key_path:
                    key = paramiko.RSAKey.from_private_key_file(key_path)
                    client.connect(
                        hostname=ip_address,
                        username=username,
                        pkey=key,
                        timeout=30,
                    )
                else:
                    # Use SSH agent
                    client.connect(
                        hostname=ip_address,
                        username=username,
                        timeout=30,
                        allow_agent=True,
                        look_for_keys=True,
                    )

                self._logger.info("ssh_connected", ip=ip_address)
                return client

            except Exception as e:
                last_error = e
                self._logger.warning(
                    "ssh_connection_failed",
                    ip=ip_address,
                    attempt=attempts,
                    error=str(e),
                )
                if attempts < max_retries and retry:
                    time.sleep(min(10 * attempts, 60))  # Exponential backoff

        raise ToolError(
            message=f"Failed to connect via SSH after {attempts} attempts: {last_error}",
            code="SSH_CONNECTION_FAILED",
            details={"ip": ip_address, "attempts": attempts},
        )

    def execute(self, **kwargs: Any) -> ToolResult[BootstrapDropletOutput]:
        """
        Execute the bootstrap droplet tool.

        Args:
            **kwargs: Tool parameters

        Returns:
            ToolResult with execution output
        """
        input_data = BootstrapDropletInput(**kwargs)

        # Get droplet
        try:
            if input_data.droplet_id:
                droplet = self._do_client.get_droplet(input_data.droplet_id)
            elif input_data.droplet_name:
                droplet = self._do_client.get_droplet_by_name(input_data.droplet_name)
                if not droplet:
                    return ToolResult.error(
                        error=f"Droplet '{input_data.droplet_name}' not found",
                        error_code="DROPLET_NOT_FOUND",
                    )
            else:
                return ToolResult.error(
                    error="Either droplet_id or droplet_name is required",
                    error_code="VALIDATION_ERROR",
                )
        except DOClientError as e:
            return ToolResult.error(error=e.message, error_code="DO_ERROR")

        # Ensure droplet has IP
        if not droplet.ip_address:
            droplet = self._do_client.wait_for_droplet(droplet)

        start_time = time.time()

        try:
            # Connect via SSH
            ssh_client = self._connect_ssh(
                ip_address=droplet.ip_address,
                username=input_data.ssh_user,
                key_path=input_data.ssh_key_path,
                retry=input_data.retry_connection,
            )

            # Execute bootstrap script
            self._logger.info(
                "bootstrap_executing",
                droplet=droplet.name,
                script_length=len(input_data.bootstrap_script),
            )

            stdin, stdout, stderr = ssh_client.exec_command(
                input_data.bootstrap_script,
                timeout=input_data.timeout,
            )

            # Wait for completion
            exit_code = stdout.channel.recv_exit_status()
            stdout_text = stdout.read().decode("utf-8", errors="replace")
            stderr_text = stderr.read().decode("utf-8", errors="replace")

            ssh_client.close()

            duration = int(time.time() - start_time)

            self._logger.info(
                "bootstrap_complete",
                droplet=droplet.name,
                exit_code=exit_code,
                duration=duration,
            )

            output = BootstrapDropletOutput(
                droplet_id=droplet.id,
                droplet_name=droplet.name,
                ip_address=droplet.ip_address,
                exit_code=exit_code,
                stdout=stdout_text[-10000:] if len(stdout_text) > 10000 else stdout_text,
                stderr=stderr_text[-5000:] if len(stderr_text) > 5000 else stderr_text,
                duration_seconds=duration,
            )

            if exit_code == 0:
                return ToolResult.success(
                    data=output.model_dump(),
                    message=f"Bootstrap completed successfully on {droplet.name}",
                )
            else:
                return ToolResult.partial(
                    message=f"Bootstrap completed with exit code {exit_code}",
                    data=output.model_dump(),
                    error=f"Script exited with code {exit_code}",
                )

        except ToolError:
            raise
        except Exception as e:
            raise ToolError(
                message=f"Bootstrap failed: {e}",
                code="BOOTSTRAP_FAILED",
                details={"droplet": droplet.name},
            )
