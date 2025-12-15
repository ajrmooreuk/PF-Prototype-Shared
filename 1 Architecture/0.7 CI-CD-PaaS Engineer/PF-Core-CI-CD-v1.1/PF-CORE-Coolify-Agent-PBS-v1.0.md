# Product Breakdown Structure (PBS)

## PF-CORE Coolify CI/CD Automation Agent

**Deliverable-Oriented Decomposition**

---

| Field | Value |
|-------|-------|
| **Document ID** | PBS-PF-COOLIFY-AGENT-001 |
| **Version** | 1.0.0 |
| **Date** | December 2025 |
| **Source PRD** | PRD-PF-COOLIFY-AGENT-001 |
| **Classification** | CONFIDENTIAL |

---

## 1. PBS Overview

```
PBS-1.0 PF-CORE Coolify CI/CD Automation Agent
│
├── PBS-1.1 Agent Core System
├── PBS-1.2 Sub-Agent Suite
├── PBS-1.3 Tool Library
├── PBS-1.4 Configuration Management System
├── PBS-1.5 Instance & Product Templates
├── PBS-1.6 Coolify Project Templates
├── PBS-1.7 Database Templates
├── PBS-1.8 MCP Integration
├── PBS-1.9 Documentation
└── PBS-1.10 Testing & Validation
```

---

## 2. Detailed PBS Hierarchy

### PBS-1.1 Agent Core System

```
PBS-1.1 Agent Core System
│
├── PBS-1.1.1 Primary Orchestrator Agent
│   ├── PBS-1.1.1.1 System Prompt Definition
│   ├── PBS-1.1.1.2 Agent Configuration
│   ├── PBS-1.1.1.3 Tool Bindings
│   └── PBS-1.1.1.4 Workflow Dispatcher
│
├── PBS-1.1.2 Agent Configuration Framework
│   ├── PBS-1.1.2.1 Agent Registry
│   ├── PBS-1.1.2.2 Capability Definitions
│   └── PBS-1.1.2.3 Permission Boundaries
│
├── PBS-1.1.3 Conversation Interface
│   ├── PBS-1.1.3.1 Command Parser
│   ├── PBS-1.1.3.2 Context Manager
│   ├── PBS-1.1.3.3 Progress Reporter
│   └── PBS-1.1.3.4 Error Handler
│
└── PBS-1.1.4 Audit & Logging System
    ├── PBS-1.1.4.1 Event Schema
    ├── PBS-1.1.4.2 Audit Service
    ├── PBS-1.1.4.3 Supabase Integration
    └── PBS-1.1.4.4 Query Interface
```

---

### PBS-1.2 Sub-Agent Suite

```
PBS-1.2 Sub-Agent Suite
│
├── PBS-1.2.1 Coolify Agent
│   ├── PBS-1.2.1.1 Project Management
│   ├── PBS-1.2.1.2 Environment Management
│   ├── PBS-1.2.1.3 Application Management
│   ├── PBS-1.2.1.4 Deployment Management
│   └── PBS-1.2.1.5 Server Management
│
├── PBS-1.2.2 GitHub Agent
│   ├── PBS-1.2.2.1 Repository Management
│   ├── PBS-1.2.2.2 Branch Management
│   ├── PBS-1.2.2.3 Secrets Management
│   └── PBS-1.2.2.4 Webhook Configuration
│
├── PBS-1.2.3 Supabase Agent
│   ├── PBS-1.2.3.1 Project Management
│   ├── PBS-1.2.3.2 Schema Management
│   ├── PBS-1.2.3.3 RLS Management
│   └── PBS-1.2.3.4 Backup Management
│
├── PBS-1.2.4 Configuration Agent
│   ├── PBS-1.2.4.1 Config Loading
│   ├── PBS-1.2.4.2 Inheritance Resolution
│   ├── PBS-1.2.4.3 Validation
│   └── PBS-1.2.4.4 Environment Export
│
└── PBS-1.2.5 Audit Agent
    ├── PBS-1.2.5.1 Event Logging
    ├── PBS-1.2.5.2 Query Execution
    └── PBS-1.2.5.3 Report Generation
```

---

### PBS-1.3 Tool Library

