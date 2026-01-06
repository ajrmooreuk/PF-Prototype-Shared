# PRD: Milana's AI Visibility Platform Integration

**PRD ID:** MILANA-PRD-001  
**Title:** Milana AI Visibility Platform Integration  
**Version:** 1.0.0  
**Status:** 🔥 P0 - Critical Integration  
**Created:** October 27, 2025  
**Updated:** October 27, 2025  
**Owner:** Solution Architect, Milana  
**Priority:** P0 - Core Workflow & Ontology System  

---

## 🎯 Executive Summary

This PRD defines the integration of **Milana's AI Visibility Platform** (Python-based) with the **BAIV Platform** (TypeScript/React). Milana's platform provides the core workflow ontology, RRF (Reciprocal Rank Fusion) algorithm, content gap analysis, and lead generation systems that power the BAIV Product's strategic insights.

**Core Integration:**
> Milana's Python workflows + BAIV Platform infrastructure = Complete AI Visibility & PMF System

**Key Challenge:**
- Milana's system: Python 3.11, PostgreSQL, Anthropic Claude, Apify, Hunter.io
- BAIV Platform: TypeScript/React, Supabase, Claude API, Server-side Hono

**Integration Strategy:**
- **Option 1:** Port Python logic to TypeScript (server-side)
- **Option 2:** API bridge between systems
- **Option 3:** Hybrid (critical workflows in TypeScript, complex ML in Python microservice)

---

## 📋 Milana's AI Visibility Platform Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│              MILANA'S AI VISIBILITY PLATFORM                     │
│                    (Python 3.11 + Supabase)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐ │
│  │   ONTOLOGIES   │  │    SCHEMAS     │  │     SKILLS       │ │
│  │                │  │                │  │                  │ │
│  │ • Brand        │  │ • Tenants      │  │ • Discovery      │ │
│  │ • AI Visibility│  │ • Content      │  │ • Strategy       │ │
│  │ • Agent Arch   │  │ • Leads        │  │ • Leads          │ │
│  │                │  │ • RRF System   │  │ • Social         │ │
│  └────────────────┘  └────────────────┘  └──────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Core Components

**1. Ontologies** (`ontologies/`)
- **Universal Brand Ontology** (W4M BAIV framework)
- **AI Visibility Ontology** (visibility dimensions, scoring)
- **Agent Architecture Ontology** (agent types, skills, hierarchy)

**2. Schemas** (`schemas/` + `database/migrations/`)
- **Multi-tenant architecture** (tenants, organizations)
- **RRF System** (topic coverage, gap analysis, priority scoring)
- **Content Management** (articles, clusters, publishing)
- **Lead Generation** (Google Maps, LinkedIn, Hunter.io)
- **Social Media** (platform connections, posts, scheduling)

**3. Skills** (`skills/`)

**Discovery Skills:**
- `gap_analyzer.py` - RRF gap analysis
- `content_audit.py` - AI visibility audit
- `competitor_analysis.py` - Competitive benchmarking

**Strategy Skills:**
- `rrf_content_planner.py` - Content planning with RRF algorithm
- `topic_clustering.py` - Article cluster generation
- `priority_scoring.py` - Opportunity prioritization

**Lead Skills:**
- `google_maps_leads.py` - Google Maps scraping (Apify)
- `hunter_email_finder.py` - Email finding (Hunter.io)
- `linkedin_leads.py` - LinkedIn lead generation

**Social Skills:**
- `social_media_manager.py` - Platform posting
- `post_scheduler.py` - Content scheduling

**Connection Skills:**
- `platform_integrations.py` - External API management

---

## 🔗 Integration Architecture

### Proposed Integration Pattern: Hybrid Approach

