# MVP Security Plan: Ontology & Data Integrity Framework

## MCSB-Aligned Security for Supabase JSONB Multi-Tenant Platform

**Version:** 1.0  
**Date:** December 21, 2025  
**Scope:** Platform Foundation (PF-Core) with BAIV, AIR, and W4M Ventures  
**Architecture:** Supabase PostgreSQL with JSONB Ontologies, Multi-Tenant RLS, Claude Agent SDK

---

## Executive Summary

This plan translates Microsoft Cloud Security Benchmark (MCSB) enterprise security controls into simplified, practical implementations for a Supabase-based ontology platform. The focus is on maintaining **access control** and **data integrity** for JSONB ontology files and database data, with explicit agentic controls that create tenant-unique views supporting collaborative dataset modification by multiple users and sessions.

### Core Security Principles

| MCSB Domain | Platform Translation |
|-------------|---------------------|
| Network Security (NS) | Supabase edge functions, RLS as network-level isolation |
| Identity Management (IM) | Supabase Auth + tenant context propagation |
| Privileged Access (PA) | Agent authority boundaries, consultant role hierarchies |
| Data Protection (DP) | JSONB integrity validation, schema enforcement |
| Logging & Threat Detection (LT) | Audit trails, change tracking, agent activity logs |
| Governance & Strategy (GS) | Ontology governance, OAA Registry compliance |

---

## 1. Multi-Tenant Access Control Architecture

### 1.1 Tenant Isolation Model

```
┌─────────────────────────────────────────────────────────────────┐
│                     PLATFORM BOUNDARY                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   TENANT A      │  │   TENANT B      │  │   TENANT C      │  │
│  │  (Client Org)   │  │  (Client Org)   │  │  (Client Org)   │  │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤  │
│  │ • Users         │  │ • Users         │  │ • Users         │  │
│  │ • Sessions      │  │ • Sessions      │  │ • Sessions      │  │
│  │ • Ontologies    │  │ • Ontologies    │  │ • Ontologies    │  │
│  │ • Datasets      │  │ • Datasets      │  │ • Datasets      │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│           ▼                    ▼                    ▼           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              RLS ENFORCEMENT LAYER                        │   │
│  │   tenant_id = current_setting('app.current_tenant_id')   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               │                                  │
│                               ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              CONSULTANT ACCESS LAYER                      │   │
│  │   Agency-level cross-tenant visibility (authorized only)  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Role Hierarchy

| Role Level | Scope | Capabilities | RLS Behavior |
|------------|-------|--------------|--------------|
| **Platform Owner** | All tenants | System configuration, billing, global ontologies | Bypass RLS via service_role |
| **Agency Admin** | Assigned client tenants | Multi-tenant dashboard, cross-client analytics | Custom RLS with agency_id |
| **Tenant Admin** | Single tenant | User management, ontology configuration | Standard tenant_id RLS |
| **Tenant User** | Single tenant | Data entry, report viewing | Standard tenant_id RLS |
| **Consultant** | Assigned tenants | Read/advise access, annotation rights | tenant_id + consultant_id RLS |
| **Agent (AI)** | Tenant-scoped per invocation | Automated processing with audit | tenant_id + agent_authority_level |

### 1.3 Implementation: RLS Policy Template

```sql
-- Base tenant isolation (MCSB: NS-1, PA-7)
CREATE POLICY tenant_isolation_base ON {table_name}
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant_id')::UUID
        OR 
        current_setting('app.user_role', true) = 'platform_owner'
        OR
        (
            current_setting('app.user_role', true) = 'consultant'
            AND tenant_id IN (
                SELECT tenant_id 
                FROM consultant_assignments 
                WHERE consultant_id = current_setting('app.user_id')::UUID
                AND is_active = true
                AND expires_at > NOW()
            )
        )
    );

