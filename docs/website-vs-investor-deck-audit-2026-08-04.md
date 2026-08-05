# Website vs. investor deck audit

**Date:** 2026-08-04
**Deck audited:** `ClinicalSim-Seed-Deck-v36-2026-07-26.pptx` (35 slides, appendices A1 to A4 treated as the authority on sourced numbers)
**Site audited:** all of `app/`, `lib/`, plus the copy-carrying components
**Method:** five parallel Opus agents, one per site area, each reconciling against the full deck text and speaker notes. Findings below are deduplicated; where two or more agents independently reached the same conclusion it is noted, because that is the strongest signal in the report.

---

## Executive summary

The deck argues that communication is medicine's most performed and least measured procedure, and prices the failure at $35B to $55B a year across eight named budget lines. The website argues something much smaller: that communication remediation in GME is hard and consumes faculty hours. The site is currently making one of the deck's eight arguments, and it is the smallest one.

That is the opportunity. But it is not the first thing to fix.

The audit surfaced **12 factual defects that are live on the public site right now**, including a HIPAA compliance claim the deck puts on the funded roadmap, a statistic attributed to a body that does not publish it, a journal misattribution, and a physician's credential stated incorrectly. On a healthcare and GME credibility site, those cost more than the missing positioning gains. Fix them first.

Three findings need a decision only you can make. They are isolated in section 1 so they do not block the rest.

**Priority order:**

| Phase | What | Why first |
|---|---|---|
| 0 | Section 1 decisions, then section 2 factual fixes | Live accuracy and legal exposure |
| 1 | Section 3, retire the old ROI calculator | Two calculators are live; one has five bad stats |
| 2 | Section 4 positioning lift | The actual point of the audit |
| 3 | Sections 5 to 7 | Buyer coverage, content, hygiene |

---

## 1. Decisions only you can make

Four items where the deck contradicts itself or the site contradicts the deck, and where guessing would be worse than waiting. Nothing downstream of these should ship until they are settled.

### 1.1 The coaching study p-value

- Slide 15: `p = 0.0017`
- Slide 32 (Appendix A2): `p = 0.000345`
- Project memory records `p=0.000345` as a cleared fact from the June 2026 content overhaul.

**Good news:** neither figure appears anywhere on the site. A grep for `0.0017`, `0.000345`, `0.0388`, `p =`, and `p&lt;` across `app/` and `lib/` returns exactly one hit, and it is an unrelated third-party study (`insights/scalability-problem-sp-programs/page.mdx:53`, Kube 2024). So this is a "do not ship yet," not a live error.

**Decision:** which figure is the actual output for the primary pre-post comparison. Two innocent explanations exist (they may be two different tests, or one is stale). Whichever ships will become the site's most-quoted statistic, so it needs to be right. A2 is the sourced-numbers appendix and would normally win, but slide 15 is the version investors have already seen.

### 1.2 "Comfort improved significantly" contradicts the deck's own differentiator

This is the most consequential live copy problem in the audit.

**The site says**, in five places, that the feasibility pilot showed `comfort with difficult conversations improved significantly`:
- `app/(marketing)/research/page.tsx:15` (metadata description)
- `app/(marketing)/research/page.tsx:346`
- `app/(marketing)/page.tsx:87`
- `app/(marketing)/page.tsx:229-230` (rendered as a homepage headline stat: `Comfort with difficult conversations` / `Improved significantly`)
- `lib/pricing.ts:301` and `lib/remediation.ts:289`

**The deck says of the same study:**
- Slide 8 notes: `A single session didn't move self-confidence (74% reported no change)`
- Slide 8: `learners often rate themselves lower after a session, not higher. That's the tool working.`
- Slide 15: `Self-rated competence showed no relationship to measured performance: most published training evidence measures confidence. ClinicalSim measures the skill itself.`

So the homepage is leading with a self-report outcome, which is precisely the thing the deck says every competitor sells and that this study found did not move.

**Decision:** did the pilot measure a "comfort" construct that improved significantly, distinct from the self-confidence item where 74% reported no change? If yes, the copy is defensible but must name the instrument and should stop being the headline. If no, it is a factual error live on the homepage, `/research`, `/pricing`, and the remediation page.

If the deck's account is right, the replacement is stronger than what is there now:

> `Objective communication scores` / `Improved with repeated practice`
> `Self-rated confidence` / `Did not track measured skill`
>
> Most communication training measures how confident clinicians feel. In our feasibility pilot, self-rated competence showed no relationship to measured performance, which is why we score the skill instead.

### 1.3 The founding story conflicts with itself in public

`insights/eol-communication-training-measurement-gap/page.mdx:8` is a first-person post under a named physician byline. It says "My **son** was admitted to the NICU," and that Lauren was an ICU patient "a few months **before** that."

Deck slide 7 says Ben and Lauren spent eight weeks at their **daughter's** NICU bedside after she was born at 32 weeks, and that Lauren nearly died of HELLP syndrome and was in the surgical ICU for two weeks **after giving birth**.

Both the child's sex and the sequence disagree. This is the founding story, it is published under a real byline, and it is one of the deck's emotional anchors. This needs you and Lauren, not an editor.

### 1.4 The IPSSW 2026 authorship and study identity

Three interlocking problems on `/research`:

1. **First author.** `research/page.tsx:71-76` credits "Teaching Affirming Care in Challenging Times" to `Brennan G, ... Havalad V, et al.` Deck slide 15 and A2 credit `Lemelman M, University of Chicago`. One is wrong. Separately, `insights/ai-affirming-care-communication-training/page.mdx:10` and `:34` also attribute this work to Brennan and Havalad.
2. **Study identity.** `research/page.tsx:343` labels the feasibility findings `"Enhancing Difficult Conversations in Pediatrics Using Artificial Intelligence"`, which is the site's own **workshop** title (`research/page.tsx:80`). The deck's Advocate study is `"Feasibility of an Artificial Intelligence Chatbot for Just-in-Time Communication Training for Pediatric Providers: A Mixed-Methods Pilot Study"`, manuscript submitted, not an IPSSW presentation. Two distinct studies appear merged into one, and the "Presented at IPSSW 2026" badge is attached to the wrong one. Same defect at `lib/remediation.ts:284-290`.
3. **Credential.** `research/page.tsx:350` says `Gillian Brennan, MD`. Deck slide 26 and the CLAUDE.md credential snapshot both say `MB BCh BAO`.

Item 3 is a straight fix (section 2.4). Items 1 and 2 need your confirmation of who presented what.

### Two more deck-internal inconsistencies to clean up before publishing anything from them

- **The needs-assessment gap figure.** Slide 19 says `81%`, its speaker note says `83%`, Appendix A4 says `22 of 27` (= 81.5%). `83%` is not consistent with any count out of 27, so it is very likely stale. Nothing on the site uses any of the three. **Recommendation: publish the fraction, not a percentage.** "22 of 27 GME program leaders" is more credible on n=27 and is immune to this class of drift.
- **Domains improved.** Slide 15 body says `five of six skill domains`; the stat tile on the same slide says `6 of 6` with a label about clinicians, not domains. Probably an ambiguous layout rather than a data conflict, but two numerals on one slide invites a diligence question. Nothing on the site depends on it.

---

## 2. Live factual defects, fix now

All twelve are on the public site today. Ordered by risk.

### 2.1 CRITICAL: the HIPAA compliance overclaim

`lib/remediation.ts:273` publishes, as a team credential bullet on `/solutions/remediation`:

```
"HIPAA-compliant platform architecture",
```

Deck Appendix A1 (slide 31): `SOC 2 and HIPAA are on the funded roadmap as the enterprise gate.` Slide 28 lists both under *where the money goes*.

