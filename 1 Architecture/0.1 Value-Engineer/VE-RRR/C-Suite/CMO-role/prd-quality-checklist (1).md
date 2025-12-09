# PRD Quality Assurance Checklist

Use this checklist to validate any PRD before delivery. Target score: **90%+ (36/40 checks)**

---

## Section 1: Content Completeness (15 checks)

Essential sections that every PRD must have:

### Document Header & Metadata
- [ ] **Title** clearly states product/feature/initiative name
- [ ] **Version number** included (0.x for draft, 1.0+ for approved)
- [ ] **Date** current and accurate
- [ ] **Owner/DRI** (Directly Responsible Individual) clearly identified
- [ ] **Status** indicated (Draft | Review | Approved | In Progress | Complete)

### Core Content Sections
- [ ] **Executive Summary** present (2-3 paragraphs: what, why, impact)
- [ ] **Problem Statement** specific with evidence (not just "we need to build X")
- [ ] **Goals & Success Metrics** defined with baselines and targets
- [ ] **Requirements** comprehensive and prioritized (P0/P1/P2)
- [ ] **Implementation Plan** with phases, timeline, and milestones
- [ ] **Resource Requirements** specified (team, budget, tools)
- [ ] **Risks & Mitigations** identified with likelihood and impact
- [ ] **Dependencies** documented (internal and external)
- [ ] **Open Questions** listed with owners and decision deadlines
- [ ] **Stakeholders & Approvals** matrix included

**Section Score**: ___/15

---

## Section 2: Clarity & Quality (10 checks)

Quality of writing and thinking:

### Clarity
- [ ] **Problem before solution** - Problem stated clearly before jumping to solution
- [ ] **Audience-appropriate** - Written for target audience (technical level appropriate)
- [ ] **Terminology consistent** - Same terms used throughout (not switching between synonyms)
- [ ] **Acronyms defined** - All acronyms defined on first use
- [ ] **No jargon** (or jargon explained) - Accessible to intended audience

### Specificity
- [ ] **Requirements are specific** - No vague language ("fast", "intuitive", "scalable")
- [ ] **Requirements are testable** - Clear success criteria for each requirement
- [ ] **Metrics are measurable** - All success metrics can actually be measured
- [ ] **Assumptions documented** - Implicit assumptions made explicit
- [ ] **No obvious gaps** - Major questions or areas are addressed

**Section Score**: ___/10

---

## Section 3: Structure & Format (8 checks)

Document structure and formatting:

### Structure
- [ ] **Logical flow** - Problem → Solution → Implementation (not jumbled)
- [ ] **Table of contents** - Included for documents >3 pages
- [ ] **Heading hierarchy** - Consistent H1, H2, H3 usage (not skipping levels)
- [ ] **Scannable** - Can understand key points in 2-minute skim

### Format
- [ ] **Proper markdown** - No formatting errors, renders correctly
- [ ] **Lists used appropriately** - Bullet points for lists, tables for comparisons
- [ ] **Visuals included** - Diagrams, tables, charts where helpful (not decorative)
- [ ] **Links work** - All cross-references and external links functional

**Section Score**: ___/8

---

## Section 4: Business Alignment (7 checks)

Strategic and business considerations:

### Strategic Fit
- [ ] **Business objective alignment** - Clearly aligns with stated business goals
- [ ] **ROI articulated** - Business value or ROI clearly explained
- [ ] **Resource justification** - Resource ask justified with expected return
- [ ] **Timeline realistic** - Timeline achievable given constraints

### Scope & Trade-offs
- [ ] **Scope clarity** - Clear what's in scope and what's out
- [ ] **Trade-offs acknowledged** - Significant trade-offs explained
- [ ] **Success criteria aligned** - Success criteria tie back to business goals

**Section Score**: ___/7

---

## Overall Assessment

**Total Score**: ___/40
**Percentage**: ___%

### Rating Scale

| Score | Rating | Action |
|-------|--------|--------|
| 36-40 (90-100%) | **Excellent** | ✅ Ready to ship as-is |
| 32-35 (80-89%) | **Good** | ⚠️ Minor improvements recommended |
| 28-31 (70-79%) | **Acceptable** | ⚠️ Several gaps to address |
| <28 (<70%) | **Needs Work** | ❌ Significant revisions required |

---

## Improvement Prioritization

If score is <90%, prioritize improvements in this order:

### Priority 1: Critical Gaps (Address First)
These make PRD unusable if missing:

1. **Missing success metrics** → Can't measure if successful
   - Fix: Add specific metrics with baselines and targets

