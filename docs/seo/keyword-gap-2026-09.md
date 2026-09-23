# Competitor keyword gap, September 2026

**Date:** 2026-09-23
**Follows:** `docs/seo/keyword-gap-2026-08.md`. That doc covered the glossary head terms, AIDET, HCAHPS, rapport, and category terms. This one is limited to what named competitors rank for and clinicalsim.ai does not.

## Method

- **Report:** Semrush `domain_domains` (Keyword Gap), database `us`, organic, sorted by volume descending, 100 rows per call.
- **Call 1:** simconverse.com, oxfordmedicalsimulation.com, bodyinteract.com, vitaltalk.org (union) minus clinicalsim.ai. Top 100 rows, volume 12,100 down to 210. 8,000 API units.
- **Call 2:** healthysimulation.com, virti.com, mursion.com (union) minus clinicalsim.ai. Top 100 rows, volume 74,000 down to 1,300. 7,750 API units.
- **Filters, applied by hand to the returned rows:** KD 35 or lower, volume 20 or more, at least one competitor in positions 1 to 20. clinicalsim.ai showed position 0 (not in the top 100) on every returned row, so every row counts as a gap.
- **Also dropped by hand:** third-party product and login terms (Trajecsys, TrueLearn, SimCapture, LearningSpace, vSim, EHR Go, DocuCare, SafeMedicate, Shadow Health, VALT), nursing physical-exam terms (head to toe assessment, physical assessment, nursing priorities), VR hardware terms (VR sickness, motion sickness), job and student queries, and the `high acuity` cluster (about 6,000 a month across five variants, KD 17 to 19, OMS positions 12 to 16), which is ICU vocabulary rather than communication training.

### Errors

- `display_filter` failed on every attempt with `validation_failed`: "parameter 'field' must be one of: backlinks_bucket_0 ... backlinks_bucket_5". The MCP validates `domain_domains` filters against the wrong field list. That is why KD and volume were filtered by hand and why each call covers only the top 100 rows by volume.
- `display_offset: 100` with `display_limit: 100` failed: "Invalid display_offset parameter, must be ... less than display_limit".
- The retry for rows 101 to 200 of call 1 failed: "API UNITS BALANCE IS ZERO". Units ran out after the two calls above, so no keyword-level checks and no second page were possible. Call 1 below volume 210 and call 2 below volume 1,300 were never seen.

## Map to existing page

Positions are the competitor's organic position. HS is healthysimulation.com, BI is bodyinteract.com, OMS is oxfordmedicalsimulation.com, VT is vitaltalk.org.

| Keyword | Vol | KD | Competitor + position | Our page | Suggested on-page change |
| --- | --- | --- | --- | --- | --- |
| chse | 22,200 | 15 | HS 6 | `/glossary/chse` | Put the acronym in the title. Current `metaTitle` is "Certified Healthcare Simulation Educator" with no "CHSE". Try "CHSE: Certified Healthcare Simulation Educator" and lead the description with "CHSE". |
| c h s e | 9,900 | 8 | HS 4 | `/glossary/chse` | Same change covers it. |
| manikins | 3,600 | 27 | HS 5 | `/glossary/manikin` | Use the plural once in the definition or explainer. |
| manikin vs mannequin | 2,900 | 18 | HS 12 | `/glossary/manikin` | Add a short "Manikin vs. mannequin" paragraph (spelling, and why simulation uses "manikin"). Only if the distinction can be sourced. |
| clinical judgement model | 1,900 | 28 | BI 18 | `/glossary/clinical-judgment-model` | Page uses only the US spelling. Add the "judgement" spelling once, for example "also spelled clinical judgement model". |
| clinical judgment model | 1,600 | 27 | BI 19 | `/glossary/clinical-judgment-model` | No `metaTitle` set. Add one that leads with "Clinical judgment model". |
| i s b a r | 1,600 | 35 | HS 4 | `/glossary/sbar` | Name ISBAR (Identify added) as a variant. KD is at the ceiling. |
| clinical judgement | 1,300 | 32 | BI 14 | `/glossary/clinical-judgment-model` | Covered by the spelling change above. |
| exam osce | 1,300 | 21 | HS 8 | `/glossary/osce` | Use "OSCE exam" in the description. Link to `/insights/osce-case-design-guide`. |
| hot wash | 1,300 | 26 | HS 8 | `/glossary/debriefing` | Add a paragraph on the hot wash (the immediate post-event debrief) as one form of debriefing. A standalone glossary entry is the fallback if it will not fit. |
| hotwash | 1,300 | 32 | HS 7 | `/glossary/debriefing` | Use the one-word spelling once. |
| clinical judgment | 720 | 25 | BI 17 | `/glossary/clinical-judgment-model` | Covered by the title change. |
| patient simulator | 590 | 21 | BI 1 | `/glossary/patient-simulator` | No `metaTitle` set. Add one that leads with "Patient simulator". |
| virtual human models for healthcare | 590 | 21 | BI 14 | `/glossary/virtual-patient-simulation` | Mention "virtual human" as a term buyers use for the same category. |
| medical simulation | 480 | 27 | OMS 15, BI 2 | `/insights/healthcare-simulation-technology-trends` | Post is a method selection guide. Use "medical simulation" in the H1 area or description. |
| vr medical training | 390 | 35 | OMS 15 | `/insights/healthcare-simulation-technology-trends` | Covers VR as a method option only if the post already compares it. Check before editing. |
| how to tell if someone is dying | 390 | 5 | VT 12 | `/insights/end-of-life-care-communication` | Weak intent match: the searcher is usually a family member. See the proposed page below instead of forcing it here. |
| clinical judgment in nursing | 320 | 27 | BI 16 | `/glossary/clinical-judgment-model` | Page already covers nursing. No change beyond the title. |
| virtual patient | 320 | 35 | BI 2 | `/glossary/virtual-patient-simulation` | Use the bare term in the first sentence. |
| clinical judgment nursing | 260 | 22 | BI 14 | `/glossary/clinical-judgment-model` | Covered. |
| healthcare simulation | 260 | 29 | BI 19 | `/insights/healthcare-simulation-technology-trends` | Use the phrase in the description. |
| virtual patient simulation | 260 | 18 | BI 2, OMS 42 | `/glossary/virtual-patient-simulation` | In the August doc. Still unranked. No new change. |
| clinical judgement nursing | 210 | 23 | BI 16 | `/glossary/clinical-judgment-model` | Covered by the spelling change. |
| medical simulator | 210 | 29 | BI 2, OMS 20 | `/glossary/patient-simulator` | Use "medical simulator" once as a synonym. |
| nurse simulator | 210 | 22 | BI 2 | `/glossary/patient-simulator` | The page already cites the NCSBN nursing study. Use "nurse simulator" once. |
| nurse statements | 210 | 15 | VT 1 | `/frameworks` | The NURSE framework is on this page with no anchor of its own. Add an `id` for NURSE and use "NURSE statements" in its copy. |