Certified versus on-roadmap is legally meaningful. This can be read as a representation in procurement and can end up incorporated by reference into a signed vendor security questionnaire. It is also unnecessary, because the honest position is stronger: synthetic patients mean there is no PHI to protect. The phrase is arguably incoherent as written anyway, since HIPAA compliance attaches to an entity handling PHI, and per A1 ClinicalSim handles none.

**Replace with:**
```
"No real patient data, so no PHI exposure",
```

**Do not add a SOC 2 or HIPAA claim of any kind until certification exists.**

Worth noting how well the rest of the site does here, because it means this is one line and not a systemic problem. A full grep for `hipaa|soc ?2|certif|compliant|compliance|baa|business associate` found:
- No SOC 2 claim anywhere.
- `privacy/page.tsx` clean, with a correctly hedged security statement at `:79`.
- `lib/pricing.ts:319-321` is deck-correct and is the model answer to reuse: "No real patient data is used in any simulation. ClinicalSim is a training platform, not a clinical documentation tool."
- `medical-educator-faq:735` deck-correct.

### 2.2 CRITICAL: the 80% sentinel-event claim

`components/roi-calculator.tsx:652` asserts communication failures `contribute to 80% of sentinel events (Joint Commission, 2024)`, with a matching disclaimer entry at `:731`.

Deck A3 notes are explicit: the 66% sentinel-event and 80% handoff figures `are real in provenance but the Joint Commission no longer publishes them, so we cite Sentinel Event Alert 58 qualitatively instead.` Slide 19's version is `up to 80% of serious errors involve a handoff`.

So this asserts, as a hard 2024 fact, a number that body does not publish, and re-points a handoff-specific statistic at sentinel events generally. It is live on `/pricing` and is exactly the kind of passage AI search engines lift verbatim.

**Replace the framing paragraph (`:650-657`) with:**

> Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago (Candello 2025 Benchmarking Report), and the Joint Commission has repeatedly named communication a leading root cause of sentinel events (Sentinel Event Alert 58). Communication measures make up five of the eight HCAHPS measures Medicare pays on, about 15.6% of a hospital's value-based purchasing score (CMS). A communication-centered discharge cut 30-day utilization about 30% in a randomized trial (Project RED, Annals of Internal Medicine, 2009).

Delete "Sentinel events: Joint Commission, 2024" from the disclaimer at `:726-732`.

See section 3: retiring this component entirely may be the better move.

### 2.3 HIGH: the 60% adverse-events statistic on the homepage

`app/(marketing)/page.tsx:307-311` claims `60% of hospital adverse events are linked to communication failures`, sourced to `The Joint Commission, Sentinel Event Data`. Same claim at `lib/audiences.ts:192` and `:224-226`.

Two independent agents flagged this. It matches neither the deck's 66% nor any citable source, it swaps "sentinel events" for the much larger "adverse events" denominator, and per A3 the whole family of figures is unpublishable as a hard number.

**Replace the homepage stat card with a deck-sourced pair**, keeping the 40% card beside it:

> **39%** greater odds that a communication-failure claim closes with an indemnity payment
> *Candello 2025 Benchmarking Report*

For `lib/audiences.ts:224-226`:

> value: `$386K-$944K`
> label: `average indemnity per communication-failure case, general medicine to obstetrics`
> source: `CRICO 2015 specialty indemnity averages`

### 2.4 HIGH: Gillian Brennan's credential

`app/(marketing)/research/page.tsx:350` reads `Gillian Brennan, MD`. Deck slide 26 and the CLAUDE.md credential snapshot both give `MB BCh BAO`. Also wrong at `insights/ai-affirming-care-communication-training/page.mdx:10`.

Misstating a physician's degree on the credibility page is the kind of error this audience notices immediately.

### 2.5 HIGH: "$1.7 billion annually"

`lib/audiences.ts:192` states `$1.7 billion in malpractice costs annually`. Deck A3: `The 2009-2013 cohort alone: $1.7B in losses and 1,744 deaths (CRICO, 2015)`, i.e. **over five years**. Slide 22 notes confirm the five-year framing.

This compresses a five-year figure into an annual one, inflating it fivefold. There is also a conflation trap: the deck has a *separate, unrelated* annual $1.7B, the Medicare VBP pool. Two other site pages state the five-year framing correctly (`insights/hospital-communication-training-roi/page.mdx:10`, `insights/why-communication-training-matters/page.mdx:10`), so `audiences.ts` is the outlier.

**Replace with:**
> Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago (Candello 2025), and communication breakdowns were linked to $1.7 billion in losses and 1,744 deaths over five years (CRICO 2015).

### 2.6 HIGH: wrong journal on the readmissions claim

`components/roi-calculator.tsx:655`: `Discharge communication interventions reduce readmissions by up to 31% (JAMA)`.

Deck A3: `A communication-centered discharge cut 30-day utilization ~30% in an RCT (Project RED, Annals of Internal Medicine, 2009)`.

Wrong value and wrong journal. A journal misattribution is the clearest Hallucination Prevention breach found.

### 2.7 HIGH: the 30% malpractice figure in the calculator

`components/roi-calculator.tsx:466` and `:651` use `30% of all malpractice claims involve communication failure (CRICO)`, dated 2025. The deck's 2025 figure is **40%**, up from 30% in the prior period. This also contradicts the site's own homepage at `page.tsx:314`.

### 2.8 HIGH: indemnity and RN turnover figures in the calculator

- `:367`, `:429`, `:609`: `avgClaimCost = 237600 // CRICO, 2025`. Appears nowhere in the deck and sits below the deck's $386K floor. The deck's indemnity averages are CRICO **2015**, not 2025.
- `:412`, `:551`: `costPerRnDeparture = 61110`, cited `NSI, 2024`. Deck slide 19 and A4: **$60,090**, NSI **2026**.

### 2.9 HIGH: two irreconcilable faculty-hour ranges

The site publishes both:
- **29 to 45 hours** in 8+ places (`page.tsx:126`, `about`, `lib/audiences.ts:84,117`, `lib/pricing.ts:81`, `lib/remediation.ts:118,133,311`, `faq:84`)
- **25 to 75 hours** in the blog and post registry (`insights/faculty-hour-problem-communication-remediation/page.mdx:10,11,14,44,56,62`, `lib/posts.ts:53`), sourced to Kalet and Chou 2014

The deck backs only 29 to 45. Standardize on it. **But see section 1 caveat in 2.10 and the research flag in section 3.2 before locking the citation.**

Also `faq:84` credits *both* the 29.6 and the 45 to `Guerrasio et al., 2014`. Per deck slide 2 notes, the 45 is Warburton 2017; Guerrasio 2014 reported 29.6. Warburton appears nowhere on the site.

Seven locations also use `University of Colorado; Penn EIRC` as the attribution. That is an institution name, not a citation, and it fails the GEO rule that every statistic carries a source.

### 2.10 HIGH: five conflicting standardized-patient costs, plus two SP-replacement violations

Five ranges live simultaneously for the same quantity:

| Range | Locations |
|---|---|
| $50 to $500 | `lib/audiences.ts:303,309,310,332,534,535`; `lib/comparisons.ts:53,116`; `lib/remediation.ts:223` |
| $200 to $500 | `lib/audiences.ts:76`; `lib/remediation.ts:139,140,336,376` |
| $150 to $300 | `faq:71`; `lib/posts.ts:134`; `insights/scalability-problem-sp-programs/page.mdx:10,17,23` |
| $100 to $200 fully loaded | `lib/pricing.ts:213,280`; `components/roi-calculator.tsx:253,726` |
| $15 to $50/hr actor fee | `insights/scalability-problem-sp-programs/page.mdx:17` |

