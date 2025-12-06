"""Base skill class and registry for CGA Agent."""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Generic, TypeVar

import structlog

logger = structlog.get_logger()

TInput = TypeVar("TInput")
TOutput = TypeVar("TOutput")


class SkillStatus(str, Enum):
    """Status of a skill execution."""

    SUCCESS = "success"
    PARTIAL = "partial"
    FAILED = "failed"
    DEGRADED = "degraded"


@dataclass
class ValidationResult:
    """Result of input validation."""

    valid: bool
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


@dataclass
class SkillResult(Generic[TOutput]):
    """Result from executing a skill."""

    status: SkillStatus
    data: TOutput | None = None
    confidence: float = 1.0
    error: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)

    @property
    def is_success(self) -> bool:
        return self.status in (SkillStatus.SUCCESS, SkillStatus.PARTIAL)


@dataclass
class ExtensionPoint:
    """Definition of an extension point for customization."""

    name: str
    type: str  # 'function', 'config', 'data'
    description: str
    required: bool = False


class BaseSkill(ABC, Generic[TInput, TOutput]):
    """Abstract base class for all CGA skills.

    Skills are reusable analytical capabilities that can be composed
    into analysis pipelines. Each skill has:
    - Defined inputs and outputs
    - Validation logic
    - Extension points for domain customization
    - Fallback behavior for degraded operation
    """

    def __init__(self, extensions: dict[str, Any] | None = None):
        self._extensions = extensions or {}
        self._logger = structlog.get_logger().bind(skill=self.id)

    @property
    @abstractmethod
    def id(self) -> str:
        """Unique identifier for this skill."""
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable name."""
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        """Description of what this skill does."""
        pass

    @property
    def version(self) -> str:
        """Version of this skill."""
        return "1.0.0"

    @property
    def category(self) -> str:
        """Category of this skill (e.g., 'core', 'baiv')."""
        return "core"

    @abstractmethod
    def validate(self, input_data: TInput) -> ValidationResult:
        """Validate input data before execution.

        Args:
            input_data: The input to validate

        Returns:
            ValidationResult with status and any errors/warnings
        """
        pass

    @abstractmethod
    async def execute(self, input_data: TInput) -> SkillResult[TOutput]:
        """Execute the skill on the given input.

        Args:
            input_data: The validated input data

        Returns:
            SkillResult containing the output or error
        """
        pass

    async def execute_with_fallback(
        self, input_data: TInput, fallback_fn: Any | None = None
    ) -> SkillResult[TOutput]:
        """Execute with automatic fallback on failure.

        Args:
            input_data: The input data
            fallback_fn: Optional fallback function to call on failure

        Returns:
            SkillResult from primary or fallback execution
        """
        try:
            result = await self.execute(input_data)
            if result.is_success:
                return result

            if fallback_fn:
                self._logger.warning(
                    "Primary execution failed, attempting fallback",
                    error=result.error,
                )
                fallback_result = await fallback_fn(input_data)
                fallback_result.status = SkillStatus.DEGRADED
                fallback_result.metadata["fallback"] = True
                return fallback_result

            return result

        except Exception as e:
            self._logger.exception("Skill execution failed", error=str(e))
            if fallback_fn:
                try:
                    fallback_result = await fallback_fn(input_data)
                    fallback_result.status = SkillStatus.DEGRADED
                    fallback_result.metadata["fallback"] = True
                    fallback_result.metadata["original_error"] = str(e)
                    return fallback_result
                except Exception as fallback_error:
                    return SkillResult(
                        status=SkillStatus.FAILED,
                        error=f"Both primary and fallback failed: {e}, {fallback_error}",
                    )

            return SkillResult(
                status=SkillStatus.FAILED,
                error=str(e),
            )

    def get_extension_points(self) -> list[ExtensionPoint]:
        """Get list of extension points for this skill.

        Override in subclasses to define customization points.
        """
        return []

    def get_extension(self, name: str, default: Any = None) -> Any:
        """Get a configured extension value."""
        return self._extensions.get(name, default)

    def get_tool_schema(self) -> dict[str, Any]:
        """Get Claude tool schema for this skill."""
        return {
            "name": self.id.replace(":", "_"),
            "description": self.description,
            "input_schema": self._get_input_schema(),
        }

    @abstractmethod
    def _get_input_schema(self) -> dict[str, Any]:
        """Get JSON schema for skill input."""
        pass


class SkillRegistry:
    """Registry for managing available skills."""

    def __init__(self):
        self._skills: dict[str, BaseSkill] = {}
        self._logger = structlog.get_logger().bind(component="skill_registry")

    def register(self, skill: BaseSkill) -> None:
        """Register a skill."""
        self._skills[skill.id] = skill
        self._logger.info("Skill registered", skill_id=skill.id, skill_name=skill.name)

    def get(self, skill_id: str) -> BaseSkill | None:
        """Get a skill by ID."""
        return self._skills.get(skill_id)

    def list_skills(self) -> list[str]:
        """List all registered skill IDs."""
        return list(self._skills.keys())

    def get_by_category(self, category: str) -> list[BaseSkill]:
        """Get all skills in a category."""
        return [s for s in self._skills.values() if s.category == category]

    def get_tool_schemas(self) -> list[dict[str, Any]]:
        """Get Claude tool schemas for all registered skills."""
        return [skill.get_tool_schema() for skill in self._skills.values()]

    def create_default_registry(self) -> "SkillRegistry":
        """Create a registry with all default core skills."""
        from pf_cga_agent.skills.core.structural_hole_detector import (
            StructuralHoleDetectorSkill,
        )
        from pf_cga_agent.skills.core.threat_analyzer import ThreatAnalyzerSkill
        from pf_cga_agent.skills.core.opportunity_identifier import (
            OpportunityIdentifierSkill,
        )
        from pf_cga_agent.skills.core.bridge_concept_finder import (
            BridgeConceptFinderSkill,
        )
        from pf_cga_agent.skills.core.priority_matrix_builder import (
            PriorityMatrixBuilderSkill,
        )
        from pf_cga_agent.skills.core.comparative_scorer import ComparativeScorerSkill

        self.register(StructuralHoleDetectorSkill())
        self.register(ThreatAnalyzerSkill())
        self.register(OpportunityIdentifierSkill())
        self.register(BridgeConceptFinderSkill())
        self.register(PriorityMatrixBuilderSkill())
        self.register(ComparativeScorerSkill())

        return self
