# Technical Architecture Reference
## Be AI Visible Platform - Solution Architect Agent System

**Document Version:** 1.0  
**Date:** October 25, 2025  

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Next.js    │  │  Shadcn UI   │  │  Tailwind    │         │
│  │  App Router  │  │  Components  │  │     CSS      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AGENT ORCHESTRATION LAYER                   │
│  ┌──────────────────────────────────────────────────────┐       │
│  │              Agent Manager (Orchestrator)            │       │
│  └──────────────────────────────────────────────────────┘       │
│         │          │          │          │          │            │
│         ▼          ▼          ▼          ▼          ▼            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ Design   │ │ Arch     │ │ Impl     │ │ Logic    │ │  QA  │ │
│  │ Analysis │ │ Trans    │ │ Agent    │ │ Orch     │ │Agent │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CONTEXT MANAGEMENT LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Supabase   │  │    Graph     │  │   Context    │         │
│  │   Database   │  │   Database   │  │     API      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INTEGRATION LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Figma API   │  │   Vercel     │  │     MCP      │         │
│  │   (Source)   │  │  (Deploy)    │  │ (Extensions) │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow Architecture

```
FIGMA DESIGN → WEBHOOK → AGENT MANAGER → PIPELINE EXECUTION
                                │
                                ▼
                    ┌───────────────────────┐
                    │  CONTEXT STORE        │
                    │  (Shared State)       │
                    └───────────────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │   Design    │     │ Architecture│     │   Business  │
    │   Context   │     │   Context   │     │   Context   │
    └─────────────┘     └─────────────┘     └─────────────┘
            │                   │                   │
            └───────────────────┴───────────────────┘
                                │
                                ▼
                        ┌───────────────┐
                        │  GENERATED    │
                        │  ARTIFACTS    │
                        │  - Code       │
                        │  - Tests      │
                        │  - Docs       │
                        └───────────────┘
                                │
                                ▼
                        ┌───────────────┐
                        │  DEPLOYMENT   │
                        │   (Vercel)    │
                        └───────────────┘
```

### 1.3 Agent Communication Pattern

```
                    ┌─────────────────────┐
                    │   Agent Manager     │
                    └─────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
    │   Agent A   │   │   Agent B   │   │   Agent C   │
    └─────────────┘   └─────────────┘   └─────────────┘
            │                 │                 │
            └─────────────────┼─────────────────┘
                              ▼
                    ┌─────────────────────┐
                    │   Context API       │
                    │   (Read/Write)      │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   Context Store     │
                    │   (Versioned)       │
                    └─────────────────────┘

Communication Protocol:
1. Agent Manager dispatches task to Agent
2. Agent reads required context
3. Agent performs work
4. Agent writes output to context
5. Agent signals completion
6. Agent Manager proceeds to next stage
```

---

## 2. Database Schema

### 2.1 Supabase Tables

