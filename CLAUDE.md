# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Shell Commands

**IMPORTANT**: Always quote file paths containing special characters (parentheses, spaces, etc.) in shell commands.

- ❌ `git diff app/(marketing)/insights/page.tsx` - Will fail with "no matches found"
- ✅ `git diff "app/(marketing)/insights/page.tsx"` - Works correctly

This applies to all shell commands including `git`, `ls`, `cat`, etc.

## Architecture Overview

This is a Next.js 15 application using the App Router with a component-driven architecture built on shadcn/ui and Radix UI primitives.

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with CSS variables for theming
- **Components**: shadcn/ui components built on Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Toast**: Sonner

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components (auto-generated, avoid manual edits)
- `components/` - Custom components
- `lib/` - Utility functions (primarily `utils.ts` for cn helper)
- `hooks/` - Custom React hooks
- `public/` - Static assets

### Component System
The project uses shadcn/ui components which are:
- Built on Radix UI primitives
- Styled with Tailwind CSS using CSS variables
- Configured via `components.json`
- Installed via CLI (`npx shadcn@latest add <component>`)

### Styling Conventions
- Uses CSS variables defined in `app/globals.css` for theming
- Tailwind with custom color system (background, foreground, primary, etc.)
- `cn()` utility function from `lib/utils.ts` for conditional class merging
- Dark mode support via `class` strategy

### Path Aliases
- `@/*` - Project root
- `@/components` - Components directory
- `@/lib` - Library/utility functions
- `@/hooks` - Custom hooks

### Build Configuration
- ESLint and TypeScript errors ignored during builds
- Images unoptimized for static export compatibility

## Content Management

### Blog Posts (Insights)
- **Location**: `app/(marketing)/insights/[slug]/page.mdx`
- **Registry**: `lib/posts.ts` - Must be updated when adding new posts
- **Layout**: Posts use `components/article-layout.tsx` wrapper
- **Workflow**: Blog posts may be created by separate agents/processes
  - Always check `lib/posts.ts` for the current list of posts
  - Verify new posts are registered in the posts array with metadata
  - Ensure MDX files follow the ArticleLayout pattern
  - **IMPORTANT**: When multiple agents work on this codebase, always pull latest changes before making commits to avoid conflicts with blog post additions

### Authorship (E-E-A-T)
- **Author registry**: `lib/authors.ts` — 5 real team members + "ClinicalSim.ai Team" fallback
- **Assigning an author to a post**: Add `authorId: "vinod-havalad"` (or any valid author ID) to the post entry in `lib/posts.ts`. Valid IDs: `vinod-havalad`, `lauren-rissman`, `gillian-brennan`, `ben-conway`, `will-meyer`
- **Default behavior**: Posts without `authorId` (or with no match) render as "ClinicalSim.ai Team" with a Users icon
- **Individual authors** render with colored initials avatar + name + title via `components/author-byline.tsx`
- **JSON-LD**: Article schema automatically uses `Person` for individual authors and `Organization` for team posts
- **About page**: Emits Person JSON-LD for each team member automatically via `getAllAuthors()`
- **`dateModified`**: Optional field on posts. Falls back to `date` in JSON-LD if not set. Update when making significant content edits.

#### Author credential snapshot (source of truth for `lib/authors.ts`)
Pulled from each person's CV in `Clinical Sim AI LLC/Team/` (as of 2026-07-02). Use these — don't re-open the CVs unless a name/title looks stale or a new author needs adding.
- **Lauren Rissman, MD** — Attending Faculty Member, Pediatric Critical Care and Palliative Care, Advocate Children's Hospital (Park Ridge, IL); Assistant Clinical Professor, Wake Forest University School of Medicine
- **Jacqueline Ponczek, MD, MS, FAAP** — Clinical Assistant Professor in Pediatrics (Primary Care–Outreach), Northwestern University Feinberg School of Medicine; Ann & Robert H. Lurie Children's Hospital of Chicago
- **Vinod Havalad, MD** — Attending Physician; Program Director, Pediatric Simulation and Pediatric Critical Care Medicine Fellowship, Advocate Children's Hospital (Park Ridge, IL); Assistant Professor, Rosalind Franklin University of Medicine and Science; Adjunct Assistant Professor, Wake Forest University School of Medicine
- **Gillian Brennan, MB BCh BAO** — Associate Professor of Pediatrics; Attending Neonatologist and Director of Neonatal Simulation, Section of Neonatology, University of Chicago; Program Director, Neonatology Fellowship
- These are personal/academic titles from each CV, not ClinicalSim-specific role titles — the `title` field in `lib/authors.ts` may instead show their ClinicalSim role (e.g. "Chief Medical Officer, ClinicalSim") where one has been confirmed by Ben. Don't invent a ClinicalSim-specific title that isn't already in `lib/authors.ts` or confirmed by Ben.

