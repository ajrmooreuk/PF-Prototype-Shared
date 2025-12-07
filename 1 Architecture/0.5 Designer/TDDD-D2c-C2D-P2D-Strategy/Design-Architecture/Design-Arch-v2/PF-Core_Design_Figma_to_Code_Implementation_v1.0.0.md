# Figma-to-Code Workflow: Claude Code SDK Integration

**Version:** 1.0.0 | **Platform:** BAIV Multi-Brand Architecture | **Date:** December 2025

---

| Field | Value |
|-------|-------|
| **Document ID** | PF-CORE-DESIGN-IMPL-003 |
| **Version** | 1.0.0 |
| **Document Purpose** | Implementation guide for Figma-to-Code workflows |
| **Target Audience** | Developers, Platform Engineers |
| **Related Schema** | Business Directory v3.1.0 |
| **Last Updated** | 2025-12-07 |

---

## Executive Summary

This guide documents the end-to-end workflow for transforming Figma designs into production-ready React/Next.js components using the Claude Code SDK and Figma MCP tools. The automation achieves a **50x speed improvement** (10 minutes vs 40-80 hours) for client dashboard creation.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BAIV Design-to-Code Pipeline                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│   │  FIGMA   │───▶│  CLAUDE  │───▶│  NEXT.JS │───▶│ SUPABASE │     │
│   │  Design  │    │ Code SDK │    │   App    │    │ Backend  │     │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘     │
│        │                │                │               │          │
│        ▼                ▼                ▼               ▼          │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│   │   MCP    │    │  Code    │    │ shadcn/  │    │   Auth   │     │
│   │  Tools   │    │Generation│    │    ui    │    │ Database │     │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Figma MCP Tools Reference

### 2.1 Primary Extraction Tool

**`Figma:get_design_context`** - Use this for all design extraction

```javascript
// Example usage
{
  "fileKey": "abc123XYZ456def789GHI",  // From Figma URL
  "nodeId": "123:456",                   // Target frame/component
  "clientLanguages": "typescript",
  "clientFrameworks": "react,nextjs"
}
```

**Returns:**
- Generated code suggestion
- Asset download URLs
- Component structure
- Style definitions

### 2.2 Design Token Extraction

**`Figma:get_variable_defs`** - Extract design tokens

```javascript
{
  "fileKey": "abc123XYZ456def789GHI",
  "nodeId": "0:1"  // Usually page-level for all variables
}
```

**Returns:**
```json
{
  "color/primary/500": "#1a365d",
  "color/secondary/500": "#2c5282",
  "spacing/md": "16px",
  "font/size/lg": "18px"
}
```

### 2.3 Code Connect Mapping

**`Figma:get_code_connect_map`** - Check existing mappings

```javascript
{
  "fileKey": "abc123XYZ456def789GHI",
  "nodeId": "123:456",
  "codeConnectLabel": "react"  // Optional: framework-specific
}
```

**Returns:**
```json
{
  "123:456": {
    "codeConnectSrc": "https://github.com/baiv/ui/Button.tsx",
    "codeConnectName": "Button"
  }
}
```

### 2.4 Structure Overview

**`Figma:get_metadata`** - For large files, get structure first

```javascript
{
  "fileKey": "abc123XYZ456def789GHI",
  "nodeId": "0:1"  // Page level
}
```

---

## 3. Component Generation Workflow

### Step 1: Extract Design Context

```typescript
// Using Figma MCP tool
const designContext = await figma.getDesignContext({
  fileKey: "YOUR_FILE_KEY",
  nodeId: "COMPONENT_NODE_ID"
});
```

### Step 2: Analyze Component Structure

The Claude Code SDK analyzes the design context to:

1. **Classify atomic level** (atom → molecule → organism)
2. **Map to shadcn/ui** components
3. **Identify variants** (size, state, type)
4. **Extract schema.org semantics**

### Step 3: Generate TypeScript Component

```typescript
// Generated output example
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Organization } from "@/lib/types/ontology";

interface OrganizationCardProps {
  organization: Organization;
  variant?: "default" | "compact" | "detailed";
  showAffiliate?: boolean;
}

export function OrganizationCard({
  organization,
  variant = "default",
  showAffiliate = true,
}: OrganizationCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <img 
          src={organization.logo} 
          alt={`${organization.name} logo`}
          className="h-12 w-12 rounded-md"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{organization.name}</h3>
          <span className="text-sm text-muted-foreground">
            {organization.industry.name}
          </span>
        </div>
        {showAffiliate && organization.affiliateStatus.isAffiliate && (
          <Badge variant="secondary">
            {organization.affiliateStatus.affiliateLevel}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {/* Component content based on variant */}
      </CardContent>
    </Card>
  );
}
```

### Step 4: Generate Type Definitions

```typescript
// Generated from Business Directory ontology
export interface Organization {
  "@type": "Organization";
  "@id": string;
  name: string;
  url: string;
  organizationType: string[];
  affiliateStatus: AffiliateStatus;
  brandConfiguration: BrandConfiguration;
  industry: Industry;
  employees: string[];
  raciOwner: string;
  comparativeAttributes: ComparativeAttributes;
}

export interface AffiliateStatus {
  isAffiliate: boolean;
  affiliateLevel?: "bronze" | "silver" | "gold" | "platinum";
  affiliateSince?: string;
}

export interface BrandConfiguration {
  brandMode: "own" | "co-branded" | "white-label";
  assignedTheme: string;
  masterId: string | null;
}
```

### Step 5: Generate Tests

