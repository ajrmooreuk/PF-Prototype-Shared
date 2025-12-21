# PFC-Agents Skills Library Inventory
## Claude Code Skills for Claude SDK Agent Development

**Version:** 1.0  
**Date:** December 17, 2025  
**Platform:** Platform Foundation Core (PF-Core)  
**Purpose:** Skills inventory for agents created using Claude SDK

---

## Executive Summary

This document catalogs all skills available in Claude Code that can be leveraged by agents created using the Claude SDK. Skills are modular, self-contained packages that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

Skills follow a **progressive disclosure architecture**:
1. **Metadata** (name + description) - Always in context (~100 words)
2. **SKILL.md body** - Loaded when skill triggers (<5k words)
3. **Bundled resources** - Scripts, references, assets loaded as needed

---

## Skill Categories Overview

| Category | Skills Count | Purpose |
|----------|-------------|---------|
| **Public (Core)** | 6 | Production-ready document/file manipulation |
| **Examples** | 10 | Specialized creative, development & communication |
| **Total** | 16 | Full skills library |

---

## Public Skills (Core Production)

### 1. DOCX - Document Creation & Editing

**Location:** `/mnt/skills/public/docx/SKILL.md`

**Capabilities:**
- Create new Word documents using docx-js (JavaScript/TypeScript)
- Edit existing documents using OOXML manipulation (Python)
- Redlining workflow for tracked changes
- Comments and formatting preservation
- Text extraction via pandoc
- Document-to-image conversion

**Key Technologies:**
- docx-js (npm) for creation
- Python Document library for editing
- Pandoc for text extraction
- LibreOffice for PDF conversion

**Agent Use Cases:**
- Contract document generation
- Report templating
- Document review automation
- Track changes management

**Bundled Resources:**
- `docx-js.md` - JavaScript creation guide
- `ooxml.md` - Python editing reference
- `ooxml/scripts/` - Pack/unpack utilities

---

### 2. PDF - Processing & Manipulation

**Location:** `/mnt/skills/public/pdf/SKILL.md`

**Capabilities:**
- Text and table extraction
- PDF creation with ReportLab
- Merge/split documents
- Form filling
- OCR for scanned PDFs
- Watermarking and password protection

**Key Technologies:**
- pypdf - Basic operations
- pdfplumber - Text/table extraction
- reportlab - PDF creation
- pytesseract - OCR
- qpdf/pdftk - CLI tools

**Agent Use Cases:**
- Financial document processing
- Form automation
- Document archival workflows
- Data extraction pipelines

**Bundled Resources:**
- `FORMS.md` - Form filling guide
- `REFERENCE.md` - Advanced features

---

### 3. PPTX - Presentation Creation & Editing

**Location:** `/mnt/skills/public/pptx/SKILL.md`

**Capabilities:**
- HTML-to-PowerPoint conversion (html2pptx)
- Template-based presentation creation
- Direct OOXML editing
- Thumbnail grid generation
- Visual validation workflow
- Speaker notes and comments

**Key Technologies:**
- pptxgenjs (npm) for creation
- html2pptx library for HTML conversion
- Playwright for HTML rendering
- Python scripts for template manipulation

**Agent Use Cases:**
- Automated report generation
- Brand-consistent presentations
- Template customization
- Slide content management

**Bundled Resources:**
- `html2pptx.md` - HTML conversion guide
- `css.md` - Styling reference
- `ooxml.md` - Direct editing
- `scripts/` - thumbnail.py, replace.py, inventory.py

---

### 4. XLSX - Spreadsheet Operations

**Location:** `/mnt/skills/public/xlsx/SKILL.md`

**Capabilities:**
- Spreadsheet creation with formulas and formatting
- Data analysis with pandas
- Financial model color coding standards
- Formula recalculation via LibreOffice
- Error detection and validation

**Key Technologies:**
- openpyxl - Excel manipulation
- pandas - Data analysis
- LibreOffice - Formula recalculation
- recalc.py script

**Agent Use Cases:**
- Financial modeling automation
- Data pipeline processing
- Report generation
- Excel template management

**Critical Standards:**
- Blue text: Hardcoded inputs
- Black text: Formulas/calculations
- Green text: Cross-sheet links
- Zero formula errors requirement

---

### 5. Frontend Design

**Location:** `/mnt/skills/public/frontend-design/SKILL.md`

**Capabilities:**
- Production-grade UI/UX creation
- Distinctive aesthetic direction
- React, HTML/CSS, Vue components
- Motion and micro-interactions
- Typography and color systems

**Design Principles:**
- Bold aesthetic direction over generic patterns
- Avoid "AI slop" aesthetics
- Context-specific character
- Spatial composition innovation

**Agent Use Cases:**
- Landing page generation
- Dashboard UI creation
- Component library building
- Design system implementation

