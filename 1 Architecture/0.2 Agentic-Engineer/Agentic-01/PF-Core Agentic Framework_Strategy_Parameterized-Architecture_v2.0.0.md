# PF-Agent Framework: Parameterized Architecture

## Platform Foundation Core & Instance-Specific Configuration

**Version:** 2.0.0  
**Status:** Production Framework Specification  
**Scope:** PF-Core (Transferable) + PF-Instance (Product/Service Specific)

---

## Document Parameter Legend

Throughout this document and all related templates, the following parameter notation is used:

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `[PF-Core]` | Platform Foundation Core - transferable across all instances | Tenant management, VSOM, OKR |
| `[PF-Instance]` | Specific platform deployment | BAIV, AIR, W4M, Client-X |
| `[Product/Service]` | Specific product or service being delivered | AI Visibility Audit, Strategy Consulting |
| `[Ontology-Instance]` | Instance-specific ontology | `baiv:ai-visibility`, `air:strategy` |
| `[Ontology-Core]` | Core transferable ontology | `pf:vsom`, `pf:tenant`, `pf:okr` |
| `[Agent-ID]` | Unique agent identifier | `[PF-Instance]-[cluster]-[function]` |
| `[Tenant-ID]` | Multi-tenant identifier | Customer organization UUID |

---

## PART 1: 8-LAYER BUSINESS FRAMEWORK (W4M VALUE ENGINEERING)

### 1.1 Framework Overview

All agents MUST systematically account for the complete 8-layer business framework. This ensures strategic alignment from problem identification through execution.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    W4M 8-LAYER BUSINESS FRAMEWORK                            │
│                    (Value Engineering Cascade)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LAYER 8: STRATEGY (VSOM)                                        [PF-Core]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Vision → Strategy → Objectives → Metrics                              │ │
│  │  BSC Perspectives | OKR Cascade | Performance Tracking                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 7: MARKET (TAM/SAM/SOM)                               [PF-Instance]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Total Addressable Market | Serviceable Market | Obtainable Market     │ │
│  │  Market Sizing | Growth Projections | Segment Analysis                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 6: COMPETITIVE LANDSCAPE                              [PF-Instance]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Direct Competitors | Indirect Competitors | Substitutes               │ │
│  │  Competitive Advantages | Moats | Differentiation                      │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 5: BUSINESS MODEL                                     [PF-Instance]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Revenue Model | Pricing Strategy | Unit Economics                     │ │
│  │  Cost Structure | Channels | Key Partners                              │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 4: VALUE PROPOSITION                                  [PF-Instance]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Core Value | Benefits | Differentiation | Proof Points                │ │
│  │  Jobs-to-be-Done | Gains Created | Pains Relieved                      │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 3: SOLUTION                                      [Product/Service]   │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Product Features | Service Capabilities | Delivery Method             │ │
│  │  Technology Stack | Agent Architecture | Process Design                │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 2: ICP (IDEAL CUSTOMER PROFILE)                       [PF-Instance]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Firmographics | Technographics | Psychographics                       │ │
│  │  Buying Behavior | Decision Makers | Journey Stages                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                         │
│  LAYER 1: PROBLEM SPACE                                      [PF-Instance]  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Pain Points | Challenges | Unmet Needs | Root Causes                  │ │
│  │  Problem Severity | Frequency | Willingness to Pay                     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Layer Definitions & Parameters

