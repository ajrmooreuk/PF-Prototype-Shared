# BAIV Brand Tokens Export

## Multi-Format Design Token Files

This package contains design tokens in multiple formats for two brand variants:
- **NovaTech** - Technology/Enterprise brand
- **Be AI Visible (BAIV)** - AI Visibility brand

---

## Files Included

| File | Purpose | Use With |
|------|---------|----------|
| `tokens.json` | W3C Design Tokens format | Figma (via Tokens Studio or Design Tokens to Variables plugin) |
| `figma-variables.json` | Figma REST API format | Figma Variables API / automation scripts |
| `globals.css` | CSS Custom Properties | Next.js / any web project |
| `tailwind.config.js` | Tailwind theme extension | Tailwind CSS projects |

---

## Quick Start

### Option 1: Import to Figma (Free Plugin Required)

1. Install "Design Tokens to Variables" plugin from Figma Community
2. Open your Figma file
3. Run the plugin
4. Paste contents of `tokens.json`
5. Click "Convert" → Variables created!

### Option 2: Use CSS Variables Directly

1. Copy `globals.css` content to your project's `globals.css`
2. Use variables: `background: var(--primary);`
3. Switch themes by changing `data-theme` attribute

### Option 3: Figma Variables API (Programmatic)

1. Use `figma-variables.json` with Figma REST API
2. POST to `/v1/files/:file_key/variables`
3. Variables created automatically

---

## Brand Comparison

| Property | NovaTech | Be AI Visible |
|----------|----------|---------------|
| **Primary** | #3B82F6 (Blue) | #00a4bf (Teal) |
| **Secondary** | #8B5CF6 (Purple) | #e84e1c (Orange) |
| **Accent** | #EC4899 (Pink) | #cec528 (Gold) |
| **Heading Font** | Inter | Open Sans |
| **Body Font** | Space Grotesk | Titillium Web |
| **Style** | Modern Tech | Warm Professional |

