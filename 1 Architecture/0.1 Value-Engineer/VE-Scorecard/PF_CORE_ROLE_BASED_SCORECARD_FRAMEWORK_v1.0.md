# PF-Core Role-Based Scorecard Framework
## Meat Trade Sector - BSC Hierarchical Cascade Structure

**Document Version:** 1.0  
**Module:** PF-CORE VSOM-SCORECARD (Vision, Strategy, Objectives, Metrics - Scorecard)  
**Vertical:** International Meat Trade (Exporters, Importers, Wholesalers)  
**Registry Compliance:** OAA Registry v3.0  
**Status:** DRAFT  
**Date:** December 2025  

---

## 1. Executive Summary

This document defines the Role-Based Scorecard Framework for the international meat trade vertical, enabling every organizational role to access a personalized dashboard filtered to their scope of responsibility. The framework implements a Balanced Scorecard (BSC) approach with hierarchical OKR cascade visibility, ensuring strategic alignment from C-Suite through to frontline operatives.

### 1.1 Scorecard Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ROLE-BASED SCORECARD ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  AUTHENTICATION & ROLE RESOLUTION                                     │   │
│  │  User Login → Role Assignment → Scope Definition → View Rendering    │   │
│  └──────────────────────────────┬───────────────────────────────────────┘   │
│                                 │                                            │
│                                 ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  SCORECARD VIEW ENGINE                                                │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │   │
│  │  │ BSC         │ │ OKR         │ │ KPI         │ │ Team        │     │   │
│  │  │ Perspectives│ │ Cascade     │ │ Dashboard   │ │ Performance │     │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘     │   │
│  └──────────────────────────────┬───────────────────────────────────────┘   │
│                                 │                                            │
│                                 ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  HIERARCHICAL SCOPE FILTERING                                         │   │
│  │  Enterprise → Region → Site → Business Unit → Function → Team → Self │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Key Design Principles

| Principle | Description |
|-----------|-------------|
| **Role-Based Access** | Each user sees only data relevant to their role and scope |
| **Hierarchical Cascade** | Parent roles see aggregated child performance |
| **BSC Balance** | All five perspectives visible with role-weighted emphasis |
| **OKR Alignment** | Clear line-of-sight from Strategic Objectives to individual KRs |
| **Real-Time Status** | Health indicators updated at appropriate frequencies |
| **Drill-Down Capability** | Navigate from summary to detail at any level |
| **Sector Specificity** | Meat trade-specific metrics and terminology |

---

## 2. Role-Based Scope Definitions

### 2.1 Scope Hierarchy Model

```
SCOPE LEVEL 1: ENTERPRISE
├── All business units, regions, sites, functions
├── Visible to: CEO, CFO, CSO, Board
└── Aggregation: Full consolidation

SCOPE LEVEL 2: REGION
├── All sites and functions within geographic region
├── Visible to: Regional GM, Regional functional leads
└── Aggregation: Regional consolidation

SCOPE LEVEL 3: COUNTRY
├── All sites and functions within single country
├── Visible to: Country GM, Country functional leads
└── Aggregation: Country consolidation

SCOPE LEVEL 4: SITE
├── Single processing plant or distribution center
├── Visible to: Site GM, Site functional managers
└── Aggregation: Site-level metrics

SCOPE LEVEL 5: BUSINESS UNIT
├── Product line, channel, or market segment
├── Visible to: BU GM, BU functional leads
└── Aggregation: BU contribution metrics

SCOPE LEVEL 6: FUNCTION
├── Single functional area (Quality, Logistics, Sales, etc.)
├── Visible to: Functional Director, Functional Managers
└── Aggregation: Functional KPIs

SCOPE LEVEL 7: TEAM
├── Direct reports and their teams
├── Visible to: Managers, Supervisors
└── Aggregation: Team performance

SCOPE LEVEL 8: INDIVIDUAL
├── Personal OKRs and KPIs only
├── Visible to: Individual contributor
└── Aggregation: None (personal view)
```

### 2.2 Role-to-Scope Mapping Matrix

| Role | Primary Scope | Secondary Scope | Drill-Down Access |
|------|--------------|-----------------|-------------------|
| **CEO** | Enterprise | All | Full |
| **CFO** | Enterprise (Financial) | All (Financial metrics) | Full |
| **COO** | Enterprise (Operations) | All Sites, All Functions | Full |
| **CRO** | Enterprise (Commercial) | All Regions, All BUs | Full |
| **CQO** | Enterprise (Quality) | All Sites (Quality) | Full |
| **CCO** | Enterprise (Compliance) | All (Regulatory) | Full |
| **CSCO** | Enterprise (Supply Chain) | All Sites (SC) | Full |
| **Regional GM** | Region | Sites in Region | Region only |
| **Country GM** | Country | Sites in Country | Country only |
| **Site GM** | Site | Functions at Site | Site only |
| **BU GM** | Business Unit | BU Functions | BU only |
| **Director** | Function (Enterprise-wide) | Teams in Function | Function only |
| **Manager** | Team | Direct Reports | Team only |
| **Supervisor** | Team | Direct Reports | Team only |
| **Specialist** | Individual | Self | Self only |

---

## 3. Balanced Scorecard Structure

### 3.1 Five BSC Perspectives - Meat Trade Adaptation

| Perspective | Focus | Meat Trade Emphasis |
|-------------|-------|---------------------|
| **Financial** | Profitability, efficiency, capital | Margin, yield value, working capital (perishables) |
| **Customer** | Satisfaction, retention, growth | Service level, quality, specifications, relationships |
| **Internal Process** | Operations, quality, efficiency | Cold chain, food safety, throughput, yield |
| **Learning & Growth** | People, capability, innovation | Safety culture, skills, retention, technology |
| **Stakeholder** | Regulatory, partners, community | Export licenses, certifications, supplier relationships |

### 3.2 Perspective Weighting by Role

Different roles emphasize different BSC perspectives. Weightings determine dashboard prominence and alert priority.

| Role Level | Financial | Customer | Internal Process | Learning & Growth | Stakeholder |
|------------|-----------|----------|------------------|-------------------|-------------|
| **CEO** | 25% | 20% | 15% | 15% | 25% |
| **CFO** | 50% | 10% | 15% | 10% | 15% |
| **COO** | 20% | 15% | 40% | 15% | 10% |
| **CRO** | 30% | 40% | 10% | 10% | 10% |
| **CQO** | 10% | 25% | 40% | 10% | 15% |
| **CCO** | 10% | 10% | 25% | 10% | 45% |
| **CSCO** | 25% | 20% | 35% | 10% | 10% |
| **Regional GM** | 30% | 25% | 25% | 10% | 10% |
| **Site GM** | 25% | 15% | 35% | 15% | 10% |
| **BU GM** | 35% | 35% | 15% | 10% | 5% |
| **Director** | 20% | 20% | 30% | 20% | 10% |
| **Manager** | 15% | 20% | 40% | 20% | 5% |
| **Supervisor** | 10% | 15% | 50% | 20% | 5% |
| **Specialist** | 5% | 15% | 60% | 15% | 5% |

### 3.3 BSC Perspective Structure - Detailed

#### 3.3.1 Financial Perspective

```
FINANCIAL PERSPECTIVE
├── Revenue & Growth
│   ├── Total Revenue (vs. target, vs. prior)
│   ├── Revenue by Market/Channel/Product
│   ├── New Business Revenue
│   └── Revenue per Customer
│
├── Profitability
│   ├── Gross Margin (%)
│   ├── EBITDA (%)
│   ├── Net Profit (%)
│   └── Contribution by BU/Site
│
├── Efficiency
│   ├── Cost per kg/unit
│   ├── Yield Value ($ recovered per carcass)
│   ├── Labor Productivity (kg/labor hour)
│   └── Logistics Cost (% of revenue)
│
└── Capital & Cash
    ├── Working Capital Days
    ├── Inventory Turns
    ├── Debtor Days
    └── CapEx vs. Budget
```

#### 3.3.2 Customer Perspective