The deck supports only `$20 to 30 an hour` for the actor plus a booked room and a faculty observer (slide 3), and labels its own per-resident figure as an internal build. At least four of the five site ranges are wrong, and AI search will quote whichever it hits first.

The repo's own new research contradicts all five: `lib/roi/constants.json` gives a fully loaded headline range of **$45 to $70** with `no_published_us_figure_exists: true`, and an SP wage of $20 to $32 backed by nine published university rate cards.

**Separately, `lib/pricing.ts` contains the site's only two SP-replacement violations**, which CLAUDE.md forbids outright:
- `:200` "ClinicalSim **replaces that** with unlimited on-demand practice at $20,880/year"
- `:280` "gets unlimited practice for $20,880/year **instead of** spending $27,000-$68,000"
- `:249-251` the head-to-head cost table frames the product as a substitute by construction

Four other places get it right and should be the template: `lib/audiences.ts:303`, `lib/remediation.ts:376`, `faq:71`, `insights/scalability-problem-sp-programs/page.mdx:10`.

**Draft replacement for `:200`:**
> ClinicalSim extends that program rather than replacing it, adding unlimited on-demand practice at $20,880 a year, and every session generates CCC-ready assessment data automatically.

### 2.11 MEDIUM: "validated" applied to ClinicalSim's own product

Four posts claim `Validated scenarios designed by clinical experts` and `Validated feedback mechanisms`: `breaking-bad-news-medical-training`, `end-of-life-care-communication`, `healthcare-simulation-technology-trends`, `hospital-communication-training-roi` (each at `:16, :27, :28` or `:21, :32, :33`).

A2 says publications are still in progress. CLAUDE.md says use "evidence-based," not "validated." Replace with "expert-authored" and "evidence-based."

The site's *other* uses of "validated" refer to published third-party instruments (SPIKES, Calgary-Cambridge). Those are correct and should stay. "clinically proven" appears zero times, which is good.

Two looser cases: `lib/audiences.ts:375` "documented improvement on validated milestones" (ACGME milestones are not a validated instrument) and `lib/posts.ts:71` "Proven strategies."

### 2.12 MEDIUM: the Johns Hopkins testimonial

`app/(marketing)/page.tsx:566-571` and `lib/pricing.ts:262-265` carry a quote attributed to `Faculty, Johns Hopkins University School of Medicine`. Hopkins is a legitimate deck research partner (slide 16), so the relationship is real, but this specific quote appears nowhere in the deck. Slide 15 notes confirm written permission exists for the Advocate nurse practitioner quote; no such note exists for a Hopkins quote.

**Confirm written permission is on file, or anonymize to "Faculty, academic medical center."**

### One latent landmine, currently safe

`app/(marketing)/page.tsx:490-512` holds a JSX-commented evidence block reading `Among the first AI communication platforms with published, peer-reviewed research demonstrating effectiveness`, with `journal="TODO: real journal once published"`. It does not render, and the guarding comment correctly warns against reintroducing a placeholder citation. **Leave it commented.** The "published, peer-reviewed" line must be rewritten before it is ever enabled, since A2 says publications are in progress.

---

## 3. The ROI calculator situation

### 3.1 Two calculators are now live at once

State as of this audit, confirmed directly:

| | Old | New |
|---|---|---|
| Component | `components/roi-calculator.tsx` | `components/roi/` (11 components) + `lib/roi/` |
| Route | embedded in `/pricing` | `/roi-calculator` |
| Indexed | no, `/pricing` sets `robots: index: false` | **yes**, in `app/sitemap.ts:110` and `app/llms.txt/route.ts:56` |
| Linked in nav | no | yes, header and footer |
| Git | committed | untracked |
| Stats | **five defects** (sections 2.2, 2.6, 2.7, 2.8) | sourced, with a guard that throws on unsourced constants |

The new work landed while the audit agents were reading, so two of them reported `lib/roi/` as imported by nothing. It is now wired to a public, indexed, nav-linked route.

**So the new calculator is now the public-facing one, and the old one, which holds all five bad stats, is still shipping on `/pricing`.** Retiring `components/roi-calculator.tsx` fixes items 2.2, 2.6, 2.7, and 2.8 in a single deletion. That is the cheapest high-severity win in this report.

Beyond the five stat defects, the old calculator also has structural problems the new model refuses by construction: a 0.5-day length-of-stay reduction presented as a modelled input with no source (`:389`), an `83%` / `75%` / `70%+` inconsistency on hospitals penalized, and a headline "Total annual financial impact" that sums overlapping exposures (`:396`) against the new model's stated rule "never sum across bands."

### 3.2 The new research contradicts the deck, with citations

`lib/roi/constants.json` is the most rigorous economic asset in the repo, and it disagrees with several deck numbers in the direction of being *more* defensible. These are deck-side corrections, not website fixes:

| Deck claim | What the research says |
|---|---|
| "Warburton 2017, mean 45 hrs" | **The cited paper does not exist.** `lever_a2.corrections[0]` records the real paper as DeKosky/Warburton, *J Grad Med Educ* **2018**;10:325-330, giving 25 to 75 hours for **one** deficit type, with the caveat "ONE study, ONE deficit type. Not a literature-wide range." Both the deck's "45" and the site's "Penn EIRC" trace here. |
| "Skills decay within 3 months" (slides 3, 19, A3) | **Marked CONTRADICTED,** with an explicit note to remove it from slides 3 and 19. Fallowfield 2003 (RCT, 160 UK oncologists) found trained behaviors held at 12 months; only empathic expression decayed. The usable version is narrower and more interesting. |
| "3 to 5 cases a year" (slide 22) | Does not survive per-program: `cases_per_program_floor: 1.0`, because cases per program per year run 0.93 to 1.04 flat across a 2.7x range of program size. Scaling is sublinear. |
| "Extended year $85K to $150K" | $150,000 is a THCGME **funding cap, not a cost**. Defensible range is $88K to $106K (stipend plus fringe, RAND basis). The fully loaded $195K figure carries "NEVER use in an avoided-extended-year claim." |
| "$150 to $300 per faculty hour" (site, `lib/remediation.ts:130`, `lib/audiences.ts:82`) | On the `do_not_use` list: "Generic '$150 to $300 per physician hour'. No traceable primary source." Researched default is $145/hr (MGMA 2025 academic, plus 22% fringe, over 2,080 hours). |
| "One avoided extended year pays for the deal twice over" | The math holds, but `lever_a3.presentation` says **BREAK-EVEN ONLY: do not project prevented extensions as a dollar saving.** `types.ts` sets `projectedSaving: null` by type. |

The `skills_decay` and `Warburton` items matter beyond the website, because both appear in the deck you are actively showing investors.

Also flagged by the same file, worth resolving in the deck: "$200K to $1M a year per hospital on courses" (slide 19) has no source found and should come out; VitalTalk's "about 6 learners per faculty" is not published and needs a source or removal.

### 3.3 Four prices for the same product

| Source | Program price | 50-resident annual |
|---|---|---|
| Deck slide 23 | $25K to $50K, 40 to 90 users | $25,000 to $50,000 |
| Deck slide 22 | "$25K to $40K a year" | $25,000 to $40,000 |
| `/pricing` page | $29/user/month, $348/learner/year | $17,400 |
| `/pricing` embedded calculator | $25/user/month at 10+ (`roi-calculator.tsx:193-195`) | $15,000 |
| `lib/roi/defaults.ts:22` | $600/learner/year | $30,000 |

A 40-resident program sits inside the deck's stated 40-to-90 band for a $25K to $50K contract and the site quotes it $13,920 (`lib/pricing.ts:184-186`). The deck's whole slide-22 ROI argument depends on the deal costing $25K to $40K.

`lib/roi/constants.json` already records this as a known open decision: *"the live /pricing page's published $29/user/month wrong. Separate decision."* Only you can make it.