```sql
-- Pipeline Execution Tracking
CREATE TABLE pipeline_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  figma_file_id TEXT NOT NULL,
  trigger_type TEXT NOT NULL, -- 'webhook', 'manual', 'scheduled'
  status TEXT NOT NULL, -- 'running', 'completed', 'failed', 'cancelled'
  current_stage TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  context_version TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  
  CONSTRAINT valid_status CHECK (status IN ('running', 'completed', 'failed', 'cancelled'))
);

CREATE INDEX idx_pipeline_status ON pipeline_executions(status);
CREATE INDEX idx_pipeline_figma_file ON pipeline_executions(figma_file_id);
CREATE INDEX idx_pipeline_started_at ON pipeline_executions(started_at DESC);

-- Agent Execution Log
CREATE TABLE agent_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_execution_id UUID REFERENCES pipeline_executions(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL,
  input_context JSONB,
  output_context JSONB,
  error_details JSONB,
  execution_time_ms INTEGER,
  retry_count INTEGER DEFAULT 0,
  
  CONSTRAINT valid_agent_status CHECK (status IN ('running', 'completed', 'failed'))
);

CREATE INDEX idx_agent_exec_pipeline ON agent_executions(pipeline_execution_id);
CREATE INDEX idx_agent_exec_name ON agent_executions(agent_name);
CREATE INDEX idx_agent_exec_started ON agent_executions(started_at DESC);

-- Design Specifications (from Figma)
CREATE TABLE design_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  figma_file_id TEXT UNIQUE NOT NULL,
  figma_file_name TEXT,
  version TEXT NOT NULL,
  specification JSONB NOT NULL, -- Full design spec
  design_tokens JSONB,
  components JSONB,
  validation_status JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_specification CHECK (jsonb_typeof(specification) = 'object')
);

CREATE INDEX idx_design_spec_figma_file ON design_specifications(figma_file_id);
CREATE INDEX idx_design_spec_updated ON design_specifications(updated_at DESC);

-- Architecture Specifications
CREATE TABLE architecture_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_specification_id UUID REFERENCES design_specifications(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  specification JSONB NOT NULL,
  components JSONB,
  state_architecture JSONB,
  data_architecture JSONB,
  routing_architecture JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_arch_spec_design ON architecture_specifications(design_specification_id);

-- Generated Code Registry
CREATE TABLE generated_code (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  architecture_specification_id UUID REFERENCES architecture_specifications(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'component', 'server-action', 'api-route', 'type', 'test'
  code_content TEXT NOT NULL,
  dependencies JSONB DEFAULT '[]'::JSONB,
  test_coverage DECIMAL(5,2),
  git_commit_sha TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(architecture_specification_id, file_path)
);

CREATE INDEX idx_generated_code_arch ON generated_code(architecture_specification_id);
CREATE INDEX idx_generated_code_type ON generated_code(file_type);

-- Quality Metrics
CREATE TABLE quality_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_execution_id UUID REFERENCES pipeline_executions(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- 'visual-regression', 'accessibility', 'performance', 'code-quality'
  status TEXT NOT NULL, -- 'passed', 'failed', 'warning'
  score DECIMAL(5,2),
  details JSONB,
  measured_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_metric_status CHECK (status IN ('passed', 'failed', 'warning'))
);

CREATE INDEX idx_quality_metrics_pipeline ON quality_metrics(pipeline_execution_id);
CREATE INDEX idx_quality_metrics_type ON quality_metrics(metric_type);

-- Context Snapshots (Versioning)
CREATE TABLE context_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version TEXT UNIQUE NOT NULL,
  design_context JSONB,
  architecture_context JSONB,
  implementation_context JSONB,
  business_context JSONB,
  platform_context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  parent_version TEXT
);

CREATE INDEX idx_context_version ON context_snapshots(version);
CREATE INDEX idx_context_created ON context_snapshots(created_at DESC);

-- Business Rules
CREATE TABLE business_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  rule_type TEXT NOT NULL, -- 'validation', 'calculation', 'authorization', 'workflow'
  specification JSONB NOT NULL,
  version TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_business_rules_type ON business_rules(rule_type);
CREATE INDEX idx_business_rules_active ON business_rules(active) WHERE active = true;

-- Agent Configurations
CREATE TABLE agent_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_name TEXT UNIQUE NOT NULL,
  version TEXT NOT NULL,
  model TEXT NOT NULL, -- 'claude-sonnet-4-20250514'
  temperature DECIMAL(3,2),
  max_tokens INTEGER,
  prompt_template TEXT NOT NULL,
  context_requirements JSONB,
  quality_gates JSONB,
  retry_policy JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE pipeline_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_specifications ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view all records
CREATE POLICY "Allow authenticated users to view pipeline_executions"
  ON pipeline_executions FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only service role can insert/update/delete
CREATE POLICY "Allow service role to manage pipeline_executions"
  ON pipeline_executions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Similar policies for other tables...
```

### 2.2 Graph Database Schema (Neo4j/PostgreSQL with pg_graph)

