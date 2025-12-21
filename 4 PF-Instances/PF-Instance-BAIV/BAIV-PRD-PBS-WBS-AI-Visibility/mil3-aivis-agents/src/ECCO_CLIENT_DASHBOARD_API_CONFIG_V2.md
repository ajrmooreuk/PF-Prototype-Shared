# ECCO AI CLIENT DASHBOARD - Universal API Integration Guide
**VERSION: 2.0 | UPDATED: Nov 10, 2025**  
**USE THIS FOR ALL CLIENT DASHBOARD PAGES**

---

## 📖 Table of Contents

1. [Quick Endpoint Reference](#-quick-endpoint-reference-by-feature) - Fast lookup for common endpoints
2. [Critical Setup](#-critical-read-this-first) - What this guide does
3. [Authentication Setup](#-authentication-setup) - How to authenticate
4. [Base URL](#-base-url) - Production API URL
5. [Universal Request Function](#-universal-request-function) - callEccoAPI()
6. [Discovery Insights Integration](#-discovery-audit-integration---how-it-works) - Auto-branding feature
7. [All Client Endpoints](#-client-dashboard-endpoints) - Complete endpoint list
8. [Error Handling](#️-error-handling-pattern) - Standard error handling
9. [Polling for Long Operations](#-polling-for-long-operations) - Handle async tasks
10. [Response Format](#-response-format) - Standard response structure
11. [UI Best Practices](#-ui-best-practices) - Loading, error, success states
12. [Usage in Figma Make](#-how-to-use-this-in-figma-make) - Integration instructions
13. [Quick Reference Examples](#-quick-reference-examples) - Common use cases
14. [Security Checklist](#-security-checklist) - Security requirements
15. [Performance Tips](#-performance-tips) - Optimization guidelines

---

## 🚨 CRITICAL: Read This First

This file contains the **EXACT API patterns** that MUST be used for every client dashboard page built in Figma Make.

**What This Does:**
- ✅ Ensures Discovery Audit data flows into all features
- ✅ Maintains proper authentication and security
- ✅ Keeps all pages consistent and functional
- ✅ Provides DEV_MODE for seamless development

**Pages This Applies To:**
- Discovery Audit
- Content Studio (FAQ, Image, Meta, Links, Schema, Blog)
- Social Media (Generate, Schedule, Calendar)
- Social Listening (Reddit, Bluesky, YouTube)
- Lead Generation (Hunter.io, Google Maps, LinkedIn)
- All other client-facing features

---

## 🔍 Quick Endpoint Reference by Feature

### Tenant Management
- **Get Current Tenant:** `GET /api/tenants/me` (Returns domain, keywords, social targets, ICP data)

### Discovery Intelligence
- **Get Opportunities:** `GET /api/discovery-intelligence/opportunities?limit=10&priority=HIGH`
- **Get Opportunity Details:** `GET /api/discovery-intelligence/opportunities/{topic}`
- **Get Platform Visibility:** `GET /api/discovery-intelligence/platform-visibility?platform=chatgpt`
- **Get Weakest Platforms:** `GET /api/discovery-intelligence/platform-visibility/weakest?limit=3`
- **Get RRF Coverage:** `GET /api/discovery-intelligence/rrf-coverage?topic=AI`
- **Get RRF Health:** `GET /api/discovery-intelligence/rrf-health`
- **Get Competitive Analysis:** `GET /api/discovery-intelligence/competitive-analysis?topic=AI`
- **Get Citation Trends:** `GET /api/discovery-intelligence/citation-trends?days=30`
- **Get Schema Recommendations:** `GET /api/discovery-intelligence/schema-recommendations`

### Discovery Reports
- **Generate Report:** `POST /api/discovery-reports/generate` (Auto-populates keywords & social targets)
- **Get Report:** `GET /api/discovery-reports/{report_id}`
- **Get Reports by Audit:** `GET /api/discovery-reports/audit/{audit_id}`
- **List Reports:** `GET /api/discovery-reports/?page=1&page_size=10`
- **Get Executive Summary:** `GET /api/discovery-reports/{report_id}/executive-summary`

### Discovery Audit
- **Create Audit:** `POST /api/discovery_audit/`
- **Run Audit:** `POST /api/discovery_audit/{audit_id}/run`
- **Get Audit:** `GET /api/discovery_audit/{audit_id}`
- **Get Latest:** `GET /api/discovery_audit/latest`
- **List Audits:** `GET /api/discovery_audit/?status=completed&page=1`
- **Get Report:** `GET /api/discovery_audit/{audit_id}/report`
- **Get Citations:** `GET /api/discovery_audit/{audit_id}/citations?platform=chatgpt`
- **Get Metrics:** `GET /api/discovery_audit/{audit_id}/metrics`
- **Get Gaps:** `GET /api/discovery_audit/{audit_id}/gaps?min_priority=0.7`
- **Update Audit:** `PUT /api/discovery_audit/{audit_id}`
- **Delete Audit:** `DELETE /api/discovery_audit/{audit_id}`

### Content Studio
- **FAQ Generator:** `POST /content-studio/faq`
- **FAQ Library:** `GET /content-studio/faq`
- **FAQ Export:** `GET /content-studio/faq/{faq_id}/export?format=json`
- **Image Generator:** `POST /content-studio/image`
- **Image Library:** `GET /content-studio/image`
- **Meta Tags:** `POST /content-studio/meta`
- **Link Suggester:** `POST /content-studio/links`
- **Schema Generator:** `POST /content-studio/schema`
- **Blog Brief:** `POST /content-studio/blog/brief`
- **Blog Generate:** `POST /content-studio/blog/generate`

### Social Media
- **Generate Posts:** `POST /social-media/generate`
- **Schedule Post:** `POST /social-media/schedule`
- **Get Scheduled:** `GET /social-media/scheduled?date=YYYY-MM`
- **Get Calendar:** `GET /social-media/calendar`
- **Get Analytics:** `GET /social-media/analytics?platform=linkedin`
- **Delete Scheduled:** `DELETE /social-media/scheduled/{post_id}`
- **Create Brief:** `POST /social/briefs`
- **Generate from Brief:** `POST /social/briefs/{id}/generate`
- **Get Brief Status:** `GET /social/briefs/{id}`

### Social Briefs
- **Get Discovery Sources:** `GET /api/social/briefs/discovery-sources`
- **Create Brief:** `POST /api/social/briefs`
- **Get Briefs:** `GET /api/social/briefs?limit=10&offset=0&status=completed`
- **Get Brief:** `GET /api/social/briefs/{brief_id}`
- **Delete Brief:** `DELETE /api/social/briefs/{brief_id}`
- **Get Posts:** `GET /api/social/posts?brief_id={brief_id}`

### Social Analytics
- **Get Stats:** `GET /api/social/analytics/stats`
- **Get Platform Analytics:** `GET /social-media/analytics?platform=linkedin`

### Social Listening
- **Get Stats:** `GET /social-listening/stats`
- **Reddit Results:** `GET /social-listening/results?source_type=reddit&page=1`
- **Bluesky Results:** `GET /social-listening/results?source_type=bluesky&page=1`
- **YouTube Results:** `GET /social-listening/results?source_type=youtube&page=1`
- **Trigger Scrape:** `POST /social-listening/scrape`
- **Update Status:** `PATCH /social-listening/results/{result_id}`

### LinkedIn Integration
- **Get Accounts:** `GET /api/linkedin/accounts`
- **Get Connection Queue:** `GET /api/linkedin/connections/queue?status=pending`
- **Get Connection Stats:** `GET /api/linkedin/connections/stats`
- **Send Connection:** `POST /api/linkedin/connections/send`
- **Check Connection Status:** `POST /api/linkedin/connections/check-status`
- **Remove from Queue:** `DELETE /api/linkedin/connections/queue/{lead_id}`
- **Get DMs:** `GET /api/linkedin/dms?status=generated`
- **Generate DM:** `POST /api/linkedin/dms/generate`
- **Mark DM Copied:** `PATCH /api/linkedin/dms/{dm_id}/copied`
- **Mark DM Sent:** `PATCH /api/linkedin/dms/{dm_id}/sent`

### AI Coach
- **Send Chat Message:** `POST /api/ai-coach/chat`

### ICP Analysis & Gap Analysis
- **Export ICP Analysis:** `GET /api/discovery-intelligence/icp-analysis/export?format=pdf`
- **Get Gap Details:** `GET /api/discovery_audit/{audit_id}/gaps?min_priority=0.7`

### Lead Generation
- **Search Leads:** `POST /leads/search`
- **Get All Leads:** `GET /leads?page=1&limit=50`
- **Update Lead:** `PATCH /leads/{lead_id}`
- **Export Leads:** `GET /leads/export?format=csv`
- **Get Lead Details:** `GET /leads/{lead_id}`
- **Create Campaign:** `POST /api/leads/campaigns`
- **Start Search:** `POST /api/leads/campaigns/{id}/search`
- **LinkedIn Campaign:** `POST /api/linkedin/campaigns/scrape-post`

---

## 🔐 Authentication Setup

Every API call needs these two things:

```typescript
// 1. Get from Supabase Auth (or your auth system)
const TENANT_ID = getTenantId();  // From user metadata
const JWT_TOKEN = getJWTToken();  // From session

// 2. Standard headers (use for EVERY request)
const headers = {
  'Authorization': `Bearer ${JWT_TOKEN}`,
  'Content-Type': 'application/json'
};
```

---

## 🌐 Base URL

```typescript
const BASE_URL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app/api';
```

---

## 📦 Universal Request Function

**This function is already implemented in `/lib/eccoAPI.ts`**

```typescript
import { callEccoAPI, discoveryAuditAPI } from '../lib/eccoAPI';

// For general endpoints, use callEccoAPI
const faqs = await callEccoAPI('/content-studio/faq', 'POST', {
  topic: 'AI Marketing',
  quantity: 10
  // use_discovery_insights: true is auto-added
});

// For Discovery Audit endpoints, use discoveryAuditAPI
const latestAudit = await discoveryAuditAPI.getLatest();
```

**Function Features:**
- ✅ Auto-adds `use_discovery_insights: true` to all POST/PUT/PATCH requests
- ✅ Handles authentication headers automatically (JWT from localStorage)
- ✅ NO `tenant_id` query parameters (extracted from JWT by backend)
- ✅ DEV_MODE support with realistic mock data
- ✅ Proper error handling with user-friendly messages
- ✅ Console logging for debugging

**Specialized API Objects:**
- ✅ `discoveryAuditAPI` provides typed functions for all 11 Discovery Audit endpoints
- ✅ `discoveryIntelligenceAPI` provides typed functions for all 9 Intelligence endpoints
- ✅ `discoveryReportsAPI` provides typed functions for Report Generation endpoints
- ✅ `tenantsAPI` provides typed functions for Tenant endpoints
- ✅ `transformAuditDataForUI()` helper converts backend response to UI structure
- ✅ See full documentation in respective sections below

---

## 🔍 Discovery Audit Integration - HOW IT WORKS

When you send `use_discovery_insights: true` in your request body (auto-added by `callEccoAPI()`), the backend automatically:

1. ✅ Fetches the **latest discovery audit** for this tenant
2. ✅ Retrieves **brand voice** and tone guidelines
3. ✅ Pulls **content pillars** and strategic themes
4. ✅ Gets **ICP data** (target audience profile)
5. ✅ Uses **competitor intelligence**
6. ✅ Applies ALL this context to AI content generation

**The Result:**  
Instead of generic AI content, you get **brand-specific, strategically-aligned content** that sounds like YOUR client's voice.

---

## 📋 CLIENT DASHBOARD ENDPOINTS

### Tenant Management

```typescript
// ====================================
// USE THE NEW tenantsAPI!
// ====================================
import { tenantsAPI } from '../lib/eccoAPI';

// Get current tenant's data (domain, keywords, social targets, ICP)
const tenantData = await tenantsAPI.getMe();

console.log('Tenant domain:', tenantData.domain);
console.log('Target keywords:', tenantData.target_keywords);
console.log('Reddit targets:', tenantData.target_subreddits);
console.log('YouTube targets:', tenantData.target_youtube_channels);
console.log('Bluesky targets:', tenantData.target_bluesky_handles);
console.log('ICP description:', tenantData.icp_description);
```

**IMPORTANT NOTES:**
- ✅ NO parameters needed! Backend extracts tenant_id from JWT automatically
- ✅ Returns all tenant profile data including discovery targets and ICP
- ✅ Use this to populate forms, get domain for audits, fetch social listening targets

**Response Structure:**
```typescript
{
  id: string;
  legal_name: string;
  trading_name?: string;
  domain?: string;
  industry?: string;
  plan_tier?: string;
  status?: string;

  // Discovery-related fields
  target_keywords: string[];
  target_subreddits: string[];
  target_youtube_channels: string[];
  target_bluesky_handles: string[];

  // ICP fields
  icp_description?: string;
  target_roles: string[];
  target_industries: string[];
  target_pain_points: string[];

  created_at?: string;
}
```

---

### Discovery Intelligence

```typescript
// ====================================
// USE THE NEW discoveryIntelligenceAPI!
// ====================================
import { discoveryIntelligenceAPI } from '../lib/eccoAPI';

// Get top content opportunities
const opportunities = await discoveryIntelligenceAPI.getOpportunities(10, 'HIGH');
console.log('Content Gaps:', opportunities.items);

// Get platform visibility metrics
const platforms = await discoveryIntelligenceAPI.getPlatformVisibility();
console.log('ChatGPT Citations:', platforms.platforms.chatgpt?.citation_count);
console.log('Overall Score:', platforms.overall_score);

// Get RRF health score
const rrfHealth = await discoveryIntelligenceAPI.getRRFHealth();
console.log('RRF Health:', rrfHealth.score);

// Get competitive analysis
const competitive = await discoveryIntelligenceAPI.getCompetitiveAnalysis();
console.log('Competitor Data:', competitive);

// Get citation trends
const trends = await discoveryIntelligenceAPI.getCitationTrends(30);
console.log('Citation Trends:', trends);

// Get RRF coverage
const rrf = await discoveryIntelligenceAPI.getRRFCoverage();
console.log('RRF Topics:', rrf.items);

// Get schema recommendations
const schema = await discoveryIntelligenceAPI.getSchemaRecommendations();
console.log('Schema Suggestions:', schema);
```

**IMPORTANT NOTES:**
- ✅ All endpoints aggregate data from `discovery_results`, `gap_analysis`, `rrf_topic_coverage` tables
- ✅ Returns dashboard-optimized, pre-formatted data
- ✅ Use these for dashboard displays instead of raw audit data
- ✅ Handles JSON parsing and data transformation automatically

---

### Discovery Reports

```typescript
// ====================================
// USE THE NEW discoveryReportsAPI!
// ====================================
import { discoveryReportsAPI } from '../lib/eccoAPI';

// Generate comprehensive report (CRITICAL for social targets!)
const report = await discoveryReportsAPI.generate(auditId);

// This automatically:
// 1. Extracts keywords → tenant.target_keywords
// 2. Suggests subreddits → tenant.target_subreddits
// 3. Suggests YouTube channels → tenant.target_youtube_channels
// 4. Suggests Bluesky handles → tenant.target_bluesky_handles

console.log('Report generated:', report.id);
console.log('Keywords and social targets saved to tenant!');

// Get report details
const reportDetails = await discoveryReportsAPI.get(report.id);
console.log('Report:', reportDetails);

// Get executive summary for dashboard
const summary = await discoveryReportsAPI.getExecutiveSummary(report.id);
console.log('Executive Summary:', summary);

// List all reports
const reports = await discoveryReportsAPI.list(1, 10);
console.log('Reports:', reports.items);

// Get reports for specific audit
const auditReports = await discoveryReportsAPI.getByAudit(auditId);
console.log('Audit Reports:', auditReports);
```

**IMPORTANT NOTES:**
- ⚠️ **CRITICAL**: Always call `discoveryReportsAPI.generate()` after audit completes
- ✅ Report generation populates social listening targets automatically
- ✅ Social Listening pages depend on these targets being populated
- ✅ Use in DiscoveryAuditPage.tsx after audit completes

---

### Discovery Audit

```typescript
// ====================================
// USE THE NEW discoveryAuditAPI!
// ====================================
import { discoveryAuditAPI, transformAuditDataForUI } from '../lib/eccoAPI';

// Fetch tenant data first
const tenantData = await tenantsAPI.getMe();

// Create new discovery audit using tenant data
const audit = await discoveryAuditAPI.create({
  client_id: null, // clients table doesn't exist yet
  domain: tenantData.domain || "example.com",
  target_keywords: tenantData.target_keywords?.length > 0
    ? tenantData.target_keywords
    : ["AI visibility", "brand discovery"],
  platforms: ["chatgpt", "claude", "perplexity", "gemini"],
  include_youtube_analysis: false,
  include_competitor_analysis: false,
  competitor_domains: []
});

// Run the audit
await discoveryAuditAPI.run(audit.id);

// Poll for completion (check status periodically)
let completed = false;
while (!completed) {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  const status = await discoveryAuditAPI.get(audit.id);

  if (status.status === 'completed') {
    completed = true;

    // ⚠️ CRITICAL: Generate report to populate keywords & social targets
    const report = await discoveryReportsAPI.generate(status.id);
    console.log('Report generated! Keywords and social targets saved.');

    // Fetch intelligence data for dashboard
    const [opportunities, platforms] = await Promise.all([
      discoveryIntelligenceAPI.getOpportunities(20),
      discoveryIntelligenceAPI.getPlatformVisibility()
    ]);

    // Transform data for UI
    const uiData = transformAuditDataForUI(status);
    uiData.intelligence = { opportunities, platforms };
    console.log('Audit completed!', uiData);
  } else if (status.status === 'failed') {
    throw new Error(status.error_message);
  }
}

// Get latest completed audit
const latest = await discoveryAuditAPI.getLatest();

// List all audits with filters
const audits = await discoveryAuditAPI.list({
  status: 'completed',
  page: 1,
  page_size: 10
});

// Get detailed report
const report = await discoveryAuditAPI.getReport(audit.id);

// Get citations
const citations = await discoveryAuditAPI.getCitations(audit.id, 'chatgpt');

// Get metrics
const metrics = await discoveryAuditAPI.getMetrics(audit.id);

// Get gap opportunities
const gaps = await discoveryAuditAPI.getGaps(audit.id, 0.7);

// Update audit (only for pending audits)
const updated = await discoveryAuditAPI.update(audit.id, {
  target_keywords: ["new keyword"],
  platforms: ["chatgpt", "claude"]
});

// Delete audit (only for pending/failed audits)
await discoveryAuditAPI.delete(audit.id);
```

**IMPORTANT NOTES:**
- ✅ NO `tenant_id` query parameters! Backend extracts from JWT automatically
- ✅ Use `discoveryAuditAPI` specialized functions instead of raw `callEccoAPI()`
- ✅ Use `transformAuditDataForUI()` to map backend response to frontend UI structure
- ✅ Use `tenantsAPI.getMe()` to fetch tenant's domain and keywords before creating audit
- ✅ Set `client_id` to `null` (clients table doesn't exist yet)
- ✅ Dashboard automatically fetches latest audit data via `discoveryAuditAPI.getLatest()`

---

### Content Studio - FAQ Generator

```typescript
// Generate FAQs
const faqs = await callEccoAPI('/content-studio/faq', 'POST', {
  topic: "AI visibility optimization",
  keywords: ["SEO", "content marketing"],
  quantity: 10,
  competitor_urls: ["https://competitor.com/faq"],
  tone: "professional",
  answer_length: "standard"
});

// Get FAQ library
const library = await callEccoAPI('/content-studio/faq?status=published&limit=20');

// Export FAQ set
const exported = await callEccoAPI(`/content-studio/faq/${faq_id}/export?format=json`);
```

---

### Content Studio - Image Generator

```typescript
// Generate AI image
const image = await callEccoAPI('/content-studio/image', 'POST', {
  prompt: "Modern office workspace with AI technology",
  style: "photorealistic",
  dimensions: "1920x1080",
  variations: 3
});

// Get generated images
const images = await callEccoAPI('/content-studio/image?limit=20');
```

---

### Content Studio - Meta Tags Generator

```typescript
// Generate meta tags
const meta = await callEccoAPI('/content-studio/meta', 'POST', {
  content: "Your blog post content here...",
  page_type: "blog_post",
  target_keywords: ["AI", "marketing"]
});
```

---

### Content Studio - Link Suggester

```typescript
// Suggest internal links
const links = await callEccoAPI('/content-studio/links', 'POST', {
  content: "Your article content here...",
  existing_pages: ["https://site.com/page1", "https://site.com/page2"]
});
```

---

### Content Studio - Schema Generator

```typescript
// Generate schema markup
const schema = await callEccoAPI('/content-studio/schema', 'POST', {
  content_type: "FAQPage",
  data: {
    faqs: [
      { question: "Q1?", answer: "A1" },
      { question: "Q2?", answer: "A2" }
    ]
  }
});
```

---

### Content Studio - Blog Creator

```typescript
// Create blog brief
const brief = await callEccoAPI('/content-studio/blog/brief', 'POST', {
  search_phrase: "Email Marketing Automation",
  target_audience: "B2B Marketing Directors",
  content_angle: "How-to guide",
  word_count: 2500,
  style: "how-to-guide"
});

// Generate blog from brief
const blog = await callEccoAPI('/content-studio/blog/generate', 'POST', {
  search_phrase: "Email Marketing Automation",
  word_count: 2500
});
```

---

### Social Media

```typescript
// Generate social posts
const posts = await callEccoAPI('/social-media/generate', 'POST', {
  topic: "New product launch",
  platforms: ["linkedin", "twitter", "facebook"],
  post_count: 3
});

// Schedule a post
const scheduled = await callEccoAPI('/social-media/schedule', 'POST', {
  content: "Post content here...",
  platforms: ["linkedin"],
  schedule_time: "2025-11-15T14:00:00Z",
  media_urls: ["https://image.url"]
});

// Get scheduled posts
const calendar = await callEccoAPI('/social-media/scheduled?date=2025-11');

// Get analytics
const analytics = await callEccoAPI('/social-media/analytics?platform=linkedin');

// Create brief
const brief = await callEccoAPI('/social/briefs', 'POST', {
  topic: "AI Innovation",
  platforms: ["linkedin", "facebook"],
  generate_images: true
});

// Generate from brief
const generated = await callEccoAPI(`/social/briefs/${brief.id}/generate`, 'POST', {
  platforms: ["linkedin", "facebook"]
});

// Check status
const status = await callEccoAPI(`/social/briefs/${brief.id}`);
```

---

### Social Listening

```typescript
// Get stats
const stats = await callEccoAPI('/social-listening/stats');

// Get results by platform
const reddit = await callEccoAPI('/social-listening/results?source_type=reddit&page=1');
const bluesky = await callEccoAPI('/social-listening/results?source_type=bluesky&page=1');
const youtube = await callEccoAPI('/social-listening/results?source_type=youtube&page=1');

// Trigger new scrape
const scrape = await callEccoAPI('/social-listening/scrape', 'POST', {
  source_type: "reddit",
  keywords: ["AI marketing", "content optimization"],
  subreddits: ["marketing", "SEO"],
  duration_days: 7
});

// Update result status
const updated = await callEccoAPI(`/social-listening/results/${result_id}`, 'PATCH', {
  status: "used"  // or "archived"
});
```

---

### Lead Generation

```typescript
// Search for leads
const leads = await callEccoAPI('/leads/search', 'POST', {
  query: "podiatry clinics",
  location: "Dallas, TX",
  industry: "healthcare"
});

// Get leads list
const allLeads = await callEccoAPI('/leads?page=1&limit=50');

// Update lead status
const updatedLead = await callEccoAPI(`/leads/${lead_id}`, 'PATCH', {
  status: "contacted",
  notes: "Sent initial outreach email"
});

// Export leads
const exported = await callEccoAPI('/leads/export?format=csv');

// Get lead details
const leadDetails = await callEccoAPI(`/leads/${lead_id}`);

// Create campaign (Hunter.io, Google Maps)
const campaign = await callEccoAPI('/api/leads/campaigns', 'POST', {
  campaign_name: "Dallas Podiatry Outreach",
  search_provider: "hunter",  // or "google_maps"
  search_query: "podiatry clinics Dallas"
});

// Start search
const searchResult = await callEccoAPI(`/api/leads/campaigns/${campaign.id}/search`, 'POST');

// LinkedIn campaign
const linkedinCampaign = await callEccoAPI('/api/linkedin/campaigns/scrape-post', 'POST', {
  post_url: "https://linkedin.com/post/123",
  search_query: "Marketing Director"
});
```

---

## ⚠️ Error Handling Pattern

**Always wrap API calls in try/catch:**

```typescript
async function generateContent() {
  // Show loading state
  setIsLoading(true);
  setError(null);
  
  try {
    const result = await callEccoAPI('/content-studio/faq', 'POST', {
      topic: topicInput,
      quantity: 10
    });
    
    // Success! Update UI
    setGeneratedContent(result);
    toast.success('Content generated successfully!');
    
  } catch (error) {
    // Error! Show message
    console.error('Generation error:', error);
    setError(error instanceof Error ? error.message : 'An error occurred');
    toast.error('Failed to generate content');
    
  } finally {
    // Always hide loading state
    setIsLoading(false);
  }
}
```

---

## 🔄 Polling for Long Operations

Use the built-in `pollForCompletion()` function:

```typescript
import { pollForCompletion } from '../lib/eccoAPI';

// Start long operation
const audit = await callEccoAPI('/discovery-audit/start', 'POST', {
  brand_url: "https://example.com"
});

// Poll for completion (max 5 minutes, check every 5 seconds)
try {
  const results = await pollForCompletion(`/discovery-audit/status/${audit.audit_id}`);
  toast.success('Audit completed!');
  setResults(results);
} catch (error) {
  toast.error('Audit failed or timed out');
}
```

---

## ✅ Response Format

All API responses follow this structure:

```typescript
// Success Response
{
  "success": true,
  "data": { /* your requested data */ },
  "message": "Operation successful",
  "discovery_insights_used": true
}

// Error Response
{
  "success": false,
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE"
}
```

---

## 🎨 UI Best Practices

### Loading States
```typescript
{isLoading && (
  <div className="flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-[#02a4bf]" />
    <p>Generating content...</p>
  </div>
)}
```

### Error States
```typescript
{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

### Success States
```typescript
{data && (
  <Alert>
    <Check className="h-4 w-4" />
    <AlertDescription>Content generated successfully!</AlertDescription>
  </Alert>
)}
```

### Empty States
```typescript
{results.length === 0 && (
  <EmptyState 
    title="No results found" 
    description="Try a different search query"
  />
)}
```

---

## 📝 HOW TO USE THIS IN FIGMA MAKE

When creating a new dashboard page, include this in your prompt:

```
🔗 REFERENCE FILE: ECCO_CLIENT_DASHBOARD_API_CONFIG_V2.md

CRITICAL API INTEGRATION REQUIREMENTS:
1. Import and use callEccoAPI() from /lib/eccoAPI for ALL backend requests
2. Discovery insights are AUTOMATICALLY included (use_discovery_insights: true)
3. Follow the exact endpoint URLs and request formats from the v2.0 config
4. Implement proper error handling with try/catch blocks
5. Show loading states during API calls with Loader2 component
6. Use toast notifications (from sonner@2.0.3) for success/error feedback
7. DEV_MODE is enabled - all API calls return realistic mock data

AUTHENTICATION:
- getTenantId() and getJWTToken() are handled automatically by callEccoAPI()
- No need to manually add headers or tenant_id

NOW BUILD THIS PAGE:
[Your specific page requirements go here...]

EXAMPLE API CALL FOR THIS PAGE:
import { callEccoAPI } from '../lib/eccoAPI';

const handleGenerate = async () => {
  try {
    const result = await callEccoAPI('/endpoint', 'POST', {
      field: value
    });
    toast.success('Success!');
  } catch (error) {
    toast.error('Error occurred');
  }
};
```

---

## 🎯 Quick Reference Examples

### Example 1: FAQ Generator Page
```typescript
import { callEccoAPI } from '../../lib/eccoAPI';

const handleGenerate = async () => {
  setIsGenerating(true);
  
  try {
    const faqs = await callEccoAPI('/content-studio/faq', 'POST', {
      topic: topicInput,
      keywords: keywordsArray,
      quantity: quantitySliderValue,
      tone: toneSelector,
      answer_length: lengthSelector
    });
    
    setGeneratedFAQs(faqs.questions);
    toast.success(`Generated ${faqs.questions.length} FAQs`);
    
  } catch (error) {
    console.error('FAQ generation error:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to generate FAQs');
  } finally {
    setIsGenerating(false);
  }
};
```

### Example 2: Social Media Scheduler
```typescript
import { callEccoAPI } from '../../lib/eccoAPI';

const handleSchedule = async () => {
  try {
    const result = await callEccoAPI('/social-media/schedule', 'POST', {
      content: postContent,
      platforms: selectedPlatforms,
      schedule_time: scheduledDateTime,
      media_urls: uploadedImages
    });
    
    toast.success('Post scheduled successfully!');
    navigate('/social-media/calendar');
    
  } catch (error) {
    toast.error('Failed to schedule post');
  }
};
```

### Example 3: Lead Search
```typescript
import { callEccoAPI } from '../../lib/eccoAPI';

const handleSearch = async () => {
  setSearching(true);
  
  try {
    const results = await callEccoAPI('/leads/search', 'POST', {
      query: searchQuery,
      location: locationInput,
      industry: industrySelect
    });
    
    setLeads(results.leads);
    toast.success(`Found ${results.leads.length} leads`);
    
  } catch (error) {
    toast.error('Search failed');
  } finally {
    setSearching(false);
  }
};
```

---

## 🔒 Security Checklist

- ✅ Never hardcode API keys or tokens in frontend code
- ✅ Always get TENANT_ID and JWT_TOKEN from auth context (handled by callEccoAPI)
- ✅ Validate user inputs before sending to API
- ✅ Use HTTPS for all requests (enforced by BASE_URL)
- ✅ Handle 401 errors by redirecting to login
- ✅ Implement rate limiting (debounce user actions)
- ✅ Don't expose sensitive data in console.log in production

---

## ⚡ Performance Tips

1. **Use DEV_MODE during development** - No waiting for backend
2. **Debounce search inputs** - Wait 300ms after user stops typing
3. **Paginate large lists** - Load 20-50 items at a time
4. **Use batchAPICall** - Load multiple resources simultaneously
5. **Cache discovery audit results** - Don't fetch on every page load
6. **Lazy load images** - Only load images when visible
7. **Use loading skeletons** - Better UX than spinners

---

## 📚 Batch API Calls

Load multiple resources efficiently:

```typescript
import { batchAPICall } from '../lib/eccoAPI';

const [faqs, images, meta] = await batchAPICall([
  { endpoint: '/content-studio/faq' },
  { endpoint: '/content-studio/image' },
  { endpoint: '/content-studio/meta', method: 'POST', body: { content: 'test' } }
]);

// Handle results (null if failed)
if (faqs) setFAQs(faqs);
if (images) setImages(images);
if (meta) setMeta(meta);
```

---

## 🚀 DEV_MODE vs Production

**Current State (DEV_MODE = true):**
- ✅ All API calls return realistic mock data
- ✅ No 404 errors
- ✅ Instant responses (1.5s simulated delay)
- ✅ Perfect for development and testing

**Production (DEV_MODE = false):**
- Set `DEV_MODE = false` in `/lib/eccoAPI.ts`
- Replace `getTenantId()` with real Supabase auth
- Replace `getJWTToken()` with real Supabase session
- All calls hit real backend API

---

## 📊 Mock Data Features (DEV_MODE)

When `DEV_MODE = true`, all endpoints return:
- ✅ Realistic data structures matching production
- ✅ `discovery_insights_used: true` flag
- ✅ Proper success/error responses
- ✅ Consistent IDs and timestamps
- ✅ Pagination support
- ✅ Status fields for async operations

---

**END OF CLIENT DASHBOARD API CONFIG V2.0**

**📌 REMEMBER:**
- Import `callEccoAPI` from `/lib/eccoAPI`
- Discovery insights are automatically included
- DEV_MODE is enabled by default for development
- All mock data is realistic and production-ready
- Switch to production by setting DEV_MODE = false

---

**Live API Documentation:** https://ecco-ai-vis-9wprj.ondigitalocean.app/docs

**Questions or issues?** Check the implementation in `/lib/eccoAPI.ts`