# PF-Agent Strategy Validation Report

## Anthropic Best Practices Compliance Assessment

**Assessment Date:** December 2025  
**Documents Validated:** 6 PF-Agent Strategy files  
**Reference Sources:** 4 Anthropic Engineering articles  

---

## Executive Summary

| Category | Compliance | Score | Action Required |
|----------|------------|-------|-----------------|
| **Agent Architecture** | Partial | 75% | Add missing patterns |
| **Context Engineering** | Partial | 70% | Add compaction, token awareness |
| **Tool Design (ACI)** | Needs Work | 60% | Add poka-yoke, tool engineering emphasis |
| **Long-Running Patterns** | Gap | 40% | Add initializer/progress patterns |
| **Testing & Verification** | Partial | 70% | Add visual feedback, rules-based verification |
| **Simplicity Principle** | Gap | 50% | Add complexity scaling guidance |

**Overall Assessment: 61% aligned - significant updates recommended**

### Additional Gap Identified: Ontology & Data Access Layer

| Category | Compliance | Score | Action Required |
|----------|------------|-------|-----------------|
| **OAA Integration** | Gap | 30% | Add OAA ontology governance |
| **Graph-Based Data Access** | Gap | 25% | Add agent-ontology access patterns |
| **Schema.org Grounding** | Partial | 60% | Formalize in agent PRDs |

**New Addendum Created:** `ADDENDUM-OAA-ONTOLOGY-INTEGRATION.md`

---

## 1. Core Anthropic Principles Analysis

### 1.1 Principle: "Give Claude a Computer"

**Anthropic Guidance:**
> "The key design principle behind the Claude Agent SDK is to give your agents a computer, allowing them to work like humans do."

**Current Draft Status:** ✅ Aligned  
The drafts correctly emphasize bash commands, file operations, and terminal access as core capabilities.

**No changes required.**

---

### 1.2 Principle: "Start Simple, Add Complexity Only When Needed"

**Anthropic Guidance:**
> "When building applications with LLMs, we recommend finding the simplest solution possible, and only increasing complexity when needed."
> "You should consider adding complexity **only when it demonstrably improves outcomes**."

**Current Draft Status:** ⚠️ PARTIAL GAP

**Issue:** The templates are comprehensive but may encourage over-engineering for simple use cases.

**Required Addition to PF-AGENT-STRATEGY-VSOM.md:**

```markdown
## 2.6 Complexity Scaling Principle

### When to Use Each Pattern

| Task Complexity | Recommended Approach | When to Escalate |
|-----------------|---------------------|------------------|
| **Simple** | Single LLM call with retrieval | If accuracy < 90% |
| **Moderate** | Prompt chaining or routing | If subtasks are interdependent |
| **Complex** | Orchestrator-workers | If subtasks can't be predicted |
| **Open-ended** | Full autonomous agent | If flexibility required at scale |

### Decision Framework

Before implementing any agent pattern, ask:

1. **Can a single optimized prompt solve this?** Try this first.
2. **Can prompt chaining with gates solve this?** Try second.
3. **Do I need dynamic subtask generation?** Only then use agents.

> ⚠️ **Anthropic Warning:** "Agentic systems often trade latency and cost 
> for better task performance. Consider when this tradeoff makes sense."

### Complexity Cost Model

| Pattern | Latency Multiplier | Cost Multiplier | Use When |
|---------|-------------------|-----------------|----------|
| Single call | 1x | 1x | Default |
| Prompt chain | 2-3x | 2-3x | Quality > speed |
| Parallelization | 1.5x | 3-5x | Speed + confidence |
| Orchestrator-workers | 3-10x | 5-20x | Unpredictable subtasks |
| Full agent loop | 10-100x | 20-100x | Open-ended tasks |
```

---

### 1.3 Principle: Agent Loop (Gather → Act → Verify → Repeat)

**Anthropic Guidance:**
> "Claude often operates in a specific feedback loop: **gather context → take action → verify work → repeat**."

**Current Draft Status:** ⚠️ PARTIAL - Missing verification emphasis

**Required Addition to Section 3 (Agent SDK Orchestration):**

