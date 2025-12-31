# PF-Core Architecture Diagrams v2.0

**Unified OAA Registry + Agent Integration Visual Reference**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 2.0.0 |
| **Date** | December 2025 |
| **Format** | Mermaid Diagrams |
| **Status** | APPROVED |

---

## 1. Unified Registry Architecture

### 1.1 Complete Registry Structure

```mermaid
flowchart TB
    subgraph SUPABASE["SUPABASE DATABASE"]
        subgraph EXISTING["EXISTING OAA Registry v3.0"]
            ONT[("ontologies<br/>━━━━━━━━━<br/>ontology_definition JSONB<br/>registry_metadata JSONB<br/>quality_metrics JSONB")]
            ENT[("entities<br/>━━━━━━━━━<br/>entity_name<br/>properties JSONB<br/>ai_capabilities JSONB")]
            COMP[("oaa_competency_questions<br/>━━━━━━━━━<br/>question_text<br/>expected_answer JSONB")]
        end
        
        subgraph NEW["NEW Agent Registry Extension"]
            AGENT[("agent_registry<br/>━━━━━━━━━<br/>agent_specification JSONB<br/>authority_boundary JSONB<br/>claude_config JSONB")]
            BIND[("agent_ontology_bindings<br/>━━━━━━━━━<br/>binding_type<br/>node_types[]")]
            TOOL[("tool_registry<br/>━━━━━━━━━<br/>tool_specification JSONB")]
            TOOL_BIND[("agent_tool_bindings")]
        end
    end
    
    subgraph PYTHON["PYTHON LAYER"]
        LOADER["OntologyLoader<br/>(existing)"]
        UNIFIED["UnifiedRegistryLoader<br/>(extends OntologyLoader)"]
        NAV["OntologyNavigator"]
    end
    
    subgraph TEMPLATES["CLAUDE CODE SDK TEMPLATES"]
        BASE["BaseAgentTemplate"]
        DOMAIN["DomainAgentTemplate"]
        INTEG["IntegrationAgentTemplate"]
        ORCH["OrchestratorAgentTemplate"]
    end
    
    ONT --> ENT
    ONT --> COMP
    ONT --> LOADER
    
    AGENT --> BIND
    BIND --> ONT
    AGENT --> TOOL_BIND
    TOOL_BIND --> TOOL
    
    LOADER --> UNIFIED
    AGENT --> UNIFIED
    NAV --> UNIFIED
    
    UNIFIED --> BASE
    BASE --> DOMAIN
    BASE --> INTEG
    BASE --> ORCH
    
    style EXISTING fill:#e8f5e9
    style NEW fill:#e3f2fd
    style TEMPLATES fill:#fff3e0
```

### 1.2 Registry Relationship Graph

```mermaid
graph LR
    subgraph ONTOLOGIES["Ontology Registry"]
        VSOM["VSOM<br/>v1.0"]
        AIV["AI Visibility<br/>v1.1"]
        GAP["Gap Analysis<br/>v1.1"]
        BRAND["Universal Brand<br/>v1.0"]
        CR["Content Rec<br/>v1.0"]
    end
    
    subgraph AGENTS["Agent Registry"]
        CSA["Content Strategy<br/>Agent"]
        VAA["Visibility Analysis<br/>Agent"]
        GAA["Gap Analysis<br/>Agent"]
        SCA["Strategic Context<br/>Agent"]
    end
    
    subgraph TOOLS["Tool Registry"]
        CLAUDE["Claude API"]
        SUPA["Supabase Graph"]
        FIGMA["Figma MCP"]
    end
    
    %% Agent-Ontology Bindings
    CSA -->|consumes| AIV
    CSA -->|consumes| GAP
    CSA -->|produces| CR
    CSA -->|requires| VSOM
    
    VAA -->|produces| AIV
    VAA -->|requires| VSOM
    
    GAA -->|consumes| AIV
    GAA -->|consumes| BRAND
    GAA -->|produces| GAP
    
    SCA -->|produces| VSOM
    
    %% Agent-Tool Bindings
    CSA -.->|uses| CLAUDE
    CSA -.->|uses| SUPA
    VAA -.->|uses| CLAUDE
    GAA -.->|uses| FIGMA
    
    style ONTOLOGIES fill:#e8f5e9
    style AGENTS fill:#e3f2fd
    style TOOLS fill:#fff3e0
```

---

