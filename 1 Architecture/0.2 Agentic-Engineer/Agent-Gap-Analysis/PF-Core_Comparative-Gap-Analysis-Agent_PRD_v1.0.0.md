# PF-Core: Comparative Gap Analysis Agent System PRD

## Claude Agent SDK Architecture for Strategic Gap Analysis

**Document ID:** PRD-CGA-001
**Version:** 1.0.0
**Status:** Draft
**Author:** Platform Foundation
**Date:** December 6, 2025
**Framework:** PF-Core Agentic Framework v3.0
**Compliance:** 14-Section Production Standard (P0.1-P0.14)

---

## Executive Summary

This PRD defines a **reusable Comparative Gap Analysis (CGA) Agent System** that enables SDK-orchestrated agents to strategize, execute, and report on gap analysis across multiple domains. The system is designed with a domain-agnostic core that can be parameterized for specific use cases while providing reusable skills for **Threats & Opportunities Analysis** that transfer across all gap analysis scenarios.

**Initial Implementation:** Be AI Visible (BAIV) - AI Visibility Gap Analysis
**Reusable Patterns:** Comparative analysis of threats, opportunities, structural holes, and strategic gaps

### Key Value Propositions

| Stakeholder | Value Delivered |
|-------------|-----------------|
| **SDK Agent Developers** | Reusable gap analysis skills that compose into domain-specific workflows |
| **Business Strategists** | Automated identification of threats, opportunities, and strategic gaps |
| **Platform Architects** | Parameterized framework that transfers across PF-Instances |
| **End Users** | Actionable insights from comparative analysis with prioritized recommendations |

---

## Document Header

| Field | Value |
|-------|-------|
| **Agent ID** | `pf-core-cga-orchestrator-agent` |
| **Agent Name** | Comparative Gap Analysis Orchestrating Agent |
| **Version** | 1.0.0 |
| **Status** | Draft |
| **Author** | Platform Foundation Architecture Team |
| **Date** | December 6, 2025 |
| **PF-Instance** | PF-Core (transferable to BAIV, AIR, W4M) |
| **Product/Service** | Gap Analysis as a reusable capability |

---

## P0.1 Agent Identity & Role

### P0.1.1 Classification

| Attribute | Value |
|-----------|-------|
| **Agent ID** | `pf-core-cga-orchestrator-agent` |
| **Tier** | `orchestrator` |
| **Cluster** | `analysis` |
| **Scope** | `[PF-Core]` with instance parameterization |

### P0.1.2 Role Definition

**Primary Role:**
> Orchestrate comparative gap analysis workflows by coordinating specialized sub-agents to identify, analyze, prioritize, and transform gaps into actionable strategic recommendations.

**Authority Boundaries:**

| Can Do | Cannot Do | Requires Approval |
|--------|-----------|-------------------|
| Invoke sub-agents for analysis | Directly modify external systems | Publishing gap reports externally |
| Read from ontology stores | Delete historical analysis data | Archiving analysis sessions |
| Generate strategic recommendations | Make financial commitments | Implementing recommended changes |
| Coordinate InfraNodus API calls | Access competitor internal data | Accessing PII-containing sources |

**Escalation Path:**
```
CGA Orchestrator → VEOA (Value Engineering Orchestrating Agent) → Human Strategist → Business Owner
```

### P0.1.3 W4M Business Framework Alignment

| Attribute | Value |
|-----------|-------|
| **Primary Layer** | Layer 6: Competitive Intelligence |
| **Secondary Layers** | Layer 1: Problem Space, Layer 4: Value Proposition |
| **W4M Context Required** | Yes |

**Layer Engagement Detail:**

| Layer | Engagement Level | Purpose |
|-------|-----------------|---------|
| Layer 1: Problem Space | Secondary | Identify gaps in problem-solution fit |
| Layer 2: ICP | Secondary | Understand target segment coverage gaps |
| Layer 3: Solution | Secondary | Map capability gaps |
| Layer 4: Value Proposition | Primary | Identify value delivery gaps |
| Layer 5: Business Model | Secondary | Revenue/cost gap analysis |
| Layer 6: Competitive | Primary | Threat and opportunity identification |
| Layer 7: Market | Secondary | Market position gap analysis |
| Layer 8: Strategy (VSOM) | Primary | Strategic gap prioritization |

### P0.1.4 Ontology Access

**Core Ontologies [PF-Core]:**

| Ontology ID | Access Level | Purpose |
|-------------|--------------|---------|
| `pf:vsom` | Read | Strategic context and alignment scoring |
| `pf:okr` | Read | Objective linkage for gap prioritization |
| `pf:gap-analysis` | Read/Write | Core gap analysis data model |
| `pf:agent` | Read | Agent capability registry |

**Instance Ontologies [Parameterized]:**

| Ontology ID | Access Level | Purpose |
|-------------|--------------|---------|
| `[PF-Instance]:domain-entities` | Read | Domain-specific entity definitions |
| `[PF-Instance]:competitive-landscape` | Read | Instance-specific competitor data |
| `[PF-Instance]:value-proposition` | Read | Value prop gaps specific to instance |

**Product Ontologies [BAIV Example]:**

| Ontology ID | Access Level | Purpose |
|-------------|--------------|---------|
| `baiv:ai-visibility` | Read/Write | AI platform citation and visibility data |
| `baiv:content-strategy` | Read/Write | Content gap recommendations |
| `baiv:brand-ontology` | Read | Brand entity relationships |

### P0.1.5 Persona

| Attribute | Value |
|-----------|-------|
| **Communication Style** | Analytical, Strategic, Data-Driven |
| **Expertise Level** | Expert in comparative analysis methodologies |
| **Decision Approach** | Balanced (data-informed with strategic intuition) |

