# Product Breakdown Structure (PBS)

## PF-CORE CI/CD Automation Agent

**Hierarchical Decomposition of Deliverables**

---

| Field | Value |
|-------|-------|
| **Document ID** | PBS-PF-CICD-AGENT-001 |
| **Version** | 1.0.0 |
| **Date** | November 2025 |
| **Source PRD** | PRD-PF-CICD-AGENT-001 |
| **Classification** | CONFIDENTIAL |

---

## 1. PBS Overview

The Product Breakdown Structure decomposes the CI/CD Automation Agent into deliverable components. Each PBS element maps to PRD requirements and forms the basis for the Work Breakdown Structure (WBS).

```
PBS-1.0 PF-CORE CI/CD Automation Agent
│
├── PBS-1.1 Agent Core System
│   ├── PBS-1.1.1 Primary Orchestrator Agent
│   ├── PBS-1.1.2 Agent Configuration Framework
│   ├── PBS-1.1.3 Conversation Interface
│   └── PBS-1.1.4 Audit & Logging System
│
├── PBS-1.2 Sub-Agent Suite
│   ├── PBS-1.2.1 GitHub Agent
│   ├── PBS-1.2.2 Infrastructure Agent
│   ├── PBS-1.2.3 Database Agent
│   └── PBS-1.2.4 Configuration Agent
│
├── PBS-1.3 Tool Library
│   ├── PBS-1.3.1 GitHub Tools
│   ├── PBS-1.3.2 Digital Ocean Tools
│   ├── PBS-1.3.3 Supabase Tools
│   └── PBS-1.3.4 Configuration Tools
│
├── PBS-1.4 Configuration Management System
│   ├── PBS-1.4.1 Hierarchy Schema
│   ├── PBS-1.4.2 Inheritance Engine
│   ├── PBS-1.4.3 Validation System
│   └── PBS-1.4.4 Template Library
│
├── PBS-1.5 Instance & Product Templates
│   ├── PBS-1.5.1 PF-CORE Base Templates
│   ├── PBS-1.5.2 Instance Templates (AIR, BAIV, W4M)
│   ├── PBS-1.5.3 Product Templates
│   └── PBS-1.5.4 White-Label Templates
│
├── PBS-1.6 CI/CD Pipeline Templates
│   ├── PBS-1.6.1 GitHub Actions Workflows
│   ├── PBS-1.6.2 Docker Configuration
│   ├── PBS-1.6.3 Deployment Scripts
│   └── PBS-1.6.4 Quality Gate Definitions
│
├── PBS-1.7 Infrastructure Templates
│   ├── PBS-1.7.1 Droplet Bootstrap Scripts
│   ├── PBS-1.7.2 Nginx Configurations
│   ├── PBS-1.7.3 SSL/TLS Automation
│   └── PBS-1.7.4 Firewall Rules
│
├── PBS-1.8 Database Templates
│   ├── PBS-1.8.1 Core Schema
│   ├── PBS-1.8.2 Instance Schema Extensions
│   ├── PBS-1.8.3 Product Schema Extensions
│   └── PBS-1.8.4 RLS Policy Templates
│
├── PBS-1.9 Documentation
│   ├── PBS-1.9.1 Agent User Guide
│   ├── PBS-1.9.2 Configuration Reference
│   ├── PBS-1.9.3 Runbook & Operations
│   └── PBS-1.9.4 API Documentation
│
└── PBS-1.10 Testing & Validation
    ├── PBS-1.10.1 Agent Unit Tests
    ├── PBS-1.10.2 Integration Tests
    ├── PBS-1.10.3 Provisioning Tests
    └── PBS-1.10.4 End-to-End Scenarios
```

---

## 2. PBS Element Details

### PBS-1.1 Agent Core System

**Description:** The central orchestration system for the CI/CD Automation Agent.

| ID | Element | Description | PRD Reference |
|----|---------|-------------|---------------|
| PBS-1.1.1 | Primary Orchestrator Agent | Main Claude Agent SDK agent that coordinates all provisioning activities | FR-001 to FR-010 |
| PBS-1.1.2 | Agent Configuration Framework | System for configuring agent behaviour, prompts, and tool access | Section 7.3 |
| PBS-1.1.3 | Conversation Interface | Natural language interaction layer for user commands | FR-011 |
| PBS-1.1.4 | Audit & Logging System | Immutable audit trail for all agent actions | FR-010 |

