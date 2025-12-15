# PF-Core Hybrid Development Strategy
## Spec-Driven + Issue-Tracking for Claude Agentic SDK Platform

**Document:** PFC_HYBRID_SPECBEADS_STRATEGY_v1.md  
**Version:** 1.0.0  
**Date:** December 2025  
**Classification:** Platform Foundation Core - Development Methodology  
**Author:** Platform Architecture Team

---

## Executive Summary

This document establishes a **hybrid development methodology** for the Platform Foundation Core (PF-Core) that leverages the strategic strengths of both **Spec-Driven Development** (OpenSpec/Spec Kit) and **Issue-Tracking** (Beads) approaches. The methodology creates a unified pipeline optimized for small-team concurrent development with Claude Agent SDK orchestration.

**Key Insight**: These approaches solve different problems at different phases. Spec-Driven excels at *thinking and scoping before coding*, while Beads optimizes *tracking and executing work over time*. Maximum value emerges from using them as a **single integrated pipeline**: `Spec → OpenSpec → Beads → Claude Execution`.

---

## Strategic Positioning Matrix

| Dimension | Spec-Driven (OpenSpec/Spec Kit) | Issue-Tracking (Beads) | Hybrid Value |
|-----------|--------------------------------|------------------------|--------------|
| **Primary Focus** | Intent locking & contract definition | Work persistence & context continuity | Complete lifecycle coverage |
| **Optimal Phase** | Pre-implementation scoping | Multi-session execution | End-to-end orchestration |
| **Artifact Type** | Proposals, specs, design docs | Issues, dependencies, ready-work queries | Strategic specs → tactical issues |
| **AI Leverage** | Structured AI collaboration | High-leverage Claude Code integration | Seamless AI-assisted pipeline |
| **Team Benefit** | Deterministic, reviewable change artifacts | Git-native, branch-isolated tracking | Auditable, traceable development |

---

## PF-Core Hybrid Architecture

### The Integrated Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PF-CORE HYBRID DEVELOPMENT PIPELINE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔══════════════════╗    ╔══════════════════╗    ╔══════════════════╗      │
│  ║   PHASE 1        ║    ║   PHASE 2        ║    ║   PHASE 3        ║      │
│  ║   SPECIFICATION  ║───▶║   CONVERSION     ║───▶║   EXECUTION      ║      │
│  ║                  ║    ║                  ║    ║                  ║      │
│  ║  OpenSpec        ║    ║  openspec-to-    ║    ║  Beads           ║      │
│  ║  /Spec Kit       ║    ║  beads           ║    ║  + Claude Code   ║      │
│  ╚══════════════════╝    ╚══════════════════╝    ╚══════════════════╝      │
│                                                                             │
│  Artifacts:              Artifacts:              Artifacts:                 │
│  • proposal.md           • Epic issues           • Ready-work queries       │
│  • specs/                • Task issues           • Dependency resolution    │
│  • tasks.md              • Dependencies          • Branch-isolated work     │
│  • design/               • Labels & priorities   • Completion tracking      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                         CLAUDE AGENT SDK ORCHESTRATION                      │
│                                                                             │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │ Spec Validator │  │ Issue Generator│  │ Work Executor  │                │
│  │ Agent          │  │ Agent          │  │ Agent          │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase Gate Definitions

**Gate 1: Spec Approval → Issue Conversion**
- Human review required on `proposal.md` and `tasks.md`
- Minimum one approval from designated reviewer
- Strategic alignment validated against VSOM objectives

**Gate 2: Issue Ready → Claude Execution**
- All dependencies resolved
- Labels and priorities assigned
- Branch isolation confirmed
- Test criteria defined (TDD principle)

---

## Implementation Framework

### Layer 1: Spec-Driven Foundation (OpenSpec)

**Scope Definition**: The following change types REQUIRE specification:

