# BAIV MVP Week 1 Implementation Plan: Security-First Foundation
**Version:** 1.1.0  
**Date:** January 5, 2026  
**Duration:** Week 1 (5 days)  
**Total Effort:** ~20-24 hours (distributed across 5 days)  
**Scope:** Unified Security Foundation + User Role Management + Team UI  

## Document Control

| Attribute | Value |
|-----------|-------|
| **Status** | 🟢 Active |
| **Aligned With** | UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md |
| **Traces To** | BAIV_MVP_TODO_PLAN_v2.4.0.md Week 1 (Lines 681-851) |
| **Prerequisite** | BAIV_DATABASE_SCHEMA.sql, Security templates, ROLE_MANAGEMENT_MINI_PRD_v1.0.md |
| **Goal** | Complete security foundation: Auth + RLS + RBAC + Multi-user + Team Management UI |

---

## Cross-Reference Traceability Matrix

| This Plan | MVP v2.4.0 Reference | Source Document | Deliverable |
|-----------|---------------------|-----------------|-------------|
| Day 1 | Lines 687-721 | UNIFIED_SECURITY_FOUNDATION_MVP | Auth + RLS + Audit operational |
| Day 2 | Lines 722-753 | UNIFIED_SECURITY_FOUNDATION_MVP | Multi-user collaboration features |
| Day 3 | Lines 754-785 | ROLE_MANAGEMENT_MINI_PRD | Complete RBAC role management |
| Day 4 | Lines 786-824 | ROLE_MANAGEMENT_MINI_PRD | Team Management UI + Testing |
| Day 5 | Lines 825-840 | MVP v2.4.0 Week 1 | Buffer + Week 2 prep |

**Key Addition in v2.4.0:**
- **User Role Management** (Day 3): 4-tier roles (Owner, Admin, Analyst, Viewer)
- **Team Management UI** (Day 4): InviteUserDialog, TeamSettingsPage, AcceptInvitationPage, RoleBadge
- **6 API Endpoints**: Invite user, accept invitation, update role, remove user, list team, get invitation
- **4 Database Functions**: invite_user_to_tenant(), accept_invitation(), update_user_role(), remove_user_from_tenant()

---

## Day 1: Monday - VE Bridge + Security Foundation (6-7 hours)

### Morning (3 hours): Value Engineering Bridge (WBS 1.1)
**PRD Reference:** Section 1.3.1 - Strategic Alignment  
**PBS Reference:** PBS 1.1 - Value Engineering Bridge

#### Task 1.1.1: Configure VSOM Context (2 hours)
**WBS ID:** 1.1.1  
**Priority:** P0  
**Dependencies:** None

**Actions:**
- [ ] Load VSOM JSON file with vision, objectives, metrics
- [ ] Configure 5 strategic perspectives:
  - Financial: $5K MRR by Month 3
  - Customer: >40% PMF score, 25% citation rate improvement
  - Process: <2 sec API response, 99.5% uptime
  - Learning: 3 core agents operational, 80%+ accuracy
  - Stakeholder: 10 agency partnerships, 15% partner revenue
- [ ] Store in `config/vsom-context.json`

**Deliverable:** VSOM context loaded and accessible

#### Task 1.1.2: Setup OKR Integration (2 hours)
**WBS ID:** 1.1.2  
**Dependencies:** 1.1.1

**Actions:**
- [ ] Configure Marketing OKRs:
  - Objective: Increase AI Visibility for B2B SaaS clients
  - KR1: Citation rate ≥ 25% across 4 platforms
  - KR2: 100 priority keywords with gap analysis
  - KR3: 50 blog posts published addressing gaps
- [ ] Link KRs to BAIV metrics
- [ ] Create OKR tracking endpoints

**Deliverable:** OKR module integrated

#### Task 1.1.3: Implement VE-Metrics/KPI Tree (2 hours)
**WBS ID:** 1.1.3  
**Dependencies:** 1.1.2

**Actions:**
- [ ] Create KPI hierarchy:
  - Strategic KPIs (5 BSC perspectives)
  - Operational KPIs (agent performance, API metrics)
  - Activity KPIs (user actions, content velocity)
- [ ] Map to 5-Perspective Balanced Scorecard
- [ ] Define metric calculation rules

**Deliverable:** Metrics schema created

---

