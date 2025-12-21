# Campaign Results - Architecture Diagram

## 🏗️ Component Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                         App.tsx (Root)                              │
│  - Manages currentPage state                                        │
│  - Manages selectedCampaignId state                                 │
│  - Passes tenantId, jwtToken to all pages                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
         ┌──────────▼──────────┐      ┌────────────▼─────────────┐
         │  Campaigns List     │      │  Campaign Results Page   │
         │  Page               │      │  (Detail Page)           │
         │                     │      │                          │
         │ - Shows all         │      │ - Shows one campaign     │
         │   campaigns         │      │ - Has Back button        │
         │ - Click row →       │─────→│ - Breadcrumb nav         │
         │   sets campaign ID  │      │ - Not in sidebar         │
         │   & navigates       │      │                          │
         └─────────────────────┘      └──────────┬───────────────┘
                                                  │
                     ┌────────────────────────────┼────────────────────────────┐
                     │                            │                            │
         ┌───────────▼──────────┐    ┌───────────▼──────────┐    ┌────────────▼──────────┐
         │  campaignAPI.ts      │    │  StatsBar.tsx        │    │  ActionBar.tsx        │
         │  (API Integration)   │    │  (4 Metrics)         │    │  (Bulk Actions)       │
         │                      │    │                      │    │                       │
         │ - loadCampaignResults│    │ [247] [218] [175] [0]│    │ [Smart Sync★]         │
         │ - previewDistribution│    │                      │    │ [LinkedIn] [Export]   │
         │ - syncWithICPRouting │    │ Triggers Smart Sync→ │    │                       │
         │ - addToLinkedInQueue │    └──────────────────────┘    └───────────────────────┘
         │ - Mock data fallback │
         └──────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
┌───▼────────┐  ┌───▼────────┐  ┌───▼────────┐
│ GET        │  │ POST       │  │ POST       │
│ /campaigns │  │ /preview-  │  │ /sync-with │
│ /{id}      │  │ distribution│  │ -icp-routing│
└────────────┘  └────────────┘  └────────────┘
```

---

## 📦 Component Hierarchy

```
CampaignResultsPage.tsx (Main Container)
│
├── Breadcrumb & Back Button
│   └── Dashboard > Leads > Campaigns > [Campaign Name]
│
├── Page Title
│   └── "Campaign Results: [Campaign Name]"
│
├── StatsBar.tsx
│   ├── Total Leads Card
│   ├── Enriched Card
│   ├── ICP Match Card
│   └── Email Status Card (with Sync Now button)
│
├── ActionBar.tsx
│   ├── Left: "Viewing X companies, Y contacts"
│   └── Right:
│       ├── Smart Sync Button (opens modal)
│       ├── Add to LinkedIn Queue Button (opens panel)
│       └── Export Dropdown (CSV/Excel/Sheets)
│
├── FilterBar.tsx
│   ├── Search Input
│   ├── ICP Score Dropdown
│   ├── Email Status Dropdown
│   ├── ICP Category Dropdown
│   └── View Toggle (Grid/List)
│
├── Results Grid (3 columns)
│   └── CompanyCard.tsx (repeated)
│       ├── Header (checkbox, logo, name, ICP score badge)
│       ├── Info (industry, location, website)
│       ├── ICP Category Badge
│       ├── Contacts Section
│       │   └── Contact rows (avatar, name, title, icons)
│       ├── Email Provider Status
│       └── Action Buttons (Enrich, View, Add to Queue)
│
├── SmartSyncModal.tsx (Conditional - when user clicks Smart Sync)
│   ├── Header (title, subtitle, close X)
│   ├── Step 1: Connection Selector
│   ├── Step 2: ICP Distribution Preview
│   │   ├── Distribution Table
│   │   │   ├── Orthopedics row
│   │   │   ├── Physical Therapy row
│   │   │   ├── Chiropractic row
│   │   │   ├── Podiatry row
│   │   │   └── Uncategorized row (warning)
│   │   └── Info Cards
│   │       ├── Ready to Sync (green)
│   │       └── Needs Review (orange)
│   ├── Step 3: Sync Options (checkboxes)
│   └── Footer (Cancel, Preview, Confirm buttons)
│
└── LinkedInManagerPanel.tsx (Conditional - slides from right)
    ├── Panel Header (title, close X)
    ├── Tabs (Connection Queue, DM Queue)
    ├── Filter Bar (status dropdown, search)
    ├── Contact Cards (scrollable)
    │   └── Contact card (avatar, name, status, actions)
    └── Footer Stats (weekly limit progress bar)
