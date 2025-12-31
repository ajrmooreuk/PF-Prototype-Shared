# AI Visibility Agency - Agent Build Master List

## Overview

This document outlines all agents/skills to be built for the AI Visibility Agency system. Each agent is **self-contained per client** - no shared dependencies, no cross-contamination.

### Architecture Principle
```
/foot-scientific
  /agents
    discovery.py
    citation_tester.py
    reddit_scraper.py
    faq_generator.py  (standalone OR called by blog_creator)
    ...
  /config
    client_context.json
    airtable_config.json
    nlweb_config.json  (if applicable)
  /outputs
    (generated reports, content, etc.)
  run_discovery.sh
  run_citations.sh
  run_faq.sh  (can run alone)
  ...

/sierra-dreams
  (same structure, completely independent)
```

### Design Pattern: Standalone + Callable
Every agent/skill is **standalone** - can be run directly via bash. However, some agents can **call** other agents when needed:

- `blog_creator.py` can call `faq_generator.py`, `meta_generator.py`, etc.
- `faq_generator.py` can also run completely alone
- No agent REQUIRES another to function
- Maximum flexibility, zero tangled dependencies

### Clients
- Ecco AI
- BAIV
- Foot Scientific
- Sierra Dreams
- Modality
- Leaps and Bounds
- Form Design
- Premier Credit
- (Future clients - duplicate template)

---

## PHASE 1: FOUNDATION
*These create the client context that everything else needs. Run these FIRST for any new client.*

### 1.1 Discovery Agent
**Purpose:** Initial client intelligence gathering - creates the master context file

**Inputs Required:**
- Client URL
- Known competitors (2-5)
- Industry/niche
- Target geography (if local)
- Basic brand voice notes

**What It Does:**
- Analyzes client website structure and content
- Maps current web presence
- Identifies content themes and topics
- Assesses current schema markup
- Checks robots.txt and AI crawler permissions
- Evaluates site architecture for AI crawlability
- Identifies key products/services
- Extracts existing brand messaging

**Outputs:**
- `client_context.json` - Master context file for all other agents
- `discovery_report.md` - Human-readable findings
- Airtable: Discovery Audit table

**Run Frequency:** Once at onboarding, then quarterly refresh

---

### 1.2 ICP Discovery Agent
**Purpose:** Ideal Customer Profile analysis - who the client serves

**Inputs Required:**
- Client context from Discovery Agent
- Any existing customer data/personas
- Target market notes

**What It Does:**
- Identifies target customer segments
- Maps customer pain points
- Documents customer journey stages (awareness → consideration → decision)
- Identifies where ICPs hang out online (subreddits, forums, social)
- Maps query patterns by ICP segment
- Identifies competitor audiences

**Outputs:**
- Updates `client_context.json` with ICP section
- `icp_profile.md` - Detailed ICP documentation
- Airtable: ICP Profiles table
- List of subreddits/communities to monitor

**Run Frequency:** Once at onboarding, refresh when targeting changes

---

## PHASE 2: ANALYSIS
*These analyze where the client currently stands in AI visibility.*

### 2.1 Citation Tester
**Purpose:** Test AI platform citations for client queries

**Platforms Tested:**
- ChatGPT
- Claude
- Gemini (App)
- Perplexity
- Google Search AI Mode (Gemini 3) *(NEW)*

**What It Does:**
- Two-tier testing:
  - Tier 1: All queries via ChatGPT scraper for discovery
  - Tier 2: High-priority queries across all 4+ platforms
- Uses DataForSEO API for platform testing
- Calculates RPI scores (Relevance Position Index)
- Identifies citation gaps
- Tracks competitor citations
- Distinguishes citation types:
  - Text citations
  - Table inclusions
  - Interactive tool inclusions *(NEW - Gemini 3)*
  - Calculator/visualization inclusions *(NEW - Gemini 3)*

**Outputs:**
- Airtable: Citation Tests table
- Citation gap report
- Competitor citation analysis

