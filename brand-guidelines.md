# ClinicalSim Brand Guidelines

> Single source of truth for visual identity. For designers, developers, contractors, partners, and AI agents.
> Last updated: April 2026 (replaces all prior versions)
> Source of truth: ClinicalSim 2026 Visual Identity Guidelines

This file covers the visual brand. Brand voice, tone, and writing rules live in `brand-voice.md`. About-the-company context lives in `about-me.md`. Both should be loaded alongside this file when producing any branded output.

---

## Table of Contents

1. Brand Identity
2. Color Palette
3. Typography
4. Logo System
5. Logo File Library
6. Favicon and App Icons
7. Icon Set
8. Touch Points
9. Digital Tokens (Web and CSS)
10. Companion Documents
11. Do's and Don'ts

---

## 1. Brand Identity

| Field | Value |
|---|---|
| Brand name | ClinicalSim (wordmark uses CamelCase: "ClinicalSim", not "Clinicalsim" or "Clinical Sim") |
| Legal entity | Clinical Sim AI LLC |
| Domain | clinicalsim.ai |
| Tagline | AI Clinical Simulation. Practice the Conversations That Matter Most. |
| Sign-off line | We're ClinicalSim |

### Positioning

ClinicalSim is the first AI clinical simulation purpose-built for communication remediation in medical education. Voice-based, structured, on-demand practice mapped to ACGME ICS Milestones 2.0, accessible from any device.

### Target Audiences

| Audience | Key Need |
|---|---|
| Program Directors | Structured remediation toolkit, milestone-aligned feedback, faculty time reduction (29-45 hrs/case) |
| DIOs and GME Leadership | Standardized remediation across programs, accreditation readiness, cost reduction vs. PACE ($15K-$19K/learner) |
| Simulation Center Directors | Extend SP programs to unlimited practice volume, scalable assessment data, impact documentation |
| Clinical Competency Committees | Objective milestone-aligned data, longitudinal progress tracking, CCC-ready documentation |

---

## 2. Color Palette

The system pairs a deep blue with a soft cloud neutral and a vibrant electric green. Blue and cloud are primarily background colors that create contrast and clarity. Green is a sparing accent for energy and emphasis. Primary font color is the Dark Blue for consistency and readability, with Electric and Cloud used to highlight key words and phrases and guide hierarchy.

### Primary Palette

| Name | Hex | RGB | CMYK | Role |
|---|---|---|---|---|
| Dark Blue | `#061729` | 6, 23, 41 | 91, 78, 54, 69 | Primary brand color. Default font color. Hero backgrounds. |
| Electric (Green) | `#79f0b8` | 121, 240, 184 | 45, 0, 41, 0 | Accent only. Energy, highlights, key emphasis, CTAs on dark. |
| Cloud | `#e8e7e6` | 232, 231, 230 | 8, 6, 7, 0 | Soft neutral background. Pairs with Dark Blue text. |

### Secondary Palette

The blues add color distinction for color-coded sections and information-heavy or medical content. The grays are supporting elements: dividers, annotation lines, footnotes, secondary information.

| Name | Hex | RGB | CMYK | Role |
|---|---|---|---|---|
| Navy Blue | `#163b61` | 22, 59, 97 | 99, 80, 37, 26 | Color-coded sections, secondary surfaces |
| Light Blue | `#86d0eb` | 134, 208, 235 | 44, 2, 4, 0 | Color-coded accents, soft highlights |
| Dark Gray | `#8e9091` | 142, 144, 145 | 47, 38, 38, 2 | Body dividers, secondary text |
| Gray | `#c3c5c7` | 195, 197, 199 | 91, 78, 54, 69 | Light dividers, footnotes, captions |

### Color Use Rules

