"""Pydantic schemas for CGA Agent configuration and data models."""

from datetime import datetime
from enum import Enum
from typing import Any
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


# ============================================================================
# Enums
# ============================================================================


class GapType(str, Enum):
    """Types of gaps that can be identified."""

    STRUCTURAL_HOLE = "structural_hole"
    CAPABILITY = "capability"
    CONTENT = "content"
    COMPETITIVE = "competitive"


class Severity(str, Enum):
    """Severity levels for gaps and threats."""

    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class ThreatType(str, Enum):
    """Types of threats."""

    COMPETITIVE = "competitive"
    MARKET = "market"
    CAPABILITY = "capability"
    TECHNOLOGY = "technology"


class OpportunityType(str, Enum):
    """Types of opportunities."""

    MARKET = "market"
    CAPABILITY = "capability"
    CONTENT = "content"
    PARTNERSHIP = "partnership"


class AnalysisType(str, Enum):
    """Types of gap analysis."""

    COMPARATIVE = "comparative"
    STRUCTURAL = "structural"
    COMPETITIVE = "competitive"


class AnalysisStatus(str, Enum):
    """Status of an analysis session."""

    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


# ============================================================================
# Context Budget
# ============================================================================


class ContextBudget(BaseModel):
    """Token budget allocation for context layers."""

    strategic: int = 500
    domain: int = 1200
    operational: int = 1000

    @property
    def total(self) -> int:
        return self.strategic + self.domain + self.operational

    @property
    def compaction_threshold(self) -> int:
        return int(self.total * 0.80)


# ============================================================================
# Input Schemas
# ============================================================================


class Entity(BaseModel):
    """An entity to be analyzed."""

    id: str
    type: str
    name: str
    attributes: dict[str, Any] = Field(default_factory=dict)


class Competitor(BaseModel):
    """A competitor entity for comparative analysis."""

    id: str
    name: str
    description: str | None = None
    strengths: list[str] = Field(default_factory=list)
    weaknesses: list[str] = Field(default_factory=list)


class AnalysisRequest(BaseModel):
    """Request to perform gap analysis."""

    session_id: UUID = Field(default_factory=uuid4)
    domain_type: str = Field(..., description="Domain instance (e.g., 'baiv', 'air', 'w4m')")
    analysis_scope: str = Field(..., description="Scope of analysis")
    analysis_type: AnalysisType = AnalysisType.COMPARATIVE

    target_entities: list[Entity] = Field(
        ..., min_length=3, description="At least 3 entities required for comparative analysis"
    )
    competitors: list[Competitor] = Field(default_factory=list)
    timeframe: str | None = None

    # Priority weights (must sum to 1.0)
    weight_impact: float = Field(default=0.35, ge=0, le=1)
    weight_effort: float = Field(default=0.25, ge=0, le=1)
    weight_urgency: float = Field(default=0.20, ge=0, le=1)
    weight_alignment: float = Field(default=0.20, ge=0, le=1)

    # Optional context
    strategic_objectives: list[str] = Field(default_factory=list)
    linked_okrs: list[str] = Field(default_factory=list)


# ============================================================================
# Analysis Output Schemas
# ============================================================================


class Evidence(BaseModel):
    """Evidence supporting a gap identification."""

    source: str
    metric: str
    value: float
    description: str | None = None


class BusinessImpact(BaseModel):
    """Business impact assessment."""

    revenue_risk: Severity = Severity.MEDIUM
    competitive_risk: Severity = Severity.MEDIUM
    opportunity_cost: str | None = None


class IdentifiedGap(BaseModel):
    """A gap identified during analysis."""

    gap_id: UUID = Field(default_factory=uuid4)
    gap_type: GapType
    title: str
    description: str
    severity: Severity
    confidence: float = Field(ge=0, le=1)

    evidence: list[Evidence] = Field(default_factory=list)
    affected_entities: list[str] = Field(default_factory=list)
    business_impact: BusinessImpact | None = None


class MitigationOption(BaseModel):
    """A mitigation option for a threat."""

    option: str
    effort: Severity
    effectiveness: float = Field(ge=0, le=1)


class ThreatAssessment(BaseModel):
    """Assessment of a threat derived from gaps."""

    threat_id: UUID = Field(default_factory=uuid4)
    related_gaps: list[UUID] = Field(default_factory=list)
    threat_type: ThreatType
    title: str
    description: str

    probability: float = Field(ge=0, le=1)
    impact: float = Field(ge=0, le=1)

    @property
    def risk_score(self) -> float:
        return self.probability * self.impact

    mitigation_options: list[MitigationOption] = Field(default_factory=list)


class PotentialValue(BaseModel):
    """Potential value from an opportunity."""

    revenue_impact: str | None = None
    market_share_gain: str | None = None
    competitive_advantage: str | None = None


class OpportunityAssessment(BaseModel):
    """Assessment of an opportunity derived from gaps."""

    opportunity_id: UUID = Field(default_factory=uuid4)
    related_gaps: list[UUID] = Field(default_factory=list)
    opportunity_type: OpportunityType
    title: str
    description: str

    potential_value: PotentialValue | None = None
    feasibility: float = Field(ge=0, le=1)
    time_to_value: str | None = None

    required_capabilities: list[str] = Field(default_factory=list)
    bridge_concepts: list[str] = Field(default_factory=list)


