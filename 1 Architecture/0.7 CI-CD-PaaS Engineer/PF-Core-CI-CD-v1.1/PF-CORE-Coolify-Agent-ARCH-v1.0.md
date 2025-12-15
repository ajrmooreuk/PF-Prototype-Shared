# Architecture Document

## PF-CORE Coolify CI/CD Automation Agent

**Technical Architecture & Infrastructure Design**

---

| Field | Value |
|-------|-------|
| **Document ID** | ARCH-PF-COOLIFY-AGENT-001 |
| **Version** | 1.0.0 |
| **Date** | December 2025 |
| **Status** | DRAFT |
| **Source PRD** | PRD-PF-COOLIFY-AGENT-001 |
| **Classification** | CONFIDENTIAL |

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER LAYER                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Claude    │  │   Slack     │  │   CLI       │  │   GitHub    │         │
│  │   Chat      │  │   Bot       │  │   Tool      │  │   Actions   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼────────────────┼────────────────┼────────────────┼────────────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AGENT LAYER                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │               COOLIFY CI/CD ORCHESTRATOR AGENT                        │  │
│  │                     (Claude Agent SDK)                                │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │  │
│  │  │ Coolify │ │ GitHub  │ │Supabase │ │ Config  │ │  Audit  │         │  │
│  │  │  Agent  │ │  Agent  │ │  Agent  │ │  Agent  │ │  Agent  │         │  │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘         │  │
│  └───────┼───────────┼───────────┼───────────┼───────────┼───────────────┘  │
└──────────┼───────────┼───────────┼───────────┼───────────┼──────────────────┘
           │           │           │           │           │
           ▼           ▼           ▼           ▼           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          INTEGRATION LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Coolify    │  │   GitHub    │  │  Supabase   │  │   Config    │         │
│  │   MCP       │  │    API      │  │    Mgmt     │  │   Store     │         │
│  │  Server     │  │   Client    │  │    API      │  │  (Git/S3)   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼────────────────┼────────────────┼────────────────┼────────────────┘
          │                │                │                │
          ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUCTURE LAYER                                  │
│  ┌───────────────────────────────┐  ┌───────────────────────────────────┐   │
│  │       COOLIFY SERVER          │  │         SUPABASE                  │   │
│  │    (Hetzner CPX31/51)         │  │    (Managed or Self-hosted)       │   │
│  │                               │  │                                   │   │
│  │  ┌─────────────────────────┐  │  │  ┌─────────────────────────────┐  │   │
│  │  │  Projects               │  │  │  │  PostgreSQL                 │  │   │
│  │  │  ├── AIR                │  │  │  │  ├── pf_core schema         │  │   │
│  │  │  │   ├── dev            │  │  │  │  ├── air schema             │  │   │
│  │  │  │   ├── staging        │  │  │  │  ├── baiv schema            │  │   │
│  │  │  │   └── prod           │  │  │  │  └── w4m schema             │  │   │
│  │  │  ├── BAIV               │  │  │  └─────────────────────────────┘  │   │
│  │  │  └── W4M                │  │  │                                   │   │
│  │  └─────────────────────────┘  │  │  ┌─────────────────────────────┐  │   │
│  │                               │  │  │  Auth / Storage / Realtime  │  │   │
│  │  ┌─────────────────────────┐  │  │  └─────────────────────────────┘  │   │
│  │  │  Docker Containers      │  │  │                                   │   │
│  │  │  Traefik Proxy          │  │  └───────────────────────────────────┘   │
│  │  │  Let's Encrypt SSL      │  │                                          │
│  │  └─────────────────────────┘  │  ┌───────────────────────────────────┐   │
│  │                               │  │         GITHUB                    │   │
│  └───────────────────────────────┘  │  ├── pf-core (template)           │   │
│                                      │  ├── pf-air                       │   │
│                                      │  ├── pf-baiv                      │   │
│                                      │  └── pf-w4m                       │   │
│                                      └───────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Coolify Deployment Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        COOLIFY DEPLOYMENT FLOW                               │
│                                                                              │
│   GitHub Repository          Coolify Server              Application         │
│   ┌──────────────┐          ┌──────────────┐           ┌──────────────┐     │
│   │              │  webhook │              │  deploy   │              │     │
│   │  git push    │────────▶ │  Build       │─────────▶ │  Docker      │     │
│   │  to branch   │          │  Container   │           │  Container   │     │
│   │              │          │              │           │              │     │
│   └──────────────┘          └──────────────┘           └──────────────┘     │
│                                    │                          │             │
│                                    ▼                          ▼             │
│                             ┌──────────────┐           ┌──────────────┐     │
│                             │  Nixpacks /  │           │   Traefik    │     │
│                             │  Dockerfile  │           │   Proxy      │     │
│                             │  Build       │           │   + SSL      │     │
│                             └──────────────┘           └──────────────┘     │
│                                                               │             │
│                                                               ▼             │
│                                                        https://app.domain   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Architecture

