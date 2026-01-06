# Mil3-AIVis-Agents: Complete Artifact Mapping & Reference Guide

**Project:** BAIV Dashboard (BeAIVisible)  
**Version:** 0.1.0  
**Total Artifacts:** 250+ files  
**Last Updated:** 2025-12-09

This document provides a complete mapping of every artifact in the repository to its location, purpose, dependencies, and related documentation.

---

## Table of Contents

1. [Configuration Files](#configuration-files)
2. [Documentation Files](#documentation-files)
3. [Source Code Structure](#source-code-structure)
4. [Component Registry](#component-registry)
5. [API Layer Registry](#api-layer-registry)
6. [UI Component Library](#ui-component-library)
7. [Utility Functions](#utility-functions)
8. [Asset Registry](#asset-registry)

---

## Configuration Files

### Root Configuration Files

**`./package.json`**
- **Purpose:** Project dependencies, scripts, and metadata
- **Type:** npm configuration
- **Key Contents:**
  - Project name: "BAIV Dashboard"
  - Version: 0.1.0
  - Dependencies: React, Vite, TypeScript, Radix UI, Supabase, etc.
  - Scripts: `dev`, `build`
- **Related Docs:** None
- **Used By:** npm/yarn package managers, Vite build system

**`./vite.config.ts`**
- **Purpose:** Vite build tool configuration
- **Type:** TypeScript configuration
- **Key Contents:**
  - React plugin with SWC
  - Build optimizations
  - Dev server settings
- **Related Docs:** None
- **Used By:** Vite build tool

**`./index.html`**
- **Purpose:** Application entry HTML file
- **Type:** HTML
- **Key Contents:**
  - Root div element (`<div id="root">`)
  - Script tag loading `src/main.tsx`
  - Meta tags for responsive design
- **Related Docs:** None
- **Used By:** Browser, Vite

**`./readme.md`**
- **Purpose:** Basic project README
- **Type:** Markdown documentation
- **Key Contents:** "uplod milanasa files to here."
- **Related Docs:** All ARCHITECTURE_*.md files
- **Used By:** GitHub, developers

---

## Documentation Files

### Architecture Documentation

**`./ARCHITECTURE_VISUAL_GUIDE.md`**
- **Location:** Root directory
- **Purpose:** Visual architecture guide with mermaid diagrams
- **Lines:** 1,042
- **Sections:**
  - System Overview
  - Technology Stack
  - Application Architecture
  - Component Hierarchy
  - Feature Modules (6 major features)
  - Data Flow
  - Authentication Flow
  - API Integration
  - Directory Structure
- **Created:** 2025-12-09
- **Related Files:** ARCHITECTURE_EXPANDED_GUIDE.md, ARCHITECTURE_DIAGRAM.md

**`./ARCHITECTURE_EXPANDED_GUIDE.md`**
- **Location:** Root directory
- **Purpose:** Comprehensive architecture with detailed explanations and UI/UX documentation
- **Lines:** 2,619
- **Sections:**
  - Part 1: Architecture Deep Dive (detailed explanations)
  - Part 2: UI/UX Documentation (complete screen layouts, flows)
  - Part 3: Technical Reference (directory, state, performance)
- **Created:** 2025-12-09
- **Related Files:** ARCHITECTURE_VISUAL_GUIDE.md

### Authentication Documentation

**`./src/AUTHENTICATION.md`**
- **Location:** src/
- **Purpose:** Authentication implementation details
- **Related Components:** 
  - src/components/auth/LoginPage.tsx
  - src/components/auth/AuthContext.tsx
  - src/components/auth/ProtectedRoute.tsx
- **Related Files:** 
  - AUTH_FLOW_DIAGRAM.md
  - AUTH_QUICK_REFERENCE.md
  - AUTH_EVENTS_QUICK_REFERENCE.md
  - AUTHENTICATION_SETUP.md
  - JWT_AUTO_REFRESH_IMPLEMENTATION.md

**`./src/AUTH_FLOW_DIAGRAM.md`**
- **Location:** src/
- **Purpose:** Detailed authentication flow diagrams
- **Contains:** Sequence diagrams, state transitions
- **Related Files:** AUTHENTICATION.md

**`./src/AUTH_QUICK_REFERENCE.md`**
- **Location:** src/
- **Purpose:** Quick reference for auth implementation
- **Related Files:** AUTHENTICATION.md

**`./src/AUTH_EVENTS_QUICK_REFERENCE.md`**
- **Location:** src/
- **Purpose:** Authentication event handlers reference
- **Key Events:** SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT
- **Related Files:** AUTHENTICATION.md

**`./src/AUTHENTICATION_SETUP.md`**
- **Location:** src/
- **Purpose:** Setup instructions for authentication
- **Related Files:** AUTHENTICATION.md

**`./src/JWT_AUTO_REFRESH_IMPLEMENTATION.md`**
- **Location:** src/
- **Purpose:** JWT token auto-refresh implementation details
- **Related Components:** src/App.tsx
- **Related Files:** AUTHENTICATION.md

### API Integration Documentation

**`./src/API_INTEGRATION_STATUS.md`**
- **Location:** src/
- **Purpose:** Current status of API integrations
- **Related Files:**
  - API_INTEGRATION_V2_STATUS.md
  - API_INTEGRATION_COMPLETE.md
  - ECCO_CLIENT_DASHBOARD_API_CONFIG_V2.md

**`./src/API_INTEGRATION_V2_STATUS.md`**
- **Location:** src/
- **Purpose:** Version 2 API integration status
- **Related Files:** API_INTEGRATION_STATUS.md

**`./src/API_INTEGRATION_COMPLETE.md`**
- **Location:** src/
- **Purpose:** Completed API integration documentation
- **Related Files:** API_INTEGRATION_STATUS.md

**`./src/ECCO_CLIENT_DASHBOARD_API_CONFIG_V2.md`**
- **Location:** src/
- **Purpose:** ECCO API configuration for v2
- **Related Components:** src/lib/eccoAPI.ts
- **Related Files:** API_INTEGRATION_STATUS.md

**`./src/404_ENDPOINT_ANALYSIS.md`**
- **Location:** src/
- **Purpose:** Analysis of 404 endpoint errors
- **Related Files:** API_INTEGRATION_STATUS.md

### Feature Documentation

**`./src/CAMPAIGN_RESULTS_SUMMARY.md`**
- **Location:** src/
- **Purpose:** Campaign results feature documentation
- **Related Components:**
  - src/components/campaign-results/CampaignResultsPage.tsx
  - src/components/leads/results/CampaignResultsPage.tsx
- **Related Files:** ARCHITECTURE_DIAGRAM.md

**`./src/PODCAST_FEATURE_SUMMARY.md`**
- **Location:** src/
- **Purpose:** Podcast feature documentation
- **Related Components:** src/components/podcasts/*.tsx
- **Related Files:**
  - src/components/podcasts/README.md
  - src/components/podcasts/FILE_STRUCTURE.md

**`./src/ARCHITECTURE_DIAGRAM.md`**
- **Location:** src/
- **Purpose:** Campaign results architecture diagrams
- **Contains:** ASCII art diagrams
- **Related Files:** ARCHITECTURE_VISUAL_GUIDE.md

### Implementation Documentation

**`./src/IMPLEMENTATION_SUMMARY.md`**
- **Location:** src/
- **Purpose:** General implementation notes
- **Related Files:** Various feature docs

**`./src/IMPORT_ERRORS_FIXED.md`**
- **Location:** src/
- **Purpose:** Fixed import error documentation
- **Related Files:** IMPLEMENTATION_SUMMARY.md

**`./src/CLEANUP_COMPLETE.md`**
- **Location:** src/
- **Purpose:** Code cleanup completion notes
- **Related Files:** IMPLEMENTATION_SUMMARY.md

**`./src/FINAL_STATUS.md`**
- **Location:** src/
- **Purpose:** Final status report
- **Related Files:** IMPLEMENTATION_SUMMARY.md

**`./src/SESSION_SUMMARY.md`**
- **Location:** src/
- **Purpose:** Session summary notes
- **Related Files:** IMPLEMENTATION_SUMMARY.md

**`./src/V2_UPGRADE_SUMMARY.md`**
- **Location:** src/
- **Purpose:** Version 2 upgrade summary
- **Related Files:** API_INTEGRATION_V2_STATUS.md

### Deployment & Operations Documentation

**`./src/DEPLOYMENT_GUIDE.md`**
- **Location:** src/
- **Purpose:** Deployment instructions
- **Related Files:** PRODUCTION_READY.md

**`./src/PRODUCTION_READY.md`**
- **Location:** src/
- **Purpose:** Production readiness checklist
- **Related Files:** DEPLOYMENT_GUIDE.md

**`./src/QUICK_START.md`**
- **Location:** src/
- **Purpose:** Quick start guide for developers
- **Related Files:** DEPLOYMENT_GUIDE.md

**`./src/NAVIGATION_GUIDE.md`**
- **Location:** src/
- **Purpose:** Navigation structure documentation
- **Related Components:** src/components/LeftNavigation.tsx
- **Related Files:** ARCHITECTURE_VISUAL_GUIDE.md

### Integration & Cleanup Documentation

**`./src/ICP_INTEGRATION_SUMMARY.md`**
- **Location:** src/
- **Purpose:** ICP integration summary
- **Related Components:** src/lib/icpAPI.ts, src/components/icp/
- **Related Files:** ICP_API_CLEANUP.md

**`./src/ICP_API_CLEANUP.md`**
- **Location:** src/
- **Purpose:** ICP API cleanup notes
- **Related Files:** ICP_INTEGRATION_SUMMARY.md

**`./src/GOOGLE_DRIVE_API_CLEANUP.md`**
- **Location:** src/
- **Purpose:** Google Drive API cleanup notes
- **Related Components:** src/lib/googleDriveAPI.ts
- **Related Files:** API_INTEGRATION_STATUS.md

**`./src/INTEGRATION_NOTES.md`**
- **Location:** src/
- **Purpose:** General integration notes
- **Related Files:** API_INTEGRATION_STATUS.md

### Style Documentation

**`./src/update-colors.md`**
- **Location:** src/
- **Purpose:** Color update documentation
- **Related Files:** src/index.css

**`./src/COLOR_UPDATE_SCRIPT.txt`**
- **Location:** src/
- **Purpose:** Script for updating colors
- **Related Files:** update-colors.md

**`./src/Attributions.md`**
- **Location:** src/
- **Purpose:** Third-party attributions
- **Related Files:** None

### Development Guidelines

**`./src/guidelines/Guidelines.md`**
- **Location:** src/guidelines/
- **Purpose:** Development guidelines and best practices
- **Related Files:** All architecture docs

---

## Source Code Structure

### Entry Points

**`./src/main.tsx`**
- **Purpose:** React application entry point
- **Type:** TypeScript/React
- **Key Functions:**
  - Initializes React root
  - Mounts App component
  - Imports global styles
- **Dependencies:**
  - react-dom/client
  - App.tsx
  - index.css
- **Called By:** index.html via Vite
- **Calls:** createRoot(), render()

**`./src/App.tsx`**
- **Purpose:** Root application component and authentication gateway
- **Type:** TypeScript/React Component
- **Key Functions:**
  - Authentication state management
  - Session validation
  - JWT token handling
  - Conditional rendering (LoginPage vs AppContent)
- **Dependencies:**
  - components/LoginPage
  - components/AppContent
  - components/ui/sonner (Toaster)
  - lib/supabase
- **State:**
  - isAuthenticated: boolean
  - isLoading: boolean
- **Effects:**
  - On mount: Check auth status
  - Auth state listener: Handle auth events
- **Related Docs:** AUTHENTICATION.md, AUTH_FLOW_DIAGRAM.md

### Global Styles

**`./src/index.css`**
- **Purpose:** Global styles including Tailwind CSS
- **Type:** CSS
- **Key Contents:**
  - Tailwind directives (@tailwind)
  - Global resets
  - Custom CSS variables
  - Component-specific overrides
- **Size:** 144KB
- **Used By:** main.tsx
- **Related Files:** styles/globals.css, update-colors.md

**`./src/styles/globals.css`**
- **Purpose:** Additional global styles
- **Type:** CSS
- **Used By:** index.css or components
- **Related Files:** index.css

---

## Component Registry

### Layout Components

**`./src/components/AppContent.tsx`**
- **Purpose:** Main application content container with routing
- **Type:** React Component
- **Responsibilities:**
  - Page routing and navigation state
  - Tenant and auth state management
  - Dashboard data fetching
  - Conditional page rendering
- **State:**
  - currentPage: string (dashboard | discovery-audit | leads-dashboard | etc.)
  - selectedCampaignId: string | null
  - selectedSurveyId: string | null
  - tenantId: string | null
  - data: DashboardData | null
- **Dependencies:**
  - AppLayout
  - All page components (50+)
  - lib/eccoAPI
  - lib/supabase
- **Called By:** App.tsx
- **Props:**
  - onLogout?: () => void
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/AppLayout.tsx`**
- **Purpose:** Application layout structure
- **Type:** React Component
- **Responsibilities:**
  - Layout wrapper
  - Left navigation integration
  - Main content area
- **Dependencies:**
  - LeftNavigation
  - Navigation
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/LeftNavigation.tsx`**
- **Purpose:** Left sidebar navigation menu
- **Type:** React Component
- **Responsibilities:**
  - Menu item rendering
  - Section expansion/collapse
  - Active state management
  - User profile display
- **State:**
  - expandedSections: string[]
  - showUserMenu: boolean
- **Menu Structure:**
  - Dashboard
  - Visibility Audit
  - ICP Discovery
  - Content Studio (expandable)
  - Social Media (expandable)
  - Leads (expandable)
  - Podcast System (expandable)
  - Brand Ambassadors (expandable)
  - PMF (expandable)
  - Settings
- **Dependencies:**
  - components/ui/* (Avatar, Icons)
  - Logo image (figma asset)
- **Called By:** AppLayout.tsx
- **Props:**
  - userName: string
  - currentPage?: string
  - onNavigate?: (page: any) => void
  - onLogout?: () => void
- **Related Docs:** NAVIGATION_GUIDE.md

**`./src/components/Navigation.tsx`**
- **Purpose:** Top navigation bar
- **Type:** React Component
- **Called By:** AppLayout.tsx
- **Related Docs:** NAVIGATION_GUIDE.md

### Shared/Common Components

**`./src/components/LoadingOverlay.tsx`**
- **Purpose:** Loading spinner overlay
- **Type:** React Component
- **Used By:** Multiple pages during data loading
- **Related Docs:** None

**`./src/components/EmptyState.tsx`**
- **Purpose:** Empty state placeholder
- **Type:** React Component
- **Used By:** Pages with no data
- **Related Docs:** None

**`./src/components/LoginPage.tsx`**
- **Purpose:** Login page (root level, duplicates auth/LoginPage.tsx)
- **Type:** React Component
- **Note:** May be deprecated in favor of auth/LoginPage.tsx
- **Called By:** App.tsx (possibly)
- **Related Docs:** AUTHENTICATION.md

**`./src/components/GoogleDrivePickerModal.tsx`**
- **Purpose:** Google Drive file picker modal
- **Type:** React Component
- **Dependencies:** lib/googleDriveAPI.ts
- **Used By:** Various pages for file import
- **Related Docs:** GOOGLE_DRIVE_API_CLEANUP.md

**`./src/components/CircularGauge.tsx`**
- **Purpose:** Circular gauge visualization component
- **Type:** React Component
- **Used By:** Dashboard, audit pages
- **Related Docs:** None

### Dashboard Components

**`./src/components/MetricsRow.tsx`**
- **Purpose:** Dashboard metrics display (4 metric cards)
- **Type:** React Component
- **Displays:**
  - Total Leads
  - Social Alerts
  - Content Gaps
  - Leads Trend
- **Used By:** Dashboard page (AppContent.tsx)
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/PlatformCitationChart.tsx`**
- **Purpose:** Platform citation rate chart
- **Type:** React Component
- **Chart Library:** Recharts
- **Displays:** Citation rates for ChatGPT, Claude, Perplexity, Gemini
- **Used By:** Dashboard page
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/ActivityFeed.tsx`**
- **Purpose:** Recent activity feed
- **Type:** React Component
- **Used By:** Dashboard page
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/TopOpportunities.tsx`**
- **Purpose:** Top opportunities list
- **Type:** React Component
- **Used By:** Dashboard page
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/QuickActions.tsx`**
- **Purpose:** Quick action buttons
- **Type:** React Component
- **Used By:** Dashboard page
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/DiscoveryAuditPage.tsx`**
- **Purpose:** Discovery audit page
- **Type:** React Page Component
- **Dependencies:** components/audit/*
- **Used By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

### AICoach Component

**`./src/components/AICoach.tsx`**
- **Purpose:** AI assistant widget
- **Type:** React Component
- **Used By:** Various pages
- **Related Docs:** None

---

## Component Registry: Feature Modules

### Authentication Module

**`./src/components/auth/LoginPage.tsx`**
- **Purpose:** Login form UI
- **Type:** React Component
- **Responsibilities:**
  - Email/password input
  - Form validation
  - Supabase authentication
  - Error handling
- **Dependencies:**
  - lib/supabase
  - components/ui/button
  - components/ui/input
  - components/ui/card
- **Props:**
  - onLoginSuccess?: () => void
- **State:**
  - email: string
  - password: string
  - isLoading: boolean
  - error: string | null
- **Called By:** App.tsx
- **Related Docs:** AUTHENTICATION.md, AUTH_FLOW_DIAGRAM.md

**`./src/components/auth/AuthContext.tsx`**
- **Purpose:** Authentication context provider
- **Type:** React Context
- **Provides:**
  - user: User | null
  - session: Session | null
  - tenantId: string | null
  - signOut: () => void
- **Dependencies:** lib/supabase
- **Used By:** All protected components via useAuth() hook
- **Related Docs:** AUTHENTICATION.md

**`./src/components/auth/ProtectedRoute.tsx`**
- **Purpose:** Route protection wrapper
- **Type:** React Component
- **Responsibilities:**
  - Check authentication status
  - Redirect to login if not authenticated
- **Dependencies:** AuthContext
- **Used By:** AppContent.tsx (conceptually)
- **Related Docs:** AUTHENTICATION.md

### Leads Module

**`./src/components/leads/LeadsDashboardPage.tsx`**
- **Purpose:** Leads dashboard main page
- **Type:** React Page Component
- **Responsibilities:**
  - Display lead statistics
  - Show recent campaigns
  - LinkedIn queue widget
  - Quick actions
- **Dependencies:**
  - StatsCards
  - QuickActionsSection
  - RecentCampaignsSection
  - LinkedInQueueWidget
  - lib/campaignAPI
- **State:**
  - stats: any
  - campaigns: any[]
  - queueStatus: any
  - isLoading: boolean
- **Props:**
  - onNavigate?: (page: string) => void
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md Section: Leads Dashboard Screen

**`./src/components/leads/StatsCards.tsx`**
- **Purpose:** Statistics cards component
- **Type:** React Component
- **Displays:** 4 metric cards
- **Used By:** LeadsDashboardPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/QuickActionsSection.tsx`**
- **Purpose:** Quick action buttons grid
- **Type:** React Component
- **Actions:** New Campaign, View Analytics, Import CSV, Export
- **Used By:** LeadsDashboardPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/RecentCampaignsSection.tsx`**
- **Purpose:** Recent campaigns list
- **Type:** React Component
- **Used By:** LeadsDashboardPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/LinkedInQueueWidget.tsx`**
- **Purpose:** LinkedIn connection queue widget
- **Type:** React Component
- **Used By:** LeadsDashboardPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/CampaignsListPage.tsx`**
- **Purpose:** All campaigns list page
- **Type:** React Page Component
- **Dependencies:**
  - campaigns/CampaignsTable
  - campaigns/CampaignFilters
  - campaigns/NewCampaignModal
  - lib/campaignAPI
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/leads/NewCampaignPage.tsx`**
- **Purpose:** New campaign creation page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/leads/LinkedInDMPage.tsx`**
- **Purpose:** LinkedIn DM management page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

#### Leads > Campaigns Submodule

**`./src/components/leads/campaigns/CampaignsTable.tsx`**
- **Purpose:** Campaigns data table
- **Type:** React Component
- **Dependencies:** components/ui/table
- **Used By:** CampaignsListPage
- **Related Docs:** None

**`./src/components/leads/campaigns/CampaignTableRow.tsx`**
- **Purpose:** Campaign table row component
- **Type:** React Component
- **Used By:** CampaignsTable
- **Related Docs:** None

**`./src/components/leads/campaigns/CampaignFilters.tsx`**
- **Purpose:** Campaign filter controls
- **Type:** React Component
- **Used By:** CampaignsListPage
- **Related Docs:** None

**`./src/components/leads/campaigns/NewCampaignModal.tsx`**
- **Purpose:** New campaign creation modal
- **Type:** React Component (Modal)
- **Dependencies:** components/ui/dialog
- **Used By:** CampaignsListPage
- **Related Docs:** None

**`./src/components/leads/campaigns/BulkDeleteModal.tsx`**
- **Purpose:** Bulk delete confirmation modal
- **Type:** React Component (Modal)
- **Dependencies:** components/ui/alert-dialog
- **Used By:** CampaignsListPage
- **Related Docs:** None

#### Leads > Results Submodule

**`./src/components/leads/results/CampaignResultsPage.tsx`**
- **Purpose:** Campaign results detail page
- **Type:** React Page Component
- **Responsibilities:**
  - Display campaign lead results
  - Company cards grid
  - Filtering and search
  - Bulk actions
  - Smart Sync integration
- **Dependencies:**
  - StatsBar
  - ActionBar
  - FilterBar
  - GridView/ListView/TableView
  - SmartSyncModal
  - ConnectionManagerPanel
  - lib/campaignAPI
  - lib/icpAPI
  - lib/eccoAPI
- **State:**
  - campaign: Campaign | null
  - companies: Company[]
  - selectedCompanies: string[]
  - filters: object
  - viewMode: 'grid' | 'list' | 'table'
- **Called By:** AppContent.tsx (when campaign selected)
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md Section: Campaign Results Screen, CAMPAIGN_RESULTS_SUMMARY.md

**`./src/components/leads/results/GridView.tsx`**
- **Purpose:** Grid layout for company cards
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/results/ListView.tsx`**
- **Purpose:** List layout for companies
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** None

**`./src/components/leads/results/TableView.tsx`**
- **Purpose:** Table layout for companies
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** None

**`./src/components/leads/results/FilterBar.tsx`**
- **Purpose:** Filter controls for campaign results
- **Type:** React Component
- **Filters:** Search, ICP Score, Email Status, Category, View Mode
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/results/BulkActionsBar.tsx`**
- **Purpose:** Bulk actions toolbar
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** None

**`./src/components/leads/results/SmartSyncModal.tsx`**
- **Purpose:** Smart Sync wizard modal (multi-step)
- **Type:** React Component (Modal)
- **Steps:**
  1. Connection Selector
  2. Distribution Preview
  3. Sync Options
- **Dependencies:** components/ui/dialog
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md Section: Campaign Results Screen

**`./src/components/leads/results/ConnectionManagerPanel.tsx`**
- **Purpose:** LinkedIn connection queue manager (side panel)
- **Type:** React Component (Sheet)
- **Dependencies:** components/ui/sheet
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/leads/results/LeadDetailModal.tsx`**
- **Purpose:** Detailed lead/company information modal
- **Type:** React Component (Modal)
- **Dependencies:** components/ui/dialog
- **Used By:** GridView, ListView, TableView
- **Related Docs:** None

**`./src/components/leads/results/EmailEnrichmentModal.tsx`**
- **Purpose:** Email enrichment modal
- **Type:** React Component (Modal)
- **Dependencies:** lib/eccoAPI
- **Used By:** LeadDetailModal, GridView
- **Related Docs:** ECCO_CLIENT_DASHBOARD_API_CONFIG_V2.md

**`./src/components/leads/results/AddToQueueModal.tsx`**
- **Purpose:** Add leads to LinkedIn queue modal
- **Type:** React Component (Modal)
- **Used By:** CampaignResultsPage, LeadDetailModal
- **Related Docs:** None

**`./src/components/leads/results/ExportModal.tsx`**
- **Purpose:** Export options modal (CSV, Excel, Google Sheets)
- **Type:** React Component (Modal)
- **Dependencies:** lib/googleDriveAPI (for Sheets)
- **Used By:** CampaignResultsPage
- **Related Docs:** GOOGLE_DRIVE_API_CLEANUP.md

### Campaign Results Module (Alternative Location)

**`./src/components/campaign-results/CampaignResultsPage.tsx`**
- **Purpose:** Campaign results page (possible duplicate or alternative implementation)
- **Type:** React Page Component
- **Note:** Similar to leads/results/CampaignResultsPage.tsx
- **Called By:** AppContent.tsx
- **Related Docs:** CAMPAIGN_RESULTS_SUMMARY.md, ARCHITECTURE_DIAGRAM.md

**`./src/components/campaign-results/StatsBar.tsx`**
- **Purpose:** Statistics bar for campaign results
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/campaign-results/ActionBar.tsx`**
- **Purpose:** Action buttons bar (Smart Sync, LinkedIn, Export)
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/campaign-results/FilterBar.tsx`**
- **Purpose:** Filter bar component
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/campaign-results/CompanyCard.tsx`**
- **Purpose:** Company card component for grid view
- **Type:** React Component
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/campaign-results/SmartSyncModal.tsx`**
- **Purpose:** Smart Sync modal (duplicate or alternative)
- **Type:** React Component (Modal)
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/campaign-results/LinkedInManagerPanel.tsx`**
- **Purpose:** LinkedIn manager panel (duplicate or alternative)
- **Type:** React Component (Sheet)
- **Used By:** CampaignResultsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

### Blog Creator Module

**`./src/components/blog/BlogCreatorPage.tsx`**
- **Purpose:** Blog creator main page
- **Type:** React Page Component
- **Tabs:** Generate, Library
- **Dependencies:**
  - BriefCreationForm
  - BlogEditorModal
  - BlogPreviewModal
  - PublishModal
  - BlogManager
- **Called By:** AppContent.tsx
- **Related Docs:** API_DOCUMENTATION.md (in same folder), ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/blog/BriefCreationForm.tsx`**
- **Purpose:** Blog brief creation form
- **Type:** React Component
- **Fields:** Topic, Audience, Tone, Key Points, Word Count, Keywords
- **Used By:** BlogCreatorPage
- **Related Docs:** API_DOCUMENTATION.md

**`./src/components/blog/BlogEditorModal.tsx`**
- **Purpose:** Rich text blog editor modal
- **Type:** React Component (Modal)
- **Features:** Markdown support, live preview, SEO scoring
- **Used By:** BlogCreatorPage
- **Related Docs:** API_DOCUMENTATION.md

**`./src/components/blog/BlogPreviewModal.tsx`**
- **Purpose:** Blog preview modal
- **Type:** React Component (Modal)
- **Used By:** BlogCreatorPage, BlogManager
- **Related Docs:** None

**`./src/components/blog/PublishModal.tsx`**
- **Purpose:** Blog publishing options modal
- **Type:** React Component (Modal)
- **Features:** WordPress, Webflow integration
- **Used By:** BlogCreatorPage, BlogManager
- **Related Docs:** API_DOCUMENTATION.md

**`./src/components/blog/BlogManager.tsx`**
- **Purpose:** Blog library manager
- **Type:** React Component
- **Features:** Search, filter, edit, delete blogs
- **Used By:** BlogCreatorPage
- **Related Docs:** None

**`./src/components/blog/BriefLibrary.tsx`**
- **Purpose:** Brief library component
- **Type:** React Component
- **Used By:** BlogCreatorPage
- **Related Docs:** None

**`./src/components/blog/API_DOCUMENTATION.md`**
- **Purpose:** Blog API documentation
- **Type:** Markdown documentation
- **Related Components:** All blog/* components
- **Related Files:** None

### FAQ Generator Module

**`./src/components/faq/FAQGeneratorPage.tsx`**
- **Purpose:** FAQ generator main page
- **Type:** React Page Component
- **Tabs:** Generate, Library
- **Dependencies:**
  - GenerateTab
  - FAQLibrary
  - GenerationResults
  - LivePreview
- **Called By:** AppContent.tsx
- **Related Docs:** README.md (in same folder), ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/faq/GenerateTab.tsx`**
- **Purpose:** FAQ generation tab
- **Type:** React Component
- **Used By:** FAQGeneratorPage
- **Related Docs:** README.md

**`./src/components/faq/FAQLibrary.tsx`**
- **Purpose:** FAQ library/history
- **Type:** React Component
- **Used By:** FAQGeneratorPage
- **Related Docs:** README.md

**`./src/components/faq/GenerationResults.tsx`**
- **Purpose:** FAQ generation results display
- **Type:** React Component
- **Used By:** FAQGeneratorPage
- **Related Docs:** README.md

**`./src/components/faq/LivePreview.tsx`**
- **Purpose:** Live FAQ preview
- **Type:** React Component
- **Used By:** FAQGeneratorPage
- **Related Docs:** README.md

**`./src/components/faq/README.md`**
- **Purpose:** FAQ feature documentation
- **Type:** Markdown documentation
- **Related Components:** All faq/* components
- **Related Files:** ARCHITECTURE_EXPANDED_GUIDE.md

### Image Generator Module

**`./src/components/image/ImageGeneratorPage.tsx`**
- **Purpose:** Image generator main page
- **Type:** React Page Component
- **Tabs:** Generate, Gallery, Settings
- **Dependencies:**
  - GenerateTab
  - GalleryTab
  - SettingsTab
  - GenerationForm
  - ImageCard
  - ImagePreview
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/image/GenerateTab.tsx`**
- **Purpose:** Image generation tab
- **Type:** React Component
- **Used By:** ImageGeneratorPage
- **Related Docs:** None

**`./src/components/image/GalleryTab.tsx`**
- **Purpose:** Image gallery tab
- **Type:** React Component
- **Used By:** ImageGeneratorPage
- **Related Docs:** None

**`./src/components/image/SettingsTab.tsx`**
- **Purpose:** Generator settings tab
- **Type:** React Component
- **Used By:** ImageGeneratorPage
- **Related Docs:** None

**`./src/components/image/GenerationForm.tsx`**
- **Purpose:** Image generation form
- **Type:** React Component
- **Fields:** Prompt, Style, Aspect Ratio, Quantity
- **Used By:** GenerateTab
- **Related Docs:** None

**`./src/components/image/ImageCard.tsx`**
- **Purpose:** Image gallery card component
- **Type:** React Component
- **Used By:** GalleryTab
- **Related Docs:** None

**`./src/components/image/ImagePreview.tsx`**
- **Purpose:** Image preview modal/component
- **Type:** React Component
- **Used By:** GalleryTab, ImageCard
- **Related Docs:** None

### Link Suggester Module

**`./src/components/link/LinkSuggesterPage.tsx`**
- **Purpose:** Link suggester main page
- **Type:** React Page Component
- **Dependencies:**
  - ContentInputForm
  - AnalyzeContentTab
  - SuggestionsLibrary
  - SuggestionsPreview
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/link/ContentInputForm.tsx`**
- **Purpose:** Content input form for analysis
- **Type:** React Component
- **Used By:** LinkSuggesterPage
- **Related Docs:** None

**`./src/components/link/AnalyzeContentTab.tsx`**
- **Purpose:** Content analysis tab
- **Type:** React Component
- **Used By:** LinkSuggesterPage
- **Related Docs:** None

**`./src/components/link/SuggestionsLibrary.tsx`**
- **Purpose:** Link suggestions library
- **Type:** React Component
- **Used By:** LinkSuggesterPage
- **Related Docs:** None

**`./src/components/link/SuggestionsPreview.tsx`**
- **Purpose:** Link suggestions preview
- **Type:** React Component
- **Used By:** LinkSuggesterPage
- **Related Docs:** None

### Meta Generator Module

**`./src/components/meta/MetaGeneratorPage.tsx`**
- **Purpose:** Meta content generator main page
- **Type:** React Page Component
- **Dependencies:**
  - GenerateTab
  - MetaLibrary
  - GenerationResults
  - LivePreviews
  - MetaDetailModal
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/meta/GenerateTab.tsx`**
- **Purpose:** Meta generation tab
- **Type:** React Component
- **Used By:** MetaGeneratorPage
- **Related Docs:** None

**`./src/components/meta/MetaLibrary.tsx`**
- **Purpose:** Meta content library
- **Type:** React Component
- **Used By:** MetaGeneratorPage
- **Related Docs:** None

**`./src/components/meta/GenerationResults.tsx`**
- **Purpose:** Meta generation results
- **Type:** React Component
- **Used By:** MetaGeneratorPage
- **Related Docs:** None

**`./src/components/meta/LivePreviews.tsx`**
- **Purpose:** Live meta tag previews
- **Type:** React Component
- **Used By:** MetaGeneratorPage
- **Related Docs:** None

**`./src/components/meta/MetaDetailModal.tsx`**
- **Purpose:** Meta content detail modal
- **Type:** React Component (Modal)
- **Used By:** MetaLibrary
- **Related Docs:** None

### Schema Generator Module

**`./src/components/schema/SchemaGeneratorPage.tsx`**
- **Purpose:** Schema generator main page
- **Type:** React Page Component
- **Dependencies:**
  - GenerateTab
  - SchemaLibrary
  - SchemaTypeSelector
  - DynamicForm
  - JSONPreview
  - forms/* (9 schema type forms)
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/schema/GenerateTab.tsx`**
- **Purpose:** Schema generation tab
- **Type:** React Component
- **Used By:** SchemaGeneratorPage
- **Related Docs:** None

**`./src/components/schema/SchemaLibrary.tsx`**
- **Purpose:** Schema library/history
- **Type:** React Component
- **Used By:** SchemaGeneratorPage
- **Related Docs:** None

**`./src/components/schema/SchemaTypeSelector.tsx`**
- **Purpose:** Schema type selector dropdown
- **Type:** React Component
- **Types:** Article, Product, FAQ, HowTo, LocalBusiness, Organization, Person, BreadcrumbList, VideoObject
- **Used By:** GenerateTab
- **Related Docs:** None

**`./src/components/schema/DynamicForm.tsx`**
- **Purpose:** Dynamic form renderer based on schema type
- **Type:** React Component
- **Used By:** GenerateTab
- **Related Docs:** None

**`./src/components/schema/JSONPreview.tsx`**
- **Purpose:** JSON-LD preview component
- **Type:** React Component
- **Used By:** GenerateTab, SchemaLibrary
- **Related Docs:** None

**`./src/components/schema/schemaTypes.ts`**
- **Purpose:** Schema type definitions
- **Type:** TypeScript types
- **Used By:** All schema components
- **Related Docs:** None

#### Schema Forms Submodule

**`./src/components/schema/forms/ArticleForm.tsx`**
- **Purpose:** Article schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/ProductForm.tsx`**
- **Purpose:** Product schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/FAQPageForm.tsx`**
- **Purpose:** FAQ Page schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/HowToForm.tsx`**
- **Purpose:** HowTo schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/LocalBusinessForm.tsx`**
- **Purpose:** LocalBusiness schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/OrganizationForm.tsx`**
- **Purpose:** Organization schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/PersonForm.tsx`**
- **Purpose:** Person schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/BreadcrumbListForm.tsx`**
- **Purpose:** BreadcrumbList schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

**`./src/components/schema/forms/VideoObjectForm.tsx`**
- **Purpose:** VideoObject schema form
- **Type:** React Component
- **Used By:** DynamicForm
- **Related Docs:** None

### Social Media Module

**`./src/components/social/SocialMediaPostCreatorPage.tsx`**
- **Purpose:** Social media post creator main page
- **Type:** React Page Component
- **Dependencies:**
  - QuickGenerateForm
  - RecentBriefsTable
  - GenerationStats
  - QuickActionsCard
  - PlatformFeatures
  - LoadFromDiscoveryModal
  - ViewPostsModal
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/social/QuickGenerateForm.tsx`**
- **Purpose:** Quick post generation form
- **Type:** React Component
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

**`./src/components/social/RecentBriefsTable.tsx`**
- **Purpose:** Recent briefs table
- **Type:** React Component
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

**`./src/components/social/GenerationStats.tsx`**
- **Purpose:** Generation statistics widget
- **Type:** React Component
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

**`./src/components/social/QuickActionsCard.tsx`**
- **Purpose:** Quick actions card
- **Type:** React Component
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

**`./src/components/social/PlatformFeatures.tsx`**
- **Purpose:** Platform features display
- **Type:** React Component
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

**`./src/components/social/LoadFromDiscoveryModal.tsx`**
- **Purpose:** Load content from discovery modal
- **Type:** React Component (Modal)
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

**`./src/components/social/ViewPostsModal.tsx`**
- **Purpose:** View generated posts modal
- **Type:** React Component (Modal)
- **Used By:** SocialMediaPostCreatorPage
- **Related Docs:** None

#### Social > Calendar Submodule

**`./src/components/social/calendar/PublishingCalendarPage.tsx`**
- **Purpose:** Publishing calendar main page
- **Type:** React Page Component
- **Dependencies:**
  - CalendarGrid
  - ListView
  - MonthlyStatsSidebar
  - ConnectedPlatformsSidebar
  - PostDetailsModal
  - SchedulePostModal
  - ConnectPlatformModal
  - PostPill
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/social/calendar/CalendarGrid.tsx`**
- **Purpose:** Calendar grid view
- **Type:** React Component
- **Used By:** PublishingCalendarPage
- **Related Docs:** None

**`./src/components/social/calendar/ListView.tsx`**
- **Purpose:** List view for scheduled posts
- **Type:** React Component
- **Used By:** PublishingCalendarPage
- **Related Docs:** None

**`./src/components/social/calendar/MonthlyStatsSidebar.tsx`**
- **Purpose:** Monthly statistics sidebar
- **Type:** React Component
- **Used By:** PublishingCalendarPage
- **Related Docs:** None

**`./src/components/social/calendar/ConnectedPlatformsSidebar.tsx`**
- **Purpose:** Connected platforms sidebar
- **Type:** React Component
- **Used By:** PublishingCalendarPage
- **Related Docs:** None

**`./src/components/social/calendar/PostDetailsModal.tsx`**
- **Purpose:** Post details modal
- **Type:** React Component (Modal)
- **Used By:** CalendarGrid, ListView
- **Related Docs:** None

**`./src/components/social/calendar/SchedulePostModal.tsx`**
- **Purpose:** Schedule post modal
- **Type:** React Component (Modal)
- **Used By:** PublishingCalendarPage
- **Related Docs:** None

**`./src/components/social/calendar/ConnectPlatformModal.tsx`**
- **Purpose:** Connect platform modal
- **Type:** React Component (Modal)
- **Used By:** ConnectedPlatformsSidebar
- **Related Docs:** None

**`./src/components/social/calendar/PostPill.tsx`**
- **Purpose:** Post pill component for calendar
- **Type:** React Component
- **Used By:** CalendarGrid
- **Related Docs:** None

#### Social > Ideas Submodule

**`./src/components/social/ideas/IdeasLibraryPage.tsx`**
- **Purpose:** Ideas library main page
- **Type:** React Page Component
- **Dependencies:**
  - FilterBar
  - ThemeTabs
  - StatsCards
  - IdeaCard
  - IdeaDetailModal
  - NewIdeaModal
  - GenerateAIModal
  - ScheduleIdeaModal
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/social/ideas/FilterBar.tsx`**
- **Purpose:** Filter bar for ideas
- **Type:** React Component
- **Used By:** IdeasLibraryPage
- **Related Docs:** None

**`./src/components/social/ideas/ThemeTabs.tsx`**
- **Purpose:** Theme tabs for idea organization
- **Type:** React Component
- **Used By:** IdeasLibraryPage
- **Related Docs:** None

**`./src/components/social/ideas/StatsCards.tsx`**
- **Purpose:** Statistics cards for ideas
- **Type:** React Component
- **Used By:** IdeasLibraryPage
- **Related Docs:** None

**`./src/components/social/ideas/IdeaCard.tsx`**
- **Purpose:** Idea card component
- **Type:** React Component
- **Used By:** IdeasLibraryPage
- **Related Docs:** None

**`./src/components/social/ideas/IdeaDetailModal.tsx`**
- **Purpose:** Idea detail modal
- **Type:** React Component (Modal)
- **Used By:** IdeaCard
- **Related Docs:** None

**`./src/components/social/ideas/NewIdeaModal.tsx`**
- **Purpose:** New idea creation modal
- **Type:** React Component (Modal)
- **Used By:** IdeasLibraryPage
- **Related Docs:** None

**`./src/components/social/ideas/GenerateAIModal.tsx`**
- **Purpose:** AI idea generation modal
- **Type:** React Component (Modal)
- **Used By:** IdeasLibraryPage
- **Related Docs:** None

**`./src/components/social/ideas/ScheduleIdeaModal.tsx`**
- **Purpose:** Schedule idea as post modal
- **Type:** React Component (Modal)
- **Used By:** IdeaDetailModal
- **Related Docs:** None

#### Social > Listening Submodule

**`./src/components/social/listening/SocialListeningPage.tsx`**
- **Purpose:** Social listening main page
- **Type:** React Page Component
- **Dependencies:**
  - FilterBar
  - StatsCards
  - ResultCard
  - DetailModal
  - ScrapePlatformModal
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/social/listening/FilterBar.tsx`**
- **Purpose:** Filter bar for listening results
- **Type:** React Component
- **Used By:** SocialListeningPage
- **Related Docs:** None

**`./src/components/social/listening/StatsCards.tsx`**
- **Purpose:** Statistics cards for listening
- **Type:** React Component
- **Used By:** SocialListeningPage
- **Related Docs:** None

**`./src/components/social/listening/ResultCard.tsx`**
- **Purpose:** Listening result card
- **Type:** React Component
- **Used By:** SocialListeningPage
- **Related Docs:** None

**`./src/components/social/listening/DetailModal.tsx`**
- **Purpose:** Result detail modal
- **Type:** React Component (Modal)
- **Used By:** ResultCard
- **Related Docs:** None

**`./src/components/social/listening/ScrapePlatformModal.tsx`**
- **Purpose:** Platform scraping modal
- **Type:** React Component (Modal)
- **Used By:** SocialListeningPage
- **Related Docs:** None

### Podcasts Module

**`./src/components/podcasts/PodcastOverviewPage.tsx`**
- **Purpose:** Podcast overview/dashboard page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** README.md, FILE_STRUCTURE.md, PODCAST_FEATURE_SUMMARY.md

**`./src/components/podcasts/PodcastCampaignsPage.tsx`**
- **Purpose:** Podcast campaigns page
- **Type:** React Page Component
- **Dependencies:** CreateCampaignModal
- **Called By:** AppContent.tsx
- **Related Docs:** README.md

**`./src/components/podcasts/PodcastLeadsPage.tsx`**
- **Purpose:** Podcast leads page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** README.md, PODCAST_LEADS_IMPLEMENTATION.md

**`./src/components/podcasts/PodcastOutreachPage.tsx`**
- **Purpose:** Podcast outreach page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** README.md, PODCAST_OUTREACH_IMPLEMENTATION.md

**`./src/components/podcasts/PodcastBookingsPage.tsx`**
- **Purpose:** Podcast bookings page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** README.md

**`./src/components/podcasts/CreateCampaignModal.tsx`**
- **Purpose:** Create podcast campaign modal
- **Type:** React Component (Modal)
- **Used By:** PodcastCampaignsPage
- **Related Docs:** None

**`./src/components/podcasts/README.md`**
- **Purpose:** Podcast module documentation
- **Type:** Markdown documentation
- **Related Components:** All podcasts/* components
- **Related Files:** PODCAST_FEATURE_SUMMARY.md

**`./src/components/podcasts/FILE_STRUCTURE.md`**
- **Purpose:** Podcast module file structure
- **Type:** Markdown documentation
- **Related Files:** README.md

**`./src/components/podcasts/PODCAST_LEADS_IMPLEMENTATION.md`**
- **Purpose:** Podcast leads implementation notes
- **Type:** Markdown documentation
- **Related Components:** PodcastLeadsPage.tsx
- **Related Files:** README.md

**`./src/components/podcasts/PODCAST_OUTREACH_IMPLEMENTATION.md`**
- **Purpose:** Podcast outreach implementation notes
- **Type:** Markdown documentation
- **Related Components:** PodcastOutreachPage.tsx
- **Related Files:** README.md

### Ambassadors Module

**`./src/components/ambassadors/AmbassadorDiscoveryPage.tsx`**
- **Purpose:** Ambassador discovery page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/ambassadors/AmbassadorListPage.tsx`**
- **Purpose:** Ambassador list management page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/ambassadors/AmbassadorCampaignsPage.tsx`**
- **Purpose:** Ambassador campaigns page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/ambassadors/ContentApprovalQueue.tsx`**
- **Purpose:** Content approval queue page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

### Audit Module

**`./src/components/audit/AuditScorecard.tsx`**
- **Purpose:** Audit scorecard component
- **Type:** React Component
- **Used By:** DiscoveryAuditPage
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/audit/ICPRelevanceAnalysis.tsx`**
- **Purpose:** ICP relevance analysis component
- **Type:** React Component
- **Used By:** DiscoveryAuditPage
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/audit/ContentGapsTable.tsx`**
- **Purpose:** Content gaps table
- **Type:** React Component
- **Used By:** DiscoveryAuditPage
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/audit/CompetitiveIntelligence.tsx`**
- **Purpose:** Competitive intelligence component
- **Type:** React Component
- **Used By:** DiscoveryAuditPage
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/audit/PlatformPerformanceGrid.tsx`**
- **Purpose:** Platform performance grid
- **Type:** React Component
- **Used By:** DiscoveryAuditPage
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/audit/TargetKeywords.tsx`**
- **Purpose:** Target keywords component
- **Type:** React Component
- **Used By:** DiscoveryAuditPage
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

### ICP Module

**`./src/components/icp/ICPDiscoveryPage.tsx`**
- **Purpose:** ICP discovery page
- **Type:** React Page Component
- **Dependencies:** lib/icpAPI
- **Called By:** AppContent.tsx
- **Related Docs:** ICP_INTEGRATION_SUMMARY.md, ICP_API_CLEANUP.md

### Content Studio Module

**`./src/components/content-studio/ICPContextPanel.tsx`**
- **Purpose:** ICP context panel
- **Type:** React Component
- **Used By:** Various content studio pages
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/content-studio/ICPMatchBadge.tsx`**
- **Purpose:** ICP match badge component
- **Type:** React Component
- **Used By:** Various content studio pages
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

### PMF Module

**`./src/components/pmf/PMFOverviewPage.tsx`**
- **Purpose:** PMF overview/dashboard page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_VISUAL_GUIDE.md

**`./src/components/pmf/SurveysListPage.tsx`**
- **Purpose:** Surveys list page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** None

**`./src/components/pmf/CreateSurveyPage.tsx`**
- **Purpose:** Survey creation page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** None

**`./src/components/pmf/SurveyDetailsPage.tsx`**
- **Purpose:** Survey details/results page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** None

**`./src/components/pmf/InterviewsListPage.tsx`**
- **Purpose:** Interviews list page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** None

**`./src/components/pmf/InterviewAnalysisPage.tsx`**
- **Purpose:** Interview analysis page
- **Type:** React Page Component
- **Called By:** AppContent.tsx
- **Related Docs:** None

**`./src/components/pmf/PublicSurveyPage.tsx`**
- **Purpose:** Public survey page (for respondents)
- **Type:** React Page Component
- **Note:** Not called by AppContent, accessed via external link
- **Related Docs:** None

### Settings Module

**`./src/components/settings/SettingsPage.tsx`**
- **Purpose:** Settings main page
- **Type:** React Page Component
- **Tabs:** Profile, Company, Team, ICP, Platform, Integrations, Notifications
- **Dependencies:** All settings/* components
- **Called By:** AppContent.tsx
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/ProfileSettings.tsx`**
- **Purpose:** Profile settings tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/CompanySettings.tsx`**
- **Purpose:** Company settings tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/TeamSettings.tsx`**
- **Purpose:** Team management tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/ICPSettings.tsx`**
- **Purpose:** ICP configuration tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/PlatformSettings.tsx`**
- **Purpose:** Platform settings tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/IntegrationsSettings.tsx`**
- **Purpose:** Integrations settings tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

**`./src/components/settings/NotificationSettings.tsx`**
- **Purpose:** Notification settings tab
- **Type:** React Component
- **Used By:** SettingsPage
- **Related Docs:** ARCHITECTURE_EXPANDED_GUIDE.md

### Onboarding Module

**`./src/components/onboarding/VisibilityOnboardingFlow.tsx`**
- **Purpose:** Visibility onboarding flow (v1)
- **Type:** React Component
- **Used By:** AppContent.tsx (if needed)
- **Related Docs:** None

**`./src/components/onboarding/VisibilityOnboardingFlowV2.tsx`**
- **Purpose:** Visibility onboarding flow (v2)
- **Type:** React Component
- **Used By:** AppContent.tsx (if needed)
- **Related Docs:** None

**`./src/components/onboarding/OnboardingWizard.tsx`**
- **Purpose:** Onboarding wizard container
- **Type:** React Component
- **Dependencies:** Step1-8 components, SuccessScreen
- **Used By:** AppContent.tsx or standalone
- **Related Docs:** None

**`./src/components/onboarding/Step1ClientAccount.tsx`**
- **Purpose:** Onboarding step 1 - Client account
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step1CompanyBasics.tsx`**
- **Purpose:** Onboarding step 1 - Company basics (alternative)
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step2TargetAudience.tsx`**
- **Purpose:** Onboarding step 2 - Target audience
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step3Competitors.tsx`**
- **Purpose:** Onboarding step 3 - Competitors
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step4Platforms.tsx`**
- **Purpose:** Onboarding step 4 - Platforms
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step5BrandVoice.tsx`**
- **Purpose:** Onboarding step 5 - Brand voice
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step6VoiceExamples.tsx`**
- **Purpose:** Onboarding step 6 - Voice examples
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step7Review.tsx`**
- **Purpose:** Onboarding step 7 - Review
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/Step8Review.tsx`**
- **Purpose:** Onboarding step 8 - Final review (alternative)
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

**`./src/components/onboarding/SuccessScreen.tsx`**
- **Purpose:** Onboarding success screen
- **Type:** React Component
- **Used By:** OnboardingWizard
- **Related Docs:** None

### Figma Integration Module

**`./src/components/figma/ImageWithFallback.tsx`**
- **Purpose:** Image component with fallback
- **Type:** React Component
- **Used By:** Various components for Figma assets
- **Related Docs:** None

---

## API Layer Registry

### Supabase Client

**`./src/lib/supabase.ts`**
- **Purpose:** Supabase client configuration and helper functions
- **Type:** TypeScript module
- **Exports:**
  - `supabase`: Supabase client instance
  - `getSession()`: Get current session
  - `getTenantId(userId)`: Get tenant ID for user
  - `getStoredTenantId()`: Get tenant ID from localStorage
  - `getStoredUserEmail()`: Get user email from localStorage
- **Dependencies:** @supabase/supabase-js
- **Used By:** App.tsx, AppContent.tsx, auth components
- **Related Docs:** AUTHENTICATION.md, JWT_AUTO_REFRESH_IMPLEMENTATION.md

### Campaign API

**`./src/lib/campaignAPI.ts`**
- **Purpose:** Campaign management API functions
- **Type:** TypeScript module
- **Key Functions:**
  - `loadCampaignResults(campaignId)`: Load campaign results
  - `previewDistribution(campaignId)`: Preview ICP distribution
  - `syncWithICPRouting(data)`: Execute Smart Sync
  - `addToLinkedInQueue(leads)`: Add leads to LinkedIn queue
  - `getAllCampaigns()`: Get all campaigns
  - `getStats()`: Get campaign statistics
  - `getRecentCampaigns()`: Get recent campaigns
  - `deleteCampaigns(ids)`: Delete campaigns
- **Dependencies:** supabase.ts
- **Used By:** Leads module components
- **Related Docs:** CAMPAIGN_RESULTS_SUMMARY.md, API_INTEGRATION_STATUS.md

### ICP API

**`./src/lib/icpAPI.ts`**
- **Purpose:** ICP (Ideal Customer Profile) API functions
- **Type:** TypeScript module
- **Key Functions:**
  - `discoverICPs(criteria)`: Discover ICP profiles
  - `analyzeRelevance(data)`: Analyze ICP relevance
  - `matchCategories(leads)`: Match leads to ICP categories
- **Dependencies:** supabase.ts
- **Used By:** ICP module, Campaign Results module
- **Related Docs:** ICP_INTEGRATION_SUMMARY.md, ICP_API_CLEANUP.md

### ECCO API

**`./src/lib/eccoAPI.ts`**
- **Purpose:** ECCO enrichment API functions
- **Type:** TypeScript module
- **Key Functions:**
  - `enrichCompany(companyData)`: Enrich company data
  - `enrichContact(contactData)`: Enrich contact data
  - `validateEmail(email)`: Validate and verify email
  - `callEccoAPI()`: Base ECCO API call
  - `discoveryAuditAPI.*`: Discovery audit endpoints
  - `discoveryIntelligenceAPI.*`: Discovery intelligence endpoints
- **Dependencies:** supabase.ts
- **Used By:** Campaign Results, Audit module
- **Related Docs:** ECCO_CLIENT_DASHBOARD_API_CONFIG_V2.md, API_INTEGRATION_STATUS.md

### Connections API

**`./src/lib/connectionsAPI.ts`**
- **Purpose:** LinkedIn connections management API
- **Type:** TypeScript module
- **Key Functions:**
  - `getLinkedInConnections()`: Get LinkedIn connections
  - `manageQueue(action, data)`: Manage connection queue
  - `trackEngagement(data)`: Track engagement metrics
- **Dependencies:** supabase.ts
- **Used By:** LinkedIn queue components
- **Related Docs:** API_INTEGRATION_STATUS.md

### Google Drive API

**`./src/lib/googleDriveAPI.ts`**
- **Purpose:** Google Drive integration API
- **Type:** TypeScript module
- **Key Functions:**
  - `pickFile()`: Open Google Drive file picker
  - `uploadFile(file)`: Upload file to Drive
  - `listFiles()`: List files from Drive
  - Export to Google Sheets functions
- **Dependencies:** Google Drive SDK
- **Used By:** GoogleDrivePickerModal, Export features
- **Related Docs:** GOOGLE_DRIVE_API_CLEANUP.md, API_INTEGRATION_STATUS.md

### Clipboard Utilities

**`./src/lib/clipboard.ts`**
- **Purpose:** Clipboard utility functions
- **Type:** TypeScript module
- **Key Functions:**
  - `copyToClipboard(text)`: Copy text to clipboard
- **Dependencies:** None
- **Used By:** Various components for copy functionality
- **Related Docs:** None

---

## UI Component Library

All UI components are located in `./src/components/ui/` and are Radix UI wrapper components styled with Tailwind CSS.

**`./src/components/ui/accordion.tsx`**
- **Purpose:** Collapsible accordion sections
- **Radix Primitive:** @radix-ui/react-accordion
- **Used By:** FAQ displays, Settings sections

**`./src/components/ui/alert-dialog.tsx`**
- **Purpose:** Confirmation dialogs
- **Radix Primitive:** @radix-ui/react-alert-dialog
- **Used By:** Delete confirmations, destructive actions

**`./src/components/ui/alert.tsx`**
- **Purpose:** Alert messages
- **Radix Primitive:** None (styled div)
- **Used By:** Error messages, warnings, info

**`./src/components/ui/aspect-ratio.tsx`**
- **Purpose:** Aspect ratio container
- **Radix Primitive:** @radix-ui/react-aspect-ratio
- **Used By:** Image displays

**`./src/components/ui/avatar.tsx`**
- **Purpose:** Avatar/profile image component
- **Radix Primitive:** @radix-ui/react-avatar
- **Used By:** User profiles, contact lists, navigation

**`./src/components/ui/badge.tsx`**
- **Purpose:** Badge/tag component
- **Radix Primitive:** None (styled span)
- **Used By:** Status indicators, ICP scores, categories

**`./src/components/ui/breadcrumb.tsx`**
- **Purpose:** Breadcrumb navigation
- **Radix Primitive:** None (styled nav)
- **Used By:** Page headers for navigation context

**`./src/components/ui/button.tsx`**
- **Purpose:** Button component with variants
- **Radix Primitive:** @radix-ui/react-slot
- **Variants:** default, destructive, outline, secondary, ghost, link
- **Used By:** All interactive actions

**`./src/components/ui/calendar.tsx`**
- **Purpose:** Date picker calendar
- **Radix Primitive:** react-day-picker
- **Used By:** Date selection in forms, scheduling

**`./src/components/ui/card.tsx`**
- **Purpose:** Card container
- **Radix Primitive:** None (styled div)
- **Used By:** Company cards, metric cards, content cards

**`./src/components/ui/carousel.tsx`**
- **Purpose:** Carousel component
- **Radix Primitive:** embla-carousel-react
- **Used By:** Image galleries, content sliders

**`./src/components/ui/chart.tsx`**
- **Purpose:** Chart wrapper for Recharts
- **Radix Primitive:** recharts
- **Used By:** Dashboard charts, analytics

**`./src/components/ui/checkbox.tsx`**
- **Purpose:** Checkbox input
- **Radix Primitive:** @radix-ui/react-checkbox
- **Used By:** Forms, multi-select, settings

**`./src/components/ui/collapsible.tsx`**
- **Purpose:** Collapsible sections
- **Radix Primitive:** @radix-ui/react-collapsible
- **Used By:** Expandable content areas

**`./src/components/ui/command.tsx`**
- **Purpose:** Command palette (Cmd+K)
- **Radix Primitive:** cmdk
- **Used By:** Global search, quick actions

**`./src/components/ui/context-menu.tsx`**
- **Purpose:** Right-click context menus
- **Radix Primitive:** @radix-ui/react-context-menu
- **Used By:** Table rows, cards

**`./src/components/ui/dialog.tsx`**
- **Purpose:** Modal dialogs
- **Radix Primitive:** @radix-ui/react-dialog
- **Used By:** All modals (most commonly used overlay)

**`./src/components/ui/drawer.tsx`**
- **Purpose:** Bottom drawer (mobile)
- **Radix Primitive:** vaul
- **Used By:** Mobile actions, filters

**`./src/components/ui/dropdown-menu.tsx`**
- **Purpose:** Dropdown menus
- **Radix Primitive:** @radix-ui/react-dropdown-menu
- **Used By:** Action menus, user menu, export options

**`./src/components/ui/form.tsx`**
- **Purpose:** Form wrapper with validation
- **Radix Primitive:** react-hook-form
- **Used By:** All forms

**`./src/components/ui/hover-card.tsx`**
- **Purpose:** Hover card popover
- **Radix Primitive:** @radix-ui/react-hover-card
- **Used By:** Tooltip-like information displays

**`./src/components/ui/input-otp.tsx`**
- **Purpose:** OTP input component
- **Radix Primitive:** input-otp
- **Used By:** 2FA, verification codes

**`./src/components/ui/input.tsx`**
- **Purpose:** Text input field
- **Radix Primitive:** None (styled input)
- **Used By:** All text entry (most commonly used input)

**`./src/components/ui/label.tsx`**
- **Purpose:** Form labels
- **Radix Primitive:** @radix-ui/react-label
- **Used By:** All form fields

**`./src/components/ui/menubar.tsx`**
- **Purpose:** Menubar component
- **Radix Primitive:** @radix-ui/react-menubar
- **Used By:** Application menu bars

**`./src/components/ui/navigation-menu.tsx`**
- **Purpose:** Navigation menu
- **Radix Primitive:** @radix-ui/react-navigation-menu
- **Used By:** Complex navigation structures

**`./src/components/ui/pagination.tsx`**
- **Purpose:** Pagination component
- **Radix Primitive:** None (styled nav)
- **Used By:** Tables, lists with pagination

**`./src/components/ui/popover.tsx`**
- **Purpose:** Popover overlay
- **Radix Primitive:** @radix-ui/react-popover
- **Used By:** Contextual information, date pickers

**`./src/components/ui/progress.tsx`**
- **Purpose:** Progress bar
- **Radix Primitive:** @radix-ui/react-progress
- **Used By:** Loading states, LinkedIn queue limit

**`./src/components/ui/radio-group.tsx`**
- **Purpose:** Radio button group
- **Radix Primitive:** @radix-ui/react-radio-group
- **Used By:** Forms with exclusive options

**`./src/components/ui/resizable.tsx`**
- **Purpose:** Resizable panels
- **Radix Primitive:** react-resizable-panels
- **Used By:** Split views, adjustable layouts

**`./src/components/ui/scroll-area.tsx`**
- **Purpose:** Scrollable area with custom scrollbar
- **Radix Primitive:** @radix-ui/react-scroll-area
- **Used By:** Long lists, side panels

**`./src/components/ui/select.tsx`**
- **Purpose:** Select dropdown
- **Radix Primitive:** @radix-ui/react-select
- **Used By:** Forms with dropdown options

**`./src/components/ui/separator.tsx`**
- **Purpose:** Visual separator
- **Radix Primitive:** @radix-ui/react-separator
- **Used By:** Dividing content sections

**`./src/components/ui/sheet.tsx`**
- **Purpose:** Side panel sheet
- **Radix Primitive:** @radix-ui/react-dialog (styled as sheet)
- **Used By:** LinkedIn Manager Panel, side drawers

**`./src/components/ui/sidebar.tsx`**
- **Purpose:** Sidebar component
- **Radix Primitive:** @radix-ui/react-dialog or custom
- **Used By:** Application sidebar

**`./src/components/ui/skeleton.tsx`**
- **Purpose:** Loading skeleton
- **Radix Primitive:** None (styled div with animation)
- **Used By:** Loading states for all content

**`./src/components/ui/slider.tsx`**
- **Purpose:** Slider input
- **Radix Primitive:** @radix-ui/react-slider
- **Used By:** Range inputs, volume controls

**`./src/components/ui/sonner.tsx`**
- **Purpose:** Toast notifications
- **Radix Primitive:** sonner
- **Used By:** Success/error messages throughout app

**`./src/components/ui/switch.tsx`**
- **Purpose:** Toggle switch
- **Radix Primitive:** @radix-ui/react-switch
- **Used By:** Boolean settings, feature toggles

**`./src/components/ui/table.tsx`**
- **Purpose:** Table component
- **Radix Primitive:** None (styled table)
- **Used By:** Campaigns table, data tables

**`./src/components/ui/tabs.tsx`**
- **Purpose:** Tabs component
- **Radix Primitive:** @radix-ui/react-tabs
- **Used By:** Settings, Content Studio, multi-tab pages

**`./src/components/ui/textarea.tsx`**
- **Purpose:** Textarea input
- **Radix Primitive:** None (styled textarea)
- **Used By:** Long text entry, descriptions

**`./src/components/ui/toggle-group.tsx`**
- **Purpose:** Toggle group (multiple toggles)
- **Radix Primitive:** @radix-ui/react-toggle-group
- **Used By:** View mode toggles (grid/list/table)

**`./src/components/ui/toggle.tsx`**
- **Purpose:** Toggle button
- **Radix Primitive:** @radix-ui/react-toggle
- **Used By:** Single toggle actions

**`./src/components/ui/tooltip.tsx`**
- **Purpose:** Tooltip
- **Radix Primitive:** @radix-ui/react-tooltip
- **Used By:** Helpful hints on hover

**`./src/components/ui/use-mobile.ts`**
- **Purpose:** Mobile detection hook
- **Type:** TypeScript hook
- **Exports:** `useMobile()` hook
- **Used By:** Responsive components

**`./src/components/ui/utils.ts`**
- **Purpose:** UI utility functions
- **Type:** TypeScript module
- **Key Functions:**
  - `cn(...classes)`: Tailwind class merger (clsx + tailwind-merge)
- **Used By:** All UI components

---

## Utility Functions

**`./src/utils/supabase/info.tsx`**
- **Purpose:** Supabase information utilities
- **Type:** TypeScript/React module
- **Used By:** Various components
- **Related Docs:** None

---

## Asset Registry

**`./src/assets/`**
- **Purpose:** Static assets directory
- **Contents:** 3 PNG image files (Figma exports)
- **Files:**
  - `0ce0ea9e61323cab775fc4badd5a1b590d0a9fb7.png`
  - `b801bd4090f4eac107789031e2ec2d4ee861af08.png` (BAIV Logo)
  - `fe32c103d57b0e71041590283a69cd593aaa06b2.png`
- **Used By:** LeftNavigation, various components

---

## Supabase Functions

**`./src/supabase/functions/server/index.tsx`**
- **Purpose:** Supabase edge function entry point
- **Type:** TypeScript/Hono server
- **Used By:** Supabase Functions deployment
- **Related Docs:** DEPLOYMENT_GUIDE.md

**`./src/supabase/functions/server/kv_store.tsx`**
- **Purpose:** Key-value store functions
- **Type:** TypeScript/Hono server
- **Used By:** index.tsx
- **Related Docs:** None

---

## Summary Statistics

### By Category

- **Configuration Files:** 4
- **Documentation Files:** 40+
- **React Components:** 221
  - Page Components: ~50
  - UI Components: 48
  - Feature Components: ~120
  - Other Components: ~3
- **API Modules:** 7
- **Utility Modules:** 3
- **Asset Files:** 3
- **Style Files:** 2

### By Module

- **Leads Module:** 30+ files
- **Social Media Module:** 35+ files
- **Blog Creator:** 8 files
- **FAQ Generator:** 6 files
- **Image Generator:** 7 files
- **Schema Generator:** 15 files
- **Podcasts:** 10 files
- **Settings:** 8 files
- **Onboarding:** 12 files
- **PMF:** 7 files
- **Ambassadors:** 4 files
- **Audit:** 6 files
- **ICP:** 1-2 files
- **Content Studio:** 2 files
- **Authentication:** 3 files
- **UI Library:** 48 files

---

## Cross-Reference Index

### Files by Feature

**Authentication:**
- src/App.tsx
- src/components/auth/*
- src/lib/supabase.ts
- Docs: AUTHENTICATION*.md, AUTH*.md, JWT*.md

**Leads Management:**
- src/components/leads/*
- src/components/campaign-results/*
- src/lib/campaignAPI.ts
- src/lib/connectionsAPI.ts
- Docs: CAMPAIGN_RESULTS_SUMMARY.md

**Content Generation:**
- src/components/blog/*
- src/components/faq/*
- src/components/image/*
- src/components/meta/*
- src/components/schema/*
- src/components/link/*
- Docs: blog/API_DOCUMENTATION.md, faq/README.md

**Social Media:**
- src/components/social/*
- Docs: None specific

**Podcasts:**
- src/components/podcasts/*
- Docs: podcasts/README.md, podcasts/*.md, PODCAST_FEATURE_SUMMARY.md

**ICP & Discovery:**
- src/components/icp/*
- src/components/audit/*
- src/lib/icpAPI.ts
- src/lib/eccoAPI.ts
- Docs: ICP_INTEGRATION_SUMMARY.md, ICP_API_CLEANUP.md

**Settings:**
- src/components/settings/*
- Docs: None specific

**UI Framework:**
- src/components/ui/*
- Docs: None specific

---

## Conclusion

This artifact mapping guide provides a complete reference to all 250+ files in the Mil3-AIVis-Agents repository. Each artifact is mapped to its:

- **Location** in the file system
- **Purpose** and responsibilities
- **Type** (component, module, documentation, etc.)
- **Dependencies** and relationships
- **Usage** (where it's called from)
- **Related documentation**

Use this guide as a reference when:
- Navigating the codebase
- Understanding component relationships
- Finding relevant documentation
- Planning modifications or extensions
- Onboarding new developers

**Version:** 0.1.0  
**Last Updated:** 2025-12-09  
**Maintained by:** BAIV Team
