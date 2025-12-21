# PF-Core Agentic Development Stack
## MVP Visual Guide v2.1

**Document:** PFC_AGENTIC_MVP_VISUAL_GUIDE_v2.1.md  
**Version:** 2.1.0  
**Date:** December 2025  
**Timeline:** 6 Weeks to Production  

---

## Document Overview

This guide provides a comprehensive visual walkthrough of the PF-Core Agentic Development Stack. It maps directly to the Figma UI structure (Program Manager/Solution Architect → Plan → Build → Track) and establishes the critical principle that **Value Engineering drives everything**.

The document is organized to answer three questions:
1. **What are we building?** (Parts 1-3: Architecture & Components)
2. **How does it work?** (Parts 4-5: Flows & Integration)
3. **How do we build it?** (Parts 6-9: Implementation & Reference)

---

## Part 1: The Complete Picture

### 1.1 Value Engineering First

**Scope:** This diagram establishes the foundational principle of our entire development approach. Unlike traditional feature-driven development where you start with "what feature do we want?", PF-Core starts with "what value are we creating and why does it matter strategically?"

**Purpose:** To show that Value Engineering (RRR, VSOM, OKR modules) combined with Client-Org Context produces the Value Proposition, which then cascades through PRD → Plan → Build → Track. This ensures every line of code we write is traceable back to strategic business value and measurable outcomes.

```mermaid
flowchart TB
    subgraph VE["🎯 VALUE ENGINEERING (Foundation)"]
        direction TB
        RRR[RRR: Roles, Responsibilities, RACI]
        VSOM[VSOM: Vision, Strategy, Objectives, Metrics]
        OKR[OKR: Objectives & Key Results]
        
        RRR --> VSOM
        VSOM --> OKR
    end
    
    subgraph CONTEXT["🏢 CLIENT-ORG CONTEXT"]
        direction TB
        Tenant[Tenant Configuration]
        Instance[PF-Instance: BAIV / W4M / AIR]
        Domain[Domain-Specific Rules]
    end
    
    subgraph VP["💎 VALUE PROPOSITION"]
        direction TB
        Problem[Problem Worth Solving]
        Solution[Solution Approach]
        Benefits[Measurable Benefits]
        Differentiation[Competitive Moat]
    end
    
    VE -->|defines| VP
    CONTEXT -->|contextualizes| VP
    
    VP -->|drives| PRD[📄 PRD Generation]
    PRD -->|creates| PLAN[📋 Plan: Specs & Stories]
    PLAN -->|guides| BUILD[🔨 Build: Code & Data]
    BUILD -->|tracked by| TRACK[📊 Track: Progress & Quality]
    
    style VE fill:#6366F1,color:#fff
    style CONTEXT fill:#8B5CF6,color:#fff
    style VP fill:#EC4899,color:#fff
    style PRD fill:#3B82F6,color:#fff
    style PLAN fill:#10B981,color:#fff
    style BUILD fill:#F59E0B,color:#fff
    style TRACK fill:#06B6D4,color:#fff
```

### 1.2 The Correct Flow Hierarchy

**Scope:** This diagram presents the six distinct layers of our development stack, arranged from strategic foundation to tactical execution. Each layer depends on the layers above it and produces outputs consumed by layers below.

**Purpose:** To establish clear boundaries between strategic planning (Layers 1-3) and tactical execution (Layers 4-6). This separation ensures that developers always have complete context about WHY they're building something, not just WHAT to build. It also enables parallel workstreams where strategic planning can proceed while execution continues on approved work.

```mermaid
flowchart LR
    subgraph Layer1["LAYER 1: VALUE FOUNDATION"]
        VE[Value Engineering<br/>RRR + VSOM + OKR]
    end
    
    subgraph Layer2["LAYER 2: INSTANCE CONTEXT"]
        CTX[Client-Org Context<br/>PF-Instance Config]
    end
    
    subgraph Layer3["LAYER 3: PROPOSITION"]
        VP[Value Proposition<br/>Why This Matters]
    end
    
    subgraph Layer4["LAYER 4: SPECIFICATION"]
        PRD[PRD Document<br/>What To Build]
    end
    
    subgraph Layer5["LAYER 5: PLANNING"]
        PLAN[Specs & Stories<br/>How To Build]
    end
    
    subgraph Layer6["LAYER 6: EXECUTION"]
        BUILD[Code + Data<br/>Actually Building]
    end
    
    Layer1 --> Layer2 --> Layer3 --> Layer4 --> Layer5 --> Layer6
    
    style Layer1 fill:#6366F1,color:#fff
    style Layer2 fill:#8B5CF6,color:#fff
    style Layer3 fill:#EC4899,color:#fff
    style Layer4 fill:#3B82F6,color:#fff
    style Layer5 fill:#10B981,color:#fff
    style Layer6 fill:#F59E0B,color:#fff
```

### 1.3 Mapping to Figma UI Structure

**Scope:** This diagram shows exactly how our agentic stack maps to the four main sections of the Figma UI design: Program Manager/Solution Architect, Plan, Build, and Track. Each UI section contains specific modules that correspond to our framework components.

**Purpose:** To bridge the gap between conceptual architecture and actual user interface. When designers work in Figma Make and developers implement in Next.js/shadcn, this mapping ensures everyone understands which backend capabilities power which UI components. It also establishes the feedback loop where Track insights flow back to Program Manager for continuous improvement.

```mermaid
graph TB
    subgraph "FIGMA UI STRUCTURE"
        subgraph PM["🎯 PROGRAM MANAGER / SOLUTION ARCHITECT"]
            VE_UI[Value Engineering Module]
            VSOM_UI[VSOM Manager]
            OKR_UI[OKR Cascade]
            Context_UI[Client-Org Context]
        end
        
        subgraph PLAN["📋 PLAN"]
            VP_UI[Value Proposition Builder]
            PRD_UI[PRD Generator]
            Spec_UI[Spec Manager]
            Story_UI[Story Board]
        end
        
        subgraph BUILD["🔨 BUILD"]
            OAA_UI[OAA Ontology Agent]
            TDD_UI[TDD Workspace]
            Data_UI[Data Mapper]
            API_UI[API Builder]
        end
        
        subgraph TRACK["📊 TRACK"]
            Issues_UI[Issue Tracker]
            Progress_UI[Progress Dashboard]
            Quality_UI[Quality Metrics]
        end
    end
    
    PM -->|"Value Proposition"| PLAN
    PLAN -->|"Specs & Stories"| BUILD
    BUILD -->|"Status Updates"| TRACK
    TRACK -.->|"Feedback"| PM
    
    style PM fill:#6366F1,color:#fff
    style PLAN fill:#3B82F6,color:#fff
    style BUILD fill:#10B981,color:#fff
    style TRACK fill:#F59E0B,color:#fff
```

