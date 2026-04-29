import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { AuthorByline } from "@/components/author-byline"
import { getAuthorById, TEAM_AUTHOR_ID } from "@/lib/authors"
import type { Post } from "@/lib/posts"

function buildAuthorSchema(post: Post) {
  const author = post.authorId ? getAuthorById(post.authorId) : undefined

  if (author && author.id !== TEAM_AUTHOR_ID) {
    return {
      "@type": "Person" as const,
      name: author.name,
      jobTitle: author.title,
      worksFor: {
        "@type": "Organization" as const,
        name: "ClinicalSim.ai",
        url: "https://clinicalsim.ai",
      },
    }
  }

  return {
    "@type": "Organization" as const,
    name: "ClinicalSim.ai",
    url: "https://clinicalsim.ai",
  }
}

export function ArticleLayout({
  post,
  children,
}: {
  post: Post
  children: React.ReactNode
}) {
  return (
    <section className="px-6 py-12 md:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.dateModified || post.date,
          author: buildAuthorSchema(post),
          publisher: {
            "@type": "Organization",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
            logo: {
              "@type": "ImageObject",
              url: "https://clinicalsim.ai/logo.svg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://clinicalsim.ai/insights/${post.slug}`,
          },
        }}
      />
      <article className="max-w-3xl mx-auto">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-cs-dark-gray hover:text-cs-dark-blue font-light mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 text-sm text-cs-dark-gray font-light mb-4">
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
          <h1 className="text-3xl md:text-4xl font-light text-cs-dark-blue mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-cs-dark-blue/70 font-light leading-relaxed mb-6">
            {post.description}
          </p>
          <AuthorByline authorId={post.authorId} authorName={post.author} />
        </div>

        <div className="border-t border-cs-gray/50 pt-8">
          {children}
        </div>
      </article>
    </section>
  )
}
