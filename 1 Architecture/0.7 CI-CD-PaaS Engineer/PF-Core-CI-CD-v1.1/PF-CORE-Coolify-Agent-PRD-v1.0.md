# Product Requirements Document (PRD)

## PF-CORE Coolify CI/CD Automation Agent

**Claude Agent SDK Implementation with Coolify PaaS**

---

| Field | Value |
|-------|-------|
| **Document ID** | PRD-PF-COOLIFY-AGENT-001 |
| **Version** | 1.0.0 |
| **Date** | December 2025 |
| **Status** | DRAFT |
| **Owner** | Platform Foundation Core Holdings |
| **Classification** | CONFIDENTIAL |

---

## 1. Executive Summary

### 1.1 Purpose

This PRD defines the requirements for a Claude Agent SDK-powered CI/CD Automation Agent that automates infrastructure provisioning and deployment using **Coolify** as the self-hosted PaaS layer. The agent enables rapid creation and deployment of platform instances (AIR, BAIV, W4M) and their productised solutions through natural language commands.

### 1.2 Problem Statement

Manual provisioning of platform instances and products requires:
- 4-8 hours for new instance setup
- 2-4 hours for new product deployment
- Deep knowledge of Coolify, GitHub, and Supabase
- Risk of configuration drift between environments
- Manual coordination across multiple systems

### 1.3 Solution Overview

An intelligent automation agent that:
- Provisions complete platform instances via Coolify API
- Creates and configures products under instances
- Manages Dev/Staging/Prod environments with promotion workflows
- Maintains configuration inheritance across the platform hierarchy
- Provides conversational interface for DevOps operations
- Leverages existing Coolify MCP Server for enhanced integration

### 1.4 Key Differentiators: Coolify vs Digital Ocean Direct

| Aspect | Coolify Approach | DO Direct Approach |
|--------|------------------|-------------------|
| **Abstraction Level** | PaaS (higher) | IaaS (lower) |
| **Server Management** | Coolify handles Docker, SSL, networking | Manual bootstrap scripts |
| **Deployment Model** | Git-push or API-triggered | SSH + custom scripts |
| **Environment Management** | Built-in projects/environments | Manual environment setup |
| **SSL/TLS** | Automatic Let's Encrypt | Manual Certbot config |
| **Rollback** | Native in Coolify | Custom rollback scripts |
| **Monitoring** | Built-in dashboards | Manual setup required |
| **MCP Integration** | Existing MCP Server available | Custom tools required |

---

## 2. Platform Hierarchy Model

### 2.1 Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     TIER 1: PF-CORE                                  │
│                  (Platform Foundation)                               │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ • Core Agents (16 primary + 12 sub-agents)                  │    │
│  │ • Ontology System (OAA Registry v3.0)                       │    │
│  │ • Design Token System (multi-brand capable)                 │    │
│  │ • Shared UI Components (shadcn/ui + custom)                 │    │
│  │ • CI/CD Agent (THIS AGENT) + Templates                      │    │
│  │ • Multi-tenant Supabase Schema                              │    │
│  │ • Coolify Project Templates                                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          ▼                        ▼                        ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│  TIER 2: AIR        │ │  TIER 2: BAIV       │ │  TIER 2: W4M        │
│  (Instance)         │ │  (Instance)         │ │  (Instance)         │
│                     │ │                     │ │                     │
│ • Brand Tokens      │ │ • Brand Tokens      │ │ • Brand Tokens      │
│ • Custom Agents     │ │ • 16 BAIV Agents    │ │ • Custom Agents     │
│ • Instance DB       │ │ • Instance DB       │ │ • Instance DB       │
│ • Coolify Project   │ │ • Coolify Project   │ │ • Coolify Project   │
│ • 3 Environments    │ │ • 3 Environments    │ │ • 3 Environments    │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
          │                        │                        │
          ▼                        ▼                        ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│  TIER 3: Products   │ │  TIER 3: Products   │ │  TIER 3: Products   │
