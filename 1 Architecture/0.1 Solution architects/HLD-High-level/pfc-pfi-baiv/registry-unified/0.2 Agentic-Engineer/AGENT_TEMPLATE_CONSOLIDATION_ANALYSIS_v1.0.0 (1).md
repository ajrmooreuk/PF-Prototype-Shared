# Agent Template Consolidation Analysis v1.0.0

**Date:** 2025-01-01  
**Status:** Analysis Complete - Recommendation Provided  
**Documents Compared:**
- **Template A:** PF-CORE-AGENT-TEMPLATE-V2.md (Solution Architect Template v2.0.0)
- **Template B:** PF-Core Agentic Framework_Template_Agent-PRD-14-Section_v2.1.0.md (Agentic Engineer Template v2.1.0)

---

## Executive Summary

**Recommendation:** **MERGE templates into unified v3.0.0** - Both templates serve agent specification needs but with complementary strengths:
- **Template A** (Solution Architect v2.0): Database-first, JSON-LD focused, OAA Registry integration
- **Template B** (Agentic Engineer v2.1.0): PRD-focused, comprehensive 14-section specification, W4M-aligned

**Merge Strategy:** Template B as base + Template A's registry integration patterns + unified database schema

**Effort:** 6 hours (merge) + 2 hours (validation) = 8 hours total  
**Target Version:** v3.0.0 (PF-Core Unified Agent Specification Template)

---

## 1. Template Comparison Matrix

### 1.1 Purpose & Scope

| Aspect | Template A (v2.0) | Template B (v2.1.0) | Assessment |
|--------|-------------------|---------------------|------------|
| **Primary Purpose** | Database schema + registry format | Complete PRD specification | Complementary |
| **Target Audience** | Solution architects, database engineers | Agentic engineers, implementers | Different audiences |
| **Output Format** | JSON-LD + YAML + SQL | Markdown PRD | Merge needed |
| **Focus** | Data model + storage | Behavior + requirements | Both needed |
| **Depth** | Deep on registry schema | Deep on agent behavior | Both needed |

### 1.2 Content Coverage

| Section | Template A | Template B | Winner | Notes |
|---------|-----------|-----------|---------|-------|
| **Agent Identity** | ✅ JSON-LD @id pattern | ✅ P0.1 (6 subsections) | **B** | B more comprehensive, includes W4M + registry |
| **Classification** | ✅ agentType, domain, tier, class | ✅ Tier, cluster, scope | **Merge** | A has granular classification, B has scope |
| **Ontology Bindings** | ✅ Consumes/Produces/Requires | ✅ P0.1.4 + Data Contracts | **A** | A has structured binding types |
| **Authority Boundary** | ✅ Tier-based access control | ✅ P0.1.2 Authority table | **A** | A more detailed RBAC model |
| **Claude Config** | ✅ Model + tools | ❌ Missing | **A** | B should add this |
| **Dependencies** | ✅ Required/Optional agents | ✅ P0.1.6 Registry dependencies | **Merge** | Both have value |
| **Business Objectives** | ❌ Missing | ✅ P0.2 (5 subsections) | **B** | Critical for PRD |
| **Input Processing** | ❌ Light coverage | ✅ P0.3 (5 subsections) | **B** | B has data contract registry |
| **Decision Framework** | ❌ Missing | ✅ P0.4 (4 subsections) | **B** | Essential for agent logic |
| **Tools & Capabilities** | ✅ Claude tools | ✅ P0.5 (6 subsections) | **B** | B more comprehensive |
| **Output Specs** | ❌ Light (in ontology bindings) | ✅ P0.6 (5 subsections) | **B** | B comprehensive |
| **Error Handling** | ❌ Missing | ✅ P0.7 (4 subsections) | **B** | Critical for production |
| **Context & Memory** | ❌ Missing | ✅ P0.8 (4 subsections) | **B** | Essential for agents |
| **Compliance** | ❌ Missing | ✅ P0.9 (5 subsections) | **B** | Production requirement |
| **Integration Points** | ✅ agent_ontology_bindings table | ✅ P0.10 (7 subsections) | **Merge** | A has DB, B has patterns |
| **Monitoring** | ❌ Missing | ✅ P0.11 (4 subsections) | **B** | Production requirement |
| **Testing** | ✅ Basic testing section | ✅ P0.13 (5 subsections) + TDD | **B** | B aligned with TDD rules |
| **Lifecycle/Versioning** | ✅ status, owner | ✅ P0.14 (5 subsections) | **B** | B comprehensive |
| **Database Schema** | ✅ Complete SQL schema | ❌ Missing | **A** | Critical for implementation |
| **JSON-LD Format** | ✅ Complete @context | ❌ Uses JSON-LD but not standardized | **A** | Semantic web compliance |
| **Agent Catalog** | ✅ Complete catalog (PF/BAIV/W4M/AIR) | ❌ Missing | **A** | Useful reference |