---

## Part 2: Value Engineering Foundation

### 2.1 Value Engineering Components

**Scope:** This diagram breaks down the three core modules within Value Engineering: RRR (Roles, Responsibilities, RACI), VSOM (Vision, Strategy, Objectives, Metrics), and OKR (Objectives, Key Results, Initiatives). These modules collectively produce the strategic context, governance framework, and measurement framework that inform all downstream work.

**Purpose:** To show that Value Engineering is not a single monolithic concept but rather three interconnected modules that each serve a distinct purpose. RRR establishes WHO is responsible for what, VSOM establishes the STRATEGIC DIRECTION, and OKR establishes HOW we measure progress. Together, they create the Value Proposition that drives product development.

```mermaid
flowchart TB
    subgraph VE_MODULES["VALUE ENGINEERING MODULES"]
        subgraph RRR["RRR MODULE"]
            Roles[Roles Definition]
            Responsibilities[Responsibilities Matrix]
            RACI[RACI Chart]
        end
        
        subgraph VSOM_MOD["VSOM MODULE"]
            Vision[Vision Statement]
            Strategy[Strategic Objectives<br/>BSC Perspectives]
            Objectives[Operational Objectives]
            Metrics[KPIs & Metrics]
        end
        
        subgraph OKR_MOD["OKR MODULE"]
            OKR_Obj[Objectives]
            KeyResults[Key Results]
            Initiatives[Initiatives]
            Cascade[Cascade Relationships]
        end
    end
    
    subgraph OUTPUT["VALUE ENGINEERING OUTPUT"]
        Strategic[Strategic Context]
        Governance[Governance Framework]
        Measurement[Measurement Framework]
    end
    
    RRR --> Governance
    VSOM_MOD --> Strategic
    OKR_MOD --> Measurement
    
    Strategic --> VP_OUT[Value Proposition]
    Governance --> VP_OUT
    Measurement --> VP_OUT
    
    style RRR fill:#6366F1,color:#fff
    style VSOM_MOD fill:#8B5CF6,color:#fff
    style OKR_MOD fill:#EC4899,color:#fff
    style OUTPUT fill:#10B981,color:#fff
```

### 2.2 Client-Org Context & PF-Instance

**Scope:** This diagram illustrates the relationship between PF-Core (the shared platform foundation) and the three PF-Instances (BAIV, W4M, AIR). Each instance inherits core capabilities but extends them with instance-specific context, ontologies, and agents tailored to their domain.

**Purpose:** To demonstrate our multi-tenant architecture where a single codebase serves multiple business ventures. The Client-Org Context captures tenant-specific configuration, while the PF-Instance determines which specialized ontologies and agents are available. This separation enables code reuse while allowing deep customization per venture—critical for scaling the platform across BAIV (AI Visibility), W4M (Value Engineering), and AIR (AI Readiness).

```mermaid
flowchart TB
    subgraph PF_CORE["PF-CORE (Platform Foundation)"]
        Core_VE[Value Engineering Core]
        Core_Ontologies[Core Ontologies]
        Core_Agents[Core Agents]
    end
    
    subgraph INSTANCES["PF-INSTANCES"]
        subgraph BAIV["BAIV Instance"]
            BAIV_Context[BAIV Client-Org Context]
            BAIV_Ontologies[AI Visibility Ontologies]
            BAIV_Agents[BAIV-Specific Agents]
        end
        
        subgraph W4M["W4M Instance"]
            W4M_Context[W4M Client-Org Context]
            W4M_Ontologies[Value Engineering Ontologies]
            W4M_Agents[W4M-Specific Agents]
        end
        
        subgraph AIR["AIR Instance"]
            AIR_Context[AIR Client-Org Context]
            AIR_Ontologies[AI Readiness Ontologies]
            AIR_Agents[AIR-Specific Agents]
        end
    end
    
    PF_CORE -->|"extends"| BAIV
    PF_CORE -->|"extends"| W4M
    PF_CORE -->|"extends"| AIR
    
    style PF_CORE fill:#1F2937,color:#fff
    style BAIV fill:#3B82F6,color:#fff
    style W4M fill:#8B5CF6,color:#fff
    style AIR fill:#06B6D4,color:#fff
```

### 2.3 Value Proposition to PRD Flow

**Scope:** This sequence diagram shows the temporal flow of how a Value Proposition transforms into a PRD and then into actionable Plan items. It traces the journey from initial Value Engineering definition through to story creation, highlighting the handoffs between system components.

**Purpose:** To provide a step-by-step understanding of the process flow that existing Python scripts and agents will execute. This is critical for integration work—developers can see exactly which component produces which artifact, enabling them to wire up the existing PRD generation scripts to the new Value Engineering inputs. The sequence also shows approval checkpoints where human review is required.

```mermaid
sequenceDiagram
    participant VE as Value Engineering
    participant CTX as Client-Org Context
    participant VP as Value Proposition
    participant PRD as PRD Generator
    participant PLAN as Plan (Specs/Stories)
    
    VE->>VE: Define RRR (Roles/RACI)
    VE->>VE: Define VSOM (Strategy)
    VE->>VE: Define OKRs (Objectives)
    
    VE->>VP: Strategic Context
    CTX->>VP: Instance Configuration
    
    Note over VP: Value Proposition Created
    VP->>VP: Problem Statement
    VP->>VP: Solution Approach
    VP->>VP: Expected Benefits
    VP->>VP: Success Metrics
    
    VP->>PRD: Trigger PRD Generation
    Note over PRD: Uses existing Python scripts & Agents
    
    PRD->>PRD: Functional Requirements
    PRD->>PRD: Non-Functional Requirements
    PRD->>PRD: Acceptance Criteria
    
    PRD->>PLAN: Generate Specs
    PLAN->>PLAN: Break into Stories
    PLAN->>PLAN: Estimate & Prioritize
```