---

## P0.2 Core Objectives

### P0.2.1 Primary Objective

**Statement:**
> Enable SDK agents to systematically identify, compare, and prioritize strategic gaps across any domain by providing reusable analysis patterns and domain-parameterized workflows.

**Success Criteria:**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Gap identification accuracy | >85% | Human validation of critical gaps |
| Threat/Opportunity detection rate | >90% | Coverage of known competitive threats |
| Recommendation actionability | >80% | User acceptance rate of suggestions |
| Cross-instance reusability | 100% | Same core skills work across PF-Instances |

**Business Value:**
> Transforms gap analysis from ad-hoc manual processes into systematic, automated intelligence that accelerates strategic decision-making and ensures consistent methodology across all ventures.

### P0.2.2 Secondary Objectives

| Priority | Objective | Dependency |
|----------|-----------|------------|
| High | Provide reusable threat analysis skills | Core ontology definitions |
| High | Enable opportunity identification automation | InfraNodus integration |
| Medium | Generate prioritized roadmaps from gaps | VSOM context availability |
| Medium | Support comparative competitive analysis | Competitor data access |
| Low | Enable predictive gap forecasting | Historical data accumulation |

### P0.2.3 Constraints

**Hard Constraints (Must Not):**
- [ ] Must not access competitor internal/proprietary data
- [ ] Must not make automated public disclosures
- [ ] Must not bypass human approval for strategic recommendations
- [ ] Must not exceed API rate limits for external services

**Soft Constraints (Should Avoid):**
- [ ] Avoid analysis paralysis with excessive gap categories
- [ ] Avoid recommendations without supporting evidence
- [ ] Avoid domain-specific logic in core skills

### P0.2.4 Strategic Alignment

| VSOM Element | Alignment |
|--------------|-----------|
| **Vision** | Enable intelligent, automated strategic intelligence across all PF ventures |
| **Strategic Objective** | SO-P-002: Establish reusable analysis capabilities |
| **OKR** | O1: Achieve 80% agent reuse across ventures |
| **Key Result Contribution** | KR3: Deploy gap analysis to 3+ instances |

### P0.2.5 Value Engineering Alignment

| W4M Layer | Contribution |
|-----------|--------------|
| **Pain Points Addressed** | Manual gap analysis is time-consuming and inconsistent |
| **ICP Served** | Business strategists, product managers, competitive analysts |
| **Solution Delivered** | Automated, systematic gap identification and prioritization |
| **Value Created** | 70% reduction in analysis time, 40% improvement in gap detection |

---

## P0.3 Input Processing

### P0.3.1 Input Sources

| Source | Format | Validation Required | Schema Reference |
|--------|--------|--------------------|--------------------|
| Domain entities | JSON-LD | Entity type validation | `pf:gap-analysis/entity` |
| Knowledge graphs | InfraNodus export | Graph structure validation | `pf:gap-analysis/graph` |
| Competitor data | JSON | Completeness check | `[Instance]:competitor` |
| Strategic context | XML/JSON | VSOM schema compliance | `pf:vsom` |
| User parameters | JSON | Required field validation | `pf:gap-analysis/params` |

### P0.3.2 Context Requirements

**Strategic Context [PF-Core]:**

| Source | Required | Token Budget | Refresh |
|--------|----------|--------------|---------|
| `pf:vsom` | Yes | 300 | Session start |
| `pf:okr` | Yes | 200 | Session start |
| `pf:gap-analysis/config` | Yes | 150 | On change |

**Domain Context [PF-Instance]:**

| Source | Required | Token Budget | Refresh |
|--------|----------|--------------|---------|
| `[Instance]:domain-entities` | Yes | 500 | On analysis start |
| `[Instance]:competitive-landscape` | Conditional | 400 | Weekly |
| W4M Layer 6 data | Yes | 300 | On demand |

**Operational Context [Product/Service]:**

| Source | Required | Token Budget | Refresh |
|--------|----------|--------------|---------|
| Task parameters | Yes | 200 | Per request |
| Session history | Yes | 300 | Continuous |
| Previous analysis | Conditional | 400 | On reference |

**Total Context Budget:** 2,750 tokens

### P0.3.3 Preprocessing Pipeline

| Step | Purpose | Failure Action |
|------|---------|----------------|
| 1. Validate input schema | Ensure data integrity | Return validation errors |
| 2. Resolve entity references | Link to ontology IDs | Flag unresolved entities |
| 3. Load domain context | Parameterize for instance | Use defaults if unavailable |
| 4. Check graph connectivity | Ensure InfraNodus access | Queue for retry or degrade |
| 5. Inject VSOM context | Align with strategy | Warn and proceed with defaults |

### P0.3.4 Input Validation

**Schema Validation:**
- Ontology: `pf:gap-analysis/input-schema`
- Required fields: `sessionId`, `domainType`, `analysisScope`, `targetEntities`
- Optional fields: `competitorIds`, `timeframe`, `priorityWeights`

**Business Rules:**
- [ ] At least 3 entities required for comparative analysis
- [ ] Domain type must match configured PF-Instance
- [ ] Analysis scope must be within authorized boundaries

**Rejection Criteria:**
- [ ] Missing required strategic context
- [ ] Invalid ontology references
- [ ] Scope exceeds user authorization level

---

## P0.4 Decision Framework

### P0.4.1 Decision Model

| Attribute | Value |
|-----------|-------|
| **Type** | `hybrid` (rules + ML-assisted prioritization) |
| **Primary Criteria** | Strategic alignment, Business impact, Feasibility |
| **Weighting Method** | Configurable per instance with defaults |

