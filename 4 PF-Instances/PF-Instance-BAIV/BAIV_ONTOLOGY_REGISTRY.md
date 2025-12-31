# BAIV Ontology Registry v1.0.0

**Complete Registry of BAIV Ontologies with JSON-LD Specifications**

| Attribute | Value |
|-----------|-------|
| **Document Version** | 1.0.0 |
| **Date** | December 31, 2025 |
| **Purpose** | Complete ontology inventory and JSON-LD specifications for BAIV |
| **Status** | 🟢 Active |
| **Owner** | BAIV Product Team |
| **Parent Documents** | BAIV_AGENT_INVENTORY.md, PFC-PFI-BAIV_MODULE_CATALOG.md |
| **Related Artifacts** | UNIVERSAL_AGENT_TEMPLATE.md, PFC-PFI-BAIV_INTEGRATION_BRIDGES.md |

---

## Executive Summary

BAIV implements **30+ ontologies** organized into 5 categories following JSON-LD and Schema.org standards. All ontologies are registered in the OAA Registry and bound to agents through the ontology binding pattern.

**Ontology Categories:**
1. **Discovery Ontologies (5)** - Client discovery, ICP, context
2. **Analysis Ontologies (8)** - Citation, gap analysis, queries, performance
3. **Content Ontologies (6)** - Blog posts, social, schema, metadata
4. **Business Ontologies (6)** - Financial metrics, customers, PMF signals
5. **Operational Ontologies (5)** - Audit logs, agent metrics, publishing

**Registry Structure:**
- Each ontology has unique ID: `BAIV-ONT-{Name}-v{version}`
- Complete JSON-LD specification
- Agent binding mappings
- Database table mappings
- Validation rules

---

## Table of Contents

