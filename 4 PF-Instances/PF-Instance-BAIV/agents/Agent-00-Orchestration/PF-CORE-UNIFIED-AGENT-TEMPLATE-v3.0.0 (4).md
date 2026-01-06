# TEMPLATE: Agent PRD (Production Specification)

## `[PF-Instance]-[cluster]-[function]-agent` PRD

**Template Version:** 3.0.0  
**Compliance:** 14-Section Production Standard (P0.1-P0.14) + Unified Registry Integration  
**Framework:** W4M 8-Layer Business Framework  
**Registry:** Unified Registry Architecture v1.0 (migrates from OAA Registry)  
**Date:** 2026-01-01  
**Status:** Production  
**Merge History:** Consolidated from PF-CORE-AGENT-TEMPLATE-V2.md + 14-Section v2.1.0

---

## Document Header

| Field | Value |
|-------|-------|
| **Agent ID** | `[PF-Instance]-[cluster]-[function]-agent` |
| **Agent Name** | `[Human-readable agent name]` |
| **Version** | `x.y.z` |
| **Status** | `Draft|Review|Approved|Production` |
| **Author** | `[Author name]` |
| **Date** | `[Date]` |
| **PF-Instance** | `[PF-Instance name]` |
| **Product/Service** | `[Product or Service this agent supports]` |

---

## P0.1 Agent Identity & Role

### P0.1.1 Classification

| Attribute | Value |
|-----------|-------|
| **Agent ID** | `[PF-Instance]-[cluster]-[function]-agent` |
| **Agent Type** | `orchestrator` \| `domain_specialist` \| `utility` \| `integration` |
| **Domain** | `pf-core` \| `baiv` \| `w4m` \| `air` \| `[custom]` |
| **Tier (RBAC)** | `tier1` \| `tier2` \| `tier3` |
| **Role (Functional)** | `orchestrator` \| `primary` \| `sub-agent` \| `specialist` |
| **Cluster** | `discovery` \| `analysis` \| `generation` \| `optimization` |
| **Class** | `1` (orchestrator) to `5` (utility) |
| **Scope** | `[PF-Core]` \| `[PF-Instance]` \| `[Product/Service]` |
| **Tags** | `[tag1, tag2, tag3]` |

**Classification Notes:**
- **Agent Type**: Semantic classification of agent function in architecture
- **Domain**: Business domain this agent operates within (aligns with venture/product)
- **Tier (RBAC)**: Access control tier for ontology/data access (security)
- **Role (Functional)**: Operational role in agent orchestration (behavior)
- **Class**: Numeric rank 1-5 for orchestration priority

### P0.1.2 Authority Boundary

**Tier 1 Access (Strategic - PF-Core):**

| Attribute | Value |
|-----------|-------|
| **Read** | `true` \| `false` |
| **Write** | `true` \| `false` |
| **Node Types** | `[vsom_vision, vsom_strategy, vsom_objective, vsom_metric]` |
| **Purpose** | Strategic context and alignment |

**Tier 2 Access (Domain - PF-Instance):**

| Attribute | Value |
|-----------|-------|
| **Domains** | `[baiv, w4m, air, ...]` |
| **Read** | `true` \| `false` |
| **Write** | `true` \| `false` |
| **Node Types** | `[domain-specific node types]` |
| **Purpose** | Domain knowledge and operations |

**Tier 3 Access (Tenant - Customer Data):**

| Attribute | Value |
|-----------|-------|
| **Tenant Scope** | `current` \| `all` \| `[specific tenant IDs]` |
| **Read** | `true` \| `false` |
| **Write** | `true` \| `false` |
| **Node Types** | `[tenant-specific node types]` |
| **Purpose** | Customer-specific data operations |

**Allowed Actions:**
- `graph_read` - Read nodes and edges from ontology graph
- `graph_write` - Create/update nodes and edges
- `edge_create` - Create relationships between nodes
- `traverse_down` - Navigate from strategic → domain → tenant
- `traverse_lateral` - Navigate within same tier

**Prohibited Actions:**
- `graph_delete` - Delete operations (require elevated permissions)
- `traverse_up` - Navigate from tenant → domain → strategic (security boundary)
- `export` - Bulk data export (security/compliance)

**Access Limits:**

| Limit | Value |
|-------|-------|
| **Max Nodes Per Query** | `200` |
| **Max Traversal Depth** | `4` |
| **Rate Limit Per Minute** | `30` |
| **Max Concurrent Sessions** | `10` |

**Escalation Path:**
```
[Agent] → [Domain Orchestrator] → [Master Orchestrator] → [Human Administrator]
```

### P0.1.3 W4M Business Framework Alignment

| Attribute | Value |
|-----------|-------|
| **Primary Layer** | Layer [1-8]: [Layer Name] |
| **Secondary Layers** | Layer [X], Layer [Y] |
| **W4M Context Required** | [Yes/No] |

**Layer Engagement Detail:**

| Layer | Engagement Level | Purpose |
|-------|-----------------|---------|
| Layer 1: Problem Space | [Primary/Secondary/None] | [How agent uses this] |
| Layer 2: ICP | [Primary/Secondary/None] | [How agent uses this] |
| Layer 3: Solution | [Primary/Secondary/None] | [How agent uses this] |
| Layer 4: Value Proposition | [Primary/Secondary/None] | [How agent uses this] |
| Layer 5: Business Model | [Primary/Secondary/None] | [How agent uses this] |
| Layer 6: Competitive | [Primary/Secondary/None] | [How agent uses this] |
| Layer 7: Market | [Primary/Secondary/None] | [How agent uses this] |
| Layer 8: Strategy (VSOM) | [Primary/Secondary/None] | [How agent uses this] |

### P0.1.4 Ontology Access & Bindings

**Consumes (Read-only inputs):**

| Ontology ID | Version | Node Types | Purpose | Validation |
|-------------|---------|------------|---------|------------|
| `[ontology-id]` | `>=x.y.z` | `[NodeType1, NodeType2]` | [Purpose] | Required |

