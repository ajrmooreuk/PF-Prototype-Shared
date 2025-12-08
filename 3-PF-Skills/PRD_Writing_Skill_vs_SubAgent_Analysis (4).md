# PRD Writing Capability: Skill vs Sub-Agent Analysis
## Decision Framework for AI Visibility Platform Architecture

### Version 1.0 | October 2025

---

## Executive Summary

**Question**: Should PRD (Product Requirements Document) writing be implemented as:
- **Option A**: A Skill (loaded by existing agents when needed)
- **Option B**: A dedicated Sub-Agent (permanent specialist in the architecture)

**Recommendation**: **Implement as a SKILL** (not a dedicated sub-agent)

**Rationale**:
1. PRD writing is a **format/output capability**, not a domain-specific reasoning process
2. Multiple agents may need to produce PRDs (Strategy, Content, Implementation)
3. Keeps agent architecture focused on domain expertise (Audit, Strategy, Content, Measurement)
4. More flexible - any agent can access PRD writing skills when needed
5. Easier to maintain and update a single PRD skill vs PRD logic across agents

---

## Decision Framework

### What Makes a Good Sub-Agent vs Skill?

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    SUB-AGENT vs SKILL DECISION MATRIX                     ║
╚═══════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│ CHARACTERISTICS OF A SUB-AGENT                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ ✓ Domain-specific REASONING and DECISION-MAKING                         │
│ ✓ Complex multi-step PROCESSES unique to that domain                    │
│ ✓ Specialized KNOWLEDGE BASE (ontology subgraphs)                       │
│ ✓ Makes strategic TRADE-OFFS within its domain                          │
│ ✓ Produces domain-specific INSIGHTS and RECOMMENDATIONS                 │
│ ✓ Requires sustained CONTEXT throughout a process                       │
│ ✓ Has clear INPUT → PROCESS → OUTPUT boundaries                         │
│ ✓ Used independently or as part of larger workflow                      │
│                                                                           │
│ Examples in AI Visibility Platform:                                      │
│ • Audit Agent (complex testing, analysis, benchmarking)                 │
│ • Strategy Agent (positioning, prioritization, roadmapping)             │
│ • Content Agent (gap analysis, optimization, specs)                     │
│ • Measurement Agent (KPI design, tracking, optimization)                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ CHARACTERISTICS OF A SKILL                                                │
├─────────────────────────────────────────────────────────────────────────┤
│ ✓ FORMATTING, STRUCTURING, or OUTPUT GENERATION capability              │
│ ✓ Reusable across MULTIPLE AGENTS or contexts                           │
│ ✓ Relatively STATELESS (doesn't maintain context)                       │
│ ✓ Focused on "HOW to present" not "WHAT to recommend"                   │
│ ✓ Templates, guidelines, best practices                                 │
│ ✓ Quality criteria and checklists                                       │
│ ✓ Can be loaded/unloaded on-demand                                      │
│ ✓ Enhances agent output without changing agent logic                    │
│                                                                           │
│ Examples:                                                                 │
│ • PRD Writing (format, structure, completeness)                         │
│ • Executive Summary Creation                                             │
│ • Data Visualization Guidelines                                          │
│ • Technical Documentation Formatting                                     │
│ • Presentation Design                                                    │
│ • Report Structuring                                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Applying Framework to PRD Writing

```
PRD WRITING EVALUATION:

Does it do domain-specific reasoning?
❌ NO - PRDs are an OUTPUT FORMAT, not a reasoning process
   The content comes from domain agents (Strategy, Content, etc.)
   PRD skill just structures that content effectively

Does it need specialized knowledge base?
❌ NO - PRD best practices are formatting/structural guidelines
   Not domain-specific ontology subgraphs

Does it make strategic trade-offs?
❌ NO - The strategy agent decides WHAT goes in the PRD
   PRD skill decides HOW to present it

Will multiple agents need this capability?
✅ YES - Strategy Agent, Content Agent, Implementation planning
   All may need to produce PRDs for different purposes

Is it stateless/reusable?
✅ YES - Can be loaded when any agent needs to produce a PRD
   Doesn't maintain context between uses

Is it about "how to present" vs "what to recommend"?
✅ YES - PRD skill is about presentation, structure, completeness
   Content comes from the reasoning agents

CONCLUSION: PRD Writing should be a SKILL, not a Sub-Agent
```

---

## Recommended Implementation: PRD Writing as a Skill

### Architecture Integration

```
┌─────────────────────────────────────────────────────────────┐
│            MASTER REASONING AGENT (Orchestrator)            │
│                                                              │
│  When agent needs to produce PRD:                           │
│  1. Agent completes domain reasoning                        │
│  2. Orchestrator loads PRD_WRITING skill                    │
│  3. Agent formats output using PRD skill                    │
│  4. Orchestrator unloads PRD_WRITING skill                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Routes to agents with PRD skill loaded
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ STRATEGY      │   │   CONTENT     │   │ IMPLEMENTATION│
│ AGENT         │   │   AGENT       │   │   AGENT       │
│               │   │               │   │               │
│ + PRD skill   │   │ + PRD skill   │   │ + PRD skill   │
│ (when needed) │   │ (when needed) │   │ (when needed) │
└───────────────┘   └───────────────┘   └───────────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                            ▼
                ┌──────────────────────┐
                │  KNOWLEDGE GRAPH     │
                │                      │
                │  Skills Library:     │
                │  • PRD Writing       │
                │  • Exec Summary      │
                │  • Presentation      │
                │  • Technical Docs    │
                └──────────────────────┘
```

### Skill File Structure

```
/mnt/skills/
├── public/                    # Pre-built skills
│   ├── prd-writing/
│   │   ├── SKILL.md          # Main PRD writing guide
│   │   ├── templates/
│   │   │   ├── standard-prd.md
│   │   │   ├── technical-prd.md
│   │   │   ├── marketing-prd.md
│   │   │   └── feature-prd.md
│   │   ├── examples/
│   │   │   ├── good-prd-example.md
│   │   │   └── bad-prd-example.md
│   │   └── checklists/
│   │       └── prd-quality-checklist.md
│   │
│   ├── executive-summary/
│   ├── data-visualization/
│   └── technical-documentation/
│
├── user/                      # User-uploaded custom skills
│   └── [client-specific skills]
│
└── examples/                  # Example skills
    └── [demonstration skills]
```

---

## PRD Writing Skill Specification

### Skill Definition (SKILL.md)

```markdown
# PRD (Product Requirements Document) Writing Skill

## Purpose
Expert capability for structuring, formatting, and quality-checking Product Requirements 
Documents across various contexts (features, products, strategies, implementations).

## When to Load This Skill

Load this skill when any agent needs to:
- Produce a formal Product Requirements Document
- Structure strategic recommendations as a PRD
- Create feature specifications
- Document implementation requirements
- Deliver comprehensive product/project documentation

## Skill Contents

### 1. PRD Structure Templates
Multiple PRD formats for different contexts:
- Standard Product PRD (new product/feature)
- Technical PRD (engineering-focused)
- Marketing PRD (go-to-market focused)
- Strategy PRD (strategic initiatives)
- AI Visibility Platform PRD (domain-specific)

### 2. Quality Criteria
Checklist for excellent PRDs:
□ Clear problem statement
□ Well-defined success metrics
□ Comprehensive requirements
□ Technical specifications (where relevant)
□ User stories/use cases
□ Dependencies identified
□ Timeline and milestones
□ Resource requirements
□ Risk assessment
□ Open questions documented

### 3. Best Practices
- Write for your audience (technical vs business)
- Lead with the "why" (problem/opportunity)
- Be specific and measurable
- Include visuals where helpful
- Document assumptions explicitly
- Version control and change log
- Get stakeholder alignment

### 4. Anti-Patterns to Avoid
✗ Vague requirements ("should be fast")
✗ Solution-first thinking (skip the problem)
✗ Missing success criteria
✗ Ignoring constraints
✗ No prioritization
✗ Unclear ownership
✗ Technical jargon for non-technical audience

## How Agents Should Use This Skill

### Step 1: Agent Completes Domain Work
Agent does its core reasoning:
- Strategy Agent: Develops strategic recommendations
- Content Agent: Creates content specifications
- Audit Agent: Analyzes findings and opportunities

### Step 2: Structure as PRD
Agent uses this skill to structure output as PRD:
1. Choose appropriate PRD template
2. Map agent outputs to PRD sections
3. Apply PRD best practices
4. Validate against quality checklist

### Step 3: Format and Polish
- Use clear headings and structure
- Include table of contents for long PRDs
- Add visuals (diagrams, tables, charts)
- Ensure consistency in terminology
- Proofread for clarity and completeness

### Step 4: Quality Check
Before delivering PRD:
□ All sections complete
□ Success metrics defined
□ Requirements are testable
□ Assumptions documented
□ Dependencies clear
□ Timeline realistic
□ Stakeholders identified
□ Open questions listed

## PRD Templates

### TEMPLATE 1: Standard Product PRD

```markdown
# [Product/Feature Name] - Product Requirements Document

**Version**: [X.X]
**Date**: [YYYY-MM-DD]
**Owner**: [Name/Role]
**Status**: [Draft | Review | Approved | In Progress | Complete]

---

## Executive Summary
[2-3 paragraphs: What, why, impact]

## Problem Statement
### Current Situation
[What exists today]

### Pain Points
[Specific problems users/business face]

### Opportunity
[Why now, market opportunity, business impact]

## Goals & Success Metrics
### Primary Goal
[Main objective]

### Success Metrics
| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| [KPI 1] | [Current] | [Goal] | [When] |
| [KPI 2] | [Current] | [Goal] | [When] |

## User Personas & Use Cases
### Primary Users
[Who will use this]

### Key Use Cases
1. **Use Case 1**: [Description]
   - User Goal: [What they want]
   - User Journey: [Steps]
   - Success Outcome: [What success looks like]

## Requirements

### Functional Requirements
**Must Have (P0)**
1. [Requirement] - [Why important] - [Success criteria]
2. [Requirement] - [Why important] - [Success criteria]

**Should Have (P1)**
1. [Requirement] - [Why important] - [Success criteria]

**Nice to Have (P2)**
1. [Requirement] - [Why important] - [Success criteria]

### Non-Functional Requirements
- Performance: [Criteria]
- Scalability: [Criteria]
- Security: [Criteria]
- Usability: [Criteria]

### Technical Specifications
[Technical details, APIs, integrations, data models]

## User Experience
### User Flows
[Diagrams or descriptions of key user journeys]

### Wireframes/Mockups
[Visual designs or references]

## Implementation Plan
### Phase 1: [Name] ([Timeline])
- Deliverables: [List]
- Dependencies: [List]
- Resources: [Team/tools needed]

### Phase 2: [Name] ([Timeline])
[Repeat structure]

## Dependencies & Constraints
### Internal Dependencies
- [Team/system/resource] - [Why needed]

### External Dependencies
- [Third-party/partner] - [Why needed]

### Constraints
- Technical: [Limitations]
- Business: [Budget, timeline, policy]
- Resource: [Team capacity, expertise]

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | H/M/L | H/M/L | [Plan] |

## Open Questions
1. [Question] - [Owner] - [Deadline]
2. [Question] - [Owner] - [Deadline]

## Stakeholders & Approvals
| Stakeholder | Role | Approval Status | Date |
|-------------|------|-----------------|------|
| [Name] | [Role] | [Pending/Approved] | [Date] |

## Appendix
### Related Documents
- [Link to supporting docs]

### Research & Data
- [Link to user research, market analysis, etc.]

### Change Log
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Name] | Initial draft |
```

### TEMPLATE 2: AI Visibility Initiative PRD

```markdown
# [Initiative Name] - AI Visibility Requirements Document

