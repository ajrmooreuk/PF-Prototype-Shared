# PFC-PFI-BAIV Design System Ontology Guide

**Version:** 3.0.0  
**Date:** 2025-01-03  
**File:** `pfc-pfi-baiv-design-system-ontology.json`

---

## Overview

This guide explains how to read, interpret, and use the BAIV Design System Ontology JSON file. The ontology is a comprehensive, machine-readable specification of all design tokens, component definitions, and generation rules for the BAIV design system.

---

## Structure

### Three-Layer Token System

```
PRIMITIVE → SEMANTIC → COMPONENT
    ↓           ↓           ↓
Raw values  Context    Specific use
#00A4BF  →  primary  →  button-bg
```

#### Layer 1: Primitive Tokens

**Location:** `tokens.colors.primitive.*`

Raw, foundational values that never change. These are the atomic units of the design system.

```json
{
  "tokens": {
    "colors": {
      "primitive": {
        "brand": {
          "primary": {
            "value": "#00A4BF",
            "name": "BAIV Teal"
          }
        }
      }
    }
  }
}
```

**Usage:** Primitive tokens are **never used directly** in components. They are always referenced through semantic aliases.

#### Layer 2: Semantic Tokens

**Location:** `tokens.colors.semantic.*`

Context-based aliases that point to primitive tokens. These provide meaning and intent.

```json
{
  "semantic": {
    "primary": {
      "default": {
        "alias": "primitive.brand.primary"
      },
      "hover": {
        "value": "#008DA3"
      }
    }
  }
}
```

**Key Feature:** Semantic tokens use the `"alias"` property to reference primitives. When a semantic token has a direct `"value"`, it's a calculated variant (like hover states).

#### Layer 3: Component Tokens

**Location:** `tokens.colors.component.*`

Specific applications for individual components.

```json
{
  "component": {
    "button": {
      "primary": {
        "bg": { "alias": "semantic.primary.default" },
        "text": { "alias": "semantic.text.inverse" }
      }
    }
  }
}
```

**Usage:** Component tokens are what your code directly references. They ensure consistency and make global changes easy.

---

## Token Categories

### Colors

**Primitive Colors:**
- `brand.*` - BAIV brand colors (primary teal, secondary orange, accent gold)
- `neutral.*` - Grayscale palette (50-900)
- `status.*` - Semantic colors (success, warning, error, info)
- `semantic.*` - Pure white/black

**Semantic Colors:**
- `primary.*` - Primary interactive elements
- `secondary.*` - Secondary interactive elements
- `accent.*` - Accent highlights
- `text.*` - Text colors (primary, secondary, tertiary, disabled, inverse)
- `background.*` - Background colors
- `border.*` - Border colors

**Component Colors:**
- `button.*` - Button variants (primary, secondary, outline, ghost, destructive)
- `card.*` - Card variants (default, elevated, outlined)
- `input.*` - Input states

### Typography

```json
{
  "typography": {
    "fontFamily": {
      "heading": { "value": "'Titillium Web', sans-serif" },
      "body": { "value": "'Open Sans', sans-serif" },
      "mono": { "value": "'JetBrains Mono', monospace" }
    },
    "fontSize": {
      "xs": { "value": "12px", "lineHeight": "16px", "rem": "0.75rem" }
    }
  }
}
```

**Sizes:** xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl  
**Weights:** light (300), regular (400), medium (500), semibold (600), bold (700), extrabold (800)  
**Letter Spacing:** tighter, tight, normal, wide, wider, widest

### Spacing

**System:** 4px base grid  
**Scale:** 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px), 32 (128px), 40 (160px), 48 (192px), 56 (224px), 64 (256px)

**Each spacing value includes:**
- `value` - Pixel value
- `rem` - Rem equivalent

### Border Radius

**Values:** none, sm (2px), base (4px), md (6px), lg (8px), xl (12px), 2xl (16px), full (9999px)

**Recommended:**
- Inputs: `base` (4px)
- Buttons: `md` (6px)
- Cards: `lg` (8px)

### Shadows

**Six levels:** sm, base, md, lg, xl, 2xl

**Recommended:**
- Subtle lift: `sm`
- Cards: `md`
- Modals: `lg`
- Maximum elevation: `2xl`

### Breakpoints

```
sm:  640px  (landscape phones)
md:  768px  (tablets)
lg:  1024px (desktops)
xl:  1280px (large desktops)
2xl: 1536px (larger desktops)
```

### Z-Index

**Layering system:** base (0), dropdown (1000), sticky (1020), fixed (1030), modalBackdrop (1040), modal (1050), popover (1060), tooltip (1070)

---

## Component Specifications

### Button Component