### 2.1 Agent Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLAUDE AGENT SDK APPLICATION                              │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Orchestrator Agent                                  │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  System Prompt                                                   │  │  │
│  │  │  • Role: CI/CD automation for PF-CORE platform                  │  │  │
│  │  │  • Capabilities: Provision, deploy, configure, monitor          │  │  │
│  │  │  • Constraints: Must validate before destructive operations     │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Tool Registry                                                   │  │  │
│  │  │  ├── coolify_tools (via MCP)                                    │  │  │
│  │  │  ├── github_tools (direct API)                                  │  │  │
│  │  │  ├── supabase_tools (direct API)                                │  │  │
│  │  │  ├── config_tools (local)                                       │  │  │
│  │  │  └── audit_tools (local)                                        │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Workflow Engine                                                 │  │  │
│  │  │  • provision_instance                                           │  │  │
│  │  │  • provision_product                                            │  │  │
│  │  │  • deploy_to_environment                                        │  │  │
│  │  │  • promote_deployment                                           │  │  │
│  │  │  • rollback_deployment                                          │  │  │
│  │  │  • create_white_label                                           │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐│
│  │ Coolify Agent  │ │ GitHub Agent   │ │ Supabase Agent │ │ Config Agent   ││
│  ├────────────────┤ ├────────────────┤ ├────────────────┤ ├────────────────┤│
│  │ create_project │ │ create_repo    │ │ create_project │ │ load_config    ││
│  │ create_env     │ │ setup_app      │ │ run_migration  │ │ merge_config   ││
│  │ create_app     │ │ set_secret     │ │ configure_rls  │ │ validate       ││
│  │ deploy         │ │ configure_hooks│ │ backup         │ │ export_env     ││
│  │ start/stop     │ │                │ │                │ │                ││
│  │ get_logs       │ │                │ │                │ │                ││
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 MCP Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MCP (Model Context Protocol) INTEGRATION                  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     Claude Agent SDK                                   │  │
│  │                           │                                            │  │
│  │                           ▼                                            │  │
│  │                    ┌─────────────┐                                     │  │
│  │                    │ MCP Client  │                                     │  │
│  │                    └──────┬──────┘                                     │  │
│  └───────────────────────────┼───────────────────────────────────────────┘  │
│                              │                                               │
│                    ┌─────────┴─────────┐                                    │
│                    │   stdio/HTTP      │                                    │
│                    └─────────┬─────────┘                                    │
│                              │                                               │
│  ┌───────────────────────────┼───────────────────────────────────────────┐  │
│  │            COOLIFY MCP SERVER (Node.js)                               │  │
│  │                           │                                            │  │
│  │  ┌────────────────────────┼────────────────────────────────────────┐  │  │
│  │  │                    Tool Handlers                                │  │  │
│  │  │                                                                  │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │  │  │
│  │  │  │ Applications │  │   Projects   │  │   Servers    │          │  │  │
│  │  │  ├──────────────┤  ├──────────────┤  ├──────────────┤          │  │  │
│  │  │  │ create       │  │ list         │  │ list         │          │  │  │
│  │  │  │ deploy       │  │ create       │  │ validate     │          │  │  │
│  │  │  │ start/stop   │  │ get          │  │ resources    │          │  │  │
│  │  │  │ logs         │  │ environments │  │ domains      │          │  │  │
│  │  │  │ env_vars     │  │              │  │              │          │  │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘          │  │  │
│  │  │                                                                  │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │  │  │
│  │  │  │  Databases   │  │   Services   │  │ Deployments  │          │  │  │
│  │  │  ├──────────────┤  ├──────────────┤  ├──────────────┤          │  │  │
│  │  │  │ PostgreSQL   │  │ one-click    │  │ list         │          │  │  │
│  │  │  │ MySQL        │  │ lifecycle    │  │ trigger      │          │  │  │
│  │  │  │ Redis        │  │              │  │ status       │          │  │  │
│  │  │  │ MongoDB      │  │              │  │              │          │  │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘          │  │  │
│  │  └──────────────────────────────────────────────────────────────────┘  │  │
│  │                              │                                          │  │
│  │                    ┌─────────┴─────────┐                                │  │
│  │                    │   Coolify API     │                                │  │
│  │                    │   Client          │                                │  │
│  │                    └─────────┬─────────┘                                │  │
│  └──────────────────────────────┼────────────────────────────────────────┘  │
│                                 │                                            │
│                                 ▼                                            │
│                    ┌────────────────────────┐                               │
│                    │   Coolify Server API   │                               │
│                    │   https://coolify.io   │                               │
│                    └────────────────────────┘                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Coolify Server Architecture

