# Designer Workflow: Figma to Production
**Version:** 1.0.0 | **Phase:** 5 | **Document:** 10.1 | **Date:** January 2026

---

## Overview

This guide walks designers through the complete BAIV workflow from initial concept to developer handoff. Average time: **30-45 minutes per page**.

---

## Prerequisites

### Tools Setup
- ✅ Figma account with edit access
- ✅ BAIV Design System library installed
- ✅ Figma Make plugin enabled
- ✅ Basic understanding of design tokens

### Knowledge Requirements
- Familiarity with Figma components and variants
- Understanding of responsive design principles
- Basic knowledge of design handoff processes

---

## Step-by-Step Workflow

### Step 1: Project Setup (5 min)

**1.1 Create New Figma File**
```
1. File → New design file
2. Rename: "[Project Name] - [Page Type] - v1.0"
3. Set up frames for different breakpoints:
   - Desktop: 1440px width
   - Tablet: 768px width
   - Mobile: 375px width
```

**1.2 Enable BAIV Library**
```
1. Assets panel → Library icon
2. Search "BAIV Design System"
3. Enable library
4. Verify variables are accessible
```

---

### Step 2: Rapid Layout Generation (10 min)

**2.1 Use Figma Make for Initial Layout**

**Template:** Hero Section
```
Prompt: Create a hero section for a SaaS product
- Primary color: BAIV Teal (#00A4BF)
- Style: Modern, clean, professional
- Include: Headline, subheadline, CTA button, hero image
- Layout: Left-aligned text, right-side image
- Spacing: Generous whitespace
```

**Template:** Feature Grid
```
Prompt: Create a 3-column feature grid
- Icons: Outline style
- Primary color: BAIV Teal
- Each feature: Icon, title, description
- Style: Card-based with subtle shadows
- Responsive: Stack on mobile
```

**Template:** Pricing Table
```
Prompt: Create a 3-tier pricing table
- Highlight middle tier with BAIV Orange
- Include: Plan name, price, features list, CTA
- Style: Clean cards with hover effects
- Responsive: Vertical stack on mobile
```

**2.2 Review AI-Generated Layout**
```
✓ Check overall structure
✓ Verify spacing feels appropriate
✓ Ensure text hierarchy is clear
✓ Confirm it matches brand style
✓ Review for accessibility (color contrast)
```

---

### Step 3: Token Application (10 min)

**3.1 Apply Color Tokens**

Primary brand colors should use exact tokens:
```
Background fills:
- Primary actions: color/action/primary (#00A4BF)
- Secondary actions: color/action/secondary (#E84E1C)
- Accent elements: color/accent/default (#CEC528)

Text colors:
- Headings: color/text/primary (gray-900)
- Body: color/text/secondary (gray-700)
- Muted: color/text/tertiary (gray-500)

Backgrounds:
- Surface: color/background/primary (white)
- Subtle: color/background/secondary (gray-50)
- Section: color/background/tertiary (gray-100)
```

**3.2 Apply Typography Tokens**
```
Headings:
- H1: font/heading, 48px (text/4xl), bold
- H2: font/heading, 36px (text/3xl), bold
- H3: font/heading, 30px (text/2xl), semibold
- H4: font/heading, 24px (text/xl), semibold

Body:
- Large: font/body, 18px (text/lg), regular
- Base: font/body, 16px (text/base), regular
- Small: font/body, 14px (text/sm), regular
- XS: font/body, 12px (text/xs), regular

Code/Mono:
- All code: font/mono, text/sm, regular
```

**3.3 Apply Spacing Tokens**
```
Component spacing:
- Tight: spacing/xs (4px)
- Compact: spacing/sm (8px)
- Base: spacing/md (16px)
- Comfortable: spacing/lg (24px)
- Spacious: spacing/xl (32px)

Section spacing:
- Between components: spacing/xl (32px)
- Between sections: spacing/3xl (64px)
- Page margins: spacing/2xl (48px)
```

**3.4 Apply Component Tokens**
```
Buttons:
- Primary: Button.primary.* tokens
- Secondary: Button.secondary.* tokens
- Ghost: Button.ghost.* tokens

Cards:
- Background: Card.background
- Border: Card.border
- Shadow: Card.shadow

Inputs:
- Background: Input.background
- Border: Input.border
- Focus: Input.focus.border
```

---

