# BAIV MVP To-Do Plan v2.3.0

**PFC-PFI-BAIV Integrated Implementation Plan**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 2.3.0 |
| **Date** | January 1, 2026 |
| **Purpose** | Updated MVP To-Do Plan with Unified Registry Architecture |
| **Status** | 🟢 Active |
| **Timeline** | 6 weeks (Q1 2026) |
| **Audit Document** | BAIV_ARCHITECTURE_AUDIT_v1.0.md |
| **Corrections** | Database (Supabase), Auth (Supabase Auth), Deployment (Supabase + frontend hosting) |
| **New in v2.3.0** | Agent Template updated to Unified Template v3.0.0 (95% aligned) |
| **New in v2.2.0** | Unified Registry & Orchestration Bridge (agents + ontologies + data contracts) |
| **Base Documents** | BAIV_MVP_ROADMAP v1.0.0, PFC-PFI-BAIV_MODULE_CATALOG v1.0.0, ARCHITECTURE_MASTER.md v0.1.0, runtime-agentic-backend-architecture.md v1.0 |
| **Integration Pattern** | 4 Bridges (VE, Security, Design, Agent Orchestration) |
| **Agent Template** | PF-Core Unified Agent Specification Template v3.0.0 (14-Section + Appendices) |
| **Alignment Analysis** | BAIV_MVP_TEMPLATE_v3.0.0_ALIGNMENT_ANALYSIS.md |
| **Design/UI Specs** | DASHBOARD_TEMPLATES.md v1.0.0, PFC-DSN-Design-System, PFC-DSN-Component-Library |

---

## Change Control Note

**Version 2.3.0 Update - January 1, 2026**

**Change Summary:** Agent template alignment with PF-Core Unified Agent Specification Template v3.0.0

**Rationale:**
- PF-Core templates merged: Solution Architect v2.0 + Agentic Framework v2.1.0 → Unified v3.0.0
- Unified template includes database schema, JSON-LD format, RBAC, Claude config, agent catalog
- 100% backward compatible with v2.0.0 (all 14 sections preserved)

**Impact Assessment:**
- **Alignment Status:** ✅ 95% aligned (BAIV_MVP_TEMPLATE_v3.0.0_ALIGNMENT_ANALYSIS.md)
- **Breaking Changes:** None - v3.0.0 is additive only
- **Code Changes Required:** None - documentation updates only
- **Benefits:** Enhanced agent governance, clearer RBAC model, improved registry integration

**Changes Made:**
1. **Line 17:** Agent Template reference updated from v2.0.0 → v3.0.0
2. **Line 18:** Added alignment analysis document reference
3. **Line 47:** Updated agent compliance note to v3.0.0 (14-Section + Appendices)
4. **Line 115:** Updated agent orchestration template reference to v3.0.0
5. **Line 119:** Added appendices note (Database Schema, JSON-LD, Agent Catalog, Code Examples)
6. **Line 169:** Updated implementation standards reference to v3.0.0

**Next Steps (Recommended - Optional):**
- Phase 1 (P0): Add BAIV agents to unified template Appendix C catalog (30 min)
- Phase 2 (P1-P2): Enhance agent specs with RBAC, bindings, Claude config (2 hours)
- Phase 3 (P3): Create full v3.0.0 PRDs for 3 agents (6 hours)

**Approval:**
- **Author:** Agentic Engineer + Solution Architect
- **Reviewed By:** Template Consolidation Analysis v1.0.0
- **Status:** Approved - v3.0.0 adoption confirms alignment with unified registry architecture

---

## Executive Summary

This updated MVP To-Do Plan integrates **Platform Foundation Core (PF-Core)** modules with the **BAIV instance** using the 4-Bridge integration architecture. The plan addresses your specific request for PRD-PBS-WBS structured approach for build, develop, and deploy phases.

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
- **Foundation:** PF-Core bridges + Supabase + Supabase Auth
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
   - 4-tier RBAC via Supabase RLS policies (Admin, Manager, Analyst, Viewer)
   - Multi-tenant isolation via RLS + tenant_id (PFC-SEC-Multi-Tenant-Isolation)
   - API key management via Supabase Service Role Key (90/180 day rotation)

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