---

## Part 3: OAA Agent - Critical Early Component

### 3.1 Why OAA Agent First

**Scope:** This diagram emphasizes the critical dependency that makes the OAA (Ontology, Agent, Ability) Agent the first component we must build. It shows OAA's three core functions (Create, Test, Document) and how all other platform components depend on validated ontologies.

**Purpose:** To establish the build order priority. Without OAA Agent, we cannot create validated ontologies. Without validated ontologies, we cannot generate database schemas, type definitions, or API contracts. Without those, we cannot build features. This diagram should end any debate about what to build first—OAA is the critical path. BAIV specifically requires AI Visibility ontologies before any feature development can proceed.

```mermaid
flowchart TB
    subgraph OAA_CRITICAL["🔴 OAA AGENT - BUILD FIRST"]
        direction TB
        
        subgraph Create["CREATE"]
            Schema_Create[Create Ontology from Schema.org]
            Custom_Create[Add Custom Extensions]
            JSONLD_Create[Generate JSON-LD]
        end
        
        subgraph Test["TEST"]
            Validate[Validate Structure]
            Consistency[Check Consistency]
            Registry[Register in OAA Registry]
        end
        
        subgraph Document["DOCUMENT"]
            Generate_Docs[Auto-Generate Documentation]
            Examples[Create Usage Examples]
            API_Docs[Document API Contracts]
        end
    end
    
    subgraph DEPENDENCIES["EVERYTHING DEPENDS ON OAA"]
        DB[Database Schemas]
        API[API Contracts]
        Agents[Other Agents]
        UI[UI Components]
    end
    
    Create --> Test --> Document
    Document --> DEPENDENCIES
    
    style OAA_CRITICAL fill:#DC2626,color:#fff
    style DEPENDENCIES fill:#F59E0B,color:#fff
```

### 3.2 OAA Agent Architecture

**Scope:** This diagram details the internal architecture of the OAA Agent, showing its inputs (Schema.org vocabulary, business requirements, existing ontologies), processing stages, and outputs (JSON-LD ontology, SQL schemas, TypeScript definitions, documentation). It also shows integration with the OAA Registry for version control and compliance.

**Purpose:** To provide developers with a clear specification for building the OAA Agent. Each box represents a distinct capability that must be implemented. The Registry integration is crucial—ontologies must be versioned, tracked for dependencies, and validated for compliance. This architecture ensures ontologies are not just created but properly managed throughout their lifecycle.

```mermaid
flowchart TB
    subgraph OAA_AGENT["OAA AGENT"]
        subgraph Inputs["INPUTS"]
            SchemaOrg[Schema.org Vocabulary]
            Requirements[Business Requirements]
            Existing[Existing Ontologies]
        end
        
        subgraph Processing["PROCESSING"]
            Analyze[Analyze Requirements]
            Map[Map to Schema.org]
            Extend[Create Extensions]
            Validate[Validate & Test]
        end
        
        subgraph Outputs["OUTPUTS"]
            Ontology[JSON-LD Ontology]
            SQL[Supabase Schema SQL]
            TypeDefs[TypeScript Definitions]
            Docs[Documentation MD]
        end
    end
    
    subgraph Registry["OAA REGISTRY"]
        Version[Version Control]
        Dependencies[Dependency Tracking]
        Compliance[Compliance Checking]
    end
    
    Inputs --> Processing
    Processing --> Outputs
    Outputs --> Registry
    
    style OAA_AGENT fill:#6366F1,color:#fff
    style Registry fill:#10B981,color:#fff
```

### 3.3 OAA Agent for BAIV

**Scope:** This diagram shows the specific ontologies required for the BAIV (Be AI Visible) instance. These are organized into three categories: Discovery ontologies (audit, competitor, gap analysis), Content ontologies (blog, social, schema markup), and Visibility ontologies (citation, presence, authority).

**Purpose:** To define the concrete deliverables the OAA Agent must produce for BAIV to function. These aren't abstract concepts—they're actual JSON-LD files that will be created, validated, and registered. This gives the development team a clear target list for Week 2 of implementation. Without these ontologies, BAIV cannot store discovery results, generate content briefs, or track AI visibility metrics.

```mermaid
flowchart TB
    subgraph BAIV_ONTOLOGIES["BAIV ONTOLOGY REQUIREMENTS"]
        subgraph Discovery["DISCOVERY ONTOLOGIES"]
            Audit[Discovery Audit]
            Competitor[Competitor Analysis]
            Gap[Gap Analysis]
        end
        
        subgraph Content["CONTENT ONTOLOGIES"]
            Blog[Blog Brief]
            Social[Social Media Brief]
            Schema_Markup[Schema Markup]
        end
        
        subgraph Visibility["VISIBILITY ONTOLOGIES"]
            Citation[AI Citation]
            Presence[AI Presence]
            Authority[Authority Signals]
        end
    end
    
    subgraph OAA_OUTPUT["OAA AGENT OUTPUTS FOR BAIV"]
        O1[discovery-audit-ontology.json]
        O2[gap-analysis-ontology.json]
        O3[content-brief-ontology.json]
        O4[ai-visibility-ontology.json]
    end
    
    Discovery --> O1
    Discovery --> O2
    Content --> O3
    Visibility --> O4
    
    style BAIV_ONTOLOGIES fill:#3B82F6,color:#fff
    style OAA_OUTPUT fill:#10B981,color:#fff
```

---

## Part 4: Build Phase - Data Mapping

### 4.1 Build Architecture

**Scope:** This diagram shows the complete Build phase architecture, organized into four layers: Data Layer (Supabase, JSONB, RLS), API Layer (REST endpoints, validation, transforms), Agent Layer (OAA, PM, Architect, Developer agents), and UI Layer (Figma Make → Next.js → shadcn). It shows how approved Plans flow into the Build phase.

**Purpose:** To establish the technical stack and its interconnections. Developers need to understand that ontologies from OAA feed the Data Layer, which provides the foundation for APIs, which are consumed by Agents, which power the UI. This layered architecture ensures clean separation of concerns while maintaining data integrity through the ontology-driven approach.