| Change Category | Spec Required | Rationale |
|-----------------|---------------|-----------|
| New PF-Core modules | ✅ Mandatory | Strategic impact, multi-venture implications |
| VSOM layer additions | ✅ Mandatory | Cascade effects to OKR and metrics |
| Agent definitions | ✅ Mandatory | Orchestration dependencies |
| Ontology modifications | ✅ Mandatory | Schema.org compliance, OAA Registry |
| Database schema changes | ✅ Mandatory | JSONB storage patterns, RLS policies |
| API surface changes | ✅ Mandatory | Integration contracts |
| UI/UX major flows | ✅ Mandatory | Figma Make pipeline alignment |
| Bugfixes < 2 hours | ❌ Optional | Direct to Beads |
| Documentation updates | ❌ Optional | Direct to Beads |
| Styling/cosmetic changes | ❌ Optional | Direct to Beads |

**OpenSpec Configuration for PF-Core:**

```bash
# Initialize OpenSpec in PF-Core repo
openspec init --tool claude-code

# Directory structure created:
.openspec/
├── config.yaml           # OpenSpec settings
├── templates/
│   ├── proposal.md       # PF-Core proposal template
│   ├── spec.md          # Technical spec template
│   └── tasks.md         # Task breakdown template
└── changes/
    └── {change-id}/     # Per-change artifacts
```

**PF-Core Proposal Template:**

```markdown
# Change Proposal: {CHANGE_ID}

## Strategic Alignment
- **VSOM Layer**: {Vision|Strategy|Objectives|Metrics}
- **BSC Perspective**: {Financial|Customer|Internal|Learning|Stakeholder}
- **Linked OKRs**: {OKR references}

## Problem Statement
{Concise problem definition with business impact}

## Proposed Solution
{High-level solution approach}

## Scope Definition
### In Scope
{Explicit inclusions}

### Out of Scope
{Explicit exclusions - critical for AI agent boundaries}

## Technical Approach
- **Ontology Impact**: {Schema.org extensions required}
- **Database Changes**: {Supabase schema modifications}
- **Agent Involvement**: {Agent SDK agents affected}
- **UI/UX Changes**: {Figma Make components}

## Success Criteria
{Measurable outcomes - TDD-ready acceptance criteria}

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|

## Approval
- [ ] Technical Review: {Reviewer}
- [ ] Strategic Alignment: {Reviewer}
- [ ] Ready for Implementation: {Date}
```

### Layer 2: Issue Conversion Bridge (openspec-to-beads)

**Automatic Conversion Pattern:**

When specs are approved, the `openspec-to-beads` skill converts specifications into Beads-trackable work:

```
Approved Spec → [openspec-to-beads] → Beads Epic + Tasks
     │                                      │
     │                                      ├── Feature Epic
     │                                      │   ├── Task 1 (dependencies: [])
     │                                      │   ├── Task 2 (dependencies: [task-1])
     │                                      │   ├── Task 3 (dependencies: [task-2])
     │                                      │   └── ...
     │                                      │
     └── Spec artifacts linked ─────────────┘
```

**Conversion Rules:**

```yaml
# .openspec/beads-mapping.yaml
conversion_rules:
  epic_from: proposal.md
  tasks_from: tasks.md
  
  label_mapping:
    strategic_alignment.vsom_layer:
      vision: "layer:vision"
      strategy: "layer:strategy"
      objectives: "layer:objectives"
      metrics: "layer:metrics"
    
    bsc_perspective:
      financial: "bsc:financial"
      customer: "bsc:customer"
      internal: "bsc:internal"
      learning: "bsc:learning"
      stakeholder: "bsc:stakeholder"
  
  priority_mapping:
    strategic_priority: "P1"
    operational_priority: "P2"
    enhancement: "P3"
    
  dependency_inference: true
  branch_naming: "feat/{change-id}-{task-number}"
```

### Layer 3: Execution Engine (Beads + Claude Code)

**Beads Configuration for PF-Core:**

```bash
# Initialize Beads in PF-Core repo
bd init --prefix pfc

# Creates:
.beads/
├── config.jsonl          # Beads configuration
├── issues.jsonl          # Issue database
└── db.sqlite            # Query optimization
```

**Issue Type Taxonomy for PF-Core:**

| Type | Description | Example |
|------|-------------|---------|
| `epic` | Strategic initiative from approved spec | VSOM Module Implementation |
| `feature` | Deliverable feature from spec tasks | Vision & Mission Manager |
| `task` | Implementation unit | Create CRUD operations |
| `bug` | Defect in existing functionality | Health status calculation error |
| `tech-debt` | Code quality improvement | Refactor JSONB storage patterns |
| `spike` | Research/investigation | Evaluate schema.org extensions |

