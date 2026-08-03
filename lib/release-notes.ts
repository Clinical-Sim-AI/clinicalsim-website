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
      "**Organize simulations with tags.** A new tagging system (with bulk tagging) makes the growing library easier to navigate, and the learner dashboard now hides simulations that aren't published yet.",
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