The PBS decomposition follows **Work Breakdown Structure (WBS)** principles, enabling effort estimation, dependency tracking, and resource allocation across the 6-week MVP timeline. All 5 Level-1 components (Integration Layer, Foundation Services, Agent Services, Dashboard Services, Deployment & Operations) collectively deliver the complete BAIV product capabilities defined in the PRD, with explicit dependencies and integration points documented in Section 3 (WBS Dictionary).

### 2.0 PRD Summary for PBS Context

**Product Vision (PRD 1.1):** Enable B2B SaaS companies to achieve measurable AI Visibility through ontology-driven content optimization, powered by PF-Core strategic alignment and 16 specialized agents.

**Core Capabilities Mapped to PBS:**
- **Authentication & Authorization** (PRD 1.3.1) → PBS 2.3: Supabase Auth with RLS-based RBAC, multi-tenant isolation
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
    PF-Core Integration Layer (WBS 1.0)     :active, w1a, 2026-01-06, 2d
    Database Layer (WBS 2.1)                :active, w1b, 2026-01-08, 1d
    API Layer Start (WBS 2.2)               :active, w1c, 2026-01-09, 2d
    
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

### Week 1: PF-Core Bridges + Foundation

**Sprint Goal:** Integration bridges configured, database operational, API foundation ready

#### Monday-Tuesday: PF-Core Integration Layer (WBS 1.0)
- [ ] **1.1 Value Engineering Bridge** (1 day)
  - Load VSOM strategic context (vision, objectives, metrics)
  - Configure OKR module integration
  - Setup VE-Metrics/KPI Tree
  - Define business model configuration (pricing tiers: Starter, Pro, Enterprise)
  - **Deliverable:** VE config JSON loaded, accessible via API

- [ ] **1.2 Security Bridge** (1 day)
  - Deploy PFC-SEC-Auth-Foundation module
  - Deploy PFC-SEC-RBAC-Foundation (4 roles: Admin, Manager, Analyst, Viewer)
  - Configure PFC-SEC-Multi-Tenant-Isolation
  - Setup API Key Management (90/180 day rotation)
  - **Deliverable:** Security modules active, RBAC permissions mapped

#### Wednesday-Friday: Database + API Foundation (WBS 2.1, 2.2)
- [ ] **2.1 Database Layer** (2 days)
  - Provision DigitalOcean managed PostgreSQL
  - Deploy BAIV_DATABASE_SCHEMA.sql (11 tables)
  - Enable RLS policies (6 tenant-scoped tables)
  - Seed data: 4 roles, 16 agents, test tenant
  - **Deliverable:** Database operational with test data

- [ ] **2.2 API Layer** (3 days)
  - Initialize Node.js/TypeScript project
  - Setup Express server with middleware
  - Configure database connection pool (pg)
  - Implement health endpoint (/health)
  - **Deliverable:** API running locally, health check passing

**Week 1 Success Criteria:**
- [ ] All 4 integration bridges configured
- [ ] Database schema deployed with RLS
- [ ] API health endpoint returns 200
- [ ] PF-Core security modules active

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
  - [ ] 4 roles defined (Admin, Manager, Analyst, Viewer)
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
  - [ ] Admin can manage all resources
  - [ ] Manager can execute agents, view all data
  - [ ] Analyst can execute agents, view own data
  - [ ] Viewer can only view data

- [ ] **Multi-Tenant Isolation**
  - [ ] Tenant A cannot see Tenant B's data
  - [ ] Tenant context switches correctly
  - [ ] RLS policies enforced

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

**Key Improvements over v1.0:**
- ✅ Full PF-Core integration via 4 bridges (VE, Security, Design, Agent Orchestration)
- ✅ Strategic alignment with VSOM and OKR frameworks
- ✅ Comprehensive RBAC with 4 roles and multi-tenant isolation
- ✅ Design system with 20+ reusable widgets
- ✅ TDD approach with 70%+ coverage target
- ✅ Structured WBS with 35 days of tasks (compressed to 6 weeks)