**Deliverables:**
- `agents/cicd_orchestrator.py` - Primary agent definition
- `agents/config/agent_config.yaml` - Agent configuration
- `agents/prompts/system_prompt.md` - System prompt template
- `services/audit_service.py` - Audit logging service

---

### PBS-1.2 Sub-Agent Suite

**Description:** Specialised sub-agents for specific domains.

| ID | Element | Description | PRD Reference |
|----|---------|-------------|---------------|
| PBS-1.2.1 | GitHub Agent | Manages repository creation, branch rules, and workflows | FR-005, FR-008 |
| PBS-1.2.2 | Infrastructure Agent | Provisions and configures Digital Ocean resources | FR-006 |
| PBS-1.2.3 | Database Agent | Manages Supabase projects and schemas | FR-007 |
| PBS-1.2.4 | Configuration Agent | Handles configuration hierarchy and inheritance | FR-004 |

**Deliverables:**
- `agents/sub_agents/github_agent.py`
- `agents/sub_agents/infra_agent.py`
- `agents/sub_agents/database_agent.py`
- `agents/sub_agents/config_agent.py`

---

### PBS-1.3 Tool Library

**Description:** Callable tools that agents use to interact with external systems.

| ID | Element | Tools Included | PRD Reference |
|----|---------|----------------|---------------|
| PBS-1.3.1 | GitHub Tools | `create_repo`, `configure_branch_protection`, `create_environment`, `set_secret`, `create_workflow` | FR-005, FR-008 |
| PBS-1.3.2 | Digital Ocean Tools | `create_droplet`, `configure_firewall`, `create_dns_record`, `bootstrap_droplet` | FR-006 |
| PBS-1.3.3 | Supabase Tools | `create_project`, `run_migration`, `configure_rls`, `generate_api_keys` | FR-007 |
| PBS-1.3.4 | Configuration Tools | `generate_config`, `validate_config`, `merge_inheritance`, `generate_tokens` | FR-004 |

**Deliverables:**
- `tools/github/` - GitHub API tool implementations
- `tools/digitalocean/` - Digital Ocean API tool implementations
- `tools/supabase/` - Supabase management tool implementations
- `tools/config/` - Configuration management tools

---

### PBS-1.4 Configuration Management System

**Description:** System for managing hierarchical configuration with inheritance.

| ID | Element | Description | PRD Reference |
|----|---------|-------------|---------------|
| PBS-1.4.1 | Hierarchy Schema | JSON Schema definitions for configuration at each tier | Section 8.1 |
| PBS-1.4.2 | Inheritance Engine | Logic for merging parent→child configurations | Section 8.2 |
| PBS-1.4.3 | Validation System | Configuration validation before application | FR-004 |
| PBS-1.4.4 | Template Library | Base configuration templates for each tier | Section 8 |

**Deliverables:**
- `schemas/config/pf-core.schema.json`
- `schemas/config/instance.schema.json`
- `schemas/config/product.schema.json`
- `services/inheritance_engine.py`
- `services/config_validator.py`

---

### PBS-1.5 Instance & Product Templates

**Description:** Pre-configured templates for rapid provisioning.

| ID | Element | Contents | PRD Reference |
|----|---------|----------|---------------|
| PBS-1.5.1 | PF-CORE Base Templates | Core platform configuration, base schema, default tokens | Section 3.2 |
| PBS-1.5.2 | Instance Templates | AIR, BAIV, W4M specific configurations and branding | Section 3.3 |
| PBS-1.5.3 | Product Templates | EP, VHF, WWG, ENDV, RNOR configurations | Section 3.4 |
| PBS-1.5.4 | White-Label Templates | Client branding and isolation templates | FR-009 |

**Deliverables:**
- `templates/pf-core/` - Base platform templates
- `templates/instances/air/` - AIR instance templates
- `templates/instances/baiv/` - BAIV instance templates
- `templates/instances/w4m/` - W4M instance templates
- `templates/products/` - Product-specific templates
- `templates/white-label/` - White-label configuration templates

---

### PBS-1.6 CI/CD Pipeline Templates

**Description:** GitHub Actions workflows and deployment configurations.

| ID | Element | Contents | PRD Reference |
|----|---------|----------|---------------|
| PBS-1.6.1 | GitHub Actions Workflows | CI, deploy-dev, deploy-staging, deploy-prod workflows | FR-008 |
| PBS-1.6.2 | Docker Configuration | Dockerfile, docker-compose templates | FR-006, Section 7.3 |
| PBS-1.6.3 | Deployment Scripts | SSH deployment, rollback scripts | FR-003 |
| PBS-1.6.4 | Quality Gate Definitions | Test commands, coverage thresholds | NFR-P01 to NFR-P04 |

