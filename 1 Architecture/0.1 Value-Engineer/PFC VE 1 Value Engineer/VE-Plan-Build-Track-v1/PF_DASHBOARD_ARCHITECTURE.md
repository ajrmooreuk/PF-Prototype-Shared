# PF Dashboard Architecture

## Filter Flow Diagram

Use this in your application to visualize the dashboard filter architecture:

```tsx
import { MermaidDiagram } from "./components/MermaidDiagram";

const filterFlowDiagram = `
  flowchart TD
    Start[User Opens PF Dashboard] --> Filter[Filter Panel]
    
    Filter --> Instance{Select PF Instance?}
    Filter --> Product{Select Product?}
    
    Instance -->|All| ShowAll1[Show All Instances]
    Instance -->|BAIV| ShowBAIV[Show BAIV Only]
    Instance -->|PF Core| ShowCore[Show PF Core Only]
    Instance -->|W4M| ShowW4M[Show W4M Only]
    
    Product -->|All| ShowAllP[Show All Products]
    Product -->|Specific| FilterP[Filter Products]
    
    ShowAll1 --> Display[Display Filtered Results]
    ShowBAIV --> Display
    ShowCore --> Display
    ShowW4M --> Display
    ShowAllP --> Display
    FilterP --> Display
    
    Display --> Metrics[Update Metrics View]
    Display --> Cards[Update Instance Cards]
    
    style Filter fill:#00a4bf,stroke:#008ca0,color:#fff
    style Instance fill:#2196f3,stroke:#1976d2,color:#fff
    style Product fill:#2196f3,stroke:#1976d2,color:#fff
    style Display fill:#4caf50,stroke:#388e3c,color:#fff
`;

<MermaidDiagram chart={filterFlowDiagram} className="bg-muted p-4 rounded-lg" />
```

## Data Architecture

```tsx
const dataArchitecture = `
  graph TB
    subgraph "PF Dashboard"
      Dashboard[PlatformDashboard Component]
      FilterState[Filter State Management]
      
      Dashboard --> FilterState
    end
    
    subgraph "Data Sources"
      Platforms[mockPlatforms Array]
      Metrics[mockMetrics Array]
      
      Platforms --> BAIV[BAIV Platform]
      Platforms --> Core[PF Core Platform]
      Platforms --> W4M[W4M Platform]
      
      BAIV --> BAIV_Products[4 Products]
      Core --> Core_Products[4 Products]
      W4M --> W4M_Products[2 Products]
    end
    
    subgraph "Filter Logic"
      InstanceFilter[Instance Filter]
      ProductFilter[Product Filter]
      
      InstanceFilter --> FilteredPlatforms[Filtered Platforms]
      ProductFilter --> FilteredProducts[Filtered Products]
    end
    
    Platforms --> InstanceFilter
    BAIV_Products --> ProductFilter
    Core_Products --> ProductFilter
    W4M_Products --> ProductFilter
    
    FilterState --> InstanceFilter
    FilterState --> ProductFilter
    
    FilteredPlatforms --> Display[Render Cards]
    FilteredProducts --> Display
    Metrics --> Display
    
    style Dashboard fill:#9c27b0,stroke:#7b1fa2,color:#fff
    style Platforms fill:#00a4bf,stroke:#008ca0,color:#fff
    style InstanceFilter fill:#2196f3,stroke:#1976d2,color:#fff
    style ProductFilter fill:#2196f3,stroke:#1976d2,color:#fff
    style Display fill:#4caf50,stroke:#388e3c,color:#fff
`;

<MermaidDiagram chart={dataArchitecture} />
```

## Component Hierarchy

