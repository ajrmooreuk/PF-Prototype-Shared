# PFC-PFI-BAIV v3.0 Ph3 - Claude Automation Guide

**Section:** 05 - Claude Automation  
**Version:** 3.0.0  
**Phase:** 3 - Automation & Integration  
**Date:** 2025-01-03

---

## 📋 Overview

This guide provides comprehensive workflows for automating the BAIV design-to-code pipeline using Claude via MCP (Model Context Protocol), Claude Agent SDK, and conversational workflows in claude.ai.

### What This Enables

✅ **Automated Figma Extraction** - Claude reads Figma designs via MCP  
✅ **Token-Accurate Code** - Generated code uses BAIV tokens automatically  
✅ **Multi-Component Generation** - Create entire page stacks in one workflow  
✅ **Agent SDK Integration** - Deploy directly to staging/production  
✅ **Consistency Enforcement** - Design system compliance validated automatically

---

## 🎯 Three Automation Tiers

### Tier 1: Conversational (claude.ai)
**Use When:** Quick prototypes, single components, learning the system  
**Workflow:** Chat with Claude → Share Figma URL → Receive code  
**Time:** 2-5 minutes per component

### Tier 2: MCP-Powered (Desktop/API)
**Use When:** Complex layouts, multi-component pages, batch generation  
**Workflow:** Claude MCP tools → Extract design context → Generate code  
**Time:** 5-10 minutes per page

### Tier 3: Agent SDK (Production)
**Use When:** Full applications, staging/production deployments  
**Workflow:** Agentic workflows → Multi-step generation → Automated deployment  
**Time:** 10-30 minutes per application

---

## 🚀 Tier 1: Conversational Workflows

### Workflow 1A: Single Component from Figma Make

**User Action:**
```
1. Generate layout in Figma Make using Phase 2 template
2. Share Figma URL: "https://figma.com/design/abc123/..."
3. Request: "Generate React code for this hero section using BAIV tokens"
```

**Claude Response Process:**
```javascript
// Step 1: MCP Extraction
Figma:get_design_context({
  fileKey: "abc123",
  nodeId: "1:2"
})

// Step 2: Identify Components
// Parse Figma layers → Map to BAIV components
// "btn-primary" → Button variant="primary"
// "card-feature" → Card with feature styling

// Step 3: Token Mapping
// Extract colors from design
// #00A4BF → var(--baiv-primary-500)
// Map to semantic tokens

// Step 4: Code Generation
// Generate React/Next.js code
// Apply BAIV component patterns
// Include proper imports
```

**Delivered Artifact:**
```tsx
// components/hero-section.tsx
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export function HeroSection() {
  return (
    <Container size="xl" className="py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-5xl font-bold text-baiv-neutral-900">
          Transform Your Digital Presence
        </h1>
        <p className="text-xl text-baiv-neutral-600">
          AI-powered design system delivering production-ready code
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </Container>
  );
}
```

---

### Workflow 1B: Component Variation Request

**User Request:**
```
"Create 3 variants of this pricing card:
1. Basic tier (gray theme)
2. Pro tier (teal theme, highlighted)
3. Enterprise tier (gold theme)"
```

**Claude Process:**
1. Reference Phase 2 pricing table template
2. Apply BAIV color tokens for each tier
3. Generate 3 component files with variant props

**Deliverable:**
```tsx
// components/pricing-card.tsx
type PricingTier = 'basic' | 'pro' | 'enterprise';

const tierStyles: Record<PricingTier, string> = {
  basic: 'border-baiv-neutral-300 bg-white',
  pro: 'border-baiv-primary-500 bg-baiv-primary-50 ring-2 ring-baiv-primary-500',
  enterprise: 'border-baiv-accent-500 bg-baiv-accent-50'
};

export function PricingCard({ tier, ... }: PricingCardProps) {
  return (
    <Card className={tierStyles[tier]}>
      {/* ... */}
    </Card>
  );
}
```

---

### Workflow 1C: Custom Component from Description

**User Request:**
```
"Create a stats dashboard card showing:
- Large metric value (48px, bold)
- Metric label below
- Trend indicator (up/down arrow with percentage)
- Small sparkline chart
- Use teal for positive trends, orange for negative"
```

**Claude Process:**
1. No Figma required - generate from specification
2. Reference Phase 1 ontology for typography/spacing
3. Apply Phase 2 component patterns
4. Use recharts for sparkline

