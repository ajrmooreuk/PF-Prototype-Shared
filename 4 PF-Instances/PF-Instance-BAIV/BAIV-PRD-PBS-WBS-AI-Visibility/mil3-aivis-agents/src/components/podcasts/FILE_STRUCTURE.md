# Podcast Feature - File Structure

## Current Implementation

```
/components/podcasts/
├── PodcastOverviewPage.tsx      ✅ Main dashboard (550+ lines)
├── CreateCampaignModal.tsx      ✅ Campaign creation modal (280+ lines)
├── README.md                    ✅ Feature documentation
└── FILE_STRUCTURE.md            ✅ This file

/lib/
└── eccoAPI.ts                   ✅ Updated with 5 podcast endpoints

/components/
└── Navigation.tsx               ✅ Updated with Podcasts dropdown

/
├── App.tsx                      ✅ Updated with podcast routing
├── API_INTEGRATION_V2_STATUS.md ✅ Updated with podcast section
└── PODCAST_FEATURE_SUMMARY.md   ✅ Complete implementation summary
```

## Planned Implementation

```
/components/podcasts/
├── PodcastOverviewPage.tsx      ✅ COMPLETE
├── CreateCampaignModal.tsx      ✅ COMPLETE
│
├── campaigns/                   📋 PLANNED
│   ├── CampaignsListPage.tsx
│   ├── CampaignCard.tsx
│   ├── CampaignFilters.tsx
│   └── EditCampaignModal.tsx
│
├── leads/                       📋 PLANNED
│   ├── PodcastLeadsPage.tsx
│   ├── LeadCard.tsx
│   ├── LeadDetailModal.tsx
│   ├── LeadFilters.tsx
│   └── BulkActionsBar.tsx
│
├── outreach/                    📋 PLANNED
│   ├── OutreachPage.tsx
│   ├── PitchGenerator.tsx
│   ├── EmailTemplates.tsx
│   └── OutreachTracker.tsx
│
├── bookings/                    📋 PLANNED
│   ├── BookingsPage.tsx
│   ├── BookingCalendar.tsx
│   ├── InterviewPrep.tsx
│   └── EpisodeTracker.tsx
│
├── README.md                    ✅ COMPLETE
└── FILE_STRUCTURE.md            ✅ COMPLETE
```

## Component Hierarchy

```
App.tsx
└── Navigation.tsx (Podcasts dropdown)
    └── PodcastOverviewPage.tsx
        ├── Stats Cards (4)
        ├── Pipeline Funnel
        ├── Activity Feed
        ├── Upcoming Interviews
        ├── Quick Actions (3)
        ├── Performance Insights
        └── CreateCampaignModal
            └── Campaign Form
```

## API Endpoints

### Implemented (5)
```
✅ GET  /api/podcasts/overview/stats
✅ GET  /api/podcasts/overview/recent-activity
✅ GET  /api/podcasts/overview/upcoming-interviews
✅ POST /api/podcasts/campaigns
✅ POST /api/podcasts/campaigns/{id}/search
```

### Planned
```
📋 GET  /api/podcasts/campaigns
📋 GET  /api/podcasts/campaigns/{id}
📋 PATCH /api/podcasts/campaigns/{id}
📋 DELETE /api/podcasts/campaigns/{id}

📋 GET  /api/podcasts/leads
📋 GET  /api/podcasts/leads/{id}
📋 PATCH /api/podcasts/leads/{id}
📋 POST /api/podcasts/leads/{id}/contact

📋 POST /api/podcasts/outreach/generate
📋 POST /api/podcasts/outreach/send
📋 GET  /api/podcasts/outreach/templates

📋 GET  /api/podcasts/bookings
📋 GET  /api/podcasts/bookings/{id}
📋 PATCH /api/podcasts/bookings/{id}
📋 POST /api/podcasts/bookings/{id}/complete
```

## Navigation Routes

### Implemented (1)
```
✅ /podcasts/overview          → PodcastOverviewPage
```

### Planned (4)
```
📋 /podcasts/campaigns         → CampaignsListPage
📋 /podcasts/leads             → PodcastLeadsPage
📋 /podcasts/outreach          → OutreachPage
📋 /podcasts/bookings          → BookingsPage
```

## Dependencies

### React Components
- `lucide-react` - Icons
- `sonner@2.0.3` - Toast notifications
- ShadCN UI components:
  - Button
  - Card
  - Input
  - Label
  - Select
  - RadioGroup
  - Checkbox
  - Alert

### Custom Utilities
- `/lib/eccoAPI.ts` - API integration

### Custom Components
- `/components/ui/*` - ShadCN components
- `/components/Navigation.tsx` - Top navigation

## State Management

### Current (Overview Page)
```typescript
const [stats, setStats] = useState<OverviewStats | null>(null);
const [activities, setActivities] = useState<Activity[]>([]);
const [bookings, setBookings] = useState<Booking[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [showCampaignModal, setShowCampaignModal] = useState(false);
```

### Pattern Used
- Local state with useState hooks
- No global state management (Redux, Zustand, etc.)
- API calls with useEffect
- Auto-refresh with setInterval

## Styling Approach

### Tailwind CSS
- Utility-first CSS framework
- Custom color values for BAIV brand
- Responsive breakpoints (mobile, tablet, desktop)

### Design System
```css
--primary-teal: #02a4bf
--dark-teal: #005260
--light-teal: #E6F7F9
--orange: #e84e1c
--blue: #3b82f6
--purple: #8b5cf6
--green: #10b981
```

### Typography
```
Headings: Poppins (Bold/Semibold)
Body: Open Sans (Regular/Medium)
```

## Testing Strategy

### Manual Testing Checklist
- [x] Page loads without errors
- [x] Stats display correctly
- [x] Pipeline funnel renders
- [x] Activity feed scrolls
- [x] Interviews show properly
- [x] Quick actions navigate
- [x] Performance insights animate
- [x] Modal opens/closes
- [x] Form validation works
- [x] Campaign creation succeeds
- [x] Toast notifications appear
- [x] Auto-refresh works
- [x] Loading states show
- [x] Error states display
- [x] Empty states render
- [x] Responsive at all sizes
- [x] Keyboard navigation works
- [x] Hover effects trigger

### Future Testing
- Unit tests with Jest/Vitest
- Component tests with React Testing Library
- E2E tests with Playwright/Cypress
- Accessibility tests with axe-core

## Performance Considerations

### Optimizations
- Parallel API calls (Promise.all)
- Auto-refresh interval (30s, not too aggressive)
- Conditional rendering (loading/error/success states)
- Event handler debouncing (where needed)

### Future Optimizations
- Virtual scrolling for long lists
- Image lazy loading
- Code splitting by route
- Memoization of expensive calculations

## Security

### Current
- JWT token in API calls (via eccoAPI)
- Tenant ID isolation
- Input validation on forms
- XSS prevention (React escaping)

### Production Requirements
- Replace DEV_MODE with real auth
- Implement CSRF protection
- Add rate limiting
- Sanitize user inputs
- Validate API responses

## Browser Support

### Tested
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

### Requirements
- Modern ES6+ browsers
- CSS Grid support
- Flexbox support
- SVG support

---

**Last Updated**: November 10, 2025  
**Version**: 1.0  
**Maintainer**: BAIV Development Team
