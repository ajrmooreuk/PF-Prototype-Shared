# PFC-PFI-BAIV v3.0 Ph3 - Multi-Page Application Strategy

**Section:** 06 - Multi-Page Apps  
**Version:** 3.0.0  
**Phase:** 3 - Automation & Integration  
**Date:** 2025-01-03

---

## 📋 Overview

This guide provides strategic patterns for building complete multi-page applications using the BAIV design system, from single-page prototypes to complex SaaS platforms with dozens of routes.

### What This Enables

✅ **Consistent UX** - Shared layouts and navigation across all pages  
✅ **Rapid Scaffolding** - Generate 10+ pages in minutes  
✅ **Composable Sections** - Reuse Phase 2 components across pages  
✅ **Type-Safe Routing** - Next.js 14 App Router with TypeScript  
✅ **Scalable Architecture** - Clear patterns for 5 pages or 500

---

## 🎯 Application Types & Stack Recommendations

### 1. Marketing Website (5-10 pages)

**Typical Pages:**
- `/` - Landing page (hero, features, testimonials, pricing, CTA, footer)
- `/features` - Feature showcase with deep dives
- `/pricing` - Pricing table with comparison
- `/about` - Company story and team
- `/blog` - Blog grid/list
- `/blog/[slug]` - Article pages
- `/contact` - Contact form
- `/privacy` - Legal pages
- `/terms` - Terms of service

**BAIV Stack:**
```typescript
// Phase 2 Templates Used
- landing_page (hero + features + pricing + cta + footer)
- feature_showcase (feature grids with details)
- pricing_table (3-tier comparison)
- blog_grid (card layout)
- blog_article (content + sidebar)
- contact_form (multi-field with validation)

// Shared Components
- Navigation (header with logo, menu, CTA button)
- Footer (comprehensive multi-column)
- Container (max-width wrapper)
- Section (vertical spacing)
```

**Generation Time:** 15-20 minutes (full site)

---

### 2. SaaS Dashboard (15-30 pages)

**Typical Pages:**

**Authentication:**
- `/sign-in` - Login form
- `/sign-up` - Registration
- `/forgot-password` - Password reset
- `/verify-email` - Email confirmation

**Core App:**
- `/dashboard` - Overview with stats and charts
- `/projects` - List/grid of user projects
- `/projects/[id]` - Individual project detail
- `/tasks` - Task management
- `/analytics` - Data visualization
- `/reports` - Report generation
- `/team` - Team member management
- `/settings` - User preferences
- `/settings/profile` - Profile editing
- `/settings/billing` - Subscription management
- `/settings/integrations` - Third-party connections

**Admin:**
- `/admin/users` - User management
- `/admin/analytics` - System-wide analytics
- `/admin/settings` - System configuration

**BAIV Stack:**
```typescript
// Phase 2 Templates
- dashboard (stats cards + charts + tables)
- settings_page (form sections with tabs)
- data_table (sortable, filterable tables)
- admin_panel (user management grids)

// Additional Components
- Sidebar navigation
- Breadcrumbs
- Stats cards with trends
- Chart library (recharts with BAIV theme)
- Data tables (TanStack Table)
- Modal dialogs
- Toast notifications
```

**Generation Time:** 30-45 minutes (full app)

---

### 3. E-Commerce Platform (30-50 pages)

**Typical Pages:**

**Customer-Facing:**
- `/` - Homepage with featured products
- `/products` - Product grid with filters
- `/products/[category]` - Category pages
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Multi-step checkout
- `/account` - Customer account
- `/account/orders` - Order history
- `/account/wishlist` - Saved items

**Admin:**
- `/admin/products` - Product management
- `/admin/orders` - Order processing
- `/admin/customers` - Customer database
- `/admin/inventory` - Stock management
- `/admin/analytics` - Sales analytics

**BAIV Stack:**
```typescript
// Phase 2 Templates
- product_grid (card layout with filters)
- product_detail (images + specs + add-to-cart)
- shopping_cart (line items + totals)
- checkout_form (multi-step with validation)

// E-Commerce Specific
- Product card variants (list/grid)
- Filter sidebar
- Category navigation
- Order summary
- Payment form (Stripe integration)
```

**Generation Time:** 45-60 minutes (full platform)

---

### 4. Content Platform / Blog (20-40 pages)

