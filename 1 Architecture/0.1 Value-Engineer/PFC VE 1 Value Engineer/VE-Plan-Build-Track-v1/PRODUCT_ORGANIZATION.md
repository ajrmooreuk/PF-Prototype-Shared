# Product Organization - Platform Instances

## Overview

Products are now organized under the appropriate platform instances based on their function and purpose. This document provides a clear reference for which products belong to which PF Instance.

---

## BAIV Platform
**Business AI Visibility Platform**

### Focus
AI-powered visibility and analytics solutions for different market segments

### Products

| Product | Category | Status | Description |
|---------|----------|--------|-------------|
| **AI Visibility** | AI | Active | AI-powered visibility and analytics for business intelligence |
| **AIV Agency** | Agency | Active | Agency-focused AI visibility solutions and tools |
| **AIV Enterprise** | Enterprise | Active | Enterprise-grade AI visibility platform with advanced features |

### Use Cases
- Business intelligence and analytics
- Agency client visibility management
- Enterprise-scale AI visibility deployment

---

## PF Core
**Platform Foundation & Core Services**

### Focus
Core platform capabilities, infrastructure, and foundational services that power all instances

### Products

#### Core Applications
| Product | Category | Status | Description |
|---------|----------|--------|-------------|
| **Value Engineering Suite** | Core | Active | Complete value engineering workflow and methodology |
| **Solution Architect Module** | Core | Active | Architecture design and implementation toolkit |
| **AI Assistant** | AI | Beta | Intelligent guidance and recommendations |
| **Analytics Dashboard** | Analytics | Active | Real-time metrics and performance tracking |

#### Infrastructure & Operations
| Product | Category | Status | Description |
|---------|----------|--------|-------------|
| **Authentication & Authorization** | Security | Active | Secure identity and access management |
| **API Gateway** | Infrastructure | Active | Unified API management and routing |
| **Data Storage** | Infrastructure | Active | Scalable storage solutions |
| **Platform Monitoring** | Operations | Active | Real-time system health and performance monitoring |

### Use Cases
- Value engineering and solution architecture workflows
- Platform infrastructure and security
- System monitoring and operations
- Data management and analytics

---

## W4M Platform
**Workflow Management System**

### Focus
Process automation, workflow orchestration, and task management

### Products

| Product | Category | Status | Description |
|---------|----------|--------|-------------|
| **Workflow Engine** | Core | Active | Process automation and orchestration |
| **Task Management** | Productivity | Active | Task tracking and assignment |

### Use Cases
- Business process automation
- Task and project management
- Workflow orchestration

---

## Product Categories

### By Category

#### AI (3 products)
- AI Visibility (BAIV)
- AIV Agency (BAIV) - *though named Agency, it's an AI category product*
- AI Assistant (PF Core)

#### Agency (1 product)
- AIV Agency (BAIV) - *Agency-focused solution*

#### Enterprise (1 product)
- AIV Enterprise (BAIV)

#### Core (3 products)
- Value Engineering Suite (PF Core)
- Solution Architect Module (PF Core)
- Workflow Engine (W4M)

#### Analytics (1 product)
- Analytics Dashboard (PF Core)

#### Security (1 product)
- Authentication & Authorization (PF Core)

#### Infrastructure (2 products)
- API Gateway (PF Core)
- Data Storage (PF Core)

#### Operations (1 product)
- Platform Monitoring (PF Core)

#### Productivity (1 product)
- Task Management (W4M)

---

## Migration Notes

### Products Moved to PF Core
The following products were originally under BAIV but have been moved to PF Core as they represent foundational platform capabilities:

1. **Value Engineering Suite** (baiv-ve → pf-ve)
   - Reason: Core platform capability used across instances

2. **Solution Architect Module** (baiv-sa → pf-sa)
   - Reason: Foundational architecture toolkit for platform

3. **AI Assistant** (baiv-ai → pf-ai)
   - Reason: Platform-wide intelligent assistance

4. **Analytics Dashboard** (baiv-analytics → pf-analytics)
   - Reason: Core analytics capability for all instances

### New BAIV Products
The following products are now the focus of BAIV as AI visibility solutions:

1. **AI Visibility**
   - New general AI visibility product

2. **AIV Agency**
   - New agency-focused solution

3. **AIV Enterprise**
   - New enterprise-grade solution

---

## Product Hierarchy Diagram