1. [Discovery Ontologies](#discovery-ontologies)
2. [Analysis Ontologies](#analysis-ontologies)
3. [Content Ontologies](#content-ontologies)
4. [Business Ontologies](#business-ontologies)
5. [Operational Ontologies](#operational-ontologies)
6. [Ontology Registration Process](#ontology-registration-process)
7. [Agent Ontology Bindings](#agent-ontology-bindings)
8. [Validation Rules](#validation-rules)

---

## Discovery Ontologies

### 1. BAIV-ONT-Client-Context

**Ontology ID:** `baiv-ont-client-context-v1.0.0`  
**Purpose:** Master context file for all client information  
**Produces:** Discovery Agent, ICP Discovery Agent  
**Consumes:** All BAIV agents (requires context)  
**Table:** `client_contexts`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/",
    "pf": "https://pf-core/ontology/"
  },
  "@type": "baiv:ClientContext",
  "@id": "baiv-ont-client-context-v1.0.0",
  
  "name": "Client Context Ontology",
  "description": "Master context file containing all client information",
  "version": "1.0.0",
  
  "properties": {
    "client_id": {
      "type": "string",
      "description": "Unique client identifier",
      "required": true
    },
    "client_name": {
      "type": "string",
      "description": "Client business name",
      "required": true
    },
    "client_url": {
      "type": "string",
      "format": "uri",
      "description": "Primary client website URL",
      "required": true
    },
    "industry": {
      "type": "string",
      "description": "Client industry/niche",
      "required": true
    },
    "target_geography": {
      "type": "string",
      "description": "Target geographic market",
      "required": false
    },
    "competitor_urls": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri"
      },
      "description": "List of 2-5 competitor URLs",
      "minItems": 2,
      "maxItems": 5
    },
    "content_themes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Primary content themes identified"
    },
    "key_products": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Key products or services offered"
    },
    "brand_messaging": {
      "type": "string",
      "description": "Core brand messaging and positioning"
    },
    "schema_status": {
      "type": "object",
      "properties": {
        "has_schema": "boolean",
        "schema_types": "array",
        "validation_score": "number"
      }
    },
    "crawler_permissions": {
      "type": "object",
      "properties": {
        "allows_gptbot": "boolean",
        "allows_claudebot": "boolean",
        "allows_geminibot": "boolean",
        "robots_txt_url": "string"
      }
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["client_id", "client_name", "client_url", "industry"]
}
```

---

### 2. BAIV-ONT-Discovery-Report

**Ontology ID:** `baiv-ont-discovery-report-v1.0.0`  
**Purpose:** Discovery audit findings and analysis  
**Produces:** Discovery Agent  
**Consumes:** ICP Discovery Agent, Gap Analyzer Agent  
**Table:** `discovery_reports`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:DiscoveryReport",
  "@id": "baiv-ont-discovery-report-v1.0.0",
  
  "name": "Discovery Report Ontology",
  "description": "Discovery audit findings and website analysis",
  "version": "1.0.0",
  
  "properties": {
    "report_id": {
      "type": "string",
      "description": "Unique report identifier"
    },
    "client_id": {
      "type": "string",
      "description": "Associated client ID"
    },
    "website_structure": {
      "type": "object",
      "properties": {
        "page_count": "number",
        "sitemap_url": "string",
        "navigation_structure": "object",
        "url_patterns": "array"
      }
    },
    "web_presence": {
      "type": "object",
      "properties": {
        "domain_authority": "number",
        "backlink_count": "number",
        "social_profiles": "array",
        "review_sites": "array"
      }
    },
    "content_analysis": {
      "type": "object",
      "properties": {
        "content_types": "array",
        "avg_word_count": "number",
        "content_quality_score": "number",
        "topics_covered": "array"
      }
    },
    "schema_audit": {
      "type": "object",
      "properties": {
        "schema_types_found": "array",
        "schema_completeness": "number",
        "validation_errors": "array"
      }
    },
    "crawlability_assessment": {
      "type": "object",
      "properties": {
        "robots_txt_status": "string",
        "sitemap_status": "string",
        "crawler_permissions": "object",
        "technical_seo_score": "number"
      }
    },
    "recommendations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "priority": "string",
          "category": "string",
          "recommendation": "string",
          "impact": "string"
        }
      }
    },
    "completed_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["report_id", "client_id", "completed_at"]
}
```

---

### 3. BAIV-ONT-ICP-Profile

**Ontology ID:** `baiv-ont-icp-profile-v1.0.0`  
**Purpose:** Ideal Customer Profile documentation  
**Produces:** ICP Discovery Agent  
**Consumes:** Query Expansion Agent, Gap Analyzer Agent, Content Agents  
**Table:** `icp_profiles`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:ICPProfile",
  "@id": "baiv-ont-icp-profile-v1.0.0",
  
  "name": "ICP Profile Ontology",
  "description": "Ideal Customer Profile definition and characteristics",
  "version": "1.0.0",
  
  "properties": {
    "profile_id": {
      "type": "string",
      "description": "Unique ICP profile identifier"
    },
    "client_id": {
      "type": "string",
      "description": "Associated client ID"
    },
    "customer_segments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "segment_name": "string",
          "size_estimate": "number",
          "characteristics": "array",
          "value_score": "number"
        }
      }
    },
    "pain_points": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "pain_point": "string",
          "severity": "string",
          "frequency": "string",
          "solutions_sought": "array"
        }
      }
    },
    "journey_stages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "stage": { "enum": ["awareness", "consideration", "decision"] },
          "typical_queries": "array",
          "content_needed": "array",
          "conversion_rate": "number"
        }
      }
    },
    "online_communities": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "platform": "string",
          "community_name": "string",
          "url": "string",
          "member_count": "number",
          "relevance_score": "number"
        }
      }
    },
    "query_patterns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "query_category": "string",
          "example_queries": "array",
          "search_volume": "number",
          "intent": "string"
        }
      }
    },
    "competitor_audiences": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "competitor_name": "string",
          "audience_overlap": "number",
          "unique_segments": "array"
        }
      }
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["profile_id", "client_id", "customer_segments", "journey_stages"]
}
```

---

### 4. BAIV-ONT-Customer-Pathway

**Ontology ID:** `baiv-ont-customer-pathway-v1.0.0`  
**Purpose:** Customer journey stage definitions  
**Produces:** ICP Discovery Agent  
**Consumes:** Turn Analysis Agent, Query Expansion Agent  
**Table:** `customer_pathways`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:CustomerPathway",
  "@id": "baiv-ont-customer-pathway-v1.0.0",
  
  "name": "Customer Pathway Ontology",
  "description": "Customer journey stages and behaviors",
  "version": "1.0.0",
  
  "properties": {
    "pathway_id": {
      "type": "string"
    },
    "client_id": {
      "type": "string"
    },
    "stage": {
      "type": "string",
      "enum": ["awareness", "consideration", "decision"],
      "description": "Journey stage"
    },
    "typical_behaviors": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Expected customer behaviors at this stage"
    },
    "content_types": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Content types effective at this stage"
    },
    "query_characteristics": {
      "type": "object",
      "properties": {
        "query_length": "number",
        "specificity": "string",
        "intent_type": "string",
        "common_keywords": "array"
      }
    },
    "conversion_metrics": {
      "type": "object",
      "properties": {
        "citation_rate": "number",
        "engagement_rate": "number",
        "conversion_to_next_stage": "number"
      }
    }
  },
  
  "required": ["pathway_id", "client_id", "stage"]
}
```

