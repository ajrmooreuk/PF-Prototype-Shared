# Addendum: Long-Running Agent Patterns

## Anthropic Best Practices Implementation Guide

**Version:** 1.0.0  
**Based On:** Anthropic Engineering - "Effective harnesses for long-running agents"  
**Status:** CRITICAL ADDITION to PF-Agent Strategy  

---

## 1. The Long-Running Agent Problem

### 1.1 Core Challenge

> "The core challenge of long-running agents is that they must work in discrete 
> sessions, and each new session begins with **no memory of what came before**."
> — Anthropic Engineering

**Analogy:** A software project staffed by engineers working in shifts, where each new engineer arrives with no memory of what happened on the previous shift.

### 1.2 Failure Modes Without Proper Harness

| Failure Mode | Description | Impact |
|--------------|-------------|--------|
| **One-Shotting** | Agent tries to do too much at once | Runs out of context mid-implementation |
| **Premature Victory** | Agent declares project complete too early | Missing features, bugs |
| **Context Loss** | New session can't understand previous state | Time wasted reconstructing |
| **Broken State** | Session ends with undocumented half-finished work | Next session can't continue |

---

## 2. Two-Agent Solution

### 2.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    LONG-RUNNING AGENT HARNESS               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FIRST RUN ONLY:                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           INITIALIZER AGENT                          │   │
│  │  • Sets up environment                               │   │
│  │  • Creates features.json                             │   │
│  │  • Creates init.sh                                   │   │
│  │  • Creates claude-progress.txt                       │   │
│  │  • Makes initial git commit                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  ALL SUBSEQUENT RUNS:                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           WORKING AGENT                              │   │
│  │  • Reads progress file                               │   │
│  │  • Reads git history                                 │   │
│  │  • Picks ONE feature to implement                    │   │
│  │  • Tests end-to-end                                  │   │
│  │  • Commits progress                                  │   │
│  │  • Updates progress file                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│                    [REPEAT]                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Why Two Agents?

> "We refer to these as separate agents in this context only because they have 
> **different initial user prompts**. The system prompt, set of tools, and overall 
> agent harness was otherwise identical."
> — Anthropic Engineering

**Key Insight:** Same agent harness, different prompts for initialization vs. working.

---

## 3. Initializer Agent Specification

### 3.1 Purpose

Set up the complete environment that all future working agents will need.

### 3.2 Artifacts Created

| Artifact | Purpose | Format |
|----------|---------|--------|
| `features.json` | Comprehensive feature list | JSON (not Markdown!) |
| `init.sh` | Environment startup script | Bash |
| `claude-progress.txt` | Session progress log | Markdown |
| Initial git commit | Baseline state | Git |

### 3.3 System Prompt Template

```xml
<system_prompt role="initializer_agent">

You are an Initializer Agent setting up a long-running project environment.
Your job is to create all the scaffolding that future Working Agents will need.

## Your Tasks

1. **Analyze Requirements**
   - Carefully read the project specification
   - Identify ALL required features (aim for 50-200 features)
   - Break down complex features into testable units

2. **Create features.json**
   - List EVERY feature the project needs
   - Mark all features as "passes": false
   - Use JSON format (NOT Markdown)
   - Include clear test steps for each feature

3. **Create init.sh**
   - Script to set up the development environment
   - Should start any servers needed
   - Should be idempotent (safe to run multiple times)

4. **Create claude-progress.txt**
   - Initial progress log
   - Document the project setup
   - Leave clear notes for future agents

5. **Make Initial Git Commit**
   - Commit all created files
   - Use descriptive commit message

## Critical Rules

- Be EXHAUSTIVE with the feature list
- Use JSON for features.json because you are less likely to inappropriately 
  modify JSON compared to Markdown
- Every feature must have clear, testable acceptance criteria
- Do NOT start implementing features - only set up the environment

</system_prompt>
```

### 3.4 features.json Specification

```json
{
  "$schema": "https://platform-foundation.ai/schemas/features.json",
  "version": "1.0.0",
  "project": "{Project Name}",
  "created": "{ISO 8601 timestamp}",
  "features": [
    {
      "id": "F001",
      "category": "functional",
      "priority": "critical",
      "description": "User can open a new chat",
      "steps": [
        "Navigate to main interface",
        "Click the 'New Chat' button",
        "Verify a new conversation is created",
        "Check that chat area shows welcome state",
        "Verify conversation appears in sidebar"
      ],
      "passes": false,
      "implemented_in_session": null,
      "notes": null
    },
    {
      "id": "F002",
      "category": "functional",
      "priority": "critical",
      "description": "User can type and send a message",
      "steps": [
        "Open a chat",
        "Type a message in the input field",
        "Press Enter or click Send",
        "Verify message appears in chat"
      ],
      "passes": false,
      "implemented_in_session": null,
      "notes": null
    }
  ],
  "categories": ["functional", "ui", "performance", "security", "accessibility"],
  "priorities": ["critical", "high", "medium", "low"]
}
```