```mermaid
flowchart TB
    subgraph PLAN_INPUT["FROM PLAN PHASE"]
        Specs[Approved Specs]
        Stories[Prioritized Stories]
        Ontologies[Validated Ontologies]
    end
    
    subgraph BUILD_PHASE["🔨 BUILD PHASE"]
        subgraph DataLayer["DATA LAYER"]
            DB[(Supabase PostgreSQL)]
            JSONB[JSONB Storage]
            RLS[Row Level Security]
        end
        
        subgraph APILayer["API LAYER"]
            REST[REST Endpoints]
            Validation[Schema Validation]
            Transform[Data Transform]
        end
        
        subgraph AgentLayer["AGENT LAYER"]
            OAA[OAA Agent]
            PM_Agent[PM Agent]
            Arch_Agent[Architect Agent]
            Dev_Agent[Developer Agent]
        end
        
        subgraph UILayer["UI LAYER"]
            Figma[Figma Make]
            NextJS[Next.js Components]
            ShadcnUI[shadcn/ui]
        end
    end
    
    PLAN_INPUT --> BUILD_PHASE
    
    Ontologies --> DataLayer
    DataLayer --> APILayer
    APILayer --> AgentLayer
    AgentLayer --> UILayer
    
    style PLAN_INPUT fill:#3B82F6,color:#fff
    style DataLayer fill:#0891B2,color:#fff
    style APILayer fill:#F59E0B,color:#fff
    style AgentLayer fill:#8B5CF6,color:#fff
    style UILayer fill:#EC4899,color:#fff
```

### 4.2 Data Mapping Flow

**Scope:** This diagram traces how a single ontology (JSON-LD) generates multiple downstream artifacts: database tables, TypeScript types, and API routes. It shows the transformation chain from semantic definition to executable code.

**Purpose:** To demonstrate the power of ontology-driven development. Write the ontology once, and the OAA Agent generates everything else—database schemas with proper JSONB columns, TypeScript interfaces for type safety, and Zod schemas for runtime validation. This eliminates the "schema drift" problem where database, types, and API fall out of sync. When you change the ontology, regenerate everything.

```mermaid
flowchart LR
    subgraph Ontology["ONTOLOGY (JSON-LD)"]
        O1["@context: schema.org"]
        O2["@type: CustomType"]
        O3["properties: {...}"]
    end
    
    subgraph Database["DATABASE (Supabase)"]
        D1[CREATE TABLE]
        D2[JSONB columns]
        D3[RLS policies]
        D4[Indexes]
    end
    
    subgraph API["API (Next.js)"]
        A1[Route handlers]
        A2[Zod validation]
        A3[Type inference]
    end
    
    subgraph Types["TYPESCRIPT"]
        T1[Interface definitions]
        T2[Zod schemas]
        T3[API types]
    end
    
    Ontology -->|"generates"| Database
    Ontology -->|"generates"| Types
    Database -->|"validates against"| API
    Types -->|"types"| API
    
    style Ontology fill:#6366F1,color:#fff
    style Database fill:#0891B2,color:#fff
    style API fill:#F59E0B,color:#fff
    style Types fill:#10B981,color:#fff
```

### 4.3 JSONB Storage Pattern

**Scope:** This diagram details our JSONB storage pattern for Supabase tables. It shows the standard table structure (id, tenant_id, core fields, metadata JSONB, data JSONB, timestamps) and explains why this pattern provides flexibility while maintaining queryability.

**Purpose:** To establish the database design pattern all tables must follow. The combination of fixed columns for frequently-queried fields and JSONB columns for flexible/evolving data gives us the best of both worlds. This pattern enables ontology evolution without database migrations—new ontology properties go into the JSONB columns. The benefits (schema evolution, ontology compliance, query flexibility, version tolerance) justify the slight complexity increase.

```mermaid
flowchart TB
    subgraph Pattern["JSONB STORAGE PATTERN"]
        subgraph Table["SUPABASE TABLE"]
            ID[id: UUID]
            TenantID[tenant_id: UUID]
            CoreFields[Core Fields: TEXT, INT, etc]
            Metadata[metadata: JSONB]
            Data[data: JSONB]
            Timestamps[created_at, updated_at]
        end
        
        subgraph JSONB_Content["JSONB CONTENT"]
            Flexible[Flexible Schema Data]
            Ontology_Data[Ontology-Defined Fields]
            Extensions[Custom Extensions]
        end
        
        subgraph Benefits["BENEFITS"]
            B1[Schema Evolution]
            B2[Ontology Compliance]
            B3[Query Flexibility]
            B4[Version Tolerance]
        end
    end
    
    Table --> JSONB_Content
    JSONB_Content --> Benefits
    
    style Table fill:#0891B2,color:#fff
    style JSONB_Content fill:#F59E0B,color:#fff
    style Benefits fill:#10B981,color:#fff
```

---

## Part 5: Complete System Flow

### 5.1 End-to-End Flow with All Components

**Scope:** This comprehensive diagram shows the complete six-phase flow from Value Engineering through to Track. Each phase is expanded to show its key activities, and the arrows show the progression and feedback loops between phases.

**Purpose:** To provide a single "big picture" view of how all components work together. This is the diagram to reference when explaining the system to new team members or stakeholders. It shows that we're not just building features—we're building a complete value delivery system where strategic intent flows through to execution and is continuously measured and improved.

