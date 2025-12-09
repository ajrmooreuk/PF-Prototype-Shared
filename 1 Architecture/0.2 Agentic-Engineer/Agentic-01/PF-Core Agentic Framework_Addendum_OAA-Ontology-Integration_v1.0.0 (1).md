# Addendum: OAA Integration & Ontology-Driven Agent Architecture

## Ontology Architect Agent & Graph-Based Data Access

**Version:** 1.0.0  
**Status:** CRITICAL ARCHITECTURAL COMPONENT  
**Integration:** PF-Agent Strategy, Context Engineering, Agent PRDs  

---

## 1. Executive Summary

The Ontology Architect Agent (OAA) serves as the **semantic governance layer** for all platform agents, controlling:

1. **Which ontologies** an agent can access based on role/process/scope
2. **How data is structured** using schema.org grounding
3. **What relationships** exist between entities across the five-layer architecture
4. **When ontologies are loaded** into agent context

> **Critical Integration Point:** Every agent's context engineering MUST include 
> OAA-governed ontology access to ensure semantic consistency and data quality.

---

## 2. Five-Layer Ontology Architecture

### 2.1 Architectural Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ONTOLOGY LAYER HIERARCHY                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  LAYER 5: STRATEGY                                                       │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  05-CMO-OKR-ONTOLOGY                                               │ │
│  │  • Corporate objectives    • Marketing strategy                    │ │
│  │  • Success metrics         • KPI definitions                       │ │
│  │  • VSOM cascade            • BSC perspectives                      │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                     │
│  LAYER 4: DIAGNOSIS                │                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  04-GAP-ANALYSIS-ONTOLOGY                                          │ │
│  │  • Current vs desired state    • Priority opportunities            │ │
│  │  • Implementation roadmap      • Dependency mapping                │ │
│  │  • Status tracking             • Effort estimation                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                     │
│  LAYER 3: ANALYSIS                 │                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  01-AI-VISIBILITY-ONTOLOGY                                         │ │
│  │  • Platform citation rates     • Query performance                 │ │
│  │  • Content format specs        • Schema optimization               │ │
│  │  • Algorithm tracking          • Multi-intent classification       │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                     │
│  LAYER 2: DISCOVERY                │                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  02-UNIVERSAL-BRAND-ONTOLOGY                                       │ │
│  │  • Discovery pathways          • Visibility scoring                │ │
│  │  • Competitive positioning     • Value proposition                 │ │
│  │  • Temporal tracking           • Messaging hierarchy               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    ↑                                     │
│  LAYER 1: CONTEXT (Foundation)     │                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  03-CUSTOMER-ORGANIZATION-ONTOLOGY                                 │ │
│  │  • ICP profiling               • AI maturity assessment            │ │
│  │  • Strategic goals             • Resource constraints              │ │
│  │  • Assessment history          • Contact details                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Principle

**Always Start with Context → Flow Upward**

```
Customer Org (Context) 
     ↓
Universal Brand (Discovery) 
     ↓
AI Visibility (Analysis) 
     ↓
Gap Analysis (Diagnosis) 
     ↓
CMO OKR (Strategy)
```

---

## 3. OAA (Ontology Architect Agent) Specification

### 3.1 OAA Role Definition

```json
{
  "@context": "https://schema.org/",
  "@type": "baiv:OntologyArchitectAgent",
  "@id": "pf-core:agent:oaa",
  "name": "Ontology Architect Agent",
  "version": "3.0.0",
  "tier": "Platform",
  "authority": "Ontology Governance",
  
  "responsibilities": [
    "Maintain OAA Registry of all platform ontologies",
    "Validate ontology compliance with schema.org grounding",
    "Control agent access to ontology graphs based on role/scope",
    "Resolve ontology conflicts and version management",
    "Provide ontology context injection for agent prompts",
    "Monitor ontology usage and optimize token efficiency"
  ],
  
  "registry": {
    "version": "3.0.0",
    "ontologies": [
      {"id": "01-ai-visibility", "layer": "analysis", "status": "active"},
      {"id": "02-universal-brand", "layer": "discovery", "status": "active"},
      {"id": "03-customer-organization", "layer": "context", "status": "active"},
      {"id": "04-gap-analysis", "layer": "diagnosis", "status": "active"},
      {"id": "05-cmo-okr", "layer": "strategy", "status": "active"},
      {"id": "06-vsom", "layer": "strategy", "status": "development"}
    ]
  }
}
```