```markdown
### 3.4 Verification Loop Pattern

Every agent action MUST include verification. Anthropic identifies three verification approaches:

#### 3.4.1 Rules-Based Verification (Preferred)
```python
# BEST: Concrete rules with specific failure feedback
@agent.tool
async def verify_output(output: dict) -> VerificationResult:
    """Verify output against defined rules"""
    errors = []
    warnings = []
    
    # Rule 1: Schema validation
    if not validate_schema(output, expected_schema):
        errors.append("Output does not match expected schema")
    
    # Rule 2: Business logic validation
    if output.get("confidence") < 0.7:
        warnings.append("Low confidence - consider escalation")
    
    # Rule 3: Linting (for code outputs)
    if output.get("type") == "code":
        lint_results = run_linter(output["content"])
        errors.extend(lint_results.errors)
    
    return VerificationResult(
        passed=len(errors) == 0,
        errors=errors,
        warnings=warnings
    )
```

#### 3.4.2 Visual Verification (For UI/Output Tasks)
```python
# Use screenshots/renders for visual outputs
@agent.tool
async def visual_verify(html_content: str) -> VisualVerification:
    """Take screenshot and verify visual output"""
    # Using Playwright MCP or similar
    screenshot = await browser.screenshot(html_content)
    
    # Have Claude verify the visual output
    verification = await claude.analyze_image(
        screenshot,
        prompt="Verify: layout correct, styling matches spec, content hierarchy appropriate"
    )
    return verification
```

#### 3.4.3 LLM-as-Judge (Use Sparingly)
```python
# CAUTION: Less robust, high latency - use only when rules insufficient
@agent.tool
async def llm_judge(output: str, criteria: str) -> JudgeResult:
    """Have separate LLM evaluate output quality"""
    # Only use for fuzzy criteria that can't be encoded as rules
    # Example: tone evaluation, creative quality
    pass
```

> ⚠️ **Anthropic Note:** "LLM as judge is generally not a very robust method, 
> and can have heavy latency tradeoffs."
```

---

### 1.4 Principle: Tool Engineering (ACI = Agent-Computer Interface)

**Anthropic Guidance:**
> "Think about how much effort goes into human-computer interfaces (HCI), and **plan to invest just as much effort in creating good agent-computer interfaces (ACI)**."
> "We actually spent **more time optimizing our tools than the overall prompt**."

**Current Draft Status:** ❌ SIGNIFICANT GAP

**Required Addition - New Section in TEMPLATE-AGENT-PRD.md:**

```markdown
## 5.4 Agent-Computer Interface (ACI) Design

### ACI Design Principles (Anthropic)

> "Put yourself in the model's shoes. Is it obvious how to use this tool, 
> based on the description and parameters?"

#### Tool Definition Checklist

For EACH tool, verify:

| Criterion | Question | Pass? |
|-----------|----------|-------|
| **Clarity** | Would a junior dev understand this tool from docs alone? | ☐ |
| **Examples** | Does definition include example usage? | ☐ |
| **Edge cases** | Are edge cases documented? | ☐ |
| **Format** | Is input format clearly specified? | ☐ |
| **Boundaries** | Is scope vs. similar tools clear? | ☐ |
| **Poka-yoke** | Are common mistakes prevented by design? | ☐ |

#### Poka-Yoke Tool Design

**Anthropic Insight:** Change tool arguments so mistakes are harder to make.

**Example - Before (Error-Prone):**
```json
{
  "name": "edit_file",
  "parameters": {
    "path": "string (relative or absolute)",
    "content": "string"
  }
}
```

**Example - After (Poka-Yoke):**
```json
{
  "name": "edit_file",
  "parameters": {
    "absolute_path": {
      "type": "string",
      "description": "MUST be absolute path starting with /",
      "pattern": "^/"
    },
    "content": "string"
  }
}
```

> "We found that the model would make mistakes with tools using relative 
> filepaths after the agent had moved out of the root directory. To fix this, 
> we changed the tool to always require absolute filepaths—and we found that 
> the model used this method flawlessly." - Anthropic

#### Tool Format Optimization

**Anthropic Guidelines:**
1. **Give tokens to think:** Let model plan before committing
2. **Natural format:** Keep close to what model has seen in training
3. **No overhead:** Avoid counting requirements (line numbers, escaping)

| Format | Recommendation | Reason |
|--------|---------------|--------|
| Diffs | ⚠️ Avoid | Requires accurate line counting |
| JSON code | ⚠️ Avoid | Requires escape handling |
| Markdown code | ✅ Prefer | Natural, no escaping |
| Full file rewrites | ✅ Prefer | No tracking required |
```

