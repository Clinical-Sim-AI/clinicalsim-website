import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { getAuthorById, TEAM_AUTHOR_ID } from "@/lib/authors"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Insights — Research & Evidence for Medical Communication Training",
  description: "Evidence-based insights on medical communication training, simulation technology, and the clinical conversations that drive patient outcomes. Research from ClinicalSim.ai.",
  openGraph: {
    title: "Insights from ClinicalSim.ai",
    description: "Evidence-based insights on medical communication training, simulation technology, and clinical conversation outcomes.",
    url: "https://clinicalsim.ai/insights",
  },
  twitter: {
    title: "Insights from ClinicalSim.ai",
    description: "Research and evidence on medical communication training.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/insights",
  },
}

export default function InsightsPage() {
  const posts = getAllPosts()

  const insightsJsonLd = [
    {
      "@context": "https://schema.org" as const,
      "@type": "CollectionPage" as const,
      name: "Insights — Research & Evidence for Medical Communication Training",
      description:
        "Evidence-based insights on medical communication training, simulation technology, and the clinical conversations that drive patient outcomes.",
      url: "https://clinicalsim.ai/insights",
      mainEntity: {
        "@type": "ItemList" as const,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem" as const,
          position: index + 1,
          url: `https://clinicalsim.ai/insights/${post.slug}`,
          name: post.title,
        })),
      },
      publisher: {
        "@type": "Organization" as const,
        name: "ClinicalSim.ai",
        url: "https://clinicalsim.ai",
      },
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "BreadcrumbList" as const,
      itemListElement: [
        {
          "@type": "ListItem" as const,
          position: 1,
          name: "Home",
          item: "https://clinicalsim.ai",
        },
        {
          "@type": "ListItem" as const,
          position: 2,
          name: "Insights",
          item: "https://clinicalsim.ai/insights",
        },
      ],
    },
  ]

  // Helper function to get tag color variant
  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase()
    if (lowerTag.includes("research") || lowerTag.includes("evidence")) {
      return "bg-warm/10 text-warm border-warm/20"
    }
    if (lowerTag.includes("education") || lowerTag.includes("training")) {
      return "bg-blue-50 text-blue-600 border-blue-200"
    }
    if (lowerTag.includes("communication") || lowerTag.includes("skills")) {
      return "bg-success/10 text-success border-success/20"
    }
    if (lowerTag.includes("acgme") || lowerTag.includes("accreditation")) {
      return "bg-navy/10 text-navy border-navy/20"
    }
    return "bg-gray-50 text-gray-600 border-gray-200"
  }

  // Featured post (first one)
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <>
      <JsonLd data={insightsJsonLd} />
      {/* Hero */}
      <section className="relative text-center px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light shimmer mb-6 leading-loose pb-3">Insights</h1>
          <p className="text-xl text-gray-700 font-light leading-relaxed">
            Research, analysis, and perspectives on <span className="text-warm font-medium">communication training</span> in medical education.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-6 py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-navy mb-8">Featured Article</h2>
            <Link href={`/insights/${featuredPost.slug}`}>
              <div className="group bg-gradient-to-br from-white to-blue-50/50 border-2 border-warm/30 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl border-glow-hover transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-warm to-orange-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-light mb-3">
                      <time dateTime={featuredPost.date}>
                        {new Date(featuredPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>&middot;</span>
                      <span>{featuredPost.readingTime}</span>
                      <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-warm/10 text-warm border border-warm/20">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-medium text-navy mb-4 group-hover:text-warm transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-gray-700 font-light leading-relaxed mb-6">
                      {featuredPost.description}
                    </p>
                    {featuredPost.authorId && featuredPost.authorId !== TEAM_AUTHOR_ID && (() => {
                      const author = getAuthorById(featuredPost.authorId!)
                      return author ? (
                        <p className="text-sm text-gray-600 font-medium mb-4">
                          {author.name}
                        </p>
                      ) : null
                    })()}
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium border ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      {otherPosts.length > 0 && (
        <>
          <SectionDivider variant="wave" color="slate" />

          <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-navy mb-8">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map((post) => (
                  <Link key={post.slug} href={`/insights/${post.slug}`}>
                    <div className="group h-full bg-white/90 border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl border-glow-hover transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-3 text-sm text-gray-500 font-light mb-4">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span>&middot;</span>
                        <span>{post.readingTime}</span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-3 group-hover:text-warm transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-700 font-light leading-relaxed mb-4">
                        {post.description}
                      </p>

                      {post.authorId && post.authorId !== TEAM_AUTHOR_ID && (() => {
                        const author = getAuthorById(post.authorId!)
                        return author ? (
                          <p className="text-sm text-gray-600 font-medium mb-4">
                            {author.name}
                          </p>
                        ) : null
                      })()}

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Want to stay updated?</h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100">
            Join our waitlist to receive updates on new research, features, and pilot opportunities.
          </p>
          <Link href="https://form.typeform.com/to/Zve4CKk2" target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-warm text-warm-foreground hover:bg-warm/90 hover:shadow-lg hover:scale-105 h-14 px-10">
              Join the Waitlist
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
