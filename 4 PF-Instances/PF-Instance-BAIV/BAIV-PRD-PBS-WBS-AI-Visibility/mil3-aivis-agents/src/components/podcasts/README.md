# Podcast Outreach System - Overview Dashboard

## Overview

The Podcast Outreach System helps businesses track podcast guest appearance opportunities, manage outreach campaigns, and monitor their podcast presence pipeline.

## Features

### 📊 Overview Dashboard
- **Stats Cards**: Track total podcasts found, outreach sent, bookings scheduled, and episodes published
- **Pipeline Funnel**: Visual representation of the outreach process from discovery to publication
- **Recent Activity Feed**: Real-time updates on outreach activities
- **Upcoming Interviews**: Calendar of scheduled podcast appearances
- **Quick Actions**: Fast access to create campaigns, browse leads, and generate pitches
- **Performance Insights**: Average relevance scores and ICP alignment metrics

### 🎯 Create Campaign Modal
- Search for relevant podcasts based on keywords and categories
- Filter by audience size and language
- Automatic podcast discovery and relevance scoring
- Integration with Discovery Audit for brand-aligned recommendations

## Navigation

Access the Podcast System through the main navigation dropdown:
- **Overview**: Main dashboard with stats and activity
- **Campaigns**: Manage podcast discovery campaigns
- **Leads**: View and manage discovered podcast opportunities
- **Outreach**: Create and send pitch emails
- **Bookings**: Manage scheduled interviews

## API Integration (V2.0)

All components use the Universal API Integration V2.0 pattern:

```typescript
import { callEccoAPI } from '../../lib/eccoAPI';

// Example: Load overview stats
const stats = await callEccoAPI('/api/podcasts/overview/stats');
```

### Endpoints Used

**Overview Page:**
- `GET /api/podcasts/overview/stats` - Dashboard statistics
- `GET /api/podcasts/overview/recent-activity` - Activity feed
- `GET /api/podcasts/overview/upcoming-interviews` - Scheduled bookings

**Campaign Creation:**
- `POST /api/podcasts/campaigns` - Create new campaign
- `POST /api/podcasts/campaigns/{id}/search` - Start podcast search

## Components

### PodcastOverviewPage.tsx
Main dashboard component with:
- Stats cards showing key metrics
- Pipeline funnel visualization
- Activity feed with real-time updates
- Upcoming interviews calendar
- Quick action cards
- Performance insights (circular progress indicators)
- Auto-refresh every 30 seconds

### CreateCampaignModal.tsx
Campaign creation modal with:
- Form validation
- Keyword tag input
- Multi-select categories
- Audience size radio buttons
- Language selection
- Auto-start podcast search on submission

## Data Flow

1. **Page Load**: Fetch stats, activities, and bookings in parallel
2. **Auto-Refresh**: Poll for updates every 30 seconds
3. **Create Campaign**: Submit form → Create campaign → Start search → Navigate to campaign page
4. **Activity Click**: Navigate to lead or booking detail page
5. **Quick Actions**: Navigate to relevant sections

## Styling

Follows BAIV design system:
- **Primary Teal**: #02a4bf (buttons, active states)
- **Dark Teal**: #005260 (headings)
- **Light Teal**: #E6F7F9 (backgrounds)
- **Typography**: Poppins for headings, Open Sans for body
- **Spacing**: Consistent 8px grid system
- **Effects**: Hover states, smooth transitions, shadow elevation

## Mock Data (DEV_MODE)

When `DEV_MODE = true` in `/lib/eccoAPI.ts`, all endpoints return realistic mock data:
- 45 podcasts found
- 12 outreach sent
- 3 bookings scheduled
- 1 episode published
- Pipeline breakdown by status
- Recent activities with timestamps
- Upcoming interviews with dates

## Error Handling

- Loading states with spinner
- Error alerts with retry option
- Toast notifications for success/error
- Graceful degradation for missing data

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators
- Screen reader friendly
- Touch-friendly tap targets (44px minimum)

## Future Pages (Coming Soon)

- **Campaigns**: Manage multiple podcast search campaigns
- **Leads**: Detailed podcast lead management with scoring
- **Outreach**: AI-powered pitch email generator
- **Bookings**: Interview preparation and scheduling tools

## Usage Example

```typescript
// In App.tsx routing
if (currentPage === 'podcast-overview') {
  return <PodcastOverviewPage />;
}

// Navigate to podcast overview
setCurrentPage('podcast-overview');
```

## Notes

- All timestamps are formatted client-side
- Conversion rates calculated from status numbers
- Campaign search auto-initiates after creation
- Performance insights use SVG circular progress
- Modal closes on outside click or X button

---

**Last Updated**: November 10, 2025  
**Version**: 1.0  
**Status**: ✅ Complete with V2.0 API Integration
