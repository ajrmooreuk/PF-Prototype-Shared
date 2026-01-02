# PFC-PFI-BAIV Figma Design System Unified Guide

**Document Type:** Design System Reference Guide  
**Version:** 1.0.0  
**Platform:** BAIV — Be AI Visible  
**Status:** Active  
**Last Updated:** 2026-01-02  
**Change Control:** Registry-Managed Artifact

---

## Document Control

### Version History

| Version | Date | Author | Changes | Approval |
|---------|------|--------|---------|----------|
| 1.0.0 | 2026-01-02 | PF-Core Design Team | Initial unified guide combining layer naming and token conventions | Pending |

### Related Documents

- **Source Documents:**
  - `figma-ds-layer-naming-cheat-sheet.md` v2.0.0
  - `token-naming-reference.md`
  - `PFC-Figma2Claude-QuickStart-Appendix-A-Tokens.md` v1.0.0
- **Governance:** PF-Core Registry Control
- **Review Cycle:** Quarterly or as needed
- **Stakeholders:** Design Team, Frontend Engineers, Solution Architects

### Change Request Process

All changes to this document must:
1. Create a change request in the PF-Core Registry
2. Document reason and impact analysis
3. Obtain approval from Design Lead and Frontend Architect
4. Update version number according to semantic versioning
5. Publish updated artifact to registry with change notes

---

## Table of Contents

