# BAIV MVP WBS Priority Rework Checklist
**Version:** 1.0.0  
**Document Type:** Implementation Checklist  
**Status:** Active  
**Created:** 2025-01-01  
**Purpose:** Track rework of WBS priorities to accommodate Unified Registry architecture

---

## Executive Summary
This checklist guides the systematic rework of Work Breakdown Structure (WBS) priorities to integrate the Unified Registry architecture. The registry becomes the foundational P0 (critical path) component that all other components depend on.

**Total Estimated Rework Time:** 8 hours (1 day)  
**Critical Path Impact:** +5 days (Week 1 extended)  
**Overall Timeline:** Remains 6 weeks (registry work parallelized with existing tasks)

---

## Phase 1: Pre-Rework Analysis (1 hour)

### Task 1.1: Identify Current WBS Structure
- [ ] **Read existing WBS from BAIV_MVP_TODO_PLAN_v2.1.0.md**
  - Location: Section 3 (Work Breakdown Structure)
  - Current priorities: P0, P1, P2, P3
  - Current critical path: Database → API → Auth → Agents → Dashboard

- [ ] **Document current task dependencies**
  - List all WBS IDs with their dependencies
  - Identify tasks that block multiple other tasks
  - Calculate current critical path duration

- [ ] **Identify registry-impacted tasks**
  - Mark tasks that will need registry integration
  - Highlight tasks that become simpler with registry
  - Flag tasks that can be removed/consolidated

**Deliverable:** Current WBS dependency map (save as notes/memo)

---

## Phase 2: Registry Foundation Tasks (2 hours)

### Task 2.1: Create New WBS 1.4 - Unified Registry Bridge
- [ ] **Define WBS 1.4 structure**
  - WBS 1.4: Unified Registry Bridge (5 days, P0)
  - WBS 1.4.1: Unified Metadata Registry (2 days, P0)
  - WBS 1.4.2: Data Contract Registry (1.5 days, P0)
  - WBS 1.4.3: Orchestration Control Plane (1 day, P0)
  - WBS 1.4.4: Version Control Integration (0.5 days, P1)

- [ ] **Break down WBS 1.4.1 (Unified Metadata Registry)**
  - WBS 1.4.1.1: Design registry schema (4 hours, P0)
  - WBS 1.4.1.2: Implement metadata CRUD (6 hours, P0)
  - WBS 1.4.1.3: Build versioning system (4 hours, P0)
  - WBS 1.4.1.4: Create dependency engine (2 hours, P0)

- [ ] **Break down WBS 1.4.2 (Data Contract Registry)**
  - WBS 1.4.2.1: Input schema registry (3 hours, P0)
  - WBS 1.4.2.2: Output schema registry (3 hours, P0)
  - WBS 1.4.2.3: Transformation mappings (2 hours, P0)
  - WBS 1.4.2.4: Validation rule engine (4 hours, P0)

- [ ] **Break down WBS 1.4.3 (Orchestration Control Plane)**
  - WBS 1.4.3.1: Agent execution coordinator (2 hours, P0)
  - WBS 1.4.3.2: Data flow orchestrator (2 hours, P0)
  - WBS 1.4.3.3: Error recovery manager (2 hours, P0)
  - WBS 1.4.3.4: Performance monitor (2 hours, P0)

- [ ] **Break down WBS 1.4.4 (Version Control Integration)**
  - WBS 1.4.4.1: Git repository manager (1 hour, P1)
  - WBS 1.4.4.2: Atomic deployment engine (1 hour, P1)
  - WBS 1.4.4.3: Rollback manager (1 hour, P1)
  - WBS 1.4.4.4: Audit trail logger (1 hour, P1)

**Deliverable:** Complete WBS 1.4 task breakdown with time estimates

---

## Phase 3: Update Existing WBS Tasks (2 hours)

### Task 3.1: Update WBS 2.1 (Database Layer)
- [ ] **Add registry tables to database schema**
  - unified_registry table (metadata, version, dependencies)
  - data_contracts table (input/output schemas)
  - orchestration_state table (execution state)
  - audit_log table (change tracking)

- [ ] **Update dependencies**
  - OLD: WBS 2.1 depends on WBS 1.3 (Auth Bridge)
  - NEW: WBS 2.1 depends on WBS 1.4.1 (Unified Metadata Registry)

