# Configuration Guide

This guide explains the configuration system, inheritance hierarchy, and how to create custom configurations for instances and products.

## Configuration Hierarchy

The PF-CORE platform uses a 4-level configuration inheritance system:

```mermaid
graph TB
    subgraph Level1["Level 1: PF-CORE Base"]
        PFCore["pf-core.config.yaml<br/>━━━━━━━━━━━━━━━━━━<br/>• Platform defaults<br/>• Standard infrastructure<br/>• Base design tokens<br/>• Default workflows"]
    end

    subgraph Level2["Level 2: Instance"]
        AIR["air.instance.yaml"]
        BAIV["baiv.instance.yaml"]
        W4M["w4m.instance.yaml"]
    end

    subgraph Level3["Level 3: Product"]
        EP["air-ep.product.yaml"]
        VHF["baiv-vhf.product.yaml"]
        WWG["baiv-wwg.product.yaml"]
    end

    subgraph Level4["Level 4: White-Label"]
        WL1["client-a.whitelabel.yaml"]
        WL2["client-b.whitelabel.yaml"]
    end

    PFCore -->|extends| AIR
    PFCore -->|extends| BAIV
    PFCore -->|extends| W4M

    AIR -->|extends| EP
    BAIV -->|extends| VHF
    BAIV -->|extends| WWG

    VHF -->|extends| WL1
    WWG -->|extends| WL2

    style PFCore fill:#e1f5fe
    style AIR fill:#fff3e0
    style BAIV fill:#fff3e0
    style W4M fill:#fff3e0
    style EP fill:#e8f5e9
    style VHF fill:#e8f5e9
    style WWG fill:#e8f5e9
    style WL1 fill:#fce4ec
    style WL2 fill:#fce4ec
```

## Configuration Schemas

### PF-CORE Base Configuration

The base configuration defines platform-wide defaults.

```yaml
# templates/base/pf-core.config.yaml

schema_version: "1.0.0"
platform_name: "PF-CORE"
platform_version: "1.0.0"

# Runtime defaults
default_node_version: "20"
default_python_version: "3.11"

# Infrastructure per environment
infrastructure:
  development:
    droplet:
      size: "s-1vcpu-1gb"
      region: "lon1"
      image: "ubuntu-22-04-x64"
      backups: false
      monitoring: true
    supabase_tier: "free"
    auto_deploy: true

  staging:
    droplet:
      size: "s-1vcpu-1gb"
      # ... inherits other defaults

  production:
    droplet:
      size: "s-1vcpu-2gb"
      backups: true
    supabase_tier: "pro"
    auto_deploy: false  # Manual approval required

# GitHub defaults
github:
  visibility: "private"
  branch_protection:
    main:
      required_reviews: 2
      require_status_checks:
        - "quality-gates"
        - "security"
    develop:
      required_reviews: 1

# CI/CD pipeline
pipeline:
  quality_gates:
    coverage_threshold: 80.0
    lint_enabled: true
    type_check_enabled: true
    security_scan_enabled: true

# Design tokens
design_tokens:
  colors:
    primary: "#3B82F6"
    secondary: "#6B7280"
    # ...
```

### Instance Configuration

Instance configs represent a tenant/brand (e.g., AIR, BAIV, W4M).

```yaml
# templates/instances/air.instance.yaml

instance_id: "air"
instance_name: "Artist in Residence"
description: "Platform for artist residency programs"
extends: "pf-core"  # Inherits from base

# Brand-specific design tokens (overrides base)
design_tokens:
  colors:
    primary: "#E11D48"      # Rose - overrides base primary
    secondary: "#F472B6"    # Pink
    accent: "#FBBF24"       # Amber
    background: "#FFFBEB"   # Warm white

  typography:
    font_family: "Playfair Display, serif"  # Custom font

# Brand assets
brand_assets:
  logo: "https://assets.air-platform.com/logo.svg"
  favicon: "https://assets.air-platform.com/favicon.ico"

# Contact information
admin_email: "admin@air-platform.com"
support_email: "support@air-platform.com"

# Products under this instance
products:
  - "ep"

# Instance-specific overrides
infrastructure:
  production:
    droplet:
      size: "s-2vcpu-4gb"  # Larger for production
```

### Product Configuration

Product configs represent applications within an instance.

```yaml
# templates/products/air-ep.product.yaml

product_id: "ep"
product_name: "Exhibition Platform"
description: "Digital platform for art exhibitions"
extends: "air"  # Inherits from AIR instance

# Repository name override
repo_name: "air-ep"

# Product features
features:
  exhibitions: true
  virtual_tours: true
  artist_profiles: true
  booking_system: false  # Disabled for this product

# API configuration
api_version: "v1"
api_prefix: "/api"

# Database extensions
db_schema_extensions:
  - "002_air_exhibitions.sql"
  - "003_air_artists.sql"

# Product-specific design token adjustments
design_tokens:
  colors:
    accent: "#10B981"  # Green accent for EP
```

### White-Label Configuration

White-label configs enable complete rebranding for clients.

