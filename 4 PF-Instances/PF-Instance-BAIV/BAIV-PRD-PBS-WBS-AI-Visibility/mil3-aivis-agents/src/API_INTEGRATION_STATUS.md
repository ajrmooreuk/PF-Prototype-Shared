# API Integration Status - BAIV AI Visibility Platform

## ✅ COMPLETED UPDATES

### Core Utilities
- ✅ **`/lib/eccoAPI.ts`** - Created universal API utility with:
  - `callEccoAPI()` - Main API call function
  - `getTenantId()` - Authentication helper
  - `getJWTToken()` - Session token helper
  - `pollForCompletion()` - Long-running task polling
  - `batchAPICall()` - Batch operations
  - Automatic `use_discovery_insights: true` injection for POST/PUT/PATCH requests

### Content Studio Pages - API Integrated
- ✅ **FAQ Generator** (`/components/faq/GenerateTab.tsx`)
  - Endpoint: `POST /content-studio/faq`
  - Includes: topic, keywords, quantity, competitor_urls, tone, answer_length
  - Auto-includes: use_discovery_insights

- ✅ **Meta Generator** (`/components/meta/GenerateTab.tsx`)
  - Endpoint: `POST /content-studio/meta`
  - Includes: content, page_type, target_keywords
  - Auto-includes: use_discovery_insights

### Leads Pages - API Integrated
- ✅ **New Campaign Page** (`/components/leads/NewCampaignPage.tsx`)
  - Hunter.io: `POST /api/leads/campaigns` + `POST /api/leads/campaigns/{id}/search`
  - Google Maps: `POST /api/leads/campaigns` + `POST /api/leads/campaigns/{id}/search-google-maps`
  - LinkedIn Post: `POST /api/linkedin/campaigns/scrape-post`
  - LinkedIn Profile: `POST /api/linkedin/campaigns/search-profiles`
  - All include proper request bodies with campaign parameters

---

## 🔄 PENDING UPDATES (Need API Integration)

### Discovery Audit
- **`/components/DiscoveryAuditPage.tsx`** - Uses static mock data
  - **Needs**: 
    - `POST /discovery-audit/start` (start new audit)
    - `GET /discovery-audit/status/{audit_id}` (poll status)
    - `GET /discovery-audit/results/{audit_id}` (get results)
    - `GET /discovery-audit/latest` (get latest audit)

### Content Studio - Remaining Pages
- **Image Generator** (`/components/image/GenerateTab.tsx`)
  - **Needs**: `POST /content-studio/image` with prompt, style, dimensions

- **Link Suggester** (`/components/link/AnalyzeContentTab.tsx`)
  - **Needs**: `POST /content-studio/links` with content, existing_pages

- **Schema Generator** (`/components/schema/GenerateTab.tsx`)
  - **Needs**: `POST /content-studio/schema` with content_type, data

- **Blog Creator** (`/components/blog/BriefCreationForm.tsx`)
  - **Needs**: `POST /content-studio/blog/brief` with topic, target_audience, etc.

### Social Media Pages
- **Social Media Post Creator** (`/components/social/QuickGenerateForm.tsx`)
  - **Needs**: `POST /social-media/generate` with topic, platforms, post_count

- **Publishing Calendar** (`/components/social/calendar/SchedulePostModal.tsx`)
  - **Needs**: 
    - `POST /social-media/schedule` (schedule post)
    - `GET /social-media/scheduled?date=YYYY-MM` (get calendar)

- **Social Listening** (`/components/social/listening/SocialListeningPage.tsx`)
  - **Needs**:
    - `GET /social-listening/stats` (get stats)
    - `GET /social-listening/results?source_type=reddit&page=1` (get results)
    - `POST /social-listening/scrape` (trigger new scrape)
    - `PATCH /social-listening/results/{id}` (update status)

- **Ideas Library** (`/components/social/ideas/GenerateAIModal.tsx`)
  - **Needs**: `POST /social-media/ideas/generate` with parameters

### Leads Pages - Remaining
- **Leads Dashboard** (`/components/leads/LeadsDashboardPage.tsx`)
  - **Needs**: `GET /leads/stats` (dashboard metrics)

- **Campaigns List** (`/components/leads/CampaignsListPage.tsx`)
  - **Needs**: `GET /leads/campaigns?page=1&limit=50` (list campaigns)

- **Campaign Results** (`/components/leads/results/CampaignResultsPage.tsx`)
  - **Needs**: 
    - `GET /leads/campaigns/{id}/results` (get leads)
    - `PATCH /leads/{lead_id}` (update lead)
    - `GET /leads/export?format=csv` (export)

---

## 📋 UPDATE PATTERN (Copy This for Each Page)

### Step 1: Import the API utility
```typescript
import { callEccoAPI } from '../../lib/eccoAPI'; // Adjust path as needed
```

