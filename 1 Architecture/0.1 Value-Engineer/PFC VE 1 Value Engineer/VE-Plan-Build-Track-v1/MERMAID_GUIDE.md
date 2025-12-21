# Mermaid Diagram Integration Guide

## Overview

The application now supports **Mermaid.js** diagrams, allowing you to embed flowcharts, sequence diagrams, class diagrams, and more using simple text-based syntax.

## Quick Start

### 1. Import the Component

```tsx
import { MermaidDiagram } from "./components/MermaidDiagram";
```

### 2. Use in Your Component

```tsx
export function MyComponent() {
  const diagram = `
    flowchart TD
      A[Start] --> B{Decision}
      B -->|Yes| C[Action 1]
      B -->|No| D[Action 2]
      C --> E[End]
      D --> E
  `;

  return (
    <div>
      <h2>My Process Flow</h2>
      <MermaidDiagram chart={diagram} />
    </div>
  );
}
```

## Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `chart` | `string` | Yes | Mermaid diagram syntax |
| `className` | `string` | No | Additional CSS classes for styling |
| `id` | `string` | No | Custom ID (auto-generated if not provided) |

## Diagram Types & Examples

### 1. Flowchart / Process Flow

**Best for:** Value Engineering workflows, decision trees, process maps

```tsx
const processFlow = `
  flowchart LR
    VE100[RRR] --> VE150[Business Framework]
    VE150 --> VE200[VSOM]
    VE200 --> VE300[OKR]
    VE300 --> VE400[Metrics]
    VE400 --> VE500[Canvas]
    VE500 --> VE800[PM & GTM]
`;

<MermaidDiagram chart={processFlow} className="bg-muted p-4 rounded" />
```

### 2. Sequence Diagram

**Best for:** API interactions, user flows, system communications

```tsx
const sequenceDiagram = `
  sequenceDiagram
    participant User
    participant CRM
    participant Product
    participant Analytics
    
    User->>CRM: Submit Lead
    CRM->>Product: Create Trial Account
    Product->>User: Send Welcome Email
    User->>Product: Sign Up Complete
    Product->>Analytics: Track Conversion
    Analytics-->>CRM: Update Lead Status
`;

<MermaidDiagram chart={sequenceDiagram} />
```

### 3. Class Diagram

**Best for:** Data models, architecture design, entity relationships

```tsx
const classDiagram = `
  classDiagram
    class ValueProposition {
      +String id
      +String title
      +Array segments
      +calculateScore()
      +validate()
    }
    
    class CustomerSegment {
      +String name
      +Array jobs
      +Array pains
      +Array gains
    }
    
    class Product {
      +String name
      +Array features
      +Array painRelievers
      +Array gainCreators
    }
    
    ValueProposition --> CustomerSegment
    ValueProposition --> Product
`;

<MermaidDiagram chart={classDiagram} />
```

### 4. State Diagram

**Best for:** User states, workflow states, system states

```tsx
const stateDiagram = `
  stateDiagram-v2
    [*] --> Lead
    Lead --> Prospect: Qualified
    Lead --> [*]: Rejected
    Prospect --> Trial: Sign Up
    Trial --> Customer: Converted
    Trial --> [*]: Churned
    Customer --> [*]: Churned
`;

<MermaidDiagram chart={stateDiagram} />
```

### 5. Gantt Chart

**Best for:** Project timelines, roadmaps, sprint planning

```tsx
const ganttChart = `
  gantt
    title Product Roadmap Q1 2024
    dateFormat  YYYY-MM-DD
    section Research
    Market Analysis       :2024-01-01, 14d
    User Interviews       :2024-01-08, 10d
    section Development
    Feature A             :2024-01-15, 21d
    Feature B             :2024-02-01, 14d
    section Launch
    Beta Testing          :2024-02-10, 10d
    GA Release            :2024-02-20, 5d
`;

<MermaidDiagram chart={ganttChart} />
```

### 6. Git Graph

**Best for:** Version control flows, branching strategies

```tsx
const gitGraph = `
  gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
`;

<MermaidDiagram chart={gitGraph} />
```

### 7. Entity Relationship Diagram

**Best for:** Database design, data architecture

```tsx
const erDiagram = `
  erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    
    CUSTOMER {
      string id PK
      string name
      string email
    }
    
    ORDER {
      string id PK
      string customerId FK
      date orderDate
    }
`;

<MermaidDiagram chart={erDiagram} />
```

### 8. User Journey

**Best for:** Customer experience mapping, UX flows

```tsx
const userJourney = `
  journey
    title Customer Onboarding Journey
    section Discovery
      Visit Website: 5: Customer
      Read Content: 4: Customer
    section Sign Up
      Create Account: 3: Customer
      Email Verification: 2: Customer
    section Activation
      Complete Profile: 4: Customer
      First Action: 5: Customer
`;

<MermaidDiagram chart={userJourney} />
```

### 9. Pie Chart

**Best for:** Data visualization, metrics breakdown

```tsx
const pieChart = `
  pie title Customer Segments Distribution
    "Enterprise" : 35
    "SMB" : 45
    "Startup" : 20
