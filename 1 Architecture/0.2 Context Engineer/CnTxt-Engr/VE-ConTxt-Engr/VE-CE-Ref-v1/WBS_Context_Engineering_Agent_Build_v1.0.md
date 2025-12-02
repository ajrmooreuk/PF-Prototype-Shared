# Work Breakdown Structure (WBS)

## Context Engineering Agent Build

**Automated Build Framework for Claude Agent SDK Implementation**

---

### Document Controls

| Attribute | Value |
|-----------|-------|
| Document ID | **WBS-PF-CORE-CE-BUILD-001** |
| Document Title | Context Engineering Agent Build WBS |
| Document Type | **WBS** (Work Breakdown Structure) |
| Document Version | **1.0.0** |
| Version Date | 01 December 2025 |
| Status | DRAFT |
| Platform | **PF-CORE** (Platform Foundation Core) |
| SDK Framework | **Claude Agent SDK** (Anthropic) |
| Parent Documents | PBS-PF-CORE-CE-001 v1.0, PRD-PF-CORE-CEA-001 v1.0 |
| Automation Target | **≥80%** automated build coverage |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| **1.0.0** | **01 Dec 2025** | **PF-CORE Architecture** | **Initial WBS; Agent build templates; SDK configurations; Automated build scripts; Test specifications; CI/CD pipeline definitions** |

---

## Executive Summary

This Work Breakdown Structure defines the complete breakdown of work packages required to build, test, and deploy the Context Engineering agent ecosystem using automated processes wherever possible. The WBS is designed to maximize automation through:

1. **Configuration-Driven Build** — Agents defined via JSON/YAML configurations
2. **Template-Based Generation** — System prompts and tools from reusable templates
3. **Automated Testing** — TDD with automated test generation
4. **CI/CD Integration** — Automated deployment pipelines

**Target:** Build 24 agents with ≥80% automation coverage, reducing manual implementation effort by 70%.

---

## 1. WBS Structure Overview

### 1.1 Complete Work Breakdown Hierarchy

```mermaid
flowchart TB
    subgraph L0["LEVEL 0: PROJECT"]
        PROJ["WBS-CE-000<br/>━━━━━━━━━━━━━━━<br/>CONTEXT ENGINEERING<br/>AGENT BUILD"]
    end
    
    L0 --> L1
    
    subgraph L1["LEVEL 1: PHASES"]
        direction LR
        P1["WBS-CE-100<br/>Infrastructure<br/>Setup"]
        P2["WBS-CE-200<br/>Core Agent<br/>Build"]
        P3["WBS-CE-300<br/>Enhancement<br/>Layer Build"]
        P4["WBS-CE-400<br/>Orchestration<br/>Build"]
        P5["WBS-CE-500<br/>Integration<br/>& Testing"]
        P6["WBS-CE-600<br/>Deployment<br/>& Operations"]
    end
    
    L1 --> L2
    
    subgraph L2["LEVEL 2: WORK PACKAGES"]
        direction TB
        WP1["Infrastructure Work Packages"]
        WP2["Agent Build Work Packages"]
        WP3["Test Work Packages"]
        WP4["Deploy Work Packages"]
    end
    
    L2 --> L3
    
    subgraph L3["LEVEL 3: TASKS"]
        direction LR
        T1["Individual<br/>Build Tasks"]
        T2["Automation<br/>Scripts"]
        T3["Test<br/>Cases"]
    end
    
    style L0 fill:#1e3a5f,stroke:#2c5282,color:#fff
    style L1 fill:#2b6cb0,stroke:#3182ce,color:#fff
    style L2 fill:#38a169,stroke:#48bb78,color:#fff
    style L3 fill:#805ad5,stroke:#9f7aea,color:#fff
```

### 1.2 WBS Dictionary

| WBS Code | Element | Level | Type | Automation |
|----------|---------|-------|------|------------|
| **WBS-CE-000** | Context Engineering Agent Build | 0 | Project | — |
| **WBS-CE-100** | Infrastructure Setup | 1 | Phase | High |
| **WBS-CE-110** | Build Environment Setup | 2 | Work Package | High |
| **WBS-CE-120** | SDK Configuration | 2 | Work Package | High |
| **WBS-CE-130** | Database Schema Deployment | 2 | Work Package | High |
| **WBS-CE-140** | Tool Registry Setup | 2 | Work Package | High |
| **WBS-CE-200** | Core Agent Build | 1 | Phase | High |
| **WBS-CE-210** | Discovery Cluster Build | 2 | Work Package | High |
| **WBS-CE-220** | Assembly Cluster Build | 2 | Work Package | High |
| **WBS-CE-230** | Lifecycle Cluster Build | 2 | Work Package | High |
| **WBS-CE-240** | Optimization Cluster Build | 2 | Work Package | High |
| **WBS-CE-300** | Enhancement Layer Build | 1 | Phase | Medium |
| **WBS-CE-310** | BAIV Enhancement Build | 2 | Work Package | High |
| **WBS-CE-320** | W4M Enhancement Build | 2 | Work Package | High |
| **WBS-CE-330** | AIR Enhancement Build | 2 | Work Package | High |
| **WBS-CE-340** | DJM Enhancement Build | 2 | Work Package | High |
| **WBS-CE-400** | Orchestration Build | 1 | Phase | Medium |
| **WBS-CE-410** | Agent Manager Build | 2 | Work Package | Medium |
| **WBS-CE-420** | Lifecycle Controller Build | 2 | Work Package | High |
| **WBS-CE-430** | Inter-Agent Comm Build | 2 | Work Package | High |
| **WBS-CE-500** | Integration & Testing | 1 | Phase | High |
| **WBS-CE-510** | Unit Testing | 2 | Work Package | High |
| **WBS-CE-520** | Integration Testing | 2 | Work Package | High |
| **WBS-CE-530** | Performance Testing | 2 | Work Package | Medium |
| **WBS-CE-600** | Deployment & Operations | 1 | Phase | High |
| **WBS-CE-610** | CI/CD Pipeline Setup | 2 | Work Package | High |
| **WBS-CE-620** | Production Deployment | 2 | Work Package | High |
| **WBS-CE-630** | Monitoring Setup | 2 | Work Package | High |

---

## 2. Phase 1: Infrastructure Setup (WBS-CE-100)

### 2.1 Build Environment Setup (WBS-CE-110)

#### 2.1.1 Project Structure

```
context-engineering/
├── agents/
│   ├── core/
│   │   ├── discovery/
│   │   ├── assembly/
│   │   ├── lifecycle/
│   │   └── optimization/
│   ├── enhancement/
│   │   ├── baiv/
│   │   ├── w4m/
│   │   ├── air/
│   │   └── djm/
│   └── orchestration/
├── config/
│   ├── agents/
│   │   ├── core/
│   │   └── enhancement/
│   ├── tools/
│   └── prompts/
├── tools/
│   ├── discovery/
│   ├── assembly/
│   ├── lifecycle/
│   └── shared/
├── templates/
│   ├── agent_template.py
│   ├── tool_template.py
│   └── test_template.py
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── scripts/
│   ├── build/
│   ├── deploy/
│   └── test/
├── migrations/
└── docs/
```

#### 2.1.2 Environment Configuration

```yaml
# config/environment.yaml
environment:
  name: "context-engineering"
  version: "1.0.0"
  
claude_sdk:
  default_model: "claude-sonnet-4-20250514"
  fallback_model: "claude-haiku-3-5-20241022"
  api_version: "2024-01"
  
  features:
    context_awareness:
      enabled: true
      budget_tracking: true
      tool_result_updates: true
    extended_thinking:
      enabled: true
      budget_tokens: 10000
      preserve_in_tool_use: true
    prompt_caching:
      enabled: true
      cache_prefix_tokens: 1024
      ttl_seconds: 300

database:
  provider: "supabase"
  schema: "context_engineering"
  pool_size: 20
  
logging:
  level: "INFO"
  format: "json"
  
metrics:
  enabled: true
  provider: "prometheus"
  
feature_flags:
  enable_caching: true
  enable_learning: true
  enable_cross_instance: true
```

---

### 2.2 SDK Configuration (WBS-CE-120)

#### 2.2.1 Base Agent Configuration Schema

