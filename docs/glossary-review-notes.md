# Glossary review notes

40 terms are written and live in `lib/glossary.ts`: the 12 that already existed, expanded with body
copy, plus 28 new ones. Every term has its own page at `/glossary/<slug>` and all 40 appear in
`sitemap.xml` and `/llms.txt`.

Six agents wrote these, each required to verify against primary sources and return a per-term log
with an explicit unverified field. 38 of 40 carry a `source`. The two without one are
`ai-standardized-patient` and `high-stakes-conversations`, which have no governing body to cite and
say so in their own copy.

`pnpm lint`, `pnpm typecheck`, `pnpm test` (37 passing), and `pnpm build` (94 static pages) all pass.
A separate validator also checked every entry against the banned-vocabulary list, en and em dashes,
curly quotes, and route validity.

**What the automated gate cannot catch is a plausible-sounding false fact.** That is what the list
below is for. Items are ordered by how much they would cost if wrong.

## 1. Needs your decision: a factual correction to live content

**`dio`** The definition that has been on the site said the DIO "is accountable to the institution's
Graduate Medical Education Committee (GMEC)". That is wrong. ACGME Institutional Requirements 1.2.a
reads verbatim:

> This individual, in collaboration with a Graduate Medical Education Committee (GMEC), must have
> authority and responsibility for the oversight and administration of each of the Sponsoring
> Institution's ACGME-accredited programs...

I pulled the PDF and confirmed the text directly, along with 1.2.b through 1.2.d. The DIO and the
GMEC are peers in the oversight structure, and it is the governing body that holds authority over the
Sponsoring Institution. The entry now reflects that. This is a meaning change to a shipped
definition on a page aimed at DIOs, so it is yours to approve, but the old wording was not defensible.

## 2. Verified citations worth knowing about

**`osce`** now carries the citation the site has never had: Harden RM, Stevenson M, Downie WW,
Wilson GM, "Assessment of clinical competence using objective structured examination," British
Medical Journal, 1975 Feb 22;1(5955):447-51. I confirmed it against PubMed (PMID 1115966).

There is a real scholarly nuance in the copy that I checked and kept: the 1975 title contains
neither the word "clinical" nor the acronym. Both arrive in Harden RM and Gleeson FA, Medical
Education 1979;13(1):41-54 (PMID 763183, also confirmed). The entry says so.

I also **cut** expanded author given names ("Mary Stevenson", "William Downie", "Graham Wilson")
that an agent had written. PubMed carries initials only, so those were assumptions, and an assumed
name in a citation is the kind of error this brand cannot afford. The copy now uses surnames.

**`chse`** is the highest-traffic term (22,200/mo, difficulty 9) and the one most likely to be
noticed if wrong. Verified off SSH's own CHSE page, eligibility page, and handbook: the four
eligibility criteria, the two-hour 115-question exam, the three-year credential, the 2024 blueprint
domains and weights, and the CHSE / CHSOS / CHSE-A / CHSOS-A family. **No fees, pass rates, or
holder counts are asserted anywhere**, because none were confirmable.

**`spikes-protocol`** verified against the full Baile et al. 2000 paper, including all six step
headings. Worth knowing: the paper's body text and its Table 1 disagree with each other on several
percentages, and the agent deliberately used none of the conflicting ones. The single statistic that
did survive (52 percent found the empathy step hardest) is corroborated in both places. The entry
calls it a protocol, per Baile, and notes "sometimes written up as the SPIKES model" once.

**`teach-back-method`** verified against the real 214-page AHRQ Health Literacy Universal Precautions
Toolkit PDF, Tool #5, not a secondhand summary. No outcome statistics claimed.

## 3. Corrections the agents made to my own instructions

**`master-adaptive-learner`** I briefed this as "an AAMC-associated model". That is wrong: Academic
Medicine is the AAMC's journal, but the model's institutional home is the AMA's medical education
work. Rather than assert either, the entry makes **no sponsoring-organization claim at all**. Do not
add "AAMC model" to it.

**`sim-lab`** "Sim lab" is not a headword in the SSH Healthcare Simulation Dictionary. The agent
checked every relevant heading and found none. Attributing the entry flatly to the dictionary would
have implied SSH defines the colloquialism, so I scoped the source to
`SSH Healthcare Simulation Dictionary (Simulation Environment)`, which is the entry it actually
draws on. Say the word if you would rather it carry no source.

## 4. Unsourced editorial observations, your call

These are practice judgments rather than fabricated facts, and none carries a number. They are the
"take a point of view" material the voice guide asks for, but they are assertions about the world
that no source backs. Flagging them rather than cutting them unilaterally:

- **`ccc`** that ICS milestone ratings "drift toward the middle of the scale"
- **`dio`** that a communication gap across multiple programs usually reflects a shared shortage of
  faculty observation time
- **`remediation`** the characterisation of what weak remediation plans do instead
- **`clinical-reasoning`** that reasoning is case specific, so a stable read takes many short cases
  (this is established content-specificity knowledge but is not covered by the Norman citation)
- **`in-situ-simulation`** the operational safeguards (written abort procedure, pharmacy-approved
  labelling, kit reconciliation) are widely taught but were not verified against a named standard
- **`embedded-participant`** the stated reason SSH retired "confederate" (the conspiring-against-the-
  learner connotation) is the community's usual explanation, but the SSH appendix gives no rationale
- **`aspe`** the safe-work-environment specifics are general SP practice knowledge; the Standards of
  Best Practice full text was not reachable (Springer auth redirect, PMC CAPTCHA)
- **`standardized-patient-case`** most of the craft detail is practice knowledge, not lifted from the
  SOBP, for the same access reason

I removed one claim outright rather than flagging it: PEARLS being "the version many simulation
centres now use to onboard new facilitators". Unquantified adoption claim with no source.

## 5. Deliberate omissions

Numbers the agents found but did not publish, because they could not be confirmed from primary text
or are unstable:

- ACGME's accredited-program and specialty counts (change annually, only available via a generated
  page summary)
- Ariadne Labs' reach figures (28,000+ clinicians, ~378,000 patients, 1.8 million conversations) and
  its outcome and cost claims
- ASPE's founding year
- Page numbers for Ericsson's 1993 Psychological Review paper, where two sources conflict
- The 1960s origin date for the SP method
- Any SP per-encounter cost figure, per the standing guardrail
- Any hour figure in `remediation`, per the standing guardrail that the 29.6-hour Guerrasio and
  Aagaard mean must never become a range

## 6. Still outstanding

`osce-case-design-guide` has zero references. The glossary now carries the verified Harden citation,
so that post can borrow it, but that is Workstream 3 and untouched here.
