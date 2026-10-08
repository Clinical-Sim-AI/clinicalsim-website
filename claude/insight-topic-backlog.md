# Insight publication record

The scheduled task's full backlog wasn't available in this checkout. This file records the post published here; it doesn't replace the cloud backlog or change the status of other drafts.

## Shipped

| Backlog row | Published | Post | Byline | Content commit |
| --- | --- | --- | --- | --- |
| 8 | 2026-09-22 | [When a simulation vendor shuts down, the program keeps the obligation](https://clinicalsim.ai/insights/simulation-vendor-shutdown-program-obligations) | Ben Conway | `f9a51c0` |
| 10 | 2026-10-05 | [What an OSCE score predicts, and what it doesn't](https://clinicalsim.ai/insights/what-an-osce-score-predicts) | Gillian Brennan, **proposed, not yet approved** | working tree only, uncommitted |

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


## Run of 2026-10-05, backlog row 10

Written by the scheduled weekly run, which reached the repo for the first time. Both folders are now granted to the task: Claude-Workspace and `/Users/benconway/Github/clinicalsim-website`.

### Files changed

- `app/(marketing)/insights/what-an-osce-score-predicts/page.mdx`, new.
- `lib/posts.ts`, one entry added plus the slug added to the `PostSlug` union.
- No edit to `app/sitemap.ts` or `app/llms.txt/route.ts`, because both derive insight entries from `getAllPosts()`. The cloud playbook and the skill both still say to hand-edit them. They are wrong for insight posts.

### Repo checks

- No existing insight answers what an OSCE score predicts about later practice. `osce-case-design-guide` covers how to build a station, a different reader decision, and the new post links to it.
- `gillian-brennan` matches `lib/authors.ts`. Her approval is NOT in hand. See below.
- Rendered title is "What an OSCE score predicts | ClinicalSim.ai", 44 characters, inside the 60 character limit `lib/page-titles.test.ts` enforces for insight posts.
- Tags reuse existing conventions: OSCE, assessment, communication-assessment, milestones, medical-education, residency.
- Canonical is the apex host. No www anywhere in the generated sitemap or `/llms.txt`.

### Byline, unapproved

`authorId: "gillian-brennan"` is set with a comment above it marking it proposed. Do not publish until she says yes in words. Either get the yes, or delete `authorId` and the `author` line so the post renders as ClinicalSim Team.

### Verification

`eslint .` and `tsc --noEmit` both pass, run from `node_modules/.bin` inside the repo.

`vitest run` and `next build` did not run. `device_bash` executes in a Linux VM with the folder mounted, while `node_modules` was installed on macOS arm64, so the rolldown native binding fails to load. Nothing was installed. Run both on the Mac before shipping.

The two tests that matter were checked directly against the real registry code instead, by loading `lib/posts.ts`, `app/sitemap.ts`, and `app/llms.txt/route.ts` through jiti: 14 posts, zero title length failures, 109 sitemap URLs, zero missing from `/llms.txt`.

### Found while here

`lib/posts.ts` line 131 carries an em dash in the `eol-communication-training-measurement-gap` description. It breaks the zero dash rule in published copy. It was left alone because that post sits behind an evidence guardrail in `CLAUDE.md` that holds its registry description until Ben and Lauren confirm the wording.
