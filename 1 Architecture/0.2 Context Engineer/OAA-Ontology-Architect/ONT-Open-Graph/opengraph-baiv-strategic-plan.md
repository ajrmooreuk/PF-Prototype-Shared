# OpenGraph (OG) Protocol for BAIV & AI Visibility
## Strategic Assessment & Implementation Plan

**Version:** 1.0  
**Date:** November 2025  
**Status:** Planning Phase - Pre-Implementation  
**Implementation Agent:** OAA (Ontology Architect Agent) via Claude Code

---

## 1. OpenGraph Protocol Definition

### 1.1 What is OpenGraph?

OpenGraph is an open protocol originally developed by Facebook (2010) that enables web pages to become rich objects within a social graph. It uses HTML `<meta>` tags in the document `<head>` to define structured properties that describe page content to machines and social platforms.

### 1.2 Core Protocol Structure

```html
<head>
  <!-- Required OG Properties -->
  <meta property="og:title" content="Entity or Page Title" />
  <meta property="og:type" content="website|article|profile|business.business" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com/canonical-url" />
  
  <!-- Recommended Properties -->
  <meta property="og:description" content="Description of content" />
  <meta property="og:site_name" content="Organization or Site Name" />
  <meta property="og:locale" content="en_GB" />
</head>
```

### 1.3 OG Types Relevant to BAIV

| OG Type | Application | BAIV Relevance |
|---------|-------------|----------------|
| `profile` | Individual persons | High - Personal brand visibility |
| `business.business` | Organizations | High - Corporate AI discoverability |
| `article` | Content pieces | High - Thought leadership tracking |
| `website` | Generic pages | Medium - Site-level indexing |
| `product` | Service offerings | Medium - Commercial visibility |

---

## 2. OpenGraph for Individual Profile Discovery

### 2.1 Profile Namespace Properties

```html
<meta property="og:type" content="profile" />
<meta property="profile:first_name" content="Amanda" />
<meta property="profile:last_name" content="Smith" />
<meta property="profile:username" content="amandasmith" />
<meta property="profile:gender" content="female" />
```

### 2.2 Profile Discovery Value for AI Systems

**How AI Systems Use Profile OG Data:**

1. **Entity Resolution**: AI crawlers use `profile:username` and name properties to disambiguate individuals across platforms
2. **Knowledge Graph Population**: LLMs building knowledge graphs extract profile metadata for entity nodes
3. **Citation Attribution**: When AI systems cite sources, OG profile data helps attribute authorship
4. **Expertise Mapping**: Combined with article authorship, builds expertise profiles

**Discovery Signals for Individuals:**
- Profile OG tags on personal websites
- Author attribution on published content
- LinkedIn profile OG (automatically generated)
- Twitter/X profile cards (OG-compatible)
- Conference speaker pages
- Podcast guest appearances

### 2.3 Limitations for Individual Discovery

- No structured expertise/skills properties
- No relationship mapping (employer, collaborators)
- No professional credentials
- Requires Schema.org Person for comprehensive data

---

## 3. OpenGraph for Organization Discovery

### 3.1 Organization-Related Properties

```html
<meta property="og:type" content="business.business" />
<meta property="og:site_name" content="Acme Corporation" />
<meta property="business:contact_data:street_address" content="123 Business St" />
<meta property="business:contact_data:locality" content="London" />
<meta property="business:contact_data:region" content="England" />
<meta property="business:contact_data:postal_code" content="EC1A 1BB" />
<meta property="business:contact_data:country_name" content="United Kingdom" />
```

### 3.2 Organization Discovery Value for AI Systems

**How AI Systems Use Organization OG Data:**

1. **Brand Recognition**: `og:site_name` provides consistent brand identification
2. **Content Attribution**: Links articles/content to organizational source
3. **Geographic Context**: Business location for regional relevance
4. **Visual Brand Identity**: `og:image` for logo/brand asset recognition

**Discovery Signals for Organizations:**
- Corporate website OG metadata
- Press release OG tags
- Product/service page metadata
- Company blog authorship chains
- Event sponsorship pages

### 3.3 Limitations for Organization Discovery