**Version**: [X.X]
**Date**: [YYYY-MM-DD]
**Client**: [Client Name]
**Owner**: [Strategy/Content/Implementation Agent]
**Status**: [Draft | Review | Approved | In Progress]

---

## Executive Summary
[What we're doing, why, expected impact on AI visibility]

## Current State Analysis
### AI Visibility Baseline
- Citation Rate: [X%] across [Y] platforms
- Platform Coverage: [List]
- Query Coverage: [X%] of priority queries
- Competitive Position: [Ranking]

### Key Findings from Audit
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

## Opportunity & Objectives
### Strategic Opportunity
[Why this initiative matters for AI visibility]

### Primary Objectives
1. **Objective 1**: [What we want to achieve]
   - Success Metric: [How we measure]
   - Target: [Specific goal]
   - Timeline: [When]

## Target Queries & Platforms
### Priority Queries (Top 20)
| Query | Current Status | Target Status | Platform Priority |
|-------|----------------|---------------|-------------------|
| [Query 1] | Not cited | Top 3 citation | ChatGPT, Claude |
| [Query 2] | 5th position | 1st position | Perplexity |

### Platform Strategy
**ChatGPT**
- Current: [Status]
- Target: [Goal]
- Tactics: [List]

**Claude**
- Current: [Status]
- Target: [Goal]
- Tactics: [List]

[Repeat for each platform]

## Requirements

### Content Requirements
**New Content (Must Create)**
1. **[Content Title]**
   - Type: [Ultimate Guide | How-To | Research | Comparison]
   - Target Queries: [List]
   - Target Length: [Words]
   - Required Elements: [Data, examples, visuals, etc.]
   - Author Requirements: [Expertise needed]
   - Deadline: [Date]

**Content Optimization (Must Update)**
1. **[Existing Content URL]**
   - Current Score: [X/80]
   - Target Score: [Y/80]
   - Optimization Actions: [List]
   - Deadline: [Date]

### Technical Requirements
□ Schema markup implementation: [Types]
□ Site speed optimization: [Target]
□ Mobile optimization: [Criteria]
□ Internal linking structure: [Requirements]
□ Authority signals: [What to add]

### Authority Building Requirements
□ Author bios and credentials
□ Expert contributions: [Who]
□ Backlink acquisition: [Targets]
□ Industry recognition: [What to pursue]

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Objectives**: Quick wins and baseline establishment
**Deliverables**:
- [Deliverable 1] - [Owner] - [Due Date]
- [Deliverable 2] - [Owner] - [Due Date]

**Success Criteria**:
- [Measurable outcome 1]
- [Measurable outcome 2]

### Phase 2: Expansion (Weeks 5-12)
[Repeat structure]

### Phase 3: Optimization (Weeks 13-24)
[Repeat structure]

## Resource Requirements
### Team
- Content Strategist: [X hours/week]
- Content Writers: [Y hours/week]
- SEO/Technical: [Z hours/week]
- SME Review: [A hours/week]

### Budget
- Content Creation: $[X]
- Technical Implementation: $[Y]
- Tools & Technology: $[Z]
- Promotion: $[A]
**Total**: $[Sum]

### Tools Required
- [Tool 1] - [Purpose] - [Cost]
- [Tool 2] - [Purpose] - [Cost]

## Success Metrics & Measurement

### KPI Dashboard
| Metric Category | Metric | Baseline | Target | Measurement Frequency |
|-----------------|--------|----------|--------|----------------------|
| Visibility | Citation Rate | [X%] | [Y%] | Weekly |
| Visibility | Platform Coverage | [N] | [M] | Monthly |
| Traffic | AI Referrals | [X/mo] | [Y/mo] | Weekly |
| Conversion | Conversion Rate | [X%] | [Y%] | Monthly |
| Business | Revenue from AI | $[X] | $[Y] | Monthly |

### Measurement Approach
- **Tools**: [Analytics platforms, tracking setup]
- **Tracking**: [UTM parameters, referral tracking]
- **Reporting**: [Frequency, format, audience]
- **Review Cadence**: [When to assess and adjust]

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| Platform algorithm changes | High | High | Diversify across platforms, focus on fundamentals |
| Resource constraints | Medium | High | Prioritize ruthlessly, consider outsourcing |
| Competitive response | Medium | Medium | Build sustainable advantages, speed to market |
| Measurement challenges | High | Medium | Invest in tracking, use proxy metrics |

## Dependencies
### Internal Dependencies
- [Resource/team] needed for [what]
- Client approval for [what]

### External Dependencies
- [Third-party/vendor] for [what]
- [Industry event/timing] for [what]

## Assumptions
1. [Assumption 1]
2. [Assumption 2]
3. [Assumption 3]

## Open Questions
1. [Question] - [Owner] - [Decision Needed By]
2. [Question] - [Owner] - [Decision Needed By]

## Approval & Sign-off
| Stakeholder | Role | Required Approval | Status | Date |
|-------------|------|-------------------|--------|------|
| [Client Name] | Decision Maker | Yes | [Status] | [Date] |
| [Team Lead] | Implementation | Yes | [Status] | [Date] |

## Appendix
### Supporting Documents
- [Link to Audit Report]
- [Link to Competitive Analysis]
- [Link to Content Inventory]

### Research & Evidence
- [Link to platform testing data]
- [Link to competitor analysis]
- [Link to industry benchmarks]

---

**Version History**
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Agent] | Initial draft |
| 1.1 | [Date] | [Agent] | Incorporated feedback |
```

### TEMPLATE 3: Technical PRD (for platform/tool development)

```markdown
# [Technical Product/Feature] - Technical Requirements Document