### P0.4.2 W4M Business Framework Integration

| Layer | Decision Influence |
|-------|-------------------|
| Layer 1: Problem | Validates gaps against real customer problems |
| Layer 2: ICP | Prioritizes gaps affecting core customer segments |
| Layer 3: Solution | Constrains recommendations to feasible solutions |
| Layer 4: Value | Weights gaps by value proposition impact |
| Layer 5: Business Model | Considers revenue/cost implications |
| Layer 6: Competitive | Primary input for threat/opportunity detection |
| Layer 7: Market | Contextualizes gaps in market dynamics |
| Layer 8: Strategy | Final alignment check for all recommendations |

### P0.4.3 Decision Points

| Decision | Options | Selection Logic | Confidence Threshold | Escalation Trigger |
|----------|---------|-----------------|---------------------|-------------------|
| Gap classification | Threat/Opportunity/Structural | InfraNodus metrics + rules | 0.80 | <0.60 confidence |
| Priority assignment | Critical/High/Medium/Low | Weighted scoring model | 0.75 | Strategic misalignment |
| Recommendation type | Content/Process/Capability | Gap type + domain rules | 0.85 | Cross-boundary impact |
| Analysis depth | Surface/Standard/Deep | Time budget + importance | 0.70 | User preference override |

### P0.4.4 Reasoning Transparency

| Attribute | Value |
|-----------|-------|
| **Explanation Required** | Yes |
| **Explanation Format** | Structured JSON with natural language summary |
| **Audit Trail** | Yes - full decision chain logged |

---

## P0.5 Tools & Capabilities

### P0.5.1 Core Tools [PF-Core]

| Tool ID | Purpose | ACI Compliant |
|---------|---------|---------------|
| `pf-core:ontology-query` | Query ontology stores | Yes |
| `pf-core:context-inject` | Inject strategic context | Yes |
| `pf-core:priority-score` | Calculate weighted priorities | Yes |
| `pf-core:audit-log` | Log decisions and actions | Yes |

### P0.5.2 Gap Analysis Skills [Reusable]

| Skill ID | Purpose | ACI Compliant | Poka-Yoke Patterns |
|---------|---------|---------------|-------------------|
| `cga:structural-hole-detector` | Identify structural gaps in knowledge graphs | Yes | Min 5 nodes required |
| `cga:threat-analyzer` | Analyze competitive threats from gaps | Yes | Confidence threshold |
| `cga:opportunity-identifier` | Transform gaps into opportunities | Yes | Evidence requirement |
| `cga:comparative-scorer` | Score gaps across dimensions | Yes | Normalization checks |
| `cga:bridge-concept-finder` | Identify bridging opportunities | Yes | Path validation |
| `cga:priority-matrix-builder` | Build impact/effort matrices | Yes | Complete input check |

### P0.5.3 Domain Tools [BAIV Instance Example]

| Tool ID | Purpose | ACI Compliant | Poka-Yoke Patterns |
|---------|---------|---------------|-------------------|
| `baiv:visibility-gap-analyzer` | AI platform visibility gaps | Yes | Platform validation |
| `baiv:content-gap-mapper` | Map content to knowledge gaps | Yes | Topic threshold |
| `baiv:citation-tracker` | Track AI citation changes | Yes | API health check |

### P0.5.4 MCP Integrations

| Server | Tools Available | Authentication |
|--------|-----------------|----------------|
| InfraNodus MCP | Graph analysis, gap detection, bridge concepts | API Key |
| Supabase MCP | CRUD operations, RLS-protected queries | JWT |
| Web MCP | Competitor research, market intelligence | Rate-limited |

### P0.5.5 Tool Selection Logic

**Routing Rules:**
```
IF gap_type == "structural_hole" THEN use cga:structural-hole-detector
ELSE IF gap_type == "competitive_threat" THEN use cga:threat-analyzer
ELSE IF gap_type == "market_opportunity" THEN use cga:opportunity-identifier
ELSE IF domain == "baiv" THEN use baiv:visibility-gap-analyzer
FALLBACK to cga:comparative-scorer
```

### P0.5.6 Capability Boundaries

| Can Do | Cannot Do | Requires Approval |
|--------|-----------|-------------------|
| Analyze provided data | Access new external sources | Adding data sources |
| Generate recommendations | Implement changes | Publishing recommendations |
| Score and prioritize gaps | Override user weights | Changing scoring model |
| Invoke configured MCP tools | Add new MCP integrations | Tool configuration changes |

---

## P0.6 Output Specifications

### P0.6.1 Output Types

| Type | Format | Schema | Destination |
|------|--------|--------|-------------|
| Gap Analysis Report | JSON-LD | `pf:gap-analysis/report` | Supabase + UI |
| Threat Assessment | JSON-LD | `pf:gap-analysis/threat` | Supabase |
| Opportunity Matrix | JSON-LD | `pf:gap-analysis/opportunity` | Supabase + UI |
| Priority Roadmap | JSON-LD | `pf:gap-analysis/roadmap` | UI Dashboard |
| Executive Summary | Markdown | N/A | UI + Export |

### P0.6.2 Schema Compliance

| Attribute | Value |
|-----------|-------|
| **Base Vocabulary** | `https://schema.org/` |
| **Extension Namespace** | `https://platform-foundation.ai/ontology/gap-analysis/` |
| **Validation Required** | Yes |
| **Alignment Threshold** | 85% |

### P0.6.3 Quality Standards

| Standard | Requirement | Validation Method |
|----------|-------------|-------------------|
| Accuracy | All gaps have evidence | Source citation check |
| Completeness | All required fields populated | Schema validation |
| Consistency | Scores normalized 0-1 | Range check |
| Actionability | Recommendations have next steps | Template compliance |

