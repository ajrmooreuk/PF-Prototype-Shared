# FAQ Generator Component

## Overview
The FAQ Generator is a comprehensive tool under the Content Studio dropdown that helps businesses create AI-optimized FAQ sections with schema markup.

## Components Created

### 1. FAQGeneratorPage.tsx
Main page component with tab navigation:
- **Generate Tab**: Create new FAQ sets
- **FAQ Library Tab**: View and manage existing FAQ sets

### 2. GenerateTab.tsx
Form for generating FAQs with:
- Topic input (required, 3-255 chars)
- Keywords tag input (1-10 keywords)
- Quantity slider (1-50 questions)
- Additional context sources:
  - Competitor URLs (up to 5)
  - Document upload (.pdf, .docx, .txt, max 5MB)
- Discovery integration toggle
- Advanced settings:
  - Answer tone (Professional, Conversational, Technical, Beginner-Friendly)
  - Answer length (Concise 50-100, Standard 100-150, Detailed 150-250 words)

### 3. LivePreview.tsx
Sticky preview sidebar showing:
- Sample FAQ accordion UI
- "Schema Ready" badge
- "What You Get" checklist with benefits

### 4. GenerationResults.tsx
Results view after generation with:
- Success banner
- Action buttons (Generate More, Copy Schema, Export, Save)
- Expandable FAQ list with:
  - Question/Answer display
  - Keywords chips
  - Schema markup preview
  - Edit/Delete actions

### 5. FAQLibrary.tsx
Library table view with:
- Search and filters (status, sort)
- FAQ sets table with columns:
  - Topic (with Discovery Enhanced badge)
  - Questions count
  - Keywords
  - Status (Draft, Published, Archived)
  - Created date
  - Actions (View, Edit, Export, Delete)
- Expandable rows showing question list
- Pagination

## API Integration Points

### Base URL
```
https://ecco-ai-vis-9wprj.ondigitalocean.app
```

### Authentication
All API calls require:
```javascript
headers: {
  'Authorization': `Bearer ${JWT_TOKEN}`,
  'Content-Type': 'application/json'
}
// Plus query parameter: ?tenant_id=${TENANT_ID}
```

### Endpoints

**Generate FAQs**
```
POST /api/faq-generator/generate?tenant_id=${TENANT_ID}
Body: {
  "topic": string,
  "keywords": array,
  "client_id": string,
  "competitors": array (optional),
  "quantity": integer
}
```

**Get FAQ Library**
```
GET /api/faq-generator/?tenant_id=${TENANT_ID}&status=${STATUS}&skip=${SKIP}&limit=${LIMIT}
```

**Export FAQ Set**
```
GET /api/faq-generator/{faq_id}/export?format=${FORMAT}&tenant_id=${TENANT_ID}
Formats: html, json, markdown, schema
```

**Get Schema**
```
GET /api/faq-generator/{faq_id}/schema?tenant_id=${TENANT_ID}
```

**Update FAQ Set**
```
PUT /api/faq-generator/{faq_id}?tenant_id=${TENANT_ID}
Body: { status, published_url, etc. }
```

**Delete FAQ Set**
```
DELETE /api/faq-generator/{faq_id}?tenant_id=${TENANT_ID}
```

## Design System

### Colors
- Primary Teal: #02a4bf
- Dark Teal: #005260
- Orange: #e84e1c
- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444
- Gray text: #6b7280
- Dark text: #111827, #374151

### Typography
- **Headings**: Poppins Bold/Semibold
- **Body**: Open Sans Regular/Medium
- **Code**: Roboto Mono

### Component Styling
- Cards: 24px padding, 16px radius, shadow
- Inputs: 8px radius, 12px padding
- Buttons: Primary #02a4bf, hover scale 1.05
- Badges: Pill shape, 6px padding, 6px radius
- Transitions: 200ms ease-in-out

## Features

### Generate Tab
✓ Topic validation (3-255 chars)
✓ Keyword tag management (max 10)
✓ Quantity slider (1-50)
✓ URL validation for competitors
✓ File upload with size validation
✓ Discovery insights integration
✓ Tone and length customization
✓ Real-time preview
✓ AI credit usage indicator

### Results View
✓ Success notification
✓ FAQ accordion with expand/collapse
✓ Inline editing capability
✓ Schema markup preview with syntax highlighting
✓ Copy to clipboard functionality
✓ Multiple export formats
✓ Save to library

### Library Tab
✓ Search functionality
✓ Filter by status
✓ Sort options
✓ Expandable table rows
✓ Discovery enhancement badges
✓ Bulk actions
✓ Pagination
✓ Empty state handling

## Navigation
The FAQ Generator is accessible from:
- **Top Navigation** → Content Studio → FAQ Generator
- **Breadcrumb**: Dashboard > Content Studio > FAQ Generator

## Current Status
✅ Component structure created
✅ UI/UX implemented with BAIV branding
✅ Navigation integration complete
✅ Mock data and state management
✅ Ready for API integration

## Next Steps
1. Integrate real API endpoints
2. Add loading states for API calls
3. Implement error handling
4. Add detailed validation
5. Create export functionality
6. Build edit/delete modals
7. Add bulk operations
8. Implement search/filter logic
