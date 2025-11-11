# Migration Guide: Single Instance → Multi-Instance Architecture

**Purpose:** Transition from "BAIV-only" thinking to "Platform Foundation + Multiple Instances" architecture

**Timeline:** 1 week (Phase 1)

---

## 🎯 WHAT CHANGED

### Before (Single Instance):
```
BAIV Application
  ├── CRM (BAIV-specific)
  ├── Navigation (BAIV-specific)
  ├── Agents (BAIV-specific)
  └── RRF Analysis (BAIV-specific)

Problem: Can't reuse code for W4M or AIR
```

### After (Multi-Instance):
```
Platform Foundation (PF-CORE)
  ├── CRM (shared by all)
  ├── Navigation (shared by all)
  ├── Agents (shared by all)
  └── Security (shared by all)

BAIV Instance (extends PF-CORE)
  ├── RRF Analysis (BAIV-only)
  ├── Content Planning (BAIV-only)
  └── Dashboard (BAIV-only)

W4M Instance (extends PF-CORE)
  ├── Workflow Builder (W4M-only)
  ├── Task Management (W4M-only)
  └── Integrations (W4M-only)

AIR Instance (extends PF-CORE)
  ├── Paper Analysis (AIR-only)
  ├── Citation Graph (AIR-only)
  └── Knowledge Graph (AIR-only)

Benefit: Shared platform → faster instance creation
```

---

## 📋 MIGRATION CHECKLIST

### Step 1: Audit Current Code (2 hours)

**Goal:** Identify what's shared vs instance-specific

**Process:**
```bash
# For each file/component, ask:
# Q1: Is this used by BAIV only? Or would W4M/AIR also need it?
# Q2: Is this industry-specific (business AI)? Or generic (CRM, Security)?

# Example audit:
/components/CRMManager.tsx
  Q1: W4M and AIR also need CRM → SHARED (move to platform)
  Q2: Generic CRM functionality → SHARED
  Decision: Move to /components/platform/crm/

/components/RRFAnalyzer.tsx
  Q1: Only BAIV uses Milana's RRF algorithm → BAIV-ONLY
  Q2: Business AI-specific → BAIV-ONLY
  Decision: Move to /components/instances/baiv/rrr/

/components/NavigationInventory.tsx
  Q1: W4M and AIR need navigation → SHARED
  Q2: Generic navigation → SHARED
  Decision: Move to /components/platform/navigation/

/components/AgentManager.tsx
  Q1: All instances use 29 agents → SHARED
  Q2: Generic orchestration → SHARED
  Decision: Move to /components/platform/agents/
```

**Create Audit Spreadsheet:**
```
| Component | Shared? | Move To | Notes |
|-----------|---------|---------|-------|
| CRMManager | YES | /components/platform/crm/ | All instances need CRM |
| RRFAnalyzer | NO | /components/instances/baiv/rrr/ | BAIV-only algorithm |
| NavigationInventory | YES | /components/platform/navigation/ | All instances need nav |
| ... | ... | ... | ... |
```

---

### Step 2: Create New Directory Structure (1 hour)

**Goal:** Set up multi-instance file organization

**Actions:**
```bash
# Create platform directory
mkdir -p components/platform/crm
mkdir -p components/platform/security
mkdir -p components/platform/navigation
mkdir -p components/platform/agents
mkdir -p components/platform/program

# Create instance directories
mkdir -p components/instances/baiv/types
mkdir -p components/instances/baiv/rrr
mkdir -p components/instances/baiv/content
mkdir -p components/instances/baiv/dashboard
mkdir -p components/instances/baiv/config

mkdir -p components/instances/w4m/types
mkdir -p components/instances/w4m/workflows
mkdir -p components/instances/w4m/tasks
mkdir -p components/instances/w4m/integrations
mkdir -p components/instances/w4m/config

mkdir -p components/instances/air/types
mkdir -p components/instances/air/papers
mkdir -p components/instances/air/citations
mkdir -p components/instances/air/knowledge
mkdir -p components/instances/air/config

# Create instance docs
mkdir -p docs/instances/baiv
mkdir -p docs/instances/w4m
mkdir -p docs/instances/air
```

---

### Step 3: Move Shared Code to Platform (4 hours)

**Goal:** Extract shared components into PF-CORE

**Process:**

**3a. Move CRM Components (1 hour)**
```bash
# Move files
mv components/crm/* components/platform/crm/

# Update imports in all files
# FROM: import { CRMManager } from './crm/CRMManager'
# TO:   import { CRMManager } from './platform/crm/CRMManager'
```

