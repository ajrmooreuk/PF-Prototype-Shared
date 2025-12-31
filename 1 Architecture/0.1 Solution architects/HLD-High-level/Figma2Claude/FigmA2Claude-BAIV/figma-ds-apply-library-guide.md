# Apply Library to Figma Make Design

## Quick Guide: Binding Design System Tokens & Components

**Version:** 2.1.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2025  
**Purpose:** Apply published design system library (variables, components, styles) to Figma Make generated designs

---

## Overview

After pasting a Figma Make design into Figma, you need to bind it to your design system library. This connects the generated design to your tokens, components, and styles — enabling consistency, theming, and proper MCP extraction.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Figma Make     │────▶│  Figma Design   │────▶│  Library-Bound  │
│  (Generated)    │     │  (Pasted)       │     │  (Production)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │
                                ▼
                        Apply Library:
                        • Variables (tokens)
                        • Components
                        • Text styles
                        • Effect styles
```

---

## Step 1: Publish Your Library (One-Time Setup)

> Skip if library already published.

**In your design system file (e.g., BAIV Token Library):**

1. Open your design system file
2. Click **file name** (top-left corner)
3. Select **"Publish library..."**
4. Check items to publish:
   - ☑ Variables (color, spacing, typography tokens)
   - ☑ Components (buttons, cards, inputs, etc.)
   - ☑ Styles (text styles, effect styles)
5. Add version note (e.g., "BAIV v2.1.0")
6. Click **"Publish"**

```
┌─────────────────────────────────────────────────────────────────────┐
│  PUBLISH LIBRARY MODAL                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  BAIV Design System                                                 │
│                                                                      │
│  ☑ Variables                    154 variables                       │
│  ☑ Components                   24 components                       │
│  ☑ Styles                       18 styles                           │
│                                                                      │
│  Version note: BAIV v2.1.0 - Full token library                     │
│                                                                      │
│                                    [Cancel]  [Publish]              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 2: Enable Library in Design File

**In your Figma Make design file:**

1. Open the **Assets panel** (left sidebar) or press `Shift + I`
2. Click the **book icon** (📚 Libraries)
3. Find your library (e.g., "BAIV Design System")
4. **Toggle ON** ✓
5. Close the modal

```
┌─────────────────────────────────────────────────────────────────────┐
│  LIBRARIES MODAL                                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Your libraries                                                     │
│  ──────────────                                                     │
│                                                                      │
│  ☑ BAIV Design System              154 variables, 24 components    │
│    └── Enabled in this file                                         │
│                                                                      │
│  ☐ Material Design Kit             Not enabled                      │
│  ☐ iOS Design Kit                  Not enabled                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 3: Apply Color Variables

### Single Layer

1. **Select** layer (frame, shape, text)
2. In **right panel** → **Fill** section
3. Click the **color chip** (colored square)
4. Click **"Libraries"** tab (4-square icon)
5. Navigate to variable: `semantic/color/primary/default`
6. Click to apply

```
FILL PANEL
──────────

┌──────────────────────────────────┐
│  Fill                            │
│  ┌────┐                          │
│  │ ■  │ #00A4BF  100%           │ ← Click color chip
│  └────┘                          │
└──────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  [Document] [Libraries]          │ ← Click Libraries tab
│                                  │
│  ▼ BAIV Design System            │
│    ▼ semantic/color              │
│      ├── primary/default    ●    │ ← Select variable
│      ├── primary/hover      ●    │
│      ├── secondary/default  ●    │
│      └── accent/default     ●    │
└──────────────────────────────────┘
```

### Bulk Apply (Same Color)

1. **Select** parent frame or page
2. Go to **Edit** menu → **"Select All with Same Fill"**
   - Or: Right-click → **"Select all with same fill"**
3. All layers with that color are now selected
4. Apply variable once — updates all selected

---

## Step 4: Apply Spacing Variables

### Gap (Space Between Items)

1. **Select** Auto Layout frame
2. In **right panel** → **Auto Layout** section
3. Click the **gap field** (number input)
4. Click the **variable icon** (⬡ hexagon)
5. Select: `primitive/spacing/4` (16px)

### Padding

1. **Select** Auto Layout frame
2. Click **padding values** (top, right, bottom, left)
3. Click **variable icon** (⬡)
4. Select appropriate spacing token

```
AUTO LAYOUT PANEL
─────────────────

┌──────────────────────────────────┐
│  Auto layout                     │
│                                  │
│  Gap:     16  ⬡                 │ ← Click ⬡ for variables
│                                  │
│  Padding: 24  24  24  24  ⬡     │ ← Click ⬡ for variables
│           T   R   B   L          │
│                                  │
└──────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  ▼ BAIV Design System            │
│    ▼ primitive/spacing           │
│      ├── 1     (4px)             │
│      ├── 2     (8px)             │
│      ├── 3     (12px)            │
│      ├── 4     (16px)       ●    │ ← Select
│      ├── 6     (24px)            │
│      └── 8     (32px)            │
└──────────────────────────────────┘
```

---

## Step 5: Apply Text Styles

1. **Select** text layer(s)
2. In **right panel** → **Text** section
3. Click the **style name** (or 4-dot grid icon)
4. Browse library styles:
   - `Heading/H1`
   - `Heading/H2`
   - `Body/Default`
   - `Body/Small`
   - `Label/Button`
5. Click to apply

```
TEXT PANEL
──────────