#### Layer 1: Problem Space `[PF-Instance]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:ProblemSpace",
  "instanceBinding": "[PF-Instance]",
  
  "painPoints": [
    {
      "painPointId": "[PF-Instance]-PAIN-001",
      "description": "[Problem description specific to instance]",
      "severity": "critical|high|medium|low",
      "frequency": "constant|frequent|occasional|rare",
      "currentSolutions": "[How ICP currently addresses this]",
      "willingnessToPay": "high|medium|low",
      "evidenceSource": "[Research, interviews, data source]"
    }
  ],
  
  "rootCauses": [
    {
      "cause": "[Underlying cause of pain]",
      "linkedPainPoints": ["[PF-Instance]-PAIN-001"]
    }
  ]
}
```

#### Layer 2: ICP (Ideal Customer Profile) `[PF-Instance]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:IdealCustomerProfile",
  "instanceBinding": "[PF-Instance]",
  
  "firmographics": {
    "industries": ["[Target industries for instance]"],
    "companySize": "[Employee ranges]",
    "revenueRange": "[Revenue bands]",
    "geography": "[Target regions]"
  },
  
  "technographics": {
    "techStack": ["[Technologies ICP uses]"],
    "digitalMaturity": "[PF-Instance]-specific maturity model",
    "aiReadiness": "leader|adopting|exploring|unaware"
  },
  
  "psychographics": {
    "businessPriorities": ["[What matters to them]"],
    "riskTolerance": "high|medium|low",
    "innovationMindset": "early_adopter|early_majority|late_majority"
  },
  
  "buyingBehavior": {
    "decisionMakers": ["[Roles involved in purchase]"],
    "buyingCriteria": ["[What they evaluate]"],
    "typicalBudget": "[Budget ranges]",
    "salesCycleLength": "[Timeframes]"
  }
}
```

#### Layer 3: Solution `[Product/Service]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:Solution",
  "instanceBinding": "[PF-Instance]",
  "productService": "[Product/Service]",
  
  "capabilities": [
    {
      "capabilityId": "[Product/Service]-CAP-001",
      "name": "[Capability name]",
      "description": "[What it does]",
      "addressesPainPoints": ["[PF-Instance]-PAIN-001"],
      "deliveryMethod": "automated|assisted|manual",
      "maturityLevel": "production|beta|alpha|concept"
    }
  ],
  
  "agentArchitecture": {
    "primaryAgents": ["[Agent-ID list]"],
    "subAgents": ["[Sub-agent list]"],
    "orchestrationPattern": "[Pattern name]"
  },
  
  "technologyStack": {
    "core": "[PF-Core] components used",
    "instanceSpecific": "[PF-Instance] extensions"
  }
}
```

#### Layer 4: Value Proposition `[PF-Instance]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:ValueProposition",
  "instanceBinding": "[PF-Instance]",
  
  "coreValue": {
    "statement": "[Primary value statement for instance]",
    "quantifiedBenefit": "[Measurable outcome]",
    "timeframe": "[When value is realized]"
  },
  
  "jobsToBeDone": [
    {
      "job": "[Job the customer is hiring product to do]",
      "importance": "critical|high|medium|low",
      "currentAlternatives": "[How they do it today]"
    }
  ],
  
  "gainsCreated": ["[Positive outcomes delivered]"],
  "painsRelieved": ["[Problems eliminated or reduced]"],
  
  "proofPoints": [
    {
      "type": "case_study|testimonial|metric|certification",
      "evidence": "[Specific proof]",
      "source": "[Attribution]"
    }
  ],
  
  "differentiation": {
    "uniqueCapabilities": ["[What only we do]"],
    "competitiveAdvantages": ["[Why we're better]"],
    "sustainableMoats": ["[Hard to replicate advantages]"]
  }
}
```

#### Layer 5: Business Model `[PF-Instance]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:BusinessModel",
  "instanceBinding": "[PF-Instance]",
  
  "revenueModel": {
    "type": "subscription|usage|transaction|hybrid",
    "pricingTiers": ["[Tier definitions]"],
    "billingFrequency": "monthly|annual|usage_based"
  },
  
  "unitEconomics": {
    "cac": "[Customer Acquisition Cost]",
    "ltv": "[Lifetime Value]",
    "ltvCacRatio": "[Target ratio]",
    "paybackPeriod": "[Months to recover CAC]"
  },
  
  "costStructure": {
    "fixedCosts": ["[Fixed cost categories]"],
    "variableCosts": ["[Variable cost categories]"],
    "marginTargets": "[Gross/Net margin goals]"
  },
  
  "channels": ["[Go-to-market channels]"],
  "keyPartners": ["[Strategic partnerships]"]
}
```

#### Layer 6: Competitive Landscape `[PF-Instance]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:CompetitiveLandscape",
  "instanceBinding": "[PF-Instance]",
  
  "directCompetitors": [
    {
      "name": "[Competitor]",
      "strengths": ["[Their advantages]"],
      "weaknesses": ["[Their gaps]"],
      "positioning": "[How they position]",
      "pricingModel": "[Their pricing]"
    }
  ],
  
  "indirectCompetitors": ["[Alternative solutions]"],
  "substitutes": ["[Different approaches to same problem]"],
  
  "competitivePosition": {
    "ourStrengths": ["[Where we win]"],
    "ourWeaknesses": ["[Where we're vulnerable]"],
    "battlegrounds": ["[Key competitive areas]"]
  },
  
  "moats": {
    "type": "network_effects|data|brand|switching_costs|technology",
    "strength": "strong|moderate|weak|building",
    "sustainability": "[How long defensible]"
  }
}
```

#### Layer 7: Market `[PF-Instance]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:MarketAnalysis",
  "instanceBinding": "[PF-Instance]",
  
  "tam": {
    "value": "[Total Addressable Market value]",
    "methodology": "[How calculated]",
    "growthRate": "[CAGR]"
  },
  
  "sam": {
    "value": "[Serviceable Addressable Market]",
    "segments": ["[Segments we can serve]"],
    "constraints": ["[Why not full TAM]"
  },
  
  "som": {
    "value": "[Serviceable Obtainable Market]",
    "timeframe": "[Years to achieve]",
    "assumptions": ["[Key assumptions]"]
  },
  
  "marketDynamics": {
    "trends": ["[Market trends]"],
    "drivers": ["[Growth drivers]"],
    "barriers": ["[Entry barriers]"]
  }
}
```

#### Layer 8: Strategy (VSOM) `[PF-Core]`

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:VSOM",
  "coreModule": "[PF-Core]",
  "instanceApplication": "[PF-Instance]",
  
  "vision": {
    "statement": "[Aspirational future state]",
    "timeHorizon": "[Years]"
  },
  
  "mission": {
    "statement": "[What we do, for whom, how]",
    "purpose": "[Why we exist]"
  },
  
  "strategicObjectives": {
    "financial": ["[Financial objectives]"],
    "customer": ["[Customer objectives]"],
    "internalProcess": ["[Process objectives]"],
    "learningGrowth": ["[Capability objectives]"],
    "stakeholder": ["[Stakeholder objectives]"]
  },
  
  "okrCascade": {
    "corporateOKRs": ["[Top-level OKRs]"],
    "functionalOKRs": ["[Department OKRs]"],
    "teamOKRs": ["[Team-level OKRs]"]
  },
  
  "metricsKPIs": {
    "leadingIndicators": ["[Predictive metrics]"],
    "laggingIndicators": ["[Outcome metrics]"]
  }
}
```

---

## PART 2: 14-SECTION AGENT PRODUCTION SPECIFICATION

### 2.1 Mandatory Agent Sections (P0.1 - P0.14)

**EVERY production agent MUST include all 14 sections.** This is the standard for production readiness.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              AGENT PRODUCTION SPECIFICATION: 14-SECTION STANDARD            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  P0.1  Agent Identity & Role                                                │
│  P0.2  Core Objectives                                                      │
│  P0.3  Input Processing                                                     │
│  P0.4  Decision Framework                                                   │
│  P0.5  Tools & Capabilities                                                 │
│  P0.6  Output Specifications                                                │
│  P0.7  Error Handling                                                       │
│  P0.8  Context & Memory Management                                          │
│  P0.9  Compliance & Constraints                                             │
│  P0.10 Integration Points                                                   │
│  P0.11 Monitoring & Logging                                                 │
│  P0.12 Example Scenarios                                                    │
│  P0.13 Testing & Validation                                                 │
│  P0.14 Maintenance & Updates                                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Section Specifications

#### P0.1 Agent Identity & Role

```yaml
P0.1_Agent_Identity:
  agent_id: "[PF-Instance]-[cluster]-[function]-agent"
  agent_name: "[Human-readable name]"
  version: "x.y.z"
  
  classification:
    tier: "orchestrator|primary|sub-agent|specialist"
    cluster: "discovery|analysis|generation|optimization"
    scope: "[PF-Core]|[PF-Instance]|[Product/Service]"
  
  role_definition:
    primary_role: "[Single sentence role description]"
    authority_boundaries: "[What this agent can/cannot do]"
    escalation_path: "[When to escalate and to whom]"
  
  business_framework_alignment:
    primary_layer: "[Layer 1-8 from W4M framework]"
    secondary_layers: ["[Other layers touched]"]
    ontology_access: ["[Ontology-Core]", "[Ontology-Instance]"]
  
  persona:
    communication_style: "[Professional|Technical|Friendly|etc]"
    expertise_level: "[Expert|Advanced|Intermediate]"
    decision_approach: "[Conservative|Balanced|Aggressive]"
```

