# ACGME Milestones misapplied to UME and Faculty content — audit for review

**Date:** 2026-07-07
**Status:** Findings only. No site changes have been made yet.

## The problem in one paragraph

ACGME (Accreditation Council for Graduate Medical Education) "Milestones 2.0" is a competency framework that applies only to residents and fellows in ACGME-accredited GME programs. It does not apply to (a) medical students — undergraduate medical education (UME) is governed by LCME accreditation, and student-level frameworks are things like the AAMC Core EPAs / Foundational Competencies, not ACGME Milestones — or (b) faculty and attendings, who have already finished training and are not scored against a trainee competency framework at all. Several places on the site currently claim UME and/or faculty-development feedback is "mapped to ACGME Milestones 2.0." Those claims are factually wrong for those audiences.

The site actually already has a correct model for this elsewhere (see "What's already correct" below) — the fix is to bring the rest of the site in line with that pattern, not to invent new claims.

## Confirmed issues, in order of visibility

### 1. Shared value-prop block used by both the UME and Faculty Development solution pages
**File:** `lib/solutions.ts`, lines 78-80 (`PLATFORM_VALUE_PROPS` constant)
> "Milestone-Aligned Feedback — Every encounter is rubric-scored and mapped to ACGME Milestones 2.0, with feedback that points to the specific behavior to change rather than a vague 'be more empathic.'"

This constant is reused verbatim on:
- The `undergraduate-medical-education` solution entry (`lib/solutions.ts:236`) — rendered live on **/solutions/undergraduate-medical-education**
- The `faculty-development` solution entry (`lib/solutions.ts:303`) — rendered live on **/solutions/faculty-development**

This is the highest-visibility instance — it's a headline bullet on the actual product pages for both audiences.

### 2. Solutions hub page (the index page linking to every use case)
**File:** `app/(marketing)/solutions/page.tsx:16`
> "One platform, many conversations: remediation, longitudinal curriculum, UME, and faculty development — all mapped to ACGME Milestones 2.0."

Explicitly groups UME and faculty development into a blanket "all mapped to ACGME Milestones 2.0" claim. This is social-share (OpenGraph) text, so it also shows up in link previews when this page is shared.

### 3. Sitewide default social-share image
**File:** `app/opengraph-image.tsx:76`
> "Voice AI simulation · ACGME Milestones 2.0 · Pilot study"

This is the *only* `opengraph-image.tsx` in the app — there's no page-specific override for the UME or faculty pages — so this exact card is what renders when either page is shared on LinkedIn, Slack, etc.

### 4. Sitewide structured data (JSON-LD), injected on every marketing page
**File:** `app/(marketing)/layout.tsx`
- WebSite `description` (~line 42-43): "...AI clinical simulation to practice and measure clinical communication across the medical-education continuum — medical school, residency, fellowship, and faculty development — **mapped to ACGME Milestones 2.0**."
- Organization `knowsAbout` array (~line 28-35): lists "ACGME Milestones 2.0" and "Undergraduate and graduate medical education" as unscoped sibling items — weaker issue, but worth tightening since AI systems parsing this could associate ACGME Milestones with UME.

### 5. `/llms.txt` (page served specifically to AI crawlers/answer engines)
**File:** `app/llms.txt/route.ts:11`
> "...undergraduate medical education, residency and fellowship, communication remediation, and faculty development. **Mapped to ACGME Milestones 2.0.**"

Same pattern — UME and faculty development listed immediately before the ACGME claim, in the file specifically designed to be quoted by AI answer engines.

### 6. Root layout fallback metadata (inherited by any page that doesn't set its own description)
**File:** `app/layout.tsx:19`
> "...Structured practice mapped to ACGME milestones with CCC-ready documentation."

### 7. Pricing page — Individual tier and FAQ
**File:** `lib/pricing.ts`
- Context paragraph (~line 81): "...gives learners unlimited, private practice on the conversations they're struggling with, mapped to ACGME Milestones 2.0 and scored with validated frameworks." (unconditional, no UME/faculty carve-out)
- Individual tier description (line 88-89): "For **residents, fellows, and clinicians** building communication confidence on their own." ("clinicians" = faculty/attendings)
- Individual tier feature list (line 100): "Structured feedback scored against Calgary-Cambridge **and ACGME Milestones 2.0**"
- FAQ answer, "How does the voice simulation work?" (~line 296): "...structured feedback scored against validated communication frameworks — Calgary-Cambridge, **ACGME Milestones 2.0** — with timestamped, CCC-ready documentation." (no carve-out)

