# Work Breakdown Structure (WBS)

## PF-CORE Coolify CI/CD Automation Agent

**Task-Level Decomposition with Estimates, Dependencies & Assignments**

---

| Field | Value |
|-------|-------|
| **Document ID** | WBS-PF-COOLIFY-AGENT-001 |
| **Version** | 1.0.0 |
| **Date** | December 2025 |
| **Source PRD** | PRD-PF-COOLIFY-AGENT-001 |
| **Source PBS** | PBS-PF-COOLIFY-AGENT-001 |
| **Classification** | CONFIDENTIAL |

---

## 1. WBS Summary

| Phase | Tasks | Estimated Effort | Duration |
|-------|-------|------------------|----------|
| **Phase 1: Foundation & Coolify Setup** | 24 | 10 days | Weeks 1-2 |
| **Phase 2: MCP Integration & Tools** | 20 | 10 days | Weeks 2-4 |
| **Phase 3: Agent Development** | 22 | 10 days | Weeks 4-6 |
| **Phase 4: Templates & Config** | 28 | 12 days | Weeks 6-8 |
| **Phase 5: Integration & Testing** | 18 | 8 days | Weeks 8-10 |
| **Phase 6: Documentation** | 12 | 5 days | Weeks 10-11 |
| **TOTAL** | **124** | **55 days** | **~11 weeks** |

---

## 2. Phase 1: Foundation & Coolify Setup (Weeks 1-2)

### WBS-1.1 Infrastructure Setup

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-1.1.1 | Provision Hetzner CPX31 server | PBS-1.6 | 0.5d | None | Server provisioned |
| WBS-1.1.2 | Install Coolify via curl script | PBS-1.6 | 0.5d | WBS-1.1.1 | Coolify running |
| WBS-1.1.3 | Configure DNS (*.pfcore.io) | PBS-1.6.4 | 0.5d | WBS-1.1.1 | DNS configured |
| WBS-1.1.4 | Setup Coolify admin account | PBS-1.6 | 0.25d | WBS-1.1.2 | Admin access |
| WBS-1.1.5 | Generate Coolify API token | PBS-1.8.1 | 0.25d | WBS-1.1.4 | API token |
| WBS-1.1.6 | Configure GitHub App in Coolify | PBS-1.6 | 0.5d | WBS-1.1.4 | GitHub integration |
| WBS-1.1.7 | Test auto-deploy workflow | PBS-1.6 | 0.5d | WBS-1.1.6 | Deployment working |

**Subtotal: 3 days**

---

### WBS-1.2 Project Setup

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-1.2.1 | Create agent project repository | PBS-1.1 | 0.5d | None | GitHub repo |
| WBS-1.2.2 | Setup Python project structure | PBS-1.1 | 0.5d | WBS-1.2.1 | pyproject.toml, src/ |
| WBS-1.2.3 | Configure development environment | PBS-1.1 | 0.5d | WBS-1.2.2 | .env.example |
| WBS-1.2.4 | Setup CI pipeline | PBS-1.10.1 | 0.5d | WBS-1.2.2 | .github/workflows/ci.yml |
| WBS-1.2.5 | Configure linting (ruff, black) | PBS-1.10.1 | 0.25d | WBS-1.2.2 | Linting config |
| WBS-1.2.6 | Setup pytest framework | PBS-1.10.1 | 0.25d | WBS-1.2.2 | Test structure |

**Subtotal: 2.5 days**

---