### 3.1 Server Configuration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COOLIFY SERVER (Hetzner CPX31)                            │
│                                                                              │
│  Host: coolify.pfcore.io                                                     │
│  IP: xxx.xxx.xxx.xxx                                                         │
│  OS: Ubuntu 24.04 LTS                                                        │
│  Docker: 24.x                                                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    COOLIFY CONTAINERS                                │    │
│  │                                                                      │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │   coolify   │  │  coolify-   │  │   traefik   │                  │    │
│  │  │   (main)    │  │  realtime   │  │   (proxy)   │                  │    │
│  │  │   :8000     │  │   :6001     │  │   :80/:443  │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  │                                                                      │    │
│  │  ┌─────────────┐  ┌─────────────┐                                   │    │
│  │  │  postgres   │  │    redis    │                                   │    │
│  │  │  (coolify   │  │  (coolify   │                                   │    │
│  │  │   internal) │  │   queue)    │                                   │    │
│  │  └─────────────┘  └─────────────┘                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                 APPLICATION CONTAINERS                               │    │
│  │                                                                      │    │
│  │  Project: AIR                                                        │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │ air-dev     │  │ air-staging │  │ air-prod    │                  │    │
│  │  │ :3001       │  │ :3002       │  │ :3003       │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  │                                                                      │    │
│  │  Project: BAIV                                                       │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │ baiv-dev    │  │ baiv-staging│  │ baiv-prod   │                  │    │
│  │  │ :3011       │  │ :3012       │  │ :3013       │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  │                                                                      │    │
│  │  Project: W4M                                                        │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │ w4m-dev     │  │ w4m-staging │  │ w4m-prod    │                  │    │
│  │  │ :3021       │  │ :3022       │  │ :3023       │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Resources:                                                                  │
│  ├── CPU: 4 vCPU (shared across all containers)                             │
│  ├── RAM: 8GB (Coolify ~2GB + Apps ~6GB)                                    │
│  └── Disk: 160GB NVMe                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Network Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NETWORK ARCHITECTURE                                      │
│                                                                              │
│  Internet                                                                    │
│      │                                                                       │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Cloudflare (optional DNS proxy)                                    │    │
│  │  *.pfcore.io → Coolify Server IP                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│      │                                                                       │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Traefik Reverse Proxy (:80/:443)                                   │    │
│  │                                                                      │    │
│  │  Routes:                                                             │    │
│  │  ├── coolify.pfcore.io     → coolify:8000                           │    │
│  │  ├── dev.air.pfcore.io     → air-dev:3000                           │    │
│  │  ├── staging.air.pfcore.io → air-staging:3000                       │    │
│  │  ├── air.pfcore.io         → air-prod:3000                          │    │
│  │  ├── dev.baiv.pfcore.io    → baiv-dev:3000                          │    │
│  │  ├── staging.baiv.pfcore.io→ baiv-staging:3000                      │    │
│  │  ├── baiv.io               → baiv-prod:3000                         │    │
│  │  └── ...                                                             │    │
│  │                                                                      │    │
│  │  SSL: Let's Encrypt (auto-provisioned by Coolify)                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│      │                                                                       │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Docker Networks (per project)                                       │    │
│  │                                                                      │    │
│  │  coolify-network (bridge)                                            │    │
│  │  ├── coolify containers                                              │    │
│  │  └── traefik                                                         │    │
│  │                                                                      │    │
│  │  air-network (bridge)                                                │    │
│  │  ├── air-dev                                                         │    │
│  │  ├── air-staging                                                     │    │
│  │  └── air-prod                                                        │    │
│  │                                                                      │    │
│  │  baiv-network (bridge)                                               │    │
│  │  └── ...                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Deployment Architecture

