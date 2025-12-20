# PF-Core Agentic Stack MVP
## Quick Start Implementation Guide

**Document:** PFC_MVP_AGENTIC_STACK_v1.md  
**Version:** 1.0.0  
**Date:** December 2025  
**Timeline:** 4 Weeks to Production-Ready  

---

## TL;DR - Get Started in 30 Minutes

```bash
# 1. Clone and setup (5 min)
git clone <your-repo> pf-core && cd pf-core
npm init -y && npm install -D typescript vitest @types/node

# 2. Install frameworks (10 min)
npx bmad-method install
npm install -g beads-cli && bd init --prefix pfc

# 3. Copy MVP configs (5 min)
# (Use configs from Section 3 below)

# 4. Run validation (5 min)
./scripts/validate.sh

# 5. Start your first feature (5 min)
./scripts/pfc-start.sh "Vision Statement Manager"
```

---

## 1. MVP Scope

### What's IN (Essential)
| Component | MVP Implementation |
|-----------|-------------------|
| **BMAD** | 3 agents only: PM, Architect, Developer |
| **SPARC** | 2 phases only: Spec + TDD Refinement |
| **Beads** | Basic issue tracking with labels |
| **TDD** | Vitest with 80% coverage target |

### What's OUT (Phase 2)
- Full 5-phase SPARC (use simplified 2-phase)
- Complex approval gates (use simple y/n prompts)
- Memory Bank persistence (use CLAUDE.md context)
- Claude-Flow swarm intelligence
- Expansion packs

### MVP Success Criteria
- [ ] Complete VSOM Phase 1 (Vision & Mission Manager)
- [ ] 80%+ test coverage
- [ ] Working Figma Make → Code pipeline
- [ ] 3 developers productive

---

## 2. 4-Week Timeline

```
Week 1: Setup + First Feature
├── Day 1-2: Install stack, configure
├── Day 3-5: Build Vision Statement CRUD
│
Week 2: Core VSOM Features  
├── Day 1-2: Mission Statement CRUD
├── Day 3-5: Core Values Manager
│
Week 3: UI + Integration
├── Day 1-3: Strategy Manager UI (Figma Make)
├── Day 4-5: Integration testing
│
Week 4: Polish + Documentation
├── Day 1-3: Bug fixes, edge cases
├── Day 4-5: Documentation, team training
```

---

## 3. MVP Configuration Files

### 3.1 Directory Structure

```bash
# Create minimal structure
mkdir -p pf-core/{.bmad,.beads,.claude/commands,docs,src,tests,scripts,ontologies}
cd pf-core
```

### 3.2 CLAUDE.md (Project Context)

```markdown
# PF-Core MVP Context

## Stack
- **Planning**: BMAD (PM → Architect → Developer)
- **Execution**: TDD with Vitest (80%+ coverage)
- **Tracking**: Beads (git-native issues)

## Rules
1. TDD MANDATORY: Write tests FIRST
2. All schemas must use schema.org base
3. Multi-tenant: Always include tenant_id + RLS
4. Coverage gate: 80% minimum

## VSOM Context
Building Vision & Mission Manager (Phase 1):
- Vision Statement CRUD
- Mission Statement CRUD  
- Core Values Manager
- Aspirational Goals

## Tech Stack
- Next.js + shadcn/ui (Figma Make output)
- Supabase PostgreSQL + JSONB
- Claude Agent SDK

## Quick Commands
- `/pfc:start <feature>` - Start new feature
- `/pfc:tdd <component>` - Run TDD cycle
- `/pfc:ready` - Show ready tasks
```

### 3.3 BMAD MVP Config

```yaml
# .bmad/config.yaml
bmad:
  version: "mvp"
  project: "pf-core"
  
  agents:
    enabled:
      - pm          # PRD + Stories
      - architect   # Technical design
      - developer   # TDD implementation
      
  workflow:
    simple_mode: true  # Skip complex gates
    
  outputs:
    specs: "docs/specs"
    stories: "docs/stories"
```

### 3.4 PM Agent (MVP)

```yaml
# .bmad/agents/pm.yaml
agent:
  name: "PFC PM"
  role: "Product Manager"
  
  prompt: |
    You are the PFC Product Manager. Create concise specs with:
    
    1. **Problem**: What problem are we solving?
    2. **Solution**: High-level approach
    3. **Stories**: Break into <4 hour tasks
    4. **Acceptance**: Gherkin format (Given/When/Then)
    
    Keep specs under 500 lines. Focus on testable requirements.
    
  outputs:
    - spec.md
    - stories/*.md
```