**Run Frequency:** Weekly or bi-weekly

---

### 2.2 LLM Mentions Agent
**Purpose:** Passive monitoring for brand/client mentions across AI platforms via DataForSEO

**Different from Citation Tester:** Citation Tester tests specific queries YOU choose. LLM Mentions discovers ANY mention of client across AI platforms.

**Platforms Monitored:**
- ChatGPT
- Claude
- Gemini
- Perplexity
- Google Search AI Mode

**What It Does:**
- Monitors for brand name mentions
- Monitors for product/service mentions
- Monitors for competitor mentions (share of voice)
- Tracks mention sentiment (positive/negative/neutral)
- Identifies unexpected query contexts where client appears
- Discovers new citation opportunities
- Tracks mention volume over time

**Outputs:**
- Airtable: LLM Mentions table
- Share of voice report (client vs competitors)
- New discovery alerts (unexpected mentions)
- Mention trend analysis
- Sentiment breakdown

**Run Frequency:** Daily or every other day

---

### 2.3 Query Expansion/Fanout Agent
**Purpose:** Generate comprehensive query variations and map to customer pathways

**What It Does:**
- Generates 25+ query variations from core queries
- Analyzes search intent for each variation
- Maps queries to customer discovery pathways
- Identifies content gaps per query cluster
- Prioritizes opportunities by gap score and citation potential
- Replicates Gemini Deep Research query expansion

**Outputs:**
- Airtable: Query Fanout table
- Query cluster map
- Opportunity prioritization list

**Run Frequency:** Monthly or when targeting new topics

---

### 2.4 Gap Analyzer
**Purpose:** RRF-based content gap analysis for comprehensive topical coverage

