# PRD v1.7 Scope Definition
## BAIV Be AI Visible - Enhanced Structure

**Version:** 1.0.0  
**Date:** December 2025  
**Status:** SCOPE DEFINITION - Pre-Draft  
**Purpose:** Define structure and content for PRD v1.7 incorporating MILANA components

---

## 1. Key Decisions Captured

| # | Decision | Status | Notes |
|---|----------|--------|-------|
| 1 | RRF Algorithm positioning | 🔶 HOLD | To be discussed - do not finalize |
| 2 | All Ontologies via PF-Core OAA | ✅ CONFIRMED | No instance-specific ontology storage |
| 3 | Database design optimization | 🔄 RECONSIDER | Current schema needs review |
| 4 | MILANA mappings | ✅ CONFIRMED | Clearly delineated and separate in PRD |

---

## 2. Ontology Architecture: All via PF-Core OAA

### 2.1 Confirmed Architecture

```mermaid
flowchart TB
    subgraph OAA["PF-CORE: ONTOLOGY ARCHITECT AGENT"]
        direction TB
        
        subgraph REGISTRY["OAA REGISTRY (Single Source of Truth)"]
            direction LR
            REG_ALL["<b>ALL ONTOLOGIES</b><br/>registered, validated,<br/>governed here"]
        end
        
        subgraph FUNCTIONS["OAA FUNCTIONS"]
            direction LR
            VAL["<b>Validator</b><br/>Schema.org compliance<br/>JSON-LD validity"]
            GOV["<b>Governor</b><br/>Lifecycle states<br/>Approval workflows"]
            EVO["<b>Evolver</b><br/>Version control<br/>Migration support"]
        end
    end

    subgraph ONTOLOGIES["ALL ONTOLOGIES (Registered in OAA)"]
        direction TB
        
        subgraph PLATFORM_ONT["PLATFORM ONTOLOGIES"]
            O_ORG["organization"]
            O_VSOM["vsom"]
            O_OKR["okr"]
            O_RACI["raci"]
            O_GAP["gap_analysis"]
            O_BRAND["universal_brand"]
            O_AGENT["agent_architecture"]
        end
        
        subgraph DOMAIN_ONT["DOMAIN ONTOLOGIES"]
            O_AIVIZ["ai_visibility"]
            O_CMO["cmo_okr"]
            O_CUST["customer_organization"]
        end
    end

    subgraph INSTANCES["PF-INSTANCES (Consumers)"]
        BAIV["BAIV<br/>Consumes: ai_visibility,<br/>cmo_okr, universal_brand"]
        AIR["AIR<br/>Consumes: ai_readiness,<br/>cto_okr, universal_brand"]
        W4M["W4M<br/>Consumes: value_prop,<br/>product_okr, universal_brand"]
    end

    REG_ALL --> FUNCTIONS
    FUNCTIONS --> ONTOLOGIES
    ONTOLOGIES -->|"CE delivers<br/>to instances"| INSTANCES

    style OAA fill:#4f46e5,color:#fff
    style PLATFORM_ONT fill:#1e40af,color:#fff
    style DOMAIN_ONT fill:#0891b2,color:#fff
    style INSTANCES fill:#059669,color:#fff
```

### 2.2 Ontology Categorization

| Category | Ontologies | Scope | Consumers |
|----------|------------|-------|-----------|
| **Platform** | organization, vsom, okr, raci, gap_analysis, universal_brand, agent_architecture | All instances | BAIV, AIR, W4M, future |
| **Domain: Marketing** | ai_visibility, cmo_okr | Marketing products | BAIV |
| **Domain: Technology** | ai_readiness, cto_okr | Tech products | AIR |
| **Domain: Product** | value_proposition, product_okr | Product products | W4M |
| **Domain: Shared** | customer_organization | Multiple | BAIV, AIR |

### 2.3 Ontology Lifecycle (All via OAA)

```mermaid
stateDiagram-v2
    [*] --> Draft: Create ontology
    Draft --> Review: Submit for validation
    Review --> Draft: Validation failed
    Review --> Active: OAA validates & approves
    Active --> Deprecated: Superseded
    Deprecated --> Archived: No longer used
    Archived --> [*]
    
    note right of Review
        OAA Validator checks:
        - Schema.org compliance
        - JSON-LD validity
        - Integrity
        - Competency tests
    end note
    
    note right of Active
        OAA Governor manages:
        - Access control
        - Usage tracking
        - Change requests
    end note
```