**3b. Move Security Components (30 min)**
```bash
mv components/security/* components/platform/security/
# Update imports
```

**3c. Move Navigation Components (1 hour)**
```bash
mv components/navigation/* components/platform/navigation/
mv components/instances/NavigationInventory.tsx components/platform/navigation/
# Update imports
```

**3d. Move Agent Components (1 hour)**
```bash
mv components/agents/* components/platform/agents/
# Update imports
```

**3e. Move Program Manager Components (30 min)**
```bash
mv components/program/* components/platform/program/
# Update imports
```

---

### Step 4: Move Instance-Specific Code (2 hours)

**Goal:** Isolate BAIV-specific features

**Process:**

**4a. Create BAIV Types (30 min)**
```typescript
// components/instances/baiv/types/baiv.types.ts

import { Organization } from '@/utils/types/platform.types'; // Import from platform

// BAIV-specific extensions
export interface BAIVOrganization extends Organization {
  rrr_score: number;
  ai_visibility_score: number;
  gap_priority: 'high' | 'medium' | 'low';
  last_analysis_date: string;
}

export interface RRFAnalysis {
  organization_id: string;
  reach_score: number;
  revenue_score: number;
  referability_score: number;
  reputation_score: number;
  relationships_score: number;
  overall_score: number;
  gaps: Gap[];
}

export interface ContentPlan {
  id: string;
  organization_id: string;
  articles: Article[];
  seo_keywords: string[];
  publish_schedule: Date[];
}
```

**4b. Move RRF Components (30 min)**
```bash
# Identify RRF-related components
# Move to BAIV instance directory
mv components/RRFAnalyzer.tsx components/instances/baiv/rrr/
mv components/GapAnalyzer.tsx components/instances/baiv/rrr/
# Update imports
```

**4c. Move Content Planning Components (30 min)**
```bash
mv components/ContentPlanner.tsx components/instances/baiv/content/
mv components/SEOAnalyzer.tsx components/instances/baiv/content/
# Update imports
```

**4d. Move Dashboard Components (30 min)**
```bash
mv components/AIVisibilityDashboard.tsx components/instances/baiv/dashboard/
mv components/ExecutiveScorecard.tsx components/instances/baiv/dashboard/
# Update imports
```

---

### Step 5: Add Instance Scoping to Database (3 hours)

**Goal:** Add `pf_instance_id` column to all shared tables

**5a. Create Migration SQL (1 hour)**
```sql
-- /supabase/migrations/add_instance_scoping.sql

-- Add pf_instance_id to organizations
ALTER TABLE organizations_d98fefbb
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

-- Backfill existing data (assume all existing data is BAIV)
UPDATE organizations_d98fefbb
  SET pf_instance_id = 'baiv'
  WHERE pf_instance_id IS NULL;

-- Add index for fast filtering
CREATE INDEX IF NOT EXISTS idx_orgs_instance 
  ON organizations_d98fefbb(pf_instance_id);

-- Add pf_instance_id to individuals
ALTER TABLE individuals_d98fefbb
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

UPDATE individuals_d98fefbb
  SET pf_instance_id = 'baiv'
  WHERE pf_instance_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_individuals_instance 
  ON individuals_d98fefbb(pf_instance_id);

-- Add pf_instance_id to navigation_table
ALTER TABLE navigation_table
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

UPDATE navigation_table
  SET pf_instance_id = 'baiv'
  WHERE pf_instance_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_nav_instance 
  ON navigation_table(pf_instance_id);

-- Add pf_instance_id to program_epics (if exists)
ALTER TABLE program_epics
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

-- Add pf_instance_id to program_features (if exists)
ALTER TABLE program_features
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

-- Add pf_instance_id to program_stories (if exists)
ALTER TABLE program_stories
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

-- Add pf_instance_id to ai_sessions (if exists)
ALTER TABLE ai_sessions
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

-- Add pf_instance_id to ai_messages (if exists)
ALTER TABLE ai_messages
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';

-- Add pf_instance_id to agents (if exists)
ALTER TABLE agents
  ADD COLUMN IF NOT EXISTS pf_instance_id TEXT NOT NULL DEFAULT 'baiv';
```

**5b. Run Migration (15 min)**
```bash
# Go to Supabase Dashboard → SQL Editor
# Paste and run add_instance_scoping.sql
# Verify columns added:
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'organizations_d98fefbb' AND column_name = 'pf_instance_id';
```

