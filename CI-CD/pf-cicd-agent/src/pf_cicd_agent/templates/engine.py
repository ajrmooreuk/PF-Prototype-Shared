"""
Template Engine.

Implements WBS-3.2.5: Template variable substitution.
"""

from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, select_autoescape
import structlog


logger = structlog.get_logger(__name__)


class TemplateEngine:
    """
    Template engine for generating files from templates.

    Uses Jinja2 for template rendering with custom filters
    and functions for PF-CORE specific operations.
    """

    def __init__(self, template_dir: Path | str | None = None) -> None:
        """
        Initialize the template engine.

        Args:
            template_dir: Directory containing templates
        """
        if template_dir is None:
            # Default to package templates directory
            template_dir = Path(__file__).parent.parent.parent.parent / "templates"

        self.template_dir = Path(template_dir)

        # Setup Jinja2 environment
        self._env = Environment(
            loader=FileSystemLoader(str(self.template_dir)),
            autoescape=select_autoescape(["html", "xml"]),
            trim_blocks=True,
            lstrip_blocks=True,
            keep_trailing_newline=True,
        )

        # Add custom filters
        self._setup_filters()

    def _setup_filters(self) -> None:
        """Setup custom Jinja2 filters."""

        def to_slug(value: str) -> str:
            """Convert to URL-friendly slug."""
            return value.lower().replace(" ", "-").replace("_", "-")

        def to_upper_snake(value: str) -> str:
            """Convert to UPPER_SNAKE_CASE."""
            return value.upper().replace("-", "_").replace(" ", "_")

        def to_pascal(value: str) -> str:
            """Convert to PascalCase."""
            return "".join(word.capitalize() for word in value.replace("-", " ").replace("_", " ").split())

        def default_if_none(value: Any, default: Any) -> Any:
            """Return default if value is None."""
            return default if value is None else value

        self._env.filters["to_slug"] = to_slug
        self._env.filters["to_upper_snake"] = to_upper_snake
        self._env.filters["to_pascal"] = to_pascal
        self._env.filters["default_if_none"] = default_if_none

    def render(self, template_name: str, context: dict[str, Any]) -> str:
        """
        Render a template with the given context.

        Args:
            template_name: Name of the template file
            context: Variables to pass to the template

        Returns:
            Rendered template string
        """
        try:
            template = self._env.get_template(template_name)
            return template.render(**context)
        except Exception as e:
            logger.error("template_render_error", template=template_name, error=str(e))
            raise

    def render_string(self, template_string: str, context: dict[str, Any]) -> str:
        """
        Render a template string with the given context.

        Args:
            template_string: Template content as string
            context: Variables to pass to the template

        Returns:
            Rendered string
        """
        try:
            template = self._env.from_string(template_string)
            return template.render(**context)
        except Exception as e:
            logger.error("template_render_string_error", error=str(e))
            raise

    def render_to_file(
        self,
        template_name: str,
        context: dict[str, Any],
        output_path: Path | str,
    ) -> Path:
        """
        Render a template and write to a file.

        Args:
            template_name: Name of the template file
            context: Variables to pass to the template
            output_path: Path to write the rendered output

        Returns:
            Path to the created file
        """
        output = Path(output_path)
        output.parent.mkdir(parents=True, exist_ok=True)

        content = self.render(template_name, context)
        output.write_text(content)

        logger.info("template_rendered", template=template_name, output=str(output))
        return output

    def list_templates(self, pattern: str = "**/*") -> list[str]:
        """
        List available templates.

        Args:
            pattern: Glob pattern to match

        Returns:
            List of template paths
        """
        return [
            str(p.relative_to(self.template_dir))
            for p in self.template_dir.glob(pattern)
            if p.is_file() and not p.name.startswith(".")
        ]

    def render_workflow(
        self,
        workflow_type: str,
        instance_id: str,
        product_id: str,
        product_name: str,
        environment: str | None = None,
        **kwargs: Any,
    ) -> str:
        """
        Render a workflow template with standard context.

        Args:
            workflow_type: Type of workflow (ci, deploy, etc.)
            instance_id: Instance identifier
            product_id: Product identifier
            product_name: Human-readable product name
            environment: Target environment (for deploy workflows)
            **kwargs: Additional context variables

        Returns:
            Rendered workflow YAML
        """
        if workflow_type == "deploy" and not environment:
            raise ValueError("Environment is required for deploy workflows")

        template_name = f"workflows/{workflow_type}.yml.template"

        context = {
            "instance_id": instance_id,
            "product_id": product_id,
            "product_name": product_name,
            "environment": environment,
            **kwargs,
        }

        return self.render(template_name, context)

    def render_infrastructure(
        self,
        template_type: str,
        instance_id: str,
        product_id: str,
        environment: str,
        domain: str,
        **kwargs: Any,
    ) -> str:
        """
        Render an infrastructure template.

        Args:
            template_type: Type of template (bootstrap-docker, nginx-site, etc.)
            instance_id: Instance identifier
            product_id: Product identifier
            environment: Target environment
            domain: Domain name
            **kwargs: Additional context variables

        Returns:
            Rendered template content
        """
        template_name = f"infrastructure/{template_type}.template"

        context = {
            "instance_id": instance_id,
            "product_id": product_id,
            "environment": environment,
            "domain": domain,
            **kwargs,
        }

        return self.render(template_name, context)