```yaml
# templates/whitelabels/client-abc.whitelabel.yaml

whitelabel_id: "client-abc"
client_name: "ABC Art Collective"
description: "White-label deployment for ABC"
extends: "baiv-wwg"  # Inherits from WWG product

# Complete brand override
design_tokens:
  colors:
    primary: "#7C3AED"
    secondary: "#A78BFA"
    background: "#F5F3FF"

brand_assets:
  logo: "https://abc-collective.com/logo.svg"
  favicon: "https://abc-collective.com/favicon.ico"

# Custom domain
custom_domain: "platform.abc-collective.com"

# Feature restrictions
disabled_features:
  - "analytics"
  - "export_data"

# Usage limits
usage_limits:
  max_users: 100
  max_storage_gb: 10
```

## Inheritance Resolution

When the agent loads a configuration, it resolves the full inheritance chain:

```mermaid
sequenceDiagram
    participant Agent
    participant Engine as Inheritance Engine
    participant Registry as Config Registry

    Agent->>Engine: resolve("client-abc")

    Engine->>Registry: get("client-abc")
    Registry-->>Engine: whitelabel config

    Engine->>Engine: Build chain:<br/>pf-core → baiv → wwg → client-abc

    loop For each config in chain
        Engine->>Registry: get(config_id)
        Registry-->>Engine: config data
        Engine->>Engine: deep_merge(result, config)
        Engine->>Engine: track_overrides()
    end

    Engine-->>Agent: {resolved_config, override_list}
```

### Override Detection

The engine tracks what values were overridden at each level:

```python
from pf_cicd_agent.config import InheritanceEngine

engine = InheritanceEngine()
engine.register_config("pf-core", pf_core_config)
engine.register_config("air", air_config)
engine.register_config("air-ep", ep_config)

resolved, overrides = engine.resolve_inheritance("air-ep")

for override in overrides:
    print(override)

# Output:
# [air] design_tokens.colors.primary [#3B82F6 → #E11D48]
# [air] design_tokens.typography.font_family [Inter → Playfair Display]
# [air-ep] design_tokens.colors.accent [#8B5CF6 → #10B981]
```

## Creating Custom Configurations

### Step 1: Create Instance Configuration

```bash
# Using the template loader
pf-cicd exec validate templates/instances/my-instance.instance.yaml
```

Or programmatically:

```python
from pf_cicd_agent.templates import TemplateLoader

loader = TemplateLoader()
loader.create_instance_config(
    instance_id="my-corp",
    instance_name="My Corporation",
    description="Enterprise deployment",
    design_tokens={
        "colors": {
            "primary": "#1E40AF",
            "secondary": "#3B82F6"
        }
    },
    admin_email="admin@my-corp.com"
)
```

### Step 2: Create Product Configuration

```python
loader.create_product_config(
    instance_id="my-corp",
    product_id="dashboard",
    product_name="Analytics Dashboard",
    features={
        "real_time": True,
        "exports": True
    }
)
```

### Step 3: Validate Configuration

```bash
pf-cicd validate templates/instances/my-corp.instance.yaml
pf-cicd validate templates/products/my-corp-dashboard.product.yaml
```

## Configuration Schema Reference

### Infrastructure Schema

```mermaid
classDiagram
    class InfrastructureConfig {
        +EnvironmentConfig development
        +EnvironmentConfig staging
        +EnvironmentConfig production
    }

    class EnvironmentConfig {
        +DropletConfig droplet
        +SupabaseTier supabase_tier
        +string domain
        +bool auto_deploy
    }

    class DropletConfig {
        +DropletSize size
        +string region
        +string image
        +bool backups
        +bool monitoring
        +list~string~ tags
    }

    InfrastructureConfig *-- EnvironmentConfig
    EnvironmentConfig *-- DropletConfig
```

### Design Tokens Schema

```mermaid
classDiagram
    class DesignTokens {
        +ColorTokens colors
        +TypographyTokens typography
        +SpacingTokens spacing
    }

    class ColorTokens {
        +string primary
        +string primary_foreground
        +string secondary
        +string accent
        +string background
        +string foreground
        +string muted
        +string destructive
        +string border
    }

    class TypographyTokens {
        +string font_family
        +string font_family_mono
        +string font_size_base
        +float line_height_base
    }

    class SpacingTokens {
        +string base
        +string radius_sm
        +string radius_md
        +string radius_lg
    }

    DesignTokens *-- ColorTokens
    DesignTokens *-- TypographyTokens
    DesignTokens *-- SpacingTokens
```

## Environment Variables

The agent itself is configured via environment variables:

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key | - |
| `GITHUB_TOKEN` | Yes | GitHub PAT | - |
| `GITHUB_ORG` | Yes | GitHub organization | - |
| `GITHUB_TEMPLATE_REPO` | No | Template repository | `pf-core-template` |
| `DO_API_TOKEN` | Yes | Digital Ocean API token | - |
| `DO_SSH_KEY_FINGERPRINT` | Yes | SSH key fingerprint | - |
| `DO_REGION` | No | Default region | `lon1` |
| `DO_DEFAULT_IMAGE` | No | Default droplet image | `ubuntu-22-04-x64` |
| `SUPABASE_URL` | Yes | Supabase project URL | - |
| `SUPABASE_ANON_KEY` | Yes | Supabase anon key | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service key | - |
| `AGENT_MODEL` | No | Claude model | `claude-sonnet-4-20250514` |
| `LOG_LEVEL` | No | Logging level | `INFO` |
| `AUDIT_ENABLED` | No | Enable audit logging | `true` |

---

*Document Version: 1.0.0 | Last Updated: December 2025*
