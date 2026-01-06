# Value Management Database - Quick Start Guide

## Overview

This database schema enables tracking from **Strategic Vision → Product Requirements → Work Execution → Customer Validation** with full PFC-PFI module integration.

**Core Flow:**
```
Value Proposition → PRD → PBS (Product Breakdown) → WBS (Work Breakdown) → Task Execution → Customer Feedback → PMF Metrics
```

### 🤖 Agent-Driven PPM Automation

**AI agents manage and interact with MVP PPM ToDoLists** to automate Product/Project/Program Management workflows:

| Agent | Automates | Database Interaction |
|-------|-----------|---------------------|
| **Discovery Agent** | ICP extraction, ontology creation | Updates `value_propositions.target_icp` |
| **PBS Generator** | PRD → PBS decomposition (5 levels) | Creates `pbs_components` hierarchy |
| **Task Orchestrator** | Task creation, assignment, dependencies | Manages `wbs_tasks`, `wbs_task_dependencies` |
| **Progress Tracker** | Execution logging, completion updates | Logs `wbs_task_executions`, triggers auto-updates |
| **Validation Agent** | Feedback → PBS mapping | Links `customer_feedback` to `pfi_pbs_mappings` |
| **PMF Calculator** | Cohort analysis, score calculation | Updates `pmf_metrics`, `value_propositions.pmf_score` |
| **Bridge Monitor** | PFI health monitoring | Tracks `pfi_module_instances.health_status` |
| **Gap Analyzer** | Content gap identification | Creates P0/P1/P2 `wbs_tasks` |

**Benefits:** 80% reduction in manual PPM overhead, complete audit trails, strategic alignment maintained.

**Standards:** All agents follow PF-Core Unified Agent Specification Template v3.0.0 with RBAC boundaries, ontology bindings, and audit logging.

---

## File Structure

```
/home/claude/
├── value_management_core_schema.sql          # 8 tables: VP, PRD, PBS, WBS, Feedback, PMF
├── pfc_modules_schema.sql                    # 8 tables: PFC modules, PFI instances, bridges
├── baiv_pfc_module_seed_data.sql             # 22 BAIV PFC modules + 4 bridges
├── VALUE_MANAGEMENT_ARCHITECTURE.md          # Complete documentation (35+ pages)
└── VALUE_MANAGEMENT_QUICKSTART.md            # This file
```

---

## 5-Minute Setup

### Step 1: Deploy Schemas (2 min)

```bash
# Create Supabase project (or use existing)
supabase init
supabase start

# Deploy core schema
psql -h db.supabase.co -U postgres -d your_db -f value_management_core_schema.sql

# Deploy PFC modules
psql -h db.supabase.co -U postgres -d your_db -f pfc_modules_schema.sql

# Seed BAIV modules
psql -h db.supabase.co -U postgres -d your_db -f baiv_pfc_module_seed_data.sql
```

### Step 2: Create Tenant (1 min)

```sql
-- Assumes you already have tenants table from security foundation
INSERT INTO tenants (id, name, plan_tier) 
VALUES ('your-tenant-uuid', 'BAIV', 'enterprise');

-- Set tenant context (required for RLS)
SELECT set_config('app.current_tenant_id', 'your-tenant-uuid', true);
```

### Step 3: Create First Value Proposition (2 min)