Two tiers exist only in the deck (Simulation center $100K to $150K, Institution-wide $450K to $1M). The site collapses both into "Enterprise / Custom." And an **Individual tier at $19/month exists on the site and nowhere in the deck**, shipping two placeholder CTA anchors (`lib/pricing.ts:106,111`). A prospect who has seen a $25K institutional deck and then finds a $19 consumer plan draws unhelpful conclusions.

**Decide what `/pricing` is.** It is live, noindexed, unlinked from any nav, absent from the sitemap, and carrying four contradictory prices plus two dead anchors. Either finish and publish it or move it behind a gate.

---

## 4. The positioning lift: what to take from the deck

This is what you actually asked for. The gems, ranked by impact per word, with placement.

### 4.1 Publish these

1. **"Medicine's most performed procedure is also its least measured."** (slide 1) → new H1, replacing `page.tsx:191-193`. The current H1 has the "performs most, practices least" half but drops "least measured," which is the half that separates you from every other sim vendor. It also removes an em dash.

2. **"Every number prices the failure after it happens. The skill that causes it has never been measured, so it has never been priced."** (slide 2) → closing line of the cost section. This is the best sentence in the deck and it has no equivalent anywhere in the codebase.

3. **The $35B to $55B aggregate with the eight named budget lines** (slide 2) → replaces the two-stat block at `page.tsx:305-320`. This is the single change that moves the site from remediation tool to infrastructure company. **Publish the range with its overlap caveat attached**, per A4: the composite takes communication-attributable shares with overlap adjustments, not a straight sum. Without the caveat, the first analyst who adds the cards finds an inconsistency.

   Draft H2: `Every line of the hospital budget already pays for communication failure.`

   Draft body: `Communication failure costs US healthcare $35 billion to $55 billion a year, and it lands on eight lines a CFO already answers for: malpractice, safety events, readmissions, patient-survey pay, nurse turnover, physician burnout, unbilled conversations, and the faculty hours spent remediating trainees.` Sources: `Candello 2025, AHRQ, CMS, NSI 2026, Han et al., Annals of Internal Medicine 2019. Composite adjusted for overlap between pools.`

   Note this also removes "soft skill" from `page.tsx:299`, which CLAUDE.md forbids even in negation.

4. **The real study numbers** (slide 15) → hero evidence panel `page.tsx:227-241`. The homepage currently says only `Improved significantly`. Both studies were run and presented by the institutions' own physicians, so they are citable now. **Blocked on 1.1 and 1.2.**

5. **"Only 3 to 4 live practice conversations across years of training"** (slide 3) → the problem section. Attribute as `ClinicalSim national needs assessment of GME program leaders, publication in progress`. This replaces two *unsourced* site claims of "2 to 4 formal sessions" (`why-communication-training-matters:24`, `scalability-problem-sp-programs:27`) with a sourced number.

6. **"Health systems already spend around $3 billion a year on simulation"** (slide 3) → same section. Reframes the sale as reallocation rather than new budget, which is the argument a DIO can act on.

7. **1:1 to 1:many, with "the expert stays in the room"** (slide 6) → new section between why-now and the platform section. Absorbs and upgrades the weak `Scale Across Your System` card (`page.tsx:97-101`), which currently talks about scheduling logistics rather than capturing expert judgment.

8. **"The physicians who write the national standards designed every case"** (slide 4) plus slide 9's three pillars → the definition block. Named MD byline, anchored to published standards, every score cites a verbatim line. All three are publicly verifiable and all are missing from the homepage. The traceable-citation pillar is already the site's best-aligned claim on `/methodology`; it just never reaches the front page.

9. **"Voice AI can hold the conversation now"** plus "a decade of technology didn't touch it"** (slide 5) → rewrite of why-now reason 3, which currently says `No scalable remediation tool exists. ... We built it.` (`page.tsx:378-380`). That is a product claim where the deck has a market claim. Add the Beckett 2024 proof point: doctor communication rose 0.8 points from 2007 to 2019, the smallest HCAHPS gain.

10. **Milestones 2.0 specificity** (slide 5) → `page.tsx:374-376` says the bar rose without saying what the recurring obligation is. The deck's version bites: since 2022, every program must grade each resident and fellow on communication **twice a year**.

11. **The needs-assessment demand numbers** (slides 19, 35) → replaces the aging CERA-only stat set at `page.tsx:116-141`. First-party, current, and far more persuasive than "16 published studies" (which is itself unsourced, see section 7).

12. **"Learners often rate themselves lower after a session. That's the tool working."** (slide 8) → expand the `Looking ahead` panel at `page.tsx:429-437`. Most memorable claim in the deck. **Blocked on 1.2.**

13. **"Billions have gone into clinical AI, almost none of it trains the human side of the conversation."** (slide 25) → one line above the final CTA.

14. **"Every clinician should get to practice the hardest conversations before they happen."** (slide 28) → replaces the flat `Ready to close the communication gap?` at `page.tsx:617-619`.

15. **The founders' NICU and HELLP story** (slide 7) → new section on `/about`. Highest trust yield of anything in this report and the largest unforced omission on the site: `/about` currently has no team, no founders, no photos, and no JSON-LD at all. **Blocked on 1.3**, and requires yours and Lauren's sign-off. Prefer your first-person voice over any drafted third person.

16. **"Today: a 32-page PDF, scored by hand, twice a year"** (slide 30) → sharpens the `CCC-Ready Documentation` card at `page.tsx:104-106`.

17. **"Nearly two years of research and iteration, hundreds of sessions"** (slide 9) → `/methodology` section 2.1, which describes the review process with no scale attached. Absent site-wide.

18. **The compliance posture** (slides 10, 31) → new `/trust` page or a `/methodology` section. All defensible today, and it preempts the questions every hospital reviewer asks:

    > ClinicalSim is a training and assessment tool, not a diagnostic device, so no FDA clearance is required. Every patient in every case is synthetic, authored from the clinical literature rather than from patient records, so no protected health information enters the platform and there is nothing to de-identify. Published cases, rubrics, and scoring prompts are versioned and locked. Learner voice data is consent-gated, learners can request erasure, and our AI vendors are contractually barred from training on the data. SOC 2 and HIPAA certification are on our funded roadmap and are not yet in place.

    That last sentence is the one that closes deals instead of opening liabilities. **Confirm with engineering that the consent-gating, erasure, and vendor-training claims are true today before publishing them.**

19. **The pilot count, unnamed** (slide 1) → hero proof strip. `In pilot at 20 or more academic medical centers and children's hospitals.` The count is safe; the roster is not.

### 4.2 Risks when lifting deck language

- **Positioning whiplash.** Moving the homepage to "$35B to $55B, the unmeasured input" while `(marketing)/layout.tsx:26` and `site-footer.tsx:22` still describe the company as "purpose-built for communication remediation" produces a site that promises infrastructure above the fold and sells a remediation tool below it. The remediation wedge should stay, but the org schema and footer need to move up a level in the same pass.
- **Nothing from slides 21 or 24 can go public as capability.** Risk pricing, premium credits, "we replace attendance with measured performance," and predicting which units head toward a claim are all phases 2 to 4, and slide 24's own note concedes there is no score-to-outcome correlation yet. On a healthcare site, implying you can price malpractice risk today draws carrier and regulator attention.
- **The SP-replacement rule is easy to trip** while adding the deck's SP economics. Slide 3's cost breakdown reads as "we are cheaper than your SPs." Pair any volume argument with the extend-not-replace clause in the same paragraph, and keep SP cost figures off the homepage until section 2.10 is settled.
- **First-party unpublished data needs its label every time.** The 3-to-4 figure, the 26-of-27 demand number, and the gap figure all come from the n=27 needs assessment, publication in progress. Note the sample is 22 of 27 pediatrics programs, so "national" plus a pediatrics-heavy n=27 is a fair-characterization question worth deciding before it appears in a homepage stat tile.
- **Do not publish the LCME 7.8 / ACGME "not one hour of practice is required anywhere" line** from slide 3's notes without reading the element text directly. It is the most quotable claim in those notes and exactly the kind of regulatory assertion CLAUDE.md forbids stating unverified.
- **Institution names.** The count is safe, the roster is not. Slide 16 is investor-only. The one quote in the deck with documented permission is the Advocate nurse practitioner's.

