# PRD Writing Skill - Quick Start Guide

**Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Ready for Use

---

## What is This?

This is a **skill** (not a sub-agent) that any agent can load to format their domain expertise as professional Product Requirements Documents (PRDs).

**Think of it as**: A comprehensive style guide + templates + quality checklist for creating PRDs

**NOT**: A reasoning agent that makes product decisions

---

## Quick Start (5 Minutes)

### For Agents Using This Skill

**Step 1**: Complete your domain work FIRST
```
✅ Do your analysis, make your decisions, develop your strategy
❌ Don't load this skill until you know WHAT to recommend
```

**Step 2**: Load the skill
```python
skill = orchestrator.load_skill("prd-writing")
```

**Step 3**: Choose template
```python
# For AI visibility initiatives
template = skill.templates["ai-visibility-initiative-prd"]

# For general products/features  
template = skill.templates["standard-prd"]

# For technical projects
template = skill.templates["technical-prd"]
```

**Step 4**: Map your outputs to PRD sections
```python
# Your analysis → Problem Statement
# Your strategy → Opportunity & Objectives  
# Your priorities → Requirements
# Your roadmap → Implementation Plan
# Your KPIs → Success Metrics
```

**Step 5**: Quality check
```python
score = skill.checklist.validate(prd)
# Target: 90%+ (36/40 checks passed)
```

**Step 6**: Unload skill
```python
orchestrator.unload_skill("prd-writing")
```

---

## File Structure

```
/mnt/skills/public/prd-writing/
├── README.md (this file)
├── SKILL.md (comprehensive guide - START HERE)
│
├── templates/
│   ├── ai-visibility-initiative-prd.md (⭐ Most relevant for AI Visibility Platform)
│   ├── standard-prd.md (TODO: General product/feature)
│   ├── technical-prd.md (TODO: Engineering projects)
│   └── feature-prd.md (TODO: Single features)
│
├── checklists/
│   └── prd-quality-checklist.md (40-point validation checklist)
│
└── examples/
    ├── good-prd-example.md (TODO: Demonstrates best practices)
    └── common-mistakes.md (TODO: Anti-patterns to avoid)
```

---

## What's Included (Current)

### ✅ Complete & Ready to Use

1. **SKILL.md** - Master guide with:
   - Core PRD principles
   - How agents should use this skill
   - Best practices and anti-patterns
   - Quality assurance process
   - Integration patterns

2. **ai-visibility-initiative-prd.md** - Comprehensive template for:
   - AI visibility strategies
   - Content optimization plans
   - Platform-specific tactics
   - Implementation roadmaps

3. **prd-quality-checklist.md** - 40-point validation checklist:
   - Content completeness (15 checks)
   - Clarity & quality (10 checks)
   - Structure & format (8 checks)
   - Business alignment (7 checks)

### 🚧 To Be Created

4. **standard-prd.md** - General product/feature template
5. **technical-prd.md** - Engineering-focused template
6. **feature-prd.md** - Single feature template
7. **good-prd-example.md** - Real example showing best practices
8. **common-mistakes.md** - Anti-patterns with fixes

---

## Key Concepts

### Skills vs Sub-Agents

