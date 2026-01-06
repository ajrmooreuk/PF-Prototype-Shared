-- ================================================================
-- VALUE MANAGEMENT CORE SCHEMA
-- Tracks Value Proposition → PRD → PBS → WBS → Execution
--
-- AGENT-DRIVEN PPM AUTOMATION:
-- This schema is designed to be managed by AI agents that automate 80%
-- of Product/Project/Program Management workflows:
--
--   Discovery Agent    → value_propositions.target_icp (from website analysis)
--   PBS Generator      → pbs_components (from PRD functional_requirements)
--   Task Orchestrator  → wbs_tasks + wbs_task_dependencies (from PBS)
--   Progress Tracker   → wbs_task_executions (logs + auto-triggers)
--   Validation Agent   → customer_feedback → PBS/PRD validation loops
--   PMF Calculator     → pmf_metrics → value_propositions.pmf_score
--   Gap Analyzer       → wbs_tasks with P0/P1/P2 priorities
--
-- All agents follow PF-Core Unified Agent Spec Template v3.0.0
-- ================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- 1. VALUE PROPOSITION LAYER
-- ================================================================

CREATE TABLE value_propositions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'archived')),
    
    -- Target Market (Schema.org grounded)
    target_icp JSONB NOT NULL, -- {persona, company_size, industry, role, pain_points[]}
    
    -- Problem-Solution Fit
    problem_statement JSONB NOT NULL, -- {description, evidence[], impact_metrics{}}
    solution_description JSONB NOT NULL, -- {overview, key_features[], differentiation[]}
    unique_value JSONB NOT NULL, -- {competitive_advantages[], moat_strategy[]}
    
    -- Success Metrics (VSOM alignment)
    success_metrics JSONB NOT NULL, -- {financial{}, customer{}, process{}, learning{}, stakeholder{}}
    
    -- Strategic Context
    vsom_context JSONB, -- {vision, strategy, objectives[], metrics[]}
    okr_alignment JSONB, -- {objectives[{kr[], progress}]}
    
    -- Validation Status
    pmf_score DECIMAL(5,2), -- Product-Market Fit score (0-100)
    validated_at TIMESTAMPTZ,
    validation_evidence JSONB, -- {surveys[], interviews[], usage_metrics{}}
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    archived_at TIMESTAMPTZ,
    
    UNIQUE(tenant_id, name, version)
);

CREATE INDEX idx_value_propositions_tenant ON value_propositions(tenant_id);
CREATE INDEX idx_value_propositions_status ON value_propositions(status);
CREATE INDEX idx_value_propositions_pmf ON value_propositions(pmf_score) WHERE pmf_score IS NOT NULL;

-- ================================================================
-- 2. PRODUCT REQUIREMENTS DOCUMENT (PRD) LAYER
-- ================================================================

CREATE TABLE prds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    value_proposition_id UUID NOT NULL REFERENCES value_propositions(id),
    
    -- PRD Identity
    prd_code TEXT NOT NULL, -- e.g., "BAIV-PRD-001"
    version TEXT NOT NULL DEFAULT '1.0.0',
    status TEXT NOT NULL CHECK (status IN ('draft', 'review', 'approved', 'implementation', 'completed', 'deprecated')),
    
    -- Strategic Alignment
    vsom_context JSONB NOT NULL, -- Inherited from value_proposition + PRD-specific
    okr_mapping JSONB NOT NULL, -- Maps requirements to OKRs
    
    -- Functional Requirements (Schema.org grounded)
    functional_requirements JSONB NOT NULL, -- [{req_id, description, priority, acceptance_criteria[], user_stories[]}]
    
    -- Non-Functional Requirements
    non_functional_requirements JSONB NOT NULL, -- {performance{}, security{}, scalability{}, reliability{}}
    
    -- Scope Definition
    mvp_scope JSONB, -- {included_features[], excluded_features[], future_considerations[]}
    success_criteria JSONB NOT NULL, -- {kpis[], thresholds{}, validation_methods[]}
    
    -- Dependencies
    external_dependencies JSONB, -- {integrations[], apis[], third_party_services[]}
    internal_dependencies JSONB, -- {pfc_modules[], existing_features[]}
    
    -- Approval Tracking
    approvers JSONB, -- [{user_id, role, approved_at, comments}]
    approved_at TIMESTAMPTZ,
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, prd_code, version)
);