```
CUSTOMER PERSPECTIVE
├── Satisfaction & Loyalty
│   ├── Net Promoter Score (NPS)
│   ├── Customer Satisfaction Index
│   ├── Customer Retention Rate
│   └── Share of Wallet
│
├── Service Performance
│   ├── OTIF (On-Time In-Full) Delivery
│   ├── Order Fill Rate
│   ├── Lead Time Performance
│   └── Order Accuracy
│
├── Quality Performance
│   ├── Customer Complaint Rate
│   ├── Claims Value (% of sales)
│   ├── Specification Compliance
│   └── Returns Rate
│
└── Growth & Development
    ├── New Customer Acquisition
    ├── Customer Lifetime Value
    ├── Market Share
    └── Product Penetration
```

#### 3.3.3 Internal Process Perspective

```
INTERNAL PROCESS PERSPECTIVE
├── Operations Excellence
│   ├── Throughput (units/day)
│   ├── Capacity Utilization (%)
│   ├── Yield (%)
│   ├── Waste/Shrink (%)
│   └── Downtime (%)
│
├── Cold Chain Integrity
│   ├── Temperature Compliance (%)
│   ├── Cold Chain Excursions (#)
│   ├── Chiller Performance
│   └── Transport Temperature Compliance
│
├── Food Safety & Quality
│   ├── HACCP Compliance (%)
│   ├── Microbiological Pass Rate
│   ├── NCR Closure Rate
│   ├── Audit Scores
│   └── Traceability Test Success
│
├── Supply Chain
│   ├── Supplier OTD (%)
│   ├── Supplier Quality Rating
│   ├── Inventory Accuracy (%)
│   ├── Stock Days (by category)
│   └── Procurement Savings
│
└── Process Efficiency
    ├── Goods-In Turnaround Time
    ├── Order Processing Time
    ├── Pick Accuracy (%)
    └── Documentation Accuracy (%)
```

#### 3.3.4 Learning & Growth Perspective

```
LEARNING & GROWTH PERSPECTIVE
├── Safety Culture
│   ├── LTIFR (Lost Time Injury Frequency Rate)
│   ├── TRIFR (Total Recordable Injury Frequency Rate)
│   ├── Near Miss Reporting Rate
│   ├── Safety Training Completion
│   └── Safety Audit Score
│
├── People & Engagement
│   ├── Employee Engagement Score
│   ├── Turnover Rate (%)
│   ├── Absence Rate (%)
│   ├── Time to Fill Vacancies
│   └── Internal Promotion Rate
│
├── Capability Development
│   ├── Training Hours per Employee
│   ├── Competency Completion (%)
│   ├── Food Safety Certification (%)
│   ├── Leadership Development Progress
│   └── Skills Matrix Coverage
│
└── Technology & Innovation
    ├── System Uptime (%)
    ├── Automation Rate
    ├── Process Improvement Ideas
    └── Technology Project Delivery
```

#### 3.3.5 Stakeholder Perspective

```
STAKEHOLDER PERSPECTIVE
├── Regulatory Compliance
│   ├── Export Establishment Status
│   ├── Certification Currency (%)
│   ├── Audit Findings (Open/Closed)
│   ├── Regulatory Non-Conformances
│   └── Market Access Status
│
├── Supplier & Partner
│   ├── Supplier Compliance Rate
│   ├── Strategic Supplier Score
│   ├── Supplier Development Progress
│   └── Partnership Health
│
├── Sustainability & ESG
│   ├── Carbon Footprint (kg CO2/tonne)
│   ├── Water Usage (L/kg)
│   ├── Waste Diversion Rate
│   ├── Renewable Energy (%)
│   └── ESG Rating Score
│
└── Community & Industry
    ├── Industry Body Participation
    ├── Community Investment
    ├── Animal Welfare Scores
    └── Reputation Index
```

---

## 4. Hierarchical OKR Cascade Visibility

### 4.1 Cascade Visualization Model

Each role sees their OKRs plus the cascade context above and below:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCORECARD VIEW: Site GM (Tilbury Operations)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STRATEGIC CONTEXT (Read-Only)                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Vision: UK's most trusted meat importer...                             │ │
│  │ Strategic Objective: SO-P1 Achieve BRC AA Grade ●                      │ │
│  │ Strategic Objective: SO-P2 99.5% Cold Chain Compliance ●               │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  PARENT OKRs (Read-Only - Shows alignment)                                  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ COO Objective: Achieve operational excellence...         Progress: 72% │ │
│  │   └─ KR3: 99.5% cold chain compliance                   ● On Track    │ │
│  │   └─ KR4: BRC AA readiness                              ◐ At Risk     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  MY OKRs (Editable - Primary focus)                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Objective: Deliver operational excellence at Tilbury    Progress: 68%  │ │
│  │   KR1: Throughput 2,500 tonnes/month      2,380 ▲       ● On Track    │ │
│  │   KR2: Cold chain compliance 99.8%+       99.6%         ◐ At Risk     │ │
│  │   KR3: Operating cost £X/tonne            £X.2 ▼        ● On Track    │ │
│  │   KR4: Zero LTI                           0             ● On Track    │ │
│  │   KR5: BRC AA readiness 95%+              91%           ○ Behind      │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  TEAM OKRs (Read + Aggregate - Shows delegation)                            │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Operations Director (Tilbury)                           Progress: 71%  │ │
│  │   Objective: Maximize processing capacity...            ● On Track    │ │
│  │                                                                        │ │
│  │ Quality Director (Tilbury)                              Progress: 65%  │ │
│  │   Objective: Achieve food safety excellence...          ◐ At Risk     │ │
│  │                                                                        │ │
│  │ Logistics Director (Tilbury)                            Progress: 74%  │ │
│  │   Objective: Deliver flawless cold chain...             ● On Track    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Cascade Visibility Rules

| Role Level | Sees Above | Sees Own | Sees Below | Depth Below |
|------------|-----------|----------|-----------|-------------|
| **CEO** | Strategic Objectives only | CEO OKRs | All C-Suite, All GMs | Full depth |
| **C-Suite** | CEO OKRs, Strategic Objectives | Own OKRs | GMs + Directors in function | Full depth |
| **Regional GM** | C-Suite OKRs (relevant), Strategic Objectives | Own OKRs | Country/Site GMs, Regional Directors | 3 levels |
| **Site GM** | COO/Regional GM OKRs, Strategic Objectives | Own OKRs | Site Directors, Site Managers | 2 levels |
| **BU GM** | CRO/COO OKRs, Strategic Objectives | Own OKRs | BU Directors, BU Managers | 2 levels |
| **Director** | GM OKRs, C-Suite OKRs (function) | Own OKRs | Managers in function | 2 levels |
| **Manager** | Director OKRs | Own OKRs | Supervisors, Specialists | 1 level |
| **Supervisor** | Manager OKRs | Own OKRs | Team members | 1 level |
| **Specialist** | Supervisor/Manager OKRs | Own OKRs | None | None |

### 4.3 OKR Health Status Indicators

| Status | Icon | Progress | Color | Action Required |
|--------|------|----------|-------|-----------------|
| **On Track** | ● | ≥75% of expected | Green | Continue monitoring |
| **At Risk** | ◐ | 50-74% of expected | Yellow/Amber | Attention needed |
| **Behind** | ○ | <50% of expected | Red | Intervention required |
| **Achieved** | ✓ | 100% complete | Blue | Celebrate, close out |
| **Not Started** | ◌ | 0% | Gray | Initiate action |

---

## 5. Sector-Specific Scorecard Views

### 5.1 UK Meat Importer & Wholesaler Scorecard