**Version**: [X.X]
**Date**: [YYYY-MM-DD]
**Engineering Owner**: [Name]
**Product Owner**: [Name]
**Status**: [Draft | Review | Approved]

---

## Executive Summary
[Technical overview in 2-3 paragraphs]

## Problem Statement
### Technical Challenge
[What technical problem we're solving]

### Business Impact
[Why this matters to the business]

## Architecture Overview
### System Design
[High-level architecture diagram and description]

### Components
1. **[Component Name]**
   - Purpose: [What it does]
   - Technology: [Stack/framework]
   - Interfaces: [APIs, protocols]

### Data Flow
[Description or diagram of data flow]

## Technical Requirements

### Functional Requirements
**API Endpoints**
```
GET /api/v1/[resource]
POST /api/v1/[resource]
```

**Data Models**
```json
{
  "entity": {
    "field1": "type",
    "field2": "type"
  }
}
```

### Non-Functional Requirements
**Performance**
- Response time: [< X ms]
- Throughput: [Y requests/second]
- Concurrent users: [Z]

**Scalability**
- Horizontal: [Requirements]
- Vertical: [Requirements]
- Auto-scaling: [Triggers]

**Security**
- Authentication: [Method]
- Authorization: [RBAC/ABAC]
- Encryption: [At rest/in transit]
- Compliance: [Standards]

**Reliability**
- Uptime: [99.X%]
- Error rate: [< Y%]
- Recovery time: [< Z minutes]

## Implementation Details

### Technology Stack
- Backend: [Language/framework]
- Frontend: [Framework]
- Database: [Type/platform]
- Infrastructure: [Cloud provider]
- DevOps: [CI/CD tools]

### Development Phases
**Phase 1: Core Infrastructure** ([Timeline])
- Deliverables: [List]
- Technical milestones: [List]

**Phase 2: Feature Development** ([Timeline])
- Deliverables: [List]
- Technical milestones: [List]

### Testing Strategy
- Unit tests: [Coverage target]
- Integration tests: [Scope]
- E2E tests: [Critical paths]
- Performance tests: [Load scenarios]

## Dependencies
### Technical Dependencies
- [Library/service] - [Version] - [Purpose]
- [API/integration] - [Purpose]

### Infrastructure Dependencies
- [Resource] - [Specification] - [Provider]

## Risks & Technical Debt
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Technical risk] | H/M/L | [Strategy] |