│                     │ │                     │ │                     │
│  EP (Emergency      │ │  VHF (Visibility    │ │  ENDV (Endeavour    │
│      Protocol)      │ │       Health)       │ │        Venture)     │
│                     │ │                     │ │                     │
│                     │ │  WWG (Website       │ │  RNOR (Renoir       │
│                     │ │       Wellness)     │ │        Value Eng)   │
│                     │ │   [White-label]     │ │                     │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
```

### 2.2 Coolify Mapping Model

Each tier maps to Coolify concepts:

| Platform Tier | Coolify Concept | Description |
|---------------|-----------------|-------------|
| **PF-CORE** | Team + Base Templates | Shared configuration and templates |
| **PF-INSTANCE** | Project | One Coolify Project per instance (AIR, BAIV, W4M) |
| **PF-PRODUCT** | Environments within Project | Dev/Staging/Prod per product |
| **White-label** | Separate Project | Client-isolated deployment |

### 2.3 Coolify Project Structure

```
Coolify Server
├── Team: PF-Core-Holdings
│   │
│   ├── Project: AIR
│   │   ├── Environment: Development
│   │   │   └── Application: air-app-dev
│   │   ├── Environment: Staging
│   │   │   └── Application: air-app-staging
│   │   ├── Environment: Production
│   │   │   └── Application: air-app-prod
│   │   └── Environment: EP-Production
│   │       └── Application: ep-app-prod
│   │
│   ├── Project: BAIV
│   │   ├── Environment: Development
│   │   ├── Environment: Staging
│   │   ├── Environment: Production
│   │   ├── Environment: VHF-Production
│   │   └── Environment: WWG-Production
│   │
│   └── Project: W4M
│       ├── Environment: Development
│       ├── Environment: Staging
│       ├── Environment: Production
│       ├── Environment: ENDV-Production
│       └── Environment: RNOR-Production
│
└── White-Label Projects (Client-Isolated)
    ├── Project: ClientA-WWG
    └── Project: ClientB-WWG
```

---

## 3. Objectives & Success Metrics

### 3.1 Primary Objectives

| ID | Objective | Target | Current |
|----|-----------|--------|---------|
| OBJ-1 | Reduce instance provisioning time | < 10 minutes | 4-8 hours |
| OBJ-2 | Ensure 100% configuration consistency | 100% | ~85% |
| OBJ-3 | Enable self-service deployment | 80% by non-DevOps | 0% |
| OBJ-4 | Support rapid scaling | 10+ products/month | 1-2/month |
| OBJ-5 | Maintain full audit trail | 100% coverage | Partial |

### 3.2 Success Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Instance Provisioning Time | 4-8 hours | < 10 minutes | Timestamp logs |
| Product Provisioning Time | 2-4 hours | < 5 minutes | Timestamp logs |
| Deployment Frequency | 2/week | 10+/day | Coolify API metrics |
| Configuration Drift Incidents | 3/month | 0/month | Audit comparison |
| Self-Service Adoption | 0% | 80% | User analytics |
| Rollback Time | 30 minutes | < 2 minutes | Coolify native |

---

## 4. Functional Requirements

### FR-001: Instance Provisioning

**Description:** Provision a complete PF-INSTANCE (AIR, BAIV, or W4M) with a single command.

**Acceptance Criteria:**
- [ ] Create Coolify Project for instance
- [ ] Create 3 environments (Dev, Staging, Prod)
- [ ] Create GitHub repository from template
- [ ] Configure GitHub App integration in Coolify
- [ ] Apply instance-specific design tokens
- [ ] Create Supabase project with instance schema
- [ ] Configure environment variables in all environments
- [ ] Deploy initial application to Dev environment
- [ ] Generate audit log entry

**Coolify API Operations:**
```
POST /projects                    # Create project
POST /projects/{uuid}/environments # Create environments
POST /applications                # Create application
POST /applications/{uuid}/envs    # Set environment variables
POST /applications/{uuid}/deploy  # Trigger deployment
```

---

### FR-002: Product Provisioning

**Description:** Create a new product (EP, VHF, WWG, ENDV, RNOR) under an existing instance.

**Acceptance Criteria:**
- [ ] Create product environment within instance project
- [ ] Apply product-specific configuration
- [ ] Extend database schema for product
- [ ] Configure product-specific domains
- [ ] Deploy product application
- [ ] Enable preview deployments for PRs

**Coolify API Operations:**
```
POST /projects/{uuid}/environments  # Create product environment
POST /applications                  # Create product application
PATCH /applications/{uuid}          # Configure domains, settings
POST /applications/{uuid}/deploy    # Deploy product
```

---

### FR-003: Environment Management

**Description:** Manage Dev, Staging, and Production environments with promotion and rollback capabilities.

**Acceptance Criteria:**
- [ ] Promote deployments: Dev → Staging → Prod
- [ ] Rollback to previous deployment (Coolify native)
- [ ] Environment-specific configuration management
- [ ] Preview deployments for pull requests
- [ ] Health check validation before promotion

**Coolify API Operations:**
```
GET /deployments                        # List deployments
POST /applications/{uuid}/deploy        # Deploy specific commit
GET /applications/{uuid}/logs           # View deployment logs
POST /applications/{uuid}/restart       # Restart application
POST /applications/{uuid}/stop          # Stop application
POST /applications/{uuid}/start         # Start application
```

---

### FR-004: Configuration Management

**Description:** Manage hierarchical configuration with inheritance (PF-CORE → Instance → Product).

**Acceptance Criteria:**
- [ ] Load and merge configuration hierarchy
- [ ] Validate configuration against JSON schemas
- [ ] Apply environment-specific overrides
- [ ] Sync configuration to Coolify environment variables
- [ ] Track configuration versions

**Configuration Hierarchy:**
```yaml
pf-core.config.yaml          # Platform defaults
  └── air.instance.yaml      # AIR overrides
        └── ep.product.yaml  # EP overrides
