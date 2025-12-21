# Figma → Design System → Production UI → Agent Orchestration

## Complete Step-by-Step Implementation Guide

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Phase 1: Figma Design System Setup](#2-phase-1-figma-design-system-setup)
3. [Phase 2: Token Extraction Pipeline](#3-phase-2-token-extraction-pipeline)
4. [Phase 3: Production UI with Shadcn](#4-phase-3-production-ui-with-shadcn)
5. [Phase 4: Agent Workflow Integration](#5-phase-4-agent-workflow-integration)
6. [Phase 5: Database & Ontologies](#6-phase-5-database--ontologies)
7. [Phase 6: CI/CD & Deployment](#7-phase-6-cicd--deployment)
8. [Multi-Tenant Brand Switching](#8-multi-tenant-brand-switching)

---

## 1. Architecture Overview

### Core Principle

**Design is created in Figma by designers. Agents are triggered BY the UI, not creating the UI.**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DESIGN LAYER                                   │
│  ┌──────────────┐                                                        │
│  │    FIGMA     │  Designers create:                                     │
│  │   (Source)   │  • Tokens (colors, spacing, typography)                │
│  │              │  • Components (buttons, cards, forms)                  │
│  │              │  • Layouts (pages, templates)                          │
│  └──────┬───────┘  • Brand variants (multi-tenant modes)                 │
│         │                                                                │
│         ▼                                                                │
│  ┌──────────────┐                                                        │
│  │    TOKEN     │  Automated extraction:                                 │
│  │   PIPELINE   │  • Figma REST API → tokens.json                        │
│  │              │  • Transform → CSS variables                           │
│  │              │  • Transform → Tailwind config                         │
│  └──────┬───────┘  • Transform → TypeScript types                        │
│         │                                                                │
└─────────┼────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                                │
│  ┌──────────────┐                                                        │
│  │  PRODUCTION  │  Built with design system:                             │
│  │     UI       │  • Next.js + React                                     │
│  │              │  • Shadcn/ui (styled with tokens)                      │
│  │              │  • 100% fidelity to Figma                              │
│  └──────┬───────┘                                                        │
│         │                                                                │
│         │ User interactions trigger workflows                            │
│         ▼                                                                │
│  ┌──────────────┐                                                        │
│  │    AGENT     │  Workflow orchestration:                               │
│  │  WORKFLOWS   │  • Claude SDK agents                                   │
│  │              │  • P1-P16 process framework                            │
│  │              │  • Tool integrations                                   │
│  └──────┬───────┘                                                        │
│         │                                                                │
│         │ Results rendered through design-system UI                      │
│         ▼                                                                │
│  ┌──────────────┐                                                        │
│  │   SUPABASE   │  Data persistence:                                     │
│  │   DATABASE   │  • Token storage with versioning                       │
│  │              │  • Vector search (pgvector)                            │
│  │              │  • Schema.org compliance                               │
│  └──────────────┘                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase 1: Figma Design System Setup

### Step 1.1: Create Variable Collections

In Figma, organize your design tokens into Variable Collections:

| Collection | Purpose | Example Variables |
|------------|---------|-------------------|
| `primitives` | Raw values | `blue-500`, `spacing-4`, `font-size-base` |
| `semantic` | Purpose-driven | `color-primary`, `color-background`, `spacing-component` |
| `component` | Component-specific | `button-padding`, `card-radius`, `input-height` |
| `brand` | Multi-tenant | Modes for each brand variant |

### Step 1.2: Structure Variables

```
primitives/
├── color/
│   ├── blue-50 → #EFF6FF
│   ├── blue-100 → #DBEAFE
│   ├── blue-500 → #3B82F6
│   └── ...
├── spacing/
│   ├── 0 → 0px
│   ├── 1 → 4px
│   ├── 2 → 8px
│   └── ...
└── typography/
    ├── font-size-xs → 12px
    ├── font-size-sm → 14px
    └── ...

semantic/
├── color/
│   ├── primary → {primitives/color/blue-500}
│   ├── background → {primitives/color/white}
│   ├── foreground → {primitives/color/slate-900}
│   └── ...
├── spacing/
│   ├── page → {primitives/spacing/6}
│   ├── section → {primitives/spacing/8}
│   └── ...
└── ...
```

### Step 1.3: Configure Brand Modes

For multi-tenant support, add modes to the `brand` collection:

1. Create `brand` variable collection
2. Add modes: `default`, `client-alpha`, `client-beta`
3. Override semantic tokens per mode:

```
brand (modes: default, client-alpha, client-beta)
├── color-primary
│   ├── default → {semantic/color/primary}
│   ├── client-alpha → #FF5722
│   └── client-beta → #4CAF50
└── ...
```

### Step 1.4: Component Naming Convention

Use atomic design hierarchy:

```
atoms/button/primary
atoms/button/secondary
atoms/input/default
molecules/card/default
molecules/form-field/default
organisms/header/main
organisms/sidebar/navigation
templates/dashboard/main
```

---

## 3. Phase 2: Token Extraction Pipeline

### Step 2.1: Environment Setup

```bash
# .env.local
FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FIGMA_FILE_KEY=your-file-key-from-figma-url
```

### Step 2.2: Create Extraction Script

```typescript
// scripts/extract-tokens.ts
import { createFigmaClient, FigmaTokenExtractor } from '../src/lib/figma-api';
import { createTokenTransformer } from '../src/lib/token-transformer';

async function extractTokens() {
  console.log('🎨 Extracting design tokens from Figma...');
  
  // Create Figma client
  const client = createFigmaClient();
  const extractor = new FigmaTokenExtractor(client);
  
  // Extract tokens
  const tokens = await extractor.extractTokens();
  console.log(`✅ Extracted ${countTokens(tokens)} tokens`);
  
  // Transform to outputs
  const transformer = createTokenTransformer({
    outputDir: './config/tokens',
    includeBrands: true
  });
  
  await transformer.writeOutputs(tokens);
  console.log('✅ Token outputs generated');
}

extractTokens().catch(console.error);
```

### Step 2.3: Run Extraction

```bash
npx tsx scripts/extract-tokens.ts
```

### Step 2.4: Generated Outputs

```
config/tokens/
├── tokens.json          # W3C DTCG format
├── variables.css        # CSS custom properties
├── tailwind.tokens.ts   # Tailwind theme extension
├── tokens.d.ts          # TypeScript definitions
└── tokens.schema.json   # Schema.org compliant
```

---

## 4. Phase 3: Production UI with Shadcn

### Step 3.1: Initialize Next.js Project

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npx shadcn@latest init
```

### Step 3.2: Integrate Design Tokens

**tailwind.config.ts:**

```typescript
import type { Config } from 'tailwindcss';
import { figmaTokens } from './config/tokens/tailwind.tokens';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      ...figmaTokens,
      // Shadcn uses CSS variables, so we map our tokens
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... map all semantic colors
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

**globals.css:**

```css
@import './config/tokens/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Map Figma tokens to Shadcn variables */
    --background: var(--semantic-color-background);
    --foreground: var(--semantic-color-foreground);
    --primary: var(--semantic-color-primary);
    --primary-foreground: var(--semantic-color-primary-foreground);
    /* ... */
  }

  /* Brand switching via data attribute */
  [data-brand="client-alpha"] {
    --primary: var(--brand-client-alpha-color-primary);
  }
  
  [data-brand="client-beta"] {
    --primary: var(--brand-client-beta-color-primary);
  }
}
```

### Step 3.3: Component Mapping Strategy

Map Figma components to Shadcn implementations:

| Figma Component | Shadcn Component | Token Bindings |
|-----------------|------------------|----------------|
| `atoms/button/primary` | `Button` variant="default" | `--button-bg`, `--button-text` |
| `atoms/button/secondary` | `Button` variant="secondary" | `--button-secondary-bg` |
| `molecules/card/default` | `Card` | `--card-bg`, `--card-border`, `--card-radius` |
| `organisms/form/default` | Custom composition | Multiple token bindings |

---

## 5. Phase 4: Agent Workflow Integration

### Step 5.1: Define Workflow Triggers

Map UI interactions to agent workflows:

```typescript
// config/agent-triggers.ts
export const WORKFLOW_TRIGGERS = [
  {
    id: 'trigger-discovery-scan',
    type: 'button_click',
    sourceComponent: 'DiscoveryPanel',
    sourceAction: 'onStartScan',
    workflowId: 'P1-discovery-profiling',
    payloadSchema: {
      type: 'object',
      properties: {
        brandUrl: { type: 'string' },
        competitors: { type: 'array' },
        scanDepth: { type: 'string' }
      }
    }
  },
  // ... more triggers
];
```

### Step 5.2: Create Agent API Route

```typescript
// app/api/agent/invoke/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  const { agentId, model, systemPrompt, tools, input } = await req.json();
  
  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: 'user', content: JSON.stringify(input) }
    ],
    // tools if needed
  });
  
  return NextResponse.json(response);
}
```

### Step 5.3: Connect UI to Workflows

```tsx
// In your component
import { useAgentTrigger } from '@/lib/ui-agent-bridge';

function MyComponent() {
  const { trigger } = useAgentTrigger('trigger-discovery-scan');
  
  const handleClick = async () => {
    const result = await trigger({
      brandUrl: 'https://example.com',
      scanDepth: 'standard'
    });
    // Result rendered through design-system components
  };
  
  return (
    <Button onClick={handleClick}>
      Start Scan
    </Button>
  );
}
```

---

## 6. Phase 5: Database & Ontologies

### Step 6.1: Supabase Setup

```bash
npx supabase init
npx supabase start
npx supabase migration new design_tokens
```

### Step 6.2: Schema with Vector Search

See `database/migrations/001_design_tokens.sql` for complete schema including:

- `brands` table (multi-tenant)
- `design_tokens` table with pgvector embeddings
- `components` table
- Semantic search functions

### Step 6.3: Schema.org Mapping

Every database entity includes Schema.org compliance:

```sql
-- Auto-generated Schema.org metadata
CREATE TRIGGER token_schema_org_trigger
    BEFORE INSERT OR UPDATE ON design_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_token_schema_org();
```

---

## 7. Phase 6: CI/CD & Deployment

### Step 7.1: GitHub Actions Workflow

```yaml
# .github/workflows/design-sync.yml
name: Design Token Sync

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  sync-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Extract Figma tokens
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: npx tsx scripts/extract-tokens.ts
        
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: sync design tokens from Figma'
          file_pattern: 'config/tokens/*'
```

### Step 7.2: Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 8. Multi-Tenant Brand Switching

### Step 8.1: Brand Context Provider

```tsx
// providers/brand-provider.tsx
'use client';

import { createContext, useContext, useState } from 'react';

const BrandContext = createContext<{
  brand: string;
  setBrand: (brand: string) => void;
}>({ brand: 'default', setBrand: () => {} });

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState('default');
  
  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      <div data-brand={brand}>
        {children}
      </div>
    </BrandContext.Provider>
  );
}

export const useBrand = () => useContext(BrandContext);
```

### Step 8.2: Runtime Brand Switching

```tsx
function BrandSwitcher() {
  const { brand, setBrand } = useBrand();
  
  return (
    <Select value={brand} onValueChange={setBrand}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="client-alpha">Client Alpha</SelectItem>
        <SelectItem value="client-beta">Client Beta</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

---

## Quick Start Commands

```bash
# 1. Clone the template
git clone <repo-url>
cd figma-agent-pipeline

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Add your FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY

# 4. Extract design tokens
npm run tokens:extract

# 5. Start development
npm run dev

# 6. Start Supabase locally
npx supabase start

# 7. Run migrations
npx supabase db push
```

---

## File Structure

```
figma-agent-pipeline/
├── src/
│   ├── lib/
│   │   ├── figma-api.ts          # Figma REST API client
│   │   ├── token-transformer.ts  # Token → CSS/Tailwind
│   │   ├── ui-agent-bridge.ts    # UI ↔ Agent connection
│   │   └── architecture-overview.ts
│   ├── agents/
│   │   └── design-system.ts      # Design-aware agents
│   ├── components/
│   │   ├── ui/                   # Shadcn components
│   │   └── discovery-panel.tsx   # Example integration
│   └── app/
│       └── api/agent/            # Agent API routes
├── config/
│   └── tokens/                   # Generated token files
├── database/
│   └── migrations/               # Supabase migrations
├── scripts/
│   └── extract-tokens.ts         # Token extraction
└── .github/
    └── workflows/                # CI/CD pipelines
```

---

## Key Takeaways

1. **Figma is the source of truth** - Designers work in Figma, not agents
2. **Tokens flow automatically** - API extraction, no plugins needed
3. **UI triggers agents** - Interactions spawn workflows
4. **Design system enforces consistency** - All outputs use tokens
5. **Schema.org compliance** - Future-proofed for AI interoperability
6. **Multi-tenant ready** - Brand switching via CSS variables

---

*Generated for BAIV Platform Architecture | December 2025*