```
PBS-1.3 Tool Library
│
├── PBS-1.3.1 Coolify Tools (via MCP)
│   ├── PBS-1.3.1.1 create_project
│   ├── PBS-1.3.1.2 create_environment
│   ├── PBS-1.3.1.3 create_application
│   ├── PBS-1.3.1.4 deploy_application
│   ├── PBS-1.3.1.5 get_deployment_logs
│   ├── PBS-1.3.1.6 set_env_vars
│   ├── PBS-1.3.1.7 configure_domain
│   ├── PBS-1.3.1.8 start_application
│   ├── PBS-1.3.1.9 stop_application
│   ├── PBS-1.3.1.10 restart_application
│   ├── PBS-1.3.1.11 get_server_status
│   └── PBS-1.3.1.12 get_server_resources
│
├── PBS-1.3.2 GitHub Tools
│   ├── PBS-1.3.2.1 create_repo
│   ├── PBS-1.3.2.2 configure_branch_protection
│   ├── PBS-1.3.2.3 create_github_app_install
│   ├── PBS-1.3.2.4 set_secret
│   ├── PBS-1.3.2.5 create_workflow
│   └── PBS-1.3.2.6 trigger_workflow
│
├── PBS-1.3.3 Supabase Tools
│   ├── PBS-1.3.3.1 create_project
│   ├── PBS-1.3.3.2 run_migration
│   ├── PBS-1.3.3.3 configure_rls
│   ├── PBS-1.3.3.4 create_backup
│   └── PBS-1.3.3.5 get_connection_string
│
└── PBS-1.3.4 Configuration Tools
    ├── PBS-1.3.4.1 load_config
    ├── PBS-1.3.4.2 merge_config
    ├── PBS-1.3.4.3 validate_config
    └── PBS-1.3.4.4 export_env_vars
```

---

### PBS-1.4 Configuration Management System

```
PBS-1.4 Configuration Management System
│
├── PBS-1.4.1 Configuration Schemas
│   ├── PBS-1.4.1.1 PF-CORE Schema (pf-core.schema.json)
│   ├── PBS-1.4.1.2 Instance Schema (instance.schema.json)
│   ├── PBS-1.4.1.3 Product Schema (product.schema.json)
│   └── PBS-1.4.1.4 White-Label Schema (white-label.schema.json)
│
├── PBS-1.4.2 Inheritance Engine
│   ├── PBS-1.4.2.1 Parent Resolution
│   ├── PBS-1.4.2.2 Deep Merge Logic
│   ├── PBS-1.4.2.3 Override Detection
│   └── PBS-1.4.2.4 Conflict Resolution
│
├── PBS-1.4.3 Validation System
│   ├── PBS-1.4.3.1 JSON Schema Validator
│   ├── PBS-1.4.3.2 Cross-Reference Validator
│   └── PBS-1.4.3.3 Environment Validator
│
└── PBS-1.4.4 Template Library
    ├── PBS-1.4.4.1 Jinja2 Templates
    ├── PBS-1.4.4.2 Variable Substitution
    └── PBS-1.4.4.3 Conditional Logic
```

---

### PBS-1.5 Instance & Product Templates

```
PBS-1.5 Instance & Product Templates
│
├── PBS-1.5.1 PF-CORE Base Templates
│   ├── PBS-1.5.1.1 pf-core.config.yaml
│   ├── PBS-1.5.1.2 Base Design Tokens
│   ├── PBS-1.5.1.3 Base README Template
│   └── PBS-1.5.1.4 Base .gitignore
│
├── PBS-1.5.2 Instance Templates
│   ├── PBS-1.5.2.1 AIR Instance Config
│   ├── PBS-1.5.2.2 AIR Design Tokens
│   ├── PBS-1.5.2.3 BAIV Instance Config
│   ├── PBS-1.5.2.4 BAIV Design Tokens
│   ├── PBS-1.5.2.5 W4M Instance Config
│   └── PBS-1.5.2.6 W4M Design Tokens
│
├── PBS-1.5.3 Product Templates
│   ├── PBS-1.5.3.1 EP Product Config
│   ├── PBS-1.5.3.2 VHF Product Config
│   ├── PBS-1.5.3.3 WWG Product Config
│   ├── PBS-1.5.3.4 ENDV Product Config
│   └── PBS-1.5.3.5 RNOR Product Config
│
└── PBS-1.5.4 White-Label Templates
    ├── PBS-1.5.4.1 White-Label Base Config
    ├── PBS-1.5.4.2 Client Branding Template
    └── PBS-1.5.4.3 Client Isolation Config
```

