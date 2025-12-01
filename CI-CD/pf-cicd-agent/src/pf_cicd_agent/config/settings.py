"""
Application settings and configuration management.

Uses pydantic-settings for environment variable loading and validation.
"""

from functools import lru_cache
from typing import Literal

from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # -------------------------------------------------------------------------
    # Anthropic API Configuration
    # -------------------------------------------------------------------------
    anthropic_api_key: SecretStr = Field(
        ...,
        description="Anthropic API key for Claude Agent SDK",
    )
    agent_model: str = Field(
        default="claude-sonnet-4-20250514",
        description="Claude model to use for agent",
    )
    agent_max_tokens: int = Field(
        default=4096,
        ge=1,
        le=8192,
        description="Maximum tokens for agent responses",
    )
    agent_temperature: float = Field(
        default=0.1,
        ge=0.0,
        le=1.0,
        description="Temperature for agent responses",
    )

    # -------------------------------------------------------------------------
    # GitHub Configuration
    # -------------------------------------------------------------------------
    github_token: SecretStr = Field(
        ...,
        description="GitHub Personal Access Token",
    )
    github_org: str = Field(
        ...,
        description="GitHub organization name",
    )
    github_template_repo: str = Field(
        default="pf-core-template",
        description="Template repository for new projects",
    )

    # -------------------------------------------------------------------------
    # Digital Ocean Configuration
    # -------------------------------------------------------------------------
    do_api_token: SecretStr = Field(
        ...,
        description="Digital Ocean API token",
    )
    do_ssh_key_fingerprint: str = Field(
        ...,
        description="SSH key fingerprint for droplet access",
    )
    do_region: str = Field(
        default="lon1",
        description="Default Digital Ocean region",
    )
    do_default_image: str = Field(
        default="ubuntu-22-04-x64",
        description="Default droplet image",
    )

    # -------------------------------------------------------------------------
    # Supabase Configuration
    # -------------------------------------------------------------------------
    supabase_url: str = Field(
        ...,
        description="Supabase project URL",
    )
    supabase_anon_key: SecretStr = Field(
        ...,
        description="Supabase anonymous key",
    )
    supabase_service_role_key: SecretStr = Field(
        ...,
        description="Supabase service role key",
    )
    supabase_management_api_token: SecretStr | None = Field(
        default=None,
        description="Supabase Management API token for project provisioning",
    )

    # -------------------------------------------------------------------------
    # Logging Configuration
    # -------------------------------------------------------------------------
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = Field(
        default="INFO",
        description="Logging level",
    )
    log_format: Literal["json", "console"] = Field(
        default="json",
        description="Log output format",
    )

    # -------------------------------------------------------------------------
    # Audit Configuration
    # -------------------------------------------------------------------------
    audit_table: str = Field(
        default="pf_cicd_audit_log",
        description="Supabase table for audit logs",
    )
    audit_enabled: bool = Field(
        default=True,
        description="Enable audit logging",
    )


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