### 4.1 CI/CD Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE (GitHub + Coolify)                         │
│                                                                              │
│  Developer                                                                   │
│      │                                                                       │
│      │ git push                                                              │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GitHub Repository                                                   │    │
│  │                                                                      │    │
│  │  Branches:                                                           │    │
│  │  ├── main (production)                                               │    │
│  │  ├── staging                                                         │    │
│  │  └── develop                                                         │    │
│  │                                                                      │    │
│  │  GitHub Actions (Optional Quality Gates):                            │    │
│  │  ├── .github/workflows/ci.yml (lint, test)                          │    │
│  │  └── .github/workflows/notify.yml (Slack notification)              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│      │                                                                       │
│      │ webhook (push event)                                                  │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Coolify Server                                                      │    │
│  │                                                                      │    │
│  │  1. Receive webhook                                                  │    │
│  │  2. Identify branch → environment mapping                            │    │
│  │  3. Pull latest code                                                 │    │
│  │  4. Build container (Nixpacks or Dockerfile)                        │    │
│  │  5. Stop old container                                               │    │
│  │  6. Start new container                                              │    │
│  │  7. Health check                                                     │    │
│  │  8. Update Traefik routing                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│      │                                                                       │
│      │ deployment complete                                                   │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Application Live                                                    │    │
│  │                                                                      │    │
│  │  Branch Mappings:                                                    │    │
│  │  ├── develop → dev.instance.pfcore.io                               │    │
│  │  ├── staging → staging.instance.pfcore.io                           │    │
│  │  └── main    → instance.pfcore.io                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Branch-to-Environment Mapping

```yaml
# Coolify Branch Mapping Configuration
applications:
  air-app:
    branches:
      develop:
        environment: air-dev
        domain: dev.air.pfcore.io
        auto_deploy: true
      staging:
        environment: air-staging
        domain: staging.air.pfcore.io
        auto_deploy: true
      main:
        environment: air-prod
        domain: air.pfcore.io
        auto_deploy: false  # Manual approval required
        
  baiv-app:
    branches:
      develop:
        environment: baiv-dev
        domain: dev.baiv.pfcore.io
        auto_deploy: true
      staging:
        environment: baiv-staging
        domain: staging.baiv.pfcore.io
        auto_deploy: true
      main:
        environment: baiv-prod
        domain: baiv.io
        auto_deploy: false
```

### 4.3 Promotion Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT PROMOTION WORKFLOW                             │
│                                                                              │
│  ┌─────────────┐                                                            │
│  │   DEVELOP   │  ──────────────────────────────────────────▶  Automatic    │
│  │   Branch    │                                                deploy      │
│  └──────┬──────┘                                                            │
│         │                                                                    │
│         │ PR + Merge                                                         │
│         ▼                                                                    │
│  ┌─────────────┐                                                            │
│  │   STAGING   │  ──────────────────────────────────────────▶  Automatic    │
│  │   Branch    │                                                deploy      │
│  └──────┬──────┘                                                            │
│         │                                                                    │
│         │ PR + Approval + Merge                                              │
│         │ OR                                                                 │
│         │ Agent Command: "deploy baiv staging to production"                 │
│         ▼                                                                    │
│  ┌─────────────┐                                                            │
│  │    MAIN     │  ──────────────────────────────────────────▶  Manual       │
│  │   Branch    │                                                approval    │
│  └─────────────┘                                                required    │
│                                                                              │
│  Agent Promotion Commands:                                                   │
│  ├── "promote air dev to staging"     → merge develop → staging            │
│  ├── "deploy air staging to prod"     → merge staging → main + deploy      │
│  └── "rollback baiv prod"             → redeploy previous deployment       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Configuration Architecture