**Ready for Implementation:** Week 1, Day 1 starts with PF-Core bridge configuration.

---

**Document Version:** 2.0.0  
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
- BAIV_ONTOLOGY_REGISTRY.md v1.0.0
- BAIV_DATABASE_SCHEMA.sql v1.0.0
- BAIV_API_SPECIFICATION.yaml v1.0.0
- BAIV_TESTING_STRATEGY.md v1.0.0
- BAIV_DEPLOYMENT_GUIDE.md v1.0.0

---

## APPENDIX A: Reference Documents & Detailed Specifications

This section provides a comprehensive catalog of all reference documents that elaborate on the PRD-PBS-WBS requirements defined in this plan. These documents provide detailed specifications, architecture patterns, and implementation guidance for each PBS component.

### A.1 PF-Core Platform Integration Documents

#### PFC-PFI-BAIV_MODULE_CATALOG.md v1.0.0
**Purpose:** Complete inventory of 30+ PF-Core modules with BAIV instance mappings  
**Location:** `1 Architecture/0.1 Solution architects/HLD-High-level/`  
**Content:** 1,715 lines  
**Elaborates on:** PBS 1.0 (PF-Core Integration Layer)  
**Key Sections:**
- 10 Value Engineering modules (VSOM, OKR, PMF, VE-Metrics/KPI Tree, Business Models)
- 4 Security modules (Auth-Foundation, RBAC-Foundation, Multi-Tenant-Isolation, API-Key-Management)
- 6 Design modules (Design-System, Component-Library, Figma-Bridge)
- 2 CRM modules (Customer-Organization, Brand-Identity)
- 2 Agent Core modules (Agent-Registry, Ontology-Registry)
- 6 Agentic Builder modules (Program Manager, Platform Manager, Product Manager, Solution Architect, Solution Builder, Test Driven Design)
- Module dependency graph
- 3-phase implementation priorities

#### PFC-PFI-BAIV_INTEGRATION_BRIDGES.md v1.0.0
**Purpose:** 4 integration bridges connecting PF-Core to BAIV  
**Location:** `1 Architecture/0.1 Solution architects/HLD-High-level/`  
**Content:** 1,735 lines  
**Elaborates on:** PBS 1.1-1.4 (All 4 Integration Bridges)  
**Key Sections:**
- Value Engineering Bridge (PBS 1.1): VSOM context, OKR integration, VE-Metrics/KPI Tree, Business Model config
- Security Bridge (PBS 1.2): Supabase Auth, RBAC via RLS, tenant isolation, API key management
- Design Bridge (PBS 1.3): Design tokens, component library, Figma integration
- Agent Orchestration Bridge (PBS 1.4): Agent registry, ontology registry, execution framework, context propagation
- 4-level config hierarchy (Platform → Instance → Tenant → User)
- 6 mermaid architecture diagrams

#### PFC-PFI-BAIV_AGENTIC_BUILDER_GUIDE.md v1.0.0
**Purpose:** Documentation of 6-module meta-agent stack for building agents  
**Location:** `1 Architecture/0.1 Solution architects/HLD-High-level/`  
**Content:** 1,709 lines  
**Elaborates on:** PBS 3.0 (Agent Services), WBS 3.1-3.4 (Agent development)  
**Key Sections:**
- 6 Agentic Builder modules (PFC-only)
- Program Manager, Platform Manager, Product Manager
- Solution Architect, Solution Builder, Test Driven Design
- 7-phase agent build order
- BAIV integration checklist

#### PFC-PFI-BAIV_GAP_ANALYSIS_ARCHITECTURE.md v1.0.0
**Purpose:** Dual-layer gap analysis (platform + product)  
**Location:** `1 Architecture/0.1 Solution architects/HLD-High-level/`  
**Content:** 1,194 lines  
**Elaborates on:** PBS 3.4 (Gap Analyzer Agent)  
**Key Sections:**
- Platform-level gaps (PFC-SpecAgent-Gap-Analysis)
- Product-level gaps (BAIV-Product-Gap-Analysis)
- Gap Analysis Orchestrator pattern
- Complete ontology specs for both layers

