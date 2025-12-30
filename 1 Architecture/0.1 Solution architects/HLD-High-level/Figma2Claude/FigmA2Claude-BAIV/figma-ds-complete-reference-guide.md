# BAIV Design System — Complete Reference Guide

## Figma Make → Token Library → MCP → Claude Agent SDK → Production Code

**Version:** 2.0.0  
**Last Updated:** December 2024  
**Platform:** BAIV — Be AI Visible  
**Scope:** End-to-end design system workflow

---

# Table of Contents

1. [Overview](#1-overview)
2. [BAIV Brand Tokens](#2-baiv-brand-tokens)
3. [Token Library Setup](#3-token-library-setup)
4. [Naming Conventions](#4-naming-conventions)
5. [10-Point Alignment Plan](#5-10-point-alignment-plan)
6. [Figma Make Prompts](#6-figma-make-prompts)
7. [Enforcement & Validation](#7-enforcement--validation)
8. [MCP Extraction](#8-mcp-extraction)
9. [Claude Code Generation](#9-claude-code-generation)
10. [Appendix](#10-appendix)

---

# 1. Overview

## The Pipeline

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

## Requirements

| Requirement | Purpose | Required? |
|-------------|---------|-----------|
| Figma Team/Org Account | Library publishing | ✅ Yes |
| BAIV Token Library | Design variables | ✅ Yes |
| Figma MCP | Design extraction | ✅ Yes |
| Claude Agent SDK | Code generation | ✅ Yes |
| Code Connect | Dev handoff docs | ❌ Optional |

---

# 2. BAIV Brand Tokens

## 2.1 Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#00A4BF` | Main brand color, CTAs, links |
| **Primary Light** | `#00A4BF` | Hover states, highlights |
| **Primary Dark** | `#005260` | Active states, emphasis |
| **Secondary** | `#E84E1C` | Secondary actions, accents |
| **Accent** | `#CEC528` | Highlights, badges, alerts |
| **Neutral Base** | `#CCE8EE` | Backgrounds, cards |

## 2.2 Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Success** | `#019587` | Success states, confirmations |
| **Warning** | `#CF057D` | Warnings, cautions |
| **Error** | `#CEC528` | Errors, destructive actions |
| **Info** | `#1C3E8E` | Information, notices |

## 2.3 Typography

| Type | Font Family | Weights | URL |
|------|-------------|---------|-----|
| **Primary (Body)** | Open Sans | 400, 700 | `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700` |
| **Heading** | Titillium Web | 400, 600, 700 | `https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700` |

## 2.4 Color Scales

### Primary Scale (Teal)
```
primary/50   → #E6F7FA
primary/100  → #CCE8EE (Neutral Base)
primary/200  → #99D6E2
primary/300  → #66C4D6
primary/400  → #33B4CA
primary/500  → #00A4BF (Brand Primary)
primary/600  → #008A9F
primary/700  → #006F7F
primary/800  → #005260 (Brand Primary Dark)
primary/900  → #003640
primary/950  → #001A20
```

### Secondary Scale (Orange)
```
secondary/50  → #FEF0EC
secondary/500 → #E84E1C (Brand Secondary)
secondary/900 → #551808
```

### Accent Scale (Gold)
```
accent/50   → #FDFCE8
accent/500  → #CEC528 (Brand Accent)
accent/900  → #36300B
```

## 2.5 Brand Assets (Placeholders)

| Asset | Description |
|-------|-------------|
| Logo Primary | Main logo URL |
| Logo Icon | Icon-only version |
| Logo White | Reversed/white version |
| Favicon ICO | .ico format |
| Favicon SVG | .svg format |
| Favicon PNG 192 | 192x192 PNG |
| Favicon PNG 512 | 512x512 PNG |
| Hero Image | Default hero image |
| OG Image | Social sharing image |

---

# 3. Token Library Setup

## 3.1 Create Library File

1. Create new Figma file: `BAIV Design Tokens`
2. Save in Team project
3. Add cover page with BAIV branding

## 3.2 Variable Collections

| Collection | Modes | Content |
|------------|-------|---------|
| Colors | Light, Dark | Brand + semantic colors |
| Typography | Default | Open Sans, Titillium Web |
| Spacing | Default, Compact | Spacing scale |
| Sizing | Default | Icons, avatars |
| Border Radius | Default | Radius scale |

## 3.3 Create BAIV Color Variables

### Brand Colors (Required)
```
primitive/color/brand/primary      → #00A4BF
primitive/color/brand/primaryLight → #00A4BF
primitive/color/brand/primaryDark  → #005260
primitive/color/brand/secondary    → #E84E1C
primitive/color/brand/accent       → #CEC528
primitive/color/brand/neutral      → #CCE8EE
```

### Status Colors (Required)
```
primitive/color/status/success     → #019587
primitive/color/status/warning     → #CF057D
primitive/color/status/error       → #CEC528
primitive/color/status/info        → #1C3E8E
```

### Semantic Colors
```
semantic/color/primary/default     → {brand/primary}
semantic/color/primary/hover       → {primary/600}
semantic/color/primary/active      → {brand/primaryDark}
semantic/color/secondary/default   → {brand/secondary}
semantic/color/accent/default      → {brand/accent}
semantic/color/success/default     → {status/success}
semantic/color/warning/default     → {status/warning}
semantic/color/error/default       → {status/error}
semantic/color/info/default        → {status/info}
```

## 3.4 Create Typography Variables

```
primitive/typography/fontFamily/primary  → Open Sans
primitive/typography/fontFamily/heading  → Titillium Web
primitive/typography/fontFamily/mono     → JetBrains Mono

primitive/typography/fontWeight/regular  → 400
primitive/typography/fontWeight/semibold → 600
primitive/typography/fontWeight/bold     → 700
```

## 3.5 Publish Library

1. File → Libraries → Publish
2. Version note: "v2.0.0 - BAIV brand tokens"
3. Click Publish

---

# 4. Naming Conventions

## 4.1 Token Naming

```
{tier}/{category}/{type}/{variant}
```

| Tier | Purpose | Example |
|------|---------|---------|
| `primitive` | Raw values | `primitive/color/brand/primary` |
| `semantic` | Contextual | `semantic/color/primary/default` |
| `component` | Component-specific | `component/button/primary/background` |

## 4.2 Layer Naming

```
{category}/{type}/{variant}
```

| Category | Examples |
|----------|----------|
| Page | `page/dashboard`, `page/home` |
| Section | `section/hero`, `section/features` |
| Component | `button/primary`, `card/feature` |
| Content | `heading/h1`, `body/default` |

---

# 5. 10-Point Alignment Plan

| # | Point | Time | Purpose |
|---|-------|------|---------|
| 1 | Prompt Engineering | 5 min | Better AI output |
| 2 | Enable Token Library | 1 min | Make BAIV tokens available |
| 3 | Frame Architecture | 10 min | Semantic hierarchy |
| 4 | Semantic Naming | 10 min | Clean layer names |
| 5 | Auto Layout Everything | 15 min | Flexbox-ready |
| 6 | Token Binding | 15 min | BAIV colors/spacing |
| 7 | Component Extraction | 10 min | Reusable modules |
| 8 | Responsive Setup | 5 min | Fill/Hug/Fixed |
| 9 | MCP Pre-Check | 2 min | Verify ready |
| 10 | Claude Code Generation | 5 min | Production output |

**Total: ~80 min** (first time) → **~40 min** (with practice)

---

# 6. Figma Make Prompts

## 6.1 BAIV Dashboard Prompt

```
Create a BAIV platform dashboard with:

HEADER:
- BAIV logo left (placeholder)
- Primary navigation: Dashboard, Analytics, Content, Settings
- User avatar and dropdown right
- Background: white, border bottom

SIDEBAR (left, 240px):
- Vertical nav with icons
- Sections: Main, Tools, Account
- Active state uses teal (#00A4BF)
- Background: light teal (#CCE8EE)

MAIN CONTENT:
- Page title "Dashboard" (Titillium Web, bold)
- Stats row: 4 cards with teal accents
- Chart section (placeholder)
- Activity table

FOOTER:
- Dark teal background (#005260)
- White text
- Copyright

Style: Professional SaaS, BAIV brand colors
Primary: #00A4BF (teal)
Secondary: #E84E1C (orange)
Accent: #CEC528 (gold)
Font: Open Sans body, Titillium Web headings
```

## 6.2 BAIV Landing Page Prompt

```
Create a BAIV landing page with:

HEADER:
- BAIV logo left
- Nav: Features, Pricing, About, Contact
- CTA button "Get Started" (teal #00A4BF)

HERO:
- Headline: "Be AI Visible" (Titillium Web, bold)
- Subheadline (Open Sans)
- Primary CTA: teal button
- Secondary CTA: outline button
- Hero image placeholder

FEATURES (3 cards):
- Icon (teal)
- Title (Titillium Web)
- Description (Open Sans)
- Teal accent borders

PRICING (3 tiers):
- Popular tier highlighted with orange (#E84E1C)
- Gold accent (#CEC528) for badges

CTA SECTION:
- Dark teal background (#005260)
- White text
- Orange CTA button

FOOTER:
- Dark background
- 4-column links
- Social icons

Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

# 7. Enforcement & Validation

## 7.1 Pre-Generation Checklist

- [ ] Prompt includes BAIV brand colors
- [ ] Font families specified (Open Sans, Titillium Web)
- [ ] BAIV token library enabled in file
- [ ] Template file ready

## 7.2 Post-Generation Checklist

- [ ] No default layer names
- [ ] All containers use Auto Layout
- [ ] BAIV brand colors bound (not hardcoded)
- [ ] Headings use Titillium Web
- [ ] Body text uses Open Sans
- [ ] Components extracted

## 7.3 Token Binding Verification

| Property | Should Be |
|----------|-----------|
| Primary buttons | `#00A4BF` via `semantic/color/primary/default` |
| Secondary buttons | `#E84E1C` via `semantic/color/secondary/default` |
| Success states | `#019587` via `semantic/color/success/default` |
| Headings | Titillium Web |
| Body text | Open Sans |

---

# 8. MCP Extraction

## 8.1 Commands

| Task | Command |
|------|---------|
| Extract design | `Figma:get_design_context` |
| Get variables | `Figma:get_variable_defs` |
| Get metadata | `Figma:get_metadata` |

## 8.2 Request Format

```
Extract design from:
https://www.figma.com/design/{fileKey}?node-id={nodeId}

This is a BAIV platform design using:
- Primary: #00A4BF
- Secondary: #E84E1C
- Fonts: Open Sans (body), Titillium Web (headings)
```

---

# 9. Claude Code Generation

## 9.1 Request Format

```
Generate React/Next.js code for BAIV platform.

Requirements:
- TypeScript
- Tailwind CSS with CSS variables
- BAIV brand colors as tokens
- Open Sans for body, Titillium Web for headings

Token format:
--baiv-primary: #00A4BF
--baiv-primary-dark: #005260
--baiv-secondary: #E84E1C
--baiv-accent: #CEC528
```

## 9.2 Expected CSS Variables

```css
:root {
  /* BAIV Brand Colors */
  --baiv-primary: #00A4BF;
  --baiv-primary-light: #00A4BF;
  --baiv-primary-dark: #005260;
  --baiv-secondary: #E84E1C;
  --baiv-accent: #CEC528;
  --baiv-neutral: #CCE8EE;
  
  /* Status Colors */
  --baiv-success: #019587;
  --baiv-warning: #CF057D;
  --baiv-error: #CEC528;
  --baiv-info: #1C3E8E;
  
  /* Typography */
  --font-primary: 'Open Sans', system-ui, sans-serif;
  --font-heading: 'Titillium Web', system-ui, sans-serif;
}
```

## 9.3 Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet">
```

---

# 10. Appendix

## 10.1 BAIV Color Quick Reference

| Name | Hex | CSS Variable |
|------|-----|--------------|
| Primary | #00A4BF | `--baiv-primary` |
| Primary Dark | #005260 | `--baiv-primary-dark` |
| Secondary | #E84E1C | `--baiv-secondary` |
| Accent | #CEC528 | `--baiv-accent` |
| Neutral | #CCE8EE | `--baiv-neutral` |
| Success | #019587 | `--baiv-success` |
| Warning | #CF057D | `--baiv-warning` |
| Error | #CEC528 | `--baiv-error` |
| Info | #1C3E8E | `--baiv-info` |

## 10.2 Typography Quick Reference

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Titillium Web | 700 | 36px |
| H2 | Titillium Web | 600 | 30px |
| H3 | Titillium Web | 600 | 24px |
| Body | Open Sans | 400 | 16px |
| Body Bold | Open Sans | 700 | 16px |
| Small | Open Sans | 400 | 14px |
| Caption | Open Sans | 400 | 12px |

## 10.3 Code Connect (Future)

Add Code Connect when:
- Team grows beyond 5 people
- Component library stabilizes
- Developer handoff becomes bottleneck

Not required for MVP workflow.

---

# Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand tokens, updated workflow |
| 1.0.0 | Dec 2024 | Initial documentation |