```

---

## 🔄 Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Action    │
└──────┬──────┘
       │
       │ 1. Click campaign from list
       ▼
┌─────────────────────┐
│  App.tsx            │
│  selectedCampaignId │──────┐
│  = 'camp_123'       │      │
└─────────────────────┘      │
       │                      │
       │ 2. Navigate to       │ 3. Pass campaign ID
       │    'campaign-results'│    as prop
       ▼                      │
┌─────────────────────┐      │
│ CampaignResultsPage │◄─────┘
└──────┬──────────────┘
       │
       │ 4. useEffect: Load data
       ▼
┌─────────────────────┐
│  campaignAPI.ts     │
│  loadCampaignResults│
└──────┬──────────────┘
       │
       │ 5. GET /api/leads/campaigns/{id}
       ▼
┌─────────────────────┐
│   Backend API       │
│   (or mock data)    │
└──────┬──────────────┘
       │
       │ 6. Return campaign data
       ▼
┌─────────────────────┐
│ CampaignResultsPage │
│ - setCampaign()     │
│ - setCompanies()    │
│ - setStats()        │
└──────┬──────────────┘
       │
       │ 7. Render components
       ▼
┌─────────────────────┐
│  UI Components      │
│  - StatsBar         │
│  - ActionBar        │
│  - FilterBar        │
│  - CompanyCards     │
└─────────────────────┘
```

---

## 🎯 Smart Sync Flow

```
User clicks "Smart Sync" button
         │
         ▼
┌──────────────────────┐
│ SmartSyncModal opens │
│ syncState = 'setup'  │
└──────┬───────────────┘
       │
       │ useEffect: Load preview
       ▼
┌──────────────────────────┐
│ previewICPDistribution() │
└──────┬───────────────────┘
       │
       │ POST /api/.../preview-icp-distribution
       ▼
┌──────────────────────────┐
│ Backend analyzes leads   │
│ - Groups by ICP category │
│ - Calculates confidence  │
│ - Matches to lists       │
└──────┬───────────────────┘
       │
       │ Returns distribution
       ▼
┌──────────────────────────┐
│ Modal shows preview      │
│ - Distribution table     │
│ - Ready to Sync card     │
│ - Needs Review card      │
└──────┬───────────────────┘
       │
       │ User clicks "Confirm Smart Sync"
       ▼
┌──────────────────────────┐
│ syncState = 'syncing'    │
│ Progress bar animates    │
└──────┬───────────────────┘
       │
       │ POST /api/.../sync-with-icp-routing
       ▼
┌──────────────────────────┐
│ Backend syncs to lists   │
│ - Orthopedics → List A   │
│ - PT → List B            │
│ - Chiro → List C         │
│ - Podiatry → List D      │
└──────┬───────────────────┘
       │
       │ Returns results
       ▼
┌──────────────────────────┐
│ syncState = 'complete'   │
│ Success screen shows     │
│ ✓ 127 to Orthopedics     │
│ ✓ 68 to PT               │
│ ✓ 34 to Chiro            │
│ ✓ 14 to Podiatry         │
└──────┬───────────────────┘
       │
       │ Auto-close after 3s
       ▼
┌──────────────────────────┐
│ Back to results page     │
│ Companies show as synced │
└──────────────────────────┘
```

---

## 🔍 Filter Flow

