# Semrush keyword gap and opportunity analysis

**Date:** 2026-08-18
**Database:** `us` (Semrush, live calls)
**Scope:** clinicalsim.ai against bodyinteract.com, oxfordmedicalsimulation.com, vitaltalk.org, healthysimulation.com, plus the persona, solution, glossary, comparison, and example page registries in `lib/`.

---

## 1. Baseline and the authority reality

clinicalsim.ai ranks for 12 organic keywords. None of them sits in the top 30, and all 12 are
brand-adjacent noise rather than demand: `medsim ai`, `studysim`, `cjsim`, `medical sim`.

| Domain | Authority Score | Referring domains |
| --- | --- | --- |
| healthysimulation.com | 38 | 2,537 |
| bodyinteract.com | 32 | 1,607 |
| oxfordmedicalsimulation.com | 31 | 901 |
| vitaltalk.org | 29 | 1,103 |
| **clinicalsim.ai** | **2** | **40** |

Two signals are genuinely encouraging. The site already triggers 3 AI Overview keywords and 10
People Also Ask keywords, which means the GEO work (llms.txt, JSON-LD, FAQ blocks, extractable
definition passages) is registering with generative systems before it registers with the
classic ranking algorithm.

**The constraint that governs everything below:** at Authority Score 2 with 40 referring
domains, nothing above roughly KD 35 is reachable this year no matter how good the page is.
That is not a content problem and no amount of writing fixes it. Every recommendation in this
report is filtered on KD, and the parallel track is named in section 8.

---

## 2. The glossary is the site's biggest latent asset, and it captures none of it

About 40,000 monthly US searches sit on terms that already have a live, indexable page at
`/glossary/<slug>`. This is the highest return per hour of work available to the site, because
the pages exist and the difficulty is low.

| Term | Volume | KD | Page |
| --- | --- | --- | --- |
| manikin | 14,800 | 26 | live |
| debriefing | 5,400 | 28 | live |
| sim lab | 2,900 | 24 | live |
| interprofessional education | 2,900 | 38 | live |
| moulage | 2,400 | 36 | live |
| teach back method | 1,900 | 32 | live |
| designated institutional official | 1,600 | 13 | live |
| objective structured clinical examination | 1,300 | 29 | live |
| deliberate practice | 1,300 | n/a | live |
| spikes protocol | 880 | 38 | live |
| clinical reasoning | 720 | 27 | live |
| sim center | 590 | n/a | live |
| dreyfus model of skill acquisition | 590 | 20 | live |
| acgme milestones | 390 | n/a | live |
| serious illness conversation guide | 390 | 28 | live |
| entrustable professional activities | 260 | n/a | live |
| certified healthcare simulation educator | 260 | 6 | live |
| miller's pyramid | 170 | n/a | live |
| ask-tell-ask | 140 | 13 | live |
| high-stakes conversations | 140 | 21 | live |
| master adaptive learner | 140 | n/a | live |
| pearls debriefing | 110 | 13 | live |
| plus-delta debriefing | 110 | 10 | live |
| prebriefing | 110 | 15 | live |

Three of these deserve special attention because volume and difficulty are both favorable:
`designated institutional official` (1,600 at KD 13), `certified healthcare simulation educator`
(260 at KD 6), and `sim lab` (2,900 at KD 24).

**What was wrong:** the pages existed but their `metaTitle` and `metaDescription` frequently led
with the framework or the governing body rather than with the term a person types. The DIO page
opened with "The DIO holds institutional authority...", which is the abbreviation rather than the
1,600-a-month query. The CHSE page never carried the spelled-out credential. The OSCE page never
carried the spelled-out phrase, which is the head query at 1,300.

**Done in this tranche:** meta pairs retargeted on `manikin`, `debriefing`, `sim-lab`, `moulage`,
`osce`, `chse`, and `dio`. Audited and left alone, because the term already led both fields:
`teach-back-method`, `interprofessional-education`, `clinical-reasoning`, `dreyfus-model`.

---

## 3. True content gaps, ranked by volume against difficulty

Real volume, no page at all before this tranche.

| Keyword | Volume | KD | Status |
| --- | --- | --- | --- |
| aidet | 6,600 | 26 | **new page** `/glossary/aidet` |
| bedside manner | 6,600 | 38 | **new page** `/glossary/bedside-manner` |
| hcahps | 5,400 | 34 | **new page** `/glossary/hcahps` |
| building rapport | 4,400 | 21 | **new post** `/insights/building-rapport-clinical-encounter` |
| build rapport | 3,600 | 24 | same post |
| motivational interviewing training | 3,600 | 31 | **new page** `/glossary/motivational-interviewing` |
| clinical judgment model | 1,900 | 28 | not covered; nursing-facing |
| hcahps nurse communication measures | 1,600 | **13** | **new FAQ** on the quality persona page |
| crico | 1,300 | 34 | not covered |
| how to build rapport | 880 | 39 | rapport post |
| sbar communication | 720 | 38 | **new page** `/glossary/sbar` |
| establishing rapport | 720 | n/a | rapport post |
| hcahps scores | 720 | n/a | quality persona FAQ |
| hcahps survey questions | 590 | n/a | new HCAHPS glossary page carries the exact items |
| communication coaching | 590 | 15 | not covered; CPC $6.66, commercial intent |
| empathic communication | 390 | 34 | partly served by the rapport post |
| conflict resolution in healthcare | 210 | 28 | not covered |
| improve hcahps scores | 140 | **9** | **new FAQ** on the quality persona page |