```mermaid
flowchart TB
    subgraph VE_PHASE["1️⃣ VALUE ENGINEERING"]
        RRR_1[Define RRR]
        VSOM_1[Configure VSOM]
        OKR_1[Set OKRs]
        CTX_1[Set Client-Org Context]
    end
    
    subgraph VP_PHASE["2️⃣ VALUE PROPOSITION"]
        VP_Create[Create Value Proposition]
        VP_Validate[Validate Against Strategy]
        VP_Approve[Stakeholder Approval]
    end
    
    subgraph PRD_PHASE["3️⃣ PRD GENERATION"]
        PRD_Gen[Generate PRD<br/>Python Scripts + Agents]
        PRD_Review[Review & Refine]
        PRD_Approve[Approve PRD]
    end
    
    subgraph PLAN_PHASE["4️⃣ PLAN"]
        Spec_Gen[Generate Specs]
        Story_Create[Create Stories]
        Story_Prioritize[Prioritize & Estimate]
        Issues_Create[Create Beads Issues]
    end
    
    subgraph BUILD_PHASE["5️⃣ BUILD"]
        OAA_First[OAA: Create Ontologies]
        DB_Create[Create Database Schema]
        API_Create[Build API Endpoints]
        TDD_Code[TDD: Write Code]
        UI_Build[Build UI Components]
    end
    
    subgraph TRACK_PHASE["6️⃣ TRACK"]
        Progress[Track Progress]
        Quality[Monitor Quality]
        Feedback[Gather Feedback]
    end
    
    VE_PHASE --> VP_PHASE
    VP_PHASE --> PRD_PHASE
    PRD_PHASE --> PLAN_PHASE
    PLAN_PHASE --> BUILD_PHASE
    BUILD_PHASE --> TRACK_PHASE
    TRACK_PHASE -.->|"Iterate"| VP_PHASE
    
    style VE_PHASE fill:#6366F1,color:#fff
    style VP_PHASE fill:#EC4899,color:#fff
    style PRD_PHASE fill:#8B5CF6,color:#fff
    style PLAN_PHASE fill:#3B82F6,color:#fff
    style BUILD_PHASE fill:#10B981,color:#fff
    style TRACK_PHASE fill:#F59E0B,color:#fff
```

### 5.2 Agent Orchestration

**Scope:** This diagram shows how the various AI agents interact and hand off work to each other. It distinguishes between Core Agents (OAA, VE) that must be built first, Planning Agents (PM, Architect), and Execution Agents (Developer, Test). It also shows the shared orchestration layer that manages context and state.

**Purpose:** To define the agent ecosystem architecture. Not all agents are equal—Core Agents provide foundational capabilities that other agents depend on. The orchestration layer (shared context via CLAUDE.md, handoff protocols, state management) is what makes multi-agent collaboration possible. This diagram helps developers understand agent dependencies when planning build order.

```mermaid
flowchart TB
    subgraph Agents["AGENT ECOSYSTEM"]
        subgraph Core_Agents["CORE AGENTS (Build First)"]
            OAA_Agent[🔴 OAA Agent<br/>Ontology Management]
            VE_Agent[Value Engineering Agent<br/>VSOM/OKR Context]
        end
        
        subgraph Planning_Agents["PLANNING AGENTS"]
            PM_Agent[PM Agent<br/>PRD & Stories]
            Arch_Agent[Architect Agent<br/>Technical Design]
        end
        
        subgraph Execution_Agents["EXECUTION AGENTS"]
            Dev_Agent[Developer Agent<br/>TDD Implementation]
            Test_Agent[Test Agent<br/>Quality Validation]
        end
    end
    
    subgraph Orchestration["ORCHESTRATION"]
        Context[Shared Context<br/>CLAUDE.md + Memory]
        Handoff[Agent Handoff Protocol]
        State[State Management]
    end
    
    Core_Agents --> Orchestration
    Planning_Agents --> Orchestration
    Execution_Agents --> Orchestration
    
    OAA_Agent -->|"provides ontologies"| PM_Agent
    OAA_Agent -->|"provides schemas"| Arch_Agent
    VE_Agent -->|"provides context"| PM_Agent
    PM_Agent -->|"provides specs"| Arch_Agent
    Arch_Agent -->|"provides design"| Dev_Agent
    
    style Core_Agents fill:#DC2626,color:#fff
    style Planning_Agents fill:#3B82F6,color:#fff
    style Execution_Agents fill:#10B981,color:#fff
```

---

## Part 6: Step-by-Step Implementation Plan

### 6.1 Implementation Roadmap (6 Weeks)

**Scope:** This Gantt chart shows the complete 6-week implementation timeline, broken into weekly milestones. Each week has specific deliverables that build on previous weeks, creating a clear critical path to MVP completion.

**Purpose:** To provide project management visibility into the build sequence. Week 1-2 focuses on OAA Agent (critical path), Week 3 on Value Proposition and PRD, Week 4 on Build infrastructure, Week 5 on Integration, and Week 6 on Polish. This timeline accounts for dependencies—you can't build the database layer (Week 4) until ontologies exist (Week 2).

```mermaid
gantt
    title MVP Implementation Roadmap
    dateFormat  YYYY-MM-DD
    
    section Week 1: Foundation
    Value Engineering Setup        :w1a, 2025-01-06, 3d
    OAA Agent Core Build          :w1b, after w1a, 2d
    
    section Week 2: OAA & Ontologies
    OAA Agent Complete            :w2a, 2025-01-13, 2d
    BAIV Ontologies               :w2b, after w2a, 2d
    Ontology Testing Framework    :w2c, after w2b, 1d
    
    section Week 3: Value Prop & PRD
    Value Proposition Module      :w3a, 2025-01-20, 2d
    PRD Generator Integration     :w3b, after w3a, 2d
    Plan Phase UI                 :w3c, after w3b, 1d
    
    section Week 4: Build Phase
    Database Schema Generation    :w4a, 2025-01-27, 2d
    API Layer Build              :w4b, after w4a, 2d
    TDD Framework Setup          :w4c, after w4b, 1d
    
    section Week 5: Integration
    Agent Orchestration          :w5a, 2025-02-03, 2d
    UI Integration               :w5b, after w5a, 2d
    End-to-End Testing           :w5c, after w5b, 1d
    
    section Week 6: Polish
    Bug Fixes                    :w6a, 2025-02-10, 2d
    Documentation                :w6b, after w6a, 2d
    Team Training                :w6c, after w6b, 1d
```

### 6.2 Week 1: Foundation & OAA Start

**Scope:** This flowchart details the Day 1-5 activities for Week 1, organized into three phases: Value Engineering Setup (Days 1-2), Instance Configuration (Day 3), and OAA Agent Start (Days 4-5). Each box represents a specific task to complete.

**Purpose:** To give the development team a clear daily checklist for Week 1. By the end of Week 1, we should have VE module structure in place, BAIV instance configured, and OAA Agent interface defined with core parsing and generation capabilities started. This sets up everything needed for Week 2's ontology work.