#### P0.2 Core Objectives

```yaml
P0.2_Core_Objectives:
  primary_objective:
    statement: "[What this agent must achieve]"
    success_criteria: "[How success is measured]"
    business_value: "[Impact on [PF-Instance] goals]"
  
  secondary_objectives:
    - objective: "[Secondary goal]"
      priority: "high|medium|low"
      dependency: "[Dependent on what]"
  
  constraints:
    must_not: ["[Hard constraints - never do]"]
    should_avoid: ["[Soft constraints - minimize]"]
  
  okr_alignment:
    linked_objective: "[From VSOM Layer 8]"
    key_result_contribution: "[How agent contributes]"
  
  value_engineering_alignment:
    addressed_pain_points: ["[From Layer 1]"]
    value_delivered: "[From Layer 4]"
```

#### P0.3 Input Processing

```yaml
P0.3_Input_Processing:
  input_sources:
    - source: "[Input type]"
      format: "json|text|file|api"
      validation: "[Required validation]"
      schema_reference: "[Ontology-Core|Ontology-Instance]"
  
  context_requirements:
    strategic_context:
      required: true
      source: "[VSOM module]"
      token_budget: 250
    domain_context:
      required: true
      source: "[OAA Context Provider]"
      ontologies: ["[Required ontologies]"]
      token_budget: 500
    operational_context:
      required: true
      source: "[Session/Task state]"
      token_budget: 250
  
  preprocessing:
    - step: "[Preprocessing step]"
      purpose: "[Why needed]"
      failure_action: "[If step fails]"
  
  input_validation:
    schema_validation: true
    business_rules: ["[Instance-specific rules]"]
    rejection_criteria: ["[When to reject input]"]
```

#### P0.4 Decision Framework

```yaml
P0.4_Decision_Framework:
  decision_model:
    type: "rules_based|ml_assisted|hybrid"
    primary_criteria: ["[Decision factors in priority order]"]
    weighting: "[How factors are weighted]"
  
  business_framework_integration:
    layer_1_problem: "[How problem space informs decisions]"
    layer_2_icp: "[How ICP context shapes decisions]"
    layer_3_solution: "[How solution capabilities constrain options]"
    layer_4_value: "[How value prop guides recommendations]"
    layer_5_business_model: "[Economic constraints]"
    layer_6_competitive: "[Competitive considerations]"
    layer_7_market: "[Market context]"
    layer_8_strategy: "[Strategic alignment check]"
  
  decision_points:
    - decision: "[Decision name]"
      options: ["[Available options]"]
      selection_logic: "[How option is selected]"
      confidence_threshold: 0.85
      human_escalation_trigger: "[When to escalate]"
  
  reasoning_transparency:
    explanation_required: true
    explanation_format: "[PF-Instance]-specific format"
    audit_trail: true
```

#### P0.5 Tools & Capabilities

```yaml
P0.5_Tools_Capabilities:
  core_tools:  # [PF-Core] tools available to all agents
    - tool_id: "pf-core:file_operations"
      purpose: "[Purpose]"
      aci_compliance: true
    - tool_id: "pf-core:database_access"
      purpose: "[Purpose]"
      aci_compliance: true
  
  instance_tools:  # [PF-Instance] specific tools
    - tool_id: "[PF-Instance]:tool_name"
      purpose: "[Instance-specific purpose]"
      aci_compliance: true
      poka_yoke_patterns: ["[Error prevention measures]"]
  
  product_tools:  # [Product/Service] specific tools
    - tool_id: "[Product/Service]:tool_name"
      purpose: "[Product-specific purpose]"
      aci_compliance: true
  
  mcp_integrations:
    - server: "[MCP server name]"
      tools: ["[Available tools]"]
      authentication: "[Auth method]"
  
  tool_selection_logic:
    routing_rules: "[How tools are selected]"
    fallback_chain: ["[Tool fallback order]"]
  
  capability_boundaries:
    can_do: ["[Explicit capabilities]"]
    cannot_do: ["[Explicit limitations]"]
    requires_approval: ["[Capabilities needing human approval]"]
```

#### P0.6 Output Specifications

```yaml
P0.6_Output_Specifications:
  output_types:
    - type: "[Output type name]"
      format: "json-ld|markdown|structured|file"
      schema: "[Ontology reference]"
      destination: "[Where output goes]"
  
  schema_compliance:
    base_vocabulary: "https://schema.org/"
    instance_namespace: "[PF-Instance] namespace"
    validation_required: true
    alignment_threshold: 0.85
  
  quality_standards:
    accuracy_requirement: "[Accuracy expectation]"
    completeness_check: ["[Required fields]"]
    consistency_validation: "[Cross-reference checks]"
  
  formatting_rules:
    - rule: "[Formatting requirement]"
      rationale: "[Why this rule]"
      enforcement: "strict|recommended"
  
  delivery_method:
    synchronous: "[When to deliver immediately]"
    asynchronous: "[When to queue]"
    notification_triggers: ["[When to notify]"]
```

#### P0.7 Error Handling

```yaml
P0.7_Error_Handling:
  error_categories:
    - category: "input_validation"
      handling: "[How to handle]"
      recovery: "[Recovery steps]"
      escalation: "[When to escalate]"
    - category: "tool_failure"
      handling: "[How to handle]"
      recovery: "[Recovery steps]"
      escalation: "[When to escalate]"
    - category: "business_rule_violation"
      handling: "[How to handle]"
      recovery: "[Recovery steps]"
      escalation: "[When to escalate]"
    - category: "external_dependency"
      handling: "[How to handle]"
      recovery: "[Recovery steps]"
      escalation: "[When to escalate]"
  
  retry_policies:
    max_retries: 3
    backoff_strategy: "exponential"
    circuit_breaker: true
  
  graceful_degradation:
    fallback_behaviors: ["[Degraded modes]"]
    user_communication: "[How to inform user]"
  
  error_reporting:
    log_level: "error|warning|info"
    include_context: true
    pii_scrubbing: true
```

#### P0.8 Context & Memory Management

