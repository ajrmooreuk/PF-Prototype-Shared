# BAIV Po Master Orchestrator, Industry Templates & Dashboard

## 1. Po Master Orchestrator Implementation

### 1.1 Po Orchestrator Core Logic

```javascript
// orchestrators/Po_MasterOrchestrator.js
const AgentHelpers = require('../shared/agentHelpers');

class Po_MasterOrchestrator {
  constructor() {
    this.helpers = new AgentHelpers();
    this.orchestratorId = 'Po';
    this.industryTemplates = require('./industryTemplates');
    
    // Agent capability matrix
    this.agentCapabilities = {
      P1: { 
        type: 'foundation', 
        dependencies: [], 
        parallel: false,
        required: true,
        complexity: 'simple'
      },
      P2: { 
        type: 'foundation', 
        dependencies: ['P1'], 
        parallel: false,
        required: true,
        complexity: 'simple'
      },
      P3: { 
        type: 'insight', 
        dependencies: [], 
        parallel: true,
        required: false,
        complexity: 'simple'
      },
      P4: { 
        type: 'strategy', 
        dependencies: ['P1', 'P2'], 
        parallel: true,
        required: false,
        complexity: 'simple'
      },
      P5: { 
        type: 'strategy', 
        dependencies: ['P2', 'P3'], 
        parallel: false,
        required: false,
        complexity: 'integration'
      },
      P6: { 
        type: 'execution', 
        dependencies: ['P5'], 
        parallel: true,
        required: false,
        complexity: 'simple'
      },
      P7: { 
        type: 'advanced', 
        dependencies: ['P1', 'P4'], 
        parallel: false,
        required: false,
        complexity: 'complex'
      },
      P8: { 
        type: 'execution', 
        dependencies: ['P3', 'P5'], 
        parallel: true,
        required: false,
        complexity: 'integration'
      },
      P9: { 
        type: 'monitoring', 
        dependencies: ['P3'], 
        parallel: true,
        required: false,
        complexity: 'simple'
      },
      P10: { 
        type: 'optimization', 
        dependencies: ['P5', 'P3'], 
        parallel: false,
        required: false,
        complexity: 'complex'
      },
      P11: { 
        type: 'technical', 
        dependencies: ['P2'], 
        parallel: true,
        required: false,
        complexity: 'integration'
      },
      P12: { 
        type: 'analytics', 
        dependencies: [], 
        parallel: true,
        required: false,
        complexity: 'integration'
      },
      P13: { 
        type: 'innovation', 
        dependencies: [], 
        parallel: true,
        required: false,
        complexity: 'complex'
      },
      P14: { 
        type: 'advanced', 
        dependencies: ['P1'], 
        parallel: false,
        required: false,
        complexity: 'complex'
      },
      P15: { 
        type: 'intelligence', 
        dependencies: ['P2'], 
        parallel: true,
        required: false,
        complexity: 'integration'
      },
      P16: { 
        type: 'synthesis', 
        dependencies: ['all'], 
        parallel: false,
        required: false,
        complexity: 'complex'
      }
    };
  }
  
  async orchestrate(sessionId, context) {
    const startTime = Date.now();
    
    try {
      // Load session and determine strategy
      const session = await this.helpers.getSessionContext(sessionId);
      
      // Get industry template
      const industryTemplate = this.getIndustryTemplate(context.industry);
      
      // Determine which agents to activate
      const activationStrategy = await this.determineActivationStrategy(
        context,
        session,
        industryTemplate
      );
      
      // Build execution plan
      const executionPlan = this.buildExecutionPlan(activationStrategy);
      
      // Store orchestration plan
      await this.storeOrchestrationPlan(sessionId, executionPlan);
      
      // Execute agents according to plan
      const results = await this.executeAgentPlan(sessionId, executionPlan, context);
      
      // Log orchestration
      const executionTime = Date.now() - startTime;
      await this.logOrchestration(sessionId, executionPlan, results, executionTime);
      
      return {
        success: true,
        orchestrator: this.orchestratorId,
        execution_plan: executionPlan,
        results: results,
        execution_time: executionTime
      };
      
    } catch (error) {
      console.error('Po Orchestration Error:', error);
      throw error;
    }
  }
  
  async determineActivationStrategy(context, session, industryTemplate) {
    // Use Claude to intelligently determine agent activation
    const systemPrompt = `You are the Master Orchestrator for AI Visibility optimization.
    
Your role is to determine which agents to activate based on:
1. Client context and objectives
2. Industry requirements
3. Maturity level
4. Budget constraints
5. Timeline requirements

Agent capabilities:
${JSON.stringify(this.agentCapabilities, null, 2)}

Return a JSON object with agent activation decisions.`;
    
    const userPrompt = `
Context:
- Industry: ${context.industry}
- Company Size: ${context.company_size}
- Maturity Score: ${context.maturity_score || 'Unknown'}
- Objectives: ${JSON.stringify(context.objectives)}
- Budget: ${context.budget || 'Not specified'}
- Timeline: ${context.timeline || 'Standard'}
- Industry Requirements: ${JSON.stringify(industryTemplate.requirements)}

Determine which agents to activate for optimal results.

Consider:
1. Foundation agents (P1-P4) are typically required
2. Complex agents need more resources
3. Some agents can run in parallel
4. Dependencies must be respected
5. Budget and timeline constraints

