# BAIV P1-P4 Agent Implementation Templates
## Production-Ready Hybrid Architecture

## 1. Shared Infrastructure Setup

### 1.1 Supabase Schema for P1-P4 Agents

```sql
-- Agent-specific tables for P1-P4
CREATE TABLE ontology_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id),
  client_id UUID NOT NULL,
  entity_type VARCHAR(100),
  entity_name TEXT,
  ontology_match JSONB,
  confidence_score DECIMAL(3,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by VARCHAR(50) DEFAULT 'P1'
);

CREATE TABLE baseline_audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id),
  client_id UUID NOT NULL,
  audit_type VARCHAR(100),
  current_state JSONB,
  gaps_identified JSONB,
  recommendations JSONB,
  priority_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by VARCHAR(50) DEFAULT 'P2'
);

CREATE TABLE voice_captures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id),
  client_id UUID NOT NULL,
  source VARCHAR(100), -- 'reviews', 'support', 'social', 'surveys'
  sentiment_score DECIMAL(3,2),
  themes JSONB,
  insights JSONB,
  raw_samples JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by VARCHAR(50) DEFAULT 'P3'
);

CREATE TABLE citation_strategies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id),
  client_id UUID NOT NULL,
  citation_source VARCHAR(200),
  authority_score DECIMAL(3,2),
  relevance_score DECIMAL(3,2),
  acquisition_strategy JSONB,
  priority_rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by VARCHAR(50) DEFAULT 'P4'
);

-- Indexes for performance
CREATE INDEX idx_ontology_client ON ontology_mappings(client_id);
CREATE INDEX idx_baseline_session ON baseline_audits(session_id);
CREATE INDEX idx_voice_themes ON voice_captures USING GIN (themes);
CREATE INDEX idx_citation_priority ON citation_strategies(priority_rank);
```

### 1.2 Shared Helper Functions

```javascript
// shared/agentHelpers.js
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

class AgentHelpers {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY
    });
    
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
  }
  
  async callClaude(systemPrompt, userPrompt, maxTokens = 4000) {
    try {
      const response = await this.anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: maxTokens,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userPrompt
          }
        ]
      });
      
      return response.content[0].text;
    } catch (error) {
      console.error('Claude API Error:', error);
      throw new Error(`Claude API failed: ${error.message}`);
    }
  }
  
  async parseJsonResponse(text) {
    // Extract JSON from Claude's response
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // Try to parse the entire response as JSON
    try {
      return JSON.parse(text);
    } catch {
      // If not JSON, return structured response
      return { raw_response: text };
    }
  }
  
  async logExecution(agentId, sessionId, inputData, outputData, executionTime) {
    const { data, error } = await this.supabase
      .from('agent_executions')
      .insert({
        agent_id: agentId,
        session_id: sessionId,
        input_data: inputData,
        output_data: outputData,
        execution_time_ms: executionTime,
        status: 'completed',
        completed_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Failed to log execution:', error);
    }
    
    return data;
  }
  
  async getSessionContext(sessionId) {
    const { data, error } = await this.supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    if (error) {
      throw new Error(`Failed to get session: ${error.message}`);
    }
    
    return data;
  }
  
  formatPromptWithContext(template, context) {
    let prompt = template;
    
    // Replace placeholders with context values
    Object.keys(context).forEach(key => {
      const placeholder = `{{${key}}}`;
      const value = typeof context[key] === 'object' 
        ? JSON.stringify(context[key], null, 2) 
        : context[key];
      prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return prompt;
  }
}

module.exports = AgentHelpers;
```

---

## 2. P1: Ontology Mapper Agent

### 2.1 Core Implementation

```javascript
// agents/P1_OntologyMapper.js
const AgentHelpers = require('../shared/agentHelpers');

class P1_OntologyMapper {
  constructor() {
    this.helpers = new AgentHelpers();
    this.agentId = 'P1';
    this.systemPrompt = `You are an expert Ontology Mapping specialist for AI Visibility optimization.
Your role is to map business entities to standardized ontologies that enhance AI understanding.

Key responsibilities:
1. Identify entity types (Organization, Product, Service, Person, Location, Event, Concept)
2. Map to schema.org and industry-specific ontologies
3. Establish hierarchical relationships
4. Identify semantic connections
5. Score confidence levels for each mapping