> ⚠️ **Why JSON?** "The model is less likely to inappropriately change or 
> overwrite JSON files compared to Markdown files." — Anthropic

### 3.5 init.sh Template

```bash
#!/bin/bash
# init.sh - Project initialization script
# Created by Initializer Agent
# Safe to run multiple times (idempotent)

set -e  # Exit on error

echo "🚀 Starting project initialization..."

# 1. Check dependencies
echo "Checking dependencies..."
command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm required"; exit 1; }

# 2. Install packages if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# 3. Start development server (background)
echo "Starting development server..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Server already running on port 3000"
else
    npm run dev &
    sleep 5  # Wait for server to start
fi

# 4. Verify server is running
echo "Verifying server..."
curl -s http://localhost:3000 > /dev/null || { echo "Server failed to start"; exit 1; }

echo "✅ Initialization complete!"
echo "Server running at http://localhost:3000"
```

### 3.6 claude-progress.txt Initial Template

```markdown
# Project Progress Log

## Project: {Project Name}
## Started: {Date}
## Status: Initialized

---

## Session 0: Initialization

**Date:** {ISO 8601 timestamp}
**Agent:** Initializer

### Work Completed:
- Created features.json with {N} features
- Created init.sh for environment setup
- Created this progress log
- Made initial git commit

### Feature Status:
- Total Features: {N}
- Completed: 0
- Remaining: {N}

### Next Session Should:
1. Run init.sh to start the environment
2. Pick first high-priority feature from features.json
3. Implement and test the feature
4. Update features.json (only change "passes" field)
5. Commit changes
6. Update this progress log

---

## Session Log

(Future sessions will be logged below)
```

---

## 4. Working Agent Specification

### 4.1 Purpose

Make incremental progress on ONE feature at a time, leaving clean state.

### 4.2 Session Lifecycle

```
┌────────────────────────────────────────────────────────────┐
│                 WORKING AGENT SESSION                       │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  PHASE 1: ORIENTATION (Always First)                       │
│  ├── pwd                          # Know your location     │
│  ├── cat claude-progress.txt      # Recent work            │
│  ├── git log --oneline -20        # Recent commits         │
│  └── cat features.json | jq ...   # Incomplete features    │
│                                                             │
│  PHASE 2: ENVIRONMENT SETUP                                 │
│  ├── ./init.sh                    # Start servers          │
│  └── [Basic smoke test]           # Verify baseline works  │
│                                                             │
│  PHASE 3: WORK (One Feature Only!)                         │
│  ├── Select ONE incomplete feature                         │
│  ├── Implement the feature                                 │
│  ├── Test end-to-end (not just unit tests)                │
│  └── Fix any issues found                                  │
│                                                             │
│  PHASE 4: CLEANUP (Always Before Ending)                   │
│  ├── Update features.json (only "passes" field)           │
│  ├── git add && git commit -m "feat: ..."                 │
│  └── Update claude-progress.txt                            │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### 4.3 System Prompt Template

```xml
<system_prompt role="working_agent">

You are a Working Agent continuing work on an existing project.
Your job is to make incremental progress while leaving a clean state.

## Startup Routine (ALWAYS DO THIS FIRST)

1. Run `pwd` to see your working directory
2. Read `claude-progress.txt` to understand recent work
3. Run `git log --oneline -20` to see recent commits
4. Read `features.json` to find incomplete features
5. Run `./init.sh` to start the development environment
6. Perform a basic smoke test to verify the project still works

## Working Rules

### The ONE Feature Rule
- Work on exactly ONE feature per session
- Do not start a second feature until the first is complete
- If you can't complete a feature, document its state clearly

### Testing Requirements
- Test features END-TO-END, not just with unit tests
- Use browser automation (Playwright/Puppeteer) for UI verification
- Only mark a feature as "passes": true after full verification

### File Modification Rules
- NEVER delete or significantly edit features.json
- Only change the "passes" field from false to true
- NEVER remove features from the list

> ⚠️ "It is unacceptable to remove or edit tests because this could 
> lead to missing or buggy functionality"

### Session Ending Requirements
Before your session ends, you MUST:
1. Ensure the code is in a working state (no broken builds)
2. Commit all changes with descriptive messages
3. Update claude-progress.txt with:
   - What you completed
   - What's in progress (if anything)
   - What the next session should do

## Example Session Flow