### 3.2 OAA Registry v3.0 Structure

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/",
    "pf": "https://platform-foundation.ai/ontology/"
  },
  "@type": "pf:OntologyRegistry",
  "@id": "pf:oaa-registry:v3.0.0",
  "name": "OAA Registry",
  "version": "3.0.0",
  "description": "Central registry of all platform ontologies with access control",
  
  "ontologies": {
    "pf-core": {
      "description": "Platform Foundation Core ontologies (shared)",
      "transferable": true,
      "ontologies": [
        {
          "id": "pf:ontology:vsom",
          "name": "Vision Strategy Objectives Metrics",
          "schemaOrgAlignment": 0.85,
          "status": "active"
        },
        {
          "id": "pf:ontology:tenant",
          "name": "Multi-Tenant Management",
          "schemaOrgAlignment": 0.90,
          "status": "active"
        }
      ]
    },
    "baiv": {
      "description": "BAIV-specific ontologies",
      "transferable": false,
      "ontologies": [
        {
          "id": "baiv:ontology:ai-visibility",
          "name": "AI Visibility Analysis",
          "schemaOrgAlignment": 0.85,
          "status": "active"
        },
        {
          "id": "baiv:ontology:universal-brand",
          "name": "Universal Brand Discovery",
          "schemaOrgAlignment": 0.88,
          "status": "active"
        },
        {
          "id": "baiv:ontology:customer-organization",
          "name": "Customer Organization Profile",
          "schemaOrgAlignment": 0.92,
          "status": "active"
        },
        {
          "id": "baiv:ontology:gap-analysis",
          "name": "Gap Analysis Diagnosis",
          "schemaOrgAlignment": 0.87,
          "status": "active"
        },
        {
          "id": "baiv:ontology:cmo-okr",
          "name": "CMO OKR Strategy",
          "schemaOrgAlignment": 0.90,
          "status": "active"
        }
      ]
    }
  },
  
  "accessControl": {
    "byAgentCluster": {
      "discovery": ["customer-organization", "universal-brand", "ai-visibility"],
      "analysis": ["ai-visibility", "gap-analysis", "customer-organization"],
      "generation": ["all"],
      "optimization": ["all"]
    },
    "byAgentTier": {
      "orchestrator": ["all"],
      "primary": ["cluster-specific + dependencies"],
      "sub-agent": ["task-specific subset"]
    }
  }
}
```

---

## 4. Agent-Ontology Access Matrix

### 4.1 Access by Agent Role/Cluster

| Agent Cluster | Required Ontologies | Optional Ontologies | Access Pattern |
|---------------|--------------------|--------------------|----------------|
| **Discovery** | Customer Org, Universal Brand | AI Visibility | Context → Discovery |
| **Analysis** | AI Visibility, Gap Analysis | Customer Org | Context → Analysis → Diagnosis |
| **Generation** | All five ontologies | VSOM | Full graph traversal |
| **Optimization** | Gap Analysis, CMO OKR | All others | Diagnosis → Strategy |

### 4.2 Access by Process Type

| Process | Ontology Graph Path | Primary Ontologies |
|---------|--------------------|--------------------|
| **Client Onboarding** | Context → Discovery → Analysis → Diagnosis → Strategy | All 5 |
| **Content Strategy** | Context → Analysis → Generation | AI Visibility, Customer Org |
| **Algorithm Response** | Analysis → Diagnosis → Strategy | AI Visibility, Gap Analysis |
| **Quarterly Review** | All layers (temporal comparison) | All 5 with temporal fields |
| **Competitive Analysis** | Discovery → Analysis → Diagnosis | Universal Brand, AI Visibility |

### 4.3 Access by Scope

| Scope Level | Ontology Access | Token Budget |
|-------------|-----------------|--------------|
| **Global** | All ontologies, all entities | 2000 tokens |
| **Tenant** | Tenant-specific entities only | 1500 tokens |
| **Process** | Process-relevant ontologies | 1000 tokens |
| **Task** | Minimal required entities | 500 tokens |

---

## 5. Ontology Context Injection Pattern

### 5.1 Integration with Context Engineering

The ontology layer integrates with the three-layer context architecture:

```xml
<agent_context>
  <!-- LAYER 1: Strategic Context (25% budget) -->
  <strategic_context>
    <vsom_context>
      <!-- Injected by Strategic Context Agent -->
      <vision>{From VSOM ontology}</vision>
      <objectives>{From CMO-OKR ontology}</objectives>
    </vsom_context>
  </strategic_context>
  
  <!-- LAYER 2: Domain Context (50% budget) - OAA CONTROLLED -->
  <domain_context>
    <ontology_context source="oaa:registry:v3.0">
      <!-- OAA injects relevant ontology subgraphs -->
      <customer_context ontology="baiv:customer-organization">
        {Customer-specific entities}
      </customer_context>
      <analysis_context ontology="baiv:ai-visibility">
        {Relevant visibility data}
      </analysis_context>
      <diagnosis_context ontology="baiv:gap-analysis">
        {Applicable gaps and opportunities}
      </diagnosis_context>
    </ontology_context>
  </domain_context>
  
  <!-- LAYER 3: Operational Context (25% budget) -->
  <operational_context>
    <task_parameters>{Current task}</task_parameters>
    <session_state>{Active entities}</session_state>
  </operational_context>
