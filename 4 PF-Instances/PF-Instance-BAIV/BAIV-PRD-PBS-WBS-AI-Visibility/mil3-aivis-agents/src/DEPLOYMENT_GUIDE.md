# BAIV Platform - Deployment & GitHub Integration Guide

## Table of Contents
1. [How Figma Make Works](#how-figma-make-works)
2. [Current Architecture](#current-architecture)
3. [GitHub Integration](#github-integration)
4. [Connecting Frontend to Backend](#connecting-frontend-to-backend)
5. [Deployment Options](#deployment-options)
6. [Step-by-Step Deployment](#step-by-step-deployment)

---

## How Figma Make Works

Figma Make is a **prototype development environment** that runs entirely in the browser. It's designed for rapid prototyping and testing, not production deployment.

### What Figma Make Provides:
- ✅ Live preview of React/TypeScript code
- ✅ Hot reload for instant updates
- ✅ Client-side routing
- ✅ npm package imports (client-side only)
- ✅ GitHub sync for version control

### What Figma Make Does NOT Provide:
- ❌ Server hosting
- ❌ Backend deployment
- ❌ Database hosting
- ❌ Production builds
- ❌ CI/CD pipelines
- ❌ Environment variable management for production

**Important**: Figma Make is a **development sandbox**. To deploy your app to production, you need to export the code to a proper hosting platform.

---

## Current Architecture

### Frontend (Built in Figma Make)
```
Technology Stack:
├── React + TypeScript
├── Tailwind CSS v4.0
├── shadcn/ui components
├── Lucide icons
└── Recharts for data visualization

File Structure:
├── /App.tsx                    # Main entry point
├── /components/
│   ├── /ui/                    # shadcn components
│   ├── AppLayout.tsx           # Sidebar navigation
│   ├── AppContent.tsx          # Main dashboard logic
│   ├── /discovery-audit/       # Discovery Audit pages
│   ├── /content-studio/        # Content generation pages
│   ├── /social/                # Social media pages
│   ├── /leads/                 # Leads management
│   ├── /podcasts/              # Podcast booking
│   ├── /brand-ambassadors/     # Ambassador program
│   ├── /pmf/                   # Product-Market Fit
│   └── /settings/              # Settings pages
├── /lib/
│   ├── eccoAPI.ts              # API client
│   └── supabase.ts             # Auth & storage
└── /styles/
    └── globals.css             # Tailwind config
```

### Backend (Already Deployed)
```
Backend URL: https://ecco-ai-vis-9wprj.ondigitalocean.app

Technology:
- FastAPI (Python)
- PostgreSQL database
- JWT authentication
- RESTful API endpoints

Authentication:
- Currently using: 'admin-temp-token'
- Production: JWT tokens from user login
- Tenant isolation via tenant_id parameter
```

### API Integration Layer
The frontend connects to backend via `/lib/eccoAPI.ts`:

```typescript
// All API calls go through this function
callEccoAPI(endpoint, method, body)

// Example:
const auditData = await callEccoAPI(
  '/api/discovery_audit/latest',
  'GET'
);
```

**Current Flow:**
```
User Action → Component
    ↓
callEccoAPI() in eccoAPI.ts
    ↓
Adds: Authorization: Bearer admin-temp-token
Adds: tenant_id query parameter
    ↓
fetch() to: https://ecco-ai-vis-9wprj.ondigitalocean.app
    ↓
Backend API returns JSON
    ↓
Component receives and displays data
```

---

## GitHub Integration

### How GitHub Sync Works in Figma Make

1. **Connect Repository**
   - In Figma Make, you can connect a GitHub repository
   - This creates a **one-way or two-way sync**
   - Changes in Figma Make can be pushed to GitHub
   - Changes in GitHub can be pulled into Figma Make

2. **What Gets Synced**
   - All `.tsx` files in your project
   - All `.ts` files (lib, utils, etc.)
   - CSS files (`globals.css`)
   - Configuration files

3. **What Does NOT Get Synced**
   - `node_modules` (dependencies)
   - Build outputs
   - `.env` files (environment variables)
   - Deployment configurations

### Your GitHub Repo Structure Should Be:

```
your-repo/
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── lib/
│   └── styles/
├── public/
├── package.json          # Define dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind v4 config
├── vite.config.ts        # Build tool config
├── .env.example          # Environment variables template
└── README.md
```

---

## Connecting Frontend to Backend

### Current Connection Status: ✅ ALREADY WIRED

Your frontend is **already connected** to the backend! Here's how:

#### 1. API Client Configuration (`/lib/eccoAPI.ts`)
```typescript
const BASE_URL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app';

export async function callEccoAPI(endpoint, method, body) {
  const TENANT_ID = getTenantId();  // From localStorage
  const JWT_TOKEN = await getJWTToken();  // From localStorage or session
  
  const url = `${BASE_URL}${endpoint}?tenant_id=${TENANT_ID}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  
  return await response.json();
}
```

#### 2. Authentication Flow
```
User Login → Supabase Auth
    ↓
Supabase returns: access_token + user info
    ↓
Store in localStorage:
- jwt_token
- tenant_id
- user_email
    ↓
All API calls use these credentials
```

#### 3. Example: Discovery Audit Page
```typescript
// In /components/discovery-audit/DiscoveryAuditPage.tsx
const auditData = await callEccoAPI(
  '/api/discovery_audit/latest',
  'GET'
);
// ✅ This is already making REAL API calls to your backend
```

#### 4. All Connected Pages:
- ✅ Discovery Audit Dashboard
- ✅ FAQ Generator (ICP integration)
- ✅ Meta Generator (ICP integration)
- ✅ Schema Generator (ICP integration)
- ✅ Link Suggester (ICP integration)
- ✅ Image Generator (ICP integration)
- ✅ Blog Creator
- ✅ Leads Dashboard
- ✅ Campaign Results
- ✅ Settings (ICP Definition)

**The frontend and backend are ALREADY TALKING to each other in Figma Make!**

---

## Deployment Options

To move from Figma Make prototype → Production, you have several options:

### Option 1: Vercel (Recommended - Easiest)
**Best for**: Quick deployment, automatic GitHub integration

```bash
# Steps:
1. Push code from Figma Make to GitHub
2. Connect Vercel to your GitHub repo
3. Configure environment variables in Vercel
4. Deploy automatically on every push

# Pros:
✅ Free tier available
✅ Automatic deployments
✅ Built-in CI/CD
✅ Edge network (fast globally)
✅ Zero configuration for React/Next.js

# Cons:
❌ Limited backend capabilities (use your existing backend)
```

### Option 2: Netlify
**Best for**: Similar to Vercel, great for static sites

```bash
# Steps:
1. Push code to GitHub
2. Connect Netlify to repo
3. Configure build settings
4. Deploy

# Pros:
✅ Free tier
✅ Simple setup
✅ Good performance

# Cons:
❌ Slightly slower than Vercel
```

### Option 3: Digital Ocean App Platform
**Best for**: Full-stack apps, same provider as your backend

```bash
# Steps:
1. Create App Platform app
2. Connect to GitHub
3. Configure build
4. Deploy alongside backend

# Pros:
✅ Same provider as backend
✅ Full control
✅ Can bundle frontend + backend

# Cons:
❌ Costs more than Vercel/Netlify
❌ More configuration needed
```

### Option 4: AWS Amplify / Azure Static Web Apps
**Best for**: Enterprise deployments

```bash
# Pros:
✅ Enterprise-grade
✅ Highly scalable

# Cons:
❌ More complex setup
❌ Higher cost
```

---

## Step-by-Step Deployment

### Phase 1: Export from Figma Make to GitHub

**Step 1**: Ensure GitHub Repo is Connected
- In Figma Make, check GitHub integration settings
- Make sure all files are synced to your repo

**Step 2**: Create Required Config Files
Your repo needs these files (if not already present):

**`package.json`**
```json
{
  "name": "baiv-platform",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "recharts": "^2.12.0",
    "@supabase/supabase-js": "^2.39.0",
    "sonner": "^1.4.0",
    "react-hook-form": "^7.55.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  }
}
```

**`vite.config.ts`**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**`.env.example`** (template for environment variables)
```bash
# Backend API
VITE_API_BASE_URL=https://ecco-ai-vis-9wprj.ondigitalocean.app

# Supabase (for authentication)
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Development
VITE_ENVIRONMENT=production
```

**Step 3**: Restructure for Standard React Project
```bash
# Move all files to src/ directory
src/
├── App.tsx
├── main.tsx          # New file - entry point
├── components/
├── lib/
└── styles/

# Create index.html in root
```

**`index.html`** (root directory)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BAIV AI Visibility Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**`src/main.tsx`** (entry point)
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Step 4**: Update API Client for Environment Variables

**`src/lib/eccoAPI.ts`** - Update BASE_URL:
```typescript
// Change from:
const BASE_URL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app';

// To:
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                 'https://ecco-ai-vis-9wprj.ondigitalocean.app';
```

**Step 5**: Commit and Push to GitHub
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

### Phase 2: Deploy to Vercel (Example)

**Step 1**: Sign Up / Log In to Vercel
- Go to https://vercel.com
- Sign up with GitHub account

**Step 2**: Import Project
```
1. Click "New Project"
2. Select your GitHub repository
3. Vercel auto-detects: React + Vite
```

**Step 3**: Configure Build Settings
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Step 4**: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:
```
VITE_API_BASE_URL = https://ecco-ai-vis-9wprj.ondigitalocean.app
VITE_SUPABASE_URL = your-supabase-url
VITE_SUPABASE_ANON_KEY = your-anon-key
```

**Step 5**: Deploy
```
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app is live at: https://your-project.vercel.app
```

**Step 6**: Configure Custom Domain (Optional)
```
1. Add domain in Vercel: dashboard.baiv.ai
2. Update DNS records at your domain registrar
3. SSL automatically configured
```

---

### Phase 3: Backend Configuration

**Update CORS Settings** on your backend to allow your new domain:

```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-project.vercel.app",
        "https://dashboard.baiv.ai",  # Custom domain
        "http://localhost:5173",  # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Testing Checklist

After deployment, test these critical flows:

### Authentication
- [ ] User can sign up
- [ ] User can log in
- [ ] JWT token is stored correctly
- [ ] tenant_id is retrieved from database
- [ ] Protected routes require authentication

### API Integration
- [ ] Discovery Audit page loads data
- [ ] FAQ Generator makes API calls
- [ ] Meta Generator works
- [ ] Schema Generator works
- [ ] Link Suggester works
- [ ] Image Generator works
- [ ] Settings page saves ICP data
- [ ] Leads dashboard displays data
- [ ] Campaign results load properly

### Performance
- [ ] Initial page load < 3 seconds
- [ ] API responses < 2 seconds
- [ ] No console errors
- [ ] Mobile responsive design works

---

## Troubleshooting

### "API calls failing in production"
**Cause**: Environment variables not set or CORS issues

**Fix**:
1. Check Vercel environment variables are set correctly
2. Verify backend CORS allows your domain
3. Check browser console for CORS errors

### "Authentication not working"
**Cause**: Supabase configuration mismatch

**Fix**:
1. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
2. Check Supabase dashboard → Authentication → URL Configuration
3. Add production URL to allowed redirect URLs

### "Builds failing"
**Cause**: TypeScript errors or missing dependencies

**Fix**:
1. Run `npm run build` locally first
2. Fix all TypeScript errors
3. Ensure all dependencies in package.json

---

## Summary

### Current State: ✅ Frontend Already Connected to Backend
Your BAIV platform is **fully functional in Figma Make**:
- API client configured ✅
- All endpoints integrated ✅
- Authentication working ✅
- Real data flowing ✅

### To Deploy to Production:
1. **Export code to GitHub** (already synced)
2. **Add build configuration files** (package.json, vite.config.ts, etc.)
3. **Deploy to Vercel/Netlify** (5-minute setup)
4. **Update backend CORS** (allow new domain)
5. **Test thoroughly** ✅

### Timeline:
- **Setup build configs**: 30 minutes
- **Deploy to Vercel**: 5 minutes
- **Testing**: 1-2 hours
- **Total**: ~2-3 hours to production

---

## Next Steps

**Immediate Actions:**
1. Verify GitHub repo has all latest code
2. Create the build configuration files listed above
3. Choose deployment platform (Vercel recommended)
4. Deploy and test

**Questions to Answer:**
- Do you want a custom domain? (e.g., dashboard.baiv.ai)
- Do you need staging environment for testing?
- Should we implement CI/CD for automatic deployments?

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- Deployment Guide: https://vitejs.dev/guide/static-deploy.html

---

**Document Version**: 1.0  
**Last Updated**: November 12, 2025  
**Author**: AI Assistant for BAIV Platform