```
┌─────────────────────────────────────────────────────────────────┐
│                    BAIV PLATFORM (Frontend)                      │
│  React/TypeScript - Context Engineering, AI Visibility Dashboard │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTION (Server)                     │
│  TypeScript/Hono - Orchestration Layer                          │
│                                                                  │
│  ┌────────────────────┐           ┌────────────────────────┐   │
│  │ Simple Workflows   │           │  Complex Workflows     │   │
│  │ (TypeScript)       │           │  (Python Bridge)       │   │
│  │                    │           │                        │   │
│  │ • Context analysis │◄─Bridge──►│ • RRF algorithm        │   │
│  │ • Visibility calc  │           │ • Gap analysis         │   │
│  │ • Lead storage     │           │ • Content planning     │   │
│  └────────────────────┘           └────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SHARED SUPABASE DATABASE                      │
│  PostgreSQL - Tenants, Content, Leads, RRF Tables               │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL APIS (Shared)                        │
│  Claude, Apify, Hunter.io, LinkedIn, Google Maps                │
└─────────────────────────────────────────────────────────────────┘
```

**Key Integration Points:**

1. **Shared Database:** Same Supabase instance, extended schema
2. **TypeScript Workflows:** Port simple Python logic to TypeScript
3. **Python Microservice:** Keep complex RRF/ML algorithms in Python
4. **API Bridge:** Supabase Edge Function calls Python service for complex tasks
5. **Unified Ontology:** OAA Registry stores all ontologies (Python + TypeScript)

---

## 📊 Database Schema Integration

### Milana's Core Tables (To Add to BAIV Platform)

**1. Tenants Table** (already exists as `organizations` in BAIV)
```sql
-- Map Milana's tenants to BAIV organizations
-- Add columns to existing organizations table
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS
  industry VARCHAR(255),
  subdomain VARCHAR(255),
  rrf_health_score INTEGER DEFAULT 0;
```

**2. RRF System Tables** (NEW - Critical for AI Visibility)
```sql
-- Topic coverage tracking
CREATE TABLE rrf_topic_coverage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  topic_keyword VARCHAR(500),
  search_volume INTEGER,
  current_rank INTEGER,
  target_rank INTEGER,
  articles_published INTEGER DEFAULT 0,
  articles_needed INTEGER,
  rrf_score NUMERIC(10,6),
  priority_score NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gap analysis results
CREATE TABLE gap_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  analysis_date TIMESTAMPTZ DEFAULT NOW(),
  total_gaps_identified INTEGER,
  high_priority_gaps INTEGER,
  medium_priority_gaps INTEGER,
  low_priority_gaps INTEGER,
  overall_rrf_health INTEGER,
  top_opportunities JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content clusters
CREATE TABLE article_clusters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  topic VARCHAR(500),
  priority_score NUMERIC(10,2),
  articles_needed INTEGER,
  articles_planned JSONB,
  cluster_type VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Executive summary dashboard
CREATE TABLE rrf_executive_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  summary_date DATE DEFAULT CURRENT_DATE,
  overall_health INTEGER,
  total_topics_tracked INTEGER,
  topics_improved INTEGER,
  topics_declined INTEGER,
  high_priority_actions INTEGER,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Priority actions
CREATE TABLE rrf_priority_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  topic_keyword VARCHAR(500),
  action_type VARCHAR(100),
  priority VARCHAR(20),
  articles_needed INTEGER,
  estimated_impact NUMERIC(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**3. Lead Generation Tables** (NEW)
```sql
-- Google Maps leads
CREATE TABLE google_maps_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  name VARCHAR(500),
  address TEXT,
  phone VARCHAR(50),
  website VARCHAR(500),
  rating NUMERIC(3,2),
  reviews_count INTEGER,
  category VARCHAR(255),
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  source VARCHAR(100) DEFAULT 'google_maps',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email enrichment
CREATE TABLE lead_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID,
  email VARCHAR(500),
  confidence_score NUMERIC(3,2),
  source VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LinkedIn leads
CREATE TABLE linkedin_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  profile_url VARCHAR(500),
  name VARCHAR(500),
  title VARCHAR(500),
  company VARCHAR(500),
  location VARCHAR(255),
  industry VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**4. Discovery Results** (NEW)
```sql
CREATE TABLE discovery_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  audit_date TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(50),
  query_categories JSONB,
  visibility_score INTEGER,
  gaps_identified INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**5. Social Media** (NEW)
```sql
CREATE TABLE social_media_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  platform VARCHAR(50),
  content TEXT,
  media_urls JSONB,
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  status VARCHAR(50),
  engagement_metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE platform_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id),
  platform VARCHAR(50),
  credentials JSONB,
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔄 Workflow Integration

