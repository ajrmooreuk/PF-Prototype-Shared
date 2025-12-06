"""CLI interface for CGA Agent."""

import asyncio
import json
from typing import Optional
from uuid import uuid4

import typer
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn
from rich.table import Table

from pf_cga_agent.agents.orchestrator import CGAOrchestrator
from pf_cga_agent.config.schemas import AnalysisRequest, AnalysisType, Entity, Competitor
from pf_cga_agent.config.settings import get_settings

app = typer.Typer(
    name="pf-cga",
    help="PF-Core Comparative Gap Analysis Agent CLI",
    add_completion=False,
)
console = Console()


def create_progress_callback(progress: Progress, task_id):
    """Create a progress callback for the analysis."""
    def callback(message: str, percentage: float):
        progress.update(task_id, completed=int(percentage * 100), description=message)
    return callback


@app.command()
def analyze(
    entities_file: Optional[str] = typer.Option(
        None, "--entities", "-e", help="JSON file containing target entities"
    ),
    competitors_file: Optional[str] = typer.Option(
        None, "--competitors", "-c", help="JSON file containing competitors"
    ),
    domain: str = typer.Option("baiv", "--domain", "-d", help="Domain type (baiv, air, w4m)"),
    scope: str = typer.Option("ai_visibility", "--scope", "-s", help="Analysis scope"),
    analysis_type: str = typer.Option(
        "comparative", "--type", "-t", help="Analysis type (comparative, structural, competitive)"
    ),
    output: Optional[str] = typer.Option(None, "--output", "-o", help="Output file for report"),
):
    """Run a gap analysis on the provided entities."""
    console.print(Panel.fit(
        "[bold blue]CGA Agent[/bold blue] - Comparative Gap Analysis",
        border_style="blue",
    ))

    # Load entities
    entities = []
    if entities_file:
        with open(entities_file) as f:
            entities_data = json.load(f)
            entities = [Entity(**e) for e in entities_data]
    else:
        # Default demo entities
        entities = [
            Entity(id="brand-1", type="Brand", name="Demo Brand"),
            Entity(id="topic-1", type="Topic", name="AI Visibility"),
            Entity(id="topic-2", type="Topic", name="Content Strategy"),
            Entity(id="model-1", type="AIModel", name="Claude"),
            Entity(id="model-2", type="AIModel", name="GPT-4"),
        ]
        console.print("[yellow]Using demo entities (provide --entities for custom)[/yellow]")

    # Load competitors
    competitors = []
    if competitors_file:
        with open(competitors_file) as f:
            competitors_data = json.load(f)
            competitors = [Competitor(**c) for c in competitors_data]

    # Create analysis request
    request = AnalysisRequest(
        session_id=uuid4(),
        domain_type=domain,
        analysis_scope=scope,
        analysis_type=AnalysisType(analysis_type),
        target_entities=entities,
        competitors=competitors,
    )

    console.print(f"\n[bold]Analysis Configuration:[/bold]")
    table = Table(show_header=False, box=None)
    table.add_row("Domain:", domain)
    table.add_row("Scope:", scope)
    table.add_row("Type:", analysis_type)
    table.add_row("Entities:", str(len(entities)))
    table.add_row("Competitors:", str(len(competitors)))
    console.print(table)

    # Run analysis
    settings = get_settings()

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
        console=console,
    ) as progress:
        task = progress.add_task("Starting analysis...", total=100)

        orchestrator = CGAOrchestrator(
            settings=settings,
            progress_callback=create_progress_callback(progress, task),
        )

        report = asyncio.run(orchestrator.analyze(request))

    # Display results summary
    console.print("\n[bold green]Analysis Complete![/bold green]\n")

    summary_table = Table(title="Results Summary")
    summary_table.add_column("Metric", style="cyan")
    summary_table.add_column("Count", justify="right", style="green")

    summary_table.add_row("Gaps Identified", str(len(report.identified_gaps)))
    summary_table.add_row("Threats Detected", str(len(report.threats)))
    summary_table.add_row("Opportunities Found", str(len(report.opportunities)))
    summary_table.add_row("Recommendations", str(len(report.recommendations)))

    console.print(summary_table)

    # Show critical gaps
    critical_gaps = [g for g in report.identified_gaps if g.severity.value == "critical"]
    if critical_gaps:
        console.print("\n[bold red]Critical Gaps:[/bold red]")
        for gap in critical_gaps:
            console.print(f"  - {gap.title}")

    # Show top recommendations
    if report.recommendations:
        console.print("\n[bold blue]Top Recommendations:[/bold blue]")
        for i, rec in enumerate(report.recommendations[:3], 1):
            console.print(f"  {i}. {rec.title} [{rec.priority.value}]")

    # Save output
    if output:
        with open(output, "w") as f:
            json.dump(report.model_dump(mode="json"), f, indent=2, default=str)
        console.print(f"\n[green]Report saved to {output}[/green]")


@app.command()
def chat():
    """Start an interactive chat session with the CGA Agent."""
    console.print(Panel.fit(
        "[bold blue]CGA Agent Chat[/bold blue]\n"
        "Ask questions about gap analysis or request analysis tasks.\n"
        "Type 'exit' or 'quit' to end the session.",
        border_style="blue",
    ))

    settings = get_settings()
    orchestrator = CGAOrchestrator(settings=settings)

    while True:
        try:
            user_input = console.input("\n[bold green]You:[/bold green] ").strip()

            if not user_input:
                continue

            if user_input.lower() in ("exit", "quit", "q"):
                console.print("[yellow]Goodbye![/yellow]")
                break

            with console.status("[bold blue]Thinking...[/bold blue]"):
                response = asyncio.run(orchestrator.chat(user_input))

            console.print(f"\n[bold blue]CGA Agent:[/bold blue] {response}")

        except KeyboardInterrupt:
            console.print("\n[yellow]Session ended.[/yellow]")
            break


@app.command()
def version():
    """Show version information."""
    from pf_cga_agent import __version__
    console.print(f"PF-CGA-Agent version {__version__}")


if __name__ == "__main__":
    app()
