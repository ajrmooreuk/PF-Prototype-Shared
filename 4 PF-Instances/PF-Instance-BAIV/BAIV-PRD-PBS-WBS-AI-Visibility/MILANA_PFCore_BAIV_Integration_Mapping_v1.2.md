# MILANA Components Integration Mapping
## Mapping to BAIV PRD v1.6 Sections

**Version:** 1.2.0  
**Date:** December 2025  
**Status:** DRAFT - For Collaborative Review  
**Purpose:** Map MILANA components to specific BAIV PRD v1.6 sections with RRF Analytics positioning and Ontology incorporation analysis

---

## 1. Executive Summary

This document maps MILANA's AI Visibility Platform components directly to the BAIV PRD v1.6 structure, with specific focus on:

1. **RRF (Reciprocal Rank Fusion)** - Positioned within Analytics & Scoring Metrics framework
2. **Ontology Incorporation** - How OAA and BAIV ontologies integrate into the AI Visibility product
3. **BAIV Tables** - Database architecture for the product instance

---

## 2. RRF: Definition, Rationale & Analytics Positioning

### 2.1 What is RRF (Reciprocal Rank Fusion)?

**Definition:**
> **Reciprocal Rank Fusion (RRF)** is a rank aggregation algorithm that combines multiple ranked lists into a single, unified ranking. Originally developed for information retrieval to merge results from different search algorithms, RRF assigns scores based on rank position rather than raw scores, making it robust for combining heterogeneous ranking sources.

**The RRF Formula:**
```
RRF_Score(d) = Σ (1 / (k + rank_r(d)))
```

Where:
- `d` = document/item being scored
- `k` = smoothing constant (typically 60)
- `rank_r(d)` = rank of document d in ranking r
- Σ = sum across all ranking sources

**BAIV Adaptation:**
In BAIV, RRF is adapted to combine multiple AI visibility dimensions into a unified priority score:

```
BAIV_RRF_Score(topic) = Σ (weight_i / (k + rank_i(topic)))
```

Where dimensions include:
- Search volume rank
- Current AI citation rank
- Content coverage rank
- Competitive position rank

### 2.2 Rationale for RRF Adoption

```mermaid
flowchart TB
    subgraph CHALLENGE["THE CHALLENGE"]
        C1["Multiple ranking<br/>dimensions"]
        C2["Different scales<br/>(volume vs rank vs %)"]
        C3["Need unified<br/>priority score"]
        C4["Must be fair across<br/>all dimensions"]
    end

    subgraph ALTERNATIVES["ALTERNATIVES CONSIDERED"]
        A1["<b>Simple Weighted Average</b><br/>❌ Sensitive to outliers<br/>❌ Scale-dependent"]
        A2["<b>Z-Score Normalization</b><br/>⚠️ Complex to implement<br/>⚠️ Requires distribution assumptions"]
        A3["<b>Borda Count</b><br/>⚠️ Linear decay<br/>⚠️ Less emphasis on top ranks"]
        A4["<b>RRF</b><br/>✅ Scale-independent<br/>✅ Robust to outliers<br/>✅ Emphasizes top ranks<br/>✅ Proven in IR research"]
    end

    subgraph DECISION["DECISION: RRF"]
        D1["Proven algorithm from<br/>information retrieval"]
        D2["Scale-independent<br/>ranking combination"]
        D3["Robust to missing data<br/>and outliers"]
        D4["Emphasizes items that<br/>rank well across multiple<br/>dimensions"]
    end

    CHALLENGE --> ALTERNATIVES
    ALTERNATIVES --> A4
    A4 --> DECISION

    style A4 fill:#10b981,color:#fff
    style DECISION fill:#059669,color:#fff
```

**Key Reasons for RRF Adoption:**

| Factor | RRF Advantage | Business Impact |
|--------|---------------|-----------------|
| **Scale Independence** | Combines search volume (1000s) with ranks (1-100) without normalization | Simpler implementation, fewer assumptions |
| **Outlier Robustness** | Rank-based, not score-based | One bad metric doesn't skew results |
| **Top-Rank Emphasis** | 1/(k+1) >> 1/(k+100) | Prioritizes topics that excel in multiple areas |
| **Research Proven** | Used by major search engines | Battle-tested algorithm |
| **Interpretability** | Higher score = better opportunity | Easy for CMOs to understand |

### 2.3 RRF as Part of Analytics & Scoring Framework

RRF should NOT be a standalone section. It belongs within a broader **Analytics & Scoring Framework** that serves multiple purposes across the platform.

