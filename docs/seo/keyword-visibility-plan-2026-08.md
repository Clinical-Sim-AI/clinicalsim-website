# Keyword visibility plan, August 2026

**Date:** 2026-08-20
**Database:** `us` (Semrush, live calls)
**Extends:** `docs/seo/keyword-gap-2026-08.md` (2026-08-18). Read that first. This document does
not restate its findings; it executes its unstarted "Days 31 to 60" step, corrects one framing
error, and opens the OSCE and nursing lanes that the earlier report declined as out of scope.

---

## 1. Context

The Position Tracking campaign went live on 2026-08-18, which the previous report named as the
first thing to do before any further content work. It was set up with four keywords, and the
Potential Growth panel now reports "+0.66%, High" against them. That number is an artifact, not
an opportunity, and acting on it would send the next quarter in the wrong direction.

Separately, the previous report scoped the OSCE cluster at two keywords and explicitly set aside
nursing-facing demand as out of scope. Nursing and UME OSCE preparation are now in scope
(confirmed by Ben, 2026-08-20), and pulling the cluster properly shows it is roughly ten times
larger than the earlier scoping, with a substantial low-difficulty tail.

The intended outcome of this plan is a tracking campaign that can actually detect movement, and
content aimed at the two clusters where real demand and a reachable difficulty ceiling overlap.

---

## 2. The campaign as configured cannot measure anything

Four keywords, three with zero national search volume.

| Keyword | Volume | Aug 18 | Aug 21 | Note |
| --- | --- | --- | --- | --- |
| clinical simulation | 30 in campaign, 140 national | 38 | 40 | homepage |
| ai clinical simulation | 0 | not in top 100 | not in top 100 | surfaced at 31 on Aug 20 only |
| ai simulation | 0 | not in top 100 | not in top 100 | |
| ai standardized patient | 0 | not in top 100 | not in top 100 | |

Campaign visibility reads 1.70% with 2.36% potential. Both figures are computed across four
keywords, so a two-position drift on a single 140-a-month term moves the headline number by more
than half a percent. The "High" confidence label is scoring the size of that arithmetic, not the
size of the prize.

The `ai clinical simulation` row is worth noting for a different reason: it appeared at position
31 for one day and vanished. That is normal instability for a new page on a low-authority domain,
and it is exactly the kind of signal a four-keyword campaign cannot distinguish from noise.

**Fix:** replace the keyword set with the tiered list in section 5 before reading the visibility
chart again.

---

## 3. Organic reality, and a correction to how it should be read

Two URLs on the entire domain rank for anything in the US top 100.

| URL | Keywords | Best position | Traffic |
| --- | --- | --- | --- |
| `clinicalsim.ai/` | 9 | 42 | 0 |
| `clinicalsim.ai/about` | 2 | 46 | 0 |

Every ranking term is brand-adjacent noise (`medsimai`, `cjsim`, `medsimcenter`, `studysim`,
`medical sim`) except `clinical simulation` at 47 and `clinical simulations` at 60. Authority
Score is 2 with 43 referring domains, up from 40 on 2026-08-18, and section 8.1 of the previous
report established that all of them are spam.

**The correction.** It is tempting to read "41 of 43 pages rank for nothing" as a content
failure. It is not, or at least not yet. The 46 indexable glossary term pages shipped on
2026-08-18 in PR #31, the meta retargeting in #33 landed the same day, and the site audit fixes
in #36 landed on 2026-08-20. Semrush's organic database lags, and Google has had two days. The
honest statement is that the August tranche has not had time to be measured, and this plan should
not re-litigate it. What follows is about the clusters that tranche did not cover.

---

## 4. What changed: the OSCE and nursing clusters

### 4.1 OSCE is a cluster of about 5,900 monthly searches inside the difficulty ceiling

The previous report listed two OSCE keywords: `objective structured clinical examination` (1,300
at KD 29) and `osce practice` (140 at KD 22). Pulling the related and question sets shows the
cluster is far larger, and unusually shallow in difficulty for its size.

Reachable now, KD 29 or below:

