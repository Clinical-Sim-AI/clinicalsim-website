# Insight publication record

The scheduled task's full backlog wasn't available in this checkout. This file records the post published here; it doesn't replace the cloud backlog or change the status of other drafts.

## Shipped

| Backlog row | Published | Post | Byline | Content commit |
| --- | --- | --- | --- | --- |
| 8 | 2026-09-22 | [When a simulation vendor shuts down, the program keeps the obligation](https://clinicalsim.ai/insights/simulation-vendor-shutdown-program-obligations) | Ben Conway | `f9a51c0` |

## Repo checks

- No existing insight answers what happened to Kognito or how a program should preserve assessment records when a vendor closes. `healthcare-simulation-technology-trends` covers choosing simulation methods, a different reader decision.
- `ben-conway` matches the author registry. Ben authorized publication under his byline.
- Existing tags used: `simulation`, `assessment`, `ACGME`, and `medical education`. The Insights page uses neutral gray badges for the first two, navy for ACGME, and Cloud for education.
- The sitemap and `/llms.txt` generate insight entries from `lib/posts.ts`; no manual URL entries were needed.
- No matches for `II.A.4`, `V.A.1.d`, or `V.A.3.b` were found in repo source. The six cloud drafts weren't available for inspection.
- `why-standardized-patient-programs-run-out-of-capacity` is already registered and published with a September 3, 2026 date. Check it before importing the similarly named capacity draft from the cloud backlog.

## Editorial review

Applied the supplied humanizer skill before publication. The installed skill matched `/Users/benconway/Downloads/humanizer.skill` byte for byte.

- Removed the Kent State paragraph: a 2022 availability date doesn't establish what happened after the 2023 shutdown announcement.
- Replaced the unsupported assertion that no vendor-records safeguard exists with the narrower scope of FSMB's current closed-program records service.
- Distinguished Kognito's product closure from any claim that residency records were lost, and separated practice transcripts from records the institution decides it must retain.
- Confirmed the Coleman citation and abstract at Wiley. Kept the trial's existence without adding outcome claims.
- Checked the cited requirements against ACGME's July 1, 2026 edition. Used September 22 as the publication date, not the draft date.
- Kept ClinicalSim export, retention, escrow, and handover terms as questions for the institution's agreement, without making product promises.

## Verification

Local lint, typecheck, all 170 tests, and the production build passed. GitHub's quality checks and Vercel's production deployment passed for `f9a51c0`.

Verified the live article in Chrome, including the byline and takeaway layout. The article, Insights index, sitemap, `/llms.txt`, and all three internal destinations returned HTTP 200. Live metadata identifies Ben Conway, the apex canonical URL, and September 22, 2026 as the publication date.
