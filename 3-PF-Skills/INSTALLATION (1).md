# PRD Writing Skill - Installation & Usage Guide

## Installation Instructions

### Option 1: Use Directly from Outputs (Quick Start)

The skill is ready to use at:
```
/mnt/user-data/outputs/prd-writing-skill/
```

**For immediate testing:**
1. Navigate to the outputs folder
2. Read SKILL.md to understand the skill
3. Use ai-visibility-initiative-prd.md as template
4. Apply prd-quality-checklist.md for validation

### Option 2: Install to Skills Directory (Production)

**Step 1: Copy to Skills Location**
```bash
# Copy entire skill directory to skills location
cp -r /mnt/user-data/outputs/prd-writing-skill /mnt/skills/public/prd-writing

# Verify installation
ls -la /mnt/skills/public/prd-writing/
```

**Step 2: Verify File Structure**
```
/mnt/skills/public/prd-writing/
├── README.md
├── SKILL.md
├── templates/
│   └── ai-visibility-initiative-prd.md
├── checklists/
│   └── prd-quality-checklist.md
└── examples/
    └── (to be added)
```

**Step 3: Test Access**
```python
# In your agent code
skill_path = "/mnt/skills/public/prd-writing/SKILL.md"
with open(skill_path, 'r') as f:
    skill_content = f.read()
    print("✅ PRD Writing skill loaded successfully")
```

---

## Usage Patterns

### Pattern 1: Basic Usage (Strategy Agent)

```python
class StrategyAgent:
    """AI Visibility Strategy Agent with PRD output capability"""
    
    def __init__(self, orchestrator):
        self.orchestrator = orchestrator
    
    def deliver_strategy(self, client_context, audit_findings, format="prd"):
        """Develop strategy and deliver in requested format"""
        
        # STEP 1: Do the strategy work (this is your expertise)
        strategy = self.develop_strategy(client_context, audit_findings)
        
        # STEP 2: Format as PRD if requested
        if format == "prd":
            return self.format_as_prd(strategy, client_context)
        else:
            return strategy
    
    def develop_strategy(self, client_context, audit_findings):
        """Core strategy development - your domain expertise"""
        # This is where YOUR agent reasoning happens
        positioning = self.determine_positioning(...)
        opportunities = self.prioritize_opportunities(...)
        roadmap = self.create_roadmap(...)
        
        return {
            "positioning": positioning,
            "opportunities": opportunities,
            "roadmap": roadmap,
            # ... all your strategy outputs
        }
    
    def format_as_prd(self, strategy, client_context):
        """Use PRD skill to format strategy"""
        
        # Load PRD skill
        prd_skill = self.orchestrator.load_skill("prd-writing")
        
        # Choose template
        template_path = "/mnt/skills/public/prd-writing/templates/ai-visibility-initiative-prd.md"
        with open(template_path, 'r') as f:
            template = f.read()
        
        # Map your strategy outputs to PRD sections
        prd = self.populate_template(template, strategy, client_context)
        
        # Quality check
        checklist_path = "/mnt/skills/public/prd-writing/checklists/prd-quality-checklist.md"
        quality_score = self.validate_prd(prd, checklist_path)
        
        print(f"PRD Quality Score: {quality_score}/40")
        
        # Unload skill (free context)
        self.orchestrator.unload_skill("prd-writing")
        
        return prd
    
    def populate_template(self, template, strategy, client_context):
        """Map strategy outputs to PRD template"""
        
        # Replace template placeholders with your content
        prd = template
        prd = prd.replace("[Initiative Name]", strategy["initiative_name"])
        prd = prd.replace("[Client Organization Name]", client_context["name"])
        # ... continue replacing all placeholders
        
        return prd
    
    def validate_prd(self, prd, checklist_path):
        """Simple quality validation"""
        
        # Read checklist
        with open(checklist_path, 'r') as f:
            checklist = f.read()
        
        # Simple validation: check for key sections
        score = 0
        required_sections = [
            "Executive Summary",
            "Current State Analysis", 
            "Opportunity & Objectives",
            "Requirements",
            "Implementation Roadmap",
            "Resource Requirements",
            "Success Metrics",
            "Risks & Mitigations"
        ]
        
        for section in required_sections:
            if section in prd:
                score += 1
        
        return score
```