### 3.5 Architect Agent (MVP)

```yaml
# .bmad/agents/architect.yaml
agent:
  name: "PFC Architect"
  role: "Solution Architect"
  
  prompt: |
    You are the PFC Architect. For each feature provide:
    
    1. **Database Schema** (Supabase SQL with RLS)
    2. **API Endpoints** (REST patterns)
    3. **Component Structure** (Next.js + shadcn)
    
    Always use:
    - tenant_id on all tables
    - JSONB for flexible fields
    - schema.org vocabulary where applicable
    
  outputs:
    - schema.sql
    - api-spec.md
```

### 3.6 Developer Agent (MVP)

```yaml
# .bmad/agents/developer.yaml
agent:
  name: "PFC Developer"
  role: "TDD Developer"
  
  prompt: |
    You are the PFC Developer using TDD. For each task:
    
    1. **RED**: Write failing test first
    2. **GREEN**: Minimal code to pass
    3. **REFACTOR**: Clean up, maintain coverage
    
    Requirements:
    - 80%+ test coverage
    - TypeScript strict mode
    - Vitest for testing
    
  tdd:
    framework: vitest
    coverage: 80
```

### 3.7 Beads Config

```jsonl
{"setting": "prefix", "value": "pfc"}
{"setting": "default_type", "value": "task"}
{"setting": "auto_branch", "value": true}
```

### 3.8 Label Taxonomy (Minimal)

```bash
# Initialize minimal labels
bd label create domain:ui --color "#EC4899"
bd label create domain:api --color "#F59E0B"
bd label create domain:db --color "#0891B2"
bd label create priority:high --color "#DC2626"
bd label create priority:medium --color "#3B82F6"
bd label create priority:low --color "#6B7280"
```

---

## 4. MVP Scripts

### 4.1 Validation Script

```bash
#!/bin/bash
# scripts/validate.sh
set -e

echo "🔍 Validating PF-Core MVP Stack..."

# Check BMAD
if [ -f ".bmad/config.yaml" ]; then
    echo "✅ BMAD configured"
else
    echo "❌ BMAD not configured"
    exit 1
fi

# Check Beads
if bd --version > /dev/null 2>&1; then
    echo "✅ Beads installed"
else
    echo "❌ Beads not found - run: npm install -g beads-cli"
    exit 1
fi

# Check CLAUDE.md
if [ -f "CLAUDE.md" ]; then
    echo "✅ CLAUDE.md present"
else
    echo "❌ CLAUDE.md missing"
    exit 1
fi

echo ""
echo "✅ MVP Stack Ready!"
```

### 4.2 Start Feature Script

```bash
#!/bin/bash
# scripts/pfc-start.sh
# Usage: ./pfc-start.sh "Feature Name"

FEATURE="$1"
DATE=$(date +%Y%m%d)

if [ -z "$FEATURE" ]; then
    echo "Usage: ./pfc-start.sh <feature_name>"
    exit 1
fi

SLUG=$(echo "$FEATURE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

echo "🚀 Starting: $FEATURE"
echo ""

# Create spec directory
mkdir -p "docs/specs/$SLUG"
mkdir -p "docs/stories/$SLUG"

# Create spec template
cat > "docs/specs/$SLUG/spec.md" << EOF
# $FEATURE

## Problem
[What problem does this solve?]

## Solution
[High-level approach]

## Acceptance Criteria
\`\`\`gherkin
Given [context]
When [action]
Then [expected result]
\`\`\`

## Technical Notes
- Database: [tables/changes needed]
- API: [endpoints needed]
- UI: [components needed]

## Stories
1. [ ] Story 1 - [description] (~Xh)
2. [ ] Story 2 - [description] (~Xh)
3. [ ] Story 3 - [description] (~Xh)
EOF

echo "📄 Created: docs/specs/$SLUG/spec.md"

# Create Beads epic
EPIC_ID=$(bd create epic "$FEATURE" --json | jq -r '.id')
echo "📋 Created Beads epic: $EPIC_ID"

echo ""
echo "Next steps:"
echo "1. Edit docs/specs/$SLUG/spec.md with requirements"
echo "2. Ask Claude: 'Review this spec and create stories'"
echo "3. Run: ./scripts/pfc-story.sh $SLUG <story_name>"
```

### 4.3 Create Story Script

