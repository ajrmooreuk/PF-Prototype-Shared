# PF-CORE CI/CD Agent Architecture

## System Overview

The PF-CORE CI/CD Automation Agent is a multi-layered system that combines AI-powered orchestration with infrastructure automation to provision and manage platform deployments.

```mermaid
graph TB
    subgraph UserLayer["🎯 User Layer"]
        CLI["CLI Interface<br/>(pf-cicd chat)"]
        SDK["Python SDK<br/>(CICDOrchestrator)"]
        API["REST API<br/>(Future)"]
    end

    subgraph AgentLayer["🤖 Agent Layer"]
        direction TB
        Claude["Claude AI<br/>(Reasoning Engine)"]
        Orch["Orchestrator<br/>(Tool Coordination)"]
        Conv["Conversation Handler<br/>(State Management)"]
        Audit["Audit Service<br/>(Compliance Logging)"]
    end

    subgraph ToolLayer["🔧 Tool Layer"]
        direction TB
        TR["Tool Registry"]

        subgraph GitHubTools["GitHub Tools"]
            GH1["create_repo"]
            GH2["branch_protection"]
            GH3["create_environment"]
            GH4["set_secret"]
            GH5["create_workflow"]
        end

        subgraph DOTools["Digital Ocean Tools"]
            DO1["create_droplet"]
            DO2["configure_firewall"]
            DO3["bootstrap_droplet"]
            DO4["create_dns_record"]
        end
    end

    subgraph ConfigLayer["⚙️ Configuration Layer"]
        direction LR
        Schema["JSON Schemas"]
        Inherit["Inheritance Engine"]
        Valid["Validator"]
        Tmpl["Template Engine"]
    end

    subgraph CloudLayer["☁️ Cloud Platforms"]
        GitHub["GitHub<br/>(Repos, Actions, Secrets)"]
        DO["Digital Ocean<br/>(Droplets, Firewalls, DNS)"]
        Supa["Supabase<br/>(Database, Auth, Audit)"]
    end

    CLI --> Orch
    SDK --> Orch
    API --> Orch

    Orch <--> Claude
    Orch --> Conv
    Orch --> Audit
    Orch --> TR

    TR --> GitHubTools
    TR --> DOTools

    GitHubTools --> GitHub
    DOTools --> DO
    Audit --> Supa

    ConfigLayer --> Orch
    Tmpl --> GitHubTools
    Tmpl --> DOTools
```

## Component Architecture

### 1. Agent Layer

The agent layer is the brain of the system, powered by Claude AI.

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Orchestrator
    participant Claude
    participant ToolRegistry
    participant Tool
    participant Platform

    User->>CLI: "Create a new repo called air-ep"
    CLI->>Orchestrator: chat(message)
    Orchestrator->>Claude: Request with tools
    Claude->>Orchestrator: tool_use: create_repo
    Orchestrator->>ToolRegistry: execute("create_repo", params)
    ToolRegistry->>Tool: run(**params)
    Tool->>Platform: API Call
    Platform-->>Tool: Response
    Tool-->>ToolRegistry: ToolResult
    ToolRegistry-->>Orchestrator: Result
    Orchestrator->>Claude: Tool result
    Claude-->>Orchestrator: Final response
    Orchestrator-->>CLI: "Repository created successfully"
    CLI-->>User: Display response
```

#### Orchestrator (`agents/orchestrator.py`)

The central coordinator that:
- Manages Claude conversations
- Routes tool calls to the registry
- Handles multi-step operations
- Reports progress to users

```python
class CICDOrchestrator:
    """Primary orchestration agent."""

    def __init__(self, settings, audit_service, tool_registry):
        self._client = Anthropic(api_key=settings.anthropic_api_key)
        self.tools = tool_registry
        self.audit_service = audit_service

    def chat(self, user_message: str) -> str:
        """Process user message through Claude."""
        response = self._client.messages.create(
            model=self.settings.agent_model,
            system=SYSTEM_PROMPT,
            tools=self.tools.get_definitions(),
            messages=self._messages
        )
        return self._process_response(response)
