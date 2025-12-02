# Agent PRD Template

## Document Control
| Field | Value |
|-------|-------|
| **PRD ID** | PRD-AGT-{XXX} |
| **Version** | 1.0.0 |
| **Status** | Draft / In Review / Approved |
| **Author** | {Author Name} |
| **Owner** | {Product Owner} |
| **Agent Tier** | Orchestrator / Primary / Sub-Agent |
| **Cluster** | Discovery / Analysis / Generation / Optimization |
| **Created** | {YYYY-MM-DD} |
| **Last Updated** | {YYYY-MM-DD} |

---

## 1. Strategic Alignment

### 1.1 VSOM Mapping

| VSOM Layer | Reference | Agent Contribution |
|------------|-----------|-------------------|
| **Vision** | {Vision statement excerpt} | {How agent supports long-term vision} |
| **Strategic Objective** | {SO-ID}: {Objective name} | {Direct contribution to objective} |
| **Operational Strategy** | {Strategy reference} | {Implementation approach} |
| **Metrics/KPIs** | {KPI-ID}: {KPI name} | {Measurable impact on KPI} |

### 1.2 OKR Linkage

| Quarter | Objective | Key Result | Agent Contribution |
|---------|-----------|------------|-------------------|
| {Q/Year} | {O-ID}: {Objective} | {KR-ID}: {Key Result} | {How agent delivers KR} |
| {Q/Year} | {O-ID}: {Objective} | {KR-ID}: {Key Result} | {How agent delivers KR} |

### 1.3 Value Proposition Reference

| Element | Description |
|---------|-------------|
| **Value Prop ID** | {VP-AGT-XXX} |
| **Target User** | {Role/Persona} |
| **Primary Jobs Addressed** | {Job 1}, {Job 2}, {Job 3} |
| **Key Pain Relievers** | {Pain 1 → Relief 1}, {Pain 2 → Relief 2} |
| **Value Metrics** | Time saved: {X}, Cost reduced: {Y%}, Quality: {Z} |

---

## 2. Agent Specification

### 2.1 Agent Identity

```json
{
  "@type": "pf:AgentDefinition",
  "@id": "pf:agent/{agent_id}",
  "metadata": {
    "name": "{Agent Name}",
    "version": "1.0.0",
    "tier": "{orchestrator|primary|sub-agent}",
    "cluster": "{discovery|analysis|generation|optimization}",
    "status": "draft"
  },
  "identity": {
    "role": "{Detailed role description - what this agent does and why}",
    "expertise": ["{domain1}", "{domain2}", "{domain3}"],
    "personality_traits": ["precise", "helpful", "strategic"],
    "communication_style": "{formal|conversational|technical}"
  }
}
```

### 2.2 Capabilities Matrix

| Cap ID | Capability | Description | Skills Required | Tools Required | Priority |
|--------|------------|-------------|-----------------|----------------|----------|
| CAP-001 | {Capability name} | {What it does} | `{skill_id}` | `{tool_id}` | Critical |
| CAP-002 | {Capability name} | {What it does} | `{skill_id}` | `{tool_id}` | High |
| CAP-003 | {Capability name} | {What it does} | `{skill_id}` | `{tool_id}` | Medium |

### 2.3 Authority Boundaries

| Action Category | Permitted ✅ | Requires Approval ⚠️ | Prohibited ❌ |
|-----------------|--------------|----------------------|--------------|
| **Data Read** | All tenant data | Cross-tenant | PII without consent |
| **Data Write** | Own domain tables | Shared tables | Audit logs |
| **Data Delete** | Temporary/cache | Production data | - |
| **External API** | Approved list | New integrations | Unapproved services |
| **Agent Delegation** | Sub-agents | Peer agents | Orchestrator |
| **Human Escalation** | Always permitted | - | - |

### 2.4 Escalation Rules

| Trigger Condition | Escalate To | Urgency | Required Info |
|-------------------|-------------|---------|---------------|
| Confidence < 70% | Human operator | Medium | Decision context, options |
| Error rate > 5% | Supervisor agent | High | Error logs, patterns |
| Security concern | Security team | Critical | Full audit trail |
| Business rule conflict | Product owner | High | Conflicting rules |
| Resource limits exceeded | DevOps | Medium | Usage metrics |

---

## 3. Functional Requirements

### 3.1 Core Functions

#### FR-{AGT}-001: {Primary Function Name}