**Deliverables:**
- `templates/workflows/ci.yml.template`
- `templates/workflows/deploy-dev.yml.template`
- `templates/workflows/deploy-staging.yml.template`
- `templates/workflows/deploy-prod.yml.template`
- `templates/docker/Dockerfile.template`
- `templates/docker/docker-compose.yml.template`
- `templates/scripts/deploy.sh.template`
- `templates/scripts/rollback.sh.template`

---

### PBS-1.7 Infrastructure Templates

**Description:** Digital Ocean infrastructure configurations.

| ID | Element | Contents | PRD Reference |
|----|---------|----------|---------------|
| PBS-1.7.1 | Droplet Bootstrap Scripts | Ubuntu setup, Docker install, security hardening | Section 7.2 |
| PBS-1.7.2 | Nginx Configurations | Reverse proxy, SSL termination, caching | Section 7.4 |
| PBS-1.7.3 | SSL/TLS Automation | Certbot configuration, auto-renewal | FR-006 |
| PBS-1.7.4 | Firewall Rules | UFW rules, fail2ban configuration | NFR-S01 to NFR-S05 |

**Deliverables:**
- `templates/infrastructure/bootstrap-docker.sh.template`
- `templates/infrastructure/nginx/site.conf.template`
- `templates/infrastructure/nginx/ssl.conf.template`
- `templates/infrastructure/security/ufw-rules.sh.template`
- `templates/infrastructure/security/fail2ban.conf.template`

---

### PBS-1.8 Database Templates

**Description:** Supabase schema and policy templates.

| ID | Element | Contents | PRD Reference |
|----|---------|----------|---------------|
| PBS-1.8.1 | Core Schema | PF-CORE base tables (organizations, users, audit) | FR-007 |
| PBS-1.8.2 | Instance Schema Extensions | Instance-specific tables | Section 8.1 |
| PBS-1.8.3 | Product Schema Extensions | Product-specific tables | Section 8.1 |
| PBS-1.8.4 | RLS Policy Templates | Row Level Security policies for multi-tenancy | FR-007 |

**Deliverables:**
- `templates/database/migrations/001_pf_core_base.sql`
- `templates/database/migrations/002_instance_extension.sql.template`
- `templates/database/migrations/003_product_extension.sql.template`
- `templates/database/policies/rls_tenant_isolation.sql.template`
- `templates/database/functions/` - Database function templates

---

### PBS-1.9 Documentation

**Description:** Comprehensive documentation for the CI/CD Automation Agent.

| ID | Element | Contents | PRD Reference |
|----|---------|----------|---------------|
| PBS-1.9.1 | Agent User Guide | How to use the agent, command reference | FR-011 |
| PBS-1.9.2 | Configuration Reference | All configuration options documented | Section 8 |
| PBS-1.9.3 | Runbook & Operations | Operational procedures, troubleshooting | Section 9 |
| PBS-1.9.4 | API Documentation | Tool API reference, integration guide | Section 7.2 |

**Deliverables:**
- `docs/user-guide.md`
- `docs/configuration-reference.md`
- `docs/runbook.md`
- `docs/api-reference.md`
- `docs/architecture.md`

---

### PBS-1.10 Testing & Validation

**Description:** Test suites ensuring agent reliability.

| ID | Element | Contents | PRD Reference |
|----|---------|----------|---------------|
| PBS-1.10.1 | Agent Unit Tests | Unit tests for agent logic and tools | NFR-M03 |
| PBS-1.10.2 | Integration Tests | Tests for API integrations | NFR-R01 |
| PBS-1.10.3 | Provisioning Tests | End-to-end provisioning validation | OBJ-2 |
| PBS-1.10.4 | End-to-End Scenarios | Full workflow scenario tests | US-001 to US-008 |

**Deliverables:**
- `tests/unit/` - Unit test suites
- `tests/integration/` - Integration test suites
- `tests/e2e/` - End-to-end scenario tests
- `tests/fixtures/` - Test fixtures and mocks

---

## 3. PBS to PRD Traceability Matrix