```

#### Conversation Handler (`agents/conversation.py`)

Manages conversation state across multi-turn interactions:
- Message history
- Context tracking
- Operation state
- Confirmation handling

### 2. Tool Layer

Tools are the hands of the agent - they perform actual operations.

```mermaid
classDiagram
    class BaseTool {
        <<abstract>>
        +name: str
        +description: str
        +category: str
        +get_input_schema() dict
        +execute(**kwargs) ToolResult
        +run(**kwargs) ToolResult
    }

    class ToolResult {
        +status: ToolStatus
        +message: str
        +data: Any
        +error: str
        +duration_ms: int
        +success() ToolResult
        +error() ToolResult
    }

    class ToolRegistry {
        -_tools: dict
        +register(tool_class)
        +execute(name, **kwargs) ToolResult
        +get_definitions() list
    }

    class CreateRepoTool {
        +name = "create_repo"
        +execute(**kwargs) ToolResult
    }

    class CreateDropletTool {
        +name = "create_droplet"
        +execute(**kwargs) ToolResult
    }

    BaseTool <|-- CreateRepoTool
    BaseTool <|-- CreateDropletTool
    ToolRegistry o-- BaseTool
    BaseTool ..> ToolResult
```

#### Tool Definition Format

Tools are exposed to Claude in a standardized format:

```json
{
  "name": "create_repo",
  "description": "Create a new GitHub repository in the organization",
  "input_schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Repository name"
      },
      "description": {
        "type": "string",
        "description": "Repository description"
      },
      "private": {
        "type": "boolean",
        "default": true
      }
    },
    "required": ["name"]
  }
}
```

### 3. Configuration Layer

The configuration system supports 4-level inheritance for multi-tenant deployments.

```mermaid
graph TB
    subgraph Hierarchy["Configuration Hierarchy"]
        PFCore["PF-CORE Base<br/>━━━━━━━━━━━<br/>• Default settings<br/>• Platform standards<br/>• Base design tokens"]

        Instance["Instance (AIR/BAIV/W4M)<br/>━━━━━━━━━━━━━━━━━━<br/>• Brand tokens<br/>• Instance overrides<br/>• Admin contacts"]

        Product["Product (EP/VHF/WWG)<br/>━━━━━━━━━━━━━━━━<br/>• Product features<br/>• API config<br/>• DB extensions"]

        WhiteLabel["White-Label<br/>━━━━━━━━━━<br/>• Custom domain<br/>• Full rebrand<br/>• Usage limits"]
    end

    PFCore -->|extends| Instance
    Instance -->|extends| Product
    Product -->|extends| WhiteLabel

    subgraph Resolution["Inheritance Resolution"]
        Merge["Deep Merge<br/>Override Detection"]
    end

    Hierarchy --> Merge
```

#### Inheritance Engine

The inheritance engine performs deep merging with override tracking:

```python
class InheritanceEngine:
    def resolve_inheritance(self, config_id: str) -> tuple[dict, list[str]]:
        """Resolve full inheritance chain."""
        chain = self._build_inheritance_chain(config_id)
        resolved = {}
        overrides = []

        for chain_id in chain:
            config = self.get_config(chain_id)
            resolved, new_overrides = self.deep_merge(resolved, config)
            overrides.extend(new_overrides)

        return resolved, overrides
```

### 4. Template Layer

Templates generate configuration and infrastructure files using Jinja2.

```mermaid
graph LR
    subgraph Templates["Template Types"]
        Base["Base Config<br/>pf-core.config.yaml"]
        Workflow["Workflows<br/>ci.yml, deploy.yml"]
        Infra["Infrastructure<br/>bootstrap.sh, nginx.conf"]
        DB["Database<br/>migrations/*.sql"]
    end

    subgraph Engine["Template Engine"]
        Jinja["Jinja2 Renderer"]
        Filters["Custom Filters<br/>to_slug, to_pascal"]
        Context["Context Builder"]
    end

    subgraph Output["Generated Files"]
        YAML["YAML Configs"]
        Scripts["Shell Scripts"]
        SQL["SQL Migrations"]
    end

    Templates --> Jinja
    Context --> Jinja
    Filters --> Jinja
    Jinja --> Output