### RRF Gap Analysis Workflow (Core to BAIV Product)

**Milana's Python Workflow:**
```python
# skills/discovery/gap_analyzer.py
async def analyze_content_gaps_with_rrf(tenant_id: str):
    # 1. Fetch tenant context
    # 2. Identify target keywords
    # 3. Calculate RRF scores for each topic
    # 4. Identify gaps (low RRF = opportunity)
    # 5. Prioritize by search volume + gap size
    # 6. Store in gap_analysis table
    # 7. Generate priority actions
    # 8. Return results
```

**Integration into BAIV (TypeScript):**
```typescript
// /supabase/functions/server/index.tsx
app.post('/make-server-d98fefbb/rrf/analyze-gaps', async (c) => {
  const { organizationId } = await c.req.json();
  
  // Option A: Call Python microservice
  const pythonService = 'https://milana-service.internal/rrf/analyze-gaps';
  const result = await fetch(pythonService, {
    method: 'POST',
    body: JSON.stringify({ tenant_id: organizationId })
  });
  
  // Option B: Port to TypeScript (simplified)
  const result = await analyzeContentGapsTypeScript(organizationId);
  
  return c.json(result);
});
```

**TypeScript Port (Simplified RRF):**
```typescript
// /utils/rrf/gapAnalyzer.ts
export async function analyzeContentGapsTypeScript(organizationId: string) {
  // 1. Fetch organization context
  const context = await getOrganizationContext(organizationId);
  
  // 2. Get target keywords from context
  const keywords = context.target_keywords || [];
  
  // 3. Calculate RRF scores (simplified)
  const topicScores = await Promise.all(
    keywords.map(async (keyword) => {
      const rrf = await calculateRRFScore(organizationId, keyword);
      return {
        topic_keyword: keyword,
        rrf_score: rrf,
        articles_needed: rrf < 0.5 ? Math.ceil((0.5 - rrf) * 10) : 0,
        priority_score: calculatePriority(rrf, keyword.search_volume)
      };
    })
  );
  
  // 4. Identify gaps
  const gaps = topicScores.filter(t => t.articles_needed > 0);
  
  // 5. Store results
  await supabase.table('gap_analysis').insert({
    tenant_id: organizationId,
    total_gaps_identified: gaps.length,
    high_priority_gaps: gaps.filter(g => g.priority_score > 80).length,
    overall_rrf_health: calculateOverallHealth(topicScores),
    top_opportunities: gaps.slice(0, 10)
  });
  
  return {
    overall_rrf_health: calculateOverallHealth(topicScores),
    total_gaps_identified: gaps.length,
    top_opportunities: gaps.slice(0, 10)
  };
}
```

---

### Content Planning Workflow

**Milana's Python Workflow:**
```python
# skills/strategy/rrf_content_planner.py
async def generate_rrf_content_plan(tenant_id: str):
    # 1. Run gap analysis
    # 2. Group gaps into topic clusters
    # 3. Generate article ideas for each cluster
    # 4. Create sub-query variations (Claude)
    # 5. Build publishing schedule
    # 6. Store in article_clusters table
```

**Integration into BAIV:**
```typescript
// /supabase/functions/server/index.tsx
app.post('/make-server-d98fefbb/rrf/content-plan', async (c) => {
  const { organizationId } = await c.req.json();
  
  // 1. Get gap analysis
  const gaps = await supabase
    .table('gap_analysis')
    .select('*')
    .eq('tenant_id', organizationId)
    .order('analysis_date', { ascending: false })
    .limit(1)
    .single();
  
  // 2. Cluster topics
  const clusters = clusterTopics(gaps.data.top_opportunities);
  
  // 3. Generate article ideas (Claude)
  const articleClusters = await Promise.all(
    clusters.map(async (cluster) => {
      const articles = await generateArticleIdeas(cluster, organizationId);
      return {
        topic: cluster.topic,
        priority_score: cluster.priority,
        articles_needed: cluster.articles_needed,
        articles: articles
      };
    })
  );
  
  // 4. Store clusters
  await supabase.table('article_clusters').insert(
    articleClusters.map(ac => ({
      tenant_id: organizationId,
      topic: ac.topic,
      priority_score: ac.priority_score,
      articles_needed: ac.articles_needed,
      articles_planned: ac.articles
    }))
  );
  
  return c.json({ article_clusters: articleClusters });
});
```

