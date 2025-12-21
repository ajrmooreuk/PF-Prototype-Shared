# PF-Core Agentic Development Stack
## Implementation Plan: BMAD + SPARC + Beads Hybrid

**Document:** PFC_IMPLEMENTATION_PLAN_AGENTIC_STACK_v1.md  
**Version:** 1.0.0  
**Date:** December 2025  
**Classification:** Platform Foundation Core - Implementation Guide  
**Status:** Ready for Execution

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Prerequisites & Environment Setup](#3-prerequisites--environment-setup)
4. [Phase 1: Foundation Layer (Week 1-2)](#4-phase-1-foundation-layer-week-1-2)
5. [Phase 2: BMAD Planning Layer (Week 3-4)](#5-phase-2-bmad-planning-layer-week-3-4)
6. [Phase 3: SPARC Execution Layer (Week 5-6)](#6-phase-3-sparc-execution-layer-week-5-6)
7. [Phase 4: Beads Tracking Layer (Week 7-8)](#7-phase-4-beads-tracking-layer-week-7-8)
8. [Phase 5: Integration & Pipeline (Week 9-10)](#8-phase-5-integration--pipeline-week-9-10)
9. [Phase 6: Validation & Pilot (Week 11-12)](#9-phase-6-validation--pilot-week-11-12)
10. [Agent Definitions & Mappings](#10-agent-definitions--mappings)
11. [Configuration Files](#11-configuration-files)
12. [Workflow Patterns](#12-workflow-patterns)
13. [Testing Strategy](#13-testing-strategy)
14. [Team Onboarding](#14-team-onboarding)
15. [Appendices](#15-appendices)

---

## 1. Executive Summary

### 1.1 Objective

Implement a production-ready agentic development stack for PF-Core that combines:
- **BMAD Method** for strategic planning and PRD generation
- **SPARC Framework** for TDD execution and context persistence
- **Beads** for git-native issue tracking and concurrent development

### 1.2 Timeline Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    12-WEEK IMPLEMENTATION TIMELINE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Week 1-2      Week 3-4      Week 5-6      Week 7-8     Week 9-10  Week 11-12│
│  ─────────    ─────────     ─────────     ─────────    ─────────  ─────────│
│                                                                             │
│  ┌────────┐   ┌────────┐    ┌────────┐    ┌────────┐   ┌────────┐ ┌────────┐│
│  │FOUND-  │   │ BMAD   │    │ SPARC  │    │ BEADS  │   │INTEGR- │ │PILOT & ││
│  │ATION   │──▶│ SETUP  │───▶│ SETUP  │───▶│ SETUP  │──▶│ATION   │▶│VALIDATE││
│  │        │   │        │    │        │    │        │   │        │ │        ││
│  │• Repos │   │• Agents│    │• Memory│    │• Issues│   │• Pipe- │ │• VSOM  ││
│  │• Deps  │   │• PRD   │    │• TDD   │    │• Labels│   │  lines │ │  Phase1││
│  │• Config│   │• Gates │    │• Phases│    │• Deps  │   │• Gates │ │• Metrics││
│  └────────┘   └────────┘    └────────┘    └────────┘   └────────┘ └────────┘│
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════  │
│  DELIVERABLE: Production-ready agentic stack for VSOM Module development   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Stack Setup Complete | 100% | All frameworks installed and configured |
| Integration Pipeline | Working | Spec → SPARC → Beads flow automated |
| Pilot Validation | VSOM Phase 1 | Vision & Mission Manager built with stack |
| TDD Coverage | >85% | Automated test coverage reporting |
| Context Persistence | 100% | No context loss across sessions |
| Team Adoption | 3/3 developers | All team members productive |

---

## 2. Architecture Overview

### 2.1 Layered Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PF-CORE AGENTIC STACK ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        USER INTERFACE LAYER                           │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │ Claude Code │  │   VS Code   │  │  Terminal   │  │  Web UI     │  │ │
│  │  │   (Primary) │  │  (Optional) │  │   (CLI)     │  │ (BMAD Web)  │  │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      PLANNING LAYER (BMAD)                            │ │
│  │                                                                       │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ │
│  │  │ Analyst │─▶│   PM    │─▶│Architect│─▶│ [GATE]  │─▶│ Scrum   │    │ │
│  │  │  Agent  │  │  Agent  │  │  Agent  │  │ HUMAN   │  │ Master  │    │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │ │
│  │       │            │            │                          │         │ │
│  │       ▼            ▼            ▼                          ▼         │ │
│  │   Brief.md     PRD.md      Arch.md                   Stories.md     │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      EXECUTION LAYER (SPARC)                          │ │
│  │                                                                       │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐         │ │
│  │  │   SPEC    │─▶│  PSEUDO   │─▶│   ARCH    │─▶│  REFINE   │─▶ DONE  │ │
│  │  │           │  │   CODE    │  │           │  │   (TDD)   │         │ │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘         │ │
│  │                         │                                            │ │
│  │                         ▼                                            │ │
│  │              ┌─────────────────────┐                                 │ │
│  │              │    MEMORY BANK      │                                 │ │
│  │              │  (Context Persist)  │                                 │ │
│  │              └─────────────────────┘                                 │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      TRACKING LAYER (BEADS)                           │ │
│  │                                                                       │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ │
│  │  │  Epic   │─▶│ Feature │─▶│  Task   │─▶│  Ready  │─▶│Complete │    │ │
│  │  │         │  │         │  │         │  │  Query  │  │         │    │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │ │
│  │                    │                          │                      │ │
│  │                    ▼                          ▼                      │ │
│  │            Dependencies              Branch Isolation                │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      │                                      │
│                                      ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      FOUNDATION LAYER                                 │ │
│  │                                                                       │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │ │
│  │  │ Claude Sub-     │  │    Supabase     │  │   Figma Make    │       │ │
│  │  │ Agents (Native) │  │   PostgreSQL    │  │   → Next.js     │       │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW DIAGRAM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  VSOM Context ─────────────────────────────────────────────────────────▶   │
│       │                                                                     │
│       ▼                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│  │   BRIEF     │───▶│    PRD      │───▶│ ARCHITECTURE│                     │
│  │  (Analyst)  │    │    (PM)     │    │ (Architect) │                     │
│  └─────────────┘    └─────────────┘    └─────────────┘                     │
│                                              │                              │
│                     ┌────────────────────────┘                              │
│                     ▼                                                       │
│              [HUMAN APPROVAL GATE]                                          │
│                     │                                                       │
│                     ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    DOCUMENT SHARDING                                 │   │
│  │  PRD + Arch ──▶ Shard 1 │ Shard 2 │ Shard 3 │ ... │ Shard N        │   │
│  │                 (Story)   (Story)   (Story)         (Story)         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                     │                                                       │
│                     ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    BEADS CONVERSION                                  │   │
│  │  Story 1 ──▶ Epic + Tasks + Dependencies + Labels                   │   │
│  │  Story 2 ──▶ Epic + Tasks + Dependencies + Labels                   │   │
│  │  ...                                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                     │                                                       │
│                     ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SPARC EXECUTION                                   │   │
│  │  Task (from Beads ready) ──▶ SPARC Pipeline ──▶ Code + Tests        │   │
│  │                                    │                                 │   │
│  │                                    ▼                                 │   │
│  │                            Memory Bank Update                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                     │                                                       │
│                     ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    COMPLETION                                        │   │
│  │  Beads Update ──▶ Branch Merge ──▶ Dependency Unlock                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Prerequisites & Environment Setup

### 3.1 System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 20.x LTS | 22.x LTS |
| Python | 3.10+ | 3.12+ |
| Git | 2.40+ | Latest |
| Claude Code | Latest | Latest |
| RAM | 16 GB | 32 GB |
| Storage | 50 GB SSD | 100 GB NVMe |

### 3.2 Account Requirements

- [ ] Anthropic API key (Claude Pro or Team)
- [ ] GitHub account with repo access
- [ ] Supabase project created
- [ ] Figma account (for Make integration)

### 3.3 Repository Structure

```bash
pf-core/
├── .bmad/                      # BMAD configuration
│   ├── agents/                 # Agent definitions
│   ├── templates/              # Document templates
│   ├── workflows/              # Workflow definitions
│   └── config.yaml             # Main config
│
├── .sparc/                     # SPARC configuration
│   ├── memory-bank/            # Persistent memory
│   ├── phases/                 # Phase configurations
│   └── config.yaml             # Main config
│
├── .beads/                     # Beads configuration
│   ├── issues.jsonl            # Issue database
│   ├── config.jsonl            # Settings
│   └── db.sqlite               # Query optimization
│
├── .claude/                    # Claude Code settings
│   ├── commands/               # Custom slash commands
│   ├── settings.json           # Claude settings
│   └── CLAUDE.md               # Project context
│
├── docs/                       # Documentation
│   ├── specs/                  # Approved specifications
│   ├── architecture/           # Architecture docs
│   ├── briefs/                 # BMAD briefs
│   └── stories/                # Sharded stories
│
├── ontologies/                 # Schema.org grounded
│   ├── vsom-ontology.json
│   ├── cmo-okr-ontology.json
│   └── oaa-registry.json
│
├── supabase/                   # Database
│   ├── migrations/
│   └── schemas/
│
├── src/                        # Application code
│   ├── components/             # Figma Make output
│   ├── agents/                 # Agent implementations
│   ├── lib/
│   └── app/
│
├── tests/                      # TDD test suites
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/                    # Automation scripts
│   ├── bmad-to-beads.sh        # Conversion script
│   ├── sparc-runner.sh         # SPARC automation
│   └── validate-stack.sh       # Stack validation
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. Phase 1: Foundation Layer (Week 1-2)

### 4.1 Objectives

- Initialize repository structure
- Install all framework dependencies
- Configure Claude Code environment
- Establish baseline configurations

### 4.2 Day-by-Day Tasks

#### Week 1, Day 1-2: Repository Setup

```bash
# Create project directory
mkdir pf-core && cd pf-core

# Initialize git
git init
git branch -M main

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install -D typescript @types/node tsx vitest
npm install zod uuid date-fns

# Create TypeScript config
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF

# Create directory structure
mkdir -p .bmad/{agents,templates,workflows}
mkdir -p .sparc/{memory-bank,phases}
mkdir -p .beads
mkdir -p .claude/commands
mkdir -p docs/{specs,architecture,briefs,stories}
mkdir -p ontologies
mkdir -p supabase/{migrations,schemas}
mkdir -p src/{components,agents,lib,app}
mkdir -p tests/{unit,integration,e2e}
mkdir -p scripts
```

#### Week 1, Day 3-4: BMAD Installation

```bash
# Install BMAD Method
npx bmad-method install

# Verify installation
npx bmad-method --version

# Configure for PF-Core (interactive)
npx bmad-method configure --project pf-core

# Expected prompts:
# ? Project type: platform
# ? Primary methodology: agile
# ? Enable expansion packs: yes
# ? IDE integration: claude-code
```

**Post-Installation Verification:**

```bash
# Verify BMAD files created
ls -la .bmad/

# Expected output:
# agents/
# templates/
# workflows/
# config.yaml
# web-bundle.md
```

#### Week 1, Day 5: SPARC Installation

```bash
# Option A: Standalone SPARC
pip install sparc-framework --break-system-packages

# Option B: SPARC via Claude-Flow (recommended for full features)
npm install -g claude-flow
npx claude-flow@alpha init --sparc

# Initialize SPARC Memory Bank
npx claude-flow@alpha memory init --reasoningbank

# Verify installation
sparc --version  # or claude-flow sparc --version
```

**Memory Bank Configuration:**

```bash
# Create memory bank directory
mkdir -p .sparc/memory-bank/{spec,pseudo,arch,refine,complete}

# Initialize memory bank config
cat > .sparc/memory-bank/config.yaml << 'EOF'
memory_bank:
  enabled: true
  namespace: "pf-core"
  persistence: "file"
  
  namespaces:
    spec:
      description: "Specification phase artifacts"
      retention: "permanent"
    pseudo:
      description: "Pseudocode and algorithm designs"
      retention: "permanent"
    arch:
      description: "Architecture decisions"
      retention: "permanent"
    refine:
      description: "TDD cycle artifacts"
      retention: "90d"
    complete:
      description: "Completion artifacts"
      retention: "permanent"
      
  checkpoint:
    frequency: "on_phase_complete"
    max_checkpoints: 10
EOF
```

#### Week 2, Day 1-2: Beads Installation

```bash
# Install Beads
npm install -g beads-cli

# Initialize Beads in project
cd pf-core
bd init --prefix pfc

# Verify installation
bd --version
bd status
```

**Beads Configuration:**

```bash
# Configure Beads for PF-Core
cat > .beads/config.jsonl << 'EOF'
{"setting": "prefix", "value": "pfc"}
{"setting": "default_type", "value": "task"}
{"setting": "auto_branch", "value": true}
{"setting": "branch_pattern", "value": "feat/{id}-{slug}"}
{"setting": "require_labels", "value": true}
{"setting": "require_dependencies", "value": false}
EOF
```

#### Week 2, Day 3-4: Claude Code Configuration

```bash
# Create CLAUDE.md project context
cat > CLAUDE.md << 'EOF'
# PF-Core Project Context

## Project Overview
Platform Foundation Core (PF-Core) is a multi-tenant platform providing 
Value Engineering capabilities across BAIV, W4M, and AIR ventures.

## Development Stack
- **Planning**: BMAD Method (Analyst → PM → Architect → Scrum Master)
- **Execution**: SPARC Framework (Spec → Pseudocode → Architecture → Refinement → Complete)
- **Tracking**: Beads (Git-native issue tracking)

## Critical Rules
1. ALL specs require human approval before implementation
2. TDD is MANDATORY - write tests FIRST (85%+ coverage required)
3. ALL code must pass ontology validation (OAA Registry v3.0)
4. Use schema.org as baseline for all JSON schemas
5. Multi-tenant isolation via RLS on ALL tables

## VSOM Context
This platform implements a four-layer strategic framework:
- Layer 1: Vision & Mission
- Layer 2: Strategic Objectives (BSC perspectives)
- Layer 3: Operational Strategies & OKRs
- Layer 4: Metrics & KPIs

## Agent Taxonomy
See .bmad/agents/ for full definitions:
- Analyst Agent: Market research, competitive analysis
- PM Agent: PRD generation, acceptance criteria
- Architect Agent: Ontology design, database schema
- Scrum Master Agent: Story sharding, sprint planning
- Developer Agent: TDD implementation
- QA Agent: Test validation, coverage

## Commands
- `/pfc:plan <feature>` - Start BMAD planning workflow
- `/pfc:sparc <task>` - Execute SPARC development cycle
- `/pfc:ready` - Query Beads for ready work
- `/pfc:status` - Show current work status
EOF

# Create custom slash commands
mkdir -p .claude/commands

# Plan command
cat > .claude/commands/pfc-plan.md << 'EOF'
# PFC Plan Command

Start the BMAD planning workflow for a new feature or module.

## Usage
/pfc:plan <feature_description>

## Process
1. Activate Analyst Agent for initial brief
2. Activate PM Agent for PRD generation
3. Activate Architect Agent for technical design
4. Present for human approval
5. On approval, activate Scrum Master for story sharding

## Arguments
$ARGUMENTS - The feature description to plan
EOF

# Ready command
cat > .claude/commands/pfc-ready.md << 'EOF'
# PFC Ready Command

Query Beads for tasks ready to work on.

## Usage
/pfc:ready [--label <label>] [--priority <P1|P2|P3>]

## Process
1. Run `bd ready` with optional filters
2. Display available tasks with dependencies resolved
3. Offer to start SPARC execution on selected task

## Arguments
$ARGUMENTS - Optional filters for the ready query
EOF
```

#### Week 2, Day 5: Integration Verification

```bash
# Create validation script
cat > scripts/validate-stack.sh << 'EOF'
#!/bin/bash
set -e

echo "🔍 Validating PF-Core Agentic Stack..."
echo ""

# Check BMAD
echo "1. Checking BMAD Method..."
if npx bmad-method --version > /dev/null 2>&1; then
    echo "   ✅ BMAD Method installed"
    ls .bmad/agents/*.md 2>/dev/null | wc -l | xargs -I {} echo "   📁 {} agent definitions found"
else
    echo "   ❌ BMAD Method not found"
    exit 1
fi

# Check SPARC
echo ""
echo "2. Checking SPARC Framework..."
if [ -d ".sparc/memory-bank" ]; then
    echo "   ✅ SPARC Memory Bank initialized"
else
    echo "   ❌ SPARC Memory Bank not found"
    exit 1
fi

# Check Beads
echo ""
echo "3. Checking Beads..."
if bd --version > /dev/null 2>&1; then
    echo "   ✅ Beads installed"
    bd status 2>/dev/null || echo "   📋 No issues yet"
else
    echo "   ❌ Beads not found"
    exit 1
fi

# Check Claude Code config
echo ""
echo "4. Checking Claude Code configuration..."
if [ -f "CLAUDE.md" ]; then
    echo "   ✅ CLAUDE.md present"
else
    echo "   ❌ CLAUDE.md not found"
    exit 1
fi

if [ -d ".claude/commands" ]; then
    ls .claude/commands/*.md 2>/dev/null | wc -l | xargs -I {} echo "   📁 {} custom commands found"
fi

echo ""
echo "✅ Stack validation complete!"
EOF

chmod +x scripts/validate-stack.sh

# Run validation
./scripts/validate-stack.sh
```

### 4.3 Deliverables Checklist

- [ ] Repository initialized with full directory structure
- [ ] BMAD Method installed and configured
- [ ] SPARC Framework installed with Memory Bank
- [ ] Beads initialized with PFC prefix
- [ ] Claude Code configured with CLAUDE.md and custom commands
- [ ] Validation script passing
- [ ] Initial commit pushed to remote

---

## 5. Phase 2: BMAD Planning Layer (Week 3-4)

### 5.1 Objectives

- Configure BMAD agents for PF-Core context
- Create custom templates aligned with VSOM
- Set up approval gates
- Create PF-Core expansion pack

### 5.2 Agent Configuration

#### 5.2.1 Analyst Agent

```yaml
# .bmad/agents/analyst.yaml
agent:
  name: "PFC Analyst"
  role: "Business Analyst"
  description: "Analyzes requirements and creates project briefs with VSOM alignment"
  
  context:
    vsom_aware: true
    bsc_perspectives:
      - financial
      - customer
      - internal_process
      - learning_growth
      - stakeholder
    
  capabilities:
    - market_research
    - competitive_analysis
    - requirement_gathering
    - stakeholder_interviews
    - vsom_alignment_analysis
    
  outputs:
    - type: brief
      template: ".bmad/templates/pfc-brief.md"
      
  prompts:
    system: |
      You are the PFC Analyst Agent, specialized in analyzing requirements 
      for the Platform Foundation Core. Your briefs must always include:
      
      1. VSOM Alignment - Which layer(s) does this feature support?
      2. BSC Perspective - Which perspective(s) does this impact?
      3. Strategic Fit - How does this advance platform objectives?
      4. Competitive Context - How does this compare to alternatives?
      5. Risk Assessment - What are the key risks?
      
      Always ground your analysis in the platform's strategic context.
      
  validation:
    required_sections:
      - executive_summary
      - vsom_alignment
      - bsc_impact
      - problem_statement
      - proposed_approach
      - risk_assessment
```

#### 5.2.2 PM Agent

```yaml
# .bmad/agents/pm.yaml
agent:
  name: "PFC Product Manager"
  role: "Product Manager"
  description: "Creates detailed PRDs with OAA Registry compliance"
  
  context:
    ontology_aware: true
    schema_registry: "ontologies/oaa-registry.json"
    acceptance_criteria_format: "gherkin"
    
  capabilities:
    - prd_generation
    - user_story_creation
    - acceptance_criteria_definition
    - okr_cascade_planning
    - roadmap_alignment
    
  outputs:
    - type: prd
      template: ".bmad/templates/pfc-prd.md"
      
  prompts:
    system: |
      You are the PFC Product Manager Agent. Your PRDs must include:
      
      1. Problem Statement with quantified business impact
      2. User Stories in standard format (As a... I want... So that...)
      3. Acceptance Criteria in Gherkin format (Given/When/Then)
      4. Ontology Requirements referencing schema.org
      5. OKR Linkage showing cascade from VSOM
      6. Success Metrics that are measurable and time-bound
      
      All schemas must comply with OAA Registry v3.0 standards.
      
  validation:
    required_sections:
      - problem_statement
      - user_stories
      - acceptance_criteria
      - functional_requirements
      - non_functional_requirements
      - ontology_requirements
      - okr_linkage
      - success_metrics
    
    ontology_compliance:
      enabled: true
      registry: "ontologies/oaa-registry.json"
```

#### 5.2.3 Architect Agent

```yaml
# .bmad/agents/architect.yaml
agent:
  name: "PFC Architect"
  role: "Solution Architect"
  description: "Designs system architecture with ontology-first approach"
  
  context:
    schema_org_grounded: true
    database: "supabase_postgresql"
    ui_framework: "nextjs_shadcn"
    agent_sdk: "claude_agent_sdk"
    
  capabilities:
    - ontology_design
    - database_schema_design
    - api_contract_design
    - agent_architecture
    - integration_planning
    
  outputs:
    - type: architecture
      template: ".bmad/templates/pfc-architecture.md"
    - type: ontology
      template: ".bmad/templates/pfc-ontology.json"
    - type: database_schema
      template: ".bmad/templates/pfc-schema.sql"
      
  prompts:
    system: |
      You are the PFC Architect Agent. Your designs must include:
      
      1. Ontology Design
         - Schema.org base vocabulary
         - Custom extensions with baiv: namespace
         - JSON-LD structure with @context, @type, @id
         - Semantic relationships explicitly defined
         
      2. Database Design
         - Supabase PostgreSQL with JSONB storage
         - Multi-tenant isolation (tenant_id + RLS)
         - Migration scripts
         
      3. API Design
         - RESTful endpoints
         - Request/Response schemas
         - Error handling patterns
         
      4. Agent Architecture
         - Claude Agent SDK integration points
         - Context requirements
         - Tool definitions
         
      5. UI/UX Architecture
         - Figma Make → Next.js pipeline
         - shadcn/ui component mapping
         - Accessibility requirements (WCAG 2.1 AA)
         
  validation:
    ontology_compliance:
      enabled: true
      schema_org_required: true
    database_compliance:
      rls_required: true
      tenant_isolation: true
```

#### 5.2.4 Scrum Master Agent

```yaml
# .bmad/agents/scrum-master.yaml
agent:
  name: "PFC Scrum Master"
  role: "Scrum Master"
  description: "Shards documents into implementable stories and creates Beads issues"
  
  context:
    sharding_enabled: true
    max_story_size: "8_hours"
    beads_integration: true
    
  capabilities:
    - document_sharding
    - story_creation
    - dependency_mapping
    - sprint_planning
    - beads_conversion
    
  outputs:
    - type: stories
      location: "docs/stories/"
    - type: beads_issues
      auto_create: true
      
  prompts:
    system: |
      You are the PFC Scrum Master Agent. Your responsibilities:
      
      1. Document Sharding
         - Break PRD + Architecture into implementable stories
         - Each story should be completable in ≤8 hours
         - Preserve full context in each shard
         - Include all relevant acceptance criteria
         
      2. Story Structure
         - Clear title and description
         - Complete context from parent documents
         - Specific acceptance criteria
         - Test requirements (TDD-ready)
         - Dependencies on other stories
         
      3. Beads Conversion
         - Create Epic for each major feature
         - Create Task for each story
         - Set dependencies correctly
         - Apply appropriate labels:
           - layer:{vision|strategy|objectives|metrics}
           - bsc:{financial|customer|internal|learning|stakeholder}
           - domain:{ontology|database|agent|ui|api}
           - priority:{P1|P2|P3|P4}
           
      4. Sprint Planning
         - Group related stories
         - Balance workload across team
         - Identify parallel work opportunities
         
  sharding_rules:
    max_lines_per_story: 500
    context_preservation: true
    include_parent_reference: true
    
  beads_mapping:
    epic_from: "feature"
    task_from: "story"
    label_taxonomy:
      vsom_layer: "layer"
      bsc_perspective: "bsc"
      technical_domain: "domain"
```

### 5.3 Custom Templates

#### 5.3.1 PFC Brief Template

```markdown
<!-- .bmad/templates/pfc-brief.md -->
# Project Brief: {{FEATURE_NAME}}

## Document Metadata
- **Version**: {{VERSION}}
- **Date**: {{DATE}}
- **Author**: PFC Analyst Agent
- **Status**: Draft

---

## Executive Summary

{{EXECUTIVE_SUMMARY}}

---

## VSOM Alignment

### Primary Layer
- [ ] Layer 1: Vision & Mission
- [ ] Layer 2: Strategic Objectives
- [ ] Layer 3: Operational Strategies & OKRs
- [ ] Layer 4: Metrics & KPIs

### Alignment Justification
{{VSOM_JUSTIFICATION}}

---

## BSC Impact Analysis

| Perspective | Impact Level | Justification |
|-------------|--------------|---------------|
| Financial | {{FIN_IMPACT}} | {{FIN_JUST}} |
| Customer | {{CUST_IMPACT}} | {{CUST_JUST}} |
| Internal Process | {{INT_IMPACT}} | {{INT_JUST}} |
| Learning & Growth | {{LEARN_IMPACT}} | {{LEARN_JUST}} |
| Stakeholder | {{STAKE_IMPACT}} | {{STAKE_JUST}} |

---

## Problem Statement

### Current State
{{CURRENT_STATE}}

### Desired State
{{DESIRED_STATE}}

### Business Impact
{{BUSINESS_IMPACT}}

### Root Cause Analysis
{{ROOT_CAUSE}}

---

## Competitive Context

### Market Landscape
{{MARKET_LANDSCAPE}}

### Competitive Alternatives
{{COMPETITIVE_ALTERNATIVES}}

### Differentiation Opportunity
{{DIFFERENTIATION}}

---

## Proposed Approach

### High-Level Solution
{{SOLUTION_OVERVIEW}}

### Key Components
{{KEY_COMPONENTS}}

### Success Criteria
{{SUCCESS_CRITERIA}}

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {{RISK_1}} | {{LIKE_1}} | {{IMP_1}} | {{MIT_1}} |
| {{RISK_2}} | {{LIKE_2}} | {{IMP_2}} | {{MIT_2}} |
| {{RISK_3}} | {{LIKE_3}} | {{IMP_3}} | {{MIT_3}} |

---

## Stakeholder Input Required

- [ ] Technical Review: {{TECH_REVIEWER}}
- [ ] Business Review: {{BIZ_REVIEWER}}
- [ ] Strategic Alignment: {{STRAT_REVIEWER}}

---

## Next Steps

1. {{NEXT_STEP_1}}
2. {{NEXT_STEP_2}}
3. {{NEXT_STEP_3}}

---

*Generated by PFC Analyst Agent | BMAD Method*
```

### 5.4 Approval Gate Configuration

```yaml
# .bmad/workflows/approval-gates.yaml
approval_gates:
  
  brief_review:
    name: "Brief Review Gate"
    stage: "post_analyst"
    required_approvers: 1
    approver_roles:
      - product_owner
      - tech_lead
    timeout_hours: 48
    escalation:
      enabled: true
      escalate_to: "platform_architect"
      after_hours: 72
    checklist:
      - "VSOM alignment documented"
      - "BSC perspectives analyzed"
      - "Problem statement quantified"
      - "Risk assessment complete"
      
  prd_review:
    name: "PRD Review Gate"
    stage: "post_pm"
    required_approvers: 2
    approver_roles:
      - product_owner
      - tech_lead
      - architect
    timeout_hours: 72
    checklist:
      - "User stories complete"
      - "Acceptance criteria in Gherkin"
      - "Ontology requirements specified"
      - "OKR linkage documented"
      - "Success metrics measurable"
      
  architecture_review:
    name: "Architecture Review Gate"
    stage: "post_architect"
    required_approvers: 2
    approver_roles:
      - platform_architect
      - tech_lead
    timeout_hours: 72
    checklist:
      - "Ontology schema.org compliant"
      - "Database schema includes RLS"
      - "API contracts defined"
      - "Agent integration specified"
      - "Security considerations documented"
      
  implementation_gate:
    name: "Ready for Implementation"
    stage: "post_all_reviews"
    required_approvers: 1
    approver_roles:
      - product_owner
    auto_convert_to_beads: true
    notify_team: true
```

### 5.5 Deliverables Checklist

- [ ] All 4 core agents configured (Analyst, PM, Architect, Scrum Master)
- [ ] Custom templates created and validated
- [ ] Approval gates configured
- [ ] VSOM context integrated into all agents
- [ ] Test run of full planning workflow
- [ ] Documentation complete

---

## 6. Phase 3: SPARC Execution Layer (Week 5-6)

### 6.1 Objectives

- Configure SPARC phases for PF-Core
- Set up Memory Bank with proper namespaces
- Integrate TDD workflow
- Create phase transition automation

### 6.2 SPARC Configuration

```yaml
# .sparc/config.yaml
sparc:
  version: "2.0"
  project: "pf-core"
  methodology: "london_tdd"
  
  memory_bank:
    enabled: true
    path: ".sparc/memory-bank"
    persistence: "file"
    checkpoint_frequency: "on_phase_complete"
    
  phases:
    specification:
      enabled: true
      inputs:
        - "docs/stories/*.md"
        - "ontologies/*.json"
      outputs:
        - "spec.md"
        - "requirements.json"
      context_injection:
        vsom: true
        ontology_registry: true
      validation:
        - "requirements_complete"
        - "acceptance_criteria_present"
        
    pseudocode:
      enabled: true
      inputs:
        - "${specification.outputs}"
      outputs:
        - "pseudocode.md"
        - "algorithms.md"
      validation:
        - "logic_complete"
        - "edge_cases_documented"
        
    architecture:
      enabled: true
      inputs:
        - "${pseudocode.outputs}"
        - "docs/architecture/*.md"
      outputs:
        - "component_design.md"
        - "api_contracts.yaml"
        - "database_changes.sql"
      validation:
        - "schema_org_compliant"
        - "rls_policies_defined"
        
    refinement:
      enabled: true
      tdd:
        enabled: true
        methodology: "london_school"
        coverage_target: 85
        cycle: "red_green_refactor"
      inputs:
        - "${architecture.outputs}"
      outputs:
        - "src/**/*.ts"
        - "tests/**/*.test.ts"
      validation:
        - "tests_passing"
        - "coverage_met"
        - "lint_clean"
        
    completion:
      enabled: true
      inputs:
        - "${refinement.outputs}"
      outputs:
        - "deployment_ready"
      validation:
        - "all_tests_pass"
        - "documentation_complete"
        - "pr_ready"
        
  tdd:
    framework: "vitest"
    coverage_tool: "c8"
    minimum_coverage: 85
    required_test_types:
      - unit
      - integration
    patterns:
      unit: "tests/unit/**/*.test.ts"
      integration: "tests/integration/**/*.test.ts"
      e2e: "tests/e2e/**/*.test.ts"
      
  integration:
    beads:
      enabled: true
      update_on_phase_complete: true
      status_mapping:
        specification: "in_progress"
        pseudocode: "in_progress"
        architecture: "in_progress"
        refinement: "in_progress"
        completion: "done"
```

### 6.3 Memory Bank Structure

```bash
# Create Memory Bank directory structure
mkdir -p .sparc/memory-bank/{spec,pseudo,arch,refine,complete,shared}

# Create namespace configs
cat > .sparc/memory-bank/spec/namespace.yaml << 'EOF'
namespace: spec
description: "Specification phase artifacts and decisions"
retention: permanent
artifacts:
  - requirements
  - acceptance_criteria
  - context_decisions
EOF

cat > .sparc/memory-bank/pseudo/namespace.yaml << 'EOF'
namespace: pseudo
description: "Pseudocode and algorithm designs"
retention: permanent
artifacts:
  - algorithms
  - logic_flows
  - edge_cases
EOF

cat > .sparc/memory-bank/arch/namespace.yaml << 'EOF'
namespace: arch
description: "Architecture decisions and designs"
retention: permanent
artifacts:
  - component_designs
  - api_contracts
  - database_schemas
  - ontology_extensions
EOF

cat > .sparc/memory-bank/refine/namespace.yaml << 'EOF'
namespace: refine
description: "TDD cycle artifacts"
retention: 90d
artifacts:
  - test_cases
  - implementation_notes
  - refactor_decisions
EOF

cat > .sparc/memory-bank/shared/namespace.yaml << 'EOF'
namespace: shared
description: "Cross-phase shared context"
retention: permanent
artifacts:
  - vsom_context
  - ontology_registry
  - team_decisions
EOF
```

### 6.4 TDD Integration

```typescript
// scripts/sparc-tdd-runner.ts
import { spawn } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

interface TDDCycle {
  phase: 'red' | 'green' | 'refactor';
  testFile: string;
  implFile: string;
  coverage: number;
}

async function runTDDCycle(task: string): Promise<TDDCycle[]> {
  const cycles: TDDCycle[] = [];
  
  // RED Phase: Write failing tests
  console.log('🔴 RED Phase: Writing failing tests...');
  // Claude writes tests based on acceptance criteria
  
  // Verify tests fail
  const redResult = await runTests();
  if (redResult.passing) {
    throw new Error('Tests should fail in RED phase');
  }
  cycles.push({
    phase: 'red',
    testFile: redResult.testFile,
    implFile: '',
    coverage: 0
  });
  
  // GREEN Phase: Minimal implementation
  console.log('🟢 GREEN Phase: Implementing minimal code...');
  // Claude writes minimal code to pass tests
  
  const greenResult = await runTests();
  if (!greenResult.passing) {
    throw new Error('Tests should pass in GREEN phase');
  }
  cycles.push({
    phase: 'green',
    testFile: greenResult.testFile,
    implFile: greenResult.implFile,
    coverage: greenResult.coverage
  });
  
  // REFACTOR Phase: Optimize
  console.log('🔵 REFACTOR Phase: Optimizing code...');
  // Claude refactors while keeping tests green
  
  const refactorResult = await runTests();
  if (!refactorResult.passing) {
    throw new Error('Tests should still pass after refactor');
  }
  
  // Verify coverage
  if (refactorResult.coverage < 85) {
    console.warn(`⚠️ Coverage ${refactorResult.coverage}% below 85% target`);
  }
  
  cycles.push({
    phase: 'refactor',
    testFile: refactorResult.testFile,
    implFile: refactorResult.implFile,
    coverage: refactorResult.coverage
  });
  
  return cycles;
}

async function runTests(): Promise<{
  passing: boolean;
  testFile: string;
  implFile: string;
  coverage: number;
}> {
  return new Promise((resolve, reject) => {
    const vitest = spawn('npx', ['vitest', 'run', '--coverage'], {
      stdio: 'pipe'
    });
    
    let output = '';
    vitest.stdout.on('data', (data) => output += data);
    vitest.stderr.on('data', (data) => output += data);
    
    vitest.on('close', (code) => {
      const coverageMatch = output.match(/All files\s+\|\s+([\d.]+)/);
      const coverage = coverageMatch ? parseFloat(coverageMatch[1]) : 0;
      
      resolve({
        passing: code === 0,
        testFile: '', // Parse from output
        implFile: '', // Parse from output
        coverage
      });
    });
  });
}

export { runTDDCycle };
```

### 6.5 Phase Transition Automation

```bash
#!/bin/bash
# scripts/sparc-runner.sh

set -e

TASK_ID=$1
PHASE=${2:-"all"}

if [ -z "$TASK_ID" ]; then
    echo "Usage: ./sparc-runner.sh <task_id> [phase]"
    echo "Phases: spec, pseudo, arch, refine, complete, all"
    exit 1
fi

echo "🚀 Starting SPARC execution for task: $TASK_ID"
echo ""

# Load task context from Beads
TASK_INFO=$(bd show $TASK_ID --json)
TASK_TITLE=$(echo $TASK_INFO | jq -r '.title')
TASK_STORY=$(echo $TASK_INFO | jq -r '.metadata.story_path')

echo "📋 Task: $TASK_TITLE"
echo "📄 Story: $TASK_STORY"
echo ""

# Create working directory
WORK_DIR=".sparc/work/$TASK_ID"
mkdir -p $WORK_DIR

run_phase() {
    local phase=$1
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 Phase: $phase"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    case $phase in
        spec)
            echo "📝 Specification Phase"
            # Extract requirements from story
            # Inject VSOM context
            # Generate spec.md
            ;;
        pseudo)
            echo "🧮 Pseudocode Phase"
            # Design algorithms
            # Document logic flow
            # Identify edge cases
            ;;
        arch)
            echo "🏗️ Architecture Phase"
            # Design components
            # Define API contracts
            # Create database changes
            ;;
        refine)
            echo "🔄 Refinement Phase (TDD)"
            # Run TDD cycle
            npx tsx scripts/sparc-tdd-runner.ts $TASK_ID
            ;;
        complete)
            echo "✅ Completion Phase"
            # Final validation
            # Update Beads
            # Prepare PR
            bd update $TASK_ID --status done
            ;;
    esac
    
    # Store in Memory Bank
    echo "💾 Storing artifacts in Memory Bank..."
    cp -r $WORK_DIR/* .sparc/memory-bank/$phase/
    
    echo "✓ Phase $phase complete"
    echo ""
}

if [ "$PHASE" == "all" ]; then
    for p in spec pseudo arch refine complete; do
        run_phase $p
    done
else
    run_phase $PHASE
fi

echo "🎉 SPARC execution complete for $TASK_ID"
```

### 6.6 Deliverables Checklist

- [ ] SPARC config.yaml complete
- [ ] Memory Bank directories and namespaces created
- [ ] TDD runner script functional
- [ ] Phase transition automation working
- [ ] Integration with Beads status updates
- [ ] Test run of full SPARC cycle

---

## 7. Phase 4: Beads Tracking Layer (Week 7-8)

### 7.1 Objectives

- Configure Beads label taxonomy for PF-Core
- Set up dependency management
- Create conversion scripts from BMAD
- Integrate with SPARC workflow

### 7.2 Label Taxonomy

```yaml
# .beads/taxonomy.yaml
taxonomy:
  # VSOM Layer Labels
  layer:
    description: "VSOM strategic layer"
    values:
      - name: "vision"
        color: "#6B46C1"
        description: "Vision & Mission (Layer 1)"
      - name: "strategy"
        color: "#2563EB"
        description: "Strategic Objectives (Layer 2)"
      - name: "objectives"
        color: "#059669"
        description: "Operational Strategies & OKRs (Layer 3)"
      - name: "metrics"
        color: "#D97706"
        description: "Metrics & KPIs (Layer 4)"
        
  # BSC Perspective Labels
  bsc:
    description: "Balanced Scorecard perspective"
    values:
      - name: "financial"
        color: "#DC2626"
        description: "Financial perspective"
      - name: "customer"
        color: "#2563EB"
        description: "Customer perspective"
      - name: "internal"
        color: "#059669"
        description: "Internal Process perspective"
      - name: "learning"
        color: "#7C3AED"
        description: "Learning & Growth perspective"
      - name: "stakeholder"
        color: "#DB2777"
        description: "Stakeholder perspective"
        
  # Technical Domain Labels
  domain:
    description: "Technical domain"
    values:
      - name: "ontology"
        color: "#6366F1"
        description: "Ontology/schema changes"
      - name: "database"
        color: "#0891B2"
        description: "Database/Supabase changes"
      - name: "agent"
        color: "#7C3AED"
        description: "Claude Agent SDK"
      - name: "ui"
        color: "#EC4899"
        description: "UI/UX (Figma Make)"
      - name: "api"
        color: "#F59E0B"
        description: "API endpoints"
      - name: "integration"
        color: "#10B981"
        description: "External integrations"
        
  # Platform Instance Labels
  instance:
    description: "Platform instance"
    values:
      - name: "pf-core"
        color: "#1F2937"
        description: "Platform Foundation Core"
      - name: "baiv"
        color: "#3B82F6"
        description: "Be AI Visible"
      - name: "w4m"
        color: "#8B5CF6"
        description: "Wings4Mind"
      - name: "air"
        color: "#06B6D4"
        description: "AI Readiness Labs"
        
  # Priority Labels
  priority:
    description: "Priority level"
    values:
      - name: "P1-critical"
        color: "#DC2626"
        description: "Critical - blocks release"
      - name: "P2-high"
        color: "#F59E0B"
        description: "High - important feature"
      - name: "P3-medium"
        color: "#3B82F6"
        description: "Medium - normal priority"
      - name: "P4-low"
        color: "#6B7280"
        description: "Low - nice to have"
        
  # Type Labels
  type:
    description: "Issue type"
    values:
      - name: "epic"
        color: "#7C3AED"
        description: "Epic (large feature)"
      - name: "feature"
        color: "#2563EB"
        description: "Feature"
      - name: "task"
        color: "#059669"
        description: "Task"
      - name: "bug"
        color: "#DC2626"
        description: "Bug fix"
      - name: "tech-debt"
        color: "#F59E0B"
        description: "Technical debt"
      - name: "spike"
        color: "#8B5CF6"
        description: "Research/investigation"
```

### 7.3 BMAD to Beads Conversion Script

```bash
#!/bin/bash
# scripts/bmad-to-beads.sh

set -e

STORY_DIR="docs/stories"
OUTPUT_LOG=".beads/conversion.log"

echo "🔄 Converting BMAD stories to Beads issues..."
echo ""

# Find all story files
STORIES=$(find $STORY_DIR -name "*.md" -type f)

for story in $STORIES; do
    echo "Processing: $story"
    
    # Extract metadata from story frontmatter
    TITLE=$(grep -m1 "^# " $story | sed 's/^# //')
    EPIC=$(grep -m1 "epic:" $story | sed 's/epic: //' || echo "")
    LAYER=$(grep -m1 "layer:" $story | sed 's/layer: //' || echo "")
    BSC=$(grep -m1 "bsc:" $story | sed 's/bsc: //' || echo "")
    DOMAIN=$(grep -m1 "domain:" $story | sed 's/domain: //' || echo "")
    PRIORITY=$(grep -m1 "priority:" $story | sed 's/priority: //' || echo "P3-medium")
    DEPS=$(grep -m1 "dependencies:" $story | sed 's/dependencies: //' || echo "")
    
    # Build label string
    LABELS=""
    [ -n "$LAYER" ] && LABELS="$LABELS --label layer:$LAYER"
    [ -n "$BSC" ] && LABELS="$LABELS --label bsc:$BSC"
    [ -n "$DOMAIN" ] && LABELS="$LABELS --label domain:$DOMAIN"
    [ -n "$PRIORITY" ] && LABELS="$LABELS --label priority:$PRIORITY"
    
    # Build dependency string
    DEP_ARGS=""
    if [ -n "$DEPS" ]; then
        for dep in $(echo $DEPS | tr ',' ' '); do
            DEP_ARGS="$DEP_ARGS --depends-on $dep"
        done
    fi
    
    # Create Beads issue
    echo "  Creating issue: $TITLE"
    ISSUE_ID=$(bd create task "$TITLE" \
        --description "$(cat $story)" \
        $LABELS \
        $DEP_ARGS \
        --metadata "story_path=$story" \
        --json | jq -r '.id')
    
    echo "  Created: $ISSUE_ID"
    echo "$story -> $ISSUE_ID" >> $OUTPUT_LOG
    
    # If epic, create child tasks
    if [ -n "$EPIC" ]; then
        echo "  Creating as epic with child tasks..."
        bd update $ISSUE_ID --type epic
    fi
    
    echo ""
done

echo "✅ Conversion complete!"
echo "📋 Log written to: $OUTPUT_LOG"
```

### 7.4 Ready Query Configuration

```bash
# Create ready query aliases
cat >> .beads/config.jsonl << 'EOF'
{"setting": "query_alias", "name": "ready-p1", "query": "status:ready label:priority:P1-critical"}
{"setting": "query_alias", "name": "ready-ontology", "query": "status:ready label:domain:ontology"}
{"setting": "query_alias", "name": "ready-ui", "query": "status:ready label:domain:ui"}
{"setting": "query_alias", "name": "ready-vsom", "query": "status:ready label:layer:*"}
{"setting": "query_alias", "name": "my-work", "query": "assignee:me status:in_progress"}
EOF

# Create ready query command wrapper
cat > scripts/pfc-ready.sh << 'EOF'
#!/bin/bash
# Query ready work with optional filters

FILTER=${1:-""}

echo "📋 Ready Work Queue"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -n "$FILTER" ]; then
    echo "Filter: $FILTER"
    echo ""
    bd ready --filter "$FILTER"
else
    echo ""
    echo "🔴 P1 Critical:"
    bd ready --alias ready-p1 2>/dev/null || echo "  None"
    
    echo ""
    echo "🟡 All Ready:"
    bd ready
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Use 'bd start <id>' to begin working on a task"
EOF

chmod +x scripts/pfc-ready.sh
```

### 7.5 Dependency Graph Visualization

```bash
# Create dependency graph script
cat > scripts/pfc-graph.sh << 'EOF'
#!/bin/bash
# Generate dependency graph for an epic or all issues

TARGET=${1:-"all"}

echo "🔗 Dependency Graph"
echo ""

if [ "$TARGET" == "all" ]; then
    bd graph --format mermaid > .beads/dependency-graph.mmd
    echo "Generated: .beads/dependency-graph.mmd"
else
    bd graph $TARGET --format mermaid > .beads/dependency-graph-$TARGET.mmd
    echo "Generated: .beads/dependency-graph-$TARGET.mmd"
fi

# Convert to SVG if mermaid-cli available
if command -v mmdc &> /dev/null; then
    mmdc -i .beads/dependency-graph*.mmd -o .beads/dependency-graph.svg
    echo "SVG generated: .beads/dependency-graph.svg"
fi
EOF

chmod +x scripts/pfc-graph.sh
```

### 7.6 Deliverables Checklist

- [ ] Label taxonomy configured
- [ ] BMAD to Beads conversion script working
- [ ] Ready query aliases configured
- [ ] Dependency graph generation working
- [ ] Integration with SPARC status updates
- [ ] Test run with sample stories

---

## 8. Phase 5: Integration & Pipeline (Week 9-10)

### 8.1 Objectives

- Create end-to-end pipeline automation
- Configure approval gate triggers
- Set up notification systems
- Establish CI/CD integration

### 8.2 End-to-End Pipeline

```bash
#!/bin/bash
# scripts/pfc-pipeline.sh
# End-to-end pipeline: BMAD → SPARC → Beads

set -e

FEATURE=$1

if [ -z "$FEATURE" ]; then
    echo "Usage: ./pfc-pipeline.sh <feature_description>"
    exit 1
fi

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           PF-CORE AGENTIC DEVELOPMENT PIPELINE                 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Feature: $FEATURE"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PHASE 1: BMAD PLANNING
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ PHASE 1: BMAD PLANNING                                        │"
echo "└────────────────────────────────────────────────────────────────┘"

# Step 1.1: Analyst Agent
echo ""
echo "🔍 Step 1.1: Analyst Agent - Creating Brief..."
# Invoke BMAD Analyst
BRIEF_PATH="docs/briefs/$(date +%Y%m%d)-brief.md"
# bmad analyst "$FEATURE" --output $BRIEF_PATH
echo "   Brief created: $BRIEF_PATH"

# Step 1.2: Brief Review Gate
echo ""
echo "⏸️  Step 1.2: Brief Review Gate"
echo "   Awaiting human approval..."
read -p "   Approve brief? (y/n): " BRIEF_APPROVED
if [ "$BRIEF_APPROVED" != "y" ]; then
    echo "   ❌ Brief not approved. Exiting."
    exit 1
fi
echo "   ✅ Brief approved"

# Step 1.3: PM Agent
echo ""
echo "📝 Step 1.3: PM Agent - Creating PRD..."
PRD_PATH="docs/specs/$(date +%Y%m%d)-prd.md"
# bmad pm --brief $BRIEF_PATH --output $PRD_PATH
echo "   PRD created: $PRD_PATH"

# Step 1.4: PRD Review Gate
echo ""
echo "⏸️  Step 1.4: PRD Review Gate"
read -p "   Approve PRD? (y/n): " PRD_APPROVED
if [ "$PRD_APPROVED" != "y" ]; then
    echo "   ❌ PRD not approved. Exiting."
    exit 1
fi
echo "   ✅ PRD approved"

# Step 1.5: Architect Agent
echo ""
echo "🏗️  Step 1.5: Architect Agent - Creating Architecture..."
ARCH_PATH="docs/architecture/$(date +%Y%m%d)-arch.md"
# bmad architect --prd $PRD_PATH --output $ARCH_PATH
echo "   Architecture created: $ARCH_PATH"

# Step 1.6: Architecture Review Gate
echo ""
echo "⏸️  Step 1.6: Architecture Review Gate"
read -p "   Approve Architecture? (y/n): " ARCH_APPROVED
if [ "$ARCH_APPROVED" != "y" ]; then
    echo "   ❌ Architecture not approved. Exiting."
    exit 1
fi
echo "   ✅ Architecture approved"

# Step 1.7: Scrum Master Agent - Sharding
echo ""
echo "📚 Step 1.7: Scrum Master Agent - Sharding Stories..."
STORIES_DIR="docs/stories/$(date +%Y%m%d)"
mkdir -p $STORIES_DIR
# bmad scrum-master --prd $PRD_PATH --arch $ARCH_PATH --output $STORIES_DIR
echo "   Stories created in: $STORIES_DIR"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PHASE 2: BEADS CONVERSION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ PHASE 2: BEADS CONVERSION                                     │"
echo "└────────────────────────────────────────────────────────────────┘"

echo ""
echo "🔄 Converting stories to Beads issues..."
./scripts/bmad-to-beads.sh $STORIES_DIR
echo "   ✅ Issues created"

echo ""
echo "📊 Generating dependency graph..."
./scripts/pfc-graph.sh
echo "   ✅ Graph generated"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PHASE 3: SPARC EXECUTION (Loop)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ PHASE 3: SPARC EXECUTION                                      │"
echo "└────────────────────────────────────────────────────────────────┘"

echo ""
echo "📋 Ready tasks:"
./scripts/pfc-ready.sh

echo ""
echo "To execute a task, run:"
echo "  ./scripts/sparc-runner.sh <task_id>"
echo ""
echo "Pipeline setup complete! 🎉"
```

### 8.3 Git Hooks Integration

```bash
# Create git hooks
mkdir -p .git/hooks

# Pre-commit hook: Run tests
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🧪 Running tests before commit..."

# Run vitest
npm run test -- --run

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Commit aborted."
    exit 1
fi

# Check coverage
COVERAGE=$(npm run test:coverage -- --run 2>&1 | grep "All files" | awk '{print $4}' | sed 's/%//')
if [ -n "$COVERAGE" ] && [ $(echo "$COVERAGE < 85" | bc) -eq 1 ]; then
    echo "⚠️  Coverage $COVERAGE% below 85% threshold"
    read -p "Continue anyway? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        exit 1
    fi
fi

echo "✅ Pre-commit checks passed"
EOF

chmod +x .git/hooks/pre-commit

# Post-commit hook: Update Beads
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
# Extract task ID from commit message
COMMIT_MSG=$(git log -1 --pretty=%B)
TASK_ID=$(echo $COMMIT_MSG | grep -oE 'pfc-[0-9]+' | head -1)

if [ -n "$TASK_ID" ]; then
    echo "📝 Updating Beads task: $TASK_ID"
    bd update $TASK_ID --add-commit $(git rev-parse HEAD)
fi
EOF

chmod +x .git/hooks/post-commit
```

### 8.4 Deliverables Checklist

- [ ] End-to-end pipeline script working
- [ ] Git hooks installed and functional
- [ ] Approval gates integrated
- [ ] Notification system configured
- [ ] Full pipeline test run completed

---

## 9. Phase 6: Validation & Pilot (Week 11-12)

### 9.1 Objectives

- Run pilot with VSOM Phase 1 (Vision & Mission Manager)
- Validate all workflows
- Measure metrics
- Document lessons learned

### 9.2 Pilot Scope: Vision & Mission Manager

Based on your VSOM PRD Phase 1:

```yaml
pilot:
  name: "VSOM Phase 1: Vision & Mission Manager"
  duration: "2 weeks"
  
  features:
    - name: "Vision Statement CRUD"
      stories: 3
      estimated_hours: 12
      
    - name: "Mission Statement CRUD"
      stories: 3
      estimated_hours: 12
      
    - name: "Core Values Manager"
      stories: 4
      estimated_hours: 16
      
    - name: "Aspirational Goals"
      stories: 3
      estimated_hours: 12
      
    - name: "Basic Strategy Manager UI"
      stories: 5
      estimated_hours: 20
      
  total_stories: 18
  total_estimated_hours: 72
  
  success_criteria:
    - "All stories completed"
    - "Test coverage >85%"
    - "No context loss across sessions"
    - "Ontology validates against OAA Registry"
    - "UI renders from Figma Make pipeline"
```

### 9.3 Validation Checklist

```markdown
## Stack Validation Checklist

### BMAD Planning Layer
- [ ] Analyst Agent produces valid Brief with VSOM alignment
- [ ] PM Agent produces PRD with Gherkin acceptance criteria
- [ ] Architect Agent produces schema.org compliant ontology
- [ ] Scrum Master Agent correctly shards into ≤8 hour stories
- [ ] All approval gates function correctly
- [ ] Document sharding preserves full context

### SPARC Execution Layer
- [ ] Specification phase extracts requirements correctly
- [ ] Pseudocode phase documents algorithms
- [ ] Architecture phase produces valid designs
- [ ] TDD cycle (RED→GREEN→REFACTOR) works correctly
- [ ] Memory Bank persists context across sessions
- [ ] Coverage tracking accurate

### Beads Tracking Layer
- [ ] Stories convert to issues correctly
- [ ] Labels applied per taxonomy
- [ ] Dependencies tracked accurately
- [ ] Ready query returns correct tasks
- [ ] Status updates propagate from SPARC
- [ ] Branch isolation working

### Integration
- [ ] Full pipeline executes end-to-end
- [ ] Git hooks trigger correctly
- [ ] Context flows between layers
- [ ] No data loss at transitions
```

### 9.4 Metrics Collection

```typescript
// scripts/collect-metrics.ts
interface PilotMetrics {
  // Planning Metrics
  planning: {
    briefCreationTime: number;  // minutes
    prdCreationTime: number;
    architectureCreationTime: number;
    shardingTime: number;
    totalPlanningTime: number;
    approvalCycleTime: number;  // hours
  };
  
  // Execution Metrics
  execution: {
    storiesCompleted: number;
    storiesTotal: number;
    avgStoryTime: number;  // hours
    tddCyclesPerStory: number;
    contextLossIncidents: number;
  };
  
  // Quality Metrics
  quality: {
    testCoverage: number;  // percentage
    testsWritten: number;
    testsPassingRate: number;
    ontologyValidationPass: boolean;
    reworkRate: number;  // percentage
  };
  
  // Efficiency Metrics
  efficiency: {
    tokenUsage: number;
    costEstimate: number;  // USD
    humanInterventions: number;
    automationRate: number;  // percentage
  };
}

async function collectMetrics(): Promise<PilotMetrics> {
  // Implementation to collect from various sources
  return {
    planning: {
      briefCreationTime: 0,
      prdCreationTime: 0,
      architectureCreationTime: 0,
      shardingTime: 0,
      totalPlanningTime: 0,
      approvalCycleTime: 0
    },
    execution: {
      storiesCompleted: 0,
      storiesTotal: 18,
      avgStoryTime: 0,
      tddCyclesPerStory: 0,
      contextLossIncidents: 0
    },
    quality: {
      testCoverage: 0,
      testsWritten: 0,
      testsPassingRate: 0,
      ontologyValidationPass: false,
      reworkRate: 0
    },
    efficiency: {
      tokenUsage: 0,
      costEstimate: 0,
      humanInterventions: 0,
      automationRate: 0
    }
  };
}
```

---

## 10. Agent Definitions & Mappings

### 10.1 BMAD to PF-Core Agent Mapping

| BMAD Agent | PF-Core Role | Primary Outputs | Key Context |
|------------|--------------|-----------------|-------------|
| Analyst | Strategic Analyst | Brief.md | VSOM, BSC |
| PM | Product Manager | PRD.md | OKRs, Acceptance Criteria |
| Architect | Solution Architect | Architecture.md, Ontology.json | Schema.org, OAA Registry |
| Scrum Master | Delivery Lead | Stories/*.md | Dependencies, Sizing |
| Developer | Implementation | Code, Tests | TDD, Coverage |
| QA | Quality Assurance | Test Reports | Validation |

### 10.2 SPARC Mode to Task Type Mapping

| SPARC Mode | Task Types | Primary Activity |
|------------|------------|------------------|
| spec-pseudocode | All | Requirements extraction, algorithm design |
| architect | Ontology, Database, API | Component and contract design |
| tdd | All implementation | RED-GREEN-REFACTOR cycle |
| security | All | Security review and hardening |
| docs | All | Documentation generation |

---

## 11. Configuration Files

### 11.1 Complete .bmad/config.yaml

```yaml
# .bmad/config.yaml - Complete PF-Core Configuration
bmad:
  version: "5.0"
  project: "pf-core"
  methodology: "agile"
  
  # IDE Integration
  ide:
    primary: "claude-code"
    fallback: "vscode"
    
  # Agent Configuration
  agents:
    path: ".bmad/agents"
    enabled:
      - analyst
      - pm
      - architect
      - scrum-master
      - developer
      - qa
      
  # Template Configuration
  templates:
    path: ".bmad/templates"
    brief: "pfc-brief.md"
    prd: "pfc-prd.md"
    architecture: "pfc-architecture.md"
    story: "pfc-story.md"
    
  # Workflow Configuration
  workflows:
    path: ".bmad/workflows"
    default: "pfc-planning"
    approval_gates:
      enabled: true
      config: "approval-gates.yaml"
      
  # Output Configuration
  outputs:
    briefs: "docs/briefs"
    specs: "docs/specs"
    architecture: "docs/architecture"
    stories: "docs/stories"
    
  # Context Injection
  context:
    vsom:
      enabled: true
      path: "ontologies/vsom-ontology.json"
    ontology_registry:
      enabled: true
      path: "ontologies/oaa-registry.json"
    bsc_perspectives:
      - financial
      - customer
      - internal_process
      - learning_growth
      - stakeholder
      
  # Sharding Configuration
  sharding:
    enabled: true
    max_story_hours: 8
    preserve_context: true
    include_parent_reference: true
    
  # Integration
  integration:
    beads:
      enabled: true
      auto_convert: true
      conversion_script: "scripts/bmad-to-beads.sh"
    sparc:
      enabled: true
      memory_bank_sync: true
```

### 11.2 Complete .sparc/config.yaml

```yaml
# .sparc/config.yaml - Complete PF-Core Configuration
sparc:
  version: "2.0"
  project: "pf-core"
  methodology: "london_tdd"
  
  # Memory Bank Configuration
  memory_bank:
    enabled: true
    path: ".sparc/memory-bank"
    persistence: "file"
    checkpoint:
      frequency: "on_phase_complete"
      max_checkpoints: 10
    namespaces:
      - spec
      - pseudo
      - arch
      - refine
      - complete
      - shared
      
  # Phase Configuration
  phases:
    specification:
      enabled: true
      timeout_minutes: 30
      context_injection:
        vsom: true
        ontology_registry: true
        story_context: true
      validation:
        - requirements_complete
        - acceptance_criteria_present
        - vsom_alignment_documented
        
    pseudocode:
      enabled: true
      timeout_minutes: 20
      validation:
        - logic_complete
        - edge_cases_documented
        - complexity_analyzed
        
    architecture:
      enabled: true
      timeout_minutes: 45
      validation:
        - schema_org_compliant
        - rls_policies_defined
        - api_contracts_complete
        
    refinement:
      enabled: true
      timeout_minutes: 120
      tdd:
        enabled: true
        methodology: "london_school"
        coverage_target: 85
        cycle: "red_green_refactor"
        max_cycles: 5
      validation:
        - tests_passing
        - coverage_met
        - lint_clean
        
    completion:
      enabled: true
      timeout_minutes: 30
      validation:
        - all_tests_pass
        - documentation_complete
        - pr_ready
        - beads_updated
        
  # TDD Configuration
  tdd:
    framework: "vitest"
    coverage_tool: "c8"
    minimum_coverage: 85
    required_test_types:
      - unit
      - integration
    patterns:
      unit: "tests/unit/**/*.test.ts"
      integration: "tests/integration/**/*.test.ts"
      e2e: "tests/e2e/**/*.test.ts"
    mocking:
      enabled: true
      library: "vitest"
      
  # Integration Configuration
  integration:
    beads:
      enabled: true
      update_on_phase_complete: true
      status_mapping:
        specification: "in_progress"
        pseudocode: "in_progress"
        architecture: "in_progress"
        refinement: "in_progress"
        completion: "done"
    bmad:
      enabled: true
      story_path: "docs/stories"
      context_inheritance: true
```

---

## 12. Workflow Patterns

### 12.1 Pattern: New Module Development

```
Trigger: New PF-Core module requested
Duration: 2-4 weeks depending on complexity

┌─────────────────────────────────────────────────────────────────────┐
│ WORKFLOW: New Module Development                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. INITIATION                                                      │
│     └─▶ /pfc:plan "<module description>"                           │
│                                                                     │
│  2. BMAD PLANNING (Days 1-3)                                       │
│     ├─▶ Analyst Agent → Brief                                      │
│     │   └─▶ [Human Review Gate]                                    │
│     ├─▶ PM Agent → PRD                                             │
│     │   └─▶ [Human Review Gate]                                    │
│     ├─▶ Architect Agent → Architecture                             │
│     │   └─▶ [Human Review Gate]                                    │
│     └─▶ Scrum Master Agent → Sharded Stories                       │
│                                                                     │
│  3. BEADS SETUP (Day 4)                                            │
│     └─▶ ./scripts/bmad-to-beads.sh                                 │
│         ├─▶ Epic created                                           │
│         ├─▶ Tasks created with dependencies                        │
│         └─▶ Labels applied                                         │
│                                                                     │
│  4. SPARC EXECUTION (Days 5-N)                                     │
│     └─▶ For each ready task:                                       │
│         ├─▶ bd start <task_id>                                     │
│         ├─▶ ./scripts/sparc-runner.sh <task_id>                    │
│         │   ├─▶ Specification                                      │
│         │   ├─▶ Pseudocode                                         │
│         │   ├─▶ Architecture                                       │
│         │   ├─▶ Refinement (TDD)                                   │
│         │   └─▶ Completion                                         │
│         └─▶ bd complete <task_id>                                  │
│                                                                     │
│  5. INTEGRATION (Final Days)                                       │
│     ├─▶ Integration tests                                          │
│     ├─▶ Documentation                                              │
│     └─▶ Release preparation                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 12.2 Pattern: Bug Fix (Direct to SPARC)

```
Trigger: Bug report
Duration: <4 hours

┌─────────────────────────────────────────────────────────────────────┐
│ WORKFLOW: Bug Fix                                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. CREATE BEADS ISSUE                                              │
│     └─▶ bd create bug "<description>" --label priority:P2          │
│                                                                     │
│  2. SPARC EXECUTION (TDD Focus)                                    │
│     ├─▶ Write failing test that reproduces bug                     │
│     ├─▶ Fix bug (minimal change)                                   │
│     ├─▶ Verify test passes                                         │
│     └─▶ Refactor if needed                                         │
│                                                                     │
│  3. COMPLETION                                                      │
│     ├─▶ bd complete <issue_id>                                     │
│     └─▶ PR submitted                                               │
│                                                                     │
│  Note: No BMAD planning required for bugs <4 hours                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 12.3 Pattern: Ontology Change

```
Trigger: Schema modification required
Duration: 1-2 weeks (requires careful review)

┌─────────────────────────────────────────────────────────────────────┐
│ WORKFLOW: Ontology Change                                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ⚠️  MANDATORY FULL BMAD PLANNING                                  │
│                                                                     │
│  1. BMAD PLANNING                                                  │
│     ├─▶ Analyst: Impact analysis across ventures                   │
│     ├─▶ PM: Schema change specification                            │
│     └─▶ Architect: Full ontology design                            │
│         ├─▶ Schema.org compliance check                            │
│         ├─▶ OAA Registry validation                                │
│         └─▶ Migration path design                                  │
│                                                                     │
│  2. REVIEW GATES (Mandatory)                                       │
│     ├─▶ Platform Architect review                                  │
│     ├─▶ Tech Lead review                                           │
│     └─▶ Product Owner approval                                     │
│                                                                     │
│  3. IMPLEMENTATION                                                 │
│     ├─▶ Ontology JSON-LD update                                    │
│     ├─▶ Database migration scripts                                 │
│     ├─▶ API contract updates                                       │
│     └─▶ Agent context updates                                      │
│                                                                     │
│  4. VALIDATION                                                     │
│     ├─▶ OAA Registry validation                                    │
│     ├─▶ Integration testing                                        │
│     └─▶ Backward compatibility check                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 13. Testing Strategy

### 13.1 Test Pyramid

```
                    ┌─────────┐
                    │   E2E   │  10%
                    │  Tests  │
                   ┌┴─────────┴┐
                   │Integration│  20%
                   │   Tests   │
                  ┌┴───────────┴┐
                  │    Unit     │  70%
                  │    Tests    │
                  └─────────────┘
```

### 13.2 Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85
        }
      }
    },
    setupFiles: ['tests/setup.ts']
  }
});
```

---

## 14. Team Onboarding

### 14.1 Onboarding Checklist

```markdown
## Developer Onboarding Checklist

### Day 1: Environment Setup
- [ ] Clone pf-core repository
- [ ] Run `npm install`
- [ ] Run `./scripts/validate-stack.sh`
- [ ] Verify Claude Code access
- [ ] Review CLAUDE.md project context

### Day 2: BMAD Familiarization
- [ ] Read BMAD documentation
- [ ] Review agent definitions in `.bmad/agents/`
- [ ] Understand approval gate workflow
- [ ] Practice with `/pfc:plan` command

### Day 3: SPARC Familiarization
- [ ] Read SPARC documentation
- [ ] Understand 5-phase workflow
- [ ] Review Memory Bank structure
- [ ] Practice TDD cycle

### Day 4: Beads Familiarization
- [ ] Read Beads documentation
- [ ] Understand label taxonomy
- [ ] Practice `bd` commands
- [ ] Review dependency management

### Day 5: Integration Practice
- [ ] Run full pipeline with test feature
- [ ] Complete one task end-to-end
- [ ] Submit practice PR
- [ ] Review with team lead
```

### 14.2 Quick Reference Card

```
╔════════════════════════════════════════════════════════════════════╗
║                 PF-CORE AGENTIC STACK QUICK REFERENCE              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  PLANNING (BMAD)                                                   ║
║  ──────────────────────────────────────────────────────────────── ║
║  /pfc:plan <feature>     Start planning workflow                   ║
║  *analyst               Activate Analyst Agent                     ║
║  *pm                    Activate PM Agent                          ║
║  *architect             Activate Architect Agent                   ║
║  *scrum-master          Activate Scrum Master Agent                ║
║                                                                    ║
║  TRACKING (BEADS)                                                  ║
║  ──────────────────────────────────────────────────────────────── ║
║  bd ready               Show ready tasks                           ║
║  bd start <id>          Start working on task                      ║
║  bd complete <id>       Mark task complete                         ║
║  bd graph               Show dependency graph                      ║
║  ./scripts/pfc-ready.sh Query ready work                           ║
║                                                                    ║
║  EXECUTION (SPARC)                                                 ║
║  ──────────────────────────────────────────────────────────────── ║
║  ./scripts/sparc-runner.sh <id>        Full SPARC cycle            ║
║  ./scripts/sparc-runner.sh <id> spec   Spec phase only             ║
║  ./scripts/sparc-runner.sh <id> refine TDD cycle only              ║
║                                                                    ║
║  TESTING                                                           ║
║  ──────────────────────────────────────────────────────────────── ║
║  npm test               Run all tests                              ║
║  npm run test:coverage  Run with coverage                          ║
║  npm run test:watch     Watch mode                                 ║
║                                                                    ║
║  PIPELINE                                                          ║
║  ──────────────────────────────────────────────────────────────── ║
║  ./scripts/pfc-pipeline.sh <feature>   Full end-to-end            ║
║  ./scripts/validate-stack.sh           Verify installation         ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## 15. Appendices

### Appendix A: Troubleshooting Guide

| Issue | Symptom | Solution |
|-------|---------|----------|
| BMAD slash commands not working | `/analyst` returns error | Use `*analyst` instead (known Claude Code issue #479) |
| Memory Bank not persisting | Context lost between sessions | Check `.sparc/memory-bank` permissions |
| Beads ready returns empty | No tasks shown | Verify dependencies resolved with `bd graph` |
| Test coverage below target | Coverage <85% | Review untested code paths, add edge case tests |
| Ontology validation fails | OAA Registry error | Check schema.org compliance, review @context |

### Appendix B: Command Reference

See [Section 14.2 Quick Reference Card](#142-quick-reference-card)

### Appendix C: File Locations

| File/Directory | Purpose |
|----------------|---------|
| `.bmad/` | BMAD Method configuration |
| `.sparc/` | SPARC Framework configuration |
| `.beads/` | Beads issue tracking |
| `.claude/` | Claude Code settings |
| `CLAUDE.md` | Project context for Claude |
| `docs/` | All documentation |
| `ontologies/` | JSON-LD ontology definitions |
| `scripts/` | Automation scripts |
| `tests/` | Test suites |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | December 2025 | Platform Architecture | Initial implementation plan |

---

*© 2025 Platform Foundation Core Holdings. Confidential - Limited Use License.*
