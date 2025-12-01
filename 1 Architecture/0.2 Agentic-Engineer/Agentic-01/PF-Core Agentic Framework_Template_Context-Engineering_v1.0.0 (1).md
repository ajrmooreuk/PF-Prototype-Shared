# Agent Context Engineering Template

## Document Control
| Field | Value |
|-------|-------|
| **Context ID** | CTX-{AGT-XXX} |
| **Agent ID** | {agent_id} |
| **Version** | 1.0.0 |
| **Max Tokens** | {4000} |
| **Last Updated** | {YYYY-MM-DD} |

---

## 1. Context Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTEXT COMPOSITION                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ LAYER 1: STRATEGIC CONTEXT         ~{X} tokens      │   │
│  │ Always injected, highest priority                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ LAYER 2: DOMAIN CONTEXT            ~{Y} tokens      │   │
│  │ Task-specific, ontology-driven                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ LAYER 3: OPERATIONAL CONTEXT       ~{Z} tokens      │   │
│  │ Execution-specific, session state                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Total Budget: {4000} tokens                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Strategic Context Layer

### 2.1 Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Required** | Yes / No | {Why required or optional} |
| **Token Budget** | {X} tokens | {X}% of total budget |
| **Refresh Frequency** | Per-request / Per-session / Cached | {When to refresh} |
| **Priority** | 1 (Highest) | Always first in context |

### 2.2 Included Elements

| Element | Included | Token Estimate | Condition |
|---------|----------|----------------|-----------|
| Vision Statement | ✅ | ~50 | Always |
| Mission Statement | ✅ | ~75 | Always |
| Core Values | ✅ | ~100 | Always (max 5) |
| Active Strategic Objectives | ✅ | ~200 | Status = active/at_risk |
| Current Quarter OKRs | ✅ | ~150 | Relevant to agent domain |
| Tenant Configuration | ✅ | ~50 | Always |
| **Subtotal** | - | **~625** | - |

### 2.3 Template

```xml
<strategic_context tenant_id="{tenant_id}" as_of="{iso_timestamp}">
  
  <organization>
    <vision max_chars="200">{Vision statement - truncated if needed}</vision>
    <mission max_chars="300">{Mission statement - truncated if needed}</mission>
    <values>
      <value rank="1">{Most important value}</value>
      <value rank="2">{Second value}</value>
      <value rank="3">{Third value}</value>
      <!-- Max 5 values, prioritized -->
    </values>
  </organization>
  
  <strategic_objectives filter="active|at_risk" max="8">
    <objective id="{SO-ID}" perspective="{bsc_perspective}" status="{status}">
      <name>{Objective name}</name>
      <success_criteria max_chars="100">{Measurable criteria}</success_criteria>
      <progress>{0-100}%</progress>
    </objective>
    <!-- Only include objectives relevant to agent domain -->
  </strategic_objectives>
  
  <current_okrs quarter="{Q}" year="{YYYY}" filter="relevant">
    <okr id="{OKR-ID}" owner="{role}">
      <objective max_chars="150">{Objective statement}</objective>
      <key_results>
        <kr id="{KR-ID}" progress="{0-100}">{Key result - summarized}</kr>
        <!-- 2-5 KRs per objective -->
      </key_results>
    </okr>
    <!-- Only include OKRs in agent's domain -->
  </current_okrs>
  
  <tenant_config>
    <industry>{Industry}</industry>
    <size>{Company size}</size>
    <ai_maturity>{Level}</ai_maturity>
  </tenant_config>
  
</strategic_context>
```

---

## 3. Domain Context Layer

### 3.1 Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Required** | Yes / No | {Why required or optional} |
| **Token Budget** | {Y} tokens | {Y}% of total budget |
| **Refresh Frequency** | Per-request / Per-session | {When to refresh} |
| **Priority** | 2 | After strategic context |

### 3.2 Ontology Selection

| Ontology ID | Name | When Included | Token Estimate |
|-------------|------|---------------|----------------|
| `{ontology_id_1}` | {Name} | {Condition} | ~{X} |
| `{ontology_id_2}` | {Name} | {Condition} | ~{X} |
| `{ontology_id_3}` | {Name} | {Condition} | ~{X} |

