"""Settings management for CGA Agent using Pydantic Settings."""

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

    # Application
    app_name: str = "PF-CGA-Agent"
    app_env: Literal["development", "staging", "production"] = "development"
    debug: bool = False
    log_level: str = "INFO"

    # Anthropic / Claude
    anthropic_api_key: SecretStr = Field(..., description="Anthropic API key")
    claude_model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 8192
    temperature: float = 0.7

    # Supabase
    supabase_url: str = Field(..., description="Supabase project URL")
    supabase_anon_key: SecretStr = Field(..., description="Supabase anonymous key")
    supabase_service_role_key: SecretStr = Field(..., description="Supabase service role key")

    # InfraNodus (optional - for graph analysis)
    infranodus_api_key: SecretStr | None = Field(
        default=None, description="InfraNodus API key for graph analysis"
    )
    infranodus_api_url: str = "https://infranodus.com/api"

    # Context Budget (tokens)
    strategic_context_budget: int = 500
    domain_context_budget: int = 1200
    operational_context_budget: int = 1000
    compaction_threshold: float = 0.80  # Trigger compaction at 80% usage

    # Analysis Settings
    confidence_threshold: float = 0.75
    escalation_threshold: float = 0.60
    max_retries: int = 3
    retry_backoff_base: float = 2.0
    circuit_breaker_failures: int = 5
    circuit_breaker_cooldown: int = 60

    # Rate Limits
    max_analyses_per_day: int = 100
    max_api_cost_per_analysis: float = 0.50

    # Audit
    audit_table: str = "cga_audit_log"
    session_table: str = "cga_sessions"
    report_table: str = "cga_reports"

    @property
    def total_context_budget(self) -> int:
        """Calculate total context budget."""
        return (
            self.strategic_context_budget
            + self.domain_context_budget
            + self.operational_context_budget
        )


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
