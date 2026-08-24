// Release notes for the public /help/release-notes page.
//
// Newest release first. Each release renders as a collapsible section keyed by
// `id` (used for deep-link anchors). Within a release, `userFacing` items show
// by default when the release is expanded; `team` items render inside a nested,
// collapsed-by-default "Behind the scenes" group.
//
// Bullet strings may start with a **bold** lead-in phrase; the page renders that
// leading segment in medium weight. Everything after it is plain text. See
// `renderReleaseBullet` in the page component.
//
// To add a release: prepend a new object. That's the whole job. `date` is the
// single source for the displayed date, the "Last updated" line, the WebPage
// dateModified, and the sitemap lastModified, so there is nothing else to bump.

export interface Release {
  /**
   * Stable anchor id for deep links, normally the same as `date`. Ids must be
   * unique across the page, so when two releases share a date give the second
   * one a suffix ("2026-07-24-b"). Enforced by the check below.
   */
  id: string
  /** ISO date, YYYY-MM-DD. Single source for every date this page renders. */
  date: string
  /** Optional lead-in note for the release. */
  note?: string
  /** Learner- and program-facing changes. */
  userFacing: string[]
  /** Admin and behind-the-scenes changes. */
  team: string[]
}

// Renders "2026-07-24" as "July 24, 2026". Splits the parts by hand and formats
// in UTC so the label can't slip a day for anyone west of Greenwich.
export function formatReleaseDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export const releases: Release[] = [
  {
    id: "2026-08-24",
    date: "2026-08-24",
    note: "A short release, almost all of it about what you see in the minute after a simulation ends.",
    userFacing: [
      "**Your feedback page finishes on its own.** If you were already sitting on your feedback while grading wrapped up, you could be left looking at the grader's raw working notes: a duplicated score table, run-on sections, sometimes a total that didn't add up. It stayed that way until you reloaded. The page now waits for the finished report and switches to it the moment it lands. Program leads and admins reading someone else's session get the same fix.",
      "**Attempts graded again show the right competencies.** When an attempt was re-graded against an updated version of a case, its scores were read against the old version's competency list, so competencies could disappear from the report when the two lists differed. Every score now appears against the competencies it was actually graded on.",
      "**An internal label no longer shows up on cases.** A tag we use in-house to mark which cases are ready to publish had leaked onto 34 live simulations, appearing wherever tags appear: case cards, the catalog, filters. It means nothing to anyone outside our team. It can no longer reach the live app, and the stray labels are being cleared.",
    ],
    team: [
      "The \"Ready for Prod\" marker can't be published now, by construction. It's filtered out when the promotion plan is computed, refused when a plan is applied (so a plan drawn up before this shipped can't smuggle it through), and excluded from the operator script that copies content between environments. A follow-up closed the quieter half of the same hole: the marker's id was still feeding the step that rewrites a case's whole tag set, which would have re-pinned it after the visible item was skipped. It stays visible in the authoring tool, which is the one place it belongs. Our internal docs also described that operator script as copying only marked cases. It doesn't. It copies every live published platform case, which badly understates what a run against production does.",
      "Feedback pages now stop polling when they should. Grading saves in two passes and the page's \"are we done\" check only knew about the first, which is the bug above. Fixing it meant the org and admin views could have polled forever on an old session whose second pass never settled, so both now carry the time limit the learner page already had.",
      "Rubric authoring refuses a name that would silently lose its category. The separator in a rubric's name is what generates its category, and with it the badge and the grouping in the rubric-type filter, but nothing enforced the convention. An ordinary hyphen wrote cleanly and left the category empty, with no error anywhere. It happened twice in one sitting last week and stayed invisible until someone went looking, and you can't correct it afterwards without renaming the rubric. The tool now refuses the wrong separator, suggests the corrected name, and prints the category a name will generate before anything is written.",
      "Our database lockdown is verified on the environments that matter, not only locally. Every migration push to staging and production is followed by a read-only check of all ten security rules against that environment. It doesn't hold up the release, since configuration drift is worth an alert rather than a blocked deploy, and it warns loudly instead of passing quietly when it isn't configured to connect.",
    ],
  },
  {
    id: "2026-08-23",
    date: "2026-08-23",
    note: "Most of this release went into making the app tell you the truth about your own sessions, plus assigning learners to a project before they have accepted an invitation.",
    userFacing: [
      "**Attempts that never connected now say \"Didn't start.\"** A simulation that got as far as asking for a microphone but never connected used to sit at \"In progress\" forever, counting toward a learner's assignment as though they were halfway through it. Those attempts now reach an honest end state with a plain-English reason, and the message matches what actually went wrong (a declined microphone prompt no longer tells you to call IT about the network). Dismiss the permission dialog and no half-finished attempt is recorded at all.",
      "**Deleting an attempt while feedback is being prepared is now safe.** Tidying up your history mid-grading used to leave the attempt permanently marked failed, or stuck saying it was still processing when nothing was watching for it. Deleting now stops the work in progress, and nothing keeps grading a session you've removed.",
      "**Feedback timing no longer depends on your device's clock.** If your laptop or phone clock ran fast, your feedback page could tell you grading had given up while it was in fact still running. The wait is now measured on our side, so what you see reflects what's happening.",
      "**Add learners to a project before they've accepted their invitation.** You used to have to wait for each person to sign up and then assign them one at a time, which meant a whole incoming cohort landed on an empty page after signing up. You can now attach people who are still invited, individually or as a group, see them in a separate \"Waiting to join\" section, and they arrive with their simulations already assigned. Pasting an email that was already invited attaches that person to the project instead of quietly doing nothing, and a learner who genuinely has nothing assigned yet gets an explanation and a way to reach support.",
      "**You'll hear about a new assignment right away.** When your program lead adds you to a project, you get an email immediately, naming the simulations you've been assigned, when they're due, and a link straight to your assignment list. If you were invited to ClinicalSim through that same project, the project is named in your invitation instead, so nobody gets two emails about one thing.",
      "**The follow-up reminders now read as one conversation.** The later \"finish your simulations\" nudges open by reminding you when you were added to the project, and lead with the project's name, so all the mail about a given assignment sits together in your inbox.",
    ],
    team: [
      "Roughly twenty sessions that had been stuck reading \"processing\" indefinitely in production corrected themselves the moment this shipped. No cleanup, no one-off script, and any future one settles on its own. An hourly background check also closes out attempts abandoned mid-connect, and it's careful not to mislabel a session that actually took place.",
      "Errors now reach us instead of dying quietly. Every error the app records is reported to our monitoring, in the browser, on the site, and in the background workers, which previously reported nothing at all. Several paths that used to fail in complete silence (a simulation that never connects to the voice provider, feedback that never gets queued, a voice-deletion request that only partly succeeded) now raise an alert, and a sweep checks the database every fifteen minutes for learners stuck mid-flow, with a watchdog on every scheduled job so a sweep that stops running no longer looks identical to a healthy one. For the last month, every incident was found because a person went looking. No recordings or clinical content go to the monitoring tool, only identifiers and error shapes.",
      "The organization and admin session lists and cohort views got noticeably lighter. They no longer send the full transcript of every session to the browser just to draw a list, and sorting by status now sorts by what the status column actually shows.",
      "Fixed a real gap on the admin project pages: in an organization with more than fifty members, anyone past the fiftieth simply couldn't be added to a project, with nothing on screen to explain why.",
      "A learner deleting their own session no longer registers as a system error, so alerting stays focused on genuine problems. The organization roster export also stopped losing pre-simulation survey answers from learners whose session failed to connect.",
      "Our two databases now have the same locked-down configuration, written down in code. Staging and production had drifted apart because part of production's protection was switched on by hand rather than shipped through our normal update process, so it existed on one environment and in no reviewable form. Both are now converged on the stronger setting, every table is closed to outside access by default, new tables inherit that automatically, and one check confirms any environment's posture on demand. It runs on every code change, so the drift can't quietly return.",
      "The Slack support bridge stopped doing unnecessary work and is now visible when something's wrong. Slack was sending us activity from every channel our bot belongs to, so harmless chatter in the metrics and signup channels landed on the support handler and logged warnings that looked like real failures. It now ignores other channels before touching the database. Three failure modes that used to return silently, most importantly a missing security credential that threw away every reply the team sent, now log clearly, and our internal status page shows the Slack connection, which channels are configured, and whether the bot is actually in the support channel. No tokens or secrets are ever displayed.",
      "A whole tier of our automated tests was running nowhere. Thirty-four test files that need a real database only ran when someone happened to have one configured locally, so no continuous-integration job ever executed them, and fifteen tests across seven files had quietly broken. They cover the expensive things: keeping one organization's data invisible to another, the rules behind our internal metrics, voice-retention consent filtering, and email eligibility. The stale tests were repaired (no product bug, the tests were out of date) and they now run on every change. Separately, the browser-test setup step that intermittently hung for 25 minutes and then reported a fake failure now fails fast with the real cause named.",
      "Our development tooling had been guessing at the project's root directory and getting it wrong, which affects how files are packaged for deployment. It's now pinned explicitly, with the reasoning recorded in place so nobody tidies it back into the version that builds green and then fails on the first real request.",
      "Internal engineering documentation was reorganized so agents and new contributors read all of it. Three deep reference guides (LLM token accounting, voice-recording retention, and the consent-gated training export) became standalone documents, and the long-form duplicates came out of the main project guide. That also fixed a genuine problem: one of our coding assistants had been silently reading only the first third of that guide, dropping the sections on commit and pull-request discipline, the third-party vendor registry rule, and most of the privacy-relevant contracts.",
    ],
  },
  {
    id: "2026-08-18",
    date: "2026-08-18",
    userFacing: [
      "**Your written feedback is complete, start to finish.** On simulations graded against very detailed rubrics, the narrative report could stop mid-sentence, sometimes losing the last few items and the overall impression, with no sign anything was missing. We found it, fixed the underlying limit, and added a check that refuses to hand you a half-written report.",
      "**Surveys are much easier to read and finish.** The post-simulation survey has been rebuilt to match the rest of the app: numbered questions, clear \"required\" and \"optional\" labels, generous tap targets, plain-language errors that jump you to the field needing attention, and answers that survive a retry. It fits a phone screen without sideways scrolling, and finishing a post-simulation survey now lands you directly on that encounter's feedback instead of a dead end.",
      "**Study and program teams can receive results on their own paper form.** For programs that assess presentations on an established observation checklist, we can now hand back each learner's attempt rendered on that exact form, one page per attempt, every behavior marked in its frequency band. Getting there meant sharpening the underlying assessment so it scores all 22 behaviors individually rather than four broad rollups, correctly recognizes a parent as the family, marks a genuinely absent participant as not applicable instead of scoring a zero-effort 1, and never invents a scoring scale of its own.",
    ],
    team: [
      "The admin dashboard is navigable instead of a set of dead ends. Organization, learner, and simulation names across conversation details, grids, tables, and detail pages are now links to those records, with \"View conversations (N)\" backlinks and missing breadcrumbs filled in, so you can pivot from a run to the learner who did it without retyping a name into a search box. Row clicks still open the conversation as before, and none of these internal links leak onto org or learner pages.",
      "We get warned before voice minutes run out. A check every six hours reads the remaining ElevenLabs credit balance and posts one Slack message plus one email when the pool newly drops past 20%, then 10%, then empty. One alert per step, re-arming itself each billing month, so a fast burn is one message rather than three. The admin status page shows the same numbers on demand. Configure the recipients in production only: staging and production share the account, so two configured environments would double-notify.",
      "Rubrics in the admin list now sort by when they were last edited, newest first, with the original creation date kept in a tooltip. Much faster for finding what you or a collaborator touched most recently.",
      "Production database credentials can no longer be picked up from a file sitting in someone's local checkout. The one operator script that writes to production reads its credential from the command line only, and says so plainly when it's missing. Staging convenience is unchanged. Our docs and our code now agree on the rule, and the rule is enforced rather than assumed.",
    ],
  },
  {
    id: "2026-08-10",
    date: "2026-08-10",
    userFacing: [
      "**The pre-simulation survey loads reliably again.** A dropdown on the short survey that appears before a case could stop the page from loading at all. That's fixed, so you can answer the questions and get straight into the encounter.",
    ],
    team: [
      "The Slack metrics dashboard posts its trend chart dependably. Slack takes a few seconds to register a newly shared image, so the update now waits for the image to settle and tries again before giving up. No more dashboards that appear and vanish a moment later.",
      "The chart's labels and numbers render in the right typeface. The machine that draws the chart in the background was missing the font it needed, so the text came out wrong. The font now ships with it.",
    ],
  },
  {
    id: "2026-08-09",
    date: "2026-08-09",
    note: "Reliability work on the new Slack metrics dashboard. Nothing changes for learners or program leads.",
    userFacing: [
    ],
    team: [
      "Fixed the two failures that kept the Slack metrics dashboard from ever posting. The chart image is now accepted when it's sent to Slack, and it's shared into the dashboard message's own thread so it can be displayed, where before it stayed private and Slack refused to show it. Failed runs also clean up after themselves instead of leaving a stray, chartless message in the channel.",
    ],
  },
  {
    id: "2026-08-08",
    date: "2026-08-08",
    userFacing: [
    ],
    team: [
      "The team's key business numbers now live in Slack. One pinned message mirrors the four headline metrics from the internal metrics page, refreshed as simulations are completed, alongside a 12-week trend chart of completed encounters that's redrawn each morning. It reuses the same metric definitions as the internal dashboard, so there's one source of truth rather than two, and any Slack hiccup is isolated from simulation processing and grading.",
      "Announcement emails now require choosing an audience up front. Whoever sends a broadcast has to pick either all verified users or the leadership of active customer organizations, so a wide announcement can't reach the wrong group by omission.",
    ],
  },
  {
    id: "2026-08-07",
    date: "2026-08-07",
    userFacing: [
      "**Your attempt history only shows sessions you actually started.** Opening a case briefing that begins with a short pre-survey used to create an attempt right away, so cases you looked at but never spoke in could linger as \"In progress\" on your history and count against your attempt totals. An attempt is now recorded only once the voice conversation genuinely begins, and the stray records from before have been cleaned up. Program directors see the same correction on their cohort views, progress reports, and exports.",
      "**Bulk invitation actions work on any size list.** Resending or revoking invitations for a large group, including select-all over hundreds or thousands of pending invites, now works instead of failing with a technical error. The button shows live progress (\"Resending 100/250...\") so you can see how far along a large batch is, and your selection is no longer silently lost when you switch between the \"expired only\" and \"show all\" views.",
    ],
    team: [
      "Grading got meaningfully cheaper without changing a single score. The large, unchanging instructions the grader reads on every pass are now reused between grades rather than paid for from scratch each time, worth roughly a third off our AI feedback bill. The grader reads word for word what it read before, so nothing about the feedback learners receive changes.",
      "We now keep our own durable record of every AI request the platform makes: how large it was, which model answered, how long it took, and which conversation, organization, and simulation it belonged to. Before this we had only a rough seven-day window from a third-party tool, which is how we learned our costs were higher than they needed to be from a vendor email rather than from our own numbers.",
      "A new internal cost page shows what we're spending on AI, broken out by day, by stage of grading (narrative feedback, score extraction, and the other behind-the-scenes uses), and by organization, plus how often the reused-instruction savings above are actually landing. Trial and internal organizations are deliberately included, since we pay for their usage too.",
      "Pinned the version of one deployment tool used to push to production, after a new release of it started rejecting valid inputs and could have blocked a production deploy at the worst moment.",
    ],
  },
  {
    id: "2026-08-04",
    date: "2026-08-04",
    note: "This release adds a developmental rating below Level 1.",
    userFacing: [
      '**Milestone ratings can now record performance below Level 1.** Reports and progress views now show "Not yet at Level 1" when the evidence does not meet the Level 1 descriptor. The rating appears as a neutral developmental starting point and does not change rubrics that use the standard 1 to 5 scale.',
    ],
    team: [
      "The internal metrics dashboard now opens with a fixed \"All time\" section: total users ever signed up (with how many sit in a live customer organization), all-time completed conversations of two minutes or more, total practice time in those conversations, and the count of live customer organizations. These are the numbers we set company goals against, so they're built to ignore the page's date-range and duration filters entirely; the existing period-scoped triage view below them is untouched.",
      "Supporting the milestone change, several places in analytics quietly assumed every milestone scale starts at Level 1, and one of those assumptions would have silently switched off the scenario-ceiling feature for any rubric carrying the new floor rating. All of them now handle a below-Level-1 score correctly, with tests pinning the behavior.",
    ],
  },
  {
    id: "2026-08-03",
    date: "2026-08-03",
    note: "This release makes the pre-session connection check genuinely useful for learners on locked-down hospital networks, and it hardens the email and invitation machinery behind the scenes: faster batched sending, pending invitees visible and nudgeable from each organization's admin page, and invitation reminders that now survive a resend.",
    userFacing: [
      '**The connection test now catches blocked networks, not just slow ones.** The "Test Your Connection" button on the simulation briefing page used to measure internet speed alone, so a learner whose hospital firewall was silently blocking the voice service would be told everything looked fine. The test now also checks whether your network can actually reach the voice service, and when it can\'t, it says so plainly and tells you exactly what to ask your IT team to allow (these blocks almost always come from a corporate firewall, VPN, or web filter). The check is advisory only: it never stops you from starting a session, it just lets you diagnose the problem in the moment instead of filing a support ticket.',
    ],
    team: [
      "Campaign and broadcast emails now go out in batches of up to 100 per request instead of one at a time, so a broadcast to every verified user that used to take minutes now takes seconds. The bookkeeping around each batch also got tighter: a retry can never double-send, delivered recipients are recorded in a single database write, and any failure we can't attribute to a specific address is held for human review rather than guessed at.",
      "Platform admins can now see and act on pending invitations right from an organization's metrics page: totals for sent, accepted, and outstanding invitations, plus the full pending list with resend, copy link, and revoke actions, individually or in bulk. Invited-but-not-yet-joined people used to be invisible on that page, and nudging one meant switching to a different screen. Expired invitations sort to the top, and resending one revives the same link with a fresh expiry.",
      "Resending an invitation now earns the recipient a fresh signup reminder. Each invitation used to get at most one reminder ever, so someone an admin re-invited weeks later never heard from us again unless they acted on the resend itself. Now every resend re-enrolls the invitation for exactly one more reminder three days after the new invite email, and we verified against production data that nobody who was already reminded gets a duplicate. The \"expires in N days\" line in those reminders is also now computed in a way that can't drift with server timezones.",
      "Failed or inconclusive connection tests now report to our error monitoring, so a pattern like one organization failing repeatedly for a week surfaces on our side within days instead of waiting for a support ticket.",
    ],
  },
  {
    id: "2026-08-01",
    date: "2026-08-01",
    note: "An internal maintenance release: nothing visible changed in the product, but the email system got meaningfully safer ahead of the first live reminder sends.",
    userFacing: [],
    team: [
      'Fixed a timing bug in the upcoming invitation-reminder email before its first live send. Reminders were keyed off when an invitation was first created, so an old invitation that an admin had just re-sent would get the "a few days ago you were invited" reminder the very next day. Reminders now key off when an invite email actually last went out, which means any resend resets the clock. A production dry run showed about 69% of the audience would have gotten a badly timed reminder, and because the campaign is still in dry-run mode, nothing incorrect ever reached an inbox.',
      "The system that stops us from re-mailing addresses that bounce or mark us as spam now has full automated test coverage, and we fixed the pipeline configuration so those tests actually run on every change instead of silently skipping.",
      "Repaired a safeguard test that pins exactly which data the history page loads (it keeps heavy transcript data out of a query that runs every few seconds), which had gone stale after a recent change.",
    ],
  },
  {
    id: "2026-07-31",
    date: "2026-07-31",
    note: "This release cleans up after a class of failure we hadn't handled: voice sessions that die at connect and leave nothing behind. Learners on an unsupported browser now find out before they start, sessions where nobody spoke no longer produce feedback or scores, and those empty sessions stop dragging down everyone's numbers.",
    userFacing: [
      "**We tell you up front if your browser can't run a voice session.** An older browser can break the microphone check the voice service depends on, and the session dies a few seconds after it starts. One learner hit this nine times in a row, and the error told them nothing useful. It read like a network problem, so they went looking at their Wi-Fi. The briefing page and the direct session link now check before you begin, and if your browser can't support voice you get a clear banner saying so with Start disabled. If a session does fail this way, the message names the real cause instead of sending you after your network.",
      "**A session where you never spoke no longer pretends to be feedback.** When a session died at connect, the recording still went through the whole feedback pipeline, so it got graded, and your history showed \"Feedback ready\" on an encounter that never happened. Those sessions are now recognized as empty and skipped, which means no grading, no scored feedback, and a neutral \"No feedback\" label in your history. Open one and it says plainly that the session ended before any conversation took place. Feedback you already have is untouched.",
      "**Your scores and progress no longer count sessions you never spoke in.** This is the change with the widest reach. Because those dead sessions were being graded and the grader had no dialogue to assess, they came back at the lowest possible level, and they counted. In our own testing, one in ten completed grades was one of these, spread across most learners, and every one pulled down that learner's competency levels, their improvement trend, and the peer comparison everyone else is measured against. They inflated the counts too: runs, active learners, simulations attempted, streaks, active days, repeat and completion rates. All of those now exclude sessions with no learner speech. This applies to past work as well as new, so the corrected numbers appear as soon as it's live, with nothing to re-run.",
    ],
    team: [
      "Regrading an empty conversation from the admin tools is now refused outright, with a clear reason, before anything gets queued. The same junk grades can't be recreated by hand.",
      "The rule for \"did the learner actually speak\" has to exist in two places, one deciding what gets graded and one deciding what gets counted, and they now share a single set of test cases that fails if they ever disagree. Two duplicate copies of the database-side rule landed on parallel branches and have been consolidated into one, with no change in behavior.",
    ],
  },
  {
    id: "2026-07-30",
    date: "2026-07-30",
    note: "This release is about seeing your work clearly: assignments organized by project, cohort progress on every project card, feedback-first conversation pages with a sticky jump nav, and filters on your conversation history.",
    userFacing: [
      "**Your assignments are now organized by project.** Learners assigned to more than one project used to see one undifferentiated pile of cards. My Assignments now groups everything under a project header with the project's color, its due date shown once, and a completion bar, with finished work collapsed per project so what's left to do stays front and center.",
      "**Program leads can see cohort progress at a glance.** Each card on the Projects page now shows how many learners have completed the work and how many are overdue, plus the learner count and the project's default due date. The numbers match the project detail page exactly, so there's no reconciling two views.",
      "**Feedback comes first on conversation pages.** The conversation detail pages now lead with your feedback instead of burying it below the briefing and transcript, and a sticky navigation bar jumps you straight to Feedback, Transcript, Briefing, EPAs, or References. Jumping lands the section right under the bar, keeps the chip highlighted, and briefly flashes where you landed so your eye doesn't have to hunt. We also removed a section that appeared twice on every page and made the expand/collapse arrows behave the same everywhere.",
      "**A \"Run It Again\" button right after your feedback.** Repeat attempts are where skill gain shows up, and the moment you've just read what to work on is the natural time to try again. The learner feedback page now links straight back to that simulation's briefing (the button only appears while you're still able to run it).",
      "**Find conversations faster.** My Conversations now has simulation and project filters matching the organization view, shows the project on each row, and loads noticeably faster because the list stopped downloading full transcripts behind the scenes. The per-row expander, which mostly repeated a link the row already had, is gone.",
      "**Dropdown menus you can actually read.** Option panels used to be pinned to the width of the narrow filter button that opened them, cutting simulation names to about 24 characters (\"Adolescent Suicide Risk …\"). Panels across the app now grow to fit their content, and the filter pickers announce their current selection to screen readers instead of just their label.",
      "**A clear message when a network blocks the voice connection.** Learners on hospital or corporate Wi-Fi sometimes have the voice connection cut off by a security filter before the session starts, and until now the error named no cause and suggested no action (one learner retried 21 times over three days). When we can tell that's what happened, the message now says so and explains what to do: try a different network, or ask IT to allow the voice service, with the connection test on the briefing page to confirm.",
      "**Scores display against the rubric's real scale.** A rubric graded 1 to 3 could display out of 5, so a near-perfect performance read as 55% instead of 92%. Score bounds now come from the rubric's own rating anchors, so existing feedback displays correctly without regrading, and the editor can no longer produce a mismatched scale.",
    ],
    team: [
      "Our own internal organization's runs no longer count in the customer-success roll-ups or the weekly digest, so enrolled learners, runs, time spent, and every health ratio now reflect real customers only. Internal orgs stay inspectable through their drill-down page, which carries an \"Internal\" badge, and an unreadable green in the metrics display was fixed along the way.",
      "Added tests that pin the conversation status badge to the exact set of statuses the database allows, verified against the original bug, so a live conversation can never again show a raw internal value to a learner.",
      "Fixed the browser-verification tooling so it runs on macOS, not just inside the dev container.",
      "Corrected code comments that wrongly claimed deactivated simulations are hidden from the catalog. They stay visible (with their Inactive badge) but can't be run, and the comments now say so.",
    ],
  },
  {
    id: "2026-07-28",
    date: "2026-07-28",
    userFacing: [
      "**A clearer sidebar.** Your personal items (My Progress, My Assignments, My Conversations) are grouped together and set apart from your organization's shared tools, so it's easier to tell \"mine\" from \"ours\" at a glance. We also renamed \"History\" to \"My Conversations\" so it's obvious what you'll find there.",
      "**A real Settings page.** Settings is now one place instead of two hard-to-find pages. You can change your password, see which version of our Privacy Policy and Terms you accepted and when, and manage your privacy preferences, including opting out of voice-data use for training and requesting deletion of your own voice recordings.",
      "**Your simulation list now matches your assignments.** Members see only the simulations assigned to them through their program's projects, rather than everything their organization can access. If something you expect to see is missing, check with your project manager. It likely just needs to be assigned to you.",
      "**My Assignments is now grouped by project.** If you're in more than one project, your simulations are grouped under each project's own header, with the due date and completion progress shown once instead of repeated on every card. Completed simulations tuck behind a \"show completed\" toggle so active work stays in view.",
      "**A weekly progress email for project managers and org admins.** Each week, you'll get a summary for every project you manage: completed runs, time spent, and which competencies are trending up or need attention, plus a quick link to book time with our team.",
    ],
    team: [
      "Fixed a crash in the admin content tools: the \"Save Draft\" comparison view (and similar diff views) could fail to render, and now works reliably.",
      "The admin invitations page now shows expired invitations first by default, with count badges, so backlog is visible at a glance.",
      "Closed a gap in our sign-in system that could have let certain account-management requests bypass our normal safeguards. No learner action needed.",
      "Strengthened the safeguards in our content-sync tool (how we move simulations and rubrics from staging into production) so it can't act on stale information.",
      "Fixed a broken experience for platform administrators who aren't part of an organization. They now see a clear message and working navigation instead of blank pages.",
      "Added better diagnostics for voice-call connection failures, so our team can tell a network problem from an application problem and resolve reports faster.",
      "Refined the \"Completed\" counts on our internal usage dashboard to filter out very short, abandoned sessions, so the numbers better reflect real activity.",
      "Fixed a display bug on My Assignments where a simulation still being graded could show \"0 attempts\" even though the learner had completed it.",
      "Added internal tooling and fixed a memory issue in our development environment, helping the team build and test changes more reliably.",
    ],
  },
  {
    id: "2026-07-24",
    date: "2026-07-24",
    userFacing: [
      "**Browse the full case library in-app.** Program managers and above get a new Catalog page to explore every simulation on the platform, filter by specialty and competency, and grant their organization access to the cases they want to use.",
      "**A friendly nudge for new learners.** People who sign up but haven't run a simulation yet now get a short, encouraging \"run your first case\" email series. It's gently spaced out and stops the moment they complete their first simulation.",
      "**No more lost work in dialogs.** You're now asked to confirm before closing a dialog that has unsaved changes, so a mistaken tap can't discard what you were doing.",
    ],
    team: [
      "New admin Email page that shows expired invitations across every organization in one place, with bulk resend and suppression management, and sortable columns.",
      "The admin conversation page now shows the full feedback report, matching exactly what learners see.",
      "Simulations can be tagged by patient population: adult, pediatric, or both.",
      "Fixed a database migration ordering issue.",
      "Internal documentation and tooling housekeeping.",
    ],
  },
  {
    id: "2026-07-23",
    date: "2026-07-23",
    userFacing: [
      "**Cleaner forgot-password screen.** Fixed spacing on the password-reset card.",
    ],
    team: [
      "Rubric editing: you can now start a new draft pre-filled from the latest published version instead of from scratch.",
      "Grading-prompt authoring: added a gentle warning that flags leftover boilerplate, and clarified across our authoring guides that a grading prompt should define the rubric only.",
      "Expanded our library of Entrustable Professional Activities (Transplant Hepatology and General Pediatrics).",
      "Laid groundwork for keeping clinical content consistent and in sync.",
      "Quieted a harmless onboarding error.",
    ],
  },
  {
    id: "2026-07-15",
    date: "2026-07-15",
    userFacing: [
      "**Manage invitations in bulk.** Org leads can now bulk-resend, copy invite links, and revoke invitations that are still pending, all from one place.",
    ],
    team: [
      "Invitation emails no longer include an unsubscribe header, since they're personal 1:1 messages rather than marketing.",
      "Made the in-app support chat's connection to our team more resilient, and added lightweight tracing to help diagnose issues.",
    ],
  },
  {
    id: "2026-07-14",
    date: "2026-07-14",
    userFacing: [
      "**Find the right simulation faster.** The dashboard now has search, tag filters, and a favorites star so you can pin the cases you run most.",
      "**Built for program directors.** The dashboard surfaces ACGME ICS Milestones and lets you drill down by specialty and then competency to focus on exactly what you're assessing.",
      "**Know how you'll be graded, everywhere.** The \"How You'll Be Assessed\" summary now appears consistently across the briefing and feedback screens.",
      "**A rebuilt workflow for org leads.** Creating and managing projects is now a full-page, guided flow. You can add simulations inline, filter a project's conversations by member, and apply a date range to the milestone cohort view. Invite links now accept automatically, and inviters can copy a ready-to-share link.",
    ],
    team: [
      "New customer-success dashboard: engagement trends over time, account health, and per-organization drill-down, with trial and deleted organizations excluded so the numbers reflect real customers.",
      "Admin authoring: a markdown write/preview toggle on learner-facing simulation fields, and a first-class Entrustable Professional Activities (EPA) entity you can assign to simulations, with framework filters and a \"Rubrics & EPAs\" label.",
      "Sign-on hardening: invitations now reconcile roles, auto-consume on acceptance, and a watchdog cleans up stranded invites.",
      "Reliability and polish: quieted false alarms in our error tracking, fixed a usage-metrics date bug, added timeouts to our automated test pipeline, a dependency update, and a round of text-wrapping and mobile-layout fixes.",
    ],
  },
  {
    id: "2026-07-09",
    date: "2026-07-09",
    userFacing: [
      "**See your usage and engagement.** A new section on your Progress page shows how much you've practiced, time spent, your streak, and how your scores are improving over time.",
      "**A clearer Progress page.** The single \"overall level\" number is gone in favor of plain-language explanations of each chart, so the page tells a story instead of a score.",
      "**Set time goals per project**, tracked with a simple circular progress ring.",
      "**A Settings hub for org leads** to manage benchmarks and time goals in one discoverable place.",
      "**Re-grade against the latest.** Org leads can re-evaluate a conversation, which re-grades every rubric against the current version and shows the latest result per rubric.",
      "**Better on a phone.** Mobile-friendly org navigation, larger tap targets, and long emails no longer overflow the sidebar.",
    ],
    team: [
      "Fixed a case where invitees could be dropped when signing up through a logged-out invite link.",
      "Added demo data for the milestone dashboard.",
    ],
  },
  {
    id: "2026-07-05",
    date: "2026-07-05",
    userFacing: [
      "**Reminder emails are live.** ClinicalSim can now send helpful nudges, with notification preferences, a settings page, and a genuine one-click unsubscribe.",
      "**On-brand email.** Every email now carries the ClinicalSim visual treatment.",
    ],
    team: [
      "Hardened email deliverability so messages stop landing in spam, and added automatic suppression handling.",
      "Batched bulk invitations so large sends no longer hit rate limits.",
      "Fixed timestamps for manually re-run scheduled tasks.",
      "Fixed invitees being dropped at sign-in on logged-out invite links.",
    ],
  },
  {
    id: "2026-07-02",
    date: "2026-07-02",
    userFacing: [
      "**Consistent conversation detail.** Your learner history now opens the same rich conversation and feedback view that org leads see.",
      "**Better citations.** The References field on simulations gained AMA-style citation guidance and a gentle (non-blocking) formatting check.",
      "**Fewer layout glitches.** Long values in dropdowns and dialogs now truncate cleanly instead of overflowing.",
    ],
    team: [
      "Fixed a sign-in issue for users without an active organization.",
      "Made the admin simulations table sortable by column.",
      "Published the References content.",
    ],
  },
  {
    id: "2026-07-01",
    date: "2026-07-01",
    userFacing: [
      "**More control over the public catalog.** Whether a simulation appears in the public catalog is now a dedicated setting, separate from its general visibility.",
      "**A smoother start for new sign-ups.** People who sign up without an organization now land in a shared trial space and \"graduate\" cleanly into a real organization when they join one.",
      "**Smarter search.** Search now matches entity IDs across the app, not just names.",
      "The subprocessors page is now publicly accessible.",
    ],
    team: [
      "Admin bulk editing of a simulation's organization, visibility, and owner, plus a Public column. Bulk actions now accept all organization ID formats.",
      "A pipeline to publish example feedback to the marketing website.",
    ],
  },
  {
    id: "2026-06-30",
    date: "2026-06-30",
    userFacing: [
      "**A polished public catalog.** The catalog was redesigned as a clean card grid, and each card's scenarios now expand for a closer look, without content spilling out of the card.",
    ],
    team: [
      "Admin simulations directory is now sortable by column and by most recently edited.",
      "Tightened organization-level access controls, and sped up a batch of queries.",
      "Added an authoring rule that keeps AI patients sounding natural.",
    ],
  },
  {
    id: "2026-06-29",
    date: "2026-06-29",
    note: "This release covered about two weeks of work and was one of the largest of the period.",
    userFacing: [
      "**A redesigned Feedback Report.** Feedback now leads with a clear narrative and the key visual, in ClinicalSim's brand colors, with a readable legend, on-demand recording playback, de-duplicated evidence, and a \"How to read this feedback\" guide that explains when a competency couldn't be assessed.",
      "**A redesigned Progress page** built around milestones, with clearer charts, helpful hover tooltips, and cards that behave on mobile.",
      "**A public simulation catalog** at /catalog, with tag filtering and search.",
      "**In-app support chat.** Get help without leaving the app. Messages route straight to our team, and if no one replies within 10 minutes they escalate by email so nothing slips through.",
      "**Fairer milestone scoring.** When a single encounter physically can't demonstrate the higher levels of a competency, that competency is still shown but fairly held out of the overall score, so a strong trainee isn't misread as underperforming.",
      "**Updated consent and terms.** Added clear consent for voice/biometric data and admin-visibility, and published Terms of Service v2.0.",
      "Milestones now appear in the org sidebar, and admins can regenerate feedback against the latest rubric and simulation versions.",
    ],
    team: [
      "Grading quality: moved to a consistent two-step grading approach on our best model, added a fairness preamble so rubric feedback is even-handed, introduced clear \"not assessable\" wording, and fixed a case where the grader could score the wrong speaker.",
      "Email: further deliverability hardening with bounce/complaint suppression, and send failures now surface instead of being swallowed.",
      "Admin rubric tooling: a searchable rubric picker, bulk publish, clearer separation of ACGME milestones from other rubrics, and raising the per-simulation rubric limit from 5 to 7.",
      "Authoring and voice: new voice-design, framework-to-rubric, and staging-write guides, a pronunciation dictionary, and opt-in WebRTC for voice sessions.",
    ],
  },
  {
    id: "2026-06-15",
    date: "2026-06-15",
    userFacing: [
      "**Organize simulations with tags.** A new tagging system (with bulk tagging) makes the growing library easier to search, and the learner dashboard now hides simulations that aren't published yet.",
      "**Structured briefings everywhere.** The structured briefing now renders even on older simulations that only had a prose description.",
    ],
    team: [
      "A large internal architecture cleanup: clearer layer boundaries, stronger organization-level data isolation, a dedicated data-access layer, locked-down published versions, and better request logging. It's invisible to users, but it makes new features safer and quicker to build.",
      "Admin rubrics gained search, category and draft filters, pagination, and per-row/bulk delete, plus an import of ACGME milestones merged into one rubric per sub-competency.",
      "New-signup notifications, error monitoring, a voice SDK upgrade, new authoring guides, and continuous-integration improvements.",
    ],
  },
  {
    id: "2026-06-09",
    date: "2026-06-09",
    userFacing: [
      "**A better history view.** Your simulation history is now a sortable, expandable table, with the option to delete entries individually or in bulk.",
      "**A sharper profile.** Specialty options are now scoped to clinical roles, with a searchable medical-school dropdown.",
    ],
    team: [
      "Admins can delete rubrics individually or in bulk.",
      "Conversations now record duration information, and our continuous-integration pipeline moved to Node 24.",
    ],
  },
]

// Anchor ids have to be unique: the copy-link buttons and the hash handler both
// resolve by getElementById, so a duplicate silently sends readers to the wrong
// release. Runs at module load, which means an authoring slip fails the build
// rather than shipping.
const seenReleaseIds = new Set<string>()
for (const release of releases) {
  if (seenReleaseIds.has(release.id)) {
    throw new Error(
      `lib/release-notes.ts: duplicate release id "${release.id}". Give the second one a suffix, e.g. "${release.id}-b".`
    )
  }
  seenReleaseIds.add(release.id)
}

// The newest release dates the page: the visible "Last updated" line, the
// WebPage dateModified, and the sitemap lastModified for /help/release-notes.
export const RELEASE_NOTES_UPDATED_ISO = releases[0].date
