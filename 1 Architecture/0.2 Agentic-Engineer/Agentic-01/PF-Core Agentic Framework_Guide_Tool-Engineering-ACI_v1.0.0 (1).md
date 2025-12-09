# Guide: Tool Engineering & Agent-Computer Interface (ACI)

## Anthropic Best Practices for Tool Design

**Version:** 1.0.0  
**Based On:** Anthropic Engineering - "Building Effective Agents"  
**Status:** CRITICAL ADDITION to PF-Agent Strategy  

---

## 1. The ACI Principle

### 1.1 Core Insight

> "Think about how much effort goes into human-computer interfaces (HCI), and 
> **plan to invest just as much effort in creating good agent-computer interfaces (ACI)**."
> — Anthropic Engineering

### 1.2 Tool Engineering Priority

> "We actually spent **more time optimizing our tools than the overall prompt**."
> — Anthropic (on SWE-bench agent)

**Implication:** Tool design is not an afterthought—it's the primary lever for agent performance.

---

## 2. Tool Design Principles

### 2.1 The Model's Perspective Test

> "Put yourself in the model's shoes. Is it obvious how to use this tool, 
> based on the description and parameters, or would you need to think carefully 
> about it? If so, then it's probably also true for the model."
> — Anthropic Engineering

**Self-Test Questions:**
1. Could a junior developer use this tool correctly from docs alone?
2. Are edge cases documented?
3. Is the boundary between this tool and similar tools clear?
4. Are examples provided?

### 2.2 The Three Format Rules

| Rule | Rationale | Example |
|------|-----------|---------|
| **Give tokens to think** | Model needs planning space before committing | Don't require line counts upfront |
| **Keep format natural** | Close to training data | Markdown over escaped JSON |
| **No formatting overhead** | Avoid counting, escaping | Full file rewrites over diffs |

### 2.3 Format Comparison

| Format | Recommendation | Reason |
|--------|---------------|--------|
| **Diffs** | ⚠️ Avoid | Requires accurate line counting in chunk header |
| **JSON-wrapped code** | ⚠️ Avoid | Requires escaping newlines and quotes |
| **Markdown code blocks** | ✅ Prefer | Natural, no escaping needed |
| **Full file rewrites** | ✅ Prefer | No tracking state required |
| **Relative paths** | ⚠️ Avoid | Breaks when agent moves directories |
| **Absolute paths** | ✅ Prefer | Always unambiguous |

---

## 3. Poka-Yoke Tool Design

### 3.1 What is Poka-Yoke?

> "[Poka-yoke](https://en.wikipedia.org/wiki/Poka-yoke) your tools. Change the 
> arguments so that it is harder to make mistakes."
> — Anthropic Engineering

**Definition:** Error-proofing through design constraints that prevent mistakes before they happen.

### 3.2 The Filepath Example

**Anthropic's Experience:**
> "We found that the model would make mistakes with tools using relative filepaths 
> after the agent had moved out of the root directory. To fix this, we changed the 
> tool to always require absolute filepaths—and we found that the model used this 
> method flawlessly."

**Before (Error-Prone):**
```json
{
  "name": "edit_file",
  "description": "Edit a file",
  "parameters": {
    "path": {
      "type": "string",
      "description": "Path to the file (relative or absolute)"
    },
    "content": {
      "type": "string",
      "description": "New content for the file"
    }
  }
}
```

**After (Poka-Yoke):**
```json
{
  "name": "edit_file",
  "description": "Edit a file. Always use absolute paths.",
  "parameters": {
    "absolute_path": {
      "type": "string",
      "description": "Absolute path to the file. MUST start with /",
      "pattern": "^/.*"
    },
    "content": {
      "type": "string",
      "description": "New content for the file"
    }
  }
}
```

### 3.3 Common Poka-Yoke Patterns

| Issue | Poka-Yoke Solution |
|-------|-------------------|
| Relative vs absolute paths | Only accept absolute paths with validation |
| Optional vs required fields | Make critical fields required, not optional |
| Ambiguous parameter names | Use explicit names like `target_user_id` not just `id` |
| Missing context | Include context in parameter description |
| Format ambiguity | Provide explicit format with examples |
| Dangerous operations | Add `confirm: true` required parameter |

