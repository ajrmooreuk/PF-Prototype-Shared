# BAIV Figma Make Prompt Templates

## AI Prompts for BAIV Platform UI Generation

**Version:** 2.0.0  
**Platform:** BAIV — Be AI Visible  
**Last Updated:** December 2025

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
- Copyright: "© 2025 BAIV - Be AI Visible"
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

---

## Template 8: BAIV Home Page (Primary Marketing)

This is the definitive home page template for Be AI Visible — the flagship landing experience that establishes brand identity, communicates the core value proposition, and drives conversions. The structure follows a proven high-conversion layout pattern with clear visual hierarchy, strategic use of BAIV brand colors, and semantic section naming that maps directly to React components.

The design emphasises AI-forward positioning while maintaining professional credibility. Each section is named semantically (section/hero, section/social-proof, etc.) to enable clean MCP extraction and code generation. Typography follows BAIV standards with Titillium Web for impact headings and Open Sans for readable body copy.

```
Create a BAIV (Be AI Visible) home page with the following structure:

PAGE SETUP:
- Frame name: page/home
- Width: 1440px (desktop)
- Background: white
- Auto Layout: vertical, gap 0

═══════════════════════════════════════════════════════════════════════

SECTION 1: HEADER (header)
━━━━━━━━━━━━━━━━━━━━━━━━━━
- Height: 72px
- Background: white
- Border: bottom 1px #E2E8EB
- Auto Layout: horizontal, justify space-between
- Padding: 0 64px

LEFT: logo
- BAIV logo placeholder (140x40)
- Alt text: "Be AI Visible"

CENTER: nav/primary
- Auto Layout: horizontal, gap 32px
- Items: "Platform" | "Solutions" | "Pricing" | "Resources" | "About"
- Font: Open Sans 400, 16px, #374148
- Hover: #00A4BF (primary)

RIGHT: actions
- Auto Layout: horizontal, gap 16px
- "Sign In" link: Open Sans 400, #374148
- "Get Started" button/primary: 
  - Background: #00A4BF
  - Text: white, Open Sans 700
  - Padding: 12px 24px
  - Radius: 6px

═══════════════════════════════════════════════════════════════════════

SECTION 2: HERO (section/hero)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: linear gradient from white to #CCE8EE (neutral)
- Padding: 120px 64px
- Auto Layout: horizontal, gap 64px, align center

LEFT COLUMN (content, 50%):
- Auto Layout: vertical, gap 24px

- badge/accent:
  - Text: "AI-Powered Visibility Platform"
  - Background: #CEC528 (accent) at 20% opacity
  - Text color: #827818 (accent/700)
  - Padding: 8px 16px
  - Radius: full

- heading/h1:
  - Text: "Be Seen. Be Found. Be AI Visible."
  - Font: Titillium Web 700, 56px
  - Color: #111518
  - Line height: 1.1
  - Letter spacing: -0.02em

- body/large:
  - Text: "Transform your digital presence with AI-powered content optimization, intelligent analytics, and automated visibility strategies that put you ahead of the competition."
  - Font: Open Sans 400, 20px
  - Color: #64747F
  - Line height: 1.6
  - Max width: 540px

- cta-group:
  - Auto Layout: horizontal, gap 16px
  
  - button/primary (large):
    - Text: "Start Free Trial"
    - Background: #00A4BF
    - Text: white, Open Sans 700, 18px
    - Padding: 16px 32px
    - Radius: 8px
    - Icon: arrow-right (right side)
  
  - button/outline (large):
    - Text: "Watch Demo"
    - Border: 2px #00A4BF
    - Text: #00A4BF, Open Sans 600, 18px
    - Padding: 16px 32px
    - Radius: 8px
    - Icon: play-circle (left side)

- trust-text:
  - Text: "✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime"
  - Font: Open Sans 400, 14px
  - Color: #64747F

RIGHT COLUMN (hero-image, 50%):
- Placeholder: 560x480
- Content: Abstract AI visualization / dashboard mockup
- Border radius: 16px
- Shadow: xl (BAIV shadow with #005260 tint)

═══════════════════════════════════════════════════════════════════════

SECTION 3: SOCIAL PROOF (section/social-proof)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: white
- Padding: 48px 64px
- Auto Layout: vertical, gap 32px, align center

- label:
  - Text: "Trusted by 10,000+ businesses worldwide"
  - Font: Open Sans 400, 14px
  - Color: #94A3AD
  - Text transform: uppercase
  - Letter spacing: 0.1em

- logo-strip:
  - Auto Layout: horizontal, gap 48px, align center
  - 6 logo placeholders (grayscale, 120x40 each)
  - Opacity: 60%

═══════════════════════════════════════════════════════════════════════

SECTION 4: PROBLEM/SOLUTION (section/problem-solution)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: #F8FAFB (subtle)
- Padding: 96px 64px
- Auto Layout: vertical, gap 64px

TOP: section-header (centered)
- Auto Layout: vertical, gap 16px, align center
- Max width: 720px, centered

- heading/h2:
  - Text: "Visibility is Everything in the AI Era"
  - Font: Titillium Web 600, 40px
  - Color: #111518
  - Text align: center

- body/default:
  - Text: "Traditional SEO isn't enough anymore. AI assistants, voice search, and intelligent recommendations are reshaping how customers find businesses. BAIV ensures you're visible everywhere that matters."
  - Font: Open Sans 400, 18px
  - Color: #64747F
  - Text align: center

BOTTOM: comparison-grid
- Auto Layout: horizontal, gap 32px

- card/problem:
  - Width: 50%
  - Background: white
  - Border: 1px #E2E8EB
  - Border-left: 4px #E84E1C (secondary - problem)
  - Padding: 32px
  - Radius: 12px
  
  - Icon: x-circle, #E84E1C, 32px
  - Title: "Without BAIV" (Titillium Web 600, 24px)
  - List items (Open Sans 400, 16px, #64747F):
    - "Invisible to AI assistants and chatbots"
    - "Missing from voice search results"
    - "Competitors outranking you silently"
    - "Manual, time-consuming optimization"
    - "No insight into AI-driven traffic"

- card/solution:
  - Width: 50%
  - Background: white
  - Border: 1px #E2E8EB
  - Border-left: 4px #019587 (success - solution)
  - Padding: 32px
  - Radius: 12px
  
  - Icon: check-circle, #019587, 32px
  - Title: "With BAIV" (Titillium Web 600, 24px)
  - List items (Open Sans 400, 16px, #374148):
    - "Optimized for ChatGPT, Gemini, Claude & more"
    - "Dominant in voice search results"
    - "Real-time competitive intelligence"
    - "Automated AI-first optimization"
    - "Complete AI visibility analytics"

═══════════════════════════════════════════════════════════════════════

SECTION 5: FEATURES (section/features)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: white
- Padding: 96px 64px
- Auto Layout: vertical, gap 64px

TOP: section-header (centered)
- heading/h2: "Powerful AI Visibility Tools"
- body/default: "Everything you need to dominate in the age of AI search"

BOTTOM: feature-grid
- Auto Layout: grid, 3 columns, gap 32px

CARD 1: card/feature
- Background: white
- Border: 1px #E2E8EB
- Padding: 32px
- Radius: 12px
- Hover: shadow-lg, border #00A4BF

- icon-wrapper:
  - Size: 56px
  - Background: #00A4BF at 10%
  - Radius: 12px
  - Icon: brain, #00A4BF, 28px

- heading/h4: "AI Content Optimizer"
- body/small: "Automatically optimize your content for AI assistants, ensuring accurate representation in AI-generated responses."
- link: "Learn more →" (#00A4BF)

CARD 2: card/feature
- Icon: bar-chart-2, #E84E1C (secondary)
- Icon bg: #E84E1C at 10%
- heading/h4: "Visibility Analytics"
- body/small: "Track how AI systems reference your brand with real-time dashboards and competitive benchmarking."

CARD 3: card/feature
- Icon: zap, #CEC528 (accent)
- Icon bg: #CEC528 at 10%
- heading/h4: "Automated Optimization"
- body/small: "Set it and forget it. Our AI continuously optimizes your presence across all major AI platforms."

CARD 4: card/feature
- Icon: search, #019587 (success)
- Icon bg: #019587 at 10%
- heading/h4: "Voice Search Ready"
- body/small: "Optimize for Alexa, Siri, and Google Assistant with voice-specific content strategies."

CARD 5: card/feature
- Icon: shield, #1C3E8E (info)
- Icon bg: #1C3E8E at 10%
- heading/h4: "Brand Protection"
- body/small: "Monitor and correct AI misinformation about your brand across all major platforms."

CARD 6: card/feature
- Icon: trending-up, #00A4BF (primary)
- Icon bg: #00A4BF at 10%
- heading/h4: "Growth Intelligence"
- body/small: "AI-powered recommendations to expand your visibility and capture new audience segments."

═══════════════════════════════════════════════════════════════════════

SECTION 6: STATS (section/stats)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: #005260 (primary dark)
- Padding: 64px
- Auto Layout: horizontal, gap 0, justify space-around

STAT CARDS (4x card/stat):
- Auto Layout: vertical, gap 8px, align center

Card 1:
- Number: "10,000+" (Titillium Web 700, 48px, white)
- Label: "Active Businesses" (Open Sans 400, 16px, #CCE8EE)

Card 2:
- Number: "50M+" 
- Label: "AI Impressions Monthly"

Card 3:
- Number: "3.5x"
- Label: "Average Visibility Increase"

Card 4:
- Number: "98%"
- Label: "Customer Satisfaction"

═══════════════════════════════════════════════════════════════════════

SECTION 7: HOW IT WORKS (section/how-it-works)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: white
- Padding: 96px 64px
- Auto Layout: vertical, gap 64px

TOP: section-header (centered)
- heading/h2: "Get Started in 3 Simple Steps"
- body/default: "From signup to AI visibility in under 10 minutes"

BOTTOM: steps-row
- Auto Layout: horizontal, gap 32px
- Connecting line between steps (dashed, #E2E8EB)

STEP 1: step-card
- Auto Layout: vertical, gap 16px, align center
- step-number:
  - Circle: 64px, background #00A4BF
  - Number: "1" (Titillium Web 700, 28px, white)
- heading/h4: "Connect" (centered)
- body/small: "Link your website and digital properties in one click" (centered, max-width 280px)

STEP 2: step-card
- Circle: #E84E1C (secondary)
- Number: "2"
- heading/h4: "Analyze"
- body/small: "Our AI scans your entire digital presence and identifies opportunities"

STEP 3: step-card
- Circle: #CEC528 (accent)
- Number: "3"
- heading/h4: "Optimize"
- body/small: "Implement AI-powered recommendations automatically or with one click"

═══════════════════════════════════════════════════════════════════════

SECTION 8: TESTIMONIALS (section/testimonials)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: #F8FAFB
- Padding: 96px 64px
- Auto Layout: vertical, gap 64px

TOP: section-header (centered)
- heading/h2: "Loved by Forward-Thinking Teams"

BOTTOM: testimonial-grid
- Auto Layout: horizontal, gap 32px

TESTIMONIAL CARD (3x card/testimonial):
- Background: white
- Padding: 32px
- Radius: 12px
- Shadow: md

- quote-icon: " (large, #00A4BF at 20%)
- quote-text: [Testimonial content] (Open Sans 400, 16px, #374148, italic)
- rating: 5 stars (#CEC528)
- divider: 1px #E2E8EB
- author-row:
  - avatar/md: 48px placeholder
  - author-info:
    - name: "Sarah Chen" (Open Sans 600, 16px, #111518)
    - role: "CMO, TechStart Inc." (Open Sans 400, 14px, #64747F)

═══════════════════════════════════════════════════════════════════════

SECTION 9: PRICING PREVIEW (section/pricing-preview)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: white
- Padding: 96px 64px
- Auto Layout: vertical, gap 48px

TOP: section-header (centered)
- heading/h2: "Simple, Transparent Pricing"
- body/default: "Start free, scale as you grow"

BOTTOM: pricing-cards
- Auto Layout: horizontal, gap 24px, justify center

CARD 1: card/pricing
- Width: 320px
- Background: white
- Border: 1px #E2E8EB
- Padding: 32px
- Radius: 16px

- plan-name: "Starter" (Titillium Web 600, 20px)
- price: "$49" (Titillium Web 700, 48px) + "/month" (Open Sans 400, 16px, #64747F)
- description: "For small businesses getting started" (Open Sans 400, 14px, #64747F)
- divider
- feature-list (5 items with checkmarks #019587)
- button/outline: "Start Free Trial"

CARD 2: card/pricing (FEATURED)
- Border: 2px #00A4BF
- Position: relative
- badge/popular:
  - Position: absolute top -12px
  - Text: "Most Popular"
  - Background: #E84E1C
  - Text: white
  - Padding: 6px 16px
  - Radius: full

- plan-name: "Professional"
- price: "$149" + "/month"
- description: "For growing businesses"
- feature-list (8 items)
- button/primary: "Start Free Trial"

CARD 3: card/pricing
- plan-name: "Enterprise"
- price: "Custom"
- description: "For large organizations"
- feature-list (10 items)
- button/secondary: "Contact Sales" (#E84E1C)

═══════════════════════════════════════════════════════════════════════

SECTION 10: FINAL CTA (section/cta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: linear gradient #00A4BF to #005260
- Padding: 96px 64px
- Auto Layout: vertical, gap 32px, align center

- heading/h2: "Ready to Be AI Visible?" (white, Titillium Web 600, 40px)
- body/large: "Join thousands of businesses already winning in the AI era" (white at 90%, max-width 600px, centered)

- cta-form:
  - Auto Layout: horizontal, gap 0
  - input/email:
    - Placeholder: "Enter your work email"
    - Width: 320px
    - Height: 56px
    - Background: white
    - Border radius: 8px 0 0 8px
  - button/secondary:
    - Text: "Get Started Free"
    - Background: #E84E1C
    - Height: 56px
    - Padding: 0 32px
    - Border radius: 0 8px 8px 0

- trust-badges:
  - Auto Layout: horizontal, gap 24px
  - Items: "🔒 SOC2 Certified" | "⚡ Setup in 5 min" | "💳 No credit card"
  - Font: Open Sans 400, 14px, white at 80%

═══════════════════════════════════════════════════════════════════════

SECTION 11: FOOTER (footer)
━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: #1C3E8E (info/navy)
- Padding: 64px 64px 32px
- Auto Layout: vertical, gap 48px

TOP: footer-main
- Auto Layout: horizontal, gap 64px

COLUMN 1 (brand):
- BAIV logo (white version)
- Tagline: "Making businesses visible in the AI era" (Open Sans 400, 14px, #A3B7DF)
- Social icons: LinkedIn, Twitter, YouTube (white, 24px)

COLUMN 2 (Product):
- Title: "Product" (Open Sans 600, 14px, white, uppercase)
- Links: Features, Pricing, Integrations, API, Changelog
- Link style: Open Sans 400, 14px, #A3B7DF, hover white

COLUMN 3 (Company):
- Title: "Company"
- Links: About, Careers, Blog, Press, Contact

COLUMN 4 (Resources):
- Title: "Resources"
- Links: Documentation, Guides, Webinars, Community, Support

COLUMN 5 (Legal):
- Title: "Legal"
- Links: Privacy, Terms, Security, GDPR

BOTTOM: footer-bottom
- Auto Layout: horizontal, justify space-between
- Border-top: 1px #4769BE
- Padding-top: 24px

- Copyright: "© 2025 BAIV - Be AI Visible. All rights reserved." (Open Sans 400, 14px, #A3B7DF)
- Legal links: "Privacy Policy | Terms of Service | Cookie Settings"

═══════════════════════════════════════════════════════════════════════

BAIV BRAND SPECIFICATION:
─────────────────────────
Colors:
- Primary: #00A4BF (teal) - CTAs, links, primary actions
- Primary Dark: #005260 - footer backgrounds, active states
- Secondary: #E84E1C (orange) - secondary CTAs, highlights
- Accent: #CEC528 (gold) - badges, ratings, special callouts
- Neutral: #CCE8EE (light teal) - subtle backgrounds

Status:
- Success: #019587 - checkmarks, positive indicators
- Warning: #CF057D - alerts (use sparingly)
- Error: #CEC528 - errors (same as accent)
- Info: #1C3E8E - footer, informational

Typography:
- Headings: Titillium Web (400, 600, 700)
- Body: Open Sans (400, 700)

Spacing Scale: 8, 12, 16, 24, 32, 48, 64, 96, 120px
Border Radius: 6px (buttons), 8px (inputs), 12px (cards), 16px (large cards)
Shadows: Use BAIV shadow tokens with #005260 tint

LAYER NAMING:
- All sections: section/{name}
- All components: {category}/{type} or {category}/{variant}
- Internal parts: _{name}

AUTO LAYOUT:
- Every container must use Auto Layout
- Bind all gaps to spacing tokens
- Use Fill/Hug appropriately
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
| 2.1.0 | Dec 2025 | Added BAIV Home Page template (Template 8) |
| 2.0.0 | Dec 2025 | BAIV brand integration |
| 1.0.0 | Dec 2025 | Initial templates |
