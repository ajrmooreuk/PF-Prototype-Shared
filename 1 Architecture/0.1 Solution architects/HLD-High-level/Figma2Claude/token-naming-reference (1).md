# Figma Token Naming Quick Reference

## Naming Convention

```
{category}/{subcategory}/{variant}/{state}
```

---

## Color Tokens

### Primitives
```
primitive/color/{hue}/{scale}

Examples:
primitive/color/gray/50
primitive/color/gray/500
primitive/color/gray/950
primitive/color/blue/600
primitive/color/red/500
```

### Semantic
```
semantic/color/{role}/{variant}

Examples:
semantic/color/background/default
semantic/color/background/subtle
semantic/color/foreground/default
semantic/color/foreground/muted
semantic/color/border/default
semantic/color/primary/default
semantic/color/primary/hover
semantic/color/destructive/default
```

### Component
```
component/{component}/{variant}/{property}

Examples:
component/button/primary/background
component/button/primary/text
component/input/border
component/card/background
```

---

## Spacing Tokens

### Primitives
```
primitive/spacing/{scale}

Examples:
primitive/spacing/0
primitive/spacing/1      → 4px
primitive/spacing/2      → 8px
primitive/spacing/4      → 16px
primitive/spacing/8      → 32px
```

### Semantic
```
semantic/spacing/{context}/{direction}

Examples:
semantic/spacing/page/x
semantic/spacing/page/y
semantic/spacing/section
semantic/spacing/card/padding
semantic/spacing/button/x
```

---

## Typography Tokens

### Font Families
```
primitive/typography/fontFamily/{type}

Examples:
primitive/typography/fontFamily/sans
primitive/typography/fontFamily/serif
primitive/typography/fontFamily/mono
```

### Font Sizes
```
primitive/typography/fontSize/{scale}

Examples:
primitive/typography/fontSize/xs     → 12px
primitive/typography/fontSize/sm     → 14px
primitive/typography/fontSize/base   → 16px
primitive/typography/fontSize/lg     → 18px
primitive/typography/fontSize/2xl    → 24px
```

### Font Weights
```
primitive/typography/fontWeight/{weight}

Examples:
primitive/typography/fontWeight/regular
primitive/typography/fontWeight/medium
primitive/typography/fontWeight/semibold
primitive/typography/fontWeight/bold
```

---

## Border Radius Tokens

```
primitive/borderRadius/{size}

Examples:
primitive/borderRadius/none    → 0
primitive/borderRadius/sm      → 2px
primitive/borderRadius/md      → 6px
primitive/borderRadius/lg      → 8px
primitive/borderRadius/xl      → 12px
primitive/borderRadius/full    → 9999px
```

---

## Sizing Tokens

```
semantic/sizing/{element}/{size}

Examples:
semantic/sizing/icon/sm
semantic/sizing/icon/md
semantic/sizing/icon/lg
semantic/sizing/avatar/sm
semantic/sizing/avatar/lg
```

---

## Token Hierarchy

```
┌─────────────────────────────────────┐
│           COMPONENT                  │  Most specific
│   component/button/primary/bg        │
├─────────────────────────────────────┤
│           SEMANTIC                   │  Context-aware
│   semantic/color/primary/default     │
├─────────────────────────────────────┤
│           PRIMITIVE                  │  Raw values
│   primitive/color/blue/600           │
└─────────────────────────────────────┘
```

---

## Mode Naming

```
Collection: Colors
├── Light        (default)
├── Dark
└── High Contrast (optional)

Collection: Spacing
├── Default      (default)
├── Compact
└── Comfortable

Collection: Border Radius
├── Default      (default)
├── Sharp        (reduced radius)
└── Rounded      (increased radius)
```

---

## Anti-Patterns to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| `blue-500` | `primitive/color/blue/500` |
| `primaryColor` | `semantic/color/primary/default` |
| `btnBg` | `component/button/primary/background` |
| `sm-padding` | `primitive/spacing/2` |
| `heading1` | `textStyle/heading/h1` |

---

## Figma Variable Path Limits

- Maximum nesting: 4 levels deep
- Maximum name length: 256 characters
- Use `/` as separator (not `.` or `-`)
- No spaces in names

---

## Code Syntax Examples

| Platform | Format |
|----------|--------|
| Web CSS | `var(--color-primary-default)` |
| Tailwind | `text-primary-default` |
| iOS Swift | `Color.primaryDefault` |
| Android | `R.color.primary_default` |
| React Native | `colors.primary.default` |