Always return structured JSON with your analysis.`;
  }
  
  async execute(sessionId, inputData) {
    const startTime = Date.now();
    
    try {
      // Get session context
      const session = await this.helpers.getSessionContext(sessionId);
      
      // Build the user prompt
      const userPrompt = this.buildPrompt(inputData, session.context);
      
      // Call Claude
      const response = await this.helpers.callClaude(
        this.systemPrompt,
        userPrompt,
        4000
      );
      
      // Parse response
      const mappings = await this.helpers.parseJsonResponse(response);
      
      // Store results in Supabase
      await this.storeMappings(sessionId, session.client_id, mappings);
      
      // Log execution
      const executionTime = Date.now() - startTime;
      await this.helpers.logExecution(
        this.agentId,
        sessionId,
        inputData,
        mappings,
        executionTime
      );
      
      return {
        success: true,
        agent: this.agentId,
        mappings: mappings,
        execution_time: executionTime
      };
      
    } catch (error) {
      console.error('P1 Execution Error:', error);
      throw error;
    }
  }
  
  buildPrompt(inputData, context) {
    return `
Context:
- Industry: ${context.industry}
- Company: ${inputData.company_name}
- Description: ${inputData.company_description}
- Products/Services: ${JSON.stringify(inputData.products_services)}
- Key Entities to Map: ${JSON.stringify(inputData.entities)}

Task:
Analyze the provided entities and map them to appropriate ontologies for optimal AI visibility.

Requirements:
1. For each entity, provide:
   - entity_name: The original entity name
   - entity_type: Classification (Organization, Product, Service, etc.)
   - schema_org_type: Most specific schema.org type
   - properties: Relevant schema.org properties
   - relationships: Connections to other entities
   - confidence_score: 0.0 to 1.0

2. Also provide:
   - knowledge_graph: Visual representation of entity relationships
   - recommendations: Suggestions for improving entity definitions
   - gaps: Missing entities that should be defined

Return your complete analysis as a JSON object with the following structure:
{
  "entity_mappings": [],
  "knowledge_graph": {},
  "recommendations": [],
  "gaps": [],
  "overall_coverage_score": 0.0
}`;
  }
  
  async storeMappings(sessionId, clientId, mappings) {
    // Store individual entity mappings
    if (mappings.entity_mappings && Array.isArray(mappings.entity_mappings)) {
      for (const mapping of mappings.entity_mappings) {
        await this.helpers.supabase
          .from('ontology_mappings')
          .insert({
            session_id: sessionId,
            client_id: clientId,
            entity_type: mapping.entity_type,
            entity_name: mapping.entity_name,
            ontology_match: {
              schema_org_type: mapping.schema_org_type,
              properties: mapping.properties,
              relationships: mapping.relationships
            },
            confidence_score: mapping.confidence_score,
            metadata: {
              recommendations: mappings.recommendations,
              gaps: mappings.gaps
            }
          });
      }
    }
    
    // Update session context with ontology data
    await this.helpers.supabase
      .from('sessions')
      .update({
        context: {
          ontology_mapped: true,
          coverage_score: mappings.overall_coverage_score,
          knowledge_graph: mappings.knowledge_graph
        }
      })
      .eq('id', sessionId);
  }
}

module.exports = P1_OntologyMapper;
```

### 2.2 N8n Workflow for P1

```json
{
  "name": "P1_Ontology_Mapper_Workflow",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "p1-ontology-mapper",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300],
      "webhookId": "p1-webhook"
    },
    {
      "parameters": {
        "functionCode": "const P1_OntologyMapper = require('./agents/P1_OntologyMapper');\nconst agent = new P1_OntologyMapper();\n\nconst sessionId = $json.session_id;\nconst inputData = $json.input_data;\n\ntry {\n  const result = await agent.execute(sessionId, inputData);\n  return result;\n} catch (error) {\n  throw new Error(`P1 Agent failed: ${error.message}`);\n}"
      },
      "name": "Execute P1 Agent",
      "type": "n8n-nodes-base.function",
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$json.success}}",
              "value2": true
            }
          ]
        }
      },
      "name": "Check Success",
      "type": "n8n-nodes-base.if",
      "position": [650, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "success"
            }
          ]
        },
        "options": {}
      },
      "name": "Success Response",
      "type": "n8n-nodes-base.set",
      "position": [850, 250]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "error"
            },
            {
              "name": "error",
              "value": "={{$json.error}}"
            }
          ]
        }
      },
      "name": "Error Response",
      "type": "n8n-nodes-base.set",
      "position": [850, 350]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Execute P1 Agent", "type": "main", "index": 0}]]
    },
    "Execute P1 Agent": {
      "main": [[{"node": "Check Success", "type": "main", "index": 0}]]
    },
    "Check Success": {
      "main": [
        [{"node": "Success Response", "type": "main", "index": 0}],
        [{"node": "Error Response", "type": "main", "index": 0}]
      ]
    }
  }
}
```