```python
# config/schemas/agent_config_schema.py
"""
Agent Configuration Schema for Automated Build
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class AgentLayer(str, Enum):
    ORCHESTRATION = "orchestration"
    CORE = "core"
    ENHANCEMENT = "enhancement"

class AgentCluster(str, Enum):
    DISCOVERY = "discovery"
    ASSEMBLY = "assembly"
    LIFECYCLE = "lifecycle"
    OPTIMIZATION = "optimization"

class InstanceScope(str, Enum):
    BAIV = "BAIV"
    W4M = "W4M"
    AIR = "AIR"
    DJM = "DJM"
    ALL = "ALL"

class ToolDefinition(BaseModel):
    """Tool definition for agent"""
    tool_id: str
    tool_name: str
    description: str
    parameters: Dict[str, Any]
    required_params: List[str] = []
    returns: Dict[str, Any]

class ContextAwarenessConfig(BaseModel):
    """Context awareness configuration"""
    enabled: bool = True
    budget_tracking: bool = True
    tool_result_updates: bool = True

class ExtendedThinkingConfig(BaseModel):
    """Extended thinking configuration"""
    enabled: bool = True
    budget_tokens: int = 10000
    preserve_in_tool_use: bool = True

class PromptCachingConfig(BaseModel):
    """Prompt caching configuration"""
    enabled: bool = True
    cache_prefix_tokens: int = 1024
    ttl_seconds: int = 300

class AgentConfig(BaseModel):
    """Complete agent configuration for automated build"""
    
    # Identity
    agent_id: str = Field(..., pattern=r"^AG-[A-Z]+-[A-Z]+-\d{3}$")
    agent_name: str
    agent_slug: str = Field(..., pattern=r"^[a-z0-9-]+$")
    version: str = "1.0.0"
    
    # Classification
    layer: AgentLayer
    cluster: Optional[AgentCluster] = None
    instance_scope: Optional[InstanceScope] = None
    extends_agent_id: Optional[str] = None
    
    # Model Configuration
    model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 4096
    temperature: float = 0.2
    
    # SDK Features
    context_awareness: ContextAwarenessConfig = ContextAwarenessConfig()
    extended_thinking: ExtendedThinkingConfig = ExtendedThinkingConfig()
    prompt_caching: PromptCachingConfig = PromptCachingConfig()
    
    # System Prompt
    system_prompt_template: str
    system_prompt_variables: Dict[str, Any] = {}
    
    # Tools
    tools: List[ToolDefinition] = []
    
    # Ontology References
    ontology_refs: List[str] = []
    
    # Input/Output Schemas
    input_schema: Dict[str, Any]
    output_schema: Dict[str, Any]
    
    # Metadata
    description: str
    owner: str
    tags: List[str] = []
    
    class Config:
        use_enum_values = True
```

#### 2.2.2 Agent Builder Class

```python
# agents/builder/agent_builder.py
"""
Automated Agent Builder using Claude Agent SDK
"""

import json
import yaml
from pathlib import Path
from typing import Optional, Dict, Any, List
from dataclasses import dataclass, field

from anthropic import Anthropic
from config.schemas.agent_config_schema import AgentConfig, ToolDefinition


@dataclass
class AgentBuildResult:
    """Result of agent build process"""
    agent_id: str
    success: bool
    agent_instance: Optional[Any] = None
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    build_time_ms: int = 0


class AgentBuilder:
    """
    Automated agent builder using Claude Agent SDK.
    
    Features:
    - Configuration-driven agent creation
    - Template-based system prompts
    - Automated tool registration
    - Validation and testing hooks
    """
    
    def __init__(
        self,
        config_dir: Path,
        template_dir: Path,
        api_key: Optional[str] = None
    ):
        self.config_dir = config_dir
        self.template_dir = template_dir
        self.client = Anthropic(api_key=api_key)
        self._tool_registry: Dict[str, ToolDefinition] = {}
        self._prompt_templates: Dict[str, str] = {}
        self._built_agents: Dict[str, Any] = {}
        
    def load_tool_registry(self, registry_path: Path) -> None:
        """Load tool definitions from registry"""
        with open(registry_path) as f:
            registry = yaml.safe_load(f)
            for tool_def in registry.get('tools', []):
                tool = ToolDefinition(**tool_def)
                self._tool_registry[tool.tool_id] = tool
                
    def load_prompt_templates(self) -> None:
        """Load system prompt templates"""
        for template_file in self.template_dir.glob('*.txt'):
            template_name = template_file.stem
            self._prompt_templates[template_name] = template_file.read_text()
            
    def build_agent(self, config: AgentConfig) -> AgentBuildResult:
        """
        Build a single agent from configuration.
        
        Args:
            config: Agent configuration
            
        Returns:
            AgentBuildResult with built agent or errors
        """
        import time
        start_time = time.time()
        errors = []
        warnings = []
        
        try:
            # Step 1: Validate configuration
            validation_errors = self._validate_config(config)
            if validation_errors:
                return AgentBuildResult(
                    agent_id=config.agent_id,
                    success=False,
                    errors=validation_errors
                )
            
            # Step 2: Resolve system prompt
            system_prompt = self._resolve_system_prompt(config)
            
            # Step 3: Build tool definitions
            tools = self._build_tools(config)
            
            # Step 4: Create agent instance
            agent = self._create_agent_instance(
                config=config,
                system_prompt=system_prompt,
                tools=tools
            )
            
            # Step 5: Register agent
            self._built_agents[config.agent_id] = agent
            
            build_time = int((time.time() - start_time) * 1000)
            
            return AgentBuildResult(
                agent_id=config.agent_id,
                success=True,
                agent_instance=agent,
                warnings=warnings,
                build_time_ms=build_time
            )
            
        except Exception as e:
            return AgentBuildResult(
                agent_id=config.agent_id,
                success=False,
                errors=[str(e)]
            )
    
    def build_all_from_directory(self, config_subdir: str) -> List[AgentBuildResult]:
        """Build all agents from configuration directory"""
        results = []
        config_path = self.config_dir / config_subdir
        
        for config_file in config_path.glob('**/*.yaml'):
            with open(config_file) as f:
                config_data = yaml.safe_load(f)
                config = AgentConfig(**config_data)
                result = self.build_agent(config)
                results.append(result)
                
        return results
    
    def _validate_config(self, config: AgentConfig) -> List[str]:
        """Validate agent configuration"""
        errors = []
        
        # Check tool references exist
        for tool in config.tools:
            if tool.tool_id not in self._tool_registry:
                errors.append(f"Tool not found in registry: {tool.tool_id}")
        
        # Check extends reference exists
        if config.extends_agent_id:
            if config.extends_agent_id not in self._built_agents:
                errors.append(f"Parent agent not built: {config.extends_agent_id}")
        
        # Check prompt template exists
        template_name = config.system_prompt_template
        if template_name not in self._prompt_templates:
            if not template_name.startswith("inline:"):
                errors.append(f"Prompt template not found: {template_name}")
        
        return errors
    
    def _resolve_system_prompt(self, config: AgentConfig) -> str:
        """Resolve system prompt from template"""
        template_name = config.system_prompt_template
        
        if template_name.startswith("inline:"):
            # Inline prompt provided
            template = template_name[7:]
        else:
            template = self._prompt_templates.get(template_name, "")
        
        # Substitute variables
        for key, value in config.system_prompt_variables.items():
            template = template.replace(f"{{{{{key}}}}}", str(value))
        
        return template
    
    def _build_tools(self, config: AgentConfig) -> List[Dict[str, Any]]:
        """Build Claude SDK tool definitions"""
        tools = []
        
        for tool_def in config.tools:
            tool = {
                "name": tool_def.tool_name,
                "description": tool_def.description,
                "input_schema": {
                    "type": "object",
                    "properties": tool_def.parameters,
                    "required": tool_def.required_params
                }
            }
            tools.append(tool)
        
        return tools
    
    def _create_agent_instance(
        self,
        config: AgentConfig,
        system_prompt: str,
        tools: List[Dict[str, Any]]
    ) -> 'ContextEngineeringAgent':
        """Create the agent instance"""
        return ContextEngineeringAgent(
            agent_id=config.agent_id,
            client=self.client,
            model=config.model,
            max_tokens=config.max_tokens,
            temperature=config.temperature,
            system_prompt=system_prompt,
            tools=tools,
            context_awareness=config.context_awareness.model_dump(),
            extended_thinking=config.extended_thinking.model_dump(),
            prompt_caching=config.prompt_caching.model_dump(),
            input_schema=config.input_schema,
            output_schema=config.output_schema
        )


class ContextEngineeringAgent:
    """
    Base Context Engineering Agent implementation.
    
    Uses Claude Agent SDK with full feature support.
    """
    
    def __init__(
        self,
        agent_id: str,
        client: Anthropic,
        model: str,
        max_tokens: int,
        temperature: float,
        system_prompt: str,
        tools: List[Dict[str, Any]],
        context_awareness: Dict[str, Any],
        extended_thinking: Dict[str, Any],
        prompt_caching: Dict[str, Any],
        input_schema: Dict[str, Any],
        output_schema: Dict[str, Any]
    ):
        self.agent_id = agent_id
        self.client = client
        self.model = model
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.system_prompt = system_prompt
        self.tools = tools
        self.context_awareness = context_awareness
        self.extended_thinking = extended_thinking
        self.prompt_caching = prompt_caching
        self.input_schema = input_schema
        self.output_schema = output_schema
        
        # Runtime state
        self._execution_count = 0
        self._total_tokens = 0
        
    async def execute(
        self,
        input_data: Dict[str, Any],
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Execute the agent with given input.
        
        Args:
            input_data: Input matching input_schema
            context: Optional additional context
            
        Returns:
            Output matching output_schema
        """
        # Validate input
        self._validate_input(input_data)
        
        # Build messages
        messages = self._build_messages(input_data, context)
        
        # Call Claude API
        response = await self._call_claude(messages)
        
        # Process response
        output = self._process_response(response)
        
        # Validate output
        self._validate_output(output)
        
        return output
    
    def _validate_input(self, input_data: Dict[str, Any]) -> None:
        """Validate input against schema"""
        # JSON Schema validation would go here
        pass
    
    def _validate_output(self, output: Dict[str, Any]) -> None:
        """Validate output against schema"""
        # JSON Schema validation would go here
        pass
    
    def _build_messages(
        self,
        input_data: Dict[str, Any],
        context: Optional[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Build message array for Claude API"""
        user_content = json.dumps(input_data, indent=2)
        
        if context:
            user_content = f"Context:\n{json.dumps(context, indent=2)}\n\nInput:\n{user_content}"
        
        return [{"role": "user", "content": user_content}]
    
    async def _call_claude(self, messages: List[Dict[str, Any]]) -> Any:
        """Call Claude API with SDK features"""
        
        # Build API call parameters
        params = {
            "model": self.model,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
            "system": self.system_prompt,
            "messages": messages
        }
        
        # Add tools if defined
        if self.tools:
            params["tools"] = self.tools
        
        # Add extended thinking if enabled
        if self.extended_thinking.get("enabled"):
            params["thinking"] = {
                "type": "enabled",
                "budget_tokens": self.extended_thinking.get("budget_tokens", 10000)
            }
        
        # Make API call
        response = self.client.messages.create(**params)
        
        # Track usage
        self._execution_count += 1
        self._total_tokens += response.usage.input_tokens + response.usage.output_tokens
        
        return response
    
    def _process_response(self, response: Any) -> Dict[str, Any]:
        """Process Claude response into structured output"""
        # Extract text content
        text_content = ""
        for block in response.content:
            if hasattr(block, 'text'):
                text_content += block.text
        
        # Parse as JSON if possible
        try:
            return json.loads(text_content)
        except json.JSONDecodeError:
            return {"raw_response": text_content}
```

