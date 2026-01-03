# PFC-PFI-BAIV v3.0 Ph3 - Agent SDK Quick Reference

**Section:** Phase 3 Bonus - Agent SDK Integration  
**Version:** 3.0.0  
**Date:** 2025-01-03

---

## 📋 Overview

Quick reference for using Claude Agent SDK to automate BAIV application generation and deployment. This bridges Phase 3 automation with Phase 4 production workflows.

---

## 🚀 Setup

### Install Agent SDK

```bash
npm install -g @anthropic-ai/agent-sdk
```

### Initialize Agent

```typescript
import { Agent } from '@anthropic-ai/agent-sdk';

const agent = new Agent({
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-20250514',
});
```

---

## 🎯 Common Workflows

### 1. Bootstrap BAIV Application

```typescript
await agent.run(`
  # Create Next.js project
  npx create-next-app@latest baiv-app \
    --typescript \
    --tailwind \
    --app \
    --no-src-dir

  cd baiv-app

  # Install BAIV dependencies
  npm install \
    @radix-ui/react-slot \
    class-variance-authority \
    clsx \
    tailwind-merge \
    tailwindcss-animate \
    lucide-react

  # Initialize shadcn/ui
  npx shadcn@latest init -y
`);
```

---

### 2. Apply BAIV Configuration