| Keyword | Volume | KD |
| --- | --- | --- |
| objective clinical examination | 1,300 | 26 |
| objective structured clinical examination | 1,300 | 29 |
| what is an osce examination | 590 | 26 |
| medical osce exam | 480 | 21 |
| define objective structured clinical examination | 480 | 29 |
| osce exams meaning | 390 | 21 |
| define osce | 260 | 22 |
| what is the osce exam | 260 | 18 |
| whats an osce | 210 | 19 |
| clinical osce | 170 | 27 |
| what are osce exams | 170 | 27 |
| osce practice | 140 | 22 |
| what is osce exam | 90 | 20 |
| virtual osce | 50 | 6 |
| osce simulation | 30 | 0 |
| ai osce | 20 | 0 |
| **Total** | **~5,940** | |

Out of reach at AS 2, track only: `osce` (9,900 at KD 67), `osce exam` (1,600 at KD 38), `osces`
(1,600 at KD 35), `osce medical` (1,300 at KD 36), `osce meaning` (880 at KD 34).

Two things make this the best remaining opportunity on the site. The demand is overwhelmingly
definitional, which is the content shape `/glossary/osce` already is and already does well. And
the low-difficulty tail is dense: sixteen near-duplicate phrasings of one question, which one
strong page plus a well-built FAQ block can serve without needing sixteen URLs.

**Caution on the question set.** `osce` collides badly with unrelated entities. The raw question
report returns Lille OSC fixtures, VRChat OSC, and "OSC" in the court-order sense. Filter on
medical qualifiers before committing anything to a target list.

### 4.2 Nursing is a build, not a retarget

Nursing demand inside the ceiling:

| Keyword | Volume | KD |
| --- | --- | --- |
| patient simulator | 590 | 12 |
| nursing simulation | 390 | 22 |
| simulation in nursing education | 110 | 18 |
| nursing simulation scenarios | 90 | 25 |
| nursing simulation software | 30 | 25 |
| **Total** | **~1,210** | |

Plus `clinical judgment model` (1,900 at KD 28), which the previous report identified and declined
because it was nursing-facing. That decision should be reversed.

`patient simulator` at 590 and KD 12 is the standout: highest volume in the set, lowest
difficulty on the site's whole target list, and squarely a product-category term.

**The gap is total.** The site currently has no nursing content. A grep across `lib/` and
`app/(marketing)/` returns only incidental uses of "nurse" inside glossary and audience copy. All
four example cases in `lib/examples/` are pediatric physician scenarios. There is no nursing
audience in `lib/audiences.ts` and no nursing solution in `lib/solutions.ts`. Ben has confirmed
nursing cases exist in the product, so this is a representation gap rather than a capability gap,
but nothing on the site can currently support a nursing page and no nursing specifics may be
written without source material (see section 8).

### 4.3 Confirmed dead ends

The zero-volume finding on the product's own vocabulary is worth recording plainly, because it
recurs in every planning conversation. US national volume is 0 for `patient communication
training`, `end of life communication training`, `goals of care conversation training`,
`physician remediation`, `palliative care communication`, `empathy training healthcare`,
`simulation center software`, and `ai communication training`. This confirms section 6 of the
previous report. These pages are sales enablement and AI-citation surface. They are not an
organic channel and should not be measured as one.

---

## 5. Tracking campaign: the keyword set

Replace the four current keywords with the following, tagged by tier so the visibility chart
segments cleanly. Load in tier order; if the plan's keyword allowance runs out, stop at the tier
boundary rather than sampling across tiers.

**This has to be done in the UI.** The Semrush MCP surface exposes thirteen Position Tracking
reports and all thirteen are reads, and the Projects toolkit only lists projects, so there is no
API path to add a keyword to a campaign. `docs/seo/position-tracking-keywords-2026-08.txt` holds
the same list as a paste-ready file, one keyword per line under a tier header.

**Tier A, toeholds (7).** Currently ranking 42 to 73. These measure whether the August tranche
moves at all.

`clinical simulation` (140/KD29) · `medical sim` (170/KD45) · `clinical simulations` (30/KD39) ·
`medsim ai` (30/KD15) · `ai clinical simulation` · `ai standardized patient` (30/KD0) ·
`virtual standardized patient` (10/KD0)

