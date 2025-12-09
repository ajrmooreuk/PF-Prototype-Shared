# Color Update Guide

## Color Replacements Required

Replace all instances of:
1. `#02a4bf` → `#2990C6` (primary teal to blue)
2. `#028a9f` → `#2990C6` (darker teal to blue)  
3. `#005260` → `#000000` (dark teal to black)
4. `teal-` (Tailwind classes) → need custom handling

## Files to Update

Based on file_search, the following files need updates:
- /App.tsx ✅
- /components/AppLayout.tsx ✅
- /components/ui/progress.tsx
- /components/Navigation.tsx
- /components/MetricsRow.tsx
- /components/CircularGauge.tsx
- /components/PlatformCitationChart.tsx
- /components/ActivityFeed.tsx
- /components/QuickActions.tsx
- /components/TopOpportunities.tsx
- All Discovery Audit related components
- All Settings components
- All PMF components
- All other feature pages

Orange color `#e84e1c` - keeping as is for alerts/warnings.