### Known Technical Debt
- [Item] - [Impact] - [Plan to address]

## Success Criteria
### Technical Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]

### Acceptance Criteria
□ [Criterion 1]
□ [Criterion 2]

## Open Technical Questions
1. [Question] - [Owner] - [Decision date]

## Appendix
### API Documentation
[Link or embed]

### Database Schema
[Link or embed]

### Architecture Diagrams
[Links]
```

## PRD Quality Checklist

Use this before delivering any PRD:

```markdown
# PRD Quality Assurance Checklist

## Content Completeness
□ Executive summary provides clear overview
□ Problem statement is specific and evidence-based
□ Goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
□ Success metrics defined with baselines and targets
□ Requirements are comprehensive and prioritized
□ Technical specifications included (where relevant)
□ User stories/use cases documented
□ Implementation plan with phases and timelines
□ Dependencies identified (internal and external)
□ Risks assessed with mitigation strategies
□ Resource requirements specified (team, budget, tools)
□ Open questions documented with owners

## Clarity & Quality
□ Written for target audience (appropriate technical level)
□ Problem stated before solution
□ Requirements are specific and testable
□ Assumptions documented explicitly
□ Terminology consistent throughout
□ Acronyms defined on first use
□ Visuals included where helpful (diagrams, tables, charts)
□ Cross-references and links work correctly