---

### 2.3 Tool Registry Setup (WBS-CE-140)

#### 2.3.1 Tool Registry Configuration

```yaml
# config/tools/tool_registry.yaml
tools:
  # ============================================================================
  # DISCOVERY TOOLS
  # ============================================================================
  
  - tool_id: "TOOL-DISC-001"
    tool_name: "ontology_registry_lookup"
    description: "Query OAA Registry for ontologies matching domain criteria"
    parameters:
      domain:
        type: "string"
        description: "Domain to search for"
      keywords:
        type: "array"
        items:
          type: "string"
        description: "Keywords to match"
      instance_scope:
        type: "string"
        enum: ["BAIV", "W4M", "AIR", "DJM", "ALL"]
        description: "Filter by instance scope"
      max_results:
        type: "integer"
        default: 10
        description: "Maximum results to return"
    required_params: ["domain"]
    returns:
      type: "array"
      items:
        type: "object"
        properties:
          ontology_id:
            type: "string"
          ontology_name:
            type: "string"
          relevance_score:
            type: "number"
            
  - tool_id: "TOOL-DISC-002"
    tool_name: "semantic_analyzer"
    description: "Extract semantic topics and entities from text"
    parameters:
      text:
        type: "string"
        description: "Text to analyze"
      extraction_types:
        type: "array"
        items:
          type: "string"
          enum: ["topics", "entities", "relationships", "concepts"]
        description: "Types of extraction to perform"
    required_params: ["text"]
    returns:
      type: "object"
      properties:
        topics:
          type: "array"
        entities:
          type: "array"
        relationships:
          type: "array"
          
  - tool_id: "TOOL-DISC-003"
    tool_name: "domain_relationship_mapper"
    description: "Map relationships between domains"
    parameters:
      source_domain:
        type: "string"
        description: "Source domain ID"
      max_depth:
        type: "integer"
        default: 3
        description: "Maximum relationship depth"
    required_params: ["source_domain"]
    returns:
      type: "object"
      properties:
        relationships:
          type: "array"
        graph:
          type: "object"
          
  - tool_id: "TOOL-DISC-004"
    tool_name: "coverage_estimator"
    description: "Estimate context coverage for a task"
    parameters:
      task_description:
        type: "string"
        description: "Task to estimate coverage for"
      available_ontologies:
        type: "array"
        items:
          type: "string"
        description: "List of available ontology IDs"
    required_params: ["task_description", "available_ontologies"]
    returns:
      type: "object"
      properties:
        coverage_percentage:
          type: "number"
        gaps:
          type: "array"
          
  # ============================================================================
  # GAP DETECTION TOOLS
  # ============================================================================
  
  - tool_id: "TOOL-GAP-001"
    tool_name: "context_validator"
    description: "Validate context completeness against requirements"
    parameters:
      context:
        type: "object"
        description: "Context to validate"
      requirements:
        type: "object"
        description: "Context requirements specification"
    required_params: ["context", "requirements"]
    returns:
      type: "object"
      properties:
        valid:
          type: "boolean"
        missing_elements:
          type: "array"
        validation_score:
          type: "number"
          
  - tool_id: "TOOL-GAP-002"
    tool_name: "freshness_checker"
    description: "Check context freshness against thresholds"
    parameters:
      context_elements:
        type: "array"
        description: "Context elements with timestamps"
      threshold_hours:
        type: "number"
        default: 24
        description: "Freshness threshold in hours"
    required_params: ["context_elements"]
    returns:
      type: "object"
      properties:
        fresh_count:
          type: "integer"
        stale_count:
          type: "integer"
        stale_elements:
          type: "array"
          
  - tool_id: "TOOL-GAP-003"
    tool_name: "consistency_analyzer"
    description: "Detect conflicting information in context"
    parameters:
      context:
        type: "object"
        description: "Context to analyze"
    required_params: ["context"]
    returns:
      type: "object"
      properties:
        consistent:
          type: "boolean"
        conflicts:
          type: "array"
          
  # ============================================================================
  # ASSEMBLY TOOLS
  # ============================================================================
  
  - tool_id: "TOOL-ASSM-001"
    tool_name: "context_merger"
    description: "Merge context from multiple sources"
    parameters:
      sources:
        type: "array"
        items:
          type: "object"
        description: "Context sources to merge"
      merge_strategy:
        type: "string"
        enum: ["union", "intersection", "priority"]
        default: "priority"
        description: "Strategy for handling conflicts"
    required_params: ["sources"]
    returns:
      type: "object"
      properties:
        merged_context:
          type: "object"
        source_count:
          type: "integer"
          
  - tool_id: "TOOL-ASSM-002"
    tool_name: "token_counter"
    description: "Count tokens in content"
    parameters:
      content:
        type: "string"
        description: "Content to count tokens for"
      model:
        type: "string"
        default: "claude-sonnet-4-20250514"
        description: "Model to use for tokenization"
    required_params: ["content"]
    returns:
      type: "object"
      properties:
        token_count:
          type: "integer"
        char_count:
          type: "integer"
          
  - tool_id: "TOOL-ASSM-003"
    tool_name: "priority_ranker"
    description: "Rank context elements by priority"
    parameters:
      elements:
        type: "array"
        description: "Elements to rank"
      ranking_criteria:
        type: "object"
        description: "Criteria for ranking"
    required_params: ["elements"]
    returns:
      type: "object"
      properties:
        ranked_elements:
          type: "array"
          
  - tool_id: "TOOL-ASSM-004"
    tool_name: "package_formatter"
    description: "Format context into standard package structure"
    parameters:
      context:
        type: "object"
        description: "Context to format"
      template:
        type: "string"
        enum: ["minimal", "standard", "comprehensive"]
        default: "standard"
        description: "Package template to use"
    required_params: ["context"]
    returns:
      type: "object"
      properties:
        package:
          type: "object"
        token_count:
          type: "integer"
          
  # ============================================================================
  # LIFECYCLE TOOLS
  # ============================================================================
  
  - tool_id: "TOOL-LIFE-001"
    tool_name: "cache_store"
    description: "Store context in cache"
    parameters:
      cache_key:
        type: "string"
        description: "Cache key"
      context:
        type: "object"
        description: "Context to cache"
      ttl_seconds:
        type: "integer"
        default: 3600
        description: "Time to live in seconds"
    required_params: ["cache_key", "context"]
    returns:
      type: "object"
      properties:
        stored:
          type: "boolean"
        expires_at:
          type: "string"
          
  - tool_id: "TOOL-LIFE-002"
    tool_name: "cache_retrieve"
    description: "Retrieve context from cache"
    parameters:
      cache_key:
        type: "string"
        description: "Cache key"
    required_params: ["cache_key"]
    returns:
      type: "object"
      properties:
        found:
          type: "boolean"
        context:
          type: "object"
        age_seconds:
          type: "integer"
          
  - tool_id: "TOOL-LIFE-003"
    tool_name: "cache_invalidate"
    description: "Invalidate cached context"
    parameters:
      cache_key:
        type: "string"
        description: "Cache key to invalidate"
      pattern:
        type: "string"
        description: "Pattern for bulk invalidation"
    required_params: []
    returns:
      type: "object"
      properties:
        invalidated_count:
          type: "integer"
          
  # ============================================================================
  # OPTIMIZATION TOOLS
  # ============================================================================
  
  - tool_id: "TOOL-OPT-001"
    tool_name: "semantic_compressor"
    description: "Compress context while preserving semantics"
    parameters:
      content:
        type: "string"
        description: "Content to compress"
      target_reduction:
        type: "number"
        default: 0.3
        description: "Target reduction ratio (0-1)"
    required_params: ["content"]
    returns:
      type: "object"
      properties:
        compressed_content:
          type: "string"
        original_tokens:
          type: "integer"
        compressed_tokens:
          type: "integer"
        semantic_preservation_score:
          type: "number"
          
  - tool_id: "TOOL-OPT-002"
    tool_name: "redundancy_detector"
    description: "Detect redundant information in context"
    parameters:
      context:
        type: "object"
        description: "Context to analyze"
    required_params: ["context"]
    returns:
      type: "object"
      properties:
        redundant_elements:
          type: "array"
        redundancy_score:
          type: "number"
```