**Tier B, OSCE targets (16).** Section 4.1. This is the primary target list.

`objective clinical examination` (1300/KD26) · `objective structured clinical examination`
(1300/KD29) · `what is an osce examination` (590/KD26) · `medical osce exam` (480/KD21) ·
`define objective structured clinical examination` (480/KD29) · `osce exams meaning` (390/KD21) ·
`define osce` (260/KD22) · `what is the osce exam` (260/KD18) · `whats an osce` (210/KD19) ·
`clinical osce` (170/KD27) · `what are osce exams` (170/KD27) · `osce practice` (140/KD22) ·
`what is osce exam` (90/KD20) · `virtual osce` (50/KD6) · `osce simulation` (30/KD0) ·
`ai osce` (20/KD0)

**Tier C, nursing and UME targets (7).** Section 4.2.

`patient simulator` (590/KD12) · `nursing simulation` (390/KD22) ·
`clinical judgment model` (1900/KD28) · `simulation in nursing education` (110/KD18) ·
`nursing simulation scenarios` (90/KD25) · `nursing simulation software` (30/KD25) ·
`entrustable professional activities` (260/KD23)

**Tier D, category and commercial (6).** Carried over from the previous report's section 4, none
of which is currently tracked.

`virtual patient simulation` (170/KD17) · `standardized patient program` (140/KD24) ·
`competency tracking software` (90/KD6) · `communication coaching` (590/KD15) ·
`ai in medical education` (210/KD30) · `virtual patient` (320/KD29)

**Tier E, scoreboard only (8).** Above the KD 35 ceiling. Track to detect authority moving; do
not write for these.

`osce` (9900/KD67) · `osce exam` (1600/KD38) · `osces` (1600/KD35) · `standardized patient`
(1600/KD30) · `osce medical` (1300/KD36) · `acgme milestones` (390/KD33) ·
`healthcare simulation` (260/KD35) · `medical simulation software` (90/KD65)

**Tier F, competitor brands, share of voice (8).** Monitoring only. The neutral comparison policy
in `lib/comparisons.ts` stands, so these are intelligence, not targets.

`simx` (1000/KD19) · `full code medical simulation` (1000/KD42) · `oxford medical simulation`
(880/KD40) · `aquifer cases` (590/KD25) · `body interact` (480/KD46) · `vsim for nursing`
(260/KD22) · `sentinelu` (140/KD20) · `i-human patients` (40/KD29)

**Do not track.** Each of these would misdirect content if it appeared in a visibility report:

- `how to become a standardized patient` (70), `how much do standardized patients get paid` (40).
  Job seekers, and they are most of the 1,600 on the head term.
- `medhub` (18,100). Residency management software, a different category.
- `doctor games`, `hospital simulator`, `dr simulator game`, `medical simulation games`. Consumer
  games that pollute the `virtual patient simulation` related set.
- `mock code` (390/KD14), `code scenarios` (210/KD16). Genuinely low difficulty, but the intent is
  ACLS and code-blue drill, not communication.
- `shared decision making` (2,900/KD46), `motivational interviewing training` (3,600/KD31),
  `iSBAR` (2,400/KD32). MI is behavioral-health counseling and iSBAR is nursing handoff. The
  previous tranche correctly built glossary pages for the vocabulary; the head terms are not ours.
- `open rn` (590), `cna simulations` (590). Adjacent nursing demand aimed at OER textbooks and CNA
  certification respectively.

---

## 6. Content workstreams

Sequenced so the cheapest work with the clearest measurement lands first.

### 6.1 Deepen `/glossary/osce` into the cluster hub

The decision (Ben, 2026-08-20) is glossary first, commercial page second.

`lib/glossary.ts`, the `osce` entry. The page is already strong: sourced to Harden 1975 with the
DOI, four explainer paragraphs, three `inPractice` bullets, `metaTitle` already retargeted in #33.
The work is additive.

- Add an FAQ block covering the definitional tail as distinct questions: what an OSCE exam is,
  what OSCE stands for in medicine, what OSCE exams mean, how many stations a typical OSCE has,
  and how stations are scored. Each answer must stand alone without its question and carry its own
  stat or source, per the GEO rules in `CLAUDE.md`. Emit FAQPage JSON-LD.
