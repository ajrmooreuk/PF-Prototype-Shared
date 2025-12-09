# Context Engineering
## Platform Foundation Core (PF-CORE) Framework

**Exploration Document: Definition, Business Value, TDDD Process & Organizational Placement**

---

### Document Controls

| Attribute | Value |
|-----------|-------|
| Document ID | **PF-CORE-CE-EXP-001** |
| Document Version | **1.2.0** |
| Version Date | 30 November 2025 |
| Status | DRAFT - Under Review |
| Review Date | 15 December 2025 |
| Platform | **PF-CORE** (Platform Foundation Core) |
| Platform Instances | AIR, BAIV, W4M, DJM |
| Sub-Instances | Client Deployments, Product Extensions, Whitelabel, Co-Branding |
| Primary Sources | Anthropic Best Practices, VSOM Module PRD, OAA Registry v3.0, AI PF-CORE Claude Context Engineering Guide |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | Nov 2025 | PF-CORE Architecture | Initial exploration document |
| 1.1.0 | Nov 2025 | PF-CORE Architecture | Added OAA integration, Knowledge Graphs, Ontology Management Strategy, Discovery Functions |
| 1.1.1 | Nov 2025 | PF-CORE Architecture | Corrected platform hierarchy—PF-CORE as Platform, AIR/BAIV/W4M as Instances |
| 1.2.0 | 30 Nov 2025 | PF-CORE Architecture | Discovery & Scope formally assigned to Context Engineer; Ontology classification with IDs; TDDD expanded to include Deployment; PaaS-CI-CD Engineer Context added; Copyright & Licensing added |

### Copyright & Licensing

