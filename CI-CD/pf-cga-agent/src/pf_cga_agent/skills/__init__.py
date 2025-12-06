"""Skills module for CGA Agent.

Provides reusable analytical capabilities for gap analysis.
"""

from pf_cga_agent.skills.base import BaseSkill, SkillResult, SkillRegistry
from pf_cga_agent.skills.core.structural_hole_detector import StructuralHoleDetectorSkill
from pf_cga_agent.skills.core.threat_analyzer import ThreatAnalyzerSkill
from pf_cga_agent.skills.core.opportunity_identifier import OpportunityIdentifierSkill
from pf_cga_agent.skills.core.bridge_concept_finder import BridgeConceptFinderSkill
from pf_cga_agent.skills.core.priority_matrix_builder import PriorityMatrixBuilderSkill
from pf_cga_agent.skills.core.comparative_scorer import ComparativeScorerSkill

__all__ = [
    "BaseSkill",
    "SkillResult",
    "SkillRegistry",
    "StructuralHoleDetectorSkill",
    "ThreatAnalyzerSkill",
    "OpportunityIdentifierSkill",
    "BridgeConceptFinderSkill",
    "PriorityMatrixBuilderSkill",
    "ComparativeScorerSkill",
]
