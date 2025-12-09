"""
CLI Entry Point for the PF-CORE CI/CD Agent.

Provides interactive and command-line interfaces for the agent.
"""

import sys
from typing import Optional

import typer
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.prompt import Prompt

from pf_cicd_agent import __version__
from pf_cicd_agent.agents.orchestrator import CICDOrchestrator
from pf_cicd_agent.config.settings import Settings


app = typer.Typer(
    name="pf-cicd",
    help="PF-CORE CI/CD Automation Agent",
    add_completion=False,
)

console = Console()


def print_banner() -> None:
    """Print the agent banner."""
    banner = """
╔═══════════════════════════════════════════════════════════╗
║          PF-CORE CI/CD Automation Agent                   ║
║                                                           ║
║  Provision and manage PF-CORE platform infrastructure    ║
╚═══════════════════════════════════════════════════════════╝
    """
    console.print(Panel(banner, style="blue"))
    console.print(f"[dim]Version {__version__}[/dim]\n")


def progress_callback(status: str, data: dict) -> None:
    """Handle progress updates from the agent."""
    if status == "processing":
        console.print(f"[dim]⏳ {data.get('message', 'Processing...')}[/dim]")
    elif status == "executing_tool":
        console.print(f"[yellow]🔧 Executing: {data.get('tool', 'unknown')}[/yellow]")
    elif status == "tool_complete":
        if data.get("success"):
            console.print(f"[green]✓ {data.get('message', 'Complete')}[/green]")
        else:
            console.print(f"[red]✗ {data.get('message', 'Failed')}[/red]")


@app.command()
def chat(
    model: str = typer.Option(
        None,
        "--model",
        "-m",
        help="Claude model to use",
    ),
) -> None:
    """Start an interactive chat session with the CI/CD agent."""
    print_banner()

    # Initialize settings
    try:
        settings = Settings()
        if model:
            settings.agent_model = model
    except Exception as e:
        console.print(f"[red]Error loading settings: {e}[/red]")
        console.print("[dim]Make sure you have a .env file with required variables[/dim]")
        raise typer.Exit(1)

    # Initialize agent
    console.print("[dim]Initializing agent...[/dim]")
    try:
        agent = CICDOrchestrator(
            settings=settings,
            progress_callback=progress_callback,
        )
        session_id = agent.start_session()
        console.print(f"[green]Session started: {session_id[:8]}...[/green]\n")
    except Exception as e:
        console.print(f"[red]Failed to initialize agent: {e}[/red]")
        raise typer.Exit(1)

    console.print("Type your requests, or 'exit' to quit.\n")

    # Main chat loop
    while True:
        try:
            user_input = Prompt.ask("[bold blue]You[/bold blue]")

            if user_input.lower() in ("exit", "quit", "bye"):
                summary = agent.end_session()
                console.print("\n[dim]Session Summary:[/dim]")
                console.print(f"  Messages: {summary.get('total_events', 0)}")
                console.print(f"  Success Rate: {summary.get('success_rate', 0):.1%}")
                console.print("\n[green]Goodbye![/green]")
                break

            if not user_input.strip():
                continue

            # Get response
            response = agent.chat(user_input)

            # Display response
            console.print()
            console.print(Panel(
                Markdown(response),
                title="[bold green]Agent[/bold green]",
                border_style="green",
            ))
            console.print()

        except KeyboardInterrupt:
            console.print("\n[yellow]Interrupted. Type 'exit' to quit.[/yellow]")
        except Exception as e:
            console.print(f"[red]Error: {e}[/red]")


@app.command()
def exec(
    command: str = typer.Argument(..., help="Command to execute"),
    params: Optional[list[str]] = typer.Argument(
        None,
        help="Command parameters as key=value pairs",
    ),
) -> None:
    """Execute a single command without interactive mode."""
    # Parse parameters
    kwargs = {}
    if params:
        for param in params:
            if "=" in param:
                key, value = param.split("=", 1)
                # Try to parse as JSON for complex types
                try:
                    import json
                    kwargs[key] = json.loads(value)
                except json.JSONDecodeError:
                    kwargs[key] = value

    # Initialize and execute
    try:
        settings = Settings()
        agent = CICDOrchestrator(settings=settings)
        result = agent.execute_command(command, **kwargs)

        if result.get("success"):
            console.print(f"[green]✓ {result.get('message', 'Success')}[/green]")
            if result.get("data"):
                console.print_json(data=result["data"])
        else:
            console.print(f"[red]✗ {result.get('error', 'Failed')}[/red]")
            raise typer.Exit(1)

    except Exception as e:
        console.print(f"[red]Error: {e}[/red]")
        raise typer.Exit(1)


@app.command()
def tools() -> None:
    """List available tools."""
    try:
        settings = Settings()
        agent = CICDOrchestrator(settings=settings)

        console.print("\n[bold]Available Tools:[/bold]\n")

        for tool in agent.get_available_tools():
            console.print(f"  [cyan]{tool['name']}[/cyan] ({tool['category']})")
            console.print(f"    [dim]{tool['description'][:80]}...[/dim]\n")

    except Exception as e:
        console.print(f"[red]Error: {e}[/red]")
        raise typer.Exit(1)


@app.command()
def validate(
    config_file: str = typer.Argument(..., help="Path to configuration file"),
) -> None:
    """Validate a configuration file."""
    import json
    import yaml
    from pathlib import Path

    from pf_cicd_agent.config.validator import ConfigValidator

    path = Path(config_file)
    if not path.exists():
        console.print(f"[red]File not found: {config_file}[/red]")
        raise typer.Exit(1)

    # Load config
    try:
        content = path.read_text()
        if path.suffix in (".yaml", ".yml"):
            config = yaml.safe_load(content)
        else:
            config = json.loads(content)
    except Exception as e:
        console.print(f"[red]Failed to parse config: {e}[/red]")
        raise typer.Exit(1)

    # Validate
    validator = ConfigValidator()
    result = validator.validate_auto(config)

    if result.is_valid:
        console.print(f"[green]✓ Configuration is valid ({result.config_type})[/green]")
    else:
        console.print(f"[red]✗ Configuration is invalid[/red]")
        for error in result.errors:
            console.print(f"  [red]• {error}[/red]")

    if result.warnings:
        console.print("\n[yellow]Warnings:[/yellow]")
        for warning in result.warnings:
            console.print(f"  [yellow]• {warning}[/yellow]")

    if not result.is_valid:
        raise typer.Exit(1)


@app.command()
def version() -> None:
    """Show version information."""
    console.print(f"PF-CORE CI/CD Agent v{__version__}")


def main() -> None:
    """Main entry point."""
    app()


if __name__ == "__main__":
    main()