---

### PBS-1.6 Coolify Project Templates

```
PBS-1.6 Coolify Project Templates
│
├── PBS-1.6.1 Project Structure Templates
│   ├── PBS-1.6.1.1 Instance Project Template
│   ├── PBS-1.6.1.2 Product Environment Template
│   └── PBS-1.6.1.3 White-Label Project Template
│
├── PBS-1.6.2 Application Templates
│   ├── PBS-1.6.2.1 Next.js Application Config
│   ├── PBS-1.6.2.2 Nixpacks Build Settings
│   ├── PBS-1.6.2.3 Dockerfile Alternative
│   └── PBS-1.6.2.4 Health Check Configuration
│
├── PBS-1.6.3 Environment Configuration
│   ├── PBS-1.6.3.1 Development Settings
│   ├── PBS-1.6.3.2 Staging Settings
│   ├── PBS-1.6.3.3 Production Settings
│   └── PBS-1.6.3.4 Preview Deployment Settings
│
├── PBS-1.6.4 Domain & SSL Templates
│   ├── PBS-1.6.4.1 Domain Naming Convention
│   ├── PBS-1.6.4.2 SSL Configuration
│   └── PBS-1.6.4.3 Wildcard Domain Setup
│
└── PBS-1.6.5 Resource Limits
    ├── PBS-1.6.5.1 Development Limits
    ├── PBS-1.6.5.2 Staging Limits
    └── PBS-1.6.5.3 Production Limits
```

---

### PBS-1.7 Database Templates

```
PBS-1.7 Database Templates
│
├── PBS-1.7.1 Core Schema
│   ├── PBS-1.7.1.1 001_pf_core_base.sql
│   ├── PBS-1.7.1.2 002_auth_tables.sql
│   ├── PBS-1.7.1.3 003_audit_tables.sql
│   └── PBS-1.7.1.4 004_config_tables.sql
│
├── PBS-1.7.2 Instance Schema Extensions
│   ├── PBS-1.7.2.1 air_schema.sql
│   ├── PBS-1.7.2.2 baiv_schema.sql
│   └── PBS-1.7.2.3 w4m_schema.sql
│
├── PBS-1.7.3 Product Schema Extensions
│   ├── PBS-1.7.3.1 ep_schema.sql
│   ├── PBS-1.7.3.2 vhf_schema.sql
│   ├── PBS-1.7.3.3 wwg_schema.sql
│   ├── PBS-1.7.3.4 endv_schema.sql
│   └── PBS-1.7.3.5 rnor_schema.sql
│
├── PBS-1.7.4 RLS Policy Templates
│   ├── PBS-1.7.4.1 Organization Isolation
│   ├── PBS-1.7.4.2 Instance Access Control
│   └── PBS-1.7.4.3 Product Permissions
│
└── PBS-1.7.5 Database Functions
    ├── PBS-1.7.5.1 Utility Functions
    ├── PBS-1.7.5.2 Trigger Functions
    └── PBS-1.7.5.3 RPC Functions
```

---

### PBS-1.8 MCP Integration

```
PBS-1.8 MCP Integration
│
├── PBS-1.8.1 Coolify MCP Server Setup
│   ├── PBS-1.8.1.1 Server Installation
│   ├── PBS-1.8.1.2 Configuration
│   └── PBS-1.8.1.3 Authentication
│
├── PBS-1.8.2 MCP Client Integration
│   ├── PBS-1.8.2.1 Client Configuration
│   ├── PBS-1.8.2.2 Tool Discovery
│   └── PBS-1.8.2.3 Error Handling
│
└── PBS-1.8.3 Custom MCP Extensions
    ├── PBS-1.8.3.1 Workflow Prompts
    ├── PBS-1.8.3.2 Resource Definitions
    └── PBS-1.8.3.3 Custom Tools
```

---

### PBS-1.9 Documentation

