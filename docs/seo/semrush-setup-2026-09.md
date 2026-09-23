# Semrush setup record, September 2026

Pulled and written 2026-09-23. Ben pays for Semrush as of September 2026. This file records what is configured, what still has to be done in the Semrush web UI, and how the repo docs relate to it.

## IDs

Current, as configured in the UI on 2026-09-23:

| Project | Name | Campaign | Engine and scope | Loaded |
|---|---|---|---|---|
| `30880361` | clinicalsim.ai | `30880361_5525437` | Google, desktop, United States, English | 111 keywords, 13 competitors |
| `31333711` | clinicalsim.ai (mobile) | `31333711_5525574` | Google, mobile, United States, English | 111 keywords, 13 competitors |
| `31333116` | clinicalsim.ai (ChatGPT prompts) | `31333116_5525470` | ChatGPT, United States, English | 13 prompts, 13 competitors |
| `31333734` | clinicalsim.ai (AI Mode prompts) | `31333734_5525597` | Google AI Mode, United States, English | 13 prompts |
| `31333761` | clinicalsim.ai (Gemini prompts) | `31333761_5525603` | Gemini, United States, English | 13 prompts |

- Project `30880361` also holds Site Audit, Backlink Audit, and the Google connection (GA4 account and property "ClinicalSim", Search Console property `sc-domain:clinicalsim.ai`). GA4 property: `552800445`.
- Retired: campaign `30880361_5324700`. It tracked United Arab Emirates, Google, Arabic. It was replaced on 2026-09-23 and its history is gone.
- Site Audit snapshots: `6ab2e066e6150aecc0b47440` (2026-09-23), `6a84858a4a99202c4e3c4ee1` (2026-08-18).

## Plan limits that shaped the setup

Read from Subscription info on 2026-09-23.

- One tracking target per project. A Prompt Tracking campaign counts as a target. So each engine and device needs its own project, which is why there are five projects for one domain.
- Five projects ("Website monitoring"). All five are in use.
- 500 Position Tracking keywords: 222 used (111 on desktop, 111 on mobile).
- 50 prompts, shared across all prompt campaigns: 39 used (13 on each of three engines). 11 remain.
- JavaScript rendering in Site Audit needs Pro+ or Advanced. It is off.
- The Link Building Tool is not available on this account. `/link_building/` and the tool search both redirect to Backlink Analytics. Prospects stay in `backlink-prospects-2026-09.md`.
- Claude is not a Prompt Tracking engine. The options are ChatGPT, Gemini, and Google AI Mode.

## The API cannot configure anything

The Semrush MCP is read-only for project setup. Keywords, competitors, location, device, and audit limits can only be changed in the UI. Everything below under "UI checklist" is Ben's to do. The API can read the results afterward.

## State on 2026-09-23 (before UI changes)

- Tracking campaign held 4 keywords. The August load (`position-tracking-keywords-2026-08.txt`) was never pasted in. Location was United Arab Emirates, Google, Arabic, which is why a 140-volume keyword read as 30. "ai simulation" was still tracked. No competitors configured.
- Domain: Authority Score 2, 127 referring domains (40 in August), 9 organic keywords, 1 in the top 30, zero estimated traffic. "clinical simulation" 64 to 71 over 7 days; "ai clinical simulation" at 33.
- Site Audit: 100 of 100 page crawl limit hit (sitemap has 107). 2 errors, 101 warnings, 5 notices. Breakdown and what was done is below.

## What was configured on 2026-09-23