---

### 5. BAIV-ONT-Universal-Brand

**Ontology ID:** `baiv-ont-universal-brand-v1.0.0`  
**Purpose:** Brand identity and messaging (from PFC CRM modules)  
**Produces:** Discovery Agent  
**Consumes:** All content creation agents  
**Table:** `brands`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/",
    "pf": "https://pf-core/ontology/"
  },
  "@type": "pf:UniversalBrand",
  "@id": "baiv-ont-universal-brand-v1.0.0",
  
  "name": "Universal Brand Ontology",
  "description": "Brand identity, voice, and messaging guidelines",
  "version": "1.0.0",
  
  "properties": {
    "brand_id": {
      "type": "string"
    },
    "brand_name": {
      "type": "string"
    },
    "brand_voice": {
      "type": "object",
      "properties": {
        "tone": { "enum": ["professional", "conversational", "technical", "friendly"] },
        "formality": { "enum": ["formal", "casual", "mixed"] },
        "personality_traits": "array"
      }
    },
    "messaging": {
      "type": "object",
      "properties": {
        "tagline": "string",
        "value_proposition": "string",
        "key_messages": "array",
        "differentiators": "array"
      }
    },
    "visual_identity": {
      "type": "object",
      "properties": {
        "primary_color": "string",
        "secondary_color": "string",
        "logo_url": "string",
        "typography": "object"
      }
    },
    "brand_guidelines": {
      "type": "object",
      "properties": {
        "dos": "array",
        "donts": "array",
        "example_content": "array"
      }
    }
  },
  
  "required": ["brand_id", "brand_name", "brand_voice"]
}
```

---

## Analysis Ontologies

### 6. BAIV-ONT-Citation-Test-Result

**Ontology ID:** `baiv-ont-citation-test-result-v1.0.0`  
**Purpose:** Citation test results from AI platforms  
**Produces:** Citation Tester Agent, Google AI Mode Tester Agent  
**Consumes:** Gap Analyzer, Attribution Metrics, Turn Analysis  
**Table:** `citation_results`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:CitationTestResult",
  "@id": "baiv-ont-citation-test-result-v1.0.0",
  
  "name": "Citation Test Result Ontology",
  "description": "Results from AI platform citation testing",
  "version": "1.0.0",
  
  "properties": {
    "result_id": {
      "type": "string"
    },
    "audit_id": {
      "type": "string",
      "description": "Associated audit ID"
    },
    "query_id": {
      "type": "string"
    },
    "query_text": {
      "type": "string"
    },
    "platform": {
      "type": "string",
      "enum": ["ChatGPT", "Claude", "Gemini", "Perplexity", "Google AI Mode"]
    },
    "client_cited": {
      "type": "boolean"
    },
    "client_position": {
      "type": "number",
      "minimum": 1,
      "description": "Position in citation list (1 = first)"
    },
    "competitors_cited": {
      "type": "array",
      "items": { "type": "string" },
      "description": "List of competitor URLs cited"
    },
    "citation_type": {
      "type": "string",
      "enum": ["text", "table", "interactive", "calculator", "visualization"]
    },
    "citation_context": {
      "type": "string",
      "description": "Context in which citation appeared"
    },
    "rpi_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "Relevance Position Index score"
    },
    "response_snippet": {
      "type": "string",
      "description": "Relevant snippet from AI response"
    },
    "tested_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["result_id", "audit_id", "query_text", "platform", "client_cited", "tested_at"]
}
```