**Also in these results, already covered by the August doc and still unranked:** manikin (14,800, KD 25, HS 8), sim lab (2,900, KD 35, HS 4), objective structured clinical examination (1,600, KD 29, HS 6). Two August targets now sit above the KD 35 cutoff in this pull: debriefing (5,400, KD 42, HS 4) and moulage (2,400, KD 47, HS 2). August listed them at KD 28 and 36.

## Proposed new pages

Proposals only. Nothing has been created.

| Title | Slug | Target keyword | Vol | KD | Competitor + position |
| --- | --- | --- | --- | --- | --- |
| TeamSTEPPS | `/glossary/teamstepps` | team stepps | 1,900 | 31 | HS 9 |
| Talking with a family when death is near | `/insights/talking-with-families-when-death-is-near` | how to tell if someone is dying | 390 | 5 | VT 12 |

- TeamSTEPPS is mentioned on the SBAR entry, `/frameworks`, `/faq`, and `/methodology` but has no page of its own. The one-word `teamstepps` (2,400, KD 37) is just over the cutoff and would be served by the same page.
- The end-of-life post only works with a clinician author and real sources, and it should be written for clinicians who have that conversation. Skip it if nobody on the team will put their name on it.

## Competitor brand terms

For comparison pages, not content. The site's editorial position is category comparisons without naming vendors (see the August doc), so these are demand signals only.

- mursion: 1,900, KD 26 (mursion.com 1, virti.com 9)
- oxford medical simulation: 880, KD 37 (OMS 1)
- oms software: 880, KD 36 (OMS 6)
- body interact: 480, KD 45 (BI 1)
- vital tips: 480, KD 20 (VT 4)
- simconverse: 390, KD 27 (simconverse.com 1)
- vital talk: 320, KD 17 (VT 1)
- oxford medical: 320, KD 55 (OMS 1)
- oxford virtual: 260, KD 22 (OMS 31)
- bodyswaps: 1,900, KD 51 (HS 19)

## What this doesn't tell us

- **Only the top 100 rows per call.** Rows are sorted by volume, so long-tail communication terms below 210 (call 1) and 1,300 (call 2) were never returned. Units ran out before a second page. A rerun with working filters, or with `keyword contains` on communication terms, is the next pull.
- **Healthysimulation.com dominates call 2.** It is a publisher, not a vendor, and most of its rows are product names and nursing school tools. It crowds virti.com and mursion.com out of the top 100.
- **simconverse.com and virti.com barely register.** Only brand and login terms appeared for simconverse.com. virti.com showed up on a handful of rows (mursion, attensi, hyperbound) all above KD 35 or off-topic.
- **KD is a ceiling estimate, not a promise.** At Authority Score 2 the August finding stands: KD in the 30s is a stretch, and on-page changes alone may not move rankings until authority improves.
- **Volume is US only** and Semrush's estimate. Some rows are clearly misattributed (for example `synonyms for respecting`, 12,100, where vitaltalk.org ranks 66).