```json
{
  "components": {
    "button": {
      "variants": ["primary", "secondary", "outline", "ghost", "destructive"],
      "sizes": {
        "sm": { "height": 32, "paddingX": 12, "paddingY": 6 },
        "md": { "height": 40, "paddingX": 16, "paddingY": 8 },
        "lg": { "height": 48, "paddingX": 24, "paddingY": 12 }
      }
    }
  }
}
```

**States:** default, hover, active, focus, disabled

### Card Component

```json
{
  "components": {
    "card": {
      "variants": ["default", "elevated", "outlined"],
      "padding": {
        "sm": { "alias": "tokens.spacing.4" },
        "md": { "alias": "tokens.spacing.6" },
        "lg": { "alias": "tokens.spacing.8" }
      }
    }
  }
}
```

### Input Component

**Heights:** sm (32px), md (40px), lg (48px)  
**States:** default, hover, focus, error, disabled

---

## Usage Examples

### Reading Token Values

```javascript
// Load the ontology
const ontology = require('./pfc-pfi-baiv-design-system-ontology.json');

// Access primitive color
const primaryColor = ontology.tokens.colors.primitive.brand.primary.value;
// Returns: "#00A4BF"

// Follow semantic alias
const semanticPrimary = ontology.tokens.colors.semantic.primary.default.alias;
// Returns: "primitive.brand.primary"
// Resolve: "#00A4BF"

// Get component token
const buttonBg = ontology.tokens.colors.component.button.primary.bg.alias;
// Returns: "semantic.primary.default"
// Resolve chain: semantic.primary.default → primitive.brand.primary → "#00A4BF"
```

### Resolving Aliases

```javascript
function resolveToken(path, ontology) {
  const parts = path.split('.');
  let current = ontology;
  
  for (const part of parts) {
    current = current[part];
    if (!current) return null;
  }
  
  // If it's an alias, recursively resolve
  if (current.alias) {
    return resolveToken(current.alias, ontology);
  }
  
  return current.value;
}

// Usage
const color = resolveToken('tokens.colors.component.button.primary.bg', ontology);
// Returns: "#00A4BF"
```

### Generating CSS Variables

```javascript
function generateCSSVariables(tokens) {
  const vars = [];
  
  // Generate from primitive colors
  Object.entries(tokens.colors.primitive.brand).forEach(([key, token]) => {
    vars.push(`--baiv-color-brand-${key}: ${token.value};`);
  });
  
  // Generate from spacing
  Object.entries(tokens.spacing).forEach(([key, token]) => {
    vars.push(`--baiv-spacing-${key}: ${token.value};`);
  });
  
  return `:root {\n  ${vars.join('\n  ')}\n}`;
}
```

Output:
```css
:root {
  --baiv-color-brand-primary: #00A4BF;
  --baiv-color-brand-secondary: #E84E1C;
  --baiv-color-brand-accent: #CEC528;
  --baiv-spacing-0: 0px;
  --baiv-spacing-1: 4px;
  --baiv-spacing-2: 8px;
  /* ... */
}
```

### Generating Tailwind Config

```javascript
function generateTailwindTheme(ontology) {
  return {
    extend: {
      colors: {
        primary: {
          DEFAULT: ontology.tokens.colors.primitive.brand.primary.value,
          hover: ontology.tokens.colors.semantic.primary.hover.value,
        },
        secondary: {
          DEFAULT: ontology.tokens.colors.primitive.brand.secondary.value,
          hover: ontology.tokens.colors.semantic.secondary.hover.value,
        },
      },
      fontFamily: {
        heading: [ontology.tokens.typography.fontFamily.heading.value],
        body: [ontology.tokens.typography.fontFamily.body.value],
      },
      spacing: Object.fromEntries(
        Object.entries(ontology.tokens.spacing).map(([k, v]) => [k, v.value])
      ),
    },
  };
}
```

---

## Naming Conventions

### Token Paths

**Format:** `tokens.{category}.{layer}.{name}.{property}`

**Examples:**
- `tokens.colors.primitive.brand.primary.value`
- `tokens.colors.semantic.primary.default.alias`
- `tokens.colors.component.button.primary.bg.alias`
- `tokens.typography.fontSize.base.value`
- `tokens.spacing.4.value`

### Figma Variables

**Collections:** PascalCase (e.g., "PrimitiveColors", "SemanticColors")  
**Variables:** kebab-case with / separators (e.g., "semantic/primary/default")

### CSS Variables

**Prefix:** `--baiv-`  
**Format:** kebab-case  
**Examples:**
- `--baiv-color-primary-default`
- `--baiv-spacing-4`
- `--baiv-font-size-base`

### Tailwind Classes

**Format:** kebab-case  
**Examples:**
- `bg-primary hover:bg-primary-hover`
- `text-base font-heading`
- `p-4 rounded-md shadow-md`