```bash
#!/bin/bash
# scripts/pfc-story.sh
# Usage: ./pfc-story.sh <feature-slug> "Story Name"

FEATURE=$1
STORY="$2"

if [ -z "$FEATURE" ] || [ -z "$STORY" ]; then
    echo "Usage: ./pfc-story.sh <feature-slug> <story_name>"
    exit 1
fi

STORY_SLUG=$(echo "$STORY" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create story file
cat > "docs/stories/$FEATURE/$STORY_SLUG.md" << EOF
# $STORY

## Parent Feature
$FEATURE

## Description
[What does this story accomplish?]

## Acceptance Criteria
\`\`\`gherkin
Given [context]
When [action]
Then [expected result]
\`\`\`

## Technical Tasks
- [ ] Write failing tests
- [ ] Implement minimal code
- [ ] Refactor and document

## Test Cases
1. [Test case 1]
2. [Test case 2]
3. [Edge case]

## Estimate
~X hours
EOF

# Create Beads task
TASK_ID=$(bd create task "$STORY" \
    --label "domain:api" \
    --label "priority:medium" \
    --json | jq -r '.id')

echo "📋 Created: $TASK_ID - $STORY"
echo "📄 Story file: docs/stories/$FEATURE/$STORY_SLUG.md"
echo ""
echo "Start work: bd start $TASK_ID"
```

### 4.4 TDD Runner Script

```bash
#!/bin/bash
# scripts/pfc-tdd.sh
# Usage: ./pfc-tdd.sh <task_id>

TASK_ID=$1

if [ -z "$TASK_ID" ]; then
    echo "Usage: ./pfc-tdd.sh <task_id>"
    exit 1
fi

echo "🔄 TDD Cycle for: $TASK_ID"
echo ""

# Start task in Beads
bd start $TASK_ID

# Get task info
TASK_TITLE=$(bd show $TASK_ID --json | jq -r '.title')
echo "Task: $TASK_TITLE"
echo ""

# TDD Cycle
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔴 RED PHASE: Write failing tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Create test file, then press Enter..."
read

# Run tests (should fail)
npm test -- --run
echo ""
read -p "Tests failing as expected? (y/n): " RED_OK
if [ "$RED_OK" != "y" ]; then
    echo "Fix tests to fail first!"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🟢 GREEN PHASE: Implement minimal code"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Write code to pass tests, then press Enter..."
read

# Run tests (should pass)
npm test -- --run
if [ $? -ne 0 ]; then
    echo "❌ Tests still failing. Keep implementing."
    exit 1
fi
echo "✅ Tests passing!"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔵 REFACTOR PHASE: Clean up code"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Refactor if needed, then press Enter..."
read

# Final test + coverage
npm run test:coverage -- --run

# Check coverage
COVERAGE=$(npm run test:coverage -- --run 2>&1 | grep "All files" | awk '{print $4}' | tr -d '%')
if [ -n "$COVERAGE" ]; then
    if [ $(echo "$COVERAGE < 80" | bc) -eq 1 ]; then
        echo "⚠️  Coverage $COVERAGE% below 80% target"
    else
        echo "✅ Coverage $COVERAGE% meets target"
    fi
fi

echo ""
read -p "Complete task? (y/n): " COMPLETE
if [ "$COMPLETE" == "y" ]; then
    bd complete $TASK_ID
    echo "✅ Task completed!"
fi
```

### 4.5 Ready Query Script

```bash
#!/bin/bash
# scripts/pfc-ready.sh

echo "📋 Ready Tasks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
bd ready

echo ""
echo "Commands:"
echo "  bd start <id>     Start working"
echo "  bd show <id>      View details"
echo "  ./scripts/pfc-tdd.sh <id>  Run TDD cycle"
```

---

## 5. MVP Workflow

