# PFC-PFI-BAIV Layout Rationale

**Version:** 3.0.0 | **Date:** 2025-01-03

## Purpose

This document explains the design decisions behind BAIV layout templates, why specific patterns were chosen, and how they support the overall design system goals.

## Core Principles

### 1. Mobile-First Responsive Design

**Decision:** All layouts default to mobile and progressively enhance

**Rationale:**
- 60%+ of web traffic is mobile
- Easier to scale up than down
- Forces focus on essential content
- Better performance on constrained devices

### 2. Consistent Spacing System

**Decision:** All spacing uses 4px base grid tokens

**Rationale:**
- Predictable visual rhythm
- Easy mental math (4, 8, 12, 16, 24, 32)
- Aligns with most design tools
- Pixel-perfect on all densities

### 3. Container-Based Layouts

**Decision:** Four container widths (full, narrow, standard, wide)

**Rationale:**
- **Full (100%):** Dashboards, immersive experiences
- **Narrow (640px):** Optimal reading width (60-75 characters)
- **Standard (1024px):** Balanced for most content
- **Wide (1280px):** Data-heavy interfaces

**Research basis:** Optimal line length for readability is 50-75 characters, achieved at ~640px with 16px font.

### 4. Flexbox + Grid Hybrid

**Decision:** Use flexbox for 1D, grid for 2D layouts

**Rationale:**
- Flexbox: Better for dynamic content, natural wrapping
- Grid: Better for defined structures, complex alignments
- Both are widely supported, performant
- Avoid complexity of pure grid-based systems

## Layout Primitives Rationale

### Stack (Vertical Layout)

**Why four gap options?**
- **Tight (8px):** Form labels, list items - related elements
- **Default (16px):** Standard spacing - balanced
- **Relaxed (24px):** Distinct sections - breathing room
- **Loose (32px):** Major sections - clear separation

### Grid Responsive Columns

**Why 1-2-3-4 progression?**
- **1 col (mobile):** Only option on small screens
- **2 col (tablet):** Optimal for landscape tablets
- **3 col (desktop):** Balanced, common pattern
- **4 col (wide):** Maximizes large screens

**Alternative rejected:** 5-6 columns creates visual clutter

### Sidebar Widths

**Why 256-280px?**
- Minimum for readable navigation labels
- Doesn't overwhelm main content (≈20-25% of 1024px)
- Fits typical nav patterns (5-15 items)

## Page Layout Decisions

### Landing Page

**Hero padding: 64px top/bottom**
- Creates breathing room
- Draws eye to content
- Common pattern users expect

**Centered alignment**
- Focus attention
- Works across screen sizes
- Reduces left-right reading

### Dashboard

**Sticky header: 64px**
- Persistent navigation access
- Doesn't block too much content
- Comfortable touch target

**Left sidebar (not right)**
- Aligns with reading direction (LTR)
- Common pattern recognition
- Easier to scan navigation first

### Article Layout

**Narrow container (640px)**
- Optimal reading width
- Reduces eye strain
- Professional appearance

**Relaxed gaps (24px)**
- Improves scannability
- Separates concepts
- Comfortable reading rhythm

## Component Layout Decisions

### Card Variants

**Why three variants?**
1. **Default:** Subtle - reduces visual weight
2. **Elevated:** Modern - floats above page
3. **Outlined:** Traditional - clear boundaries

**Padding: 24px**
- Balanced white space
- Comfortable for diverse content
- Aligns with spacing system (6 × 4px)

### Modal Max Width: 600px

**Rationale:**
- Wide enough for forms, content
- Narrow enough to maintain focus
- Doesn't overwhelm on mobile
- Golden ratio-adjacent (600/1024 ≈ 0.585)

### Nav Bar Height: 64px

**Rationale:**
- Comfortable touch target (> 44px minimum)
- Room for logo + text
- Visually balanced
- Industry standard (most sites 50-70px)

## Responsive Behavior Rationale

### Stack to Inline

**Decision:** Vertical mobile, horizontal desktop

**Rationale:**
- Mobile: Limited width, natural scrolling
- Desktop: Abundant width, horizontal scanning
- Progressive enhancement

