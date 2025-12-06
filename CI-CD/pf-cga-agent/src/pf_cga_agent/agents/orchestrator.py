"""CGA Orchestrator Agent.

Main agent that orchestrates gap analysis workflows by coordinating
specialized skills to identify, analyze, prioritize, and transform
gaps into actionable strategic recommendations.
"""

import json
from datetime import datetime
from typing import Any, Callable
from uuid import UUID, uuid4

import structlog
from anthropic import Anthropic

from pf_cga_agent.config.schemas import (
    AnalysisRequest,
    AnalysisStatus,
    AnalysisType,
    ExecutiveSummary,
    GapAnalysisReport,
    IdentifiedGap,
    OpportunityAssessment,
    Recommendation,
    Severity,
    ThreatAssessment,
)
from pf_cga_agent.config.settings import Settings
from pf_cga_agent.skills.base import SkillRegistry, SkillResult
from pf_cga_agent.skills.core.structural_hole_detector import (
    GraphInput,
    StructuralHoleDetectorSkill,
)
from pf_cga_agent.skills.core.threat_analyzer import ThreatAnalyzerSkill, ThreatInput
from pf_cga_agent.skills.core.opportunity_identifier import (
    OpportunityIdentifierSkill,
    OpportunityInput,
)
from pf_cga_agent.skills.core.bridge_concept_finder import (
    BridgeConceptFinderSkill,
    BridgeInput,
)
from pf_cga_agent.skills.core.priority_matrix_builder import (
    PriorityMatrixBuilderSkill,
    PriorityInput,
)

logger = structlog.get_logger()


