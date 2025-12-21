# PF-Core Memory Bank Guide
## Context Persistence for Claude Sessions + 2-Dev Synchronization

**Version:** 1.0  
**Date:** December 2025  
**Scope:** SPARC MVP Implementation

---

## 1. The Problem It Solves

Claude has no memory between sessions. Every new chat starts blank. Without Memory Bank, you waste 10-15 minutes every session explaining:

- "Here's what we're building..."
- "Here's our tech stack..."
- "Here's where we left off..."
- "Here's what decisions we made..."

**The Solution:** 6 markdown files that Claude reads at session start. Claude knows everything instantly.

---

## 2. How 2 Devs Stay in Sync

```
                    ┌─────────────────────┐
                    │   /docs/memory-bank │
                    │   (Git repository)  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
       ┌─────────────┐                   ┌─────────────┐
       │   Dev A     │                   │   Dev B     │
       │  (Claude)   │                   │  (Claude)   │
       └─────────────┘                   └─────────────┘
              │                                 │
              │  git pull                       │  git pull
              │  before session                 │  before session
              │                                 │
              │  git commit progress.md         │  git commit progress.md
              │  after session                  │  after session
              │                                 │
              └────────────────┬────────────────┘
                               │
                               ▼
                    Both devs' Claude sessions
                    read SAME context files
```

**The Key Insight:** Claude sessions share context through Git files, not through memory. Both developers' Claude instances read the same source of truth.

---

## 3. The Daily Ritual

### Dev A - Morning Session

```bash
# 1. Get latest context
git pull

# 2. Start Claude session
"Read /docs/memory-bank/ and continue from progress.md"

# 3. Claude now knows:
#    - What's done
#    - What's in progress  
#    - What's blocked
#    - Architecture decisions made

# 4. Work on Feature X using SPARC (S→P→A→R→C)

# 5. End of session: Update progress.md

# 6. Commit and push
git add docs/memory-bank/progress.md
git commit -m "Progress: Feature X phase R complete"
git push
```

### Dev B - Afternoon Session

```bash
# 1. Get Dev A's updates
git pull  # ← Gets Dev A's progress.md updates

# 2. Start Claude session
"Read /docs/memory-bank/ and continue from progress.md"

# 3. Claude now knows:
#    - Dev A finished X
#    - Current blockers
#    - What needs attention next

# 4. Work on Feature Z (different area, no conflicts)

# 5. End of session: Update progress.md

# 6. Commit and push
git add docs/memory-bank/progress.md
git commit -m "Progress: Feature Z tests passing"
git push
```

---

## 4. Memory Bank File Structure

```
/docs/memory-bank/
├── projectbrief.md      ← Vision, objectives, platform scope
├── techContext.md       ← Stack decisions, dependencies
├── systemPatterns.md    ← Architecture patterns, decisions
├── activeContext.md     ← Current sprint focus, assignments
├── progress.md          ← Daily handoff (THE KEY FILE)
└── ontologyIndex.md     ← Ontology registry with versions
```

---

## 5. What Goes in Each File

| File | Who Updates | How Often | Content |
|------|-------------|-----------|---------|
| **projectbrief.md** | Both | Rarely | Vision, objectives - changes only when scope changes |
| **techContext.md** | Both | Weekly | Stack decisions, new dependencies added |
| **systemPatterns.md** | Both | When new pattern emerges | "We decided X because Y" |
| **activeContext.md** | Both | Per sprint | Current sprint goals, who's doing what |
| **progress.md** | Both | **Every session** | What I did, what's next, blockers |
| **ontologyIndex.md** | Both | When ontology changes | List of ontologies with versions |

---

## 6. File Templates

### projectbrief.md