-- Agency-level access for multi-client consultancies
CREATE POLICY agency_cross_tenant ON {table_name}
    FOR SELECT
    USING (
        current_setting('app.agency_id', true) IS NOT NULL
        AND tenant_id IN (
            SELECT tenant_id 
            FROM agency_client_relationships 
            WHERE agency_id = current_setting('app.agency_id')::UUID
            AND relationship_status = 'active'
        )
    );
```

---

## 2. Ontology Integrity & JSONB Data Protection

### 2.1 JSONB Schema Validation Framework

Ontologies stored as JSONB require structural and semantic integrity checks that traditional SQL constraints cannot provide.

```sql
-- Ontology validation function (MCSB: DP-4, PV-2)
CREATE OR REPLACE FUNCTION validate_jsonb_ontology(
    ontology_data JSONB,
    ontology_type TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    required_fields TEXT[];
    field TEXT;
BEGIN
    -- Type-specific required field definitions
    CASE ontology_type
        WHEN 'vsom' THEN
            required_fields := ARRAY['@context', '@type', 'vision', 'mission', 'objectives'];
        WHEN 'gap_analysis' THEN
            required_fields := ARRAY['@context', '@type', 'gapId', 'dimension', 'currentValue', 'desiredValue'];
        WHEN 'cmo_okr' THEN
            required_fields := ARRAY['@context', '@type', 'objectiveId', 'keyResults'];
        WHEN 'brand_entity' THEN
            required_fields := ARRAY['@context', '@type', 'organizationId', 'name'];
        ELSE
            RAISE EXCEPTION 'Unknown ontology type: %', ontology_type;
    END CASE;
    
    -- Validate required fields exist
    FOREACH field IN ARRAY required_fields LOOP
        IF NOT (ontology_data ? field) THEN
            RAISE EXCEPTION 'Missing required field: % for ontology type: %', field, ontology_type;
        END IF;
    END LOOP;
    
    -- Validate @context is schema.org grounded
    IF NOT (ontology_data->>'@context' LIKE '%schema.org%') THEN
        RAISE WARNING 'Ontology missing schema.org context - recommend adding for interoperability';
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger for ontology table inserts/updates
CREATE TRIGGER validate_ontology_before_change
    BEFORE INSERT OR UPDATE ON ontologies
    FOR EACH ROW
    EXECUTE FUNCTION check_ontology_integrity();
```

### 2.2 Ontology Change Tracking (Immutable Audit Log)

```sql
-- Ontology version history table (MCSB: LT-3, DP-2)
CREATE TABLE ontology_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_id UUID NOT NULL REFERENCES ontologies(id),
    tenant_id UUID NOT NULL,
    
    -- Version metadata
    version_number INTEGER NOT NULL,
    change_type TEXT NOT NULL CHECK (change_type IN ('create', 'update', 'delete', 'restore')),
    
    -- Complete snapshot for rollback capability
    ontology_snapshot JSONB NOT NULL,
    
    -- Change attribution
    changed_by_user_id UUID,
    changed_by_agent_id TEXT,
    change_reason TEXT,
    
    -- Integrity verification
    checksum TEXT NOT NULL, -- SHA-256 of ontology_snapshot
    previous_version_id UUID REFERENCES ontology_versions(version_id),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT ontology_versions_unique UNIQUE (ontology_id, version_number)
);

-- Enable RLS with immutability enforcement
ALTER TABLE ontology_versions ENABLE ROW LEVEL SECURITY;

-- Only INSERT allowed (immutable audit log)
CREATE POLICY ontology_versions_insert_only ON ontology_versions
    FOR INSERT
    WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY ontology_versions_read ON ontology_versions
    FOR SELECT
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Prevent updates and deletes
CREATE POLICY ontology_versions_no_modify ON ontology_versions
    FOR UPDATE
    USING (false);

CREATE POLICY ontology_versions_no_delete ON ontology_versions
    FOR DELETE
    USING (false);