---

### 1.5 Principle: Long-Running Agent Patterns

**Anthropic Guidance:**
> "We developed a two-fold solution: an **initializer agent** that sets up the environment on the first run, and a **coding agent** that is tasked with making incremental progress in every session, while leaving clear artifacts for the next session."

**Current Draft Status:** ❌ CRITICAL GAP - Not addressed in templates

**Required Addition - New Section:**

```markdown
## NEW: Long-Running Agent Harness Pattern

### Initializer Agent vs Working Agent

Anthropic's research shows that long-running agents need TWO distinct prompts:

#### 1. Initializer Agent (First Run Only)

**Purpose:** Set up environment for all future sessions

**Creates:**
- `init.sh` - Script to start development environment
- `claude-progress.txt` - Progress log for future agents
- `features.json` - Structured feature list (NOT Markdown)
- Initial git commit showing baseline

**Prompt Template:**
```xml
<first_run_prompt>
You are setting up the initial environment for a long-running project.

Your tasks:
1. Analyze the project requirements
2. Create a comprehensive features.json with ALL required features
3. Mark all features as "passes": false initially
4. Create init.sh to set up the development environment
5. Create claude-progress.txt with initial state
6. Make an initial git commit

Output features.json in this format (JSON, not Markdown):
{
  "features": [
    {
      "id": "F001",
      "category": "functional",
      "description": "User can open new chat",
      "steps": ["Navigate to main", "Click new chat", "Verify creation"],
      "passes": false
    }
  ]
}

> ⚠️ Use JSON because "the model is less likely to inappropriately 
> change or overwrite JSON files compared to Markdown files." - Anthropic
</first_run_prompt>
```

#### 2. Working Agent (All Subsequent Runs)

**Purpose:** Make incremental progress, leave clean state

**Standard Startup Sequence:**
```bash
# 1. Get bearings
pwd

# 2. Read progress
cat claude-progress.txt

# 3. Check git history
git log --oneline -20

# 4. Read feature list
cat features.json | jq '.features[] | select(.passes == false)'

# 5. Run init script
./init.sh

# 6. Verify baseline functionality still works
# (Run basic smoke test before new work)

# 7. Pick ONE feature to implement
# 8. Implement and test
# 9. Update features.json (only change passes field)
# 10. Commit with descriptive message
# 11. Update claude-progress.txt
```

**Prompt Template:**
```xml
<working_agent_prompt>
You are continuing work on an existing project.

STARTUP ROUTINE (always do this first):
1. Run `pwd` to see your working directory
2. Read claude-progress.txt for recent work
3. Run `git log --oneline -20` to see recent commits
4. Read features.json to find incomplete features
5. Run init.sh to start the environment
6. Test that basic functionality still works

WORKING RULES:
- Work on ONE feature at a time
- Never edit features.json except to change "passes" field
- Test features end-to-end (not just unit tests)
- Commit after each completed feature
- Update claude-progress.txt before session ends

> ⚠️ "It is unacceptable to remove or edit tests because this could 
> lead to missing or buggy functionality" - Anthropic
</working_agent_prompt>
```

### Progress File Pattern

```markdown
# claude-progress.txt

## Session: 2025-12-01 14:30 UTC

### Completed This Session:
- F001: User can open new chat ✅
- F002: Chat displays AI response ✅

### In Progress:
- F003: User can view chat history (50% - sidebar renders but no persistence)

### Known Issues:
- None currently

### Next Session Should:
1. Complete F003 history persistence
2. Start F004 conversation threading

### Git Commits This Session:
- abc123: feat: Add new chat functionality
- def456: feat: Add AI response display
```

### Incremental Progress Principle

> "The next iteration of the coding agent was then asked to work on **only one 
> feature at a time**. This incremental approach turned out to be critical."
> - Anthropic

**Anti-Pattern:** One-shotting entire applications  
**Correct Pattern:** Feature-by-feature with verification between each
```

---