```
┌─────────────────────────────────────────────────────────────────────────┐
│  © 2025 Platform Foundation Core Holdings. All Rights Reserved.         │
│                                                                         │
│  This document and its contents are the confidential intellectual       │
│  property of PF-CORE Holdings.                                          │
│                                                                         │
│  LICENSE GRANT: This document is licensed to authorized PF-Instances    │
│  (AIR, BAIV, W4M, DJM) under the PF-CORE Platform License Agreement.   │
│                                                                         │
│  Sub-Instance licensing (Client Deployments, Whitelabel, Co-Branding)   │
│  is governed by the respective PF-Instance License Terms.               │
│                                                                         │
│  Unauthorized reproduction, distribution, or disclosure is prohibited.  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Platform Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PF-CORE (PLATFORM)                               │
│                    Platform Foundation Core                              │
│                                                                         │
│    Shared Infrastructure: OAA Registry, VSOM, Context Engineering,      │
│    Multi-Tenant Architecture, PaaS-CI-CD, Core Ontologies               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Licensed to
                                    ▼
    ┌───────────────┬───────────────┼───────────────┬───────────────┐
    ▼               ▼               ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│   AIR   │   │  BAIV   │   │   W4M   │   │   DJM   │   │ Future  │
│Instance │   │Instance │   │Instance │   │Instance │   │Instances│
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
    │               │               │               │
    ▼               ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUB-INSTANCES                                    │
│                                                                         │
│   • Client Deployments    - Tenant-specific implementations             │
│   • Product Extensions    - Feature add-ons and customizations          │
│   • Whitelabel           - Full rebrand under client identity           │
│   • Co-Branding          - Joint branding arrangements                  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Platform Instance Definitions

| Instance | Full Name | Domain | Description |
|----------|-----------|--------|-------------|
| **AIR** | AI Strategy & Innovation | AI Consulting | Enterprise AI strategy, capability building, transformation |
| **BAIV** | Be AI Visible | Marketing AI | AI visibility, citation optimization, content strategy |
| **W4M** | Wings4Mind.ai | Value Engineering | Idea→MVP→PMF acceleration, business model validation |
| **DJM** | Digital Journey Management | Customer Experience | Digital transformation, journey mapping, CX optimization |

---

## 1. Executive Summary

Context Engineering represents a fundamental shift in how AI-augmented systems are designed and operated. Moving beyond traditional prompt engineering, Context Engineering encompasses the holistic practice of designing, curating, and maintaining the optimal set of information (tokens) available to AI models at any given inference point.

For Platform Foundation Core (PF-CORE), Context Engineering is not merely a technical function—it is a **first-order business decision** that directly impacts agent effectiveness, user experience, operational costs, and ultimately the competitive moat of the platform.

### 1.1 Key Findings

1. **Context as Finite Resource:** LLMs experience 'context rot'—performance degrades as token count increases. Every token competes for the model's attention budget.

2. **Business Value Impact:** Graph-based context architectures deliver 50-70% token cost reductions and 15-30% accuracy improvements over traditional RAG.

3. **Ontology-Driven Advantage:** Schema.org-grounded JSON-LD structures enable 10x faster development velocity through semantic interoperability.

4. **OAA as Context Foundation:** The Ontology Architect Agent (OAA) Registry v3.0 provides the governance layer for all context structures, ensuring semantic consistency across the platform.

5. **Discovery-Informed Context:** Knowledge search and discovery functions are essential components of Context Engineering, informing domain boundaries and optimizing agent query scope.

6. **TDDD Integration:** Context Engineering must be embedded within Test-Driven Design and Development processes, with explicit test coverage for context quality.

7. **Organizational Placement:** Context Engineering Lead should report to the Chief Technology Officer (CTO) with strong dotted-line accountability to the Chief Marketing Officer (CMO) for product-specific applications.

### 1.2 Critical Question: Discovery as Context Engineering Function

> **Should knowledge search and discovery be part of the Context Engineer's agents when implementing an application or setting the context to design and develop autonomous agents and domain/application-specific agents?**

**ACCEPTED: YES — Discovery and Scope Definition ARE Context Engineering Functions**

Following comprehensive analysis (see Section 10), this document formally establishes that:

1. **Discovery Functions** (domain mapping, gap detection, relationship extraction, boundary definition) are integral responsibilities of the Context Engineer role.

2. **Scope Definition** for potential solutions—determining what knowledge domains, ontologies, and semantic boundaries apply to a given agent or application—is a Context Engineering deliverable, not a separate function.

3. **Rationale:** Context cannot be effectively curated without first discovering what context exists and defining the scope within which it applies. Separating these functions creates organizational friction and context quality degradation.

4. **Implementation:** Discovery Layer agents (Domain Mapping, Gap Detection, Relationship Discovery, Boundary Enforcement) operate as sub-systems within the Context Engineering function, feeding directly into Context Assembly.

*Citation: This determination aligns with Anthropic's "just-in-time context" pattern, which requires agents to "dynamically load data into context at runtime"—a capability that presupposes discovery and scope definition.*

---

## 2. What is Context Engineering?

### 2.1 Definition and Evolution

According to Anthropic's engineering team, **Context Engineering** is "the art and science of curating what will go into the limited context window from a constantly evolving universe of possible information."

While prompt engineering focuses on crafting effective prompts (particularly system prompts), context engineering addresses the broader question: *"What configuration of context is most likely to generate our model's desired behavior?"*

### Evolution from Prompt Engineering to Context Engineering

| Prompt Engineering | Context Engineering |
|-------------------|---------------------|
| Focus on writing effective prompts | Focus on curating entire context state |
| Primarily system prompt optimization | System prompts, tools, RAG, memory, message history |
| One-shot or few-shot interactions | Multi-turn agents operating over extended horizons |
| Static prompt templates | Dynamic, cyclically refined context |
| Craft input → evaluate output | Design system → orchestrate context → iterate continuously |

### 2.2 Why Context Engineering Matters

The architectural constraints of Large Language Models create fundamental limitations that Context Engineering must address:

1. **Attention Scarcity:** Transformer architecture enables every token to attend to every other token, creating n² pairwise relationships. As context length increases, the model's ability to capture these relationships "gets stretched thin."

2. **Context Rot:** Research demonstrates that as tokens increase, the model's ability to accurately recall information decreases—a characteristic that emerges across all models.

3. **Training Distribution Bias:** Models develop attention patterns from training data where shorter sequences are typically more common, meaning models have less specialized parameters for long-range dependencies.

4. **Diminishing Marginal Returns:** Context must be treated as a finite resource where every additional token depletes the model's "attention budget."

### 2.3 Core Components of Effective Context

Based on Anthropic's best practices and the PF-CORE architecture, effective context comprises:

- **System Prompts:** Foundational instructions at the "right altitude"—specific enough to guide behavior, flexible enough for strong heuristics
- **Tools:** Well-designed, token-efficient tools with minimal functional overlap
- **RAG & Memory:** Vector databases, hybrid search, and memory management systems
- **Structured Inputs/Outputs:** JSON-LD schemas, ontology definitions, standardized formats
- **Message History:** Conversation state with compaction and summarization strategies
- **States & Historical Context:** User profiles, task progress, learned preferences
- **Discovery Context:** Domain boundaries, knowledge scope, semantic relationships (NEW)

---

## 3. Ontology Architect Agent (OAA) and Context Engineering

### 3.1 OAA Registry v3.0 Role in PF-CORE

The **Ontology Architect Agent (OAA)** is the deployed governance layer for all semantic structures within PF-CORE. It serves as the foundation for Context Engineering by:

| OAA Function | Context Engineering Impact |
|-------------|---------------------------|
| Schema.org Grounding | Ensures all context structures are semantically interoperable |
| JSON-LD Validation | Validates context payloads before agent consumption |
| Ontology Registry | Central repository of domain ontologies for context selection |
| Version Control | Tracks ontology evolution for context consistency |
| Compliance Enforcement | 100% schema.org validation passing requirement |

### 3.2 OAA-Context Engineering Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTEXT ENGINEERING                       │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Discovery  │───▶│   OAA       │───▶│  Context    │     │
│  │  Functions  │    │  Registry   │    │  Assembly   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│        │                  │                   │             │
│        ▼                  ▼                   ▼             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Domain     │    │  Ontology   │    │  Agent      │     │
│  │  Boundaries │    │  Selection  │    │  Context    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Deployed Ontologies in PF-CORE

#### Ontology Registry Overview

All ontologies are governed by OAA Registry v3.0 and must comply with:
- **Unique Identifier:** ONT-{DOMAIN}-{SEQUENCE} format
- **Version Control:** Semantic versioning (MAJOR.MINOR.PATCH)
- **Release Management:** Dated releases with change logs
- **Classification:** PF-Core (platform-wide) vs. PF-Instance (instance-specific)

#### PF-CORE Platform Ontologies

These ontologies are foundational to the platform and available to ALL PF-Instances.

| Ontology ID | Name | Version | Release Date | Domain | Context Use |
|-------------|------|---------|--------------|--------|-------------|
| **ONT-PROC-0001** | PF-Core Process Ontology | 1.0.0 | TBD | Platform Architecture | **Master ontology defining PF-Core → PF-Instance graph structure, process flows, and inheritance patterns** |
| **ONT-VSOM-0001** | VSOM Ontology | 1.0.0 | TBD | Value Engineering | Vision, Strategy, Objectives, Metrics cascade—strategic context for all agents |
| **ONT-BRND-0001** | Universal Brand Ontology | 1.0.0 | 2025-10-13 | Brand Management | Discovery pathways, competitive positioning, brand architecture |
| **ONT-CORG-0001** | Customer Organization Ontology | 1.0.0 | 2025-10-13 | CRM | ICP characteristics, org profiling, customer context |
| **ONT-GAPS-0001** | Gap Analysis Ontology (Core) | 1.1.0 | 2025-10-21 | Strategy | Current vs. desired state framework—extensible by PF-Instances |
| **ONT-TDDD-0001** | TDDD Process Ontology | 1.0.0 | TBD | Quality Engineering | Test-Driven Design, Development & Deployment process definitions |
| **ONT-CICD-0001** | PaaS-CI-CD Ontology | 1.0.0 | TBD | Platform Engineering | Continuous Integration, Deployment, Infrastructure context |

#### PF-Instance Specific Ontologies

These ontologies are specific to individual PF-Instances and extend or specialize PF-Core ontologies.

##### BAIV Instance Ontologies

| Ontology ID | Name | Version | Release Date | PF-Core | Instances | Domain | Context Use |
|-------------|------|---------|--------------|:-------:|-----------|--------|-------------|
| **ONT-AIVS-0001** | AI Visibility Ontology | 1.0.0 | 2025-10-13 | No | BAIV | Citation Optimization | Citation patterns, platform performance, AI visibility metrics |
| **ONT-CMOO-0001** | CMO-OKR Ontology | 3.0.0 | 2025-10-21 | No | BAIV | Marketing Execution | CMO strategy-to-execution cascade, marketing OKRs |
| **ONT-GAPS-BAIV-0001** | Gap Analysis (BAIV Extension) | 1.0.0 | TBD | Extends ONT-GAPS-0001 | BAIV | Marketing Gaps | AI visibility gap analysis, content opportunity detection |

##### AIR Instance Ontologies

| Ontology ID | Name | Version | Release Date | PF-Core | Instances | Domain | Context Use |
|-------------|------|---------|--------------|:-------:|-----------|--------|-------------|
| **ONT-AIST-0001** | AI Strategy Ontology | 1.0.0 | TBD | No | AIR | AI Consulting | AI maturity assessment, capability mapping, transformation roadmaps |
| **ONT-CSOO-0001** | CSO-OKR Ontology | 1.0.0 | TBD | No | AIR | Strategy Execution | Chief Strategy Officer cascade (correlates with CMO-OKR pattern) |
| **ONT-GAPS-AIR-0001** | Gap Analysis (AIR Extension) | 1.0.0 | TBD | Extends ONT-GAPS-0001 | AIR | Strategy Gaps | AI capability gaps, transformation opportunity analysis |

##### W4M Instance Ontologies

| Ontology ID | Name | Version | Release Date | PF-Core | Instances | Domain | Context Use |
|-------------|------|---------|--------------|:-------:|-----------|--------|-------------|
| **ONT-VENG-0001** | Value Engineering Ontology | 1.0.0 | TBD | No | W4M | Value Engineering | Idea-to-MVP-to-PMF process, business model canvas |
| **ONT-CPOO-0001** | CPO-OKR Ontology | 1.0.0 | TBD | No | W4M | Product Execution | Chief Product Officer cascade (correlates with CMO-OKR pattern) |
| **ONT-GAPS-W4M-0001** | Gap Analysis (W4M Extension) | 1.0.0 | TBD | Extends ONT-GAPS-0001 | W4M | Product Gaps | PMF gap analysis, market validation opportunities |

##### DJM Instance Ontologies

| Ontology ID | Name | Version | Release Date | PF-Core | Instances | Domain | Context Use |
|-------------|------|---------|--------------|:-------:|-----------|--------|-------------|
| **ONT-DJRN-0001** | Digital Journey Ontology | 1.0.0 | TBD | No | DJM | Customer Experience | Journey mapping, touchpoint analysis, experience design |
| **ONT-CXOO-0001** | CXO-OKR Ontology | 1.0.0 | TBD | No | DJM | CX Execution | Chief Experience Officer cascade (correlates with CMO-OKR pattern) |

#### Cross-Instance Ontology Correlation

The C-Suite OKR Ontology pattern (CMO-OKR, CSO-OKR, CPO-OKR, CXO-OKR) follows a common structure that enables:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PF-CORE: VSOM Ontology (ONT-VSOM-0001)               │
│                    Vision → Strategy → Objectives → Metrics             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    Cascades to C-Suite Execution
                                    │
        ┌───────────────┬───────────┴───────────┬───────────────┐
        ▼               ▼                       ▼               ▼
┌─────────────┐ ┌─────────────┐       ┌─────────────┐ ┌─────────────┐
│ CMO-OKR     │ │ CSO-OKR     │       │ CPO-OKR     │ │ CXO-OKR     │
│ (BAIV)      │ │ (AIR)       │       │ (W4M)       │ │ (DJM)       │
│ Marketing   │ │ Strategy    │       │ Product     │ │ Experience  │
└─────────────┘ └─────────────┘       └─────────────┘ └─────────────┘
```

