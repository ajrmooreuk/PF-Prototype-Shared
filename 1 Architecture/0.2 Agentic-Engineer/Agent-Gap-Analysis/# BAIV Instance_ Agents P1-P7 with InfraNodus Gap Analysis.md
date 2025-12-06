\# BAIV Instance: Agents P1-P7 with InfraNodus Gap Analysis  
\#\# Claude Agent SDK Architecture

\*\*Document Version:\*\* 2.0    
\*\*Date:\*\* December 6, 2025    
\*\*Platform:\*\* Platform Foundation Core (PF-Core)    
\*\*Product:\*\* Be AI Visible (BAIV)    
\*\*Architecture:\*\* Ontology-Centric Agent System

\---

\#\# Executive Summary

This document defines the seven core agent processes (P1-P7) that power the BAIV platform's discovery, analysis, and optimization capabilities using Claude Agent SDK orchestration. Each process leverages InfraNodus API integration for advanced knowledge graph visualization and gap analysis, with all data stored as JSONB ontologies in Supabase for maximum flexibility and schema evolution.

The architecture implements a fully agentic, ontology-driven approach where agents communicate through structured schema.org-grounded data models, eliminating rigid database schemas in favor of flexible JSONB storage patterns.

\---

\#\# Architecture Overview

\#\#\# Core Technology Stack

\- \*\*Agent Orchestration:\*\* Claude Agent SDK (MCP)  
\- \*\*AI Processing:\*\* Claude 4.5 Sonnet  
\- \*\*Knowledge Graph Analysis:\*\* InfraNodus API  
\- \*\*Data Storage:\*\* Supabase PostgreSQL with JSONB  
\- \*\*Ontology Framework:\*\* schema.org \+ custom extensions  
\- \*\*UI/UX:\*\* Next.js \+ shadcn/ui \+ Figma

\#\#\# Agent Hierarchy

VEOA (Value Engineering Orchestrating Agent) ├── P1: Discovery Agent ├── P2: Content Extraction Agent ├── P3: Entity Relationship Agent ├── P4: Graph Construction Agent ├── P5: Gap Analysis Agent ├── P6: Opportunity Identification Agent └── P7: Strategy Generation Agent

\#\#\# Ontology-Centric Design Philosophy

All data is stored as schema.org-grounded JSONB documents with custom extensions for domain-specific needs. This approach provides:

\- \*\*Schema flexibility:\*\* Add properties without migrations  
\- \*\*Ontology versioning:\*\* Track schema evolution over time  
\- \*\*Semantic consistency:\*\* schema.org ensures AI interpretability  
\- \*\*Query power:\*\* PostgreSQL JSONB indexing for performance  
\- \*\*Interoperability:\*\* Standard vocabularies enable data exchange

\---

\#\# Simplified Database Schema

\#\#\# Single Table Design with JSONB