```mermaid
flowchart TB
    subgraph Day1_2["Days 1-2: Value Engineering Setup"]
        A1[Setup VE Module Structure]
        A2[Configure RRR Templates]
        A3[Configure VSOM Templates]
        A4[Configure OKR Templates]
        A5[Create Client-Org Context Schema]
    end
    
    subgraph Day3["Day 3: Instance Configuration"]
        B1[Create PF-Instance Schema]
        B2[Configure BAIV Instance]
        B3[Setup Tenant Isolation]
    end
    
    subgraph Day4_5["Days 4-5: OAA Agent Start"]
        C1[Define OAA Agent Interface]
        C2[Implement Schema.org Parser]
        C3[Create Ontology Generator]
        C4[Build Validation Engine]
    end
    
    A1 --> A2 --> A3 --> A4 --> A5
    A5 --> B1 --> B2 --> B3
    B3 --> C1 --> C2 --> C3 --> C4
    
    style Day1_2 fill:#6366F1,color:#fff
    style Day3 fill:#8B5CF6,color:#fff
    style Day4_5 fill:#DC2626,color:#fff
```

### 6.3 Week 2: Complete OAA Agent

**Scope:** This flowchart details Week 2 activities: completing the OAA Agent core (Days 1-2), creating all BAIV ontologies (Days 3-4), and building the testing framework (Day 5). This is the most critical week—OAA Agent must be complete and validated.

**Purpose:** To ensure the critical path item (OAA Agent) is fully functional by end of Week 2. The specific BAIV ontologies listed (Discovery Audit, Gap Analysis, Content Brief, AI Visibility) are the minimum set required to proceed with BAIV feature development. The testing framework ensures ontologies are valid before they're used downstream.

```mermaid
flowchart TB
    subgraph Day1_2["Days 1-2: OAA Agent Core"]
        A1[Ontology Creation API]
        A2[JSON-LD Generator]
        A3[Schema.org Mapping]
        A4[Custom Extension Handler]
    end
    
    subgraph Day3_4["Days 3-4: BAIV Ontologies"]
        B1[Discovery Audit Ontology]
        B2[Gap Analysis Ontology]
        B3[Content Brief Ontology]
        B4[AI Visibility Ontology]
    end
    
    subgraph Day5["Day 5: Testing Framework"]
        C1[Ontology Validator]
        C2[Consistency Checker]
        C3[Documentation Generator]
        C4[OAA Registry Integration]
    end
    
    A1 --> A2 --> A3 --> A4
    A4 --> B1 --> B2 --> B3 --> B4
    B4 --> C1 --> C2 --> C3 --> C4
    
    style Day1_2 fill:#DC2626,color:#fff
    style Day3_4 fill:#3B82F6,color:#fff
    style Day5 fill:#10B981,color:#fff
```

### 6.4 Week 3: Value Proposition & PRD

**Scope:** This flowchart details Week 3 activities: building the Value Proposition module (Days 1-2), integrating the PRD Generator with existing Python scripts (Days 3-4), and creating the Plan Phase UI components (Day 5).

**Purpose:** To connect Value Engineering outputs to PRD generation. The VP module must capture problem statements, solution approaches, benefits, and success metrics. The PRD Generator integration leverages existing Python scripts and agents—we're not rebuilding, we're connecting. By end of Week 3, users can create a Value Proposition and generate a PRD through the UI.

```mermaid
flowchart TB
    subgraph Day1_2["Days 1-2: Value Proposition Module"]
        A1[VP Template System]
        A2[Problem Statement Builder]
        A3[Solution Approach Builder]
        A4[Benefits Calculator]
        A5[Strategic Alignment Checker]
    end
    
    subgraph Day3_4["Days 3-4: PRD Generator"]
        B1[Integrate Existing Python Scripts]
        B2[Connect PM Agent]
        B3[Template Processing]
        B4[Story Generation]
    end
    
    subgraph Day5["Day 5: Plan Phase UI"]
        C1[VP Input Form]
        C2[PRD Preview Panel]
        C3[Story Board View]
        C4[Approval Workflow]
    end
    
    A1 --> A2 --> A3 --> A4 --> A5
    A5 --> B1 --> B2 --> B3 --> B4
    B4 --> C1 --> C2 --> C3 --> C4
    
    style Day1_2 fill:#EC4899,color:#fff
    style Day3_4 fill:#8B5CF6,color:#fff
    style Day5 fill:#3B82F6,color:#fff
```

### 6.5 Week 4: Build Phase - Data Layer

**Scope:** This flowchart details Week 4 activities: using OAA to generate database schemas from ontologies (Days 1-2), building the API layer (Days 3-4), and setting up the TDD framework (Day 5).

**Purpose:** To transform ontologies into working infrastructure. The OAA Agent's schema generation capabilities (built in Week 2) now produce actual Supabase tables with RLS policies. The API layer implements CRUD operations with Zod validation derived from ontologies. The TDD setup with Vitest ensures all subsequent code has test coverage from the start.

```mermaid
flowchart TB
    subgraph Day1_2["Days 1-2: Database Schema"]
        A1[OAA Generates SQL from Ontologies]
        A2[Apply RLS Policies]
        A3[Create JSONB Columns]
        A4[Setup Indexes]
        A5[Run Migrations]
    end
    
    subgraph Day3_4["Days 3-4: API Layer"]
        B1[Generate API Routes from Ontologies]
        B2[Implement Zod Validation]
        B3[Add Type Safety]
        B4[Connect to Supabase]
    end
    
    subgraph Day5["Day 5: TDD Setup"]
        C1[Configure Vitest]
        C2[Setup Coverage]
        C3[Create Test Helpers]
        C4[Write First Tests]
    end
    
    A1 --> A2 --> A3 --> A4 --> A5
    A5 --> B1 --> B2 --> B3 --> B4
    B4 --> C1 --> C2 --> C3 --> C4
    
    style Day1_2 fill:#0891B2,color:#fff
    style Day3_4 fill:#F59E0B,color:#fff
    style Day5 fill:#10B981,color:#fff
```

### 6.6 Week 5: Integration