```yaml
P0.8_Context_Memory:
  context_architecture:
    total_budget: 4000  # tokens
    strategic_layer:
      budget: 1000
      sources: ["[VSOM]", "[OKR]"]
      refresh_frequency: "session_start"
    domain_layer:
      budget: 2000
      sources: ["[OAA Context Provider]"]
      ontologies: ["[Required ontologies]"]
      refresh_frequency: "on_demand"
    operational_layer:
      budget: 1000
      sources: ["[Task state]", "[Session history]"]
      refresh_frequency: "continuous"
  
  memory_patterns:
    session_memory:
      enabled: true
      scope: "[What to remember in session]"
    persistent_memory:
      enabled: "[true|false based on agent type]"
      storage: "[Supabase JSONB]"
    compaction_strategy:
      trigger: "token_threshold|turn_count"
      threshold: 0.8
      preservation_priority: ["[What to keep]"]
  
  long_running_agent:
    initializer_pattern: "[If applicable]"
    working_agent_pattern: "[If applicable]"
    progress_file: "[PF-Instance]-progress.json"
    features_file: "[PF-Instance]-features.json"
```

#### P0.9 Compliance & Constraints

```yaml
P0.9_Compliance_Constraints:
  regulatory_compliance:
    - framework: "[GDPR|SOC2|HIPAA|etc]"
      requirements: ["[Specific requirements]"]
      implementation: "[How addressed]"
  
  data_governance:
    pii_handling: "[PII rules]"
    data_retention: "[Retention policy]"
    data_residency: "[Geographic constraints]"
    encryption_requirements: "[Encryption standards]"
  
  ethical_constraints:
    bias_mitigation: ["[How bias is addressed]"]
    fairness_criteria: ["[Fairness requirements]"]
    transparency_requirements: ["[Explainability rules]"]
  
  business_constraints:
    rate_limits: "[API/processing limits]"
    cost_controls: "[Budget constraints]"
    sla_requirements: "[Performance SLAs]"
  
  instance_specific_constraints:
    "[PF-Instance]_rules": ["[Instance-specific rules]"]
```

#### P0.10 Integration Points

```yaml
P0.10_Integration_Points:
  upstream_agents:
    - agent_id: "[Agent that calls this one]"
      interaction_pattern: "orchestration|delegation|collaboration"
      data_exchange_format: "[Format]"
  
  downstream_agents:
    - agent_id: "[Agent this one calls]"
      interaction_pattern: "orchestration|delegation|collaboration"
      data_exchange_format: "[Format]"
  
  external_systems:
    - system: "[External system name]"
      integration_type: "api|mcp|webhook|database"
      authentication: "[Auth method]"
      error_handling: "[Error approach]"
  
  oaa_integration:
    ontology_access: ["[Ontologies accessed via OAA]"]
    access_pattern: "[Read|Write|Both]"
    scope: "[Global|Tenant|Process|Task]"
  
  event_bus:
    publishes: ["[Events published]"]
    subscribes: ["[Events consumed]"]
```

#### P0.11 Monitoring & Logging

```yaml
P0.11_Monitoring_Logging:
  metrics:
    - metric: "execution_time"
      type: "histogram"
      labels: ["[Dimension labels]"]
    - metric: "success_rate"
      type: "counter"
      labels: ["[Dimension labels]"]
    - metric: "token_usage"
      type: "gauge"
      labels: ["[Dimension labels]"]
    - metric: "error_rate"
      type: "counter"
      labels: ["[Dimension labels]"]
  
  logging:
    levels: ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
    structured_format: true
    correlation_id: true
    instance_tags: ["[PF-Instance]", "[Product/Service]"]
  
  alerting:
    - condition: "[Alert condition]"
      threshold: "[Threshold value]"
      notification: "[Notification channel]"
  
  audit_trail:
    enabled: true
    events: ["[Events to audit]"]
    retention: "[Retention period]"
    storage: "[Supabase table]"
```

#### P0.12 Example Scenarios

```yaml
P0.12_Example_Scenarios:
  happy_path:
    - scenario: "[Scenario name]"
      input: "[Example input]"
      expected_output: "[Expected output]"
      business_context: "[Which layers engaged]"
  
  edge_cases:
    - scenario: "[Edge case name]"
      input: "[Edge case input]"
      expected_handling: "[How agent handles]"
      business_context: "[Relevant layers]"
  
  error_scenarios:
    - scenario: "[Error scenario name]"
      trigger: "[What causes error]"
      expected_handling: "[How handled]"
      recovery: "[Recovery outcome]"
  
  instance_specific_scenarios:  # [PF-Instance] specific
    - scenario: "[Instance-specific scenario]"
      context: "[PF-Instance] context"
      input: "[Example input]"
      expected_output: "[Expected output]"
```

#### P0.13 Testing & Validation

```yaml
P0.13_Testing_Validation:
  test_coverage_targets:
    unit_tests: 80
    integration_tests: 70
    e2e_tests: 60
  
  test_categories:
    - category: "input_validation"
      test_count: "[Number of tests]"
      coverage: "[Coverage %]"
    - category: "business_logic"
      test_count: "[Number of tests]"
      coverage: "[Coverage %]"
    - category: "output_validation"
      test_count: "[Number of tests]"
      coverage: "[Coverage %]"
    - category: "error_handling"
      test_count: "[Number of tests]"
      coverage: "[Coverage %]"
    - category: "integration"
      test_count: "[Number of tests]"
      coverage: "[Coverage %]"
  
  evaluation_framework:
    eval_datasets: ["[PF-Instance]-eval-dataset"]
    accuracy_metrics: ["[Metrics used]"]
    baseline_threshold: "[Minimum acceptable]"
  
  verification_approach:
    primary: "rules_based"  # Preferred per Anthropic
    secondary: "visual_verification"  # For UI outputs
    tertiary: "llm_as_judge"  # Use sparingly
  
  tdd_compliance:
    red_green_refactor: true
    test_first: true
    coverage_gates: true
```

#### P0.14 Maintenance & Updates

