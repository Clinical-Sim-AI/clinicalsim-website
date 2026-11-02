export interface FeatureVideo {
  slug: string
  youtubeId: string
  title: string
  summary: string
  topics: string[]
  transcript: string[]
}

// Add new walkthroughs here. Summaries and transcripts must come from the
// recording or a supplied transcript, rather than inferred product behavior.
export const featureVideos: FeatureVideo[] = [
  {
    slug: "creating-and-managing-projects",
    youtubeId: "85MrGad0Sa8",
    title: "Creating and managing projects",
    summary:
      "Organize simulations into a project and assign them to individual learners or a group. This walkthrough covers templates, custom case selection, learner invitations, due dates and reminders. It also shows how to set practice goals, require repeat attempts, add surveys, and give colleagues access as project managers.",
    topics: [
      "Choose a project template or build a custom set of simulations.",
      "Find cases by specialty, competency, or communication framework.",
      "Invite learners and set due dates with reminders.",
      "Set case order, practice time goals, and required completed runs.",
      "Add pre and post surveys and project managers.",
    ],
    transcript: [
      "In this video, I'm going to show you how to create projects on ClinicalSim. Projects are a group of cases that you can assign to an individual learner or a group of learners.",
      "I'll come over to Projects on the left-hand side and click New project. We have pre-built templates, including general pediatrics, NICU, and pediatric cardiology. Expect more of these to appear as we grow our case catalog. I can select one and view the cases, or I can create a custom project where I choose whatever simulations I'd like. You should use this if you're remediating a learner and you want them to run specific cases multiple times. We'll call this Test project two. We highly recommend setting due dates because we have reminders built into the platform that remind learners when they need to complete simulations.",
      "I can sort the simulations by specialty. If I wanted to see all the faculty cases, for instance, I could do that. I can also sort by the different competencies and communication frameworks we have on the platform. Here we see the Kalamazoo Essential Elements Communication Checklist. We've got a number of cases that incorporate that. I'll select these three and click Next to add people. I'll set my due date to the 30th.",
      "Here I can see or search through all the members of my organization and add them, or I can invite someone who hasn't yet joined the organization. When they sign up, they'll automatically be added to this project. For instance, if you created a new project and wanted all of your first-year residents to go into it, you could invite all of them from here and they would automatically be enrolled in that project.",
      "I'm going to select these three people to start. I'll click Create project, and then you'll see it right here. Once it's created, you also have the ability to make some adjustments. You can choose the order in which they take the cases, so I can move a case up or down.",
      "You can also set a time goal for learners: how long you want them to do this per month or per quarter. By default, nothing's on, but if you said, 'I want you to spend 15 minutes in simulation a month,' you can save that and see how they're doing toward that goal.",
      "Under Project setup, you can say how many required completed runs they must have. You could say, 'I need you to do this three times.' This can apply to all of the cases, or you can set a different run count for each individual case. You can also choose whether you want them to have extra practice.",
      "You can create surveys directly from here, so you can ask pre and post questions if you're working on research.",
      "At the end, you'd click Publish for new starters. That means new people who join this project will have these new settings.",
      "If you go to Settings and Projects, you can add managers. If you've got associate program directors, you'd be able to add them here as a manager. They'll be able to view the simulations or conversations, and they'll also be able to make changes to the projects.",
    ],
  },
]