```sql
INSERT INTO value_propositions (
    tenant_id, name, version, status,
    target_icp, problem_statement, solution_description, unique_value, success_metrics,
    created_by
) VALUES (
    'your-tenant-uuid',
    'BAIV AI Visibility Platform',
    '1.0.0',
    'active',
    '{
        "persona": "B2B SaaS Marketing Leaders",
        "company_size": "50-500 employees",
        "industry": "B2B SaaS",
        "role": "CMO, VP Marketing, Marketing Director",
        "pain_points": ["Invisible to AI platforms", "No citation tracking", "Guessing at content gaps"]
    }'::jsonb,
    '{
        "description": "Companies are invisible to AI platforms (ChatGPT, Claude, Perplexity, Gemini)",
        "evidence": ["30% of leads now start with AI search", "0% citation rate for most B2B companies"],
        "impact_metrics": {"lost_leads": "30%", "missed_revenue": "$500K annually"}
    }'::jsonb,
    '{
        "overview": "AI Visibility Optimization through ontology-driven gap analysis and content creation",
        "key_features": ["Citation Testing across 4 platforms", "Gap Analysis with priority scoring", "Ontology-grounded content"],
        "differentiation": ["Only platform combining citation + gap analysis + ontology"]
    }'::jsonb,
    '{
        "competitive_advantages": ["First-mover in AI Visibility space", "Ontology-driven approach", "Multi-platform testing"],
        "moat_strategy": ["Proprietary citation database", "Schema.org ontology expertise"]
    }'::jsonb,
    '{
        "financial": {"mrr_target": "$5K", "customers_target": 50},
        "customer": {"citation_rate_target": "25%", "nps_target": 40},
        "process": {"api_response_time": "2s", "uptime": "99.5%"},
        "learning": {"agent_accuracy": "80%"},
        "stakeholder": {"partner_revenue": "15%"}
    }'::jsonb,
    'your-user-uuid'
);
```

---

## Database Schema Overview

### Core Entities (8 Tables)

#### 1. `value_propositions`
Strategic foundation with target ICP, problem-solution fit, and PMF tracking.

**Key Fields:**
- `target_icp` (JSONB): Persona, company size, industry, role, pain points
- `problem_statement` (JSONB): Description, evidence, impact metrics
- `solution_description` (JSONB): Overview, features, differentiation
- `success_metrics` (JSONB): 5-Perspective BSC metrics
- `pmf_score` (DECIMAL): 0-100 score

#### 2. `prds` (Product Requirements Documents)
Translates value proposition into functional/non-functional requirements.

**Key Fields:**
- `value_proposition_id` (FK)
- `vsom_context` (JSONB): Inherited from value_proposition + PRD-specific
- `functional_requirements` (JSONB): Array of requirements with acceptance criteria
- `non_functional_requirements` (JSONB): Performance, security, scalability
- `status`: draft → review → approved → implementation → completed

#### 3. `pbs_components` (Product Breakdown Structure)
Hierarchical decomposition of deliverables (Levels 1-5).

**Key Fields:**
- `prd_id` (FK)
- `parent_component_id` (Self-FK for hierarchy)
- `level` (INT): 1=root, 2-5=decomposition
- `wbs_code` (TEXT): "1.0", "1.1.2", "3.2.4"
- `deliverables` (JSONB): Array of deliverables
- `pfc_modules` (JSONB): PFC modules used
- `completion_percentage` (INT): Auto-calculated from children/tasks

#### 4. `wbs_tasks` (Work Breakdown Structure)
Detailed tasks with effort estimation, assignment, and schedule.

**Key Fields:**
- `pbs_component_id` (FK)
- `wbs_id` (TEXT): "1.1.1", "3.2.4.1"
- `estimated_hours` (DECIMAL)
- `actual_hours` (DECIMAL)
- `assigned_to` (FK to tenant_users)
- `deliverables` (JSONB)
- `test_requirements` (JSONB)
- `status`: not_started → in_progress → blocked → review → completed

#### 5. `wbs_task_dependencies`
Task ordering and critical path analysis.

**Dependency Types:**
- `finish_to_start`: B starts after A finishes
- `start_to_start`: B starts when A starts
- `finish_to_finish`: B finishes when A finishes
- `is_critical_path` (BOOLEAN)

#### 6. `wbs_task_executions`
Work session logs with progress tracking.

**Key Fields:**
- `task_id` (FK)
- `started_at`, `completed_at` (TIMESTAMPTZ)
- `work_description` (TEXT)
- `deliverables_completed` (JSONB)
- `issues` (JSONB)

#### 7. `customer_feedback`
Feedback linked to PRD requirements and PBS components.

**Key Fields:**
- `feedback_type`: survey, interview, usage_analytics, support_ticket, feature_request, bug_report
- `pmf_score` (INT 1-5): "Very disappointed" scale
- `nps_score` (INT 0-10): Net Promoter Score
- `related_pbs_components` (JSONB)
- `action_items` (JSONB)

#### 8. `pmf_metrics` (Product-Market Fit)
Cohort-based PMF tracking over time.

