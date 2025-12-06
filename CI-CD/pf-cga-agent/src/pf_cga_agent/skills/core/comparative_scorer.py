"""Comparative Scorer Skill.

Scores entities across configurable dimensions for comparative analysis.
"""

from dataclasses import dataclass
from typing import Any

import structlog

from pf_cga_agent.skills.base import (
    BaseSkill,
    ExtensionPoint,
    SkillResult,
    SkillStatus,
    ValidationResult,
)

logger = structlog.get_logger()


@dataclass
class ScoredEntity:
    """An entity with comparative scores."""

    entity_id: str
    entity_name: str
    scores: dict[str, float]
    composite_score: float
    rank: int
    strengths: list[str]
    weaknesses: list[str]


@dataclass
class ComparativeInput:
    """Input for comparative scoring."""

    entities: list[dict[str, Any]]
    dimensions: list[str] | None = None
    weights: dict[str, float] | None = None
    reference_entity: str | None = None


class ComparativeScorerSkill(BaseSkill[ComparativeInput, list[ScoredEntity]]):
    """Skill for comparative scoring of entities.

    Scores multiple entities across configurable dimensions and produces
    a ranked comparison with identified strengths and weaknesses.
    """

    DEFAULT_DIMENSIONS = [
        "visibility",
        "coverage",
        "quality",
        "engagement",
        "authority",
    ]

    @property
    def id(self) -> str:
        return "cga:comparative-scorer"

    @property
    def name(self) -> str:
        return "Comparative Scorer"

    @property
    def description(self) -> str:
        return (
            "Scores entities across configurable dimensions for comparative analysis. "
            "Produces ranked comparisons with identified strengths and weaknesses "
            "relative to peers or a reference entity."
        )

    def validate(self, input_data: ComparativeInput) -> ValidationResult:
        """Validate comparative scoring input."""
        errors = []
        warnings = []

        if len(input_data.entities) < 2:
            errors.append("At least 2 entities required for comparative analysis")

        if input_data.reference_entity:
            entity_ids = [e.get("id") for e in input_data.entities]
            if input_data.reference_entity not in entity_ids:
                warnings.append(
                    f"Reference entity '{input_data.reference_entity}' not in entity list"
                )

        return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)

    async def execute(self, input_data: ComparativeInput) -> SkillResult[list[ScoredEntity]]:
        """Execute comparative scoring."""
        try:
            dimensions = input_data.dimensions or self.DEFAULT_DIMENSIONS
            weights = input_data.weights or {d: 1.0 / len(dimensions) for d in dimensions}

            # Normalize weights
            total_weight = sum(weights.values())
            weights = {k: v / total_weight for k, v in weights.items()}

            # Score each entity
            scored_entities: list[ScoredEntity] = []

            for entity in input_data.entities:
                entity_id = entity.get("id", "unknown")
                entity_name = entity.get("name", entity_id)

                # Extract or calculate dimension scores
                scores = self._extract_scores(entity, dimensions)

                # Calculate composite score
                composite = sum(
                    scores.get(d, 0.5) * weights.get(d, 0.2) for d in dimensions
                )

                scored_entities.append(
                    ScoredEntity(
                        entity_id=entity_id,
                        entity_name=entity_name,
                        scores=scores,
                        composite_score=round(composite, 3),
                        rank=0,  # Will be set after sorting
                        strengths=[],  # Will be populated
                        weaknesses=[],  # Will be populated
                    )
                )

            # Sort and assign ranks
            scored_entities.sort(key=lambda e: e.composite_score, reverse=True)
            for rank, entity in enumerate(scored_entities, 1):
                entity.rank = rank

            # Calculate average scores for comparison
            avg_scores = {}
            for dim in dimensions:
                dim_scores = [e.scores.get(dim, 0.5) for e in scored_entities]
                avg_scores[dim] = sum(dim_scores) / len(dim_scores) if dim_scores else 0.5

            # Identify strengths and weaknesses
            for entity in scored_entities:
                for dim in dimensions:
                    score = entity.scores.get(dim, 0.5)
                    avg = avg_scores.get(dim, 0.5)

                    if score > avg * 1.15:
                        entity.strengths.append(
                            f"{dim.title()}: {score:.2f} (above avg {avg:.2f})"
                        )
                    elif score < avg * 0.85:
                        entity.weaknesses.append(
                            f"{dim.title()}: {score:.2f} (below avg {avg:.2f})"
                        )

            # If reference entity specified, adjust descriptions
            if input_data.reference_entity:
                ref_entity = next(
                    (e for e in scored_entities if e.entity_id == input_data.reference_entity),
                    None,
                )
                if ref_entity:
                    for entity in scored_entities:
                        if entity.entity_id != input_data.reference_entity:
                            entity.strengths = [
                                s
                                for s in entity.strengths
                                if self._compare_to_ref(
                                    entity.scores, ref_entity.scores, s.split(":")[0].lower()
                                )
                            ]

            return SkillResult(
                status=SkillStatus.SUCCESS,
                data=scored_entities,
                confidence=0.85,
                metadata={
                    "entities_scored": len(scored_entities),
                    "dimensions_used": dimensions,
                    "top_performer": scored_entities[0].entity_name if scored_entities else None,
                    "average_scores": avg_scores,
                },
            )

        except Exception as e:
            logger.exception("Comparative scoring failed", error=str(e))
            return SkillResult(
                status=SkillStatus.FAILED,
                error=f"Failed to perform comparative scoring: {str(e)}",
            )

    def _extract_scores(
        self, entity: dict[str, Any], dimensions: list[str]
    ) -> dict[str, float]:
        """Extract or calculate dimension scores from entity data."""
        scores = {}

        for dim in dimensions:
            # Try to get score directly from entity
            if dim in entity:
                score = entity[dim]
                if isinstance(score, (int, float)):
                    scores[dim] = min(max(float(score), 0.0), 1.0)
                    continue

            # Try to get from metrics sub-object
            if "metrics" in entity and dim in entity["metrics"]:
                score = entity["metrics"][dim]
                if isinstance(score, (int, float)):
                    scores[dim] = min(max(float(score), 0.0), 1.0)
                    continue

            # Try to get from attributes
            if "attributes" in entity and dim in entity["attributes"]:
                score = entity["attributes"][dim]
                if isinstance(score, (int, float)):
                    scores[dim] = min(max(float(score), 0.0), 1.0)
                    continue

            # Default score if not found
            scores[dim] = 0.5

        return scores

    def _compare_to_ref(
        self,
        entity_scores: dict[str, float],
        ref_scores: dict[str, float],
        dimension: str,
    ) -> bool:
        """Check if entity score is better than reference for dimension."""
        entity_score = entity_scores.get(dimension, 0.5)
        ref_score = ref_scores.get(dimension, 0.5)
        return entity_score > ref_score

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Define extension points."""
        return [
            ExtensionPoint(
                name="customDimensions",
                type="config",
                description="Custom scoring dimensions",
            ),
            ExtensionPoint(
                name="scoreExtractor",
                type="function",
                description="Custom function to extract scores from entities",
            ),
            ExtensionPoint(
                name="comparisonLogic",
                type="function",
                description="Custom comparison logic for strengths/weaknesses",
            ),
        ]

    def _get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for skill input."""
        return {
            "type": "object",
            "properties": {
                "entities": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "string"},
                            "name": {"type": "string"},
                        },
                        "required": ["id"],
                    },
                    "minItems": 2,
                    "description": "Entities to compare",
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
                "reference_entity": {
                    "type": "string",
                    "description": "Entity ID to use as reference for comparison",
                },
            },
            "required": ["entities"],
        }