| Attribute | Specification |
|-----------|---------------|
| **Description** | {Detailed description of what this function does} |
| **Trigger** | {When/how this function is invoked} |
| **Input Schema** | See [Input Schema](#fr-001-input) |
| **Output Schema** | See [Output Schema](#fr-001-output) |
| **Dependencies** | {Other functions, agents, or systems required} |
| **Priority** | Critical / High / Medium / Low |
| **Estimated Complexity** | High / Medium / Low |

**Input Schema** {#fr-001-input}
```json
{
  "type": "object",
  "required": ["{required_field_1}", "{required_field_2}"],
  "properties": {
    "{field_1}": {
      "type": "string",
      "description": "{Field description}"
    },
    "{field_2}": {
      "type": "object",
      "description": "{Field description}"
    }
  }
}
```

**Output Schema** {#fr-001-output}
```json
{
  "type": "object",
  "required": ["result", "metadata"],
  "properties": {
    "result": {
      "type": "object",
      "description": "Primary output data"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "agent_id": {"type": "string"},
        "execution_time_ms": {"type": "integer"},
        "confidence": {"type": "number", "minimum": 0, "maximum": 1}
      }
    }
  }
}
```

---

#### FR-{AGT}-002: {Secondary Function Name}

| Attribute | Specification |
|-----------|---------------|
| **Description** | {Description} |
| **Trigger** | {Trigger} |
| **Input Schema** | {Reference or inline} |
| **Output Schema** | {Reference or inline} |
| **Dependencies** | {Dependencies} |
| **Priority** | {Priority} |

---

### 3.2 Integration Requirements

#### IR-{AGT}-001: {Integration Name}

| Attribute | Specification |
|-----------|---------------|
| **External System** | {System name and version} |
| **Protocol** | REST / GraphQL / MCP / WebSocket / gRPC |
| **Data Flow** | Inbound / Outbound / Bidirectional |
| **Authentication** | API Key / OAuth2 / JWT / None |
| **Rate Limits** | {X requests per minute} |
| **Timeout** | {X seconds} |
| **Retry Policy** | {X attempts with exponential backoff} |

---

### 3.3 Data Requirements

#### DR-{AGT}-001: {Data Entity Name}

| Attribute | Specification |
|-----------|---------------|
| **Source** | Database / API / Cache / Event Stream |
| **Table/Endpoint** | `{table_name}` or `{api_endpoint}` |
| **Access Pattern** | Read / Write / Read-Write |
| **Freshness** | Real-time / Near-real-time (<5min) / Batch |
| **Volume** | {Expected records/requests per hour} |
| **Retention** | {Duration} |

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

| NFR ID | Requirement | Target | Measurement Method |
|--------|-------------|--------|-------------------|
| NFR-P-001 | Response latency (P50) | < 500ms | APM monitoring |
| NFR-P-002 | Response latency (P95) | < 2000ms | APM monitoring |
| NFR-P-003 | Response latency (P99) | < 5000ms | APM monitoring |
| NFR-P-004 | Throughput | {X} requests/minute | Load testing |
| NFR-P-005 | Token efficiency | < 4000 tokens/request | SDK metrics |
| NFR-P-006 | Memory usage | < 256MB per instance | Resource monitoring |

### 4.2 Reliability Requirements

| NFR ID | Requirement | Target | Measurement Method |
|--------|-------------|--------|-------------------|
| NFR-R-001 | Availability | 99.5% uptime | Health checks |
| NFR-R-002 | Error rate | < 1% of requests | Error tracking |
| NFR-R-003 | Mean time to recovery | < 5 minutes | Incident metrics |
| NFR-R-004 | Data consistency | 100% (eventual) | Validation checks |
| NFR-R-005 | Graceful degradation | Fallback behavior defined | Manual testing |

### 4.3 Security Requirements

| NFR ID | Requirement | Implementation |
|--------|-------------|----------------|
| NFR-S-001 | Tenant data isolation | Row-Level Security (RLS) |
| NFR-S-002 | Action audit logging | All CRUD operations logged |
| NFR-S-003 | Permission validation | Pre-action authorization check |
| NFR-S-004 | Sensitive data handling | Encryption at rest and in transit |
| NFR-S-005 | Input validation | Schema validation on all inputs |

### 4.4 Scalability Requirements

| NFR ID | Requirement | Target |
|--------|-------------|--------|
| NFR-SC-001 | Concurrent users | {X} simultaneous sessions |
| NFR-SC-002 | Horizontal scaling | Auto-scale at 70% CPU |
| NFR-SC-003 | Data volume | Handle {X} records per tenant |

---

## 5. Technical Architecture

### 5.1 Ontology Requirements

| Ontology ID | Name | Usage | Access Level |
|-------------|------|-------|--------------|
| `pf:core/organization` | Organization Management | Tenant context | Read |
| `{domain}:{ontology}` | {Ontology Name} | {How used by agent} | {Read/Write} |

### 5.2 Database Schema

```sql
-- =============================================================================
-- Agent-specific tables for {Agent Name}
-- =============================================================================

-- Primary data table
CREATE TABLE {agent_prefix}_{entity_name} (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    
    -- Domain-specific columns
    {column_1} {TYPE} {CONSTRAINTS},
    {column_2} {TYPE} {CONSTRAINTS},
    
    -- JSONB for flexible attributes
    attributes JSONB DEFAULT '{}',
    
    -- Audit columns
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_{table}_tenant ON {table}(tenant_id);
CREATE INDEX idx_{table}_created ON {table}(created_at DESC);

-- Row-Level Security
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON {table}
    FOR ALL
    USING (tenant_id = current_setting('app.tenant_id')::UUID);

-- Trigger for updated_at
CREATE TRIGGER update_{table}_timestamp
    BEFORE UPDATE ON {table}
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 5.3 Context Configuration

```json
{
  "context_requirements": {
    "strategic_context": {
      "required": true,
      "include": ["vision", "active_objectives", "relevant_okrs"],
      "max_tokens": 1000
    },
    "domain_context": {
      "ontologies": ["{ontology_id_1}", "{ontology_id_2}"],
      "priority_fields": ["{field_1}", "{field_2}"],
      "max_tokens": 2000
    },
    "session_context": {
      "required": false,
      "include": ["recent_actions", "user_preferences"],
      "max_tokens": 500
    },
    "total_max_tokens": 4000
  }
}
```

### 5.4 Agent Prompt Structure

```xml
<system>
You are {Agent Name}, a {tier} agent in the {cluster} cluster of the Platform Foundation ecosystem.

<identity>
Role: {Detailed role description}
Expertise: {domain1}, {domain2}, {domain3}
Communication Style: {style}
</identity>

<strategic_context>
{{INJECTED_VSOM_CONTEXT}}
</strategic_context>

<capabilities>
You CAN:
- {Capability 1}
- {Capability 2}
- {Capability 3}

You CANNOT:
- {Limitation 1}
- {Limitation 2}
</capabilities>

<decision_framework>
When making decisions:
1. Verify alignment with strategic objectives (alignment score > 0.7)
2. Check authority boundaries before acting
3. Assess confidence level (escalate if < 70%)
4. Log all significant decisions with reasoning
</decision_framework>

<available_tools>
{{TOOL_DESCRIPTIONS}}
</available_tools>

<output_requirements>
Always respond with valid JSON matching the specified output schema.
Include confidence scores and reasoning traces.
</output_requirements>
</system>
```

---

## 6. User Stories & Acceptance Criteria

### 6.1 User Stories

#### US-{AGT}-001: {User Story Title}

> **As a** {user role/persona},  
> **I want to** {action/capability},  
> **So that** {benefit/outcome}.

**Story Points:** {1-13}  
**Priority:** {Must Have / Should Have / Could Have / Won't Have}

**Acceptance Criteria:**

| AC ID | Given | When | Then |
|-------|-------|------|------|
| AC-001 | {Context/precondition} | {Action taken} | {Expected outcome} |
| AC-002 | {Context/precondition} | {Action taken} | {Expected outcome} |
| AC-003 | {Context/precondition} | {Action taken} | {Expected outcome} |

---

#### US-{AGT}-002: {User Story Title}

> **As a** {user role/persona},  
> **I want to** {action/capability},  
> **So that** {benefit/outcome}.

**Story Points:** {X}  
**Priority:** {Priority}

**Acceptance Criteria:**

| AC ID | Given | When | Then |
|-------|-------|------|------|
| AC-001 | {Given} | {When} | {Then} |

---

### 6.2 Platform Stories (Agent-to-Agent)

#### US-{AGT}-P01: Strategic Context Access

> **As an** AI Agent,  
> **I want to** access VSOM context at initialization,  
> **So that** my decisions align with organizational strategy.

**Acceptance Criteria:**

| AC ID | Criterion |
|-------|-----------|
| AC-P01-1 | Agent receives `strategic_context` object on every invocation |
| AC-P01-2 | Context includes active objectives, current OKRs, and relevant metrics |
| AC-P01-3 | Agent can query alignment score for proposed actions |
| AC-P01-4 | Context token usage is tracked and within limits |

---

#### US-{AGT}-P02: Sub-Agent Delegation

> **As a** Primary Agent,  
> **I want to** delegate specialized tasks to sub-agents,  
> **So that** I can leverage specialized capabilities.

**Acceptance Criteria:**

| AC ID | Criterion |
|-------|-----------|
| AC-P02-1 | Agent can invoke sub-agents via standard delegation protocol |
| AC-P02-2 | Context is properly transferred to sub-agent |
| AC-P02-3 | Sub-agent results are validated before use |
| AC-P02-4 | Delegation is logged for audit trail |

---

## 7. Testing Requirements

### 7.1 Test Coverage Targets

| Test Category | Coverage Target | Responsibility | Tools |
|---------------|-----------------|----------------|-------|
| Unit Tests | 90% | Developer | pytest |
| Integration Tests | 85% | Developer | pytest-asyncio |
| Contract Tests | 100% | QA | schemathesis |
| Behavioral Tests | 80% | QA | Custom harness |
| E2E Tests | 70% | QA | Playwright |

### 7.2 Test Scenarios

| Scenario ID | Description | Category | Priority | Status |
|-------------|-------------|----------|----------|--------|
| TS-{AGT}-001 | {Happy path scenario} | Unit | Critical | Pending |
| TS-{AGT}-002 | {Error handling scenario} | Unit | High | Pending |
| TS-{AGT}-003 | {Integration scenario} | Integration | High | Pending |
| TS-{AGT}-004 | {Edge case scenario} | Behavioral | Medium | Pending |
| TS-{AGT}-005 | {Full workflow scenario} | E2E | High | Pending |

### 7.3 Test Data Requirements

| Data Set | Purpose | Source | Refresh Frequency |
|----------|---------|--------|-------------------|
| {Dataset 1} | {Testing purpose} | Fixtures / Generated | Per test run |
| {Dataset 2} | {Testing purpose} | Staging copy | Weekly |

### 7.4 Validation Rules

| Rule ID | Entity | Validation | Error Handling |
|---------|--------|------------|----------------|
| VR-001 | Input | {Validation logic} | Return 400 with details |
| VR-002 | Output | {Validation logic} | Log and retry |
| VR-003 | State | {Validation logic} | Escalate to supervisor |

---

## 8. Implementation Plan

### 8.1 Implementation Phases

| Phase | Duration | Deliverables | Exit Criteria |
|-------|----------|--------------|---------------|
| **1. Foundation** | {X} days | Agent skeleton, test harness | CI/CD pipeline running |
| **2. Core Functions** | {X} days | FR-001, FR-002 implemented | 85% unit test coverage |
| **3. Integration** | {X} days | All integrations connected | Integration tests passing |
| **4. Testing** | {X} days | Full test suite, bug fixes | All tests passing, 85% coverage |
| **5. Deployment** | {X} days | Staging, production deployment | Production health checks green |

### 8.2 Dependencies

| Dependency | Type | Owner | Status | Risk |
|------------|------|-------|--------|------|
| {Dependency 1} | Internal | {Team} | {Status} | Low / Medium / High |
| {Dependency 2} | External | {Vendor} | {Status} | {Risk} |
| {Dependency 3} | Platform | {Team} | {Status} | {Risk} |

### 8.3 Success Metrics

| Metric | Target | Baseline | Measurement Method | Review Frequency |
|--------|--------|----------|-------------------|------------------|
| Task success rate | > 90% | N/A | Outcome tracking | Weekly |
| Response latency P95 | < 2000ms | N/A | APM | Daily |
| Test coverage | > 85% | 0% | CI/CD | Per commit |
| User satisfaction | > 4.0/5 | N/A | Feedback surveys | Monthly |

---

## 9. Appendices

### A. Related Documents

| Document | Location | Purpose |
|----------|----------|---------|
| VSOM Framework | {link} | Strategic alignment reference |
| Ontology Definition | {link} | Data model specification |
| API Documentation | {link} | Integration specifications |
| Testing Guide | {link} | Testing standards and patterns |

### B. Glossary

| Term | Definition |
|------|------------|
| {Term 1} | {Definition} |
| {Term 2} | {Definition} |
| {Term 3} | {Definition} |

### C. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {Date} | {Author} | Initial version |
| | | | |

---

*Template Version: 1.0.0 | Framework: PF-Agent TDD | Last Updated: November 2025*
