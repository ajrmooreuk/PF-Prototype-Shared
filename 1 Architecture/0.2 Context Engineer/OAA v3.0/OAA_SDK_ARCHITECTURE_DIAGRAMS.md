# OAA SDK Architecture Diagrams

## 1. OAA SDK Agent Architecture

```mermaid
flowchart TB
    subgraph SDK["OAA SDK Agent Layer"]
        OM["Ontology Manager Agent<br/>- CRUD ops<br/>- Version mgmt<br/>- Dependencies"]
        VA["Validation Agent<br/>- Schema.org compliance<br/>- Relationship integrity<br/>- Type validation"]
        CB["Context Builder Agent<br/>- Context assembly<br/>- Agent provisioning<br/>- Enrichment"]
        SG["Schema Generator Agent<br/>- JSON-LD generation<br/>- Type support<br/>- Validation"]
        GA["Gap Analysis Agent<br/>- Gap detection<br/>- Opportunity scoring<br/>- Priority calc"]
        VE["Value Engineering Agent<br/>- VSOM alignment<br/>- ROI calculation<br/>- Health monitoring"]
    end

    subgraph Ontologies["Production Ontologies"]
        O1["01-AI-Visibility<br/>v1.1.0"]
        O2["02-Universal-Brand<br/>v1.1.0"]
        O3["03-Customer-Org<br/>v1.0.0"]
        O4["04-Gap-Analysis<br/>v1.1.0"]
        O5["05-CMO-OKR<br/>v3.0.0"]
    end

    subgraph VSOM["Value Engineering Layer"]
        V1["Vision & Mission"]
        V2["Strategic Objectives"]
        V3["Operational Strategies"]
        V4["Metrics & KPIs"]
    end

    subgraph Platform["Platform Agents"]
        PA1["Strategic Context Agent"]
        PA2["OKR Cascade Agent"]
        PA3["Health Monitor Agent"]
        PA4["Insight Generator Agent"]
    end

    OM --> Ontologies
    VA --> Ontologies
    CB --> Ontologies
    SG --> Ontologies
    GA --> O4
    VE --> VSOM

    CB --> Platform
    VE --> V2
    O5 --> V3
```

## 2. Ontology Data Flow

```mermaid
flowchart LR
    subgraph Context["Context Layer"]
        CO["Customer Org<br/>Ontology"]
    end

    subgraph Analysis["Analysis Layer"]
        AI["AI Visibility<br/>Ontology"]
        UB["Universal Brand<br/>Ontology"]
    end

    subgraph Diagnosis["Diagnosis Layer"]
        GA["Gap Analysis<br/>Ontology"]
    end

    subgraph Strategy["Strategy Layer"]
        OKR["CMO OKR<br/>Ontology"]
    end

    subgraph Execution["Execution Layer"]
        VSOM["VSOM Module"]
    end

    CO -->|"Industry, Maturity, Goals"| AI
    CO -->|"ICP Profile"| UB
    
    AI -->|"Citation Performance"| GA
    UB -->|"Discovery Pathways"| GA
    
    GA -->|"Prioritized Opportunities"| OKR
    
    OKR -->|"Strategic Objectives"| VSOM
    OKR -->|"Key Results"| VSOM
    OKR -->|"ROI Metrics"| VSOM
```

## 3. Context Engineering Flow

```mermaid
sequenceDiagram
    participant User
    participant Agent as Platform Agent
    participant CB as Context Builder
    participant OM as Ontology Manager
    participant DB as Supabase

    User->>Agent: Request (Query)
    Agent->>CB: Build Context
    CB->>OM: Load Relevant Ontologies
    OM->>DB: Fetch Customer Data
    DB-->>OM: Customer Org Profile
    OM-->>CB: Ontology Context
    CB->>CB: Assemble Agent Context
    CB-->>Agent: Enriched Context
    Agent->>Agent: Generate Response<br/>(Strategically Aligned)
    Agent-->>User: Contextual Response
```

## 4. Value Engineering Integration

