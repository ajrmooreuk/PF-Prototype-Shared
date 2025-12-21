# PF-Core Configurable BSC Ontology
## Agent-Orchestrated, Sector-Adaptive, Mobile-First Scorecard Framework

**Document Version:** 1.0  
**Module:** PF-CORE-BSC-CONFIG (Configurable Balanced Scorecard Ontology)  
**Architecture Pattern:** Agent-Orchestrated Configuration  
**Registry Compliance:** OAA Registry v3.0  
**Status:** DRAFT  
**Date:** December 2025  

---

## 1. Executive Summary

This document defines the **Configurable BSC Ontology** - a flexible, agent-orchestrated framework that enables automatic generation of sector-specific, role-appropriate Balanced Scorecards with real-time SOP (Standard Operating Procedure) app integration. Designed mobile-first for field, floor, and on-the-go access.

### 1.1 Core Design Principles

| Principle | Description |
|-----------|-------------|
| **Agent-Configurable** | Orchestrating agent instantiates sector/role-specific scorecards from ontology templates |
| **Mobile-First** | Optimized for phone/tablet - thumb-friendly, glanceable, offline-capable |
| **Real-Time SOP Integration** | Live feeds from operational apps (Sales Orders, Purchase Orders, QC, etc.) |
| **Role-Contextual** | Each user sees exactly what they need - no more, no less |
| **Action-Oriented** | Every metric links to actionable workflows |
| **Event-Driven** | Push notifications, alerts, and updates in real-time |

### 1.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONFIGURABLE BSC ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  ORCHESTRATING AGENT (BSC Configuration Agent)                        │   │
│  │  • Sector Template Selection                                          │   │
│  │  • Role Configuration                                                 │   │
│  │  • KPI Library Instantiation                                          │   │
│  │  • SOP App Binding                                                    │   │
│  │  • Real-Time Feed Configuration                                       │   │
│  └──────────────────────────────┬───────────────────────────────────────┘   │
│                                 │                                            │
│         ┌───────────────────────┼───────────────────────┐                   │
│         ▼                       ▼                       ▼                   │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────┐             │
│  │   SECTOR    │        │    ROLE     │        │    SOP      │             │
│  │  TEMPLATES  │        │  TEMPLATES  │        │    APPS     │             │
│  │             │        │             │        │             │             │
│  │ • Meat Trade│        │ • C-Suite   │        │ • Sales     │             │
│  │ • Retail    │        │ • GM        │        │ • Purchase  │             │
│  │ • Logistics │        │ • Director  │        │ • Quality   │             │
│  │ • Manufact. │        │ • Manager   │        │ • Logistics │             │
│  │ • Services  │        │ • Operative │        │ • HR        │             │
│  └─────────────┘        └─────────────┘        └─────────────┘             │
│         │                       │                       │                   │
│         └───────────────────────┼───────────────────────┘                   │
│                                 ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  INSTANTIATED SCORECARD                                               │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │   │
│  │  │ BSC Views   │ │ KPI Feeds   │ │ OKR Cascade │ │ SOP Actions │     │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘     │   │
│  └──────────────────────────────┬───────────────────────────────────────┘   │
│                                 │                                            │
│                                 ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  MOBILE-FIRST UI                                                      │   │
│  │  📱 Phone │ 📱 Tablet │ 💻 Desktop (responsive)                       │   │
│  │  • Glanceable Cards    • Swipe Actions    • Push Notifications        │   │
│  │  • Offline Mode        • Voice Input      • Quick Actions             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Configurable Ontology Structure

