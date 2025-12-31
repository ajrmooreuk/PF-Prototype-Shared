# PF-Core Agent Specification Template v2.0

**With OAA Registry Integration & Claude Code SDK**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 2.0.0 |
| **Date** | December 2025 |
| **Format** | YAML / JSON-LD |
| **Integrates With** | Existing OAA Registry, Claude Code SDK |

---

## Overview

This template defines the standard specification format for PF-Core agents that integrate with the **existing OAA Registry**. Agent specifications are stored in the `agent_registry` table using the same JSONB pattern as ontologies.

---

## 1. JSON-LD Format (for agent_registry table)

This is the JSONB structure stored in `agent_specification` column:

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platform-foundation.io/agent/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "pf:AgentSpecification",
  "@id": "pf:agent:baiv-content-strategy-1.0",
  
  "name": "Content Strategy Agent",
  "version": "1.0.0",
  "description": "Analyzes brand positioning and generates content recommendations based on gap analysis",
  "dateCreated": "2025-12-01",
  "dateModified": "2025-12-20",
  
  "classification": {
    "agentType": "domain_specialist",
    "domain": "baiv",
    "tier": "tier2",
    "class": 3,
    "tags": ["content", "strategy", "recommendations"]
  },
  
  "ontologyBindings": {
    "consumes": [
      {
        "@ref": "baiv:ontology:ai-visibility",
        "version": ">=1.1.0",
        "nodeTypes": ["QueryCategory", "PlatformBehavior", "ContentFormat"],
        "purpose": "Understand AI platform requirements"
      },
      {
        "@ref": "baiv:ontology:gap-analysis",
        "version": ">=1.1.0",
        "nodeTypes": ["Gap", "ImprovementOpportunity"],
        "purpose": "Read identified gaps"
      }
    ],
    "produces": [
      {
        "@ref": "pf:ontology:content-recommendation",
        "version": "1.0.0",
        "nodeTypes": ["ContentRecommendation", "PriorityScore", "ContentPlan"],
        "purpose": "Generate recommendations"
      }
    ],
    "requires": [
      {
        "@ref": "pf:ontology:vsom",
        "version": ">=1.0.0",
        "nodeTypes": ["VisionStatement", "StrategicObjective"],
        "purpose": "Strategic alignment"
      }
    ]
  },
  
  "authorityBoundary": {
    "tier1Access": {
      "read": true,
      "write": false,
      "nodeTypes": ["vsom_vision", "vsom_strategy", "vsom_objective"]
    },
    "tier2Access": {
      "domains": ["baiv"],
      "read": true,
      "write": true,
      "nodeTypes": ["content_strategy", "gap_analysis", "brand_positioning"]
    },
    "tier3Access": {
      "tenantScope": "current",
      "read": true,
      "write": true,
      "nodeTypes": ["customer_brand", "content_recommendation", "priority_score"]
    },
    "allowedActions": [
      "graph_read",
      "graph_write",
      "edge_create",
      "traverse_down",
      "traverse_lateral"
    ],
    "prohibitedActions": [
      "graph_delete",
      "traverse_up",
      "export"
    ],
    "limits": {
      "maxNodesPerQuery": 200,
      "maxTraversalDepth": 4,
      "rateLimitPerMinute": 30
    }
  },
  
  "claudeConfig": {
    "model": "claude-sonnet-4-20250514",
    "maxTokens": 4096,
    "temperature": 0.7,
    "tools": [
      "read_strategic_context",
      "read_domain_graph",
      "read_tenant_graph",
      "write_tenant_node",
      "analyze_gaps"
    ]
  },
  
  "dependencies": {
    "requiredAgents": ["pf:agent:strategic-context-1.0"],
    "optionalAgents": ["pf:agent:baiv-gap-analysis-1.0"],
    "requiredTools": ["pf:tool:claude-api", "pf:tool:supabase-graph"]
  },
  
  "implementation": {
    "templateBase": "domain-agent.template.py",
    "entryPoint": "agents/baiv/content_strategy_agent.py",
    "className": "ContentStrategyAgent"
  }
}
```

---

## 2. YAML Template (Development Format)

```yaml
# ============================================================================
# PF-CORE AGENT SPECIFICATION v2.0
# Integrates with existing OAA Registry (ontologies table)
# ============================================================================

