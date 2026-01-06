-- ================================================================
-- PFC (PLATFORM FOUNDATION CORE) MODULES SCHEMA
-- Registry of reusable platform capabilities with transferability tracking
--
-- AGENT-DRIVEN MODULE ORCHESTRATION:
-- This schema supports agent-driven PFC-PFI integration management:
--
--   Bridge Monitor Agent → pfi_module_instances.health_status (monitoring)
--                        → pfi_bridge_instances.throughput_metrics (performance)
--   Validation Agent     → pfi_pbs_mappings.validation_results (traceability)
--   Deployment Agent     → pfi_module_instances.status (planned → active)
--
-- Agent Authority Boundaries:
--   Tier 1 (Read):    View PFC modules, PFI instances
--   Tier 2 (Manage):  Update PFI configurations, health checks
--   Tier 3 (Deploy):  Deploy new PFI instances, update bridges
-- ================================================================

-- ================================================================
-- 1. PFC MODULE REGISTRY
-- ================================================================

CREATE TABLE pfc_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Module Identity
    module_code TEXT NOT NULL UNIQUE, -- e.g., "PFC-SEC-Auth-Foundation", "PFC-OAA-Agent-Registry"
    module_name TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    
    -- Module Classification
    category TEXT NOT NULL CHECK (category IN (
        'value_engineering',  -- VE-* modules (VSOM, OKR, PMF, etc.)
        'security',          -- SEC-* modules (Auth, RBAC, Multi-Tenant, etc.)
        'design',            -- DSN-* modules (Design System, Components, etc.)
        'agent_management',  -- OAA-* modules (Agent Registry, Ontology Registry)
        'agentic_builder',   -- AB-* modules (Program Manager, Solution Builder, etc.)
        'crm'                -- CRM-* modules (Customer Organization, Partner Management)
    )),
    
    -- Transferability
    is_transferable BOOLEAN NOT NULL DEFAULT FALSE, -- TRUE = can be instantiated per PFI, FALSE = PFC-only
    
    -- Module Definition
    description TEXT NOT NULL,
    capabilities JSONB NOT NULL, -- [{capability_name, description, acceptance_criteria[]}]
    
    -- Technical Specification
    database_schema JSONB, -- {tables[], functions[], views[], triggers[]}
    api_endpoints JSONB, -- [{method, path, description, request_schema, response_schema}]
    ui_components JSONB, -- [{component_name, props[], events[]}]
    
    -- Dependencies
    depends_on_modules JSONB, -- [{module_code, version, dependency_type}]
    integration_patterns JSONB, -- [{pattern_name, description, implementation_guide}]
    
    -- Configuration Schema (for PFI instances)
    config_schema JSONB, -- JSON Schema for module configuration
    default_config JSONB, -- Default configuration values
    
    -- Documentation
    documentation_url TEXT,
    example_usage JSONB, -- [{use_case, implementation_example, notes}]
    
    -- Lifecycle
    status TEXT NOT NULL CHECK (status IN ('development', 'beta', 'stable', 'deprecated')),
    maturity_level TEXT CHECK (maturity_level IN ('experimental', 'alpha', 'beta', 'stable', 'mature')),
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deprecated_at TIMESTAMPTZ
);

CREATE INDEX idx_pfc_modules_category ON pfc_modules(category);
CREATE INDEX idx_pfc_modules_transferable ON pfc_modules(is_transferable);
CREATE INDEX idx_pfc_modules_status ON pfc_modules(status);
CREATE INDEX idx_pfc_modules_code ON pfc_modules(module_code);

-- ================================================================
-- 2. PFC MODULE CAPABILITIES (Detailed)
-- ================================================================

CREATE TABLE pfc_module_capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES pfc_modules(id) ON DELETE CASCADE,
    
    -- Capability Identity
    capability_code TEXT NOT NULL, -- e.g., "jwt-auth", "rls-isolation", "role-based-access"
    capability_name TEXT NOT NULL,
    
    -- Capability Definition
    description TEXT NOT NULL,
    acceptance_criteria JSONB NOT NULL, -- [{criterion, validation_method, expected_result}]
    
    -- Implementation
    implementation_type TEXT CHECK (implementation_type IN (
        'database', 'api', 'ui_component', 'function', 'process', 'integration'
    )),
    implementation_details JSONB, -- {technical_approach, code_references[], configuration{}}
    
    -- Dependencies
    requires_capabilities JSONB, -- [{capability_code, module_code, reason}]
    
    -- Testing
    test_cases JSONB, -- [{test_id, description, steps[], expected_result, actual_result, status}]
    test_coverage_percentage INTEGER CHECK (test_coverage_percentage >= 0 AND test_coverage_percentage <= 100),
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(module_id, capability_code)
);