---

## 3. PRD v1.7 Structure with MILANA Delineation

### 3.1 Proposed Section Structure

```
PRD v1.7: BAIV Be AI Visible
│
├── §1 Executive Summary
├── §2 Organizational Alignment Framework
├── §3 PF-Core Architecture
│
├── §4 Value Engineering (VE)
│   ├── VE-100 to VE-600
│   └── §4.7 MILANA INTEGRATION: Priority Scoring Pattern ◄── MILANA
│
├── §5 Context Engineering (CE)
│   ├── CE-100 to CE-500
│   └── §5.6 MILANA INTEGRATION: Additional Retrievers ◄── MILANA
│
├── §6 Gap Analysis Agent
│   └── §6.3 MILANA INTEGRATION: RRF Gap Techniques ◄── MILANA
│
├── §7 Ontology Architect Agent (OAA)
│   ├── §7.1 OAA Functions (All ontologies via OAA)
│   ├── §7.2 Platform Ontologies
│   ├── §7.3 Domain Ontologies
│   └── §7.4 MILANA INTEGRATION: Ontology Contributions ◄── MILANA
│
├── §8 BAIV Instance Configuration
│
├── §9 Be AI Visible Product Definition
│   ├── §9.1 Problem Statement
│   ├── §9.2 Value Proposition
│   ├── §9.3 Process Flow
│   └── §9.4 MILANA INTEGRATION: RRF System (HOLD) ◄── MILANA/HOLD
│
├── §10 Agent Architecture
│   └── §10.5 MILANA INTEGRATION: Skill Enhancements ◄── MILANA
│
├── §11 PMF-Gated Agent Build Model
│
├── §12 API Architecture (NEW)
│   ├── §12.1 API Design Principles
│   ├── §12.2 Endpoint Mappings
│   ├── §12.3 Input/Output Schemas
│   └── §12.4 MILANA INTEGRATION: API Endpoints ◄── MILANA
│
├── §13 Analytics, Dashboards & Scorecards (NEW)
│   ├── §13.1 Analytics Framework
│   ├── §13.2 AI Visibility Metrics Tree
│   ├── §13.3 Dashboard Specifications
│   ├── §13.4 Scorecard Definitions
│   └── §13.5 MILANA INTEGRATION: RRF Analytics (HOLD) ◄── MILANA/HOLD
│
├── §14 Ontology Framework
│   └── (Consolidated - all via OAA per §7)
│
├── §15 Technical Stack
│
├── §16 Data Architecture
│   ├── §16.1 Design Principles
│   ├── §16.2 Core Tables
│   ├── §16.3 BAIV Tables
│   └── §16.4 MILANA INTEGRATION: Table Mappings ◄── MILANA
│
├── §17 Process Flows
│
├── §18 Implementation Roadmap
│
├── §19 Success Metrics
│
└── APPENDIX A: MILANA Integration Summary ◄── MILANA (Complete Reference)
```

### 3.2 MILANA Integration Sections Visualization

```mermaid
flowchart TB
    subgraph PRD["PRD v1.7 STRUCTURE"]
        direction TB
        
        subgraph CORE["CORE SECTIONS"]
            S1["§1-3 Overview"]
            S4["§4 Value Engineering"]
            S5["§5 Context Engineering"]
            S6["§6 Gap Analysis"]
            S7["§7 OAA"]
            S8["§8-11 BAIV Product"]
        end
        
        subgraph NEW["NEW SECTIONS"]
            S12["§12 API Architecture"]
            S13["§13 Analytics & Dashboards"]
        end
        
        subgraph INFRA["INFRASTRUCTURE"]
            S14["§14 Ontology Framework"]
            S15["§15 Technical Stack"]
            S16["§16 Data Architecture"]
            S17["§17-19 Implementation"]
        end
    end

    subgraph MILANA["MILANA INTEGRATION POINTS"]
        direction TB
        M1["§4.7 Priority Scoring"]
        M2["§5.6 Additional Retrievers"]
        M3["§6.3 RRF Gap Techniques"]
        M4["§7.4 Ontology Contributions"]
        M5["§9.4 RRF System<br/>(HOLD)"]
        M6["§10.5 Skill Enhancements"]
        M7["§12.4 API Endpoints"]
        M8["§13.5 RRF Analytics<br/>(HOLD)"]
        M9["§16.4 Table Mappings"]
        MA["APPENDIX A:<br/>Complete Reference"]
    end

    S4 -.-> M1
    S5 -.-> M2
    S6 -.-> M3
    S7 -.-> M4
    S8 -.-> M5
    S8 -.-> M6
    S12 -.-> M7
    S13 -.-> M8
    S16 -.-> M9
    INFRA -.-> MA

    style CORE fill:#1e40af,color:#fff
    style NEW fill:#f59e0b,color:#000
    style INFRA fill:#64748b,color:#fff
    style MILANA fill:#0891b2,color:#fff
    style M5 fill:#dc2626,color:#fff
    style M8 fill:#dc2626,color:#fff
```

