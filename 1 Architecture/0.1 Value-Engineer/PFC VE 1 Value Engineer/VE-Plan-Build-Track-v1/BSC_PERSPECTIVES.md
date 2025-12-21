# Balanced Scorecard (BSC) Perspectives - Platform Dashboard

## Overview

The Platform Dashboard now includes **4 subtabs** organized by Balanced Scorecard (BSC) perspectives, providing comprehensive business intelligence across different dimensions of organizational performance.

## The Four Perspectives

### 1. Customer Perspective 👥
**Focus:** Customer satisfaction, retention, and value delivery

**Key Metrics:**
- Customer Satisfaction (NPS): 42 (Target: 50)
- Customer Retention Rate: 92% (Target: 95%)
- Time to Value: 21 days (Target: 14 days)
- Active Users: 6.5K (Target: 10K)
- Feature Adoption Rate: 68% (Target: 85%)
- Customer Support CSAT: 85% (Target: 90%)

**Strategic Goals:**
- Achieve 90%+ customer satisfaction (NPS 50+)
- Reduce time-to-value to <14 days
- Increase adoption rate to 85%+
- Build community of 10k+ active users

**Current Initiatives:**
- AI-powered onboarding
- Customer success AI assistant
- Value tracking dashboard
- In-app guidance system

---

### 2. Internal Process Perspective 💼
**Focus:** Operational efficiency, quality, and internal process optimization

**Platform Operations Metrics:**
- Platform Uptime: 99.7% (Target: 99.9%)
- API Response Time: 145ms (Target: <100ms)
- Data Processing Volume: 7M/day (Target: 10M/day)
- Model Accuracy: 92% (Target: 95%)
- Deployment Speed: 72h (Target: 48h)
- Bug Resolution Time: 4.2h (Target: 3h)

**Customer Feedback & PMF (Product-Market Fit) KPIs:**
*(Section placeholder for future customer feedback and PMF metrics)*

**Sales & Marketing KPIs (with Sparklines):**
*Positioned below Customer Feedback & PMF KPIs*
- Lead Conversion Rate: 24% (Target: 30%) - Trending up +8%
- Marketing Qualified Leads: 342 (Target: 500) - Trending up +15%
- Sales Qualified Leads: 156 (Target: 200) - Trending up +12%
- Sales Cycle Length: 45 days (Target: 30 days) - Trending down -10%
- Marketing ROI: 3.2x (Target: 4.0x) - Trending up +18%
- Campaign Success Rate: 68% (Target: 75%) - Trending up +5%
- Pipeline Velocity: $2.4M (Target: $3.5M) - Trending up +22%
- Customer Acquisition Cost: $1,450 (Target: $1,200) - Trending down -8%

*Each sales & marketing KPI includes a sparkline visualization showing historical trend data*

**Strategic Goals:**
- Automate 80% of visibility reporting
- Deploy AI models in <48 hours
- Achieve 99.9% platform uptime
- Process 10M+ data points daily

**Current Initiatives:**
- ML pipeline automation
- Real-time analytics engine
- Infrastructure scaling
- DevOps optimization

---

### 3. Financial Perspective 💰
**Focus:** Revenue growth, profitability, and financial health

**Key Metrics:**
- Annual Recurring Revenue: $12M (Target: $50M)
- MRR Growth: 12% (Target: 15%)
- Gross Margin: 68% (Target: 70%)
- CAC Payback Period: 8 mo (Target: 6 mo)
- LTV:CAC Ratio: 4:1 (Target: 5:1)
- Net Revenue Retention: 115% (Target: 120%)

**Strategic Goals:**
- Reach $50M ARR by 2025
- Achieve profitability by Q4 2025
- Maintain 120%+ NDR
- Reduce CAC by 30%

**Current Initiatives:**
- Product-led growth strategy
- Pricing optimization
- Expansion revenue programs
- Cost efficiency initiatives

---

### 4. Learning & Growth Perspective 🎓
**Focus:** Innovation, employee development, and organizational capability building

**Key Metrics:**
- Training Hours per Quarter: 28h (Target: 40h)
- AI Models Deployed: 9 (Target: 15)
- Patents Filed: 2 (Target: 5)
- Research Papers Published: 4 (Target: 10)
- Certifications Achieved: 1 (Target: 3)
- Employee Satisfaction: 82% (Target: 90%)

**Strategic Goals:**
- Train team on latest AI/ML techniques
- Build proprietary AI visibility models
- Achieve ISO 27001 certification
- Develop 5+ AI patents

**Current Initiatives:**
- Continuous learning program
- R&D investment increase
- Innovation labs
- Industry partnerships

---

## Visual Features

### Metric Cards
Each perspective displays metrics in card format with:
- **Current Value** - Large display of current metric
- **Target Value** - Goal indicator on the right
- **Trend Arrow** - Visual up/down indicator
- **Change Percentage** - Growth or decline percentage
- **Color Coding**:
  - 🟢 Green = Positive trend (up arrow)
  - 🔴 Red = Negative trend (down arrow)
  - ⚪ Gray = Neutral (no change)

