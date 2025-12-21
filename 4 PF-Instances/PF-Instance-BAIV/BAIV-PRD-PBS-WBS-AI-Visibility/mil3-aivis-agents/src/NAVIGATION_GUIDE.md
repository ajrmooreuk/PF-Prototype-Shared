# Campaign Results Navigation Guide

## 📍 How to Access Campaign Results Page

### Current Setup (Demo Mode)
The app is currently set to load the Campaign Results page directly for demonstration purposes:

```typescript
// In App.tsx, line 89:
const [currentPage, setCurrentPage] = useState('campaign-results');
```

### Production Navigation Flow

In production, users will navigate to Campaign Results through this flow:

```
1. Dashboard (Home)
   ↓
2. Sidebar: Click "Leads" section
   ↓
3. Click "Campaigns" in sidebar
   ↓
4. View Campaigns List page (shows all campaigns)
   ↓
5. Click on a specific campaign row (e.g., "Podiatry Clinics Q1 2025")
   ↓
6. Campaign Results page opens (with that campaign's data)
```

---

## 🗺️ Navigation Structure

### Sidebar Navigation (Always Visible)
```
📊 Dashboard
🔍 Discovery Audit
📝 Content Studio
   ├── Blog Creator
   ├── FAQ Generator
   ├── Meta Generator
   ├── Schema Generator
   ├── Link Suggester
   └── Image Generator
📱 Social Media
   ├── Post Creator
   ├── Social Listening
   ├── Publishing Calendar
   └── Ideas Library
👥 Leads
   ├── Dashboard          ← Overview stats
   ├── Campaigns          ← List of all campaigns
   ├── New Campaign       ← Create new campaign
   └── DM Manager         ← LinkedIn messaging
🎙️ Podcasts
🌟 Brand Ambassadors
📈 PMF Insights
⚙️ Settings
```

### Detail Pages (NOT in Sidebar)
These pages are accessed by clicking items from list pages:

```
Campaign Results          ← Click campaign from Campaigns list
├── Breadcrumb: Dashboard > Leads > Campaigns > [Campaign Name]
├── Back button to Campaigns list
└── Full campaign details with Smart Sync

Survey Details           ← Click survey from PMF Surveys list
Interview Details        ← Click interview from Interviews list
```

---

## 🎯 Campaign Results Page Access Points

### Method 1: From Campaigns List (Primary)
```tsx
// In CampaignsListPage component
<Button onClick={() => {
  setSelectedCampaignId('camp_123');
  onNavigate('campaign-results');
}}>
  View Results
</Button>
```

### Method 2: From Leads Dashboard (Quick Access)
```tsx
// In LeadsDashboardPage component
<RecentCampaignsCard
  campaigns={[...]}
  onViewCampaign={(campaignId) => {
    setSelectedCampaignId(campaignId);
    onNavigate('campaign-results');
  }}
/>
```

### Method 3: Direct URL (Future Enhancement)
```
/leads/campaigns/camp_123
```

---

## 🔄 State Management

### Required State in App.tsx
```typescript
const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

// When navigating to campaign results:
setSelectedCampaignId('camp_123');
setCurrentPage('campaign-results');

// Campaign Results component receives:
<CampaignResultsPage 
  campaignId={selectedCampaignId || 'camp_123'} 
  tenantId={tenantId} 
  jwtToken={jwtToken}
  onNavigate={setCurrentPage}
/>
```

---

## 🧭 Breadcrumb Logic

### Current Page: Campaign Results
```
Dashboard > Leads > Campaigns > Podiatry Clinics Q1 2025
```

### Implementation
```tsx
<div className="text-[#6b7280]">
  Dashboard {'>'} Leads {'>'} Campaigns {'>'} {campaign?.name || 'Campaign Results'}
</div>
```

The breadcrumb shows:
- **Dashboard** - Home page
- **Leads** - Main leads section
- **Campaigns** - Campaigns list page
- **Campaign Name** - Current campaign (dynamically loaded from API)

---

## ⬅️ Back Button Behavior

### Current Implementation
```tsx
{onNavigate && (
  <Button
    variant="ghost"
    size="sm"
    onClick={() => onNavigate('campaigns-list')}
  >
    <ArrowLeft className="w-4 h-4 mr-1" />
    Back
  </Button>
)}
```

**Behavior:**
- Clicking "Back" returns to Campaigns List page
- Campaign selection is preserved in App state
- User can navigate back to view other campaigns

---

## 🎨 Visual Hierarchy

### Navigation Context
```
Sidebar (Left)          Page Content (Center)         
┌─────────────────┐    ┌────────────────────────────┐
│ Leads           │    │ Back | Breadcrumb          │
│   Dashboard     │    │                             │
│ ▶ Campaigns  ◀──┼────┤ Campaign Results: ...       │
│   New Campaign  │    │                             │
│   DM Manager    │    │ Stats | Actions | Filters   │
└─────────────────┘    │                             │
                       │ [Company Cards Grid]        │
                       └────────────────────────────┘
```

The "Campaigns" item in the sidebar stays highlighted when viewing Campaign Results, indicating the user is in that section.

---

## 🚀 To Test Navigation

### Demo Mode (Current)
1. Open app - Campaign Results page loads automatically
2. Click "Back" button → Goes to Campaigns List
3. Click "Campaigns" in sidebar → Goes to Campaigns List

### To Change Default Page
```typescript
// In App.tsx, change line 89 to:
const [currentPage, setCurrentPage] = useState('dashboard');
// or
const [currentPage, setCurrentPage] = useState('campaigns-list');
```

---

## 📋 Implementation Checklist

✅ Campaign Results page component created
✅ Breadcrumb navigation implemented
✅ Back button to Campaigns list
✅ `onNavigate` prop integration
✅ `selectedCampaignId` state management
✅ Campaign name displayed in breadcrumb (from API)
✅ Page not in sidebar (detail page pattern)
✅ Proper TypeScript types for navigation

---

## 🔮 Future Enhancements

### URL-Based Routing
```typescript
// Example with React Router
<Route path="/leads/campaigns/:campaignId" element={<CampaignResultsPage />} />

// Access campaign ID from URL:
const { campaignId } = useParams();
```

### Browser Back Button Support
```typescript
// Use browser history API
window.addEventListener('popstate', (event) => {
  // Handle back button
});
```

### Deep Linking
```
Share link: https://app.baiv.com/leads/campaigns/camp_123
Users can bookmark specific campaigns
```

---

## 💡 Tips

1. **Always Pass Campaign ID**: When navigating to campaign-results, set `selectedCampaignId` first
2. **Loading States**: Campaign Results page shows loading spinner while fetching data
3. **Error Handling**: If campaign not found, shows error toast and redirects to campaigns list
4. **Navigation Prop**: Always pass `onNavigate` to allow back navigation

---

**Navigation is now fully configured and working!** 🎉