- [ ] **Adjust time estimate**
  - OLD: 2 days
  - NEW: 2.5 days (+4 hours for registry tables)

### Task 3.2: Retire WBS 2.4 (Ontology Service)
- [ ] **Mark WBS 2.4 as deprecated**
  - Functionality absorbed by WBS 1.4.2 (Data Contract Registry)
  - No longer separate service

- [ ] **Create WBS 2.4 (NEW) - Integrated Data Service**
  - WBS 2.4: Integrated Data Service (1.5 days, P1)
  - WBS 2.4.1: Unified Data Access Layer (4 hours, P1)
  - WBS 2.4.2: Schema Validation Engine (4 hours, P1)
  - WBS 2.4.3: Data Transformation Pipeline (4 hours, P1)
  - WBS 2.4.4: Real-time Synchronization (2 hours, P2)

- [ ] **Update dependencies**
  - OLD: WBS 2.4 depends on WBS 2.1 (Database)
  - NEW: WBS 2.4 depends on WBS 1.4.2 (Data Contract Registry)

### Task 3.3: Update WBS 3.1 (Agent Infrastructure)
- [ ] **Rename to "Registry-Driven Agent Infrastructure"**

- [ ] **Add registry-aware components**
  - WBS 3.1.1: Registry-Aware Agent Loader (4 hours, P0)
  - WBS 3.1.2: Unified Execution Tracking (3 hours, P0)
  - WBS 3.1.3: Dependency-Based Resource Allocation (3 hours, P1)
  - WBS 3.1.4: Orchestrated Error Handling (2 hours, P1)

- [ ] **Update dependencies**
  - ADD: WBS 3.1 depends on WBS 1.4.3 (Orchestration Control Plane)
  - ADD: WBS 3.1 depends on WBS 2.4 (Integrated Data Service)

- [ ] **Adjust time estimate**
  - OLD: 2 days
  - NEW: 3 days (+8 hours for registry integration)

### Task 3.4: Update WBS 3.2-3.4 (Agent Implementations)
- [ ] **WBS 3.2: Discovery Agent**
  - ADD: Registry metadata integration (2 hours)
  - ADD: Input/output contract validation (1 hour)
  - Time: 2 days → 2.5 days

- [ ] **WBS 3.3: Citation Tester Agent**
  - ADD: Registry metadata integration (2 hours)
  - ADD: Dependency resolution for Discovery output (1 hour)
  - Time: 2 days → 2.5 days

- [ ] **WBS 3.4: Gap Analyzer Agent**
  - ADD: Registry metadata integration (2 hours)
  - ADD: Dependency resolution for Citation output (1 hour)
  - Time: 1.5 days → 2 days

### Task 3.5: Update WBS 4.0 (Dashboard Services)
- [ ] **WBS 4.1: Add Registry Explorer component**
  - New: Browse unified registry (4 hours, P1)
  - New: Search & filter registry (3 hours, P2)

- [ ] **WBS 4.2: Add Dependency Visualizer**
  - New: Visualize registry dependencies (4 hours, P1)
  - New: Impact analysis preview (3 hours, P2)

- [ ] **WBS 4.3: Add Registry Management UI**
  - New: CRUD operations for registry (6 hours, P1)
  - New: Version control interface (4 hours, P2)

**Deliverable:** Updated WBS tasks with new dependencies and time estimates

---

## Phase 4: Priority Reassignment (1.5 hours)

### Task 4.1: Reassign P0 (Critical Path) Priorities
- [ ] **Week 1 P0 tasks (must complete before Week 2):**
  - ✓ WBS 1.4.1: Unified Metadata Registry (NEW)
  - ✓ WBS 1.4.2: Data Contract Registry (NEW)
  - ✓ WBS 1.4.3: Orchestration Control Plane (NEW)
  - ✓ WBS 2.1: Database Layer (UPDATED)
  - ✓ WBS 2.3: Authentication Service (UNCHANGED)

### Task 4.2: Reassign P1 (Week 2-3) Priorities
- [ ] **Week 2 P1 tasks:**
  - ✓ WBS 1.4.4: Version Control Integration (NEW)
  - ✓ WBS 2.4: Integrated Data Service (UPDATED)
  - ✓ WBS 3.1: Registry-Driven Agent Infrastructure (UPDATED)
  - ✓ WBS 4.3: Registry Management UI (NEW)