**Typical Pages:**
- `/` - Homepage with latest posts
- `/articles` - All articles grid
- `/articles/[category]` - Category archives
- `/articles/[slug]` - Individual articles
- `/authors` - Author directory
- `/authors/[id]` - Author profile + posts
- `/tags/[tag]` - Tag archives
- `/search` - Search results
- `/newsletter` - Newsletter signup

**BAIV Stack:**
```typescript
// Phase 2 Templates
- blog_grid (responsive card layout)
- blog_article (content + sidebar + related)
- author_profile (bio + posts list)

// Content-Specific
- Article header (title, meta, featured image)
- Content area (MDX/rich text rendering)
- Related articles
- Comment section
- Search interface
```

**Generation Time:** 25-35 minutes (full site)

---

## 🏗️ Page Architecture Patterns

### Pattern 1: Section Composition

**Concept:** Pages are built by composing reusable section components

**Example: Landing Page**

```tsx
// app/(marketing)/page.tsx
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { PricingTable } from '@/components/sections/pricing-table';
import { CTABanner } from '@/components/sections/cta-banner';
import { Footer } from '@/components/sections/footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <TestimonialCarousel />
      <PricingTable />
      <CTABanner />
      <Footer />
    </>
  );
}
```

**Benefits:**
- Each section is independently testable
- Sections can be reordered easily
- Same section reusable on multiple pages
- Clear separation of concerns

---

### Pattern 2: Layout Nesting

**Concept:** Shared layouts wrap page content

**Example: Dashboard Layout**

```tsx
// app/(dashboard)/layout.tsx
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// app/(dashboard)/dashboard/page.tsx
// Automatically wrapped by layout
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <ChartsRow />
      <RecentActivity />
    </div>
  );
}
```

**Route Groups:**
```
app/
├── (marketing)/          # Public pages
│   ├── layout.tsx       # Marketing layout (header + footer)
│   ├── page.tsx         # Landing page
│   └── about/page.tsx
├── (dashboard)/          # Authenticated pages
│   ├── layout.tsx       # Dashboard layout (sidebar + header)
│   ├── dashboard/page.tsx
│   └── projects/page.tsx
└── (auth)/               # Auth pages (minimal layout)
    ├── layout.tsx       # Auth layout (centered box)
    ├── sign-in/page.tsx
    └── sign-up/page.tsx
```

---

### Pattern 3: Data-Driven Pages

**Concept:** Generate multiple pages from a content source

**Example: Blog Articles**

```tsx
// app/(marketing)/blog/[slug]/page.tsx
import { getAllArticles, getArticle } from '@/lib/content';
import { ArticleContent } from '@/components/article-content';
import { RelatedArticles } from '@/components/related-articles';

// Generate static params at build time
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(article => ({
    slug: article.slug
  }));
}

export default async function ArticlePage({
  params
}: {
  params: { slug: string }
}) {
  const article = await getArticle(params.slug);
  
  return (
    <article className="max-w-3xl mx-auto py-12">
      <header className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold font-baiv-display text-baiv-neutral-900">
          {article.title}
        </h1>
        <p className="text-lg text-baiv-neutral-600">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-baiv-neutral-500">
          <time>{article.date}</time>
          <span>·</span>
          <span>{article.readTime} min read</span>
        </div>
      </header>
      
      <ArticleContent content={article.content} />
      
      <RelatedArticles 
        currentSlug={params.slug} 
        category={article.category} 
      />
    </article>
  );
}
```

---

## 🗺️ Navigation Patterns

### Pattern 1: Top Navigation (Marketing)

```tsx
// components/layout/marketing-nav.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/brand/logo';

const navItems = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export function MarketingNav() {
  return (
    <header className="border-b border-baiv-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="text-baiv-neutral-600 hover:text-baiv-neutral-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="primary" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
```

---

### Pattern 2: Sidebar Navigation (Dashboard)

```tsx
// components/layout/dashboard-sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const navItems = [
  { 
    label: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    label: 'Projects', 
    href: '/projects', 
    icon: FolderKanban 
  },
  { 
    label: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3 
  },
  { 
    label: 'Settings', 
    href: '/settings', 
    icon: Settings 
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-baiv-neutral-50 border-r border-baiv-neutral-200 p-4">
      <nav className="space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-baiv-primary-100 text-baiv-primary-700'
                  : 'text-baiv-neutral-600 hover:bg-baiv-neutral-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

---

### Pattern 3: Breadcrumbs (Deep Hierarchies)

```tsx
// components/layout/breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-baiv-neutral-600">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {isLast ? (
              <span className="font-medium text-baiv-neutral-900">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-baiv-neutral-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// Usage
