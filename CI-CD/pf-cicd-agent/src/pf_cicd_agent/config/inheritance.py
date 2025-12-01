"""
Configuration Inheritance Engine.

Implements WBS-1.3: Inheritance Engine
- Multi-level config inheritance (PF-CORE → Instance → Product → WhiteLabel)
- Deep merge with override detection
- Inheritance chain resolution
"""

from copy import deepcopy
from typing import Any, TypeVar

from pydantic import BaseModel

from pf_cicd_agent.config.schemas import (
    InstanceConfig,
    PFCoreConfig,
    ProductConfig,
    WhiteLabelConfig,
)

T = TypeVar("T", bound=BaseModel)


class InheritanceEngine:
    """
    Handles multi-level configuration inheritance.

    Supports the following inheritance chain:
    PF-CORE (base) → Instance → Product → White-Label

    Each level can override or extend properties from its parent.
    """

    def __init__(self) -> None:
        """Initialize the inheritance engine."""
        self._config_registry: dict[str, dict[str, Any]] = {}
        self._override_markers: dict[str, list[str]] = {}

    def register_config(self, config_id: str, config: BaseModel) -> None:
        """
        Register a configuration in the registry.

        Args:
            config_id: Unique identifier for this config
            config: The configuration model instance
        """
        self._config_registry[config_id] = config.model_dump(exclude_unset=False)

    def get_config(self, config_id: str) -> dict[str, Any] | None:
        """
        Retrieve a configuration from the registry.

        Args:
            config_id: Configuration identifier

        Returns:
            Configuration dict or None if not found
        """
        return self._config_registry.get(config_id)

    def deep_merge(
        self,
        base: dict[str, Any],
        override: dict[str, Any],
        path: str = "",
    ) -> tuple[dict[str, Any], list[str]]:
        """
        Deep merge two configuration dictionaries.

        The override values take precedence over base values.
        Nested dicts are merged recursively.
        Lists are replaced entirely (not merged).

        Args:
            base: Base configuration dict
            override: Override configuration dict
            path: Current path for tracking overrides

        Returns:
            Tuple of (merged dict, list of override paths)
        """
        result = deepcopy(base)
        overrides: list[str] = []

        for key, value in override.items():
            current_path = f"{path}.{key}" if path else key

            if key not in result:
                # New key from override
                result[key] = deepcopy(value)
                overrides.append(f"{current_path} [added]")
            elif value is None:
                # Explicit None means "use parent value"
                continue
            elif isinstance(value, dict) and isinstance(result.get(key), dict):
                # Recursive merge for nested dicts
                merged, nested_overrides = self.deep_merge(
                    result[key],
                    value,
                    current_path,
                )
                result[key] = merged
                overrides.extend(nested_overrides)
            else:
                # Direct override
                if result[key] != value:
                    overrides.append(f"{current_path} [{result[key]} → {value}]")
                result[key] = deepcopy(value)

        return result, overrides

    def resolve_inheritance(
        self,
        config_id: str,
        config_type: str = "auto",
    ) -> tuple[dict[str, Any], list[str]]:
        """
        Resolve the full inheritance chain for a configuration.

        Args:
            config_id: The configuration ID to resolve
            config_type: Type hint ('instance', 'product', 'whitelabel', or 'auto')

        Returns:
            Tuple of (resolved config dict, list of all overrides)
        """
        config = self.get_config(config_id)
        if config is None:
            raise ValueError(f"Configuration '{config_id}' not found in registry")

        # Start with empty base
        resolved: dict[str, Any] = {}
        all_overrides: list[str] = []

        # Get inheritance chain
        chain = self._build_inheritance_chain(config_id)

        # Merge from root to leaf
        for chain_id in chain:
            chain_config = self.get_config(chain_id)
            if chain_config:
                resolved, overrides = self.deep_merge(resolved, chain_config)
                for override in overrides:
                    all_overrides.append(f"[{chain_id}] {override}")

        return resolved, all_overrides

    def _build_inheritance_chain(self, config_id: str) -> list[str]:
        """
        Build the inheritance chain from root to the specified config.

        Args:
            config_id: Starting configuration ID

        Returns:
            List of config IDs from root to leaf
        """
        chain: list[str] = []
        current_id = config_id
        visited: set[str] = set()

        while current_id and current_id not in visited:
            visited.add(current_id)
            chain.append(current_id)

            config = self.get_config(current_id)
            if config and "extends" in config:
                current_id = config["extends"]
            else:
                break

        # Reverse to get root-to-leaf order
        return list(reversed(chain))

    def create_resolved_instance(
        self,
        config_id: str,
    ) -> tuple[InstanceConfig, list[str]]:
        """
        Create a fully resolved InstanceConfig.

        Args:
            config_id: Instance configuration ID

        Returns:
            Tuple of (resolved InstanceConfig, override list)
        """
        resolved, overrides = self.resolve_inheritance(config_id)
        return InstanceConfig(**resolved), overrides

    def create_resolved_product(
        self,
        config_id: str,
    ) -> tuple[ProductConfig, list[str]]:
        """
        Create a fully resolved ProductConfig.

        Args:
            config_id: Product configuration ID

        Returns:
            Tuple of (resolved ProductConfig, override list)
        """
        resolved, overrides = self.resolve_inheritance(config_id)
        return ProductConfig(**resolved), overrides

    def create_resolved_whitelabel(
        self,
        config_id: str,
    ) -> tuple[WhiteLabelConfig, list[str]]:
        """
        Create a fully resolved WhiteLabelConfig.

        Args:
            config_id: White-label configuration ID

        Returns:
            Tuple of (resolved WhiteLabelConfig, override list)
        """
        resolved, overrides = self.resolve_inheritance(config_id)
        return WhiteLabelConfig(**resolved), overrides

    def validate_inheritance_chain(self, config_id: str) -> list[str]:
        """
        Validate an inheritance chain for issues.

        Args:
            config_id: Starting configuration ID

        Returns:
            List of validation issues (empty if valid)
        """
        issues: list[str] = []
        chain = self._build_inheritance_chain(config_id)

        if not chain:
            issues.append(f"Empty inheritance chain for '{config_id}'")
            return issues

        # Check for circular dependencies (already handled by visited set)
        # Check for missing parents
        for i, chain_id in enumerate(chain):
            if chain_id not in self._config_registry:
                if i == 0:
                    # Root missing is okay if it's 'pf-core'
                    if chain_id != "pf-core":
                        issues.append(f"Root config '{chain_id}' not found")
                else:
                    issues.append(f"Parent config '{chain_id}' not found in chain")

        return issues

    def get_effective_value(
        self,
        config_id: str,
        path: str,
    ) -> tuple[Any, str | None]:
        """
        Get the effective value of a config property and its source.

        Args:
            config_id: Configuration ID to query
            path: Dot-separated path (e.g., 'infrastructure.production.droplet.size')

        Returns:
            Tuple of (value, source config ID or None if not found)
        """
        resolved, _ = self.resolve_inheritance(config_id)
        chain = self._build_inheritance_chain(config_id)

        # Navigate to the value
        value = resolved
        for key in path.split("."):
            if isinstance(value, dict) and key in value:
                value = value[key]
            else:
                return None, None

        # Find which config in the chain provided this value
        for chain_id in reversed(chain):
            chain_config = self.get_config(chain_id)
            if chain_config:
                chain_value = chain_config
                found = True
                for key in path.split("."):
                    if isinstance(chain_value, dict) and key in chain_value:
                        chain_value = chain_value[key]
                    else:
                        found = False
                        break
                if found and chain_value is not None:
                    return value, chain_id

        return value, chain[0] if chain else None

    def export_resolved(self, config_id: str, include_metadata: bool = True) -> dict[str, Any]:
        """
        Export a fully resolved configuration as a dict.

        Args:
            config_id: Configuration ID to export
            include_metadata: Whether to include resolution metadata

        Returns:
            Resolved configuration dict
        """
        resolved, overrides = self.resolve_inheritance(config_id)

        if include_metadata:
            resolved["_resolution"] = {
                "chain": self._build_inheritance_chain(config_id),
                "overrides": overrides,
            }

        return resolved
