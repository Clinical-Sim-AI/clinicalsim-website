# PR #28 verification request

Please verify four unresolved review comments for ClinicalSim website PR #28. Search the internal materials you can access, including project documents, meeting notes, Slack, email, source PDFs, pricing materials, and content approvals. Use public sources only when they are primary sources from the organization responsible for the claim.

This is a fact and approval check. Do not edit the repository, fill gaps with reasonable assumptions, or treat the current website and PR copy as proof. If you cannot find adequate support, say "not verified" and recommend the safer removal or restoration described below.

## Required response format

Return one table with these columns:

| Item | Verdict | Evidence | Exact approved fact, wording, date, or CTA | Safe PR action |
| --- | --- | --- | --- | --- |

Use one of these verdicts for each item: `verified`, `not verified`, or `ambiguous`.

For every source, include:

- Document, message, page, or recording title
- Owner, sender, or publisher
- Date
- Direct link or exact file path
- A short exact excerpt that supports the conclusion

After the table, include a source ledger and a short list titled `Still needs a human decision`. Do not blend separate studies, prices, programs, or approvals because their names look similar.

## 1. PACE pricing and comparison claims

The branch currently publishes these claims:

- `lib/audiences.ts`: "Costs less than a single PACE assessment"
- `lib/audiences.ts`: "External remediation referrals to PACE cost $15,000-$19,000 per learner."
- `lib/audiences.ts`: `$15K-$19K`, labeled as the cost of a PACE assessment or external remediation assessment
- `app/(marketing)/audiences/dios-gme-leadership/page.tsx`: `$15K-$19K per referral` in metadata, plus shorter "costs less than" comparisons in Open Graph and Twitter descriptions
- `app/(marketing)/insights/breaking-bad-news-practice-not-knowledge/page.mdx`: "The PACE assessment ... runs $16,000-$19,000 per learner (PACE Program documentation)."

Please answer all of the following:

1. Is there a current, authoritative source from UC San Diego PACE that supports either `$15,000-$19,000` or `$16,000-$19,000`?
2. What exact service does each amount cover: an assessment, an evaluation, a course, remediation, travel, lodging, follow-up, or a package of services?
3. What dates were the amounts valid, and are they still current?
4. Why do two different lower bounds appear in the site copy?
5. Is "per learner," "per referral," or another unit the source's actual unit?
6. Is there an approved internal basis for saying a ClinicalSim institutional license "costs less than a single PACE assessment"? This comparison needs both a current ClinicalSim price and comparable scope. If the ClinicalSim amount is confidential, report whether the comparison is approved and supportable without copying the confidential number into the response.
7. Is "PACE at UC San Diego" precise enough for public attribution, or is a fuller program name and source link required?

Evidence standard: a current UC San Diego PACE pricing page, official PDF, written quote, invoice, or direct written confirmation from the program. A sales deck, old website draft, search snippet, or ClinicalSim page that repeats the claim is not independent support.

If the amount, scope, date, and comparison cannot all be verified, recommend removing every PACE dollar amount and every "costs less than" claim listed above. A factual, non-price description of PACE may remain if its scope is supported.

## 2. Lauren Rissman's founding story

The post is:

`app/(marketing)/insights/eol-communication-training-measurement-gap/page.mdx`

The PR changed this sentence:

> It made me stop thinking about end-of-life communication as a soft skill...

to:

> It made me stop thinking about end-of-life communication as a secondary skill...

The PR also changed punctuation throughout the post. Repository instructions say not to revise this founding story until Ben and Lauren confirm the sequence and wording, and that the post, registry description, and `dateModified` must be updated together after confirmation.

Please verify:

1. Did Lauren explicitly approve `secondary skill`, or did she approve `soft skill`?
2. Did both Lauren and Ben explicitly approve the full revised opening and the sequence of events: NICU parent, ICU survivor, and critical care fellow?
3. Did both approve the broader edited version of the post, including the punctuation rewrites, or only a specific phrase?
4. Is there a transcript, recording, email, Slack message, or document containing the exact approved wording?
5. If a revised story was approved, what exact post copy, registry description, and modification date were approved?

For this item, publication of an older draft is not approval for a new revision. Approval must be attributable to both Ben Conway and Lauren Rissman. If evidence from both people is missing, recommend restoring the entire post to the `main` branch version, not only changing `secondary skill` back to `soft skill`.

## 3. Material change dates for audience pages

PR #28 materially edits these audience records but leaves them without `lastUpdated` in `lib/audiences.ts`:

- `dios-gme-leadership`
- `clinical-competency-committees`
- `faculty-clinician-educators`

Other audience records edited by the same PR use `lastUpdated: "2026-08-07"`. The shared home and research page dates also use `2026-08-07`, while the PR commit was created on August 8, 2026.

Please determine the real material change date that should be published for each of the three records. Check the audit work, content change history, and any release or publishing notes. Do not use the build date. If August 7, 2026 is the intended shared content date, say so explicitly and cite the supporting record. If no separate record exists, flag this as a maintainer decision rather than inventing a date.

The implementation must ultimately add `lastUpdated` to all three records so the visible page recency, WebPage schema, and sitemap agree.

## 4. Homepage evidence CTA

The homepage hero panel now says:

- "Scoring evidence: Traceable to the transcript"
- "Framework alignment: Named on every case"
- "Faculty can review the cited transcript evidence behind each score and see which published framework the case uses."

The adjacent button still says `See the evidence` and links to `/research`. PR #28 removed the pilot findings panel from `/research`, so that destination now centers on research collaboration and conference presentations.

Please check the current homepage strategy, audit notes, approved navigation plan, and any conversion or content guidance. Identify the intended destination and exact approved label for this CTA.

Evaluate these options against the panel's promise:

- `/methodology`, with a label such as `Review the methodology` or `See how scoring works`
- `/examples`, with a label such as `See an example`
- `/research`, only if the label changes to describe the research page accurately

Do not choose based only on preference. Cite the document or decision that establishes the intended user journey. If no approved direction exists, mark it as a human decision and state which option best matches the current panel copy, with a brief reason.

## Final checks

Before returning the report:

- Confirm that every PACE occurrence listed above has a disposition.
- Confirm that the founding-story verdict requires evidence from both Ben and Lauren.
- Give an explicit date or an explicit `human decision required` result for all three audience records.
- Give one exact CTA destination and label, or state that no approved decision was found.
- Separate facts from recommendations.
- Do not create citations, prices, approvals, or dates that were not found in a source.
