# Visual Reference

# PF-Core Agent D2C: shadcn-to-Figma — Diagram Library

**Document ID**: PF-CORE-D2C-DIAG-001  
**Version**: 1.1  
**Date**: November 2024

---

## 1. System Architecture

### 1.1 Full System View

```mermaid
flowchart TB
    subgraph INPUT["📥 Inputs"]
        I1["shadcn/ui<br/>GitHub Repo"]
        I2["Configuration<br/>YAML"]
        I3["User<br/>Commands"]
    end
    
    subgraph ORCHESTRATOR["🎯 Orchestrator"]
        O1["Claude Agent SDK"]
        O2["Task Planner"]
        O3["Execution Monitor"]
    end
    
    subgraph AGENTS["🤖 Specialist Agents"]
        A1["Source<br/>Parser"]
        A2["Token<br/>Extractor"]
        A3["Component<br/>Mapper"]
        A4["Figma<br/>Generator"]
        A5["Validator"]
    end
    
    subgraph TOOLS["🔧 Tools"]
        T1["GitHub API"]
        T2["Figma Bridge"]
        T3["Schema Registry"]
    end
    
    subgraph OUTPUT["📤 Outputs"]
        OUT1["Figma<br/>Components"]
        OUT2["Design<br/>Tokens"]
        OUT3["Reports"]
    end
    
    INPUT --> ORCHESTRATOR
    ORCHESTRATOR --> AGENTS
    AGENTS --> TOOLS
    TOOLS --> OUTPUT
```

### 1.2 Agent Pipeline

```mermaid
flowchart LR
    P1["1️⃣<br/>Source<br/>Parser"]
    P2["2️⃣<br/>Token<br/>Extractor"]
    P3["3️⃣<br/>Component<br/>Mapper"]
    P4["4️⃣<br/>Figma<br/>Generator"]
    P5["5️⃣<br/>Validator"]
    
    P1 --> P2 --> P3 --> P4 --> P5
```

---

## 2. Component Hierarchy

### 2.1 Atomic Design

```mermaid
flowchart TB
    subgraph ATOMS["⚛️ ATOMS"]
        A1["BreadcrumbLink<br/>Default"]
        A2["BreadcrumbLink<br/>Hover"]
        A3["BreadcrumbPage"]
        A4["BreadcrumbSeparator"]
        A5["BreadcrumbEllipsis"]
    end
    
    subgraph MOLECULES["🧱 MOLECULES"]
        M1["BreadcrumbItem"]
    end
    
    subgraph ORGANISMS["🧬 ORGANISMS"]
        O1["BreadcrumbList"]
    end
    
    subgraph TEMPLATES["🏗️ TEMPLATES"]
        T1["Breadcrumb"]
    end
    
    A1 --> M1
    A4 --> M1
    M1 --> O1
    A3 --> O1
    O1 --> T1
```

### 2.2 Figma Node Structure

```mermaid
classDiagram
    class Breadcrumb {
        FrameNode container
        layoutMode: HORIZONTAL
    }
    
    class BreadcrumbList {
        FrameNode container
        layoutMode: HORIZONTAL
        itemSpacing: 6
    }
    
    class BreadcrumbItem {
        FrameNode container
        layoutMode: HORIZONTAL
        itemSpacing: 6
    }
    
    class BreadcrumbLink {
        ComponentNode
        TextNode label
        fills: mutedForeground
    }
    
    class BreadcrumbSeparator {
        ComponentNode
        VectorNode chevron
    }
    
    Breadcrumb --> BreadcrumbList
    BreadcrumbList --> BreadcrumbItem
    BreadcrumbItem --> BreadcrumbLink
    BreadcrumbItem --> BreadcrumbSeparator
```

---

## 3. Token Mapping

### 3.1 Conversion Flow

```mermaid
flowchart LR
    subgraph SOURCE["CSS / Tailwind"]
        S1["--muted-foreground"]
        S2["gap-1.5"]
        S3["text-sm"]
        S4["font-medium"]
    end
    
    subgraph CONVERT["Convert"]
        C1["HSL→RGB"]
        C2["rem→px"]
        C3["lookup"]
        C4["lookup"]
    end
    
    subgraph FIGMA["Figma"]
        F1["fills: RGB"]
        F2["itemSpacing: 6"]
        F3["fontSize: 14"]
        F4["fontName: Medium"]
    end
    
    S1 --> C1 --> F1
    S2 --> C2 --> F2
    S3 --> C3 --> F3
    S4 --> C4 --> F4
```

### 3.2 Color Token Structure

```mermaid
flowchart TB
    subgraph VARIABLE["Figma Variable Collection"]
        VC["shadcn Colors"]
    end
    
    subgraph MODES["Variable Modes"]
        M1["Light Mode"]
        M2["Dark Mode"]
    end
    
    subgraph COLORS["Color Variables"]
        C1["foreground"]
        C2["muted-foreground"]
        C3["background"]
        C4["border"]
    end
    
    VC --> M1 & M2
    M1 --> C1 & C2 & C3 & C4
    M2 --> C1 & C2 & C3 & C4
```

---

## 4. Workflow Diagrams

### 4.1 Full Sync