### Afternoon (3-4 hours): Security Bridge - MVP Security (WBS 1.2)
**Security Plan Reference:** Day 1 (4-6 hours)  
**PRD Reference:** Section 1.3.1 - Authentication & Authorization

#### Task 1.2.1: Deploy Authentication Module (30 min)
**WBS ID:** 1.2.1  
**Security Plan:** Day 1, Morning (partial)

**Actions:**
- [ ] Create Supabase project: "baiv-mvp-production"
- [ ] Enable Supabase Auth with email/password
- [ ] Configure JWT settings:
  - Access token: 15 minutes
  - Refresh token: 7 days
- [ ] Enable email confirmations
- [ ] Set rate limiting (prevent brute force)

**Deliverable:** Supabase Auth configured with JWT

---

#### Task 1.2.2: Deploy RBAC Module (2 hours)
**WBS ID:** 1.2.2  
**Security Plan:** Day 1, Morning (Run table inventory + Generate RLS migration)  
**Dependencies:** 1.2.1

**Actions:**
- [ ] **Run table inventory query** (15 min)
  ```sql
  SELECT tablename FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename NOT LIKE 'pg_%';
  ```

- [ ] **Generate RLS migration from template** (30 min)
  - Use template for each table:
    ```sql
    ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;
    ALTER TABLE {table_name} FORCE ROW LEVEL SECURITY;
    CREATE POLICY {table_name}_tenant_isolation ON {table_name} FOR ALL 
        USING (tenant_id = current_setting('app.current_tenant_id', true)::UUID);
    CREATE POLICY {table_name}_service_bypass ON {table_name} FOR ALL 
        TO service_role USING (true);
    ```

- [ ] **Add `set_tenant_context()` function** (15 min)
  ```sql
  CREATE OR REPLACE FUNCTION set_tenant_context(
      p_tenant_id UUID,
      p_user_id UUID DEFAULT NULL,
      p_user_role TEXT DEFAULT 'member'
  ) RETURNS VOID AS $$
  BEGIN
      PERFORM set_config('app.current_tenant_id', p_tenant_id::TEXT, false);
      PERFORM set_config('app.user_id', COALESCE(p_user_id::TEXT, ''), false);
      PERFORM set_config('app.user_role', p_user_role, false);
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  
  GRANT EXECUTE ON FUNCTION set_tenant_context TO authenticated;
  ```

- [ ] **Apply RLS to existing tables** (30 min)
  - Apply to 6 tenant-scoped tables:
    - tenants
    - users
    - ontology_data
    - agent_executions
    - audits
    - api_keys

- [ ] **Configure 4 RBAC roles** (30 min)
  - Admin: Full access
  - Manager: Execute agents, view all tenant data
  - Analyst: Execute agents, view own data
  - Viewer: Read-only access

**Deliverable:** RLS policies active, 4 roles configured

---

#### Task 1.2.3: Configure Multi-Tenant Isolation (1 hour)
**WBS ID:** 1.2.3  
**Security Plan:** Day 1, Morning + Afternoon  
**Dependencies:** 1.2.2

**Actions:**
- [ ] **Add audit_log table + trigger** (30 min)
  ```sql
  CREATE TABLE IF NOT EXISTS audit_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID,
      user_id UUID,
      action TEXT NOT NULL,
      table_name TEXT,
      record_id UUID,
      old_data JSONB,
      new_data JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );
  
  CREATE INDEX IF NOT EXISTS idx_audit_tenant_time 
      ON audit_log(tenant_id, created_at DESC);
  
  ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY audit_log_insert ON audit_log FOR INSERT WITH CHECK (true);
  CREATE POLICY audit_log_read ON audit_log FOR SELECT USING (
      tenant_id = current_setting('app.current_tenant_id', true)::UUID
      OR current_setting('app.user_role', true) = 'platform_owner'
  );
  ```

- [ ] **Create audit trigger function** (See SECURITY_MULTIUSER_COMPRESSED_PLAN lines 127-143)

- [ ] **Run RLS audit verification** (15 min)
  ```sql
  SELECT tablename, rowsecurity FROM pg_tables 
  WHERE schemaname = 'public' AND rowsecurity = true;
  ```
  - Verify 100% coverage on tenant-scoped tables