**Key Insight:** Breadth > Depth (20 articles ranking #5 beat 1 article ranking #1 in RRF)

**What It Does:**
- Analyzes content gaps using Reciprocal Rank Fusion principles
- For each topic:
  - Counts existing articles
  - Calculates RRF score (formula: 1/(60+rank))
  - Identifies missing sub-query variations
  - Compares to competitor coverage
  - Generates recommendations
- Calculates overall RRF health score (0-100)
- Includes Content Depth Scoring *(NEW - Gemini 3)*:
  - Word count analysis (1500+ preferred for Gemini 3)
  - Citation density
  - Topic comprehensiveness
  - Expertise signals (E-E-A-T)

**Outputs:**
- Airtable: Gap Analysis table
- Airtable: RRF Topic Coverage table
- RRF health score
- Prioritized gap list with recommendations

**Run Frequency:** Monthly

---

### 2.5 Turn Analysis Agent
**Purpose:** Analyze conversation turn patterns and customer journey stages

**What It Does:**
- Analyzes citation performance by journey stage:
  - Awareness
  - Consideration  
  - Decision
- Analyzes turn depth:
  - Initial queries
  - Follow-up queries
  - Deep conversation queries
- Identifies conversation patterns:
  - Quick answers
  - Research journeys
  - Comparison scenarios
- Generates stage-specific optimization recommendations
- Calculates platform performance per stage

**Outputs:**
- Airtable: Turn Analysis table
- Journey stage performance report
- Optimization recommendations by stage

**Run Frequency:** Monthly

---

### 2.6 Attribution Metrics Agent
**Purpose:** Calculate visibility scores and ROI projections

**What It Does:**
- Calculates AI Visibility Score (0-100) from 5 weighted factors:
  - Citation Rate: 40 points
  - RPI Score: 25 points
  - Platform Consistency: 15 points
  - Journey Stage Coverage: 10 points
  - Content Authority: 10 points
- Projects traffic impact (current → optimized state)
- Benchmarks performance against competitors
- Calculates ROI metrics and investment requirements
- Tracks leading indicators for future performance

**Outputs:**
- Airtable: Attribution Metrics table
- Visibility score dashboard data
- ROI projection report
- Competitor benchmark comparison

**Run Frequency:** Monthly

---

### 2.7 YouTube Transcript Analyzer
**Purpose:** Analyze YouTube content for AI citation opportunities

**What It Does:**
- Fetches video transcripts with multi-method fallback
- Analyzes citation potential across 4 dimensions:
  - Content Authority (0-25): Credentials, data, unique insights
  - Query Alignment (0-25): Answers common questions
  - Trigger Words (0-25): AI-friendly terminology
  - Content Completeness (0-25): Coverage depth
- Identifies recommended articles based on video content
- Supports incremental analysis (only new videos since last run)
- Categorizes by priority: high (80+), medium (60-79), low (<60)

**Outputs:**
- Airtable: YouTube Video Analysis table
- High-potential video list
- Content recommendations from video insights

**Run Frequency:** Weekly (incremental)

---

### 2.8 NLWeb Content Extractor & Schema Generator
**Purpose:** Extract semantic content and generate optimized schemas for NLWeb-enabled clients

**Conditional:** Only runs for clients with NLWeb deployed (checks for `nlweb_config.json`)

**Trigger:** 
- Once after Discovery (initial)
- On content updates (ongoing)

**What It Does:**
- Crawls client website via NLWeb /ask endpoint
- Extracts semantic meaning:
  - Services/products offered
  - Pricing information
  - Service areas (for local businesses)
  - FAQs and common queries
  - Unique value propositions
- Generates/enhances Schema.org markup:
  - LocalBusiness schema (if applicable)
  - Service schema
  - Product schema
  - FAQPage schema
  - Organization schema
- Tests schema with Google Rich Results Test
- Commits schema updates to client repo (if GitHub connected)
- Re-triggers AutoRAG indexing

**Outputs:**
- Generated schema files (JSON-LD)
- Schema validation report
- Airtable: Schema Status table
- AutoRAG re-index confirmation

**Run Frequency:** Initial + on content updates

---

### 2.9 Google Analytics/Search Console Agent
**Purpose:** Connect visibility efforts to actual traffic and conversion data

**What It Does:**
- Pulls AI referral traffic data from GA4
- Identifies GPTBot, ClaudeBot, PerplexityBot traffic patterns
- Maps citation events to traffic spikes
- Tracks AI-referred user behavior (bounce rate, time on site, conversions)
- Correlates visibility improvements with traffic changes
- Identifies high-value AI referral queries

**Outputs:**
- Airtable: Traffic Attribution table
- AI referral traffic report
- Citation → Traffic correlation analysis

**Run Frequency:** Weekly

---

## PHASE 3: DAILY MONITORING (Scrapers)
*These run on schedule to keep social listening data fresh.*

### 3.1 Reddit Scraper
**Purpose:** Monitor subreddits for pain points, solutions, and content opportunities

**What It Does:**
- Monitors specified subreddits (from ICP Discovery)
- Identifies posts matching client topics
- Extracts:
  - Pain points mentioned
  - Solutions discussed
  - Questions asked
  - Product/service recommendations
- Scores relevance to client offerings
- Identifies engagement opportunities
- Flags high-value threads for response

**Outputs:**
- Airtable: Reddit Mentions table
- Daily digest of relevant posts
- Content opportunity alerts
- Engagement opportunity flags

**Run Frequency:** Daily

---

### 3.2 Bluesky Scraper
**Purpose:** Monitor Bluesky for content opportunities and engagement

**What It Does:**
- Monitors relevant hashtags and accounts
- Identifies ICP conversations
- Extracts content themes and trends
- Scores engagement potential
- Identifies thought leadership opportunities

**Outputs:**
- Airtable: Bluesky Mentions table
- Trend analysis
- Engagement opportunities

**Run Frequency:** Daily

---

### 3.3 YouTube Scraper
**Purpose:** Monitor YouTube for video content and engagement opportunities

**What It Does:**
- Monitors competitor channels
- Tracks relevant topic videos
- Identifies trending content in niche
- Finds collaboration opportunities
- Tracks comments for pain points/questions

**Outputs:**
- Airtable: YouTube Monitoring table
- Competitor video analysis
- Content trend report

**Run Frequency:** Daily

---

### 3.4 Threads Scraper
**Purpose:** Monitor Threads for content opportunities

**What It Does:**
- Monitors relevant accounts and topics
- Identifies ICP conversations
- Tracks trending discussions
- Scores engagement potential

**Outputs:**
- Airtable: Threads Mentions table
- Engagement opportunities

**Run Frequency:** Daily

---



## PHASE 4: CONTENT CREATION
*These generate content based on gaps and opportunities identified.*

### 4.1 Blog Creator
**Purpose:** Generate 2500+ word AI-optimized blog posts

**What It Does:**
- Multi-stage blog generation:
  1. Load context (brief, discovery data, RRF coverage, citation patterns)
  2. Generate Table of Contents (8 sections)
  3. Generate section content (300-500 words each)
  4. Assemble full blog post
  5. Call FAQ Generator
  6. Call Meta Generator
  7. Call Schema Generator
  8. Call Link Suggester
  9. Call Image Generator
  10. Save to database
- Uses prompt caching (76% cost reduction)
- Integrates with discovery data for gap-aware content
- Optimized for AI citation (RRF principles, depth for Gemini 3)

**Outputs:**
- Complete blog post (markdown)
- Generated images
- Schema markup
- Meta tags
- Internal/external link suggestions
- Airtable: Content Queue table

**Run Frequency:** On-demand based on content calendar

---

### 4.2 FAQ Generator
**Purpose:** Generate schema-ready FAQs from multiple content sources

**What It Does:**
- Generates FAQs from:
  - Blog content
  - Reddit posts
  - Bluesky posts
  - Gap analysis
  - URLs
- Optimizes for AI citations
- Generates JSON-LD FAQPage schema
- Uses prompt caching (90% cost reduction)

**Outputs:**
- FAQ content
- FAQPage schema (JSON-LD)
- Airtable: FAQ Library table

**Run Frequency:** With blog creation or on-demand

---

### 4.3 Meta Generator
**Purpose:** Generate optimized meta tags and descriptions

**What It Does:**
- Generates SEO-optimized:
  - Title tags (AI-friendly)
  - Meta descriptions
  - URL slugs
- Keyword optimization for AI discoverability

**Outputs:**
- Meta content package

**Run Frequency:** With content creation

---

### 4.4 Schema Generator
**Purpose:** Generate JSON-LD schema markup for multiple content types

**What It Does:**
- Generates schema for:
  - Article
  - Product
  - Service
  - HowTo
  - FAQPage
  - LocalBusiness
  - Organization
- Can combine multiple schemas
- Entity optimization (@id, sameAs linking) *(Gemini 3 optimized)*

**Outputs:**
- JSON-LD schema files
- Validation results

**Run Frequency:** With content creation

---

### 4.5 Link Suggester
**Purpose:** Suggest internal and external links for content

**What It Does:**
- Suggests contextually relevant internal links
- Suggests authoritative external sources
- Improves internal linking strategy
- Helps with content authority signaling

**Outputs:**
- Internal link suggestions with anchor text
- External authority link suggestions

**Run Frequency:** With content creation

---

### 4.6 Image Generator
**Purpose:** Generate SEO-optimized AI images for content

**What It Does:**
- Uses OpenAI's gpt-image-1 API
- Claude-powered prompt generation
- Creates SEO-optimized alt text
- Multiple style options
- Respects client brand guidelines

**Outputs:**
- Generated images
- Alt text
- Image metadata

**Run Frequency:** With content creation

---

### 4.7 Social Media Creator
**Purpose:** Generate platform-optimized social media posts

**What It Does:**
- Generates platform-specific posts:
  - LinkedIn: 1,300-2,000 chars, professional tone
  - Facebook: 40-80 chars optimal, conversational
  - Instagram: 2,200 chars max, visual storytelling, 5-10 hashtags
  - Twitter/X: 280 chars, punchy
  - Threads: Conversational, authentic
  - Bluesky: Community-focused
- Integrates discovery intelligence
- Generates platform-optimized images
- Can generate from: manual input, Reddit posts, Bluesky posts, gap analysis, blogs

**Outputs:**
- Platform-specific post content
- Hashtag sets
- Generated images
- Airtable: Social Content Queue table

**Run Frequency:** On-demand or batch weekly

---

### 4.8 RRF Content Planner
**Purpose:** Generate strategic content roadmap from gap analysis

**What It Does:**
- Pulls high-priority gaps from Gap Analyzer
- Generates article clusters (15-20 articles per topic)
- Plans sub-query coverage
- Creates publishing schedules
- Calculates expected RRF accumulation
- Generates specific:
  - Article titles
  - Target keywords
  - Content briefs
  - Priority order

**Outputs:**
- Content roadmap
- Publishing calendar
- Article briefs
- Airtable: Content Plan table

**Run Frequency:** Monthly

---

## PHASE 5: PUBLISHING
*These push content to platforms.*

### 5.1 Postiz Publisher
**Purpose:** Publish content via Postiz social media management

**What It Does:**
- Connects to client's Postiz instance
- Schedules posts across platforms
- Manages publishing queue
- Tracks published status

**Outputs:**
- Published post confirmations
- Schedule management
- Airtable: Publishing Log table

**Run Frequency:** On-demand or scheduled

---

### 5.2 WordPress Publisher
**Purpose:** Publish blog content directly to WordPress

**What It Does:**
- Creates WordPress posts via API
- Uploads media (images)
- Sets SEO fields (Yoast/RankMath compatible)
- Manages categories and tags
- Handles featured images

**Outputs:**
- Published post URL
- Publication confirmation
- Airtable: Publishing Log table

**Run Frequency:** On-demand

---

### 5.3 Social Media Publisher
**Purpose:** Multi-platform social media distribution

**What It Does:**
- Publishes to multiple platforms
- Manages cross-posting
- Tracks engagement after posting
- Handles platform-specific formatting

**Outputs:**
- Published post links
- Engagement tracking setup

**Run Frequency:** On-demand or scheduled

---

### 5.4 Lead Sync
**Purpose:** Synchronize leads across platforms

**What It Does:**
- Cross-platform lead syncing
- Deduplication
- Status synchronization
- CRM integration

**Outputs:**
- Synced lead records
- Sync status report

**Run Frequency:** Daily

---

## PHASE 6: LEAD GENERATION & OUTREACH
*Business development automation.*

### 6.1 Hunter Lead Finder
**Purpose:** Find email addresses and company information

**What It Does:**
- Email discovery from domains
- Company information lookup
- Email verification
- Contact enrichment

**Outputs:**
- Verified email addresses
- Company profiles
- Airtable: Leads table

**Run Frequency:** On-demand

---

### 6.2 Google Maps Lead Finder
**Purpose:** Find leads from Google Maps for local/regional targets

**What It Does:**
- Location-based business discovery
- Contact information extraction
- Category filtering
- Geographic targeting

**Outputs:**
- Local business leads
- Contact information
- Airtable: Leads table

**Run Frequency:** On-demand

---

### 6.3 LinkedIn Profile Search
**Purpose:** Search and analyze LinkedIn profiles for prospects

**What It Does:**
- Profile discovery by criteria
- Company employee search
- ICP matching
- Profile analysis

**Outputs:**
- Prospect profiles
- ICP match scores
- Airtable: LinkedIn Prospects table

**Run Frequency:** On-demand

---

### 6.4 LinkedIn DM Generator
**Purpose:** Generate personalized LinkedIn direct messages

**What It Does:**
- Personalized message generation based on profile
- Multi-touch sequence creation
- A/B variants
- Follow-up message generation

**Outputs:**
- Personalized DM templates
- Sequence templates

**Run Frequency:** On-demand

---

### 6.5 LinkedIn Connection Manager
**Purpose:** Manage LinkedIn connections and relationships

**What It Does:**
- Connection request management
- Relationship tracking
- Engagement tracking
- Follow-up scheduling

**Outputs:**
- Connection status updates
- Relationship tracking data

**Run Frequency:** Daily

---

### 6.6 Podcast Finder
**Purpose:** Find relevant podcasts for guest appearances

**What It Does:**
- Podcast discovery by topic/niche
- Audience size analysis
- Relevance scoring
- Contact information extraction
- Guest booking opportunity identification

**Outputs:**
- Podcast opportunity list
- Relevance scores
- Contact information
- Airtable: Podcast Opportunities table

**Run Frequency:** Monthly

---

### 6.7 Podcast Outreach Manager
**Purpose:** Manage podcast outreach campaigns

**What It Does:**
- Email template management
- Outreach sequence execution
- Follow-up scheduling
- Response tracking

**Outputs:**
- Outreach campaign status
- Response tracking
- Airtable: Podcast Outreach table

**Run Frequency:** Ongoing

---

### 6.8 Podcast Booking Tracker
**Purpose:** Track podcast booking status and follow-ups

**What It Does:**
- Booking status management
- Interview scheduling
- Follow-up reminders
- Appearance tracking

**Outputs:**
- Booking pipeline
- Interview calendar
- Airtable: Podcast Bookings table

**Run Frequency:** Ongoing

---

## PHASE 7: GEMINI 3 / ADVANCED FEATURES
*New capabilities based on Gemini 3.0 release (November 2025).*

### 7.1 Google Search AI Mode Tester
**Purpose:** Test citations specifically in Google Search AI Mode (separate from Gemini app)

**Why Critical:** 2B users, largest AI visibility platform, fundamentally different behavior from Gemini app

**What It Does:**
- Tests queries in Google Search AI Mode specifically
- Tracks different citation types:
  - Text citations
  - Interactive tool inclusions
  - Calculator inclusions
  - Visualization inclusions
  - Comparison table inclusions
- Compares results to Gemini app results
- Identifies Search-specific opportunities

**Outputs:**
- Search AI Mode citation report
- Interactive tool inclusion tracking
- Airtable: Google AI Mode Tests table

**Run Frequency:** Weekly

---

### 7.2 Interactive Citation Tracker
**Purpose:** Track citations in Gemini 3's generative UI (calculators, tools, visualizations)

**Why Critical:** Gemini 3 creates interactive tools on-the-fly; being embedded in these = 10x engagement

**What It Does:**
- Identifies when client is included in:
  - Generated calculators
  - Comparison matrices
  - Interactive visualizations
  - Dynamic tools
- Tracks position within generated tools
- Monitors feature completeness (is all client data represented?)
- Compares placement vs competitors

**Outputs:**
- Interactive citation report
- Tool placement analysis
- Feature completeness audit
- Airtable: Interactive Citations table

**Run Frequency:** Weekly

---

### 7.3 Content Depth Scorer
**Purpose:** Score content for Gemini 3's preference for depth over breadth

**Why Critical:** Gemini 3 is more selective, prefers comprehensive authority over surface-level coverage

**What It Does:**
- Analyzes content depth factors:
  - Word count (1500+ preferred)
  - Citation density (internal + external references)
  - Topic comprehensiveness (subtopic coverage)
  - Expertise signals (author credentials, E-E-A-T markers)
- Compares to competitor content depth
- Recommends consolidation (5 shallow → 1 deep)
- Scores likelihood of Gemini 3 citation

**Outputs:**
- Content depth scores
- Consolidation recommendations
- Depth gap analysis
- Airtable: Content Depth Audit table

**Run Frequency:** Monthly

---

### 7.4 Model Variant Tracker
**Purpose:** Track citation differences across Gemini 3 variants

**Why Critical:** Different modes (Pro vs Deep Think vs Flash) have different citation behaviors

**What It Does:**
- Tests queries across:
  - Gemini 3 Pro (fast, 1-3 thinking steps)
  - Gemini 3 Deep Think (slow, multi-step reasoning, highly selective)
  - Gemini 3 Flash (speed-optimized)
- Tracks which mode cites client
- Deep Think citations = higher authority placement
- Identifies mode-specific optimization opportunities

**Outputs:**
- Variant comparison report
- Mode-specific citation rates
- Airtable: Model Variant Tests table

**Run Frequency:** Weekly

---

### 7.5 Visual/Multimodal Query Tester
**Purpose:** Test citations for visual and voice search queries

**Why Critical:** Gemini 3 supports image, video, and voice queries - text-only testing is incomplete

**What It Does:**
- Tests visual search scenarios:
  - Product image → recommendations
  - Screenshot → alternatives
  - Logo recognition → brand info
- Tests voice query patterns
- Identifies visual/multimodal optimization opportunities
- Tracks visual search citations

**Outputs:**
- Multimodal citation report
- Visual search opportunities
- Airtable: Multimodal Tests table

**Run Frequency:** Monthly

---

### 7.6 Task Completion Attribution Agent
**Purpose:** Track full conversion path from citation → visit → action

**Why Critical:** Gemini 3 is agentic - it completes tasks, not just answers questions

**What It Does:**
- Tracks attribution chain:
  - AI citation → 
  - Website visit → 
  - User action (signup, purchase, booking)
- Identifies which citations drive conversions
- Measures citation-to-conversion rate
- Calculates true AI visibility ROI

**Outputs:**
- Task completion attribution report
- Citation → Conversion funnel data
- Airtable: Conversion Attribution table

**Run Frequency:** Weekly

---

### 7.7 Bot Traffic Analyzer
**Purpose:** Monitor AI crawler traffic patterns

**What It Does:**
- Tracks visits from:
  - GPTBot
  - ClaudeBot
  - PerplexityBot
  - GoogleBot (AI-related)
- Analyzes crawl patterns
- Identifies high-interest content
- Correlates crawls with citation changes
- Monitors robots.txt compliance

**Outputs:**
- Bot traffic report
- Crawl pattern analysis
- High-interest content list
- Airtable: Bot Traffic table

**Run Frequency:** Weekly

---

### 7.8 Entity/Knowledge Graph Optimizer
**Purpose:** Optimize for entity recognition and Knowledge Graph inclusion

**What It Does:**
- Audits entity markup:
  - Schema @id consistency
  - sameAs linking (Wikipedia, Wikidata, social profiles)
  - Knowledge Graph presence
- Identifies entity disambiguation issues
- Recommends entity optimization
- Tracks Knowledge Graph inclusion status

**Outputs:**
- Entity audit report
- Knowledge Graph status
- Optimization recommendations
- Airtable: Entity Status table

**Run Frequency:** Monthly

---

### 7.9 Sentiment & Brand Mention Tracker
**Purpose:** Distinguish mentions from citations and track sentiment

**What It Does:**
- Differentiates:
  - Direct citations (source linked)
  - Brand mentions (named but not linked)
  - Indirect references
- Analyzes sentiment:
  - Positive
  - Negative
  - Neutral
- Tracks mention volume over time
- Identifies reputation issues

**Outputs:**
- Mention vs citation breakdown
- Sentiment analysis report
- Reputation trend data
- Airtable: Brand Mentions table

**Run Frequency:** Weekly

---

## BUILD ORDER RECOMMENDATION

### Week 1-2: Foundation
1. Discovery Agent
2. ICP Discovery Agent

### Week 2-3: Core Analysis
3. Citation Tester
4. LLM Mentions Agent
5. Gap Analyzer
6. Query Expansion/Fanout

### Week 3-4: Monitoring
7. Reddit Scraper
8. Bluesky Scraper

### Week 4-5: Content Creation
9. Blog Creator (includes sub-agents: FAQ, Meta, Schema, Links, Images)
10. Social Media Creator

### Week 5-6: Publishing & Leads
11. Postiz Publisher
12. WordPress Publisher
13. Hunter Lead Finder

### Week 6-8: Advanced Analysis
14. Turn Analysis
15. Attribution Metrics
16. YouTube Transcript Analyzer
17. GA/GSC Agent

### Week 8-10: Gemini 3 Features
18. Google Search AI Mode Tester
19. Interactive Citation Tracker
20. Content Depth Scorer
21. Model Variant Tracker

### Ongoing: Additional Features
21. NLWeb Extractor (for applicable clients)
22. Visual/Multimodal Tester
23. Task Completion Attribution
24. All remaining agents...

---

## AIRTABLE STRUCTURE (Per Client)

Each client gets their own Airtable base with these tables:

### Discovery & Analysis
- Discovery Audits
- ICP Profiles
- Citation Tests
- LLM Mentions
- Query Fanouts
- Gap Analysis
- RRF Topic Coverage
- Turn Analysis
- Attribution Metrics
- YouTube Analysis
- Content Depth Audits

### Monitoring
- Reddit Mentions
- Bluesky Mentions
- YouTube Monitoring
- Threads Mentions
- LLM Mentions

### Content
- Content Queue
- FAQ Library
- Content Plans
- Schema Status

### Publishing
- Publishing Log
- Social Content Queue

### Leads
- Leads
- LinkedIn Prospects
- Podcast Opportunities
- Podcast Outreach
- Podcast Bookings

### Gemini 3 / Advanced
- Google AI Mode Tests
- Interactive Citations
- Model Variant Tests
- Multimodal Tests
- Conversion Attribution
- Bot Traffic
- Entity Status
- Brand Mentions

---

## TECH STACK

### Core
- Python 3.11+
- Claude API (with prompt caching)
- Airtable API

### Data Sources
- DataForSEO API (platform testing)
- YouTube Data API v3
- Reddit API
- Bluesky API
- Hunter API
- Google Maps API

### Optional Integrations
- Postiz (social publishing)
- WordPress API
- GitHub API (for NLWeb clients)
- Cloudflare API (for NLWeb)
- GA4 API
- Google Search Console API

### Execution
- Claude Code + Warp terminal
- Bash scripts for each agent
- Cron for scheduled runs (later)

---

## FILE STRUCTURE (Per Client)

```
/clients
  /foot-scientific
    /agents
      discovery.py
      icp_discovery.py
      citation_tester.py
      query_expansion.py
      gap_analyzer.py
      turn_analysis.py
      attribution_metrics.py
      youtube_analyzer.py
      nlweb_extractor.py
      reddit_scraper.py
      bluesky_scraper.py
      youtube_scraper.py
      threads_scraper.py
      llm_mentions.py
      blog_creator.py
      faq_generator.py
      meta_generator.py
      schema_generator.py
      link_suggester.py
      image_generator.py
      social_media_creator.py
      rrf_content_planner.py
      postiz_publisher.py
      wordpress_publisher.py
      hunter_lead_finder.py
      (etc...)
    /config
      client_context.json
      airtable_config.json
      nlweb_config.json (if applicable)
      api_keys.env
    /outputs
      /reports
      /content
      /schemas
    /scripts
      run_discovery.sh
      run_citations.sh
      run_llm_mentions.sh
      run_scrapers.sh
      run_blog.sh
      run_faq.sh
      run_social.sh
      (etc...)
    README.md
```

---

## NOTES

- Each client folder is completely self-contained
- No cross-client dependencies
- Duplicate entire structure for new clients
- Client context baked into each agent's prompts
- Updates to agent logic require updating all client copies (trade-off for zero contamination)
- NLWeb agents only for clients with nlweb_config.json present
- All outputs go to client-specific Airtable base

---

*Document Version: 1.0*
*Created: December 2025*
*For: Ecco AI / BAIV Agency Operations*