```mermaid
flowchart TB
    subgraph ANALYTICS["ANALYTICS & SCORING FRAMEWORK"]
        direction TB
        
        subgraph CORE["CORE FRAMEWORK (PF-Core)"]
            SCORING_FW["<b>Multi-Dimensional Scoring Framework</b><br/><br/>• Dimension definition<br/>• Weight configuration<br/>• Aggregation methods<br/>• Score normalization"]
            
            METHODS["<b>Scoring Methods Library</b><br/><br/>• RRF (Reciprocal Rank Fusion)<br/>• Weighted Average<br/>• Z-Score Normalization<br/>• Percentile Ranking"]
            
            HEALTH["<b>Health Score Pattern</b><br/><br/>• 0-100 scale<br/>• Threshold definitions<br/>• Trend calculation<br/>• Alert triggers"]
        end
        
        subgraph BAIV_IMPL["BAIV IMPLEMENTATION"]
            RRF_IMPL["<b>RRF for AI Visibility</b><br/><br/>Dimensions:<br/>• Search Volume (0.25)<br/>• Citation Rank (0.30)<br/>• Content Coverage (0.25)<br/>• Competitive Gap (0.20)<br/><br/>k = 60"]
            
            VIS_HEALTH["<b>AI Visibility Health Score</b><br/><br/>• Overall visibility score<br/>• Per-platform scores<br/>• Trend indicators"]
            
            GAP_SCORE["<b>Gap Severity Scoring</b><br/><br/>• Priority calculation<br/>• ROI estimation<br/>• Effort scoring"]
        end
        
        subgraph OTHER_IMPL["OTHER INSTANCE IMPLEMENTATIONS"]
            AIR_IMPL["<b>AIR: AI Readiness Score</b><br/>Different dimensions,<br/>same framework"]
            W4M_IMPL["<b>W4M: Value Prop Score</b><br/>Different dimensions,<br/>same framework"]
        end
    end

    SCORING_FW --> RRF_IMPL
    SCORING_FW --> AIR_IMPL
    SCORING_FW --> W4M_IMPL
    METHODS --> RRF_IMPL
    HEALTH --> VIS_HEALTH

    style CORE fill:#1e40af,color:#fff
    style BAIV_IMPL fill:#059669,color:#fff
    style OTHER_IMPL fill:#7c3aed,color:#fff
```

### 2.4 Proposed PRD Structure for Analytics & Scoring

Instead of §9.4 RRF Algorithm, propose restructuring as:

```
§X. ANALYTICS & SCORING FRAMEWORK

  §X.1 Multi-Dimensional Scoring Framework (PF-Core)
    - Dimension definition patterns
    - Weight configuration
    - Aggregation method selection
    
  §X.2 Scoring Methods Library (PF-Core)
    - RRF (Reciprocal Rank Fusion)
      - Definition and formula
      - When to use
      - Configuration parameters
    - Weighted Average
    - Percentile Ranking
    - Custom methods
    
  §X.3 Health Score Pattern (PF-Core)
    - 0-100 scale convention
    - Threshold definitions (Good/Warning/Critical)
    - Trend calculation
    - Alert integration
    
  §X.4 BAIV Scoring Implementation
    - AI Visibility RRF Configuration
    - Dimension definitions and weights
    - Gap severity scoring
    - Health score thresholds
```

### 2.5 RRF Configuration for BAIV

```yaml
# BAIV RRF Scoring Configuration
baiv_rrf_config:
  algorithm: "rrf"
  smoothing_constant: 60
  
  dimensions:
    search_volume:
      weight: 0.25
      description: "Monthly search volume for topic"
      source: "keyword_research_api"
      ranking: "descending"  # Higher volume = better rank
      
    citation_rank:
      weight: 0.30
      description: "Current position in AI platform citations"
      source: "ai_citation_audit"
      ranking: "ascending"  # Lower rank number = better
      
    content_coverage:
      weight: 0.25
      description: "Ratio of content published vs needed"
      source: "content_inventory"
      ranking: "descending"  # Higher coverage = better
      
    competitive_gap:
      weight: 0.20
      description: "Gap vs top competitor"
      source: "competitor_analysis"
      ranking: "descending"  # Larger gap = more opportunity
      
  health_thresholds:
    excellent: 80
    good: 60
    warning: 40
    critical: 20
    
  output:
    priority_score: "0-100 normalized"
    priority_tier: "P1/P2/P3/P4"
    estimated_impact: "derived from gap size"
```

---

## 3. Ontology Incorporation Analysis

### 3.1 Ontology Architecture Overview