- Body copy on light backgrounds: Dark Blue `#061729`. Never pure black.
- Body copy on Dark Blue or Navy Blue: White `#FFFFFF` or Cloud `#e8e7e6`.
- Electric green is an accent, not a body color. Use it for highlighted phrases, key stats, CTAs, and the soundwave bars in the logo. Never set whole paragraphs in Electric.
- Greens and blues should not be used together as flat backgrounds without sufficient contrast (Dark Blue + Electric is fine, Navy + Light Blue is fine, but Electric + Light Blue is not).
- Gray family is supporting only. Never use grays as primary CTA color or as the main font color in headlines.

---

## 3. Typography

### Typeface

**Plus Jakarta Sans** is the only brand typeface. Three weights are approved for production use:

| Weight | Use |
|---|---|
| Light | Display headlines, hero text, large-scale type |
| Medium | Subheadings, important callouts, emphasis within body |
| Bold | Section headlines, button labels, strong emphasis |

Web fallback: `'Plus Jakarta Sans', system-ui, -apple-system, 'Helvetica Neue', sans-serif`.

Google Fonts import: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;700&display=swap`.

### Type Scale (per Visual Identity Guidelines)

| Style | Size | Weight | Use |
|---|---|---|---|
| Headline | 140px | Light or Medium | Top-tier display. Hero pages, section openers. |
| Header | 180px | Medium | Big statement headlines. Use sparingly. Apply Light Gray or Electric Green to highlighted phrases. |
| Sub Header | 48px | Regular or Medium | Section subheads |
| Body | 24px | Regular | Standard body copy |
| Caption / Detail | 18px | Regular | Footnotes, captions, fine detail |

Note on the brand book labels: the source guidelines list "Headline 140px" and "Header 180px" as separate display tiers. Use the labels as written when producing materials that match the brand book directly. For digital products, scale these proportionally to a responsive type ramp (recommended ramp in Section 9).

### Typographic Rules

- Default font color is Dark Blue.
- Use Light Gray (`#c3c5c7`) and Electric Green (`#79f0b8`) for emphasized words and phrases inside headlines, never for full paragraphs.
- Avoid title case for long headings. Use sentence case for body content. Headlines may use either, but never ALL CAPS for prose.
- Line height: 1.1 for headlines, 1.5 for body, 1.4 for subheads.
- Letter spacing: 0 for body. Slight negative tracking (-0.01em to -0.02em) is acceptable on large display headlines.

---

## 4. Logo System

The ClinicalSim logo combines a soundwave icon with the wordmark. The soundwave symbolizes real-time voice conversation, accessibility across devices, and AI-driven clinical communication. The wordmark uses Plus Jakarta Sans Light for clarity inside the medical space and a contemporary, tech-forward feel.

### Anatomy

- **Icon**: Four vertical bars in soundwave configuration. The third bar (from left) is the tallest, anchoring the mark.
- **Wordmark**: "ClinicalSim" set in Plus Jakarta Sans Light.
- **Lockup**: Icon + wordmark, horizontal, locked to a fixed grid.

### Clear Space Rule

The clear space separating the icon from the wordmark must always equal exactly the width of a single vertical bar from the icon itself. This is non-negotiable. Do not increase, decrease, or substitute spacing.

External clear space (logo to any other element or edge) should be at minimum the width of the tallest bar in the icon.

### Minimum Sizing

Approved scale references from the brand book: 75%, 50%, and 25% of the master file. Below 25%, use the standalone icon (favicon).

| Application | Minimum width |
|---|---|
| Print, full lockup | 1 inch / 25mm |
| Digital, full lockup | 120px wide |
| Digital, icon only (below 120px) | Use favicon variant |

### Color Lockup Rules

Always pair the lockup with the correct background:

| Background | Approved Lockup |
|---|---|
| Dark Blue `#061729` | Hero Dark Blue lockup (Electric icon + White wordmark) |
| Navy Blue `#163b61` | Mint or White lockup |
| Electric `#79f0b8` | Dark Blue lockup |
| Cloud `#e8e7e6` or White | Dark Blue lockup |
| Light neutrals | Solid Black (monochrome) |
| Black or fully dark backgrounds | White knockout (monochrome) |

