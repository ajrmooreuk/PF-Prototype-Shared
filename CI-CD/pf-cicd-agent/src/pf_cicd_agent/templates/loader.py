"""
Template Loader.

Loads and manages configuration templates and instance configurations.
"""

from pathlib import Path
from typing import Any

import yaml
import structlog


logger = structlog.get_logger(__name__)


class TemplateLoader:
    """
    Loads configuration templates and instance configurations.

    Provides utilities for loading YAML configurations and
    managing template files.
    """

    def __init__(self, config_dir: Path | str | None = None) -> None:
        """
        Initialize the template loader.

        Args:
            config_dir: Directory containing configuration files
        """
        if config_dir is None:
            config_dir = Path(__file__).parent.parent.parent.parent / "templates"

        self.config_dir = Path(config_dir)

    def load_yaml(self, file_path: Path | str) -> dict[str, Any]:
        """
        Load a YAML file.

        Args:
            file_path: Path to the YAML file

        Returns:
            Parsed YAML content
        """
        path = Path(file_path)
        if not path.is_absolute():
            path = self.config_dir / path

        with open(path) as f:
            return yaml.safe_load(f)

    def load_base_config(self) -> dict[str, Any]:
        """
        Load the PF-CORE base configuration.

        Returns:
            Base configuration dict
        """
        return self.load_yaml("base/pf-core.config.yaml")

    def load_instance_config(self, instance_id: str) -> dict[str, Any]:
        """
        Load an instance configuration.

        Args:
            instance_id: Instance identifier (e.g., 'air', 'baiv')

        Returns:
            Instance configuration dict
        """
        path = f"instances/{instance_id}.instance.yaml"
        return self.load_yaml(path)

    def load_product_config(
        self,
        instance_id: str,
        product_id: str,
    ) -> dict[str, Any]:
        """
        Load a product configuration.

        Args:
            instance_id: Instance identifier
            product_id: Product identifier

        Returns:
            Product configuration dict
        """
        path = f"products/{instance_id}-{product_id}.product.yaml"
        return self.load_yaml(path)

    def list_instances(self) -> list[str]:
        """
        List available instance configurations.

        Returns:
            List of instance IDs
        """
        instances_dir = self.config_dir / "instances"
        if not instances_dir.exists():
            return []

        return [
            p.stem.replace(".instance", "")
            for p in instances_dir.glob("*.instance.yaml")
        ]

    def list_products(self, instance_id: str | None = None) -> list[str]:
        """
        List available product configurations.

        Args:
            instance_id: Optional instance filter

        Returns:
            List of product IDs
        """
        products_dir = self.config_dir / "products"
        if not products_dir.exists():
            return []

        products = []
        for p in products_dir.glob("*.product.yaml"):
            product_id = p.stem.replace(".product", "")
            if instance_id is None or product_id.startswith(f"{instance_id}-"):
                products.append(product_id)

        return products

    def save_yaml(
        self,
        data: dict[str, Any],
        file_path: Path | str,
    ) -> Path:
        """
        Save data to a YAML file.

        Args:
            data: Data to save
            file_path: Path to save to

        Returns:
            Path to saved file
        """
        path = Path(file_path)
        if not path.is_absolute():
            path = self.config_dir / path

        path.parent.mkdir(parents=True, exist_ok=True)

        with open(path, "w") as f:
            yaml.dump(data, f, default_flow_style=False, sort_keys=False)

        logger.info("yaml_saved", path=str(path))
        return path

    def create_instance_config(
        self,
        instance_id: str,
        instance_name: str,
        description: str = "",
        design_tokens: dict[str, Any] | None = None,
        **kwargs: Any,
    ) -> Path:
        """
        Create a new instance configuration.

        Args:
            instance_id: Instance identifier
            instance_name: Human-readable name
            description: Instance description
            design_tokens: Optional design token overrides
            **kwargs: Additional config fields

        Returns:
            Path to created config file
        """
        config = {
            "instance_id": instance_id,
            "instance_name": instance_name,
            "description": description,
            "extends": "pf-core",
            "design_tokens": design_tokens or {},
            **kwargs,
        }

        path = f"instances/{instance_id}.instance.yaml"
        return self.save_yaml(config, path)

    def create_product_config(
        self,
        instance_id: str,
        product_id: str,
        product_name: str,
        description: str = "",
        **kwargs: Any,
    ) -> Path:
        """
        Create a new product configuration.

        Args:
            instance_id: Parent instance ID
            product_id: Product identifier
            product_name: Human-readable name
            description: Product description
            **kwargs: Additional config fields

        Returns:
            Path to created config file
        """
        config = {
            "product_id": product_id,
            "product_name": product_name,
            "description": description,
            "extends": instance_id,
            **kwargs,
        }

        path = f"products/{instance_id}-{product_id}.product.yaml"
        return self.save_yaml(config, path)