**Produces (Write outputs):**

| Ontology ID | Version | Node Types | Purpose | Validation |
|-------------|---------|------------|---------|------------|
| `[ontology-id]` | `x.y.z` | `[NodeType1, NodeType2]` | [Purpose] | Required |

**Requires (Strategic context - read-only):**

| Ontology ID | Version | Node Types | Purpose | Validation |
|-------------|---------|------------|---------|------------|
| `pf:vsom` | `>=1.0.0` | `[VisionStatement, StrategicObjective]` | Strategic alignment | Required |

**Binding Validation Rules:**
- [ ] All `@ref` ontologies exist in Unified Registry
- [ ] All `nodeTypes` exist as entities in referenced ontology
- [ ] Version constraints use valid semver format (`>=`, `~`, `^`)
- [ ] PRODUCES bindings have corresponding schema validation rules
- [ ] No circular dependencies between ontology bindings

### P0.1.5 Persona

| Attribute | Value |
|-----------|-------|
| **Communication Style** | [Professional/Technical/Friendly/Consultative] |
| **Expertise Level** | [Expert/Advanced/Intermediate/Beginner] |
| **Decision Approach** | [Conservative/Balanced/Aggressive/Data-Driven] |
| **Tone** | [Formal/Casual/Empathetic/Direct] |

### P0.1.6 Unified Registry Integration

| Attribute | Value |
|-----------|-------|
| **Registry Entry ID** | `[PF-Instance]-agent-[function]-v[version]` |
| **Registration Status** | `draft|registered|active|deprecated` |
| **Registry Metadata URL** | `registry://[PF-Instance]/agents/[agent-id]` |
| **Registry Table** | `unified_registry` (migrated from `agent_registry`) |
| **JSON-LD @id** | `pf:agent:[PF-Instance]-[function]-[version]` |
| **Version Compatibility** | `[Compatible registry versions]` |
| **Auto-Registration** | Yes/No |

**Dependency Declarations:**

| Dependency Type | ID | Version Range | Required |
|-----------------|----|--------------|------------|
| Agent | `[agent-id]` | `^1.0.0` | Yes/No |
| Ontology | `[ontology-id]` | `~2.1.0` | Yes/No |
| Data Contract | `[contract-id]` | `>=1.5.0` | Yes/No |

**Registry Validation:**
- [ ] Agent metadata validated against unified registry schema
- [ ] All dependencies resolved successfully
- [ ] No circular dependencies detected
- [ ] Version compatibility confirmed
- [ ] Input/output contracts registered
- [ ] Ontology bindings validated (consumes/produces/requires)

**Git Integration:**
- **Git Tag Format:** `[agent-id]-v[version]` (e.g., `BAIV-discovery-citation-agent-v1.0.0`)
- **Registry Sync:** Automatic on tag push via GitHub Action
- **CI/CD Validation:** Template v3.0.0 compliance check + TDD tests
- **Trigger Pattern:** `*-agent-v*.*.*`

**Migration from OAA Registry:**
- Legacy agents in `agent_registry` table
- Migration ETL script: `scripts/migrate_oaa_to_unified_registry.py`
- Backward compatibility: 2 versions lookback support
- Deprecation notice: OAA Registry end-of-life [Date]

### P0.1.7 Claude Configuration

| Attribute | Value |
|-----------|-------|
| **Model** | `claude-sonnet-4-20250514` \| `claude-opus-4-20250514` |
| **Max Tokens** | `4096` \| `8192` |
| **Temperature** | `0.0` - `1.0` (default: `0.7`) |
| **Top P** | `0.0` - `1.0` (default: `0.95`) |

**Tools:**

| Tool Name | Description | Tier Access |
|-----------|-------------|-------------|
| `read_strategic_context` | Read VSOM strategic context from Tier 1 | Tier 1 Read |
| `read_domain_graph` | Read from domain Tier 2 ontology graph | Tier 2 Read |
| `read_tenant_graph` | Read from Tier 3 customer data | Tier 3 Read |
| `write_tenant_node` | Write validated node to Tier 3 | Tier 3 Write |
| `write_domain_node` | Write validated node to Tier 2 | Tier 2 Write |
| `validate_ontology_output` | Validate output against ontology schema | All Tiers |

**MCP Servers (if applicable):**

| Server | Tools Available | Authentication |
|--------|-----------------|----------------|
| `[MCP Server]` | `[tool1, tool2]` | `[Auth method]` |

---

## P0.2 Core Objectives

### P0.2.1 Primary Objective

**Statement:**
> [What this agent must achieve - single clear objective]

**Success Criteria:**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| [Metric 1] | [Target value] | [How measured] |
| [Metric 2] | [Target value] | [How measured] |

**Business Value:**
> [Impact on [PF-Instance] goals and [Product/Service] delivery]

### P0.2.2 Secondary Objectives

| Priority | Objective | Dependency |
|----------|-----------|------------|
| High | [Objective] | [Dependencies] |
| Medium | [Objective] | [Dependencies] |
| Low | [Objective] | [Dependencies] |

### P0.2.3 Constraints

**Hard Constraints (Must Not):**
- [ ] [Constraint 1]
- [ ] [Constraint 2]

**Soft Constraints (Should Avoid):**
- [ ] [Constraint 1]
- [ ] [Constraint 2]

### P0.2.4 Strategic Alignment

| VSOM Element | Alignment |
|--------------|-----------|
| **Vision** | [How agent supports vision] |
| **Strategic Objective** | [Linked objective from Layer 8] |
| **OKR** | [Linked OKR] |
| **Key Result Contribution** | [How agent contributes to KR] |

### P0.2.5 Value Engineering Alignment

| W4M Layer | Contribution |
|-----------|--------------|
| **Pain Points Addressed** | [From Layer 1] |
| **ICP Served** | [From Layer 2] |
| **Solution Delivered** | [From Layer 3] |
| **Value Created** | [From Layer 4] |

