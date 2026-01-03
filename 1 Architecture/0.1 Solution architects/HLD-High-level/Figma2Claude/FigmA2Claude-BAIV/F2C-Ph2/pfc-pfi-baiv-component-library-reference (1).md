# PFC-PFI-BAIV Reusable Component Library

**Version:** 3.0.0  
**Last Updated:** 2025-01-03  
**Purpose:** Complete reference of reusable components for BAIV design system

---

## Component Categories

### 🎨 UI Primitives (shadcn/ui base)
| Component | Figma Layer | Token Mapping | Import Path | Status |
|-----------|-------------|---------------|-------------|--------|
| **Button** | `btn-[variant]` | `brand.primary`, `brand.secondary` | `@/components/ui/button` | ✅ |
| **Input** | `input-[type]` | `neutral.300`, `brand.primary` (focus) | `@/components/ui/input` | ✅ |
| **Textarea** | `textarea-*` | Same as Input | `@/components/ui/textarea` | ✅ |
| **Select** | `select-*` | Same as Input | `@/components/ui/select` | ✅ |
| **Checkbox** | `checkbox-*` | `brand.primary` (checked) | `@/components/ui/checkbox` | ✅ |
| **Radio** | `radio-*` | `brand.primary` (selected) | `@/components/ui/radio-group` | ✅ |
| **Switch** | `switch-*` | `brand.primary` (active) | `@/components/ui/switch` | ✅ |
| **Slider** | `slider-*` | `brand.primary` (track) | `@/components/ui/slider` | ✅ |
| **Card** | `card-[type]` | `neutral.50`, `neutral.200`, `shadow.sm` | `@/components/ui/card` | ✅ |
| **Badge** | `badge-[variant]` | `brand.primary`, `status.*` | `@/components/ui/badge` | ✅ |
| **Label** | `label-*` | `neutral.900` | `@/components/ui/label` | ✅ |
| **Separator** | `separator-*` | `neutral.200` | `@/components/ui/separator` | ✅ |
| **Avatar** | `avatar-*` | `neutral.200` (border) | `@/components/ui/avatar` | ✅ |
| **Progress** | `progress-*` | `brand.primary` (indicator) | `@/components/ui/progress` | ✅ |
| **Skeleton** | `skeleton-*` | `neutral.200` (background) | `@/components/ui/skeleton` | ✅ |

### 📦 Overlay Components
| Component | Figma Layer | Token Mapping | Import Path | Status |
|-----------|-------------|---------------|-------------|--------|
| **Dialog** | `dialog-*` | `neutral.50` (backdrop) | `@/components/ui/dialog` | ✅ |
| **Sheet** | `sheet-*` | Same as Dialog | `@/components/ui/sheet` | ✅ |
| **Drawer** | `drawer-*` | Same as Dialog | `@/components/ui/drawer` | ✅ |
| **Popover** | `popover-*` | `neutral.50`, `shadow.lg` | `@/components/ui/popover` | ✅ |
| **Tooltip** | `tooltip-*` | `neutral.800` (background) | `@/components/ui/tooltip` | ✅ |
| **Alert Dialog** | `alert-dialog-*` | Same as Dialog | `@/components/ui/alert-dialog` | ✅ |
| **Dropdown Menu** | `dropdown-*` | `neutral.50`, `shadow.md` | `@/components/ui/dropdown-menu` | ✅ |
| **Context Menu** | `context-menu-*` | Same as Dropdown | `@/components/ui/context-menu` | ✅ |
| **Command** | `command-*` | `neutral.50` | `@/components/ui/command` | ✅ |

### 📊 Data Display
| Component | Figma Layer | Token Mapping | Import Path | Status |
|-----------|-------------|---------------|-------------|--------|
| **Table** | `table-*` | `neutral.100`, `neutral.200` | `@/components/ui/table` | ✅ |
| **Accordion** | `accordion-*` | `neutral.100` (background) | `@/components/ui/accordion` | ✅ |
| **Collapsible** | `collapsible-*` | Same as Accordion | `@/components/ui/collapsible` | ✅ |
| **Tabs** | `tabs-*` | `brand.primary` (active) | `@/components/ui/tabs` | ✅ |
| **Alert** | `alert-[variant]` | `status.*` colors | `@/components/ui/alert` | ✅ |
| **Breadcrumb** | `breadcrumb-*` | `neutral.500` (inactive) | `@/components/ui/breadcrumb` | ✅ |
| **Pagination** | `pagination-*` | `brand.primary` (active) | `@/components/ui/pagination` | ✅ |

