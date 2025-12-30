# BAIV MVP Workflow Guide

## Figma Make → Token Library → Production Code

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Focus:** Streamlined pipeline for rapid development  
**Code Connect:** Not required (see Appendix A)

---

## Overview

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Figma   │────▶│  MCP    │────▶│ Claude  │────▶│  BAIV   │
│ Make    │     │ Extract │     │  Agent  │     │  Code   │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

---

## Prerequisites

| Requirement | Status | Notes |
|-------------|--------|-------|
| Figma Team/Org account | Required | For library publishing |
| BAIV Token Library | Required | See Setup section |
| Figma MCP connected | Required | Claude integration |
| Claude Agent SDK | Required | Code generation |

---

## Part 1: BAIV Token Library Setup

### 1.1 Create Library File

1. Create new Figma file: `BAIV Design Tokens`
2. Save in Team project

### 1.2 Create BAIV Color Variables

**Brand Colors (Required):**
```
primitive/color/brand/primary      → #00A4BF
primitive/color/brand/primaryDark  → #005260
primitive/color/brand/secondary    → #E84E1C
primitive/color/brand/accent       → #CEC528
primitive/color/brand/neutral      → #CCE8EE
```

**Status Colors (Required):**
```
primitive/color/status/success     → #019587
primitive/color/status/warning     → #CF057D
primitive/color/status/error       → #CEC528
primitive/color/status/info        → #1C3E8E
```

### 1.3 Create Typography Variables

```
primitive/typography/fontFamily/primary  → Open Sans
primitive/typography/fontFamily/heading  → Titillium Web
```

### 1.4 Publish Library

1. File → Libraries → Publish
2. Version: "v2.0.0 - BAIV brand tokens"
3. Publish

---

## Part 2: Figma Make Workflow

### 2.1 Generate Layout

Include BAIV specs in prompt:

```
Create a BAIV dashboard with:
[sections...]

BAIV COLORS:
Primary: #00A4BF, Secondary: #E84E1C, Accent: #CEC528
Fonts: Titillium Web (headings), Open Sans (body)
```

### 2.2 Enable BAIV Library

1. Assets panel → Team Library icon
2. Toggle ON: "BAIV Design Tokens"

### 2.3 Apply Tokens

Bind all colors to BAIV tokens (or let Claude map during generation).

---

## Part 3: MCP Extraction

### 3.1 Request Format

```
Extract design from:
https://www.figma.com/design/{fileKey}?node-id={nodeId}

This is a BAIV platform design using:
- Primary: #00A4BF
- Secondary: #E84E1C
- Fonts: Open Sans, Titillium Web
```

### 3.2 MCP Commands

| Task | Command |
|------|---------|
| Extract design | `Figma:get_design_context` |
| Get variables | `Figma:get_variable_defs` |

---

## Part 4: Claude Code Generation

### 4.1 BAIV Code Request

```
Generate React/Next.js code for BAIV platform.

Requirements:
- TypeScript
- Tailwind CSS
- shadcn/ui components

BAIV Tokens:
--baiv-primary: #00A4BF
--baiv-primary-dark: #005260
--baiv-secondary: #E84E1C
--baiv-accent: #CEC528
--baiv-neutral: #CCE8EE
--baiv-success: #019587
--baiv-warning: #CF057D
--baiv-info: #1C3E8E

Fonts:
--font-primary: 'Open Sans'
--font-heading: 'Titillium Web'
```

### 4.2 Expected Output

**CSS Variables:**
```css
:root {
  /* BAIV Brand */
  --baiv-primary: #00A4BF;
  --baiv-primary-dark: #005260;
  --baiv-secondary: #E84E1C;
  --baiv-accent: #CEC528;
  --baiv-neutral: #CCE8EE;
  
  /* Status */
  --baiv-success: #019587;
  --baiv-warning: #CF057D;
  --baiv-error: #CEC528;
  --baiv-info: #1C3E8E;
  
  /* Typography */
  --font-primary: 'Open Sans', system-ui, sans-serif;
  --font-heading: 'Titillium Web', system-ui, sans-serif;
}
```

**Font Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## Part 5: BAIV Token Mapping

### Color Mapping

| BAIV Color | Hex | Token |
|------------|-----|-------|
| Primary | #00A4BF | `semantic/color/primary/default` |
| Primary Dark | #005260 | `semantic/color/primary/active` |
| Secondary | #E84E1C | `semantic/color/secondary/default` |
| Accent | #CEC528 | `semantic/color/accent/default` |
| Neutral | #CCE8EE | `semantic/color/background/brand` |
| Success | #019587 | `semantic/color/success/default` |
| Warning | #CF057D | `semantic/color/warning/default` |
| Info | #1C3E8E | `semantic/color/info/default` |

---

## Workflow Checklist

- [ ] BAIV token library published
- [ ] Library enabled in Figma Make file
- [ ] BAIV colors in prompt
- [ ] Design extracted via MCP
- [ ] Code uses BAIV CSS variables
- [ ] Fonts imported correctly

---

## Appendix A: Code Connect (Future)

### What Is Code Connect?

Documentation layer showing code in Figma Dev Mode.

### When to Add It

| Trigger | Rationale |
|---------|-----------|
| Team grows beyond 5 | Reduces handoff questions |
| Components stabilize | Worth documenting |
| Handoff becomes bottleneck | Self-serve docs |

### When NOT to Add It

| Situation | Why Skip |
|-----------|----------|
| Solo developer | You know your code |
| MVP/prototyping | Components changing fast |
| Claude generates code | No human reading Dev Mode |

**For MVP, focus on:**
- ✅ BAIV Token Library
- ✅ MCP Extraction
- ✅ Claude Code Generation

---

## BAIV Quick Reference

### Brand Colors
| Name | Hex |
|------|-----|
| Primary | #00A4BF |
| Primary Dark | #005260 |
| Secondary | #E84E1C |
| Accent | #CEC528 |
| Neutral | #CCE8EE |

### Status Colors
| Name | Hex |
|------|-----|
| Success | #019587 |
| Warning | #CF057D |
| Error | #CEC528 |
| Info | #1C3E8E |

### Typography
| Type | Font | URL |
|------|------|-----|
| Headings | Titillium Web | fonts.google.com |
| Body | Open Sans | fonts.google.com |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand integration |
| 1.0.0 | Dec 2024 | Initial MVP guide |
