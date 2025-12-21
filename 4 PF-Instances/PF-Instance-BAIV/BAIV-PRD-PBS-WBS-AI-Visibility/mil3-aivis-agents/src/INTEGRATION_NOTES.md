# Campaign Results - Integration Notes

## 🔗 How to Integrate with Campaigns List Page

### Step 1: Update Campaigns List to Navigate to Results

Find your CampaignsListPage component (likely at `/components/leads/CampaignsListPage.tsx`) and update the campaign row click handler:

```tsx
// In CampaignsListPage.tsx

interface CampaignsListPageProps {
  onNavigate: (page: string) => void;
  onSelectCampaign?: (campaignId: string) => void; // Add this
}

export function CampaignsListPage({ 
  onNavigate,
  onSelectCampaign 
}: CampaignsListPageProps) {
  
  const handleCampaignClick = (campaignId: string) => {
    // Call the parent to set the selected campaign
    if (onSelectCampaign) {
      onSelectCampaign(campaignId);
    }
    // Navigate to results page
    onNavigate('campaign-results');
  };

  return (
    // ... your campaigns list UI
    <div onClick={() => handleCampaignClick('camp_123')}>
      Campaign Name
    </div>
  );
}
```

---

### Step 2: Update App.tsx to Handle Campaign Selection

Add the campaign selection handler to your campaigns-list case in App.tsx:

```tsx
// In App.tsx

case 'campaigns-list':
  return (
    <CampaignsListPage 
      onNavigate={setCurrentPage}
      onSelectCampaign={(campaignId) => {
        setSelectedCampaignId(campaignId);
        // Navigation happens in CampaignsListPage
      }}
    />
  );
```

---

## 🎯 API Integration Points

### Replace Mock Data with Real API Calls

The Campaign Results page is set up to gracefully fallback to mock data if API calls fail. To integrate with your real API:

#### 1. Update API Base URL
```typescript
// In /lib/campaignAPI.ts, line 9:
const API_BASE_URL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app/api';
// ✅ Already configured correctly!
```

#### 2. Ensure Tenant ID and JWT are Passed
```tsx
// In App.tsx:
const tenantId = 'demo-tenant-123'; // Replace with real tenant ID
const jwtToken = 'demo-jwt-token-456'; // Replace with real JWT token

// Pass to Campaign Results:
<CampaignResultsPage 
  campaignId={selectedCampaignId || 'camp_123'} 
  tenantId={tenantId}  // Real tenant ID
  jwtToken={jwtToken}  // Real JWT token
  onNavigate={setCurrentPage}
/>
```

#### 3. API Response Format

The Campaign Results page expects these API responses:

**GET /api/leads/campaigns/{campaign_id}**
```json
{
  "campaign": {
    "id": "camp_123",
    "name": "Podiatry Clinics Q1 2025",
    "created_at": "2025-01-15T10:00:00Z",
    "status": "completed"
  },
  "stats": {
    "total_leads": 247,
    "total_contacts": 573,
    "enriched_count": 218,
    "enriched_percentage": 88,
    "high_icp_count": 175,
    "synced_count": 0
  },
  "companies": [
    {
      "id": "company_1",
      "name": "Ortho Clinic 1",
      "industry": "Orthopedics",
      "location": "New York, NY",
      "website": "https://clinic1.com",
      "icp_score": 85,
      "icp_category": "orthopedics",
      "icp_auto_assigned": true,
      "email_synced": false,
      "synced_list": null,
      "contacts": [
        {
          "id": "contact_1",
          "name": "John Doe",
          "title": "CEO",
          "email": "john@clinic1.com",
          "has_linkedin": true,
          "linkedin_url": "https://linkedin.com/in/johndoe"
        }
      ]
    }
  ]
}
```