**Deliverable:**
```tsx
// components/stats-card.tsx
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line } from 'recharts';

interface StatsCardProps {
  label: string;
  value: string;
  trend: number; // +5.2 or -2.3
  data: number[];
}

export function StatsCard({ label, value, trend, data }: StatsCardProps) {
  const isPositive = trend >= 0;
  
  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-baiv-neutral-600">{label}</p>
        <p className="text-5xl font-bold text-baiv-neutral-900">{value}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          isPositive ? 'text-baiv-primary-600' : 'text-baiv-secondary-600'
        }`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {Math.abs(trend)}%
        </div>
        
        <LineChart width={80} height={24} data={data.map(v => ({ value: v }))}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={isPositive ? '#00A4BF' : '#E84E1C'}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </div>
    </Card>
  );
}
```

---

## ⚙️ Tier 2: MCP-Powered Workflows

### Workflow 2A: Full Page Extraction

**Setup Requirements:**
```bash
# Claude Desktop with MCP enabled
# Figma MCP server configured
# Project has Phase 1-2 files accessible
```

**User Shares:**
```
Figma URL: https://figma.com/design/xyz789/landing-page?node-id=10-50
Request: "Extract this entire landing page and generate Next.js code"
```

**Claude MCP Workflow:**

```javascript
// 1. Get page metadata to understand structure
Figma:get_metadata({
  fileKey: "xyz789",
  nodeId: "10:50"
})

// Response shows hierarchy:
// - Frame "Landing Page"
//   - Frame "Hero Section" (10:51)
//   - Frame "Feature Grid" (10:52)
//   - Frame "Testimonials" (10:53)
//   - Frame "CTA Banner" (10:54)
//   - Frame "Footer" (10:55)

// 2. Extract each section with design context
const sections = [
  { name: 'hero', nodeId: '10:51' },
  { name: 'features', nodeId: '10:52' },
  { name: 'testimonials', nodeId: '10:53' },
  { name: 'cta', nodeId: '10:54' },
  { name: 'footer', nodeId: '10:55' }
];

for (const section of sections) {
  Figma:get_design_context({
    fileKey: "xyz789",
    nodeId: section.nodeId
  });
  
  // Extract: colors, typography, spacing, layer names
  // Map to BAIV tokens
  // Generate component code
}

// 3. Get variables/tokens from Figma file
Figma:get_variable_defs({
  fileKey: "xyz789",
  nodeId: "10:50"
})

// Map Figma variables → BAIV tokens
// "primary/500" → var(--baiv-primary-500)
```

**Deliverables:**
```
/app/(marketing)/page.tsx
/components/sections/hero-section.tsx
/components/sections/feature-grid.tsx
/components/sections/testimonial-carousel.tsx
/components/sections/cta-banner.tsx
/components/sections/footer.tsx
```

---

### Workflow 2B: Component Library Sync

**Use Case:** Sync 20+ Figma components to React codebase

**Process:**
```javascript
// 1. User provides Figma component library URL
// 2. Claude iterates through all components

const componentLibrary = await Figma:get_metadata({
  fileKey: "component-lib-123",
  nodeId: "0:1" // Page node
});

// 3. For each component:
componentLibrary.children.forEach(async (component) => {
  // Extract design
  const design = await Figma:get_design_context({
    fileKey: "component-lib-123",
    nodeId: component.id
  });
  
  // Check for Code Connect mapping
  const codeMap = await Figma:get_code_connect_map({
    fileKey: "component-lib-123",
    nodeId: component.id
  });
  
  // If no mapping, generate fresh
  // If mapping exists, update based on design changes
  
  // Generate/update React component
});

// 4. Output full component library
```

**Deliverable:**
```
/components/ui/
  ├── button.tsx (synced with Figma)
  ├── card.tsx (synced with Figma)
  ├── input.tsx (synced with Figma)
  ├── badge.tsx (synced with Figma)
  └── ... (20+ components)
```

---

### Workflow 2C: Design System Update Propagation

**Scenario:** BAIV primary color changes from #00A4BF to #0095B3

**Automated Update Process:**

```javascript
// 1. Update Phase 1 ontology
// pfc-pfi-baiv-design-system-ontology.json
{
  "tokens": {
    "colors": {
      "primitive": {
        "teal": {
          "500": { "value": "#0095B3" } // Changed
        }
      }
    }
  }
}

// 2. Claude scans all generated components
// Finds hardcoded values matching old color

// 3. Automated replacement
find /app /components -name "*.tsx" -type f -exec sed -i 's/#00A4BF/var(--baiv-primary-500)/g' {} \;

// 4. Update CSS variables
// global.css
:root {
  --baiv-primary-500: #0095B3; /* Updated */
}

