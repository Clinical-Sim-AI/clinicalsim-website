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
// To add a release: prepend a new object and update RELEASE_NOTES_UPDATED_ISO.

export interface Release {
  /** Stable anchor id, e.g. "2026-07-24". */
  id: string
  /** ISO date for JSON-LD / sitemap recency. */
  date: string
  /** Human-readable date shown in the UI. */
  dateLabel: string
  /** Optional lead-in note for the release. */
  note?: string
  /** Learner- and program-facing changes. */
  userFacing: string[]
  /** Admin and behind-the-scenes changes. */
  team: string[]
}

// Drives the visible "Last updated" line, WebPage dateModified, and sitemap.
export const RELEASE_NOTES_UPDATED_ISO = "2026-07-24"

export const releases: Release[] = [
  {
    id: "2026-07-24",
    date: "2026-07-24",
    dateLabel: "July 24, 2026",
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
    dateLabel: "July 23, 2026",
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
    dateLabel: "July 15, 2026",
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
    dateLabel: "July 14, 2026",
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
    dateLabel: "July 9, 2026",
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
    dateLabel: "July 5, 2026",
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
    dateLabel: "July 2, 2026",
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
    dateLabel: "July 1, 2026",
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
    dateLabel: "June 30, 2026",
    userFacing: [
      "**A polished public catalog.** The catalog was redesigned as a clean card grid, and each card's scenarios now expand for a closer look, without content spilling out of the card.",
    ],
    team: [
      "Admin simulations directory is now sortable by column and by most recently edited.",
      "Fixed a cross-organization data-isolation issue, and sped up a batch of queries.",
      "Added an authoring rule that keeps AI patients sounding natural.",
    ],
  },
  {
    id: "2026-06-29",
    date: "2026-06-29",
    dateLabel: "June 29, 2026",
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
    dateLabel: "June 15, 2026",
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
    dateLabel: "June 9, 2026",
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