---

## 5. Structural gaps

### 5.1 Seven of the deck's ten buyers have no page

Deck slide 19 names ten buyers across eight cost domains.

| Deck domain | Deck buyer | Site coverage | Recommendation |
|---|---|---|---|
| Remediation and faculty time | Program director, then DIO | **Strong.** `/solutions/remediation` + 2 audience pages | Keep as the wedge. Add the break-even math (5.2) |
| Malpractice | Risk managers, carriers | **None.** `grep "risk manager"` hits only `lib/roi/constants.json` | **Highest-value new page.** All of slide 21 is externally published: $386K to $944K indemnity (CRICO 2015), 30% to 40% of claims (Candello 2025), 5 to 19% premium credits, ~50% OB claim-rate drop (Schaffer 2021). Do not publish the $23B pool (partly an internal estimate) |
| Safety events | VP of Quality, CMO | **None** as a buyer page | Fold into one institutional page. Handoffs, escalation, and error disclosure are trainable use cases the site never mentions |
| Readmissions | VP of Quality, population health | **None.** One blog post only | Same page. Project RED and teach-back OR 0.40 are both published |
| Patient-survey pay | Chief Experience Officer | **Barely.** One Enterprise bullet | Same page. Five of eight paid HCAHPS measures are communication measures. Do **not** publish "$200K to $1M a year per hospital" (unsourced) |
| Nurse turnover | CNO | **None.** The word "turnover" does not appear on any page | Defer until nursing expansion is real. One paragraph meanwhile: $60,090 per RN replacement (NSI 2026) |
| Physician burnout | CMO, Chief Wellness Officer | **None.** Notably absent from `/audiences/faculty-clinician-educators`, where it fits exactly | Add to the existing faculty page rather than building a new one. Confirm the 3x-odds citation first |
| Unbilled conversations | Revenue-cycle leaders | **None.** `grep "CPT"` returns nothing | Lowest priority, highest hallucination risk. CLAUDE.md forbids inventing CPT codes. Leave off until you supply the code list and the 2-to-4% utilization source |

**Recommendation: two new pages, not seven.** `/audiences/risk-and-patient-safety` for carriers and risk officers, and one `/audiences/quality-and-patient-experience` covering VP Quality, CMO, and CXO in sections. Both need WebPage + BreadcrumbList + FAQPage JSON-LD, plus `app/sitemap.ts` and `app/llms.txt/route.ts` entries.

### 5.2 The ROI argument is missing its second half

The site has the cost of the problem and almost none of the return.

| Deck slide 22 element | On site? |
|---|---|
| 29 to 45 faculty hours per case | Yes, 8+ places |
| $5K to $15K per case | Yes |
| The 20-minute practice unit | **No.** Nowhere in any page |
| 3 to 5 cases a year | **No** (and see 3.2, it may not survive) |
| Extended year $85K to $150K | **No** |
| Contract price as the denominator | **No,** and the site contradicts it (3.3) |
| Freed faculty time worth $18K to $68K | **No** |
| "One avoided extended year pays for the deal twice over" | **No** |

The one place the site does compute a return, it does it on the weaker anchor: `lib/pricing.ts:199-200` leads with "replaces $27,000 to $68,000 of SP spend," which is built on a disputed SP cost and violates the extend-not-replace rule. `lib/roi/constants.json` flags exactly this: *"Deck moved to faculty-time ... Both need to move to the faculty-time anchor."*

Also delete `lib/pricing.ts:226`, which promises faculty time per case of `Zero — automated assessment`. That contradicts the deck (faculty stay coaches reading a dashboard), contradicts `lib/solutions.ts:212` on the same site, and contradicts the research's 0.4 displacement fraction. Replace with `Faculty review a dashboard instead of facilitating every session.`

### 5.3 Author registry drift

`lib/authors.ts` has **three** entries: `clinicalsim-team`, `lauren-rissman`, `jacqueline-ponczek`.

CLAUDE.md documents "5 real team members" and lists valid IDs `vinod-havalad`, `lauren-rissman`, `gillian-brennan`, `ben-conway`, `will-meyer`. **Four of those five do not exist.** Any agent following CLAUDE.md and writing `authorId: "vinod-havalad"` gets a silent fallback to "ClinicalSim Team" with no error. Ponczek, who *is* in the registry and *is* the `/methodology` byline, is not in CLAUDE.md's list at all.

Consequences:
- 12 of 13 insight posts render as "ClinicalSim Team," while deck slides 9 and 27 rest on named-physician authorship.
- `getAllAuthors()` (`lib/authors.ts:48`) is dead code. CLAUDE.md claims `/about` emits Person JSON-LD for each team member; `/about` has no JSON-LD at all. Slide 26's credentials generate zero machine-readable signal.
- `sameAs` is empty for both real authors, leaving free E-E-A-T on the table for physicians with real publication records.
- **Ponczek's title conflicts:** registry says `Methodology Advisor, ClinicalSim.ai`, deck slide 26 says `VP of MedEd: Quality & Standards`. Memory flags her title as unconfirmed. Her `jobTitle` is emitted in Person JSON-LD on `/methodology`, so whatever is in the registry is what crawlers ingest. **Your call.**

**Fix:** add the four missing authors from slide 26 plus the CLAUDE.md credential snapshot, resolve Ponczek's title, remove the em dash at `lib/authors.ts:39`, then correct CLAUDE.md's stale ID list.

### 5.4 `/privacy` does not cover the product

`faq:343` tells learners `Full detail is in the privacy policy`, and `medical-educator-faq:743-755` sends program directors there for learner-data handling. `app/(marketing)/privacy/page.tsx` is a marketing-site cookie and contact-form policy, last updated March 16 2026, with **no** mention of voice recordings, transcripts, retention, subprocessors, deletion mechanics, or institutional data ownership. No JSON-LD.

Two pages route a privacy or IRB reviewer to a document that does not answer the question they were sent to answer. The substance exists (slide 10); it just is not written down.

Also worth a deliberate decision: `privacy:58-65` discloses a retention.com identity-resolution pixel that may associate visitor activity with email or home address. On a site whose buyers are hospital privacy offices, that sits badly next to "consent-gated by design." At minimum, state clearly that it applies to marketing-site visitors and not the authenticated product.

### 5.5 Smaller structural items

- **Four broken `relevantSolutionSlugs`** (`lib/audiences.ts:157-161, 273, 379-383, 491`) point at `goals-of-care`, `advance-care-planning`, `cognitive-assessments`, none of which exist. `components/audience-page-layout.tsx:32-34` silently falls back, so program directors, DIOs, sim directors, and CCCs all land on the same remediation page.
- **`lastUpdated` never renders** on the three generic solution pages (none set it, `lib/solutions.ts:52`), and `/solutions/remediation` is five months stale at `2026-03-16`.
- **`/about` has no JSON-LD**, contrary to CLAUDE.md's non-negotiable every-page rule. Same for `/privacy`.
- **Contrast violations** in scope: `contact/page.tsx:94,109` put `text-cs-dark-blue` on a dark blue hero; `about/page.tsx:103,113` put a white icon on `bg-cs-electric`; `about/page.tsx:213` hovers to dark blue on a dark blue section.
- **`methodology:576-580`** (Morrison LJ et al.) is the one incomplete citation on an otherwise immaculate page: no year, volume, or pages.