#### Notes on Ontology Architecture

1. **PF-Core Process Ontology (ONT-PROC-0001)** is the master graph that defines:
   - Platform → Instance inheritance relationships
   - Core vs. Extension ontology patterns
   - Sub-Instance deployment rules
   - Whitelabel/Co-branding ontology customization boundaries

2. **Gap Analysis Ontology** exists at both PF-Core (generic framework) and PF-Instance (domain-specific extensions) levels—demonstrating the extension pattern.

3. **C-Suite OKR Ontologies** share common structure but are instance-specific because:
   - Each C-Suite role has domain-specific metrics and KPIs
   - Cross-correlation enables enterprise-wide strategic alignment
   - Future: Consider PF-Core abstract C-Suite OKR pattern for standardization

### 3.4 JSON Ontology Architecture

PF-CORE adopts a **JSON-first ontology strategy** that minimizes database complexity while maximizing semantic richness:

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/",
    "pf": "https://pf-core.io/ontology/"
  },
  "@type": "pf:ContextDefinition",
  "@id": "pf:context:agent-marketing-001",
  "name": "Marketing Agent Context",
  "ontologyDependencies": [
    "baiv:ontology:ai-visibility",
    "baiv:ontology:cmo-okr"
  ],
  "discoveryScope": {
    "domainBoundaries": ["marketing", "competitive-analysis", "content-strategy"],
    "excludedDomains": ["finance", "hr", "legal"]
  }
}
```

**Advantages of JSON Ontology Approach:**

1. **Supabase JSONB Storage:** Native PostgreSQL JSONB enables complex queries without schema migrations
2. **No OWL/RDF Complexity:** Avoids heavyweight semantic web infrastructure while retaining semantic value
3. **Developer Accessibility:** JSON-LD is immediately usable by frontend and backend developers
4. **Graph-Ready:** JSONB structures can be projected to graph databases when needed
5. **Validation Simplicity:** JSON Schema validation is well-understood and tooling-rich

---

## 4. Knowledge Graphs and Context Discovery

### 4.1 Strategic Role of Knowledge Graphs in Context Engineering

Knowledge graphs serve Context Engineering in two critical ways:

1. **Context Discovery:** Identifying relevant domain knowledge and relationships before context assembly
2. **Context Enrichment:** Adding semantic relationships that improve agent reasoning

### 4.2 Graph Tool Landscape for PF-CORE

PF-CORE adopts a **hybrid graph strategy** that avoids Neo4j lock-in while leveraging purpose-specific tools:

| Tool Category | Tool Options | PF-CORE Use Case | Integration Pattern |
|--------------|--------------|------------------|---------------------|
| **Discovery & Gap Analysis** | InfraNodus | Content gap detection, topic clustering, blind spot identification | API/MCP integration for pre-context discovery |
| **Lightweight Graph Storage** | Supabase JSONB + pg_graphql | Relationship storage within existing Postgres | Native—no additional infrastructure |
| **High-Performance Graph** | Memgraph, FalkorDB | Real-time graph queries, GraphRAG | Optional add-on for complex traversals |
| **Multi-Model** | ArangoDB | Combined document + graph when needed | Consideration for future scaling |
| **Visualization** | Graphlytic, Cosmograph | Agent debugging, ontology visualization | Development/admin tooling |

### 4.3 InfraNodus for Context Discovery

InfraNodus provides unique value for Context Engineering through its text network analysis capabilities:

**Key Capabilities:**
- **Topic Clustering:** Identifies topical clusters in domain knowledge to inform context boundaries
- **Gap Detection:** Reveals "blind spots" between topics—areas where context may be incomplete
- **Structural Analysis:** Betweenness centrality identifies influential concepts for context prioritization
- **GraphRAG Enhancement:** API provides structured graph data for LLM workflow augmentation

**Integration Pattern:**

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Domain         │────▶│  InfraNodus     │────▶│  Context        │
│  Knowledge Base │     │  Text Network   │     │  Boundaries     │
└─────────────────┘     │  Analysis       │     │  Definition     │
                        └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │  Gap Detection  │
                        │  Report         │
                        └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │  Context        │
                        │  Optimization   │
                        │  Recommendations│
                        └─────────────────┘
```