```tsx
const componentHierarchy = `
  graph TD
    App[Baiv2App] --> Tabs[Admin Tabs]
    Tabs --> PFDashboard[PF Dashboard Tab]
    
    PFDashboard --> PDComp[PlatformDashboard Component]
    
    PDComp --> FilterCard[Filter Card]
    PDComp --> MetricsGrid[Metrics Grid]
    PDComp --> InstancesList[Instances List]
    
    FilterCard --> InstanceSelect[Instance Selector]
    FilterCard --> ProductSelect[Product Selector]
    FilterCard --> ActiveFilters[Active Filters Display]
    
    InstancesList --> InstCard1[BAIV Card]
    InstancesList --> InstCard2[PF Core Card]
    InstancesList --> InstCard3[W4M Card]
    
    InstCard1 --> Products1[Product List]
    InstCard2 --> Products2[Product List]
    InstCard3 --> Products3[Product List]
    
    style PDComp fill:#00a4bf,stroke:#008ca0,color:#fff
    style FilterCard fill:#e84e1c,stroke:#d43e0c,color:#fff
    style MetricsGrid fill:#4caf50,stroke:#388e3c,color:#fff
    style InstancesList fill:#2196f3,stroke:#1976d2,color:#fff
`;

<MermaidDiagram chart={componentHierarchy} />
```

## State Management Flow

```tsx
const stateManagement = `
  stateDiagram-v2
    [*] --> AllInstances: Initial Load
    
    AllInstances --> BAIVSelected: Select BAIV
    AllInstances --> CoreSelected: Select PF Core
    AllInstances --> W4MSelected: Select W4M
    
    BAIVSelected --> AllInstances: Select All
    CoreSelected --> AllInstances: Select All
    W4MSelected --> AllInstances: Select All
    
    AllInstances --> ProductFiltered: Select Product
    BAIVSelected --> ProductFiltered: Select Product
    CoreSelected --> ProductFiltered: Select Product
    W4MSelected --> ProductFiltered: Select Product
    
    ProductFiltered --> AllInstances: Clear Filters
    ProductFiltered --> BAIVSelected: Instance + Product
    ProductFiltered --> CoreSelected: Instance + Product
    ProductFiltered --> W4MSelected: Instance + Product
    
    note right of AllInstances
      Default State
      Shows all 3 instances
      All products visible
    end note
    
    note right of ProductFiltered
      Filter Applied
      Can combine with
      instance filter
    end note
`;

<MermaidDiagram chart={stateManagement} />
```

## Future Ontology Config Architecture

```tsx
const ontologyArchitecture = `
  graph TB
    subgraph "Future: Ontology Configuration"
      OntologyUI[Ontology Config UI]
      
      OntologyUI --> DataModel[Data Model Editor]
      OntologyUI --> Relations[Relationship Manager]
      OntologyUI --> Validation[Validation Rules]
      OntologyUI --> Schema[Schema Designer]
      
      DataModel --> Entities[Entity Definitions]
      Relations --> Links[Entity Links]
      Validation --> Rules[Business Rules]
      Schema --> Structure[Data Structure]
      
      Entities --> Storage[(Ontology Storage)]
      Links --> Storage
      Rules --> Storage
      Structure --> Storage
      
      Storage --> Runtime[Runtime Validator]
      Runtime --> VE[Value Engineering]
      Runtime --> SA[Solution Architect]
      Runtime --> PM[Product Manager]
    end
    
    style OntologyUI fill:#9c27b0,stroke:#7b1fa2,color:#fff
    style Storage fill:#00a4bf,stroke:#008ca0,color:#fff
    style Runtime fill:#e84e1c,stroke:#d43e0c,color:#fff
`;

<MermaidDiagram chart={ontologyArchitecture} />
```

## Usage in Application

To display these diagrams in your application:

1. Import the MermaidDiagram component
2. Copy any of the diagram definitions above
3. Render using `<MermaidDiagram chart={diagramVariable} />`

Example:
```tsx
import { MermaidDiagram } from "./components/MermaidDiagram";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export function DashboardArchitecture() {
  const filterFlowDiagram = `...`; // Copy from above
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Filter Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <MermaidDiagram chart={filterFlowDiagram} />
      </CardContent>
    </Card>
  );
}
```