### WBS-1.3 Configuration Schema Design

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-1.3.1 | Design PF-CORE config schema | PBS-1.4.1.1 | 1d | None | pf-core.schema.json |
| WBS-1.3.2 | Design instance config schema | PBS-1.4.1.2 | 0.5d | WBS-1.3.1 | instance.schema.json |
| WBS-1.3.3 | Design product config schema | PBS-1.4.1.3 | 0.5d | WBS-1.3.2 | product.schema.json |
| WBS-1.3.4 | Design white-label config schema | PBS-1.4.1.4 | 0.5d | WBS-1.3.3 | white-label.schema.json |
| WBS-1.3.5 | Implement JSON Schema validation | PBS-1.4.3.1 | 1d | WBS-1.3.1-4 | config_validator.py |
| WBS-1.3.6 | Create schema documentation | PBS-1.9.2.1 | 0.5d | WBS-1.3.1-4 | schema-reference.md |

**Subtotal: 4 days**

---

### WBS-1.4 Audit System Foundation

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-1.4.1 | Design audit event schema | PBS-1.1.4.1 | 0.25d | None | audit_event.schema.json |
| WBS-1.4.2 | Implement audit service | PBS-1.1.4.2 | 0.5d | WBS-1.4.1 | audit_service.py |
| WBS-1.4.3 | Create Supabase audit table | PBS-1.1.4.3 | 0.25d | WBS-1.4.1 | audit_logs migration |
| WBS-1.4.4 | Implement @audit decorator | PBS-1.1.4.2 | 0.25d | WBS-1.4.2 | Decorator function |
| WBS-1.4.5 | Unit tests for audit | PBS-1.10.1.1 | 0.25d | WBS-1.4.2 | test_audit.py |

**Subtotal: 1.5 days**

---

## 3. Phase 2: MCP Integration & Tools (Weeks 2-4)

### WBS-2.1 Coolify MCP Server Setup

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-2.1.1 | Clone Coolify MCP Server repo | PBS-1.8.1.1 | 0.25d | None | Local repo |
| WBS-2.1.2 | Configure MCP Server | PBS-1.8.1.2 | 0.5d | WBS-2.1.1 | config.json |
| WBS-2.1.3 | Set API credentials | PBS-1.8.1.3 | 0.25d | WBS-1.1.5 | Credentials set |
| WBS-2.1.4 | Test MCP Server connection | PBS-1.8.1 | 0.5d | WBS-2.1.3 | Connection verified |
| WBS-2.1.5 | Document MCP tools available | PBS-1.8.1 | 0.5d | WBS-2.1.4 | Tool inventory |

**Subtotal: 2 days**

---

### WBS-2.2 MCP Client Integration

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-2.2.1 | Install MCP client library | PBS-1.8.2 | 0.25d | WBS-1.2.2 | Dependency added |
| WBS-2.2.2 | Configure MCP client | PBS-1.8.2.1 | 0.5d | WBS-2.2.1 | mcp_client.py |
| WBS-2.2.3 | Implement tool discovery | PBS-1.8.2.2 | 0.5d | WBS-2.2.2 | Tool discovery |
| WBS-2.2.4 | Implement error handling | PBS-1.8.2.3 | 0.5d | WBS-2.2.2 | Error handlers |
| WBS-2.2.5 | Integration tests for MCP | PBS-1.10.2.4 | 0.5d | WBS-2.2.2-4 | test_mcp.py |

**Subtotal: 2.25 days**

---

### WBS-2.3 GitHub Tools

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-2.3.1 | Setup GitHub API client | PBS-1.3.2 | 0.5d | WBS-1.2.2 | github_client.py |
| WBS-2.3.2 | Implement create_repo tool | PBS-1.3.2.1 | 0.5d | WBS-2.3.1 | create_repo.py |
| WBS-2.3.3 | Implement branch_protection tool | PBS-1.3.2.2 | 0.5d | WBS-2.3.1 | branch_protection.py |
| WBS-2.3.4 | Implement set_secret tool | PBS-1.3.2.4 | 0.5d | WBS-2.3.1 | set_secret.py |
| WBS-2.3.5 | Implement create_workflow tool | PBS-1.3.2.5 | 0.5d | WBS-2.3.1 | create_workflow.py |
| WBS-2.3.6 | Unit tests for GitHub tools | PBS-1.10.1.1 | 1d | WBS-2.3.2-5 | test_github_tools.py |