**POST /api/publish/leads/{campaign_id}/preview-icp-distribution**
```json
{
  "categorized": {
    "orthopedics": {
      "companies": 45,
      "contacts": 127,
      "list_id": "ml_list_001",
      "list_name": "Orthopedics List",
      "avg_confidence": 0.85
    }
  },
  "uncategorized": {
    "companies": 15,
    "contacts": 42,
    "reasons": ["No clear ICP match", "Insufficient data"]
  }
}
```

**POST /api/publish/leads/{campaign_id}/sync-with-icp-routing**
```json
{
  "success": true,
  "distribution": {
    "orthopedics": { "synced": 127, "failed": 0 },
    "physical_therapy": { "synced": 68, "failed": 0 }
  },
  "total_synced": 243,
  "uncategorized": 42
}
```

---

## 🔐 Authentication

### Current Setup
```typescript
// Headers sent with every API request:
{
  'Authorization': `Bearer ${jwtToken}`,
  'X-Tenant-ID': tenantId,
  'Content-Type': 'application/json'
}
```

### If Using Different Auth
Update the headers in `/lib/campaignAPI.ts`:

```typescript
// Example: API Key instead of JWT
headers: {
  'X-API-Key': apiKey,
  'X-Tenant-ID': tenantId,
  'Content-Type': 'application/json'
}
```

---

## 🎨 Color Scheme Updates

The new Campaign Results page uses the updated color scheme:

### Primary Colors
```css
Old: #02a4bf (teal)
New: #2990C6 (blue)
```

### Where to Update in Existing Code

If your existing Campaigns List page still uses old colors:

```tsx
// Old
className="bg-[#02a4bf]"

// New
className="bg-[#2990C6]"
```

**Files that may need updating:**
- `/components/leads/CampaignsListPage.tsx`
- `/components/leads/LeadsDashboardPage.tsx`
- `/components/leads/NewCampaignPage.tsx`

---

## 🧪 Testing Checklist

### Manual Testing Flow

1. **Start from Campaigns List**
   - [ ] Click on a campaign row
   - [ ] Campaign Results page loads
   - [ ] Correct campaign name appears in breadcrumb and title
   - [ ] Stats show correct numbers

2. **Test Smart Sync Modal**
   - [ ] Click "Smart Sync" button
   - [ ] Modal opens
   - [ ] Distribution preview loads
   - [ ] Shows correct ICP categories
   - [ ] "Confirm Smart Sync" button works
   - [ ] Progress bar animates
   - [ ] Success screen shows
   - [ ] Modal closes after 3 seconds

3. **Test Filters**
   - [ ] Search works
   - [ ] ICP Score filter works
   - [ ] Email Status filter works
   - [ ] ICP Category filter works
   - [ ] View toggle (grid/list) works

4. **Test LinkedIn Queue**
   - [ ] Click "Add to Queue" on a company card
   - [ ] LinkedIn Manager panel slides in
   - [ ] Contact appears in queue
   - [ ] Weekly limit updates
   - [ ] Panel closes properly

5. **Test Back Navigation**
   - [ ] Click "Back" button
   - [ ] Returns to Campaigns List
   - [ ] Can navigate to different campaign
   - [ ] New campaign loads correctly

---

## 🐛 Common Issues and Solutions

### Issue 1: Campaign Results Page Not Loading
**Symptom:** White screen or error when clicking campaign

**Solution:**
```typescript
// Check that selectedCampaignId is being set
console.log('Selected Campaign ID:', selectedCampaignId);

// Ensure campaign-results case exists in renderPage()
case 'campaign-results':
  return <CampaignResultsPage ... />;
```

### Issue 2: Mock Data Not Showing
**Symptom:** Empty results grid

**Solution:**
```typescript
// In campaignAPI.ts, check the mock data function
function getMockCampaignResults() {
  // Should return valid data structure
  return { campaign, stats, companies };
}
```

### Issue 3: API Calls Failing
**Symptom:** Toast error "Failed to load campaign results"