#### 5.1.1 CEO Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  BRITISH PRIME MEATS - CEO SCORECARD                    Q1 2026 | Week 8   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STRATEGIC HEALTH SUMMARY                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Overall Strategy Progress: ████████████░░░░ 72%                        ││
│  │ Strategic Objectives: 12 On Track │ 2 At Risk │ 1 Behind               ││
│  │ C-Suite OKR Completion: 68%                                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  BSC PERSPECTIVE SUMMARY                                                    │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┬────────────┐│
│  │  FINANCIAL   │   CUSTOMER   │   PROCESS    │   LEARNING   │ STAKEHOLDER││
│  │      ●       │      ●       │      ◐       │      ●       │     ●      ││
│  │   On Track   │   On Track   │   At Risk    │   On Track   │  On Track  ││
│  │   Score: 78  │   Score: 74  │   Score: 62  │   Score: 71  │  Score: 85 ││
│  └──────────────┴──────────────┴──────────────┴──────────────┴────────────┘│
│                                                                              │
│  KEY METRICS AT A GLANCE                                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Revenue YTD      £18.2M / £19.2M target    ◐  95% │ ▲ +8% vs LY       ││
│  │ Gross Margin     17.8%  / 18.0% target     ●  99% │ ▲ +0.3pp vs LY    ││
│  │ NPS              41     / 42 target        ●  98% │ ▲ +6 vs LY        ││
│  │ OTIF             97.2%  / 98.0% target     ◐  99% │ ▼ -0.5pp vs LY    ││
│  │ Cold Chain       99.4%  / 99.5% target     ◐  99% │ ▲ +0.2pp vs LY    ││
│  │ BRC Readiness    91%    / 95% target       ○  96% │ NEW METRIC        ││
│  │ LTIFR            0      / 0 target         ●  100%│ ● MAINTAINED      ││
│  │ Export Licenses  100%   / 100% target      ●  100%│ ● ALL CURRENT     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ALERTS & EXCEPTIONS                                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ ⚠ BRC AA Readiness behind target - CQO intervention required           ││
│  │ ⚠ Cold Chain Zone 3 at 99.1% - Logistics review scheduled              ││
│  │ ✓ New Brazil supplier qualified - diversification on track             ││
│  │ ✓ 2 new key accounts signed - ahead of CRO target                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  C-SUITE OKR STATUS                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ CEO    ████████████░░░░ 72% ●  │ CCO    ██████████████░░ 82% ●        ││
│  │ CFO    █████████████░░░ 76% ●  │ CRO    ████████████░░░░ 74% ●        ││
│  │ COO    ██████████░░░░░░ 65% ◐  │ CMO    ███████████░░░░░ 68% ●        ││
│  │ CSCO   █████████████░░░ 78% ●  │ CTO    █████████░░░░░░░ 58% ◐        ││
│  │ CQO    █████████░░░░░░░ 61% ◐  │ CHRO   ██████████████░░ 81% ●        ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  [View Strategic Objectives] [View All OKRs] [Drill to Details] [Export]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5.1.2 Site GM Dashboard (Tilbury)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TILBURY OPERATIONS - SITE GM SCORECARD                 Q1 2026 | Week 8   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SITE PERFORMANCE SUMMARY                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Site OKR Progress: ████████████░░░░░░ 68%                              ││
│  │ Team OKR Average: 70%                                                  ││
│  │ Critical KPIs: 8 On Track │ 3 At Risk │ 1 Behind                       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  BSC PERSPECTIVE - SITE VIEW                                                │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┬────────────┐│
│  │  FINANCIAL   │   CUSTOMER   │   PROCESS    │   LEARNING   │ STAKEHOLDER││
│  │      ●       │      ●       │      ◐       │      ●       │     ●      ││
│  │  Cost: £X.2  │  OTIF: 97.2% │ Cold: 99.4%  │  LTIFR: 0    │ BRC: 91%   ││
│  │  Target: £X  │  Target: 98% │ Target:99.5% │  Target: 0   │ Target:95% ││
│  └──────────────┴──────────────┴──────────────┴──────────────┴────────────┘│
│                                                                              │
│  MY OKRs - Q1 2026                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ OBJECTIVE: Deliver operational excellence at Tilbury          68% ◐    ││
│  │ ─────────────────────────────────────────────────────────────────────  ││
│  │ KR1: Throughput 2,500 tonnes/month                                     ││
│  │      Current: 2,380 │ Progress: ██████████████░░░░ 85% ● ▲ Trending Up ││
│  │                                                                        ││
│  │ KR2: Cold chain compliance 99.8%+                                      ││
│  │      Current: 99.4% │ Progress: █████████████░░░░░ 75% ◐ ▼ Needs Focus ││
│  │      └─ Zone 1: 99.8% ● │ Zone 2: 99.6% ● │ Zone 3: 99.1% ○            ││
│  │                                                                        ││
│  │ KR3: Operating cost £X/tonne (5% reduction)                            ││
│  │      Current: £X.2  │ Progress: ████████████░░░░░░ 70% ● On Track      ││
│  │                                                                        ││
│  │ KR4: Zero LTI                                                          ││
│  │      Current: 0     │ Progress: ████████████████████ 100% ● Achieved   ││
│  │                                                                        ││
│  │ KR5: BRC AA readiness score 95%+                                       ││
│  │      Current: 91%   │ Progress: █████████░░░░░░░░░░ 45% ○ Behind       ││
│  │      └─ Gap Analysis: 12 actions remaining, 4 critical                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  DIRECT REPORT OKR STATUS                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Operations Director    ████████████░░░░░░ 71% ●                        ││
│  │   └─ Objective: Maximize processing capacity and efficiency            ││
│  │   └─ Risk: Equipment upgrade behind schedule                           ││
│  │                                                                        ││
│  │ Quality Director       ██████████░░░░░░░░ 65% ◐                        ││
│  │   └─ Objective: Achieve food safety excellence for BRC AA              ││
│  │   └─ Risk: 4 major NCRs still open, allergen project delayed           ││
│  │                                                                        ││
│  │ Logistics Director     █████████████░░░░░ 74% ●                        ││
│  │   └─ Objective: Deliver flawless cold chain and distribution           ││
│  │   └─ Risk: Zone 3 temperature monitoring needs attention               ││
│  │                                                                        ││
│  │ HR Manager (Site)      ██████████████░░░░ 78% ●                        ││
│  │   └─ Objective: Build capable, engaged site workforce                  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  OPERATIONAL KPIs - REAL TIME                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ TODAY                          │ WEEK TO DATE                          ││
│  │ Throughput: 112 tonnes (▲)     │ Throughput: 548 tonnes (98% target)   ││
│  │ Goods-In: 4 loads pending      │ Goods-In: 23 loads processed          ││
│  │ Dispatches: 8 complete, 3 pending│ OTIF: 97.8%                         ││
│  │ Temperature: All zones ✓       │ Temp Excursions: 1 (Zone 3)           ││
│  │ Staff: 94% attendance          │ Absence Rate: 4.2%                    ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  [Update OKR Progress] [View Team Details] [Escalate Issue] [Reports]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5.1.3 QA Manager Dashboard (Tilbury)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  QUALITY ASSURANCE - QA MANAGER SCORECARD               Q1 2026 | Week 8   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ALIGNMENT CONTEXT                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Strategic Objective: SO-P1 Achieve BRC AA grade certification     ○    ││
│  │ Quality Director OKR: Achieve food safety excellence...           65%  ││
│  │   └─ KR1: Complete internal audits (<3 major findings)            ◐    ││
│  │   └─ KR3: 100% traceability test success                          ●    ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  MY OKRs - Q1 2026                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ OBJECTIVE: Execute food safety controls to BRC AA standard       62% ◐ ││
│  │ ─────────────────────────────────────────────────────────────────────  ││
│  │ KR1: Complete scheduled internal audits, action closure <14 days       ││
│  │      Audits Complete: 6/12 │ Avg Closure: 11 days │ 72% ●              ││
│  │      └─ Feb Audit: 2 major, 5 minor │ Actions: 4/7 closed              ││
│  │                                                                        ││
│  │ KR2: Achieve <3 customer quality complaints per month                  ││
│  │      Jan: 4 │ Feb: 2 │ Mar MTD: 1 │ 85% ●                              ││
│  │      └─ Complaint Categories: Spec (2), Foreign Body (1), Temp (1)     ││
│  │                                                                        ││
│  │ KR3: 100% traceability test success (complete <4 hours)                ││
│  │      Tests: 4/4 pass │ Avg Time: 2.8 hrs │ 100% ●                      ││
│  │                                                                        ││
│  │ KR4: All CCP monitoring records accurate and complete                  ││
│  │      Compliance: 98.2% │ Target: 100% │ 82% ◐                          ││
│  │      └─ Gaps: CCP3 (metal detection) - 3 missed checks this week       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  TEAM PERFORMANCE                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ QC Supervisor (Goods-In)       █████████████░░░░░ 75% ●                ││
│  │   └─ KR: 100% incoming inspection within 1 hour                        ││
│  │   └─ Status: 96% achieved, 2 delays due to paperwork                   ││
│  │                                                                        ││
│  │ QC Supervisor (Dispatch)       ██████████████░░░░ 82% ●                ││
│  │   └─ KR: <0.1% false release                                           ││
│  │   └─ Status: 0.05% - on target                                         ││
│  │                                                                        ││
│  │ Documentation Coordinator      █████████████░░░░░ 78% ●                ││
│  │   └─ KR: 100% certificate accuracy                                     ││
│  │   └─ Status: 99.2% - 2 corrections required this month                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  QUALITY KPIs - OPERATIONAL                                                 │
│  ┌──────────────────────────────────┬──────────────────────────────────────┐│
│  │ FOOD SAFETY                      │ QUALITY CONTROL                      ││
│  │ CCP Compliance: 98.2% ◐          │ Goods-In Reject: 1.2% ●              ││
│  │ Micro Pass Rate: 99.8% ●         │ Customer Complaints: 2/month ●       ││
│  │ Allergen Controls: 100% ●        │ Spec Compliance: 98.5% ●             ││
│  │ Hygiene Audits: 94% ●            │ Returns Rate: 0.3% ●                 ││
│  ├──────────────────────────────────┼──────────────────────────────────────┤│
│  │ AUDIT STATUS                     │ NCR STATUS                           ││
│  │ Internal Audits: 6/12 done       │ Open NCRs: 8 (2 major, 6 minor)      ││
│  │ Next Audit: Week 10 (Hygiene)    │ Avg Age: 12 days                     ││
│  │ BRC Surveillance: Week 18        │ Overdue: 1 (Major - Allergen)        ││
│  └──────────────────────────────────┴──────────────────────────────────────┘│
│                                                                              │
│  [Update OKRs] [Log NCR] [View Audit Schedule] [Traceability Test]         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Australian Meat Exporter Scorecard

