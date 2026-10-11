import { ChevronDown } from "lucide-react"

// Previously published accounts; long dashes normalized to site punctuation.
const RESIDENT_REFLECTION = {
  pullQuote:
    "Rather than feeling compelled to immediately define \"goals of care\" or guide the conversation toward a particular medical decision, I was able to slow down and truly listen.",
  paragraphs: [
    "As I stood beside the interpreter, waiting for them to translate our response to the many fears this mother had just shared, I was struck by how familiar the conversation felt. Just a few weeks earlier, I had participated in a remarkably similar conversation, but that one did not involve a real mother or a real child suffering from a life-threatening illness. Rather, it was an AI-generated clinical simulation. The simulation, along with the feedback that followed, had prepared me to approach this encounter differently. I found myself more attuned not only to listening to this mother's fears, worries, and hopes, but also to validating and holding space for them. Rather than feeling compelled to immediately define \"goals of care\" or guide the conversation toward a particular medical decision, I was able to slow down and truly listen. I focused on understanding what a meaningful life looked like for her daughter and what mattered most to her as a mother, even when those priorities might not have aligned with what I would have initially considered the first-line \"medical\" recommendation.",
    "In reflecting, I realized the value of ClinicalSim extended far beyond practicing communication skills in a simulated environment. It had changed the way I approached a real, difficult conversation with a family and overall strengthened my ability to better listen to, support, and advocate for families navigating profoundly difficult circumstances.",
  ],
  attribution: "Resident physician, ClinicalSim user",
} as const

export function ClinicianTestimonials() {
  return (
    <section id="clinician-reflections" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-light text-cs-navy">From clinicians who have used ClinicalSim</h2>
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <div className="absolute -left-2 -top-2 text-6xl font-sans text-cs-dark-blue/20 md:-left-4">
                &quot;
              </div>
              <blockquote className="relative pl-8 pt-4">
                <p className="mb-4 text-2xl font-light leading-relaxed text-cs-dark-blue md:text-3xl">
                  I just tried it out and it was like talking to a real patient.
                </p>
                <cite className="border-l-4 border-cs-dark-blue pl-4 text-base font-normal not-italic text-cs-dark-blue/70">
                  Faculty, Johns Hopkins University School of Medicine
                </cite>
              </blockquote>
            </div>

            <div className="relative mt-12 md:mt-16">
              <div className="absolute -left-2 -top-2 text-6xl font-sans text-cs-dark-blue/20 md:-left-4">
                &quot;
              </div>
              <blockquote className="relative pl-8 pt-4">
                <p className="mb-4 text-xl font-light leading-relaxed text-cs-dark-blue md:text-2xl">
                  It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.
                </p>
                <cite className="border-l-4 border-cs-dark-blue pl-4 text-base font-normal not-italic text-cs-dark-blue/70">
                  Clinician, Pilot Study Participant
                </cite>
              </blockquote>
            </div>

            <div className="relative mt-12 md:mt-16">
              <div className="absolute -left-2 -top-2 text-6xl font-sans text-cs-dark-blue/20 md:-left-4">
                &quot;
              </div>
              <blockquote className="relative pl-8 pt-4">
                <p className="mb-4 text-xl font-light leading-relaxed text-cs-dark-blue md:text-2xl">
                  I had to tell a patient&apos;s father that his daughter would need long-term oxygen support through a tracheostomy. Before speaking with him, I practiced the conversation on ClinicalSim. It gave me confidence and feedback on my tone and delivery. Having difficult conversations can be extremely stressful, but having the practice beforehand allowed me to give appropriate time for silence and empathy.
                </p>
                <cite className="border-l-4 border-cs-dark-blue pl-4 text-base font-normal not-italic text-cs-dark-blue/70">
                  Nurse practitioner, major health system
                </cite>
              </blockquote>
            </div>

            <figure className="mt-12 rounded-2xl border border-cs-gray/60 bg-cs-cloud/60 p-6 md:mt-16 md:p-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-wide text-cs-dark-blue/70">
                A resident&apos;s reflection, weeks after a practice simulation
              </p>
              <blockquote className="border-l-4 border-cs-dark-blue pl-5 md:pl-6">
                <p className="text-xl font-light leading-relaxed text-cs-dark-blue md:text-2xl">
                  {RESIDENT_REFLECTION.pullQuote}
                </p>
              </blockquote>
              <details className="group mt-6">
                <summary className="flex cursor-pointer list-none items-center gap-2 font-medium text-cs-dark-blue transition-colors hover:text-cs-navy [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Read the full reflection</span>
                  <span className="hidden group-open:inline">Hide the full reflection</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <blockquote className="mt-5 space-y-4 border-t border-cs-navy/15 pt-5">
                  {RESIDENT_REFLECTION.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base font-light leading-relaxed text-cs-dark-blue md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </blockquote>
              </details>
              <figcaption className="mt-6 text-base text-cs-dark-blue/70">
                {RESIDENT_REFLECTION.attribution}
              </figcaption>
            </figure>
          </div>


      </div>
    </section>
  )
}