**Subtotal: 3.5 days**

---

### WBS-2.4 Supabase Tools

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-2.4.1 | Setup Supabase Management API client | PBS-1.3.3 | 0.5d | WBS-1.2.2 | supabase_client.py |
| WBS-2.4.2 | Implement create_project tool | PBS-1.3.3.1 | 0.5d | WBS-2.4.1 | create_project.py |
| WBS-2.4.3 | Implement run_migration tool | PBS-1.3.3.2 | 0.5d | WBS-2.4.1 | run_migration.py |
| WBS-2.4.4 | Implement configure_rls tool | PBS-1.3.3.3 | 0.5d | WBS-2.4.1 | configure_rls.py |
| WBS-2.4.5 | Unit tests for Supabase tools | PBS-1.10.1.1 | 0.5d | WBS-2.4.2-4 | test_supabase_tools.py |

**Subtotal: 2.5 days**

---

## 4. Phase 3: Agent Development (Weeks 4-6)

### WBS-3.1 Configuration Agent

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-3.1.1 | Design inheritance algorithm | PBS-1.4.2 | 0.5d | WBS-1.3.1-4 | Design doc |
| WBS-3.1.2 | Implement config loader | PBS-1.3.4.1 | 0.5d | WBS-3.1.1 | load_config.py |
| WBS-3.1.3 | Implement deep merge | PBS-1.4.2.2 | 0.5d | WBS-3.1.2 | merge_config.py |
| WBS-3.1.4 | Implement override detection | PBS-1.4.2.3 | 0.5d | WBS-3.1.3 | Override tracking |
| WBS-3.1.5 | Implement env var export | PBS-1.3.4.4 | 0.5d | WBS-3.1.3 | export_env.py |
| WBS-3.1.6 | Create Configuration Agent | PBS-1.2.4 | 0.5d | WBS-3.1.2-5 | config_agent.py |
| WBS-3.1.7 | Unit tests for config | PBS-1.10.1.2 | 1d | WBS-3.1.2-6 | test_config.py |

**Subtotal: 4 days**

---

### WBS-3.2 Sub-Agent Implementation

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-3.2.1 | Create Coolify Agent | PBS-1.2.1 | 1d | WBS-2.2 | coolify_agent.py |
| WBS-3.2.2 | Create GitHub Agent | PBS-1.2.2 | 1d | WBS-2.3 | github_agent.py |
| WBS-3.2.3 | Create Supabase Agent | PBS-1.2.3 | 1d | WBS-2.4 | supabase_agent.py |
| WBS-3.2.4 | Create Audit Agent | PBS-1.2.5 | 0.5d | WBS-1.4 | audit_agent.py |
| WBS-3.2.5 | Integration tests for sub-agents | PBS-1.10.2 | 1d | WBS-3.2.1-4 | test_subagents.py |

**Subtotal: 4.5 days**

---

### WBS-3.3 Primary Orchestrator Agent

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-3.3.1 | Design system prompt | PBS-1.1.1.1 | 0.5d | None | system_prompt.md |
| WBS-3.3.2 | Implement agent definition | PBS-1.1.1.2 | 1d | WBS-3.3.1 | orchestrator.py |
| WBS-3.3.3 | Implement tool bindings | PBS-1.1.1.3 | 0.5d | WBS-3.2 | Tool registry |
| WBS-3.3.4 | Implement workflow dispatcher | PBS-1.1.1.4 | 1d | WBS-3.3.2 | workflow_dispatcher.py |
| WBS-3.3.5 | Implement progress reporter | PBS-1.1.3.3 | 0.5d | WBS-3.3.2 | Progress callbacks |
| WBS-3.3.6 | Implement error handler | PBS-1.1.3.4 | 0.5d | WBS-3.3.2 | Error handling |

**Subtotal: 4 days**

---