- [ ] **Week 3 P1 tasks:**
  - ✓ WBS 3.2: Discovery Agent (UPDATED)
  - ✓ WBS 3.3: Citation Tester Agent (UPDATED)
  - ✓ WBS 4.2: Dependency Visualizer (NEW)

### Task 4.3: Reassign P2 (Week 4-5) Priorities
- [ ] **Week 4 P2 tasks:**
  - ✓ WBS 3.4: Gap Analyzer Agent (UPDATED)
  - ✓ WBS 4.1: Registry Explorer (NEW)
  - ✓ WBS 2.4.4: Real-time Synchronization (UPDATED)

### Task 4.4: Keep P3 (Nice-to-Have) Unchanged
- [ ] **P3 tasks remain unchanged:**
  - WBS 4.4: Advanced Visualizations
  - WBS 5.3: Advanced Monitoring

**Deliverable:** New priority matrix (P0/P1/P2/P3 assignments)

---

## Phase 5: Timeline Adjustments (1 hour)

### Task 5.1: Recalculate Critical Path
- [ ] **New critical path:**
  1. WBS 1.4.1: Unified Metadata Registry (2 days)
  2. WBS 1.4.2: Data Contract Registry (1.5 days)
  3. WBS 2.1: Database Layer (2.5 days)
  4. WBS 2.4: Integrated Data Service (1.5 days)
  5. WBS 3.1: Registry-Driven Agent Infrastructure (3 days)
  6. WBS 3.2: Discovery Agent (2.5 days)
  7. WBS 4.0: Dashboard Services (3 days)
  8. WBS 6.0: Integration Testing (3 days)
  9. WBS 7.0: Deployment (2 days)

- [ ] **Calculate total critical path duration:**
  - Total: ~21 days (4.2 weeks)
  - Within 6-week timeline ✓

### Task 5.2: Update Week-by-Week Plan
- [ ] **Week 1: Registry Foundation + Database**
  - Monday-Tuesday: WBS 1.4.1 Unified Metadata Registry
  - Wednesday-Thursday: WBS 1.4.2 Data Contract Registry
  - Thursday-Friday: WBS 1.4.3 Orchestration Control Plane
  - Parallel: WBS 2.1 Database Layer (start Wednesday)

- [ ] **Week 2: Data Services + Agent Infrastructure**
  - Monday-Tuesday: WBS 2.4 Integrated Data Service
  - Wednesday-Friday: WBS 3.1 Registry-Driven Agent Infrastructure
  - Parallel: WBS 1.4.4 Version Control Integration (P1, can slip)

- [ ] **Week 3: Agent Implementations**
  - Monday-Wednesday: WBS 3.2 Discovery Agent
  - Thursday-Friday: WBS 3.3 Citation Tester Agent
  - Parallel: WBS 4.3 Registry Management UI

- [ ] **Week 4: Agent Completion + Dashboard**
  - Monday-Tuesday: WBS 3.4 Gap Analyzer Agent
  - Wednesday-Friday: WBS 4.1-4.2 Dashboard Components
  - Integration testing begins

- [ ] **Week 5: Testing + Optimization**
  - UNCHANGED

- [ ] **Week 6: Deployment + Documentation**
  - UNCHANGED

**Deliverable:** Updated 6-week timeline with registry integration

---

## Phase 6: Dependency Graph Update (0.5 hours)

### Task 6.1: Update Dependency Graph
- [ ] **Create new dependency edges:**
  - WBS 1.4.1 → WBS 1.4.2 (blocking)
  - WBS 1.4.2 → WBS 1.4.3 (blocking)
  - WBS 1.4.1 → WBS 2.1 (blocking)
  - WBS 1.4.3 → WBS 3.1 (blocking)
  - WBS 1.4.2 → WBS 2.4 (blocking)

- [ ] **Remove obsolete dependencies:**
  - Remove: WBS 2.4 (old Ontology Service) → WBS 3.1
  - Remove: Separate agent registry logic

- [ ] **Validate no circular dependencies**
  - Run topological sort on dependency graph
  - Ensure all tasks have valid ordering

**Deliverable:** Updated dependency graph (can use BAIV_MVP_DEPENDENCY_DIAGRAMS_v1.0.0.md)

---

## Phase 7: Documentation Updates (2 hours)