---

### 7. BAIV-ONT-RPI-Score

**Ontology ID:** `baiv-ont-rpi-score-v1.0.0`  
**Purpose:** Relevance Position Index scores  
**Produces:** Citation Tester Agent  
**Consumes:** Attribution Metrics Agent, Gap Analyzer  
**Table:** `rpi_scores`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:RPIScore",
  "@id": "baiv-ont-rpi-score-v1.0.0",
  
  "name": "RPI Score Ontology",
  "description": "Relevance Position Index scoring methodology",
  "version": "1.0.0",
  
  "properties": {
    "score_id": {
      "type": "string"
    },
    "result_id": {
      "type": "string",
      "description": "Associated citation result ID"
    },
    "query_id": {
      "type": "string"
    },
    "platform": {
      "type": "string"
    },
    "score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "RPI score (0-100)"
    },
    "components": {
      "type": "object",
      "properties": {
        "position_score": {
          "type": "number",
          "description": "Score based on citation position"
        },
        "relevance_score": {
          "type": "number",
          "description": "Score based on query relevance"
        },
        "context_score": {
          "type": "number",
          "description": "Score based on citation context quality"
        }
      }
    },
    "calculation_method": {
      "type": "string",
      "description": "Formula: 1/(60+position)"
    },
    "calculated_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["score_id", "result_id", "score"]
}
```

---

### 8. BAIV-ONT-Gap-Analysis

**Ontology ID:** `baiv-ont-gap-analysis-v1.0.0`  
**Purpose:** Content and citation gaps (product-level)  
**Produces:** Gap Analyzer Agent  
**Consumes:** Content creation agents, Attribution Metrics  
**Table:** `gaps`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:GapAnalysis",
  "@id": "baiv-ont-gap-analysis-v1.0.0",
  
  "name": "Gap Analysis Ontology",
  "description": "Content and citation gaps identified for client",
  "version": "1.0.0",
  
  "properties": {
    "gap_id": {
      "type": "string",
      "pattern": "^gap-baiv-\\d{3}$"
    },
    "tenant_id": {
      "type": "string"
    },
    "audit_id": {
      "type": "string"
    },
    "gap_type": {
      "type": "string",
      "enum": ["topic_coverage", "keyword", "citation_opportunity", "competitor_advantage"]
    },
    "client_brand": {
      "type": "string"
    },
    "competitor_brand": {
      "type": "string",
      "description": "Relevant competitor (if applicable)"
    },
    "topic": {
      "type": "string"
    },
    "keywords": {
      "type": "array",
      "items": { "type": "string" }
    },
    "competitor_citations": {
      "type": "number",
      "description": "Number of times competitor cited"
    },
    "client_citations": {
      "type": "number",
      "description": "Number of times client cited"
    },
    "search_volume": {
      "type": "number",
      "description": "Monthly search volume"
    },
    "difficulty": {
      "type": "string",
      "enum": ["easy", "medium", "hard"]
    },
    "priority": {
      "type": "string",
      "enum": ["P0", "P1", "P2", "P3"]
    },
    "recommendation": {
      "type": "string"
    },
    "estimated_impact": {
      "type": "string"
    },
    "identified_date": {
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "type": "string",
      "enum": ["open", "content_created", "optimized", "closed"]
    }
  },
  
  "required": ["gap_id", "tenant_id", "gap_type", "topic", "priority", "status"]
}
```

---

### 9. BAIV-ONT-Query-Category