#### PFC-PFI-BAIV_MANIFEST.md v1.1.0
**Purpose:** Comprehensive manifest and traceability for all PFC-PFI-BAIV artifacts  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 830 lines  
**Elaborates on:** All PBS components, complete document catalog  
**Key Sections:**
- 15 key artifacts across 3 implementation phases
- Document distribution (Phase 1: 5 artifacts, 6,517 lines; Phase 2: 5 artifacts, 7,590 lines; Phase 3: 5 artifacts, 2,829 lines)
- 4 dependency diagrams (document flow, module integration, timeline, agent dependencies)
- Traceability matrix (PF-Core Module → BAIV Capability mapping)
- Direct GitHub links to all documents

### A.2 BAIV Instance-Specific Documents

#### BAIV_AGENT_INVENTORY.md v1.0.0
**Purpose:** Complete inventory of 16 primary BAIV agents  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 2,369 lines  
**Elaborates on:** PBS 3.2-3.4 (Discovery Agent, Citation Tester, Gap Analyzer), all 16 agents  
**Key Sections:**
- 16 agents across 7 implementation phases
- Phase 1: Discovery, ICP Discovery
- Phase 2: Citation Tester, Query Expansion, Gap Analyzer, Turn Analysis, LLM Mentions, Attribution Metrics
- Phase 3: Reddit Scraper, Bluesky Scraper, YouTube Analyzer
- Phase 4: Blog Creator, Social Media Creator
- Phase 5: Postiz Publisher
- Phase 6: Hunter Lead Finder
- Phase 7: Google AI Mode Tester
- 6-week implementation roadmap
- Agent orchestration patterns

#### DASHBOARD_TEMPLATES.md v1.0.0
**Purpose:** 5-Perspective Balanced Scorecard dashboard framework  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 1,225 lines  
**Elaborates on:** PBS 4.0 (Dashboard Services), WBS 4.1-4.4  
**Key Sections:**
- Executive Overview (5 KPIs: AI Visibility Score, Citation Rate, Content Velocity, Gap Closure, Client Health)
- 5-Perspective BSC: Financial, Customer, Process, Learning, Stakeholder
- 20+ widget specifications (TypeScript interfaces): CitationRateCard, PlatformComparisonChart, RPITrendLine, GapPriorityList, TopicCoverageHeatmap, etc.
- 12-column responsive grid layout
- React + TypeScript component library
- Real-time WebSocket updates
- Design tokens: BAIV color palette, spacing scale, typography
- Responsive breakpoints: mobile (320px), tablet (768px), desktop (1024px, 1440px)

#### BAIV_ONTOLOGY_REGISTRY.md v1.0.0
**Purpose:** Registry of 30+ BAIV ontologies with JSON-LD specs  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 1,544 lines  
**Elaborates on:** PBS 2.4 (Ontology Service), WBS 2.4.1-2.4.4  
**Key Sections:**
- Discovery Ontologies (5): Client-Context, Discovery-Report, ICP-Profile
- Analysis Ontologies (8): Citation-Test-Result, RPI-Score, Gap-Analysis
- Content Ontologies (6): Blog-Post, Social-Post, FAQ-Page
- Business Ontologies (6): AI-Visibility-Score, Financial-Metrics
- Operational Ontologies (5): Publishing-Log, Reddit-Mention
- Complete JSON-LD specifications for all ontologies
- Agent binding mappings

#### BAIV_SECURITY_IMPLEMENTATION.md v1.0.0
**Purpose:** Security architecture, RBAC, and compliance  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 861 lines  
**Elaborates on:** PBS 1.2 (Security Bridge), PBS 2.3 (Authentication Service)  
**Key Sections:**
- 5-layer defense-in-depth architecture
- 4-tier RBAC (Admin, Manager, Analyst, Viewer)
- 40+ granular permissions
- Row-Level Security (RLS) implementation with Supabase
- API key management (90/180 day rotation)
- Encryption (AES-256 at rest, TLS 1.3 in transit)
- GDPR compliance patterns
- Comprehensive audit logging