1. [Overview](#overview)
2. [Part 1: Layer Naming Conventions](#part-1-layer-naming-conventions)
3. [Part 2: Token Naming Conventions](#part-2-token-naming-conventions)
4. [Part 3: BAIV Brand Specifications](#part-3-baiv-brand-specifications)
5. [Part 4: Best Practices & Workflows](#part-4-best-practices--workflows)
6. [Part 5: Implementation Checklist](#part-5-implementation-checklist)
7. [Appendix: Quick Reference Tables](#appendix-quick-reference-tables)

---

## Overview

### Purpose

This unified guide establishes comprehensive naming conventions for the BAIV (Be AI Visible) design system implementation in Figma. It covers both **visual layer naming** (the structure of design files) and **design token naming** (variables for colors, spacing, typography, etc.), ensuring consistency across design and development workflows.

### Key Principles

1. **Semantic over Visual** — Name what something IS, not how it looks
2. **Hierarchical Structure** — Use consistent patterns across layers and tokens
3. **Lowercase Convention** — All names use lowercase with specific separators
4. **Slash-Based Hierarchy** — Use forward slashes (`/`) for categorical grouping
5. **Underscore for Internal** — Prefix internal component parts with underscore (`_`)
6. **Hyphen for Multi-Word** — Use hyphens (`-`) within single semantic units
7. **No Spaces Ever** — Spaces break automation and code generation
8. **Aliasing Support** — Tokens reference other tokens for flexibility

### Naming Pattern Structure

```
{category}/{type}/{variant}/{state}
```

**Examples:**
- Layer: `button/primary/hover`
- Token: `semantic/color/primary/default`
- Component: `card/stat`, `icon/menu`

---

## Part 1: Layer Naming Conventions

### 1.1 Foundational Rules

| Rule | Description | Example |
|------|-------------|---------|
| **Lowercase always** | Never use capitals | `button/primary` ✅ not `Button/Primary` ❌ |
| **Hyphens for multi-word** | Connect words in single units | `nav-item` ✅ not `navItem` ❌ |
| **Slashes for hierarchy** | Organize categories | `button/primary/hover` ✅ |
| **No default names** | Remove Frame, Rectangle, Group | Rename all ✅ |
| **Underscore for internal** | Mark component internals | `_icon`, `_label`, `_bg` ✅ |

### 1.2 Page & Section Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| **Page** | `page/{name}` | `page/dashboard`, `page/settings`, `page/profile` |
| **Section** | `section/{name}` | `section/hero`, `section/features`, `section/testimonials` |
| **Header** | `header/{variant}` | `header`, `header/sticky`, `header/transparent` |
| **Footer** | `footer/{variant}` | `footer`, `footer/minimal`, `footer/extended` |
| **Sidebar** | `sidebar/{position}` | `sidebar/left`, `sidebar/right`, `sidebar/collapsible` |
| **Modal** | `modal/{name}` | `modal/login`, `modal/confirm`, `modal/settings` |
| **Dialog** | `dialog/{name}` | `dialog/delete`, `dialog/warning` |
| **Drawer** | `drawer/{position}` | `drawer/left`, `drawer/right` |

### 1.3 Layout Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| **Container** | `container/{size}` | `container/sm`, `container/lg`, `container/full` |
| **Grid** | `grid/{columns}` | `grid/2-col`, `grid/3-col`, `grid/12-col` |
| **Stack** | `stack/{direction}` | `stack/vertical`, `stack/horizontal` |
| **Flex** | `flex/{direction}` | `flex/row`, `flex/column` |
| **Row** | `row/{variant}` | `row`, `row/spaced`, `row/centered` |
| **Column** | `column/{variant}` | `column`, `column/spaced` |
| **Spacer** | `spacer/{size}` | `spacer/sm`, `spacer/md`, `spacer/lg` |
| **Divider** | `divider/{variant}` | `divider`, `divider/vertical`, `divider/subtle` |

### 1.4 Content Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| **Heading** | `heading/{level}` | `heading/h1`, `heading/h2`, `heading/h3` |
| **Body** | `body/{size}` | `body/large`, `body/default`, `body/small` |
| **Caption** | `caption/{variant}` | `caption`, `caption/muted` |
| **Label** | `label/{context}` | `label/form`, `label/badge` |
| **Link** | `link/{variant}` | `link/inline`, `link/standalone`, `link/underline` |
| **Text** | `text/{purpose}` | `text/helper`, `text/error`, `text/description` |
| **Code** | `code/{type}` | `code/inline`, `code/block` |
| **Quote** | `quote/{type}` | `quote/block`, `quote/inline` |

### 1.5 Component Layers

#### Buttons

| Element | Pattern | Examples |
|---------|---------|----------|
| **Primary Button** | `button/primary/{state}` | `button/primary`, `button/primary/hover`, `button/primary/disabled` |
| **Secondary Button** | `button/secondary/{state}` | `button/secondary`, `button/secondary/hover` |
| **Accent Button** | `button/accent/{state}` | `button/accent`, `button/accent/active` |
| **Ghost Button** | `button/ghost/{state}` | `button/ghost`, `button/ghost/hover` |
| **Icon Button** | `button/icon/{state}` | `button/icon`, `button/icon/hover` |

**Internal Structure:**
```
button/primary
├── _bg
├── _icon
└── _label
```

#### Form Elements

| Element | Pattern | Examples |
|---------|---------|----------|
| **Input** | `input/{type}/{state}` | `input/text`, `input/text/focus`, `input/search` |
| **Textarea** | `textarea/{state}` | `textarea`, `textarea/focus` |
| **Select** | `select/{state}` | `select`, `select/open` |
| **Checkbox** | `checkbox/{state}` | `checkbox`, `checkbox/checked` |
| **Radio** | `radio/{state}` | `radio`, `radio/selected` |
| **Switch** | `switch/{state}` | `switch/on`, `switch/off` |
| **Slider** | `slider/{state}` | `slider`, `slider/active` |

#### Display Components

| Element | Pattern | Examples |
|---------|---------|----------|
| **Card** | `card/{variant}` | `card/default`, `card/stat`, `card/product` |
| **Avatar** | `avatar/{size}` | `avatar/sm`, `avatar/md`, `avatar/lg` |
| **Badge** | `badge/{variant}` | `badge/success`, `badge/warning`, `badge/info` |
| **Tag** | `tag/{variant}` | `tag/default`, `tag/removable` |
| **Icon** | `icon/{name}` | `icon/menu`, `icon/close`, `icon/search` |
| **Image** | `image/{type}` | `image/thumbnail`, `image/hero` |
| **Video** | `video/{type}` | `video/inline`, `video/background` |

#### Status & Feedback

| Element | Pattern | Examples |
|---------|---------|----------|
| **Alert** | `alert/{severity}` | `alert/success`, `alert/warning`, `alert/error`, `alert/info` |
| **Toast** | `toast/{type}` | `toast/success`, `toast/error` |
| **Tooltip** | `tooltip/{position}` | `tooltip/top`, `tooltip/bottom` |
| **Progress** | `progress/{type}` | `progress/linear`, `progress/circular` |
| **Spinner** | `spinner/{size}` | `spinner/sm`, `spinner/lg` |
| **Skeleton** | `skeleton/{type}` | `skeleton/text`, `skeleton/image` |

### 1.6 Navigation Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| **Nav** | `nav/{type}` | `nav/primary`, `nav/sidebar`, `nav/footer` |
| **Nav Item** | `nav-item/{state}` | `nav-item/default`, `nav-item/active`, `nav-item/hover` |
| **Breadcrumb** | `breadcrumb/{variant}` | `breadcrumb`, `breadcrumb/compact` |
| **Tabs** | `tabs/{orientation}` | `tabs`, `tabs/vertical` |
| **Tab** | `tab/{state}` | `tab/default`, `tab/active`, `tab/disabled` |
| **Menu** | `menu/{type}` | `menu/dropdown`, `menu/context` |
| **Menu Item** | `menu-item/{state}` | `menu-item/default`, `menu-item/hover` |

### 1.7 Form Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| **Form** | `form/{name}` | `form/login`, `form/settings`, `form/checkout` |
| **Form Field** | `field/{name}` | `field/email`, `field/password`, `field/address` |
| **Form Group** | `form-group/{type}` | `form-group`, `form-group/inline` |
| **Fieldset** | `fieldset/{name}` | `fieldset/personal`, `fieldset/payment` |
| **Legend** | `legend` | `legend` |
| **Error** | `error/{field}` | `error/email`, `error/password` |
| **Helper** | `helper/{field}` | `helper/password`, `helper/phone` |
| **Validation** | `validation/{state}` | `validation/success`, `validation/error` |

### 1.8 State Suffixes

| State | Suffix | Example |
|-------|--------|---------|
| **Default** | (none) | `button/primary` |
| **Hover** | `/hover` | `button/primary/hover` |
| **Active** | `/active` | `button/primary/active` |
| **Focus** | `/focus` | `input/text/focus` |
| **Disabled** | `/disabled` | `button/primary/disabled` |
| **Error** | `/error` | `input/text/error` |
| **Success** | `/success` | `input/text/success` |
| **Loading** | `/loading` | `button/primary/loading` |
| **Pressed** | `/pressed` | `button/primary/pressed` |
| **Selected** | `/selected` | `tab/selected` |
| **Checked** | `/checked` | `checkbox/checked` |
| **Expanded** | `/expanded` | `accordion/expanded` |
| **Collapsed** | `/collapsed` | `accordion/collapsed` |

### 1.9 Anti-Patterns to Avoid

| ❌ Don't | ✅ Do | Reason |
|----------|-------|--------|
| `Frame 1` | `page/dashboard` | Semantic naming required |
| `Rectangle 1` | `card` or `_bg` | Describe purpose not shape |
| `Text 1` | `heading/h1` | Specify content type |
| `Group 1` | `nav/primary` | Name the component |
| `tealButton` | `button/primary` | Avoid color names in layers |
| `BAIVCard` | `card/default` | No brand prefix in layers |
| `main-button` | `button/primary` | Use category/type pattern |
| `btnPrimary` | `button/primary` | Use slashes not camelCase |

---

## Part 2: Token Naming Conventions

### 2.1 Token Architecture Overview

Design tokens follow a **three-tier hierarchy** that provides both consistency and flexibility:

```
COMPONENT (most specific)
    ↓
SEMANTIC (context-aware)
    ↓
PRIMITIVE (raw values)
```

**Example Flow:**
```
component/button/primary/background
    ↓ references
semantic/color/primary/default
    ↓ references
primitive/color/blue/600
    ↓ resolves to
#00A4BF
```

### 2.2 Token Naming Pattern

```
{tier}/{category}/{subcategory}/{variant}/{state}
```

**Tiers:**
- `primitive/` — Raw, design-agnostic values
- `semantic/` — Meaningful, context-aware aliases
- `component/` — Component-specific tokens (optional)

### 2.3 Primitive Tokens

#### Color Primitives

**Pattern:** `primitive/color/{hue}/{scale}`

```
primitive/color/gray/50
primitive/color/gray/100
primitive/color/gray/200
...
primitive/color/gray/900
primitive/color/gray/950

primitive/color/blue/500
primitive/color/blue/600
primitive/color/red/500
primitive/color/green/600
primitive/color/yellow/500
```

**Scale Convention:**
- `50` = Lightest tint
- `100-400` = Light variations
- `500` = Base color
- `600-900` = Dark variations
- `950` = Darkest shade

#### Spacing Primitives

**Pattern:** `primitive/spacing/{scale}`

```
primitive/spacing/0     → 0px
primitive/spacing/1     → 4px
primitive/spacing/2     → 8px
primitive/spacing/3     → 12px
primitive/spacing/4     → 16px
primitive/spacing/5     → 20px
primitive/spacing/6     → 24px
primitive/spacing/8     → 32px
primitive/spacing/10    → 40px
primitive/spacing/12    → 48px
primitive/spacing/16    → 64px
primitive/spacing/20    → 80px
```

**Scale follows 4px baseline grid**

#### Typography Primitives

**Font Families:**
```
primitive/typography/fontFamily/sans
primitive/typography/fontFamily/serif
primitive/typography/fontFamily/mono
primitive/typography/fontFamily/display
```

**Font Sizes:**
```
primitive/typography/fontSize/xs     → 12px
primitive/typography/fontSize/sm     → 14px
primitive/typography/fontSize/base   → 16px
primitive/typography/fontSize/lg     → 18px
primitive/typography/fontSize/xl     → 20px
primitive/typography/fontSize/2xl    → 24px
primitive/typography/fontSize/3xl    → 30px
primitive/typography/fontSize/4xl    → 36px
primitive/typography/fontSize/5xl    → 48px
```

**Font Weights:**
```
primitive/typography/fontWeight/thin        → 100
primitive/typography/fontWeight/extralight  → 200
primitive/typography/fontWeight/light       → 300
primitive/typography/fontWeight/regular     → 400
primitive/typography/fontWeight/medium      → 500
primitive/typography/fontWeight/semibold    → 600
primitive/typography/fontWeight/bold        → 700
primitive/typography/fontWeight/extrabold   → 800
primitive/typography/fontWeight/black       → 900
```

**Line Heights:**
```
primitive/typography/lineHeight/none      → 1
primitive/typography/lineHeight/tight     → 1.25
primitive/typography/lineHeight/snug      → 1.375
primitive/typography/lineHeight/normal    → 1.5
primitive/typography/lineHeight/relaxed   → 1.625
primitive/typography/lineHeight/loose     → 2
```

#### Border Radius Primitives

**Pattern:** `primitive/borderRadius/{size}`

```
primitive/borderRadius/none    → 0
primitive/borderRadius/sm      → 2px
primitive/borderRadius/md      → 4px
primitive/borderRadius/lg      → 8px
primitive/borderRadius/xl      → 12px
primitive/borderRadius/2xl     → 16px
primitive/borderRadius/3xl     → 24px
primitive/borderRadius/full    → 9999px
```

#### Shadow Primitives

**Pattern:** `primitive/shadow/{size}`

```
primitive/shadow/none
primitive/shadow/sm      → 0 1px 2px rgba(0,0,0,0.05)
primitive/shadow/md      → 0 4px 6px rgba(0,0,0,0.1)
primitive/shadow/lg      → 0 10px 15px rgba(0,0,0,0.1)
primitive/shadow/xl      → 0 20px 25px rgba(0,0,0,0.1)
primitive/shadow/2xl     → 0 25px 50px rgba(0,0,0,0.25)
```

### 2.4 Semantic Tokens

#### Color Semantics

**Pattern:** `semantic/color/{role}/{variant}`

**Background Colors:**
```
semantic/color/background/default
semantic/color/background/subtle
semantic/color/background/muted
semantic/color/background/brand
semantic/color/background/inverse
```

**Foreground Colors:**
```
semantic/color/foreground/default
semantic/color/foreground/muted
semantic/color/foreground/subtle
semantic/color/foreground/inverse
```

**Border Colors:**
```
semantic/color/border/default
semantic/color/border/subtle
semantic/color/border/strong
semantic/color/border/muted
```

**Brand Colors:**
```
semantic/color/primary/default
semantic/color/primary/hover
semantic/color/primary/active
semantic/color/primary/subtle
semantic/color/primary/muted

semantic/color/secondary/default
semantic/color/secondary/hover
semantic/color/secondary/active

semantic/color/accent/default
semantic/color/accent/hover
semantic/color/accent/active
```

**Status Colors:**
```
semantic/color/success/default
semantic/color/success/hover
semantic/color/success/subtle
semantic/color/success/muted

semantic/color/warning/default
semantic/color/warning/hover
semantic/color/warning/subtle

semantic/color/error/default
semantic/color/error/hover
semantic/color/error/subtle

semantic/color/info/default
semantic/color/info/hover
semantic/color/info/subtle
```

**Interactive Colors:**
```
semantic/color/interactive/default
semantic/color/interactive/hover
semantic/color/interactive/active
semantic/color/interactive/disabled
```

#### Spacing Semantics

**Pattern:** `semantic/spacing/{context}/{direction}`

```
semantic/spacing/page/x          → Horizontal page padding
semantic/spacing/page/y          → Vertical page padding
semantic/spacing/section         → Between sections
semantic/spacing/container       → Container padding
semantic/spacing/card/padding    → Card internal padding
semantic/spacing/card/gap        → Card content gaps
semantic/spacing/button/x        → Button horizontal padding
semantic/spacing/button/y        → Button vertical padding
semantic/spacing/input/x         → Input horizontal padding
semantic/spacing/input/y         → Input vertical padding
semantic/spacing/stack/default   → Default stack gap
semantic/spacing/stack/tight     → Tight stack gap
semantic/spacing/stack/loose     → Loose stack gap
```

#### Sizing Semantics

**Pattern:** `semantic/sizing/{element}/{size}`

```
semantic/sizing/icon/xs    → 12px
semantic/sizing/icon/sm    → 16px
semantic/sizing/icon/md    → 20px
semantic/sizing/icon/lg    → 24px
semantic/sizing/icon/xl    → 32px

semantic/sizing/avatar/xs  → 24px
semantic/sizing/avatar/sm  → 32px
semantic/sizing/avatar/md  → 40px
semantic/sizing/avatar/lg  → 48px
semantic/sizing/avatar/xl  → 64px

semantic/sizing/button/height/sm
semantic/sizing/button/height/md
semantic/sizing/button/height/lg

semantic/sizing/input/height/sm
semantic/sizing/input/height/md
semantic/sizing/input/height/lg
```

### 2.5 Component Tokens (Optional)

**Pattern:** `component/{component}/{variant}/{property}`

```
component/button/primary/background
component/button/primary/background-hover
component/button/primary/text
component/button/primary/border
component/button/primary/shadow

component/card/default/background
component/card/default/border
component/card/default/shadow
component/card/default/padding

component/input/default/background
component/input/default/border
component/input/default/border-focus
component/input/default/text
component/input/default/placeholder
```

### 2.6 Token Variable Types

| Type | Figma Type | Use Cases | CSS Output |
|------|------------|-----------|------------|
| **Color** | Color | All color values | `--color-primary: #00A4BF;` |
| **Number** | Number | Spacing, sizing, radius, weights | `--spacing-md: 16;` (add unit in CSS) |
| **String** | String | Font families, content | `--font-sans: 'Inter';` |
| **Boolean** | Boolean | Prototyping states | Not typically exported to CSS |

### 2.7 Token Aliasing

Tokens can reference other tokens, creating a cascading system:

```
primitive/color/blue/600 = #00A4BF
    ↓
semantic/color/primary/default = {primitive/color/blue/600}
    ↓
component/button/primary/background = {semantic/color/primary/default}
```

**CSS Output:**
```css
:root {
  --blue-600: #00A4BF;
  --primary-default: var(--blue-600);
  --button-primary-bg: var(--primary-default);
}
```

### 2.8 Mode Naming (Themes)

**Collection:** Colors
```
├── Light        (default mode)
├── Dark
└── High-Contrast (optional)
```

**Collection:** Spacing
```
├── Default      (default mode)
├── Compact
└── Comfortable
```

**Collection:** Border Radius
```
├── Default      (default mode)
├── Sharp
└── Rounded
```

### 2.9 Token Anti-Patterns

| ❌ Don't | ✅ Do | Reason |
|----------|-------|--------|
| `blue-500` | `primitive/color/blue/500` | Missing tier prefix |
| `primaryColor` | `semantic/color/primary/default` | Not hierarchical |
| `btnBg` | `component/button/primary/background` | Abbreviations unclear |
| `sm-padding` | `primitive/spacing/2` | Use semantic tier |
| `heading1` | `textStyle/heading/h1` | Use proper text style naming |
| `Color.Primary` | `semantic/color/primary/default` | Use lowercase |
| `spacing_md` | `semantic/spacing/md` | Use slashes not underscores |

---

## Part 3: BAIV Brand Specifications

### 3.1 BAIV Color System

#### Brand Colors

| Name | Hex | Token Path | Usage |
|------|-----|------------|-------|
| **Primary** | `#00A4BF` | `semantic/color/primary/default` | Primary actions, links, brand presence |
| **Primary Dark** | `#005260` | `semantic/color/primary/active` | Active/pressed states |
| **Secondary** | `#E84E1C` | `semantic/color/secondary/default` | Secondary actions, accents |
| **Accent** | `#CEC528` | `semantic/color/accent/default` | Highlights, emphasis |
| **Neutral** | `#CCE8EE` | `semantic/color/background/brand` | Brand backgrounds, subtle elements |

#### Status Colors

| Name | Hex | Token Path | Usage |
|------|-----|------------|-------|
| **Success** | `#019587` | `semantic/color/success/default` | Success states, confirmations |
| **Warning** | `#CF057D` | `semantic/color/warning/default` | Warnings, cautionary actions |
| **Error** | `#CEC528` | `semantic/color/error/default` | Errors, destructive actions |
| **Info** | `#1C3E8E` | `semantic/color/info/default` | Informational messages |

### 3.2 BAIV Typography

| Element | Font Family | Token |
|---------|-------------|-------|
| **Headings** | Titillium Web | `primitive/typography/fontFamily/display` |
| **Body Text** | Open Sans | `primitive/typography/fontFamily/sans` |
| **Code** | Fira Code / Mono | `primitive/typography/fontFamily/mono` |

### 3.3 BAIV Component Specifications

#### Button Variants

| Variant | Background Token | Text Token | Border Token |
|---------|------------------|------------|--------------|
| **Primary** | `semantic/color/primary/default` | `#FFFFFF` | none |
| **Secondary** | `semantic/color/secondary/default` | `#FFFFFF` | none |
| **Accent** | `semantic/color/accent/default` | `#111827` | none |
| **Ghost** | `transparent` | `semantic/color/primary/default` | `semantic/color/border/default` |

#### Status Components

| Component | Variant | Token Color |
|-----------|---------|-------------|
| **Alert** | Success | `#019587` |
| **Alert** | Warning | `#CF057D` |
| **Alert** | Error | `#CEC528` |
| **Alert** | Info | `#1C3E8E` |
| **Badge** | Success | `#019587` |
| **Badge** | Warning | `#CF057D` |
| **Badge** | Error | `#CEC528` |
| **Badge** | Info | `#1C3E8E` |

---

## Part 4: Best Practices & Workflows

### 4.1 Layer Naming Best Practices

#### 1. Be Consistent
Use the same patterns across all design files. If you name one button `button/primary`, name all buttons following the same pattern.

#### 2. Name During Creation
Don't wait until cleanup—name layers correctly as you create them. This prevents accumulation of default names.

#### 3. Use Auto Layout Names
When using Auto Layout, name the frame according to its purpose, not just "Auto Layout".

#### 4. Group Related Layers
Use consistent prefixes for related components:
```
card/product
├── _image
├── _title
├── _description
└── _cta
```

#### 5. Document Exceptions
If you must deviate from conventions, document why in the layer description.

### 4.2 Token Creation Best Practices

#### 1. Start with Primitives
Define all primitive values before creating semantic tokens. This prevents circular references.

#### 2. Use Semantic Layer
Always create semantic tokens that reference primitives. Avoid components directly referencing primitives.

#### 3. Test Modes
Create and test all modes (Light/Dark) before publishing libraries.

#### 4. Avoid Over-Tokenization
Not every value needs to be a token. Use tokens for:
- Values used multiple times
- Values that change across themes/modes
- Values that map to code

#### 5. Document Token Purpose
Use Figma's description field to explain each token's purpose and usage guidelines.

### 4.3 Publishing Workflow

#### For Layer Changes

1. **Review** — Check all layer names follow conventions
2. **Test** — Verify auto-layout and constraints work correctly
3. **Document** — Update design system documentation
4. **Publish** — Publish library updates
5. **Notify** — Alert team of changes

#### For Token Changes

1. **Update Primitives** — Change raw values if needed
2. **Verify Aliases** — Ensure semantic tokens reference correctly
3. **Test Modes** — Check all theme modes
4. **Extract & Test** — Use Figma MCP to extract and test in code
5. **Publish** — Publish library
6. **Sync Code** — Update CSS variables in codebase

### 4.4 Maintenance & Governance

#### Regular Audits

- **Monthly:** Review new components for naming compliance
- **Quarterly:** Audit entire library for consistency
- **Per Release:** Document all changes in registry

#### Change Control Process

1. **Propose Change** — Create RFC in registry
2. **Impact Analysis** — Assess affected components/screens
3. **Review** — Design lead + Frontend architect approval
4. **Implement** — Make changes with version bump
5. **Document** — Update this guide and registry
6. **Communicate** — Notify all stakeholders

#### Deprecation Strategy

When deprecating tokens or layer patterns:
1. Mark as deprecated in Figma descriptions
2. Document migration path
3. Provide 2 sprint grace period
4. Remove in next major version

---

## Part 5: Implementation Checklist

### ✅ Initial Setup

- [ ] Read and understand complete guide
- [ ] Set up base Figma file structure
- [ ] Create primitive token collections
- [ ] Create semantic token collections
- [ ] Set up theme modes (Light/Dark minimum)
- [ ] Publish as team library
- [ ] Test library in new file

### ✅ Layer Naming Implementation

- [ ] Rename all existing frames from defaults
- [ ] Apply page/section hierarchy
- [ ] Implement component naming patterns
- [ ] Add underscore prefixes to internal parts
- [ ] Apply state suffixes consistently
- [ ] Remove all anti-patterns
- [ ] Document any custom patterns

### ✅ Token Implementation

- [ ] Define all primitive colors (50-950 scale)
- [ ] Define spacing scale (0-20)
- [ ] Define typography primitives
- [ ] Define border radius primitives
- [ ] Create semantic color aliases
- [ ] Create semantic spacing aliases
- [ ] Create semantic sizing aliases
- [ ] Set up component-specific tokens (if needed)
- [ ] Configure all theme modes
- [ ] Test token changes propagate correctly

### ✅ BAIV Brand Integration

- [ ] Apply BAIV brand colors
- [ ] Set BAIV typography (Titillium Web, Open Sans)
- [ ] Configure BAIV status colors
- [ ] Create BAIV component variants
- [ ] Test brand consistency across all components

### ✅ Code Integration

- [ ] Extract tokens via Figma MCP
- [ ] Generate CSS custom properties
- [ ] Map tokens to Tailwind config (if using)
- [ ] Test in development environment
- [ ] Verify theme switching works
- [ ] Document token usage for developers

### ✅ Documentation & Governance

- [ ] Register this guide in PF-Core Registry
- [ ] Create change request templates
- [ ] Set up review schedule
- [ ] Train team on conventions
- [ ] Create quick-reference cheat sheets
- [ ] Set up automated naming checks (if possible)

---

## Appendix: Quick Reference Tables

### A1. Layer Naming Cheat Sheet

```
STRUCTURE: {category}/{type}/{variant}/{state}

CATEGORIES:
page/         Page-level containers
section/      Major page sections
header/       Header regions
footer/       Footer regions
modal/        Modal overlays
drawer/       Slide-out panels
container/    Layout containers
grid/         Grid layouts
stack/        Stack layouts
flex/         Flex layouts
row/          Row layouts
column/       Column layouts
heading/      Heading text
body/         Body text
label/        Labels
button/       All button types
input/        Input fields
select/       Select dropdowns
checkbox/     Checkboxes
radio/        Radio buttons
card/         Card components
avatar/       Avatars
badge/        Badges
icon/         Icons
alert/        Alerts
nav/          Navigation
nav-item/     Nav items
tab/          Tabs
form/         Forms
field/        Form fields

STATES:
/hover        Hover state
/active       Active/pressed
/focus        Focus state
/disabled     Disabled state
/error        Error state
/success      Success state
/loading      Loading state

INTERNAL PARTS:
_bg           Background layer
_icon         Icon element
_label        Text label
_border       Border element
```

### A2. Token Naming Cheat Sheet

```
STRUCTURE: {tier}/{category}/{subcategory}/{variant}

TIERS:
primitive/    Raw design values
semantic/     Meaningful aliases
component/    Component-specific (optional)

COLOR PATTERNS:
primitive/color/{hue}/{scale}
semantic/color/{role}/{variant}
component/{component}/{variant}/background

SPACING PATTERNS:
primitive/spacing/{scale}
semantic/spacing/{context}/{direction}

TYPOGRAPHY PATTERNS:
primitive/typography/fontFamily/{type}
primitive/typography/fontSize/{scale}
primitive/typography/fontWeight/{weight}
primitive/typography/lineHeight/{variant}

SIZING PATTERNS:
semantic/sizing/{element}/{size}

RADIUS PATTERNS:
primitive/borderRadius/{size}

SHADOW PATTERNS:
primitive/shadow/{size}
```

### A3. BAIV Brand Quick Reference

```
BRAND COLORS:
Primary:      #00A4BF    semantic/color/primary/default
Primary Dark: #005260    semantic/color/primary/active
Secondary:    #E84E1C    semantic/color/secondary/default
Accent:       #CEC528    semantic/color/accent/default
Neutral:      #CCE8EE    semantic/color/background/brand

STATUS COLORS:
Success:      #019587    semantic/color/success/default
Warning:      #CF057D    semantic/color/warning/default
Error:        #CEC528    semantic/color/error/default
Info:         #1C3E8E    semantic/color/info/default

TYPOGRAPHY:
Headings:     Titillium Web
Body:         Open Sans
Code:         Fira Code / Monospace
```

### A4. Figma Variable Limits

```
Maximum nesting depth:    4 levels
Maximum name length:      256 characters
Separator character:      / (forward slash)
No spaces allowed:        Use hyphens or slashes
Mode limit:              4 modes per collection (recommended)
```

### A5. CSS Export Examples

```
FROM FIGMA:
semantic/color/primary/default = #00A4BF

TO CSS:
--color-primary-default: #00A4BF;

USAGE:
.button-primary {
  background-color: var(--color-primary-default);
}

FROM FIGMA (ALIASED):
primitive/color/blue/600 = #00A4BF
semantic/color/primary/default = {primitive/color/blue/600}

TO CSS:
:root {
  --blue-600: #00A4BF;
  --primary-default: var(--blue-600);
}
```

---

## Document Registry

### Registry Metadata

```yaml
artifact_type: design_system_guide
artifact_id: PFC-PFI-BAIV-DS-GUIDE-001
version: 1.0.0
status: active
owner: PF-Core Design Team
reviewers:
  - Design Lead
  - Frontend Architect
  - Solution Architect
review_date: 2026-01-02
next_review: 2026-04-02
related_artifacts:
  - figma-ds-layer-naming-cheat-sheet-v2.0.0
  - token-naming-reference-v1.0.0
  - PFC-Figma2Claude-QuickStart-Appendix-A-Tokens-v1.0.0
change_control: true
registry_path: /PF-Core/Design-System/Guides/
```

### Change Log

| Date | Version | Changes | Approved By |
|------|---------|---------|-------------|
| 2026-01-02 | 1.0.0 | Initial unified guide creation | Pending |

---

## Support & Contact

**Questions or Issues:**
- Design System Slack: `#pf-core-design-system`
- Documentation: PF-Prototype-Shared Repository
- Registry: PF-Core Registry Portal

**Maintainers:**
- Design Lead: [Contact Info]
- Frontend Architect: [Contact Info]
- Solution Architect: [Contact Info]

---

**End of Document**

*This is a registry-controlled artifact. All changes must follow the change control process outlined in Section "Document Control".*
