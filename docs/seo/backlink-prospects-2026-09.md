# Backlink prospects and own-profile audit, September 2026

**Date:** 2026-09-23
**Source:** Semrush MCP, live pulls on 2026-09-23 (`backlinks_comparison`, `backlinks_matrix`)
**Companion to:** `docs/seo/oms-backlink-playbook.md`

This file lists the referring domains that link to two or more of our competitors and not to us,
sorted into what we can claim this week, what we have to earn, and what is a long shot. The second
half, the audit of our own referring domains, could not be run this session because the Semrush
account ran out of API units partway through. That section says exactly what is missing and how to
finish it.

No paid links anywhere in this list. We already have the bought-links version of a profile and it
produced Authority Score 2.

---

## Where we stand

Pulled with `backlinks_comparison` on 2026-09-23, root domain for every target.

| Domain | Authority Score | Referring domains | Backlinks | Follow | Nofollow |
| --- | --- | --- | --- | --- | --- |
| clinicalsim.ai | 2 | 127 | 336 | 302 | 34 |
| simconverse.com | 25 | 386 | 618 | 381 | 242 |
| i-human.com | 27 | 556 | 1,334 | 882 | 456 |
| vitaltalk.org | 29 | 1,183 | 4,564 | 3,183 | 1,407 |
| oxfordmedicalsimulation.com | 30 | 1,054 | 5,086 | 3,279 | 1,836 |
| virti.com | 30 | 1,192 | 6,785 | 4,333 | 2,464 |
| bodyinteract.com | 32 | 1,642 | 7,388 | 5,401 | 1,973 |
| shadowhealth.com | 32 | 810 | 4,645 | 2,841 | 1,809 |
| mursion.com | 32 | 1,319 | 38,469 | 33,354 | 5,636 |
| healthysimulation.com | 38 | 2,734 | 16,711 | 8,648 | 8,135 |

Our follow ratio (302 of 336, about 90%) is higher than any competitor's. That is not a good sign on
a profile this small; earned profiles carry a real nofollow share from journals, social, and UGC
platforms, and ours does not. It fits the bought-links history in the playbook, and it is the main
reason the Task B audit below still needs to happen.

---

## How the gap was built, and its limits

`backlinks_matrix` accepts at most five targets per call (a nine-target call returned
`400 Validation Error : targets[]`), so I ran two calls, each with clinicalsim.ai plus four
competitors, sorted by referring-domain score:

- **Pull A:** simconverse, oxfordmedicalsimulation, bodyinteract, shadowhealth. 500 rows returned,
  covering referring domains down to Authority Score 25.
- **Pull B:** i-human, vitaltalk, mursion, healthysimulation. 500 rows requested, **159 returned**,
  stopping at Authority Score 63. The follow-up page call failed on zero API units.

Then I merged the two by domain and counted how many of the eight competitors each one links to.
Three caveats follow from that:

1. **Competitor counts are minimums.** Below Authority Score 63, a domain that links to one Pull A
   competitor and one Pull B competitor is counted as one. Domains like `nursingsimulation.org` and
   `sesam-web.org` probably also link to VitalTalk or HealthySimulation and are undercounted here.
2. **clinicalsim.ai had zero backlinks from every one of the 659 domains returned.** So every row
   below is a true gap, not a partial one.
3. **The matrix does not report follow or nofollow.** Link type below is a guess from the domain.
   The playbook's check on OMS's top links (PMC nofollow, Springer followed) is the best guide.

Authority Score occasionally differs by a point between the two pulls (Springer 80 and 81, Michigan
77 and 78). Both values are shown where they differ.

---

## Tier 1: quick wins, claimable this week

Profiles and databases. Almost all nofollow, near zero authority. Do them because they are free
entity presence and every AI system reads them, not because they move Authority Score. Use the same
one-line description everywhere and the apex URL `https://clinicalsim.ai`.