### Task 7.1: Update BAIV_MVP_TODO_PLAN_v2.1.0.md
- [ ] **Section 1 (PRD): Add registry functional requirements**
  - Add Section 1.3.5: Unified Registry & Orchestration
  - Update non-functional requirements (data integrity, version control)

- [ ] **Section 2 (PBS): Restructure PBS 1.4 and PBS 2.4**
  - Replace PBS 1.4 with Unified Registry & Orchestration Bridge
  - Replace PBS 2.4 with Integrated Data Service
  - Update PBS 3.0 to Orchestrated Agent Services

- [ ] **Section 3 (WBS): Insert new WBS tasks**
  - Add complete WBS 1.4 breakdown
  - Update WBS 2.1, 2.4, 3.1-3.4, 4.0 with registry tasks
  - Update priority assignments (P0/P1/P2)

- [ ] **Section 4 (Week-by-Week): Update timeline**
  - Rewrite Week 1-2 with registry foundation work
  - Update Week 3-4 with registry-integrated agent work
  - Keep Week 5-6 largely unchanged

- [ ] **Update Executive Summary**
  - Add registry unification benefits
  - Update risk mitigation with registry risks
  - Update success criteria with registry metrics

### Task 7.2: Version Control
- [ ] **Increment plan version to v2.2.0**
  - Major change: Architectural shift to unified registry
  - File name: BAIV_MVP_TODO_PLAN_v2.2.0.md
  - Update header with change log entry

- [ ] **Update APPENDIX B: Version History**
  - Add v2.2.0 entry with registry integration summary
  - List all changed WBS tasks
  - Document rationale for priority changes

**Deliverable:** BAIV_MVP_TODO_PLAN_v2.2.0.md with complete registry integration

---

## Phase 8: Validation & Review (1 hour)

### Task 8.1: Internal Consistency Check
- [ ] **Verify all WBS tasks have:**
  - Task ID (WBS x.y.z format)
  - Task name
  - Duration estimate
  - Dependencies list
  - Priority (P0/P1/P2/P3)
  - Deliverable description

- [ ] **Verify timeline adds up:**
  - Sum all critical path tasks
  - Confirm fits within 6 weeks
  - Check for overallocation (>8 hours/day)

- [ ] **Verify dependency consistency:**
  - All dependencies reference valid WBS IDs
  - No circular dependencies
  - Critical path is unbroken

### Task 8.2: Cross-Reference with Diagrams
- [ ] **Ensure consistency with BAIV_MVP_DEPENDENCY_DIAGRAMS_v1.0.0.md:**
  - PBS structure matches diagram Section 1
  - Epic-Feature breakdown matches diagram Section 3
  - Critical path matches diagram Section 6

- [ ] **Ensure consistency with Integration Plan:**
  - WBS tasks match proposed changes in Integration Plan
  - Timeline matches Implementation Timeline Changes
  - Technical architecture aligns with Registry Data Model

### Task 8.3: Stakeholder Review Prep
- [ ] **Prepare review package:**
  - BAIV_MVP_TODO_PLAN_v2.2.0.md (main document)
  - BAIV_MVP_DEPENDENCY_DIAGRAMS_v1.0.0.md (visualizations)
  - BAIV_WBS_PRIORITY_REWORK_CHECKLIST_v1.0.0.md (this document)
  - BAIV MVP Unified Registry Integration Plan (architecture plan)

- [ ] **Prepare change summary:**
  - 3-5 bullet points on key changes
  - Before/after comparison of critical path
  - Risk/benefit analysis

**Deliverable:** Review-ready documentation package

---

## Phase 9: Implementation Readiness (1 hour)

### Task 9.1: Development Environment Setup
- [ ] **Create registry development branch:**
  - Branch name: `feature/unified-registry-mvp`
  - Base branch: `main` or current development branch

- [ ] **Scaffold registry module structure:**
  - `/src/registry/metadata/` (WBS 1.4.1)
  - `/src/registry/contracts/` (WBS 1.4.2)
  - `/src/registry/orchestration/` (WBS 1.4.3)
  - `/src/registry/version-control/` (WBS 1.4.4)

- [ ] **Update database migration plan:**
  - Create migration: `001_unified_registry_foundation.sql`
  - Include: unified_registry, data_contracts, orchestration_state tables

### Task 9.2: Team Alignment
- [ ] **Schedule kickoff meeting:**
  - Review unified registry architecture
  - Walk through updated WBS and critical path
  - Assign Week 1 tasks to team members

