# PF-Core Comparative Gap Analysis Agent

A reusable SDK-orchestrated gap analysis system that identifies, analyzes, prioritizes, and transforms gaps into actionable strategic recommendations.

## Overview

The CGA Agent is built on the Claude Agent SDK and provides:

- **Domain-Agnostic Core**: Reusable gap analysis skills that work across any domain
- **Parameterized Workflows**: Configure for specific PF-Instances (BAIV, AIR, W4M)
- **Strategic Alignment**: Integrates with VSOM and OKR frameworks
- **Comprehensive Analysis**: Structural holes, threats, opportunities, and recommendations

## Features

### Core Skills

| Skill | Description |
|-------|-------------|
| **Structural Hole Detector** | Identifies disconnected clusters in knowledge graphs |
| **Threat Analyzer** | Assesses competitive threats from gaps |
| **Opportunity Identifier** | Transforms gaps into opportunities |
| **Bridge Concept Finder** | Finds connecting concepts between clusters |
| **Priority Matrix Builder** | Builds impact/effort prioritization matrices |
| **Comparative Scorer** | Scores entities across dimensions |

### Analysis Workflow

1. Validate input and load strategic context
2. Build knowledge graph from target entities
3. Detect structural gaps
4. Analyze threats from identified gaps
5. Identify opportunities from gaps
6. Find bridge concepts
7. Build priority matrix
8. Generate strategic recommendations
9. Compile comprehensive report

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd pf-cga-agent

# Install dependencies
pip install -e .

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

## Configuration

Create a `.env` file with the following:

```env
ANTHROPIC_API_KEY=your_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional
INFRANODUS_API_KEY=your_infranodus_key
```

## Usage

### CLI

```bash
# Run analysis with demo entities
pf-cga analyze

# Run analysis with custom entities
pf-cga analyze --entities entities.json --competitors competitors.json

# Specify domain and scope
pf-cga analyze -d baiv -s ai_visibility -t comparative

# Save output to file
pf-cga analyze -o report.json

# Interactive chat mode
pf-cga chat
```

### Python API

```python
import asyncio
from pf_cga_agent import CGAOrchestrator, Settings
from pf_cga_agent.config.schemas import AnalysisRequest, Entity

# Initialize
settings = Settings()
orchestrator = CGAOrchestrator(settings)

# Create request
request = AnalysisRequest(
    domain_type="baiv",
    analysis_scope="ai_visibility",
    target_entities=[
        Entity(id="brand-1", type="Brand", name="My Brand"),
        Entity(id="topic-1", type="Topic", name="AI Visibility"),
        Entity(id="topic-2", type="Topic", name="Content Strategy"),
    ],
)

# Run analysis
report = asyncio.run(orchestrator.analyze(request))

# Access results
print(f"Gaps found: {len(report.identified_gaps)}")
print(f"Threats: {len(report.threats)}")
print(f"Opportunities: {len(report.opportunities)}")
```

### Web UI

```bash
cd ui
npm install
npm run dev
```

Open http://localhost:3000 to access the web interface.

## Architecture

```
pf-cga-agent/
├── src/pf_cga_agent/
│   ├── agents/           # Agent orchestration
│   │   ├── orchestrator.py
│   │   └── conversation.py
│   ├── skills/           # Reusable analysis skills
│   │   ├── core/         # Domain-agnostic skills
│   │   └── baiv/         # BAIV-specific skills
│   ├── config/           # Configuration management
│   │   ├── settings.py
│   │   └── schemas.py
│   ├── context/          # Context management
│   └── integrations/     # MCP integrations
├── templates/
│   └── database/         # Supabase schema
├── ui/                   # React/Next.js UI
└── tests/                # Test suites
```

## Skill Extension

Skills can be extended for domain-specific use cases:

```python
from pf_cga_agent.skills.core.threat_analyzer import ThreatAnalyzerSkill

# Configure BAIV-specific extensions
threat_analyzer = ThreatAnalyzerSkill(extensions={
    "threatCategories": ["visibility_loss", "citation_decline", "competitor_surge"],
    "impactCalculation": lambda gap, comp: gap.confidence * 0.8,
    "mitigationTemplates": {
        "visibility_loss": [
            ("Content refresh", "medium", 0.75),
            ("Schema optimization", "low", 0.70),
        ]
    }
})
```

## Database Schema

The CGA Agent uses Supabase for persistence:

- `cga_sessions` - Analysis sessions
- `cga_entities` - Target entities
- `cga_gaps` - Identified gaps
- `cga_threats` - Threat assessments
- `cga_opportunities` - Opportunity assessments
- `cga_recommendations` - Strategic recommendations
- `cga_reports` - Analysis reports
- `cga_audit_log` - Audit trail

Run the schema migration:

```bash
psql $SUPABASE_DB_URL < templates/database/001_cga_schema.sql
```

## API Reference

### AnalysisRequest

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `domainType` | string | Yes | Domain instance (baiv, air, w4m) |
| `analysisScope` | string | Yes | Scope of analysis |
| `analysisType` | enum | Yes | comparative, structural, competitive |
| `targetEntities` | Entity[] | Yes | At least 3 entities |
| `competitors` | Competitor[] | No | Competitor entities |
| `weightImpact` | float | No | Impact weight (default 0.35) |
| `weightEffort` | float | No | Effort weight (default 0.25) |
| `weightUrgency` | float | No | Urgency weight (default 0.20) |
| `weightAlignment` | float | No | Alignment weight (default 0.20) |

### GapAnalysisReport

The complete report includes:
- `identifiedGaps` - List of IdentifiedGap
- `threats` - List of ThreatAssessment
- `opportunities` - List of OpportunityAssessment
- `priorityMatrix` - PriorityMatrix with quadrants
- `recommendations` - List of Recommendation
- `executiveSummary` - Summary with key findings

## Development

```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run tests
pytest

# Run linting
ruff check src/

# Run type checking
mypy src/
```

## License

MIT License - Platform Foundation

## Version

1.0.0
