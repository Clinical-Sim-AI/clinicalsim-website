# Pilot site link plan

**Date:** 2026-09-23
**Companion to:** `docs/seo/oms-backlink-playbook.md`, `docs/seo/backlink-prospects-2026-09.md`
**Status:** method ready, waiting on Ben's institution list

This plan turns the institutions ClinicalSim already works with into `.edu` and health-system links,
by asking each one to list ClinicalSim on its own simulation center, GME, nursing, or library
resources page. It is built so the list can be processed the day it arrives.

---

## Ground rules (read before doing anything)

1. **clinicalsim.ai never names a pilot site.** Ben decided this on 2026-06-11. Every ask in this plan
   is for the institution to list ClinicalSim on *its* page, opt-in. Nothing about the relationship,
   no logo, no "used at" line, no case study, gets published on clinicalsim.ai as a result of this
   work, and a yes from the institution does not change that.
2. **No study outcomes, stated or implied.** The Advocate feasibility study and the University of
   Chicago coaching study stay gated on written confirmation from the study owners (CLAUDE.md,
   "Current evidence guardrails"). No email, description, or suggested blurb may cite results, sample
   sizes, or "our study with you showed." The research portfolio's shape is also off limits.
3. **No paid links.** No sponsorship-for-listing, no "resource fee," no reciprocal link swaps. If a
   page owner asks for payment, log it as declined and move on.
4. **No invented facts about an institution.** Every "this page exists" or "this page links to X"
   claim in the tracker must be a URL someone actually fetched, with the fetch date.
5. **Always go through our existing champion.** Never cold-email a web team, page owner, or
   librarian at a pilot site. The champion decides whether to ask and who to ask.

---

## Why this matters

The September prospect pull found 12 university and health-system domains that link to two or more
competitors and not to us, including umich.edu (AS 77 to 78, linking OMS, i-Human, and VitalTalk),
ucf.edu (AS 68, four competitors), harvard.edu (AS 95), and yale.edu (AS 76). None of the 659
competitor referring domains in that pull linked to clinicalsim.ai. The playbook calls these `.edu`
resource-page links the real prize because they are followed, high-authority, and come from programs
that actually use a tool. A pilot site that already knows the product is the near-term version of
that row; a cold `.edu` pitch is not.

---

## Checking method, per institution

Budget about 20 minutes per institution. Do the steps in order and stop early if you find a
strong A-class page.

### Step 1. Map the domains

Most institutions spread relevant pages across several hosts. Before searching, write down:

- The main domain (`umich.edu`) and the medical or health-system domain (`med.umich.edu`,
  `medicine.umich.edu`, `medschool.umich.edu`, or a separate brand domain).
- The nursing school subdomain, if any (`nursing.ucf.edu`).
- **Every** library guide host. Institutions often run two LibGuides instances, one for the main
  library and one for health sciences (Michigan has both `guides.lib.umich.edu` and
  `infoguides.med.umich.edu`). Searching only one misses half the guides.

### Step 2. Look for these page types

| Page type | What it looks like | Typical owner |
| --- | --- | --- |
| Sim center "resources" / "tools" / "technology" / "vendors" page | A list of software and platforms the center uses or recommends, often with outbound links | Sim center director or operations manager |
| GME or residency program "educational resources" page | Links for residents: courses, question banks, communication resources | Program director, program coordinator, GME office |
| Nursing sim lab page | Facilities page, sometimes with a list of virtual sim products | Sim lab director, nursing college web editor |
| Library research guide (LibGuide) on simulation, communication, IPE, or med ed | Curated links to organizations, databases, and tools; names a guide owner | Liaison librarian / informationist |
| Faculty development page | Workshops and resources on teaching communication | Faculty affairs or faculty development office |
| Standardized patient program page | Program overview, sometimes resources for faculty | SP program director |
| Palliative care or serious illness communication program page | Training resources, often links VitalTalk | Program director |

### Step 3. Run these queries

Run one competitor per query. Combining names with `OR` inside a `site:` search returned mostly
off-domain noise (Wikipedia, PMC, patents) in the method test below.

Page discovery:

```
site:<domain> simulation resources
site:<domain> simulation center technology
site:<domain> "virtual patient"            (search term only; our copy says "AI patients")
site:<domain> "standardized patient" program
site:<domain> communication skills training residents
site:<domain> "serious illness" communication
site:<libguide-host> simulation
site:<libguide-host> "communication skills"
```

Competitor check (search the domain string first, then the brand name):

```
site:<domain> "vitaltalk.org"         then  site:<domain> VitalTalk
site:<domain> "shadowhealth.com"      then  site:<domain> "Shadow Health"
site:<domain> "i-human.com"           then  site:<domain> "i-Human"
site:<domain> "bodyinteract.com"      then  site:<domain> "Body Interact"
site:<domain> "oxfordmedicalsimulation.com"
site:<domain> SimConverse
site:<domain> Mursion
site:<domain> Kognito
```

When Semrush units are available, the faster and more reliable route is the one the prospect doc
describes: `backlinks` on each competitor with `display_filter` on `refdomain` equal to the
institution's domain and `source_url`, `source_title`, `nofollow` in `export_columns`. Web search
did not surface the exact competitor-linking pages at either test institution; Semrush returns them
directly.