---

## P0.3 Input Processing

### P0.3.1 Input Sources

| Source | Format | Validation Required | Schema Reference |
|--------|--------|--------------------|------------------|
| [Source 1] | json/text/file | Registry-validated | `registry://contracts/[contract-id]@[version]` |
| [Source 2] | json/text/file | Registry-validated | `registry://contracts/[contract-id]@[version]` |

**Registry Integration:**
- All inputs validated against Data Contract Registry
- Automatic schema version resolution
- Breaking change detection at registration time

### P0.3.2 Context Requirements

**Strategic Context [PF-Core]:**

| Source | Required | Token Budget | Refresh |
|--------|----------|--------------|---------|
| `pf:vsom` | Yes | 250 | Session start |
| `pf:okr` | Yes | 150 | Session start |

**Domain Context [PF-Instance]:**

| Source | Required | Token Budget | Refresh |
|--------|----------|--------------|---------|
| `[PF-Instance]:[ontology]` | [Yes/No] | [Tokens] | [Frequency] |
| W4M Layer [X] data | [Yes/No] | [Tokens] | [Frequency] |

**Operational Context [Product/Service]:**

| Source | Required | Token Budget | Refresh |
|--------|----------|--------------|---------|
| Task parameters | Yes | [Tokens] | Continuous |
| Session history | [Yes/No] | [Tokens] | Continuous |

**Total Context Budget:** [Total tokens] tokens

### P0.3.3 Preprocessing Pipeline

| Step | Purpose | Failure Action |
|------|---------|----------------|
| 1. [Step] | [Purpose] | [If fails, then...] |
| 2. [Step] | [Purpose] | [If fails, then...] |

### P0.3.4 Input Validation

**Schema Validation:**
- Ontology: `[Ontology reference]`
- Required fields: [List]
- Optional fields: [List]

**Business Rules:**
- [ ] [Rule 1]
- [ ] [Rule 2]

**Rejection Criteria:**
- [ ] [Criteria that causes input rejection]

### P0.3.5 Data Contract Registry Compliance

**Input Contract:**

| Attribute | Value |
|-----------|-------|
| **Contract ID** | `[PF-Instance]-[agent]-input-v[version]` |
| **Registry URL** | `registry://contracts/[contract-id]` |
| **Schema Format** | JSON Schema / JSON-LD |
| **Validation Engine** | Unified Registry Validation Service |
| **Breaking Change Policy** | Major version increment required |

**Validation Pipeline:**
1. Fetch latest contract from Unified Registry
2. Validate input against registered schema  
3. Check for contract version compatibility
4. Report validation errors to registry audit log

**Schema Evolution:**
- Backward compatible changes: Patch/minor version
- Breaking changes: Major version + migration guide
- Deprecation policy: 2 versions lookback support

---

## P0.4 Decision Framework

### P0.4.1 Decision Model

| Attribute | Value |
|-----------|-------|
| **Type** | `rules_based` \| `ml_assisted` \| `hybrid` |
| **Primary Criteria** | [List in priority order] |
| **Weighting Method** | [How criteria are weighted] |

### P0.4.2 W4M Business Framework Integration

