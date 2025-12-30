# BAIV 10-Point Plan Enforcement Guide

## Ensuring Design System Compliance in Figma Make Workflow

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2024

---

## Enforcement Strategy

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BAIV ENFORCEMENT LAYERS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  LAYER 1: INPUT         Constrain prompts with BAIV specs           │
│  LAYER 2: ENVIRONMENT   Pre-configure with BAIV tokens              │
│  LAYER 3: VALIDATION    Check BAIV color/font compliance            │
│  LAYER 4: REMEDIATION   Fix violations to BAIV standards            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Input Enforcement

### BAIV Mandatory Prompt Block

Include in every Figma Make prompt:

```
BAIV BRAND SPECIFICATION:
─────────────────────────
Colors:
- Primary: #00A4BF (teal)
- Primary Dark: #005260
- Secondary: #E84E1C (orange)
- Accent: #CEC528 (gold)
- Neutral: #CCE8EE (light teal)

Status:
- Success: #019587
- Warning: #CF057D
- Error: #CEC528
- Info: #1C3E8E

Typography:
- Headings: Titillium Web (400, 600, 700)
- Body: Open Sans (400, 700)
```

### Prompt Validation Gate

| Check | Required |
|-------|----------|
| BAIV colors specified | ✅ |
| Font families included | ✅ |
| All sections listed | ✅ |
| Layout defined | ✅ |

**If any fails → revise before generating**

---

## Layer 2: Environment Enforcement

### BAIV Template File Structure

```
📁 BAIV Design File
├── 📄 Cover (BAIV branding)
├── 📄 —— BAIV Tokens —— (reference)
├── 📄 —— Components —— (BAIV components)
├── 📄 🚧 Figma Make Output
└── 📄 ✅ Production Ready
```

### Environment Checklist

- [ ] BAIV token library enabled
- [ ] BAIV colors visible in library
- [ ] Titillium Web available
- [ ] Open Sans available

---

## Layer 3: Validation Enforcement

### BAIV Color Verification

| Element | Expected Color | Token |
|---------|----------------|-------|
| Primary buttons | #00A4BF | `semantic/color/primary/default` |
| Secondary buttons | #E84E1C | `semantic/color/secondary/default` |
| Accent badges | #CEC528 | `semantic/color/accent/default` |
| Success states | #019587 | `semantic/color/success/default` |
| Warning states | #CF057D | `semantic/color/warning/default` |
| Info states | #1C3E8E | `semantic/color/info/default` |
| Neutral bg | #CCE8EE | `semantic/color/background/brand` |
| Dark footer | #005260 | `semantic/color/primary/active` |

### Typography Verification

| Element | Font | Weight |
|---------|------|--------|
| H1 | Titillium Web | 700 |
| H2 | Titillium Web | 600 |
| H3 | Titillium Web | 600 |
| Body | Open Sans | 400 |
| Body Bold | Open Sans | 700 |
| Labels | Open Sans | 500 |

### Validation Checklist

| Point | Check | How to Verify |
|-------|-------|---------------|
| 2 | BAIV library enabled | Assets → Libraries → ON |
| 3 | Frame architecture | Semantic section names |
| 4 | Naming | Search "Frame", "Rectangle" |
| 5 | Auto Layout | AL indicator on containers |
| 6 | BAIV tokens | Click fills → #00A4BF shows token |
| 7 | Components | Repeated = component |
| 8 | Responsive | Fill/Hug correctly set |

### Violation Detection

```
SEARCH FOR:              INDICATES:
────────────────────────────────────────
"Frame"                  Default naming
"Rectangle"              Default naming
#3B82F6                  Wrong blue (not BAIV)
#EF4444                  Wrong red (not BAIV)
Inter, Arial, Roboto     Wrong font (not BAIV)
```

---

## Layer 4: Remediation Enforcement

### BAIV Color Fixes

| Wrong Color | Replace With |
|-------------|--------------|
| Any blue not #00A4BF | `semantic/color/primary/default` |
| Any orange not #E84E1C | `semantic/color/secondary/default` |
| Any gold/yellow not #CEC528 | `semantic/color/accent/default` |
| Any green not #019587 | `semantic/color/success/default` |
| Any pink/magenta not #CF057D | `semantic/color/warning/default` |
| Any navy not #1C3E8E | `semantic/color/info/default` |