---

## 4. NEW: §12 API Architecture

### 4.1 API Design Principles

```mermaid
flowchart LR
    subgraph PRINCIPLES["API DESIGN PRINCIPLES"]
        P1["<b>RESTful</b><br/>Resource-oriented"]
        P2["<b>Versioned</b><br/>/api/v1/..."]
        P3["<b>Tenant-Scoped</b><br/>All requests scoped"]
        P4["<b>Schema-Validated</b><br/>JSON Schema"]
        P5["<b>Paginated</b><br/>Cursor-based"]
    end
```

### 4.2 API Endpoint Categories

```mermaid
flowchart TB
    subgraph API["BAIV API ENDPOINTS"]
        direction TB
        
        subgraph CONFIG["CONFIGURATION APIs"]
            A1["/api/v1/organizations/{id}/config"]
            A2["/api/v1/organizations/{id}/brand"]
            A3["/api/v1/organizations/{id}/platforms"]
        end
        
        subgraph DISCOVERY["DISCOVERY APIs"]
            A4["/api/v1/organizations/{id}/assets"]
            A5["/api/v1/organizations/{id}/citations"]
            A6["/api/v1/organizations/{id}/competitors"]
        end
        
        subgraph ANALYSIS["ANALYSIS APIs"]
            A7["/api/v1/organizations/{id}/gaps"]
            A8["/api/v1/organizations/{id}/opportunities"]
            A9["/api/v1/organizations/{id}/health"]
        end
        
        subgraph GENERATION["GENERATION APIs"]
            A10["/api/v1/organizations/{id}/content/ideas"]
            A11["/api/v1/organizations/{id}/content/generate"]
            A12["/api/v1/organizations/{id}/content/optimize"]
        end
        
        subgraph REPORTING["REPORTING APIs"]
            A13["/api/v1/organizations/{id}/dashboard"]
            A14["/api/v1/organizations/{id}/scorecard"]
            A15["/api/v1/organizations/{id}/reports"]
        end
    end

    style CONFIG fill:#1e40af,color:#fff
    style DISCOVERY fill:#059669,color:#fff
    style ANALYSIS fill:#0891b2,color:#fff
    style GENERATION fill:#7c3aed,color:#fff
    style REPORTING fill:#f59e0b,color:#000
```

### 4.3 API Input/Output Flow

```mermaid
flowchart LR
    subgraph INPUT["API INPUTS"]
        I1["Organization Context"]
        I2["Brand Configuration"]
        I3["Platform Selection"]
        I4["Query Parameters"]
        I5["Filters & Pagination"]
    end

    subgraph PROCESSING["PROCESSING"]
        P1["Validation Layer"]
        P2["Business Logic"]
        P3["Agent Orchestration"]
        P4["Data Access"]
    end

    subgraph OUTPUT["API OUTPUTS"]
        O1["Structured JSON"]
        O2["Pagination Metadata"]
        O3["Error Responses"]
        O4["Async Job Status"]
    end

    INPUT --> P1 --> P2 --> P3 --> P4 --> OUTPUT

    style INPUT fill:#1e40af,color:#fff
    style PROCESSING fill:#7c3aed,color:#fff
    style OUTPUT fill:#059669,color:#fff
```

### 4.4 MILANA INTEGRATION: API Endpoints