### Step 4: Component Refinement (10 min)

**4.1 Create Component Variants**

For buttons:
```
1. Select button instance
2. Create component (Cmd/Ctrl + Alt + K)
3. Add variants:
   - Property: Variant (default, destructive, outline, ghost)
   - Property: Size (sm, md, lg)
   - Property: State (default, hover, active, disabled)
```

**4.2 Set Up Auto Layout**
```
For containers:
- Direction: Horizontal/Vertical
- Padding: Use spacing tokens
- Gap: Use spacing tokens
- Alignment: Appropriate for content

For responsive design:
- Use "Hug contents" for flexible sizing
- Use "Fill container" for full-width
- Set max-width constraints
```

**4.3 Add Interactivity**
```
1. Select interactive elements
2. Prototype tab → Add interaction
3. Common patterns:
   - Hover: Change to hover state
   - Click: Navigate to page/overlay
   - Focus: Show focus state
```

---

### Step 5: Responsive Design (5 min)

**5.1 Create Breakpoint Variants**
```
1. Duplicate desktop frame
2. Resize to tablet (768px)
3. Adjust layout:
   - Reduce columns (3 → 2)
   - Adjust spacing
   - Resize images

4. Duplicate tablet frame
5. Resize to mobile (375px)
6. Adjust layout:
   - Stack columns vertically
   - Increase touch targets (min 44px)
   - Simplify navigation
```

**5.2 Test Responsive Behavior**
```
✓ All content readable at each breakpoint
✓ Buttons/inputs have adequate touch targets
✓ Images scale appropriately
✓ Text doesn't wrap awkwardly
✓ Spacing feels consistent
```

---

### Step 6: Accessibility Check (5 min)

**6.1 Color Contrast**
```
Use Figma plugins:
- "Stark" or "Contrast" plugin
- Check all text against backgrounds
- Target: WCAG AA (4.5:1 for text, 3:1 for large text)
- Fix: Darken text or lighten backgrounds
```

**6.2 Text Sizing**
```
✓ Minimum body text: 16px (text/base)
✓ Minimum button text: 14px (text/sm)
✓ Headings follow clear hierarchy
✓ Line height: 1.5 minimum for body
```

**6.3 Focus States**
```
✓ All interactive elements have visible focus
✓ Focus indicator: 2px solid, high contrast
✓ Focus order follows logical reading flow
```

---

### Step 7: Developer Handoff (5 min)

**7.1 Layer Naming Conventions**
```
Follow pattern: [Type] / [Name] / [Variant]

Examples:
- Button / Primary / Default
- Card / Feature / Hover
- Input / Email / Error
- Icon / ChevronRight / 24px

Benefits:
- MCP extraction reads names correctly
- Developers understand structure instantly
- Automated code generation works better
```

**7.2 Add Component Descriptions**
```
1. Select component
2. Right panel → Description field
3. Add:
   - Purpose: "Primary call-to-action button"
   - Behavior: "Opens modal on click"
   - Tokens: "Uses Button.primary.* tokens"
   - States: "Hover, Active, Disabled"
```

**7.3 Create Design Spec**
```
Add page to file: "Dev Handoff"

Include:
1. Token usage table
2. Component inventory
3. Responsive breakpoints
4. Interactive states
5. Special notes/gotchas
```

**7.4 Share with Developer**
```
1. Get shareable link (Share → Copy link)
2. Post in team channel:
   
   "🎨 Design Ready for Dev
   
   Page: [Name]
   Figma: [URL]
   Responsive: Desktop, Tablet, Mobile
   Components: [Count] new, [Count] existing
   Tokens: All BAIV tokens applied
   
   Ready for MCP extraction 🚀"

3. Tag relevant developer
4. Be available for questions
```

---

## Figma Make Prompt Library

### Hero Sections

**Prompt: Standard Hero**
```
Create a hero section for [product/service]
- Headline: [Value proposition]
- Subheadline: [Supporting text]
- Primary CTA: [Action]
- Secondary CTA: [Alternative action]
- Visual: [Hero image/illustration right side]
- Primary color: BAIV Teal
- Style: Modern, professional, clean
- Spacing: Generous padding
```

**Prompt: Hero with Video**
```
Create a hero section with video background
- Overlay: Semi-transparent dark (rgba(0,0,0,0.5))
- Center-aligned white text
- Headline: Large, bold
- CTA: BAIV Orange button
- Play button: Subtle, bottom-right
```

