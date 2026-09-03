import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Defaults to webp only. AVIF first cuts the brand icon PNGs further, and
    // Next falls back to webp for browsers that ask for it.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Canonical host is the non-www apex (matches every canonical and
      // OpenGraph URL on the site). Without this, www.clinicalsim.ai serves a
      // full duplicate of the site, which Google reports as "Alternate page
      // with proper canonical tag" and crawls as separate www URLs. A permanent
      // redirect consolidates www onto the apex.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.clinicalsim.ai' }],
        destination: 'https://clinicalsim.ai/:path*',
        permanent: true,
      },
      {
        source: '/practice',
        destination: 'https://platform.clinicalsim.ai',
        permanent: false,
      },
      // The Program Director FAQ was renamed to "FAQ for Medical Educators" and
      // its slug moved from /program-director-faq to /medical-educator-faq.
      // Permanently redirect the old path so inbound links and search-indexed
      // URLs consolidate onto the new canonical.
      {
        source: '/program-director-faq',
        destination: '/medical-educator-faq',
        permanent: true,
      },
      {
        source: '/insights/breaking-bad-news-medical-training',
        destination: '/insights/breaking-bad-news-practice-not-knowledge',
        permanent: true,
      },
      // Three posts consolidated on 2026-09-03. Each was 400 to 460 words and
      // made the same argument as a longer, better-sourced page that already
      // cross-linked it, so the pair split the topic's authority in two.
      // Registry entries keep their `redirectTo` (see lib/posts.ts), which
      // takes them out of getAllPosts, the sitemap, and /llms.txt.
      {
        source: '/insights/end-of-life-care-communication',
        destination: '/insights/eol-communication-training-measurement-gap',
        permanent: true,
      },
      {
        source: '/insights/hospital-communication-training-roi',
        destination: '/insights/why-communication-training-matters',
        permanent: true,
      },
      {
        source: '/insights/scalability-problem-sp-programs',
        destination: '/compare/ai-clinical-simulation-vs-standardized-patients',
        permanent: true,
      },
      // /pricing was retired in August 2026. It was robots-disallowed and
      // unlinked from every nav, so there is nothing to consolidate for search,
      // but the URL went out in sales conversations.
      //
      // It pointed at /roi-calculator, which is `noindex, nofollow` while the
      // calculator is unpublished, so every inbound /pricing link terminated:
      // a crawler followed the redirect and hit a page it was told to drop.
      // /evaluation carries the licensing answer and is indexable, so it is
      // both the right answer for a reader and a destination the redirect can
      // actually pass authority to.
      {
        source: '/pricing',
        destination: '/evaluation',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
