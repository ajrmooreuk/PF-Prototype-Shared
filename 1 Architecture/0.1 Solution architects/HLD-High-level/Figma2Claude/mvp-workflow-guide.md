# Figma Make → Token Library → Production Code

## MVP Workflow Guide

**Version:** 1.0.0  
**Focus:** Streamlined pipeline for rapid development  
**Code Connect:** Not required (see Appendix A for future consideration)

---

## Overview

This guide covers the minimal, production-ready workflow for:

1. Generating UI layouts with Figma Make
2. Applying design tokens via MCP extraction
3. Generating production code with Claude Agent SDK

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Figma   │────▶│  MCP    │────▶│ Claude  │────▶│  Code   │
│ Make    │     │ Extract │     │  Agent  │     │  Output │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

---

## Prerequisites

| Requirement | Status | Notes |
|-------------|--------|-------|
| Figma Team/Org account | Required | For library publishing |
| Token Library published | Required | See Setup section |
| Figma MCP connected | Required | Claude integration |
| Claude Agent SDK | Required | Code generation |

---

## Part 1: Token Library Setup

### 1.1 Create Library File

1. Create new Figma file: `[Project] Design Tokens`
2. Save in Team project (not drafts)

### 1.2 Create Variable Collections

| Collection | Modes | Variables |
|------------|-------|-----------|
| Colors | Light, Dark | Primitives + Semantic |
| Spacing | Default | Scale (4, 8, 12, 16...) |
| Border Radius | Default | none, sm, md, lg, full |
| Typography | Default | Families, sizes, weights |

### 1.3 Publish Library

1. File → Libraries → Publish
2. Add version note: "v1.0.0 - Initial tokens"
3. Click Publish

---

## Part 2: Figma Make Workflow

### 2.1 Generate Layout

1. Open Figma Make
2. Describe your UI requirement
3. Generate layout
4. Copy the file URL:
   ```
   https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
   ```

### 2.2 Enable Token Library

1. In the generated file, open Assets panel
2. Click Team Library icon (book)
3. Toggle ON your token library

### 2.3 (Optional) Apply Tokens Manually

If you want to apply tokens before extraction:

1. Select layers
2. Click property field (fill, stroke, radius, etc.)
3. Click Variables icon (⬡)
4. Select from Library tab

**Or skip this** — Claude can map raw values to tokens during code generation.

---

## Part 3: MCP Extraction

### 3.1 Extract Design Context

Provide the Figma URL to Claude and request extraction:

```
Extract the design from:
https://www.figma.com/design/ABC123/MyLayout?node-id=1:2
```

Claude uses:
```
Figma:get_design_context
  fileKey: "ABC123"
  nodeId: "1:2"
```

### 3.2 What You Get Back

The MCP tool returns:

- **Layer hierarchy** — Frame structure and nesting
- **Styles** — Colors, typography, spacing values
- **Layout properties** — Auto layout, constraints
- **Asset URLs** — Images for download

### 3.3 Get Variable Definitions (If Applied)

If tokens were applied manually:

```
Figma:get_variable_defs
  fileKey: "ABC123"
  nodeId: "1:2"
```

Returns mapping of token names to resolved values.

---

## Part 4: Code Generation

### 4.1 Request Code with Token Mapping

After extraction, request code generation:

```
Generate a React component from this design.
Use CSS variables for all colors, spacing, and radii.
Map values to these token patterns:

Colors: --semantic-color-{role}-{variant}
Spacing: --primitive-spacing-{scale}
Radius: --primitive-border-radius-{size}
```

### 4.2 Output Structure

Claude generates:

```
/components
  └── ComponentName.tsx    # React component
  
/styles
  └── tokens.css           # CSS custom properties
  
/tailwind.config.ts        # Theme extension (if using Tailwind)
```

### 4.3 Example Component Output

```tsx
// components/Card.tsx

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--semantic-color-background-default)]",
        "border border-[var(--semantic-color-border-default)]",
        "rounded-[var(--primitive-border-radius-lg)]",
        "p-[var(--primitive-spacing-4)]",
        className
      )}
    >
      {children}
    </div>
  );
}
```

---

## Part 5: Token Mapping Rules

### 5.1 Color Mapping

| Figma Value | Maps To |
|-------------|---------|
| White / #FFFFFF | `semantic/color/background/default` |
| Light gray / #F9FAFB | `semantic/color/background/subtle` |
| Dark text / #111827 | `semantic/color/foreground/default` |
| Blue / #2563EB | `semantic/color/primary/default` |
| Red / #DC2626 | `semantic/color/destructive/default` |

### 5.2 Spacing Mapping (Snap to Nearest)

| Figma Value | Maps To |
|-------------|---------|
| 0-4px | `primitive/spacing/1` (4px) |
| 5-8px | `primitive/spacing/2` (8px) |
| 9-12px | `primitive/spacing/3` (12px) |
| 13-16px | `primitive/spacing/4` (16px) |
| 17-24px | `primitive/spacing/6` (24px) |
| 25-32px | `primitive/spacing/8` (32px) |

### 5.3 Component Detection