**InfraNodus MCP Server:** Available for Claude/Cursor integration, providing:
- Topical overview of files, conversations, or text
- Content gap identification with AI-generated bridging ideas
- Research question generation for knowledge expansion
- Entity-relation extraction for knowledge graphs

### 4.4 Supabase JSONB as Graph Foundation

Rather than introducing Neo4j complexity, PF-CORE leverages PostgreSQL's native capabilities:

**JSONB Graph Pattern:**

```sql
-- Ontology entities with embedded relationships
CREATE TABLE ontology_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  entity_type TEXT NOT NULL,
  entity_data JSONB NOT NULL,  -- Full JSON-LD entity
  relationships JSONB DEFAULT '[]',  -- Array of relationship objects
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for graph-style queries
CREATE INDEX idx_entity_relationships ON ontology_entities 
  USING GIN (relationships);

-- Example relationship query
SELECT e1.entity_data, e2.entity_data
FROM ontology_entities e1
CROSS JOIN LATERAL jsonb_array_elements(e1.relationships) AS rel
JOIN ontology_entities e2 ON e2.id = (rel->>'target_id')::UUID
WHERE rel->>'type' = 'influences'
  AND e1.tenant_id = 'tenant-123';
```

**Advantages:**
- No additional infrastructure
- RLS policies already in place for multi-tenancy
- Familiar SQL tooling for developers
- Easy export to dedicated graph DB if scale requires

### 4.5 When to Escalate to Dedicated Graph Database

| Scenario | Recommendation |
|----------|---------------|
| < 100K entities, < 1M relationships | Supabase JSONB sufficient |
| Path queries > 3 hops | Consider Memgraph or FalkorDB |
| Real-time recommendation engine | FalkorDB (GraphRAG-optimized) |
| Complex graph algorithms (PageRank, community detection) | Neo4j or NebulaGraph |
| Cost-sensitive, LLM-focused | FalkorDB or Memgraph |

---

## 5. Context Engineering Scope for PF-CORE

### 5.1 Platform Foundation Context (PF-Core Level)

At the platform foundation level, Context Engineering establishes the shared infrastructure that all platform products and agents consume:

| Context Layer | Components | Purpose |
|--------------|------------|---------|
| **Ontology Layer** | OAA Registry v3.0, JSON-LD structures, schema.org grounding | Semantic interoperability, AI reasoning foundation |
| **Discovery Layer** | InfraNodus integration, domain boundary detection, gap analysis | Context scope optimization (NEW) |
| **VSOM Context** | Vision, Strategy, Objectives, Metrics cascade | Strategic alignment for all agent decisions |
| **Agent Context** | Agent Manager, capability definitions, tool registries | Agent orchestration and capability discovery |
| **Multi-Tenant Context** | RLS policies, tenant isolation, organizational profiles | Data security and tenant-specific behavior |
| **Knowledge Graph** | JSONB relationships, optional Neo4j/FalkorDB, graph queries | Contextual enrichment and semantic navigation |

### 5.2 PF-Instance Context (Tenant Level)

Each tenant deployment inherits PF-Core context while adding instance-specific configurations:

1. **Organizational Profile:** Company-specific vision, mission, values, and strategic objectives from VSOM
2. **Industry Vertical Context:** Sector-specific terminology, compliance requirements, and domain ontologies
3. **User State Management:** Individual user preferences, expertise levels, and interaction history
4. **Workflow Context:** Active tasks, progress states, dependencies, and completion criteria
5. **Discovery-Defined Boundaries:** Tenant-specific domain scoping based on knowledge analysis

### 5.3 Product-Specific Context Applications

#### BAIV (Be AI Visible) - Marketing AI Visibility
- Citation pattern ontologies and platform-specific content requirements
- Competitive positioning context and market intelligence
- CMO-OKR-ONTOLOGY v3.0.0 integration for marketing execution alignment
- **Discovery:** Content gap analysis via InfraNodus for visibility optimization

#### AIR - AI Strategy & Innovation
- Industry research context and analyst reports
- Framework libraries (McKinsey, Forrester, Gartner methodologies)
- Client engagement history and recommendation tracking
- **Discovery:** Strategic blind spot identification across client portfolios

#### W4M (Wings4Mind.ai) - Value Engineering
- Idea-to-MVP-to-PMF process context and stage gates
- Business model canvas and value proposition libraries
- Market validation context and customer discovery data
- **Discovery:** Opportunity gap detection between current and desired states

---

## 6. Business Value Creation through Context Engineering

### 6.1 Direct Value Metrics

| Value Driver | Impact | Mechanism |
|-------------|--------|-----------|
| Token Cost Reduction | **50-70%** | Graph architectures vs. traditional RAG |
| Accuracy Improvement | **15-30%** | Ontology-driven semantic precision |
| Development Velocity | **10x** | Reusable context modules and ontologies |
| Strategic Alignment | **60% reduction** | VSOM context for agent decision-making |
| Planning Cycle Time | **75% reduction** | 6-8 weeks to 1-2 weeks OKR planning |
| Discovery Efficiency | **NEW** | Reduced hallucination through boundary enforcement |

### 6.2 Competitive Moat Mechanisms

Context Engineering creates sustainable competitive advantage through:

- **Proprietary Ontology Assets:** Schema.org-grounded domain ontologies that competitors cannot easily replicate
- **Knowledge Accumulation Flywheel:** Each client deployment enriches the platform's contextual intelligence
- **Agent Performance Gap:** Superior context yields measurably better agent outcomes, creating switching costs
- **Transferability Premium:** PF-Core context modules accelerate new venture bootstrap by 80-90%
- **Discovery Intelligence:** Gap detection capabilities that continuously improve context quality

---

## 7. Context Engineer Role in TDDD Process

### 7.1 TDDD Overview for AI-Augmented Applications

**TDDD: Test-Driven Design, Development & Deployment**

Test-Driven Design, Development & Deployment (TDDD) for ontology-augmented applications extends traditional TDD principles to encompass:

- **Design:** Semantic correctness, ontology alignment, context architecture
- **Development:** Implementation quality, code coverage, integration testing
- **Deployment:** Production readiness, CI/CD validation, infrastructure context

The expansion to include **Deployment** recognizes that AI-augmented applications require continuous validation through the entire lifecycle, including production monitoring and deployment pipeline integrity.

### 7.2 Context Engineer Responsibilities in TDDD

#### Phase 1: Test Design (Before Implementation)

1. **Context Quality Test Specifications:** Define measurable criteria for context effectiveness (relevance scores, token efficiency, recall accuracy)
2. **Ontology Validation Tests:** Schema.org compliance validation, JSON-LD structure verification, semantic relationship integrity
3. **Agent Behavior Assertions:** Expected agent responses given specific context configurations
4. **Context Boundary Tests:** Edge cases for context window limits, compaction triggers, memory overflow scenarios
5. **Discovery Validation Tests:** Domain boundary accuracy, gap detection precision (NEW)

#### Phase 2: Context Implementation

- Design system prompts at "right altitude" per Anthropic guidelines
- Implement tool definitions with minimal functional overlap
- Configure RAG pipelines with hybrid search strategies
- Establish compaction and note-taking strategies for long-horizon tasks
- Deploy CLAUDE.md equivalent documentation for agent workspace awareness
- **Integrate discovery functions for domain scoping (NEW)**

#### Phase 3: Continuous Validation

- Execute context quality tests on every PR (>85% test coverage mandate)
- Monitor context rot metrics across production deployments
- Track agent alignment scores against VSOM strategic objectives
- Iterate on context configurations based on failure mode analysis
- **Validate domain boundaries against discovery outputs (NEW)**

### 7.3 Human vs. Agent vs. Hybrid Process Determination

| Activity | Human | Agent | Hybrid |
|----------|:-----:|:-----:|:------:|
| Ontology Design | ● | | |
| Schema.org Mapping | | | ● |
| Context Compaction | | ● | |
| Test Case Generation | | | ● |
| Prompt Tuning | | | ● |
| Quality Monitoring | | ● | |
| Strategic Alignment Review | ● | | |
| **Discovery Execution** | | ● | |
| **Domain Boundary Definition** | | | ● |
| **Gap Analysis Interpretation** | ● | | |

---

## 8. C-Suite Organizational Placement

### 8.1 Recommended Reporting Structure

The Context Engineering Lead should report to the **Chief Technology Officer (CTO)** with strong accountability relationships to other C-Suite functions.

#### Rationale for CTO Reporting

1. **Technical Infrastructure Ownership:** Context Engineering is fundamentally an architecture and systems discipline
2. **Platform Foundation Scope:** PF-Core context serves all products, requiring CTO-level technical governance
3. **TDDD Process Integration:** Context quality testing aligns with engineering quality assurance
4. **Agent SDK Expertise:** Claude Agent SDK orchestration requires deep technical capability
5. **OAA Governance:** Ontology management is a technical architecture concern

### 8.2 Cross-Functional Accountability Matrix