```cypher
// Node Types
CREATE CONSTRAINT product_id IF NOT EXISTS FOR (p:Product) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT component_id IF NOT EXISTS FOR (c:Component) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT agent_id IF NOT EXISTS FOR (a:Agent) REQUIRE a.id IS UNIQUE;

// Example Graph Structure
(:Product {
  id: "product-123",
  name: "Sample Product",
  schemaType: "https://schema.org/Product"
})
  -[:HAS_VISIBILITY_SCORE]->
(:VisibilityScore {
  overall: 85,
  seo: 90,
  social: 75,
  marketplace: 88
})

(:Product)-[:HAS_RECOMMENDATION]->(:ActionPlan)-[:HAS_STEP]->(:Action)

(:Component {
  id: "product-card",
  name: "ProductCard",
  type: "React Component"
})
  -[:USES]->
(:Component {
  id: "shadcn-card",
  name: "Card",
  type: "Shadcn Primitive"
})

(:DesignComponent {
  id: "figma-product-card",
  figmaId: "123:456"
})
  -[:MAPS_TO]->
(:Component {
  id: "product-card"
})
  -[:GENERATED_BY]->
(:Agent {
  name: "implementation-agent"
})
```

---

## 3. API Specifications

### 3.1 Context API

```typescript
// lib/context-api/types.ts

export interface ContextAPI {
  // Read operations
  getDesignSpec(fileId: string): Promise<DesignSpecification>;
  getArchitecture(componentName: string): Promise<ComponentArchitecture>;
  getBusinessRules(domain: string): Promise<BusinessRules>;
  getContextSnapshot(version: string): Promise<ContextSnapshot>;
  
  // Write operations
  updateDesignSpec(spec: DesignSpecification): Promise<void>;
  updateArchitecture(arch: ArchitectureSpecification): Promise<void>;
  createContextSnapshot(description: string): Promise<string>; // returns version
  
  // Query operations
  queryGraph(query: GraphQuery): Promise<GraphResult>;
  searchComponents(criteria: SearchCriteria): Promise<Component[]>;
  findDependencies(componentId: string): Promise<Dependency[]>;
  
  // Versioning
  getLatestContextVersion(): Promise<string>;
  compareContexts(v1: string, v2: string): Promise<ContextDiff>;
  rollbackContext(version: string): Promise<void>;
  
  // Locking (for concurrent access)
  acquireLock(resource: string, timeout: number): Promise<Lock>;
  releaseLock(lock: Lock): Promise<void>;
}

// Implementation
// lib/context-api/implementation.ts

import { createClient } from '@supabase/supabase-js';

export class ContextAPIClient implements ContextAPI {
  private supabase: SupabaseClient;
  
  constructor(config: ContextConfig) {
    this.supabase = createClient(config.url, config.key);
  }
  
  async getDesignSpec(fileId: string): Promise<DesignSpecification> {
    const { data, error } = await this.supabase
      .from('design_specifications')
      .select('*')
      .eq('figma_file_id', fileId)
      .single();
    
    if (error) throw new Error(`Failed to fetch design spec: ${error.message}`);
    
    return data.specification as DesignSpecification;
  }
  
  async updateDesignSpec(spec: DesignSpecification): Promise<void> {
    const { error } = await this.supabase
      .from('design_specifications')
      .upsert({
        figma_file_id: spec.identifier,
        version: spec.version,
        specification: spec,
        design_tokens: spec.designSystem?.tokens,
        components: spec.components,
        validation_status: spec.validationStatus,
        updated_at: new Date().toISOString()
      });
    
    if (error) throw new Error(`Failed to update design spec: ${error.message}`);
  }
  
  async createContextSnapshot(description: string): Promise<string> {
    const version = `v${Date.now()}`;
    
    // Gather all context
    const designSpecs = await this.getAllDesignSpecs();
    const archSpecs = await this.getAllArchitectureSpecs();
    
    const { error } = await this.supabase
      .from('context_snapshots')
      .insert({
        version,
        design_context: designSpecs,
        architecture_context: archSpecs,
        created_by: 'agent-manager',
        parent_version: await this.getLatestContextVersion()
      });
    
    if (error) throw new Error(`Failed to create snapshot: ${error.message}`);
    
    return version;
  }
  
  // ... additional methods
}
```

