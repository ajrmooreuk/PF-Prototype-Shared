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
-- DISCOVERY & CLIENT DATA
-- ============================================================================

-- Client Contexts (Master client file)
CREATE TABLE client_contexts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_url TEXT NOT NULL,
  industry VARCHAR(100) NOT NULL,
  target_geography VARCHAR(100),
  competitor_urls JSONB DEFAULT '[]'::jsonb, -- array of URLs
  content_themes JSONB DEFAULT '[]'::jsonb,
  key_products JSONB DEFAULT '[]'::jsonb,
  brand_messaging TEXT,
  schema_status JSONB DEFAULT '{}'::jsonb,
  crawler_permissions JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id) -- One client context per tenant
);

CREATE INDEX idx_client_contexts_tenant ON client_contexts(tenant_id);

-- Discovery Reports
CREATE TABLE discovery_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_context_id UUID NOT NULL REFERENCES client_contexts(id) ON DELETE CASCADE,
  website_structure JSONB DEFAULT '{}'::jsonb,
  web_presence JSONB DEFAULT '{}'::jsonb,
  content_analysis JSONB DEFAULT '{}'::jsonb,
  schema_audit JSONB DEFAULT '{}'::jsonb,
  crawlability_assessment JSONB DEFAULT '{}'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  completed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_discovery_reports_tenant ON discovery_reports(tenant_id);
CREATE INDEX idx_discovery_reports_client ON discovery_reports(client_context_id);

-- ICP Profiles
CREATE TABLE icp_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_context_id UUID NOT NULL REFERENCES client_contexts(id) ON DELETE CASCADE,
  customer_segments JSONB DEFAULT '[]'::jsonb,
  pain_points JSONB DEFAULT '[]'::jsonb,
  journey_stages JSONB DEFAULT '[]'::jsonb,
  online_communities JSONB DEFAULT '[]'::jsonb,
  query_patterns JSONB DEFAULT '[]'::jsonb,
  competitor_audiences JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_icp_profiles_tenant ON icp_profiles(tenant_id);
CREATE INDEX idx_icp_profiles_client ON icp_profiles(client_context_id);

-- ============================================================================
-- QUERY & TESTING DATA
-- ============================================================================

-- Query Categories (normalized core queries)
CREATE TABLE query_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  category_name VARCHAR(255) NOT NULL,
  query_text TEXT NOT NULL,
  intent VARCHAR(50) NOT NULL, -- informational, navigational, transactional, commercial
  journey_stage VARCHAR(50) NOT NULL, -- awareness, consideration, decision
  search_volume INTEGER,
  competition VARCHAR(20), -- low, medium, high
  priority INTEGER CHECK (priority BETWEEN 1 AND 10),
  variations JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_query_categories_tenant ON query_categories(tenant_id);
CREATE INDEX idx_query_categories_intent ON query_categories(intent);
CREATE INDEX idx_query_categories_journey ON query_categories(journey_stage);

-- Query Fanouts (25+ variations per core query)
CREATE TABLE query_fanouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  query_category_id UUID REFERENCES query_categories(id) ON DELETE CASCADE,
  core_query TEXT NOT NULL,
  variations JSONB DEFAULT '[]'::jsonb, -- array of 25+ queries
  total_search_volume INTEGER,
  cluster_intent VARCHAR(50),
  subtopics JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_query_fanouts_tenant ON query_fanouts(tenant_id);
CREATE INDEX idx_query_fanouts_category ON query_fanouts(query_category_id);

-- Audits (test runs)
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  audit_name VARCHAR(255) NOT NULL,
  audit_type VARCHAR(50) NOT NULL, -- citation, gap_analysis, full
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, running, completed, failed
  query_count INTEGER,
  platform_count INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audits_tenant ON audits(tenant_id);
CREATE INDEX idx_audits_status ON audits(status);
CREATE INDEX idx_audits_created ON audits(created_at DESC);

-- Citation Test Results
CREATE TABLE citation_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  query_category_id UUID REFERENCES query_categories(id),
  query_text TEXT NOT NULL,
  platform VARCHAR(50) NOT NULL, -- ChatGPT, Claude, Gemini, Perplexity, Google AI Mode
  client_cited BOOLEAN NOT NULL,
  client_position INTEGER, -- 1-based position if cited
  competitors_cited JSONB DEFAULT '[]'::jsonb,
  citation_type VARCHAR(50), -- text, table, interactive, calculator, visualization
  citation_context TEXT,
  rpi_score DECIMAL(5,2),
  response_snippet TEXT,
  tested_at TIMESTAMPTZ NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_citation_results_tenant ON citation_results(tenant_id);
CREATE INDEX idx_citation_results_audit ON citation_results(audit_id);
CREATE INDEX idx_citation_results_platform ON citation_results(platform);
CREATE INDEX idx_citation_results_cited ON citation_results(client_cited);