CREATE INDEX idx_prds_tenant ON prds(tenant_id);
CREATE INDEX idx_prds_value_prop ON prds(value_proposition_id);
CREATE INDEX idx_prds_status ON prds(status);

-- ================================================================
-- 3. PRODUCT BREAKDOWN STRUCTURE (PBS) LAYER
-- ================================================================

CREATE TABLE pbs_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    prd_id UUID NOT NULL REFERENCES prds(id),
    parent_component_id UUID REFERENCES pbs_components(id),
    
    -- PBS Hierarchy
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 5), -- 1=root, 2-5=decomposition
    wbs_code TEXT NOT NULL, -- e.g., "1.0", "1.1.2", "3.2.4"
    sequence_order INTEGER NOT NULL, -- Order within siblings
    
    -- Component Identity
    component_name TEXT NOT NULL,
    component_type TEXT NOT NULL CHECK (component_type IN (
        'product', 'module', 'feature', 'capability', 'service', 'integration'
    )),
    
    -- Component Definition
    description TEXT NOT NULL,
    deliverables JSONB NOT NULL, -- [{name, description, acceptance_criteria[]}]
    acceptance_criteria JSONB NOT NULL, -- [{criterion, validation_method, status}]
    
    -- Traceability
    prd_requirements JSONB NOT NULL, -- [{req_id, requirement_text}] - links to PRD functional_requirements
    value_proposition_elements JSONB, -- Links to specific VP elements this component delivers
    
    -- Integration Points
    pfc_modules JSONB, -- [{module_id, module_code, integration_type}] - PFC modules used
    pfi_instances JSONB, -- [{instance_id, configuration}] - PFI module instances
    
    -- Status Tracking
    status TEXT NOT NULL CHECK (status IN ('planned', 'in_progress', 'completed', 'blocked', 'cancelled')),
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    
    -- Dependencies (within PBS)
    dependencies JSONB, -- [{component_id, dependency_type, status}]
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, prd_id, wbs_code)
);

CREATE INDEX idx_pbs_components_tenant ON pbs_components(tenant_id);
CREATE INDEX idx_pbs_components_prd ON pbs_components(prd_id);
CREATE INDEX idx_pbs_components_parent ON pbs_components(parent_component_id);
CREATE INDEX idx_pbs_components_wbs ON pbs_components(wbs_code);
CREATE INDEX idx_pbs_components_level ON pbs_components(level);
CREATE INDEX idx_pbs_components_status ON pbs_components(status);

-- ================================================================
-- 4. WORK BREAKDOWN STRUCTURE (WBS) LAYER
-- ================================================================

CREATE TABLE wbs_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    pbs_component_id UUID NOT NULL REFERENCES pbs_components(id),
    
    -- WBS Identity
    wbs_id TEXT NOT NULL, -- e.g., "1.1.1", "3.2.4.1"
    task_name TEXT NOT NULL,
    task_description TEXT NOT NULL,
    
    -- Task Classification
    task_type TEXT NOT NULL CHECK (task_type IN (
        'development', 'design', 'testing', 'documentation', 'deployment', 'review'
    )),
    
    -- Effort Estimation
    estimated_hours DECIMAL(8,2) NOT NULL,
    actual_hours DECIMAL(8,2) DEFAULT 0,
    complexity TEXT CHECK (complexity IN ('low', 'medium', 'high', 'critical')),
    
    -- Assignment
    assigned_to UUID, -- user_id from tenant_users
    assigned_role TEXT, -- Role required (e.g., "Backend Dev", "Frontend Dev", "DevOps")
    
    -- Schedule
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    
    -- Status Tracking
    status TEXT NOT NULL CHECK (status IN (
        'not_started', 'in_progress', 'blocked', 'review', 'completed', 'cancelled'
    )),
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    
    -- Deliverables
    deliverables JSONB NOT NULL, -- [{name, description, acceptance_criteria, status}]
    acceptance_criteria JSONB NOT NULL, -- [{criterion, validation_method, status, evidence}]
    
    -- Testing Requirements
    test_requirements JSONB, -- {test_types[], coverage_target, test_cases[]}
    test_status JSONB, -- {tests_passed, tests_failed, coverage_actual}
    
    -- Blockers
    blockers JSONB, -- [{blocker_id, description, severity, resolution_status, resolved_at}]
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, wbs_id)
);

