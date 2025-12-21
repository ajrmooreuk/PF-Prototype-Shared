# General Manager Roles Framework
## PF-Core VE-RRR Sector Extension - GM Layer Integration

**Document Version:** 1.0  
**Parent Document:** MEAT_TRADE_SECTOR_ROLES_ONTOLOGY_VSOM_OKR_CASCADE_v1.0.md  
**Module:** PF-CORE VE-RRR-SECTOR-GM (Value Engineering - Roles, Responsibilities & Rights - GM Layer)  
**Vertical:** International Meat Trade (Exporters, Importers, Wholesalers)  
**Registry Compliance:** OAA Registry v3.0  
**Status:** DRAFT  
**Date:** December 2025  

---

## 1. Executive Summary

This addendum extends the Sector Roles Ontology to incorporate General Manager (GM) roles as a distinct management layer between C-Suite and functional Directors. General Managers hold P&L accountability for defined business units, geographic regions, or operational facilities, serving as the critical translation layer between corporate strategy and operational execution.

### 1.1 Updated Role Hierarchy

```
TIER 1: C-Suite (Strategic)
    └── CEO, CFO, COO, CSCO, CQO, CCO, CRO, CMO, CTO, CHRO, CIO

TIER 1.5: GENERAL MANAGERS (Strategic-Tactical Bridge) ← NEW LAYER
    └── Regional GM, Site/Plant GM, Business Unit GM, Country GM

TIER 2: Director/VP (Tactical)
    └── Procurement Director, Quality Director, Logistics Director,
        Sales Director, Compliance Director, Operations Director

TIER 3: Manager (Operational)
    └── Procurement Manager, QA Manager, Logistics Manager,
        Key Account Manager, Compliance Manager, Production Manager

TIER 4: Supervisor/Team Lead (Execution)
    └── Procurement Supervisor, QC Supervisor, Warehouse Supervisor,
        Dispatch Supervisor, Certification Supervisor, Production Supervisor

TIER 5: Specialist/Operative (Task)
    └── Buyer, QC Inspector, Goods-In Operative, Picker/Packer,
        Documentation Clerk, Production Operative, Cold Chain Monitor
```

### 1.2 GM Layer Positioning

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           C-SUITE (Corporate)                                │
│  CEO │ CFO │ COO │ CSCO │ CQO │ CCO │ CRO │ CMO │ CTO │ CHRO │ CIO          │
│  ────────────────────────────────────────────────────────────────────────── │
│  • Corporate Strategy & Vision                                               │
│  • Enterprise-wide Policy                                                    │
│  • Capital Allocation                                                        │
│  • Stakeholder Management                                                    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        GENERAL MANAGERS (Business Unit)                      │
│  Regional GM │ Site/Plant GM │ Business Unit GM │ Country GM                │
│  ────────────────────────────────────────────────────────────────────────── │
│  • P&L Accountability                                                        │
│  • Strategy Translation & Execution                                          │
│  • Resource Optimization                                                     │
│  • Cross-Functional Integration                                              │
│  • Local Market/Operational Leadership                                       │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DIRECTORS (Functional)                             │
│  Procurement │ Quality │ Logistics │ Sales │ Compliance │ Operations        │
│  ────────────────────────────────────────────────────────────────────────── │
│  • Functional Excellence                                                     │
│  • Policy Implementation                                                     │
│  • Team Development                                                          │
│  • Performance Management                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. General Manager Role Types

### 2.1 GM Role Classification Matrix

| GM Type | Scope | P&L Responsibility | Reports To | Typical Context |
|---------|-------|-------------------|------------|-----------------|
| **Regional GM** | Geographic region (multi-site) | Full regional P&L | CEO or COO | Multi-site operations spanning geography |
| **Country GM** | Single country operations | Full country P&L | CEO or Regional GM | International operations with country presence |
| **Site/Plant GM** | Single processing facility | Site-level P&L | COO or Regional GM | Processing plants, distribution centers |
| **Business Unit GM** | Product line or market segment | BU-level P&L | CEO or CRO | Distinct product categories or customer segments |
| **Division GM** | Major business division | Division P&L | CEO | Large enterprises with multiple divisions |

### 2.2 GM Reporting Structure Variations

**Model A: Centralized (Functional Primacy)**
```
CEO
├── CFO ─────────────── Finance Directors (all sites)
├── COO ─────────────── Operations Directors (all sites)
│   └── Site GMs ────── (Coordination role, limited P&L)
├── CSCO ────────────── Supply Chain Directors (all sites)
├── CQO ─────────────── Quality Directors (all sites)
└── CRO ─────────────── Sales Directors (all regions)
```