```

---

### FR-005: GitHub Integration

**Description:** Manage GitHub repositories and integrate with Coolify for deployments.

**Acceptance Criteria:**
- [ ] Create repository from template
- [ ] Configure branch protection rules
- [ ] Setup GitHub App for Coolify integration
- [ ] Configure automatic deployments on push
- [ ] Enable PR preview deployments
- [ ] Manage repository secrets

**GitHub + Coolify Integration:**
```
Coolify GitHub App → Webhook → Coolify Server
                                    ↓
                              Auto-deploy on push
                              PR preview environments
```

---

### FR-006: Server Management

**Description:** Manage Coolify servers (validation, resources, domains).

**Acceptance Criteria:**
- [ ] Validate server connectivity and status
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Manage domain configurations
- [ ] Configure SSL certificates (auto via Let's Encrypt)
- [ ] Add new servers to Coolify

**Coolify API Operations:**
```
GET /servers                    # List servers
GET /servers/{uuid}             # Get server details
GET /servers/{uuid}/validate    # Validate server
GET /servers/{uuid}/resources   # Get server resources
GET /servers/{uuid}/domains     # Get domains
```

---

### FR-007: Database Management (Supabase)

**Description:** Manage Supabase projects and schemas for platform instances.

**Acceptance Criteria:**
- [ ] Create Supabase project for instance
- [ ] Apply base PF-CORE schema
- [ ] Apply instance schema extensions
- [ ] Apply product schema extensions
- [ ] Configure Row Level Security policies
- [ ] Manage database backups

---

### FR-008: White-Label Configuration

**Description:** Create isolated white-label deployments for clients.

**Acceptance Criteria:**
- [ ] Create separate Coolify project for client
- [ ] Apply client branding (design tokens)
- [ ] Configure client-specific domain
- [ ] Isolate client data in Supabase
- [ ] Manage client-specific environment variables

---

### FR-009: Audit & Compliance

**Description:** Maintain complete audit trail of all provisioning and deployment operations.

**Acceptance Criteria:**
- [ ] Log all agent actions with timestamps
- [ ] Record before/after configuration states
- [ ] Track user who initiated action
- [ ] Store audit logs in Supabase
- [ ] Enable audit log querying

---

### FR-010: Conversational Interface

**Description:** Natural language interface for DevOps operations.

**Example Commands:**
```
"Create a new BAIV instance"
"Deploy VHF to production"
"Rollback BAIV staging to previous version"
"Show me the status of all AIR environments"
"Create a white-label WWG for ClientCorp"
"Promote W4M development to staging"
```

---

## 5. Agent Architecture

### 5.1 Agent Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│              COOLIFY CI/CD ORCHESTRATOR AGENT                        │
│                    (Primary Agent)                                   │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ • Interprets user commands                                  │    │
│  │ • Orchestrates sub-agents                                   │    │
│  │ • Manages workflow state                                    │    │
│  │ • Provides progress updates                                 │    │
│  │ • Handles errors and retries                                │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                   │
         ┌─────────────┬───────────┼───────────┬─────────────┐
         ▼             ▼           ▼           ▼             ▼
┌─────────────┐ ┌───────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐
│   COOLIFY   │ │  GITHUB   │ │ SUPABASE│ │ CONFIG  │ │   AUDIT   │
│   AGENT     │ │  AGENT    │ │  AGENT  │ │  AGENT  │ │   AGENT   │
├─────────────┤ ├───────────┤ ├─────────┤ ├─────────┤ ├───────────┤
│• Projects   │ │• Repos    │ │• Projects│ │• Schemas│ │• Logging  │
│• Envs       │ │• Branches │ │• Schemas │ │• Inherit│ │• Events   │
│• Apps       │ │• Secrets  │ │• RLS     │ │• Validate│ │• Query   │
│• Deploy     │ │• Webhooks │ │• Backups │ │• Merge  │ │• Report   │
│• Domains    │ │• Actions  │ │• Migrate │ │• Export │ │           │
└─────────────┘ └───────────┘ └─────────┘ └─────────┘ └───────────┘
```

