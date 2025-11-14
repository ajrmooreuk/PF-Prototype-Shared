# PF Figma: Digital Ocean App Platform How-To Guide
## Complete Deployment Guide for Claude Agentic Development Stack

**Document:** PF-Figma-DigitalOcean-HowTo-Guide  
**Version:** 1.0  
**Date:** November 2025  
**Stack:** Next.js 14 + Shadcn UI + Supabase + Claude Agents  
**Estimated Setup Time:** 2-4 hours

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [DigitalOcean Account Setup](#2-digitalocean-account-setup)
3. [Supabase Project Configuration](#3-supabase-project-configuration)
4. [GitHub Repository Preparation](#4-github-repository-preparation)
5. [App Platform Configuration](#5-app-platform-configuration)
6. [Environment Variables & Secrets](#6-environment-variables--secrets)
7. [App Spec YAML Configuration](#7-app-spec-yaml-configuration)
8. [CI/CD Pipeline with GitHub Actions](#8-cicd-pipeline-with-github-actions)
9. [Managed Database Setup (Optional)](#9-managed-database-setup-optional)
10. [Worker Services for Claude Agents](#10-worker-services-for-claude-agents)
11. [Container Registry & Custom Images](#11-container-registry--custom-images)
12. [Custom Domains & SSL Certificates](#12-custom-domains--ssl-certificates)
13. [Monitoring & Observability](#13-monitoring--observability)
14. [Security Hardening](#14-security-hardening)
15. [Scaling & Performance](#15-scaling--performance)
16. [Troubleshooting](#16-troubleshooting)
17. [Cost Management](#17-cost-management)
18. [Rollback & Maintenance](#18-rollback--maintenance)

---

## 1. Prerequisites

### 1.1 Required Accounts

- [ ] **DigitalOcean Account** - [Sign up](https://cloud.digitalocean.com/registrations/new) with $200 free credit for 60 days
- [ ] **Supabase Account** - [Sign up](https://supabase.com/dashboard)
- [ ] **GitHub Account** - With repository access
- [ ] **Anthropic Account** - For Claude API key
- [ ] **Figma Account** - With API access token

### 1.2 Local Development Environment

```bash
# Required tools
node --version    # v20.x or higher
npm --version     # v10.x or higher
git --version     # v2.40 or higher
docker --version  # v24.x or higher (optional for custom images)

# Install DigitalOcean CLI (doctl)
brew install doctl  # macOS
# or
sudo snap install doctl  # Ubuntu/Debian

# Verify installation
doctl version
```

### 1.3 Project Requirements

```bash
# Ensure Next.js 14+ project with TypeScript
npx create-next-app@latest pf-figma-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir

# Install Shadcn UI
cd pf-figma-app
npx shadcn@latest init

# Verify package.json
cat package.json | grep '"next"'
# Should show: "next": "^14.0.0" or higher
```

### 1.4 Schema.org Foundation

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PF-Figma-App",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cloud",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## 2. DigitalOcean Account Setup

### 2.1 Create Account

1. Navigate to [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Sign up with GitHub or email
3. Claim **$200 free credit** (valid for 60 days)
4. Complete payment verification (required)
5. Enable 2FA for security

### 2.2 Authenticate CLI

```bash
# Generate API token
# Dashboard → API → Generate New Token
# - Token Name: pf-figma-deployment
# - Expiration: No expiry (or set as needed)
# - Scopes: Read + Write

# Authenticate doctl
doctl auth init
# Enter token when prompted

# Verify authentication
doctl account get
```

### 2.3 Create Team (Optional for Collaboration)

```bash
# Via Dashboard:
# Settings → Team → Create Team

# Team settings:
# - Name: PF Figma Team
# - Add team members by email
# - Assign roles: Owner, Billing Admin, Member
```

### 2.4 Set Default Project

```bash
# List existing projects
doctl projects list

# Create new project
doctl projects create \
  --name "PF-Figma-Stack" \
  --purpose "AI/Agentic Development Platform" \
  --environment "Production"

# Get project ID
export DO_PROJECT_ID=$(doctl projects list --format ID --no-header | head -1)
echo "Project ID: $DO_PROJECT_ID"
```

---

## 3. Supabase Project Configuration

### 3.1 Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Configure:
   - **Organization:** Your org or create new
   - **Name:** `pf-figma-db`
   - **Database Password:** Generate strong password (save this!)
   - **Region:** Choose closest to your users (NYC, SFO, etc.)
   - **Pricing Plan:** Free tier (or Pro for production)
4. Wait for project provisioning (~2 minutes)

### 3.2 Get Connection Details

```bash
# Dashboard → Settings → API
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_ANON_KEY="your-anon-key"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database connection string (for direct access)
# Settings → Database → Connection string
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres"
```

### 3.3 Configure Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ontologies ENABLE ROW LEVEL SECURITY;

-- Multi-tenant policy example
CREATE POLICY "tenant_isolation" ON public.projects
  FOR ALL USING (tenant_id = auth.jwt() ->> 'tenant_id');

-- Agent execution policy
CREATE POLICY "agent_access" ON public.agents
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    project_id IN (
      SELECT id FROM public.projects
      WHERE tenant_id = auth.jwt() ->> 'tenant_id'
    )
  );
```

### 3.4 Create Base Schema

```sql
-- Ontology storage for PF-Figma
CREATE TABLE public.ontologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id),
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  schema_org_type TEXT,
  definition JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent execution logs
CREATE TABLE public.agent_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_type TEXT NOT NULL,
  status TEXT NOT NULL,
  input_payload JSONB,
  output_payload JSONB,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_ontologies_tenant ON public.ontologies(tenant_id);
CREATE INDEX idx_ontologies_type ON public.ontologies(schema_org_type);
CREATE INDEX idx_agent_executions_type ON public.agent_executions(agent_type);
```

---

## 4. GitHub Repository Preparation

### 4.1 Initialize Repository

```bash
# Create new repository or use existing
cd pf-figma-app

# Initialize git if needed
git init
git remote add origin https://github.com/your-org/pf-figma-app.git

# Create branch structure
git checkout -b main
git checkout -b develop
git checkout -b staging
```

### 4.2 Essential Files Structure

```bash
pf-figma-app/
├── .github/
│   └── workflows/
│       ├── deploy-production.yml
│       ├── deploy-staging.yml
│       └── test.yml
├── .do/
│   ├── app.yaml           # App Spec configuration
│   └── deploy.template.yaml
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── health/
│   │   │   │   └── route.ts
│   │   │   └── agents/
│   │   │       └── route.ts
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   └── lib/
│       ├── supabase.ts
│       └── anthropic.ts
├── Dockerfile              # For custom workers
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

### 4.3 Create Health Check Endpoint

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    services: {
      database: 'unknown',
      anthropic: 'unknown',
      figma: 'unknown'
    }
  };

  // Check Supabase connection
  try {
    const supabase = createClient();
    const { error } = await supabase.from('ontologies').select('count').single();
    healthStatus.services.database = error ? 'degraded' : 'healthy';
  } catch (e) {
    healthStatus.services.database = 'unhealthy';
    healthStatus.status = 'degraded';
  }

  // Check Anthropic API
  try {
    if (process.env.ANTHROPIC_API_KEY) {
      healthStatus.services.anthropic = 'configured';
    }
  } catch (e) {
    healthStatus.services.anthropic = 'unhealthy';
  }

  // Check Figma API
  try {
    if (process.env.FIGMA_ACCESS_TOKEN) {
      healthStatus.services.figma = 'configured';
    }
  } catch (e) {
    healthStatus.services.figma = 'unhealthy';
  }

  const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
  return NextResponse.json(healthStatus, { status: statusCode });
}
```

### 4.4 Configure Next.js for Production

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for DigitalOcean App Platform
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variable configuration
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 4.5 Supabase Client Setup

```typescript
// src/lib/supabase.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options) {
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );
}

// Service role client for agent operations
export function createServiceClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}
```

---

## 5. App Platform Configuration

### 5.1 Create App via Dashboard

1. Go to [App Platform](https://cloud.digitalocean.com/apps)
2. Click **"Create App"**
3. Choose source:
   - **GitHub** (recommended for CI/CD)
   - Select repository: `your-org/pf-figma-app`
   - Branch: `main`
4. Auto-detect settings:
   - Type: **Web Service**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment: **Node.js**
5. Configure resources:
   - Plan: **Basic** ($5/month) or **Professional** ($12/month)
   - Instance Size: 1 GB RAM / 1 vCPU
   - Container Count: 1 (increase later for scaling)

### 5.2 Create App via CLI

```bash
# Create app from GitHub
doctl apps create --spec .do/app.yaml

# List apps
doctl apps list

# Get app details
doctl apps get <app-id>
```

### 5.3 Configure Build Settings

```yaml
# In App Platform Settings or app.yaml
build_command: npm ci && npm run build
run_command: npm start
node_version: "20"

# For Next.js standalone output
output_dir: .next/standalone
```

---

## 6. Environment Variables & Secrets

### 6.1 Add Variables via Dashboard

1. Navigate to **App → Settings → App-Level Environment Variables**
2. Add each variable:

| Variable | Type | Scope | Encrypt |
|----------|------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | General | Run & Build time | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | General | Run & Build time | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Run time only | Yes ✅ |
| `ANTHROPIC_API_KEY` | Secret | Run time only | Yes ✅ |
| `FIGMA_ACCESS_TOKEN` | Secret | Run time only | Yes ✅ |
| `NEXT_PUBLIC_APP_VERSION` | General | Run & Build time | No |
| `NODE_ENV` | General | Run time only | No |

### 6.2 Add Variables via CLI

```bash
# Set environment variables
doctl apps update <app-id> \
  --spec .do/app.yaml

# Or use API directly
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DO_API_TOKEN" \
  -d '{
    "env": [
      {
        "key": "ANTHROPIC_API_KEY",
        "value": "sk-ant-...",
        "scope": "RUN_TIME",
        "type": "SECRET"
      }
    ]
  }' \
  "https://api.digitalocean.com/v2/apps/<app-id>"
```

### 6.3 Component-Specific Variables

```yaml
# In app.yaml - component level
services:
  - name: web
    envs:
      - key: NEXT_PUBLIC_APP_URL
        scope: RUN_AND_BUILD_TIME
        value: ${APP_URL}  # Auto-injected by DO
      - key: DATABASE_POOL_SIZE
        scope: RUN_TIME
        value: "10"

workers:
  - name: agent-worker
    envs:
      - key: AGENT_CONCURRENCY
        scope: RUN_TIME
        value: "5"
```

---

## 7. App Spec YAML Configuration

### 7.1 Complete App Specification

```yaml
# .do/app.yaml
name: pf-figma-app
region: nyc

# Main web service
services:
  - name: web
    github:
      repo: your-org/pf-figma-app
      branch: main
      deploy_on_push: true
    build_command: npm ci && npm run build
    run_command: npm start
    source_dir: /
    
    # Environment
    environment_slug: node-js
    
    # Resources
    instance_size_slug: basic-xxs  # 512 MB / 1 vCPU
    instance_count: 2              # For HA
    
    # Health check
    health_check:
      http_path: /api/health
      initial_delay_seconds: 10
      period_seconds: 30
      timeout_seconds: 5
      success_threshold: 1
      failure_threshold: 3
    
    # HTTP routing
    http_port: 3000
    routes:
      - path: /
    
    # Autoscaling (Professional plan required)
    autoscaling:
      min_instance_count: 1
      max_instance_count: 10
      metrics:
        cpu:
          percent: 70
    
    # Environment variables
    envs:
      - key: NEXT_PUBLIC_SUPABASE_URL
        scope: RUN_AND_BUILD_TIME
        value: ${SUPABASE_URL}
      - key: NEXT_PUBLIC_SUPABASE_ANON_KEY
        scope: RUN_AND_BUILD_TIME
        value: ${SUPABASE_ANON_KEY}
      - key: SUPABASE_SERVICE_ROLE_KEY
        scope: RUN_TIME
        type: SECRET
        value: ${SUPABASE_SERVICE_ROLE_KEY}
      - key: ANTHROPIC_API_KEY
        scope: RUN_TIME
        type: SECRET
        value: ${ANTHROPIC_API_KEY}
      - key: FIGMA_ACCESS_TOKEN
        scope: RUN_TIME
        type: SECRET
        value: ${FIGMA_ACCESS_TOKEN}
      - key: NODE_ENV
        scope: RUN_AND_BUILD_TIME
        value: production

# Worker for Claude agent processing
workers:
  - name: agent-processor
    github:
      repo: your-org/pf-figma-app
      branch: main
      deploy_on_push: true
    dockerfile_path: Dockerfile.worker
    
    instance_size_slug: basic-xs  # 1 GB / 1 vCPU
    instance_count: 1
    
    envs:
      - key: WORKER_TYPE
        scope: RUN_TIME
        value: agent-processor
      - key: ANTHROPIC_API_KEY
        scope: RUN_TIME
        type: SECRET
        value: ${ANTHROPIC_API_KEY}
      - key: MAX_CONCURRENT_AGENTS
        scope: RUN_TIME
        value: "3"

# Static assets (optional - for separate CDN)
static_sites:
  - name: assets
    github:
      repo: your-org/pf-figma-assets
      branch: main
    build_command: npm run build:assets
    output_dir: public
    catchall_document: index.html
    routes:
      - path: /assets

# Jobs for scheduled tasks
jobs:
  - name: ontology-sync
    github:
      repo: your-org/pf-figma-app
      branch: main
    run_command: npm run job:ontology-sync
    instance_size_slug: basic-xxs
    instance_count: 1
    kind: FAILED_DEPLOY
    envs:
      - key: JOB_TYPE
        scope: RUN_TIME
        value: ontology-sync

# Database (if using DO Managed Database)
databases:
  - name: pf-figma-cache
    engine: REDIS
    production: true
    cluster_name: pf-figma-redis
    db_name: cache
    db_user: cache_user
    version: "7"

# Alerts
alerts:
  - rule: DEPLOYMENT_FAILED
  - rule: DOMAIN_FAILED
  - rule: CPU_UTILIZATION
    value: 85
    window: FIVE_MINUTES
  - rule: MEM_UTILIZATION
    value: 90
    window: FIVE_MINUTES
  - rule: RESTART_COUNT
    value: 3
    window: FIVE_MINUTES

# Ingress
ingress:
  rules:
    - component:
        name: web
      match:
        path:
          prefix: /
```

### 7.2 Multi-Environment Configuration

```yaml
# .do/app-staging.yaml
name: pf-figma-app-staging
region: nyc

services:
  - name: web
    github:
      repo: your-org/pf-figma-app
      branch: staging  # Different branch
      deploy_on_push: true
    
    instance_size_slug: basic-xxs
    instance_count: 1  # Reduced for staging
    
    envs:
      - key: NODE_ENV
        scope: RUN_AND_BUILD_TIME
        value: staging
      - key: DEBUG_MODE
        scope: RUN_TIME
        value: "true"
```

---

## 8. CI/CD Pipeline with GitHub Actions

### 8.1 Production Deployment Workflow

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to DigitalOcean Production

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
  APP_ID: ${{ secrets.DO_APP_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://pf-figma-app.ondigitalocean.app
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Install doctl
        uses: digitalocean/action-doctl@v2
        with:
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
      
      - name: Get current deployment
        id: current-deployment
        run: |
          CURRENT=$(doctl apps list-deployments $APP_ID --format ID --no-header | head -1)
          echo "current_deployment=$CURRENT" >> $GITHUB_OUTPUT
      
      - name: Deploy to DigitalOcean App Platform
        run: |
          doctl apps create-deployment $APP_ID --wait
      
      - name: Verify deployment
        run: |
          # Wait for health check
          sleep 30
          
          # Get app URL
          APP_URL=$(doctl apps get $APP_ID --format "Default Ingress" --no-header)
          
          # Check health endpoint
          RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL/api/health")
          
          if [ "$RESPONSE" != "200" ]; then
            echo "Health check failed with status: $RESPONSE"
            exit 1
          fi
          
          echo "Deployment successful! App is healthy."
      
      - name: Tag release
        run: |
          VERSION=$(date +%Y%m%d%H%M%S)
          git tag -a "v${VERSION}" -m "Production deployment ${VERSION}"
          git push origin "v${VERSION}"

  notify:
    needs: deploy
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Notify on success
        if: needs.deploy.result == 'success'
        run: |
          echo "Deployment successful! 🚀"
          # Add Slack/Discord notification here
      
      - name: Notify on failure
        if: needs.deploy.result == 'failure'
        run: |
          echo "Deployment failed! ❌"
          # Add alert notification here
```

### 8.2 Staging Deployment Workflow

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to DigitalOcean Staging

on:
  push:
    branches:
      - staging
  pull_request:
    branches:
      - main
    types: [opened, synchronize]

env:
  DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
  STAGING_APP_ID: ${{ secrets.DO_STAGING_APP_ID }}

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://pf-figma-app-staging.ondigitalocean.app
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.STAGING_SUPABASE_ANON_KEY }}
          NODE_ENV: staging
      
      - name: Install doctl
        uses: digitalocean/action-doctl@v2
        with:
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
      
      - name: Deploy to Staging
        run: |
          doctl apps create-deployment $STAGING_APP_ID --wait
      
      - name: Run integration tests
        run: |
          APP_URL=$(doctl apps get $STAGING_APP_ID --format "Default Ingress" --no-header)
          npm run test:integration -- --base-url=$APP_URL
      
      - name: Comment PR with staging URL
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const stagingUrl = 'https://pf-figma-app-staging.ondigitalocean.app';
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🚀 Staging Deployment Ready!\n\n**Preview URL:** ${stagingUrl}\n\n**Deployed at:** ${new Date().toISOString()}`
            });
```

### 8.3 Feature Branch Preview Apps

```yaml
# .github/workflows/preview-app.yml
name: Create Preview App

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  create-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install doctl
        uses: digitalocean/action-doctl@v2
        with:
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
      
      - name: Create preview app spec
        run: |
          cat > /tmp/preview-app.yaml << EOF
          name: pf-figma-pr-${{ github.event.pull_request.number }}
          region: nyc
          services:
            - name: web
              github:
                repo: ${{ github.repository }}
                branch: ${{ github.head_ref }}
                deploy_on_push: true
              build_command: npm ci && npm run build
              run_command: npm start
              instance_size_slug: basic-xxs
              instance_count: 1
              http_port: 3000
              routes:
                - path: /
              envs:
                - key: NODE_ENV
                  scope: RUN_AND_BUILD_TIME
                  value: preview
          EOF
      
      - name: Create preview app
        id: create-app
        run: |
          APP_ID=$(doctl apps create --spec /tmp/preview-app.yaml --format ID --no-header)
          echo "app_id=$APP_ID" >> $GITHUB_OUTPUT
      
      - name: Wait for deployment
        run: |
          sleep 60  # Initial deployment time
          APP_URL=$(doctl apps get ${{ steps.create-app.outputs.app_id }} --format "Default Ingress" --no-header)
          echo "Preview URL: $APP_URL"
      
      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            const appUrl = `https://pf-figma-pr-${context.issue.number}.ondigitalocean.app`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🌟 Preview App Created!\n\n**URL:** ${appUrl}\n\n*This preview app will be automatically destroyed when the PR is closed.*`
            });
```

---

## 9. Managed Database Setup (Optional)

### 9.1 Create PostgreSQL Cluster

```bash
# Create managed PostgreSQL database
doctl databases create pf-figma-db \
  --engine pg \
  --version 16 \
  --size db-s-1vcpu-1gb \
  --region nyc1 \
  --num-nodes 1

# Get connection details
doctl databases connection pf-figma-db --format Host,Port,User,Password,Database
```

### 9.2 Create Redis Cluster

```bash
# Create managed Redis for caching
doctl databases create pf-figma-cache \
  --engine redis \
  --version 7 \
  --size db-s-1vcpu-1gb \
  --region nyc1

# Get Redis connection
doctl databases connection pf-figma-cache
```

### 9.3 Add Database to App

```yaml
# In app.yaml
databases:
  - name: db
    engine: PG
    production: true
    cluster_name: pf-figma-db
    db_name: app_db
    db_user: app_user
    version: "16"
  
  - name: cache
    engine: REDIS
    production: true
    cluster_name: pf-figma-cache
    version: "7"
```

### 9.4 Configure Connection Pooling

```bash
# Enable connection pooling (via Dashboard)
# Databases → pf-figma-db → Connection Pools → Create Pool

# Pool settings:
# - Name: app-pool
# - Mode: Transaction (recommended for Next.js)
# - Size: 25 connections
# - Database: app_db
# - User: app_user
```

---

## 10. Worker Services for Claude Agents

### 10.1 Dockerfile for Agent Worker

```dockerfile
# Dockerfile.worker
FROM node:20-alpine AS base

# Install dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Build TypeScript
RUN npm run build:worker

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

USER worker

CMD ["node", "dist/worker/index.js"]
```

### 10.2 Agent Worker Implementation

```typescript
// src/worker/index.ts
import Anthropic from '@anthropic-ai/sdk';
import { createServiceClient } from '../lib/supabase';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface AgentTask {
  id: string;
  agent_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

class AgentWorker {
  private supabase = createServiceClient();
  private isRunning = true;
  private concurrency = parseInt(process.env.MAX_CONCURRENT_AGENTS || '3');

  async start() {
    console.log(`Agent worker starting with concurrency: ${this.concurrency}`);
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down...');
      this.isRunning = false;
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down...');
      this.isRunning = false;
    });

    // Main processing loop
    while (this.isRunning) {
      try {
        await this.processTasks();
        await this.sleep(1000); // Poll every second
      } catch (error) {
        console.error('Worker error:', error);
        await this.sleep(5000); // Wait longer on error
      }
    }

    console.log('Agent worker stopped');
  }

  private async processTasks() {
    // Fetch pending tasks
    const { data: tasks, error } = await this.supabase
      .from('agent_tasks')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(this.concurrency);

    if (error) {
      throw error;
    }

    if (!tasks || tasks.length === 0) {
      return;
    }

    // Process tasks concurrently
    await Promise.all(tasks.map(task => this.processTask(task)));
  }

  private async processTask(task: AgentTask) {
    const startTime = Date.now();
    
    console.log(`Processing task ${task.id} (${task.agent_type})`);

    try {
      // Mark as processing
      await this.supabase
        .from('agent_tasks')
        .update({ status: 'processing', started_at: new Date().toISOString() })
        .eq('id', task.id);

      // Execute agent based on type
      const result = await this.executeAgent(task);

      // Mark as completed
      await this.supabase
        .from('agent_tasks')
        .update({
          status: 'completed',
          result: result,
          completed_at: new Date().toISOString(),
          execution_time_ms: Date.now() - startTime
        })
        .eq('id', task.id);

      console.log(`Task ${task.id} completed in ${Date.now() - startTime}ms`);
    } catch (error) {
      console.error(`Task ${task.id} failed:`, error);

      await this.supabase
        .from('agent_tasks')
        .update({
          status: 'failed',
          error: (error as Error).message,
          completed_at: new Date().toISOString(),
          execution_time_ms: Date.now() - startTime
        })
        .eq('id', task.id);
    }
  }

  private async executeAgent(task: AgentTask) {
    switch (task.agent_type) {
      case 'figma-analysis':
        return this.executeFigmaAnalysis(task.payload);
      case 'ontology-generation':
        return this.executeOntologyGeneration(task.payload);
      case 'code-generation':
        return this.executeCodeGeneration(task.payload);
      default:
        throw new Error(`Unknown agent type: ${task.agent_type}`);
    }
  }

  private async executeFigmaAnalysis(payload: Record<string, unknown>) {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Analyze this Figma design and extract component structure:
          ${JSON.stringify(payload)}
          
          Return a JSON structure with:
          - components: array of identified components
          - hierarchy: component tree structure
          - designTokens: colors, typography, spacing
          - recommendations: implementation suggestions`
        }
      ]
    });

    return JSON.parse((message.content[0] as { text: string }).text);
  }

  private async executeOntologyGeneration(payload: Record<string, unknown>) {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: `Generate a schema.org-based ontology for:
          ${JSON.stringify(payload)}
          
          Include:
          - @context with schema.org
          - Core entity definitions
          - Property mappings
          - Relationship definitions
          - Validation rules`
        }
      ]
    });

    return JSON.parse((message.content[0] as { text: string }).text);
  }

  private async executeCodeGeneration(payload: Record<string, unknown>) {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 16384,
      messages: [
        {
          role: 'user',
          content: `Generate Next.js + Shadcn UI code for:
          ${JSON.stringify(payload)}
          
          Requirements:
          - TypeScript with strict typing
          - Tailwind CSS for styling
          - Schema.org JSON-LD metadata
          - Supabase integration
          - Error handling and loading states`
        }
      ]
    });

    return (message.content[0] as { text: string }).text;
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Start worker
const worker = new AgentWorker();
worker.start().catch(console.error);
```

### 10.3 Add Worker to App Spec

```yaml
# In app.yaml
workers:
  - name: agent-processor
    github:
      repo: your-org/pf-figma-app
      branch: main
      deploy_on_push: true
    dockerfile_path: Dockerfile.worker
    instance_size_slug: professional-xs  # 1 GB RAM / 1 vCPU
    instance_count: 2
    
    envs:
      - key: ANTHROPIC_API_KEY
        scope: RUN_TIME
        type: SECRET
        value: ${ANTHROPIC_API_KEY}
      - key: SUPABASE_SERVICE_ROLE_KEY
        scope: RUN_TIME
        type: SECRET
        value: ${SUPABASE_SERVICE_ROLE_KEY}
      - key: MAX_CONCURRENT_AGENTS
        scope: RUN_TIME
        value: "5"
```

---

## 11. Container Registry & Custom Images

### 11.1 Create Container Registry

```bash
# Create DigitalOcean Container Registry
doctl registry create pf-figma-registry

# Login to registry
doctl registry login

# Get registry endpoint
doctl registry get
# registry.digitalocean.com/pf-figma-registry
```

### 11.2 Build and Push Custom Image

```bash
# Build image locally
docker build -f Dockerfile.worker -t agent-worker:latest .

# Tag for DO registry
docker tag agent-worker:latest \
  registry.digitalocean.com/pf-figma-registry/agent-worker:v1.0.0

# Push to registry
docker push registry.digitalocean.com/pf-figma-registry/agent-worker:v1.0.0
```

### 11.3 Use Custom Image in App

```yaml
# In app.yaml
workers:
  - name: agent-processor
    image:
      registry_type: DOCR
      registry: pf-figma-registry
      repository: agent-worker
      tag: v1.0.0
    
    instance_size_slug: professional-xs
    instance_count: 2
```

---

## 12. Custom Domains & SSL Certificates

### 12.1 Add Custom Domain

```bash
# Via CLI
doctl apps create-domain <app-id> \
  --domain app.pf-figma.com

# Via Dashboard:
# App → Settings → Domains → Add Domain
```

### 12.2 Configure DNS Records

```bash
# For apex domain (pf-figma.com)
# Type: A
# Host: @
# Value: 174.138.120.100  # DO App Platform IP

# For subdomain (app.pf-figma.com)
# Type: CNAME
# Host: app
# Value: your-app.ondigitalocean.app
```

### 12.3 SSL Certificate Management

DigitalOcean App Platform automatically provisions and renews Let's Encrypt SSL certificates. No manual configuration required.

```bash
# Verify SSL status
doctl apps get <app-id> --format "Domains"

# Check certificate details
curl -vI https://app.pf-figma.com 2>&1 | grep "SSL certificate"
```

### 12.4 Force HTTPS Redirect

Already handled by App Platform. All HTTP requests automatically redirect to HTTPS.

---

## 13. Monitoring & Observability

### 13.1 Built-in Metrics

DigitalOcean App Platform provides:
- **CPU Usage** per component
- **Memory Usage** per component
- **Bandwidth** in/out
- **Request Count** and latency
- **Error Rate**

Access via:
- Dashboard → App → Insights
- or API: `doctl apps get-logs <app-id>`

### 13.2 Application Logs

```bash
# View live logs
doctl apps logs <app-id> --follow

# View specific component logs
doctl apps logs <app-id> --component web --follow

# View deployment logs
doctl apps logs <app-id> --type DEPLOY
```

### 13.3 OpenTelemetry Integration

```typescript
// src/lib/telemetry.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
  serviceName: 'pf-figma-app',
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/metrics',
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
```

### 13.4 Custom Metrics Dashboard

```typescript
// src/lib/metrics.ts
import { Counter, Histogram } from '@opentelemetry/api-metrics';

const meter = metrics.getMeter('pf-figma-metrics');

// Agent execution metrics
export const agentExecutionCounter = meter.createCounter('agent_executions_total', {
  description: 'Total number of agent executions',
});

export const agentDurationHistogram = meter.createHistogram('agent_duration_seconds', {
  description: 'Duration of agent executions',
  unit: 's',
});

export const ontologyOperationsCounter = meter.createCounter('ontology_operations_total', {
  description: 'Total ontology CRUD operations',
});

// Usage in code
agentExecutionCounter.add(1, {
  agent_type: 'figma-analysis',
  status: 'success'
});

const endTimer = agentDurationHistogram.startTimer();
// ... agent execution
endTimer({ agent_type: 'figma-analysis' });
```

### 13.5 Alert Configuration

```yaml
# In app.yaml
alerts:
  - rule: DEPLOYMENT_FAILED
  - rule: DOMAIN_FAILED
  
  - rule: CPU_UTILIZATION
    value: 85
    window: FIVE_MINUTES
    operator: GREATER_THAN
    
  - rule: MEM_UTILIZATION
    value: 90
    window: FIVE_MINUTES
    operator: GREATER_THAN
    
  - rule: RESTART_COUNT
    value: 3
    window: FIVE_MINUTES
    operator: GREATER_THAN
    
  - rule: RESPONSE_TIME_MINUTES
    value: 500
    window: FIVE_MINUTES
    operator: GREATER_THAN
```

---

## 14. Security Hardening

### 14.1 Environment Variable Security

```yaml
# In app.yaml - use SECRET type for sensitive data
envs:
  - key: ANTHROPIC_API_KEY
    scope: RUN_TIME
    type: SECRET  # Encrypted at rest and in transit
    value: ${ANTHROPIC_API_KEY}
  
  - key: DATABASE_URL
    scope: RUN_TIME
    type: SECRET
    value: ${DATABASE_URL}
```

### 14.2 Firewall Rules (VPC)

```bash
# Create VPC for private networking
doctl vpc create \
  --name pf-figma-vpc \
  --region nyc1 \
  --ip-range 10.116.0.0/20

# Add firewall rules
doctl compute firewall create \
  --name pf-figma-fw \
  --inbound-rules "protocol:tcp,ports:443,address:0.0.0.0/0" \
  --inbound-rules "protocol:tcp,ports:3000,address:10.116.0.0/20" \
  --outbound-rules "protocol:tcp,ports:all,address:0.0.0.0/0"
```

### 14.3 Security Headers (in Next.js)

Already configured in next.config.js (Section 4.4).

### 14.4 Rate Limiting

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase';

const RATE_LIMIT = 100; // requests per minute
const WINDOW_MS = 60000; // 1 minute

export async function middleware(request: NextRequest) {
  // Skip for static assets
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const key = `rate_limit:${ip}`;

  // Check rate limit (using Redis or Supabase)
  const supabase = createClient();
  const { data: limit } = await supabase
    .from('rate_limits')
    .select('count, window_start')
    .eq('ip', ip)
    .single();

  const now = Date.now();
  
  if (limit) {
    const windowAge = now - new Date(limit.window_start).getTime();
    
    if (windowAge < WINDOW_MS) {
      if (limit.count >= RATE_LIMIT) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
      
      // Increment count
      await supabase
        .from('rate_limits')
        .update({ count: limit.count + 1 })
        .eq('ip', ip);
    } else {
      // Reset window
      await supabase
        .from('rate_limits')
        .update({ count: 1, window_start: new Date().toISOString() })
        .eq('ip', ip);
    }
  } else {
    // Create new rate limit entry
    await supabase
      .from('rate_limits')
      .insert({ ip, count: 1, window_start: new Date().toISOString() });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

### 14.5 Content Security Policy

```typescript
// In next.config.js headers()
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.supabase.co https://www.figma.com;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\n/g, '')
}
```

---

## 15. Scaling & Performance

### 15.1 Horizontal Scaling

```yaml
# In app.yaml
services:
  - name: web
    instance_count: 4  # Increase instances
    
    # Auto-scaling (Professional plan)
    autoscaling:
      min_instance_count: 2
      max_instance_count: 10
      metrics:
        cpu:
          percent: 70
```

### 15.2 Vertical Scaling

```yaml
# Upgrade instance size
services:
  - name: web
    instance_size_slug: professional-m  # 2 GB RAM / 2 vCPU
    # Options:
    # basic-xxs: 512 MB / 1 vCPU
    # basic-xs: 1 GB / 1 vCPU
    # basic-s: 2 GB / 1 vCPU
    # basic-m: 4 GB / 2 vCPU
    # professional-xs: 1 GB / 1 vCPU (dedicated)
    # professional-s: 2 GB / 1 vCPU (dedicated)
    # professional-m: 2 GB / 2 vCPU (dedicated)
    # professional-l: 4 GB / 2 vCPU (dedicated)
```

### 15.3 CDN Configuration

App Platform automatically provides global CDN for static assets. For additional optimization:

```javascript
// next.config.js
const nextConfig = {
  images: {
    loader: 'default',
    domains: ['*.supabase.co'],
  },
  assetPrefix: process.env.ASSET_PREFIX || '',
};
```

### 15.4 Database Connection Pooling

```typescript
// src/lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_POOL_URL, // PgBouncer URL
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
```

### 15.5 Caching Strategy

```typescript
// src/lib/cache.ts
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

export async function cacheResult<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  const result = await fetchFn();
  await redis.setEx(key, ttlSeconds, JSON.stringify(result));
  return result;
}

// Usage
const ontology = await cacheResult(
  `ontology:${ontologyId}`,
  3600, // 1 hour TTL
  () => fetchOntologyFromDB(ontologyId)
);
```

---

## 16. Troubleshooting

### 16.1 Common Build Failures

```bash
# Issue: Out of memory during build
# Solution: Use larger instance for build
services:
  - name: web
    instance_size_slug: basic-m  # More RAM for build

# Issue: Node version mismatch
# Solution: Specify in package.json
{
  "engines": {
    "node": ">=20.0.0"
  }
}

# Issue: Build command fails
# Check build logs
doctl apps logs <app-id> --type BUILD --follow
```

### 16.2 Runtime Errors

```bash
# View application logs
doctl apps logs <app-id> --follow

# Check container restarts
doctl apps list-deployments <app-id> --format ID,Phase,Progress

# Common issues:
# 1. Environment variables not set
#    - Check: doctl apps get <app-id> --format Spec
# 2. Database connection timeout
#    - Check connection pooling settings
# 3. API timeout
#    - Increase timeout in app spec
```

### 16.3 Deployment Stuck

```bash
# Check deployment status
doctl apps list-deployments <app-id>

# Cancel stuck deployment
doctl apps create-deployment <app-id> --force-build

# Rollback to previous
PREV_DEPLOYMENT=$(doctl apps list-deployments <app-id> --format ID --no-header | sed -n '2p')
doctl apps create-deployment <app-id> --deploy-source $PREV_DEPLOYMENT
```

### 16.4 Performance Issues

```bash
# Check resource utilization
doctl apps get <app-id> --format "InProgress Deployment"

# Monitor metrics
# Dashboard → App → Insights → Metrics

# Common fixes:
# 1. Increase instance size
# 2. Add more instances
# 3. Enable caching
# 4. Optimize database queries
```

### 16.5 SSL/Domain Issues

```bash
# Check domain status
doctl apps list-domains <app-id>

# Verify DNS propagation
dig app.pf-figma.com

# Force certificate renewal
# Usually automatic, but can trigger redeployment
doctl apps create-deployment <app-id>
```

---

## 17. Cost Management

### 17.1 Pricing Overview

| Resource | Size | Monthly Cost |
|----------|------|--------------|
| Web Service (Basic XXS) | 512MB / 1vCPU | $5 |
| Web Service (Basic XS) | 1GB / 1vCPU | $10 |
| Web Service (Professional XS) | 1GB / 1vCPU | $12 |
| Worker Service (Basic XS) | 1GB / 1vCPU | $10 |
| Static Site | N/A | $3 (or free under 1GB) |
| Managed PostgreSQL | 1GB RAM | $15 |
| Managed Redis | 1GB RAM | $15 |
| Container Registry | 500MB free | $0 (then $5/GB) |

### 17.2 Cost Optimization Strategies

```yaml
# 1. Use basic tier for MVP
services:
  - name: web
    instance_size_slug: basic-xxs  # $5/month
    instance_count: 1              # Single instance

# 2. Schedule workers (not always running)
# Use jobs instead of workers for scheduled tasks
jobs:
  - name: ontology-sync
    instance_count: 1
    kind: CRON
    cron_expression: "0 */6 * * *"  # Every 6 hours

# 3. Leverage Supabase free tier
# 500MB database, 1GB file storage, 50K monthly active users

# 4. Use static site for documentation
static_sites:
  - name: docs
    # Free for static content
```

### 17.3 Monitor Spending

```bash
# Check current usage
doctl balance

# View billing history
doctl invoice list

# Set up billing alerts
# Dashboard → Billing → Alerts → Create Alert
```

### 17.4 Scale Down When Not Needed

```bash
# Reduce instances during low traffic
doctl apps update <app-id> --spec <updated-spec.yaml>

# Pause non-production apps
# (Not directly supported, but can delete preview apps)
doctl apps delete <preview-app-id>
```

---

## 18. Rollback & Maintenance

### 18.1 Rollback Deployment

```bash
# List deployments
doctl apps list-deployments <app-id>

# Rollback to specific deployment
doctl apps create-deployment <app-id> \
  --deploy-source <previous-deployment-id>

# Or via dashboard:
# App → Deployments → Select previous → Redeploy
```

### 18.2 Zero-Downtime Deployment

App Platform handles this automatically with:
- Health checks before traffic switching
- Gradual rollout (new → old)
- Automatic rollback on health check failure

### 18.3 Scheduled Maintenance

```yaml
# Use maintenance page
# In app.yaml
services:
  - name: web
    # Add maintenance mode env var
    envs:
      - key: MAINTENANCE_MODE
        scope: RUN_TIME
        value: "false"  # Toggle to "true" during maintenance
```

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return new NextResponse(
      '<html><body><h1>Scheduled Maintenance</h1><p>We will be back shortly.</p></body></html>',
      {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
  return NextResponse.next();
}
```

### 18.4 Database Migrations

```bash
# Run migrations as a job
jobs:
  - name: db-migrate
    github:
      repo: your-org/pf-figma-app
      branch: main
    run_command: npm run migrate
    kind: FAILED_DEPLOY
    instance_size_slug: basic-xxs
    instance_count: 1
```

### 18.5 Backup Strategy

```bash
# Supabase automatic backups (Pro plan)
# Dashboard → Settings → Database → Backups

# For DO Managed Database:
doctl databases backups list <db-id>

# Trigger manual backup
doctl databases backups create <db-id>
```

---

## Quick Start Checklist

- [ ] Create DigitalOcean account with $200 credit
- [ ] Install and authenticate doctl CLI
- [ ] Set up Supabase project with RLS
- [ ] Prepare GitHub repository with Next.js app
- [ ] Add health check endpoint (`/api/health`)
- [ ] Configure `next.config.js` for standalone output
- [ ] Create `.do/app.yaml` with complete spec
- [ ] Set up GitHub Actions workflows
- [ ] Add environment variables (secrets encrypted)
- [ ] Deploy initial version
- [ ] Verify health check passes
- [ ] Add custom domain (optional)
- [ ] Configure monitoring alerts
- [ ] Set up worker services for Claude agents
- [ ] Test rollback procedures
- [ ] Document scaling strategy
- [ ] Monitor costs and optimize

---

**Your PF Figma application is now deployed on DigitalOcean App Platform! 🌊**

### Key Advantages for Agentic Workloads

1. **Long-running workers** - No timeout limits for Claude agent processing
2. **Container flexibility** - Custom Docker images for specialized agents
3. **Static IPs** - Stable endpoints for API integrations
4. **Managed databases** - PostgreSQL + Redis in same network
5. **Cost predictability** - Fixed pricing, no surprise bills
6. **SOC 2 compliance** - Enterprise security requirements

---

**END OF DIGITALOCEAN SETUP GUIDE**