```mermaid
flowchart TB
    subgraph MILANA_API["§12.4 MILANA INTEGRATION: API Endpoints"]
        direction TB
        
        subgraph FROM_MILANA["FROM MILANA"]
            MA1["POST /rrf/analyze-gaps"]
            MA2["GET /rrf/health/{orgId}"]
            MA3["GET /rrf/priority-actions/{orgId}"]
            MA4["GET /rrf/executive-summary/{orgId}"]
            MA5["POST /content/generate-plan"]
            MA6["POST /leads/google-maps"]
            MA7["POST /leads/enrich-emails"]
        end
        
        subgraph MAPPED_TO["MAPPED TO BAIV"]
            MB1["/api/v1/orgs/{id}/gaps<br/>(HOLD: RRF integration)"]
            MB2["/api/v1/orgs/{id}/health"]
            MB3["/api/v1/orgs/{id}/actions"]
            MB4["/api/v1/orgs/{id}/dashboard"]
            MB5["/api/v1/orgs/{id}/content/plan"]
            MB6["/api/v1/orgs/{id}/leads<br/>(Optional Module)"]
            MB7["/api/v1/orgs/{id}/leads/enrich<br/>(Optional Module)"]
        end
    end

    MA1 -.->|"Map"| MB1
    MA2 -.->|"Map"| MB2
    MA3 -.->|"Map"| MB3
    MA4 -.->|"Map"| MB4
    MA5 -.->|"Map"| MB5
    MA6 -.->|"Map"| MB6
    MA7 -.->|"Map"| MB7

    style FROM_MILANA fill:#0891b2,color:#fff
    style MAPPED_TO fill:#059669,color:#fff
    style MB1 fill:#dc2626,color:#fff
```

---

## 5. NEW: §13 Analytics, Dashboards & Scorecards

### 5.1 Analytics Framework

```mermaid
flowchart TB
    subgraph ANALYTICS["ANALYTICS FRAMEWORK"]
        direction TB
        
        subgraph DATA_LAYER["DATA COLLECTION"]
            D1["Citation Data"]
            D2["Content Inventory"]
            D3["Competitor Data"]
            D4["Platform Metrics"]
        end
        
        subgraph CALC_LAYER["CALCULATION ENGINE"]
            C1["Score Calculation"]
            C2["Trend Analysis"]
            C3["Gap Identification"]
            C4["Benchmarking"]
        end
        
        subgraph PRESENT_LAYER["PRESENTATION"]
            P1["Dashboards"]
            P2["Scorecards"]
            P3["Reports"]
            P4["Alerts"]
        end
    end

    DATA_LAYER --> CALC_LAYER --> PRESENT_LAYER

    style DATA_LAYER fill:#64748b,color:#fff
    style CALC_LAYER fill:#7c3aed,color:#fff
    style PRESENT_LAYER fill:#059669,color:#fff
```

### 5.2 AI Visibility Metrics Tree