## Structure & Format
□ Logical section flow (problem → solution → implementation)
□ Table of contents (for documents > 3 pages)
□ Consistent heading hierarchy (H1, H2, H3)
□ Proper use of lists, tables, code blocks
□ Version number and date prominent
□ Change log maintained
□ Proper formatting (no formatting errors)

## Stakeholder Alignment
□ Owner/DRI (Directly Responsible Individual) identified
□ All stakeholders listed with roles
□ Approval process defined
□ Reviewers have provided feedback
□ Final approvals received (if required)

## Actionability
□ Clear next steps after PRD approval
□ Owners assigned to key deliverables
□ Deadlines specified for critical items
□ Success criteria for each phase defined
□ Measurement plan established

## Technical Accuracy
□ Technical requirements are feasible
□ Architecture approach is sound
□ Performance targets are realistic
□ Security considerations addressed
□ Scalability planned for
□ Technical debt acknowledged

## Business Alignment
□ Aligns with business objectives
□ ROI or business value articulated
□ Resource ask is justified
□ Timeline is realistic given constraints
□ Trade-offs acknowledged

OVERALL ASSESSMENT:
□ PRD is complete and ready for review
□ PRD is approved and ready for implementation
□ PRD needs revisions (specify what)

REVIEWER: _______________
DATE: _______________
SIGNATURE: _______________
```

---

## Example Use Case: Strategy Agent Using PRD Skill

### Scenario
Strategy Agent has completed AI visibility strategy for a B2B SaaS client and needs to 
deliver recommendations as a formal PRD.

### Implementation

```python
class StrategyAgent:
    def __init__(self, orchestrator):
        self.orchestrator = orchestrator
    
    def develop_strategy(self, client_context, audit_findings):
        """Core strategy development (agent's domain expertise)"""
        
        # Agent does its reasoning
        positioning = self.determine_positioning(client_context, audit_findings)
        opportunities = self.prioritize_opportunities(audit_findings)
        roadmap = self.create_roadmap(opportunities, client_context)
        resource_plan = self.plan_resources(roadmap, client_context["budget"])
        
        strategy = {
            "positioning": positioning,
            "opportunities": opportunities,
            "roadmap": roadmap,
            "resources": resource_plan
        }
        
        return strategy
    
    def deliver_as_prd(self, strategy, client_context):
        """Format strategy as PRD using PRD skill"""
        
        # Request orchestrator to load PRD skill
        prd_skill = self.orchestrator.load_skill("prd-writing")
        
        # Choose appropriate template
        template = prd_skill["templates"]["ai-visibility-initiative"]
        
        # Map strategy outputs to PRD sections
        prd_content = {
            "executive_summary": self.generate_exec_summary(strategy),
            "current_state": strategy["baseline_from_audit"],
            "opportunity": strategy["positioning"]["rationale"],
            "objectives": strategy["goals"],
            "requirements": {
                "content": strategy["content_plan"],
                "technical": strategy["technical_requirements"],
                "authority": strategy["authority_building"]
            },
            "roadmap": strategy["roadmap"],
            "resources": strategy["resources"],
            "metrics": strategy["kpis"],
            "risks": strategy["risk_assessment"]
        }
        
        # Apply PRD best practices from skill
        prd = prd_skill["formatter"].format(
            template=template,
            content=prd_content,
            client_context=client_context
        )
        
        # Quality check using PRD skill checklist
        quality_score = prd_skill["quality_checker"].validate(prd)
        
        if quality_score < 0.9:
            # Improve PRD based on checklist gaps
            prd = self.improve_prd(prd, quality_score["gaps"])
        
        # Unload skill to free context
        self.orchestrator.unload_skill("prd-writing")
        
        return prd