---

## 3. Phase 2: Core Agent Build (WBS-CE-200)

### 3.1 Agent Configuration Templates

#### 3.1.1 Discovery Cluster Configurations

```yaml
# config/agents/core/discovery/domain_discovery.yaml
agent_id: "AG-CORE-DD-001"
agent_name: "Domain Discovery Agent"
agent_slug: "pf-core-domain-discovery"
version: "1.0.0"

# Classification
layer: "core"
cluster: "discovery"
instance_scope: null
extends_agent_id: null

# Model Configuration
model: "claude-sonnet-4-20250514"
max_tokens: 4096
temperature: 0.3

# SDK Features
context_awareness:
  enabled: true
  budget_tracking: true
  tool_result_updates: true

extended_thinking:
  enabled: true
  budget_tokens: 10000
  preserve_in_tool_use: true

prompt_caching:
  enabled: true
  cache_prefix_tokens: 1024
  ttl_seconds: 300

# System Prompt
system_prompt_template: "discovery_agent_base"
system_prompt_variables:
  agent_role: "Domain Discovery"
  primary_function: "identify relevant knowledge domains for agent tasks"
  output_format: "structured domain mapping with confidence scores"

# Tools
tools:
  - tool_id: "TOOL-DISC-001"
    tool_name: "ontology_registry_lookup"
    description: "Query OAA Registry for matching ontologies"
    parameters:
      domain:
        type: "string"
      keywords:
        type: "array"
      instance_scope:
        type: "string"
      max_results:
        type: "integer"
    required_params: ["domain"]
    returns:
      type: "array"
      
  - tool_id: "TOOL-DISC-002"
    tool_name: "semantic_analyzer"
    description: "Extract semantic topics from input"
    parameters:
      text:
        type: "string"
      extraction_types:
        type: "array"
    required_params: ["text"]
    returns:
      type: "object"
      
  - tool_id: "TOOL-DISC-003"
    tool_name: "domain_relationship_mapper"
    description: "Map cross-domain dependencies"
    parameters:
      source_domain:
        type: "string"
      max_depth:
        type: "integer"
    required_params: ["source_domain"]
    returns:
      type: "object"
      
  - tool_id: "TOOL-DISC-004"
    tool_name: "coverage_estimator"
    description: "Estimate context coverage percentage"
    parameters:
      task_description:
        type: "string"
      available_ontologies:
        type: "array"
    required_params: ["task_description", "available_ontologies"]
    returns:
      type: "object"

# Ontology References
ontology_refs:
  - "ONT-CTXE-0001"
  - "ONT-DOM-0001"

# Input Schema
input_schema:
  type: "object"
  properties:
    task_description:
      type: "string"
      description: "Natural language task description"
    instance_id:
      type: "string"
      enum: ["BAIV", "W4M", "AIR", "DJM"]
      description: "PF-Instance identifier"
    scope_hints:
      type: "array"
      items:
        type: "string"
      description: "Optional scope guidance"
    max_domains:
      type: "integer"
      default: 5
      description: "Maximum domains to return"
  required:
    - "task_description"

# Output Schema
output_schema:
  type: "object"
  properties:
    domains:
      type: "array"
      items:
        type: "object"
        properties:
          domain_id:
            type: "string"
          domain_name:
            type: "string"
          ontology_refs:
            type: "array"
          confidence:
            type: "number"
          relevance_score:
            type: "number"
          coverage_estimate:
            type: "number"
    cross_domain_relationships:
      type: "array"
    scope_boundaries:
      type: "object"
    metadata:
      type: "object"
  required:
    - "domains"

# Metadata
description: "Identifies and maps relevant knowledge domains for agent tasks"
owner: "Context Engineering Team"
tags:
  - "discovery"
  - "domain-mapping"
  - "ontology"
```

```yaml
# config/agents/core/discovery/gap_detection.yaml
agent_id: "AG-CORE-GD-001"
agent_name: "Gap Detection Agent"
agent_slug: "pf-core-gap-detection"
version: "1.0.0"

layer: "core"
cluster: "discovery"
instance_scope: null
extends_agent_id: null

model: "claude-sonnet-4-20250514"
max_tokens: 4096
temperature: 0.2

context_awareness:
  enabled: true
  budget_tracking: true
  tool_result_updates: true

extended_thinking:
  enabled: true
  budget_tokens: 10000
  preserve_in_tool_use: true

prompt_caching:
  enabled: true
  cache_prefix_tokens: 1024
  ttl_seconds: 300

system_prompt_template: "gap_detection_base"
system_prompt_variables:
  agent_role: "Gap Detection"
  gap_categories:
    - "MISSING — Required context not available"
    - "STALE — Context exists but is outdated"
    - "INCOMPLETE — Partial context with missing elements"
    - "INCONSISTENT — Conflicting context from multiple sources"
    - "INACCESSIBLE — Context exists but cannot be retrieved"

tools:
  - tool_id: "TOOL-GAP-001"
    tool_name: "context_validator"
    description: "Validate context completeness against requirements"
    parameters:
      context:
        type: "object"
      requirements:
        type: "object"
    required_params: ["context", "requirements"]
    returns:
      type: "object"
      
  - tool_id: "TOOL-GAP-002"
    tool_name: "freshness_checker"
    description: "Check context age against freshness thresholds"
    parameters:
      context_elements:
        type: "array"
      threshold_hours:
        type: "number"
    required_params: ["context_elements"]
    returns:
      type: "object"
      
  - tool_id: "TOOL-GAP-003"
    tool_name: "consistency_analyzer"
    description: "Detect conflicting information"
    parameters:
      context:
        type: "object"
    required_params: ["context"]
    returns:
      type: "object"

ontology_refs:
  - "ONT-CTXE-0001"
  - "ONT-GAP-0001"

input_schema:
  type: "object"
  properties:
    current_context:
      type: "object"
      description: "Currently assembled context"
    required_context:
      type: "object"
      description: "Context requirements for task"
    freshness_threshold_hours:
      type: "number"
      default: 24
      description: "Maximum age for valid context"
    instance_id:
      type: "string"
      description: "PF-Instance identifier"
  required:
    - "current_context"
    - "required_context"

output_schema:
  type: "object"
  properties:
    gaps:
      type: "array"
      items:
        type: "object"
        properties:
          gap_id:
            type: "string"
          gap_type:
            type: "string"
            enum: ["missing", "stale", "incomplete", "inconsistent", "inaccessible"]
          description:
            type: "string"
          affected_element:
            type: "string"
          severity:
            type: "string"
            enum: ["critical", "high", "medium", "low"]
          task_impact:
            type: "string"
            enum: ["blocking", "degrading", "minor"]
          remediation:
            type: "object"
    summary:
      type: "object"
      properties:
        total_gaps:
          type: "integer"
        blocking_gaps:
          type: "integer"
        coverage_score:
          type: "number"
  required:
    - "gaps"
    - "summary"

description: "Identifies missing, stale, or incomplete context"
owner: "Context Engineering Team"
tags:
  - "discovery"
  - "gap-detection"
  - "quality"
```

