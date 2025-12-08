# PRD Writing Skill
## Expert Product Requirements Document Creation

### Version 1.0 | October 2025

---

## Overview

This skill provides expert capability for creating professional Product Requirements Documents (PRDs) across various contexts. It's designed to be loaded by any agent that needs to structure their domain expertise into a formal PRD format.

### Purpose

Transform domain-specific analysis, strategies, and recommendations into well-structured, comprehensive PRDs that:
- Clearly articulate problems and opportunities
- Define specific, measurable requirements
- Establish success criteria and metrics
- Provide actionable implementation guidance
- Facilitate stakeholder alignment and approval

### When to Use This Skill

Load this skill when you need to:
- ✅ Deliver strategic recommendations as a formal PRD
- ✅ Document product/feature requirements comprehensively
- ✅ Create implementation specifications
- ✅ Structure complex initiatives for stakeholder review
- ✅ Ensure completeness and quality of requirements documentation

Do NOT use this skill for:
- ❌ Quick updates or informal communications
- ❌ Exploratory analysis (use after analysis is complete)
- ❌ Meeting notes or status updates
- ❌ Simple checklists or action items

---

## Skill Contents

### 1. PRD Templates (`/templates/`)
- **standard-prd.md** - General purpose product/feature PRD
- **ai-visibility-initiative-prd.md** - AI visibility strategy and implementation
- **technical-prd.md** - Engineering-focused technical specifications
- **feature-prd.md** - Individual feature requirements

### 2. Quality Checklist (`/checklists/`)
- **prd-quality-checklist.md** - Comprehensive quality assurance criteria

### 3. Examples (`/examples/`)
- **good-prd-example.md** - Well-structured PRD demonstrating best practices
- **common-mistakes.md** - Anti-patterns and how to avoid them

### 4. Usage Guidelines (this document)
- How agents should use this skill
- Integration patterns
- Best practices

---

## Core PRD Principles

### 1. Lead with the "Why"
Always start with the problem or opportunity, not the solution. Stakeholders need to understand:
- What problem are we solving?
- Why does it matter (business impact)?
- Why now (timing/urgency)?

**Good**: "Users abandon checkout 40% of the time due to complex payment flow, costing $2M annually. Competitors have streamlined flows showing 60% completion rates."

**Bad**: "We need to redesign the checkout page."

### 2. Be Specific and Measurable
Vague requirements lead to misalignment and failed implementations.

**Good**: "System must process 1000 transactions per second with <200ms latency at p95."

**Bad**: "System should be fast and scalable."

### 3. Separate Requirements by Priority
Use clear prioritization framework:
- **Must Have (P0)**: Critical for launch, non-negotiable
- **Should Have (P1)**: Important but can be delayed if needed
- **Nice to Have (P2)**: Valuable but not essential

### 4. Document Assumptions and Constraints
Make implicit knowledge explicit:
- What are we assuming to be true?
- What constraints must we work within?
- What's out of scope for this initiative?

### 5. Define Success Upfront
How will you know if this succeeded?
- Measurable success metrics
- Target values and timelines
- How and when you'll measure

### 6. Address Risks Proactively
Don't hide risks - surface and mitigate them:
- What could go wrong?
- How likely and how impactful?
- What's the mitigation strategy?

---

## How Agents Should Use This Skill

### Step-by-Step Process

**STEP 1: Complete Your Domain Work**
Do your expert analysis FIRST, before touching this skill:
- Strategy Agent: Complete positioning, prioritization, roadmap
- Content Agent: Finish content audit, gap analysis, specifications
- Audit Agent: Complete testing, analysis, competitive benchmarking

The PRD skill structures your conclusions, it doesn't do the thinking.

**STEP 2: Load the Skill**
```python
# Agent requests skill from orchestrator
prd_skill = orchestrator.load_skill("prd-writing")
```

**STEP 3: Select Appropriate Template**
Choose based on your output type and audience:

```python
if output_type == "ai_visibility_strategy":
    template = prd_skill.templates["ai-visibility-initiative-prd"]
elif output_type == "technical_implementation":
    template = prd_skill.templates["technical-prd"]
elif output_type == "feature_specification":
    template = prd_skill.templates["feature-prd"]
else:
    template = prd_skill.templates["standard-prd"]
```