**Summary:**
- Template A wins: 5 sections (Classification, Ontology Bindings, Authority, Database, JSON-LD)
- Template B wins: 11 sections (Objectives, Input/Output/Decision/Error/Context/Compliance/Monitoring/Testing/Lifecycle)
- Merge needed: 3 sections (Identity, Dependencies, Integration)

---

## 2. Critical Differences

### 2.1 Registry Architecture

| Aspect | Template A | Template B | Issue |
|--------|-----------|-----------|-------|
| **Registry Name** | "OAA Registry" | "Unified Registry" | Naming conflict |
| **Registry Table** | `agent_registry` (existing) | Unified registry (new design) | Architecture conflict |
| **Ontology Storage** | `ontologies` table (existing) | Registry-based | Same concept, different impl |
| **Binding Storage** | `agent_ontology_bindings` junction table | Registry API + data contracts | Implementation gap |
| **Registry Integration** | "Integrates With Existing OAA Registry" | "NEW in v2.1.0 Unified Registry" | ⚠️ CRITICAL: Conflicting registry models |

**Resolution:** 
- Unified Registry is the new architecture (per BAIV MVP v2.2.0)
- OAA Registry is legacy/existing system
- Merge should reference Unified Registry with backward compatibility to OAA

### 2.2 Agent ID Format

| Template | Format | Example |
|----------|--------|---------|
| A | `agent-{domain}-{function}-{version}` | `agent-baiv-content-strategy-1.0` |
| B | `[PF-Instance]-[cluster]-[function]-agent` | `BAIV-discovery-citation-agent` |

**Resolution:** Template B format is more aligned with existing PF-Instance naming. Adopt B format.

### 2.3 Ontology Binding Patterns

**Template A (Structured Bindings):**
```json
"ontologyBindings": {
  "consumes": [{"@ref": "baiv:ontology:ai-visibility", "nodeTypes": [...]}],
  "produces": [{"@ref": "pf:ontology:content-recommendation"}],
  "requires": [{"@ref": "pf:ontology:vsom"}]
}
```

**Template B (Flat with Registry):**
```markdown
| Ontology ID | Access Level | Purpose |
| pf:vsom | Read | Strategic context |
```

**Resolution:** Merge both - use A's structured consumes/produces/requires pattern in B's P0.1.4 section.

### 2.4 Authority Model

**Template A:** Tier-based RBAC (tier1/tier2/tier3 with nodeTypes + actions + limits)  
**Template B:** Simple "Authority Boundaries" table (Can/Cannot/Requires Approval)

**Resolution:** A's model is production-grade. Replace B's P0.1.2 Authority Boundaries with A's authority section.

---

## 3. Unique Strengths

### 3.1 Template A Unique Features (Must Preserve)

1. **JSON-LD @context** - Semantic web compliance
2. **agent_registry SQL schema** - Database implementation
3. **agent_ontology_bindings junction table** - Normalized storage
4. **Tier-based RBAC** - Production-grade access control
5. **consumes/produces/requires binding types** - Clear ontology relationships
6. **Agent catalog by domain** - Reference catalog (PF-Core, BAIV, W4M, AIR)
7. **Claude Code SDK configuration** - Model + tools specification
8. **Validation rules checklist** - Schema validation requirements
9. **UnifiedRegistryLoader integration pattern** - Python code example

### 3.2 Template B Unique Features (Must Preserve)