### P0.6.4 Output Ontology Schemas

**Gap Analysis Report Ontology:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platform-foundation.ai/ontology/",
    "cga": "pf:gap-analysis/"
  },
  "@type": "cga:GapAnalysisReport",
  "identifier": "uuid",
  "sessionId": "session-uuid",
  "analysisType": "comparative|structural|competitive",
  "domainInstance": "[PF-Instance]",
  "dateCreated": "ISO-8601",
  "status": "draft|reviewed|approved",

  "strategicContext": {
    "@type": "pf:VSOMContext",
    "alignedObjectives": ["SO-ID-1", "SO-ID-2"],
    "linkedOKRs": ["OKR-ID-1"]
  },

  "analysisScope": {
    "entityCount": 25,
    "relationshipCount": 42,
    "timeframe": "2025-Q4",
    "comparators": ["Competitor A", "Market Benchmark"]
  },

  "identifiedGaps": [
    {
      "@type": "cga:IdentifiedGap",
      "gapId": "gap-uuid",
      "gapType": "structural_hole|capability|content|competitive",
      "title": "Gap title",
      "description": "Detailed description",
      "severity": "critical|high|medium|low",
      "confidence": 0.85,
      "evidence": [
        {
          "source": "InfraNodus",
          "metric": "betweenness_centrality",
          "value": 0.78
        }
      ],
      "affectedEntities": ["entity-1", "entity-2"],
      "businessImpact": {
        "revenueRisk": "high|medium|low",
        "competitiveRisk": "high|medium|low",
        "opportunityCost": "estimated-value"
      }
    }
  ],

  "threats": [
    {
      "@type": "cga:ThreatAssessment",
      "threatId": "threat-uuid",
      "relatedGaps": ["gap-uuid-1"],
      "threatType": "competitive|market|capability|technology",
      "description": "Threat description",
      "probability": 0.70,
      "impact": 0.85,
      "riskScore": 0.595,
      "mitigationOptions": [
        {
          "option": "Mitigation description",
          "effort": "high|medium|low",
          "effectiveness": 0.75
        }
      ]
    }
  ],

  "opportunities": [
    {
      "@type": "cga:OpportunityAssessment",
      "opportunityId": "opp-uuid",
      "relatedGaps": ["gap-uuid-2"],
      "opportunityType": "market|capability|content|partnership",
      "title": "Opportunity title",
      "description": "Detailed opportunity description",
      "potentialValue": {
        "revenueImpact": "estimated-value",
        "marketShareGain": "percentage",
        "competitiveAdvantage": "description"
      },
      "feasibility": 0.80,
      "timeToValue": "3-6 months",
      "requiredCapabilities": ["capability-1", "capability-2"],
      "bridgeConcepts": ["concept-1", "concept-2"]
    }
  ],

  "priorityMatrix": {
    "@type": "cga:PriorityMatrix",
    "dimensions": ["impact", "effort", "urgency", "alignment"],
    "quadrants": {
      "quickWins": ["gap-uuid-1", "opp-uuid-1"],
      "majorProjects": ["gap-uuid-2"],
      "fillIns": ["gap-uuid-3"],
      "hardSlogs": ["gap-uuid-4"]
    },
    "rankedList": [
      {
        "itemId": "gap-uuid-1",
        "rank": 1,
        "compositeScore": 0.92,
        "rationale": "High impact, low effort, strategic alignment"
      }
    ]
  },

  "recommendations": [
    {
      "@type": "cga:Recommendation",
      "recommendationId": "rec-uuid",
      "addressesGaps": ["gap-uuid-1"],
      "addressesThreats": ["threat-uuid-1"],
      "enablesOpportunities": ["opp-uuid-1"],
      "title": "Recommendation title",
      "description": "Detailed recommendation",
      "actionType": "content|capability|process|partnership",
      "priority": "critical|high|medium|low",
      "implementation": {
        "phases": [
          {
            "phase": 1,
            "name": "Phase name",
            "deliverables": ["deliverable-1"],
            "estimatedEffort": "2 weeks"
          }
        ],
        "dependencies": ["dependency-1"],
        "risks": ["implementation-risk-1"]
      },
      "expectedOutcome": {
        "gapsClosed": ["gap-uuid-1"],
        "valueCreated": "description",
        "metrics": [
          {
            "metric": "metric-name",
            "baseline": 0.40,
            "target": 0.70
          }
        ]
      }
    }
  ],

  "executiveSummary": {
    "keyFindings": ["finding-1", "finding-2"],
    "criticalGapsCount": 3,
    "highPriorityOpportunities": 5,
    "recommendedNextSteps": ["step-1", "step-2", "step-3"],
    "estimatedTotalValue": "value-estimate"
  }
}
```

### P0.6.5 Delivery Method

| Condition | Delivery Type |
|-----------|---------------|
| Interactive analysis | Synchronous with streaming |
| Batch analysis | Asynchronous with webhook |
| Scheduled reports | Asynchronous with notification |
| API integration | Synchronous REST response |

---

## P0.7 Error Handling

### P0.7.1 Error Categories

| Category | Handling Strategy | Recovery Steps | Escalation |
|----------|------------------|----------------|------------|
| Input validation | Return detailed errors | Guide user to fix | Never - user corrects |
| InfraNodus API failure | Retry with backoff | Degrade to local analysis | After 3 retries |
| Insufficient data | Partial analysis warning | Request additional data | If critical gaps undetectable |
| Confidence below threshold | Flag for human review | Provide evidence for decision | Always for critical gaps |
| Context injection failure | Use cached/default context | Log and warn | If strategic misalignment risk |

### P0.7.2 Retry Policies

| Attribute | Value |
|-----------|-------|
| **Max Retries** | 3 |
| **Backoff Strategy** | Exponential (2s, 4s, 8s) |
| **Circuit Breaker** | Enabled (5 failures = 60s cooldown) |

### P0.7.3 Graceful Degradation

| Failure Mode | Fallback Behavior | User Communication |
|--------------|-------------------|-------------------|
| InfraNodus unavailable | Use cached graph or skip structural analysis | "Advanced graph analysis temporarily unavailable" |
| Low confidence detection | Include with confidence warning | "Gap detected with lower confidence - review recommended" |
| Partial entity resolution | Analyze resolved entities only | "X of Y entities analyzed - some references unresolved" |

### P0.7.4 Error Reporting

| Attribute | Value |
|-----------|-------|
| **Log Level** | ERROR and above to monitoring |
| **Include Context** | Yes - sanitized |
| **PII Scrubbing** | Enabled |
| **Correlation ID** | Required for all errors |

---

## P0.8 Context & Memory Management

### P0.8.1 Context Architecture

| Layer | Budget | Sources | Refresh |
|-------|--------|---------|---------|
| Strategic [PF-Core] | 500 tokens | VSOM, OKRs | Session start |
| Domain [PF-Instance] | 1,200 tokens | Domain ontologies, competitors | On analysis start |
| Operational [Analysis Session] | 1,000 tokens | Task params, history | Continuous |
| **Total** | 2,700 tokens | | |

### P0.8.2 Memory Patterns

**Session Memory:**

| Attribute | Value |
|-----------|-------|
| **Enabled** | Yes |
| **Scope** | Current analysis session entities, intermediate results |

**Persistent Memory:**

| Attribute | Value |
|-----------|-------|
| **Enabled** | Yes |
| **Storage** | `Supabase:gap_analysis_sessions` |

### P0.8.3 Compaction Strategy

| Attribute | Value |
|-----------|-------|
| **Trigger** | 80% of context budget consumed |
| **Threshold** | 2,160 tokens |
| **Preservation Priority** | Strategic context > Current gaps > Historical patterns |

### P0.8.4 Long-Running Agent Pattern

| Pattern | Value |
|---------|-------|
| **Initializer Pattern** | Load domain context, validate access, prepare tools |
| **Working Agent Pattern** | Iterative analysis with checkpoint saves |
| **Progress File** | `cga-[session-id]-progress.json` |
| **Features File** | `cga-[session-id]-features.json` |

---

## P0.9 Compliance & Constraints

### P0.9.1 Regulatory Compliance

| Framework | Requirements | Implementation |
|-----------|--------------|----------------|
| GDPR | Data minimization, purpose limitation | Only analyze consented data |
| SOC 2 | Audit logging, access controls | Full audit trail, RLS |

### P0.9.2 Data Governance

| Aspect | Policy |
|--------|--------|
| **PII Handling** | No PII in gap analysis - entities anonymized |
| **Data Retention** | Analysis sessions: 2 years, Reports: indefinite |
| **Data Residency** | Per tenant configuration |
| **Encryption** | At rest (AES-256), In transit (TLS 1.3) |

### P0.9.3 Ethical Constraints

| Constraint | Implementation |
|------------|----------------|
| **Bias Mitigation** | Diverse training data for classification models |
| **Fairness Criteria** | Equal treatment across competitor analysis |
| **Transparency** | Full reasoning chain available for all recommendations |

### P0.9.4 Business Constraints

| Constraint | Limit |
|------------|-------|
| **Rate Limits** | 100 analyses/day per tenant |
| **Cost Controls** | Max $0.50 Claude API per analysis |
| **SLA Requirements** | <5 min for standard analysis, <30 min for deep |

### P0.9.5 Instance-Specific Constraints

| `[PF-Instance]` Rule | Description |
|----------------------|-------------|
| BAIV: Citation limits | Max 500 citation checks per analysis |
| AIR: Maturity scope | Analysis limited to declared AI capabilities |
| W4M: PMF boundaries | Gap analysis within validated segments only |

---

## P0.10 Integration Points

### P0.10.1 Upstream Agents

| Agent ID | Interaction Pattern | Data Exchange |
|----------|--------------------|--------------|
| `veoa-orchestrator` | Receives analysis requests | JSON task spec |
| `discovery-agent` | Receives entity discoveries | JSON-LD entities |
| `content-extraction-agent` | Receives content for analysis | JSON-LD content blocks |

### P0.10.2 Downstream Agents

| Agent ID | Interaction Pattern | Data Exchange |
|----------|--------------------|--------------|
| `opportunity-agent` | Sends identified opportunities | JSON-LD opportunities |
| `strategy-generation-agent` | Sends prioritized gaps | JSON-LD gap report |
| `content-generation-agent` | Sends content gap specs | JSON-LD content specs |

### P0.10.3 External Systems

| System | Integration Type | Authentication | Error Handling |
|--------|-----------------|----------------|----------------|
| InfraNodus | REST API via MCP | API Key | Retry + degrade |
| Supabase | PostgreSQL via MCP | JWT | Retry + cache |
| Claude API | Direct SDK | API Key | Retry + queue |

### P0.10.4 OAA Integration

| Attribute | Value |
|-----------|-------|
| **Ontology Access** | `pf:gap-analysis`, `pf:vsom`, `[instance]:*` |
| **Access Pattern** | Read primary, Write to gap-analysis |
| **Scope** | Tenant > Process > Task |

### P0.10.5 Event Bus

| Type | Events |
|------|--------|
| **Publishes** | `gap.identified`, `threat.detected`, `opportunity.found`, `analysis.complete` |
| **Subscribes** | `entity.discovered`, `content.extracted`, `analysis.requested` |

---

## P0.11 Monitoring & Logging

### P0.11.1 Metrics

| Metric | Type | Labels |
|--------|------|--------|
| `cga_analysis_duration_seconds` | histogram | domain, analysis_type |
| `cga_gaps_identified_total` | counter | domain, gap_type, severity |
| `cga_confidence_score` | gauge | domain, gap_type |
| `cga_api_calls_total` | counter | service, status |
| `cga_recommendations_generated` | counter | domain, action_type |

### P0.11.2 Logging

| Attribute | Value |
|-----------|-------|
| **Levels** | DEBUG, INFO, WARNING, ERROR, CRITICAL |
| **Structured Format** | JSON with correlation IDs |
| **Correlation ID** | Required |
| **Instance Tags** | `[PF-Instance]`, `gap-analysis`, `[session-id]` |

### P0.11.3 Alerting

| Condition | Threshold | Notification |
|-----------|-----------|--------------|
| Analysis failure rate | >5% in 1 hour | Slack + PagerDuty |
| InfraNodus unavailable | >5 min | Slack |
| Low confidence rate | >30% of gaps | Daily digest |
| API cost anomaly | >150% of daily average | Slack |

### P0.11.4 Audit Trail

| Attribute | Value |
|-----------|-------|
| **Enabled** | Yes |
| **Events** | All gap identifications, threat assessments, recommendations |
| **Retention** | 7 years |
| **Storage** | `Supabase:cga_audit_log` |

---

## P0.12 Example Scenarios

### P0.12.1 Happy Path Scenarios

**Scenario 1: BAIV AI Visibility Gap Analysis**

```yaml
description: "Complete visibility gap analysis for a B2B SaaS company"
business_context:
  w4m_layers: [4, 6]
  icp_segment: "B2B SaaS CMO"
  domain: "baiv"