```mermaid
flowchart TB
    subgraph VE["Value Engineering (VSOM)"]
        L1["Layer 1: Vision & Mission<br/>- Vision Statement<br/>- Mission Statement<br/>- Core Values<br/>- Aspirational Goals"]
        L2["Layer 2: Strategic Objectives<br/>- BSC Perspectives<br/>- Financial<br/>- Customer<br/>- Internal Process<br/>- Learning & Growth<br/>- Stakeholder"]
        L3["Layer 3: Operational Strategies<br/>- Strategy Hierarchy<br/>- Framework Selection<br/>- OKR Cascade"]
        L4["Layer 4: Metrics & KPIs<br/>- Leading Indicators<br/>- Lagging Indicators<br/>- Health Status"]
    end

    subgraph OAA["OAA Ontology Layer"]
        CMO["CMO OKR Ontology<br/>v3.0.0"]
        GAP["Gap Analysis<br/>v1.1.0"]
        CO["Customer Org<br/>v1.0.0"]
    end

    L1 -->|"Strategic Profile"| CO
    L2 -->|"Objectives Mapping"| CMO
    L3 -->|"OKR Integration"| CMO
    L3 -->|"Opportunity Alignment"| GAP
    L4 -->|"Key Results Attribution"| CMO
    L4 -->|"Health Metrics"| GAP
```

## 5. SDK Implementation Phases

```mermaid
gantt
    title OAA SDK Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    SDK Interface Design      :p1a, 2025-01-01, 1w
    Ontology Manager Agent    :p1b, after p1a, 2w
    Validation Agent          :p1c, after p1b, 1w
    
    section Phase 2: Context
    Context Builder Agent     :p2a, after p1c, 2w
    Context Assembly Patterns :p2b, after p2a, 1w
    Platform Agent Integration:p2c, after p2b, 1w
    
    section Phase 3: Value Eng
    VSOM Connection          :p3a, after p2c, 1w
    Value Engineering Agent  :p3b, after p3a, 2w
    ROI Services            :p3c, after p3b, 1w
    
    section Phase 4: Orchestration
    Agent Manager Integration :p4a, after p3c, 2w
    Human-in-Loop Checkpoints:p4b, after p4a, 1w
    Platform Deployment      :p4c, after p4b, 1w
```

## 6. Schema.org Compliance Validation

```mermaid
flowchart TB
    subgraph Input["Ontology Input"]
        OD["Ontology Definition<br/>JSON-LD"]
    end

    subgraph Validation["Validation Pipeline"]
        V1["Syntax Check<br/>JSON-LD Parser"]
        V2["Context Validation<br/>@vocab, @type, @id"]
        V3["Schema.org Mapping<br/>Property Alignment"]
        V4["Relationship Check<br/>Cardinality & Integrity"]
        V5["Completeness Audit<br/>Required Fields"]
    end

    subgraph Output["Validation Result"]
        PASS["✅ Compliant<br/>OAA Registry Certified"]
        FAIL["❌ Non-Compliant<br/>Issues List"]
    end

    OD --> V1
    V1 -->|"Valid"| V2
    V1 -->|"Invalid"| FAIL
    V2 -->|"Valid"| V3
    V2 -->|"Invalid"| FAIL
    V3 -->|"≥85%"| V4
    V3 -->|"<85%"| FAIL
    V4 -->|"Valid"| V5
    V4 -->|"Invalid"| FAIL
    V5 -->|"Complete"| PASS
    V5 -->|"Incomplete"| FAIL
```

## 7. Multi-Tenant Context Isolation

```mermaid
flowchart TB
    subgraph Tenants["Tenant Instances"]
        T1["Tenant A<br/>BAIV Client"]
        T2["Tenant B<br/>AIR Client"]
        T3["Tenant C<br/>W4M Client"]
    end

    subgraph RLS["Row Level Security"]
        RL1["tenant_id FK<br/>Enforced"]
    end

    subgraph Contexts["Isolated Contexts"]
        C1["Context A<br/>Strategic Profile A<br/>Ontology Data A"]
        C2["Context B<br/>Strategic Profile B<br/>Ontology Data B"]
        C3["Context C<br/>Strategic Profile C<br/>Ontology Data C"]
    end

    subgraph Core["Shared Core"]
        OAA["OAA Registry v3.0<br/>Schema.org Standards<br/>Validation Rules"]
    end

    T1 -->|"RLS Filter"| RL1
    T2 -->|"RLS Filter"| RL1
    T3 -->|"RLS Filter"| RL1
    
    RL1 --> C1
    RL1 --> C2
    RL1 --> C3
    
    C1 -->|"Uses"| Core
    C2 -->|"Uses"| Core
    C3 -->|"Uses"| Core
```

---

## Usage Notes

These diagrams are designed to be rendered using:
- **Mermaid Live Editor**: https://mermaid.live
- **GitHub Markdown**: Native rendering in `.md` files
- **Figma/Design Tools**: Export as SVG for inclusion

For artifact creation, use `.mermaid` extension for direct rendering in supported environments.
