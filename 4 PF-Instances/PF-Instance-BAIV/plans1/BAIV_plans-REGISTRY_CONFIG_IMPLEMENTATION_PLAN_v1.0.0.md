# BAIV Registry Configuration Implementation Plan v1.0.0
**Database + API + CI/CD Integration**

**Version:** 1.0.0  
**Document Type:** Implementation Plan (PRD-PBS-WBS)  
**Status:** Ready for Execution  
**Created:** 2026-01-01  
**Purpose:** Implement Unified Registry infrastructure (database tables, API, CI/CD sync)

---

## 1. PRD: Product Requirements

### 1.1 Product Vision

**Objective:**
Implement complete Unified Registry infrastructure to support agent/ontology/data contract registration, dependency resolution, and orchestration control.

**Scope:**
- Supabase database tables for registry metadata
- Registry CRUD API endpoints
- Git → Registry synchronization (CI/CD)
- Validation and dependency resolution engine

### 1.2 Functional Requirements

**FR1: Registry Database Schema**
- `unified_registry` table (agents, ontologies, contracts)
- `data_contracts` table (input/output schemas)
- `orchestration_dependencies` table (agent dependencies)
- `registry_audit_log` table (change tracking)

**FR2: Registry API**
- CRUD operations for registry entries
- Dependency resolution queries
- Contract validation endpoints
- Version compatibility checking

**FR3: Git/Registry Sync**
- GitHub Action for automatic registration on tag push
- PRD metadata extraction
- Registry validation before merge
- Rollback support

---

## 2. PBS: Product Breakdown Structure

```
Registry Configuration
├── 1.0 Database Schema
│   ├── 1.1 unified_registry table
│   ├── 1.2 data_contracts table
│   ├── 1.3 orchestration_dependencies table
│   └── 1.4 registry_audit_log table
├── 2.0 Registry API
│   ├── 2.1 CRUD endpoints
│   ├── 2.2 Query endpoints
│   └── 2.3 Validation engine
└── 3.0 CI/CD Integration
    ├── 3.1 GitHub Action workflow
    ├── 3.2 Metadata extractor
    └── 3.3 Registry sync pipeline
```

---

## 3. WBS: Work Breakdown Structure

| WBS ID | Task | Duration | Priority | Owner |
|--------|------|----------|----------|-------|
| **1.0** | **Database Schema** | **2 hours** | **P0** | DevOps |
| **2.0** | **Registry API** | **4 hours** | **P0** | Backend Dev |
| **3.0** | **CI/CD Integration** | **3 hours** | **P0** | DevOps |
| **4.0** | **Testing** | **3 hours** | **P0** | QA |
| **Total** | | **12 hours (1.5 days)** | | |

### 3.1 WBS 1.0: Database Schema (2 hours)

| Task | Duration | Deliverable |
|------|----------|-------------|
| 1.1 unified_registry table (id, type, name, version, metadata, dependencies, status) | 30 min | Table created |
| 1.2 data_contracts table (contract_id, schema, consumers, compatibility_matrix) | 30 min | Table created |
| 1.3 orchestration_dependencies table (agent_id, upstream_id, execution_order) | 30 min | Table created |
| 1.4 registry_audit_log table (action, actor, timestamp, changes) | 30 min | Table created |

### 3.2 WBS 2.0: Registry API (4 hours)

| Task | Duration | Deliverable |
|------|----------|-------------|
| 2.1 CRUD endpoints (create, read, update, delete registry entries) | 2 hours | API working |
| 2.2 Query endpoints (getAgent, getOntology, validateContract, resolveDeps) | 1.5 hours | Queries working |
| 2.3 Validation engine (schema validation, dependency checking) | 30 min | Validation working |

### 3.3 WBS 3.0: CI/CD Integration (3 hours)