agent:
  # --------------------------------------------------------------------------
  # IDENTITY (matches ontology pattern)
  # --------------------------------------------------------------------------
  metadata:
    id: "agent-baiv-content-strategy-1.0"
    name: "Content Strategy Agent"
    description: |
      Analyzes brand positioning and gap analysis results to generate
      prioritized content recommendations aligned with strategic objectives.
    version: "1.0.0"
    
  # --------------------------------------------------------------------------
  # CLASSIFICATION
  # --------------------------------------------------------------------------
  classification:
    agentType: "domain_specialist"   # orchestrator | domain_specialist | utility | integration
    domain: "baiv"                   # pf-core | baiv | w4m | air
    tier: "tier2"                    # tier1 | tier2 | tier3
    class: 3                         # 1=orchestrator, 5=utility
    tags:
      - "content"
      - "strategy"
      - "recommendations"

  # --------------------------------------------------------------------------
  # ONTOLOGY BINDINGS (Links to existing ontologies table)
  # --------------------------------------------------------------------------
  ontologyBindings:
    # Ontologies this agent READS from
    consumes:
      - ref: "baiv:ontology:ai-visibility"
        version: ">=1.1.0"
        nodeTypes:
          - "QueryCategory"
          - "PlatformBehavior"
          - "ContentFormat"
        purpose: "Understand AI platform requirements"
      
      - ref: "baiv:ontology:gap-analysis"
        version: ">=1.1.0"
        nodeTypes:
          - "Gap"
          - "ImprovementOpportunity"
        purpose: "Read identified gaps"
    
    # Ontologies this agent WRITES to (must validate against)
    produces:
      - ref: "pf:ontology:content-recommendation"
        version: "1.0.0"
        nodeTypes:
          - "ContentRecommendation"
          - "PriorityScore"
          - "ContentPlan"
        purpose: "Generate validated content recommendations"
    
    # Ontologies for CONTEXT (read-only strategic)
    requires:
      - ref: "pf:ontology:vsom"
        version: ">=1.0.0"
        nodeTypes:
          - "VisionStatement"
          - "StrategicObjective"
          - "Metric"
        purpose: "Strategic alignment context"

  # --------------------------------------------------------------------------
  # AUTHORITY BOUNDARY
  # --------------------------------------------------------------------------
  authority:
    tier1:
      read: true
      write: false
      nodeTypes:
        - "vsom_vision"
        - "vsom_strategy"
        - "vsom_objective"
    
    tier2:
      domains:
        - "baiv"
      read: true
      write: true
      nodeTypes:
        - "content_strategy"
        - "gap_analysis"
        - "brand_positioning"
    
    tier3:
      tenantScope: "current"
      read: true
      write: true
      nodeTypes:
        - "customer_brand"
        - "content_recommendation"
        - "priority_score"
    
    actions:
      allowed:
        - "graph_read"
        - "graph_write"
        - "edge_create"
        - "traverse_down"
        - "traverse_lateral"
      prohibited:
        - "graph_delete"
        - "traverse_up"
        - "export"
    
    limits:
      maxNodesPerQuery: 200
      maxTraversalDepth: 4
      rateLimitPerMinute: 30

  # --------------------------------------------------------------------------
  # CLAUDE CODE SDK CONFIGURATION
  # --------------------------------------------------------------------------
  claudeConfig:
    model: "claude-sonnet-4-20250514"
    maxTokens: 4096
    temperature: 0.7
    
    tools:
      - name: "read_strategic_context"
        description: "Read VSOM strategic context from Tier 1"
      - name: "read_domain_graph"
        description: "Read from BAIV Tier 2 domain graph"
      - name: "write_tenant_node"
        description: "Write validated node to Tier 3"
      - name: "analyze_gaps"
        description: "Analyze gaps from gap analysis ontology"

  # --------------------------------------------------------------------------
  # DEPENDENCIES
  # --------------------------------------------------------------------------
  dependencies:
    requiredAgents:
      - "agent-pf-strategic-context-1.0"
    optionalAgents:
      - "agent-baiv-gap-analysis-1.0"
    requiredTools:
      - "tool-claude-api"
      - "tool-supabase-graph"

  # --------------------------------------------------------------------------
  # IMPLEMENTATION
  # --------------------------------------------------------------------------
  implementation:
    templateBase: "domain-agent.template.py"
    entryPoint: "agents/baiv/content_strategy_agent.py"
    className: "ContentStrategyAgent"

  # --------------------------------------------------------------------------
  # TESTING
  # --------------------------------------------------------------------------
  testing:
    requiredCoverage: 85
    testSuites:
      - "unit"
      - "integration"
      - "authority"
      - "tenant_isolation"
      - "ontology_validation"
    performanceTargets:
      maxResponseTimeMs: 5000
      maxMemoryMb: 1024

  # --------------------------------------------------------------------------
  # LIFECYCLE
  # --------------------------------------------------------------------------
  lifecycle:
    status: "active"
    owner: "baiv-platform-team"