```yaml
P0.14_Maintenance_Updates:
  versioning:
    scheme: "semantic"
    breaking_change_policy: "[How breaking changes handled]"
    deprecation_policy: "[How deprecation communicated]"
  
  update_procedures:
    - type: "ontology_update"
      procedure: "[How ontology updates propagate]"
      testing_required: "[Required tests]"
    - type: "tool_update"
      procedure: "[How tool updates handled]"
      testing_required: "[Required tests]"
    - type: "business_logic_update"
      procedure: "[How logic updates handled]"
      testing_required: "[Required tests]"
  
  rollback_procedures:
    trigger_conditions: ["[When to rollback]"]
    rollback_steps: ["[Rollback procedure]"]
    verification: "[How to verify rollback]"
  
  documentation_requirements:
    changelog: true
    migration_guides: "[For breaking changes]"
    api_documentation: "[OpenAPI spec]"
  
  health_checks:
    frequency: "[How often]"
    checks: ["[What to check]"]
    alerting: "[Alert on failure]"
```

---

## PART 3: ONTOLOGY LAYER ARCHITECTURE

### 3.1 PF-Core vs PF-Instance Ontologies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ONTOLOGY LAYER ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [PF-Core] TRANSFERABLE ONTOLOGIES                                          │
│  ─────────────────────────────────                                          │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  pf:vsom-ontology          Vision, Strategy, Objectives, Metrics       │ │
│  │  pf:okr-ontology           Objectives & Key Results                    │ │
│  │  pf:tenant-ontology        Multi-tenant management                     │ │
│  │  pf:user-ontology          User & role management                      │ │
│  │  pf:audit-ontology         Audit trail & compliance                    │ │
│  │  pf:agent-ontology         Agent definitions & capabilities            │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [PF-Instance] INSTANCE-SPECIFIC ONTOLOGIES                                 │
│  ──────────────────────────────────────────                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  [PF-Instance]:problem-ontology      Layer 1: Problem Space            │ │
│  │  [PF-Instance]:icp-ontology          Layer 2: ICP Definition           │ │
│  │  [PF-Instance]:solution-ontology     Layer 3: Solution Capabilities    │ │
│  │  [PF-Instance]:value-ontology        Layer 4: Value Proposition        │ │
│  │  [PF-Instance]:business-ontology     Layer 5: Business Model           │ │
│  │  [PF-Instance]:competitive-ontology  Layer 6: Competitive Analysis     │ │
│  │  [PF-Instance]:market-ontology       Layer 7: Market Analysis          │ │
│  │  [PF-Instance]:domain-ontology       Domain-specific entities          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  EXAMPLE: BAIV Instance Ontologies                                          │
│  ─────────────────────────────────                                          │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  baiv:ai-visibility-ontology         AI platform citation analysis     │ │
│  │  baiv:universal-brand-ontology       Discovery pathway mapping         │ │
│  │  baiv:customer-org-ontology          Customer profiling                │ │
│  │  baiv:gap-analysis-ontology          Gap identification & prioritization│ │
│  │  baiv:cmo-okr-ontology              Marketing OKR specialization       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  EXAMPLE: AIR Instance Ontologies (TBD)                                     │
│  ─────────────────────────────────────                                      │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  air:strategy-ontology               AI strategy frameworks            │ │
│  │  air:capability-ontology             AI capability assessment          │ │
│  │  air:roadmap-ontology                AI implementation roadmaps        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 OAA Registry Parameterized Structure

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platform-foundation.ai/ontology/",
    "[PF-Instance]": "https://[PF-Instance].ai/ontology/"
  },
  "@type": "pf:OntologyRegistry",
  "@id": "pf:oaa-registry:v3.0.0",
  "name": "OAA Registry",
  "version": "3.0.0",
  
  "coreOntologies": {
    "namespace": "pf",
    "transferable": true,
    "ontologies": [
      {"id": "pf:vsom", "layer": "strategy", "status": "active"},
      {"id": "pf:okr", "layer": "strategy", "status": "active"},
      {"id": "pf:tenant", "layer": "infrastructure", "status": "active"},
      {"id": "pf:user", "layer": "infrastructure", "status": "active"},
      {"id": "pf:audit", "layer": "governance", "status": "active"},
      {"id": "pf:agent", "layer": "platform", "status": "active"}
    ]
  },
  
  "instanceOntologies": {
    "namespace": "[PF-Instance]",
    "transferable": false,
    "ontologies": [
      {"id": "[PF-Instance]:problem", "w4mLayer": 1, "status": "active"},
      {"id": "[PF-Instance]:icp", "w4mLayer": 2, "status": "active"},
      {"id": "[PF-Instance]:solution", "w4mLayer": 3, "status": "active"},
      {"id": "[PF-Instance]:value", "w4mLayer": 4, "status": "active"},
      {"id": "[PF-Instance]:business", "w4mLayer": 5, "status": "active"},
      {"id": "[PF-Instance]:competitive", "w4mLayer": 6, "status": "active"},
      {"id": "[PF-Instance]:market", "w4mLayer": 7, "status": "active"},
      {"id": "[PF-Instance]:domain", "w4mLayer": "domain", "status": "active"}
    ]
  },
  
  "accessControl": {
    "byAgentScope": {
      "[PF-Core]": ["pf:*"],
      "[PF-Instance]": ["pf:*", "[PF-Instance]:*"],
      "[Product/Service]": ["pf:*", "[PF-Instance]:*", "[Product/Service]:*"]
    }
  }
}
```

---

## PART 4: AGENT CLUSTER ARCHITECTURE (PARAMETERIZED)

### 4.1 Cluster Organization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   AGENT CLUSTER ARCHITECTURE                                 │
│                   [PF-Instance] Parameterized                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ORCHESTRATOR TIER                                                          │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  [PF-Instance]-master-reasoning-agent                                  │ │
│  │  • P0.1-P0.14 compliant                                                │ │
│  │  • 8-layer business framework integration                              │ │
│  │  • Full ontology access via OAA                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                          │                                                   │
│         ┌────────────────┼────────────────┬────────────────┐                │
│         ▼                ▼                ▼                ▼                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ DISCOVERY   │  │ ANALYSIS    │  │ GENERATION  │  │ OPTIMIZATION│        │
│  │ CLUSTER     │  │ CLUSTER     │  │ CLUSTER     │  │ CLUSTER     │        │
│  │             │  │             │  │             │  │             │        │
│  │ W4M Layers: │  │ W4M Layers: │  │ W4M Layers: │  │ W4M Layers: │        │
│  │ 1,2,7       │  │ 3,4,5,6     │  │ All         │  │ 4,5,6,8     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Agent ID Naming Convention

```
[PF-Instance]-[cluster]-[function]-agent