| Task | Duration | Deliverable |
|------|----------|-------------|
| 3.1 GitHub Action (.github/workflows/registry-sync.yml) | 1 hour | Workflow created |
| 3.2 Metadata extractor (parse agent PRD, extract metadata) | 1 hour | Extractor working |
| 3.3 Registry sync pipeline (validate, publish, notify) | 1 hour | Sync working |

---

## 4. Database Schema

### 4.1 unified_registry table
```sql
CREATE TABLE unified_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id TEXT UNIQUE NOT NULL, -- e.g., baiv-agent-discovery-v1.1.0
  type TEXT NOT NULL CHECK (type IN ('agent', 'ontology', 'data_contract')),
  name TEXT NOT NULL,
  version TEXT NOT NULL, -- semantic version
  metadata JSONB NOT NULL,
  dependencies JSONB, -- array of {type, id, version_range, required}
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'registered', 'active', 'deprecated')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  tenant_id UUID REFERENCES tenants(id)
);

CREATE INDEX idx_unified_registry_entry_id ON unified_registry(entry_id);
CREATE INDEX idx_unified_registry_type ON unified_registry(type);
CREATE INDEX idx_unified_registry_status ON unified_registry(status);
```

### 4.2 data_contracts table
```sql
CREATE TABLE data_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id TEXT UNIQUE NOT NULL, -- e.g., baiv-discovery-output-v1.0.0
  registry_entry_id UUID REFERENCES unified_registry(id),
  schema JSONB NOT NULL, -- JSON Schema
  consumers TEXT[], -- array of agent IDs
  compatibility_matrix JSONB, -- compatible versions
  created_at TIMESTAMPTZ DEFAULT NOW(),
  tenant_id UUID REFERENCES tenants(id)
);
```

### 4.3 orchestration_dependencies table
```sql
CREATE TABLE orchestration_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL, -- e.g., baiv-agent-citation-tester-v1.1.0
  upstream_agent_id TEXT, -- e.g., baiv-agent-discovery-v1.1.0
  relationship TEXT CHECK (relationship IN ('provides_input', 'consumes_output')),
  data_contract_id TEXT,
  execution_order INT,
  required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  tenant_id UUID REFERENCES tenants(id)
);
```

---

## 5. API Endpoints

### 5.1 CRUD Operations
- `POST /api/registry` - Register new entry
- `GET /api/registry/:entry_id` - Get entry by ID
- `PUT /api/registry/:entry_id` - Update entry
- `DELETE /api/registry/:entry_id` - Delete/deprecate entry

### 5.2 Query Operations
- `GET /api/registry/agents/:id/:version` - Get agent metadata
- `GET /api/registry/ontologies/:id/:version` - Get ontology
- `POST /api/registry/validate-contract` - Validate contract
- `GET /api/registry/resolve-deps/:agent_id` - Resolve dependency graph

---

## 6. CI/CD Workflow

### 6.1 GitHub Action Trigger
```yaml
on:
  push:
    tags:
      - 'baiv-agent-*-v*.*.*'
```

### 6.2 Workflow Steps
1. Extract metadata from agent PRD
2. Validate against template v2.1.0
3. Check dependency conflicts
4. Publish to Unified Registry
5. Trigger dependency impact analysis
6. Notify affected agents

---

## 7. Implementation Timeline

**Day 1 (2 hours): Database Schema**
- Create all 4 tables in Supabase
- Configure RLS policies
- Test CRUD operations

**Day 2 (4 hours): Registry API**
- Implement CRUD endpoints
- Implement query endpoints
- Build validation engine

**Day 3 (3 hours): CI/CD Integration**
- Create GitHub Action
- Build metadata extractor
- Test end-to-end sync

**Day 4 (3 hours): Testing**
- Unit tests for API
- Integration tests for sync
- Performance tests

---

**Document Version:** 1.0.0  
**Status:** Ready for Execution  
**Estimated Duration:** 1.5 days (12 hours)  
**Next Action:** Begin WBS 1.0 (Database Schema)  
**Last Updated:** 2026-01-01

**Co-Authored-By:** Warp <agent@warp.dev>