**Scope:** This flowchart details Week 5 activities: building the agent orchestration layer (Days 1-2), integrating all UI panels with their backend services (Days 3-4), and running end-to-end tests (Day 5).

**Purpose:** To connect all previously-built components into a working system. Agent orchestration enables agents to share context and hand off work. UI integration wires the Figma Make components to actual APIs. End-to-end testing validates the complete flow from Value Engineering through to completed code. This week transforms separate components into an integrated platform.

```mermaid
flowchart TB
    subgraph Day1_2["Days 1-2: Agent Orchestration"]
        A1[Context Sharing Protocol]
        A2[Agent Handoff System]
        A3[State Management]
        A4[Error Handling]
    end
    
    subgraph Day3_4["Days 3-4: UI Integration"]
        B1[Connect Plan Panel to Agents]
        B2[Connect Build Panel to TDD]
        B3[Connect Track Panel to Beads]
        B4[Real-time Updates]
    end
    
    subgraph Day5["Day 5: E2E Testing"]
        C1[Full Flow Test: VE → VP → PRD → Plan → Build]
        C2[Agent Communication Tests]
        C3[Data Integrity Tests]
        C4[Performance Tests]
    end
    
    A1 --> A2 --> A3 --> A4
    A4 --> B1 --> B2 --> B3 --> B4
    B4 --> C1 --> C2 --> C3 --> C4
    
    style Day1_2 fill:#8B5CF6,color:#fff
    style Day3_4 fill:#EC4899,color:#fff
    style Day5 fill:#10B981,color:#fff
```

### 6.7 Week 6: Polish & Training

**Scope:** This flowchart details the final week: fixing integration issues discovered in Week 5 (Days 1-2), completing documentation (Days 3-4), and training the team (Day 5).

**Purpose:** To ensure the MVP is production-ready. Bug fixes address issues found in E2E testing. Documentation includes API docs, agent usage guides, ontology references, and workflow tutorials—essential for team adoption. Training ensures all developers can use the system effectively. By end of Week 6, we have a working MVP with a trained team ready to build features.

```mermaid
flowchart TB
    subgraph Day1_2["Days 1-2: Bug Fixes"]
        A1[Fix Integration Issues]
        A2[Resolve Edge Cases]
        A3[Performance Optimization]
    end
    
    subgraph Day3_4["Days 3-4: Documentation"]
        B1[API Documentation]
        B2[Agent Usage Guide]
        B3[Ontology Reference]
        B4[Workflow Tutorials]
    end
    
    subgraph Day5["Day 5: Team Training"]
        C1[Workflow Walkthrough]
        C2[Agent Interaction Demo]
        C3[Troubleshooting Guide]
        C4[Go-Live Checklist]
    end
    
    A1 --> A2 --> A3
    A3 --> B1 --> B2 --> B3 --> B4
    B4 --> C1 --> C2 --> C3 --> C4
    
    style Day1_2 fill:#DC2626,color:#fff
    style Day3_4 fill:#3B82F6,color:#fff
    style Day5 fill:#10B981,color:#fff
```

---

## Part 7: UI Panel Specifications

### 7.1 Program Manager Panel (Value Engineering)

**Scope:** This diagram shows the component structure for the Program Manager panel in the Figma UI. It has three main sections: Value Engineering (RRR, VSOM, OKR tabs), Context (instance selector, tenant config), and Status (alignment scores, health indicators, alerts).

**Purpose:** To specify what UI components must be built for the Program Manager section. This is where executives and solution architects configure the strategic foundation. The Status section provides real-time visibility into strategic alignment—surfacing issues before they propagate downstream.

```mermaid
graph TB
    subgraph PMPanel["PROGRAM MANAGER PANEL"]
        subgraph VE_Section["Value Engineering Section"]
            RRR_Tab[RRR Tab<br/>Roles & RACI Matrix]
            VSOM_Tab[VSOM Tab<br/>Vision → Metrics Cascade]
            OKR_Tab[OKR Tab<br/>Objectives & Key Results]
        end
        
        subgraph Context_Section["Context Section"]
            Instance_Select[Instance Selector<br/>BAIV / W4M / AIR]
            Tenant_Config[Tenant Configuration]
            Custom_Settings[Custom Settings]
        end
        
        subgraph Status_Section["Status Section"]
            Alignment_Score[Strategic Alignment Score]
            Health_Indicators[Health Indicators]
            Alerts[Active Alerts]
        end
    end
    
    style VE_Section fill:#6366F1,color:#fff
    style Context_Section fill:#8B5CF6,color:#fff
    style Status_Section fill:#10B981,color:#fff
```

### 7.2 Plan Panel (VP → PRD → Stories)

**Scope:** This diagram shows the component structure for the Plan panel. It has four sections: Value Proposition (VP builder, strategic linking, benefits), PRD Generation (generate button, preview, edit), Stories (list, prioritization, issue creation), and Approval (checklist, approve/reject buttons).

**Purpose:** To specify the workflow for creating and approving plans. Users build Value Propositions linked to VSOM, generate PRDs via AI agents, review and refine specs, break into stories, and approve for development. This panel is where strategic intent transforms into actionable work items.

```mermaid
graph TB
    subgraph PlanPanel["PLAN PANEL"]
        subgraph VP_Section["Value Proposition"]
            VP_Form[VP Builder Form]
            Strategic_Link[Link to VSOM]
            Benefits_Calc[Benefits Calculator]
        end
        
        subgraph PRD_Section["PRD Generation"]
            Generate_Btn[Generate PRD Button]
            PRD_Preview[PRD Preview<br/>Markdown Viewer]
            Edit_PRD[Edit & Refine]
        end
        
        subgraph Story_Section["Stories"]
            Story_List[Story List<br/>Estimated Hours]
            Prioritize[Drag & Drop Priority]
            Create_Issues[Create Beads Issues]
        end
        
        subgraph Approval["Approval"]
            Review_Checklist[Review Checklist]
            Approve_Btn[Approve & Proceed]
            Reject_Btn[Request Changes]
        end
    end
    
    VP_Section --> PRD_Section --> Story_Section --> Approval
    
    style VP_Section fill:#EC4899,color:#fff
    style PRD_Section fill:#8B5CF6,color:#fff
    style Story_Section fill:#3B82F6,color:#fff
    style Approval fill:#10B981,color:#fff
```