---

## 6. Content library

### 6.1 Coverage against the deck

Of the deck's ten strongest content angles: **two covered, four partial, four with no post at all.** Grep across the whole tree returns **zero** hits for `35-55`, `unbilled`, `$4.6B`, `Zolnierek`, `Project RED`, `Beckett`, `795,000`, `289B`, `86,000`, or `interprofessional conflict`.

Five of the deck's eight budget lines have no presence in the insight library at all.

**Six of 13 posts have no deck anchor**, and three of them (`breaking-bad-news-medical-training`, `healthcare-simulation-technology-trends`, `end-of-life-care-communication`) share **verbatim identical** bodies with only the H1 changed, including the same uncited 40% claim. `hospital-communication-training-roi` is a fourth in the same family. That is a thin-content and duplicate-content liability on the primary GEO surface, and two of them duplicate far better posts that already exist.

**One post is actively off-message.** `osce-case-design-guide:18` argues that "the most common validity failure occurs when cases assess communication style rather than clinical reasoning," i.e. that communication is a confound to design out of assessment, on a site whose thesis is that communication is a measurable procedure. It is also 134 lines with zero citations and Title Case headings throughout.

### 6.2 New posts worth writing, ranked

1. **What communication failure costs, on every line of the budget** (`cost-of-communication-failure-healthcare`). All eight budget lines with named sources. Owns "cost of communication failure in healthcare," a query with no authoritative decomposed answer anywhere. Build it on `lib/roi/constants.json` so the post and the calculator cannot drift.
2. **Confidence is not competence** (`confidence-is-not-competence-communication-training`). Author: `lauren-rissman`, it is her research. The highest-leverage post on this list, because the field's current answer to "does communication training work" is a confidence survey. **Blocked on 1.1 and 1.2.**
3. **The evidence that communication training moves the metrics** (`does-communication-training-improve-outcomes`). Zolnierek 1.62x, Project RED ~30%, teach-back OR 0.40, CRICO OB ~50%, Beckett 0.8 points. Five peer-reviewed effect sizes in one place, each independently extractable. Lets the site say "evidence-based" per CLAUDE.md instead of gesturing at it.
4. **Medicine's least measured procedure** (`medicines-least-measured-procedure`). The deck's headline thesis, which has no page. Publish raw counts (22 of 27), not percentages.
5. **What GME programs actually asked for, and it isn't end-of-life** (`what-gme-programs-want-communication-scenarios`). The A4 breadth signal is the strongest available rebuttal to "you're a palliative-care niche tool," and it appears nowhere.
6. **Why a workshop can't hold** (`communication-skills-decay-continuous-practice`). **Blocked:** the site says six months (`medical-educator-faq:536`), the deck says three, and `lib/roi/constants.json` says the three-month claim is contradicted by Fallowfield 2003. Resolve before writing a word. The honest version is narrower and more interesting: empathic expression is the one behavior that fades.
7. **The economics of one standardized patient hour.** Consider as a rewrite of `scalability-problem-sp-programs` rather than a new post. It is the only clean way to publish the sourced 3-to-4 figure and it retires three conflicting cost figures.

### 6.3 Highest-value upgrades to existing posts

- **`hospital-communication-training-roi`**: rewrite, don't patch. 38 lines, mostly boilerplate. Fold into new post #1, keeping the URL.
- **`why-communication-training-matters`**: strongest malpractice paragraph on the site, stops one line short of the deck's scale claim. Add the six missing budget lines at `:10-14`; replace vague HCAHPS language at `:18-20` with the 5-of-8 and 15.6% precision; replace the unsourced "2-4 sessions" at `:24`. **This post carries nine numeric claims and has no `ReferencesSection` at all.**
- **`what-programs-lost-when-step-2-cs-disappeared`**: strongest deck-aligned post on the site. Add what was actually lost (12 fifteen-minute conversations with trained actors), the twice-a-year Milestones obligation, and the Candello 2025 update at `:64`, where it still presents CRICO 2015's 30% as current.
- **`eol-communication-training-measurement-gap`**: the confidence-competence section at `:44-52` is the site's best material and carries zero numbers. Also `:60` says "One hospital system is currently piloting the tool" (now 20+), and `:74` reads as pending for a result that has landed. Plus 1.3 and the unsourced needs-assessment finding at `:46`.
- **`faculty-hour-problem-communication-remediation`**: reconcile the hour range (2.9), and add the dollarized consequence the deck leads with and the post omits: $5K to $15K per case and the extended-year cost.

### 6.4 Compare and examples

**Compare holds up well.** `lib/comparisons.ts` is the most CLAUDE.md-compliant file in scope; its FAQ states the extend-not-replace rule almost verbatim, and its header comment bans invented statistics and named competitors. Two gaps: the voice-vs-text page is entirely stat-free on a query you should own outright, and `relatedPostSlugs` point at two of the weakest posts.

**Examples do not reflect the deck's case breadth.** Deck slide 8 names four categories; the gallery has **breaking bad news only**, plus two cases outside the named set. Missing, in priority order:

1. **Goals of care / end of life.** The deck's flagship transcript, Lauren's specialty, the company's origin case. Nothing.
2. **Informed consent.** Named on slide 8, again on slide 21 as one of the two conversation types that drive claims, again on slide 28. Absent.
3. **Difficult family meetings / interprofessional conflict.** A4 says interprofessional conflict is the *most* requested scenario.
4. **Custom institutional cases** (Georgetown suicide-risk, Hopkins Kawasaki). Proof that faculty co-build cases, which no competitor page can match. Needs permission, but even one anonymized example would carry weight.
5. **Error disclosure and handoffs.**

All three current examples are pediatric subspecialty, two featuring the same fellow, while the evidence base ran across NICU, PICU, and ED and slide 17 shows expansion into adult neurology, internal medicine, and emergency medicine. The gallery reads narrower than the actual footprint.

One thing to look at: the simulated learner in the demo transcripts is voiced as "Dr. Rissman" and "Dr. Grisman." Using the CMO's real surname as a demo learner being scored 3 of 5 on professionalism is worth a second look.

---

## 7. The unsourced list

Complete list of site statistics with no traceable source, with the deck's substitute where one exists. Per CLAUDE.md, these are the hallucination risk.