**Model B: Decentralized (GM Primacy)**
```
CEO
├── CFO (Corporate)
├── Regional GM (Europe)
│   ├── Site GM (UK) ──────── All functional Directors (UK)
│   ├── Site GM (Netherlands)── All functional Directors (NL)
│   └── Site GM (Poland) ───── All functional Directors (PL)
├── Regional GM (APAC)
│   ├── Country GM (Australia)─ All functional Directors (AU)
│   └── Country GM (NZ) ────── All functional Directors (NZ)
└── Corporate Functions (dotted line to all)
```

**Model C: Matrix (Balanced)**
```
CEO
├── CFO ─────────────── Solid line to Finance, Dotted to Site GMs
├── COO ─────────────── Solid line to Site GMs
│   ├── Site GM 1 ────── Solid to Site Directors, Dotted to Corporate Functions
│   ├── Site GM 2 ────── Solid to Site Directors, Dotted to Corporate Functions
│   └── Site GM 3 ────── Solid to Site Directors, Dotted to Corporate Functions
├── CQO ─────────────── Solid to Quality Policy, Dotted to Site QA
├── CCO ─────────────── Solid to Compliance, Dotted to Site Compliance
└── CRO ─────────────── Solid to Sales Strategy, Dotted to Regional Sales
```

---

## 3. Detailed GM Role Definitions

### 3.1 Regional General Manager

**Schema.org Type:** `schema:Person` + `pf:GeneralManagerRole`

#### Role Profile

| Attribute | Definition |
|-----------|-----------|
| **Purpose** | Lead all operations across a defined geographic region, delivering revenue and profit targets while ensuring operational excellence, regulatory compliance, and customer satisfaction |
| **Scope** | Multi-site, multi-country within region |
| **P&L Accountability** | Full regional P&L including revenue, gross margin, operating costs, EBITDA |
| **Reports To** | CEO or COO |
| **Direct Reports** | Country GMs or Site GMs, Regional functional leads |
| **Typical Span** | 3-10 sites, 200-2,000 employees |

#### Key Responsibilities

| Category | Responsibility | BSC Perspective |
|----------|---------------|-----------------|
| **Strategy Execution** | Translate corporate strategy to regional execution plans | All |
| **P&L Management** | Deliver regional revenue, margin, and profit targets | Financial |
| **Operational Leadership** | Ensure consistent operational standards across sites | Internal Process |
| **Customer Relationships** | Own strategic customer relationships in region | Customer |
| **Regulatory Compliance** | Maintain all licenses, certifications, market access | Stakeholder |
| **Talent Development** | Build leadership pipeline, manage regional talent | Learning & Growth |
| **Capital Investment** | Propose and execute regional CapEx within authority | Financial |
| **Risk Management** | Identify and mitigate regional operational risks | Internal Process |

#### Decision Rights

| Decision Type | Authority Level |
|--------------|-----------------|
| **Pricing** | Within corporate guidelines, approve regional pricing |
| **Hiring** | Full authority for regional roles up to Director level |
| **CapEx** | Approve up to defined threshold (e.g., £500K), recommend above |
| **Supplier** | Approve regional suppliers within corporate framework |
| **Customer Contracts** | Approve contracts within authority matrix |
| **Operational Changes** | Full authority for regional operational decisions |

#### Industry-Specific Competencies (Meat Trade)

- Multi-site cold chain operations management
- Regional regulatory framework expertise (e.g., EU regulations across member states)
- Cross-border logistics and customs coordination
- Regional customer relationship management
- Multi-currency and transfer pricing understanding
- Cultural competency for regional workforce management

---

### 3.2 Site/Plant General Manager

**Schema.org Type:** `schema:Person` + `pf:GeneralManagerRole`

#### Role Profile

| Attribute | Definition |
|-----------|-----------|
| **Purpose** | Lead all operations at a single processing facility or distribution site, delivering production, quality, and financial targets while maintaining safety and compliance |
| **Scope** | Single site (processing plant, cold store, distribution center) |
| **P&L Accountability** | Site-level P&L including throughput, yield, labor, overhead |
| **Reports To** | COO, Regional GM, or Operations Director |
| **Direct Reports** | Site functional managers (Production, QA, Maintenance, HR, Finance) |
| **Typical Span** | 1 site, 50-500 employees |

#### Key Responsibilities

| Category | Responsibility | BSC Perspective |
|----------|---------------|-----------------|
| **Production Management** | Deliver throughput, yield, and efficiency targets | Internal Process |
| **Quality & Food Safety** | Maintain HACCP, certifications, audit readiness | Internal Process |
| **Site P&L** | Manage site costs, labor productivity, overhead | Financial |
| **Health & Safety** | Ensure zero-harm culture, compliance with safety regulations | Learning & Growth |
| **Customer Service** | Meet customer specifications and delivery requirements | Customer |
| **Regulatory Compliance** | Maintain establishment approval, export listings | Stakeholder |
| **People Leadership** | Lead site workforce, manage industrial relations | Learning & Growth |
| **Asset Management** | Maintain equipment, manage maintenance programs | Internal Process |