### 3.2 Agent Manager API

```typescript
// lib/agent-manager/api.ts

export interface AgentManagerAPI {
  // Pipeline operations
  triggerPipeline(config: PipelineTriggerConfig): Promise<PipelineExecution>;
  getPipelineStatus(executionId: string): Promise<PipelineStatus>;
  cancelPipeline(executionId: string): Promise<void>;
  
  // Agent operations
  executeAgent(agentName: string, context: AgentContext): Promise<AgentResult>;
  getAgentStatus(agentName: string): Promise<AgentStatus>;
  
  // Quality gates
  evaluateQualityGate(stage: string, metrics: QualityMetrics): Promise<GateResult>;
  
  // Monitoring
  getMetrics(timeRange: TimeRange): Promise<Metrics>;
  getActiveExecutions(): Promise<PipelineExecution[]>;
}

// Implementation
export class AgentManager implements AgentManagerAPI {
  private contextAPI: ContextAPI;
  private agents: Map<string, Agent>;
  
  async triggerPipeline(config: PipelineTriggerConfig): Promise<PipelineExecution> {
    // Create pipeline execution record
    const execution = await this.createPipelineExecution(config);
    
    // Start execution asynchronously
    this.executePipeline(execution).catch(error => {
      this.handlePipelineFailure(execution.id, error);
    });
    
    return execution;
  }
  
  private async executePipeline(execution: PipelineExecution): Promise<void> {
    const stages: PipelineStage[] = [
      'design_analysis',
      'architecture_translation',
      'implementation',
      'logic_orchestration',
      'quality_assurance',
      'deployment'
    ];
    
    for (const stage of stages) {
      await this.updatePipelineStage(execution.id, stage);
      
      const agent = this.agents.get(this.getAgentForStage(stage));
      const context = await this.prepareAgentContext(execution, stage);
      
      try {
        const result = await agent.execute(context);
        await this.storeAgentResult(execution.id, stage, result);
        
        const gateResult = await this.evaluateQualityGate(stage, result.metrics);
        if (!gateResult.passed) {
          throw new Error(`Quality gate failed for ${stage}: ${gateResult.reason}`);
        }
      } catch (error) {
        await this.handleStageFailure(execution.id, stage, error);
        throw error;
      }
    }
    
    await this.completePipeline(execution.id);
  }
  
  // ... additional methods
}
```

---

## 4. Configuration Files

### 4.1 Agent Configuration Template

```yaml
# config/agents/design-analysis-agent.yml

agent:
  name: design-analysis-agent
  version: 1.2.0
  description: Extracts structured design intelligence from Figma files
  
model:
  provider: anthropic
  name: claude-sonnet-4-20250514
  temperature: 0.2
  max_tokens: 16000
  
prompt:
  template_file: prompts/design-analysis-agent.xml
  variables:
    - figma_file_id
    - design_system_reference
    - component_library_mappings
    
context_requirements:
  - name: figma_api_credentials
    type: secret
    required: true
  - name: design_system_documentation
    type: context
    required: true
  - name: component_library_mappings
    type: context
    required: true
  - name: schema_org_reference
    type: static
    required: true
    
sub_agents:
  - name: figma-parser
    implementation: lib/agents/design-analysis/figma-parser.ts
  - name: design-validator
    implementation: lib/agents/design-analysis/design-validator.ts
    
quality_gates:
  - name: validation_passed
    condition: result.validationStatus.passed == true
    severity: error
  - name: component_count
    condition: result.components.length > 0
    severity: error
  - name: schema_mappings_complete
    condition: all components have mappedSchema
    severity: error
  - name: accessibility_check
    condition: no accessibility errors
    severity: warning
    
retry_policy:
  max_attempts: 3
  backoff: exponential
  initial_delay_ms: 1000
  max_delay_ms: 10000
  timeout_ms: 300000
  retriable_errors:
    - network_error
    - rate_limit
    - timeout
    
monitoring:
  alert_on_failure: true
  alert_channels:
    - slack
    - email
  log_level: info
  metrics_enabled: true
  trace_enabled: true
  
dependencies:
  - "@figma/rest-api-spec": "^2.0.0"
  - "zod": "^3.22.0"
  
environment:
  required_vars:
    - FIGMA_API_TOKEN
    - SUPABASE_URL
    - SUPABASE_SERVICE_KEY
```