input:
  type: "gap_analysis_request"
  data: |
    {
      "sessionId": "sess-001",
      "domainType": "baiv",
      "analysisScope": "ai_visibility",
      "targetEntities": [
        {"type": "Brand", "id": "brand-001"},
        {"type": "Competitor", "id": "comp-001"},
        {"type": "AIModel", "id": "claude-3"},
        {"type": "AIModel", "id": "gpt-4"}
      ],
      "timeframe": "2025-Q4"
    }
expected_output:
  format: "cga:GapAnalysisReport"
  validation: |
    - Contains identified gaps with confidence > 0.75
    - Includes threat assessments for competitive gaps
    - Provides actionable opportunities with bridge concepts
    - Priority matrix populated with all quadrants
  data: |
    {
      "@type": "cga:GapAnalysisReport",
      "identifiedGaps": [
        {
          "gapType": "content",
          "title": "Missing AI-CX connection content",
          "severity": "high",
          "confidence": 0.85
        }
      ],
      "opportunities": [
        {
          "title": "AI-Driven CX Thought Leadership",
          "potentialValue": {"revenueImpact": "$50K pipeline"},
          "bridgeConcepts": ["process automation", "personalization"]
        }
      ]
    }
```

**Scenario 2: Cross-Instance Competitive Threat Analysis**

```yaml
description: "Reusable threat analysis across multiple domains"
business_context:
  w4m_layers: [6, 8]
  icp_segment: "Multiple"
  domain: "pf-core"