```mermaid
flowchart TB
    subgraph OAA["OAA (ONTOLOGY ARCHITECT AGENT)"]
        direction TB
        
        subgraph REGISTRY["OAA REGISTRY"]
            REG_CORE["<b>PF-Core Ontologies</b><br/>(Platform-wide)"]
            REG_INST["<b>Instance Ontologies</b><br/>(Per product)"]
        end
        
        subgraph FUNCTIONS["OAA FUNCTIONS"]
            VAL["Validator"]
            GOV["Governor"]
            EVO["Evolver"]
        end
    end

    subgraph CORE_ONT["PF-CORE ONTOLOGIES"]
        ORG["organization.jsonld<br/>(schema.org base)"]
        VSOM["vsom.jsonld<br/>(strategy framework)"]
        OKR["okr.jsonld<br/>(metrics framework)"]
        GAP["gap_analysis.jsonld<br/>(gap patterns)"]
        RACI["raci.jsonld<br/>(accountability)"]
        UBO["universal_brand.jsonld<br/>(from MILANA)"]
        AAO["agent_architecture.jsonld<br/>(from MILANA)"]
    end

    subgraph BAIV_ONT["BAIV INSTANCE ONTOLOGIES"]
        AIVO["ai_visibility.jsonld<br/>(visibility dimensions)"]
        CMO["cmo_okr.jsonld<br/>(marketing metrics)"]
        CUST["customer_org.jsonld<br/>(client profiles)"]
    end

    REG_CORE --> CORE_ONT
    REG_INST --> BAIV_ONT
    
    VAL --> CORE_ONT
    VAL --> BAIV_ONT
    GOV --> CORE_ONT
    GOV --> BAIV_ONT

    style OAA fill:#4f46e5,color:#fff
    style CORE_ONT fill:#1e40af,color:#fff
    style BAIV_ONT fill:#059669,color:#fff
```

### 3.2 How Ontologies Flow into BAIV Product

```mermaid
flowchart TB
    subgraph REGISTRATION["1. ONTOLOGY REGISTRATION"]
        OAA_REG["OAA Registry receives<br/>ontology definitions"]
        VALIDATE["OAA Validator checks<br/>schema.org compliance"]
        STORE["Stored in Supabase<br/>ontology_registry table"]
    end

    subgraph RETRIEVAL["2. CONTEXT ENGINEERING RETRIEVAL"]
        CE100["CE-100 Discovery<br/>retrieves ontologies"]
        CE200["CE-200 Assembly<br/>builds context package"]
        CE400["CE-400 Instance Extensions<br/>adds BAIV-specific"]
    end

    subgraph DELIVERY["3. AGENT CONTEXT DELIVERY"]
        CE500["CE-500 Orchestration<br/>delivers to agents"]
        CONTEXT["Context Package includes:<br/>• Ontology schemas<br/>• Entity definitions<br/>• Relationship maps<br/>• Validation rules"]
    end

    subgraph USAGE["4. BAIV AGENT USAGE"]
        P0["P0 Orchestrator<br/>understands workflow entities"]
        P2["P2 Discovery<br/>knows what to discover"]
        P7["P7 Ideation<br/>understands content types"]
        P13["P13 Re-audit<br/>knows success criteria"]
    end

    subgraph OUTCOMES["5. SEMANTIC OUTCOMES"]
        STRUCT["Structured data capture"]
        REASON["Semantic reasoning"]
        INTEROP["Cross-instance interoperability"]
        EVOLVE["Governed evolution"]
    end

    REGISTRATION --> RETRIEVAL --> DELIVERY --> USAGE --> OUTCOMES

    style REGISTRATION fill:#4f46e5,color:#fff
    style RETRIEVAL fill:#7c3aed,color:#fff
    style DELIVERY fill:#7c3aed,color:#fff
    style USAGE fill:#059669,color:#fff
    style OUTCOMES fill:#10b981,color:#fff
```

### 3.3 PF-Core Ontologies and Their BAIV Application

#### 3.3.1 Universal Brand Ontology (from MILANA)

```mermaid
flowchart LR
    subgraph UBO["UNIVERSAL BRAND ONTOLOGY (PF-Core)"]
        UBO_DEF["<b>Defines:</b><br/>• Brand identity<br/>• Brand attributes<br/>• Brand touchpoints<br/>• Brand voice<br/>• Visual identity"]
    end

    subgraph BAIV_USE["BAIV APPLICATION"]
        P1_USE["<b>P1 Configuration</b><br/>Captures brand context<br/>for content generation"]
        P2_USE["<b>P2 Discovery</b><br/>Identifies brand assets<br/>across platforms"]
        P9_USE["<b>P9 Creation</b><br/>Ensures brand<br/>consistency in content"]
        DASH_USE["<b>Dashboard</b><br/>Brand visibility<br/>metrics display"]
    end

    subgraph OTHER_USE["OTHER INSTANCE USE"]
        AIR_USE["<b>AIR</b><br/>Brand readiness<br/>assessment"]
        W4M_USE["<b>W4M</b><br/>Brand value<br/>proposition"]
    end

    UBO --> BAIV_USE
    UBO --> OTHER_USE

    style UBO fill:#1e40af,color:#fff
    style BAIV_USE fill:#059669,color:#fff
    style OTHER_USE fill:#7c3aed,color:#fff
```