Examples:
- baiv-discovery-icp-analysis-agent
- baiv-analysis-gap-diagnosis-agent
- baiv-generation-content-strategy-agent
- baiv-optimization-performance-monitor-agent
- air-discovery-capability-assessment-agent
- w4m-generation-value-engineering-agent
```

---

## PART 5: CONTEXT ENGINEERING (PARAMETERIZED)

### 5.1 Three-Layer Context Architecture

```yaml
context_architecture:
  total_budget: 4000  # tokens
  
  layer_1_strategic:  # [PF-Core]
    budget: 1000
    sources:
      - "[PF-Core]:vsom"
      - "[PF-Core]:okr"
    content:
      vision: "[From VSOM Layer 8]"
      objectives: "[Current strategic objectives]"
      constraints: "[Strategic constraints]"
    refresh: "session_start"
  
  layer_2_domain:  # [PF-Instance]
    budget: 2000
    sources:
      - "[PF-Instance]:domain-ontology"
      - "[PF-Instance]:w4m-layers-1-7"
    content:
      problem_context: "[From Layer 1]"
      icp_context: "[From Layer 2]"
      solution_context: "[From Layer 3]"
      value_context: "[From Layer 4]"
      business_context: "[From Layer 5]"
      competitive_context: "[From Layer 6]"
      market_context: "[From Layer 7]"
    refresh: "on_demand"
    oaa_provider: true
  
  layer_3_operational:  # [Product/Service]
    budget: 1000
    sources:
      - "[Product/Service]:task-state"
      - "[Product/Service]:session-history"
    content:
      current_task: "[Active task parameters]"
      session_state: "[Conversation history summary]"
      active_entities: "[Entities being worked on]"
    refresh: "continuous"
```

### 5.2 Context Injection Template

```xml
<agent_context instance="[PF-Instance]" product="[Product/Service]">
  
  <!-- LAYER 1: Strategic Context [PF-Core] (25% budget) -->
  <strategic_context source="pf:vsom">
    <vision>[Vision statement from VSOM]</vision>
    <mission>[Mission statement from VSOM]</mission>
    <strategic_objectives>
      <objective perspective="[BSC perspective]">[Objective]</objective>
    </strategic_objectives>
    <current_okrs>[Relevant OKRs for this process]</current_okrs>
  </strategic_context>
  
  <!-- LAYER 2: Domain Context [PF-Instance] (50% budget) -->
  <domain_context source="oaa:[PF-Instance]">
    
    <!-- W4M 8-Layer Business Framework Context -->
    <business_framework_context>
      <layer_1_problem>[Relevant problem space data]</layer_1_problem>
      <layer_2_icp>[Relevant ICP data]</layer_2_icp>
      <layer_3_solution>[Relevant solution capabilities]</layer_3_solution>
      <layer_4_value>[Relevant value propositions]</layer_4_value>
      <layer_5_business>[Relevant business model data]</layer_5_business>
      <layer_6_competitive>[Relevant competitive data]</layer_6_competitive>
      <layer_7_market>[Relevant market data]</layer_7_market>
    </business_framework_context>
    
    <!-- Instance-Specific Domain Ontologies -->
    <instance_ontologies>
      <ontology id="[PF-Instance]:domain-ontology">
        [Relevant domain entities]
      </ontology>
    </instance_ontologies>
    
  </domain_context>
  
  <!-- LAYER 3: Operational Context [Product/Service] (25% budget) -->
  <operational_context source="[Product/Service]:session">
    <current_task>[Task parameters and state]</current_task>
    <session_history>[Summarized conversation history]</session_history>
    <active_entities>[Entities currently being processed]</active_entities>
    <tenant_context tenant_id="[Tenant-ID]">
      [Tenant-specific context]
    </tenant_context>
  </operational_context>
  
</agent_context>
```

---

## PART 6: TESTING & EVALUATION FRAMEWORK (PARAMETERIZED)

### 6.1 Test Data Organization

```
/tests/
├── [PF-Core]/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── [PF-Instance]/           # e.g., baiv/, air/, w4m/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── eval/
│       ├── datasets/
│       │   ├── [Product/Service]-eval-v1.json
│       │   └── [Product/Service]-golden-v1.json
│       └── scenarios/
│           └── [Product/Service]-scenarios.yaml
└── fixtures/
    ├── [PF-Instance]-fixtures.json
    └── [Product/Service]-fixtures.json
```

### 6.2 Evaluation Dataset Structure

```json
{
  "@context": "https://schema.org/",
  "@type": "pf:EvaluationDataset",
  "instance": "[PF-Instance]",
  "product": "[Product/Service]",
  "version": "1.0.0",
  
  "testCases": [
    {
      "id": "[PF-Instance]-EVAL-001",
      "category": "[Test category]",
      "w4mLayersCovered": [1, 2, 4],
      "input": {
        "description": "[Test input description]",
        "data": {}
      },
      "expectedOutput": {
        "description": "[Expected output description]",
        "data": {},
        "validationRules": ["[Validation rules]"]
      },
      "tags": ["[PF-Instance]", "[Product/Service]", "[category]"]
    }
  ]
}
```

---

## PART 7: REFERENCE IMPLEMENTATION - MASTER REASONING AGENT

### 7.1 Template: `[PF-Instance]-master-reasoning-agent`

```yaml
# ============================================================================
# P0: [PF-Instance] MASTER REASONING AGENT
# ============================================================================
# This is the TEMPLATE for master reasoning agents.
# Replace [PF-Instance] and [Product/Service] with specific values.
# ============================================================================

P0.1_Agent_Identity:
  agent_id: "[PF-Instance]-master-reasoning-agent"
  agent_name: "[PF-Instance] Master Reasoning Agent"
  version: "1.0.0"
  
  classification:
    tier: "orchestrator"
    cluster: "orchestration"
    scope: "[PF-Instance]"
  
  role_definition:
    primary_role: >
      Orchestrate all [PF-Instance] agent activities, ensuring alignment with
      the 8-layer W4M business framework and [PF-Core] strategic objectives.
    authority_boundaries: >
      Can invoke any [PF-Instance] agent. Cannot modify [PF-Core] configurations.
      Must escalate decisions outside defined confidence thresholds.
    escalation_path: "Human operator via notification system"
  
  business_framework_alignment:
    primary_layer: "Layer 8 - Strategy (VSOM)"
    secondary_layers: ["All layers 1-7"]
    ontology_access:
      core: ["pf:vsom", "pf:okr", "pf:tenant", "pf:agent"]
      instance: ["[PF-Instance]:*"]
  
  persona:
    communication_style: "Professional, strategic, clear"
    expertise_level: "Expert"
    decision_approach: "Balanced with strategic bias"

