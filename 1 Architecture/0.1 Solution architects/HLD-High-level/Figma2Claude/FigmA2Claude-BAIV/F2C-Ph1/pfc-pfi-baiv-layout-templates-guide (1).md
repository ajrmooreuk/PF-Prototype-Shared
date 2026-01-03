# PFC-PFI-BAIV Layout Templates Guide

**Version:** 3.0.0  
**Date:** 2025-01-03  
**File:** `pfc-pfi-baiv-layout-templates.json`

---

## Overview

Layout templates provide reusable structural patterns for building consistent, responsive interfaces. These templates work in conjunction with the design system ontology tokens to create predictable, maintainable layouts.

---

## Layout Primitives

### Container

**Purpose:** Max-width content containers with responsive padding

**Variants:**

| Variant | Max Width | Use Case |
|---------|-----------|----------|
| `full` | 100% | Full-width layouts |
| `narrow` | 640px | Articles, forms, focused content |
| `standard` | 1024px | Default content width |
| `wide` | 1280px | Dashboards, data tables |

**Responsive Padding:**
- Mobile: 16px (spacing.4)
- Tablet: 24px (spacing.6)  
- Desktop: 32px (spacing.8)

**Usage Example:**
```jsx
<div className="max-w-[1024px] mx-auto px-4 md:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Stack

**Purpose:** Vertical stacking with consistent gaps

**Gap Options:**
- `tight`: 8px (spacing.2)
- `default`: 16px (spacing.4)
- `relaxed`: 24px (spacing.6)
- `loose`: 32px (spacing.8)

**Alignment:** start | center | end | stretch

**Usage Example:**
```jsx
<div className="flex flex-col gap-4">
  <FormField />
  <FormField />
  <Button />
</div>
```

### Inline

**Purpose:** Horizontal layout with wrapping

**Properties:**
- Direction: horizontal
- Wrap: true
- Gap: tight | default | relaxed
- Alignment: horizontal & vertical

**Usage Example:**
```jsx
<div className="flex flex-row flex-wrap gap-4 items-center justify-start">
  <Button />
  <Button />
  <Button />
</div>
```

### Grid

**Purpose:** Responsive grid layouts

**Variants:**

**1. Responsive Grid**
```
Mobile:  1 column
Tablet:  2 columns
Desktop: 3 columns
Wide:    4 columns
```

**2. Fixed Grid**
- 12-column system
- Auto-width columns
- Fixed gap

**3. Masonry Grid**
- Variable height items
- Auto-flow dense packing

**Usage Example:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

### Sidebar

**Purpose:** Sidebar + main content layout

**Variants:**
- `left`: Sidebar on left
- `right`: Sidebar on right

**Sidebar Width:**
- Mobile: 100% (stacked)
- Tablet: 256px
- Desktop: 280px

**Responsive Behavior:**
- Mobile: Stack vertically
- Tablet+: Side-by-side

**Usage Example:**
```jsx
<div className="flex flex-col md:flex-row gap-6">
  <aside className="w-full md:w-64 lg:w-70">
    {/* Sidebar */}
  </aside>
  <main className="flex-1">
    {/* Main content */}
  </main>
</div>
```

---

## Page Layouts

### Landing Page

**Structure:**
1. **Hero Section**
   - Container: standard
   - Padding: 64px top/bottom
   - Layout: stack (loose gap)
   - Alignment: center
   - Elements: heading, subheading, CTA buttons

2. **Features Section**
   - Container: standard
   - Padding: 48px top/bottom
   - Layout: responsive grid
   - Elements: 3 feature cards

3. **CTA Section**
   - Container: narrow
   - Padding: 48px top, 64px bottom
   - Layout: stack (default gap)
   - Alignment: center

**Usage:**
```jsx
<main>
  <section className="max-w-[1024px] mx-auto py-16">
    <div className="flex flex-col gap-8 items-center text-center">
      <h1>Hero Heading</h1>
      <p>Subheading</p>
      <div className="flex gap-4">
        <Button>Primary CTA</Button>
        <Button variant="outline">Secondary CTA</Button>
      </div>
    </div>
  </section>
  
  <section className="max-w-[1024px] mx-auto py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
    </div>
  </section>
