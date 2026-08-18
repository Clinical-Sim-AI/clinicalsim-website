# Glossary term content worksheet

The `/glossary/[slug]` route is built and gated. A term in `lib/glossary.ts` gets its own
indexable URL **only** when it carries all three of `metaDescription`, `explainer`, and
`lastUpdated`. Until then it renders in full on the `/glossary` hub and `/glossary/<slug>`
redirects there, so nothing is thin or broken while this worksheet is being filled.

Search figures are Semrush US database, pulled 2026-08-17. KD is the 0 to 100 difficulty index.

## What each term needs

```ts
{
  slug: "chse",
  term: "Certified Healthcare Simulation Educator (CHSE)",
  abbreviation: "CHSE",
  definition: "...",           // 2-3 answer-first sentences, already required
  source: "SSH",               // only when citing a standard or body; never invent one
  relatedSlugs: ["...", "..."],// at least 2, and they must resolve

  // --- required for the term to get its own page ---
  metaDescription: "...",      // 110-155 chars, NOT a substring of `definition`
  explainer: ["...", "..."],   // definition + explainer >= 300 words total
  lastUpdated: "2026-08-18",

  // --- optional ---
  inPractice: ["..."],         // "what this looks like in a program" bullets
  relatedLinks: [{ href: "/solutions/remediation", label: "..." }], // >=1 required, off /glossary
}
```

`lib/glossary.test.ts` enforces every one of those bounds, so `pnpm test` tells you when a term
is ready rather than you having to eyeball it. The 300-word floor exists because the domain sits
at Authority Score 2, where a batch of 70-word pages is the pattern quality classifiers use to
discount a whole directory.

Run every string through the `humanizer` skill and its em-dash scan before committing. The test
also fails on en and em dashes in reader-visible copy.

## Existing 12 terms

These already have `definition`, `source`, and `relatedSlugs`. They need `metaDescription`,
`explainer`, `lastUpdated`, and one `relatedLinks` entry each.

| slug | term | US vol | KD |
|---|---|---|---|
| `osce` | Objective Structured Clinical Examination | 1,600 | 29 |
| `standardized-patient` | Standardized Patient (SP) | 1,600 | 30 |
| `epa` | Entrustable Professional Activities | 260 | 23 |
| `remediation` | Remediation | 20 | - |
| `virtual-patient-simulation` | Virtual Patient Simulation | 170 | 17 |
| `cbme` | Competency-Based Medical Education | - | - |
| `milestones` | Milestones (ACGME) | 110 | 31 |
| `clinical-reasoning` | Clinical Reasoning | - | - |
| `deliberate-practice` | Deliberate Practice | - | - |
| `ccc` | Clinical Competency Committee | - | - |
| `dio` | Designated Institutional Official | - | - |
| `gme` | Graduate Medical Education | - | - |

## New terms, ranked by opportunity

### Tier 1: highest value

| slug | term | US vol | KD | note |
|---|---|---|---|---|
| `chse` | Certified Healthcare Simulation Educator (CHSE) | 22,200 | **9** | Biggest low-difficulty term in the niche. healthysimulation.com holds only #6. Fold the 880-volume long-form phrase into this one page via `abbreviation`. |
| `manikin` | Manikin | 14,800 | 26 | Audience match, product mismatch. Keep it purely definitional, do not pitch. |
| `aspe` | Association of Standardized Patient Educators | 6,600 | 43 | Our exact buyer. |
| `debriefing` | Debriefing | 5,400 | 28 | Core simulation concept, no page today. |
| `sim-lab` | Simulation Lab | 2,900 | 24 | Also captures "simulation lab" (1,300) and "sims lab" (590). |
| `interprofessional-education` | Interprofessional Education (IPE) | 2,900 | 38 | Links naturally to longitudinal curriculum. |
| `moulage` | Moulage | 2,400 | 36 | SP-program adjacent. |
| `teach-back-method` | Teach-Back Method | 1,900 | 32 | Needs verified AHRQ sourcing, checked against the real toolkit. |

### Tier 2: low difficulty, fast wins

| slug | term | US vol | KD |
|---|---|---|---|
| `task-trainer` | Task Trainer | 40 | **3** |
| `plus-delta-debriefing` | Plus/Delta Debriefing | 110 | **10** |
| `ask-tell-ask` | Ask-Tell-Ask | 140 | 13 |
| `prebriefing` | Prebriefing | 110 | 15 |
| `millers-pyramid` | Miller's Pyramid | 170 | 20 |
| `high-stakes-conversations` | High-Stakes Conversations | 140 | 21 |
| `goals-of-care` | Goals of Care | 260 | 22 |
| `dreyfus-model` | Dreyfus Model | 480 | 24 |
| `ai-standardized-patient` | AI Standardized Patient | 30 | **0** |

### Tier 3: remainder

`spikes-protocol` (210, KD 36 — name it protocol, not model; Baile et al. named it that),
`serious-illness-conversation-guide` (390, 28), `high-fidelity-simulation` (210, 31),
`master-adaptive-learner` (140, 30), `pearls-debriefing`, `in-situ-simulation`,
`psychological-safety-in-simulation`, `simulation-fidelity`, `hybrid-simulation`,
`embedded-participant`, `standardized-patient-case`.

### Deprioritized

`kirkpatrick-model` (4,400 but KD 63), `shared-decision-making` (2,900, KD 46),
`motivational-interviewing` (14,800, KD 69). Volume is real, difficulty is not worth it yet at
Authority Score 2.

## Accuracy notes

- Definitions stay inside what ACGME, AAMC, SSH, and ASPE actually publish. Populate `source`
  when citing a standard or body, and deliberately leave it empty for plain definitional content.
  Never invent one.
- No new statistics. If a term seems to need a figure, it probably does not.
- **`osce`** currently has no `source` field, and `osce-case-design-guide` carries zero
  references, so the site's OSCE definitional claim is uncited anywhere. Harden 1975 (BMJ) is the
  canonical paper, but a human must verify the citation rather than writing it from memory.
- **`chse`** describes a real SSH certification with real eligibility requirements. Those are easy
  to get subtly wrong and are exactly the kind of claim a program director would notice. Check the
  current SSH page rather than relying on recall.