2. **Vague requirements** → Can't build or test
   - Fix: Make every requirement specific and testable
   - Bad: "System should be fast"
   - Good: "API response time <200ms at p95 for 1000 concurrent users"

3. **Unclear problem statement** → Don't know why we're doing this
   - Fix: Add evidence and business impact to problem statement

4. **Missing risk assessment** → Blind spots will bite you
   - Fix: Actively hunt for risks, add likelihood/impact/mitigation

5. **Unrealistic timeline/resources** → Project will fail
   - Fix: Validate with team, add buffer, adjust scope or timeline

### Priority 2: Important Improvements (Address Second)
These reduce effectiveness but don't break PRD:

6. **Missing assumptions** → Hidden gotchas
   - Fix: Document all assumptions explicitly

7. **No prioritization** → Everything seems equally important
   - Fix: Force rank into P0/P1/P2

8. **Unclear stakeholders** → Approval delays
   - Fix: Add stakeholder matrix with roles and approvals

9. **Poor structure** → Hard to understand
   - Fix: Reorganize to problem → solution → implementation

10. **No visuals** → Harder to grasp
    - Fix: Add tables for metrics, diagrams for flows/architecture

### Priority 3: Nice to Have (Polish)
These improve professionalism:

11. Formatting errors
12. Broken links
13. Inconsistent terminology
14. Missing table of contents

---

## Common Issues by PRD Type

### AI Visibility Initiative PRDs

**Common Gaps**:
- [ ] **Baseline metrics missing** - Must have current citation rate, platform coverage
- [ ] **Query list incomplete** - Need specific queries being targeted
- [ ] **Platform strategies vague** - Need platform-specific tactics, not generic advice
- [ ] **Content requirements unclear** - Need actual content titles/topics, not just "create content"
- [ ] **Measurement approach undefined** - How will citations actually be tracked?

**Quick Fix**:
- Add current metrics table (citation rates, platform coverage)
- List top 20 priority queries explicitly
- Create platform-specific tactics sections (ChatGPT, Claude, Perplexity, Gemini)
- Convert "content requirements" into specific content briefs
- Define citation tracking process (manual testing schedule, tools, owner)

### Technical PRDs

**Common Gaps**:
- [ ] **Architecture diagram missing** - Need visual of system design
- [ ] **API specs incomplete** - Need endpoint definitions, request/response formats
- [ ] **Performance requirements vague** - "Fast" is not specific enough
- [ ] **Data models undefined** - What are the core entities and relationships?
- [ ] **Security considerations missing** - Authentication, authorization, encryption?

**Quick Fix**:
- Add architecture diagram (even hand-drawn and photographed)
- Document key API endpoints with examples
- Add specific performance targets (latency, throughput, concurrent users)
- Include data model diagram or schema
- Add security requirements section

### Standard Product PRDs

**Common Gaps**:
- [ ] **User personas missing** - Who is this for?
- [ ] **Use cases incomplete** - How will users actually use this?
- [ ] **UX/wireframes absent** - What will it look like?
- [ ] **Success metrics generic** - "Increase engagement" is too vague
- [ ] **Go-to-market missing** - How will users find out about this?

**Quick Fix**:
- Add 2-3 specific user personas
- Document 3-5 key use cases with user journeys
- Include wireframes or mockups (even sketches)
- Define specific metrics: "Increase DAU from X to Y"
- Add go-to-market section (if user-facing feature)

---

## Quick Validation Questions

Ask yourself these 10 questions. If you answer "no" to any, improve that area:

1. **Could someone unfamiliar with the project understand what we're doing and why in 5 minutes?**
   - If no: Improve executive summary and problem statement

2. **Could an engineer/implementer start working from this PRD without asking clarifying questions?**
   - If no: Add more specific requirements and success criteria

3. **Will we know definitively if this succeeded or failed?**
   - If no: Add measurable success metrics with targets

4. **Are priorities clear if we had to cut scope by 50%?**
   - If no: Force rank requirements into P0/P1/P2

5. **Would stakeholders understand what they're approving?**
   - If no: Improve clarity, reduce jargon, add visuals

6. **Have we identified the biggest risks and how to handle them?**
   - If no: Add comprehensive risk assessment

7. **Is the timeline achievable given the resources?**
   - If no: Adjust timeline, increase resources, or reduce scope

8. **Are all dependencies and assumptions explicit?**
   - If no: Document what needs to be true for this to work

9. **Is it clear who owns what and who needs to approve?**
   - If no: Add stakeholder matrix with clear roles