#### 5.2.1 CEO Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  OUTBACK PREMIUM EXPORTS - CEO SCORECARD                Q1 2026 | Week 8   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STRATEGIC HEALTH SUMMARY                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Overall Strategy Progress: █████████████░░░░░ 74%                      ││
│  │ Strategic Objectives: 13 On Track │ 1 At Risk │ 1 Behind               ││
│  │ China GACC Renewal: ● SECURED (Critical Risk Mitigated)                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  BSC PERSPECTIVE SUMMARY                                                    │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┬────────────┐│
│  │  FINANCIAL   │   CUSTOMER   │   PROCESS    │   LEARNING   │ STAKEHOLDER││
│  │      ●       │      ●       │      ◐       │      ◐       │     ●      ││
│  │   On Track   │   On Track   │   At Risk    │   At Risk    │  On Track  ││
│  │   Score: 81  │   Score: 78  │   Score: 68  │   Score: 64  │  Score: 88 ││
│  └──────────────┴──────────────┴──────────────┴──────────────┴────────────┘│
│                                                                              │
│  KEY METRICS AT A GLANCE                                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Revenue YTD      A$112M / A$115M target   ●  97% │ ▲ +12% vs LY       ││
│  │ EBITDA Margin    8.2%   / 8.0% target     ●  103%│ ▲ +1.1pp vs LY     ││
│  │ Japan Revenue    A$47M  / A$48M target    ●  98% │ ▲ +9% vs LY        ││
│  │ Korea Revenue    A$29M  / A$30M target    ●  97% │ ▲ +18% vs LY       ││
│  │ MSA Compliance   54.8%  / 55% target      ◐  99% │ ▲ +2.8pp vs LY     ││
│  │ Boning Yield     71.8%  / 72% target      ◐  99% │ ▲ +1.3pp vs LY     ││
│  │ LTIFR            2.1    / 0 target        ○  --  │ ▼ vs 0 target      ││
│  │ Export Status    100%   / 100% target     ●  100%│ ● ALL MARKETS OPEN ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  MARKET PERFORMANCE                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ JAPAN        ████████████████░░ 98%  A$47M   │ Chilled: 33% (+2pp)    ││
│  │ KOREA        ███████████████░░░ 97%  A$29M   │ Growth: +18% YoY       ││
│  │ USA          █████████████░░░░░ 82%  A$17M   │ Branded program: Launch││
│  │ MIDDLE EAST  ██████████████░░░░ 88%  A$11M   │ Halal: 100% compliant  ││
│  │ CHINA        ████████████████░░ 95%  A$8M    │ GACC: Renewed ●        ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ALERTS & EXCEPTIONS                                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ ⚠ LTIFR at 2.1 - Safety intervention required at Toowoomba            ││
│  │ ⚠ MSA compliance trending to miss 56% target - cattle pathway review   ││
│  │ ✓ China GACC registration renewed - critical risk mitigated            ││
│  │ ✓ Japan preferred supplier status achieved with 2 new accounts         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  GM / C-SUITE OKR STATUS                                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Site GM (Toowoomba)    ██████████░░░░░░░░ 62% ◐  │ Safety concern      ││
│  │ Regional GM (APAC)     █████████████░░░░░ 76% ●  │ Japan strong        ││
│  │ Regional GM (Americas) ███████████░░░░░░░ 68% ●  │ USA program launch  ││
│  │ BU GM (Livestock)      █████████████░░░░░ 78% ●  │ Supply secured      ││
│  │ COO                    ██████████░░░░░░░░ 64% ◐  │ MSA/Yield focus     ││
│  │ CRO                    █████████████░░░░░ 77% ●  │ Markets on track    ││
│  │ CQO                    ████████████░░░░░░ 72% ●  │ Export compliance   ││
│  │ CCO                    ██████████████████ 92% ●  │ GACC success        ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  [View Strategic Objectives] [View All OKRs] [Market Deep Dive] [Export]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5.2.2 Regional GM Dashboard (Japan & Korea)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  APAC MARKETS - REGIONAL GM SCORECARD                   Q1 2026 | Week 8   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  REGION PERFORMANCE SUMMARY                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Regional OKR Progress: █████████████░░░░░ 76%                          ││
│  │ Japan: A$47M (98% target) │ Korea: A$29M (97% target)                  ││
│  │ Customer Claims: 4 (Target: <8) ●                                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  BSC PERSPECTIVE - REGIONAL VIEW                                            │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┬────────────┐│
│  │  FINANCIAL   │   CUSTOMER   │   PROCESS    │   LEARNING   │ STAKEHOLDER││
│  │      ●       │      ●       │      ●       │      ●       │     ●      ││
│  │  Rev: A$76M  │  Claims: 4   │  Fill: 98.2% │  Team: 92%   │ Protocol:  ││
│  │  Target:$78M │  Target: <8  │  Target: 98% │  Engaged     │ Compliant  ││
│  └──────────────┴──────────────┴──────────────┴──────────────┴────────────┘│
│                                                                              │
│  MY OKRs - Q1 2026                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ OBJECTIVE: Strengthen leadership in Japan, accelerate Korea     76% ●  ││
│  │ ─────────────────────────────────────────────────────────────────────  ││
│  │ KR1: Japan revenue A$48M                                               ││
│  │      Current: A$47M │ Progress: ███████████████░░░ 98% ●               ││
│  │                                                                        ││
│  │ KR2: Korea revenue A$30M (15% growth)                                  ││
│  │      Current: A$29M │ Progress: ███████████████░░░ 97% ●               ││
│  │                                                                        ││
│  │ KR3: Preferred supplier status with 3 additional Japan customers       ││
│  │      Achieved: 2/3  │ Progress: ██████████████░░░░ 85% ●               ││
│  │      └─ Secured: Itoham, Starzen │ In Progress: NH Foods               ││
│  │                                                                        ││
│  │ KR4: Chilled beef share 35% of Japan volume                            ││
│  │      Current: 33%   │ Progress: █████████████░░░░░ 78% ●               ││
│  │                                                                        ││
│  │ KR5: Customer claim rate <0.5%                                         ││
│  │      Current: 0.35% │ Progress: █████████████████░░ 100% ●             ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  COUNTRY/FUNCTION PERFORMANCE                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Sales Director (Japan)         █████████████░░░░░ 78% ●                ││
│  │   └─ Target accounts: 2/2 converted                                    ││
│  │   └─ Chilled volume: +12% (target +15%)                                ││
│  │   └─ Customer visits: 8/10 complete                                    ││
│  │                                                                        ││
│  │ Sales Director (Korea)         ██████████████░░░░ 82% ●                ││
│  │   └─ Volume growth: +18% (target +15%) ✓ Exceeded                      ││
│  │   └─ New accounts: 2/3 won                                             ││
│  │   └─ KFDA registration: In progress                                    ││
│  │                                                                        ││
│  │ Market Development Manager     ████████████░░░░░░ 71% ●                ││
│  │   └─ SE Asia expansion study: Complete                                 ││
│  │   └─ Trade show participation: 2/3 complete                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  MARKET KPIs                                                                │
│  ┌──────────────────────────────────┬──────────────────────────────────────┐│
│  │ JAPAN                            │ KOREA                                ││
│  │ Revenue: A$47M (98%) ●           │ Revenue: A$29M (97%) ●               ││
│  │ Chilled Share: 33% (94%) ●       │ Volume Growth: +18% (120%) ●         ││
│  │ Order Fill: 98.5% ●              │ Order Fill: 97.8% ●                  ││
│  │ Claims: 2 (target <4) ●          │ Claims: 2 (target <4) ●              ││
│  │ Preferred Suppliers: 5 (+2) ●    │ New Accounts: 2 (+2) ●               ││
│  │ Protocol Compliance: 100% ●      │ Protocol Compliance: 100% ●          ││
│  └──────────────────────────────────┴──────────────────────────────────────┘│
│                                                                              │
│  [Update OKRs] [Customer Deep Dive] [Market Analysis] [Reports]            │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5.2.3 Production Manager (Boning Room) Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  BONING ROOM - PRODUCTION MANAGER SCORECARD             Q1 2026 | Week 8   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ALIGNMENT CONTEXT                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Strategic Objective: SO-P3 Reduce processing cost/kg by 8%        ◐    ││
│  │ Site GM OKR: Boning yield 72.5%                                   71.8% ││
│  │ Operations Director OKR: Boning yield 72.5%+                      ◐    ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  MY OKRs - Q1 2026                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ OBJECTIVE: Maximize yield and quality in boning operations       68% ◐ ││
│  │ ─────────────────────────────────────────────────────────────────────  ││
│  │ KR1: Achieve boning yield of 72%+                                      ││
│  │      Current: 71.8% │ Target: 72% │ Progress: ███████████████░░░ 92% ◐ ││
│  │      └─ Trend: ▲ +0.3pp this week │ Best shift: 72.4% (Tue AM)         ││
│  │                                                                        ││
│  │ KR2: <0.5% rework rate                                                 ││
│  │      Current: 0.42% │ Target: 0.5% │ Progress: █████████████████░ 100%●││
│  │      └─ Main cause: Trim specification (60% of rework)                 ││
│  │                                                                        ││
│  │ KR3: 100% specification compliance                                     ││
│  │      Current: 98.5% │ Target: 100% │ Progress: ███████████████░░ 85% ◐ ││
│  │      └─ Spec failures: Portion weight (8), Fat trim (4)                ││
│  │                                                                        ││
│  │ KR4: Labor efficiency target (kg/labor hour)                           ││
│  │      Current: 42.3kg │ Target: 44kg │ Progress: ███████████████░░ 89% ●││
│  │      └─ Training impact: New starters averaging 38kg (improving)       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  TEAM PERFORMANCE                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ TEAM LEADERS                     │ YIELD BY TEAM                        ││
│  │ Team A (AM Shift)         74% ●  │ Team A: 72.1% ●                      ││
│  │   └─ Yield: 72.1% │ Safety: ✓    │ Team B: 71.6% ◐                      ││
│  │ Team B (AM Shift)         68% ◐  │ Team C: 71.4% ◐                      ││
│  │   └─ Yield: 71.6% │ Safety: ✓    │ Team D: 72.2% ●                      ││
│  │ Team C (PM Shift)         66% ◐  │                                      ││
│  │   └─ Yield: 71.4% │ Safety: ✓    │ BEST PERFORMERS                      ││
│  │ Team D (PM Shift)         75% ●  │ 1. J. Smith: 73.8%                   ││
│  │   └─ Yield: 72.2% │ Safety: ✓    │ 2. M. Chen: 73.2%                    ││
│  │                                  │ 3. A. Patel: 72.9%                   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  OPERATIONAL KPIs - TODAY                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ PRODUCTION                       │ QUALITY                              ││
│  │ Carcasses Processed: 385/400     │ Spec Compliance: 98.8%               ││
│  │ Yield (Today): 71.9%             │ Rework: 0.38%                        ││
│  │ Output (kg): 28,420              │ Trim Accuracy: 97.2%                 ││
│  │ Labor Hours: 672                 │ Foreign Body: 0                      ││
│  │ kg/Labor Hour: 42.3              │                                      ││
│  ├─────────────────────────────────────────────────────────────────────────┤│
│  │ SAFETY                           │ STAFFING                             ││
│  │ Incidents Today: 0 ●             │ Attendance: 96%                      ││
│  │ Near Misses: 1 (knife handling)  │ Agency Staff: 4                      ││
│  │ PPE Compliance: 100%             │ Training: 2 in progress              ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  YIELD TREND (Last 4 Weeks)                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 72.5% ┤                                          ╭─ Target             ││
│  │ 72.0% ┤                              ╭───────────╯                      ││
│  │ 71.5% ┤              ╭───────────────╯                                  ││
│  │ 71.0% ┤──────────────╯                                                  ││
│  │ 70.5% ┤                                                                 ││
│  │       └──────────────────────────────────────────────────────────────   ││
│  │         Week 5    Week 6    Week 7    Week 8                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  [Update OKRs] [Log Yield] [Team Performance] [Safety Report]              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Scorecard Data Architecture

