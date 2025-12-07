# Blog Creator API Documentation

## Overview
The Blog Creator uses a 2-step brief-based workflow:
1. Create a brief (with various sources)
2. Generate blog from brief

## API Endpoints (Mock Implementation)

### Brief Management

#### POST /api/blog/briefs
Create a new blog brief manually.

**Body:**
```json
{
  "source_type": "manual",
  "search_phrase": "Email Marketing Automation for B2B SaaS",
  "citation_opportunity": "Target ChatGPT and Claude for 'email automation' queries",
  "target_audience": "B2B marketing managers at SaaS companies",
  "content_angle": "Practical implementation guide with real-world examples",
  "required_subtopics": "Workflow examples, tool comparisons, ROI metrics",
  "competitor_analysis": "Competitors focus on features, we'll focus on implementation",
  "citation_sources": "Industry reports, case studies, expert interviews",
  "tone_constraints": "Professional but approachable, data-driven",
  "avoid_topics": "Overly technical API details",
  "forbidden_topics": "Competitor product names",
  "word_count": 2500,
  "style": "how-to-guide"
}
```

**Returns:**
```json
{
  "id": "brief-123",
  "status": "pending",
  "created_at": "2025-01-15T10:30:00Z"
}
```

#### POST /api/blog/briefs/from-reddit/{post_id}
Generate brief from Reddit post workflow results.

#### POST /api/blog/briefs/from-bluesky/{post_id}
Generate brief from Bluesky post workflow results.

#### POST /api/blog/briefs/from-gap/{gap_id}
Generate brief optimized for content gap.

#### GET /api/blog/briefs
List all briefs with filters.

**Query params:**
- status: pending|completed|failed
- source_type: manual|reddit|bluesky|gap_analysis
- used: true|false
- limit: max 100
- offset: pagination

#### PATCH /api/blog/briefs/{brief_id}
Update a brief's details.

#### DELETE /api/blog/briefs/{brief_id}
Delete a brief.

---

### Blog Generation

#### POST /api/blog/briefs/{brief_id}/generate
Generate blog from brief (orchestrates all generators).

**Body:**
```json
{
  "generate_images": true
}
```

**Returns 202 Accepted:**
```json
{
  "blog_id": "blog-456",
  "brief_id": "brief-123",
  "status": "generating",
  "message": "Blog generation started"
}
```

#### GET /api/blog/briefs/{brief_id}/status
Check generation status.

**Returns:**
```json
{
  "brief_id": "brief-123",
  "status": "completed",
  "blog_id": "blog-456",
  "blog_status": "draft",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:35:00Z"
}
```

---

### Blog Management

#### GET /api/blog/blogs
List all generated blogs.

**Query params:**
- status: draft|published|scheduled|archived
- page: default 1
- limit: default 20, max 100

**Returns:**
```json
{
  "total": 45,
  "blogs": [...],
  "page": 1,
  "limit": 20,
  "has_more": true
}
```

#### GET /api/blog/blogs/{blog_id}
Get complete blog with all components.

**Returns:**
```json
{
  "id": "blog-456",
  "brief_id": "brief-123",
  "title": "Email Marketing Automation: The Complete Guide",
  "slug": "email-marketing-automation-complete-guide",
  "content": "<html content>",
  "meta_description": "Learn email marketing automation...",
  "title_tag": "Email Marketing Automation Guide 2025",
  "table_of_contents": [
    { "id": "intro", "title": "Introduction", "level": 2 }
  ],
  "faqs": [
    {
      "question": "What is email marketing automation?",
      "answer": "Email marketing automation..."
    }
  ],
  "schema_markup": { "@context": "https://schema.org", ... },
  "internal_links": [
    { "text": "Related Article", "url": "/blog/related" }
  ],
  "external_links": [
    { "text": "Source", "url": "https://example.com" }
  ],
  "images": [
    {
      "url": "https://...",
      "alt": "Email automation workflow",
      "caption": "Example workflow"
    }
  ],
  "featured_image_url": "https://...",
  "featured_image_alt": "Email marketing automation",
  "word_count": 2547,
  "estimated_reading_time": 10,
  "status": "draft",
  "created_at": "2025-01-15T10:35:00Z"
}
```