10. **Would this PRD still make sense in 6 months?**
    - If no: Add more context, document decisions and rationale

---

## Before-You-Ship Checklist

Final checks before sharing PRD:

### Content
- [ ] Read executive summary - does it clearly convey what/why/impact?
- [ ] Check problem statement - is it specific with evidence?
- [ ] Review requirements - are they all specific and testable?
- [ ] Verify metrics - baseline → target → timeline for each?
- [ ] Scan risks - have we identified major risks and mitigations?

### Format
- [ ] Skim entire document - does structure make sense?
- [ ] Check all links - do they work?
- [ ] Review tables - are they formatted correctly?
- [ ] Look at headers - consistent hierarchy?
- [ ] Proofread - spelling, grammar, consistency?

### Alignment
- [ ] Does it align with business goals?
- [ ] Is resource ask justified?
- [ ] Are stakeholders identified?
- [ ] Is approval process clear?
- [ ] Are next steps actionable?

### Final Question
**"If I were the decision-maker, would I feel confident approving this based on what's written?"**

If yes → Ship it ✅
If no → Improve the areas where you lack confidence

---

## Scoring Guide

### How to Score Each Section

**Award points only for complete checks:**
- ✅ Fully present and high quality = 1 point
- ⚠️ Present but needs improvement = 0.5 points  
- ❌ Missing or inadequate = 0 points

### Target Scores by PRD Maturity

**Draft (0.x version)**:
- Target: 70%+ (28/40)
- Focus: Core content complete, may lack polish
- It's OK to have: Some open questions, pending approvals, rough formatting

**Final for Approval (1.0 version)**:
- Target: 90%+ (36/40)
- Focus: Comprehensive, polished, ready for decision
- Should have: All sections complete, minimal gaps, professional format

**Approved/Active (1.x version)**:
- Target: 95%+ (38/40)
- Focus: Implementation-ready, serves as reference
- Should have: Approvals documented, any updates reflected

---

## Reviewer Notes

**Reviewer**: _______________
**Review Date**: _______________
**PRD Version Reviewed**: _______________

**Overall Assessment**:
[ ] Excellent - Ready to ship
[ ] Good - Minor improvements needed (list below)
[ ] Acceptable - Several gaps to address (list below)
[ ] Needs Work - Significant revisions required (list below)

**Specific Issues to Address**:
1. 
2. 
3. 

**Strengths** (what's working well):
1. 
2. 
3. 

**Recommendation**:
[ ] Approve as-is
[ ] Approve with minor revisions
[ ] Major revisions required, re-review needed
[ ] Reject - needs complete rethink

**Signature**: _______________
**Date**: _______________

---

## Appendix: Quality Criteria Details

### What "Specific Requirements" Look Like

❌ **Vague**: "System should be fast"
✅ **Specific**: "API response time <200ms at p95 for 1000 concurrent users"

❌ **Vague**: "UI should be intuitive"
✅ **Specific**: "New users complete first task without help in <3 minutes (80% success in usability testing)"

❌ **Vague**: "Content should be high quality"
✅ **Specific**: "Content achieves 70+ citation score using quality rubric (authority signals, comprehensiveness, accuracy)"

### What "Measurable Metrics" Look Like

❌ **Unmeasurable**: "Improve user experience"
✅ **Measurable**: "Increase task completion rate from 65% to 85%"

❌ **Unmeasurable**: "Increase engagement"
✅ **Measurable**: "Increase avg session duration from 2:30 to 4:00 minutes"

❌ **Unmeasurable**: "Be more visible on AI platforms"
✅ **Measurable**: "Increase citation rate from 35% to 65% across 4 major platforms"

### What "Problem Before Solution" Looks Like

❌ **Solution First**:
"We need to build an AI chatbot for our website."

✅ **Problem First**:
"Users can't find answers to common questions, leading to 500+ support tickets/month and 28% site abandonment rate. Data shows 80% of questions are from 20 FAQ topics. Competitors with AI chatbots show 60% lower support ticket volume."

### What "Realistic Timeline" Looks Like

Consider:
- **Team capacity**: Do you have the hours?
- **Dependencies**: What needs to happen first?
- **Risk buffer**: Added 20% for unknowns?
- **Holiday/vacation**: Accounted for time off?
- **Parallel work**: Can some tasks overlap?

❌ **Unrealistic**: "Build and launch comprehensive AI visibility strategy in 2 weeks"
✅ **Realistic**: "Phase 1 (foundation) in weeks 1-4, Phase 2 (expansion) in weeks 5-12, Phase 3 (optimization) in weeks 13-24"