### 6.1 Database Schema Overview

```sql
-- Core Scorecard Tables (Supabase PostgreSQL)

-- Role-based access and scope
CREATE TABLE scorecard_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    role_code VARCHAR(20) NOT NULL,
    role_level INTEGER NOT NULL, -- 1=C-Suite, 1.5=GM, 2=Director, etc.
    scope_type VARCHAR(20) NOT NULL, -- enterprise, region, country, site, bu, function, team
    scope_id UUID, -- Reference to specific scope entity
    primary_bsc_perspective VARCHAR(30),
    perspective_weights JSONB, -- {"financial": 25, "customer": 20, ...}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL
);

-- BSC Perspective Scores
CREATE TABLE scorecard_bsc_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scope_type VARCHAR(20) NOT NULL,
    scope_id UUID NOT NULL,
    perspective VARCHAR(30) NOT NULL, -- financial, customer, process, learning, stakeholder
    score DECIMAL(5,2),
    health_status VARCHAR(20), -- on_track, at_risk, behind
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    component_scores JSONB, -- Detailed breakdown
    tenant_id UUID NOT NULL
);

-- OKR Cascade Structure
CREATE TABLE scorecard_okrs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_title VARCHAR(500) NOT NULL,
    objective_description TEXT,
    owner_user_id UUID NOT NULL,
    owner_role_code VARCHAR(20) NOT NULL,
    scope_type VARCHAR(20) NOT NULL,
    scope_id UUID,
    parent_okr_id UUID REFERENCES scorecard_okrs(id), -- Cascade link
    aligned_strategic_objective_id UUID,
    quarter VARCHAR(10) NOT NULL, -- Q1-2026
    status VARCHAR(20) DEFAULT 'not_started',
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    health_status VARCHAR(20) DEFAULT 'not_started',
    bsc_perspectives JSONB, -- ["financial", "process"]
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL
);

-- Key Results
CREATE TABLE scorecard_key_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    okr_id UUID REFERENCES scorecard_okrs(id) NOT NULL,
    kr_number INTEGER NOT NULL,
    description VARCHAR(500) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_unit VARCHAR(50),
    baseline_value DECIMAL(15,4),
    target_value DECIMAL(15,4) NOT NULL,
    current_value DECIMAL(15,4),
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    health_status VARCHAR(20) DEFAULT 'not_started',
    measurement_frequency VARCHAR(20), -- daily, weekly, monthly
    data_source VARCHAR(100),
    trend VARCHAR(10), -- up, down, stable
    last_updated TIMESTAMPTZ,
    tenant_id UUID NOT NULL
);

-- KPI Definitions
CREATE TABLE scorecard_kpis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_code VARCHAR(50) NOT NULL,
    kpi_name VARCHAR(200) NOT NULL,
    kpi_description TEXT,
    bsc_perspective VARCHAR(30) NOT NULL,
    category VARCHAR(50), -- e.g., cold_chain, food_safety, yield
    unit VARCHAR(50),
    direction VARCHAR(10), -- higher_better, lower_better
    measurement_frequency VARCHAR(20),
    applicable_scope_types JSONB, -- ["site", "function"]
    applicable_roles JSONB, -- ["site_gm", "qa_manager"]
    sector VARCHAR(50) DEFAULT 'meat_trade',
    is_leading_indicator BOOLEAN DEFAULT FALSE,
    threshold_green DECIMAL(15,4),
    threshold_yellow DECIMAL(15,4),
    threshold_red DECIMAL(15,4),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL
);

-- KPI Values (Time Series)
CREATE TABLE scorecard_kpi_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID REFERENCES scorecard_kpis(id) NOT NULL,
    scope_type VARCHAR(20) NOT NULL,
    scope_id UUID NOT NULL,
    period_date DATE NOT NULL,
    value DECIMAL(15,4),
    health_status VARCHAR(20),
    trend VARCHAR(10),
    notes TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    recorded_by UUID,
    tenant_id UUID NOT NULL,
    UNIQUE(kpi_id, scope_id, period_date, tenant_id)
);

-- Scorecard Views (Role-based dashboard configs)
CREATE TABLE scorecard_view_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_code VARCHAR(20) NOT NULL,
    view_name VARCHAR(100) NOT NULL,
    layout_config JSONB NOT NULL, -- Dashboard layout
    default_filters JSONB,
    kpi_display_order JSONB,
    perspective_weights JSONB,
    refresh_frequency VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL
);

-- Alerts & Exceptions
CREATE TABLE scorecard_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_type VARCHAR(50) NOT NULL, -- kpi_breach, okr_at_risk, target_achieved
    severity VARCHAR(20) NOT NULL, -- critical, warning, info
    scope_type VARCHAR(20) NOT NULL,
    scope_id UUID NOT NULL,
    related_entity_type VARCHAR(50), -- okr, kpi, key_result
    related_entity_id UUID,
    message TEXT NOT NULL,
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID,
    resolved_at TIMESTAMPTZ,
    tenant_id UUID NOT NULL
);
```

