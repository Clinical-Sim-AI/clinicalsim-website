# ClinicalSim GEO and SEO site audit

**Audit date:** 2026-08-07  
**Repository:** `clinicalsim-website`  
**Production host:** `https://clinicalsim.ai`  
**Deck reviewed:** `ClinicalSim-Seed-Deck-v37-2026-08-06.pptx`  
**Historical baseline:** `docs/website-vs-investor-deck-audit-2026-08-04.md`

## Executive decision

The site's technical foundation is sound. Production serves the apex canonical host, all 48 content routes have one canonical and one H1, representative pages return 200, the sitemap covers every indexable route, and both the production build and lint pass.

The next pass should not start with new pages. The highest-value work is to correct research attribution, remove unsupported cost and faculty-hour ranges, fix the broken internal link and duplicate titles, and make the crawler policy match the stated GEO goal. Those fixes protect the evidence base that search engines and answer engines are already extracting.

The investor deck is useful positioning input, but it is not a public claim library. The named customer roster, pipeline, round terms, pricing model, corpus strategy, and account-level expansion details should remain private unless Ben clears each item. The deck also contains six internal conflicts that must be fixed before its study and economic claims move onto the site.

## Priority queue

| Order | Finding | Severity | Owner decision needed |
|---|---|---:|---:|
| 1 | Separate and correct the two research studies | Critical | Yes |
| 2 | Allow `GPTBot` under the approved GEO policy | High | No, direction is in the audit brief |
| 3 | Remove or re-source the faculty-hour and SP cost ranges | High | Yes for replacement claims |
| 4 | Fix the broken `/demo` link | High | No |
| 5 | Remove duplicate brand suffixes from three solution titles | High | No |
| 6 | Reconcile the founding story before editing the named-author post | High | Yes |
| 7 | Repair `llms.txt` coverage and the truncated example summary | Medium | No |
| 8 | Fill page-level structured-data gaps | Medium | No |
| 9 | Make sitemap and Article modification dates truthful | Medium | No |
| 10 | Rewrite the legacy insight set for citations and brand voice | Medium | Yes for any new product or study claim |

## Scorecard

| Area | Result | Evidence |
|---|---|---|
| Canonicals and host consolidation | Pass | 48 of 48 content pages have one apex canonical; `www` returns 308 to the same path on the apex |
| Metadata | Pass with one title defect | Every content page has an OpenGraph URL plus Twitter title and description; three solution titles repeat the brand |
| H1 structure | Pass | 48 of 48 generated content pages have one H1 |
| Indexability | Pass | 47 URLs are in the sitemap; the one omitted content route, `/roi-calculator`, is intentionally `noindex, nofollow` |
| Internal links | Fail | `/insights/osce-case-design-guide` links to the nonexistent `/demo` route |
| Crawler policy | Needs change | AI search crawlers are allowed, but `GPTBot` is explicitly blocked |
| Structured data | Good with gaps | 13 Article routes, 11 FAQPage routes, and one DefinedTermSet; `/privacy`, `/research`, and `/solutions/remediation` have page-level gaps |
| `llms.txt` | Good with gaps | 46 listed content URLs versus 47 sitemap URLs; `/contact` is missing and one example description ends mid-word |
| Answer-ready insight content | Incomplete | 4 of 13 posts have a KeyTakeaway and 4 of 13 have a ReferencesSection |
| Factual consistency | Fail | Research studies are conflated; faculty-hour and SP cost ranges conflict; the founding story conflicts with v37 |
| Brand voice | Fail | 168 long-dash tokens remain in marketing pages and primary copy registries, before counting example and feedback data |
| Build health | Pass with warnings | `pnpm build` and `pnpm lint` pass; Next warns about workspace-root inference and the build skips type validation by configuration |

## Route inventory and discovery coverage

The build contains 46 page source files. The dynamic example route expands to three pages, producing 48 public content routes.

| Route family | Generated routes | Sitemap | `llms.txt` | Notes |
|---|---:|---:|---:|---|
| Static and index pages | 18 | 17 | 16 | `/roi-calculator` is intentionally excluded; `/contact` is missing only from `llms.txt` |
| Audience detail pages | 8 | 8 | 8 | Complete |
| Solution detail pages | 4 | 4 | 4 | Complete |
| Comparison detail pages | 2 | 2 | 2 | Complete |
| Example detail pages | 3 | 3 | 3 | One summary is truncated in source |
| Insight posts | 13 | 13 | 13 | Complete route coverage, uneven evidence coverage |
| **Total** | **48** | **47** | **46** | One intentional noindex route and one `llms.txt` omission |