**Label Taxonomy:**

```yaml
labels:
  # VSOM Layer Labels
  - layer:vision
  - layer:strategy
  - layer:objectives
  - layer:metrics
  
  # BSC Perspective Labels
  - bsc:financial
  - bsc:customer
  - bsc:internal
  - bsc:learning
  - bsc:stakeholder
  
  # Technical Domain Labels
  - domain:ontology
  - domain:database
  - domain:agent
  - domain:ui
  - domain:api
  
  # Platform Instance Labels
  - instance:baiv
  - instance:w4m
  - instance:air
  - instance:pf-core
  
  # Priority Labels
  - priority:P1-critical
  - priority:P2-high
  - priority:P3-medium
  - priority:P4-low
```

---

## Claude Agent SDK Integration

### Agent Orchestration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLAUDE AGENT SDK - PF-CORE ORCHESTRATION                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     MASTER ORCHESTRATOR AGENT                        │   │
│  │  • Reads VSOM context for strategic alignment                        │   │
│  │  • Routes work based on spec approval status                         │   │
│  │  • Manages inter-agent dependencies                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│         ┌────────────────────┼────────────────────┐                        │
│         ▼                    ▼                    ▼                         │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐                 │
│  │   SPEC      │      │   ISSUE     │      │   WORK      │                 │
│  │   AGENT     │      │   AGENT     │      │   AGENT     │                 │
│  │             │      │             │      │             │                 │
│  │ • Proposal  │      │ • Epic      │      │ • Ready     │                 │
│  │   drafting  │      │   creation  │      │   queries   │                 │
│  │ • Spec      │      │ • Task      │      │ • Code      │                 │
│  │   writing   │      │   breakdown │      │   execution │                 │
│  │ • Task      │      │ • Dependency│      │ • Test      │                 │
│  │   generation│      │   mapping   │      │   execution │                 │
│  └─────────────┘      └─────────────┘      └─────────────┘                 │
│         │                    │                    │                         │
│         ▼                    ▼                    ▼                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       SHARED CONTEXT LAYER                           │   │
│  │  • VSOM strategic context                                            │   │
│  │  • OAA Registry ontology compliance                                  │   │
│  │  • Beads issue graph                                                 │   │
│  │  • Git branch state                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Agent Definitions

**1. Spec Agent (Pre-Implementation)**

```python
# agent_definitions/spec_agent.py
from claude_sdk import Agent, Context

spec_agent = Agent(
    name="pfc-spec-agent",
    description="Manages spec-driven development workflow for PF-Core",
    
    capabilities=[
        "proposal_drafting",
        "spec_generation",
        "task_breakdown",
        "strategic_alignment_validation"
    ],
    
    context_requirements=[
        "vsom_context",           # Strategic alignment
        "existing_specs",         # Avoid duplication
        "ontology_registry",      # Schema compliance
        "acceptance_criteria"     # TDD readiness
    ],
    
    commands=[
        "/spec:proposal <description>",    # Generate proposal
        "/spec:expand <proposal>",          # Expand to full spec
        "/spec:tasks <spec>",               # Generate task breakdown
        "/spec:validate <spec>"             # Validate strategic alignment
    ],
    
    output_artifacts=[
        "proposal.md",
        "specs/*.md",
        "tasks.md"
    ]
)
```

**2. Issue Agent (Conversion & Tracking)**

```python
# agent_definitions/issue_agent.py
from claude_sdk import Agent, Context

issue_agent = Agent(
    name="pfc-issue-agent",
    description="Converts approved specs to Beads issues and manages tracking",
    
    capabilities=[
        "spec_to_epic_conversion",
        "task_issue_creation",
        "dependency_mapping",
        "label_assignment",
        "priority_setting"
    ],
    
    context_requirements=[
        "approved_specs",        # Source material
        "beads_config",          # Taxonomy & rules
        "existing_issues",       # Avoid duplication
        "team_capacity"          # Work distribution
    ],
    
    commands=[
        "/issue:convert <spec>",           # Spec → Beads epic
        "/issue:breakdown <epic>",          # Epic → tasks
        "/issue:dependencies <task>",       # Set dependencies
        "/issue:ready"                      # Query ready work
    ],
    
    integration_points=[
        "beads_cli",
        "openspec_to_beads_skill"
    ]
)
```