### 5.2 MCP Integration

The agent leverages the existing **Coolify MCP Server** for enhanced capabilities:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CLAUDE AGENT SDK                                 │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │            Coolify CI/CD Orchestrator Agent                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │                                       │
│                    ┌─────────┴─────────┐                            │
│                    ▼                   ▼                            │
│           ┌─────────────┐     ┌─────────────┐                       │
│           │  MCP Tools  │     │ Direct APIs │                       │
│           │  (Coolify)  │     │ (GitHub,    │                       │
│           │             │     │  Supabase)  │                       │
│           └─────────────┘     └─────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
                    │                   │
                    ▼                   ▼
        ┌─────────────────┐   ┌─────────────────┐
        │ Coolify Server  │   │ GitHub API      │
        │ (Self-hosted)   │   │ Supabase Mgmt   │
        └─────────────────┘   └─────────────────┘
```

### 5.3 Coolify MCP Server Tools

The existing Coolify MCP Server provides these tools:

| Category | Tools |
|----------|-------|
| **Applications** | create, deploy, update, start, stop, restart, get logs, env vars |
| **Projects** | list, create, get, update, delete |
| **Environments** | list, get by name/UUID |
| **Servers** | list, get, validate, resources, domains |
| **Databases** | PostgreSQL, MySQL, Redis, MongoDB management |
| **Services** | one-click services, lifecycle management |
| **Deployments** | monitoring, history, automated deployments |

---

## 6. Tool Library

### 6.1 Coolify Tools (via MCP + Direct API)

| Tool | Description | MCP/Direct |
|------|-------------|------------|
| `create_project` | Create Coolify project | MCP |
| `create_environment` | Create environment in project | MCP |
| `create_application` | Create application in environment | MCP |
| `deploy_application` | Trigger deployment | MCP |
| `get_deployment_logs` | Retrieve deployment logs | MCP |
| `set_env_vars` | Configure environment variables | MCP |
| `configure_domain` | Setup custom domain | MCP |
| `get_server_status` | Check server health | MCP |
| `start_application` | Start stopped app | MCP |
| `stop_application` | Stop running app | MCP |
| `restart_application` | Restart app | MCP |

### 6.2 GitHub Tools

| Tool | Description |
|------|-------------|
| `create_repo` | Create repository from template |
| `configure_branch_protection` | Setup branch rules |
| `create_github_app` | Configure Coolify GitHub App |
| `set_secret` | Set repository/environment secret |
| `create_workflow` | Add GitHub Actions workflow |

### 6.3 Supabase Tools

| Tool | Description |
|------|-------------|
| `create_project` | Create Supabase project |
| `run_migration` | Apply schema migration |
| `configure_rls` | Setup Row Level Security |
| `create_backup` | Trigger database backup |

### 6.4 Configuration Tools

| Tool | Description |
|------|-------------|
| `load_config` | Load configuration from hierarchy |
| `merge_config` | Merge parent → child configs |
| `validate_config` | Validate against JSON schema |
| `export_env_vars` | Export config as env vars |

---

## 7. User Stories

### US-001: Create New Platform Instance

**As a** Platform Administrator  
**I want to** create a new platform instance (e.g., AIR)  
**So that** I can deploy a complete isolated environment

**Acceptance Criteria:**
- [ ] Coolify project created with instance name
- [ ] Dev, Staging, Prod environments created
- [ ] GitHub repository created from template
- [ ] GitHub App configured for auto-deploy
- [ ] Supabase project created with base schema
- [ ] Initial deployment to Dev successful
- [ ] Instance accessible at configured domain

**Conversation Example:**
```
User: "Create a new AIR platform instance"

