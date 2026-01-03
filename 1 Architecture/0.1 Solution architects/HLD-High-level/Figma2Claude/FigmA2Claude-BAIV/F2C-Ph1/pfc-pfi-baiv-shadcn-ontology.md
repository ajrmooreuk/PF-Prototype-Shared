# PFC-PFI-BAIV shadcn/ui Ontology

**Version:** 3.0.0 | **Date:** 2025-01-03

## Purpose

Deep dive into how BAIV design tokens map to shadcn/ui's theming system, explaining the technical implementation and design decisions.

## shadcn/ui Architecture

### CSS Variables System

shadcn uses CSS custom properties (variables) for theming:

```css
:root {
  --background: 0 0% 100%;   /* HSL: hue saturation lightness */
  --foreground: 0 0% 9%;
  --primary: 188 100% 37%;
}
```

**Key features:**
1. **HSL format:** Easier color manipulation
2. **No `hsl()` wrapper:** Added at usage time
3. **Semantic names:** `--primary` not `--teal`
4. **Light/dark modes:** `:root` and `.dark` variants

### Tailwind Integration

Variables are mapped to Tailwind utilities:

```typescript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
}
```

Usage:
```tsx
<div className="bg-primary text-primary-foreground">
```

Compiles to:
```css
.bg-primary {
  background-color: hsl(var(--primary));
}
```

## BAIV → shadcn Mapping Strategy

### 1. Direct Mappings

Some BAIV tokens map 1:1 to shadcn variables:

| BAIV Token | shadcn Variable | Reasoning |
|-----------|----------------|-----------|
| brand.primary | --primary | Both represent primary brand color |
| brand.secondary | --secondary | Both represent secondary actions |
| status.error | --destructive | Both represent destructive/error states |

### 2. Semantic Equivalents

Some mappings require interpretation:

| BAIV Token | shadcn Variable | Reasoning |
|-----------|----------------|-----------|
| background.primary | --background | Primary background surface |
| background.secondary | --muted | Subtle backgrounds |
| text.primary | --foreground | Primary text color |
| text.secondary | --muted-foreground | Secondary text |
| border.default | --border | Default borders |
| border.focus | --ring | Focus indicator |

### 3. Calculated Values

Some shadcn variables require calculation:

**Example: Hover States**

```typescript
// shadcn uses opacity modifiers
"hover:bg-primary/90"  // 90% opacity

// BAIV has explicit hover colors
baiv.colors.semantic.primary.hover = "#008DA3"  // 10% darker

// Conversion: Use BAIV value or calculate
const primaryHover = "188 100% 32%"  // Reduced lightness from 37% to 32%
```

### 4. Component-Specific Mappings

shadcn components have specific expectations:

**Card Component:**
```typescript
// shadcn expects
--card: background color
--card-foreground: text color

// Maps to BAIV
--card: semantic.background.primary (#FFFFFF)
--card-foreground: semantic.text.primary (#171717)
```

**Input Component:**
```typescript
// shadcn expects
--input: border color

// Maps to BAIV
--input: component.input.default.border (#E5E5E5)
```

## Color Conversion: HEX → HSL

BAIV uses HEX, shadcn uses HSL. Conversion needed:

```typescript
function hexToHSL(hex: string): string {
  // Remove #
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Calculate HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}

// Example
hexToHSL('#00A4BF')  // Returns: "188 100% 37%"
```

**BAIV Primary Conversions:**
- `#00A4BF` → `188 100% 37%` (Primary)
- `#E84E1C` → `14 82% 51%` (Secondary)
- `#CEC528` → `56 67% 48%` (Accent)

## Component Variant Mapping

### Button Component

shadcn button has 5 default variants. BAIV matches exactly:

```typescript
// shadcn variants
type ButtonVariant = 
  | "default"     // Primary button
  | "secondary"   // Secondary button
  | "destructive" // Error/delete actions
  | "outline"     // Outlined button
  | "ghost"       // Minimal button
  
// BAIV equivalents
component.button.primary      → variant="default"
component.button.secondary    → variant="secondary"
component.button.destructive  → variant="destructive"
component.button.outline      → variant="outline"
component.button.ghost        → variant="ghost"
```

**Perfect alignment!** No customization needed.

### Button Sizes

shadcn sizes also align with BAIV:

```typescript
// shadcn sizes
"sm"      // 32px height
"default" // 40px height
"lg"      // 48px height

// BAIV sizes
components.button.sizes.sm  → 32px
components.button.sizes.md  → 40px
components.button.sizes.lg  → 48px
```

**Mapping:**
- BAIV `sm` → shadcn `sm`
- BAIV `md` → shadcn `default`
- BAIV `lg` → shadcn `lg`

### Card Component

shadcn card is simpler than BAIV:

```typescript
// shadcn: Single card variant
<Card>

// BAIV: Three variants
component.card.default   → <Card>
component.card.elevated  → <Card className="shadow-md">
component.card.outlined  → <Card className="border-2">
```

**Solution:** Add custom variants or use className overrides.

## Typography Integration

### Font Family

shadcn uses Tailwind's font utilities:

```typescript
// Tailwind config
fontFamily: {
  sans: ["'Open Sans'", "sans-serif"],
  heading: ["'Titillium Web'", "sans-serif"],
  mono: ["'JetBrains Mono'", "monospace"],
}

// Usage
<h1 className="font-heading">  // Titillium Web
<p className="font-sans">       // Open Sans
<code className="font-mono">    // JetBrains Mono
```

**BAIV mapping:**
- `font-heading` → tokens.typography.fontFamily.heading
- `font-sans` → tokens.typography.fontFamily.body
- `font-mono` → tokens.typography.fontFamily.mono

### Font Size

Direct mapping to Tailwind utilities:

```typescript
// BAIV tokens → Tailwind classes
fontSize.xs    → text-xs   (0.75rem)
fontSize.sm    → text-sm   (0.875rem)
fontSize.base  → text-base (1rem)
fontSize.lg    → text-lg   (1.125rem)
fontSize.xl    → text-xl   (1.25rem)
fontSize.2xl   → text-2xl  (1.5rem)
// ... etc
```

## Dark Mode Implementation

### Strategy

shadcn uses class-based dark mode:

```html
<html class="dark">  <!-- Toggles dark theme -->
```

### BAIV Dark Theme

```css
.dark {
  /* Backgrounds: Invert */
  --background: 0 0% 9%;      /* neutral.900 → neutral.50 */
  --foreground: 0 0% 100%;    /* white → black */
  --card: 0 0% 15%;           /* neutral.800 */
  
  /* Borders: Lighter in dark mode */
  --border: 0 0% 25%;         /* neutral.700 */
  
  /* Brand colors: Stay the same */
  --primary: 188 100% 37%;    /* No change */
  --secondary: 14 82% 51%;    /* No change */
  --accent: 56 67% 48%;       /* No change */
}
```

**Rationale:**
- **Backgrounds:** Invert (light → dark)
- **Borders:** Lighter for contrast
- **Brand colors:** Unchanged for consistency

### Accessibility Considerations

```typescript
// Ensure sufficient contrast in dark mode
function checkContrast(fg: string, bg: string): number {
  // Calculate WCAG contrast ratio
  // Return ratio (minimum 4.5:1 for AA)
}

// Example
checkContrast(
  "hsl(188 100% 37%)",  // Primary
  "hsl(0 0% 9%)"        // Dark background
)  // Returns: ~5.2:1 ✅ Passes AA
```

## Advanced: Dynamic Theming

### Runtime Token Updates

To change theme dynamically:

```typescript
function setThemeColor(color: string, value: string) {
  document.documentElement.style.setProperty(`--${color}`, value);
}

// Change primary color
setThemeColor('primary', '200 100% 50%');  // New blue
```

### Multi-Brand Support

```typescript
// Define brand variants
const brands = {
  baiv: {
    primary: "188 100% 37%",
    secondary: "14 82% 51%",
  },
  alternative: {
    primary: "200 100% 50%",
    secondary: "150 80% 45%",
  },
};

// Apply brand
function applyBrand(brand: keyof typeof brands) {
  Object.entries(brands[brand]).forEach(([key, value]) => {
    setThemeColor(key, value);
  });
}
```

## Chart Colors

shadcn uses `--chart-1` through `--chart-5` for data visualization:

```css
:root {
  --chart-1: 188 100% 37%;  /* BAIV Primary */
  --chart-2: 14 82% 51%;    /* BAIV Secondary */
  --chart-3: 56 67% 48%;    /* BAIV Accent */
  --chart-4: 221 83% 60%;   /* Info Blue */
  --chart-5: 160 84% 39%;   /* Success Green */
}
```

**Usage:**
```tsx
<ResponsiveContainer>
  <BarChart data={data}>
    <Bar dataKey="value1" fill="hsl(var(--chart-1))" />
    <Bar dataKey="value2" fill="hsl(var(--chart-2))" />
  </BarChart>
</ResponsiveContainer>
```

## Automated Generation

### Script: Generate shadcn Theme

```typescript
// scripts/generate-shadcn-theme.ts
import ontology from '../pfc-pfi-baiv-design-system-ontology.json';

function generateShadcnTheme(ontology) {
  const theme = {
    light: {},
    dark: {},
  };
  
  // Map BAIV tokens to shadcn variables
  theme.light.primary = hexToHSL(ontology.tokens.colors.primitive.brand.primary.value);
  theme.light.secondary = hexToHSL(ontology.tokens.colors.primitive.brand.secondary.value);
  // ... etc
  
  return theme;
}

// Output CSS
function generateCSS(theme) {
  return `
    :root {
      --primary: ${theme.light.primary};
      --secondary: ${theme.light.secondary};
    }
    
    .dark {
      --primary: ${theme.dark.primary};
      --secondary: ${theme.dark.secondary};
    }
  `;
}
```

## Related Files

- **shadcn Mappings JSON:** `pfc-pfi-baiv-shadcn-mappings.json`
- **shadcn Mapping Guide:** `pfc-pfi-baiv-shadcn-mapping-guide.md`
- **Component Diagram:** `pfc-pfi-baiv-component-mapping-diagram.mermaid`