- `GlossaryTerm` in `lib/glossary.ts` has no `faqs` field today. Either add one following the
  `SolutionFaq` and `ComparisonFaq` shape already in `lib/solutions.ts` and `lib/comparisons.ts`,
  or extend `explainer` and skip the schema. Adding the field is preferable, because FAQPage
  JSON-LD is what the previous report credited for the site's existing People Also Ask presence.
- Add `objective clinical examination` (1,300 at KD 26) to the copy. The site currently carries
  the "structured" phrasing only, and the unstructured variant is a separate 1,300-a-month query
  at lower difficulty.
- Extend `relatedLinks` toward the UME solution page once 6.3 lands.

Respect the title constraints: `lib/page-titles.test.ts` enforces 75 characters and the glossary
suite has its own display-budget test, and the #33 notes record that the OSCE title only fits
inside 60 characters with the spelled-out phrase moved into the description.

### 6.2 Retarget `/solutions/undergraduate-medical-education` onto OSCE preparation

`lib/solutions.ts`. The entry already has an OSCE FAQ ("Can it support standardized-patient and
OSCE preparation?") and already links `osce-case-design-guide` in `relatedPostSlugs`, so the
positioning exists but nothing in the metadata or hero targets the query.

- `metaTitle` is currently "Undergraduate medical education (UME) communication". Work "OSCE" into
  the title and description, since `osce practice` (140/KD22) and `virtual osce` (50/KD6) have no
  page pointing at them anywhere on the site.
- Add stage-level or FAQ copy on practice between scheduled OSCEs. Keep the SP framing from
  `CLAUDE.md`: extend your SP program, do not replace it.
- Bump `lastUpdated`.

### 6.3 New `/solutions/osce-preparation` page, second tranche

Hold until `/glossary/osce` shows movement in tracking, per the decision in section 6.1. Target
`osce practice`, `virtual osce`, `osce simulation`, `ai osce`. The KD 0 and KD 6 terms are
uncontested and worth owning for AI-search citation even though the traffic is trivial. Route
definitional intent to the glossary page and keep this page commercial, so the two do not compete
for the same passage.

### 6.4 Nursing lane

Blocked on source material (section 8). When unblocked, in order of return:

- **`patient simulator` (590 at KD 12).** Highest-value single target on the whole list. Likely a
  glossary entry, since the demand is definitional and `virtual-patient-simulation` and `manikin`
  already exist as neighbours to cross-link.
- **`clinical judgment model` (1,900 at KD 28).** The largest nursing term, previously declined.
  Needs care: the nursing clinical judgment literature is specific and citable, and nothing may be
  written without verifying against the primary source.
- **A nursing audience entry in `lib/audiences.ts`.** All eight current audiences are physician and
  GME facing. This is the structural piece the other nursing work hangs off, and it is what makes
  `nursing simulation` and `simulation in nursing education` targetable.
- **At least one nursing example case in `lib/examples/`.** All four current cases are pediatric
  physician scenarios. A nursing case is the credibility proof for every nursing claim above.

### 6.5 Internal linking pass

Carried over from the previous report's days 61 to 90 and still outstanding. Forty-six glossary
term pages that link only to the hub waste the equity they accumulate. All ranking authority
currently sits on the homepage, which is why `clinicalsim.ai/` is the URL ranking for nine of the
site's eleven keyword rows. Audit inbound internal links per solution and audience page.

---

## 7. Registry and test obligations

Any new route touches all of the following, per `CLAUDE.md`:

- `app/sitemap.ts` and `app/llms.txt/route.ts`. Both already derive glossary, solution, audience,
  comparison, example, and post pages from the registries, so a new registry entry propagates
  automatically. A new hand-written page does not and must be added to both.
- `lib/llms-coverage.test.ts` asserts every indexable sitemap URL appears in `/llms.txt`.
- `lib/page-titles.test.ts` enforces the 75-character audit limit across all registries.
- `lib/glossary.test.ts` enforces slug uniqueness, `relatedSlugs` resolution, `relatedLinks`
  pointing at real routes, the substance bar for indexability, the title display budget, and no en
  or em dashes in reader-visible copy.
- New pages need WebPage plus BreadcrumbList JSON-LD at minimum. Glossary, solution, and
  comparison pages get this from their existing layouts.
- Canonical host is the non-www apex `https://clinicalsim.ai`.

---

## 8. Blocked, and what unblocks it

**Nursing content cannot be written from what is in the repo.** Ben has confirmed nursing cases
exist in the product, but no nursing case, rubric, framework mapping, or pilot site appears
anywhere in `lib/`. Writing a nursing audience or solution page without that material would mean
inventing product capability claims, which the hallucination rules forbid. Needed before 6.4
starts: the nursing case list, which framework nursing scoring maps to (the physician pages cite
ACGME Milestones and AAMC Foundational Competencies, and the nursing analogue is a different
standard), and whether any nursing pilot site can be named.

**Semrush API units hit zero mid-analysis.** The nursing cluster was measured with a batch volume
lookup, which is solid, but the related and question expansions for `nursing simulation` did not
complete. The nursing figures in 4.2 are therefore a floor, not a full cluster map. Re-run that
expansion when units reset, before committing to the 6.4 sequence.

Re-checked 2026-08-20: `phrase_related` still returns "API UNITS BALANCE IS ZERO". Note that the
Position Tracking reports kept working through this, so the project API and the Analytics API
units are separate pools. Reading the campaign is always available; keyword research is not.

**The keyword allowance is unknown.** The tracking UI is showing "Buy more keywords," which
suggests the campaign is at or near its cap at four keywords. Confirm the allowance before loading
section 5; the tiers are ordered so a partial load is still coherent.

---

## 9. Verification

Tracking configuration:

- Re-run the position tracking report and confirm the campaign returns the tier A through F
  keyword count, not four. Campaign id is `30880361_5324700` (the API rejects the bare project id
  `30880361` and the bare campaign id `5324700`; it wants the compound form).
- Confirm campaign volumes match national figures. The campaign reports `clinical simulation` at
  30 against a national 140, and re-running `tracking_position_organic` with
  `use_volume=national` on 2026-08-20 returned the same 30, so this is not a report parameter.
  The campaign's own location is scoped narrower than United States. Fix it in campaign settings.
- Drop `ai simulation` while editing the keyword set. Zero national volume, and the SERP is
  consumer AI video tooling.

Code changes:

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`. The production build does not replace
  the separate lint and type checks.
- Confirm `lib/llms-coverage.test.ts` and `lib/page-titles.test.ts` pass with any new route.
- Fetch `/llms.txt` and confirm new pages appear.
- Confirm rendered `<title>` for changed pages is inside 60 characters, not merely inside the
  75-character test limit.
- Invoke the `humanizer` skill on all new prose and run its em-dash scan before handoff.

Outcome, at day 30 and day 90:

- Tier B and C keywords entering the top 100 at all is the first signal. Tier A moving from the
  40s toward the 20s is the second.
- If the KD 0 to KD 12 targets (`osce simulation`, `ai osce`, `virtual osce`, `patient simulator`,
  `competency tracking software`) have not moved by day 90, the constraint is authority rather
  than content, and the budget belongs entirely in section 8 of the previous report, the backlink
  track.

---

## 10. Status, 2026-08-20

Shipped:

- **6.1, `/glossary/osce`.** `faqs` added to `GlossaryTerm` (reusing the shared `FaqItem` shape
  from `lib/types.ts`, the same one audience pages use), rendered as an open Q/A block on the term
  page, and emitting FAQPage JSON-LD. Five questions covering the definitional tail. The
  unstructured phrasing `objective clinical examination` is worked into the acronym answer.
  Rendered title is 57 characters. Two claims were verified against primary sources before
  publishing: USMLE Step 2 CS used 12 standardized patient encounters of 15 minutes with 10
  scored, discontinued 2021-01-26; and Regehr et al. 1998 reported inter-station reliability of
  0.85 for global rating scales against 0.79 for checklists, on a surgical skills examination
  rather than a communication one, which the answer now says.
- **6.2, `/solutions/undergraduate-medical-education`.** `metaTitle` is now "OSCE practice for
  medical students (UME)" (57 characters rendered), the description leads on virtual OSCE
  practice, and two FAQs replace the old one-line OSCE answer. `lastUpdated` bumped.
- **6.5, internal linking.** `glossarySlugs` added to `Solution`, `Audience`, and
  `RemediationPageData`, rendered by `components/glossary-term-links.tsx` above the CTA on all
  twelve commercial pages. This was the actual gap: every term page already linked back out to a
  commercial page, but no solution, audience, comparison, or post pointed in, so the hub was the
  only inbound route to all 46 term pages. All 46 now have at least one inbound link from a page
  with authority, and `lib/glossary.test.ts` fails if a new term is added without one.

Not shipped:

- **6.3** is gated on 6.1 showing movement, per the decision in that section.
- **6.4** is still blocked on section 8. Nothing in `lib/` supports a nursing claim.
- The tracking campaign still holds four keywords. See section 5.

---

## 11. The AI answer channel, from the Brand Performance report of 2026-08-20

Semrush's Brand Performance report for clinicalsim.ai measures ChatGPT, not Google, and it tells
a story that runs opposite to sections 2 and 3. Everything below is that report's own measurement
of ChatGPT answers on 2026-08-20. None of it is a claim that belongs on the site.

- Share of voice 21%, ahead of Shadow Health at 13.3%, Body Interact at 10.8%, Kognito at 10%,
  and SimChat at 8.9%. 32 mentions.
- Average position 1.03 against a field of 1.89 to 2.17, so when ChatGPT lists the category,
  clinicalsim.ai is normally first.
- Sentiment 94% favorable, 6% general, no unfavorable.
- `clinicalsim.ai` is the fourth most cited domain across the whole non-branded question set with
  31 citations, behind only pmc.ncbi.nlm.nih.gov, arxiv.org, and en.wikipedia.org.

Two things follow for this plan.

**The day 90 decision rule in section 9 needs a second reading.** It says that if the KD 0 to 12
targets have not moved, the constraint is authority rather than content. That inference was drawn
from Google alone. The AI channel shows the content is already being retrieved and cited, so a
flat Google result at day 90 would mean the Google ranking system specifically is authority
limited, not that the pages fail to answer the question. That distinction changes where the budget
goes: backlinks for Google, more extractable pages for the answer engines. Do not collapse the two.

**The same homepage concentration problem appears in both channels.** Only four clinicalsim.ai
pages are cited at all, and the two named in the report are `/` (cited in 20 answers) and `/about`
(7). Section 3 found `clinicalsim.ai/` holding 9 of the site's 11 keyword rows. The 46 glossary
pages and the FAQ blocks shipped in 6.1 and 6.5 are the response to this in both channels, and the
next AI visibility pull is the check on whether a term page or a solution page starts getting
cited on its own.

Corroborations, none of which unblock anything:

- The report names nursing and pharmacy repeatedly as prompts where clinicalsim.ai does not appear
  and competitors do. This is the same conclusion as section 4.2 reached from keyword volume, from
  a different direction, and it does not resolve section 8 blocker 1. An AI visibility gap is not
  source material for a capability claim.
- "Are there simulation platforms specifically designed to complement, not replace, OSCEs and
  standardized patients?" returns clinicalsim.ai at position 1 with 100% sentiment. The
  extend-don't-replace framing is already load bearing in this channel, which supports keeping it
  as the frame for 6.3 rather than softening it.
- The report suggests seeding the phrase "virtual OSCE communication station". `virtual osce` is
  already tier B, and a competitor whose entire positioning is OSCE practice with AI patients
  (meksi.com) is being cited, so 6.3 has competition forming in it.

Three of the report's recommendations are out of scope here and are recorded so they are not
mistaken for content work:

- Publishing outcome data. Blocked by the evidence guardrails in CLAUDE.md. The University of
  Chicago and Advocate Health records stay withheld until the study owners confirm them.
- Announcing a SOC 2 and HIPAA roadmap. A factual claim about compliance status, and Ben's call.
- The report writes "difficult conversations" throughout because that is how the underlying
  queries are phrased. The brand term is "high-stakes conversations" and the site should keep it.
  The gap between the two is worth a decision at some point, but it is a positioning question, not
  something to resolve by quietly changing copy.

---

## 12. Blockers resolved and sharpened, 2026-08-20

Ben answered three of the four items left open by section 11 and PR #38.

**SOC 2 and HIPAA: neither yet.** No page claims otherwise, so nothing on the site is wrong today.
The report's finding was narrower than certification anyway: "no SOC2/HIPAA yet, limited public
detail on trainee-data use and AI governance," and competitors read as more mature on governance
even where their AI is weaker. `/trust` already documents synthetic cases, no PHI, consent-gated
learner voice data, and versioned locked rubrics. Stating the current position plainly there, that
ClinicalSim is not SOC 2 certified today and here is what it does instead, would answer the query
honestly and is the kind of passage that gets cited. Publishing a compliance posture is a business
decision rather than a content one, so it waits on Ben asking for it.

**Telehealth: no cases in the product.** The `/solutions/telehealth-communication` page stays
unbuilt. The `telehealth-communication` glossary term in PR #38 ships anyway, on the same footing
as `manikin`, `moulage`, `task-trainer`, and `in-situ-simulation`: a definitional entry for a
concept the product does not itself provide.

**Nursing: the ask, in dependency order.** Two findings sharpen it considerably.

The first is that `lib/examples/*` is auto-generated. Every file carries the header "AUTO-GENERATED
by scripts/snapshot-example.mjs" and `lib/examples/types.ts` describes each case as a frozen
snapshot of one real internal conversation, taken read-only against staging, carrying a real
transcript and a real audio recording. A nursing example case therefore cannot be written at all.
It requires a nursing encounter actually run in the product, then the snapshot script from the app
repo. Earlier plans listed this as a content task and it is not one.

The second is that the two nursing lanes have very different costs.

- **Hospital-side nursing** is close to free. `/audiences/quality-and-patient-experience` is built
  entirely on HCAHPS, and `lib/roi/constants.json` already carries Communication with Nurses data
  marked Confirmed: national top box 80, the FY2026 value-based purchasing thresholds, and
  `one_point_nurse_comm_in_tps_points` at 0.245. That page says "clinicians" and never says
  "nurse." If a nurse can be the learner, this is a retarget of an existing page, not a build.
- **Academic nursing** is a full build: a new `lib/audiences.ts` entry with its own sourced pain
  points and stats, a framework decision, and eventually a case.

What is needed, in the order that unblocks the most:

1. **Which nursing framework does scoring map to, if any.** This gates everything else, because
   `/methodology` promises that every score traces to a published competency framework with level
   descriptors quoted verbatim from the primary source, and the physician pages deliver on that.
   The candidates are the AACN Essentials domains, the NCSBN Clinical Judgment Measurement Model,
   and QSEN. "None yet, nursing cases score on the communication rubric only" is a usable answer.
   It just changes what a nursing page is allowed to promise.
2. **The nursing case list**: titles, who the learner is, and what each case assesses.
3. **Which buyer first**, hospital-side or academic, given the cost difference above.
4. **Whether any nursing site can be named publicly.**

Shipped while those stay open, because neither needs product truth:

- **`patient-simulator`** (590 a month, KD 12, the best single target on the August list), anchored
  to Hayden, Smiley, Alexander, Kardong-Edgren, and Jeffries in the Journal of Nursing Regulation,
  2014, the NCSBN randomized controlled study behind the 50 percent simulation substitution rule.
  The entry separates the three things the term covers, manikin, screen-based case, and
  conversational simulator, and says plainly which one ClinicalSim is and what it is useless for.
- **`clinical-judgment-model`** (1900 a month, KD 28), anchored to Tanner in the Journal of Nursing
  Education, 2006, and distinguishing Tanner's four phases from the NCSBN measurement model behind
  the Next Generation NCLEX, which launched 2023-04-01. Two different models share the name and the
  existing site had neither.

Both citations were verified against primary sources. Both hang off
`/audiences/simulation-center-directors`, the one audience page that genuinely spans nursing and
medicine, which is what satisfies the orphan test in `lib/glossary.test.ts`.