| Domain | AS | Links to (competitors) | Link type | Route |
| --- | --- | --- | --- | --- |
| crunchbase.com | 73 | OMS, Shadow Health, i-Human, Mursion, HealthySimulation (5) | Company profile | Claim or create the organization profile |
| pitchbook.com | 63 to 64 | SimConverse, OMS, Body Interact, Shadow Health, i-Human, Mursion (6) | Company profile | Claim via PitchBook's company profile update form |
| zoominfo.com | 73 | OMS, Shadow Health, VitalTalk, HealthySimulation (4) | Company profile | Claim the free company listing |
| glassdoor.com | 77 to 78 | OMS, Shadow Health, Mursion (3) | Employer profile, job posts | Claim free employer account; post open roles |
| builtin.com | 66 | SimConverse, OMS, Mursion (3) | Company profile, job posts | Create free company profile (Built In Chicago) |
| webcatalog.io | 59 | OMS, Shadow Health (2) | App directory | Submit the web app |
| owler.com | 44 | OMS, Shadow Health (2) | Company profile | Claim the profile |
| getlatka.com | 42 | SimConverse, OMS (2) | SaaS database | Claim the company page |
| startupblink.com | 40 | SimConverse, Shadow Health (2) | Startup map | Add the company |
| seedtable.com | 38 | OMS, Shadow Health (2) | Startup database | Submit the company |
| envisioning.com | 33 | SimConverse, OMS (2) | Tech-trend database | Submit as an example under AI patient / simulation entries |

**Count: 11.**

---

## Tier 2: earned, needs research, PR, or a relationship

This is where the authority is. Ordered by fit rather than strictly by Authority Score, because a
sim-society link at AS 32 is worth more to us than a general newswire at 73.

### Simulation societies, conferences, and trade media

| Domain | AS | Links to | Link type | Route |
| --- | --- | --- | --- | --- |
| healthysimulation.com | 36 to 38 | SimConverse, OMS, Body Interact, Shadow Health (4) | Trade news, vendor coverage | Pitch news (study publication, new specialty) to their editor; ask whether their vendor directory is free before submitting, and skip it if it is a paid listing |
| nursingsimulation.org | 32 | OMS, Body Interact, Shadow Health (3) | Journal (INACSL, Clinical Simulation in Nursing) | Submit research or a technical report; cited in articles |
| sesam-web.org | 32 | SimConverse, OMS, Body Interact (3) | Society (SESAM, Europe) | Exhibit, present, or join; programme and sponsor pages link out |
| eventsair.com | 41 | SimConverse, OMS (2) | Conference site (ASPIH ran on this) | Exhibitor or abstract listing at the next ASPIH or similar meeting (playbook play 1) |
| eventscloud.com | 41 | SimConverse, OMS (2) | Conference platform | Same as above; many society meetings host exhibitor lists here |
| aacom.org | 44 | OMS, Body Interact (2) | Association (osteopathic colleges) | Exhibit at AACOM's annual meeting or propose a session |
| nurse.com | 48 | OMS, Shadow Health (2) | Nursing trade media | Pitch a contributed piece on communication training |
| healio.com | 66 | Shadow Health, VitalTalk (2) | Clinical news | Pitch study results once published |
| podbean.com | 54 | OMS, Body Interact (2) | Podcast host | Guest spots on sim and med ed podcasts hosted there |

### Journals and publishers (need citable research)

These all follow from the same work: publish the Advocate and University of Chicago studies, get cited
in reviews, and make `/research` the page people cite. Springer, Wiley, and Cambridge links are
followed; PMC and NIH are nofollow (playbook, "A correction I owe you").

| Domain | AS | Links to | Link type | Route |
| --- | --- | --- | --- | --- |
| springer.com | 80 to 81 | OMS, Body Interact, VitalTalk, Mursion, HealthySimulation (5) | Journal and book citation | Publish; get cited in simulation and communication reviews |
| mdpi.com | 73 | OMS, Body Interact, VitalTalk, Mursion, HealthySimulation (5) | Journal citation | Same; MDPI's open-access education journals publish sim studies quickly |
| frontiersin.org | 69 | OMS, Body Interact, Shadow Health, Mursion, HealthySimulation (5) | Journal citation | Same |
| ovid.com | 58 to 66 | Shadow Health, i-Human, VitalTalk, Mursion, HealthySimulation (5) | Journal index (Wolters Kluwer) | Follows from LWW publication |
| nih.gov | 100 | SimConverse, OMS, VitalTalk, Mursion, HealthySimulation (5) | PMC citation, nofollow | Follows from any indexed publication |
| lww.com | 66 to 70 | Shadow Health, i-Human, VitalTalk, HealthySimulation (4) | Journal (Academic Medicine, Simulation in Healthcare) | Target these journals for the study manuscripts |
| biomedcentral.com | 73 | Body Interact, VitalTalk, HealthySimulation (3) | Journal citation (BMC Medical Education) | Submit or get cited |
| wiley.com | 84 | i-Human, VitalTalk (2) | Journal citation | Submit or get cited |
| elsevier.com | 70 | Shadow Health, HealthySimulation (2) | Journal citation | Submit or get cited |
| journals.sagepub.com | 69 | Body Interact, VitalTalk (2) | Journal citation | Submit or get cited |
| bmj.com | 72 | SimConverse, VitalTalk (2) | Journal citation | SimConverse's 23 links there are worth reading first; see "Not done" below |
| pressbooks.pub | 66 | VitalTalk, HealthySimulation (2) | Open textbooks | Offer a free example encounter to authors of open nursing and communication textbooks |