```markdown
# PF-Core Project Brief

## Vision
Platform Foundation Core providing shared infrastructure for BAIV, AIR, and Wings4Mind.ai

## Objectives
- Ontology-driven architecture with OAA v3.0
- Multi-tenant support with Supabase
- Claude Agent SDK for all agent implementations
- Schema.org alignment for all data structures

## Platform Instances
- **BAIV**: AI Visibility optimization
- **AIR**: AI innovation consulting  
- **W4M**: Wings4Mind.ai platform

## Success Criteria
- [ ] OAA Registry managing 13+ ontologies
- [ ] VE module complete with all sub-modules
- [ ] Multi-tenant data isolation verified
- [ ] TDDD coverage >80%
```

### techContext.md

```markdown
# Technical Context

## Stack
- **Frontend**: Next.js 14, shadcn/ui, Tailwind
- **Backend**: Supabase (PostgreSQL + JSONB)
- **AI**: Claude Agent SDK, OAA v3.0
- **Ontologies**: JSON-LD, Schema.org aligned

## Key Dependencies
- docx: Document generation
- Mermaid: Diagram rendering
- Vitest: Testing framework

## Environment
- **Dev**: Local Supabase, localhost:3000
- **Staging**: Supabase project [TBD]
- **Prod**: Supabase project [TBD]

## Conventions
- File naming: `PF-Core_[Module]_[Type]_v[Version].[ext]`
- Branch naming: `feature/[module]-[description]`
- Commit format: `[Module]: [Action] [Description]`
```

### systemPatterns.md

```markdown
# System Patterns & Architecture Decisions

## Ontology Patterns

### Decision: JSONB over Normalized Tables
**Date**: 2024-12
**Rationale**: Ontologies are schema-flexible, JSONB allows evolution without migrations
**Trade-off**: Query complexity vs flexibility

### Decision: Four-Tier Inheritance
**Date**: 2024-12
**Pattern**: PF-Core → Platform Instance → Client → Application
**Rationale**: Enables white-label while maintaining core consistency

## Agent Patterns

### Decision: OAA as Central Registry
**Date**: 2024-12
**Pattern**: All agents register with OAA, consume ontologies through it
**Rationale**: Single source of truth for schema validation

### Decision: SPARC for Execution
**Date**: 2024-12
**Pattern**: S→P→A→R→C for all feature development
**Rationale**: Enforces TDDD, maintains consistency
```

### activeContext.md

```markdown
# Active Context - Current Sprint

## Sprint Goal
Complete VE-RRRR framework with 25 C-Suite roles

## Assignments

### Dev A (Amanda)
- VE-RRRR ontology extension
- Role discovery agent
- RACI resolution logic

### Dev B
- GTM module foundation
- Discovery agents P1-P7
- UI component library setup

## Dependencies
- VE-RRRR must complete before GTM can reference roles
- UI components needed for both modules

## Blockers
- None currently
```

### progress.md (THE KEY FILE)

```markdown
# Progress Log

---

## 2024-12-15 (Dev A - Amanda)

### Completed
- VE-RRRR ontology extended to 25 roles
- Supabase schema updated for role subsumption
- JSON-LD validation passing

### In Progress  
- SPARC Phase R: Role discovery agent implementation
- Tests written, 3/7 passing

### Blocked
- Need Dev B to confirm CPrO scope definition

### Next Session
- Fix failing tests for role hierarchy validation
- Start integration with OAA Registry

### Decisions Made
- CPrO critical for meat trading sector (70-85% cost accountability)
- Added CSustO as emerging role for ESG compliance

---

## 2024-12-15 (Dev B)

### Completed
- CPrO scope confirmed: 70-85% cost accountability
- Updated ontologyIndex.md with v3.1.0
- shadcn/ui base components configured

### In Progress
- GTM module schema design
- SPARC Phase P: Writing tests for GTM strategist agent

### Blocked
- None

### Next Session
- Complete GTM test suite
- Begin Phase A: Architecture alignment with OAA

### Decisions Made
- GTM will inherit from VE Value Proposition output
- Using Mermaid for all architecture diagrams

---

## 2024-12-14 (Dev A - Amanda)

### Completed
- Initial VE-RRRR framework structure
- 6 core C-Suite roles defined
- Competency matrix template created

[... older entries ...]
```