```

### Agent Prompt Integration

```markdown
## When to Produce a PRD

You should deliver your strategic recommendations as a formal PRD when:
- Client has explicitly requested a PRD format
- Recommendations will be implemented by another team
- Formal approval process is required
- Documentation needs to be comprehensive and standalone
- Multiple stakeholders need to align on approach

## How to Use PRD Writing Skill

1. **Complete Your Domain Work First**
   - Develop all strategic recommendations
   - Analyze trade-offs and make decisions
   - Define success metrics and requirements
   - Create implementation roadmap

2. **Request PRD Skill from Orchestrator**
   ```
   LOAD_SKILL("prd-writing")
   ```

3. **Select Appropriate Template**
   Choose based on context:
   - AI Visibility Initiative PRD (most common for your outputs)
   - Standard Product PRD (for new platform features)
   - Technical PRD (if highly technical implementation)

4. **Map Your Outputs to PRD Structure**
   - Your positioning → PRD Opportunity section
   - Your priorities → PRD Requirements section
   - Your roadmap → PRD Implementation Plan
   - Your metrics → PRD Success Metrics

5. **Apply PRD Best Practices**
   - Lead with executive summary
   - Be specific and measurable
   - Document assumptions
   - Include visuals where helpful
   - Validate against quality checklist