| Claim | Location | Action |
|---|---|---|
| 80% of sentinel events (Joint Commission, 2024) | `roi-calculator.tsx:652,731` | **CUT.** Only qualitative citation is defensible (SEA 58) |
| 60% of hospital adverse events | `page.tsx:307-311`; `audiences.ts:192,224-226` | **CUT the number.** Same substitute |
| $237,600 per claim | `roi-calculator.tsx:367,429,609` | Replace with $386K to $944K (CRICO 2015) |
| 31% readmission reduction "(JAMA)" | `roi-calculator.tsx:655` | Replace with ~30%, Project RED, Annals 2009 |
| $61,110 per RN departure (NSI 2024) | `roi-calculator.tsx:412,551` | Replace with $60,090 (NSI 2026) |
| 0.43% penalty / "70%+ hospitals penalized" | `roi-calculator.tsx:377,424` | Replace with $320M to $563M, ~three quarters (KFF/Definitive) |
| $3,100 hospital cost per day (KFF 2024) | `roi-calculator.tsx:387,524,615` | Verify the KFF citation or cut. No deck substitute |
| 5.4-day average LOS (AHA 2023) | `roi-calculator.tsx:476` | Verify or cut. Not needed for any deck-backed argument |
| **0.5-day LOS reduction from communication interventions** | `roi-calculator.tsx:389,517-524,612` | **CUT.** Labeled "conservative estimate" in code with no source, and it drives a headline dollar figure |
| 83% of VBP hospitals penalized in 2020 | `why-communication-training-matters:20` | Replace with the sourced version above |
| $2-3M HCAHPS risk for a 500-bed AMC | `why-communication-training-matters:20` | Deck notes give $6M to $10M at a large academic center. Site figure is 2 to 3x low and unsourced |
| 6% of physicians attract 40% of suits (Hickson, JAMA 2002) | `why-communication-training-matters:14` | **Undetermined.** Real paper, but this specific split needs verifying against it |
| 2-4 formal communication sessions | `why-communication-training-matters:24` | Replace with 3 to 4 (needs assessment) |
| ACGME quote "on-the-job training ... is not sufficient" | `why-communication-training-matters:24` | **Undetermined.** Quoted, uncited. Verify wording or drop the quotation marks |
| 25 to 75 faculty hours | `faculty-hour-problem...:10,11,14,44,56,62`; `posts.ts:53` | Reconcile to 29 to 45, but see 3.2 on the Warburton problem |
| 16 published studies ("Literature review") | `page.tsx:136-137,379`; `about:72-73`; `remediation.ts:100-105,358` | Name the review and year, or cut |
| 77-91% remediation success | `audiences.ts:103` | Cut or cite |
| 60-75% of sim center budgets ("Simulation center surveys") | `audiences.ts:316,338` | Cut or name the survey |
| 1 in 5 GME stakeholders / "1,195 GME stakeholders" | `audiences.ts:443-446`; `remediation.ts:148-151,370` | **Replace with the primary figures the site already has** at `what-programs-lost...:44` (80.9% ICS-1, 81.1% ICS-3). "1 in 5" is a derived inversion, which the Hallucination rule forbids |
| 25% of PDs with little remediation training (CERA) | `audiences.ts:95-98,127-129` | Add author and year (Frazier et al. 2021) or cut |
| SP cost, five ranges | 20+ locations | Pick one, source it, label internal builds as such |
| PACE $15,000-$19,000 vs $16,000-$19,000 | `audiences.ts:216-217`; `breaking-bad-news-practice...:68` | Reconcile to one range, cite PACE's published fee schedule |
| "40% of claims ... millions at risk" with no citation | 4 posts | Add the citation the site already uses: Candello 2025 |
| Needs-assessment finding on attendings 10+ years out | `eol-...-measurement-gap:46` | **Not in A4.** Confirm against the survey data or cut |
| "105 studies, only 6 with clear objectives" | `posts.ts:25`; `eol-...:26,78` | **Framing conflict.** Deck says "under 6% covered palliative care training." 6/105 = 5.7% so the arithmetic lines up, but these are different findings from the same paper. Check the published review |
| Guerrasio vs Ehmann as first author, JGME 2024 "Remediation Methods 2.0" | `faculty-hour-problem...:69-75` vs `breaking-bad-news-practice...:89` | The site cites both for the same paper. One is wrong |
| Johns Hopkins testimonial | `page.tsx:571`; `pricing.ts:265` | Confirm written permission or anonymize |

---

## 8. Canonical numbers sheet

Hand this to any future agent writing copy. Drawn only from deck-sourced figures.

### Public-safe

| # | Wording to use | Source | Deck |
|---|---|---|---|
| 1 | Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago. | Candello 2025 Benchmarking Report | s2, 19, 21, A3 |
| 2 | Communication claims carry 39% greater odds of closing with an indemnity payment. | Candello 2025 | A3 |
| 3 | Communication claims are over twice as likely to top $1 million. | Humphrey et al., J Patient Safety 2022 | A4 |
| 4 | Communication failures were linked to $1.7 billion in losses and 1,744 deaths **over five years**. | CRICO 2015 (2009-2013 cohort). Never say "annually" | A3 |
| 5 | Average indemnity per communication-failure case runs $386,000 in general medicine to $944,000 in obstetrics, before defense costs. | CRICO 2015 specialty indemnity averages | s21, A3 |
| 6 | OB claim rates dropped roughly 50% under CRICO's simulation-built obstetric safety program. | Schaffer et al., Obstet Gynecol 2021 | s21 |
| 7 | Insurers give 5 to 19% malpractice premium credits for completing an approved risk-reduction course. | CRICO and NY Reg 124 premium programs | s19, 21 |
| 8 | The Joint Commission has repeatedly named communication a leading root cause of sentinel events. **No percentage, ever.** | Sentinel Event Alert 58 | A3 notes |
| 9 | Medicare value-based purchasing withholds 2% of base operating payments, and patient experience is 25% of the score. | CMS FY2026 IPPS final rule | A3 |
| 10 | About $1.7 billion in Medicare payments is redistributed annually through value-based purchasing. | CMS FY2026 IPPS final rule | s2, 18, 19 |
| 11 | Five of the eight HCAHPS measures Medicare pays on are communication measures, about 15.6% of a hospital's value-based purchasing score. | CMS | s19 |
| 12 | CMS readmission penalties run $320 million to $563 million a year and hit roughly three quarters of evaluated hospitals. | KFF and Definitive Healthcare analyses of CMS data | A3 |
| 13 | A communication-centered discharge cut 30-day utilization about 30% in a randomized trial. | Project RED, Annals of Internal Medicine 2009 | s19, A3 |
| 14 | Teach-back education cut heart failure readmissions with an odds ratio of 0.40. | Meta-analysis, Patient Education and Counseling 2023 | A3 |
| 15 | Physician communication training raises the odds of patient adherence 1.62 times. | Zolnierek and DiMatteo, Medical Care 2009 | A3 |
| 16 | Doctor communication rose 0.8 points from 2007 to 2019, the smallest HCAHPS gain. | Beckett et al., Medical Care 2024 (RAND) | s5, A3 |
| 17 | Replacing one RN costs $60,090; US nurse turnover runs $19.5 billion a year. | NSI 2026 (324,090 departures at $60,090) | s2, 18, 19, A4 |
| 18 | A communication remediation case consumes 29 to 45 faculty hours. | Guerrasio 2014 (mean 29.6). **The 45 needs re-sourcing, see 3.2** | s2, 19, 22 |
| 19 | A remediation case costs $5,000 to $15,000 in faculty time. | ClinicalSim internal build. Extended-year range needs revising to $88K-$106K per 3.2 | s19, 22 |
| 20 | 93% of programs handled a communication remediation case in the past three years. | CERA survey of family medicine program directors (Frazier et al., Family Medicine 2021). The site's attribution is better than the deck's; keep it | s19 |
| 21 | 22 of 27 GME program leaders we surveyed have no objective way to track improvement during remediation, and none rated their current approach better than moderately effective. | ClinicalSim national needs assessment, n=27, publication in progress. **Use the fraction, never 81% or 83%** | s35 |
| 22 | Trainees get only 3 to 4 live practice conversations across years of training. | ClinicalSim national needs assessment, publication in progress | s3 |
| 23 | Health systems spend around $3 billion a year on simulation globally, growing 15 to 17% a year. | Healthcare simulation market reports 2024 (directional) | s3, 20, A3 |
| 24 | About 167,000 residents and fellows train across 13,762 ACGME-accredited programs. | ACGME Data Resource Book | s18 |

**Do not use #23's companion claim** that communication skills decay within about three months until 3.2 is resolved.

### Public-safe once section 1 clears