CREATE INDEX idx_module_capabilities_module ON pfc_module_capabilities(module_id);
CREATE INDEX idx_module_capabilities_code ON pfc_module_capabilities(capability_code);

-- ================================================================
-- 2A. PRODUCT INSTANCES (BAIV, W4M, AIR)
-- ================================================================

CREATE TABLE product_instances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Product Identity
    product_code TEXT NOT NULL UNIQUE, -- e.g., "BAIV", "W4M", "AIR"
    product_name TEXT NOT NULL, -- e.g., "Be AI Visible", "Wings4Mind", "AI Readiness Labs"
    product_type TEXT NOT NULL, -- e.g., "SaaS", "Marketplace", "Consulting Platform"
    
    -- Product Description
    description TEXT NOT NULL,
    target_market JSONB, -- {icp, industry_focus[], use_cases[]}
    
    -- Ownership
    owned_by_organization UUID, -- Reference to tenants table (e.g., "BAIV Internal" tenant as product owner)
    
    -- Configuration
    configuration JSONB, -- Product-wide configuration (feature flags, limits, etc.)
    
    -- Status
    status TEXT NOT NULL CHECK (status IN ('development', 'beta', 'production', 'sunset')),
    launch_date DATE,
    
    -- Metrics
    total_tenants INTEGER DEFAULT 0, -- Count of customer organizations using this product
    active_users INTEGER DEFAULT 0, -- Total active users across all tenants
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_instances_code ON product_instances(product_code);
CREATE INDEX idx_product_instances_status ON product_instances(status);
CREATE INDEX idx_product_instances_owner ON product_instances(owned_by_organization);

COMMENT ON TABLE product_instances IS 'Product instances (BAIV, W4M, AIR) that instantiate PFC modules. Each product serves multiple customer tenants with shared PFI configurations.';

-- ================================================================
-- 3. PFI MODULE INSTANCES (Product-Instance Instantiations)
-- ================================================================

CREATE TABLE pfi_module_instances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_instance_id UUID NOT NULL, -- References product_instances table (BAIV, W4M, AIR)
    pfc_module_id UUID NOT NULL REFERENCES pfc_modules(id),
    
    -- Instance Identity
    instance_code TEXT NOT NULL, -- e.g., "BAIV-SEC-Auth", "W4M-OAA-Agent-Registry"
    instance_name TEXT NOT NULL,
    
    -- Configuration
    configuration JSONB NOT NULL, -- Instance-specific configuration (validated against pfc_modules.config_schema)
    
    -- Status
    status TEXT NOT NULL CHECK (status IN (
        'planned',      -- Module selected but not yet configured
        'configured',   -- Configuration defined
        'deploying',    -- Deployment in progress
        'active',       -- Fully operational
        'suspended',    -- Temporarily disabled
        'deprecated'    -- No longer in use
    )),
    
    -- Deployment Tracking
    deployed_at TIMESTAMPTZ,
    last_health_check TIMESTAMPTZ,
    health_status TEXT CHECK (health_status IN ('healthy', 'degraded', 'unhealthy', 'unknown')),
    
    -- Usage Metrics (aggregated across all tenants in this product instance)
    usage_metrics JSONB, -- {api_calls_total, active_users, storage_mb, errors_count, last_24h{}}
    
    -- Integration Points
    integrated_with JSONB, -- [{pfi_instance_id, integration_type, status, config}]
    
    -- Customizations
    customizations JSONB, -- [{customization_type, description, implementation, rationale}]
    
    -- Metadata
    deployed_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deprecated_at TIMESTAMPTZ,
    
    UNIQUE(product_instance_id, instance_code)
);

CREATE INDEX idx_pfi_instances_product ON pfi_module_instances(product_instance_id);
CREATE INDEX idx_pfi_instances_pfc_module ON pfi_module_instances(pfc_module_id);
CREATE INDEX idx_pfi_instances_status ON pfi_module_instances(status);
CREATE INDEX idx_pfi_instances_health ON pfi_module_instances(health_status);