---

### 3.2 System Prompt Templates

```txt
# templates/prompts/discovery_agent_base.txt
You are the {{agent_role}} Agent for PF-CORE Context Engineering.

Your responsibility is to {{primary_function}}.

## CORE PRINCIPLES

1. **Accuracy First** — Only report findings you can verify
2. **Relevance Focus** — Prioritize high-value discoveries
3. **Efficiency** — Minimize token usage while maximizing value
4. **Traceability** — Maintain source attribution for all findings

## PROCESS

Given a task or query:
1. ANALYZE the semantic content to identify topic areas
2. QUERY the OAA Registry for matching ontologies
3. MAP relationships between discovered domains
4. ESTIMATE coverage and identify gaps
5. OUTPUT {{output_format}}

## CONTEXT AWARENESS

You have access to context awareness features:
- Track token budget usage
- Update context with tool results
- Reference previous findings in current session

## OUTPUT REQUIREMENTS

- Return valid JSON matching the output schema
- Include confidence scores for all mappings
- Flag uncertain or ambiguous findings
- Provide actionable recommendations

## IMPORTANT

- Respect PF-Instance scope boundaries when specified
- Consider cross-domain relationships
- Prioritize completeness over speed for critical tasks
```

```txt
# templates/prompts/gap_detection_base.txt
You are the {{agent_role}} Agent for PF-CORE Context Engineering.

Your responsibility is to identify context gaps that could impact agent performance.

## GAP CATEGORIES

{{#each gap_categories}}
{{this}}
{{/each}}

## DETECTION PROCESS

For each context analysis:
1. VALIDATE completeness against requirements
2. CHECK freshness against thresholds
3. ANALYZE consistency across sources
4. VERIFY accessibility of all elements
5. ASSESS severity and task impact

## SEVERITY ASSESSMENT

| Severity | Criteria |
|----------|----------|
| Critical | Blocks task completion entirely |
| High | Significantly degrades output quality |
| Medium | Affects specific aspects of task |
| Low | Minor impact, workarounds available |

## REMEDIATION GUIDANCE

For each gap, provide:
- Recommended action (fetch, refresh, fallback, escalate)
- Estimated effort to resolve
- Fallback options if primary remediation fails

## OUTPUT REQUIREMENTS

- Return structured gap report
- Prioritize blocking gaps
- Include coverage score (0-100)
- Provide actionable remediation steps
```

```txt
# templates/prompts/assembly_agent_base.txt
You are the {{agent_role}} Agent for PF-CORE Context Engineering.

Your responsibility is to {{primary_function}}.

## ASSEMBLY PRINCIPLES

1. **RELEVANCE** — Include only information relevant to the task
2. **COMPLETENESS** — Ensure all required context elements are present
3. **EFFICIENCY** — Minimize tokens while maximizing value
4. **STRUCTURE** — Organize context logically for consuming agent
5. **TRACEABILITY** — Maintain source attribution for all elements

## PACKAGE STRUCTURE

```json
{
  "coreContext": {
    "vsom": "// Vision, Strategy, Objectives, Metrics",
    "rrr": "// Requirements, Risks, Resources",
    "tenant": "// Tenant configuration",
    "session": "// Current session context"
  },
  "domainContext": {
    "// Task-specific domain context"
  },
  "instanceContext": {
    "// PF-Instance specific context"
  },
  "referenceContext": {
    "// Supporting reference information"
  },
  "sourceAttribution": [
    "// Array of source references"
  ]
}
```

## TOKEN BUDGET MANAGEMENT

- Respect token budgets strictly
- Prioritize high-value context when budget is limited
- Use compression/summarization for low-priority elements
- Report actual token usage vs budget

## OUTPUT REQUIREMENTS

- Return valid JSON-LD context package
- Include quality metrics (relevance, coverage, freshness scores)
- Provide source attribution for all elements
- Stay within ±5% of token budget
```

---

### 3.3 Automated Build Script

