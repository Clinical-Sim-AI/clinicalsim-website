# Semrush SEO Ideas triage, 2026-09-23

Semrush's SEO Ideas report gave 16 suggestions across `/`, `/about`, and `app.clinicalsim.ai`. This
records what we did and what we rejected, so rejected ideas don't resurface in the next export.

## Done

- **Homepage related words.** Added "healthcare simulation", "medical simulation", and "simulation
  training" to the buyer copy in `lib/homepage-content.ts`, locked by `lib/homepage-content.test.ts`.
  "medical simulation" (480/mo, KD 27) and "healthcare simulation" (260/mo, KD 29) pass the KD 35
  filter in `keyword-gap-2026-09.md`, which assigns both to
  `/insights/healthcare-simulation-technology-trends`. The homepage uses them only as related words,
  not targets, so the insight post stays the page that owns them. This also covers the low word count
  idea without padding.
- **Backlink domains.** Filtered into `backlink-prospects-2026-09.md` under "Semrush SEO Ideas,
  2026-09-23".

## Legacy app

- **app.clinicalsim.ai** was a live legacy deploy (Vercel project `clinical-sim-app`) serving
  `index, follow`, titled "Clinical Simulation | Medical Training AI", and linking to
  `www.clinicalsim.ai`. Semrush suggested linking to it. Ben said on 2026-09-23 that a few people
  still use it, so it stays up but is blocked from search: `noindex, nofollow` in the root metadata,
  an `X-Robots-Tag` header on every response, and `robots.txt` left open so crawlers can see the
  noindex. Its links now point at the apex, and its footer Terms link, which pointed at a
  `clinicalsim.ai/terms` page that doesn't exist, now goes to the app's own `/terms-of-service`.

## Rejected

- **"medical sim" in the homepage title and H1.** 170/mo at KD 45 (`keyword-visibility-plan-2026-08.md`;
  KD 55 in the September tracking list), above the AS 2 ceiling either way, and flagged as
  brand-adjacent noise in `keyword-gap-2026-08.md`. The title and H1 target "clinical simulation" on
  purpose, and the test locks it.
- **"full code" as a related word.** Full Code is a competitor brand.
- **AggregateRating via SoftwareApplication (homepage) or Course (/about).** We have no real ratings.
  Marking up invented ones breaks Google's review snippet policy and our own no-fabrication rule, and
  `lib/homepage-content.test.ts` forbids the schema.
- **Retitling /about for "speech pathology clinical simulations"** (H1, title, related words, word
  count). ClinicalSim has no speech-language pathology product or audience, so the page would misstate
  the company. It is also the page-per-query pattern CLAUDE.md warns against.
