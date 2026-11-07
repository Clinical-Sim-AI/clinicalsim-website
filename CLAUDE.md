# CLAUDE.md

Marketing site for clinicalsim.ai: Next.js 16 App Router, Tailwind with CSS variables, shadcn/ui on Radix, Lucide icons, React Hook Form with Zod, Vitest.

Area-specific rules live in `.claude/rules/` and load when you touch matching files: `insight-posts.md`, `authorship.md`, `design-system.md`, `seo-and-schema.md`, `example-snapshots.md`. Machine-local paths (brand source documents) are in `CLAUDE.local.md`, which is gitignored and may be absent.

## Commands

- `pnpm dev`, `pnpm build`, `pnpm start`
- `pnpm lint` (ESLint), `pnpm typecheck` (`tsc --noEmit`), `pnpm test` (Vitest, single run)

Before handing off code or content changes, run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. The build skips type errors (`typescript.ignoreBuildErrors` in `next.config.mjs`), so it does not replace the separate checks. `.github/workflows/quality.yml` runs ESLint and TypeScript as separate CI jobs.

Quote paths that contain parentheses, because zsh treats them as globs: `git diff "app/(marketing)/insights/page.tsx"`, not `git diff app/(marketing)/insights/page.tsx`.

Other agents add insight posts to this repo, so pull before committing.

## Where things live

Most pages render from typed registries in `lib/`, and the sitemap, `/llms.txt`, and the title tests read the same registries:

- `lib/posts.ts` (insight posts), `lib/help-articles.ts`, `lib/solutions.ts`, `lib/comparisons.ts`, `lib/audiences.ts`, `lib/examples/*` (snapshotted encounters)
- `lib/authors.ts` (bylines), `lib/positioning.ts` (Organization schema constants), `lib/page-dates.ts` (static page change dates)

Tests sit beside the code they cover. `components/ui/` starts from the shadcn CLI (`npx shadcn@latest add <component>`). Keep hand edits there deliberate: `button.tsx` carries the brand variants, and re-running the CLI on it would overwrite them. `next.config.mjs` pins `turbopack.root` to this repo so Next ignores lockfiles in parent folders.

When you add or remove an indexable route, update `app/sitemap.ts` and `app/llms.txt/route.ts`, then run `pnpm test`.

## Canonical host

The canonical host is `https://clinicalsim.ai` (apex, no www). Use it for every `canonical`, `openGraph.url`, and absolute URL in the sitemap, llms.txt, and JSON-LD. `next.config.mjs` redirects www to the apex, so a www URL recreates the duplicate Google reports as "Alternate page with proper canonical tag". Build absolute URLs from the `https://clinicalsim.ai` string already used in `lib/` and `app/sitemap.ts` rather than adding a new base constant.

## Accuracy

This is a medical education site, so a fabricated fact does more damage than a missing one.

- Don't invent statistics, study results, journal names, citations, quotes, testimonials, CPT codes, reimbursement rates, or regulatory claims. If you don't know the source, say so.
- Before writing a number, percentage, or dollar amount, confirm it already exists in the codebase or the user supplied it. Don't extrapolate or round existing figures into new ones.
- Existing site content is not automatically correct. Flag anything that looks wrong or unsourced instead of copying it forward.
- When in doubt, leave it out, and tell the user what you left out.

### Evidence guardrails

- Remediation time: the supported figure is a mean of 29.6 specialist contact hours in one clinical reasoning remediation program (Guerrasio and Aagaard, 2014). Don't turn it into a general range such as 29 to 45 or 25 to 75 hours.
- Standardized patient cost: the hourly rate is publishable and the per-encounter total is not. Ben authorized $123 to $177 an hour fully loaded, and roughly $27,000 to $68,000 a year for a 60-resident program, on 2026-08-31, sourced to the published UCLA and University of Utah rate cards (seed deck v10 slide 11). It ships in `lib/comparisons.ts` with the rate-card date printed and labelled as the SP-time component. Keep actor wages, space, faculty time, geography, and program design separate unless a public method supports an all-in total.
- The University of Chicago coaching study and the Advocate Health feasibility study are separate records. Their outcomes stay unpublished until Havalad, Brennan, and Lemelman confirm in writing each title, author list, institution, sample, outcome, venue or manuscript status, and primary analysis. Seed deck v10 slide 10 has all those fields; the missing piece is the written confirmation, which Ben did not have as of 2026-08-31.
- The shape of the research portfolio (study counts, institutions, stages, grants) is also unpublishable until that confirmation arrives. It was drafted onto `/research` and `/evaluation` on 2026-08-31 and withdrawn the same day at Ben's instruction, so don't restore it from the deck.
- Leave the founding story in `eol-communication-training-measurement-gap` as is until Ben and Lauren confirm the sequence and wording. Then update the post, its registry description, and `dateModified` together.