**Anti-Patterns to Avoid:**
- Generic fonts (Inter, Roboto, Arial)
- Purple gradients on white
- Cookie-cutter layouts

---

### 6. Product Self-Knowledge

**Location:** `/mnt/skills/public/product-self-knowledge/SKILL.md`

**Capabilities:**
- Authoritative Anthropic product reference
- Prevent hallucinations about Claude capabilities
- Question routing to correct documentation

**Documentation Sources:**
- Claude API: `docs.claude.com`
- Claude Code: Dedicated docs map
- Claude.ai: `support.claude.com`

**Agent Use Cases:**
- Product capability queries
- Documentation routing
- Feature verification

---

## Example Skills (Specialized)

### 7. MCP Builder

**Location:** `/mnt/skills/examples/mcp-builder/SKILL.md`

**Capabilities:**
- Model Context Protocol server development
- TypeScript/Python SDK patterns
- Tool design best practices
- Evaluation framework creation

**Development Phases:**
1. Deep research and planning
2. Implementation
3. Review and test
4. Create evaluations

**Key Technologies:**
- TypeScript SDK (recommended)
- Python FastMCP
- Zod/Pydantic for schemas
- Streamable HTTP transport

**Agent Use Cases:**
- External API integration
- Custom tool development
- Service connector creation

**Bundled Resources:**
- `reference/mcp_best_practices.md`
- `reference/node_mcp_server.md`
- `reference/python_mcp_server.md`
- `reference/evaluation.md`

---

### 8. Skill Creator

**Location:** `/mnt/skills/examples/skill-creator/SKILL.md`

**Capabilities:**
- Skill creation methodology
- Progressive disclosure patterns
- Resource bundling strategies
- Validation and packaging

**Skill Anatomy:**
```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/
    ├── references/
    └── assets/
```

**Creation Workflow:**
1. Understand skill with concrete examples
2. Plan reusable contents
3. Initialize skill (init_skill.py)
4. Implement resources and SKILL.md
5. Package skill (package_skill.py)
6. Iterate based on usage

**Agent Use Cases:**
- Custom skill development
- Domain expertise packaging
- Workflow automation encapsulation

---

### 9. Theme Factory

**Location:** `/mnt/skills/examples/theme-factory/SKILL.md`

**Capabilities:**
- 10 pre-set professional themes
- Color palette and font pairings
- Artifact styling application
- Custom theme generation

**Available Themes:**
1. Ocean Depths - Maritime professional
2. Sunset Boulevard - Warm vibrant
3. Forest Canopy - Earth tones
4. Modern Minimalist - Clean grayscale
5. Golden Hour - Autumnal warmth
6. Arctic Frost - Cool winter
7. Desert Rose - Dusty sophistication
8. Tech Innovation - Bold modern
9. Botanical Garden - Fresh organic
10. Midnight Galaxy - Cosmic depth

**Agent Use Cases:**
- Presentation branding
- Document styling
- Report visual consistency

---

### 10. Brand Guidelines (Anthropic)

**Location:** `/mnt/skills/examples/brand-guidelines/SKILL.md`

**Capabilities:**
- Anthropic brand color application
- Typography standards (Poppins/Lora)
- Smart font management
- Shape accent styling

**Brand Colors:**
- Dark: `#141413`
- Light: `#faf9f5`
- Orange accent: `#d97757`
- Blue accent: `#6a9bcc`
- Green accent: `#788c5d`

**Agent Use Cases:**
- Anthropic-branded artifacts
- Corporate identity compliance
- Visual formatting automation

---

### 11. Algorithmic Art

**Location:** `/mnt/skills/examples/algorithmic-art/SKILL.md`

**Capabilities:**
- Generative art with p5.js
- Seeded randomness for reproducibility
- Interactive parameter exploration
- Philosophy-driven creation

**Process Flow:**
1. Algorithmic philosophy creation (.md)
2. Deduce conceptual seed
3. p5.js implementation (.html + .js)
4. Visual validation

**Key Concepts:**
- Flow fields
- Particle systems
- Noise functions
- Parametric variation

**Agent Use Cases:**
- Data visualization art
- Generative design assets
- Interactive installations

---

### 12. Canvas Design

**Location:** `/mnt/skills/examples/canvas-design/SKILL.md`

**Capabilities:**
- Visual art creation (PNG/PDF)
- Design philosophy development
- Museum-quality output
- Multi-page composition

**Creation Process:**
1. Design philosophy creation
2. Deduce subtle reference
3. Canvas creation with craftsmanship
4. Final refinement pass

**Agent Use Cases:**
- Poster design
- Artistic composition
- Visual branding assets

---

### 13. Slack GIF Creator

**Location:** `/mnt/skills/examples/slack-gif-creator/SKILL.md`

