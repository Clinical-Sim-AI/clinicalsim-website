import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { POSITIONING_LONG } from '@/lib/positioning'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://clinicalsim.ai'),
  title: {
    default: 'ClinicalSim.ai: communication intelligence for healthcare',
    template: '%s | ClinicalSim.ai',
  },
  // The fallback description for any page without its own. Sourced from
  // lib/positioning.ts so it cannot drift from the Organization node, the
  // WebSite node, /about, /faq, and the /llms.txt header. The previous wording
  // claimed ClinicalSim was "built by simulation directors and communication
  // researchers", a phrase that appeared nowhere else on the site.
  description: POSITIONING_LONG,
  icons: {
    icon: '/favicon.svg?v=3',
    apple: '/apple-touch-icon.png?v=3',
  },
  openGraph: {
    type: 'website',
    siteName: 'ClinicalSim.ai',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        {/* The scroll-reveal styles start at opacity 0 and only JS can add
            .is-visible, so without JS every wrapped section would stay blank.
            Hand those readers the content instead. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans" suppressHydrationWarning={true}>
        {children}
        <Analytics />
        {/* R2B visitor identification. Hardcoded first-party key, safe inline. Runs
            after hydration so it stops competing with the hero for the main thread;
            it was previously an inline <script> in <head> on every page. */}
        <Script id="reb2b" strategy="afterInteractive">
          {`!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("GOYPYHQZM0OX");`}
        </Script>
      </body>
      <GoogleAnalytics gaId="G-G7CL56CV6K" />
    </html>
  )
}