---

## 3. P2: Baseline Auditor Agent

### 3.1 Core Implementation

```javascript
// agents/P2_BaselineAuditor.js
const AgentHelpers = require('../shared/agentHelpers');

class P2_BaselineAuditor {
  constructor() {
    this.helpers = new AgentHelpers();
    this.agentId = 'P2';
    this.systemPrompt = `You are an AI Visibility Baseline Auditor specializing in comprehensive assessment of current AI discovery presence.

Your audit covers:
1. Current AI platform visibility (ChatGPT, Perplexity, Claude, Bing Chat, Google SGE)
2. Traditional SEO performance and readiness for AI
3. Structured data implementation
4. Content quality and depth for AI consumption
5. Technical infrastructure for AI crawlers
6. Competitor AI visibility comparison
7. Citation and authority signals

Provide detailed gap analysis and prioritized recommendations.
Always return structured JSON with your complete audit.`;
  }
  
  async execute(sessionId, inputData) {
    const startTime = Date.now();
    
    try {
      const session = await this.helpers.getSessionContext(sessionId);
      
      // Get ontology mappings from P1 if available
      const ontologyData = await this.getOntologyContext(sessionId);
      
      const userPrompt = this.buildPrompt(inputData, session.context, ontologyData);
      
      const response = await this.helpers.callClaude(
        this.systemPrompt,
        userPrompt,
        6000 // Larger token limit for comprehensive audit
      );
      
      const audit = await this.helpers.parseJsonResponse(response);
      
      await this.storeAudit(sessionId, session.client_id, audit);
      
      const executionTime = Date.now() - startTime;
      await this.helpers.logExecution(
        this.agentId,
        sessionId,
        inputData,
        audit,
        executionTime
      );
      
      return {
        success: true,
        agent: this.agentId,
        audit: audit,
        execution_time: executionTime
      };
      
    } catch (error) {
      console.error('P2 Execution Error:', error);
      throw error;
    }
  }
  
  buildPrompt(inputData, context, ontologyData) {
    return `
Context:
- Industry: ${context.industry}
- Company: ${inputData.company_name}
- Website: ${inputData.website_url}
- Competitors: ${JSON.stringify(inputData.competitors)}
- Current Marketing Channels: ${JSON.stringify(inputData.current_channels)}
- Ontology Coverage Score: ${ontologyData?.coverage_score || 'Not assessed'}

Current State Data:
- SEO Metrics: ${JSON.stringify(inputData.seo_metrics || {})}
- Content Inventory: ${JSON.stringify(inputData.content_summary || {})}
- Technical Stack: ${JSON.stringify(inputData.tech_stack || {})}

Task:
Conduct a comprehensive AI Visibility baseline audit.

Required Analysis:

1. AI Platform Visibility Assessment:
   - Presence in ChatGPT responses
   - Perplexity citations
   - Bing Chat visibility
   - Google SGE appearance
   - Other AI platforms

2. Content Readiness:
   - Depth and comprehensiveness
   - Structured data implementation
   - FAQ and Q&A content
   - Semantic coverage

3. Technical Assessment:
   - Site speed and Core Web Vitals
   - Crawlability for AI bots
   - API availability
   - Schema markup implementation

4. Authority Signals:
   - Citation quality
   - Backlink profile
   - Knowledge panel presence
   - Wikipedia mentions

5. Competitive Analysis:
   - Competitor AI visibility scores
   - Gap identification
   - Opportunity areas