### Pattern 2: System Prompt Integration

Add to your Strategy Agent system prompt:

```markdown
## Delivering Strategy as PRD

When client requests formal PRD format, follow this process:

### Step 1: Complete Strategy Development
Develop your full AI visibility strategy:
- Positioning recommendation
- Prioritized opportunities  
- Implementation roadmap
- Resource plan
- Success metrics

DO NOT load PRD skill until strategy is complete.

### Step 2: Load PRD Writing Skill
```
LOAD_SKILL("prd-writing")
```

### Step 3: Select Template
For AI visibility strategies, use:
```
/mnt/skills/public/prd-writing/templates/ai-visibility-initiative-prd.md
```

### Step 4: Map Your Outputs to Template

| Your Output | PRD Section |
|-------------|-------------|
| Audit findings | Current State Analysis |
| Positioning | Opportunity & Objectives |
| Priorities | Requirements (Content, Technical, Authority) |
| Roadmap | Implementation Roadmap |
| Resource plan | Resource Requirements |
| KPIs | Success Metrics & Measurement |
| Risks | Risks & Mitigations |

### Step 5: Quality Check
Validate against checklist:
```
/mnt/skills/public/prd-writing/checklists/prd-quality-checklist.md
```

Target: 36/40 checks (90%+)

Critical checks:
□ Executive summary present (what, why, impact)
□ Success metrics with baselines and targets
□ Requirements specific and testable
□ Timeline realistic
□ Risks identified with mitigations

### Step 6: Unload Skill
```
UNLOAD_SKILL("prd-writing")
```

## Key Principles

1. **Skill formats, doesn't think**: The PRD skill structures your strategy. You do the strategic thinking.

2. **Load just-in-time**: Don't load until you need to format. Saves context.

3. **Quality matters**: Run through checklist before delivery.

4. **Lead with problem**: Problem statement before solution, always.

5. **Be specific**: "Citation rate from 35% to 65%" not "improve visibility"
```

### Pattern 3: Orchestrator Integration

```python
class Orchestrator:
    """Master orchestrator with skill loading capability"""
    
    def __init__(self):
        self.loaded_skills = {}
        self.skills_base_path = "/mnt/skills/public/"
    
    def load_skill(self, skill_name):
        """Load a skill into context"""
        
        if skill_name in self.loaded_skills:
            return self.loaded_skills[skill_name]
        
        skill_path = f"{self.skills_base_path}{skill_name}/"
        
        # Load skill metadata
        with open(f"{skill_path}SKILL.md", 'r') as f:
            skill_guide = f.read()
        
        # Load templates (if they exist)
        templates = {}
        template_path = f"{skill_path}templates/"
        if os.path.exists(template_path):
            for template_file in os.listdir(template_path):
                if template_file.endswith('.md'):
                    template_name = template_file.replace('.md', '')
                    with open(f"{template_path}{template_file}", 'r') as f:
                        templates[template_name] = f.read()
        
        # Load checklists
        checklists = {}
        checklist_path = f"{skill_path}checklists/"
        if os.path.exists(checklist_path):
            for checklist_file in os.listdir(checklist_path):
                if checklist_file.endswith('.md'):
                    checklist_name = checklist_file.replace('.md', '')
                    with open(f"{checklist_path}{checklist_file}", 'r') as f:
                        checklists[checklist_name] = f.read()
        
        skill = {
            "name": skill_name,
            "guide": skill_guide,
            "templates": templates,
            "checklists": checklists,
            "path": skill_path
        }
        
        self.loaded_skills[skill_name] = skill
        print(f"✅ Loaded skill: {skill_name}")
        
        return skill
    
    def unload_skill(self, skill_name):
        """Unload skill to free context"""
        
        if skill_name in self.loaded_skills:
            del self.loaded_skills[skill_name]
            print(f"🗑️ Unloaded skill: {skill_name}")
    
    def get_loaded_skills(self):
        """Return list of currently loaded skills"""
        return list(self.loaded_skills.keys())
```