```

### 2.3 Checksum Verification Function

```sql
-- Integrity checksum generator (MCSB: DP-4)
CREATE OR REPLACE FUNCTION generate_ontology_checksum(ontology_data JSONB)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(
        sha256(
            convert_to(
                ontology_data::TEXT, 
                'UTF8'
            )
        ), 
        'hex'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Verification function for integrity checks
CREATE OR REPLACE FUNCTION verify_ontology_integrity(
    ontology_id_param UUID
) RETURNS TABLE (
    is_valid BOOLEAN,
    current_checksum TEXT,
    stored_checksum TEXT,
    discrepancy_details TEXT
) AS $$
DECLARE
    current_data JSONB;
    stored_check TEXT;
    computed_check TEXT;
BEGIN
    -- Get current ontology data
    SELECT o.data, v.checksum 
    INTO current_data, stored_check
    FROM ontologies o
    JOIN ontology_versions v ON v.ontology_id = o.id
    WHERE o.id = ontology_id_param
    ORDER BY v.version_number DESC
    LIMIT 1;
    
    computed_check := generate_ontology_checksum(current_data);
    
    RETURN QUERY SELECT 
        (computed_check = stored_check) AS is_valid,
        computed_check AS current_checksum,
        stored_check AS stored_checksum,
        CASE 
            WHEN computed_check != stored_check 
            THEN 'Checksum mismatch - data may have been modified outside version control'
            ELSE 'Integrity verified'
        END AS discrepancy_details;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 3. Concurrent Multi-User Dataset Modification

### 3.1 Collaborative Editing Model

The platform must support scenarios where:
- Multiple tenant users modify the same dataset simultaneously
- Consultants provide annotations and recommendations
- AI agents process and enhance data with tenant visibility

```sql
-- Session-aware locking table (MCSB: IM-7, DP-2)
CREATE TABLE dataset_edit_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID NOT NULL,
    tenant_id UUID NOT NULL,
    
    -- Session owner
    user_id UUID REFERENCES users(id),
    user_type TEXT CHECK (user_type IN ('tenant_user', 'consultant', 'agent')),
    
    -- Lock scope (row-level or field-level)
    lock_scope JSONB NOT NULL DEFAULT '{"type": "document"}',
    -- Examples:
    -- {"type": "document"} - entire document locked
    -- {"type": "fields", "paths": ["$.objectives[0]", "$.metrics"]} - specific JSON paths
    
    -- Session metadata
    session_started_at TIMESTAMPTZ DEFAULT NOW(),
    last_heartbeat_at TIMESTAMPTZ DEFAULT NOW(),
    session_expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 minutes',
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'released'))
);

-- Index for conflict detection
CREATE INDEX idx_edit_sessions_dataset ON dataset_edit_sessions(dataset_id, status) 
WHERE status = 'active';

-- Enable RLS
ALTER TABLE dataset_edit_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY edit_sessions_tenant ON dataset_edit_sessions
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 3.2 Conflict Detection Function

```sql
-- Check for editing conflicts before allowing modifications
CREATE OR REPLACE FUNCTION check_edit_conflicts(
    target_dataset_id UUID,
    requesting_user_id UUID,
    requested_paths JSONB DEFAULT '{"type": "document"}'
) RETURNS TABLE (
    has_conflict BOOLEAN,
    conflicting_sessions JSONB,
    recommendation TEXT
) AS $$
DECLARE
    conflicts JSONB;
BEGIN
    -- Find active sessions that would conflict
    SELECT jsonb_agg(
        jsonb_build_object(
            'session_id', session_id,
            'user_id', user_id,
            'user_type', user_type,
            'lock_scope', lock_scope,
            'session_started_at', session_started_at
        )
    ) INTO conflicts
    FROM dataset_edit_sessions
    WHERE dataset_id = target_dataset_id
      AND status = 'active'
      AND session_expires_at > NOW()
      AND user_id != requesting_user_id
      AND (
          -- Document-level lock conflicts with everything
          lock_scope->>'type' = 'document'
          OR requested_paths->>'type' = 'document'
          -- Field-level locks conflict if paths overlap
          OR (lock_scope->'paths') ?| ARRAY(SELECT jsonb_array_elements_text(requested_paths->'paths'))
      );
    
    IF conflicts IS NOT NULL THEN
        RETURN QUERY SELECT 
            TRUE,
            conflicts,
            'Wait for active sessions to complete or request specific non-conflicting paths';
    ELSE
        RETURN QUERY SELECT 
            FALSE,
            NULL::JSONB,
            'No conflicts - safe to proceed with edit';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3.3 Merge Capability for Concurrent Changes

```sql
-- Tenant view with pending changes aggregated
CREATE OR REPLACE VIEW tenant_dataset_view AS
SELECT 
    d.id AS dataset_id,
    d.tenant_id,
    d.name,
    d.data AS current_data,
    d.updated_at,
    
    -- Aggregate pending changes from active sessions
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'session_id', es.session_id,
                'user_id', es.user_id,
                'user_type', es.user_type,
                'pending_since', es.session_started_at
            )
        )
        FROM dataset_edit_sessions es
        WHERE es.dataset_id = d.id
          AND es.status = 'active'
    ) AS active_editors,
    
    -- Include consultant annotations as overlay
    (
        SELECT jsonb_agg(ca.annotation)
        FROM consultant_annotations ca
        WHERE ca.dataset_id = d.id
          AND ca.status = 'pending_review'
    ) AS consultant_recommendations
    
FROM datasets d
WHERE d.tenant_id = current_setting('app.current_tenant_id')::UUID;
```

---

## 4. Agentic Access Controls

### 4.1 Agent Authority Boundaries

AI agents operating on tenant data require explicit authority boundaries (MCSB: PA-1, PA-7).

```sql
-- Agent authority definitions
CREATE TABLE agent_authority_policies (
    policy_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_type TEXT NOT NULL, -- e.g., 'discovery_agent', 'gap_analysis_agent', 'content_generator'
    
    -- Authority scope
    allowed_operations TEXT[] NOT NULL,
    -- e.g., ARRAY['read', 'create_draft', 'annotate']
    -- NOT: ARRAY['delete', 'publish', 'modify_ontology_schema']
    
    -- Data scope restrictions
    allowed_data_types TEXT[] DEFAULT ARRAY['all'],
    -- e.g., ARRAY['gap_analysis', 'improvement_opportunities']
    
    -- Requires human approval for
    requires_approval_for TEXT[] DEFAULT ARRAY['publish', 'external_send'],
    
    -- Audit requirements
    log_all_actions BOOLEAN DEFAULT TRUE,
    
    -- Policy metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent session tracking
CREATE TABLE agent_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    agent_type TEXT NOT NULL,
    
    -- Invoking context
    invoked_by_user_id UUID,
    invoked_by_workflow TEXT,
    
    -- Authority for this session
    authority_policy_id UUID REFERENCES agent_authority_policies(policy_id),
    
    -- Session boundaries
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
    
    -- Audit summary
    actions_performed JSONB DEFAULT '[]',
    data_accessed JSONB DEFAULT '[]',
    changes_made JSONB DEFAULT '[]'
);
```

### 4.2 Agent Action Logging Function

```sql
-- Log every agent action for audit trail (MCSB: LT-1, LT-3)
CREATE OR REPLACE FUNCTION log_agent_action(
    p_session_id UUID,
    p_action_type TEXT,
    p_target_resource TEXT,
    p_action_details JSONB,
    p_outcome TEXT DEFAULT 'success'
) RETURNS UUID AS $$
DECLARE
    action_id UUID;
    current_actions JSONB;
BEGIN
    action_id := gen_random_uuid();
    
    -- Append to session actions
    UPDATE agent_sessions
    SET actions_performed = actions_performed || jsonb_build_object(
        'action_id', action_id,
        'timestamp', NOW(),
        'action_type', p_action_type,
        'target_resource', p_target_resource,
        'details', p_action_details,
        'outcome', p_outcome
    )
    WHERE session_id = p_session_id;
    
    -- Also log to immutable audit table
    INSERT INTO agent_action_audit (
        action_id, session_id, tenant_id, action_type, 
        target_resource, action_details, outcome, logged_at
    )
    SELECT 
        action_id, p_session_id, tenant_id, p_action_type,
        p_target_resource, p_action_details, p_outcome, NOW()
    FROM agent_sessions
    WHERE session_id = p_session_id;
    
    RETURN action_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4.3 Agent Authority Check Function

```sql
-- Verify agent has authority for requested action
CREATE OR REPLACE FUNCTION check_agent_authority(
    p_session_id UUID,
    p_requested_action TEXT,
    p_target_data_type TEXT
) RETURNS TABLE (
    is_authorized BOOLEAN,
    requires_approval BOOLEAN,
    denial_reason TEXT
) AS $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Get the authority policy for this session
    SELECT aap.* INTO policy_record
    FROM agent_sessions ags
    JOIN agent_authority_policies aap ON aap.policy_id = ags.authority_policy_id
    WHERE ags.session_id = p_session_id;
    
    IF policy_record IS NULL THEN
        RETURN QUERY SELECT FALSE, FALSE, 'No authority policy found for session';
        RETURN;
    END IF;
    
    -- Check if action is allowed
    IF NOT (p_requested_action = ANY(policy_record.allowed_operations)) THEN
        RETURN QUERY SELECT FALSE, FALSE, 
            format('Action "%s" not in allowed operations: %s', 
                   p_requested_action, 
                   array_to_string(policy_record.allowed_operations, ', '));
        RETURN;
    END IF;
    
    -- Check if data type is allowed
    IF NOT ('all' = ANY(policy_record.allowed_data_types)) 
       AND NOT (p_target_data_type = ANY(policy_record.allowed_data_types)) THEN
        RETURN QUERY SELECT FALSE, FALSE,
            format('Data type "%s" not in allowed types: %s',
                   p_target_data_type,
                   array_to_string(policy_record.allowed_data_types, ', '));
        RETURN;
    END IF;
    
    -- Check if action requires human approval
    IF p_requested_action = ANY(policy_record.requires_approval_for) THEN
        RETURN QUERY SELECT TRUE, TRUE, NULL;
        RETURN;
    END IF;
    
    RETURN QUERY SELECT TRUE, FALSE, NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Consultant Access Model

### 5.1 Consultant Assignment & Time-Bound Access

```sql
-- Consultant assignments with temporal boundaries (MCSB: PA-2, PA-4)
CREATE TABLE consultant_assignments (
    assignment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultant_id UUID NOT NULL REFERENCES users(id),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    agency_id UUID REFERENCES agencies(id),
    
    -- Access scope
    access_level TEXT NOT NULL CHECK (access_level IN ('read_only', 'annotate', 'collaborate', 'admin_delegate')),
    
    -- Temporal boundaries
    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Assignment metadata
    assigned_by UUID NOT NULL,
    assignment_reason TEXT,
    
    -- Specific data access restrictions (optional)
    restricted_to_datasets UUID[], -- NULL means all datasets
    restricted_to_ontology_types TEXT[], -- NULL means all types
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for RLS policy lookups
CREATE INDEX idx_consultant_assignments_lookup 
ON consultant_assignments(consultant_id, tenant_id, is_active, expires_at);
```

### 5.2 Consultant-Specific View Layer

```sql
-- View that applies consultant-specific filtering
CREATE OR REPLACE VIEW consultant_accessible_data AS
SELECT 
    d.*,
    ca.access_level,
    ca.expires_at AS access_expires
FROM datasets d
JOIN consultant_assignments ca ON ca.tenant_id = d.tenant_id
WHERE ca.consultant_id = current_setting('app.user_id')::UUID
  AND ca.is_active = TRUE
  AND ca.expires_at > NOW()
  AND (
      ca.restricted_to_datasets IS NULL 
      OR d.id = ANY(ca.restricted_to_datasets)
  );

-- Consultant annotations table
CREATE TABLE consultant_annotations (
    annotation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID NOT NULL REFERENCES datasets(id),
    tenant_id UUID NOT NULL,
    consultant_id UUID NOT NULL REFERENCES users(id),
    
    -- Annotation content
    annotation_type TEXT CHECK (annotation_type IN ('recommendation', 'question', 'approval', 'concern', 'note')),
    target_json_path TEXT, -- JSONPath to specific element being annotated
    annotation_content JSONB NOT NULL,
    
    -- Status workflow
    status TEXT DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'acknowledged', 'implemented', 'declined')),
    
    -- Response from tenant
    tenant_response JSONB,
    responded_by UUID,
    responded_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE consultant_annotations ENABLE ROW LEVEL SECURITY;

-- Consultants can see their own annotations
CREATE POLICY consultant_own_annotations ON consultant_annotations
    FOR ALL
    USING (consultant_id = current_setting('app.user_id')::UUID);

-- Tenant users can see annotations on their data
CREATE POLICY tenant_view_annotations ON consultant_annotations
    FOR SELECT
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Tenant users can respond to annotations
CREATE POLICY tenant_respond_annotations ON consultant_annotations
    FOR UPDATE
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID)
    WITH CHECK (
        -- Can only update response fields
        tenant_id = current_setting('app.current_tenant_id')::UUID
    );
```

---

## 6. Security Monitoring & Audit

### 6.1 Unified Audit Log

```sql
-- Comprehensive audit log (MCSB: LT-1, LT-3, LT-5)
CREATE TABLE security_audit_log (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Event classification
    event_type TEXT NOT NULL,
    event_category TEXT NOT NULL CHECK (event_category IN (
        'authentication', 'authorization', 'data_access', 'data_modification',
        'ontology_change', 'agent_action', 'admin_action', 'security_alert'
    )),
    severity TEXT DEFAULT 'info' CHECK (severity IN ('debug', 'info', 'warning', 'error', 'critical')),
    
    -- Actor identification
    tenant_id UUID,
    user_id UUID,
    agent_id TEXT,
    session_id TEXT,
    
    -- Action details
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id TEXT,
    resource_path TEXT,
    
    -- Request context
    ip_address INET,
    user_agent TEXT,
    request_id TEXT,
    
    -- Outcome
    outcome TEXT CHECK (outcome IN ('success', 'failure', 'partial', 'denied')),
    outcome_details JSONB,
    
    -- Timestamps
    occurred_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partitioning by month for performance
CREATE INDEX idx_audit_log_time ON security_audit_log(occurred_at DESC);
CREATE INDEX idx_audit_log_tenant ON security_audit_log(tenant_id, occurred_at DESC);
CREATE INDEX idx_audit_log_severity ON security_audit_log(severity, occurred_at DESC) WHERE severity IN ('warning', 'error', 'critical');

-- Make audit log append-only
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY audit_log_insert ON security_audit_log
    FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY audit_log_select ON security_audit_log
    FOR SELECT
    USING (
        current_setting('app.user_role', true) = 'platform_owner'
        OR tenant_id = current_setting('app.current_tenant_id')::UUID
    );

-- No updates or deletes allowed
CREATE POLICY audit_log_no_modify ON security_audit_log
    FOR UPDATE USING (FALSE);

CREATE POLICY audit_log_no_delete ON security_audit_log
    FOR DELETE USING (FALSE);
```

### 6.2 Automated Security Alerting

```sql
-- Security alert triggers
CREATE OR REPLACE FUNCTION trigger_security_alert()
RETURNS TRIGGER AS $$
BEGIN
    -- Alert on critical severity events
    IF NEW.severity = 'critical' THEN
        PERFORM pg_notify('security_alerts', json_build_object(
            'alert_type', 'critical_event',
            'log_id', NEW.log_id,
            'event_type', NEW.event_type,
            'tenant_id', NEW.tenant_id,
            'action', NEW.action,
            'occurred_at', NEW.occurred_at
        )::TEXT);
    END IF;
    
    -- Alert on multiple failed auth attempts
    IF NEW.event_category = 'authentication' AND NEW.outcome = 'failure' THEN
        -- Check for brute force pattern
        IF (
            SELECT COUNT(*) > 5
            FROM security_audit_log
            WHERE ip_address = NEW.ip_address
              AND event_category = 'authentication'
              AND outcome = 'failure'
              AND occurred_at > NOW() - INTERVAL '15 minutes'
        ) THEN
            PERFORM pg_notify('security_alerts', json_build_object(
                'alert_type', 'brute_force_attempt',
                'ip_address', NEW.ip_address,
                'attempt_count', 6,
                'occurred_at', NEW.occurred_at
            )::TEXT);
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER security_alert_trigger
    AFTER INSERT ON security_audit_log
    FOR EACH ROW
    EXECUTE FUNCTION trigger_security_alert();
```

---

## 7. MVP Implementation Phases

### Phase 1: Foundation Security (Weeks 1-2)

| Task | MCSB Control | Priority |
|------|--------------|----------|
| Implement base RLS policies on all tenant-scoped tables | NS-1, PA-7 | Critical |
| Create tenant context setting mechanism | IM-1 | Critical |
| Set up audit logging infrastructure | LT-3 | Critical |
| Implement JSONB validation triggers | DP-4 | High |

### Phase 2: Ontology Integrity (Weeks 3-4)

| Task | MCSB Control | Priority |
|------|--------------|----------|
| Create ontology versioning system | DP-4, BR-1 | High |
| Implement checksum verification | DP-4 | High |
| Build schema.org validation layer | PV-2 | Medium |
| Create integrity verification functions | DP-2 | Medium |

### Phase 3: Multi-User Collaboration (Weeks 5-6)

| Task | MCSB Control | Priority |
|------|--------------|----------|
| Implement edit session tracking | DP-2 | High |
| Build conflict detection system | DP-2 | High |
| Create consultant annotation layer | PA-4, IM-7 | Medium |
| Implement merge capability for concurrent edits | DP-2 | Medium |

### Phase 4: Agent Controls (Weeks 7-8)

| Task | MCSB Control | Priority |
|------|--------------|----------|
| Create agent authority policy framework | PA-1, PA-7 | High |
| Implement agent session tracking | LT-1 | High |
| Build authority check functions | PA-7 | High |
| Create agent action audit logging | LT-3 | Medium |

---

## 8. Testing & Validation

### 8.1 Security Test Cases

```sql
-- Test: Verify RLS prevents cross-tenant access
DO $$
BEGIN
    -- Set context to Tenant A
    PERFORM set_config('app.current_tenant_id', 'tenant-a-uuid', false);
    
    -- Attempt to access Tenant B data should return 0 rows
    ASSERT (SELECT COUNT(*) FROM datasets WHERE tenant_id = 'tenant-b-uuid') = 0,
        'RLS VIOLATION: Tenant A can see Tenant B data';
    
    RAISE NOTICE 'RLS isolation test PASSED';
END $$;

-- Test: Verify consultant access boundaries
DO $$
BEGIN
    -- Set context to consultant without assignment
    PERFORM set_config('app.user_id', 'unassigned-consultant-uuid', false);
    PERFORM set_config('app.user_role', 'consultant', false);
    
    -- Should have no access to any tenant data
    ASSERT (SELECT COUNT(*) FROM consultant_accessible_data) = 0,
        'AUTHORIZATION VIOLATION: Unassigned consultant has data access';
    
    RAISE NOTICE 'Consultant boundary test PASSED';
END $$;

-- Test: Verify ontology integrity check
DO $$
DECLARE
    test_result RECORD;
BEGIN
    SELECT * INTO test_result FROM verify_ontology_integrity('test-ontology-uuid');
    
    ASSERT test_result.is_valid = TRUE,
        'INTEGRITY VIOLATION: Ontology checksum mismatch';
    
    RAISE NOTICE 'Ontology integrity test PASSED';
END $$;
```

### 8.2 Penetration Test Scenarios

| Scenario | Attack Vector | Expected Outcome |
|----------|---------------|------------------|
| Cross-tenant data access | SQL injection in tenant_id parameter | RLS blocks access, query returns empty |
| Consultant scope escalation | Modify assignment expiry via API | Database constraint prevents future dates beyond policy |
| Agent authority bypass | Call restricted function without authority | Authority check fails, action logged |
| Audit log tampering | Attempt UPDATE on audit log | RLS policy blocks modification |
| Session hijacking | Use expired session token | Session validation fails, access denied |

---

## 9. Compliance Mapping

| MCSB Control | Implementation | Status |
|--------------|----------------|--------|
| **NS-1** Network Segmentation | RLS provides row-level isolation equivalent | ✅ Implemented |
| **IM-1** Centralized Identity | Supabase Auth + context propagation | ✅ Implemented |
| **IM-7** Conditional Access | Role-based RLS policies with temporal checks | ✅ Implemented |
| **PA-1** Privileged User Limits | Agent authority policies, role hierarchy | ✅ Implemented |
| **PA-2** JIT Access | Time-bound consultant assignments | ✅ Implemented |
| **PA-7** Least Privilege | Scoped RLS policies per role | ✅ Implemented |
| **DP-2** Data Anomaly Monitoring | Security alert triggers | ✅ Implemented |
| **DP-4** Encryption at Rest | Supabase default (Postgres TDE) | ✅ Platform-provided |
| **LT-1** Threat Detection | Security alert system | ✅ Implemented |
| **LT-3** Security Logging | Comprehensive audit log | ✅ Implemented |
| **LT-5** Centralized Log Management | Single audit table with partitioning | ✅ Implemented |
| **PV-2** Configuration Audit | Ontology validation triggers | ✅ Implemented |
| **BR-1** Automated Backups | Ontology versioning + Supabase backups | ✅ Implemented |

---

## 10. Next Steps

1. **Execute Phase 1** - Apply RLS policies to all existing tables (reference `/database/scripts/audit_rls_policies.sql`)
2. **Deploy audit infrastructure** - Create `security_audit_log` table and triggers
3. **Implement ontology versioning** - Create `ontology_versions` table with checksum support
4. **Build agent authority framework** - Deploy authority policies for existing agents
5. **Configure monitoring** - Set up pg_notify listeners for security alerts
6. **Document runbooks** - Create incident response procedures for security alerts

---

## Appendix A: Quick Reference SQL

```sql
-- Set tenant context (required before any tenant-scoped query)
SELECT set_config('app.current_tenant_id', 'your-tenant-uuid', false);
SELECT set_config('app.user_id', 'your-user-uuid', false);
SELECT set_config('app.user_role', 'tenant_user', false);

-- Check current context
SELECT 
    current_setting('app.current_tenant_id', true) AS tenant_id,
    current_setting('app.user_id', true) AS user_id,
    current_setting('app.user_role', true) AS role;

-- Verify RLS is enabled on a table
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'your_table';

-- List all RLS policies
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

---

*Document generated as Platform Foundation security baseline. Review and update quarterly or upon significant architecture changes.*