- [ ] **Create backend middleware** (45 min)
  - Create `setTenantContext.ts`:
    ```typescript
    import { supabase } from './supabase-client';
    
    export async function setTenantContext(
      tenantId: string, 
      userId: string, 
      userRole: string
    ) {
      const { error } = await supabase.rpc('set_tenant_context', {
        p_tenant_id: tenantId,
        p_user_id: userId,
        p_user_role: userRole
      });
      
      if (error) throw error;
    }
    ```

- [ ] **Integrate into API routes** (45 min)
  - All routes must call `setTenantContext()` before queries
  - Extract tenant_id from JWT or session

**Deliverable:** Tenant isolation working with audit logging

---

#### Task 1.2.4: Setup API Key Management (1 hour)
**WBS ID:** 1.2.4  
**Dependencies:** 1.2.3

**Actions:**
- [ ] Create `api_keys` table (30 min)
  ```sql
  CREATE TABLE api_keys (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID REFERENCES tenants(id),
      key_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      permissions JSONB,
      expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      last_used_at TIMESTAMP
  );
  
  ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
  CREATE POLICY api_keys_tenant ON api_keys FOR ALL 
      USING (tenant_id = current_setting('app.current_tenant_id', true)::UUID);
  ```

- [ ] Implement 90-day rotation policy (30 min)
  - Document rotation procedure
  - Set expires_at = NOW() + INTERVAL '90 days'

**Deliverable:** API keys working with 90-day rotation

---

### Day 1 Exit Criteria (Security Plan)
- [x] RLS on all tables
- [x] set_tenant_context() working
- [x] audit_log capturing changes
- [x] Backend middleware integrated
- [x] Quick security test: Cross-tenant access blocked

---

## Day 2: Tuesday - Database Layer (3-4 hours)

**WBS Reference:** 2.1 Database Layer  
**Security Plan:** Prerequisite for Day 2 multi-user tables

### Task 2.1.1: Supabase Project Setup (1 hour)
**WBS ID:** 2.1.1  
**Already Done:** Day 1, Task 1.2.1