CREATE INDEX idx_wbs_tasks_tenant ON wbs_tasks(tenant_id);
CREATE INDEX idx_wbs_tasks_pbs_component ON wbs_tasks(pbs_component_id);
CREATE INDEX idx_wbs_tasks_assigned_to ON wbs_tasks(assigned_to);
CREATE INDEX idx_wbs_tasks_status ON wbs_tasks(status);
CREATE INDEX idx_wbs_tasks_dates ON wbs_tasks(planned_start_date, planned_end_date);

-- ================================================================
-- 5. TASK DEPENDENCIES
-- ================================================================

CREATE TABLE wbs_task_dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    task_id UUID NOT NULL REFERENCES wbs_tasks(id),
    depends_on_task_id UUID NOT NULL REFERENCES wbs_tasks(id),
    
    -- Dependency Type
    dependency_type TEXT NOT NULL CHECK (dependency_type IN (
        'finish_to_start', -- Task B starts after Task A finishes
        'start_to_start',  -- Task B starts when Task A starts
        'finish_to_finish', -- Task B finishes when Task A finishes
        'start_to_finish'  -- Task B finishes when Task A starts (rare)
    )),
    
    -- Lag Time (in days)
    lag_days INTEGER DEFAULT 0, -- Positive = delay, Negative = lead time
    
    -- Status
    is_critical_path BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, task_id, depends_on_task_id),
    CHECK (task_id != depends_on_task_id) -- Cannot depend on self
);

CREATE INDEX idx_task_dependencies_tenant ON wbs_task_dependencies(tenant_id);
CREATE INDEX idx_task_dependencies_task ON wbs_task_dependencies(task_id);
CREATE INDEX idx_task_dependencies_depends_on ON wbs_task_dependencies(depends_on_task_id);
CREATE INDEX idx_task_dependencies_critical_path ON wbs_task_dependencies(is_critical_path);

-- ================================================================
-- 6. TASK EXECUTION TRACKING
-- ================================================================

CREATE TABLE wbs_task_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    task_id UUID NOT NULL REFERENCES wbs_tasks(id),
    
    -- Execution Session
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    duration_hours DECIMAL(8,2),
    
    -- Executor
    executed_by UUID NOT NULL, -- user_id
    
    -- Work Log
    work_description TEXT,
    deliverables_completed JSONB, -- [{deliverable_name, status, evidence_url}]
    
    -- Progress Update
    progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    
    -- Issues Encountered
    issues JSONB, -- [{issue_description, severity, resolution}]
    
    -- Next Steps
    next_steps TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_task_executions_tenant ON wbs_task_executions(tenant_id);
CREATE INDEX idx_task_executions_task ON wbs_task_executions(task_id);
CREATE INDEX idx_task_executions_executor ON wbs_task_executions(executed_by);
CREATE INDEX idx_task_executions_dates ON wbs_task_executions(started_at, completed_at);

-- ================================================================
-- 7. CUSTOMER FEEDBACK & VALIDATION
-- ================================================================