### Typography Fixes

| Wrong Font | Replace With |
|------------|--------------|
| Inter (headings) | Titillium Web |
| Roboto (headings) | Titillium Web |
| Arial (body) | Open Sans |
| Helvetica (body) | Open Sans |

### Quick Remediation Steps

**Wrong Primary Color:**
```
1. Select all layers with wrong blue
2. Click fill → Variables
3. Select: semantic/color/primary/default
4. Verify #00A4BF applied
```

**Wrong Font:**
```
1. Select text layers
2. Change font family to Titillium Web (headings) or Open Sans (body)
3. Verify correct weight (400, 600, 700)
```

---

## Enforcement Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  PROMPT        ──── Gate 1: BAIV specs included?                    │
│     │                                                               │
│     ▼ Pass                                                          │
│  FILE SETUP    ──── Gate 2: BAIV library enabled?                   │
│     │                                                               │
│     ▼ Pass                                                          │
│  FIGMA MAKE    ──── Generate                                        │
│     │                                                               │
│     ▼                                                               │
│  VALIDATION    ──── Gate 3: BAIV colors correct?                    │
│     │                                                               │
│   ┌─┴─┐                                                             │
│   ▼   ▼                                                             │
│ Pass  Fail                                                          │
│   │    │                                                            │
│   │    ▼                                                            │
│   │  REMEDIATE ──── Fix to BAIV standards                           │
│   │    │                                                            │
│   │    ▼                                                            │
│   │  < 30 min? ──── Yes → Loop back                                │
│   │    │                                                            │
│   │    No → Regenerate with better prompt                          │
│   │                                                                 │
│   ▼                                                                 │
│  PRE-CHECK     ──── Gate 4: All BAIV tokens bound?                  │
│     │                                                               │
│     ▼ Pass                                                          │
│  MCP + CLAUDE  ──── Generate BAIV code                              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## BAIV Enforcement Checklist

```
┌─────────────────────────────────────────────────────────────────────┐
│  BAIV ENFORCEMENT CHECKLIST                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  BEFORE GENERATION                                                  │
│  ☐ BAIV brand colors in prompt                                      │
│  ☐ Titillium Web + Open Sans specified                              │
│  ☐ BAIV token library enabled                                       │
│  ☐ Template file ready                                              │
│                                                                      │
│  AFTER GENERATION                                                   │
│  ☐ Primary #00A4BF (not other blues)                                │
│  ☐ Secondary #E84E1C (not other oranges)                            │
│  ☐ Accent #CEC528 (not other yellows)                               │
│  ☐ Success #019587                                                  │
│  ☐ Warning #CF057D                                                  │
│  ☐ Info #1C3E8E                                                     │
│  ☐ Headings use Titillium Web                                       │
│  ☐ Body uses Open Sans                                              │
│  ☐ No default layer names                                           │
│  ☐ All containers have Auto Layout                                  │
│                                                                      │
│  BEFORE MCP                                                         │
│  ☐ All BAIV tokens bound (no hex)                                   │
│  ☐ Light/Dark mode works                                            │
│  ☐ File saved                                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## BAIV Quick Reference

### Brand Colors
| Name | Hex | CSS Variable |
|------|-----|--------------|
| Primary | #00A4BF | `--baiv-primary` |
| Primary Dark | #005260 | `--baiv-primary-dark` |
| Secondary | #E84E1C | `--baiv-secondary` |
| Accent | #CEC528 | `--baiv-accent` |
| Neutral | #CCE8EE | `--baiv-neutral` |

### Status Colors
| Name | Hex | CSS Variable |
|------|-----|--------------|
| Success | #019587 | `--baiv-success` |
| Warning | #CF057D | `--baiv-warning` |
| Error | #CEC528 | `--baiv-error` |
| Info | #1C3E8E | `--baiv-info` |

### Typography
| Type | Font | Weights |
|------|------|---------|
| Headings | Titillium Web | 400, 600, 700 |
| Body | Open Sans | 400, 700 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand integration |
| 1.0.0 | Dec 2024 | Initial enforcement guide |
