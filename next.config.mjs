import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true,
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
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