**3. Work Agent (Execution)**

```python
# agent_definitions/work_agent.py
from claude_sdk import Agent, Context

work_agent = Agent(
    name="pfc-work-agent",
    description="Executes implementation work from Beads issues",
    
    capabilities=[
        "ready_work_selection",
        "branch_management",
        "code_implementation",
        "test_execution",
        "issue_status_updates"
    ],
    
    context_requirements=[
        "beads_ready_query",      # Available work
        "spec_context",           # Implementation guidance
        "test_criteria",          # TDD requirements
        "branch_state"            # Git context
    ],
    
    commands=[
        "/work:next",                       # Get next ready task
        "/work:start <issue>",              # Start working issue
        "/work:implement",                  # Execute implementation
        "/work:test",                       # Run tests
        "/work:complete <issue>"            # Mark complete
    ],
    
    execution_patterns=[
        "tdd_red_green_refactor",
        "branch_per_task",
        "atomic_commits"
    ]
)
```

---

## Workflow Patterns

### Pattern 1: New PF-Core Module Development

**Scenario**: Implementing a new VSOM-aligned module (e.g., Phase 1 Vision & Mission Manager)

```
┌─────────────────────────────────────────────────────────────────────┐
│ Step 1: Strategic Initiation                                        │
├─────────────────────────────────────────────────────────────────────┤
│ Developer: "Create proposal for Vision & Mission Manager"           │
│                                                                     │
│ Spec Agent:                                                         │
│   1. Reads VSOM PRD context                                         │
│   2. Identifies BSC alignment (all perspectives)                    │
│   3. Generates proposal.md with:                                    │
│      - Strategic alignment to VSOM Layer 1                          │
│      - Acceptance criteria from PRD                                 │
│      - Database schema requirements                                 │
│      - UI/UX specifications                                         │
│   4. Creates draft spec with ontology requirements                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Step 2: Human Review (Gate 1)                                       │
├─────────────────────────────────────────────────────────────────────┤
│ Reviewer:                                                           │
│   1. Validates strategic alignment                                  │
│   2. Confirms scope boundaries                                      │
│   3. Approves acceptance criteria                                   │
│   4. Signs off on proposal                                          │
│                                                                     │
│ ✅ Approval triggers conversion                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Step 3: Issue Conversion                                            │
├─────────────────────────────────────────────────────────────────────┤
│ Issue Agent (via openspec-to-beads):                                │
│   1. Creates Epic: "VSOM-001: Vision & Mission Manager"             │
│   2. Generates Tasks:                                               │
│      - VSOM-001-T1: Design ontology (deps: none)                    │
│      - VSOM-001-T2: Create Supabase schema (deps: T1)               │
│      - VSOM-001-T3: Implement CRUD operations (deps: T2)            │
│      - VSOM-001-T4: Build UI with Figma Make (deps: T3)             │
│      - VSOM-001-T5: Integration tests (deps: T4)                    │
│   3. Assigns labels: layer:vision, bsc:all, domain:ontology         │
│   4. Sets priorities: P1-critical                                   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Step 4: Concurrent Execution                                        │
├─────────────────────────────────────────────────────────────────────┤
│ Developer A: "What's ready for me?"                                 │
│                                                                     │
│ Work Agent:                                                         │
│   > beads ready --labels priority:P1-critical                       │
│   Returns: VSOM-001-T1 (Design ontology) - no dependencies          │
│                                                                     │
│   1. Creates branch: feat/vsom-001-t1-ontology                      │
│   2. Implements with TDD (test first)                               │
│   3. Validates against OAA Registry                                 │
│   4. Marks T1 complete, T2 becomes ready                            │
│                                                                     │
│ Developer B (concurrent):                                           │
│   > beads ready --labels domain:ui                                  │
│   (Waits for dependencies or works on parallel track)               │
└─────────────────────────────────────────────────────────────────────┘
```