| PBS ID | PBS Element | PRD Requirement(s) |
|--------|-------------|-------------------|
| PBS-1.1.1 | Primary Orchestrator Agent | FR-001, FR-002, FR-003 |
| PBS-1.1.2 | Agent Configuration Framework | Section 7.3 |
| PBS-1.1.3 | Conversation Interface | FR-011 |
| PBS-1.1.4 | Audit & Logging System | FR-010 |
| PBS-1.2.1 | GitHub Agent | FR-005, FR-008 |
| PBS-1.2.2 | Infrastructure Agent | FR-006 |
| PBS-1.2.3 | Database Agent | FR-007 |
| PBS-1.2.4 | Configuration Agent | FR-004 |
| PBS-1.3.1 | GitHub Tools | FR-005, FR-008 |
| PBS-1.3.2 | Digital Ocean Tools | FR-006 |
| PBS-1.3.3 | Supabase Tools | FR-007 |
| PBS-1.3.4 | Configuration Tools | FR-004 |
| PBS-1.4.1 | Hierarchy Schema | Section 8.1 |
| PBS-1.4.2 | Inheritance Engine | Section 8.2 |
| PBS-1.4.3 | Validation System | FR-004 |
| PBS-1.4.4 | Template Library | Section 8 |
| PBS-1.5.1 | PF-CORE Base Templates | Section 3.2 |
| PBS-1.5.2 | Instance Templates | Section 3.3 |
| PBS-1.5.3 | Product Templates | Section 3.4 |
| PBS-1.5.4 | White-Label Templates | FR-009 |
| PBS-1.6.1 | GitHub Actions Workflows | FR-008 |
| PBS-1.6.2 | Docker Configuration | FR-006 |
| PBS-1.6.3 | Deployment Scripts | FR-003 |
| PBS-1.6.4 | Quality Gate Definitions | NFR-P01 to NFR-P04 |
| PBS-1.7.1 | Droplet Bootstrap Scripts | Section 7.2 |
| PBS-1.7.2 | Nginx Configurations | Section 7.4 |
| PBS-1.7.3 | SSL/TLS Automation | FR-006 |
| PBS-1.7.4 | Firewall Rules | NFR-S01 to NFR-S05 |
| PBS-1.8.1 | Core Schema | FR-007 |
| PBS-1.8.2 | Instance Schema Extensions | FR-007 |
| PBS-1.8.3 | Product Schema Extensions | FR-007 |
| PBS-1.8.4 | RLS Policy Templates | FR-007 |
| PBS-1.9.1 | Agent User Guide | FR-011 |
| PBS-1.9.2 | Configuration Reference | Section 8 |
| PBS-1.9.3 | Runbook & Operations | Section 9 |
| PBS-1.9.4 | API Documentation | Section 7.2 |
| PBS-1.10.1 | Agent Unit Tests | NFR-M03 |
| PBS-1.10.2 | Integration Tests | NFR-R01 |
| PBS-1.10.3 | Provisioning Tests | OBJ-2 |
| PBS-1.10.4 | End-to-End Scenarios | US-001 to US-008 |

---

## 4. PBS Dependency Map

```
PBS-1.4 Configuration Management System
    │
    ├──► PBS-1.5 Instance & Product Templates (depends on)
    │
    └──► PBS-1.3.4 Configuration Tools (depends on)
            │
            └──► PBS-1.2.4 Configuration Agent (depends on)

PBS-1.3 Tool Library
    │
    ├──► PBS-1.2 Sub-Agent Suite (used by)
    │
    └──► PBS-1.1.1 Primary Orchestrator Agent (used by)

PBS-1.5 Instance & Product Templates
    │
    ├──► PBS-1.6 CI/CD Pipeline Templates (generates)
    │
    ├──► PBS-1.7 Infrastructure Templates (generates)
    │
    └──► PBS-1.8 Database Templates (generates)

PBS-1.1.1 Primary Orchestrator Agent
    │
    └──► PBS-1.2 Sub-Agent Suite (orchestrates)

PBS-1.10 Testing & Validation
    │
    └──► All PBS elements (validates)
```

---

## 5. PBS Prioritisation (MoSCoW)

### Must Have (MVP)