Return comprehensive JSON audit:
{
  "overall_score": 0.0,
  "ai_platform_scores": {},
  "content_assessment": {},
  "technical_assessment": {},
  "authority_assessment": {},
  "competitive_position": {},
  "critical_gaps": [],
  "recommendations": [],
  "priority_roadmap": [],
  "estimated_impact": {}
}`;
  }
  
  async getOntologyContext(sessionId) {
    const { data } = await this.helpers.supabase
      .from('ontology_mappings')
      .select('*')
      .eq('session_id', sessionId)
      .order('confidence_score', { ascending: false });
    
    return data;
  }
  
  async storeAudit(sessionId, clientId, audit) {
    // Store main audit record
    await this.helpers.supabase
      .from('baseline_audits')
      .insert({
        session_id: sessionId,
        client_id: clientId,
        audit_type: 'comprehensive_ai_visibility',
        current_state: {
          overall_score: audit.overall_score,
          ai_platform_scores: audit.ai_platform_scores,
          content_assessment: audit.content_assessment,
          technical_assessment: audit.technical_assessment,
          authority_assessment: audit.authority_assessment
        },
        gaps_identified: audit.critical_gaps,
        recommendations: {
          immediate: audit.recommendations.filter(r => r.priority === 'high'),
          short_term: audit.recommendations.filter(r => r.priority === 'medium'),
          long_term: audit.recommendations.filter(r => r.priority === 'low')
        },
        priority_score: Math.round(audit.overall_score * 100)
      });
    
    // Update session with audit results
    await this.helpers.supabase
      .from('sessions')
      .update({
        context: {
          baseline_completed: true,
          baseline_score: audit.overall_score,
          critical_gaps: audit.critical_gaps.length,
          next_steps: audit.priority_roadmap.slice(0, 3)
        }
      })
      .eq('id', sessionId);
  }
}

module.exports = P2_BaselineAuditor;
```

---

## 4. P3: Voice Capture Agent

### 4.1 Core Implementation

```javascript
// agents/P3_VoiceCapture.js
const AgentHelpers = require('../shared/agentHelpers');

class P3_VoiceCapture {
  constructor() {
    this.helpers = new AgentHelpers();
    this.agentId = 'P3';
    this.systemPrompt = `You are a Voice of Customer specialist for AI Visibility optimization.

Your expertise includes:
1. Analyzing customer feedback for AI-relevant insights
2. Identifying language patterns that AI systems recognize
3. Extracting themes and sentiments from reviews, support tickets, and social media
4. Understanding user query formulation and intent
5. Identifying content gaps based on customer questions
6. Recognizing terminology mismatches between company and customer language

Focus on insights that will improve AI discovery and responses about the company.
Always return structured JSON with actionable insights.`;
  }
  
  async execute(sessionId, inputData) {
    const startTime = Date.now();
    
    try {
      const session = await this.helpers.getSessionContext(sessionId);
      
      const userPrompt = this.buildPrompt(inputData, session.context);
      
      const response = await this.helpers.callClaude(
        this.systemPrompt,
        userPrompt,
        5000
      );
      
      const voiceAnalysis = await this.helpers.parseJsonResponse(response);
      
      await this.storeVoiceCapture(sessionId, session.client_id, voiceAnalysis);
      
      const executionTime = Date.now() - startTime;
      await this.helpers.logExecution(
        this.agentId,
        sessionId,
        inputData,
        voiceAnalysis,
        executionTime
      );
      
      return {
        success: true,
        agent: this.agentId,
        analysis: voiceAnalysis,
        execution_time: executionTime
      };
      
    } catch (error) {
      console.error('P3 Execution Error:', error);
      throw error;
    }
  }
  
  buildPrompt(inputData, context) {
    return `
Context:
- Industry: ${context.industry}
- Company: ${inputData.company_name}

Customer Voice Data:
- Reviews: ${JSON.stringify(inputData.reviews || [])}
- Support Tickets: ${JSON.stringify(inputData.support_tickets || [])}
- Social Media Mentions: ${JSON.stringify(inputData.social_mentions || [])}
- Survey Responses: ${JSON.stringify(inputData.surveys || [])}
- Search Queries: ${JSON.stringify(inputData.search_queries || [])}

Task:
Analyze the voice of customer data to extract AI visibility insights.

Required Analysis:

1. Language Patterns:
   - How customers describe the company/products
   - Common phrases and terminology used
   - Query formulation patterns
   - Intent expressions

2. Sentiment Analysis:
   - Overall sentiment distribution
   - Sentiment by topic/feature
   - Emotional triggers
   - Trust indicators

3. Theme Extraction:
   - Major discussion themes
   - Frequently asked questions
   - Pain points and needs
   - Desired outcomes

4. Content Gaps:
   - Questions without good answers
   - Misunderstood features
   - Missing information
   - Clarification needs

5. AI Optimization Opportunities:
   - Natural language patterns to target
   - FAQ content recommendations
   - Semantic gaps to fill
   - Authority-building opportunities

