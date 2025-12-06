"""PF-Core Comparative Gap Analysis Agent.

A reusable SDK-orchestrated gap analysis system that identifies, analyzes,
prioritizes, and transforms gaps into actionable strategic recommendations.
"""

from pf_cga_agent.agents.orchestrator import CGAOrchestrator
from pf_cga_agent.config.settings import Settings

__version__ = "1.0.0"
__all__ = ["CGAOrchestrator", "Settings"]