| PBS ID | Element | Rationale |
|--------|---------|-----------|
| PBS-1.1.1 | Primary Orchestrator Agent | Core functionality |
| PBS-1.2.1 | GitHub Agent | Repository provisioning essential |
| PBS-1.2.2 | Infrastructure Agent | Droplet provisioning essential |
| PBS-1.3.1 | GitHub Tools | Required for GitHub Agent |
| PBS-1.3.2 | Digital Ocean Tools | Required for Infra Agent |
| PBS-1.4.1 | Hierarchy Schema | Configuration foundation |
| PBS-1.5.1 | PF-CORE Base Templates | Base provisioning templates |
| PBS-1.6.1 | GitHub Actions Workflows | CI/CD pipeline generation |
| PBS-1.7.1 | Droplet Bootstrap Scripts | Infrastructure setup |

### Should Have (Phase 2)

| PBS ID | Element | Rationale |
|--------|---------|-----------|
| PBS-1.2.3 | Database Agent | Supabase automation |
| PBS-1.2.4 | Configuration Agent | Advanced config management |
| PBS-1.3.3 | Supabase Tools | Required for Database Agent |
| PBS-1.3.4 | Configuration Tools | Required for Config Agent |
| PBS-1.4.2 | Inheritance Engine | Full hierarchy support |
| PBS-1.5.2 | Instance Templates | AIR, BAIV, W4M templates |
| PBS-1.8.1 | Core Schema | Database provisioning |

### Could Have (Phase 3)

| PBS ID | Element | Rationale |
|--------|---------|-----------|
| PBS-1.5.3 | Product Templates | Product-level provisioning |
| PBS-1.5.4 | White-Label Templates | Client deployments |
| PBS-1.8.2 | Instance Schema Extensions | Instance database customisation |
| PBS-1.8.3 | Product Schema Extensions | Product database customisation |
| PBS-1.9.1-4 | Documentation | Full documentation suite |

### Won't Have (Future)

| PBS ID | Element | Rationale |
|--------|---------|-----------|
| PBS-1.10.4 | End-to-End Scenarios | After stabilisation |

---

## 6. PBS Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PBS-1.0 CI/CD AUTOMATION AGENT                           │
│                                                                             │
├───────────────┬───────────────┬───────────────┬───────────────┬────────────┤
│               │               │               │               │            │
│   PBS-1.1     │   PBS-1.2     │   PBS-1.3     │   PBS-1.4     │  PBS-1.5   │
│   Agent       │   Sub-Agent   │   Tool        │   Config      │  Instance  │
│   Core        │   Suite       │   Library     │   Mgmt        │  Templates │
│               │               │               │               │            │
│ ┌───────────┐ │ ┌───────────┐ │ ┌───────────┐ │ ┌───────────┐ │ ┌────────┐ │
│ │Orchestratr│ │ │ GitHub    │ │ │ GitHub    │ │ │ Hierarchy │ │ │PF-CORE │ │
│ │Config     │ │ │ Infra     │ │ │ DO        │ │ │ Inherit   │ │ │Instance│ │
│ │Interface  │ │ │ Database  │ │ │ Supabase  │ │ │ Validate  │ │ │Product │ │
│ │Audit      │ │ │ Config    │ │ │ Config    │ │ │ Templates │ │ │WhiteLbl│ │
│ └───────────┘ │ └───────────┘ │ └───────────┘ │ └───────────┘ │ └────────┘ │
│               │               │               │               │            │
├───────────────┼───────────────┼───────────────┼───────────────┼────────────┤
│               │               │               │               │            │
│   PBS-1.6     │   PBS-1.7     │   PBS-1.8     │   PBS-1.9     │  PBS-1.10  │
│   CI/CD       │   Infra       │   Database    │   Docs        │  Testing   │
│   Pipelines   │   Templates   │   Templates   │               │            │
│               │               │               │               │            │
│ ┌───────────┐ │ ┌───────────┐ │ ┌───────────┐ │ ┌───────────┐ │ ┌────────┐ │
│ │ Workflows │ │ │ Bootstrap │ │ │ Core      │ │ │ User Guide│ │ │ Unit   │ │
│ │ Docker    │ │ │ Nginx     │ │ │ Instance  │ │ │ Config Ref│ │ │ Integr │ │
│ │ Scripts   │ │ │ SSL       │ │ │ Product   │ │ │ Runbook   │ │ │ Provis │ │
│ │ Quality   │ │ │ Firewall  │ │ │ RLS       │ │ │ API Docs  │ │ │ E2E    │ │
│ └───────────┘ │ └───────────┘ │ └───────────┘ │ └───────────┘ │ └────────┘ │
│               │               │               │               │            │
└───────────────┴───────────────┴───────────────┴───────────────┴────────────┘
```

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**— END OF PBS —**