#### Decision Rights

| Decision Type | Authority Level |
|--------------|-----------------|
| **Production Scheduling** | Full authority within demand plan |
| **Hiring** | Full authority for site roles up to Manager level |
| **CapEx** | Approve up to defined threshold (e.g., £100K), recommend above |
| **Supplier (Site Services)** | Approve local suppliers within corporate framework |
| **Overtime/Casual Labor** | Full authority within budget |
| **Product Hold/Release** | Authority to hold; release per QA protocols |

#### Industry-Specific Competencies (Meat Trade)

**For Processing Plant GM:**
- Meat processing technology and operations
- HACCP and food safety management systems
- Yield optimization and carcass utilization
- Cold chain management (chilling, freezing, storage)
- Slaughter and animal welfare compliance
- Labor-intensive workforce management
- OV (Official Veterinarian) relationship management

**For Distribution/Cold Store GM:**
- Temperature-controlled warehouse operations
- Inventory management for perishables
- Pick/pack operations optimization
- Transport fleet or carrier management
- Customer service and order fulfillment
- Cold chain integrity monitoring

---

### 3.3 Country General Manager

**Schema.org Type:** `schema:Person` + `pf:GeneralManagerRole`

#### Role Profile

| Attribute | Definition |
|-----------|-----------|
| **Purpose** | Lead all operations within a single country, serving as the senior executive presence and ensuring local market success while maintaining alignment with corporate strategy |
| **Scope** | All operations within one country |
| **P&L Accountability** | Full country P&L |
| **Reports To** | CEO, Regional GM, or relevant C-Suite executive |
| **Direct Reports** | Country functional leads or Site GMs within country |
| **Typical Span** | 1-5 sites, 100-1,000 employees |

#### Key Responsibilities

| Category | Responsibility | BSC Perspective |
|----------|---------------|-----------------|
| **Market Leadership** | Represent company in-country, drive market position | Customer |
| **Country P&L** | Deliver country revenue and profit targets | Financial |
| **Regulatory Affairs** | Maintain relationships with regulatory authorities | Stakeholder |
| **Customer Development** | Own key customer relationships in-country | Customer |
| **Government Relations** | Engage with government, industry bodies, trade associations | Stakeholder |
| **Operational Oversight** | Ensure operational excellence across country sites | Internal Process |
| **Local Compliance** | Ensure compliance with local laws, regulations, customs | Stakeholder |
| **Talent & Culture** | Build local talent, adapt corporate culture to local context | Learning & Growth |

#### Industry-Specific Competencies (Meat Trade)

**For Export Country GM (e.g., Australia):**
- DAFF/regulatory authority relationship management
- Export protocol negotiation and maintenance
- Livestock supply chain coordination
- Multi-market export documentation
- Trade policy and market access expertise

**For Import Country GM (e.g., UK, Japan):**
- Import regulatory compliance (FSA, MAFF)
- Customs and border control relationships
- Local customer and distributor networks
- Market-specific product requirements
- Local competitor and market intelligence

---

### 3.4 Business Unit General Manager

**Schema.org Type:** `schema:Person` + `pf:GeneralManagerRole`

#### Role Profile

| Attribute | Definition |
|-----------|-----------|
| **Purpose** | Lead a defined business unit (product category, customer segment, or channel) delivering growth and profitability targets through focused strategy and execution |
| **Scope** | Specific product line, market segment, or customer channel |
| **P&L Accountability** | Business unit P&L (revenue, gross margin, contribution) |
| **Reports To** | CEO, CRO, or COO depending on BU nature |
| **Direct Reports** | BU functional leads (Sales, Marketing, Product, Operations) |
| **Typical Span** | Cross-functional team, 20-200 employees |

#### Key Responsibilities

| Category | Responsibility | BSC Perspective |
|----------|---------------|-----------------|
| **BU Strategy** | Develop and execute business unit strategy | All |
| **Revenue Growth** | Drive revenue growth within the business unit | Financial |
| **Product Management** | Manage product portfolio, specifications, innovation | Customer |
| **Customer Focus** | Deep understanding of BU customer needs | Customer |
| **Margin Management** | Optimize pricing, mix, and costs for BU profitability | Financial |
| **Cross-Functional Coordination** | Align Operations, Supply Chain, QA to BU needs | Internal Process |
| **Market Development** | Identify and pursue new market opportunities | Customer |

#### Business Unit Examples (Meat Trade)

| BU Type | Example | Key Focus Areas |
|---------|---------|-----------------|
| **Product BU** | Beef Division, Lamb Division | Species-specific expertise, breeding programs, grading |
| **Channel BU** | Foodservice, Retail, Industrial | Channel-specific requirements, packaging, service |
| **Market BU** | Japan Market, Middle East Market | Market-specific protocols, certifications, relationships |
| **Value-Add BU** | Further Processing, Ready Meals | Innovation, manufacturing, consumer trends |
| **Premium BU** | Wagyu, Organic, Grass-Fed | Premium positioning, provenance, certification |