### 6.2 View Generation Logic

```sql
-- Function to get scorecard data for a specific user/role
CREATE OR REPLACE FUNCTION get_scorecard_view(
    p_user_id UUID,
    p_tenant_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_role RECORD;
    v_result JSONB;
BEGIN
    -- Get user's role and scope
    SELECT * INTO v_role 
    FROM scorecard_user_roles 
    WHERE user_id = p_user_id AND tenant_id = p_tenant_id;
    
    -- Build scorecard based on role scope
    SELECT jsonb_build_object(
        'role', v_role.role_code,
        'scope', jsonb_build_object(
            'type', v_role.scope_type,
            'id', v_role.scope_id
        ),
        'bsc_perspectives', (
            SELECT jsonb_agg(jsonb_build_object(
                'perspective', perspective,
                'score', score,
                'health_status', health_status,
                'weight', (v_role.perspective_weights->>perspective)::INTEGER
            ))
            FROM scorecard_bsc_scores
            WHERE scope_type = v_role.scope_type
              AND scope_id = v_role.scope_id
              AND tenant_id = p_tenant_id
              AND period_end >= CURRENT_DATE
        ),
        'my_okrs', (
            SELECT jsonb_agg(okr_data ORDER BY created_at DESC)
            FROM (
                SELECT jsonb_build_object(
                    'id', o.id,
                    'objective', o.objective_title,
                    'progress', o.progress_percentage,
                    'health_status', o.health_status,
                    'key_results', (
                        SELECT jsonb_agg(jsonb_build_object(
                            'id', kr.id,
                            'description', kr.description,
                            'current', kr.current_value,
                            'target', kr.target_value,
                            'progress', kr.progress_percentage,
                            'health_status', kr.health_status,
                            'trend', kr.trend
                        ))
                        FROM scorecard_key_results kr
                        WHERE kr.okr_id = o.id
                    )
                ) as okr_data
                FROM scorecard_okrs o
                WHERE o.owner_user_id = p_user_id
                  AND o.tenant_id = p_tenant_id
            ) sub
        ),
        'team_okrs', (
            -- Get OKRs of direct reports based on scope
            SELECT jsonb_agg(team_okr_data)
            FROM (
                SELECT jsonb_build_object(
                    'owner_name', u.raw_user_meta_data->>'full_name',
                    'owner_role', o.owner_role_code,
                    'objective', o.objective_title,
                    'progress', o.progress_percentage,
                    'health_status', o.health_status
                ) as team_okr_data
                FROM scorecard_okrs o
                JOIN auth.users u ON o.owner_user_id = u.id
                WHERE o.parent_okr_id IN (
                    SELECT id FROM scorecard_okrs 
                    WHERE owner_user_id = p_user_id
                )
                AND o.tenant_id = p_tenant_id
            ) sub
        ),
        'kpis', (
            SELECT jsonb_agg(kpi_data)
            FROM (
                SELECT jsonb_build_object(
                    'kpi_code', k.kpi_code,
                    'kpi_name', k.kpi_name,
                    'perspective', k.bsc_perspective,
                    'current_value', v.value,
                    'health_status', v.health_status,
                    'trend', v.trend,
                    'unit', k.unit
                ) as kpi_data
                FROM scorecard_kpis k
                JOIN scorecard_kpi_values v ON k.id = v.kpi_id
                WHERE v.scope_type = v_role.scope_type
                  AND v.scope_id = v_role.scope_id
                  AND v.tenant_id = p_tenant_id
                  AND k.applicable_roles ? v_role.role_code
                  AND v.period_date = (
                      SELECT MAX(period_date) 
                      FROM scorecard_kpi_values 
                      WHERE kpi_id = k.id AND scope_id = v_role.scope_id
                  )
            ) sub
        ),
        'alerts', (
            SELECT jsonb_agg(alert_data)
            FROM (
                SELECT jsonb_build_object(
                    'type', alert_type,
                    'severity', severity,
                    'message', message,
                    'triggered_at', triggered_at
                ) as alert_data
                FROM scorecard_alerts
                WHERE scope_type = v_role.scope_type
                  AND scope_id = v_role.scope_id
                  AND tenant_id = p_tenant_id
                  AND resolved_at IS NULL
                ORDER BY triggered_at DESC
                LIMIT 10
            ) sub
        )
    ) INTO v_result;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 7. Sector-Specific KPI Library

### 7.1 UK Importer & Wholesaler KPIs

#### 7.1.1 Financial KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| FIN-REV-001 | Revenue vs. Target | % | Higher | Monthly | ≥100% | 95-99% | <95% |
| FIN-GM-001 | Gross Margin | % | Higher | Monthly | ≥18% | 16-17.9% | <16% |
| FIN-COST-001 | Cost per Tonne | £ | Lower | Monthly | ≤Target | +1-5% | >+5% |
| FIN-WC-001 | Working Capital Days | Days | Lower | Monthly | ≤35 | 36-45 | >45 |
| FIN-INV-001 | Inventory Turns | # | Higher | Monthly | ≥24 | 18-23 | <18 |
| FIN-LOG-001 | Logistics Cost % | % | Lower | Monthly | ≤8% | 8.1-10% | >10% |

#### 7.1.2 Customer KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| CUS-NPS-001 | Net Promoter Score | Score | Higher | Quarterly | ≥50 | 30-49 | <30 |
| CUS-OTIF-001 | OTIF Delivery | % | Higher | Daily | ≥98% | 95-97.9% | <95% |
| CUS-COMP-001 | Customer Complaints | Per 1000 orders | Lower | Weekly | ≤3 | 3.1-5 | >5 |
| CUS-RET-001 | Customer Retention | % | Higher | Quarterly | ≥95% | 90-94% | <90% |
| CUS-FILL-001 | Order Fill Rate | % | Higher | Daily | ≥99% | 97-98.9% | <97% |
| CUS-LEAD-001 | Order Lead Time | Hours | Lower | Daily | ≤24 | 25-48 | >48 |

#### 7.1.3 Internal Process KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| PRO-CC-001 | Cold Chain Compliance | % | Higher | Daily | ≥99.5% | 98-99.4% | <98% |
| PRO-CC-002 | Temperature Excursions | # per week | Lower | Weekly | 0 | 1-2 | >2 |
| PRO-GI-001 | Goods-In Turnaround | Hours | Lower | Daily | ≤2 | 2.1-4 | >4 |
| PRO-INV-001 | Inventory Accuracy | % | Higher | Weekly | ≥99% | 97-98.9% | <97% |
| PRO-PICK-001 | Pick Accuracy | % | Higher | Daily | ≥99.8% | 99-99.7% | <99% |
| PRO-DOC-001 | Documentation Accuracy | % | Higher | Daily | ≥99.5% | 98-99.4% | <98% |
| PRO-HACCP-001 | HACCP Compliance | % | Higher | Daily | 100% | 98-99% | <98% |
| PRO-MICRO-001 | Micro Pass Rate | % | Higher | Weekly | ≥99% | 97-98.9% | <97% |
| PRO-TRACE-001 | Traceability Test Time | Hours | Lower | Monthly | ≤4 | 4.1-6 | >6 |
| PRO-NCR-001 | NCR Closure Rate (14 days) | % | Higher | Weekly | ≥90% | 75-89% | <75% |

#### 7.1.4 Learning & Growth KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| LG-LTIFR-001 | LTIFR | Rate | Lower | Monthly | 0 | 0.1-3 | >3 |
| LG-ENG-001 | Employee Engagement | Score | Higher | Quarterly | ≥75 | 60-74 | <60 |
| LG-TURN-001 | Staff Turnover | % | Lower | Monthly | ≤15% | 16-25% | >25% |
| LG-TRAIN-001 | Training Completion | % | Higher | Monthly | ≥95% | 85-94% | <85% |
| LG-FS-001 | Food Safety Certification | % | Higher | Monthly | 100% | 95-99% | <95% |

#### 7.1.5 Stakeholder KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| STK-BRC-001 | BRC Audit Score | % | Higher | Annual | ≥90% | 80-89% | <80% |
| STK-CERT-001 | Certification Currency | % | Higher | Monthly | 100% | 95-99% | <95% |
| STK-IPAFFS-001 | IPAFFS Accuracy | % | Higher | Daily | ≥99% | 97-98.9% | <97% |
| STK-REJ-001 | Border Rejections | # per month | Lower | Monthly | 0 | 1 | >1 |
| STK-SUP-001 | Supplier Compliance | % | Higher | Monthly | ≥95% | 90-94% | <90% |

### 7.2 Australian Exporter KPIs

#### 7.2.1 Financial KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| FIN-REV-001 | Revenue vs. Target | % | Higher | Monthly | ≥100% | 95-99% | <95% |
| FIN-EBITDA-001 | EBITDA Margin | % | Higher | Monthly | ≥10% | 8-9.9% | <8% |
| FIN-YIELD-001 | Yield Value per Head | A$ | Higher | Weekly | ≥Target | -1-5% | <-5% |
| FIN-COST-001 | Processing Cost/kg | A$ | Lower | Weekly | ≤Target | +1-5% | >+5% |
| FIN-LABOR-001 | Labor Productivity (kg/hr) | kg | Higher | Daily | ≥Target | -1-5% | <-5% |

#### 7.2.2 Customer KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| CUS-FILL-001 | Order Fill Rate | % | Higher | Weekly | ≥98% | 95-97.9% | <95% |
| CUS-CLAIM-001 | Customer Claims | % of sales | Lower | Monthly | ≤0.3% | 0.31-0.5% | >0.5% |
| CUS-SPEC-001 | Specification Compliance | % | Higher | Daily | ≥99% | 97-98.9% | <97% |
| CUS-PREF-001 | Preferred Supplier Status | # customers | Higher | Quarterly | ≥Target | -1 | <Target-1 |
| CUS-CHILL-001 | Chilled Product Share | % | Higher | Monthly | ≥Target | -2pp | <Target-2pp |

#### 7.2.3 Internal Process KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| PRO-MSA-001 | MSA Grading Compliance | % | Higher | Daily | ≥58% | 52-57% | <52% |
| PRO-YIELD-001 | Boning Yield | % | Higher | Daily | ≥72% | 70-71.9% | <70% |
| PRO-THRU-001 | Throughput vs. Target | % | Higher | Daily | ≥100% | 95-99% | <95% |
| PRO-CC-001 | Cold Chain Compliance | % | Higher | Daily | ≥99.9% | 99.5-99.8% | <99.5% |
| PRO-STUN-001 | Effective Stun Rate | % | Higher | Daily | 100% | 99-99.9% | <99% |
| PRO-CONDEMN-001 | Condemnation Rate | % | Lower | Daily | ≤2% | 2.1-3% | >3% |
| PRO-MICRO-001 | Micro Pass Rate | % | Higher | Weekly | ≥99.5% | 98-99.4% | <98% |
| PRO-REWORK-001 | Rework Rate | % | Lower | Daily | ≤0.5% | 0.51-1% | >1% |
| PRO-HACCP-001 | HACCP Compliance | % | Higher | Daily | 100% | 98-99% | <98% |

#### 7.2.4 Learning & Growth KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| LG-LTIFR-001 | LTIFR | Rate | Lower | Monthly | 0 | 0.1-5 | >5 |
| LG-TRIFR-001 | TRIFR | Rate | Lower | Monthly | ≤10 | 11-20 | >20 |
| LG-TURN-001 | Staff Turnover | % | Lower | Monthly | ≤20% | 21-35% | >35% |
| LG-ENG-001 | Employee Engagement | Score | Higher | Quarterly | ≥70 | 55-69 | <55 |
| LG-COMP-001 | Competency Completion | % | Higher | Monthly | ≥95% | 85-94% | <85% |

#### 7.2.5 Stakeholder KPIs

| KPI Code | KPI Name | Unit | Direction | Frequency | Green | Yellow | Red |
|----------|----------|------|-----------|-----------|-------|--------|-----|
| STK-DAFF-001 | DAFF Audit Score | % | Higher | Annual | ≥95% | 85-94% | <85% |
| STK-CERT-001 | Export Certificate Accuracy | % | Higher | Daily | 100% | 99-99.9% | <99% |
| STK-REJ-001 | Destination Rejections | # per month | Lower | Monthly | 0 | 1 | >1 |
| STK-LPA-001 | Supplier LPA Compliance | % | Higher | Monthly | 100% | 95-99% | <95% |
| STK-HALAL-001 | Halal Certification Compliance | % | Higher | Daily | 100% | 98-99% | <98% |
| STK-WELF-001 | Animal Welfare Score | Score | Higher | Monthly | ≥90 | 80-89 | <80 |
| STK-CARBON-001 | Carbon Intensity (kg CO2/tonne) | kg | Lower | Quarterly | ≤Target | +1-10% | >+10% |

---

## 8. JSON-LD Ontology Structure

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platformfoundation.ai/core/",
    "meat": "https://platformfoundation.ai/verticals/meat-trade/",
    "sc": "https://platformfoundation.ai/scorecard/",
    "bsc": "https://platformfoundation.ai/bsc/",
    "okr": "https://platformfoundation.ai/okr/"
  },
  "@type": "sc:ScorecardFrameworkOntology",
  "@id": "meat:scorecard-framework-v1",
  "pf:version": "1.0.0",
  "pf:vertical": "meat:InternationalMeatTrade",
  "schema:dateCreated": "2025-12-04",
  
  "sc:scopeHierarchy": {
    "@type": "sc:ScopeHierarchy",
    "sc:levels": [
      {"sc:level": 1, "sc:name": "Enterprise", "sc:description": "Full organizational view"},
      {"sc:level": 2, "sc:name": "Region", "sc:description": "Geographic region (multi-site)"},
      {"sc:level": 3, "sc:name": "Country", "sc:description": "Single country operations"},
      {"sc:level": 4, "sc:name": "Site", "sc:description": "Single facility"},
      {"sc:level": 5, "sc:name": "BusinessUnit", "sc:description": "Product/market/channel segment"},
      {"sc:level": 6, "sc:name": "Function", "sc:description": "Functional area"},
      {"sc:level": 7, "sc:name": "Team", "sc:description": "Direct report team"},
      {"sc:level": 8, "sc:name": "Individual", "sc:description": "Personal view"}
    ]
  },
  
  "bsc:perspectives": [
    {
      "@type": "bsc:Perspective",
      "@id": "bsc:Financial",
      "schema:name": "Financial",
      "bsc:focus": "Profitability, efficiency, capital",
      "meat:emphasis": "Margin, yield value, working capital (perishables)",
      "bsc:kpiCategories": ["Revenue", "Profitability", "Efficiency", "Capital"]
    },
    {
      "@type": "bsc:Perspective",
      "@id": "bsc:Customer",
      "schema:name": "Customer",
      "bsc:focus": "Satisfaction, retention, growth",
      "meat:emphasis": "Service level, quality, specifications, relationships",
      "bsc:kpiCategories": ["Satisfaction", "Service", "Quality", "Growth"]
    },
    {
      "@type": "bsc:Perspective",
      "@id": "bsc:InternalProcess",
      "schema:name": "Internal Process",
      "bsc:focus": "Operations, quality, efficiency",
      "meat:emphasis": "Cold chain, food safety, throughput, yield",
      "bsc:kpiCategories": ["Operations", "ColdChain", "FoodSafety", "SupplyChain", "Efficiency"]
    },
    {
      "@type": "bsc:Perspective",
      "@id": "bsc:LearningGrowth",
      "schema:name": "Learning & Growth",
      "bsc:focus": "People, capability, innovation",
      "meat:emphasis": "Safety culture, skills, retention, technology",
      "bsc:kpiCategories": ["Safety", "People", "Capability", "Technology"]
    },
    {
      "@type": "bsc:Perspective",
      "@id": "bsc:Stakeholder",
      "schema:name": "Stakeholder",
      "bsc:focus": "Regulatory, partners, community",
      "meat:emphasis": "Export licenses, certifications, supplier relationships",
      "bsc:kpiCategories": ["Regulatory", "Supplier", "Sustainability", "Community"]
    }
  ],
  
  "sc:roleViewConfigs": [
    {
      "@type": "sc:RoleViewConfig",
      "sc:roleCode": "CEO",
      "sc:scopeLevel": 1,
      "sc:perspectiveWeights": {
        "Financial": 25,
        "Customer": 20,
        "InternalProcess": 15,
        "LearningGrowth": 15,
        "Stakeholder": 25
      },
      "sc:cascadeVisibility": {
        "sc:seesAbove": ["StrategicObjectives"],
        "sc:seesBelow": "FullDepth",
        "sc:drillDown": "Full"
      },
      "sc:dashboardSections": [
        "StrategicHealthSummary",
        "BSCPerspectiveSummary",
        "KeyMetricsAtGlance",
        "AlertsExceptions",
        "CSuiteOKRStatus",
        "GMOKRStatus"
      ]
    },
    {
      "@type": "sc:RoleViewConfig",
      "sc:roleCode": "SiteGM",
      "sc:scopeLevel": 4,
      "sc:perspectiveWeights": {
        "Financial": 25,
        "Customer": 15,
        "InternalProcess": 35,
        "LearningGrowth": 15,
        "Stakeholder": 10
      },
      "sc:cascadeVisibility": {
        "sc:seesAbove": ["COO_OKRs", "StrategicObjectives"],
        "sc:seesBelow": "2Levels",
        "sc:drillDown": "SiteOnly"
      },
      "sc:dashboardSections": [
        "SitePerformanceSummary",
        "BSCPerspectiveSiteView",
        "MyOKRs",
        "DirectReportOKRStatus",
        "OperationalKPIsRealTime"
      ]
    },
    {
      "@type": "sc:RoleViewConfig",
      "sc:roleCode": "QAManager",
      "sc:scopeLevel": 7,
      "sc:perspectiveWeights": {
        "Financial": 10,
        "Customer": 25,
        "InternalProcess": 45,
        "LearningGrowth": 15,
        "Stakeholder": 5
      },
      "sc:cascadeVisibility": {
        "sc:seesAbove": ["QualityDirector_OKRs", "SiteGM_OKRs"],
        "sc:seesBelow": "1Level",
        "sc:drillDown": "TeamOnly"
      },
      "sc:dashboardSections": [
        "AlignmentContext",
        "MyOKRs",
        "TeamPerformance",
        "QualityKPIsOperational"
      ]
    }
  ],
  
  "sc:healthStatusDefinitions": {
    "sc:okrStatus": [
      {"sc:status": "OnTrack", "sc:icon": "●", "sc:color": "Green", "sc:progressThreshold": "≥75%"},
      {"sc:status": "AtRisk", "sc:icon": "◐", "sc:color": "Yellow", "sc:progressThreshold": "50-74%"},
      {"sc:status": "Behind", "sc:icon": "○", "sc:color": "Red", "sc:progressThreshold": "<50%"},
      {"sc:status": "Achieved", "sc:icon": "✓", "sc:color": "Blue", "sc:progressThreshold": "100%"},
      {"sc:status": "NotStarted", "sc:icon": "◌", "sc:color": "Gray", "sc:progressThreshold": "0%"}
    ],
    "sc:kpiStatus": [
      {"sc:status": "Green", "sc:description": "Meeting or exceeding target"},
      {"sc:status": "Yellow", "sc:description": "Approaching target, needs attention"},
      {"sc:status": "Red", "sc:description": "Significantly below target, intervention required"}
    ]
  },
  
  "meat:sectorKPILibrary": {
    "@type": "sc:KPILibrary",
    "meat:scenarios": [
      {
        "@id": "meat:uk-importer-kpis",
        "schema:name": "UK Importer & Wholesaler KPIs",
        "sc:kpiCount": 30,
        "sc:categories": ["Financial", "Customer", "InternalProcess", "LearningGrowth", "Stakeholder"]
      },
      {
        "@id": "meat:aus-exporter-kpis",
        "schema:name": "Australian Exporter KPIs",
        "sc:kpiCount": 35,
        "sc:categories": ["Financial", "Customer", "InternalProcess", "LearningGrowth", "Stakeholder"]
      }
    ]
  }
}
```

