# BAIV MVP To-Do Plan v2.4.1

**PFC-PFI-BAIV Integrated Implementation Plan**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 2.4.1 |
| **Date** | January 5, 2026 |
| **Purpose** | Updated MVP To-Do Plan with Unified Security Foundation + Week 1 Detailed Plan |
| **Status** | 🟢 Active |
| **Timeline** | 6 weeks (Q1 2026) |
| **Audit Document** | BAIV_ARCHITECTURE_AUDIT_v1.0.md |
| **Corrections** | Database (Supabase), Auth (Supabase Auth), Deployment (Supabase + frontend hosting) |
| **New in v2.4.1** | Cross-referenced to BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md for detailed Week 1 implementation |
| **New in v2.4.0** | Week 1 replaced with Unified Security Foundation MVP (consolidated Auth + RLS + RBAC + Multi-user) |
| **New in v2.3.0** | Agent Template updated to Unified Template v3.0.0 (95% aligned) |
| **New in v2.2.0** | Unified Registry & Orchestration Bridge (agents + ontologies + data contracts) |
| **Base Documents** | BAIV_MVP_ROADMAP v1.0.0, PFC-PFI-BAIV_MODULE_CATALOG v1.0.0, ARCHITECTURE_MASTER.md v0.1.0, runtime-agentic-backend-architecture.md v1.0 |
| **Integration Pattern** | 4 Bridges (VE, Security, Design, Agent Orchestration) |
| **Agent Template** | PF-Core Unified Agent Specification Template v3.0.0 (14-Section + Appendices) |
| **Alignment Analysis** | BAIV_MVP_TEMPLATE_v3.0.0_ALIGNMENT_ANALYSIS.md |
| **Design/UI Specs** | DASHBOARD_TEMPLATES.md v1.0.0, PFC-DSN-Design-System, PFC-DSN-Component-Library |
| **Security Foundation** | UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md |
| **Week 1 Detailed Plan** | BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md |

---

## Change Control Note

**Version 2.4.1 Update - January 5, 2026 (Evening)**

**Change Summary:** Added cross-reference to detailed Week 1 implementation plan (BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md)

**Rationale:**
- Week 1 summary in this document (Lines 681-851) provides high-level overview
- New detailed plan provides task-by-task implementation guide with code samples
- Traceability matrix links both documents for complete Week 1 coverage
- Separation enables: (1) Executive view in this doc, (2) Developer implementation guide in separate doc

**Changes Made:**
1. **Line 7:** Version updated from 2.4.0 → 2.4.1
2. **Line 15:** Added new entry for v2.4.1 change
3. **Line 23:** Added reference to BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md
4. **Line 688:** Added cross-reference note at Week 1 start
5. This change control note added

**Week 1 Detailed Plan Coverage:**
- **Document:** `BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md` (1,019 lines)
- **Scope:** Day-by-day implementation with SQL migrations, TypeScript code samples, UI components
- **Traceability:** Maps to Lines 681-851 of this document
- **Key Sections:**
  - Day 1: Auth + RLS + Audit (6-7 hrs) - Detailed SQL for set_tenant_context(), audit_log, RLS policies
  - Day 2: Multi-user collaboration (5-6 hrs) - organization_cycle_state, user_presence, dataset_edit_locks
  - Day 3: User role management (5-6 hrs) - invite_user_to_tenant(), accept_invitation(), update_user_role()
  - Day 4: Team UI + Testing (4-5 hrs) - LoginPage, TeamSettingsPage, InviteUserDialog, RoleBadge components
  - Day 5: Buffer + Week 2 prep

**Benefit:**
- Developers can follow detailed step-by-step guide with copy-paste code
- Product owners can track progress via this high-level document
- Complete traceability between strategic plan and tactical implementation

**Approval:**
- **Author:** Solution Architect
- **Reviewed By:** Security Architect (traceability verified)
- **Status:** Approved - v2.4.1 adds implementation guide without changing Week 1 scope

---

**Version 2.4.0 Update - January 5, 2026**

**Change Summary:** Week 1 implementation replaced with Unified Security Foundation MVP (consolidated Auth + RLS + RBAC + Multi-user + Team Management + UI)

**Rationale:**
- Previous Week 1 had fragmented security implementation across 6 weeks (partial Auth on Day 1, partial RBAC on Day 3, etc.)
- Gap identified: No user-facing role management capabilities (invite users, assign roles, manage team members)
- New approach consolidates all PF-Core security modules into cohesive Week 1 foundation
- Integrates three source documents:
  - SECURITY_MULTIUSER_MVP_PRD_PBS_WBS.md (Auth + RLS + Multi-user foundation)
  - ROLE_MANAGEMENT_MINI_PRD_v1.0.md (RBAC + Team Management UI)
  - BAIV_MVP_TODO_PLAN_v2.3.0.md requirements (4-tier roles + 40+ permissions)

**Impact Assessment:**
- **Breaking Changes:** None - additive only to Week 1
- **Schedule Impact:** Week 1 now delivers complete security foundation (Auth + RLS + RBAC + Team UI)
- **Dependency Impact:** Weeks 2-6 unchanged, but benefit from complete security foundation on Day 1
- **Benefits:** 
  - All 4 PF-Core security modules operational by end of Week 1
  - Production-ready multi-tenant isolation with RLS
  - Complete team management capabilities (invite, assign roles, remove users)
  - 4-tier RBAC (Owner, Admin, Analyst, Viewer) fully functional
  - 40+ granular permissions enforced
  - UI components for team settings delivered in Week 1

**Changes Made:**
1. **Lines 646-685:** Week 1 section completely replaced with 4-day unified security foundation schedule
2. **Line 7:** Version updated from 2.3.0 → 2.4.0
3. **Line 8:** Date updated from January 1, 2026 → January 5, 2026
4. **Line 14:** Added reference to UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md
5. **Week 1 Schedule:**
   - **Monday (Day 1):** Auth + RLS + Audit (6-7 hours) - Supabase Auth config, core tables, RLS policies, audit logging
   - **Tuesday (Day 2):** Multi-User + Collaboration (5-6 hours) - Organization state, user presence, edit locks, activity tracking
   - **Wednesday (Day 3):** Role Management (5-6 hours) - User invitations, team management functions, API endpoints
   - **Thursday (Day 4):** UI + Testing (4-5 hours) - LoginPage, TeamSettingsPage, InviteUserDialog, AcceptInvitationPage, integration tests
   - **Friday:** Buffer + Week 2 Prep

**Reference Documents:**
- **UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md** (1,599 lines): Complete 4-day implementation plan with SQL migration, API specs, UI components
- **ROLE_MANAGEMENT_MINI_PRD_v1.0.md** (1,311 lines): RBAC role management extension with team UI/UX
- **SECURITY_MULTIUSER_MVP_PRD_PBS_WBS.md**: Base multi-tenant security architecture

**Next Steps (Post-v2.4.0):**
- Execute Week 1 unified security foundation implementation (20-24 hours)
- Validate all 14 API endpoints operational
- Verify 4-tier RBAC permission enforcement
- Test team management UI components (invite, assign roles, remove users)
- Confirm RLS policies isolate tenant data correctly

**Approval:**
- **Author:** Agentic Engineer + Solution Architect
- **Reviewed By:** Security Architecture Analysis, Gap Identification, Mini-PRD Creation
- **Status:** Approved - v2.4.0 consolidates fragmented security into Week 1 foundation

---

## Executive Summary

This updated MVP To-Do Plan integrates **Platform Foundation Core (PF-Core)** modules with the **BAIV instance** using the 4-Bridge integration architecture. The plan addresses your specific request for PRD-PBS-WBS structured approach for build, develop, and deploy phases.

**Key Updates from v2.3.0 (Unified Security Foundation):**
- ✅ **Week 1 Unified Security:** Auth + RLS + RBAC + Multi-user + Team Management consolidated into 4-day foundation
- ✅ **Complete RBAC:** 4-tier role system (Owner, Admin, Analyst, Viewer) with 40+ permissions operational by Day 3
- ✅ **Team Management UI:** User invitations, role assignment, team member management delivered in Week 1
- ✅ **Production-Ready Security:** All PF-Core security modules (Auth, RBAC, Multi-Tenant Isolation, API Keys) functional by Day 4
- ✅ **14 API Endpoints:** Complete REST API for auth, tenant users, invitations, presence, cycle state, activity
- ✅ **8 UI Components:** LoginPage, TeamSettingsPage, InviteUserDialog, AcceptInvitationPage with Shadcn/UI
- ✅ **Complete SQL Migration:** 1,026-line migration script with 8 tables, RLS policies, 6 database functions
- ✅ **Benefit:** Eliminates fragmented security implementation, delivers complete foundation in Week 1

**Key Updates from v2.1.0 (Unified Registry Architecture):**
- ✅ **Unified Registry**: Agents + ontologies + data contracts in single registry
- ✅ **Orchestration Control Plane**: Automated dependency resolution & execution coordination
- ✅ **Version Control Integration**: Git-based artifact management with atomic deployments
- ✅ **Data Contract Registry**: Input/output schema validation for all agents
- ✅ **Benefit**: 30% faster velocity, 40% fewer integration bugs, support 50+ agents

**Key Updates from v2.0 (Architecture Audit Corrections):**
- ✅ Database: DigitalOcean PostgreSQL → **Supabase PostgreSQL**
- ✅ Authentication: Custom JWT → **Supabase Auth SDK**
- ✅ Backend API: Express/Node.js → **Direct Supabase Client SDK**
- ✅ Deployment: DigitalOcean App Platform → **Supabase + frontend hosting**
- ✅ Cost optimization: $25/mo → **$0-20/mo** (6 days saved, $60-300/year savings)

**Key Updates from v2.2.0 (Agent Template v3.0.0 Alignment):**
- ✅ **Agent Template Updated**: PF-Core Unified Agent Specification Template v3.0.0
- ✅ **Alignment Status**: 95% aligned (BAIV_MVP_TEMPLATE_v3.0.0_ALIGNMENT_ANALYSIS.md)
- ✅ **Enhanced Features**: RBAC authority boundaries, consumes/produces/requires bindings, Claude configuration
- ✅ **Database Schema**: Appendix A (unified_registry, agent_ontology_bindings, data_contracts)
- ✅ **JSON-LD Format**: Appendix B (semantic web compliance with @context)
- ✅ **Agent Catalog**: Appendix C (3 BAIV agents ready for catalog entry)
- ✅ **Integration Code**: Appendix D (UnifiedRegistryLoader patterns)
- ✅ **Backward Compatible**: 100% compatible with v2.0.0 specifications

**Key Updates from v1.0:**
- ✅ Integration of 22 PF-Core modules via 4 integration bridges
- ✅ PRD-PBS-WBS work breakdown structure
- ✅ Strategic alignment with VSOM and OKR frameworks
- ✅ Multi-tenant configuration with VE-PF Instance Config Management
- ✅ Design-to-Code pipeline integration
- ✅ Enhanced testing strategy with TDD approach
- ✅ Unified Agent Template v3.0.0 (14-Section + Appendices) compliance for all 3 agents
- ✅ Complete UI/UX specifications via DASHBOARD_TEMPLATES.md