---

## 4. GM RACI Matrix

### 4.1 Strategic & Corporate Processes

| Process | CEO | CFO | COO | Regional GM | Site GM | BU GM | Directors |
|---------|-----|-----|-----|-------------|---------|-------|-----------|
| Corporate Strategy | A | C | C | C | I | C | I |
| Annual Business Plan | A | R | C | R | C | R | C |
| Capital Allocation | A | A | C | R | R | C | I |
| M&A Evaluation | A | R | C | C | I | C | I |
| Board Reporting | A | R | C | C | I | I | I |
| Investor Relations | A | R | I | I | I | I | I |

### 4.2 Operational Processes

| Process | CEO | COO | Regional GM | Site GM | BU GM | Ops Dir | QA Dir |
|---------|-----|-----|-------------|---------|-------|---------|--------|
| Production Planning | I | A | C | R | C | R | C |
| Quality Management | I | C | C | A | C | C | R |
| Site Operations | I | A | C | R | I | R | C |
| Capacity Investment | C | A | R | R | C | C | I |
| Process Improvement | I | A | C | R | C | R | C |
| Safety Management | C | A | C | R | I | R | C |

### 4.3 Commercial Processes

| Process | CEO | CRO | Regional GM | Country GM | BU GM | Sales Dir | KAM |
|---------|-----|-----|-------------|------------|-------|-----------|-----|
| Sales Strategy | C | A | C | C | R | R | I |
| Key Account Management | I | A | C | C | C | C | R |
| Pricing Decisions | C | A | C | C | C | R | C |
| Contract Negotiation | I | A | C | C | C | C | R |
| New Customer Acquisition | I | A | C | R | C | R | R |
| Customer Service | I | C | C | A | C | C | R |

### 4.4 Compliance & Regulatory Processes

| Process | CEO | CCO | CQO | Regional GM | Country GM | Site GM | Compliance Dir |
|---------|-----|-----|-----|-------------|------------|---------|----------------|
| Regulatory Strategy | A | R | C | C | C | I | R |
| Export Licensing | C | A | C | C | R | R | R |
| Audit Management | I | C | A | C | C | R | R |
| Certification Maintenance | I | C | A | C | R | R | R |
| Government Relations | A | C | I | C | R | I | C |
| Compliance Training | I | A | C | C | C | R | R |

---

## 5. Updated VSOM-OKR Cascade with GM Layer

### 5.1 Cascade Flow with GM Layer

```
VSOM LAYER 1: VISION & MISSION
        │
        ▼
VSOM LAYER 2: STRATEGIC OBJECTIVES (BSC)
        │
        ▼
┌───────────────────────────────────────┐
│  C-SUITE OKRs (Quarterly)             │
│  CEO, CFO, COO, CSCO, CQO, CCO, CRO   │
│  • Enterprise-wide objectives         │
│  • Cross-functional initiatives        │
│  • Strategic priorities                │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│  GENERAL MANAGER OKRs (Quarterly)     │  ← NEW LAYER
│  Regional GM, Site GM, Country GM, BU GM │
│  • Business unit objectives            │
│  • P&L targets                         │
│  • Local market/operational goals      │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│  DIRECTOR OKRs (Quarterly)            │
│  Functional Directors                  │
│  • Functional excellence               │
│  • Support GM/BU objectives            │
│  • Team capability development         │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│  MANAGER OKRs (Quarterly)             │
│  Operational Managers                  │
│  • Process execution                   │
│  • Team performance                    │
│  • Operational KPIs                    │
└───────────────────┬───────────────────┘
                    │
                    ▼
VSOM LAYER 4: METRICS & KPIs
```

### 5.2 OKR Alignment Rules with GM Layer

| OKR Level | Aligns To | Alignment Requirement |
|-----------|----------|----------------------|
| C-Suite OKRs | Strategic Objectives | Direct link to 1+ Strategic Objective |
| GM OKRs | C-Suite OKRs + Strategic Objectives | Support C-Suite KRs + local Strategic Objectives |
| Director OKRs | GM OKRs (primary) + C-Suite OKRs (secondary) | Support GM's business unit goals |
| Manager OKRs | Director OKRs | Enable Director's functional objectives |

---

## 6. Scenario Application: UK Importer with GM Layer

### 6.1 Organizational Structure with GM

**British Prime Meats Ltd - Updated Structure**