**This is a SKILL because it**:
- Formats output (doesn't make decisions)
- Is reusable across multiple agents
- Enhances presentation without changing logic
- Can be loaded/unloaded on-demand

**It would be a SUB-AGENT if it**:
- Made product decisions
- Gathered requirements from stakeholders
- Did domain-specific reasoning
- Needed sustained context

### When to Use This Skill

✅ **Use when**:
- Delivering formal strategy or plan
- Stakeholders need comprehensive documentation
- Approval process requires structured format
- Implementation by another team
- Complex initiative needing detailed specification

❌ **Don't use when**:
- Quick updates or status reports
- Informal communications
- Exploratory analysis (use after analysis complete)
- Simple checklists or action items

---

## Integration Examples

### Strategy Agent Using PRD Skill

```python
class StrategyAgent:
    def deliver_strategy_as_prd(self, strategy, client_context):
        """Format completed strategy as professional PRD"""
        
        # 1. Load skill
        prd_skill = self.orchestrator.load_skill("prd-writing")
        
        # 2. Choose template
        template = prd_skill.templates["ai-visibility-initiative-prd"]
        
        # 3. Map strategy to PRD sections
        prd_content = {
            "executive_summary": self.generate_exec_summary(strategy),
            "current_state": strategy["audit_baseline"],
            "opportunity": strategy["positioning"]["rationale"],
            "objectives": strategy["goals"],
            "target_queries": strategy["priority_queries"],
            "platform_strategies": strategy["platform_tactics"],
            "content_requirements": strategy["content_plan"],
            "technical_requirements": strategy["technical_specs"],
            "authority_requirements": strategy["authority_building"],
            "implementation_roadmap": strategy["roadmap"],
            "resource_requirements": strategy["resource_plan"],
            "success_metrics": strategy["kpis"],
            "risks": strategy["risk_assessment"],
            "dependencies": strategy["dependencies"],
            "assumptions": strategy["assumptions"],
            "stakeholders": client_context["stakeholders"]
        }
        
        # 4. Generate PRD
        prd = template.format(prd_content, client_context)
        
        # 5. Quality check
        quality = prd_skill.checklist.validate(prd)
        
        if quality.score < 0.9:
            # Improve based on gaps
            prd = self.improve_prd(prd, quality.gaps)
        
        # 6. Unload skill
        self.orchestrator.unload_skill("prd-writing")
        
        return prd
```

### Orchestrator Routing Pattern

```python
class Orchestrator:
    def process_deliverable_format(self, agent_output, format_requested):
        """Route agent output to appropriate formatter"""
        
        if format_requested == "prd":
            # Load PRD skill
            prd_skill = self.load_skill("prd-writing")
            
            # Determine appropriate template
            if agent_output.type == "ai_visibility_strategy":
                template = prd_skill.templates["ai-visibility-initiative-prd"]
            elif agent_output.type == "technical_spec":
                template = prd_skill.templates["technical-prd"]
            else:
                template = prd_skill.templates["standard-prd"]
            
            # Format output
            prd = template.format(agent_output.content, agent_output.context)
            
            # Quality validation
            quality = prd_skill.checklist.validate(prd)
            
            # Unload skill
            self.unload_skill("prd-writing")
            
            return prd, quality
```

---

## Best Practices

### 1. Load Only When Needed
```python
# ❌ BAD: Load skill at agent initialization
class StrategyAgent:
    def __init__(self):
        self.prd_skill = load_skill("prd-writing")  # Wastes context

# ✅ GOOD: Load only when formatting PRD
class StrategyAgent:
    def deliver_as_prd(self, strategy):
        prd_skill = orchestrator.load_skill("prd-writing")  # Just-in-time
        # ... use skill ...
        orchestrator.unload_skill("prd-writing")  # Free context
```

### 2. Complete Analysis Before Formatting
```python
# ❌ BAD: Mix analysis with PRD creation
prd_skill = load_skill("prd-writing")
strategy = analyze_and_create_prd()  # Don't do this

# ✅ GOOD: Analysis first, then formatting
strategy = develop_complete_strategy()  # Analysis complete
prd_skill = load_skill("prd-writing")  # Now format it
prd = format_as_prd(strategy)
```

### 3. Always Quality Check
```python
# ❌ BAD: Skip validation
prd = create_prd(strategy)
return prd  # Hope it's good?

# ✅ GOOD: Validate before delivery
prd = create_prd(strategy)
quality = prd_skill.checklist.validate(prd)

if quality.score < 0.9:
    prd = improve_prd(prd, quality.gaps)

return prd  # Confident it's good
```

### 4. Choose Right Template
```python
# Consider:
# - What are you documenting? (product, strategy, feature, technical)
# - Who is the audience? (executives, engineers, mixed)
# - What level of detail? (high-level vs comprehensive)

if ai_visibility_initiative:
    template = "ai-visibility-initiative-prd"
elif technical_implementation:
    template = "technical-prd"
elif new_feature:
    template = "feature-prd"
else:
    template = "standard-prd"
```

---

## Common Issues & Solutions

### Issue: "My PRD is too long"

**Diagnosis**: Probably trying to do too much in one PRD

**Solutions**:
- Split into multiple PRDs (strategy PRD + implementation PRDs)
- Use appendix for supporting details
- Link to external documents instead of including everything
- Focus on decisions, not process (how you got there)

**Guideline**:
- Executive PRD: 5-10 pages
- Comprehensive PRD: 15-25 pages
- Technical PRD: 20-30 pages
- If >30 pages: Split it up

### Issue: "Stakeholders keep asking clarifying questions"

**Diagnosis**: PRD isn't specific enough

**Solutions**:
- Run through quality checklist (likely scoring <80%)
- Look for vague requirements ("should be fast", "intuitive", "scalable")
- Add success criteria to every requirement
- Document assumptions explicitly
- Add more visuals (tables, diagrams)

**Test**: Could an implementer start working without asking questions?

### Issue: "PRD keeps getting rejected"

**Diagnosis**: Not aligned with stakeholder expectations

**Solutions**:
- Socialize problem statement BEFORE writing full PRD
- Get early feedback on draft (don't wait for "final")
- Ensure stakeholder matrix is correct (who needs to approve?)
- Check business alignment section (does ROI make sense?)
- Verify timeline and resources are realistic

**Prevention**: Share early, share often

### Issue: "Quality checklist score is low"

**Diagnosis**: Missing critical sections or being too vague

**Priority fixes** (in order):
1. Add success metrics with baselines and targets
2. Make requirements specific and testable
3. Improve problem statement with evidence
4. Add risk assessment
5. Validate timeline/resources are realistic

**Target**: 90%+ (36/40 checks)

---

## Customization Guide

### Adding New Templates

Create template at: `/templates/[name]-prd.md`

**Template should include**:
1. Standard header (version, date, owner, status)
2. Executive summary placeholder
3. Problem statement section
4. Goals & metrics section
5. Requirements section
6. Implementation plan section
7. Risks & dependencies
8. Stakeholders & approvals

**Then update**:
- SKILL.md (add to template list)
- This README.md (add to file structure)
- Template selection guide

### Adding Examples

Create example at: `/examples/[name].md`

**Good example should**:
- Show real (or realistic) PRD
- Demonstrate best practices
- Include annotations explaining what makes it good
- Cover a common use case

**Bad example should**:
- Show common mistakes
- Explain why each is problematic
- Provide corrected version
- Help readers learn what NOT to do

### Updating Quality Checklist

If you find missing quality criteria:

1. Add to appropriate section in checklist
2. Update total points (currently 40)
3. Recalculate target scores (90% of new total)
4. Document why criterion was added
5. Update version number and changelog

---

## Maintenance

### When to Update This Skill

**Update immediately** when:
- Critical quality issue found (PRD led to misalignment)
- Template has major gap
- Checklist missing obvious criteria

**Update quarterly**:
- Incorporate feedback from recent PRDs
- Refine templates based on usage
- Update examples

**Update annually**:
- Major template revisions
- Comprehensive content review
- Industry best practice updates

### Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0 | Oct 2025 | Initial release: SKILL.md, AI Visibility template, quality checklist | Current |

---

## Getting Help

### Documentation

- **Start here**: Read SKILL.md (comprehensive guide)
- **Templates**: See `/templates/` for PRD structures
- **Quality**: Use `/checklists/prd-quality-checklist.md`
- **Examples**: See `/examples/` for good/bad patterns

### Common Questions

**Q: Should I use this skill or write a custom format?**
A: Use this skill for formal PRDs. Use custom format for informal communications.

**Q: Which template should I use?**
A: See template selection guide in SKILL.md. Most AI Visibility work uses `ai-visibility-initiative-prd.md`.

**Q: My PRD failed quality check. What do I fix first?**
A: See "Improvement Prioritization" section in checklist. Fix critical gaps first (success metrics, vague requirements, unclear problem).

**Q: Can I customize the templates?**
A: Yes! Templates are starting points. Adapt to your needs, but keep core sections.

**Q: How long should a PRD take to create?**
A: After analysis is complete, 2-4 hours for formatting + quality check.

### Support

For skill issues or improvements:
- **File issue**: Document what's unclear or missing
- **Suggest improvement**: What would make this better?
- **Share example**: Real PRDs that worked well or poorly
- **Report bug**: Template or checklist errors

---

## Quick Reference Card

### The PRD Formula

```
1. Load skill (only when needed)
2. Choose template (based on context)
3. Map outputs (your analysis → PRD sections)
4. Generate PRD (use template)
5. Quality check (target: 90%+)
6. Improve gaps (if needed)
7. Unload skill (free context)
```

### Quality Checklist Quick Scan

```
□ Executive summary (what, why, impact)
□ Problem with evidence
□ Goals with metrics (baseline → target)
□ Requirements prioritized (P0/P1/P2)
□ Implementation plan with timeline
□ Resources specified
□ Risks with mitigations
□ Open questions with owners
□ Stakeholders listed
□ Professional format

If all checked → Probably good (run full checklist)
If >3 missing → Needs work
```

### Template Quick Picker

```
AI Visibility work          → ai-visibility-initiative-prd
General product/feature     → standard-prd (TODO)
Technical implementation    → technical-prd (TODO)
Single feature              → feature-prd (TODO)
```

---

## Status

### Current Status: MVP Complete ✅

**Ready for Production**:
- ✅ Core skill guide (SKILL.md)
- ✅ AI Visibility template (primary use case)
- ✅ Quality checklist (40 criteria)
- ✅ This README

**Next Phase** (Priority 2):
- ⏳ Additional templates (standard, technical, feature)
- ⏳ Good/bad examples
- ⏳ More integration patterns
- ⏳ Video walkthrough or tutorial

**Feedback Requested**:
- Is SKILL.md clear and comprehensive?
- Is AI Visibility template complete for your needs?
- What's missing from quality checklist?
- What examples would be most helpful?

---

**Last Updated**: October 2025  
**Maintained By**: Platform Architecture Team  
**Next Review**: January 2026  
**Status**: Production Ready (MVP)