## 2. Agent-Ontology Binding Resolution

### 2.1 Binding Resolution Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Factory as AgentFactory
    participant Registry as agent_registry
    participant Bindings as agent_ontology_bindings
    participant Ontologies as ontologies (existing)
    participant Template as BaseAgentTemplate
    participant Claude as Claude SDK
    
    App->>Factory: create_agent("agent-baiv-content-1.0")
    
    Factory->>Registry: SELECT * WHERE agent_id = ?
    Registry-->>Factory: agent_specification JSONB
    
    Factory->>Bindings: get_agent_ontology_bindings(agent_id)
    
    loop For each binding
        Bindings->>Ontologies: JOIN on ontology_id
        Ontologies-->>Bindings: ontology_definition JSONB
    end
    
    Bindings-->>Factory: {consumes: [...], produces: [...], requires: [...]}
    
    Factory->>Template: new(agent_spec, ontology_bindings)
    
    Template->>Template: Extract entities for node_types
    Template->>Template: Build validation_rules
    Template->>Template: Build system_prompt with ontology context
    
    Template-->>Factory: Agent instance
    Factory-->>App: Ready agent
    
    Note over App,Claude: Agent Execution
    
    App->>Template: execute(task)
    Template->>Claude: invoke(system_prompt, messages, tools)
    Claude-->>Template: response with tool_use
    
    Template->>Template: validate_output(data, entity_type)
    Note over Template: Validates against<br/>PRODUCES ontology
    
    Template-->>App: AgentResult
```

### 2.2 Ontology Context Injection

```mermaid
flowchart TB
    subgraph INPUT["Agent Specification"]
        SPEC["agent_specification JSONB"]
        BINDINGS["ontologyBindings"]
    end
    
    subgraph RESOLUTION["Binding Resolution"]
        CONSUMES["CONSUMES<br/>━━━━━━<br/>ai-visibility<br/>gap-analysis"]
        PRODUCES["PRODUCES<br/>━━━━━━<br/>content-recommendation"]
        REQUIRES["REQUIRES<br/>━━━━━━<br/>vsom"]
    end
    
    subgraph EXTRACTION["Entity Extraction"]
        E1["QueryCategory<br/>├─ category<br/>├─ intent_type<br/>└─ confidence"]
        E2["Gap<br/>├─ gapId<br/>├─ dimension<br/>└─ severity"]
        E3["ContentRecommendation<br/>├─ title<br/>├─ priority<br/>└─ actions"]
    end
    
    subgraph PROMPT["Claude System Prompt"]
        SYS["## Ontologies You Work With<br/><br/>### CONSUMES (read):<br/>- QueryCategory: [category, intent...]<br/>- Gap: [gapId, dimension...]<br/><br/>### PRODUCES (validate):<br/>- ContentRecommendation: [title...]<br/><br/>### REQUIRES (context):<br/>- VisionStatement: [vision...]"]
    end
    
    SPEC --> BINDINGS
    BINDINGS --> CONSUMES
    BINDINGS --> PRODUCES
    BINDINGS --> REQUIRES
    
    CONSUMES --> E1
    CONSUMES --> E2
    PRODUCES --> E3
    
    E1 --> SYS
    E2 --> SYS
    E3 --> SYS
    
    style INPUT fill:#e3f2fd
    style RESOLUTION fill:#fff3e0
    style EXTRACTION fill:#e8f5e9
    style PROMPT fill:#f3e5f5