```
CEO
├── CFO
├── CSO
├── CHRO
├── CCO
└── COO
    ├── GM - Tilbury Operations (Site GM)          ← NEW
    │   ├── Operations Director (Tilbury)
    │   ├── Quality Director (Tilbury)
    │   ├── Logistics Director (Tilbury)
    │   └── HR Manager (Tilbury)
    │
    └── GM - Commercial (Business Unit GM)          ← NEW
        ├── Sales Director
        ├── Procurement Director
        ├── Customer Service Manager
        └── Marketing Manager
```

### 6.2 GM OKRs - UK Importer (Q1 2026)

#### Site GM (Tilbury Operations) OKR

| Element | Content |
|---------|---------|
| **Objective** | Deliver operational excellence at Tilbury to support £120M growth trajectory |
| **Key Result 1** | Achieve site throughput of 2,500 tonnes/month (vs. 2,200 current) |
| **Key Result 2** | Maintain cold chain compliance at 99.8%+ across all zones |
| **Key Result 3** | Achieve site operating cost of £X/tonne (5% reduction) |
| **Key Result 4** | Zero LTI (Lost Time Injuries) for the quarter |
| **Key Result 5** | Achieve BRC AA audit readiness score of 95%+ |
| **Alignment** | → COO KRs, SO-P1, SO-P2, SO-P3 |

**Cascaded Director OKRs under Site GM:**

**Operations Director (Tilbury) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Maximize processing capacity and efficiency |
| **Key Result 1** | Achieve daily processing capacity of 120 tonnes |
| **Key Result 2** | Reduce goods-in to dispatch cycle time by 15% |
| **Key Result 3** | Achieve labor productivity of X kg/labor hour |
| **Key Result 4** | Complete equipment upgrade project on schedule |
| **Alignment** | → Site GM KR1, KR3 |

**Quality Director (Tilbury) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Achieve food safety excellence for BRC AA |
| **Key Result 1** | Complete all 12 internal audits with <3 major findings |
| **Key Result 2** | Achieve <0.3% customer complaint rate |
| **Key Result 3** | 100% HACCP monitoring compliance |
| **Key Result 4** | Complete allergen control improvement project |
| **Alignment** | → Site GM KR5, CQO KRs |

**Logistics Director (Tilbury) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Deliver flawless cold chain and distribution |
| **Key Result 1** | Achieve 99.8% cold chain temperature compliance |
| **Key Result 2** | Achieve 98.5% OTIF delivery performance |
| **Key Result 3** | Reduce logistics cost/case by 5% |
| **Key Result 4** | Implement real-time temperature monitoring for all vehicles |
| **Alignment** | → Site GM KR2, CSCO KRs |

---

#### Business Unit GM (Commercial) OKR

| Element | Content |
|---------|---------|
| **Objective** | Drive commercial growth and customer excellence |
| **Key Result 1** | Achieve Q1 revenue of £23M (vs. £21M prior year) |
| **Key Result 2** | Win 2 new key accounts with £3M+ annual potential |
| **Key Result 3** | Achieve gross margin of 18% (vs. 17% budget) |
| **Key Result 4** | Achieve customer NPS of 42 (vs. 35 baseline) |
| **Key Result 5** | Launch customer portal with 30% adoption |
| **Alignment** | → CRO KRs, SO-F1, SO-C1, SO-C3 |

**Cascaded Director OKRs under Commercial GM:**

**Sales Director OKR**
| Element | Content |
|---------|---------|
| **Objective** | Execute customer acquisition and development |
| **Key Result 1** | Convert 2 of 5 target accounts to contracted customers |
| **Key Result 2** | Increase top 20 account revenue by 12% |
| **Key Result 3** | Achieve 100% contract renewal rate |
| **Key Result 4** | Generate £4M qualified pipeline |
| **Alignment** | → Commercial GM KR1, KR2 |

**Procurement Director OKR**
| Element | Content |
|---------|---------|
| **Objective** | Secure quality supply at competitive cost |
| **Key Result 1** | Achieve average 2.5% cost improvement on renewals |
| **Key Result 2** | Qualify 2 new Brazil suppliers |
| **Key Result 3** | Achieve 98% supplier OTD performance |
| **Key Result 4** | Reduce supply risk through 20% supplier diversification |
| **Alignment** | → Commercial GM KR3, CSCO KRs |

---

## 7. Scenario Application: Australian Exporter with GM Layer

### 7.1 Organizational Structure with GM

**Outback Premium Exports Pty Ltd - Updated Structure**

```
CEO
├── CFO
├── CSO
├── CHRO
├── CCO
├── CQO
└── COO
    ├── GM - Toowoomba Plant (Site GM)              ← NEW
    │   ├── Operations Director (Processing)
    │   ├── Quality Director (Site)
    │   ├── Maintenance Manager
    │   └── HR Manager (Site)
    │
    ├── GM - Livestock & Supply Chain (BU GM)       ← NEW
    │   ├── Procurement Director (Livestock)
    │   ├── Logistics Director
    │   └── Feedlot Manager (if integrated)
    │
    └── CRO
        ├── GM - Japan & Korea Markets (Regional GM) ← NEW
        │   ├── Sales Director (Japan)
        │   ├── Sales Director (Korea)
        │   └── Market Development Manager (APAC)
        │
        └── GM - Americas & Middle East (Regional GM) ← NEW
            ├── Sales Director (USA)
            ├── Sales Director (Middle East)
            └── Halal Program Manager
```