**MVP Scope (6 Weeks):**
- **Foundation:** PF-Core bridges + Supabase + Supabase Auth + Complete RBAC (Week 1)
- **Core Agents:** 3 primary agents (Discovery, Citation Tester, Gap Analyzer)
- **Dashboard:** 5-Perspective Balanced Scorecard with BAIV metrics
- **Deployment:** Supabase (backend) + Vercel/Netlify (frontend)

---

## Table of Contents

1. [PRD: Product Requirements](#1-prd-product-requirements)
2. [PBS: Product Breakdown Structure](#2-pbs-product-breakdown-structure)
3. [WBS: Work Breakdown Structure](#3-wbs-work-breakdown-structure)
4. [Week-by-Week Implementation Plan](#4-week-by-week-implementation-plan)
5. [PF-Core Module Integration Checklist](#5-pf-core-module-integration-checklist)
6. [Testing & Validation Strategy](#6-testing--validation-strategy)
7. [Deployment & Launch Plan](#7-deployment--launch-plan)

---

## 1. PRD: Product Requirements

### 1.1 Product Vision (VSOM Layer)

**Vision Statement:**
Enable B2B SaaS companies to achieve measurable AI Visibility through ontology-driven content optimization, powered by PF-Core strategic alignment and 16 specialized agents.

**Strategic Objectives (VSOM):**
1. **Financial:** $5K MRR by Month 3, 50 paying customers
2. **Customer:** >40% PMF score, 25% average citation rate improvement
3. **Process:** <2 sec API response time, 99.5% uptime
4. **Learning:** 3 core agents operational, 80%+ prediction accuracy
5. **Stakeholder:** 10 agency partnerships, 15% partner revenue

### 1.2 Business Requirements (VE Framework)

#### Value Proposition (VE-Value-Prop-Canvas)
- **Target ICP:** B2B SaaS Marketing Leaders (CMO, VP Marketing, Marketing Directors)
- **Problem:** Companies are invisible to AI platforms (ChatGPT, Claude, Perplexity, Gemini)
- **Solution:** AI Visibility Optimization through ontology-driven gap analysis and content creation
- **Unique Value:** Only platform combining citation testing + gap analysis + ontology-grounded content

#### OKR Alignment (OKR Module)
**Marketing Objective:** Increase AI Visibility for B2B SaaS clients
- **KR1:** Citation rate ≥ 25% across 4 platforms (ChatGPT, Claude, Perplexity, Gemini)
- **KR2:** 100 priority keywords with gap analysis
- **KR3:** 50 blog posts published addressing gaps

### 1.3 Functional Requirements

#### Core Capabilities
1. **Authentication & Authorization** (PFC-SEC-Auth-Foundation, PFC-SEC-RBAC-Foundation)
   - **Supabase Auth** with auto-managed JWT
   - 4-tier RBAC via Supabase RLS policies (Owner, Admin, Analyst, Viewer)
   - Multi-tenant isolation via RLS + tenant_id (PFC-SEC-Multi-Tenant-Isolation)
   - API key management via Supabase Service Role Key (90/180 day rotation)
   - **Team Management** (NEW in v2.4.0): User invitations, role assignment, team member management

2. **Ontology Management** (PFC-OAA-Ontology-Registry)
   - 30+ BAIV ontologies registered
   - JSONB storage for flexibility
   - JSON-LD schema validation
   - Agent-to-ontology bindings

3. **Agent Orchestration** (PFC-OAA-Agent-Registry)
   - Agent registry (16 agents defined, 3 MVP priority)
   - All agents follow **PF-Core Unified Agent Specification Template v3.0.0**
   - Execution tracking (agent_executions table)
   - Resource limits enforcement
   - Async execution with status polling
   - **Template Sections:** P0.1-P0.14 (Identity, Objectives, Input, Processing, Output, Error Handling, Performance, Security, Testing, Deployment, Monitoring, Documentation, Versioning, Compliance) + Appendices (Database Schema, JSON-LD, Agent Catalog, Code Examples)
   - **v3.0.0 Enhancements:** RBAC authority boundaries (tier1/tier2/tier3), consumes/produces/requires ontology bindings, Claude configuration (model + tools)

4. **Dashboard** (PFC-DSN-Design-System, PFC-DSN-Component-Library)
   - 5-Perspective Balanced Scorecard (see **DASHBOARD_TEMPLATES.md v1.0.0**)
   - Real-time metrics via WebSocket
   - Responsive 12-column grid
   - React + TypeScript components
   - **UI/UX Specifications:**
     - Executive Overview: 5 KPI cards (AI Visibility Score, Citation Rate, Content Velocity, Gap Closure, Client Health)
     - BSC Perspectives: Financial, Customer, Process, Learning, Stakeholder
     - Widget Library: 20+ reusable widgets (see DASHBOARD_TEMPLATES.md Section 3)
     - Design tokens: BAIV color palette, spacing scale, typography (see DASHBOARD_TEMPLATES.md Section 6)
     - Responsive breakpoints: mobile (320px), tablet (768px), desktop (1024px, 1440px)

5. **Unified Registry & Orchestration** (PFC-OAA-Unified-Registry) **[NEW in v2.2.0]**
   - **Unified Metadata Registry**: Single source of truth for agents, ontologies, and data contracts
   - **Semantic Versioning**: Automatic version management (major.minor.patch)
   - **Dependency Resolution**: Automatic dependency graph with impact analysis
   - **Data Contract Registry**: Input/output schema validation for all agents
   - **Orchestration Control Plane**: Automated execution coordination based on dependencies
   - **Version Control Integration**: Git-based artifact management with atomic deployments
   - **Continuous Integration**: Automated validation pipeline for registry updates
   - **Change Impact Analysis**: Show affected components before deployment
   - **Rollback Manager**: One-click rollback capabilities
   - **Audit Trail**: Complete change history for compliance

### 1.4 Non-Functional Requirements

| Requirement | Target | PF-Core Module |
|-------------|--------|----------------|
| **Performance** | <2 sec API response | Infrastructure |
| **Availability** | 99.5% uptime | Deployment + Monitoring |
| **Scalability** | 100 concurrent users | Database + API design |
| **Security** | SOC 2 Type II compliance | SEC-RBAC, SEC-Multi-Tenant |
| **Data Privacy** | GDPR compliant | SEC-Audit-Logging |
| **Test Coverage** | 70% minimum | AB-Test-Driven-Design |

---

## 2. PBS: Product Breakdown Structure

### Overview: PBS Context & Traceability

The **Product Breakdown Structure (PBS)** decomposes the BAIV MVP into hierarchical deliverable-oriented components, tracing directly to the **Product Requirements Document (PRD)** functional and non-functional requirements defined in Section 1. The PBS serves as the bridge between strategic product vision and tactical implementation, ensuring every component maps to specific business capabilities, PF-Core module integrations, and measurable outcomes.

Each PBS component maintains **full traceability** to:
- **PRD Section 1.3 (Functional Requirements)**: Authentication & Authorization (PBS 2.3), Ontology Management (PBS 2.4), Agent Orchestration (PBS 3.0), Dashboard (PBS 4.0)
- **PF-Core Integration Documents**: PFC-PFI-BAIV_MODULE_CATALOG v1.0.0 (22 modules), PFC-PFI-BAIV_INTEGRATION_BRIDGES.md v1.0.0 (4 bridges)
- **Architecture Documents**: ARCHITECTURE_MASTER.md v0.1.0 (Supabase backend), runtime-agentic-backend-architecture.md v1.0 (agent workflows)
- **Design Specifications**: DASHBOARD_TEMPLATES.md v1.0.0 (UI/UX, 20+ widgets), BAIV_ONTOLOGY_REGISTRY.md v1.0.0 (30+ ontologies)
- **Implementation Standards**: PF-Core Unified Agent Specification Template v3.0.0 (agent specifications with appendices)
- **Alignment Analysis**: BAIV_MVP_TEMPLATE_v3.0.0_ALIGNMENT_ANALYSIS.md (95% aligned, backward compatible)
- **Security Foundation**: UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md (Week 1 consolidated security plan)

The PBS decomposition follows **Work Breakdown Structure (WBS)** principles, enabling effort estimation, dependency tracking, and resource allocation across the 6-week MVP timeline. All 5 Level-1 components (Integration Layer, Foundation Services, Agent Services, Dashboard Services, Deployment & Operations) collectively deliver the complete BAIV product capabilities defined in the PRD, with explicit dependencies and integration points documented in Section 3 (WBS Dictionary).

### 2.0 PRD Summary for PBS Context

**Product Vision (PRD 1.1):** Enable B2B SaaS companies to achieve measurable AI Visibility through ontology-driven content optimization, powered by PF-Core strategic alignment and 16 specialized agents.

**Core Capabilities Mapped to PBS:**
- **Authentication & Authorization** (PRD 1.3.1) → PBS 2.3: Supabase Auth with RLS-based RBAC, multi-tenant isolation, team management
- **Ontology Management** (PRD 1.3.2) → PBS 2.4: 30+ BAIV ontologies with JSONB storage, JSON-LD validation
- **Agent Orchestration** (PRD 1.3.3) → PBS 3.0: 16 agents (3 MVP priority), execution tracking, resource limits
- **Dashboard** (PRD 1.3.4) → PBS 4.0: 5-Perspective Balanced Scorecard, 20+ widgets, real-time updates

**Non-Functional Requirements Mapped to PBS:**
- **Performance** (<2 sec response) → PBS 2.2 (Supabase Client SDK), PBS 3.1 (Resource Limits)
- **Security** (SOC 2, GDPR) → PBS 2.3 (Supabase Auth + RLS), PBS 1.2 (Security Bridge)
- **Scalability** (100 concurrent users) → PBS 2.1 (Supabase Database), PBS 5.1 (Infrastructure)
- **Test Coverage** (70% minimum) → PBS 5.3 (Testing Strategy), PBS 5.4 (Documentation)

### 2.1 PBS Level 1: Visual Architecture

```mermaid
graph TD
    BAIV["BAIV MVP v1.0<br/>AI Visibility Platform"]
    
    BAIV --> L1["1.0 PF-Core Integration Layer<br/>4 Bridges + Config Management"]
    BAIV --> L2["2.0 Foundation Services<br/>Supabase Backend + Auth"]
    BAIV --> L3["3.0 Agent Services<br/>3 Core Agents (Discovery, Citation, Gap)"]
    BAIV --> L4["4.0 Dashboard Services<br/>5-Perspective BSC + Widgets"]
    BAIV --> L5["5.0 Deployment & Operations<br/>Supabase + Frontend Hosting"]
    
    L1 --> L1A["Value Engineering Bridge"]
    L1 --> L1B["Security Bridge"]
    L1 --> L1C["Design Bridge"]
    L1 --> L1D["Agent Orchestration Bridge"]
    
    L2 --> L2A["Database Layer<br/>(Supabase)"]
    L2 --> L2B["API Layer<br/>(Supabase SDK)"]
    L2 --> L2C["Authentication<br/>(Supabase Auth)"]
    L2 --> L2D["Ontology Service<br/>(30+ Ontologies)"]
    
    L3 --> L3A["Agent Infrastructure"]
    L3 --> L3B["Discovery Agent"]
    L3 --> L3C["Citation Tester"]
    L3 --> L3D["Gap Analyzer"]
    
    L4 --> L4A["Frontend App<br/>(React + TypeScript)"]
    L4 --> L4B["5-Perspective BSC"]
    L4 --> L4C["Data Views"]
    L4 --> L4D["Real-Time Updates"]
    
    L5 --> L5A["Infrastructure Setup"]
    L5 --> L5B["CI/CD Pipeline"]
    L5 --> L5C["Monitoring & Logging"]
    L5 --> L5D["Documentation"]
    
    classDef level1 fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    classDef level2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef main fill:#fff9c4,stroke:#f57f17,stroke-width:4px,color:#000
    
    class BAIV main
    class L1,L2,L3,L4,L5 level1
    class L1A,L1B,L1C,L1D,L2A,L2B,L2C,L2D,L3A,L3B,L3C,L3D,L4A,L4B,L4C,L4D,L5A,L5B,L5C,L5D level2
```

**Text Format:**
```
BAIV MVP (v1.0)
├── 1.0 PF-Core Integration Layer
├── 2.0 Foundation Services
├── 3.0 Agent Services
├── 4.0 Dashboard Services
└── 5.0 Deployment & Operations
```

### 2.2 Level 2: Component Breakdown

#### 1.0 PF-Core Integration Layer
```
1.0 PF-Core Integration Layer
├── 1.1 Value Engineering Bridge
│   ├── 1.1.1 VSOM Context Loading
│   ├── 1.1.2 OKR Integration
│   ├── 1.1.3 VE-Metrics/KPI Tree
│   └── 1.1.4 Business Model Config
├── 1.2 Security Bridge
│   ├── 1.2.1 Authentication Module
│   ├── 1.2.2 RBAC Module
│   ├── 1.2.3 Multi-Tenant Isolation
│   └── 1.2.4 API Key Management
├── 1.3 Design Bridge
│   ├── 1.3.1 Design System Tokens
│   ├── 1.3.2 Component Library
│   ├── 1.3.3 Figma Integration
│   └── 1.3.4 Dashboard Templates
└── 1.4 Agent Orchestration Bridge
    ├── 1.4.1 Agent Registry
    ├── 1.4.2 Ontology Registry
    ├── 1.4.3 Execution Framework
    └── 1.4.4 Context Propagation
```

#### 2.0 Foundation Services
```
2.0 Foundation Services
├── 2.1 Database Layer
│   ├── 2.1.1 Supabase Project Setup
│   ├── 2.1.2 Schema Deployment via Supabase Dashboard (11 tables)
│   ├── 2.1.3 RLS Policies Configuration (6 tables)
│   └── 2.1.4 Seed Data via Supabase SQL Editor (roles, agents)
├── 2.2 API Layer
│   ├── 2.2.1 Supabase Client SDK Integration (@supabase/supabase-js)
│   ├── 2.2.2 Direct Database Queries with RLS
│   ├── 2.2.3 Supabase Realtime Setup
│   └── 2.2.4 Supabase Edge Functions (Optional)
├── 2.3 Authentication Service
│   ├── 2.3.1 Supabase Auth Integration
│   ├── 2.3.2 signInWithPassword Implementation
│   ├── 2.3.3 Supabase Session Management
│   └── 2.3.4 RLS Context Injection (tenant_id)
└── 2.4 Ontology Service
    ├── 2.4.1 Supabase Queries for CRUD Operations
    ├── 2.4.2 JSON-LD Validation
    ├── 2.4.3 Type Discrimination
    └── 2.4.4 Query/Filter Support
```

#### 3.0 Agent Services
```
3.0 Agent Services
├── 3.1 Agent Infrastructure
│   ├── 3.1.1 Agent Registry API
│   ├── 3.1.2 Execution Tracking
│   ├── 3.1.3 Resource Limits
│   └── 3.1.4 Error Handling
├── 3.2 Discovery Agent (P1)
│   ├── Agent PRD: Follows 14-Section Template v2.0.0
│   ├── 3.2.1 Website Crawling
│   ├── 3.2.2 Schema.org Parsing
│   ├── 3.2.3 Context Extraction
│   └── 3.2.4 Client-Context Ontology Creation
├── 3.3 Citation Tester Agent (P2)
│   ├── Agent PRD: Follows 14-Section Template v2.0.0
│   ├── 3.3.1 Multi-Platform Integration (4 platforms)
│   ├── 3.3.2 Query Execution
│   ├── 3.3.3 Citation Detection
│   └── 3.3.4 RPI Score Calculation
└── 3.4 Gap Analyzer Agent (P2)
    ├── Agent PRD: Follows 14-Section Template v2.0.0
    ├── 3.4.1 Citation Result Analysis
    ├── 3.4.2 Gap Identification
    ├── 3.4.3 Priority Scoring (P0, P1, P2)
    └── 3.4.4 Gap-Analysis Ontology Creation
```

#### 4.0 Dashboard Services
```
4.0 Dashboard Services
├── 4.1 Frontend Application
│   ├── 4.1.1 React + TypeScript Setup
│   ├── 4.1.2 Component Library (20+ widgets per DASHBOARD_TEMPLATES.md)
│   ├── 4.1.3 State Management (Context API)
│   └── 4.1.4 Routing
├── 4.2 5-Perspective Balanced Scorecard (per DASHBOARD_TEMPLATES.md Section 2)
│   ├── 4.2.1 Executive Overview (5 KPI cards)
│   ├── 4.2.2 Financial Perspective (MRR, LTV, Revenue/Client)
│   ├── 4.2.3 Customer Perspective (Citation Rate, NPS, Retention)
│   ├── 4.2.4 Process Perspective (Audit Velocity, Content Throughput)
│   ├── 4.2.5 Learning Perspective (Agent Accuracy, Model Improvements)
│   └── 4.2.6 Stakeholder Perspective (Partner Revenue, Affiliates)
├── 4.3 Data Views
│   ├── 4.3.1 Audit Results Table
│   ├── 4.3.2 Gap Analysis List
│   ├── 4.3.3 Client Context Display
│   └── 4.3.4 Agent Execution Logs
└── 4.4 Real-Time Updates
    ├── 4.4.1 WebSocket Connection
    ├── 4.4.2 Live Status Updates
    └── 4.4.3 Notifications
```

#### 5.0 Deployment & Operations
```
5.0 Deployment & Operations
├── 5.1 Infrastructure Setup
│   ├── 5.1.1 Supabase Backend (Database, Auth, Storage)
│   ├── 5.1.2 Frontend Hosting (Vercel/Netlify/DigitalOcean)
│   ├── 5.1.3 Environment Variables (VITE_SUPABASE_URL, etc.)
│   └── 5.1.4 Custom Domain
├── 5.2 CI/CD Pipeline
│   ├── 5.2.1 GitHub Actions
│   ├── 5.2.2 Automated Testing
│   ├── 5.2.3 Build/Deploy Workflow
│   └── 5.2.4 Rollback Strategy
├── 5.3 Monitoring & Logging
│   ├── 5.3.1 UptimeRobot
│   ├── 5.3.2 Error Tracking
│   ├── 5.3.3 Audit Logs
│   └── 5.3.4 Performance Metrics
└── 5.4 Documentation
    ├── 5.4.1 User Guide
    ├── 5.4.2 API Documentation
    ├── 5.4.3 Deployment Guide
    └── 5.4.4 Runbook
```

### 2.3 PBS-to-PRD Traceability Matrix

```mermaid
graph LR
    subgraph PRD["PRD Section 1: Requirements"]
        PRD1["1.3.1 Authentication<br/>& Authorization"]
        PRD2["1.3.2 Ontology<br/>Management"]
        PRD3["1.3.3 Agent<br/>Orchestration"]
        PRD4["1.3.4 Dashboard<br/>(5-Perspective BSC)"]
        NFR1["1.4 Performance<br/>(<2 sec)"]
        NFR2["1.4 Security<br/>(SOC 2, GDPR)"]
    end
    
    subgraph PBS["PBS Section 2: Product Components"]
        PBS1["1.0 PF-Core Integration<br/>(4 Bridges)"]
        PBS2["2.0 Foundation Services<br/>(Supabase Backend)"]
        PBS3["3.0 Agent Services<br/>(3 Core Agents)"]
        PBS4["4.0 Dashboard Services<br/>(React + BSC)"]
        PBS5["5.0 Deployment<br/>(Supabase + Hosting)"]
    end
    
    subgraph DOCS["Reference Documents"]
        DOC1["PFC-PFI-BAIV<br/>MODULE_CATALOG"]
        DOC2["INTEGRATION<br/>BRIDGES"]
        DOC3["ARCHITECTURE<br/>MASTER"]
        DOC4["DASHBOARD<br/>TEMPLATES"]
        DOC5["ONTOLOGY<br/>REGISTRY"]
    end
    
    PRD1 --> PBS2
    PRD2 --> PBS2
    PRD3 --> PBS3
    PRD4 --> PBS4
    NFR1 --> PBS2
    NFR2 --> PBS2
    
    PBS1 --> DOC1
    PBS1 --> DOC2
    PBS2 --> DOC3
    PBS3 --> DOC5
    PBS4 --> DOC4
    PBS5 --> DOC3
    
    PBS1 --> PBS2
    PBS2 --> PBS3
    PBS2 --> PBS4
    PBS3 --> PBS4
    PBS4 --> PBS5
    
    classDef prd fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef pbs fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef docs fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class PRD1,PRD2,PRD3,PRD4,NFR1,NFR2 prd
    class PBS1,PBS2,PBS3,PBS4,PBS5 pbs
    class DOC1,DOC2,DOC3,DOC4,DOC5 docs
```

### 2.4 WBS Timeline & Dependencies

```mermaid
gantt
    title BAIV MVP Implementation Timeline (6 Weeks)
    dateFormat YYYY-MM-DD
    section Week 1
    Unified Security Foundation (WBS 1.0)     :active, w1a, 2026-01-06, 4d
    Week 1 Buffer & Prep                      :active, w1b, 2026-01-10, 1d
    
    section Week 2
    Authentication Service (WBS 2.3)        :w2a, 2026-01-13, 2d
    Ontology Service (WBS 2.4)              :w2b, 2026-01-15, 3d
    
    section Week 3
    Design Bridge (WBS 1.3)                 :w3a, 2026-01-20, 2d
    Agent Infrastructure (WBS 3.1)          :w3b, 2026-01-22, 2d
    Discovery Agent Start (WBS 3.2)         :w3c, 2026-01-24, 1d
    
    section Week 4
    Discovery Agent Complete (WBS 3.2)      :w4a, 2026-01-27, 2d
    Citation Tester Agent (WBS 3.3)         :w4b, 2026-01-29, 3d
    
    section Week 5
    Gap Analyzer Agent (WBS 3.4)            :w5a, 2026-02-03, 2d
    Dashboard Implementation (WBS 4.0)      :w5b, 2026-02-05, 3d
    Infrastructure Setup (WBS 5.1)          :w5c, 2026-02-08, 1d
    
    section Week 6
    Testing & Validation (WBS 5.3)          :w6a, 2026-02-10, 2d
    Documentation (WBS 5.4)                 :w6b, 2026-02-12, 2d
    Launch                                   :milestone, w6c, 2026-02-14, 1d
```

**Document References Legend:**
- **PFC-PFI-BAIV_MODULE_CATALOG v1.0.0**: 22 PF-Core modules mapped to BAIV capabilities
- **PFC-PFI-BAIV_INTEGRATION_BRIDGES v1.0.0**: 4 integration bridges (VE, Security, Design, Agent Orchestration)
- **ARCHITECTURE_MASTER v0.1.0**: Supabase backend architecture, component specifications
- **DASHBOARD_TEMPLATES v1.0.0**: UI/UX specifications, 20+ widgets, 5-Perspective BSC
- **BAIV_ONTOLOGY_REGISTRY v1.0.0**: 30+ ontology definitions with JSON-LD schemas
- **runtime-agentic-backend-architecture v1.0**: Agent workflow patterns, state management
- **PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0**: Universal agent specification standard
- **UNIFIED_SECURITY_FOUNDATION_MVP v1.0.0**: Week 1 consolidated security implementation plan

---

## 3. WBS: Work Breakdown Structure

### 3.1 WBS Dictionary

| WBS ID | Task Name | Duration | Dependencies | Assignee | Deliverable |
|--------|-----------|----------|--------------|----------|-------------|
| **1.0** | **PF-Core Integration Layer** | **5 days** | - | Backend Dev | Integration bridges configured |
| 1.1 | Value Engineering Bridge | 1 day | - | Backend Dev | VE config loaded |
| 1.1.1 | Configure VSOM context | 2 hours | - | Backend Dev | VSOM JSON loaded |
| 1.1.2 | Setup OKR module integration | 2 hours | 1.1.1 | Backend Dev | OKR endpoints active |
| 1.1.3 | Implement VE-Metrics/KPI Tree | 2 hours | 1.1.2 | Backend Dev | Metrics schema created |
| 1.1.4 | Configure Business Model | 2 hours | 1.1.3 | Backend Dev | Pricing tiers defined |
| 1.2 | Security Bridge | 1 day | - | Backend Dev | Security modules active |
| 1.2.1 | Deploy Authentication Module | 3 hours | - | Backend Dev | JWT auth working |
| 1.2.2 | Deploy RBAC Module | 2 hours | 1.2.1 | Backend Dev | 4 roles configured |
| 1.2.3 | Configure Multi-Tenant Isolation | 2 hours | 1.2.2 | Backend Dev | RLS policies active |
| 1.2.4 | Setup API Key Management | 1 hour | 1.2.3 | Backend Dev | API keys working |
| 1.3 | Design Bridge | 2 days | - | Frontend Dev | Design system ready |
| 1.3.1 | Import Design System Tokens | 4 hours | - | Frontend Dev | Tokens file created |
| 1.3.2 | Build Component Library | 8 hours | 1.3.1 | Frontend Dev | 20+ components |
| 1.3.3 | Setup Figma Integration | 2 hours | 1.3.2 | Frontend Dev | Figma plugin configured |
| 1.3.4 | Create Dashboard Templates | 2 hours | 1.3.3 | Frontend Dev | 5 BSC templates |
| 1.4 | Agent Orchestration Bridge | 1 day | - | Backend Dev | Agent framework ready |
| 1.4.1 | Deploy Agent Registry | 2 hours | - | Backend Dev | 16 agents seeded |
| 1.4.2 | Deploy Ontology Registry | 2 hours | 1.4.1 | Backend Dev | 30+ ontologies seeded |
| 1.4.3 | Build Execution Framework | 3 hours | 1.4.2 | Backend Dev | Execute API working |
| 1.4.4 | Implement Context Propagation | 1 hour | 1.4.3 | Backend Dev | VSOM context flows |
| **2.0** | **Foundation Services** | **10 days** | 1.0 | Backend Dev | API + DB operational |
| 2.1 | Database Layer | 2 days | 1.0 | Backend Dev | Database ready |
| 2.1.1 | PostgreSQL Setup | 1 hour | - | Backend Dev | DB provisioned |
| 2.1.2 | Schema Deployment | 2 hours | 2.1.1 | Backend Dev | 11 tables created |
| 2.1.3 | RLS Policies | 2 hours | 2.1.2 | Backend Dev | RLS active on 6 tables |
| 2.1.4 | Seed Data | 1 hour | 2.1.3 | Backend Dev | Test data loaded |
| 2.2 | API Layer | 3 days | 2.1 | Backend Dev | API server running |
| 2.2.1 | Node.js/TypeScript Setup | 4 hours | - | Backend Dev | Project initialized |
| 2.2.2 | Express Server | 4 hours | 2.2.1 | Backend Dev | Server listening |
| 2.2.3 | Database Connection Pool | 2 hours | 2.2.2 | Backend Dev | Pool configured |
| 2.2.4 | Health/Status Endpoints | 2 hours | 2.2.3 | Backend Dev | /health returns 200 |
| 2.3 | Authentication Service | 2 days | 1.2, 2.2 | Backend Dev | Auth working |
| 2.3.1 | User Registration | 4 hours | 2.2 | Backend Dev | POST /auth/register |
| 2.3.2 | Login (JWT) | 4 hours | 2.3.1 | Backend Dev | POST /auth/login |
| 2.3.3 | Session Management | 2 hours | 2.3.2 | Backend Dev | GET /auth/me |
| 2.3.4 | Middleware (JWT validation) | 2 hours | 2.3.3 | Backend Dev | Protected routes |
| 2.4 | Ontology Service | 3 days | 1.4, 2.2 | Backend Dev | Ontology CRUD ready |
| 2.4.1 | CRUD Endpoints | 8 hours | 2.2 | Backend Dev | 5 ontology endpoints |
| 2.4.2 | JSON-LD Validation | 4 hours | 2.4.1 | Backend Dev | Schema validation |
| 2.4.3 | Type Discrimination | 2 hours | 2.4.2 | Backend Dev | Type handling |
| 2.4.4 | Query/Filter Support | 2 hours | 2.4.3 | Backend Dev | Filter by type/tenant |
| **3.0** | **Agent Services** | **10 days** | 2.0 | Backend Dev | 3 agents working |
| 3.1 | Agent Infrastructure | 2 days | 1.4, 2.0 | Backend Dev | Agent framework |
| 3.1.1 | Agent Registry API | 4 hours | 1.4 | Backend Dev | GET /agents |
| 3.1.2 | Execution Tracking | 4 hours | 3.1.1 | Backend Dev | POST /agents/:id/execute |
| 3.1.3 | Resource Limits | 2 hours | 3.1.2 | Backend Dev | Timeout + memory limits |
| 3.1.4 | Error Handling | 2 hours | 3.1.3 | Backend Dev | Retry logic |
| 3.2 | Discovery Agent (P1) | 3 days | 3.1 | Backend Dev | Discovery working |
| 3.2.1 | Website Crawling | 6 hours | 3.1 | Backend Dev | Fetch HTML |
| 3.2.2 | Schema.org Parsing | 6 hours | 3.2.1 | Backend Dev | Extract structured data |
| 3.2.3 | Context Extraction | 4 hours | 3.2.2 | Backend Dev | Parse site info |
| 3.2.4 | Client-Context Ontology Creation | 4 hours | 3.2.3 | Backend Dev | Store ontology |
| 3.3 | Citation Tester Agent (P2) | 3 days | 3.1 | Backend Dev | Citation testing working |
| 3.3.1 | Multi-Platform Integration | 8 hours | 3.1 | Backend Dev | 4 platform APIs |
| 3.3.2 | Query Execution | 4 hours | 3.3.1 | Backend Dev | Send queries |
| 3.3.3 | Citation Detection | 4 hours | 3.3.2 | Backend Dev | Parse citations |
| 3.3.4 | RPI Score Calculation | 4 hours | 3.3.3 | Backend Dev | Calculate scores |
| 3.4 | Gap Analyzer Agent (P2) | 2 days | 3.3 | Backend Dev | Gap analysis working |
| 3.4.1 | Citation Result Analysis | 4 hours | 3.3 | Backend Dev | Load audit results |
| 3.4.2 | Gap Identification | 4 hours | 3.4.1 | Backend Dev | Find gaps |
| 3.4.3 | Priority Scoring | 2 hours | 3.4.2 | Backend Dev | Score P0/P1/P2 |
| 3.4.4 | Gap-Analysis Ontology Creation | 2 hours | 3.4.3 | Backend Dev | Store gaps |
| **4.0** | **Dashboard Services** | **5 days** | 1.3, 2.0 | Frontend Dev | Dashboard live |
| 4.1 | Frontend Application | 2 days | 1.3 | Frontend Dev | React app running |
| 4.1.1 | React + TypeScript Setup | 2 hours | - | Frontend Dev | CRA or Vite |
| 4.1.2 | Component Library | 8 hours | 4.1.1 | Frontend Dev | 20+ widgets |
| 4.1.3 | State Management | 4 hours | 4.1.2 | Frontend Dev | Context API |
| 4.1.4 | Routing | 2 hours | 4.1.3 | Frontend Dev | React Router |
| 4.2 | 5-Perspective BSC | 2 days | 4.1 | Frontend Dev | BSC dashboard |
| 4.2.1 | Executive Overview | 2 hours | 4.1 | Frontend Dev | 5 KPI cards |
| 4.2.2 | Financial Perspective | 2 hours | 4.2.1 | Frontend Dev | Revenue metrics |
| 4.2.3 | Customer Perspective | 2 hours | 4.2.2 | Frontend Dev | Citation metrics |
| 4.2.4 | Process Perspective | 2 hours | 4.2.3 | Frontend Dev | Audit velocity |
| 4.2.5 | Learning Perspective | 2 hours | 4.2.4 | Frontend Dev | Agent accuracy |
| 4.2.6 | Stakeholder Perspective | 2 hours | 4.2.5 | Frontend Dev | Partner metrics |
| 4.3 | Data Views | 1 day | 4.1 | Frontend Dev | Data tables/lists |
| 4.3.1 | Audit Results Table | 2 hours | 4.1 | Frontend Dev | Citation table |
| 4.3.2 | Gap Analysis List | 2 hours | 4.3.1 | Frontend Dev | Gap list with priority |
| 4.3.3 | Client Context Display | 2 hours | 4.3.2 | Frontend Dev | Client profile |
| 4.3.4 | Agent Execution Logs | 2 hours | 4.3.3 | Frontend Dev | Execution history |
| **5.0** | **Deployment & Operations** | **5 days** | 2.0, 3.0, 4.0 | DevOps/Backend | Production live |
| 5.1 | Infrastructure Setup | 1 day | - | DevOps | Infrastructure ready |
| 5.1.1 | DigitalOcean App Platform | 2 hours | - | DevOps | App created |
| 5.1.2 | Managed PostgreSQL | 1 hour | 5.1.1 | DevOps | DB provisioned |
| 5.1.3 | Environment Variables | 1 hour | 5.1.2 | DevOps | Env vars set |
| 5.1.4 | Custom Domain | 2 hours | 5.1.3 | DevOps | DNS configured |
| 5.2 | CI/CD Pipeline | 1 day | 5.1 | DevOps | Auto-deploy working |
| 5.2.1 | GitHub Actions | 2 hours | 5.1 | DevOps | Workflow file created |
| 5.2.2 | Automated Testing | 2 hours | 5.2.1 | DevOps | Tests run on PR |
| 5.2.3 | Build/Deploy Workflow | 2 hours | 5.2.2 | DevOps | Deploy on merge |
| 5.2.4 | Rollback Strategy | 2 hours | 5.2.3 | DevOps | Rollback documented |
| 5.3 | Monitoring & Logging | 1 day | 5.1 | DevOps | Monitoring active |
| 5.3.1 | UptimeRobot | 1 hour | 5.1 | DevOps | Health checks |
| 5.3.2 | Error Tracking | 2 hours | 5.3.1 | DevOps | Error alerts |
| 5.3.3 | Audit Logs | 2 hours | 5.3.2 | DevOps | Log retention |
| 5.3.4 | Performance Metrics | 2 hours | 5.3.3 | DevOps | Response time tracking |
| 5.4 | Documentation | 2 days | All | Tech Writer | Docs complete |
| 5.4.1 | User Guide | 4 hours | 4.0 | Tech Writer | Getting started |
| 5.4.2 | API Documentation | 4 hours | 2.0 | Tech Writer | OpenAPI docs |
| 5.4.3 | Deployment Guide | 2 hours | 5.1 | Tech Writer | Deploy steps |
| 5.4.4 | Runbook | 2 hours | 5.3 | Tech Writer | Ops procedures |

**Total Estimated Effort:** 35 days (7 weeks with parallelization → 6 weeks with tight coordination)

---

## 4. Week-by-Week Implementation Plan

### Week 1: Unified Security Foundation

**Sprint Goal:** Complete security foundation operational - Auth + RLS + RBAC + Multi-user + Team Management + UI

**Reference Documents:**
- **High-Level Plan:** UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md (1,599 lines)
- **Detailed Implementation Guide:** [BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md](./BAIV_MVP_WEEK1_SECURITY_PLAN_v1.1.0.md) (1,019 lines) ⬅️ **USE THIS FOR IMPLEMENTATION**

> 📖 **Note:** This section provides a Week 1 summary. For step-by-step implementation with SQL migrations, TypeScript code samples, and UI components, refer to the detailed Week 1 Security Plan linked above. The detailed plan includes:
> - Complete SQL migration scripts with RLS policies
> - TypeScript code samples for all API endpoints
> - React component implementations (LoginPage, TeamSettingsPage, InviteUserDialog, RoleBadge)
> - Database function definitions (set_tenant_context, invite_user_to_tenant, accept_invitation, etc.)
> - Integration test examples
> - Traceability matrix mapping to this document (Lines 681-851)

#### Monday (Day 1): Auth + RLS + Audit (6-7 hours)
**Goal:** Core security infrastructure operational

- [ ] **Supabase Configuration** (2 hours)
  - Create Supabase project
  - Configure Supabase Auth (email/password provider)
  - Set up JWT secret rotation
  - Configure auth.users table
  - **Deliverable:** Supabase Auth operational

- [ ] **Core Database Tables** (2 hours)
  - Deploy via Supabase SQL Editor:
    - tenants table (id, name, plan_tier, created_at)
    - tenant_users table (user_id, tenant_id, role, joined_at)
    - audit_log table (id, tenant_id, user_id, action, resource, timestamp, metadata)
  - **Deliverable:** 3 core tables created

- [ ] **RLS Policies** (2 hours)
  - Implement set_tenant_context() function
  - Create RLS policies on tenant_users, audit_log
  - Test tenant isolation
  - **Deliverable:** RLS active, tenant context working

- [ ] **Auth Middleware** (1 hour)
  - Create requireAuth middleware
  - Create requireRole middleware
  - Implement tenant context injection
  - **Deliverable:** Protected routes enforced

**Day 1 Success Criteria:**
- [ ] Supabase Auth configured
- [ ] Users can sign up and log in
- [ ] RLS policies enforce tenant isolation
- [ ] Audit logging captures all actions

#### Tuesday (Day 2): Multi-User + Collaboration (5-6 hours)
**Goal:** Multi-user collaboration features operational

- [ ] **Organization Cycle State** (2 hours)
  - Create organization_cycle_state table (tenant_id, current_stage, stage_history)
  - Implement advance_cycle_stage() function
  - Add stage transition tracking
  - **Deliverable:** Cycle stage management working

- [ ] **User Presence** (1.5 hours)
  - Create user_presence table (user_id, tenant_id, page_url, last_seen)
  - Implement WebSocket connection for presence
  - Add presence heartbeat (30s interval)
  - **Deliverable:** Live user presence tracking

- [ ] **Dataset Edit Locks** (1.5 hours)
  - Create dataset_edit_locks table (dataset_id, locked_by_user_id, locked_at)
  - Implement lock/unlock API endpoints
  - Add conflict detection
  - **Deliverable:** Concurrent edit protection

- [ ] **Organization Activity** (1 hour)
  - Create organization_activity table (tenant_id, user_id, activity_type, metadata)
  - Add activity stream API endpoint
  - **Deliverable:** Activity feed operational

**Day 2 Success Criteria:**
- [ ] Cycle stage advancement working
- [ ] User presence visible in real-time
- [ ] Dataset locks prevent conflicts
- [ ] Activity stream shows all tenant actions

#### Wednesday (Day 3): Role Management (5-6 hours)
**Goal:** Complete RBAC role management operational

- [ ] **User Invitations** (2 hours)
  - Create user_invitations table (token, email, tenant_id, role, invited_by, expires_at)
  - Implement invite_user_to_tenant() function
  - Add invitation email sending (optional for MVP)
  - **Deliverable:** User invitation system working

- [ ] **Team Management Functions** (3 hours)
  - Implement accept_invitation() function
  - Implement update_user_role() function
  - Implement remove_user_from_tenant() function
  - Add permission checks (only Owner/Admin can manage)
  - **Deliverable:** 4 team management functions operational

- [ ] **Team Management API** (1 hour)
  - GET /api/tenant/users (list team members)
  - POST /api/tenant/users (invite user)
  - PUT /api/tenant/users/:id (update role)
  - DELETE /api/tenant/users/:id (remove user)
  - GET /api/invitations/:token (get invitation)
  - POST /api/invitations/:token (accept invitation)
  - **Deliverable:** 6 team management endpoints working

**Day 3 Success Criteria:**
- [ ] Admins can invite users via email
- [ ] Users can accept invitations
- [ ] Admins can change user roles
- [ ] Admins can remove users from tenant
- [ ] Permission matrix enforced (Owner > Admin > Analyst > Viewer)

#### Thursday (Day 4): UI + Testing (4-5 hours)
**Goal:** Team management UI operational, integration tests passing

- [ ] **Authentication UI** (1 hour)
  - Create LoginPage component (Shadcn Card, Input, Button)
  - Add login form with email/password
  - Implement signInWithPassword() integration
  - **Deliverable:** LoginPage operational

- [ ] **Team Settings UI** (2 hours)
  - Create TeamSettingsPage component
  - Add team member list with roles (Shadcn Table, Avatar, Badge)
  - Implement InviteUserDialog (Shadcn Dialog, Form, Select)
  - Add UserActionsDropdown (Shadcn DropdownMenu)
  - Add RoleBadge component (Owner=Purple, Admin=Blue, Analyst=Gray, Viewer=Gray)
  - **Deliverable:** Team settings page operational

- [ ] **Invitation Acceptance UI** (1 hour)
  - Create AcceptInvitationPage component
  - Add invitation details display
  - Implement accept invitation button
  - Add error handling for expired invitations
  - **Deliverable:** Invitation acceptance flow working

- [ ] **Integration Tests** (1 hour)
  - Test full invitation flow (invite → accept → login)
  - Test role change flow
  - Test user removal flow
  - Test RLS isolation (Tenant A cannot see Tenant B users)
  - **Deliverable:** Integration tests passing

**Day 4 Success Criteria:**
- [ ] Users can log in via UI
- [ ] Team settings page shows all team members
- [ ] Admins can invite users via UI dialog
- [ ] Users can accept invitations via link
- [ ] Role badges display correctly
- [ ] All integration tests passing

#### Friday: Buffer + Week 2 Prep (1 day)
- [ ] **Bug Fixes** (2-3 hours)
  - Fix any issues from Days 1-4
  - Resolve test failures
  - Address UI/UX feedback

- [ ] **Documentation** (2 hours)
  - Document team management workflows
  - Create API endpoint reference
  - Write deployment notes

- [ ] **Week 2 Preparation** (1 hour)
  - Review ontology service requirements
  - Prepare 30+ ontology schemas
  - Set up development environment for agent work

**Week 1 Success Criteria:**
- [ ] All 4 PF-Core security modules operational (Auth, RBAC, Multi-Tenant, API Keys)
- [ ] Complete 4-tier RBAC working (Owner, Admin, Analyst, Viewer)
- [ ] Team management UI functional (invite, assign roles, remove users)
- [ ] 14 API endpoints operational
- [ ] 8 database tables created with RLS policies
- [ ] 6 database functions working
- [ ] 5 UI components deployed
- [ ] Integration tests passing (70%+ coverage)
- [ ] Production-ready multi-tenant isolation verified

---

### Week 2: Authentication + Ontology Services

**Sprint Goal:** Authentication working, full ontology CRUD operational

#### Monday-Tuesday: Authentication Service (WBS 2.3)
- [ ] **2.3.1 User Registration** (4 hours)
  - POST /auth/register endpoint
  - Password hashing (bcrypt)
  - Tenant assignment
  - **Test:** Can create new user

- [ ] **2.3.2 Login (JWT)** (4 hours)
  - POST /auth/login endpoint
  - JWT generation (access token + refresh token)
  - Token expiration (15 min / 7 days)
  - **Test:** Can login, receive JWT

- [ ] **2.3.3 Session Management** (2 hours)
  - GET /auth/me endpoint
  - JWT validation middleware
  - **Test:** Can retrieve current user

- [ ] **2.3.4 Middleware** (2 hours)
  - requireAuth middleware
  - requireRole middleware
  - Tenant context injection
  - **Test:** Protected routes enforce auth

**Deliverable:** Full authentication system operational

#### Wednesday-Friday: Ontology Service (WBS 2.4)
- [ ] **2.4.1 CRUD Endpoints** (8 hours)
  - POST /ontology (create)
  - GET /ontology (list with filters)
  - GET /ontology/:id (retrieve)
  - PUT /ontology/:id (update)
  - DELETE /ontology/:id (soft delete)
  - **Test:** All CRUD operations work

- [ ] **2.4.2 JSON-LD Validation** (4 hours)
  - Ajv schema validation
  - 30+ ontology type schemas
  - **Test:** Invalid ontology rejected

- [ ] **2.4.3 Type Discrimination** (2 hours)
  - Route to correct schema by @type
  - **Test:** Multiple ontology types handled

- [ ] **2.4.4 Query/Filter Support** (2 hours)
  - Filter by ontology_type
  - Filter by created_at range
  - Pagination support
  - **Test:** Can query ontologies by type

**Deliverable:** Full ontology CRUD API with validation

**Week 2 Success Criteria:**
- [ ] Can register user and login
- [ ] JWT authentication working
- [ ] Can CRUD ontologies with tenant isolation
- [ ] 70%+ test coverage on auth + ontology modules

---

### Week 3: Design Bridge + Agent Infrastructure

**Sprint Goal:** Dashboard foundation ready, agent execution framework operational

#### Monday-Tuesday: Design Bridge (WBS 1.3)
- [ ] **1.3.1 Import Design System Tokens** (4 hours)
  - Extract tokens from **DASHBOARD_TEMPLATES.md v1.0.0 Section 6**
  - BAIV color palette (primary: #00A4BF, secondary: #019587, accent: #E84E1C, etc.)
  - Spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
  - Typography (Headings: Inter, Body: Inter, Mono: JetBrains Mono)
  - Create tokens.ts file
  - **Deliverable:** Design tokens file

- [ ] **1.3.2 Build Component Library** (8 hours)
  - Implement 20+ widgets per **DASHBOARD_TEMPLATES.md v1.0.0 Section 3**
  - **Citation Widgets:** CitationRateCard, PlatformComparisonChart, RPITrendLine
  - **Gap Widgets:** GapPriorityList, TopicCoverageHeatmap, OpportunityScoreGauge
  - **Content Widgets:** ContentVelocityChart, PublishingCalendar, ContentPerformanceTable
  - **Performance Widgets:** AuditVelocityTrend, AgentAccuracyGauge, ErrorRateSparkline
  - **Business Widgets:** MRRTrendChart, ClientHealthScore, NPS Widget
  - Use Tailwind CSS with BAIV design tokens
  - **Deliverable:** Reusable component library

- [ ] **1.3.3 Setup Figma Integration** (2 hours)
  - Configure Figma plugin (optional for MVP)
  - Document Figma → Code workflow
  - **Deliverable:** Figma integration documented

- [ ] **1.3.4 Create Dashboard Templates** (2 hours)
  - 5 BSC perspective templates
  - Executive Overview template
  - **Deliverable:** Dashboard layout templates

**Deliverable:** Design system ready for dashboard implementation

#### Wednesday-Friday: Agent Infrastructure (WBS 3.1)
- [ ] **3.1.1 Agent Registry API** (4 hours)
  - GET /agents (list all agents)
  - GET /agents/:id (agent details)
  - **Test:** Can retrieve agent list

- [ ] **3.1.2 Execution Tracking** (4 hours)
  - POST /agents/:id/execute (trigger agent)
  - agent_executions table tracking
  - Status: pending → running → completed/failed
  - **Test:** Can execute agent, track status

- [ ] **3.1.3 Resource Limits** (2 hours)
  - 5-minute timeout per execution
  - Memory limit enforcement
  - **Test:** Long-running agent times out

- [ ] **3.1.4 Error Handling** (2 hours)
  - Structured error responses
  - Retry logic (3 attempts)
  - **Test:** Failed execution logged correctly

**Deliverable:** Agent execution framework operational

**Week 3 Success Criteria:**
- [ ] Design system with 20+ components ready
- [ ] Can execute agents via API
- [ ] Execution status tracked in database
- [ ] Error handling working

---

### Week 4: Core Agents Implementation

**Sprint Goal:** 3 core agents (Discovery, Citation Tester, Gap Analyzer) fully functional

#### Monday-Tuesday: Discovery Agent (WBS 3.2)

**Agent PRD Reference:** Create agent PRD following **PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0**
- Agent ID: `BAIV-discovery-client-context-agent`
- Tier: Primary
- Cluster: Discovery
- 14-Section compliance: P0.1-P0.14 complete

- [ ] **3.2.1 Website Crawling** (6 hours)
  - Implement website fetcher (axios/cheerio)
  - Handle redirects, timeouts
  - **Test:** Can fetch HTML from URL

- [ ] **3.2.2 Schema.org Parsing** (6 hours)
  - Extract JSON-LD from <script> tags
  - Parse schema.org Organization, WebSite types
  - **Test:** Can extract structured data

- [ ] **3.2.3 Context Extraction** (4 hours)
  - Extract company info (name, description, industry)
  - Extract product/service info
  - **Test:** Client context captured

- [ ] **3.2.4 Client-Context Ontology Creation** (4 hours)
  - Map extracted data to client-context ontology
  - Store in ontology_data table
  - **Test:** Discovery agent creates ontology

**Deliverable:** Discovery Agent operational

#### Wednesday-Thursday: Citation Tester Agent (WBS 3.3)

**Agent PRD Reference:** Create agent PRD following **PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0**
- Agent ID: `BAIV-analysis-citation-tester-agent`
- Tier: Primary
- Cluster: Analysis
- 14-Section compliance: P0.1-P0.14 complete

- [ ] **3.3.1 Multi-Platform Integration** (8 hours)
  - OpenAI API (ChatGPT)
  - Anthropic API (Claude)
  - Perplexity API
  - Google Gemini API
  - **Test:** Can query all 4 platforms

- [ ] **3.3.2 Query Execution** (4 hours)
  - Batch query execution
  - Rate limit handling
  - **Test:** Can send 25 queries

- [ ] **3.3.3 Citation Detection** (4 hours)
  - Parse response text for URLs/company names
  - Detect citation presence
  - Extract citation position
  - **Test:** Citation detected correctly

- [ ] **3.3.4 RPI Score Calculation** (4 hours)
  - Calculate Ranked Position Index
  - Store in audit.results (JSONB)
  - **Test:** RPI calculated correctly

**Deliverable:** Citation Tester Agent operational

#### Friday: Gap Analyzer Agent (WBS 3.4)

**Agent PRD Reference:** Create agent PRD following **PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0**
- Agent ID: `BAIV-analysis-gap-analyzer-agent`
- Tier: Primary
- Cluster: Analysis
- 14-Section compliance: P0.1-P0.14 complete

- [ ] **3.4.1 Citation Result Analysis** (4 hours)
  - Load audit results from JSONB
  - Group by query/topic
  - **Test:** Can load citation data

- [ ] **3.4.2 Gap Identification** (4 hours)
  - Find queries where competitors cited > 0, client = 0
  - Calculate gap severity
  - **Test:** Gaps identified

- [ ] **3.4.3 Priority Scoring** (2 hours)
  - P0: High volume + high competitor presence
  - P1: Medium volume or medium competitor presence
  - P2: Low volume + low competitor presence
  - **Test:** Priorities calculated

- [ ] **3.4.4 Gap-Analysis Ontology Creation** (2 hours)
  - Create gap-analysis ontology for each gap
  - Store recommendations
  - **Test:** Gap ontologies created

**Deliverable:** Gap Analyzer Agent operational

**Week 4 Success Criteria:**
- [ ] Discovery Agent can analyze websites
- [ ] Citation Tester queries 4 platforms
- [ ] Gap Analyzer identifies opportunities
- [ ] All 3 agents tested end-to-end

---

### Week 5: Dashboard Implementation + Integration

**Sprint Goal:** Dashboard live, end-to-end workflow operational

#### Monday-Wednesday: Dashboard Implementation (WBS 4.0)
- [ ] **4.1 Frontend Application** (2 days)
  - Create React + TypeScript app (Vite)
  - Implement component library
  - Setup routing (React Router)
  - State management (Context API)
  - **Deliverable:** React app running

- [ ] **4.2 5-Perspective BSC** (2 days) - **Reference: DASHBOARD_TEMPLATES.md Section 2**
  - Executive Overview (5 KPI cards per Section 2.1)
    - AI Visibility Score (0-100)
    - Citation Rate (%)
    - Content Velocity (pieces/week)
    - Gap Closure Rate (%)
    - Client Health (NPS)
  - Financial Perspective (Section 2.2.1): MRR Trend, LTV, Revenue/Client, LTV:CAC Ratio
  - Customer Perspective (Section 2.2.2): Citation Rate, NPS, Retention, Citation Satisfaction
  - Process Perspective (Section 2.2.3): Audit Velocity, Content Throughput, Gap Closure Rate
  - Learning Perspective (Section 2.2.4): Agent Accuracy, Model Improvements, Error Rate
  - Stakeholder Perspective (Section 2.2.5): Partner Revenue, Affiliate Conversions, Agency Count
  - **Deliverable:** BSC dashboard complete per specifications

- [ ] **4.3 Data Views** (1 day)
  - Audit Results Table (citation data)
  - Gap Analysis List (prioritized gaps)
  - Client Context Display
  - Agent Execution Logs
  - **Deliverable:** Data views complete

#### Thursday-Friday: Integration & Polish (WBS 5.1, 5.2)
- [ ] **5.1 Infrastructure Setup** (1 day)
  - Deploy API to DigitalOcean App Platform
  - Deploy frontend as static site
  - Configure environment variables
  - Setup custom domain (baiv.app)
  - **Deliverable:** Staging environment live

- [ ] **End-to-End Testing**
  - Complete workflow: Login → Discover → Citation Test → Gap Analysis → View Results
  - Fix integration bugs
  - Performance optimization
  - **Deliverable:** E2E workflow functional

**Week 5 Success Criteria:**
- [ ] Dashboard displays real data
- [ ] Can complete full workflow without errors
- [ ] API + frontend deployed to staging
- [ ] Performance < 2 sec API response

---

### Week 6: Testing, Documentation, Launch

**Sprint Goal:** Production-ready MVP, first customer onboarded

#### Monday-Tuesday: Testing (WBS 5.3)
- [ ] **Integration Testing**
  - Run full test suite (Jest + supertest)
  - 70%+ coverage verification
  - **Deliverable:** All tests passing

- [ ] **Manual Testing**
  - Test all 3 agents
  - Test multi-tenant isolation
  - Test RBAC permissions (4 roles)
  - **Deliverable:** Manual test checklist complete

- [ ] **Load Testing**
  - Apache Bench: 100 concurrent requests
  - Verify <2 sec response time
  - **Deliverable:** Performance acceptable

#### Wednesday-Thursday: Documentation (WBS 5.4)
- [ ] **5.4.1 User Guide** (4 hours)
  - Getting started guide
  - How to run citation tests
  - How to interpret results
  - **Deliverable:** User documentation

- [ ] **5.4.2 API Documentation** (4 hours)
  - OpenAPI spec (BAIV_API_SPECIFICATION.yaml)
  - Postman collection
  - **Deliverable:** API docs published

- [ ] **5.4.3 Deployment Guide** (2 hours)
  - Infrastructure setup steps
  - Environment configuration
  - **Deliverable:** Deployment guide

- [ ] **5.4.4 Runbook** (2 hours)
  - Common issues and resolutions
  - Monitoring procedures
  - **Deliverable:** Operations runbook

#### Friday: Launch
- [ ] **Production Deployment**
  - Final production deployment
  - Verify SSL certificate
  - Setup monitoring (UptimeRobot)
  - Create first production tenant
  - **Deliverable:** Production system live

- [ ] **First Customer Onboarding**
  - Onboard beta customer
  - Run first citation test
  - Collect feedback
  - **Deliverable:** First customer using system

- [ ] **Launch Announcement**
  - Announce on LinkedIn
  - Email beta list
  - **Deliverable:** Launch announced

**Week 6 Success Criteria:**
- [ ] All tests passing (70%+ coverage)
- [ ] Documentation complete
- [ ] Production system live with 99.5% uptime
- [ ] First customer onboarded successfully

---

## 5. PF-Core Module Integration Checklist

### 5.1 Value Engineering Modules (10 modules)

- [ ] **VSOM (Vision, Strategy, Objectives, Metrics)** - PFC-Only
  - [ ] Vision statement defined
  - [ ] Strategic objectives set (5 perspectives)
  - [ ] Success metrics configured
  - [ ] Context loaded into ve-context ontology

- [ ] **OKR Module** - Transferable
  - [ ] Marketing OKRs created (3 objectives)
  - [ ] Key results linked to BAIV metrics
  - [ ] Progress tracking configured
  - [ ] OKR dashboard widget implemented

- [ ] **PMF Module** - Transferable
  - [ ] PMF survey created
  - [ ] Target threshold set (>40%)
  - [ ] Survey triggers configured
  - [ ] PMF score tracking in Customer BSC

- [ ] **VE-RRR (Roles, RACI, RBAC)** - Transferable
  - [ ] BAIV RRR-VSOM role hierarchy defined
  - [ ] RACI matrix mapped to workflows
  - [ ] RBAC permissions configured (4 roles)
  - [ ] Role-to-objective assignment complete

- [ ] **VE-Metrics/KPI Tree** - Transferable
  - [ ] KPI hierarchy built (Strategic → Operational → Activity)
  - [ ] Ontology-to-metrics mapping complete
  - [ ] 5-Perspective BSC metrics defined
  - [ ] KPI dashboard widgets configured

- [ ] **VE-Value Proposition** - Transferable
  - [ ] ICP profile defined (B2B SaaS Marketing Leaders)
  - [ ] Value propositions documented
  - [ ] Positioning statements created
  - [ ] Competitive differentiators defined

- [ ] **VE-UI/UC (User Interface/Use Case)** - Transferable
  - [ ] UI patterns documented (20+ widgets)
  - [ ] Use case flows mapped (Discover → Test → Analyze → Create → Publish)
  - [ ] Interaction models defined
  - [ ] State management patterns implemented

- [ ] **VE-PF Instance Config Management** - Transferable
  - [ ] Tenant configuration schema defined
  - [ ] Feature flags configured
  - [ ] Integration config (API keys) secured
  - [ ] Usage limits set (audit limits, content quotas)

- [ ] **VE-Business Models** - Transferable
  - [ ] Pricing tiers defined (Starter, Pro, Enterprise)
  - [ ] Revenue model documented (subscription + usage)
  - [ ] Usage limits configured per tier
  - [ ] Billing integration planned (Stripe)

- [ ] **VE-OAA Architect (Ontology Architect Agent)** - Transferable
  - [ ] 30+ BAIV ontologies registered
  - [ ] Validation rules set (JSON-LD schema)
  - [ ] Agent-to-ontology bindings defined
  - [ ] Ontology governance process documented

### 5.2 Security Modules (4 modules)

- [ ] **PFC-SEC-Auth-Foundation** - Transferable
  - [ ] JWT authentication implemented
  - [ ] OAuth providers configured (optional for MVP)
  - [ ] MFA enabled (optional for MVP)
  - [ ] Session management operational

- [ ] **PFC-SEC-RBAC-Foundation** - Transferable
  - [ ] 4 roles defined (Owner, Admin, Analyst, Viewer)
  - [ ] 40+ permissions mapped
  - [ ] Role-to-permission assignment complete
  - [ ] Permission checks enforced in API

- [ ] **PFC-SEC-Multi-Tenant-Isolation** - Transferable
  - [ ] RLS policies enabled (6 tables)
  - [ ] Tenant context injection working
  - [ ] Cross-tenant access blocked
  - [ ] Tenant isolation tested

- [ ] **PFC-SEC-API-Key-Management** - Transferable
  - [ ] API key generation implemented
  - [ ] 90/180 day rotation policy set
  - [ ] Key scoping (tenant + permissions)
  - [ ] Key revocation working

### 5.3 Design Modules (6 modules)

- [ ] **PFC-DSN-Design-System** - Transferable
  - [ ] Design tokens extracted (BAIV tokens)
  - [ ] Color palette defined
  - [ ] Spacing scale configured
  - [ ] Typography system set

- [ ] **PFC-DSN-Component-Library** - Transferable
  - [ ] 20+ widgets implemented
  - [ ] Component documentation complete
  - [ ] Storybook setup (optional)
  - [ ] Component testing (Jest + RTL)

- [ ] **PFC-DSN-Figma-Bridge** - Transferable
  - [ ] Figma integration documented
  - [ ] Design-to-Code workflow defined
  - [ ] Figma plugin configured (optional)
  - [ ] Design sync process documented

- [ ] **PFC-DSN-Navigation-Manager** - Transferable
  - [ ] Nav hierarchy defined
  - [ ] Access controls per role
  - [ ] Breadcrumb navigation
  - [ ] Mobile navigation pattern

- [ ] **PFC-DSN-Scorecard-Analytics** - Transferable
  - [ ] 5-Perspective BSC configured
  - [ ] Analytics widgets implemented
  - [ ] Real-time updates (WebSocket)
  - [ ] Export functionality (CSV, PDF)

- [ ] **PFC-DSN-D2C (Design-to-Code)** - Transferable (Post-MVP)
  - [ ] Figma Make configured
  - [ ] Code generation rules set
  - [ ] Component mapping defined
  - [ ] CI/CD integration planned

### 5.4 CRM Modules (2 modules)

- [ ] **PFC-CRM-Customer-Organization** - Transferable
  - [ ] Client profile schema defined
  - [ ] ICP fields configured
  - [ ] Organization hierarchy support
  - [ ] Client-context ontology integrated

- [ ] **PFC-CRM-Partner-Management** - Transferable (Post-MVP)
  - [ ] Partner tiers defined
  - [ ] Revenue share configuration
  - [ ] Affiliate tracking
  - [ ] Partner dashboard planned

### 5.5 Agent Management Modules (2 modules)

- [ ] **PFC-OAA-Agent-Registry** - PFC-Only
  - [ ] 16 agents registered
  - [ ] Agent metadata complete
  - [ ] Orchestration rules defined
  - [ ] Agent versioning supported

- [ ] **PFC-OAA-Ontology-Registry** - PFC-Only
  - [ ] 30+ ontologies registered
  - [ ] Ontology versioning supported
  - [ ] Schema validation configured
  - [ ] Registry API operational

### 5.6 Agentic Builder Modules (6 modules - PFC-Only)

- [ ] **AB-Program-Manager** - PFC-Only
  - [ ] Program roadmap defined
  - [ ] Milestone gates set
  - [ ] Cross-instance coordination planned

- [ ] **AB-Platform-Manager** - PFC-Only
  - [ ] Infrastructure configured
  - [ ] Scaling policies defined
  - [ ] Performance monitoring active

- [ ] **AB-Product-Manager** - PFC-Only
  - [ ] Product backlog prioritized
  - [ ] Feature requirements documented
  - [ ] User story mapping complete

- [ ] **AB-Solution-Architect** - PFC-Only
  - [ ] Architecture docs created (15 artifacts)
  - [ ] Tech standards defined
  - [ ] Integration patterns documented

- [ ] **AB-Solution-Builder** - PFC-Only
  - [ ] PRD created (this document)
  - [ ] PBS breakdown complete
  - [ ] WBS tasks defined

- [ ] **AB-Test-Driven-Design** - PFC-Only
  - [ ] Test strategy defined (BAIV_TESTING_STRATEGY.md)
  - [ ] Test cases created
  - [ ] 70%+ coverage target set
  - [ ] CI/CD testing configured

---

## 6. Testing & Validation Strategy

### 6.1 Test Driven Design (AB-TDD Module)

Following PF-Core AB-Test-Driven-Design module, implement tests before code:

**Test Pyramid (Inverted for MVP):**
- 50% Integration Tests
- 20% Unit Tests
- 30% Manual Testing

### 6.2 Integration Tests (Jest + Supertest)

```typescript
describe('BAIV MVP Integration Tests', () => {
  describe('PF-Core Integration', () => {
    test('VSOM context loads correctly', async () => {
      const context = await getVSOMContext();
      expect(context.vision).toBeDefined();
      expect(context.objectives).toHaveLength(5);
    });

    test('RBAC enforces role permissions', async () => {
      const analyst = await login('analyst@test.com');
      const response = await request(app)
        .delete('/agents/1')
        .auth(analyst.token, { type: 'bearer' });
      expect(response.status).toBe(403); // Forbidden
    });

    test('Multi-tenant isolation works', async () => {
      const tenant1 = await login('user1@tenant1.com');
      const tenant2 = await login('user2@tenant2.com');
      
      const ontology = await createOntology(tenant1.token, { type: 'client-context' });
      const response = await request(app)
        .get(`/ontology/${ontology.id}`)
        .auth(tenant2.token, { type: 'bearer' });
      expect(response.status).toBe(404); // Not found for other tenant
    });
  });

  describe('Agent Execution', () => {
    test('Discovery Agent creates client-context ontology', async () => {
      const token = await login('manager@test.com');
      const execution = await request(app)
        .post('/agents/discovery/execute')
        .auth(token, { type: 'bearer' })
        .send({ url: 'https://example.com' });
      
      expect(execution.status).toBe(202); // Accepted
      
      // Poll for completion
      await waitForCompletion(execution.body.execution_id);
      
      const ontologies = await request(app)
        .get('/ontology?type=client-context')
        .auth(token, { type: 'bearer' });
      
      expect(ontologies.body.data).toHaveLength(1);
      expect(ontologies.body.data[0].data.name).toBe('Example Company');
    });

    test('Citation Tester queries 4 platforms', async () => {
      const token = await login('manager@test.com');
      const execution = await request(app)
        .post('/agents/citation-tester/execute')
        .auth(token, { type: 'bearer' })
        .send({ 
          queries: ['What is example.com?'],
          platforms: ['chatgpt', 'claude', 'perplexity', 'gemini']
        });
      
      await waitForCompletion(execution.body.execution_id);
      
      const audit = await request(app)
        .get(`/audits/${execution.body.audit_id}`)
        .auth(token, { type: 'bearer' });
      
      expect(audit.body.results.platforms).toHaveLength(4);
    });

    test('Gap Analyzer identifies opportunities', async () => {
      const token = await login('manager@test.com');
      
      // First run citation test
      const citationExec = await executeCitationTest(token);
      
      // Then run gap analyzer
      const gapExec = await request(app)
        .post('/agents/gap-analyzer/execute')
        .auth(token, { type: 'bearer' })
        .send({ audit_id: citationExec.audit_id });
      
      await waitForCompletion(gapExec.body.execution_id);
      
      const gaps = await request(app)
        .get('/ontology?type=gap-analysis')
        .auth(token, { type: 'bearer' });
      
      expect(gaps.body.data.length).toBeGreaterThan(0);
      expect(gaps.body.data[0].data.priority).toMatch(/P0|P1|P2/);
    });
  });

  describe('Dashboard Integration', () => {
    test('5-Perspective BSC displays metrics', async () => {
      const token = await login('manager@test.com');
      const bsc = await request(app)
        .get('/dashboard/bsc')
        .auth(token, { type: 'bearer' });
      
      expect(bsc.body).toHaveProperty('financial');
      expect(bsc.body).toHaveProperty('customer');
      expect(bsc.body).toHaveProperty('process');
      expect(bsc.body).toHaveProperty('learning');
      expect(bsc.body).toHaveProperty('stakeholder');
    });
  });
});
```

### 6.3 Unit Tests

```typescript
describe('VSOM Context Loading', () => {
  test('loads strategic objectives', () => {
    const vsom = loadVSOM();
    expect(vsom.objectives).toHaveProperty('financial');
    expect(vsom.objectives).toHaveProperty('customer');
    expect(vsom.objectives).toHaveProperty('process');
    expect(vsom.objectives).toHaveProperty('learning');
    expect(vsom.objectives).toHaveProperty('stakeholder');
  });
});

describe('JWT Validation', () => {
  test('valid JWT passes', () => {
    const token = generateJWT({ user_id: 1, tenant_id: 1 });
    const decoded = validateJWT(token);
    expect(decoded.user_id).toBe(1);
  });

  test('expired JWT fails', () => {
    const token = generateJWT({ user_id: 1 }, { expiresIn: '-1h' });
    expect(() => validateJWT(token)).toThrow('jwt expired');
  });
});

describe('RPI Score Calculation', () => {
  test('calculates RPI correctly', () => {
    const citations = [
      { position: 1, cited: true },
      { position: 2, cited: false },
      { position: 3, cited: true }
    ];
    const rpi = calculateRPI(citations);
    expect(rpi).toBeCloseTo(0.67, 2);
  });
});
```

### 6.4 Manual Testing Checklist

- [ ] **Authentication**
  - [ ] Can register new user
  - [ ] Can login with email/password
  - [ ] JWT expires after 15 minutes
  - [ ] Can refresh token
  - [ ] Logout clears session

- [ ] **RBAC (4 Roles)**
  - [ ] Owner can manage all resources + delete tenant
  - [ ] Admin can manage team + advance stage + full data access
  - [ ] Analyst can execute agents + view/edit own data
  - [ ] Viewer can only view data (read-only)

- [ ] **Multi-Tenant Isolation**
  - [ ] Tenant A cannot see Tenant B's data
  - [ ] Tenant context switches correctly
  - [ ] RLS policies enforced

- [ ] **Team Management (NEW in v2.4.0)**
  - [ ] Owner/Admin can invite users via email
  - [ ] Invited users receive invitation link
  - [ ] Users can accept invitation and join tenant
  - [ ] Owner/Admin can change user roles
  - [ ] Owner/Admin can remove users from tenant
  - [ ] Analyst/Viewer cannot manage team

- [ ] **Discovery Agent**
  - [ ] Can analyze website
  - [ ] Extracts schema.org data
  - [ ] Creates client-context ontology
  - [ ] Handles errors gracefully

- [ ] **Citation Tester Agent**
  - [ ] Queries all 4 platforms
  - [ ] Detects citations correctly
  - [ ] Calculates RPI score
  - [ ] Stores results in audit

- [ ] **Gap Analyzer Agent**
  - [ ] Loads citation results
  - [ ] Identifies gaps
  - [ ] Calculates priorities (P0/P1/P2)
  - [ ] Creates gap-analysis ontologies

- [ ] **Dashboard**
  - [ ] 5-Perspective BSC displays correctly
  - [ ] Metrics update in real-time
  - [ ] Charts render correctly
  - [ ] Responsive on mobile

---

## 7. Deployment & Launch Plan

### 7.1 DigitalOcean Deployment

**Infrastructure:**
- **App Platform:** Node.js API + React frontend
- **Managed PostgreSQL:** 2 GB RAM, 10 GB storage
- **Environment:** Production + Staging
- **Cost:** ~$20/month

**Deployment Steps:**
1. Create DigitalOcean account
2. Create App from GitHub repo
3. Add managed PostgreSQL database
4. Configure environment variables
5. Deploy to staging
6. Run smoke tests
7. Deploy to production

### 7.2 Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@db.digitalocean.com:25060/baiv

# JWT
JWT_SECRET=<random-256-bit-secret>
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# API Keys (Platform Integrations)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PERPLEXITY_API_KEY=pplx-...
GOOGLE_AI_API_KEY=AIza...

# App Config
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://app.baiv.io

# PF-Core Config
VSOM_CONFIG_PATH=./config/vsom.json
OKR_CONFIG_PATH=./config/okr.json
RBAC_CONFIG_PATH=./config/rbac.json
```

### 7.3 Monitoring & Alerting

- **Uptime Monitoring:** UptimeRobot (free tier)
  - Health check: https://api.baiv.io/health
  - Check interval: 5 minutes
  - Alert via email

- **Error Tracking:** (Optional for MVP)
  - Sentry for error reporting
  - Slack integration for critical errors

- **Performance Monitoring:**
  - API response time tracking
  - Database query performance
  - Agent execution duration

### 7.4 Launch Checklist

- [ ] **Pre-Launch**
  - [ ] All tests passing (70%+ coverage)
  - [ ] Security audit complete
  - [ ] Performance testing passed
  - [ ] Documentation complete
  - [ ] Staging environment verified

- [ ] **Launch Day**
  - [ ] Deploy to production
  - [ ] Verify SSL certificate
  - [ ] Test production health endpoint
  - [ ] Create first production tenant
  - [ ] Onboard beta customer
  - [ ] Monitor for errors

- [ ] **Post-Launch**
  - [ ] Announce on LinkedIn
  - [ ] Email beta list
  - [ ] Monitor uptime (target: 99.5%)
  - [ ] Collect user feedback
  - [ ] Plan post-MVP features

---

## Summary

This updated MVP To-Do Plan integrates **22 PF-Core modules** with the **BAIV instance** using a structured PRD-PBS-WBS approach:

**PRD:** Defines product vision (VSOM), business requirements (VE framework), and functional requirements  
**PBS:** Breaks down product into 5 major components (Integration, Foundation, Agents, Dashboard, Deployment)  
**WBS:** Provides detailed work breakdown with durations, dependencies, and deliverables

### PBS Scope & Context Summary

The **Product Breakdown Structure (PBS)** for the BAIV MVP establishes a hierarchical decomposition of deliverable-oriented components that collectively realize the AI Visibility Platform vision. The PBS scope encompasses **5 Level-1 components** (PF-Core Integration Layer, Foundation Services, Agent Services, Dashboard Services, Deployment & Operations) which further decompose into **20 Level-2 sub-components** and **80+ Level-3 work packages**. This structure ensures complete traceability from strategic product requirements (PRD Section 1) through tactical implementation tasks (WBS Section 3), enabling systematic delivery of all functional capabilities including Supabase-based authentication, 30+ ontology management, 3 core AI agents (Discovery, Citation Tester, Gap Analyzer), and a 5-Perspective Balanced Scorecard dashboard. Each PBS component maintains explicit dependencies, effort estimates, and integration points with PF-Core modules, forming a coherent architecture that supports the 6-week MVP timeline while ensuring alignment with non-functional requirements for performance (<2 sec response), security (SOC 2, GDPR), and scalability (100 concurrent users).

The PBS architecture addresses the complete product lifecycle from foundational infrastructure through operational deployment, with particular emphasis on the **4 Integration Bridges** (Value Engineering, Security, Design, Agent Orchestration) that connect 22 PF-Core platform modules to BAIV instance-specific capabilities. Foundation Services (PBS 2.0) implement the Supabase backend architecture as corrected in v2.1.0, replacing the original DigitalOcean/Express specification with direct Supabase Client SDK integration, Supabase Auth for authentication, and RLS policies for multi-tenant isolation. Agent Services (PBS 3.0) deliver the core AI Visibility capabilities through three priority agents following the PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0, with full execution tracking and resource management. Dashboard Services (PBS 4.0) provide the user interface via React/TypeScript with 20+ reusable widgets specified in DASHBOARD_TEMPLATES.md v1.0.0, while Deployment & Operations (PBS 5.0) ensure production readiness through Supabase + frontend hosting, CI/CD pipelines, comprehensive monitoring, and complete documentation. This PBS structure enables parallel development tracks while maintaining clear integration checkpoints documented in the WBS dependency network.

**Key Improvements over v2.3.0:**
- ✅ Week 1 Unified Security Foundation (Auth + RLS + RBAC + Multi-user + Team Management)
- ✅ Complete 4-tier RBAC operational by Day 3 (Owner, Admin, Analyst, Viewer)
- ✅ Team management UI delivered in Week 1 (invite, assign roles, remove users)
- ✅ 14 API endpoints operational by Day 3
- ✅ 8 database tables with RLS policies created by Day 2
- ✅ 6 database functions for team management by Day 3
- ✅ 5 UI components (LoginPage, TeamSettingsPage, InviteUserDialog, AcceptInvitationPage, RoleBadge)
- ✅ Production-ready security foundation by end of Week 1

**Key Improvements over v1.0:**
- ✅ Full PF-Core integration via 4 bridges (VE, Security, Design, Agent Orchestration)
- ✅ Strategic alignment with VSOM and OKR frameworks
- ✅ Comprehensive RBAC with 4 roles and multi-tenant isolation
- ✅ Design system with 20+ reusable widgets
- ✅ TDD approach with 70%+ coverage target
- ✅ Structured WBS with 35 days of tasks (compressed to 6 weeks)

**Ready for Implementation:** Week 1, Day 1 starts with Unified Security Foundation (Auth + RLS + Audit).

---

**Document Version:** 2.4.0  
**Status:** 🟢 Active  
**Duration:** 6 weeks  
**Budget:** ~$200/month  
**Team:** 1-2 developers + 1 part-time designer  

**Related Documents:**
- BAIV_MVP_ROADMAP v1.0.0
- PFC-PFI-BAIV_MODULE_CATALOG v1.0.0
- BAIV_PRD_PFC_Integration v2.0
- **PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0** (Universal Agent Template)
- **DASHBOARD_TEMPLATES.md v1.0.0** (UI/UX Specifications)
- **UNIFIED_SECURITY_FOUNDATION_MVP_v1.0.md** (Week 1 Security Plan)
- **ROLE_MANAGEMENT_MINI_PRD_v1.0.md** (Team Management Specifications)
- BAIV_ONTOLOGY_REGISTRY.md v1.0.0
- BAIV_DATABASE_SCHEMA.sql v1.0.0
- BAIV_API_SPECIFICATION.yaml v1.0.0
- BAIV_TESTING_STRATEGY.md v1.0.0
- BAIV_DEPLOYMENT_GUIDE.md v1.0.0

---

**Co-Authored-By:** Warp <agent@warp.dev>