## Writing site copy

These rules cover everything a visitor reads: page and hero text, headings, MDX bodies, FAQ answers, metadata descriptions, alt text, and button labels. ClinicalSim sells to graduate medical education, and copy that reads as generated undercuts its credibility.

Before finalizing user-facing prose, run the `humanizer` skill, including its final dash scan. The skill holds the full voice spec and wins on voice where it differs from this file. The accuracy rules above win on facts. The brand voice source document is listed in `CLAUDE.local.md`. If the skill is unavailable, apply the rules below.

- No em dashes or en dashes in published copy. Use commas, periods, parentheses, or a rewrite, and `--` only where a dash is unavoidable.
- Drop AI vocabulary: additionally, furthermore, moreover, subsequently, consequently, delve, crucial, enhance, foster, garner, robust, nuanced, seamless, pivotal, showcase, underscore, abstract "landscape" or "tapestry", metaphorical "navigate".
- Use "is", "are", and "has" rather than "serves as", "stands as", "boasts", "features", "offers", or "represents".
- Avoid forced triplets, runs of fragments, and question headers like "The result?". Prefer flowing 20 to 30 word sentences joined with "that", "and", or "so", and keep short sentences for emphasis.
- No hype or empty verbs: revolutionizing, cutting-edge, state-of-the-art, best-in-class, game-changer, leverage, unlock, empower, synergy.
- No chatbot phrases, hedges ("quite", "fairly", "somewhat"), or generic closers ("the future looks bright").
- Straight quotes, sentence-case headings, no emoji unless Ben asks, and no hyphens in open compounds such as "real time", "high quality", "data driven".
- Give every claim a number, a name, or a source.
- On long pages, keep paragraphs to four sentences or fewer and use subheads or lists for sequences.
- Vary the rhythm, take a point of view, and be specific. Test: would a program director take it seriously, and would it sound right if Ben said it in a meeting?

### Product language

- "AI patients", not "bots", "virtual patients", or "chatbot". The product is voice-based simulation.
- "High-stakes conversations", not "difficult conversations". "Communication training" or "communication remediation", not "soft skills".
- "Evidence-based", not "clinically proven" or "validated". The RCT is "among the first", nothing stronger.
- ClinicalSim extends a standardized patient program and does not replace it.
- Make the learner or program the subject of the sentence: "clinicians build confidence through practice", not "AI helps clinicians build confidence".

### Clinicians at the center

Buyers want measurement and reporting, but clinicians, learners, and staff are the people who use the product, and public copy has to respect both.

- Lead with practice, useful feedback, and better patient conversations. Measurement is the method, not the purpose.
- Make clear that participants practice simulated conversations with AI patients. Don't imply ClinicalSim records or monitors real patient encounters.
- Measure the conversation and support the participant. Don't frame clinicians as problems to find or fix.
- Describe feedback as balanced: what the participant did well and what to practice next. Avoid deficit-first phrases in marketing copy, such as "fell short", "breaks down", "fix what we find", "going wrong", and "where complaints are coming from".
- Put the participant's benefit before the leader's reporting benefit. Leaders review patterns across a cohort or unit, and each participant gets clear feedback and another chance to practice.
- Where reporting could feel punitive, state the formative-use and employment-use boundaries, and don't let commercial language weaken them.

## Search visibility in one paragraph

Google's 2026 guidance says AI Overviews and AI Mode draw on the normal search index, don't require structured data, and ignore llms.txt. A page reaches them through ordinary SEO, and what decides visibility here is editorial: first-hand, expert-led content with real media and named authors. Details are in `.claude/rules/seo-and-schema.md`.
