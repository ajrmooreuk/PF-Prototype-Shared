-- ============================================================================
-- BAIV Database Schema v1.0.0
-- 
-- Purpose: Complete PostgreSQL schema for BAIV platform
-- Design Principles:
--   - Normalized tables where possible to reduce redundancy
--   - JSONB for flexible, schema-less data (metadata, configurations)
--   - Row-Level Security (RLS) for multi-tenant isolation
--   - Indexes optimized for common query patterns
--   - Minimal complexity with clear relationships
--
-- Author: BAIV Platform Team
-- Date: December 31, 2025
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE TABLES (Foundation)
-- ============================================================================

-- Tenants (Multi-tenancy)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tier VARCHAR(20) NOT NULL DEFAULT 'starter', -- free, starter, professional, enterprise
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, suspended, cancelled
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_status ON tenants(status);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255), -- nullable for OAuth-only users
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  mfa_enabled BOOLEAN DEFAULT FALSE,
  mfa_secret VARCHAR(255),
  last_login_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_last_login ON users(last_login_at DESC);

-- Roles (RBAC)
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL, -- admin, manager, analyst, viewer
  level INTEGER NOT NULL, -- 4, 3, 2, 1
  permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-Tenant-Role Associations (normalized many-to-many)
CREATE TABLE user_tenant_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tenant_id, role_id)
);

CREATE INDEX idx_user_tenant_roles_user ON user_tenant_roles(user_id);
CREATE INDEX idx_user_tenant_roles_tenant ON user_tenant_roles(tenant_id);

-- API Keys
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_id VARCHAR(32) UNIQUE NOT NULL,
  key_hash VARCHAR(64) NOT NULL,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key_type VARCHAR(20) NOT NULL, -- platform, agent, readonly
  permissions JSONB DEFAULT '[]'::jsonb,
  rate_limit INTEGER DEFAULT 100,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_tenant ON api_keys(tenant_id);
CREATE INDEX idx_api_keys_revoked ON api_keys(revoked) WHERE revoked = FALSE;

-- ============================================================================
-- ONTOLOGY DATA (Simplified JSONB storage for MVP)
-- ============================================================================

-- Single table to store all ontology instances as JSONB
CREATE TABLE ontology_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  ontology_type VARCHAR(100) NOT NULL, -- client-context, discovery-report, icp-profile, query-category, etc.
  ontology_id VARCHAR(100), -- Optional external ID (e.g., gap-baiv-001)
  data JSONB NOT NULL, -- Complete ontology instance data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ontology_data_tenant ON ontology_data(tenant_id);
CREATE INDEX idx_ontology_data_type ON ontology_data(ontology_type);
CREATE INDEX idx_ontology_data_ontology_id ON ontology_data(ontology_id) WHERE ontology_id IS NOT NULL;
CREATE INDEX idx_ontology_data_gin ON ontology_data USING GIN(data); -- For JSONB queries

-- ============================================================================
-- AUDIT & TESTING (Keep minimal normalized structure)
-- ============================================================================

-- Audits (test runs)
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  audit_name VARCHAR(255) NOT NULL,
  audit_type VARCHAR(50) NOT NULL, -- citation, gap_analysis, full
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, running, completed, failed
  results JSONB DEFAULT '{}'::jsonb, -- All test results stored as JSONB
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audits_tenant ON audits(tenant_id);
CREATE INDEX idx_audits_status ON audits(status);
CREATE INDEX idx_audits_created ON audits(created_at DESC);
CREATE INDEX idx_audits_results_gin ON audits USING GIN(results);




-- ============================================================================
-- AGENT EXECUTION & AUDIT
-- ============================================================================

-- Agent Registry
CREATE TABLE agent_registry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id VARCHAR(100) UNIQUE NOT NULL, -- agent-baiv-discovery-v1.0.0
  name VARCHAR(255) NOT NULL,
  version VARCHAR(20) NOT NULL,
  agent_type VARCHAR(50) NOT NULL, -- operational, analytical, creative
  tier VARCHAR(10) NOT NULL, -- P0, P1, P2
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, deprecated, disabled
  config_schema JSONB DEFAULT '{}'::jsonb,
  resource_limits JSONB DEFAULT '{}'::jsonb,
  authority_boundary JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_registry_agent_id ON agent_registry(agent_id);
CREATE INDEX idx_agent_registry_status ON agent_registry(status);