### Step 4. Fetch every candidate page

Open each candidate and record: page title, the URL after redirects, whether it has outbound links to
third-party tools or organizations, which competitors it links to (an actual `<a href>`, not just a
mention), whether links look followed, and who the page names as owner or contact.

Watch for the three traps the method test hit: search snippets pointing at pages that now redirect
somewhere generic, pages that name a tool without linking to it, and pages that block automated
fetches (403). Check the last kind by hand in a browser.

### Step 5. Classify

| Class | Definition | The ask |
| --- | --- | --- |
| **A** | A resource page that already links out to third-party tools or external resources. Best if a competitor is already on it. | Add one line and link to an existing list. Lowest friction. |
| **B** | A relevant sim center, program, or nursing page with no outbound tool list. | A new mention, which usually means a content change the owner has to approve. Slower. |
| **C** | Nothing suitable found. | No ask. Revisit if the relationship grows or the champion knows of an internal page going public. |

Pick one best page per institution. If there are two good A pages (say a sim center tools page and a
library guide), log both but ask for one at a time.

---

## Who to ask

1. **Our pilot champion, always first.** Ben supplies the name. The champion knows whether a
   listing is welcome, whether the institution has a vendor-mention policy, and who owns the page.
2. **Then, only through the champion,** the right owner for the page type: sim center director,
   program director or coordinator, SP program director, liaison librarian, or faculty development
   office.
3. **Web editors and communications teams last,** and only if the champion or page owner asks us to
   send the request there. We never email a web team cold.

If the champion says no, or says "not now," log it and do not route around them.

---

## Email templates

Both are written in Ben's voice and checked against the humanizer rules (no dashes, plain words,
"AI patients," "high-stakes conversations," no SP-replacement claim, no results). Fill the brackets;
do not add anything about outcomes, other sites, or the study.

The description to use everywhere is `POSITIONING_ONE_LINER` from `lib/positioning.ts`. If that
constant changes, update both templates.

> ClinicalSim gives clinicians and staff spoken practice with AI patients and measures each
> simulation against the standard your institution already holds.

URL: `https://clinicalsim.ai` (apex, never www).

### (a) To the pilot champion

**Subject:** A small ask about your [sim center / program] resources page

> Hi [first name],
>
> I've got a small, no-pressure ask. [Institution]'s [page name] lists tools and resources for
> [residents / learners / faculty], and I'd love for ClinicalSim to be on it if you think that's
> appropriate: [page URL].
>
> If it helps, here's a line the page owner could use as is:
>
> ClinicalSim gives clinicians and staff spoken practice with AI patients and measures each
> simulation against the standard your institution already holds. https://clinicalsim.ai
>
> I've put a short note below you can forward to whoever maintains the page. And if a listing
> doesn't fit your policies or the timing's wrong, that's completely fine. I'd rather you tell me
> no than feel awkward about it.
>
> We don't name the programs we work with on our site, and that won't change, so this would only
> ever appear on your page.
>
> Thanks,
> Ben

For a B-class page (no existing tool list), swap the first paragraph for:

> I've got a small, no-pressure ask. I noticed [page name] describes how [institution] trains
> [residents / nurses] for high-stakes conversations, and I wondered whether a mention of
> ClinicalSim would be welcome there: [page URL].

### (b) Forwardable note for the page owner

**Subject:** Resource listing request: ClinicalSim

> Hi [name],
>
> [Champion name] suggested I reach out. Our team works with [department / program] on
> communication training, where clinicians practice high-stakes conversations with AI patients.
>
> Would you consider adding ClinicalSim to [page name] ([page URL])? A line like this would do:
>
> ClinicalSim gives clinicians and staff spoken practice with AI patients and measures each
> simulation against the standard your institution already holds. https://clinicalsim.ai
>
> It's meant to extend a standardized patient program, not replace one. If your office has a
> process for resource listings, I'm happy to follow it, and if the answer's no, that's fine.
>
> Thanks for considering it,
> Ben Conway
> CEO, ClinicalSim

---

## Tracking table

Copy this table into the working copy of this doc or a sheet. One row per institution; "Date" is the
date of the last status change, and every "Best page URL" must be a page that was fetched.

| Institution | Domain | Champion (from Ben) | Best page URL | Class A/B/C | Competitors already linked | Page owner/contact | Status | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | Not checked | |

Status values: `Not checked`, `Checked`, `Champion asked`, `Forwarded to owner`, `Follow-up sent`,
`Listed` (add the live URL and whether the link is followed), `Declined`, `Not now`, `No page (C)`.

---

## Sequencing

1. Check every institution on Ben's list first, so the whole list is classified before any email goes
   out.
2. Ask A-class institutions first, strongest page first (competitor already listed, then any
   outbound resource list).
3. Cap outreach at four or five champion emails a week. Champions are also our pilot relationships,
   and a pile of asks in one week reads as a campaign.