**Universal Brand Ontology Key Entities:**

| Entity | schema.org Base | BAIV Usage |
|--------|-----------------|------------|
| `Brand` | schema:Brand | Root entity for brand identity |
| `BrandIdentity` | Extension | Name, tagline, mission, values |
| `BrandVoice` | Extension | Tone, style, vocabulary |
| `BrandAsset` | schema:CreativeWork | Logos, images, content |
| `BrandTouchpoint` | Extension | Channels where brand appears |

#### 3.3.2 Agent Architecture Ontology (from MILANA)

```mermaid
flowchart LR
    subgraph AAO["AGENT ARCHITECTURE ONTOLOGY (PF-Core)"]
        AAO_DEF["<b>Defines:</b><br/>• Agent types<br/>• Agent capabilities<br/>• Agent relationships<br/>• Tool bindings<br/>• Orchestration patterns"]
    end

    subgraph BAIV_USE["BAIV APPLICATION"]
        P0_USE["<b>P0 Orchestrator</b><br/>Knows agent hierarchy<br/>and delegation rules"]
        CLUSTER_USE["<b>Agent Clusters</b><br/>Discovery, Generation,<br/>Optimization defined"]
        TOOL_USE["<b>Tool Binding</b><br/>Which tools each<br/>agent can invoke"]
    end

    subgraph PLATFORM_USE["PLATFORM USE"]
        MGR_USE["<b>Agent Manager</b><br/>Lifecycle management"]
        MON_USE["<b>Monitoring</b><br/>Agent health tracking"]
    end

    AAO --> BAIV_USE
    AAO --> PLATFORM_USE

    style AAO fill:#1e40af,color:#fff
    style BAIV_USE fill:#059669,color:#fff
    style PLATFORM_USE fill:#7c3aed,color:#fff
```

#### 3.3.3 Gap Analysis Ontology (PF-Core)

```mermaid
flowchart LR
    subgraph GAO["GAP ANALYSIS ONTOLOGY (PF-Core)"]
        GAO_DEF["<b>Defines:</b><br/>• Gap types<br/>• Current state<br/>• Target state<br/>• Gap severity<br/>• Opportunity"]
    end

    subgraph BAIV_CONFIG["BAIV CONFIGURATION"]
        DIM_CONFIG["<b>Dimensions</b><br/>• ai_visibility: 0.30<br/>• content_quality: 0.25<br/>• technical_opt: 0.15<br/>• competitive_pos: 0.15<br/>• discovery_channels: 0.10<br/>• authority_building: 0.05"]
        
        TEMPLATE_CONFIG["<b>Gap Templates</b><br/>• citation_gap<br/>• content_format_gap<br/>• schema_markup_gap<br/>• competitor_gap"]
    end

    subgraph BAIV_OUTPUT["BAIV GAP OUTPUTS"]
        GAP_REPORT["Gap Analysis Report"]
        PRIORITY["Priority Actions"]
        ROADMAP["Improvement Roadmap"]
    end

    GAO --> BAIV_CONFIG --> BAIV_OUTPUT

    style GAO fill:#1e40af,color:#fff
    style BAIV_CONFIG fill:#059669,color:#fff
    style BAIV_OUTPUT fill:#10b981,color:#fff
```

### 3.4 BAIV Instance Ontologies

#### 3.4.1 AI Visibility Ontology