### 7.3 Build Panel (OAA + TDD + Data)

**Scope:** This diagram shows the component structure for the Build panel. It has four sections: OAA Ontology Agent (browser, create, test, docs), Data Mapping (schema view, API view, types), TDD Workspace (task select, phase indicator, test console, coverage), and Actions (run tests, generate code, complete task).

**Purpose:** To specify the developer workspace. The OAA section provides ontology management—critical for maintaining data consistency. Data Mapping shows what the ontologies produce. TDD Workspace is where actual coding happens with test-first discipline. The Build panel is where specs become working software.

```mermaid
graph TB
    subgraph BuildPanel["BUILD PANEL"]
        subgraph OAA_Section["OAA Ontology Agent"]
            Ontology_List[Ontology Browser]
            Create_Ontology[Create New Ontology]
            Test_Ontology[Test & Validate]
            Doc_Ontology[View Documentation]
        end
        
        subgraph Data_Section["Data Mapping"]
            Schema_View[Database Schema<br/>Generated from Ontology]
            API_View[API Endpoints<br/>Auto-generated]
            Types_View[TypeScript Types]
        end
        
        subgraph TDD_Section["TDD Workspace"]
            Task_Select[Select Ready Task]
            Phase_Indicator[RED → GREEN → REFACTOR]
            Test_Console[Test Output Console]
            Coverage_Gauge[Coverage: 80%+]
        end
        
        subgraph Actions["Actions"]
            Run_Tests[Run Tests]
            Generate_Code[Generate Code]
            Complete_Task[Complete Task]
        end
    end
    
    OAA_Section --> Data_Section --> TDD_Section --> Actions
    
    style OAA_Section fill:#DC2626,color:#fff
    style Data_Section fill:#0891B2,color:#fff
    style TDD_Section fill:#10B981,color:#fff
    style Actions fill:#F59E0B,color:#fff
```

---

## Part 8: Quick Reference

### 8.1 Complete Flow Summary

**Scope:** This simplified diagram shows the entire flow in one line: Value Engineering → Value Proposition → PRD → Plan → Build → Track, with the OAA Agent providing ontologies to multiple stages.

**Purpose:** To provide a memorable summary of the system. When explaining PF-Core to someone in 30 seconds, this is the diagram to draw. Note the iteration loop from Track back to Value Proposition—this represents continuous improvement based on measured outcomes.

```mermaid
graph LR
    A[🎯 Value Engineering] --> B[💎 Value Proposition]
    B --> C[📄 PRD]
    C --> D[📋 Plan]
    D --> E[🔨 Build]
    E --> F[📊 Track]
    F -.->|Iterate| B
    
    OAA[🔴 OAA Agent]
    OAA -.->|"Ontologies to all phases"| C
    OAA -.->|"Schemas"| E
    
    style A fill:#6366F1,color:#fff
    style B fill:#EC4899,color:#fff
    style C fill:#8B5CF6,color:#fff
    style D fill:#3B82F6,color:#fff
    style E fill:#10B981,color:#fff
    style F fill:#F59E0B,color:#fff
    style OAA fill:#DC2626,color:#fff
```

### 8.2 Key Principles

| Principle | Description |
|-----------|-------------|
| **Value First** | Everything starts with Value Engineering—RRR, VSOM, OKR define why we build |
| **Ontology Driven** | OAA Agent creates, tests, and documents all schemas—single source of truth |
| **Context Aware** | Client-Org Context and PF-Instance drive customization per venture |
| **TDD Mandatory** | 80%+ test coverage required—write tests before code |
| **Instance Specific** | BAIV, W4M, AIR each have unique ontologies and agents |

### 8.3 Build Order

```
1. 🔴 OAA Agent (Week 1-2) - CRITICAL FIRST
2. 🎯 Value Engineering Modules (Week 1)
3. 💎 Value Proposition Builder (Week 3)
4. 📄 PRD Generator Integration (Week 3)
5. 🔨 Data Layer (Week 4)
6. 🧪 TDD Framework (Week 4)
7. 🔗 Integration (Week 5)
8. ✨ Polish (Week 6)
```

### 8.4 Agent Quick Reference

| Agent | Purpose | Inputs | Outputs |
|-------|---------|--------|---------|
| **OAA** | Ontology management | Requirements, Schema.org | JSON-LD, SQL, Types, Docs |
| **VE** | Strategic context | VSOM, OKR | Strategic alignment |
| **PM** | PRD & Stories | Value Prop | PRD.md, Stories |
| **Architect** | Technical design | PRD | Schema, API design |
| **Developer** | TDD coding | Stories | Tests, Code |

---

## Part 9: Success Criteria

### 9.1 MVP Complete Checklist

- [ ] **OAA Agent**: Can create, test, and document ontologies
- [ ] **Value Engineering**: RRR, VSOM, OKR modules functional
- [ ] **Value Proposition**: Can create VP linked to VE
- [ ] **PRD Generation**: Automated from VP using existing scripts
- [ ] **Plan Phase**: Specs and Stories generated correctly
- [ ] **Build Phase**: Database, API from ontologies working
- [ ] **TDD**: 80%+ coverage achieved
- [ ] **BAIV Ontologies**: All core ontologies created and validated
- [ ] **Integration**: Full flow works end-to-end

### 9.2 Definition of Done

**Scope:** This simple flow shows the five criteria that must be met for any work item to be considered "done": Value Aligned, Ontology Valid, Tests First, 80%+ Coverage, and Documented.

**Purpose:** To establish a consistent quality bar across all development work. Every PR, every feature, every module must pass all five criteria. This prevents technical debt accumulation and ensures the platform remains maintainable as it grows.

```mermaid
graph LR
    subgraph Done["✅ DEFINITION OF DONE"]
        A[Value Aligned]
        B[Ontology Valid]
        C[Tests First]
        D[80%+ Coverage]
        E[Documented]
    end
    
    A --> B --> C --> D --> E
    
    style Done fill:#10B981,color:#fff
```

---

*MVP Visual Guide v2.1 - Value Engineering First, OAA Agent Critical Path*