## 5. Phase 4: Templates & Configuration (Weeks 6-8)

### WBS-4.1 PF-CORE Base Templates

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-4.1.1 | Create pf-core.config.yaml | PBS-1.5.1.1 | 0.5d | WBS-1.3 | Base config |
| WBS-4.1.2 | Create base design tokens | PBS-1.5.1.2 | 0.5d | None | design-tokens.json |
| WBS-4.1.3 | Create README template | PBS-1.5.1.3 | 0.25d | None | README.md.template |
| WBS-4.1.4 | Create .gitignore template | PBS-1.5.1.4 | 0.25d | None | .gitignore.template |
| WBS-4.1.5 | Create package.json template | PBS-1.5.1 | 0.25d | None | package.json.template |
| WBS-4.1.6 | Create next.config.js template | PBS-1.5.1 | 0.25d | None | next.config.js.template |

**Subtotal: 2 days**

---

### WBS-4.2 Coolify Project Templates

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-4.2.1 | Create instance project template | PBS-1.6.1.1 | 0.5d | WBS-4.1 | instance_project.yaml |
| WBS-4.2.2 | Create environment template | PBS-1.6.1.2 | 0.5d | WBS-4.2.1 | environment.yaml |
| WBS-4.2.3 | Create application template | PBS-1.6.2.1 | 0.5d | WBS-4.2.2 | application.yaml |
| WBS-4.2.4 | Configure Nixpacks settings | PBS-1.6.2.2 | 0.5d | WBS-4.2.3 | nixpacks.toml |
| WBS-4.2.5 | Create health check config | PBS-1.6.2.4 | 0.25d | WBS-4.2.3 | Health check settings |
| WBS-4.2.6 | Create dev environment settings | PBS-1.6.3.1 | 0.25d | WBS-4.2.2 | dev.settings.yaml |
| WBS-4.2.7 | Create staging environment settings | PBS-1.6.3.2 | 0.25d | WBS-4.2.2 | staging.settings.yaml |
| WBS-4.2.8 | Create prod environment settings | PBS-1.6.3.3 | 0.25d | WBS-4.2.2 | prod.settings.yaml |
| WBS-4.2.9 | Create resource limits templates | PBS-1.6.5 | 0.5d | WBS-4.2.3 | Resource configs |

**Subtotal: 3.5 days**

---

### WBS-4.3 Instance Templates

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-4.3.1 | Create AIR instance config | PBS-1.5.2.1 | 0.5d | WBS-4.1.1 | air.instance.yaml |
| WBS-4.3.2 | Create AIR design tokens | PBS-1.5.2.2 | 0.25d | WBS-4.1.2 | air/design-tokens.json |
| WBS-4.3.3 | Create BAIV instance config | PBS-1.5.2.3 | 0.5d | WBS-4.1.1 | baiv.instance.yaml |
| WBS-4.3.4 | Create BAIV design tokens | PBS-1.5.2.4 | 0.25d | WBS-4.1.2 | baiv/design-tokens.json |
| WBS-4.3.5 | Create W4M instance config | PBS-1.5.2.5 | 0.5d | WBS-4.1.1 | w4m.instance.yaml |
| WBS-4.3.6 | Create W4M design tokens | PBS-1.5.2.6 | 0.25d | WBS-4.1.2 | w4m/design-tokens.json |

**Subtotal: 2.25 days**

---