`;

<MermaidDiagram chart={pieChart} />
```

## Practical Examples by Module

### Value Engineer (VE)

```tsx
// In VE 100 - RRR Process
const rrrProcess = `
  flowchart TB
    subgraph RRR["Role, Responsibility, Rights"]
      R1[Define Roles]
      R2[Assign Responsibilities]
      R3[Establish Rights]
    end
    
    R1 --> R2
    R2 --> R3
    R3 --> V[Validate with OAA]
    V --> O[Output: RRR Matrix]
`;
```

### Product Manager

```tsx
// Feature Adoption Flow
const adoptionFlow = `
  stateDiagram-v2
    [*] --> Awareness: Feature Launch
    Awareness --> Trial: User Discovers
    Trial --> Adoption: Positive Experience
    Trial --> Rejection: Negative Experience
    Adoption --> Habit: Regular Use
    Habit --> Advocacy: Power User
    Rejection --> [*]
`;
```

### CRM

```tsx
// Lead Conversion Funnel
const crmFunnel = `
  flowchart TD
    V[Visitor] -->|Landing Page| L[Lead]
    L -->|Qualification| MQL[Marketing Qualified]
    MQL -->|Sales Handoff| SQL[Sales Qualified]
    SQL -->|Demo| T[Trial]
    T -->|Conversion| C[Customer]
    
    style V fill:#e1f5ff
    style L fill:#b3e5fc
    style MQL fill:#81d4fa
    style SQL fill:#4fc3f7
    style T fill:#29b6f6
    style C fill:#0288d1
`;
```

### Solution Architect

```tsx
// System Architecture
const architecture = `
  graph TB
    subgraph Frontend
      UI[React App]
      State[State Management]
    end
    
    subgraph Backend
      API[REST API]
      Auth[Authentication]
      BL[Business Logic]
    end
    
    subgraph Data
      DB[(Database)]
      Cache[(Redis Cache)]
    end
    
    UI --> State
    State --> API
    API --> Auth
    API --> BL
    BL --> DB
    BL --> Cache
`;
```

## Styling Tips

### 1. Add Background and Padding

```tsx
<MermaidDiagram 
  chart={diagram} 
  className="bg-muted p-4 rounded-lg border" 
/>
```

### 2. Center the Diagram

```tsx
<div className="flex justify-center">
  <MermaidDiagram chart={diagram} />
</div>
```

### 3. Inline with Card Components

```tsx
<Card>
  <CardHeader>
    <CardTitle>Process Flow</CardTitle>
  </CardHeader>
  <CardContent>
    <MermaidDiagram chart={diagram} className="my-4" />
  </CardContent>
</Card>
```

### 4. Custom Colors in Mermaid

```
flowchart LR
    A[Start] --> B[Process]
    B --> C[End]
    
    style A fill:#00a4bf,stroke:#008ca0,color:#fff
    style B fill:#e84e1c,stroke:#d43e0c,color:#fff
    style C fill:#4caf50,stroke:#388e3c,color:#fff
```

## Dynamic Diagrams

### Example: Generate from Data

```tsx
function ValueEngineersSteps({ steps }: { steps: string[] }) {
  const diagram = `
    flowchart LR
      ${steps.map((step, i) => `S${i}[${step}]`).join(' --> ')}
  `;
  
  return <MermaidDiagram chart={diagram} />;
}

// Usage
<ValueEngineersSteps steps={["RRR", "Framework", "VSOM", "OKR", "Metrics", "Canvas", "PM & GTM"]} />
```

## Common Patterns

### Conditional Rendering

```tsx
{showDiagram && (
  <MermaidDiagram 
    chart={diagram}
    className="mt-4" 
  />
)}
```

### Loading State

```tsx
{isLoading ? (
  <div className="animate-pulse bg-muted h-64 rounded" />
) : (
  <MermaidDiagram chart={diagram} />
)}
```

### Dialog with Diagram

```tsx
<Dialog>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>Architecture Overview</DialogTitle>
    </DialogHeader>
    <MermaidDiagram chart={architectureDiagram} />
  </DialogContent>
</Dialog>
```

## Resources

- **Official Mermaid Docs:** https://mermaid.js.org/
- **Live Editor:** https://mermaid.live/
- **Syntax Guide:** https://mermaid.js.org/intro/syntax-reference.html

## Troubleshooting

### Diagram Not Rendering

- Check syntax in [Mermaid Live Editor](https://mermaid.live/)
- Ensure proper indentation
- Verify all quotes and brackets are matched

### Performance Issues

- For complex diagrams, consider using `useMemo`:

```tsx
const diagram = useMemo(() => `
  flowchart TD
    // ... complex diagram
`, [dependencies]);
```

### Dark Mode Support

The component uses the default theme. For dark mode support, you can configure mermaid theme in `MermaidDiagram.tsx`.

## Next Steps

1. Add diagrams to your Value Engineer modules
2. Create visual process flows for CRM
3. Build architecture diagrams for Solution Architect
4. Design customer journey maps for Product Manager

Happy diagramming! 🎨