CREATE TABLE customer_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    prd_id UUID NOT NULL REFERENCES prds(id),
    value_proposition_id UUID REFERENCES value_propositions(id),
    
    -- Feedback Source
    feedback_type TEXT NOT NULL CHECK (feedback_type IN (
        'survey', 'interview', 'usage_analytics', 'support_ticket', 'feature_request', 'bug_report'
    )),
    customer_segment TEXT, -- ICP segment
    
    -- Feedback Content
    feedback_text TEXT,
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    
    -- Structured Feedback
    pmf_score INTEGER CHECK (pmf_score >= 1 AND pmf_score <= 5), -- 1-5 scale
    nps_score INTEGER CHECK (nps_score >= 0 AND nps_score <= 10), -- 0-10 scale
    
    -- Feature-Specific Feedback
    related_pbs_components JSONB, -- [{component_id, feedback_specifics}]
    related_requirements JSONB, -- [{req_id, validation_status, comments}]
    
    -- Impact Analysis
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    impact_areas JSONB, -- {financial, customer_satisfaction, technical_debt, competitive_advantage}
    
    -- Response Tracking
    action_items JSONB, -- [{action, assigned_to, status, completed_at}]
    resolution_status TEXT CHECK (resolution_status IN ('open', 'in_progress', 'resolved', 'wont_fix')),
    
    -- Metadata
    collected_at TIMESTAMPTZ NOT NULL,
    collected_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customer_feedback_tenant ON customer_feedback(tenant_id);
CREATE INDEX idx_customer_feedback_prd ON customer_feedback(prd_id);
CREATE INDEX idx_customer_feedback_value_prop ON customer_feedback(value_proposition_id);
CREATE INDEX idx_customer_feedback_type ON customer_feedback(feedback_type);
CREATE INDEX idx_customer_feedback_sentiment ON customer_feedback(sentiment);

-- ================================================================
-- 8. PRODUCT-MARKET FIT METRICS
-- ================================================================

CREATE TABLE pmf_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    value_proposition_id UUID NOT NULL REFERENCES value_propositions(id),
    
    -- Measurement Period
    measured_at TIMESTAMPTZ NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- PMF Indicators (Sean Ellis Method)
    very_disappointed_percentage DECIMAL(5,2), -- % who'd be "very disappointed" if product disappeared
    
    -- Cohort Metrics
    cohort_size INTEGER NOT NULL,
    active_users INTEGER NOT NULL,
    retained_users INTEGER NOT NULL,
    retention_rate DECIMAL(5,2),
    
    -- Engagement Metrics
    dau_mau_ratio DECIMAL(5,2), -- Daily Active Users / Monthly Active Users
    average_session_duration_minutes DECIMAL(8,2),
    sessions_per_user DECIMAL(8,2),
    
    -- Value Metrics
    nps_score DECIMAL(5,2), -- Net Promoter Score
    customer_satisfaction_score DECIMAL(5,2), -- CSAT (0-100)
    feature_adoption_rate DECIMAL(5,2), -- % of users using core features
    
    -- Growth Indicators
    organic_growth_rate DECIMAL(5,2), -- % growth from referrals/word-of-mouth
    paid_cac DECIMAL(10,2), -- Customer Acquisition Cost
    ltv_cac_ratio DECIMAL(5,2), -- Lifetime Value / CAC
    
    -- Qualitative Indicators
    user_testimonials JSONB, -- [{user_segment, testimonial, impact}]
    churn_reasons JSONB, -- [{reason, frequency, severity}]
    
    -- Overall Assessment
    pmf_status TEXT CHECK (pmf_status IN ('not_achieved', 'early_signs', 'moderate', 'strong', 'product_market_fit')),
    confidence_level TEXT CHECK (confidence_level IN ('low', 'medium', 'high')),
    
    -- Recommendations
    improvement_areas JSONB, -- [{area, priority, suggested_actions[]}]
    
    -- Metadata
    measured_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pmf_metrics_tenant ON pmf_metrics(tenant_id);
CREATE INDEX idx_pmf_metrics_value_prop ON pmf_metrics(value_proposition_id);
CREATE INDEX idx_pmf_metrics_period ON pmf_metrics(period_start, period_end);
CREATE INDEX idx_pmf_metrics_status ON pmf_metrics(pmf_status);