</agent_context>
```

### 5.2 OAA Context Provider Implementation

```python
"""
OAA Context Provider
====================
Provides ontology-driven context to agents based on role/process/scope
"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

class OntologyLayer(Enum):
    CONTEXT = "context"
    DISCOVERY = "discovery"
    ANALYSIS = "analysis"
    DIAGNOSIS = "diagnosis"
    STRATEGY = "strategy"

class AgentCluster(Enum):
    DISCOVERY = "discovery"
    ANALYSIS = "analysis"
    GENERATION = "generation"
    OPTIMIZATION = "optimization"

@dataclass
class OntologyAccess:
    ontology_id: str
    layer: OntologyLayer
    access_level: str  # "full", "read", "subset"
    fields: Optional[List[str]] = None

class OAAContextProvider:
    """
    Ontology Architect Agent Context Provider
    
    Controls which ontologies are injected into agent context
    based on role, process, and scope.
    """
    
    def __init__(self, registry_version: str = "3.0.0"):
        self.registry = self._load_registry(registry_version)
        self.access_matrix = self._load_access_matrix()
    
    def get_ontology_context(
        self,
        agent_id: str,
        agent_cluster: AgentCluster,
        process_type: str,
        tenant_id: str,
        scope: str = "process",
        token_budget: int = 1000
    ) -> Dict:
        """
        Get ontology context for an agent based on role/process/scope.
        
        Args:
            agent_id: Unique agent identifier
            agent_cluster: Which cluster the agent belongs to
            process_type: The process being executed
            tenant_id: Tenant context for data filtering
            scope: Access scope (global, tenant, process, task)
            token_budget: Max tokens for ontology context
            
        Returns:
            Ontology context dict ready for injection
        """
        # 1. Determine required ontologies for this agent/process
        required_ontologies = self._get_required_ontologies(
            agent_cluster, process_type
        )
        
        # 2. Filter by scope
        scoped_ontologies = self._apply_scope_filter(
            required_ontologies, scope, tenant_id
        )
        
        # 3. Optimize for token budget
        optimized_context = self._optimize_for_tokens(
            scoped_ontologies, token_budget
        )
        
        # 4. Build context structure
        return self._build_context_structure(
            optimized_context, agent_id, process_type
        )
    
    def _get_required_ontologies(
        self, 
        cluster: AgentCluster, 
        process_type: str
    ) -> List[OntologyAccess]:
        """Determine ontologies needed based on cluster and process"""
        
        # Cluster-based access
        cluster_access = self.access_matrix["byAgentCluster"][cluster.value]
        
        # Process-based access (may expand cluster access)
        process_access = self.access_matrix["byProcess"].get(process_type, [])
        
        # Merge and deduplicate
        all_ontologies = list(set(cluster_access + process_access))
        
        return [
            OntologyAccess(
                ontology_id=ont_id,
                layer=self._get_layer(ont_id),
                access_level=self._get_access_level(ont_id, cluster)
            )
            for ont_id in all_ontologies
        ]
    
    def _apply_scope_filter(
        self, 
        ontologies: List[OntologyAccess],
        scope: str,
        tenant_id: str
    ) -> List[Dict]:
        """Filter ontology entities based on scope"""
        
        filtered = []
        for ont in ontologies:
            entities = self._load_ontology_entities(ont.ontology_id)
            
            if scope == "global":
                # All entities
                filtered.append({"ontology": ont, "entities": entities})
            elif scope == "tenant":
                # Filter to tenant
                tenant_entities = [
                    e for e in entities 
                    if e.get("tenant_id") == tenant_id
                ]
                filtered.append({"ontology": ont, "entities": tenant_entities})
            elif scope == "process":
                # Filter to process-relevant entities
                process_entities = self._filter_for_process(entities, ont)
                filtered.append({"ontology": ont, "entities": process_entities})
            elif scope == "task":
                # Minimal entities
                minimal_entities = self._get_minimal_entities(entities, ont)
                filtered.append({"ontology": ont, "entities": minimal_entities})
        
        return filtered
    
    def _optimize_for_tokens(
        self, 
        ontology_data: List[Dict],
        token_budget: int
    ) -> List[Dict]:
        """Optimize ontology context to fit within token budget"""
        
        # Priority order: Context → Discovery → Analysis → Diagnosis → Strategy
        layer_priority = [
            OntologyLayer.CONTEXT,
            OntologyLayer.DISCOVERY,
            OntologyLayer.ANALYSIS,
            OntologyLayer.DIAGNOSIS,
            OntologyLayer.STRATEGY
        ]
        
        # Sort by priority
        sorted_data = sorted(
            ontology_data,
            key=lambda x: layer_priority.index(x["ontology"].layer)
        )
        
        # Progressive disclosure - add until budget exhausted
        result = []
        current_tokens = 0
        
        for item in sorted_data:
            item_tokens = self._estimate_tokens(item)
            
            if current_tokens + item_tokens <= token_budget:
                result.append(item)
                current_tokens += item_tokens
            else:
                # Try to include summarized version
                summary = self._summarize_ontology(item)
                summary_tokens = self._estimate_tokens(summary)
                
                if current_tokens + summary_tokens <= token_budget:
                    result.append(summary)
                    current_tokens += summary_tokens
        
        return result
    
    def _build_context_structure(
        self, 
        ontology_data: List[Dict],
        agent_id: str,
        process_type: str
    ) -> Dict:
        """Build final context structure for injection"""
        
        return {
            "oaa_context": {
                "version": "3.0.0",
                "agent_id": agent_id,
                "process_type": process_type,
                "ontologies": [
                    {
                        "id": item["ontology"].ontology_id,
                        "layer": item["ontology"].layer.value,
                        "access_level": item["ontology"].access_level,
                        "entities": item["entities"]
                    }
                    for item in ontology_data
                ],
                "graph_relationships": self._extract_relationships(ontology_data)
            }
        }
    
    def _extract_relationships(self, ontology_data: List[Dict]) -> List[Dict]:
        """Extract cross-ontology relationships for graph traversal"""
        
        relationships = []
        
        # Customer → AI Visibility (assessed by)
        # AI Visibility → Gap Analysis (identifies)
        # Gap Analysis → CMO OKR (implements)
        # Universal Brand → AI Visibility (discovered in)
        
        relationship_map = [
            ("customer-organization", "ai-visibility", "assessed_by"),
            ("ai-visibility", "gap-analysis", "identifies"),
            ("gap-analysis", "cmo-okr", "implements"),
            ("universal-brand", "ai-visibility", "discovered_in"),
            ("cmo-okr", "vsom", "cascades_from")
        ]
        
        included_ontologies = [
            item["ontology"].ontology_id for item in ontology_data
        ]
        
        for source, target, rel_type in relationship_map:
            if source in included_ontologies and target in included_ontologies:
                relationships.append({
                    "source": source,
                    "target": target,
                    "type": rel_type
                })
        
        return relationships
```

---

## 6. Agent PRD Ontology Requirements Section

### 6.1 Required Addition to TEMPLATE-AGENT-PRD.md

```markdown
## 5.5 Ontology Requirements

### 5.5.1 OAA Registry Compliance

| Requirement | Specification |
|-------------|--------------|
| **OAA Registry Version** | v3.0.0 |
| **Schema.org Alignment** | Minimum 85% |
| **Ontology Validation** | Required before deployment |

### 5.5.2 Required Ontologies

| Ontology | Layer | Access Level | Purpose |
|----------|-------|--------------|---------|
| `{ontology-id}` | {layer} | {full/read/subset} | {Why this agent needs it} |

### 5.5.3 Ontology Access Pattern

```
{Primary Ontology}
     ↓ (relationship)
{Secondary Ontology}
     ↓ (relationship)
{Tertiary Ontology}
```

### 5.5.4 Entity Access Scope

| Entity Type | Scope | Filter Criteria |
|-------------|-------|-----------------|
| `{EntityType}` | {global/tenant/process} | {Filtering rules} |

### 5.5.5 Graph Traversal Requirements

**Required Relationships:**
- [ ] `{source}` → `{target}` via `{relationship_type}`

**Traversal Pattern:**
```python
# Example graph query pattern
def get_context_for_agent():
    # Start with context layer
    customer = get_customer_organization(tenant_id)
    
    # Traverse to discovery layer
    brand_data = get_universal_brand(customer.organization_id)
    
    # Traverse to analysis layer
    visibility = get_ai_visibility(brand_data.brand_id)
    
    return {
        "customer": customer,
        "brand": brand_data,
        "visibility": visibility
    }
```

### 5.5.6 Token Budget for Ontology Context

| Context Layer | Ontology Allocation | Token Budget |
|---------------|--------------------|--------------| 
| Strategic | VSOM, CMO-OKR | 250 tokens |
| Domain | {Agent-specific} | 500 tokens |
| Operational | Task entities | 250 tokens |
| **Total Ontology Budget** | | **1000 tokens** |
```

---

## 7. Integration Patterns by Use Case

### 7.1 Pattern: Discovery Audit Workflow

**Agents Involved:** Discovery Audit Agent, ICP Analysis Agent  
**Ontology Flow:**

```python
# Discovery Audit - OAA Integration
async def discovery_audit_workflow(tenant_id: str, domain: str):
    
    # 1. OAA provides context-layer ontology
    oaa = OAAContextProvider()
    customer_context = oaa.get_ontology_context(
        agent_id="discovery-audit-agent",
        agent_cluster=AgentCluster.DISCOVERY,
        process_type="discovery_audit",
        tenant_id=tenant_id,
        scope="tenant",
        token_budget=1000
    )
    
    # 2. Agent receives ontology-enriched context
    agent = DiscoveryAuditAgent(
        context=customer_context["oaa_context"]
    )
    
    # 3. Agent can traverse graph relationships
    customer = customer_context["oaa_context"]["ontologies"][0]["entities"]
    
    # 4. Run analysis with ontology-grounded queries
    visibility_analysis = await agent.analyze_platform(
        domain=domain,
        industry=customer["industry"],
        ai_maturity=customer["aiMaturityContext"]["maturityLevel"],
        strategic_goals=customer["strategicProfile"]["primaryObjectives"]
    )
    
    # 5. Output conforms to AI Visibility Ontology schema
    return AIVisibilityOntology.validate(visibility_analysis)
```

### 7.2 Pattern: Content Strategy Generation

**Agents Involved:** Content Strategy Agent, Schema Generator Agent  
**Ontology Flow:**

```python
# Content Strategy - Full Graph Traversal
async def content_strategy_workflow(
    tenant_id: str, 
    target_queries: List[str]
):
    
    # 1. OAA provides full graph access (generation cluster)
    oaa = OAAContextProvider()
    full_context = oaa.get_ontology_context(
        agent_id="content-strategy-agent",
        agent_cluster=AgentCluster.GENERATION,
        process_type="content_strategy",
        tenant_id=tenant_id,
        scope="process",
        token_budget=1500  # Higher budget for generation
    )
    
    # 2. Extract cross-ontology insights
    relationships = full_context["oaa_context"]["graph_relationships"]
    
    # 3. Traverse: Query Intent → Content Format → Schema → Brand Messaging
    for query in target_queries:
        # From AI Visibility ontology
        intent = classify_query_intent(query)
        format_spec = get_content_format(intent)
        schema_requirements = get_schema_requirements(format_spec)
        
        # From Universal Brand ontology
        messaging = get_brand_messaging(intent)
        value_prop = get_value_proposition(intent)
        
        # Generate content strategy
        strategy = ContentStrategyAgent.generate(
            query=query,
            intent=intent,
            format=format_spec,
            schema=schema_requirements,
            messaging=messaging,
            value_prop=value_prop
        )
    
    return strategy
```

### 7.3 Pattern: Quarterly Performance Review

**Agents Involved:** Performance Review Agent, Insight Generator Agent  
**Ontology Flow:**

```python
# Quarterly Review - Temporal Graph Traversal
async def quarterly_review_workflow(
    tenant_id: str,
    review_period: str  # "Q4-2025"
):
    
    # 1. OAA provides all ontologies with temporal data
    oaa = OAAContextProvider()
    temporal_context = oaa.get_ontology_context(
        agent_id="performance-review-agent",
        agent_cluster=AgentCluster.ANALYSIS,
        process_type="quarterly_review",
        tenant_id=tenant_id,
        scope="tenant",
        token_budget=2000  # Full context for review
    )
    
    # 2. Load temporal tracking from Universal Brand
    current_quarter = UniversalBrandOntology.get_temporal_data(
        period=review_period
    )
    previous_quarter = UniversalBrandOntology.get_temporal_data(
        period=get_previous_quarter(review_period)
    )
    
    # 3. Compare across ontologies
    comparison = {
        "visibility_change": compare_ai_visibility(
            current_quarter, previous_quarter
        ),
        "gap_completion": compare_gap_status(
            current_quarter, previous_quarter
        ),
        "okr_progress": compare_okr_progress(
            current_quarter, previous_quarter
        )
    }
    
    # 4. Generate insights aligned with CMO OKR ontology
    insights = InsightGeneratorAgent.analyze(
        comparison=comparison,
        objectives=CMO_OKR_Ontology.get_objectives(tenant_id)
    )
    
    return insights
```

---

## 8. Schema.org Grounding Standards

### 8.1 Compliance Requirements

| Standard | Requirement | Validation |
|----------|-------------|------------|
| **Base Types** | Use schema.org types where available | OAA validates |
| **Extensions** | baiv: namespace for custom types | Must document rationale |
| **Alignment Score** | Minimum 85% schema.org coverage | Automated check |
| **JSON-LD Structure** | @context, @type, @id required | Schema validation |

### 8.2 JSON-LD Structure Template

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/",
    "pf": "https://platform-foundation.ai/ontology/"
  },
  "@type": "{schema.org type OR baiv:CustomType}",
  "@id": "{namespace}:{type}:{unique-id}",
  
  "schemaOrgAlignment": {
    "baseTypes": ["{List of schema.org types used}"],
    "rationale": "{Why extensions were needed}",
    "extensions": ["{List of custom extensions}"],
    "alignmentScore": 0.85
  },
  
  "properties": {
    "{property_name}": {
      "type": "{schema.org type}",
      "schemaOrgProperty": "schema:{property}",
      "required": true,
      "description": "{Clear description}"
    }
  }
}
```

---

## 9. Database Integration

### 9.1 JSONB Storage Pattern

Ontologies are stored in Supabase PostgreSQL using JSONB for flexibility:

```sql
-- Ontology entity storage with JSONB
CREATE TABLE ontology_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    ontology_id TEXT NOT NULL,  -- e.g., 'baiv:ai-visibility'
    entity_type TEXT NOT NULL,  -- e.g., 'CitationPattern'
    entity_id TEXT NOT NULL,    -- @id from JSON-LD
    entity_data JSONB NOT NULL, -- Full JSON-LD entity
    schema_version TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes for graph traversal
    CONSTRAINT unique_entity UNIQUE (tenant_id, ontology_id, entity_id)
);

-- Index for JSONB queries
CREATE INDEX idx_entity_data ON ontology_entities USING GIN (entity_data);

-- Index for ontology filtering
CREATE INDEX idx_ontology_tenant ON ontology_entities (tenant_id, ontology_id);

-- RLS Policy
ALTER TABLE ontology_entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON ontology_entities
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);
```

### 9.2 Graph Relationship Storage

```sql
-- Cross-ontology relationships
CREATE TABLE ontology_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    source_ontology TEXT NOT NULL,
    source_entity_id TEXT NOT NULL,
    relationship_type TEXT NOT NULL,
    target_ontology TEXT NOT NULL,
    target_entity_id TEXT NOT NULL,
    relationship_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    FOREIGN KEY (tenant_id, source_ontology, source_entity_id) 
        REFERENCES ontology_entities(tenant_id, ontology_id, entity_id),
    FOREIGN KEY (tenant_id, target_ontology, target_entity_id) 
        REFERENCES ontology_entities(tenant_id, ontology_id, entity_id)
);

-- Index for graph traversal
CREATE INDEX idx_relationships_source 
    ON ontology_relationships (tenant_id, source_ontology, source_entity_id);
CREATE INDEX idx_relationships_target 
    ON ontology_relationships (tenant_id, target_ontology, target_entity_id);
```

---

## 10. TDD Requirements for OAA Integration

### 10.1 Test Categories

| Category | Coverage Target | Focus |
|----------|----------------|-------|
| **Ontology Validation** | 100% | Schema.org compliance |
| **Access Control** | 95% | Role/scope enforcement |
| **Graph Traversal** | 90% | Relationship integrity |
| **Token Optimization** | 85% | Budget compliance |
| **Integration** | 85% | Agent-OAA communication |

### 10.2 Test Examples

```python
"""
OAA Integration Tests
=====================
"""

import pytest
from oaa import OAAContextProvider, AgentCluster

class TestOAAAccessControl:
    """Test ontology access control by role/scope"""
    
    def test_discovery_agent_gets_context_layer(self):
        """Discovery agents must have customer org access"""
        oaa = OAAContextProvider()
        context = oaa.get_ontology_context(
            agent_id="test-discovery-agent",
            agent_cluster=AgentCluster.DISCOVERY,
            process_type="discovery_audit",
            tenant_id="test-tenant",
            scope="tenant"
        )
        
        ontology_ids = [
            o["id"] for o in context["oaa_context"]["ontologies"]
        ]
        assert "customer-organization" in ontology_ids
        assert "universal-brand" in ontology_ids
    
    def test_subagent_gets_limited_access(self):
        """Sub-agents should get minimal ontology access"""
        oaa = OAAContextProvider()
        context = oaa.get_ontology_context(
            agent_id="test-subagent",
            agent_cluster=AgentCluster.ANALYSIS,
            process_type="citation_check",
            tenant_id="test-tenant",
            scope="task",  # Most restrictive
            token_budget=500
        )
        
        total_entities = sum(
            len(o["entities"]) 
            for o in context["oaa_context"]["ontologies"]
        )
        assert total_entities < 50  # Limited entities for task scope


class TestOntologySchemaCompliance:
    """Test schema.org compliance"""
    
    @pytest.mark.parametrize("ontology_file", [
        "01-ai-visibility-ontology.json",
        "02-universal-brand-ontology.json",
        "03-customer-organization-ontology.json",
        "04-gap-analysis-ontology.json",
        "05-cmo-okr-ontology.json"
    ])
    def test_ontology_has_required_jsonld_fields(self, ontology_file):
        """All ontologies must have @context, @type, @id"""
        ontology = load_ontology(ontology_file)
        
        assert "@context" in ontology
        assert "@type" in ontology
        assert "@id" in ontology
        assert "schemaOrgAlignment" in ontology
    
    def test_schema_alignment_above_threshold(self, ontology_file):
        """Schema.org alignment must be >= 85%"""
        ontology = load_ontology(ontology_file)
        
        alignment = ontology.get("schemaOrgAlignment", {})
        score = alignment.get("alignmentScore", 0)
        
        assert score >= 0.85, f"Alignment {score} below 85% threshold"


class TestGraphTraversal:
    """Test cross-ontology graph relationships"""
    
    def test_customer_to_visibility_relationship(self):
        """Customer org should link to AI visibility analysis"""
        oaa = OAAContextProvider()
        context = oaa.get_ontology_context(
            agent_id="test-agent",
            agent_cluster=AgentCluster.ANALYSIS,
            process_type="full_audit",
            tenant_id="test-tenant",
            scope="process"
        )
        
        relationships = context["oaa_context"]["graph_relationships"]
        
        customer_to_visibility = [
            r for r in relationships 
            if r["source"] == "customer-organization" 
            and r["target"] == "ai-visibility"
        ]
        
        assert len(customer_to_visibility) > 0
        assert customer_to_visibility[0]["type"] == "assessed_by"
```

---

## 11. Implementation Checklist

### 11.1 OAA Setup

- [ ] OAA Registry v3.0.0 deployed
- [ ] All 5 core ontologies registered
- [ ] Schema.org validation passing (≥85%)
- [ ] Access control matrix configured
- [ ] Token optimization enabled

### 11.2 Agent Integration

- [ ] OAAContextProvider integrated into agent harness
- [ ] Ontology requirements added to all Agent PRDs
- [ ] Graph traversal patterns documented
- [ ] Token budgets allocated per agent type

### 11.3 Database

- [ ] JSONB ontology storage created
- [ ] Relationship tables created
- [ ] RLS policies for tenant isolation
- [ ] Graph traversal indexes optimized

### 11.4 Testing

- [ ] Ontology validation tests (100% coverage)
- [ ] Access control tests (95% coverage)
- [ ] Graph traversal tests (90% coverage)
- [ ] Integration tests with agents (85% coverage)

---

*Addendum Version: 1.0.0 | OAA Registry v3.0.0 | December 2025*