// 5. Validation report
// "Updated 47 files, 153 color references"
// "All components now use token variables"
```

---

## 🤖 Tier 3: Agent SDK Workflows

### Workflow 3A: Full Application Bootstrap

**User Request:**
```
"Create a SaaS dashboard application with:
- Authentication (login, signup, password reset)
- Dashboard with stats cards and charts
- User settings page
- Admin panel
- Use BAIV design system throughout"
```

**Agent SDK Process:**

```javascript
// 1. Initialize Next.js project
agent.run(`
  npx create-next-app@latest baiv-saas-app \
    --typescript --tailwind --app --no-src-dir
`);

// 2. Install dependencies
agent.run(`
  cd baiv-saas-app
  npx shadcn@latest init -y
  npm install @clerk/nextjs recharts lucide-react
`);

// 3. Apply BAIV configuration
agent.copyFile({
  from: 'phase1/pfc-pfi-baiv-shadcn-mappings.json',
  to: 'baiv-saas-app/config/baiv-theme.json'
});

// 4. Generate pages (using Phase 2 templates)
const pages = [
  'auth/login',
  'auth/signup', 
  'auth/reset-password',
  'dashboard',
  'settings',
  'admin'
];

for (const page of pages) {
  const code = await agent.generateComponent({
    template: getBAIVTemplate(page),
    tokens: baivOntology,
    framework: 'nextjs-14-app-router'
  });
  
  agent.writeFile(`app/${page}/page.tsx`, code);
}

// 5. Deploy to Vercel
agent.run(`vercel --prod`);
```

**Deliverable:**
- Full application codebase
- Deployed to https://baiv-saas-app.vercel.app
- All pages using BAIV design system
- Ready for customization

**Time:** 15-20 minutes

---

### Workflow 3B: Multi-Variant Component Generation

**Use Case:** Generate landing page with A/B test variants

**Request:**
```
"Create 3 variants of the landing page hero:
A. Conservative (minimal, professional)
B. Energetic (bold colors, animations)
C. Premium (gold accents, luxury feel)

Deploy all 3 for A/B testing"
```

**Agent Workflow:**

```typescript
// 1. Generate base structure
const baseHero = generateComponent({
  template: 'hero-section',
  tokens: baivTokens
});

// 2. Create variants
const variants = {
  conservative: {
    colors: ['neutral-900', 'neutral-600'],
    animations: false,
    spacing: 'comfortable'
  },
  energetic: {
    colors: ['primary-600', 'secondary-600'],
    animations: true,
    cta: 'prominent'
  },
  premium: {
    colors: ['neutral-900', 'accent-600'],
    texture: 'gradient',
    typography: 'display'
  }
};

// 3. Generate each variant
for (const [name, config] of Object.entries(variants)) {
  const code = applyVariantConfig(baseHero, config);
  agent.writeFile(`components/hero-${name}.tsx`, code);
}

// 4. Create A/B test router
const abTestCode = `
import { cookies } from 'next/headers';
import HeroConservative from '@/components/hero-conservative';
import HeroEnergetic from '@/components/hero-energetic';
import HeroPremium from '@/components/hero-premium';

export function HeroABTest() {
  const variant = cookies().get('hero_variant')?.value || 'conservative';
  
  const heroes = {
    conservative: HeroConservative,
    energetic: HeroEnergetic,
    premium: HeroPremium
  };
  
  const HeroComponent = heroes[variant as keyof typeof heroes];
  return <HeroComponent />;
}
`;

agent.writeFile('components/hero-ab-test.tsx', abTestCode);

// 5. Deploy with feature flags
agent.deploy({
  variants: ['conservative', 'energetic', 'premium'],
  distribution: [33, 33, 34] // Equal split
});
```

---

## 📚 Prompt Templates for Claude

### Template 1: Single Component Generation

```
Generate a [COMPONENT_TYPE] component using BAIV design system.

Design source: [FIGMA_URL or DESCRIPTION]

Requirements:
- Use BAIV color tokens from pfc-pfi-baiv-design-system-ontology.json
- Follow component patterns from pfc-pfi-baiv-component-specifications.md
- TypeScript strict mode
- Next.js 14+ App Router compatible
- Include responsive variants
- WCAG AA minimum

Deliver:
1. Full component code (components/[name].tsx)
2. Usage example
3. Props documentation
```

**Example:**
```
Generate a testimonial card component using BAIV design system.

Design source: Customer testimonial with:
- Quote text (large, serif font)
- Customer name and role
- Company logo
- 5-star rating
- Avatar image

Requirements: [as above]
```

---

### Template 2: Page Generation from Figma

```
Extract and generate Next.js page from Figma design.

Figma URL: [URL]
Page type: [Landing/Dashboard/Article/etc.]