### Feature Sections

**Prompt: 3-Column Feature Grid**
```
Create 3-column feature grid
- Each column: Icon (top), Title, Description
- Icons: Outline style, BAIV Teal
- Layout: Equal width columns
- Spacing: 32px gap between columns
- Background: Light gray (gray-50)
```

**Prompt: Alternating Features**
```
Create alternating feature layout (3 sections)
- Section 1: Image left, content right
- Section 2: Content left, image right
- Section 3: Image left, content right
- Each: Title, description, bullet points, CTA
- Primary color: BAIV Teal
```

### Call-to-Action Sections

**Prompt: Simple CTA Banner**
```
Create centered CTA banner
- Background: BAIV Teal gradient
- White text: Headline + subheadline
- Button: White with teal text
- Full-width section
- Padding: 80px vertical
```

**Prompt: CTA with Benefits**
```
Create CTA section with benefit grid
- Left: Headline + CTA button
- Right: 4 benefits in 2x2 grid
- Background: White with subtle shadow
- Primary: BAIV Orange
- Checkmarks: BAIV Teal
```

---

## Quality Checklist

Before handoff, verify:

### Design Completeness
- [ ] All required breakpoints designed
- [ ] All interactive states defined
- [ ] Error states included
- [ ] Loading states designed
- [ ] Empty states created

### Token Compliance
- [ ] All colors use BAIV tokens
- [ ] Typography follows token scales
- [ ] Spacing uses token system
- [ ] Components use token-based styles
- [ ] No hard-coded hex values (except tokens)

### Accessibility
- [ ] Color contrast passes WCAG AA
- [ ] Text minimum 16px (body)
- [ ] Touch targets minimum 44x44px
- [ ] Focus states clearly visible
- [ ] Alt text provided for images

### Documentation
- [ ] Layers properly named
- [ ] Components have descriptions
- [ ] Dev handoff page created
- [ ] Special interactions documented
- [ ] Responsive behavior noted

### Handoff
- [ ] Figma link shared with dev
- [ ] Team channel notification sent
- [ ] Available for questions
- [ ] Timeline communicated

---

## Tips & Best Practices

### Work Faster
1. **Use Figma Make liberally** - Generate layouts quickly, refine after
2. **Leverage components** - Don't recreate buttons/cards every time
3. **Copy-paste sections** - Reuse proven layouts from other pages
4. **Keyboard shortcuts** - Learn common ones (see Quick Reference)

### Ensure Quality
1. **Start with tokens** - Apply tokens first, details second
2. **Review at actual size** - Zoom to 100% frequently
3. **Test on devices** - Use Figma Mirror on phone/tablet
4. **Get feedback early** - Share with team before "final"

### Collaborate Better
1. **Comment in Figma** - Tag developers with questions/notes
2. **Version designs** - Save iterations as new pages
3. **Document decisions** - Explain why you made choices
4. **Be available** - Respond quickly during dev implementation

---

## Common Mistakes to Avoid

### ❌ Don't
- Use hard-coded colors instead of tokens
- Forget to design hover/active states
- Ignore responsive breakpoints
- Skip accessibility checks
- Use cryptic layer names
- Hand off incomplete designs

### ✅ Do
- Apply BAIV tokens to every element
- Design all interactive states
- Test at all breakpoints
- Run contrast checks
- Follow naming conventions
- Complete quality checklist first

---

## Time Estimates

| Task | First Time | After Practice |
|------|-----------|----------------|
| Setup | 10 min | 5 min |
| Layout generation | 15 min | 10 min |
| Token application | 20 min | 10 min |
| Refinement | 15 min | 10 min |
| Responsive design | 15 min | 10 min |
| Accessibility | 10 min | 5 min |
| Handoff | 10 min | 5 min |
| **Total** | **95 min** | **55 min** |

---

## Next Steps

1. ✅ Complete this workflow for your first page
2. Review Section 10.2 (Developer Workflow) to understand next steps
3. Join team sync to discuss design → dev handoffs
4. Practice with smaller components first
5. Build up to full page designs

---

**Document Control:**
- Version: 1.0.0
- Date: January 2026
- Status: Production Ready

**Related:**
- 10.2: Developer Workflow
- 10.3: Integration Playbook
- 00.2: Quick Reference

---

*End of Designer Workflow*
