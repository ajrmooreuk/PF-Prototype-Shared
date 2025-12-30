# BAIV 10-Point Alignment Plan

## Figma Make → Production Code Workflow

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2024

---

## Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   FIGMA MAKE  →  10-POINT  →  MCP EXTRACT  →  CLAUDE  →  CODE      │
│                  ALIGNMENT                     AGENT                 │
│                                                                      │
│   AI-generated    BAIV tokens    Design JSON    Generate   React/   │
│   layout          applied                       code       Next.js  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## The 10 Points

| # | Point | Time | Purpose |
|---|-------|------|---------|
| 1 | Prompt Engineering | 5 min | Better AI output with BAIV specs |
| 2 | Enable Token Library | 1 min | Make BAIV tokens available |
| 3 | Frame Architecture | 10 min | Semantic hierarchy |
| 4 | Semantic Naming | 10 min | Clean layer names |
| 5 | Auto Layout Everything | 15 min | Flexbox-ready |
| 6 | Token Binding | 15 min | BAIV colors/spacing bound |
| 7 | Component Extraction | 10 min | Reusable modules |
| 8 | Responsive Setup | 5 min | Fill/Hug/Fixed |
| 9 | MCP Pre-Check | 2 min | Verify ready |
| 10 | Claude Code Generation | 5 min | Production output |

**Total: ~80 min** (first time) → **~40 min** (with practice)

---

## Point 1: Prompt Engineering

### BAIV Prompt Requirements

Always include in Figma Make prompts:

```
Colors:
- Primary: #00A4BF (teal)
- Primary Dark: #005260
- Secondary: #E84E1C (orange)
- Accent: #CEC528 (gold)
- Neutral: #CCE8EE (light teal)

Typography:
- Headings: Titillium Web (400, 600, 700)
- Body: Open Sans (400, 700)

Status Colors:
- Success: #019587
- Warning: #CF057D
- Error: #CEC528
- Info: #1C3E8E
```

### BAIV Dashboard Prompt Template

```
Create a BAIV platform dashboard with:

HEADER:
- BAIV logo left
- Navigation: Dashboard, Analytics, Content, Settings
- User avatar right
- White background, subtle border

SIDEBAR (left):
- Vertical nav with icons
- Active state: teal (#00A4BF)
- Background: light teal (#CCE8EE)

MAIN:
- Page title (Titillium Web, bold)
- 4 stat cards with teal accents
- Chart section
- Activity table

FOOTER:
- Dark teal (#005260)
- White text

Style: BAIV brand
Primary: #00A4BF
Secondary: #E84E1C
Fonts: Open Sans body, Titillium Web headings
```

### Checklist
- [ ] BAIV brand colors specified
- [ ] Font families included
- [ ] All sections listed
- [ ] Layout structure defined

---

## Point 2: Enable Token Library

### Action
Activate BAIV token library in the file.

### Steps
1. Assets panel → Team library icon
2. Find "BAIV Design Tokens"
3. Toggle ON

### Checklist
- [ ] BAIV token library published
- [ ] Library enabled in current file
- [ ] Tokens accessible (test one layer)

---

## Point 3: Frame Architecture

### Target Structure

```
page/{name}
├── header
│   └── container
│       ├── logo
│       ├── nav
│       └── actions
├── main
│   ├── section/{name}
│   │   └── container
│   └── section/{name}
└── footer
```

### Checklist
- [ ] Root frame named `page/{name}`
- [ ] Major sections identified
- [ ] Container wrappers added
- [ ] Nesting ≤ 3 levels

---

## Point 4: Semantic Naming

### Pattern
```
{category}/{type}/{variant}
```

### BAIV Component Names

| Element | Name |
|---------|------|
| Primary button | `button/primary` |
| Secondary button | `button/secondary` |
| Accent button | `button/accent` |
| Card | `card/default` |
| Input | `input/text` |
| Nav item | `nav-item/default` |
| Alert success | `alert/success` |
| Alert warning | `alert/warning` |

### Checklist
- [ ] No default names (Frame 1, Rectangle 2)
- [ ] All layers use category/type pattern
- [ ] Lowercase with hyphens

---

## Point 5: Auto Layout Everything

### Settings by Container

| Container | Direction | Gap Token | Padding Token |
|-----------|-----------|-----------|---------------|
| Page | Vertical | 0 | 0 |
| Header | Horizontal | `spacing/4` | `spacing/4` |
| Section | Vertical | `spacing/6` | `spacing/8` (y) |
| Card | Vertical | `spacing/3` | `spacing/4` |
| Button | Horizontal | `spacing/2` | `spacing/2` / `spacing/4` |

### Checklist
- [ ] All containers use Auto Layout
- [ ] Direction set correctly
- [ ] Gap bound to spacing token
- [ ] Padding bound to spacing token

---

## Point 6: Token Binding (BAIV Specific)

### Required BAIV Token Bindings