```

---

## 3. Tiered Graph with Registry Integration

### 3.1 Three-Tier Graph Model

```mermaid
flowchart TB
    subgraph TIER1["TIER 1: PF-CORE STRATEGIC"]
        direction TB
        T1_VSOM["VSOM Ontology"]
        T1_SCHEMA["Schema.org Base"]
        T1_REG["OAA Registry<br/>+ Agent Registry"]
    end
    
    subgraph TIER2["TIER 2: DOMAIN EXTENSIONS"]
        direction TB
        
        subgraph BAIV["BAIV Domain"]
            B_AIV["ai-visibility"]
            B_GAP["gap-analysis"]
            B_BRAND["universal-brand"]
            B_AGENTS["Content Strategy Agent<br/>Visibility Agent<br/>Gap Analysis Agent"]
        end
        
        subgraph W4M["W4M Domain"]
            W_VE["value-engineering"]
            W_PM["program-mgmt"]
            W_AGENTS["Value Engineering Agent<br/>Program Manager Agent"]
        end
        
        subgraph AIR["AIR Domain"]
            A_STRAT["ai-strategy"]
            A_MAT["maturity-model"]
            A_AGENTS["AI Strategy Agent<br/>Maturity Assessment Agent"]
        end
    end
    
    subgraph TIER3["TIER 3: TENANT INSTANCES"]
        T3_A["Tenant A<br/>Customer Data"]
        T3_B["Tenant B<br/>Customer Data"]
        T3_C["Tenant C<br/>Customer Data"]
    end
    
    TIER1 --> BAIV
    TIER1 --> W4M
    TIER1 --> AIR
    
    BAIV --> T3_A
    BAIV --> T3_B
    W4M --> T3_C
    
    style TIER1 fill:#1565c0,color:#fff
    style BAIV fill:#2e7d32,color:#fff
    style W4M fill:#f57c00,color:#fff
    style AIR fill:#7b1fa2,color:#fff
    style TIER3 fill:#78909c,color:#fff
```

### 3.2 Agent Authority by Tier

```mermaid
flowchart TB
    subgraph ORCHESTRATOR["ORCHESTRATOR AGENTS"]
        direction LR
        O1["Master Orchestrator"]
        O2["Platform Orchestrator"]
    end
    
    subgraph DOMAIN["DOMAIN AGENTS"]
        direction LR
        D1["Content Strategy"]
        D2["Value Engineering"]
        D3["AI Strategy"]
    end
    
    subgraph UTILITY["UTILITY AGENTS"]
        direction LR
        U1["Report Generator"]
        U2["Schema Validator"]
    end
    
    subgraph INTEGRATION["INTEGRATION AGENTS"]
        direction LR
        I1["Figma MCP Bridge"]
        I2["Web Search Agent"]
    end
    
    subgraph TIERS["TIER ACCESS"]
        T1["Tier 1<br/>Strategic"]
        T2["Tier 2<br/>Domain"]
        T3["Tier 3<br/>Tenant"]
    end
    
    %% Orchestrator access
    O1 -->|"R/W"| T1
    O1 -->|"R"| T2
    O1 -.->|"delegate"| T3
    
    %% Domain agent access
    D1 -->|"R"| T1
    D1 -->|"R/W own domain"| T2
    D1 -->|"R/W tenant"| T3
    
    %% Utility agent access
    U1 -->|"R"| T1
    U1 -->|"R"| T2
    U1 -->|"R/W tenant"| T3
    
    %% Integration agent access
    I1 -.->|"❌"| T1
    I1 -.->|"❌"| T2
    I1 -->|"R/W specific"| T3
    
    style ORCHESTRATOR fill:#1565c0,color:#fff
    style DOMAIN fill:#2e7d32,color:#fff
    style UTILITY fill:#f57c00,color:#fff
    style INTEGRATION fill:#78909c,color:#fff
```

---

## 4. Claude Code SDK Integration

### 4.1 Agent Template Hierarchy

```mermaid
classDiagram
    class BaseAgentTemplate {
        +agent_id: str
        +spec: AgentSpecification
        +ontology_bindings: Dict
        +system_prompt: str
        +claude: Anthropic
        +_load_agent_specification()
        +_resolve_ontology_bindings()
        +_build_system_prompt()
        +validate_output(data, entity_type)
        +check_authority(action, tier)
        +invoke_claude(messages, tools)
        +execute()* 
    }
    
    class DomainAgentTemplate {
        +tools: List[Dict]
        +_build_tools()
        +handle_tool_call(tool_name, input)
        +_read_tier1(context_types)
        +_read_tier2(node_types)
        +_write_tier3(node_type, properties)
    }
    
    class IntegrationAgentTemplate {
        +mcp_client: MCPClient
        +_connect_mcp_server()
        +handle_mcp_tool(tool_name, input)
    }
    
    class OrchestratorAgentTemplate {
        +sub_agents: List[str]
        +orchestrate(task)
        +delegate_to_agent(agent_id, task)
        +aggregate_results(results)
    }
    
    BaseAgentTemplate <|-- DomainAgentTemplate
    BaseAgentTemplate <|-- IntegrationAgentTemplate
    BaseAgentTemplate <|-- OrchestratorAgentTemplate
    
    class ContentStrategyAgent {
        +analyze_gaps()
        +generate_recommendations()
        +execute()
    }
    
    class FigmaMCPBridge {
        +sync_design()
        +import_components()
        +execute()
    }
    
    DomainAgentTemplate <|-- ContentStrategyAgent
    IntegrationAgentTemplate <|-- FigmaMCPBridge
