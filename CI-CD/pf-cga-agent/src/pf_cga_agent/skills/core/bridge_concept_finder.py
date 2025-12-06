"""Bridge Concept Finder Skill.

Identifies concepts that could bridge disconnected areas in knowledge graphs.
"""

from dataclasses import dataclass
from typing import Any

import networkx as nx
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
class BridgeConcept:
    """A concept that could bridge disconnected areas."""

    concept: str
    source_cluster: list[str]
    target_cluster: list[str]
    bridge_strength: float
    related_nodes: list[str]
    description: str


@dataclass
class BridgeInput:
    """Input for bridge concept finding."""

    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]
    gap_locations: list[tuple[str, str]] | None = None
    max_bridges: int = 10


class BridgeConceptFinderSkill(BaseSkill[BridgeInput, list[BridgeConcept]]):
    """Skill for finding concepts that could bridge knowledge gaps.

    Analyzes graph structure to identify nodes or potential new nodes
    that could connect disconnected clusters.
    """

    @property
    def id(self) -> str:
        return "cga:bridge-concept-finder"

    @property
    def name(self) -> str:
        return "Bridge Concept Finder"

    @property
    def description(self) -> str:
        return (
            "Identifies concepts that could connect disconnected areas in "
            "knowledge graphs. Suggests existing nodes with bridging potential "
            "and recommends new concepts that could serve as bridges."
        )

    def validate(self, input_data: BridgeInput) -> ValidationResult:
        """Validate bridge finding input."""
        errors = []
        warnings = []

        if len(input_data.nodes) < 5:
            errors.append("Minimum 5 nodes required for bridge analysis")

        if len(input_data.edges) < 3:
            warnings.append("Few edges - bridge suggestions may be limited")

        return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)

    async def execute(self, input_data: BridgeInput) -> SkillResult[list[BridgeConcept]]:
        """Find bridge concepts in the graph."""
        try:
            # Build NetworkX graph
            G = nx.Graph()

            for node in input_data.nodes:
                G.add_node(
                    node.get("id"),
                    label=node.get("label", node.get("id")),
                    **{k: v for k, v in node.items() if k not in ("id", "label")},
                )

            for edge in input_data.edges:
                source = edge.get("source")
                target = edge.get("target")
                weight = edge.get("weight", 1.0)
                if source and target:
                    G.add_edge(source, target, weight=weight)

            # Find communities
            try:
                communities = list(nx.community.louvain_communities(G))
            except Exception:
                communities = list(nx.community.greedy_modularity_communities(G))

            # Calculate betweenness centrality
            betweenness = nx.betweenness_centrality(G)

            # Find existing bridge nodes (high betweenness between communities)
            bridges: list[BridgeConcept] = []

            # Identify nodes with high betweenness
            high_betweenness = sorted(
                betweenness.items(), key=lambda x: x[1], reverse=True
            )[:20]

            community_map = {}
            for idx, community in enumerate(communities):
                for node in community:
                    community_map[node] = idx

            for node_id, bc_score in high_betweenness:
                if bc_score < 0.05:
                    continue

                # Find which communities this node connects
                neighbors = list(G.neighbors(node_id))
                neighbor_communities = set(
                    community_map.get(n, -1) for n in neighbors
                )
                neighbor_communities.discard(-1)

                if len(neighbor_communities) > 1:
                    # This node bridges multiple communities
                    comm_lists = []
                    for comm_idx in list(neighbor_communities)[:2]:
                        comm_nodes = [
                            n for n in neighbors if community_map.get(n) == comm_idx
                        ][:3]
                        comm_lists.append(comm_nodes)

                    node_data = G.nodes[node_id]
                    label = node_data.get("label", node_id)

                    bridge = BridgeConcept(
                        concept=label,
                        source_cluster=comm_lists[0] if len(comm_lists) > 0 else [],
                        target_cluster=comm_lists[1] if len(comm_lists) > 1 else [],
                        bridge_strength=round(bc_score, 3),
                        related_nodes=neighbors[:5],
                        description=(
                            f"'{label}' connects {len(neighbor_communities)} distinct "
                            f"knowledge clusters and could serve as a bridging concept "
                            f"with strength {bc_score:.2%}."
                        ),
                    )
                    bridges.append(bridge)

            # Also suggest potential new bridge concepts based on gap locations
            if input_data.gap_locations:
                for source, target in input_data.gap_locations[:5]:
                    if source in G.nodes and target in G.nodes:
                        # Find common neighbors that could bridge
                        source_neighbors = set(G.neighbors(source))
                        target_neighbors = set(G.neighbors(target))
                        potential = source_neighbors.union(target_neighbors)

                        for node in list(potential)[:2]:
                            node_data = G.nodes[node]
                            label = node_data.get("label", node)
                            bridge = BridgeConcept(
                                concept=f"Suggested: {label}",
                                source_cluster=[source],
                                target_cluster=[target],
                                bridge_strength=0.5,
                                related_nodes=[source, target],
                                description=(
                                    f"'{label}' could help bridge the gap between "
                                    f"'{source}' and '{target}'."
                                ),
                            )
                            bridges.append(bridge)

            # Sort by bridge strength and limit
            bridges.sort(key=lambda b: b.bridge_strength, reverse=True)
            bridges = bridges[: input_data.max_bridges]

            return SkillResult(
                status=SkillStatus.SUCCESS,
                data=bridges,
                confidence=0.75,
                metadata={
                    "bridges_found": len(bridges),
                    "communities_analyzed": len(communities),
                    "high_betweenness_nodes": len(high_betweenness),
                },
            )

        except Exception as e:
            logger.exception("Bridge concept finding failed", error=str(e))
            return SkillResult(
                status=SkillStatus.FAILED,
                error=f"Failed to find bridge concepts: {str(e)}",
            )

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Define extension points."""
        return [
            ExtensionPoint(
                name="bridgeScorer",
                type="function",
                description="Custom bridge strength scoring function",
            ),
            ExtensionPoint(
                name="conceptGenerator",
                type="function",
                description="Function to generate new concept suggestions",
            ),
        ]

    def _get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for skill input."""
        return {
            "type": "object",
            "properties": {
                "nodes": {
                    "type": "array",
                    "items": {"type": "object"},
                    "minItems": 5,
                    "description": "Graph nodes",
                },
                "edges": {
                    "type": "array",
                    "items": {"type": "object"},
                    "description": "Graph edges",
                },
                "gap_locations": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {"type": "string"},
                        "minItems": 2,
                        "maxItems": 2,
                    },
                    "description": "Pairs of nodes representing gap locations",
                },
                "max_bridges": {
                    "type": "integer",
                    "default": 10,
                    "description": "Maximum number of bridges to return",
                },
            },
            "required": ["nodes", "edges"],
        }