-- ================================================================
-- 9. RLS POLICIES
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE value_propositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prds ENABLE ROW LEVEL SECURITY;
ALTER TABLE pbs_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE wbs_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE wbs_task_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE wbs_task_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE pmf_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (tenant isolation)
-- Note: Assumes tenant_id is set via set_config('app.current_tenant_id', tenant_id, true)

CREATE POLICY tenant_isolation_value_propositions ON value_propositions
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_prds ON prds
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_pbs_components ON pbs_components
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_wbs_tasks ON wbs_tasks
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_wbs_task_dependencies ON wbs_task_dependencies
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_wbs_task_executions ON wbs_task_executions
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_customer_feedback ON customer_feedback
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_pmf_metrics ON pmf_metrics
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- ================================================================
-- 10. HELPER FUNCTIONS
-- ================================================================

-- Calculate PBS component completion percentage based on child components
CREATE OR REPLACE FUNCTION calculate_pbs_completion(component_id UUID)
RETURNS INTEGER AS $$
DECLARE
    child_avg INTEGER;
    task_avg INTEGER;
    result INTEGER;
BEGIN
    -- Get average completion of child PBS components
    SELECT COALESCE(AVG(completion_percentage), 0)::INTEGER
    INTO child_avg
    FROM pbs_components
    WHERE parent_component_id = component_id;
    
    -- Get average completion of associated WBS tasks
    SELECT COALESCE(AVG(completion_percentage), 0)::INTEGER
    INTO task_avg
    FROM wbs_tasks
    WHERE pbs_component_id = component_id;
    
    -- If has children, use child average; otherwise use task average
    IF child_avg > 0 THEN
        result := child_avg;
    ELSE
        result := task_avg;
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Update PRD status based on PBS component completion
CREATE OR REPLACE FUNCTION update_prd_status()
RETURNS TRIGGER AS $$
DECLARE
    avg_completion INTEGER;
BEGIN
    -- Calculate average completion across all top-level PBS components
    SELECT COALESCE(AVG(completion_percentage), 0)::INTEGER
    INTO avg_completion
    FROM pbs_components
    WHERE prd_id = NEW.prd_id AND level = 1;
    
    -- Update PRD status based on completion
    IF avg_completion = 100 THEN
        UPDATE prds SET status = 'completed' WHERE id = NEW.prd_id;
    ELSIF avg_completion > 0 THEN
        UPDATE prds SET status = 'implementation' WHERE id = NEW.prd_id AND status != 'completed';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update PRD status when PBS components change
CREATE TRIGGER pbs_completion_update_prd
AFTER UPDATE OF completion_percentage ON pbs_components
FOR EACH ROW
EXECUTE FUNCTION update_prd_status();

-- Trigger to auto-update PBS completion when tasks change
CREATE OR REPLACE FUNCTION update_pbs_completion()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pbs_components
    SET completion_percentage = calculate_pbs_completion(NEW.pbs_component_id),
        updated_at = NOW()
    WHERE id = NEW.pbs_component_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wbs_completion_update_pbs
AFTER UPDATE OF completion_percentage ON wbs_tasks
FOR EACH ROW
EXECUTE FUNCTION update_pbs_completion();

-- ================================================================
-- COMMENTS
-- ================================================================

COMMENT ON TABLE value_propositions IS 'Strategic value propositions with target ICP, problem-solution fit, and PMF tracking';
COMMENT ON TABLE prds IS 'Product Requirements Documents with functional/non-functional requirements and VSOM alignment';
COMMENT ON TABLE pbs_components IS 'Product Breakdown Structure - hierarchical decomposition of deliverables';
COMMENT ON TABLE wbs_tasks IS 'Work Breakdown Structure - detailed tasks with effort estimation and tracking';
COMMENT ON TABLE wbs_task_dependencies IS 'Task dependencies with critical path analysis';
COMMENT ON TABLE wbs_task_executions IS 'Task execution logs with work progress and time tracking';
COMMENT ON TABLE customer_feedback IS 'Customer feedback linked to PRD requirements and PBS components';
COMMENT ON TABLE pmf_metrics IS 'Product-Market Fit metrics with cohort analysis and engagement tracking';