**Key Metrics:**
- `very_disappointed_percentage`: >40% = PMF threshold
- `retention_rate`: Cohort retention
- `dau_mau_ratio`: Daily/Monthly Active Users
- `nps_score`: Net Promoter Score
- `ltv_cac_ratio`: Lifetime Value / CAC
- `pmf_status`: not_achieved → early_signs → moderate → strong → product_market_fit

---

## PFC Module Architecture (8 Tables)

### PFC vs PFI

- **PFC (Platform Foundation Core):** Reusable, platform-agnostic modules (22 modules)
- **PFI (Platform-Instance):** Product-specific instantiations (BAIV, W4M, AIR) with custom configurations
- **Tenants:** Customer organizations using a product instance (e.g., Acme Corp using BAIV)

**Hierarchy:**
```
PFC-SEC-RBAC-Foundation (Core Module)
├── BAIV Instance (Product - shared by all BAIV customers)
│   ├── BAIV Internal (Product Owner Tenant - 2 admins)
│   ├── Acme Corp (Customer Tenant)
│   └── TechCo Inc (Customer Tenant)
├── W4M Instance (Product - shared by all W4M customers)
└── AIR Instance (Product - shared by all AIR customers)
```

### Key PFC Tables

#### 0. `product_instances` (NEW)
Product instances that instantiate PFC modules.

**Key Fields:**
- `product_code` (TEXT): "BAIV", "W4M", "AIR"
- `product_name` (TEXT): "Be AI Visible", "Wings4Mind", etc.
- `owned_by_organization` (UUID): FK to tenants (product owner)
- `total_tenants` (INT): Count of customer orgs using this product

#### 1. `pfc_modules`
Registry of 22 reusable capabilities.

**Categories:**
- Value Engineering (10): VSOM, OKR, PMF, Value Proposition, Metrics, etc.
- Security (4): Auth, RBAC, Multi-Tenant Isolation, API Keys
- Design (6): Design System, Component Library, Figma Bridge, etc.
- CRM (2): Customer Organization, Partner Management
- Agent Management (2): Agent Registry, Ontology Registry
- Agentic Builder (6): Program Manager, Solution Architect, etc.

**Key Fields:**
- `module_code` (TEXT): "PFC-SEC-RBAC-Foundation"
- `is_transferable` (BOOLEAN): TRUE = can be instantiated per product instance
- `capabilities` (JSONB): Array of capabilities with acceptance criteria
- `config_schema` (JSONB): JSON Schema for configuration validation

#### 2. `pfi_module_instances`
Product-specific module configurations (shared by all customer tenants).

**Key Fields:**
- `pfc_module_id` (FK)
- `product_instance_id` (FK) - **Changed from tenant_id**
- `instance_code` (TEXT): "BAIV-SEC-RBAC"
- `configuration` (JSONB): Validated against pfc_modules.config_schema
- `status`: planned → configured → deploying → active
- `health_status`: healthy, degraded, unhealthy

#### 3. `pfi_pbs_mappings`
Links PFI instances to PBS components for traceability.

**Mapping Types:**
- `implements`: PFI instance implements this PBS component
- `supports`: PFI instance provides capabilities
- `integrates_with`: PFI instance integrates with component
- `depends_on`: PBS component depends on PFI instance

#### 4. `pfc_integration_bridges`
4 bridges orchestrating PFC modules: VE, Security, Design, Agent Orchestration.

**Key Fields:**
- `bridge_code` (TEXT): "PFC-BRIDGE-VE"
- `source_modules` (JSONB): Array of PFC modules (data sources)
- `target_modules` (JSONB): Array of PFI modules (data consumers)
- `integration_pattern`: data_flow, bidirectional, event_driven, orchestration

---

## Common Queries

### Query 1: Get PRD Progress

```sql
-- Get PRD with PBS completion breakdown
SELECT 
    p.prd_code,
    p.status,
    COUNT(DISTINCT pbs.id) AS total_components,
    AVG(pbs.completion_percentage) AS avg_completion,
    COUNT(DISTINCT CASE WHEN pbs.completion_percentage = 100 THEN pbs.id END) AS completed_components
FROM prds p
LEFT JOIN pbs_components pbs ON pbs.prd_id = p.id
WHERE p.prd_code = 'BAIV-PRD-001'
GROUP BY p.id, p.prd_code, p.status;
```