**STEP 4: Map Your Outputs to PRD Sections**

Common Mappings:

```
YOUR OUTPUT                  →  PRD SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Analysis findings            →  Current State / Problem Statement
Strategic positioning        →  Opportunity / Objectives
Prioritized opportunities    →  Requirements (by priority)
Implementation roadmap       →  Implementation Plan
Resource estimates           →  Resource Requirements
KPIs and targets            →  Success Metrics
Risk assessment             →  Risks & Mitigations
Open issues                 →  Open Questions
```

**STEP 5: Apply PRD Best Practices**

Use the guidelines in this document:
- Lead with executive summary (2-3 paragraphs)
- Problem before solution
- Specific, measurable requirements
- Clear success criteria
- Visual aids where helpful (tables, diagrams)
- Consistent terminology
- Professional tone

**STEP 6: Quality Check**

Before delivering, validate against checklist:
```python
quality_score = prd_skill.checklist.validate(prd)

if quality_score.overall < 0.9:
    # Address gaps identified
    gaps = quality_score.gaps
    prd = improve_prd(prd, gaps)
```

Key checks:
□ All sections complete
□ Requirements specific and testable
□ Success metrics defined with targets
□ Timeline and resources realistic
□ Risks identified with mitigations
□ Open questions documented
□ Assumptions stated explicitly

**STEP 7: Format and Polish**

- Use clear heading hierarchy (H1, H2, H3)
- Add table of contents for long PRDs (>3 pages)
- Use tables for comparisons and metrics
- Include visuals (diagrams, charts) where helpful
- Proofread for clarity and consistency
- Check all cross-references and links

**STEP 8: Unload Skill**
```python
# Free context space
orchestrator.unload_skill("prd-writing")
```

---

## PRD Structure Guide

### Essential Sections (Every PRD Must Have)

**1. Document Header**
```markdown
# [Product/Feature/Initiative Name] - PRD

**Version**: X.X
**Date**: YYYY-MM-DD
**Owner**: [Name/Role]
**Status**: [Draft | Review | Approved | In Progress]
```

**2. Executive Summary**
2-3 paragraphs covering:
- What are we doing?
- Why are we doing it (problem/opportunity)?
- What's the expected impact?

**3. Problem Statement**
Clear articulation of:
- Current situation (what exists today)
- Specific pain points or gaps
- Evidence and data supporting the problem
- Business impact of NOT solving it

**4. Goals & Success Metrics**
- Primary goal(s)
- Success metrics with baselines and targets
- Timeline for achieving goals
- How success will be measured

**5. Requirements**
Prioritized list of what must be built/done:
- Must Have (P0)
- Should Have (P1)
- Nice to Have (P2)

Each requirement should specify:
- What it is
- Why it matters
- How to verify it's complete

**6. Implementation Plan**
- Phases or milestones
- Timeline
- Dependencies
- Resource requirements

**7. Risks & Mitigations**
- Key risks (likelihood × impact)
- Mitigation strategies
- Contingency plans

**8. Open Questions**
- Unresolved decisions
- Who needs to answer
- Decision deadline

### Optional Sections (Include When Relevant)

**User Personas & Use Cases**
When: User-facing features or products
Include: Who uses it, how they use it, what they achieve

**Technical Specifications**
When: Engineering implementation
Include: Architecture, APIs, data models, performance requirements

**Competitive Analysis**
When: Market positioning is critical
Include: How competitors solve this, differentiation strategy

**Go-to-Market Plan**
When: Launch strategy matters
Include: Marketing, sales enablement, rollout plan

**Financial Projections**
When: Business case needs quantification
Include: Costs, revenue impact, ROI calculations

---

## PRD Best Practices

### Writing Style

**✓ DO:**
- Write in active voice: "The system will validate..." not "Validation will be performed..."
- Use present tense for current state, future tense for requirements
- Be concise but complete
- Use bullet points for lists (easier to scan)
- Use tables for comparisons and metrics
- Define acronyms on first use
- Keep paragraphs short (3-5 sentences max)

