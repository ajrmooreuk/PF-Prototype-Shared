#Agents Architecture Overview
##Agents -Orchestrators
##Agents
##Sub Agents
##Skills
##Tools
ComponentDefinitionCharacteristicsExamplesTOOLAtomic capability that performs a specific action- No reasoning<br/>- Deterministic<br/>- Single function<br/>- Input → Output<br/>- Statelessweb_search, file_read, bash_tool, str_replace, API callsSKILLDomain knowledge package that guides behavior- Procedural knowledge<br/>- Best practices<br/>- Context patterns<br/>- Progressive disclosure<br/>- No execution logicOKR Alignment, DOCX creation, PDF processing, Brand GuidelinesSUB-AGENTSpecialized autonomous worker for specific domain- Limited autonomy<br/>- Domain-focused<br/>- Delegated tasks<br/>- Reports to parent<br/>- Uses skills + toolsProcess Engineer Agent, Campaign Manager Agent, PMF Validator AgentAGENTPrimary autonomous reasoner with full orchestration- Full reasoning<br/>- Goal-oriented<br/>- Multi-step planning<br/>- Orchestrates sub-agents<br/>- Selects skills + toolsClaude (main), OAA (Ontology Architect Agent), Strategic Advisor Agent
Relationship Matrix
mermaidgraph LR
    subgraph "AGENT (e.g., Claude)"
        direction TB
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