-- ================================================================
-- 4. PFI-PBS INTEGRATION (Module Instances to PBS Components)
-- ================================================================

CREATE TABLE pfi_pbs_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL, -- Customer organization using the product
    pfi_instance_id UUID NOT NULL REFERENCES pfi_module_instances(id),
    pbs_component_id UUID NOT NULL REFERENCES pbs_components(id),
    
    -- Mapping Type
    mapping_type TEXT NOT NULL CHECK (mapping_type IN (
        'implements',      -- PFI instance implements this PBS component
        'supports',        -- PFI instance provides capabilities for this component
        'integrates_with', -- PFI instance integrates with this component
        'depends_on'       -- PBS component depends on this PFI instance
    )),
    
    -- Integration Details
    integration_config JSONB, -- Configuration for this specific integration
    capabilities_used JSONB, -- [{capability_code, usage_description}]
    
    -- Status
    integration_status TEXT CHECK (integration_status IN (
        'planned', 'in_progress', 'completed', 'validated', 'failed'
    )),
    
    -- Validation
    validation_results JSONB, -- [{test_case, result, evidence, timestamp}]
    validated_at TIMESTAMPTZ,
    validated_by UUID,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, pfi_instance_id, pbs_component_id, mapping_type)
);

CREATE INDEX idx_pfi_pbs_mappings_tenant ON pfi_pbs_mappings(tenant_id);
CREATE INDEX idx_pfi_pbs_mappings_pfi_instance ON pfi_pbs_mappings(pfi_instance_id);
CREATE INDEX idx_pfi_pbs_mappings_pbs_component ON pfi_pbs_mappings(pbs_component_id);
CREATE INDEX idx_pfi_pbs_mappings_type ON pfi_pbs_mappings(mapping_type);

COMMENT ON TABLE pfi_pbs_mappings IS 'Links PFI module instances to tenant-specific PBS components. Tenant_id ensures proper data isolation for multi-tenant products.';

-- ================================================================
-- 5. MODULE INTEGRATION BRIDGES
-- ================================================================

CREATE TABLE pfc_integration_bridges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Bridge Identity
    bridge_code TEXT NOT NULL UNIQUE, -- e.g., "VE-Bridge", "Security-Bridge", "Design-Bridge", "Agent-Orchestration-Bridge"
    bridge_name TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    
    -- Bridge Purpose
    description TEXT NOT NULL,
    scope TEXT NOT NULL, -- What this bridge connects (e.g., "PFC-VE modules to PFI value management")
    
    -- Bridge Components
    source_modules JSONB NOT NULL, -- [{module_code, role, capabilities_exposed[]}]
    target_modules JSONB NOT NULL, -- [{module_code, role, capabilities_required[]}]
    
    -- Integration Pattern
    integration_pattern TEXT NOT NULL CHECK (integration_pattern IN (
        'data_flow',        -- One-way data propagation
        'bidirectional',    -- Two-way data sync
        'event_driven',     -- Event-based communication
        'orchestration',    -- Coordinated workflow execution
        'aggregation'       -- Aggregate data from multiple sources
    )),
    
    -- Technical Implementation
    implementation JSONB NOT NULL, -- {data_contracts[], api_mappings[], event_handlers[], workflows[]}
    
    -- Configuration
    config_schema JSONB, -- JSON Schema for bridge configuration
    default_config JSONB,
    
    -- Status
    status TEXT NOT NULL CHECK (status IN ('design', 'implementation', 'testing', 'active', 'deprecated')),
    
    -- Metadata
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_integration_bridges_code ON pfc_integration_bridges(bridge_code);
CREATE INDEX idx_integration_bridges_status ON pfc_integration_bridges(status);

-- ================================================================
-- 6. PFI BRIDGE INSTANCES (Product-specific bridge configurations)
-- ================================================================