```mermaid
flowchart TB
    subgraph AIVO["AI VISIBILITY ONTOLOGY (BAIV Instance)"]
        subgraph CORE_ENTITIES["CORE ENTITIES"]
            VIS_SCORE["<b>AIVisibilityScore</b><br/>• overall_score<br/>• platform_scores<br/>• trend<br/>• benchmark"]
            
            CITATION["<b>AICitation</b><br/>• platform<br/>• query<br/>• position<br/>• context<br/>• timestamp"]
            
            PLATFORM["<b>AIPlatform</b><br/>• ChatGPT<br/>• Claude<br/>• Perplexity<br/>• Gemini<br/>• Copilot"]
        end
        
        subgraph METRICS["METRICS ENTITIES"]
            COVERAGE["<b>TopicCoverage</b><br/>• topic<br/>• current_articles<br/>• needed_articles<br/>• coverage_ratio"]
            
            GAP_ENT["<b>VisibilityGap</b><br/>• gap_type<br/>• severity<br/>• opportunity_size<br/>• recommended_action"]
            
            PERF["<b>CitationPerformance</b><br/>• citations_count<br/>• avg_position<br/>• sentiment<br/>• share_of_voice"]
        end
        
        subgraph CONTENT["CONTENT ENTITIES"]
            ASSET["<b>DiscoverableAsset</b><br/>• asset_type<br/>• ai_friendliness_score<br/>• schema_completeness<br/>• crawlability"]
            
            CLUSTER["<b>ContentCluster</b><br/>• pillar_topic<br/>• supporting_topics<br/>• internal_links<br/>• authority_score"]
        end
    end

    subgraph USAGE["BAIV AGENT USAGE"]
        P2_ENT["P2 Discovery<br/>uses: DiscoverableAsset,<br/>AIPlatform"]
        P3_ENT["P3 Capture<br/>uses: AICitation,<br/>CitationPerformance"]
        P4_ENT["Gap Analysis<br/>uses: VisibilityGap,<br/>TopicCoverage"]
        P7_ENT["P7 Ideation<br/>uses: ContentCluster,<br/>TopicCoverage"]
    end

    CORE_ENTITIES --> P2_ENT
    CORE_ENTITIES --> P3_ENT
    METRICS --> P4_ENT
    METRICS --> P7_ENT
    CONTENT --> P7_ENT

    style AIVO fill:#059669,color:#fff
    style USAGE fill:#10b981,color:#fff
```

**AI Visibility Ontology - schema.org Grounding:**

| BAIV Entity | schema.org Base | Extension Reason |
|-------------|-----------------|------------------|
| `AIVisibilityScore` | schema:Rating | Extended for multi-platform scoring |
| `AICitation` | schema:Citation | Extended for AI-specific context |
| `AIPlatform` | schema:SoftwareApplication | Specialized for AI assistants |
| `TopicCoverage` | schema:ItemList | Extended for gap analysis |
| `VisibilityGap` | Extension | No direct schema.org equivalent |
| `DiscoverableAsset` | schema:CreativeWork | Extended for AI discoverability |
| `ContentCluster` | schema:ItemList | Extended for topic clustering |

#### 3.4.2 CMO OKR Ontology

```mermaid
flowchart LR
    subgraph CMO_OKR["CMO OKR ONTOLOGY (BAIV Instance)"]
        CMO_DEF["<b>Extends VE-300 OKR for Marketing</b><br/><br/>• Marketing Objectives<br/>• Marketing Key Results<br/>• Marketing KPIs<br/>• Campaign Metrics<br/>• Channel Performance"]
    end

    subgraph EXAMPLES["EXAMPLE ENTITIES"]
        OBJ["<b>Objective</b><br/>'Dominate AI<br/>visibility in sector'"]
        KR1["<b>Key Result 1</b><br/>'50+ AI citations<br/>per month'"]
        KR2["<b>Key Result 2</b><br/>'Top 3 ranking on<br/>brand queries'"]
        KPI["<b>KPI</b><br/>'Citation growth rate<br/>month-over-month'"]
    end

    subgraph USAGE["BAIV USAGE"]
        VE300_LINK["Links to VE-300<br/>for strategy cascade"]
        DASHBOARD["Powers CMO<br/>Dashboard"]
        REPORTING["Enables ROI<br/>reporting"]
    end

    CMO_OKR --> EXAMPLES --> USAGE

    style CMO_OKR fill:#059669,color:#fff
```

### 3.5 Complete Ontology Incorporation Flow