Always prioritize high contrast. Do not apply shadows, glows, gradients, or outlines to the logo. Never recolor the icon and wordmark independently. Icon + wordmark colors are fixed within each approved lockup.

---

## 5. Logo File Library

All master logo files live in:

```
/Users/benconway/Documents/Documents - Ben ClinicalSim Macbook Pro/Clinical Sim AI LLC/Branding Guidelines/Logos/
```

### Icon-only files

| File | Use |
|---|---|
| `ClinicalSim_Logo_Icon_DarkBlue.png` | Default icon on light backgrounds |
| `ClinicalSim_Logo_Icon_Green.png` | Accent placement, Electric green icon |
| `ClinicalSim_Logo_Icon_LightBlue.png` | Light blue accent placements |
| `ClinicalSim_Logo_Icon_White.png` | Knockout on dark backgrounds |
| `ClinicalSim_Logo_Icon_Black.png` | Monochrome black on neutral light |

### Lockup files

| File | Use |
|---|---|
| `ClinicalSim_Logo_Lockup_Hero_DarkBlue.png` | Hero lockup for Dark Blue backgrounds (Electric icon + White wordmark) |
| `ClinicalSim_Logo_Lockup_Hero_White.png` | Hero lockup for White or light Cloud backgrounds |
| `ClinicialSim_Logo_Lockup_DarkBlue.png` | Standard Dark Blue lockup (note: filename has "Clinicial" typo at source) |
| `ClinicalSim_Logo_Lockup_White.png` | White lockup for use on dark photography or full-bleed dark surfaces |
| `ClinicalSim_Logo_Lockup_Black.png` | Monochrome black lockup |

When a vector format is needed, request SVG / AI / EPS from the brand owner. Do not regenerate the logo from scratch.

---

## 6. Favicon and App Icons

The favicon uses the icon-only mark on a 36-field grid, bar layout matching the master icon.

### Approved favicon variants

| Variant | Background | Icon Color | Use |
|---|---|---|---|
| 1 | Dark Blue `#061729` | Electric `#79f0b8` | Default favicon, dark UI app icon |
| 2 | Navy Blue `#163b61` | Light Blue `#86d0eb` | Secondary/cool palette favicon |
| 3 | Light Blue `#86d0eb` | Dark Blue `#061729` | Soft accent favicon |
| 4 | Electric `#79f0b8` | Dark Blue `#061729` | Marketing-active app icon |
| 5 | Black | White | Monochrome high contrast |
| 6 | White | Dark Blue `#061729` (with thin outline) | Light UI / iOS Safari pinned tab |

### Required export sizes (per brand book examples)

| Size | Use |
|---|---|
| 1080 x 1080 | Social profile, app store |
| 400 x 400 | OG / Twitter card icon |
| 400 x 300 | Banner thumbnails |
| 250 x 250 | Slack / chat avatar |
| 180 x 180 | Apple touch icon |
| 110 x 110 | Browser tab favicon (rendered to 32x32) |

Standard web favicon set: 16x16, 32x32, 48x48 PNG plus 180x180 apple-touch-icon.png plus a primary `favicon.svg` (Dark Blue background, Electric icon).

### Corner Radius

All favicon and app icon backgrounds use rounded corners at approximately 22% of the side length (matches iOS / web app icon standard).

---

## 7. Icon Set

The icon set is filled, geometric, single-weight, and visually consistent. All icons are sourced from a curated set built around the soundwave logo style.

### Master directory

```
/Users/benconway/Documents/Documents - Ben ClinicalSim Macbook Pro/Clinical Sim AI LLC/Branding Guidelines/Icons/
```

### Naming convention

```
noun-{name}-{id}-{color}.png
```