- No industry classification
- No employee/team relationships
- No service/product categorization
- No founding date, revenue, or scale indicators
- Requires Schema.org Organization for comprehensive data

---

## 4. OG + Schema.org: Complementary Strategy

### 4.1 Why Both Standards Matter

| Aspect | OpenGraph | Schema.org | Combined Value |
|--------|-----------|------------|----------------|
| **Adoption** | Ubiquitous (social platforms) | Growing (SEO-driven) | Maximum reach |
| **Parsing** | Lightweight, fast | Comprehensive, semantic | Layered intelligence |
| **AI Training Data** | High volume | High quality | Complete picture |
| **Relationship Mapping** | Minimal | Extensive | Graph-ready |
| **Entity Types** | ~15 core types | 800+ types | Full taxonomy |

### 4.2 Recommended Dual Implementation Pattern

```html
<head>
  <!-- OpenGraph Layer (Social/AI Crawler Friendly) -->
  <meta property="og:type" content="profile" />
  <meta property="og:title" content="Amanda Smith - AI Strategy Consultant" />
  <meta property="og:description" content="Digital transformation expert..." />
  <meta property="og:url" content="https://example.com/amanda-smith" />
  <meta property="og:image" content="https://example.com/amanda-headshot.jpg" />
  <meta property="profile:first_name" content="Amanda" />
  <meta property="profile:last_name" content="Smith" />
  
  <!-- Schema.org Layer (Deep Semantic) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amanda Smith",
    "jobTitle": "AI Strategy Consultant",
    "worksFor": {
      "@type": "Organization",
      "name": "BAIV Consulting"
    },
    "knowsAbout": ["AI Visibility", "Digital Transformation", "Ontology Design"],
    "sameAs": [
      "https://linkedin.com/in/amandasmith",
      "https://twitter.com/amandasmith"
    ]
  }
  </script>
</head>
```

---

## 5. BAIV OpenGraph Integration Architecture

### 5.1 Discovery Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BAIV OpenGraph Discovery Pipeline                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │   Target    │    │     OG      │    │   Entity    │    │   BAIV      │   │
│  │   URLs      │───▶│   Parser    │───▶│  Resolver   │───▶│  Ontology   │   │
│  │             │    │             │    │             │    │  Integration │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│        │                  │                  │                  │            │
│        ▼                  ▼                  ▼                  ▼            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │ Seed URLs   │    │ Extract:    │    │ Match to:   │    │ Store in:   │   │
│  │ - Websites  │    │ - og:type   │    │ - Persons   │    │ - Profile   │   │
│  │ - LinkedIn  │    │ - og:title  │    │ - Orgs      │    │   Ontology  │   │
│  │ - Twitter   │    │ - profile:* │    │ - Content   │    │ - Org       │   │
│  │ - Articles  │    │ - business:*│    │ - Products  │    │   Ontology  │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 OG Data to Ontology Mapping

| OG Property | Target Ontology | Schema.org Equivalent |
|-------------|-----------------|----------------------|
| `og:title` | Entity.displayName | name |
| `og:description` | Entity.description | description |
| `og:url` | Entity.canonicalUrl | url |
| `og:image` | Entity.primaryImage | image |
| `og:site_name` | Organization.name | Organization.name |
| `profile:first_name` | Person.givenName | givenName |
| `profile:last_name` | Person.familyName | familyName |
| `profile:username` | Person.identifier | identifier |
| `og:type` | Entity.entityType | @type |
| `article:author` | Content.author | author |
| `article:published_time` | Content.datePublished | datePublished |

---

## 6. High-Level Implementation Plan

### Phase 1: OG Discovery Foundation (Week 1-2)

**Objective:** Establish OG parsing infrastructure

**Deliverables:**
1. OG Parser module for BAIV platform
2. OG-to-Ontology mapping specifications
3. URL seed list taxonomy (by entity type)
4. Integration tests for major platforms

**OAA Tasks:**
- Define OG ontology extension namespace
- Create OG property mapping rules
- Establish entity type inference logic
- Design fallback hierarchy (OG → Schema.org → heuristic)

### Phase 2: Entity Resolution Engine (Week 3-4)

**Objective:** Map OG discoveries to BAIV entities