### WBS-4.4 Product & White-Label Templates

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-4.4.1 | Create EP product config | PBS-1.5.3.1 | 0.25d | WBS-4.3.1 | air-ep.product.yaml |
| WBS-4.4.2 | Create VHF product config | PBS-1.5.3.2 | 0.25d | WBS-4.3.3 | baiv-vhf.product.yaml |
| WBS-4.4.3 | Create WWG product config | PBS-1.5.3.3 | 0.25d | WBS-4.3.3 | baiv-wwg.product.yaml |
| WBS-4.4.4 | Create ENDV product config | PBS-1.5.3.4 | 0.25d | WBS-4.3.5 | w4m-endv.product.yaml |
| WBS-4.4.5 | Create RNOR product config | PBS-1.5.3.5 | 0.25d | WBS-4.3.5 | w4m-rnor.product.yaml |
| WBS-4.4.6 | Create white-label base template | PBS-1.5.4.1 | 0.5d | WBS-4.1 | white-label.base.yaml |
| WBS-4.4.7 | Create client branding template | PBS-1.5.4.2 | 0.25d | WBS-4.4.6 | client-branding.yaml |

**Subtotal: 2 days**

---

### WBS-4.5 Database Templates

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-4.5.1 | Create PF-CORE base migration | PBS-1.7.1.1 | 1d | None | 001_pf_core_base.sql |
| WBS-4.5.2 | Create auth tables migration | PBS-1.7.1.2 | 0.5d | WBS-4.5.1 | 002_auth_tables.sql |
| WBS-4.5.3 | Create audit tables migration | PBS-1.7.1.3 | 0.25d | WBS-4.5.1 | 003_audit_tables.sql |
| WBS-4.5.4 | Create AIR schema extension | PBS-1.7.2.1 | 0.5d | WBS-4.5.1 | air_schema.sql |
| WBS-4.5.5 | Create BAIV schema extension | PBS-1.7.2.2 | 0.5d | WBS-4.5.1 | baiv_schema.sql |
| WBS-4.5.6 | Create W4M schema extension | PBS-1.7.2.3 | 0.5d | WBS-4.5.1 | w4m_schema.sql |
| WBS-4.5.7 | Create RLS policy templates | PBS-1.7.4 | 0.5d | WBS-4.5.1 | rls_policies.sql |

**Subtotal: 3.75 days**

---

## 6. Phase 5: Integration & Testing (Weeks 8-10)

### WBS-5.1 Workflow Implementation

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-5.1.1 | Implement provision_instance workflow | PBS-1.1.1.4 | 1d | WBS-3.3 | provision_instance.py |
| WBS-5.1.2 | Implement provision_product workflow | PBS-1.1.1.4 | 0.5d | WBS-5.1.1 | provision_product.py |
| WBS-5.1.3 | Implement deploy_to_environment workflow | PBS-1.1.1.4 | 0.5d | WBS-5.1.1 | deploy_environment.py |
| WBS-5.1.4 | Implement promote_deployment workflow | PBS-1.1.1.4 | 0.5d | WBS-5.1.3 | promote_deployment.py |
| WBS-5.1.5 | Implement rollback workflow | PBS-1.1.1.4 | 0.5d | WBS-5.1.3 | rollback.py |
| WBS-5.1.6 | Implement create_white_label workflow | PBS-1.1.1.4 | 0.5d | WBS-5.1.1 | create_white_label.py |

**Subtotal: 3.5 days**

---

### WBS-5.2 Integration Testing

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-5.2.1 | Create test fixtures | PBS-1.10.3 | 0.5d | WBS-4 | tests/fixtures/ |
| WBS-5.2.2 | Coolify API integration tests | PBS-1.10.2.1 | 1d | WBS-5.1 | test_coolify_integration.py |
| WBS-5.2.3 | GitHub API integration tests | PBS-1.10.2.2 | 0.5d | WBS-5.1 | test_github_integration.py |
| WBS-5.2.4 | Supabase API integration tests | PBS-1.10.2.3 | 0.5d | WBS-5.1 | test_supabase_integration.py |
| WBS-5.2.5 | Workflow integration tests | PBS-1.10.2 | 1d | WBS-5.1 | test_workflows.py |

**Subtotal: 3.5 days**

---

