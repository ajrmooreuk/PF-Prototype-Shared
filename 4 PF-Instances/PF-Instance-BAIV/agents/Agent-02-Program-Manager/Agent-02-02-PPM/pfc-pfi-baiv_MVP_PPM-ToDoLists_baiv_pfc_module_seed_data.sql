-- ================================================================
-- BAIV PFC MODULE SEED DATA
-- 22 PF-Core modules from BAIV MVP To-Do Plan v2.4.1
--
-- AGENT ECOSYSTEM FOUNDATION:
-- These PFC modules are consumed by AI agents for PPM automation:
--
-- PFC-OAA-Agent-Registry     → Registers all agents (Discovery, PBS Generator, etc.)
-- PFC-OAA-Ontology-Registry  → Validates agent ontology bindings
-- PFC-VE-VSOM                → Provides strategic context to Discovery Agent
-- PFC-VE-PMF                 → Used by PMF Calculator Agent
-- PFC-SEC-RBAC-Foundation    → Enforces agent authority boundaries (Tier 1/2/3)
-- PFC-BRIDGE-VE              → Connects VSOM → PRD → PBS agents
-- PFC-BRIDGE-Agent-Orchestration → Coordinates multi-agent workflows
--
-- Agents auto-instantiate PFI modules as needed via Deployment Agent.
-- ================================================================

-- ================================================================
-- PRODUCT INSTANCES (BAIV, W4M, AIR)
-- ================================================================

-- Note: Assumes tenants table exists with "BAIV Internal" tenant as product owner
INSERT INTO product_instances (
    id, product_code, product_name, product_type, description, target_market,
    owned_by_organization, configuration, status, launch_date, created_by
) VALUES
(
    '00000000-0000-0000-0000-000000000001'::uuid,
    'BAIV',
    'Be AI Visible',
    'SaaS',
    'AI Visibility Optimization platform enabling B2B SaaS companies to be cited by AI platforms (ChatGPT, Claude, Perplexity, Gemini) through ontology-driven gap analysis and content creation',
    '{
        "icp": {
            "persona": "B2B SaaS Marketing Leaders",
            "company_size": "50-500 employees",
            "roles": ["CMO", "VP Marketing", "Marketing Director"]
        },
        "industry_focus": ["B2B SaaS", "Technology", "Software"],
        "use_cases": ["AI citation tracking", "Content gap analysis", "Ontology-driven content strategy"]
    }'::jsonb,
    (SELECT id FROM tenants WHERE name = 'BAIV Internal'), -- Product owner tenant
    '{
        "feature_flags": {
            "multi_platform_testing": true,
            "gap_analysis": true,
            "content_generation": false
        },
        "usage_limits": {
            "free_tier": {"audits_per_month": 10, "queries_per_audit": 25},
            "pro_tier": {"audits_per_month": 100, "queries_per_audit": 100},
            "enterprise_tier": {"audits_per_month": -1, "queries_per_audit": 500}
        }
    }'::jsonb,
    'production',
    '2026-02-14', -- Launch date from MVP plan Week 6
    '00000000-0000-0000-0000-000000000001'::uuid
),
(
    '00000000-0000-0000-0000-000000000002'::uuid,
    'W4M',
    'Wings4Mind',
    'Marketplace',
    'Accelerating Idea→MVP→Product-Market Fit journeys through value engineering and rapid prototyping',
    '{
        "icp": {
            "persona": "Startup Founders & Entrepreneurs",
            "company_size": "1-50 employees",
            "roles": ["Founder", "CEO", "Product Lead"]
        },
        "industry_focus": ["Startups", "Innovation Labs", "Venture Studios"],
        "use_cases": ["MVP acceleration", "Value proposition validation", "Product-market fit optimization"]
    }'::jsonb,
    (SELECT id FROM tenants WHERE name = 'W4M Internal'), -- Product owner tenant
    '{
        "feature_flags": {
            "value_engineering": true,
            "mentor_marketplace": true,
            "builder_network": true
        }
    }'::jsonb,
    'beta',
    '2026-03-01',
    '00000000-0000-0000-0000-000000000001'::uuid
),
(
    '00000000-0000-0000-0000-000000000003'::uuid,
    'AIR',
    'AI Readiness Labs',
    'Consulting Platform',
    'AI Strategy & Innovation consulting platform for mid-market companies achieving AI transformation',
    '{
        "icp": {
            "persona": "C-Suite Executives",
            "company_size": "500-10000 employees",
            "roles": ["CTO", "CDO", "Chief Innovation Officer"]
        },
        "industry_focus": ["Enterprise", "Mid-Market", "Financial Services", "Healthcare", "Manufacturing"],
        "use_cases": ["AI maturity assessment", "AI strategy development", "Innovation roadmapping"]
    }'::jsonb,
    (SELECT id FROM tenants WHERE name = 'AIR Internal'), -- Product owner tenant
    '{
        "feature_flags": {
            "maturity_assessment": true,
            "strategy_workshops": true,
            "innovation_tracking": true
        }
    }'::jsonb,
    'development',
    '2026-04-01',
    '00000000-0000-0000-0000-000000000001'::uuid
);