```

### 4.2 Agent Execution Flow

```mermaid
stateDiagram-v2
    [*] --> Loading: create_agent()
    
    Loading --> ResolvingBindings: Load from agent_registry
    ResolvingBindings --> BuildingPrompt: Resolve ontology bindings
    BuildingPrompt --> Ready: Inject ontology context
    
    Ready --> Executing: execute(task)
    
    state Executing {
        [*] --> InvokingClaude
        InvokingClaude --> ProcessingToolCalls: tool_use blocks
        ProcessingToolCalls --> CheckingAuthority
        
        state CheckingAuthority {
            [*] --> Authorized: check_authority() = true
            [*] --> Denied: check_authority() = false
        }
        
        Authorized --> ExecutingTool
        Denied --> Error
        
        ExecutingTool --> ValidatingOutput: write operations
        
        state ValidatingOutput {
            [*] --> Valid: validate_output() = true
            [*] --> Invalid: validate_output() = false
        }
        
        Valid --> InvokingClaude: more tool calls
        Invalid --> Error
        
        InvokingClaude --> Complete: stop_reason = end_turn
    }
    
    Complete --> [*]: AgentResult(success=true)
    Error --> [*]: AgentResult(success=false)
```

---

## 5. Database Schema

### 5.1 Complete ERD

```mermaid
erDiagram
    USERS ||--o{ ONTOLOGIES : owns
    USERS ||--o{ AGENT_REGISTRY : owns
    
    ONTOLOGIES ||--o{ ENTITIES : contains
    ONTOLOGIES ||--o{ OAA_COMPETENCY_QUESTIONS : validates
    ONTOLOGIES ||--o{ AGENT_ONTOLOGY_BINDINGS : bound_to
    
    AGENT_REGISTRY ||--o{ AGENT_ONTOLOGY_BINDINGS : has_bindings
    AGENT_REGISTRY ||--o{ AGENT_TOOL_BINDINGS : uses_tools
    
    TOOL_REGISTRY ||--o{ AGENT_TOOL_BINDINGS : used_by
    
    USERS {
        uuid id PK
        text email UK
        text full_name
        text role
        jsonb preferences
    }
    
    ONTOLOGIES {
        uuid id PK
        text entry_id UK
        text name
        text version
        text domain
        text status
        jsonb ontology_definition
        jsonb registry_metadata
        jsonb quality_metrics
        uuid owner_id FK
        timestamptz created_at
    }
    
    ENTITIES {
        uuid id PK
        uuid ontology_id FK
        text entity_name
        text schema_org_base
        jsonb properties
        jsonb ai_capabilities
    }
    
    OAA_COMPETENCY_QUESTIONS {
        uuid id PK
        uuid ontology_id FK
        text question_text
        text question_type
        jsonb expected_answer
        boolean is_required
    }
    
    AGENT_REGISTRY {
        uuid id PK
        text agent_id UK
        text name
        text version
        text agent_type
        text domain
        text tier
        jsonb agent_specification
        jsonb authority_boundary
        jsonb claude_config
        text status
        jsonb quality_metrics
        uuid owner_id FK
    }
    
    AGENT_ONTOLOGY_BINDINGS {
        uuid id PK
        uuid agent_id FK
        uuid ontology_id FK
        text binding_type
        text[] node_types
        text purpose
    }
    
    TOOL_REGISTRY {
        uuid id PK
        text tool_id UK
        text name
        text tool_type
        jsonb tool_specification
        text status
    }
    
    AGENT_TOOL_BINDINGS {
        uuid id PK
        uuid agent_id FK
        uuid tool_id FK
        boolean is_required
        text purpose
    }
```

---

## 6. Implementation Timeline

### 6.1 22-Week Roadmap

```mermaid
gantt
    title PF-Core Unified Registry Implementation
    dateFormat  YYYY-MM-DD
    
    section Phase 0: Registry Integration
    Create agent_registry table       :p0a, 2025-01-06, 1w
    Create binding tables             :p0b, after p0a, 1w
    Extend OntologyLoader             :p0c, after p0b, 1w
    Claude SDK Templates              :p0d, after p0c, 1w
    
    section Phase 1: Foundation
    Tier 1 Graph Schema               :p1a, after p0d, 2w
    RLS Policies                      :p1b, after p1a, 1w
    VSOM Ontology + Binding           :p1c, after p1b, 1w
    
    section Phase 2: Domain Extensions
    BAIV Agents + Bindings            :p2a, after p1c, 2w
    W4M Agents + Bindings             :p2b, after p2a, 2w
    AIR Agents + Bindings             :p2c, after p2b, 2w
    
    section Phase 3: Tenant Patterns
    Tier 3 Templates                  :p3a, after p2c, 2w
    MCP Integration Agents            :p3b, after p3a, 2w
    
    section Phase 4: Production
    Security Audit                    :p4a, after p3b, 1w
    Performance Tuning                :p4b, after p4a, 1w
    Documentation                     :p4c, after p4b, 1w
    Go-Live                          :p4d, after p4c, 1w
```

### 6.2 Dependency Graph

```mermaid
flowchart LR
    subgraph P0["Phase 0: Registry"]
        P0A["agent_registry<br/>table"]
        P0B["binding<br/>tables"]
        P0C["UnifiedRegistry<br/>Loader"]
        P0D["Claude SDK<br/>Templates"]
    end
    
    subgraph P1["Phase 1: Foundation"]
        P1A["Tier 1<br/>Schema"]
        P1B["RLS<br/>Policies"]
        P1C["VSOM<br/>Ontology"]
    end
    
    subgraph P2["Phase 2: Domains"]
        P2A["BAIV<br/>Agents"]
        P2B["W4M<br/>Agents"]
        P2C["AIR<br/>Agents"]
    end
    
    subgraph P3["Phase 3: Tenants"]
        P3A["Tier 3<br/>Templates"]
        P3B["MCP<br/>Integration"]
    end
    
    subgraph P4["Phase 4: Production"]
        P4A["Security"]
        P4B["Performance"]
        P4C["Go-Live"]
    end
    
    P0A --> P0B --> P0C --> P0D
    P0D --> P1A --> P1B --> P1C
    P1C --> P2A --> P2B --> P2C
    P2C --> P3A --> P3B
    P3B --> P4A --> P4B --> P4C
    
    style P0 fill:#e3f2fd
    style P1 fill:#e8f5e9
    style P2 fill:#fff3e0
    style P3 fill:#f3e5f5
    style P4 fill:#ffebee
```

---

## 7. Key Integration Points

### 7.1 OntologyLoader → UnifiedRegistryLoader

```mermaid
flowchart TB
    subgraph EXISTING["Existing Code"]
        OL["OntologyLoader"]
        ON["OntologyNavigator"]
        FILES["JSON-LD Files<br/>ontologies/*.json"]
    end
    
    subgraph EXTENDED["Extended Code"]
        URL["UnifiedRegistryLoader"]
        CACHE["Agent Cache"]
        BIND["Binding Resolver"]
    end
    
    subgraph SUPABASE["Supabase"]
        AR["agent_registry"]
        AOB["agent_ontology_bindings"]
        ONT["ontologies"]
    end
    
    FILES --> OL
    OL --> ON
    
    OL --> URL
    AR --> URL
    URL --> CACHE
    URL --> BIND
    
    BIND --> AOB
    AOB --> ONT
    
    style EXISTING fill:#e8f5e9
    style EXTENDED fill:#e3f2fd
    style SUPABASE fill:#fff3e0
```

### 7.2 Agent Instantiation

```mermaid
flowchart LR
    subgraph INPUT
        ID["agent_id"]
        TENANT["tenant_context"]
    end
    
    subgraph LOADER["UnifiedRegistryLoader"]
        GET["get_agent()"]
        RESOLVE["resolve_bindings()"]
    end
    
    subgraph FACTORY["AgentFactory"]
        SELECT["select_template()"]
        INJECT["inject_ontology_context()"]
        BUILD["build_system_prompt()"]
    end
    
    subgraph OUTPUT
        AGENT["Ready Agent Instance"]
    end
    
    ID --> GET
    GET --> RESOLVE
    RESOLVE --> SELECT
    TENANT --> SELECT
    SELECT --> INJECT
    INJECT --> BUILD
    BUILD --> AGENT
```

---

*© 2025 Platform Foundation Core Holdings. All rights reserved.*