### WBS-5.3 End-to-End Testing

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-5.3.1 | E2E: Create AIR instance | PBS-1.10.4.1 | 0.5d | WBS-5.2 | test_e2e_air.py |
| WBS-5.3.2 | E2E: Create EP product | PBS-1.10.4.2 | 0.5d | WBS-5.3.1 | test_e2e_ep.py |
| WBS-5.3.3 | E2E: Deploy to production | PBS-1.10.4.3 | 0.5d | WBS-5.3.1 | test_e2e_deploy.py |
| WBS-5.3.4 | E2E: Rollback deployment | PBS-1.10.4.4 | 0.25d | WBS-5.3.3 | test_e2e_rollback.py |
| WBS-5.3.5 | E2E: White-label WWG | PBS-1.10.4.5 | 0.5d | WBS-5.3.1 | test_e2e_whitelabel.py |
| WBS-5.3.6 | Bug fixes and refinements | PBS-1.10 | 1.5d | WBS-5.3.1-5 | Bug fixes |

**Subtotal: 3.75 days**

---

## 7. Phase 6: Documentation (Weeks 10-11)

### WBS-6.1 Documentation

| WBS ID | Task | PBS Ref | Effort | Dependencies | Deliverable |
|--------|------|---------|--------|--------------|-------------|
| WBS-6.1.1 | Write Getting Started guide | PBS-1.9.1.1 | 0.5d | WBS-5 | docs/getting-started.md |
| WBS-6.1.2 | Write Command Reference | PBS-1.9.1.2 | 1d | WBS-5 | docs/command-reference.md |
| WBS-6.1.3 | Write Workflow Examples | PBS-1.9.1.3 | 0.5d | WBS-5 | docs/workflow-examples.md |
| WBS-6.1.4 | Write Troubleshooting guide | PBS-1.9.1.4 | 0.5d | WBS-5 | docs/troubleshooting.md |
| WBS-6.1.5 | Write Configuration Reference | PBS-1.9.2 | 1d | WBS-4 | docs/configuration.md |
| WBS-6.1.6 | Write Operations Runbook | PBS-1.9.3 | 1d | WBS-5 | docs/runbook.md |
| WBS-6.1.7 | Write API Documentation | PBS-1.9.4 | 0.5d | WBS-3 | docs/api-reference.md |

**Subtotal: 5 days**

---

## 8. WBS Gantt Chart

```
Week:        1    2    3    4    5    6    7    8    9    10   11
             |----|----|----|----|----|----|----|----|----|----|

Phase 1: Foundation & Coolify Setup
├─ WBS-1.1   ████
├─ WBS-1.2   ████
├─ WBS-1.3        ████████
└─ WBS-1.4             ████

Phase 2: MCP Integration & Tools
├─ WBS-2.1        ████
├─ WBS-2.2             ████
├─ WBS-2.3             ████████
└─ WBS-2.4                  ████

Phase 3: Agent Development
├─ WBS-3.1                  ████████
├─ WBS-3.2                       ████████
└─ WBS-3.3                            ████████

Phase 4: Templates & Config
├─ WBS-4.1                            ████
├─ WBS-4.2                            ████████
├─ WBS-4.3                                 ████
├─ WBS-4.4                                 ████
└─ WBS-4.5                                      ████████

Phase 5: Integration & Testing
├─ WBS-5.1                                      ████████
├─ WBS-5.2                                           ████████
└─ WBS-5.3                                                ████████

Phase 6: Documentation
└─ WBS-6.1                                                     ████████

MILESTONES:
    M1: Coolify Ready (Week 2)           ▲
    M2: MCP + Tools Ready (Week 4)            ▲
    M3: Agents Complete (Week 6)                   ▲
    M4: Templates Complete (Week 8)                     ▲
    M5: MVP Release (Week 11)                                    ▲
```

---

## 9. Resource Allocation

### 9.1 Role Definitions