### Pattern 2: Bugfix (Direct to Beads)

**Scenario**: Quick fix that doesn't warrant full spec

```
Developer: "Health status calculation showing wrong color thresholds"

Work Agent:
  1. Creates Beads issue directly (no spec required):
     bd create bug "Health status threshold calculation error" \
       --labels domain:metrics,priority:P2-high \
       --description "Red threshold triggering at 60% instead of 50%"
  
  2. Assigns to ready queue
  3. Developer works directly from Beads issue
  4. No spec overhead for <2 hour fix
```

### Pattern 3: Multi-Team Concurrent Development

**Scenario**: Three developers working on VSOM Phase 1 simultaneously

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CONCURRENT WORK ALLOCATION                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Developer A                Developer B              Developer C    │
│  ┌──────────────┐          ┌──────────────┐        ┌──────────────┐│
│  │ VSOM-001-T1  │          │ UI Component │        │ Test Suite   ││
│  │ Ontology     │          │ Library Setup│        │ Framework    ││
│  │ Design       │          │ (parallel)   │        │ (parallel)   ││
│  └──────────────┘          └──────────────┘        └──────────────┘│
│         │                         │                       │        │
│         ▼                         │                       │        │
│  ┌──────────────┐                 │                       │        │
│  │ VSOM-001-T2  │                 │                       │        │
│  │ Database     │◀────────────────┤                       │        │
│  │ Schema       │                 │                       │        │
│  └──────────────┘                 ▼                       │        │
│         │                  ┌──────────────┐               │        │
│         └─────────────────▶│ VSOM-001-T4  │◀──────────────┘        │
│                            │ UI Build     │                        │
│                            │ (Figma Make) │                        │
│                            └──────────────┘                        │
│                                   │                                │
│                                   ▼                                │
│                            ┌──────────────┐                        │
│                            │ VSOM-001-T5  │                        │
│                            │ Integration  │                        │
│                            │ Tests        │                        │
│                            └──────────────┘                        │
│                                                                     │
│  Beads dependency graph ensures correct sequencing                 │
│  Claude agents query `beads ready` for next available work         │
│  Branch isolation prevents conflicts                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Governance Framework

### Decision Authority Matrix

| Decision Type | Spec Agent Authority | Human Authority |
|--------------|---------------------|-----------------|
| Generate proposal draft | ✅ Full | Review only |
| Approve spec for implementation | ❌ None | ✅ Required |
| Convert spec to issues | ✅ Full (post-approval) | Override option |
| Set task dependencies | ✅ Full | Override option |
| Assign priorities | ✅ Suggest | ✅ Final approval |
| Select next ready work | ✅ Full | Override option |
| Mark task complete | ✅ Conditional | Review if flagged |
| Modify ontology schema | ❌ Propose only | ✅ Required |
| Database migration | ❌ Propose only | ✅ Required |

### Spec Bypass Criteria

Direct-to-Beads work allowed when ALL conditions met:

1. Estimated effort < 2 hours
2. No database schema changes
3. No ontology modifications
4. No API contract changes
5. No multi-agent coordination
6. Single developer scope
7. Existing test coverage adequate

### Review Checkpoints

| Checkpoint | Trigger | Reviewers | Criteria |
|------------|---------|-----------|----------|
| Spec Review | Proposal complete | Tech Lead + PO | Strategic alignment, feasibility |
| Design Review | Spec complete | Architect | Ontology compliance, patterns |
| Code Review | PR submitted | Peer | TDD coverage, style, function |
| Integration Review | Feature complete | QA + Tech Lead | End-to-end validation |

---

## Tooling Configuration

### Repository Structure

