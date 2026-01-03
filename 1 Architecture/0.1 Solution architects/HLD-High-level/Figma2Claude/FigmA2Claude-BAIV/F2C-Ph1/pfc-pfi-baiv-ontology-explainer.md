# PFC-PFI-BAIV Ontology Explainer

**Version:** 3.0.0  
**Date:** 2025-01-03  
**Purpose:** Deep dive into ontology structure, design decisions, and implementation rationale

---

## What is a Design System Ontology?

An **ontology** is a formal, machine-readable specification of concepts and their relationships. In design systems, an ontology defines:

1. **What exists** (tokens, components, rules)
2. **How things relate** (primitive → semantic → component)
3. **How to use them** (naming conventions, generation rules)

The BAIV Design System Ontology serves as the **single source of truth** for all design decisions, enabling:

- Automated code generation
- Design-to-code consistency
- System-wide updates
- Cross-platform compatibility

---

## Core Philosophy

### 1. Taxonomic Organization

The BAIV ontology follows **strict hierarchical taxonomy**:

```
DOMAIN
  ├─ CATEGORY
  │   ├─ LAYER
  │   │   ├─ CONCEPT
  │   │   │   └─ PROPERTY
```

**Example:**
```
tokens (DOMAIN)
  ├─ colors (CATEGORY)
  │   ├─ primitive (LAYER)
  │   │   ├─ brand (CONCEPT)
  │   │   │   └─ primary (PROPERTY)
  │   │   │       └─ value: "#00A4BF"
```

This structure ensures:
- **Predictability:** Always know where to find tokens
- **Scalability:** Easy to add new tokens without breaking existing ones
- **Comprehension:** Clear relationships between concepts

### 2. Three-Layer Token System

**Why three layers?**

Traditional design systems often mix concerns, making global changes difficult. BAIV separates:

#### Layer 1: Primitive (Foundation)
- **Purpose:** Immutable raw values
- **Never changes:** These are your brand constants
- **Examples:** `#00A4BF`, `16px`, `'Open Sans'`

#### Layer 2: Semantic (Meaning)
- **Purpose:** Context-based aliases
- **Provides meaning:** "primary" instead of "#00A4BF"
- **Enables theming:** Change one alias, update everywhere

#### Layer 3: Component (Application)
- **Purpose:** Specific component usage
- **Enforces consistency:** Button always uses correct tokens
- **Enables variants:** Different button styles from same tokens

**Real-world benefit:**

To change all primary buttons from teal to blue:

```json
// Only change needed:
"semantic": {
  "primary": {
    "default": { "alias": "primitive.brand.blue" }  // Changed from "primary"
  }
}

// Everything else updates automatically:
// - All buttons
// - All links
// - All primary UI elements
```

### 3. Alias-Based References

**Why aliases instead of direct values?**

```json
// ❌ Direct value (bad)
"button": {
  "primary": {
    "bg": { "value": "#00A4BF" }
  }
}

// ✅ Alias (good)
"button": {
  "primary": {
    "bg": { "alias": "semantic.primary.default" }
  }
}
```

**Benefits:**
1. **Single source of truth:** Change once, update everywhere
2. **Traceable:** Can follow alias chain to see origin
3. **Flexible:** Easy to swap themes or rebrand

---

## Design Decisions

### Color System

#### Brand Colors

```json
"brand": {
  "primary": { "value": "#00A4BF", "name": "BAIV Teal" },
  "secondary": { "value": "#E84E1C", "name": "BAIV Orange" },
  "accent": { "value": "#CEC528", "name": "BAIV Gold" }
}
```