```typescript
// Copy BAIV theme files
await agent.copyFile({
  from: '/phase1/pfc-pfi-baiv-shadcn-mappings.json',
  to: 'baiv-app/config/baiv-theme.json'
});

// Update tailwind.config.ts
await agent.updateFile({
  path: 'baiv-app/tailwind.config.ts',
  transform: (content) => {
    // Add BAIV color tokens
    return content.replace(
      'extend: {',
      `extend: {
        colors: {
          'baiv-primary': { /* ... */ },
          'baiv-secondary': { /* ... */ },
          'baiv-accent': { /* ... */ },
        },`
    );
  }
});

// Update globals.css
await agent.updateFile({
  path: 'baiv-app/app/globals.css',
  transform: (content) => {
    return content + `
    @layer base {
      :root {
        --baiv-primary-500: #00A4BF;
        --baiv-secondary-500: #E84E1C;
        --baiv-accent-500: #CEC528;
        /* ... more tokens */
      }
    }`;
  }
});
```

---

### 3. Generate Pages from Templates

```typescript
interface PageDefinition {
  route: string;
  template: string;
  sections: string[];
}

const pages: PageDefinition[] = [
  {
    route: '/',
    template: 'landing_page',
    sections: ['hero', 'features', 'pricing', 'cta', 'footer']
  },
  {
    route: '/dashboard',
    template: 'dashboard',
    sections: ['stats_grid', 'charts', 'activity']
  },
  // ... more pages
];

for (const page of pages) {
  // Load template from Phase 2
  const template = await agent.loadFile(
    `phase2/templates/${page.template}.json`
  );
  
  // Generate page code
  const pageCode = await agent.generateCode({
    template,
    baivTokens: await agent.loadFile('phase1/ontology.json'),
    route: page.route,
  });
  
  // Write to file system
  await agent.writeFile(
    `baiv-app/app${page.route}/page.tsx`,
    pageCode
  );
}
```

---

### 4. Add Authentication (Clerk)

```typescript
await agent.run(`
  cd baiv-app
  npm install @clerk/nextjs
`);

// Create middleware
await agent.createFile({
  path: 'baiv-app/middleware.ts',
  content: `
    import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

    const isPublicRoute = createRouteMatcher([
      '/',
      '/features(.*)',
      '/pricing(.*)',
      '/sign-in(.*)',
      '/sign-up(.*)',
    ]);

    export default clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    });

    export const config = {
      matcher: ['/((?!.*\\\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
    };
  `
});

// Update root layout
await agent.updateFile({
  path: 'baiv-app/app/layout.tsx',
  transform: (content) => {
    return content
      .replace(
        'export default function RootLayout',
        `import { ClerkProvider } from '@clerk/nextjs';\n\nexport default function RootLayout`
      )
      .replace(
        '<html',
        '<ClerkProvider>\n      <html'
      )
      .replace(
        '</html>',
        '</html>\n    </ClerkProvider>'
      );
  }
});
```

---

### 5. Deploy to Vercel

```typescript
await agent.run(`
  cd baiv-app
  
  # Link to Vercel
  vercel link
  
  # Set environment variables
  vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  vercel env add CLERK_SECRET_KEY
  
  # Deploy to production
  vercel --prod
`);

// Get deployment URL
const deploymentInfo = await agent.run('vercel inspect --json');
const url = JSON.parse(deploymentInfo).url;

console.log(`🚀 Deployed to: https://${url}`);
```

---

## 📦 Complete Application Generator

```typescript
interface AppConfig {
  name: string;
  pages: PageDefinition[];
  auth: boolean;
  database?: 'supabase' | 'prisma';
  deployment: 'vercel' | 'netlify';
}

async function generateBAIVApp(config: AppConfig) {
  // 1. Bootstrap Next.js
  await agent.run(`
    npx create-next-app@latest ${config.name} \
      --typescript --tailwind --app
  `);
  
  // 2. Apply BAIV theme
  await applyBAIVConfiguration(config.name);
  
  // 3. Generate pages
  for (const page of config.pages) {
    await generatePage(config.name, page);
  }
  
  // 4. Setup auth (if requested)
  if (config.auth) {
    await setupClerkAuth(config.name);
  }
  
  // 5. Setup database (if requested)
  if (config.database) {
    await setupDatabase(config.name, config.database);
  }
  
  // 6. Deploy
  if (config.deployment === 'vercel') {
    await deployToVercel(config.name);
  }
  
  return {
    codebase: `./${config.name}`,
    deploymentUrl: await getDeploymentUrl(config.name),
    estimatedTime: calculateTime(config),
  };
}

// Usage
const app = await generateBAIVApp({
  name: 'my-saas-app',
  pages: [
    { route: '/', template: 'landing_page', sections: ['hero', 'features', 'cta'] },
    { route: '/dashboard', template: 'dashboard', sections: ['stats', 'charts'] },
    { route: '/settings', template: 'settings_page', sections: ['profile', 'billing'] },
  ],
  auth: true,
  database: 'supabase',
  deployment: 'vercel',
});

console.log(`✅ App deployed to: ${app.deploymentUrl}`);
console.log(`⏱️  Generation time: ${app.estimatedTime}`);
```

---

## 🔧 Utility Functions

### Load BAIV Template

```typescript
async function loadBAIVTemplate(templateName: string) {
  const template = await agent.loadFile(
    `phase2/pfc-pfi-baiv-figma-make-templates.json`
  );
  
  const parsed = JSON.parse(template);
  return parsed.templates[templateName];
}
```

---

### Apply BAIV Tokens to Code

```typescript
async function applyBAIVTokens(code: string) {
  // Load ontology
  const ontology = await agent.loadFile(
    'phase1/pfc-pfi-baiv-design-system-ontology.json'
  );
  
  const tokens = JSON.parse(ontology).tokens;
  
  // Replace hardcoded values with tokens
  let processedCode = code;
  
  // Colors
  processedCode = processedCode.replace(
    /#00A4BF/g,
    'var(--baiv-primary-500)'
  );
  processedCode = processedCode.replace(
    /#E84E1C/g,
    'var(--baiv-secondary-500)'
  );
  
  // Typography
  processedCode = processedCode.replace(
    /font-size: 24px/g,
    'text-2xl'
  );
  
  return processedCode;
}
```

---

### Validate BAIV Compliance

```typescript
async function validateBAIVCompliance(appPath: string) {
  const issues: string[] = [];
  
  // Check for hardcoded colors
  const files = await agent.glob(`${appPath}/**/*.tsx`);
  
  for (const file of files) {
    const content = await agent.readFile(file);
    
    // Check for hardcoded hex colors
    if (content.match(/#[0-9A-Fa-f]{6}/)) {
      issues.push(`${file}: Contains hardcoded hex colors`);
    }
    
    // Check for BAIV token usage
    if (!content.includes('baiv-') && content.includes('className')) {
      issues.push(`${file}: No BAIV tokens used`);
    }
  }
  
  return {
    compliant: issues.length === 0,
    issues,
    score: calculateComplianceScore(files.length, issues.length),
  };
}
```

---

## 📊 Performance Tracking

```typescript
interface GenerationMetrics {
  startTime: Date;
  endTime: Date;
  pageCount: number;
  componentCount: number;
  linesGenerated: number;
  tokensUsed: number;
}

async function trackGeneration(callback: () => Promise<void>) {
  const metrics: GenerationMetrics = {
    startTime: new Date(),
    endTime: new Date(),
    pageCount: 0,
    componentCount: 0,
    linesGenerated: 0,
    tokensUsed: 0,
  };
  
  await callback();
  
  metrics.endTime = new Date();
  
  // Calculate statistics
  const duration = metrics.endTime.getTime() - metrics.startTime.getTime();
  const durationMinutes = duration / 1000 / 60;
  
  console.log(`
    📊 Generation Metrics:
    ⏱️  Duration: ${durationMinutes.toFixed(2)} minutes
    📄 Pages: ${metrics.pageCount}
    🧩 Components: ${metrics.componentCount}
    📝 Lines of Code: ${metrics.linesGenerated}
    🤖 Claude API Tokens: ${metrics.tokensUsed}
  `);
  
  return metrics;
}
```

---

## 🎯 Best Practices

### 1. Always Validate Before Deploy

```typescript
// Run validation checks
const validation = await validateBAIVCompliance('baiv-app');

if (!validation.compliant) {
  console.error('❌ BAIV compliance issues found:');
  validation.issues.forEach(issue => console.error(`  - ${issue}`));
  process.exit(1);
}

// Run TypeScript check
await agent.run('cd baiv-app && npm run build');

// Then deploy
await deployToVercel('baiv-app');
```

---

### 2. Use Incremental Generation

```typescript
// Generate in stages
await generatePages(['/', '/features']); // Marketing first
await generatePages(['/dashboard', '/settings']); // Dashboard second
await generatePages(['/admin/*']); // Admin last

// This allows for:
// - Testing at each stage
// - Easier debugging
// - Partial deployments
```

---

### 3. Version Control Integration

```typescript
await agent.run(`
  cd baiv-app
  
  # Initialize git
  git init
  
  # Add BAIV generation metadata
  echo "# Generated by BAIV v3.0 Phase 3" > GENERATION.md
  echo "Date: $(date)" >> GENERATION.md
  echo "Pages: ${pages.length}" >> GENERATION.md
  
  # Commit
  git add .
  git commit -m "feat: Initial BAIV application generation"
  
  # Push to remote
  git remote add origin ${repoUrl}
  git push -u origin main
`);
```

---

## ✨ Summary

Agent SDK enables:
- **Automated project setup** (Next.js + BAIV config)
- **Batch page generation** (10+ pages in minutes)
- **Authentication integration** (Clerk setup)
- **Production deployment** (Vercel/Netlify)
- **Validation & quality checks**

**Typical Flow:**
1. Define app configuration (pages, auth, database)
2. Run `generateBAIVApp(config)`
3. Review generated code
4. Deploy to production
5. Share deployment URL

**Time Savings:**
- Manual: 2-3 weeks
- Agent SDK: 15-30 minutes
- **99% faster** 🚀

---

**Version:** 3.0.0 Ph3  
**Last Updated:** 2025-01-03