### ontologyIndex.md

```markdown
# Ontology Index

## Core Ontologies (OAA v3.0 Managed)

| ID | Name | Version | Status | Description |
|----|------|---------|--------|-------------|
| 1 | pf-core-platform | v1.0.0 | Stable | Platform foundation entities |
| 2 | pf-organization | v1.0.0 | Stable | Org, tenant, user structures |
| 3 | pf-roles-raci-rbac | v3.1.0 | Active | 25 C-Suite roles, RACI-X model |
| 4 | pf-ve-vsom | v1.0.0 | Stable | Vision, Strategy, Objectives, Metrics |
| 5 | pf-ve-value-proposition | v1.0.0 | Active | Value proposition framework |
| 6 | pf-ve-gtm | v0.1.0 | Draft | Go-to-market module |
| 7 | pf-ve-pmf | v0.1.0 | Draft | Product-market fit |
| 8 | pf-agents | v2.0.0 | Stable | Agent definitions, competencies |
| 9 | pf-design-tokens | v1.0.0 | Stable | UI/UX token system |
| 10 | pf-components | v1.0.0 | Stable | shadcn/ui component registry |
| 11 | pf-testing | v1.0.0 | Stable | TDDD test patterns |
| 12 | pf-security | v1.0.0 | Stable | RBAC, RLS policies |
| 13 | pf-ppm | v1.0.0 | Stable | Portfolio/Programme/Project |

## Schema.org Alignments
- Organization → schema:Organization
- Person → schema:Person  
- Role → schema:Role
- Product → schema:Product
- Service → schema:Service

## Recent Changes
- 2024-12-15: pf-roles-raci-rbac v3.0.0 → v3.1.0 (added 25th role: CSustO)
- 2024-12-14: pf-ve-gtm created at v0.1.0
```

---

## 7. Conflict Avoidance

### Simple Rule: Each Dev Works on Different Modules

```
Dev A: VE module, Role agents, RACI framework
Dev B: GTM module, Discovery agents, UI components
```

### If You MUST Touch the Same File

1. **Communicate first** via Slack/call
2. **One person commits**, other pulls before editing
3. **progress.md uses dated sections** - append only, never conflicts

### Git Workflow for Shared Files

```bash
# Before editing any memory-bank file
git pull

# After editing
git add docs/memory-bank/[file].md
git commit -m "Memory Bank: [what changed]"
git push

# If conflict occurs
git stash
git pull
git stash pop
# Manually merge, then commit
```

---

## 8. Session Start Script

Save this as your standard Claude session opener:

```
Read all files in /docs/memory-bank/ in this order:
1. projectbrief.md - for overall context
2. techContext.md - for technical constraints  
3. systemPatterns.md - for architecture decisions
4. activeContext.md - for current sprint focus
5. progress.md - for where we left off
6. ontologyIndex.md - for available schemas

Then continue from the last entry in progress.md. 
What's the next task I should work on?
```

---

## 9. Why This Scales

| Team Size | What Changes |
|-----------|--------------|
| **2 devs** | progress.md is your sync point. Daily git pull/push. |
| **4 devs** | Add activeContext.md sections per person. Weekly sync call. |
| **8+ devs** | Add Beads for dependency tracking. BMAD for formal specs. |

**The Memory Bank structure doesn't change** - you just add more tooling around it as complexity grows.

---

## 10. Quick Reference

### Every Session Start
```bash
git pull
# Then tell Claude: "Read /docs/memory-bank/ and continue from progress.md"
```

### Every Session End
```bash
# Update progress.md with: Completed, In Progress, Blocked, Next Session
git add docs/memory-bank/progress.md
git commit -m "Progress: [summary]"
git push
```

### Key Principle
> Claude sessions share context through Git files, not through memory. 
> The Memory Bank IS your shared memory.

---

**Document:** PFC_MEMORY_BANK_GUIDE_v1.0.md  
**Framework:** SPARC MVP for PF-Core