### Citations in Blog Posts
- **Component**: `components/references-section.tsx` — numbered academic citation list
- **Type**: `Citation` interface in `lib/types.ts` (fields: `authors?`, `title`, `source`, `year`, `url?`, `doi?`)
- **Usage in MDX**: Import and use at the bottom of a post:
  ```mdx
  import { ReferencesSection } from "@/components/references-section"

  {/* ... post content ... */}

  <ReferencesSection references={[
    { authors: "Smith J, Doe A", title: "Study Title", source: "Journal Name", year: "2024", doi: "10.1234/example" },
  ]} />
  ```
- **Hallucination rule applies**: Never fabricate citations. Only add references with real, verifiable sources.

### MDX Content Guidelines
- Use `page.mdx` files that import ArticleLayout component
- Escape special characters: `p<0.001` → `p&lt;0.001`
- Follow established tag conventions (see Insights page for color coding)

## Design System (Updated May 2026)

**Source of truth**: `/Users/benconway/Documents/Documents - Ben ClinicalSim Macbook Pro/Clinical Sim AI LLC/Claude-Workspace/context/brand-guidelines.md`. Read it before producing any visual or branded output. The guidelines override anything below if they conflict.

### Color System (Tailwind tokens in `tailwind.config.ts`)
**Primary palette**
- `cs-dark-blue` `#061729` — primary brand color, default body text on light, hero backgrounds
- `cs-electric` `#79f0b8` — accent only (CTAs, single emphasized words, logo soundwave)
- `cs-cloud` `#e8e7e6` — soft neutral background

**Secondary palette**
- `cs-navy` `#163b61` — color-coded sections, secondary dark surfaces
- `cs-light-blue` `#86d0eb` — soft accent
- `cs-dark-gray` `#8e9091`, `cs-gray` `#c3c5c7` — dividers, secondary text, footnotes

**Electric green contrast rule (non-negotiable)**
- Electric is only legible over `cs-dark-blue` or `cs-navy`. Never place Electric text, icons, dividers, or backgrounds on White, Cloud, Light Blue, or Gray.
- For CTAs on light surfaces use the inverse pair: Dark Blue background, White text. Reserve the Electric-background button for placements that sit on Dark Blue or Navy.

### Typography
- **Plus Jakarta Sans** is the only brand typeface. Loaded via `var(--font-plus-jakarta)` in `tailwind.config.ts`.
- Approved weights only: Light (300), Medium (500), Bold (700).
- Default text color on light surfaces is `cs-dark-blue` (never pure black). On Dark Blue or Navy surfaces use white or `cs-cloud`.

### Button Variants (`components/ui/button.tsx`)
- `default` — Dark Blue background, white text. Primary CTA on light surfaces.
- `accent` — Electric background, Dark Blue text, bold. Primary CTA on Dark Blue or Navy surfaces only.
- `secondary` — 1.5px Dark Blue outline, Dark Blue text, fills on hover.
- `link` — Dark Blue underline on hover.
- `outline`, `ghost`, `destructive` — shadcn defaults retained for product UI.

### Custom Components Library
**Feature Components:**
- `components/feature-card.tsx` — Asymmetric cards with hover state
- `components/stat-highlight.tsx` — Large statistics, Plus Jakarta
- `components/evidence-showcase.tsx` — Research study display with badges and citations

**Layout Components:**
- `components/asymmetric-grid.tsx` — Featured-left/right, staggered, mixed
- `components/section-divider.tsx` — SVG dividers: diagonal-down/up, wave, curve

**Media Components:**
- `components/demo-video-section.tsx` — Video embed
- `components/screenshot-gallery.tsx` — Lightbox gallery with keyboard navigation