### 3.3 Field Selection Rules

| Ontology | Priority Fields | Summarization Rule | Max Tokens |
|----------|-----------------|-------------------|------------|
| `{ontology_1}` | field_a, field_b, field_c | Include full | 300 |
| `{ontology_2}` | field_x, field_y | Truncate > 200 chars | 200 |
| `{ontology_3}` | field_m | Sample 5 items | 150 |

### 3.4 Template

```xml
<domain_context agent_id="{agent_id}" task_type="{task_type}">
  
  <ontology id="{ontology_id_1}" name="{Ontology Name}">
    <summary max_chars="100">{Brief description of what this provides}</summary>
    <data>
      <{entity_name} id="{id}">
        <{priority_field_1}>{Value}</priority_field_1}>
        <{priority_field_2}>{Value - may be truncated}</priority_field_2}>
        <!-- Only priority fields, not full entity -->
      </{entity_name}>
    </data>
  </ontology>
  
  <ontology id="{ontology_id_2}" name="{Ontology Name}">
    <!-- Similar structure -->
  </ontology>
  
  <historical_context if_relevant="true" max_items="5">
    <recent_performance metric="{metric_name}" trend="{up|down|stable}">
      <value period="current">{X}</value>
      <value period="previous">{Y}</value>
      <delta>{+/-Z%}</delta>
    </recent_performance>
  </historical_context>
  
</domain_context>
```

---

## 4. Operational Context Layer

### 4.1 Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Required** | Yes / No | {Why required or optional} |
| **Token Budget** | {Z} tokens | {Z}% of total budget |
| **Refresh Frequency** | Per-request | Always current |
| **Priority** | 3 | After domain context |

### 4.2 Included Elements

| Element | Included | Token Estimate | Condition |
|---------|----------|----------------|-----------|
| Task Parameters | ✅ | ~100 | Always |
| User Permissions | ✅ | ~50 | Always |
| Session State | ✅/❌ | ~100 | If session active |
| Conversation Summary | ✅/❌ | ~200 | If multi-turn |
| **Subtotal** | - | **~450** | - |

### 4.3 Template

```xml
<operational_context request_id="{request_id}" timestamp="{iso_timestamp}">
  
  <task>
    <type>{task_type}</type>
    <objective>{What the agent should accomplish}</objective>
    <constraints>
      <time_limit_ms>{X}</time_limit_ms>
      <token_budget>{Y}</token_budget>
      <scope>{Scope boundaries}</scope>
    </constraints>
    <success_criteria>
      <criterion>{Measurable criterion 1}</criterion>
      <criterion>{Measurable criterion 2}</criterion>
    </success_criteria>
    <input_data>
      <!-- Task-specific input parameters -->
    </input_data>
  </task>
  
  <user>
    <id>{user_id}</id>
    <role>{user_role}</role>
    <permissions>
      <permission>{permission_1}</permission>
      <permission>{permission_2}</permission>
    </permissions>
    <preferences>
      <!-- Relevant user preferences -->
    </preferences>
  </user>
  
  <session if_active="true">
    <id>{session_id}</id>
    <started_at>{timestamp}</started_at>
    <turn_count>{N}</turn_count>
    <recent_actions max="3">
      <action turn="{N-2}">{Summary of action}</action>
      <action turn="{N-1}">{Summary of action}</action>
    </recent_actions>
  </session>
  
  <conversation_summary if_multi_turn="true" max_chars="300">
    {AI-generated summary of relevant conversation history}
  </conversation_summary>
  
</operational_context>
```

---

## 5. Token Optimization Strategies

### 5.1 Strategy Matrix

| Strategy | Token Reduction | Implementation | When to Use |
|----------|-----------------|----------------|-------------|
| **Progressive Disclosure** | 30-50% | Load details via tool calls | Complex entities |
| **Graph Traversal** | 50-70% | Neo4j subgraph extraction | Related data |
| **Semantic Compression** | 20-30% | Summarize historical data | Time series |
| **Priority Filtering** | 40-60% | Include only high-priority | Large datasets |
| **Schema Reference** | 15-25% | Reference IDs vs inline | Ontology entities |
| **Conversation Summarization** | 60-80% | AI summary of history | Long conversations |