**Ontology ID:** `baiv-ont-query-category-v1.0.0`  
**Purpose:** Query definitions and categorization  
**Produces:** ICP Discovery Agent, Query Expansion Agent  
**Consumes:** Citation Tester, Turn Analysis, Gap Analyzer  
**Table:** `query_categories`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:QueryCategory",
  "@id": "baiv-ont-query-category-v1.0.0",
  
  "name": "Query Category Ontology",
  "description": "Query categorization and classification",
  "version": "1.0.0",
  
  "properties": {
    "category_id": {
      "type": "string"
    },
    "client_id": {
      "type": "string"
    },
    "category_name": {
      "type": "string"
    },
    "query_text": {
      "type": "string"
    },
    "intent": {
      "type": "string",
      "enum": ["informational", "navigational", "transactional", "commercial"]
    },
    "journey_stage": {
      "type": "string",
      "enum": ["awareness", "consideration", "decision"]
    },
    "search_volume": {
      "type": "number"
    },
    "competition": {
      "type": "string",
      "enum": ["low", "medium", "high"]
    },
    "priority": {
      "type": "number",
      "minimum": 1,
      "maximum": 10
    },
    "variations": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Query variations"
    }
  },
  
  "required": ["category_id", "client_id", "query_text", "intent"]
}
```

---

### 10. BAIV-ONT-Query-Fanout

**Ontology ID:** `baiv-ont-query-fanout-v1.0.0`  
**Purpose:** Query expansion variations (25+ per core query)  
**Produces:** Query Expansion Agent  
**Consumes:** Gap Analyzer, Content creation agents  
**Table:** `query_fanouts`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:QueryFanout",
  "@id": "baiv-ont-query-fanout-v1.0.0",
  
  "name": "Query Fanout Ontology",
  "description": "Expanded query variations for comprehensive coverage",
  "version": "1.0.0",
  
  "properties": {
    "fanout_id": {
      "type": "string"
    },
    "core_query": {
      "type": "string"
    },
    "variations": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 25,
      "description": "At least 25 query variations"
    },
    "total_search_volume": {
      "type": "number"
    },
    "cluster_intent": {
      "type": "string",
      "enum": ["informational", "navigational", "transactional", "commercial"]
    },
    "subtopics": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  
  "required": ["fanout_id", "core_query", "variations"]
}
```

---

### 11. BAIV-ONT-RRF-Score

**Ontology ID:** `baiv-ont-rrf-score-v1.0.0`  
**Purpose:** Reciprocal Rank Fusion health scores  
**Produces:** Gap Analyzer Agent  
**Consumes:** Content creation agents, Attribution Metrics  
**Table:** `rrf_topic_coverage`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:RRFScore",
  "@id": "baiv-ont-rrf-score-v1.0.0",
  
  "name": "RRF Score Ontology",
  "description": "Reciprocal Rank Fusion scoring for topic coverage",
  "version": "1.0.0",
  
  "properties": {
    "score_id": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "article_count": {
      "type": "number",
      "description": "Number of articles on this topic"
    },
    "rrf_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "RRF health score (formula: 1/(60+rank))"
    },
    "citation_rate": {
      "type": "number",
      "description": "Percentage of queries citing client for this topic"
    },
    "coverage_status": {
      "type": "string",
      "enum": ["excellent", "good", "fair", "poor"]
    },
    "breadth_vs_depth": {
      "type": "object",
      "properties": {
        "breadth_score": "number",
        "depth_score": "number",
        "recommendation": "string"
      }
    }
  },
  
  "required": ["score_id", "topic", "article_count", "rrf_score"]
}
```

---

### 12. BAIV-ONT-Turn-Analysis

**Ontology ID:** `baiv-ont-turn-analysis-v1.0.0`  
**Purpose:** Conversation turn pattern analysis  
**Produces:** Turn Analysis Agent  
**Consumes:** Content creation agents, Gap Analyzer  
**Table:** `turn_analyses`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:TurnAnalysis",
  "@id": "baiv-ont-turn-analysis-v1.0.0",
  
  "name": "Turn Analysis Ontology",
  "description": "Multi-turn conversation pattern analysis",
  "version": "1.0.0",
  
  "properties": {
    "analysis_id": {
      "type": "string"
    },
    "pattern_type": {
      "type": "string",
      "enum": ["quick_answer", "research_journey", "comparison"]
    },
    "turn_depth": {
      "type": "number",
      "minimum": 1,
      "description": "Number of conversational turns"
    },
    "journey_stage": {
      "type": "string",
      "enum": ["awareness", "consideration", "decision"]
    },
    "citation_rate": {
      "type": "number"
    },
    "recommendations": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  
  "required": ["analysis_id", "pattern_type", "turn_depth"]
}
```