CREATE TABLE pfi_bridge_instances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_instance_id UUID NOT NULL REFERENCES product_instances(id), -- BAIV, W4M, or AIR
    bridge_id UUID NOT NULL REFERENCES pfc_integration_bridges(id),
    
    -- Instance Identity
    instance_code TEXT NOT NULL,
    instance_name TEXT NOT NULL,
    
    -- Configuration
    configuration JSONB NOT NULL, -- Validated against bridge's config_schema
    
    -- Connected Instances
    source_pfi_instances JSONB NOT NULL, -- [{pfi_instance_id, role}]
    target_pfi_instances JSONB NOT NULL, -- [{pfi_instance_id, role}]
    
    -- Status
    status TEXT NOT NULL CHECK (status IN ('configured', 'active', 'suspended', 'error')),
    
    -- Monitoring
    health_status TEXT CHECK (health_status IN ('healthy', 'degraded', 'unhealthy')),
    last_sync_at TIMESTAMPTZ,
    error_count INTEGER DEFAULT 0,
    last_error JSONB, -- {timestamp, error_type, error_message, stack_trace}
    
    -- Metrics (aggregated across all tenants)
    throughput_metrics JSONB, -- {messages_processed, avg_latency_ms, errors_per_hour}
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(product_instance_id, instance_code)
);

CREATE INDEX idx_pfi_bridge_instances_product ON pfi_bridge_instances(product_instance_id);
CREATE INDEX idx_pfi_bridge_instances_bridge ON pfi_bridge_instances(bridge_id);
CREATE INDEX idx_pfi_bridge_instances_status ON pfi_bridge_instances(status);

COMMENT ON TABLE pfi_bridge_instances IS 'Product-specific bridge configurations (e.g., BAIV-VE-Bridge). Shared across all customer tenants within the product.';

-- ================================================================
-- 7. MODULE DEPENDENCY GRAPH
-- ================================================================

CREATE TABLE pfc_module_dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES pfc_modules(id) ON DELETE CASCADE,
    depends_on_module_id UUID NOT NULL REFERENCES pfc_modules(id) ON DELETE CASCADE,
    
    -- Dependency Type
    dependency_type TEXT NOT NULL CHECK (dependency_type IN (
        'required',  -- Must be present and active
        'optional',  -- Enhances functionality but not required
        'exclusive'  -- Cannot coexist with this module (alternative implementation)
    )),
    
    -- Version Constraint
    version_constraint TEXT, -- e.g., ">=1.0.0", "^2.1.0", "~1.5.0"
    
    -- Integration Details
    integration_notes TEXT,
    shared_capabilities JSONB, -- [{capability_code, how_used}]
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(module_id, depends_on_module_id),
    CHECK (module_id != depends_on_module_id) -- Cannot depend on self
);

CREATE INDEX idx_module_dependencies_module ON pfc_module_dependencies(module_id);
CREATE INDEX idx_module_dependencies_depends_on ON pfc_module_dependencies(depends_on_module_id);
CREATE INDEX idx_module_dependencies_type ON pfc_module_dependencies(dependency_type);

-- ================================================================
-- 8. MODULE VERSION HISTORY
-- ================================================================

CREATE TABLE pfc_module_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES pfc_modules(id) ON DELETE CASCADE,
    
    -- Version Info
    version TEXT NOT NULL,
    release_date DATE NOT NULL,
    
    -- Changes
    change_type TEXT NOT NULL CHECK (change_type IN ('major', 'minor', 'patch', 'hotfix')),
    changelog JSONB NOT NULL, -- [{change_category, description, breaking_change, migration_guide}]
    
    -- Compatibility
    backward_compatible BOOLEAN NOT NULL DEFAULT TRUE,
    migration_required BOOLEAN NOT NULL DEFAULT FALSE,
    migration_guide TEXT,
    
    -- Snapshot
    module_snapshot JSONB NOT NULL, -- Complete module definition at this version
    
    -- Metadata
    released_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(module_id, version)
);

CREATE INDEX idx_module_versions_module ON pfc_module_versions(module_id);
CREATE INDEX idx_module_versions_release_date ON pfc_module_versions(release_date DESC);

-- ================================================================
-- 9. RLS POLICIES
-- ================================================================

-- Product-level tables (no RLS - accessible by product admins)
-- pfc_modules: Global registry, no RLS needed
-- product_instances: Accessible by product owners
-- pfi_module_instances: Shared across all tenants in a product

-- Tenant-level tables (RLS enabled for customer org isolation)
ALTER TABLE pfi_pbs_mappings ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_pfi_pbs_mappings ON pfi_pbs_mappings
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