```mermaid
flowchart TB
    subgraph METRICS_TREE["AI VISIBILITY METRICS TREE"]
        direction TB
        
        ROOT["<b>AI VISIBILITY SCORE</b><br/>0-100 Overall Score"]
        
        subgraph L1["LEVEL 1: PRIMARY DIMENSIONS"]
            L1_1["<b>Citation Performance</b><br/>Weight: 30%"]
            L1_2["<b>Content Quality</b><br/>Weight: 25%"]
            L1_3["<b>Technical Optimization</b><br/>Weight: 15%"]
            L1_4["<b>Competitive Position</b><br/>Weight: 15%"]
            L1_5["<b>Discovery Channels</b><br/>Weight: 10%"]
            L1_6["<b>Authority Building</b><br/>Weight: 5%"]
        end
        
        subgraph L2_CITATION["CITATION METRICS"]
            L2_1A["Citation Count"]
            L2_1B["Average Position"]
            L2_1C["Citation Sentiment"]
            L2_1D["Share of Voice"]
        end
        
        subgraph L2_CONTENT["CONTENT METRICS"]
            L2_2A["AI-Friendly Score"]
            L2_2B["Schema Coverage"]
            L2_2C["Content Freshness"]
            L2_2D["Topic Coverage"]
        end
        
        subgraph L2_TECH["TECHNICAL METRICS"]
            L2_3A["Crawlability"]
            L2_3B["Schema Markup"]
            L2_3C["Page Speed"]
            L2_3D["Mobile Optimization"]
        end
        
        subgraph L2_COMP["COMPETITIVE METRICS"]
            L2_4A["Relative Citation Share"]
            L2_4B["Topic Gap vs Competitors"]
            L2_4C["Authority Comparison"]
        end
        
        subgraph L2_DISC["DISCOVERY METRICS"]
            L2_5A["Platform Coverage"]
            L2_5B["Query Coverage"]
            L2_5C["Intent Match Rate"]
        end
        
        subgraph L2_AUTH["AUTHORITY METRICS"]
            L2_6A["Backlink Quality"]
            L2_6B["Brand Mentions"]
            L2_6C["Expert Citations"]
        end
    end

    ROOT --> L1_1 & L1_2 & L1_3 & L1_4 & L1_5 & L1_6
    L1_1 --> L2_CITATION
    L1_2 --> L2_CONTENT
    L1_3 --> L2_TECH
    L1_4 --> L2_COMP
    L1_5 --> L2_DISC
    L1_6 --> L2_AUTH

    style ROOT fill:#1e40af,color:#fff
    style L1 fill:#2563eb,color:#fff
    style L2_CITATION fill:#059669,color:#fff
    style L2_CONTENT fill:#059669,color:#fff
    style L2_TECH fill:#059669,color:#fff
    style L2_COMP fill:#059669,color:#fff
    style L2_DISC fill:#059669,color:#fff
    style L2_AUTH fill:#059669,color:#fff
```

### 5.3 Metrics Tree Detail Table

| Level | Metric | Description | Calculation | Target |
|-------|--------|-------------|-------------|--------|
| **L0** | **AI Visibility Score** | Overall visibility health | Weighted sum of L1 | 75+ |
| **L1** | **Citation Performance** | How often AI platforms cite you | Weighted sum of L2 | 70+ |
| L2 | Citation Count | Monthly citations across platforms | Count | 50+/month |
| L2 | Average Position | Mean position in citations | Average | Top 5 |
| L2 | Citation Sentiment | Positive/neutral/negative ratio | Sentiment analysis | 80%+ positive |
| L2 | Share of Voice | % of category citations | Your citations / Total | 20%+ |
| **L1** | **Content Quality** | AI-readiness of content | Weighted sum of L2 | 75+ |
| L2 | AI-Friendly Score | Content structure for AI | Proprietary score | 80+ |
| L2 | Schema Coverage | % content with schema | Coverage % | 90%+ |
| L2 | Content Freshness | Age-weighted relevance | Decay function | 70+ |
| L2 | Topic Coverage | Topics covered vs needed | Coverage ratio | 80%+ |
| **L1** | **Technical Optimization** | Technical AI discoverability | Weighted sum of L2 | 80+ |
| L2 | Crawlability | Can AI platforms access | Binary + issues | 100% |
| L2 | Schema Markup | Valid structured data | Validation % | 95%+ |
| L2 | Page Speed | Load time for scrapers | Seconds | <3s |
| L2 | Mobile Optimization | Mobile-friendly | Score | 90+ |
| **L1** | **Competitive Position** | Ranking vs competitors | Weighted sum of L2 | 60+ |
| L2 | Relative Citation Share | Your share vs top competitor | Ratio | >1.0 |
| L2 | Topic Gap vs Competitors | Topics they cover, you don't | Gap count | <10 |
| L2 | Authority Comparison | Domain authority comparison | Relative score | Top 3 |
| **L1** | **Discovery Channels** | Presence across AI platforms | Weighted sum of L2 | 70+ |
| L2 | Platform Coverage | # platforms citing you | Count of 5 | 4+ |
| L2 | Query Coverage | % relevant queries citing you | Coverage % | 60%+ |
| L2 | Intent Match Rate | Citation matches query intent | Match % | 80%+ |
| **L1** | **Authority Building** | Long-term authority signals | Weighted sum of L2 | 50+ |
| L2 | Backlink Quality | High-authority backlinks | Count | 100+ |
| L2 | Brand Mentions | Unlinked brand mentions | Count | 50+/month |
| L2 | Expert Citations | Citations by recognized experts | Count | 10+ |

### 5.4 Dashboard Specifications