```python
# scripts/build/build_all_agents.py
"""
Automated Agent Build Script

Builds all Context Engineering agents from configuration files.
Supports incremental builds and validation.
"""

import asyncio
import argparse
import logging
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any

from agents.builder.agent_builder import AgentBuilder, AgentBuildResult

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Build order ensures dependencies are built first
BUILD_ORDER = [
    # Phase 1: Core Discovery
    ("core/discovery", ["AG-CORE-DD-001", "AG-CORE-GD-001", "AG-CORE-OT-001"]),
    
    # Phase 2: Core Assembly
    ("core/assembly", ["AG-CORE-CA-001", "AG-CORE-TO-001", "AG-CORE-RS-001"]),
    
    # Phase 3: Core Lifecycle
    ("core/lifecycle", ["AG-CORE-CM-001", "AG-CORE-RF-001", "AG-CORE-HM-001"]),
    
    # Phase 4: Core Optimization
    ("core/optimization", ["AG-CORE-UL-001", "AG-CORE-PT-001", "AG-CORE-MR-001"]),
    
    # Phase 5: BAIV Enhancement (depends on core)
    ("enhancement/baiv", ["AG-BAIV-MCD-001", "AG-BAIV-CCA-001", "AG-BAIV-GAC-001"]),
    
    # Phase 6: W4M Enhancement
    ("enhancement/w4m", ["AG-W4M-OCD-001", "AG-W4M-VCA-001"]),
    
    # Phase 7: AIR Enhancement
    ("enhancement/air", ["AG-AIR-SCD-001", "AG-AIR-ICA-001"]),
    
    # Phase 8: DJM Enhancement
    ("enhancement/djm", ["AG-DJM-CXD-001", "AG-DJM-JCA-001"]),
    
    # Phase 9: Orchestration
    ("orchestration", ["AG-ORCH-AM-001", "AG-ORCH-LC-001", "AG-ORCH-IC-001"]),
]


class AgentBuildPipeline:
    """
    Orchestrates the complete agent build pipeline.
    """
    
    def __init__(
        self,
        config_dir: Path,
        template_dir: Path,
        output_dir: Path
    ):
        self.config_dir = config_dir
        self.template_dir = template_dir
        self.output_dir = output_dir
        self.builder = AgentBuilder(config_dir, template_dir)
        self.results: List[AgentBuildResult] = []
        
    async def run_full_build(self) -> Dict[str, Any]:
        """Run complete build pipeline"""
        start_time = datetime.now()
        logger.info("Starting full agent build pipeline")
        
        # Step 1: Load tool registry
        logger.info("Loading tool registry...")
        self.builder.load_tool_registry(
            self.config_dir / "tools" / "tool_registry.yaml"
        )
        
        # Step 2: Load prompt templates
        logger.info("Loading prompt templates...")
        self.builder.load_prompt_templates()
        
        # Step 3: Build agents in order
        total_agents = sum(len(agents) for _, agents in BUILD_ORDER)
        built_count = 0
        failed_count = 0
        
        for config_subdir, agent_ids in BUILD_ORDER:
            logger.info(f"Building agents from {config_subdir}...")
            
            results = self.builder.build_all_from_directory(config_subdir)
            
            for result in results:
                self.results.append(result)
                if result.success:
                    built_count += 1
                    logger.info(f"✅ Built {result.agent_id} ({result.build_time_ms}ms)")
                else:
                    failed_count += 1
                    logger.error(f"❌ Failed {result.agent_id}: {result.errors}")
        
        # Step 4: Generate build report
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        report = {
            "build_id": f"BUILD-{start_time.strftime('%Y%m%d-%H%M%S')}",
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "duration_seconds": duration,
            "total_agents": total_agents,
            "built_count": built_count,
            "failed_count": failed_count,
            "success_rate": (built_count / total_agents * 100) if total_agents > 0 else 0,
            "results": [
                {
                    "agent_id": r.agent_id,
                    "success": r.success,
                    "build_time_ms": r.build_time_ms,
                    "errors": r.errors,
                    "warnings": r.warnings
                }
                for r in self.results
            ]
        }
        
        # Step 5: Save report
        report_path = self.output_dir / f"build_report_{start_time.strftime('%Y%m%d_%H%M%S')}.json"
        import json
        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2)
        
        logger.info(f"Build complete: {built_count}/{total_agents} agents built")
        logger.info(f"Build report saved to {report_path}")
        
        return report
    
    async def run_incremental_build(self, agent_ids: List[str]) -> Dict[str, Any]:
        """Build only specified agents"""
        logger.info(f"Starting incremental build for {len(agent_ids)} agents")
        
        # Load prerequisites
        self.builder.load_tool_registry(
            self.config_dir / "tools" / "tool_registry.yaml"
        )
        self.builder.load_prompt_templates()
        
        # Find and build specified agents
        for agent_id in agent_ids:
            # Find config file
            config_file = self._find_agent_config(agent_id)
            if config_file:
                import yaml
                with open(config_file) as f:
                    config_data = yaml.safe_load(f)
                from config.schemas.agent_config_schema import AgentConfig
                config = AgentConfig(**config_data)
                result = self.builder.build_agent(config)
                self.results.append(result)
            else:
                logger.warning(f"Config not found for {agent_id}")
        
        return self._generate_report()
    
    def _find_agent_config(self, agent_id: str) -> Path | None:
        """Find configuration file for agent ID"""
        for config_file in self.config_dir.glob("**/*.yaml"):
            import yaml
            with open(config_file) as f:
                try:
                    config = yaml.safe_load(f)
                    if config.get("agent_id") == agent_id:
                        return config_file
                except:
                    continue
        return None
    
    def _generate_report(self) -> Dict[str, Any]:
        """Generate build report"""
        return {
            "results": [
                {
                    "agent_id": r.agent_id,
                    "success": r.success,
                    "errors": r.errors
                }
                for r in self.results
            ]
        }


async def main():
    parser = argparse.ArgumentParser(description="Build Context Engineering Agents")
    parser.add_argument(
        "--mode",
        choices=["full", "incremental"],
        default="full",
        help="Build mode"
    )
    parser.add_argument(
        "--agents",
        nargs="+",
        help="Agent IDs for incremental build"
    )
    parser.add_argument(
        "--config-dir",
        type=Path,
        default=Path("config/agents"),
        help="Configuration directory"
    )
    parser.add_argument(
        "--template-dir",
        type=Path,
        default=Path("templates/prompts"),
        help="Template directory"
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("build_output"),
        help="Output directory"
    )
    
    args = parser.parse_args()
    
    # Ensure output directory exists
    args.output_dir.mkdir(parents=True, exist_ok=True)
    
    pipeline = AgentBuildPipeline(
        config_dir=args.config_dir,
        template_dir=args.template_dir,
        output_dir=args.output_dir
    )
    
    if args.mode == "full":
        report = await pipeline.run_full_build()
    else:
        if not args.agents:
            logger.error("--agents required for incremental build")
            return
        report = await pipeline.run_incremental_build(args.agents)
    
    # Print summary
    print("\n" + "=" * 60)
    print("BUILD SUMMARY")
    print("=" * 60)
    print(f"Total Agents: {report.get('total_agents', len(report.get('results', [])))}")
    print(f"Built: {report.get('built_count', sum(1 for r in report.get('results', []) if r['success']))}")
    print(f"Failed: {report.get('failed_count', sum(1 for r in report.get('results', []) if not r['success']))}")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
```

---

## 4. Phase 3: Enhancement Layer Build (WBS-CE-300)

### 4.1 Enhancement Configuration Pattern

```yaml
# config/agents/enhancement/baiv/marketing_context_discovery.yaml
agent_id: "AG-BAIV-MCD-001"
agent_name: "Marketing Context Discovery Agent"
agent_slug: "baiv-marketing-context-discovery"
version: "1.0.0"

# Classification
layer: "enhancement"
cluster: "discovery"
instance_scope: "BAIV"
extends_agent_id: "AG-CORE-DD-001"  # Extends core Domain Discovery

# Model Configuration (inherits from parent, can override)
model: "claude-sonnet-4-20250514"
max_tokens: 4096
temperature: 0.3

# SDK Features (inherits from parent)
context_awareness:
  enabled: true
  budget_tracking: true
  tool_result_updates: true

extended_thinking:
  enabled: true
  budget_tokens: 10000
  preserve_in_tool_use: true

prompt_caching:
  enabled: true
  cache_prefix_tokens: 1024
  ttl_seconds: 300

# System Prompt Extension
system_prompt_template: "enhancement_discovery_base"
system_prompt_variables:
  instance_name: "BAIV"
  domain_specialization: "Marketing & AI Visibility"
  additional_domains:
    - "AI VISIBILITY — AI platform citation patterns, query classification"
    - "BRAND DISCOVERY — Discovery pathways, brand presence, competitive positioning"
    - "CONTENT GAPS — Content opportunities, competitor coverage"
    - "CMO OBJECTIVES — Marketing OKRs, campaign alignment"

# Additional Tools (extends parent tools)
tools:
  # Inherit all parent tools plus:
  - tool_id: "TOOL-BAIV-001"
    tool_name: "ai_visibility_analyzer"
    description: "Analyze AI platform visibility and citation patterns"
    parameters:
      brand_id:
        type: "string"
        description: "Brand identifier"
      platforms:
        type: "array"
        items:
          type: "string"
          enum: ["ChatGPT", "Claude", "Perplexity", "Gemini", "CoPilot"]
        description: "AI platforms to analyze"
    required_params: ["brand_id"]
    returns:
      type: "object"
      properties:
        visibility_scores:
          type: "object"
        citation_counts:
          type: "object"
          
  - tool_id: "TOOL-BAIV-002"
    tool_name: "brand_discovery_mapper"
    description: "Map brand discovery pathways across AI platforms"
    parameters:
      brand_id:
        type: "string"
      query_categories:
        type: "array"
    required_params: ["brand_id"]
    returns:
      type: "object"
      
  - tool_id: "TOOL-BAIV-003"
    tool_name: "competitor_gap_finder"
    description: "Identify content gaps vs competitors"
    parameters:
      brand_id:
        type: "string"
      competitor_ids:
        type: "array"
    required_params: ["brand_id"]
    returns:
      type: "object"
      
  - tool_id: "TOOL-BAIV-004"
    tool_name: "icp_journey_mapper"
    description: "Map ICP journey context"
    parameters:
      icp_id:
        type: "string"
      journey_stages:
        type: "array"
    required_params: ["icp_id"]
    returns:
      type: "object"

# Additional Ontology References
ontology_refs:
  # Inherits parent refs plus:
  - "ONT-AIV-0001"
  - "ONT-UB-0001"
  - "ONT-GAP-0001"
  - "ONT-CMO-OKR-0001"

# Extended Input Schema
input_schema:
  type: "object"
  allOf:
    - $ref: "#/definitions/ParentInputSchema"
    - type: "object"
      properties:
        brand_id:
          type: "string"
          description: "Brand identifier for BAIV context"
        audit_id:
          type: "string"
          description: "Related AI Visibility audit ID"
        campaign_context:
          type: "object"
          description: "Active campaign information"

# Extended Output Schema
output_schema:
  type: "object"
  allOf:
    - $ref: "#/definitions/ParentOutputSchema"
    - type: "object"
      properties:
        marketing_domains:
          type: "array"
          description: "Marketing-specific domain mappings"
        visibility_context:
          type: "object"
          description: "AI Visibility context data"
        campaign_alignment:
          type: "object"
          description: "Campaign alignment information"

# Metadata
description: "Marketing-specific domain discovery with AI Visibility integration"
owner: "BAIV Product Team"
tags:
  - "enhancement"
  - "baiv"
  - "marketing"
  - "ai-visibility"
```

---

## 5. Phase 4: Testing Framework (WBS-CE-500)