input:
  type: "threat_analysis_request"
  data: |
    {
      "sessionId": "sess-002",
      "analysisType": "competitive_threat",
      "instances": ["baiv", "air"],
      "threatCategories": ["market_entry", "capability_gap", "technology_shift"]
    }
expected_output:
  format: "cga:ThreatAssessment[]"
  validation: |
    - Threats identified per instance
    - Cross-instance patterns highlighted
    - Mitigation options provided for each
```

### P0.12.2 Edge Case Scenarios

**Scenario: Sparse Knowledge Graph**

```yaml
description: "Analysis with minimal entity relationships"
input:
  type: "gap_analysis_request"
  data: |
    {
      "sessionId": "sess-003",
      "targetEntities": [
        {"type": "Brand", "id": "brand-002"}
      ],
      "graphDensity": "sparse"
    }
expected_handling: |
  - Agent detects insufficient relationships
  - Degrades to entity-centric analysis
  - Flags gaps with lower confidence
  - Recommends data enrichment actions
business_context: "Early-stage company with limited digital footprint"
```

**Scenario: Conflicting Strategic Priorities**

```yaml
description: "Gaps align with conflicting OKRs"
input:
  type: "gap_analysis_request"
  data: |
    {
      "linkedOKRs": ["OKR-001", "OKR-002"],
      "conflictingPriorities": true
    }
expected_handling: |
  - Agent detects OKR conflicts
  - Presents both prioritization options
  - Escalates to human for resolution
  - Documents conflict rationale
```

### P0.12.3 Error Scenarios

**Scenario: InfraNodus API Timeout**

```yaml
description: "External graph service unavailable"
trigger: "InfraNodus API returns timeout after 3 retries"
expected_handling: |
  - Circuit breaker activates
  - Fallback to cached graph (if available)
  - Or: Skip structural hole analysis
  - Partial report generated with warning
recovery_outcome: "Analysis completes with reduced capability, user notified"
```

### P0.12.4 Instance-Specific Scenarios

**BAIV Scenario: AI Platform Citation Shift**

```yaml
description: "Detect sudden change in AI platform citations"
context: "BAIV instance monitoring brand mentions"
input: |
  {
    "analysisType": "citation_gap",
    "platforms": ["claude", "gpt", "perplexity"],
    "timeComparison": "week_over_week"
  }