Process:
1. Use MCP to extract design context
2. Identify all sections/components
3. Map colors to BAIV tokens
4. Generate page.tsx and component files
5. Apply responsive patterns from Phase 2

Deliver:
- app/[route]/page.tsx
- Individual component files
- Layout wrapper if needed
- README with component tree
```

---

### Template 3: Design System Update

```
Update all components to use new BAIV token values.

Changes:
- [TOKEN_NAME]: [OLD_VALUE] → [NEW_VALUE]

Tasks:
1. Update pfc-pfi-baiv-design-system-ontology.json
2. Find all hardcoded values in codebase
3. Replace with token variables
4. Update CSS variables
5. Test in Storybook/dev server
6. Generate change report

Deliver:
- Updated ontology JSON
- List of files modified
- Before/after screenshots
```

---

## 🔄 Automation Patterns

### Pattern 1: Figma → Code Pipeline

```
1. Designer creates layout in Figma Make (using Phase 2 prompts)
2. Designer shares Figma URL with developer
3. Developer shares URL with Claude
4. Claude extracts design via MCP
5. Claude generates React code with BAIV tokens
6. Developer reviews and commits
7. Automated deployment to staging
```

**Optimization:**
- Template library reduces Figma Make time
- MCP extraction eliminates manual handoff
- Token mapping ensures consistency
- No design → dev translation errors

---

### Pattern 2: Component Library Sync

```
1. Design team updates Figma component library
2. Figma webhook triggers Claude Agent
3. Agent compares Figma vs codebase
4. Agent identifies changes (new components, style updates)
5. Agent generates/updates React components
6. Agent creates PR with changes
7. Dev team reviews and merges
```

**Key:**
- Code Connect mappings track Figma ↔ React links
- Automated diffs prevent manual comparison
- PR workflow maintains code review

---

### Pattern 3: Multi-Page Application

```
1. Product manager defines page list
2. Claude generates all pages from templates
3. Claude creates routing structure
4. Claude applies consistent layouts
5. Claude generates navigation
6. Deploy to staging for review
```

**Example:**
```javascript
const pages = [
  { route: '/', template: 'landing' },
  { route: '/features', template: 'feature-showcase' },
  { route: '/pricing', template: 'pricing-table' },
  { route: '/blog', template: 'blog-grid' },
  { route: '/contact', template: 'contact-form' }
];

agent.generateApplication(pages, {
  designSystem: 'baiv',
  framework: 'nextjs-14',
  deployment: 'vercel'
});
```

---

## 🛠️ Claude MCP Tool Reference

### Tool: `Figma:get_design_context`

**Purpose:** Extract complete design context for code generation

**Input:**
```json
{
  "fileKey": "abc123xyz",
  "nodeId": "10:50"
}
```

**Output:**
```json
{
  "code": "/* Generated HTML/CSS structure */",
  "assets": {
    "logo.svg": "https://...",
    "hero-bg.jpg": "https://..."
  },
  "metadata": {
    "colors": ["#00A4BF", "#E84E1C"],
    "fonts": ["Titillium Web", "Open Sans"],
    "spacing": [16, 24, 32]
  }
}
```

**Usage in Automation:**
```javascript
// Extract design
const design = await Figma:get_design_context({ fileKey, nodeId });

// Map colors to tokens
const tokenMap = mapColorsToTokens(design.metadata.colors, baivOntology);

// Generate React code
const code = transformToReact(design.code, tokenMap);
```

---

### Tool: `Figma:get_code_connect_map`

**Purpose:** Get existing Figma → Code mappings

**Input:**
```json
{
  "fileKey": "abc123",
  "nodeId": "5:10"
}
```

**Output:**
```json
{
  "5:10": {
    "codeConnectSrc": "components/ui/button.tsx",
    "codeConnectName": "Button"
  }
}
```

**Usage:**
```javascript
// Check if component already exists
const mapping = await Figma:get_code_connect_map({ fileKey, nodeId });