**✗ DON'T:**
- Use vague qualifiers: "should be fast", "must be intuitive"
- Bury important information deep in document
- Mix problem and solution in same section
- Use jargon without explanation
- Make assumptions without documenting them
- Skip prioritization ("everything is P0")

### Requirement Writing

**Anatomy of a Good Requirement:**
```
[Component/Feature] must/should/will [specific action/capability]
[optional: when/where/under what conditions]
to enable [user/business outcome].

Success Criteria: [How to verify it's done correctly]

Example:
"The payment processor must complete transactions in less than 2 seconds 
(p95) under peak load (1000 TPS) to maintain conversion rates above 85%.

Success Criteria: Load test shows p95 latency <2s at 1000 TPS with 85%+ 
completion rate."
```

**Common Requirement Mistakes:**

❌ **Too Vague**: "System should be fast"
✅ **Specific**: "API response time <200ms at p95 for 1000 concurrent users"

❌ **Solution-focused**: "Use Redis for caching"
✅ **Outcome-focused**: "Cache frequently accessed data to achieve <50ms read latency"

❌ **Untestable**: "UI should be intuitive"
✅ **Testable**: "New users complete first task without help in <3 minutes (80% success rate in usability testing)"

### Visual Aids

**Use Tables For:**
- Metrics with baselines and targets
- Feature comparisons
- Requirement prioritization
- Risk assessment
- Resource allocation

Example:
```markdown
| Metric | Baseline | Target | Timeline | Owner |
|--------|----------|--------|----------|-------|
| Citation Rate | 35% | 65% | 6 months | Content Team |
| Platform Coverage | 2 | 5 | 3 months | Strategy Team |
```

**Use Diagrams For:**
- User flows
- System architecture
- Process workflows
- Data flows
- Decision trees

**Use Charts For:**
- Trends over time
- Comparisons
- Distributions
- Correlations

---

## Quality Assurance Process

### Pre-Delivery Checklist

Before sharing any PRD, verify:

**Content Completeness (15 checks)**
□ Executive summary clearly states what, why, impact
□ Problem statement specific with evidence
□ Goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
□ Success metrics defined with baselines and targets
□ Requirements comprehensive and prioritized (P0/P1/P2)
□ Each requirement has success criteria
□ Technical specifications included (if applicable)
□ Implementation plan with phases and timeline
□ Dependencies identified (internal and external)
□ Risks assessed with likelihood and impact
□ Mitigation strategies for high-priority risks
□ Resource requirements specified (team, budget, tools)
□ Open questions documented with owners and deadlines
□ Stakeholders listed with roles
□ Approval process defined

**Clarity & Quality (10 checks)**
□ Written for target audience (appropriate technical level)
□ Problem stated before solution
□ Requirements are specific and testable (no vague language)
□ Assumptions documented explicitly
□ Terminology consistent throughout document
□ Acronyms defined on first use
□ Visuals included where helpful (not decorative)
□ Cross-references and links work correctly
□ No spelling or grammar errors
□ Professional tone maintained

**Structure & Format (8 checks)**
□ Logical section flow (problem → solution → implementation)
□ Table of contents included (for docs >3 pages)
□ Consistent heading hierarchy (H1, H2, H3)
□ Proper use of lists, tables, code blocks
□ Version number and date prominent
□ Change log maintained
□ Proper markdown formatting (no formatting errors)
□ Document is scannable (can understand in 2-minute skim)

**Business Alignment (7 checks)**
□ Aligns with stated business objectives
□ ROI or business value clearly articulated
□ Resource ask is justified with expected return
□ Timeline is realistic given constraints
□ Trade-offs acknowledged and explained
□ Scope is clear (what's in and what's out)
□ Success criteria align with business goals

### Quality Scoring

Calculate overall quality score:
```
Total Checks: 40
Checks Passed: X
Quality Score: X / 40 = Y%

90-100%: Excellent - Ready to ship
80-89%: Good - Minor improvements needed
70-79%: Acceptable - Some gaps to address
<70%: Needs Work - Significant revisions required
```