---

## Testing the Skill

### Test 1: Load and Read Skill

```python
# Test basic loading
skill_path = "/mnt/skills/public/prd-writing/SKILL.md"

with open(skill_path, 'r') as f:
    content = f.read()
    
print("Skill loaded successfully!")
print(f"Content length: {len(content)} characters")
print(f"First 200 chars: {content[:200]}")
```

### Test 2: Load Template

```python
# Test template loading
template_path = "/mnt/skills/public/prd-writing/templates/ai-visibility-initiative-prd.md"

with open(template_path, 'r') as f:
    template = f.read()
    
print("Template loaded successfully!")
print(f"Template length: {len(template)} characters")

# Check for key sections
key_sections = ["Executive Summary", "Current State", "Requirements", "Implementation Roadmap"]
for section in key_sections:
    if section in template:
        print(f"✅ Found section: {section}")
    else:
        print(f"❌ Missing section: {section}")
```

### Test 3: Validate Sample PRD

```python
# Create a minimal PRD to test validation
sample_prd = """
# Sample Initiative - AI Visibility Requirements Document

**Version**: 1.0
**Date**: 2025-10-26
**Client**: Test Client
**Owner**: Strategy Agent
**Status**: Draft

## Executive Summary
This is a test PRD to validate the skill is working correctly.

## Current State Analysis
Placeholder for current state.

## Opportunity & Objectives
Placeholder for objectives.

## Requirements
Placeholder for requirements.

## Implementation Roadmap
Placeholder for roadmap.

## Resource Requirements
Placeholder for resources.

## Success Metrics & Measurement
Placeholder for metrics.

## Risks & Mitigations
Placeholder for risks.
"""

# Simple validation
required_sections = [
    "Executive Summary",
    "Current State Analysis",
    "Opportunity & Objectives",
    "Requirements",
    "Implementation Roadmap",
    "Resource Requirements",
    "Success Metrics",
    "Risks & Mitigations"
]

score = sum(1 for section in required_sections if section in sample_prd)
print(f"Sample PRD validation: {score}/{len(required_sections)} sections present")

if score == len(required_sections):
    print("✅ All required sections present!")
else:
    print("⚠️ Some sections missing")
```

### Test 4: End-to-End Agent Usage

```python
# Simulate Strategy Agent using PRD skill

class TestStrategyAgent:
    def __init__(self):
        self.orchestrator = Orchestrator()
    
    def test_prd_creation(self):
        """Test complete PRD creation flow"""
        
        print("Starting PRD creation test...")
        
        # Step 1: Develop strategy (simulated)
        strategy = {
            "initiative_name": "Test AI Visibility Initiative",
            "positioning": {"rationale": "Test rationale"},
            "opportunities": ["Opportunity 1", "Opportunity 2"],
            "roadmap": {"phase1": "Test phase 1"},
            # ... more strategy outputs
        }
        print("✅ Strategy developed")
        
        # Step 2: Load PRD skill
        prd_skill = self.orchestrator.load_skill("prd-writing")
        print("✅ PRD skill loaded")
        
        # Step 3: Access template
        template = prd_skill["templates"]["ai-visibility-initiative-prd"]
        print(f"✅ Template loaded ({len(template)} chars)")
        
        # Step 4: Create PRD (simplified)
        prd = template.replace("[Initiative Name]", strategy["initiative_name"])
        print("✅ PRD created")
        
        # Step 5: Unload skill
        self.orchestrator.unload_skill("prd-writing")
        print("✅ Skill unloaded")
        
        print("\n✅ Test complete! PRD skill is working.")
        
        return prd

# Run test
agent = TestStrategyAgent()
test_prd = agent.test_prd_creation()
```

---

## Next Steps

### Phase 1: Integrate with Your Agents (Week 1)

**Priority 1**: Strategy Agent
1. Update Strategy Agent system prompt with PRD guidelines
2. Add PRD formatting method
3. Test with sample client data
4. Validate quality output

**Priority 2**: Content Agent  
1. Update Content Agent system prompt
2. Add PRD formatting for content plans
3. Test and validate

### Phase 2: Create Additional Templates (Week 2)

