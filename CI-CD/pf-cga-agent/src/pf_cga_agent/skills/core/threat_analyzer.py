"""Threat Analyzer Skill.

Assesses competitive threats from identified gaps using configurable
threat categories and impact calculations.
"""

from dataclasses import dataclass
from typing import Any
from uuid import UUID, uuid4

import structlog

from pf_cga_agent.config.schemas import (
    IdentifiedGap,
    MitigationOption,
    Severity,
    ThreatAssessment,
    ThreatType,
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
class ThreatInput:
    """Input for threat analysis."""

    gaps: list[IdentifiedGap]
    competitors: list[dict[str, Any]] | None = None
    market_context: dict[str, Any] | None = None
    threat_categories: list[str] | None = None


class ThreatAnalyzerSkill(BaseSkill[ThreatInput, list[ThreatAssessment]]):
    """Skill for analyzing competitive threats from identified gaps.

    Transforms gaps into threat assessments with probability, impact,
    and mitigation options.
    """

    # Default threat categories
    DEFAULT_CATEGORIES = ["competitive", "market", "capability", "technology"]

    # Default mitigation templates
    DEFAULT_MITIGATIONS = {
        "competitive": [
            ("Differentiation strategy", Severity.MEDIUM, 0.75),
            ("Market positioning adjustment", Severity.HIGH, 0.70),
            ("Partnership development", Severity.HIGH, 0.65),
        ],
        "market": [
            ("Market research expansion", Severity.LOW, 0.80),
            ("Customer feedback integration", Severity.MEDIUM, 0.75),
            ("Trend monitoring system", Severity.LOW, 0.70),
        ],
        "capability": [
            ("Skills development program", Severity.HIGH, 0.70),
            ("Technology investment", Severity.HIGH, 0.75),
            ("Strategic hiring", Severity.MEDIUM, 0.65),
        ],
        "technology": [
            ("Technology modernization", Severity.HIGH, 0.80),
            ("R&D investment increase", Severity.HIGH, 0.75),
            ("Technology partnership", Severity.MEDIUM, 0.70),
        ],
    }

    @property
    def id(self) -> str:
        return "cga:threat-analyzer"

    @property
    def name(self) -> str:
        return "Threat Analyzer"

    @property
    def description(self) -> str:
        return (
            "Analyzes competitive threats from identified gaps. Calculates threat "
            "probability and impact, generates risk scores, and provides mitigation "
            "options tailored to threat type."
        )

    def validate(self, input_data: ThreatInput) -> ValidationResult:
        """Validate threat analysis input."""
        errors = []
        warnings = []

        if not input_data.gaps:
            errors.append("At least one gap required for threat analysis")

        if not input_data.competitors and not input_data.market_context:
            warnings.append("No competitor or market context provided - analysis may be limited")

        return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)

    async def execute(self, input_data: ThreatInput) -> SkillResult[list[ThreatAssessment]]:
        """Execute threat analysis on identified gaps."""
        try:
            threat_categories = input_data.threat_categories or self.DEFAULT_CATEGORIES
            custom_categories = self.get_extension("threatCategories", [])
            if custom_categories:
                threat_categories = custom_categories

            threats: list[ThreatAssessment] = []

            for gap in input_data.gaps:
                # Determine threat type based on gap type
                threat_type = self._classify_threat_type(gap, threat_categories)

                # Calculate probability based on gap severity and confidence
                probability = self._calculate_probability(gap, input_data.competitors)

                # Calculate impact
                impact = self._calculate_impact(gap, input_data.market_context)

                # Generate mitigation options
                mitigations = self._generate_mitigations(threat_type, gap.severity)

                threat = ThreatAssessment(
                    threat_id=uuid4(),
                    related_gaps=[gap.gap_id] if isinstance(gap.gap_id, UUID) else [UUID(str(gap.gap_id))],
                    threat_type=threat_type,
                    title=f"Threat: {gap.title}",
                    description=self._generate_threat_description(gap, threat_type),
                    probability=probability,
                    impact=impact,
                    mitigation_options=mitigations,
                )
                threats.append(threat)

            # Sort by risk score (probability * impact)
            threats.sort(key=lambda t: t.risk_score, reverse=True)

            return SkillResult(
                status=SkillStatus.SUCCESS,
                data=threats,
                confidence=0.80,
                metadata={
                    "threats_identified": len(threats),
                    "critical_threats": len([t for t in threats if t.risk_score > 0.7]),
                    "high_threats": len([t for t in threats if 0.5 <= t.risk_score <= 0.7]),
                },
            )

        except Exception as e:
            logger.exception("Threat analysis failed", error=str(e))
            return SkillResult(
                status=SkillStatus.FAILED,
                error=f"Failed to analyze threats: {str(e)}",
            )

    def _classify_threat_type(
        self, gap: IdentifiedGap, categories: list[str]
    ) -> ThreatType:
        """Classify the threat type based on gap characteristics."""
        gap_type_lower = gap.gap_type.value.lower()

        if "competitive" in gap_type_lower or "competitor" in gap.description.lower():
            return ThreatType.COMPETITIVE
        elif "capability" in gap_type_lower or "skill" in gap.description.lower():
            return ThreatType.CAPABILITY
        elif "technology" in gap.description.lower() or "tech" in gap.description.lower():
            return ThreatType.TECHNOLOGY
        else:
            return ThreatType.MARKET

    def _calculate_probability(
        self, gap: IdentifiedGap, competitors: list[dict[str, Any]] | None
    ) -> float:
        """Calculate threat probability."""
        # Base probability from gap severity
        severity_probs = {
            Severity.CRITICAL: 0.90,
            Severity.HIGH: 0.75,
            Severity.MEDIUM: 0.50,
            Severity.LOW: 0.25,
        }
        base_prob = severity_probs.get(gap.severity, 0.50)

        # Adjust based on gap confidence
        adjusted = base_prob * gap.confidence

        # Increase if competitors are active
        if competitors and len(competitors) > 0:
            adjusted = min(adjusted * 1.1, 1.0)

        # Apply custom formula if provided
        custom_formula = self.get_extension("impactCalculation")
        if custom_formula and callable(custom_formula):
            adjusted = custom_formula(gap, competitors)

        return round(adjusted, 2)

    def _calculate_impact(
        self, gap: IdentifiedGap, market_context: dict[str, Any] | None
    ) -> float:
        """Calculate threat impact."""
        severity_impacts = {
            Severity.CRITICAL: 0.95,
            Severity.HIGH: 0.80,
            Severity.MEDIUM: 0.55,
            Severity.LOW: 0.30,
        }
        base_impact = severity_impacts.get(gap.severity, 0.50)

        # Adjust based on affected entities
        if len(gap.affected_entities) > 3:
            base_impact = min(base_impact * 1.15, 1.0)

        # Consider business impact if available
        if gap.business_impact:
            if gap.business_impact.revenue_risk == Severity.CRITICAL:
                base_impact = min(base_impact * 1.2, 1.0)
            if gap.business_impact.competitive_risk == Severity.CRITICAL:
                base_impact = min(base_impact * 1.15, 1.0)

        return round(base_impact, 2)

    def _generate_mitigations(
        self, threat_type: ThreatType, severity: Severity
    ) -> list[MitigationOption]:
        """Generate mitigation options for the threat."""
        # Get custom mitigation templates if provided
        custom_templates = self.get_extension("mitigationTemplates", {})
        templates = custom_templates if custom_templates else self.DEFAULT_MITIGATIONS

        type_key = threat_type.value.lower()
        options_data = templates.get(type_key, templates.get("competitive", []))

        mitigations = []
        for option_text, effort, effectiveness in options_data:
            # Adjust effectiveness based on severity
            if severity == Severity.CRITICAL:
                effectiveness = min(effectiveness * 0.85, 1.0)
            elif severity == Severity.HIGH:
                effectiveness = min(effectiveness * 0.95, 1.0)

            mitigations.append(
                MitigationOption(
                    option=option_text,
                    effort=effort,
                    effectiveness=round(effectiveness, 2),
                )
            )

        return mitigations

    def _generate_threat_description(
        self, gap: IdentifiedGap, threat_type: ThreatType
    ) -> str:
        """Generate a description for the threat."""
        type_descriptions = {
            ThreatType.COMPETITIVE: "competitive disadvantage",
            ThreatType.MARKET: "market position erosion",
            ThreatType.CAPABILITY: "capability shortfall",
            ThreatType.TECHNOLOGY: "technology obsolescence",
        }
        type_desc = type_descriptions.get(threat_type, "strategic risk")

        return (
            f"The gap '{gap.title}' presents a {type_desc} threat. "
            f"{gap.description} This requires attention based on "
            f"{gap.severity.value} severity and {gap.confidence:.0%} confidence."
        )

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Define extension points for threat analyzer."""
        return [
            ExtensionPoint(
                name="threatCategories",
                type="config",
                description="Domain-specific threat category definitions",
            ),
            ExtensionPoint(
                name="impactCalculation",
                type="function",
                description="Custom impact calculation formula",
            ),
            ExtensionPoint(
                name="mitigationTemplates",
                type="config",
                description="Domain-specific mitigation response patterns",
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
                    "minItems": 1,
                    "description": "List of identified gaps to analyze",
                },
                "competitors": {
                    "type": "array",
                    "items": {"type": "object"},
                    "description": "Optional competitor data for context",
                },
                "market_context": {
                    "type": "object",
                    "description": "Optional market context data",
                },
                "threat_categories": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Custom threat categories to use",
                },
            },
            "required": ["gaps"],
        }