### Step 2: Replace mock API calls
```typescript
// ❌ BEFORE (Mock)
await new Promise(resolve => setTimeout(resolve, 3000));
const mockData = { ... };

// ✅ AFTER (Real API)
const result = await callEccoAPI('/endpoint-path', 'POST', {
  field1: value1,
  field2: value2,
  // use_discovery_insights: true is auto-added
});
```

### Step 3: Add try/catch error handling
```typescript
try {
  const result = await callEccoAPI('/endpoint', 'POST', requestBody);
  // Handle success
  toast.success('Success message');
} catch (error) {
  console.error('Operation error:', error);
  toast.error(error instanceof Error ? error.message : 'Operation failed');
} finally {
  setIsLoading(false);
}
```

### Step 4: Transform API response if needed
```typescript
// If API response structure differs from component expectations
const transformedData = {
  id: result.id || 'fallback_id',
  field1: result.api_field || defaultValue,
  // ... map other fields
};
setComponentState(transformedData);
```

---

## 🎯 PRIORITY ORDER FOR REMAINING UPDATES

### High Priority (Core Features)
1. **Discovery Audit** - Most foundational, affects all other features
2. **Blog Creator** - Major content creation feature
3. **Social Media Post Creator** - High-use feature
4. **Social Listening** - Real-time data integration

### Medium Priority
5. **Image Generator** - Content creation tool
6. **Link Suggester** - SEO optimization
7. **Schema Generator** - Technical SEO
8. **Publishing Calendar** - Social scheduling
9. **Campaign Results** - Leads management

### Lower Priority
10. **Ideas Library** - Content planning
11. **Leads Dashboard** - Analytics display
12. **Campaigns List** - Campaign management

---

## 🔧 AUTHENTICATION NOTES

### Current Implementation (Demo Mode)
```typescript
// In /lib/eccoAPI.ts
export function getTenantId(): string {
  return 'demo-tenant-123'; // DEMO VALUE
}

export function getJWTToken(): string {
  return 'demo-jwt-token-456'; // DEMO VALUE
}
```

### Production Implementation (TODO)
```typescript
// Replace with Supabase integration
import { supabase } from '../lib/supabase';

export function getTenantId(): string {
  const user = supabase.auth.user();
  return user?.user_metadata?.tenant_id || '';
}

export function getJWTToken(): string {
  const session = supabase.auth.session();
  return session?.access_token || '';
}
```

---

## ✅ VERIFICATION CHECKLIST

For each page updated, verify:
- [ ] Imported `callEccoAPI` from `/lib/eccoAPI.ts`
- [ ] Replaced mock `setTimeout` calls with real API calls
- [ ] Used correct endpoint from ECCO_CLIENT_DASHBOARD_API_CONFIG.md
- [ ] Included all required request body fields
- [ ] Added try/catch error handling
- [ ] Toast notifications for success/error
- [ ] Loading states (isLoading, isGenerating, etc.)
- [ ] Response transformation if needed
- [ ] `use_discovery_insights: true` automatically included (for content generation)

---

## 📝 API ENDPOINTS REFERENCE

### Content Studio
- `POST /content-studio/faq` ✅ INTEGRATED
- `POST /content-studio/meta` ✅ INTEGRATED
- `POST /content-studio/image` ⏳ PENDING
- `POST /content-studio/links` ⏳ PENDING
- `POST /content-studio/schema` ⏳ PENDING
- `POST /content-studio/blog/brief` ⏳ PENDING

### Social Media
- `POST /social-media/generate` ⏳ PENDING
- `POST /social-media/schedule` ⏳ PENDING
- `GET /social-media/scheduled?date=YYYY-MM` ⏳ PENDING

### Social Listening
- `GET /social-listening/stats` ⏳ PENDING
- `GET /social-listening/results?source_type={type}&page={n}` ⏳ PENDING
- `POST /social-listening/scrape` ⏳ PENDING

### Leads
- `POST /api/leads/campaigns` ✅ INTEGRATED
- `POST /api/leads/campaigns/{id}/search` ✅ INTEGRATED
- `POST /api/leads/campaigns/{id}/search-google-maps` ✅ INTEGRATED
- `POST /api/linkedin/campaigns/scrape-post` ✅ INTEGRATED
- `POST /api/linkedin/campaigns/search-profiles` ✅ INTEGRATED
- `GET /leads/stats` ⏳ PENDING
- `GET /leads/campaigns?page={n}&limit={n}` ⏳ PENDING
- `GET /leads/campaigns/{id}/results` ⏳ PENDING

### Discovery Audit
- `POST /discovery-audit/start` ⏳ PENDING
- `GET /discovery-audit/status/{audit_id}` ⏳ PENDING
- `GET /discovery-audit/results/{audit_id}` ⏳ PENDING
- `GET /discovery-audit/latest` ⏳ PENDING

---

**Last Updated**: November 10, 2025  
**Updated By**: API Integration Phase 1  
**Next Steps**: Continue updating pending pages following the pattern above