**Deliverables:**
1. Entity matching algorithms (name, URL, username)
2. Cross-platform identity resolution
3. Confidence scoring system
4. Duplicate detection and merging

**OAA Tasks:**
- Extend Person ontology with OG source tracking
- Extend Organization ontology with OG metadata
- Create provenance tracking for discovery sources
- Define entity merge rules and conflict resolution

### Phase 3: AI Visibility Scoring Integration (Week 5-6)

**Objective:** Incorporate OG signals into visibility metrics

**Deliverables:**
1. OG completeness scoring (per entity)
2. OG consistency scoring (cross-platform)
3. OG reach estimation (platform presence)
4. Visibility score weighting for OG factors

**OAA Tasks:**
- Define OG visibility dimension in scoring ontology
- Create OG benchmark standards
- Map OG gaps to improvement recommendations
- Integrate with P13 Performance Monitoring agent

### Phase 4: Continuous Discovery & Monitoring (Week 7-8)

**Objective:** Automated ongoing discovery

**Deliverables:**
1. Scheduled OG crawling for tracked entities
2. Change detection and alerting
3. New entity discovery from relationship chains
4. Competitive OG analysis dashboard

**OAA Tasks:**
- Define monitoring ontology patterns
- Create alert rule specifications
- Design discovery expansion logic
- Integrate with P14 Predictive Analytics agent

---

## 7. OG-Specific Agent Responsibilities

### 7.1 Agent Integration Map

| Agent | OG-Related Responsibilities |
|-------|----------------------------|
| **P0: Master Orchestrator** | Coordinate OG discovery across entity types |
| **P2: Deep Research** | Extract OG from discovered content sources |
| **P3: Technical Audit** | Validate client OG implementation quality |
| **P5: Network Analysis** | Map relationships from article:author chains |
| **P10: Content Optimizer** | Recommend OG improvements for visibility |
| **P13: Performance Monitor** | Track OG completeness and consistency metrics |
| **P14: Predictive Analytics** | Forecast visibility impact of OG improvements |

### 7.2 OAA (Ontology Architect Agent) Specific Tasks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OAA OpenGraph Integration Tasks                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  1. ONTOLOGY EXTENSION                                                        │
│     ├── Create og: namespace in BAIV ontology                                │
│     ├── Define OGMetadata class with all property mappings                   │
│     ├── Establish inheritance from existing Entity classes                   │
│     └── Create validation rules for OG data quality                          │
│                                                                               │
│  2. MAPPING SPECIFICATIONS                                                    │
│     ├── OG → Schema.org bidirectional mappings                               │
│     ├── Platform-specific OG variations (LinkedIn, Twitter, etc.)            │
│     ├── Fallback logic for missing properties                                │
│     └── Type inference rules from og:type values                             │
│                                                                               │
│  3. DISCOVERY RULES                                                           │
│     ├── URL pattern matching for entity type inference                       │
│     ├── Profile detection heuristics                                         │
│     ├── Organization detection heuristics                                    │
│     └── Relationship extraction from author/publisher chains                 │
│                                                                               │
│  4. QUALITY SCORING                                                           │
│     ├── OG completeness metrics per entity type                              │
│     ├── Cross-platform consistency scoring                                   │
│     ├── Image quality assessment rules                                       │
│     └── Description quality assessment rules                                 │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Platform-Specific OG Considerations

### 8.1 LinkedIn

**Auto-generated OG:** LinkedIn automatically generates OG tags for profiles and company pages.

**Discovery Approach:**
- Crawl public profile URLs
- Extract: og:title (name + headline), og:description (summary), og:image (headshot)
- Note: Rate limiting and authentication barriers

**BAIV Value:** Primary source for professional identity verification

### 8.2 Twitter/X

**OG Implementation:** Twitter uses proprietary `twitter:` namespace alongside OG

**Relevant Tags:**
```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@username" />
<meta name="twitter:creator" content="@authorusername" />
```

**BAIV Value:** Real-time content authorship and influence mapping

### 8.3 Company Websites

**Variable Quality:** OG implementation varies widely

**Assessment Criteria:**
- Completeness (all required tags present)
- Accuracy (metadata matches page content)
- Freshness (regular updates)
- Image quality (proper dimensions, branding)