### Universities and health systems (resource pages)

These are the `.edu` resource-page links the playbook calls the real prize. They come from programs
that use or recommend a tool, which means pilot sites first.

| Domain | AS | Links to | Link type | Route |
| --- | --- | --- | --- | --- |
| harvard.edu | 95 | VitalTalk, Mursion, HealthySimulation (3) | Program resource page | Long cycle; follows from citation and adoption |
| umich.edu | 77 to 78 | OMS, i-Human, VitalTalk (3) | Sim center or course resource page | Identify the linking page, then pitch the page owner |
| yale.edu | 76 | Shadow Health, VitalTalk, Mursion (3) | Resource page | Same |
| ucf.edu | 68 | Shadow Health, i-Human, Mursion, HealthySimulation (4) | Nursing and sim resource pages | Same; UCF runs a large sim program |
| columbia.edu | 78 | VitalTalk, HealthySimulation (2) | Resource page | Same |
| ufl.edu | 78 | Shadow Health, Mursion (2) | Resource page | Same |
| utoronto.ca | 74 | Body Interact, Shadow Health (2) | Resource page | Same |
| arizona.edu | 72 | VitalTalk, HealthySimulation (2) | Resource page | Same |
| berkeley.edu | 80 | VitalTalk, Mursion (2) | Resource page | Same |
| upmc.com | 71 | VitalTalk, HealthySimulation (2) | Health system education page | Same |
| brownhealth.org | 63 | VitalTalk, HealthySimulation (2) | Health system education page | Same |
| va.gov | 82 | OMS, HealthySimulation (2) | Federal training page | Long cycle; VA sim network (SimLEARN) |

Every institution already piloting with us is a better near-term version of this row than any cold
`.edu` pitch, and the partner press office play in the playbook covers how to ask.

### Wire services

| Domain | AS | Links to | Link type | Route |
| --- | --- | --- | --- | --- |
| prnewswire.com | 73 | OMS, Shadow Health, VitalTalk, Mursion, HealthySimulation (5) | Press release | One release at seed close or first publication (playbook play 4). A wire fee buys distribution, not a link placement, so it stays inside the no-paid-links rule |
| globenewswire.com | 66 | i-Human, Mursion (2) | Press release | Alternative to PR Newswire; pick one |

**Count: 35** (9 societies and media, 12 journals and publishers, 12 universities and health systems,
2 wires).

---

## Tier 3: long shots

| Domain | AS | Links to | Link type | Why it is a long shot |
| --- | --- | --- | --- | --- |
| nature.com | 81 | VitalTalk, Mursion (2) | Journal or news | Needs a high-profile result |
| nytimes.com | 100 | VitalTalk, Mursion (2) | News | Needs a national story |
| cnn.com | 99 | OMS, i-Human, VitalTalk (3) | News | OMS got it from VR during COVID |
| forbes.com | 92 | OMS, Mursion (2) | News or contributor | Mursion's 17 links are likely contributor columns; not worth chasing |
| fortune.com | 71 to 72 | OMS, Mursion (2) | News | Funding-story territory |
| cnet.com | 83 | Shadow Health, i-Human, VitalTalk (3) | Tech news | Wrong audience |
| unam.mx | 83 | Body Interact, HealthySimulation (2) | University (Mexico) | No Spanish-language product |
| cuni.cz | 63 to 64 | SimConverse, VitalTalk, HealthySimulation (3) | University (Czech) | No presence in Europe |
| barcelo.edu.ar | 40 | OMS, Body Interact (2) | University (Argentina) | No presence in Latin America |
| tbzmed.ac.ir | 34 | Body Interact, Shadow Health (2) | University (Iran) | Not a market we can sell into |