```
pf-core/
├── .openspec/                    # Spec-driven configuration
│   ├── config.yaml
│   ├── templates/
│   │   ├── proposal.md
│   │   ├── spec.md
│   │   └── tasks.md
│   └── changes/
│       └── {change-id}/
│
├── .beads/                       # Issue tracking configuration
│   ├── config.jsonl
│   ├── issues.jsonl
│   └── db.sqlite
│
├── agents/                       # Claude Agent SDK definitions
│   ├── spec_agent.py
│   ├── issue_agent.py
│   ├── work_agent.py
│   └── orchestrator.py
│
├── ontologies/                   # Schema.org grounded definitions
│   ├── vsom-ontology.json
│   ├── cmo-okr-ontology.json
│   └── oaa-registry.json
│
├── supabase/                     # Database artifacts
│   ├── migrations/
│   └── schemas/
│
├── src/                          # Application source
│   ├── components/               # Figma Make generated
│   ├── agents/                   # Agent implementations
│   └── lib/
│
├── tests/                        # TDD test suites
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/                         # Documentation
    ├── specs/                    # Approved specifications
    └── architecture/
```

### CLI Commands Reference

**Spec Workflow Commands:**

```bash
# Initialize OpenSpec
openspec init --tool claude-code

# Create new proposal
openspec proposal "Vision & Mission Manager"

# Expand proposal to spec
openspec spec expand changes/vsom-001/proposal.md

# Generate tasks from spec
openspec tasks changes/vsom-001/spec.md

# Validate spec compliance
openspec validate changes/vsom-001/
```

**Issue Workflow Commands:**

```bash
# Initialize Beads
bd init --prefix pfc

# Convert approved spec to epic
bd convert --spec changes/vsom-001/ --type epic

# Create standalone issue
bd create task "Implement health status calculation" \
  --labels domain:metrics,priority:P2 \
  --depends-on pfc-123

# Query ready work
bd ready --labels priority:P1

# Query ready work for specific domain
bd ready --labels domain:ontology

# Update issue status
bd update pfc-124 --status in-progress

# Complete issue
bd complete pfc-124 --notes "Implemented with 95% test coverage"

# View dependency graph
bd graph pfc-epic-001
```

**Claude Agent Commands:**

```bash
# Start spec creation session
/spec:proposal "Add Strategic Objectives Manager to VSOM"

# Expand to full spec
/spec:expand

# Generate implementation tasks
/spec:tasks

# Validate strategic alignment
/spec:validate

# Convert approved spec to issues
/issue:convert

# Get next ready work
/work:next

# Start specific task
/work:start pfc-125

# Run implementation with TDD
/work:implement --tdd

# Complete task
/work:complete pfc-125
```

---

## Success Metrics

### Process Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Spec-to-Implementation Time | < 3 days for P1 | Time from approval to first commit |
| Issue Resolution Rate | 85% within sprint | Completed vs. created ratio |
| Dependency Accuracy | > 95% | Tasks completed in predicted order |
| Spec Bypass Rate | < 20% of all work | Direct-to-Beads vs. spec-driven |
| TDD Coverage | > 85% | Test coverage on new code |

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Strategic Alignment Score | 100% | Specs linked to VSOM objectives |
| Ontology Compliance | 100% | OAA Registry validation pass rate |
| Rework Rate | < 10% | Issues reopened after completion |
| Concurrent Conflict Rate | < 5% | Merge conflicts requiring resolution |

### Efficiency Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Claude Code Leverage | > 60% of implementation | AI-assisted vs. manual code |
| Context Continuity | > 90% | Sessions resumed without context loss |
| Ready Work Availability | > 95% | Work available when developers query |

---

## Risk Mitigation

### Identified Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Over-specification | Medium | High | Clear bypass criteria, 2-hour threshold |
| Beads noise | Medium | Medium | Label taxonomy enforcement, cleanup sprints |
| Agent context drift | Low | High | Mandatory VSOM context injection |
| Dependency deadlocks | Low | Medium | `beads graph` visualization, manual override |
| Spec approval bottleneck | Medium | High | Async review process, escalation paths |

### Contingency Procedures

**Spec Bottleneck Resolution:**
1. Emergency bypass for P1 issues with 2+ day approval delay
2. Async approval via PR review comments
3. Escalation to Platform Architect for strategic conflicts

**Beads Cleanup Protocol:**
1. Weekly triage of stale issues (> 14 days inactive)
2. Monthly dependency audit
3. Quarterly label taxonomy review

---

## Appendix A: PF-Core Specific Templates

### A.1 VSOM-Aligned Proposal Template

