# PFC-PFI-BAIV Prompt Generation Guide

**Version:** 3.0.0  
**Last Updated:** 2025-01-03  
**Purpose:** Automated prompt generation for Figma Make AI layouts using BAIV design system

---

## Table of Contents

1. [Overview](#overview)
2. [Prompt Structure](#prompt-structure)
3. [Template Variables](#template-variables)
4. [Generation Workflow](#generation-workflow)
5. [Quality Checklist](#quality-checklist)
6. [Examples](#examples)

---

## Overview

This guide enables **automated generation** of Figma Make prompts that produce BAIV design system-compliant layouts. Claude can use this guide to:

- Generate custom prompts for new component requests
- Adapt existing templates to user requirements
- Ensure consistent token application across all generated designs
- Maintain design system compliance at scale

**Key Principle:** Every generated prompt must reference BAIV tokens explicitly (colors, typography, spacing) to enable accurate MCP extraction and code generation.

---

## Prompt Structure

All Figma Make prompts follow a three-tier structure:

### 1. Primary Prompt (Speed)
**Purpose:** Quick generation, rapid iteration  
**Length:** 2-3 sentences  
**Components:**
- Component type and purpose
- Essential layout (desktop/mobile differences)
- Key BAIV color codes (#00A4BF, #E84E1C, #CEC528)
- Critical dimensions (width, height)
- Typography basics (Titillium Web for headings, Open Sans for body)

**Template:**
```
Create a [COMPONENT_TYPE] with [KEY_ELEMENTS]. Use BAIV [PRIMARY_COLOR] for [PRIMARY_USAGE], [SECONDARY_COLOR] for [SECONDARY_USAGE]. Desktop: [DESKTOP_LAYOUT]. Mobile: [MOBILE_LAYOUT].
```

**Example:**
```
Create a hero section with headline, subheadline, and two CTA buttons. Use BAIV teal (#00A4BF) for primary CTA, BAIV orange (#E84E1C) for secondary CTA. Desktop: 1440px wide, two columns (60/40). Mobile: stack vertically.
```

---

### 2. Detailed Prompt (Precision)
**Purpose:** Production-ready, pixel-perfect designs  
**Length:** 150-250 words  
**Components:**
- **LAYOUT:** Container specs, grid structure, responsive breakpoints
- **TYPOGRAPHY:** All text elements with font, size, line-height, weight, color
- **COLORS:** All color applications with HEX codes
- **SPACING:** Padding, margins, gaps with px values
- **STATES:** Hover, focus, active, disabled states
- **ACCESSIBILITY:** Contrast ratios, semantic structure

**Template:**
```
Design a [COMPONENT_TYPE] following these specifications:

LAYOUT:
- Container: [MAX_WIDTH]px max-width, [HEIGHT]px height
- Grid: [COLUMNS] columns, [GAP]px gap
- Padding: [VERTICAL]px vertical, [HORIZONTAL]px horizontal
- Mobile: [MOBILE_LAYOUT]

TYPOGRAPHY:
- [ELEMENT_1]: [FONT], [SIZE]px/[LINE_HEIGHT]px, [WEIGHT] weight, [COLOR]
- [ELEMENT_2]: [FONT], [SIZE]px/[LINE_HEIGHT]px, [WEIGHT] weight, [COLOR]

COLORS:
- [ELEMENT]: [HEX_CODE] background, [HEX_CODE] text
- [ELEMENT]: [HEX_CODE] border

SPACING:
- [ELEMENT] to [ELEMENT]: [VALUE]px
- [ELEMENT] padding: [VALUE]px

STATES:
- Hover: [CHANGES]
- Focus: [CHANGES]
```

**Example:** See `pfc-pfi-baiv-figma-make-templates.json` → `01_hero_section.figmaMakePrompt.detailed`

---

### 3. Token References
**Purpose:** Map generated design back to BAIV design system  
**Format:** JSON object with token paths  
**Usage:** Claude uses these during code generation to apply semantic tokens

**Template:**
```json
{
  "colors": ["token.path.1", "token.path.2"],
  "typography": ["token.path.1", "token.path.2"],
  "spacing": ["token.path.1", "token.path.2"],
  "radius": ["token.path.1"],
  "shadows": ["token.path.1"]
}
```

**Example:**
```json
{
  "colors": ["brand.primary", "brand.secondary", "neutral.900"],
  "typography": ["heading.h1", "body.large", "button.medium"],
  "spacing": ["spacing.6", "spacing.8", "spacing.10"],
  "radius": ["radius.lg"],
  "shadows": ["shadow.md"]
}
```

---

## Template Variables

Use these variables when generating custom prompts:

### Colors
| Variable | Value | Token Path | Usage |
|----------|-------|------------|-------|
| `{PRIMARY}` | #00A4BF | `brand.primary` | Primary CTAs, links, active states |
| `{SECONDARY}` | #E84E1C | `brand.secondary` | Secondary CTAs, accents |
| `{ACCENT}` | #CEC528 | `brand.accent` | Highlights, premium features |
| `{NEUTRAL_50}` | #FAFAFA | `neutral.50` | Section backgrounds |
| `{NEUTRAL_200}` | #E5E5E5 | `neutral.200` | Borders, dividers |
| `{NEUTRAL_900}` | #171717 | `neutral.900` | Primary text |
| `{SUCCESS}` | #10B981 | `status.success` | Success states |
| `{ERROR}` | #DC2626 | `status.error` | Error states |
| `{WARNING}` | #F59E0B | `status.warning` | Warning states |

### Typography
| Variable | Value | Token Path | Usage |
|----------|-------|------------|-------|
| `{HEADING_FONT}` | Titillium Web | `typography.fontFamily.heading` | All headings |
| `{BODY_FONT}` | Open Sans | `typography.fontFamily.body` | Body text, UI |
| `{MONO_FONT}` | Fira Code | `typography.fontFamily.mono` | Code blocks |
| `{H1_SIZE}` | 60px/68px | `typography.size.h1` | Page titles |
| `{H2_SIZE}` | 48px/56px | `typography.size.h2` | Section titles |
| `{BODY_SIZE}` | 16px/28px | `typography.size.body` | Paragraph text |
| `{BUTTON_SIZE}` | 16px | `typography.size.button` | Button text |

### Spacing (4px base unit)
| Variable | Value | Token Path |
|----------|-------|------------|
| `{SPACING_2}` | 8px | `spacing.2` |
| `{SPACING_4}` | 16px | `spacing.4` |
| `{SPACING_6}` | 24px | `spacing.6` |
| `{SPACING_8}` | 32px | `spacing.8` |
| `{SPACING_10}` | 40px | `spacing.10` |
| `{SPACING_12}` | 48px | `spacing.12` |
| `{SPACING_16}` | 64px | `spacing.16` |

### Breakpoints
| Variable | Value | Usage |
|----------|-------|-------|
| `{MOBILE}` | <768px | Single column, stacked |
| `{TABLET}` | 768-1023px | Reduced columns, compact |
| `{DESKTOP}` | ≥1024px | Full layout |

---

## Generation Workflow

### Step 1: Analyze User Request
Identify:
- Component type (hero, feature grid, form, etc.)
- Content elements (text, images, buttons, etc.)
- Layout complexity (simple, medium, high)
- Special requirements (interactivity, animations, etc.)

### Step 2: Select Base Template
Choose from existing templates (`pfc-pfi-baiv-figma-make-templates.json`):
- Hero Section
- Feature Grid
- CTA Banner
- Testimonial Carousel
- Pricing Table
- Blog Card Grid
- Footer
- Contact Form

Or create new custom template following structure.

### Step 3: Customize Variables
Replace template variables with:
- Specific content requirements
- User-requested dimensions
- Color preferences (map to BAIV tokens)
- Typography adjustments
- Layout modifications

### Step 4: Generate Both Prompts
Create:
1. **Primary prompt** for initial generation
2. **Detailed prompt** for refinement
3. **Token references** for code generation

### Step 5: Include Layer Naming Convention
Add layer naming guide to prompt:
```
Layer naming: Use semantic names matching HTML structure
- Root: component-name-section
- Containers: component-name-container
- Text: component-name-headline, component-name-body
- Buttons: btn-primary, btn-secondary
- Images: component-name-image
```

### Step 6: Quality Check
Verify prompt includes:
- [ ] All BAIV color HEX codes specified
- [ ] Typography specs (font, size, weight, line-height, color)
- [ ] Responsive breakpoints defined
- [ ] Spacing values provided
- [ ] Layer naming convention included
- [ ] Accessibility considerations mentioned
- [ ] Token reference object created

---

## Quality Checklist

### ✅ Essential Requirements
Every generated prompt MUST include:

**Colors:**
- [ ] All color values as HEX codes (#00A4BF, not "teal")
- [ ] Token paths mapped in token references
- [ ] Contrast ratios mentioned for accessibility

**Typography:**
- [ ] Font family specified (Titillium Web / Open Sans)
- [ ] Font size AND line-height provided
- [ ] Font weight specified (400, 600, 700)
- [ ] Text color as HEX code

**Layout:**
- [ ] Container max-width specified
- [ ] Desktop/tablet/mobile breakpoints defined
- [ ] Grid columns or flex direction specified
- [ ] Padding and margins with px values

**Spacing:**
- [ ] All gaps between elements specified
- [ ] Values follow 4px base unit (8px, 16px, 24px, etc.)
- [ ] Spacing token paths included in token references

**Components:**
- [ ] Layer naming convention provided
- [ ] Component structure outlined
- [ ] Interactive states defined (hover, focus, active)

**Accessibility:**
- [ ] Semantic HTML structure mentioned
- [ ] WCAG contrast compliance noted
- [ ] Focus states specified

---

## Examples

### Example 1: Custom Dashboard Card

**User Request:** "Create a dashboard stat card showing a metric with trend indicator"

**Generated Primary Prompt:**
```
Create a dashboard stat card with large number, label, and trend indicator. Use BAIV teal (#00A4BF) for positive trend icon, BAIV orange (#E84E1C) for negative trend. Card: white background, 1px #E5E5E5 border, 12px radius, 24px padding. Desktop: 280px width. Metric: Titillium Web 36px, Label: Open Sans 14px gray.
```

**Generated Detailed Prompt:**
```
Design a dashboard stat card following these specifications:

CARD CONTAINER:
- Width: 280px (fixed on desktop, full-width on mobile)
- Background: #FFFFFF
- Border: 1px solid #E5E5E5
- Border radius: 12px
- Padding: 24px
- Box shadow: 0 2px 8px rgba(0,0,0,0.06)
- Hover: shadow elevates to 0 8px 16px rgba(0,0,0,0.12)

CONTENT LAYOUT:
- Vertical stack: Label → Metric → Trend
- Gaps: 8px between elements

LABEL:
- Typography: Open Sans, 14px/20px, 600 weight, #737373
- Text transform: uppercase
- Letter spacing: 0.5px

METRIC:
- Typography: Titillium Web, 36px/44px, 700 weight, #171717
- Format: Number with optional currency/unit

TREND INDICATOR:
- Layout: horizontal flex, 8px gap
- Icon: 20px arrow (up/down)
  - Positive: #10B981 (green)
  - Negative: #DC2626 (red)
- Text: Open Sans, 14px/20px, 500 weight
  - Positive: #10B981
  - Negative: #DC2626
- Format: "+12.5%" or "-3.2%"

RESPONSIVE:
- Desktop: 280px width, can be placed in grid
- Mobile: 100% width, stack vertically
```

**Generated Token References:**
```json
{
  "colors": ["neutral.50", "neutral.200", "neutral.500", "neutral.900", "status.success", "status.error"],
  "typography": ["heading.h4", "body.small"],
  "spacing": ["spacing.2", "spacing.6"],
  "radius": ["radius.lg"],
  "shadows": ["shadow.sm", "shadow.md"]
}
```

---

### Example 2: Custom Newsletter Section

**User Request:** "Newsletter signup section with centered headline and email input next to button"

**Generated Primary Prompt:**
```
Create a newsletter signup section with centered headline, description, and inline email input + button. Background: BAIV light teal (#CCE8EE). Headline: Titillium Web 36px. Email input: white background with BAIV teal (#00A4BF) button. Desktop: 800px max-width, centered. Mobile: stack input and button.
```

**Generated Detailed Prompt:**
```
Design a newsletter signup section following these specifications:

SECTION LAYOUT:
- Background: #CCE8EE (light teal)
- Padding: 80px vertical, 40px horizontal
- Text alignment: center
- Max content width: 800px, centered

HEADLINE:
- Typography: Titillium Web, 36px/44px, 700 weight, #171717
- Max width: 600px
- Margin bottom: 16px

DESCRIPTION:
- Typography: Open Sans, 18px/30px, 400 weight, #525252
- Max width: 600px
- Margin bottom: 32px

FORM LAYOUT:
- Desktop: horizontal flex, 16px gap
- Mobile: vertical stack, 12px gap
- Max width: 500px, centered

EMAIL INPUT:
- Background: #FFFFFF
- Border: 1px solid #D4D4D4
- Border radius: 8px
- Height: 56px
- Padding: 16px
- Font: Open Sans, 16px, 400 weight, #171717
- Placeholder: #A3A3A3
- Desktop: flex-grow to fill available space
- Mobile: 100% width
- Focus: border #00A4BF, box-shadow 0 0 0 3px rgba(0,164,191,0.1)

SUBMIT BUTTON:
- Background: #00A4BF
- Text: Open Sans, 16px, 600 weight, #FFFFFF
- Height: 56px
- Padding: 0 32px
- Border radius: 8px
- Desktop: fixed width (auto)
- Mobile: 100% width
- Hover: background #008A9F

PRIVACY TEXT:
- Typography: Open Sans, 12px/20px, 400 weight, #737373
- Margin top: 16px
- Link color: #00A4BF
```

**Generated Token References:**
```json
{
  "colors": ["brand.primary", "brand.primaryLight", "brand.primaryHover", "neutral.200", "neutral.400", "neutral.500", "neutral.900"],
  "typography": ["heading.h2", "body.large", "body.small"],
  "spacing": ["spacing.3", "spacing.4", "spacing.8", "spacing.10"],
  "radius": ["radius.md"],
  "shadows": ["shadow.focus"]
}
```

---

## Advanced Techniques

### Combining Templates
Merge multiple templates for complex layouts:

```
Primary prompt combines:
- Hero section (top)
- Feature grid (middle)
- CTA banner (bottom)

"Create a landing page section with: (1) Hero: headline, subheadline, CTA button; 
(2) Feature grid: 3 columns with icons; (3) CTA banner: gradient background with 
button. Use BAIV teal (#00A4BF) for CTAs, icons. Desktop: full width. Mobile: stack."
```

### Adaptive Token Selection
Choose tokens based on component purpose:

- **Marketing pages:** Use full brand palette (primary, secondary, accent)
- **Dashboard/apps:** Use neutral palette with primary accents only
- **Forms/inputs:** Use status colors (success, error, warning) for validation

### State Specification
Always include interactive states:

```
BUTTON STATES:
- Default: #00A4BF background, #FFFFFF text
- Hover: #008A9F background
- Active: #005260 background
- Focus: outline 3px #00A4BF with 2px offset
- Disabled: #D4D4D4 background, #737373 text
```

---

## Best Practices

1. **Be Explicit:** Never assume Figma Make will infer values. Specify everything.
2. **Use HEX Codes:** Always provide color values as HEX (#00A4BF), not color names.
3. **Include Units:** Always add "px" after dimension values (16px, not 16).
4. **Specify Line Height:** Typography always includes line-height (16px/28px).
5. **Mobile-First Thinking:** Define mobile layout even if desktop-focused.
6. **Layer Naming:** Include semantic layer naming in every prompt.
7. **Token Mapping:** Always create token reference object for Claude's code generation.
8. **Accessibility:** Mention WCAG compliance and contrast ratios.

---

## Troubleshooting

### Problem: Generated design colors don't match BAIV tokens
**Solution:** Double-check HEX codes in prompt. Ensure exact values:
- #00A4BF (not #00A5BF or similar)
- #E84E1C (not #E84D1C)
- #CEC528 (not #CEC529)

### Problem: Typography inconsistent with design system
**Solution:** Always specify both font AND full size/line-height:
- ✅ "Titillium Web, 36px/44px"
- ❌ "Titillium Web 36px"

### Problem: Spacing doesn't align to 4px grid
**Solution:** Use spacing tokens. Convert arbitrary values:
- 15px → 16px (spacing.4)
- 28px → 24px (spacing.6) or 32px (spacing.8)
- 50px → 48px (spacing.12)

### Problem: MCP extraction fails to identify components
**Solution:** Include explicit layer naming convention in prompt:
```
Layer naming:
- hero-section (root)
- hero-content (container)
- hero-headline (h1)
- btn-primary (button)
```

---

## Appendix: Token Quick Reference

### Brand Colors
```
Primary: #00A4BF (brand.primary)
Secondary: #E84E1C (brand.secondary)
Accent: #CEC528 (brand.accent)
```

### Neutral Palette
```
50: #FAFAFA    500: #737373
100: #F5F5F5   600: #525252
200: #E5E5E5   700: #404040
300: #D4D4D4   800: #262626
400: #A3A3A3   900: #171717
```

### Status Colors
```
Success: #10B981
Error: #DC2626
Warning: #F59E0B
Info: #0EA5E9
```

### Typography Scale
```
Display: 72px/80px
H1: 60px/68px
H2: 48px/56px
H3: 36px/44px
H4: 24px/32px
Body Large: 18px/30px
Body Medium: 16px/28px
Body Small: 14px/24px
```

### Spacing Scale (4px base)
```
1 → 4px     9 → 36px
2 → 8px     10 → 40px
3 → 12px    12 → 48px
4 → 16px    16 → 64px
5 → 20px    20 → 80px
6 → 24px    24 → 96px
8 → 32px    32 → 128px
```

---

**End of Prompt Generation Guide**