**Count: 10.**

---

## Excluded from the gap

These link to two or more competitors and are not prospects. Most are crawler noise, scrapers, or
data brokers that list every company automatically.

- **Search and platform noise:** yahoo.com, bing.com, google.com, apple.com, medium.com,
  substack.com. Search result pages and nofollow UGC (playbook, "Do not copy these").
- **Stat-farm content sites:** gitnux.org, worldmetrics.org, wifitalents.com, zipdo.co. Each links to
  three competitors dozens of times from generated "statistics" pages.
- **Scrapers and site-value tools:** sitelike.org, siteprice.org, updatestar.com, revenuebase.ai,
  tntcode.com, loginslink.com, bouncewatch.com, zephyrnet.com, glarity.app, grokipedia.com.
- **Contact-data brokers:** rocketreach.co, prospeo.io, leadiq.com, wiza.co, growjo.com. These pick us
  up on their own; claiming them buys nothing.
- **Other:** sweetstudy.com (essay mill, 182 links to Shadow Health), trustburn.com, fitgap.com,
  bloomberry.com, caplight.com, startupintros.com, superagi.com, topline.com, treeview.studio,
  vbdata.cn, vc.ru.

### High-fit domains linking to only one competitor

Outside the two-competitor rule but worth the same outreach, from the same pulls: `ssih.org` (Society
for Simulation in Healthcare, AS 37, Body Interact), `aacnnursing.org` (AS 51, OMS), `nursingworld.org`
(ANA, AS 60, Shadow Health), `naemse.org` (AS 28, OMS), `upenn.edu` (AS 75, VitalTalk 24 links),
`jamanetwork.com` (AS 71, VitalTalk 12), `ucsf.edu` (AS 70, VitalTalk 55), `medscape.com` (AS 85,
VitalTalk 6), `utah.edu` (AS 76, VitalTalk 7), and `ama-assn.org` (AS 70, VitalTalk 3). Utah and
Medscape were early signals from the prior pull; this session found them on VitalTalk only.

---

## Top 10 prospects

Ranked on authority, how many competitors the domain links to, and whether we can realistically get
there in the next two quarters.

1. **springer.com** (AS 80 to 81, 5 competitors). Followed journal and book links; research is the route.
2. **frontiersin.org** (AS 69, 5). Open access, fast turnaround for sim education studies.
3. **mdpi.com** (AS 73, 5). Same.
4. **lww.com** (AS 66 to 70, 4). Home of *Simulation in Healthcare* and *Academic Medicine*.
5. **healthysimulation.com** (AS 36 to 38, 4 in Pull A, and itself a competitor at AS 38 with 2,734
   referring domains). The trade outlet for this category; editorial coverage, not a paid listing.
6. **nursingsimulation.org** (AS 32, 3). INACSL's journal.
7. **sesam-web.org** (AS 32, 3). European sim society.
8. **umich.edu** (AS 77 to 78, 3). A named resource page to find and pitch.
9. **crunchbase.com** (AS 73, 5). Claimable today.
10. **pitchbook.com** (AS 63 to 64, 6, the most-shared domain in the set). Claimable today.

---

## Prospect counts

| Tier | Count |
| --- | --- |
| Quick wins | 11 |
| Earned | 35 |
| Long shots | 10 |
| **Total** | **56** |

---

## Not done: exact linking pages for the top prospects

The plan was to pull competitor backlinks filtered to each top-five prospect's domain (for example,
SimConverse's 23 links on `bmj.com` or OMS's link on `umich.edu`) so outreach names a real page. The
API units ran out before any of those calls could run. To finish, run `backlinks` on the competitor
with `display_filter` on `refdomain` equal to the prospect domain and `export_columns` including
`source_url`, `source_title`, and `nofollow`. Five calls at a limit of 20 rows each will do it.

---

## Task B: audit of clinicalsim.ai's own referring domains

**Not run. Blocked on Semrush API units.**