```markdown
# Change Proposal: {CHANGE_ID}

## Document Metadata
- **Version**: 1.0.0
- **Date**: {DATE}
- **Author**: {AUTHOR}
- **Status**: Draft | Review | Approved | Implemented

## Strategic Alignment

### VSOM Mapping
- **Vision Contribution**: {How this supports organizational vision}
- **Strategy Alignment**: {Which strategic objective this enables}
- **Objectives Impact**: {Specific BSC objectives affected}
- **Metrics Influenced**: {KPIs this will move}

### BSC Perspective Analysis
| Perspective | Impact | Justification |
|-------------|--------|---------------|
| Financial | {H/M/L/N} | |
| Customer | {H/M/L/N} | |
| Internal Process | {H/M/L/N} | |
| Learning & Growth | {H/M/L/N} | |
| Stakeholder | {H/M/L/N} | |

### OKR Linkage
- **Objective**: {Linked OKR objective}
- **Key Results**: {Specific KRs this enables}

## Problem Statement

### Current State
{Description of current situation}

### Business Impact
{Quantified impact of not solving}

### Root Cause
{Analysis of why this problem exists}

## Proposed Solution

### Solution Overview
{High-level description}

### Technical Approach
- **Ontology Requirements**: {Schema.org extensions needed}
- **Database Changes**: {Supabase schema modifications}
- **Agent Involvement**: {Claude Agent SDK agents affected}
- **UI/UX Impact**: {Figma Make components}
- **Integration Points**: {External systems affected}

### Architecture Diagram
```mermaid
{Architecture visualization}
```

## Scope Definition

### In Scope
{Explicit inclusions with acceptance criteria}

### Out of Scope
{Explicit exclusions - critical for agent boundaries}

### Assumptions
{Key assumptions being made}

### Dependencies
{External dependencies}

## Implementation Estimate

### Effort Breakdown
| Component | Estimated Hours | Confidence |
|-----------|----------------|------------|
| Ontology Design | | |
| Database Schema | | |
| Agent Implementation | | |
| UI Development | | |
| Testing | | |
| Documentation | | |
| **Total** | | |

### Timeline
{Estimated timeline with milestones}

## Success Criteria

### Acceptance Criteria (TDD-Ready)
{Testable criteria in Given-When-Then format}

### Performance Requirements
{Non-functional requirements}

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| | | | |

## Approval

### Required Approvers
- [ ] Technical Review: {Name} - Date: 
- [ ] Strategic Alignment: {Name} - Date:
- [ ] Resource Commitment: {Name} - Date:

### Sign-off
- [ ] Ready for Implementation
- Implementation Target Date: {DATE}
```

---

## Appendix B: Claude Agent SDK Integration Patterns

### B.1 VSOM Context Injection

```python
# All agents receive VSOM context for strategic alignment
vsom_context = {
    "vision": {
        "statement": "Platform Foundation Core vision...",
        "time_horizon": "2027"
    },
    "current_objectives": [
        {
            "id": "OBJ-001",
            "name": "Achieve PMF for BAIV",
            "bsc_perspective": "customer",
            "health_status": "on_track"
        }
    ],
    "active_strategies": [...],
    "current_okrs": [...]
}

# Inject into agent context
agent.set_context("vsom", vsom_context)
```

### B.2 TDD Enforcement Pattern

```python
# Work Agent TDD enforcement
def execute_task(self, task_id: str):
    task = self.beads.get_issue(task_id)
    
    # Step 1: Write test FIRST (RED)
    test_result = self.write_tests(task.acceptance_criteria)
    assert test_result.status == "failing", "Tests must fail first"
    
    # Step 2: Implement (GREEN)
    impl_result = self.implement(task.spec)
    
    # Step 3: Run tests
    test_result = self.run_tests()
    assert test_result.coverage >= 0.85, "Minimum 85% coverage required"
    
    # Step 4: Refactor if needed
    if test_result.status == "passing":
        self.refactor_if_needed()
    
    # Step 5: Update Beads
    self.beads.complete(task_id, 
        notes=f"Coverage: {test_result.coverage}%")
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | December 2025 | Platform Architecture | Initial release |

---

*© 2025 Platform Foundation Core Holdings. Confidential - Limited Use License.*