4. Follow up once, 10 days after the champion email, with a two-line nudge. No second follow-up.
5. Then B-class, same cadence.
6. When a listing goes live, fetch it, record the URL and link attributes, and thank the champion.
   Do not announce it anywhere.
7. Recheck live listings quarterly; pages get redesigned and links vanish.

---

## Method test

**These are examples used to calibrate the method. Neither institution is asserted to be a
ClinicalSim pilot site.** Both came from the prospect doc because Semrush shows them linking to
competitors. All pages were fetched on 2026-09-23.

### University of Michigan (umich.edu)

Domains mapped: `umich.edu`, `med.umich.edu`, `medicine.umich.edu`, `medschool.umich.edu`,
`cela.med.umich.edu`, library guide hosts `guides.lib.umich.edu` and `infoguides.med.umich.edu`.

| Page | URL | Finding | Class |
| --- | --- | --- | --- |
| Simulation, Interprofessional Practice and Education research guide | https://guides.lib.umich.edu/c.php?g=472006&p=5807631 | Library guide with outbound links to Nexus IPE (nexusipe.org) and the University of Washington's teaching-with-simulation lessons. No competitor links. Names a guide owner (an informationist at Taubman Health Sciences Library). | **A** (outbound resource list, owner named) |
| Standardized Patient Program (CELA) | https://cela.med.umich.edu/ | Program overview, no outbound tool list, no resources page. | **B** |
| Communication skills workshops (faculty development) | https://faculty.medicine.umich.edu/workshops/communication-skills | Search snippet described VitalTalk-trained faculty running goals-of-care workshops. The URL now 302-redirects to the generic faculty office page (https://medschool.umich.edu/offices/faculty). Stale. | Not usable |
| Clinical Simulation Center, procedural trainers | https://medschool.umich.edu/centers/clinical-simulation-center/explore-csc/simulators/procedural-trainers | Returned 403 to the automated fetch. Needs a manual browser check. | Unverified |

The competitor-linking pages Semrush counted (OMS, i-Human, VitalTalk) did not surface through web
search. `site:umich.edu "vitaltalk.org"` returned only a researcher CV in Deep Blue and off-domain
results.

**Best page:** the library simulation guide (A). Institution class: **A**.

### University of Central Florida (ucf.edu)

Domains mapped: `ucf.edu`, `nursing.ucf.edu`, `fctl.ucf.edu`, library guide host `guides.ucf.edu`.

| Page | URL | Finding | Class |
| --- | --- | --- | --- |
| STIM Center (College of Nursing simulation labs) | https://nursing.ucf.edu/about/simulation-labs-classrooms | Facilities page. No third-party products named or linked. Contact is a shared inbox, no named director. | **B** |
| Instructional Design & Technology, Associations (library guide) | https://guides.ucf.edu/c.php?g=78297&p=504773 | Library guide linking out to INACSL (inacsl.org). No competitor links; no named owner in the fetched content. Education-school guide, so a weaker fit than a health sciences guide. | **A** (weak fit) |
| Student Support Offices, Faculty Center | https://fctl.ucf.edu/campus-resources-for-teaching/student-support-offices/ | Names Kognito ("a set of role-play, avatar modules...") but does not link to it. A mention, not a link, and a mental-health context, not clinical. | Not a fit |
| vSim and Shadow Health study references (PDF) | https://nursing.ucf.edu/wp-content/uploads/2022/09/vsim-sh-references-003.pdf | Research reference list. The fetch could not extract text, so no outbound links were confirmed. | Unverified |

`site:ucf.edu "shadowhealth.com"` and `"i-human.com"` returned nothing on the UCF domain, even
though Semrush counts UCF links to both. Same lesson as Michigan.

**Best page:** STIM Center (B), since the only A-class guide is an off-topic education guide.
Institution class: **B**.

### What the test changed in the method

1. **Search one competitor per query, domain string first.** Combined `OR` queries returned noise.
2. **Web search does not find the pages Semrush counts.** At both institutions the competitor-linking
   pages stayed hidden. Use the Semrush `backlinks` call filtered by `refdomain` whenever units are
   available; treat web search as the fallback.
3. **Map every library guide host.** Michigan has two. Library guides were the only A-class pages
   found at either institution, and they name an owner.
4. **Sim center pages are mostly facilities pages.** Expect B more often than A there.
5. **Always fetch; never trust a snippet.** One promising Michigan page now redirects to a generic
   office page, and one returned 403.
6. **A mention is not a link.** Record only real outbound links under "Competitors already linked."

---

## What Ben needs to supply with the list

For each institution:

1. **Institution name and primary domain** (the web domain, if he knows it).
2. **Champion name, title, and email**, and whether they've agreed to be asked favors like this.
3. **Department or program we work with** (for example PICU fellowship, nursing sim lab, GME office),
   so the search starts at the right page type.
4. **Any known internal page or vendor list** the champion has mentioned.
5. **Anything off limits:** a champion who shouldn't be asked yet, an institution mid-contract, or a
   site whose involvement is itself confidential. If the relationship is confidential enough that
   even an opt-in listing would expose it, mark that institution C and skip it.
6. **Confirmation that Ben (or someone he names) sends the emails** from his own address.