---

### 13. BAIV-ONT-LLM-Mention

**Ontology ID:** `baiv-ont-llm-mention-v1.0.0`  
**Purpose:** Brand mentions discovered across AI platforms  
**Produces:** LLM Mentions Agent  
**Consumes:** Attribution Metrics, Gap Analyzer  
**Table:** `llm_mentions`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:LLMMention",
  "@id": "baiv-ont-llm-mention-v1.0.0",
  
  "name": "LLM Mention Ontology",
  "description": "Brand mentions discovered across AI platforms",
  "version": "1.0.0",
  
  "properties": {
    "mention_id": {
      "type": "string"
    },
    "platform": {
      "type": "string",
      "enum": ["ChatGPT", "Claude", "Gemini", "Perplexity", "Google AI Mode"]
    },
    "query_context": {
      "type": "string"
    },
    "brand_mentioned": {
      "type": "string"
    },
    "mention_type": {
      "type": "string",
      "enum": ["direct_citation", "brand_mention", "indirect_reference"]
    },
    "position": {
      "type": "number"
    },
    "sentiment": {
      "type": "string",
      "enum": ["positive", "negative", "neutral"]
    },
    "discovered_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["mention_id", "platform", "brand_mentioned", "mention_type"]
}
```

---

## Content Ontologies

### 14. BAIV-ONT-Blog-Post

**Ontology ID:** `baiv-ont-blog-post-v1.0.0`  
**Purpose:** Generated blog posts  
**Produces:** Blog Creator Agent  
**Consumes:** Publishing agents, Content Performance tracking  
**Table:** `blog_posts`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:BlogPost",
  "@id": "baiv-ont-blog-post-v1.0.0",
  
  "name": "Blog Post Ontology",
  "description": "AI-generated blog post content",
  "version": "1.0.0",
  
  "properties": {
    "post_id": {
      "type": "string"
    },
    "tenant_id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "slug": {
      "type": "string"
    },
    "content": {
      "type": "string",
      "description": "Markdown content"
    },
    "word_count": {
      "type": "number",
      "minimum": 2500,
      "description": "Target: 2500+ words"
    },
    "sections": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "heading": "string",
          "content": "string",
          "word_count": "number"
        }
      }
    },
    "toc": {
      "type": "object",
      "description": "Table of contents"
    },
    "meta_tags": {
      "type": "object",
      "properties": {
        "title": "string",
        "description": "string",
        "keywords": "array"
      }
    },
    "schema_markup": {
      "type": "object",
      "description": "JSON-LD schema for article"
    },
    "faqs": {
      "type": "array"
    },
    "images": {
      "type": "array"
    },
    "status": {
      "type": "string",
      "enum": ["draft", "review", "approved", "published"]
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "published_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["post_id", "tenant_id", "title", "content", "status"]
}
```

---

### 15. BAIV-ONT-Social-Post

