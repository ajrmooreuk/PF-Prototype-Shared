# PRD: Be AI Visible (BAIV) Product Module
## PF-Instance Implementation on Platform Foundation Core

| Document Version | 1.2.0 |
|------------------|-------|
| Date | December 2025 |
| Status | DRAFT - For Review |
| Platform Layer | PF-Instance (BAIV Product) |
| Architecture | Claude Agent SDK + PF-Core Foundation |
| Ontology Compliance | Schema.org Grounded \| OAA Registry v3.0 |
| Database Strategy | Supabase PostgreSQL + JSONB (Minimal Schema) |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-12-07 | Platform Architecture Team | Initial restructure from v12 PRD |
| 1.1.0 | 2025-12-07 | Platform Architecture Team | Refactored Gap Analysis to PF-Core |
| 1.2.0 | 2025-12-07 | Platform Architecture Team | **Two-phase Gap Analysis; JSONB-centric database; OAA governance model; FairSlice cross-licensing future** |

**Key Changes v1.2:**
- Gap Analysis positioned at START (hypothesis) + after Discovery (assessment)
- JSONB-centric database strategy for MVP flexibility
- OAA as PF-Core governance engine (no OAA Agent needed at instance level)
- Added Future Developments: Cross-licensing and FairSlice revenue sharing
- Expanded Tools & Skills framework for technique selection

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Value Engineering Flow](#2-value-engineering-flow)
3. [PF-Core Gap Analysis Framework](#3-pf-core-gap-analysis-framework)
4. [Architecture Overview](#4-architecture-overview)
5. [OAA Governance Model](#5-oaa-governance-model)
6. [BAIV Instance Configuration](#6-baiv-instance-configuration)
7. [Be AI Visible Product Definition](#7-be-ai-visible-product-definition)
8. [Agent Architecture](#8-agent-architecture)
9. [Ontology Framework](#9-ontology-framework)
10. [Technical Stack & Database](#10-technical-stack--database)
11. [Process Flows](#11-process-flows)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Success Metrics](#13-success-metrics)
14. [Future Developments](#14-future-developments)
15. [Appendices](#15-appendices)

---

## 1. Executive Summary

### 1.1 Purpose

This PRD defines the **Be AI Visible (BAIV)** product module as a PF-Instance implementation built on Platform Foundation Core (PF-Core). BAIV delivers AI Visibility optimization services utilizing PF-Core's transferable capabilities, with **Gap Analysis** as the central Value Engineering driver.

### 1.2 Core Architecture Principles

| Principle | Implementation |
|-----------|----------------|
| **Gap Analysis Drives Value** | Two-phase model: Strategic Hypothesis → Discovery → Assessment |
| **JSONB for Flexibility** | Minimal tables, ontology-aligned JSONB for rapid MVP iteration |
| **OAA Governs Ontologies** | PF-Core OAA distributes versioned ontologies to instances |
| **Cross-Instance Capability** | FairSlice model enables capability licensing between instances |
| **Tools & Skills Library** | Best-of-class techniques available consistently across domains |

### 1.3 Two-Phase Gap Analysis Model

> **"Gap Analysis is the ENGINE of Value Engineering"**

| Phase | When | Mode | Purpose | Output |
|-------|------|------|---------|--------|
| **Phase 1** | At START | Strategic | Hypothesis about potential gaps | Discovery scope |
| **Phase 2** | After Discovery | Operational | Evidence-based gap assessment | Opportunities & roadmap |

### 1.4 Key Architecture Changes (from v12)

| Previous (v12) | Current (v1.2) |
|----------------|----------------|
| n8n workflow orchestration | Claude Agent SDK orchestration |
| P6 Gap Analysis as BAIV agent | Gap Analysis Agent in PF-Core (two phases) |
| 101+ database tables | **Minimal tables + JSONB storage** |
| Instance-level OAA Agent | **PF-Core OAA governance with distribution** |
| Siloed instance capabilities | **FairSlice cross-licensing model** |

---

## 2. Value Engineering Flow

### 2.1 Complete Value Engineering Process

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     VALUE ENGINEERING FLOW                               │
│                                                                          │
│  "Gap Analysis is the Driver - Discovery is Gap-Informed"                │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ PHASE 0: STRATEGIC CONTEXT (VSOM)                                  │ │
│  │                                                                    │ │
│  │  Vision → Strategy → Objectives → Metrics                         │ │
│  │                     ↓                                              │ │
│  │              DESIRED STATE                                        │ │
│  │         "Where do we want to be?"                                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│                              ▼                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ PHASE 1: STRATEGIC GAP HYPOTHESIS (PF-Core Gap Agent)             │ │
│  │                                                                    │ │
│  │  Input: Desired State + Domain Context + Historical Patterns      │ │
│  │                                                                    │ │
│  │  Questions:                                                       │ │
│  │  • What gaps are LIKELY to exist?                                 │ │
│  │  • What dimensions should we examine?                             │ │
│  │  • What evidence do we need to collect?                           │ │
│  │                                                                    │ │
│  │  Output: GAP HYPOTHESES + DISCOVERY SCOPE                         │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│                              ▼                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ PHASE 2: DISCOVERY (Instance-Specific Agents)                     │ │
│  │                                                                    │ │
│  │  Input: Discovery Scope from Gap Hypothesis                       │ │
│  │                                                                    │ │
│  │  Process: Collect evidence for each hypothesized gap              │ │
│  │                                                                    │ │
│  │  Output: CURRENT STATE + EVIDENCE                                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│                              ▼                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ PHASE 3: DETAILED GAP ASSESSMENT (PF-Core Gap Agent)              │ │
│  │                                                                    │ │
│  │  Input: Current State + Desired State + Gap Hypotheses            │ │
│  │                                                                    │ │
│  │  Process: Validate gaps, root cause, prioritize opportunities     │ │
│  │                                                                    │ │
│  │  Output: VALIDATED GAPS + OPPORTUNITIES + ROADMAP                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│                              ▼                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ PHASE 4: GENERATION → OPTIMIZATION → RE-ASSESSMENT                │ │
│  │                                                                    │ │
│  │  Generate gap-closing solutions → Deploy → Measure → Loop         │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Why Gap Analysis Starts FIRST

| Traditional Approach | Value Engineering Approach |
|---------------------|---------------------------|
| Discovery → "What do we have?" | Gap Hypothesis → "What might be missing?" |
| Unfocused data collection | Purposeful evidence gathering |
| Analysis after the fact | Assessment validates hypotheses |
| Discovery defines scope | **Gap hypothesis defines scope** |

**The insight:** Without a gap hypothesis, Discovery is unfocused. With a gap hypothesis, Discovery knows exactly what evidence to collect.

---

## 3. PF-Core Gap Analysis Framework

### 3.1 Tools & Skills Library

The PF-Core Gap Analysis Agent maintains a **library of best-of-class techniques** available to ALL instances:

```yaml
tools_and_skills_library:
  description: "Reusable gap analysis techniques across all PF-Instances"
  
  techniques:
    quantitative_gap:
      id: "TECH-QUANT-001"
      name: "Quantitative Gap Analysis"
      best_for: [performance_metrics, coverage_scores, compliance_percentages]
      applicable_phases: [strategic, operational]
      complexity: low
      
    competitive_positioning:
      id: "TECH-COMP-001"
      name: "Competitive Positioning Analysis"
      best_for: [market_share, feature_parity, citation_comparison]
      applicable_phases: [operational]
      complexity: medium
      
    benchmark_analysis:
      id: "TECH-BENCH-001"
      name: "Benchmark Analysis"
      best_for: [industry_positioning, best_practice_adoption]
      applicable_phases: [strategic, operational]
      complexity: medium
      
    swot_derived:
      id: "TECH-SWOT-001"
      name: "SWOT-Derived Gap Analysis"
      best_for: [strategic_planning, capability_building]
      applicable_phases: [strategic]
      complexity: medium
      
    maturity_model:
      id: "TECH-MAT-001"
      name: "Maturity Model Assessment"
      best_for: [digital_transformation, ai_readiness, process_maturity]
      applicable_phases: [strategic, operational]
      complexity: high
      
    jobs_to_be_done:
      id: "TECH-JTBD-001"
      name: "Jobs-to-be-Done Analysis"
      best_for: [product_gaps, value_proposition_gaps]
      applicable_phases: [strategic, operational]
      complexity: high
      
    fishbone_analysis:
      id: "TECH-FISH-001"
      name: "Fishbone Root Cause Analysis"
      best_for: [quality_issues, process_failures]
      applicable_phases: [operational]
      complexity: medium
      
    five_why_analysis:
      id: "TECH-5WHY-001"
      name: "5-Why Analysis"
      best_for: [specific_problem_diagnosis, quick_root_cause]
      applicable_phases: [operational]
      complexity: low
      
    pareto_analysis:
      id: "TECH-PAR-001"
      name: "Pareto Analysis"
      best_for: [prioritizing_many_gaps, resource_allocation]
      applicable_phases: [operational]
      complexity: low

  skills:
    hypothesis_formation:
      id: "SKILL-HF-001"
      description: "Creating testable gap hypotheses"
      
    evidence_collection:
      id: "SKILL-EC-001"
      description: "Systematic gathering of gap evidence"
      
    prioritization:
      id: "SKILL-PRI-001"
      formula: "(impact / effort) × feasibility"
      
    roadmap_creation:
      id: "SKILL-RM-001"
      description: "Sequencing opportunities into actionable plan"
```

### 3.2 Technique Selector Intelligence

```yaml
technique_selector:
  description: "Selects optimal technique(s) based on context"
  
  selection_criteria:
    - domain_type: [marketing, technical, strategic, operational]
    - data_availability: [quantitative, qualitative, mixed]
    - gap_phase: [strategic_hypothesis, operational_assessment]
    - stakeholder_level: [executive, operational, tactical]
    - time_constraints: [immediate, short, medium, long]
    - instance_config: [baiv_preferences, air_preferences, w4m_preferences]
    
  selection_rules:
    baiv_marketing_operational:
      primary: competitive_positioning
      secondary: quantitative_gap
      reason: "BAIV focuses on competitive citation analysis"
      
    air_strategy_assessment:
      primary: maturity_model
      secondary: swot_derived
      reason: "AIR focuses on AI readiness maturity"
      
    w4m_value_proposition:
      primary: jobs_to_be_done
      secondary: benchmark_analysis
      reason: "W4M focuses on value-to-market fit"
```

---

## 4. Architecture Overview

### 4.1 Three-Layer Platform Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PF-CORE (Foundation Layer)                            │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │              VALUE ENGINEERING MODULES                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │     VSOM     │  │     Gap      │  │   Context    │             │ │
│  │  │   Module     │  │   Analysis   │  │  Engineering │             │ │
│  │  │              │  │    Agent     │  │              │             │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │              GOVERNANCE & INFRASTRUCTURE                           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │     OAA      │  │   Multi-     │  │   Agent      │             │ │
│  │  │  Registry    │  │   Tenant     │  │   Manager    │             │ │
│  │  │ (Governance) │  │              │  │              │             │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │              CROSS-INSTANCE SERVICES                               │ │
│  │  ┌──────────────┐  ┌──────────────┐                               │ │
│  │  │  FairSlice   │  │  Capability  │                               │ │
│  │  │   Revenue    │  │   Registry   │                               │ │
│  │  └──────────────┘  └──────────────┘                               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      PF-INSTANCE: BAIV                                   │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │         INSTANCE CONFIGURATION (Uses PF-Core Ontologies)           │ │
│  │  • Gap Config: ai_visibility, content_quality, citations           │ │
│  │  • Ontologies: Subscribed from OAA Registry (version controlled)   │ │
│  │  • Technique Preferences: competitive_positioning default          │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │              Be AI Visible (Core Product)                          │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                   │ │
│  │  │ Discovery  │  │ Generation │  │Optimization│                   │ │
│  │  │  Cluster   │  │  Cluster   │  │  Cluster   │                   │ │
│  │  │  (P1-P3)   │  │  (P7-P9)   │  │ (P10-P14)  │                   │ │
│  │  └────────────┘  └────────────┘  └────────────┘                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │           LICENSABLE CAPABILITIES (via FairSlice)                  │ │
│  │  • AI Visibility Scoring Engine                                    │ │
│  │  • Citation Testing Tools                                          │ │
│  │  • Content Format Analysis                                         │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Agent Distribution

| Layer | Component | Responsibility |
|-------|-----------|----------------|
| **PF-Core** | VSOM Module | Strategic context, desired state |
| **PF-Core** | Gap Analysis Agent | Hypothesis + Assessment (two phases) |
| **PF-Core** | OAA Registry | Ontology governance & distribution |
| **PF-Core** | Agent Manager | Claude SDK orchestration |
| **PF-Core** | FairSlice Service | Cross-instance revenue sharing |
| **BAIV** | Orchestrator (P0) | BAIV workflow coordination |
| **BAIV** | Discovery Cluster | Current state capture (P1-P3) |
| **BAIV** | Generation Cluster | Content creation (P7-P9) |
| **BAIV** | Optimization Cluster | Publishing & monitoring (P10-P14) |

---

## 5. OAA Governance Model

### 5.1 OAA as PF-Core Governance Engine

The **Ontology Architect Agent (OAA)** operates at PF-Core level ONLY. Instances do NOT have their own OAA Agent - they receive governed ontologies from PF-Core.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     OAA GOVERNANCE MODEL                                 │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    PF-CORE: OAA REGISTRY                           │ │
│  │                                                                    │ │
│  │  ONTOLOGY GOVERNANCE:                                              │ │
│  │  • Version Control (semantic versioning)                           │ │
│  │  • Schema.org Grounding Validation                                 │ │
│  │  • Permission Management (who can use what)                        │ │
│  │  • Distribution Management (push updates to instances)             │ │
│  │  • Compatibility Checking (breaking change detection)              │ │
│  │  • Audit Trail (all changes tracked)                               │ │
│  │                                                                    │ │
│  │  ONTOLOGY REGISTRY:                                                │ │
│  │                                                                    │ │
│  │  CORE ONTOLOGIES (Available to all instances)                      │ │
│  │  ├── Gap Analysis Ontology v1.1.0                                  │ │
│  │  ├── VSOM Ontology v1.0.0                                          │ │
│  │  ├── Organization Ontology v1.0.0                                  │ │
│  │  └── RACI/RBAC Ontology v1.0.0                                     │ │
│  │                                                                    │ │
│  │  INSTANCE ONTOLOGIES (Permission required)                         │ │
│  │  ├── BAIV: AI Visibility Ontology v1.1.0                           │ │
│  │  ├── BAIV: Universal Brand Ontology v1.0.0                         │ │
│  │  ├── BAIV: CMO OKR Ontology v3.0.0                                 │ │
│  │  ├── AIR: AI Readiness Ontology v1.0.0                             │ │
│  │  └── W4M: Value Engineering Ontology v1.0.0                        │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│                              │ DISTRIBUTION                              │
│                              ▼                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                 INSTANCE ONTOLOGY SUBSCRIPTIONS                    │ │
│  │                                                                    │ │
│  │  BAIV Instance                     AIR Instance                    │ │
│  │  ────────────────                  ────────────────                │ │
│  │  Subscribed:                       Subscribed:                     │ │
│  │  ✓ Gap Analysis v1.1.0            ✓ Gap Analysis v1.1.0           │ │
│  │  ✓ VSOM v1.0.0                    ✓ VSOM v1.0.0                   │ │
│  │  ✓ AI Visibility v1.1.0          ✓ AI Readiness v1.0.0           │ │
│  │  ✓ Universal Brand v1.0.0                                         │ │
│  │  ✓ CMO OKR v3.0.0                                                 │ │
│  │                                                                    │ │
│  │  Updates received automatically when OAA publishes new versions   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 OAA Distribution Process

```yaml
oaa_distribution:
  process:
    1_ontology_update:
      trigger: "Ontology modification at PF-Core"
      validation:
        - Schema.org grounding check
        - Breaking change detection
        - Backward compatibility verification
        
    2_version_increment:
      rules:
        major: "Breaking changes (X.0.0)"
        minor: "New features, backward compatible (0.X.0)"
        patch: "Bug fixes, no API changes (0.0.X)"
        
    3_permission_check:
      action: "Verify which instances have permission to use this ontology"
      
    4_distribution:
      action: "Push updated ontology to subscribed instances"
      includes:
        - Ontology JSON-LD
        - Version metadata
        - Change log
        - Migration guide (if breaking changes)
        
    5_instance_receipt:
      action: "Instance receives and stores in local JSONB"
      notification: "Instance notified of update"
```

### 5.3 Why No OAA Agent at Instance Level

| Concern | PF-Core OAA Solution |
|---------|---------------------|
| Consistency | Single source of truth for ontologies |
| Version Control | Centralized versioning prevents drift |
| Breaking Changes | Detected before distribution |
| Cross-Instance Sharing | Managed permissions and licensing |
| Audit Trail | Complete history at core level |
| Reduced Complexity | Instances just consume, don't govern |

---

## 6. BAIV Instance Configuration

### 6.1 What BAIV Owns (Instance-Specific)

| Component | Description |
|-----------|-------------|
| **Orchestrator (P0)** | BAIV workflow coordination |
| **Discovery Agents (P1-P3)** | Current state capture for AI visibility |
| **Generation Agents (P7-P9)** | Gap-closing content creation |
| **Optimization Agents (P10-P14)** | Publishing, monitoring, prediction |
| **Gap Config** | BAIV dimensions, weights, technique preferences |
| **Licensable Capabilities** | AI Visibility Scoring, Citation Testing (via FairSlice) |

### 6.2 What BAIV Inherits (from PF-Core)

| Component | Description |
|-----------|-------------|
| **VSOM Module** | Strategic objectives defining desired state |
| **Gap Analysis Agent** | Two-phase gap assessment engine |
| **OAA Registry** | Ontology subscriptions (not OAA Agent) |
| **Context Engineering** | Market, organizational, competitive context |
| **Multi-Tenant** | Data isolation and access control |
| **Agent Manager** | Claude SDK orchestration framework |
| **FairSlice** | Cross-instance capability licensing |

### 6.3 BAIV Gap Configuration

```yaml
baiv_gap_config:
  instance: "BAIV"
  domain: "marketing"
  subdomain: "ai_visibility"
  
  dimensions:
    enabled:
      - ai_visibility         # Citation rates across AI platforms
      - content_quality       # AI-friendly content formats
      - technical_optimization # Schema markup, structured data
      - competitive_positioning # Relative to competitors
      - discovery_channels    # Multi-platform presence
      - authority_building    # Trust signals
      
  dimension_weights:
    ai_visibility: 0.30
    content_quality: 0.25
    technical_optimization: 0.15
    competitive_positioning: 0.15
    discovery_channels: 0.10
    authority_building: 0.05
    
  technique_preferences:
    strategic_phase: benchmark_analysis
    operational_phase: competitive_positioning
    fallback: quantitative_gap
```

---

## 7. Be AI Visible Product Definition

### 7.1 Problem Statement

**78% of businesses with excellent products remain invisible to AI platforms.**

AI platforms (ChatGPT, Claude, Perplexity, Gemini) are becoming primary discovery channels. Organizations face gaps in:

| Gap Dimension | Problem | BAIV Solution |
|---------------|---------|---------------|
| **AI Visibility** | Content not cited by AI platforms | Citation optimization |
| **Content Quality** | Missing AI-friendly formats | Format gap closure |
| **Technical Optimization** | No schema markup | Technical remediation |
| **Competitive Positioning** | Unknown vs. competitor citations | Competitive gap analysis |
| **Discovery Channels** | Single-channel dependence | Multi-platform strategy |
| **Authority Building** | Low trust signals | Authority enhancement |

### 7.2 Solution: Gap-Driven Visibility Improvement

```
┌─────────────────────────────────────────────────────────────────────────┐
│                BE AI VISIBLE PROCESS (Gap-Centric)                       │
│                                                                          │
│  PHASE 1: GAP HYPOTHESIS      PHASE 2: DISCOVERY                        │
│  (What might be missing?)     (Collect evidence)                        │
│                                                                          │
│  ┌─────────────┐              ┌─────────────┐                           │
│  │ PF-Core Gap │              │ P1: Config  │                           │
│  │  Analysis   │─────────────►│ P2: Profile │                           │
│  │ (Strategic) │  Scope       │ P3: Capture │                           │
│  └─────────────┘              └──────┬──────┘                           │
│                                      │                                  │
│                                      │ Evidence                         │
│                                      ▼                                  │
│  PHASE 3: GAP ASSESSMENT      PHASE 4: GENERATION                       │
│  (Validate & prioritize)      (Fill the gaps)                          │
│                                                                          │
│  ┌─────────────┐              ┌─────────────┐                           │
│  │ PF-Core Gap │              │ P7: Ideate  │                           │
│  │  Analysis   │─────────────►│ P8: Select  │                           │
│  │(Operational)│  Opportunities│ P9: Create  │                          │
│  └─────────────┘              └──────┬──────┘                           │
│                                      │                                  │
│                                      ▼                                  │
│                         PHASE 5: OPTIMIZATION                           │
│                         ┌─────────────┐                                 │
│                         │ P10-P14     │                                 │
│                         │ Optimize    │                                 │
│                         │ Publish     │                                 │
│                         │ Monitor     │─────────► RE-ASSESSMENT         │
│                         └─────────────┘           (30/60/90 days)       │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Subscription Tiers

| Tier | Price | Gap Features | Agents |
|------|-------|--------------|--------|
| **Starter** | $49-149/mo | Basic gap hypothesis, top 3 opportunities | P1-P3, P7, P9 |
| **Growth** | $199-999/mo | Full gap assessment, competitive analysis | P1-P14 |
| **Enterprise** | $2,499-10K+/mo | Custom dimensions, cross-platform, white-label | Full + custom |

---

## 8. Agent Architecture

### 8.1 BAIV Agent Cluster Overview

```yaml
baiv_agents:
  orchestration:
    p0_orchestrator:
      purpose: "BAIV workflow coordination"
      calls: [pf_core_gap, discovery_cluster, generation_cluster, optimization_cluster]
      
  discovery_cluster:
    p1_configuration:
      purpose: "Configure business parameters and discovery scope"
      inputs_from: pf_core_gap.hypothesis.scope
      outputs_to: p2, p3
      
    p2_discovery:
      purpose: "Digital asset discovery and profiling"
      tools: [web_crawler, reddit_scraper, competitor_intel]
      outputs_to: pf_core_gap.assessment.current_state
      
    p3_capture:
      purpose: "Extract PAA, analytics, performance baselines"
      tools: [paa_extractor, analytics_collector]
      outputs_to: pf_core_gap.assessment.current_state
      
  generation_cluster:
    p7_ideation:
      purpose: "Generate content ideas addressing gaps"
      inputs_from: pf_core_gap.assessment.opportunities
      
    p8_selection:
      purpose: "Prioritize by ROI using gap scores"
      inputs_from: pf_core_gap.assessment.priority_scores
      
    p9_creation:
      purpose: "Generate gap-closing content"
      inputs_from: pf_core_gap.assessment.gap_specifications
      
  optimization_cluster:
    p10_optimization:
      purpose: "Optimize content for AI citation"
      measures: gap_closure_progress
      
    p11_scheduling:
      purpose: "Schedule per gap roadmap"
      follows: pf_core_gap.assessment.roadmap
      
    p12_publishing:
      purpose: "Publish to platforms"
      
    p13_reaudit:
      purpose: "Measure gap closure, trigger re-assessment"
      outputs_to: pf_core_gap.hypothesis (new cycle)
      
    p14_predictive:
      purpose: "Predict emerging gaps"
      outputs_to: pf_core_gap.hypothesis (proactive)
```

### 8.2 PF-Core Gap Analysis Agent Specification

```yaml
pf_core_gap_agent:
  identity:
    name: "Gap Analysis Agent"
    code: "PF-GAP"
    layer: "pf_core"
    version: "1.0.0"
    transferable: true
    
  modes:
    strategic_hypothesis:
      timing: "Before Discovery"
      inputs: [desired_state, domain_context, historical_patterns]
      outputs: [gap_hypotheses, discovery_scope, evidence_requirements]
      confidence: "low-medium"
      
    operational_assessment:
      timing: "After Discovery"
      inputs: [current_state, desired_state, hypotheses, evidence]
      outputs: [validated_gaps, opportunities, quick_wins, roadmap]
      confidence: "high"
      
  configuration_interface:
    description: "Per-instance settings loaded from JSONB"
    schema:
      dimensions: {enabled: array, weights: object}
      templates: array
      technique_preferences: {strategic: string, operational: string, fallback: string}
```

---

## 9. Ontology Framework

### 9.1 Ontology Hierarchy (OAA Governed)

```
OAA REGISTRY (PF-Core)
│
├── CORE ONTOLOGIES (All Instances)
│   ├── Gap Analysis Ontology v1.1.0
│   ├── VSOM Ontology v1.0.0
│   ├── Organization Ontology v1.0.0
│   └── RACI/RBAC Ontology v1.0.0
│
└── INSTANCE ONTOLOGIES (Permission Required)
    │
    ├── BAIV Instance
    │   ├── AI Visibility Ontology v1.1.0
    │   │   └── EXTENDS: Gap Analysis (ai_visibility dimension)
    │   ├── Universal Brand Ontology v1.0.0
    │   ├── Customer Organization Ontology v1.0.0
    │   └── CMO OKR Ontology v3.0.0
    │       └── EXTENDS: VSOM for marketing
    │
    ├── AIR Instance
    │   └── AI Readiness Ontology v1.0.0
    │       └── EXTENDS: Gap Analysis (maturity_model technique)
    │
    └── W4M Instance
        └── Value Engineering Ontology v1.0.0
            └── EXTENDS: Gap Analysis (jtbd technique)
```

### 9.2 Ontology Subscription Model

```yaml
ontology_subscriptions:
  baiv:
    core_ontologies:
      - gap_analysis_ontology: {version: "1.1.0", auto_update: true}
      - vsom_ontology: {version: "1.0.0", auto_update: true}
      - organization_ontology: {version: "1.0.0", auto_update: true}
      
    instance_ontologies:
      - ai_visibility_ontology: {version: "1.1.0", owned: true}
      - universal_brand_ontology: {version: "1.0.0", owned: true}
      - cmo_okr_ontology: {version: "3.0.0", owned: true}
      
    licensed_ontologies: []  # Future: May license from AIR or W4M
```

---

## 10. Technical Stack & Database

### 10.1 JSONB-Centric Database Strategy

> **"Minimal tables + JSONB for maximum flexibility during MVP iteration"**

```yaml
database_strategy:
  principle: "Keep schema simple, use JSONB for ontology-aligned data"
  
  benefits:
    - Rapid iteration without migrations
    - Ontology changes don't require schema changes
    - Flexible document storage
    - Native PostgreSQL JSON functions
    - Supabase realtime subscriptions on JSONB
    
  approach:
    core_tables: "Minimal relational structure (tenants, users, etc.)"
    data_tables: "JSONB columns for ontology-aligned content"
    indexing: "GIN indexes on frequently queried JSONB paths"
```

### 10.2 Minimal Schema Design

```sql
-- ============================================
-- PF-CORE TABLES (Minimal)
-- ============================================

-- Tenants (multi-tenant isolation)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    profile JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tenant-User relationship
CREATE TABLE tenant_users (
    tenant_id UUID REFERENCES tenants(id),
    user_id UUID REFERENCES users(id),
    role TEXT NOT NULL,
    permissions JSONB DEFAULT '{}',
    PRIMARY KEY (tenant_id, user_id)
);

-- ============================================
-- OAA REGISTRY TABLES
-- ============================================

-- Ontology Registry (PF-Core governed)
CREATE TABLE ontology_registry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    layer TEXT NOT NULL,  -- 'core' or 'instance'
    owner_instance TEXT,
    schema_definition JSONB NOT NULL,
    changelog JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ontology Subscriptions
CREATE TABLE ontology_subscriptions (
    instance_code TEXT NOT NULL,
    ontology_code TEXT NOT NULL,
    version_subscribed TEXT NOT NULL,
    auto_update BOOLEAN DEFAULT true,
    licensed_via TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (instance_code, ontology_code)
);

-- ============================================
-- GAP ANALYSIS TABLES (PF-Core)
-- ============================================

-- Gap Analyses (stores both hypothesis and assessment)
CREATE TABLE gap_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    instance_code TEXT NOT NULL,
    mode TEXT NOT NULL,  -- 'strategic_hypothesis' or 'operational_assessment'
    inputs JSONB NOT NULL,
    config JSONB NOT NULL,
    technique_used TEXT,
    results JSONB DEFAULT '{}',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gap Opportunities (denormalized for querying)
CREATE TABLE gap_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES gap_analyses(id),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    dimension TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    priority_score NUMERIC(5,2),
    opportunity_data JSONB NOT NULL,
    status TEXT DEFAULT 'identified',
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Instance Gap Configs (JSONB for flexibility)
CREATE TABLE gap_instance_configs (
    instance_code TEXT PRIMARY KEY,
    config JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- BAIV INSTANCE TABLES (Minimal)
-- ============================================

-- Discovery Audits
CREATE TABLE discovery_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    domain_url TEXT NOT NULL,
    gap_hypothesis_id UUID REFERENCES gap_analyses(id),
    gap_assessment_id UUID REFERENCES gap_analyses(id),
    discovery_scope JSONB DEFAULT '{}',
    discovery_results JSONB DEFAULT '{}',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content Items (tracks gap closure)
CREATE TABLE content_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    audit_id UUID REFERENCES discovery_audits(id),
    opportunity_id UUID REFERENCES gap_opportunities(id),
    content_data JSONB NOT NULL,
    addresses_gaps TEXT[],
    expected_impact NUMERIC(3,1),
    actual_impact NUMERIC(3,1),
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now(),
    published_at TIMESTAMPTZ
);

-- ============================================
-- VSOM TABLES (JSONB-centric)
-- ============================================

CREATE TABLE vsom_contexts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    vision_mission JSONB DEFAULT '{}',
    strategic_objectives JSONB DEFAULT '[]',
    operational_strategies JSONB DEFAULT '[]',
    metrics_kpis JSONB DEFAULT '[]',
    desired_state JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_gap_analyses_results ON gap_analyses USING GIN (results);
CREATE INDEX idx_discovery_results ON discovery_audits USING GIN (discovery_results);
CREATE INDEX idx_content_data ON content_items USING GIN (content_data);
CREATE INDEX idx_vsom_desired_state ON vsom_contexts USING GIN (desired_state);

CREATE INDEX idx_gap_analyses_tenant ON gap_analyses(tenant_id);
CREATE INDEX idx_gap_opportunities_tenant ON gap_opportunities(tenant_id);
CREATE INDEX idx_discovery_audits_tenant ON discovery_audits(tenant_id);
CREATE INDEX idx_content_items_tenant ON content_items(tenant_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE gap_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE gap_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vsom_contexts ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON gap_analyses
    FOR ALL USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

### 10.3 Technology Stack

```yaml
infrastructure:
  hosting: "Digital Ocean App Platform"
  database: "Supabase (PostgreSQL + JSONB)"
  storage: "Supabase Storage"
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

ai_services:
  primary: "Claude API (Anthropic)"
  network_analysis: "InfraNodus"
```

---

## 11. Process Flows

### 11.1 Complete BAIV Process

```
DAY 0: ONBOARDING + GAP HYPOTHESIS
────────────────────────────────────
1. User creates account, connects analytics
2. P1 configures business parameters
3. PF-Core Gap Agent (STRATEGIC mode):
   - Analyzes domain context
   - Generates gap hypotheses
   - Defines discovery scope
   OUTPUT: "Test citations on 4 platforms, analyze top 5 competitors"

DAY 1-3: DISCOVERY
────────────────────
4. P2 executes scoped discovery:
   - Citation testing (per hypothesis)
   - Competitor analysis (per hypothesis)
   - Content inventory
5. P3 captures baselines:
   - PAA questions
   - Analytics data
   OUTPUT: Current state evidence

DAY 4-5: GAP ASSESSMENT
────────────────────────
6. PF-Core Gap Agent (OPERATIONAL mode):
   - Validates/invalidates hypotheses
   - Calculates gap scores
   - Root cause analysis
   - Prioritizes opportunities
   OUTPUT: Validated gaps, 30-day roadmap, quick wins

DAY 6-7: GENERATION
────────────────────
7. P7 generates content ideas (from opportunities)
8. P8 selects by ROI (using priority scores)
9. HITL: CMO approves strategy
   OUTPUT: Content plan

DAY 8-30: EXECUTION
────────────────────
10. P9 creates gap-closing content
11. P10 optimizes for AI citation
12. P11 schedules per roadmap
13. P12 publishes
14. P13 monitors gap closure progress

DAY 30+: RE-ASSESSMENT
───────────────────────
15. P13 triggers re-assessment
16. Loop to Step 3 (new gap hypothesis cycle)
```

---

## 12. Implementation Roadmap

### 12.1 Phase Overview

| Phase | Weeks | Focus | PF-Core | BAIV Instance |
|-------|-------|-------|---------|---------------|
| **Phase 1** | 1-4 | Foundation | Gap Agent v1.0, OAA Registry | P0, P1 |
| **Phase 2** | 5-8 | Discovery | Technique Selector | P2, P3 |
| **Phase 3** | 9-12 | Integration | Full two-phase gap | Gap integration |
| **Phase 4** | 13-16 | Generation | - | P7, P8, P9 |
| **Phase 5** | 17-20 | Optimization | FairSlice foundation | P10-P14 |
| **Phase 6** | 21-24 | Polish | Cross-licensing | Refinement |

### 12.2 Database Approach per Phase

| Phase | Database Actions |
|-------|------------------|
| **Phase 1** | Core tables (tenants, users), gap_analyses with JSONB |
| **Phase 2** | discovery_audits with JSONB results |
| **Phase 3** | Refine JSONB structures based on learnings |
| **Phase 4** | content_items table |
| **Phase 5** | Minimal additions, mostly JSONB refinement |
| **Phase 6** | Optimize indexes, add FairSlice tracking |

---

## 13. Success Metrics

### 13.1 PF-Core Metrics

| Metric | Target |
|--------|--------|
| OAA distribution latency | <1 minute |
| Gap hypothesis accuracy | 70%+ validated |
| Technique selection appropriateness | 90%+ |
| Cross-instance ontology consistency | 100% |

### 13.2 BAIV Instance Metrics

| Metric | Target |
|--------|--------|
| Gap closure rate (90 