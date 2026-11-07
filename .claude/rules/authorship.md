---
paths:
  - "lib/authors.ts"
  - "lib/posts.ts"
  - "lib/solutions.ts"
  - "lib/review-schema.ts"
  - "components/author-byline.tsx"
  - "components/article-layout.tsx"
  - "app/**/about/**"
---

# Authorship

## Assigning authors and reviewers

- `lib/authors.ts` is the only source of author IDs. Read it before writing an `authorId`; an unknown ID fails silently and renders as "ClinicalSim Team".
- `authorId` and `reviewedBy` state that a named person wrote or reviewed the page. Set either only with that person's confirmation, and never put a name on a page that carries unsourced or contested figures.
- `authorId`, `reviewedBy`, and `Author.sameAs` are wired through to the page and schema but mostly unused. Filling them is a confirmation task, not a code task. Add `sameAs` URLs only when verified.

## How bylines render

- A post with no `authorId`, or an unknown one, shows "ClinicalSim Team" with a Users icon and emits an `Organization` author.
- A matched author renders through `components/author-byline.tsx` with an initials avatar, name, and title, and emits a `Person` author.

## About page team section

- The team section is unpublished: `TEAM_SECTION_PUBLISHED = false` in `lib/authors.ts`, locked by `lib/about-page.test.ts`. `/about` renders no author cards and emits no Person JSON-LD.
- While the flag is false, `getAuthorPath()` and `getAuthorUrl()` return `undefined`, so Person nodes carry `name`, `jobTitle`, and `description` with no `@id` or `url`, and the "More about the team" link is hidden.
- Setting the flag to `true` restores the cards, the Person schema, and every author URL at once. Don't hand-write an `/about#<id>` reference, because no element carries that id while the section is hidden.

## Credential snapshot

Source: the pitch deck team slide, as of 2026-08-22. Use these lines, and reopen the team CVs (folder path in `CLAUDE.local.md`) only if a name or title looks stale or a new author is being added. The name and title at the start of each line is the ClinicalSim role already in `lib/authors.ts`; the rest is career history, not a second title. Don't invent a ClinicalSim title that isn't in `lib/authors.ts` or confirmed by Ben.

- **Ben Conway, CEO**: Second-time founder. Co-founded VNTANA, spent 14 years building it for customers including Johnson & Johnson and Pfizer, raising $18M+ along the way, and closed $8M+ in enterprise sales.
- **Lauren Rissman, MD, Chief Medical Officer**: Pediatric intensivist and palliative care physician at Advocate Health Care. Named author on SCCM's 2026 End-of-Life Care Guidelines. Sits on the editorial board of Pediatric Critical Care Medicine.
- **Will Meyer, CTO**: Co-founder of Troops, acquired by Salesforce. Spent two years architecting Salesforce AI infrastructure, including Slackbot.
- **Vinod Havalad, MD, Chief Clinical Partnerships Officer**: Pediatric critical care physician and Pediatric Critical Care Fellowship Director at Advocate Children's Hospital, leading physician education there since 2012. PI of a national pediatric critical care simulation curriculum.
- **Gillian Brennan, MB BCh BAO, VP of Clinical Research & Education**: Associate Professor of Pediatrics at the University of Chicago (since 2025), Neonatology Fellowship Program Director (since 2023), Associate Program Director for wellness in the Pediatrics Residency (since 2023), and Director of Neonatal Simulation (since 2016). Fourteen years supervising more than 500 clinicians. Verified against her May 2026 CV on 2026-10-08.
- **Jacqueline Ponczek, MD, VP of MedEd: Quality & Standards**: Pediatrician and simulation educator at Northwestern Feinberg and Lurie Children's, leading simulation curricula since 2020. Repeat recipient of Feinberg's Teaching Pin.