</main>
```

### Dashboard

**Structure:**
1. **Header**
   - Container: full
   - Height: 64px
   - Sticky: true
   - Layout: inline (space-between)
   - Elements: logo, navigation, user menu

2. **Main**
   - Layout: sidebar (left)
   - Sidebar: navigation items (stack, tight gap)
   - Main: metrics grid + charts grid

**Usage:**
```jsx
<div className="min-h-screen">
  <header className="h-16 sticky top-0 bg-white border-b">
    <div className="h-full px-6 flex justify-between items-center">
      <Logo />
      <Navigation />
      <UserMenu />
    </div>
  </header>
  
  <div className="flex">
    <aside className="w-64 p-4">
      <nav className="flex flex-col gap-2">
        <NavItem />
        <NavItem />
      </nav>
    </aside>
    
    <main className="flex-1 p-8">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard />
          <MetricCard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard />
          <ChartCard />
        </div>
      </div>
    </main>
  </div>
</div>
```

### Article

**Structure:**
1. **Header**
   - Container: narrow
   - Padding: 48px top, 32px bottom
   - Elements: category, title, meta, image

2. **Content**
   - Container: narrow
   - Padding: 24px top, 48px bottom
   - Layout: stack (relaxed gap)
   - Elements: prose content

3. **Related**
   - Container: standard
   - Layout: responsive grid (3 columns)
   - Elements: article cards

### Form

**Structure:**
1. **Form Container**
   - Container: narrow
   - Padding: 48px top/bottom
   - Layout: stack (loose gap)
   - Sections:
     - Title + description (stack, tight)
     - Form fields (stack, default)
     - Buttons (inline, right-aligned)

### E-commerce

**Structure:**
1. **Header**
   - Container: wide
   - Layout: inline (space-between)
   - Elements: breadcrumb, sort dropdown

2. **Main**
   - Layout: sidebar (left)
   - Sidebar: filter groups
   - Main: product grid (responsive, 2-4 columns)

---

## Component Layouts

### Card

**Variants:**

**1. Default (Vertical)**
- Padding: 24px
- Gap: 16px
- Layout: stack

**2. Compact**
- Padding: 16px
- Gap: 8px
- Layout: stack

**3. Horizontal**
- Padding: 24px
- Gap: 24px
- Layout: inline
- Image width: 33% desktop, 40% tablet, 100% mobile

**Usage:**
```jsx
// Vertical card
<div className="p-6 flex flex-col gap-4">
  <Image />
  <Title />
  <Description />
</div>

// Horizontal card
<div className="p-6 flex flex-col md:flex-row gap-6">
  <div className="w-full md:w-2/5">
    <Image />
  </div>
  <div className="flex-1 flex flex-col gap-4">
    <Title />
    <Description />
  </div>
</div>
```

### Modal

**Structure:**
- Max width: 600px
- Padding: 24px
- Sections:
  1. Header (inline, space-between, border-bottom)
  2. Body (stack, default gap)
  3. Footer (inline, right-aligned, border-top)

**Usage:**
```jsx
<div className="max-w-[600px] p-6">
  <div className="flex justify-between items-center pb-4 border-b">
    <h2>Modal Title</h2>
    <button>×</button>
  </div>
  
  <div className="py-6 flex flex-col gap-4">
    {/* Content */}
  </div>
  
  <div className="pt-4 border-t flex justify-end gap-4">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </div>
</div>
```

### Navigation Bar

**Structure:**
- Height: 64px
- Padding: 24px horizontal
- Layout: inline (space-between)
- Sections:
  - Left: logo + nav links
  - Right: search, notifications, avatar

---

## Responsive Behaviors

### Stack to Inline

**Mobile:** Stack vertically  
**Tablet+:** Inline horizontally

```jsx
<div className="flex flex-col md:flex-row gap-4">
  {/* Elements */}