```mermaid
flowchart TB
    subgraph DEFINE["1. DEFINE & REGISTER"]
        DEF_CORE["Define PF-Core ontologies<br/>(Universal Brand, Agent Arch,<br/>Gap Analysis, VSOM, OKR)"]
        DEF_BAIV["Define BAIV ontologies<br/>(AI Visibility, CMO OKR,<br/>Customer Org)"]
        REG["Register all in<br/>OAA Registry"]
    end

    subgraph GOVERN["2. GOVERN & VALIDATE"]
        VAL["OAA Validator ensures<br/>schema.org compliance"]
        GOV["OAA Governor manages<br/>lifecycle states"]
        VER["Version control<br/>Draft → Active → Deprecated"]
    end

    subgraph STORE["3. STORE & INDEX"]
        DB["Store in Supabase<br/>ontology_registry table"]
        IDX["Index for retrieval<br/>by CE-100 Discovery"]
        CACHE["Cache frequently<br/>used ontologies"]
    end

    subgraph RETRIEVE["4. RETRIEVE & ASSEMBLE"]
        CE100_R["CE-100 retrieves<br/>relevant ontologies"]
        CE200_R["CE-200 assembles<br/>context package"]
        CE400_R["CE-400 adds BAIV<br/>extensions"]
    end

    subgraph DELIVER["5. DELIVER TO AGENTS"]
        CE500_D["CE-500 delivers<br/>context to agents"]
        CONTEXT_D["Agents receive:<br/>• Entity definitions<br/>• Relationship schemas<br/>• Validation rules<br/>• Reasoning patterns"]
    end

    subgraph EXECUTE["6. AGENT EXECUTION"]
        P0_E["P0 Orchestrator<br/>understands workflow"]
        DISC_E["Discovery agents<br/>know what to find"]
        GEN_E["Generation agents<br/>know what to create"]
        OPT_E["Optimization agents<br/>know success criteria"]
    end

    subgraph OUTCOME["7. SEMANTIC OUTCOMES"]
        STRUCT_O["<b>Structured Data</b><br/>All data follows<br/>ontology schemas"]
        REASON_O["<b>Semantic Reasoning</b><br/>Agents understand<br/>relationships"]
        INTEROP_O["<b>Interoperability</b><br/>Data works across<br/>all instances"]
        EVOLVE_O["<b>Governed Evolution</b><br/>Ontologies evolve<br/>with control"]
    end

    DEFINE --> GOVERN --> STORE --> RETRIEVE --> DELIVER --> EXECUTE --> OUTCOME

    style DEFINE fill:#4f46e5,color:#fff
    style GOVERN fill:#4f46e5,color:#fff
    style STORE fill:#64748b,color:#fff
    style RETRIEVE fill:#7c3aed,color:#fff
    style DELIVER fill:#7c3aed,color:#fff
    style EXECUTE fill:#059669,color:#fff
    style OUTCOME fill:#10b981,color:#fff
```

### 3.6 Ontology Incorporation Summary Table

| Ontology | Location | BAIV Agents Using | Purpose |
|----------|----------|-------------------|---------|
| **PF-CORE** ||||
| Universal Brand | OAA Registry | P1, P2, P9 | Brand context for content |
| Agent Architecture | OAA Registry | P0, Agent Manager | Agent orchestration |
| Gap Analysis | OAA Registry | Gap Agent, P4 | Gap identification patterns |
| VSOM | OAA Registry | VE Agent | Strategy cascade |
| OKR | OAA Registry | VE Agent | Metrics framework |
| RACI | OAA Registry | VE Agent | Accountability |
| **BAIV INSTANCE** ||||
| AI Visibility | OAA Registry (BAIV) | P2, P3, P4, P7, P13 | Core domain model |
| CMO OKR | OAA Registry (BAIV) | Dashboard, Reporting | Marketing metrics |
| Customer Organization | OAA Registry (BAIV) | P1, P0 | Client profiling |

---

## 4. Updated BAIV Tables Analysis

### 4.1 Tables Aligned with RRF Analytics Framework

```mermaid
flowchart TB
    subgraph RRF_TABLES["RRF & ANALYTICS TABLES"]
        direction LR
        
        subgraph SCORING["SCORING TABLES"]
            T1["<b>baiv_topic_coverage</b><br/><br/>• topic_keyword<br/>• search_volume<br/>• current_rank<br/>• target_rank<br/>• articles_published<br/>• articles_needed<br/>• rrf_score<br/>• priority_score"]
            
            T2["<b>baiv_rrf_config</b><br/><br/>• tenant_id<br/>• dimension_weights<br/>• smoothing_constant<br/>• health_thresholds"]
        end
        
        subgraph HEALTH["HEALTH & SUMMARY"]
            T3["<b>baiv_visibility_health</b><br/><br/>• tenant_id<br/>• overall_score<br/>• platform_scores (JSONB)<br/>• trend<br/>• calculated_at"]
            
            T4["<b>baiv_executive_summary</b><br/><br/>• summary_date<br/>• overall_health<br/>• topics_tracked<br/>• topics_improved<br/>• topics_declined<br/>• recommendations"]
        end
        
        subgraph GAPS["GAP TABLES"]
            T5["<b>baiv_visibility_gaps</b><br/><br/>• gap_type<br/>• dimension<br/>• current_value<br/>• target_value<br/>• severity_score<br/>• opportunity_size"]
            
            T6["<b>baiv_priority_actions</b><br/><br/>• topic_keyword<br/>• action_type<br/>• priority_tier<br/>• estimated_impact<br/>• effort_score<br/>• status"]
        end
    end

    subgraph CONTENT_TABLES["CONTENT TABLES"]
        T7["<b>baiv_content_clusters</b><br/><br/>• pillar_topic<br/>• supporting_topics<br/>• articles_planned<br/>• cluster_type<br/>• priority_score"]
        
        T8["<b>baiv_content_schedule</b><br/><br/>• content_id<br/>• scheduled_date<br/>• platform<br/>• status"]
    end

    subgraph OPTIONAL_TABLES["OPTIONAL MODULE TABLES"]
        T9["<b>baiv_leads</b><br/>(VE-600 GTM module)<br/><br/>• source<br/>• name<br/>• contact_info<br/>• score"]
        
        T10["<b>baiv_social_posts</b><br/>(Publishing extension)<br/><br/>• platform<br/>• content<br/>• scheduled_at<br/>• status"]
    end

    style SCORING fill:#2563eb,color:#fff
    style HEALTH fill:#0891b2,color:#fff
    style GAPS fill:#f59e0b,color:#000
    style CONTENT_TABLES fill:#059669,color:#fff
    style OPTIONAL_TABLES fill:#64748b,color:#fff
```