**5c. Update Queries (1.5 hours)**
```typescript
// Update all database queries to filter by instance

// BEFORE:
const { data } = await supabase
  .from('organizations_d98fefbb')
  .select('*');

// AFTER:
const instanceId = 'baiv'; // From user session or env var
const { data } = await supabase
  .from('organizations_d98fefbb')
  .select('*')
  .in('pf_instance_id', [instanceId, 'PF-CORE']); // Get instance + shared data
```

**Search and replace pattern:**
```bash
# Find all queries that need updating:
grep -r "\.from('organizations_d98fefbb')" components/
grep -r "\.from('navigation_table')" components/
# ... update each one
```

---

### Step 6: Create Instance Config Files (1 hour)

**Goal:** Isolate branding and terminology per instance

**6a. BAIV Config**
```typescript
// components/instances/baiv/config/branding.ts

export const baivBranding = {
  name: 'BAIV',
  fullName: 'Business AI Visibility',
  primaryColor: '#00a4bf',
  secondaryColor: '#0066ff',
  logo: '/logos/baiv-logo.svg',
  favicon: '/logos/baiv-favicon.ico',
};

export const baivTerminology = {
  organization: 'Organization',       // Not "Company"
  individual: 'Individual',           // Not "Contact"
  rrr: 'RRR Score',                  // BAIV-specific
  aiVisibility: 'AI Visibility Score', // BAIV-specific
};
```

**6b. W4M Config (placeholder)**
```typescript
// components/instances/w4m/config/branding.ts

export const w4mBranding = {
  name: 'W4M',
  fullName: 'Workflow for Me',
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  logo: '/logos/w4m-logo.svg',
  favicon: '/logos/w4m-favicon.ico',
};

export const w4mTerminology = {
  organization: 'Organization',
  individual: 'Team Member',
  workflow: 'Workflow',
  task: 'Task',
};
```

**6c. AIR Config (placeholder)**
```typescript
// components/instances/air/config/branding.ts

export const airBranding = {
  name: 'AIR',
  fullName: 'AI Research',
  primaryColor: '#10b981',
  secondaryColor: '#059669',
  logo: '/logos/air-logo.svg',
  favicon: '/logos/air-favicon.ico',
};

export const airTerminology = {
  organization: 'Research Institution',
  individual: 'Researcher',
  paper: 'Research Paper',
  citation: 'Citation',
};
```

---

### Step 7: Update Server Routes (2 hours)

**Goal:** Organize backend by platform vs instance

**7a. Group Platform Routes**
```typescript
// supabase/functions/server/index.tsx

// ======== PLATFORM ROUTES (PF-CORE) ========

// CRM
app.get('/make-server-d98fefbb/platform/crm/organizations', async (c) => {
  // Platform CRM logic
});

// Security
app.get('/make-server-d98fefbb/platform/security/roles', async (c) => {
  // Platform Security logic
});

// Navigation
app.get('/make-server-d98fefbb/platform/navigation/items', async (c) => {
  // Platform Navigation logic
});

// Agents
app.post('/make-server-d98fefbb/platform/agents/execute', async (c) => {
  // Platform Agent logic
});
```

**7b. Group Instance Routes**
```typescript
// ======== BAIV INSTANCE ROUTES ========

// RRF Analysis
app.post('/make-server-d98fefbb/baiv/rrr/analyze', async (c) => {
  // BAIV-specific RRF logic
});

// Content Planning
app.post('/make-server-d98fefbb/baiv/content/plan', async (c) => {
  // BAIV-specific Content Planning logic
});

// ======== W4M INSTANCE ROUTES ========

// Workflows
app.post('/make-server-d98fefbb/w4m/workflows/create', async (c) => {
  // W4M-specific Workflow logic
});

// Tasks
app.get('/make-server-d98fefbb/w4m/tasks', async (c) => {
  // W4M-specific Task logic
});

// ======== AIR INSTANCE ROUTES ========

// Papers
app.post('/make-server-d98fefbb/air/papers/analyze', async (c) => {
  // AIR-specific Paper Analysis logic
});

// Citations
app.get('/make-server-d98fefbb/air/citations/graph', async (c) => {
  // AIR-specific Citation Graph logic
});
```

---

### Step 8: Tag Platform Version (15 min)

**Goal:** Lock PF-CORE at v3.0.0