| Property | Token Path |
|----------|------------|
| Primary buttons | `semantic/color/primary/default` (#00A4BF) |
| Primary hover | `semantic/color/primary/hover` |
| Primary active | `semantic/color/primary/active` (#005260) |
| Secondary buttons | `semantic/color/secondary/default` (#E84E1C) |
| Accent elements | `semantic/color/accent/default` (#CEC528) |
| Success states | `semantic/color/success/default` (#019587) |
| Warning states | `semantic/color/warning/default` (#CF057D) |
| Error states | `semantic/color/error/default` (#CEC528) |
| Info states | `semantic/color/info/default` (#1C3E8E) |
| Neutral bg | `semantic/color/background/brand` (#CCE8EE) |

### Typography Bindings

| Element | Font Family | Weight |
|---------|-------------|--------|
| Headings | `primitive/typography/fontFamily/heading` | 600-700 |
| Body | `primitive/typography/fontFamily/primary` | 400 |
| Body bold | `primitive/typography/fontFamily/primary` | 700 |

### Checklist
- [ ] All primary colors use BAIV teal tokens
- [ ] Secondary colors use BAIV orange tokens
- [ ] Accent colors use BAIV gold tokens
- [ ] Status colors properly bound
- [ ] Headings use Titillium Web
- [ ] Body uses Open Sans
- [ ] No hardcoded hex values

---

## Point 7: Component Extraction

### BAIV Core Components

| Priority | Component | Variants |
|----------|-----------|----------|
| 1 | Button | primary, secondary, accent, outline, ghost |
| 2 | Card | default, feature, stat |
| 3 | Input | text, password, search |
| 4 | Badge | default, success, warning, error, info |
| 5 | Alert | success, warning, error, info |
| 6 | Avatar | xs, sm, md, lg |
| 7 | Nav Item | default, active |

### Checklist
- [ ] All repeated elements are components
- [ ] Components named `category/name/variant`
- [ ] Variants created
- [ ] Components use BAIV tokens internally

---

## Point 8: Responsive Setup

### Rules

| Element | Width | Height |
|---------|-------|--------|
| Page | Fill | Hug |
| Section | Fill | Hug |
| Container | Fill + max-width | Hug |
| Card (in grid) | Fill | Hug |
| Button | Hug | Fixed |
| Input | Fill | Fixed |

### Checklist
- [ ] Containers Fill width
- [ ] Content Hugs height
- [ ] Max-width on containers (1280px typical)

---

## Point 9: MCP Pre-Check

### Verification Checklist
- [ ] BAIV token library enabled
- [ ] No default layer names
- [ ] All containers use Auto Layout
- [ ] All BAIV colors token-bound
- [ ] Titillium Web for headings
- [ ] Open Sans for body
- [ ] File saved and synced

### BAIV Color Verification

| Element | Expected Color |
|---------|----------------|
| Primary buttons | #00A4BF |
| Secondary buttons | #E84E1C |
| Accent badges | #CEC528 |
| Success states | #019587 |
| Warning states | #CF057D |
| Info states | #1C3E8E |

---

## Point 10: Claude Code Generation

### BAIV Code Request

```
Generate React/Next.js code for BAIV platform.

Requirements:
- TypeScript
- Tailwind CSS with CSS variables
- shadcn/ui components

BAIV Token Variables:
--baiv-primary: #00A4BF
--baiv-primary-dark: #005260
--baiv-secondary: #E84E1C
--baiv-accent: #CEC528
--baiv-neutral: #CCE8EE
--baiv-success: #019587
--baiv-warning: #CF057D
--baiv-error: #CEC528
--baiv-info: #1C3E8E

Typography:
--font-primary: 'Open Sans', sans-serif
--font-heading: 'Titillium Web', sans-serif
```

### Expected Output

```css
/* styles/baiv-tokens.css */

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

### Checklist
- [ ] MCP extraction successful
- [ ] BAIV colors as CSS variables
- [ ] Font imports included
- [ ] Components use token references

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────┐
│  BAIV 10-POINT QUICK CHECK                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  □ 1. PROMPT      Include BAIV colors + fonts                       │
│  □ 2. ENABLE      BAIV token library ON                             │
│  □ 3. FRAMES      page → section → container                        │
│  □ 4. NAMES       category/type/variant                             │
│  □ 5. AUTO LAYOUT Shift+A, bind gaps                                │
│  □ 6. TOKENS      BAIV colors bound (no hex)                        │
│  □ 7. COMPONENTS  Extract repeated elements                         │
│  □ 8. RESPONSIVE  Fill/Hug/Fixed                                    │
│  □ 9. PRE-CHECK   Library, names, colors verified                   │
│  □ 10. GENERATE   MCP → Claude → BAIV code                          │
│                                                                      │
│  BAIV COLORS                                                        │
│  Primary: #00A4BF    Secondary: #E84E1C    Accent: #CEC528          │
│  Success: #019587    Warning: #CF057D      Info: #1C3E8E            │
│                                                                      │
│  BAIV FONTS                                                         │
│  Headings: Titillium Web (600, 700)                                 │
│  Body: Open Sans (400, 700)                                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand integration |
| 1.0.0 | Dec 2024 | Initial 10-point plan |
