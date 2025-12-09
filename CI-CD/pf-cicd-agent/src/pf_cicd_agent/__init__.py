"""
PF-CORE CI/CD Automation Agent

An agentic CI/CD orchestration system powered by Claude Agent SDK
for automating platform provisioning, deployment, and management.
"""

__version__ = "1.0.0"
__author__ = "Platform Foundation Core Holdings"

from pf_cicd_agent.config.settings import Settings
from pf_cicd_agent.agents.orchestrator import CICDOrchestrator

__all__ = [
    "Settings",
    "CICDOrchestrator",
    "__version__",
]