class CGAOrchestrator:
    """Comparative Gap Analysis Orchestrator Agent.

    Coordinates gap analysis workflows by:
    1. Loading strategic and domain context
    2. Building knowledge graphs from input entities
    3. Running analysis skills in parallel where possible
    4. Generating prioritized recommendations
    5. Producing comprehensive reports
    """

    SYSTEM_PROMPT = """You are the Comparative Gap Analysis (CGA) Orchestrator Agent.

Your role is to orchestrate gap analysis workflows by coordinating specialized
analysis skills to identify strategic gaps, assess threats and opportunities,
and generate actionable recommendations.

## Core Capabilities

You have access to the following analysis skills:
1. **Structural Hole Detector**: Identifies disconnected clusters in knowledge graphs
2. **Threat Analyzer**: Assesses competitive threats from gaps
3. **Opportunity Identifier**: Transforms gaps into opportunities
4. **Bridge Concept Finder**: Finds connecting concepts between clusters
5. **Priority Matrix Builder**: Builds impact/effort prioritization matrices
6. **Comparative Scorer**: Scores entities across dimensions

## Analysis Workflow

When analyzing gaps, follow this workflow:
1. Validate the analysis request and load context
2. Build a knowledge graph from target entities
3. Detect structural holes and gaps
4. Analyze threats from identified gaps
5. Identify opportunities from gaps
6. Find bridge concepts that could close gaps
7. Build priority matrix for all findings
8. Generate strategic recommendations
9. Compile comprehensive report

## Guidelines

- Always explain your reasoning when making decisions
- Flag low-confidence findings for human review
- Ensure recommendations link back to specific gaps
- Maintain strategic alignment with provided objectives
- Be specific and actionable in recommendations

## Output Format

Provide structured JSON responses for analysis results.
Use natural language for explanations and rationale.
"""

    def __init__(
        self,
        settings: Settings,
        skill_registry: SkillRegistry | None = None,
        progress_callback: Callable[[str, float], None] | None = None,
    ):
        """Initialize the CGA Orchestrator.

        Args:
            settings: Application settings
            skill_registry: Optional pre-configured skill registry
            progress_callback: Optional callback for progress updates (message, percentage)
        """
        self._settings = settings
        self._client = Anthropic(api_key=settings.anthropic_api_key.get_secret_value())
        self._progress_callback = progress_callback or (lambda msg, pct: None)
        self._logger = structlog.get_logger().bind(agent="cga_orchestrator")

        # Initialize skill registry
        if skill_registry:
            self._skills = skill_registry
        else:
            self._skills = SkillRegistry()
            self._skills.register(StructuralHoleDetectorSkill())
            self._skills.register(ThreatAnalyzerSkill())
            self._skills.register(OpportunityIdentifierSkill())
            self._skills.register(BridgeConceptFinderSkill())
            self._skills.register(PriorityMatrixBuilderSkill())

        # Conversation history
        self._messages: list[dict[str, Any]] = []

    def _report_progress(self, message: str, percentage: float) -> None:
        """Report progress through callback."""
        self._progress_callback(message, percentage)
        self._logger.info("Analysis progress", message=message, percentage=percentage)

    async def analyze(self, request: AnalysisRequest) -> GapAnalysisReport:
        """Execute a complete gap analysis.

        Args:
            request: The analysis request with entities and parameters

        Returns:
            Complete gap analysis report
        """
        session_id = request.session_id
        self._logger.info("Starting gap analysis", session_id=str(session_id))

        try:
            self._report_progress("Initializing analysis...", 0.0)

            # Step 1: Build knowledge graph from entities
            self._report_progress("Building knowledge graph...", 0.10)
            graph_input = self._build_graph_from_entities(request)

            # Step 2: Detect structural holes
            self._report_progress("Detecting structural gaps...", 0.20)
            structural_skill: StructuralHoleDetectorSkill = self._skills.get(
                "cga:structural-hole-detector"
            )
            structural_result = await structural_skill.execute(graph_input)

            identified_gaps: list[IdentifiedGap] = []
            if structural_result.is_success and structural_result.data:
                identified_gaps = structural_skill.to_identified_gaps(structural_result.data)

            # Step 3: Analyze threats
            self._report_progress("Analyzing threats...", 0.35)
            threat_skill: ThreatAnalyzerSkill = self._skills.get("cga:threat-analyzer")
            threat_input = ThreatInput(
                gaps=identified_gaps,
                competitors=[c.model_dump() for c in request.competitors],
            )
            threat_result = await threat_skill.execute(threat_input)
            threats: list[ThreatAssessment] = threat_result.data or []

            # Step 4: Identify opportunities
            self._report_progress("Identifying opportunities...", 0.50)
            opp_skill: OpportunityIdentifierSkill = self._skills.get(
                "cga:opportunity-identifier"
            )
            opp_input = OpportunityInput(
                gaps=identified_gaps,
                strategic_priorities=request.strategic_objectives,
            )
            opp_result = await opp_skill.execute(opp_input)
            opportunities: list[OpportunityAssessment] = opp_result.data or []

            # Step 5: Find bridge concepts
            self._report_progress("Finding bridge concepts...", 0.65)
            bridge_skill: BridgeConceptFinderSkill = self._skills.get(
                "cga:bridge-concept-finder"
            )
            bridge_input = BridgeInput(
                nodes=graph_input.nodes,
                edges=graph_input.edges,
            )
            bridge_result = await bridge_skill.execute(bridge_input)

            # Add bridge concepts to opportunities
            if bridge_result.is_success and bridge_result.data:
                bridge_concepts = [b.concept for b in bridge_result.data]
                for opp in opportunities:
                    opp.bridge_concepts.extend(bridge_concepts[:3])

            # Step 6: Build priority matrix
            self._report_progress("Building priority matrix...", 0.80)
            priority_skill: PriorityMatrixBuilderSkill = self._skills.get(
                "cga:priority-matrix-builder"
            )
            priority_input = PriorityInput(
                gaps=identified_gaps,
                opportunities=opportunities,
                weights={
                    "impact": request.weight_impact,
                    "effort": request.weight_effort,
                    "urgency": request.weight_urgency,
                    "alignment": request.weight_alignment,
                },
            )
            priority_result = await priority_skill.execute(priority_input)

            # Step 7: Generate recommendations
            self._report_progress("Generating recommendations...", 0.90)
            recommendations = await self._generate_recommendations(
                gaps=identified_gaps,
                threats=threats,
                opportunities=opportunities,
                priority_matrix=priority_result.data,
            )

            # Step 8: Create executive summary
            self._report_progress("Creating executive summary...", 0.95)
            executive_summary = self._create_executive_summary(
                gaps=identified_gaps,
                threats=threats,
                opportunities=opportunities,
                recommendations=recommendations,
            )

            # Compile report
            report = GapAnalysisReport(
                report_id=uuid4(),
                session_id=session_id,
                analysis_type=request.analysis_type,
                domain_instance=request.domain_type,
                date_created=datetime.utcnow(),
                status=AnalysisStatus.COMPLETED,
                aligned_objectives=request.strategic_objectives,
                linked_okrs=request.linked_okrs,
                entity_count=len(request.target_entities),
                relationship_count=len(graph_input.edges),
                timeframe=request.timeframe,
                comparators=[c.name for c in request.competitors],
                identified_gaps=identified_gaps,
                threats=threats,
                opportunities=opportunities,
                priority_matrix=priority_result.data,
                recommendations=recommendations,
                executive_summary=executive_summary,
            )

            self._report_progress("Analysis complete!", 1.0)
            self._logger.info(
                "Gap analysis completed",
                session_id=str(session_id),
                gaps_found=len(identified_gaps),
                threats=len(threats),
                opportunities=len(opportunities),
            )

            return report

        except Exception as e:
            self._logger.exception("Gap analysis failed", error=str(e))
            raise

    def _build_graph_from_entities(self, request: AnalysisRequest) -> GraphInput:
        """Build a graph structure from analysis request entities."""
        nodes = []
        edges = []

        for entity in request.target_entities:
            nodes.append({
                "id": entity.id,
                "label": entity.name,
                "type": entity.type,
                **entity.attributes,
            })

        # Create edges based on entity relationships
        # For MVP, create edges between entities of similar types
        entity_by_type: dict[str, list[str]] = {}
        for entity in request.target_entities:
            if entity.type not in entity_by_type:
                entity_by_type[entity.type] = []
            entity_by_type[entity.type].append(entity.id)

        # Connect entities within same type
        for entity_type, entity_ids in entity_by_type.items():
            for i, source_id in enumerate(entity_ids):
                for target_id in entity_ids[i + 1 :]:
                    edges.append({
                        "source": source_id,
                        "target": target_id,
                        "weight": 0.5,
                        "type": f"same_{entity_type}",
                    })

        # Add competitor edges
        for competitor in request.competitors:
            nodes.append({
                "id": competitor.id,
                "label": competitor.name,
                "type": "competitor",
            })
            # Connect competitor to a few target entities
            for entity in request.target_entities[:3]:
                edges.append({
                    "source": competitor.id,
                    "target": entity.id,
                    "weight": 0.3,
                    "type": "competes_with",
                })

        return GraphInput(nodes=nodes, edges=edges)

    async def _generate_recommendations(
        self,
        gaps: list[IdentifiedGap],
        threats: list[ThreatAssessment],
        opportunities: list[OpportunityAssessment],
        priority_matrix: Any,
    ) -> list[Recommendation]:
        """Generate strategic recommendations using Claude."""
        # Prepare context for Claude
        context = {
            "gaps": [g.model_dump(mode="json") for g in gaps[:10]],
            "threats": [t.model_dump(mode="json") for t in threats[:5]],
            "opportunities": [o.model_dump(mode="json") for o in opportunities[:5]],
            "priority_matrix": priority_matrix.model_dump(mode="json") if priority_matrix else None,
        }

        prompt = f"""Based on the following gap analysis results, generate 3-5 strategic recommendations.

## Analysis Results

{json.dumps(context, indent=2, default=str)}

## Instructions

For each recommendation:
1. Link to specific gaps, threats, or opportunities it addresses
2. Provide clear implementation phases
3. Estimate effort and expected outcomes
4. Ensure strategic alignment

Return as a JSON array of recommendations with this structure:
{{
  "title": "Recommendation title",
  "description": "Detailed description",
  "action_type": "content|capability|process|partnership",
  "priority": "critical|high|medium|low",
  "addresses_gaps": ["gap-id-1"],
  "addresses_threats": ["threat-id-1"],
  "enables_opportunities": ["opp-id-1"],
  "implementation_phases": [
    {{"phase": 1, "name": "Phase name", "deliverables": ["item"], "estimated_effort": "2 weeks"}}
  ],
  "expected_outcome": {{"value_created": "description", "gaps_closed": []}}
}}
"""

        try:
            response = self._client.messages.create(
                model=self._settings.claude_model,
                max_tokens=4096,
                messages=[{"role": "user", "content": prompt}],
            )

            # Parse response
            content = response.content[0].text
            # Extract JSON from response
            import re
            json_match = re.search(r"\[[\s\S]*\]", content)
            if json_match:
                recommendations_data = json.loads(json_match.group())
                return [
                    Recommendation(
                        recommendation_id=uuid4(),
                        title=r.get("title", "Recommendation"),
                        description=r.get("description", ""),
                        action_type=r.get("action_type", "process"),
                        priority=Severity(r.get("priority", "medium")),
                        addresses_gaps=[],  # Would need to resolve UUIDs
                        addresses_threats=[],
                        enables_opportunities=[],
                        implementation_phases=[],
                        expected_outcome=None,
                    )
                    for r in recommendations_data[:5]
                ]
        except Exception as e:
            self._logger.warning("Failed to generate recommendations via Claude", error=str(e))

        # Fallback: generate basic recommendations from gaps
        return self._generate_fallback_recommendations(gaps, opportunities)

    def _generate_fallback_recommendations(
        self,
        gaps: list[IdentifiedGap],
        opportunities: list[OpportunityAssessment],
    ) -> list[Recommendation]:
        """Generate fallback recommendations without Claude."""
        recommendations = []

        # Create recommendation for top gaps
        for gap in gaps[:3]:
            rec = Recommendation(
                recommendation_id=uuid4(),
                title=f"Address: {gap.title}",
                description=f"Develop strategy to close the identified gap: {gap.description}",
                action_type="process",
                priority=gap.severity,
                addresses_gaps=[gap.gap_id] if isinstance(gap.gap_id, UUID) else [],
            )
            recommendations.append(rec)

        # Create recommendation for top opportunities
        for opp in opportunities[:2]:
            rec = Recommendation(
                recommendation_id=uuid4(),
                title=f"Pursue: {opp.title}",
                description=f"Capture the identified opportunity: {opp.description}",
                action_type=opp.opportunity_type.value,
                priority=Severity.HIGH if opp.feasibility > 0.7 else Severity.MEDIUM,
                enables_opportunities=[opp.opportunity_id] if isinstance(opp.opportunity_id, UUID) else [],
            )
            recommendations.append(rec)

        return recommendations

    def _create_executive_summary(
        self,
        gaps: list[IdentifiedGap],
        threats: list[ThreatAssessment],
        opportunities: list[OpportunityAssessment],
        recommendations: list[Recommendation],
    ) -> ExecutiveSummary:
        """Create executive summary of the analysis."""
        critical_gaps = len([g for g in gaps if g.severity == Severity.CRITICAL])
        high_opps = len([o for o in opportunities if o.feasibility > 0.7])

        key_findings = []
        if critical_gaps > 0:
            key_findings.append(f"Identified {critical_gaps} critical gaps requiring immediate attention")
        if threats:
            high_threats = len([t for t in threats if t.risk_score > 0.7])
            if high_threats > 0:
                key_findings.append(f"Detected {high_threats} high-risk threats")
        if high_opps > 0:
            key_findings.append(f"Found {high_opps} high-feasibility opportunities")

        next_steps = [
            "Review and prioritize critical gaps",
            "Develop mitigation plans for high-risk threats",
            "Pursue quick-win opportunities",
        ]

        if recommendations:
            next_steps.append(f"Implement top recommendation: {recommendations[0].title}")

        return ExecutiveSummary(
            key_findings=key_findings,
            critical_gaps_count=critical_gaps,
            high_priority_opportunities=high_opps,
            recommended_next_steps=next_steps,
        )

    async def chat(self, message: str) -> str:
        """Handle a conversational message.

        Args:
            message: User message

        Returns:
            Agent response
        """
        self._messages.append({"role": "user", "content": message})

        response = self._client.messages.create(
            model=self._settings.claude_model,
            max_tokens=self._settings.max_tokens,
            system=self.SYSTEM_PROMPT,
            messages=self._messages,
        )

        assistant_message = response.content[0].text
        self._messages.append({"role": "assistant", "content": assistant_message})

        return assistant_message

    def clear_history(self) -> None:
        """Clear conversation history."""
        self._messages = []