expected_output: |
  {
    "citationGaps": [
      {
        "platform": "claude",
        "change": "-15%",
        "severity": "high",
        "probableCause": "Competitor content surge",
        "recommendation": "Urgent content refresh for [topic]"
      }
    ]
  }
```

---

## P0.13 Testing & Validation

### P0.13.1 Coverage Targets

| Test Type | Target | Current |
|-----------|--------|---------|
| Unit Tests | 85% | TBD |
| Integration Tests | 80% | TBD |
| E2E Tests | 70% | TBD |

### P0.13.2 Test Categories

| Category | Test Count | Coverage |
|----------|------------|----------|
| Input Validation | 25 | Required |
| Gap Detection Logic | 40 | Required |
| Threat Analysis | 30 | Required |
| Opportunity Identification | 30 | Required |
| Cross-Instance Reuse | 20 | Required |
| Error Handling | 35 | Required |
| Integration | 25 | Required |

### P0.13.3 Evaluation Framework

| Attribute | Value |
|-----------|-------|
| **Eval Datasets** | `cga-eval-baiv-v1.json`, `cga-eval-generic-v1.json` |
| **Accuracy Metrics** | Precision, Recall, F1 for gap detection |
| **Baseline Threshold** | F1 > 0.80 |
| **Golden Dataset** | `cga-golden-gaps-v1.json` (100 validated gaps) |

### P0.13.4 Verification Approach

| Priority | Method | Use Case |
|----------|--------|----------|
| Primary | Rules-based | Schema validation, threshold checks |
| Secondary | Human review | Critical gap validation |
| Tertiary | LLM-as-judge | Recommendation quality (sparingly) |

### P0.13.5 TDD Compliance

| Requirement | Status |
|-------------|--------|
| Red-Green-Refactor | Required |
| Test-First Development | Required |
| Coverage Gates | CI/CD enforced at 80% |

---

## P0.14 Maintenance & Updates

### P0.14.1 Versioning

| Attribute | Value |
|-----------|-------|
| **Scheme** | Semantic (major.minor.patch) |
| **Current Version** | 1.0.0 |
| **Breaking Change Policy** | Major version bump, 30-day deprecation |
| **Deprecation Policy** | 2 minor versions of overlap |

### P0.14.2 Update Procedures

| Update Type | Procedure | Testing Required |
|-------------|-----------|-----------------|
| Ontology schema update | Migrate existing data, validate | Full regression |
| Skill addition | Add to registry, document | Skill-specific + integration |
| Instance configuration | Config update, no code change | Instance-specific |
| InfraNodus API change | Update MCP connector | Integration tests |

### P0.14.3 Rollback Procedures

| Attribute | Value |
|-----------|-------|
| **Trigger Conditions** | >5% error rate, critical bug, data corruption |
| **Rollback Steps** | Feature flag disable → Previous version deploy |
| **Verification** | Error rate normalization, sample analysis validation |

### P0.14.4 Documentation Requirements

| Document | Required | Location |
|----------|----------|----------|
| Changelog | Yes | `/docs/cga-agent/CHANGELOG.md` |
| Migration Guide | For breaking changes | `/docs/cga-agent/MIGRATION.md` |
| API Documentation | Yes | `/docs/cga-agent/API.md` |
| Skill Catalog | Yes | `/docs/cga-agent/SKILLS.md` |

### P0.14.5 Health Checks

| Attribute | Value |
|-----------|-------|
| **Frequency** | Every 5 minutes |
| **Checks** | API connectivity, model availability, database access |
| **Alerting** | PagerDuty on 3 consecutive failures |

---

## Appendix A: Reusable Gap Analysis Skills Catalog

### A.1 Core Skills (Domain-Agnostic)

| Skill ID | Name | Description | Inputs | Outputs |
|----------|------|-------------|--------|---------|
| `cga:structural-hole-detector` | Structural Hole Detector | Identifies disconnected clusters in knowledge graphs | Graph data, threshold | Structural holes list |
| `cga:threat-analyzer` | Threat Analyzer | Assesses competitive threats from identified gaps | Gaps, competitor data | Threat assessments |
| `cga:opportunity-identifier` | Opportunity Identifier | Transforms gaps into actionable opportunities | Gaps, market context | Opportunity cards |
| `cga:bridge-concept-finder` | Bridge Concept Finder | Finds concepts that could connect disconnected areas | Graph, gap locations | Bridge suggestions |
| `cga:priority-matrix-builder` | Priority Matrix Builder | Builds impact/effort prioritization matrices | Items, dimensions | Prioritized quadrants |
| `cga:comparative-scorer` | Comparative Scorer | Scores entities across configurable dimensions | Entities, criteria | Scored rankings |

### A.2 Skill Composition Patterns

**Pattern 1: Full Gap Analysis Pipeline**
```
structural-hole-detector → threat-analyzer → opportunity-identifier → priority-matrix-builder
```

**Pattern 2: Quick Threat Scan**
```
comparative-scorer → threat-analyzer
```

**Pattern 3: Opportunity Discovery**
```
bridge-concept-finder → opportunity-identifier → priority-matrix-builder
```

### A.3 Skill Extension Points

Each skill exposes extension points for domain-specific customization:

```json
{
  "skill": "cga:threat-analyzer",
  "extensionPoints": {
    "threatCategories": "Domain-specific threat types",
    "impactCalculation": "Custom impact formula",
    "mitigationTemplates": "Domain-specific response patterns"
  },
  "baivExtension": {
    "threatCategories": ["visibility_loss", "citation_decline", "competitor_surge"],
    "impactCalculation": "visibilityScore * marketValue",
    "mitigationTemplates": ["content_refresh", "schema_optimization", "platform_targeting"]
  }
}
```

---

## Appendix B: InfraNodus Integration Specification

### B.1 API Endpoints Used

| Endpoint | Purpose | Rate Limit |
|----------|---------|------------|
| `POST /graphs` | Import entity graph | 10/min |
| `GET /graphs/{id}/gaps` | Retrieve structural holes | 30/min |
| `GET /graphs/{id}/bridges` | Get bridge concepts | 30/min |
| `GET /graphs/{id}/metrics` | Graph density, centrality | 60/min |

### B.2 Data Mapping

| CGA Concept | InfraNodus Concept |
|-------------|-------------------|
| Entity | Node |
| Relationship | Edge |
| Structural Gap | Structural Hole |
| Bridge Opportunity | Bridge Word |
| Gap Severity | Betweenness Centrality |

### B.3 Fallback Strategies

| InfraNodus Feature | Local Fallback |
|--------------------|----------------|
| Structural hole detection | NetworkX betweenness calculation |
| Bridge concept finding | Co-occurrence analysis |
| Graph metrics | Local graph algorithms |

---

## Appendix C: Claude Agent SDK Implementation Patterns

### C.1 Orchestrator Agent Pattern

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

class CGAOrchestratorAgent {
  private client: Anthropic;
  private supabase: ReturnType<typeof createClient>;
  private skills: Map<string, Skill>;

  constructor() {
    this.skills = new Map([
      ['structural-hole-detector', new StructuralHoleDetector()],
      ['threat-analyzer', new ThreatAnalyzer()],
      ['opportunity-identifier', new OpportunityIdentifier()],
      ['bridge-concept-finder', new BridgeConceptFinder()],
      ['priority-matrix-builder', new PriorityMatrixBuilder()],
      ['comparative-scorer', new ComparativeScorer()]
    ]);
  }

  async execute(input: CGAInput): Promise<CGAReport> {
    // 1. Load context
    const context = await this.loadContext(input);

    // 2. Build knowledge graph
    const graph = await this.buildGraph(input.targetEntities);

    // 3. Detect structural gaps
    const structuralGaps = await this.skills.get('structural-hole-detector')!
      .execute({ graph, threshold: 0.7 });

    // 4. Analyze threats
    const threats = await this.skills.get('threat-analyzer')!
      .execute({ gaps: structuralGaps, competitors: input.competitors });

    // 5. Identify opportunities
    const opportunities = await this.skills.get('opportunity-identifier')!
      .execute({ gaps: structuralGaps, context });

    // 6. Find bridge concepts
    const bridges = await this.skills.get('bridge-concept-finder')!
      .execute({ graph, gaps: structuralGaps });

    // 7. Build priority matrix
    const priorities = await this.skills.get('priority-matrix-builder')!
      .execute({
        items: [...structuralGaps, ...opportunities],
        dimensions: ['impact', 'effort', 'urgency', 'alignment']
      });

    // 8. Generate recommendations
    const recommendations = await this.generateRecommendations({
      gaps: structuralGaps,
      threats,
      opportunities,
      bridges,
      priorities,
      context
    });

    // 9. Compile report
    return this.compileReport({
      input,
      context,
      gaps: structuralGaps,
      threats,
      opportunities,
      priorities,
      recommendations
    });
  }

  private async generateRecommendations(data: AnalysisData): Promise<Recommendation[]> {
    const response = await this.client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 8192,
      messages: [{
        role: "user",
        content: `Generate strategic recommendations from this gap analysis:

        Gaps: ${JSON.stringify(data.gaps)}
        Threats: ${JSON.stringify(data.threats)}
        Opportunities: ${JSON.stringify(data.opportunities)}
        Bridge Concepts: ${JSON.stringify(data.bridges)}
        Priorities: ${JSON.stringify(data.priorities)}
        Strategic Context: ${JSON.stringify(data.context)}

        For each recommendation:
        1. Link to specific gaps/threats/opportunities
        2. Provide implementation phases
        3. Estimate effort and impact
        4. Ensure strategic alignment

        Return as JSON array matching cga:Recommendation schema.`
      }]
    });

    return JSON.parse(response.content[0].text);
  }
}
```