---

### Lead Generation Workflow

**Milana's Python Workflow:**
```python
# skills/leads/google_maps_leads.py
async def search_google_maps_businesses(
    tenant_id: str,
    search_query: str,
    max_results: int = 50
):
    # 1. Call Apify API (Google Maps scraper)
    # 2. Parse results
    # 3. Store in google_maps_leads table
    # 4. Enrich with Hunter.io emails
    # 5. Return leads
```

**Integration into BAIV:**
```typescript
// /supabase/functions/server/index.tsx
app.post('/make-server-d98fefbb/leads/google-maps', async (c) => {
  const { organizationId, searchQuery, maxResults = 50 } = await c.req.json();
  
  // 1. Call Apify API
  const apifyKey = Deno.env.get('APIFY_API_KEY');
  const apifyResult = await fetch('https://api.apify.com/v2/acts/compass~crawler-google-places/runs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apifyKey}`
    },
    body: JSON.stringify({
      queries: [searchQuery],
      maxItems: maxResults
    })
  });
  
  const leads = await apifyResult.json();
  
  // 2. Store leads
  const inserted = await supabase.table('google_maps_leads').insert(
    leads.data.map(lead => ({
      tenant_id: organizationId,
      name: lead.name,
      address: lead.address,
      phone: lead.phone,
      website: lead.website,
      rating: lead.rating,
      reviews_count: lead.reviewsCount,
      category: lead.category,
      latitude: lead.location?.lat,
      longitude: lead.location?.lng
    }))
  );
  
  // 3. Enrich with emails (async)
  enrichLeadsWithEmails(inserted.data);
  
  return c.json({ leads: inserted.data });
});
```

---

## 🎯 Integration Phases

### Phase 1: Database Schema Integration

**Phase 1.1: Review & Planning**
- [ ] 1.1.1 Review Milana's migrations (008-014b)
- [ ] 1.1.2 Map tenants → organizations (already exists)
- [ ] 1.1.3 Plan schema extensions
- [ ] 1.1.4 Create migration scripts

**Phase 1.2: RRF System Tables**
- [ ] 1.2.1 Create rrf_topic_coverage table
- [ ] 1.2.2 Create gap_analysis table
- [ ] 1.2.3 Create article_clusters table
- [ ] 1.2.4 Create rrf_executive_summary table
- [ ] 1.2.5 Create rrf_priority_actions table
- [ ] 1.2.6 Add indexes for performance

**Phase 1.3: Lead Generation Tables**
- [ ] 1.3.1 Create google_maps_leads table
- [ ] 1.3.2 Create lead_emails table
- [ ] 1.3.3 Create linkedin_leads table

**Phase 1.4: Supporting Tables**
- [ ] 1.4.1 Create discovery_results table
- [ ] 1.4.2 Create social_media_posts table
- [ ] 1.4.3 Create platform_connections table

**Phase 1.5: Testing**
- [ ] 1.5.1 Apply migrations to staging
- [ ] 1.5.2 Test with sample data
- [ ] 1.5.3 Validate schema integrity

**Deliverables:**
- ✅ Extended Supabase schema
- ✅ RRF tables operational
- ✅ Lead tables operational
- ✅ Migration scripts documented

---

### Phase 2: Ontology Integration

**Phase 2.1: Extract Ontologies**
- [ ] 2.1.1 Extract Universal Brand Ontology from Milana's repo
- [ ] 2.1.2 Extract AI Visibility Ontology
- [ ] 2.1.3 Extract Agent Architecture Ontology
- [ ] 2.1.4 Extract Workflow Ontology
- [ ] 2.1.5 Convert to OAA Registry format

**Phase 2.2: Import to OAA Registry**
- [ ] 2.2.1 Create ontology entries in registry
- [ ] 2.2.2 Define ontology relationships
- [ ] 2.2.3 Link to existing BAIV ontologies
- [ ] 2.2.4 Map to BAIV code files

**Phase 2.3: Documentation**
- [ ] 2.3.1 Document in OAA Registry UI
- [ ] 2.3.2 Create ontology diagrams
- [ ] 2.3.3 Connect to Program Manager
- [ ] 2.3.4 Create quick reference guide

**Deliverables:**
- ✅ All ontologies in OAA Registry
- ✅ Ontology-to-code mapping complete
- ✅ Documentation created

---

### Phase 3: Core Workflow Porting

**Phase 3.1: RRF Gap Analysis**
- [ ] 3.1.1 Study Milana's gap_analyzer.py
- [ ] 3.1.2 Port calculateRRFScore() to TypeScript
- [ ] 3.1.3 Port analyze_content_gaps_with_rrf() to TypeScript
- [ ] 3.1.4 Create `/rrf/analyze-gaps` endpoint
- [ ] 3.1.5 Test with sample organization
- [ ] 3.1.6 Validate results vs Python

**Phase 3.2: Context Completeness Scoring**
- [ ] 3.2.1 Port context completeness logic
- [ ] 3.2.2 Integrate with Context Engineering
- [ ] 3.2.3 Test scoring algorithm

**Phase 3.3: Priority Action Generation**
- [ ] 3.3.1 Port priority scoring algorithm
- [ ] 3.3.2 Create `/rrf/priority-actions` endpoint
- [ ] 3.3.3 Test action generation

**Phase 3.4: Content Planning**
- [ ] 3.4.1 Study Milana's rrf_content_planner.py
- [ ] 3.4.2 Port generate_rrf_content_plan() to TypeScript
- [ ] 3.4.3 Port article clustering logic
- [ ] 3.4.4 Create `/content/generate-plan` endpoint
- [ ] 3.4.5 Test plan generation

**Phase 3.5: Lead Generation**
- [ ] 3.5.1 Set up APIFY_API_KEY (Supabase Secret)
- [ ] 3.5.2 Set up HUNTER_API_KEY (Supabase Secret)
- [ ] 3.5.3 Create `/leads/google-maps` endpoint (Apify)
- [ ] 3.5.4 Create `/leads/enrich-emails` endpoint (Hunter.io)
- [ ] 3.5.5 Test lead capture workflow
- [ ] 3.5.6 Test email enrichment

**Deliverables:**
- ✅ All workflows ported to TypeScript
- ✅ Server endpoints operational
- ✅ Testing suite passed

---

### Phase 4: Python Microservice (Optional - If Needed)

**Phase 4.1: Assessment**
- [ ] 4.1.1 Identify workflows too complex for TypeScript
- [ ] 4.1.2 Decide: Port vs. Microservice
- [ ] 4.1.3 Create decision document

**Phase 4.2: Containerization (If Needed)**
- [ ] 4.2.1 Create Dockerfile for Milana's service
- [ ] 4.2.2 Test Docker build locally
- [ ] 4.2.3 Optimize container size

**Phase 4.3: Deployment (If Needed)**
- [ ] 4.3.1 Deploy to Google Cloud Run / AWS Lambda
- [ ] 4.3.2 Configure environment variables
- [ ] 4.3.3 Set up authentication

**Phase 4.4: API Bridge (If Needed)**
- [ ] 4.4.1 Create bridge endpoint in Supabase
- [ ] 4.4.2 Implement fallback to TypeScript
- [ ] 4.4.3 Add monitoring and logging

**Deliverables (If Needed):**
- ✅ Python microservice deployed
- ✅ API bridge working
- ✅ Monitoring dashboard

---

### Phase 5: Frontend Integration

**Phase 5.1: AI Visibility Dashboard**
- [ ] 5.1.1 Create RRF health display (0-100 gauge)
- [ ] 5.1.2 Show dimension scores (5 dimensions)
- [ ] 5.1.3 Display trend chart (health over time)
- [ ] 5.1.4 Show top opportunities section
- [ ] 5.1.5 Add before/after comparison

**Phase 5.2: Gap Analysis UI**
- [ ] 5.2.1 Create opportunities list component
- [ ] 5.2.2 Display gap details (current vs target)
- [ ] 5.2.3 Show priority badges (high/medium/low)
- [ ] 5.2.4 Add filtering and sorting
- [ ] 5.2.5 Display articles needed per topic

**Phase 5.3: Content Planning UI**
- [ ] 5.3.1 Create article clusters display
- [ ] 5.3.2 Show cluster details (topic, priority)
- [ ] 5.3.3 Display article ideas list
- [ ] 5.3.4 Add publishing schedule calendar
- [ ] 5.3.5 Create cluster expansion/collapse

**Phase 5.4: Lead Generation UI**
- [ ] 5.4.1 Create lead search form (Google Maps)
- [ ] 5.4.2 Display lead cards (name, address, phone)
- [ ] 5.4.3 Show email enrichment status
- [ ] 5.4.4 Add lead filtering and sorting
- [ ] 5.4.5 Create lead export functionality

**Phase 5.5: Priority Actions UI**
- [ ] 5.5.1 Display actionable recommendations
- [ ] 5.5.2 Show estimated impact
- [ ] 5.5.3 Add action status tracking
- [ ] 5.5.4 Create action completion workflow

**Phase 5.6: Executive Summary Dashboard**
- [ ] 5.6.1 Overall health metric
- [ ] 5.6.2 Topics improved/declined counters
- [ ] 5.6.3 High priority actions count
- [ ] 5.6.4 Key recommendations display

**Deliverables:**
- ✅ Complete BAIV Product UI with RRF
- ✅ RRF visualizations operational
- ✅ Lead management interface working
- ✅ All dashboards functional

---

## 📋 API Endpoints to Create

### RRF & Gap Analysis

```typescript
// Run RRF gap analysis
POST /make-server-d98fefbb/rrf/analyze-gaps
Body: { organizationId: string }
Response: { overall_rrf_health, total_gaps, top_opportunities }