### 1.6 Principle: Context Management & Compaction

**Anthropic Guidance:**
> "The Claude Agent SDK's compact feature automatically summarizes previous messages when the context limit approaches."

**Current Draft Status:** ⚠️ PARTIAL - Missing compaction

**Required Addition to TEMPLATE-CONTEXT-ENGINEERING.md:**

```markdown
## 6.3 Compaction for Long-Running Agents

### When Context Approaches Limit

```python
class ContextManager:
    def __init__(self, max_tokens: int = 200000):
        self.max_tokens = max_tokens
        self.compaction_threshold = 0.8  # Trigger at 80%
    
    async def manage_context(self, messages: List[Message]) -> List[Message]:
        current_tokens = count_tokens(messages)
        
        if current_tokens > self.max_tokens * self.compaction_threshold:
            return await self.compact(messages)
        return messages
    
    async def compact(self, messages: List[Message]) -> List[Message]:
        """Summarize older messages to free context space"""
        # Keep: System prompt, recent N turns, tool results
        # Summarize: Older conversation turns
        
        summary = await self.summarize_older_messages(messages[:-10])
        return [
            messages[0],  # System prompt
            {"role": "system", "content": f"Previous context summary: {summary}"},
            *messages[-10:]  # Recent turns
        ]
```

### Token Budget Awareness (Claude 4.5)

Claude Sonnet 4.5 and Haiku 4.5 have **native context awareness**:

```xml
<!-- At conversation start -->
<budget:token_budget>200000</budget:token_budget>

<!-- After each tool call -->
<system_warning>Token usage: 35000/200000; 165000 remaining</system_warning>
```

**Benefits:**
- Model knows remaining capacity
- Can plan work accordingly
- Enables long-running task persistence

**Prompt Addition for Token-Aware Agents:**
```xml
<context_awareness>
You have access to your token budget. Use this information to:
1. Plan work that fits within remaining tokens
2. Checkpoint progress before approaching limits
3. Summarize and persist state if running low
</context_awareness>
```
```

---

### 1.7 Principle: Subagents for Parallelization and Context Isolation

**Anthropic Guidance:**
> "Subagents are useful for two main reasons. First, they enable **parallelization**... Second, they help **manage context**: subagents use their own isolated context windows, and only send relevant information back to the orchestrator."

**Current Draft Status:** ✅ Partially covered, needs enhancement

**Required Enhancement to Section 4 (Sub-Agent & Skills):**

```markdown
### 4.4 Subagent Design Patterns

#### Pattern 1: Parallel Search Subagents

```python
async def search_with_subagents(query: str, sources: List[str]) -> List[Result]:
    """Spin up parallel subagents for each source"""
    tasks = [
        search_subagent.run(query=query, source=source)
        for source in sources
    ]
    
    # Each subagent has isolated context
    # Returns only relevant excerpts, not full results
    results = await asyncio.gather(*tasks)
    
    return aggregate_results(results)
```

#### Pattern 2: Context Isolation for Large Documents

```python
async def analyze_large_document(document: str) -> Analysis:
    """Use subagent to prevent document from filling main context"""
    
    # Subagent processes document in isolation
    analysis = await analysis_subagent.run(
        document=document,
        instructions="Extract key findings only"
    )
    
    # Only summary returns to main context
    return analysis.summary  # Not full document
```

#### When to Use Subagents

| Scenario | Use Subagent? | Reason |
|----------|---------------|--------|
| Multiple independent searches | ✅ Yes | Parallelization + isolation |
| Large document analysis | ✅ Yes | Context isolation |
| Sequential dependent tasks | ❌ No | Need shared context |
| Simple tool calls | ❌ No | Overhead not justified |
```

---

## 2. Workflow Pattern Compliance

### 2.1 Anthropic Workflow Patterns

The drafts should reference these canonical patterns:

| Pattern | Current Coverage | Required Action |
|---------|-----------------|-----------------|
| **Prompt Chaining** | ⚠️ Mentioned | Add gate examples |
| **Routing** | ❌ Missing | Add pattern |
| **Parallelization** | ⚠️ Partial | Add sectioning vs voting |
| **Orchestrator-Workers** | ✅ Covered | None |
| **Evaluator-Optimizer** | ❌ Missing | Add pattern |

