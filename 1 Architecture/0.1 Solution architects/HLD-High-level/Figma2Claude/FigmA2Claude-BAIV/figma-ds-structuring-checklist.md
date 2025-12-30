# BAIV Figma Make Structuring Checklist

## Converting AI-Generated Layouts to BAIV Design System Standards

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2024

---

## The Goal

Transform raw Figma Make output into BAIV-compliant, token-bound structures:

```
❌ RAW OUTPUT                    ✅ BAIV STRUCTURED

Frame 1                          page/dashboard
├── Rectangle 1                  ├── header
├── Text 1                       │   ├── logo
├── Group 1                      │   └── nav/primary
└── Frame 2                      ├── section/stats
                                 │   └── card-grid
                                 │       ├── card/stat
                                 │       └── card/stat
                                 └── footer
```

---

## Phase 1: Initial Assessment

### 1.1 Analyze Generated Layout

- [ ] Count total layers
- [ ] Identify repeated patterns
- [ ] Note visual hierarchy
- [ ] Screenshot for reference

### 1.2 Map to BAIV Components

| Visual Element | BAIV Component | BAIV Token |
|----------------|----------------|------------|
| Primary button | `button/primary` | #00A4BF |
| Secondary button | `button/secondary` | #E84E1C |
| Accent badge | `badge/accent` | #CEC528 |
| Success alert | `alert/success` | #019587 |
| Card | `card/default` | tokens |

---

## Phase 2: Layer Naming

### 2.1 BAIV Naming Convention

```
{category}/{type}/{variant}
```

### 2.2 Page-Level Layers

| Layer Type | Pattern | Example |
|------------|---------|---------|
| Page | `page/{name}` | `page/dashboard` |
| Section | `section/{name}` | `section/hero` |
| Header | `header` | `header` |
| Footer | `footer` | `footer` |

### 2.3 BAIV Component Layers

| Layer Type | Pattern | Example |
|------------|---------|---------|
| Button Primary | `button/primary` | `button/primary` |
| Button Secondary | `button/secondary` | `button/secondary` |
| Button Accent | `button/accent` | `button/accent` |
| Card | `card/{variant}` | `card/stat` |
| Input | `input/{type}` | `input/text` |
| Badge | `badge/{variant}` | `badge/success` |
| Alert | `alert/{variant}` | `alert/info` |

### 2.4 Naming Checklist

- [ ] No "Frame 1", "Rectangle 2" names
- [ ] Lowercase with hyphens
- [ ] Slashes for hierarchy
- [ ] Semantic names (purpose, not appearance)

---

## Phase 3: Frame Architecture

### 3.1 Target Hierarchy

```
page/dashboard
├── header
│   └── container
│       ├── logo
│       ├── nav/primary
│       └── actions
├── main
│   ├── section/stats
│   │   └── container
│   │       └── card-grid
│   └── section/activity
│       └── container
└── footer
```

### 3.2 Rules

| Rule | Description |
|------|-------------|
| Semantic sections | `header`, `main`, `footer`, `sidebar` |
| Container wrappers | Max-width inside full-width sections |
| 3-level max | Page → Section → Component |
| Logical order | Layer order = visual order |

### 3.3 Checklist

- [ ] Root frame = `page/{name}`
- [ ] Major sections identified
- [ ] Containers added
- [ ] No orphan layers
- [ ] Nesting ≤ 3 levels

---

## Phase 4: Auto Layout Conversion

### 4.1 BAIV Auto Layout Settings

| Container | Direction | Gap Token | Padding Token |
|-----------|-----------|-----------|---------------|
| Page | Vertical | 0 | 0 |
| Header | Horizontal | `spacing/4` | `spacing/4` |
| Section | Vertical | `spacing/6` | `spacing/8` (y) |
| Card | Vertical | `spacing/3` | `spacing/4` |
| Button | Horizontal | `spacing/2` | `spacing/2`/`spacing/4` |
| Nav | Horizontal | `spacing/1` | 0 |
| Form | Vertical | `spacing/4` | 0 |

### 4.2 Checklist

- [ ] All containers use Auto Layout
- [ ] Direction set correctly
- [ ] Gap bound to spacing token
- [ ] Padding bound to spacing token
- [ ] No absolute positioning

---

## Phase 5: Apply BAIV Tokens

### 5.1 BAIV Color Bindings

| Property | Token | Hex |
|----------|-------|-----|
| Primary buttons | `semantic/color/primary/default` | #00A4BF |
| Primary hover | `semantic/color/primary/hover` | #008A9F |
| Primary active | `semantic/color/primary/active` | #005260 |
| Secondary buttons | `semantic/color/secondary/default` | #E84E1C |
| Accent elements | `semantic/color/accent/default` | #CEC528 |
| Success states | `semantic/color/success/default` | #019587 |
| Warning states | `semantic/color/warning/default` | #CF057D |
| Error states | `semantic/color/error/default` | #CEC528 |
| Info states | `semantic/color/info/default` | #1C3E8E |
| Neutral background | `semantic/color/background/brand` | #CCE8EE |
| Dark footer | `primitive/color/primary/800` | #005260 |