### 🧩 Compound Components (BAIV Custom)
| Component | Description | Figma Template | Import Path | Status |
|-----------|-------------|----------------|-------------|--------|
| **HeroSection** | Hero with headline, CTA, image | `01_hero_section` | `@/components/sections/hero-section` | 📝 |
| **FeatureGrid** | 3-col grid with icon, title, description | `02_feature_grid` | `@/components/sections/feature-grid` | 📝 |
| **CTABanner** | Full-width CTA with gradient | `03_cta_banner` | `@/components/sections/cta-banner` | 📝 |
| **TestimonialCarousel** | Customer testimonials slider | `04_testimonial_carousel` | `@/components/sections/testimonial-carousel` | 📝 |
| **PricingTable** | 3-tier pricing comparison | `05_pricing_table` | `@/components/sections/pricing-table` | 📝 |
| **BlogCardGrid** | Blog post cards grid | `06_blog_card_grid` | `@/components/sections/blog-card-grid` | 📝 |
| **FooterComprehensive** | Multi-column footer | `07_footer_comprehensive` | `@/components/sections/footer` | 📝 |
| **ContactForm** | Contact form with validation | `08_contact_form` | `@/components/sections/contact-form` | 📝 |

### 🎯 Specialized Components
| Component | Description | Use Case | Import Path | Status |
|-----------|-------------|----------|-------------|--------|
| **StatsCard** | Metric display with trend | Dashboards | `@/components/baiv/stats-card` | 📝 |
| **NewsletterForm** | Email signup inline | Marketing pages | `@/components/baiv/newsletter-form` | 📝 |
| **TeamMemberCard** | Photo, name, role, bio | Team pages | `@/components/baiv/team-member-card` | 📝 |
| **ProcessStep** | Numbered step with description | Onboarding flows | `@/components/baiv/process-step` | 📝 |
| **LogoCloud** | Company logo grid | Social proof | `@/components/baiv/logo-cloud` | 📝 |
| **VideoEmbed** | Responsive video player | Content pages | `@/components/baiv/video-embed` | 📝 |
| **Breadcrumbs** | Navigation breadcrumbs | Content hierarchy | `@/components/baiv/breadcrumbs` | 📝 |

---

## Usage Matrix

### By Page Type

#### 🏠 Landing Page
**Recommended Components:**
- `HeroSection` (above fold)
- `FeatureGrid` (value proposition)
- `TestimonialCarousel` (social proof)
- `PricingTable` (conversion)
- `CTABanner` (final push)
- `FooterComprehensive`

**Example Stack:**
```tsx
<HeroSection {...heroData} />
<FeatureGrid {...featuresData} />
<TestimonialCarousel {...testimonialData} />
<PricingTable {...pricingData} />
<CTABanner {...ctaData} />
<FooterComprehensive {...footerData} />
```

#### 📝 Content/Blog Page
**Recommended Components:**
- `Breadcrumbs` (navigation)
- `BlogCardGrid` (article listing)
- `NewsletterForm` (engagement)
- `FooterComprehensive`

**Example Stack:**
```tsx
<Breadcrumbs items={breadcrumbData} />
<Section>
  <Container>
    <BlogCardGrid posts={posts} columns={3} />
  </Container>
</Section>
<NewsletterForm variant="inline" />
<FooterComprehensive {...footerData} />
```

#### 📊 Dashboard
**Recommended Components:**
- `StatsCard` (KPIs)
- `Table` (data lists)
- `Tabs` (view switching)
- `Card` (content grouping)

**Example Stack:**
```tsx
<div className="grid grid-cols-4 gap-6">
  <StatsCard metric="Revenue" value="$48,392" trend={12.5} />
  <StatsCard metric="Users" value="8,492" trend={-3.2} />
  {/* ... */}
</div>
<Tabs defaultValue="overview">
  <TabsContent value="overview">
    <Table>{/* ... */}</Table>
  </TabsContent>
</Tabs>
```

#### 📞 Contact Page
**Recommended Components:**
- `HeroSection` (minimal variant)
- `ContactForm`
- `FeatureGrid` (contact methods)
- `FooterComprehensive`

---

## Token Application Reference

### Color Usage by Component

| Component | Primary Use | Secondary Use | Accent Use |
|-----------|-------------|---------------|------------|
| **Button** | Primary CTA | Secondary CTA | Hover state (outline) |
| **Input** | Focus border | - | - |
| **Badge** | Status indicator | Category tag | Premium indicator |
| **Card** | Hover border | - | Featured card accent |
| **Alert** | - | Warning background | - |
| **Progress** | Progress bar | - | - |
| **Link** | Inline links | - | Hover state |

### Typography Usage by Component

| Component | Heading Font | Body Font | Font Sizes |
|-----------|--------------|-----------|------------|
| **HeroSection** | Titillium Web (H1) | Open Sans (body) | 60px, 20px |
| **FeatureGrid** | Titillium Web (H3) | Open Sans (description) | 24px, 16px |
| **PricingTable** | Titillium Web (price) | Open Sans (features) | 48px, 16px |
| **BlogCard** | Titillium Web (title) | Open Sans (excerpt) | 20px, 16px |
| **Footer** | Titillium Web (headings) | Open Sans (links) | 16px, 14px |

### Spacing Usage by Component