### Query 2: Get WBS Tasks by Status

```sql
-- Get all in-progress tasks with assigned users
SELECT 
    wbs.wbs_id,
    wbs.task_name,
    wbs.estimated_hours,
    wbs.actual_hours,
    wbs.completion_percentage,
    u.email AS assigned_to_email
FROM wbs_tasks wbs
LEFT JOIN tenant_users tu ON tu.id = wbs.assigned_to
LEFT JOIN auth.users u ON u.id = tu.user_id
WHERE wbs.status = 'in_progress'
ORDER BY wbs.planned_end_date;
```

### Query 3: Get PMF Trend

```sql
-- Get PMF score trend over time
SELECT 
    measured_at,
    very_disappointed_percentage,
    retention_rate,
    nps_score,
    pmf_status
FROM pmf_metrics
WHERE value_proposition_id = 'your-vp-uuid'
ORDER BY measured_at DESC
LIMIT 12; -- Last 12 measurements
```

### Query 4: Get Required PFC Modules for PRD

```sql
-- Use helper function
SELECT * FROM get_required_pfc_modules('your-prd-uuid');

-- Result:
-- module_code              | module_name                     | category          | usage_count
-- PFC-SEC-RBAC-Foundation  | Role-Based Access Control       | security          | 3
-- PFC-SEC-Auth-Foundation  | Authentication Foundation       | security          | 2
-- PFC-VE-VSOM              | Vision Strategy Objectives      | value_engineering | 1
```

### Query 5: Get Customer Feedback Summary

```sql
-- Get feedback summary by sentiment
SELECT 
    feedback_type,
    sentiment,
    COUNT(*) AS feedback_count,
    AVG(pmf_score) AS avg_pmf_score,
    AVG(nps_score) AS avg_nps_score
FROM customer_feedback
WHERE prd_id = 'your-prd-uuid'
GROUP BY feedback_type, sentiment
ORDER BY feedback_count DESC;
```

---

## Automated Triggers

The schema includes automated triggers for convenience:

### Trigger 1: Auto-Update PBS Completion

```sql
-- When WBS task completion changes, PBS component auto-updates
-- Trigger: wbs_completion_update_pbs
-- Function: update_pbs_completion()

UPDATE wbs_tasks 
SET completion_percentage = 100 
WHERE wbs_id = '3.2.1';

-- PBS component "3.2 Discovery Agent" completion auto-calculated from child tasks
```

### Trigger 2: Auto-Update PRD Status

```sql
-- When PBS component completion reaches 100%, PRD status updates
-- Trigger: pbs_completion_update_prd
-- Function: update_prd_status()

-- If all Level 1 PBS components = 100%, PRD status → "completed"
-- If any PBS component > 0%, PRD status → "implementation"
```

---

## API Quick Reference

### Core Endpoints

```typescript
// Value Propositions
GET    /api/value-propositions
POST   /api/value-propositions
GET    /api/value-propositions/:id
PUT    /api/value-propositions/:id
GET    /api/value-propositions/:id/pmf

// PRDs
GET    /api/prds
POST   /api/prds
GET    /api/prds/:id
PUT    /api/prds/:id
GET    /api/prds/:id/pbs              // Get PBS hierarchy
GET    /api/prds/:id/pfc-modules       // Get required PFC modules

// PBS Components
GET    /api/pbs-components
POST   /api/pbs-components
GET    /api/pbs-components/:id
PUT    /api/pbs-components/:id
GET    /api/pbs-components/:id/tasks   // Get WBS tasks

// WBS Tasks
GET    /api/wbs-tasks
POST   /api/wbs-tasks
GET    /api/wbs-tasks/:id
PUT    /api/wbs-tasks/:id
POST   /api/wbs-tasks/:id/executions   // Log work session

// PFC Modules
GET    /api/pfc-modules
GET    /api/pfc-modules/:code
GET    /api/pfc-modules/:code/instances

// PFI Instances
POST   /api/pfi-instances
GET    /api/pfi-instances/:id
PUT    /api/pfi-instances/:id
GET    /api/pfi-instances/:id/mappings
```

---

## Example: BAIV MVP Implementation