```
[You] I'll start by getting my bearings.
[Tool] pwd → /home/project
[Tool] cat claude-progress.txt → (read progress)
[Tool] git log --oneline -20 → (see recent commits)
[Tool] cat features.json | jq '.features[] | select(.passes==false)'

[You] Let me start the environment and verify baseline.
[Tool] ./init.sh
[Tool] (perform smoke test)

[You] Basic functionality is working. I'll work on F003: Chat history.
(implement feature)
(test feature end-to-end)

[You] Feature complete. Updating records.
[Tool] (update features.json "passes" field)
[Tool] git add . && git commit -m "feat: Add chat history F003"
[Tool] (update claude-progress.txt)
```

</system_prompt>
```

### 4.4 Progress Update Template

```markdown
---

## Session {N}: {Date}

**Agent:** Working Agent
**Duration:** {X} minutes
**Context Window:** {Start}% → {End}%

### Work Completed:
- F{XXX}: {Feature description} ✅

### Tests Verified:
- [x] Feature works end-to-end
- [x] No regression in existing features
- [x] Visual verification passed

### In Progress:
- None (clean state)

### Known Issues:
- {Any issues discovered but not blocking}

### Git Commits:
- {hash}: {commit message}

### Next Session Should:
1. Pick next priority feature: F{YYY}
2. {Any specific considerations}

### Notes:
{Any important context for future sessions}

---
```

---

## 5. End-to-End Testing Requirements

### 5.1 The Testing Problem

> "Claude tended to make code changes, and even do testing with unit tests or 
> curl commands against a development server, but would **fail to recognize that 
> the feature didn't work end-to-end**."
> — Anthropic Engineering

### 5.2 Required Testing Approach

```python
# DO NOT: Only unit test
def test_chat_message():
    assert send_message("hello") == "response"  # Too shallow

# DO: End-to-end with browser automation
async def test_chat_message_e2e(browser):
    # Navigate like a user
    await browser.goto("http://localhost:3000")
    
    # Interact like a user
    await browser.click("#new-chat")
    await browser.type("#message-input", "Hello")
    await browser.click("#send")
    
    # Verify like a user would see
    await browser.wait_for_selector(".ai-response")
    response = await browser.text_content(".ai-response")
    assert len(response) > 0
    
    # Visual verification
    screenshot = await browser.screenshot()
    # Analyze screenshot for layout issues
```

### 5.3 Browser Automation via MCP

```python
# Using Playwright MCP for visual verification
from playwright_mcp import PlaywrightMCP

async def verify_feature_visually(feature_id: str, expected: list[str]):
    """Visual verification of feature implementation"""
    browser = PlaywrightMCP()
    
    # Take screenshot of feature
    await browser.goto("http://localhost:3000")
    screenshot = await browser.screenshot()
    
    # Have Claude analyze the screenshot
    analysis = await claude.analyze_image(
        screenshot,
        prompt=f"""
        Verify feature {feature_id}:
        Expected elements:
        {chr(10).join(f'- {e}' for e in expected)}
        
        Check:
        - Are all expected elements visible?
        - Is the layout correct?
        - Are there any error messages?
        - Does the styling look correct?
        """
    )
    
    return analysis
```

### 5.4 Testing Limitations

> ⚠️ "Claude can't see browser-native alert modals through the Puppeteer MCP, 
> and features relying on these modals tended to be buggier as a result."
> — Anthropic Engineering

**Mitigation Strategies:**
1. Replace native `alert()` with custom modals
2. Use console logging for verification
3. Return modal state to the test

---

## 6. Git as Recovery Mechanism

### 6.1 Why Git Matters

Git provides:
- State recovery (revert broken changes)
- Progress documentation (commit messages)
- Change tracking (what was modified)

### 6.2 Commit Patterns

```bash
# After completing a feature
git add .
git commit -m "feat(F001): Add new chat button functionality

- Added NewChatButton component
- Connected to chat state management
- Added keyboard shortcut (Ctrl+N)
- Verified with E2E test

Closes F001"
```

### 6.3 Recovery Commands

```bash
# If current work breaks things
git stash                    # Save current work
git checkout HEAD~1          # Go back one commit
# Verify the project works at this point
git stash pop                # Restore work and debug
```

---

## 7. Integration with PF-Agent Framework

### 7.1 Mapping to Agent Types

| PF-Agent Concept | Long-Running Mapping |
|------------------|---------------------|
| Program Manager Agent | Orchestrator (decides initializer vs working) |
| Discovery Agents | Used within working session for context |
| Generation Agents | Used within working session for implementation |
| Sub-Agents | Parallel search/analysis within session |

### 7.2 Context Engineering Integration

The long-running patterns integrate with context engineering:

```xml
<strategic_context>
  <!-- Standard VSOM context -->
</strategic_context>

<long_running_context>
  <session_number>{N}</session_number>
  <features_remaining>{X}</features_remaining>
  <last_session_summary>{From claude-progress.txt}</last_session_summary>
  <current_feature>{Feature being worked on}</current_feature>