**Solution:**
```typescript
// Check network tab for failed requests
// Verify API base URL is correct
// Check authentication headers
// Ensure CORS is enabled on backend
```

### Issue 4: Breadcrumb Shows Wrong Name
**Symptom:** Breadcrumb shows "Loading..." or "Campaign Results"

**Solution:**
```typescript
// Campaign name comes from API response
// Check that campaign.name is in the response:
{
  "campaign": {
    "name": "Your Campaign Name" // This field
  }
}
```

---

## 🔄 WebSocket Integration (Optional)

For real-time sync progress updates:

```typescript
// In SmartSyncModal.tsx

useEffect(() => {
  const ws = new WebSocket(
    `wss://ecco-ai-vis-9wprj.ondigitalocean.app/ws/campaigns/${tenantId}?token=${jwtToken}`
  );

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.event === 'sync_progress') {
      setSyncProgress(data.progress);
      setCurrentCategory(data.current);
    }
    
    if (data.event === 'sync_complete') {
      setSyncResults(data.results);
      setSyncState('complete');
    }
  };

  return () => ws.close();
}, [tenantId, jwtToken]);
```

---

## 📊 Analytics Tracking (Optional)

Add tracking for user actions:

```typescript
// Track when user views campaign results
analytics.track('Campaign Results Viewed', {
  campaignId,
  campaignName: campaign.name,
  totalLeads: stats.total_leads
});

// Track when user syncs with Smart Sync
analytics.track('Smart Sync Completed', {
  campaignId,
  categoriesCount: Object.keys(distribution.categorized).length,
  totalSynced: syncResults.total_synced
});

// Track when user adds to LinkedIn queue
analytics.track('LinkedIn Queue Added', {
  campaignId,
  contactsCount: contactsToQueue.length
});
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `tenantId` and `jwtToken` with real values
- [ ] Test all API endpoints are working
- [ ] Verify MailerLite connections are configured
- [ ] Test ICP distribution with real data
- [ ] Ensure error handling works properly
- [ ] Check loading states display correctly
- [ ] Verify breadcrumb navigation
- [ ] Test back button functionality
- [ ] Confirm toast notifications appear
- [ ] Validate all filters work with real data
- [ ] Test export functionality (CSV, Excel, Sheets)
- [ ] Verify LinkedIn queue integration
- [ ] Check responsive design on mobile
- [ ] Test with different user roles/permissions
- [ ] Verify WebSocket connections (if enabled)
- [ ] Add analytics tracking (if applicable)

---

## 📝 Notes for Backend Team

### Expected API Behavior

1. **GET /api/leads/campaigns/{campaign_id}**
   - Should return campaign details, stats, and all companies
   - Include ICP scores and categories for each company
   - Include all contacts with email/LinkedIn status

2. **POST /api/publish/leads/{campaign_id}/preview-icp-distribution**
   - Should analyze companies and categorize by ICP
   - Return list IDs and names from MailerLite
   - Calculate average confidence scores
   - Identify uncategorized companies with reasons

3. **POST /api/publish/leads/{campaign_id}/sync-with-icp-routing**
   - Should sync contacts to appropriate MailerLite lists
   - Support progress updates via WebSocket (optional)
   - Return detailed results per category
   - Handle partial failures gracefully

4. **POST /api/linkedin/connections/queue**
   - Should add contacts to LinkedIn connection queue
   - Respect weekly limits
   - Schedule connection requests
   - Return updated queue status

---

## ✅ Integration Complete!

Your Campaign Results page is now ready to integrate with your existing Campaigns List page and backend API. All components are built with proper error handling, loading states, and fallback to mock data for development.

**Next Steps:**
1. Update CampaignsListPage to call `onSelectCampaign`
2. Replace demo credentials with real tenant ID and JWT
3. Test the full flow from campaigns list to results page
4. Verify API endpoints match expected format
5. Deploy and monitor! 🚀
