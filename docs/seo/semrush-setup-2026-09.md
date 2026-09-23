# Semrush setup record, September 2026

Pulled and written 2026-09-23. Ben pays for Semrush as of September 2026. This file records what is configured, what still has to be done in the Semrush web UI, and how the repo docs relate to it.

## IDs

- Project: `30880361` (clinicalsim.ai). Tools enabled: Position Tracking, Site Audit, SEO Ideas, GAT.
- Position Tracking campaign: `30880361_5324700`.
- Site Audit snapshots: `6ab2e066e6150aecc0b47440` (2026-09-23), `6a84858a4a99202c4e3c4ee1` (2026-08-18).
- GA4 property: `552800445`.

## The API cannot configure anything

The Semrush MCP is read-only for project setup. Keywords, competitors, location, device, and audit limits can only be changed in the UI. Everything below under "UI checklist" is Ben's to do. The API can read the results afterward.

## State on 2026-09-23 (before UI changes)

- Tracking campaign held 4 keywords. The August load (`position-tracking-keywords-2026-08.txt`) was never pasted in. Location was not national (a 140-volume keyword read as 30). "ai simulation" was still tracked. No competitors configured.
- Domain: Authority Score 2, 127 referring domains (40 in August), 9 organic keywords, 1 in the top 30, zero estimated traffic. "clinical simulation" 64 to 71 over 7 days; "ai clinical simulation" at 33.
- Site Audit: 100 of 100 page crawl limit hit (sitemap has 107). 2 errors, 101 warnings, 5 notices. Breakdown and what was done is below.

## UI checklist (Ben)

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