### 2.1 Core Ontology Components

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "pf": "https://platformfoundation.ai/core/",
    "bsc": "https://platformfoundation.ai/bsc/",
    "sop": "https://platformfoundation.ai/sop/",
    "feed": "https://platformfoundation.ai/feeds/",
    "mobile": "https://platformfoundation.ai/mobile/"
  },
  "@type": "bsc:ConfigurableBSCOntology",
  "@id": "pf:configurable-bsc-ontology-v1",
  "pf:version": "1.0.0",
  
  "bsc:ontologyComponents": {
    "bsc:sectorTemplates": "@ref:SectorTemplateLibrary",
    "bsc:roleTemplates": "@ref:RoleTemplateLibrary",
    "bsc:kpiLibrary": "@ref:ConfigurableKPILibrary",
    "bsc:sopIntegrations": "@ref:SOPIntegrationPatterns",
    "bsc:feedDefinitions": "@ref:RealTimeFeedDefinitions",
    "bsc:mobileComponents": "@ref:MobileUIComponentLibrary"
  }
}
```

### 2.2 Sector Template Structure

```json
{
  "@type": "bsc:SectorTemplate",
  "@id": "bsc:sector-template-structure",
  
  "bsc:sectorDefinition": {
    "bsc:sectorCode": "string (e.g., 'MEAT_TRADE', 'RETAIL', 'LOGISTICS')",
    "bsc:sectorName": "string",
    "bsc:sectorDescription": "string",
    "bsc:industryVerticals": ["array of sub-verticals"],
    "bsc:regulatoryContext": ["array of regulatory frameworks"],
    "bsc:operationalCharacteristics": {
      "bsc:perishability": "boolean",
      "bsc:temperatureControlled": "boolean",
      "bsc:batchTraceable": "boolean",
      "bsc:regulatedExport": "boolean",
      "bsc:certificationRequired": "boolean"
    }
  },
  
  "bsc:bscPerspectiveConfig": {
    "bsc:perspectives": [
      {
        "bsc:perspectiveCode": "FINANCIAL",
        "bsc:sectorEmphasis": "string describing sector focus",
        "bsc:defaultWeight": "integer 0-100",
        "bsc:kpiCategories": ["array of category codes"],
        "bsc:criticalMetrics": ["array of must-have KPI codes"]
      }
    ]
  },
  
  "bsc:sopBindings": {
    "bsc:requiredSOPs": ["array of SOP codes"],
    "bsc:optionalSOPs": ["array of SOP codes"],
    "bsc:sopKPIMappings": [
      {
        "bsc:sopCode": "string",
        "bsc:feedsKPIs": ["array of KPI codes"],
        "bsc:updateFrequency": "real-time | hourly | daily"
      }
    ]
  },
  
  "bsc:roleOverrides": {
    "bsc:perspectiveWeightsByRole": {
      "CEO": {"FINANCIAL": 25, "CUSTOMER": 20, "PROCESS": 15, "LEARNING": 15, "STAKEHOLDER": 25},
      "SiteGM": {"FINANCIAL": 25, "CUSTOMER": 15, "PROCESS": 35, "LEARNING": 15, "STAKEHOLDER": 10}
    }
  }
}
```

### 2.3 Role Template Structure

```json
{
  "@type": "bsc:RoleTemplate",
  "@id": "bsc:role-template-structure",
  
  "bsc:roleDefinition": {
    "bsc:roleCode": "string",
    "bsc:roleName": "string",
    "bsc:roleLevel": "integer (1=C-Suite, 2=GM, 3=Director, 4=Manager, 5=Supervisor, 6=Operative)",
    "bsc:scopeType": "enterprise | region | country | site | bu | function | team | individual",
    "bsc:pnlAccountability": "boolean"
  },
  
  "bsc:viewConfiguration": {
    "bsc:primaryPerspective": "perspective code",
    "bsc:perspectiveWeights": {"FINANCIAL": 25, "...": "..."},
    "bsc:cascadeVisibility": {
      "bsc:seesAbove": "integer levels (0-3)",
      "bsc:seesBelow": "integer levels (0-full)",
      "bsc:drillDownScope": "full | scope-limited"
    },
    "bsc:defaultTimeframe": "today | week | month | quarter",
    "bsc:refreshFrequency": "real-time | 5min | 15min | hourly"
  },
  
  "bsc:kpiSelection": {
    "bsc:mandatoryKPIs": ["array of KPI codes always shown"],
    "bsc:suggestedKPIs": ["array of KPI codes recommended"],
    "bsc:maxKPIsPerPerspective": "integer (mobile optimization)",
    "bsc:alertThresholds": {
      "bsc:critical": "triggers push notification",
      "bsc:warning": "shows in alerts panel",
      "bsc:info": "available on drill-down"
    }
  },
  
  "bsc:sopAccess": {
    "bsc:canInitiate": ["array of SOP codes"],
    "bsc:canApprove": ["array of SOP codes"],
    "bsc:canView": ["array of SOP codes"],
    "bsc:quickActions": ["array of action codes for mobile shortcuts"]
  },
  
  "bsc:mobileConfig": {
    "bsc:homeScreenWidgets": ["array of widget codes"],
    "bsc:swipeActions": ["array of quick action codes"],
    "bsc:voiceCommands": ["array of voice command patterns"],
    "bsc:offlineCapabilities": ["array of offline feature codes"]
  }
}
```

---

## 3. SOP App Integration Framework

### 3.1 SOP App Definitions

```json
{
  "@type": "sop:SOPAppLibrary",
  "@id": "sop:app-library-v1",
  
  "sop:coreSOPApps": [
    {
      "@type": "sop:SOPApp",
      "@id": "sop:SalesOrderProcess",
      "sop:appCode": "SOP-SALES",
      "sop:appName": "Sales Order Process",
      "sop:description": "End-to-end sales order management from quote to invoice",
      "sop:processStages": [
        {"sop:stage": "QUOTE", "sop:name": "Quote Creation", "sop:kpiImpact": ["PIPELINE_VALUE", "QUOTE_CONVERSION"]},
        {"sop:stage": "ORDER", "sop:name": "Order Entry", "sop:kpiImpact": ["ORDER_VALUE", "ORDER_COUNT"]},
        {"sop:stage": "ALLOCATE", "sop:name": "Stock Allocation", "sop:kpiImpact": ["FILL_RATE", "ALLOCATION_TIME"]},
        {"sop:stage": "PICK", "sop:name": "Pick & Pack", "sop:kpiImpact": ["PICK_ACCURACY", "PICK_TIME"]},
        {"sop:stage": "DISPATCH", "sop:name": "Dispatch", "sop:kpiImpact": ["OTIF", "DISPATCH_TIME"]},
        {"sop:stage": "DELIVER", "sop:name": "Delivery", "sop:kpiImpact": ["DELIVERY_SUCCESS", "POD_CAPTURE"]},
        {"sop:stage": "INVOICE", "sop:name": "Invoice & Collect", "sop:kpiImpact": ["DSO", "INVOICE_ACCURACY"]}
      ],
      "sop:realTimeEvents": [
        {"sop:event": "ORDER_CREATED", "sop:feedTo": ["ORDER_VALUE", "ORDER_COUNT"]},
        {"sop:event": "ORDER_SHIPPED", "sop:feedTo": ["DISPATCH_COUNT", "REVENUE_SHIPPED"]},
        {"sop:event": "ORDER_DELIVERED", "sop:feedTo": ["OTIF", "DELIVERY_SUCCESS"]},
        {"sop:event": "PAYMENT_RECEIVED", "sop:feedTo": ["CASH_COLLECTED", "DSO"]}
      ],
      "sop:roleActions": {
        "SalesRep": ["CREATE_QUOTE", "CONVERT_TO_ORDER", "VIEW_STATUS"],
        "SalesManager": ["APPROVE_DISCOUNT", "VIEW_PIPELINE", "REASSIGN_ORDER"],
        "WarehouseOperative": ["PICK_ORDER", "CONFIRM_DISPATCH"],
        "DispatchSupervisor": ["APPROVE_DISPATCH", "MANAGE_ROUTES"],
        "FinanceClerk": ["GENERATE_INVOICE", "RECORD_PAYMENT"]
      }
    },
    {
      "@type": "sop:SOPApp",
      "@id": "sop:PurchaseOrderProcess",
      "sop:appCode": "SOP-PURCHASE",
      "sop:appName": "Purchase Order Process",
      "sop:description": "Procurement from requisition to goods receipt",
      "sop:processStages": [
        {"sop:stage": "REQUISITION", "sop:name": "Purchase Requisition", "sop:kpiImpact": ["DEMAND_FORECAST"]},
        {"sop:stage": "APPROVE", "sop:name": "Approval", "sop:kpiImpact": ["APPROVAL_TIME"]},
        {"sop:stage": "PO_CREATE", "sop:name": "PO Creation", "sop:kpiImpact": ["PO_VALUE", "SUPPLIER_ORDERS"]},
        {"sop:stage": "CONFIRM", "sop:name": "Supplier Confirmation", "sop:kpiImpact": ["CONFIRMATION_RATE"]},
        {"sop:stage": "GOODS_IN", "sop:name": "Goods Receipt", "sop:kpiImpact": ["SUPPLIER_OTD", "GRN_ACCURACY"]},
        {"sop:stage": "QC_CHECK", "sop:name": "Quality Check", "sop:kpiImpact": ["SUPPLIER_QUALITY", "REJECT_RATE"]},
        {"sop:stage": "INVOICE_MATCH", "sop:name": "Invoice Matching", "sop:kpiImpact": ["INVOICE_ACCURACY", "DPO"]}
      ],
      "sop:realTimeEvents": [
        {"sop:event": "PO_RAISED", "sop:feedTo": ["COMMITTED_SPEND", "OPEN_POS"]},
        {"sop:event": "GOODS_RECEIVED", "sop:feedTo": ["STOCK_LEVEL", "SUPPLIER_OTD"]},
        {"sop:event": "QC_PASSED", "sop:feedTo": ["SUPPLIER_QUALITY_SCORE"]},
        {"sop:event": "QC_FAILED", "sop:feedTo": ["REJECT_RATE", "SUPPLIER_NCR"]}
      ]
    },
    {
      "@type": "sop:SOPApp",
      "@id": "sop:QualityControlProcess",
      "sop:appCode": "SOP-QC",
      "sop:appName": "Quality Control Process",
      "sop:description": "Quality inspection, testing, and compliance management",
      "sop:processStages": [
        {"sop:stage": "SAMPLE", "sop:name": "Sample Collection", "sop:kpiImpact": ["SAMPLE_RATE"]},
        {"sop:stage": "INSPECT", "sop:name": "Inspection", "sop:kpiImpact": ["INSPECTION_TIME", "DEFECT_RATE"]},
        {"sop:stage": "TEST", "sop:name": "Laboratory Testing", "sop:kpiImpact": ["MICRO_PASS_RATE", "TEST_TURNAROUND"]},
        {"sop:stage": "RELEASE", "sop:name": "Product Release", "sop:kpiImpact": ["HOLD_TIME", "FALSE_RELEASE"]},
        {"sop:stage": "NCR", "sop:name": "Non-Conformance", "sop:kpiImpact": ["NCR_COUNT", "NCR_CLOSURE_TIME"]},
        {"sop:stage": "CAPA", "sop:name": "Corrective Action", "sop:kpiImpact": ["CAPA_EFFECTIVENESS", "RECURRENCE_RATE"]}
      ],
      "sop:meatTradeSpecific": {
        "sop:ccpMonitoring": ["TEMP_CHECK", "METAL_DETECT", "PH_TEST"],
        "sop:microTesting": ["TVC", "ECOLI", "SALMONELLA", "LISTERIA"],
        "sop:grading": ["MSA_GRADE", "FAT_SCORE", "MARBLE_SCORE"]
      }
    },
    {
      "@type": "sop:SOPApp",
      "@id": "sop:LogisticsProcess",
      "sop:appCode": "SOP-LOGISTICS",
      "sop:appName": "Logistics & Distribution Process",
      "sop:description": "Warehouse operations, transport, and cold chain management",
      "sop:processStages": [
        {"sop:stage": "RECEIVE", "sop:name": "Goods Receipt", "sop:kpiImpact": ["GRN_TIME", "RECEIVING_ACCURACY"]},
        {"sop:stage": "PUTAWAY", "sop:name": "Put-Away", "sop:kpiImpact": ["PUTAWAY_TIME", "LOCATION_ACCURACY"]},
        {"sop:stage": "STORE", "sop:name": "Storage", "sop:kpiImpact": ["TEMP_COMPLIANCE", "INVENTORY_ACCURACY"]},
        {"sop:stage": "PICK", "sop:name": "Order Picking", "sop:kpiImpact": ["PICK_RATE", "PICK_ACCURACY"]},
        {"sop:stage": "LOAD", "sop:name": "Vehicle Loading", "sop:kpiImpact": ["LOAD_TIME", "FILL_RATE"]},
        {"sop:stage": "TRANSPORT", "sop:name": "Transport", "sop:kpiImpact": ["TRANSIT_TEMP", "DELIVERY_TIME"]},
        {"sop:stage": "POD", "sop:name": "Proof of Delivery", "sop:kpiImpact": ["POD_CAPTURE", "DELIVERY_ACCURACY"]}
      ],
      "sop:coldChainMonitoring": {
        "sop:tempSensors": "real-time IoT integration",
        "sop:alertThresholds": {"chilled": {"min": -1, "max": 5}, "frozen": {"min": -25, "max": -18}},
        "sop:excursionEvents": "immediate push notification"
      }
    },
    {
      "@type": "sop:SOPApp",
      "@id": "sop:ProductionProcess",
      "sop:appCode": "SOP-PRODUCTION",
      "sop:appName": "Production & Processing",
      "sop:description": "Manufacturing and processing operations management",
      "sop:processStages": [
        {"sop:stage": "SCHEDULE", "sop:name": "Production Schedule", "sop:kpiImpact": ["SCHEDULE_ADHERENCE"]},
        {"sop:stage": "SETUP", "sop:name": "Line Setup", "sop:kpiImpact": ["CHANGEOVER_TIME", "OEE"]},
        {"sop:stage": "PROCESS", "sop:name": "Processing", "sop:kpiImpact": ["THROUGHPUT", "YIELD", "WASTE"]},
        {"sop:stage": "PACK", "sop:name": "Packaging", "sop:kpiImpact": ["PACK_RATE", "LABEL_ACCURACY"]},
        {"sop:stage": "QC", "sop:name": "In-Line QC", "sop:kpiImpact": ["FIRST_PASS_YIELD", "REWORK_RATE"]}
      ],
      "sop:meatProcessingSpecific": {
        "sop:slaughterLine": ["STUN_RATE", "CHAIN_SPEED", "DRESSING_STANDARD"],
        "sop:boningRoom": ["BONING_YIELD", "CUT_ACCURACY", "LABOR_PRODUCTIVITY"],
        "sop:valuAddLine": ["PORTION_ACCURACY", "MARINATION_TIME", "COOK_TEMP"]
      }
    },
    {
      "@type": "sop:SOPApp",
      "@id": "sop:ComplianceProcess",
      "sop:appCode": "SOP-COMPLIANCE",
      "sop:appName": "Compliance & Certification",
      "sop:description": "Regulatory compliance, audits, and certification management",
      "sop:processStages": [
        {"sop:stage": "AUDIT_PLAN", "sop:name": "Audit Planning", "sop:kpiImpact": ["AUDIT_SCHEDULE_ADHERENCE"]},
        {"sop:stage": "AUDIT_EXEC", "sop:name": "Audit Execution", "sop:kpiImpact": ["FINDING_COUNT", "AUDIT_SCORE"]},
        {"sop:stage": "FINDING", "sop:name": "Finding Management", "sop:kpiImpact": ["FINDING_CLOSURE_RATE"]},
        {"sop:stage": "CERT_MGMT", "sop:name": "Certification Management", "sop:kpiImpact": ["CERT_CURRENCY", "RENEWAL_STATUS"]},
        {"sop:stage": "DOC_CONTROL", "sop:name": "Document Control", "sop:kpiImpact": ["DOC_CURRENCY", "REVIEW_COMPLETION"]}
      ],
      "sop:meatTradeCompliance": {
        "sop:exportDocs": ["HEALTH_CERT", "HALAL_CERT", "CHED_P", "IPAFFS"],
        "sop:audits": ["BRC", "DAFF", "HALAL", "CUSTOMER_AUDIT"],
        "sop:registrations": ["EXPORT_LISTING", "GACC", "FDA"]
      }
    }
  ]
}
```

### 3.2 SOP-to-KPI Real-Time Feed Mapping

```json
{
  "@type": "feed:SOPFeedConfiguration",
  "@id": "feed:sop-kpi-mapping",
  
  "feed:salesOrderFeeds": {
    "feed:realTimeMetrics": [
      {
        "feed:metricCode": "ORDERS_TODAY",
        "feed:sourceEvent": "ORDER_CREATED",
        "feed:aggregation": "COUNT",
        "feed:resetPeriod": "daily",
        "feed:displayFormat": "integer",
        "feed:applicableRoles": ["CEO", "CRO", "SalesDirector", "SalesManager"],
        "feed:mobileWidget": "counter_card"
      },
      {
        "feed:metricCode": "REVENUE_TODAY",
        "feed:sourceEvent": "ORDER_CREATED",
        "feed:aggregation": "SUM(order_value)",
        "feed:resetPeriod": "daily",
        "feed:displayFormat": "currency",
        "feed:applicableRoles": ["CEO", "CFO", "CRO", "SalesDirector"],
        "feed:mobileWidget": "currency_card"
      },
      {
        "feed:metricCode": "ORDERS_PENDING_DISPATCH",
        "feed:sourceEvent": "ORDER_ALLOCATED",
        "feed:aggregation": "COUNT WHERE status = 'ALLOCATED'",
        "feed:resetPeriod": "none",
        "feed:displayFormat": "integer",
        "feed:applicableRoles": ["CSCO", "LogisticsDirector", "DispatchSupervisor"],
        "feed:mobileWidget": "action_card",
        "feed:quickAction": "VIEW_PENDING_ORDERS"
      },
      {
        "feed:metricCode": "OTIF_TODAY",
        "feed:sourceEvent": "ORDER_DELIVERED",
        "feed:calculation": "(COUNT WHERE on_time AND in_full) / (COUNT delivered) * 100",
        "feed:resetPeriod": "daily",
        "feed:displayFormat": "percentage",
        "feed:threshold": {"green": 98, "yellow": 95, "red": 0},
        "feed:applicableRoles": ["CEO", "COO", "CSCO", "LogisticsDirector", "SiteGM"],
        "feed:mobileWidget": "gauge_card"
      }
    ],
    "feed:periodicMetrics": [
      {
        "feed:metricCode": "REVENUE_MTD",
        "feed:calculation": "SUM(order_value) WHERE order_date >= month_start",
        "feed:updateFrequency": "hourly",
        "feed:displayFormat": "currency",
        "feed:comparisonTo": ["target", "prior_year"],
        "feed:mobileWidget": "progress_card"
      },
      {
        "feed:metricCode": "ORDER_CONVERSION_RATE",
        "feed:calculation": "COUNT(orders) / COUNT(quotes) * 100",
        "feed:updateFrequency": "daily",
        "feed:displayFormat": "percentage",
        "feed:mobileWidget": "trend_card"
      }
    ]
  },
  
  "feed:productionFeeds": {
    "feed:realTimeMetrics": [
      {
        "feed:metricCode": "THROUGHPUT_NOW",
        "feed:sourceEvent": "UNIT_PROCESSED",
        "feed:aggregation": "COUNT per hour (rolling)",
        "feed:displayFormat": "rate",
        "feed:unit": "heads/hour",
        "feed:threshold": {"green": 85, "yellow": 75, "red": 0},
        "feed:applicableRoles": ["COO", "SiteGM", "OpsDirector", "ProductionManager"],
        "feed:mobileWidget": "live_gauge"
      },
      {
        "feed:metricCode": "YIELD_SHIFT",
        "feed:sourceEvent": "BONING_COMPLETE",
        "feed:calculation": "SUM(output_weight) / SUM(input_weight) * 100",
        "feed:resetPeriod": "shift",
        "feed:displayFormat": "percentage",
        "feed:threshold": {"green": 72, "yellow": 70, "red": 0},
        "feed:applicableRoles": ["COO", "SiteGM", "OpsDirector", "ProductionManager", "BoningRoomManager"],
        "feed:mobileWidget": "gauge_card"
      },
      {
        "feed:metricCode": "MSA_COMPLIANCE_TODAY",
        "feed:sourceEvent": "GRADING_COMPLETE",
        "feed:calculation": "COUNT(msa_grade >= target) / COUNT(graded) * 100",
        "feed:resetPeriod": "daily",
        "feed:displayFormat": "percentage",
        "feed:applicableRoles": ["COO", "CQO", "SiteGM", "QualityDirector"],
        "feed:mobileWidget": "progress_card"
      }
    ]
  },
  
  "feed:coldChainFeeds": {
    "feed:realTimeMetrics": [
      {
        "feed:metricCode": "TEMP_ZONES_STATUS",
        "feed:sourceEvent": "TEMP_READING",
        "feed:aggregation": "STATUS per zone",
        "feed:displayFormat": "zone_map",
        "feed:alertOnException": true,
        "feed:applicableRoles": ["COO", "CSCO", "SiteGM", "LogisticsDirector", "ColdStoreManager", "QAManager"],
        "feed:mobileWidget": "zone_status_grid"
      },
      {
        "feed:metricCode": "TEMP_EXCURSIONS_TODAY",
        "feed:sourceEvent": "TEMP_EXCURSION",
        "feed:aggregation": "COUNT",
        "feed:resetPeriod": "daily",
        "feed:displayFormat": "integer",
        "feed:criticalAlert": true,
        "feed:applicableRoles": ["COO", "CQO", "CSCO", "SiteGM", "QualityDirector", "ColdStoreManager"],
        "feed:mobileWidget": "alert_counter"
      }
    ]
  },
  
  "feed:qualityFeeds": {
    "feed:realTimeMetrics": [
      {
        "feed:metricCode": "CCP_COMPLIANCE_NOW",
        "feed:sourceEvent": "CCP_CHECK",
        "feed:calculation": "COUNT(pass) / COUNT(total) * 100",
        "feed:resetPeriod": "shift",
        "feed:displayFormat": "percentage",
        "feed:threshold": {"green": 100, "yellow": 98, "red": 0},
        "feed:criticalAlert": true,
        "feed:applicableRoles": ["CQO", "SiteGM", "QualityDirector", "QAManager", "QCSupervisor"],
        "feed:mobileWidget": "compliance_card"
      },
      {
        "feed:metricCode": "OPEN_NCRS",
        "feed:sourceEvent": "NCR_CREATED",
        "feed:aggregation": "COUNT WHERE status = 'OPEN'",
        "feed:displayFormat": "integer",
        "feed:applicableRoles": ["CQO", "QualityDirector", "QAManager"],
        "feed:mobileWidget": "action_counter",
        "feed:quickAction": "VIEW_OPEN_NCRS"
      }
    ]
  }
}
```

---

## 4. Mobile-First UI Component Library

### 4.1 Design Principles for Mobile

| Principle | Implementation |
|-----------|----------------|
| **Thumb-Friendly** | Primary actions in thumb zone, swipe gestures |
| **Glanceable** | Critical info visible without scrolling |
| **Contextual** | Show what's relevant NOW based on time/location |
| **Offline-Capable** | Core features work without connection |
| **Push-Enabled** | Critical alerts delivered instantly |
| **Voice-Ready** | Key actions via voice command |
| **Progressive Disclosure** | Summary → Detail on demand |

### 4.2 Mobile Widget Library

```json
{
  "@type": "mobile:WidgetLibrary",
  "@id": "mobile:widget-library-v1",
  
  "mobile:widgetTypes": [
    {
      "mobile:widgetCode": "COUNTER_CARD",
      "mobile:widgetName": "Counter Card",
      "mobile:description": "Simple count with label and trend",
      "mobile:layout": {
        "mobile:size": "small",
        "mobile:minWidth": "160px",
        "mobile:maxWidth": "200px"
      },
      "mobile:dataBinding": {
        "mobile:primaryValue": "integer or decimal",
        "mobile:label": "string",
        "mobile:trend": "up | down | stable",
        "mobile:trendValue": "percentage change"
      },
      "mobile:interactivity": {
        "mobile:onTap": "drill_to_detail",
        "mobile:onLongPress": "quick_actions_menu"
      },
      "mobile:example": {
        "primaryValue": 47,
        "label": "Orders Today",
        "trend": "up",
        "trendValue": "+12%"
      }
    },
    {
      "mobile:widgetCode": "GAUGE_CARD",
      "mobile:widgetName": "Gauge Card",
      "mobile:description": "Circular gauge with percentage and threshold colors",
      "mobile:layout": {
        "mobile:size": "medium",
        "mobile:minWidth": "180px"
      },
      "mobile:dataBinding": {
        "mobile:value": "percentage 0-100",
        "mobile:target": "percentage",
        "mobile:label": "string",
        "mobile:thresholds": {"green": "number", "yellow": "number", "red": "number"}
      },
      "mobile:interactivity": {
        "mobile:onTap": "drill_to_breakdown",
        "mobile:swipeLeft": "view_trend",
        "mobile:swipeRight": "view_target"
      },
      "mobile:example": {
        "value": 97.2,
        "target": 98.0,
        "label": "OTIF %",
        "thresholds": {"green": 98, "yellow": 95, "red": 0}
      }
    },
    {
      "mobile:widgetCode": "PROGRESS_CARD",
      "mobile:widgetName": "Progress Card",
      "mobile:description": "Linear progress bar with actual vs target",
      "mobile:layout": {
        "mobile:size": "medium",
        "mobile:minWidth": "280px"
      },
      "mobile:dataBinding": {
        "mobile:actual": "number",
        "mobile:target": "number",
        "mobile:label": "string",
        "mobile:unit": "string",
        "mobile:comparisons": ["vs_target", "vs_prior_year", "vs_prior_period"]
      },
      "mobile:example": {
        "actual": 18200000,
        "target": 19200000,
        "label": "Revenue MTD",
        "unit": "£",
        "progress": 94.8
      }
    },
    {
      "mobile:widgetCode": "ZONE_STATUS_GRID",
      "mobile:widgetName": "Zone Status Grid",
      "mobile:description": "Grid of status indicators for zones/areas",
      "mobile:layout": {
        "mobile:size": "large",
        "mobile:fullWidth": true
      },
      "mobile:dataBinding": {
        "mobile:zones": [
          {"id": "string", "name": "string", "status": "green|yellow|red", "value": "number", "unit": "string"}
        ]
      },
      "mobile:interactivity": {
        "mobile:onZoneTap": "zone_detail",
        "mobile:onRedZoneTap": "immediate_action"
      },
      "mobile:example": {
        "zones": [
          {"id": "Z1", "name": "Chiller 1", "status": "green", "value": 2.1, "unit": "°C"},
          {"id": "Z2", "name": "Chiller 2", "status": "green", "value": 2.4, "unit": "°C"},
          {"id": "Z3", "name": "Freezer 1", "status": "yellow", "value": -17.2, "unit": "°C"},
          {"id": "Z4", "name": "Dispatch", "status": "green", "value": 3.1, "unit": "°C"}
        ]
      }
    },
    {
      "mobile:widgetCode": "ACTION_CARD",
      "mobile:widgetName": "Action Card",
      "mobile:description": "Count with prominent action button",
      "mobile:layout": {
        "mobile:size": "medium",
        "mobile:actionProminent": true
      },
      "mobile:dataBinding": {
        "mobile:count": "integer",
        "mobile:label": "string",
        "mobile:actionLabel": "string",
        "mobile:actionCode": "string"
      },
      "mobile:interactivity": {
        "mobile:onActionTap": "execute_action",
        "mobile:onCardTap": "view_list"
      },
      "mobile:example": {
        "count": 12,
        "label": "Orders Pending Dispatch",
        "actionLabel": "Process Now",
        "actionCode": "VIEW_PENDING_DISPATCH"
      }
    },
    {
      "mobile:widgetCode": "OKR_CARD",
      "mobile:widgetName": "OKR Progress Card",
      "mobile:description": "Objective with key results progress",
      "mobile:layout": {
        "mobile:size": "large",
        "mobile:expandable": true
      },
      "mobile:dataBinding": {
        "mobile:objective": "string",
        "mobile:overallProgress": "percentage",
        "mobile:health": "on_track | at_risk | behind",
        "mobile:keyResults": [
          {"kr": "string", "progress": "percentage", "status": "string"}
        ]
      },
      "mobile:interactivity": {
        "mobile:onTap": "expand_key_results",
        "mobile:onKRTap": "update_progress",
        "mobile:swipeLeft": "add_note"
      }
    },
    {
      "mobile:widgetCode": "ALERT_STREAM",
      "mobile:widgetName": "Alert Stream",
      "mobile:description": "Scrollable list of recent alerts",
      "mobile:layout": {
        "mobile:size": "large",
        "mobile:scrollable": true,
        "mobile:maxItems": 10
      },
      "mobile:dataBinding": {
        "mobile:alerts": [
          {"type": "string", "severity": "critical|warning|info", "message": "string", "time": "datetime", "action": "string"}
        ]
      },
      "mobile:interactivity": {
        "mobile:onAlertTap": "view_detail",
        "mobile:swipeRight": "acknowledge",
        "mobile:swipeLeft": "escalate"
      }
    },
    {
      "mobile:widgetCode": "LIVE_FEED",
      "mobile:widgetName": "Live Activity Feed",
      "mobile:description": "Real-time stream of SOP events",
      "mobile:layout": {
        "mobile:size": "large",
        "mobile:scrollable": true,
        "mobile:autoRefresh": true
      },
      "mobile:dataBinding": {
        "mobile:events": [
          {"type": "string", "description": "string", "user": "string", "time": "datetime", "value": "string"}
        ]
      },
      "mobile:example": {
        "events": [
          {"type": "ORDER", "description": "Order #4521 dispatched", "user": "J.Smith", "time": "2 min ago", "value": "£12,450"},
          {"type": "QC", "description": "Batch B-2234 released", "user": "M.Chen", "time": "5 min ago"},
          {"type": "ALERT", "description": "Chiller 3 temp warning", "time": "8 min ago", "severity": "warning"}
        ]
      }
    }
  ]
}
```

### 4.3 Mobile Screen Templates

```json
{
  "@type": "mobile:ScreenTemplates",
  "@id": "mobile:screen-templates-v1",
  
  "mobile:homeScreen": {
    "mobile:layout": "scrollable_cards",
    "mobile:sections": [
      {
        "mobile:sectionCode": "HEALTH_SUMMARY",
        "mobile:sectionName": "At a Glance",
        "mobile:widgets": ["BSC_PERSPECTIVE_SUMMARY"],
        "mobile:alwaysVisible": true,
        "mobile:collapseOnScroll": false
      },
      {
        "mobile:sectionCode": "CRITICAL_METRICS",
        "mobile:sectionName": "Key Metrics",
        "mobile:widgets": ["role_specific_kpi_cards"],
        "mobile:maxWidgets": 6,
        "mobile:gridColumns": 2
      },
      {
        "mobile:sectionCode": "MY_OKRS",
        "mobile:sectionName": "My Objectives",
        "mobile:widgets": ["OKR_CARD"],
        "mobile:expandable": true
      },
      {
        "mobile:sectionCode": "TEAM_STATUS",
        "mobile:sectionName": "Team",
        "mobile:widgets": ["TEAM_OKR_SUMMARY"],
        "mobile:visibleTo": ["Manager", "Director", "GM", "CSuite"]
      },
      {
        "mobile:sectionCode": "ALERTS",
        "mobile:sectionName": "Alerts",
        "mobile:widgets": ["ALERT_STREAM"],
        "mobile:badgeCount": "unacknowledged_count"
      },
      {
        "mobile:sectionCode": "LIVE_FEED",
        "mobile:sectionName": "Activity",
        "mobile:widgets": ["LIVE_FEED"],
        "mobile:optional": true
      }
    ],
    "mobile:quickActions": {
      "mobile:fabAction": "role_primary_action",
      "mobile:pullDown": "refresh_all",
      "mobile:shake": "voice_command"
    }
  },
  
  "mobile:sopActionScreen": {
    "mobile:layout": "action_focused",
    "mobile:sections": [
      {
        "mobile:sectionCode": "CONTEXT",
        "mobile:description": "What this action is about",
        "mobile:dataBinding": "entity_summary"
      },
      {
        "mobile:sectionCode": "ACTION_FORM",
        "mobile:description": "Input fields for action",
        "mobile:formType": "sop_specific"
      },
      {
        "mobile:sectionCode": "ATTACHMENTS",
        "mobile:description": "Photos, signatures, documents",
        "mobile:capabilities": ["camera", "signature", "file_upload"]
      },
      {
        "mobile:sectionCode": "SUBMIT",
        "mobile:description": "Confirm and submit",
        "mobile:requiresConfirmation": true
      }
    ]
  },
  
  "mobile:drillDownScreen": {
    "mobile:layout": "detail_view",
    "mobile:sections": [
      {
        "mobile:sectionCode": "HEADER",
        "mobile:content": "metric_summary_with_trend"
      },
      {
        "mobile:sectionCode": "CHART",
        "mobile:content": "time_series_chart",
        "mobile:interactions": ["pinch_zoom", "pan", "tap_for_value"]
      },
      {
        "mobile:sectionCode": "BREAKDOWN",
        "mobile:content": "dimension_breakdown_list",
        "mobile:sortable": true,
        "mobile:filterable": true
      },
      {
        "mobile:sectionCode": "RELATED_ACTIONS",
        "mobile:content": "contextual_action_buttons"
      }
    ]
  }
}
```

### 4.4 Role-Specific Mobile Configurations

```json
{
  "@type": "mobile:RoleMobileConfigs",
  "@id": "mobile:role-configs-v1",
  
  "mobile:configurations": [
    {
      "mobile:roleCode": "CEO",
      "mobile:homeWidgets": [
        {"widget": "BSC_SUMMARY", "position": 1},
        {"widget": "REVENUE_MTD", "position": 2},
        {"widget": "EBITDA_MTD", "position": 3},
        {"widget": "NPS_SCORE", "position": 4},
        {"widget": "CRITICAL_ALERTS", "position": 5},
        {"widget": "CSUITE_OKR_STATUS", "position": 6}
      ],
      "mobile:quickActions": [
        {"action": "VIEW_BOARD_PACK", "icon": "briefcase"},
        {"action": "CALL_CSUITE", "icon": "phone"},
        {"action": "VOICE_QUERY", "icon": "mic"}
      ],
      "mobile:notifications": {
        "critical": "immediate",
        "warning": "batched_hourly",
        "info": "daily_digest"
      },
      "mobile:voiceCommands": [
        "What's our revenue today?",
        "How are we tracking against budget?",
        "Show me critical alerts",
        "What's the OTIF performance?"
      ]
    },
    {
      "mobile:roleCode": "SiteGM",
      "mobile:homeWidgets": [
        {"widget": "SITE_HEALTH_SUMMARY", "position": 1},
        {"widget": "THROUGHPUT_TODAY", "position": 2},
        {"widget": "YIELD_TODAY", "position": 3},
        {"widget": "COLD_CHAIN_STATUS", "position": 4},
        {"widget": "SAFETY_STATUS", "position": 5},
        {"widget": "ORDERS_PENDING", "position": 6},
        {"widget": "TEAM_OKR_STATUS", "position": 7},
        {"widget": "ALERT_STREAM", "position": 8}
      ],
      "mobile:quickActions": [
        {"action": "FLOOR_WALKTHROUGH", "icon": "walk"},
        {"action": "APPROVE_DISPATCH", "icon": "truck"},
        {"action": "VIEW_SCHEDULE", "icon": "calendar"},
        {"action": "ESCALATE_ISSUE", "icon": "alert"}
      ],
      "mobile:notifications": {
        "critical": "immediate",
        "warning": "immediate",
        "info": "batched_4hourly"
      },
      "mobile:geofencing": {
        "onSiteArrival": "show_site_dashboard",
        "onSiteDeparture": "show_summary_view"
      }
    },
    {
      "mobile:roleCode": "QCSupervisor",
      "mobile:homeWidgets": [
        {"widget": "CCP_COMPLIANCE_NOW", "position": 1},
        {"widget": "TEMP_ZONES_STATUS", "position": 2},
        {"widget": "PENDING_INSPECTIONS", "position": 3},
        {"widget": "OPEN_NCRS", "position": 4},
        {"widget": "MICRO_RESULTS_PENDING", "position": 5},
        {"widget": "MY_OKRS", "position": 6}
      ],
      "mobile:quickActions": [
        {"action": "LOG_CCP_CHECK", "icon": "clipboard_check"},
        {"action": "RAISE_NCR", "icon": "alert_triangle"},
        {"action": "SCAN_BATCH", "icon": "barcode"},
        {"action": "TAKE_PHOTO", "icon": "camera"}
      ],
      "mobile:notifications": {
        "critical": "immediate_with_sound",
        "warning": "immediate",
        "info": "batched_hourly"
      },
      "mobile:offlineCapabilities": [
        "LOG_CCP_CHECK",
        "TAKE_PHOTO",
        "VIEW_PROCEDURES",
        "SCAN_BATCH"
      ]
    },
    {
      "mobile:roleCode": "DispatchSupervisor",
      "mobile:homeWidgets": [
        {"widget": "ORDERS_TO_DISPATCH", "position": 1},
        {"widget": "VEHICLES_STATUS", "position": 2},
        {"widget": "OTIF_TODAY", "position": 3},
        {"widget": "PICK_ACCURACY", "position": 4},
        {"widget": "COLD_CHAIN_DISPATCH", "position": 5}
      ],
      "mobile:quickActions": [
        {"action": "CONFIRM_DISPATCH", "icon": "truck"},
        {"action": "ASSIGN_VEHICLE", "icon": "van"},
        {"action": "SCAN_PALLET", "icon": "barcode"},
        {"action": "VIEW_ROUTE", "icon": "map"}
      ],
      "mobile:notifications": {
        "critical": "immediate_with_sound",
        "warning": "immediate"
      }
    },
    {
      "mobile:roleCode": "SalesRep",
      "mobile:homeWidgets": [
        {"widget": "MY_REVENUE_MTD", "position": 1},
        {"widget": "MY_ORDERS_TODAY", "position": 2},
        {"widget": "MY_PIPELINE", "position": 3},
        {"widget": "MY_CUSTOMERS_ACTIVITY", "position": 4},
        {"widget": "MY_OKRS", "position": 5}
      ],
      "mobile:quickActions": [
        {"action": "CREATE_QUOTE", "icon": "file_plus"},
        {"action": "CREATE_ORDER", "icon": "shopping_cart"},
        {"action": "CALL_CUSTOMER", "icon": "phone"},
        {"action": "CHECK_STOCK", "icon": "package"}
      ],
      "mobile:offlineCapabilities": [
        "VIEW_CUSTOMER_INFO",
        "VIEW_PRICE_LIST",
        "CREATE_QUOTE_DRAFT",
        "VIEW_PRODUCT_CATALOG"
      ]
    }
  ]
}
```

---

## 5. Agent Orchestration Interface

### 5.1 BSC Configuration Agent Definition

```json
{
  "@type": "pf:AgentDefinition",
  "@id": "pf:BSCConfigurationAgent",
  
  "pf:agentName": "BSC Configuration Agent",
  "pf:agentPurpose": "Orchestrate the creation and configuration of sector-specific, role-appropriate Balanced Scorecards with SOP integration",
  
  "pf:capabilities": [
    {
      "pf:capability": "SECTOR_ANALYSIS",
      "pf:description": "Analyze business context to determine appropriate sector template",
      "pf:inputs": ["business_description", "industry_codes", "operational_characteristics"],
      "pf:outputs": ["sector_template_recommendation", "confidence_score"]
    },
    {
      "pf:capability": "ROLE_MAPPING",
      "pf:description": "Map organization roles to BSC role templates",
      "pf:inputs": ["org_structure", "role_definitions", "reporting_lines"],
      "pf:outputs": ["role_template_assignments", "perspective_weights", "scope_definitions"]
    },
    {
      "pf:capability": "KPI_SELECTION",
      "pf:description": "Select and configure appropriate KPIs from library",
      "pf:inputs": ["sector_template", "role_templates", "business_priorities", "data_availability"],
      "pf:outputs": ["kpi_configuration", "threshold_recommendations", "data_source_mappings"]
    },
    {
      "pf:capability": "SOP_BINDING",
      "pf:description": "Configure SOP app integrations and real-time feeds",
      "pf:inputs": ["available_sop_apps", "kpi_configuration", "role_templates"],
      "pf:outputs": ["sop_bindings", "feed_configurations", "event_mappings"]
    },
    {
      "pf:capability": "MOBILE_CONFIG",
      "pf:description": "Configure mobile UI for each role",
      "pf:inputs": ["role_templates", "kpi_configuration", "sop_bindings"],
      "pf:outputs": ["mobile_widget_configs", "quick_actions", "notification_rules"]
    },
    {
      "pf:capability": "SCORECARD_INSTANTIATION",
      "pf:description": "Create the complete scorecard instance",
      "pf:inputs": ["all_configurations"],
      "pf:outputs": ["instantiated_scorecard", "deployment_artifacts"]
    }
  ],
  
  "pf:orchestrationFlow": {
    "pf:steps": [
      {
        "pf:step": 1,
        "pf:action": "GATHER_CONTEXT",
        "pf:description": "Collect business information through conversation or document analysis",
        "pf:requiredInputs": ["business_name", "industry", "size", "geographic_scope"]
      },
      {
        "pf:step": 2,
        "pf:action": "SELECT_SECTOR_TEMPLATE",
        "pf:description": "Match business to most appropriate sector template",
        "pf:decision": "sector_template_selection"
      },
      {
        "pf:step": 3,
        "pf:action": "MAP_ORGANIZATION",
        "pf:description": "Map org structure to role templates",
        "pf:requiredInputs": ["org_chart", "role_names", "reporting_structure"]
      },
      {
        "pf:step": 4,
        "pf:action": "CONFIGURE_KPIS",
        "pf:description": "Select and configure KPIs for each role",
        "pf:interactive": true,
        "pf:allowsCustomization": true
      },
      {
        "pf:step": 5,
        "pf:action": "BIND_SOP_APPS",
        "pf:description": "Connect SOP applications and configure feeds",
        "pf:requiredInputs": ["available_systems", "api_endpoints"]
      },
      {
        "pf:step": 6,
        "pf:action": "CONFIGURE_MOBILE",
        "pf:description": "Set up mobile experience for each role",
        "pf:defaults": "role_template_defaults"
      },
      {
        "pf:step": 7,
        "pf:action": "VALIDATE_AND_DEPLOY",
        "pf:description": "Validate configuration and deploy scorecard",
        "pf:outputs": ["deployment_package", "user_credentials", "mobile_app_config"]
      }
    ]
  }
}
```

### 5.2 Agent Prompt Templates

```json
{
  "@type": "pf:AgentPromptTemplates",
  "@id": "pf:bsc-agent-prompts",
  
  "pf:prompts": {
    "sector_analysis": {
      "pf:systemPrompt": "You are the BSC Configuration Agent. Your task is to analyze the business context and recommend the most appropriate sector template. Consider industry, operational characteristics, regulatory requirements, and business model.",
      "pf:userPromptTemplate": "Analyze this business and recommend a sector template:\n\nBusiness: {{business_name}}\nIndustry: {{industry}}\nDescription: {{description}}\nKey Operations: {{operations}}\nRegulatory Context: {{regulations}}\n\nProvide your recommendation with confidence score and rationale."
    },
    
    "role_configuration": {
      "pf:systemPrompt": "You are configuring role-based scorecard views. For each organizational role, determine the appropriate BSC perspective weights, KPI focus areas, and cascade visibility settings.",
      "pf:userPromptTemplate": "Configure scorecard for this role:\n\nRole: {{role_name}}\nReports To: {{reports_to}}\nDirect Reports: {{direct_reports}}\nKey Responsibilities: {{responsibilities}}\nSector: {{sector}}\n\nProvide:\n1. BSC perspective weights\n2. Priority KPIs (max 6 for mobile)\n3. Quick actions\n4. Alert thresholds"
    },
    
    "kpi_selection": {
      "pf:systemPrompt": "You are selecting KPIs from the sector KPI library. Consider role relevance, data availability, actionability, and mobile display constraints. Maximum 6 KPIs per role for mobile home screen.",
      "pf:userPromptTemplate": "Select KPIs for:\n\nRole: {{role_name}}\nSector: {{sector}}\nBSC Weights: {{perspective_weights}}\nAvailable Data Sources: {{data_sources}}\nBusiness Priorities: {{priorities}}\n\nSelect from library and configure thresholds."
    },
    
    "sop_binding": {
      "pf:systemPrompt": "You are configuring SOP app integrations. Map SOP events to KPI feeds, configure real-time updates, and set up role-appropriate actions.",
      "pf:userPromptTemplate": "Configure SOP integration:\n\nAvailable SOPs: {{available_sops}}\nRole: {{role_name}}\nKPIs to Feed: {{role_kpis}}\n\nProvide:\n1. Event-to-KPI mappings\n2. Update frequencies\n3. Role actions\n4. Alert triggers"
    }
  }
}
```

### 5.3 Configuration Output Schema

```json
{
  "@type": "bsc:ScorecardInstance",
  "@id": "bsc:instance-schema",
  
  "bsc:instanceMetadata": {
    "bsc:instanceId": "UUID",
    "bsc:businessName": "string",
    "bsc:sectorTemplate": "@ref:SectorTemplate",
    "bsc:createdAt": "datetime",
    "bsc:createdBy": "@ref:BSCConfigurationAgent",
    "bsc:version": "string"
  },
  
  "bsc:scopeConfiguration": {
    "bsc:enterprise": {
      "bsc:name": "string",
      "bsc:id": "UUID"
    },
    "bsc:regions": [{"bsc:name": "string", "bsc:id": "UUID"}],
    "bsc:sites": [{"bsc:name": "string", "bsc:id": "UUID", "bsc:regionId": "UUID"}],
    "bsc:businessUnits": [{"bsc:name": "string", "bsc:id": "UUID"}],
    "bsc:functions": [{"bsc:name": "string", "bsc:id": "UUID"}]
  },
  
  "bsc:roleConfigurations": [
    {
      "bsc:roleId": "UUID",
      "bsc:roleCode": "string",
      "bsc:roleName": "string",
      "bsc:roleTemplate": "@ref:RoleTemplate",
      "bsc:scopeType": "string",
      "bsc:scopeId": "UUID",
      "bsc:perspectiveWeights": {
        "FINANCIAL": "integer",
        "CUSTOMER": "integer",
        "PROCESS": "integer",
        "LEARNING": "integer",
        "STAKEHOLDER": "integer"
      },
      "bsc:kpiAssignments": [
        {
          "bsc:kpiCode": "string",
          "bsc:displayPosition": "integer",
          "bsc:thresholds": {"green": "number", "yellow": "number", "red": "number"},
          "bsc:alertEnabled": "boolean"
        }
      ],
      "bsc:mobileConfig": {
        "bsc:homeWidgets": ["array of widget configs"],
        "bsc:quickActions": ["array of action configs"],
        "bsc:notificationRules": {"critical": "string", "warning": "string", "info": "string"}
      },
      "bsc:sopActions": {
        "bsc:canInitiate": ["array of SOP codes"],
        "bsc:canApprove": ["array of SOP codes"],
        "bsc:canView": ["array of SOP codes"]
      }
    }
  ],
  
  "bsc:sopIntegrations": [
    {
      "bsc:sopCode": "string",
      "bsc:sopName": "string",
      "bsc:apiEndpoint": "string",
      "bsc:authMethod": "string",
      "bsc:eventMappings": [
        {
          "bsc:event": "string",
          "bsc:feedsKPIs": ["array of KPI codes"],
          "bsc:updateType": "increment | set | calculate"
        }
      ],
      "bsc:webhookConfig": {
        "bsc:endpoint": "string",
        "bsc:events": ["array of event types"]
      }
    }
  ],
  
  "bsc:feedConfigurations": [
    {
      "bsc:feedCode": "string",
      "bsc:sourceSystem": "string",
      "bsc:updateFrequency": "string",
      "bsc:calculation": "string",
      "bsc:targetKPIs": ["array of KPI codes"]
    }
  ]
}
```

---

## 6. Sector Template Library

### 6.1 Meat Trade Sector Template

```json
{
  "@type": "bsc:SectorTemplate",
  "@id": "bsc:sector-meat-trade",
  
  "bsc:sectorCode": "MEAT_TRADE",
  "bsc:sectorName": "International Meat Trade",
  "bsc:sectorDescription": "Meat exporters, importers, wholesalers, processors with cold chain and regulatory requirements",
  
  "bsc:industryVerticals": [
    "Meat Exporter",
    "Meat Importer", 
    "Meat Wholesaler",
    "Meat Processor",
    "Cold Storage Operator"
  ],
  
  "bsc:operationalCharacteristics": {
    "perishability": true,
    "temperatureControlled": true,
    "batchTraceable": true,
    "regulatedExport": true,
    "certificationRequired": true,
    "commodityPricing": true,
    "yieldCritical": true
  },
  
  "bsc:regulatoryFrameworks": [
    "HACCP", "BRC", "FSSC22000",
    "DAFF", "FSA", "USDA", "GACC",
    "Halal", "Kosher",
    "EU Hygiene Package", "IPAFFS"
  ],
  
  "bsc:perspectiveConfig": {
    "FINANCIAL": {
      "sectorEmphasis": "Margin, yield value, working capital for perishables, commodity hedging",
      "defaultWeight": 25,
      "criticalKPIs": ["REVENUE", "GROSS_MARGIN", "YIELD_VALUE", "WORKING_CAPITAL_DAYS"],
      "kpiCategories": ["Revenue", "Profitability", "YieldEfficiency", "CashManagement"]
    },
    "CUSTOMER": {
      "sectorEmphasis": "Service level, specification compliance, cold chain integrity to customer",
      "defaultWeight": 20,
      "criticalKPIs": ["OTIF", "CUSTOMER_COMPLAINTS", "SPEC_COMPLIANCE", "NPS"],
      "kpiCategories": ["ServiceLevel", "Quality", "Satisfaction", "Retention"]
    },
    "PROCESS": {
      "sectorEmphasis": "Cold chain, food safety, yield optimization, throughput",
      "defaultWeight": 30,
      "criticalKPIs": ["COLD_CHAIN_COMPLIANCE", "HACCP_COMPLIANCE", "YIELD", "THROUGHPUT"],
      "kpiCategories": ["ColdChain", "FoodSafety", "Processing", "Logistics"]
    },
    "LEARNING": {
      "sectorEmphasis": "Safety culture, food safety competency, skills for yield improvement",
      "defaultWeight": 10,
      "criticalKPIs": ["LTIFR", "FOOD_SAFETY_CERT", "TURNOVER", "ENGAGEMENT"],
      "kpiCategories": ["Safety", "Competency", "Retention", "Culture"]
    },
    "STAKEHOLDER": {
      "sectorEmphasis": "Export licenses, certifications, supplier compliance, animal welfare",
      "defaultWeight": 15,
      "criticalKPIs": ["EXPORT_STATUS", "CERT_CURRENCY", "SUPPLIER_COMPLIANCE", "AUDIT_SCORE"],
      "kpiCategories": ["Regulatory", "Certification", "SupplierCompliance", "Sustainability"]
    }
  },
  
  "bsc:sopBindings": {
    "requiredSOPs": ["SOP-SALES", "SOP-PURCHASE", "SOP-QC", "SOP-LOGISTICS", "SOP-COMPLIANCE"],
    "optionalSOPs": ["SOP-PRODUCTION", "SOP-HR"],
    "sopKPIMappings": [
      {"sopCode": "SOP-SALES", "feedsKPIs": ["REVENUE", "ORDER_COUNT", "OTIF", "DSO"]},
      {"sopCode": "SOP-PURCHASE", "feedsKPIs": ["SUPPLIER_OTD", "SUPPLIER_QUALITY", "STOCK_DAYS"]},
      {"sopCode": "SOP-QC", "feedsKPIs": ["HACCP_COMPLIANCE", "MICRO_PASS_RATE", "NCR_COUNT", "COMPLAINTS"]},
      {"sopCode": "SOP-LOGISTICS", "feedsKPIs": ["COLD_CHAIN_COMPLIANCE", "OTIF", "INVENTORY_ACCURACY"]},
      {"sopCode": "SOP-PRODUCTION", "feedsKPIs": ["THROUGHPUT", "YIELD", "MSA_COMPLIANCE", "WASTE"]},
      {"sopCode": "SOP-COMPLIANCE", "feedsKPIs": ["CERT_CURRENCY", "AUDIT_SCORE", "FINDING_CLOSURE"]}
    ]
  },
  
  "bsc:roleOverrides": {
    "CEO": {"FINANCIAL": 25, "CUSTOMER": 20, "PROCESS": 15, "LEARNING": 15, "STAKEHOLDER": 25},
    "CFO": {"FINANCIAL": 50, "CUSTOMER": 10, "PROCESS": 15, "LEARNING": 10, "STAKEHOLDER": 15},
    "COO": {"FINANCIAL": 20, "CUSTOMER": 15, "PROCESS": 40, "LEARNING": 15, "STAKEHOLDER": 10},
    "CRO": {"FINANCIAL": 30, "CUSTOMER": 40, "PROCESS": 10, "LEARNING": 10, "STAKEHOLDER": 10},
    "CQO": {"FINANCIAL": 10, "CUSTOMER": 25, "PROCESS": 40, "LEARNING": 10, "STAKEHOLDER": 15},
    "CSCO": {"FINANCIAL": 25, "CUSTOMER": 20, "PROCESS": 35, "LEARNING": 10, "STAKEHOLDER": 10},
    "SiteGM": {"FINANCIAL": 25, "CUSTOMER": 15, "PROCESS": 35, "LEARNING": 15, "STAKEHOLDER": 10},
    "QAManager": {"FINANCIAL": 10, "CUSTOMER": 25, "PROCESS": 45, "LEARNING": 15, "STAKEHOLDER": 5},
    "ProductionManager": {"FINANCIAL": 15, "CUSTOMER": 15, "PROCESS": 50, "LEARNING": 15, "STAKEHOLDER": 5},
    "QCSupervisor": {"FINANCIAL": 5, "CUSTOMER": 20, "PROCESS": 55, "LEARNING": 15, "STAKEHOLDER": 5}
  },
  
  "bsc:mobileQuickActions": {
    "QCSupervisor": ["LOG_CCP_CHECK", "SCAN_BATCH", "RAISE_NCR", "CHECK_TEMP"],
    "DispatchSupervisor": ["CONFIRM_DISPATCH", "ASSIGN_ROUTE", "SCAN_PALLET", "CHECK_VEHICLE"],
    "ProductionManager": ["VIEW_THROUGHPUT", "LOG_DOWNTIME", "VIEW_YIELD", "STAFF_ALLOCATION"],
    "SalesRep": ["CREATE_ORDER", "CHECK_STOCK", "VIEW_CUSTOMER", "CREATE_QUOTE"]
  }
}
```

### 6.2 Template Extension Pattern

For creating additional sector templates, the agent follows this pattern:

```json
{
  "@type": "bsc:SectorTemplateCreationPattern",
  
  "bsc:steps": [
    {
      "step": 1,
      "action": "IDENTIFY_CHARACTERISTICS",
      "questions": [
        "What are the primary products/services?",
        "Is the product perishable?",
        "Are there temperature requirements?",
        "What regulatory frameworks apply?",
        "What certifications are required?",
        "Is batch/lot traceability required?",
        "What are the critical quality parameters?",
        "What are the key operational processes?"
      ]
    },
    {
      "step": 2,
      "action": "SELECT_BASE_TEMPLATE",
      "options": [
        {"template": "MEAT_TRADE", "match_criteria": "perishable, cold chain, export regulated"},
        {"template": "RETAIL", "match_criteria": "consumer facing, inventory, omnichannel"},
        {"template": "LOGISTICS", "match_criteria": "transport, warehousing, 3PL"},
        {"template": "MANUFACTURING", "match_criteria": "production, assembly, quality"},
        {"template": "SERVICES", "match_criteria": "professional services, projects, time-based"}
      ]
    },
    {
      "step": 3,
      "action": "CUSTOMIZE_PERSPECTIVES",
      "considerations": [
        "Adjust perspective weights based on industry priorities",
        "Add sector-specific KPI categories",
        "Define critical KPIs for the sector",
        "Set appropriate thresholds"
      ]
    },
    {
      "step": 4,
      "action": "CONFIGURE_SOPS",
      "considerations": [
        "Identify applicable standard SOPs",
        "Add sector-specific SOP extensions",
        "Map SOP events to KPIs",
        "Define role-specific actions"
      ]
    },
    {
      "step": 5,
      "action": "DEFINE_MOBILE_EXPERIENCE",
      "considerations": [
        "Prioritize KPIs for mobile display",
        "Define role-specific quick actions",
        "Configure alert thresholds",
        "Set offline capabilities"
      ]
    }
  ]
}
```

---

## 7. Real-Time Event Architecture

### 7.1 Event Stream Configuration

```json
{
  "@type": "feed:EventStreamArchitecture",
  "@id": "feed:event-architecture-v1",
  
  "feed:eventSources": [
    {
      "feed:sourceType": "SOP_APP",
      "feed:connectionMethod": "webhook",
      "feed:eventFormat": "JSON",
      "feed:deliveryGuarantee": "at-least-once",
      "feed:retryPolicy": {"maxRetries": 3, "backoffMs": 1000}
    },
    {
      "feed:sourceType": "IOT_SENSOR",
      "feed:connectionMethod": "mqtt",
      "feed:eventFormat": "JSON",
      "feed:deliveryGuarantee": "at-most-once",
      "feed:samplingRate": "5s"
    },
    {
      "feed:sourceType": "ERP_SYSTEM",
      "feed:connectionMethod": "polling",
      "feed:pollInterval": "60s",
      "feed:changeDetection": "timestamp_based"
    }
  ],
  
  "feed:eventProcessing": {
    "feed:ingestion": {
      "feed:service": "Supabase Realtime",
      "feed:channel": "scorecard_events",
      "feed:authentication": "JWT"
    },
    "feed:transformation": {
      "feed:service": "Edge Functions",
      "feed:operations": ["validate", "enrich", "aggregate", "route"]
    },
    "feed:storage": {
      "feed:hotStorage": "Supabase (PostgreSQL)",
      "feed:coldStorage": "Object Storage (S3/R2)",
      "feed:retentionPolicy": {"hot": "90d", "cold": "7y"}
    },
    "feed:delivery": {
      "feed:realtime": "Supabase Realtime Channels",
      "feed:push": "Firebase Cloud Messaging",
      "feed:email": "SendGrid (daily digest)"
    }
  },
  
  "feed:eventTypes": [
    {
      "feed:eventType": "METRIC_UPDATE",
      "feed:schema": {
        "metricCode": "string",
        "scopeId": "UUID",
        "value": "number",
        "timestamp": "datetime",
        "source": "string"
      },
      "feed:processing": "aggregate_and_store",
      "feed:notification": "if_threshold_breached"
    },
    {
      "feed:eventType": "ALERT_TRIGGERED",
      "feed:schema": {
        "alertType": "string",
        "severity": "critical|warning|info",
        "message": "string",
        "scopeId": "UUID",
        "relatedEntity": "object"
      },
      "feed:processing": "store_and_notify",
      "feed:notification": "immediate_for_critical"
    },
    {
      "feed:eventType": "SOP_ACTION",
      "feed:schema": {
        "sopCode": "string",
        "action": "string",
        "userId": "UUID",
        "entityId": "UUID",
        "data": "object",
        "timestamp": "datetime"
      },
      "feed:processing": "update_related_metrics",
      "feed:notification": "role_based"
    }
  ]
}
```

### 7.2 Supabase Real-Time Configuration

```sql
-- Enable real-time for scorecard tables
ALTER PUBLICATION supabase_realtime ADD TABLE scorecard_kpi_values;
ALTER PUBLICATION supabase_realtime ADD TABLE scorecard_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE scorecard_okrs;