P0.2_Core_Objectives:
  primary_objective:
    statement: >
      Maximize [PF-Instance] value delivery by orchestrating agents to address
      customer problems (Layer 1), serve ICP needs (Layer 2), deliver solutions
      (Layer 3), and demonstrate value (Layer 4) within business model constraints
      (Layer 5), competitive context (Layer 6), market realities (Layer 7), and
      strategic alignment (Layer 8).
    success_criteria:
      - "Customer satisfaction >= 4.5/5"
      - "Agent task completion >= 95%"
      - "Strategic alignment score >= 85%"
      - "Value delivery metrics on track"
    business_value: "Unified orchestration ensuring [PF-Instance] objectives achieved"
  
  secondary_objectives:
    - objective: "Optimize token efficiency across agent calls"
      priority: "high"
    - objective: "Maintain audit trail for all decisions"
      priority: "high"
    - objective: "Continuous learning from outcomes"
      priority: "medium"
  
  constraints:
    must_not:
      - "Bypass security or compliance controls"
      - "Make decisions outside defined authority"
      - "Ignore 8-layer business framework alignment"
    should_avoid:
      - "Unnecessary agent invocations"
      - "Redundant processing"
  
  okr_alignment:
    linked_objective: "[From [PF-Instance] VSOM]"
    key_result_contribution: "Orchestration efficiency and outcome quality"

P0.3_Input_Processing:
  input_sources:
    - source: "User request"
      format: "text|structured"
      validation: "Intent classification, entity extraction"
    - source: "System event"
      format: "json"
      validation: "Schema validation"
    - source: "Agent callback"
      format: "json"
      validation: "Response schema validation"
  
  context_requirements:
    strategic_context:
      required: true
      source: "[PF-Core]:vsom"
      token_budget: 500
    domain_context:
      required: true
      source: "OAA:[PF-Instance]"
      ontologies: ["All [PF-Instance] ontologies"]
      token_budget: 1500
    operational_context:
      required: true
      source: "[Product/Service]:session"
      token_budget: 500
  
  preprocessing:
    - step: "Intent classification"
      purpose: "Route to appropriate cluster"
    - step: "Entity extraction"
      purpose: "Identify relevant business entities"
    - step: "W4M layer mapping"
      purpose: "Determine which business layers are engaged"

P0.4_Decision_Framework:
  decision_model:
    type: "hybrid"
    primary_criteria:
      - "Strategic alignment (Layer 8)"
      - "Value delivery potential (Layer 4)"
      - "ICP relevance (Layer 2)"
      - "Solution capability match (Layer 3)"
      - "Business model viability (Layer 5)"
  
  business_framework_integration:
    layer_1_problem: "Validate request addresses real customer pain"
    layer_2_icp: "Confirm request is from/for ICP segment"
    layer_3_solution: "Verify solution capabilities can address request"
    layer_4_value: "Ensure value proposition is being delivered"
    layer_5_business_model: "Check economic viability of response"
    layer_6_competitive: "Consider competitive implications"
    layer_7_market: "Account for market context"
    layer_8_strategy: "Verify strategic alignment"
  
  decision_points:
    - decision: "Agent cluster selection"
      options: ["discovery", "analysis", "generation", "optimization"]
      selection_logic: "Based on request intent and W4M layer mapping"
      confidence_threshold: 0.85
    - decision: "Specific agent selection"
      options: "[Cluster-specific agents]"
      selection_logic: "Based on task requirements and agent capabilities"
      confidence_threshold: 0.80
    - decision: "Response synthesis"
      options: ["direct response", "agent delegation", "human escalation"]
      selection_logic: "Based on complexity and confidence"
      confidence_threshold: 0.75

P0.5_Tools_Capabilities:
  core_tools:
    - tool_id: "pf-core:agent_invoke"
      purpose: "Invoke other agents in the system"
    - tool_id: "pf-core:context_retrieve"
      purpose: "Retrieve context from OAA"
    - tool_id: "pf-core:audit_log"
      purpose: "Log decisions and actions"
  
  instance_tools:
    - tool_id: "[PF-Instance]:cluster_orchestrate"
      purpose: "Orchestrate cluster-level operations"
    - tool_id: "[PF-Instance]:w4m_context_load"
      purpose: "Load 8-layer business framework context"
  
  capability_boundaries:
    can_do:
      - "Invoke any [PF-Instance] agent"
      - "Access all [PF-Instance] ontologies"
      - "Make routing decisions"
      - "Synthesize multi-agent responses"
    cannot_do:
      - "Modify [PF-Core] configurations"
      - "Access other [PF-Instance] data"
      - "Override compliance constraints"

P0.6_Output_Specifications:
  output_types:
    - type: "Orchestration decision"
      format: "json"
      schema: "pf:orchestration-decision"
    - type: "User response"
      format: "markdown"
      schema: "[PF-Instance]:response-format"
    - type: "Agent instruction"
      format: "json"
      schema: "pf:agent-instruction"
  
  schema_compliance:
    base_vocabulary: "https://schema.org/"
    instance_namespace: "[PF-Instance]"
    validation_required: true

P0.7_Error_Handling:
  error_categories:
    - category: "Agent unavailable"
      handling: "Fallback to alternative agent or graceful degradation"
      recovery: "Retry with backoff, then escalate"
    - category: "Context loading failure"
      handling: "Proceed with available context, flag limitation"
      recovery: "Retry context load, continue with degraded context"
    - category: "Decision confidence below threshold"
      handling: "Request additional input or escalate to human"
      recovery: "Gather more context, re-evaluate"
  
  graceful_degradation:
    fallback_behaviors:
      - "Single-agent mode if orchestration fails"
      - "Cached context if OAA unavailable"
      - "Human handoff if confidence too low"