```

---

## 3. Database Records

### 3.1 agent_registry Table Insert

```sql
INSERT INTO agent_registry (
    agent_id,
    name,
    version,
    description,
    agent_type,
    domain,
    tier,
    agent_specification,
    authority_boundary,
    claude_config,
    status
) VALUES (
    'agent-baiv-content-strategy-1.0',
    'Content Strategy Agent',
    '1.0.0',
    'Analyzes brand positioning and generates content recommendations',
    'domain_specialist',
    'baiv',
    'tier2',
    '{...full JSON-LD spec...}'::jsonb,
    '{...authority boundary...}'::jsonb,
    '{...claude config...}'::jsonb,
    'active'
);
```

### 3.2 agent_ontology_bindings Records

```sql
-- CONSUMES: ai-visibility
INSERT INTO agent_ontology_bindings (agent_id, ontology_id, binding_type, node_types, purpose)
SELECT 
    ar.id,
    o.id,
    'consumes',
    ARRAY['QueryCategory', 'PlatformBehavior', 'ContentFormat'],
    'Understand AI platform requirements'
FROM agent_registry ar, ontologies o
WHERE ar.agent_id = 'agent-baiv-content-strategy-1.0'
AND o.entry_id = 'baiv:ontology:ai-visibility';

-- CONSUMES: gap-analysis
INSERT INTO agent_ontology_bindings (agent_id, ontology_id, binding_type, node_types, purpose)
SELECT 
    ar.id,
    o.id,
    'consumes',
    ARRAY['Gap', 'ImprovementOpportunity'],
    'Read identified gaps'
FROM agent_registry ar, ontologies o
WHERE ar.agent_id = 'agent-baiv-content-strategy-1.0'
AND o.entry_id = 'baiv:ontology:gap-analysis';

-- PRODUCES: content-recommendation
INSERT INTO agent_ontology_bindings (agent_id, ontology_id, binding_type, node_types, purpose)
SELECT 
    ar.id,
    o.id,
    'produces',
    ARRAY['ContentRecommendation', 'PriorityScore', 'ContentPlan'],
    'Generate validated recommendations'
FROM agent_registry ar, ontologies o
WHERE ar.agent_id = 'agent-baiv-content-strategy-1.0'
AND o.entry_id = 'pf:ontology:content-recommendation';

-- REQUIRES: vsom
INSERT INTO agent_ontology_bindings (agent_id, ontology_id, binding_type, node_types, purpose)
SELECT 
    ar.id,
    o.id,
    'requires',
    ARRAY['VisionStatement', 'StrategicObjective', 'Metric'],
    'Strategic alignment context'