#### BAIV_COMPLIANCE_CHECKLIST.md v1.0.0
**Purpose:** SOC 2, GDPR, ISO 27001 compliance checklist  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 747 lines  
**Elaborates on:** PBS 5.3 (Monitoring & Logging), Non-functional requirements  
**Key Sections:**
- 85 compliance checkpoints total
- SOC 2 Type II: 45 controls (9 Trust Services Criteria)
- GDPR: 25 requirements (data protection + rights)
- ISO 27001: 15 key controls (14 domains)
- Operational compliance checklists
- Audit preparation guide

### A.3 Implementation & Deployment Documents

#### BAIV_DATABASE_SCHEMA.sql v1.0.0
**Purpose:** Simplified PostgreSQL schema with JSONB  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 395 lines  
**Elaborates on:** PBS 2.1 (Database Layer), WBS 2.1.1-2.1.4  
**Key Sections:**
- 11 tables (simplified from original 25)
- Core tables (5): tenants, users, roles, user_tenant_roles, api_keys
- ontology_data table (all ontology instances as JSONB)
- audits table (results in JSONB)
- Agent/execution tables (3): agent_registry, agent_executions, audit_logs
- RLS policies on 6 tenant-scoped tables
- 4 roles + 16 agents seeded
- Supabase-compatible schema (v2.1.0)

#### BAIV_API_SPECIFICATION.yaml v1.0.0
**Purpose:** OpenAPI 3.0.3 specification for BAIV MVP  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 621 lines  
**Elaborates on:** PBS 2.2 (API Layer), PBS 2.4 (Ontology Service)  
**Key Sections:**
- 13 endpoints (minimal MVP set)
- Auth (2): /auth/login, /auth/me (Supabase Auth integration)
- Ontology (5): CRUD endpoints with single /ontology resource
- Agents (3): /agents, /agents/{id}/execute, /agents/executions/{id}
- Audits (3): /audits CRUD operations
- JWT authentication via Supabase
- All schemas leverage JSONB