```

### 5. Audit Layer

Every action is logged for compliance and debugging.

```mermaid
erDiagram
    AUDIT_EVENT {
        uuid event_id PK
        string event_type
        timestamp timestamp
        uuid session_id FK
        string actor_type
        string actor_id
        string target_type
        string target_id
        string action
        json input_data
        json output_data
        boolean success
        string error_message
        int duration_ms
    }

    SESSION {
        uuid session_id PK
        timestamp started_at
        timestamp ended_at
        int total_events
        float success_rate
    }

    SESSION ||--o{ AUDIT_EVENT : contains
```

## Data Flow

### Provisioning Workflow

```mermaid
sequenceDiagram
    participant User
    participant Agent
    participant Config
    participant GitHub
    participant DO
    participant Supabase

    User->>Agent: "Provision AIR-EP for production"

    Agent->>Config: Load AIR instance config
    Config-->>Agent: Merged configuration

    Agent->>GitHub: create_repo("air-ep")
    GitHub-->>Agent: Repository created

    Agent->>GitHub: configure_branch_protection("main")
    GitHub-->>Agent: Protection configured

    Agent->>GitHub: create_environment("production")
    GitHub-->>Agent: Environment created

    Agent->>GitHub: set_secret("SUPABASE_URL")
    GitHub-->>Agent: Secret set

    Agent->>DO: create_droplet("air-ep-prod")
    DO-->>Agent: Droplet IP: 1.2.3.4

    Agent->>DO: configure_firewall(rules)
    DO-->>Agent: Firewall configured

    Agent->>DO: bootstrap_droplet(script)
    DO-->>Agent: Bootstrap complete

    Agent->>DO: create_dns_record("air-ep.com", "1.2.3.4")
    DO-->>Agent: DNS configured

    Agent->>GitHub: create_workflow("deploy-prod.yml")
    GitHub-->>Agent: Workflow created

    Agent->>Supabase: Log audit trail
    Supabase-->>Agent: Logged

    Agent-->>User: "AIR-EP production environment ready!"
```

## Security Architecture

```mermaid
graph TB
    subgraph Secrets["Secret Management"]
        EnvVars["Environment Variables"]
        GHSecrets["GitHub Secrets"]
        DOKeys["DO SSH Keys"]
    end

    subgraph Access["Access Control"]
        APIKeys["API Key Validation"]
        RBAC["Role-Based Access"]
        AuditLog["Audit Logging"]
    end

    subgraph Network["Network Security"]
        Firewall["Cloud Firewall"]
        SSL["SSL/TLS"]
        VPN["VPN (Future)"]
    end

    EnvVars --> APIKeys
    GHSecrets --> RBAC
    DOKeys --> Network
    APIKeys --> AuditLog
    RBAC --> AuditLog
```

### Security Best Practices

1. **Secrets never logged**: Audit decorators redact sensitive fields
2. **Minimal permissions**: Tools request only needed scopes
3. **Firewall by default**: All droplets get firewall rules
4. **SSL everywhere**: Nginx templates include SSL configuration
5. **Audit trail**: Every action logged to Supabase

## Extensibility

### Adding a New Tool

```python
from pf_cicd_agent.tools.base import BaseTool, ToolResult

class MyNewTool(BaseTool):
    name = "my_new_tool"
    description = "Does something useful"
    category = "custom"

    def get_input_schema(self) -> dict:
        return {
            "type": "object",
            "properties": {
                "param1": {"type": "string", "description": "First param"}
            },
            "required": ["param1"]
        }

    def execute(self, param1: str) -> ToolResult:
        # Implementation
        return ToolResult.success(data={"result": "done"})

# Register the tool
registry.register(MyNewTool)
```

### Adding a New Template

1. Create template file in `templates/` directory
2. Use Jinja2 syntax with available context variables
3. Load via `TemplateEngine.render()`

```jinja2
# templates/custom/my-template.yaml.template
name: {{ product_name }}
instance: {{ instance_id }}
environment: {{ environment }}

settings:
  feature_enabled: {{ features.my_feature | default(false) }}
```

## Performance Considerations

| Component | Optimization |
|-----------|--------------|
| Tool Execution | Parallel tool calls where possible |
| API Calls | Connection pooling, retry with backoff |
| Templates | Jinja2 template caching |
| Config | Cached inheritance resolution |
| Audit | Async logging (future) |

## Monitoring & Observability

```mermaid
graph LR
    Agent["CI/CD Agent"]

    subgraph Logging["Logging"]
        Struct["Structlog"]
        Audit["Audit Service"]
    end

    subgraph Metrics["Metrics (Future)"]
        Prom["Prometheus"]
        Graf["Grafana"]
    end

    subgraph Alerts["Alerts (Future)"]
        PD["PagerDuty"]
        Slack["Slack"]
    end

    Agent --> Struct
    Agent --> Audit
    Struct --> Metrics
    Audit --> Metrics
    Metrics --> Alerts
```

---

*Document Version: 1.0.0 | Last Updated: December 2025*