Return comprehensive JSON analysis:
{
  "overall_sentiment": 0.0,
  "language_patterns": {
    "common_phrases": [],
    "customer_terminology": {},
    "query_patterns": []
  },
  "themes": {
    "primary_themes": [],
    "sentiment_by_theme": {},
    "frequency_by_theme": {}
  },
  "content_gaps": [],
  "faq_recommendations": [],
  "semantic_opportunities": [],
  "ai_visibility_insights": [],
  "priority_actions": []
}`;
  }
  
  async storeVoiceCapture(sessionId, clientId, analysis) {
    // Store voice analysis
    await this.helpers.supabase
      .from('voice_captures')
      .insert({
        session_id: sessionId,
        client_id: clientId,
        source: 'multi_channel_analysis',
        sentiment_score: analysis.overall_sentiment,
        themes: {
          primary: analysis.themes.primary_themes,
          sentiment_map: analysis.themes.sentiment_by_theme,
          frequency_map: analysis.themes.frequency_by_theme
        },
        insights: {
          language_patterns: analysis.language_patterns,
          content_gaps: analysis.content_gaps,
          ai_opportunities: analysis.ai_visibility_insights
        },
        raw_samples: analysis.language_patterns.common_phrases.slice(0, 10)
      });
    
    // Update session context
    await this.helpers.supabase
      .from('sessions')
      .update({
        context: {
          voice_captured: true,
          customer_sentiment: analysis.overall_sentiment,
          primary_themes: analysis.themes.primary_themes.slice(0, 5),
          content_gaps_identified: analysis.content_gaps.length
        }
      })
      .eq('id', sessionId);
  }
}

module.exports = P3_VoiceCapture;
```

---

## 5. P4: Citation Architect Agent

### 5.1 Core Implementation

```javascript
// agents/P4_CitationArchitect.js
const AgentHelpers = require('../shared/agentHelpers');

class P4_CitationArchitect {
  constructor() {
    this.helpers = new AgentHelpers();
    this.agentId = 'P4';
    this.systemPrompt = `You are a Citation Architect specializing in building authority for AI Visibility.

Your expertise covers:
1. Identifying high-value citation sources for AI systems
2. Wikipedia strategy and notability requirements
3. Academic and research citation opportunities
4. Industry publication and trade journal citations
5. Knowledge graph inclusion strategies
6. Building E-E-A-T signals for AI recognition
7. Creating citation-worthy content strategies

Focus on citations that AI systems prioritize when determining authority.
Always return structured JSON with actionable citation strategies.`;
  }
  
  async execute(sessionId, inputData) {
    const startTime = Date.now();
    
    try {
      const session = await this.helpers.getSessionContext(sessionId);
      
      // Get context from previous agents
      const ontologyData = await this.getAgentContext(sessionId, 'P1');
      const auditData = await this.getAgentContext(sessionId, 'P2');
      
      const userPrompt = this.buildPrompt(
        inputData, 
        session.context, 
        ontologyData, 
        auditData
      );
      
      const response = await this.helpers.callClaude(
        this.systemPrompt,
        userPrompt,
        5000
      );
      
      const citationStrategy = await this.helpers.parseJsonResponse(response);
      
      await this.storeCitationStrategy(sessionId, session.client_id, citationStrategy);
      
      const executionTime = Date.now() - startTime;
      await this.helpers.logExecution(
        this.agentId,
        sessionId,
        inputData,
        citationStrategy,
        executionTime
      );
      
      return {
        success: true,
        agent: this.agentId,
        strategy: citationStrategy,
        execution_time: executionTime
      };
      
    } catch (error) {
      console.error('P4 Execution Error:', error);
      throw error;
    }
  }
  
  buildPrompt(inputData, context, ontologyData, auditData) {
    return `
Context:
- Industry: ${context.industry}
- Company: ${inputData.company_name}
- Current Authority Score: ${auditData?.authority_assessment?.overall_score || 'Unknown'}
- Entity Types Mapped: ${ontologyData?.entity_types || 'Not mapped'}

Current Citation Profile:
- Existing Citations: ${JSON.stringify(inputData.existing_citations || [])}
- Backlink Profile: ${JSON.stringify(inputData.backlinks || {})}
- Media Mentions: ${JSON.stringify(inputData.media_mentions || [])}
- Research Papers: ${JSON.stringify(inputData.research_mentions || [])}