**Decision rationale:**
- **Teal (#00A4BF):** Trust, clarity, technology, innovation
- **Orange (#E84E1C):** Energy, action, warmth, approachability
- **Gold (#CEC528):** Premium, highlight, attention, value

**WCAG compliance:** All brand colors meet AA contrast requirements against white backgrounds.

#### Neutral Scale (50-900)

**Why 10 shades?**

Traditional 5-shade palettes lack nuance. The 10-shade system provides:
- **Granular control:** More options for subtle differences
- **Consistent jumps:** Each step is perceptually similar
- **Industry standard:** Matches Tailwind, Material, etc.

**Usage mapping:**
- `50-100`: Backgrounds, very light grays
- `200-300`: Borders, dividers, disabled states
- `400-500`: Placeholder text, secondary text
- `600-700`: Primary text, icons
- `800-900`: Headings, high-emphasis text

#### Status Colors

```json
"status": {
  "success": { "value": "#10B981" },  // Green
  "warning": { "value": "#F59E0B" },  // Amber
  "error": { "value": "#EF4444" },    // Red
  "info": { "value": "#3B82F6" }      // Blue
}
```

**Decision rationale:**
- **Universal recognition:** Colors match global conventions
- **Accessibility:** High contrast, colorblind-friendly
- **Emotional resonance:** Green = safe, Red = danger, etc.

### Typography

#### Font Families

**Heading: Titillium Web**
- **Character:** Modern, geometric, strong, technical
- **Use case:** Headings, navigation, emphasis
- **Weights available:** 300, 400, 600, 700

**Body: Open Sans**
- **Character:** Readable, friendly, neutral, professional
- **Use case:** Body text, descriptions, UI labels
- **Weights available:** 300, 400, 600, 700

**Mono: JetBrains Mono**
- **Character:** Clear, legible, purpose-built for code
- **Use case:** Code blocks, technical content, data
- **Weights available:** 400, 700

**Why these specific fonts?**

1. **Performance:** Both available on Google Fonts CDN
2. **Legibility:** Tested for screen readability
3. **Personality:** Balances technical professionalism with approachability
4. **Licensing:** Free, open-source, commercial-friendly

#### Font Size Scale

**Base size: 16px**

Why 16px?
- Browser default
- Optimal reading size
- Accessibility baseline

**Scale progression:**

```
xs:  12px (0.75rem)  - Legal text, captions
sm:  14px (0.875rem) - Secondary text
base: 16px (1rem)     - Body text ← baseline
lg:  18px (1.125rem) - Large body text
xl:  20px (1.25rem)  - Small headings
2xl: 24px (1.5rem)   - Section headings
3xl: 30px (1.875rem) - Page headings
4xl: 36px (2.25rem)  - Hero headings
5xl: 48px (3rem)     - Display text
6xl: 60px (3.75rem)  - Large display
7xl: 72px (4.5rem)   - Mega display
```

**Progression rationale:**
- Linear for small sizes (xs → base)
- Major third ratio for larger sizes (1.25x)
- Ensures visual hierarchy without jarring jumps

#### Line Height

Each font size includes matched line height:

```json
"base": {
  "value": "16px",
  "lineHeight": "24px"  // 1.5x ratio
}
```

**Why 1.5x ratio?**
- **Readability:** Optimal for body text
- **Breathing room:** Prevents cramped appearance
- **Accessibility:** Helps dyslexic readers

### Spacing System

#### 4px Base Grid

**Why 4px?**

1. **Divisibility:** Divides evenly (4, 8, 12, 16, 24, 32, 48, 64)
2. **Pixel-perfect:** Works on all screen densities
3. **Flexibility:** Fine-grained control without being fussy
4. **Industry standard:** Matches Material Design, iOS, etc.

#### Scale Progression

```
0:  0px
1:  4px   ← base unit
2:  8px   ← 2x
3:  12px  ← 3x
4:  16px  ← 4x (common padding)
5:  20px  ← 5x
6:  24px  ← 6x (common gap)
8:  32px  ← 8x
10: 40px  ← 10x
12: 48px  ← 12x (section spacing)
16: 64px  ← 16x
20: 80px  ← 20x
24: 96px  ← 24x (large spacing)
32: 128px ← 32x
40: 160px ← 40x
48: 192px ← 48x
56: 224px ← 56x
64: 256px ← 64x (max spacing)
```

**Gap in sequence (6 → 8):**  
7 (28px) is rarely needed and clutters the scale.

**Most commonly used:**
- `4` (16px): Default padding
- `6` (24px): Card padding, gaps
- `8` (32px): Section spacing
- `12` (48px): Large section breaks

### Border Radius

```
none: 0px
sm:   2px   - Subtle rounding
base: 4px   - Default, inputs
md:   6px   - Buttons
lg:   8px   - Cards
xl:   12px  - Large cards
2xl:  16px  - Hero elements
full: 9999px - Pills, avatars
```

**Decision rationale:**
- **Minimal by default:** 4-8px keeps design modern, not toy-like
- **Progression:** Doubles at larger sizes for visual consistency
- **Full:** High value ensures perfect circles regardless of size

### Shadows

**Six levels of elevation:**

```
sm:   Subtle lift
base: Standard elevation
md:   Moderate elevation ← cards
lg:   Significant elevation ← modals
xl:   High elevation
2xl:  Maximum elevation
```

**Shadow values:**
- Multiple layers create realistic depth
- Soft edges (`blur-radius`) prevent harsh shadows
- Transparency (`rgb(0 0 0 / 0.1)`) ensures shadows work on any background

**Why these specific values?**  
Copied from Tailwind CSS - battle-tested across millions of sites.

### Breakpoints

```
sm:  640px  - Landscape phones
md:  768px  - Tablets
lg:  1024px - Desktops
xl:  1280px - Large desktops
2xl: 1536px - Larger desktops
```

**Mobile-first approach:**

Styles apply at breakpoint and above:

```css
/* Base: mobile (< 640px) */
.button { padding: 8px; }

/* sm and up */
@media (min-width: 640px) {
  .button { padding: 12px; }
}

/* md and up */
@media (min-width: 768px) {
  .button { padding: 16px; }
}
```

**Why these specific values?**
- **640px:** Most landscape phones
- **768px:** iPad portrait
- **1024px:** iPad landscape, small laptops
- **1280px:** Common desktop resolution
- **1536px:** Large monitors, 2K displays

### Z-Index

**Layering system:**

```
base:          0    - Default layer
dropdown:      1000 - Dropdown menus
sticky:        1020 - Sticky headers
fixed:         1030 - Fixed elements
modalBackdrop: 1040 - Modal backdrop
modal:         1050 - Modal dialogs
popover:       1060 - Popovers
tooltip:       1070 - Tooltips
```

**Why gaps of 10?**
- Allows intermediate values if needed
- Prevents z-index wars (9999999)
- Clear hierarchy

**Why start at 1000?**
- Leaves 0-999 for page-level layering
- Industry convention

---

## Component Specifications

### Button Component

**Why these specific sizes?**

```json
"sizes": {
  "sm": { "height": 32, "paddingX": 12 },  // Compact UI
  "md": { "height": 40, "paddingX": 16 },  // Default
  "lg": { "height": 48, "paddingX": 24 }   // Prominent actions
}
```

**Rationale:**
- **32px:** Minimum touch target for mobile (44px recommended, but 32px acceptable for secondary actions)
- **40px:** Sweet spot for desktop and mobile
- **48px:** Meets 44px mobile touch target with margin

**Padding proportions:**
- Horizontal padding ≈ 0.75-1x height
- Creates balanced, not-too-wide buttons

### Card Component

**Three variants, one component:**

```json
"variants": ["default", "elevated", "outlined"]
```

**Why three variants?**

1. **Default:** Subtle border, no shadow - clean, minimal
2. **Elevated:** Shadow, no border - modern, floating
3. **Outlined:** Bold border, no shadow - emphasizes boundaries

**Padding options:**

```json
"padding": {
  "sm": 16px,  // Compact cards
  "md": 24px,  // Standard cards
  "lg": 32px   // Spacious cards
}
```

Maps to spacing scale (4, 6, 8).

### Input Component

**Height matches button:**

```json
"height": {
  "sm": 32,
  "md": 40,  // Same as button.md
  "lg": 48
}
```

**Why?**
- Visual consistency when buttons and inputs appear together
- Easier layouts (same height = aligned)

**States:**

```
default → hover → focus → error → disabled
```

Each state has distinct visual treatment:
- **Default:** Neutral border
- **Hover:** Slightly darker border
- **Focus:** Brand color border + ring
- **Error:** Red border
- **Disabled:** Grayed out, cursor not-allowed

---

## Naming Conventions

### Token Paths

**Format:** `category.layer.concept.property`

**Why dot notation?**
- Programming-friendly
- Easy to parse
- Mirrors object structure

**Example progression:**

```
tokens.colors.primitive.brand.primary.value
  │      │       │       │     │       │
domain  cat    layer  concept name  property
```

### Figma Variables

**Format:** `layer/concept/name`

```
primitive/brand/primary
semantic/primary/default
component/button/primary/bg
```

**Why slashes?**
- Figma's native variable path separator
- Creates visual hierarchy in UI
- Mirrors folder structure

### CSS Variables

**Format:** `--baiv-{category}-{name}`

```
--baiv-color-primary-default
--baiv-spacing-4
--baiv-font-size-base
```

**Why this format?**
- **Prefix:** Prevents conflicts with other libraries
- **Kebab-case:** CSS convention
- **Descriptive:** Self-documenting

### Tailwind Classes

**Format:** Standard Tailwind conventions

```
bg-primary
hover:bg-primary-hover
text-base
font-heading
p-4
rounded-md
shadow-md
```

**Extends Tailwind's defaults** while maintaining familiar API.

---

## Generation Rules

### Figma Make Prompts

When generating layouts with Figma Make AI, always include:

```
Colors:
- Primary: #00A4BF (BAIV Teal)
- Secondary: #E84E1C (BAIV Orange)
- Accent: #CEC528 (BAIV Gold)

Typography:
- Headings: Titillium Web
- Body: Open Sans

Spacing: 4px grid (use 16, 24, 32, 48px)
Radius: 6-8px for cards/buttons
Shadows: Medium shadow for cards
```

**Why include in prompts?**
- AI needs explicit guidance
- Ensures consistency across generations
- Reduces manual cleanup

### Claude Code Generation

When Claude generates code from Figma layouts:

```typescript
// Always import design tokens
import { tokens } from '@/lib/design-tokens';

// Use token references, never hard-coded values
const buttonBg = tokens.colors.component.button.primary.bg;

// Follow atomic design structure
// atoms/ → molecules/ → organisms/ → templates/
```

**Rationale:**
- Maintains token system integrity
- Enables future refactoring
- Self-documenting code

### MCP Extraction

When extracting Figma layouts via MCP:

**Layer naming convention:**
```
[component-type]/[variant]/[size]

Examples:
Button/Primary/Medium
Card/Elevated/Default
Input/Default/Large
```

**Why this format?**
- Claude can parse and map to component specs
- Human-readable in Figma
- Matches ontology structure

**Auto-layout requirements:**
- All components must use Figma auto-layout
- Constraints set for responsive behavior
- Padding/spacing uses token values

---

## Extensibility

### Adding New Tokens

**Process:**

1. **Determine layer:**
   - New color? → Add to primitive
   - New use case? → Add to semantic
   - New component? → Add to component

2. **Follow naming convention:**
   ```json
   "newConcept": {
     "value": "...",
     "description": "Clear explanation",
     "usage": "When and where to use"
   }
   ```

3. **Create aliases:**
   ```json
   "semantic": {
     "newUseCase": {
       "alias": "primitive.newConcept"
     }
   }
   ```

4. **Document:**
   - Update this explainer
   - Add to guide
   - Update diagrams

### Adding New Components

**Template:**

```json
"newComponent": {
  "@type": "ComponentSpecification",
  "description": "What this component does",
  "variants": ["variant1", "variant2"],
  "sizes": {
    "sm": { "height": 32, "padding": 12 },
    "md": { "height": 40, "padding": 16 },
    "lg": { "height": 48, "padding": 24 }
  },
  "states": ["default", "hover", "active", "disabled"],
  "accessibility": {
    "minTouchTarget": "44px",
    "keyboardNavigable": true,
    "ariaLabel": "required"
  }
}
```

**Always include:**
- Variants
- Sizes
- States
- Accessibility requirements

### Creating Theme Variants

To create a dark theme:

1. **Add theme collection:**
   ```json
   "themes": {
     "light": {
       "background": { "alias": "primitive.semantic.white" },
       "text": { "alias": "primitive.neutral.900" }
     },
     "dark": {
       "background": { "alias": "primitive.neutral.900" },
       "text": { "alias": "primitive.semantic.white" }
     }
   }
   ```

2. **Update semantic tokens:**
   ```json
   "semantic": {
     "background": {
       "primary": {
         "light": { "alias": "themes.light.background" },
         "dark": { "alias": "themes.dark.background" }
       }
     }
   }
   ```

3. **Generate theme switcher:**
   ```css
   :root { /* light theme */ }
   [data-theme="dark"] { /* dark theme */ }
   ```

---

## Validation & Quality

### Automated Checks

**Run before committing:**

```javascript
// Check all aliases resolve
function validateAliases(ontology) {
  // Recursively check all alias properties
  // Return errors for unresolved references
}

// Check WCAG compliance
function validateContrast(ontology) {
  // Test all color combinations
  // Flag violations
}

// Check token completeness
function validateTokens(ontology) {
  // Ensure all required properties exist
  // Check for naming convention compliance
}
```

### Manual Review Checklist

Before deploying ontology updates:

- [ ] All primitive tokens have `value` property
- [ ] All semantic tokens have `alias` or `value`
- [ ] All component tokens reference semantic layer
- [ ] WCAG contrast ratios documented
- [ ] All components have accessibility specs
- [ ] Naming conventions followed
- [ ] Documentation updated
- [ ] Diagrams reflect changes
- [ ] Example code tested

---

## Implementation Roadmap

### Phase 1: Foundation ✅
- Core ontology JSON
- Token definitions
- Component specifications
- Documentation

### Phase 2: Figma Integration
- Create Figma variable collections
- Map tokens to Figma variables
- Set up auto-layout templates
- Test MCP extraction

### Phase 3: Code Generation
- Build token resolver
- Generate CSS variables
- Create Tailwind config
- Integrate with shadcn/ui

### Phase 4: Automation
- Figma → Ontology sync
- Auto-generate component code
- CI/CD pipeline for validation
- Automated testing

### Phase 5: Evolution
- Gather usage data
- Refine tokens based on patterns
- Add new components
- Expand to mobile platforms

---

## Lessons Learned

### What Worked Well

1. **Three-layer system:** Clear separation of concerns
2. **Alias-based references:** Easy global updates
3. **Schema.org compliance:** Machine-readable, future-proof
4. **Comprehensive documentation:** Reduces confusion

### What We'd Do Differently

1. **Start with fewer tokens:** Can always add, hard to remove
2. **More automation earlier:** Manual token creation is tedious
3. **Validate sooner:** Caught inconsistencies late
4. **Better naming from start:** Renaming breaks references

### Recommendations

1. **Keep primitives stable:** These are your bedrock
2. **Iterate on semantics:** This layer can evolve
3. **Validate obsessively:** Small errors compound
4. **Document decisions:** Future you will thank present you

---

## Conclusion

The BAIV Design System Ontology is more than a JSON file - it's a **comprehensive design language** that bridges human creativity and machine execution.

By formalizing design decisions into a structured, machine-readable format, we enable:
- **Consistency:** Design system enforced automatically
- **Velocity:** Rapid prototyping with guaranteed correctness
- **Flexibility:** Easy global updates without breaking changes
- **Collaboration:** Designers and developers speak the same language

This ontology is the foundation for a **fully automated design-to-code pipeline** where:
1. Designers create in Figma Make
2. MCP extracts design context
3. Claude generates production code
4. Everything follows the same token system

**The future of design systems is ontological.**

---

## Related Files

- **Ontology JSON:** `pfc-pfi-baiv-design-system-ontology.json`
- **Usage Guide:** `pfc-pfi-baiv-design-system-ontology-guide.md`
- **Diagram:** `pfc-pfi-baiv-ontology-diagram.mermaid`
- **Layout Templates:** `../02-LAYOUT-TEMPLATES/`
- **shadcn Mappings:** `../03-SHADCN-MAPPING/`

---

**Next:** Generate visual diagram with `pfc-pfi-baiv-ontology-diagram.mermaid`
