# PFC-PFI-BAIV shadcn/ui Mapping Guide

**Version:** 3.0.0 | **Date:** 2025-01-03

## Overview

This guide explains how to integrate BAIV design system tokens with shadcn/ui components, creating a seamless bridge between design and code.

## Quick Start

### 1. Install shadcn/ui

```bash
npx shadcn@latest init
```

### 2. Apply BAIV Theme

Replace `app/globals.css` with BAIV CSS variables:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    --primary: 188 100% 37%;
    --primary-foreground: 0 0% 100%;
    --secondary: 14 82% 51%;
    --secondary-foreground: 0 0% 100%;
    --accent: 56 67% 48%;
    --accent-foreground: 0 0% 9%;
    /* ... rest of variables */
  }
  
  .dark {
    --background: 0 0% 9%;
    --foreground: 0 0% 100%;
    /* ... dark mode variables */
  }
}
```

### 3. Update Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Open Sans'", "sans-serif"],
        heading: ["'Titillium Web'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... rest of colors
      },
    },
  },
} satisfies Config

export default config
```

### 4. Install Components

```bash
npx shadcn@latest add button card input badge alert
```

Components now use BAIV theme automatically!

## Token Mappings

### Color Variables

| shadcn Variable | BAIV Token | Value | Usage |
|----------------|------------|-------|-------|
| `--primary` | brand.primary | #00A4BF | Primary actions |
| `--secondary` | brand.secondary | #E84E1C | Secondary actions |
| `--accent` | brand.accent | #CEC528 | Highlights |
| `--destructive` | status.error | #EF4444 | Destructive actions |
| `--border` | border.default | #E5E5E5 | Borders |
| `--input` | border.default | #E5E5E5 | Input borders |
| `--ring` | border.focus | #00A4BF | Focus rings |

### Typography

| shadcn Class | BAIV Token | Value |
|-------------|------------|-------|
| `font-sans` | fontFamily.body | Open Sans |
| `font-heading` | fontFamily.heading | Titillium Web |
| `font-mono` | fontFamily.mono | JetBrains Mono |
| `text-sm` | fontSize.sm | 0.875rem |
| `text-base` | fontSize.base | 1rem |
| `text-lg` | fontSize.lg | 1.125rem |

## Component Examples

### Button

shadcn button variants map directly to BAIV:

```tsx
import { Button } from "@/components/ui/button"

// Primary (default)
<Button>Click me</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Outline
<Button variant="outline">Outline</Button>

// Ghost
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

**BAIV Mapping:**
- `variant="default"` → component.button.primary
- `variant="secondary"` → component.button.secondary
- `variant="outline"` → component.button.outline
- `variant="ghost"` → component.button.ghost
- `variant="destructive"` → component.button.destructive
- `size="sm"` → 32px height
- `size="default"` → 40px height
- `size="lg"` → 48px height

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**BAIV Mapping:**
- Background: component.card.default.bg
- Border: component.card.default.border
- Border radius: borderRadius.lg (8px)
- Padding: spacing.6 (24px)
- Shadow: shadow.sm

### Input

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid w-full gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

**BAIV Mapping:**
- Height: 40px (size.md)
- Border: component.input.default.border
- Border radius: borderRadius.md (6px)
- Padding: spacing.3 (12px horizontal)

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

### Alert

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

## Customization

### Modify Component Variants

To add BAIV-specific variants, edit the component file:

```typescript
// components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Add custom BAIV variant
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## Dark Mode

shadcn uses class-based dark mode. BAIV provides dark mode color tokens:

```css
.dark {
  --background: 0 0% 9%;        /* neutral.900 */
  --foreground: 0 0% 100%;      /* white */
  --card: 0 0% 15%;             /* neutral.800 */
  --muted: 0 0% 25%;            /* neutral.700 */
  --border: 0 0% 25%;           /* neutral.700 */
  /* Primary colors stay the same */
  --primary: 188 100% 37%;
  --secondary: 14 82% 51%;
}
```

Toggle dark mode:

```tsx
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle theme
    </Button>
  )
}
```

## Best Practices

### ✅ DO

- Use shadcn components out of the box (they use BAIV theme)
- Extend variants when needed
- Keep CSS variables in HSL format
- Use semantic color names (primary, secondary, destructive)

### ❌ DON'T

- Hard-code colors (`bg-[#00A4BF]`)
- Skip CSS variable mapping
- Mix different design systems
- Override component styles with inline styles

## Troubleshooting

### Colors Not Applying

**Problem:** Components don't use BAIV colors

**Solution:**
1. Check `globals.css` has CSS variables
2. Verify Tailwind config extends colors
3. Ensure HSL format (no `hsl()` wrapper in CSS variables)

### Font Not Loading

**Problem:** BAIV fonts not appearing

**Solution:**
1. Import fonts in `layout.tsx`:
```tsx
import { Open_Sans, Titillium_Web, JetBrains_Mono } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' })
const titillium = Titillium_Web({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-heading' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${openSans.variable} ${titillium.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

2. Update Tailwind config to use CSS variables:
```typescript
fontFamily: {
  sans: ['var(--font-sans)'],
  heading: ['var(--font-heading)'],
}
```

### Component Size Incorrect

**Problem:** Button/input height doesn't match BAIV specs

**Solution:** Check component size prop matches BAIV spec:
- `sm` → 32px
- `default` → 40px
- `lg` → 48px

## Related Files

- **shadcn Mappings JSON:** `pfc-pfi-baiv-shadcn-mappings.json`
- **shadcn Ontology:** `pfc-pfi-baiv-shadcn-ontology.md`
- **Component Mapping Diagram:** `pfc-pfi-baiv-component-mapping-diagram.mermaid`
- **Design System Ontology:** `../01-ONTOLOGY/pfc-pfi-baiv-design-system-ontology.json`