```typescript
// Generated test file
import { render, screen } from "@testing-library/react";
import { OrganizationCard } from "./organization-card";
import { mockOrganization } from "@/test/fixtures";

describe("OrganizationCard", () => {
  it("renders organization name", () => {
    render(<OrganizationCard organization={mockOrganization} />);
    expect(screen.getByText(mockOrganization.name)).toBeInTheDocument();
  });

  it("shows affiliate badge when applicable", () => {
    render(<OrganizationCard organization={mockOrganization} showAffiliate />);
    expect(screen.getByText("gold")).toBeInTheDocument();
  });

  it("hides affiliate badge when showAffiliate is false", () => {
    render(<OrganizationCard organization={mockOrganization} showAffiliate={false} />);
    expect(screen.queryByText("gold")).not.toBeInTheDocument();
  });
});
```

---

## 4. Multi-Brand Theming

### 4.1 Token Hierarchy

```css
/* Primitive Tokens (raw values) */
:root {
  --color-blue-500: #1a365d;
  --color-blue-400: #2c5282;
  --color-teal-500: #38b2ac;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
}

/* Semantic Tokens (purpose-based) */
:root {
  --color-primary: var(--color-blue-500);
  --color-secondary: var(--color-blue-400);
  --color-accent: var(--color-teal-500);
  --spacing-sm: var(--spacing-2);
  --spacing-md: var(--spacing-4);
}

/* Component Tokens (component-specific) */
:root {
  --button-bg-primary: var(--color-primary);
  --button-height-md: 40px;
  --card-border-radius: var(--spacing-2);
}
```

### 4.2 Brand Mode Overrides

```css
/* Own Brand (organization uses their colors) */
[data-brand-mode="own"] {
  --color-primary: var(--client-primary, var(--color-blue-500));
  --color-secondary: var(--client-secondary, var(--color-blue-400));
}

/* Co-branded (partner + platform) */
[data-brand-mode="co-branded"] {
  --color-primary: var(--partner-primary);
  --color-accent: var(--platform-accent);
  /* Platform footer/header remain */
}

/* White-label (full rebrand) */
[data-brand-mode="white-label"] {
  --color-primary: var(--client-primary);
  --color-secondary: var(--client-secondary);
  --color-accent: var(--client-accent);
  /* All platform branding hidden */
}
```

---

## 5. Automation Recipes

### 5.1 New Client Dashboard (10 min vs 40-80 hrs)

```bash
# Step 1: Extract template
claude-code extract-design \
  --file-key TEMPLATE_FILE \
  --node-id DASHBOARD_FRAME \
  --output design-context.json

# Step 2: Apply client brand
claude-code apply-theme \
  --design design-context.json \
  --brand-config client-brand.json \
  --output themed-dashboard/

# Step 3: Generate components
claude-code generate \
  --input themed-dashboard/ \
  --framework nextjs \
  --output src/components/clients/

# Step 4: Run validation
pnpm test && pnpm lint && pnpm type-check

# Step 5: Deploy
vercel deploy --prod
```

### 5.2 Component Library Sync

```yaml
# .github/workflows/figma-sync.yml
name: Sync Figma Components

on:
  repository_dispatch:
    types: [figma-library-published]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Extract changed components
        run: |
          claude-code extract-changes \
            --webhook-payload '${{ github.event.client_payload }}' \
            --output changed-components.json
      
      - name: Regenerate components
        run: |
          claude-code regenerate \
            --changes changed-components.json \
            --preserve-logic
      
      - name: Run visual regression
        run: pnpm chromatic --exit-once-uploaded
      
      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          title: "chore: sync Figma component updates"
          body: "Automated sync from Figma library publish"
```

---

## 6. Best Practices Checklist

### Design Preparation
- [ ] All components use Auto Layout
- [ ] Variables defined for colors, spacing, typography
- [ ] Variant properties map to code props
- [ ] Layer names follow semantic conventions
- [ ] Component descriptions documented

### Code Generation
- [ ] Check Code Connect before generating
- [ ] Use semantic token names
- [ ] Generate TypeScript types
- [ ] Include Zod validation
- [ ] Add JSDoc comments
- [ ] Create Storybook stories

### Brand Theming
- [ ] CSS variables for all theme-able properties
- [ ] Token hierarchy: primitive → semantic → component
- [ ] Dark mode support via semantic tokens
- [ ] All brand modes tested

### Maintenance
- [ ] Figma-code sync automated
- [ ] Visual regression testing enabled
- [ ] Design tokens versioned
- [ ] Breaking changes documented

---

## 7. Related Resources

| Resource | Location |
|----------|----------|
| Business Directory Ontology | `schemas/business-directory-v3.1.0.json` |
| Figma Component Library | Figma Team Library |
| shadcn/ui Documentation | https://ui.shadcn.com |
| BAIV Style Guide | `docs/style-guide-v3.0.0.md` |
| Claude Code SDK | https://docs.anthropic.com/claude-code |

---

## 8. Quick Reference

### Figma URL to Parameters

```
https://figma.com/design/abc123XYZ/My-File?node-id=123-456
                        ^^^^^^^^           ^^^^^^^
                        fileKey            nodeId (use 123:456)
```

### Common Commands

```bash
# Extract design context
Figma:get_design_context --fileKey X --nodeId Y

# Get variables
Figma:get_variable_defs --fileKey X --nodeId Y

# Check code connect
Figma:get_code_connect_map --fileKey X --nodeId Y
```

---

**Document End** | W4M BAIV © 2025 | BAIV Platform

---

**W4M BAIV PF-Core v1.0.0 | BAIV Instance | Shared Files**
