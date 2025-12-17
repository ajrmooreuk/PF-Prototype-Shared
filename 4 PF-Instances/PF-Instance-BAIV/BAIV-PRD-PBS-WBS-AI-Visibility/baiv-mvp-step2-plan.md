# BAIV Agent Orchestrator - MVP Step 2 Plan
## P1-P7 Discovery & Plan Phase - Be AI Visible

**Document Version:** 2.0.0 - BAIV Edition  
**Project Phase:** Step 2 - Discovery & Plan MVP  
**Scope:** P1-P7 AI Visibility & Content Strategy  
**Timeline:** 8-10 Weeks Rapid Iteration  
**Domain:** SEO, Content Discovery, Brand Visibility Optimization  

---

## 📋 Executive Summary

### Strategic Positioning: Be AI Visible (BAIV)

This platform addresses the critical challenge of **AI visibility** in an era where:
- AI agents (ChatGPT, Claude, Perplexity) are primary research tools
- Traditional SEO is insufficient for AI-driven search
- Brand mentions in AI responses = competitive advantage
- Content must be AI-discoverable AND human-optimized

### The BAIV Value Proposition

**Problem:** Companies are invisible to AI agents conducting research for users. Traditional SEO doesn't address AI training data, citations, or conversational search patterns.

**Solution:** Automated discovery-to-publishing pipeline that:
1. Discovers what AI agents know (and don't know) about your brand
2. Identifies content gaps that AI agents can't answer
3. Creates AI-optimized content with schema markup
4. Monitors brand citations in AI responses
5. Predicts trending queries AI agents will face

### Competitive Advantages (Non-Obvious)

1. **AI Response Mining** - Scrape and analyze how AI agents describe competitors
2. **PAA Graph Mapping** - Build knowledge graphs from Google's People Also Ask
3. **Citation Velocity Tracking** - Monitor brand mention growth in AI responses
4. **Semantic Gap Detection** - Find questions AI agents struggle with
5. **Schema.org as AI Training Signal** - Structured data optimized for AI ingestion

### MVP Step 2 Scope: P1-P7 Discovery & Plan

```
┌─────────────────────────────────────────────────────────────────┐
│                   BAIV MVP STEP 2 ARCHITECTURE                   │
│                                                                  │
│  P1: CONFIG → P2: DISCOVERY → P3: CAPTURE → P4: AUDIT →        │
│  P5: ANALYTICS → P6: GAP ANALYSIS → P7: IDEATION                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │      ORCHESTRATOR AGENT (BAIV Workflow Controller)       │  │
│  │  - P1-P7 State Machine                                   │  │
│  │  - SEO/Content Agent Coordination                        │  │
│  │  - Tool/Skill Registry (SEO-focused)                     │  │
│  │  - Integration Router (Reddit, GSC, Analytics)           │  │
│  └──────────┬───────────────────────────────────────────────┘  │
│             │                                                    │
│     ┌───────┴────────┬────────┬────────┬────────┬──────┐       │
│     ▼                ▼        ▼        ▼        ▼      ▼       │
│  ┌──────┐   ┌──────────┐  ┌──────┐  ┌──────┐  ┌─────────┐    │
│  │Config│   │Discovery │  │Capture│ │Audit │  │Analytics│    │
│  │Agent │   │& Profile │  │Agent │  │Agent │  │ Agent   │    │
│  │      │   │Agent     │  │      │  │      │  │         │    │
│  │Tools:│   │Tools:    │  │Tools:│  │Tools:│  │Tools:   │    │
│  │-Prefs│   │-Reddit   │  │-PAA  │  │-Brand│  │-GSC     │    │
│  │-Intgr│   │-ScrapeAI │  │-Crawl│  │-Score│  │-GA4     │    │
│  │-Setup│   │-Compet   │  │-Invnt│  │-Audit│  │-SEMrush │    │
│  └──────┘   └──────────┘  └──────┘  └──────┘  └─────────┘    │
│                                                  │              │
│                               ┌──────────┐  ┌──────────┐       │
│                               │Gap Analys│  │Ideation  │       │
│                               │Agent     │  │Agent     │       │
│                               │          │  │          │       │
│                               │Tools:    │  │Tools:    │       │
│                               │-Opport   │  │-ContentAI│       │
│                               │-KeywdGap │  │-TrendGen │       │
│                               │-AIGap    │  │-TopicClus│       │
│                               └──────────┘  └──────────┘       │
│                                     │            │              │
│       ┌─────────────────────────────┴────────────┴────────┐    │
│       ▼                                                     ▼    │
│  ┌────────────────────────┐         ┌──────────────────────┐   │
│  │  INPUT INTEGRATIONS    │         │  OUTPUT INTEGRATIONS │   │
│  │  (SEO & Content Tools) │         │  (Content & CMS)     │   │
│  │                        │         │                      │   │
│  │  - Reddit API          │         │  - WordPress         │   │
│  │  - Google Search       │         │  - Webflow           │   │
│  │  - Google Console      │         │  - Notion            │   │
│  │  - SEMrush             │         │  - Airtable          │   │
│  │  - Ahrefs              │         │  - Google Sheets     │   │
│  │  - Perplexity API      │         │  - Slack             │   │
│  │  - ChatGPT API         │         │  - Email             │   │
│  │  - Claude API          │         │  - JSON Export       │   │
│  └────────────────────────┘         └──────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Part 1: P1-P7 BAIV Process Definitions

### P1: Configuration Agent (Business Parameter Setup)

**Purpose**: Initialize BAIV workspace with business parameters, competitors, and monitoring preferences  
**Duration**: 5-10 minutes  
**Agent**: Configuration Agent  
**Key Differentiator**: AI-optimized setup with semantic competitor mapping

**Process Steps:**

1. **Business Profile Setup**
   - Company name, industry, target audience
   - Primary products/services
   - Unique value propositions
   - Geographic markets
   - Target keywords/topics

2. **Competitor Configuration**
   - Direct competitors (5-10)
   - Indirect competitors
   - Industry thought leaders
   - Content benchmarks
   - AI visibility competitors (who AI agents mention)

3. **Integration Setup**
   - Connect Google Search Console
   - Connect Google Analytics 4
   - Optional: Reddit account, SEMrush, Ahrefs
   - Social media accounts
   - CMS connections (WordPress, Webflow)

4. **Monitoring Preferences**
   - Alert thresholds
   - Reporting frequency
   - Priority content types
   - Brand voice guidelines
   - Schema.org preferences

5. **AI Agent Targets**
   - Which AI agents to monitor (ChatGPT, Claude, Perplexity, etc.)
   - Query templates for testing
   - Citation tracking setup

**Tools Required:**
- `business_profiler_tool`
- `competitor_mapper_tool`
- `integration_connector_tool`
- `preference_manager_tool`
- `ai_agent_setup_tool`

**Skills Required:**
- `industry_classification_skill`
- `competitor_discovery_skill`
- `semantic_mapping_skill`
- `integration_validation_skill`

**Success Criteria:**
- Business profile complete with 5+ competitors
- Minimum 2 integrations connected (GSC + GA4)
- AI agent monitoring configured
- Baseline metrics captured

**Schema.org Mapping:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "description": "Business description",
  "url": "https://example.com",
  "industry": "Technology",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://twitter.com/company",
    "https://linkedin.com/company/..."
  ],
  "knowsAbout": ["Product 1", "Product 2"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    }
  }
}
```

**Output:**
```json
{
  "workspace_id": "ws-123",
  "business_profile": {
    "name": "Acme Corp",
    "industry": "SaaS",
    "competitors": [
      {"name": "Competitor A", "domain": "competitor-a.com", "ai_visibility_score": 0.78},
      {"name": "Competitor B", "domain": "competitor-b.com", "ai_visibility_score": 0.65}
    ],
    "target_keywords": ["project management", "team collaboration"],
    "monitoring_setup": {
      "ai_agents": ["chatgpt", "claude", "perplexity"],
      "alert_threshold": 0.1,
      "report_frequency": "weekly"
    }
  },
  "integrations": [
    {"name": "google_search_console", "status": "connected"},
    {"name": "google_analytics", "status": "connected"}
  ]
}
```

---

### P2: Discovery & Profiling Agent (Reddit Scraper, Competitor Research)

**Purpose**: Discover how AI agents and humans discuss your brand, competitors, and industry  
**Duration**: 15-30 minutes  
**Agent**: Discovery & Profiling Agent  
**Key Differentiator**: Multi-source AI response mining with sentiment analysis

**Process Steps:**

1. **Reddit Community Mining**
   - Identify relevant subreddits (industry, product categories)
   - Scrape discussions mentioning competitors
   - Extract pain points, questions, solutions
   - Map brand sentiment and mentions
   - Identify influencers and power users

2. **AI Agent Profiling**
   - Query ChatGPT, Claude, Perplexity with test prompts
   - Analyze: "What do you know about [Company]?"
   - Test competitor comparisons
   - Record citation sources
   - Track brand mention frequency

3. **Competitor Content Analysis**
   - Scrape competitor websites
   - Identify top-performing content
   - Extract schema markup usage
   - Map content topics and clusters
   - Analyze backlink profiles (via SEMrush/Ahrefs)

4. **Search Intent Discovery**
   - Google Search Console query mining
   - Identify underperforming queries
   - Map search intent (informational, transactional, navigational)
   - Analyze SERP features (PAA, Featured Snippets)

5. **Social Listening**
   - Twitter/X mentions
   - LinkedIn content engagement
   - YouTube comments (if applicable)
   - Industry forums and communities

**Tools Required:**
- `reddit_scraper_tool` - PRAW-based Reddit API
- `ai_agent_query_tool` - Query ChatGPT, Claude, Perplexity
- `competitor_crawler_tool` - Scrape competitor sites
- `gsc_query_analyzer_tool` - Google Search Console data
- `social_listening_tool` - Social media monitoring
- `backlink_analyzer_tool` - SEMrush/Ahrefs integration
- `sentiment_analyzer_tool` - NLP sentiment analysis

**Skills Required:**
- `reddit_intelligence_skill` - Extract insights from Reddit
- `ai_response_analysis_skill` - Analyze AI agent outputs
- `competitor_benchmarking_skill` - Compare content strategies
- `search_intent_mapping_skill` - Classify query intent
- `brand_mention_tracking_skill` - Track brand visibility

**Discovery Agent Architecture:**

```python
class DiscoveryProfilingAgent:
    """
    Multi-source discovery agent for BAIV platform
    """
    
    def __init__(self):
        self.reddit = RedditScraperTool()
        self.ai_agents = AIAgentQueryTool()
        self.competitor = CompetitorCrawlerTool()
        self.gsc = GoogleSearchConsoleTool()
        
    async def discover(
        self,
        business_profile: dict,
        discovery_depth: str = 'comprehensive'
    ) -> DiscoveryResult:
        """
        Main discovery workflow
        """
        # Step 1: Reddit community intelligence
        reddit_insights = await self._discover_reddit(
            industry=business_profile['industry'],
            competitors=business_profile['competitors'],
            keywords=business_profile['target_keywords']
        )
        
        # Step 2: AI agent profiling
        ai_visibility = await self._profile_ai_agents(
            company=business_profile['name'],
            competitors=business_profile['competitors']
        )
        
        # Step 3: Competitor analysis
        competitor_intel = await self._analyze_competitors(
            competitors=business_profile['competitors']
        )
        
        # Step 4: Search intent discovery
        search_intel = await self._discover_search_intent(
            gsc_property=business_profile['gsc_property']
        )
        
        # Step 5: Synthesize findings
        synthesis = await self._synthesize_discovery(
            reddit=reddit_insights,
            ai_visibility=ai_visibility,
            competitors=competitor_intel,
            search=search_intel
        )
        
        return DiscoveryResult(
            reddit_insights=reddit_insights,
            ai_visibility_profile=ai_visibility,
            competitor_intelligence=competitor_intel,
            search_intent_map=search_intel,
            synthesis=synthesis,
            opportunities_identified=self._count_opportunities(synthesis)
        )
    
    async def _discover_reddit(
        self,
        industry: str,
        competitors: list,
        keywords: list
    ) -> RedditInsights:
        """
        Mine Reddit for brand and competitor discussions
        """
        # Identify relevant subreddits
        subreddits = await self.reddit.find_subreddits(
            industry=industry,
            keywords=keywords
        )
        
        # Search for brand and competitor mentions
        all_mentions = []
        for subreddit in subreddits[:20]:  # Top 20 subreddits
            mentions = await self.reddit.search_mentions(
                subreddit=subreddit,
                keywords=keywords + [c['name'] for c in competitors],
                time_filter='month'
            )
            all_mentions.extend(mentions)
        
        # Analyze sentiment and extract themes
        sentiment = await self._analyze_sentiment(all_mentions)
        themes = await self._extract_themes(all_mentions)
        pain_points = await self._extract_pain_points(all_mentions)
        
        return RedditInsights(
            total_mentions=len(all_mentions),
            subreddits_monitored=subreddits,
            sentiment_breakdown=sentiment,
            key_themes=themes,
            pain_points=pain_points,
            competitor_mentions=self._count_competitor_mentions(all_mentions, competitors),
            top_influencers=self._identify_influencers(all_mentions)
        )
    
    async def _profile_ai_agents(
        self,
        company: str,
        competitors: list
    ) -> AIVisibilityProfile:
        """
        Query AI agents to understand brand visibility
        """
        test_queries = [
            f"What is {company}?",
            f"Tell me about {company}",
            f"Compare {company} to {competitors[0]['name']}",
            f"What are the best alternatives to {competitors[0]['name']}?",
            f"How does {company} work?",
            f"What are the pros and cons of {company}?"
        ]
        
        ai_responses = {
            'chatgpt': [],
            'claude': [],
            'perplexity': []
        }
        
        # Query each AI agent
        for query in test_queries:
            # ChatGPT
            gpt_response = await self.ai_agents.query_chatgpt(query)
            ai_responses['chatgpt'].append(gpt_response)
            
            # Claude (we'll use Anthropic API)
            claude_response = await self.ai_agents.query_claude(query)
            ai_responses['claude'].append(claude_response)
            
            # Perplexity
            perplexity_response = await self.ai_agents.query_perplexity(query)
            ai_responses['perplexity'].append(perplexity_response)
        
        # Analyze responses
        mention_analysis = self._analyze_brand_mentions(ai_responses, company)
        citation_sources = self._extract_citations(ai_responses)
        competitor_comparison = self._analyze_competitor_positioning(
            ai_responses, company, competitors
        )
        
        return AIVisibilityProfile(
            brand_mention_rate=mention_analysis['mention_rate'],
            average_position=mention_analysis['avg_position'],
            citation_sources=citation_sources,
            competitor_comparison=competitor_comparison,
            visibility_score=self._calculate_visibility_score(mention_analysis),
            gaps_identified=self._identify_knowledge_gaps(ai_responses, company)
        )
```

**Success Criteria:**
- Reddit: 50+ relevant discussions analyzed
- AI Agents: 6+ test queries per agent
- Competitors: 5+ competitor profiles complete
- Search Intent: 100+ GSC queries classified
- Opportunities: 10+ content gaps identified

**Output Example:**
```json
{
  "discovery_result": {
    "reddit_insights": {
      "total_mentions": 127,
      "subreddits": ["r/SaaS", "r/projectmanagement", "r/startups"],
      "sentiment": {"positive": 0.45, "neutral": 0.40, "negative": 0.15},
      "pain_points": [
        "Integration complexity",
        "Onboarding learning curve",
        "Mobile app limitations"
      ],
      "competitor_mentions": {
        "Competitor A": 87,
        "Competitor B": 45,
        "Your Brand": 12
      }
    },
    "ai_visibility_profile": {
      "brand_mention_rate": {
        "chatgpt": 0.83,
        "claude": 0.67,
        "perplexity": 0.50
      },
      "visibility_score": 0.67,
      "gaps": [
        "AI agents don't know about your new mobile app",
        "Feature comparison with Competitor A is outdated",
        "Pricing information is missing from AI responses"
      ],
      "citations": [
        {"source": "wikipedia", "count": 5},
        {"source": "your-blog.com", "count": 3},
        {"source": "g2.com", "count": 8}
      ]
    },
    "opportunities_identified": 15
  }
}
```

---

### P3: Capture Agent (PAA Detection, Content Inventory)

**Purpose**: Capture People Also Ask questions, build content inventory, map existing assets  
**Duration**: 20-30 minutes  
**Agent**: Capture Agent  
**Key Differentiator**: PAA graph builder + semantic content mapping

**Process Steps:**

1. **People Also Ask (PAA) Mining**
   - Query Google for target keywords
   - Extract PAA questions (recursive expansion)
   - Build PAA question graph
   - Map question relationships
   - Identify question clusters

2. **Content Inventory Scan**
   - Crawl company website
   - Catalog all pages, blog posts, resources
   - Extract existing schema markup
   - Identify content types (FAQ, How-to, Product, etc.)
   - Map internal linking structure

3. **Existing Coverage Analysis**
   - Match PAA questions to existing content
   - Identify coverage gaps
   - Score content quality per question
   - Map keyword rankings

4. **Schema Markup Audit**
   - Detect existing schema types
   - Validate schema correctness
   - Identify missing schema opportunities
   - Rate schema.org coverage

5. **Semantic Content Mapping**
   - Extract entities from content
   - Build topic clusters
   - Map content relationships
   - Identify content silos

**Tools Required:**
- `paa_scraper_tool` - Google PAA extraction
- `website_crawler_tool` - Content inventory
- `schema_detector_tool` - Schema markup detection
- `keyword_mapper_tool` - Keyword to content mapping
- `entity_extractor_tool` - NER for content
- `serp_analyzer_tool` - SERP features detection

**Skills Required:**
- `paa_graph_builder_skill` - Build question relationship graphs
- `content_mapping_skill` - Map content to intents
- `schema_audit_skill` - Validate schema markup
- `topic_clustering_skill` - Group related content
- `gap_detection_skill` - Find content gaps

**PAA Graph Example:**

```
"What is project management software?" (Root)
├─ "What is the best project management software?"
│  ├─ "Is Asana better than Monday?"
│  ├─ "What is the easiest PM tool?"
│  └─ "How much does project management software cost?"
├─ "How does project management software work?"
│  ├─ "What features should PM software have?"
│  └─ "Can PM software integrate with Slack?"
└─ "Why do teams need project management software?"
   ├─ "What problems does PM software solve?"
   └─ "How do you choose PM software?"
```

**Capture Agent Architecture:**

```python
class CaptureAgent:
    """
    PAA mining and content inventory agent
    """
    
    def __init__(self):
        self.paa_scraper = PAAScraperTool()
        self.crawler = WebsiteCrawlerTool()
        self.schema_detector = SchemaDetectorTool()
        
    async def capture(
        self,
        business_profile: dict,
        target_keywords: list
    ) -> CaptureResult:
        """
        Main capture workflow
        """
        # Step 1: Mine PAA questions
        paa_graph = await self._mine_paa_questions(target_keywords)
        
        # Step 2: Build content inventory
        content_inventory = await self._build_content_inventory(
            domain=business_profile['domain']
        )
        
        # Step 3: Map existing coverage
        coverage_map = await self._map_coverage(paa_graph, content_inventory)
        
        # Step 4: Schema audit
        schema_audit = await self._audit_schema(content_inventory)
        
        return CaptureResult(
            paa_graph=paa_graph,
            content_inventory=content_inventory,
            coverage_map=coverage_map,
            schema_audit=schema_audit,
            gaps_identified=self._count_gaps(coverage_map)
        )
    
    async def _mine_paa_questions(
        self,
        keywords: list,
        depth: int = 2
    ) -> PAAGraph:
        """
        Recursively mine PAA questions and build graph
        """
        graph = PAAGraph()
        
        for keyword in keywords:
            # Get initial PAA questions
            root_paas = await self.paa_scraper.get_paa(keyword)
            
            graph.add_root(keyword, root_paas)
            
            # Recursive expansion (depth levels)
            if depth > 0:
                for paa in root_paas:
                    child_paas = await self.paa_scraper.get_paa(paa['question'])
                    graph.add_children(paa['question'], child_paas)
                    
                    if depth > 1:
                        for child_paa in child_paas[:3]:  # Top 3 only
                            grandchild_paas = await self.paa_scraper.get_paa(
                                child_paa['question']
                            )
                            graph.add_children(child_paa['question'], grandchild_paas)
        
        # Cluster questions by semantic similarity
        clusters = await self._cluster_questions(graph.all_questions())
        graph.set_clusters(clusters)
        
        return graph
    
    async def _build_content_inventory(self, domain: str) -> ContentInventory:
        """
        Crawl website and catalog all content
        """
        # Crawl website
        pages = await self.crawler.crawl(
            domain=domain,
            max_pages=1000,
            include_subdomains=False
        )
        
        inventory = ContentInventory()
        
        for page in pages:
            # Extract content metadata
            metadata = await self._extract_metadata(page)
            
            # Detect schema markup
            schema = await self.schema_detector.detect(page.html)
            
            # Extract entities
            entities = await self._extract_entities(page.text)
            
            # Classify content type
            content_type = await self._classify_content_type(page)
            
            inventory.add_page(ContentPage(
                url=page.url,
                title=page.title,
                content_type=content_type,
                word_count=len(page.text.split()),
                metadata=metadata,
                schema_types=schema,
                entities=entities,
                internal_links=page.internal_links,
                external_links=page.external_links
            ))
        
        return inventory
```

**Success Criteria:**
- PAA: 200+ questions captured and graphed
- Content: 100% of existing pages inventoried
- Schema: All markup detected and validated
- Coverage: PAA-to-content matching complete
- Gaps: 20+ content opportunities identified

**Output Example:**
```json
{
  "capture_result": {
    "paa_graph": {
      "total_questions": 347,
      "root_keywords": 12,
      "max_depth": 2,
      "clusters": [
        {
          "theme": "Software Comparison",
          "questions": 87,
          "avg_search_volume": 2400
        },
        {
          "theme": "Features & Benefits",
          "questions": 156,
          "avg_search_volume": 1800
        }
      ]
    },
    "content_inventory": {
      "total_pages": 347,
      "blog_posts": 156,
      "product_pages": 23,
      "landing_pages": 45,
      "faq_pages": 8,
      "schema_coverage": 0.34
    },
    "coverage_map": {
      "questions_covered": 89,
      "questions_uncovered": 258,
      "coverage_rate": 0.256,
      "top_gaps": [
        "How does X integrate with Y? (0 pages)",
        "What's the difference between X and Y? (0 pages)",
        "How much does X cost? (mentioned in 1 page, no dedicated page)"
      ]
    },
    "gaps_identified": 258
  }
}
```

---

### P4: Audit Agent (Brand Scoring Algorithms)

**Purpose**: Score brand visibility, content quality, and AI discoverability  
**Duration**: 15-25 minutes  
**Agent**: Audit Agent  
**Key Differentiator**: Multi-dimensional brand scoring for AI agents

**Process Steps:**

1. **AI Visibility Scoring**
   - Brand mention frequency in AI responses
   - Citation quality and authority
   - Positioning in competitive comparisons
   - Knowledge accuracy in AI responses
   - Update recency (how current is AI knowledge)

2. **Content Quality Scoring**
   - E-E-A-T signals (Experience, Expertise, Authority, Trust)
   - Schema markup completeness
   - Content depth and comprehensiveness
   - Readability and structure
   - Internal linking strength

3. **Technical SEO Audit**
   - Page speed and Core Web Vitals
   - Mobile responsiveness
   - Structured data errors
   - Crawlability issues
   - Indexation status

4. **Brand Consistency Analysis**
   - Message consistency across platforms
   - Visual identity adherence
   - Voice and tone analysis
   - Competitor differentiation

5. **Competitive Benchmarking**
   - Score vs. top 3 competitors
   - Share of voice
   - Content gap analysis
   - Feature comparison

**Scoring Dimensions:**

```yaml
AI_Visibility_Score: (0-100)
  components:
    - mention_frequency: 25%
    - citation_quality: 25%
    - competitive_positioning: 20%
    - knowledge_accuracy: 20%
    - update_recency: 10%

Content_Quality_Score: (0-100)
  components:
    - eeat_signals: 30%
    - schema_coverage: 20%
    - content_depth: 20%
    - readability: 15%
    - linking_strength: 15%

Technical_SEO_Score: (0-100)
  components:
    - core_web_vitals: 30%
    - mobile_responsive: 20%
    - structured_data: 20%
    - crawlability: 15%
    - indexation: 15%

Brand_Consistency_Score: (0-100)
  components:
    - message_consistency: 30%
    - voice_tone: 25%
    - visual_identity: 25%
    - competitor_differentiation: 20%

Overall_BAIV_Score: (0-100)
  weights:
    - AI_Visibility: 40%
    - Content_Quality: 30%
    - Technical_SEO: 20%
    - Brand_Consistency: 10%
```

**Tools Required:**
- `ai_visibility_scorer_tool`
- `content_quality_scorer_tool`
- `technical_seo_auditor_tool`
- `brand_consistency_checker_tool`
- `competitive_benchmark_tool`
- `eeat_analyzer_tool`
- `schema_validator_tool`

**Skills Required:**
- `multi_dimensional_scoring_skill`
- `benchmark_comparison_skill`
- `eeat_assessment_skill`
- `technical_audit_skill`
- `brand_analysis_skill`

**Audit Agent Architecture:**

```python
class AuditAgent:
    """
    Multi-dimensional brand and content audit agent
    """
    
    def __init__(self):
        self.ai_scorer = AIVisibilityScorerTool()
        self.content_scorer = ContentQualityScorerTool()
        self.tech_auditor = TechnicalSEOAuditorTool()
        self.brand_checker = BrandConsistencyCheckerTool()
        
    async def audit(
        self,
        business_profile: dict,
        discovery_result: dict,
        capture_result: dict
    ) -> AuditResult:
        """
        Main audit workflow with comprehensive scoring
        """
        # Step 1: AI Visibility Scoring
        ai_score = await self._score_ai_visibility(
            ai_visibility_profile=discovery_result['ai_visibility_profile'],
            competitors=business_profile['competitors']
        )
        
        # Step 2: Content Quality Scoring
        content_score = await self._score_content_quality(
            content_inventory=capture_result['content_inventory'],
            paa_coverage=capture_result['coverage_map']
        )
        
        # Step 3: Technical SEO Audit
        tech_score = await self._audit_technical_seo(
            domain=business_profile['domain'],
            content_inventory=capture_result['content_inventory']
        )
        
        # Step 4: Brand Consistency
        brand_score = await self._score_brand_consistency(
            business_profile=business_profile,
            content_inventory=capture_result['content_inventory']
        )
        
        # Step 5: Calculate overall BAIV score
        overall_score = self._calculate_baiv_score(
            ai_score, content_score, tech_score, brand_score
        )
        
        # Step 6: Competitive benchmarking
        benchmark = await self._benchmark_competitors(
            business_profile=business_profile,
            scores={
                'ai_visibility': ai_score,
                'content_quality': content_score,
                'technical_seo': tech_score
            }
        )
        
        return AuditResult(
            ai_visibility_score=ai_score,
            content_quality_score=content_score,
            technical_seo_score=tech_score,
            brand_consistency_score=brand_score,
            overall_baiv_score=overall_score,
            competitive_benchmark=benchmark,
            recommendations=self._generate_recommendations(overall_score)
        )
    
    async def _score_ai_visibility(
        self,
        ai_visibility_profile: dict,
        competitors: list
    ) -> AIVisibilityScore:
        """
        Score brand visibility in AI agent responses
        """
        # Mention frequency (25%)
        mention_rate = ai_visibility_profile['brand_mention_rate']
        avg_mention = sum(mention_rate.values()) / len(mention_rate)
        mention_score = min(avg_mention * 100, 100)
        
        # Citation quality (25%)
        citations = ai_visibility_profile['citations']
        high_authority = ['wikipedia', 'forbes', 'techcrunch', 'nytimes']
        quality_score = sum(
            100 if c['source'] in high_authority else 50
            for c in citations
        ) / len(citations) if citations else 0
        
        # Competitive positioning (20%)
        competitor_avg = await self._get_competitor_avg_visibility(competitors)
        positioning_score = (avg_mention / competitor_avg) * 100 if competitor_avg > 0 else 0
        
        # Knowledge accuracy (20%)
        gaps = ai_visibility_profile['gaps_identified']
        accuracy_score = max(0, 100 - (len(gaps) * 10))  # -10 points per gap
        
        # Update recency (10%)
        recency_score = 100  # Would need to check last update dates
        
        # Weighted total
        total_score = (
            mention_score * 0.25 +
            quality_score * 0.25 +
            min(positioning_score, 100) * 0.20 +
            accuracy_score * 0.20 +
            recency_score * 0.10
        )
        
        return AIVisibilityScore(
            total_score=round(total_score, 2),
            mention_frequency_score=mention_score,
            citation_quality_score=quality_score,
            competitive_positioning_score=positioning_score,
            knowledge_accuracy_score=accuracy_score,
            update_recency_score=recency_score,
            breakdown={
                'chatgpt_visibility': mention_rate.get('chatgpt', 0) * 100,
                'claude_visibility': mention_rate.get('claude', 0) * 100,
                'perplexity_visibility': mention_rate.get('perplexity', 0) * 100
            }
        )
```

**Success Criteria:**
- All 4 scoring dimensions completed
- Competitive benchmark with 3+ competitors
- 10+ actionable recommendations
- Scores validated with real data

**Output Example:**
```json
{
  "audit_result": {
    "overall_baiv_score": 58,
    "score_breakdown": {
      "ai_visibility_score": 45,
      "content_quality_score": 67,
      "technical_seo_score": 72,
      "brand_consistency_score": 63
    },
    "competitive_benchmark": {
      "your_company": 58,
      "competitor_a": 78,
      "competitor_b": 71,
      "competitor_c": 54,
      "industry_average": 65
    },
    "key_findings": [
      "AI visibility 22% below industry average",
      "Only 34% of pages have schema markup",
      "Content covers only 26% of PAA questions",
      "Brand mentioned in 67% of AI responses (vs 85% for top competitor)"
    ],
    "recommendations": [
      {
        "priority": "high",
        "category": "AI Visibility",
        "action": "Create FAQ content for top 50 uncovered PAA questions",
        "estimated_impact": "+15 points"
      },
      {
        "priority": "high",
        "category": "Schema Markup",
        "action": "Implement FAQ and HowTo schema on all blog posts",
        "estimated_impact": "+12 points"
      }
    ]
  }
}
```

---

### P5: Analytics Agent (Performance Measurement)

**Purpose**: Measure current performance, establish baselines, track trends  
**Duration**: 10-20 minutes  
**Agent**: Analytics Agent  
**Key Differentiator**: AI-centric analytics beyond traditional SEO metrics

**Process Steps:**

1. **Traffic & Engagement Analytics**
   - Google Analytics 4 data pull
   - Traffic sources breakdown
   - User engagement metrics
   - Conversion tracking
   - Page-level performance

2. **Search Performance Analysis**
   - Google Search Console data
   - Keyword rankings
   - Click-through rates
   - Impressions and clicks
   - SERP feature wins

3. **AI Discovery Metrics**
   - Brand mention velocity in AI responses
   - Citation source diversity
   - Query types triggering brand mentions
   - AI agent preference patterns
   - Knowledge graph updates

4. **Content Performance**
   - Top performing content
   - Content engagement time
   - Scroll depth
   - Social shares
   - Backlink acquisition rate

5. **Competitive Performance**
   - Share of voice vs. competitors
   - Keyword overlap analysis
   - Traffic comparison estimates
   - Backlink gap analysis

**Metrics Tracked:**

```yaml
Traffic_Metrics:
  - total_sessions
  - unique_visitors
  - bounce_rate
  - avg_session_duration
  - pages_per_session
  - conversion_rate

Search_Metrics:
  - total_impressions
  - total_clicks
  - avg_ctr
  - avg_position
  - keyword_rankings_top_10
  - serp_features_won

AI_Discovery_Metrics:
  - brand_mention_velocity: mentions per week
  - citation_diversity: unique sources
  - ai_agent_coverage: % of agents mentioning brand
  - query_type_distribution: informational vs transactional
  - knowledge_graph_presence: boolean

Content_Metrics:
  - content_engagement_score
  - avg_time_on_page
  - scroll_depth_avg
  - social_shares_total
  - backlinks_acquired: last 30 days

Competitive_Metrics:
  - share_of_voice: %
  - keyword_overlap: with top 3 competitors
  - estimated_traffic_gap: vs top competitor
  - backlink_gap: count difference
```

**Tools Required:**
- `ga4_connector_tool`
- `gsc_connector_tool`
- `ai_mention_tracker_tool`
- `content_performance_tool`
- `competitive_analysis_tool`
- `serp_tracking_tool`

**Skills Required:**
- `analytics_aggregation_skill`
- `trend_detection_skill`
- `baseline_establishment_skill`
- `comparative_analysis_skill`
- `forecasting_skill`

**Success Criteria:**
- All data sources connected and pulling
- Baseline metrics established
- 30-day trend analysis complete
- Competitive comparison ready
- Dashboard ready for monitoring

**Output Example:**
```json
{
  "analytics_result": {
    "baseline_metrics": {
      "traffic": {
        "monthly_sessions": 45000,
        "unique_visitors": 32000,
        "bounce_rate": 0.58,
        "avg_session_duration": "2:34",
        "pages_per_session": 2.3
      },
      "search": {
        "monthly_impressions": 380000,
        "monthly_clicks": 12400,
        "avg_ctr": 0.033,
        "avg_position": 12.7,
        "keywords_top_10": 45
      },
      "ai_discovery": {
        "brand_mention_velocity": 8.2,
        "citation_diversity": 15,
        "ai_agent_coverage": 0.67,
        "knowledge_graph_present": false
      }
    },
    "trends_30_day": {
      "traffic": "+8.5%",
      "impressions": "+12.3%",
      "ai_mentions": "+24.1%",
      "backlinks": "+15 new"
    },
    "competitive_snapshot": {
      "your_share_of_voice": 0.18,
      "competitor_a_share": 0.42,
      "keyword_overlap_competitor_a": 0.67,
      "estimated_traffic_gap": "~85,000 sessions/month"
    }
  }
}
```

---

### P6: Gap Analysis Agent (Opportunity Identification)

**Purpose**: Identify content gaps, keyword opportunities, AI visibility gaps  
**Duration**: 15-25 minutes  
**Agent**: Gap Analysis Agent  
**Key Differentiator**: AI-specific gap detection + traditional SEO gaps

**Process Steps:**

1. **Content Gap Analysis**
   - PAA questions without content (from P3)
   - Competitor topics not covered
   - High-volume keywords missing content
   - Underserved search intents
   - Format gaps (no video, no infographic, etc.)

2. **AI Knowledge Gap Analysis**
   - Questions AI agents can't answer about your brand
   - Outdated information in AI responses
   - Competitor information gaps
   - Missing citation opportunities
   - Semantic coverage holes

3. **Keyword Opportunity Analysis**
   - Low competition, high volume keywords
   - Question-based keywords
   - Long-tail opportunities
   - Featured snippet opportunities
   - "Near miss" keywords (ranking 11-20)

4. **Schema Markup Opportunities**
   - Pages missing schema markup
   - Schema types not implemented
   - Incomplete schema properties
   - Competitor schema advantages

5. **Competitive Content Gaps**
   - Competitor content you lack
   - Better-performing competitor pages
   - Backlink opportunities
   - Topic authority gaps

**Gap Prioritization Matrix:**

```
Impact (Business Value)
    High    |  P1 (Do First)    |  P0 (Quick Wins)
            |                   |
    Medium  |  P2 (Plan For)    |  P1 (Do First)
            |                   |
    Low     |  P3 (Backlog)     |  P2 (Plan For)
            |___________________|____________________
                Low              High
                      Effort (Resources Required)
```

**Tools Required:**
- `content_gap_analyzer_tool`
- `keyword_opportunity_finder_tool`
- `ai_knowledge_gap_detector_tool`
- `schema_opportunity_scanner_tool`
- `competitive_gap_analyzer_tool`

**Skills Required:**
- `opportunity_scoring_skill`
- `gap_prioritization_skill`
- `impact_estimation_skill`
- `effort_estimation_skill`
- `opportunity_clustering_skill`

**Gap Analysis Agent Architecture:**

```python
class GapAnalysisAgent:
    """
    Multi-dimensional opportunity identification agent
    """
    
    def __init__(self):
        self.content_gap = ContentGapAnalyzerTool()
        self.keyword_finder = KeywordOpportunityFinderTool()
        self.ai_gap = AIKnowledgeGapDetectorTool()
        self.schema_scanner = SchemaOpportunityScannerTool()
        
    async def analyze_gaps(
        self,
        discovery_result: dict,
        capture_result: dict,
        audit_result: dict,
        analytics_result: dict
    ) -> GapAnalysisResult:
        """
        Comprehensive gap analysis across all dimensions
        """
        # Step 1: Content gaps
        content_gaps = await self._analyze_content_gaps(
            paa_graph=capture_result['paa_graph'],
            content_inventory=capture_result['content_inventory'],
            coverage_map=capture_result['coverage_map']
        )
        
        # Step 2: AI knowledge gaps
        ai_gaps = await self._analyze_ai_gaps(
            ai_visibility_profile=discovery_result['ai_visibility_profile'],
            audit_scores=audit_result
        )
        
        # Step 3: Keyword opportunities
        keyword_opps = await self._find_keyword_opportunities(
            gsc_data=analytics_result['search'],
            competitor_keywords=discovery_result['competitor_intelligence']
        )
        
        # Step 4: Schema opportunities
        schema_opps = await self._identify_schema_opportunities(
            schema_audit=capture_result['schema_audit'],
            content_inventory=capture_result['content_inventory']
        )
        
        # Step 5: Prioritize all opportunities
        all_opportunities = (
            content_gaps + ai_gaps + keyword_opps + schema_opps
        )
        prioritized = await self._prioritize_opportunities(all_opportunities)
        
        return GapAnalysisResult(
            content_gaps=content_gaps,
            ai_knowledge_gaps=ai_gaps,
            keyword_opportunities=keyword_opps,
            schema_opportunities=schema_opps,
            prioritized_opportunities=prioritized,
            total_opportunities=len(all_opportunities),
            high_priority_count=len([o for o in prioritized if o.priority == 'P0'])
        )
    
    async def _prioritize_opportunities(
        self,
        opportunities: list
    ) -> list:
        """
        Score and prioritize all opportunities using impact/effort matrix
        """
        scored_opportunities = []
        
        for opp in opportunities:
            # Calculate impact score (0-100)
            impact = await self._calculate_impact(opp)
            
            # Calculate effort score (0-100)
            effort = await self._calculate_effort(opp)
            
            # Determine priority
            if impact >= 70 and effort <= 30:
                priority = 'P0'  # Quick wins
            elif impact >= 70:
                priority = 'P1'  # Do first
            elif effort <= 30:
                priority = 'P1'  # Do first (easy)
            elif impact >= 40:
                priority = 'P2'  # Plan for
            else:
                priority = 'P3'  # Backlog
            
            scored_opportunities.append(ScoredOpportunity(
                **opp.dict(),
                impact_score=impact,
                effort_score=effort,
                priority=priority,
                roi_estimate=impact / effort if effort > 0 else 0
            ))
        
        # Sort by priority, then by ROI
        return sorted(
            scored_opportunities,
            key=lambda x: (
                ['P0', 'P1', 'P2', 'P3'].index(x.priority),
                -x.roi_estimate
            )
        )
```

**Success Criteria:**
- 50+ opportunities identified
- All opportunities scored (impact + effort)
- 10+ P0 (quick win) opportunities
- Clear prioritization for P7 ideation
- ROI estimates for top opportunities

**Output Example:**
```json
{
  "gap_analysis_result": {
    "summary": {
      "total_opportunities": 73,
      "p0_quick_wins": 12,
      "p1_high_priority": 28,
      "p2_medium_priority": 23,
      "p3_backlog": 10
    },
    "top_opportunities": [
      {
        "id": "opp-001",
        "type": "content_gap",
        "title": "Create FAQ page answering top 20 PAA questions",
        "description": "258 PAA questions uncovered, top 20 have 45K monthly searches",
        "impact_score": 85,
        "effort_score": 25,
        "priority": "P0",
        "roi_estimate": 3.4,
        "estimated_traffic_gain": "+12,000 monthly visitors",
        "estimated_time": "3-5 hours"
      },
      {
        "id": "opp-002",
        "type": "schema_opportunity",
        "title": "Add FAQ schema to all blog posts",
        "description": "156 blog posts missing FAQ schema, easy implementation",
        "impact_score": 70,
        "effort_score": 15,
        "priority": "P0",
        "roi_estimate": 4.7,
        "estimated_traffic_gain": "+8,000 monthly visitors",
        "estimated_time": "2-3 hours with automation"
      },
      {
        "id": "opp-003",
        "type": "ai_knowledge_gap",
        "title": "Update Wikipedia with new product features",
        "description": "AI agents citing outdated Wikipedia info",
        "impact_score": 90,
        "effort_score": 40,
        "priority": "P1",
        "roi_estimate": 2.25,
        "estimated_impact": "Improve AI mention accuracy by 25%",
        "estimated_time": "8-12 hours"
      }
    ],
    "gap_categories": {
      "content_gaps": 28,
      "ai_knowledge_gaps": 15,
      "keyword_opportunities": 22,
      "schema_opportunities": 8
    }
  }
}
```

---

### P7: Ideation Agent (Content Ideas Generator)

**Purpose**: Generate prioritized content ideas based on gaps and opportunities  
**Duration**: 15-25 minutes  
**Agent**: Ideation Agent  
**Key Differentiator**: AI-optimized content ideas with schema recommendations

**Process Steps:**

1. **Content Idea Generation**
   - Generate content ideas from top P6 opportunities
   - Create titles, outlines, and formats
   - Suggest content types (FAQ, How-to, Comparison, etc.)
   - Recommend schema markup types
   - Estimate content depth and length

2. **Content Clustering**
   - Group related content ideas into clusters
   - Identify pillar page opportunities
   - Map internal linking strategy
   - Suggest content hub structure

3. **Keyword Mapping**
   - Map target keywords to each content idea
   - Include PAA questions to answer
   - Suggest related keywords
   - Estimate search volume and difficulty

4. **Schema Recommendations**
   - Recommend schema.org types for each piece
   - Provide example schema markup
   - Highlight schema properties to include
   - Map to Google Search features

5. **Content Calendar**
   - Prioritize content by P0/P1/P2
   - Suggest publishing schedule
   - Estimate production timeline
   - Assign effort estimates

**Content Idea Template:**

```yaml
Content_Idea:
  id: "idea-001"
  title: "Complete Guide: [Topic]"
  type: "pillar_page"
  format: "long_form_guide"
  target_keywords:
    - primary: "keyword phrase"
    - secondary: ["related keyword 1", "related keyword 2"]
  paa_questions_to_answer: [10-15 questions]
  estimated_word_count: 3500
  schema_types:
    - "Article"
    - "HowTo"
    - "FAQPage"
  content_outline:
    - section_1: "Introduction"
    - section_2: "What is X?"
    - section_3: "How does X work?"
    # ...
  internal_linking:
    - link_to: ["existing-page-1", "existing-page-2"]
  estimated_effort: "12-16 hours"
  priority: "P0"
  estimated_traffic_gain: "+5,000 monthly"
```

**Tools Required:**
- `content_idea_generator_tool`
- `outline_creator_tool`
- `keyword_mapper_tool`
- `schema_recommender_tool`
- `content_cluster_tool`
- `calendar_builder_tool`

**Skills Required:**
- `creative_ideation_skill`
- `content_planning_skill`
- `keyword_research_skill`
- `schema_mapping_skill`
- `editorial_calendar_skill`

**Ideation Agent Architecture:**

```python
class IdeationAgent:
    """
    AI-powered content ideation agent
    """
    
    def __init__(self):
        self.anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
        self.idea_generator = ContentIdeaGeneratorTool()
        self.schema_recommender = SchemaRecommenderTool()
        
    async def ideate(
        self,
        gap_analysis: dict,
        business_profile: dict,
        capture_result: dict
    ) -> IdeationResult:
        """
        Generate comprehensive content plan
        """
        # Step 1: Generate content ideas from top opportunities
        content_ideas = await self._generate_ideas(
            opportunities=gap_analysis['prioritized_opportunities'][:30],
            business_profile=business_profile
        )
        
        # Step 2: Create detailed outlines
        detailed_ideas = await self._create_outlines(content_ideas)
        
        # Step 3: Map keywords and PAA questions
        ideas_with_keywords = await self._map_keywords(
            detailed_ideas,
            paa_graph=capture_result['paa_graph']
        )
        
        # Step 4: Recommend schema markup
        ideas_with_schema = await self._recommend_schema(ideas_with_keywords)
        
        # Step 5: Cluster and organize
        content_clusters = await self._cluster_content(ideas_with_schema)
        
        # Step 6: Build content calendar
        calendar = await self._build_calendar(ideas_with_schema)
        
        return IdeationResult(
            content_ideas=ideas_with_schema,
            content_clusters=content_clusters,
            content_calendar=calendar,
            total_ideas=len(ideas_with_schema),
            estimated_total_effort=sum(i.estimated_hours for i in ideas_with_schema)
        )
    
    async def _generate_ideas(
        self,
        opportunities: list,
        business_profile: dict
    ) -> list:
        """
        Use Claude to generate creative content ideas
        """
        ideas = []
        
        for opp in opportunities:
            prompt = f"""
            Generate a detailed content idea based on this opportunity:
            
            Opportunity: {opp['title']}
            Description: {opp['description']}
            Type: {opp['type']}
            
            Business context:
            - Industry: {business_profile['industry']}
            - Products: {business_profile['products']}
            - Target audience: {business_profile['target_audience']}
            
            Generate:
            1. Compelling title (SEO-optimized)
            2. Content type (FAQ, How-to, Guide, Comparison, etc.)
            3. Brief description (2-3 sentences)
            4. Key points to cover (5-7 bullet points)
            5. Suggested word count
            6. Estimated production time
            
            Format as JSON.
            """
            
            response = await self.anthropic.messages.create(
                model="claude-sonnet-4.5",
                max_tokens=2000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            idea_json = self._extract_json(response.content[0].text)
            ideas.append(ContentIdea(**idea_json, opportunity_id=opp['id']))
        
        return ideas
    
    async def _create_outlines(self, ideas: list) -> list:
        """
        Generate detailed outlines for each content idea
        """
        detailed = []
        
        for idea in ideas:
            # Use Claude to create comprehensive outline
            outline = await self._generate_outline(idea)
            idea.outline = outline
            detailed.append(idea)
        
        return detailed
```

**Success Criteria:**
- 30+ content ideas generated
- All ideas have detailed outlines
- Keywords and PAA questions mapped
- Schema recommendations for each
- Content calendar with priorities
- Estimated effort for each piece

**Output Example:**
```json
{
  "ideation_result": {
    "summary": {
      "total_ideas": 32,
      "p0_quick_wins": 8,
      "p1_high_priority": 15,
      "p2_medium_priority": 9,
      "estimated_total_effort_hours": 380
    },
    "content_ideas": [
      {
        "id": "idea-001",
        "title": "The Complete Guide to Project Management Software in 2025",
        "type": "pillar_page",
        "format": "comprehensive_guide",
        "description": "In-depth guide covering everything about PM software",
        "target_keywords": {
          "primary": "project management software",
          "secondary": [
            "best project management tools",
            "how to choose PM software",
            "PM software comparison"
          ],
          "search_volume": 24500
        },
        "paa_questions": [
          "What is project management software?",
          "How does PM software work?",
          "What features should PM software have?",
          # ... 12 more questions
        ],
        "outline": {
          "sections": [
            {
              "heading": "What is Project Management Software?",
              "subsections": [
                "Definition and core purpose",
                "Evolution of PM tools",
                "Key benefits for teams"
              ],
              "estimated_words": 500
            },
            # ... more sections
          ]
        },
        "schema_recommendations": [
          {
            "type": "Article",
            "properties": ["headline", "author", "datePublished", "image"]
          },
          {
            "type": "FAQPage",
            "faq_count": 15,
            "note": "Answer all 15 PAA questions as FAQ items"
          },
          {
            "type": "HowTo",
            "steps": 5,
            "note": "Add 'How to Choose PM Software' section as HowTo"
          }
        ],
        "estimated_word_count": 3500,
        "estimated_hours": 16,
        "priority": "P0",
        "estimated_impact": {
          "monthly_traffic": "+8,500 visitors",
          "ranking_potential": "top 3 for primary keyword",
          "ai_visibility_boost": "+15% mention rate"
        },
        "internal_linking": {
          "link_from": ["homepage", "blog-index"],
          "link_to": ["features-page", "pricing-page", "comparison-pages"]
        }
      }
    ],
    "content_clusters": [
      {
        "cluster_name": "PM Software Fundamentals",
        "pillar_page": "idea-001",
        "supporting_content": ["idea-002", "idea-003", "idea-004"],
        "total_ideas": 4,
        "estimated_effort": 42
      }
    ],
    "content_calendar": {
      "week_1": {
        "p0_ideas": ["idea-001", "idea-002"],
        "estimated_hours": 28
      },
      "week_2": {
        "p0_ideas": ["idea-003"],
        "p1_ideas": ["idea-007", "idea-008"],
        "estimated_hours": 34
      }
      # ... more weeks
    }
  }
}
```

---

## 🎯 Part 2: Agent SDK Architecture (BAIV Edition)

### Orchestrator Agent Design

```python
# lib/agents/baiv_orchestrator.py
from typing import Dict, Any
from anthropic import Anthropic
from langgraph.graph import StateGraph, END, START
from dataclasses import dataclass

@dataclass
class BAIVState:
    """State machine for P1-P7 BAIV workflow"""
    current_process: str  # P1-P7
    workspace_id: str
    business_profile: Dict[str, Any]
    context: Dict[str, Any]
    results: Dict[str, Any]
    errors: list
    status: str

class BAIVOrchestratorAgent:
    """
    BAIV Orchestrator coordinating P1-P7 workflow
    """
    
    def __init__(self):
        self.anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
        
        # Initialize BAIV-specific agents
        self.config_agent = ConfigurationAgent(self.anthropic)
        self.discovery_agent = DiscoveryProfilingAgent(self.anthropic)
        self.capture_agent = CaptureAgent(self.anthropic)
        self.audit_agent = AuditAgent(self.anthropic)
        self.analytics_agent = AnalyticsAgent(self.anthropic)
        self.gap_agent = GapAnalysisAgent(self.anthropic)
        self.ideation_agent = IdeationAgent(self.anthropic)
        
        # Build workflow
        self.workflow = self._build_baiv_workflow()
    
    def _build_baiv_workflow(self) -> StateGraph:
        """
        Build LangGraph state machine for P1-P7 BAIV
        """
        workflow = StateGraph(BAIVState)
        
        # Define nodes
        workflow.add_node("p1_config", self._run_configuration)
        workflow.add_node("p2_discovery", self._run_discovery)
        workflow.add_node("p3_capture", self._run_capture)
        workflow.add_node("p4_audit", self._run_audit)
        workflow.add_node("p5_analytics", self._run_analytics)
        workflow.add_node("p6_gap_analysis", self._run_gap_analysis)
        workflow.add_node("p7_ideation", self._run_ideation)
        
        # Define edges
        workflow.add_edge(START, "p1_config")
        workflow.add_edge("p1_config", "p2_discovery")
        workflow.add_edge("p2_discovery", "p3_capture")
        workflow.add_edge("p3_capture", "p4_audit")
        workflow.add_edge("p4_audit", "p5_analytics")
        workflow.add_edge("p5_analytics", "p6_gap_analysis")
        workflow.add_edge("p6_gap_analysis", "p7_ideation")
        workflow.add_edge("p7_ideation", END)
        
        return workflow.compile()
    
    async def run_baiv_discovery_plan(
        self,
        workspace_id: str,
        business_data: Dict[str, Any]
    ) -> BAIVState:
        """
        Execute complete P1-P7 BAIV workflow
        """
        initial_state = BAIVState(
            current_process="p1_config",
            workspace_id=workspace_id,
            business_profile=business_data,
            context={},
            results={},
            errors=[],
            status='pending'
        )
        
        final_state = await self.workflow.ainvoke(initial_state)
        
        return final_state
    
    async def _run_discovery(self, state: BAIVState) -> Partial[BAIVState]:
        """P2: Discovery & Profiling handler"""
        try:
            result = await self.discovery_agent.discover(
                business_profile=state.business_profile,
                discovery_depth='comprehensive'
            )
            
            return {
                "results": {
                    **state.results,
                    "discovery": result
                },
                "current_process": "p2_discovery",
                "status": "completed"
            }
        except Exception as e:
            return {
                "errors": state.errors + [f"Discovery failed: {str(e)}"],
                "status": "failed"
            }
```

---

## 🔧 Part 3: BAIV-Specific Tools & Skills

### Core BAIV Tools (30+)

**Category: Reddit & Social**
1. `reddit_scraper_tool` - PRAW-based Reddit API scraper
2. `reddit_sentiment_tool` - Sentiment analysis for Reddit content
3. `subreddit_finder_tool` - Discover relevant subreddits
4. `social_listening_tool` - Twitter/LinkedIn monitoring
5. `influencer_identifier_tool` - Find industry influencers

**Category: AI Agent Interaction**
6. `chatgpt_query_tool` - Query ChatGPT API
7. `claude_query_tool` - Query Claude API
8. `perplexity_query_tool` - Query Perplexity API
9. `ai_response_analyzer_tool` - Analyze AI outputs
10. `citation_extractor_tool` - Extract AI response citations

**Category: SEO & Search**
11. `paa_scraper_tool` - Extract People Also Ask questions
12. `serp_analyzer_tool` - Analyze SERP features
13. `gsc_connector_tool` - Google Search Console API
14. `ga4_connector_tool` - Google Analytics 4 API
15. `keyword_research_tool` - SEMrush/Ahrefs integration
16. `backlink_analyzer_tool` - Backlink profile analysis

**Category: Content Analysis**
17. `website_crawler_tool` - Sitemap and content crawler
18. `schema_detector_tool` - Detect existing schema markup
19. `schema_validator_tool` - Validate schema.org markup
20. `content_quality_scorer_tool` - E-E-A-T assessment
21. `readability_analyzer_tool` - Flesch-Kincaid scoring
22. `entity_extractor_tool` - Named entity recognition

**Category: Competitive Intelligence**
23. `competitor_crawler_tool` - Scrape competitor sites
24. `competitive_keyword_tool` - Keyword gap analysis
25. `backlink_gap_tool` - Backlink opportunity finder
26. `share_of_voice_tool` - Calculate SOV metrics

**Category: Content Generation**
27. `outline_generator_tool` - Create content outlines
28. `keyword_mapper_tool` - Map keywords to content
29. `schema_recommender_tool` - Suggest schema types
30. `calendar_builder_tool` - Build editorial calendars

### BAIV Skills (15+)

1. `reddit_intelligence_skill` - Multi-subreddit analysis
2. `ai_visibility_assessment_skill` - AI agent profiling
3. `paa_graph_builder_skill` - Build question relationship graphs
4. `content_gap_detection_skill` - Find content opportunities
5. `competitive_benchmarking_skill` - Compare to competitors
6. `eeat_scoring_skill` - Calculate E-E-A-T signals
7. `schema_optimization_skill` - Optimize schema markup
8. `keyword_clustering_skill` - Group related keywords
9. `content_planning_skill` - Create content strategies
10. `impact_estimation_skill` - Estimate opportunity impact
11. `trend_forecasting_skill` - Predict content trends
12. `brand_consistency_skill` - Analyze brand voice
13. `citation_tracking_skill` - Monitor brand citations
14. `opportunity_prioritization_skill` - Rank opportunities
15. `editorial_calendar_skill` - Schedule content production

---

## 🌐 Part 4: BAIV Integration Layer

### Input Integrations (SEO & Content Tools)

**1. Reddit API**
```typescript
{
  name: 'reddit',
  type: 'input',
  auth: 'oauth',
  capabilities: [
    'search_posts',
    'search_comments',
    'get_subreddit_info',
    'monitor_mentions',
    'track_sentiment'
  ],
  rate_limits: {
    per_minute: 60
  }
}
```

**2. Google Search Console**
```typescript
{
  name: 'google_search_console',
  type: 'input',
  auth: 'oauth',
  capabilities: [
    'get_search_analytics',
    'list_sitemaps',
    'get_url_inspection',
    'get_performance_data'
  ]
}
```

**3. Google Analytics 4**
```typescript
{
  name: 'google_analytics_4',
  type: 'input',
  auth: 'oauth',
  capabilities: [
    'get_traffic_data',
    'get_engagement_metrics',
    'get_conversion_data',
    'run_reports'
  ]
}
```

**4. SEMrush API**
```typescript
{
  name: 'semrush',
  type: 'input',
  auth: 'api_key',
  capabilities: [
    'keyword_research',
    'competitor_analysis',
    'backlink_data',
    'rank_tracking',
    'site_audit'
  ]
}
```

**5. Ahrefs API**
```typescript
{
  name: 'ahrefs',
  type: 'input',
  auth: 'api_key',
  capabilities: [
    'backlink_analysis',
    'keyword_data',
    'content_explorer',
    'rank_tracker'
  ]
}
```

**6-10: Additional Input Integrations**
- Perplexity API (AI responses)
- ChatGPT API (AI responses)
- Twitter/X API (social listening)
- LinkedIn API (B2B content)
- Schema.org Validator API

### Output Integrations (Content & Publishing)

**1. WordPress REST API**
```typescript
{
  name: 'wordpress',
  type: 'output',
  auth: 'basic',
  capabilities: [
    'create_post',
    'update_post',
    'add_schema_markup',
    'manage_media',
    'publish_content'
  ]
}
```

**2. Webflow API**
```typescript
{
  name: 'webflow',
  type: 'output',
  auth: 'api_key',
  capabilities: [
    'create_cms_item',
    'update_cms_item',
    'publish_site',
    'manage_collections'
  ]
}
```

**3. Notion API**
```typescript
{
  name: 'notion',
  type: 'output',
  auth: 'oauth',
  capabilities: [
    'create_page',
    'create_database',
    'update_content',
    'share_pages'
  ]
}
```

**4. Airtable API**
```typescript
{
  name: 'airtable',
  type: 'output',
  auth: 'api_key',
  capabilities: [
    'create_records',
    'update_records',
    'manage_tables',
    'automation_triggers'
  ]
}
```

**5. Google Sheets API**
```typescript
{
  name: 'google_sheets',
  type: 'output',
  auth: 'oauth',
  capabilities: [
    'create_spreadsheet',
    'update_cells',
    'share_sheet',
    'format_data'
  ]
}
```

**6-10: Additional Output Integrations**
- Slack API (notifications)
- Email (SendGrid/Postmark)
- GitHub API (documentation)
- Buffer API (social scheduling)
- HubSpot CMS API

---

## 🚀 Part 5: Implementation Roadmap

### 8-Week Rapid Iteration Plan

**Week 1-2: Foundation & P1-P2**
- Setup: Next.js + Supabase + Anthropic SDK
- P1: Configuration Agent
- P2: Discovery & Profiling Agent (Reddit + AI agents)
- 3 integrations: Reddit, Google Search Console, GA4

**Week 3-4: P3-P4**
- P3: Capture Agent (PAA scraper + content crawler)
- P4: Audit Agent (scoring algorithms)
- Add: SEMrush/Ahrefs integration

**Week 5-6: P5-P6**
- P5: Analytics Agent
- P6: Gap Analysis Agent
- Dashboard for visualization

**Week 7-8: P7 & Polish**
- P7: Ideation Agent
- Output integrations (WordPress, Notion, Sheets)
- E2E testing
- Documentation

---

## 📊 Success Metrics (BAIV KPIs)

| Metric | Target | Measurement |
|--------|--------|-------------|
| P1-P7 Completion Time | <90 min | Full workflow |
| Reddit Discussions Analyzed | >50 | Per discovery run |
| AI Agent Coverage | 3+ agents | ChatGPT, Claude, Perplexity |
| PAA Questions Captured | >200 | Per capture run |
| BAIV Score Accuracy | >85% | Validated with real data |
| Content Ideas Generated | >30 | Per ideation run |
| System Uptime | >99% | Infrastructure |
| Cost per Workflow | <$5 | All API costs |

---

**BAIV MVP Step 2 Complete - Ready for Download and Implementation** 🚀
