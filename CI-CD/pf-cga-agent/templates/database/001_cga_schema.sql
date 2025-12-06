-- CGA Agent Database Schema
-- Comparative Gap Analysis Agent - Supabase PostgreSQL Schema
-- Version: 1.0.0

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ANALYSIS SESSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

    -- Session metadata
    domain_type VARCHAR(50) NOT NULL DEFAULT 'pf-core',
    analysis_type VARCHAR(50) NOT NULL DEFAULT 'comparative',
    analysis_scope TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',

    -- Configuration
    config JSONB NOT NULL DEFAULT '{}',
    weights JSONB NOT NULL DEFAULT '{"impact": 0.35, "effort": 0.25, "urgency": 0.20, "alignment": 0.20}',

    -- Strategic alignment
    strategic_objectives TEXT[] DEFAULT '{}',
    linked_okrs TEXT[] DEFAULT '{}',

    -- Timing
    timeframe VARCHAR(50),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    -- Standard fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'cancelled'))
);

-- ============================================================================
-- TARGET ENTITIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    -- Entity data
    entity_id VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_name VARCHAR(255) NOT NULL,
    attributes JSONB DEFAULT '{}',

    -- Scores (from comparative analysis)
    scores JSONB DEFAULT '{}',
    composite_score DECIMAL(5,4),
    rank INTEGER,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(session_id, entity_id)
);

-- ============================================================================
-- COMPETITORS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    competitor_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    strengths TEXT[] DEFAULT '{}',
    weaknesses TEXT[] DEFAULT '{}',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(session_id, competitor_id)
);

-- ============================================================================
-- IDENTIFIED GAPS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_gaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    -- Gap details
    gap_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'medium',
    confidence DECIMAL(5,4) NOT NULL DEFAULT 0.75,

    -- Evidence
    evidence JSONB DEFAULT '[]',
    affected_entities TEXT[] DEFAULT '{}',

    -- Business impact
    revenue_risk VARCHAR(20),
    competitive_risk VARCHAR(20),
    opportunity_cost TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_gap_type CHECK (gap_type IN ('structural_hole', 'capability', 'content', 'competitive')),
    CONSTRAINT valid_severity CHECK (severity IN ('critical', 'high', 'medium', 'low'))
);

-- ============================================================================
-- THREAT ASSESSMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_threats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    -- Related gaps
    related_gap_ids UUID[] DEFAULT '{}',

    -- Threat details
    threat_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    -- Risk assessment
    probability DECIMAL(5,4) NOT NULL,
    impact DECIMAL(5,4) NOT NULL,
    risk_score DECIMAL(5,4) GENERATED ALWAYS AS (probability * impact) STORED,

    -- Mitigation options (JSONB array)
    mitigation_options JSONB DEFAULT '[]',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_threat_type CHECK (threat_type IN ('competitive', 'market', 'capability', 'technology'))
);

-- ============================================================================
-- OPPORTUNITY ASSESSMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    -- Related gaps
    related_gap_ids UUID[] DEFAULT '{}',

    -- Opportunity details
    opportunity_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    -- Value assessment
    potential_value JSONB DEFAULT '{}',
    feasibility DECIMAL(5,4) NOT NULL DEFAULT 0.5,
    time_to_value VARCHAR(50),

    -- Requirements
    required_capabilities TEXT[] DEFAULT '{}',
    bridge_concepts TEXT[] DEFAULT '{}',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_opp_type CHECK (opportunity_type IN ('market', 'capability', 'content', 'partnership'))
);

-- ============================================================================
-- RECOMMENDATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    -- Linked items
    addresses_gap_ids UUID[] DEFAULT '{}',
    addresses_threat_ids UUID[] DEFAULT '{}',
    enables_opportunity_ids UUID[] DEFAULT '{}',

    -- Recommendation details
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    action_type VARCHAR(50) NOT NULL DEFAULT 'process',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',

    -- Implementation
    implementation_phases JSONB DEFAULT '[]',
    dependencies TEXT[] DEFAULT '{}',
    risks TEXT[] DEFAULT '{}',

    -- Expected outcome
    expected_outcome JSONB DEFAULT '{}',

    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'proposed',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_action_type CHECK (action_type IN ('content', 'capability', 'process', 'partnership')),
    CONSTRAINT valid_priority CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    CONSTRAINT valid_rec_status CHECK (status IN ('proposed', 'approved', 'in_progress', 'completed', 'rejected'))
);

-- ============================================================================
-- ANALYSIS REPORTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES cga_sessions(id) ON DELETE CASCADE,

    -- Report metadata
    report_type VARCHAR(50) NOT NULL DEFAULT 'full',
    status VARCHAR(20) NOT NULL DEFAULT 'draft',

    -- Summary data
    entity_count INTEGER NOT NULL DEFAULT 0,
    relationship_count INTEGER NOT NULL DEFAULT 0,
    gaps_count INTEGER NOT NULL DEFAULT 0,
    threats_count INTEGER NOT NULL DEFAULT 0,
    opportunities_count INTEGER NOT NULL DEFAULT 0,
    recommendations_count INTEGER NOT NULL DEFAULT 0,

    -- Executive summary
    key_findings TEXT[] DEFAULT '{}',
    critical_gaps_count INTEGER DEFAULT 0,
    high_priority_opportunities INTEGER DEFAULT 0,
    recommended_next_steps TEXT[] DEFAULT '{}',
    estimated_total_value TEXT,

    -- Priority matrix
    priority_matrix JSONB DEFAULT '{}',

    -- Full report content (optional, for caching)
    full_report JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_report_status CHECK (status IN ('draft', 'reviewed', 'approved', 'published'))
);