-- Agent Executions
CREATE TABLE agent_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agent_registry(id),
  user_id UUID REFERENCES users(id),
  input_data JSONB DEFAULT '{}'::jsonb,
  output_data JSONB DEFAULT '{}'::jsonb,
  status VARCHAR(50) NOT NULL, -- running, success, failure, timeout
  duration_ms INTEGER,
  api_calls_count INTEGER,
  tokens_used INTEGER,
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_agent_executions_tenant ON agent_executions(tenant_id);
CREATE INDEX idx_agent_executions_agent ON agent_executions(agent_id);
CREATE INDEX idx_agent_executions_status ON agent_executions(status);
CREATE INDEX idx_agent_executions_started ON agent_executions(started_at DESC);

-- Audit Logs (comprehensive activity logging)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  status VARCHAR(20) NOT NULL, -- success, failure, error
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================================================
-- ONTOLOGY REGISTRY (Meta-schema management)
-- ============================================================================

-- Ontologies
CREATE TABLE ontologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id VARCHAR(100) UNIQUE NOT NULL, -- baiv-ont-client-context-v1.0.0
  name VARCHAR(255) NOT NULL,
  version VARCHAR(20) NOT NULL,
  ontology_type VARCHAR(50) NOT NULL, -- domain, platform, integration
  schema_definition JSONB NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ontologies_entry_id ON ontologies(entry_id);
CREATE INDEX idx_ontologies_type ON ontologies(ontology_type);

-- Agent-Ontology Bindings
CREATE TABLE agent_ontology_bindings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agent_registry(id) ON DELETE CASCADE,
  ontology_id UUID NOT NULL REFERENCES ontologies(id) ON DELETE CASCADE,
  binding_type VARCHAR(20) NOT NULL, -- produces, consumes, requires, validates
  node_types JSONB DEFAULT '[]'::jsonb,
  purpose TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, ontology_id, binding_type)
);

CREATE INDEX idx_agent_ontology_bindings_agent ON agent_ontology_bindings(agent_id);
CREATE INDEX idx_agent_ontology_bindings_ontology ON agent_ontology_bindings(ontology_id);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tenant-scoped tables
ALTER TABLE ontology_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tenant_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (tenant isolation)
CREATE POLICY tenant_isolation_policy ON ontology_data
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON audits
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON agent_executions
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON api_keys
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON user_tenant_roles
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Audit logs: Read-only for tenant users
CREATE POLICY audit_logs_read_policy ON audit_logs
  FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert default roles
INSERT INTO roles (name, level, permissions, description) VALUES
  ('admin', 4, '["*"]'::jsonb, 'Full platform access'),
  ('manager', 3, '["agents.create", "agents.execute", "agents.configure", "content.create", "content.approve", "content.publish", "content.view", "data.read", "data.export", "settings.modify"]'::jsonb, 'Team lead with content and agent management'),
  ('analyst', 2, '["agents.execute", "content.view", "data.read", "data.export"]'::jsonb, 'Analyst with read and execution access'),
  ('viewer', 1, '["content.view", "data.read"]'::jsonb, 'Read-only dashboard access');