FROM agent_registry ar, ontologies o
WHERE ar.agent_id = 'agent-baiv-content-strategy-1.0'
AND o.entry_id = 'pf:ontology:vsom';
```

---

## 4. Agent Catalog

### 4.1 Platform Agents (pf-core, Tier 1)

| Agent ID | Type | Consumes | Produces |
|----------|------|----------|----------|
| `agent-pf-master-orchestrator-1.0` | orchestrator | all domain ontologies | orchestration-plan |
| `agent-pf-strategic-context-1.0` | domain_specialist | vsom | strategic-context |
| `agent-pf-health-monitor-1.0` | utility | all metrics | health-report |

### 4.2 BAIV Agents (Tier 2)

| Agent ID | Type | Consumes | Produces |
|----------|------|----------|----------|
| `agent-baiv-content-strategy-1.0` | domain_specialist | ai-visibility, gap-analysis | content-recommendation |
| `agent-baiv-visibility-analysis-1.0` | domain_specialist | customer-org | ai-visibility |
| `agent-baiv-gap-analysis-1.0` | domain_specialist | ai-visibility, universal-brand | gap-analysis |
| `agent-baiv-report-generator-1.0` | utility | all baiv ontologies | visibility-report |
| `agent-baiv-citation-architect-1.0` | domain_specialist | ai-visibility | citation-strategy |

### 4.3 W4M Agents (Tier 2)

| Agent ID | Type | Consumes | Produces |
|----------|------|----------|----------|
| `agent-w4m-value-engineering-1.0` | domain_specialist | vsom, business-case | value-analysis |
| `agent-w4m-program-manager-1.0` | orchestrator | value-analysis | work-breakdown |
| `agent-w4m-roi-tracking-1.0` | utility | value-analysis | roi-metrics |

### 4.4 AIR Agents (Tier 2)

| Agent ID | Type | Consumes | Produces |
|----------|------|----------|----------|
| `agent-air-ai-strategy-1.0` | domain_specialist | vsom, maturity-model | ai-strategy |
| `agent-air-maturity-assessment-1.0` | domain_specialist | customer-org | maturity-model |
| `agent-air-innovation-1.0` | domain_specialist | ai-strategy | innovation-roadmap |

---

## 5. Validation Rules

### 5.1 Required Fields

- [ ] `agent_id` - Pattern: `agent-{domain}-{function}-{version}`
- [ ] `name` - Human-readable display name
- [ ] `version` - Semantic versioning (MAJOR.MINOR.PATCH)
- [ ] `agent_type` - One of: orchestrator, domain_specialist, utility, integration
- [ ] `domain` - One of: pf-core, baiv, w4m, air
- [ ] `tier` - One of: tier1, tier2, tier3
- [ ] `ontologyBindings` - At least one consumes or produces binding
- [ ] `authorityBoundary` - Complete tier access definitions
- [ ] `claudeConfig` - Model and token configuration

### 5.2 Ontology Binding Validation

- [ ] All `@ref` ontologies exist in `ontologies` table
- [ ] All `nodeTypes` exist as entities in referenced ontology
- [ ] Version constraints use valid semver format (>=, ~, ^)
- [ ] PRODUCES bindings have corresponding validation rules

### 5.3 Authority Validation

- [ ] tier2.domains matches agent domain
- [ ] No overlapping allowed/prohibited actions
- [ ] Limits within platform maximums

---

## 6. Integration Pattern

### 6.1 Loading Agent with Ontology Context

```python
from unified_registry_loader import UnifiedRegistryLoader
from base_agent_template import BaseAgentTemplate, TenantContext

# Initialize loader
loader = UnifiedRegistryLoader()
loader.load_all()

# Create tenant context
tenant_ctx = TenantContext(
    tenant_id=UUID("tenant-uuid"),
    venture_domain="baiv"
)

# Load agent with resolved ontology bindings
agent = BaseAgentTemplate(
    agent_id="agent-baiv-content-strategy-1.0",
    tenant_context=tenant_ctx
)

# Agent now has:
# - agent.spec: AgentSpecification with authority boundary
# - agent.ontology_bindings: Dict of resolved OntologyBinding objects
# - agent.system_prompt: Ontology-aware prompt for Claude
```

### 6.2 Validating Output

```python
# Agent produces a ContentRecommendation
recommendation = {
    "title": "Implement FAQ Schema",
    "priority": "high",
    "actions": ["Add FAQPage schema", "Create FAQ content"]
}

# Validate against PRODUCES ontology
valid, errors = agent.validate_output(
    data=recommendation,
    entity_type="ContentRecommendation"
)

if not valid:
    raise ValueError(f"Ontology validation failed: {errors}")
```

---

*© 2025 Platform Foundation Core Holdings. All rights reserved.*