class PriorityQuadrants(BaseModel):
    """Priority matrix quadrants."""

    quick_wins: list[UUID] = Field(default_factory=list)
    major_projects: list[UUID] = Field(default_factory=list)
    fill_ins: list[UUID] = Field(default_factory=list)
    hard_slogs: list[UUID] = Field(default_factory=list)


class RankedItem(BaseModel):
    """A ranked item in the priority list."""

    item_id: UUID
    rank: int
    composite_score: float
    rationale: str


class PriorityMatrix(BaseModel):
    """Priority matrix for gaps and opportunities."""

    dimensions: list[str] = ["impact", "effort", "urgency", "alignment"]
    quadrants: PriorityQuadrants = Field(default_factory=PriorityQuadrants)
    ranked_list: list[RankedItem] = Field(default_factory=list)


class ImplementationPhase(BaseModel):
    """A phase in recommendation implementation."""

    phase: int
    name: str
    deliverables: list[str] = Field(default_factory=list)
    estimated_effort: str | None = None


class ExpectedOutcome(BaseModel):
    """Expected outcome from implementing a recommendation."""

    gaps_closed: list[UUID] = Field(default_factory=list)
    value_created: str | None = None
    metrics: list[dict[str, Any]] = Field(default_factory=list)


class Recommendation(BaseModel):
    """A strategic recommendation."""

    recommendation_id: UUID = Field(default_factory=uuid4)
    addresses_gaps: list[UUID] = Field(default_factory=list)
    addresses_threats: list[UUID] = Field(default_factory=list)
    enables_opportunities: list[UUID] = Field(default_factory=list)

    title: str
    description: str
    action_type: str
    priority: Severity

    implementation_phases: list[ImplementationPhase] = Field(default_factory=list)
    dependencies: list[str] = Field(default_factory=list)
    risks: list[str] = Field(default_factory=list)

    expected_outcome: ExpectedOutcome | None = None


class ExecutiveSummary(BaseModel):
    """Executive summary of the analysis."""

    key_findings: list[str] = Field(default_factory=list)
    critical_gaps_count: int = 0
    high_priority_opportunities: int = 0
    recommended_next_steps: list[str] = Field(default_factory=list)
    estimated_total_value: str | None = None


class GapAnalysisReport(BaseModel):
    """Complete gap analysis report."""

    # Metadata
    report_id: UUID = Field(default_factory=uuid4)
    session_id: UUID
    analysis_type: AnalysisType
    domain_instance: str
    date_created: datetime = Field(default_factory=datetime.utcnow)
    status: AnalysisStatus = AnalysisStatus.COMPLETED

    # Strategic Context
    aligned_objectives: list[str] = Field(default_factory=list)
    linked_okrs: list[str] = Field(default_factory=list)

    # Analysis Scope
    entity_count: int = 0
    relationship_count: int = 0
    timeframe: str | None = None
    comparators: list[str] = Field(default_factory=list)

    # Results
    identified_gaps: list[IdentifiedGap] = Field(default_factory=list)
    threats: list[ThreatAssessment] = Field(default_factory=list)
    opportunities: list[OpportunityAssessment] = Field(default_factory=list)
    priority_matrix: PriorityMatrix | None = None
    recommendations: list[Recommendation] = Field(default_factory=list)

    # Summary
    executive_summary: ExecutiveSummary | None = None


# ============================================================================
# Configuration Schemas
# ============================================================================


class InstanceConfig(BaseModel):
    """Configuration for a specific PF-Instance."""

    instance_id: str
    instance_name: str
    description: str | None = None

    # Domain-specific threat categories
    threat_categories: list[str] = Field(default_factory=list)

    # Custom impact calculation formula (optional)
    impact_formula: str | None = None

    # Mitigation templates
    mitigation_templates: list[str] = Field(default_factory=list)

    # Extension points
    extensions: dict[str, Any] = Field(default_factory=dict)


class AnalysisConfig(BaseModel):
    """Configuration for analysis parameters."""

    min_entities: int = 3
    min_confidence: float = 0.75
    escalation_confidence: float = 0.60

    # Weights for priority calculation
    default_weights: dict[str, float] = Field(
        default_factory=lambda: {
            "impact": 0.35,
            "effort": 0.25,
            "urgency": 0.20,
            "alignment": 0.20,
        }
    )

    # Thresholds for severity classification
    severity_thresholds: dict[str, float] = Field(
        default_factory=lambda: {
            "critical": 0.85,
            "high": 0.70,
            "medium": 0.50,
            "low": 0.0,
        }
    )


class CGAConfig(BaseModel):
    """Main configuration for CGA Agent."""

    version: str = "1.0.0"
    instance: InstanceConfig | None = None
    analysis: AnalysisConfig = Field(default_factory=AnalysisConfig)
    context_budget: ContextBudget = Field(default_factory=ContextBudget)

    # Skill configurations
    enabled_skills: list[str] = Field(
        default_factory=lambda: [
            "structural_hole_detector",
            "threat_analyzer",
            "opportunity_identifier",
            "bridge_concept_finder",
            "priority_matrix_builder",
            "comparative_scorer",
        ]
    )

    # MCP integrations
    enable_infranodus: bool = True
    enable_web_research: bool = True