6. **Quality Check Before Delivery**
   Use PRD quality checklist:
   □ All sections complete
   □ Requirements specific and testable
   □ Success metrics defined
   □ Timeline realistic
   □ Resources specified
   □ Risks assessed

7. **Format and Polish**
   - Clear headings and structure
   - Consistent terminology
   - Professional presentation
   - Proofread for clarity

8. **Unload Skill**
   ```
   UNLOAD_SKILL("prd-writing")
   ```

IMPORTANT: The PRD skill helps you STRUCTURE and FORMAT your recommendations.
It doesn't do the strategic thinking - that's your job as Strategy Agent.
```

---

## Alternative: If You Need a PRD Sub-Agent

If PRD writing involves MORE than just formatting - for example, if it requires:
- Gathering requirements from multiple stakeholders
- Conducting user research
- Making product decisions
- Prioritizing features across multiple products
- Synthesizing inputs from many sources

Then it might warrant a dedicated sub-agent. Here's when:

### When PRD Becomes a Sub-Agent

```
Conditions that warrant PRD Sub-Agent:

1. REQUIREMENT GATHERING is core workflow
   - Not just formatting existing decisions
   - Actually discovering and defining requirements
   - Conducting stakeholder interviews
   - Running user research
   
2. PRODUCT DECISION-MAKING is involved
   - Evaluating multiple product options
   - Making trade-offs between features
   - Prioritizing product roadmap
   - Assessing market fit

