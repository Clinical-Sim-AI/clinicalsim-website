# Copying Oxford Medical Simulation's backlink playbook

**Date:** 2026-08-20
**Source:** Semrush Backlink Analytics, live pulls on `oxfordmedicalsimulation.com`, 2026-08-18 and 2026-08-20
**Companion to:** `docs/seo/keyword-gap-2026-08.md`, section 8

Oxford Medical Simulation sits at Authority Score 31 with 901 referring domains against our 2 and
40. This file works out which parts of that are actually reproducible, and it opens with the part
that changes how you should read the whole thing.

---

## Read this first: most of their fast lever is nofollow

I pulled their 40 highest-authority backlinks and checked the `nofollow` attribute on each. The
result reframes the plan:

| Their link | Page AS | Passes authority? |
| --- | --- | --- |
| `fitwise.eventsair.com/aspih2026` (conference site) | 53 | **Yes** |
| `pmc.ncbi.nlm.nih.gov` | 48 | No, nofollow |
| `thenextweb.com` (funding story) | 48 | No, nofollow |
| `forwork.meta.com` (Meta for Work case study) | 47 | No, nofollow |
| `github.com` | 43 | No, nofollow |
| `link.springer.com` (book chapter, points at `/research/`) | 34 | **Yes** |
| `gamedriver.io` (vendor site) | 34 | **Yes** |
| `itif.org` (think tank report) | 31 | **Yes** |
| `link.springer.com` (journal article) | 22 | **Yes** |
| `cnn.com` | 22 | **Yes** |
| `newsroom.northumbria.ac.uk` (partner university press office) | 20 | **Yes** |
| `medium.com` x3, `note.com`, `asme.org.uk` | 21 to 27 | No, nofollow |

Two conclusions.

**Their 901 referring domains are inflated, though not as badly as ours.** A large share of what I
pulled is crawler noise rather than earned links: Yahoo mobile search result pages, Bing image
search pages, and outright spam (`fxcuffsgh.blogspot.com`, `usfcrm.blogspot.com`). Nobody built
those and nobody can.

**Their single biggest chunk is one placement counted 42 times.** All 42 `meta.com` links are the
same Meta for Work case study, "Purdue Global MR/VR nursing simulation," replicated across country
and language locales (`/gb/`, `/au/`, `/at/en/`, `/at/fallstudien/`). Every one is nofollow. The
same trick shows up at `borgenproject.org`, where 48 links turn out to be two links inside one blog
post, repeated across paginated archive pages (`/blog/page/100/`, `/page/107/`, `/page/109/`).

So the lesson is not "get 42 links from Meta." It is **count referring placements, not backlinks**,
and treat the nofollow volume as brand presence rather than authority. That presence is still worth
having, because it is what AI systems read, and we already trigger 3 AI Overview and 10 People Also
Ask keywords off a much thinner profile.

---

## What is structurally closed to us

Be honest about this before spending a day on it. OMS is a VR company, and a real share of their
profile exists only because a headset is involved:

- The **Meta for Work case study** and the whole Quest ecosystem. We are voice-based and run in a
  browser. There is no store listing to claim.
- **VR and gaming press** (`pcgamer.com`, `space.com`, `livescience.com`, `techtimes.com`). They
  cover OMS because VR is the story. Our story is a conversation, which is a harder pitch to that
  audience and the wrong audience anyway.
- `gamedriver.io`, a VR test-automation vendor listing them as a customer.

Writing those off removes roughly a third of what looks impressive in their profile.

---

## The plays worth copying, in order

### 1. Conference exhibitor and programme pages

**What they did:** their highest-authority followed link, at page AS 53, is the ASPIH 2026
conference site. Also `asme.org.uk` for the ASM 2024 meeting, though that one is nofollow.

**Our analogue:** IMSH, IPSSW, SSH, ASPE, and AAMC. Exhibitor listings, sponsor pages, and accepted
abstract or programme pages all produce links, and we are already going to these meetings, so the
marginal cost is filling in a form field with the right URL.

**Do this:** for every conference we exhibit at or present at in the next 12 months, make sure the
listing carries `https://clinicalsim.ai` (apex, never www) and that abstracts name the platform. One
person owns this and it takes an afternoon per event.

**Effort:** low. **Authority:** real, followed. **Priority: highest.**

### 2. Partner institution press offices

**What they did:** `newsroom.northumbria.ac.uk` published a release on their simulated learning work
being recognised as best practice in nursing education. Followed link, page AS 20.

**Our analogue:** this is the single best fit for work already on the roadmap. When the Advocate
feasibility study and the University of Chicago coaching study publish, both institutions have
communications teams whose job is to write them up. A university press office link is followed, it
is a `.edu`, and it is the credible version of PR.

**Do this:** at study publication, ask each site's comms office for a release, and ask that it link
to `clinicalsim.ai` rather than only naming us. Ask before submission, not after, so it is part of
the plan rather than a favour.