1. **Position Tracking, desktop and mobile.** The UAE target was replaced with United States, Google, English. Mobile got a new project with the same settings. Both hold the same 111 keywords: tiers 1 to 7 from `position-tracking-keywords-2026-09.txt`, plus tiers 8 and 9 below. Semrush stores tags in lowercase (`t1-toehold` and so on). "ai simulation" was removed and then added back under tier 9 at Ben's request. "ai clinical simulation" was already tracked and now carries the tier 9 tag.
2. **Competitors, 13 on every campaign**: the 12 below plus `simchat.ai` (added at Ben's request). `simconverse.com` was already on the list.
3. **Prompt Tracking.** ChatGPT, Google AI Mode, and Gemini each track the same 13 prompts, tagged `p-program-directors`, `p-sim-centers`, `p-remediation`, `p-hospitals`, `p-comparisons`, and `p-brand`. The ChatGPT campaign's brand name is "ClinicalSim".
4. **Site Audit.** Limit 500 pages, weekly on Monday, recrawl started. JS rendering is blocked by the plan.
5. **Backlink Audit.** Root domain scope. Brand names: clinicalsim.ai, clinicalsim, clinical sim. Categories: Health, Jobs & Education, Science, Computers & Electronics. Target country: United States.
6. **Google services.** Connected on project `30880361` through ben@clinicalsim.ai. GA4 account, property, and data stream are all named "ClinicalSim". The UI does not show the property number, so check that it is `552800445`.

### Tier 8, gap retarget (tag `t8-gap-retarget`, 8 keywords)

From `keyword-gap-2026-09.md`: chse, c h s e, manikin, manikins, manikin vs mannequin, clinical judgement model, exam osce, hot wash.

### Tier 9, AI and voice category (tag `t9-ai-voice`, 14 keywords)

Added at Ben's request. No volume or KD was pulled for these: ai simulation, voice simulation, ai voice simulation, voice ai simulation, ai clinical simulation, ai patient simulation, ai medical simulation, ai healthcare simulation, ai simulated patient, ai patient, voice based simulation, conversational ai simulation, ai simulation training, ai role play.

### Prompts not yet loaded

Eight prompts from Ben's list were cut off when he pasted them and still need the full text. With 11 prompt slots left, they won't fit on all three engines (8 x 3 = 24). The options are to cut prompts, drop an engine, or buy more prompts.

### Still open

- Brand name "ClinicalSim" and the 13 competitors on the AI Mode and Gemini campaigns, once their first data pull finishes.
- Search Console connection inside Backlink Audit, if it does not pick up the project-level connection.

## Original UI checklist (for reference)

1. **Position Tracking > Settings**
   - Location: United States, national. Device: desktop. If the plan allows, duplicate the campaign for mobile.
   - Delete "ai simulation".
   - Paste `position-tracking-keywords-2026-09.txt` one tier at a time and apply the tier's tag (the tag is on each tier's header line).
   - Competitors, in this order (SERP rivals first, because they are what actually sits above us):
     - SERP and content: `healthysimulation.com`, `vitaltalk.org`, `osmosis.org`
     - Comparable product: `simconverse.com`, `oxfordmedicalsimulation.com`
     - Virtual patients: `bodyinteract.com`, `shadowhealth.com`, `i-human.com`
     - Workforce role play: `mursion.com`, `virti.com` (not virtihealth.com)
     - Sim center: `laerdal.com`, `elevatehealth.net` (LearningSpace)
     - Leave out Elsevier, Wolters Kluwer, Kaplan, AMBOSS, Abridge, and MedHub root domains. Their unrelated rankings swamp the visibility chart. vrClinicals lives on wolterskluwer.com, so it is excluded for the same reason.
2. **Site Audit > Settings:** crawl limit 500 pages, weekly schedule, JavaScript rendering on.
3. **Backlink Audit and Link Building Tool:** enable both on the project so prospects and outreach status live in Semrush. Seed Link Building with `backlink-prospects-2026-09.md`.
4. **Brand Monitoring / AI Visibility**, if on the plan: track "ClinicalSim" plus the competitor brand names above.
5. **Integrations:** connect Google Search Console and GA4 (`552800445`) to the project.

## Site Audit findings and what was done

| Issue | Count | Action |
|---|---|---|
| Duplicate meta descriptions (error) | 2 | Fixed. `/about` and `/faq` both used `POSITIONING_LONG`. Each now has its own description. |
| Pages with only one incoming internal link | 2 | Fixed. The SP capacity post is now related on the AI vs SP comparison and the simulation center directors audience page. The vendor shutdown post is now related on the program directors, DIO, and CCC audience pages. |
| H1 duplicates title | 16 | Left as is. Insight posts use the registry title for both `<title>` and `<h1>` by design (see CLAUDE.md). Google does not penalize this, and changing either is an editorial call. |
| Low text to HTML ratio | 85 | Ignored. Next.js markup overhead, not a content problem. |
| Content not optimized | 3 | Not acted on: `/solutions/remediation`, `/methodology`, one PICU consent example. Semrush flags these against target keywords it infers; revisit once the tracking campaign assigns real targets. |

Semrush reports `schemaOrg: 0` in its markup counts. The live pages do serve JSON-LD (8 blocks on `/about`, 6 on an insight post, checked with curl on 2026-09-23), so that count reflects microdata detection, not missing schema.

## Related docs

- `position-tracking-keywords-2026-09.txt`: the paste list for step 1.
- `keyword-gap-2026-09.md`: named-competitor keyword gap mapped to existing pages.
- `backlink-prospects-2026-09.md`: link prospects from the competitor backlink gap, plus an audit of our own referring domains.
- `oms-backlink-playbook.md`: strategy and scoreboard, with a September update.

## API units

The 2026-09-23 pulls spent roughly 45,000 API units and hit a zero balance (`ERROR 132 :: API UNITS BALANCE IS ZERO`). The backlink gap report costs about 40 units per row, and a 500-row pull costs 20,000. Keep gap pulls to 100 rows. Still blocked on units: the audit of our own referring domains (disavow candidates) and the exact linking pages for the top five prospects. The calls to run are listed in `backlink-prospects-2026-09.md`.

## Cadence

- Weekly: read `tracking_overview_organic`, visibility against competitors, and new or lost referring domains.
- Day 90 from the date the full keyword load goes in: if the KD 6 to 26 targets have not moved, the constraint is authority and effort shifts to backlinks (see the August keyword gap doc).