-- RPI Scores (calculated from citation results)
CREATE TABLE rpi_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  citation_result_id UUID NOT NULL REFERENCES citation_results(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  position_score DECIMAL(5,2),
  relevance_score DECIMAL(5,2),
  context_score DECIMAL(5,2),
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rpi_scores_tenant ON rpi_scores(tenant_id);
CREATE INDEX idx_rpi_scores_citation ON rpi_scores(citation_result_id);

-- ============================================================================
-- GAP ANALYSIS & RECOMMENDATIONS
-- ============================================================================

-- Gaps
CREATE TABLE gaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gap_id VARCHAR(50) UNIQUE NOT NULL, -- gap-baiv-001
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  audit_id UUID REFERENCES audits(id) ON DELETE SET NULL,
  gap_type VARCHAR(50) NOT NULL, -- topic_coverage, keyword, citation_opportunity, competitor_advantage
  client_brand VARCHAR(255),
  competitor_brand VARCHAR(255),
  topic VARCHAR(255) NOT NULL,
  keywords JSONB DEFAULT '[]'::jsonb,
  competitor_citations INTEGER DEFAULT 0,
  client_citations INTEGER DEFAULT 0,
  search_volume INTEGER,
  difficulty VARCHAR(20), -- easy, medium, hard
  priority VARCHAR(10) NOT NULL, -- P0, P1, P2, P3
  recommendation TEXT,
  estimated_impact TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'open', -- open, content_created, optimized, closed
  identified_date TIMESTAMPTZ DEFAULT NOW(),
  closed_date TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_gaps_tenant ON gaps(tenant_id);
CREATE INDEX idx_gaps_type ON gaps(gap_type);
CREATE INDEX idx_gaps_priority ON gaps(priority);
CREATE INDEX idx_gaps_status ON gaps(status);

-- RRF Topic Coverage Scores
CREATE TABLE rrf_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  article_count INTEGER NOT NULL,
  rrf_score DECIMAL(5,2) NOT NULL CHECK (rrf_score >= 0 AND rrf_score <= 100),
  citation_rate DECIMAL(5,2),
  coverage_status VARCHAR(20), -- excellent, good, fair, poor
  breadth_depth JSONB DEFAULT '{}'::jsonb,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rrf_scores_tenant ON rrf_scores(tenant_id);
CREATE INDEX idx_rrf_scores_topic ON rrf_scores(topic);

-- ============================================================================
-- CONTENT MANAGEMENT
-- ============================================================================

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  gap_id UUID REFERENCES gaps(id) ON DELETE SET NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER,
  sections JSONB DEFAULT '[]'::jsonb,
  toc JSONB DEFAULT '{}'::jsonb,
  meta_tags JSONB DEFAULT '{}'::jsonb,
  schema_markup JSONB DEFAULT '{}'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, review, approved, published
  published_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_tenant ON blog_posts(tenant_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Social Posts
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
  platform VARCHAR(50) NOT NULL, -- linkedin, facebook, instagram, twitter, threads, bluesky
  content TEXT NOT NULL,
  character_count INTEGER,
  hashtags JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  optimal_post_time TIMESTAMPTZ,
  status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, approved, scheduled, published
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social_posts_tenant ON social_posts(tenant_id);
CREATE INDEX idx_social_posts_platform ON social_posts(platform);
CREATE INDEX idx_social_posts_status ON social_posts(status);

-- ============================================================================
-- BUSINESS METRICS
-- ============================================================================

-- AI Visibility Scores
CREATE TABLE visibility_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  audit_id UUID REFERENCES audits(id) ON DELETE SET NULL,
  overall_score DECIMAL(5,2) NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  citation_rate DECIMAL(5,2), -- max 40 points
  rpi_score DECIMAL(5,2), -- max 25 points
  platform_consistency DECIMAL(5,2), -- max 15 points
  journey_coverage DECIMAL(5,2), -- max 10 points
  content_authority DECIMAL(5,2), -- max 10 points
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_visibility_scores_tenant ON visibility_scores(tenant_id);
CREATE INDEX idx_visibility_scores_date ON visibility_scores(calculated_at DESC);

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
ALTER TABLE client_contexts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE icp_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_fanouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE citation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE rpi_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE rrf_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE visibility_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tenant_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (tenant isolation)
CREATE POLICY tenant_isolation_policy ON client_contexts
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON discovery_reports
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON icp_profiles
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON query_categories
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON query_fanouts
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON audits
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON citation_results
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON rpi_scores
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON gaps
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON rrf_scores
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON blog_posts
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON social_posts
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_policy ON visibility_scores
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

CREATE TRIGGER update_client_contexts_updated_at BEFORE UPDATE ON client_contexts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_icp_profiles_updated_at BEFORE UPDATE ON icp_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
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
COMMENT ON TABLE client_contexts IS 'Master client context file (one per tenant)';
COMMENT ON TABLE discovery_reports IS 'Website discovery audit results';
COMMENT ON TABLE icp_profiles IS 'Ideal Customer Profile definitions';
COMMENT ON TABLE query_categories IS 'Core query definitions with categorization';
COMMENT ON TABLE query_fanouts IS '25+ query variations per core query';
COMMENT ON TABLE audits IS 'Test runs and audit executions';
COMMENT ON TABLE citation_results IS 'AI platform citation test results';
COMMENT ON TABLE rpi_scores IS 'Relevance Position Index scores (0-100)';
COMMENT ON TABLE gaps IS 'Content and citation gaps identified';
COMMENT ON TABLE rrf_scores IS 'Reciprocal Rank Fusion topic coverage scores';
COMMENT ON TABLE blog_posts IS 'Generated blog post content';
COMMENT ON TABLE social_posts IS 'Platform-optimized social media posts';
COMMENT ON TABLE visibility_scores IS 'Overall AI Visibility Score (0-100)';
COMMENT ON TABLE agent_registry IS 'Registered agents with configurations';
COMMENT ON TABLE agent_executions IS 'Agent execution history and results';
COMMENT ON TABLE audit_logs IS 'Comprehensive activity audit trail';
COMMENT ON TABLE ontologies IS 'Ontology definitions and schemas';
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
  ('1.0.0', 'Initial BAIV schema with normalized tables and JSONB flexibility');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