**Capabilities:**
- Slack-optimized GIF creation
- Animation concepts (shake, bounce, pulse)
- Easing functions
- Size optimization

**Slack Requirements:**
- Emoji: 128x128 px
- Message: 480x480 px
- FPS: 10-30
- Colors: 48-128

**Available Utilities:**
- GIFBuilder
- Validators
- Easing functions
- Frame helpers

**Agent Use Cases:**
- Custom emoji creation
- Team communication assets
- Animated indicators

---

### 14. Internal Communications

**Location:** `/mnt/skills/examples/internal-comms/SKILL.md`

**Capabilities:**
- 3P updates (Progress, Plans, Problems)
- Company newsletters
- FAQ responses
- Status reports
- Incident reports

**Agent Use Cases:**
- Automated status generation
- Newsletter compilation
- FAQ maintenance

**Bundled Resources:**
- `examples/3p-updates.md`
- `examples/company-newsletter.md`
- `examples/faq-answers.md`
- `examples/general-comms.md`

---

## Agent Integration Patterns

### Skill Invocation Pattern

```javascript
// Agent skill invocation pseudocode
const skillContext = {
  skillPath: '/mnt/skills/public/docx/SKILL.md',
  resources: {
    scripts: '/mnt/skills/public/docx/scripts/',
    references: '/mnt/skills/public/docx/references/'
  }
};

// Progressive loading
agent.loadSkillMetadata(skillPath);  // Always loaded
agent.loadSkillBody(skillPath);       // On trigger
agent.loadResource(resourcePath);     // As needed
```

### Skill Selection Decision Tree

```
User Request
    │
    ├─→ Document Work?
    │       ├─→ Word (.docx) → docx skill
    │       ├─→ PDF → pdf skill
    │       ├─→ Excel (.xlsx) → xlsx skill
    │       └─→ PowerPoint (.pptx) → pptx skill
    │
    ├─→ Frontend/UI Work?
    │       └─→ frontend-design skill
    │
    ├─→ Creative/Art?
    │       ├─→ Generative code art → algorithmic-art skill
    │       ├─→ Static visual art → canvas-design skill
    │       └─→ Animated GIFs → slack-gif-creator skill
    │
    ├─→ Development?
    │       ├─→ MCP Server → mcp-builder skill
    │       └─→ New Skill → skill-creator skill
    │
    └─→ Styling/Branding?
            ├─→ Anthropic brand → brand-guidelines skill
            └─→ Theme selection → theme-factory skill
```

---

## PF-Core Agent Cluster Mapping

### Discovery Cluster Agents
| Agent | Recommended Skills |
|-------|-------------------|
| Value Discovery Agent | docx, pdf, xlsx |
| Market Intel Agent | pdf, xlsx |
| Stakeholder Mapping | docx, pptx |

### Analysis Cluster Agents
| Agent | Recommended Skills |
|-------|-------------------|
| Gap Analysis Agent | xlsx, pdf |
| Risk Assessment | docx, xlsx |
| Compliance Agent | pdf, docx |

### Generation Cluster Agents
| Agent | Recommended Skills |
|-------|-------------------|
| Document Gen Agent | docx, pdf, pptx |
| Content Agent | docx, canvas-design |
| Report Builder | xlsx, pptx, docx |

### Optimization Cluster Agents
| Agent | Recommended Skills |
|-------|-------------------|
| Dashboard Agent | frontend-design, xlsx |
| Visualization Agent | algorithmic-art, canvas-design |
| Output Formatter | theme-factory, brand-guidelines |

---

## Implementation Recommendations

### For BAIV Platform
1. **Primary Skills:** docx, pdf, pptx, frontend-design
2. **Creative Assets:** canvas-design, theme-factory
3. **Client Reports:** xlsx, docx

### For AIR Modules
1. **Strategy Documents:** docx, pptx
2. **Analysis Outputs:** xlsx, pdf
3. **Innovation Prototypes:** frontend-design, mcp-builder

### For W4M Value Engineering
1. **Value Maps:** xlsx, docx
2. **Executive Presentations:** pptx, theme-factory
3. **Financial Models:** xlsx

---

## Skill Extension Strategy

### Custom Skill Development Priority
1. **BAIV Ontology Skill** - Schema.org-based content optimization
2. **Value Engineering Skill** - VSOM workflow automation
3. **Agent Orchestration Skill** - Multi-agent coordination patterns

### Recommended skill-creator Usage
```bash
# Initialize new skill
python scripts/init_skill.py baiv-ontology --path /custom-skills/

# After development, package
python scripts/package_skill.py /custom-skills/baiv-ontology/
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-17 | Initial inventory |

---

**Document Owner:** PF-Core Architecture Team  
**Next Review:** Upon new skill additions