---

## 9. Implementation Guidance

### 9.1 Scorecard Deployment Phases

| Phase | Focus | Deliverables |
|-------|-------|-------------|
| **Phase 1** | Foundation | User roles, scope definitions, BSC perspective configuration |
| **Phase 2** | KPI Setup | KPI library import, threshold configuration, data source integration |
| **Phase 3** | OKR Integration | OKR cascade structure, alignment validation, progress tracking |
| **Phase 4** | Dashboard Build | Role-based views, filtering logic, drill-down navigation |
| **Phase 5** | Alerts & Actions | Alert rules, escalation workflows, action tracking |
| **Phase 6** | Optimization | Performance tuning, user feedback, continuous improvement |

### 9.2 User Adoption Checklist

- [ ] Role-to-scope mapping complete for all users
- [ ] BSC perspective weights configured by role
- [ ] KPI thresholds validated with business owners
- [ ] OKR cascade links verified (parent-child)
- [ ] Dashboard views tested for each role type
- [ ] Data refresh frequencies appropriate
- [ ] Alert rules configured and tested
- [ ] User training completed
- [ ] Mobile access verified

---

## 10. Appendices

### 10.1 Related Documents

- PF_CORE_CSUITE_ROLES_MEAT_VERTICAL_v1.0.md
- PF_CORE_CSUITE_INTL_REGULATORY_GOVERNANCE_ADDENDUM_v1.0.md
- MEAT_TRADE_SECTOR_ROLES_ONTOLOGY_VSOM_OKR_CASCADE_v1.0.md
- MEAT_TRADE_GM_ROLES_FRAMEWORK_v1.0.md
- PRD_PF_CORE_VSOM_Module_v1.0.md

### 10.2 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-04 | Platform Foundation Core | Initial release |

---

**--- END OF DOCUMENT ---**