### 7.2 GM OKRs - Australian Exporter (Q1 2026)

#### Site GM (Toowoomba Plant) OKR

| Element | Content |
|---------|---------|
| **Objective** | Achieve processing excellence to support AUD 600M growth |
| **Key Result 1** | Achieve weekly throughput of 2,200 cattle (vs. 2,000 current) |
| **Key Result 2** | Achieve MSA grading compliance of 56% (vs. 52% baseline) |
| **Key Result 3** | Achieve boning yield of 72.5% (vs. 70.5% current) |
| **Key Result 4** | Zero LTIFR (Lost Time Injury Frequency Rate) |
| **Key Result 5** | Achieve DAFF audit compliance score of 98%+ |
| **Alignment** | → COO KRs, SO-P1, SO-P3 |

**Cascaded Director OKRs:**

**Operations Director (Processing) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Maximize processing efficiency and yield |
| **Key Result 1** | Achieve chain speed of 85 head/hour |
| **Key Result 2** | Achieve boning room yield of 72.5%+ |
| **Key Result 3** | Reduce processing cost/kg by 3% |
| **Key Result 4** | Complete chiller optimization project |
| **Alignment** | → Site GM KR1, KR3 |

**Quality Director (Site) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Maintain world-class food safety and grading standards |
| **Key Result 1** | Achieve MSA compliance of 56%+ |
| **Key Result 2** | 100% HACCP monitoring compliance |
| **Key Result 3** | <3 customer quality complaints per month |
| **Key Result 4** | Achieve DAFF audit with zero critical findings |
| **Alignment** | → Site GM KR2, KR5, CQO KRs |

---

#### Regional GM (Japan & Korea Markets) OKR

| Element | Content |
|---------|---------|
| **Objective** | Strengthen leadership position in Japan and accelerate Korea growth |
| **Key Result 1** | Achieve Japan revenue of AUD 48M (10% growth) |
| **Key Result 2** | Achieve Korea revenue of AUD 30M (15% growth) |
| **Key Result 3** | Achieve preferred supplier status with 3 additional Japan customers |
| **Key Result 4** | Increase chilled beef share to 35% of Japan volume |
| **Key Result 5** | Achieve <0.5% customer claim rate across region |
| **Alignment** | → CRO KRs, SO-C1, SO-C3 |

**Cascaded Director OKRs:**

**Sales Director (Japan) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Deepen Japan customer relationships and grow premium share |
| **Key Result 1** | Convert 2 target accounts to contracted customers |
| **Key Result 2** | Increase chilled beef volume by 15% |
| **Key Result 3** | Complete factory visits for all top 10 customers |
| **Key Result 4** | Achieve 98.5% order fill rate |
| **Alignment** | → Regional GM KR1, KR3, KR4 |

**Sales Director (Korea) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Accelerate Korea market penetration |
| **Key Result 1** | Achieve 15% volume growth vs. prior quarter |
| **Key Result 2** | Win 3 new Korean accounts |
| **Key Result 3** | Complete KFDA registration for 2 new product categories |
| **Key Result 4** | Achieve premium product share of 25% |
| **Alignment** | → Regional GM KR2 |

---

#### Business Unit GM (Livestock & Supply Chain) OKR

| Element | Content |
|---------|---------|
| **Objective** | Secure premium livestock supply and optimize end-to-end supply chain |
| **Key Result 1** | Achieve 88% of cattle meeting MSA pathway requirements |
| **Key Result 2** | Increase direct farm procurement to 85% (vs. 78% current) |
| **Key Result 3** | Achieve 99.9% cold chain compliance (farm to port) |
| **Key Result 4** | Reduce supply chain cost/kg by 4% |
| **Key Result 5** | 100% LPA compliance across all livestock suppliers |
| **Alignment** | → CSCO KRs, SO-P1, SO-P4, SO-S3 |

**Cascaded Director OKRs:**

**Procurement Director (Livestock) OKR**
| Element | Content |
|---------|---------|
| **Objective** | Build premium livestock supply base |
| **Key Result 1** | Onboard 20 new direct supply farms |
| **Key Result 2** | Achieve 90% MSA pathway compliance at point of purchase |
| **Key Result 3** | 100% electronic NVD compliance |
| **Key Result 4** | Reduce livestock cost variance to <1.5% |
| **Alignment** | → BU GM KR1, KR2, KR5 |