- `{color}` is `07172F` for Dark Blue (use on light backgrounds) or `FFFFFF` for White (use on dark backgrounds).
- The Dark Blue icon hex `#07172F` from the source files matches the brand Dark Blue `#061729` for practical purposes.

### Icon library reference

Pick the icon by semantic meaning. The full inventory:

| Concept | Icon name | File ID |
|---|---|---|
| Soundwave (voice, dialogue) | `sound-wave` | 6450453 (filled) / 6450435 (logo style) |
| Voice on / alert | `bell-on` | 6450474 |
| Voice / chat dots | `chat-dots` | 6450856 |
| Chat with checkmark | `chat-alt-checkmark` | 6450859 |
| Chat alert | `chat-exclamation` | 6450832 |
| Chat with heart | `chat-square-heart` | 6451084 |
| Phone (call) | `phone-handle` | 6450853 |
| Video square | `square-video` | 6451000 |
| Avatar (male) | `avatar-male` | 6450631 |
| Avatar (female) | `avatar-female` | 6450630 |
| Avatar (generic circle) | `avatar-image-circle` | 6450645 |
| Person | `people` | 6451286 |
| Group | `group` | 6451284 |
| People connected | `people-connected` | 6451267 |
| Friendship | `friendship` | 6451292 |
| Patient with book | `book-reading` | 6450779 |
| Open book | `book-opened` | 6450771 |
| Student | `student` | 6450784 |
| Graduation cap | `hat-graduation` | 6450798 |
| Microscope (research) | `microscope` | 6450781 |
| Genetics / DNA | `genetics` | 6450597 |
| Hospital | `hospital` | 6450647 |
| Med kit | `med-kit` | 6450632 |
| Bandaid | `bandaid` | 6451225 |
| Capsule | `capsule` | 6451243 |
| Injection | `injection` | 6451216 |
| Plus | `plus` | 6450457 |
| Heart | `heart` | 6451075 |
| Checkmark | `checkmark` | 6450496 |
| Badge with check | `badge-check` | 6451118 |
| Ribbon | `ribbon` | 6451117 |
| Ribbon with check | `ribbon-check` | 6451128 |
| Medal star | `medal-star` | 6451109 |
| Star raising | `star-raising` | 6451134 |
| Thumb up | `thumb-up` | 6450477 |
| Thumb down | `thumb-down` | 6450482 |
| Share | `share` | 6450501 |
| Bar chart down | `chart-pipe-decrease` | 6450904 |
| Pie chart quarter | `chart-pie-quarter` | 6450939 |
| Currency dollar | `currency-dollar` | 6450902 |
| Code (curly braces) | `parentheses-curly` | 6450935 |
| Git compare | `git-compare` | 6450922 |
| Stack | `stack` | 6451311 |
| List | `list-unordered` | 6450559 |
| Grid (small) | `view-grid-small` | 6451184 |
| Tree structure | `tree-structure-bottom` | 6451315 |
| Align bottom | `align-bottom` | 6450612 |
| Taxi | `taxi` | 6450969 |

### Icon usage rules

- Use Dark Blue (`07172F`) variants on Cloud, White, Light Blue, or Electric backgrounds.
- Use White (`FFFFFF`) variants on Dark Blue, Navy Blue, or Black backgrounds.
- Match optical size to surrounding type. Default body-adjacent icon is 24px square. Feature icons are 48-64px. Do not stretch.
- Keep stroke / fill consistent. Do not mix outlined icons with filled brand icons. The brand set is filled.
- For new concepts not in the library, request additions from the brand owner. Do not introduce off-brand icon families (Material, Heroicons, Lucide, FontAwesome) inside marketing surfaces.

### Lucide fallback for product UI

The web product currently uses Lucide React icons inside the application UI for engineering velocity. Lucide is acceptable inside product surfaces (dashboard, settings, in-app components) but the brand icon set must be used on:

- Marketing site
- Decks and printed materials
- Sales collateral
- Investor materials
- Email templates
- Any external-facing branded touch point

When a Lucide icon must coexist with brand iconography, separate them by section so the styles do not visually mix.

---

## 8. Touch Points

Neutral backgrounds (White or Cloud) keep layouts clean and breathable across business cards, letterheads, and printed material. Brand elements remain approachable when given air.

### Business Card

- Size: 85mm x 55mm
- Front: White background, Dark Blue icon mark, name and title in Plus Jakarta Sans Medium, contact in Light or Regular
- Back option A: Dark Blue background, Electric icon, white wordmark
- Back option B: Cloud or White background, full Dark Blue lockup centered

### Letterhead

- Size: A4 (210mm x 297mm)
- Logo: Top-left, Dark Blue lockup at approximately 35-40mm wide
- Sender block: Top-right, Plus Jakarta Sans Regular at 9-10pt
- Body: Plus Jakarta Sans Regular at 10-11pt, Dark Blue text
- Signature placement: Bottom-right
- Optional footer: clinicalsim.ai, Cloud-colored 1pt rule

### Slide Decks and Presentations

Use the dedicated `clinicalsim-brand` skill for any deck. Defaults:

- Title slides: Dark Blue background, Hero Dark Blue lockup, Headline in White or Electric
- Content slides: White or Cloud background, Dark Blue text, Electric for emphasis only
- Section dividers: Dark Blue background, large numeral in White or outlined Electric
- Closing slide: Dark Blue background, "Thank you. We're ClinicalSim." in White and Electric

---

## 9. Digital Tokens (Web and CSS)

Use these CSS custom properties as the canonical brand variables. They override any prior token names.

```css
:root {
  /* Primary */
  --cs-dark-blue: #061729;
  --cs-electric:  #79f0b8;
  --cs-cloud:     #e8e7e6;

  /* Secondary */
  --cs-navy:      #163b61;
  --cs-light-blue:#86d0eb;
  --cs-dark-gray: #8e9091;
  --cs-gray:      #c3c5c7;

  /* Functional aliases */
  --cs-bg-default:        var(--cs-cloud);
  --cs-bg-inverse:        var(--cs-dark-blue);
  --cs-text-default:      var(--cs-dark-blue);
  --cs-text-inverse:      #ffffff;
  --cs-text-muted:        var(--cs-dark-gray);
  --cs-divider:           var(--cs-gray);
  --cs-accent:            var(--cs-electric);
  --cs-accent-secondary:  var(--cs-light-blue);

  /* CTA */
  --cs-cta-bg:            var(--cs-electric);
  --cs-cta-text:          var(--cs-dark-blue);
  --cs-cta-bg-inverse:    var(--cs-dark-blue);
  --cs-cta-text-inverse:  #ffffff;

  /* Type */
  --cs-font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Helvetica Neue', sans-serif;
  --cs-fw-light:  300;
  --cs-fw-medium: 500;
  --cs-fw-bold:   700;

  /* Web type ramp (responsive equivalent of brand book sizes) */
  --cs-fs-display: clamp(3rem, 6vw, 6.5rem);   /* Headline / Header */
  --cs-fs-h1:      clamp(2.25rem, 4vw, 3.5rem);
  --cs-fs-h2:      clamp(1.75rem, 3vw, 2.5rem);
  --cs-fs-h3:      1.5rem;                     /* 24px */
  --cs-fs-body:    1.125rem;                   /* 18px web body, scales 24px in print */
  --cs-fs-caption: 0.875rem;                   /* 14px web caption */

  /* Radius */
  --cs-radius-sm: 6px;
  --cs-radius-md: 12px;
  --cs-radius-lg: 16px;
  --cs-radius-xl: 24px;
  --cs-radius-pill: 999px;
  --cs-radius-app-icon: 22%;
}
```