Agent: "I'll create the AIR platform instance. This will include:
        • Coolify project with 3 environments
        • GitHub repository from pf-core template
        • Supabase project with AIR schema
        
        Creating Coolify project 'AIR'... ✓
        Creating environments (dev, staging, prod)... ✓
        Creating GitHub repository 'pf-air'... ✓
        Configuring GitHub App integration... ✓
        Creating Supabase project... ✓
        Applying base + AIR schema... ✓
        Deploying to development... ✓
        
        ✅ AIR instance created successfully!
        
        URLs:
        • Dev: https://dev.air.pfcore.io
        • Staging: https://staging.air.pfcore.io
        • Prod: https://air.pfcore.io
        • Coolify Dashboard: https://coolify.pfcore.io/project/air"
```

**Story Points:** 13

---

### US-002: Deploy to Production

**As a** Developer  
**I want to** promote staging to production  
**So that** changes go live

**Acceptance Criteria:**
- [ ] Staging deployment validated
- [ ] Production deployment triggered
- [ ] Health checks passed
- [ ] Rollback available if needed

**Conversation Example:**
```
User: "Deploy BAIV staging to production"

Agent: "Promoting BAIV staging to production...
        
        Current staging version: v2.3.1 (commit abc123)
        
        Running pre-deployment checks... ✓
        Triggering production deployment... ✓
        Waiting for deployment... ✓
        Running health checks... ✓
        
        ✅ BAIV production deployment complete!
        
        Version: v2.3.1
        URL: https://baiv.io
        
        Previous version (v2.3.0) available for rollback."
```

**Story Points:** 5

---

### US-003: Rollback Deployment

**As a** DevOps Engineer  
**I want to** rollback a production deployment  
**So that** I can recover from issues quickly

**Acceptance Criteria:**
- [ ] Previous deployment identified
- [ ] Rollback executed via Coolify
- [ ] Application health confirmed
- [ ] Audit log updated

**Conversation Example:**
```
User: "Rollback BAIV production"

Agent: "Rolling back BAIV production...
        
        Current version: v2.3.1 (deployed 2h ago)
        Rolling back to: v2.3.0
        
        Executing rollback... ✓
        Verifying application health... ✓
        
        ✅ Rollback complete!
        
        BAIV production is now running v2.3.0
        URL: https://baiv.io"