P0.8_Context_Memory:
  context_architecture:
    total_budget: 4000
    strategic_layer:
      budget: 1000
      sources: ["[PF-Core]:vsom", "[PF-Core]:okr"]
    domain_layer:
      budget: 2000
      sources: ["OAA:[PF-Instance]"]
      ontologies: ["All [PF-Instance] ontologies"]
    operational_layer:
      budget: 1000
      sources: ["Session state", "Task queue"]
  
  memory_patterns:
    session_memory:
      enabled: true
      scope: "Conversation history, active entities, decisions made"
    persistent_memory:
      enabled: true
      storage: "Supabase:[PF-Instance]_orchestration_state"
  
  long_running_agent:
    initializer_pattern: "Create orchestration session, load strategic context"
    working_agent_pattern: "Process requests, maintain state, update progress"
    progress_file: "[PF-Instance]-orchestration-progress.json"

P0.9_Compliance_Constraints:
  regulatory_compliance:
    - framework: "[As applicable to PF-Instance]"
  
  data_governance:
    pii_handling: "Never log PII, use tenant isolation"
    data_retention: "Per [PF-Instance] policy"
  
  business_constraints:
    rate_limits: "Per [PF-Instance] tier"
    cost_controls: "Token budget enforcement"

P0.10_Integration_Points:
  upstream_agents: []  # Master has no upstream
  
  downstream_agents:
    - agent_id: "[PF-Instance]-discovery-*"
      interaction_pattern: "orchestration"
    - agent_id: "[PF-Instance]-analysis-*"
      interaction_pattern: "orchestration"
    - agent_id: "[PF-Instance]-generation-*"
      interaction_pattern: "orchestration"
    - agent_id: "[PF-Instance]-optimization-*"
      interaction_pattern: "orchestration"
  
  oaa_integration:
    ontology_access: ["All [PF-Instance] ontologies"]
    access_pattern: "Read"
    scope: "Process"

P0.11_Monitoring_Logging:
  metrics:
    - metric: "[PF-Instance]_orchestration_latency"
      type: "histogram"
    - metric: "[PF-Instance]_agent_invocations"
      type: "counter"
    - metric: "[PF-Instance]_decision_confidence"
      type: "gauge"
    - metric: "[PF-Instance]_w4m_layer_coverage"
      type: "gauge"
  
  logging:
    levels: ["INFO", "WARNING", "ERROR"]
    instance_tags: ["[PF-Instance]", "orchestrator"]
  
  audit_trail:
    enabled: true
    events: ["decision_made", "agent_invoked", "error_occurred", "escalation"]

P0.12_Example_Scenarios:
  happy_path:
    - scenario: "Standard [Product/Service] request"
      input: "[Example user request]"
      expected_output: "Routed to appropriate agent, synthesized response"
      business_context: "Layers 1-4 engaged"
  
  edge_cases:
    - scenario: "Request outside ICP"
      input: "[Out of ICP request]"
      expected_handling: "Graceful redirect or limitation explanation"
  
  instance_specific_scenarios:
    - scenario: "[PF-Instance]-specific scenario"
      context: "[Instance context]"
      input: "[Instance-specific input]"
      expected_output: "[Instance-specific output]"

P0.13_Testing_Validation:
  test_coverage_targets:
    unit_tests: 85
    integration_tests: 80
    e2e_tests: 70
  
  evaluation_framework:
    eval_datasets: ["[PF-Instance]-master-eval-v1"]
    accuracy_metrics: ["routing_accuracy", "response_quality", "w4m_alignment"]
    baseline_threshold: 0.85
  
  verification_approach:
    primary: "rules_based"
    secondary: "integration_tests"

P0.14_Maintenance_Updates:
  versioning:
    scheme: "semantic"
    current: "1.0.0"
  
  update_procedures:
    - type: "Agent capability update"
      procedure: "Update registry, run integration tests"
    - type: "W4M layer schema update"
      procedure: "Update context loading, run alignment tests"
  
  health_checks:
    frequency: "continuous"
    checks: ["Agent availability", "OAA connectivity", "Response latency"]
```

---

## APPENDIX A: PARAMETER SUBSTITUTION EXAMPLES

### A.1 BAIV Instance Example

| Parameter | BAIV Value |
|-----------|------------|
| `[PF-Instance]` | `baiv` |
| `[Product/Service]` | `ai-visibility-audit` |
| `[Ontology-Instance]` | `baiv:ai-visibility`, `baiv:universal-brand` |
| `[Agent-ID]` | `baiv-discovery-audit-agent` |

### A.2 AIR Instance Example

| Parameter | AIR Value |
|-----------|-----------|
| `[PF-Instance]` | `air` |
| `[Product/Service]` | `ai-strategy-consulting` |
| `[Ontology-Instance]` | `air:strategy`, `air:capability` |
| `[Agent-ID]` | `air-analysis-capability-agent` |

### A.3 W4M Instance Example

| Parameter | W4M Value |
|-----------|-----------|
| `[PF-Instance]` | `w4m` |
| `[Product/Service]` | `value-engineering-workshop` |
| `[Ontology-Instance]` | `w4m:value-engineering`, `w4m:pmf` |
| `[Agent-ID]` | `w4m-generation-value-prop-agent` |

---

## APPENDIX B: CHECKLIST FOR NEW AGENTS

### B.1 Pre-Development Checklist

- [ ] Agent ID follows naming convention: `[PF-Instance]-[cluster]-[function]-agent`
- [ ] All 14 sections (P0.1-P0.14) documented
- [ ] W4M 8-layer alignment specified
- [ ] Ontology access requirements defined (Core vs Instance)
- [ ] Context engineering budget allocated
- [ ] Integration points mapped

### B.2 Development Checklist

- [ ] Parameterized values replaced with instance specifics
- [ ] Tools implement ACI/Poka-yoke patterns
- [ ] Error handling comprehensive
- [ ] Logging and monitoring configured

### B.3 Testing Checklist

- [ ] Unit tests meet coverage target
- [ ] Integration tests with dependent agents
- [ ] E2E scenarios for [Product/Service]
- [ ] Evaluation dataset created
- [ ] W4M layer coverage validated

### B.4 Deployment Checklist

- [ ] OAA registry updated
- [ ] Agent registered in Agent Manager
- [ ] Health checks configured
- [ ] Monitoring dashboards created
- [ ] Documentation published

---

*Document Version: 2.0.0 | Framework: PF-Core v3.0 | December 2025*