### 5.1 Test Configuration

```yaml
# config/testing/test_config.yaml
testing:
  framework: "pytest"
  async_mode: true
  coverage_target: 85
  
  fixtures:
    mock_claude_responses: true
    test_ontologies: true
    sample_contexts: true
    
  categories:
    unit:
      enabled: true
      parallel: true
      timeout_seconds: 30
      
    integration:
      enabled: true
      parallel: false
      timeout_seconds: 120
      requires:
        - database
        - cache
        
    performance:
      enabled: true
      parallel: false
      timeout_seconds: 300
      thresholds:
        max_latency_ms: 2000
        min_throughput_rps: 50
        
  agents:
    validation:
      - input_schema_validation
      - output_schema_validation
      - tool_availability
      - prompt_template_resolution
      
    functional:
      - tool_execution
      - context_assembly
      - error_handling
      
    integration:
      - agent_communication
      - cache_operations
      - database_operations
```

### 5.2 Test Generator

```python
# scripts/test/generate_tests.py
"""
Automated Test Generator for Context Engineering Agents

Generates unit and integration tests from agent configurations.
"""

import yaml
from pathlib import Path
from typing import Dict, Any, List
from jinja2 import Environment, FileSystemLoader


TEST_TEMPLATE = '''
# Auto-generated tests for {{ agent_id }}
# Generated: {{ timestamp }}

import pytest
import json
from unittest.mock import AsyncMock, MagicMock, patch
from agents.builder.agent_builder import ContextEngineeringAgent


class Test{{ agent_class_name }}:
    """Tests for {{ agent_name }}"""
    
    @pytest.fixture
    def agent_config(self):
        """Agent configuration fixture"""
        return {{ config_json }}
    
    @pytest.fixture
    def mock_client(self):
        """Mock Claude client"""
        client = MagicMock()
        client.messages = MagicMock()
        return client
    
    @pytest.fixture
    def agent(self, agent_config, mock_client):
        """Agent instance fixture"""
        return ContextEngineeringAgent(
            agent_id="{{ agent_id }}",
            client=mock_client,
            model=agent_config["model"],
            max_tokens=agent_config["max_tokens"],
            temperature=agent_config["temperature"],
            system_prompt="Test system prompt",
            tools=[],
            context_awareness=agent_config["context_awareness"],
            extended_thinking=agent_config["extended_thinking"],
            prompt_caching=agent_config["prompt_caching"],
            input_schema=agent_config["input_schema"],
            output_schema=agent_config["output_schema"]
        )
    
    # ==========================================================================
    # INPUT VALIDATION TESTS
    # ==========================================================================
    
    {% for required_field in required_input_fields %}
    def test_input_requires_{{ required_field }}(self, agent):
        """Test that {{ required_field }} is required"""
        input_data = {{ sample_input_without_field(required_field) }}
        with pytest.raises(ValueError):
            agent._validate_input(input_data)
    {% endfor %}
    
    def test_valid_input_accepted(self, agent):
        """Test that valid input is accepted"""
        input_data = {{ sample_valid_input }}
        # Should not raise
        agent._validate_input(input_data)
    
    # ==========================================================================
    # OUTPUT VALIDATION TESTS
    # ==========================================================================
    
    {% for required_field in required_output_fields %}
    def test_output_requires_{{ required_field }}(self, agent):
        """Test that output requires {{ required_field }}"""
        output_data = {{ sample_output_without_field(required_field) }}
        with pytest.raises(ValueError):
            agent._validate_output(output_data)
    {% endfor %}
    
    # ==========================================================================
    # TOOL TESTS
    # ==========================================================================
    
    {% for tool in tools %}
    def test_tool_{{ tool.tool_name }}_available(self, agent):
        """Test that {{ tool.tool_name }} tool is available"""
        tool_names = [t["name"] for t in agent.tools]
        assert "{{ tool.tool_name }}" in tool_names or len(agent.tools) == 0
    {% endfor %}
    
    # ==========================================================================
    # EXECUTION TESTS
    # ==========================================================================
    
    @pytest.mark.asyncio
    async def test_execute_returns_valid_output(self, agent, mock_client):
        """Test that execute returns valid output structure"""
        # Mock Claude response
        mock_response = MagicMock()
        mock_response.content = [MagicMock(text=json.dumps({{ sample_valid_output }}))]
        mock_response.usage = MagicMock(input_tokens=100, output_tokens=200)
        mock_client.messages.create.return_value = mock_response
        
        input_data = {{ sample_valid_input }}
        result = await agent.execute(input_data)
        
        assert isinstance(result, dict)
        {% for required_field in required_output_fields %}
        assert "{{ required_field }}" in result
        {% endfor %}
    
    @pytest.mark.asyncio
    async def test_execute_tracks_token_usage(self, agent, mock_client):
        """Test that execution tracks token usage"""
        mock_response = MagicMock()
        mock_response.content = [MagicMock(text='{}')]
        mock_response.usage = MagicMock(input_tokens=100, output_tokens=200)
        mock_client.messages.create.return_value = mock_response
        
        initial_tokens = agent._total_tokens
        await agent.execute({{ sample_valid_input }})
        
        assert agent._total_tokens > initial_tokens
        assert agent._execution_count == 1
    
    # ==========================================================================
    # ERROR HANDLING TESTS
    # ==========================================================================
    
    @pytest.mark.asyncio
    async def test_handles_api_error(self, agent, mock_client):
        """Test graceful handling of API errors"""
        mock_client.messages.create.side_effect = Exception("API Error")
        
        with pytest.raises(Exception):
            await agent.execute({{ sample_valid_input }})
    
    @pytest.mark.asyncio
    async def test_handles_invalid_json_response(self, agent, mock_client):
        """Test handling of invalid JSON in response"""
        mock_response = MagicMock()
        mock_response.content = [MagicMock(text="not valid json")]
        mock_response.usage = MagicMock(input_tokens=100, output_tokens=200)
        mock_client.messages.create.return_value = mock_response
        
        result = await agent.execute({{ sample_valid_input }})
        
        # Should return raw response when JSON parsing fails
        assert "raw_response" in result
'''


class TestGenerator:
    """Generates tests from agent configurations"""
    
    def __init__(self, config_dir: Path, output_dir: Path):
        self.config_dir = config_dir
        self.output_dir = output_dir
        self.env = Environment(loader=FileSystemLoader('.'))
        
    def generate_all_tests(self) -> List[Path]:
        """Generate tests for all agent configurations"""
        generated = []
        
        for config_file in self.config_dir.glob('**/*.yaml'):
            test_file = self.generate_test(config_file)
            if test_file:
                generated.append(test_file)
                
        return generated
    
    def generate_test(self, config_file: Path) -> Path | None:
        """Generate test file for single agent configuration"""
        with open(config_file) as f:
            config = yaml.safe_load(f)
        
        if not config.get('agent_id'):
            return None
        
        # Prepare template variables
        agent_id = config['agent_id']
        agent_class_name = self._to_class_name(config['agent_name'])
        
        template_vars = {
            'agent_id': agent_id,
            'agent_name': config['agent_name'],
            'agent_class_name': agent_class_name,
            'timestamp': datetime.now().isoformat(),
            'config_json': json.dumps(config, indent=8),
            'required_input_fields': self._get_required_fields(config.get('input_schema', {})),
            'required_output_fields': self._get_required_fields(config.get('output_schema', {})),
            'tools': config.get('tools', []),
            'sample_valid_input': json.dumps(self._generate_sample_input(config)),
            'sample_valid_output': json.dumps(self._generate_sample_output(config)),
        }
        
        # Render template
        from jinja2 import Template
        template = Template(TEST_TEMPLATE)
        test_content = template.render(**template_vars)
        
        # Write test file
        relative_path = config_file.relative_to(self.config_dir)
        test_file = self.output_dir / f"test_{relative_path.stem}.py"
        test_file.parent.mkdir(parents=True, exist_ok=True)
        test_file.write_text(test_content)
        
        return test_file
    
    def _to_class_name(self, name: str) -> str:
        """Convert agent name to class name"""
        return ''.join(word.capitalize() for word in name.split())
    
    def _get_required_fields(self, schema: Dict[str, Any]) -> List[str]:
        """Extract required fields from JSON schema"""
        return schema.get('required', [])
    
    def _generate_sample_input(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Generate sample valid input from schema"""
        schema = config.get('input_schema', {})
        return self._generate_sample_from_schema(schema)
    
    def _generate_sample_output(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Generate sample valid output from schema"""
        schema = config.get('output_schema', {})
        return self._generate_sample_from_schema(schema)
    
    def _generate_sample_from_schema(self, schema: Dict[str, Any]) -> Dict[str, Any]:
        """Generate sample data from JSON schema"""
        sample = {}
        properties = schema.get('properties', {})
        
        for field, field_schema in properties.items():
            field_type = field_schema.get('type', 'string')
            
            if field_type == 'string':
                sample[field] = f"sample_{field}"
            elif field_type == 'number':
                sample[field] = 0.5
            elif field_type == 'integer':
                sample[field] = 1
            elif field_type == 'boolean':
                sample[field] = True
            elif field_type == 'array':
                sample[field] = []
            elif field_type == 'object':
                sample[field] = {}
                
        return sample


if __name__ == "__main__":
    from datetime import datetime
    import json
    
    generator = TestGenerator(
        config_dir=Path("config/agents"),
        output_dir=Path("tests/generated")
    )
    
    generated = generator.generate_all_tests()
    print(f"Generated {len(generated)} test files")
```