```mermaid
flowchart TB
    subgraph DASHBOARDS["DASHBOARD SPECIFICATIONS"]
        direction TB
        
        subgraph EXEC["EXECUTIVE DASHBOARD"]
            E1["Overall Health Score<br/>(single number)"]
            E2["Trend Indicator<br/>(↑↓→)"]
            E3["Top 3 Actions<br/>(priority list)"]
            E4["ROI Summary<br/>(value delivered)"]
        end
        
        subgraph OPS["OPERATIONAL DASHBOARD"]
            O1["Metrics Tree View"]
            O2["Gap Analysis Summary"]
            O3["Content Calendar"]
            O4["Action Queue"]
        end
        
        subgraph PERF["PERFORMANCE DASHBOARD"]
            P1["Citation Trends"]
            P2["Platform Breakdown"]
            P3["Competitor Comparison"]
            P4["Topic Performance"]
        end
        
        subgraph CONTENT["CONTENT DASHBOARD"]
            C1["Content Inventory"]
            C2["Gap Heatmap"]
            C3["Publishing Schedule"]
            C4["Performance by Content"]
        end
    end

    style EXEC fill:#1e40af,color:#fff
    style OPS fill:#059669,color:#fff
    style PERF fill:#7c3aed,color:#fff
    style CONTENT fill:#0891b2,color:#fff
```

### 5.5 Scorecard Definitions

```mermaid
flowchart LR
    subgraph SCORECARDS["SCORECARD TYPES"]
        direction TB
        
        subgraph HEALTH["HEALTH SCORECARD"]
            H1["<b>Overall Score:</b> 0-100"]
            H2["<b>Status:</b> Excellent/Good/Warning/Critical"]
            H3["<b>Trend:</b> Improving/Stable/Declining"]
            H4["<b>vs Target:</b> Above/On Track/Below"]
        end
        
        subgraph GAP["GAP SCORECARD"]
            G1["<b>Total Gaps:</b> Count"]
            G2["<b>Critical Gaps:</b> Count"]
            G3["<b>Opportunity Value:</b> $"]
            G4["<b>Estimated Effort:</b> Hours"]
        end
        
        subgraph PROGRESS["PROGRESS SCORECARD"]
            P1["<b>Actions Completed:</b> %"]
            P2["<b>Content Published:</b> Count"]
            P3["<b>Gaps Closed:</b> Count"]
            P4["<b>Score Improvement:</b> Δ"]
        end
    end

    style HEALTH fill:#10b981,color:#fff
    style GAP fill:#f59e0b,color:#000
    style PROGRESS fill:#3b82f6,color:#fff
```

### 5.6 MILANA INTEGRATION: Analytics (HOLD)

```mermaid
flowchart TB
    subgraph MILANA_ANALYTICS["§13.5 MILANA INTEGRATION: RRF Analytics (HOLD)"]
        direction TB
        
        HOLD_NOTE["⚠️ RRF ALGORITHM INTEGRATION ON HOLD<br/>Pending discussion on positioning"]
        
        subgraph PENDING["PENDING DECISIONS"]
            PD1["RRF as scoring method<br/>vs alternative algorithms"]
            PD2["RRF in Analytics Framework<br/>vs standalone section"]
            PD3["RRF weight configuration<br/>vs fixed weights"]
        end
        
        subgraph MILANA_RRF["MILANA RRF COMPONENTS (Reference Only)"]
            MR1["rrf_topic_coverage"]
            MR2["rrf_executive_summary"]
            MR3["rrf_priority_actions"]
            MR4["RRF scoring algorithm"]
        end
    end

    HOLD_NOTE --> PENDING
    PENDING -.->|"To be mapped<br/>after discussion"| MILANA_RRF

    style HOLD_NOTE fill:#dc2626,color:#fff
    style PENDING fill:#f59e0b,color:#000
    style MILANA_RRF fill:#0891b2,color:#fff
```

---

## 6. Data Architecture Optimization

### 6.1 Design Principles for Optimization

```mermaid
flowchart TB
    subgraph PRINCIPLES["DATA ARCHITECTURE PRINCIPLES"]
        direction TB
        
        P1["<b>1. JSONB for Flexibility</b><br/>Store complex structures<br/>in JSONB columns"]
        P2["<b>2. Denormalize for Read</b><br/>Optimize for dashboard<br/>query patterns"]
        P3["<b>3. Partition by Tenant</b><br/>RLS + potential<br/>table partitioning"]
        P4["<b>4. Materialized Views</b><br/>Pre-compute metrics<br/>for dashboards"]
        P5["<b>5. Event Sourcing</b><br/>Track changes for<br/>trend analysis"]
    end
```