```
User types in search or changes filter
         │
         ▼
┌────────────────────────┐
│ onSearchChange() or    │
│ onICPScoreFilter() etc │
└────────┬───────────────┘
         │
         │ Updates state
         ▼
┌────────────────────────┐
│ searchQuery = "ortho"  │
│ icpScoreFilter = "high"│
└────────┬───────────────┘
         │
         │ useEffect triggers
         ▼
┌────────────────────────┐
│ applyFilters()         │
│ - Filter by search     │
│ - Filter by ICP score  │
│ - Filter by email      │
│ - Filter by category   │
└────────┬───────────────┘
         │
         │ Updates filtered array
         ▼
┌────────────────────────┐
│ setFilteredCompanies() │
└────────┬───────────────┘
         │
         │ Re-render
         ▼
┌────────────────────────┐
│ Grid shows only        │
│ matching companies     │
└────────────────────────┘
```

---

## 💾 State Management

```
┌──────────────────────────────────────────┐
│          App.tsx (Global State)          │
├──────────────────────────────────────────┤
│ currentPage: string                      │
│ selectedCampaignId: string | null        │
│ tenantId: string                         │
│ jwtToken: string                         │
└──────────────────────────────────────────┘
                  │
                  │ Passed as props
                  ▼
┌──────────────────────────────────────────┐
│    CampaignResultsPage (Local State)     │
├──────────────────────────────────────────┤
│ campaign: object                         │
│ companies: array                         │
│ filteredCompanies: array                 │
│ stats: object                            │
│ isLoading: boolean                       │
│ selectedCompanies: Set<string>           │
│ viewMode: 'grid' | 'list'                │
│ showSmartSync: boolean                   │
│ showLinkedInPanel: boolean               │
│ linkedInQueue: array                     │
│ searchQuery: string                      │
│ icpScoreFilter: string                   │
│ emailStatusFilter: string                │
│ icpCategoryFilter: string                │
└──────────────────────────────────────────┘
                  │
       ┌──────────┼──────────┐
       │          │          │
       ▼          ▼          ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│SmartSync   │ │LinkedIn    │ │FilterBar   │
│Modal       │ │Panel       │ │            │
├────────────┤ ├────────────┤ ├────────────┤
│distribution│ │queuedCont  │ │Controlled  │
│syncState   │ │acts        │ │inputs      │
│syncProgress│ │activeTab   │ │            │
│syncResults │ │statusFilter│ │            │
└────────────┘ └────────────┘ └────────────┘
```

---

## 📡 API Call Sequence

```
Page Load
    ↓
┌───────────────────────────────────────┐
│ 1. GET /api/leads/campaigns/{id}      │
│    → Returns: campaign, stats,        │
│      companies with ICP categories    │
└───────────────────────────────────────┘
    ↓
User clicks "Smart Sync"
    ↓
┌───────────────────────────────────────┐
│ 2. POST /api/publish/leads/{id}/      │
│         preview-icp-distribution      │
│    → Returns: categorized,            │
│      uncategorized with list mappings │
└───────────────────────────────────────┘
    ↓
User clicks "Confirm Smart Sync"
    ↓
┌───────────────────────────────────────┐
│ 3. POST /api/publish/leads/{id}/      │
│         sync-with-icp-routing         │
│    → Returns: sync results per        │
│      category, total synced           │
└───────────────────────────────────────┘
    ↓
User clicks "Add to Queue"
    ↓
┌───────────────────────────────────────┐
│ 4. POST /api/linkedin/connections/    │
│         queue                          │
│    → Returns: queue confirmation      │
└───────────────────────────────────────┘
```

---

## 🎨 CSS/Tailwind Class Structure