1. **14-Section PRD structure** - Comprehensive specification
2. **W4M 8-Layer Business Framework** - Strategic alignment
3. **P0.2 Core Objectives** - Business value + success criteria
4. **P0.3 Input Processing** - 5-subsection pipeline with data contracts
5. **P0.4 Decision Framework** - W4M-informed decision model
6. **P0.7 Error Handling** - Production error patterns
7. **P0.8 Context & Memory Management** - Token budgets + compaction
8. **P0.9 Compliance & Constraints** - Regulatory + ethical requirements
9. **P0.11 Monitoring & Observability** - Metrics + alerting
10. **P0.12 Example Scenarios** - YAML-based test scenarios
11. **P0.13 Testing & Validation** - TDD compliance (aligns with rules)
12. **P0.1.6 Registry Integration** - Git-based versioning + CI/CD
13. **P0.3.5 Data Contract Registry Compliance** - Schema evolution

---

## 4. Conflicts Requiring Resolution

### 4.1 CRITICAL: Registry Architecture Conflict

| Issue | Template A | Template B | Resolution |
|-------|-----------|-----------|------------|
| Registry name | OAA Registry | Unified Registry | **Use "Unified Registry" (new standard)** |
| Registry status | Existing system | NEW in v2.1.0 | **Unified Registry is target architecture** |
| Migration path | N/A | Not specified | **Add migration section: OAA → Unified** |

### 4.2 Naming Conflicts

| Concept | Template A | Template B | Resolution |
|---------|-----------|-----------|------------|
| Agent tier | tier1/tier2/tier3 | orchestrator/primary/sub-agent/specialist | **Keep both: tier (RBAC), role (functional)** |
| Domain | pf-core/baiv/w4m/air | [PF-Instance] | **Use Template A domain taxonomy** |
| Classification field | agentType (orchestrator/domain_specialist/utility/integration) | Tier (orchestrator/primary/sub-agent/specialist) | **Rename B's "Tier" to "Role", keep A's "agentType"** |

### 4.3 Format Conflicts

| Aspect | Template A | Template B | Resolution |
|--------|-----------|-----------|------------|
| Primary format | JSON-LD + YAML | Markdown PRD | **Both: Markdown PRD + JSON-LD export** |
| Database schema | Explicit SQL | Implied Supabase | **Include SQL schema in appendix** |
| Code examples | Python (UnifiedRegistryLoader) | None | **Include code examples in appendix** |

---

## 5. Merge Recommendation

### 5.1 Unified Template v3.0.0 Structure

**Base:** Template B (14-Section PRD) with Template A enhancements

```
# PF-Core Unified Agent Specification Template v3.0.0

## Document Header
- Agent ID: [PF-Instance]-[cluster]-[function]-agent
- Version: x.y.z
- Compliance: 14-Section + Unified Registry + W4M Framework
- Registry: Unified Registry Architecture v1.0 (migrates from OAA Registry)

## P0.1 Agent Identity & Role
  P0.1.1 Classification (ENHANCED: Add agentType from A, domain taxonomy)
  P0.1.2 Role Definition (ENHANCED: Replace with A's Authority Boundary RBAC)
  P0.1.3 W4M Business Framework Alignment (KEEP from B)
  P0.1.4 Ontology Access (ENHANCED: Add A's consumes/produces/requires structure)
  P0.1.5 Persona (KEEP from B)
  P0.1.6 Unified Registry Integration (ENHANCED: Merge A's JSON-LD + B's Git integration)
  **P0.1.7 Claude Configuration (NEW: Add from A)**

## P0.2 Core Objectives (KEEP from B)
## P0.3 Input Processing (ENHANCED: Keep B's 5 subsections, ensure Data Contract Registry alignment)
## P0.4 Decision Framework (KEEP from B, ensure W4M alignment)
## P0.5 Tools & Capabilities (KEEP from B)
## P0.6 Output Specifications (ENHANCED: Keep B, add A's ontology binding validation)
## P0.7 Error Handling (KEEP from B)
## P0.8 Context & Memory Management (KEEP from B)
## P0.9 Compliance & Constraints (KEEP from B)
## P0.10 Integration Points (ENHANCED: Keep B, add A's agent_ontology_bindings pattern)
## P0.11 Monitoring & Observability (KEEP from B)
## P0.12 Example Scenarios (KEEP from B)
## P0.13 Testing & Validation (KEEP from B - aligns with TDD rules)
## P0.14 Maintenance & Updates (ENHANCED: Add Unified Registry sync procedures)

## APPENDIX A: Database Schema (NEW: Add from A)
  - agent_registry table
  - agent_ontology_bindings table
  - SQL insert examples

## APPENDIX B: JSON-LD Export Format (NEW: Add from A)
  - Complete JSON-LD @context
  - Agent specification JSONB structure

## APPENDIX C: Agent Catalog (NEW: Add from A)
  - PF-Core agents (Tier 1)
  - BAIV agents (Tier 2)
  - W4M agents (Tier 2)
  - AIR agents (Tier 2)

## APPENDIX D: Integration Code Examples (NEW: Add from A)
  - UnifiedRegistryLoader usage
  - Output validation
```