**Required Addition:**

```markdown
## Canonical Workflow Patterns (Anthropic)

### Pattern: Routing

```
Input → Classifier → Route A → Specialized Handler A
                  → Route B → Specialized Handler B
                  → Route C → Specialized Handler C
```

**Use when:** Distinct categories need different handling

**Example:**
```python
@agent.tool
async def route_request(request: dict) -> str:
    """Route to appropriate handler based on type"""
    if request["type"] == "technical_support":
        return await technical_agent.handle(request)
    elif request["type"] == "billing":
        return await billing_agent.handle(request)
    else:
        return await general_agent.handle(request)
```

### Pattern: Evaluator-Optimizer Loop

```
Generator → Output → Evaluator → Feedback → Generator (iterate)
                              → Approved → Done
```

**Use when:** Clear evaluation criteria exist

**Example:**
```python
async def generate_with_evaluation(task: str, max_iterations: int = 3) -> str:
    output = await generator.generate(task)
    
    for i in range(max_iterations):
        evaluation = await evaluator.evaluate(output, criteria)
        
        if evaluation.approved:
            return output
        
        output = await generator.refine(output, evaluation.feedback)
    
    return output  # Best effort after max iterations
```
```

---

## 3. Testing & Verification Compliance

### 3.1 Anthropic Testing Guidance

**Key Insight:**
> "Claude tended to make code changes... but would fail to recognize that the feature didn't work **end-to-end**."
> "Providing Claude with these kinds of testing tools **dramatically improved performance**."

**Current Draft Status:** ⚠️ Missing visual/E2E emphasis

**Required Enhancement to TEMPLATE-TDD-FRAMEWORK.md:**

```markdown
## 7.5 End-to-End Testing with Visual Verification

### Browser Automation Testing (Anthropic Pattern)

```python
"""
Anthropic Research: "Claude mostly did well at verifying features end-to-end 
once explicitly prompted to use browser automation tools and do all testing 
as a human user would."
"""

@pytest.fixture
def browser():
    """Browser automation via Playwright MCP"""
    return PlaywrightMCP()

class TestEndToEndWithVisual:
    """Visual verification catches bugs not obvious from code"""
    
    @pytest.mark.asyncio
    async def test_feature_visual_verification(self, browser, agent):
        # 1. Agent implements feature
        await agent.implement_feature("F001")
        
        # 2. Start dev server
        await browser.run_command("./init.sh")
        
        # 3. Navigate to feature
        await browser.goto("http://localhost:3000")
        
        # 4. Take screenshot
        screenshot = await browser.screenshot()
        
        # 5. Verify visually
        verification = await agent.verify_screenshot(
            screenshot,
            expected=[
                "New chat button visible",
                "Layout is correct",
                "No error messages"
            ]
        )
        
        assert verification.passed
    
    @pytest.mark.asyncio
    async def test_user_flow_end_to_end(self, browser):
        """Test as a human user would"""
        # Navigate
        await browser.goto("http://localhost:3000")
        
        # Interact
        await browser.click("#new-chat-btn")
        await browser.type("#message-input", "Hello")
        await browser.click("#send-btn")
        
        # Verify result
        await browser.wait_for_selector(".ai-response")
        response = await browser.text_content(".ai-response")
        
        assert len(response) > 0

### Visual Verification Limitations

> ⚠️ Anthropic Note: "Claude can't see browser-native alert modals through 
> the Puppeteer MCP, and features relying on these modals tended to be buggier."