### 6.2 Optimized Table Structure

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ BAIV_VISIBILITY_SNAPSHOTS : "has"
    ORGANIZATIONS ||--o{ BAIV_CITATIONS : "tracks"
    ORGANIZATIONS ||--o{ BAIV_CONTENT_INVENTORY : "owns"
    ORGANIZATIONS ||--o{ BAIV_GAPS : "has"
    ORGANIZATIONS ||--o{ BAIV_ACTIONS : "has"
    
    ORGANIZATIONS {
        uuid id PK
        text name
        jsonb brand_config
        jsonb platform_config
        jsonb scoring_config
        timestamp created_at
    }
    
    BAIV_VISIBILITY_SNAPSHOTS {
        uuid id PK
        uuid org_id FK
        date snapshot_date
        int overall_score
        jsonb dimension_scores
        jsonb metrics_tree
        jsonb trends
        timestamp created_at
    }
    
    BAIV_CITATIONS {
        uuid id PK
        uuid org_id FK
        text platform
        text query
        int position
        text context
        jsonb metadata
        timestamp captured_at
    }
    
    BAIV_CONTENT_INVENTORY {
        uuid id PK
        uuid org_id FK
        text url
        text content_type
        int ai_friendly_score
        jsonb schema_data
        jsonb performance
        timestamp last_audited
    }
    
    BAIV_GAPS {
        uuid id PK
        uuid org_id FK
        text gap_type
        text dimension
        numeric severity
        numeric opportunity
        jsonb details
        text status
        timestamp identified_at
    }
    
    BAIV_ACTIONS {
        uuid id PK
        uuid org_id FK
        uuid gap_id FK
        text action_type
        text priority
        numeric estimated_impact
        text status
        timestamp created_at
        timestamp completed_at
    }
```

### 6.3 MILANA Table Mapping

```mermaid
flowchart LR
    subgraph MILANA_TABLES["MILANA TABLES"]
        MT1["tenants"]
        MT2["rrf_topic_coverage"]
        MT3["gap_analysis"]
        MT4["article_clusters"]
        MT5["rrf_executive_summary"]
        MT6["rrf_priority_actions"]
        MT7["google_maps_leads"]
    end

    subgraph OPTIMIZED["OPTIMIZED BAIV TABLES"]
        OT1["organizations<br/>(extended)"]
        OT2["baiv_visibility_snapshots<br/>(consolidated metrics)"]
        OT3["baiv_gaps<br/>(consolidated)"]
        OT4["baiv_content_inventory<br/>(includes clusters)"]
        OT5["baiv_actions<br/>(consolidated)"]
        OT6["baiv_leads<br/>(optional)"]
    end

    MT1 -->|"Extend"| OT1
    MT2 -->|"Consolidate into"| OT2
    MT3 -->|"Consolidate into"| OT3
    MT4 -->|"Consolidate into"| OT4
    MT5 -->|"Consolidate into"| OT2
    MT6 -->|"Consolidate into"| OT5
    MT7 -->|"Optional"| OT6

    style MILANA_TABLES fill:#0891b2,color:#fff
    style OPTIMIZED fill:#059669,color:#fff
```

---

## 7. MILANA Integration Summary Diagram

```mermaid
flowchart TB
    subgraph MILANA["MILANA PLATFORM"]
        direction TB
        
        subgraph M_ONT["ONTOLOGIES"]
            MO1["Universal Brand"]
            MO2["AI Visibility"]
            MO3["Agent Architecture"]
        end
        
        subgraph M_SKILLS["SKILLS"]
            MS1["gap_analyzer"]
            MS2["content_audit"]
            MS3["competitor_analysis"]
            MS4["rrf_content_planner"]
            MS5["topic_clustering"]
            MS6["priority_scoring"]
            MS7["lead_generation"]
            MS8["social_publishing"]
        end
        
        subgraph M_RRF["RRF SYSTEM (HOLD)"]
            MR1["RRF Algorithm"]
            MR2["Health Scoring"]
            MR3["Priority Scoring"]
        end
        
        subgraph M_DB["DATABASE"]
            MD1["rrf_topic_coverage"]
            MD2["gap_analysis"]
            MD3["executive_summary"]
            MD4["priority_actions"]
            MD5["article_clusters"]
        end
        
        subgraph M_API["API ENDPOINTS"]
            MA1["Gap Analysis APIs"]
            MA2["Content Planning APIs"]
            MA3["Lead Generation APIs"]
        end
    end

    subgraph BAIV_PRD["BAIV PRD v1.7"]
        direction TB
        
        subgraph PRD_OAA["§7 OAA (All Ontologies)"]
            PO1["Register all ontologies"]
            PO2["Validate via OAA"]
            PO3["Govern lifecycle"]
        end
        
        subgraph PRD_AGENTS["§10 Agent Architecture"]
            PA1["P2 Discovery<br/>+ content_audit"]
            PA2["P3 Capture<br/>+ competitor_analysis"]
            PA3["P7 Ideation<br/>+ topic_clustering"]
            PA4["P8 Selection<br/>+ priority_scoring"]
        end
        
        subgraph PRD_API["§12 API Architecture"]
            PI1["Mapped endpoints"]
            PI2["Input/Output schemas"]
        end
        
        subgraph PRD_ANALYTICS["§13 Analytics (HOLD RRF)"]
            PN1["Metrics Tree"]
            PN2["Dashboards"]
            PN3["Scorecards"]
        end
        
        subgraph PRD_DB["§16 Data Architecture"]
            PD1["Optimized tables"]
            PD2["MILANA mappings"]
        end
    end

    M_ONT -->|"All via OAA"| PRD_OAA
    M_SKILLS -->|"Enhance agents"| PRD_AGENTS
    M_API -->|"Map endpoints"| PRD_API
    M_RRF -.->|"HOLD"| PRD_ANALYTICS
    M_DB -->|"Optimize & map"| PRD_DB

    style MILANA fill:#0891b2,color:#fff
    style PRD_OAA fill:#4f46e5,color:#fff
    style PRD_AGENTS fill:#059669,color:#fff
    style PRD_API fill:#1e40af,color:#fff
    style PRD_ANALYTICS fill:#f59e0b,color:#000
    style PRD_DB fill:#64748b,color:#fff
    style M_RRF fill:#dc2626,color:#fff
```

---

## 8. Decision Matrix for v1.7

### 8.1 Confirmed Decisions

| # | Decision | Status | PRD Section |
|---|----------|--------|-------------|
| 1 | All ontologies via PF-Core OAA | ✅ CONFIRMED | §7 |
| 2 | MILANA mappings clearly delineated | ✅ CONFIRMED | Subsections + Appendix A |
| 3 | New API Architecture section | ✅ CONFIRMED | §12 |
| 4 | New Analytics/Dashboards section | ✅ CONFIRMED | §13 |
| 5 | AI Visibility Metrics Tree | ✅ CONFIRMED | §13.2 |
| 6 | Database optimization | ✅ CONFIRMED | §16 |

### 8.2 Items on HOLD

| # | Item | Status | Reason |
|---|------|--------|--------|
| 1 | RRF Algorithm positioning | 🔶 HOLD | Awaiting discussion |
| 2 | RRF in Analytics Framework | 🔶 HOLD | Depends on #1 |
| 3 | RRF scoring weights | 🔶 HOLD | Depends on #1 |

### 8.3 Open Questions

| # | Question | Context |
|---|----------|---------|
| 1 | Should Analytics be §13 or earlier? | Structure placement |
| 2 | Lead Generation: Core or Optional? | Scope clarity |
| 3 | Social Publishing: Core or Optional? | Scope clarity |
| 4 | Dashboard framework: Custom or shadcn? | Technical decision |

---

## 9. Next Steps

1. **Review this scope document** - Confirm structure and content
2. **Discuss RRF positioning** - Resolve HOLD items
3. **Finalize Metrics Tree** - Confirm weights and targets
4. **Approve database optimization** - Confirm table consolidation
5. **Create PRD v1.7** - Implement approved scope

---

**Document Version:** 1.0.0  
**Status:** SCOPE DEFINITION  
**Next Action:** Review and confirm scope before PRD v1.7 creation