Notes on the two clusters that matter most.

**AIDET, 6,600 a month at KD 26, is the single largest gap the site had.** It was mentioned in
passing on `/faq` and `/methodology` and nowhere else. It is also strategically well placed,
because AIDET is the framework hospital quality teams already train, so the page is an entry
point into the quality and patient experience persona rather than a vocabulary page.

**The rapport cluster is roughly 11,000 a month across four variants at KD 21 to 39, and it is
currently answered by generic content.** harvardmedsim.org holds positions 2 through 7 on these
queries. Rapport is also a behavior ClinicalSim actually scores, so the page can say something
specific that a generic listicle cannot: the Kalamazoo element it belongs to, the Singh Ospina
finding that clinicians interrupt after a median of 11 seconds, and the four rubric items that
turn "builds rapport" into something a rater can defend.

**HCAHPS is a cluster, not a keyword.** The head term is KD 34 and probably out of reach this
year, but `hcahps nurse communication measures` at 1,600 and KD 13 and `improve hcahps scores`
at KD 9 are both winnable now, and both are answered by content the quality persona page was
already halfway to having.

---

## 4. Product category terms: small, winnable, and vendors do rank there

These are low volume, and the reason to chase them anyway is that they are bottom-of-funnel and
the competitive set is thin enough that a homepage can rank.

| Keyword | Volume | KD | Notes |
| --- | --- | --- | --- |
| ai in medical education | 210 | 30 | CPC $5.61 |
| virtual patient simulation | 170 | 17 | bodyinteract #2, fullcodemedical #3, medcases #5. Page exists. |
| healthcare simulation software | 140 | 33 | |
| standardized patient program | 140 | 24 | |
| osce practice | 140 | 22 | |
| competency tracking software | 90 | 6 | CPC $20.58, the highest commercial intent on this list |
| ai standardized patient | 30 | n/a | uncontested; page exists |

`competency tracking software` at KD 6 with a $20.58 CPC is worth a dedicated page in a later
tranche, aimed at the DIO and CCC personas rather than at program directors.

---

## 5. Competitor brand terms

| Brand term | Volume | KD |
| --- | --- | --- |
| shadow health | 8,100 | n/a |
| mursion | 1,900 | 25 |
| oxford medical simulation | 880 | n/a |
| kognito | 590 | n/a |
| body interact | 480 | n/a |
| bodyswaps | 390 | n/a |

The two existing `/compare` pages target categories rather than brands, which is the right
editorial position for a healthcare credibility brand and should not change. The way to reach
this demand without naming competitors is a category comparison that maps onto how buyers
already group the market.

**Done in this tranche:** `/compare/ai-patient-simulation-vs-avatar-role-play-platforms`, which
targets the mursion, bodyswaps, and kognito cluster (about 2,700 a month combined) at the
category level. It compares what each category was built for, who plays the other party,
where case content comes from, what performance is scored against, and what a program can put
in front of a CCC. It names no vendor and makes no claim about any specific product.

---

## 6. What not to chase

These findings matter as much as the opportunities, because each one saves a quarter of misplaced
effort.

**Remediation has almost no search demand.** `residency remediation` 30 a month, `gme
remediation` 0, `remediation in medical education` 20, `program director remediation` 0. The
remediation solution page, `lib/remediation.ts`, and the program directors persona are the
heaviest content investment on the site and they will never be an organic traffic channel. Keep
them, because they are the best sales enablement material we have and they are what an AI system
cites when someone asks about communication remediation. Stop measuring them on sessions.

**"Standardized patient" traffic is job seekers.** `standardized patient jobs` 1,600 and `full
time standardized patient actor jobs` 2,400 dwarf `standardized patient program` at 140. Ranking
for the unqualified term would bring applicants, not buyers.

**The ACGME cluster is navigational.** `acgme case log` 18,100 and `acgme login` 1,300 are people
trying to reach acgme.org. Only `acgme core competencies` (390) and `acgme common program
requirements` (390) are content queries worth targeting.

**Generic "communication training" is the wrong market.** The term is owned by corporate training,
OSHA hazard communication, and ABA functional communication training. Competing there means
competing with buyers who are not ours.

---

## 7. Ninety-day sequence

