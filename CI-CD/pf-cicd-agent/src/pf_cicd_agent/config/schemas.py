"""
Configuration schema definitions using Pydantic models.

Implements WBS-1.2: Configuration Schema Design
- PF-CORE base config schema
- Instance config schema
- Product config schema
- White-label config schema
"""

from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field, HttpUrl


class Environment(str, Enum):
    """Deployment environment types."""

    DEV = "development"
    STAGING = "staging"
    PROD = "production"


class DropletSize(str, Enum):
    """Digital Ocean droplet size tiers."""

    BASIC_1GB = "s-1vcpu-1gb"
    BASIC_2GB = "s-1vcpu-2gb"
    REGULAR_2CPU = "s-2vcpu-4gb"
    REGULAR_4CPU = "s-4vcpu-8gb"


class SupabaseTier(str, Enum):
    """Supabase project tiers."""

    FREE = "free"
    PRO = "pro"
    TEAM = "team"


# =============================================================================
# Design Token Schemas
# =============================================================================


class ColorTokens(BaseModel):
    """Brand color tokens for design system."""

    primary: str = Field(default="#3B82F6", description="Primary brand color")
    primary_foreground: str = Field(default="#FFFFFF", description="Text on primary")
    secondary: str = Field(default="#6B7280", description="Secondary color")
    secondary_foreground: str = Field(default="#FFFFFF", description="Text on secondary")
    accent: str = Field(default="#8B5CF6", description="Accent color")
    accent_foreground: str = Field(default="#FFFFFF", description="Text on accent")
    background: str = Field(default="#FFFFFF", description="Background color")
    foreground: str = Field(default="#0F172A", description="Default text color")
    muted: str = Field(default="#F1F5F9", description="Muted background")
    muted_foreground: str = Field(default="#64748B", description="Muted text")
    destructive: str = Field(default="#EF4444", description="Error/destructive color")
    border: str = Field(default="#E2E8F0", description="Border color")


class TypographyTokens(BaseModel):
    """Typography design tokens."""

    font_family: str = Field(default="Inter, sans-serif", description="Primary font family")
    font_family_mono: str = Field(
        default="JetBrains Mono, monospace", description="Monospace font"
    )
    font_size_base: str = Field(default="16px", description="Base font size")
    line_height_base: float = Field(default=1.5, description="Base line height")


class SpacingTokens(BaseModel):
    """Spacing design tokens."""

    base: str = Field(default="4px", description="Base spacing unit")
    radius_sm: str = Field(default="4px", description="Small border radius")
    radius_md: str = Field(default="8px", description="Medium border radius")
    radius_lg: str = Field(default="12px", description="Large border radius")


class DesignTokens(BaseModel):
    """Complete design token set for a brand."""

    colors: ColorTokens = Field(default_factory=ColorTokens)
    typography: TypographyTokens = Field(default_factory=TypographyTokens)
    spacing: SpacingTokens = Field(default_factory=SpacingTokens)


# =============================================================================
# Infrastructure Configuration
# =============================================================================


class DropletConfig(BaseModel):
    """Digital Ocean Droplet configuration."""

    size: DropletSize = Field(default=DropletSize.BASIC_1GB)
    region: str = Field(default="lon1")
    image: str = Field(default="ubuntu-22-04-x64")
    backups: bool = Field(default=False)
    monitoring: bool = Field(default=True)
    tags: list[str] = Field(default_factory=list)


class EnvironmentConfig(BaseModel):
    """Per-environment infrastructure configuration."""

    droplet: DropletConfig = Field(default_factory=DropletConfig)
    supabase_tier: SupabaseTier = Field(default=SupabaseTier.FREE)
    domain: str | None = Field(default=None, description="Environment-specific domain")
    auto_deploy: bool = Field(default=True, description="Enable auto-deployment")


class InfrastructureConfig(BaseModel):
    """Complete infrastructure configuration across environments."""

    development: EnvironmentConfig = Field(default_factory=EnvironmentConfig)
    staging: EnvironmentConfig = Field(default_factory=EnvironmentConfig)
    production: EnvironmentConfig = Field(default_factory=EnvironmentConfig)


# =============================================================================
# GitHub Configuration
# =============================================================================


class BranchProtectionConfig(BaseModel):
    """GitHub branch protection rules."""

    required_reviews: int = Field(default=1, ge=0, le=6)
    dismiss_stale_reviews: bool = Field(default=True)
    require_code_owner_reviews: bool = Field(default=False)
    require_status_checks: list[str] = Field(
        default_factory=lambda: ["quality-gates", "security"]
    )
    enforce_admins: bool = Field(default=True)


class GitHubConfig(BaseModel):
    """GitHub repository configuration."""

    visibility: str = Field(default="private")
    has_issues: bool = Field(default=True)
    has_wiki: bool = Field(default=False)
    has_projects: bool = Field(default=True)
    delete_branch_on_merge: bool = Field(default=True)
    allow_squash_merge: bool = Field(default=True)
    allow_merge_commit: bool = Field(default=False)
    allow_rebase_merge: bool = Field(default=True)
    branch_protection: dict[str, BranchProtectionConfig] = Field(
        default_factory=lambda: {
            "main": BranchProtectionConfig(required_reviews=2),
            "develop": BranchProtectionConfig(required_reviews=1),
        }
    )