#### PATCH /api/blog/blogs/{blog_id}
Update blog content or metadata.

#### DELETE /api/blog/blogs/{blog_id}
Delete a blog.

---

### Publishing

#### POST /api/blog/blogs/{blog_id}/publish
Publish or schedule a blog.

**Body:**
```json
{
  "destination": "download",
  "scheduled_for": "2025-01-20T09:00:00Z",
  "publish_settings": {}
}
```

**Returns:**
```json
{
  "blog_id": "blog-456",
  "status": "published",
  "published_url": "https://download.url",
  "destination": "download",
  "message": "Blog published successfully"
}
```

#### POST /api/blog/blogs/{blog_id}/export
Export blog in various formats.

**Body:**
```json
{
  "format": "html",
  "include_metadata": true,
  "include_images": true
}
```

**Returns:**
```json
{
  "blog_id": "blog-456",
  "format": "html",
  "download_url": "https://...",
  "expires_at": "2025-01-16T10:35:00Z",
  "file_size_bytes": 125648
}
```

---

### Analytics

#### GET /api/blog/blogs/{blog_id}/analytics
Get blog performance analytics.

**Returns:**
```json
{
  "blog_id": "blog-456",
  "views": 1247,
  "ai_citations": 12,
  "engagement_score": 78,
  "avg_time_on_page": 342,
  "bounce_rate": 45,
  "platforms_cited": ["ChatGPT", "Claude"],
  "created_at": "2025-01-15T10:35:00Z"
}
```

---

### Batch Operations

#### POST /api/blog/batch/generate
Generate multiple blogs from briefs.

**Body:**
```json
{
  "brief_ids": ["brief-123", "brief-124"],
  "generate_images": true,
  "priority": "normal"
}
```

**Returns 202:**
```json
{
  "batch_id": "batch-789",
  "total_briefs": 2,
  "status": "processing",
  "message": "Batch generation started"
}
```

## Database Schema

### blog_briefs
- id (uuid, pk)
- tenant_id (uuid, fk)
- source_type (enum: manual, reddit, bluesky, gap_analysis)
- source_id (uuid, nullable)
- search_phrase (text, required)
- citation_opportunity (text)
- target_audience (text)
- content_angle (text)
- required_subtopics (text)
- competitor_analysis (text)
- citation_sources (text)
- tone_constraints (text)
- avoid_topics (text)
- forbidden_topics (text)
- word_count (int, default 2500)
- style (text)
- status (enum: pending, completed, failed)
- used (boolean, default false)
- created_at (timestamp)
- updated_at (timestamp)

### generated_blogs
- id (uuid, pk)
- tenant_id (uuid, fk)
- brief_id (uuid, fk)
- title (text)
- slug (text)
- content (text, HTML)
- meta_description (text, max 160)
- title_tag (text, max 60)
- table_of_contents (jsonb)
- faqs (jsonb array)
- schema_markup (jsonb)
- internal_links (jsonb array)
- external_links (jsonb array)
- images (jsonb array)
- featured_image_url (text)
- featured_image_alt (text)
- word_count (int)
- estimated_reading_time (int)
- status (enum: draft, published, scheduled, archived)
- published_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)

## Implementation Notes

1. **Current Implementation**: All API calls are mocked with simulated delays
2. **Generation Process**: Multi-stage with Claude prompt caching (76% cost reduction)
3. **Generators Used**:
   - FAQ Generator (skills/generators/faq_generator.py)
   - Meta Generator (skills/generators/meta_generator.py)
   - Schema Generator (skills/generators/schema_generator.py)
   - Link Suggester (skills/generators/link_suggester.py)
   - Image Generator (skills/generators/image_generator.py)
4. **Main Orchestrator**: skills/content/blog_creator.py (490+ lines)

## Next Steps for Real Implementation

1. Replace mock API calls with actual fetch() calls
2. Add proper error handling and retry logic
3. Implement WebSocket for real-time generation status
4. Add file upload for featured images
5. Connect to WordPress/Shopify/Webflow APIs
6. Implement batch operations queue
7. Add analytics tracking integration