```mermaid
flowchart TB
    START([🚀 Start]) --> CONFIG["Load config"]
    CONFIG --> FETCH["Fetch shadcn repo"]
    FETCH --> LIST["List components"]
    LIST --> TOKENS["Extract tokens"]
    TOKENS --> VARS["Create variables"]
    
    VARS --> LOOP{{"For each<br/>component"}}
    LOOP -->|Next| PARSE["Parse"]
    PARSE --> MAP["Map"]
    MAP --> GEN["Generate"]
    GEN --> VAL["Validate"]
    VAL --> LOOP
    
    LOOP -->|Done| REPORT["Create report"]
    REPORT --> END([✅ Complete])
```

### 4.2 Incremental Update

```mermaid
flowchart TB
    START([🔄 Change Detected]) --> DIFF["Compute diff"]
    DIFF --> AFFECTED["Find affected"]
    
    AFFECTED --> CHECK{{"Token<br/>changes?"}}
    CHECK -->|Yes| UPDATE["Update variables"]
    CHECK -->|No| SKIP["Skip variables"]
    
    UPDATE --> REGEN
    SKIP --> REGEN["Regenerate"]
    
    REGEN --> VAL["Validate"]
    VAL --> REPORT["Report"]
    REPORT --> END([✅ Done])
```

### 4.3 Single Component

```mermaid
flowchart LR
    IN["Component<br/>name"] --> FETCH["Fetch"]
    FETCH --> PARSE["Parse"]
    PARSE --> MAP["Map"]
    MAP --> GEN["Generate"]
    GEN --> VAL["Validate"]
    VAL --> OUT["Figma<br/>component"]
```

---

## 5. State Diagrams

### 5.1 Component States

```mermaid
stateDiagram-v2
    [*] --> Default
    Default --> Hover: mouseenter
    Hover --> Default: mouseleave
    Default --> Focus: focus
    Focus --> Default: blur
    Default --> Active: click
    Active --> Default: release
    
    note right of Default: mutedForeground
    note right of Hover: foreground
```

### 5.2 Agent States

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Parsing: component requested
    Parsing --> Extracting: AST complete
    Extracting --> Mapping: tokens ready
    Mapping --> Generating: spec ready
    Generating --> Validating: component created
    Validating --> Idle: validation pass
    Validating --> Error: validation fail
    Error --> Idle: retry/skip
```

---

## 6. Sequence Diagrams

### 6.1 Generation Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant O as Orchestrator
    participant P as Parser
    participant T as Token Extractor
    participant M as Mapper
    participant G as Generator
    participant V as Validator
    participant F as Figma
    
    U->>O: Generate component
    O->>P: Parse source
    P->>O: AST + classes
    O->>T: Extract tokens
    T->>O: Token definitions
    O->>M: Map to Figma
    M->>O: Component spec
    O->>G: Generate
    G->>F: Create component
    F-->>G: Component ID
    O->>V: Validate
    V->>F: Check properties
    F-->>V: Properties
    V->>O: Validation result
    O->>U: Complete
```

### 6.2 Plugin Bridge Sequence

```mermaid
sequenceDiagram
    participant A as Agent
    participant B as Bridge Server
    participant P as Figma Plugin
    participant F as Figma API
    
    A->>B: POST /execute
    B->>P: WebSocket command
    P->>F: createComponent()
    F-->>P: ComponentNode
    P->>F: appendChild()
    F-->>P: Success
    P-->>B: Result
    B-->>A: JSON response
```

---

## 7. Project Timeline

### 7.1 Gantt Chart

```mermaid
gantt
    title PF-Core Agent D2C Timeline
    dateFormat YYYY-MM-DD
    
    section Phase 1
    Environment Setup      :p1a, 2024-12-01, 2d
    Agent SDK             :p1b, after p1a, 3d
    Figma Bridge          :p1c, after p1a, 5d
    Token Extraction      :p1d, after p1c, 4d
    
    section Phase 2
    Parser Agent          :p2a, after p1b, 3d
    Mapper Agent          :p2b, after p2a, 3d
    Generator Agent       :p2c, after p2b, 4d
    Validation            :p2d, after p2c, 3d
    Core Components       :p2e, after p2d, 5d
    
    section Phase 3
    Batch Processing      :p3a, after p2e, 3d
    P0 Components         :p3b, after p3a, 7d
    P1 Components         :p3c, after p3b, 7d
    
    section Phase 4
    CLI & Config          :p4a, after p3c, 5d
    Documentation         :p4b, after p4a, 4d
    Deployment            :p4c, after p4b, 2d
```

---

## 8. Traceability

### 8.1 Coverage Flow

```mermaid
flowchart LR
    PRD["📋 PRD<br/>53 Requirements"]
    PBS["📦 PBS<br/>21 Items"]
    WBS["📊 WBS<br/>19 Packages"]
    
    PRD <-->|"100%"| PBS
    PBS <-->|"100%"| WBS
    
    style PRD fill:#4ade80
    style PBS fill:#4ade80
    style WBS fill:#4ade80
```

### 8.2 Coverage Pie

```mermaid
pie title Requirement Coverage
    "Fully Covered" : 50
    "Implicitly Covered" : 3
    "Not Covered" : 0
```

---

## Document Control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2024 | Initial diagrams |
| 1.1 | Nov 2024 | PF-Core prefix, expanded |

---

*Document ID: PF-CORE-D2C-DIAG-001*  
*Part of PF-Core Agent Suite*
