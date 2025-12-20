# Agentic Development Frameworks Comparison
## Alternatives to OpenSpec/Beads for PF-Core Platform

**Document:** PFC_AGENTIC_FRAMEWORKS_COMPARISON_v1.md  
**Version:** 1.0.0  
**Date:** December 2025  
**Classification:** Platform Foundation Core - Framework Evaluation  

---

## Executive Summary

Beyond OpenSpec and Beads, the Claude Code ecosystem has evolved significantly in 2025 with several mature frameworks competing for developer adoption. This analysis evaluates **7 major frameworks** against PF-Core's specific requirements: ontology-driven development, VSOM alignment, multi-tenant architecture, and small-team concurrent workflows.

**Recommendation**: For PF-Core, we recommend a **BMAD-SPARC Hybrid** with selective OpenSpec/Beads integration, leveraging Claude-Flow for multi-agent orchestration where needed.

---

## Framework Landscape Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    2025 CLAUDE CODE FRAMEWORK ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SPEC-DRIVEN                    AGENT-DRIVEN                  HYBRID        │
│  ───────────                    ────────────                  ──────        │
│                                                                             │
│  ┌─────────────┐               ┌─────────────┐             ┌─────────────┐ │
│  │ GitHub      │               │ Claude-Flow │             │ BMAD        │ │
│  │ Spec Kit    │               │ (ruvnet)    │             │ Method      │ │
│  │             │               │             │             │             │ │
│  │ • /specify  │               │ • Swarm     │             │ • 19 Agents │ │
│  │ • /plan     │               │   Intel     │             │ • PRD→Story │ │
│  │ • /tasks    │               │ • Memory    │             │ • Sharding  │ │
│  │             │               │ • 100+ MCPs │             │             │ │
│  └─────────────┘               └─────────────┘             └─────────────┘ │
│        │                              │                           │        │
│        │                              │                           │        │
│  ┌─────────────┐               ┌─────────────┐             ┌─────────────┐ │
│  │ OpenSpec    │               │ SPARC       │             │ BMAD-Spec   │ │
│  │             │               │ Framework   │             │ Kit         │ │
│  │ • Intent    │               │             │             │             │ │
│  │   locking   │               │ • 5-phase   │             │ • Combined  │ │
│  │ • Proposals │               │ • TDD focus │             │ • Enterprise│ │
│  │ • Artifacts │               │ • Memory    │             │ • Gates     │ │
│  └─────────────┘               │   Bank      │             └─────────────┘ │
│                                └─────────────┘                             │
│                                                                             │
│  ISSUE TRACKING                 SUB-AGENTS                   PLUGINS        │
│  ──────────────                 ──────────                   ───────        │
│                                                                             │
│  ┌─────────────┐               ┌─────────────┐             ┌─────────────┐ │
│  │ Beads       │               │ Claude      │             │ Awesome     │ │
│  │             │               │ Sub-Agents  │             │ Claude      │ │
│  │ • Git-native│               │ (Native)    │             │ Code        │ │
│  │ • Context   │               │             │             │             │ │
│  │   persist   │               │ • Parallel  │             │ • 65 plugins│ │
│  │ • Deps mgmt │               │ • Isolated  │             │ • 91 agents │ │
│  └─────────────┘               │   contexts  │             │ • 47 skills │ │
│                                └─────────────┘             └─────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Framework Analysis

### 1. BMAD Method (Breakthrough Method for Agile AI-Driven Development)

**Repository**: github.com/bmad-code-org/BMAD-METHOD  
**Maturity**: Production-ready (v5.0+)  
**Community**: Active, 50+ workflows

#### Core Philosophy
BMAD mimics an entire agile team with specialized AI agents for Product Manager, Architect, Developer, QA, UX Designer, and Scrum Master roles. Its key innovation is **document sharding**—transforming comprehensive planning documents into focused, manageable development units while preserving complete context.

#### Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    BMAD TWO-PHASE WORKFLOW                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  PHASE 1: AGENTIC PLANNING (Web UI)                           │
│  ─────────────────────────────────────────────                │
│                                                                │
│  Analyst → PM → Architect → [Human Review Gate]               │
│     │        │       │                                        │
│     ▼        ▼       ▼                                        │
│  Brief    PRD    Architecture                                 │
│                                                                │
│  PHASE 2: CONTEXT-ENGINEERED DEVELOPMENT                      │
│  ───────────────────────────────────────────                  │
│                                                                │
│  Scrum Master → Developer → QA                                │
│       │              │        │                               │
│       ▼              ▼        ▼                               │
│  Sharded        Code      Validation                          │
│  Stories                                                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **19 Specialized Agents** | Role-based expertise | Maps to our agent taxonomy |
| **Document Sharding** | 90% token savings for large projects | Critical for VSOM/ontology docs |
| **Human-in-the-Loop** | Validation gates between phases | Aligns with PRD approval flow |
| **Expansion Packs** | Domain-specific agent teams | Extensible for BAIV/W4M/AIR |
| **IDE Agnostic** | Works with Claude Code, Cursor, Windsurf | Flexibility |
| **Update-Safe Customization** | Configs persist through updates | Enterprise requirement |