3. CROSS-FUNCTIONAL SYNTHESIS is primary job
   - Gathering inputs from engineering, design, marketing
   - Resolving conflicts between stakeholders
   - Creating alignment across teams
   - Translating business needs to technical requirements

4. ONGOING PRODUCT OWNERSHIP
   - Maintaining product backlog
   - Updating PRDs based on learnings
   - Tracking implementation progress
   - Making ongoing product decisions

If your PRD writing involves these, consider:
→ Product Manager Agent (broader than just PRDs)
→ Requirements Engineer Agent (specialized in requirements)
```

### Hybrid Approach: Product Manager Agent + PRD Skill

If you need product management capabilities:

```
┌─────────────────────────────────────────────┐
│  PRODUCT MANAGER AGENT (Sub-Agent)          │
│                                              │
│  Responsibilities:                           │
│  • Gather requirements from stakeholders    │
│  • Conduct user research and interviews     │
│  • Define product strategy and roadmap      │
│  • Prioritize features and initiatives      │
│  • Make product trade-off decisions         │
│  • Synthesize cross-functional inputs       │
│                                              │
│  Uses PRD Writing Skill to:                 │
│  • Format outputs as professional PRDs      │
│  • Apply PRD best practices                 │
│  • Ensure PRD completeness                  │
│  • Quality check deliverables               │
└─────────────────────────────────────────────┘
```

---

## Recommendation Summary

### For AI Visibility Platform: PRD Writing = SKILL ✅

**Reasoning**:
1. Your agents already do the domain reasoning (strategy, content, audit)
2. PRD is an output format to structure their recommendations
3. Multiple agents may need to produce PRDs
4. Keeps architecture focused on AI visibility domain expertise
5. More maintainable and flexible

### Implementation Approach

```
PHASE 1: Create PRD Writing Skill (Week 1)
□ Develop comprehensive SKILL.md guide
□ Create 3-4 PRD templates (standard, technical, AI visibility)
□ Document quality checklist
□ Provide examples (good and bad)
□ Add to skills library

PHASE 2: Integrate with Existing Agents (Week 2)
□ Update agent system prompts with PRD guidance
□ Add PRD formatting instructions
□ Test with Strategy Agent first
□ Expand to Content and Implementation agents
□ Validate output quality

PHASE 3: Refine Based on Usage (Week 3-4)
□ Collect feedback on PRD quality
□ Identify common issues or gaps
□ Update templates and guidelines
□ Add more examples
□ Document lessons learned
```

### File Structure

```
/mnt/skills/public/prd-writing/
├── SKILL.md (comprehensive guide - use template above)
├── templates/
│   ├── standard-prd.md
│   ├── technical-prd.md
│   ├── ai-visibility-initiative-prd.md
│   └── feature-prd.md
├── examples/
│   ├── good-example-b2b-saas-strategy-prd.md
│   ├── good-example-content-plan-prd.md
│   └── bad-example-common-mistakes.md
├── checklists/
│   └── prd-quality-checklist.md
└── README.md (quick start guide)
```

---

## Decision Made: PRD Writing is a SKILL

**Rationale**: PRD writing is a formatting/structuring capability that multiple agents need, not a domain-specific reasoning process. It enhances agent outputs without changing agent logic.

**Next Steps**:
1. Create comprehensive PRD Writing skill using templates above
2. Add to skills library at /mnt/skills/public/prd-writing/
3. Update agent system prompts with PRD usage guidance
4. Test with Strategy Agent first
5. Expand to other agents as needed

**Future Consideration**: If product management becomes a core capability (gathering requirements, making product decisions, managing backlogs), then consider adding a Product Manager Agent that USES the PRD Writing skill.