| Wording | Source | Blocker |
|---|---|---|
| Communication scores improved significantly after one coaching cycle, and the gain held on a case clinicians had not seen (p = 0.0388), with significant gains in five of six skill domains. | Lemelman M, University of Chicago; oral presentation, IPSSW 2026 | 1.1, 1.4 |
| In a 31-provider feasibility study, every repeat user improved, gaining 9 to 16 points of 50 (median 22.0 to 38.5). | Havalad V, Brennan G, et al., Advocate Children's Hospital; **manuscript submitted**, never "published" | 1.2, 1.4 |
| 93.5% rated the platform easy to use (N = 31). 87% rated it user-friendly, 65% rated the tool feasible, 55% found the feedback helpful. | Same | 1.2, plus deck's own 93.5 vs 87 tension |
| Six independent studies are underway at five institutions, funded and staffed by the institutions themselves. | ClinicalSim. A2 wins where slide 16 says "5 research partners" | Reconcile s16/s18/A2 |
| In pilot at 20 or more institutions. | ClinicalSim | Count only, never the roster |

### Investor-only, never publish

| Figure | Why |
|---|---|
| $35-55B value at risk, $1B SAM, $116M SOM | Overlap-adjusted composite and TAM model. The $35-55B **may** be published as a range *with its overlap caveat* per 4.1 item 3; the SAM and SOM may not |
| Individual pool cards ($10-14B safety, $6-8.5B readmissions, $7B unbilled, $4.6B burnout, $23B risk pool) | Components of the composite; publishing them invites the "is this a straight sum?" challenge A4 itself flags. The $23B is partly an internal estimate |
| 43 institutions in the funnel, 20 in conversations, 20/30/50% conversion, $1.3M/$1.9M/$3.2M ARR, $145K blended | Pipeline and revenue projections. Publishing "43 institutions" presents sales conversations as customers. The blended figure tells a program director the quoted price is a land, not a price |
| Deal tiers $25K-$50K / $100K-$150K / $450K-$1M | Institutional price list, already in tension with the published $348/learner/year |
| $5M raise, $18M cap, ~25 paid contracts, 24-30 months runway | Round terms |
| "The bottleneck is us"; "demand is exceeding the team's current capacity" | A DIO evaluating whether you can onboard them should not read this |
| Per-institution expansion counts (UChicago 1→5, Rainbow 1→4, Nemours 1→3, Penn 1+3), the 150 NPs at Michigan | Account-level commercial detail, and it names programs that have not signed |
| VitalTalk: 57,884 providers, 408 institutions, $1.24M, 58% of revenue, "switching to ClinicalSim", $7,210 course price | Deck marks this **verbal only, given the relationship**. Publishing it would be a serious breach, and defamation-adjacent if wrong |
| "Having this many pilot sites running their own studies is rare" | Deck says explicitly: keep verbal, not on the slide |
| The FICO moment, corpus-as-asset, 60,000-80,000 conversations a year | Deck's own guardrail: FICO is an aspiration, not a claim about today. A DIO reading that their trainees' conversations are the asset is a trust problem |
| Roadmap phases 2 to 4 (benchmark, price the risk, predict) | Roadmap. Publishing as available would misrepresent the product to accreditation-sensitive buyers |
| The named pilot-site roster (slide 16, ~40 institutions) | Per-institution permission status unknown. Only the five research institutions already on `/faq` are cleared by current usage |
| 6.2M patient-facing clinicians | TAM number. The 167,000 residents and 13,762 programs figures are fine as context |
| $12,500 per resident per year | Explicitly "our internal build" |
| Hippocratic $126M/$3.5B, OpenEvidence $12B, Press Ganey $6.75B, Surge AI rates | Competitive and market color |

---

## 9. Hygiene

### Em and en dashes

CLAUDE.md bans both in published copy, including metadata descriptions and JSON-LD strings. Counts found:

| File | Count |
|---|---|
| `lib/audiences.ts` | 33 |
| `lib/pricing.ts` | 28 |
| `insights/eol-communication-training-measurement-gap/page.mdx` | 20 |
| `lib/solutions.ts` | 17 |
| `lib/comparisons.ts` | 15 (12 in published strings) |
| `components/roi-calculator.tsx` | 14 |
| `lib/remediation.ts` | 10 |
| `app/(marketing)/page.tsx` | 12 (incl. `&mdash;` at `:316`, `&ndash;` at `:433`) |
| `examples/[slug]/page.tsx` | 8 |
| `about/page.tsx` | 6 |
| `pricing/page.tsx` | 4 |
| `examples/page.tsx`, `privacy` (3), `insights/page.tsx`, `compare/page.tsx`, `glossary`, `authors.ts`, `research:120,346`, `contact:13`, `(marketing)/layout.tsx:26,44`, `site-footer.tsx:22` | 1 to 3 each |

Worst single offender is `eol-communication-training-measurement-gap`, where the paired-dash aside is the file's dominant rhythm.

### Other voice items

- **Banned vocabulary, only 3 hits across 13 posts**, which is genuinely good: `robust` (`osce-case-design-guide:34`, `faq:78`), `nuanced` (`what-learners-want-from-ai-sps:100`). Zero hits for crucial, seamless, delve, foster, underscore, metaphorical navigate, landscape, Additionally, Furthermore, Moreover, pivotal, showcase, leverage, unlock, empower, cutting-edge, game-changer.
- **Copula avoidance, 5 hits:** `faculty-hour-problem...:64`, `breaking-bad-news-practice...:70`, `osce-case-design-guide:58,90`, `why-communication-training-matters:18`.
- **Punchy question headers: zero.** Curly quotes: zero. Both clean.
- **Template scaffolding as writing:** "The Challenge" and "How ClinicalSim Helps" headings repeated across four posts.
- **Title Case headings** throughout `osce-case-design-guide` (`:10,26,62,78,98,114`).
- Product-language rules are respected site-wide: no "bots," no "chatbot" outside quoted study titles, no "soft skills" (except the homepage's negated use, which should still go), no "clinically proven."

### Roadmap leaks

The public release notes are clean. One leak found: `what-learners-want-from-ai-sps:115` publicly commits to "explicit difficulty modes, more patient personas, and stronger post-session debriefs."

Also `ai-affirming-care-communication-training:44` offers "free early access," which conflicts with slide 24's "free deployment is the mechanism, not a discount" and slide 23's pricing.

---

## 10. Two things to protect

Both are the strongest trust assets on the site, and any evidence expansion should sit alongside them rather than soften them:

- **`medical-educator-faq:294-312`**: "we are not claiming ClinicalSim's scoring is more accurate or more valid than a faculty member's. We do not have the validation data to say that, and we will not claim it until we do."
- **`methodology:514-529`**: published rater reliability does not carry over to a ClinicalSim score.

These align exactly with the deck's "among the first" posture. `/methodology` and `/medical-educator-faq` are also the two best-cited pages on the site, with 19 and 26 complete citations respectively, and they should be the standard the rest of the site meets.

---

## Appendix: what could not be determined

Stated rather than guessed:

- Whether the coaching study's p-value is 0.0017 or 0.000345.
- Whether the pilot's "comfort" measure is distinct from the self-confidence item where 74% reported no change.
- Whether the founding story's child is a son or a daughter, and the sequence of events.
- Whether Lemelman or Brennan/Havalad authored the IPSSW 2026 affirming-care presentation.
- Whether the 6%/40% Hickson split and the quoted ACGME "on-the-job training" sentence are accurate.
- Whether PACE's fee is $15K-$19K or $16K-$19K, and whether either is current.
- Whether the "1,195 GME stakeholders" survey exists as described.
- Whether the Johns Hopkins testimonial has written permission on file.
- Whether the 105-study review found "6 with clear training objectives" (site) or "under 6% covering palliative care training" (deck).
- Whether Guerrasio or Ehmann is first author of JGME 2024 "Remediation Methods 2.0."
- Whether the deck's slide 10 product claims (consent-gated voice-data erasure, vendors barred from training on the data, versioned and locked rubrics, tenant isolation) are true today. If they are, they are stronger and safer than the HIPAA line in 2.1.