### 5.1 Configuration Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION INHERITANCE                                 │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PF-CORE (Base Configuration)                                        │    │
│  │  config/pf-core.config.yaml                                          │    │
│  │                                                                      │    │
│  │  app:                                                                │    │
│  │    framework: nextjs                                                 │    │
│  │    node_version: "20"                                                │    │
│  │    build_command: "npm run build"                                    │    │
│  │    start_command: "npm start"                                        │    │
│  │                                                                      │    │
│  │  coolify:                                                            │    │
│  │    build_pack: nixpacks                                              │    │
│  │    health_check_path: /api/health                                    │    │
│  │    health_check_interval: 30                                         │    │
│  │                                                                      │    │
│  │  resources:                                                          │    │
│  │    memory_limit: 512M                                                │    │
│  │    cpu_limit: 0.5                                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                               │
│                              │ extends                                       │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  INSTANCE (AIR Override)                                             │    │
│  │  config/instances/air.instance.yaml                                  │    │
│  │                                                                      │    │
│  │  extends: pf-core                                                    │    │
│  │                                                                      │    │
│  │  instance:                                                           │    │
│  │    name: AIR                                                         │    │
│  │    domain: air.pfcore.io                                             │    │
│  │                                                                      │    │
│  │  branding:                                                           │    │
│  │    primary_color: "#1E40AF"                                          │    │
│  │    logo_url: "/assets/air-logo.svg"                                  │    │
│  │                                                                      │    │
│  │  resources:                                                          │    │
│  │    memory_limit: 768M  # Override                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                               │
│                              │ extends                                       │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PRODUCT (EP Override)                                               │    │
│  │  config/products/air-ep.product.yaml                                 │    │
│  │                                                                      │    │
│  │  extends: air                                                        │    │
│  │                                                                      │    │
│  │  product:                                                            │    │
│  │    name: Emergency Protocol                                          │    │
│  │    code: EP                                                          │    │
│  │    domain: ep.air.pfcore.io                                          │    │
│  │                                                                      │    │
│  │  features:                                                           │    │
│  │    emergency_mode: true                                              │    │
│  │    priority_routing: true                                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Environment Variables Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT VARIABLES FLOW                                │
│                                                                              │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │  Config Files   │    │  Config Agent   │    │  Coolify API    │         │
│  │                 │    │                 │    │                 │         │
│  │  pf-core.yaml   │───▶│  1. Load        │───▶│  POST /apps/    │         │
│  │  air.yaml       │    │  2. Merge       │    │    {uuid}/envs  │         │
│  │  ep.yaml        │    │  3. Validate    │    │                 │         │
│  │                 │    │  4. Transform   │    │  Set env vars   │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
│                                                        │                    │
│                                                        ▼                    │
│                              ┌─────────────────────────────────────────┐    │
│                              │  Application Container                  │    │
│                              │                                         │    │
│                              │  Environment Variables:                 │    │
│                              │  ├── APP_NAME=AIR                      │    │
│                              │  ├── APP_ENV=production                │    │
│                              │  ├── DATABASE_URL=postgres://...       │    │
│                              │  ├── SUPABASE_URL=https://...          │    │
│                              │  ├── BRAND_PRIMARY=#1E40AF             │    │
│                              │  └── ...                               │    │
│                              └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Database Architecture