### C.2 Reusable Skill Pattern

```typescript
interface Skill<TInput, TOutput> {
  id: string;
  version: string;
  execute(input: TInput): Promise<TOutput>;
  validate(input: TInput): ValidationResult;
  getExtensionPoints(): ExtensionPoint[];
}

class StructuralHoleDetector implements Skill<GraphInput, StructuralGap[]> {
  id = 'cga:structural-hole-detector';
  version = '1.0.0';

  async execute(input: GraphInput): Promise<StructuralGap[]> {
    // Try InfraNodus first
    try {
      return await this.detectViaInfraNodus(input);
    } catch (error) {
      // Fallback to local calculation
      return await this.detectLocally(input);
    }
  }

  validate(input: GraphInput): ValidationResult {
    if (input.graph.nodes.length < 5) {
      return { valid: false, error: 'Minimum 5 nodes required for analysis' };
    }
    return { valid: true };
  }

  getExtensionPoints(): ExtensionPoint[] {
    return [
      { name: 'gapClassifier', type: 'function' },
      { name: 'severityCalculator', type: 'function' },
      { name: 'domainFilters', type: 'config' }
    ];
  }
}
```

---

## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Author | Platform Foundation Architecture | Dec 6, 2025 | |
| Technical Reviewer | | | |
| Product Owner | | | |
| Security Reviewer | | | |

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-12-06 | Initial PRD creation | Platform Foundation |

---

*PRD Version: 1.0.0 | Framework: PF-Core v3.0 | Compliance: 14-Section Standard*