**BAIV Value:** Primary source for organization entity resolution

### 8.4 Content Platforms (Medium, Substack, etc.)

**Structured OG:** Most content platforms implement comprehensive OG

**Key Properties:**
- `article:author` - Author attribution
- `article:published_time` - Content freshness
- `article:section` - Topic categorization
- `article:tag` - Keyword extraction

**BAIV Value:** Thought leadership content discovery and attribution

---

## 9. Success Metrics

### 9.1 Discovery Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| OG extraction success rate | >95% | Parsed URLs / Attempted URLs |
| Entity resolution accuracy | >90% | Correct matches / Total matches |
| Cross-platform coverage | >80% | Platforms with OG / Known platforms |
| New entity discovery rate | 50+/week | Net new entities from OG chains |

### 9.2 Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| OG completeness score | >75% | Required fields present |
| OG-Schema.org alignment | >85% | Matching data points |
| Data freshness | <30 days | Last OG update detection |
| Image quality compliance | >90% | Proper dimensions/format |

### 9.3 Business Impact Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Visibility score improvement | +15% | Pre/post OG optimization |
| AI citation rate increase | +20% | Citations with OG vs without |
| Entity disambiguation success | >95% | Unique entity resolution |
| Client OG audit adoption | 70% | Clients implementing recommendations |

---

## 10. Risk Considerations

### 10.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Platform blocking crawlers | Medium | High | Respect robots.txt, rate limiting |
| OG format variations | High | Medium | Flexible parsing, fallback logic |
| Stale OG data | Medium | Medium | Timestamp tracking, refresh scheduling |
| Missing required tags | High | Low | Graceful degradation, Schema.org fallback |

### 10.2 Data Quality Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Incorrect entity matching | Medium | High | Confidence thresholds, human review |
| Duplicate entities | Medium | Medium | Merge algorithms, canonical URLs |
| Outdated information | Medium | Medium | Change detection, refresh policies |
| Misleading OG (spam/SEO abuse) | Low | Medium | Quality signals, source reputation |

---

## 11. Appendix: OG Property Reference

### A. Core Properties (Required)

| Property | Description | Example |
|----------|-------------|---------|
| `og:title` | Title of object | "Amanda Smith - AI Consultant" |
| `og:type` | Type of object | "profile", "article", "website" |
| `og:image` | Image URL | "https://example.com/image.jpg" |
| `og:url` | Canonical URL | "https://example.com/page" |

### B. Optional Properties

| Property | Description | Example |
|----------|-------------|---------|
| `og:description` | Description | "Expert in AI visibility..." |
| `og:site_name` | Site name | "BAIV Consulting" |
| `og:locale` | Locale | "en_GB" |
| `og:locale:alternate` | Alt locales | "en_US", "de_DE" |

### C. Profile Properties

| Property | Description |
|----------|-------------|
| `profile:first_name` | First name |
| `profile:last_name` | Last name |
| `profile:username` | Username/handle |
| `profile:gender` | Gender |

### D. Article Properties

| Property | Description |
|----------|-------------|
| `article:author` | Author profile URL |
| `article:published_time` | ISO 8601 datetime |
| `article:modified_time` | ISO 8601 datetime |
| `article:section` | Section name |
| `article:tag` | Tag keywords |

### E. Business Properties

| Property | Description |
|----------|-------------|
| `business:contact_data:street_address` | Street address |
| `business:contact_data:locality` | City |
| `business:contact_data:region` | State/Province |
| `business:contact_data:postal_code` | Postal code |
| `business:contact_data:country_name` | Country |

---

## 12. Next Steps for OAA Implementation

1. **Review this specification** with stakeholder alignment
2. **Create OG ontology namespace** in BAIV ontology registry
3. **Develop OG parser module** in Claude Code
4. **Implement entity resolution** with confidence scoring
5. **Integrate with existing agents** (P2, P3, P5, P10, P13)
6. **Build monitoring dashboard** for OG visibility metrics
7. **Document API specifications** for platform integrations

---

*This document serves as the strategic foundation for OpenGraph integration into the BAIV platform. Implementation to be executed via Claude Code using the OAA (Ontology Architect Agent) following the phased approach outlined above.*
