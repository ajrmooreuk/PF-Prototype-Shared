# PFC-PFI-BAIV Component Specifications

**Version:** 3.0.0  
**Last Updated:** 2025-01-03  
**Purpose:** Comprehensive component library specifications for BAIV design system

---

## Table of Contents

1. [Component Architecture](#component-architecture)
2. [Core Components](#core-components)
3. [Compound Components](#compound-components)
4. [Figma to Code Mapping](#figma-to-code-mapping)
5. [shadcn/ui Integration](#shadcnui-integration)
6. [Custom Component Patterns](#custom-component-patterns)

---

## Component Architecture

### Three-Layer System

```
Layer 1: PRIMITIVES (shadcn/ui base components)
├── Button
├── Input
├── Card
├── Badge
└── ... (20+ components)

Layer 2: BAIV STYLED (token-applied shadcn components)
├── Button (with BAIV colors, typography, spacing)
├── Input (with BAIV form styles)
├── Card (with BAIV shadows, borders)
└── ... (customized variants)

Layer 3: COMPOSITE (complex BAIV components)
├── HeroSection
├── FeatureGrid
├── PricingTable
├── TestimonialCarousel
└── ... (page-level components)
```

### Component File Structure

```typescript
// /components/ui/button.tsx (Layer 1 - shadcn/ui base)
// Unchanged from shadcn/ui default

// /components/baiv/button.tsx (Layer 2 - BAIV styled)
import { Button as BaseButton } from "@/components/ui/button"
// Applies BAIV design tokens

// /components/sections/hero-section.tsx (Layer 3 - Composite)
import { Button } from "@/components/baiv/button"
// Uses BAIV-styled components
```

---

## Core Components

### 1. Button Component

**Figma Layer Naming:** `btn-[variant]` (e.g., `btn-primary`, `btn-secondary`)

**Token Mapping:**
```typescript
{
  variants: {
    primary: {
      backgroundColor: 'brand.primary',      // #00A4BF
      color: 'neutral.50',                   // #FFFFFF
      hoverBackgroundColor: 'brand.primaryHover',  // #008A9F
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'brand.secondary',              // #E84E1C
      borderColor: 'brand.secondary',
      hoverBackgroundColor: 'brand.secondary',
      hoverColor: 'neutral.50',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'brand.primary',
      borderColor: 'brand.primary',
      hoverBackgroundColor: 'brand.primaryLight',  // #CCE8EE
    },
  },
  sizes: {
    small: {
      height: '40px',
      padding: '0 16px',      // spacing.4
      fontSize: '14px',        // body.small
    },
    medium: {
      height: '48px',
      padding: '0 24px',      // spacing.6
      fontSize: '16px',        // body.medium
    },
    large: {
      height: '56px',
      padding: '0 32px',      // spacing.8
      fontSize: '18px',        // body.large
    },
  },
}
```

**React Implementation:**
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#00A4BF] text-white hover:bg-[#008A9F] focus-visible:ring-[#00A4BF]",
        secondary: "border-2 border-[#E84E1C] text-[#E84E1C] hover:bg-[#E84E1C] hover:text-white",
        outline: "border-2 border-[#00A4BF] text-[#00A4BF] hover:bg-[#CCE8EE]",
      },
      size: {
        small: "h-10 px-4 text-sm",
        medium: "h-12 px-6 text-base",
        large: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Usage Examples:**
```tsx
<Button>Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline" size="large">Outline Large</Button>
```

---

### 2. Card Component

**Figma Layer Naming:** `card-[type]` (e.g., `card-feature`, `card-blog`, `card-pricing`)

**Token Mapping:**
```typescript
{
  base: {
    backgroundColor: 'neutral.50',          // #FFFFFF
    borderColor: 'neutral.200',             // #E5E5E5
    borderRadius: 'radius.lg',              // 12px
    padding: 'spacing.8',                   // 32px
    boxShadow: 'shadow.sm',                 // 0 2px 8px rgba(0,0,0,0.06)
  },
  hover: {
    boxShadow: 'shadow.md',                 // 0 8px 24px rgba(0,0,0,0.12)
    borderColor: 'brand.primary',           // #00A4BF
  },
  variants: {
    elevated: {
      boxShadow: 'shadow.lg',               // 0 16px 48px rgba(0,0,0,0.16)
    },
    outlined: {
      borderWidth: '2px',
      boxShadow: 'none',
    },
  },
}
```

**React Implementation:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl bg-white border border-[#E5E5E5] p-8 shadow-sm transition-shadow hover:shadow-md hover:border-[#00A4BF]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 pb-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-2xl font-semibold leading-tight text-[#171717]", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-[#525252] leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

**Usage Examples:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Feature Title</CardTitle>
    <CardDescription>Feature description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>
```

---

### 3. Input Component

**Figma Layer Naming:** `input-[type]` (e.g., `input-email`, `input-text`)

**Token Mapping:**
```typescript
{
  base: {
    height: '48px',
    padding: '12px 16px',               // spacing.3 spacing.4
    backgroundColor: 'neutral.50',       // #FFFFFF
    borderColor: 'neutral.300',          // #D4D4D4
    borderRadius: 'radius.md',           // 8px
    fontSize: '16px',                    // body.medium
    color: 'neutral.900',                // #171717
  },
  placeholder: {
    color: 'neutral.400',                // #A3A3A3
  },
  states: {
    focus: {
      borderColor: 'brand.primary',      // #00A4BF
      boxShadow: '0 0 0 3px rgba(0,164,191,0.1)',
    },
    error: {
      borderColor: 'status.error',       // #DC2626
      boxShadow: '0 0 0 3px rgba(220,38,38,0.1)',
    },
    success: {
      borderColor: 'status.success',     // #10B981
    },
    disabled: {
      backgroundColor: 'neutral.100',    // #F5F5F5
      color: 'neutral.400',              // #A3A3A3
    },
  },
}
```

**React Implementation:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-base transition-colors",
          "placeholder:text-[#A3A3A3]",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F5F5]",
          error 
            ? "border-[#DC2626] focus:ring-[#DC2626]" 
            : "border-[#D4D4D4] focus:border-[#00A4BF] focus:ring-[#00A4BF]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

---

### 4. Badge Component

**Figma Layer Naming:** `badge-[variant]` (e.g., `badge-status`, `badge-category`)

**Token Mapping:**
```typescript
{
  variants: {
    default: {
      backgroundColor: 'brand.primary',    // #00A4BF
      color: 'neutral.50',                 // #FFFFFF
    },
    secondary: {
      backgroundColor: 'brand.secondary',  // #E84E1C
      color: 'neutral.50',
    },
    success: {
      backgroundColor: 'status.success',   // #10B981
      color: 'neutral.50',
    },
    warning: {
      backgroundColor: 'status.warning',   // #F59E0B
      color: 'neutral.900',
    },
    error: {
      backgroundColor: 'status.error',     // #DC2626
      color: 'neutral.50',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'brand.primary',
      borderColor: 'brand.primary',
    },
  },
  sizes: {
    small: {
      padding: '2px 8px',                  // spacing.0.5 spacing.2
      fontSize: '12px',
      borderRadius: 'radius.full',         // 9999px
    },
    medium: {
      padding: '4px 12px',                 // spacing.1 spacing.3
      fontSize: '14px',
      borderRadius: 'radius.full',
    },
  },
}
```

---

## Compound Components

### 1. Hero Section

**Figma Layer Structure:**
```
hero-section (Frame)
├── container (Frame)
│   ├── hero-content (Frame)
│   │   ├── hero-headline (Text)
│   │   ├── hero-subheadline (Text)
│   │   └── hero-cta-group (Frame)
│   │       ├── btn-primary (Component)
│   │       └── btn-secondary (Component)
│   └── hero-media (Frame)
│       └── hero-image (Image)
```

**Component Specification:**
```typescript
interface HeroSectionProps {
  headline: string
  subheadline: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
  variant?: 'default' | 'centered' | 'minimal'
}
```

**Implementation:**
```tsx
import { Button } from "@/components/baiv/button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  variant = 'default',
}: HeroSectionProps) {
  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-20">
        <div className={cn(
          "grid gap-12",
          variant === 'centered' ? "text-center" : "md:grid-cols-[60%_40%] items-center"
        )}>
          {/* Content */}
          <div className="space-y-8">
            <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight text-[#171717]">
              {headline}
            </h1>
            <p className="text-xl leading-relaxed text-[#525252] max-w-[600px]">
              {subheadline}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button size="large" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
              {secondaryCTA && (
                <Button variant="secondary" size="large" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Hero Image */}
          {image && variant !== 'minimal' && (
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

---

### 2. Feature Grid

**Figma Layer Structure:**
```
features-section (Frame)
├── container (Frame)
│   ├── section-header (Frame)
│   │   ├── section-title (Text)
│   │   └── section-subtitle (Text)
│   └── features-grid (Frame - auto-layout)
│       └── feature-card (Component) × 6
│           ├── feature-icon (Frame)
│           ├── feature-headline (Text)
│           └── feature-description (Text)
```

**Component Specification:**
```typescript
interface Feature {
  icon: React.ComponentType<{ className?: string }>
  headline: string
  description: string
}

interface FeatureGridProps {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}
```

**Implementation:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/baiv/card"

export function FeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
}: FeatureGridProps) {
  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-20">
        {(title || subtitle) && (
          <div className="text-center mb-16 space-y-4">
            {title && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#171717]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-[#525252] max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn(
          "grid gap-8",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-[#00A4BF] flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-3">{feature.headline}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 3. Pricing Table

**Figma Layer Structure:**
```
pricing-section (Frame)
├── container (Frame)
│   ├── section-header (Frame)
│   └── pricing-grid (Frame)
│       └── pricing-card (Component) × 3
│           ├── plan-badge (Component - optional)
│           ├── plan-name (Text)
│           ├── price-display (Frame)
│           ├── feature-list (Frame)
│           └── cta-button (Component)
```

**Component Specification:**
```typescript
interface PricingPlan {
  name: string
  price: number
  period: string
  features: string[]
  recommended?: boolean
  ctaText: string
  ctaHref: string
}

interface PricingTableProps {
  title?: string
  subtitle?: string
  plans: PricingPlan[]
}
```

**Implementation:**
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/baiv/card"
import { Button } from "@/components/baiv/button"
import { Badge } from "@/components/baiv/badge"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingTable({ title, subtitle, plans }: PricingTableProps) {
  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-20">
        {(title || subtitle) && (
          <div className="text-center mb-16 space-y-4">
            {title && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#171717]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-[#525252] max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative",
                plan.recommended && "border-2 border-[#00A4BF] shadow-lg scale-105"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge>Recommended</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-semibold text-[#171717]">$</span>
                  <span className="text-5xl font-bold text-[#171717]">{plan.price}</span>
                  <span className="text-sm text-[#737373]">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span className="text-[#525252]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.recommended ? "primary" : "outline"}
                  size="large"
                  className="w-full"
                  asChild
                >
                  <Link href={plan.ctaHref}>{plan.ctaText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Figma to Code Mapping

### MCP Extraction Rules

**1. Layer Name → Component Type**
```typescript
const componentMapping = {
  'btn-*': 'Button',
  'card-*': 'Card',
  'input-*': 'Input',
  'badge-*': 'Badge',
  '*-section': 'section element',
  '*-container': 'div.container',
  '*-grid': 'Grid layout div',
  '*-headline': 'h1/h2/h3 heading',
  '*-subheadline': 'p element',
  '*-cta-group': 'div.flex gap',
}
```

**2. Auto-Layout → Flexbox/Grid**
```typescript
// Figma auto-layout horizontal → flex-row
// Figma auto-layout vertical → flex-col
// Figma auto-layout wrap enabled → grid (responsive columns)

const layoutMapping = {
  direction: {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  },
  gap: (figmaGap: number) => {
    // Convert Figma gap to Tailwind spacing
    const spacingMap = {
      8: 'gap-2',
      12: 'gap-3',
      16: 'gap-4',
      24: 'gap-6',
      32: 'gap-8',
    }
    return spacingMap[figmaGap] || `gap-[${figmaGap}px]`
  },
}
```

**3. Color Values → Token References**
```typescript
const colorTokenMap = {
  '#00A4BF': 'brand.primary',
  '#E84E1C': 'brand.secondary',
  '#CEC528': 'brand.accent',
  '#FFFFFF': 'neutral.50',
  '#171717': 'neutral.900',
  // ... complete mapping in ontology
}

// In generated code:
// bg-[#00A4BF] → use design token → className="bg-primary"
// (after configuring Tailwind to use BAIV tokens)
```

**4. Typography → Tailwind Classes**
```typescript
const typographyMapping = {
  'Titillium Web 60px/68px 700': 'font-heading text-6xl font-bold leading-tight',
  'Open Sans 16px/28px 400': 'font-body text-base leading-relaxed',
  'Open Sans 14px/24px 600': 'font-body text-sm font-semibold',
}
```

---

## shadcn/ui Integration

### Installation & Configuration

**1. Install shadcn/ui CLI:**
```bash
npx shadcn@latest init
```

**2. Configure `components.json`:**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**3. Update `tailwind.config.ts` with BAIV tokens:**
```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // BAIV Brand Colors
        primary: "#00A4BF",
        secondary: "#E84E1C",
        accent: "#CEC528",
        
        // Semantic aliases (use CSS variables for theme switching)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... rest of shadcn color system
      },
      fontFamily: {
        heading: ["Titillium Web", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      fontSize: {
        // BAIV Typography Scale
        'display': ['72px', { lineHeight: '80px', fontWeight: '700' }],
        'h1': ['60px', { lineHeight: '68px', fontWeight: '700' }],
        'h2': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'h3': ['36px', { lineHeight: '44px', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '32px', fontWeight: '600' }],
      },
      spacing: {
        // BAIV 4px base spacing scale (extending Tailwind defaults)
        '18': '72px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'lg': '0 16px 48px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

**4. Update `app/globals.css` with BAIV CSS variables:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    
    --primary: 188 100% 37%;        /* #00A4BF */
    --primary-foreground: 0 0% 100%;
    
    --secondary: 13 83% 51%;        /* #E84E1C */
    --secondary-foreground: 0 0% 100%;
    
    --accent: 54 72% 48%;           /* #CEC528 */
    --accent-foreground: 0 0% 9%;
    
    /* ... rest of color variables */
  }
  
  * {
    @apply border-[#E5E5E5];
  }
  
  body {
    @apply bg-white text-[#171717] font-body;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

---

### Component Installation & Customization

**Add components:**
```bash
npx shadcn@latest add button card input badge label textarea select
```

**Customize after installation** (example: Button):
```tsx
// /components/ui/button.tsx
// After shadcn generates this file, update variants to match BAIV specs:

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#008A9F]",  // BAIV primary
        secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",  // BAIV secondary
        outline: "border-2 border-primary text-primary hover:bg-[#CCE8EE]",  // BAIV outline
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

---

## Custom Component Patterns

### 1. Responsive Container

**Pattern:** Max-width container with responsive padding

```tsx
export function Container({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(
      "container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl",
      className
    )}>
      {children}
    </div>
  )
}
```

### 2. Section Wrapper

**Pattern:** Full-width section with background and vertical spacing

```tsx
export function Section({ 
  children, 
  className,
  background = 'white' 
}: {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'light' | 'dark'
}) {
  return (
    <section className={cn(
      "w-full py-20 md:py-32",
      background === 'white' && "bg-white",
      background === 'light' && "bg-[#FAFAFA]",
      background === 'dark' && "bg-[#262626] text-white",
      className
    )}>
      {children}
    </section>
  )
}
```

### 3. Feature Icon

**Pattern:** Circular icon container with brand background

```tsx
export function FeatureIcon({ 
  icon: Icon,
  className 
}: {
  icon: React.ComponentType<{ className?: string }>
  className?: string
}) {
  return (
    <div className={cn(
      "w-16 h-16 rounded-full bg-primary flex items-center justify-center",
      className
    )}>
      <Icon className="w-8 h-8 text-white" />
    </div>
  )
}
```

---

**End of Component Specifications**