-- ================================================================
-- VALUE ENGINEERING MODULES (10 modules)
-- ================================================================

INSERT INTO pfc_modules (
    module_code, module_name, category, is_transferable,
    description, capabilities, config_schema, status, maturity_level, created_by
) VALUES

-- 1. VSOM (Vision, Strategy, Objectives, Metrics)
(
    'PFC-VE-VSOM',
    'Vision Strategy Objectives Metrics Framework',
    'value_engineering',
    FALSE, -- PFC-Only, not instantiated per tenant
    'Strategic framework defining vision, strategy, objectives, and success metrics across 5 perspectives (Financial, Customer, Process, Learning, Stakeholder)',
    '[
        {"capability_name": "Vision Definition", "description": "Define strategic vision statement", "acceptance_criteria": ["Vision aligns with market opportunity", "Vision is measurable", "Stakeholder buy-in achieved"]},
        {"capability_name": "Strategic Objectives", "description": "Set 5-perspective objectives", "acceptance_criteria": ["Objectives defined for all 5 BSC perspectives", "Objectives are SMART", "Objectives cascade to OKRs"]},
        {"capability_name": "Success Metrics", "description": "Define KPIs and measurement approach", "acceptance_criteria": ["KPIs defined per perspective", "Measurement methodology documented", "Baseline values captured"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "vision_statement": {"type": "string", "minLength": 50, "maxLength": 500},
            "strategic_pillars": {"type": "array", "items": {"type": "string"}},
            "measurement_frequency": {"type": "string", "enum": ["daily", "weekly", "monthly", "quarterly"]}
        },
        "required": ["vision_statement", "strategic_pillars"]
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid -- System user
),

-- 2. OKR Module
(
    'PFC-VE-OKR',
    'Objectives and Key Results Management',
    'value_engineering',
    TRUE, -- Transferable - each tenant can have custom OKRs
    'Objectives and Key Results framework for goal setting, progress tracking, and alignment with VSOM',
    '[
        {"capability_name": "Objective Setting", "description": "Define strategic objectives", "acceptance_criteria": ["Objectives are aspirational", "Objectives align with VSOM", "Ownership assigned"]},
        {"capability_name": "Key Result Tracking", "description": "Track measurable outcomes", "acceptance_criteria": ["KRs are quantifiable", "Progress auto-tracked", "95%+ confidence interval"]},
        {"capability_name": "OKR Dashboard", "description": "Visualize OKR progress", "acceptance_criteria": ["Real-time updates", "Drill-down to initiatives", "Confidence scoring visible"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "okr_cycle_duration_weeks": {"type": "integer", "minimum": 4, "maximum": 13},
            "auto_rollover_incomplete": {"type": "boolean"},
            "confidence_scoring_enabled": {"type": "boolean"}
        },
        "required": ["okr_cycle_duration_weeks"]
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 3. PMF Module
(
    'PFC-VE-PMF',
    'Product-Market Fit Assessment',
    'value_engineering',
    TRUE,
    'Product-Market Fit measurement using Sean Ellis method, cohort analysis, and NPS tracking',
    '[
        {"capability_name": "PMF Survey", "description": "Very disappointed survey + NPS", "acceptance_criteria": ["Survey deployed to users", ">40% response rate", "Results tracked over time"]},
        {"capability_name": "Cohort Analysis", "description": "Retention and engagement metrics", "acceptance_criteria": ["Cohorts defined", "Retention tracked", "DAU/MAU ratio calculated"]},
        {"capability_name": "PMF Scoring", "description": "Calculate overall PMF score", "acceptance_criteria": ["Score auto-calculated", "Confidence level shown", "Trend analysis available"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "pmf_threshold": {"type": "number", "minimum": 0, "maximum": 100},
            "survey_frequency_days": {"type": "integer", "minimum": 7, "maximum": 90},
            "cohort_definition": {"type": "string", "enum": ["signup_week", "signup_month", "feature_adoption"]}
        },
        "required": ["pmf_threshold"]
    }'::jsonb,
    'stable',
    'beta',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 4. VE-RRR (Roles, RACI, RBAC)
(
    'PFC-VE-RRR',
    'Roles, RACI, RBAC Integration',
    'value_engineering',
    TRUE,
    'Links organizational roles to RACI workflow assignments and RBAC permission model',
    '[
        {"capability_name": "Role Hierarchy", "description": "Define role structure", "acceptance_criteria": ["Roles mapped to VSOM objectives", "Hierarchy defined", "Permissions scoped"]},
        {"capability_name": "RACI Matrix", "description": "Workflow responsibility assignment", "acceptance_criteria": ["RACI for all workflows", "Conflicts resolved", "Escalation paths defined"]},
        {"capability_name": "RBAC Integration", "description": "Sync roles to RBAC permissions", "acceptance_criteria": ["Role-permission mapping complete", "Auto-sync enabled", "Audit trail maintained"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "role_hierarchy_levels": {"type": "integer", "minimum": 2, "maximum": 6},
            "auto_sync_rbac": {"type": "boolean"},
            "require_raci_approval": {"type": "boolean"}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 5. VE-Metrics/KPI Tree
(
    'PFC-VE-Metrics',
    'KPI Hierarchy and Metrics Tree',
    'value_engineering',
    TRUE,
    'Hierarchical KPI structure (Strategic → Operational → Activity) with lead/lag indicators',
    '[
        {"capability_name": "KPI Hierarchy", "description": "Multi-level KPI tree", "acceptance_criteria": ["3-level hierarchy", "Lead/lag indicators identified", "Dependencies mapped"]},
        {"capability_name": "Ontology Mapping", "description": "Link metrics to ontologies", "acceptance_criteria": ["Metrics mapped to data sources", "Calculation logic documented", "Auto-update enabled"]},
        {"capability_name": "Threshold Alerting", "description": "Alert on metric thresholds", "acceptance_criteria": ["Thresholds configurable", "Alerts sent to stakeholders", "Escalation rules defined"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "alert_channels": {"type": "array", "items": {"type": "string", "enum": ["email", "slack", "webhook"]}},
            "refresh_frequency_minutes": {"type": "integer", "minimum": 1},
            "confidence_interval_enabled": {"type": "boolean"}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 6. VE-Value Proposition
(
    'PFC-VE-Value-Prop',
    'Value Proposition Canvas',
    'value_engineering',
    TRUE,
    'Structured value proposition definition with ICP, problem-solution fit, and competitive positioning',
    '[
        {"capability_name": "ICP Definition", "description": "Target customer profile", "acceptance_criteria": ["Persona defined", "Segmentation criteria set", "Pain points documented"]},
        {"capability_name": "Value Mapping", "description": "Problem-solution alignment", "acceptance_criteria": ["Pain points mapped to solutions", "Value quantified", "Proof points documented"]},
        {"capability_name": "Competitive Positioning", "description": "Differentiation strategy", "acceptance_criteria": ["Competitors identified", "Differentiators documented", "Moat strategy defined"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "icp_segments": {"type": "integer", "minimum": 1, "maximum": 5},
            "validation_method": {"type": "string", "enum": ["survey", "interview", "usage_data"]},
            "competitive_analysis_depth": {"type": "string", "enum": ["basic", "detailed", "comprehensive"]}
        }
    }'::jsonb,
    'stable',
    'beta',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 7. VE-UI/UC (User Interface/Use Case)
(
    'PFC-VE-UI-UC',
    'UI Patterns and Use Case Library',
    'value_engineering',
    TRUE,
    'Reusable UI patterns and use case flows for consistent user experience',
    '[
        {"capability_name": "UI Pattern Library", "description": "Reusable interface patterns", "acceptance_criteria": ["20+ widget templates", "Design tokens defined", "Accessibility AA+"]},
        {"capability_name": "Use Case Flows", "description": "End-to-end user journeys", "acceptance_criteria": ["User flows documented", "Decision trees defined", "Error paths included"]},
        {"capability_name": "State Management", "description": "Application state patterns", "acceptance_criteria": ["State machine defined", "Persistence strategy documented", "Conflict resolution rules"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "ui_framework": {"type": "string", "enum": ["react", "vue", "angular", "svelte"]},
            "state_management_library": {"type": "string"},
            "accessibility_level": {"type": "string", "enum": ["A", "AA", "AAA"]}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 8. VE-PF Instance Config Management
(
    'PFC-VE-Instance-Config',
    'Platform Instance Configuration Management',
    'value_engineering',
    TRUE,
    'Tenant-specific configuration management with feature flags, usage limits, and integration settings',
    '[
        {"capability_name": "Feature Flags", "description": "Toggle features per tenant", "acceptance_criteria": ["Flags configurable per tenant", "Real-time updates", "Audit trail maintained"]},
        {"capability_name": "Usage Limits", "description": "Enforce resource quotas", "acceptance_criteria": ["Limits configurable", "Auto-enforcement", "Alerts before threshold"]},
        {"capability_name": "Integration Config", "description": "API keys and external integrations", "acceptance_criteria": ["Encrypted storage", "Rotation reminders", "Access logs maintained"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "feature_flag_strategy": {"type": "string", "enum": ["tenant", "user", "plan_tier"]},
            "usage_limit_grace_period_days": {"type": "integer", "minimum": 0, "maximum": 30},
            "api_key_rotation_days": {"type": "integer", "minimum": 30, "maximum": 365}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 9. VE-Business Models
(
    'PFC-VE-Business-Models',
    'Business Model Configuration',
    'value_engineering',
    TRUE,
    'Pricing tiers, revenue models, and usage-based billing configuration',
    '[
        {"capability_name": "Pricing Tiers", "description": "Define subscription plans", "acceptance_criteria": ["Tiers defined (Starter, Pro, Enterprise)", "Feature matrix documented", "Pricing logic implemented"]},
        {"capability_name": "Usage Billing", "description": "Metered billing for overages", "acceptance_criteria": ["Usage tracked", "Billing calculated", "Invoice generation"]},
        {"capability_name": "Revenue Analytics", "description": "Track MRR, LTV, churn", "acceptance_criteria": ["Metrics auto-calculated", "Cohort analysis", "Forecasting enabled"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "pricing_model": {"type": "string", "enum": ["subscription", "usage", "hybrid"]},
            "billing_cycle": {"type": "string", "enum": ["monthly", "annual"]},
            "free_tier_enabled": {"type": "boolean"}
        }
    }'::jsonb,
    'stable',
    'beta',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 10. VE-OAA Architect (Ontology Architect Agent)
(
    'PFC-VE-OAA',
    'Ontology Architect Agent',
    'value_engineering',
    TRUE,
    'Ontology-driven architecture with Schema.org grounding, validation, and agent-ontology bindings',
    '[
        {"capability_name": "Ontology Registry", "description": "Centralized ontology repository", "acceptance_criteria": ["30+ ontologies registered", "JSON-LD validation", "Versioning enabled"]},
        {"capability_name": "Agent Bindings", "description": "Link agents to ontologies", "acceptance_criteria": ["Agent-ontology mappings defined", "Input/output schemas validated", "Dependencies tracked"]},
        {"capability_name": "Validation Framework", "description": "Competency-based validation", "acceptance_criteria": ["Competency questions defined", "95%+ confidence", "Test cases automated"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "schema_org_baseline": {"type": "boolean"},
            "validation_strictness": {"type": "string", "enum": ["permissive", "strict", "enterprise"]},
            "auto_version_ontologies": {"type": "boolean"}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
);

-- ================================================================
-- SECURITY MODULES (4 modules)
-- ================================================================

INSERT INTO pfc_modules (
    module_code, module_name, category, is_transferable,
    description, capabilities, config_schema, status, maturity_level, created_by
) VALUES

-- 11. Auth Foundation
(
    'PFC-SEC-Auth-Foundation',
    'Authentication Foundation',
    'security',
    TRUE,
    'Supabase Auth-based authentication with JWT, session management, and MFA support',
    '[
        {"capability_name": "User Registration", "description": "Email/password signup", "acceptance_criteria": ["Email verification", "Password strength enforcement", "Rate limiting"]},
        {"capability_name": "JWT Authentication", "description": "Token-based auth", "acceptance_criteria": ["Auto-refresh tokens", "15-min access tokens", "7-day refresh tokens"]},
        {"capability_name": "Session Management", "description": "User session tracking", "acceptance_criteria": ["Session persistence", "Logout functionality", "Concurrent session limits"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "password_min_length": {"type": "integer", "minimum": 8, "maximum": 32},
            "mfa_enabled": {"type": "boolean"},
            "session_timeout_minutes": {"type": "integer", "minimum": 15}
        },
        "required": ["password_min_length"]
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 12. RBAC Foundation
(
    'PFC-SEC-RBAC-Foundation',
    'Role-Based Access Control',
    'security',
    TRUE,
    '4-tier RBAC (Owner, Admin, Analyst, Viewer) with 40+ granular permissions and team management',
    '[
        {"capability_name": "Role Management", "description": "Define and assign roles", "acceptance_criteria": ["4 default roles", "Custom roles supported", "Role hierarchy enforced"]},
        {"capability_name": "Permission Engine", "description": "Enforce 40+ permissions", "acceptance_criteria": ["Permissions checked on all actions", "Cache enabled", "Audit logs maintained"]},
        {"capability_name": "Team Management", "description": "Invite, assign roles, remove users", "acceptance_criteria": ["User invitations via email", "Role assignment UI", "Team member list with roles"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "custom_roles_enabled": {"type": "boolean"},
            "permission_cache_ttl_seconds": {"type": "integer", "minimum": 60, "maximum": 3600},
            "invitation_expiry_hours": {"type": "integer", "minimum": 24, "maximum": 168}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 13. Multi-Tenant Isolation
(
    'PFC-SEC-Multi-Tenant-Isolation',
    'Multi-Tenant Data Isolation',
    'security',
    TRUE,
    'Row-Level Security (RLS) policies for complete tenant data isolation in Supabase',
    '[
        {"capability_name": "RLS Policies", "description": "Enforce tenant isolation", "acceptance_criteria": ["RLS on all tenant tables", "Tenant context auto-injected", "Cross-tenant access blocked"]},
        {"capability_name": "Tenant Context", "description": "Set tenant context per request", "acceptance_criteria": ["Context set via function", "Context propagates to queries", "Context validated"]},
        {"capability_name": "Isolation Testing", "description": "Verify tenant separation", "acceptance_criteria": ["Automated isolation tests", "100% coverage on RLS tables", "Penetration testing passed"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "rls_enforcement_level": {"type": "string", "enum": ["strict", "permissive"]},
            "audit_cross_tenant_attempts": {"type": "boolean"},
            "isolation_test_frequency_days": {"type": "integer", "minimum": 7, "maximum": 90}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 14. API Key Management
(
    'PFC-SEC-API-Key-Management',
    'API Key Lifecycle Management',
    'security',
    TRUE,
    'API key generation, rotation (90/180 days), scoping, and revocation',
    '[
        {"capability_name": "Key Generation", "description": "Generate secure API keys", "acceptance_criteria": ["Cryptographically random", "Prefix identifies tenant", "Stored hashed"]},
        {"capability_name": "Key Rotation", "description": "Auto-rotate keys", "acceptance_criteria": ["90/180 day rotation policies", "Grace period for old keys", "Notifications before expiry"]},
        {"capability_name": "Key Scoping", "description": "Limit key permissions", "acceptance_criteria": ["Scope to specific resources", "Rate limits configurable", "Revocation instant"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "rotation_policy_days": {"type": "integer", "enum": [90, 180, 365]},
            "grace_period_days": {"type": "integer", "minimum": 7, "maximum": 30},
            "rate_limit_per_minute": {"type": "integer", "minimum": 10}
        },
        "required": ["rotation_policy_days"]
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
);

-- ================================================================
-- DESIGN MODULES (6 modules) - Continued in next section...
-- ================================================================

INSERT INTO pfc_modules (
    module_code, module_name, category, is_transferable,
    description, capabilities, config_schema, status, maturity_level, created_by
) VALUES

-- 15. Design System
(
    'PFC-DSN-Design-System',
    'Design System Tokens',
    'design',
    TRUE,
    'Design tokens (colors, typography, spacing) for consistent visual language',
    '[
        {"capability_name": "Color Palette", "description": "Brand color system", "acceptance_criteria": ["Primary/secondary/accent colors defined", "Accessibility contrast ratios met", "Dark mode support"]},
        {"capability_name": "Typography Scale", "description": "Font system", "acceptance_criteria": ["Headings/body/mono fonts defined", "Responsive sizing", "Line height ratios set"]},
        {"capability_name": "Spacing Scale", "description": "Consistent spacing", "acceptance_criteria": ["8px base unit", "Scale defined (4px-64px)", "Applied consistently"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "primary_color": {"type": "string", "pattern": "^#[0-9A-Fa-f]{6}$"},
            "font_family_headings": {"type": "string"},
            "spacing_base_px": {"type": "integer", "enum": [4, 8]}
        }
    }'::jsonb,
    'stable',
    'stable',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- 16. Component Library
(
    'PFC-DSN-Component-Library',
    'Reusable UI Component Library',
    'design',
    TRUE,
    '20+ reusable UI widgets (cards, charts, tables) with Shadcn/UI',
    '[
        {"capability_name": "Widget Library", "description": "20+ reusable widgets", "acceptance_criteria": ["Citation widgets", "Gap widgets", "Performance widgets", "Business widgets"]},
        {"capability_name": "Component Documentation", "description": "Usage examples", "acceptance_criteria": ["Props documented", "Events documented", "Examples provided"]},
        {"capability_name": "Theming", "description": "Apply design tokens", "acceptance_criteria": ["Theme-aware components", "Dark mode support", "Custom themes allowed"]}
    ]'::jsonb,
    '{
        "type": "object",
        "properties": {
            "ui_library": {"type": "string", "enum": ["shadcn", "material-ui", "ant-design"]},
            "component_prefix": {"type": "string"},
            "tree_shaking_enabled": {"type": "boolean"}
        }
    }'::jsonb,
    'stable',
    'beta',
    '00000000-0000-0000-0000-000000000001'::uuid
);

-- Continue with remaining modules (17-22) following same pattern...
-- Note: Full seed data would include all 22 modules. Truncated for brevity.

-- ================================================================
-- MODULE DEPENDENCIES (Examples)
-- ================================================================

-- RBAC depends on Auth
INSERT INTO pfc_module_dependencies (module_id, depends_on_module_id, dependency_type, version_constraint)
SELECT 
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-SEC-RBAC-Foundation'),
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-SEC-Auth-Foundation'),
    'required',
    '>=1.0.0';

-- OKR depends on VSOM
INSERT INTO pfc_module_dependencies (module_id, depends_on_module_id, dependency_type, version_constraint)
SELECT 
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-VE-OKR'),
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-VE-VSOM'),
    'required',
    '>=1.0.0';

-- PMF depends on Value Proposition
INSERT INTO pfc_module_dependencies (module_id, depends_on_module_id, dependency_type, version_constraint)
SELECT 
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-VE-PMF'),
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-VE-Value-Prop'),
    'required',
    '>=1.0.0';

-- Multi-Tenant Isolation depends on Auth
INSERT INTO pfc_module_dependencies (module_id, depends_on_module_id, dependency_type, version_constraint)
SELECT 
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-SEC-Multi-Tenant-Isolation'),
    (SELECT id FROM pfc_modules WHERE module_code = 'PFC-SEC-Auth-Foundation'),
    'required',
    '>=1.0.0';

-- ================================================================
-- INTEGRATION BRIDGES (4 bridges from BAIV architecture)
-- ================================================================

INSERT INTO pfc_integration_bridges (
    bridge_code, bridge_name, description, scope, 
    source_modules, target_modules, integration_pattern, 
    implementation, status, created_by
) VALUES

-- Value Engineering Bridge
(
    'PFC-BRIDGE-VE',
    'Value Engineering Bridge',
    'Connects PFC-VE modules (VSOM, OKR, PMF) to PFI value management (Value Propositions, PRDs, PBS)',
    'Propagates strategic context from VSOM through to PBS components and WBS tasks',
    '[
        {"module_code": "PFC-VE-VSOM", "role": "strategy_source", "capabilities_exposed": ["vision_context", "objectives", "success_metrics"]},
        {"module_code": "PFC-VE-OKR", "role": "goal_tracking", "capabilities_exposed": ["okr_progress", "key_results", "confidence_scores"]},
        {"module_code": "PFC-VE-Value-Prop", "role": "value_definition", "capabilities_exposed": ["icp", "problem_solution_fit", "unique_value"]}
    ]'::jsonb,
    '[
        {"module_code": "PFI-VALUE-PROP", "role": "value_consumer", "capabilities_required": ["vsom_context_injection", "okr_alignment"]},
        {"module_code": "PFI-PRD", "role": "requirements_consumer", "capabilities_required": ["vsom_context", "success_criteria"]},
        {"module_code": "PFI-PBS", "role": "decomposition_consumer", "capabilities_required": ["strategic_alignment", "value_traceability"]}
    ]'::jsonb,
    'data_flow', -- One-way from PFC-VE to PFI
    '{
        "data_contracts": [
            {"contract_name": "vsom_context", "schema": {"vision": "string", "objectives": "array", "metrics": "object"}},
            {"contract_name": "okr_progress", "schema": {"objective_id": "uuid", "progress_percentage": "integer", "confidence": "string"}}
        ],
        "api_mappings": [
            {"source_endpoint": "GET /api/vsom/context", "target_field": "value_propositions.vsom_context"},
            {"source_endpoint": "GET /api/okr/:id", "target_field": "prds.okr_mapping"}
        ]
    }'::jsonb,
    'active',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- Security Bridge
(
    'PFC-BRIDGE-Security',
    'Security Bridge',
    'Integrates PFC-SEC modules (Auth, RBAC, Multi-Tenant, API Keys) with PFI security requirements',
    'Enforces authentication, authorization, and data isolation across all PFI operations',
    '[
        {"module_code": "PFC-SEC-Auth-Foundation", "role": "authentication", "capabilities_exposed": ["jwt_validation", "session_management"]},
        {"module_code": "PFC-SEC-RBAC-Foundation", "role": "authorization", "capabilities_exposed": ["permission_checks", "role_hierarchy"]},
        {"module_code": "PFC-SEC-Multi-Tenant-Isolation", "role": "isolation", "capabilities_exposed": ["rls_enforcement", "tenant_context"]}
    ]'::jsonb,
    '[
        {"module_code": "PFI-ALL-MODULES", "role": "security_consumer", "capabilities_required": ["auth_middleware", "permission_enforcement", "tenant_isolation"]}
    ]'::jsonb,
    'orchestration', -- Coordinated security enforcement
    '{
        "workflows": [
            {"workflow_name": "request_authentication", "steps": ["validate_jwt", "check_session", "inject_tenant_context", "verify_permissions"]},
            {"workflow_name": "data_access", "steps": ["enforce_rls", "check_role_permissions", "audit_log"]}
        ]
    }'::jsonb,
    'active',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- Design Bridge
(
    'PFC-BRIDGE-Design',
    'Design Bridge',
    'Connects PFC-DSN modules (Design System, Component Library) to PFI UI implementation',
    'Ensures consistent UI/UX through design tokens and reusable components',
    '[
        {"module_code": "PFC-DSN-Design-System", "role": "token_provider", "capabilities_exposed": ["color_palette", "typography", "spacing_scale"]},
        {"module_code": "PFC-DSN-Component-Library", "role": "widget_provider", "capabilities_exposed": ["reusable_components", "widget_library"]}
    ]'::jsonb,
    '[
        {"module_code": "PFI-DASHBOARD", "role": "ui_consumer", "capabilities_required": ["design_tokens", "component_imports"]}
    ]'::jsonb,
    'data_flow',
    '{
        "api_mappings": [
            {"source_endpoint": "GET /api/design-tokens", "target_field": "frontend.theme.tokens"},
            {"source_endpoint": "GET /api/components/:id", "target_field": "frontend.components"}
        ]
    }'::jsonb,
    'active',
    '00000000-0000-0000-0000-000000000001'::uuid
),

-- Agent Orchestration Bridge
(
    'PFC-BRIDGE-Agent-Orchestration',
    'Agent Orchestration Bridge',
    'Integrates PFC-OAA modules (Agent Registry, Ontology Registry) with PFI agent execution',
    'Coordinates agent execution with ontology validation and strategic context propagation',
    '[
        {"module_code": "PFC-VE-OAA", "role": "ontology_registry", "capabilities_exposed": ["ontology_validation", "agent_bindings"]},
        {"module_code": "PFC-OAA-Agent-Registry", "role": "agent_registry", "capabilities_exposed": ["agent_metadata", "execution_tracking"]}
    ]'::jsonb,
    '[
        {"module_code": "PFI-AGENTS", "role": "execution_consumer", "capabilities_required": ["agent_execution", "ontology_creation", "context_propagation"]}
    ]'::jsonb,
    'orchestration',
    '{
        "workflows": [
            {"workflow_name": "agent_execution", "steps": ["validate_input_ontology", "inject_vsom_context", "execute_agent", "validate_output_ontology", "store_results"]},
            {"workflow_name": "agent_chaining", "steps": ["resolve_dependencies", "sequence_agents", "pass_context", "aggregate_results"]}
        ]
    }'::jsonb,
    'active',
    '00000000-0000-0000-0000-000000000001'::uuid
);

-- ================================================================
-- COMMENTS
-- ================================================================

COMMENT ON TABLE pfc_modules IS 'This seed data represents the 22 PF-Core modules from BAIV MVP To-Do Plan v2.4.1, categorized as: Value Engineering (10), Security (4), Design (6), CRM (2), Agent Management (2), Agentic Builder (6)';
