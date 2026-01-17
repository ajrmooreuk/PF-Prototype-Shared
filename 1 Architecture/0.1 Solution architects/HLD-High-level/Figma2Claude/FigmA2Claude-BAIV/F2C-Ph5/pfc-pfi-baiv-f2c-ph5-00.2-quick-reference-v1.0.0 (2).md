# PFC-PFI-BAIV Quick Reference Guide
**Version:** 1.0.0 | **Phase:** 5 | **Document:** 00.2 | **Date:** January 2026

---

## Command Reference

### MCP Extraction Commands

```bash
# Extract single Figma file
npx @anthropic/mcp-figma extract \
  --file-url "https://figma.com/file/ABC123..." \
  --output "./design-context.json"

# Extract with specific node
npx @anthropic/mcp-figma extract \
  --file-url "https://figma.com/file/ABC123..." \
  --node-id "123:456" \
  --output "./component-context.json"

# Batch extract multiple files
npx @anthropic/mcp-figma batch-extract \
  --files "./figma-urls.txt" \
  --output-dir "./extracted/"
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start

# Run tests
npm test
npm run test:e2e

# Lint and format
npm run lint
npm run format

# Type check
npm run type-check
```

### Deployment Commands

```bash
# Deploy to preview
vercel deploy

# Deploy to production
vercel deploy --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Environment variables
vercel env add
vercel env ls
```

### Supabase Commands

```bash
# Initialize project
supabase init

# Start local development
supabase start

# Stop local development
supabase stop

# Push schema changes
supabase db push

# Generate TypeScript types
supabase gen types typescript \
  --local > types/supabase.ts

# Run migrations
supabase migration up

# Create new migration
supabase migration new migration_name
```

---

## File Structure Reference

```
baiv-project/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── baiv/             # BAIV components
│   └── shared/           # Shared components
├── lib/                   # Utilities
│   ├── tokens.ts         # Design token resolver
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── styles/               # Global styles
│   ├── globals.css       # Global CSS
│   └── tokens.css        # Token variables
├── types/                # TypeScript types
│   ├── supabase.ts       # Generated types
│   └── tokens.ts         # Token types
├── config/               # Configuration
│   ├── agents.json       # Agent SDK config
│   ├── mcp.json          # MCP servers
│   └── tokens.json       # Token library
└── public/               # Static assets
```

---

## Token Reference

### Color Tokens

```typescript
// Primitive Tokens
'color.baiv.teal.500': '#00A4BF'
'color.baiv.orange.500': '#E84E1C'
'color.baiv.gold.500': '#CEC528'

// Semantic Tokens
'color.action.primary': 'color.baiv.teal.500'
'color.action.secondary': 'color.baiv.orange.500'
'color.accent.default': 'color.baiv.gold.500'

// Component Tokens
'Button.primary.background': 'color.action.primary'
'Button.primary.text': 'color.white'
'Button.primary.hover': 'color.baiv.teal.600'
```

### Spacing Tokens

```typescript
'spacing.xs': '4px'    // 0.25rem
'spacing.sm': '8px'    // 0.5rem
'spacing.md': '16px'   // 1rem
'spacing.lg': '24px'   // 1.5rem
'spacing.xl': '32px'   // 2rem
'spacing.2xl': '48px'  // 3rem
'spacing.3xl': '64px'  // 4rem
```

### Typography Tokens

```typescript
'font.heading': 'Titillium Web'
'font.body': 'Open Sans'
'font.mono': 'JetBrains Mono'

'text.xs': '12px'
'text.sm': '14px'
'text.base': '16px'
'text.lg': '18px'
'text.xl': '20px'
'text.2xl': '24px'
'text.3xl': '30px'
'text.4xl': '36px'
```

---

## Component Reference

### Button Component

```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

**Variants:** default, destructive, outline, secondary, ghost, link  
**Sizes:** default, sm, lg, icon

### Card Component

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input Component

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>
```

---

## Claude Prompt Templates

### Component Generation

```
Generate a Next.js component from this Figma design:

Requirements:
- Use TypeScript
- Follow BAIV design tokens
- Include shadcn/ui where applicable
- Add proper TypeScript types
- Include accessibility attributes
- Use Tailwind CSS for styling

Design Context: [paste design-context.json content]

Please provide:
1. Component code
2. TypeScript interface
3. Usage example
```

### Page Generation

```
Generate a complete Next.js page from this Figma design:

Requirements:
- Use App Router (app directory)
- TypeScript with strict mode
- BAIV design system tokens
- Responsive design (mobile-first)
- SEO metadata
- Loading states
- Error boundaries

Design Context: [paste design-context.json content]

Please provide:
1. Page component (page.tsx)
2. Layout if needed (layout.tsx)
3. Any sub-components
4. Metadata configuration
```