### 5.2 Key Enhancements

#### P0.1.1 Classification (Enhanced)

```markdown
### P0.1.1 Classification

| Attribute | Value |
|-----------|-------|
| **Agent ID** | `[PF-Instance]-[cluster]-[function]-agent` |
| **Agent Type** | orchestrator | domain_specialist | utility | integration |
| **Domain** | pf-core | baiv | w4m | air |
| **Tier (RBAC)** | tier1 | tier2 | tier3 |
| **Role (Functional)** | orchestrator | primary | sub-agent | specialist |
| **Cluster** | discovery | analysis | generation | optimization |
| **Class** | 1 (orchestrator) to 5 (utility) |
| **Scope** | [PF-Core] | [PF-Instance] | [Product/Service] |
```

#### P0.1.2 Authority Boundary (Replaced with Template A's RBAC)

```markdown
### P0.1.2 Authority Boundary

**Tier 1 Access (Strategic):**
| Attribute | Value |
| Read | true/false |
| Write | true/false |
| Node Types | [vsom_vision, vsom_strategy, vsom_objective] |

**Tier 2 Access (Domain):**
| Attribute | Value |
| Domains | [baiv, w4m, air] |
| Read | true/false |
| Write | true/false |
| Node Types | [domain-specific node types] |

**Tier 3 Access (Tenant):**
| Attribute | Value |
| Tenant Scope | current/all |
| Read | true/false |
| Write | true/false |
| Node Types | [tenant-specific node types] |

**Actions:**
- Allowed: [graph_read, graph_write, edge_create, traverse_down, traverse_lateral]
- Prohibited: [graph_delete, traverse_up, export]

**Limits:**
| Limit | Value |
| Max Nodes Per Query | 200 |
| Max Traversal Depth | 4 |
| Rate Limit Per Minute | 30 |
```

#### P0.1.4 Ontology Access (Enhanced with Binding Types)

```markdown
### P0.1.4 Ontology Access

**Consumes (Read-only inputs):**
| Ontology ID | Version | Node Types | Purpose |
| baiv:ontology:ai-visibility | >=1.1.0 | [QueryCategory, PlatformBehavior] | Input data |

**Produces (Write outputs):**
| Ontology ID | Version | Node Types | Purpose |
| pf:ontology:content-recommendation | 1.0.0 | [ContentRecommendation] | Generated output |

**Requires (Strategic context):**
| Ontology ID | Version | Node Types | Purpose |
| pf:ontology:vsom | >=1.0.0 | [VisionStatement, StrategicObjective] | Alignment context |
```

#### P0.1.7 Claude Configuration (NEW)

```markdown
### P0.1.7 Claude Configuration

| Attribute | Value |
|-----------|-------|
| **Model** | claude-sonnet-4-20250514 |
| **Max Tokens** | 4096 |
| **Temperature** | 0.7 |

**Tools:**
| Tool Name | Description |
| read_strategic_context | Read VSOM strategic context from Tier 1 |
| read_domain_graph | Read from domain Tier 2 graph |
| write_tenant_node | Write validated node to Tier 3 |
```

---

## 6. Migration Path

### 6.1 From OAA Registry to Unified Registry

| Step | Action | Impact |
|------|--------|--------|
| 1 | Audit existing `agent_registry` table | Identify all agents in OAA Registry |
| 2 | Map OAA agent specs to Unified Registry schema | Create migration mapping |
| 3 | Deploy Unified Registry database schema | New tables: unified_registry, data_contracts, orchestration_dependencies |
| 4 | Migrate agent records | ETL from agent_registry to unified_registry |
| 5 | Update agent implementations | Point to Unified Registry API |
| 6 | Deprecate OAA Registry | Phase out after 2 version support |

### 6.2 From Template v2.0/v2.1.0 to v3.0.0