### 5.2 Implementation Patterns

#### Progressive Disclosure

```python
# Instead of including all data upfront
# Agent can request details via tool

@agent.tool
async def get_entity_details(entity_id: str, fields: List[str]) -> dict:
    """Fetch specific fields for an entity on demand"""
    return await db.fetch_entity(entity_id, fields=fields)
```

#### Graph Traversal

```python
# Extract only relevant subgraph
query = """
MATCH (tenant:Tenant {id: $tenant_id})-[:HAS_OBJECTIVE]->(obj:Objective)
WHERE obj.status IN ['active', 'at_risk']
AND obj.domain = $agent_domain
RETURN obj
LIMIT 5
"""
```

#### Semantic Compression

```python
# Summarize historical data
def compress_history(data: List[dict], max_items: int = 5) -> str:
    """Convert detailed history to summary"""
    recent = data[-max_items:]
    trend = calculate_trend(data)
    return f"Recent trend: {trend}. Last {len(recent)} values: {[d['value'] for d in recent]}"
```

---

## 6. Context Assembly Pipeline

### 6.1 Assembly Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTEXT ASSEMBLY PIPELINE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. BUDGET ALLOCATION                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Total: 4000 tokens                                   │   │
│  │ ├── Strategic: 1000 (25%)                           │   │
│  │ ├── Domain: 2000 (50%)                              │   │
│  │ └── Operational: 1000 (25%)                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  2. STRATEGIC CONTEXT (Always First)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Load tenant config                                   │   │
│  │ Fetch active objectives                              │   │
│  │ Get relevant OKRs                                    │   │
│  │ Validate token count                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  3. DOMAIN CONTEXT (Task-Dependent)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Select relevant ontologies                           │   │
│  │ Apply field selection rules                          │   │
│  │ Apply compression strategies                         │   │
│  │ Validate token count                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  4. OPERATIONAL CONTEXT (Request-Specific)                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Parse task parameters                                │   │
│  │ Load user permissions                                │   │
│  │ Summarize conversation history                       │   │
│  │ Validate token count                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  5. FINAL VALIDATION                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Total tokens <= budget?                              │   │
│  │ All required elements present?                       │   │
│  │ Priority order correct?                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Assembly Code Pattern

```python
class ContextAssembler:
    """Assembles optimized context for agent requests"""
    
    def __init__(self, agent_config: AgentConfig):
        self.config = agent_config
        self.token_budget = agent_config.max_context_tokens
        
    async def assemble(
        self,
        tenant_id: str,
        task: TaskSpec,
        user: User,
        session: Optional[Session] = None
    ) -> AssembledContext:
        """Assemble complete context within token budget"""
        
        # 1. Budget allocation
        budget = self._allocate_budget()
        
        # 2. Strategic context (highest priority)
        strategic = await self._assemble_strategic(
            tenant_id=tenant_id,
            max_tokens=budget.strategic
        )
        
        # 3. Domain context (task-dependent)
        domain = await self._assemble_domain(
            tenant_id=tenant_id,
            task_type=task.type,
            max_tokens=budget.domain
        )
        
        # 4. Operational context (request-specific)
        operational = await self._assemble_operational(
            task=task,
            user=user,
            session=session,
            max_tokens=budget.operational
        )
        
        # 5. Validate and return
        context = AssembledContext(
            strategic=strategic,
            domain=domain,
            operational=operational
        )
        
        self._validate(context)
        return context
    
    def _allocate_budget(self) -> BudgetAllocation:
        """Allocate token budget across layers"""
        return BudgetAllocation(
            strategic=int(self.token_budget * 0.25),
            domain=int(self.token_budget * 0.50),
            operational=int(self.token_budget * 0.25)
        )
```

---

## 7. Context Validation Rules

### 7.1 Required Validations

| Validation | Rule | Error Handling |
|------------|------|----------------|
| **Token Count** | Total ≤ budget | Truncate lowest priority |
| **Required Elements** | All required present | Fail with missing list |
| **Schema Compliance** | Matches XML schema | Log and repair |
| **Tenant Isolation** | All data for correct tenant | Security exception |
| **Freshness** | Data within TTL | Refresh and retry |