**Ontology ID:** `baiv-ont-social-post-v1.0.0`  
**Purpose:** Platform-optimized social media posts  
**Produces:** Social Media Creator Agent  
**Consumes:** Postiz Publisher Agent  
**Table:** `social_posts`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:SocialPost",
  "@id": "baiv-ont-social-post-v1.0.0",
  
  "name": "Social Post Ontology",
  "description": "Platform-optimized social media content",
  "version": "1.0.0",
  
  "properties": {
    "post_id": {
      "type": "string"
    },
    "tenant_id": {
      "type": "string"
    },
    "platform": {
      "type": "string",
      "enum": ["linkedin", "facebook", "instagram", "twitter", "threads", "bluesky"]
    },
    "content": {
      "type": "string"
    },
    "character_count": {
      "type": "number"
    },
    "hashtags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "image_url": {
      "type": "string",
      "format": "uri"
    },
    "optimal_post_time": {
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "type": "string",
      "enum": ["draft", "approved", "scheduled", "published"]
    }
  },
  
  "required": ["post_id", "tenant_id", "platform", "content", "status"]
}
```

---

### 16-20. Additional Content Ontologies

**16. BAIV-ONT-FAQ-Page** - FAQ content and schema  
**17. BAIV-ONT-Schema-Markup** - JSON-LD schema markup  
**18. BAIV-ONT-Meta-Tags** - SEO meta tags  
**19. BAIV-ONT-Link-Suggestions** - Internal/external link recommendations  
**20. BAIV-ONT-Image-Asset** - Generated images with metadata

*(Specifications follow same pattern as above)*

---

## Business Ontologies

### 21. BAIV-ONT-AI-Visibility-Score

**Ontology ID:** `baiv-ont-ai-visibility-score-v1.0.0`  
**Purpose:** Overall AI Visibility Score (0-100)  
**Produces:** Attribution Metrics Agent  
**Consumes:** Dashboard widgets, PMF tracking  
**Table:** `visibility_scores`

**JSON-LD Specification:**

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:AIVisibilityScore",
  "@id": "baiv-ont-ai-visibility-score-v1.0.0",
  
  "name": "AI Visibility Score Ontology",
  "description": "Overall AI Visibility Score from 5 weighted factors",
  "version": "1.0.0",
  
  "properties": {
    "score_id": {
      "type": "string"
    },
    "tenant_id": {
      "type": "string"
    },
    "overall_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "components": {
      "type": "object",
      "properties": {
        "citation_rate": {
          "type": "number",
          "maximum": 40,
          "description": "40 points max"
        },
        "rpi_score": {
          "type": "number",
          "maximum": 25,
          "description": "25 points max"
        },
        "platform_consistency": {
          "type": "number",
          "maximum": 15,
          "description": "15 points max"
        },
        "journey_coverage": {
          "type": "number",
          "maximum": 10,
          "description": "10 points max"
        },
        "content_authority": {
          "type": "number",
          "maximum": 10,
          "description": "10 points max"
        }
      }
    },
    "calculated_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  
  "required": ["score_id", "tenant_id", "overall_score", "components"]
}
```

---

### 22. BAIV-ONT-Customer-Organization

**Ontology ID:** `baiv-ont-customer-organization-v1.0.0`  
**Purpose:** Customer/tenant organization data (from PFC CRM)  
**Produces:** Discovery Agent  
**Consumes:** All agents (tenant context)  
**Table:** `customers`

*(JSON-LD specification follows PFC CRM-Customer-Organization pattern)*

---

### 23-26. Additional Business Ontologies

**23. BAIV-ONT-Financial-Metrics** - MRR, LTV, revenue data  
**24. BAIV-ONT-PMF-Signals** - NPS, retention, PMF indicators  
**25. BAIV-ONT-ROI-Projection** - Traffic and revenue projections  
**26. BAIV-ONT-Competitor-Benchmark** - Competitive comparison data

---

## Operational Ontologies

### 27. BAIV-ONT-Publishing-Log

**Ontology ID:** `baiv-ont-publishing-log-v1.0.0`  
**Purpose:** Publishing activity tracking  
**Produces:** Postiz Publisher, WordPress Publisher  
**Consumes:** Dashboard widgets, Process metrics  
**Table:** `publishing_log`

---

### 28-30. Additional Operational Ontologies

**28. BAIV-ONT-Reddit-Mention** - Reddit scraper findings  
**29. BAIV-ONT-Bluesky-Mention** - Bluesky scraper findings  
**30. BAIV-ONT-YouTube-Analysis** - YouTube transcript analysis

---

## Ontology Registration Process

### Step 1: Define Ontology

Create JSON-LD specification following Schema.org standards:

```typescript
// Example: Register new ontology
const ontologySpec = {
  "@context": {
    "@vocab": "https://schema.org/",
    "baiv": "https://baiv.co.uk/ontology/"
  },
  "@type": "baiv:NewOntology",
  "@id": "baiv-ont-new-ontology-v1.0.0",
  "name": "New Ontology",
  "description": "Purpose of this ontology",
  "version": "1.0.0",
  "properties": {
    // Define properties
  }
};
```