The `backlinks_refdomains` call for clinicalsim.ai (limit 150) returned
`403 ERROR 132 :: API UNITS BALANCE IS ZERO` (trace `cbeffcbc7ce4cece131f4b2a729bc9a7`). There are no
category counts and no disavow candidates in this document, because every figure here has to come from
a live pull and none was possible.

What we do know from the `backlinks_comparison` pull above: 127 referring domains, 336 backlinks, and
a 90% follow share, which is abnormally high for a young brand and consistent with bought links.

**To finish once units reset or are topped up:**

1. `backlinks_refdomains`, target `clinicalsim.ai`, root domain, limit 150, columns `domain`,
   `domain_authority_score`, `backlinks_num`, `country`, `ip`, `first_seen`.
2. `backlinks`, same target, limit 400, columns `source_url`, `source_title`, `anchor`, `nofollow`,
   `sitewide`, `page_authority_score`, `first_seen`.
3. `backlinks_anchors` and `backlinks_refips` to spot exact-match anchor clusters and shared-IP
   (PBN) groups.
4. Sort into legit editorial, profiles and directories, suspicious, and toxic, and list disavow
   candidates as domain plus reason. Recommend only; do not create a disavow file.

Google's position is that it ignores most spam links on its own and that disavow is for manual actions
or a clear paid-link history. We have the second, so the audit is worth doing, but it is a cleanup
task, not something that will move Authority Score by itself.

---

## API log for this session

| Call | Result | Units |
| --- | --- | --- |
| `backlinks_comparison`, 10 targets | OK | 960 |
| `backlinks_matrix`, 9 targets | Error: `400 Validation Error : targets[]` (limit is five targets) | 0 |
| `backlinks_matrix`, Pull A, 10 rows (test) | OK | 400 |
| `backlinks_matrix`, Pull A, 500 rows | OK | 20,000 |
| `backlinks_matrix`, Pull B, 500 rows requested | OK, 159 rows returned | 6,360 |
| `backlinks_matrix`, Pull B, offset 159 | Error: `403 ERROR 132 :: API UNITS BALANCE IS ZERO` (trace `d622c2fa044bafdeb7dce0b69c130630`) | 0 |
| `backlinks_refdomains`, clinicalsim.ai | Error: same, trace `cbeffcbc7ce4cece131f4b2a729bc9a7` | 0 |

Total spent: 27,720 units. The matrix report costs about 40 units per row, so a 500-row pull is
expensive; next time, filter on the clinicalsim.ai column and sort by `matchesnum_desc` to fetch only
the shared domains.

---

## Semrush SEO Ideas, 2026-09-23

Semrush's SEO Ideas report suggested backlink domains for three target keywords. Filtered here so no
one re-chases the noise. No outreach sent. Authority Scores not pulled.

**Worth logging**

| Domain | Suggested for | Note |
| --- | --- | --- |
| can-sim.ca | clinical simulation | Canadian simulation society; same play as ssih.org |
| immersivelearning.news | clinical simulation | Trade media on simulation and XR; pitch news |
| uab.edu, uabmedicine.org | clinical simulation | Sim center resource pages; find the linking page first |
| michiganmedicine.org | clinical simulation | Pairs with the existing umich.edu row |
| gaumard.com | clinical simulation | Manikin vendor; partner or resource page only, long cycle |
| federation.edu.au | medical sim | Australian university; outside current market, low priority |
| ric.edu, hartnell.edu | medical sim | Nursing or health programs with sim resource pages |
| medscape.com | medical sim | Long shot; already listed under single-competitor domains |
| healthysimulation.com | speech pathology clinical simulations | Already tracked in Tier 2 |

**Rejected**

- telegram.dog, yahoo.com, answers.com, nyx.cz, ifixit.com, outreachdashboard.wmflabs.org,
  loginslink.com, atlassian.net: search, UGC, scraper, or wiki tooling noise.
- rs6.net, constantcontact.com: email-newsletter redirect hosts, not editorial links.
- apptopia.com, androidappsforme.com: app-store data scrapers.
- fullcodemedical.com, medschoolcoach.com: competitor or test-prep vendor sites.
- creativelearningguild.co.uk, endourology.org, worldpharmatoday.com: off-topic for communication
  simulation.
- appstate.edu, speechpathology.org: suggested for speech pathology, which ClinicalSim doesn't serve.