# =============================================================================
# CI/CD Pipeline Configuration
# =============================================================================


class QualityGateConfig(BaseModel):
    """Quality gate thresholds."""

    coverage_threshold: float = Field(default=80.0, ge=0, le=100)
    lint_enabled: bool = Field(default=True)
    type_check_enabled: bool = Field(default=True)
    security_scan_enabled: bool = Field(default=True)


class PipelineConfig(BaseModel):
    """CI/CD pipeline configuration."""

    quality_gates: QualityGateConfig = Field(default_factory=QualityGateConfig)
    deployment_strategy: str = Field(default="rolling")
    enable_preview_deployments: bool = Field(default=False)
    enable_e2e_tests: bool = Field(default=True)


# =============================================================================
# Main Configuration Schemas
# =============================================================================


class PFCoreConfig(BaseModel):
    """
    PF-CORE Base Configuration Schema.

    This is the root configuration inherited by all instances.
    Implements WBS-1.2.1.
    """

    schema_version: str = Field(default="1.0.0", description="Configuration schema version")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Platform identification
    platform_name: str = Field(default="PF-CORE", description="Platform name")
    platform_version: str = Field(default="1.0.0", description="Platform version")

    # Core settings
    default_node_version: str = Field(default="20")
    default_python_version: str = Field(default="3.11")

    # Default configurations
    infrastructure: InfrastructureConfig = Field(default_factory=InfrastructureConfig)
    github: GitHubConfig = Field(default_factory=GitHubConfig)
    pipeline: PipelineConfig = Field(default_factory=PipelineConfig)

    # Extension points
    metadata: dict[str, Any] = Field(default_factory=dict)


class InstanceConfig(BaseModel):
    """
    Instance Configuration Schema.

    Represents a tenant/brand instance (e.g., AIR, BAIV, W4M).
    Inherits from and extends PFCoreConfig.
    Implements WBS-1.2.2.
    """

    # Instance identification
    instance_id: str = Field(..., description="Unique instance identifier (e.g., 'air', 'baiv')")
    instance_name: str = Field(..., description="Human-readable instance name")
    description: str = Field(default="", description="Instance description")

    # Inheritance
    extends: str = Field(default="pf-core", description="Parent configuration to inherit from")

    # Brand configuration
    design_tokens: DesignTokens = Field(default_factory=DesignTokens)
    brand_assets: dict[str, str] = Field(
        default_factory=dict,
        description="URLs to brand assets (logo, favicon, etc.)",
    )

    # Instance-specific overrides
    infrastructure: InfrastructureConfig | None = Field(default=None)
    github: GitHubConfig | None = Field(default=None)
    pipeline: PipelineConfig | None = Field(default=None)

    # Products under this instance
    products: list[str] = Field(default_factory=list, description="Product IDs under this instance")

    # Contact information
    admin_email: str | None = Field(default=None)
    support_email: str | None = Field(default=None)

    metadata: dict[str, Any] = Field(default_factory=dict)


class ProductConfig(BaseModel):
    """
    Product Configuration Schema.

    Represents a specific product/application under an instance.
    Inherits from InstanceConfig.
    Implements WBS-1.2.3.
    """

    # Product identification
    product_id: str = Field(..., description="Unique product identifier (e.g., 'ep', 'vhf')")
    product_name: str = Field(..., description="Human-readable product name")
    description: str = Field(default="", description="Product description")

    # Inheritance
    extends: str = Field(..., description="Parent instance ID (e.g., 'air', 'baiv')")

    # Repository configuration
    repo_name: str | None = Field(default=None, description="Repository name override")

    # Product-specific overrides
    design_tokens: DesignTokens | None = Field(default=None)
    infrastructure: InfrastructureConfig | None = Field(default=None)
    pipeline: PipelineConfig | None = Field(default=None)

    # Product features
    features: dict[str, bool] = Field(default_factory=dict, description="Feature flags")

    # Database extensions
    db_schema_extensions: list[str] = Field(
        default_factory=list,
        description="Additional database schema files to apply",
    )

    # API configuration
    api_version: str = Field(default="v1")
    api_prefix: str = Field(default="/api")

    metadata: dict[str, Any] = Field(default_factory=dict)


class WhiteLabelConfig(BaseModel):
    """
    White-Label Configuration Schema.

    Represents a white-labeled deployment of a product.
    Inherits from ProductConfig.
    Implements WBS-1.2.4.
    """

    # White-label identification
    whitelabel_id: str = Field(..., description="Unique white-label identifier")
    client_name: str = Field(..., description="Client/partner name")
    description: str = Field(default="", description="White-label description")

    # Inheritance
    extends: str = Field(..., description="Parent product ID (e.g., 'baiv-wwg')")

    # Complete brand override
    design_tokens: DesignTokens = Field(default_factory=DesignTokens)
    brand_assets: dict[str, str] = Field(default_factory=dict)

    # Custom domain
    custom_domain: str | None = Field(default=None, description="Custom domain for white-label")
    ssl_certificate: str | None = Field(default=None, description="Custom SSL certificate")

    # Feature restrictions
    disabled_features: list[str] = Field(
        default_factory=list,
        description="Features disabled for this white-label",
    )

    # Billing/usage
    usage_limits: dict[str, int] = Field(default_factory=dict, description="Usage quotas")

    metadata: dict[str, Any] = Field(default_factory=dict)