| C-Suite Role | Context Engineering Interaction | Accountability Type |
|-------------|--------------------------------|---------------------|
| **CTO** | Platform architecture, TDDD process, technical quality, OAA governance | **Direct Reporting** |
| **CMO** | Product context for BAIV, market positioning, customer insights | **Strong Dotted Line** |
| **CPO** | Product-specific context requirements, user experience | Dotted Line |
| **CEO** | VSOM strategic context, organizational vision cascade | Strategic Oversight |
| **CFO** | Token cost optimization, ROI measurement | Metrics Reporting |

### 8.3 Why NOT CMO Direct Reporting

While BAIV as a marketing-focused product might suggest CMO ownership, Context Engineering spans the entire platform:

- **Multi-Product Scope:** Context Engineering serves BAIV, AIR, and W4M equally—not marketing-specific
- **Technical Depth:** Ontology architecture, JSONB optimization, and agent orchestration require engineering leadership
- **VSOM Integration:** Strategic context cascades from CEO vision through all functions—not marketing-owned
- **Quality Assurance:** TDDD process governance aligns with CTO engineering standards

*However,* the CMO dotted-line relationship is critical because:

- CMO-OKR-ONTOLOGY v3.0.0 drives marketing-specific context requirements
- BAIV competitive positioning depends on market intelligence context
- Customer discovery data enriches organizational context

---

## 9. Implementation Framework

### 9.1 Anthropic Best Practices Integration

The following Anthropic guidelines should be embedded into PF-CORE Context Engineering standards:

#### System Prompt Principles

- **Right Altitude:** Specific enough to guide behavior, flexible enough for strong heuristics
- **Structured Sections:** Use XML tags or Markdown headers to delineate context components
- **Minimal Yet Complete:** Start with minimal prompts, add instructions based on failure mode analysis

#### Tool Design Standards

- **Token Efficiency:** Tools must return information that is token-efficient
- **Minimal Overlap:** No ambiguous decision points about which tool to use
- **Self-Contained:** Robust to error with clear intended use documentation

#### Long-Horizon Task Strategies

- **Compaction:** Summarize and reinitialize context at window limits
- **Structured Note-Taking:** Persist critical context outside the context window
- **Sub-Agent Architectures:** Specialized agents for focused tasks with clean context windows

### 9.2 PF-CORE Specific Extensions

- **OAA Registry v3.0 Compliance:** All context structures must pass ontology validation
- **VSOM Context Propagation:** Strategic context available to all platform agents
- **Multi-Tenant Isolation:** Context never crosses tenant boundaries
- **Figma Make Integration:** UI/UX context from design system flows to agent awareness
- **Discovery-First Context:** Domain boundaries defined before context assembly (NEW)

### 9.3 MODULE_CONTEXT.md Template

Following Anthropic's Claude Code patterns, each PF-CORE module should maintain context documentation:

```markdown
# MODULE_CONTEXT.md

## Purpose
[Module's role in the platform ecosystem]

## Core Files & Functions
- [Key file paths and their purposes]
- [Utility functions available to agents]

## Ontology Dependencies
- [Required schema.org types]
- [OAA Registry references]

## Discovery Configuration
- [Domain boundaries for this module]
- [Excluded domains]
- [Knowledge graph scope]

## Agent Interaction Patterns
- [How agents should use this module]
- [Expected inputs/outputs]

## Testing Instructions
- [How to validate context quality]
- [Key test scenarios]
- [Discovery validation tests]

## Known Constraints
- [Token budget considerations]
- [Compaction triggers]
- [Domain boundary limitations]
```

---

## 9A. PF-Core PaaS-CI-CD Engineer Context

### 9A.1 Overview

The **PaaS-CI-CD Engineer Context** defines the infrastructure and deployment pipeline context required for Context Engineering to operate effectively across the platform lifecycle.

### 9A.2 PaaS Engineer Role in Context Engineering

| Responsibility | Context Engineering Intersection |
|---------------|----------------------------------|
| Infrastructure Provisioning | Environment-specific context configurations (dev/staging/prod) |
| CI/CD Pipeline Design | Automated context quality testing in deployment gates |
| Environment Management | Multi-tenant context isolation validation |
| Release Management | Ontology version deployment and rollback procedures |
| Monitoring & Observability | Context performance metrics, token usage tracking |

### 9A.3 PaaS-CI-CD Context Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PaaS-CI-CD CONTEXT LAYER                             │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │  Environment    │  │  Pipeline       │  │  Infrastructure │         │
│  │  Context        │  │  Context        │  │  Context        │         │
│  │                 │  │                 │  │                 │         │
│  │  • Dev/Stage/   │  │  • Build Gates  │  │  • Supabase     │         │
│  │    Prod configs │  │  • Test Gates   │  │    Pooling      │         │
│  │  • Feature      │  │  • Deploy Gates │  │  • Edge         │         │
│  │    Flags        │  │  • Rollback     │  │    Functions    │         │
│  │  • Tenant       │  │    Triggers     │  │  • CDN Config   │         │
│  │    Isolation    │  │                 │  │                 │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT TARGETS                                    │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ Digital     │  │ Vercel      │  │ Supabase    │  │ Claude      │   │
│  │ Ocean       │  │ (Frontend)  │  │ (Backend)   │  │ Agent SDK   │   │
│  │ App Platform│  │             │  │             │  │             │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 9A.4 CI/CD Context Quality Gates

| Gate | Context Validation | Failure Action |
|------|-------------------|----------------|
| **Build Gate** | Ontology schema validation, JSON-LD syntax check | Block build |
| **Unit Test Gate** | Context unit tests (>80% coverage) | Block merge |
| **Integration Test Gate** | Agent-context integration tests | Block staging deploy |
| **Staging Gate** | End-to-end context quality validation | Block production deploy |
| **Production Gate** | Smoke tests, context performance benchmarks | Trigger rollback |

