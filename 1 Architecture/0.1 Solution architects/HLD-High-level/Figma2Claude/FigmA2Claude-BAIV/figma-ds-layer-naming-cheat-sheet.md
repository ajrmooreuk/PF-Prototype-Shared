# BAIV Layer Naming Cheat Sheet

## Quick Reference for Figma Design System Layers

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2024

---

## Naming Pattern

```
{category}/{type}/{variant}/{state}
```

Use **lowercase**, **hyphens**, and **forward slashes**

---

## Page & Section Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| Page | `page/{name}` | `page/dashboard`, `page/settings` |
| Section | `section/{name}` | `section/hero`, `section/features` |
| Header | `header` | `header`, `header/sticky` |
| Footer | `footer` | `footer` |
| Sidebar | `sidebar/{position}` | `sidebar/left`, `sidebar/right` |
| Modal | `modal/{name}` | `modal/login`, `modal/confirm` |

---

## Layout Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| Container | `container/{size}` | `container/lg`, `container/full` |
| Grid | `grid/{columns}` | `grid/2-col`, `grid/3-col` |
| Stack | `stack/{direction}` | `stack/vertical`, `stack/horizontal` |
| Row | `row` | `row`, `row/spaced` |
| Spacer | `spacer/{size}` | `spacer/lg` |
| Divider | `divider` | `divider`, `divider/subtle` |

---

## Content Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| Heading | `heading/{level}` | `heading/h1`, `heading/h2` |
| Body | `body/{size}` | `body/large`, `body/default` |
| Caption | `caption` | `caption` |
| Label | `label/{context}` | `label/form` |
| Link | `link/{variant}` | `link/inline`, `link/standalone` |

---

## BAIV Component Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| Button Primary | `button/primary` | `button/primary`, `button/primary/hover` |
| Button Secondary | `button/secondary` | `button/secondary` |
| Button Accent | `button/accent` | `button/accent` |
| Button Ghost | `button/ghost` | `button/ghost` |
| Input | `input/{type}` | `input/text`, `input/search` |
| Card | `card/{variant}` | `card/default`, `card/stat` |
| Avatar | `avatar/{size}` | `avatar/sm`, `avatar/lg` |
| Badge | `badge/{variant}` | `badge/success`, `badge/warning` |
| Icon | `icon/{name}` | `icon/menu`, `icon/close` |

---

## BAIV Status Components

| Element | Pattern | Token Color |
|---------|---------|-------------|
| Alert Success | `alert/success` | #019587 |
| Alert Warning | `alert/warning` | #CF057D |
| Alert Error | `alert/error` | #CEC528 |
| Alert Info | `alert/info` | #1C3E8E |
| Badge Success | `badge/success` | #019587 |
| Badge Warning | `badge/warning` | #CF057D |
| Badge Error | `badge/error` | #CEC528 |
| Badge Info | `badge/info` | #1C3E8E |

---

## Navigation Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| Nav | `nav/{type}` | `nav/primary`, `nav/sidebar` |
| Nav Item | `nav-item/{state}` | `nav-item/default`, `nav-item/active` |
| Breadcrumb | `breadcrumb` | `breadcrumb` |
| Tabs | `tabs` | `tabs` |
| Tab | `tab/{state}` | `tab/default`, `tab/active` |

---

## Form Layers

| Element | Pattern | Examples |
|---------|---------|----------|
| Form | `form/{name}` | `form/login`, `form/settings` |
| Form Field | `field/{name}` | `field/email`, `field/password` |
| Form Group | `form-group` | `form-group` |
| Error | `error/{field}` | `error/email` |
| Helper | `helper/{field}` | `helper/password` |

---

## State Suffixes

| State | Suffix | Example |
|-------|--------|---------|
| Default | (none) | `button/primary` |
| Hover | `/hover` | `button/primary/hover` |
| Active | `/active` | `button/primary/active` |
| Focus | `/focus` | `input/text/focus` |
| Disabled | `/disabled` | `button/primary/disabled` |
| Error | `/error` | `input/text/error` |

---

## Internal Component Parts

Use underscore prefix:

```
button/primary
├── _icon
├── _label
└── _bg
```

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| `Frame 1` | `page/dashboard` |
| `Rectangle 1` | `card` or `_bg` |
| `Text 1` | `heading/h1` |
| `Group 1` | `nav/primary` |
| `tealButton` | `button/primary` |
| `BAIVCard` | `card/default` |

---

## BAIV Quick Reference

### Brand Colors
| Name | Hex | Token |
|------|-----|-------|
| Primary | #00A4BF | `semantic/color/primary/default` |
| Primary Dark | #005260 | `semantic/color/primary/active` |
| Secondary | #E84E1C | `semantic/color/secondary/default` |
| Accent | #CEC528 | `semantic/color/accent/default` |
| Neutral | #CCE8EE | `semantic/color/background/brand` |

### Status Colors
| Name | Hex | Token |
|------|-----|-------|
| Success | #019587 | `semantic/color/success/default` |
| Warning | #CF057D | `semantic/color/warning/default` |
| Error | #CEC528 | `semantic/color/error/default` |
| Info | #1C3E8E | `semantic/color/info/default` |

### Typography
| Element | Font |
|---------|------|
| Headings | Titillium Web |
| Body | Open Sans |

---

## Quick Rules

1. **Semantic over visual** — name what it IS, not how it looks
2. **Lowercase always** — `button/primary` not `Button/Primary`
3. **Hyphens for multi-word** — `nav-item` not `navItem`
4. **Slashes for hierarchy** — `button/primary/hover`
5. **No spaces** — ever
6. **Underscore for internal** — `_icon`, `_label`
7. **Remove defaults** — no "Frame", "Rectangle", "Group"

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand integration |
| 1.0.0 | Dec 2024 | Initial cheat sheet |