```

**Story Points:** 3

---

### US-004: Create White-Label Deployment

**As a** Business Development Manager  
**I want to** create a white-label WWG deployment for a client  
**So that** they have an isolated, branded instance

**Acceptance Criteria:**
- [ ] Separate Coolify project created
- [ ] Client branding applied
- [ ] Client domain configured
- [ ] Data isolation confirmed
- [ ] Client access credentials generated

**Conversation Example:**
```
User: "Create white-label WWG for AcmeCorp with domain wellness.acme.com"

Agent: "Creating white-label WWG for AcmeCorp...
        
        Creating Coolify project 'AcmeCorp-WWG'... ✓
        Creating production environment... ✓
        Applying AcmeCorp branding... ✓
        Configuring domain wellness.acme.com... ✓
        Provisioning SSL certificate... ✓
        Creating isolated database schema... ✓
        Deploying application... ✓
        
        ✅ White-label deployment complete!
        
        URL: https://wellness.acme.com
        Admin Portal: https://admin.wellness.acme.com
        
        Client credentials have been generated and stored securely."
```

**Story Points:** 13

---

### US-005: View Instance Status

**As a** Platform Administrator  
**I want to** see the status of all environments  
**So that** I can monitor platform health

**Acceptance Criteria:**
- [ ] All instances listed with status
- [ ] Environment health indicators shown
- [ ] Recent deployment info displayed
- [ ] Resource utilisation visible

**Conversation Example:**
```
User: "Show status of all instances"

Agent: "Platform Status Overview:
        
        AIR
        ├── Dev:     ✅ Running (v1.2.0) - 2% CPU, 256MB RAM
        ├── Staging: ✅ Running (v1.2.1) - 3% CPU, 312MB RAM
        └── Prod:    ✅ Running (v1.2.0) - 8% CPU, 512MB RAM
        
        BAIV
        ├── Dev:     ✅ Running (v2.3.2) - 4% CPU, 384MB RAM
        ├── Staging: ✅ Running (v2.3.2) - 5% CPU, 420MB RAM
        └── Prod:    ✅ Running (v2.3.1) - 12% CPU, 768MB RAM
        
        W4M
        ├── Dev:     ✅ Running (v0.9.0) - 2% CPU, 256MB RAM
        ├── Staging: ⚠️ Deploying (v0.9.1)
        └── Prod:    ✅ Running (v0.8.5) - 6% CPU, 512MB RAM
        
        Server: coolify-prod-01 (Hetzner CPX31)
        Total Resources: 24% CPU, 4.2GB/8GB RAM, 45GB/160GB Disk"