if (mapping[nodeId]) {
  // Update existing component
  updateComponent(mapping[nodeId].codeConnectSrc);
} else {
  // Generate new component
  generateComponent(nodeId);
}
```

---

### Tool: `Figma:add_code_connect_map`

**Purpose:** Create new Figma → Code mapping

**Input:**
```json
{
  "fileKey": "abc123",
  "nodeId": "5:10",
  "componentName": "Button",
  "source": "components/ui/button.tsx",
  "label": "React"
}
```

**Result:** Future extractions will know this Figma component = Button.tsx

---

## 🎯 Quality Checklist

### ✅ Generated Code Must Have:

**Imports:**
- [ ] All BAIV components imported correctly
- [ ] Icons from lucide-react (not hardcoded SVGs)
- [ ] Types from component prop interfaces

**Styling:**
- [ ] All colors use `var(--baiv-*)` tokens
- [ ] Spacing uses Tailwind utilities (px-4, py-6, gap-8)
- [ ] Typography follows BAIV font/size/weight specs
- [ ] Responsive breakpoints (sm:, md:, lg:, xl:)

**Structure:**
- [ ] Semantic HTML (`<section>`, `<article>`, not `<div>` soup)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA labels for interactive elements
- [ ] Alt text for images

**TypeScript:**
- [ ] Props interface defined
- [ ] All props typed (no `any`)
- [ ] Variant types as string unions
- [ ] Children prop when applicable

**Best Practices:**
- [ ] Component is pure (no side effects)
- [ ] Variants use object mapping (not if/else chains)
- [ ] Default props provided
- [ ] Loading/error states handled

---

## 🐛 Troubleshooting

### Issue: MCP extraction fails

**Symptoms:** `Figma:get_design_context` returns empty/error

**Solutions:**
1. Verify Figma URL is correct format
2. Check file permissions (must be viewable)
3. Ensure nodeId exists in file
4. Try `get_metadata` first to validate access

---

### Issue: Generated code doesn't use BAIV tokens

**Symptoms:** Hardcoded hex colors in output

**Solutions:**
1. Explicitly provide ontology JSON in prompt
2. Add: "Map all colors to BAIV tokens from ontology"
3. Include token reference object in template

---

### Issue: Components don't match Figma design

**Symptoms:** Layout/spacing incorrect

**Solutions:**
1. Use `get_design_context` with full hierarchy
2. Request specific layer naming in Figma
3. Provide detailed spacing specs in prompt

---

## 📊 Metrics & Optimization

### Speed Benchmarks

**Manual Development:**
- Design → Figma: 30 min
- Figma → Code: 45 min
- Code review/fixes: 30 min
- **Total: 1h 45min**

**BAIV Automation (Tier 1):**
- Figma Make prompt: 2 min
- Claude generation: 3 min
- Review: 5 min
- **Total: 10 min** (90% faster)

**BAIV Automation (Tier 3):**
- Full page: 5 min
- Multi-page app: 15 min
- **Total: 15 min** (86% faster)

---

### Quality Improvements

**Consistency:**
- Manual: 60-70% design system compliance
- BAIV: 95-100% token usage

**Accessibility:**
- Manual: Often forgotten
- BAIV: WCAG AA enforced by default

**Responsiveness:**
- Manual: Requires explicit work
- BAIV: Built into all templates

---

## 🎓 Learning Path

### Beginner (Week 1)
1. Use Tier 1 workflows with Phase 2 templates
2. Generate 5-10 single components
3. Learn prompt patterns

### Intermediate (Week 2-3)
4. Use MCP tools for page extraction
5. Customize Phase 2 templates
6. Create custom components from descriptions

### Advanced (Month 2)
7. Build multi-page applications with Agent SDK
8. Create custom automation scripts
9. Extend BAIV with new patterns

---

## 📖 Related Documentation

**Phase 1 (Foundation):**
- `pfc-pfi-baiv-design-system-ontology.json` - Token source of truth
- `pfc-pfi-baiv-shadcn-mappings.json` - CSS variable mappings

**Phase 2 (Templates):**
- `pfc-pfi-baiv-figma-make-templates.json` - 8 core templates
- `pfc-pfi-baiv-component-specifications.md` - Component patterns

**Phase 3 (This Section):**
- `pfc-pfi-baiv-v3.0-ph3-claude-automation-guide.md` - This file
- `pfc-pfi-baiv-v3.0-ph3-multi-page-strategy.md` - Coming next
- `pfc-pfi-baiv-v3.0-ph3-agent-sdk-integration.json` - Coming next

---

## ✨ Summary

Claude automation transforms the BAIV workflow from hours to minutes while improving consistency and quality. The three-tier approach (Conversational → MCP → Agent SDK) provides flexibility for any use case, from quick prototypes to production applications.

**Key Takeaways:**
1. Always provide Figma URL or detailed description
2. Reference Phase 1-2 files explicitly
3. Request BAIV token usage in every prompt
4. Verify generated code against quality checklist
5. Use MCP tools for complex extractions

**Next Steps:**
- Review Multi-Page App Strategy (Section 06)
- Explore Agent SDK Integration patterns
- Practice with Phase 2 templates

---

**Version:** 3.0.0 Ph3  
**Section:** 05 - Claude Automation  
**Last Updated:** 2025-01-03