-- ============================================================================
-- AUDIT LOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS cga_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES cga_sessions(id) ON DELETE SET NULL,

    -- Event details
    event_type VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'info',

    -- Actor
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    agent_id VARCHAR(100),

    -- Data
    resource_type VARCHAR(50),
    resource_id UUID,
    input_data JSONB,
    output_data JSONB,

    -- Performance
    duration_ms INTEGER,

    -- Error handling
    error_message TEXT,
    stack_trace TEXT,

    -- Metadata
    correlation_id UUID,
    metadata JSONB DEFAULT '{}',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_audit_severity CHECK (severity IN ('debug', 'info', 'warning', 'error', 'critical'))
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Sessions
CREATE INDEX idx_cga_sessions_tenant ON cga_sessions(tenant_id);
CREATE INDEX idx_cga_sessions_user ON cga_sessions(user_id);
CREATE INDEX idx_cga_sessions_status ON cga_sessions(status);
CREATE INDEX idx_cga_sessions_created ON cga_sessions(created_at DESC);

-- Entities
CREATE INDEX idx_cga_entities_session ON cga_entities(session_id);
CREATE INDEX idx_cga_entities_type ON cga_entities(entity_type);

-- Gaps
CREATE INDEX idx_cga_gaps_session ON cga_gaps(session_id);
CREATE INDEX idx_cga_gaps_severity ON cga_gaps(severity);
CREATE INDEX idx_cga_gaps_type ON cga_gaps(gap_type);

-- Threats
CREATE INDEX idx_cga_threats_session ON cga_threats(session_id);
CREATE INDEX idx_cga_threats_risk ON cga_threats(risk_score DESC);

-- Opportunities
CREATE INDEX idx_cga_opportunities_session ON cga_opportunities(session_id);
CREATE INDEX idx_cga_opportunities_feasibility ON cga_opportunities(feasibility DESC);

-- Recommendations
CREATE INDEX idx_cga_recommendations_session ON cga_recommendations(session_id);
CREATE INDEX idx_cga_recommendations_priority ON cga_recommendations(priority);
CREATE INDEX idx_cga_recommendations_status ON cga_recommendations(status);

-- Reports
CREATE INDEX idx_cga_reports_session ON cga_reports(session_id);
CREATE INDEX idx_cga_reports_status ON cga_reports(status);

-- Audit log
CREATE INDEX idx_cga_audit_session ON cga_audit_log(session_id);
CREATE INDEX idx_cga_audit_event ON cga_audit_log(event_type);
CREATE INDEX idx_cga_audit_created ON cga_audit_log(created_at DESC);
CREATE INDEX idx_cga_audit_correlation ON cga_audit_log(correlation_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE cga_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE cga_audit_log ENABLE ROW LEVEL SECURITY;

-- Sessions policies
CREATE POLICY "Users can view own sessions" ON cga_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create sessions" ON cga_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON cga_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Child table policies (inherit from session ownership)
CREATE POLICY "Users can view session entities" ON cga_entities
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM cga_sessions WHERE id = session_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can view session gaps" ON cga_gaps
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM cga_sessions WHERE id = session_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can view session threats" ON cga_threats
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM cga_sessions WHERE id = session_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can view session opportunities" ON cga_opportunities
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM cga_sessions WHERE id = session_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can view session recommendations" ON cga_recommendations
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM cga_sessions WHERE id = session_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can view session reports" ON cga_reports
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM cga_sessions WHERE id = session_id AND user_id = auth.uid())
    );

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cga_sessions_updated_at
    BEFORE UPDATE ON cga_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cga_recommendations_updated_at
    BEFORE UPDATE ON cga_recommendations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cga_reports_updated_at
    BEFORE UPDATE ON cga_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE cga_sessions IS 'Gap analysis sessions';
COMMENT ON TABLE cga_entities IS 'Target entities for analysis';
COMMENT ON TABLE cga_competitors IS 'Competitor entities for comparative analysis';
COMMENT ON TABLE cga_gaps IS 'Identified gaps from analysis';
COMMENT ON TABLE cga_threats IS 'Threat assessments derived from gaps';
COMMENT ON TABLE cga_opportunities IS 'Opportunity assessments derived from gaps';
COMMENT ON TABLE cga_recommendations IS 'Strategic recommendations';
COMMENT ON TABLE cga_reports IS 'Analysis reports and summaries';
COMMENT ON TABLE cga_audit_log IS 'Audit trail for all CGA agent actions';
