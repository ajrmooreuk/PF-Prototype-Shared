# Mermaid Quick Start Guide

## Step 1: Import the Component

```tsx
import { MermaidDiagram } from "./components/MermaidDiagram";
```

## Step 2: Define Your Diagram

```tsx
const myDiagram = `
  flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
`;
```

## Step 3: Render It

```tsx
<MermaidDiagram chart={myDiagram} />
```

## Common Diagram Templates

### Process Flow
```
flowchart LR
  Start --> Process --> End
```

### Decision Tree
```
flowchart TD
  A[Question] --> B{Decision?}
  B -->|Yes| C[Action A]
  B -->|No| D[Action B]
```

### Sequence Flow
```
sequenceDiagram
  User->>System: Request
  System->>Database: Query
  Database-->>System: Data
  System-->>User: Response
```

### System Architecture
```
graph TB
  subgraph Frontend
    UI[React App]
  end
  
  subgraph Backend
    API[API Server]
  end
  
  subgraph Data
    DB[(Database)]
  end
  
  UI --> API --> DB
```

### State Machine
```
stateDiagram-v2
  [*] --> Idle
  Idle --> Active: Start
  Active --> Complete: Finish
  Complete --> [*]
```

## Styling Your Diagrams

### Add Colors
```
flowchart LR
  A[Node A] --> B[Node B]
  
  style A fill:#00a4bf,stroke:#008ca0,color:#fff
  style B fill:#e84e1c,stroke:#d43e0c,color:#fff
```

### Wrap in Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>My Process</CardTitle>
  </CardHeader>
  <CardContent>
    <MermaidDiagram chart={diagram} className="bg-muted/50 p-4 rounded-lg" />
  </CardContent>
</Card>
```

## Testing Your Diagrams

**Live Editor:** https://mermaid.live/

Paste your diagram code to preview before adding to your app!

## Full Documentation

See `/docs/MERMAID_GUIDE.md` for comprehensive examples and advanced usage.