### Collapse to Hamburger

**When:** Mobile/tablet → hamburger, Desktop → full

**Rationale:**
- Saves precious mobile space
- Full nav more scannable on desktop
- Users expect this pattern
- Accessibility: keyboard navigation still works

### Hide Sidebar

**When:** Hide mobile, show tablet+

**Rationale:**
- Mobile: No room for sidebar
- Tablet+: Improves navigation access
- Can be toggled if needed
- Main content remains primary

## Rejected Alternatives

### Why Not Fixed Sidebar?

**Rejected:** Permanently visible sidebar on all screens

**Reasons:**
- Reduces mobile content area too much
- Not all users need persistent nav
- Can feel claustrophobic
- Harder to implement responsively

### Why Not Absolute Positioning?

**Rejected:** Use absolute positioning for layouts

**Reasons:**
- Breaks responsive behavior
- Overlapping content issues
- Harder to maintain
- Accessibility problems

### Why Not CSS-in-JS for Layouts?

**Rejected:** Runtime CSS generation for layouts

**Reasons:**
- Performance overhead
- Complexity for simple layouts
- Tailwind provides enough flexibility
- Harder to debug

## Trade-offs

### Container Max-Widths

**Trade-off:** Fixed widths vs. fluid
**Choice:** Fixed with max-width
**Why:** Predictable line lengths, easier to design for

**Downside:** Wasted space on ultra-wide monitors
**Mitigation:** Wide variant (1280px) for data-heavy content

### Grid vs. Flexbox

**Trade-off:** Consistency vs. simplicity
**Choice:** Both - grid for 2D, flex for 1D
**Why:** Use the right tool for the job

**Downside:** Developers must learn both
**Mitigation:** Clear documentation, consistent patterns

### Mobile-First vs. Desktop-First

**Trade-off:** Initial complexity vs. maintainability
**Choice:** Mobile-first
**Why:** Most traffic is mobile, easier to add than remove

**Downside:** Initial development feels backwards
**Mitigation:** Training, examples, code snippets

## Accessibility Considerations

### Semantic HTML

**Decision:** Always use semantic elements

**Rationale:**
- Screen readers rely on structure
- SEO benefits
- Easier to style consistently
- No performance cost

**Examples:**
- `<main>` for primary content
- `<nav>` for navigation
- `<article>` for independent content
- `<aside>` for tangential content

### Heading Hierarchy

**Decision:** Enforce h1 → h2 → h3 order

**Rationale:**
- Screen reader navigation
- Document outline
- SEO significance
- Visual hierarchy reinforcement

### Skip Links

**Decision:** Include skip-to-main-content links

**Rationale:**
- Keyboard navigation efficiency
- WCAG requirement
- No visual cost (hidden until focused)

## Performance Considerations

### Why Flexbox/Grid Over Tables?

**Performance:**
- Faster rendering
- Better browser optimization
- GPU acceleration for transforms
- Smaller DOM tree

### Why Gap Over Margin?

**Decision:** Use `gap` for spacing in flex/grid

**Rationale:**
- Cleaner code
- No margin collapse issues
- Easier to change globally
- No "first-child, last-child" hacks

## Future Evolution

### Planned Improvements

1. **Container Queries**
   - When: Browser support reaches 90%
   - Why: Component-level responsiveness
   - Impact: Better reusability

2. **Subgrid**
   - When: Broader support
   - Why: Nested grid alignment
   - Impact: Complex layouts simplified

3. **View Transitions API**
   - When: Stable in all browsers
   - Why: Smooth layout changes
   - Impact: Better UX

### Monitoring & Iteration

**Metrics to track:**
- Most-used layout patterns
- Responsive breakpoint usage
- Page performance scores
- Accessibility audit results

**Review cycle:** Quarterly

---

## Related Files

- Layout Templates JSON: `pfc-pfi-baiv-layout-templates.json`
- Layout Guide: `pfc-pfi-baiv-layout-templates-guide.md`
- Layout Diagram: `pfc-pfi-baiv-layout-structure-diagram.mermaid`
