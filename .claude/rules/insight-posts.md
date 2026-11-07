---
paths:
  - "app/**/insights/**"
  - "lib/posts.ts"
  - "lib/posts.test.ts"
  - "components/article-layout.tsx"
  - "components/references-section.tsx"
---

# Insight posts

Posts live at `app/(marketing)/insights/<slug>/page.mdx`, render inside `components/article-layout.tsx`, and must be registered in `lib/posts.ts`. Other agents add posts too, so read the registry for the current list rather than assuming one.

## Metadata and titles

- A post's `export const metadata` is `getPostMetadata("<slug>")` from `lib/posts.ts` and nothing else. The helper builds title, description, canonical, OpenGraph (`type: article`), and Twitter tags from the registry entry. Hand-written blocks have shipped without a canonical and with a doubled `| ClinicalSim.ai` suffix.
- The registry `title` is the bare title with no suffix, and it is also the visible `<h1>`, so changing it is an editorial change. `getPostMetadata` emits `seoTitle ?? title` through the root template (`%s | ClinicalSim.ai`); `og:title` and `twitter:title` keep the full `title`.
- The rendered `<title>`, including the 17-character suffix, is 60 characters or fewer. A registry `title` over 43 characters needs a shorter `seoTitle` that keeps the main search phrase. Shorten the `seoTitle`, not the headline.
- The `<title>` differs from the `<h1>`. Going through the template is what guarantees that, so don't use `title: { absolute }` for posts.
- `lib/page-titles.test.ts` enforces the 60-character and title-differs-from-H1 limits.

## Dates and reading time

- `dateModified` is optional and falls back to `date` in JSON-LD and the sitemap. Set it only for significant content edits, since registry dates must describe real changes and not the build date.
- `readingTime` must match the MDX word count at 225 words a minute, within one minute (`lib/reading-time.test.ts`). Update it whenever a post's length changes.

## Citations

- Put references at the bottom of the post with `ReferencesSection`:
  ```mdx
  import { ReferencesSection } from "@/components/references-section"

  <ReferencesSection references={[
    { authors: "Smith J, Doe A", title: "Study Title", source: "Journal Name", year: "2024", doi: "10.1234/example" },
  ]} />
  ```
  Fields come from the `Citation` type in `lib/types.ts`.
- Cite only real, verifiable sources.
- Resolve every DOI before shipping it: `curl -sI https://doi.org/<doi>` must redirect to the article, not "DOI Not Found". Take the DOI from the publisher's article page or Crossref, not from the article number, and make the `source` article number match it.

## MDX

- Escape comparison signs in prose: `p&lt;0.001`, not `p<0.001`.
- Tag colors follow `getTagColor` in `app/(marketing)/insights/page.tsx`.
- High-value posts open with a Key Takeaway block (`components/key-takeaway.tsx`): one quotable sentence with a stat and its source.
- MDX H2s get ids from `headingId()` in `lib/howto-schema.ts`. A post with `howToSteps` in the registry emits HowTo schema; step names must be verbatim H2s and step text verbatim paragraphs (`lib/howto-schema.test.ts`).

## Content

- Prefer first-hand material over literature synthesis. The snapshotted encounters registered in `lib/examples/index.ts` have real transcripts, rubric rationale, and learner quotes, and a specific score split from one of them is worth more than another summary paragraph.
- A thin post weakens the topic it covers. When two posts cover one topic, merge them: set `redirectTo` on the retired entry in `lib/posts.ts` and add a permanent redirect in `next.config.mjs`.
- Bylines and reviewers need the named person's confirmation. See `.claude/rules/authorship.md`.