```
PBS-1.9 Documentation
│
├── PBS-1.9.1 Agent User Guide
│   ├── PBS-1.9.1.1 Getting Started
│   ├── PBS-1.9.1.2 Command Reference
│   ├── PBS-1.9.1.3 Workflow Examples
│   └── PBS-1.9.1.4 Troubleshooting
│
├── PBS-1.9.2 Configuration Reference
│   ├── PBS-1.9.2.1 Schema Documentation
│   ├── PBS-1.9.2.2 Variable Reference
│   └── PBS-1.9.2.3 Template Guide
│
├── PBS-1.9.3 Operations Runbook
│   ├── PBS-1.9.3.1 Deployment Procedures
│   ├── PBS-1.9.3.2 Rollback Procedures
│   ├── PBS-1.9.3.3 Monitoring Guide
│   └── PBS-1.9.3.4 Disaster Recovery
│
└── PBS-1.9.4 API Documentation
    ├── PBS-1.9.4.1 Tool Reference
    ├── PBS-1.9.4.2 MCP Integration
    └── PBS-1.9.4.3 Webhook Specifications
```

---

### PBS-1.10 Testing & Validation

```
PBS-1.10 Testing & Validation
│
├── PBS-1.10.1 Unit Tests
│   ├── PBS-1.10.1.1 Tool Unit Tests
│   ├── PBS-1.10.1.2 Config Unit Tests
│   ├── PBS-1.10.1.3 Inheritance Unit Tests
│   └── PBS-1.10.1.4 Validation Unit Tests
│
├── PBS-1.10.2 Integration Tests
│   ├── PBS-1.10.2.1 Coolify API Tests
│   ├── PBS-1.10.2.2 GitHub API Tests
│   ├── PBS-1.10.2.3 Supabase API Tests
│   └── PBS-1.10.2.4 MCP Integration Tests
│
├── PBS-1.10.3 Provisioning Tests
│   ├── PBS-1.10.3.1 Instance Provisioning
│   ├── PBS-1.10.3.2 Product Provisioning
│   └── PBS-1.10.3.3 White-Label Provisioning
│
└── PBS-1.10.4 End-to-End Scenarios
    ├── PBS-1.10.4.1 Create AIR Instance
    ├── PBS-1.10.4.2 Create EP Product
    ├── PBS-1.10.4.3 Deploy to Production
    ├── PBS-1.10.4.4 Rollback Deployment
    └── PBS-1.10.4.5 White-Label WWG
```

---

## 3. MoSCoW Prioritisation

### Must Have (MVP)

| PBS ID | Deliverable | Rationale |
|--------|-------------|-----------|
| PBS-1.1.1 | Primary Orchestrator Agent | Core functionality |
| PBS-1.2.1 | Coolify Agent | Primary infrastructure |
| PBS-1.2.2 | GitHub Agent | Repository management |
| PBS-1.3.1 | Coolify Tools (MCP) | Leverage existing MCP |
| PBS-1.3.2 | GitHub Tools | Essential for repos |
| PBS-1.4.1 | Configuration Schemas | Config foundation |
| PBS-1.5.1 | PF-CORE Base Templates | Platform base |
| PBS-1.6.1 | Project Structure Templates | Coolify setup |
| PBS-1.6.2 | Application Templates | App deployment |
| PBS-1.8.1 | Coolify MCP Server Setup | MCP integration |

### Should Have (Phase 2)

| PBS ID | Deliverable | Rationale |
|--------|-------------|-----------|
| PBS-1.2.3 | Supabase Agent | Database management |
| PBS-1.2.4 | Configuration Agent | Advanced config |
| PBS-1.3.3 | Supabase Tools | DB automation |
| PBS-1.4.2 | Inheritance Engine | Config inheritance |
| PBS-1.5.2 | Instance Templates | AIR, BAIV, W4M |
| PBS-1.7.1 | Core Schema | Database foundation |
| PBS-1.7.2 | Instance Schema Extensions | Per-instance DB |

### Could Have (Phase 3)

| PBS ID | Deliverable | Rationale |
|--------|-------------|-----------|
| PBS-1.2.5 | Audit Agent | Compliance |
| PBS-1.5.3 | Product Templates | Product configs |
| PBS-1.5.4 | White-Label Templates | Client isolation |
| PBS-1.7.3 | Product Schema Extensions | Product DBs |
| PBS-1.9.1-4 | Full Documentation | Complete docs |
| PBS-1.10.4 | E2E Scenarios | Full testing |