```
Page Container
└── className="min-h-screen bg-[#f5f7fa]"
    └── Max width container
        └── className="max-w-[1440px] mx-auto px-6 py-6"
            │
            ├── Breadcrumb
            │   └── className="text-[#6b7280]" (gray)
            │
            ├── Page Title
            │   └── Poppins Bold 28px
            │
            ├── White Cards (stats, action, filter bars)
            │   └── className="bg-white rounded-xl p-4 mb-4"
            │
            └── Company Cards Grid
                └── className="grid grid-cols-3 gap-5"
                    └── className="bg-white rounded-2xl p-5"
                        │
                        ├── ICP Score Badge
                        │   ├── High: bg-[#d1fae5] text-[#10b981]
                        │   ├── Med: bg-[#fef3c7] text-[#fbbf24]
                        │   └── Low: bg-[#fee2e2] text-[#ef4444]
                        │
                        ├── ICP Category Badge
                        │   ├── Orthopedics: bg-[#e0f2f7] text-[#2990C6]
                        │   ├── PT: bg-[#dbeafe] text-[#3b82f6]
                        │   ├── Chiro: bg-[#e9d5ff] text-[#a855f7]
                        │   ├── Podiatry: bg-[#d1fae5] text-[#10b981]
                        │   └── Uncat: bg-[#f3f4f6] text-[#6b7280]
                        │
                        └── Action Buttons
                            ├── Primary: bg-[#2990C6] (blue)
                            ├── Success: bg-[#10b981] (green)
                            ├── Warning: border-[#f59e0b] (orange)
                            └── Gray: border-[#d1d5db]
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│   App.tsx   │
│             │
│ tenantId    │──────┐
│ jwtToken    │      │
└─────────────┘      │
                     │ Passed as props
                     │
                     ▼
┌─────────────────────────┐
│ CampaignResultsPage     │
└────────┬────────────────┘
         │
         │ Calls API functions
         ▼
┌─────────────────────────┐
│ campaignAPI.ts          │
│                         │
│ Every API call includes:│
│ - Authorization: Bearer │
│   {jwtToken}            │
│ - X-Tenant-ID:         │
│   {tenantId}            │
└─────────────────────────┘
         │
         │ HTTPS Request
         ▼
┌─────────────────────────┐
│ Backend API             │
│ ecco-ai-vis-9wprj       │
│ .ondigitalocean.app     │
└─────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Desktop (1440px+)
├── 3-column grid for company cards
├── Full action bar visible
├── All filters in single row
└── Side panels slide over content

Tablet (768px - 1439px)
├── 2-column grid for company cards
├── Action bar stacks on smaller screens
├── Filters may wrap
└── Side panels full width

Mobile (< 768px)
├── 1-column grid for company cards
├── Action buttons stack vertically
├── Filters stack vertically
└── Side panels take full screen
```

---

## 🎯 Component Responsibilities

```
┌──────────────────────────────────────────────────┐
│ CampaignResultsPage                              │
│ ✓ Data fetching                                  │
│ ✓ State management                               │
│ ✓ Filter logic                                   │
│ ✓ Navigation handling                            │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ SmartSyncModal                                   │
│ ✓ ICP distribution preview                       │
│ ✓ Sync confirmation                              │
│ ✓ Progress tracking                              │
│ ✓ Success/error handling                         │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ LinkedInManagerPanel                             │
│ ✓ Queue management                               │
│ ✓ Contact status tracking                        │
│ ✓ Weekly limit display                           │
│ ✓ Connection actions                             │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ CompanyCard                                      │
│ ✓ Company display                                │
│ ✓ Contact list                                   │
│ ✓ ICP badges                                     │
│ ✓ Action buttons                                 │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ campaignAPI.ts                                   │
│ ✓ API integration                                │
│ ✓ Mock data fallback                             │
│ ✓ Error handling                                 │
│ ✓ Type definitions                               │
└──────────────────────────────────────────────────┘
```

---

## ✅ Architecture Highlights

✅ **Separation of Concerns** - Each component has single responsibility
✅ **Centralized API Logic** - All API calls in campaignAPI.ts
✅ **Prop Drilling Minimized** - State lifted only where needed
✅ **Graceful Degradation** - Mock data fallback for development
✅ **Type Safety** - TypeScript interfaces throughout
✅ **Responsive Design** - Mobile-first with breakpoints
✅ **Accessibility** - Semantic HTML, ARIA labels
✅ **Performance** - Filtered results cached, lazy rendering

---

*This architecture supports the complete Campaign Results feature with Smart Sync!* 🚀
