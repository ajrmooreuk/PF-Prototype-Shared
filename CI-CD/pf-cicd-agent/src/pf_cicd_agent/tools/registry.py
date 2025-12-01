"""
Tool Registry.

Implements WBS-2.1.2: Tool registry for managing available tools.
"""

from typing import Any, Type

import structlog

from pf_cicd_agent.tools.base import BaseTool, ToolResult
from pf_cicd_agent.audit.service import AuditService


logger = structlog.get_logger(__name__)


class ToolRegistry:
    """
    Registry for managing and executing tools.

    Provides:
    - Tool registration and discovery
    - Tool execution by name
    - Tool definition export for Claude
    """

    def __init__(self, audit_service: AuditService | None = None) -> None:
        """
        Initialize the registry.

        Args:
            audit_service: Optional audit service for tool logging
        """
        self._tools: dict[str, BaseTool] = {}
        self._tool_classes: dict[str, Type[BaseTool]] = {}
        self._audit_service = audit_service

    def register(self, tool_class: Type[BaseTool]) -> None:
        """
        Register a tool class.

        Args:
            tool_class: Tool class to register
        """
        # Create instance with audit service
        tool_instance = tool_class(audit_service=self._audit_service)
        name = tool_instance.name

        if name in self._tools:
            logger.warning("tool_override", tool=name)

        self._tools[name] = tool_instance
        self._tool_classes[name] = tool_class

        logger.info("tool_registered", tool=name, category=tool_instance.category)

    def register_instance(self, tool: BaseTool) -> None:
        """
        Register a pre-instantiated tool.

        Args:
            tool: Tool instance to register
        """
        name = tool.name

        if name in self._tools:
            logger.warning("tool_override", tool=name)

        self._tools[name] = tool
        logger.info("tool_registered", tool=name, category=tool.category)

    def unregister(self, name: str) -> bool:
        """
        Unregister a tool.

        Args:
            name: Tool name to unregister

        Returns:
            True if tool was removed, False if not found
        """
        if name in self._tools:
            del self._tools[name]
            self._tool_classes.pop(name, None)
            logger.info("tool_unregistered", tool=name)
            return True
        return False

    def get(self, name: str) -> BaseTool | None:
        """
        Get a tool by name.

        Args:
            name: Tool name

        Returns:
            Tool instance or None
        """
        return self._tools.get(name)

    def has(self, name: str) -> bool:
        """
        Check if a tool is registered.

        Args:
            name: Tool name

        Returns:
            True if registered
        """
        return name in self._tools

    def execute(self, name: str, **kwargs: Any) -> ToolResult[Any]:
        """
        Execute a tool by name.

        Args:
            name: Tool name
            **kwargs: Tool parameters

        Returns:
            ToolResult from execution
        """
        tool = self.get(name)
        if tool is None:
            return ToolResult.error(
                error=f"Tool '{name}' not found",
                error_code="TOOL_NOT_FOUND",
            )

        return tool.run(**kwargs)

    def list_tools(self) -> list[str]:
        """
        List all registered tool names.

        Returns:
            List of tool names
        """
        return list(self._tools.keys())

    def list_by_category(self, category: str) -> list[str]:
        """
        List tools by category.

        Args:
            category: Category to filter by

        Returns:
            List of matching tool names
        """
        return [
            name for name, tool in self._tools.items() if tool.category == category
        ]

    def get_definitions(self) -> list[dict[str, Any]]:
        """
        Get tool definitions for Claude API.

        Returns:
            List of tool definitions in Anthropic format
        """
        return [tool.to_anthropic_tool() for tool in self._tools.values()]

    def get_definitions_by_category(self, category: str) -> list[dict[str, Any]]:
        """
        Get tool definitions filtered by category.

        Args:
            category: Category to filter by

        Returns:
            List of tool definitions
        """
        return [
            tool.to_anthropic_tool()
            for tool in self._tools.values()
            if tool.category == category
        ]

    def get_tool_info(self, name: str) -> dict[str, Any] | None:
        """
        Get detailed info about a tool.

        Args:
            name: Tool name

        Returns:
            Tool info dict or None
        """
        tool = self.get(name)
        if tool is None:
            return None

        return {
            "name": tool.name,
            "description": tool.description,
            "version": tool.version,
            "category": tool.category,
            "input_schema": tool.get_input_schema(),
        }

    def __len__(self) -> int:
        return len(self._tools)

    def __contains__(self, name: str) -> bool:
        return name in self._tools

    def __iter__(self):
        return iter(self._tools.values())


# Global registry instance
_default_registry: ToolRegistry | None = None


def get_registry(audit_service: AuditService | None = None) -> ToolRegistry:
    """
    Get the default tool registry.

    Args:
        audit_service: Optional audit service

    Returns:
        Default ToolRegistry instance
    """
    global _default_registry
    if _default_registry is None:
        _default_registry = ToolRegistry(audit_service=audit_service)
    return _default_registry


def register_tool(tool_class: Type[BaseTool]) -> Type[BaseTool]:
    """
    Decorator to register a tool class.

    Usage:
        @register_tool
        class MyTool(BaseTool):
            ...
    """
    get_registry().register(tool_class)
    return tool_class