```

**Story Points:** 5

---

## 8. Non-Functional Requirements

### NFR-001: Performance

| Metric | Requirement |
|--------|-------------|
| Instance provisioning | < 10 minutes |
| Product provisioning | < 5 minutes |
| Deployment trigger to live | < 3 minutes |
| Rollback execution | < 30 seconds |
| Status query response | < 2 seconds |

### NFR-002: Reliability

| Metric | Requirement |
|--------|-------------|
| Agent availability | 99.5% |
| Deployment success rate | 99% |
| Coolify uptime | 99.9% |
| Rollback success rate | 100% |

### NFR-003: Security

- All API tokens stored in secure vault
- HTTPS only for all communications
- Audit logging for all operations
- RBAC for agent access
- Secrets never logged or displayed

### NFR-004: Scalability

- Support 10+ concurrent deployments
- Handle 50+ applications per server
- Scale to 5+ Coolify servers
- Support 100+ white-label deployments

---

## 9. Infrastructure Requirements

### 9.1 Coolify Server Specification

| Component | MVP | Scale |
|-----------|-----|-------|
| **Server** | Hetzner CPX31 | Hetzner CPX51 |
| **vCPU** | 4 | 16 |
| **RAM** | 8GB | 32GB |
| **Storage** | 160GB NVMe | 360GB NVMe |
| **Cost** | ~€25/month | ~€80/month |

### 9.2 Recommended Hosting Provider

**Hetzner Cloud** (Recommended for Coolify):
- Native Coolify image available
- Excellent price/performance
- European data centres (GDPR)
- Good API for automation

### 9.3 Domain Structure

```
pfcore.io                    # Platform root
├── coolify.pfcore.io        # Coolify dashboard
├── air.pfcore.io            # AIR production
│   ├── dev.air.pfcore.io    # AIR development
│   └── staging.air.pfcore.io# AIR staging
├── baiv.io                  # BAIV production (custom domain)
│   ├── dev.baiv.pfcore.io   
│   └── staging.baiv.pfcore.io
└── w4m.pfcore.io            # W4M production
```

---

## 10. Integration Points

### 10.1 System Integrations

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Coolify CI/CD Agent                               │
└─────────────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   Coolify   │ │   GitHub    │ │  Supabase   │ │   Hetzner   │
│   Server    │ │   API       │ │  Management │ │   Cloud     │
│             │ │             │ │   API       │ │   API       │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Projects  │ │ • Repos     │ │ • Projects  │ │ • Servers   │
│ • Apps      │ │ • Actions   │ │ • Schemas   │ │ • Volumes   │
│ • Deploys   │ │ • Webhooks  │ │ • RLS       │ │ • Networks  │
│ • Domains   │ │ • Secrets   │ │ • Backups   │ │ • Firewalls │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

### 10.2 API Credentials Required

| Service | Credential Type | Storage |
|---------|-----------------|---------|
| Coolify | API Token | Vault |
| GitHub | GitHub App + PAT | Vault |
| Supabase | Management API Key | Vault |
| Hetzner | API Token | Vault |

---

## 11. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Coolify API changes | Low | Medium | Pin API version, monitor releases |
| Server capacity exceeded | Medium | High | Monitor resources, auto-scale plan |
| Deployment failures | Medium | Medium | Automatic rollback, health checks |
| GitHub rate limits | Low | Medium | Caching, request batching |
| SSL certificate issues | Low | Medium | Coolify handles auto-renewal |
| Data loss | Low | High | S3 backups configured in Coolify |

---

## 12. Appendices

### Appendix A: Coolify API Reference

Base URL: `https://coolify.pfcore.io/api/v1`

Key Endpoints:
```
GET    /projects                    # List all projects
POST   /projects                    # Create project
GET    /projects/{uuid}             # Get project
DELETE /projects/{uuid}             # Delete project

GET    /applications                # List applications
POST   /applications                # Create application
GET    /applications/{uuid}         # Get application
PATCH  /applications/{uuid}         # Update application
DELETE /applications/{uuid}         # Delete application

POST   /applications/{uuid}/deploy  # Deploy application
GET    /applications/{uuid}/logs    # Get logs
POST   /applications/{uuid}/start   # Start application
POST   /applications/{uuid}/stop    # Stop application
POST   /applications/{uuid}/restart # Restart application

GET    /servers                     # List servers
GET    /servers/{uuid}/validate     # Validate server
GET    /servers/{uuid}/resources    # Get resources
```

### Appendix B: Environment Variables Template

```yaml
# Application Settings
APP_NAME: "{{instance.name}}"
APP_ENV: "{{environment.type}}"
APP_URL: "{{environment.domain}}"

# Database (Supabase)
DATABASE_URL: "{{supabase.connection_string}}"
SUPABASE_URL: "{{supabase.api_url}}"
SUPABASE_ANON_KEY: "{{supabase.anon_key}}"
SUPABASE_SERVICE_KEY: "{{supabase.service_key}}"

# Design Tokens
BRAND_PRIMARY: "{{instance.brand.primary}}"
BRAND_SECONDARY: "{{instance.brand.secondary}}"

# Instance Specific
INSTANCE_ID: "{{instance.id}}"
PRODUCT_ID: "{{product.id}}"
```

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**— END OF PRD —**
