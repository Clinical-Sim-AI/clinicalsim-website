import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
    default: 'ClinicalSim.ai — Clinical Simulation for Communication Remediation & Training',
    template: '%s | ClinicalSim.ai',
  },
  description: 'Practice the conversations that matter most. Clinical simulation purpose-built for communication remediation and training in medical education. Structured practice mapped to ACGME milestones with CCC-ready documentation. Built by simulation directors and communication researchers.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
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
        {/* R2B visitor identification - hardcoded first-party script, safe for inline use */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("GOYPYHQZM0OX");`,
          }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning={true}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
