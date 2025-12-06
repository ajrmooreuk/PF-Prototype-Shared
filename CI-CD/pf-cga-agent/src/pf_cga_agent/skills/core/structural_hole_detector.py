"""Structural Hole Detector Skill.

Identifies disconnected clusters and structural gaps in knowledge graphs
using graph analysis techniques (NetworkX locally, InfraNodus when available).
"""

from dataclasses import dataclass
from typing import Any
from uuid import uuid4

import networkx as nx
import structlog

from pf_cga_agent.config.schemas import Evidence, GapType, IdentifiedGap, Severity
from pf_cga_agent.skills.base import (
    BaseSkill,
    ExtensionPoint,
    SkillResult,
    SkillStatus,
    ValidationResult,
)

logger = structlog.get_logger()


@dataclass
class GraphInput:
    """Input for structural hole detection."""

    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]
    threshold: float = 0.7
    min_cluster_size: int = 2


@dataclass
class StructuralHole:
    """A detected structural hole in the graph."""

    gap_id: str
    cluster_a: list[str]
    cluster_b: list[str]
    betweenness_score: float
    potential_bridges: list[str]
    severity: Severity
    description: str


class StructuralHoleDetectorSkill(BaseSkill[GraphInput, list[StructuralHole]]):
    """Skill for detecting structural holes in knowledge graphs.

    Structural holes are gaps between clusters of nodes that represent
    opportunities for connection or indicate missing knowledge.
    """

    @property
    def id(self) -> str:
        return "cga:structural-hole-detector"

    @property
    def name(self) -> str:
        return "Structural Hole Detector"

    @property
    def description(self) -> str:
        return (
            "Identifies disconnected clusters and structural gaps in knowledge graphs. "
            "Uses betweenness centrality and community detection to find holes that "
            "represent opportunities for bridging or indicate missing knowledge."
        )

    def validate(self, input_data: GraphInput) -> ValidationResult:
        """Validate graph input has minimum required nodes."""
        errors = []
        warnings = []

        if len(input_data.nodes) < 5:
            errors.append("Minimum 5 nodes required for structural hole analysis")

        if len(input_data.edges) < 3:
            warnings.append("Very few edges - results may be limited")

        if input_data.threshold < 0 or input_data.threshold > 1:
            errors.append("Threshold must be between 0 and 1")

        return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)

    async def execute(self, input_data: GraphInput) -> SkillResult[list[StructuralHole]]:
        """Execute structural hole detection using NetworkX."""
        try:
            # Build NetworkX graph
            G = nx.Graph()

            for node in input_data.nodes:
                G.add_node(node.get("id"), **{k: v for k, v in node.items() if k != "id"})

            for edge in input_data.edges:
                source = edge.get("source")
                target = edge.get("target")
                weight = edge.get("weight", 1.0)
                if source and target:
                    G.add_edge(source, target, weight=weight)

            # Calculate betweenness centrality
            betweenness = nx.betweenness_centrality(G)

            # Detect communities using Louvain (or greedy modularity for smaller graphs)
            if len(G.nodes) > 10:
                try:
                    communities = nx.community.louvain_communities(G)
                except Exception:
                    communities = list(nx.community.greedy_modularity_communities(G))
            else:
                communities = list(nx.community.greedy_modularity_communities(G))

            # Find structural holes between communities
            structural_holes: list[StructuralHole] = []

            community_list = [list(c) for c in communities]

            for i, cluster_a in enumerate(community_list):
                for j, cluster_b in enumerate(community_list):
                    if i >= j:
                        continue

                    # Check edge density between clusters
                    cross_edges = 0
                    possible_edges = len(cluster_a) * len(cluster_b)

                    for node_a in cluster_a:
                        for node_b in cluster_b:
                            if G.has_edge(node_a, node_b):
                                cross_edges += 1

                    density = cross_edges / possible_edges if possible_edges > 0 else 0

                    # Low density indicates a structural hole
                    if density < (1 - input_data.threshold):
                        # Find nodes that could bridge the gap
                        potential_bridges = []
                        for node in cluster_a + cluster_b:
                            if betweenness.get(node, 0) > 0.1:
                                potential_bridges.append(node)

                        # Calculate severity based on cluster sizes and isolation
                        total_size = len(cluster_a) + len(cluster_b)
                        if total_size >= 6 and density < 0.1:
                            severity = Severity.CRITICAL
                        elif total_size >= 4 and density < 0.2:
                            severity = Severity.HIGH
                        elif density < 0.3:
                            severity = Severity.MEDIUM
                        else:
                            severity = Severity.LOW

                        hole = StructuralHole(
                            gap_id=str(uuid4()),
                            cluster_a=cluster_a[:5],  # Limit for display
                            cluster_b=cluster_b[:5],
                            betweenness_score=1 - density,
                            potential_bridges=potential_bridges[:3],
                            severity=severity,
                            description=(
                                f"Structural gap between cluster containing "
                                f"{cluster_a[0] if cluster_a else 'unknown'} "
                                f"and cluster containing "
                                f"{cluster_b[0] if cluster_b else 'unknown'}. "
                                f"Only {cross_edges} connections exist between "
                                f"{len(cluster_a)} and {len(cluster_b)} nodes."
                            ),
                        )
                        structural_holes.append(hole)

            # Sort by severity and betweenness score
            structural_holes.sort(
                key=lambda h: (
                    {"critical": 0, "high": 1, "medium": 2, "low": 3}[h.severity.value],
                    -h.betweenness_score,
                )
            )

            return SkillResult(
                status=SkillStatus.SUCCESS,
                data=structural_holes,
                confidence=0.85 if len(G.nodes) >= 10 else 0.70,
                metadata={
                    "node_count": len(G.nodes),
                    "edge_count": len(G.edges),
                    "community_count": len(communities),
                    "holes_found": len(structural_holes),
                },
            )

        except Exception as e:
            logger.exception("Structural hole detection failed", error=str(e))
            return SkillResult(
                status=SkillStatus.FAILED,
                error=f"Failed to detect structural holes: {str(e)}",
            )

    def to_identified_gaps(self, holes: list[StructuralHole]) -> list[IdentifiedGap]:
        """Convert structural holes to IdentifiedGap format."""
        gaps = []
        for hole in holes:
            gap = IdentifiedGap(
                gap_id=hole.gap_id,
                gap_type=GapType.STRUCTURAL_HOLE,
                title=f"Structural Gap: {hole.cluster_a[0]} ↔ {hole.cluster_b[0]}"
                if hole.cluster_a and hole.cluster_b
                else "Structural Gap Detected",
                description=hole.description,
                severity=hole.severity,
                confidence=hole.betweenness_score,
                evidence=[
                    Evidence(
                        source="NetworkX",
                        metric="betweenness_score",
                        value=hole.betweenness_score,
                        description="Score indicating structural isolation",
                    )
                ],
                affected_entities=hole.cluster_a + hole.cluster_b,
            )
            gaps.append(gap)
        return gaps

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Define extension points for this skill."""
        return [
            ExtensionPoint(
                name="gap_classifier",
                type="function",
                description="Custom function to classify gap types",
            ),
            ExtensionPoint(
                name="severity_calculator",
                type="function",
                description="Custom severity calculation formula",
            ),
            ExtensionPoint(
                name="domain_filters",
                type="config",
                description="Domain-specific node/edge filters",
            ),
        ]

    def _get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for skill input."""
        return {
            "type": "object",
            "properties": {
                "nodes": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "string"},
                            "label": {"type": "string"},
                            "type": {"type": "string"},
                        },
                        "required": ["id"],
                    },
                    "minItems": 5,
                    "description": "Graph nodes with at least id property",
                },
                "edges": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "source": {"type": "string"},
                            "target": {"type": "string"},
                            "weight": {"type": "number"},
                        },
                        "required": ["source", "target"],
                    },
                    "description": "Graph edges connecting nodes",
                },
                "threshold": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 1,
                    "default": 0.7,
                    "description": "Threshold for detecting holes (0-1)",
                },
            },
            "required": ["nodes", "edges"],
        }
