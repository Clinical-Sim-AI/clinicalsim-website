---
paths:
  - "app/**/page.tsx"
  - "app/**/page.mdx"
  - "app/**/layout.tsx"
  - "app/sitemap.ts"
  - "app/llms.txt/**"
  - "app/robots.ts"
  - "lib/*.ts"
  - "lib/examples/**"
  - "components/*-layout.tsx"
  - "components/json-ld.tsx"
  - "components/*-schema.tsx"
  - "next.config.mjs"
---

# SEO, metadata, and structured data

Google's generative-AI features draw on the normal index, so these rules are ordinary SEO. Structured data earns rich results and clear entity data; don't add a schema type on the theory that it will sway an AI answer.

## Page metadata

- Every page exports `metadata: Metadata` with `title`, `description`, `openGraph` (title, description, url), `twitter` (title, description), and `alternates.canonical`. Insight posts get all of this from `getPostMetadata` (see `.claude/rules/insight-posts.md`).
- `app/layout.tsx` sets `metadataBase` and the title template `%s | ClinicalSim.ai`, a 17-character suffix.
- Descriptions should carry a specific stat and its source where possible.

### Two title families

- **Template** (bare title, suffix added once, rendered 60 characters or fewer, never equal to the `<h1>`): insight posts, help articles (`lib/help-articles.ts`), `/insights`, and the avatar and voice/text compare pages. Comparisons put the short `<title>` in `metaTitle` and the `<h1>` in `heroHeadline`; `og:title` uses `title`.
- **Absolute** (`title: { absolute }`, no suffix, 75 characters or fewer, still different from the `<h1>`): audiences, examples, `/compare/ai-clinical-simulation-vs-standardized-patients` (which adds ": a comparison"), `/about`, `/faq`, `/glossary`, `/methodology`, and `/audiences`. `lib/examples/types.ts` has an optional `metaTitle` for cases whose title plus ": Example Feedback" runs long.
- Solution pages use the template. Their `metaTitle` in `lib/solutions.ts` is bare and must leave room for the suffix.
- Don't move a registry-driven family to `absolute`; the template is what keeps `<title>` and `<h1>` apart. `lib/page-titles.test.ts` checks both families.

## Structured data (JSON-LD)

- Every new page needs JSON-LD, at minimum WebPage and BreadcrumbList. Build it with `components/json-ld.tsx`; `/privacy` and `/research` are standalone examples.
- What already emits schema: the marketing layout (Organization, WebSite); `components/article-layout.tsx` (Article); `components/solution-page-layout.tsx` and `components/remediation-page-layout.tsx` (WebPage, BreadcrumbList, FAQPage); `components/audio-object-schema.tsx` on example pages (AudioObject from the `lib/examples` snapshot). `/health-systems` and `/nursing` build the solution set by hand from `lib/health-systems.ts` and `lib/nursing.ts`.
- On solutions, `reviewedBy` and `citations` add `reviewedBy`, `lastReviewed`, and `citation` to the WebPage node via `lib/review-schema.ts`. Reviewer names need confirmation (see `.claude/rules/authorship.md`).
- HowTo is emitted for entries with `howToSteps` in `lib/posts.ts` or `lib/solutions.ts`, and on `/health-systems` and `/nursing`. Step names are verbatim H2s and step text verbatim paragraphs (`lib/howto-schema.test.ts`). On solution and standalone pages the steps also render as a numbered list (`components/solution-page-layout.test.tsx`). Google retired the HowTo rich result in 2023, so this is entity markup only.
- Every URL in schema must resolve. Organization nodes spread `ORGANIZATION`, or `ORGANIZATION_PUBLISHER` when a logo is needed, from `lib/positioning.ts`; the logo path lives once in `ORGANIZATION_LOGO`, and `lib/organization-logo.test.ts` checks the file exists. Don't write the company name or logo path inline.

## Sitemap, llms.txt, robots

- `app/sitemap.ts` builds from the post, solution, audience, comparison, and example registries. `app/llms.txt/route.ts` is the only source of `/llms.txt` (there is no `public/llms.txt`). When you add or remove an indexable route, update both. `lib/llms-coverage.test.ts` checks that every indexable sitemap URL appears in llms.txt.
- Google ignores llms.txt. It is maintained for other answer engines. Adding a page to it does not help Google visibility.
- Each sitemap `url` equals the URL internal links resolve to. The homepage is `https://clinicalsim.ai/` with a trailing slash because links use `href="/"`; its rendered canonical has no slash because Next strips it, and both are the same URL. Every other path has no trailing slash and equals its canonical.
- `app/robots.ts` allows both `OAI-SearchBot` and `GPTBot`.
- `lib/page-dates.ts` holds change dates shared by a static page's schema and sitemap entry. Change a date only when the public page changes materially.

## Content structure

- Give every leaf page, such as a help article, at least two inbound links with descriptive anchor text from related pages, in addition to its hub listing on `/help` or `/insights`.
- Don't create a page per query variation. One page owns each answer: `/faq` defers five questions to `/medical-educator-faq` through `FaqEntry.educatorFaqAnchor` and leaves them out of its own FAQPage schema.
- Use H2 for sections and H3 for subsections. Write paragraphs that stand alone without pronouns pointing to earlier text, and keep them to four sentences or fewer on long pages.
- Include quotable two-to-three-sentence definition blocks with a stat and source. FAQ answers should make sense without the question, and every statistic carries its source.

## Solution pages (`lib/solutions.ts`)

- `faqs` (`{ question, answer }[]`) drives the FAQ section and FAQPage schema.
- `lastUpdated` is an ISO date shown in the hero. Update it whenever you change a solution's content.

## Platform app

`platform.clinicalsim.ai` (repo `clinical-sim-app-deux`) is noindexed through `X-Robots-Tag` and root `robots` metadata, and its `robots.txt` allows crawling so crawlers see the noindex. Semrush still audits it, so its pages need distinct titles, descriptions, and a server-rendered `<h1>`.