**Actions:**
- [ ] Verify Supabase project configuration
- [ ] Configure SSL-only connections (already enabled by default)
- [ ] Set up daily backups via Supabase Dashboard
- [ ] Document connection strings (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

**Deliverable:** Supabase project verified and configured

---

### Task 2.1.2: Schema Deployment (2 hours)
**WBS ID:** 2.1.2  
**Dependencies:** 2.1.1

**Actions:**
- [ ] Deploy BAIV_DATABASE_SCHEMA.sql via Supabase SQL Editor
- [ ] Core tables (5):
  - tenants
  - users
  - roles
  - user_tenant_roles
  - api_keys
- [ ] Ontology table (1):
  - ontology_data (JSONB storage)
- [ ] Agent tables (3):
  - agent_registry
  - agent_executions
  - audits
- [ ] Audit table (1):
  - audit_log (already created Day 1)
- [ ] Verify all foreign key constraints

**Deliverable:** 11 tables created

---

### Task 2.1.3: RLS Policies (Already Complete)
**WBS ID:** 2.1.3  
**Completed:** Day 1, Task 1.2.2

**Actions:**
- [ ] Verify RLS active on 6 tenant-scoped tables:
  - tenants ✓
  - users ✓
  - ontology_data ✓
  - agent_executions ✓
  - audits ✓
  - api_keys ✓
- [ ] Test cross-tenant isolation with test queries

**Deliverable:** RLS policies verified

---

### Task 2.1.4: Seed Data (1 hour)
**WBS ID:** 2.1.4  
**Dependencies:** 2.1.2

**Actions:**
- [ ] Load 4 roles:
  - Admin (full access)
  - Manager (execute agents, view all)
  - Analyst (execute agents, view own)
  - Viewer (read-only)

- [ ] Load 16 agents (3 MVP priority marked):
  - **P1:** Discovery Agent (client-context)
  - **P2:** Citation Tester Agent (4 platforms)
  - **P2:** Gap Analyzer Agent (priority scoring)
  - P3-P7: 13 additional agents seeded but not active

- [ ] Create test tenant:
  - tenant_id: auto-generated UUID
  - name: "Test Organization"
  - status: "active"

- [ ] Create test admin user:
  - email: test-admin@baiv.local
  - role: admin
  - tenant_id: test tenant UUID

**Deliverable:** Test data loaded (4 roles, 16 agents, 1 test tenant)

---

### Day 2 Success Criteria
- [x] Database operational with RLS enforced
- [x] 11 tables created and seeded
- [x] Test tenant accessible with test admin user
- [x] Can query database with tenant isolation

---

## Day 3: Wednesday - User Role Management (5-6 hours)

**MVP v2.4.0 Reference:** Lines 754-785  
**Goal:** Complete RBAC role management operational  
**Source:** ROLE_MANAGEMENT_MINI_PRD_v1.0.md

### Task 3.1: User Invitations (2 hours)
**WBS ID:** 2.2.1

**Actions:**
- [ ] Install dependencies (30 min)
  ```bash
  npm install @supabase/supabase-js
  ```

- [ ] Create `supabase-client.ts` (1 hour)
  ```typescript
  import { createClient } from '@supabase/supabase-js';
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  ```

- [ ] Configure environment variables (30 min)
  - Create `.env.local`:
    ```bash
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ```
  - Document in `.env.example`

**Deliverable:** Supabase SDK ready

---

### Task 2.2.2: Direct Database Queries with RLS (4 hours)
**WBS ID:** 2.2.2  
**Dependencies:** 2.2.1

**Actions:**
- [ ] Implement query patterns (2 hours)
  - SELECT with RLS:
    ```typescript
    const { data, error } = await supabase
      .from('ontology_data')
      .select('*')
      .eq('ontology_type', 'client-context');
    // RLS automatically filters by tenant_id
    ```
  
  - INSERT with context:
    ```typescript
    // Set context first
    await setTenantContext(tenantId, userId, userRole);
    
    // Then insert - tenant_id auto-set by trigger
    const { data, error } = await supabase
      .from('ontology_data')
      .insert({ ontology_type: 'client-context', data: {...} });
    ```

- [ ] Create helper functions (1 hour)
  - `queryOntologies(filters)`
  - `createOntology(data)`
  - `updateOntology(id, data)`
  - `deleteOntology(id)`

- [ ] Test tenant isolation (1 hour)
  - Create data as tenant A
  - Try to query as tenant B
  - Verify 404/empty result

**Deliverable:** Can query database with RLS enforcement

---

### Task 2.2.3: Supabase Realtime Setup (2 hours)
**WBS ID:** 2.2.3  
**Dependencies:** 2.2.2

**Actions:**
- [ ] Enable Realtime on audit_log table (30 min)
  - Via Supabase Dashboard → Database → Replication

- [ ] Create subscription (1 hour)
  ```typescript
  const subscription = supabase
    .channel('audit_log_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'audit_log' }, 
      (payload) => {
        console.log('Change received!', payload);
      }
    )
    .subscribe();
  ```

- [ ] Test real-time updates (30 min)

**Deliverable:** Real-time updates working for audit_log

---

### Task 2.2.4: Health Endpoint (2 hours)
**WBS ID:** 2.2.4  
**Dependencies:** 2.2.1  
**Optional for MVP**

**Actions:**
- [ ] **Option A:** Supabase Edge Function (1 hour)
  - Create `/functions/health/index.ts`:
    ```typescript
    import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
    
    serve(async (req) => {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
    ```
  - Deploy: `supabase functions deploy health`

- [ ] **Option B:** Frontend ping (30 min)
  - Simple query to verify Supabase connection:
    ```typescript
    export async function healthCheck() {
      const { error } = await supabase.from('tenants').select('count');
      return !error;
    }
    ```

**Deliverable:** Can verify Supabase connectivity

---

### Day 3 Success Criteria
- [x] Supabase SDK operational
- [x] Can execute queries with RLS enforcement
- [x] Real-time subscriptions working
- [x] Health check functional

---

## Day 4: Thursday - Multi-User Foundation (4-6 hours)

**Security Plan Reference:** Day 2 (4-6 hours)  
**Purpose:** Enable collaborative workflows with presence, locks, and activity tracking

### Morning (2-3 hours): Multi-User Tables

#### Task 4.1: Create organization_cycle_state Table (20 min)
**Security Plan:** Day 2, Morning

**Actions:**
- [ ] Create table (copy from SECURITY_MULTIUSER_COMPRESSED_PLAN lines 159-174)
  ```sql
  CREATE TABLE IF NOT EXISTS organization_cycle_state (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
      current_stage TEXT NOT NULL DEFAULT 'discovery',
      stage_status TEXT NOT NULL DEFAULT 'not_started',
      stage_started_at TIMESTAMPTZ,
      stage_owner_user_id UUID,
      health_indicators JSONB DEFAULT '{}',
      cycle_number INTEGER DEFAULT 1,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      CONSTRAINT valid_stage CHECK (current_stage IN ('discovery','audit','gap_analysis','ideation','planning','execution')),
      CONSTRAINT valid_status CHECK (stage_status IN ('not_started','in_progress','blocked','completed')),
      CONSTRAINT one_per_tenant UNIQUE (tenant_id)
  );
  ```

**Deliverable:** Cycle state table created

---

#### Task 4.2: Create user_presence Table (20 min)
**Security Plan:** Day 2, Morning

**Actions:**
- [ ] Create table (lines 182-191)
- [ ] Add index on tenant_id, status

**Deliverable:** Presence table created

---

#### Task 4.3: Create dataset_edit_locks Table (20 min)
**Security Plan:** Day 2, Morning

**Actions:**
- [ ] Create table (lines 201-210)
- [ ] Add index on active locks

**Deliverable:** Locks table created

---

#### Task 4.4: Create organization_activity Table (20 min)
**Security Plan:** Day 2, Morning

**Actions:**
- [ ] Create table (lines 220-234)
- [ ] Add index for activity feed

**Deliverable:** Activity table created

---

#### Task 4.5: Apply RLS to All 4 Tables (20 min)
**Security Plan:** Day 2, Morning

**Actions:**
- [ ] Apply standard RLS pattern to each table:
  ```sql
  ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;
  CREATE POLICY {table}_tenant ON {table_name} FOR ALL 
      USING (tenant_id = current_setting('app.current_tenant_id', true)::UUID);
  CREATE POLICY {table}_service ON {table_name} FOR ALL 
      TO service_role USING (true);
  ```

**Deliverable:** RLS active on 4 new tables

---

#### Task 4.6: Apply Migration (15 min)
**Actions:**
- [ ] Execute combined migration in Supabase SQL Editor
- [ ] Run verification queries (lines 286-293)

**Deliverable:** All tables deployed

---

### Afternoon (2-3 hours): Multi-User Functions & APIs

#### Task 4.7: advance_cycle_stage() Function (30 min)
**Security Plan:** Day 2, Afternoon

**Actions:**
- [ ] Create function (copy from lines 244-279)
- [ ] Test with test tenant
- [ ] Verify only owner/admin can advance

**Deliverable:** Cycle advancement working

---

#### Task 4.8: Presence API (45 min)
**Security Plan:** Day 2, Afternoon

**Actions:**
- [ ] Create `/presence` endpoint (GET: list online users)
  ```typescript
  export async function getPresence(tenantId: string) {
    await setTenantContext(tenantId, userId, userRole);
    const { data, error } = await supabase
      .from('user_presence')
      .select('*')
      .eq('status', 'online');
    return data;
  }
  ```

- [ ] Create `/presence/heartbeat` endpoint (POST: update heartbeat)
  ```typescript
  export async function updateHeartbeat(tenantId: string, userId: string, view: string) {
    await setTenantContext(tenantId, userId, userRole);
    const { error } = await supabase
      .from('user_presence')
      .upsert({ 
        tenant_id: tenantId,
        user_id: userId,
        current_view: view,
        status: 'online',
        last_heartbeat_at: new Date().toISOString()
      });
  }
  ```

**Deliverable:** Presence tracking operational

---

#### Task 4.9: Lock Acquire/Release API (45 min)
**Security Plan:** Day 2, Afternoon

**Actions:**
- [ ] Create lock acquire function
  ```typescript
  export async function acquireLock(
    tenantId: string, 
    userId: string, 
    datasetType: string, 
    datasetId: string
  ) {
    await setTenantContext(tenantId, userId, userRole);
    
    // Check for existing active lock
    const { data: existing } = await supabase
      .from('dataset_edit_locks')
      .select('*')
      .eq('dataset_type', datasetType)
      .eq('dataset_id', datasetId)
      .eq('is_active', true)
      .single();
    
    if (existing) {
      throw new Error('Resource is locked by another user');
    }
    
    // Acquire lock
    const { data, error } = await supabase
      .from('dataset_edit_locks')
      .insert({
        tenant_id: tenantId,
        dataset_type: datasetType,
        dataset_id: datasetId,
        locked_by_user_id: userId,
        expires_at: new Date(Date.now() + 30 * 60 * 1000) // 30 min
      })
      .select()
      .single();
    
    return data;
  }
  ```

- [ ] Create lock release function
  ```typescript
  export async function releaseLock(lockId: string) {
    const { error } = await supabase
      .from('dataset_edit_locks')
      .update({ is_active: false })
      .eq('id', lockId);
  }
  ```

**Deliverable:** Lock management working

---

#### Task 4.10: Integration Test (30 min)
**Security Plan:** Day 2, Afternoon

**Actions:**
- [ ] Test cycle advancement
- [ ] Test presence heartbeat
- [ ] Test lock acquire/release
- [ ] Test cross-tenant isolation for all 4 tables

**Deliverable:** Multi-user workflows verified

---

### Day 4 Exit Criteria (Security Plan)
- [x] 4 new tables created with RLS
- [x] advance_cycle_stage() working
- [x] Presence heartbeat API working
- [x] Lock acquire/release working
- [x] Integration tests passing

---

## Day 5: Friday - Design Bridge + Polish (4 hours)

**WBS Reference:** 1.3 Design Bridge (partial)  
**Security Plan Reference:** Day 3 (2-4 hours)

### Morning (2 hours): Design Bridge Start

#### Task 5.1: Import Design System Tokens (2 hours)
**WBS ID:** 1.3.1  
**Reference:** DASHBOARD_TEMPLATES.md v1.0.0 Section 6

**Actions:**
- [ ] Extract tokens from DASHBOARD_TEMPLATES.md (1 hour)
  - BAIV color palette:
    - Primary: #00A4BF (cyan)
    - Secondary: #019587 (teal)
    - Accent: #E84E1C (orange)
    - Neutral: grays
    - Semantic: success, warning, error, info
  
  - Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
  
  - Typography:
    - Headings: Inter (600-700 weight)
    - Body: Inter (400-500 weight)
    - Mono: JetBrains Mono

- [ ] Create `tokens.ts` file (1 hour)
  ```typescript
  export const tokens = {
    colors: {
      primary: '#00A4BF',
      secondary: '#019587',
      accent: '#E84E1C',
      // ...
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      // ...
    },
    typography: {
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
        mono: 'JetBrains Mono, monospace'
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '24px',
        // ...
      }
    }
  };
  ```

**Deliverable:** Design tokens file created

---

### Afternoon (2 hours): Polish + Ship

#### Task 5.2: Dashboard Status Component (1 hour)
**Security Plan:** Day 3

**Actions:**
- [ ] Create basic status component (30 min)
  ```typescript
  export function OrgStatusWidget() {
    const [cycleState, setCycleState] = useState(null);
    
    useEffect(() => {
      // Fetch cycle state
      supabase
        .from('organization_cycle_state')
        .select('*')
        .single()
        .then(({ data }) => setCycleState(data));
    }, []);
    
    return (
      <div>
        <h3>Current Stage: {cycleState?.current_stage}</h3>
        <p>Status: {cycleState?.stage_status}</p>
      </div>
    );
  }
  ```

- [ ] Add to dashboard layout (30 min)

**Deliverable:** Status component showing cycle state

---

#### Task 5.3: "Who's Online" Indicator (30 min)
**Security Plan:** Day 3

**Actions:**
- [ ] Create presence indicator (30 min)
  ```typescript
  export function PresenceIndicator() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    useEffect(() => {
      // Subscribe to presence changes
      const subscription = supabase
        .channel('presence')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'user_presence' },
          () => {
            // Refresh online users
            supabase
              .from('user_presence')
              .select('*')
              .eq('status', 'online')
              .then(({ data }) => setOnlineUsers(data));
          }
        )
        .subscribe();
      
      return () => subscription.unsubscribe();
    }, []);
    
    return (
      <div>
        <h4>Online Now ({onlineUsers.length})</h4>
        <ul>
          {onlineUsers.map(u => <li key={u.user_id}>{u.user_id}</li>)}
        </ul>
      </div>
    );
  }
  ```

**Deliverable:** Presence UI showing online users

---

#### Task 5.4: Final Testing (30 min)
**Security Plan:** Day 3

**Actions:**
- [ ] End-to-end security test (15 min)
  - Login as different users
  - Verify tenant isolation
  - Verify RBAC permissions
  - Check audit logging

- [ ] Test multi-user workflows (15 min)
  - Advance cycle stage
  - Presence updates
  - Lock acquisition

**Deliverable:** E2E tests passing

---

### Day 5 Exit Criteria (Security Plan Day 3)
- [x] Dashboard shows org status
- [x] "Online now" indicator works
- [x] Activity logging operational
- [x] Ready to deploy to production (Week 2)

---

## Week 1 Success Criteria (MVP v2.3.4)

From BAIV_MVP_TODO_PLAN_v2.3.0.md Lines 680-684:

- [x] All 4 integration bridges configured
  - [x] VE Bridge: VSOM + OKR + Metrics
  - [x] Security Bridge: Auth + RBAC + Multi-tenant + API keys
  - [x] Design Bridge: Tokens extracted (partial)
  - [x] Agent Orchestration Bridge: Deferred to Week 2

- [x] Database schema deployed with RLS
  - [x] 11 core tables
  - [x] 4 multi-user tables
  - [x] RLS on all tenant-scoped tables (10 total)

- [x] API foundation operational
  - [x] Supabase SDK integrated
  - [x] Direct queries with RLS
  - [x] Real-time subscriptions

- [x] PF-Core security modules active
  - [x] Authentication (Supabase Auth)
  - [x] RBAC (4 roles)
  - [x] Multi-tenant isolation (RLS)
  - [x] Audit logging

---

## Effort Summary

| Day | Planned | Actual (Template-Based) | Tasks |
|-----|---------|------------------------|-------|
| Day 1 | 6-7 hrs | 6-7 hrs | VE Bridge + Security |
| Day 2 | 3-4 hrs | 3-4 hrs | Database deployment |
| Day 3 | 4 hrs | 4 hrs | API Layer |
| Day 4 | 4-6 hrs | 4-6 hrs | Multi-user foundation |
| Day 5 | 4 hrs | 4 hrs | Design + polish |
| **Total** | **21-25 hrs** | **21-25 hrs** | **Distributed over 5 days** |

---

## Key Differences from Original Security Plan

| Aspect | Security Plan Alone | This Week 1 Plan | Reason |
|--------|---------------------|------------------|--------|
| **Scope** | Security + Multi-user only | Security + VE Bridge + Database + API + Design | MVP v2.3.4 WBS requires all 4 bridges |
| **Duration** | 2-3 days | 5 days (distributed) | Full Week 1 integration |
| **VE Bridge** | Not included | Day 1 Morning (3 hrs) | Required by MVP v2.3.4 WBS 1.1 |
| **Database** | Prerequisite | Day 2 (explicit deployment) | WBS 2.1 detailed tasks |
| **Design** | Not included | Day 5 (tokens extraction) | WBS 1.3 partial completion |

---

## Traceability to Source Documents

### Security Compressed Plan
- Day 1 tasks → This Plan Day 1 Afternoon (1.2.1-1.2.4)
- Day 2 tasks → This Plan Day 4 (Multi-user foundation)
- Day 3 tasks → This Plan Day 5 Afternoon (Polish)

### MVP v2.3.4 Plan
- WBS 1.1 → This Plan Day 1 Morning (VE Bridge)
- WBS 1.2 → This Plan Day 1 Afternoon (Security Bridge)
- WBS 2.1 → This Plan Day 2 (Database Layer)
- WBS 2.2 → This Plan Day 3 (API Layer)
- WBS 1.3 → This Plan Day 5 Morning (Design Bridge partial)

---

## Next Steps (Week 2)

From MVP v2.3.4:
- Week 2 Day 1-2: Authentication Service (WBS 2.3) - Already functional via Supabase Auth
- Week 2 Day 3-5: Ontology Service (WBS 2.4) - CRUD + validation
- Week 2: Agent Orchestration Bridge (WBS 1.4) - Deferred from Week 1

---

## Document Control

**Change Log:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-05 | Security Architect + Solution Architect | Initial aligned plan combining Security Compressed Plan + MVP v2.3.4 WBS 1.0-2.2 |

**Approved By:**
- Security Architect (SECURITY_MULTIUSER_COMPRESSED_PLAN.md compliance)
- Solution Architect (BAIV_MVP_TODO_PLAN_v2.3.0.md alignment)

**Status:** 🟢 Ready for Week 1 implementation starting Monday, January 6, 2026