### 6.1 Supabase Schema Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE ARCHITECTURE                            │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Supabase Project: pf-core-prod                                       │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Schema: pf_core (Platform Foundation)                          │  │  │
│  │  │                                                                  │  │  │
│  │  │  Tables:                                                         │  │  │
│  │  │  ├── organizations                                               │  │  │
│  │  │  ├── users                                                       │  │  │
│  │  │  ├── roles                                                       │  │  │
│  │  │  ├── permissions                                                 │  │  │
│  │  │  ├── audit_logs                                                  │  │  │
│  │  │  ├── configurations                                              │  │  │
│  │  │  └── deployments                                                 │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Schema: air (AIR Instance)                                     │  │  │
│  │  │                                                                  │  │  │
│  │  │  Tables:                                                         │  │  │
│  │  │  ├── air_projects                                                │  │  │
│  │  │  ├── air_clients                                                 │  │  │
│  │  │  ├── air_engagements                                             │  │  │
│  │  │  └── air_assessments                                             │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Schema: baiv (BAIV Instance)                                   │  │  │
│  │  │                                                                  │  │  │
│  │  │  Tables:                                                         │  │  │
│  │  │  ├── baiv_clients                                                │  │  │
│  │  │  ├── baiv_campaigns                                              │  │  │
│  │  │  ├── baiv_visibility_scores                                      │  │  │
│  │  │  └── baiv_recommendations                                        │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Schema: w4m (W4M Instance)                                     │  │  │
│  │  │                                                                  │  │  │
│  │  │  Tables:                                                         │  │  │
│  │  │  ├── w4m_ventures                                                │  │  │
│  │  │  ├── w4m_ideas                                                   │  │  │
│  │  │  ├── w4m_mvp_tracking                                            │  │  │
│  │  │  └── w4m_pmf_metrics                                             │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  RLS Policies:                                                               │
│  ├── Organization-based isolation (org_id = current_org())                  │
│  ├── Instance-based access control                                           │
│  └── Product-level permissions                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Security Architecture