- [ ] **Update project tracking tool:**
  - Create epics/stories for WBS 1.4 tasks
  - Update priorities in backlog
  - Link tasks to dependency graph

**Deliverable:** Development environment and team ready for implementation

---

## Completion Checklist

### Pre-Implementation Verification
- [ ] All phases (1-9) completed
- [ ] BAIV_MVP_TODO_PLAN_v2.2.0.md created and reviewed
- [ ] BAIV_MVP_DEPENDENCY_DIAGRAMS_v1.0.0.md created
- [ ] WBS priorities reassigned (P0/P1/P2/P3)
- [ ] Timeline validated (fits within 6 weeks)
- [ ] Critical path recalculated and verified
- [ ] No circular dependencies in WBS
- [ ] All registry tasks have time estimates
- [ ] Stakeholder review scheduled
- [ ] Development environment prepared
- [ ] Team aligned on new priorities

### Success Metrics
- [ ] **Timeline Impact:** +0 days to overall 6-week plan (registry work parallelized)
- [ ] **Critical Path:** Unified Registry → Database → Agent Infra → Agents (clear blocking chain)
- [ ] **Task Coverage:** 100% of MVP features mapped to WBS tasks
- [ ] **Dependency Clarity:** All blocking dependencies documented
- [ ] **Team Confidence:** >80% confidence in estimates (from team survey)

---

## Risk Mitigation

### Risk 1: Registry Design Complexity
- **Impact:** High (blocks entire project)
- **Mitigation:** Allocate extra time for WBS 1.4.1.1 (registry schema design)
- **Contingency:** Have backup simplified registry design ready

### Risk 2: Database Schema Changes
- **Impact:** Medium (affects Week 2 start)
- **Mitigation:** Parallelize database work with registry development
- **Contingency:** Use in-memory registry for Week 1 development

### Risk 3: Agent Infrastructure Rework
- **Impact:** Medium (affects Week 3)
- **Mitigation:** Create registry adapter pattern for backward compatibility
- **Contingency:** Implement registry integration incrementally per agent

### Risk 4: Timeline Overrun
- **Impact:** High (delays MVP launch)
- **Mitigation:** Monitor critical path weekly, adjust P2 tasks if needed
- **Contingency:** Move P2 tasks (Registry Explorer, Advanced Visualizations) to post-MVP

---

## Appendix: Quick Reference

### New WBS Tasks Summary
| WBS ID | Task Name | Duration | Priority | Week |
|--------|-----------|----------|----------|------|
| 1.4 | Unified Registry Bridge | 5 days | P0 | 1 |
| 1.4.1 | Unified Metadata Registry | 2 days | P0 | 1 |
| 1.4.2 | Data Contract Registry | 1.5 days | P0 | 1 |
| 1.4.3 | Orchestration Control Plane | 1 day | P0 | 1 |
| 1.4.4 | Version Control Integration | 0.5 days | P1 | 2 |

### Updated WBS Tasks Summary
| WBS ID | Task Name | Old Duration | New Duration | Change |
|--------|-----------|--------------|--------------|--------|
| 2.1 | Database Layer | 2 days | 2.5 days | +4 hours (registry tables) |
| 2.4 | Integrated Data Service | NEW | 1.5 days | Replaced Ontology Service |
| 3.1 | Registry-Driven Agent Infra | 2 days | 3 days | +8 hours (registry integration) |
| 3.2 | Discovery Agent | 2 days | 2.5 days | +3 hours (registry integration) |
| 3.3 | Citation Tester | 2 days | 2.5 days | +3 hours (registry integration) |
| 3.4 | Gap Analyzer | 1.5 days | 2 days | +3 hours (registry integration) |

### Priority Distribution
- **P0 (Critical Path):** WBS 1.4.1, 1.4.2, 1.4.3, 2.1, 2.3, 3.1, 3.2
- **P1 (Week 2-3):** WBS 1.4.4, 2.4, 3.3, 4.3, 4.2
- **P2 (Week 4-5):** WBS 3.4, 4.1, 2.4.4
- **P3 (Nice-to-Have):** WBS 4.4, 5.3

---

**Document Version:** 1.0.0  
**Status:** Ready for Execution  
**Estimated Completion:** 8 hours (1 working day)  
**Last Updated:** 2025-01-01