### 4.2 Pipeline Configuration

```yaml
# config/pipeline.yml

pipeline:
  name: figma-to-production
  version: 1.0.0
  
stages:
  - name: design_analysis
    agent: design-analysis-agent
    timeout_ms: 300000
    quality_gate: design_quality_gate
    on_failure: abort
    
  - name: architecture_translation
    agent: architecture-translation-agent
    timeout_ms: 300000
    quality_gate: architecture_quality_gate
    requires_approval: false
    on_failure: abort
    
  - name: implementation
    agent: implementation-agent
    timeout_ms: 600000
    quality_gate: implementation_quality_gate
    on_failure: abort
    parallel_execution: true
    max_parallel: 5
    
  - name: logic_orchestration
    agent: logic-orchestration-agent
    timeout_ms: 300000
    quality_gate: logic_quality_gate
    on_failure: abort
    
  - name: quality_assurance
    agent: quality-assurance-agent
    timeout_ms: 600000
    quality_gate: qa_quality_gate
    on_failure: abort
    
  - name: deployment
    agent: deployment-coordination-agent
    timeout_ms: 300000
    requires_approval: true # Production deployments require approval
    on_failure: rollback
    
quality_gates:
  design_quality_gate:
    - metric: validation_passed
      threshold: true
    - metric: accessibility_score
      threshold: ">= 95"
      
  architecture_quality_gate:
    - metric: component_mapping_complete
      threshold: true
    - metric: type_safety_score
      threshold: ">= 95"
      
  implementation_quality_gate:
    - metric: build_success
      threshold: true
    - metric: test_coverage
      threshold: ">= 80"
    - metric: eslint_errors
      threshold: "== 0"
      
  qa_quality_gate:
    - metric: visual_regression_passed
      threshold: true
    - metric: accessibility_violations
      threshold: "== 0"
    - metric: performance_lcp
      threshold: "< 2500"
    - metric: performance_fid
      threshold: "< 100"
      
triggers:
  - name: figma_webhook
    type: webhook
    path: /api/webhooks/figma
    enabled: true
    
  - name: manual_trigger
    type: api
    path: /api/pipeline/trigger
    auth_required: true
    
  - name: scheduled
    type: cron
    schedule: "0 2 * * *" # 2 AM daily
    enabled: false
    
notifications:
  on_success:
    - channel: slack
      webhook: $SLACK_WEBHOOK_URL
  on_failure:
    - channel: slack
      webhook: $SLACK_WEBHOOK_URL
    - channel: email
      recipients:
        - engineering@beaivisible.com
        
monitoring:
  dashboards:
    - grafana
    - datadog
  metrics_export:
    - prometheus
  log_aggregation:
    - cloudwatch
```

### 4.3 Environment Configuration

```bash
# .env.example

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-xxx

# Figma
FIGMA_API_TOKEN=figd_xxx
FIGMA_WEBHOOK_SECRET=whsec_xxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Database (if using external PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Graph Database (Neo4j)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password

# Vercel
VERCEL_TOKEN=xxx
VERCEL_PROJECT_ID=prj_xxx
VERCEL_TEAM_ID=team_xxx

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
DATADOG_API_KEY=xxx

# Feature Flags
ENABLE_AGENT_TRACING=true
ENABLE_AUTO_DEPLOYMENT=false
REQUIRE_DEPLOYMENT_APPROVAL=true

# Rate Limiting
AGENT_RATE_LIMIT_PER_HOUR=100
PIPELINE_MAX_CONCURRENT=10

# Caching
REDIS_URL=redis://localhost:6379
CACHE_TTL_SECONDS=3600
```

