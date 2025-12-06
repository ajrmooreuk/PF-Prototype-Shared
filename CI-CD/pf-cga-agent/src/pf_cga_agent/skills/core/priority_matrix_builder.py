"""Priority Matrix Builder Skill.

Builds impact/effort prioritization matrices for gaps and opportunities.
"""

from dataclasses import dataclass
from typing import Any
from uuid import UUID

import structlog

from pf_cga_agent.config.schemas import (
    IdentifiedGap,
    OpportunityAssessment,
    PriorityMatrix,
    PriorityQuadrants,
    RankedItem,
    Severity,
)
from pf_cga_agent.skills.base import (
    BaseSkill,
    ExtensionPoint,
    SkillResult,
    SkillStatus,
    ValidationResult,
)

logger = structlog.get_logger()


@dataclass
class PriorityInput:
    """Input for priority matrix building."""

    gaps: list[IdentifiedGap] | None = None
    opportunities: list[OpportunityAssessment] | None = None
    dimensions: list[str] | None = None
    weights: dict[str, float] | None = None


class PriorityMatrixBuilderSkill(BaseSkill[PriorityInput, PriorityMatrix]):
    """Skill for building prioritization matrices.

    Creates impact/effort matrices and ranks items based on configurable
    dimensions and weights.
    """

    DEFAULT_DIMENSIONS = ["impact", "effort", "urgency", "alignment"]
    DEFAULT_WEIGHTS = {
        "impact": 0.35,
        "effort": 0.25,
        "urgency": 0.20,
        "alignment": 0.20,
    }

    @property
    def id(self) -> str:
        return "cga:priority-matrix-builder"

    @property
    def name(self) -> str:
        return "Priority Matrix Builder"

    @property
    def description(self) -> str:
        return (
            "Builds impact/effort prioritization matrices for gaps and opportunities. "
            "Assigns items to quadrants (Quick Wins, Major Projects, Fill-Ins, Hard Slogs) "
            "and produces a ranked priority list."
        )

    def validate(self, input_data: PriorityInput) -> ValidationResult:
        """Validate priority matrix input."""
        errors = []
        warnings = []

        if not input_data.gaps and not input_data.opportunities:
            errors.append("At least one gap or opportunity required")

        if input_data.weights:
            total = sum(input_data.weights.values())
            if abs(total - 1.0) > 0.01:
                warnings.append(f"Weights sum to {total}, normalizing to 1.0")

        return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)

    async def execute(self, input_data: PriorityInput) -> SkillResult[PriorityMatrix]:
        """Build priority matrix from gaps and opportunities."""
        try:
            dimensions = input_data.dimensions or self.DEFAULT_DIMENSIONS
            weights = input_data.weights or self.DEFAULT_WEIGHTS

            # Normalize weights
            total_weight = sum(weights.values())
            weights = {k: v / total_weight for k, v in weights.items()}

            # Collect all items with scores
            scored_items: list[tuple[UUID, str, dict[str, float], float]] = []

            # Score gaps
            if input_data.gaps:
                for gap in input_data.gaps:
                    scores = self._score_gap(gap, dimensions)
                    composite = self._calculate_composite(scores, weights)
                    item_id = gap.gap_id if isinstance(gap.gap_id, UUID) else UUID(str(gap.gap_id))
                    scored_items.append((item_id, "gap", scores, composite))

            # Score opportunities
            if input_data.opportunities:
                for opp in input_data.opportunities:
                    scores = self._score_opportunity(opp, dimensions)
                    composite = self._calculate_composite(scores, weights)
                    item_id = opp.opportunity_id if isinstance(opp.opportunity_id, UUID) else UUID(str(opp.opportunity_id))
                    scored_items.append((item_id, "opportunity", scores, composite))

            # Assign to quadrants based on impact and effort
            quadrants = PriorityQuadrants()

            for item_id, item_type, scores, composite in scored_items:
                impact = scores.get("impact", 0.5)
                effort = scores.get("effort", 0.5)

                # Quadrant assignment:
                # Quick Wins: High Impact, Low Effort
                # Major Projects: High Impact, High Effort
                # Fill-Ins: Low Impact, Low Effort
                # Hard Slogs: Low Impact, High Effort
                if impact >= 0.6 and effort <= 0.4:
                    quadrants.quick_wins.append(item_id)
                elif impact >= 0.6 and effort > 0.4:
                    quadrants.major_projects.append(item_id)
                elif impact < 0.6 and effort <= 0.4:
                    quadrants.fill_ins.append(item_id)
                else:
                    quadrants.hard_slogs.append(item_id)

            # Create ranked list
            scored_items.sort(key=lambda x: x[3], reverse=True)

            ranked_list = []
            for rank, (item_id, item_type, scores, composite) in enumerate(scored_items, 1):
                rationale = self._generate_rationale(scores, item_type)
                ranked_list.append(
                    RankedItem(
                        item_id=item_id,
                        rank=rank,
                        composite_score=round(composite, 3),
                        rationale=rationale,
                    )
                )

            matrix = PriorityMatrix(
                dimensions=dimensions,
                quadrants=quadrants,
                ranked_list=ranked_list,
            )

            return SkillResult(
                status=SkillStatus.SUCCESS,
                data=matrix,
                confidence=0.85,
                metadata={
                    "total_items": len(scored_items),
                    "quick_wins": len(quadrants.quick_wins),
                    "major_projects": len(quadrants.major_projects),
                    "fill_ins": len(quadrants.fill_ins),
                    "hard_slogs": len(quadrants.hard_slogs),
                },
            )

        except Exception as e:
            logger.exception("Priority matrix building failed", error=str(e))
            return SkillResult(
                status=SkillStatus.FAILED,
                error=f"Failed to build priority matrix: {str(e)}",
            )

    def _score_gap(self, gap: IdentifiedGap, dimensions: list[str]) -> dict[str, float]:
        """Score a gap across dimensions."""
        scores = {}

        # Impact based on severity
        severity_impact = {
            Severity.CRITICAL: 0.95,
            Severity.HIGH: 0.80,
            Severity.MEDIUM: 0.55,
            Severity.LOW: 0.30,
        }
        scores["impact"] = severity_impact.get(gap.severity, 0.50)

        # Effort (inverse of confidence - less understood = more effort)
        scores["effort"] = 1.0 - (gap.confidence * 0.7)

        # Urgency based on severity
        severity_urgency = {
            Severity.CRITICAL: 0.95,
            Severity.HIGH: 0.75,
            Severity.MEDIUM: 0.50,
            Severity.LOW: 0.25,
        }
        scores["urgency"] = severity_urgency.get(gap.severity, 0.50)

        # Alignment (could be enhanced with VSOM integration)
        scores["alignment"] = gap.confidence * 0.8

        return {k: round(v, 3) for k, v in scores.items() if k in dimensions}

    def _score_opportunity(
        self, opp: OpportunityAssessment, dimensions: list[str]
    ) -> dict[str, float]:
        """Score an opportunity across dimensions."""
        scores = {}

        # Impact based on potential value
        if opp.potential_value:
            if "Significant" in (opp.potential_value.revenue_impact or ""):
                scores["impact"] = 0.90
            elif "Moderate" in (opp.potential_value.revenue_impact or ""):
                scores["impact"] = 0.70
            else:
                scores["impact"] = 0.50
        else:
            scores["impact"] = 0.50

        # Effort (inverse of feasibility)
        scores["effort"] = 1.0 - opp.feasibility

        # Urgency based on time to value
        time_urgency = {
            "1-3 months": 0.90,
            "3-6 months": 0.70,
            "6-12 months": 0.45,
            "12+ months": 0.25,
        }
        scores["urgency"] = time_urgency.get(opp.time_to_value or "6-12 months", 0.50)

        # Alignment based on feasibility
        scores["alignment"] = opp.feasibility

        return {k: round(v, 3) for k, v in scores.items() if k in dimensions}

    def _calculate_composite(
        self, scores: dict[str, float], weights: dict[str, float]
    ) -> float:
        """Calculate weighted composite score."""
        total = 0.0
        for dimension, score in scores.items():
            weight = weights.get(dimension, 0.25)
            total += score * weight
        return total

    def _generate_rationale(self, scores: dict[str, float], item_type: str) -> str:
        """Generate rationale for the ranking."""
        parts = []

        if scores.get("impact", 0) >= 0.7:
            parts.append("High impact")
        elif scores.get("impact", 0) >= 0.5:
            parts.append("Moderate impact")
        else:
            parts.append("Lower impact")

        if scores.get("effort", 0) <= 0.4:
            parts.append("low effort")
        elif scores.get("effort", 0) <= 0.6:
            parts.append("moderate effort")
        else:
            parts.append("high effort")

        if scores.get("urgency", 0) >= 0.7:
            parts.append("urgent")

        if scores.get("alignment", 0) >= 0.7:
            parts.append("strategically aligned")

        return f"{item_type.title()}: {', '.join(parts)}"

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Define extension points."""
        return [
            ExtensionPoint(
                name="customDimensions",
                type="config",
                description="Custom scoring dimensions",
            ),
            ExtensionPoint(
                name="scoringFunction",
                type="function",
                description="Custom scoring function",
            ),
            ExtensionPoint(
                name="quadrantThresholds",
                type="config",
                description="Custom thresholds for quadrant assignment",
            ),
        ]

    def _get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for skill input."""
        return {
            "type": "object",
            "properties": {
                "gaps": {
                    "type": "array",
                    "items": {"type": "object"},
                    "description": "List of identified gaps to prioritize",
                },
                "opportunities": {
                    "type": "array",
                    "items": {"type": "object"},
                    "description": "List of opportunities to prioritize",
                },
                "dimensions": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Dimensions to score on",
                },
                "weights": {
                    "type": "object",
                    "additionalProperties": {"type": "number"},
                    "description": "Weights for each dimension",
                },
            },
        }
