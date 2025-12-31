# BAIV Deployment Guide v1.0.0

**Simple deployment to DigitalOcean (No Docker Required)**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 1.0.0 |
| **Date** | December 31, 2025 |
| **Purpose** | MVP deployment guide for BAIV platform |
| **Status** | 🟢 Active |
| **Target Platform** | DigitalOcean App Platform |

---

## Executive Summary

BAIV MVP deploys to **DigitalOcean App Platform** with zero Docker configuration. The platform auto-detects Node.js/Python and handles builds automatically.

**Deployment Stack:**
- **Platform**: DigitalOcean App Platform (managed)
- **Database**: DigitalOcean Managed PostgreSQL
- **API**: Node.js/TypeScript or Python/FastAPI
- **Frontend**: Static site (HTML/JS) or Next.js
- **Cost**: ~$20-30/month for MVP

**Key Benefits:**
- ✅ No Docker expertise needed
- ✅ Auto-deploy from GitHub
- ✅ Managed database (no ops)
- ✅ Free SSL certificates
- ✅ Auto-scaling ready

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [API Deployment](#api-deployment)
4. [Environment Variables](#environment-variables)
5. [GitHub Integration](#github-integration)
6. [Post-Deployment](#post-deployment)
7. [Monitoring](#monitoring)
8. [Cost Estimate](#cost-estimate)

---

## Prerequisites

### Required Accounts
- [ ] DigitalOcean account (https://digitalocean.com)
- [ ] GitHub account with BAIV repository
- [ ] Domain name (optional, but recommended)

### Local Development Setup
```bash
# Install Node.js 18+ or Python 3.11+
node --version  # v18.0.0+
# OR
python --version  # 3.11+

# Install dependencies
npm install
# OR
pip install -r requirements.txt

# Test locally
npm run dev
# OR
uvicorn main:app --reload
```

---

## Database Setup

### Step 1: Create Managed PostgreSQL Database

**Via DigitalOcean Console:**

1. Navigate to **Databases** → **Create Database**
2. Select:
   - **Database Engine**: PostgreSQL 16
   - **Plan**: Basic ($15/month for MVP)
   - **Datacenter**: Closest to your users (e.g., NYC, LON)
   - **Database Name**: `baiv-production`
3. Click **Create Database**
4. Wait 2-3 minutes for provisioning

**Connection Details (save these):**
```
Host: baiv-production-do-user-xyz.db.ondigitalocean.com
Port: 25060
Database: defaultdb
User: doadmin
Password: [auto-generated]
SSL: Required (default)
```

### Step 2: Configure Database

**Add Trusted Sources:**
1. In database settings, add your IP for local access
2. App Platform apps are auto-trusted

**Create Application Database:**
```sql
-- Connect via psql or DigitalOcean console
CREATE DATABASE baiv;

-- Switch to baiv database
\c baiv

-- Run schema
\i path/to/BAIV_DATABASE_SCHEMA.sql

-- Verify tables
\dt
```

**Connection String Format:**
```
postgresql://doadmin:PASSWORD@HOST:25060/baiv?sslmode=require
```

---

## API Deployment

### Option 1: Node.js/TypeScript API (Recommended)

**Project Structure:**
```
/api
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # Entry point
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── ontology.ts
│   │   ├── agents.ts
│   │   └── audits.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── tenant.ts
│   └── db.ts             # Database connection
└── .env.example
```

**package.json:**
```json
{
  "name": "baiv-api",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev src/index.ts"
  },
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.11.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.0",
    "typescript": "^5.3.0",
    "ts-node-dev": "^2.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**src/index.ts (minimal):**
```typescript
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', version: '1.0.0' });
});

// Routes (import from separate files)
// app.use('/v1/auth', authRoutes);
// app.use('/v1/ontology', ontologyRoutes);
// app.use('/v1/agents', agentRoutes);
// app.use('/v1/audits', auditRoutes);

app.listen(port, () => {
  console.log(`BAIV API listening on port ${port}`);
});
```

### Option 2: Python/FastAPI (Alternative)

**requirements.txt:**
```txt
fastapi==0.108.0
uvicorn[standard]==0.25.0
psycopg2-binary==2.9.9
pydantic==2.5.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0
```

**main.py (minimal):**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os

app = FastAPI(title="BAIV API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# Add routes here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
```

---

## Environment Variables

### Required Environment Variables

**Production `.env`:**
```bash
# Database
DATABASE_URL=postgresql://doadmin:PASSWORD@HOST:25060/baiv?sslmode=require

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# API
NODE_ENV=production
PORT=8080
API_URL=https://api.baiv.co.uk

# CORS
ALLOWED_ORIGINS=https://app.baiv.co.uk,https://dashboard.baiv.co.uk

# Rate Limiting (optional)
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100

# External Services (when needed)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
```

**Generate JWT Secret:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Python
python -c "import secrets; print(secrets.token_hex(32))"

# OpenSSL
openssl rand -hex 32
```

---

## GitHub Integration

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial BAIV API"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/baiv-api.git
git branch -M main
git push -u origin main
```

### Step 2: Create App on DigitalOcean

**Via Console:**

1. Go to **Apps** → **Create App**
2. Select **GitHub** as source
3. Authorize DigitalOcean to access your repos
4. Select repository: `yourusername/baiv-api`
5. Select branch: `main`
6. Click **Next**

**Auto-Detection:**
- App Platform will detect Node.js or Python
- Build and start commands auto-configured
- If not, manually set:

**For Node.js:**
```
Build Command: npm install && npm run build
Run Command: npm start
```

**For Python:**
```
Build Command: pip install -r requirements.txt
Run Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Step 3: Configure Resources

**Select Plan:**
- **Basic**: $5/month (512MB RAM, 1 vCPU) - Good for MVP
- **Professional**: $12/month (1GB RAM) - For production

**Environment Variables:**
1. In App settings, add all variables from `.env`
2. Click **Encrypt** for sensitive values (JWT_SECRET, API keys)
3. Reference database: `${db.DATABASE_URL}`

**Database Binding:**
1. In **Resources** tab, click **Add Resource**
2. Select your PostgreSQL database
3. This auto-creates `DATABASE_URL` variable

### Step 4: Deploy

1. Review configuration
2. Click **Create Resources**
3. Wait 5-10 minutes for first deploy
4. App Platform will:
   - Clone repo
   - Install dependencies
   - Run build
   - Start application
   - Assign URL: `https://baiv-api-xyz.ondigitalocean.app`

---

## Post-Deployment

### Verify Deployment

**Health Check:**
```bash
curl https://baiv-api-xyz.ondigitalocean.app/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Custom Domain (Optional)

1. In App settings → **Domains**
2. Click **Add Domain**
3. Enter: `api.baiv.co.uk`
4. Update DNS records:
   ```
   Type: CNAME
   Name: api
   Value: baiv-api-xyz.ondigitalocean.app
   TTL: 3600
   ```
5. SSL certificate auto-generated (1-2 hours)

### Database Migrations

**Run Initial Migration:**
```bash
# Connect to production database
psql $DATABASE_URL

# Run schema
\i BAIV_DATABASE_SCHEMA.sql

# Verify
\dt
SELECT version FROM schema_version;
```

**Future Migrations:**
Create migration files and run via psql or app command:
```bash
# In App Platform Console → Console tab
psql $DATABASE_URL -f migrations/002_add_new_table.sql
```

---

## Monitoring

### DigitalOcean App Platform Monitoring

**Built-in Metrics (free):**
- CPU usage
- Memory usage
- Request count
- Response time
- Error rate

**Access Logs:**
```bash
# Via DigitalOcean Console
Apps → Your App → Runtime Logs

# Filter by severity
doctl apps logs [app-id] --type run --follow
```

### Application Monitoring

**Add Simple Logging:**
```typescript
// src/middleware/logging.ts
import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(JSON.stringify({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration_ms: duration,
      timestamp: new Date().toISOString()
    }));
  });
  
  next();
}
```

**Health Endpoint with DB Check:**
```typescript
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.json({
      status: 'healthy',
      database: 'connected',
      version: '1.0.0',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});
```

### Uptime Monitoring (Optional)

**Free Options:**
- UptimeRobot (https://uptimerobot.com) - Free tier: 50 monitors
- Pingdom (https://pingdom.com) - Free tier: 1 monitor
- BetterUptime (https://betteruptime.com) - Free tier: 10 monitors

**Setup:**
1. Create account
2. Add monitor for `https://api.baiv.co.uk/health`
3. Set check interval: 5 minutes
4. Configure alerts (email/Slack)

---

## Cost Estimate

### DigitalOcean Pricing (Monthly)

| Resource | Plan | Cost |
|----------|------|------|
| **App Platform** | Basic (512MB) | $5 |
| **PostgreSQL** | Basic (1GB RAM, 10GB storage) | $15 |
| **Bandwidth** | 1TB included | $0 |
| **SSL Certificate** | Managed (Let's Encrypt) | $0 |
| **DNS** | Included | $0 |
| **Total MVP** | | **~$20/month** |

### Scaling Costs

| Traffic | App Plan | DB Plan | Total |
|---------|----------|---------|-------|
| **MVP** (< 1K users) | Basic $5 | Basic $15 | $20 |
| **Growth** (1K-10K users) | Pro $12 | Standard $55 | $67 |
| **Production** (10K+ users) | Pro+ $24 | Advanced $120 | $144 |

**Cost Optimization Tips:**
- Start with Basic plan
- Enable caching to reduce DB load
- Use DigitalOcean Spaces for file storage ($5/month for 250GB)
- Upgrade only when hitting resource limits

---

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check package.json engines
"engines": {
  "node": ">=18.0.0"
}

# Ensure all dependencies in package.json
npm install --save missing-package
```

**Database Connection Fails:**
```bash
# Verify DATABASE_URL format
postgresql://user:password@host:port/database?sslmode=require

# Test connection locally
psql $DATABASE_URL

# Check App Platform database binding
# Should auto-create ${db.DATABASE_URL}
```

**App Crashes:**
```bash
# Check logs
doctl apps logs [app-id] --type run

# Common causes:
# - Missing environment variable
# - Port binding (use process.env.PORT)
# - Database connection pool exhausted
```

**CORS Errors:**
```typescript
// Add proper CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
```

---

## Quick Start Checklist

### Initial Setup (30 minutes)
- [ ] Create DigitalOcean account
- [ ] Create PostgreSQL database
- [ ] Run schema: `psql $DATABASE_URL -f BAIV_DATABASE_SCHEMA.sql`
- [ ] Push code to GitHub
- [ ] Create App Platform app
- [ ] Link GitHub repository
- [ ] Configure environment variables
- [ ] Bind PostgreSQL database
- [ ] Deploy

### Verification (5 minutes)
- [ ] Test health endpoint: `curl https://your-app.ondigitalocean.app/health`
- [ ] Test database connection
- [ ] Check application logs
- [ ] Verify all environment variables

### Post-Deploy (Optional)
- [ ] Configure custom domain
- [ ] Set up uptime monitoring
- [ ] Enable automatic deployments
- [ ] Configure alert notifications

---

## Summary

**BAIV MVP Deployment = Simple & Fast:**
- ✅ No Docker configuration needed
- ✅ Auto-deploy from GitHub (push to deploy)
- ✅ Managed PostgreSQL (no ops overhead)
- ✅ Free SSL, automatic HTTPS
- ✅ Under $25/month for MVP
- ✅ Scales with your app

**Next Steps:**
1. Follow [Database Setup](#database-setup)
2. Deploy API via [GitHub Integration](#github-integration)
3. Verify via [Post-Deployment](#post-deployment)
4. Monitor via [Monitoring](#monitoring)

---

**Document Version:** 1.0.0  
**Status:** 🟢 Active  
**Platform:** DigitalOcean App Platform  
**Related Documents:** BAIV_DATABASE_SCHEMA.sql, BAIV_API_SPECIFICATION.yaml