---

## 5. Deployment Architecture

### 5.1 Infrastructure as Code (Terraform)

```hcl
# infrastructure/main.tf

terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.15"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_token
}

# Next.js Application
resource "vercel_project" "app" {
  name      = "be-ai-visible"
  framework = "nextjs"
  
  git_repository = {
    type = "github"
    repo = "org/be-ai-visible"
  }
  
  environment = [
    {
      key    = "NEXT_PUBLIC_SUPABASE_URL"
      value  = var.supabase_url
      target = ["production", "preview"]
    },
    {
      key    = "SUPABASE_SERVICE_ROLE_KEY"
      value  = var.supabase_service_key
      target = ["production"]
      type   = "secret"
    }
  ]
}

# Edge Functions for Agent Manager
resource "vercel_edge_config" "agent_config" {
  name = "agent-configuration"
  
  items = {
    "agents" = jsonencode({
      design_analysis = {
        enabled = true
        version = "1.2.0"
      }
      # ... other agents
    })
  }
}

# Monitoring with Datadog
resource "datadog_synthetics_test" "api_health" {
  name    = "Agent Manager Health Check"
  type    = "api"
  subtype = "http"
  
  request_definition {
    method = "GET"
    url    = "https://beaivisible.com/api/health"
  }
  
  assertion {
    type     = "statusCode"
    operator = "is"
    target   = "200"
  }
  
  locations = ["aws:us-east-1", "aws:eu-west-1"]
  
  options_list {
    tick_every = 60
  }
}
```

### 5.2 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/agent-pipeline.yml

name: Agent Pipeline CI/CD

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  NODE_VERSION: '20'

jobs:
  test-agents:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run agent unit tests
        run: npm run test:agents
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  
  test-generated-code:
    runs-on: ubuntu-latest
    needs: test-agents
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
  
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [test-agents, test-generated-code]
    if: github.ref == 'refs/heads/staging'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Staging)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
  
  deploy-production:
    runs-on: ubuntu-latest
    needs: [test-agents, test-generated-code]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
      
      - name: Run smoke tests
        run: npm run test:smoke
        env:
          TEST_URL: https://beaivisible.com
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment completed'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 6. Monitoring and Observability

### 6.1 Metrics Collection

```typescript
// lib/monitoring/metrics.ts

import { Counter, Histogram, Gauge } from 'prom-client';

export const agentExecutionDuration = new Histogram({
  name: 'agent_execution_duration_seconds',
  help: 'Duration of agent executions',
  labelNames: ['agent_name', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60, 120]
});

export const agentExecutionTotal = new Counter({
  name: 'agent_execution_total',
  help: 'Total number of agent executions',
  labelNames: ['agent_name', 'status']
});

export const pipelineExecutionTotal = new Counter({
  name: 'pipeline_execution_total',
  help: 'Total number of pipeline executions',
  labelNames: ['trigger_type', 'status']
});

export const qualityGateResults = new Counter({
  name: 'quality_gate_results_total',
  help: 'Quality gate pass/fail results',
  labelNames: ['stage', 'result']
});

export const contextAPILatency = new Histogram({
  name: 'context_api_latency_seconds',
  help: 'Context API operation latency',
  labelNames: ['operation', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2]
});

export const activePipelines = new Gauge({
  name: 'active_pipelines',
  help: 'Number of currently active pipelines'
});

// Instrumentation wrapper
export function instrumentAgent<T>(
  agentName: string,
  execution: () => Promise<T>
): Promise<T> {
  const timer = agentExecutionDuration.startTimer({ agent_name: agentName });
  
  return execution()
    .then(result => {
      timer({ status: 'success' });
      agentExecutionTotal.inc({ agent_name: agentName, status: 'success' });
      return result;
    })
    .catch(error => {
      timer({ status: 'error' });
      agentExecutionTotal.inc({ agent_name: agentName, status: 'error' });
      throw error;
    });
}
```