### 7.2 Validation Code

```python
def validate_context(context: AssembledContext, config: ContextConfig) -> ValidationResult:
    """Validate assembled context"""
    errors = []
    warnings = []
    
    # Token count
    total_tokens = count_tokens(context.to_string())
    if total_tokens > config.max_tokens:
        errors.append(f"Token count {total_tokens} exceeds budget {config.max_tokens}")
    
    # Required elements
    for element in config.required_elements:
        if not context.has_element(element):
            errors.append(f"Missing required element: {element}")
    
    # Schema compliance
    schema_errors = validate_schema(context.to_xml(), config.schema)
    errors.extend(schema_errors)
    
    # Freshness check
    if context.strategic.age_seconds > config.strategic_ttl:
        warnings.append("Strategic context may be stale")
    
    return ValidationResult(
        valid=len(errors) == 0,
        errors=errors,
        warnings=warnings,
        token_count=total_tokens
    )
```

---

## 8. Context Monitoring

### 8.1 Metrics to Track

| Metric | Description | Target | Alert Threshold |
|--------|-------------|--------|-----------------|
| `context_token_usage` | Tokens used per request | <4000 | >4500 |
| `context_assembly_time_ms` | Time to assemble context | <200ms | >500ms |
| `context_cache_hit_rate` | Strategic context cache hits | >80% | <60% |
| `context_compression_ratio` | Original/compressed size | >2.0 | <1.5 |
| `context_validation_failures` | Failed validations | 0 | >0 |

### 8.2 Dashboard Queries

```sql
-- Token usage by agent
SELECT 
    agent_id,
    AVG(token_usage) as avg_tokens,
    MAX(token_usage) as max_tokens,
    COUNT(*) as request_count
FROM context_metrics
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY agent_id;

-- Assembly time percentiles
SELECT 
    agent_id,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY assembly_time_ms) as p50,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY assembly_time_ms) as p95,
    PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY assembly_time_ms) as p99
FROM context_metrics
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY agent_id;
```

---

## Appendix: Full Context Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<agent_context 
    agent_id="{agent_id}" 
    request_id="{request_id}"
    timestamp="{iso_timestamp}"
    version="1.0">
  
  <!-- LAYER 1: STRATEGIC CONTEXT -->
  <strategic_context tenant_id="{tenant_id}">
    <organization>
      <vision>{Vision statement}</vision>
      <mission>{Mission statement}</mission>
      <values>
        <value rank="1">{Value 1}</value>
        <value rank="2">{Value 2}</value>
        <value rank="3">{Value 3}</value>
      </values>
    </organization>
    <strategic_objectives>
      <objective id="{SO-ID}" perspective="{perspective}" status="{status}">
        <name>{Name}</name>
        <success_criteria>{Criteria}</success_criteria>
        <progress>{X}%</progress>
      </objective>
    </strategic_objectives>
    <current_okrs quarter="{Q}" year="{YYYY}">
      <okr id="{OKR-ID}">
        <objective>{Objective}</objective>
        <key_results>
          <kr id="{KR-ID}" progress="{X}">{Key Result}</kr>
        </key_results>
      </okr>
    </current_okrs>
  </strategic_context>
  
  <!-- LAYER 2: DOMAIN CONTEXT -->
  <domain_context>
    <ontology id="{ontology_id}" name="{name}">
      <data>
        <!-- Ontology-specific data -->
      </data>
    </ontology>
    <historical_context>
      <!-- Performance trends -->
    </historical_context>
  </domain_context>
  
  <!-- LAYER 3: OPERATIONAL CONTEXT -->
  <operational_context>
    <task>
      <type>{task_type}</type>
      <objective>{objective}</objective>
      <constraints>
        <!-- Task constraints -->
      </constraints>
    </task>
    <user>
      <id>{user_id}</id>
      <role>{role}</role>
      <permissions>
        <!-- User permissions -->
      </permissions>
    </user>
    <session>
      <!-- Session state if applicable -->
    </session>
  </operational_context>
  
</agent_context>
```

---

*Template Version: 1.0.0 | Framework: PF-Agent Context Engineering | Last Updated: November 2025*
