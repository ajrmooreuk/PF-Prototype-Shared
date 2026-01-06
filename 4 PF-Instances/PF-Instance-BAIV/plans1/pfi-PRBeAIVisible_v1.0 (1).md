# PRD: Be AI Visible (BAIV) Product Module
## PF-Instance Implementation on Platform Foundation Core

| Document Version | 1.0.0 |
|------------------|-------|
| Date | December 2025 |
| Status | DRAFT - For Review |
| Platform Layer | PF-Instance (BAIV Product) |
| Architecture | Claude Agent SDK + PF-Core Foundation |
| Ontology Compliance | Schema.org Grounded \| OAA Registry v3.0 |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-12-07 | Platform Architecture Team | Initial restructure from v12 PRD; migration from n8n to Claude Agent SDK; alignment with PF-Core/PF-Instance architecture |

**Source Documents:**
- BAIV Build PRD v11.0/v12 (Google Doc)
- PRD_PF_CORE_VSOM_Module_v1.0
- Ontology Relationships Guide
- DATABASE_SCHEMA_COMPLETE.md

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [PF-Core Dependencies](#3-pf-core-dependencies)
4. [BAIV Instance Scope](#4-baiv-instance-scope)
5. [Be AI Visible Product Definition](#5-be-ai-visible-product-definition)
6. [Agent Architecture](#6-agent-architecture)
7. [Ontology Framework](#7-ontology-framework)
8. [Technical Stack](#8-technical-stack)
9. [API & Integration Specifications](#9-api--integration-specifications)
10. [Data Architecture](#10-data-architecture)
11. [User Journeys & Processes](#11-user-journeys--processes)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Success Metrics](#13-success-metrics)
14. [Appendices](#14-appendices)

---

## 1. Executive Summary

### 1.1 Purpose

This PRD defines the **Be AI Visible (BAIV)** product module as a PF-Instance implementation built on Platform Foundation Core (PF-Core). BAIV delivers AI Visibility optimization services that help organizations become discoverable and cited by AI platforms (ChatGPT, Claude, Perplexity, Gemini).

### 1.2 Key Architecture Changes (from v12)

| Previous (v12) | Current (v1.0) |
|----------------|----------------|
| n8n workflow orchestration | Claude Agent SDK orchestration |
| Standalone agent definitions | PF-Core inherited + BAIV-specific agents |
| Monolithic PRD structure | Modular PF-Core/PF-Instance separation |
| 17 primary agents + 12 sub-agents | Reorganized into Core + Instance agent clusters |
| WordPress plugin focus | Multi-platform SaaS with API-first design |

### 1.3 Value Proposition

**For CMOs and Marketing Leaders:**
- 60%+ visibility improvement within 30 days using proprietary AI visibility scoring
- 80% reduction in manual marketing discovery tasks through agent automation
- 65% cost reduction vs. traditional SEO tools (SEMrush, Ahrefs, Moz)

**Platform Differentiation:**
- Only ontology-driven AI visibility platform with semantic reasoning capabilities
- Progressive learning system that improves recommendations over time
- Client collaboration model (augmentation, not replacement)

### 1.4 Scope Boundaries

**In Scope (BAIV Instance):**
- AI Visibility audit, analysis, and optimization
- Content strategy generation for AI platform citation
- Gap analysis and competitive intelligence
- CMO-aligned OKR integration for marketing metrics

**Inherited from PF-Core:**
- VSOM (Vision, Strategy, Objectives, Metrics) framework
- Value Engineering methodology
- Context Engineering patterns
- OAA (Ontology Architect Agent) Registry
- Multi-tenant architecture and RBAC

**Out of Scope (Future BAIV Products):**
- Paid advertising optimization (BAIV Ads - Future)
- Social media management automation (BAIV Social - Future)
- Email marketing integration (BAIV Email - Future)

---

## 2. Architecture Overview

### 2.1 Three-Layer Platform Model

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PF-CORE (Foundation Layer)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │     VSOM     │  │    OAA       │  │   Context    │              │
│  │   Module     │  │   Registry   │  │  Engineering │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │    Value     │  │   Multi-     │  │   Agent      │              │
│  │ Engineering  │  │   Tenant     │  │   Manager    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PF-INSTANCE: BAIV                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              Be AI Visible (Core Product)                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐              │  │
│  │  │ Discovery  │  │  Analysis  │  │ Generation │              │  │
│  │  │  Cluster   │  │  Cluster   │  │  Cluster   │              │  │
│  │  └────────────┘  └────────────┘  └────────────┘              │  │
│  │  ┌────────────┐                                               │  │
│  │  │Optimization│                                               │  │
│  │  │  Cluster   │                                               │  │
│  │  └────────────┘                                               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │           Future BAIV Products (Extensible)                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐              │  │
│  │  │ BAIV Ads   │  │BAIV Social │  │ BAIV Email │              │  │
│  │  │  (Future)  │  │  (Future)  │  │  (Future)  │              │  │
│  │  └────────────┘  └────────────┘  └────────────┘              │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CLIENT ORGANIZATION LAYER                        │
│     (Tenant-isolated instances with customized configurations)      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Agent SDK Architecture

**Migration from n8n to Claude Agent SDK:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CLAUDE AGENT SDK ORCHESTRATION                   │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Orchestrator Agent (P0)                    │  │
│  │         • Strategic reasoning & coordination                  │  │
│  │         • Client journey management                           │  │
│  │         • Progressive learning integration                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│              ┌───────────────┼───────────────┐                     │
│              ▼               ▼               ▼                     │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐         │
│  │   Discovery    │ │   Analysis     │ │  Generation    │         │
│  │    Agents      │ │    Agents      │ │    Agents      │         │
│  │  P1, P2, P3    │ │  P4, P5, P6    │ │   P7, P9       │         │
│  └────────────────┘ └────────────────┘ └────────────────┘         │
│              │               │               │                     │
│              └───────────────┼───────────────┘                     │
│                              ▼                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Optimization Agents                          │  │
│  │              P10, P11, P12, P13, P14                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Tools & Skills Layer                       │  │
│  │   • API integrations    • Ontology reasoning                  │  │
│  │   • Content generation  • Citation testing                    │  │
│  │   • Gap analysis        • Report generation                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. PF-Core Dependencies

### 3.1 Inherited Modules

| PF-Core Module | BAIV Usage | Integration Point |
|----------------|------------|-------------------|
| **VSOM** | Strategic context for all agents | CMO marketing strategy alignment |
| **OAA Registry** | Ontology governance and versioning | All BAIV ontologies registered |
| **Value Engineering** | ROI/Impact tracking | Content investment prioritization |
| **Context Engineering** | Market/Org/Competitive context | Discovery profiling inputs |
| **Multi-Tenant** | Client organization isolation | tenant_id on all BAIV tables |
| **Agent Manager** | SDK orchestration framework | Claude Agent SDK integration |
| **RBAC/RACI** | Role-based access control | CMO, Marketing Pro, Agency roles |

### 3.2 Ontology Inheritance

**PF-Core Ontologies (Inherited):**
- Organization Ontology (schema.org base)
- VSOM Ontology (strategic framework)
- RACI/RBAC Ontology (access control)

**BAIV Instance Ontologies (Product-Specific):**
- AI Visibility Ontology v1.1
- Universal Brand Ontology v1.0
- Gap Analysis Ontology v1.0
- CMO OKR Ontology v3.0.0
- Customer Organization Ontology v1.0

### 3.3 API Dependencies

| PF-Core API | BAIV Consumer | Purpose |
|-------------|---------------|---------|
| `/api/v1/vsom/context` | All BAIV agents | Strategic alignment |
| `/api/v1/tenants/{id}` | Configuration | Multi-tenant isolation |
| `/api/v1/oaa/registry` | Ontology loading | Schema validation |
| `/api/v1/agents/execute` | Agent SDK | Workflow orchestration |

---

## 4. BAIV Instance Scope

### 4.1 Platform Configuration

```yaml
pf_instance:
  name: "BAIV"
  code: "baiv"
  domain: "baiv.co.uk"
  
  products:
    - name: "Be AI Visible"
      code: "baiv-core"
      status: "active"
      version: "1.2"
      
    - name: "BAIV Strategy Calls"
      code: "baiv-strategy"
      status: "active"
      version: "1.0"
      
    - name: "BAIV FAQs"
      code: "baiv-faqs"
      status: "active"
      version: "1.0"
      
  future_products:
    - name: "BAIV Ads"
      code: "baiv-ads"
      status: "planned"
      
    - name: "BAIV Social"
      code: "baiv-social"
      status: "planned"
      
    - name: "BAIV Email"
      code: "baiv-email"
      status: "planned"
```

### 4.2 Market Context

**Markets Served:**
- USA, EU, UK, Scandinavian Nations, Peru

**Industry Verticals:**
- B2B SaaS
- Professional Services
- E-commerce
- Technology

**Target Personas:**
- CMO / VP Marketing
- Marketing Operations Manager
- Digital Marketing Specialist
- Agency Account Manager

### 4.3 Subscription Tiers

| Tier | Price Range | Products Included | Agent Access |
|------|-------------|-------------------|--------------|
| **Starter** | $49-149/mo | FAQs, Basic Audit | P1-P6 |
| **Growth** | $199-999/mo | Strategy Calls, Content | P1-P12 |
| **Enterprise** | $2,499-10K+/mo | Full Platform + White-label | P1-P14 + Custom |

---

## 5. Be AI Visible Product Definition

### 5.1 Problem Statement

**78% of businesses with excellent products remain invisible to AI platforms.**

AI platforms (ChatGPT, Claude, Perplexity, Gemini) are becoming primary discovery channels, but most organizations lack:

1. **AI Platform Visibility:** Content not structured for AI citation
2. **Citation Attribution:** No tracking of AI-generated recommendations
3. **Competitive Intelligence:** Unknown positioning vs. competitors in AI responses
4. **Content Optimization:** Missing schema markup, structured data, and AI-friendly formats
5. **Strategic Alignment:** Marketing efforts disconnected from AI discovery patterns

### 5.2 Solution Overview

**Be AI Visible** delivers a comprehensive AI visibility transformation through:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BE AI VISIBLE PROCESS FLOW                       │
│                                                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│  │  AUDIT  │ ─► │ ANALYZE │ ─► │ IDEATE  │ ─► │OPTIMIZE │         │
│  │         │    │         │    │         │    │         │         │
│  │ P1-P3   │    │ P4-P6   │    │  P7-P9  │    │ P10-P14 │         │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘         │
│       │              │              │              │               │
│       ▼              ▼              ▼              ▼               │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│  │Discovery│    │ Scoring │    │ Content │    │Publish &│         │
│  │ Profile │    │& Gaps   │    │ Strategy│    │ Monitor │         │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘         │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                     CONTINUOUS RE-AUDIT LOOP                        │
│                         (30/60/90 Day Cycles)                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.3 Functional Requirements

#### 5.3.1 Discovery Cluster (P1-P3)

| ID | Requirement | Agent | Priority |
|----|-------------|-------|----------|
| FR-D001 | Configure business parameters and validate API connections | P1 | Critical |
| FR-D002 | Discover digital assets across web, social, directories | P2 | Critical |
| FR-D003 | Profile Reddit presence and relevant subreddits | P2 | High |
| FR-D004 | Identify and map top 10 competitors | P2 | Critical |
| FR-D005 | Extract PAA (People Also Ask) questions | P3 | High |
| FR-D006 | Capture performance metrics from analytics platforms | P3 | Critical |

#### 5.3.2 Analysis Cluster (P4-P6)

| ID | Requirement | Agent | Priority |
|----|-------------|-------|----------|
| FR-A001 | Execute proprietary visibility scoring (65% cost savings) | P4 | Critical |
| FR-A002 | Conduct technical SEO analysis | P4 | High |
| FR-A003 | Perform network analysis via InfraNodus | P5 | High |
| FR-A004 | Calculate AI visibility scores per platform | P5 | Critical |
| FR-A005 | Identify strategic gaps vs. competitors | P6 | Critical |
| FR-A006 | Generate prioritized opportunity list | P6 | Critical |

#### 5.3.3 Generation Cluster (P7-P9)

| ID | Requirement | Agent | Priority |
|----|-------------|-------|----------|
| FR-G001 | Generate 20+ content ideas with strategic validation | P7 | High |
| FR-G002 | Create 30/60/90 day improvement plans | P7 | Critical |
| FR-G003 | Prioritize content by ROI potential | P8 | High |
| FR-G004 | Generate multi-format content (blogs, FAQs, guides) | P9 | Critical |
| FR-G005 | Ensure brand voice alignment | P9 | High |

#### 5.3.4 Optimization Cluster (P10-P14)

| ID | Requirement | Agent | Priority |
|----|-------------|-------|----------|
| FR-O001 | Optimize content for AI platform citation | P10 | Critical |
| FR-O002 | Apply schema markup recommendations | P10 | High |
| FR-O003 | Schedule content distribution | P11 | Medium |
| FR-O004 | Publish to WordPress/CMS | P12 | High |
| FR-O005 | Execute continuous re-audit monitoring | P13 | Critical |
| FR-O006 | Generate predictive trend forecasts | P14 | High |

### 5.4 Non-Functional Requirements

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-001 | Complete audit cycle time | <48 hours | End-to-end workflow |
| NFR-002 | System uptime | 99.9% | Monthly availability |
| NFR-003 | API response time | <2 seconds | 95th percentile |
| NFR-004 | Test coverage | >85% | TDD methodology |
| NFR-005 | Ontology compliance | 100% | Schema.org validation |
| NFR-006 | Multi-tenant isolation | Complete | Zero data leakage |

---

## 6. Agent Architecture

### 6.1 Agent Reorganization (n8n → Claude Agent SDK)

**Previous Structure (v12):** 17 primary agents (P0-P16) + 12 sub-agents defined for n8n workflows

**New Structure (v1.0):** Reorganized into functional clusters with Claude Agent SDK orchestration

```yaml
agent_clusters:
  orchestration:
    - name: "Master Orchestrator Agent"
      code: "P0"
      type: "orchestrator"
      sdk: "claude-agent-sdk"
      responsibilities:
        - Client journey coordination
        - Agent sequencing decisions
        - Progressive learning integration
        - Transparency and explainability

  discovery:
    - name: "Configuration Agent"
      code: "P1"
      tools: [credential_validator, api_tester, schema_generator]
      
    - name: "Discovery & Profiling Agent"
      code: "P2"
      tools: [web_crawler, reddit_scraper, social_discovery, competitor_intel]
      
    - name: "Capture Agent"
      code: "P3"
      tools: [paa_extractor, analytics_collector, performance_baseline]

  analysis:
    - name: "Audit Agent"
      code: "P4"
      tools: [visibility_scorer, technical_analyzer, benchmark_engine]
      
    - name: "Analytics & Scoring Agent"
      code: "P5"
      tools: [infranodus_client, network_analyzer, score_calculator]
      
    - name: "Gap Analysis Agent"
      code: "P6"
      tools: [opportunity_identifier, competitive_mapper, priority_ranker]

  generation:
    - name: "Ideation Agent"
      code: "P7"
      tools: [content_ideator, strategy_generator, plan_builder]
      
    - name: "Selection Agent"
      code: "P8"
      tools: [roi_modeler, resource_optimizer, priority_selector]
      
    - name: "Content Creation Agent"
      code: "P9"
      tools: [content_generator, brand_aligner, format_optimizer]

  optimization:
    - name: "Content Optimization Agent"
      code: "P10"
      tools: [seo_optimizer, schema_applier, ai_format_optimizer]
      
    - name: "Scheduling Agent"
      code: "P11"
      tools: [timing_optimizer, calendar_manager, distribution_planner]
      
    - name: "Publishing Agent"
      code: "P12"
      tools: [cms_publisher, social_distributor, confirmation_tracker]
      
    - name: "Re-audit Agent"
      code: "P13"
      tools: [delta_analyzer, trend_tracker, alert_generator]
      
    - name: "Predictive Analytics Agent"
      code: "P14"
      tools: [trend_forecaster, opportunity_predictor, market_analyzer]
```

### 6.2 Agent Specification Template

Each agent follows this standardized specification format:

```yaml
agent_specification:
  identity:
    name: string
    code: string  # P1, P2, etc.
    cluster: string  # discovery, analysis, generation, optimization
    version: string
    
  purpose:
    primary_function: string
    value_delivered: string
    success_metrics: array
    
  inputs:
    required: object
    optional: object
    validation_rules: array
    
  outputs:
    format: "JSON"
    schema: object
    next_agent: string | null
    
  tools:
    available: array
    permissions: object
    
  context:
    pf_core_dependencies: array
    ontologies_required: array
    memory_requirements: object
    
  error_handling:
    categories: array
    fallback_strategies: object
    escalation_rules: object
    
  monitoring:
    log_level: string
    metrics: array
    alerts: array
```

### 6.3 MVP Release Mapping

| Release | Agents | Status | Priority |
|---------|--------|--------|----------|
| **MVP 1.2** | P1, P2, P3, P4, P5, P6, P7, P9, P12, P13 | Development | Critical |
| **MVP 1.3** | P8, P10, P11 | Planned | High |
| **MVP 2.0** | P14, Advanced P0 reasoning | Planned | Medium |

---

## 7. Ontology Framework

### 7.1 Ontology Registry

All BAIV ontologies are registered in OAA Registry v3.0:

| Ontology | Version | Domain | Status |
|----------|---------|--------|--------|
| AI Visibility | 1.1.0 | Platform analysis, citation patterns | Production |
| Universal Brand | 1.0.0 | Brand identity, discovery pathways | Production |
| Gap Analysis | 1.0.0 | Opportunity identification | Production |
| CMO OKR | 3.0.0 | Marketing objectives, key results | Production |
| Customer Organization | 1.0.0 | Client profiling | Production |

### 7.2 Ontology Integration Flow

```
Customer Org → Context
     ↓
AI Visibility → Current state analysis
     ↓
Universal Brand → Discovery pathway mapping
     ↓
Gap Analysis → Opportunities identification
     ↓
CMO OKR → Strategic implementation plan
```

### 7.3 Schema.org Grounding

All ontologies follow schema.org grounding principles:

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "Ontology",
  "@id": "baiv:ontology:ai-visibility"
}
```

**Extension Pattern:**
- schema.org provides base types (Organization, Product, CreativeWork)
- baiv: namespace provides domain-specific extensions
- OAA Registry validates compliance

---

## 8. Technical Stack

### 8.1 Architecture Components

```yaml
infrastructure:
  hosting: "Digital Ocean App Platform"
  database: "Supabase (PostgreSQL)"
  storage: "Supabase Storage / S3"
  cdn: "Cloudflare"

backend:
  runtime: "Python 3.11+"
  framework: "FastAPI"
  agent_sdk: "Claude Agent SDK"
  task_queue: "Celery + Redis"

frontend:
  framework: "Next.js 14+"
  ui_library: "shadcn/ui"
  design_system: "Figma Make pipeline"
  state: "Zustand / React Query"

ai_services:
  primary: "Claude API (Anthropic)"
  secondary: "OpenAI GPT-4 (fallback)"
  network_analysis: "InfraNodus"

integrations:
  analytics: "Google Analytics 4, Search Console"
  social: "Facebook, LinkedIn, Twitter APIs"
  publishing: "WordPress REST API"
  payments: "Stripe"
```

### 8.2 Claude Agent SDK Configuration

```python
# Agent SDK initialization pattern
from anthropic import Agent, Tool, AgentSDK

agent_config = {
    "model": "claude-sonnet-4-20250514",
    "temperature": 0.3,
    "max_tokens": 4000,
    "tools": [...],
    "memory": {
        "type": "persistent",
        "retention": "session"
    },
    "context": {
        "pf_core": True,
        "tenant_isolation": True
    }
}
```

### 8.3 API Architecture

```yaml
api_structure:
  base_url: "https://api.baiv.co.uk/v1"
  
  endpoints:
    # Discovery
    - path: "/audits"
      methods: [GET, POST]
      agents: [P1, P2, P3]
      
    # Analysis
    - path: "/audits/{id}/analysis"
      methods: [GET, POST]
      agents: [P4, P5, P6]
      
    # Generation
    - path: "/content/ideation"
      methods: [POST]
      agents: [P7]
      
    - path: "/content/create"
      methods: [POST]
      agents: [P9]
      
    # Optimization
    - path: "/content/{id}/optimize"
      methods: [POST]
      agents: [P10]
      
    # Reports
    - path: "/reports/discovery"
      methods: [GET, POST]
      format: "JSON/PDF"
```

---

## 9. API & Integration Specifications

### 9.1 Input APIs

| API | Purpose | Cost | Agent Usage |
|-----|---------|------|-------------|
| Google Analytics 4 | Traffic & behavior data | FREE | P3, P13 |
| Google Search Console | SEO performance | FREE | P3, P13 |
| Google Trends | Trend analysis | FREE | P14 |
| InfraNodus | Network analysis | $200-400/mo | P5, P6 |
| AnswerThePublic | Question discovery | $100/mo | P7, P14 |
| BuzzSumo | Content performance | $200/mo | P3, P14 |

### 9.2 Output APIs

| API | Purpose | Cost | Agent Usage |
|-----|---------|------|-------------|
| WordPress REST | Content publishing | FREE | P12 |
| Social Media APIs | Distribution | $100-200/mo | P12 |
| Email (SendGrid) | Notifications | $50/mo | P12 |
| Stripe | Payment processing | Usage-based | System |

### 9.3 Cost Optimization

**Traditional SEO Tools Replaced:**
- SEMrush: $399/month
- Ahrefs: $399/month  
- Moz: $599/month
- **Total Traditional:** $1,397/month

**BAIV Implementation:**
- InfraNodus: $200-400/month
- Other APIs: $350-500/month
- **Total BAIV:** ~$550-900/month

**Savings: 60-65%**

---

## 10. Data Architecture

### 10.1 Database Schema Overview

```sql
-- Multi-tenant core (inherited from PF-Core)
tenants (id, legal_name, trading_name, subdomain, ...)
users (id, tenant_id, email, role, ...)
tenant_users (id, tenant_id, user_id, role, permissions, ...)

-- BAIV Product Tables
discovery_audits (id, tenant_id, domain_url, status, ...)
ai_visibility_scores (id, audit_id, platform, score, ...)
gap_analysis_results (id, audit_id, gap_type, priority, ...)
content_items (id, tenant_id, title, type, status, ...)
icp_profiles (id, tenant_id, profile_name, attributes, ...)

-- VSOM Integration (via PF-Core)
vsom_vision_mission (id, tenant_id, vision, mission, ...)
vsom_strategic_objectives (id, tenant_id, objective, ...)
vsom_metrics_kpis (id, tenant_id, kpi_name, ...)
```

### 10.2 JSONB Storage Pattern

Following PF-Core conventions, complex/flexible data stored as JSONB:

```sql
CREATE TABLE discovery_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    domain_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    
    -- JSONB for flexible ontology-aligned data
    platform_results JSONB DEFAULT '{}',
    competitor_analysis JSONB DEFAULT '{}',
    gap_analysis JSONB DEFAULT '{}',
    content_opportunities JSONB DEFAULT '[]',
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 10.3 RLS Policies

All tables implement Row Level Security for multi-tenant isolation:

```sql
ALTER TABLE discovery_audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON discovery_audits
    USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

---

## 11. User Journeys & Processes

### 11.1 Primary User Journey: CMO AI Visibility Audit

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CMO AI VISIBILITY JOURNEY                       │
└─────────────────────────────────────────────────────────────────────┘

Day 0: ONBOARDING
├── Sign up / Account creation
├── Business profile configuration (P1)
├── Connect analytics (GA4, Search Console)
└── Define target audience & competitors

Day 1-2: DISCOVERY
├── Automated digital asset discovery (P2)
├── Reddit & social presence profiling (P2)
├── PAA question capture (P3)
└── Performance baseline established

Day 3-5: ANALYSIS
├── AI Visibility Scoring (P4, P5)
│   ├── ChatGPT citation analysis
│   ├── Claude citation analysis
│   ├── Perplexity citation analysis
│   └── Gemini citation analysis
├── Gap Analysis vs. competitors (P6)
└── Discovery Report generated

Day 6-7: STRATEGY
├── Content ideation session (P7)
├── 30-day improvement plan
├── Priority recommendations
└── CMO OKR alignment check

Day 8-30: EXECUTION
├── Content creation (P9)
├── Publishing & distribution (P12)
├── Continuous monitoring (P13)
└── Weekly progress reports

Day 30+: OPTIMIZATION
├── Re-audit & delta analysis (P13)
├── Predictive insights (P14)
├── Strategy refinement
└── 60/90-day plan cycles
```

### 11.2 Process State Machine

```
[Initial] → [Configuring] → [Discovering] → [Analyzing] → 
[Ideating] → [Creating] → [Optimizing] → [Publishing] → 
[Monitoring] → [Re-auditing] → (loop to Analyzing)
```

### 11.3 HITL (Human-in-the-Loop) Decision Points

| Stage | Decision Point | HITL Required | Timeout |
|-------|----------------|---------------|---------|
| Configuration | API credential approval | Yes | N/A |
| Discovery | Competitor list confirmation | Optional | 24h |
| Analysis | Gap priority approval | Recommended | 48h |
| Ideation | Content strategy approval | Yes | N/A |
| Creation | Content approval before publish | Yes | N/A |
| Optimization | Schema changes approval | Optional | 24h |

---

## 12. Implementation Roadmap

### 12.1 Phase Overview

| Phase | Weeks | Focus | Agents |
|-------|-------|-------|--------|
| **Phase 1: Foundation** | 1-4 | PF-Core integration, Claude SDK setup | P0, P1 |
| **Phase 2: Discovery** | 5-8 | Discovery cluster implementation | P2, P3 |
| **Phase 3: Analysis** | 9-12 | Analysis cluster, scoring engine | P4, P5, P6 |
| **Phase 4: Generation** | 13-16 | Content pipeline | P7, P9 |
| **Phase 5: Optimization** | 17-20 | Publishing, monitoring | P12, P13 |
| **Phase 6: Advanced** | 21-24 | Predictive, selection agents | P8, P10, P11, P14 |

### 12.2 Phase 1: Foundation (Weeks 1-4)

**Deliverables:**
- Claude Agent SDK integration with PF-Core
- P0 Orchestrator Agent basic implementation
- P1 Configuration Agent with credential validation
- Database schema for BAIV tables
- API foundation endpoints
- TDD framework with >60% coverage

### 12.3 Phase 2: Discovery (Weeks 5-8)

**Deliverables:**
- P2 Discovery & Profiling Agent
- P3 Capture Agent with PAA extraction
- Reddit scraper integration
- Competitor discovery automation
- Analytics data collection pipeline

### 12.4 Phase 3: Analysis (Weeks 9-12)

**Deliverables:**
- P4 Audit Agent with proprietary scoring
- P5 Analytics Agent with InfraNodus
- P6 Gap Analysis Agent
- Discovery report generator
- Dashboard for analysis visualization

### 12.5 Phase 4-6: Remaining Clusters (Weeks 13-24)

*Detailed sprint planning to be developed after Phase 1-3 validation*

---

## 13. Success Metrics

### 13.1 Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Audit completion rate | 95%+ | End-to-end success |
| API response time | <2s | 95th percentile |
| System uptime | 99.9% | Monthly |
| Test coverage | >85% | TDD compliance |
| Ontology validation | 100% | Schema.org compliance |

### 13.2 Business Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Visibility score improvement | 60%+ | 30 days |
| Customer satisfaction (NPS) | 50+ | Quarterly |
| Monthly recurring revenue | $100K | 12 months |
| Customer retention | 90%+ | Annual |
| Cost savings vs. alternatives | 65% | Ongoing |

### 13.3 Agent Performance Metrics

| Agent | Key Metric | Target |
|-------|------------|--------|
| P1 | Configuration success rate | 100% |
| P2 | Asset discovery coverage | 95%+ |
| P4 | Scoring accuracy | 95% correlation |
| P6 | Opportunity identification | Top 5 validated |
| P9 | Content approval rate | 90%+ first draft |
| P13 | Alert accuracy | <5% false positives |

---

## 14. Appendices

### 14.1 Glossary

| Term | Definition |
|------|------------|
| **BAIV** | Be AI Visible - the product/platform instance |
| **PF-Core** | Platform Foundation Core - shared infrastructure |
| **PF-Instance** | Product implementation on PF-Core |
| **VSOM** | Vision, Strategy, Objectives, Metrics |
| **OAA** | Ontology Architect Agent |
| **HITL** | Human-in-the-Loop |
| **PAA** | People Also Ask (Google search feature) |
| **ICP** | Ideal Customer Profile |

### 14.2 Related Documents

| Document | Location | Purpose |
|----------|----------|---------|
| PRD_PF_CORE_VSOM_Module_v1.0 | GitHub | Value Engineering framework |
| DATABASE_SCHEMA_COMPLETE.md | GitHub | Database schema reference |
| Ontology Relationships Guide | GitHub | Ontology integration patterns |
| CMO-OKR-ONTOLOGY v3.0.0 | GitHub | Marketing objectives framework |
| AI Visibility Ontology v1.1 | GitHub | Platform analysis schema |

### 14.3 Agent-API-Tool Alignment (To Be Completed)

*This section to be populated in collaboration with colleague's work on APIs, tools, sub-agents, and skills.*

```yaml
alignment_template:
  agent_code: "P[X]"
  apis_consumed: []
  tools_required: []
  skills_needed: []
  sub_agents: []
  dependencies: []
```

### 14.4 Migration Notes (n8n → Claude Agent SDK)

**Key Differences:**

| Aspect | n8n (Previous) | Claude Agent SDK (Current) |
|--------|----------------|---------------------------|
| Orchestration | Visual workflow builder | Programmatic Python SDK |
| State management | n8n workflow state | SDK context + database |
| Error handling | Node-level try/catch | SDK exception handling |
| Scalability | Worker-based | Async/concurrent execution |
| Cost model | Self-hosted or cloud | API usage-based |

**Migration Checklist:**
- [ ] Convert n8n workflow JSON to Python agent definitions
- [ ] Migrate webhook triggers to API endpoints
- [ ] Implement equivalent tool functions
- [ ] Map n8n expressions to Python logic
- [ ] Preserve state management patterns
- [ ] Update monitoring/logging integration

---

## Document Status

**Current Status:** DRAFT - For Review

**Review Items:**
1. Alignment with colleague's API/tools/skills work
2. Claude Agent SDK integration patterns validation
3. PF-Core dependency confirmation
4. Phase timeline feasibility
5. Ontology completeness check

**Next Steps:**
1. Review and align with existing BAIV development work
2. Consolidate with colleague's agent/tool specifications
3. Move to GitHub for version control
4. Create implementation sprint plans

---

*Document prepared for PRD review session. Subject to revision based on alignment discussions.*