**Days 1 to 30, done in this tranche.** Six glossary entries covering about 25,000 monthly
searches the site had no page for (aidet, bedside-manner, hcahps, motivational-interviewing,
rapport, sbar). Seven glossary meta pairs retargeted onto their head query. Four HCAHPS FAQs on
the quality persona page, targeting the KD 13 and KD 9 variants. One insight post on the rapport
cluster. One category comparison page aimed at the avatar role-play cluster.

**Days 31 to 60.** Set up Semrush Position Tracking on the full target set before anything else,
so the next review measures movement instead of re-deriving the baseline. Then: a
`competency tracking software` page for the DIO and CCC personas (KD 6, CPC $20.58), a
`communication coaching` page (590 at KD 15), and a `conflict resolution in healthcare` page
(210 at KD 28) that connects to the needs-assessment finding that interprofessional conflict is
the most requested scenario type.

**Days 61 to 90.** Internal linking pass from the new glossary pages into the persona and
solution pages, since 46 term pages that only link to the hub waste the equity they accumulate.
Then reassess: if the KD 13 and KD 6 targets have not moved by day 90, the constraint is
authority, not content, and the budget should shift entirely to section 8.

---

## 8. The parallel track, which is the actual unlock

At Authority Score 2 with 40 referring domains, content quality is not the binding constraint.
Backlink acquisition is, and it is outreach work rather than site work, so it sits outside every
tranche above:

- healthysimulation.com coverage (AS 38, 2,537 referring domains, and the most relevant single
  domain in the category)
- IPSSW and IMSH presentation and abstract pages, which produce .org and .edu links as a
  byproduct of work the team is already doing
- research partner institutional pages at the pilot sites, which are .edu links tied to real
  collaborations rather than placements

None of the KD 30-plus targets in this report are realistically reachable until that number
moves. The KD 6 to 26 targets are, which is why this tranche was scoped to them.

---

## Appendix: figures used in the new pages, and their sources

Every number published in this tranche was verified against a primary source. Nothing was
extrapolated from an existing site figure.

| Claim | Source |
| --- | --- |
| AIDET is Acknowledge, Introduce, Duration, Explanation, Thank You; created by Studer Group; not a script | Studer Group AIDET framework material |
| AIDET plus simulation beat lecture on SEGUE (22 vs 18) and SP CARE (45 vs 43), both p < 0.001, 117 residents | Liang et al., Supportive Care in Cancer, 2025, doi 10.1007/s00520-025-09570-y |
| SBAR is Situation, Background, Assessment, Recommendation; developed by Leonard, Bonacum, and Graham at Kaiser Permanente of Colorado | IHI SBAR tool |
| Early hospital-wide SBAR implementation | Haig KM et al., Jt Comm J Qual Patient Saf, 2006 |
| Exact wording of the three nurse and three doctor HCAHPS communication items; new sub-measures reported from the October 2026 Care Compare refresh | CMS HCAHPS, Crosswalk of Updated HCAHPS Survey Questions into Publicly Reported Sub-Measures |
| NQF endorsed the CAHPS Hospital Survey in May 2005 | hcahpsonline.org |
| Agenda elicited in 40 of 112 encounters (36%); interrupted in 67% of those after a median of 11 seconds; uninterrupted patients finished in a median of 6 seconds | Singh Ospina N et al., J Gen Intern Med, 2019, doi 10.1007/s11606-018-4540-5 |
| Patient-clinician relationship effect on outcomes d = 0.11, p = 0.02, across 13 RCTs; authors' own aspirin comparison d = 0.06 | Kelley JM et al., PLoS ONE, 2014, doi 10.1371/journal.pone.0094207 |
| Three 60-minute empathy modules, 99 residents and fellows, patient-rated CARE difference 2.2, p = 0.04 | Riess H et al., J Gen Intern Med, 2012, doi 10.1007/s11606-012-2063-z |
| Building a relationship is the first of seven essential elements | Makoul G, Acad Med, 2001, doi 10.1097/00001888-200104000-00021 |
| MI definition, four processes, OARS | Miller WR and Rollnick S, Motivational Interviewing, 3rd ed, 2013 |

### One correction to existing site copy

The site published "doctor communication rose 0.8 points from 2007 to 2019" in five places. The
study window is **2008 to 2019**. Verified against the CMS HCAHPS project team bibliography:

> Beckett MK, Quigley D, Cohea CW, Lehrman WG, Russ C, Giordano LA, Goldstein E, Elliott MN.
> Trends in HCAHPS Survey Scores, 2008-2019: A Quality Improvement Perspective.
> *Medical Care.* 2024;62(6):416-422. doi:10.1097/MLR.0000000000002001

All five instances were corrected in `lib/audiences.ts` and `lib/glossary.ts`, and the correct
citation with its DOI is now in the rapport post's reference list. The 0.8 point figure itself is
unchanged and consistent with the published summary of that paper.
