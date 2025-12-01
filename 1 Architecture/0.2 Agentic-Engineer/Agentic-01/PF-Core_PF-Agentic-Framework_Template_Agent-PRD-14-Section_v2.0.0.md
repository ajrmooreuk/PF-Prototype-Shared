# TEMPLATE: Agent PRD (Production Specification)

## `[PF-Instance]-[cluster]-[function]-agent` PRD

**Template Version:** 2.0.0  
**Compliance:** 14-Section Production Standard (P0.1-P0.14)  
**Framework:** W4M 8-Layer Business Framework

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
| **Tier** | `orchestrator` \| `primary` \| `sub-agent` \| `specialist` |
| **Cluster** | `discovery` \| `analysis` \| `generation` \| `optimization` |
| **Scope** | `[PF-Core]` \| `[PF-Instance]` \| `[Product/Service]` |

### P0.1.2 Role Definition

**Primary Role:**
> [Single sentence describing what this agent does]

**Authority Boundaries:**
| Can Do | Cannot Do | Requires Approval |
|--------|-----------|-------------------|
| [Action] | [Limitation] | [Escalation need] |

**Escalation Path:**
```
[Agent] → [Next level agent or human] → [Final escalation]
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

### P0.1.4 Ontology Access

**Core Ontologies [PF-Core]:**
| Ontology ID | Access Level | Purpose |
|-------------|--------------|---------|
| `pf:vsom` | Read | Strategic context |
| `pf:okr` | Read | Objective alignment |
| `pf:tenant` | Read | Tenant context |
| `pf:agent` | Read | Agent capabilities |

**Instance Ontologies [PF-Instance]:**
| Ontology ID | Access Level | Purpose |
|-------------|--------------|---------|
| `[PF-Instance]:[ontology]` | [Read/Write] | [Purpose] |

**Product Ontologies [Product/Service]:**
| Ontology ID | Access Level | Purpose |
|-------------|--------------|---------|
| `[Product/Service]:[ontology]` | [Read/Write] | [Purpose] |

### P0.1.5 Persona

| Attribute | Value |
|-----------|-------|
| **Communication Style** | [Professional/Technical/Friendly/etc] |
| **Expertise Level** | [Expert/Advanced/Intermediate] |
| **Decision Approach** | [Conservative/Balanced/Aggressive] |

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
|--------|--------|--------------------|--------------------|
| [Source 1] | json/text/file | [Validation rules] | `[Ontology reference]` |
| [Source 2] | json/text/file | [Validation rules] | `[Ontology reference]` |

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
| **Instance Namespace** | `[PF-Instance]` |
| **Validation Required** | Yes |
| **Alignment Threshold** | 85% |

### P0.6.3 Quality Standards

| Standard | Requirement | Validation Method |
|----------|-------------|-------------------|
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

### P0.10.4 OAA Integration

| Attribute | Value |
|-----------|-------|
| **Ontology Access** | [List of ontologies] |
| **Access Pattern** | Read/Write/Both |
| **Scope** | Global/Tenant/Process/Task |

### P0.10.5 Event Bus

| Type | Events |
|------|--------|
| **Publishes** | [Events this agent publishes] |
| **Subscribes** | [Events this agent consumes] |

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

---

## P0.14 Maintenance & Updates

### P0.14.1 Versioning

| Attribute | Value |
|-----------|-------|
| **Scheme** | Semantic (major.minor.patch) |
| **Current Version** | [Version] |
| **Breaking Change Policy** | [Policy] |
| **Deprecation Policy** | [Policy] |

### P0.14.2 Update Procedures

| Update Type | Procedure | Testing Required |
|-------------|-----------|-----------------|
| Ontology update | [Procedure] | [Tests] |
| Tool update | [Procedure] | [Tests] |
| Business logic update | [Procedure] | [Tests] |
| W4M layer schema update | [Procedure] | [Tests] |

### P0.14.3 Rollback Procedures

| Attribute | Value |
|-----------|-------|
| **Trigger Conditions** | [When to rollback] |
| **Rollback Steps** | [Procedure] |
| **Verification** | [How to verify] |

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

---

## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Author | | | |
| Technical Reviewer | | | |
| Product Owner | | | |
| Security Reviewer | | | |

---

*Template Version: 2.0.0 | Framework: PF-Core v3.0 | Compliance: 14-Section Standard*