-- Create real-time channels for role-based subscriptions
CREATE OR REPLACE FUNCTION get_user_realtime_channel(p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_role_scope TEXT;
BEGIN
    SELECT scope_type || ':' || scope_id::TEXT
    INTO v_role_scope
    FROM scorecard_user_roles
    WHERE user_id = p_user_id
    LIMIT 1;
    
    RETURN 'scorecard:' || v_role_scope;
END;
$$ LANGUAGE plpgsql;

-- Trigger to broadcast KPI updates
CREATE OR REPLACE FUNCTION broadcast_kpi_update()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify(
        'scorecard_updates',
        json_build_object(
            'type', 'KPI_UPDATE',
            'scope_type', NEW.scope_type,
            'scope_id', NEW.scope_id,
            'kpi_id', NEW.kpi_id,
            'value', NEW.value,
            'health_status', NEW.health_status,
            'timestamp', NEW.recorded_at
        )::TEXT
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER kpi_update_broadcast
AFTER INSERT OR UPDATE ON scorecard_kpi_values
FOR EACH ROW EXECUTE FUNCTION broadcast_kpi_update();

-- Trigger to broadcast alerts
CREATE OR REPLACE FUNCTION broadcast_alert()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify(
        'scorecard_alerts',
        json_build_object(
            'type', 'ALERT',
            'alert_id', NEW.id,
            'alert_type', NEW.alert_type,
            'severity', NEW.severity,
            'scope_type', NEW.scope_type,
            'scope_id', NEW.scope_id,
            'message', NEW.message,
            'timestamp', NEW.triggered_at
        )::TEXT
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER alert_broadcast
AFTER INSERT ON scorecard_alerts
FOR EACH ROW EXECUTE FUNCTION broadcast_alert();
```

---

## 8. Offline Capability & Sync

### 8.1 Offline Data Strategy

```json
{
  "@type": "mobile:OfflineStrategy",
  "@id": "mobile:offline-v1",
  
  "mobile:offlineCapabilities": {
    "mobile:dataSync": {
      "mobile:syncMethod": "incremental",
      "mobile:conflictResolution": "server_wins_with_queue",
      "mobile:syncTriggers": ["app_foreground", "network_restored", "manual"],
      "mobile:backgroundSync": true
    },
    
    "mobile:offlineData": {
      "mobile:cached": [
        {"data": "user_profile", "refresh": "daily"},
        {"data": "kpi_definitions", "refresh": "weekly"},
        {"data": "kpi_values_recent", "refresh": "hourly", "depth": "7_days"},
        {"data": "my_okrs", "refresh": "hourly"},
        {"data": "team_okrs", "refresh": "4_hourly"},
        {"data": "product_catalog", "refresh": "daily"},
        {"data": "customer_list", "refresh": "daily"},
        {"data": "sop_procedures", "refresh": "weekly"}
      ],
      "mobile:notCached": [
        "live_feed",
        "real_time_alerts",
        "chat_messages"
      ]
    },
    
    "mobile:offlineActions": {
      "mobile:queueable": [
        {"action": "LOG_CCP_CHECK", "maxQueueSize": 100},
        {"action": "TAKE_PHOTO", "maxQueueSize": 50},
        {"action": "UPDATE_OKR_PROGRESS", "maxQueueSize": 20},
        {"action": "CREATE_NCR_DRAFT", "maxQueueSize": 10},
        {"action": "CREATE_ORDER_DRAFT", "maxQueueSize": 10}
      ],
      "mobile:requiresOnline": [
        "APPROVE_DISPATCH",
        "CONFIRM_PAYMENT",
        "SUBMIT_ORDER",
        "RELEASE_PRODUCT"
      ]
    }
  },
  
  "mobile:syncIndicators": {
    "mobile:statusBadge": "shows_pending_sync_count",
    "mobile:lastSyncTime": "displayed_in_settings",
    "mobile:offlineMode": "banner_notification"
  }
}
```

---

## 9. Implementation Guide

### 9.1 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  MOBILE APPS (React Native / Flutter)                                │    │
│  │  iOS │ Android │ Tablet (iPad/Android)                               │    │
│  │  • Offline-first with sync                                           │    │
│  │  • Push notifications (FCM/APNs)                                     │    │
│  │  • Biometric auth                                                    │    │
│  └─────────────────────────────────┬───────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  API LAYER (Supabase Edge Functions + PostgREST)                     │    │
│  │  • RESTful APIs                                                      │    │
│  │  • Real-time subscriptions                                           │    │
│  │  • Row Level Security                                                │    │
│  └─────────────────────────────────┬───────────────────────────────────┘    │
│                                    │                                         │
│          ┌─────────────────────────┼─────────────────────────┐              │
│          ▼                         ▼                         ▼              │
│  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐        │
│  │  SUPABASE    │         │   SUPABASE   │         │  SUPABASE    │        │
│  │  DATABASE    │         │   REALTIME   │         │  STORAGE     │        │
│  │  (PostgreSQL)│         │  (Channels)  │         │  (S3)        │        │
│  └──────────────┘         └──────────────┘         └──────────────┘        │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  INTEGRATION LAYER                                                   │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐           │    │
│  │  │ SOP Apps  │ │ ERP       │ │ IoT       │ │ External  │           │    │
│  │  │ (Webhooks)│ │ (Polling) │ │ (MQTT)    │ │ APIs      │           │    │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  BSC CONFIGURATION AGENT (Claude Agent)                              │    │
│  │  • Sector template selection                                         │    │
│  │  • Role configuration                                                │    │
│  │  • KPI selection                                                     │    │
│  │  • Scorecard instantiation                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Implementation Phases

| Phase | Duration | Focus | Deliverables |
|-------|----------|-------|--------------|
| **Phase 1: Foundation** | 2-3 weeks | Core ontology, database schema | Schema deployed, base templates |
| **Phase 2: Agent Integration** | 2 weeks | BSC Configuration Agent | Agent prompts, orchestration flow |
| **Phase 3: SOP Integration** | 3-4 weeks | SOP app connections, feeds | Live data feeds, event processing |
| **Phase 4: Mobile MVP** | 4-6 weeks | Mobile app development | iOS/Android apps, core features |
| **Phase 5: Role Rollout** | 2-4 weeks | Role-specific views | All role dashboards configured |
| **Phase 6: Optimization** | Ongoing | Performance, UX refinement | Continuous improvement |

### 9.3 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Mobile Adoption** | >80% daily active users | App analytics |
| **Data Freshness** | <5 min for real-time metrics | Monitoring |
| **Alert Response Time** | <15 min for critical alerts | Alert acknowledgment |
| **OKR Update Frequency** | Weekly updates from all roles | System tracking |
| **User Satisfaction** | NPS >50 for mobile experience | In-app survey |
| **Offline Reliability** | 99.5% successful sync | Error tracking |

---

## 10. Appendices

### 10.1 Related Documents

- PF_CORE_ROLE_BASED_SCORECARD_FRAMEWORK_v1.0.md
- MEAT_TRADE_SECTOR_ROLES_ONTOLOGY_VSOM_OKR_CASCADE_v1.0.md
- MEAT_TRADE_GM_ROLES_FRAMEWORK_v1.0.md
- PF_CORE_CSUITE_ROLES_MEAT_VERTICAL_v1.0.md

### 10.2 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-04 | Platform Foundation Core | Initial release |

---

**--- END OF DOCUMENT ---**