### Step 1: Create Value Proposition
```sql
-- Already shown in "Step 3: Create First Value Proposition"
```

### Step 2: Create PRD from Value Proposition

```sql
INSERT INTO prds (
    tenant_id, value_proposition_id, prd_code, version, status,
    vsom_context, functional_requirements, non_functional_requirements,
    created_by
) VALUES (
    'your-tenant-uuid',
    (SELECT id FROM value_propositions WHERE name = 'BAIV AI Visibility Platform'),
    'BAIV-PRD-001',
    '2.4.1',
    'approved',
    (SELECT vsom_context FROM value_propositions WHERE name = 'BAIV AI Visibility Platform'),
    '[
        {"req_id": "FR-001", "description": "Discovery Agent analyzes websites", "priority": "P1", "acceptance_criteria": ["Can fetch HTML", "Extracts Schema.org data", "Creates client-context ontology"]},
        {"req_id": "FR-002", "description": "Citation Tester queries 4 platforms", "priority": "P2", "acceptance_criteria": ["ChatGPT integration", "Claude integration", "Perplexity integration", "Gemini integration"]},
        {"req_id": "FR-003", "description": "Gap Analyzer identifies opportunities", "priority": "P2", "acceptance_criteria": ["Loads citation results", "Identifies gaps", "Scores priorities (P0/P1/P2)"]}
    ]'::jsonb,
    '{
        "performance": {"api_response_time_sec": 2, "uptime_percentage": 99.5},
        "security": {"rbac_enabled": true, "multi_tenant_isolation": true, "api_key_rotation_days": 90},
        "scalability": {"concurrent_users": 100},
        "reliability": {"error_rate_percentage": 0.5}
    }'::jsonb,
    'your-user-uuid'
);
```

### Step 3: Create PBS Components (Week 1 Example)

```sql
-- Level 1: Agent Services
INSERT INTO pbs_components (
    tenant_id, prd_id, level, wbs_code, sequence_order,
    component_name, component_type, description, deliverables,
    prd_requirements, pfc_modules, status, created_by
) VALUES (
    'your-tenant-uuid',
    (SELECT id FROM prds WHERE prd_code = 'BAIV-PRD-001'),
    1, '3.0', 3,
    'Agent Services',
    'module',
    '3 core agents (Discovery, Citation Tester, Gap Analyzer) fully functional',
    '[
        {"name": "Discovery Agent operational", "acceptance_criteria": ["Can analyze websites", "Extracts schema.org data", "Creates client-context ontology"]},
        {"name": "Citation Tester operational", "acceptance_criteria": ["Queries all 4 platforms", "Detects citations", "Calculates RPI"]},
        {"name": "Gap Analyzer operational", "acceptance_criteria": ["Identifies gaps", "Scores priorities", "Creates gap ontologies"]}
    ]'::jsonb,
    '[{"req_id": "FR-001"}, {"req_id": "FR-002"}, {"req_id": "FR-003"}]'::jsonb,
    '[
        {"module_id": "pfc-oaa-agent-registry-id", "module_code": "PFC-OAA-Agent-Registry", "integration_type": "uses"},
        {"module_id": "pfc-oaa-ontology-registry-id", "module_code": "PFC-VE-OAA", "integration_type": "uses"}
    ]'::jsonb,
    'planned',
    'your-user-uuid'
);

-- Level 2: Discovery Agent
INSERT INTO pbs_components (
    tenant_id, prd_id, parent_component_id, level, wbs_code, sequence_order,
    component_name, component_type, description, deliverables,
    prd_requirements, status, created_by
) VALUES (
    'your-tenant-uuid',
    (SELECT id FROM prds WHERE prd_code = 'BAIV-PRD-001'),
    (SELECT id FROM pbs_components WHERE wbs_code = '3.0'),
    2, '3.2', 2,
    'Discovery Agent (P1)',
    'feature',
    'Website crawling, Schema.org parsing, context extraction, client-context ontology creation',
    '[
        {"name": "Website Crawling", "acceptance_criteria": ["Can fetch HTML from URL"]},
        {"name": "Schema.org Parsing", "acceptance_criteria": ["Extracts JSON-LD from <script>"]},
        {"name": "Context Extraction", "acceptance_criteria": ["Extracts company info"]},
        {"name": "Client-Context Ontology", "acceptance_criteria": ["Ontology stored in ontology_data table"]}
    ]'::jsonb,
    '[{"req_id": "FR-001"}]'::jsonb,
    'planned',
    'your-user-uuid'
);
```

