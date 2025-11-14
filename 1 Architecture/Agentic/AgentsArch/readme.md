#Agents Architecture Overview
##Agents -Orchestrators
##Agents
##Sub Agents
##Skills
##Tools

mermaid

graph LR
    subgraph "AGENT (e.g., Claude)" direction TB
        REASON[Reasoning Engine]
        PLAN[Planning System]
        MEMORY[Context Memory]
    end
    
    subgraph "SUB-AGENT (e.g., OAA)"
        direction TB
        DOMAIN[Domain Expertise]
        WORKFLOW[Workflow Logic]
        HANDOFF[Handoff Protocol]
    end
    
    subgraph "SKILL (e.g., OKR-Alignment)"
        direction TB
        PATTERNS[Best Practices]
        TEMPLATES[Output Templates]
        REFERENCES[Knowledge Refs]
    end
    
    subgraph "TOOL (e.g., bash_tool)"
        direction TB
        EXECUTE[Execute Command]
        RETURN[Return Result]
    end
    
    REASON -->|"decides to use"| DOMAIN
    DOMAIN -->|"loads knowledge from"| PATTERNS
    PATTERNS -->|"may suggest using"| EXECUTE
    EXECUTE -->|"returns data to"| REASON
    
    style REASON fill:#1565C0,color:#fff
    style DOMAIN fill:#1976D2,color:#fff
    style PATTERNS fill:#4CAF50,color:#fff
    style EXECUTE fill:#FF9800,color:#fff