Competitor Citation Analysis:
${JSON.stringify(inputData.competitor_citations || {})}

Task:
Design a comprehensive citation architecture strategy for AI visibility.

Required Strategy Components:

1. Wikipedia Strategy:
   - Notability assessment
   - Required sources for inclusion
   - Article structure recommendations
   - Neutral point of view approach

2. Academic Citations:
   - Research collaboration opportunities
   - White paper topics
   - Case study potential
   - Academic partnership targets

3. Industry Publications:
   - Target publications by authority
   - Thought leadership topics
   - Expert positioning angles
   - PR strategy for citations

4. Knowledge Graph Inclusion:
   - Entity home requirements
   - Structured data for knowledge panels
   - Authoritative source connections
   - Verification requirements

5. Content Citation Strategy:
   - Citation-worthy content types
   - Original research opportunities
   - Data and statistics creation
   - Expert quote positioning

6. Implementation Roadmap:
   - Priority citation targets
   - Acquisition strategies
   - Timeline and milestones
   - Success metrics

Return comprehensive JSON strategy:
{
  "authority_baseline": 0.0,
  "citation_opportunities": {
    "wikipedia": {},
    "academic": {},
    "industry": {},
    "knowledge_graph": {},
    "media": {}
  },
  "content_strategy": {
    "citation_worthy_topics": [],
    "original_research": [],
    "data_creation": []
  },
  "priority_targets": [],
  "implementation_roadmap": [],
  "estimated_authority_lift": 0.0,
  "success_metrics": {},
  "quick_wins": [],
  "long_term_plays": []
}`;
  }
  
  async getAgentContext(sessionId, agentId) {
    const { data } = await this.helpers.supabase
      .from('agent_executions')
      .select('output_data')
      .eq('session_id', sessionId)
      .eq('agent_id', agentId)
      .order('completed_at', { ascending: false })
      .limit(1);
    
    return data?.[0]?.output_data || null;
  }
  
  async storeCitationStrategy(sessionId, clientId, strategy) {
    // Store priority citation targets
    if (strategy.priority_targets && Array.isArray(strategy.priority_targets)) {
      for (let i = 0; i < strategy.priority_targets.length; i++) {
        const target = strategy.priority_targets[i];
        
        await this.helpers.supabase
          .from('citation_strategies')
          .insert({
            session_id: sessionId,
            client_id: clientId,
            citation_source: target.source,
            authority_score: target.authority_score || 0,
            relevance_score: target.relevance_score || 0,
            acquisition_strategy: {
              approach: target.approach,
              timeline: target.timeline,
              resources_required: target.resources
            },
            priority_rank: i + 1
          });
      }
    }
    
    // Update session with strategy summary
    await this.helpers.supabase
      .from('sessions')
      .update({
        context: {
          citation_strategy_complete: true,
          authority_baseline: strategy.authority_baseline,
          estimated_authority_lift: strategy.estimated_authority_lift,
          quick_wins: strategy.quick_wins.slice(0, 3),
          priority_citations: strategy.priority_targets.slice(0, 5).map(t => t.source)
        }
      })
      .eq('id', sessionId);
  }
}

module.exports = P4_CitationArchitect;
```

---

## 6. Master Orchestrator N8n Workflow

### 6.1 Orchestrator for P1-P4 Sequential Execution