### 6.2 Logging Configuration

```typescript
// lib/logging/config.ts

import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'agent-manager',
    environment: process.env.NODE_ENV
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Structured logging helpers
export function logAgentExecution(
  agentName: string,
  executionId: string,
  status: 'started' | 'completed' | 'failed',
  metadata?: Record<string, any>
) {
  logger.info('Agent execution', {
    agent_name: agentName,
    execution_id: executionId,
    status,
    ...metadata
  });
}

export function logPipelineEvent(
  pipelineId: string,
  stage: string,
  event: string,
  metadata?: Record<string, any>
) {
  logger.info('Pipeline event', {
    pipeline_id: pipelineId,
    stage,
    event,
    ...metadata
  });
}
```

### 6.3 Alerting Rules

```yaml
# config/alerting.yml

alerts:
  - name: HighAgentFailureRate
    condition: |
      rate(agent_execution_total{status="error"}[5m]) 
      / 
      rate(agent_execution_total[5m]) 
      > 0.1
    for: 5m
    severity: critical
    annotations:
      summary: "High agent failure rate detected"
      description: "Agent {{ $labels.agent_name }} has >10% failure rate"
    actions:
      - type: slack
        channel: "#alerts-critical"
      - type: pagerduty
        service: agent-platform
  
  - name: SlowAgentExecution
    condition: |
      histogram_quantile(0.95, 
        rate(agent_execution_duration_seconds_bucket[5m])
      ) > 120
    for: 10m
    severity: warning
    annotations:
      summary: "Slow agent execution detected"
      description: "Agent {{ $labels.agent_name }} p95 latency >2min"
    actions:
      - type: slack
        channel: "#alerts-performance"
  
  - name: QualityGateFailures
    condition: |
      increase(quality_gate_results_total{result="failed"}[1h]) > 5
    severity: warning
    annotations:
      summary: "Multiple quality gate failures"
      description: "Stage {{ $labels.stage }} has >5 failures in last hour"
    actions:
      - type: slack
        channel: "#alerts-quality"
  
  - name: PipelineBacklog
    condition: active_pipelines > 10
    for: 15m
    severity: warning
    annotations:
      summary: "Pipeline backlog building up"
      description: "{{ $value }} active pipelines for >15min"
    actions:
      - type: slack
        channel: "#alerts-capacity"
```

---

## 7. Security Architecture

### 7.1 Secrets Management

```typescript
// lib/security/secrets.ts

import { createClient } from '@supabase/supabase-js';

interface SecretStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

class SupabaseSecretStore implements SecretStore {
  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }
  
  async get(key: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('secrets')
      .select('encrypted_value')
      .eq('key', key)
      .single();
    
    if (error) return null;
    
    return this.decrypt(data.encrypted_value);
  }
  
  private decrypt(encryptedValue: string): string {
    // Use KMS or similar for decryption
    return encryptedValue; // Simplified
  }
  
  // ... additional methods
}

export const secretStore = new SupabaseSecretStore();
```

### 7.2 API Authentication

```typescript
// middleware/auth.ts

import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization header' },
      { status: 401 }
    );
  }
  
  const token = authHeader.substring(7);
  
  try {
    const payload = verify(token, process.env.JWT_SECRET!);
    return { authenticated: true, user: payload };
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

// Rate limiting
const rateLimitStore = new Map<string, number[]>();

export function rateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(identifier) || [];
  
  // Remove old timestamps outside window
  const validTimestamps = timestamps.filter(ts => now - ts < windowMs);
  
  if (validTimestamps.length >= limit) {
    return false; // Rate limit exceeded
  }
  
  validTimestamps.push(now);
  rateLimitStore.set(identifier, validTimestamps);
  
  return true; // Within rate limit
}
```

---

## 8. Disaster Recovery

### 8.1 Backup Strategy