```
Platform Instances
│
├── BAIV (AI Visibility Focus)
│   ├── AI Visibility
│   ├── AIV Agency
│   └── AIV Enterprise
│
├── PF Core (Foundation & Core Services)
│   ├── Core Applications
│   │   ├── Value Engineering Suite
│   │   ├── Solution Architect Module
│   │   ├── AI Assistant
│   │   └── Analytics Dashboard
│   │
│   └── Infrastructure & Operations
│       ├── Authentication & Authorization
│       ├── API Gateway
│       ├── Data Storage
│       └── Platform Monitoring
│
└── W4M (Workflow Management)
    ├── Workflow Engine
    └── Task Management
```

---

## Integration Map

### How Products Work Together

```mermaid
graph TB
    subgraph BAIV
        AIV[AI Visibility]
        Agency[AIV Agency]
        Enterprise[AIV Enterprise]
    end
    
    subgraph "PF Core"
        VE[Value Engineering Suite]
        SA[Solution Architect]
        AI[AI Assistant]
        Analytics[Analytics Dashboard]
        Auth[Authentication]
        API[API Gateway]
        Storage[Data Storage]
        Monitor[Platform Monitoring]
    end
    
    subgraph W4M
        Workflow[Workflow Engine]
        Tasks[Task Management]
    end
    
    AIV --> Analytics
    Agency --> Analytics
    Enterprise --> Analytics
    
    VE --> AI
    SA --> AI
    
    AIV --> Auth
    Agency --> Auth
    Enterprise --> Auth
    
    VE --> API
    SA --> API
    AIV --> API
    
    Analytics --> Storage
    Monitor --> Storage
    
    Workflow --> API
    Tasks --> API
    
    style BAIV fill:#00a4bf,stroke:#008ca0,color:#fff
    style "PF Core" fill:#2196f3,stroke:#1976d2,color:#fff
    style W4M fill:#4caf50,stroke:#388e3c,color:#fff
```

---

## Usage in Dashboard

### Filtering by Instance

**Select BAIV:**
- Shows: AI Visibility, AIV Agency, AIV Enterprise

**Select PF Core:**
- Shows: All 8 PF Core products (VE Suite, SA Module, AI Assistant, Analytics, Auth, API Gateway, Storage, Monitoring)

**Select W4M:**
- Shows: Workflow Engine, Task Management

### Filtering by Product

**Select "Value Engineering Suite":**
- Shows only PF Core instance with VE Suite

**Select "AI Visibility":**
- Shows only BAIV instance with AI Visibility

**Combined Filters:**
- Instance: PF Core + Product: AI Assistant
- Result: PF Core instance showing only AI Assistant

---

## For Developers

### Product ID Convention

```typescript
// BAIV Products
"baiv-visibility"  // AI Visibility
"baiv-agency"      // AIV Agency
"baiv-enterprise"  // AIV Enterprise

// PF Core Products
"pf-ve"           // Value Engineering Suite
"pf-sa"           // Solution Architect Module
"pf-ai"           // AI Assistant
"pf-analytics"    // Analytics Dashboard
"pf-auth"         // Authentication & Authorization
"pf-api"          // API Gateway
"pf-storage"      // Data Storage
"pf-monitoring"   // Platform Monitoring

// W4M Products
"w4m-workflow"    // Workflow Engine
"w4m-tasks"       // Task Management
```

### Adding New Products

To add a new product to an instance:

```typescript
// In Baiv2App.tsx mockPlatforms array
{
  id: "instance-id",
  name: "Instance Name",
  products: [
    // ... existing products
    {
      id: "instance-newproduct",
      name: "New Product Name",
      description: "Product description",
      status: "active",
      category: "Category",
    },
  ],
}
```

---

## Future Enhancements

### Planned Product Additions

#### BAIV
- [ ] AIV Professional (mid-market segment)
- [ ] AIV Startup (small business segment)
- [ ] AIV Analytics (standalone analytics)

#### PF Core
- [ ] Reporting Engine
- [ ] Integration Hub
- [ ] Developer Portal
- [ ] Admin Console

#### W4M
- [ ] Process Designer
- [ ] Automation Studio
- [ ] Integration Connectors

---

## Support & Documentation

For questions about product organization:
- See `/docs/PF_DASHBOARD_FILTERS.md` for filtering
- See `/docs/PLATFORM_DASHBOARD_SUMMARY.md` for dashboard overview
- Contact platform administrators for product access

---

**Last Updated:** December 12, 2025
**Version:** 2.0
**Status:** Current Product Organization ✅
