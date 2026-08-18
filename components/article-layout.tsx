import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { AuthorByline } from "@/components/author-byline";
import { AuthorBio } from "@/components/author-bio";
import { getAuthorById, getAuthorUrl, TEAM_AUTHOR_ID } from "@/lib/authors";
import type { Post } from "@/lib/posts";

function buildAuthorSchema(post: Post) {
  const author = post.authorId ? getAuthorById(post.authorId) : undefined;

  if (author && author.id !== TEAM_AUTHOR_ID) {
    const profileUrl = getAuthorUrl(author.id);
    return {
      "@type": "Person" as const,
      // Matches the @id on this person's /about card so a crawler resolves the
      // post author and the team page entry to a single entity.
      "@id": profileUrl,
      url: profileUrl,
      name: author.name,
      description: author.bio,
      ...(author.credentials ? { honorificSuffix: author.credentials } : {}),
      jobTitle: author.title,
      worksFor: {
        "@type": "Organization" as const,
        name: "ClinicalSim",
        url: "https://clinicalsim.ai",
      },
      // Populated only when verified off-site identity URLs exist (see Author.sameAs).
      ...(author.sameAs && author.sameAs.length > 0
        ? { sameAs: author.sameAs }
        : {}),
    };
  }

  return {
    "@type": "Organization" as const,
    name: "ClinicalSim",
    url: "https://clinicalsim.ai",
  };
}

export function ArticleLayout({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
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
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".key-takeaway", ".article-intro"],
          },
          author: buildAuthorSchema(post),
          // Populated only when a credentialed reviewer is set (see Post.reviewedBy).
          ...(post.reviewedBy
            ? {
                reviewedBy: {
                  "@type": "Person" as const,
                  name: post.reviewedBy,
                },
              }
            : {}),
          publisher: {
            "@type": "Organization",
            name: "ClinicalSim",
            url: "https://clinicalsim.ai",
            logo: {
              "@type": "ImageObject",
              url: "https://clinicalsim.ai/logo.svg",
            },
          },
          image: "https://clinicalsim.ai/og-image.png",
          ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://clinicalsim.ai/#website",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
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
                // Registry dates are bare ISO days. Without an explicit
                // zone, toLocaleDateString shifts them a day west of UTC.
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
            {post.dateModified && post.dateModified !== post.date && (
              <>
                <span>&middot;</span>
                <span>
                  Updated{" "}
                  <time dateTime={post.dateModified}>
                    {new Date(post.dateModified).toLocaleDateString("en-US", {
                      // Registry dates are bare ISO days. Without an explicit
                      // zone, toLocaleDateString shifts them a day west of UTC.
                      timeZone: "UTC",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-cs-dark-blue mb-4">
            {post.title}
          </h1>
          <p className="article-intro text-xl text-cs-dark-blue/70 font-light leading-relaxed mb-6">
            {post.description}
          </p>
          <AuthorByline authorId={post.authorId} authorName={post.author} />
          {post.reviewedBy && (
            <p className="mt-3 text-sm text-cs-dark-gray font-light">
              Medically reviewed by{" "}
              <span className="text-cs-dark-blue/85 font-medium">
                {post.reviewedBy}
              </span>
              {post.reviewedDate && (
                <>
                  {" · "}
                  <time dateTime={post.reviewedDate}>
                    {new Date(post.reviewedDate).toLocaleDateString("en-US", {
                      // Registry dates are bare ISO days. Without an explicit
                      // zone, toLocaleDateString shifts them a day west of UTC.
                      timeZone: "UTC",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </>
              )}
            </p>
          )}
        </div>

        <div className="border-t border-cs-gray/50 pt-8">{children}</div>

        <AuthorBio authorId={post.authorId} />
      </article>
    </section>
  );
}
