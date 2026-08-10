# Copy audit implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the August 10, 2026 copy audit across the public site while preserving source records, verified evidence, and legal review boundaries.

**Architecture:** Shared terms, calls to action, and product boundaries will be fixed in registries and layout components so related routes stay consistent. Route-specific introductions, metadata, evidence limits, and article copy will remain in their existing page files. Direct learner transcripts and scored feedback records will not be rewritten.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, MDX, Vitest, Tailwind CSS.

## Global constraints

- Use sentence case for published headings and card titles.
- Use "AI patients" and "high-stakes conversations" in product copy.
- ClinicalSim extends standardized patient programs and does not replace human judgment.
- Do not add study outcomes, customer expansion claims, or legal conclusions that still require owner review.
- Do not alter direct learner transcripts, cited source titles, or scored evidence.
- Use the apex canonical host `https://clinicalsim.ai`.
- Published copy must contain no em dashes or en dashes.

---

### Task 1: Copy regression coverage

**Files:**
- Create: `lib/copy-audit.test.ts`
- Test: `lib/copy-audit.test.ts`

**Interfaces:**
- Consumes: public route, registry, and shared component source files.
- Produces: regression checks for visible defects and prohibited claims.

- [ ] Write source-level tests for duplicated hero output, pluralization, punctuation spacing, retired compliance phrases, faculty-replacement claims, and the inaccurate one-rubric message.
- [ ] Run `pnpm test lib/copy-audit.test.ts` and confirm the new checks fail for current defects.
- [ ] Keep the tests limited to published marketing source. Exclude learner transcripts and cited titles.

### Task 2: Shared message system and visible defects

**Files:**
- Modify: `app/(marketing)/page.tsx`
- Modify: `components/rotating-text.tsx`
- Modify: `components/feedback/example-card.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/solution-page-layout.tsx`
- Modify: `components/audience-page-layout.tsx`
- Modify: `components/comparison-page-layout.tsx`

**Interfaces:**
- Consumes: existing route data from `lib/solutions.ts`, `lib/audiences.ts`, and `lib/comparisons.ts`.
- Produces: consistent CTA labels, product boundary language, heading case, and accessible rotating hero text.

- [ ] Fix the hero duplication and example assessment pluralization with regression coverage.
- [ ] Replace repeated homepage arguments with the approved hero, inspectable-score proof, product boundary, and closing CTA.
- [ ] Change the footer navigation heading to "Explore" and use sentence case.
- [ ] Run the focused copy test.

### Task 3: Core route copy

**Files:**
- Modify: `app/(marketing)/about/page.tsx`
- Modify: `app/(marketing)/contact/page.tsx`
- Modify: `app/(marketing)/insights/page.tsx`
- Modify: `app/(marketing)/solutions/page.tsx`
- Modify: `app/(marketing)/audiences/page.tsx`
- Modify: `app/(marketing)/research/page.tsx`
- Modify: `app/(marketing)/glossary/page.tsx`
- Leave unchanged: `app/(marketing)/methodology/page.tsx` (owner direction)
- Modify: `app/(marketing)/trust/page.tsx`
- Modify: `app/(marketing)/faq/page.tsx`
- Leave unchanged: `app/(marketing)/medical-educator-faq/page.tsx` (owner direction)
- Modify: `app/(marketing)/compare/page.tsx`
- Modify: `app/(marketing)/examples/page.tsx`
- Modify: `app/(marketing)/help/page.tsx`
- Modify: `app/(marketing)/help/release-notes/page.tsx`
- Modify: `app/(marketing)/privacy/page.tsx`
- Modify: `app/llms.txt/route.ts`

**Interfaces:**
- Consumes: the audit's approved openings and evidence boundaries.
- Produces: shorter core pages with route-specific next steps and no retired compliance claims.

- [ ] Apply the approved introductions, direct-answer copy, and route-specific calls to action.
- [ ] Remove categorical FDA and HIPAA language; state product facts and current attestation status only.
- [ ] Add only confirmed study details already supported in the repository. Keep unresolved percentages and customer expansion examples unpublished.
- [ ] Reduce public release notes to customer-visible changes.
- [ ] Run the focused copy test and `pnpm typecheck`.

### Task 4: Use-case, audience, comparison, and example routes

**Files:**
- Modify: `lib/remediation.ts`
- Modify: `lib/solutions.ts`
- Modify: `lib/audiences.ts`
- Modify: `lib/comparisons.ts`
- Modify: `app/(marketing)/solutions/remediation/page.tsx`
- Modify: `app/(marketing)/solutions/longitudinal-curriculum/page.tsx`
- Modify: `app/(marketing)/solutions/undergraduate-medical-education/page.tsx`
- Modify: `app/(marketing)/solutions/faculty-development/page.tsx`
- Modify: `app/(marketing)/audiences/*/page.tsx`
- Modify: `app/(marketing)/compare/*/page.tsx`
- Modify: `app/(marketing)/examples/[slug]/page.tsx`
- Modify: `lib/examples/index.ts`

**Interfaces:**
- Consumes: shared page layouts and the existing data registries.
- Produces: stage-appropriate framework language, cautious evidence framing, and shared example introductions.

- [ ] Replace faculty-observation replacement claims with evidence that complements faculty review.
- [ ] Remove unsupported risk, HCAHPS, and trainee-causation bridges.
- [ ] Give overlapping faculty and solution pages distinct jobs.
- [ ] Update comparison decks and example metadata without touching transcript or scored feedback records.
- [ ] Run the focused copy test and full Vitest suite.

### Task 5: Insight copy and consolidation

**Files:**
- Modify: `lib/posts.ts`
- Modify: `app/(marketing)/insights/*/page.mdx`
- Modify: `next.config.mjs`
- Modify: `app/sitemap.ts`
- Modify: `app/llms.txt/route.ts`

**Interfaces:**
- Consumes: the post registry and route metadata helper.
- Produces: sentence-case article framing, supported claims, and redirects for consolidated posts where unique evidence can be preserved in the destination.

- [ ] Update titles, decks, openings, and headings named in the audit.
- [ ] Remove repeated takeaway blocks and unsupported causal language.
- [ ] Consolidate overlapping posts only when all unique sourced evidence is retained in the destination; otherwise keep the route with its approved narrower framing.
- [ ] Update post registry metadata, route indexes, and redirects together when a route is removed.
- [ ] Run sitemap and llms.txt coverage tests.

### Task 6: Humanizer, safety scan, and full verification

**Files:**
- Modify: changed published source files only when the scans find a violation.

**Interfaces:**
- Consumes: all changed copy.
- Produces: humanized, factual, buildable site content.

- [ ] Scan changed published copy for em dashes, en dashes, banned AI vocabulary, title-case headings, wrong product terms, and unsupported claims.
- [ ] Run `pnpm lint`.
- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm build`.
- [ ] Review `git diff --check`, the full diff, and unresolved audit items before handoff.
