"""
Configuration Validator.

Implements WBS-1.2.5: JSON Schema validation for configurations.
"""

import json
from pathlib import Path
from typing import Any

import jsonschema
from jsonschema import Draft7Validator, ValidationError
from pydantic import BaseModel

from pf_cicd_agent.config.schemas import (
    InstanceConfig,
    PFCoreConfig,
    ProductConfig,
    WhiteLabelConfig,
)


class ValidationResult(BaseModel):
    """Result of configuration validation."""

    is_valid: bool
    errors: list[str]
    warnings: list[str]
    config_type: str | None = None


class ConfigValidator:
    """
    Validates configurations against JSON schemas and business rules.

    Supports:
    - JSON Schema validation
    - Pydantic model validation
    - Custom business rule validation
    """

    def __init__(self, schema_dir: Path | None = None) -> None:
        """
        Initialize the validator.

        Args:
            schema_dir: Directory containing JSON schema files
        """
        self.schema_dir = schema_dir or Path(__file__).parent.parent / "schemas"
        self._schemas: dict[str, dict[str, Any]] = {}
        self._load_schemas()

    def _load_schemas(self) -> None:
        """Load all JSON schemas from the schema directory."""
        if not self.schema_dir.exists():
            return

        for schema_file in self.schema_dir.glob("*.schema.json"):
            try:
                with open(schema_file) as f:
                    schema = json.load(f)
                    schema_id = schema_file.stem.replace(".schema", "")
                    self._schemas[schema_id] = schema
            except json.JSONDecodeError:
                pass  # Skip invalid schema files

    def validate_json_schema(
        self,
        config: dict[str, Any],
        schema_name: str,
    ) -> ValidationResult:
        """
        Validate a configuration against a JSON schema.

        Args:
            config: Configuration dict to validate
            schema_name: Name of the schema to use

        Returns:
            ValidationResult with validation status and errors
        """
        if schema_name not in self._schemas:
            return ValidationResult(
                is_valid=False,
                errors=[f"Schema '{schema_name}' not found"],
                warnings=[],
                config_type=schema_name,
            )

        schema = self._schemas[schema_name]
        validator = Draft7Validator(schema)
        errors: list[str] = []

        for error in validator.iter_errors(config):
            path = " -> ".join(str(p) for p in error.absolute_path)
            errors.append(f"{path}: {error.message}" if path else error.message)

        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            warnings=[],
            config_type=schema_name,
        )

    def validate_pf_core(self, config: dict[str, Any]) -> ValidationResult:
        """
        Validate a PF-CORE base configuration.

        Args:
            config: Configuration dict

        Returns:
            ValidationResult
        """
        errors: list[str] = []
        warnings: list[str] = []

        try:
            PFCoreConfig(**config)
        except Exception as e:
            errors.append(str(e))

        # Business rule validations
        if config.get("platform_version"):
            # Check semantic versioning
            version = config["platform_version"]
            parts = version.split(".")
            if len(parts) != 3 or not all(p.isdigit() for p in parts):
                warnings.append(f"Platform version '{version}' is not semantic (x.y.z)")

        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            warnings=warnings,
            config_type="pf-core",
        )

    def validate_instance(self, config: dict[str, Any]) -> ValidationResult:
        """
        Validate an instance configuration.

        Args:
            config: Configuration dict

        Returns:
            ValidationResult
        """
        errors: list[str] = []
        warnings: list[str] = []

        # Required fields
        if "instance_id" not in config:
            errors.append("Missing required field: instance_id")
        if "instance_name" not in config:
            errors.append("Missing required field: instance_name")

        try:
            InstanceConfig(**config)
        except Exception as e:
            errors.append(str(e))

        # Business rules
        instance_id = config.get("instance_id", "")
        if instance_id and not instance_id.replace("-", "").replace("_", "").isalnum():
            errors.append(f"instance_id '{instance_id}' must be alphanumeric with hyphens/underscores")

        # Check extends reference
        extends = config.get("extends")
        if extends and extends != "pf-core":
            warnings.append(f"Instance extends '{extends}' - ensure parent exists")

        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            warnings=warnings,
            config_type="instance",
        )

    def validate_product(self, config: dict[str, Any]) -> ValidationResult:
        """
        Validate a product configuration.

        Args:
            config: Configuration dict

        Returns:
            ValidationResult
        """
        errors: list[str] = []
        warnings: list[str] = []

        # Required fields
        if "product_id" not in config:
            errors.append("Missing required field: product_id")
        if "product_name" not in config:
            errors.append("Missing required field: product_name")
        if "extends" not in config:
            errors.append("Missing required field: extends (parent instance)")

        try:
            ProductConfig(**config)
        except Exception as e:
            errors.append(str(e))

        # Business rules
        product_id = config.get("product_id", "")
        if product_id and not product_id.replace("-", "").replace("_", "").isalnum():
            errors.append(f"product_id '{product_id}' must be alphanumeric with hyphens/underscores")

        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            warnings=warnings,
            config_type="product",
        )

    def validate_whitelabel(self, config: dict[str, Any]) -> ValidationResult:
        """
        Validate a white-label configuration.

        Args:
            config: Configuration dict

        Returns:
            ValidationResult
        """
        errors: list[str] = []
        warnings: list[str] = []

        # Required fields
        if "whitelabel_id" not in config:
            errors.append("Missing required field: whitelabel_id")
        if "client_name" not in config:
            errors.append("Missing required field: client_name")
        if "extends" not in config:
            errors.append("Missing required field: extends (parent product)")

        try:
            WhiteLabelConfig(**config)
        except Exception as e:
            errors.append(str(e))

        # Business rules
        if config.get("custom_domain"):
            domain = config["custom_domain"]
            if not ("." in domain and domain.replace(".", "").replace("-", "").isalnum()):
                warnings.append(f"Custom domain '{domain}' may be invalid")

        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            warnings=warnings,
            config_type="whitelabel",
        )

    def validate(self, config: dict[str, Any], config_type: str) -> ValidationResult:
        """
        Validate a configuration based on its type.

        Args:
            config: Configuration dict
            config_type: One of 'pf-core', 'instance', 'product', 'whitelabel'

        Returns:
            ValidationResult
        """
        validators = {
            "pf-core": self.validate_pf_core,
            "instance": self.validate_instance,
            "product": self.validate_product,
            "whitelabel": self.validate_whitelabel,
        }

        validator = validators.get(config_type)
        if validator:
            return validator(config)

        return ValidationResult(
            is_valid=False,
            errors=[f"Unknown config type: {config_type}"],
            warnings=[],
            config_type=config_type,
        )

    def detect_config_type(self, config: dict[str, Any]) -> str | None:
        """
        Attempt to detect the configuration type from its contents.

        Args:
            config: Configuration dict

        Returns:
            Config type string or None if unable to detect
        """
        # Check for type-specific fields
        if "whitelabel_id" in config:
            return "whitelabel"
        if "product_id" in config:
            return "product"
        if "instance_id" in config:
            return "instance"
        if "platform_name" in config or config.get("extends") is None:
            return "pf-core"

        return None

    def validate_auto(self, config: dict[str, Any]) -> ValidationResult:
        """
        Automatically detect config type and validate.

        Args:
            config: Configuration dict

        Returns:
            ValidationResult
        """
        config_type = self.detect_config_type(config)
        if config_type is None:
            return ValidationResult(
                is_valid=False,
                errors=["Unable to detect configuration type"],
                warnings=[],
            )

        return self.validate(config, config_type)