┌──────────────────────────────────┐
│  Text                            │
│                                  │
│  Style: ┌─────────────────┐      │
│         │ Heading/H1    ▼ │      │ ← Click to open picker
│         └─────────────────┘      │
│                                  │
│  Titillium Web                   │
│  Bold · 36px · Auto              │
└──────────────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  ▼ BAIV Design System            │
│    ├── Heading/H1           Aa   │
│    ├── Heading/H2           Aa   │
│    ├── Heading/H3           Aa   │
│    ├── Body/Default         Aa   │
│    ├── Body/Small           Aa   │
│    └── Label/Button         Aa   │
└──────────────────────────────────┘
```

---

## Step 6: Apply Effect Styles (Shadows)

1. **Select** layer with shadow
2. In **right panel** → **Effects** section
3. Click the **style icon** (4-dot grid)
4. Select library effect:
   - `Shadow/SM`
   - `Shadow/MD`
   - `Shadow/LG`

---

## Step 7: Swap to Library Components

### Single Component

1. **Select** local component or frame
2. In **right panel** → **Instance** section (or Design section)
3. Click **component name**
4. Search for library component (e.g., "button/primary")
5. Click to swap

### Bulk Swap

1. **Select** multiple similar instances
2. **Right-click** → **"Swap instance"**
3. Search and select library component
4. All selected instances swap

```
INSTANCE SWAP
─────────────

Selected: Rectangle 1 (local)
                │
                ▼
┌──────────────────────────────────┐
│  Swap instance                   │
│                                  │
│  Search: button                  │
│                                  │
│  ▼ BAIV Design System            │
│    ├── button/primary       □    │ ← Select
│    ├── button/secondary     □    │
│    ├── button/outline       □    │
│    └── button/ghost         □    │
└──────────────────────────────────┘
```

---

## Step 8: Apply Border Radius Variables

1. **Select** frame or shape
2. In **right panel** → **Corner radius** field
3. Click **variable icon** (⬡)
4. Select: `primitive/borderRadius/md` (8px)

---

## Quick Reference Table

| Apply To | Location | Action |
|----------|----------|--------|
| **Fill color** | Fill → Color chip → Libraries | Select color variable |
| **Stroke color** | Stroke → Color chip → Libraries | Select color variable |
| **Gap** | Auto Layout → Gap → ⬡ | Select spacing variable |
| **Padding** | Auto Layout → Padding → ⬡ | Select spacing variable |
| **Text style** | Text → Style dropdown | Select text style |
| **Effect** | Effects → Style icon | Select effect style |
| **Border radius** | Corner radius → ⬡ | Select radius variable |
| **Component** | Instance → Name → Search | Swap to library component |

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Assets panel | `Shift + I` |
| Open Libraries | Assets → 📚 icon |
| Select all same fill | `Edit → Select All with Same Fill` |
| Select all same stroke | `Edit → Select All with Same Stroke` |
| Rename layer | `Cmd/Ctrl + R` |

---

## Bulk Application Workflow

For efficiently applying library to an entire Figma Make design:

```
1. ENABLE LIBRARY
   └── Assets → Libraries → Toggle ON

2. FIX COLORS (largest impact)
   └── Select parent frame
   └── Edit → Select All with Same Fill (#00A4BF)
   └── Apply: semantic/color/primary/default
   └── Repeat for secondary, accent, neutrals

3. FIX TYPOGRAPHY
   └── Select all H1s → Apply Heading/H1 style
   └── Select all body text → Apply Body/Default style
   └── Repeat for other text types

4. FIX SPACING
   └── Select Auto Layout frames one by one
   └── Bind gap and padding to spacing tokens

5. SWAP COMPONENTS
   └── Select buttons → Swap to button/primary
   └── Select cards → Swap to card/default
   └── Repeat for other components

6. VERIFY
   └── Check no hardcoded colors remain
   └── Check no default layer names remain
```

---

## Verification Checklist

After applying library:

```
☐ Library enabled in file
☐ All brand colors bound to semantic/color/* variables
☐ All neutral colors bound to variables
☐ All status colors (success, warning, error) bound
☐ All gaps use primitive/spacing/* variables
☐ All padding uses primitive/spacing/* variables
☐ All headings use Heading/* text styles
☐ All body text uses Body/* text styles
☐ All shadows use Shadow/* effect styles
☐ All border radii bound to primitive/borderRadius/*
☐ Reusable elements swapped to library components
☐ No "Frame 1", "Rectangle 1" default names remain
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Library not showing | Check it's published; refresh file |
| Variables not appearing | Ensure library toggled ON in this file |
| Can't apply variable | Check layer type supports that variable type |
| Style not applying | Ensure text layer selected (not frame) |
| Component won't swap | May need to detach instance first |

---

## Benefits of Library Binding

| Benefit | Description |
|---------|-------------|
| **Consistency** | All files use same tokens |
| **Theming** | Change library → all files update |
| **MCP Extraction** | Claude sees token names, not hex values |
| **Maintenance** | Update once, propagate everywhere |
| **Code Quality** | Generated code uses CSS variables |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.1.0 | Dec 2025 | Initial library application guide |