**Mitigation:** Replace native alerts with custom modals that can be captured.
```

---

## 4. Required Document Updates Summary

### 4.1 PF-AGENT-STRATEGY-VSOM.md

| Section | Change Type | Priority |
|---------|-------------|----------|
| 2.6 | ADD: Complexity Scaling Principle | 🔴 High |
| 3.4 | ADD: Verification Loop Pattern | 🔴 High |
| NEW | ADD: Long-Running Agent Harness | 🔴 Critical |
| NEW | ADD: Canonical Workflow Patterns | 🟡 Medium |

### 4.2 TEMPLATE-AGENT-PRD.md

| Section | Change Type | Priority |
|---------|-------------|----------|
| 5.4 | ADD: ACI Design section | 🔴 High |
| 5.5 | ADD: Tool Poka-Yoke checklist | 🔴 High |
| 6.3 | ADD: Initializer vs Working patterns | 🔴 Critical |

### 4.3 TEMPLATE-CONTEXT-ENGINEERING.md

| Section | Change Type | Priority |
|---------|-------------|----------|
| 6.3 | ADD: Compaction section | 🔴 High |
| 6.4 | ADD: Token Budget Awareness | 🟡 Medium |
| 7 | UPDATE: Add 1M token beta info | 🟢 Low |

### 4.4 TEMPLATE-TDD-FRAMEWORK.md

| Section | Change Type | Priority |
|---------|-------------|----------|
| 7.5 | ADD: Visual E2E Testing | 🔴 High |
| 7.6 | ADD: Browser automation patterns | 🔴 High |
| 3.4 | ADD: Rules-based verification emphasis | 🟡 Medium |

### 4.5 TEMPLATE-VALUE-PROPOSITION.md

| Section | Change Type | Priority |
|---------|-------------|----------|
| - | No significant changes | - |

### 4.6 TEMPLATE-AGENT-OKR.md

| Section | Change Type | Priority |
|---------|-------------|----------|
| - | No significant changes | - |

---

## 5. New Content Required

### 5.1 Long-Running Agent Addendum

Create new file: `ADDENDUM-LONG-RUNNING-AGENTS.md`

**Contents:**
- Initializer agent pattern
- Working agent pattern
- Progress file format
- features.json specification
- Git checkpoint pattern
- Session startup routine

### 5.2 Tool Engineering Guide

Create new file: `GUIDE-TOOL-ENGINEERING-ACI.md`

**Contents:**
- ACI design principles
- Poka-yoke patterns
- Tool format optimization
- Common mistakes and fixes
- Tool testing checklist

### 5.3 OAA Ontology Integration Guide

Create new file: `ADDENDUM-OAA-ONTOLOGY-INTEGRATION.md`

**Contents:**
- OAA (Ontology Architect Agent) specification
- Five-layer ontology architecture
- Agent-ontology access matrix by role/process/scope
- OAA Context Provider implementation
- Graph traversal patterns
- Schema.org grounding standards
- Database JSONB storage patterns
- TDD requirements for OAA integration

---

## 6. Validation Checklist

### Core Principles Compliance

| Principle | Status | Evidence |
|-----------|--------|----------|
| ☐ Start simple | ⚠️ Add guidance | Missing complexity scaling |
| ☐ Agent loop pattern | ⚠️ Enhance | Missing verification emphasis |
| ☐ ACI investment | ❌ Add section | Not addressed |
| ☐ Long-running patterns | ❌ Add section | Not addressed |
| ☐ Compaction | ❌ Add section | Not addressed |
| ☐ Token awareness | ⚠️ Add section | Partially addressed |
| ☐ Visual verification | ❌ Add section | Not addressed |
| ☐ Incremental progress | ⚠️ Enhance | Needs one-feature-at-a-time emphasis |

### Workflow Patterns Coverage

| Pattern | Status |
|---------|--------|
| ☐ Augmented LLM | ✅ Covered |
| ☐ Prompt chaining | ⚠️ Mentioned |
| ☐ Routing | ❌ Missing |
| ☐ Parallelization | ⚠️ Partial |
| ☐ Orchestrator-workers | ✅ Covered |
| ☐ Evaluator-optimizer | ❌ Missing |

---

## 7. Recommended Action Plan

### Phase 1: Critical Updates (Immediate)

1. Add Long-Running Agent Harness section
2. Add ACI/Tool Engineering section
3. Add Verification Loop patterns
4. Add Compaction to context engineering

### Phase 2: Important Enhancements (This Week)

5. Add Complexity Scaling guidance
6. Add Visual E2E testing patterns
7. Add Token Budget Awareness
8. Add missing workflow patterns (Routing, Evaluator-Optimizer)

### Phase 3: Polish (Next Week)

9. Add Poka-yoke examples throughout
10. Enhance subagent patterns
11. Add 1M token context beta info
12. Create standalone addendum documents

---

*Validation Report v1.0 | Based on Anthropic Engineering Articles | December 2025*