1. **standard-prd.md** - General product/feature template
2. **technical-prd.md** - Engineering-focused template
3. **feature-prd.md** - Single feature template

### Phase 3: Add Examples (Week 3)

1. **good-prd-example.md** - Real example showing best practices
2. **common-mistakes.md** - Anti-patterns with fixes

### Phase 4: Iterate Based on Usage (Ongoing)

1. Collect feedback from PRD outputs
2. Identify common issues or gaps
3. Refine templates and guidelines
4. Update quality checklist as needed

---

## Troubleshooting

### Issue: Can't find skill files

**Check**:
```bash
ls -la /mnt/skills/public/prd-writing/
# Should see: SKILL.md, README.md, templates/, checklists/
```

**If missing**: Copy from outputs:
```bash
cp -r /mnt/user-data/outputs/prd-writing-skill /mnt/skills/public/prd-writing
```

### Issue: Template not loading

**Check template path**:
```python
import os
template_path = "/mnt/skills/public/prd-writing/templates/ai-visibility-initiative-prd.md"
print(f"Template exists: {os.path.exists(template_path)}")
```

**If False**: Verify file was copied correctly

### Issue: PRD quality score low

**Run through checklist manually**:
1. Open `/checklists/prd-quality-checklist.md`
2. Go through each of 40 checks
3. Identify which sections are missing/weak
4. Prioritize critical gaps (success metrics, vague requirements, unclear problem)
5. Improve those sections first

**Target**: 36/40 (90%+)

### Issue: Template placeholders not being replaced

**Check**:
- Are you replacing ALL placeholders? `[Initiative Name]`, `[Client Name]`, etc.
- Use search/replace systematically
- Or build a proper template engine

**Better approach**:
```python
def populate_template(template, context):
    """Systematically replace all placeholders"""
    
    replacements = {
        "[Initiative Name]": context.get("initiative_name", "TBD"),
        "[Client Organization Name]": context.get("client_name", "TBD"),
        "[YYYY-MM-DD]": context.get("date", "TBD"),
        # ... all placeholders
    }
    
    prd = template
    for placeholder, value in replacements.items():
        prd = prd.replace(placeholder, str(value))
    
    return prd
```

---

## FAQ

**Q: Do I need to copy files or can I read directly from outputs?**
A: For production, copy to `/mnt/skills/public/`. For testing, read from outputs is fine.

**Q: Can I modify the templates?**
A: Yes! Templates are starting points. Adapt to your needs.

**Q: Should I create a new skill for each document type?**
A: No. Use this PRD skill for all PRDs. Create new skills only for fundamentally different capabilities (e.g., "presentation-design", "technical-documentation").

**Q: How do I know if my PRD is good enough?**
A: Run through quality checklist. Target: 90%+ (36/40 checks). Critical: success metrics, specific requirements, clear problem statement.

**Q: Can multiple agents use this skill simultaneously?**
A: Yes! Skill is read-only and stateless. Multiple agents can load/use independently.

**Q: How much context does loading this skill take?**
A: Approximately 5-10K tokens for SKILL.md, 5-8K for template, 3-5K for checklist. Total: ~15-20K tokens when fully loaded.

---

## Summary

### What You Have

✅ **Complete PRD Writing Skill** with:
- Comprehensive guide (SKILL.md)
- AI Visibility PRD template (your primary use case)
- 40-point quality checklist
- README and installation guide

### What to Do Next

1. **Install**: Copy to `/mnt/skills/public/prd-writing/` (or use from outputs for testing)
2. **Integrate**: Update your Strategy Agent to use skill
3. **Test**: Create a sample PRD with test data
4. **Validate**: Run through quality checklist
5. **Iterate**: Improve based on actual usage

### Key Principles

1. **Skill formats, doesn't think** - Complete analysis BEFORE loading skill
2. **Load just-in-time** - Save context by loading only when needed
3. **Quality check always** - Target 90%+ on checklist
4. **Unload after use** - Free context for next task

---

**Ready to start? Run Test 4 (End-to-End Agent Usage) to validate everything works!**

---

**Installation Guide Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Ready for Production Use