### Tailwind palette extension (suggested config)

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'cs-dark-blue': '#061729',
      'cs-electric':  '#79f0b8',
      'cs-cloud':     '#e8e7e6',
      'cs-navy':      '#163b61',
      'cs-light-blue':'#86d0eb',
      'cs-dark-gray': '#8e9091',
      'cs-gray':      '#c3c5c7',
    },
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
    },
  },
},
```

### Component defaults

- Primary button: Electric background, Dark Blue text, `--cs-radius-md`, Plus Jakarta Sans Bold, no shadow by default.
- Primary button on dark backgrounds: keep Electric background, keep Dark Blue text.
- Secondary button: transparent background, 1.5px Dark Blue border, Dark Blue text. On dark backgrounds: White border and text.
- Cards on light: White background, 1px `var(--cs-gray)` border, `--cs-radius-lg`, no shadow by default. Apply subtle shadow on hover only.
- Cards on dark: Navy Blue background, no border, `--cs-radius-lg`, Cloud or White text.
- Input fields: White background, 1px `var(--cs-gray)` border, focus ring `var(--cs-electric)` at 2px.

### Animation

Keep motion subtle and purposeful. Default transitions: `150ms ease-out` for small elements, `250ms ease-out` for cards, `400ms ease-in-out` for hero / page entrances. Respect `prefers-reduced-motion`.

The Electric soundwave bars in the logo may be subtly animated in motion contexts (loaders, intros) but never in static layouts.

---

## 10. Companion Documents

| File | Purpose |
|---|---|
| `brand-voice.md` | Tone, sentence structure, anti-patterns, humanizer checklist. Reference for ANY writing output. |
| `about-me.md` | Founder, team, role, communication style. Reference when writing as Ben or about the company. |
| `working-preferences.md` | How Ben wants Claude to operate. Reference at session start. |
| `writing-style.md` | Detailed prose conventions. |
| `CLAUDE.md` | Project-level memory and rules. |

For document generation, use the `clinicalsim-brand` skill, which automatically applies this guideline to PowerPoint, Word, PDF, and HTML outputs.

---

## 11. Do's and Don'ts

### Do

- Use Dark Blue as the default text color on light surfaces and as a hero background color.
- Use Electric Green sparingly, as accent only. Highlights, CTAs, single emphasized words inside headlines, the soundwave in the icon.
- Pair the right logo lockup with the background per Section 4.
- Maintain the icon-to-wordmark clear space at exactly one vertical-bar width.
- Use Plus Jakarta Sans across every brand surface, with the three approved weights only.
- Use the brand icon set on all external-facing materials.
- Keep neutral backgrounds breathable on stationery.

### Don't

- Don't recolor the logo with off-palette colors.
- Don't apply shadows, gradients, glows, outlines, or 3D effects to the logo.
- Don't use Electric Green as a body text color.
- Don't pair Electric Green and Light Blue as adjacent flat backgrounds.
- Don't mix icon families. The brand set is filled. Do not introduce outlined or third-party families on marketing surfaces.
- Don't use ALL CAPS for paragraph copy.
- Don't use pure black for body text. Use Dark Blue.
- Don't substitute the typeface. No Inter, no Roboto, no Helvetica fallbacks except in plain-text email signatures.
- Don't create new lockups. Use only the approved files in Section 5.
- Don't use the previous "warm orange" or blue-to-purple gradient style. That palette is fully retired.

---

## Deprecated (Retired April 2026)

The following elements from the prior brand system are no longer in use and must not appear in any newly produced material:

- Warm orange accent (`#F97316` and related)
- Blue-to-indigo-to-purple gradient buttons
- Shimmer animation on hero headlines
- Border-glow hover animation in warm orange
- Inter, Roboto, or non-Plus-Jakarta typography
- Any logo lockup that does not appear in Section 5

Existing materials in production may be migrated as they're updated. New materials must use the system documented above.