**Logistics Director OKR**
| Element | Content |
|---------|---------|
| **Objective** | Achieve supply chain excellence and cost optimization |
| **Key Result 1** | Achieve 99.9% cold chain compliance |
| **Key Result 2** | Reduce freight cost/container by 6% |
| **Key Result 3** | 100% container pre-cooling compliance |
| **Key Result 4** | Zero shipment delays due to logistics issues |
| **Alignment** | → BU GM KR3, KR4 |

---

## 8. GM Performance Metrics & KPIs

### 8.1 GM-Level KPI Dashboard

| KPI Category | Regional GM | Site GM | BU GM | Country GM |
|--------------|-------------|---------|-------|------------|
| **Financial** | Revenue, EBITDA, ROI | Site cost/unit, yield value | BU revenue, margin | Country P&L |
| **Customer** | NPS, retention, share | Service level, complaints | Segment NPS, penetration | Market share |
| **Operations** | Multi-site efficiency | Throughput, yield, safety | BU delivery metrics | Country operations |
| **Compliance** | Regional audit status | Site certifications | BU compliance | Country licenses |
| **People** | Regional engagement | Site turnover, safety | BU capability | Country talent |

### 8.2 GM Health Status Indicators

| Role | Green | Yellow | Red |
|------|-------|--------|-----|
| **Regional GM** | All sites on track, P&L ≥100%, NPS ≥target | 1 site at risk OR P&L 90-99% | Multiple sites at risk OR P&L <90% |
| **Site GM** | All KPIs on track, zero LTI, audit ready | 1-2 KPIs at risk OR minor audit findings | Critical KPI failure OR LTI OR major audit issue |
| **BU GM** | Revenue ≥target, margin ≥target, NPS ≥target | Revenue 95-99% OR margin at risk | Revenue <95% OR margin failure |
| **Country GM** | P&L on track, market access maintained | P&L 90-99% OR regulatory issue pending | P&L <90% OR market access at risk |

---

