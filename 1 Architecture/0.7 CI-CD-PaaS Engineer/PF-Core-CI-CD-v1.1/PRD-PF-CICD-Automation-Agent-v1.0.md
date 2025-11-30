# Product Requirements Document (PRD)

## PF-CORE CI/CD Automation Agent

**Automated Infrastructure Provisioning & Deployment Orchestration for Multi-Instance Platform Architecture**

---

| Field | Value |
|-------|-------|
| **Document ID** | PRD-PF-CICD-AGENT-001 |
| **Version** | 1.0.0 |
| **Date** | November 2025 |
| **Status** | DRAFT |
| **Owner** | Platform Architecture Team |
| **Classification** | CONFIDENTIAL |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Platform Hierarchy Model](#3-platform-hierarchy-model)
4. [Product Vision & Objectives](#4-product-vision--objectives)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Agent Architecture](#7-agent-architecture)
8. [Instance & Product Configuration Model](#8-instance--product-configuration-model)
9. [User Stories & Acceptance Criteria](#9-user-stories--acceptance-criteria)
10. [Success Metrics](#10-success-metrics)
11. [Dependencies & Constraints](#11-dependencies--constraints)
12. [Glossary](#12-glossary)

---

## 1. Executive Summary

### 1.1 Purpose

This PRD defines the requirements for a **Claude Agent SDK-powered CI/CD Automation Agent** that provisions, configures, and manages deployment infrastructure across a multi-tiered platform architecture. The agent automates the creation of GitHub repositories, Digital Ocean infrastructure, Supabase projects, and GitHub Actions workflows for platform instances and their productised solutions.

### 1.2 Scope

The agent manages a three-tier hierarchy:

```
PF-CORE (Platform Foundation)
    │
    ├── PF-INSTANCE (Platform Instances)
    │   ├── AIR (AI Strategy & Innovation)
    │   ├── BAIV (Be AI Visible - Marketing AI)
    │   └── W4M (Wings4Mind.ai - Idea→MVP→PMF)
    │
    └── PF-PRODUCT (Productised Solutions)
        ├── AIR/EP (Emergency Protocol)
        ├── BAIV/VHF (Visibility Health Framework)
        ├── BAIV/WWG (Website Wellness Grade)
        ├── W4M/ENDV (Endeavour - Venture Builder)
        └── W4M/RNOR (Renoir - Value Engineering)
```

### 1.3 Value Proposition

| Without Agent | With Agent |
|---------------|------------|
| 4-8 hours manual setup per instance | < 15 minutes automated provisioning |
| Inconsistent configurations | Standardised, auditable infrastructure |
| Error-prone manual processes | Repeatable, tested deployments |
| No inheritance of platform updates | Automatic cascade of PF-CORE improvements |
| Tribal knowledge dependencies | Self-documenting infrastructure-as-code |

---

## 2. Problem Statement

### 2.1 Current Challenges

1. **Manual Infrastructure Provisioning:** Each new platform instance or product requires manual creation of repositories, droplets, databases, and CI/CD pipelines.

2. **Configuration Drift:** Without standardisation, instances diverge from the core platform, making updates and maintenance difficult.

3. **Scaling Bottleneck:** The Platform team cannot efficiently onboard new products or white-label deployments due to manual overhead.

4. **Knowledge Silos:** Infrastructure setup knowledge resides with individuals rather than in automated, documented systems.

5. **Inconsistent Environments:** Dev, staging, and production environments within products often have subtle differences causing deployment failures.

### 2.2 Target Users

| User Role | Pain Point | Agent Benefit |
|-----------|------------|---------------|
| **Platform Architect** | Repetitive infrastructure setup | One-command instance creation |
| **Product Lead** | Waiting for DevOps availability | Self-service product deployment |
| **Developer** | Environment inconsistencies | Guaranteed environment parity |
| **Operations** | Manual monitoring setup | Auto-configured observability |
| **Client Success** | Slow white-label provisioning | Rapid client deployment |

---

## 3. Platform Hierarchy Model

### 3.1 Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TIER 1: PF-CORE                             │
│                   Platform Foundation (Shared)                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ • Core Agents (16 Primary + 12 Sub-agents)                    │  │
│  │ • Ontology System (OAA Registry v3.0)                         │  │
│  │ • Design Token System (Multi-brand)                           │  │
│  │ • Shared UI Components (shadcn/ui + custom)                   │  │
│  │ • CI/CD Templates & Automation Agent                          │  │
│  │ • Multi-tenant Supabase Schema                                │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│  TIER 2: AIR        │ │  TIER 2: BAIV       │ │  TIER 2: W4M        │
│  Instance           │ │  Instance           │ │  Instance           │
│  ─────────────────  │ │  ─────────────────  │ │  ─────────────────  │
│  AI Strategy &      │ │  Marketing AI       │ │  Idea→MVP→PMF       │
│  Innovation         │ │  Visibility         │ │  Acceleration       │
│                     │ │                     │ │                     │
│  • Instance Config  │ │  • Instance Config  │ │  • Instance Config  │
│  • Brand Tokens     │ │  • Brand Tokens     │ │  • Brand Tokens     │
│  • Custom Agents    │ │  • Custom Agents    │ │  • Custom Agents    │
│  • Instance DB      │ │  • Instance DB      │ │  • Instance DB      │
└─────────┬───────────┘ └─────────┬───────────┘ └─────────┬───────────┘
          │                       │                       │
    ┌─────┴─────┐           ┌─────┴─────┐           ┌─────┴─────┐
    ▼           ▼           ▼           ▼           ▼           ▼
┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐
│AIR/EP │   │AIR/   │   │BAIV/  │   │BAIV/  │   │W4M/   │   │W4M/   │
│       │   │[...]  │   │VHF    │   │WWG    │   │ENDV   │   │RNOR   │
│TIER 3 │   │       │   │       │   │       │   │       │   │       │
│Product│   │Product│   │Product│   │Product│   │Product│   │Product│
└───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘
```

### 3.2 Inheritance Model

Each tier inherits from the tier above and can override specific configurations:

| Aspect | PF-CORE | PF-INSTANCE | PF-PRODUCT |
|--------|---------|-------------|------------|
| **Core Agents** | Defines | Inherits + Extends | Inherits + Configures |
| **Ontologies** | Base schemas | Domain extensions | Product-specific |
| **Design Tokens** | Base system | Brand customisation | Product theming |
| **CI/CD Pipeline** | Template | Instance config | Product config |
| **Database Schema** | Core tables | Instance tables | Product tables |
| **Environment Config** | Defaults | Instance overrides | Product overrides |

### 3.3 Instance Registry

| Instance Code | Full Name | Domain Focus | Products |
|---------------|-----------|--------------|----------|
| **AIR** | AI Strategy & Innovation | Enterprise AI consulting | EP, [future] |
| **BAIV** | Be AI Visible | Marketing AI visibility | VHF, WWG, [future] |
| **W4M** | Wings4Mind.ai | Idea→MVP→PMF acceleration | ENDV, RNOR, [future] |

### 3.4 Product Registry

| Product Code | Instance | Full Name | Type |
|--------------|----------|-----------|------|
| **EP** | AIR | Emergency Protocol | Productised service |
| **VHF** | BAIV | Visibility Health Framework | SaaS product |
| **WWG** | BAIV | Website Wellness Grade | White-label |
| **ENDV** | W4M | Endeavour Venture Builder | SaaS product |
| **RNOR** | W4M | Renoir Value Engineering | Productised service |

---

## 4. Product Vision & Objectives

### 4.1 Vision Statement

> Enable any Platform team member to provision a complete, production-ready deployment environment for any platform instance or product through a single agent conversation, with full inheritance from PF-CORE and automatic CI/CD pipeline configuration.

### 4.2 Strategic Objectives

| ID | Objective | Success Measure |
|----|-----------|-----------------|
| **OBJ-1** | Reduce instance provisioning time | From 4-8 hours to < 15 minutes |
| **OBJ-2** | Ensure configuration consistency | 100% compliance with PF-CORE standards |
| **OBJ-3** | Enable self-service deployment | Product leads can provision without DevOps |
| **OBJ-4** | Support rapid scaling | Provision 10+ products/month capacity |
| **OBJ-5** | Maintain audit trail | Full provenance of all infrastructure changes |

### 4.3 Key Results (OKRs)

**Objective:** Automate CI/CD infrastructure provisioning across platform hierarchy

| Key Result | Target | Measurement |
|------------|--------|-------------|
| KR1: Automated instance creation | 100% of new instances via agent | Count of agent-provisioned vs manual |
| KR2: Provisioning time reduction | < 15 min average | Time from request to deployed |
| KR3: Configuration drift elimination | 0 drift incidents/quarter | Audit scan results |
| KR4: Self-service adoption | 80% of provisioning by non-DevOps | Request source tracking |

---

## 5. Functional Requirements

### 5.1 Core Agent Capabilities

#### FR-001: Instance Provisioning

**Description:** Agent shall create complete PF-INSTANCE deployments including all infrastructure components.

**Inputs:**
- Instance code (e.g., `AIR`, `BAIV`, `W4M`)
- Instance configuration (name, domain, brand tokens)
- Environment specification (dev/staging/prod)

**Outputs:**
- GitHub repository with PF-CORE inheritance
- Digital Ocean Droplets (per Option B specification)
- Supabase project with instance schema
- GitHub Actions workflows configured
- DNS records documentation
- SSL certificate setup instructions

**Acceptance Criteria:**
- [ ] Instance can be created with single agent command
- [ ] All infrastructure components are provisioned
- [ ] CI/CD pipeline executes successfully on first push
- [ ] Instance inherits PF-CORE updates automatically

---

#### FR-002: Product Provisioning

**Description:** Agent shall create PF-PRODUCT deployments under existing instances.

**Inputs:**
- Parent instance code (e.g., `AIR`)
- Product code (e.g., `EP`)
- Product configuration (name, subdomain, feature flags)
- Environment specification

**Outputs:**
- Product branch/repository structure
- Product-specific environment configuration
- Product database schema extensions
- Product CI/CD workflow modifications
- Product-specific design token overrides

**Acceptance Criteria:**
- [ ] Product inherits instance configuration
- [ ] Product can override specific settings
- [ ] Product deployments are isolated from other products
- [ ] Product can be deployed independently

---

#### FR-003: Environment Management

**Description:** Agent shall manage dev/staging/prod environments for any instance or product.

**Supported Operations:**
- Create environment
- Clone environment (e.g., staging from prod)
- Promote deployment (dev → staging → prod)
- Rollback deployment
- Destroy environment (with confirmation)

**Acceptance Criteria:**
- [ ] Environment parity is guaranteed via Docker
- [ ] Promotion requires passing quality gates
- [ ] Rollback completes in < 5 minutes
- [ ] Destroy requires explicit confirmation

---

#### FR-004: Configuration Management

**Description:** Agent shall manage hierarchical configuration with inheritance.

**Configuration Hierarchy:**
```
pf-core.config.yaml          # Platform defaults
  └── air.instance.yaml      # AIR instance overrides
        └── ep.product.yaml  # EP product overrides
```

**Configuration Domains:**
- Infrastructure (droplet size, region, scaling)
- Application (feature flags, API endpoints)
- Secrets (managed via GitHub Secrets)
- Observability (logging, monitoring, alerts)

**Acceptance Criteria:**
- [ ] Child configurations inherit from parent
- [ ] Overrides are explicitly marked
- [ ] Configuration changes trigger validation
- [ ] Secrets are never logged or exposed

---

#### FR-005: GitHub Repository Management

**Description:** Agent shall create and configure GitHub repositories with proper structure.

**Repository Operations:**
- Create repository from template
- Configure branch protection rules
- Set up GitHub Environments
- Configure environment secrets
- Enable required status checks
- Set up CODEOWNERS

**Repository Structure:**
```
pf-{instance}-{product}/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-dev.yml
│   │   ├── deploy-staging.yml
│   │   └── deploy-prod.yml
│   └── CODEOWNERS
├── src/
├── config/
│   ├── pf-core.inherited.yaml
│   ├── instance.yaml
│   └── product.yaml
├── tokens/
│   └── {brand}/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

**Acceptance Criteria:**
- [ ] Repository follows naming convention
- [ ] Branch protection enforces review requirements
- [ ] Secrets are scoped to appropriate environments
- [ ] README documents instance/product specifics

---

#### FR-006: Digital Ocean Infrastructure

**Description:** Agent shall provision and configure Digital Ocean resources.

**Resources Managed:**
- Droplets (dev/staging/prod per environment spec)
- Spaces (object storage if required)
- Load Balancers (for prod scaling)
- Firewalls (configured per security policy)
- DNS records (via DO or external)

**Configuration Templates:**

| Environment | Droplet Spec | Monthly Cost |
|-------------|--------------|--------------|
| dev | 1 vCPU, 2GB RAM | $12 |
| staging | 1 vCPU, 2GB RAM | $12 |
| prod | 2 vCPU, 4GB RAM | $24 |

**Acceptance Criteria:**
- [ ] Droplets provisioned with correct specifications
- [ ] SSH keys configured for deployment user
- [ ] Firewall rules applied (22, 80, 443 only)
- [ ] Droplet bootstrap script executed successfully

---

#### FR-007: Supabase Project Management

**Description:** Agent shall create and configure Supabase projects with proper schema.

**Operations:**
- Create Supabase project
- Apply base schema from PF-CORE
- Apply instance schema extensions
- Apply product schema extensions
- Configure RLS policies
- Set up database functions
- Configure API settings

**Schema Inheritance:**
```sql
-- PF-CORE base tables
CREATE TABLE pf_core.organizations (...);
CREATE TABLE pf_core.users (...);

-- Instance extension (AIR)
CREATE TABLE air.consultations (...);

-- Product extension (EP)
CREATE TABLE air_ep.incidents (...);
```

**Acceptance Criteria:**
- [ ] Project created in correct organisation
- [ ] Schema migrations applied in order
- [ ] RLS policies enforce tenant isolation
- [ ] API keys generated and stored securely

---

#### FR-008: CI/CD Pipeline Generation

**Description:** Agent shall generate GitHub Actions workflows tailored to instance/product.

**Workflow Types:**
- `ci.yml` - Quality gates on every push
- `deploy-dev.yml` - Auto-deploy to dev on develop merge
- `deploy-staging.yml` - Auto-deploy to staging on release/* merge
- `deploy-prod.yml` - Manual approval deploy on main/tag

**Pipeline Customisation Points:**
- Test commands (unit, integration, e2e)
- Build arguments (environment variables)
- Deployment targets (droplet IPs)
- Post-deployment hooks (migrations, cache clear)
- Notification channels (Slack, email)

**Acceptance Criteria:**
- [ ] Workflows use correct secrets per environment
- [ ] Coverage gates enforced at staging (80%)
- [ ] Production requires manual approval
- [ ] Notifications sent on success/failure

---

#### FR-009: White-Label Configuration

**Description:** Agent shall support white-label product deployments with client-specific branding.

**White-Label Elements:**
- Custom domain configuration
- Brand design tokens (colours, fonts, logos)
- Client-specific feature flags
- Custom email templates
- Isolated database schema (optional)

**Example:** WWG (Website Wellness Grade) white-label for "ClientCorp"
```yaml
product: wwg
white_label:
  client: clientcorp
  domain: wellness.clientcorp.com
  brand:
    primary_color: "#FF5733"
    logo_url: "https://..."
  features:
    custom_reports: true
    api_access: false
```

**Acceptance Criteria:**
- [ ] White-label inherits product configuration
- [ ] Client branding applied at runtime
- [ ] Data isolation per client (if required)
- [ ] Client can have own domain with SSL

---

#### FR-010: Audit & Compliance

**Description:** Agent shall maintain audit trail of all infrastructure changes.

**Audit Events:**
- Instance/product creation
- Configuration changes
- Deployment events
- Secret rotations
- Environment destruction

**Audit Record Schema:**
```json
{
  "event_id": "uuid",
  "timestamp": "ISO8601",
  "actor": "user_id or agent_id",
  "action": "CREATE_INSTANCE | DEPLOY | CONFIG_CHANGE | ...",
  "target": {
    "type": "instance | product | environment",
    "id": "air | air/ep | air/ep/prod"
  },
  "details": { ... },
  "outcome": "SUCCESS | FAILURE",
  "duration_ms": 12345
}
```

**Acceptance Criteria:**
- [ ] All agent actions are logged
- [ ] Audit logs are immutable
- [ ] Logs retained for 2 years minimum
- [ ] Compliance reports can be generated

---

### 5.2 Agent Interaction Model

#### FR-011: Conversational Interface

**Description:** Agent shall support natural language commands for all operations.

**Example Interactions:**

```
User: "Create a new product under BAIV called 'Content Analyzer' with code 'CA'"

Agent: I'll create the BAIV/CA product with the following configuration:
       - Repository: pf-baiv-ca
       - Environments: dev, staging, prod
       - Inherits from: BAIV instance
       - Supabase: New schema extension
       
       Shall I proceed? [Yes/No/Modify]
```

```
User: "Deploy AIR/EP staging to production"

Agent: I'll promote AIR/EP from staging to production:
       - Current staging version: v1.2.3 (sha: abc123)
       - Production approval required: Yes
       - Pre-deployment checks: All passing
       
       This requires manual approval in GitHub. 
       [Link to approval workflow]
```

**Acceptance Criteria:**
- [ ] Agent understands natural language commands
- [ ] Agent confirms destructive actions
- [ ] Agent provides progress updates
- [ ] Agent handles errors gracefully with recovery options

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **NFR-P01** Instance provisioning time | < 15 minutes | End-to-end creation |
| **NFR-P02** Product provisioning time | < 10 minutes | End-to-end creation |
| **NFR-P03** Deployment time | < 5 minutes | Commit to live |
| **NFR-P04** Rollback time | < 3 minutes | Initiation to complete |

### 6.2 Reliability

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **NFR-R01** Pipeline success rate | > 95% | Successful deployments / total |
| **NFR-R02** Agent availability | 99.9% | Uptime during business hours |
| **NFR-R03** Recovery from failure | < 30 minutes | MTTR for agent issues |

### 6.3 Security

| Requirement | Description |
|-------------|-------------|
| **NFR-S01** | All secrets encrypted at rest and in transit |
| **NFR-S02** | Least privilege access for all service accounts |
| **NFR-S03** | Audit logging for all infrastructure changes |
| **NFR-S04** | Secret rotation support (quarterly minimum) |
| **NFR-S05** | No secrets in logs or error messages |

### 6.4 Scalability

| Requirement | Target |
|-------------|--------|
| **NFR-SC01** | Support 10+ platform instances |
| **NFR-SC02** | Support 50+ products across instances |
| **NFR-SC03** | Support 100+ white-label deployments |
| **NFR-SC04** | Concurrent provisioning of 5 environments |

### 6.5 Maintainability

| Requirement | Description |
|-------------|-------------|
| **NFR-M01** | Infrastructure-as-code for all resources |
| **NFR-M02** | Version-controlled configuration |
| **NFR-M03** | Automated testing of provisioning scripts |
| **NFR-M04** | Documentation auto-generated from config |

---

## 7. Agent Architecture

### 7.1 Agent Composition

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CI/CD Automation Agent (Primary)                  │
│                                                                      │
│  Responsibilities:                                                   │
│  • Orchestrate provisioning workflows                               │
│  • Manage configuration hierarchy                                   │
│  • Coordinate sub-agents                                            │
│  • Handle user interactions                                         │
│  • Maintain audit trail                                             │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│  GitHub Agent     │ │  Infra Agent      │ │  Database Agent   │
│  (Sub-agent)      │ │  (Sub-agent)      │ │  (Sub-agent)      │
│                   │ │                   │ │                   │
│  • Repo creation  │ │  • DO provisioning│ │  • Supabase setup │
│  • Workflows      │ │  • DNS config     │ │  • Schema mgmt    │
│  • Secrets        │ │  • SSL certs      │ │  • RLS policies   │
│  • Branch rules   │ │  • Firewall       │ │  • Migrations     │
└───────────────────┘ └───────────────────┘ └───────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │  Config Agent         │
                    │  (Sub-agent)          │
                    │                       │
                    │  • Hierarchy mgmt     │
                    │  • Inheritance        │
                    │  • Validation         │
                    │  • Token generation   │
                    └───────────────────────┘
```

### 7.2 Agent Tools

| Tool | Purpose | API/Integration |
|------|---------|-----------------|
| `github_create_repo` | Create repository from template | GitHub API |
| `github_configure_branch_protection` | Set branch rules | GitHub API |
| `github_create_environment` | Create deployment environment | GitHub API |
| `github_set_secret` | Configure environment secrets | GitHub API |
| `do_create_droplet` | Provision Digital Ocean droplet | DO API |
| `do_configure_firewall` | Set firewall rules | DO API |
| `do_create_dns_record` | Create DNS records | DO API |
| `supabase_create_project` | Create Supabase project | Supabase Mgmt API |
| `supabase_run_migration` | Apply database migration | Supabase CLI |
| `config_generate` | Generate configuration from hierarchy | Internal |
| `config_validate` | Validate configuration | Internal |
| `audit_log` | Record audit event | Internal |

### 7.3 Claude Agent SDK Integration

```python
# Agent definition sketch
from anthropic import Agent, Tool

cicd_agent = Agent(
    name="PF-CICD-Automation-Agent",
    description="Automates CI/CD infrastructure provisioning for PF-CORE platform hierarchy",
    model="claude-sonnet-4-20250514",
    tools=[
        github_tools,
        digitalocean_tools,
        supabase_tools,
        config_tools,
        audit_tools
    ],
    sub_agents=[
        github_agent,
        infra_agent,
        database_agent,
        config_agent
    ],
    system_prompt="""
    You are the PF-CORE CI/CD Automation Agent responsible for provisioning
    and managing deployment infrastructure across the platform hierarchy.
    
    Platform Hierarchy:
    - PF-CORE: Base platform (shared infrastructure)
    - PF-INSTANCE: Platform instances (AIR, BAIV, W4M)
    - PF-PRODUCT: Productised solutions under instances
    
    Always:
    1. Confirm destructive actions before proceeding
    2. Apply configuration inheritance correctly
    3. Log all actions to audit trail
    4. Validate configurations before applying
    5. Provide clear progress updates
    """
)
```

---

## 8. Instance & Product Configuration Model

### 8.1 Configuration Schema

```yaml
# pf-core.config.yaml (Platform defaults)
version: "1.0"
platform:
  name: "PF-CORE"
  
infrastructure:
  provider: digitalocean
  region: lon1
  environments:
    dev:
      droplet_size: s-1vcpu-2gb
      auto_deploy: true
    staging:
      droplet_size: s-1vcpu-2gb
      auto_deploy: true
      coverage_gate: 80
    prod:
      droplet_size: s-2vcpu-4gb
      auto_deploy: false
      requires_approval: true

database:
  provider: supabase
  tiers:
    dev: free
    staging: free
    prod: pro

cicd:
  provider: github-actions
  docker: true
  registry: ghcr.io
  cache: true

observability:
  logging: true
  monitoring: false  # Enable at scale
  
security:
  branch_protection: true
  required_reviews: 1
  secret_scanning: true
```

```yaml
# air.instance.yaml (AIR instance configuration)
version: "1.0"
instance:
  code: AIR
  name: "AI Strategy & Innovation"
  parent: pf-core
  
overrides:
  infrastructure:
    environments:
      prod:
        droplet_size: s-4vcpu-8gb  # Larger for consulting workloads
        
brand:
  primary_color: "#1A365D"
  secondary_color: "#4299E1"
  font_family: "Inter"
  
products:
  - code: EP
    name: "Emergency Protocol"
```

```yaml
# air-ep.product.yaml (EP product configuration)
version: "1.0"
product:
  code: EP
  name: "Emergency Protocol"
  instance: AIR
  type: productised_service
  
overrides:
  database:
    schema_extension: air_ep
    tables:
      - incidents
      - response_plans
      - escalations
      
features:
  real_time_alerts: true
  sms_notifications: true
  
white_label:
  enabled: false
```

### 8.2 Instance Configuration Matrix

| Config Key | PF-CORE | AIR | BAIV | W4M |
|------------|---------|-----|------|-----|
| `region` | lon1 | lon1 | lon1 | lon1 |
| `prod.droplet_size` | s-2vcpu-4gb | s-4vcpu-8gb | s-2vcpu-4gb | s-2vcpu-4gb |
| `prod.requires_approval` | true | true | true | true |
| `coverage_gate` | 80 | 80 | 85 | 80 |
| `required_reviews` | 1 | 2 | 1 | 1 |
| `brand.primary` | #02A4BF | #1A365D | #02A4BF | #6B46C1 |

### 8.3 Product Configuration Matrix

| Config Key | AIR/EP | BAIV/VHF | BAIV/WWG | W4M/ENDV | W4M/RNOR |
|------------|--------|----------|----------|----------|----------|
| `type` | service | saas | white_label | saas | service |
| `white_label.enabled` | false | false | true | false | false |
| `real_time` | true | false | false | true | false |
| `custom_domain` | false | true | true | true | false |
| `api_access` | true | true | optional | true | false |

---

## 9. User Stories & Acceptance Criteria

### 9.1 Epic: Instance Provisioning

#### US-001: Create New Platform Instance

**As a** Platform Architect  
**I want to** create a new platform instance with a single command  
**So that** I can rapidly expand the platform to new business domains

**Acceptance Criteria:**
- [ ] Given I provide instance code, name, and domain
- [ ] When I execute the create instance command
- [ ] Then the agent creates GitHub repository with correct structure
- [ ] And provisions dev/staging/prod Droplets
- [ ] And creates Supabase project with base schema
- [ ] And configures CI/CD workflows
- [ ] And applies brand configuration
- [ ] And provides deployment URLs for each environment

**Story Points:** 13

---

#### US-002: Clone Existing Instance

**As a** Platform Architect  
**I want to** clone an existing instance as a starting point  
**So that** I can rapidly create similar instances with modifications

**Acceptance Criteria:**
- [ ] Given I provide source instance and new instance details
- [ ] When I execute the clone instance command
- [ ] Then the agent creates new instance with copied configuration
- [ ] And allows me to modify specific settings before provisioning
- [ ] And maintains reference to source for comparison

**Story Points:** 8

---

### 9.2 Epic: Product Provisioning

#### US-003: Create New Product Under Instance

**As a** Product Lead  
**I want to** create a new product under my instance  
**So that** I can deploy new offerings without DevOps dependency

**Acceptance Criteria:**
- [ ] Given I provide product code, name, and parent instance
- [ ] When I execute the create product command
- [ ] Then the agent creates product configuration inheriting from instance
- [ ] And sets up product-specific database schema
- [ ] And configures product deployment pipeline
- [ ] And applies product-specific design tokens

**Story Points:** 8

---

#### US-004: Create White-Label Deployment

**As a** Client Success Manager  
**I want to** create a white-label deployment for a client  
**So that** clients can have branded versions of our products

**Acceptance Criteria:**
- [ ] Given I provide client details and source product
- [ ] When I execute the create white-label command
- [ ] Then the agent creates client-specific configuration
- [ ] And applies client branding (colours, logos, domain)
- [ ] And optionally isolates client data
- [ ] And sets up client-specific domain with SSL

**Story Points:** 13

---

### 9.3 Epic: Deployment Operations

#### US-005: Promote Deployment Between Environments

**As a** Developer  
**I want to** promote a deployment from dev to staging to prod  
**So that** I can release features through the proper pipeline

**Acceptance Criteria:**
- [ ] Given I specify source and target environments
- [ ] When I execute the promote command
- [ ] Then the agent verifies all quality gates pass
- [ ] And triggers the appropriate workflow
- [ ] And provides real-time deployment status
- [ ] And notifies relevant stakeholders

**Story Points:** 5

---

#### US-006: Rollback Production Deployment

**As a** Operations Engineer  
**I want to** quickly rollback a production deployment  
**So that** I can recover from failed releases

**Acceptance Criteria:**
- [ ] Given a deployment issue is identified
- [ ] When I execute the rollback command
- [ ] Then the agent identifies previous stable version
- [ ] And executes rollback within 3 minutes
- [ ] And verifies application health post-rollback
- [ ] And logs rollback in audit trail

**Story Points:** 5

---

### 9.4 Epic: Configuration Management

#### US-007: Update Instance Configuration

**As a** Platform Architect  
**I want to** update instance configuration with inheritance awareness  
**So that** changes propagate correctly to products

**Acceptance Criteria:**
- [ ] Given I provide configuration changes
- [ ] When I execute the update config command
- [ ] Then the agent shows impact analysis (affected products)
- [ ] And validates configuration before applying
- [ ] And applies changes with proper inheritance
- [ ] And triggers necessary redeployments

**Story Points:** 8

---

#### US-008: Rotate Secrets

**As a** Security Officer  
**I want to** rotate secrets across all environments  
**So that** we maintain security compliance

**Acceptance Criteria:**
- [ ] Given I specify secrets to rotate
- [ ] When I execute the rotate secrets command
- [ ] Then the agent generates new secrets
- [ ] And updates all affected environments
- [ ] And triggers rolling restarts as needed
- [ ] And logs rotation in audit trail

**Story Points:** 8

---

## 10. Success Metrics

### 10.1 Operational Metrics

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|-------------------|
| Instance provisioning time | 4-8 hours | < 15 minutes | Audit log timestamps |
| Product provisioning time | 2-4 hours | < 10 minutes | Audit log timestamps |
| Deployment frequency | 2/week | 4+/day | GitHub Actions metrics |
| Configuration drift incidents | 3/month | 0/month | Compliance scans |
| Self-service adoption | 0% | 80% | Request source tracking |

### 10.2 Quality Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Pipeline success rate | > 95% | GitHub Actions analytics |
| Deployment rollback rate | < 5% | Audit log analysis |
| Configuration validation failures | < 2% | Agent validation logs |
| Post-deployment incidents | < 1/week | Incident tracking |

### 10.3 Business Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| DevOps time saved | 20+ hours/month | Time tracking |
| New product time-to-market | 50% reduction | Project timelines |
| White-label deployment time | < 1 hour | Audit logs |
| Platform scaling capacity | 50+ products | Registry count |

---

## 11. Dependencies & Constraints

### 11.1 Dependencies

| Dependency | Type | Description | Risk Level |
|------------|------|-------------|------------|
| GitHub API | External | Repository and Actions management | Medium |
| Digital Ocean API | External | Infrastructure provisioning | Medium |
| Supabase Management API | External | Database project management | Medium |
| Claude Agent SDK | Internal | Agent orchestration framework | Low |
| PF-CORE codebase | Internal | Base platform templates | Low |
| OAA Registry | Internal | Ontology validation | Low |

### 11.2 Constraints

| Constraint | Description | Mitigation |
|------------|-------------|------------|
| API Rate Limits | GitHub/DO/Supabase have rate limits | Implement backoff and queuing |
| Free Tier Limits | Supabase free tier has limitations | Document upgrade path |
| Secret Management | Secrets cannot be retrieved after setting | Document rotation procedures |
| DNS Propagation | DNS changes take time to propagate | Account for in provisioning time |

### 11.3 Assumptions

1. All team members have appropriate GitHub permissions
2. Digital Ocean account has payment method configured
3. Supabase organisation is set up with correct permissions
4. Domain DNS is managed via accessible provider
5. Docker deployment (Option B) is the chosen strategy

---

## 12. Glossary

| Term | Definition |
|------|------------|
| **PF-CORE** | Platform Foundation Core - the base platform shared across all instances |
| **PF-INSTANCE** | A platform instance (AIR, BAIV, W4M) that inherits from PF-CORE |
| **PF-PRODUCT** | A productised solution under an instance |
| **White-Label** | Client-branded deployment of a product |
| **Configuration Inheritance** | Child configs inherit from parent and can override |
| **Coverage Gate** | Minimum test coverage required to promote deployment |
| **GHCR** | GitHub Container Registry |
| **RLS** | Row Level Security (Supabase/PostgreSQL) |

---

## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | |
| Platform Architect | | | |
| Technical Lead | | | |
| Security Officer | | | |

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**— END OF PRD —**