#### BAIV_DEPLOYMENT_GUIDE.md v1.0.0
**Purpose:** Supabase + frontend hosting deployment guide  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 644 lines  
**Elaborates on:** PBS 5.1 (Infrastructure Setup), WBS 5.1.1-5.1.4  
**Key Sections:**
- Supabase Backend setup (Database, Auth, Storage)
- Frontend hosting options (Vercel, Netlify, DigitalOcean)
- GitHub auto-deploy integration
- Node.js/TypeScript or Python/FastAPI options
- Environment variable setup (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- Custom domain configuration
- Monitoring and cost breakdown (~$0-20/month MVP)

#### BAIV_TESTING_STRATEGY.md v1.0.0
**Purpose:** Pragmatic testing strategy (70% coverage)  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 576 lines  
**Elaborates on:** PBS 5.3 (Testing), WBS 5.3, Section 6 (Testing & Validation Strategy)  
**Key Sections:**
- Inverted test pyramid: 50% integration, 20% unit, 30% manual
- Integration test examples (Jest + supertest) with Supabase
- Unit test examples (JWT, validation)
- Manual testing checklist
- 3 end-to-end scenarios
- GitHub Actions CI/CD config
- Test data fixtures
- RLS policy testing patterns

#### BAIV_MVP_ROADMAP.md v1.0.0
**Purpose:** 6-week MVP implementation timeline  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 593 lines  
**Elaborates on:** Section 4 (Week-by-Week Implementation Plan), WBS timeline  
**Key Sections:**
- Week 1: Database + API foundation
- Week 2: Authentication + Ontology CRUD
- Week 3: Agent registry + Discovery Agent
- Week 4: Citation Tester + Gap Analyzer
- Week 5: Dashboard + deployment
- Week 6: Testing + launch
- 3 sprints (Weeks 1-2, 3-4, 5-6)
- Resource requirements (~$0-100/month)
- Risk mitigation strategies

### A.4 Architecture & Framework Documents

#### ARCHITECTURE_MASTER.md v0.1.0
**Purpose:** Complete system architecture with Supabase backend  
**Location:** `4 PF-Instances/PF-Instance-BAIV/BAIV-PRD-PBS-WBS-AI-Visibility/mil3-aivis-agents/`  
**Elaborates on:** PBS 2.0 (Foundation Services), overall system architecture  
**Key Sections:**
- Frontend: React + Vite + TypeScript
- Backend: Supabase (Auth, Database, Functions, Storage)
- Dependencies: @supabase/supabase-js: 2.49.8, hono: 4.6.14
- Component architecture
- Data flow patterns

#### runtime-agentic-backend-architecture.md v1.0
**Purpose:** UI/UX state-driven agent workflows with Supabase  
**Location:** `4 PF-Instances/PF-Instance-BAIV/BAIV-PRD-PBS-WBS-AI-Visibility/mil3-aivis-agents/`  
**Elaborates on:** PBS 3.0 (Agent Services), PBS 3.1 (Agent Infrastructure)  
**Key Sections:**
- Agentic API Gateway (FastAPI/Express)
- Event Router patterns
- Supabase Client (MCP Tools) integration
- Supabase Backend (PostgreSQL, Realtime, Storage, Edge Functions)
- Agent execution workflows
- State management patterns

#### PF-Core Agentic Framework Agent-PRD-14-Section Template v2.0.0
**Purpose:** Universal agent specification standard  
**Elaborates on:** PBS 3.2-3.4 (All agents), agent development standards  
**Key Sections:**
- P0.1: Identity (Agent name, version, purpose)
- P0.2: Objectives (Goals, success criteria)
- P0.3: Input (Input schemas, validation)
- P0.4: Processing (Core logic, algorithms)
- P0.5: Output (Output schemas, formats)
- P0.6: Error Handling (Error types, recovery)
- P0.7: Performance (SLAs, optimization)
- P0.8: Security (Auth, data protection)
- P0.9: Testing (Test strategy, coverage)
- P0.10: Deployment (Deployment process)
- P0.11: Monitoring (Metrics, alerts)
- P0.12: Documentation (User guides, API docs)
- P0.13: Versioning (Version control, changelog)
- P0.14: Compliance (Regulatory requirements)

### A.5 Audit & Correction Documents

#### BAIV_ARCHITECTURE_AUDIT_v1.0.md
**Purpose:** Architecture compliance audit report  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 671 lines  
**Elaborates on:** v2.1.0 corrections, architecture validation  
**Key Sections:**
- Critical discrepancies identified (DigitalOcean → Supabase)
- Database infrastructure discrepancies
- Authentication architecture errors
- Backend API misalignment
- Deployment strategy conflicts
- PF-Core integration gaps
- Corrective actions required
- Impact assessment (6 days saved, $60-300/year savings)

#### BAIV_MVP_TODO_PLAN_v2.1.0_IMPLEMENTATION_PLAN_v1.1.0.md
**Purpose:** Implementation plan for architecture audit corrections  
**Location:** `4 PF-Instances/PF-Instance-BAIV/`  
**Content:** 540 lines  
**Elaborates on:** v2.1.0 implementation process, correction methodology  
**Key Sections:**
- 10 proposed changes (database, auth, API, deployment, etc.)
- 7 implementation phases (~8 hours total)
- Success criteria
- Impact assessment
- Implementation completion report

### A.6 Document Usage Guide

**For PBS Component Implementation:**
1. Start with this document (BAIV_MVP_TODO_PLAN_v2.1.0.md) for overall structure
2. Reference PFC-PFI-BAIV_INTEGRATION_BRIDGES.md for PF-Core module integration
3. Use specific component documents:
   - Database: BAIV_DATABASE_SCHEMA.sql
   - Authentication: BAIV_SECURITY_IMPLEMENTATION.md
   - Agents: BAIV_AGENT_INVENTORY.md + PF-Core Agent Template
   - Dashboard: DASHBOARD_TEMPLATES.md
   - Deployment: BAIV_DEPLOYMENT_GUIDE.md
4. Validate against BAIV_ARCHITECTURE_AUDIT_v1.0.md for compliance
5. Follow testing requirements in BAIV_TESTING_STRATEGY.md

**Document Traceability:**
- All documents maintain version numbers
- Cross-references use document name + version
- Changes tracked via Git commit history
- Architecture corrections documented in audit reports

---

## APPENDIX B: v2.1.0 Architecture Corrections Summary

**Version 2.1.0 Change Log** (January 1, 2026)

This version corrects critical architecture discrepancies identified in **BAIV_ARCHITECTURE_AUDIT_v1.0.md**.

### Critical Corrections Applied

1. **Document Header Updated**
   - Version: 2.0.0 → 2.1.0
   - Added audit document reference
   - Added base documents: ARCHITECTURE_MASTER.md, runtime-agentic-backend-architecture.md
   - Added corrections note about Supabase architecture

2. **Executive Summary Updated**
   - Added v2.0 corrections section highlighting Supabase migration
   - Updated MVP scope to reflect Supabase backend
   - Added cost optimization note ($25/mo → $0-20/mo)

3. **Functional Requirements Updated**
   - Authentication: JWT-based → **Supabase Auth with auto-managed JWT**
   - RBAC: Custom implementation → **Supabase RLS policies**
   - Multi-tenant: Custom → **RLS + tenant_id column**

4. **PBS 2.0 Foundation Services Updated**
   - 2.1.1: PostgreSQL Setup (DigitalOcean) → **Supabase Project Setup**
   - 2.1.2: Schema Deployment → **Schema Deployment via Supabase Dashboard**
   - 2.2.1: Node.js/TypeScript Setup → **Supabase Client SDK Integration**
   - 2.2.2: Express Server → **Direct Database Queries with RLS**
   - 2.2.3: Database Connection Pool → **Supabase Realtime Setup**
   - 2.2.4: Health/Status Endpoints → **Supabase Edge Functions (Optional)**
   - 2.3.1: User Registration → **Supabase Auth Integration**
   - 2.3.2: Login (JWT) → **signInWithPassword Implementation**
   - 2.3.3: Session Management → **Supabase Session Management**
   - 2.3.4: Middleware (JWT validation) → **RLS Context Injection (tenant_id)**

5. **PBS 5.0 Deployment Updated**
   - 5.1.1: DigitalOcean App Platform → **Supabase Backend (Database, Auth, Storage)**
   - 5.1.2: Managed PostgreSQL → **Frontend Hosting (Vercel/Netlify/DigitalOcean)**
   - 5.1.3: Environment Variables → **Environment Variables (VITE_SUPABASE_URL, etc.)**

### Pending Manual Updates Required

**Note:** Due to document size, the following sections require manual updates to complete v2.1.0:

1. **WBS Dictionary (Section 3.1)** - Lines 312-391
   - Update all Database Layer tasks to reference Supabase
   - Update all API Layer tasks to remove Express references
   - Update all Authentication tasks to use Supabase Auth
   - Update deployment tasks to reference Supabase

2. **Week 1 Implementation Plan** - Lines 410-430
   - Replace "Provision DigitalOcean managed PostgreSQL" with "Create Supabase project"
   - Replace "Initialize Node.js/TypeScript project" with "Setup Supabase Client SDK"
   - Replace "Setup Express server" with "Configure direct Supabase queries"
   - Replace "Configure database connection pool (pg)" with "Setup Supabase Realtime"

3. **Week 2 Implementation Plan** - Lines 437-492
   - Replace POST /auth/register with Supabase signUp()
   - Replace POST /auth/login with Supabase signInWithPassword()
   - Replace JWT generation with Supabase session management
   - Add RLS policy configuration steps

4. **Deployment Section (7.1)** - Lines 1195-1211
   - Replace entire DigitalOcean deployment section with:
     ```
     ### 7.1 Supabase + Frontend Hosting Deployment
     
     **Infrastructure:**
     - **Backend:** Supabase (fully managed, no deployment needed)
     - **Frontend:** Vercel / Netlify / DigitalOcean (static site only)
     - **Database:** Included in Supabase project
     - **Cost:** Supabase free tier + frontend hosting (~$0-10/month)
     
     **Deployment Steps:**
     1. Create Supabase project (https://supabase.com)
     2. Run database migrations via Supabase dashboard
     3. Configure Supabase Auth settings
     4. Set up RLS policies for tenant isolation
     5. Deploy frontend to Vercel/Netlify
     6. Configure environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
     7. Test authentication flow
     8. Verify RLS policies
     ```

5. **Environment Variables (7.2)** - Lines 1214-1238
   - Replace:
     ```bash
     # Database
     DATABASE_URL=postgresql://...
     
     # JWT
     JWT_SECRET=<random-256-bit-secret>
     JWT_ACCESS_EXPIRATION=15m
     JWT_REFRESH_EXPIRATION=7d
     ```
   - With:
     ```bash
     # Supabase Configuration
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     
     # Optional: Supabase Service Role Key (backend only)
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

6. **PF-Core Security Bridge Mapping** - New Section After 5.2
   ```markdown
   ### 5.3 PF-Core Security Bridge with Supabase
   
   | PF-Core Module | Supabase Implementation | Configuration |
   |----------------|------------------------|---------------|
   | PFC-SEC-Auth-Foundation | Supabase Auth + JWT | Auto-managed by Supabase |
   | PFC-SEC-RBAC-Foundation | RLS Policies | Tenant-scoped queries |
   | PFC-SEC-Multi-Tenant-Isolation | RLS + tenant_id column | Policy: user_tenant = tenant_id |
   | PFC-SEC-API-Key-Management | Supabase Service Role Key | 90/180 day rotation |
   | PFC-OAA-Agent-Registry | agent_registry table | Supabase queries |
   | PFC-OAA-Ontology-Registry | ontology_data table | JSONB storage |
   ```

7. **Testing Strategy** - Add Supabase patterns in Section 6
   ```typescript
   // Supabase Integration Tests
   import { createClient } from '@supabase/supabase-js'
   
   describe('Authentication', () => {
     const supabase = createClient(
       process.env.VITE_SUPABASE_URL,
       process.env.VITE_SUPABASE_ANON_KEY
     )
   
     it('should authenticate user', async () => {
       const { data, error } = await supabase.auth.signInWithPassword({
         email: 'test@example.com',
         password: 'testpass123',
       })
       expect(error).toBeNull()
       expect(data.user).toBeDefined()
     })
   })
   ```

8. **Summary Section** - Update cost estimates
   - Budget: ~$200/month → **$0-100/month**
   - Add savings note: "6 days development time saved, $60-300/year cost savings"

### Implementation Guidance

**Before using this plan:**
1. Review BAIV_ARCHITECTURE_AUDIT_v1.0.md for detailed rationale
2. Verify actual implementation in mil3-aivis-agents/src/lib/supabase.ts
3. Cross-reference with ARCHITECTURE_MASTER.md and runtime-agentic-backend-architecture.md
4. Complete pending manual updates listed above

**Key Architecture Principles:**
- Frontend (React) → Supabase Client SDK → Supabase (Auth, Database, Storage)
- No separate Express/Node.js API server needed for MVP
- RLS policies enforce tenant isolation and RBAC
- Supabase Auth handles JWT generation automatically

---

**Document Version:** 2.1.0 (In Progress)  
**Status:** 🟡 Partial Update - Pending Manual Corrections  
**Audit Reference:** BAIV_ARCHITECTURE_AUDIT_v1.0.md  
**Next Action:** Complete pending manual updates above  
**Last Updated:** January 1, 2026  

**Co-Authored-By:** Warp <agent@warp.dev>