---

## Integration Points

### 1. Figma Make

Use token values in AI generation prompts:

```
Create a hero section using:
- Primary color: #00A4BF (BAIV Teal)
- Secondary color: #E84E1C (BAIV Orange)
- Heading font: Titillium Web
- Body font: Open Sans
- Spacing: 24px padding, 48px vertical gap
- Border radius: 8px for cards
```

### 2. MCP Extraction

Claude reads Figma layouts via MCP and maps to ontology tokens:

```javascript
// Figma layer: "Button/Primary/Medium"
// Maps to: components.button.sizes.md
// Height: 40px, Padding: 16px, Font: base (16px)
```

### 3. Claude Code Generation

```typescript
import { tokens } from '@/lib/design-tokens';

export const Button = ({ variant = 'primary', size = 'md' }) => {
  const spec = tokens.components.button.sizes[size];
  const colors = tokens.colors.component.button[variant];
  
  return (
    <button
      className={`
        h-[${spec.height}px]
        px-[${spec.paddingX}px]
        bg-[${resolveToken(colors.bg.alias)}]
        hover:bg-[${resolveToken(colors.bgHover.alias)}]
        text-[${resolveToken(colors.text.alias)}]
      `}
    >
      {children}
    </button>
  );
};
```

### 4. shadcn/ui Theming

```typescript
// lib/design-tokens.ts
export const theme = {
  primary: {
    DEFAULT: 'hsl(from #00A4BF h s l)',
    foreground: 'hsl(from #FFFFFF h s l)',
  },
  // Auto-generated from ontology
};
```

---

## Validation Rules

### Color Tokens
- ✅ All primitive colors must have `value` property
- ✅ All semantic colors must have `alias` or `value`
- ✅ All component colors must reference semantic tokens
- ✅ WCAG contrast ratios documented for brand colors

### Typography Tokens
- ✅ Font sizes must include `value`, `lineHeight`, and `rem`
- ✅ Font families must include fallback stacks
- ✅ Font weights must be valid values (300-800)

### Spacing Tokens
- ✅ All spacing must follow 4px base grid
- ✅ Must include both `value` (px) and `rem` equivalent

### Component Specifications
- ✅ All variants must be documented
- ✅ All sizes must include dimensions
- ✅ All states must be specified
- ✅ Accessibility requirements documented

---

## Best Practices

### 1. Always Use Semantic Tokens

❌ **Don't:**
```jsx
<button style={{ backgroundColor: '#00A4BF' }}>
```

✅ **Do:**
```jsx
<button className="bg-primary">
```

### 2. Follow the Alias Chain

❌ **Don't:**
```javascript
// Skipping semantic layer
const color = ontology.tokens.colors.primitive.brand.primary.value;
```

✅ **Do:**
```javascript
// Following proper hierarchy
const color = resolveToken('tokens.colors.component.button.primary.bg', ontology);
```

### 3. Use Component Specifications

❌ **Don't:**
```jsx
<button className="h-10 px-4 py-2">
```

✅ **Do:**
```jsx
<Button size="md">  {/* Uses spec.height=40, spec.paddingX=16 */}
```

### 4. Document Custom Tokens

When adding new tokens:
```json
{
  "custom": {
    "value": "#FF0000",
    "description": "Why this token exists",
    "usage": "When and where to use it",
    "wcag": { "aa": true, "contrastRatio": 4.5 }
  }
}
```

---

## Troubleshooting

### Alias Not Resolving

**Problem:** `resolveToken()` returns `null`

**Solution:**
1. Check alias path spelling
2. Verify token exists at that path
3. Ensure no circular references

### Color Not Appearing

**Problem:** Color token not rendering

**Solution:**
1. Verify token has `value` or valid `alias`
2. Check CSS variable generation
3. Confirm Tailwind config includes token

### Component Spec Mismatch

**Problem:** Component doesn't match spec

**Solution:**
1. Re-read component specification
2. Verify size variant is correct
3. Check all required properties are applied

---

## Related Files

- **Ontology JSON:** `pfc-pfi-baiv-design-system-ontology.json`
- **Explainer:** `pfc-pfi-baiv-ontology-explainer.md`
- **Diagram:** `pfc-pfi-baiv-ontology-diagram.mermaid`
- **Layout Templates:** `../02-LAYOUT-TEMPLATES/pfc-pfi-baiv-layout-templates.json`
- **shadcn Mappings:** `../03-SHADCN-MAPPING/pfc-pfi-baiv-shadcn-mappings.json`

---

## Version History

**v3.0.0** (2025-01-03)
- Complete 3-layer token system
- Component specifications
- Generation rules
- Schema.org compliance