### 7.1 Access Control

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                                     │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Credential Storage                                                    │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Vault / Environment Variables                                  │  │  │
│  │  │                                                                  │  │  │
│  │  │  COOLIFY_API_TOKEN=xxxxx                                        │  │  │
│  │  │  COOLIFY_BASE_URL=https://coolify.pfcore.io                     │  │  │
│  │  │  GITHUB_APP_ID=xxxxx                                            │  │  │
│  │  │  GITHUB_PRIVATE_KEY=xxxxx                                       │  │  │
│  │  │  SUPABASE_SERVICE_KEY=xxxxx                                     │  │  │
│  │  │  HETZNER_API_TOKEN=xxxxx                                        │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Network Security                                                      │  │
│  │                                                                        │  │
│  │  Coolify Server:                                                       │  │
│  │  ├── UFW firewall enabled                                             │  │
│  │  │   ├── Allow 22 (SSH - restricted IPs)                              │  │
│  │  │   ├── Allow 80 (HTTP)                                              │  │
│  │  │   ├── Allow 443 (HTTPS)                                            │  │
│  │  │   └── Deny all other inbound                                       │  │
│  │  │                                                                     │  │
│  │  ├── Fail2ban configured                                              │  │
│  │  │   └── SSH brute-force protection                                   │  │
│  │  │                                                                     │  │
│  │  └── Cloudflare proxy (optional)                                      │  │
│  │      └── DDoS protection                                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Application Security                                                  │  │
│  │                                                                        │  │
│  │  ├── All traffic over HTTPS (Let's Encrypt)                           │  │
│  │  ├── Secrets never in logs or responses                               │  │
│  │  ├── API tokens rotated monthly                                       │  │
│  │  └── Audit logging for all operations                                 │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Infrastructure Sizing

### 8.1 Server Sizing Guide

| Scale | Applications | Server | RAM | CPU | Disk | Monthly Cost |
|-------|--------------|--------|-----|-----|------|--------------|
| **MVP** | 3-9 | Hetzner CPX21 | 4GB | 3 vCPU | 80GB | ~€13 |
| **Small** | 10-20 | Hetzner CPX31 | 8GB | 4 vCPU | 160GB | ~€25 |
| **Medium** | 21-50 | Hetzner CPX41 | 16GB | 8 vCPU | 240GB | ~€45 |
| **Large** | 51-100 | Hetzner CPX51 | 32GB | 16 vCPU | 360GB | ~€90 |

### 8.2 Resource Allocation per Application

```yaml
# Per-application resource defaults
resources:
  development:
    memory: 256M
    cpu: 0.25
    
  staging:
    memory: 384M
    cpu: 0.5
    
  production:
    memory: 512M
    cpu: 1.0
```

### 8.3 Cost Comparison: Coolify vs Digital Ocean Direct

| Item | Coolify (Hetzner) | DO App Platform | DO Droplet Direct |
|------|-------------------|-----------------|-------------------|
| **3 Apps (Dev/Stage/Prod)** | ~€25/mo | ~$45/mo | ~$49/mo |
| **10 Apps** | ~€25/mo | ~$150/mo | ~$49/mo |
| **SSL Certificates** | Free (auto) | Free (auto) | Free (manual) |
| **Management UI** | Coolify (free) | DO Dashboard | Manual |
| **Auto-deploy** | Native | Native | Manual setup |
| **Scaling** | Add server | Per-app cost | Add droplet |

---

## 9. Monitoring & Observability

### 9.1 Built-in Coolify Monitoring

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MONITORING ARCHITECTURE                                   │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Coolify Dashboard                                                     │  │
│  │                                                                        │  │
│  │  ├── Server Resources                                                 │  │
│  │  │   ├── CPU utilisation                                              │  │
│  │  │   ├── Memory usage                                                 │  │
│  │  │   └── Disk space                                                   │  │
│  │  │                                                                     │  │
│  │  ├── Application Status                                               │  │
│  │  │   ├── Running / Stopped / Error                                    │  │
│  │  │   ├── Health check status                                          │  │
│  │  │   └── Container logs                                               │  │
│  │  │                                                                     │  │
│  │  └── Deployment History                                               │  │
│  │      ├── Success / Failed                                             │  │
│  │      ├── Build logs                                                   │  │
│  │      └── Deployment duration                                          │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  External Monitoring (Optional)                                        │  │
│  │                                                                        │  │
│  │  ├── Uptime Robot / Better Uptime                                     │  │
│  │  │   └── HTTP health checks every 5 minutes                           │  │
│  │  │                                                                     │  │
│  │  ├── Sentry                                                           │  │
│  │  │   └── Application error tracking                                   │  │
│  │  │                                                                     │  │
│  │  └── Slack Alerts                                                     │  │
│  │      └── Deployment notifications                                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Disaster Recovery

### 10.1 Backup Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BACKUP & RECOVERY                                         │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Coolify Backups                                                       │  │
│  │                                                                        │  │
│  │  ├── Configuration                                                     │  │
│  │  │   └── Stored on server: /data/coolify/                             │  │
│  │  │                                                                     │  │
│  │  └── Database Backups (one-click services)                            │  │
│  │      └── S3-compatible storage                                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Supabase Backups                                                      │  │
│  │                                                                        │  │
│  │  ├── Automatic daily backups (Pro plan)                               │  │
│  │  ├── Point-in-time recovery (Pro plan)                                │  │
│  │  └── Manual pg_dump exports                                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Code Backups                                                          │  │
│  │                                                                        │  │
│  │  └── GitHub repository (multiple branches + tags)                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Recovery Procedures:                                                        │
│  ├── Application: Redeploy from GitHub                                      │
│  ├── Database: Restore from Supabase backup                                 │
│  ├── Coolify: Reinstall + reimport configuration                            │
│  └── Full DR: Provision new server + redeploy all                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Implementation Checklist

### Phase 1: Foundation
- [ ] Provision Hetzner server (CPX31)
- [ ] Install Coolify
- [ ] Configure DNS (*.pfcore.io)
- [ ] Setup Coolify API token
- [ ] Configure GitHub App integration
- [ ] Create base project structure in Coolify

### Phase 2: Agent Development
- [ ] Setup Claude Agent SDK project
- [ ] Configure Coolify MCP Server
- [ ] Implement GitHub tools
- [ ] Implement Supabase tools
- [ ] Implement Config tools
- [ ] Create orchestrator agent

### Phase 3: Templates
- [ ] Create PF-CORE base config
- [ ] Create instance configs (AIR, BAIV, W4M)
- [ ] Create product configs
- [ ] Create Supabase migration templates

### Phase 4: Testing
- [ ] Test instance provisioning
- [ ] Test product provisioning
- [ ] Test deployment workflows
- [ ] Test rollback procedures

### Phase 5: Documentation
- [ ] User guide
- [ ] Operations runbook
- [ ] Configuration reference

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**— END OF ARCHITECTURE DOCUMENT —**