| Component | Padding | Gap/Margin | Container |
|-----------|---------|------------|-----------|
| **Section** | 120px vertical, 80px horizontal | - | 1440px max |
| **Card** | 32px (spacing.8) | - | - |
| **FeatureGrid** | - | 32px (spacing.8) | - |
| **ButtonGroup** | - | 16px (spacing.4) | - |
| **Form Fields** | - | 24px (spacing.6) | - |

---

## Installation Guide

### 1. Install Dependencies

```bash
# Next.js project setup
npx create-next-app@latest baiv-project --typescript --tailwind --app

# Install shadcn/ui
npx shadcn@latest init

# Install icon library
npm install lucide-react

# Install utilities
npm install class-variance-authority clsx tailwind-merge
```

### 2. Configure Tailwind

Update `tailwind.config.ts` with BAIV tokens (see Component Specifications doc).

### 3. Add shadcn/ui Components

```bash
# Install all base components
npx shadcn@latest add button input card badge label \
  textarea select checkbox radio-group switch slider \
  dialog sheet drawer popover tooltip dropdown-menu \
  table accordion tabs alert breadcrumb pagination \
  avatar progress skeleton separator
```

### 4. Create BAIV Custom Components

```bash
# Create directory structure
mkdir -p components/{baiv,sections}

# Add compound components from templates
# (Copy implementations from Component Specifications doc)
```

---

## Development Workflow

### 1. Figma Make → Claude Code Generation

```
User Request → Figma Make Prompt → Figma Layout → Share URL with Claude
                                                           ↓
                                                    Claude uses MCP
                                                           ↓
                                              Extract design context
                                                           ↓
                                              Map to BAIV tokens
                                                           ↓
                                              Generate React code
                                                           ↓
                                              User receives production code
```

### 2. Component Reuse Pattern

```tsx
// 1. Import from component library
import { HeroSection } from '@/components/sections/hero-section'
import { FeatureGrid } from '@/components/sections/feature-grid'

// 2. Define data (can come from CMS/API)
const heroData = {
  headline: "Transform Your Business with AI",
  subheadline: "AI-driven insights for sustainable competitive advantage",
  primaryCTA: { text: "Get Started", href: "/contact" },
  secondaryCTA: { text: "Learn More", href: "/about" },
}

// 3. Use component with data
export default function HomePage() {
  return (
    <>
      <HeroSection {...heroData} />
      <FeatureGrid {...featuresData} />
    </>
  )
}
```

### 3. Customization Pattern

```tsx
// Extend existing component with new variant
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function IconButton({ icon: Icon, ...props }) {
  return (
    <Button
      {...props}
      className={cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        "gap-2"  // Add icon gap
      )}
    >
      <Icon className="w-4 h-4" />
      {props.children}
    </Button>
  )
}
```

---

## Quality Checklist

### ✅ Component Creation Checklist

When creating a new BAIV component:

- [ ] Figma layer naming follows convention
- [ ] All colors reference BAIV tokens
- [ ] Typography uses BAIV font scale
- [ ] Spacing uses 4px base unit
- [ ] Responsive breakpoints defined
- [ ] Hover/focus/active states implemented
- [ ] WCAG AA accessibility compliance
- [ ] TypeScript props interface defined
- [ ] Component documented with JSDoc
- [ ] Usage examples provided
- [ ] Storybook story created (optional)

### ✅ Code Generation Checklist

When Claude generates code from Figma:

- [ ] MCP successfully extracted design
- [ ] Colors mapped to tokens (not hardcoded HEX)
- [ ] Typography tokens applied
- [ ] Spacing tokens used
- [ ] shadcn/ui components utilized where possible
- [ ] Next.js 14+ conventions followed
- [ ] Accessibility attributes included
- [ ] Responsive design implemented
- [ ] TypeScript types defined
- [ ] Code follows BAIV patterns

---

## Maintenance & Updates

### Version Control

Components follow semantic versioning:
- **Major (3.0.0):** Breaking changes to API or design tokens
- **Minor (3.1.0):** New components or non-breaking features
- **Patch (3.0.1):** Bug fixes or documentation updates

### Update Process

1. Update Figma component library
2. Regenerate code using MCP extraction
3. Test across responsive breakpoints
4. Update documentation
5. Bump version numbers
6. Publish to component registry

---

## Support & Resources

### Documentation
- Component Specifications: `pfc-pfi-baiv-component-specifications.md`
- Figma Make Templates: `pfc-pfi-baiv-figma-make-templates.json`
- Prompt Generation Guide: `pfc-pfi-baiv-prompt-generation-guide.md`

### Tools
- Figma: Design and prototype
- Figma Make: AI layout generation
- Claude MCP: Design context extraction
- Claude Agent SDK: Code generation
- Next.js: Production framework
- shadcn/ui: Component foundation

---

**Legend:**
- ✅ = Implemented and documented
- 📝 = Specification complete, implementation pending
- 🚧 = In development
- ❌ = Not yet started

**End of Component Library Reference**
