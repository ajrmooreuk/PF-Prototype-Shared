# Sales & Marketing KPIs with Sparklines

## Overview

The Internal Process Perspective in the Platform Dashboard now includes a dedicated **Sales & Marketing KPIs** section with 8 key performance indicators, each visualized with interactive sparklines showing historical trends.

## What are Sparklines?

Sparklines are small, inline charts that show trends over time without axes or labels. They provide quick visual insight into metric performance at a glance.

---

## Sales & Marketing KPIs

### 1. Lead Conversion Rate 📊
**Current:** 24% | **Target:** 30% | **Trend:** ↑ +8%

- **What it measures:** Percentage of leads that convert to customers
- **Color:** Primary Blue (#00a4bf)
- **Historical Trend:** Steady upward growth from 18% to 24%
- **Strategic Importance:** Direct indicator of sales effectiveness and lead quality

**Sparkline shows:** Consistent month-over-month improvement with slight fluctuations

---

### 2. Marketing Qualified Leads (MQL) 🎯
**Current:** 342 | **Target:** 500 | **Trend:** ↑ +15%

- **What it measures:** Number of leads that meet marketing qualification criteria
- **Color:** Blue (#2196f3)
- **Historical Trend:** Strong growth from 280 to 342 leads
- **Strategic Importance:** Top of funnel health indicator

**Sparkline shows:** Steady upward trajectory with some variance

---

### 3. Sales Qualified Leads (SQL) ✅
**Current:** 156 | **Target:** 200 | **Trend:** ↑ +12%

- **What it measures:** Leads accepted by sales team as sales-ready
- **Color:** Green (#4caf50)
- **Historical Trend:** Consistent growth from 120 to 156
- **Strategic Importance:** Sales pipeline quality indicator

**Sparkline shows:** Smooth, consistent upward growth

---

### 4. Sales Cycle Length ⏱️
**Current:** 45 days | **Target:** 30 days | **Trend:** ↓ -10%

- **What it measures:** Average time from first contact to closed deal
- **Color:** Orange (#ff9800)
- **Historical Trend:** Decreasing from 52 days to 45 days
- **Strategic Importance:** Sales efficiency and process optimization metric

**Sparkline shows:** Downward trend (positive improvement)

---

### 5. Marketing ROI 💰
**Current:** 3.2x | **Target:** 4.0x | **Trend:** ↑ +18%

- **What it measures:** Return on marketing investment (revenue/cost)
- **Color:** Purple (#9c27b0)
- **Historical Trend:** Improving from 2.4x to 3.2x
- **Strategic Importance:** Marketing program effectiveness

**Sparkline shows:** Strong upward trajectory

---

### 6. Campaign Success Rate 🎪
**Current:** 68% | **Target:** 75% | **Trend:** ↑ +5%

- **What it measures:** Percentage of campaigns meeting success criteria
- **Color:** Pink (#e91e63)
- **Historical Trend:** Gradual improvement from 60% to 68%
- **Strategic Importance:** Marketing execution quality

**Sparkline shows:** Steady climb with plateauing at current level

---

### 7. Pipeline Velocity 🚀
**Current:** $2.4M | **Target:** $3.5M | **Trend:** ↑ +22%

- **What it measures:** Rate at which deals move through the sales pipeline
- **Color:** Cyan (#00bcd4)
- **Historical Trend:** Strong growth from $1.8M to $2.4M
- **Strategic Importance:** Revenue generation momentum

**Sparkline shows:** Consistent upward momentum

---

### 8. Customer Acquisition Cost (CAC) 💵
**Current:** $1,450 | **Target:** $1,200 | **Trend:** ↓ -8%

- **What it measures:** Average cost to acquire a new customer
- **Color:** Red-Orange (#ff5722)
- **Historical Trend:** Decreasing from $1,650 to $1,450
- **Strategic Importance:** Marketing and sales efficiency

**Sparkline shows:** Downward trend (positive cost reduction)

---

## Metric Categories

### Lead Generation & Quality
- Marketing Qualified Leads (MQL)
- Sales Qualified Leads (SQL)
- Lead Conversion Rate

### Sales Efficiency
- Sales Cycle Length
- Pipeline Velocity
- Lead Conversion Rate

### Cost & ROI
- Customer Acquisition Cost (CAC)
- Marketing ROI
- Campaign Success Rate

---

## Visual Design

### Sparkline Features
- **Size:** 40px height, full width
- **Type:** Line chart
- **Animation:** None (for performance)
- **Points:** Hidden (line only)
- **Stroke:** 2px width
- **Color:** Metric-specific (matches theme)

### Card Layout
Each KPI card includes:
```
┌─────────────────────────────────┐
│ Metric Label            Target  │
│ 24%                     30%     │
│ ↑ +8%                           │
│ ～～～～～～～～～～              │  ← Sparkline
│  (trend visualization)          │
└─────────────────────────────────┘
```

---

## Data Structure

### KPI Object
```typescript
{
  label: string,              // Metric name
  value: string,              // Current value
  target: string,             // Target value
  trend: 'up' | 'down',       // Trend direction
  change: number,             // % change
  sparklineData: number[],    // 10 data points
  color: string               // Hex color
}
```

### Example
```typescript
{
  label: "Lead Conversion Rate",
  value: "24%",
  target: "30%",
  trend: "up",
  change: 8,
  sparklineData: [18, 19, 21, 20, 22, 23, 24, 25, 24, 24],
  color: "#00a4bf"
}
```

---

## Location in Dashboard

**Navigation Path:**
Admin → PF Dashboard → BSC Perspectives → Internal Tab → Sales & Marketing KPIs section

**Position:**
- Below Customer Feedback and PMF (Product-Market Fit) KPIs
- Below the 6 standard Internal Process metrics (Platform Uptime, API Response Time, etc.)
- Above Goals and Initiatives sections
- 2-column grid layout (responsive)

**Section Hierarchy in Internal Tab:**
```
Internal Process Perspective
├── Platform Operations Metrics (6 metrics)
│   ├── Platform Uptime
│   ├── API Response Time
│   ├── Data Processing Volume
│   ├── Model Accuracy
│   ├── Deployment Speed
│   └── Bug Resolution Time
├── Customer Feedback & PMF KPIs (if applicable)
├── Sales & Marketing KPIs (8 metrics with sparklines) ← YOU ARE HERE
├── Strategic Goals (4 goals)
└── Current Initiatives (4 initiatives)
```

---

## Business Insights

### Current Performance Summary

| Category | Status | Insight |
|----------|--------|---------|
| Lead Generation | 🟡 Moderate | MQLs and SQLs growing but below target |
| Conversion | 🟢 Good | Lead conversion improving steadily |
| Sales Efficiency | 🟡 Moderate | Cycle length decreasing, velocity increasing |
| Cost Optimization | 🟢 Good | CAC decreasing, ROI improving |
| Campaign Quality | 🟡 Moderate | Success rate improving, approaching target |

### Key Takeaways

1. **Positive Momentum:** All metrics showing improvement trends
2. **Gap to Target:** Most metrics still 20-30% below target
3. **Cost Efficiency:** CAC trending in right direction
4. **ROI Growth:** Strong 18% growth in marketing ROI

---

## Integration with Other Perspectives

### Finance Perspective
- CAC directly impacts Customer Acquisition Cost metric
- Marketing ROI feeds into overall profitability calculations
- Pipeline Velocity correlates with revenue projections

### Customer Perspective
- Lead quality affects customer satisfaction outcomes
- Campaign success rate impacts customer acquisition quality
- Conversion metrics reflect value proposition effectiveness

### Learning & Growth
- Sales cycle improvements driven by training initiatives
- Campaign optimization through continuous learning
- Process refinement based on KPI insights

---

## Usage Guidelines

### For Sales Teams
1. Monitor SQL trends to forecast pipeline health
2. Track Sales Cycle Length for process optimization
3. Use Pipeline Velocity for revenue forecasting
4. Review conversion rates for qualification improvements

### For Marketing Teams
1. Track MQL volume and quality trends
2. Monitor Campaign Success Rate for program effectiveness
3. Analyze Marketing ROI for budget allocation
4. Review CAC for cost optimization opportunities

### For Executives
1. Review all KPIs for comprehensive funnel health
2. Compare targets vs. actuals for strategic planning
3. Identify bottlenecks (e.g., low conversion, high cycle time)
4. Allocate resources based on ROI and velocity trends

---

## Sparkline Implementation

### Component Location
`/components/Sparkline.tsx`

### Usage Example
```tsx
import { Sparkline } from "../../components/Sparkline";

<Sparkline
  data={[18, 19, 21, 20, 22, 23, 24, 25, 24, 24]}
  color="#00a4bf"
  height={40}
/>
```

### Technical Details
- **Library:** Recharts (LineChart component)
- **Data Format:** Array of numbers
- **Responsive:** Full width of container
- **Performance:** No animations for faster rendering

---

## Future Enhancements

### Planned Features
- [ ] Drill-down to detailed metric history
- [ ] Comparative sparklines (current vs. previous period)
- [ ] Hoverable tooltips on sparkline points
- [ ] Export individual KPI data
- [ ] Customizable date ranges
- [ ] Real-time data updates
- [ ] Alerts when metrics fall below thresholds
- [ ] Predictive trend lines

### Advanced Analytics
- [ ] Correlation analysis between KPIs
- [ ] Seasonal pattern detection
- [ ] Anomaly detection on sparklines
- [ ] AI-powered insights and recommendations
- [ ] Cohort analysis by campaign/channel
- [ ] A/B test impact visualization

---

## Related Documentation

- `/docs/BSC_PERSPECTIVES.md` - Complete BSC framework
- `/docs/INTERNAL_PERSPECTIVE_STRUCTURE.md` - Internal tab section hierarchy and positioning
- `/docs/PLATFORM_DASHBOARD_SUMMARY.md` - Dashboard overview
- `/docs/PF_DASHBOARD_FILTERS.md` - Filtering system

---

## Glossary

- **MQL:** Marketing Qualified Lead - Lead meeting marketing criteria
- **SQL:** Sales Qualified Lead - Lead accepted by sales team
- **CAC:** Customer Acquisition Cost - Total cost / new customers
- **ROI:** Return on Investment - (Revenue - Cost) / Cost
- **Pipeline Velocity:** Rate of deal progression through sales funnel
- **Sparkline:** Inline micro-chart showing trend without axes

---

**Last Updated:** December 12, 2025
**Version:** 1.0
**Component:** PlatformDashboard - Internal Perspective
**Status:** Production Ready ✅