```json
{
  "name": "P1_P4_Master_Orchestrator",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "execute-foundation-agents",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Start Foundation Analysis",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 400]
    },
    {
      "parameters": {
        "functionCode": "// Initialize session in Supabase\nconst { createClient } = require('@supabase/supabase-js');\nconst supabase = createClient(\n  process.env.SUPABASE_URL,\n  process.env.SUPABASE_SERVICE_KEY\n);\n\n// Create session\nconst { data: session } = await supabase\n  .from('sessions')\n  .insert({\n    client_id: $json.client_id,\n    context: {\n      industry: $json.industry,\n      company_name: $json.company_name,\n      objectives: $json.objectives,\n      workflow: 'foundation_agents_p1_p4'\n    }\n  })\n  .select()\n  .single();\n\nreturn {\n  session_id: session.id,\n  client_id: session.client_id,\n  input_data: $json\n};"
      },
      "name": "Create Session",
      "type": "n8n-nodes-base.function",
      "position": [450, 400]
    },
    {
      "parameters": {
        "url": "={{$env.N8N_BASE_URL}}/webhook/p1-ontology-mapper",
        "method": "POST",
        "bodyParameters": {
          "parameters": [
            {
              "name": "session_id",
              "value": "={{$json.session_id}}"
            },
            {
              "name": "input_data",
              "value": "={{$json.input_data}}"
            }
          ]
        },
        "options": {}
      },
      "name": "Execute P1 Ontology",
      "type": "n8n-nodes-base.httpRequest",
      "position": [650, 400]
    },
    {
      "parameters": {
        "url": "={{$env.N8N_BASE_URL}}/webhook/p2-baseline-auditor",
        "method": "POST",
        "bodyParameters": {
          "parameters": [
            {
              "name": "session_id",
              "value": "={{$json.session_id}}"
            },
            {
              "name": "input_data",
              "value": "={{$json.input_data}}"
            },
            {
              "name": "p1_results",
              "value": "={{$node['Execute P1 Ontology'].json}}"
            }
          ]
        }
      },
      "name": "Execute P2 Baseline",
      "type": "n8n-nodes-base.httpRequest",
      "position": [850, 400]
    },
    {
      "parameters": {
        "batchSize": 2,
        "options": {}
      },
      "name": "Parallel P3 and P4",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [1050, 400]
    },
    {
      "parameters": {
        "url": "={{$env.N8N_BASE_URL}}/webhook/p3-voice-capture",
        "method": "POST",
        "bodyParameters": {
          "parameters": [
            {
              "name": "session_id",
              "value": "={{$json.session_id}}"
            },
            {
              "name": "input_data",
              "value": "={{$json.input_data}}"
            }
          ]
        }
      },
      "name": "Execute P3 Voice",
      "type": "n8n-nodes-base.httpRequest",
      "position": [1250, 350]
    },
    {
      "parameters": {
        "url": "={{$env.N8N_BASE_URL}}/webhook/p4-citation-architect",
        "method": "POST",
        "bodyParameters": {
          "parameters": [
            {
              "name": "session_id",
              "value": "={{$json.session_id}}"
            },
            {
              "name": "input_data",
              "value": "={{$json.input_data}}"
            }
          ]
        }
      },
      "name": "Execute P4 Citation",
      "type": "n8n-nodes-base.httpRequest",
      "position": [1250, 450]
    },
    {
      "parameters": {},
      "name": "Merge Results",
      "type": "n8n-nodes-base.merge",
      "position": [1450, 400]
    },
    {
      "parameters": {
        "functionCode": "// Compile final results\nconst { createClient } = require('@supabase/supabase-js');\nconst supabase = createClient(\n  process.env.SUPABASE_URL,\n  process.env.SUPABASE_SERVICE_KEY\n);\n\n// Get complete session data\nconst { data: session } = await supabase\n  .from('sessions')\n  .select('*')\n  .eq('id', $json.session_id)\n  .single();\n\n// Get all agent results\nconst { data: agentResults } = await supabase\n  .from('agent_executions')\n  .select('*')\n  .eq('session_id', $json.session_id)\n  .in('agent_id', ['P1', 'P2', 'P3', 'P4'])\n  .order('completed_at');\n\n// Compile summary\nconst summary = {\n  session_id: session.id,\n  client_id: session.client_id,\n  execution_summary: {\n    total_agents: 4,\n    completed: agentResults.filter(r => r.status === 'completed').length,\n    total_time: agentResults.reduce((sum, r) => sum + (r.execution_time_ms || 0), 0)\n  },\n  results: {\n    ontology_coverage: session.context.coverage_score,\n    baseline_score: session.context.baseline_score,\n    customer_sentiment: session.context.customer_sentiment,\n    authority_baseline: session.context.authority_baseline\n  },\n  next_steps: [\n    ...session.context.next_steps || [],\n    ...session.context.quick_wins || []\n  ],\n  ready_for_mvp2: session.context.coverage_score > 0.7 && session.context.baseline_score > 0.5\n};\n\nreturn summary;"
      },
      "name": "Compile Results",
      "type": "n8n-nodes-base.function",
      "position": [1650, 400]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "complete"
            }
          ]
        },
        "options": {}
      },
      "name": "Return Success",
      "type": "n8n-nodes-base.set",
      "position": [1850, 400]
    }
  ]
}
```

---

## 7. Testing & Monitoring Setup

### 7.1 Test Data Generator