Return JSON:
{
  "strategy_type": "foundation|comprehensive|advanced|custom",
  "active_agents": ["P1", "P2", ...],
  "rationale": "Explanation of choices",
  "estimated_duration": "time estimate",
  "priority_sequence": ["P1", "P2", ...],
  "parallel_groups": [["P3", "P4"], ...],
  "optional_agents": ["P5", ...],
  "success_criteria": {}
}`;
    
    const response = await this.helpers.callClaude(systemPrompt, userPrompt);
    return await this.helpers.parseJsonResponse(response);
  }
  
  buildExecutionPlan(strategy) {
    const plan = {
      strategy_type: strategy.strategy_type,
      phases: [],
      total_agents: strategy.active_agents.length,
      parallel_execution: strategy.parallel_groups.length > 0
    };
    
    // Phase 1: Foundation (always sequential)
    const foundationAgents = strategy.active_agents.filter(
      agent => ['P1', 'P2'].includes(agent)
    );
    if (foundationAgents.length > 0) {
      plan.phases.push({
        phase: 1,
        type: 'foundation',
        agents: foundationAgents,
        execution: 'sequential'
      });
    }
    
    // Phase 2: Parallel insights
    const parallelGroups = strategy.parallel_groups || [];
    parallelGroups.forEach((group, index) => {
      plan.phases.push({
        phase: 2 + index,
        type: 'parallel',
        agents: group,
        execution: 'parallel'
      });
    });
    
    // Phase 3: Advanced/Complex agents
    const complexAgents = strategy.active_agents.filter(
      agent => this.agentCapabilities[agent].complexity === 'complex'
    );
    if (complexAgents.length > 0) {
      plan.phases.push({
        phase: plan.phases.length + 1,
        type: 'advanced',
        agents: complexAgents,
        execution: 'sequential'
      });
    }
    
    // Phase 4: Synthesis (if P16 is active)
    if (strategy.active_agents.includes('P16')) {
      plan.phases.push({
        phase: plan.phases.length + 1,
        type: 'synthesis',
        agents: ['P16'],
        execution: 'single'
      });
    }
    
    return plan;
  }
  
  async executeAgentPlan(sessionId, plan, context) {
    const results = {
      phases: [],
      agents: {},
      errors: []
    };
    
    for (const phase of plan.phases) {
      const phaseResults = {
        phase: phase.phase,
        type: phase.type,
        agents: {}
      };
      
      if (phase.execution === 'sequential') {
        // Execute agents one by one
        for (const agentId of phase.agents) {
          try {
            const agentResult = await this.executeAgent(agentId, sessionId, context);
            phaseResults.agents[agentId] = agentResult;
            results.agents[agentId] = agentResult;
          } catch (error) {
            console.error(`Agent ${agentId} failed:`, error);
            results.errors.push({ agent: agentId, error: error.message });
          }
        }
      } else if (phase.execution === 'parallel') {
        // Execute agents in parallel
        const parallelPromises = phase.agents.map(agentId => 
          this.executeAgent(agentId, sessionId, context)
            .then(result => ({ agentId, result }))
            .catch(error => ({ agentId, error: error.message }))
        );
        
        const parallelResults = await Promise.all(parallelPromises);
        
        parallelResults.forEach(({ agentId, result, error }) => {
          if (error) {
            results.errors.push({ agent: agentId, error });
          } else {
            phaseResults.agents[agentId] = result;
            results.agents[agentId] = result;
          }
        });
      }
      
      results.phases.push(phaseResults);
    }
    
    return results;
  }
  
  async executeAgent(agentId, sessionId, context) {
    // This would call the actual agent implementation
    // For now, returning mock based on agent type
    const agentMap = {
      'simple': 'direct', // Claude Direct API
      'integration': 'n8n', // N8n workflow
      'complex': 'langchain' // LangChain agent
    };
    
    const complexity = this.agentCapabilities[agentId].complexity;
    const executionType = agentMap[complexity];
    
    // In production, this would trigger actual agent execution
    console.log(`Executing ${agentId} via ${executionType}`);
    
    // Simulate agent execution
    return {
      agent: agentId,
      status: 'completed',
      execution_type: executionType,
      timestamp: new Date().toISOString()
    };
  }
  
  getIndustryTemplate(industry) {
    // Load industry-specific template
    const template = this.industryTemplates[industry] || this.industryTemplates.default;
    return template;
  }
  
  async storeOrchestrationPlan(sessionId, plan) {
    await this.helpers.supabase
      .from('orchestration_plans')
      .insert({
        session_id: sessionId,
        plan_data: plan,
        created_at: new Date().toISOString()
      });
  }
  
  async logOrchestration(sessionId, plan, results, executionTime) {
    await this.helpers.supabase
      .from('orchestration_logs')
      .insert({
        session_id: sessionId,
        orchestrator_id: this.orchestratorId,
        plan: plan,
        results: results,
        execution_time_ms: executionTime,
        completed_at: new Date().toISOString()
      });
  }
}

module.exports = Po_MasterOrchestrator;
```

---

## 2. Industry Template System

### 2.1 Industry Templates with Square Bracket Variables

```javascript
// orchestrators/industryTemplates.js
const industryTemplates = {
  // Default template - base for all industries
  default: {
    industry: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["voice_capture", "citation_strategy"],
      optimization: ["content_strategy", "technical_optimization"]
    },
    prompts: {
      ontology: `Map [COMPANY_TYPE] entities including [PRIMARY_ENTITIES] to appropriate ontologies.
Focus on [INDUSTRY_SPECIFIC_SCHEMAS] schemas.
Consider [REGULATORY_REQUIREMENTS] compliance needs.`,
      
      baseline: `Audit [COMPANY_NAME]'s AI visibility in [INDUSTRY_VERTICAL].
Assess presence in [PRIMARY_AI_PLATFORMS].
Compare against [COMPETITOR_SET] competitors.
Evaluate [INDUSTRY_SPECIFIC_METRICS].`,
      
      voice: `Analyze customer voice data for [COMPANY_TYPE] in [MARKET_SEGMENT].
Focus on [CUSTOMER_PAIN_POINTS] and [VALUE_PROPOSITIONS].
Extract insights about [PRODUCT_CATEGORIES] and [SERVICE_OFFERINGS].`,
      
      citation: `Build citation strategy for [COMPANY_TYPE] in [INDUSTRY_VERTICAL].