| Role | Responsibilities | Allocation |
|------|------------------|------------|
| **Agent Developer** | Claude SDK, agent logic, workflows | 100% |
| **Platform Engineer** | Coolify setup, MCP, infrastructure | 80% |
| **Backend Developer** | API clients, tools, integration | 100% |
| **Technical Writer** | Documentation | 25% |

### 9.2 Task Assignment Matrix

| Phase | Agent Dev | Platform Eng | Backend Dev | Tech Writer |
|-------|-----------|--------------|-------------|-------------|
| **Phase 1** | WBS-1.3, WBS-1.4 | WBS-1.1 | WBS-1.2 | - |
| **Phase 2** | - | WBS-2.1, WBS-2.2 | WBS-2.3, WBS-2.4 | - |
| **Phase 3** | WBS-3.2, WBS-3.3 | - | WBS-3.1 | - |
| **Phase 4** | - | WBS-4.2 | WBS-4.1, WBS-4.3-5 | - |
| **Phase 5** | WBS-5.1 | WBS-5.2 | WBS-5.3 | - |
| **Phase 6** | - | - | - | WBS-6.1 |

---

## 10. Critical Path

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CRITICAL PATH                                        │
│                                                                              │
│  WBS-1.1.2 → WBS-2.1.1 → WBS-2.2.2 → WBS-3.2.1 → WBS-3.3.2 → WBS-5.1.1     │
│  (Coolify)   (MCP Srv)   (MCP Client) (Coolify   (Orchestr)  (Provision     │
│   Install     Setup       Config       Agent)      Agent)     Workflow)     │
│                                                                              │
│  Duration: ~40 days                                                          │
│                                                                              │
│  Key Dependencies:                                                           │
│  • Coolify must be running before MCP Server can connect                    │
│  • MCP Client requires MCP Server operational                               │
│  • Agents require tools to be implemented                                   │
│  • Workflows require all agents to be functional                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Risk Register

| Risk ID | Risk | Probability | Impact | Mitigation |
|---------|------|-------------|--------|------------|
| R1 | Coolify API changes | Low | Medium | Pin version, monitor releases |
| R2 | MCP Server compatibility | Medium | High | Test thoroughly, fallback to direct API |
| R3 | GitHub rate limits | Low | Medium | Caching, request batching |
| R4 | Supabase Management API limits | Medium | Medium | Document workarounds |
| R5 | Hetzner server capacity | Low | Medium | Monitor resources, scale plan |
| R6 | SSL certificate issues | Low | Low | Coolify handles auto-renewal |

---

## 12. Milestones & Exit Criteria

| Milestone | Week | Deliverables | Exit Criteria |
|-----------|------|--------------|---------------|
| **M1: Coolify Ready** | 2 | Coolify installed, GitHub App configured | Test app deploys successfully |
| **M2: MCP + Tools Ready** | 4 | MCP Server, all tool libraries | Tools can execute operations |
| **M3: Agents Complete** | 6 | All sub-agents + orchestrator | Agent responds to commands |
| **M4: Templates Complete** | 8 | All config + Coolify templates | Templates generate valid output |
| **M5: MVP Release** | 11 | Documentation, E2E tests passing | Full instance provisioning works |

---

## 13. Coolify vs Digital Ocean WBS Comparison

| WBS Area | Coolify Agent | DO Direct Agent | Difference |
|----------|---------------|-----------------|------------|
| **Infrastructure Setup** | 3 days (Coolify auto-manages) | 5 days (manual scripts) | -40% |
| **Deployment Tools** | 2 days (MCP available) | 4.5 days (custom tools) | -55% |
| **SSL/Domain Config** | 0.5 days (automatic) | 1.5 days (manual Certbot) | -67% |
| **Environment Management** | Native in Coolify | Custom implementation | Simpler |
| **Rollback Implementation** | Native API call | Custom scripts | Simpler |
| **Total Effort** | ~55 days | ~59 days | -7% |

**Key Advantage:** Coolify's higher abstraction level reduces custom infrastructure code significantly.

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**— END OF WBS —**