Focus improvement on highest-impact gaps first:
1. Missing success metrics (can't measure success)
2. Vague requirements (can't build/test)
3. Unclear problem statement (why are we doing this?)
4. Missing risk assessment (blind spots)
5. Unrealistic timeline/resources (will fail)

---

## Common Pitfalls and How to Avoid Them

### Pitfall 1: Solution Masquerading as Problem

**Symptom**: PRD jumps straight to "we need to build X"

**Why it's bad**: Stakeholders can't evaluate if X is the right solution

**Fix**: 
```markdown
❌ BAD:
## Problem
We need to add AI chatbot to our website.

✅ GOOD:
## Problem
Users can't find answers to common questions, leading to:
- 500+ support tickets/month on FAQs (35% of total volume)
- 28% of users abandon site after failed search
- $50K/month in support costs for easily-answered questions

Data shows 80% of support questions are from 20 FAQ topics.
```

### Pitfall 2: Everything is Priority 0

**Symptom**: All requirements marked "Must Have" or "Critical"

**Why it's bad**: Impossible to make trade-offs, team gets overwhelmed

**Fix**: Use forced ranking
- P0 (Must Have): <30% of requirements - Critical for launch
- P1 (Should Have): 40-50% - Important but can wait
- P2 (Nice to Have): 20-30% - Valuable but not essential

Ask: "If we could only ship ONE more requirement, which would it be?"

### Pitfall 3: Unmeasurable Success

**Symptom**: Goals like "improve user experience" or "increase engagement"

**Why it's bad**: Can't determine if you succeeded, can't optimize

**Fix**: Make every goal measurable
```markdown
❌ BAD:
Goal: Improve user experience

✅ GOOD:
Goal: Increase task completion rate from 65% to 85% within 3 months
Measured by: Weekly usability testing (n=50 users per week)
Target: 85% of users complete primary task without assistance
```

### Pitfall 4: Hidden Assumptions

**Symptom**: "Obviously we need X" or "Everyone knows Y"

**Why it's bad**: Different stakeholders have different "obvious" assumptions

**Fix**: Document assumptions explicitly
```markdown
## Assumptions
1. Users have reliable internet (>1 Mbps) - 95% of user base
2. Users access via desktop browser - 70% of sessions
3. Integration API will be available by Q2 - confirmed with partner
4. Budget of $200K approved - pending final CFO sign-off
```

### Pitfall 5: Ignoring the "What Could Go Wrong"

**Symptom**: No risk section, or just "no major risks identified"

**Why it's bad**: Surprises tank projects, stakeholders lose trust

**Fix**: Actively hunt for risks
```markdown
## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API rate limits during peak | High | High | Implement request queuing + caching + negotiate higher limits |
| Key engineer leaves project | Medium | High | Knowledge sharing, documentation, identify backup resource |
| Competitor launches similar feature first | Medium | Medium | Fast-track MVP, focus on unique differentiators |
```

### Pitfall 6: Stakeholder Surprise

**Symptom**: PRD rejected or heavily revised after "final" review

**Why it's bad**: Wasted effort, delays, team frustration

**Fix**: Socialize early and often
- Share problem statement first (before solutions)
- Review requirements with key stakeholders before writing full PRD
- Get technical feasibility check from engineering
- Align on success metrics with business stakeholders
- Share draft for feedback before calling it "done"

---

## Template Selection Guide

### Decision Tree

```
START: What are you documenting?

├─ New product or major feature
│  ├─ User-facing functionality → standard-prd.md
│  └─ Technical/infrastructure → technical-prd.md
│
├─ AI Visibility initiative
│  ├─ Strategy or content plan → ai-visibility-initiative-prd.md
│  └─ Technical implementation → technical-prd.md
│
├─ Single feature or enhancement
│  ├─ Standalone feature → feature-prd.md
│  └─ Part of larger product → standard-prd.md
│
└─ Process or operational improvement
   └─ Use standard-prd.md (adapt sections as needed)
```

### Template Comparison

| Template | Best For | Key Sections | Typical Length |
|----------|----------|--------------|----------------|
| **standard-prd** | General products/features | Problem, Solution, UX, Implementation | 5-15 pages |
| **technical-prd** | Engineering projects | Architecture, APIs, Data Models, Performance | 10-25 pages |
| **ai-visibility-initiative-prd** | AI visibility strategies | Current State, Queries, Content, Metrics | 8-20 pages |
| **feature-prd** | Individual features | User Stories, Requirements, Acceptance Criteria | 3-8 pages |

---

## Integration with Agent System Prompts

### Example: Strategy Agent Integration

Add to Strategy Agent system prompt:

```markdown
## Delivering Output as PRD

When client requires formal PRD format:

1. **Complete Strategy Development First**
   - Develop positioning, prioritize opportunities, create roadmap
   - Make all strategic decisions
   - Define success metrics
   - Do NOT load PRD skill until strategy is complete

2. **Load PRD Writing Skill**
   Request from orchestrator:
   ```
   LOAD_SKILL("prd-writing")
   ```

3. **Select Template**
   For AI visibility strategies, use:
   ```
   ai-visibility-initiative-prd.md
   ```

4. **Map Your Outputs**
   - Your audit findings → Current State Analysis
   - Your positioning → Opportunity & Objectives
   - Your priorities → Requirements (Content, Technical, Authority)
   - Your roadmap → Implementation Roadmap
   - Your resource plan → Resource Requirements
   - Your KPIs → Success Metrics & Measurement
   - Your risks → Risks & Mitigations

5. **Apply PRD Best Practices**
   - Start with executive summary (your strategy in 2-3 paragraphs)
   - Problem before solution
   - Specific, measurable requirements
   - Use tables for metrics and comparisons
   - Include visuals where helpful

6. **Quality Check**
   Before delivery, verify:
   □ All sections complete
   □ Requirements specific and testable
   □ Success metrics with baselines and targets
   □ Timeline realistic
   □ Resources specified
   □ Risks assessed with mitigations
   
   Use checklist at: `/checklists/prd-quality-checklist.md`

7. **Format and Polish**
   - Professional presentation
   - Consistent terminology
   - Clear structure
   - Proofread

8. **Unload Skill**
   ```
   UNLOAD_SKILL("prd-writing")
   ```

REMEMBER: The PRD skill helps you STRUCTURE output, not do the strategy work.
Your strategic thinking comes first, PRD formatting comes last.
```

---

## Advanced Usage Patterns

### Pattern 1: Iterative PRD Development

For complex initiatives, develop PRD in stages:

**Stage 1: Problem Statement PRD (Week 1)**
- Just the problem/opportunity section
- Share with stakeholders for alignment
- Validate you're solving the right problem

**Stage 2: High-Level Requirements (Week 2)**
- Add goals and must-have requirements only
- Technical feasibility review
- Resource estimate (rough)

**Stage 3: Detailed PRD (Week 3-4)**
- Complete all sections
- Detailed implementation plan
- Full resource and risk assessment

**Benefits:**
- Early stakeholder alignment
- Reduces rework
- Identifies blockers sooner
- Builds momentum

### Pattern 2: Multi-Agent PRD Collaboration

When multiple agents contribute to one PRD:

```
1. Strategy Agent: Creates initial PRD shell
   - Problem statement
   - Goals and success metrics
   - High-level approach

2. Content Agent: Adds content sections
   - Content requirements
   - Content specifications
   - Content metrics

3. Technical Agent: Adds technical sections
   - Technical requirements
   - Architecture considerations
   - Technical risks

4. Measurement Agent: Adds measurement sections
   - Detailed KPI definitions
   - Tracking methodology
   - Reporting approach

5. Orchestrator: Synthesizes into coherent PRD
   - Ensures consistency
   - Resolves conflicts
   - Quality check
```

### Pattern 3: PRD Versioning

Maintain clear version history:

```markdown
## Version History

| Version | Date | Author | Changes | Approvers |
|---------|------|--------|---------|-----------|
| 0.1 | 2025-10-20 | Strategy Agent | Initial draft | - |
| 0.2 | 2025-10-22 | Strategy Agent | Added technical specs per eng feedback | - |
| 1.0 | 2025-10-25 | Strategy Agent | Final for approval | Pending |
| 1.1 | 2025-11-01 | Strategy Agent | Updated timeline per resource constraints | Approved |
```

**Versioning Guidelines:**
- **0.x**: Draft versions, work in progress
- **1.0**: First complete version for approval
- **1.x**: Minor revisions (scope unchanged)
- **2.0**: Major revisions (scope changed)

---

## Metrics & Continuous Improvement

### PRD Quality Metrics

Track these to improve PRD skill over time:

**Completion Metrics**
- % of sections complete on first draft
- Average revisions needed before approval
- Time from draft to approval

**Quality Metrics**
- Quality checklist score (target: >90%)
- Stakeholder satisfaction (survey after approval)
- Number of "surprise" issues during implementation

**Business Metrics**
- % of initiatives that meet success criteria
- % of initiatives completed on time
- % of initiatives completed within budget

**Feedback Loop**
After each PRD:
1. What sections were unclear?
2. What requirements needed clarification?
3. What was missing that should be standard?
4. What should be added to templates/checklists?

Update this skill based on lessons learned.

---

## Skill Maintenance

### When to Update This Skill

**Update immediately if:**
- Critical quality issue found (PRD led to misalignment)
- Template has major gap identified
- New PRD type needed frequently

**Update quarterly:**
- Incorporate feedback from recent PRDs
- Add new examples (good and bad)
- Refine quality checklist
- Update best practices based on learnings

**Update annually:**
- Major template revisions
- Add new templates for new use cases
- Comprehensive review of all content
- Benchmark against industry best practices

### Version Control

This skill should be version controlled:
```
/mnt/skills/public/prd-writing/
├── SKILL.md (this file - always latest)
├── CHANGELOG.md (version history)
└── versions/
    ├── v1.0/
    ├── v1.1/
    └── v2.0/ (current)
```

---

## Quick Reference

### One-Page PRD Checklist

Use this for quick validation:

```markdown
PRD QUICK CHECK (30 seconds)
□ Title + version + date + owner + status
□ Executive summary (what, why, impact)
□ Problem statement with evidence
□ Goals with success metrics (baseline → target)
□ Requirements prioritized (P0/P1/P2)
□ Implementation plan with timeline
□ Resources specified (team, budget, tools)
□ Risks identified with mitigations
□ Open questions with owners
□ Stakeholders listed

QUALITY CHECK (2 minutes)
□ Problem stated before solution
□ Requirements are specific (not vague)
□ Success metrics are measurable
□ Timeline seems realistic
□ Trade-offs acknowledged
□ No obvious gaps

If all checkboxes pass → PRD is probably good
If >3 boxes unchecked → PRD needs work
```

### Common Commands

```python
# Load skill
skill = orchestrator.load_skill("prd-writing")

# Get template
template = skill.templates["ai-visibility-initiative-prd"]

# Validate quality
score = skill.checklist.validate(prd)

# Get examples
good_example = skill.examples["good-prd-example"]
mistakes = skill.examples["common-mistakes"]

# Unload skill
orchestrator.unload_skill("prd-writing")
```

---

## Support & Feedback

### Getting Help

If you're unsure about:
- **Which template to use**: See Template Selection Guide above
- **How to structure a section**: Check examples in `/examples/`
- **Quality concerns**: Use checklist in `/checklists/`
- **Integration with agent**: See agent integration examples above

### Providing Feedback

Help improve this skill by documenting:
- **What worked well**: Sections that were clear and helpful
- **What was confusing**: Areas needing clarification
- **What's missing**: Gaps in templates or guidelines
- **Specific examples**: Real PRDs that illustrate good/bad patterns

---

## Summary

### Key Takeaways

1. **PRD skill is for formatting, not thinking** - Complete your domain analysis first
2. **Choose right template** - Different contexts need different structures
3. **Lead with why** - Problem before solution, always
4. **Be specific** - Vague requirements fail, measurable requirements succeed
5. **Use the checklist** - Quality validation catches issues before stakeholders do
6. **Iterate based on feedback** - Improve the skill continuously

### Success Criteria

This skill is working well when:
- ✅ Agents produce consistent, high-quality PRDs
- ✅ Stakeholders approve PRDs with minimal revisions
- ✅ Implementations match PRD specifications
- ✅ Projects meet success criteria defined in PRDs
- ✅ PRD creation time is predictable and efficient

---

**Version**: 1.0
**Last Updated**: October 2025
**Maintained By**: Platform Architecture Team
**Next Review**: January 2026