Target [AUTHORITY_PUBLICATIONS] and [INDUSTRY_ASSOCIATIONS].
Focus on [CREDIBILITY_FACTORS] and [TRUST_SIGNALS].`
    },
    variables: {
      COMPANY_TYPE: "organization",
      PRIMARY_ENTITIES: "products, services, leadership, locations",
      INDUSTRY_SPECIFIC_SCHEMAS: "schema.org",
      REGULATORY_REQUIREMENTS: "standard",
      PRIMARY_AI_PLATFORMS: "ChatGPT, Perplexity, Claude, Bing Chat",
      COMPETITOR_SET: "top 5 industry",
      INDUSTRY_SPECIFIC_METRICS: "standard KPIs",
      MARKET_SEGMENT: "general market",
      CUSTOMER_PAIN_POINTS: "common challenges",
      VALUE_PROPOSITIONS: "key benefits",
      PRODUCT_CATEGORIES: "main offerings",
      SERVICE_OFFERINGS: "core services",
      AUTHORITY_PUBLICATIONS: "industry media",
      INDUSTRY_ASSOCIATIONS: "trade organizations",
      CREDIBILITY_FACTORS: "expertise, experience, results",
      TRUST_SIGNALS: "reviews, testimonials, certifications"
    }
  },
  
  // B2B SaaS Template
  b2b_saas: {
    industry: "b2b_saas",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["voice_capture", "citation_strategy", "technical_optimization"],
      optimization: ["content_strategy", "integration_documentation", "api_visibility"]
    },
    variables: {
      COMPANY_TYPE: "SaaS platform",
      PRIMARY_ENTITIES: "platform features, APIs, integrations, pricing tiers, use cases",
      INDUSTRY_SPECIFIC_SCHEMAS: "SoftwareApplication, WebAPI, Service",
      REGULATORY_REQUIREMENTS: "SOC2, GDPR, HIPAA compliance",
      PRIMARY_AI_PLATFORMS: "ChatGPT (code generation), Perplexity (technical queries), GitHub Copilot",
      COMPETITOR_SET: "category leaders like [SPECIFIC_COMPETITORS]",
      INDUSTRY_SPECIFIC_METRICS: "MRR, CAC, LTV, churn rate, NPS",
      MARKET_SEGMENT: "enterprise B2B",
      CUSTOMER_PAIN_POINTS: "integration complexity, scalability, ROI, implementation time",
      VALUE_PROPOSITIONS: "automation, efficiency, cost savings, scalability",
      PRODUCT_CATEGORIES: "core platform, add-ons, API access",
      SERVICE_OFFERINGS: "implementation, support, consulting, training",
      AUTHORITY_PUBLICATIONS: "TechCrunch, VentureBeat, Gartner, Forrester",
      INDUSTRY_ASSOCIATIONS: "SaaS Alliance, Cloud Security Alliance",
      CREDIBILITY_FACTORS: "customer logos, case studies, uptime, security certifications",
      TRUST_SIGNALS: "G2 reviews, Capterra ratings, SOC2 badge, customer testimonials"
    }
  },
  
  // E-commerce Template
  ecommerce: {
    industry: "ecommerce",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["voice_capture", "product_visibility", "review_optimization"],
      optimization: ["shopping_feed_optimization", "local_inventory", "price_comparison"]
    },
    variables: {
      COMPANY_TYPE: "e-commerce retailer",
      PRIMARY_ENTITIES: "products, categories, brands, offers, shipping, returns",
      INDUSTRY_SPECIFIC_SCHEMAS: "Product, Offer, AggregateRating, Store, DeliveryMethod",
      REGULATORY_REQUIREMENTS: "consumer protection, accessibility, CCPA",
      PRIMARY_AI_PLATFORMS: "Google Shopping AI, Bing Shopping, voice assistants",
      COMPETITOR_SET: "[DIRECT_COMPETITORS] and marketplace sellers",
      INDUSTRY_SPECIFIC_METRICS: "conversion rate, AOV, cart abandonment, ROAS",
      MARKET_SEGMENT: "[B2C/B2B] [PRODUCT_VERTICAL]",
      CUSTOMER_PAIN_POINTS: "shipping costs, delivery time, product quality, returns",
      VALUE_PROPOSITIONS: "selection, price, convenience, customer service",
      PRODUCT_CATEGORIES: "[MAIN_CATEGORIES]",
      SERVICE_OFFERINGS: "shipping, returns, customer support, warranties",
      AUTHORITY_PUBLICATIONS: "Retail Dive, eCommerce Times, Internet Retailer",
      INDUSTRY_ASSOCIATIONS: "NRF, E-commerce Europe, [VERTICAL_ASSOCIATIONS]",
      CREDIBILITY_FACTORS: "seller ratings, shipping speed, return policy, secure checkout",
      TRUST_SIGNALS: "customer reviews, BBB rating, secure payment badges, social proof"
    }
  },
  
  // Healthcare Template
  healthcare: {
    industry: "healthcare",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["compliance_check", "medical_schema", "patient_voice"],
      optimization: ["symptom_checker_visibility", "medical_qa_optimization"]
    },
    variables: {
      COMPANY_TYPE: "healthcare provider",
      PRIMARY_ENTITIES: "medical services, conditions treated, physicians, facilities, insurance",
      INDUSTRY_SPECIFIC_SCHEMAS: "MedicalOrganization, Physician, MedicalCondition, MedicalProcedure",
      REGULATORY_REQUIREMENTS: "HIPAA, medical advertising regulations, FDA compliance",
      PRIMARY_AI_PLATFORMS: "symptom checkers, medical AI assistants, health search",
      COMPETITOR_SET: "regional providers and [SPECIALTY] specialists",
      INDUSTRY_SPECIFIC_METRICS: "patient satisfaction, wait times, outcomes, readmission rates",
      MARKET_SEGMENT: "[SPECIALTY] healthcare",
      CUSTOMER_PAIN_POINTS: "wait times, insurance coverage, treatment options, accessibility",
      VALUE_PROPOSITIONS: "expertise, outcomes, patient care, technology, convenience",
      PRODUCT_CATEGORIES: "[MEDICAL_SERVICES]",
      SERVICE_OFFERINGS: "treatments, diagnostics, preventive care, telemedicine",
      AUTHORITY_PUBLICATIONS: "medical journals, Healthline, WebMD, Mayo Clinic",
      INDUSTRY_ASSOCIATIONS: "AMA, [SPECIALTY_ASSOCIATIONS], local medical societies",
      CREDIBILITY_FACTORS: "board certifications, success rates, clinical trials, research",
      TRUST_SIGNALS: "patient reviews, accreditations, awards, physician credentials"
    }
  },
  
  // Financial Services Template
  financial_services: {
    industry: "financial_services",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["compliance_verification", "trust_signals", "financial_schemas"],
      optimization: ["calculator_tools", "rate_comparison", "financial_advice_content"]
    },
    variables: {
      COMPANY_TYPE: "financial institution",
      PRIMARY_ENTITIES: "financial products, rates, services, advisors, branches",
      INDUSTRY_SPECIFIC_SCHEMAS: "FinancialService, BankAccount, InvestmentService, Insurance",
      REGULATORY_REQUIREMENTS: "SEC, FINRA, FDIC, state regulations",
      PRIMARY_AI_PLATFORMS: "financial AI advisors, comparison engines, voice banking",
      COMPETITOR_SET: "major banks and [FINTECH_COMPETITORS]",
      INDUSTRY_SPECIFIC_METRICS: "AUM, customer acquisition, NIM, efficiency ratio",
      MARKET_SEGMENT: "[RETAIL/COMMERCIAL] banking",
      CUSTOMER_PAIN_POINTS: "fees, rates, accessibility, complexity, trust",
      VALUE_PROPOSITIONS: "competitive rates, service, technology, security, convenience",
      PRODUCT_CATEGORIES: "[FINANCIAL_PRODUCTS]",
      SERVICE_OFFERINGS: "accounts, loans, investments, advisory, insurance",
      AUTHORITY_PUBLICATIONS: "Wall Street Journal, Forbes, Bloomberg, The Economist",
      INDUSTRY_ASSOCIATIONS: "ABA, FINRA, [SPECIALTY_FINANCIAL_ASSOCIATIONS]",
      CREDIBILITY_FACTORS: "FDIC insurance, ratings, years in business, AUM",
      TRUST_SIGNALS: "regulatory compliance, security certifications, customer testimonials"
    }
  },
  
  // Education Template
  education: {
    industry: "education",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["course_visibility", "educator_profiles", "program_outcomes"],
      optimization: ["learning_path_optimization", "credential_visibility"]
    },
    variables: {
      COMPANY_TYPE: "educational institution",
      PRIMARY_ENTITIES: "programs, courses, faculty, admissions, campus, outcomes",
      INDUSTRY_SPECIFIC_SCHEMAS: "EducationalOrganization, Course, Person (educator), EducationalProgram",
      REGULATORY_REQUIREMENTS: "accreditation, Title IV, FERPA, accessibility",
      PRIMARY_AI_PLATFORMS: "course search engines, AI tutors, educational assistants",
      COMPETITOR_SET: "[PEER_INSTITUTIONS] and online programs",
      INDUSTRY_SPECIFIC_METRICS: "enrollment, graduation rate, job placement, rankings",
      MARKET_SEGMENT: "[K-12/HIGHER_ED/PROFESSIONAL] education",
      CUSTOMER_PAIN_POINTS: "cost, outcomes, flexibility, reputation, support",
      VALUE_PROPOSITIONS: "outcomes, reputation, flexibility, support, affordability",
      PRODUCT_CATEGORIES: "[DEGREE_PROGRAMS] and certificates",
      SERVICE_OFFERINGS: "instruction, advising, career services, financial aid",
      AUTHORITY_PUBLICATIONS: "US News, Chronicle of Higher Ed, EdSurge, Inside Higher Ed",
      INDUSTRY_ASSOCIATIONS: "[ACCREDITING_BODIES], professional associations",
      CREDIBILITY_FACTORS: "accreditation, rankings, graduation rates, alumni success",
      TRUST_SIGNALS: "accreditation badges, rankings, testimonials, outcome data"
    }
  },
  
  // Legal Services Template
  legal_services: {
    industry: "legal_services",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["attorney_profiles", "practice_area_depth", "case_results"],
      optimization: ["legal_qa_content", "local_visibility", "specialization_authority"]
    },
    variables: {
      COMPANY_TYPE: "law firm",
      PRIMARY_ENTITIES: "attorneys, practice areas, cases, offices, credentials",
      INDUSTRY_SPECIFIC_SCHEMAS: "LegalService, Attorney, Organization, Review",
      REGULATORY_REQUIREMENTS: "bar association rules, advertising regulations",
      PRIMARY_AI_PLATFORMS: "legal AI assistants, Q&A platforms, local search",
      COMPETITOR_SET: "regional firms specializing in [PRACTICE_AREAS]",
      INDUSTRY_SPECIFIC_METRICS: "case success rate, client satisfaction, ACV, utilization",
      MARKET_SEGMENT: "[PRACTICE_AREA] law",
      CUSTOMER_PAIN_POINTS: "cost, complexity, outcomes, communication, trust",
      VALUE_PROPOSITIONS: "expertise, results, service, accessibility, value",
      PRODUCT_CATEGORIES: "[PRACTICE_AREAS]",
      SERVICE_OFFERINGS: "representation, consultation, document prep, mediation",
      AUTHORITY_PUBLICATIONS: "law journals, Above the Law, Law360, [PRACTICE_PUBLICATIONS]",
      INDUSTRY_ASSOCIATIONS: "ABA, state bar, [PRACTICE_ASSOCIATIONS]",
      CREDIBILITY_FACTORS: "case results, peer recognition, experience, credentials",
      TRUST_SIGNALS: "client testimonials, peer ratings, awards, bar standing"
    }
  },
  
  // Real Estate Template
  real_estate: {
    industry: "real_estate",
    parent: "default",
    requirements: {
      foundation: ["ontology_mapping", "baseline_audit"],
      critical: ["property_listings", "agent_profiles", "local_market_content"],
      optimization: ["virtual_tour_visibility", "neighborhood_guides", "market_reports"]
    },
    variables: {
      COMPANY_TYPE: "real estate agency",
      PRIMARY_ENTITIES: "properties, agents, neighborhoods, services, market data",
      INDUSTRY_SPECIFIC_SCHEMAS: "RealEstateAgent, RealEstateListing, Place, LocalBusiness",
      REGULATORY_REQUIREMENTS: "fair housing, state licensing, MLS rules",
      PRIMARY_AI_PLATFORMS: "property search AI, virtual assistants, market analysis tools",
      COMPETITOR_SET: "local brokerages and [NATIONAL_PLATFORMS]",
      INDUSTRY_SPECIFIC_METRICS: "listings, sales volume, days on market, commission",
      MARKET_SEGMENT: "[RESIDENTIAL/COMMERCIAL] [MARKET_AREA]",
      CUSTOMER_PAIN_POINTS: "finding properties, pricing, process complexity, trust",
      VALUE_PROPOSITIONS: "local expertise, service, results, technology, network",
      PRODUCT_CATEGORIES: "[PROPERTY_TYPES]",
      SERVICE_OFFERINGS: "buying, selling, property management, relocation",
      AUTHORITY_PUBLICATIONS: "Inman, Realtor.com, local real estate sections",
      INDUSTRY_ASSOCIATIONS: "NAR, state associations, MLS organizations",
      CREDIBILITY_FACTORS: "sales history, local expertise, client results, designations",
      TRUST_SIGNALS: "client reviews, sales data, awards, professional designations"
    }
  }
};

// Helper function to apply template variables
function applyTemplateVariables(template, customVariables = {}) {
  const variables = { ...template.variables, ...customVariables };
  let processedTemplate = JSON.parse(JSON.stringify(template));
  
  // Process all prompt strings
  Object.keys(processedTemplate.prompts).forEach(key => {
    let prompt = processedTemplate.prompts[key];
    Object.keys(variables).forEach(varName => {
      const placeholder = `[${varName}]`;
      prompt = prompt.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), variables[varName]);
    });
    processedTemplate.prompts[key] = prompt;
  });
  
  return processedTemplate;
}

module.exports = { industryTemplates, applyTemplateVariables };
```