### 3.4 Poka-Yoke Examples

#### Example 1: Database Query Tool

**Before:**
```json
{
  "name": "query_database",
  "parameters": {
    "query": {"type": "string"}
  }
}
```

**After (Poka-Yoke):**
```json
{
  "name": "query_database",
  "description": "Execute a read-only SQL query. Only SELECT statements allowed.",
  "parameters": {
    "select_query": {
      "type": "string",
      "description": "SQL SELECT query. Must start with 'SELECT'. No INSERT/UPDATE/DELETE.",
      "pattern": "^SELECT\\s+"
    },
    "limit": {
      "type": "integer",
      "description": "Maximum rows to return",
      "default": 100,
      "maximum": 1000
    }
  }
}
```

#### Example 2: Email Tool

**Before:**
```json
{
  "name": "send_email",
  "parameters": {
    "to": {"type": "string"},
    "subject": {"type": "string"},
    "body": {"type": "string"}
  }
}
```

**After (Poka-Yoke):**
```json
{
  "name": "send_email",
  "description": "Send an email. Requires confirmation for external recipients.",
  "parameters": {
    "recipient_email": {
      "type": "string",
      "description": "Email address. Must be valid format.",
      "pattern": "^[^@]+@[^@]+\\.[^@]+$"
    },
    "subject_line": {
      "type": "string",
      "description": "Email subject. Max 200 characters.",
      "maxLength": 200
    },
    "body_text": {
      "type": "string",
      "description": "Plain text email body."
    },
    "is_external_recipient": {
      "type": "boolean",
      "description": "Set to true if recipient is outside organization. Triggers review."
    },
    "confirm_send": {
      "type": "boolean",
      "description": "Must be true to actually send. Prevents accidental sends."
    }
  },
  "required": ["recipient_email", "subject_line", "body_text", "confirm_send"]
}
```

#### Example 3: File Delete Tool

**Before:**
```json
{
  "name": "delete_file",
  "parameters": {
    "path": {"type": "string"}
  }
}
```

**After (Poka-Yoke):**
```json
{
  "name": "delete_file",
  "description": "Delete a file. DANGEROUS operation. Requires explicit confirmation.",
  "parameters": {
    "absolute_path": {
      "type": "string",
      "description": "Absolute path to file. Must start with /. Cannot be system paths.",
      "pattern": "^/(?!etc|bin|sbin|usr|lib|var/log).*"
    },
    "confirm_filename": {
      "type": "string", 
      "description": "Must match the exact filename (not path) as confirmation."
    },
    "reason": {
      "type": "string",
      "description": "Explanation for why this file should be deleted. Required for audit."
    }
  },
  "required": ["absolute_path", "confirm_filename", "reason"]
}
```

---

## 4. Tool Documentation Standards

### 4.1 What Good Documentation Includes

> "A good tool definition often includes **example usage**, **edge cases**, 
> **input format requirements**, and **clear boundaries from other tools**."
> — Anthropic Engineering

### 4.2 Tool Documentation Template