// Get RRF health score
GET /make-server-d98fefbb/rrf/health/:organizationId
Response: { health: number, trend: 'up' | 'down' | 'stable' }

// Get priority actions
GET /make-server-d98fefbb/rrf/priority-actions/:organizationId
Response: { actions: Array<PriorityAction> }

// Get executive summary
GET /make-server-d98fefbb/rrf/executive-summary/:organizationId
Response: { summary: ExecutiveSummary }
```

### Content Planning

```typescript
// Generate content plan
POST /make-server-d98fefbb/content/generate-plan
Body: { organizationId: string }
Response: { article_clusters: Array<ArticleCluster> }

// Get content clusters
GET /make-server-d98fefbb/content/clusters/:organizationId
Response: { clusters: Array<ArticleCluster> }
```

### Lead Generation

```typescript
// Search Google Maps
POST /make-server-d98fefbb/leads/google-maps
Body: { organizationId, searchQuery, maxResults }
Response: { leads: Array<Lead> }

// Enrich with emails
POST /make-server-d98fefbb/leads/enrich-emails
Body: { leadIds: string[] }
Response: { enriched: number, failed: number }

// Get leads
GET /make-server-d98fefbb/leads/:organizationId
Response: { leads: Array<Lead> }
```

---

## 🔐 Security & API Keys

### Required API Keys (Add to Supabase Secrets)

- [ ] `APIFY_API_KEY` - Google Maps scraping
- [ ] `HUNTER_API_KEY` - Email finding
- [ ] `LINKEDIN_EMAIL` - LinkedIn automation (optional)
- [ ] `LINKEDIN_PASSWORD` - LinkedIn automation (optional)

**Setup:**
```typescript
// Use create_supabase_secret tool for each
create_supabase_secret('APIFY_API_KEY');
create_supabase_secret('HUNTER_API_KEY');
```

---

## 📊 Success Metrics

### Integration Success

**Technical:**
- [ ] All RRF tables migrated
- [ ] All workflows ported or bridged
- [ ] API endpoints operational
- [ ] Frontend displaying data
- [ ] Error rate < 2%
- [ ] Response time < 3 seconds (p95)

**Business:**
- [ ] RRF health score calculated for test org
- [ ] Gap analysis identifies opportunities
- [ ] Content plan generated
- [ ] Leads captured from Google Maps
- [ ] Emails enriched via Hunter.io

---

## 🔗 Integration with BAIV Product

### Context Engineering → RRF

```typescript
// After context capture, run RRF analysis
async function onContextCaptured(organizationId: string) {
  // 1. Save context
  await saveOrganizationContext(organizationId, contextData);
  
  // 2. Trigger RRF gap analysis
  const gaps = await fetch('/functions/v1/make-server-d98fefbb/rrf/analyze-gaps', {
    method: 'POST',
    body: JSON.stringify({ organizationId })
  });
  
  // 3. Update AI Visibility score
  await updateVisibilityScore(organizationId, gaps.overall_rrf_health);
}
```

### AI Visibility Dashboard → RRF Executive Summary

```typescript
// AI Visibility Dashboard shows RRF health
function AIVisibilityDashboard({ organizationId }) {
  const [summary, setSummary] = useState(null);
  
  useEffect(() => {
    fetch(`/functions/v1/make-server-d98fefbb/rrf/executive-summary/${organizationId}`)
      .then(res => res.json())
      .then(setSummary);
  }, [organizationId]);
  
  return (
    <div>
      <h2>RRF Health: {summary?.overall_health}/100</h2>
      <p>Topics Tracked: {summary?.total_topics_tracked}</p>
      <p>High Priority Actions: {summary?.high_priority_actions}</p>
      {/* ... */}
    </div>
  );
}
```

---

## 📚 Related Documents

**Infrastructure:**
- [Platform Infrastructure Master PRD](/docs/PLATFORM_INFRASTRUCTURE_MASTER_PRD.md) - OAA Registry, Agentic Orchestration
- [Claude Integration PRD](/docs/CLAUDE_INTEGRATION_PRD.md) - AI/ML core
- [BAIV Product MVP PRD](/docs/BAIV_PRODUCT_MVP_PRD.md) - Main product

**Milana's Documentation:**
- Quick Start Guide (provided)
- RRF Algorithm Guide (docs/rrf-algorithm-guide.md)
- Skills Implementation (docs/05-SKILLS-IMPLEMENTATION.md)
- Dashboard Guide (docs/07-DASHBOARD-GUIDE.md)

---

## ✅ Implementation Checklist

### Week 1: Database & Ontology
- [ ] Review Milana's migrations (008-014b)
- [ ] Create RRF tables in BAIV Supabase
- [ ] Create lead generation tables
- [ ] Apply migrations to staging
- [ ] Import ontologies to OAA Registry
- [ ] Document in OAA Registry UI

### Week 2-3: Core Workflows
- [ ] Port RRF gap analysis to TypeScript
- [ ] Port content planner to TypeScript
- [ ] Create server endpoints
- [ ] Test with sample data
- [ ] Integrate with Context Engineering

### Week 3-4: Lead Generation
- [ ] Set up APIFY_API_KEY
- [ ] Set up HUNTER_API_KEY
- [ ] Create Google Maps endpoint
- [ ] Create email enrichment endpoint
- [ ] Test lead capture workflow

### Week 4-6: Frontend
- [ ] AI Visibility Dashboard (RRF health)
- [ ] Gap Analysis UI
- [ ] Content Planning UI
- [ ] Lead Management UI
- [ ] Executive Summary Dashboard

---

## 🎯 Bottom Line

**Integration Strategy:**
1. **Shared Database:** Extend BAIV Supabase with Milana's schema
2. **Port to TypeScript:** Critical workflows (RRF, gap analysis, content planning)
3. **API Integration:** External services (Apify, Hunter.io)
4. **Unified Ontology:** OAA Registry stores all ontologies
5. **BAIV Product Integration:** RRF powers AI Visibility scoring

**Timeline:** 6 weeks
**Priority:** P0 (critical for BAIV Product)
**Owner:** Solution Architect + Milana

**Next Steps:**
1. Review Milana's codebase in detail
2. Map Python → TypeScript equivalents
3. Start Week 1 tasks (database + ontology)

---

**Version:** 1.0.0  
**Last Updated:** October 27, 2025  
**Status:** P0 - Critical Integration  
**Approval Required:** Solution Architect, Milana
