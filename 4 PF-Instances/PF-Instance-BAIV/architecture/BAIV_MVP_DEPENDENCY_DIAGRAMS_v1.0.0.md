# BAIV MVP Dependency Diagrams
**Version:** 1.0.0  
**Document Type:** Architecture Visualization  
**Status:** Draft  
**Created:** 2025-01-01  
**Last Updated:** 2025-01-01

## Document Purpose
This document provides comprehensive Mermaid diagrams illustrating the dependencies and relationships across:
- PBS (Product Breakdown Structure) components
- Epics
- Features and Functions
- User Stories
- Data flows and orchestration dependencies

---

## Table of Contents
1. [PBS L1-L2 Component Dependencies](#1-pbs-l1-l2-component-dependencies)
2. [Unified Registry Dependencies](#2-unified-registry-dependencies)
3. [Epic-to-Feature Breakdown](#3-epic-to-feature-breakdown)
4. [Feature-to-User Story Mapping](#4-feature-to-user-story-mapping)
5. [Data Flow Dependencies](#5-data-flow-dependencies)
6. [Critical Path Analysis](#6-critical-path-analysis)
7. [Agent Orchestration Dependencies](#7-agent-orchestration-dependencies)

---

## 1. PBS L1-L2 Component Dependencies

### 1.1 Full System Architecture with Dependencies

```mermaid
graph TB
    subgraph PBS1["PBS 1.0: PF-Core Integration Layer"]
        PBS11[PBS 1.1: Platform Adapter]
        PBS12[PBS 1.2: Context Injector]
        PBS13[PBS 1.3: Auth Bridge]
        PBS14[PBS 1.4: Unified Registry & Orchestration Bridge]
        
        PBS141[PBS 1.4.1: Unified Metadata Registry]
        PBS142[PBS 1.4.2: Data Contract Registry]
        PBS143[PBS 1.4.3: Orchestration Control Plane]
        PBS144[PBS 1.4.4: Version Control Integration]
    end
    
    subgraph PBS2["PBS 2.0: Foundation Services"]
        PBS21[PBS 2.1: Database Layer - Supabase]
        PBS22[PBS 2.2: API Layer - Supabase Client SDK]
        PBS23[PBS 2.3: Auth Service - Supabase Auth]
        PBS24[PBS 2.4: Integrated Data Service]
        
        PBS241[PBS 2.4.1: Unified Data Access Layer]
        PBS242[PBS 2.4.2: Schema Validation Engine]
        PBS243[PBS 2.4.3: Data Transformation Pipeline]
        PBS244[PBS 2.4.4: Real-time Synchronization]
    end
    
    subgraph PBS3["PBS 3.0: Orchestrated Agent Services"]
        PBS31[PBS 3.1: Registry-Driven Agent Infrastructure]
        PBS32[PBS 3.2: Discovery Agent]
        PBS33[PBS 3.3: Citation Tester Agent]
        PBS34[PBS 3.4: Gap Analyzer Agent]
        
        PBS311[PBS 3.1.1: Registry-Aware Agent Loader]
        PBS312[PBS 3.1.2: Unified Execution Tracking]
        PBS313[PBS 3.1.3: Dependency-Based Resource Allocation]
        PBS314[PBS 3.1.4: Orchestrated Error Handling]
    end
    
    subgraph PBS4["PBS 4.0: Dashboard Services"]
        PBS41[PBS 4.1: Dashboard UI]
        PBS42[PBS 4.2: Visualization Components]
        PBS43[PBS 4.3: Registry Management UI]
    end
    
    subgraph PBS5["PBS 5.0: Deployment & Operations"]
        PBS51[PBS 5.1: Deployment Pipeline]
        PBS52[PBS 5.2: Monitoring & Logging]
        PBS53[PBS 5.3: Registry Deployment]
    end
    
    %% Critical Dependencies
    PBS14 --> PBS21
    PBS14 --> PBS24
    PBS14 --> PBS31
    
    PBS141 --> PBS142
    PBS142 --> PBS143
    PBS143 --> PBS144
    
    PBS11 --> PBS12
    PBS12 --> PBS13
    PBS13 --> PBS14
    
    PBS21 --> PBS22
    PBS22 --> PBS23
    PBS23 --> PBS24
    
    PBS241 --> PBS242
    PBS242 --> PBS243
    PBS243 --> PBS244
    
    PBS24 --> PBS31
    PBS31 --> PBS32
    PBS31 --> PBS33
    PBS31 --> PBS34
    
    PBS311 --> PBS312
    PBS312 --> PBS313
    PBS313 --> PBS314
    
    PBS32 --> PBS41
    PBS33 --> PBS41
    PBS34 --> PBS41
    
    PBS41 --> PBS42
    PBS42 --> PBS43
    
    PBS21 --> PBS51
    PBS31 --> PBS51
    PBS51 --> PBS52
    PBS52 --> PBS53
    
    %% Styling
    classDef registry fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    classDef foundation fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    classDef agent fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    classDef dashboard fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef deployment fill:#e599f7,stroke:#9c36b5,stroke-width:2px,color:#fff
    
    class PBS14,PBS141,PBS142,PBS143,PBS144 registry
    class PBS21,PBS22,PBS23,PBS24,PBS241,PBS242,PBS243,PBS244 foundation
    class PBS31,PBS32,PBS33,PBS34,PBS311,PBS312,PBS313,PBS314 agent
    class PBS41,PBS42,PBS43 dashboard
    class PBS51,PBS52,PBS53 deployment
```

### 1.2 Dependency Type Classification

```mermaid
graph LR
    subgraph Legend["Dependency Types"]
        HARD[Hard Dependency - Blocking]
        SOFT[Soft Dependency - Integration Point]
        DATA[Data Dependency - Schema/Contract]
        ORCH[Orchestration Dependency - Control Flow]
    end
    
    subgraph Example["Example: Agent Infrastructure Dependencies"]
        REG[Unified Registry]
        DB[Database Layer]
        AGENT[Agent Infrastructure]
        EXEC[Agent Execution]
        
        REG -->|HARD: Must exist first| DB
        DB -->|HARD: Schema required| AGENT
        REG -->|ORCH: Coordinates| AGENT
        AGENT -->|DATA: Contracts defined| EXEC
    end
    
    style HARD fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style SOFT fill:#4dabf7,stroke:#1971c2,stroke-width:2px
    style DATA fill:#51cf66,stroke:#2f9e44,stroke-width:2px
    style ORCH fill:#ffd43b,stroke:#f08c00,stroke-width:2px
```

---

## 2. Unified Registry Dependencies

### 2.1 Registry Internal Dependencies

```mermaid
graph TB
    subgraph RegistryCore["Unified Registry Core"]
        META[Unified Metadata Registry]
        VERSION[Versioning System]
        DEPEND[Dependency Graph Engine]
    end
    
    subgraph DataContracts["Data Contract Registry"]
        INPUT[Input Schema Registry]
        OUTPUT[Output Schema Registry]
        TRANSFORM[Transformation Mapping]
        VALIDATE[Validation Rule Engine]
    end
    
    subgraph Orchestration["Orchestration Control Plane"]
        COORD[Agent Execution Coordinator]
        FLOW[Data Flow Orchestrator]
        ERROR[Error Recovery Manager]
        PERF[Performance Monitor]
    end
    
    subgraph VersionControl["Version Control Integration"]
        GIT[Git Repository Manager]
        DEPLOY[Atomic Deployment Engine]
        ROLLBACK[Rollback Manager]
        AUDIT[Audit Trail Logger]
    end
    
    subgraph Consumers["Registry Consumers"]
        AGENTS[Agent Infrastructure]
        ONTOLOGY[Ontology Service]
        DASHBOARD[Dashboard UI]
        API[API Layer]
    end
    
    %% Internal Registry Dependencies
    META --> VERSION
    VERSION --> DEPEND
    
    META --> INPUT
    META --> OUTPUT
    INPUT --> TRANSFORM
    OUTPUT --> TRANSFORM
    TRANSFORM --> VALIDATE
    
    DEPEND --> COORD
    VALIDATE --> COORD
    COORD --> FLOW
    FLOW --> ERROR
    ERROR --> PERF
    
    META --> GIT
    VERSION --> GIT
    GIT --> DEPLOY
    DEPLOY --> ROLLBACK
    ROLLBACK --> AUDIT
    
    %% Registry to Consumer Dependencies
    META --> AGENTS
    META --> ONTOLOGY
    INPUT --> AGENTS
    OUTPUT --> AGENTS
    VALIDATE --> AGENTS
    
    META --> DASHBOARD
    DEPEND --> DASHBOARD
    AUDIT --> DASHBOARD
    
    COORD --> AGENTS
    FLOW --> API
    
    %% Styling
    classDef core fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    classDef contract fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    classDef orch fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    classDef vc fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef consumer fill:#e599f7,stroke:#9c36b5,stroke-width:2px,color:#fff
    
    class META,VERSION,DEPEND core
    class INPUT,OUTPUT,TRANSFORM,VALIDATE contract
    class COORD,FLOW,ERROR,PERF orch
    class GIT,DEPLOY,ROLLBACK,AUDIT vc
    class AGENTS,ONTOLOGY,DASHBOARD,API consumer
```

### 2.2 Registry Integration Flow

```mermaid
sequenceDiagram
    participant DEV as Developer
    participant GIT as Git Repository
    participant REG as Unified Registry
    participant VAL as Validation Engine
    participant DEP as Dependency Engine
    participant ORCH as Orchestrator
    participant AGENT as Agent Runtime
    
    DEV->>GIT: Commit agent v2.0.0
    GIT->>REG: Trigger registry update
    REG->>VAL: Validate agent metadata
    VAL->>VAL: Check input/output schemas
    VAL->>DEP: Resolve dependencies
    DEP->>DEP: Check ontology v1.5.0 compatibility
    
    alt Dependencies satisfied
        DEP->>REG: Mark agent as ready
        REG->>ORCH: Register for orchestration
        ORCH->>AGENT: Deploy agent v2.0.0
        AGENT-->>REG: Execution success
        REG-->>DEV: Deployment complete
    else Dependency conflict
        DEP->>REG: Mark agent as blocked
        REG-->>DEV: Error: Ontology v1.5.0 not found
        DEV->>GIT: Update ontology dependency
    end
```

---

## 3. Epic-to-Feature Breakdown

### 3.1 Complete Epic-Feature-Function Hierarchy

```mermaid
graph TB
    subgraph EPIC1["EPIC 1: Unified Registry Foundation"]
        E1F1[Feature 1.1: Metadata Management]
        E1F2[Feature 1.2: Semantic Versioning]
        E1F3[Feature 1.3: Dependency Resolution]
        E1F4[Feature 1.4: Version Control Integration]
        
        E1F1F1[Function: Agent Registration]
        E1F1F2[Function: Ontology Registration]
        E1F1F3[Function: Contract Registration]
        
        E1F2F1[Function: Version Increment]
        E1F2F2[Function: Compatibility Check]
        
        E1F3F1[Function: Dependency Graph Build]
        E1F3F2[Function: Impact Analysis]
        
        E1F4F1[Function: Git Sync]
        E1F4F2[Function: Atomic Deployment]
    end
    
    subgraph EPIC2["EPIC 2: Data Contract Management"]
        E2F1[Feature 2.1: Schema Registry]
        E2F2[Feature 2.2: Data Validation]
        E2F3[Feature 2.3: Transformation Pipeline]
        
        E2F1F1[Function: Input Schema Definition]
        E2F1F2[Function: Output Schema Definition]
        
        E2F2F1[Function: Runtime Validation]
        E2F2F2[Function: Schema Evolution]
        
        E2F3F1[Function: Data Mapping]
        E2F3F2[Function: Format Conversion]
    end
    
    subgraph EPIC3["EPIC 3: Orchestrated Agent Services"]
        E3F1[Feature 3.1: Registry-Aware Loading]
        E3F2[Feature 3.2: Dependency-Based Execution]
        E3F3[Feature 3.3: Error Recovery]
        
        E3F1F1[Function: Agent Discovery]
        E3F1F2[Function: Dynamic Loading]
        
        E3F2F1[Function: Execution Coordination]
        E3F2F2[Function: Resource Allocation]
        
        E3F3F1[Function: Automatic Retry]
        E3F3F2[Function: Rollback]
    end
    
    subgraph EPIC4["EPIC 4: Dashboard & Visualization"]
        E4F1[Feature 4.1: Registry Explorer]
        E4F2[Feature 4.2: Dependency Visualizer]
        E4F3[Feature 4.3: Execution Monitor]
        
        E4F1F1[Function: Browse Registry]
        E4F1F2[Function: Search & Filter]
        
        E4F2F1[Function: Dependency Graph View]
        E4F2F2[Function: Impact Preview]
        
        E4F3F1[Function: Real-time Status]
        E4F3F2[Function: Performance Metrics]
    end
    
    %% Epic 1 Dependencies
    E1F1 --> E1F1F1
    E1F1 --> E1F1F2
    E1F1 --> E1F1F3
    
    E1F2 --> E1F2F1
    E1F2 --> E1F2F2
    
    E1F3 --> E1F3F1
    E1F3 --> E1F3F2
    
    E1F4 --> E1F4F1
    E1F4 --> E1F4F2
    
    E1F1 --> E1F2
    E1F2 --> E1F3
    E1F3 --> E1F4
    
    %% Epic 2 Dependencies
    E2F1 --> E2F1F1
    E2F1 --> E2F1F2
    
    E2F2 --> E2F2F1
    E2F2 --> E2F2F2
    
    E2F3 --> E2F3F1
    E2F3 --> E2F3F2
    
    E2F1 --> E2F2
    E2F2 --> E2F3
    
    %% Epic 3 Dependencies
    E3F1 --> E3F1F1
    E3F1 --> E3F1F2
    
    E3F2 --> E3F2F1
    E3F2 --> E3F2F2
    
    E3F3 --> E3F3F1
    E3F3 --> E3F3F2
    
    E3F1 --> E3F2
    E3F2 --> E3F3
    
    %% Epic 4 Dependencies
    E4F1 --> E4F1F1
    E4F1 --> E4F1F2
    
    E4F2 --> E4F2F1
    E4F2 --> E4F2F2
    
    E4F3 --> E4F3F1
    E4F3 --> E4F3F2
    
    E4F1 --> E4F2
    E4F2 --> E4F3
    
    %% Cross-Epic Dependencies
    E1F1 --> E2F1
    E1F3 --> E2F2
    E2F3 --> E3F1
    E1F1 --> E3F1
    E3F2 --> E4F3
    E1F3 --> E4F2
    
    %% Styling
    classDef epic fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    classDef feature fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    classDef function fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    
    class E1F1,E1F2,E1F3,E1F4,E2F1,E2F2,E2F3,E3F1,E3F2,E3F3,E4F1,E4F2,E4F3 feature
    class E1F1F1,E1F1F2,E1F1F3,E1F2F1,E1F2F2,E1F3F1,E1F3F2,E1F4F1,E1F4F2 function
    class E2F1F1,E2F1F2,E2F2F1,E2F2F2,E2F3F1,E2F3F2 function
    class E3F1F1,E3F1F2,E3F2F1,E3F2F2,E3F3F1,E3F3F2 function
    class E4F1F1,E4F1F2,E4F2F1,E4F2F2,E4F3F1,E4F3F2 function
```

---

## 4. Feature-to-User Story Mapping

### 4.1 User Stories by Epic

```mermaid
graph TB
    subgraph US_EPIC1["User Stories - EPIC 1: Registry Foundation"]
        US1_1["US1.1: As a developer, I want to register a new agent with the unified registry so that it can be discovered and orchestrated"]
        US1_2["US1.2: As a system admin, I want to see dependency conflicts before deployment so that I can resolve them proactively"]
        US1_3["US1.3: As a developer, I want automatic version incrementing so that I don't have to manually manage versions"]
        US1_4["US1.4: As a DevOps engineer, I want atomic deployments so that partial updates never break the system"]
    end
    
    subgraph US_EPIC2["User Stories - EPIC 2: Data Contracts"]
        US2_1["US2.1: As a data engineer, I want to define input/output schemas so that data validation is automatic"]
        US2_2["US2.2: As a developer, I want schema evolution support so that I can safely update data contracts"]
        US2_3["US2.3: As an agent, I want automatic data transformation so that I don't need custom conversion code"]
        US2_4["US2.4: As a system, I want runtime validation so that invalid data never enters the pipeline"]
    end
    
    subgraph US_EPIC3["User Stories - EPIC 3: Agent Orchestration"]
        US3_1["US3.1: As an orchestrator, I want to dynamically load agents based on registry metadata so that deployment is seamless"]
        US3_2["US3.2: As a system, I want dependency-based execution so that agents run in the correct order"]
        US3_3["US3.3: As a developer, I want automatic retry on failure so that transient errors don't require manual intervention"]
        US3_4["US3.4: As a system admin, I want execution tracking so that I can monitor agent performance"]
    end
    
    subgraph US_EPIC4["User Stories - EPIC 4: Dashboard"]
        US4_1["US4.1: As a product owner, I want to browse the registry so that I can see all agents and ontologies"]
        US4_2["US4.2: As a developer, I want to visualize dependencies so that I understand impact before making changes"]
        US4_3["US4.3: As a system admin, I want real-time execution monitoring so that I can detect issues immediately"]
        US4_4["US4.4: As a stakeholder, I want performance metrics so that I can track system health"]
    end
    
    %% Map to Features
    US1_1 --> E1F1[Feature 1.1: Metadata Management]
    US1_2 --> E1F3[Feature 1.3: Dependency Resolution]
    US1_3 --> E1F2[Feature 1.2: Semantic Versioning]
    US1_4 --> E1F4[Feature 1.4: Version Control Integration]
    
    US2_1 --> E2F1[Feature 2.1: Schema Registry]
    US2_2 --> E2F2[Feature 2.2: Data Validation]
    US2_3 --> E2F3[Feature 2.3: Transformation Pipeline]
    US2_4 --> E2F2
    
    US3_1 --> E3F1[Feature 3.1: Registry-Aware Loading]
    US3_2 --> E3F2[Feature 3.2: Dependency-Based Execution]
    US3_3 --> E3F3[Feature 3.3: Error Recovery]
    US3_4 --> E3F2
    
    US4_1 --> E4F1[Feature 4.1: Registry Explorer]
    US4_2 --> E4F2[Feature 4.2: Dependency Visualizer]
    US4_3 --> E4F3[Feature 4.3: Execution Monitor]
    US4_4 --> E4F3
    
    %% Styling
    classDef story fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef feature fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    
    class US1_1,US1_2,US1_3,US1_4,US2_1,US2_2,US2_3,US2_4,US3_1,US3_2,US3_3,US3_4,US4_1,US4_2,US4_3,US4_4 story
    class E1F1,E1F2,E1F3,E1F4,E2F1,E2F2,E2F3,E3F1,E3F2,E3F3,E4F1,E4F2,E4F3 feature
```

### 4.2 Acceptance Criteria Mapping

```mermaid
graph LR
    subgraph US["US1.1: Register New Agent"]
        AC1[AC1: Form accepts agent metadata]
        AC2[AC2: Validation checks pass]
        AC3[AC3: Agent appears in registry]
        AC4[AC4: Dependencies auto-detected]
    end
    
    subgraph Implementation["Implementation Components"]
        UI[Registry UI Form]
        API[Registration API]
        VAL[Validation Engine]
        DB[Registry Database]
        DEP[Dependency Engine]
    end
    
    AC1 --> UI
    AC2 --> VAL
    AC3 --> DB
    AC4 --> DEP
    
    UI --> API
    API --> VAL
    VAL --> DB
    DB --> DEP
    
    style US fill:#ffd43b,stroke:#f08c00,stroke-width:3px,color:#000
```

---

## 5. Data Flow Dependencies

### 5.1 Agent Execution Data Flow

```mermaid
graph TB
    subgraph Input["Data Input Sources"]
        USER[User Dashboard Input]
        API_IN[External API]
        DB_IN[Database Query]
    end
    
    subgraph Registry["Unified Registry"]
        REG_META[Metadata Registry]
        REG_SCHEMA[Schema Registry]
        REG_VALIDATE[Validation Engine]
    end
    
    subgraph Orchestration["Orchestration Layer"]
        COORD[Execution Coordinator]
        SCHEDULE[Task Scheduler]
        QUEUE[Execution Queue]
    end
    
    subgraph AgentRuntime["Agent Runtime"]
        LOADER[Agent Loader]
        DISC[Discovery Agent]
        CITE[Citation Tester]
        GAP[Gap Analyzer]
    end
    
    subgraph Output["Data Output Destinations"]
        DB_OUT[Database Write]
        CACHE[Result Cache]
        NOTIFY[Notification Service]
        DASHBOARD[Dashboard Update]
    end
    
    %% Input Flow
    USER --> REG_VALIDATE
    API_IN --> REG_VALIDATE
    DB_IN --> REG_VALIDATE
    
    %% Validation Flow
    REG_VALIDATE --> REG_SCHEMA
    REG_SCHEMA --> REG_META
    
    %% Orchestration Flow
    REG_META --> COORD
    COORD --> SCHEDULE
    SCHEDULE --> QUEUE
    
    %% Execution Flow
    QUEUE --> LOADER
    LOADER --> REG_META
    LOADER --> DISC
    LOADER --> CITE
    LOADER --> GAP
    
    %% Output Flow
    DISC --> DB_OUT
    CITE --> DB_OUT
    GAP --> DB_OUT
    
    DB_OUT --> CACHE
    CACHE --> NOTIFY
    NOTIFY --> DASHBOARD
    
    %% Styling
    classDef input fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    classDef registry fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px,color:#fff
    classDef orch fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    classDef agent fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef output fill:#e599f7,stroke:#9c36b5,stroke-width:2px,color:#fff
    
    class USER,API_IN,DB_IN input
    class REG_META,REG_SCHEMA,REG_VALIDATE registry
    class COORD,SCHEDULE,QUEUE orch
    class LOADER,DISC,CITE,GAP agent
    class DB_OUT,CACHE,NOTIFY,DASHBOARD output
```

### 5.2 Ontology Data Flow

```mermaid
graph LR
    subgraph Sources["Ontology Sources"]
        GIT[Git Repository]
        MANUAL[Manual Entry]
        IMPORT[CSV/JSON Import]
    end
    
    subgraph Registry["Unified Registry"]
        PARSE[Ontology Parser]
        VALIDATE[Schema Validator]
        VERSION[Version Manager]
        STORE[Registry Store]
    end
    
    subgraph Consumers["Consumers"]
        AGENT[Agents]
        QUERY[Query Service]
        EXPORT[Export Service]
        DASH[Dashboard]
    end
    
    GIT --> PARSE
    MANUAL --> PARSE
    IMPORT --> PARSE
    
    PARSE --> VALIDATE
    VALIDATE --> VERSION
    VERSION --> STORE
    
    STORE --> AGENT
    STORE --> QUERY
    STORE --> EXPORT
    STORE --> DASH
    
    AGENT --> STORE
    
    classDef source fill:#4dabf7,stroke:#1971c2,stroke-width:2px
    classDef registry fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    classDef consumer fill:#51cf66,stroke:#2f9e44,stroke-width:2px
    
    class GIT,MANUAL,IMPORT source
    class PARSE,VALIDATE,VERSION,STORE registry
    class AGENT,QUERY,EXPORT,DASH consumer
```

---

## 6. Critical Path Analysis

### 6.1 Week-by-Week Critical Path

```mermaid
gantt
    title BAIV MVP Critical Path (6 Weeks)
    dateFormat  YYYY-MM-DD
    
    section Week 1 - Registry Foundation
    Unified Registry Design           :crit, w1t1, 2025-01-06, 2d
    Database Schema with Registry     :crit, w1t2, after w1t1, 2d
    Authentication Service            :w1t3, after w1t2, 1d
    
    section Week 2 - Data Integration
    Integrated Data Service           :crit, w2t1, after w1t3, 2d
    Registry-Driven Agent Infra       :crit, w2t2, after w2t1, 3d
    
    section Week 3 - Agent Services
    Discovery Agent (Registry)        :crit, w3t1, after w2t2, 2d
    Citation Tester (Registry)        :w3t2, after w3t1, 2d
    Gap Analyzer (Registry)           :w3t3, after w3t2, 1d
    
    section Week 4 - Dashboard
    Registry Management UI            :crit, w4t1, after w3t3, 2d
    Dependency Visualizer             :w4t2, after w4t1, 2d
    Execution Monitor                 :w4t3, after w4t2, 1d
    
    section Week 5 - Integration
    End-to-End Testing                :crit, w5t1, after w4t3, 3d
    Performance Optimization          :w5t2, after w5t1, 2d
    
    section Week 6 - Deployment
    Production Deployment             :crit, w6t1, after w5t2, 2d
    Documentation & Training          :w6t2, after w6t1, 3d
```

### 6.2 Critical Dependency Chain

```mermaid
graph LR
    START[Project Start] --> REG[Unified Registry]
    REG --> DB[Database Layer]
    DB --> AUTH[Authentication]
    AUTH --> DATA[Data Service]
    DATA --> AGENT_INFRA[Agent Infrastructure]
    AGENT_INFRA --> AGENTS[Agent Implementation]
    AGENTS --> DASHBOARD[Dashboard UI]
    DASHBOARD --> TEST[Integration Testing]
    TEST --> DEPLOY[Deployment]
    DEPLOY --> END[Project Complete]
    
    style START fill:#4dabf7,stroke:#1971c2,stroke-width:3px
    style REG fill:#ff6b6b,stroke:#c92a2a,stroke-width:4px,color:#fff
    style DB fill:#ff6b6b,stroke:#c92a2a,stroke-width:4px,color:#fff
    style DATA fill:#ff6b6b,stroke:#c92a2a,stroke-width:4px,color:#fff
    style AGENT_INFRA fill:#ff6b6b,stroke:#c92a2a,stroke-width:4px,color:#fff
    style AGENTS fill:#51cf66,stroke:#2f9e44,stroke-width:3px
    style DASHBOARD fill:#51cf66,stroke:#2f9e44,stroke-width:3px
    style TEST fill:#ffd43b,stroke:#f08c00,stroke-width:3px
    style DEPLOY fill:#e599f7,stroke:#9c36b5,stroke-width:3px
    style END fill:#4dabf7,stroke:#1971c2,stroke-width:3px
```

---

## 7. Agent Orchestration Dependencies

### 7.1 Three-Agent MVP Orchestration

```mermaid
graph TB
    subgraph UserTrigger["User Interaction"]
        USER[User submits query]
        DASH[Dashboard Interface]
    end
    
    subgraph Registry["Unified Registry"]
        REG_CHECK[Check agent availability]
        REG_DEP[Resolve dependencies]
        REG_SCHEMA[Validate schemas]
    end
    
    subgraph Orchestrator["Orchestration Control"]
        COORD[Execution Coordinator]
        SCHEDULE[Task Scheduler]
        MONITOR[Performance Monitor]
    end
    
    subgraph DiscoveryAgent["Discovery Agent"]
        DISC_LOAD[Load from registry]
        DISC_VAL[Validate input]
        DISC_EXEC[Execute discovery]
        DISC_OUT[Write results]
    end
    
    subgraph CitationTester["Citation Tester Agent"]
        CITE_LOAD[Load from registry]
        CITE_DEPS[Check Discovery results]
        CITE_EXEC[Test citations]
        CITE_OUT[Write results]
    end
    
    subgraph GapAnalyzer["Gap Analyzer Agent"]
        GAP_LOAD[Load from registry]
        GAP_DEPS[Check Citation results]
        GAP_EXEC[Analyze gaps]
        GAP_OUT[Generate report]
    end
    
    subgraph Results["Result Aggregation"]
        AGG[Aggregate results]
        CACHE[Cache outcomes]
        NOTIFY[Notify user]
    end
    
    %% User Flow
    USER --> DASH
    DASH --> REG_CHECK
    
    %% Registry Flow
    REG_CHECK --> REG_DEP
    REG_DEP --> REG_SCHEMA
    REG_SCHEMA --> COORD
    
    %% Orchestration Flow
    COORD --> SCHEDULE
    SCHEDULE --> MONITOR
    
    %% Agent 1: Discovery
    MONITOR --> DISC_LOAD
    DISC_LOAD --> DISC_VAL
    DISC_VAL --> DISC_EXEC
    DISC_EXEC --> DISC_OUT
    
    %% Agent 2: Citation Tester (depends on Discovery)
    DISC_OUT --> CITE_LOAD
    CITE_LOAD --> CITE_DEPS
    CITE_DEPS --> CITE_EXEC
    CITE_EXEC --> CITE_OUT
    
    %% Agent 3: Gap Analyzer (depends on Citation)
    CITE_OUT --> GAP_LOAD
    GAP_LOAD --> GAP_DEPS
    GAP_DEPS --> GAP_EXEC
    GAP_EXEC --> GAP_OUT
    
    %% Results Flow
    GAP_OUT --> AGG
    AGG --> CACHE
    CACHE --> NOTIFY
    NOTIFY --> DASH
    
    %% Styling
    classDef user fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    classDef registry fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    classDef orch fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    classDef agent1 fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef agent2 fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef agent3 fill:#ffd43b,stroke:#f08c00,stroke-width:2px,color:#000
    classDef result fill:#e599f7,stroke:#9c36b5,stroke-width:2px,color:#fff
    
    class USER,DASH user
    class REG_CHECK,REG_DEP,REG_SCHEMA registry
    class COORD,SCHEDULE,MONITOR orch
    class DISC_LOAD,DISC_VAL,DISC_EXEC,DISC_OUT agent1
    class CITE_LOAD,CITE_DEPS,CITE_EXEC,CITE_OUT agent2
    class GAP_LOAD,GAP_DEPS,GAP_EXEC,GAP_OUT agent3
    class AGG,CACHE,NOTIFY result
```

### 7.2 Agent Dependency Matrix

```mermaid
graph TB
    subgraph Matrix["Agent Dependency Matrix"]
        direction TB
        
        subgraph Row1["Discovery Agent"]
            D_D[Discovery → Discovery: None]
            D_C[Discovery → Citation: Provides results]
            D_G[Discovery → Gap: Indirect via Citation]
        end
        
        subgraph Row2["Citation Tester"]
            C_D[Citation → Discovery: Depends on results]
            C_C[Citation → Citation: None]
            C_G[Citation → Gap: Provides results]
        end
        
        subgraph Row3["Gap Analyzer"]
            G_D[Gap → Discovery: Indirect via Citation]
            G_C[Gap → Citation: Depends on results]
            G_G[Gap → Gap: None]
        end
    end
    
    D_C -.->|Hard Dependency| C_D
    C_G -.->|Hard Dependency| G_C
    D_G -.->|Soft Dependency| G_D
    
    style D_C fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style C_G fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px
    style D_G fill:#4dabf7,stroke:#1971c2,stroke-width:2px
```

---

## 8. Summary & Key Insights

### Key Dependency Insights
1. **Critical Path**: Unified Registry → Database → Agent Infrastructure → Agent Implementation
2. **Blocking Dependencies**: 
   - All agent services blocked by registry foundation (Week 1)
   - Dashboard blocked by agent implementation (Week 3)
   - Deployment blocked by integration testing (Week 5)

3. **Data Dependencies**:
   - Discovery Agent provides data to Citation Tester
   - Citation Tester provides data to Gap Analyzer
   - All agents depend on Unified Registry for metadata

4. **Orchestration Dependencies**:
   - Metadata Registry → Data Contract Registry → Orchestration Control
   - Version Control Integration runs parallel to orchestration
   - All consumers depend on registry stability

### Risk Areas
- **Week 1**: Registry design quality impacts entire project
- **Week 2**: Agent infrastructure must handle registry-driven loading
- **Week 3**: Agent sequencing must respect data dependencies

### Optimization Opportunities
- Parallel work possible: Dashboard UI + Agent Implementation (Week 3-4)
- Version Control Integration can start after registry design (Week 1)
- Performance optimization can overlap with integration testing (Week 5)

---

**Document Version:** 1.0.0  
**Total Diagrams:** 14  
**Last Updated:** 2025-01-01
