import type { Metadata } from 'next'
import { Poppins, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClinicalSim.ai — AI Clinical Simulation for Communication Remediation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ibmPlexMono.variable} font-sans`} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