## 9. JSON-LD Ontology Extension - GM Roles

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platformfoundation.ai/core/",
    "meat": "https://platformfoundation.ai/verticals/meat-trade/",
    "role": "https://platformfoundation.ai/roles/",
    "gm": "https://platformfoundation.ai/roles/gm/"
  },
  "@type": "pf:GeneralManagerRolesOntology",
  "@id": "meat:gm-roles-ontology-v1",
  "pf:version": "1.0.0",
  "pf:extendsOntology": "meat:sector-roles-ontology-v1",
  
  "pf:gmRoleTier": {
    "@type": "pf:RoleTier",
    "pf:tierLevel": 1.5,
    "pf:tierName": "General Manager",
    "pf:tierType": "Strategic-Tactical Bridge",
    "pf:characteristics": {
      "pf:pnlAccountability": true,
      "pf:multiFunction": true,
      "pf:strategicExecution": true,
      "pf:localLeadership": true
    }
  },
  
  "pf:gmRoleTypes": [
    {
      "@type": ["schema:Role", "pf:GeneralManagerRole"],
      "@id": "gm:RegionalGM",
      "schema:roleName": "Regional General Manager",
      "pf:roleCode": "RGM",
      "pf:scope": "Multi-site, multi-country within region",
      "pf:pnlScope": "Full regional P&L",
      "pf:reportsTo": ["meat:CEO", "meat:COO"],
      "pf:directReports": ["gm:CountryGM", "gm:SiteGM", "role:RegionalFunctionalLeads"],
      "pf:typicalSpan": {
        "sites": "3-10",
        "employees": "200-2000"
      },
      "pf:decisionAuthority": {
        "pricing": "Within corporate guidelines",
        "hiring": "Up to Director level",
        "capex": "Up to threshold (e.g., £500K)",
        "suppliers": "Regional suppliers within framework",
        "contracts": "Within authority matrix"
      },
      "meat:industryCompetencies": [
        "Multi-site cold chain operations",
        "Regional regulatory expertise",
        "Cross-border logistics",
        "Regional customer management",
        "Multi-currency understanding"
      ]
    },
    {
      "@type": ["schema:Role", "pf:GeneralManagerRole"],
      "@id": "gm:SiteGM",
      "schema:roleName": "Site/Plant General Manager",
      "pf:roleCode": "SGM",
      "pf:scope": "Single processing facility or distribution site",
      "pf:pnlScope": "Site-level P&L",
      "pf:reportsTo": ["meat:COO", "gm:RegionalGM"],
      "pf:directReports": ["role:SiteFunctionalManagers"],
      "pf:typicalSpan": {
        "sites": "1",
        "employees": "50-500"
      },
      "pf:decisionAuthority": {
        "production": "Full authority within demand plan",
        "hiring": "Up to Manager level",
        "capex": "Up to threshold (e.g., £100K)",
        "overtime": "Full authority within budget",
        "productHold": "Authority to hold"
      },
      "meat:industryCompetencies": [
        "Meat processing operations",
        "HACCP and food safety",
        "Yield optimization",
        "Cold chain management",
        "Workforce management"
      ]
    },
    {
      "@type": ["schema:Role", "pf:GeneralManagerRole"],
      "@id": "gm:CountryGM",
      "schema:roleName": "Country General Manager",
      "pf:roleCode": "CGM",
      "pf:scope": "All operations within single country",
      "pf:pnlScope": "Full country P&L",
      "pf:reportsTo": ["meat:CEO", "gm:RegionalGM"],
      "pf:directReports": ["role:CountryFunctionalLeads", "gm:SiteGM"],
      "pf:typicalSpan": {
        "sites": "1-5",
        "employees": "100-1000"
      },
      "meat:industryCompetencies": [
        "Country regulatory authority relationships",
        "Local market expertise",
        "Government relations",
        "In-country customer networks"
      ]
    },
    {
      "@type": ["schema:Role", "pf:GeneralManagerRole"],
      "@id": "gm:BusinessUnitGM",
      "schema:roleName": "Business Unit General Manager",
      "pf:roleCode": "BUGM",
      "pf:scope": "Specific product line, market segment, or channel",
      "pf:pnlScope": "Business unit P&L (revenue, margin, contribution)",
      "pf:reportsTo": ["meat:CEO", "meat:CRO", "meat:COO"],
      "pf:directReports": ["role:BUFunctionalLeads"],
      "pf:typicalSpan": {
        "crossFunctional": true,
        "employees": "20-200"
      },
      "pf:businessUnitExamples": [
        {"type": "Product", "example": "Beef Division, Lamb Division"},
        {"type": "Channel", "example": "Foodservice, Retail, Industrial"},
        {"type": "Market", "example": "Japan Market, Middle East Market"},
        {"type": "ValueAdd", "example": "Further Processing, Ready Meals"},
        {"type": "Premium", "example": "Wagyu, Organic, Grass-Fed"}
      ]
    }
  ],
  
  "pf:gmOkrCascade": {
    "@type": "pf:OKRCascadeRules",
    "pf:gmOkrPosition": "Between C-Suite and Director OKRs",
    "pf:gmAlignmentRules": {
      "pf:alignsTo": ["C-Suite OKRs", "Strategic Objectives"],
      "pf:cascadesTo": ["Director OKRs"],
      "pf:requirement": "Support C-Suite KRs + local Strategic Objectives"
    },
    "pf:directorAlignmentWithGM": {
      "pf:primaryAlignment": "GM OKRs",
      "pf:secondaryAlignment": "C-Suite OKRs (functional)",
      "pf:requirement": "Support GM's business unit goals"
    }
  }
}
```

---

## 10. Implementation Guidance

### 10.1 When to Introduce GM Layer

| Criterion | Threshold for GM Layer |
|-----------|----------------------|
| **Revenue** | >£50M (single entity) or >£100M (group) |
| **Employees** | >200 employees |
| **Sites** | >2 operating sites |
| **Geographies** | Operations in >1 country |
| **Product Complexity** | >3 distinct product categories |
| **Customer Segments** | >3 distinct customer channels |

### 10.2 GM Layer Integration Steps

1. **Assess Organizational Complexity** - Determine if GM layer adds value
2. **Define GM Scope** - Site, Region, BU, or Country
3. **Clarify Reporting Lines** - Solid vs. dotted line to functions
4. **Establish P&L Boundaries** - Clear accountability definitions
5. **Update OKR Cascade** - Insert GM layer in cascade
6. **Align KPIs** - Define GM-level metrics
7. **Communicate Changes** - Ensure clarity across organization

### 10.3 Common Pitfalls to Avoid

| Pitfall | Mitigation |
|---------|-----------|
| **Unclear P&L boundaries** | Define specific revenue/cost allocation rules |
| **Matrix confusion** | Clearly distinguish solid vs. dotted reporting |
| **Functional bypass** | Establish when GMs engage functions vs. corporate |
| **OKR misalignment** | Ensure GM OKRs explicitly link to C-Suite and cascade to Directors |
| **Authority gaps** | Document decision rights matrix |

---

## 11. Appendices

### 11.1 Related Documents

- PF_CORE_CSUITE_ROLES_MEAT_VERTICAL_v1.0.md
- PF_CORE_CSUITE_INTL_REGULATORY_GOVERNANCE_ADDENDUM_v1.0.md
- MEAT_TRADE_SECTOR_ROLES_ONTOLOGY_VSOM_OKR_CASCADE_v1.0.md
- PRD_PF_CORE_VSOM_Module_v1.0.md

### 11.2 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-04 | Platform Foundation Core | Initial release - GM roles integration |

---

**--- END OF DOCUMENT ---**