**Effort:** low, but gated on the studies. **Authority:** real, followed, and a `.edu`.
**Priority: highest, and it is the same work as the research roadmap.**

### 3. Platform partner case studies

**What they did:** the Meta for Work case study, syndicated across 42 locales. Nofollow, but it put
them on a Meta property in a dozen languages.

**Our analogue:** we have two real platform partners. The product's transcripts carry **ElevenLabs**
v3 markup, and the site ships on **Vercel**. Both publish customer case studies, both syndicate them
across locales, and both actively want healthcare and AI stories.

**Do this:** pitch a case study to each. The ElevenLabs angle is voice quality in a clinical
conversation where tone and silence carry the assessment. The Vercel angle is thinner and still
worth an ask.

**Effort:** medium, needs a pitch and probably a customer's permission. **Authority:** nofollow, so
count it as reach and entity presence. **Priority: high, because it is cheap reach.**

### 4. One announcement into business and clinical press

**What they did:** a funding round produced `thenextweb.com` (nofollow) and, back in 2020, a
`cnn.com` story (followed, page AS 22) on VR training during COVID. `forbes.com`,
`businessinsider.com`, and `fortune.com` also appear, alongside `prnewswire.com` feeding one release
out across seven Hearst television station domains at AS 55 to 62 (wesh, wbaltv, wlky, wmur, kmbc,
kcci, wyff4).

**Our analogue:** the seed round and the research are both announceable. The TV syndication is
genuinely one release multiplied, which is the cheapest volume in this whole document.

**Do this:** one PR Newswire release at the seed close or at first publication. Do not run a
drumbeat; the second release earns a fraction of the first.

**Effort:** low, costs money. **Authority:** mixed, mostly weak. **Priority: medium.**

### 5. Free company databases

**What they did:** `crunchbase.com`, `pitchbook.com`, `builtin.com`, `zoominfo.com`,
`cbinsights.com`, `explodingtopics.com`, `prospeo.io`, `webcatalog.io`, plus `glassdoor.com` and
`welcometothejungle.com` (10 links) from job postings.

**Our analogue:** identical, no adaptation needed. Every open role is a link, and every database
entry is a profile an AI system can read.

**Do this:** claim all of them in one sitting. Use the same one-line description everywhere so the
entity resolves consistently.

**Effort:** one afternoon, no approvals. **Authority:** mostly nofollow, near zero.
**Priority: medium, and do it because it is free entity presence, not because it moves AS.**

### 6. Policy and think tank reports

**What they did:** `itif.org`, a 2021 Information Technology and Innovation Foundation report on
immersive learning, followed, page AS 31.

**Our analogue:** reports on AI in health professions education. Worth being findable and quotable
by their researchers, which the glossary and `/research` already support. Not worth an outreach
campaign.

**Effort:** passive. **Priority: low.**

---

## Do not copy these

- **Medium, Substack, note.com, blogspot.** All nofollow, and the blogspot links in their profile
  are spam nobody built. Writing on those platforms is a distribution choice, not a link strategy.
- **GitHub.** Nofollow, and it is an unrelated XR list.
- **Search result pages.** The Yahoo and Bing rows in their profile are crawler artifacts. They
  cannot be pursued and they should not be counted.
- **Anything paid beyond a wire release.** We already have the bought-links version of a profile and
  it produced Authority Score 2.

---

## A correction I owe you

When I answered your backlink question I said "a PMC or Springer reference-list link is exactly what
built VitalTalk's profile." That was too loose. **PMC links are nofollow**, which I confirmed on
OMS's own PMC link. Springer, Wiley, and Cambridge are followed.

The citation strategy still holds, for three reasons that are worth separating rather than blurring:

1. Publisher domains (Springer, Wiley, Cambridge) pass authority and OMS's Springer links point at
   `/research/`, so a research page is the right target.
2. Nofollow citations still establish us as the thing clinicians cite, which is what AI systems read.
3. Citations are what cause the `.edu` resource-page links, and those are the real prize. VitalTalk's
   `upenn.edu` 24 and `harvard.edu` 12 exist because programs recommend a resource they saw cited.

What changes: do not expect `nih.gov` link counts to move Authority Score. Expect them to move
whether we get recommended.

---

## Scoreboard

Track referring placements, not backlinks, since this whole document is a lesson in why the second
number lies.

| Play | Target by end of Q4 2026 | Followed? |
| --- | --- | --- |
| Conference listings | 4 | Yes |
| Partner press offices | 2, gated on the studies | Yes |
| Platform case studies | 1 | No |
| Wire release | 1 release | Mixed |
| Company databases | 8 profiles | Mostly no |

Realistic outcome: Authority Score into the low teens, most of the movement from plays 1 and 2. Plays
3 to 6 buy reach and entity presence rather than authority, which is worth having and should not be
confused with progress on the ceiling. The compounding track in section 8.5 of the keyword gap report
is still the one that decides where we are in two years.