---

## 6. Phase 5: CI/CD Pipeline (WBS-CE-600)

### 6.1 GitHub Actions Workflow

```yaml
# .github/workflows/agent_build_deploy.yaml
name: Context Engineering Agent Build & Deploy

on:
  push:
    branches: [main, develop]
    paths:
      - 'config/agents/**'
      - 'agents/**'
      - 'tools/**'
      - 'templates/**'
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      build_mode:
        description: 'Build mode'
        required: true
        default: 'full'
        type: choice
        options:
          - full
          - incremental
      agents:
        description: 'Agent IDs for incremental build (comma-separated)'
        required: false
        type: string

env:
  PYTHON_VERSION: '3.11'
  NODE_VERSION: '20'

jobs:
  # ==========================================================================
  # VALIDATION
  # ==========================================================================
  validate:
    name: Validate Configurations
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          
      - name: Install dependencies
        run: |
          pip install pyyaml jsonschema pydantic
          
      - name: Validate agent configurations
        run: |
          python scripts/validate/validate_configs.py --config-dir config/agents
          
      - name: Validate tool registry
        run: |
          python scripts/validate/validate_tools.py --registry config/tools/tool_registry.yaml
          
      - name: Validate prompt templates
        run: |
          python scripts/validate/validate_prompts.py --template-dir templates/prompts

  # ==========================================================================
  # BUILD
  # ==========================================================================
  build:
    name: Build Agents
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          
      - name: Build agents
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          if [ "${{ github.event.inputs.build_mode }}" == "incremental" ]; then
            python scripts/build/build_all_agents.py \
              --mode incremental \
              --agents ${{ github.event.inputs.agents }}
          else
            python scripts/build/build_all_agents.py --mode full
          fi
          
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: build_output/
          retention-days: 7

  # ==========================================================================
  # TEST
  # ==========================================================================
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: build
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: context_engineering_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
          
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-asyncio pytest-cov
          
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: build_output/
          
      - name: Generate tests
        run: |
          python scripts/test/generate_tests.py
          
      - name: Run unit tests
        run: |
          pytest tests/unit -v --cov=agents --cov-report=xml
          
      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/context_engineering_test
          REDIS_URL: redis://localhost:6379
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          pytest tests/integration -v
          
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage.xml
          flags: unittests
          name: codecov-context-engineering

  # ==========================================================================
  # DEPLOY STAGING
  # ==========================================================================
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: build_output/
          
      - name: Deploy to Digital Ocean Staging
        env:
          DO_API_TOKEN: ${{ secrets.DO_API_TOKEN }}
          DO_APP_ID_STAGING: ${{ secrets.DO_APP_ID_STAGING }}
        run: |
          doctl apps create-deployment $DO_APP_ID_STAGING
          
      - name: Run smoke tests
        run: |
          python scripts/test/smoke_tests.py --env staging

  # ==========================================================================
  # DEPLOY PRODUCTION
  # ==========================================================================
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: build_output/
          
      - name: Deploy to Digital Ocean Production
        env:
          DO_API_TOKEN: ${{ secrets.DO_API_TOKEN }}
          DO_APP_ID_PRODUCTION: ${{ secrets.DO_APP_ID_PRODUCTION }}
        run: |
          doctl apps create-deployment $DO_APP_ID_PRODUCTION
          
      - name: Run smoke tests
        run: |
          python scripts/test/smoke_tests.py --env production
          
      - name: Notify deployment
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Context Engineering Agents deployed to production",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Context Engineering Deployment Complete*\n• Environment: Production\n• Commit: ${{ github.sha }}\n• Build: ${{ github.run_number }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 7. WBS Summary & Metrics

### 7.1 Work Package Summary

| WBS Code | Work Package | Est. Hours | Automation | Dependencies |
|----------|--------------|------------|------------|--------------|
| WBS-CE-110 | Build Environment Setup | 8 | High | None |
| WBS-CE-120 | SDK Configuration | 16 | High | WBS-CE-110 |
| WBS-CE-130 | Database Schema | 8 | High | WBS-CE-110 |
| WBS-CE-140 | Tool Registry Setup | 16 | High | WBS-CE-120 |
| WBS-CE-210 | Discovery Cluster Build | 24 | High | WBS-CE-140 |
| WBS-CE-220 | Assembly Cluster Build | 24 | High | WBS-CE-210 |
| WBS-CE-230 | Lifecycle Cluster Build | 24 | High | WBS-CE-220 |
| WBS-CE-240 | Optimization Cluster Build | 24 | High | WBS-CE-230 |
| WBS-CE-310 | BAIV Enhancement Build | 16 | High | WBS-CE-240 |
| WBS-CE-320 | W4M Enhancement Build | 12 | High | WBS-CE-240 |
| WBS-CE-330 | AIR Enhancement Build | 12 | High | WBS-CE-240 |
| WBS-CE-340 | DJM Enhancement Build | 12 | High | WBS-CE-240 |
| WBS-CE-410 | Agent Manager Build | 16 | Medium | WBS-CE-340 |
| WBS-CE-420 | Lifecycle Controller Build | 8 | High | WBS-CE-410 |
| WBS-CE-430 | Inter-Agent Comm Build | 8 | High | WBS-CE-410 |
| WBS-CE-510 | Unit Testing | 24 | High | All Build |
| WBS-CE-520 | Integration Testing | 16 | High | WBS-CE-510 |
| WBS-CE-530 | Performance Testing | 8 | Medium | WBS-CE-520 |
| WBS-CE-610 | CI/CD Pipeline Setup | 8 | High | WBS-CE-530 |
| WBS-CE-620 | Production Deployment | 8 | High | WBS-CE-610 |
| WBS-CE-630 | Monitoring Setup | 8 | High | WBS-CE-620 |
| **TOTAL** | | **300 hrs** | **~85%** | |

### 7.2 Automation Coverage

```mermaid
pie title Automation Coverage by Phase
    "Fully Automated" : 70
    "Semi-Automated" : 15
    "Manual Review" : 15
```

### 7.3 Build Metrics Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Full Build Time | <15 minutes | CI/CD pipeline |
| Agent Build Success Rate | ≥95% | Build reports |
| Test Coverage | ≥85% | pytest-cov |
| Deployment Success Rate | ≥99% | CD pipeline |
| Mean Time to Deploy | <30 minutes | CD metrics |

---

## 8. Appendices

### 8.1 Quick Start Commands

```bash
# Setup environment
make setup

# Validate all configurations
make validate

# Build all agents
make build-all

# Build specific agents
make build-agents AGENTS="AG-CORE-DD-001,AG-CORE-GD-001"

# Run tests
make test

# Deploy to staging
make deploy-staging

# Deploy to production
make deploy-production
```

### 8.2 Related Documents

| Document ID | Title | Version |
|-------------|-------|---------|
| PBS-PF-CORE-CE-001 | Context Engineering PBS | 1.0.0 |
| PRD-PF-CORE-CEA-001 | Agent Ecosystem PRD | 1.0.0 |
| PF-CORE-CE-VE-OKR-001 | VE OKR Framework | 1.0.0 |

---

**--- END OF DOCUMENT ---**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  © 2025 Platform Foundation Core Holdings. All Rights Reserved.             │
│                                                                             │
│  Document ID: WBS-PF-CORE-CE-BUILD-001                                      │
│  Document Type: WBS (Work Breakdown Structure)                              │
│  Classification: CONFIDENTIAL - PF-CORE Engineering Team                    │
└─────────────────────────────────────────────────────────────────────────────┘
```