```yaml
# config/backup.yml

backup:
  database:
    provider: supabase
    schedule: "0 */6 * * *" # Every 6 hours
    retention_days: 30
    encryption: true
    
  context_snapshots:
    schedule: "0 0 * * *" # Daily
    retention_days: 90
    
  generated_code:
    provider: github
    repository: org/be-ai-visible
    branches:
      - main
      - staging
    
restore:
  procedures:
    database:
      - step: Download backup from Supabase
      - step: Verify backup integrity
      - step: Restore to new instance
      - step: Run migration validation
      - step: Update connection strings
      
    context:
      - step: Identify target context version
      - step: Restore from snapshot
      - step: Validate context consistency
      - step: Update agents to use restored context
```

### 8.2 Rollback Procedures

```typescript
// lib/rollback/manager.ts

export class RollbackManager {
  async rollbackDeployment(deploymentId: string): Promise<void> {
    console.log(`Initiating rollback for deployment ${deploymentId}`);
    
    // 1. Identify previous stable deployment
    const previousDeployment = await this.getPreviousStableDeployment();
    
    // 2. Stop current deployment
    await this.stopDeployment(deploymentId);
    
    // 3. Restore previous deployment
    await this.restoreDeployment(previousDeployment.id);
    
    // 4. Restore database state if needed
    if (await this.hasDatabaseChanges(deploymentId)) {
      await this.rollbackDatabase(previousDeployment.databaseSnapshot);
    }
    
    // 5. Verify health
    await this.verifyHealth();
    
    // 6. Notify stakeholders
    await this.notifyRollback(deploymentId, previousDeployment.id);
    
    console.log(`Rollback completed successfully`);
  }
  
  async rollbackContext(version: string): Promise<void> {
    console.log(`Rolling back context to version ${version}`);
    
    const snapshot = await this.contextAPI.getContextSnapshot(version);
    
    // Restore all context components
    await this.contextAPI.restoreSnapshot(snapshot);
    
    // Notify agents of context change
    await this.notifyAgents('context_rolled_back', { version });
    
    console.log(`Context rolled back to ${version}`);
  }
}
```

---

## 9. Performance Optimization

### 9.1 Caching Strategy

```typescript
// lib/cache/strategy.ts

import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function cacheDesignSpec(
  fileId: string,
  spec: DesignSpecification,
  ttl: number = 3600
): Promise<void> {
  await redis.setex(
    `design-spec:${fileId}`,
    ttl,
    JSON.stringify(spec)
  );
}

export async function getCachedDesignSpec(
  fileId: string
): Promise<DesignSpecification | null> {
  const cached = await redis.get(`design-spec:${fileId}`);
  return cached ? JSON.parse(cached) : null;
}

// Request deduplication
const inflightRequests = new Map<string, Promise<any>>();

export async function deduplicate<T>(
  key: string,
  fetch: () => Promise<T>
): Promise<T> {
  if (inflightRequests.has(key)) {
    return inflightRequests.get(key)!;
  }
  
  const promise = fetch().finally(() => {
    inflightRequests.delete(key);
  });
  
  inflightRequests.set(key, promise);
  
  return promise;
}
```

---

## 10. Documentation Standards

### 10.1 Agent Documentation Template

```markdown
# {Agent Name}

## Overview
Brief description of agent purpose and responsibilities.

## Capabilities
- Capability 1
- Capability 2
- Capability 3

## Inputs
```typescript
interface AgentInput {
  // Input structure
}
```

## Outputs
```typescript
interface AgentOutput {
  // Output structure
}
```

## Dependencies
- Dependency 1
- Dependency 2

## Configuration
```yaml
# Configuration example
```

## Quality Gates
1. Gate 1: Description
2. Gate 2: Description

## Error Handling
How errors are handled and retried.

## Monitoring
Key metrics and alerts.

## Examples
```typescript
// Usage example
```

## Troubleshooting
Common issues and solutions.
```

---

**END OF TECHNICAL ARCHITECTURE REFERENCE**
