import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/practice',
        destination: 'https://app.clinicalsim.ai',
        permanent: false,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