</div>
```

### Collapse to Hamburger

**Mobile/Tablet:** Hamburger menu  
**Desktop:** Full navigation

```jsx
{/* Mobile */}
<button className="md:hidden">☰</button>

{/* Desktop */}
<nav className="hidden md:flex gap-6">
  <NavLink />
  <NavLink />
</nav>
```

### Reduce Columns

**Mobile:** 1 column  
**Tablet:** 2 columns  
**Desktop:** 3 columns  
**Wide:** 4 columns

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Items */}
</div>
```

### Hide Sidebar

**Mobile:** Hidden  
**Tablet+:** Visible

```jsx
<aside className="hidden md:block md:w-64">
  {/* Sidebar */}
</aside>
```

---

## Layout Rules

### Spacing

**Section Gaps:**
- Mobile: 32px
- Desktop: 48px

**Container Padding:**
- Mobile: 16px
- Tablet: 24px
- Desktop: 32px

**Component Gaps:**
- Tight: 8px
- Default: 16px
- Relaxed: 24px
- Loose: 32px

### Alignment

**Text Alignment:**
- Hero sections: center
- Content sections: left
- Footer: center

**Content Alignment:**
- Narrow containers: center
- Standard/wide: left

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1023px
- **Desktop:** 1024px - 1279px
- **Wide:** 1280px+

---

## Figma Make Integration

### Layout Instructions

When prompting Figma Make:

```
Create a [page-type] layout using:
- Container: [variant]
- Main layout: [stack/grid/sidebar]
- Gap: [spacing token]
- Responsive: [behavior]

Use auto-layout for all containers.
Set constraints for responsive behavior.
Follow spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64px
```

### Layer Naming

**Convention:** `[layout-type]/[variant]`

**Examples:**
- Container/Standard
- Grid/Responsive
- Sidebar/Left
- Stack/Loose

---

## Code Generation Rules

### Framework

- Next.js 14+ with App Router
- React Server Components by default
- Client Components when needed (interactivity)

### Layout Components

**Use:**
- Flexbox for 1D layouts (stack, inline)
- CSS Grid for 2D layouts (grid)
- Semantic HTML (`<main>`, `<section>`, `<article>`, `<aside>`)

**Avoid:**
- Absolute positioning (except for overlays)
- Fixed pixel widths (use max-width)
- Inline styles

### Responsive

- Mobile-first media queries
- Breakpoints from ontology
- Use Tailwind responsive prefixes (md:, lg:, xl:)

### Spacing

- Always use spacing tokens
- Never hard-code pixel values
- Use gap utilities for flex/grid spacing

### Accessibility

- Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Skip links for navigation
- Landmark regions (nav, main, aside, footer)

---

## Best Practices

### ✅ DO

```jsx
// Use semantic HTML
<main className="max-w-[1024px] mx-auto px-4">
  <section className="py-12">
    <h2>Section Title</h2>
  </section>
</main>

// Use spacing tokens
<div className="flex flex-col gap-4">

// Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### ❌ DON'T

```jsx
// Don't use divs for everything
<div className="max-w-[1024px]">
  <div className="mb-12">
    <div className="font-bold">Section Title</div>
  </div>
</div>

// Don't hard-code spacing
<div style={{ marginBottom: '48px' }}>

// Don't use desktop-first
<div className="grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
```

---

## Related Files

- **Layout Templates JSON:** `pfc-pfi-baiv-layout-templates.json`
- **Layout Rationale:** `pfc-pfi-baiv-layout-rationale.md`
- **Layout Diagram:** `pfc-pfi-baiv-layout-structure-diagram.mermaid`
- **Design System Ontology:** `../01-ONTOLOGY/pfc-pfi-baiv-design-system-ontology.json`

---

## Version History

**v3.0.0** (2025-01-03)
- Complete layout template library
- 5 page layouts
- 3 component layouts
- Responsive behaviors
- Code generation rules