</long_running_context>
```

### 7.3 OKR Alignment

Long-running agent sessions can map to OKRs:

| OKR Element | Mapping |
|-------------|---------|
| Objective | Project completion |
| Key Result 1 | features.json completion percentage |
| Key Result 2 | Test pass rate |
| Key Result 3 | Session productivity (features/session) |

---

## 8. Implementation Checklist

### 8.1 Harness Setup

- [ ] Create initializer agent prompt
- [ ] Create working agent prompt
- [ ] Implement session detection (first run vs subsequent)
- [ ] Set up git integration
- [ ] Configure browser automation MCP

### 8.2 Artifact Templates

- [ ] features.json schema defined
- [ ] init.sh template created
- [ ] claude-progress.txt template created
- [ ] Commit message format defined

### 8.3 Testing Infrastructure

- [ ] Browser automation working
- [ ] Screenshot capture enabled
- [ ] Visual analysis prompt created
- [ ] E2E test framework selected

### 8.4 Recovery Mechanisms

- [ ] Git checkpoint pattern documented
- [ ] Rollback procedures defined
- [ ] State recovery tested

---

## Appendix A: Complete Prompt Examples

### A.1 Initializer Agent Full Prompt

```xml
<system_prompt>
You are an expert software architect setting up a long-running development project.

Your role is the INITIALIZER - you set up the project environment once, and then
future WORKING agents will make incremental progress on the features you define.

## Project Specification
{user_provided_spec}

## Your Deliverables

### 1. features.json
Create a comprehensive JSON file with ALL features needed. Be exhaustive.
Aim for 50-200 features depending on project scope.

Format:
```json
{
  "features": [
    {
      "id": "F001",
      "category": "functional|ui|performance|security",
      "priority": "critical|high|medium|low",
      "description": "Clear description",
      "steps": ["Step 1", "Step 2", "..."],
      "passes": false
    }
  ]
}
```

### 2. init.sh
Create a bash script that:
- Installs dependencies
- Starts the development server
- Is idempotent (safe to run multiple times)

### 3. claude-progress.txt
Create a progress log with:
- Project overview
- Initial feature count
- Instructions for working agents

### 4. Initial Git Commit
Commit all files with message: "chore: Initialize project structure"

## Rules
- Do NOT implement any features
- Be EXHAUSTIVE with the feature list
- Use JSON (not Markdown) for features.json
- Make everything clear for the agents that follow you
</system_prompt>
```

### A.2 Working Agent Full Prompt

```xml
<system_prompt>
You are an expert software developer continuing work on an existing project.

Your role is the WORKING agent - you make incremental progress on features
that were defined by the INITIALIZER agent.

## Mandatory Startup Routine

ALWAYS start your session with these commands:
1. `pwd` - Know your location
2. `cat claude-progress.txt` - Read recent progress
3. `git log --oneline -20` - See recent commits
4. `cat features.json | jq '.features[] | select(.passes==false) | .id'` - Find work
5. `./init.sh` - Start environment
6. Basic smoke test - Verify project works

## The ONE Feature Rule

⚠️ CRITICAL: Work on exactly ONE feature per session.

1. Select the highest-priority incomplete feature
2. Implement it completely
3. Test it END-TO-END (not just unit tests)
4. Update features.json (only change "passes": false → true)
5. Commit your changes
6. Update claude-progress.txt

## File Rules

### features.json
- NEVER delete features
- NEVER edit descriptions or steps
- ONLY change "passes" field from false to true
- ONLY after full E2E verification

### Testing Requirements
- Use browser automation for UI testing
- Test as a user would (click, type, verify)
- Take screenshots for visual verification
- Don't mark complete until E2E passes

## Session End Requirements

Before ending, you MUST:
1. Code is in working state (no broken builds)
2. All changes committed with descriptive messages
3. claude-progress.txt updated with:
   - What you completed
   - Any issues found
   - What next session should do

## Example Session

```
[Agent] Getting my bearings first.
[Tool] pwd
[Tool] cat claude-progress.txt
[Tool] git log --oneline -20
[Tool] cat features.json | jq '...'

[Agent] Starting environment and smoke testing.
[Tool] ./init.sh
[Tool] (basic functionality test)

[Agent] Baseline works. Starting F005: User avatar display.
[Tool] (read relevant files)
[Tool] (implement feature)
[Tool] (run e2e test with browser)

[Agent] Feature complete and tested. Recording progress.
[Tool] (update features.json)
[Tool] git add . && git commit -m "feat(F005): Add user avatar display"
[Tool] (update claude-progress.txt)

[Agent] Session complete. Clean state for next agent.
```
</system_prompt>
```

---

*Addendum Version: 1.0.0 | Based on Anthropic Engineering Research | December 2025*
