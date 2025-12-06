"""Opportunity Identifier Skill.

Transforms identified gaps into actionable opportunities with value
assessment and feasibility scoring.
"""

from dataclasses import dataclass
from typing import Any
from uuid import UUID, uuid4

import structlog

from pf_cga_agent.config.schemas import (
    IdentifiedGap,
    OpportunityAssessment,
    OpportunityType,
    PotentialValue,
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
class OpportunityInput:
    """Input for opportunity identification."""

    gaps: list[IdentifiedGap]
    market_context: dict[str, Any] | None = None
    capabilities: list[str] | None = None
    strategic_priorities: list[str] | None = None
    bridge_concepts: list[str] | None = None


class OpportunityIdentifierSkill(BaseSkill[OpportunityInput, list[OpportunityAssessment]]):
    """Skill for transforming gaps into actionable opportunities.

    Analyzes gaps to identify potential value creation opportunities,
    assesses feasibility, and maps required capabilities.
    """

    @property
    def id(self) -> str:
        return "cga:opportunity-identifier"

    @property
    def name(self) -> str:
        return "Opportunity Identifier"

    @property
    def description(self) -> str:
        return (
            "Transforms identified gaps into actionable opportunities. Assesses "
            "potential value, feasibility, time-to-value, and required capabilities "
            "to capture each opportunity."
        )

    def validate(self, input_data: OpportunityInput) -> ValidationResult:
        """Validate opportunity identification input."""
        errors = []
        warnings = []

        if not input_data.gaps:
            errors.append("At least one gap required for opportunity identification")

        if not input_data.market_context:
            warnings.append("No market context provided - value estimates may be limited")

        return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)

    async def execute(
        self, input_data: OpportunityInput
    ) -> SkillResult[list[OpportunityAssessment]]:
        """Execute opportunity identification on identified gaps."""
        try:
            opportunities: list[OpportunityAssessment] = []

            for gap in input_data.gaps:
                # Determine opportunity type
                opp_type = self._classify_opportunity_type(gap)

                # Assess potential value
                potential_value = self._assess_value(gap, input_data.market_context)

                # Calculate feasibility
                feasibility = self._calculate_feasibility(gap, input_data.capabilities)

                # Estimate time to value
                time_to_value = self._estimate_time_to_value(gap, feasibility)

                # Identify required capabilities
                required_caps = self._identify_required_capabilities(
                    gap, input_data.capabilities or []
                )

                # Use provided bridge concepts or generate suggestions
                bridges = input_data.bridge_concepts or self._suggest_bridges(gap)

                opportunity = OpportunityAssessment(
                    opportunity_id=uuid4(),
                    related_gaps=[gap.gap_id] if isinstance(gap.gap_id, UUID) else [UUID(str(gap.gap_id))],
                    opportunity_type=opp_type,
                    title=self._generate_opportunity_title(gap, opp_type),
                    description=self._generate_opportunity_description(gap, opp_type),
                    potential_value=potential_value,
                    feasibility=feasibility,
                    time_to_value=time_to_value,
                    required_capabilities=required_caps,
                    bridge_concepts=bridges[:5],  # Limit to top 5
                )
                opportunities.append(opportunity)

            # Sort by feasibility-weighted value
            opportunities.sort(
                key=lambda o: o.feasibility * (1 if o.potential_value else 0.5),
                reverse=True,
            )

            return SkillResult(
                status=SkillStatus.SUCCESS,
                data=opportunities,
                confidence=0.80,
                metadata={
                    "opportunities_found": len(opportunities),
                    "high_feasibility": len([o for o in opportunities if o.feasibility > 0.7]),
                    "quick_wins": len(
                        [o for o in opportunities if o.feasibility > 0.7 and o.time_to_value == "1-3 months"]
                    ),
                },
            )

        except Exception as e:
            logger.exception("Opportunity identification failed", error=str(e))
            return SkillResult(
                status=SkillStatus.FAILED,
                error=f"Failed to identify opportunities: {str(e)}",
            )

    def _classify_opportunity_type(self, gap: IdentifiedGap) -> OpportunityType:
        """Classify opportunity type based on gap characteristics."""
        gap_type_lower = gap.gap_type.value.lower()
        desc_lower = gap.description.lower()

        if "content" in gap_type_lower or "content" in desc_lower:
            return OpportunityType.CONTENT
        elif "capability" in gap_type_lower or "skill" in desc_lower:
            return OpportunityType.CAPABILITY
        elif "partner" in desc_lower or "collaborat" in desc_lower:
            return OpportunityType.PARTNERSHIP
        else:
            return OpportunityType.MARKET

    def _assess_value(
        self, gap: IdentifiedGap, market_context: dict[str, Any] | None
    ) -> PotentialValue:
        """Assess potential value from addressing the gap."""
        # Base value assessment on severity
        revenue_impacts = {
            Severity.CRITICAL: "Significant revenue opportunity ($100K+)",
            Severity.HIGH: "Moderate revenue opportunity ($50K-$100K)",
            Severity.MEDIUM: "Small revenue opportunity ($10K-$50K)",
            Severity.LOW: "Incremental revenue opportunity (<$10K)",
        }

        market_gains = {
            Severity.CRITICAL: "5-10% market share gain potential",
            Severity.HIGH: "2-5% market share gain potential",
            Severity.MEDIUM: "1-2% market share gain potential",
            Severity.LOW: "<1% market share gain potential",
        }

        competitive_advantages = {
            Severity.CRITICAL: "Major competitive differentiation",
            Severity.HIGH: "Significant competitive advantage",
            Severity.MEDIUM: "Moderate competitive positioning improvement",
            Severity.LOW: "Minor competitive enhancement",
        }

        return PotentialValue(
            revenue_impact=revenue_impacts.get(gap.severity),
            market_share_gain=market_gains.get(gap.severity),
            competitive_advantage=competitive_advantages.get(gap.severity),
        )

    def _calculate_feasibility(
        self, gap: IdentifiedGap, capabilities: list[str] | None
    ) -> float:
        """Calculate feasibility score (0-1)."""
        # Start with base feasibility inversely related to severity
        severity_feasibility = {
            Severity.CRITICAL: 0.50,  # Harder to address
            Severity.HIGH: 0.60,
            Severity.MEDIUM: 0.75,
            Severity.LOW: 0.90,
        }
        base = severity_feasibility.get(gap.severity, 0.70)

        # Adjust based on confidence (higher confidence = better understood = more feasible)
        base = base * (0.7 + 0.3 * gap.confidence)

        # Boost if we have relevant capabilities
        if capabilities:
            capability_match = sum(
                1
                for cap in capabilities
                if cap.lower() in gap.description.lower()
                or any(cap.lower() in e.lower() for e in gap.affected_entities)
            )
            if capability_match > 0:
                base = min(base * 1.15, 1.0)

        return round(base, 2)

    def _estimate_time_to_value(self, gap: IdentifiedGap, feasibility: float) -> str:
        """Estimate time to realize value."""
        if feasibility > 0.8:
            return "1-3 months"
        elif feasibility > 0.6:
            return "3-6 months"
        elif feasibility > 0.4:
            return "6-12 months"
        else:
            return "12+ months"

    def _identify_required_capabilities(
        self, gap: IdentifiedGap, existing_capabilities: list[str]
    ) -> list[str]:
        """Identify capabilities required to capture the opportunity."""
        required = []

        # Infer from gap type
        if gap.gap_type.value == "content":
            required.extend(["Content Strategy", "Content Creation", "SEO"])
        elif gap.gap_type.value == "capability":
            required.extend(["Technical Development", "Training"])
        elif gap.gap_type.value == "competitive":
            required.extend(["Market Analysis", "Competitive Intelligence"])
        else:
            required.extend(["Strategic Planning", "Resource Allocation"])

        # Filter out existing capabilities
        existing_lower = [c.lower() for c in existing_capabilities]
        required = [r for r in required if r.lower() not in existing_lower]

        return required

    def _suggest_bridges(self, gap: IdentifiedGap) -> list[str]:
        """Suggest bridge concepts based on gap characteristics."""
        # Simple heuristic - in practice would use more sophisticated analysis
        bridges = []

        if "content" in gap.description.lower():
            bridges.extend(["thought leadership", "educational content", "case studies"])
        if "technology" in gap.description.lower():
            bridges.extend(["automation", "integration", "platform modernization"])
        if "market" in gap.description.lower():
            bridges.extend(["market expansion", "new segments", "partnerships"])

        return bridges if bridges else ["strategic initiative", "process improvement"]

    def _generate_opportunity_title(
        self, gap: IdentifiedGap, opp_type: OpportunityType
    ) -> str:
        """Generate opportunity title."""
        type_prefixes = {
            OpportunityType.MARKET: "Market Opportunity",
            OpportunityType.CAPABILITY: "Capability Enhancement",
            OpportunityType.CONTENT: "Content Opportunity",
            OpportunityType.PARTNERSHIP: "Partnership Opportunity",
        }
        prefix = type_prefixes.get(opp_type, "Strategic Opportunity")
        return f"{prefix}: {gap.title.replace('Gap:', '').strip()}"

    def _generate_opportunity_description(
        self, gap: IdentifiedGap, opp_type: OpportunityType
    ) -> str:
        """Generate opportunity description."""
        return (
            f"Addressing the identified gap presents a {opp_type.value} opportunity. "
            f"Original gap: {gap.description} "
            f"By closing this gap, the organization can capture value and strengthen "
            f"its position in the affected areas."
        )

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Define extension points."""
        return [
            ExtensionPoint(
                name="valueCalculator",
                type="function",
                description="Custom value assessment function",
            ),
            ExtensionPoint(
                name="feasibilityFactors",
                type="config",
                description="Domain-specific feasibility factors",
            ),
            ExtensionPoint(
                name="opportunityTemplates",
                type="config",
                description="Templates for opportunity descriptions",
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
                    "description": "List of identified gaps",
                },
                "market_context": {
                    "type": "object",
                    "description": "Market context for value assessment",
                },
                "capabilities": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Existing organizational capabilities",
                },
                "strategic_priorities": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Strategic priorities to align with",
                },
                "bridge_concepts": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Pre-identified bridge concepts",
                },
            },
            "required": ["gaps"],
        }