---

## 3. Client Dashboard Implementation

### 3.1 Real-time Dashboard (React Component)

```jsx
// dashboard/ClientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const ClientDashboard = ({ sessionId }) => {
  const [sessionData, setSessionData] = useState(null);
  const [agentStatus, setAgentStatus] = useState({});
  const [metrics, setMetrics] = useState({});
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [executionPhase, setExecutionPhase] = useState('initializing');
  
  useEffect(() => {
    // Load initial session data
    loadSessionData();
    
    // Subscribe to real-time updates
    const subscription = subscribeToUpdates();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [sessionId]);
  
  const loadSessionData = async () => {
    const { data: session } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    setSessionData(session);
    
    // Load agent execution status
    const { data: executions } = await supabase
      .from('agent_executions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at');
    
    const statusMap = {};
    executions.forEach(exec => {
      statusMap[exec.agent_id] = {
        status: exec.status,
        executionTime: exec.execution_time_ms,
        completedAt: exec.completed_at
      };
    });
    setAgentStatus(statusMap);
    
    // Calculate metrics
    calculateMetrics(session, executions);
  };
  
  const subscribeToUpdates = () => {
    return supabase
      .channel(`session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agent_executions',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          handleRealtimeUpdate(payload);
        }
      )
      .subscribe();
  };
  
  const handleRealtimeUpdate = (payload) => {
    const update = {
      timestamp: new Date().toISOString(),
      type: payload.eventType,
      agent: payload.new?.agent_id,
      status: payload.new?.status,
      message: `Agent ${payload.new?.agent_id} ${payload.new?.status}`
    };
    
    setRealTimeUpdates(prev => [update, ...prev].slice(0, 20));
    
    // Update agent status
    if (payload.new?.agent_id) {
      setAgentStatus(prev => ({
        ...prev,
        [payload.new.agent_id]: {
          status: payload.new.status,
          executionTime: payload.new.execution_time_ms,
          completedAt: payload.new.completed_at
        }
      }));
    }
    
    // Update execution phase
    updateExecutionPhase(payload.new);
  };
  
  const updateExecutionPhase = (execution) => {
    if (!execution) return;
    
    const agentPhases = {
      'P1': 'foundation',
      'P2': 'foundation',
      'P3': 'insights',
      'P4': 'strategy',
      'P5': 'optimization',
      'P16': 'synthesis'
    };
    
    setExecutionPhase(agentPhases[execution.agent_id] || 'processing');
  };
  
  const calculateMetrics = (session, executions) => {
    const completed = executions.filter(e => e.status === 'completed').length;
    const failed = executions.filter(e => e.status === 'failed').length;
    const totalTime = executions.reduce((sum, e) => sum + (e.execution_time_ms || 0), 0);
    
    setMetrics({
      totalAgents: executions.length,
      completed,
      failed,
      successRate: executions.length > 0 ? (completed / executions.length * 100).toFixed(1) : 0,
      averageTime: executions.length > 0 ? (totalTime / executions.length / 1000).toFixed(2) : 0,
      totalTime: (totalTime / 1000).toFixed(2)
    });
  };
  
  const getAgentStatusColor = (status) => {
    const colors = {
      'pending': '#gray',
      'queued': '#orange',
      'running': '#blue',
      'completed': '#green',
      'failed': '#red'
    };
    return colors[status] || '#gray';
  };
  
  const getPhaseProgress = () => {
    const phases = ['initializing', 'foundation', 'insights', 'strategy', 'optimization', 'synthesis', 'complete'];
    const currentIndex = phases.indexOf(executionPhase);
    return ((currentIndex + 1) / phases.length * 100).toFixed(0);
  };
  
  return (
    <div className="dashboard-container" style={styles.container}>
      <header style={styles.header}>
        <h1>AI Visibility Analysis Dashboard</h1>
        <div style={styles.sessionInfo}>
          Session: {sessionId?.slice(0, 8)}...
          <span style={styles.status}>● Live</span>
        </div>
      </header>
      
      <div style={styles.progressSection}>
        <h2>Analysis Progress</h2>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${getPhaseProgress()}%`
            }}
          />
        </div>
        <div style={styles.phaseLabel}>
          Phase: <strong>{executionPhase}</strong>
        </div>
      </div>
      
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <h3>Total Agents</h3>
          <div style={styles.metricValue}>{metrics.totalAgents || 0}</div>
        </div>
        <div style={styles.metricCard}>
          <h3>Completed</h3>
          <div style={styles.metricValue}>{metrics.completed || 0}</div>
        </div>
        <div style={styles.metricCard}>
          <h3>Success Rate</h3>
          <div style={styles.metricValue}>{metrics.successRate}%</div>
        </div>
        <div style={styles.metricCard}>
          <h3>Avg Time</h3>
          <div style={styles.metricValue}>{metrics.averageTime}s</div>
        </div>
      </div>
      
      <div style={styles.agentGrid}>
        <h2>Agent Execution Status</h2>
        <div style={styles.agents}>
          {['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'].map(agentId => (
            <div key={agentId} style={styles.agentCard}>
              <div style={styles.agentHeader}>
                <span style={styles.agentId}>{agentId}</span>
                <span 
                  style={{
                    ...styles.agentStatus,
                    backgroundColor: getAgentStatusColor(agentStatus[agentId]?.status || 'pending')
                  }}
                >
                  {agentStatus[agentId]?.status || 'pending'}
                </span>
              </div>
              {agentStatus[agentId]?.executionTime && (
                <div style={styles.agentTime}>
                  {(agentStatus[agentId].executionTime / 1000).toFixed(2)}s
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.scoreSection}>
        <h2>AI Visibility Scores</h2>
        <div style={styles.scoreGrid}>
          <ScoreCard 
            title="Ontology Coverage" 
            score={sessionData?.context?.coverage_score || 0} 
          />
          <ScoreCard 
            title="Baseline Score" 
            score={sessionData?.context?.baseline_score || 0} 
          />
          <ScoreCard 
            title="Customer Sentiment" 
            score={sessionData?.context?.customer_sentiment || 0} 
          />
          <ScoreCard 
            title="Authority Baseline" 
            score={sessionData?.context?.authority_baseline || 0} 
          />
        </div>
      </div>
      
      <div style={styles.activityLog}>
        <h2>Real-time Activity</h2>
        <div style={styles.logContainer}>
          {realTimeUpdates.map((update, index) => (
            <div key={index} style={styles.logEntry}>
              <span style={styles.logTime}>
                {new Date(update.timestamp).toLocaleTimeString()}
              </span>
              <span style={styles.logMessage}>{update.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ title, score }) => {
  const getScoreColor = (score) => {
    if (score >= 0.8) return '#4CAF50';
    if (score >= 0.6) return '#FFC107';
    if (score >= 0.4) return '#FF9800';
    return '#F44336';
  };
  
  return (
    <div style={styles.scoreCard}>
      <h4>{title}</h4>
      <div 
        style={{
          ...styles.scoreValue,
          color: getScoreColor(score)
        }}
      >
        {(score * 100).toFixed(0)}%
      </div>
      <div style={styles.scoreBar}>
        <div 
          style={{
            ...styles.scoreBarFill,
            width: `${score * 100}%`,
            backgroundColor: getScoreColor(score)
          }}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  sessionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#666'
  },
  status: {
    color: '#4CAF50',
    fontSize: '20px'
  },
  progressSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  progressBar: {
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    marginTop: '10px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    transition: 'width 0.5s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  phaseLabel: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#666'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  metricCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: '10px'
  },
  agentGrid: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  agents: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  agentCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px'
  },
  agentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  agentId: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  agentStatus: {
    padding: '2px 8px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '12px'
  },
  agentTime: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center'
  },
  scoreSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  scoreGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '15px'
  },
  scoreCard: {
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px'
  },
  scoreValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '10px 0'
  },
  scoreBar: {
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  scoreBarFill: {
    height: '100%',
    transition: 'width 0.5s ease'
  },
  activityLog: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logContainer: {
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: '15px'
  },
  logEntry: {
    padding: '8px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    gap: '15px'
  },
  logTime: {
    color: '#666',
    fontSize: '12px',
    minWidth: '80px'
  },
  logMessage: {
    fontSize: '14px'
  }
};

export default ClientDashboard;
```

---

## 4. Integration Tests

### 4.1 Complete P1-P4 Integration Test Suite

```javascript
// tests/integration/P1_P4_Integration.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const { createClient } = require('@supabase/supabase-js');
const P1_OntologyMapper = require('../../agents/P1_OntologyMapper');
const P2_BaselineAuditor = require('../../agents/P2_BaselineAuditor');
const P3_VoiceCapture = require('../../agents/P3_VoiceCapture');
const P4_CitationArchitect = require('../../agents/P4_CitationArchitect');
const Po_MasterOrchestrator = require('../../orchestrators/Po_MasterOrchestrator');

describe('P1-P4 Integration Tests', function() {
  this.timeout(60000); // 60 second timeout for integration tests
  
  let supabase;
  let sessionId;
  let testContext;
  
  before(async () => {
    // Initialize Supabase client
    supabase = createClient(
      process.env.TEST_SUPABASE_URL,
      process.env.TEST_SUPABASE_KEY
    );
    
    // Create test context
    testContext = {
      client_id: 'test-client-integration',
      company_name: 'TestCorp Integration',
      industry: 'b2b_saas',
      company_size: 'mid-market',
      maturity_score: 0.4,
      objectives: ['improve_ai_visibility', 'increase_citations', 'optimize_content'],
      budget: 50000,
      timeline: '3_months'
    };
    
    // Create test session
    const { data: session } = await supabase
      .from('sessions')
      .insert({
        client_id: testContext.client_id,
        context: testContext,
        status: 'active'
      })
      .select()
      .single();
    
    sessionId = session.id;
  });
  
  after(async () => {
    // Cleanup test data
    if (sessionId) {
      await supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId);
    }
  });
  
  describe('Po Master Orchestrator', () => {
    it('should determine correct agent activation strategy', async () => {
      const orchestrator = new Po_MasterOrchestrator();
      
      const result = await orchestrator.orchestrate(sessionId, testContext);
      
      expect(result).to.have.property('success', true);
      expect(result).to.have.property('execution_plan');
      expect(result.execution_plan).to.have.property('phases');
      expect(result.execution_plan.phases).to.be.an('array');
      expect(result.execution_plan.phases.length).to.be.at.least(1);
      
      // Should include foundation agents for low maturity score
      const foundationPhase = result.execution_plan.phases.find(p => p.type === 'foundation');
      expect(foundationPhase).to.exist;
      expect(foundationPhase.agents).to.include('P1');
      expect(foundationPhase.agents).to.include('P2');
    });
    
    it('should respect agent dependencies', async () => {
      const orchestrator = new Po_MasterOrchestrator();
      const plan = orchestrator.buildExecutionPlan({
        strategy_type: 'comprehensive',
        active_agents: ['P1', 'P2', 'P3', 'P4', 'P5'],
        parallel_groups: [['P3', 'P4']]
      });
      
      // P2 should come after P1
      const p1Phase = plan.phases.find(p => p.agents.includes('P1'));
      const p2Phase = plan.phases.find(p => p.agents.includes('P2'));
      expect(p1Phase.phase).to.be.lessThan(p2Phase.phase);
      
      // P3 and P4 should be in parallel
      const parallelPhase = plan.phases.find(p => p.agents.includes('P3') && p.agents.includes('P4'));
      expect(parallelPhase).to.exist;
      expect(parallelPhase.execution).to.equal('parallel');
    });
  });
  
  describe('P1 Ontology Mapper', () => {
    it('should successfully map entities to ontologies', async () => {
      const agent = new P1_OntologyMapper();
      
      const inputData = {
        company_name: 'TestCorp',
        company_description: 'B2B SaaS platform for analytics',
        entities: ['TestCorp', 'Analytics Platform', 'API Service', 'John Smith (CEO)'],
        products_services: [
          { name: 'DataAnalyzer', type: 'Software', description: 'Real-time analytics' }
        ]
      };
      
      const result = await agent.execute(sessionId, inputData);
      
      expect(result).to.have.property('success', true);
      expect(result).to.have.property('agent', 'P1');
      expect(result).to.have.property('mappings');
      expect(result.mappings).to.have.property('entity_mappings');
      expect(result.mappings.entity_mappings).to.be.an('array');
      expect(result.mappings).to.have.property('overall_coverage_score');
      expect(result.mappings.overall_coverage_score).to.be.a('number');
    });
    
    it('should store mappings in database', async () => {
      const agent = new P1_OntologyMapper();
      
      const inputData = {
        company_name: 'TestCorp',
        entities: ['TestCorp'],
        products_services: []
      };
      
      await agent.execute(sessionId, inputData);
      
      // Verify data was stored
      const { data: mappings } = await supabase
        .from('ontology_mappings')
        .select('*')
        .eq('session_id', sessionId);
      
      expect(mappings).to.be.an('array');
      expect(mappings.length).to.be.greaterThan(0);
    });
  });
  
  describe('P2 Baseline Auditor', () => {
    it('should conduct comprehensive AI visibility audit', async () => {
      const agent = new P2_BaselineAuditor();
      
      const inputData = {
        company_name: 'TestCorp',
        website_url: 'https://testcorp.example.com',
        competitors: ['Competitor1', 'Competitor2'],
        current_channels: ['SEO', 'Content Marketing'],
        seo_metrics: {
          domain_authority: 35,
          organic_traffic: 5000
        }
      };
      
      const result = await agent.execute(sessionId, inputData);
      
      expect(result).to.have.property('success', true);
      expect(result).to.have.property('audit');
      expect(result.audit).to.have.property('overall_score');
      expect(result.audit).to.have.property('critical_gaps');
      expect(result.audit).to.have.property('recommendations');
      expect(result.audit.recommendations).to.be.an('array');
    });
    
    it('should use P1 ontology context', async () => {
      const agent = new P2_BaselineAuditor();
      
      // First run P1 to create context
      const p1 = new P1_OntologyMapper();
      await p1.execute(sessionId, {
        company_name: 'TestCorp',
        entities: ['TestCorp'],
        products_services: []
      });
      
      // Now run P2
      const result = await agent.execute(sessionId, {
        company_name: 'TestCorp',
        website_url: 'https://testcorp.example.com',
        competitors: []
      });
      
      // P2 should have access to P1's ontology data
      expect(result.success).to.be.true;
    });
  });
  
  describe('P3 Voice Capture', () => {
    it('should analyze customer voice data', async () => {
      const agent = new P3_VoiceCapture();
      
      const inputData = {
        company_name: 'TestCorp',
        reviews: [
          'Great product, easy to use',
          'Customer support could be better',
          'Pricing is reasonable for the value'
        ],
        support_tickets: [
          'How do I integrate with Slack?',
          'Need help with API authentication'
        ],
        search_queries: [
          'TestCorp pricing',
          'TestCorp vs Competitor1'
        ]
      };
      
      const result = await agent.execute(sessionId, inputData);
      
      expect(result).to.have.property('success', true);
      expect(result).to.have.property('analysis');
      expect(result.analysis).to.have.property('overall_sentiment');
      expect(result.analysis).to.have.property('themes');
      expect(result.analysis).to.have.property('content_gaps');
      expect(result.analysis.content_gaps).to.be.an('array');
    });
    
    it('should extract actionable insights', async () => {
      const agent = new P3_VoiceCapture();
      
      const result = await agent.execute(sessionId, {
        company_name: 'TestCorp',
        reviews: ['Product is amazing but documentation is lacking']
      });
      
      expect(result.analysis).to.have.property('ai_visibility_insights');
      expect(result.analysis).to.have.property('priority_actions');
      expect(result.analysis.priority_actions).to.be.an('array');
    });
  });
  
  describe('P4 Citation Architect', () => {
    it('should create comprehensive citation strategy', async () => {
      const agent = new P4_CitationArchitect();
      
      const inputData = {
        company_name: 'TestCorp',
        existing_citations: ['TechCrunch mention'],
        media_mentions: [
          { source: 'VentureBeat', type: 'Article' }
        ],
        competitor_citations: {
          'Competitor1': ['Forbes', 'Gartner']
        }
      };
      
      const result = await agent.execute(sessionId, inputData);
      
      expect(result).to.have.property('success', true);
      expect(result).to.have.property('strategy');
      expect(result.strategy).to.have.property('priority_targets');
      expect(result.strategy).to.have.property('implementation_roadmap');
      expect(result.strategy).to.have.property('estimated_authority_lift');
    });
    
    it('should use context from P1 and P2', async () => {
      const agent = new P4_CitationArchitect();
      
      // Ensure P1 and P2 have run
      const p1 = new P1_OntologyMapper();
      const p2 = new P2_BaselineAuditor();
      
      await p1.execute(sessionId, {
        company_name: 'TestCorp',
        entities: ['TestCorp'],
        products_services: []
      });
      
      await p2.execute(sessionId, {
        company_name: 'TestCorp',
        website_url: 'https://testcorp.example.com',
        competitors: []
      });
      
      // Now run P4
      const result = await agent.execute(sessionId, {
        company_name: 'TestCorp',
        existing_citations: []
      });
      
      // P4 should have incorporated context
      expect(result.success).to.be.true;
      expect(result.strategy).to.exist;
    });
  });
  
  describe('Complete P1-P4 Flow', () => {
    it('should execute all agents in correct sequence', async function() {
      this.timeout(120000); // 2 minutes for complete flow
      
      const orchestrator = new Po_MasterOrchestrator();
      
      // Define complete test data
      const completeTestData = {
        ...testContext,
        entities: ['TestCorp', 'Product1', 'CEO Name'],
        products_services: [
          { name: 'MainProduct', type: 'Software', description: 'Our main product' }
        ],
        website_url: 'https://testcorp.example.com',
        competitors: ['Competitor1', 'Competitor2', 'Competitor3'],
        reviews: [
          'Excellent product',
          'Great support team',
          'Could use better documentation'
        ],
        existing_citations: ['Industry Report 2024']
      };
      
      // Execute orchestration
      const result = await orchestrator.orchestrate(sessionId, completeTestData);
      
      expect(result.success).to.be.true;
      expect(result.execution_plan).to.exist;
      expect(result.results).to.exist;
      
      // Verify all foundation agents executed
      expect(result.results.agents).to.have.property('P1');
      expect(result.results.agents).to.have.property('P2');
      expect(result.results.agents).to.have.property('P3');
      expect(result.results.agents).to.have.property('P4');
      
      // Verify session was updated with results
      const { data: finalSession } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();
      
      expect(finalSession.context).to.have.property('ontology_mapped', true);
      expect(finalSession.context).to.have.property('baseline_completed', true);
      expect(finalSession.context).to.have.property('voice_captured', true);
      expect(finalSession.context).to.have.property('citation_strategy_complete', true);
    });
    
    it('should handle agent failures gracefully', async () => {
      const orchestrator = new Po_MasterOrchestrator();
      
      // Mock a failure in P2
      sinon.stub(P2_BaselineAuditor.prototype, 'execute').throws(new Error('P2 Failed'));
      
      const result = await orchestrator.orchestrate(sessionId, testContext);
      
      expect(result.success).to.be.true;
      expect(result.results.errors).to.be.an('array');
      expect(result.results.errors).to.have.lengthOf.at.least(1);
      expect(result.results.errors[0]).to.have.property('agent', 'P2');
      
      // Other agents should still execute
      expect(result.results.agents).to.have.property('P1');
      expect(result.results.agents).to.have.property('P3');
      
      P2_BaselineAuditor.prototype.execute.restore();
    });
    
    it('should complete within performance targets', async () => {
      const orchestrator = new Po_MasterOrchestrator();
      const startTime = Date.now();
      
      const result = await orchestrator.orchestrate(sessionId, testContext);
      
      const executionTime = Date.now() - startTime;
      
      expect(result.success).to.be.true;
      expect(executionTime).to.be.lessThan(60000); // Should complete in under 60 seconds
      
      // Individual agent times should be reasonable
      const { data: executions } = await supabase
        .from('agent_executions')
        .select('agent_id, execution_time_ms')
        .eq('session_id', sessionId);
      
      executions.forEach(exec => {
        expect(exec.execution_time_ms).to.be.lessThan(15000); // Each agent under 15 seconds
      });
    });
  });
  
  describe('Industry Template Application', () => {
    const { applyTemplateVariables, industryTemplates } = require('../../orchestrators/industryTemplates');
    
    it('should correctly apply template variables', () => {
      const template = industryTemplates.b2b_saas;
      const customVars = {
        SPECIFIC_COMPETITORS: 'Datadog, New Relic',
        MAIN_CATEGORIES: 'Analytics, Monitoring, Alerting'
      };
      
      const processed = applyTemplateVariables(template, customVars);
      
      expect(processed.prompts.baseline).to.include('Datadog, New Relic');
      expect(processed.prompts.baseline).to.include('SaaS platform');
      expect(processed.prompts.baseline).to.not.include('[COMPANY_TYPE]');
      expect(processed.prompts.baseline).to.not.include('[SPECIFIC_COMPETITORS]');
    });
    
    it('should handle healthcare compliance requirements', () => {
      const template = industryTemplates.healthcare;
      const processed = applyTemplateVariables(template, {
        SPECIALTY: 'Cardiology',
        MEDICAL_SERVICES: 'Heart Surgery, Cardiac Imaging, Rehabilitation'
      });
      
      expect(processed.prompts.ontology).to.include('HIPAA');
      expect(processed.prompts.baseline).to.include('Cardiology');
      expect(processed.variables.REGULATORY_REQUIREMENTS).to.include('HIPAA');
    });
    
    it('should adapt for different industries', async () => {
      const orchestrator = new Po_MasterOrchestrator();
      
      // Test with different industries
      const industries = ['b2b_saas', 'ecommerce', 'healthcare', 'financial_services'];
      
      for (const industry of industries) {
        const context = { ...testContext, industry };
        const template = orchestrator.getIndustryTemplate(industry);
        
        expect(template).to.exist;
        expect(template.requirements).to.exist;
        expect(template.prompts).to.exist;
        expect(template.variables).to.exist;
        
        // Each industry should have unique requirements
        expect(template.requirements).to.not.deep.equal(industryTemplates.default.requirements);
      }
    });
  });
});

// Performance benchmark tests
describe('Performance Benchmarks', () => {
  it('should meet token usage targets', async () => {
    // Track token usage across all agents
    const tokenUsage = {
      P1: 0,
      P2: 0,
      P3: 0,
      P4: 0
    };
    
    // Mock Claude API to track tokens
    const originalCall = AgentHelpers.prototype.callClaude;
    AgentHelpers.prototype.callClaude = async function(system, user, maxTokens) {
      // Estimate tokens (rough approximation)
      const promptTokens = (system.length + user.length) / 4;
      const responseTokens = maxTokens * 0.5; // Assume 50% of max
      
      const agentId = this.agentId || 'unknown';
      if (tokenUsage[agentId] !== undefined) {
        tokenUsage[agentId] += promptTokens + responseTokens;
      }
      
      return originalCall.call(this, system, user, maxTokens);
    };
    
    // Run all agents
    const orchestrator = new Po_MasterOrchestrator();
    await orchestrator.orchestrate(sessionId, testContext);
    
    // Check token usage
    const totalTokens = Object.values(tokenUsage).reduce((sum, tokens) => sum + tokens, 0);
    
    expect(totalTokens).to.be.lessThan(50000); // Target: under 50k tokens per complete run
    expect(tokenUsage.P1).to.be.lessThan(10000);
    expect(tokenUsage.P2).to.be.lessThan(15000);
    expect(tokenUsage.P3).to.be.lessThan(12000);
    expect(tokenUsage.P4).to.be.lessThan(12000);
    
    AgentHelpers.prototype.callClaude = originalCall;
  });
});

module.exports = {
  testContext,
  sessionId
};
```

---

## 5. Deployment Configuration

### 5.1 N8n Deployment Configuration

```yaml
# docker-compose.yml for complete BAIV deployment
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=n8n.baiv.platform
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://n8n.baiv.platform/
      - GENERIC_TIMEZONE=America/New_York
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      # Database
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=supabase.baiv.platform
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=postgres
      - DB_POSTGRESDB_USER=postgres
      - DB_POSTGRESDB_PASSWORD=${SUPABASE_DB_PASSWORD}
      # External services
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./agents:/home/node/agents
      - ./orchestrators:/home/node/orchestrators
      - ./shared:/home/node/shared
    networks:
      - baiv_network

  dashboard:
    build: ./dashboard
    restart: always
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_SUPABASE_URL=${SUPABASE_URL}
      - REACT_APP_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - REACT_APP_N8N_WEBHOOK_URL=https://n8n.baiv.platform/webhook
    networks:
      - baiv_network

volumes:
  n8n_data:
    external: true

networks:
  baiv_network:
    external: true
```

### 5.2 Environment Configuration

```bash
# .env.production
# Claude API
CLAUDE_API_KEY=sk-ant-api-xxxxx

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
SUPABASE_DB_PASSWORD=your-db-password

# N8n
N8N_PASSWORD=secure-password
N8N_ENCRYPTION_KEY=your-encryption-key

# Dashboard
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# Monitoring
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
LOG_LEVEL=info

# Rate Limiting
CLAUDE_RATE_LIMIT_PER_MINUTE=10
CLAUDE_RATE_LIMIT_PER_DAY=1000
```

This complete implementation provides everything you need to deploy your BAIV platform with intelligent orchestration, industry-specific templates, real-time monitoring, and comprehensive testing!