### Step 2: Register in OAA Registry

```sql
-- Register ontology
INSERT INTO public.ontologies (
  entry_id,
  name,
  version,
  ontology_type,
  schema_definition,
  status
) VALUES (
  'baiv-ont-new-ontology-v1.0.0',
  'New Ontology',
  '1.0.0',
  'domain',
  '[ontology_spec]'::jsonb,
  'active'
);
```

### Step 3: Create Database Table

```sql
-- Create corresponding table
CREATE TABLE new_ontology_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  -- Ontology properties as columns
  metadata JSONB DEFAULT '{}',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE new_ontology_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "new_ontology_tenant_isolation"
ON new_ontology_data
FOR ALL
USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### Step 4: Bind to Agents

```sql
-- Create agent-ontology binding
INSERT INTO public.agent_ontology_bindings (
  agent_id,
  ontology_id,
  binding_type,
  node_types,
  purpose
) VALUES (
  (SELECT id FROM agent_registry WHERE agent_id = 'agent-baiv-example-v1.0.0'),
  (SELECT id FROM ontologies WHERE entry_id = 'baiv-ont-new-ontology-v1.0.0'),
  'produces',
  ARRAY['NewOntology'],
  'Creates new ontology data'
);
```

---

## Agent Ontology Bindings

### Binding Matrix

| Agent | Consumes | Produces | Requires | Validates |
|-------|----------|----------|----------|-----------|
| Discovery Agent | Universal-Brand, Customer-Organization | Client-Context, Discovery-Report | VE-Context, Tenant-Config | Discovery-Validation |
| Citation Tester | Query-Category, Platform-Config, Client-Context | Citation-Test-Result, RPI-Score, Citation-Gap | VE-Context, ICP-Profile | Citation-Validation |
| Gap Analyzer | Citation-Test-Result, Query-Fanout, Client-Context | Gap-Analysis, RRF-Score, Content-Recommendation | VE-Context, ICP-Profile | Gap-Validation |
| Blog Creator | Content-Brief, Client-Context, Gap-Analysis | Blog-Post, FAQ-Page, Schema-Markup | VE-Context, ICP-Profile | Content-Validation |

*(Complete matrix includes all 16 agents)*

---

## Validation Rules

### Ontology Validation Checklist

Per ontology:
- [ ] Unique ID following convention: `baiv-ont-{name}-v{version}`
- [ ] Complete JSON-LD specification with @context
- [ ] All required properties defined
- [ ] Property types and constraints specified
- [ ] Database table created with RLS policies
- [ ] Registered in OAA Registry
- [ ] Agent bindings established
- [ ] Validation rules defined
- [ ] Test data created
- [ ] Documentation complete

### Quality Standards

**Ontology Design:**
- Must extend Schema.org where possible
- Custom properties in `baiv:` namespace
- Version numbers in semantic versioning format
- Required vs optional properties clearly marked

**Database Design:**
- Every table has tenant_id for multi-tenancy
- RLS policies enforce tenant isolation
- JSONB fields for flexible ontology data
- Audit fields (created_at, updated_at)

---

## Summary

**BAIV Ontology Registry:**
- **30+ ontologies** across 5 categories
- **Complete JSON-LD specifications** following Schema.org
- **Agent binding mappings** for all 16 agents
- **Database table mappings** with RLS policies
- **Registration process** documented
- **Validation rules** defined

**Implementation Checklist:**
- [ ] Register all ontologies in OAA Registry
- [ ] Create database tables with RLS
- [ ] Establish agent-ontology bindings
- [ ] Implement validation rules
- [ ] Generate TypeScript types from ontologies
- [ ] Create API routes for each ontology
- [ ] Write tests (80%+ coverage)
- [ ] Document usage patterns
- [ ] Deploy to staging and production

---

**Document Version:** 1.0.0  
**Status:** 🟢 Active  
**Next Review:** After ontology implementation  
**Related Documents:** BAIV_AGENT_INVENTORY.md, UNIVERSAL_AGENT_TEMPLATE.md, PFC-PFI-BAIV_INTEGRATION_BRIDGES.md
