# 🧩 shadcn Figma Component Generator

## Overview

This tool converts shadcn/ui React components into Figma components programmatically. It's the first step toward **code-to-design automation** for design systems.

## What's Included

### MVP: Breadcrumb Component

| Component | Type | Description |
|-----------|------|-------------|
| `BreadcrumbLink / Default` | Atom | Muted link text |
| `BreadcrumbLink / Hover` | Atom | Foreground link text (hover state) |
| `BreadcrumbPage` | Atom | Current page text (medium weight) |
| `BreadcrumbSeparator` | Atom | Chevron right icon |
| `BreadcrumbEllipsis` | Atom | Three dots for collapsed items |
| `BreadcrumbItem` | Molecule | Link + Separator |
| `BreadcrumbList` | Organism | Collection of items |
| `Breadcrumb` | Template | Full breadcrumb nav |

### Design Token Mappings

```
┌─────────────────────────────────────────────────────────────────┐
│ SHADCN CSS VARIABLE          → FIGMA IMPLEMENTATION             │
├─────────────────────────────────────────────────────────────────┤
│ --foreground                 → Color Variable (light/dark mode) │
│ --muted-foreground           → Color Variable (light/dark mode) │
│ text-sm (14px)               → Font Size 14                     │
│ gap-1.5 (6px)                → Auto-layout itemSpacing: 6       │
│ font-medium                  → Inter Medium                     │
│ ChevronRight (lucide)        → Vector path                      │
│ MoreHorizontal (lucide)      → Ellipse group                    │
└─────────────────────────────────────────────────────────────────┘
```

## Usage Options

### Option 1: Quick Paste (Recommended for Testing)

1. Open Figma Desktop
2. Go to **Plugins → Development → Open Console**
3. Copy contents of `paste-in-figma-console.js`
4. Paste and press Enter

### Option 2: Install as Plugin

1. In Figma: **Plugins → Development → Import plugin from manifest**
2. Select the `plugin/manifest.json` file
3. Run via **Plugins → Development → shadcn Component Generator**

### Option 3: Integrate into Claude Code Workflow

```bash
# Future: Run directly via Claude Code
claude code --figma generate shadcn/breadcrumb
```

## Generated Component Structure

```
🧩 shadcn/Breadcrumb Component Set
├── ⚛️ Atomic Components
│   ├── BreadcrumbLink / Default
│   ├── BreadcrumbLink / Hover
│   ├── BreadcrumbPage
│   ├── BreadcrumbSeparator
│   └── BreadcrumbEllipsis
├── 🧱 Composite Components
│   ├── BreadcrumbItem
│   ├── BreadcrumbList
│   └── Breadcrumb
└── 📖 Usage Example
    └── Home > Docs > Components > Breadcrumb
```

## Post-Generation Steps

1. **Move to Library**: Drag components to your design system file
2. **Bind Variables**: Connect fills to Figma color variables for theming
3. **Add Variants**: Create component set with all states
4. **Publish**: Make available to your team

## Extending the Generator

### Adding New Components

1. Copy the breadcrumb generator pattern
2. Map shadcn component structure to Figma primitives
3. Extract design tokens from shadcn CSS
4. Implement using Figma Plugin API

### Component Mapping Reference

| shadcn Element | Figma Equivalent |
|----------------|------------------|
| `<nav>` | Frame with layoutMode |
| `<ol>` | Frame with auto-layout |
| `<li>` | Frame (item container) |
| `<a>` | Text with fills |
| `<span>` | Text |
| SVG icon | VectorNode or Frame with shapes |
| Tailwind classes | Frame properties + Variable bindings |

## Roadmap

- [ ] **Button** component (with all variants)
- [ ] **Input** component (with states)
- [ ] **Card** component
- [ ] **Dialog** component
- [ ] **Table** component
- [ ] Variable collection auto-generation
- [ ] Dark mode support
- [ ] Figma Code Connect integration

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SHADCN → FIGMA PIPELINE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  shadcn/ui Source                                               │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Parse React  │ → │ Extract      │ → │ Generate     │      │
│  │ Component    │    │ Tokens +     │    │ Figma API    │      │
│  │ Structure    │    │ Structure    │    │ Calls        │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                 │               │
│                                                 ▼               │
│                                          Figma Components       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Integration with PF Tools

This generator can be enhanced with:

- **Figma MCP**: Inspect existing designs for token extraction
- **Code Connect**: Generate bidirectional mappings
- **Claude Code**: Orchestrate the full pipeline

## License

MIT - Use freely in your design system automation

---

*Part of the PF Tools suite for AI-led design-to-development automation*