Production discovery files match the repository. `/robots.txt`, `/sitemap.xml`, and `/llms.txt` all use `https://clinicalsim.ai`, and no public canonical or OpenGraph URL uses `www`.

## Detailed findings

### F01. The public research story merges two different studies

**Severity:** Critical  
**Affected:** `/research`, `/solutions/remediation`, `app/(marketing)/research/page.tsx`, `lib/remediation.ts`, v37 slides 14 and 26  
**Source status:** Verified conflict between the live site, repository, and v37  
**Ben approval required:** Yes

The live research page labels the Advocate feasibility findings as `Enhancing Difficult Conversations in Pediatrics Using Artificial Intelligence`, marks them as presented at IPSSW 2026, and credits Vinod Havalad and Gillian Brennan. V37 treats these as two separate records:

- A University of Chicago coaching study led by Lemelman, presented at IPSSW 2026.
- An Advocate Health 31-provider feasibility study led by Havalad and Brennan, with a manuscript submitted.

The same page says `Gillian Brennan, MD`; the author registry and v37 give `MB BCh BAO`. It also says perceived comfort improved significantly, while the deck says self-rated competence did not track objective performance. V37 itself reports `p = 0.0017` on slide 14 and `p = 0.000345` on slide 26 for the coaching study.

**Recommended fix:** Remove study outcomes from the `/research` metadata until the source records are reconciled. Then publish two separate evidence cards with the exact title, authors, institution, sample, outcome, venue or manuscript status, and source. Correct Brennan's credential. Do not publish either p-value or the comfort claim until the study owner confirms the instrument and primary analysis.

### F02. `GPTBot` is blocked even though the chosen GEO policy is to allow it

**Severity:** High  
**Affected:** `/robots.txt`, `app/robots.ts`  
**Source status:** Verified in production and against official OpenAI documentation  
**Ben approval required:** No, this audit brief supplies the decision