```json
{
  "name": "{tool_name}",
  "description": "{Clear one-line description of what this tool does}",
  
  "detailed_description": `
    ## Purpose
    {Detailed explanation of the tool's purpose}
    
    ## When to Use
    - {Scenario 1}
    - {Scenario 2}
    
    ## When NOT to Use
    - {Anti-pattern 1} - Use {other_tool} instead
    - {Anti-pattern 2} - Use {other_tool} instead
    
    ## Examples
    
    ### Basic Usage
    \`\`\`json
    {
      "param1": "example_value",
      "param2": 123
    }
    \`\`\`
    
    ### Edge Case: {Description}
    \`\`\`json
    {
      "param1": "edge_case_value"
    }
    \`\`\`
    
    ## Common Errors
    - {Error 1}: {How to fix}
    - {Error 2}: {How to fix}
  `,
  
  "parameters": {
    "{param_name}": {
      "type": "{type}",
      "description": "{Clear description with format if applicable}",
      "required": true,
      "examples": ["{example1}", "{example2}"],
      "constraints": "{Any validation rules}"
    }
  },
  
  "returns": {
    "type": "{return_type}",
    "description": "{What the tool returns}",
    "example": "{Example return value}"
  },
  
  "errors": [
    {
      "code": "{error_code}",
      "description": "{When this error occurs}",
      "resolution": "{How to fix it}"
    }
  ],
  
  "related_tools": [
    {
      "name": "{related_tool}",
      "relationship": "{When to use that tool instead}"
    }
  ]
}
```

### 4.3 Naming Conventions

| Aspect | Convention | Example |
|--------|-----------|---------|
| Tool name | `verb_noun` | `search_files`, `create_user` |
| Parameter names | `adjective_noun` | `target_directory`, `max_results` |
| Boolean params | `is_` or `has_` prefix | `is_recursive`, `has_attachments` |
| ID params | Explicit type | `user_id`, `document_id` not just `id` |

### 4.4 Distinguishing Similar Tools

> "This is especially important when using many similar tools."
> — Anthropic Engineering

**Example: Multiple Search Tools**

```json
// Tool 1
{
  "name": "search_files_by_name",
  "description": "Search for files by filename pattern. Fast, uses filesystem index. Use for known filenames.",
  "when_to_use": "You know part of the filename",
  "when_not_to_use": "You need to search file contents - use search_files_by_content instead"
}

// Tool 2
{
  "name": "search_files_by_content",
  "description": "Search for files by content. Slower, reads file contents. Use for finding specific text.",
  "when_to_use": "You need to find files containing specific text",
  "when_not_to_use": "You only know the filename - use search_files_by_name instead"
}

// Tool 3
{
  "name": "search_files_semantic",
  "description": "Semantic search across files. Uses embeddings. Use for conceptual matches.",
  "when_to_use": "You need to find conceptually related content",
  "when_not_to_use": "You need exact text match - use search_files_by_content instead"
}
```

---

## 5. Context Efficiency in Tools

### 5.1 The Context Window Consideration

> "Tools are prominent in Claude's context window, making them the **primary 
> actions Claude will consider** when deciding how to complete a task."
> — Anthropic Engineering

**Implication:** Tool definitions consume tokens. Design for efficiency.

### 5.2 Tool Definition Size Guidelines

| Tool Complexity | Max Definition Size | Guidance |
|-----------------|---------------------|----------|
| Simple | ~200 tokens | Name + params + brief description |
| Medium | ~500 tokens | Add examples, edge cases |
| Complex | ~1000 tokens | Full documentation |

### 5.3 Strategies for Large Tool Sets

If you have many tools:

1. **Group related tools** - Reduce cognitive load
2. **Use consistent patterns** - Model learns patterns faster
3. **Provide routing hints** - Help model choose right tool
4. **Consider tool selection agent** - Separate tool choice from execution

```python
# Pattern: Tool Selection First
@agent.tool
async def select_appropriate_tool(task_description: str) -> str:
    """
    Given a task, return the name of the best tool to use.
    This saves context by not loading all tool definitions upfront.
    """
    # This tool has access to tool metadata without full definitions
    pass
```

---

## 6. Testing Tools

### 6.1 Tool Testing Framework

> "Test how the model uses your tools: Run many example inputs in our workbench 
> to see what mistakes the model makes, and iterate."
> — Anthropic Engineering

### 6.2 Test Categories

| Category | What to Test | Example |
|----------|--------------|---------|
| **Happy Path** | Normal usage | Tool works with valid inputs |
| **Edge Cases** | Boundary conditions | Empty inputs, max values |
| **Error Handling** | Invalid inputs | Wrong types, missing params |
| **Disambiguation** | Similar tools | Model picks right tool |
| **Integration** | Tool chains | Tools work together |

### 6.3 Tool Testing Template

```python
"""
Tool Testing Suite
==================
Tests tool definitions for clarity and model usability
"""

import pytest
from anthropic import Anthropic

client = Anthropic()