<Breadcrumbs
  items={[
    { label: 'Projects', href: '/projects' },
    { label: 'Website Redesign', href: '/projects/123' },
    { label: 'Tasks', href: '/projects/123/tasks' }
  ]}
/>
```

---

## 🔐 Authentication & Protected Routes

### Setup: Clerk Authentication

```bash
npm install @clerk/nextjs
```

```typescript
// middleware.ts (root)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/features(.*)',
  '/pricing(.*)',
  '/blog(.*)',
  '/about(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

---

### Protected Page Example

```tsx
// app/(dashboard)/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { StatsGrid } from '@/components/dashboard/stats-grid';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Fetch user-specific data
  const stats = await getUserStats(userId);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-baiv-display text-baiv-neutral-900">
        Dashboard
      </h1>
      <StatsGrid data={stats} />
    </div>
  );
}
```

---

## 📊 Data Fetching Strategies

### Strategy 1: Server Components (Default)

**Best For:** Static or user-specific data

```tsx
// app/(dashboard)/projects/page.tsx
import { getProjects } from '@/lib/api';

export default async function ProjectsPage() {
  // Fetched on server, cached automatically
  const projects = await getProjects();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
```

---

### Strategy 2: Client Components + React Query

**Best For:** Real-time data, mutations, optimistic updates

```tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask } from '@/lib/api';

export function TaskList() {
  const queryClient = useQueryClient();
  
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    refetchInterval: 30000, // Poll every 30s
  });
  
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="space-y-4">
      {tasks?.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
      <CreateTaskButton onCreate={createMutation.mutate} />
    </div>
  );
}
```

---

### Strategy 3: Hybrid (Server + Client)

**Best For:** Initial data from server, updates on client

```tsx
// app/(dashboard)/analytics/page.tsx
import { getAnalytics } from '@/lib/api';
import { AnalyticsCharts } from './analytics-charts';

export default async function AnalyticsPage() {
  // Initial data from server
  const initialData = await getAnalytics();
  
  // Pass to client component for interactivity
  return <AnalyticsCharts initialData={initialData} />;
}

// analytics-charts.tsx (client component)
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export function AnalyticsCharts({ initialData }) {
  const [dateRange, setDateRange] = useState('7d');
  
  const { data } = useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: () => getAnalytics(dateRange),
    initialData: dateRange === '7d' ? initialData : undefined,
  });
  
  return (
    <>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      <LineChart data={data} />
    </>
  );
}
```

---

## 🎨 Consistent Styling Across Pages

### Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* BAIV Design Tokens (from Phase 1) */
    --baiv-primary-500: #00A4BF;
    --baiv-secondary-500: #E84E1C;
    --baiv-accent-500: #CEC528;
    
    --baiv-neutral-50: #FAFAFA;
    --baiv-neutral-100: #F5F5F5;
    --baiv-neutral-900: #18181B;
    
    /* ... (all tokens from Phase 1) */
  }
  
  body {
    @apply font-baiv-body text-baiv-neutral-900 bg-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-baiv-display;
  }
}