### 4.2 Table Relationship Diagram

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ BAIV_RRF_CONFIG : "has"
    ORGANIZATIONS ||--o{ BAIV_TOPIC_COVERAGE : "tracks"
    ORGANIZATIONS ||--o{ BAIV_VISIBILITY_HEALTH : "measures"
    ORGANIZATIONS ||--o{ BAIV_EXECUTIVE_SUMMARY : "reports"
    
    BAIV_TOPIC_COVERAGE ||--o{ BAIV_VISIBILITY_GAPS : "generates"
    BAIV_VISIBILITY_GAPS ||--o{ BAIV_PRIORITY_ACTIONS : "creates"
    
    BAIV_TOPIC_COVERAGE ||--o{ BAIV_CONTENT_CLUSTERS : "informs"
    BAIV_CONTENT_CLUSTERS ||--o{ BAIV_CONTENT_SCHEDULE : "schedules"
    
    BAIV_RRF_CONFIG {
        uuid id PK
        uuid tenant_id FK
        jsonb dimension_weights
        int smoothing_constant
        jsonb health_thresholds
    }
    
    BAIV_TOPIC_COVERAGE {
        uuid id PK
        uuid tenant_id FK
        varchar topic_keyword
        int search_volume
        int current_rank
        int target_rank
        numeric rrf_score
        varchar priority_tier
    }
    
    BAIV_VISIBILITY_HEALTH {
        uuid id PK
        uuid tenant_id FK
        int overall_score
        jsonb platform_scores
        varchar trend
        timestamp calculated_at
    }
    
    BAIV_VISIBILITY_GAPS {
        uuid id PK
        uuid tenant_id FK
        varchar gap_type
        numeric severity_score
        numeric opportunity_size
        varchar status
    }
    
    BAIV_PRIORITY_ACTIONS {
        uuid id PK
        uuid tenant_id FK
        varchar action_type
        varchar priority_tier
        numeric estimated_impact
        varchar status
    }
```

---

## 5. Complete MILANA to BAIV PRD Mapping (Updated)

```mermaid
flowchart TB
    subgraph MILANA["MILANA PLATFORM COMPONENTS"]
        direction TB
        
        subgraph M_ONT["ONTOLOGIES"]
            M_UBO["Universal Brand"]
            M_AIVO["AI Visibility"]
            M_AAO["Agent Architecture"]
        end
        
        subgraph M_RRF["RRF SYSTEM"]
            M_RRF_ALG["RRF Algorithm"]
            M_SCORE["Scoring Logic"]
            M_HEALTH["Health Calculation"]
        end
        
        subgraph M_SKILLS["SKILLS"]
            M_GAP["gap_analyzer"]
            M_AUDIT["content_audit"]
            M_COMP["competitor_analysis"]
            M_PLAN["rrf_content_planner"]
            M_CLUST["topic_clustering"]
            M_PRIOR["priority_scoring"]
        end
        
        subgraph M_DB["DATABASE"]
            M_TC["topic_coverage"]
            M_GA["gap_analysis"]
            M_ES["executive_summary"]
            M_PA["priority_actions"]
            M_AC["article_clusters"]
        end
    end

    subgraph BAIV_PRD["BAIV PRD v1.7 SECTIONS"]
        direction TB
        
        subgraph NEW_ANALYTICS["NEW: §X ANALYTICS & SCORING"]
            XA1["§X.1 Multi-Dimensional<br/>Scoring Framework"]
            XA2["§X.2 Scoring Methods<br/>(incl. RRF definition)"]
            XA3["§X.3 Health Score Pattern"]
            XA4["§X.4 BAIV RRF<br/>Implementation"]
        end
        
        subgraph SEC7_12["§7 OAA & §12 ONTOLOGIES"]
            ONT_REG["OAA Registry"]
            ONT_CORE["PF-Core Ontologies"]
            ONT_BAIV["BAIV Ontologies"]
        end
        
        subgraph SEC6["§6 GAP ANALYSIS"]
            GAP_TOOLS["Tools & Skills Library"]
            GAP_CONFIG["BAIV Configuration"]
        end
        
        subgraph SEC10["§10 AGENT ARCHITECTURE"]
            P2_AGT["P2 Discovery"]
            P3_AGT["P3 Capture"]
            P7_AGT["P7 Ideation"]
            P8_AGT["P8 Selection"]
        end
        
        subgraph NEW_DB["NEW: §14.2 BAIV TABLES"]
            DB_RRF["RRF & Analytics Tables"]
            DB_GAP["Gap Tables"]
            DB_CONTENT["Content Tables"]
            DB_OPT["Optional Tables"]
        end
    end

    %% Ontology mappings
    M_UBO -->|"PF-Core"| ONT_CORE
    M_AAO -->|"PF-Core"| ONT_CORE
    M_AIVO -->|"BAIV"| ONT_BAIV
    
    %% RRF mappings
    M_RRF_ALG -->|"Definition"| XA2
    M_SCORE -->|"Framework"| XA1
    M_HEALTH -->|"Pattern"| XA3
    M_PRIOR -->|"Implementation"| XA4
    
    %% Skills mappings
    M_GAP --> GAP_TOOLS
    M_AUDIT --> P2_AGT
    M_COMP --> P3_AGT
    M_PLAN --> P7_AGT
    M_CLUST --> P7_AGT
    
    %% Database mappings
    M_TC --> DB_RRF
    M_GA --> DB_GAP
    M_ES --> DB_RRF
    M_PA --> DB_GAP
    M_AC --> DB_CONTENT

    style MILANA fill:#0891b2,color:#fff
    style NEW_ANALYTICS fill:#f59e0b,color:#000
    style SEC7_12 fill:#4f46e5,color:#fff
    style SEC6 fill:#0891b2,color:#fff
    style SEC10 fill:#059669,color:#fff
    style NEW_DB fill:#64748b,color:#fff
```

---

## 6. Updated Decision Matrix

### 6.1 RRF & Analytics Decisions

| # | Decision | Proposed | Alternative | Status |
|---|----------|----------|-------------|--------|
| 1 | RRF placement | New §X Analytics & Scoring Framework | §9.4 standalone | ⬜ Review |
| 2 | RRF as PF-Core pattern | Yes - abstract framework | BAIV-only | ⬜ Review |
| 3 | Health Score standardization | 0-100 scale platform-wide | Per-instance definition | ⬜ Review |

### 6.2 Ontology Decisions

| # | Decision | Proposed | Alternative | Status |
|---|----------|----------|-------------|--------|
| 4 | Universal Brand location | PF-Core (OAA) | BAIV-only | ⬜ Review |
| 5 | Agent Architecture location | PF-Core (OAA) | BAIV-only | ⬜ Review |
| 6 | AI Visibility ontology | BAIV Instance | PF-Core | ⬜ Review |
| 7 | Ontology delivery mechanism | Via CE-100 to CE-500 | Direct agent access | ⬜ Review |

### 6.3 Database Decisions

| # | Decision | Proposed | Alternative | Status |
|---|----------|----------|-------------|--------|
| 8 | baiv_rrf_config table | New table for RRF settings | Inline in code | ⬜ Review |
| 9 | Health score storage | Separate baiv_visibility_health | In executive_summary | ⬜ Review |
| 10 | Lead tables | Optional (VE-600 activated) | Core BAIV | ⬜ Review |

---

## 7. PRD v1.7 Section Updates Summary

| Current Section | Update Required | From MILANA |
|-----------------|-----------------|-------------|
| **NEW §X** | Analytics & Scoring Framework | RRF algorithm, scoring logic |
| §4.4 VE-300 | Add abstract Priority Scoring | priority_scoring pattern |
| §5.3 CE-100 | Add CE-118, CE-119 retrievers | content_audit, competitor_analysis |
| §6.2 | Add RRF to Tools Library | gap_analyzer RRF integration |
| §7/§12 | Add Universal Brand, Agent Arch | MILANA ontologies |
| §10.1 | Enhance P2, P3, P7, P8 agents | MILANA skills |
| **NEW §14.2** | BAIV Tables (8 tables) | MILANA database schema |

---

## 8. Next Steps

1. **Confirm RRF positioning** in Analytics & Scoring Framework
2. **Approve ontology locations** (PF-Core vs BAIV Instance)
3. **Validate table structure** for BAIV database
4. **Create PRD v1.7** with all approved integrations

---

**Document Version:** 1.2.0  
**Status:** For Collaborative Review  
**Maps To:** BAIV PRD v1.6 → v1.7  
**Key Additions:** RRF definition & rationale, Ontology incorporation analysis