### Multi-Component Application

```
Generate a complete [app type] application:

Pages needed:
1. [Page 1 description]
2. [Page 2 description]
3. [Page 3 description]

Requirements:
- Next.js 14+ App Router
- TypeScript
- BAIV design system
- Supabase backend
- Authentication
- Responsive design

Figma files:
- [URL 1]
- [URL 2]
- [URL 3]

Please provide a complete implementation plan and code.
```

---

## Troubleshooting

### Common Issues & Solutions

**Issue: MCP extraction fails**
```bash
# Check Figma file permissions
# Ensure file URL is correct and accessible
# Verify MCP server is installed:
npm list @anthropic/mcp-figma

# Reinstall if needed:
npm install --save-dev @anthropic/mcp-figma
```

**Issue: Token not found**
```typescript
// Check token exists in config/tokens.json
// Verify token path is correct
// Use token resolver:
import { resolveToken } from '@/lib/tokens'
const value = resolveToken('color.action.primary')
```

**Issue: Build fails with TypeScript errors**
```bash
# Update types from Supabase
supabase gen types typescript --local > types/supabase.ts

# Check tsconfig.json is correct
# Run type check to see all errors:
npm run type-check
```

**Issue: Styles not applied correctly**
```bash
# Verify Tailwind is configured
# Check globals.css is imported in layout.tsx
# Ensure token CSS variables are loaded
# Clear Next.js cache:
rm -rf .next
npm run dev
```

**Issue: Supabase RLS errors**
```sql
-- Check RLS policies are enabled
SELECT * FROM pg_policies WHERE tablename = 'your_table';

-- Verify user context is set
SELECT auth.uid();
SELECT current_setting('request.jwt.claims', true)::json->>'user_id';
```

---

## Environment Variables

### Required Variables

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Vercel (auto-populated in deployment)
VERCEL_URL=
VERCEL_ENV=

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

### Local Development (.env.local)

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your values
nano .env.local

# Never commit .env.local to git
```

---

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Code Splitting

```tsx
// Dynamic imports for large components
import dynamic from 'next/dynamic'

const DashboardChart = dynamic(
  () => import('@/components/dashboard-chart'),
  { loading: () => <p>Loading chart...</p> }
)
```

### Font Optimization

```tsx
import { Open_Sans, Titillium_Web, JetBrains_Mono } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })
const titilliumWeb = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })
```

---

## Keyboard Shortcuts

### VS Code with BAIV Extension

- `Cmd/Ctrl + Shift + T` - Generate component from Figma
- `Cmd/Ctrl + Shift + P` - Extract design tokens
- `Cmd/Ctrl + Shift + G` - Generate page structure
- `Cmd/Ctrl + K, Cmd/Ctrl + D` - Open token reference

### Figma

- `Cmd/Ctrl + /` - Open Figma Make
- `Cmd/Ctrl + Shift + K` - View components
- `Cmd/Ctrl + Opt/Alt + K` - View variables
- `Cmd/Ctrl + Shift + E` - Export for dev

---

## Quick Links

### Documentation
- Executive Overview: Section 00.1
- Designer Workflow: Section 10.1
- Developer Workflow: Section 10.2
- Integration Playbook: Section 10.3

### External Resources
- Figma: https://figma.com/@baiv
- GitHub: https://github.com/yourorg/pfc-pfi-baiv
- Docs: https://docs.baiv.app
- Support: support@baiv.app

### Phase Documentation
- Phase 1: Core Ontology (Sections 01-03)
- Phase 2: Reusable Solutions (Section 04)
- Phase 3: Automation (Sections 05-06)
- Phase 4: Production (Sections 07-09)
- Phase 5: Workflows (Sections 00, 10)

---

## Cheat Sheet

### Daily Workflow (Developer)

```bash
# 1. Start day
npm run dev

# 2. Extract from Figma
npx @anthropic/mcp-figma extract --file-url "..." --output design.json

# 3. Generate with Claude
# Upload design.json to claude.ai
# Get component code

# 4. Add to project
# Create component file
# Import and use

# 5. Test
npm run lint
npm run type-check
npm test

# 6. Commit
git add .
git commit -m "feat: add new component"
git push

# 7. Deploy
vercel deploy
```

### Daily Workflow (Designer)

```
# 1. Start day
Open Figma → BAIV Design System

# 2. Create design
Use Figma Make for rapid layouts
Apply BAIV tokens
Follow naming conventions

# 3. Prepare handoff
Verify token assignments
Check layer structure
Add descriptions

# 4. Share with dev
Copy Figma URL
Post in Slack #baiv-design-system
Tag developer
```

---

**Document Control:**
- Version: 1.0.0
- Date: January 2026
- Status: Production Ready

---

*End of Quick Reference*