@layer components {
  /* Reusable utility classes */
  .page-section {
    @apply py-16 md:py-24;
  }
  
  .content-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

---

### Shared Layout Components

```tsx
// components/layout/section.tsx
interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'gray' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

export function Section({ 
  children, 
  variant = 'default',
  size = 'md' 
}: SectionProps) {
  const bgClasses = {
    default: 'bg-white',
    gray: 'bg-baiv-neutral-50',
    primary: 'bg-baiv-primary-50',
  };
  
  const paddingClasses = {
    sm: 'py-12',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
  };
  
  return (
    <section className={`${bgClasses[variant]} ${paddingClasses[size]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// Usage across multiple pages
<Section variant="gray" size="lg">
  <FeatureGrid />
</Section>
```

---

## 🚀 Multi-Page Generation Workflow

### Step 1: Define Page Structure

```typescript
// scripts/generate-pages.ts
const pages = [
  {
    route: '/',
    template: 'landing_page',
    sections: ['hero', 'features', 'pricing', 'cta', 'footer'],
    layout: 'marketing',
  },
  {
    route: '/features',
    template: 'feature_showcase',
    sections: ['feature_hero', 'feature_grid', 'feature_details', 'cta'],
    layout: 'marketing',
  },
  {
    route: '/dashboard',
    template: 'dashboard',
    sections: ['stats_grid', 'charts_row', 'recent_activity'],
    layout: 'dashboard',
  },
  {
    route: '/projects',
    template: 'data_grid',
    sections: ['page_header', 'filters', 'project_grid', 'pagination'],
    layout: 'dashboard',
  },
  // ... more pages
];
```

---

### Step 2: Generate Pages with Claude

**Prompt Template:**

```
Generate a complete Next.js application with the following pages:

{{#each pages}}
Route: {{route}}
Template: {{template}}
Layout: {{layout}}
Sections: {{sections}}
{{/each}}

Requirements:
- Use BAIV design system tokens from pfc-pfi-baiv-design-system-ontology.json
- Follow Phase 2 component specifications
- Implement route groups: (marketing), (dashboard), (auth)
- Use shadcn/ui as component foundation
- TypeScript strict mode
- Server components by default, client components only when needed

Deliverables:
1. Complete app/ directory structure
2. All page files (page.tsx)
3. Layout files (layout.tsx)
4. Shared section components
5. Navigation components
6. README with project overview
```

---

### Step 3: Automated Deployment

```typescript
// Using Claude Agent SDK
agent.run(`
  # Clone template
  npx create-next-app@latest baiv-app --typescript --tailwind --app
  
  # Install deps
  cd baiv-app
  npx shadcn@latest init -y
  npm install @clerk/nextjs @tanstack/react-query recharts
  
  # Apply BAIV config
  # (agent copies Phase 1-2 files)
  
  # Generate pages
  # (agent creates all page.tsx files)
  
  # Deploy
  vercel --prod
`);
```

---

## 📈 Scaling Considerations

### Performance Optimization

**Image Optimization:**
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Above the fold
  className="rounded-lg"
/>
```

**Font Optimization:**
```typescript
// app/layout.tsx
import { Titillium_Web, Open_Sans } from 'next/font/google';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-baiv-display',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-baiv-body',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${titillium.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Route Prefetching:**
```tsx
import Link from 'next/link';

// Prefetches on hover
<Link href="/dashboard" prefetch={true}>
  Dashboard
</Link>
```

---

### Code Organization (50+ pages)

**Feature-Based Structure:**
```
app/
├── (marketing)/
│   ├── _components/        # Marketing-specific components
│   ├── layout.tsx
│   └── ...
├── (dashboard)/
│   ├── _components/        # Dashboard-specific components
│   ├── _lib/               # Dashboard utilities
│   ├── layout.tsx
│   └── ...
├── (admin)/
│   ├── _components/
│   └── ...
└── _shared/                # Shared across all route groups
    ├── components/
    ├── lib/
    └── hooks/
```

---

## 📚 Related Documentation

**Phase 1:**
- `pfc-pfi-baiv-design-system-ontology.json` - Design tokens
- `pfc-pfi-baiv-layout-templates.json` - Layout primitives

**Phase 2:**
- `pfc-pfi-baiv-figma-make-templates.json` - Page templates
- `pfc-pfi-baiv-component-specifications.md` - Component patterns

**Phase 3:**
- `pfc-pfi-baiv-v3.0-ph3-claude-automation-guide.md` - Automation workflows
- `pfc-pfi-baiv-v3.0-ph3-multi-page-strategy.md` - This file

---

## ✨ Summary

Multi-page applications with BAIV follow clear patterns:
1. **Compose from sections** - Reuse Phase 2 components
2. **Use route groups** - Organize by layout needs
3. **Share layouts** - DRY principle for navigation/footer
4. **Type-safe routing** - TypeScript for all routes
5. **Optimize early** - Images, fonts, prefetching

The BAIV system accelerates multi-page development from weeks to hours while maintaining consistency and quality.

---

**Version:** 3.0.0 Ph3  
**Section:** 06 - Multi-Page Apps  
**Last Updated:** 2025-01-03