### 9A.5 Environment-Specific Context Configuration

```yaml
# context-config.yaml (example)

environments:
  development:
    context_window_limit: 100000  # Generous for debugging
    compaction_threshold: 80000
    discovery_mode: verbose
    ontology_validation: strict
    
  staging:
    context_window_limit: 150000
    compaction_threshold: 120000
    discovery_mode: standard
    ontology_validation: strict
    
  production:
    context_window_limit: 200000
    compaction_threshold: 160000
    discovery_mode: optimized
    ontology_validation: strict
    token_budget_alerts: true
    
tenant_isolation:
  rls_enforcement: mandatory
  cross_tenant_context: blocked
  audit_logging: enabled
```

### 9A.6 PaaS-CI-CD Ontology Integration

The **ONT-CICD-0001** ontology (see Section 3.3) provides semantic definitions for:

- Deployment pipeline stages and transitions
- Environment configuration schemas
- Infrastructure resource definitions
- Release management workflows
- Monitoring and alerting rules

This enables agents to understand and interact with the deployment pipeline contextually.

---

## 10. Discovery Functions in Context Engineering

### 10.1 The Critical Question

> **Should knowledge search and discovery be part of the Context Engineer's agents when implementing an application or setting the context to design and develop autonomous agents and domain/application-specific agents?**

### 10.2 Analysis: Discovery as Integral to Context Engineering

**Position: YES — Discovery functions are integral to Context Engineering**

#### Arguments FOR Integration:

1. **Context Boundary Definition Requires Discovery**
   - Before an agent can be given context, we must know *what* context is relevant
   - Discovery functions (topic clustering, gap analysis, domain mapping) directly inform boundary decisions
   - Without discovery, context selection becomes guesswork or over-inclusive (token waste)

2. **Anthropic's "Just-in-Time" Context Pattern**
   - Anthropic recommends agents maintain "lightweight identifiers" and "dynamically load data into context at runtime"
   - Discovery functions identify *which* identifiers are worth maintaining
   - Discovery determines *when* to trigger just-in-time loading

3. **Domain Boundary Enforcement Reduces Hallucination**
   - Agents operating without clear domain boundaries may retrieve irrelevant context
   - Discovery establishes semantic relationships that constrain agent behavior
   - Gap detection prevents agents from operating in knowledge voids

4. **OAA Registry Depends on Discovery**
   - Ontology selection requires understanding domain scope
   - Discovery functions feed OAA with domain mapping data
   - Without discovery, ontology selection is static and potentially misaligned

5. **Continuous Context Optimization**
   - Discovery is not one-time; domains evolve, gaps emerge, new relationships form
   - Context Engineers need ongoing discovery to maintain context quality
   - Separating discovery from context engineering creates organizational friction

#### Implementation Model: Discovery Agent as Context Engineering Sub-System

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CONTEXT ENGINEERING SYSTEM                        │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    DISCOVERY LAYER                             │  │
│  │                                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │
│  │  │ Domain      │  │ Gap         │  │ Relationship│           │  │
│  │  │ Mapping     │  │ Detection   │  │ Discovery   │           │  │
│  │  │ Agent       │  │ Agent       │  │ Agent       │           │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │
│  │         │                │                │                   │  │
│  │         └────────────────┼────────────────┘                   │  │
│  │                          ▼                                    │  │
│  │                 ┌─────────────────┐                          │  │
│  │                 │ Context         │                          │  │
│  │                 │ Boundary        │                          │  │
│  │                 │ Definition      │                          │  │
│  │                 └─────────────────┘                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    CONTEXT ASSEMBLY LAYER                      │  │
│  │                                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │
│  │  │ OAA         │  │ Ontology    │  │ Context     │           │  │
│  │  │ Registry    │  │ Selection   │  │ Packaging   │           │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    AGENT CONSUMPTION LAYER                     │  │
│  │                                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │
│  │  │ Domain      │  │ Application │  │ Autonomous  │           │  │
│  │  │ Agents      │  │ Agents      │  │ Agents      │           │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 10.3 Discovery Agent Specifications

| Discovery Agent | Function | Output | Integration Point |
|----------------|----------|--------|-------------------|
| **Domain Mapping Agent** | Analyzes knowledge base to identify topical clusters | Domain boundary definitions | OAA ontology selection |
| **Gap Detection Agent** | Identifies blind spots and missing relationships | Gap reports, bridging recommendations | Context completeness validation |
| **Relationship Discovery Agent** | Extracts entity-relation pairs from unstructured content | Knowledge graph edges | JSONB relationship storage |
| **Boundary Enforcement Agent** | Validates agent queries against defined boundaries | Allow/deny decisions, scope warnings | Runtime context gating |

### 10.4 Discovery Tools Integration

| Tool | Discovery Function | Context Engineering Value |
|------|-------------------|---------------------------|
| **InfraNodus** | Text network analysis, topic clustering, gap detection | Pre-context discovery, blind spot identification |
| **Schema Generator** | Entity extraction, JSON-LD generation | Ontology population, relationship mapping |
| **Supabase pg_graphql** | Relationship queries, path discovery | Real-time relationship retrieval |
| **FalkorDB GraphRAG** | Semantic search, context retrieval | LLM-optimized knowledge retrieval |

### 10.5 Formal Acceptance: Discovery IS Context Engineering

**STATUS: ACCEPTED** — As documented in Section 1.2, this exploration has formally established that Discovery and Scope Definition are integral functions of Context Engineering.

**Key Determinations:**

1. **Discovery Functions** are not optional add-ons but core Context Engineering capabilities
2. **Scope Definition** for potential solutions is a Context Engineer deliverable
3. **Organizational Separation** of discovery from context engineering is explicitly rejected

**Implementation Path:**
1. Integrate InfraNodus MCP server for discovery capabilities
2. Build Discovery Layer agents within Context Engineering system
3. Establish discovery-first workflow: **Discover → Scope → Assemble → Validate**
4. Include discovery tests in TDDD coverage requirements (>80% coverage)
5. Define discovery context in MODULE_CONTEXT.md for each platform module

