---
paths:
  - "components/**"
  - "app/**/*.tsx"
  - "app/**/*.mdx"
  - "app/globals.css"
  - "tailwind.config.ts"
---

# Design system

The brand guidelines document (path in `CLAUDE.local.md`) is the source of truth for visual and branded output and overrides this file where they differ. Read it before producing new visual design.

## Color tokens (`tailwind.config.ts`)

| Token | Hex | Use |
|---|---|---|
| `cs-dark-blue` | `#061729` | Primary brand color, default text on light surfaces, hero backgrounds |
| `cs-electric` | `#79f0b8` | Accent only: CTAs, one emphasized word, the logo soundwave |
| `cs-cloud` | `#e8e7e6` | Soft neutral background |
| `cs-cloud-deep` | `#dcdbda` | Deeper neutral background |
| `cs-navy` | `#163b61` | Color-coded sections, secondary dark surfaces |
| `cs-light-blue` | `#86d0eb` | Soft accent |
| `cs-dark-gray` | `#8e9091` | Dividers, secondary text, footnotes |
| `cs-gray` | `#c3c5c7` | Dividers, secondary text, footnotes |
| `cs-slate` | `#55606b` | Secondary text |

Electric is legible only on `cs-dark-blue` or `cs-navy`. Keep Electric text, icons, dividers, and backgrounds off White, Cloud, Light Blue, and Gray. On light surfaces, use the inverse pair for CTAs: Dark Blue background, white text.

## Typography

- Plus Jakarta Sans is the only typeface, loaded as `var(--font-plus-jakarta)`. Use weights 300, 500, and 700 only.
- Text on light surfaces is `cs-dark-blue`, never pure black. On Dark Blue or Navy, use white or `cs-cloud`.

## Buttons (`components/ui/button.tsx`)

- `default`: Dark Blue background, white text. Primary CTA on light surfaces.
- `accent`: Electric background, Dark Blue bold text. Primary CTA on Dark Blue or Navy only.
- `secondary`: 1.5px Dark Blue outline and text, fills on hover.
- `link`: Dark Blue, underlines on hover.
- `outline`, `ghost`, `destructive`: shadcn defaults kept for product UI.

## Border radius

Tailwind radius comes from `--radius: 0.75rem` in `app/globals.css`: `rounded-xs` 4px, `rounded-sm` 8px, `rounded-md` 10px, `rounded-lg` 12px, `rounded-xl` 16px, `rounded-2xl` 24px. Vary radius by a component's importance rather than using one value everywhere.

## Not part of the brand

Don't use these:

- Warm orange `#F97316` and the `text-warm`, `bg-warm`, `border-warm`, `warm-accent`, `warm-filled` classes
- Blue-indigo-purple gradient buttons (`gradient-primary`) and shimmer animations
- Warm orange border-glow hover
- Poppins, IBM Plex Mono, Inter, and Roboto
