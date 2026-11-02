import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { featureVideos } from "@/lib/videos"

const description =
  "Watch ClinicalSim feature walkthroughs with written summaries and transcripts. Learn how to create projects, assign simulations, and set practice goals."

export const metadata: Metadata = {
  title: "ClinicalSim video library",
  description,
  alternates: { canonical: "https://clinicalsim.ai/videos" },
  openGraph: {
    title: "ClinicalSim video library",
    description,
    url: "https://clinicalsim.ai/videos",
  },
  twitter: { title: "ClinicalSim video library", description },
}

export default function VideosPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "ClinicalSim video library",
            description,
            url: "https://clinicalsim.ai/videos",
            dateModified: PAGE_DATE_MODIFIED.videos,
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai/" },
              { "@type": "ListItem", position: 2, name: "Video library", item: "https://clinicalsim.ai/videos" },
            ],
          },
        ]}
      />
      <section className="bg-cs-dark-blue px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-medium text-cs-electric">Feature walkthroughs</p>
          <h1 className="max-w-4xl text-4xl font-light tracking-tight md:text-6xl">ClinicalSim video library</h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-cs-cloud">
            See how to set up simulation practice for your learners. Watch a walkthrough or read the transcript at your own pace.
          </p>
          <nav aria-label="Videos on this page" className="mt-8 flex flex-wrap gap-3">
            {featureVideos.map((video) => (
              <a key={video.slug} href={`#${video.slug}`} className="rounded-md border border-white/40 px-4 py-3 text-sm font-medium transition-colors hover:bg-cs-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-electric">
                {video.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16 md:px-12 md:py-20">
        {featureVideos.map((video) => (
          <article key={video.slug} id={video.slug} aria-labelledby={`${video.slug}-title`} className="scroll-mt-8">
            <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
              <div>
                <div className="aspect-video overflow-hidden rounded-xl bg-cs-dark-blue shadow-lg">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
                  <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:no-underline">
                    Watch on YouTube <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href={`#${video.slug}`} className="underline underline-offset-4 hover:no-underline">Link to this video</a>
                </div>
              </div>
              <div>
                <h2 id={`${video.slug}-title`} className="text-3xl font-light tracking-tight md:text-4xl">{video.title}</h2>
                <p className="mt-5 font-light leading-relaxed text-cs-dark-blue/85">{video.summary}</p>
                <h3 className="mt-6 font-medium">In this walkthrough</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-light leading-relaxed text-cs-dark-blue/85">
                  {video.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
            </div>
            <details className="group mt-8 rounded-xl border border-cs-gray/70 bg-cs-cloud/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-6 py-5 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-dark-blue [&::-webkit-details-marker]:hidden">
                Read the transcript
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="space-y-5 border-t border-cs-gray/50 px-6 py-6 font-light leading-relaxed text-cs-dark-blue/85 md:px-8">
                <p className="text-sm">Edited for clarity. Filler words and transcription errors have been removed.</p>
                {video.transcript.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </details>
          </article>
        ))}

        <aside className="flex flex-col gap-4 border-t border-cs-gray/60 pt-8 text-cs-dark-blue sm:flex-row sm:items-center sm:justify-between">
          <p className="font-light">Need help setting up your program?</p>
          <Link href="/help" className="font-medium underline underline-offset-4 hover:no-underline">Visit the help center</Link>
        </aside>
      </div>
    </>
  )
}