\`\`\`sql  
\-- Core ontology storage table  
CREATE TABLE baiv\_ontologies (  
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
  client\_id UUID NOT NULL,  
  ontology\_type TEXT NOT NULL, \-- discovery\_session, entity, relationship, gap, opportunity, strategy  
  schema\_version TEXT DEFAULT '1.0',  
  data JSONB NOT NULL,  
  created\_at TIMESTAMP DEFAULT NOW(),  
  updated\_at TIMESTAMP DEFAULT NOW(),  
  created\_by UUID,  
  metadata JSONB  
);

\-- Indexes for performance  
CREATE INDEX idx\_baiv\_client ON baiv\_ontologies(client\_id);  
CREATE INDEX idx\_baiv\_type ON baiv\_ontologies(ontology\_type);  
CREATE INDEX idx\_baiv\_data ON baiv\_ontologies USING gin(data);  
CREATE INDEX idx\_baiv\_metadata ON baiv\_ontologies USING gin(metadata);

\-- Composite indexes for common queries  
CREATE INDEX idx\_baiv\_client\_type ON baiv\_ontologies(client\_id, ontology\_type);  
CREATE INDEX idx\_baiv\_client\_created ON baiv\_ontologies(client\_id, created\_at DESC);

\-- Row Level Security  
ALTER TABLE baiv\_ontologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY client\_isolation ON baiv\_ontologies  
  USING (  
    client\_id \= auth.uid()   
    OR EXISTS (  
      SELECT 1 FROM team\_access   
      WHERE user\_id \= auth.uid()   
      AND team\_client\_id \= baiv\_ontologies.client\_id  
    )  
  );

---

## **Ontology Schemas**

### **Discovery Session Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "DiscoverySession",  
  "identifier": "uuid",  
  "sessionId": "session-uuid",  
  "about": {  
    "@type": "Organization",  
    "name": "Client Company Name",  
    "url": "https://client.com",  
    "sameAs": \[  
      "https://linkedin.com/company/client",  
      "https://twitter.com/client"  
    \]  
  },  
  "dateCreated": "2025-12-06T10:00:00Z",  
  "status": "validated",  
  "validatedUrls": \[  
    {  
      "url": "https://client.com",  
      "pageType": "homepage",  
      "statusCode": 200,  
      "lastChecked": "2025-12-06T10:05:00Z"  
    }  
  \],  
  "confidenceScore": 0.85,  
  "discoveredPages": \[  
    {"url": "https://client.com", "type": "homepage"},  
    {"url": "https://client.com/about", "type": "about"},  
    {"url": "https://client.com/services", "type": "services"}  
  \]  
}

### **Content Block Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "WebContent",  
  "identifier": "uuid",  
  "sessionId": "session-uuid",  
  "url": "https://client.com/about",  
  "text": "extracted content text",  
  "contentType": "about\_page",  
  "inLanguage": "en-US",  
  "datePublished": "2025-12-06T10:10:00Z",  
  "qualityMetrics": {  
    "@type": "AggregateRating",  
    "ratingValue": 0.87,  
    "textLength": 1250,  
    "noiseRatio": 0.12,  
    "duplicateScore": 0.05  
  },  
  "extractionMethod": "html\_parser",  
  "sourceMetadata": {  
    "httpHeaders": {},  
    "contentEncoding": "utf-8"  
  }  
}

### **Entity Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "Thing",  
  "identifier": "uuid",  
  "sessionId": "session-uuid",  
  "name": "AI Strategy",  
  "entityType": "Service",  
  "schemaType": "https://schema.org/Service",  
  "description": "Strategic consulting for AI implementation",  
  "confidence": 0.89,  
  "mentionCount": 12,  
  "sourceEvidence": \[  
    {  
      "text": "We provide AI strategy consulting...",  
      "url": "https://client.com/services",  
      "position": 145  
    }  
  \],  
  "properties": {  
    "category": "consulting",  
    "industry": "technology",  
    "targetAudience": "enterprise"  
  }  
}

### **Relationship Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "Relationship",  
  "identifier": "uuid",  
  "sessionId": "session-uuid",  
  "fromEntity": {  
    "@type": "Thing",  
    "identifier": "entity-uuid-1",  
    "name": "AI Strategy"  
  },  
  "toEntity": {  
    "@type": "Thing",  
    "identifier": "entity-uuid-2",  
    "name": "Cloud Infrastructure"  
  },  
  "relationshipType": "enables",  
  "strength": 0.75,  
  "bidirectional": false,  
  "evidence": \[  
    {  
      "text": "AI strategy enables cloud transformation",  
      "url": "https://client.com/case-study",  
      "confidence": 0.82  
    }  
  \]  
}

### **Knowledge Gap Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "KnowledgeGap",  
  "identifier": "uuid",  
  "graphId": "infranodus-graph-id",  
  "gapType": "structural\_hole",  
  "conceptA": {  
    "name": "AI Strategy",  
    "entityId": "entity-uuid-1"  
  },  
  "conceptB": {  
    "name": "Customer Experience",  
    "entityId": "entity-uuid-2"  
  },  
  "betweennessScore": 0.78,  
  "bridgingPotential": 0.85,  
  "missingIntermediaries": \[  
    "Process Automation",  
    "Data Analytics",  
    "Personalization"  
  \],  
  "priorityScore": 0.81,  
  "priorityTier": "Critical",  
  "businessContext": {  
    "industryRelevance": 0.90,  
    "competitiveValue": 0.75,  
    "implementationComplexity": "medium"  
  }  
}

### **Content Opportunity Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "CreativeWork",  
  "identifier": "uuid",  
  "gapId": "gap-uuid",  
  "name": "AI-Driven Customer Experience Transformation Guide",  
  "contentType": "whitepaper",  
  "about": \[  
    {  
      "@type": "Thing",  
      "name": "AI Strategy"  
    },  
    {  
      "@type": "Thing",  
      "name": "Customer Experience"  
    }  
  \],  
  "keywords": \[  
    "AI customer experience",  
    "CX transformation",  
    "intelligent automation"  
  \],  
  "aiVisibilityImpact": "high",  
  "businessValue": "Positions company as thought leader in AI-driven CX",  
  "effortEstimate": 40,  
  "estimatedROI": {  
    "leadGeneration": 25,  
    "visibilityIncrease": 35,  
    "authorityBoost": 45  
  },  
  "priority": "critical",  
  "implementationNotes": "Create comprehensive guide with case studies",  
  "semanticEnhancements": {  
    "schemaMarkup": \["Article", "HowTo"\],  
    "entitySalience": \["AI", "customer experience", "automation"\],  
    "bridgeConcepts": \["process automation", "data analytics"\]  
  }  
}

### **Strategy Ontology**

{  
  "@context": "https://schema.org",  
  "@type": "Plan",  
  "identifier": "uuid",  
  "sessionId": "session-uuid",  
  "name": "AI Visibility Strategy for \[Client\]",  
  "about": {  
    "@type": "Organization",  
    "name": "Client Company"  
  },  
  "status": "draft",  
  "executiveSummary": "Comprehensive AI visibility strategy...",  
  "goals": \[  
    {  
      "@type": "Goal",  
      "name": "Increase AI discoverability by 40%",  
      "targetDate": "2026-06-06",  
      "metric": "ai\_search\_visibility\_score",  
      "baseline": 0.42,  
      "target": 0.59  
    }  
  \],  
  "contentStrategy": {  
    "priorityTopics": \["AI Strategy", "Customer Experience", "Automation"\],  
    "contentCalendar": \[  
      {  
        "date": "2025-12-15",  
        "contentType": "blog",  
        "topic": "AI-driven CX transformation",  
        "opportunityId": "opportunity-uuid"  
      }  
    \],  
    "formatMix": {  
      "blog": 40,  
      "whitepaper": 30,  
      "case\_study": 20,  
      "video": 10  
    }  
  },  
  "implementationRoadmap": {  
    "phases": \[  
      {  
        "name": "Quick Wins",  
        "startDate": "2025-12-06",  
        "endDate": "2026-01-06",  
        "deliverables": \["opportunity-uuid-1", "opportunity-uuid-2"\]  
      }  
    \]  
  },  
  "successMetrics": {  
    "aiVisibility": \["graph\_density", "entity\_salience", "semantic\_rankings"\],  
    "contentPerformance": \["gap\_closure\_rate", "engagement"\],  
    "businessImpact": \["qualified\_leads", "brand\_search\_volume"\]  
  }  
}

---

## **Agent Process Definitions**

### **Process 1 (P1): Discovery Agent**

**Purpose:** Initial client business context discovery through automated web and social media scanning.

**Agent Implementation:**

import Anthropic from "@anthropic-ai/sdk";  
import { createClient } from "@supabase/supabase-js";

class DiscoveryAgent {  
  private client: Anthropic;  
  private supabase: ReturnType\<typeof createClient\>;  
    
  async execute(input: {  
    clientId: string;  
    websiteUrl: string;  
    linkedinUrl?: string;  
    socialUrls?: string\[\];  
  }) {  
    // Validate URLs  
    const validatedUrls \= await this.validateUrls(\[  
      input.websiteUrl,  
      input.linkedinUrl,  
      ...(input.socialUrls || \[\])  
    \].filter(Boolean));  
      
    // Discover website structure  
    const discoveredPages \= await this.discoverPages(input.websiteUrl);  
      
    // Create discovery session ontology  
    const sessionOntology \= {  
      "@context": "https://schema.org",  
      "@type": "DiscoverySession",  
      identifier: crypto.randomUUID(),  
      sessionId: crypto.randomUUID(),  
      about: {  
        "@type": "Organization",  
        url: input.websiteUrl,  
        sameAs: \[input.linkedinUrl, ...(input.socialUrls || \[\])\].filter(Boolean)  
      },  
      dateCreated: new Date().toISOString(),  
      status: validatedUrls.every(u \=\> u.valid) ? "validated" : "pending",  
      validatedUrls,  
      confidenceScore: this.calculateConfidence(validatedUrls, discoveredPages),  
      discoveredPages  
    };  
      
    // Store in Supabase  
    const { data, error } \= await this.supabase  
      .from('baiv\_ontologies')  
      .insert({  
        client\_id: input.clientId,  
        ontology\_type: 'discovery\_session',  
        data: sessionOntology  
      })  
      .select()  
      .single();  
      
    return {  
      sessionId: sessionOntology.sessionId,  
      status: sessionOntology.status,  
      confidence: sessionOntology.confidenceScore  
    };  
  }  
    
  private async validateUrls(urls: string\[\]) {  
    // URL validation logic  
    return Promise.all(  
      urls.map(async url \=\> ({  
        url,  
        valid: await this.checkUrl(url),  
        statusCode: 200,  
        lastChecked: new Date().toISOString()  
      }))  
    );  
  }  
    
  private calculateConfidence(urls: any\[\], pages: any\[\]): number {  
    const urlScore \= urls.filter(u \=\> u.valid).length / urls.length;  
    const pageScore \= pages.length \>= 3 ? 1.0 : pages.length / 3;  
    return (urlScore \* 0.6 \+ pageScore \* 0.4);  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P1 Agent Invoked\] \--\> B\[Validate URLs\]  
    B \--\> C\[Discover Website Structure\]  
    C \--\> D\[Extract Social Metadata\]  
    D \--\> E\[Calculate Confidence Score\]  
    E \--\> F\[Create Discovery Ontology\]  
    F \--\> G\[Store JSONB in Supabase\]  
    G \--\> H\[Return Session ID\]  
    H \--\> I\[Invoke P2 Agent\]

---

### **Process 2 (P2): Content Extraction Agent**

**Purpose:** Systematic extraction of textual content from discovered sources.

**Agent Implementation:**

class ContentExtractionAgent {  
  async execute(input: {  
    sessionId: string;  
    clientId: string;  
  }) {  
    // Load discovery session  
    const session \= await this.loadSession(input.sessionId);  
      
    // Extract content from each discovered URL  
    const contentBlocks \= await Promise.all(  
      session.data.discoveredPages.map(page \=\>   
        this.extractContent(page.url)  
      )  
    );  
      
    // Quality assessment  
    const qualityAssessed \= contentBlocks.map(block \=\> ({  
      ...block,  
      qualityMetrics: this.assessQuality(block)  
    }));  
      
    // Filter and store  
    const validContent \= qualityAssessed.filter(  
      block \=\> block.qualityMetrics.ratingValue \>= 0.6  
    );  
      
    // Store as content ontologies  
    await this.storeContentOntologies(input.clientId, input.sessionId, validContent);  
      
    return {  
      contentBlockCount: validContent.length,  
      totalWords: validContent.reduce((sum, b) \=\> sum \+ b.text.split(' ').length, 0\)  
    };  
  }  
    
  private assessQuality(content: any) {  
    const textLength \= content.text.length;  
    const noiseRatio \= this.calculateNoiseRatio(content.text);  
    const duplicateScore \= 0.05; // Calculate actual duplicates  
      
    const ratingValue \= textLength \>= 50 && noiseRatio \< 0.2 ? 0.85 : 0.50;  
      
    return {  
      "@type": "AggregateRating",  
      ratingValue,  
      textLength,  
      noiseRatio,  
      duplicateScore  
    };  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P2 Agent Invoked\] \--\> B\[Load Discovery Session\]  
    B \--\> C\[Extract Website Content\]  
    C \--\> D\[Extract LinkedIn Data\]  
    D \--\> E\[Extract Social Content\]  
    E \--\> F\[Clean & Normalize\]  
    F \--\> G\[Quality Assessment\]  
    G \--\> H{Quality \> 0.6?}  
    H \--\>|Yes| I\[Create Content Ontology\]  
    H \--\>|No| J\[Flag for Review\]  
    I \--\> K\[Store JSONB in Supabase\]  
    K \--\> L\[Invoke P3 Agent\]

---

### **Process 3 (P3): Entity Relationship Agent**

**Purpose:** AI-powered extraction of business entities and their relationships.

**Agent Implementation:**

class EntityRelationshipAgent {  
  async execute(input: {  
    sessionId: string;  
    clientId: string;  
  }) {  
    // Load content blocks  
    const contentBlocks \= await this.loadContentBlocks(input.sessionId);  
      
    // Batch content for processing  
    const batches \= this.batchContent(contentBlocks, 5000);  
      
    // Extract entities and relationships using Claude  
    const extractions \= await Promise.all(  
      batches.map(batch \=\> this.extractEntitiesAndRelationships(batch))  
    );  
      
    // Consolidate and deduplicate  
    const { entities, relationships } \= this.consolidate(extractions);  
      
    // Store as ontologies  
    await this.storeEntityOntologies(input.clientId, input.sessionId, entities);  
    await this.storeRelationshipOntologies(input.clientId, input.sessionId, relationships);  
      
    return {  
      entityCount: entities.length,  
      relationshipCount: relationships.length  
    };  
  }  
    
  private async extractEntitiesAndRelationships(contentBatch: string) {  
    const response \= await this.client.messages.create({  
      model: "claude-sonnet-4-5-20250929",  
      max\_tokens: 4096,  
      messages: \[{  
        role: "user",  
        content: \`Extract entities and relationships from this business content.  
          
        Content: ${contentBatch}  
          
        Return JSON with entities (name, type, schemaType, description, confidence) and   
        relationships (from, to, type, strength, evidence).  
          
        Use schema.org types where applicable.\`  
      }\]  
    });  
      
    return JSON.parse(response.content\[0\].text);  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P3 Agent Invoked\] \--\> B\[Load Content Blocks\]  
    B \--\> C\[Batch Content\<br/\>5000 tokens max\]  
    C \--\> D\[Claude API Call\<br/\>Entity Extraction\]  
    D \--\> E\[Parse JSON Response\]  
    E \--\> F\[Validate schema.org Types\]  
    F \--\> G\[Deduplicate Entities\]  
    G \--\> H\[Normalize Relationships\]  
    H \--\> I\[Create Entity Ontologies\]  
    I \--\> J\[Create Relationship Ontologies\]  
    J \--\> K\[Store JSONB in Supabase\]  
    K \--\> L\[Invoke P4 Agent\]

---

### **Process 4 (P4): Graph Construction Agent**

**Purpose:** Transform extracted entities into InfraNodus-compatible graph.

**Agent Implementation:**

class GraphConstructionAgent {  
  async execute(input: {  
    sessionId: string;  
    clientId: string;  
  }) {  
    // Load entities and relationships  
    const entities \= await this.loadEntities(input.sessionId);  
    const relationships \= await this.loadRelationships(input.sessionId);  
      
    // Format for InfraNodus  
    const graphData \= this.formatForInfraNodus(entities, relationships);  
      
    // Import to InfraNodus  
    const importResponse \= await this.importToInfraNodus(graphData);  
      
    // Store graph metadata as ontology  
    const graphOntology \= {  
      "@context": "https://schema.org",  
      "@type": "Graph",  
      identifier: crypto.randomUUID(),  
      sessionId: input.sessionId,  
      infraNodusGraphId: importResponse.graph\_id,  
      nodeCount: importResponse.stats.nodes,  
      edgeCount: importResponse.stats.edges,  
      density: importResponse.stats.density,  
      dateCreated: new Date().toISOString()  
    };  
      
    await this.supabase  
      .from('baiv\_ontologies')  
      .insert({  
        client\_id: input.clientId,  
        ontology\_type: 'knowledge\_graph',  
        data: graphOntology  
      });  
      
    return {  
      graphId: importResponse.graph\_id,  
      stats: importResponse.stats  
    };  
  }  
    
  private formatForInfraNodus(entities: any\[\], relationships: any\[\]) {  
    return {  
      nodes: entities.map(e \=\> ({  
        id: e.data.identifier,  
        label: e.data.name,  
        category: e.data.entityType,  
        weight: e.data.mentionCount,  
        metadata: {  
          schema\_type: e.data.schemaType,  
          confidence: e.data.confidence  
        }  
      })),  
      edges: relationships.map(r \=\> ({  
        source: r.data.fromEntity.identifier,  
        target: r.data.toEntity.identifier,  
        type: r.data.relationshipType,  
        weight: r.data.strength  
      }))  
    };  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P4 Agent Invoked\] \--\> B\[Load Entity Ontologies\]  
    B \--\> C\[Load Relationship Ontologies\]  
    C \--\> D\[Format for InfraNodus\<br/\>Nodes \+ Edges\]  
    D \--\> E\[Validate Graph Structure\]  
    E \--\> F\[POST to InfraNodus API\]  
    F \--\> G\[Receive Graph ID\]  
    G \--\> H\[Create Graph Ontology\]  
    H \--\> I\[Store JSONB in Supabase\]  
    I \--\> J\[Invoke P5 Agent\]

---

### **Process 5 (P5): Gap Analysis Agent**

**Purpose:** Leverage InfraNodus to identify structural knowledge gaps.

**Agent Implementation:**

class GapAnalysisAgent {  
  async execute(input: {  
    sessionId: string;  
    clientId: string;  
  }) {  
    // Load graph metadata  
    const graph \= await this.loadGraph(input.sessionId);  
      
    // Request gap analysis from InfraNodus  
    const gapAnalysis \= await this.analyzeGaps(graph.data.infraNodusGraphId);  
      
    // Process and prioritize gaps  
    const prioritizedGaps \= this.prioritizeGaps(  
      gapAnalysis.structural\_holes,  
      gapAnalysis.bridge\_concepts  
    );  
      
    // Store as gap ontologies  
    await Promise.all(  
      prioritizedGaps.map(gap \=\>   
        this.storeGapOntology(input.clientId, graph.data.identifier, gap)  
      )  
    );  
      
    return {  
      gapCount: prioritizedGaps.length,  
      criticalGaps: prioritizedGaps.filter(g \=\> g.priorityTier \=== 'Critical').length  
    };  
  }  
    
  private prioritizeGaps(structuralHoles: any\[\], bridgeConcepts: any\[\]) {  
    return structuralHoles.map(hole \=\> {  
      const priorityScore \= (  
        hole.betweenness\_score \* 0.3 \+  
        hole.bridging\_potential \* 0.3 \+  
        0.7 \* 0.25 \+ // businessRelevance placeholder  
        0.5 \* 0.15   // competitiveValue placeholder  
      );  
        
      return {  
        ...hole,  
        priorityScore,  
        priorityTier: priorityScore \> 0.7 ? 'Critical' :  
                     priorityScore \> 0.5 ? 'High' :  
                     priorityScore \> 0.3 ? 'Medium' : 'Low'  
      };  
    });  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P5 Agent Invoked\] \--\> B\[Load Graph Ontology\]  
    B \--\> C\[GET InfraNodus Gap Analysis\]  
    C \--\> D\[Extract Structural Holes\]  
    D \--\> E\[Extract Bridge Concepts\]  
    E \--\> F\[Calculate Priority Scores\]  
    F \--\> G\[Map to Business Context\]  
    G \--\> H\[Create Gap Ontologies\]  
    H \--\> I\[Store JSONB in Supabase\]  
    I \--\> J\[Invoke P6 Agent\]

---

### **Process 6 (P6): Opportunity Identification Agent**

**Purpose:** Transform gaps into actionable content opportunities.

**Agent Implementation:**

class OpportunityIdentificationAgent {  
  async execute(input: {  
    sessionId: string;  
    clientId: string;  
  }) {  
    // Load gap ontologies  
    const gaps \= await this.loadGaps(input.sessionId);  
      
    // Generate opportunities using Claude  
    const opportunities \= await this.generateOpportunities(gaps);  
      
    // Validate and prioritize  
    const validated \= this.validateOpportunities(opportunities);  
      
    // Store as opportunity ontologies  
    await Promise.all(  
      validated.map(opp \=\>   
        this.storeOpportunityOntology(input.clientId, opp)  
      )  
    );  
      
    return {  
      opportunityCount: validated.length,  
      highImpact: validated.filter(o \=\> o.aiVisibilityImpact \=== 'high').length  
    };  
  }  
    
  private async generateOpportunities(gaps: any\[\]) {  
    const response \= await this.client.messages.create({  
      model: "claude-sonnet-4-5-20250929",  
      max\_tokens: 8192,  
      messages: \[{  
        role: "user",  
        content: \`Generate content opportunities from these knowledge gaps:  
          
        ${JSON.stringify(gaps, null, 2)}  
          
        For each gap, suggest specific content (title, type, topics, keywords,   
        AI visibility impact, effort estimate, priority).  
          
        Return as JSON array.\`  
      }\]  
    });  
      
    return JSON.parse(response.content\[0\].text);  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P6 Agent Invoked\] \--\> B\[Load Gap Ontologies\]  
    B \--\> C\[Load Client Context\]  
    C \--\> D\[Claude API Call\<br/\>Opportunity Generation\]  
    D \--\> E\[Parse JSON Opportunities\]  
    E \--\> F\[Validate Against Goals\]  
    F \--\> G\[Calculate ROI Estimates\]  
    G \--\> H\[Prioritize by Impact\]  
    H \--\> I\[Create Opportunity Ontologies\]  
    I \--\> J\[Store JSONB in Supabase\]  
    J \--\> K\[Invoke P7 Agent\]

---

### **Process 7 (P7): Strategy Generation Agent**

**Purpose:** Synthesize all analysis into comprehensive strategy.

**Agent Implementation:**

class StrategyGenerationAgent {  
  async execute(input: {  
    sessionId: string;  
    clientId: string;  
  }) {  
    // Load all prior analysis  
    const discovery \= await this.loadDiscoverySession(input.sessionId);  
    const graph \= await this.loadGraph(input.sessionId);  
    const gaps \= await this.loadGaps(input.sessionId);  
    const opportunities \= await this.loadOpportunities(input.sessionId);  
      
    // Generate strategy using Claude  
    const strategy \= await this.generateStrategy({  
      discovery,  
      graph,  
      gaps,  
      opportunities  
    });  
      
    // Store as strategy ontology  
    await this.storeStrategyOntology(input.clientId, input.sessionId, strategy);  
      
    return {  
      strategyId: strategy.identifier,  
      status: 'draft'  
    };  
  }  
    
  private async generateStrategy(data: any) {  
    const response \= await this.client.messages.create({  
      model: "claude-sonnet-4-5-20250929",  
      max\_tokens: 16384,  
      messages: \[{  
        role: "user",  
        content: \`Create comprehensive AI visibility strategy from this analysis:  
          
        Discovery: ${JSON.stringify(data.discovery)}  
        Graph: ${JSON.stringify(data.graph)}  
        Gaps: ${JSON.stringify(data.gaps)}  
        Opportunities: ${JSON.stringify(data.opportunities)}  
          
        Include: executive summary, goals, content strategy,   
        implementation roadmap (4 phases), success metrics.  
          
        Return as schema.org Plan ontology in JSON.\`  
      }\]  
    });  
      
    return JSON.parse(response.content\[0\].text);  
  }  
}

**Agent Flow:**

flowchart TD  
    A\[P7 Agent Invoked\] \--\> B\[Load All Ontologies\<br/\>P1-P6\]  
    B \--\> C\[Load Business Context\]  
    C \--\> D\[Claude API Call\<br/\>Strategy Synthesis\]  
    D \--\> E\[Parse Strategy JSON\]  
    E \--\> F\[Validate Completeness\]  
    F \--\> G\[Create Strategy Ontology\]  
    G \--\> H\[Store JSONB in Supabase\]  
    H \--\> I\[Generate Presentation\]  
    I \--\> J\[Notify for Review\]

---

## **Master Orchestrator (VEOA)**

class ValueEngineeringOrchestratingAgent {  
  private agents \= {  
    P1: new DiscoveryAgent(),  
    P2: new ContentExtractionAgent(),  
    P3: new EntityRelationshipAgent(),  
    P4: new GraphConstructionAgent(),  
    P5: new GapAnalysisAgent(),  
    P6: new OpportunityIdentificationAgent(),  
    P7: new StrategyGenerationAgent()  
  };  
    
  async orchestrate(input: {  
    clientId: string;  
    websiteUrl: string;  
    linkedinUrl?: string;  
  }) {  
    try {  
      // P1: Discovery  
      const discovery \= await this.agents.P1.execute(input);  
        
      // P2: Content Extraction  
      const content \= await this.agents.P2.execute({  
        sessionId: discovery.sessionId,  
        clientId: input.clientId  
      });  
        
      // P3: Entity Relationships  
      const entities \= await this.agents.P3.execute({  
        sessionId: discovery.sessionId,  
        clientId: input.clientId  
      });  
        
      // P4: Graph Construction  
      const graph \= await this.agents.P4.execute({  
        sessionId: discovery.sessionId,  
        clientId: input.clientId  
      });  
        
      // P5: Gap Analysis  
      const gaps \= await this.agents.P5.execute({  
        sessionId: discovery.sessionId,  
        clientId: input.clientId  
      });  
        
      // P6: Opportunity Identification  
      const opportunities \= await this.agents.P6.execute({  
        sessionId: discovery.sessionId,  
        clientId: input.clientId  
      });  
        
      // P7: Strategy Generation  
      const strategy \= await this.agents.P7.execute({  
        sessionId: discovery.sessionId,  
        clientId: input.clientId  
      });  
        
      return {  
        success: true,  
        sessionId: discovery.sessionId,  
        strategyId: strategy.strategyId,  
        summary: {  
          entities: entities.entityCount,  
          gaps: gaps.gapCount,  
          opportunities: opportunities.opportunityCount  
        }  
      };  
        
    } catch (error) {  
      await this.handleError(error, input.clientId);  
      throw error;  
    }  
  }  
}

---

## **Query Patterns**

### **Retrieve Discovery Session**

SELECT data   
FROM baiv\_ontologies   
WHERE client\_id \= $1   
  AND ontology\_type \= 'discovery\_session'   
  AND data-\>\>'sessionId' \= $2;

### **Find All Entities for Session**

SELECT data   
FROM baiv\_ontologies   
WHERE client\_id \= $1   
  AND ontology\_type \= 'entity'   
  AND data-\>\>'sessionId' \= $2  
ORDER BY (data-\>\>'confidence')::decimal DESC;

### **Get Critical Gaps**

SELECT data   
FROM baiv\_ontologies   
WHERE client\_id \= $1   
  AND ontology\_type \= 'gap'   
  AND data-\>\>'priorityTier' \= 'Critical'  
ORDER BY (data-\>\>'priorityScore')::decimal DESC;

### **Opportunities by AI Visibility Impact**

SELECT data   
FROM baiv\_ontologies   
WHERE client\_id \= $1   
  AND ontology\_type \= 'opportunity'   
  AND data-\>\>'aiVisibilityImpact' \= 'high'  
ORDER BY (data-\>\>'effortEstimate')::int ASC;

---

## **Performance Expectations**

| Process | Duration | Primary Bottleneck |
| ----- | ----- | ----- |
| P1: Discovery | 2-5 min | URL validation |
| P2: Extraction | 5-15 min | Web scraping |
| P3: Entities | 10-30 min | Claude API calls |
| P4: Graph | 2-5 min | InfraNodus import |
| P5: Gaps | 3-8 min | InfraNodus analysis |
| P6: Opportunities | 5-15 min | Claude generation |
| P7: Strategy | 10-20 min | Claude synthesis |
| **Total** | **37-98 min** | API rate limits |

---

## **Version History**

| Version | Date | Changes | Author |
| ----- | ----- | ----- | ----- |
| 2.0 | 2025-12-06 | Converted to Claude Agent SDK, JSONB ontologies | Amanda Moore |
| 1.0 | 2025-12-06 | Initial N8N version | Amanda Moore |

---

**End of Document**