### Step 4: Create WBS Tasks

```sql
INSERT INTO wbs_tasks (
    tenant_id, pbs_component_id, wbs_id, task_name, task_description,
    task_type, estimated_hours, complexity,
    assigned_to, planned_start_date, planned_end_date,
    deliverables, acceptance_criteria, test_requirements,
    status, created_by
) VALUES (
    'your-tenant-uuid',
    (SELECT id FROM pbs_components WHERE wbs_code = '3.2'),
    '3.2.1',
    'Website Crawling',
    'Implement website fetcher (axios/cheerio). Handle redirects, timeouts.',
    'development',
    6.0,
    'medium',
    (SELECT id FROM tenant_users WHERE email = 'backend-dev@baiv.com'),
    '2026-01-27',
    '2026-01-27',
    '[{"name": "HTML fetcher working", "acceptance_criteria": ["Can fetch HTML from URL"], "status": "not_started"}]'::jsonb,
    '[
        {"criterion": "Can fetch HTML from valid URL", "validation_method": "automated_test", "status": "pending"},
        {"criterion": "Handles 404 errors gracefully", "validation_method": "automated_test", "status": "pending"},
        {"criterion": "Times out after 5 seconds", "validation_method": "automated_test", "status": "pending"}
    ]'::jsonb,
    '{
        "test_types": ["unit", "integration"],
        "coverage_target": 80,
        "test_cases": [
            {"test_id": "TC-001", "description": "Fetch valid URL", "expected_result": "Returns HTML"},
            {"test_id": "TC-002", "description": "Fetch invalid URL", "expected_result": "Throws error"},
            {"test_id": "TC-003", "description": "Timeout test", "expected_result": "Throws timeout error"}
        ]
    }'::jsonb,
    'not_started',
    'your-user-uuid'
);
```

### Step 5: Log Task Execution

```sql
INSERT INTO wbs_task_executions (
    tenant_id, task_id, started_at, completed_at, duration_hours, executed_by,
    work_description, deliverables_completed, progress_percentage, next_steps
) VALUES (
    'your-tenant-uuid',
    (SELECT id FROM wbs_tasks WHERE wbs_id = '3.2.1'),
    '2026-01-27 09:00:00',
    '2026-01-27 15:30:00',
    6.5,
    (SELECT id FROM tenant_users WHERE email = 'backend-dev@baiv.com'),
    'Implemented axios-based HTML fetcher with retry logic. Added timeout handling (5s). Tested on 10 sample URLs including edge cases (404, timeout, redirect).',
    '[
        {
            "deliverable_name": "HTML fetcher working",
            "status": "completed",
            "evidence_url": "https://github.com/baiv/agents/pull/42"
        }
    ]'::jsonb,
    100,
    'Next: Implement Schema.org parsing (Task 3.2.2)'
);

-- Update task status
UPDATE wbs_tasks 
SET 
    status = 'completed',
    actual_hours = 6.5,
    completion_percentage = 100,
    actual_end_date = '2026-01-27'
WHERE wbs_id = '3.2.1';

-- PBS component completion auto-updates via trigger
```

---

## Testing Checklist

### Database Tests

- [ ] RLS policies isolate tenant data correctly
- [ ] Triggers auto-update PBS completion when WBS tasks change
- [ ] Triggers auto-update PRD status when PBS components change
- [ ] Helper function `calculate_pbs_completion()` returns correct average
- [ ] Helper function `get_required_pfc_modules()` returns correct modules
- [ ] Foreign key constraints prevent orphaned records

### API Tests

- [ ] Can create Value Proposition
- [ ] Can create PRD linked to Value Proposition
- [ ] Can create PBS hierarchy (5 levels deep)
- [ ] Can create WBS tasks with dependencies
- [ ] Can log task executions with progress
- [ ] Can submit customer feedback
- [ ] Can record PMF metrics
- [ ] Can instantiate PFI modules from PFC modules
- [ ] Can link PFI instances to PBS components