| Layer | Decision Influence |
|-------|-------------------|
| Layer 1: Problem | [How problem space informs this agent's decisions] |
| Layer 2: ICP | [How ICP context shapes decisions] |
| Layer 3: Solution | [How solution capabilities constrain options] |
| Layer 4: Value | [How value prop guides recommendations] |
| Layer 5: Business Model | [Economic constraints on decisions] |
| Layer 6: Competitive | [Competitive considerations] |
| Layer 7: Market | [Market context influence] |
| Layer 8: Strategy | [Strategic alignment check] |

### P0.4.3 Decision Points

| Decision | Options | Selection Logic | Confidence Threshold | Escalation Trigger |
|----------|---------|-----------------|---------------------|-------------------|
| [Decision 1] | [Options] | [Logic] | 0.85 | [Trigger] |
| [Decision 2] | [Options] | [Logic] | 0.80 | [Trigger] |

### P0.4.4 Reasoning Transparency

| Attribute | Value |
|-----------|-------|
| **Explanation Required** | Yes/No |
| **Explanation Format** | [Format specification] |
| **Audit Trail** | Yes/No |

---

## P0.5 Tools & Capabilities

### P0.5.1 Core Tools [PF-Core]

| Tool ID | Purpose | ACI Compliant |
|---------|---------|---------------|
| `pf-core:[tool]` | [Purpose] | Yes |

### P0.5.2 Instance Tools [PF-Instance]

| Tool ID | Purpose | ACI Compliant | Poka-Yoke Patterns |
|---------|---------|---------------|-------------------|
| `[PF-Instance]:[tool]` | [Purpose] | Yes | [Error prevention] |

### P0.5.3 Product Tools [Product/Service]

| Tool ID | Purpose | ACI Compliant | Poka-Yoke Patterns |
|---------|---------|---------------|-------------------|
| `[Product/Service]:[tool]` | [Purpose] | Yes | [Error prevention] |

### P0.5.4 MCP Integrations

| Server | Tools Available | Authentication |
|--------|-----------------|----------------|
| [MCP Server] | [Tools] | [Auth method] |

### P0.5.5 Tool Selection Logic

**Routing Rules:**
```
IF [condition] THEN use [tool]
ELSE IF [condition] THEN use [tool]
FALLBACK to [tool]
```

### P0.5.6 Capability Boundaries

| Can Do | Cannot Do | Requires Approval |
|--------|-----------|-------------------|
| [Capability] | [Limitation] | [Escalation need] |

---

## P0.6 Output Specifications

### P0.6.1 Output Types

| Type | Format | Schema | Destination |
|------|--------|--------|-------------|
| [Type 1] | json-ld/markdown/file | `[Ontology]` | [Destination] |
| [Type 2] | json-ld/markdown/file | `[Ontology]` | [Destination] |

### P0.6.2 Schema Compliance

| Attribute | Value |
|-----------|-------|
| **Base Vocabulary** | `https://schema.org/` |
| **Instance Namespace** | `https://[PF-Instance].io/ontology/` |
| **Validation Required** | Yes |
| **Alignment Threshold** | 85% |

### P0.6.3 Quality Standards

| Standard | Requirement | Validation Method |
|----------|-------------|------------------|
| Accuracy | [Requirement] | [Method] |
| Completeness | [Required fields] | [Method] |
| Consistency | [Cross-references] | [Method] |

### P0.6.4 Formatting Rules

| Rule | Rationale | Enforcement |
|------|-----------|-------------|
| [Rule] | [Why] | Strict/Recommended |

### P0.6.5 Delivery Method

| Condition | Delivery Type |
|-----------|---------------|
| [Condition] | Synchronous |
| [Condition] | Asynchronous |
| [Condition] | Notification |

### P0.6.6 Output Contract Registry

**Output Contract:**

| Attribute | Value |
|-----------|-------|
| **Contract ID** | `[PF-Instance]-[agent]-output-v[version]` |
| **Registry URL** | `registry://contracts/[contract-id]` |
| **Schema Format** | JSON Schema / JSON-LD |
| **Validation Engine** | Unified Registry Validation Service |

**Produces Binding Validation:**
- [ ] Output validated against PRODUCES ontology schema
- [ ] All required node types present in output
- [ ] Edge relationships match ontology constraints
- [ ] Output registered in unified registry audit log

---

## P0.7 Error Handling

### P0.7.1 Error Categories

| Category | Handling Strategy | Recovery Steps | Escalation |
|----------|------------------|----------------|------------|
| Input validation | [Strategy] | [Steps] | [When] |
| Tool failure | [Strategy] | [Steps] | [When] |
| Business rule violation | [Strategy] | [Steps] | [When] |
| External dependency | [Strategy] | [Steps] | [When] |
| Confidence below threshold | [Strategy] | [Steps] | [When] |

### P0.7.2 Retry Policies

| Attribute | Value |
|-----------|-------|
| **Max Retries** | 3 |
| **Backoff Strategy** | Exponential |
| **Circuit Breaker** | Enabled |

### P0.7.3 Graceful Degradation

| Failure Mode | Fallback Behavior | User Communication |
|--------------|-------------------|-------------------|
| [Mode] | [Behavior] | [Message to user] |

### P0.7.4 Error Reporting

| Attribute | Value |
|-----------|-------|
| **Log Level** | ERROR |
| **Include Context** | Yes |
| **PII Scrubbing** | Enabled |

---

## P0.8 Context & Memory Management

### P0.8.1 Context Architecture

| Layer | Budget | Sources | Refresh |
|-------|--------|---------|---------|
| Strategic [PF-Core] | [Tokens] | [Sources] | Session start |
| Domain [PF-Instance] | [Tokens] | [Sources] | On demand |
| Operational [Product/Service] | [Tokens] | [Sources] | Continuous |
| **Total** | [Total tokens] | | |

### P0.8.2 Memory Patterns

**Session Memory:**

| Attribute | Value |
|-----------|-------|
| **Enabled** | Yes/No |
| **Scope** | [What to remember] |

**Persistent Memory:**

| Attribute | Value |
|-----------|-------|
| **Enabled** | Yes/No |
| **Storage** | `Supabase:[table]` |

### P0.8.3 Compaction Strategy

| Attribute | Value |
|-----------|-------|
| **Trigger** | Token threshold / Turn count |
| **Threshold** | 80% of budget |
| **Preservation Priority** | [What to keep] |

### P0.8.4 Long-Running Agent (If Applicable)

| Pattern | Value |
|---------|-------|
| **Initializer Pattern** | [Pattern description] |
| **Working Agent Pattern** | [Pattern description] |
| **Progress File** | `[PF-Instance]-[agent]-progress.json` |
| **Features File** | `[PF-Instance]-[agent]-features.json` |

---

## P0.9 Compliance & Constraints

### P0.9.1 Regulatory Compliance

| Framework | Requirements | Implementation |
|-----------|--------------|----------------|
| [Framework] | [Requirements] | [How addressed] |

### P0.9.2 Data Governance

| Aspect | Policy |
|--------|--------|
| **PII Handling** | [Policy] |
| **Data Retention** | [Policy] |
| **Data Residency** | [Geographic constraints] |
| **Encryption** | [Standards] |

### P0.9.3 Ethical Constraints

| Constraint | Implementation |
|------------|----------------|
| **Bias Mitigation** | [How addressed] |
| **Fairness Criteria** | [Requirements] |
| **Transparency** | [Explainability rules] |

### P0.9.4 Business Constraints

| Constraint | Limit |
|------------|-------|
| **Rate Limits** | [Limits] |
| **Cost Controls** | [Budget constraints] |
| **SLA Requirements** | [Performance SLAs] |

### P0.9.5 Instance-Specific Constraints

| `[PF-Instance]` Rule | Description |
|----------------------|-------------|
| [Rule] | [Description] |

---

## P0.10 Integration Points

### P0.10.1 Upstream Agents

| Agent ID | Interaction Pattern | Data Exchange |
|----------|--------------------|--------------| 
| `[Agent that calls this]` | orchestration/delegation | [Format] |

### P0.10.2 Downstream Agents

| Agent ID | Interaction Pattern | Data Exchange |
|----------|--------------------|--------------| 
| `[Agent this calls]` | orchestration/delegation | [Format] |

### P0.10.3 External Systems

| System | Integration Type | Authentication | Error Handling |
|--------|-----------------|----------------|----------------|
| [System] | API/MCP/webhook | [Auth] | [Approach] |

### P0.10.4 Ontology Graph Integration

| Attribute | Value |
|-----------|-------|
| **Ontology Access** | [List of ontologies from P0.1.4] |
| **Access Pattern** | Read/Write/Both |
| **Scope** | Global/Tenant/Process/Task |
| **Graph Database** | Supabase + pg_graphql |

**Binding Storage Pattern:**
- Agent-ontology relationships stored in `agent_ontology_bindings` table
- Junction table links `unified_registry.id` ↔ `ontologies.id`
- Binding types: `consumes`, `produces`, `requires`
- See Appendix A for SQL schema

### P0.10.5 Event Bus

| Type | Events |
|------|--------|
| **Publishes** | [Events this agent publishes] |
| **Subscribes** | [Events this agent consumes] |

### P0.10.6 Orchestration Dependencies

**Required Agents (must execute before this agent):**

| Agent ID | Dependency Type | Data Exchange |
|----------|----------------|---------------|
| `[agent-id]` | Sequential/Parallel | [What data flows] |

**Optional Agents (can run in parallel):**

| Agent ID | Dependency Type | Data Exchange |
|----------|----------------|---------------|
| `[agent-id]` | Parallel/Conditional | [What data flows] |

**Orchestration Rules:**
- See P0.1.6 Dependency Declarations for version constraints
- Circular dependency detection: Enforced by Unified Registry
- Dependency resolution: Automatic via registry API

### P0.10.7 Registry Event Integration

**Registry Events Published:**

| Event Type | Trigger | Payload |
|------------|---------|---------|
| `agent.registered` | Agent added to registry | Agent metadata |
| `agent.updated` | Agent version updated | Delta + full spec |
| `agent.deprecated` | Agent marked deprecated | Deprecation notice |

**Registry Events Subscribed:**

| Event Type | Handler | Action |
|------------|---------|--------|
| `ontology.updated` | Ontology binding validator | Re-validate bindings |
| `contract.breaking_change` | Input contract validator | Alert + migration |

---

## P0.11 Monitoring & Logging

### P0.11.1 Metrics

| Metric | Type | Labels |
|--------|------|--------|
| `[PF-Instance]_[agent]_execution_time` | histogram | [Labels] |
| `[PF-Instance]_[agent]_success_rate` | counter | [Labels] |
| `[PF-Instance]_[agent]_token_usage` | gauge | [Labels] |
| `[PF-Instance]_[agent]_error_rate` | counter | [Labels] |

### P0.11.2 Logging

| Attribute | Value |
|-----------|-------|
| **Levels** | DEBUG, INFO, WARNING, ERROR, CRITICAL |
| **Structured Format** | Yes |
| **Correlation ID** | Enabled |
| **Instance Tags** | `[PF-Instance]`, `[Product/Service]`, `[cluster]` |

### P0.11.3 Alerting

| Condition | Threshold | Notification |
|-----------|-----------|--------------| 
| [Condition] | [Threshold] | [Channel] |

### P0.11.4 Audit Trail

| Attribute | Value |
|-----------|-------|
| **Enabled** | Yes |
| **Events** | [Events to audit] |
| **Retention** | [Period] |
| **Storage** | `Supabase:[PF-Instance]_audit_log` |

---

## P0.12 Example Scenarios

### P0.12.1 Happy Path Scenarios

**Scenario 1: [Scenario Name]**
```yaml
description: "[What this tests]"
business_context:
  w4m_layers: [1, 2, 4]
  icp_segment: "[Target segment]"
input:
  type: "[Input type]"
  data: |
    [Example input data]
expected_output:
  format: "[Output format]"
  validation: "[What makes output correct]"
  data: |
    [Example expected output]
```

### P0.12.2 Edge Case Scenarios

**Scenario: [Edge Case Name]**
```yaml
description: "[What edge case this covers]"
input:
  type: "[Input type]"
  data: |
    [Edge case input]
expected_handling: "[How agent should handle]"
business_context: "[Relevant W4M layers]"
```

### P0.12.3 Error Scenarios

**Scenario: [Error Scenario Name]**
```yaml
description: "[What error this tests]"
trigger: "[What causes the error]"
expected_handling: "[How handled]"
recovery_outcome: "[Expected recovery]"
```

### P0.12.4 Instance-Specific Scenarios

**[PF-Instance] Scenario: [Scenario Name]**
```yaml
description: "[Instance-specific test]"
context: "[PF-Instance] context"
input: |
  [Instance-specific input]
expected_output: |
  [Instance-specific output]
```

---

## P0.13 Testing & Validation

### P0.13.1 Coverage Targets

| Test Type | Target | Current |
|-----------|--------|---------|
| Unit Tests | 80% | [Current]% |
| Integration Tests | 70% | [Current]% |
| E2E Tests | 60% | [Current]% |

### P0.13.2 Test Categories

| Category | Test Count | Coverage |
|----------|------------|----------|
| Input Validation | [Count] | [%] |
| Business Logic | [Count] | [%] |
| W4M Layer Integration | [Count] | [%] |
| Output Validation | [Count] | [%] |
| Error Handling | [Count] | [%] |
| Integration | [Count] | [%] |
| Ontology Binding | [Count] | [%] |
| Authority Boundary | [Count] | [%] |

### P0.13.3 Evaluation Framework

| Attribute | Value |
|-----------|-------|
| **Eval Datasets** | `[PF-Instance]-[agent]-eval-v1.json` |
| **Accuracy Metrics** | [Metrics used] |
| **Baseline Threshold** | [Minimum acceptable] |
| **Golden Dataset** | `[PF-Instance]-[agent]-golden-v1.json` |

### P0.13.4 Verification Approach

| Priority | Method | Use Case |
|----------|--------|----------|
| Primary | Rules-based | Concrete validation rules |
| Secondary | Visual verification | UI/output verification |
| Tertiary | LLM-as-judge | Complex reasoning (use sparingly) |

### P0.13.5 TDD Compliance

| Requirement | Status |
|-------------|--------|
| Red-Green-Refactor | [Compliant/Non-compliant] |
| Test-First Development | [Compliant/Non-compliant] |
| Coverage Gates | [Compliant/Non-compliant] |
| Registry Validation Tests | [Compliant/Non-compliant] |
| Ontology Binding Tests | [Compliant/Non-compliant] |

---

## P0.14 Maintenance & Updates

### P0.14.1 Versioning

| Attribute | Value |
|-----------|-------|
| **Scheme** | Semantic (major.minor.patch) |
| **Current Version** | [Version] |
| **Breaking Change Policy** | Major version increment + migration guide |
| **Deprecation Policy** | 2 versions lookback support |
| **Git Tag Format** | `[agent-id]-v[version]` |

### P0.14.2 Update Procedures

| Update Type | Procedure | Testing Required |
|-------------|-----------|------------------|
| Ontology update | [Procedure] | [Tests] |
| Tool update | [Procedure] | [Tests] |
| Business logic update | [Procedure] | [Tests] |
| W4M layer schema update | [Procedure] | [Tests] |
| Registry schema update | Update unified_registry record | Full regression |

### P0.14.3 Rollback Procedures

| Attribute | Value |
|-----------|-------|
| **Trigger Conditions** | [When to rollback] |
| **Rollback Steps** | [Procedure] |
| **Verification** | [How to verify] |
| **Registry Rollback** | Revert to previous registry version |

### P0.14.4 Documentation Requirements

| Document | Required | Location |
|----------|----------|----------|
| Changelog | Yes | `/docs/[agent]/CHANGELOG.md` |
| Migration Guide | For breaking changes | `/docs/[agent]/MIGRATION.md` |
| API Documentation | Yes | `/docs/[agent]/API.md` |

### P0.14.5 Health Checks

| Attribute | Value |
|-----------|-------|
| **Frequency** | [How often] |
| **Checks** | [What to check] |
| **Alerting** | [Alert on failure] |

### P0.14.6 Registry Synchronization

**Sync Triggers:**
- Git tag push matching `[agent-id]-v*.*.*` pattern
- Manual registry API call: `POST /api/registry/sync`
- CI/CD pipeline completion

**Sync Validation:**
- [ ] Agent specification validated against JSON Schema
- [ ] All ontology bindings resolved
- [ ] Dependency versions compatible
- [ ] No circular dependencies
- [ ] Input/output contracts registered

**Sync Failure Handling:**
- Rollback to previous registry state
- Alert agent owner via notification
- Block deployment until resolved

### P0.14.7 Atomic Deployment

**Deployment Strategy:**
1. Validate agent specification against registry schema
2. Register in unified registry (status: `registered`)
3. Deploy agent code to infrastructure
4. Run smoke tests
5. Update registry status to `active`
6. If any step fails: Rollback all changes

**Rollback Procedure:**
1. Mark current version as `deprecated` in registry
2. Restore previous version code
3. Update registry to point to previous version
4. Verify health checks pass
5. Notify stakeholders

---

## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Author | | | |
| Technical Reviewer | | | |
| Product Owner | | | |
| Security Reviewer | | | |

---

## APPENDIX A: Database Schema

### A.1 Unified Registry Table

**Table:** `unified_registry` (replaces legacy `agent_registry`)

```sql
CREATE TABLE unified_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_type VARCHAR(50) NOT NULL CHECK (entry_type IN ('agent', 'ontology', 'contract')),
    entry_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    description TEXT,
    specification JSONB NOT NULL,
    metadata JSONB,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'registered', 'active', 'deprecated')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(255),
    tags TEXT[],
    
    -- Agent-specific fields
    agent_type VARCHAR(50) CHECK (agent_type IN ('orchestrator', 'domain_specialist', 'utility', 'integration')),
    domain VARCHAR(50) CHECK (domain IN ('pf-core', 'baiv', 'w4m', 'air')),
    tier VARCHAR(50) CHECK (tier IN ('tier1', 'tier2', 'tier3')),
    authority_boundary JSONB,
    claude_config JSONB,
    
    -- Indexes for performance
    CONSTRAINT unique_entry_version UNIQUE (entry_id, version)
);

CREATE INDEX idx_unified_registry_entry_id ON unified_registry(entry_id);
CREATE INDEX idx_unified_registry_type ON unified_registry(entry_type);
CREATE INDEX idx_unified_registry_status ON unified_registry(status);
CREATE INDEX idx_unified_registry_domain ON unified_registry(domain);
CREATE INDEX idx_unified_registry_tags ON unified_registry USING GIN(tags);
CREATE INDEX idx_unified_registry_spec ON unified_registry USING GIN(specification);
```

### A.2 Agent-Ontology Bindings Table

**Table:** `agent_ontology_bindings`

```sql
CREATE TABLE agent_ontology_bindings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES unified_registry(id) ON DELETE CASCADE,
    ontology_id UUID NOT NULL REFERENCES unified_registry(id) ON DELETE CASCADE,
    binding_type VARCHAR(50) NOT NULL CHECK (binding_type IN ('consumes', 'produces', 'requires')),
    version_constraint VARCHAR(50),
    node_types TEXT[],
    purpose TEXT,
    required BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT unique_agent_ontology_binding UNIQUE (agent_id, ontology_id, binding_type)
);

CREATE INDEX idx_bindings_agent ON agent_ontology_bindings(agent_id);
CREATE INDEX idx_bindings_ontology ON agent_ontology_bindings(ontology_id);
CREATE INDEX idx_bindings_type ON agent_ontology_bindings(binding_type);
```

### A.3 Data Contracts Table

**Table:** `data_contracts`

```sql
CREATE TABLE data_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id VARCHAR(255) NOT NULL UNIQUE,
    version VARCHAR(50) NOT NULL,
    contract_type VARCHAR(50) CHECK (contract_type IN ('input', 'output')),
    schema_format VARCHAR(50) DEFAULT 'json-schema',
    schema JSONB NOT NULL,
    agent_id UUID REFERENCES unified_registry(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT unique_contract_version UNIQUE (contract_id, version)
);

CREATE INDEX idx_contracts_id ON data_contracts(contract_id);
CREATE INDEX idx_contracts_agent ON data_contracts(agent_id);
```

### A.4 Orchestration Dependencies Table

**Table:** `orchestration_dependencies`

```sql
CREATE TABLE orchestration_dependencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES unified_registry(id) ON DELETE CASCADE,
    depends_on_agent_id UUID NOT NULL REFERENCES unified_registry(id) ON DELETE CASCADE,
    dependency_type VARCHAR(50) CHECK (dependency_type IN ('required', 'optional')),
    version_range VARCHAR(50),
    execution_order INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT unique_dependency UNIQUE (agent_id, depends_on_agent_id),
    CONSTRAINT no_self_dependency CHECK (agent_id != depends_on_agent_id)
);

CREATE INDEX idx_dependencies_agent ON orchestration_dependencies(agent_id);
CREATE INDEX idx_dependencies_depends_on ON orchestration_dependencies(depends_on_agent_id);
```

### A.5 Registry Audit Log Table

**Table:** `registry_audit_log`

```sql
CREATE TABLE registry_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id VARCHAR(255) NOT NULL,
    action VARCHAR(50) NOT NULL,
    actor VARCHAR(255),
    changes JSONB,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_entry ON registry_audit_log(entry_id);
CREATE INDEX idx_audit_timestamp ON registry_audit_log(timestamp);
```

### A.6 Example Agent Registration SQL

```sql
-- Insert agent into unified registry
INSERT INTO unified_registry (
    entry_type,
    entry_id,
    name,
    version,
    description,
    agent_type,
    domain,
    tier,
    specification,
    authority_boundary,
    claude_config,
    status
) VALUES (
    'agent',
    'BAIV-discovery-citation-agent',
    'Citation Discovery Agent',
    '1.0.0',
    'Discovers citation opportunities in brand content',
    'domain_specialist',
    'baiv',
    'tier2',
    '{"@context": {...}, "@type": "pf:AgentSpecification", ...}'::jsonb,
    '{"tier1": {"read": true, "write": false}, ...}'::jsonb,
    '{"model": "claude-sonnet-4-20250514", "maxTokens": 4096, ...}'::jsonb,
    'active'
) RETURNING id;

-- Insert ontology bindings (using returned agent id)
INSERT INTO agent_ontology_bindings (agent_id, ontology_id, binding_type, node_types, purpose)
SELECT 
    (SELECT id FROM unified_registry WHERE entry_id = 'BAIV-discovery-citation-agent' AND version = '1.0.0'),
    (SELECT id FROM unified_registry WHERE entry_id = 'baiv:ontology:ai-visibility'),
    'consumes',
    ARRAY['QueryCategory', 'PlatformBehavior'],
    'Read AI visibility data';
```

---

## APPENDIX B: JSON-LD Export Format

### B.1 Agent Specification JSON-LD Structure

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platform-foundation.io/agent/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "pf:AgentSpecification",
  "@id": "pf:agent:[PF-Instance]-[function]-[version]",
  
  "name": "[Agent Name]",
  "version": "x.y.z",
  "description": "[Agent description]",
  "dateCreated": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  
  "classification": {
    "agentType": "domain_specialist",
    "domain": "[domain]",
    "tier": "tier2",
    "role": "[role]",
    "class": 3,
    "tags": ["tag1", "tag2"]
  },
  
  "ontologyBindings": {
    "consumes": [
      {
        "@ref": "[ontology-id]",
        "version": ">=x.y.z",
        "nodeTypes": ["NodeType1", "NodeType2"],
        "purpose": "[Purpose]"
      }
    ],
    "produces": [
      {
        "@ref": "[ontology-id]",
        "version": "x.y.z",
        "nodeTypes": ["NodeType1"],
        "purpose": "[Purpose]"
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
      "nodeTypes": ["vsom_vision", "vsom_strategy"]
    },
    "tier2Access": {
      "domains": ["[domain]"],
      "read": true,
      "write": true,
      "nodeTypes": ["domain-specific nodes"]
    },
    "tier3Access": {
      "tenantScope": "current",
      "read": true,
      "write": true,
      "nodeTypes": ["tenant-specific nodes"]
    },
    "allowedActions": [
      "graph_read",
      "graph_write",
      "edge_create"
    ],
    "prohibitedActions": [
      "graph_delete",
      "traverse_up"
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
      "write_tenant_node"
    ]
  },
  
  "dependencies": {
    "requiredAgents": ["pf:agent:[agent-id]-[version]"],
    "optionalAgents": ["pf:agent:[agent-id]-[version]"],
    "requiredTools": ["pf:tool:[tool-id]"]
  },
  
  "implementation": {
    "templateBase": "domain-agent.template.py",
    "entryPoint": "agents/[domain]/[agent-name].py",
    "className": "[AgentClassName]"
  }
}
```

### B.2 Exporting Agent to JSON-LD

```python
# Python code to export agent from unified registry to JSON-LD

from unified_registry_client import UnifiedRegistryClient

client = UnifiedRegistryClient()

# Fetch agent from registry
agent = client.get_agent("BAIV-discovery-citation-agent", version="1.0.0")

# Export to JSON-LD format
json_ld = agent.to_json_ld()

# Save to file
with open("agent-spec.jsonld", "w") as f:
    json.dump(json_ld, f, indent=2)
```

---

## APPENDIX C: Agent Catalog

### C.1 PF-Core Agents (Tier 1)

| Agent ID | Type | Consumes | Produces | Description |
|----------|------|----------|----------|-------------|
| `pf-core-orchestrator-1.0` | orchestrator | All domain ontologies | orchestration-plan | Master orchestrator coordinating all agents |
| `pf-core-strategic-context-1.0` | domain_specialist | vsom | strategic-context | Provides strategic context from VSOM |
| `pf-core-health-monitor-1.0` | utility | All metrics | health-report | Monitors system health across all agents |
| `pf-core-registry-manager-1.0` | utility | unified_registry | registry-audit | Manages unified registry operations |

### C.2 BAIV Agents (Tier 2)

| Agent ID | Type | Consumes | Produces | Description |
|----------|------|----------|----------|-------------|
| `BAIV-discovery-citation-agent-1.0` | domain_specialist | ai-visibility | citation-opportunities | Discovers citation opportunities |
| `BAIV-analysis-citation-tester-1.0` | domain_specialist | citation-opportunities | citation-test-results | Tests citation effectiveness |
| `BAIV-analysis-gap-analyzer-1.0` | domain_specialist | ai-visibility, brand-analysis | gap-analysis | Identifies visibility gaps |
| `BAIV-generation-content-strategy-1.0` | domain_specialist | gap-analysis | content-recommendation | Generates content recommendations |
| `BAIV-utility-report-generator-1.0` | utility | All BAIV ontologies | visibility-report | Generates visibility reports |

### C.3 W4M Agents (Tier 2)

| Agent ID | Type | Consumes | Produces | Description |
|----------|------|----------|----------|-------------|
| `W4M-analysis-value-engineering-1.0` | domain_specialist | vsom, business-case | value-analysis | Analyzes business value |
| `W4M-orchestrator-program-manager-1.0` | orchestrator | value-analysis | work-breakdown | Manages program execution |
| `W4M-utility-roi-tracking-1.0` | utility | value-analysis | roi-metrics | Tracks ROI metrics |

### C.4 AIR Agents (Tier 2)

| Agent ID | Type | Consumes | Produces | Description |
|----------|------|----------|----------|-------------|
| `AIR-analysis-ai-strategy-1.0` | domain_specialist | vsom, maturity-model | ai-strategy | Develops AI strategy |
| `AIR-analysis-maturity-assessment-1.0` | domain_specialist | customer-org | maturity-model | Assesses AI maturity |
| `AIR-generation-innovation-1.0` | domain_specialist | ai-strategy | innovation-roadmap | Creates innovation roadmap |

---

## APPENDIX D: Integration Code Examples

### D.1 Loading Agent with UnifiedRegistryLoader

```python
from unified_registry_loader import UnifiedRegistryLoader
from base_agent_template import BaseAgentTemplate, TenantContext
from uuid import UUID

# Initialize registry loader
loader = UnifiedRegistryLoader(
    supabase_url="https://your-project.supabase.co",
    supabase_key="your-anon-key"
)

# Load all registry data (agents + ontologies + contracts)
loader.load_all()

# Create tenant context
tenant_ctx = TenantContext(
    tenant_id=UUID("tenant-uuid-here"),
    venture_domain="baiv"
)

# Load specific agent with resolved dependencies
agent = BaseAgentTemplate(
    agent_id="BAIV-discovery-citation-agent",
    version="1.0.0",
    tenant_context=tenant_ctx
)

# Agent now has:
# - agent.spec: AgentSpecification with authority boundary
# - agent.ontology_bindings: Dict of resolved OntologyBinding objects
# - agent.system_prompt: Ontology-aware prompt for Claude
# - agent.tools: Configured Claude tools based on authority

# Execute agent
result = agent.execute(input_data={
    "brand_url": "https://example.com",
    "analysis_type": "citation_discovery"
})
```

### D.2 Validating Output Against Registry

```python
# Agent produces output that must validate against PRODUCES ontology
output_data = {
    "citation_opportunities": [
        {
            "type": "FAQ",
            "confidence": 0.92,
            "location": "product_page"
        }
    ]
}

# Validate against PRODUCES ontology binding
valid, errors = agent.validate_output(
    data=output_data,
    entity_type="CitationOpportunity"
)

if not valid:
    raise ValueError(f"Ontology validation failed: {errors}")

# Register output in unified registry audit log
agent.register_output(
    data=output_data,
    contract_id="BAIV-discovery-citation-agent-output-v1.0.0"
)
```

### D.3 Querying Agent Registry

```python
from unified_registry_client import UnifiedRegistryClient

client = UnifiedRegistryClient()

# Get all agents in a domain
baiv_agents = client.query_agents(domain="baiv", status="active")

# Get agent with dependencies resolved
agent_spec = client.get_agent_with_dependencies(
    agent_id="BAIV-discovery-citation-agent",
    version="1.0.0"
)

# Check for circular dependencies
has_circular = client.check_circular_dependencies(
    agent_id="BAIV-discovery-citation-agent"
)

# Get dependency graph
dep_graph = client.get_dependency_graph(domain="baiv")
```

### D.4 Registry Event Handling

```python
from unified_registry_events import RegistryEventHandler

# Subscribe to registry events
handler = RegistryEventHandler()

@handler.on("agent.registered")
def handle_agent_registered(event):
    """Handle new agent registration"""
    agent_id = event["agent_id"]
    print(f"New agent registered: {agent_id}")
    
    # Validate dependencies
    client.validate_dependencies(agent_id)

@handler.on("ontology.updated")
def handle_ontology_updated(event):
    """Re-validate all agents using this ontology"""
    ontology_id = event["ontology_id"]
    affected_agents = client.get_agents_by_ontology(ontology_id)
    
    for agent in affected_agents:
        agent.revalidate_bindings()

# Start event listener
handler.start()
```

---

*Template Version: 3.0.0 | Framework: PF-Core v3.0 | Compliance: 14-Section Standard + Unified Registry Architecture*

*Migration: Consolidates PF-CORE-AGENT-TEMPLATE-V2.md + PF-Core Agentic Framework v2.1.0*

*© 2026 Platform Foundation Core Holdings. All rights reserved.*

Co-Authored-By: Warp <agent@warp.dev>