Production explicitly allows `OAI-SearchBot` and explicitly disallows `GPTBot`. OpenAI documents these as independent controls: `OAI-SearchBot` is used for ChatGPT search, while `GPTBot` may collect content used to improve foundation models. Blocking `GPTBot` does not block ChatGPT search, but it conflicts with the requested policy of allowing both uses. See the [official OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

**Recommended fix:** Add `GPTBot` to the explicit allow list and remove its disallow rule. Keep `OAI-SearchBot` allowed. After deployment, verify the rendered file and allow about 24 hours for OpenAI's systems to adjust, per the official documentation.

### F03. Faculty-hour and standardized-patient costs still conflict

**Severity:** High  
**Affected:** Homepage, `/about`, `/faq`, `/audiences/program-directors`, `/audiences/simulation-center-directors`, `/solutions/remediation`, two insight posts, `lib/audiences.ts`, `lib/remediation.ts`, `lib/posts.ts`, `lib/comparisons.ts`  
**Source status:** Partially sourced and contradicted by the repository's own evidence file  
**Ben approval required:** Yes for any replacement number

The site uses both `29-45` and `25-75` faculty hours for a remediation case. The homepage attributes `29-45` to Guerrasio and Aagaard 2014, but that paper supports a mean of 29.6 specialist contact hours for clinical-reasoning remediation. It does not support 45. `lib/roi/constants.json` records that the supposed Penn 45-hour average does not exist and that the 25-to-75 range comes from one study of one deficit type, not a general remediation range.

The site also uses `$50-$500` and `$150-$300` as SP encounter costs. V37 supports a `$20-$30` hourly actor rate plus room and faculty costs, not either per-encounter range. The internal ROI evidence file uses a separate `$45-$70` fully loaded estimate and states that no published US headline figure exists.

**Recommended fix:** Use the confirmed 29.6 mean with its scope and caveat, or remove the headline number. Stop publishing a single SP per-encounter range until its components, geography, date, and calculation method are public. Keep wages, room costs, faculty time, and internal estimates distinct.

### F04. An indexed insight post links to a missing route

**Severity:** High  
**Affected:** `/insights/osce-case-design-guide`, `app/(marketing)/insights/osce-case-design-guide/page.mdx:132`  
**Source status:** Verified in generated HTML and build routes  
**Ben approval required:** No

The closing link points to `/demo`, but the application has no `/demo` page or redirect. A generated-link scan found no other missing internal content route.

**Recommended fix:** Point the link to `/examples`, the homepage video section if it gets a stable anchor, or `/contact`. `/examples` is the best current match because it contains public recordings, transcripts, and reports.

### F05. Three solution pages repeat the brand in the HTML title

**Severity:** High  
**Affected:** `/solutions/longitudinal-curriculum`, `/solutions/undergraduate-medical-education`, `/solutions/faculty-development`, `lib/solutions.ts`  
**Source status:** Verified in live production and the production build  
**Ben approval required:** No

The registry stores `| ClinicalSim` inside each `metaTitle`, and the root layout then appends `| ClinicalSim.ai`. Production titles therefore end with `| ClinicalSim | ClinicalSim.ai`.

**Recommended fix:** Store bare page titles in `lib/solutions.ts`, as the post registry already does, and let the root template add the brand once. Keep social titles separate if a branded OpenGraph title is wanted.

### F06. `llms.txt` is one route short and publishes a broken summary

**Severity:** Medium  
**Affected:** `/llms.txt`, `app/llms.txt/route.ts`, `lib/examples/addressing-hydroxyurea-nonadherence-and-medical-mistrust.ts`  
**Source status:** Verified in production and source  
**Ben approval required:** No

`llms.txt` lists 46 content URLs while the sitemap lists 47 indexable URLs. `/contact` is the missing route. The hydroxyurea example summary ends with `takes hyd...`, where the ellipsis is stored mid-word in the generated source. That broken text flows into metadata, JSON-LD, and `llms.txt`.

**Recommended fix:** Add `/contact` to the `More` section. Repair the generated summary at its upstream snapshot source or generator so a refresh does not restore the truncation. Add a verification check that every sitemap route is either in `llms.txt` or on a documented exclusion list.

### F07. Page-level structured data has three clear gaps

**Severity:** Medium  
**Affected:** `/privacy`, `/research`, `/solutions/remediation`, and secondarily `/`  
**Source status:** Verified in generated HTML  
**Ben approval required:** No

The site has strong schema coverage: 13 Article routes, 11 FAQPage routes, one DefinedTermSet, and global Organization and WebSite data. The remaining gaps are specific:

- `/privacy` has only the global Organization and WebSite objects. It needs page-level `WebPage` and `BreadcrumbList` data.
- `/research` has `WebPage` but no `BreadcrumbList`.
- `/solutions/remediation` has `FAQPage` and `BreadcrumbList` but no `WebPage`.
- The homepage has `SoftwareApplication` and `BreadcrumbList` but no `WebPage`. This is lower priority because the application object matches the page's main subject.

Google recommends using the main type that describes the page and keeping structured data representative of visible content. See its [structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

**Recommended fix:** Add the missing objects through the existing `JsonLd` helper and test the built HTML. Do not add schema only to increase type count. Fewer complete, accurate objects are better than broader claims.

### F08. Sitemap and Article modification dates do not reflect material edits

**Severity:** Medium  
**Affected:** `app/sitemap.ts`, `lib/posts.ts`, Article JSON-LD  
**Source status:** Verified against Git history and generated sitemap  
**Ben approval required:** No

Examples include:

- The homepage changed on August 7 but reports March 16 in the sitemap.
- `/research` changed in July but reports March 16.
- `/insights` changed in July but reports February 14.
- `/methodology` changed on August 4 but reports July 2.
- All 13 posts omit `dateModified`, even though every post file changed in July or August.

Google says `lastmod` is useful only when it is accurate, and it does not use sitemap `changefreq` or `priority`. See the [Google Search Central sitemap note](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).

**Recommended fix:** Make `lastUpdated` or `dateModified` the shared source for visible dates, Article schema, and sitemap output. Update it only for material content changes. Do not substitute the build date or current date.

### F09. Published copy still fails the repository's humanizer rules

**Severity:** Medium  
**Affected:** Marketing pages, primary copy registries, legacy posts, metadata, and `llms.txt`  
**Source status:** Verified source scan  
**Ben approval required:** Yes when a rewrite changes a factual claim

The scan found 168 em dashes, en dashes, or HTML long-dash entities in marketing pages and primary copy registries. The count reaches 580 when public example and feedback data are included. The highest copy-only concentrations are `lib/audiences.ts`, the end-of-life measurement post, `lib/solutions.ts`, the homepage, `lib/comparisons.ts`, and `lib/remediation.ts`.

Four legacy posts still claim `Validated feedback mechanisms` and `Validated scenarios designed by clinical experts`. Those statements apply validation language to ClinicalSim's product even though publications are in progress. The same set also contains other vocabulary prohibited by the brand voice guide.

**Recommended fix:** Start with metadata, `llms.txt`, homepage copy, and the five highest-traffic legacy posts. Replace product-level `validated` with the exact supported wording, such as `expert-authored scenarios` or `feedback grounded in published frameworks`. Preserve exact study titles and direct quotations even when their wording does not match brand vocabulary.

### F10. Nine of 13 insight posts lack each answer-ready evidence component

**Severity:** Medium  
**Affected:** `/insights/*`, `components/article-layout.tsx`  
**Source status:** Verified source count  
**Ben approval required:** Yes for new study or product claims; no for structure

Only four posts have a KeyTakeaway, and only four have a ReferencesSection. The two groups are not identical. Article schema appears on every post, and the shared `.article-intro` gives every post one extractable summary, but most posts still lack a short cited answer and a complete reference list.

**Recommended fix:** Rewrite or consolidate the thin legacy posts instead of adding a generic block mechanically. Priority order:

1. `hospital-communication-training-roi`
2. `faculty-hour-problem-communication-remediation`
3. `eol-communication-training-measurement-gap`
4. `end-of-life-care-communication`
5. `breaking-bad-news-medical-training`

Each retained post should have one answer-first paragraph, a source beside every number, a ReferencesSection when it cites research, an accurate modification date, and no product validation claim that exceeds the evidence.

### F11. The named-author founding story still conflicts with v37

**Severity:** High  
**Affected:** `/insights/eol-communication-training-measurement-gap`, v37 slide 11  
**Source status:** Verified conflict  
**Ben approval required:** Yes, with Lauren

The post says Lauren's son was admitted to the NICU and that her ICU admission happened a few months earlier. V37 says Ben and Lauren spent eight weeks at their daughter's NICU bedside and Lauren entered the surgical ICU after giving birth.

**Recommended fix:** Do not editorially choose a version. Confirm the sequence and wording with Ben and Lauren, then update the post, registry description if needed, and `dateModified` together.

### F12. Search engines still hold stale homepage text

**Severity:** Medium operational follow-up  
**Affected:** Homepage search snippet and cached extraction  
**Source status:** Observed in web search during this audit  
**Ben approval required:** No

A search crawl from the prior week still returned the removed `60% of hospital adverse events` homepage card, while the live source and current repository use the newer malpractice and readmission figures. Search recrawl lag is normal, but it means old factual defects can remain visible after the code is corrected.

**Recommended fix:** After the next factual cleanup deploy, inspect the homepage and high-risk evidence URLs in Search Console and request recrawling. Monitor title and snippet changes rather than assuming deployment immediately replaces indexed text.

### F13. The build passes, but the warning and skipped checks should stay visible

**Severity:** Low  
**Affected:** `next.config.mjs`, workspace lockfiles, CI expectations  
**Source status:** Verified with `pnpm build`  
**Ben approval required:** No for documentation; separate approval if changing the parent lockfile

The production build passes and generates all 53 framework routes. Next selects `/Users/benconway` as the workspace root because it finds a parent `package-lock.json` and the repo `pnpm-lock.yaml`. It recommends setting `turbopack.root`. The build also reports `Skipping validation of types` because `ignoreBuildErrors` is enabled, and it prints a generic edge-runtime static-generation warning.

**Recommended fix:** Set `turbopack.root` to the repository in `next.config.mjs`. Keep separate CI checks for TypeScript and ESLint if build-time type checking remains disabled. No parent lockfile should be removed as part of a site-only fix.

## V37 deck reconciliation

### Claims already public on the live site

These are already public, so the audit does not treat them as new disclosure. They still need exact wording and source discipline.

| Position or claim | Current site status | Recommendation |
|---|---|---|
| 20 or more institutions in pilot | Homepage says 20+ and 20 or more | Keep the count, not the institution roster, unless permissions are documented |
| National needs assessment | Homepage and posts publish 81%, 96%, 78%, and 3 to 4 practice conversations | Prefer exact fractions such as 22 of 27 and 26 of 27, identify the sample, and say publication is in progress |
| Malpractice and Medicare economics | Risk, quality, homepage, and insight content use Candello, CRICO, CMS, KFF, and Definitive Healthcare claims | Keep claims separated by source and never sum exposures without a public method |
| Synthetic patients and no real patient records | `/trust` and `llms.txt` state the current posture and say SOC 2 and HIPAA certification are not in place | Preserve this restraint; do not convert it into a certification claim |
| Extend SP programs | Comparison, simulation-center, FAQ, and ROI copy state that ClinicalSim complements SP programs | Protect this language |

### Public candidates that require approval or source clearance

| Deck position | Public recommendation | Approval gate |
|---|---|---|
| `Communication intelligence platform` | Consider as a company-level category statement after defining it in plain language | Ben positioning approval |
| Six independent studies at five institutions | Publish on `/research` only after the study list, owners, and statuses are confirmed | Study-owner and institution approval |
| University of Chicago and Advocate outcomes | Publish as two separate studies | Resolve F01 first |
| Institutional expansion from one program to several | Use an anonymized pattern unless each institution approves the details | Account approval |
| Problem-focused deployments in malpractice, consent, safety, and patient experience | Continue with sourced audience pages and add examples only when the scenario and buyer claims are public | Clinical and account approval |

### Keep private unless Ben explicitly approves publication

- Named pilot and pipeline rosters.
- `43 institutions in the funnel`, conversion assumptions, ARR projections, and deal tiers.
- The `$5M` round, `$18M` cap, runway, and paid-contract targets.
- Customer-specific expansion counts, Michigan's 150 nurse practitioners, and the University of Chicago inbound request.
- `$35-$55B` as a company headline until the overlap-adjusted method and every component are ready for public review.
- The scored-conversation corpus as a moat, including volume forecasts, exclusivity, replication cost, and the FICO or Press Ganey analogies.
- Roadmap phases for benchmarking, risk pricing, and prediction.
- Competitor financing, revenue, valuation, customer, and switching claims.

### V37 conflicts to fix before reuse

| Conflict | Evidence | Required action |
|---|---|---|
| Coaching-study p-value | Slide 14 says `0.0017`; slide 26 says `0.000345` | Confirm the primary analysis and use one labeled result |
| Search-safe sentinel-event wording | Slide 16 repeats 66% and 80%; slide 26 notes say those figures should be replaced by a qualitative Joint Commission citation | Remove the percentages from slide 16 |
| Three-month skill decay | Slides 4, 5, and 27 use the claim; `lib/roi/constants.json` marks it contradicted by the Fallowfield RCT | Replace with the narrower finding that empathic expression decayed while several trained behaviors held |
| Faculty-hour synthesis | V37 uses 29 to 45; the repository evidence confirms 29.6 but says the 45-hour source does not exist | Remove 45 or supply the actual primary source |
| Needs-assessment rounding | Slide 16 says 81%; a speaker note still says 83%; Appendix A4 gives 22 of 27 | Use `22 of 27` everywhere |
| Research footprint wording | Slide 10 says 20 institutions run IRB studies; the deck elsewhere says five research partners | Use the confirmed research count and keep pilot count separate |

## What improved since the August 4 audit

Several high-risk items from the historical audit are resolved in the current repository:

- The old `/pricing` route now permanently redirects, and the replacement ROI calculator is `noindex, nofollow` pending review.
- The old ROI component and its unsupported sentinel-event, readmission, claim-cost, and nurse-turnover inputs are no longer public routes.
- The homepage's 60% adverse-event card is gone from current source.
- The remediation page no longer says the platform is HIPAA compliant. It uses the narrower no-real-patient-data position.
- Risk and patient-experience audience pages now carry sourced, buyer-specific passages.
- The apex host redirect, canonical coverage, sitemap, glossary schema, comparison pages, example pages, and `llms.txt` are materially stronger.

Items that remain from the historical audit are the research-study conflation, Brennan credential on `/research`, founding-story conflict, faculty-hour and SP cost conflicts, four legacy `validated` overclaims, long-dash cleanup, and the Johns Hopkins testimonial permission check.

## What should be protected

- Every generated content page has one apex canonical, one H1, an OpenGraph URL, and Twitter title and description.
- The `www` host uses a 308 redirect to the apex, which aligns the redirect, canonical, sitemap, and structured-data signals. Google treats redirects and canonical tags as strong canonical signals. See its [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- `/roi-calculator` is excluded from the sitemap and returns `noindex, nofollow` while unpublished.
- `OAI-SearchBot`, `ChatGPT-User`, Perplexity, and Anthropic search and user agents are explicitly allowed.
- The glossary has 13 answer-first definitions plus `DefinedTermSet` and `DefinedTerm` markup.
- Article schema uses Person only for registered individual authors and falls back to Organization for team posts.
- `/methodology` and `/medical-educator-faq` state the limits of ClinicalSim's scoring claims instead of claiming superiority or blanket validation.
- The site consistently uses the apex host `https://clinicalsim.ai` for public discovery URLs.

## Recommended execution sequence

### Phase 0: factual and crawl controls

1. Resolve F01 with the study owners and correct `/research` plus remediation evidence.
2. Allow `GPTBot`.
3. Remove unsupported 45-hour and SP encounter ranges pending source approval.
4. Confirm the founding story and Hopkins testimonial permission.

### Phase 1: technical SEO cleanup

1. Fix `/demo`.
2. Remove the three duplicate title suffixes.
3. Add `/contact` to `llms.txt` and repair the truncated example summary.
4. Add the missing page-level JSON-LD objects.
5. Align `lastModified` and `dateModified` with material edits.
6. Set `turbopack.root` and preserve separate type and lint checks.

### Phase 2: GEO content pass

1. Rewrite the five priority insight posts with source-complete answer blocks.
2. Add a public needs-assessment methods page only after the sample, instrument, and publication status are approved.
3. Expand examples into goals of care, informed consent, error disclosure, and interprofessional conflict only when real examples and permissions exist.
4. Add approved study records to `/research`, then update the homepage proof section from the same source data.
5. Request recrawling for the homepage, research, remediation, and changed insight URLs.

## Verification log

### Repository checks

- Counted page files and expanded dynamic example routes.
- Checked every page source for metadata or generated metadata.
- Built the site and scanned all 48 generated content pages for H1, canonical, OpenGraph URL, Twitter title, and Twitter description.
- Compared generated route types for Article, FAQPage, WebPage, BreadcrumbList, and DefinedTermSet coverage.
- Compared source routes with sitemap and `llms.txt` coverage.
- Scanned internal links against generated route files.
- Scanned canonical host strings for `www` drift.
- Scanned marketing copy and registries for long dashes, banned vocabulary, product wording, and validation overclaims.
- Counted KeyTakeaway and ReferencesSection use across 13 insight posts.

### Live checks

- Fetched `/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt`.
- Fetched representative solution, audience, FAQ, insight, example, comparison, glossary, privacy, and ROI pages.
- Verified 200 status, title, canonical, OpenGraph URL, H1, robots meta, and JSON-LD types on the representative set.
- Verified `www` to apex 308, `/program-director-faq` 308, `/pricing` 308, and the intentional `/practice` 307 to the platform.

### Build and lint

`pnpm build` completed successfully. It generated 53 framework routes, including 48 content pages, discovery routes, and framework pages. The known workspace-root warning appeared. Type validation was skipped by configuration. `pnpm lint` completed with no reported errors.

## Audit limits

- This pass did not change runtime site code.
- It did not validate claims against unpublished study datasets, contracts, customer permissions, IRB records, or source-library documents outside the supplied deck and repository.
- It did not treat the investor deck as blanket approval for public disclosure.
- Search Console performance, crawl logs, backlink data, keyword rank, Core Web Vitals field data, and analytics were not available in this audit.
- `llms.txt` is a useful explicit content index, but it does not guarantee inclusion or citation by an answer engine.