class TestToolUsability:
    """Test that model can use tools correctly"""
    
    @pytest.fixture
    def tool_definition(self):
        return {
            "name": "search_files",
            "description": "...",
            "parameters": {...}
        }
    
    @pytest.mark.parametrize("task,expected_params", [
        ("Find all Python files", {"pattern": "*.py"}),
        ("Search for config files", {"pattern": "*.config*"}),
        ("Find files modified today", {"modified_after": "today"}),
    ])
    async def test_model_generates_correct_params(
        self, tool_definition, task, expected_params
    ):
        """Model should generate correct parameters for task"""
        response = await client.messages.create(
            model="claude-sonnet-4-5-20250514",
            max_tokens=500,
            tools=[tool_definition],
            messages=[{"role": "user", "content": task}]
        )
        
        tool_use = response.content[0]
        assert tool_use.type == "tool_use"
        assert tool_use.name == "search_files"
        
        for key, value in expected_params.items():
            assert tool_use.input.get(key) == value


class TestToolDisambiguation:
    """Test that model chooses correct tool among similar options"""
    
    @pytest.fixture
    def similar_tools(self):
        return [
            {"name": "search_by_name", "description": "Search files by filename"},
            {"name": "search_by_content", "description": "Search files by content"},
            {"name": "search_semantic", "description": "Semantic search"},
        ]
    
    @pytest.mark.parametrize("task,expected_tool", [
        ("Find file named config.json", "search_by_name"),
        ("Find files containing 'API_KEY'", "search_by_content"),
        ("Find documents about authentication", "search_semantic"),
    ])
    async def test_model_selects_correct_tool(
        self, similar_tools, task, expected_tool
    ):
        """Model should select appropriate tool for task"""
        response = await client.messages.create(
            model="claude-sonnet-4-5-20250514",
            max_tokens=500,
            tools=similar_tools,
            messages=[{"role": "user", "content": task}]
        )
        
        tool_use = response.content[0]
        assert tool_use.name == expected_tool


class TestToolErrorHandling:
    """Test tool handles errors gracefully"""
    
    async def test_model_handles_tool_error(self, tool_definition):
        """Model should handle tool errors and try alternatives"""
        # Simulate tool returning an error
        messages = [
            {"role": "user", "content": "Search for config files"},
            {"role": "assistant", "content": [{"type": "tool_use", "name": "search_files", "input": {"pattern": "*.config"}}]},
            {"role": "user", "content": [{"type": "tool_result", "content": "Error: Permission denied"}]}
        ]
        
        response = await client.messages.create(
            model="claude-sonnet-4-5-20250514",
            max_tokens=500,
            tools=[tool_definition],
            messages=messages
        )
        
        # Model should acknowledge error and try different approach
        assert "error" in response.content[0].text.lower() or \
               "permission" in response.content[0].text.lower()