COMMENT ON POLICY tenant_isolation_pfi_pbs_mappings ON pfi_pbs_mappings IS 'Isolates PBS mappings by tenant (customer organization). PFI instances are product-level and shared across tenants.';

-- ================================================================
-- 10. HELPER FUNCTIONS
-- ================================================================

-- Get all PFC modules required by a PRD (via PBS components)
CREATE OR REPLACE FUNCTION get_required_pfc_modules(prd_id_param UUID)
RETURNS TABLE (
    module_code TEXT,
    module_name TEXT,
    category TEXT,
    is_transferable BOOLEAN,
    usage_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.module_code,
        m.module_name,
        m.category,
        m.is_transferable,
        COUNT(DISTINCT pbs.id) AS usage_count
    FROM pbs_components pbs
    CROSS JOIN LATERAL jsonb_array_elements(pbs.pfc_modules) AS pfc_module
    JOIN pfc_modules m ON m.module_code = (pfc_module->>'module_code')
    WHERE pbs.prd_id = prd_id_param
    GROUP BY m.id, m.module_code, m.module_name, m.category, m.is_transferable
    ORDER BY usage_count DESC, m.category;
END;
$$ LANGUAGE plpgsql;

-- Validate PFI instance configuration against module's config schema
CREATE OR REPLACE FUNCTION validate_pfi_configuration(
    pfi_instance_id_param UUID
)
RETURNS JSONB AS $$
DECLARE
    module_schema JSONB;
    instance_config JSONB;
    validation_result JSONB;
BEGIN
    -- Get module's config schema and instance configuration
    SELECT m.config_schema, pfi.configuration
    INTO module_schema, instance_config
    FROM pfi_module_instances pfi
    JOIN pfc_modules m ON m.id = pfi.pfc_module_id
    WHERE pfi.id = pfi_instance_id_param;
    
    -- TODO: Implement JSON Schema validation
    -- For now, return a placeholder
    validation_result := jsonb_build_object(
        'valid', true,
        'errors', '[]'::jsonb
    );
    
    RETURN validation_result;
END;
$$ LANGUAGE plpgsql;

-- Check module dependency conflicts
CREATE OR REPLACE FUNCTION check_module_dependencies(
    module_ids UUID[]
)
RETURNS TABLE (
    conflict_type TEXT,
    module1_code TEXT,
    module2_code TEXT,
    description TEXT
) AS $$
BEGIN
    -- Check for exclusive dependencies (modules that cannot coexist)
    RETURN QUERY
    SELECT 
        'exclusive'::TEXT AS conflict_type,
        m1.module_code AS module1_code,
        m2.module_code AS module2_code,
        'These modules provide exclusive implementations and cannot coexist'::TEXT AS description
    FROM pfc_module_dependencies dep
    JOIN pfc_modules m1 ON m1.id = dep.module_id
    JOIN pfc_modules m2 ON m2.id = dep.depends_on_module_id
    WHERE dep.dependency_type = 'exclusive'
      AND dep.module_id = ANY(module_ids)
      AND dep.depends_on_module_id = ANY(module_ids);
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- COMMENTS
-- ================================================================

COMMENT ON TABLE pfc_modules IS 'Platform Foundation Core module registry - reusable capabilities across all product instances (BAIV, W4M, AIR)';
COMMENT ON TABLE pfc_module_capabilities IS 'Detailed capability definitions for PFC modules with acceptance criteria';
COMMENT ON TABLE product_instances IS 'Product instances (BAIV, W4M, AIR) that each serve multiple customer tenants';
COMMENT ON TABLE pfi_module_instances IS 'Product-specific instantiations of PFC modules. Shared by all customer tenants within a product.';
COMMENT ON TABLE pfi_pbs_mappings IS 'Linkage between PFI module instances and tenant-specific PBS components for traceability';
COMMENT ON TABLE pfc_integration_bridges IS 'Integration patterns connecting PFC modules to create cohesive workflows';
COMMENT ON TABLE pfi_bridge_instances IS 'Product-specific bridge configurations for module integration. Shared across all tenants in the product.';
COMMENT ON TABLE pfc_module_dependencies IS 'Module dependency graph for prerequisite and compatibility tracking';
COMMENT ON TABLE pfc_module_versions IS 'Version history for PFC modules with changelog and migration guides';
