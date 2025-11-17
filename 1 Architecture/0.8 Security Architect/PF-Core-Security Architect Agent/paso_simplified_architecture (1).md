# Platform Agent Security Orchestrator (PASO)
## Simplified Architecture: JSON Ontologies + Supabase + Low-Cost Graphing

**Version:** 1.0  
**Date:** October 18, 2025  
**Architecture:** Lean & Cost-Effective

---

## Executive Summary

PASO provides **security and compliance governance** for agentic platforms using:
- **JSON ontologies** (JSON-LD + JSON Schema)
- **Supabase** (PostgreSQL + real-time + auth + storage)
- **Low-cost graphing tools** (D3.js, Vis.js, Mermaid)
- **Open-source standards** (Schema.org, OAA)

**Total Infrastructure Cost:** £50-100/month for 100-500 agents

---

## 1. Simplified Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
│        (Agent Builders, Security Dashboards, APIs)          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   PASO Core Services                         │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────────┐     │
│  │  FastAPI Backend │◄───────►│  Supabase            │     │
│  │  (Python)        │         │  - PostgreSQL        │     │
│  │                  │         │  - Real-time subs    │     │
│  │  - Validation    │         │  - Auth & RBAC       │     │
│  │  - Reasoning     │         │  - File storage      │     │
│  │  - Graph queries │         │  - Edge functions    │     │
│  └──────────────────┘         └──────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              JSON Ontology Files (Storage)                   │
│                                                              │
│  Supabase Storage Buckets:                                  │
│  - /ontologies/contexts/*.jsonld                            │
│  - /ontologies/schemas/*.schema.json                        │
│  - /agents/*.json                                           │
│  - /policies/*.json                                         │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            Low-Cost Visualization Layer                      │
│                                                              │
│  Free/Open Source Tools:                                    │
│  - D3.js (force graphs)                                     │
│  - Vis.js (network diagrams)                                │
│  - Mermaid (flowcharts & ERD)                              │
│  - Cytoscape.js (graph analysis)                           │
│  - ELK.js (automatic layouts)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Supabase Schema Design

### 2.1 Database Tables (PostgreSQL)

```sql
-- Agents table
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    version TEXT,
    type TEXT NOT NULL, -- 'SalesAgent', 'SupportAgent', etc.
    status TEXT DEFAULT 'active',
    json_ld JSONB NOT NULL, -- Full JSON-LD representation
    
    -- Security fields (extracted for querying)
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
    
    -- Compliance fields
    processes_personal_data BOOLEAN DEFAULT false,
    compliance_frameworks TEXT[], -- ['GDPR', 'SOC2', etc.]
    compliance_status TEXT DEFAULT 'PENDING',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Indexes for performance
CREATE INDEX idx_agents_type ON agents(type);
CREATE INDEX idx_agents_risk_level ON agents(risk_level);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_jsonld ON agents USING gin(json_ld);

-- Permissions (simplified)
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    permission_type TEXT NOT NULL, -- 'DataAccess', 'APIAccess', 'Action', 'Admin'
    applies_to TEXT NOT NULL, -- Resource name
    access_level TEXT, -- 'read', 'write', 'execute', 'admin'
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    json_ld JSONB
);

CREATE INDEX idx_permissions_agent ON permissions(agent_id);
CREATE INDEX idx_permissions_type ON permissions(permission_type);

-- Policies
CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    version TEXT,
    policy_type TEXT NOT NULL, -- 'DataAccess', 'Action', 'Behavioral'
    applies_to TEXT[], -- Agent types this applies to
    rules JSONB NOT NULL, -- Array of policy rules
    json_ld JSONB NOT NULL,
    
    effective_date TIMESTAMPTZ,
    expiry_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_policies_type ON policies(policy_type);
CREATE INDEX idx_policies_applies_to ON policies USING gin(applies_to);

-- Relationships (graph edges stored as table)
CREATE TABLE agent_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    target_agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL, -- 'communicatesWith', 'canCall', 'dependsOn'
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(source_agent_id, target_agent_id, relationship_type)
);

CREATE INDEX idx_relationships_source ON agent_relationships(source_agent_id);
CREATE INDEX idx_relationships_target ON agent_relationships(target_agent_id);
CREATE INDEX idx_relationships_type ON agent_relationships(relationship_type);

-- Data sources
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    source_type TEXT NOT NULL, -- 'Database', 'API', 'FileSystem'
    classification TEXT CHECK (classification IN ('Public', 'Internal', 'Confidential', 'Restricted')),
    
    contains_pii BOOLEAN DEFAULT false,
    contains_financial_data BOOLEAN DEFAULT false,
    contains_health_data BOOLEAN DEFAULT false,
    sensitivity_score INTEGER CHECK (sensitivity_score >= 0 AND sensitivity_score <= 100),
    
    json_ld JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_datasources_classification ON data_sources(classification);
CREATE INDEX idx_datasources_pii ON data_sources(contains_pii);

-- Data access relationships
CREATE TABLE data_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    data_source_id UUID REFERENCES data_sources(id) ON DELETE CASCADE,
    access_type TEXT, -- 'read', 'write', 'admin'
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(agent_id, data_source_id)
);

CREATE INDEX idx_data_access_agent ON data_access(agent_id);
CREATE INDEX idx_data_access_source ON data_access(data_source_id);

-- Audit log
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id),
    event_type TEXT NOT NULL, -- 'created', 'updated', 'executed', 'failed', 'violation'
    event_data JSONB,
    user_id UUID REFERENCES auth.users(id),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_agent ON audit_log(agent_id);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp DESC);
CREATE INDEX idx_audit_type ON audit_log(event_type);
```

### 2.2 PostgreSQL Graph Queries

**Advantage:** PostgreSQL has built-in recursive CTE for graph traversal (no Neo4j needed!)

```sql
-- Query: Find all agents that can transitively access PII data
WITH RECURSIVE agent_access_chain AS (
    -- Base case: direct access
    SELECT 
        a.id as agent_id,
        a.name as agent_name,
        ds.id as data_source_id,
        ds.name as data_source_name,
        1 as depth
    FROM agents a
    JOIN data_access da ON a.id = da.agent_id
    JOIN data_sources ds ON da.data_source_id = ds.id
    WHERE ds.contains_pii = true
    
    UNION
    
    -- Recursive: indirect access via other agents
    SELECT 
        ar.source_agent_id as agent_id,
        a.name as agent_name,
        aac.data_source_id,
        aac.data_source_name,
        aac.depth + 1 as depth
    FROM agent_access_chain aac
    JOIN agent_relationships ar ON aac.agent_id = ar.target_agent_id
    JOIN agents a ON ar.source_agent_id = a.id
    WHERE ar.relationship_type IN ('canCall', 'communicatesWith')
      AND aac.depth < 5  -- Limit recursion depth
)
SELECT DISTINCT 
    agent_id,
    agent_name,
    array_agg(DISTINCT data_source_name) as accessible_pii_sources,
    min(depth) as shortest_path_length
FROM agent_access_chain
GROUP BY agent_id, agent_name
ORDER BY shortest_path_length, agent_name;

-- Query: Find privilege escalation paths
WITH RECURSIVE escalation_paths AS (
    -- Start with low-risk agents
    SELECT 
        id as agent_id,
        name,
        risk_score,
        ARRAY[id] as path,
        0 as path_length
    FROM agents
    WHERE risk_score < 40
    
    UNION
    
    -- Follow relationships to higher-risk agents
    SELECT 
        ar.target_agent_id as agent_id,
        a.name,
        a.risk_score,
        ep.path || ar.target_agent_id,
        ep.path_length + 1
    FROM escalation_paths ep
    JOIN agent_relationships ar ON ep.agent_id = ar.source_agent_id
    JOIN agents a ON ar.target_agent_id = a.id
    WHERE a.risk_score > ep.risk_score + 20
      AND NOT (a.id = ANY(ep.path))  -- Prevent cycles
      AND ep.path_length < 4
)
SELECT 
    ep.path,
    array_agg(a.name ORDER BY idx) as agent_names,
    max(ep.risk_score) - min(ep.risk_score) as risk_delta
FROM escalation_paths ep,
     unnest(ep.path) WITH ORDINALITY AS p(agent_id, idx)
JOIN agents a ON p.agent_id = a.id
WHERE ep.path_length > 0
GROUP BY ep.path
HAVING max(ep.risk_score) - min(ep.risk_score) > 40
ORDER BY risk_delta DESC;

-- Query: Compliance violations by framework
SELECT 
    unnest(a.compliance_frameworks) as framework,
    COUNT(*) FILTER (WHERE a.compliance_status = 'NON_COMPLIANT') as violations,
    COUNT(*) FILTER (WHERE a.compliance_status = 'COMPLIANT') as compliant,
    COUNT(*) as total_agents
FROM agents a
WHERE a.status = 'active'
GROUP BY framework
ORDER BY violations DESC;
```

### 2.3 Supabase Real-Time Subscriptions

```javascript
// Listen for new agents or security profile changes
const { data, error } = await supabase
  .from('agents')
  .on('INSERT', payload => {
    console.log('New agent registered:', payload.new);
    // Trigger validation
    validateNewAgent(payload.new);
  })
  .on('UPDATE', payload => {
    if (payload.new.risk_score !== payload.old.risk_score) {
      console.log('Risk score changed:', payload.new.name);
      // Trigger re-assessment
      assessAgentRisk(payload.new);
    }
  })
  .subscribe();

// Listen for policy changes
const policySubscription = supabase
  .from('policies')
  .on('*', payload => {
    // Revalidate all affected agents
    const affectedAgentTypes = payload.new.applies_to;
    revalidateAgentsByType(affectedAgentTypes);
  })
  .subscribe();
```

### 2.4 Supabase Edge Functions (Serverless Logic)

```typescript
// edge-functions/validate-agent/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { agentData } = await req.json();
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
  
  // Validate JSON-LD against schema
  const schemaValidation = await validateAgainstSchema(agentData);
  
  // Calculate risk score
  const riskScore = calculateRiskScore(agentData);
  
  // Check compliance
  const complianceStatus = await checkCompliance(agentData);
  
  // Store validation result
  const { data, error } = await supabase
    .from('agents')
    .insert({
      agent_id: agentData['@id'],
      name: agentData.name,
      type: agentData['@type'],
      json_ld: agentData,
      risk_score: riskScore.score,
      risk_level: riskScore.level,
      processes_personal_data: agentData.hasComplianceProfile?.processesPersonalData,
      compliance_frameworks: agentData.hasComplianceProfile?.subjectToFramework,
      compliance_status: complianceStatus.status
    });
  
  return new Response(
    JSON.stringify({ success: !error, data, error }),
    { headers: { "Content-Type": "application/json" } }
  );
});

function calculateRiskScore(agentData: any): { score: number, level: string } {
  let score = 0;
  
  // Risk factors
  if (agentData.hasComplianceProfile?.processesPersonalData) score += 20;
  if (agentData.hasSecurityProfile?.hasVulnerability?.length > 0) score += 30;
  if (agentData.hasSecurityProfile?.hasSecurityControl?.length < 2) score += 15;
  
  // Access to sensitive data
  const permissions = agentData.hasSecurityProfile?.hasPermission || [];
  const adminPerms = permissions.filter((p: any) => p['@type'] === 'AdminPermission');
  score += adminPerms.length * 10;
  
  // Determine level
  let level = 'Low';
  if (score >= 70) level = 'Critical';
  else if (score >= 50) level = 'High';
  else if (score >= 30) level = 'Medium';
  
  return { score: Math.min(score, 100), level };
}

async function checkCompliance(agentData: any): Promise<{ status: string, violations: string[] }> {
  const violations = [];
  const profile = agentData.hasComplianceProfile;
  
  // GDPR checks
  if (profile?.subjectToFramework?.includes('GDPR')) {
    if (profile.processesPersonalData && !profile.hasLegalBasis) {
      violations.push('GDPR Article 6: Missing legal basis for data processing');
    }
    if (profile.processesPersonalData && !profile.purpose) {
      violations.push('GDPR Article 5(1)(b): Missing purpose specification');
    }
  }
  
  const status = violations.length === 0 ? 'COMPLIANT' : 'NON_COMPLIANT';
  return { status, violations };
}
```

---

## 3. Low-Cost Graph Visualization

### 3.1 Option 1: D3.js Force Graph (Free)

**HTML/JavaScript Implementation:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>PASO Agent Graph</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        #graph { width: 100vw; height: 100vh; }
        .node { stroke: #fff; stroke-width: 1.5px; cursor: pointer; }
        .node.high-risk { fill: #e74c3c; }
        .node.medium-risk { fill: #f39c12; }
        .node.low-risk { fill: #2ecc71; }
        .link { stroke: #999; stroke-opacity: 0.6; stroke-width: 2px; }
        .label { font-size: 10px; pointer-events: none; }
    </style>
</head>
<body>
    <div id="graph"></div>
    
    <script>
        // Initialize Supabase
        const supabase = supabase.createClient(
            'YOUR_SUPABASE_URL',
            'YOUR_SUPABASE_ANON_KEY'
        );
        
        async function loadGraph() {
            // Fetch agents
            const { data: agents } = await supabase
                .from('agents')
                .select('*');
            
            // Fetch relationships
            const { data: relationships } = await supabase
                .from('agent_relationships')
                .select('*');
            
            // Transform to D3 format
            const nodes = agents.map(a => ({
                id: a.id,
                name: a.name,
                riskLevel: a.risk_level?.toLowerCase() || 'low',
                riskScore: a.risk_score || 0
            }));
            
            const links = relationships.map(r => ({
                source: r.source_agent_id,
                target: r.target_agent_id,
                type: r.relationship_type
            }));
            
            drawGraph({ nodes, links });
        }
        
        function drawGraph(data) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            const svg = d3.select('#graph')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
            
            const simulation = d3.forceSimulation(data.nodes)
                .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
                .force('charge', d3.forceManyBody().strength(-300))
                .force('center', d3.forceCenter(width / 2, height / 2));
            
            const link = svg.append('g')
                .selectAll('line')
                .data(data.links)
                .join('line')
                .attr('class', 'link');
            
            const node = svg.append('g')
                .selectAll('circle')
                .data(data.nodes)
                .join('circle')
                .attr('class', d => `node ${d.riskLevel}-risk`)
                .attr('r', d => 5 + (d.riskScore / 10))
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));
            
            const label = svg.append('g')
                .selectAll('text')
                .data(data.nodes)
                .join('text')
                .attr('class', 'label')
                .text(d => d.name)
                .attr('dx', 12)
                .attr('dy', 4);
            
            simulation.on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);
                
                node
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
                
                label
                    .attr('x', d => d.x)
                    .attr('y', d => d.y);
            });
            
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }
            
            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }
            
            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
        }
        
        // Load and render graph
        loadGraph();
        
        // Subscribe to real-time updates
        supabase
            .from('agents')
            .on('*', () => loadGraph())
            .subscribe();
    </script>
</body>
</html>
```

**Cost:** £0/month (free CDN)

### 3.2 Option 2: Vis.js Network (Free)

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style>
        #network { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="network"></div>
    
    <script>
        async function loadVisGraph() {
            const { data: agents } = await supabase.from('agents').select('*');
            const { data: rels } = await supabase.from('agent_relationships').select('*');
            
            const nodes = new vis.DataSet(
                agents.map(a => ({
                    id: a.id,
                    label: a.name,
                    color: getRiskColor(a.risk_level),
                    size: 20 + (a.risk_score / 5)
                }))
            );
            
            const edges = new vis.DataSet(
                rels.map(r => ({
                    from: r.source_agent_id,
                    to: r.target_agent_id,
                    label: r.relationship_type,
                    arrows: 'to'
                }))
            );
            
            const container = document.getElementById('network');
            const data = { nodes, edges };
            const options = {
                physics: {
                    stabilization: false,
                    barnesHut: {
                        gravitationalConstant: -30000,
                        springConstant: 0.001,
                        springLength: 200
                    }
                }
            };
            
            new vis.Network(container, data, options);
        }
        
        function getRiskColor(level) {
            const colors = {
                'Critical': '#e74c3c',
                'High': '#e67e22',
                'Medium': '#f39c12',
                'Low': '#2ecc71'
            };
            return colors[level] || '#3498db';
        }
        
        loadVisGraph();
    </script>
</body>
</html>
```

**Cost:** £0/month

### 3.3 Option 3: Mermaid Diagrams (Free, Static)

**For Documentation and Reports:**

```javascript
// Generate Mermaid diagram from Supabase data
async function generateMermaidDiagram() {
    const { data: agents } = await supabase.from('agents').select('*');
    const { data: rels } = await supabase.from('agent_relationships').select('*');
    
    let mermaid = 'graph TD\n';
    
    // Add nodes with styling
    agents.forEach(a => {
        const style = a.risk_level === 'High' ? ':::highRisk' : 
                     a.risk_level === 'Medium' ? ':::mediumRisk' : ':::lowRisk';
        mermaid += `    ${a.id}["${a.name}"]${style}\n`;
    });
    
    // Add edges
    rels.forEach(r => {
        mermaid += `    ${r.source_agent_id} -->|${r.relationship_type}| ${r.target_agent_id}\n`;
    });
    
    // Add styling classes
    mermaid += '\n    classDef highRisk fill:#e74c3c,stroke:#c0392b,color:#fff\n';
    mermaid += '    classDef mediumRisk fill:#f39c12,stroke:#e67e22,color:#fff\n';
    mermaid += '    classDef lowRisk fill:#2ecc71,stroke:#27ae60,color:#fff\n';
    
    return mermaid;
}

// Render in HTML
document.getElementById('diagram').innerHTML = `
    <pre class="mermaid">
        ${await generateMermaidDiagram()}
    </pre>
`;
```

**Cost:** £0/month

### 3.4 Option 4: Cytoscape.js (Free, Advanced)

**Best for complex graph analysis:**

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/cytoscape@3.23.0/dist/cytoscape.min.js"></script>
    <style>
        #cy { width: 100vw; height: 100vh; display: block; }
    </style>
</head>
<body>
    <div id="cy"></div>
    
    <script>
        async function loadCytoscapeGraph() {
            const { data: agents } = await supabase.from('agents').select('*');
            const { data: rels } = await supabase.from('agent_relationships').select('*');
            
            const cy = cytoscape({
                container: document.getElementById('cy'),
                
                elements: [
                    // Nodes
                    ...agents.map(a => ({
                        data: { 
                            id: a.id, 
                            label: a.name,
                            riskScore: a.risk_score
                        },
                        classes: `${a.risk_level?.toLowerCase()}-risk`
                    })),
                    
                    // Edges
                    ...rels.map(r => ({
                        data: {
                            source: r.source_agent_id,
                            target: r.target_agent_id,
                            label: r.relationship_type
                        }
                    }))
                ],
                
                style: [
                    {
                        selector: 'node',
                        style: {
                            'label': 'data(label)',
                            'width': 'data(riskScore)',
                            'height': 'data(riskScore)',
                            'text-valign': 'center',
                            'text-halign': 'right',
                            'font-size': '10px'
                        }
                    },
                    {
                        selector: '.high-risk',
                        style: { 'background-color': '#e74c3c' }
                    },
                    {
                        selector: '.medium-risk',
                        style: { 'background-color': '#f39c12' }
                    },
                    {
                        selector: '.low-risk',
                        style: { 'background-color': '#2ecc71' }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 2,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'label': 'data(label)',
                            'font-size': '8px',
                            'curve-style': 'bezier'
                        }
                    }
                ],
                
                layout: {
                    name: 'cose',
                    idealEdgeLength: 100,
                    nodeOverlap: 20
                }
            });
            
            // Enable analysis features
            cy.on('tap', 'node', function(evt){
                const node = evt.target;
                console.log('Selected:', node.data('label'));
                // Highlight connected nodes
                node.neighborhood().addClass('highlighted');
            });
        }
        
        loadCytoscapeGraph();
    </script>
</body>
</html>
```

**Cost:** £0/month

---

## 4. Complete FastAPI Backend

```python
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import json
from datetime import datetime

app = FastAPI(title="PASO API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Pydantic models
class AgentCreate(BaseModel):
    json_ld: Dict[Any, Any]

class AgentResponse(BaseModel):
    id: str
    agent_id: str
    name: str
    type: str
    risk_score: int
    risk_level: str
    compliance_status: str
    json_ld: Dict[Any, Any]

@app.post("/agents", response_model=AgentResponse)
async def create_agent(agent_data: AgentCreate):
    """Register new agent with validation"""
    
    json_ld = agent_data.json_ld
    
    # Validate JSON-LD structure
    if '@type' not in json_ld or 'name' not in json_ld:
        raise HTTPException(status_code=400, detail="Invalid JSON-LD structure")
    
    # Calculate risk score
    risk_score = calculate_risk_score(json_ld)
    
    # Check compliance
    compliance_status = check_compliance(json_ld)
    
    # Insert into Supabase
    result = supabase.table('agents').insert({
        'agent_id': json_ld.get('@id'),
        'name': json_ld['name'],
        'version': json_ld.get('version'),
        'type': json_ld['@type'] if isinstance(json_ld['@type'], str) else json_ld['@type'][-1],
        'status': json_ld.get('status', 'active'),
        'json_ld': json_ld,
        'risk_score': risk_score['score'],
        'risk_level': risk_score['level'],
        'processes_personal_data': json_ld.get('hasComplianceProfile', {}).get('processesPersonalData', False),
        'compliance_frameworks': json_ld.get('hasComplianceProfile', {}).get('subjectToFramework', []),
        'compliance_status': compliance_status['status']
    }).execute()
    
    if result.data:
        return result.data[0]
    else:
        raise HTTPException(status_code=500, detail="Failed to create agent")

@app.get("/agents", response_model=List[AgentResponse])
async def list_agents(risk_level: Optional[str] = None, status: Optional[str] = None):
    """List all agents with optional filtering"""
    
    query = supabase.table('agents').select('*')
    
    if risk_level:
        query = query.eq('risk_level', risk_level)
    if status:
        query = query.eq('status', status)
    
    result = query.execute()
    return result.data

@app.get("/agents/{agent_id}")
async def get_agent(agent_id: str):
    """Get specific agent details"""
    
    result = supabase.table('agents').select('*').eq('agent_id', agent_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return result.data[0]

@app.get("/graph/data")
async def get_graph_data():
    """Get graph data for visualization"""
    
    # Fetch agents
    agents_result = supabase.table('agents').select('*').execute()
    agents = agents_result.data
    
    # Fetch relationships
    rels_result = supabase.table('agent_relationships').select('*').execute()
    relationships = rels_result.data
    
    # Transform to D3/Vis.js format
    nodes = [
        {
            'id': a['id'],
            'name': a['name'],
            'type': a['type'],
            'riskScore': a['risk_score'],
            'riskLevel': a['risk_level'],
            'status': a['status']
        }
        for a in agents
    ]
    
    links = [
        {
            'source': r['source_agent_id'],
            'target': r['target_agent_id'],
            'type': r['relationship_type']
        }
        for r in relationships
    ]
    
    return {'nodes': nodes, 'links': links}

@app.post("/graph/query")
async def query_graph(query: Dict[str, Any]):
    """Execute graph query (e.g., find paths, detect escalation)"""
    
    query_type = query.get('type')
    
    if query_type == 'pii_access':
        # Find agents with PII access
        result = supabase.rpc('find_pii_access_paths').execute()
        return result.data
    
    elif query_type == 'privilege_escalation':
        # Find privilege escalation paths
        result = supabase.rpc('find_privilege_escalation').execute()
        return result.data
    
    else:
        raise HTTPException(status_code=400, detail="Unknown query type")

@app.get("/compliance/report")
async def compliance_report(framework: Optional[str] = None):
    """Generate compliance report"""
    
    query = supabase.table('agents').select('*')
    
    if framework:
        query = query.contains('compliance_frameworks', [framework])
    
    result = query.execute()
    agents = result.data
    
    compliant = [a for a in agents if a['compliance_status'] == 'COMPLIANT']
    non_compliant = [a for a in agents if a['compliance_status'] == 'NON_COMPLIANT']
    
    return {
        'framework': framework or 'ALL',
        'total_agents': len(agents),
        'compliant': len(compliant),
        'non_compliant': len(non_compliant),
        'compliance_rate': len(compliant) / len(agents) if agents else 0,
        'violations': [
            {
                'agent': a['name'],
                'issues': a.get('json_ld', {}).get('violations', [])
            }
            for a in non_compliant
        ]
    }

def calculate_risk_score(json_ld: dict) -> dict:
    """Calculate risk score from agent JSON-LD"""
    score = 0
    
    # Data processing risk
    if json_ld.get('hasComplianceProfile', {}).get('processesPersonalData'):
        score += 20
    
    # Vulnerability risk
    vulnerabilities = json_ld.get('hasSecurityProfile', {}).get('hasVulnerability', [])
    score += len(vulnerabilities) * 15
    
    # Security control mitigation
    controls = json_ld.get('hasSecurityProfile', {}).get('hasSecurityControl', [])
    score -= len(controls) * 5
    
    # Permission risk
    permissions = json_ld.get('hasSecurityProfile', {}).get('hasPermission', [])
    admin_perms = [p for p in permissions if p.get('@type') == 'AdminPermission']
    score += len(admin_perms) * 10
    
    score = max(0, min(100, score))
    
    # Determine level
    if score >= 70:
        level = 'Critical'
    elif score >= 50:
        level = 'High'
    elif score >= 30:
        level = 'Medium'
    else:
        level = 'Low'
    
    return {'score': score, 'level': level}

def check_compliance(json_ld: dict) -> dict:
    """Check compliance status"""
    violations = []
    profile = json_ld.get('hasComplianceProfile', {})
    
    # GDPR checks
    if 'GDPR' in profile.get('subjectToFramework', []):
        if profile.get('processesPersonalData') and not profile.get('hasLegalBasis'):
            violations.append('GDPR Article 6: Missing legal basis')
        if profile.get('processesPersonalData') and not profile.get('purpose'):
            violations.append('GDPR Article 5: Missing purpose')
    
    status = 'COMPLIANT' if not violations else 'NON_COMPLIANT'
    return {'status': status, 'violations': violations}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 5. Cost Breakdown

### Infrastructure Costs (Monthly)

| Component | Tool | Cost |
|-----------|------|------|
| **Database** | Supabase (Pro) | £25/month |
| **Storage** | Supabase (included) | £0 |
| **Auth** | Supabase (included) | £0 |
| **Real-time** | Supabase (included) | £0 |
| **Edge Functions** | Supabase (500K invocations) | £0 |
| **Backend** | Railway/Render (hobby) | £5-10/month |
| **Graphing** | D3.js/Vis.js/Cytoscape (CDN) | £0 |
| **Frontend Hosting** | Vercel/Netlify (free tier) | £0 |
| **Domain** | Namecheap | £1/month |
| **Total** | | **£31-36/month** |

**Scaling:**
- 500 agents: £31-36/month
- 5,000 agents: £50-75/month (Supabase scales automatically)
- 50,000 agents: £200-300/month

**vs. Complex Architecture:**
- Neo4j Enterprise: £5,000-10,000/month
- AWS/Azure managed services: £500-2,000/month
- Custom infrastructure: £1,000+/month

**Savings: 95-98%**

---

## 6. Deployment Guide

### Step 1: Set up Supabase

```bash
# Create Supabase project at https://supabase.com
# Copy URL and anon key

# Run SQL from section 2.1 in Supabase SQL editor
# Enable Row Level Security (RLS) for tables
```

### Step 2: Deploy Backend

```bash
# Clone repo
git clone your-repo
cd paso-backend

# Install dependencies
pip install fastapi uvicorn supabase python-dotenv

# Create .env
cat > .env << EOF
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
EOF

# Run locally
uvicorn main:app --reload

# Deploy to Railway
railway login
railway init
railway up
```

### Step 3: Deploy Frontend

```bash
# Clone frontend
cd paso-frontend

# Install dependencies
npm install

# Build
npm run build

# Deploy to Vercel
vercel --prod
```

### Step 4: Load Sample Data

```python
# load_sample_agents.py
import json
from supabase import create_client

supabase = create_client('URL', 'KEY')

with open('agents/agent-sales-001.json') as f:
    agent = json.load(f)

# Call API to register
import requests
requests.post('https://your-api.com/agents', json={'json_ld': agent})
```

---

## 7. Summary

### What You Get

**✅ JSON-Native Ontologies**
- Schema.org aligned
- Developer-friendly
- Full validation via JSON Schema

**✅ Supabase PostgreSQL**
- Graph queries via recursive CTEs
- Real-time subscriptions
- Built-in auth & storage
- Serverless edge functions

**✅ Free Graph Visualization**
- D3.js force graphs
- Vis.js networks
- Mermaid diagrams
- Cytoscape.js analysis

**✅ Production-Ready**
- FastAPI backend
- Type-safe SDKs
- Real-time updates
- Audit logging

**✅ Cost-Effective**
- £31-36/month for 500 agents
- 95-98% cheaper than enterprise solutions
- Scales to thousands of agents
- No vendor lock-in

### Perfect For

- Startups building agentic platforms
- Consultancies delivering agent projects
- SMBs needing governance
- Proof-of-concepts and MVPs
- Anyone wanting semantic security without the complexity

---

**Document Control**
- **Version**: 1.0
- **Architecture**: Simplified & Cost-Optimized
- **Stack**: Supabase + FastAPI + Free Visualization
- **Total Monthly Cost**: £31-36