### Integration Tests

- [ ] Complete flow: VP → PRD → PBS → WBS → Execution
- [ ] Validation flow: Feedback → PBS → PRD → VP
- [ ] PMF flow: Metrics → VP → PMF score update
- [ ] PFC-PFI flow: PFC module → PFI instance → PBS mapping

---

## Performance Optimization

### Indexes (Already Included in Schema)

```sql
-- Value Propositions
CREATE INDEX idx_value_propositions_tenant ON value_propositions(tenant_id);
CREATE INDEX idx_value_propositions_status ON value_propositions(status);
CREATE INDEX idx_value_propositions_pmf ON value_propositions(pmf_score);

-- PRDs
CREATE INDEX idx_prds_tenant ON prds(tenant_id);
CREATE INDEX idx_prds_value_prop ON prds(value_proposition_id);
CREATE INDEX idx_prds_status ON prds(status);

-- PBS Components
CREATE INDEX idx_pbs_components_tenant ON pbs_components(tenant_id);
CREATE INDEX idx_pbs_components_prd ON pbs_components(prd_id);
CREATE INDEX idx_pbs_components_parent ON pbs_components(parent_component_id);
CREATE INDEX idx_pbs_components_wbs ON pbs_components(wbs_code);

-- WBS Tasks
CREATE INDEX idx_wbs_tasks_tenant ON wbs_tasks(tenant_id);
CREATE INDEX idx_wbs_tasks_pbs_component ON wbs_tasks(pbs_component_id);
CREATE INDEX idx_wbs_tasks_assigned_to ON wbs_tasks(assigned_to);
CREATE INDEX idx_wbs_tasks_status ON wbs_tasks(status);
```

### Query Optimization Tips

1. **Always filter by `tenant_id` first** (leverages RLS and index)
2. **Use `JSONB` GIN indexes** for frequent JSONB queries
3. **Materialize PBS hierarchy** for deep hierarchies (>5 levels)
4. **Cache PFC module definitions** (read-only, global)
5. **Batch task executions** (insert multiple executions in one transaction)

---

## Troubleshooting

### Issue 1: RLS Denies Access

**Symptom:** Query returns 0 rows even though data exists

**Cause:** Tenant context not set

**Solution:**
```sql
-- Set tenant context before queries
SELECT set_config('app.current_tenant_id', 'your-tenant-uuid', true);

-- Verify context
SELECT current_setting('app.current_tenant_id');
```

### Issue 2: PBS Completion Not Auto-Updating

**Symptom:** PBS completion_percentage remains 0 after task completion

**Cause:** Trigger may not be firing

**Solution:**
```sql
-- Manually trigger update
UPDATE pbs_components
SET completion_percentage = calculate_pbs_completion(id)
WHERE id = 'your-pbs-component-uuid';

-- Verify trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'wbs_completion_update_pbs';
```

### Issue 3: PFI Instance Configuration Invalid

**Symptom:** Insert fails with "configuration does not match schema"

**Cause:** Configuration JSON doesn't match PFC module's config_schema

**Solution:**
```sql
-- Validate configuration before insert
SELECT validate_pfi_configuration('your-pfi-instance-uuid');

-- Check PFC module schema
SELECT config_schema, default_config
FROM pfc_modules
WHERE module_code = 'PFC-SEC-RBAC-Foundation';
```

---

## Next Steps

1. **Deploy schemas** (5 min)
2. **Seed initial data** (10 min):
   - Value Proposition
   - PRD
   - PBS components (from BAIV MVP To-Do Plan)
   - WBS tasks for Week 1
3. **Build core APIs** (2-3 days)
4. **Implement dashboard** (3-5 days)
5. **Integrate with BAIV agents** (1-2 weeks)

---

## Support & Documentation

- **Full Documentation:** `VALUE_MANAGEMENT_ARCHITECTURE.md` (35+ pages)
- **Schema Files:**
  - `value_management_core_schema.sql`
  - `pfc_modules_schema.sql`
  - `baiv_pfc_module_seed_data.sql`
- **Reference:** BAIV MVP To-Do Plan v2.4.1

---

**Status:** 🟢 Ready for Implementation  
**Version:** 1.0.0  
**Date:** January 6, 2026