### 5.1 Daily Developer Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    MVP DAILY WORKFLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MORNING                                                    │
│  ────────                                                   │
│  1. ./scripts/pfc-ready.sh          # Check ready tasks    │
│  2. bd start <task_id>              # Pick a task          │
│                                                             │
│  DEVELOPMENT                                                │
│  ───────────                                                │
│  3. Review story in docs/stories/                          │
│  4. Ask Claude: "Help me implement <task>"                 │
│  5. ./scripts/pfc-tdd.sh <task_id>  # TDD cycle           │
│                                                             │
│  COMPLETION                                                 │
│  ──────────                                                 │
│  6. git commit -m "pfc-123: <description>"                 │
│  7. bd complete <task_id>                                  │
│  8. Create PR                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Feature Development Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    MVP FEATURE FLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. INITIATE                                                │
│     ./scripts/pfc-start.sh "Vision Statement Manager"      │
│                                                             │
│  2. SPEC (with Claude)                                     │
│     "Act as PM Agent. Review docs/specs/vision-statement-  │
│      manager/spec.md and create detailed stories."         │
│                                                             │
│  3. ARCHITECTURE (with Claude)                             │
│     "Act as Architect Agent. Design the database schema    │
│      and API for Vision Statement Manager."                │
│                                                             │
│  4. STORIES                                                 │
│     ./scripts/pfc-story.sh vision-statement-manager        │
│       "Create vision statement"                            │
│     ./scripts/pfc-story.sh vision-statement-manager        │
│       "Read vision statement"                              │
│     ./scripts/pfc-story.sh vision-statement-manager        │
│       "Update vision statement"                            │
│                                                             │
│  5. IMPLEMENT (TDD per story)                              │
│     ./scripts/pfc-tdd.sh pfc-001                           │
│     ./scripts/pfc-tdd.sh pfc-002                           │
│     ./scripts/pfc-tdd.sh pfc-003                           │
│                                                             │
│  6. INTEGRATE                                               │
│     Run integration tests                                  │
│     Merge to main                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Claude Prompts (Copy-Paste Ready)

### 6.1 PM Agent Prompt

```
Act as the PFC Product Manager Agent.

I need you to create a spec for: [FEATURE NAME]

Context:
- Platform: PF-Core (multi-tenant SaaS)
- Module: VSOM (Vision, Strategy, Objectives, Metrics)
- Tech: Next.js + Supabase + Claude Agent SDK

Please provide:
1. Problem statement (2-3 sentences)
2. Solution overview (2-3 sentences)
3. User stories (break into <4 hour tasks)
4. Acceptance criteria in Gherkin format

Keep it concise - under 200 lines.
```

### 6.2 Architect Agent Prompt

```
Act as the PFC Architect Agent.

Design the technical architecture for: [FEATURE NAME]

Requirements:
- Supabase PostgreSQL with JSONB
- Multi-tenant (tenant_id + RLS required)
- schema.org vocabulary for ontologies
- Next.js + shadcn/ui components

Please provide:
1. Database schema (SQL with RLS policies)
2. API endpoints (method, path, request/response)
3. Component structure (React components needed)

Keep it practical - focus on what we need to build.
```

### 6.3 TDD Developer Prompt

```
Act as the PFC Developer Agent using TDD.

I'm implementing: [STORY NAME]

Acceptance criteria:
[PASTE GHERKIN HERE]

Please help me with the TDD cycle:

1. RED: Write failing tests for this functionality
   - Use Vitest
   - Cover happy path and edge cases
   
2. GREEN: After I confirm tests fail, provide minimal implementation

3. REFACTOR: Suggest improvements while maintaining tests

Start with the failing tests.
```

---

## 7. Testing Setup

### 7.1 Vitest Configuration

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
      reporter: ['text', 'html'],
      thresholds: {
        global: {
          lines: 80,
          functions: 80,
          branches: 75,
          statements: 80
        }
      }
    }
  }
});
```

### 7.2 Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/coverage-c8": "^1.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 7.3 Example Test Structure

```typescript
// tests/unit/vision-statement.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createVisionStatement, getVisionStatement } from '@/lib/vision';

describe('Vision Statement', () => {
  const tenantId = 'test-tenant-123';
  
  describe('createVisionStatement', () => {
    it('should create a vision statement with required fields', async () => {
      const input = {
        tenantId,
        statement: 'To be the leading AI platform',
        timeHorizon: '5 years'
      };
      
      const result = await createVisionStatement(input);
      
      expect(result.id).toBeDefined();
      expect(result.statement).toBe(input.statement);
      expect(result.tenantId).toBe(tenantId);
    });
    
    it('should reject empty statement', async () => {
      const input = {
        tenantId,
        statement: '',
        timeHorizon: '5 years'
      };
      
      await expect(createVisionStatement(input))
        .rejects.toThrow('Statement cannot be empty');
    });
  });
  
  describe('getVisionStatement', () => {
    it('should return null for non-existent tenant', async () => {
      const result = await getVisionStatement('non-existent');
      expect(result).toBeNull();
    });
  });
});
```

---

## 8. First Feature: Vision Statement Manager

### 8.1 Quick Start

```bash
# 1. Start feature
./scripts/pfc-start.sh "Vision Statement Manager"