### Tab Navigation
- **4 Tabs:** Customer | Internal | Finance | Learning
- Each tab is color-coded and displays relevant icon
- Tabs are horizontally arranged for easy switching

### Goals & Initiatives Section
Below metrics, each perspective shows:
- **Goals:** Strategic objectives for that perspective
- **Initiatives:** Active programs driving toward goals

## Implementation Details

### Location
`/modules/baiv2/PlatformDashboard.tsx`

### State Management
```tsx
const [bscPerspective, setBscPerspective] = useState<string>("customer");
```

### Data Structure
```tsx
const bscPerspectives = {
  customer: {
    title: "Customer Perspective",
    icon: Users,
    color: "#00a4bf",
    metrics: [...],
    goals: [...],
    initiatives: [...]
  },
  // ... other perspectives
}
```

## Usage

### Navigating BSC Perspectives

1. **Access Dashboard**
   - Admin → PF Dashboard

2. **View BSC Card**
   - Scroll to "Balanced Scorecard Perspectives" section
   - Below the filter panel and metrics grid

3. **Switch Perspectives**
   - Click any of the 4 tabs: Customer, Internal, Finance, Learning
   - Content updates instantly

4. **Analyze Metrics**
   - Review current vs. target values
   - Check trend indicators
   - Read strategic goals
   - Review active initiatives

### Adding Custom Mermaid Visualization

You can add BSC perspective diagrams using Mermaid:

```tsx
import { MermaidDiagram } from "./components/MermaidDiagram";

const bscDiagram = `
  graph TB
    BSC[Balanced Scorecard]
    
    BSC --> Customer[Customer Perspective]
    BSC --> Internal[Internal Process]
    BSC --> Finance[Financial Perspective]
    BSC --> Learning[Learning & Growth]
    
    Customer --> C1[NPS: 42/50]
    Customer --> C2[Retention: 92%]
    
    Internal --> I1[Uptime: 99.7%]
    Internal --> I2[API: 145ms]
    
    Finance --> F1[ARR: $12M]
    Finance --> F2[NRR: 115%]
    
    Learning --> L1[Training: 28h]
    Learning --> L2[Patents: 2]
    
    style Customer fill:#00a4bf,stroke:#008ca0,color:#fff
    style Internal fill:#2196f3,stroke:#1976d2,color:#fff
    style Finance fill:#4caf50,stroke:#388e3c,color:#fff
    style Learning fill:#9c27b0,stroke:#7b1fa2,color:#fff
`;

<MermaidDiagram chart={bscDiagram} />
```

## Strategic Alignment

The BSC framework ensures:

1. **Balance** - Metrics across all business dimensions
2. **Cause & Effect** - Learning drives Internal, which drives Customer, which drives Finance
3. **Strategic Focus** - All metrics tied to organizational strategy
4. **Leading & Lagging** - Mix of predictive and outcome indicators

### Perspective Relationships

```
Learning & Growth → Internal Process → Customer → Financial
      ↑                                              ↓
      └──────────────────────────────────────────────┘
```

- **Learning** enables **Internal Process** improvements
- **Internal** efficiency drives **Customer** satisfaction
- **Customer** success generates **Financial** results
- **Financial** resources fund **Learning** investments

## Customization Guide

### Adding New Metrics

```tsx
// In PlatformDashboard.tsx
const bscPerspectives = {
  customer: {
    metrics: [
      // Add new metric
      { 
        label: "Net Promoter Score", 
        value: "45", 
        target: "60", 
        unit: "score", 
        trend: "up", 
        change: 10 
      },
    ],
  },
}
```

### Adding New Perspective

To add a 5th perspective (e.g., "Innovation"):

1. Add to `bscPerspectives` object
2. Add tab trigger: `<TabsTrigger value="innovation">Innovation</TabsTrigger>`
3. Add tab content with metrics
4. Update grid: `grid-cols-5`

## Best Practices

### For Viewers
- Review all 4 perspectives regularly (weekly/monthly)
- Compare current vs. target values
- Track trend changes over time
- Connect perspective insights (e.g., Learning improvements → Internal efficiency)

### For Administrators
- Update metrics data regularly (recommended: weekly)
- Keep targets realistic but challenging
- Align initiatives with strategic goals
- Ensure balanced attention across perspectives

### For Data Entry
- Maintain consistent metric definitions
- Use same measurement periods
- Document calculation methods
- Update goals quarterly

## Future Enhancements

- [ ] Add historical trend charts for each metric
- [ ] Enable drill-down into metric details
- [ ] Add perspective-to-perspective correlation analysis
- [ ] Implement alerts when metrics fall below threshold
- [ ] Add export to PDF/Excel
- [ ] Create custom perspective builder
- [ ] Add benchmark comparison against industry standards
- [ ] Integrate with Value Engineering OKRs

## Related Documentation

- `/docs/PF_DASHBOARD_FILTERS.md` - Instance and product filtering
- `/docs/MERMAID_GUIDE.md` - Creating BSC diagrams
- Value Engineering VE 150 - Business Framework integration

---

**Last Updated:** December 12, 2025
**Version:** 1.0
**Component:** PlatformDashboard