| Source Template | Target Section | Action |
|-----------------|----------------|--------|
| A: agent_registry SQL | Appendix A | Copy SQL schema |
| A: JSON-LD format | Appendix B | Copy @context + structure |
| A: Agent catalog | Appendix C | Copy catalog |
| A: Integration patterns | Appendix D | Copy Python code |
| A: Authority boundary | P0.1.2 | Replace B's authority table |
| A: Ontology bindings | P0.1.4 | Add consumes/produces/requires structure |
| A: Claude config | P0.1.7 (NEW) | Add section |
| B: All P0.2-P0.14 | Keep as-is | No changes needed |

---

## 7. Implementation Plan

### 7.1 Merge Tasks

| Task | Description | Effort | Owner |
|------|-------------|--------|-------|
| 1. Create v3.0.0 base | Copy Template B v2.1.0 → v3.0.0 | 15 min | Agentic Engineer |
| 2. Update header | Add v3.0.0 metadata, registry reference | 10 min | Agentic Engineer |
| 3. Enhance P0.1.1 | Add agentType, domain, class, tier/role split | 30 min | Solution Architect |
| 4. Replace P0.1.2 | Copy Authority Boundary RBAC from A | 20 min | Solution Architect |
| 5. Enhance P0.1.4 | Add consumes/produces/requires structure | 30 min | Solution Architect |
| 6. Add P0.1.7 | Copy Claude Configuration from A | 20 min | Solution Architect |
| 7. Create Appendix A | Copy database schema SQL | 30 min | Solution Architect |
| 8. Create Appendix B | Copy JSON-LD format | 30 min | Solution Architect |
| 9. Create Appendix C | Copy agent catalog | 20 min | Solution Architect |
| 10. Create Appendix D | Copy integration code | 30 min | Solution Architect |
| 11. Update P0.1.6 | Merge OAA→Unified Registry migration | 45 min | Both |
| 12. Update P0.10 | Add agent_ontology_bindings pattern | 30 min | Solution Architect |
| 13. Update P0.14 | Add Unified Registry sync procedures | 30 min | Agentic Engineer |
| 14. Validation | Cross-check all sections | 60 min | Both |
| **TOTAL** | | **6 hours** | |

### 7.2 Validation Checklist

- [ ] All Template A unique features preserved (JSON-LD, SQL, RBAC, bindings, catalog, code)
- [ ] All Template B unique features preserved (14 sections, W4M, TDD, registry v2.1.0 features)
- [ ] Naming conflicts resolved (tier vs role, agentType, domain)
- [ ] Registry migration path documented (OAA → Unified)
- [ ] Agent ID format standardized (Template B format)
- [ ] Appendices complete (A: SQL, B: JSON-LD, C: Catalog, D: Code)
- [ ] Compliance rules satisfied (TDD, registry integration, change control)
- [ ] No duplicate content between main body and appendices
- [ ] Version updated to v3.0.0 in header
- [ ] CHANGELOG.md created documenting merge

---

## 8. Recommendation Summary

**MERGE APPROVED** - Templates A and B are complementary and should be unified into v3.0.0.

**Rationale:**
1. **Template A** provides critical database schema, JSON-LD format, RBAC, and registry integration patterns
2. **Template B** provides comprehensive PRD structure, W4M alignment, and production-grade sections (error handling, monitoring, testing)
3. **No fundamental conflicts** - mostly additive merge with naming standardization
4. **Strategic alignment** - Unified Registry is the target architecture, OAA Registry is legacy
5. **User rules compliance** - Aligns with TDD, registry integration, and change control requirements

**Next Steps:**
1. Execute merge plan (6 hours)
2. Validate merged template (2 hours)
3. Update BAIV agents to v3.0.0 template compliance
4. Deprecate separate Template A and B documents
5. Update all references to point to v3.0.0 unified template

**File Locations After Merge:**
- **Unified Template v3.0.0:** `/1 Architecture/0.1 Solution architects/HLD-High-level/pf-core-agents-ref/PF-CORE-UNIFIED-AGENT-TEMPLATE-v3.0.0.md`
- **Deprecated (archive):** 
  - Template A: `PF-CORE-AGENT-TEMPLATE-V2.md` → `archive/`
  - Template B: `PF-Core Agentic Framework_Template_Agent-PRD-14-Section_v2.1.0.md` → `archive/`

---

*© 2025 Platform Foundation Core Holdings. All rights reserved.*