```javascript
// test/generateTestData.js
function generateTestData() {
  return {
    client_id: "test-client-001",
    company_name: "TechVision AI Solutions",
    industry: "B2B SaaS",
    company_description: "AI-powered analytics platform for enterprises",
    
    // P1 Test Data
    entities: [
      "TechVision AI Solutions",
      "PredictiveInsights Dashboard",
      "DataStream API",
      "Michael Chen (CEO)",
      "San Francisco HQ"
    ],
    products_services: [
      {
        name: "PredictiveInsights",
        type: "Software Platform",
        description: "Real-time predictive analytics"
      },
      {
        name: "DataStream API",
        type: "API Service",
        description: "Enterprise data integration API"
      }
    ],
    
    // P2 Test Data
    website_url: "https://techvision.ai",
    competitors: ["Datadog", "Splunk", "New Relic"],
    current_channels: ["SEO", "Google Ads", "LinkedIn", "Content Marketing"],
    seo_metrics: {
      domain_authority: 42,
      organic_traffic: 15000,
      keywords_ranking: 450
    },
    
    // P3 Test Data
    reviews: [
      "Great platform for real-time analytics, helps us track KPIs effectively",
      "The predictive features are game-changing for our operations",
      "Support team is responsive but documentation could be better"
    ],
    support_tickets: [
      "How do I integrate with Salesforce?",
      "Can we customize the dashboard colors?",
      "Need help with API rate limits"
    ],
    
    // P4 Test Data
    existing_citations: [
      "TechCrunch article on AI startups",
      "Gartner report mention"
    ],
    media_mentions: [
      {
        source: "VentureBeat",
        type: "Article",
        date: "2024-06"
      }
    ]
  };
}

module.exports = generateTestData;
```

### 7.2 Monitoring Dashboard Query

```sql
-- Supabase SQL for monitoring dashboard
CREATE VIEW agent_performance_dashboard AS
SELECT 
  ae.agent_id,
  COUNT(*) as total_executions,
  AVG(ae.execution_time_ms) as avg_execution_time,
  MIN(ae.execution_time_ms) as min_execution_time,
  MAX(ae.execution_time_ms) as max_execution_time,
  SUM(CASE WHEN ae.status = 'completed' THEN 1 ELSE 0 END) as successful,
  SUM(CASE WHEN ae.status = 'failed' THEN 1 ELSE 0 END) as failed,
  ROUND(
    SUM(CASE WHEN ae.status = 'completed' THEN 1 ELSE 0 END)::numeric / 
    COUNT(*)::numeric * 100, 
    2
  ) as success_rate
FROM agent_executions ae
WHERE ae.agent_id IN ('P1', 'P2', 'P3', 'P4')
  AND ae.created_at > NOW() - INTERVAL '7 days'
GROUP BY ae.agent_id
ORDER BY ae.agent_id;
```

---

## 8. Quick Start Guide

### 8.1 Environment Setup

```bash
# .env file
CLAUDE_API_KEY=your-claude-api-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
N8N_BASE_URL=http://localhost:5678
NODE_ENV=development
```

### 8.2 Installation Steps

```bash
# 1. Install dependencies
npm install @anthropic-ai/sdk @supabase/supabase-js

# 2. Run Supabase migrations
npx supabase db push

# 3. Deploy agent code
cp -r agents/ /path/to/n8n/custom/

# 4. Import N8n workflows
# Use N8n UI to import the JSON workflows

# 5. Test individual agents
npm test agents/P1_OntologyMapper.test.js

# 6. Run integration test
npm run test:integration
```

### 8.3 First Execution

```javascript
// Execute via API
const axios = require('axios');

async function executeFoundationAgents() {
  const testData = generateTestData();
  
  const response = await axios.post(
    'http://localhost:5678/webhook/execute-foundation-agents',
    testData
  );
  
  console.log('Execution Result:', response.data);
}

executeFoundationAgents();
```

---

## 9. Production Checklist

- [ ] API keys configured in environment variables
- [ ] Supabase tables created with proper indexes
- [ ] N8n workflows imported and webhook URLs configured  
- [ ] Error handling tested with invalid inputs
- [ ] Rate limiting configured for Claude API
- [ ] Monitoring dashboard accessible
- [ ] Backup strategy for Supabase data
- [ ] Agent timeout settings configured (30s recommended)
- [ ] Logging configured for debugging
- [ ] Cost monitoring for Claude API usage

This implementation gives you production-ready agents P1-P4 with proper error handling, monitoring, and scalability built in from day one!