A faculty member or medical student buying the Individual tier is told their own feedback is scored against ACGME Milestones, which isn't accurate for either group.

### 8. Homepage — ambiguous rather than clearly wrong (flagging for a decision, not a clear bug)
**File:** `app/(marketing)/page.tsx:259`
> "The same engine and dashboard serve medical students, residents, fellows, and faculty, with rubric-scored practice mapped to the competency framework that governs each stage, the ACGME Milestones 2.0 in graduate medical education and the AAMC Foundational Competencies in undergraduate medical education, plus documented feedback from every session."

This sentence correctly separates ACGME Milestones (GME) from AAMC Foundational Competencies (UME) — it's the right pattern. But it lists four groups ("medical students, residents, fellows, and faculty") and only names frameworks for two of them, leaving faculty without any named framework. Worth deciding what to say faculty are measured against (if anything), rather than leaving it implied.

### 9. Repeated blog boilerplate bullet (lower priority — one bullet in a longer list, but reused across four posts)
**Files, all at approximately line 31 of `page.mdx`:**
- `app/(marketing)/insights/breaking-bad-news-medical-training/page.mdx`
- `app/(marketing)/insights/healthcare-simulation-technology-trends/page.mdx`
- `app/(marketing)/insights/end-of-life-care-communication/page.mdx`
- `app/(marketing)/insights/hospital-communication-training-roi/page.mdx`

Each has an identical "How ClinicalSim Helps" bullet: "Structured feedback aligned with ACGME milestones." `breaking-bad-news-medical-training` and `end-of-life-care-communication` are both linked as "related posts" directly from the UME and/or faculty-development solution/audience pages (`lib/solutions.ts`, `lib/audiences.ts`), so a visitor who lands on those pages and clicks through sees the same unscoped claim. `healthcare-simulation-technology-trends` is a notable case: the post explicitly says it's about "all learners" and "every trainee" just above this bullet, which directly contradicts an ACGME-only claim.

## What's already correct (don't touch — this is the model to match)

- `lib/audiences.ts` — the `medical-school-leadership` (UME) and `faculty-clinician-educators` entries are themselves clean. UME correctly cites Step 2 CS, SPIKES, teach-back, and Calgary-Cambridge instead of ACGME. Faculty correctly says it uses "the same engine/rubric/dashboard that trains residents" (a true infrastructure statement) without claiming faculty are scored on Milestones.
- `app/(marketing)/faq/page.tsx`, `app/(marketing)/methodology/page.tsx`, `app/(marketing)/medical-educator-faq/page.tsx`, `app/(marketing)/glossary/page.tsx` — already correctly distinguish ACGME Milestones 2.0 (GME) from AAMC/AACOM frameworks (UME).
- `components/solution-page-layout.tsx`, `components/audience-page-layout.tsx`, nav/header/footer — no hardcoded ACGME copy; everything comes from the data files above.
- `lib/glossary.ts`, `lib/comparisons.ts`, and the `examples` pages/data — all correctly scoped to GME (resident/fellow) roles already.

## Suggested direction (for discussion, not yet applied)

- For UME surfaces: replace "ACGME Milestones 2.0" with the AAMC Foundational Competencies / Core EPAs framing the homepage and FAQ pages already use correctly.
- For faculty-development surfaces: drop the Milestones claim entirely rather than substituting another framework, unless there's a specific faculty-development competency framework we want to name. The "same engine/rubric/dashboard that trains residents" framing (already used correctly in `lib/audiences.ts`) is the safer claim — it describes shared infrastructure, not a claim about how faculty themselves are scored.
- The sitewide surfaces (JSON-LD, `opengraph-image.tsx`, `app/layout.tsx`, `llms.txt`) will need either audience-specific overrides or more carefully scoped language, since they currently apply one blanket claim across every audience.

No changes have been made to any of these files. Flagging for sign-off before editing.
