# PF-Core Agent & Tiered Graph Architecture Guide

**Platform Foundation Core - Technical Architecture Specification**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 1.0.0 |
| **Date** | December 2025 |
| **Classification** | Technical Architecture |
| **Status** | APPROVED |
| **Applies To** | BAIV, W4M, AIR Ventures |

---

## Executive Summary

This document defines the architectural patterns, specifications, and guidelines for implementing agents that interact with PF-Core's tiered knowledge graph architecture. It establishes consistent patterns for agent design, tenant boundary enforcement, and graph access control across all Platform Foundation Core ventures.

The tiered graph architecture separates concerns into three distinct layers:

1. **Tier 1: PF-Core Strategic Graph** (Unified, Platform-wide)
2. **Tier 2: Domain Extension Graphs** (Venture-specific: BAIV, W4M, AIR)
3. **Tier 3: Tenant Instance Graphs** (Customer-specific data)

This separation enables maximum knowledge appreciation while maintaining strict security boundaries and IP protection.

---

## Table of Contents

1. [Architectural Principles](#1-architectural-principles)
2. [Tiered Graph Architecture](#2-tiered-graph-architecture)
3. [Agent Authority Model](#3-agent-authority-model)
4. [Tenant Boundary Specification](#4-tenant-boundary-specification)
5. [Agent Design Patterns](#5-agent-design-patterns)
6. [Graph Access Patterns](#6-graph-access-patterns)
7. [Implementation Guidelines](#7-implementation-guidelines)
8. [Security Framework](#8-security-framework)
9. [Testing & Validation](#9-testing--validation)
10. [Appendices](#10-appendices)

---

## 1. Architectural Principles

### 1.1 Core Philosophy

The PF-Core agent architecture is founded on these principles:

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Knowledge Appreciation** | Graphs appreciate with every connection; context depreciates | Unified Tier 1 graph with domain projections |
| **Semantic Understanding** | AI reasons about relationships, not just retrieves content | JSON-LD ontologies grounded in schema.org |
| **Authority Boundaries** | Agents have defined scope of access and action | Role-based graph access controls |
| **Tenant Isolation** | Customer data is physically and logically separated | RLS policies at database level |
| **Transferability** | Modules deploy across ventures without code changes | Configuration-driven behavior |

### 1.2 Design Constraints

All agent implementations MUST adhere to:

- **Single Responsibility**: Each agent has one clearly defined purpose
- **Explicit Dependencies**: Agent dependencies are declared, not inferred
- **Fail-Safe Defaults**: Agents default to minimum required access
- **Audit Trail**: All graph mutations are logged with actor attribution
- **Idempotency**: Agent operations produce consistent results when repeated

### 1.3 Knowledge Graph as Strategic Asset

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ASSET APPRECIATION MODEL                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Context Engineering                Knowledge Graphs                │
│  ┌───────────────────┐            ┌───────────────────┐            │
│  │ ████████░░░░░░░░  │            │ ░░░░░░░░████████  │            │
│  │   DEPRECIATES     │            │    APPRECIATES    │            │
│  │                   │            │                   │            │
│  │ • Token costs ↑   │            │ • Connections ↑   │            │
│  │ • Context limits  │            │ • Insights ↑      │            │
│  │ • Prompt drift    │            │ • Reasoning ↑     │            │
│  └───────────────────┘            └───────────────────┘            │
│                                                                     │
│  STRATEGIC IMPLICATION: Invest in graph foundations, not prompts   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tiered Graph Architecture

### 2.1 Three-Tier Model Overview

The PF-Core graph architecture separates concerns across three tiers, each with distinct characteristics:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TIER 1: PF-CORE STRATEGIC GRAPH                      │
│                    (Unified, Pervasive, Appreciating)                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  • VSOM Ontologies (Vision, Strategy, Objectives, Metrics)       │   │
│  │  • Schema.org Grounded Foundation                                │   │
│  │  • Multi-tenant governance (platform-wide patterns)              │   │
│  │  • Cross-cutting concerns: Auth, Licensing, Audit                │   │
│  │  • OAA Registry v3.0 compliance                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              OWNERSHIP: Platform Holdings               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│  TIER 2: DOMAIN     │   │  TIER 2: DOMAIN     │   │  TIER 2: DOMAIN     │
│  EXTENSION GRAPH    │   │  EXTENSION GRAPH    │   │  EXTENSION GRAPH    │
│  (BAIV)             │   │  (W4M)              │   │  (AIR)              │
│                     │   │                     │   │                     │
│  • AI Visibility    │   │  • Value Eng Deep   │   │  • AI Strategy      │
│  • Universal Brand  │   │  • Implementation   │   │  • Innovation       │
│  • Gap Analysis     │   │  • Program Mgmt     │   │  • Readiness        │
│  • CMO-OKR          │   │  • ROI Tracking     │   │  • Transformation   │
│  • Citation Graphs  │   │  • WBS Graphs       │   │  • Maturity Models  │
│                     │   │                     │   │                     │
│  OWNERSHIP: BAIV JV │   │  OWNERSHIP: W4M JV  │   │  OWNERSHIP: AIR JV  │
└─────────────────────┘   └─────────────────────┘   └─────────────────────┘
          │                         │                         │
          ▼                         ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│  TIER 3: TENANT     │   │  TIER 3: TENANT     │   │  TIER 3: TENANT     │
│  INSTANCE GRAPHS    │   │  INSTANCE GRAPHS    │   │  INSTANCE GRAPHS    │
│                     │   │                     │   │                     │
│  • Customer-specific│   │  • Client-specific  │   │  • Client-specific  │
│    brand graphs     │   │    value chains     │   │    AI roadmaps      │
│  • Competitive      │   │  • Implementation   │   │  • Capability       │
│    intelligence     │   │    progress graphs  │   │    assessments      │
│  • Discovery paths  │   │  • Resource alloc   │   │  • Innovation       │
│                     │   │                     │   │    portfolios       │
│                     │   │                     │   │                     │
│  OWNERSHIP: Tenant  │   │  OWNERSHIP: Tenant  │   │  OWNERSHIP: Tenant  │
└─────────────────────┘   └─────────────────────┘   └─────────────────────┘
```

### 2.2 Tier Characteristics

| Tier | Scope | Mutability | Ownership | Access Pattern |
|------|-------|------------|-----------|----------------|
| **Tier 1** | Platform-wide | Low (governance controlled) | Platform Holdings | Read: All agents; Write: Platform admins only |
| **Tier 2** | Venture-specific | Medium (venture controlled) | Joint Ventures | Read: Domain agents; Write: Domain admins |
| **Tier 3** | Tenant-specific | High (tenant controlled) | Tenant | Read/Write: Tenant-authorized agents |

### 2.3 Data Flow Between Tiers

```
┌────────────────────────────────────────────────────────────────────┐
│                     TIER DATA FLOW PATTERNS                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  DOWNWARD INHERITANCE (Tier 1 → Tier 2 → Tier 3)                  │
│  ─────────────────────────────────────────────────                │
│  • Strategic context flows down                                    │
│  • Ontology schemas are inherited                                  │
│  • Validation rules cascade                                        │
│  • Templates propagate                                             │
│                                                                    │
│  UPWARD AGGREGATION (Tier 3 → Tier 2 → Tier 1)                    │
│  ─────────────────────────────────────────────                    │
│  • Anonymized patterns bubble up                                   │
│  • Usage metrics aggregate                                         │
│  • Best practices emerge                                           │
│  • NO tenant data leaks upward                                     │
│                                                                    │
│  LATERAL ISOLATION (Within Tiers)                                  │
│  ──────────────────────────────                                   │
│  • Tier 2: BAIV ≠ W4M ≠ AIR (no cross-domain access)             │
│  • Tier 3: Tenant A ≠ Tenant B (RLS enforced)                     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 2.4 Graph Node Structure

All graph nodes follow this canonical structure:

```json
{
  "@context": {
    "schema": "https://schema.org/",
    "pf": "https://platform-foundation.io/ontology/",
    "tier": "https://platform-foundation.io/tiers/"
  },
  "@type": "pf:GraphNode",
  "@id": "urn:pf:node:{uuid}",
  "tier": "tier:1|tier:2|tier:3",
  "domain": "pf-core|baiv|w4m|air",
  "tenant_id": "uuid|null",
  "node_type": "string",
  "properties": {
    "// domain-specific properties"
  },
  "metadata": {
    "created_at": "ISO8601",
    "created_by": "agent_id|user_id",
    "updated_at": "ISO8601",
    "version": "semver",
    "audit_trail": []
  }
}
```

---

## 3. Agent Authority Model

### 3.1 Authority Boundary Definition

Every agent MUST declare its authority boundaries explicitly:

```typescript
/**
 * Agent Authority Boundary Specification
 * Defines the scope of an agent's access and actions
 */
interface AgentAuthorityBoundary {
  // Identity
  agent_id: string;
  agent_type: AgentType;
  venture_domain: 'pf-core' | 'baiv' | 'w4m' | 'air';
  
  // Tier Access
  tier1_access: {
    read: boolean;
    write: boolean;
    node_types: string[];  // Specific node types accessible
  };
  
  tier2_access: {
    domains: ('baiv' | 'w4m' | 'air')[];  // Which domains
    read: boolean;
    write: boolean;
    node_types: string[];
  };
  
  tier3_access: {
    tenant_scope: 'current' | 'specified' | 'all';
    read: boolean;
    write: boolean;
    node_types: string[];
  };
  
  // Action Permissions
  allowed_actions: AgentAction[];
  prohibited_actions: AgentAction[];
  
  // Resource Limits
  max_nodes_per_query: number;
  max_traversal_depth: number;
  rate_limit_per_minute: number;
}

enum AgentType {
  ORCHESTRATOR = 'orchestrator',
  DOMAIN_SPECIALIST = 'domain_specialist',
  UTILITY = 'utility',
  INTEGRATION = 'integration'
}

enum AgentAction {
  GRAPH_READ = 'graph_read',
  GRAPH_WRITE = 'graph_write',
  GRAPH_DELETE = 'graph_delete',
  EDGE_CREATE = 'edge_create',
  EDGE_DELETE = 'edge_delete',
  TRAVERSE_UP = 'traverse_up',
  TRAVERSE_DOWN = 'traverse_down',
  TRAVERSE_LATERAL = 'traverse_lateral',
  AGGREGATE = 'aggregate',
  EXPORT = 'export'
}
```

### 3.2 Agent Classification Matrix

```
┌───────────────────────────────────────────────────────────────────────────┐
│                    AGENT CLASSIFICATION MATRIX                            │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  CLASS 1: PLATFORM ORCHESTRATORS                                          │
│  ───────────────────────────────                                         │
│  • Master Orchestrator Agent                                              │
│  • Cross-venture coordination                                             │
│  • Tier 1: READ + limited WRITE                                          │
│  • Tier 2: READ across all domains                                       │
│  • Tier 3: NO direct access (delegates to domain agents)                 │
│                                                                           │
│  CLASS 2: DOMAIN AGENTS                                                   │
│  ─────────────────────                                                   │
│  • Strategic Context Agent (VSOM)                                         │
│  • Health Monitor Agent                                                   │
│  • Tier 1: READ only                                                     │
│  • Tier 2: READ + WRITE (own domain only)                                │
│  • Tier 3: READ + WRITE (tenant-scoped)                                  │
│                                                                           │
│  CLASS 3: SPECIALIST AGENTS                                               │
│  ─────────────────────────                                               │
│  • Content Strategy Agent (BAIV)                                          │
│  • Value Engineering Agent (W4M)                                          │
│  • Tier 1: READ only (strategic context)                                 │
│  • Tier 2: READ + WRITE (own domain only)                                │
│  • Tier 3: READ + WRITE (tenant-scoped)                                  │
│                                                                           │
│  CLASS 4: UTILITY AGENTS                                                  │
│  ──────────────────────                                                  │
│  • Schema Generator Agent                                                 │
│  • Report Generator Agent                                                 │
│  • Tier 1: READ only                                                     │
│  • Tier 2: READ only                                                     │
│  • Tier 3: READ + WRITE (tenant-scoped)                                  │
│                                                                           │
│  CLASS 5: INTEGRATION AGENTS                                              │
│  ──────────────────────────                                              │
│  • MCP Bridge Agents                                                      │
│  • External API Agents                                                    │
│  • Tier 1: NO access                                                     │
│  • Tier 2: NO access                                                     │
│  • Tier 3: READ + WRITE (tenant-scoped, specific node types)             │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Authority Inheritance Rules

```
RULE 1: DENY BY DEFAULT
────────────────────────
An agent has NO access unless explicitly granted.

RULE 2: LEAST PRIVILEGE
────────────────────────
Agents receive minimum required access for their function.

RULE 3: NO PRIVILEGE ESCALATION
───────────────────────────────
An agent cannot grant permissions it does not possess.

RULE 4: TENANT BOUNDARY SUPREMACY
─────────────────────────────────
RLS policies override all agent permissions.
Even if an agent has Tier 3 WRITE, RLS limits to current tenant.

RULE 5: AUDIT EVERYTHING
────────────────────────
All authority boundary crossings are logged.
```

---

## 4. Tenant Boundary Specification

### 4.1 Multi-Tenant Isolation Model

```
┌────────────────────────────────────────────────────────────────────────┐
│                    TENANT ISOLATION ARCHITECTURE                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  APPLICATION LAYER                                                     │
│  ─────────────────                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Agent Request → Tenant Context Injection → Authority Check      │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                              │                                         │
│                              ▼                                         │
│  DATABASE LAYER                                                        │
│  ──────────────                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  SET app.current_tenant_id = '{tenant_uuid}'                     │  │
│  │                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────┐    │  │
│  │  │  RLS POLICY (Automatic, Mandatory)                       │    │  │
│  │  │  ─────────────────────────────────                      │    │  │
│  │  │  USING (tenant_id = current_setting('app.current_tenant_id')  │  │
│  │  │         ::UUID)                                          │    │  │
│  │  └─────────────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                              │                                         │
│                              ▼                                         │
│  RESULT: Only tenant's data visible, regardless of query              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Tenant Context Injection

Every agent operation MUST include tenant context:

```python
from dataclasses import dataclass
from typing import Optional
from uuid import UUID

@dataclass
class TenantContext:
    """
    Immutable tenant context for all agent operations.
    Injected at the start of every request.
    """
    tenant_id: UUID
    venture_domain: str  # 'baiv' | 'w4m' | 'air'
    user_id: Optional[UUID]
    user_role: str  # 'owner' | 'admin' | 'member' | 'viewer'
    session_id: str
    
    def to_db_context(self) -> dict:
        """Generate database context settings."""
        return {
            'app.current_tenant_id': str(self.tenant_id),
            'app.current_venture': self.venture_domain,
            'app.current_user_id': str(self.user_id) if self.user_id else None,
            'app.current_role': self.user_role,
            'app.session_id': self.session_id
        }
    
    def validate(self) -> bool:
        """Validate tenant context integrity."""
        if not self.tenant_id:
            raise ValueError("tenant_id is required")
        if self.venture_domain not in ['baiv', 'w4m', 'air']:
            raise ValueError(f"Invalid venture_domain: {self.venture_domain}")
        return True
```

### 4.3 Cross-Tenant Operations (Prohibited Patterns)

```
┌────────────────────────────────────────────────────────────────────────┐
│                    PROHIBITED CROSS-TENANT PATTERNS                    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ❌ PROHIBITED: Direct cross-tenant queries                           │
│  ──────────────────────────────────────                               │
│  SELECT * FROM graph_nodes WHERE tenant_id IN (tenant_a, tenant_b)    │
│                                                                        │
│  ❌ PROHIBITED: Tenant ID override attempts                           │
│  ────────────────────────────────────────                             │
│  SET app.current_tenant_id = 'different_tenant'  -- Blocked by auth   │
│                                                                        │
│  ❌ PROHIBITED: Graph edges crossing tenant boundaries                │
│  ──────────────────────────────────────────────                       │
│  CREATE EDGE FROM tenant_a.node TO tenant_b.node  -- Constraint fails │
│                                                                        │
│  ❌ PROHIBITED: Aggregate queries without anonymization               │
│  ──────────────────────────────────────────────────                   │
│  SELECT tenant_id, COUNT(*) FROM graph_nodes GROUP BY tenant_id       │
│                                                                        │
│  ✅ PERMITTED: Platform-level anonymized aggregation                  │
│  ──────────────────────────────────────────────                       │
│  SELECT venture_domain, COUNT(*) FROM usage_metrics                   │
│  WHERE aggregation_level = 'anonymized'                               │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Tenant Data Lifecycle

```
┌────────────────────────────────────────────────────────────────────────┐
│                    TENANT DATA LIFECYCLE                               │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  CREATION                                                              │
│  ────────                                                             │
│  1. Tenant record created in tenants table                            │
│  2. Tenant-specific graph namespace initialized                       │
│  3. Default Tier 2 → Tier 3 inheritance applied                       │
│  4. Initial VSOM context scaffold created                             │
│                                                                        │
│  OPERATION                                                             │
│  ─────────                                                            │
│  • All operations scoped by RLS                                        │
│  • Audit trail maintained                                              │
│  • Version history preserved                                           │
│                                                                        │
│  EXPORT                                                                │
│  ──────                                                               │
│  • Full JSON-LD export available                                       │
│  • Includes all Tier 3 data                                           │
│  • Excludes Tier 1/2 platform IP                                      │
│                                                                        │
│  DELETION                                                              │
│  ────────                                                             │
│  1. Soft delete: status = 'inactive'                                  │
│  2. Data retention period (configurable, default 90 days)             │
│  3. Hard delete: CASCADE removes all tenant data                      │
│  4. Audit log retained separately                                      │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Agent Design Patterns

### 5.1 Agent Specification Template

Every agent MUST be specified using this template:

```yaml
# Agent Specification Template
# Version: 1.0.0

agent:
  metadata:
    id: "agent-{domain}-{function}-{version}"
    name: "Human Readable Name"
    description: "Detailed description of agent purpose and capabilities"
    version: "1.0.0"
    domain: "baiv|w4m|air|pf-core"
    classification: "orchestrator|domain_specialist|utility|integration"
    
  authority:
    tier1:
      read: true|false
      write: true|false
      node_types: ["vsom_vision", "vsom_strategy"]
      
    tier2:
      domains: ["baiv", "w4m"]
      read: true|false
      write: true|false
      node_types: ["ai_visibility", "brand", "gap_analysis"]
      
    tier3:
      tenant_scope: "current|specified|all"
      read: true|false
      write: true|false
      node_types: ["customer_brand", "discovery_path"]
      
    actions:
      allowed:
        - "graph_read"
        - "graph_write"
        - "edge_create"
      prohibited:
        - "graph_delete"
        - "traverse_up"  # Cannot access higher tiers
        
    limits:
      max_nodes_per_query: 100
      max_traversal_depth: 3
      rate_limit_per_minute: 60
      
  dependencies:
    required_agents: ["agent-pf-core-context-1.0"]
    optional_agents: ["agent-baiv-content-1.0"]
    external_services: []
    
  inputs:
    - name: "tenant_context"
      type: "TenantContext"
      required: true
    - name: "query_parameters"
      type: "object"
      schema: "QueryParametersSchema"
      required: true
      
  outputs:
    - name: "result"
      type: "GraphQueryResult"
      schema: "GraphQueryResultSchema"
      
  behaviors:
    on_error: "retry|fail|escalate"
    retry_count: 3
    timeout_seconds: 30
    idempotent: true|false
    
  testing:
    required_coverage: 85
    test_suites: ["unit", "integration", "authority_boundary"]
```

### 5.2 Standard Agent Patterns

#### Pattern 1: Strategic Context Consumer

```python
"""
Pattern: Strategic Context Consumer
Purpose: Agent that reads VSOM context to inform decisions
Tier Access: Tier 1 READ, Tier 2 READ, Tier 3 READ/WRITE
"""

class StrategicContextConsumer(BaseAgent):
    """
    Base class for agents that consume strategic context
    from Tier 1 VSOM graph to inform domain-specific operations.
    """
    
    authority = AgentAuthorityBoundary(
        agent_id="template-strategic-consumer",
        agent_type=AgentType.DOMAIN_SPECIALIST,
        venture_domain="baiv",
        tier1_access={
            "read": True,
            "write": False,
            "node_types": ["vsom_vision", "vsom_strategy", "vsom_objective", "vsom_metric"]
        },
        tier2_access={
            "domains": ["baiv"],
            "read": True,
            "write": True,
            "node_types": ["*"]  # All domain nodes
        },
        tier3_access={
            "tenant_scope": "current",
            "read": True,
            "write": True,
            "node_types": ["*"]
        },
        allowed_actions=[
            AgentAction.GRAPH_READ,
            AgentAction.GRAPH_WRITE,
            AgentAction.EDGE_CREATE,
            AgentAction.TRAVERSE_DOWN
        ],
        prohibited_actions=[
            AgentAction.GRAPH_DELETE,
            AgentAction.TRAVERSE_UP  # Cannot access platform-level
        ],
        max_nodes_per_query=100,
        max_traversal_depth=4,
        rate_limit_per_minute=60
    )
    
    async def get_strategic_context(
        self,
        tenant_context: TenantContext
    ) -> StrategicContext:
        """
        Retrieve VSOM context for strategic alignment.
        Automatically scoped to tenant's view of Tier 1.
        """
        # Tier 1 query (read-only, platform patterns)
        tier1_context = await self.graph_client.query(
            tier="tier1",
            node_types=["vsom_vision", "vsom_strategy"],
            filters={"active": True},
            depth=2
        )
        
        # Tier 2 query (domain-specific extensions)
        tier2_context = await self.graph_client.query(
            tier="tier2",
            domain=self.authority.venture_domain,
            node_types=["okr", "gap_analysis"],
            tenant_context=tenant_context,
            depth=2
        )
        
        return StrategicContext(
            vision=tier1_context.get("vsom_vision"),
            strategies=tier1_context.get("vsom_strategy"),
            okrs=tier2_context.get("okr"),
            gaps=tier2_context.get("gap_analysis")
        )
```

#### Pattern 2: Tenant-Scoped Writer

```python
"""
Pattern: Tenant-Scoped Writer
Purpose: Agent that writes to Tier 3 tenant graphs
Tier Access: Tier 1 READ, Tier 2 READ, Tier 3 READ/WRITE
"""

class TenantScopedWriter(BaseAgent):
    """
    Base class for agents that write tenant-specific data.
    All writes are automatically scoped to current tenant via RLS.
    """
    
    async def write_to_tenant_graph(
        self,
        tenant_context: TenantContext,
        node: GraphNode,
        validate: bool = True
    ) -> GraphNode:
        """
        Write a node to the tenant's Tier 3 graph.
        
        Args:
            tenant_context: Required tenant context
            node: Node to write
            validate: Whether to validate against ontology
            
        Returns:
            Created/updated node with ID
        """
        # Validate tenant context
        tenant_context.validate()
        
        # Validate node against ontology if requested
        if validate:
            await self.validate_node(node, tenant_context)
        
        # Set tenant ownership
        node.tenant_id = tenant_context.tenant_id
        node.tier = "tier3"
        node.domain = tenant_context.venture_domain
        
        # Add audit metadata
        node.metadata.created_by = tenant_context.user_id
        node.metadata.created_at = datetime.utcnow().isoformat()
        
        # Write with RLS context
        async with self.db_client.tenant_context(tenant_context):
            result = await self.db_client.upsert_node(node)
            
        # Log audit trail
        await self.audit_logger.log(
            action="node_write",
            agent_id=self.authority.agent_id,
            tenant_id=tenant_context.tenant_id,
            node_id=result.id,
            node_type=node.node_type
        )
        
        return result
```

#### Pattern 3: Cross-Domain Reader

```python
"""
Pattern: Cross-Domain Reader
Purpose: Agent that reads across multiple Tier 2 domains
Tier Access: Tier 1 READ, Tier 2 READ (multiple), Tier 3 READ
Use Case: Platform-level insights, cross-venture analysis
"""

class CrossDomainReader(BaseAgent):
    """
    Restricted agent class for platform-level analysis.
    Can read across domains but CANNOT write.
    """
    
    authority = AgentAuthorityBoundary(
        agent_id="platform-cross-domain-reader",
        agent_type=AgentType.ORCHESTRATOR,
        venture_domain="pf-core",
        tier1_access={
            "read": True,
            "write": False,
            "node_types": ["*"]
        },
        tier2_access={
            "domains": ["baiv", "w4m", "air"],  # All domains
            "read": True,
            "write": False,  # READ ONLY
            "node_types": ["*"]
        },
        tier3_access={
            "tenant_scope": "none",  # NO tenant data access
            "read": False,
            "write": False,
            "node_types": []
        },
        allowed_actions=[
            AgentAction.GRAPH_READ,
            AgentAction.AGGREGATE  # Can aggregate across domains
        ],
        prohibited_actions=[
            AgentAction.GRAPH_WRITE,
            AgentAction.GRAPH_DELETE,
            AgentAction.EXPORT
        ],
        max_nodes_per_query=1000,
        max_traversal_depth=5,
        rate_limit_per_minute=30
    )
    
    async def analyze_cross_domain_patterns(
        self,
        pattern_type: str
    ) -> DomainAnalysis:
        """
        Analyze patterns across Tier 2 domains.
        NO tenant data is accessed.
        """
        results = {}
        
        for domain in self.authority.tier2_access["domains"]:
            domain_patterns = await self.graph_client.query(
                tier="tier2",
                domain=domain,
                node_types=["pattern", "template", "best_practice"],
                filters={"visibility": "platform"},  # Only platform-visible nodes
                aggregation=True
            )
            results[domain] = domain_patterns
            
        return DomainAnalysis(
            patterns=results,
            cross_domain_insights=self._identify_commonalities(results)
        )
```

### 5.3 Anti-Patterns (What NOT to Do)

```
┌────────────────────────────────────────────────────────────────────────┐
│                    AGENT ANTI-PATTERNS                                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ❌ ANTI-PATTERN 1: God Agent                                         │
│  ────────────────────────────                                         │
│  An agent with ALL permissions across ALL tiers.                      │
│  WHY BAD: Violates least privilege, audit nightmare, security risk    │
│                                                                        │
│  ❌ ANTI-PATTERN 2: Implicit Tenant Context                           │
│  ───────────────────────────────────────────                          │
│  Assuming tenant context from environment without validation.          │
│  WHY BAD: Context injection attacks, data leakage                     │
│                                                                        │
│  ❌ ANTI-PATTERN 3: Hardcoded Authority                               │
│  ──────────────────────────────────                                   │
│  Authority boundaries defined in code rather than config.              │
│  WHY BAD: Requires code changes to adjust permissions                  │
│                                                                        │
│  ❌ ANTI-PATTERN 4: Synchronous Graph Traversal                       │
│  ───────────────────────────────────────────                          │
│  Blocking calls through deep graph traversals.                         │
│  WHY BAD: Performance bottlenecks, timeout risks                      │
│                                                                        │
│  ❌ ANTI-PATTERN 5: Write-Then-Read Assumptions                       │
│  ─────────────────────────────────────────────                        │
│  Assuming immediate consistency after writes.                          │
│  WHY BAD: Eventual consistency may cause stale reads                  │
│                                                                        │
│  ❌ ANTI-PATTERN 6: Tenant ID in URLs/Parameters                      │
│  ───────────────────────────────────────────                          │
│  Exposing tenant_id in API routes or query params.                    │
│  WHY BAD: IDOR vulnerabilities, enumeration attacks                   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Graph Access Patterns

### 6.1 Query Patterns by Tier

```
┌────────────────────────────────────────────────────────────────────────┐
│                    GRAPH QUERY PATTERNS                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  TIER 1 QUERIES (Strategic Context)                                    │
│  ──────────────────────────────────                                   │
│  Purpose: Get platform-wide strategic framework                        │
│  Pattern: Read-only, cached, shared across tenants                    │
│                                                                        │
│  // Get VSOM context for alignment                                     │
│  SELECT * FROM graph_nodes                                             │
│  WHERE tier = 'tier1'                                                  │
│  AND node_type IN ('vsom_vision', 'vsom_strategy')                    │
│  AND status = 'active';                                               │
│                                                                        │
│  TIER 2 QUERIES (Domain Extensions)                                    │
│  ─────────────────────────────────                                    │
│  Purpose: Get domain-specific ontologies and patterns                  │
│  Pattern: Read or write, domain-scoped, may be tenant-projected       │
│                                                                        │
│  // Get BAIV ontologies                                                │
│  SELECT * FROM graph_nodes                                             │
│  WHERE tier = 'tier2'                                                  │
│  AND domain = 'baiv'                                                   │
│  AND node_type IN ('ai_visibility', 'universal_brand');               │
│                                                                        │
│  TIER 3 QUERIES (Tenant Data)                                          │
│  ────────────────────────────                                         │
│  Purpose: Get/set customer-specific data                               │
│  Pattern: Read/write, RLS-enforced, tenant-isolated                   │
│                                                                        │
│  // Get tenant's brand graph (RLS automatically filters)               │
│  SELECT * FROM graph_nodes                                             │
│  WHERE tier = 'tier3'                                                  │
│  AND node_type = 'customer_brand';                                    │
│  -- tenant_id filter applied by RLS policy                            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Graph Traversal Patterns

```python
"""
Graph Traversal Patterns for Tiered Architecture
"""

class GraphTraversalPatterns:
    """
    Standard traversal patterns respecting tier boundaries.
    """
    
    async def traverse_down(
        self,
        start_node: GraphNode,
        tenant_context: TenantContext,
        max_depth: int = 3
    ) -> TraversalResult:
        """
        Pattern: Top-Down Traversal
        Direction: Tier 1 → Tier 2 → Tier 3
        Use Case: Strategic alignment checks, context propagation
        
        Example: Given a Tier 1 Strategy node, find all related
        Tier 2 OKRs and Tier 3 implementations.
        """
        results = []
        
        # Start from Tier 1 strategic node
        tier1_children = await self.graph_client.get_children(
            node_id=start_node.id,
            relationship_types=["supports", "implements", "aligns_with"],
            target_tier="tier2"
        )
        
        for tier2_node in tier1_children:
            # Get Tier 3 tenant implementations
            tier3_children = await self.graph_client.get_children(
                node_id=tier2_node.id,
                relationship_types=["implements", "tracks"],
                target_tier="tier3",
                tenant_context=tenant_context  # RLS applied
            )
            results.append({
                "tier2": tier2_node,
                "tier3_implementations": tier3_children
            })
            
        return TraversalResult(
            start_node=start_node,
            path="down",
            depth=max_depth,
            results=results
        )
    
    async def traverse_lateral(
        self,
        start_node: GraphNode,
        tenant_context: TenantContext,
        relationship_types: List[str]
    ) -> TraversalResult:
        """
        Pattern: Lateral Traversal
        Direction: Within same tier
        Use Case: Finding related entities, dependency mapping
        
        Example: Given a Gap Analysis node, find related
        Content Strategy and Citation Pattern nodes.
        """
        # Lateral traversal stays within same tier
        related_nodes = await self.graph_client.get_related(
            node_id=start_node.id,
            relationship_types=relationship_types,
            same_tier=True,
            tenant_context=tenant_context
        )
        
        return TraversalResult(
            start_node=start_node,
            path="lateral",
            tier=start_node.tier,
            results=related_nodes
        )
    
    async def traverse_up_restricted(
        self,
        start_node: GraphNode,
        authority: AgentAuthorityBoundary
    ) -> TraversalResult:
        """
        Pattern: Bottom-Up Traversal (Restricted)
        Direction: Tier 3 → Tier 2 → Tier 1
        Use Case: Context enrichment, strategic alignment validation
        
        RESTRICTION: Most agents cannot traverse up.
        This pattern is for specific orchestrator agents only.
        """
        if AgentAction.TRAVERSE_UP not in authority.allowed_actions:
            raise PermissionError(
                f"Agent {authority.agent_id} not authorized for upward traversal"
            )
        
        # Get parent nodes in higher tier
        tier2_parents = await self.graph_client.get_parents(
            node_id=start_node.id,
            relationship_types=["implements", "derived_from"],
            target_tier="tier2"
        )
        
        tier1_parents = []
        for tier2_node in tier2_parents:
            parents = await self.graph_client.get_parents(
                node_id=tier2_node.id,
                relationship_types=["supports", "aligns_with"],
                target_tier="tier1"
            )
            tier1_parents.extend(parents)
            
        return TraversalResult(
            start_node=start_node,
            path="up",
            tier2_context=tier2_parents,
            tier1_context=tier1_parents
        )
```

### 6.3 Edge Creation Rules

```
┌────────────────────────────────────────────────────────────────────────┐
│                    GRAPH EDGE CREATION RULES                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  RULE 1: DOWNWARD EDGES (Higher → Lower Tier)                         │
│  ─────────────────────────────────────────────                        │
│  ✅ ALLOWED: Tier 1 → Tier 2 (strategy to domain)                     │
│  ✅ ALLOWED: Tier 2 → Tier 3 (domain to tenant)                       │
│  ✅ ALLOWED: Tier 1 → Tier 3 (direct strategic link)                  │
│                                                                        │
│  RULE 2: UPWARD EDGES (Lower → Higher Tier)                           │
│  ─────────────────────────────────────────                            │
│  ⚠️  RESTRICTED: Tier 3 → Tier 2 (requires orchestrator)              │
│  ⚠️  RESTRICTED: Tier 2 → Tier 1 (platform admin only)                │
│  ❌ PROHIBITED: Tier 3 → Tier 1 (no skip-level up)                    │
│                                                                        │
│  RULE 3: LATERAL EDGES (Same Tier)                                    │
│  ─────────────────────────────                                        │
│  ✅ ALLOWED: Within same tier AND same domain                         │
│  ⚠️  RESTRICTED: Same tier, different domain (orchestrator only)      │
│  ❌ PROHIBITED: Cross-tenant lateral edges in Tier 3                  │
│                                                                        │
│  RULE 4: EDGE VALIDATION                                              │
│  ────────────────────────                                             │
│  • Both nodes must exist                                               │
│  • Relationship type must be valid for node types                      │
│  • Tenant boundaries must be respected                                 │
│  • Circular references prevented                                       │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Guidelines

### 7.1 Database Schema for Tiered Graphs

```sql
-- ============================================================================
-- PF-CORE TIERED GRAPH SCHEMA
-- ============================================================================

-- Graph Nodes Table (All Tiers)
CREATE TABLE pf_graph_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Tier Classification
    tier VARCHAR(10) NOT NULL CHECK (tier IN ('tier1', 'tier2', 'tier3')),
    domain VARCHAR(20) NOT NULL CHECK (domain IN ('pf-core', 'baiv', 'w4m', 'air')),
    
    -- Tenant Scope (NULL for Tier 1, optional for Tier 2, required for Tier 3)
    tenant_id UUID REFERENCES tenants(id),
    
    -- Node Classification
    node_type VARCHAR(100) NOT NULL,
    
    -- JSON-LD Content
    properties JSONB NOT NULL DEFAULT '{}',
    
    -- Ontology Reference
    ontology_ref VARCHAR(255),
    ontology_version VARCHAR(20),
    
    -- Status & Lifecycle
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived', 'deleted')),
    visibility VARCHAR(20) DEFAULT 'tenant' CHECK (visibility IN ('platform', 'domain', 'tenant', 'private')),
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID,
    version INTEGER DEFAULT 1,
    
    -- Constraints
    CONSTRAINT tier_tenant_check CHECK (
        (tier = 'tier1' AND tenant_id IS NULL) OR
        (tier = 'tier2') OR  -- tenant_id optional
        (tier = 'tier3' AND tenant_id IS NOT NULL)
    ),
    
    CONSTRAINT domain_tier_check CHECK (
        (tier = 'tier1' AND domain = 'pf-core') OR
        (tier IN ('tier2', 'tier3'))
    )
);

-- Graph Edges Table
CREATE TABLE pf_graph_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationship
    source_node_id UUID NOT NULL REFERENCES pf_graph_nodes(id) ON DELETE CASCADE,
    target_node_id UUID NOT NULL REFERENCES pf_graph_nodes(id) ON DELETE CASCADE,
    relationship_type VARCHAR(100) NOT NULL,
    
    -- Tier Tracking (for query optimization)
    source_tier VARCHAR(10) NOT NULL,
    target_tier VARCHAR(10) NOT NULL,
    
    -- Tenant Scope (for RLS)
    tenant_id UUID REFERENCES tenants(id),
    
    -- Edge Properties
    weight DECIMAL(5,4) DEFAULT 1.0,
    properties JSONB DEFAULT '{}',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    
    -- Prevent duplicate edges
    UNIQUE(source_node_id, target_node_id, relationship_type),
    
    -- Prevent self-referential edges
    CHECK (source_node_id != target_node_id)
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE pf_graph_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_graph_edges ENABLE ROW LEVEL SECURITY;

-- Tier 1: Platform-wide read, restricted write
CREATE POLICY tier1_read ON pf_graph_nodes
    FOR SELECT
    USING (tier = 'tier1');

CREATE POLICY tier1_write ON pf_graph_nodes
    FOR ALL
    USING (
        tier = 'tier1' AND
        current_setting('app.user_role', true) = 'platform_admin'
    );

-- Tier 2: Domain-scoped read, domain admin write
CREATE POLICY tier2_read ON pf_graph_nodes
    FOR SELECT
    USING (
        tier = 'tier2' AND
        domain = current_setting('app.current_venture', true)
    );

CREATE POLICY tier2_write ON pf_graph_nodes
    FOR ALL
    USING (
        tier = 'tier2' AND
        domain = current_setting('app.current_venture', true) AND
        current_setting('app.user_role', true) IN ('domain_admin', 'platform_admin')
    );

-- Tier 3: Tenant-isolated
CREATE POLICY tier3_isolation ON pf_graph_nodes
    FOR ALL
    USING (
        tier = 'tier3' AND
        tenant_id = current_setting('app.current_tenant_id')::UUID
    );

-- Edge policies follow source node permissions
CREATE POLICY edge_source_policy ON pf_graph_edges
    FOR ALL
    USING (
        tenant_id IS NULL OR
        tenant_id = current_setting('app.current_tenant_id')::UUID
    );

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_nodes_tier ON pf_graph_nodes(tier);
CREATE INDEX idx_nodes_domain ON pf_graph_nodes(domain);
CREATE INDEX idx_nodes_tenant ON pf_graph_nodes(tenant_id) WHERE tenant_id IS NOT NULL;
CREATE INDEX idx_nodes_type ON pf_graph_nodes(node_type);
CREATE INDEX idx_nodes_properties ON pf_graph_nodes USING GIN(properties);

CREATE INDEX idx_edges_source ON pf_graph_edges(source_node_id);
CREATE INDEX idx_edges_target ON pf_graph_edges(target_node_id);
CREATE INDEX idx_edges_type ON pf_graph_edges(relationship_type);
CREATE INDEX idx_edges_tiers ON pf_graph_edges(source_tier, target_tier);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to validate edge creation rules
CREATE OR REPLACE FUNCTION validate_edge_creation()
RETURNS TRIGGER AS $$
DECLARE
    source_node pf_graph_nodes%ROWTYPE;
    target_node pf_graph_nodes%ROWTYPE;
BEGIN
    SELECT * INTO source_node FROM pf_graph_nodes WHERE id = NEW.source_node_id;
    SELECT * INTO target_node FROM pf_graph_nodes WHERE id = NEW.target_node_id;
    
    -- Rule: No cross-tenant edges in Tier 3
    IF source_node.tier = 'tier3' AND target_node.tier = 'tier3' THEN
        IF source_node.tenant_id != target_node.tenant_id THEN
            RAISE EXCEPTION 'Cross-tenant edges not permitted in Tier 3';
        END IF;
    END IF;
    
    -- Rule: No skip-level upward edges (Tier 3 → Tier 1)
    IF source_node.tier = 'tier3' AND target_node.tier = 'tier1' THEN
        RAISE EXCEPTION 'Skip-level upward edges not permitted (Tier 3 → Tier 1)';
    END IF;
    
    -- Store tier info for indexing
    NEW.source_tier := source_node.tier;
    NEW.target_tier := target_node.tier;
    NEW.tenant_id := COALESCE(source_node.tenant_id, target_node.tenant_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER edge_validation_trigger
    BEFORE INSERT ON pf_graph_edges
    FOR EACH ROW
    EXECUTE FUNCTION validate_edge_creation();
```

### 7.2 Agent Base Class Implementation

```python
"""
PF-Core Agent Base Class
Implements tiered graph access with authority enforcement.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from uuid import UUID
import asyncio

from .authority import AgentAuthorityBoundary, AgentAction
from .context import TenantContext
from .graph_client import GraphClient
from .audit import AuditLogger


class BaseAgent(ABC):
    """
    Abstract base class for all PF-Core agents.
    Enforces authority boundaries and tenant isolation.
    """
    
    # Subclasses MUST define authority
    authority: AgentAuthorityBoundary
    
    def __init__(
        self,
        graph_client: GraphClient,
        audit_logger: AuditLogger
    ):
        self.graph_client = graph_client
        self.audit_logger = audit_logger
        self._validate_authority()
    
    def _validate_authority(self):
        """Validate that authority boundary is properly defined."""
        if not hasattr(self, 'authority') or self.authority is None:
            raise ValueError(
                f"Agent {self.__class__.__name__} must define authority boundary"
            )
        
        # Validate authority configuration
        if not self.authority.agent_id:
            raise ValueError("Agent must have an agent_id")
        
        if self.authority.venture_domain not in ['pf-core', 'baiv', 'w4m', 'air']:
            raise ValueError(f"Invalid venture_domain: {self.authority.venture_domain}")
    
    async def execute(
        self,
        tenant_context: TenantContext,
        **kwargs
    ) -> Any:
        """
        Main execution method with authority enforcement.
        """
        # Validate tenant context
        tenant_context.validate()
        
        # Log execution start
        await self.audit_logger.log_execution_start(
            agent_id=self.authority.agent_id,
            tenant_id=tenant_context.tenant_id,
            parameters=kwargs
        )
        
        try:
            # Execute agent-specific logic
            result = await self._execute_impl(tenant_context, **kwargs)
            
            # Log success
            await self.audit_logger.log_execution_success(
                agent_id=self.authority.agent_id,
                tenant_id=tenant_context.tenant_id
            )
            
            return result
            
        except Exception as e:
            # Log failure
            await self.audit_logger.log_execution_failure(
                agent_id=self.authority.agent_id,
                tenant_id=tenant_context.tenant_id,
                error=str(e)
            )
            raise
    
    @abstractmethod
    async def _execute_impl(
        self,
        tenant_context: TenantContext,
        **kwargs
    ) -> Any:
        """
        Agent-specific implementation.
        Subclasses MUST implement this method.
        """
        pass
    
    # =========================================================================
    # TIER 1 ACCESS METHODS
    # =========================================================================
    
    async def read_tier1(
        self,
        node_types: List[str],
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Read from Tier 1 Strategic Graph.
        Authority check: tier1_access.read must be True.
        """
        self._check_authority(AgentAction.GRAPH_READ, tier="tier1")
        
        # Validate node types against authority
        allowed_types = self.authority.tier1_access.get("node_types", [])
        if "*" not in allowed_types:
            for nt in node_types:
                if nt not in allowed_types:
                    raise PermissionError(
                        f"Agent not authorized to read node type: {nt} from Tier 1"
                    )
        
        return await self.graph_client.query(
            tier="tier1",
            node_types=node_types,
            filters=filters
        )
    
    # =========================================================================
    # TIER 2 ACCESS METHODS
    # =========================================================================
    
    async def read_tier2(
        self,
        domain: str,
        node_types: List[str],
        tenant_context: Optional[TenantContext] = None,
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Read from Tier 2 Domain Graph.
        Authority check: domain must be in tier2_access.domains.
        """
        self._check_authority(AgentAction.GRAPH_READ, tier="tier2")
        
        # Validate domain access
        allowed_domains = self.authority.tier2_access.get("domains", [])
        if domain not in allowed_domains:
            raise PermissionError(
                f"Agent not authorized to access domain: {domain}"
            )
        
        return await self.graph_client.query(
            tier="tier2",
            domain=domain,
            node_types=node_types,
            tenant_context=tenant_context,
            filters=filters
        )
    
    async def write_tier2(
        self,
        domain: str,
        node: Dict[str, Any],
        tenant_context: TenantContext
    ) -> Dict[str, Any]:
        """
        Write to Tier 2 Domain Graph.
        Authority check: tier2_access.write must be True.
        """
        self._check_authority(AgentAction.GRAPH_WRITE, tier="tier2")
        
        if not self.authority.tier2_access.get("write"):
            raise PermissionError("Agent not authorized to write to Tier 2")
        
        # Validate domain
        allowed_domains = self.authority.tier2_access.get("domains", [])
        if domain not in allowed_domains:
            raise PermissionError(f"Agent not authorized for domain: {domain}")
        
        return await self.graph_client.write(
            tier="tier2",
            domain=domain,
            node=node,
            tenant_context=tenant_context
        )
    
    # =========================================================================
    # TIER 3 ACCESS METHODS
    # =========================================================================
    
    async def read_tier3(
        self,
        tenant_context: TenantContext,
        node_types: List[str],
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Read from Tier 3 Tenant Graph.
        RLS automatically enforces tenant isolation.
        """
        self._check_authority(AgentAction.GRAPH_READ, tier="tier3")
        
        # RLS handles tenant isolation
        return await self.graph_client.query(
            tier="tier3",
            node_types=node_types,
            tenant_context=tenant_context,
            filters=filters
        )
    
    async def write_tier3(
        self,
        tenant_context: TenantContext,
        node: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Write to Tier 3 Tenant Graph.
        RLS automatically enforces tenant isolation.
        """
        self._check_authority(AgentAction.GRAPH_WRITE, tier="tier3")
        
        if not self.authority.tier3_access.get("write"):
            raise PermissionError("Agent not authorized to write to Tier 3")
        
        # Validate tenant scope
        scope = self.authority.tier3_access.get("tenant_scope", "none")
        if scope == "none":
            raise PermissionError("Agent has no Tier 3 access")
        
        # RLS handles tenant isolation
        return await self.graph_client.write(
            tier="tier3",
            node=node,
            tenant_context=tenant_context
        )
    
    # =========================================================================
    # AUTHORITY CHECKING
    # =========================================================================
    
    def _check_authority(
        self,
        action: AgentAction,
        tier: str
    ):
        """
        Validate that agent is authorized for the requested action.
        """
        # Check if action is prohibited
        if action in self.authority.prohibited_actions:
            raise PermissionError(
                f"Action {action} is prohibited for agent {self.authority.agent_id}"
            )
        
        # Check if action is allowed
        if action not in self.authority.allowed_actions:
            raise PermissionError(
                f"Action {action} not in allowed actions for agent {self.authority.agent_id}"
            )
        
        # Check tier-specific access
        if tier == "tier1":
            access = self.authority.tier1_access
        elif tier == "tier2":
            access = self.authority.tier2_access
        elif tier == "tier3":
            access = self.authority.tier3_access
        else:
            raise ValueError(f"Invalid tier: {tier}")
        
        # Validate read/write permission
        if action == AgentAction.GRAPH_READ and not access.get("read"):
            raise PermissionError(
                f"Agent not authorized to read from {tier}"
            )
        
        if action == AgentAction.GRAPH_WRITE and not access.get("write"):
            raise PermissionError(
                f"Agent not authorized to write to {tier}"
            )
```

### 7.3 Graph Client Implementation

```python
"""
Graph Client for Tiered Access
Implements secure graph operations with RLS enforcement.
"""

from contextlib import asynccontextmanager
from typing import Any, Dict, List, Optional
from uuid import UUID

from supabase import AsyncClient
from .context import TenantContext


class GraphClient:
    """
    Client for tiered graph operations.
    Automatically applies RLS context for all queries.
    """
    
    def __init__(self, supabase: AsyncClient):
        self.supabase = supabase
    
    @asynccontextmanager
    async def tenant_context(self, context: TenantContext):
        """
        Context manager that sets tenant context for RLS.
        """
        try:
            # Set application context for RLS
            await self.supabase.rpc(
                'set_app_context',
                context.to_db_context()
            ).execute()
            yield
        finally:
            # Clear context
            await self.supabase.rpc('clear_app_context').execute()
    
    async def query(
        self,
        tier: str,
        node_types: List[str],
        domain: Optional[str] = None,
        tenant_context: Optional[TenantContext] = None,
        filters: Optional[Dict[str, Any]] = None,
        limit: int = 100,
        offset: int = 0
    ) -> List[Dict[str, Any]]:
        """
        Query graph nodes with tier and RLS enforcement.
        """
        query = self.supabase.from_('pf_graph_nodes').select('*')
        
        # Filter by tier
        query = query.eq('tier', tier)
        
        # Filter by node types
        query = query.in_('node_type', node_types)
        
        # Filter by domain if specified
        if domain:
            query = query.eq('domain', domain)
        
        # Apply additional filters
        if filters:
            for key, value in filters.items():
                if isinstance(value, list):
                    query = query.in_(key, value)
                else:
                    query = query.eq(key, value)
        
        # Apply pagination
        query = query.range(offset, offset + limit - 1)
        
        # Execute with tenant context if provided
        if tenant_context:
            async with self.tenant_context(tenant_context):
                result = await query.execute()
        else:
            result = await query.execute()
        
        return result.data
    
    async def write(
        self,
        tier: str,
        node: Dict[str, Any],
        tenant_context: TenantContext,
        domain: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Write a node to the graph with RLS enforcement.
        """
        # Prepare node data
        node_data = {
            'tier': tier,
            'domain': domain or tenant_context.venture_domain,
            'tenant_id': str(tenant_context.tenant_id) if tier == 'tier3' else None,
            'node_type': node.get('node_type'),
            'properties': node.get('properties', {}),
            'ontology_ref': node.get('ontology_ref'),
            'status': node.get('status', 'active'),
            'created_by': str(tenant_context.user_id)
        }
        
        # Execute with tenant context
        async with self.tenant_context(tenant_context):
            if node.get('id'):
                # Update existing
                result = await self.supabase.from_('pf_graph_nodes') \
                    .update(node_data) \
                    .eq('id', node['id']) \
                    .execute()
            else:
                # Insert new
                result = await self.supabase.from_('pf_graph_nodes') \
                    .insert(node_data) \
                    .execute()
        
        return result.data[0] if result.data else None
    
    async def create_edge(
        self,
        source_id: UUID,
        target_id: UUID,
        relationship_type: str,
        tenant_context: TenantContext,
        properties: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Create an edge between nodes with validation.
        """
        edge_data = {
            'source_node_id': str(source_id),
            'target_node_id': str(target_id),
            'relationship_type': relationship_type,
            'properties': properties or {},
            'created_by': str(tenant_context.user_id)
        }
        
        async with self.tenant_context(tenant_context):
            result = await self.supabase.from_('pf_graph_edges') \
                .insert(edge_data) \
                .execute()
        
        return result.data[0] if result.data else None
    
    async def traverse(
        self,
        start_node_id: UUID,
        direction: str,  # 'children', 'parents', 'related'
        relationship_types: List[str],
        tenant_context: TenantContext,
        max_depth: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Traverse graph from a starting node.
        """
        async with self.tenant_context(tenant_context):
            result = await self.supabase.rpc(
                'traverse_graph',
                {
                    'start_id': str(start_node_id),
                    'direction': direction,
                    'rel_types': relationship_types,
                    'max_depth': max_depth
                }
            ).execute()
        
        return result.data
```

---

## 8. Security Framework

### 8.1 Security Controls by Tier

```
┌────────────────────────────────────────────────────────────────────────┐
│                    SECURITY CONTROLS BY TIER                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  TIER 1: PLATFORM STRATEGIC                                            │
│  ──────────────────────────                                           │
│  • Access: Platform admins only for write                              │
│  • Encryption: At-rest (AES-256), In-transit (TLS 1.3)                │
│  • Audit: All changes logged with approval workflow                    │
│  • Backup: Continuous with 30-day retention                            │
│  • IP Protection: Highest - contains proprietary frameworks            │
│                                                                        │
│  TIER 2: DOMAIN EXTENSIONS                                             │
│  ─────────────────────────                                            │
│  • Access: Domain admins for write, domain agents for read             │
│  • Encryption: At-rest (AES-256), In-transit (TLS 1.3)                │
│  • Audit: All changes logged                                           │
│  • Backup: Daily with 90-day retention                                 │
│  • IP Protection: High - contains venture-specific IP                  │
│                                                                        │
│  TIER 3: TENANT DATA                                                   │
│  ─────────────────                                                    │
│  • Access: Tenant-scoped via RLS                                       │
│  • Encryption: At-rest (AES-256), In-transit (TLS 1.3)                │
│  • Audit: All changes logged with tenant attribution                   │
│  • Backup: Continuous with configurable retention                      │
│  • Data Ownership: Tenant owns their data                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Authentication & Authorization Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                    AUTH FLOW FOR AGENT OPERATIONS                      │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  1. REQUEST RECEIVED                                                   │
│     │                                                                  │
│     ▼                                                                  │
│  2. JWT VALIDATION                                                     │
│     ├─ Verify signature                                                │
│     ├─ Check expiration                                                │
│     └─ Extract claims (user_id, tenant_id, roles)                     │
│     │                                                                  │
│     ▼                                                                  │
│  3. TENANT CONTEXT INJECTION                                           │
│     ├─ Validate tenant_id exists                                       │
│     ├─ Verify user belongs to tenant                                   │
│     └─ Set app.current_tenant_id in session                           │
│     │                                                                  │
│     ▼                                                                  │
│  4. AGENT AUTHORITY CHECK                                              │
│     ├─ Load agent authority boundary                                   │
│     ├─ Verify action is allowed                                        │
│     └─ Verify tier access is permitted                                │
│     │                                                                  │
│     ▼                                                                  │
│  5. RLS ENFORCEMENT (Database Level)                                   │
│     ├─ Policy evaluates current_setting('app.current_tenant_id')      │
│     └─ Only tenant's data visible                                      │
│     │                                                                  │
│     ▼                                                                  │
│  6. OPERATION EXECUTION                                                │
│     │                                                                  │
│     ▼                                                                  │
│  7. AUDIT LOGGING                                                      │
│     └─ Log: agent_id, tenant_id, action, result, timestamp            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Threat Model & Mitigations

| Threat | Impact | Mitigation |
|--------|--------|------------|
| **Cross-Tenant Data Access** | Critical | RLS policies, tenant context validation |
| **Privilege Escalation** | High | Authority boundary enforcement, no dynamic permission grants |
| **Agent Impersonation** | High | Agent ID validation, signed authority configs |
| **Unauthorized Tier Access** | High | Authority boundary checks at each tier |
| **Data Exfiltration** | High | Export permissions restricted, audit logging |
| **SQL Injection via Graph Queries** | Medium | Parameterized queries, input validation |
| **Context Injection** | Medium | Validated tenant context, immutable context objects |

---

## 9. Testing & Validation

### 9.1 Test Categories

```
┌────────────────────────────────────────────────────────────────────────┐
│                    AGENT TESTING REQUIREMENTS                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  CATEGORY 1: AUTHORITY BOUNDARY TESTS                                  │
│  ─────────────────────────────────────                                │
│  • Test unauthorized tier access is denied                             │
│  • Test unauthorized action is denied                                  │
│  • Test prohibited actions raise exceptions                            │
│  • Test rate limits are enforced                                       │
│  Coverage Target: 100%                                                 │
│                                                                        │
│  CATEGORY 2: TENANT ISOLATION TESTS                                    │
│  ──────────────────────────────────                                   │
│  • Test tenant A cannot access tenant B's data                         │
│  • Test cross-tenant edges are blocked                                 │
│  • Test RLS is enforced on all queries                                 │
│  • Test tenant context is required for Tier 3                          │
│  Coverage Target: 100%                                                 │
│                                                                        │
│  CATEGORY 3: FUNCTIONAL TESTS                                          │
│  ───────────────────────────                                          │
│  • Test agent produces expected outputs                                │
│  • Test graph traversals return correct data                           │
│  • Test ontology validation passes                                     │
│  • Test error handling and recovery                                    │
│  Coverage Target: 85%                                                  │
│                                                                        │
│  CATEGORY 4: INTEGRATION TESTS                                         │
│  ────────────────────────────                                         │
│  • Test agent orchestration flows                                      │
│  • Test cross-tier data flows                                          │
│  • Test concurrent tenant operations                                   │
│  Coverage Target: 75%                                                  │
│                                                                        │
│  CATEGORY 5: PERFORMANCE TESTS                                         │
│  ───────────────────────────                                          │
│  • Test query response times                                           │
│  • Test concurrent agent execution                                     │
│  • Test graph traversal performance                                    │
│  • Test at scale (1000+ tenants)                                      │
│  Coverage Target: Key paths only                                       │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Test Implementation Examples

```python
"""
Agent Authority Boundary Tests
"""

import pytest
from uuid import uuid4

from pf_core.agents.base import BaseAgent
from pf_core.authority import AgentAuthorityBoundary, AgentAction, AgentType
from pf_core.context import TenantContext


class TestAuthorityBoundaryEnforcement:
    """
    Tests for agent authority boundary enforcement.
    """
    
    @pytest.fixture
    def restricted_agent(self, graph_client, audit_logger):
        """Agent with minimal permissions."""
        
        class RestrictedAgent(BaseAgent):
            authority = AgentAuthorityBoundary(
                agent_id="test-restricted-agent",
                agent_type=AgentType.UTILITY,
                venture_domain="baiv",
                tier1_access={"read": True, "write": False, "node_types": ["vsom_vision"]},
                tier2_access={"domains": ["baiv"], "read": True, "write": False, "node_types": []},
                tier3_access={"tenant_scope": "current", "read": True, "write": False, "node_types": []},
                allowed_actions=[AgentAction.GRAPH_READ],
                prohibited_actions=[AgentAction.GRAPH_WRITE, AgentAction.GRAPH_DELETE],
                max_nodes_per_query=10,
                max_traversal_depth=2,
                rate_limit_per_minute=10
            )
            
            async def _execute_impl(self, tenant_context, **kwargs):
                return await self.read_tier1(["vsom_vision"])
        
        return RestrictedAgent(graph_client, audit_logger)
    
    @pytest.fixture
    def tenant_context(self):
        return TenantContext(
            tenant_id=uuid4(),
            venture_domain="baiv",
            user_id=uuid4(),
            user_role="admin",
            session_id="test-session"
        )
    
    async def test_unauthorized_tier_access_denied(self, restricted_agent, tenant_context):
        """Test that unauthorized tier access raises PermissionError."""
        with pytest.raises(PermissionError) as exc:
            # Agent has no W4M access
            await restricted_agent.read_tier2(
                domain="w4m",
                node_types=["value_chain"],
                tenant_context=tenant_context
            )
        
        assert "not authorized to access domain" in str(exc.value)
    
    async def test_prohibited_action_denied(self, restricted_agent, tenant_context):
        """Test that prohibited actions raise PermissionError."""
        with pytest.raises(PermissionError) as exc:
            await restricted_agent.write_tier3(
                tenant_context=tenant_context,
                node={"node_type": "test", "properties": {}}
            )
        
        assert "prohibited" in str(exc.value).lower() or "not authorized" in str(exc.value).lower()
    
    async def test_unauthorized_node_type_denied(self, restricted_agent, tenant_context):
        """Test that unauthorized node types are rejected."""
        with pytest.raises(PermissionError) as exc:
            # Agent only has access to vsom_vision
            await restricted_agent.read_tier1(["vsom_strategy"])
        
        assert "not authorized to read node type" in str(exc.value)


class TestTenantIsolation:
    """
    Tests for tenant data isolation.
    """
    
    @pytest.fixture
    def tenant_a_context(self):
        return TenantContext(
            tenant_id=uuid4(),
            venture_domain="baiv",
            user_id=uuid4(),
            user_role="admin",
            session_id="tenant-a-session"
        )
    
    @pytest.fixture
    def tenant_b_context(self):
        return TenantContext(
            tenant_id=uuid4(),
            venture_domain="baiv",
            user_id=uuid4(),
            user_role="admin",
            session_id="tenant-b-session"
        )
    
    async def test_cross_tenant_data_isolated(
        self,
        write_agent,
        tenant_a_context,
        tenant_b_context
    ):
        """Test that tenant A cannot see tenant B's data."""
        # Write data for tenant A
        node_a = await write_agent.write_tier3(
            tenant_context=tenant_a_context,
            node={
                "node_type": "customer_brand",
                "properties": {"name": "Tenant A Brand"}
            }
        )
        
        # Read as tenant B - should not see tenant A's data
        results_b = await write_agent.read_tier3(
            tenant_context=tenant_b_context,
            node_types=["customer_brand"]
        )
        
        # Tenant B should not see Tenant A's node
        node_ids = [r["id"] for r in results_b]
        assert node_a["id"] not in node_ids
    
    async def test_cross_tenant_edge_blocked(
        self,
        graph_client,
        tenant_a_context,
        tenant_b_context
    ):
        """Test that edges cannot be created across tenants."""
        # Create nodes for each tenant
        node_a = await graph_client.write(
            tier="tier3",
            node={"node_type": "test", "properties": {}},
            tenant_context=tenant_a_context
        )
        
        node_b = await graph_client.write(
            tier="tier3",
            node={"node_type": "test", "properties": {}},
            tenant_context=tenant_b_context
        )
        
        # Attempt to create cross-tenant edge should fail
        with pytest.raises(Exception) as exc:
            await graph_client.create_edge(
                source_id=node_a["id"],
                target_id=node_b["id"],
                relationship_type="related_to",
                tenant_context=tenant_a_context
            )
        
        assert "Cross-tenant edges not permitted" in str(exc.value)
```

---

## 10. Appendices

### 10.1 Glossary

| Term | Definition |
|------|------------|
| **Authority Boundary** | Explicit declaration of what an agent can and cannot do |
| **Domain** | A venture-specific extension (BAIV, W4M, AIR) |
| **Graph Node** | A single entity in the knowledge graph |
| **Graph Edge** | A relationship between two nodes |
| **RLS** | Row Level Security - PostgreSQL feature for data isolation |
| **Tenant** | A customer organization with isolated data |
| **Tier** | A level in the graph architecture (1, 2, or 3) |
| **VSOM** | Vision, Strategy, Objectives, Metrics framework |

### 10.2 Related Documents

- `DATABASE_SCHEMA_COMPLETE.md` - Full database schema reference
- `VSOM_PRD.md` - VSOM module product requirements
- `ontology-relationships.md` - Ontology integration patterns
- `RLS_AUDIT_INSTRUCTIONS.md` - Security audit procedures

### 10.3 Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | December 2025 | Platform Architecture | Initial release |

---

**Document Classification:** Technical Architecture  
**Review Cycle:** Quarterly  
**Next Review:** March 2026

---

*© 2025 Platform Foundation Core Holdings. All rights reserved.*