#### PF-Core Fit Assessment

**Strengths**:
- Multi-agent orchestration aligns with our 16+ agent architecture
- PRD → Architecture → Story workflow mirrors VSOM → OKR cascade
- Sharding solves ontology document size issues
- Built-in QA agent supports TDD mandate

**Weaknesses**:
- No native issue tracking (needs Beads integration)
- Less git-native than desired for concurrent dev
- Slash commands have known issues in Claude Code (#479)

**Verdict**: ⭐⭐⭐⭐ (4/5) - Strong candidate for planning phase

---

### 2. SPARC Framework (Specification, Pseudocode, Architecture, Refinement, Completion)

**Repository**: github.com/ruvnet/sparc + claude-flow integration  
**Maturity**: Production-ready (v2.0)  
**Community**: Growing, integrated into Claude-Flow

#### Core Philosophy
SPARC provides a 5-phase structured approach that breaks complex tasks into sequential phases with explicit handoffs. Each phase has specific objectives, outputs, and specialized agent modes. The Memory Bank enables multi-agent collaborative development.

#### Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    SPARC 5-PHASE PIPELINE                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐             │
│  │SPECIFICATION│──▶│PSEUDOCODE │──▶│ARCHITECTURE│             │
│  │            │   │            │   │            │             │
│  │ • Objectives│   │ • Algorithms│   │ • Components│            │
│  │ • Require- │   │ • Logic    │   │ • APIs     │             │
│  │   ments    │   │   Flow     │   │ • Data     │             │
│  └────────────┘   └────────────┘   └────────────┘             │
│                                          │                     │
│              ┌───────────────────────────┘                     │
│              ▼                                                 │
│  ┌────────────┐   ┌────────────┐                              │
│  │REFINEMENT │──▶│COMPLETION  │                               │
│  │            │   │            │                               │
│  │ • TDD Cycle│   │ • Deploy   │                               │
│  │ • Optimize │   │ • Document │                               │
│  │ • Review   │   │ • Validate │                               │
│  └────────────┘   └────────────┘                              │
│                                                                │
│  MEMORY BANK: Persistent context across phases                 │
│  ──────────────────────────────────────────────               │
└────────────────────────────────────────────────────────────────┘
```

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **17 Specialized Modes** | Architect, Coder, TDD, Security, DevOps, etc. | Comprehensive coverage |
| **Memory Bank** | Multi-agent knowledge sharing | Critical for context continuity |
| **TDD London School** | Behavior testing with mocks | Aligns with 85%+ coverage target |
| **Parallel Orchestration** | Concurrent development tracks | Small team concurrency |
| **Research Phase** | Automated web research | Competitive analysis support |
| **Claude-Flow Integration** | Swarm intelligence | Multi-agent scaling |

#### PF-Core Fit Assessment

**Strengths**:
- TDD deeply embedded in methodology
- Memory Bank solves context persistence across sessions
- 17 modes cover all development scenarios
- Parallel orchestration for concurrent team work

**Weaknesses**:
- Less emphasis on business planning (complements BMAD)
- Requires Claude-Flow for full capability
- Steeper learning curve than Spec Kit

**Verdict**: ⭐⭐⭐⭐⭐ (5/5) - Excellent for execution phase

---

### 3. Claude-Flow (Multi-Agent Orchestration Platform)

**Repository**: github.com/ruvnet/claude-flow  
**Maturity**: Enterprise-grade (v2.7)  
**Community**: Active, 100+ MCP tools

#### Core Philosophy
Claude-Flow is an enterprise-grade AI orchestration platform combining hive-mind swarm intelligence, persistent memory (AgentDB), and 100+ MCP tools. It provides the infrastructure layer for running multiple frameworks together.

#### Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    CLAUDE-FLOW ARCHITECTURE                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  HIVE-MIND SWARM LAYER                   │ │
│  │                                                          │ │
│  │     Queen Agent                                          │ │
│  │         │                                                │ │
│  │    ┌────┼────┬────┬────┐                                │ │
│  │    ▼    ▼    ▼    ▼    ▼                                │ │
│  │  Worker Worker Worker Worker Worker                      │ │
│  │  (Spec) (Code) (Test) (Deploy)(Research)                │ │
│  └──────────────────────────────────────────────────────────┘ │
│                          │                                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  MEMORY & STORAGE LAYER                  │ │
│  │                                                          │ │
│  │  AgentDB (Vector)    ReasoningBank    Hooks System      │ │
│  │  96x-164x faster     Pattern Search    Pre/Post Ops     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                          │                                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  100+ MCP TOOLS LAYER                    │ │
│  │                                                          │ │
│  │  GitHub  Jira  Notion  Slack  Custom MCP Servers        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **AgentDB** | 96x-164x faster vector search | Knowledge graph queries |
| **25 Claude Skills** | Natural language activated | Discoverable capabilities |
| **Swarm Intelligence** | Queen-led coordination | Complex orchestration |
| **100+ MCP Tools** | Comprehensive integrations | n8n, Figma, Supabase |
| **Dynamic Agent Architecture** | Self-organizing, fault-tolerant | Enterprise resilience |
| **Hybrid Memory** | AgentDB + ReasoningBank | Context engineering |

#### PF-Core Fit Assessment

**Strengths**:
- Provides infrastructure for running BMAD + SPARC
- AgentDB aligns with our knowledge graph architecture
- MCP integration supports Figma Make pipeline
- Enterprise-grade scaling and fault tolerance

**Weaknesses**:
- Overkill for small team (3 developers)
- Additional complexity layer
- Requires significant setup investment

**Verdict**: ⭐⭐⭐ (3/5) - Consider for scaling beyond MVP

---

### 4. GitHub Spec Kit

**Repository**: github.com/github/spec-kit  
**Maturity**: Production-ready  
**Community**: GitHub official, growing

#### Core Philosophy
Spec Kit is GitHub's official toolkit for spec-driven development—a lightweight approach that turns specifications into executable documents. Unlike agent frameworks, it works with ANY AI coding assistant through simple slash commands.

#### Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    SPEC KIT WORKFLOW                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  /specify ───▶ /plan ───▶ /tasks ───▶ Implementation          │
│      │           │          │                                  │
│      ▼           ▼          ▼                                  │
│  spec.md     plan.md    tasks.md                              │
│                                                                │
│  Living Documents (evolve with project)                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **Tool-Agnostic** | Works with any AI assistant | Maximum flexibility |
| **Simple Commands** | /specify, /plan, /tasks | Low learning curve |
| **Living Documents** | Specs evolve with project | Iterative development |
| **Lightweight** | Minimal overhead | Fast startup |
| **GitHub Integration** | Native git workflow | Team collaboration |

#### PF-Core Fit Assessment

**Strengths**:
- Lowest learning curve of all frameworks
- Works immediately with Claude Code
- Lightweight for rapid prototyping

**Weaknesses**:
- No multi-agent orchestration
- Limited issue tracking
- Less suitable for complex, multi-module projects
- Criticism: "Waterfall in disguise" (see Marmelab critique)

**Verdict**: ⭐⭐⭐ (3/5) - Good for simple features, not platform-scale

---

### 5. Awesome Claude Code Ecosystem

**Repository**: github.com/wshobson/agents  
**Maturity**: Production-ready  
**Community**: Active contributions

#### Core Philosophy
A modular plugin architecture providing 65 focused plugins, 91 specialized agents, and 47 skills. The key innovation is **progressive disclosure**—loading only necessary components to minimize token usage.

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **65 Plugins** | Single-purpose, composable | Modular architecture |
| **91 Agents** | Domain experts | Comprehensive coverage |
| **47 Skills** | Progressive disclosure | Token efficiency |
| **15 Orchestrators** | Multi-agent workflows | Complex coordination |
| **Token Optimized** | Average 3.4 components/plugin | Cost efficiency |

#### PF-Core Fit Assessment

**Strengths**:
- Modular matches our platform architecture
- Token optimization critical for production
- Pre-built agents for common scenarios

**Weaknesses**:
- Less integrated than BMAD or SPARC
- Requires assembly of components
- Documentation gaps

**Verdict**: ⭐⭐⭐ (3/5) - Component library, not complete framework

---

### 6. Native Claude Sub-Agents (Anthropic Official)

**Released**: July 2025  
**Maturity**: Production-ready  
**Documentation**: claude.com/docs/agents

#### Core Philosophy
Anthropic's official sub-agent feature allows spawning specialized AI assistants that work collaboratively while maintaining independent contexts. This is the foundational capability all other frameworks build upon.

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **Parallel Execution** | Multiple agents simultaneously | Concurrent development |
| **Isolated Contexts** | No cross-contamination | Clean separation |
| **Native Integration** | No external dependencies | Reliability |
| **Anthropic Support** | Official documentation | Enterprise backing |

#### PF-Core Fit Assessment

**Strengths**:
- Foundation for all other frameworks
- Direct Anthropic support
- Cleanest integration path

**Weaknesses**:
- Raw capability, needs framework structure
- No built-in workflows
- Limited orchestration patterns

**Verdict**: ⭐⭐⭐⭐ (4/5) - Use as foundation layer

---

### 7. BMAD-Spec-Kit Hybrid

**Repository**: github.com/oimiragieo/BMAD-SPEC-KIT  
**Maturity**: Enterprise Edition (v2.1.0)  
**Philosophy**: Best of both worlds

#### Core Philosophy
Combines BMAD's agent orchestration with Spec Kit's specification-driven methodology, adding enterprise features like quality gates, security validation, and Claude thinking optimization.

#### Key Features

| Feature | Description | PF-Core Relevance |
|---------|-------------|-------------------|
| **10 Specialized Agents** | Optimized from BMAD | Focused team |
| **Quality Gates** | 6 validation checkpoints | Enterprise rigor |
| **Claude Thinking Triggers** | ultrathink, think harder, think hard | Reasoning optimization |
| **Enterprise-Safe Mode** | Audit trail, validation | Compliance |
| **JSON Schema Validation** | Artifacts validated against schemas | Ontology alignment |

#### PF-Core Fit Assessment

**Strengths**:
- Enterprise-grade from inception
- Schema validation aligns with OAA Registry
- Thinking optimization for complex reasoning
- Security-first design

**Weaknesses**:
- Newer, less community validation
- Complex setup
- May be over-engineered for MVP

**Verdict**: ⭐⭐⭐⭐ (4/5) - Strong enterprise candidate

---

## Comparative Analysis Matrix

### Capability Comparison

| Capability | BMAD | SPARC | Claude-Flow | Spec Kit | OpenSpec | Beads | BMAD-Spec |
|------------|------|-------|-------------|----------|----------|-------|-----------|
| **Multi-Agent Orchestration** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| **Spec-Driven Planning** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Issue Tracking** | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **TDD Support** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Context Persistence** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Git Native** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Learning Curve** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Enterprise Ready** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Token Efficiency** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### PF-Core Requirements Mapping

| PF-Core Requirement | Best Framework | Rationale |
|---------------------|----------------|-----------|
| **VSOM Cascade** | BMAD | PRD → Architecture → Story maps to Vision → Strategy → OKR |
| **Ontology Compliance** | BMAD-Spec | JSON Schema validation aligns with OAA Registry |
| **TDD Enforcement** | SPARC | London School TDD deeply embedded |
| **Context Continuity** | Claude-Flow | AgentDB + ReasoningBank memory |
| **Concurrent Development** | Beads | Git-native, dependency tracking |
| **Multi-Tenant** | Claude-Flow | Swarm isolation, enterprise features |
| **Figma Make Pipeline** | Any + MCP | MCP servers for Figma integration |
| **85%+ Test Coverage** | SPARC | Built-in coverage tracking |

---

## Recommended Architecture for PF-Core

### Hybrid Stack Recommendation

Based on the analysis, we recommend a **layered hybrid approach**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PF-CORE RECOMMENDED ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LAYER 1: STRATEGIC PLANNING                                               │
│  ═══════════════════════════════════════════════════════════════════════   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    BMAD METHOD (Modified)                           │   │
│  │                                                                     │   │
│  │  Analyst Agent → PM Agent → Architect Agent                        │   │
│  │       │              │              │                              │   │
│  │       ▼              ▼              ▼                              │   │
│  │  VSOM Brief      PRD (with      Architecture                       │   │
│  │  (Strategic      OAA Registry   (Ontology-                         │   │
│  │   Context)       compliance)    grounded)                          │   │
│  │                                                                     │   │
│  │  [HUMAN APPROVAL GATE]                                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                               │                                            │
│                               ▼                                            │
│  LAYER 2: EXECUTION                                                        │
│  ═══════════════════════════════════════════════════════════════════════   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SPARC FRAMEWORK                                  │   │
│  │                                                                     │   │
│  │  Specification → Pseudocode → Architecture → Refinement → Complete │   │
│  │       │              │              │             │            │    │   │
│  │       └──────────────┼──────────────┼─────────────┤            │    │   │
│  │                      ▼              ▼             ▼            ▼    │   │
│  │                  SPARC MEMORY BANK                                 │   │
│  │                  (Context Persistence)                             │   │
│  │                                                                     │   │
│  │  [TDD: RED → GREEN → REFACTOR]                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                               │                                            │
│                               ▼                                            │
│  LAYER 3: WORK TRACKING                                                    │
│  ═══════════════════════════════════════════════════════════════════════   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    BEADS (Git-Native)                               │   │
│  │                                                                     │   │
│  │  Epic → Feature → Task → [Dependencies] → Ready Query               │   │
│  │                                                                     │   │
│  │  • Branch isolation per task                                       │   │
│  │  • Dependency graph for sequencing                                 │   │
│  │  • Labels aligned to VSOM/BSC taxonomy                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FOUNDATION: NATIVE CLAUDE SUB-AGENTS                                      │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Implementation Phases

**Phase 1 (Weeks 1-2): Foundation Setup**
- Install native Claude sub-agents
- Configure SPARC Memory Bank
- Initialize Beads with PF-Core taxonomy

**Phase 2 (Weeks 3-4): Planning Layer**
- Install BMAD Method (modified for VSOM)
- Create PF-Core expansion pack
- Configure approval gates

**Phase 3 (Weeks 5-6): Execution Layer**
- Integrate SPARC TDD workflow
- Connect Memory Bank to Beads
- Establish conversion pipeline

**Phase 4 (Weeks 7-8): Validation**
- Run pilot with VSOM Phase 1
- Measure token efficiency
- Refine workflow based on feedback

---

## Decision Matrix for Framework Selection

Use this matrix to guide framework choices based on task complexity:

| Task Type | Primary Framework | Secondary | Bypass Option |
|-----------|-------------------|-----------|---------------|
| **New PF-Core Module** | BMAD + SPARC | Beads | Never |
| **Ontology Changes** | BMAD (Architect) | - | Never |
| **Feature Development** | SPARC | Beads | - |
| **Bug Fix < 2 hours** | - | Beads | Direct |
| **Documentation** | - | Beads | Direct |
| **Research Spike** | SPARC (Research) | - | - |
| **UI Component** | SPARC | Beads | Direct if simple |
| **API Endpoint** | SPARC (TDD) | Beads | - |
| **Database Migration** | BMAD + SPARC | - | Never |
| **Agent Definition** | BMAD (full) | SPARC | Never |

---

## Appendix: Installation Commands

### Quick Start for PF-Core Stack

```bash
# 1. Initialize BMAD Method
npx bmad-method install

# 2. Initialize SPARC (via Claude-Flow if needed)
# Option A: Standalone SPARC
pip install sparc-framework

# Option B: SPARC via Claude-Flow
npx claude-flow@alpha init --sparc

# 3. Initialize Beads
bd init --prefix pfc

# 4. Configure SPARC Memory Bank
npx claude-flow@alpha memory init --reasoningbank

# 5. Verify installation
bmad --version
sparc --version
bd --version
```

### Configuration Files

**BMAD Configuration (.bmad/config.yaml)**:
```yaml
project:
  name: "Platform Foundation Core"
  methodology: "agile"
  
agents:
  analyst:
    focus: ["vsom", "market_analysis", "competitive"]
  pm:
    focus: ["prd", "okr_cascade", "acceptance_criteria"]
  architect:
    focus: ["ontology", "schema_org", "supabase"]
  developer:
    focus: ["tdd", "claude_code", "figma_make"]

quality_gates:
  prd_approval: true
  architecture_review: true
  test_coverage_minimum: 85
```

**SPARC Configuration (.sparc/config.yaml)**:
```yaml
methodology: "london_tdd"
memory_bank:
  enabled: true
  namespace: "pfc"
  
phases:
  specification:
    include_vsom_context: true
  architecture:
    schema_validation: "oaa_registry"
  refinement:
    coverage_target: 85
```

---

## Conclusion

For PF-Core's specific requirements—ontology-driven development, VSOM alignment, multi-tenant architecture, and small-team concurrent workflows—the recommended stack is:

1. **BMAD** for strategic planning (PRD, Architecture)
2. **SPARC** for execution (TDD, Memory Bank)
3. **Beads** for work tracking (Git-native, dependencies)
4. **Native Claude Sub-Agents** as the foundation

This combination provides the structure of enterprise frameworks while maintaining the flexibility needed for agile platform development.

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | December 2025 | Platform Architecture | Initial framework comparison |

---

*© 2025 Platform Foundation Core Holdings. Confidential - Limited Use License.*