# 2. Create stories
./scripts/pfc-story.sh vision-statement-manager "Create vision statement"
./scripts/pfc-story.sh vision-statement-manager "Get vision statement"
./scripts/pfc-story.sh vision-statement-manager "Update vision statement"
./scripts/pfc-story.sh vision-statement-manager "Delete vision statement"

# 3. Check ready work
./scripts/pfc-ready.sh

# 4. Start TDD on first story
./scripts/pfc-tdd.sh pfc-001
```

### 8.2 Database Schema (MVP)

```sql
-- supabase/migrations/001_vision_statement.sql

-- Vision Statements Table
CREATE TABLE IF NOT EXISTS vision_statements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Core Fields
    statement TEXT NOT NULL,
    time_horizon TEXT, -- e.g., "5 years", "10 years"
    
    -- Metadata (JSONB for flexibility)
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID,
    
    -- Constraints
    UNIQUE(tenant_id) -- One vision per tenant
);

-- RLS Policies
ALTER TABLE vision_statements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant isolation" ON vision_statements
    FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Index
CREATE INDEX idx_vision_tenant ON vision_statements(tenant_id);
```

### 8.3 API Endpoints (MVP)

```typescript
// src/app/api/vision/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// GET /api/vision
export async function GET(req: NextRequest) {
  const supabase = createClient();
  const tenantId = req.headers.get('x-tenant-id');
  
  const { data, error } = await supabase
    .from('vision_statements')
    .select('*')
    .eq('tenant_id', tenantId)
    .single();
    
  if (error) return NextResponse.json({ error }, { status: 404 });
  return NextResponse.json(data);
}

// POST /api/vision
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const tenantId = req.headers.get('x-tenant-id');
  const body = await req.json();
  
  const { data, error } = await supabase
    .from('vision_statements')
    .insert({ ...body, tenant_id: tenantId })
    .select()
    .single();
    
  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}

// PUT /api/vision
export async function PUT(req: NextRequest) {
  const supabase = createClient();
  const tenantId = req.headers.get('x-tenant-id');
  const body = await req.json();
  
  const { data, error } = await supabase
    .from('vision_statements')
    .update(body)
    .eq('tenant_id', tenantId)
    .select()
    .single();
    
  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE /api/vision
export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const tenantId = req.headers.get('x-tenant-id');
  
  const { error } = await supabase
    .from('vision_statements')
    .delete()
    .eq('tenant_id', tenantId);
    
  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ success: true });
}
```

---

## 9. Quick Reference Card

```
╔════════════════════════════════════════════════════════════════╗
║                   PF-CORE MVP QUICK REFERENCE                  ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  SETUP                                                         ║
║  ./scripts/validate.sh              Verify installation        ║
║                                                                ║
║  FEATURES                                                      ║
║  ./scripts/pfc-start.sh <name>      Start new feature          ║
║  ./scripts/pfc-story.sh <f> <name>  Create story               ║
║                                                                ║
║  DAILY WORK                                                    ║
║  ./scripts/pfc-ready.sh             Show ready tasks           ║
║  bd start <id>                      Start task                 ║
║  ./scripts/pfc-tdd.sh <id>          TDD cycle                  ║
║  bd complete <id>                   Complete task              ║
║                                                                ║
║  TESTING                                                       ║
║  npm test                           Run tests                  ║
║  npm run test:coverage              With coverage              ║
║                                                                ║
║  CLAUDE AGENTS (say this to Claude)                            ║
║  "Act as PM Agent..."               For specs/stories          ║
║  "Act as Architect Agent..."        For technical design       ║
║  "Act as Developer Agent..."        For TDD implementation     ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 10. Graduation to Full Stack

When MVP is stable (after VSOM Phase 1), graduate to full stack:

| MVP Component | Full Stack Upgrade |
|---------------|-------------------|
| 3 Agents | Add Analyst, Scrum Master, QA |
| 2 SPARC Phases | Add all 5 phases |
| Simple prompts | BMAD approval gates |
| CLAUDE.md context | SPARC Memory Bank |
| 80% coverage | 85% coverage |

**Trigger for upgrade**: Successfully completed VSOM Phase 1 with all tests passing.

---

## Checklist: MVP Complete

- [ ] Stack installed and validated
- [ ] First feature (Vision Statement) working
- [ ] TDD workflow functional (80%+ coverage)
- [ ] Beads tracking issues correctly
- [ ] Team can use daily workflow
- [ ] Ready for VSOM Phase 1 development

---

*MVP Document - Get started fast, graduate to full stack when ready.*