**Authorship & Citation Components:**
- `components/author-byline.tsx` — Author display with colored initials avatar (individual) or Users icon (team)
- `components/references-section.tsx` — Numbered academic citation list for MDX blog posts

### Border Radius System
- `rounded-xs` (4px), `rounded-sm` (6px), `rounded-md` (8px), `rounded-lg` (8px), `rounded-xl` (16px), `rounded-2xl` (24px)
- Vary based on component importance — avoid uniform 8px everywhere.

### Retired (do not reintroduce)
The following are deprecated as of April 2026. Do not add new instances and replace any survivors:
- Warm orange accent `#F97316` and `text-warm` / `bg-warm` / `border-warm` / `warm-accent` / `warm-filled` classes
- Blue-to-indigo-to-purple gradient buttons (`gradient-primary`) and shimmer animations
- Border-glow hover in warm orange
- Poppins, IBM Plex Mono, Inter, Roboto — replaced by Plus Jakarta Sans only

## Hallucination Prevention

This is a healthcare/medical education site. Accuracy is non-negotiable.

- **NEVER fabricate statistics, study results, journal names, or citations.** If you don't know the real source, say so — do not invent one.
- **NEVER invent CPT codes, reimbursement rates, or regulatory claims.** Verify against existing site content or ask the user for the source.
- **Before writing any claim with a number, percentage, or dollar amount:** confirm it exists in the codebase already OR the user has provided it. Do not extrapolate or round existing stats into new ones.
- **Quotes and testimonials:** Only use quotes that already exist in the codebase. Never generate fake testimonials.
- **When in doubt, leave it out.** A page with no citation is better than a page with a fabricated one. Flag uncertain claims to the user rather than guessing.
- **Existing site content is not automatically trustworthy.** If something on the site looks wrong or unsourced, flag it rather than propagating it into new content.

## GEO (Generative Engine Optimization) Guidelines

All content on this site must be optimized for discovery by AI search systems (ChatGPT, Perplexity, Google AI Overviews, etc.). Follow these rules when creating or modifying pages:

### Page Metadata (Required for all TSX pages)
- Every page MUST have `export const metadata: Metadata` with: `title`, `description`, `openGraph` (title, description, url), `twitter` (title, description), and `alternates.canonical`
- Root layout (`app/layout.tsx`) uses `metadataBase` and template titles (`%s | ClinicalSim.ai`)
- Descriptions should include specific stats and source references where possible

### Structured Data (JSON-LD)
- Use `components/json-ld.tsx` helper for all structured data
- Marketing layout includes Organization + WebSite schemas
- Blog posts include Article schema via `components/article-layout.tsx`
- Solution pages include BreadcrumbList + FAQPage schemas via `components/solution-page-layout.tsx`
- Standalone pages include WebPage + BreadcrumbList schemas (see `/practice` page for example)
- **IMPORTANT**: Every new page MUST include appropriate JSON-LD structured data. This is a non-negotiable requirement — always add at minimum WebPage + BreadcrumbList schemas when creating new pages.

### Citation Magnets & Extractable Content
- Include self-contained, quotable definition blocks (2-3 sentences with a stat + source)
- FAQ sections on solution pages: clear Q/A format, self-contained answers, each with a stat + source
- "Key Takeaway" blocks at the top of high-value blog posts: 1 quotable sentence + stat
- All statistics must include their source attribution

### Content Structure for AI Discoverability
- Use clear heading hierarchy (H2 for sections, H3 for subsections)
- Write self-contained paragraphs — avoid ambiguous pronouns; AI systems extract individual passages
- Include specific numbers, CPT codes, dollar amounts, and percentages with source citations
- FAQ answers should be independently understandable without reading the question

### Infrastructure Files
- `app/robots.ts` — Crawler rules; blocks GPTBot (training) while allowing search crawlers
- `app/sitemap.ts` — Auto-generated from `lib/posts.ts`, `lib/solutions.ts`, `lib/audiences.ts`
- `public/llms.txt` — Page index for LLM crawlers; update when adding/removing pages
- When adding new pages, update `app/sitemap.ts` and `public/llms.txt`

### Solution Page Data (`lib/solutions.ts`)
- `faqs` field: Array of `{ question, answer }` for FAQ section + FAQPage JSON-LD
- `lastUpdated` field: ISO date string displayed in hero section
- When modifying solution page content, update `lastUpdated` date