| Layer Name Contains | Component Type | Token Prefix |
|---------------------|----------------|--------------|
| button, btn, cta | Button | `component/button/*` |
| input, field, textfield | Input | `component/input/*` |
| card, panel, tile | Card | `component/card/*` |
| avatar, profile-pic | Avatar | `semantic/sizing/avatar/*` |
| icon, ico- | Icon | `semantic/sizing/icon/*` |

---

## Part 6: Quick Reference

### MCP Commands

| Task | Command |
|------|---------|
| Extract design | `Figma:get_design_context` |
| Get variables | `Figma:get_variable_defs` |
| Get file structure | `Figma:get_metadata` |

### Workflow Checklist

- [ ] Token library published
- [ ] Library enabled in Figma Make file
- [ ] Figma URL copied
- [ ] Design extracted via MCP
- [ ] Code generated with token references
- [ ] CSS variables file created
- [ ] Components tested

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP can't access file | Check file is in Team project, not drafts |
| Tokens not showing | Verify library is enabled in file |
| Wrong colors in code | Check token mapping rules |
| Spacing looks off | Values are snapped to nearest token |

---

## Appendix A: Code Connect — When to Add It

### What Is Code Connect?

Code Connect is a **documentation layer** that displays your actual component code inside Figma's Dev Mode. It creates a link between a Figma component and its code implementation.

```
┌─────────────────────────────────────────────────────┐
│  FIGMA DEV MODE (with Code Connect)                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Selected: Button / Primary                         │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  CODE                                       │    │
│  │                                             │    │
│  │  <Button variant="primary">                 │    │
│  │    {children}                               │    │
│  │  </Button>                                  │    │
│  │                                             │    │
│  │  📁 src/components/ui/Button.tsx            │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### What Code Connect Does NOT Do

- ❌ Does not generate code
- ❌ Does not apply tokens
- ❌ Does not affect MCP extraction
- ❌ Does not change runtime behavior
- ❌ Is not required for Claude workflows

### When to Consider Adding Code Connect

| Trigger | Rationale |
|---------|-----------|
| **Team grows beyond 3-5 people** | Reduces "which component do I use?" questions |
| **Dedicated designers join** | They can see code without leaving Figma |
| **Component library stabilizes** | Worth documenting when components aren't changing daily |
| **Developer handoff becomes bottleneck** | Self-serve documentation reduces meetings |
| **Enterprise/client requirements** | Some orgs require formal design-to-code traceability |

### When NOT to Add Code Connect

| Situation | Why Skip It |
|-----------|-------------|
| **Solo developer** | You know your own code |
| **MVP/rapid prototyping** | Components changing too fast |
| **Claude generates all code** | No human reading Figma Dev Mode |
| **Small team, high communication** | Faster to ask than look up |
| **Components don't exist yet** | Nothing to link to |

### How to Add Code Connect (When Ready)

1. **Install Code Connect CLI**
   ```bash
   npm install -g @figma/code-connect
   ```

2. **Create config file**
   ```json
   // figma.config.json
   {
     "codeConnect": {
       "react": "src/components"
     }
   }
   ```

3. **Add Code Connect to component**
   ```tsx
   // src/components/Button.figma.tsx
   import figma from "@figma/code-connect";
   import { Button } from "./Button";

   figma.connect(Button, "https://figma.com/file/ABC123?node-id=1:2", {
     props: {
       variant: figma.enum("Variant", {
         Primary: "primary",
         Secondary: "secondary",
       }),
       children: figma.children("Label"),
     },
     example: ({ variant, children }) => (
       <Button variant={variant}>{children}</Button>
     ),
   });
   ```

4. **Publish to Figma**
   ```bash
   figma code-connect publish
   ```

5. **Use MCP to register**
   ```
   Figma:add_code_connect_map
     fileKey: "ABC123"
     nodeId: "1:2"
     componentName: "Button"
     source: "src/components/Button.tsx"
     label: "React"
   ```

### Code Connect ROI Assessment

Before adding Code Connect, answer these questions:

| Question | If Yes | If No |
|----------|--------|-------|
| Do developers frequently open Figma Dev Mode? | Consider adding | Skip |
| Are designers asking "is this implemented?" | Consider adding | Skip |
| Is your component library stable (< 1 change/week)? | Consider adding | Skip |
| Do you have 30+ components? | Consider adding | Skip |
| Is design-dev handoff a documented pain point? | Consider adding | Skip |

**Score 3+ "Yes" answers = worth adding**  
**Score 0-2 "Yes" answers = skip for now**

### Summary

Code Connect is a **team scaling tool**, not a technical requirement. Add it when:

1. Your team grows
2. Your components stabilize
3. Handoff becomes a bottleneck

For MVP, focus on:
- ✅ Token Library
- ✅ MCP Extraction
- ✅ Claude Code Generation

---

## Appendix B: File Checklist

### Downloadable Files in This Package

| File | Purpose |
|------|---------|
| `figma-token-library-checklist.md` | Step-by-step setup checklist |
| `baiv-design-tokens.json` | Complete token JSON (Schema.org compliant) |
| `token-naming-reference.md` | Naming conventions quick reference |
| `token-mapping-rules.json` | Auto-mapping configuration |
| `mvp-workflow-guide.md` | This document |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial MVP workflow |