**TDDD Implications:**
- Discovery validation tests are MANDATORY in all context quality test suites
- Domain boundary accuracy must be measured and tracked
- Gap detection precision is a deployment gate criterion

---

## 11. Appendix: Key Definitions

| Term | Definition |
|------|------------|
| **Context** | The set of tokens included when sampling from a large language model |
| **Context Rot** | Degradation in model recall accuracy as token count increases |
| **Attention Budget** | The finite capacity models have for processing token relationships |
| **Compaction** | Summarizing context and reinitializing a new context window |
| **Right Altitude** | Goldilocks zone between overly prescriptive and overly vague prompts |
| **VSOM** | Vision, Strategy, Objectives & Metrics—top-level strategic context module |
| **OAA Registry** | Ontology Architect Agent Registry for governance and validation |
| **TDDD** | Test-Driven Design, Development & Deployment for AI-augmented applications |
| **Progressive Disclosure** | Agents incrementally discover relevant context through exploration |
| **Just-in-Time Context** | Dynamically loading data into context at runtime using tools |
| **Discovery Functions** | Capabilities that identify domain boundaries, gaps, and relationships |
| **Domain Boundary** | Semantic scope within which an agent's context is constrained |
| **Gap Detection** | Identification of missing relationships or knowledge blind spots |
| **GraphRAG** | Graph Retrieval Augmented Generation—combining knowledge graphs with LLMs |

---

## 12. References

### Anthropic Sources
- [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Building Effective AI Agents](https://www.anthropic.com/research/building-effective-agents)
- [Writing Tools for AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

### PF-CORE Documentation
- PRD_PF_CORE_VSOM_Module_v1.0
- CMO-OKR-ONTOLOGY v3.0.0
- OAA Registry v3.0 Compliance Standards
- Database Schema Complete (JSONB patterns)
- AI Visibility Ontology v1.0.0
- Customer Organization Ontology v1.0.0
- Gap Analysis Ontology v1.1.0

### Graph & Discovery Tools
- [InfraNodus: Text Network Analysis](https://infranodus.com)
- [InfraNodus API & MCP Server](https://infranodus.com/api)
- [InfraNodus GraphRAG for LLM Workflows](https://infranodus.com/use-case/ai-knowledge-graphs)
- [Memgraph: Neo4j Alternative](https://memgraph.com)
- [FalkorDB: GraphRAG-Optimized](https://www.falkordb.com)
- [NebulaGraph: Distributed Graph](https://www.nebula-graph.io)

### External Research
- Context Rot Research (Chroma)
- Transformer Architecture (Attention Is All You Need)
- Paranyushkin, D (2019). InfraNodus: Generating Insight Using Text Network Analysis, WWW'19

---

## 13. Document History & Version Control

| Version | Date | Author | Status | Changes |
|---------|------|--------|--------|---------|
| 1.0.0 | Nov 2025 | PF-CORE Architecture | Released | Initial exploration document |
| 1.1.0 | Nov 2025 | PF-CORE Architecture | Released | Added OAA integration, Knowledge Graphs, Ontology Management Strategy, Discovery Functions |
| 1.1.1 | Nov 2025 | PF-CORE Architecture | Released | Corrected platform hierarchy |
| **1.2.0** | **30 Nov 2025** | **PF-CORE Architecture** | **Current** | Discovery & Scope formally assigned to Context Engineer; Ontology classification with IDs; TDDD expanded; PaaS-CI-CD added; Copyright & Licensing |

### Version Review Schedule

| Review Type | Frequency | Next Review | Responsible |
|-------------|-----------|-------------|-------------|
| Content Review | Quarterly | Q1 2026 | Context Engineering Lead |
| Ontology Alignment | Monthly | Dec 2025 | OAA Registry Owner |
| Technical Accuracy | Per Release | Ongoing | CTO Office |
| License Compliance | Annually | Nov 2026 | Legal/Compliance |

### Approval & Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Context Engineering Lead | | | |
| CTO | | | |
| Platform Architect | | | |

---

## 14. Copyright, Licensing & Legal

### Copyright Notice

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  © 2025 Platform Foundation Core Holdings. All Rights Reserved.         │
│                                                                         │
│  Document ID: PF-CORE-CE-EXP-001                                        │
│  Classification: CONFIDENTIAL - PF-CORE Architecture Team               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### License to PF-Instances

This document and all associated intellectual property are licensed to authorized PF-Instances under the following terms:

| License Type | Grantee | Scope | Restrictions |
|-------------|---------|-------|--------------|
| **Platform License** | AIR, BAIV, W4M, DJM | Full use of PF-CORE Context Engineering framework | No sublicensing without written consent |
| **Sub-Instance License** | Client Deployments | Use within contracted scope | Bound by PF-Instance terms |
| **Whitelabel License** | Approved Partners | Rebranding permitted | Must maintain PF-CORE attribution in technical docs |
| **Co-Branding License** | Joint Ventures | Shared attribution | Subject to co-branding agreement |

### Intellectual Property

- **Ontology Structures:** All ONT-* defined ontologies are proprietary IP of PF-CORE Holdings
- **Context Engineering Framework:** Methodologies described herein are trade secrets
- **Schema.org Extensions:** Custom extensions (baiv:, pf:) are owned by PF-CORE Holdings

### Third-Party Acknowledgments

- **Anthropic:** Context Engineering best practices referenced under fair use for educational purposes
- **Schema.org:** Base vocabulary used under Creative Commons Attribution-ShareAlike License
- **InfraNodus:** Referenced as third-party tool; no endorsement implied

---

**END OF DOCUMENT**

---

*This document is maintained in the PF-CORE documentation repository.*
*For questions or clarifications, contact: architecture@pf-core.io*