-- Insert agent registry (16 primary BAIV agents)
INSERT INTO agent_registry (agent_id, name, version, agent_type, tier, config_schema, resource_limits) VALUES
  ('agent-baiv-discovery-v1.0.0', 'Discovery Agent', '1.0.0', 'operational', 'P0', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 524288000, "maxApiCalls": 500}'::jsonb),
  ('agent-baiv-icp-discovery-v1.0.0', 'ICP Discovery Agent', '1.0.0', 'operational', 'P0', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 524288000, "maxApiCalls": 500}'::jsonb),
  ('agent-baiv-citation-tester-v1.0.0', 'Citation Tester Agent', '1.0.0', 'operational', 'P0', '{}'::jsonb, '{"maxExecutionTime": 900000, "maxMemory": 524288000, "maxApiCalls": 1000}'::jsonb),
  ('agent-baiv-query-expansion-v1.0.0', 'Query Expansion Agent', '1.0.0', 'analytical', 'P1', '{}'::jsonb, '{"maxExecutionTime": 300000, "maxMemory": 262144000, "maxApiCalls": 200}'::jsonb),
  ('agent-baiv-gap-analyzer-v1.0.0', 'Gap Analyzer Agent', '1.0.0', 'analytical', 'P0', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 524288000, "maxApiCalls": 500}'::jsonb),
  ('agent-baiv-turn-analysis-v1.0.0', 'Turn Analysis Agent', '1.0.0', 'analytical', 'P1', '{}'::jsonb, '{"maxExecutionTime": 300000, "maxMemory": 262144000, "maxApiCalls": 200}'::jsonb),
  ('agent-baiv-llm-mentions-v1.0.0', 'LLM Mentions Agent', '1.0.0', 'analytical', 'P1', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 262144000, "maxApiCalls": 500}'::jsonb),
  ('agent-baiv-attribution-metrics-v1.0.0', 'Attribution Metrics Agent', '1.0.0', 'analytical', 'P0', '{}'::jsonb, '{"maxExecutionTime": 300000, "maxMemory": 262144000, "maxApiCalls": 100}'::jsonb),
  ('agent-baiv-reddit-scraper-v1.0.0', 'Reddit Scraper Agent', '1.0.0', 'operational', 'P2', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 262144000, "maxApiCalls": 300}'::jsonb),
  ('agent-baiv-bluesky-scraper-v1.0.0', 'Bluesky Scraper Agent', '1.0.0', 'operational', 'P2', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 262144000, "maxApiCalls": 300}'::jsonb),
  ('agent-baiv-youtube-analyzer-v1.0.0', 'YouTube Transcript Analyzer', '1.0.0', 'analytical', 'P2', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 262144000, "maxApiCalls": 200}'::jsonb),
  ('agent-baiv-blog-creator-v1.0.0', 'Blog Creator Agent', '1.0.0', 'creative', 'P0', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 524288000, "maxApiCalls": 300}'::jsonb),
  ('agent-baiv-social-creator-v1.0.0', 'Social Media Creator Agent', '1.0.0', 'creative', 'P1', '{}'::jsonb, '{"maxExecutionTime": 300000, "maxMemory": 262144000, "maxApiCalls": 100}'::jsonb),
  ('agent-baiv-postiz-publisher-v1.0.0', 'Postiz Publisher Agent', '1.0.0', 'operational', 'P1', '{}'::jsonb, '{"maxExecutionTime": 300000, "maxMemory": 262144000, "maxApiCalls": 50}'::jsonb),
  ('agent-baiv-hunter-lead-finder-v1.0.0', 'Hunter Lead Finder Agent', '1.0.0', 'operational', 'P2', '{}'::jsonb, '{"maxExecutionTime": 600000, "maxMemory": 262144000, "maxApiCalls": 500}'::jsonb),
  ('agent-baiv-google-ai-tester-v1.0.0', 'Google Search AI Mode Tester', '1.0.0', 'operational', 'P1', '{}'::jsonb, '{"maxExecutionTime": 900000, "maxMemory": 524288000, "maxApiCalls": 1000}'::jsonb);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to set tenant context
CREATE OR REPLACE FUNCTION set_tenant_context(p_tenant_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', p_tenant_id::TEXT, FALSE);
END;
$$ LANGUAGE plpgsql;

-- Function to get current tenant
CREATE OR REPLACE FUNCTION get_current_tenant()
RETURNS UUID AS $$
BEGIN
  RETURN current_setting('app.current_tenant_id')::UUID;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ontology_data_updated_at BEFORE UPDATE ON ontology_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_agent_registry_updated_at BEFORE UPDATE ON agent_registry
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ontologies_updated_at BEFORE UPDATE ON ontologies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

COMMENT ON TABLE tenants IS 'Multi-tenant organizations using BAIV platform';
COMMENT ON TABLE users IS 'User accounts with authentication credentials';
COMMENT ON TABLE roles IS 'RBAC roles with permission sets';
COMMENT ON TABLE user_tenant_roles IS 'User-tenant-role associations for multi-tenant RBAC';
COMMENT ON TABLE api_keys IS 'API keys for programmatic access';
COMMENT ON TABLE ontology_data IS 'All ontology instances stored as JSONB (client contexts, queries, gaps, content, etc.)';
COMMENT ON TABLE audits IS 'Test runs and audit executions with results in JSONB';
COMMENT ON TABLE agent_registry IS 'Registered agents with configurations';
COMMENT ON TABLE agent_executions IS 'Agent execution history and results';
COMMENT ON TABLE audit_logs IS 'Comprehensive activity audit trail';
COMMENT ON TABLE ontologies IS 'Ontology schema definitions (meta-level)';
COMMENT ON TABLE agent_ontology_bindings IS 'Agent-ontology relationship mappings';

-- ============================================================================
-- SCHEMA VERSION
-- ============================================================================

CREATE TABLE schema_version (
  version VARCHAR(20) PRIMARY KEY,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  description TEXT
);

INSERT INTO schema_version (version, description) VALUES
  ('1.0.0', 'Initial BAIV MVP schema - simplified with ontology_data JSONB table');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