### Won't Have (Future)

| PBS ID | Deliverable | Rationale |
|--------|-------------|-----------|
| PBS-1.8.3 | Custom MCP Extensions | Advanced features |
| - | Multi-server orchestration | Scale feature |
| - | Kubernetes support | Future Coolify feature |

---

## 4. PBS to PRD Traceability

| PBS Element | PRD Requirement |
|-------------|-----------------|
| PBS-1.1.1 | FR-010 (Conversational Interface) |
| PBS-1.2.1 | FR-001, FR-002, FR-003 (Provisioning) |
| PBS-1.2.2 | FR-005 (GitHub Integration) |
| PBS-1.2.3 | FR-007 (Database Management) |
| PBS-1.2.4 | FR-004 (Configuration Management) |
| PBS-1.3.1 | FR-006 (Server Management) |
| PBS-1.4.1-4 | FR-004 (Configuration Management) |
| PBS-1.5.1-4 | FR-001, FR-002 (Provisioning) |
| PBS-1.6.1-5 | FR-001, FR-002, FR-003 (Environments) |
| PBS-1.7.1-5 | FR-007 (Database Management) |
| PBS-1.8.1-3 | FR-006 (Server Management) |
| PBS-1.9.1-4 | NFR-Documentation |
| PBS-1.10.1-4 | NFR-Quality |

---

## 5. Dependency Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PBS DEPENDENCY MAP                                   │
│                                                                              │
│  ┌─────────────┐                                                            │
│  │ PBS-1.4.1   │  Configuration Schemas                                     │
│  │ Schemas     │──────────────────────────────────────┐                     │
│  └──────┬──────┘                                      │                     │
│         │                                              │                     │
│         ▼                                              ▼                     │
│  ┌─────────────┐                              ┌─────────────┐               │
│  │ PBS-1.4.2   │                              │ PBS-1.5     │               │
│  │ Inheritance │                              │ Templates   │               │
│  └──────┬──────┘                              └──────┬──────┘               │
│         │                                            │                       │
│         ▼                                            ▼                       │
│  ┌─────────────┐                              ┌─────────────┐               │
│  │ PBS-1.3.4   │                              │ PBS-1.6     │               │
│  │ Config Tools│                              │ Coolify Tpl │               │
│  └──────┬──────┘                              └──────┬──────┘               │
│         │                                            │                       │
│         └──────────────────┬─────────────────────────┘                      │
│                            │                                                 │
│                            ▼                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                      │
│  │ PBS-1.8     │    │ PBS-1.3.1   │    │ PBS-1.3.2   │                      │
│  │ MCP Setup   │───▶│ Coolify Tls │    │ GitHub Tls  │                      │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘                      │
│                            │                   │                             │
│                            ▼                   ▼                             │
│                     ┌─────────────┐    ┌─────────────┐                      │
│                     │ PBS-1.2.1   │    │ PBS-1.2.2   │                      │
│                     │ Coolify Agt │    │ GitHub Agt  │                      │
│                     └──────┬──────┘    └──────┬──────┘                      │
│                            │                   │                             │
│                            └─────────┬─────────┘                            │
│                                      │                                       │
│                                      ▼                                       │
│                            ┌─────────────────┐                              │
│                            │    PBS-1.1.1    │                              │
│                            │   Orchestrator  │                              │
│                            └─────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Deliverable Summary

| Category | Count | Must Have | Should Have | Could Have |
|----------|-------|-----------|-------------|------------|
| Agent Core | 16 | 8 | 4 | 4 |
| Sub-Agents | 17 | 8 | 6 | 3 |
| Tools | 22 | 14 | 4 | 4 |
| Config System | 14 | 6 | 4 | 4 |
| Templates | 24 | 8 | 8 | 8 |
| Coolify Templates | 14 | 8 | 4 | 2 |
| Database | 15 | 4 | 6 | 5 |
| MCP | 9 | 3 | 3 | 3 |
| Documentation | 12 | 2 | 4 | 6 |
| Testing | 14 | 4 | 6 | 4 |
| **TOTAL** | **157** | **65** | **49** | **43** |

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**— END OF PBS —**