```

---

## 7. Tool Design Checklist

### 7.1 Pre-Implementation Checklist

| # | Check | Status |
|---|-------|--------|
| 1 | Tool name is `verb_noun` format | ☐ |
| 2 | Description is clear in one line | ☐ |
| 3 | Parameters have explicit, unambiguous names | ☐ |
| 4 | Required vs optional clearly marked | ☐ |
| 5 | Examples included in description | ☐ |
| 6 | Edge cases documented | ☐ |
| 7 | Boundaries with similar tools clear | ☐ |
| 8 | Poka-yoke constraints applied | ☐ |
| 9 | No relative paths (use absolute) | ☐ |
| 10 | No counting requirements (line numbers, etc.) | ☐ |

### 7.2 Post-Implementation Checklist

| # | Check | Status |
|---|-------|--------|
| 1 | Tested with happy path examples | ☐ |
| 2 | Tested with edge cases | ☐ |
| 3 | Tested error handling | ☐ |
| 4 | Tested disambiguation from similar tools | ☐ |
| 5 | Model generates correct params consistently | ☐ |
| 6 | Tool definition fits in context budget | ☐ |
| 7 | Integrated with tool chain | ☐ |

---

## 8. MCP Tool Integration

### 8.1 MCP Overview

> "The Model Context Protocol (MCP) provides standardized integrations to external 
> services, handling authentication and API calls automatically."
> — Anthropic Engineering

### 8.2 MCP Best Practices

1. **Use existing MCP servers** when available
2. **Follow MCP conventions** for custom tools
3. **Test MCP integrations** thoroughly
4. **Handle MCP errors** gracefully

### 8.3 Common MCP Servers

| MCP Server | Purpose | Use Case |
|------------|---------|----------|
| Playwright | Browser automation | E2E testing, visual verification |
| GitHub | Repository operations | Code search, PR management |
| Slack | Team communication | Notifications, context gathering |
| Google Drive | Document access | Document analysis |
| Notion | Knowledge base | Documentation access |

---

## Appendix: Tool Definition Examples

### A.1 File Operations Suite

```json
{
  "tools": [
    {
      "name": "read_file",
      "description": "Read the contents of a file. Returns the full file content as text.",
      "parameters": {
        "absolute_path": {
          "type": "string",
          "description": "Absolute path to the file. Must start with /",
          "pattern": "^/",
          "required": true
        }
      },
      "returns": "File contents as string",
      "errors": ["FileNotFound", "PermissionDenied", "IsDirectory"]
    },
    {
      "name": "write_file",
      "description": "Write content to a file. Creates file if it doesn't exist. Overwrites if it does.",
      "parameters": {
        "absolute_path": {
          "type": "string",
          "description": "Absolute path for the file. Must start with /",
          "pattern": "^/",
          "required": true
        },
        "content": {
          "type": "string",
          "description": "Content to write to the file",
          "required": true
        },
        "create_directories": {
          "type": "boolean",
          "description": "If true, create parent directories if they don't exist",
          "default": false
        }
      }
    },
    {
      "name": "list_directory",
      "description": "List contents of a directory. Returns files and subdirectories.",
      "parameters": {
        "absolute_path": {
          "type": "string",
          "description": "Absolute path to directory. Must start with /",
          "pattern": "^/",
          "required": true
        },
        "include_hidden": {
          "type": "boolean",
          "description": "Include hidden files (starting with .)",
          "default": false
        },
        "recursive": {
          "type": "boolean",
          "description": "List subdirectories recursively",
          "default": false
        }
      }
    }
  ]
}
```

### A.2 Search Suite

```json
{
  "tools": [
    {
      "name": "search_files_by_name",
      "description": "Search for files by filename pattern. Fast, uses filesystem index. Use when you know part of the filename.",
      "when_to_use": "You know the filename or extension",
      "when_not_to_use": "You need to search file contents - use search_files_by_content instead",
      "parameters": {
        "directory": {
          "type": "string",
          "description": "Absolute path to search from. Must start with /",
          "pattern": "^/",
          "required": true
        },
        "pattern": {
          "type": "string",
          "description": "Glob pattern for filename. Examples: '*.py', 'config.*', '*test*'",
          "required": true,
          "examples": ["*.py", "config.*", "*test*.js"]
        },
        "max_results": {
          "type": "integer",
          "description": "Maximum number of results to return",
          "default": 50,
          "maximum": 500
        }
      }
    },
    {
      "name": "search_files_by_content",
      "description": "Search for files containing specific text. Slower, reads file contents. Use when you need to find specific text inside files.",
      "when_to_use": "You need to find files containing specific text",
      "when_not_to_use": "You only know the filename - use search_files_by_name instead",
      "parameters": {
        "directory": {
          "type": "string",
          "description": "Absolute path to search from. Must start with /",
          "pattern": "^/",
          "required": true
        },
        "search_text": {
          "type": "string",
          "description": "Text to search for inside files",
          "required": true
        },
        "file_pattern": {
          "type": "string",
          "description": "Optional glob pattern to filter files before searching",
          "default": "*"
        },
        "case_sensitive": {
          "type": "boolean",
          "description": "Whether search is case sensitive",
          "default": false
        }
      }
    }
  ]
}
```

---

*Guide Version: 1.0.0 | Based on Anthropic Engineering Best Practices | December 2025*
