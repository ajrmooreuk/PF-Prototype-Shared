# BAIV Figma Make Prompt Templates

## AI Prompts for BAIV Platform UI Generation

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2024

---

## BAIV Brand Specification Block

**Include this in every prompt:**

```
BAIV BRAND SPECIFICATION:
─────────────────────────
Colors:
- Primary: #00A4BF (teal) - main brand, CTAs
- Primary Dark: #005260 - active states
- Secondary: #E84E1C (orange) - secondary actions
- Accent: #CEC528 (gold) - highlights, badges
- Neutral: #CCE8EE (light teal) - backgrounds

Status:
- Success: #019587 (teal-green)
- Warning: #CF057D (magenta)
- Error: #CEC528 (gold)
- Info: #1C3E8E (navy)

Typography:
- Headings: Titillium Web (400, 600, 700)
- Body: Open Sans (400, 700)

Style: Professional, modern, AI-forward
```

---

## Template 1: BAIV Dashboard

```
Create a BAIV platform dashboard with:

HEADER:
- BAIV logo placeholder left
- Primary nav: Dashboard, Analytics, Content, Campaigns, Settings
- Search input with icon
- Notifications bell icon
- User avatar with dropdown right
- Background: white
- Border: subtle gray bottom

SIDEBAR (left, 240px):
- Background: light teal (#CCE8EE)
- Section: "Main"
  - Dashboard (active, teal highlight)
  - Analytics
  - Content Library
- Section: "Tools"
  - AI Writer
  - Image Generator
  - SEO Optimizer
- Section: "Account"
  - Settings
  - Help
  - Logout
- Each item: icon + label
- Active state: teal (#00A4BF) background, white text

MAIN CONTENT:
- Page title "Dashboard" (Titillium Web, bold, 36px)
- Welcome message (Open Sans)

- Stats Row (4 cards):
  - Card 1: "Total Views" - number, trend arrow, teal icon
  - Card 2: "Engagement" - percentage, trend, orange icon
  - Card 3: "AI Credits" - number, progress bar
  - Card 4: "Published" - number, gold badge

- Chart Section (2/3 width):
  - Title: "Performance Overview"
  - Line chart placeholder
  - Teal primary line, orange secondary

- Activity Feed (1/3 width):
  - Title: "Recent Activity"
  - 5 activity items with timestamps
  - Status badges (success green, info navy)

- Quick Actions Row:
  - Button: "Create Content" (primary teal)
  - Button: "Generate Image" (secondary orange)
  - Button: "Run Analysis" (outline)

FOOTER:
- Background: dark teal (#005260)
- Text: white/light teal
- Copyright: "© 2024 BAIV - Be AI Visible"
- Links: Privacy, Terms, Support

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Template 2: BAIV Landing Page

```
Create a BAIV marketing landing page with:

HEADER (sticky):
- BAIV logo left
- Nav center: Features, Pricing, Resources, About
- CTA button right: "Get Started" (teal #00A4BF)
- Background: white, shadow on scroll

HERO SECTION:
- Background: gradient from white to light teal (#CCE8EE)
- Headline: "Be AI Visible" (Titillium Web, bold, 60px)
- Subheadline: "Transform your digital presence with AI-powered content" (Open Sans, 20px)
- Primary CTA: "Start Free Trial" (teal button, large)
- Secondary CTA: "Watch Demo" (outline button)
- Hero image: abstract AI visualization placeholder

SOCIAL PROOF:
- "Trusted by 10,000+ businesses"
- Logo strip placeholder (6 logos, grayscale)

FEATURES SECTION:
- Section title: "Powerful AI Features" (centered, Titillium Web)
- 3-column grid of feature cards:
  - Card 1: Teal icon, "AI Content Generation"
  - Card 2: Orange icon, "Smart Analytics"
  - Card 3: Gold icon, "SEO Optimization"

PRICING SECTION:
- Section title: "Simple, Transparent Pricing"
- 3 pricing cards:
  - Starter ($29/mo) - teal CTA
  - Professional ($79/mo) - orange "Popular" badge
  - Enterprise (Custom) - outline CTA

CTA SECTION:
- Background: dark teal (#005260)
- Headline: "Ready to Be AI Visible?" (white)
- Email input + CTA button (orange #E84E1C)

FOOTER:
- Background: navy (#1C3E8E)
- 4 columns: Logo, Product, Company, Resources
- Copyright, legal links

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Template 3: BAIV Settings Page

```
Create a BAIV platform settings page with:

HEADER:
- BAIV logo left
- Breadcrumb: Dashboard > Settings
- User avatar right

SIDEBAR NAVIGATION (left):
- Background: white, right border
- Active item: teal left border, teal text
- Items: Profile (active), Account, Security, Notifications, Billing, API Keys, Team

MAIN CONTENT:
- Page title: "Profile Settings" (Titillium Web, bold)
- Subtitle: "Manage your personal information" (Open Sans, muted)

SECTION: Profile Photo
- Large avatar (80px)
- "Upload Photo" button (outline)
- "Remove" link

SECTION: Personal Information
- Form card with fields:
  - First Name, Last Name (2-column)
  - Email (with verified badge)
  - Phone, Company, Job Title
- Teal focus borders on inputs

SECTION: Preferences
- Toggle switches (teal when on):
  - Email notifications
  - Marketing emails
  - Product updates

FORM ACTIONS:
- "Cancel" (ghost button)
- "Save Changes" (primary teal)

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Template 4: BAIV AI Content Generator

```
Create a BAIV AI content generation interface with:

HEADER:
- BAIV logo
- Nav: Dashboard, AI Tools (active), Content Library
- Credits: "250 credits" with gold icon
- User avatar

MAIN LAYOUT (2 columns):

LEFT PANEL (Input, 40%):
- Title: "AI Content Generator"
- Card: Content Settings
  - Select: Content Type
  - Select: Tone
  - Select: Length
  - Input: Target Keywords
- Card: Topic Input (large textarea)
- "Generate Content" button (primary teal, large)

RIGHT PANEL (Output, 60%):
- Title: "Generated Content"
- Tabs: Result | SEO Analysis | History
- Output Card with toolbar (Copy, Edit, Save)
- SEO Score (circular progress, teal)
- Action buttons: Save, Export, Publish

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Template 5: BAIV Analytics Dashboard

```
Create a BAIV analytics dashboard with:

HEADER:
- BAIV logo
- Date range picker
- Export button
- User avatar

FILTERS BAR:
- Platform filter, Metric filter, Compare toggle

STATS ROW (4 cards):
- Total Reach (with trend arrow)
- Engagement Rate (percentage)
- AI Score (circular progress, teal)
- Content Published (with gold badge)

CHARTS (2x2 grid):
- Visibility Over Time (line chart, teal line)
- Traffic Sources (donut chart)
- Top Content (horizontal bars)
- Audience Demographics (stacked bars)

DATA TABLE:
- Columns: Title, Views, Engagement, AI Score, Status
- Status badges (success/warning colors)
- Pagination

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Template 6: BAIV Onboarding Flow

```
Create a BAIV onboarding wizard with:

LAYOUT:
- Split screen: left illustration (40%), right form (60%)
- Progress indicator (4 steps)

LEFT PANEL:
- Gradient: teal to dark teal
- BAIV logo (white)
- AI illustration placeholder

RIGHT PANEL:

STEP 1 - Welcome:
- Title: "Welcome to BAIV"
- Inputs: Name, Company, Industry
- "Continue" button (teal)

STEP 2 - Connect Platforms:
- Platform cards with connect buttons
- Skip option

STEP 3 - Goals:
- Checkbox cards for goals

STEP 4 - Complete:
- Success icon (teal)
- "Go to Dashboard" button

PROGRESS:
- Current: teal filled
- Completed: teal with check
- Upcoming: gray outline

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Template 7: BAIV Mobile App Screen

```
Create a BAIV mobile app screen (375px width) with:

STATUS BAR:
- Time, signal, battery

HEADER:
- Background: teal (#00A4BF)
- BAIV logo (white) centered
- Menu icon left, Notifications right

AI SCORE CARD:
- Circular progress (large, teal)
- Score number centered
- "Your AI Visibility Score"

ACTION BUTTONS (horizontal scroll):
- Create (teal), Analyze (orange), Schedule, Reports

RECENT ACTIVITY:
- Section title with "See All" link
- Activity cards (3-4 items)

INSIGHTS CARD:
- Background: light teal (#CCE8EE)
- Lightbulb icon (gold)
- Insight text
- "Apply" button

BOTTOM NAVIGATION:
- Home, Content, Create (FAB, teal), Analytics, Profile
- Active: teal

BAIV BRAND SPECIFICATION:
Colors: Primary #00A4BF, Secondary #E84E1C, Accent #CEC528
Typography: Titillium Web headings, Open Sans body
```

---

## Prompt Checklist

Before submitting to Figma Make:

- [ ] BAIV brand colors included (#00A4BF, #E84E1C, #CEC528)
- [ ] Status colors specified (#019587, #CF057D, #1C3E8E)
- [ ] Font families noted (Titillium Web, Open Sans)
- [ ] All sections listed with contents
- [ ] Layout structure defined
- [ ] Component variants described

---

## BAIV Color Quick Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #00A4BF | CTAs, links, active |
| Primary Dark | #005260 | Hover, footer |
| Secondary | #E84E1C | Secondary actions |
| Accent | #CEC528 | Badges, highlights |
| Neutral | #CCE8EE | Backgrounds |
| Success | #019587 | Success states |
| Warning | #CF057D | Warnings |
| Info | #1C3E8E | Info, footer |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2024 | BAIV brand integration |
| 1.0.0 | Dec 2024 | Initial templates |