**Actions:**
```bash
# Create version marker
echo "3.0.0" > PF_CORE_VERSION.txt

# Create changelog
cat > CHANGELOG_PF_CORE.md << EOF
# Platform Foundation (PF-CORE) Changelog

## v3.0.0 (2025-10-28) - INITIAL MULTI-INSTANCE RELEASE

### Platform Modules:
- CRM System (organizations, individuals, relationships)
- Security Manager (RBAC, roles, permissions)
- Navigation System (dynamic menus, page registration)
- Agent Layer (29 orchestrated agents)
- Program Manager (goals, epics, features, stories)

### Database:
- Added pf_instance_id to all shared tables
- Instance scoping enabled (baiv, w4m, air, PF-CORE)

### Breaking Changes:
- All queries now require pf_instance_id filtering
- Components moved to /components/platform/
- Instance-specific code moved to /components/instances/

### Migration Guide:
See /MIGRATION_TO_MULTI_INSTANCE.md
EOF

# Git tag (if using git)
# git tag -a pf-core-v3.0.0 -m "Initial multi-instance platform release"
# git push origin pf-core-v3.0.0
```

---

## ✅ VERIFICATION CHECKLIST

After completing migration, verify:

### File Organization:
- [ ] All shared code in `/components/platform/`
- [ ] All BAIV code in `/components/instances/baiv/`
- [ ] Placeholder directories for W4M and AIR created
- [ ] Config files created for all instances

### Database:
- [ ] `pf_instance_id` column added to all shared tables
- [ ] Indexes created on `pf_instance_id` columns
- [ ] All existing data has `pf_instance_id = 'baiv'`
- [ ] Queries updated to filter by instance

### Server Routes:
- [ ] Platform routes organized under `/platform/*`
- [ ] BAIV routes organized under `/baiv/*`
- [ ] Placeholder routes for W4M and AIR

### Documentation:
- [ ] `PF_CORE_VERSION.txt` created
- [ ] `CHANGELOG_PF_CORE.md` created
- [ ] Instance docs directories created

### Testing:
- [ ] BAIV components still work (no broken imports)
- [ ] Database queries return correct data (filtered by instance)
- [ ] No "permission denied" errors
- [ ] Navigation still loads

---

## 🎯 WHAT'S NEXT

**After Migration:**
1. ✅ Platform locked at pf-core-v3.0.0
2. ✅ BAIV isolated in `/components/instances/baiv/`
3. ✅ Ready for W4M and AIR development!

**Week 2: Start Federated Development**
- Platform team: Improve shared CRM
- BAIV team: Build RRF module
- W4M team: Build Workflow Builder
- AIR team: Build Paper Analysis

**Week 7: First Multi-Instance Release**
- pf-core-v3.1.0 (monthly)
- baiv-v2.4.0 (bi-weekly)
- w4m-v1.0.0 (initial release)
- air-v1.0.0 (initial release)

---

## 🚨 COMMON ISSUES

### Issue 1: "Cannot find module '@/components/platform/crm'"
**Cause:** Imports not updated after moving files
**Fix:** Update imports:
```typescript
// BEFORE:
import { CRMManager } from '@/components/crm/CRMManager';

// AFTER:
import { CRMManager } from '@/components/platform/crm/CRMManager';
```

### Issue 2: "pf_instance_id column doesn't exist"
**Cause:** Migration SQL not run
**Fix:** Run `/supabase/migrations/add_instance_scoping.sql` in Supabase Dashboard

### Issue 3: "Query returns empty results"
**Cause:** Forgot to filter by `pf_instance_id`
**Fix:** Update query:
```typescript
const { data } = await supabase
  .from('organizations_d98fefbb')
  .select('*')
  .in('pf_instance_id', ['baiv', 'PF-CORE']); // Add this filter!
```

### Issue 4: "Server routes return 404"
**Cause:** Routes not updated to new paths
**Fix:** Update route paths:
```typescript
// BEFORE:
fetch('/api/crm/organizations')

// AFTER:
fetch('/make-server-d98fefbb/platform/crm/organizations')
```

---

## 📊 PROGRESS TRACKING

Use this to track your migration:

```
Step 1: Audit Code              [ ] Complete (2 hours)
Step 2: Create Directories      [ ] Complete (1 hour)
Step 3: Move Shared Code        [ ] Complete (4 hours)
Step 4: Move Instance Code      [ ] Complete (2 hours)
Step 5: Add Instance Scoping    [ ] Complete (3 hours)
Step 6: Create Configs          [ ] Complete (1 hour)
Step 7: Update Server Routes    [ ] Complete (2 hours)
Step 8: Tag Platform Version    [ ] Complete (15 min)

Total Time: ~15 hours (2 days)
```

---

**Status:** ✅ Ready to Execute

**Next:** Start with Step 1 (Audit Code) and work through sequentially!