### 5.2 BAIV Typography

| Element | Font | Token Weight |
|---------|------|--------------|
| H1 | Titillium Web | bold (700) |
| H2 | Titillium Web | semibold (600) |
| H3 | Titillium Web | semibold (600) |
| Body | Open Sans | regular (400) |
| Body Bold | Open Sans | bold (700) |
| Label | Open Sans | medium (500) |

### 5.3 Token Checklist

- [ ] Primary #00A4BF bound (not hardcoded)
- [ ] Secondary #E84E1C bound
- [ ] Accent #CEC528 bound
- [ ] Status colors bound
- [ ] Neutral #CCE8EE bound
- [ ] Headings use Titillium Web
- [ ] Body uses Open Sans
- [ ] All gaps use spacing tokens
- [ ] All radii use radius tokens
- [ ] No hex values remain

---

## Phase 6: Component Extraction

### 6.1 BAIV Core Components

| Priority | Component | Variants |
|----------|-----------|----------|
| 1 | Button | primary, secondary, accent, outline, ghost |
| 2 | Card | default, stat, feature |
| 3 | Input | text, password, search |
| 4 | Badge | default, success, warning, error, info |
| 5 | Alert | success, warning, error, info |
| 6 | Avatar | xs, sm, md, lg |
| 7 | Nav Item | default, active |

### 6.2 Extraction Checklist

- [ ] Repeated elements are components
- [ ] Named `category/name/variant`
- [ ] Variants created
- [ ] Components use BAIV tokens

---

## Phase 7: Responsive Setup

### 7.1 Resizing Rules

| Element | Width | Height |
|---------|-------|--------|
| Page | Fill | Hug |
| Section | Fill | Hug |
| Container | Fill + max-width | Hug |
| Card (grid) | Fill | Hug |
| Button | Hug | Fixed |
| Input | Fill | Fixed |

### 7.2 Checklist

- [ ] Containers Fill width
- [ ] Content Hugs height
- [ ] Max-width on containers (1280px)

---

## Phase 8: Quality Assurance

### 8.1 BAIV Color Verification

| Element | Expected |
|---------|----------|
| Primary actions | #00A4BF |
| Secondary actions | #E84E1C |
| Accent highlights | #CEC528 |
| Success indicators | #019587 |
| Warning indicators | #CF057D |
| Info indicators | #1C3E8E |
| Footer background | #005260 |

### 8.2 Typography Verification

| Element | Expected Font |
|---------|---------------|
| All headings | Titillium Web |
| All body text | Open Sans |

### 8.3 Final Checklist

- [ ] No default layer names
- [ ] All BAIV colors token-bound
- [ ] Correct fonts applied
- [ ] All containers use Auto Layout
- [ ] Components extracted
- [ ] Layer order = visual order
- [ ] File saved

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  1. ASSESS          2. NAME             3. STRUCTURE                │
│  ─────────          ──────              ───────────                 │
│  • Map to BAIV      • BAIV naming       • Semantic hierarchy        │
│  • Find patterns    • category/type     • 3-level max               │
│                                                                      │
│  4. AUTO LAYOUT     5. BAIV TOKENS      6. COMPONENTS               │
│  ─────────────      ───────────         ───────────                 │
│  • Convert frames   • #00A4BF primary   • Extract repeated          │
│  • Bind spacing     • #E84E1C secondary • Add variants              │
│                     • Titillium/Open Sans                           │
│                                                                      │
│  7. RESPONSIVE      8. QA                                           │
│  ─────────────      ─────                                           │
│  • Fill/Hug/Fixed   • BAIV colors ✓                                 │
│  • Max-width        • Fonts ✓                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Time Estimates

| Phase | Simple | Medium | Complex |
|-------|--------|--------|---------|
| Assessment | 5 min | 10 min | 20 min |
| Naming | 10 min | 20 min | 40 min |
| Structure | 10 min | 25 min | 50 min |
| Auto Layout | 10 min | 20 min | 40 min |
| BAIV Tokens | 15 min | 30 min | 60 min |
| Components | 10 min | 30 min | 60 min |
| Responsive | 5 min | 15 min | 30 min |
| QA | 10 min | 20 min | 40 min |
| **Total** | **~75 min** | **~3 hrs** | **~6 hrs** |

---

## BAIV Quick Reference

### Brand Colors
| Color | Hex |
|-------|-----|
| Primary | #00A4BF |
| Primary Dark | #005260 |
| Secondary | #E84E1C |
| Accent | #CEC528 |
| Neutral | #CCE8EE |

### Status Colors
| Color | Hex |
|-------|-----|
| Success | #019587 |
| Warning | #CF057D |
| Error | #CEC528 |
| Info | #1C3E8E |

### Typography
| Type | Font |
|------|------|
| Headings | Titillium Web |
| Body | Open Sans |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand integration |
| 1.0.0 | Dec 2024 | Initial checklist |
