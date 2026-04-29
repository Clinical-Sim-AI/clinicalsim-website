import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ClinicalSim.ai privacy policy — how we collect, use, and protect your personal information when you visit our website.",
  openGraph: {
    title: "Privacy Policy — ClinicalSim.ai",
    description: "How we collect, use, and protect your personal information.",
    url: "https://clinicalsim.ai/privacy",
  },
  twitter: {
    title: "Privacy Policy — ClinicalSim.ai",
    description: "How we collect, use, and protect your personal information.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/privacy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-light text-cs-navy mb-4">Privacy Policy</h1>
        <p className="text-sm text-cs-dark-gray font-light mb-12">Last updated: March 16, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-cs-navy [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-cs-dark-blue/85 [&_p]:font-light [&_p]:leading-relaxed [&_a]:text-cs-dark-blue [&_a]:hover:text-cs-dark-blue [&_a]:transition-colors [&_ul]:space-y-2 [&_li]:text-cs-dark-blue/85 [&_li]:font-light">
          <h2>Introduction</h2>
          <p>
            ClinicalSim.ai (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at clinicalsim.ai (the &quot;Site&quot;). Please read this policy carefully. By using the Site, you consent to the practices described in this policy.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Personal data you provide:</strong> Name, email address, organization, and any other information you voluntarily submit through our contact forms or waitlist sign-ups.
            </li>
            <li>
              <strong>Automatically collected data:</strong> When you visit the Site, we may automatically collect certain information about your device and usage, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.
            </li>
            <li>
              <strong>Cookies and tracking technologies:</strong> We use cookies and similar technologies to collect information about your browsing activity. See the &quot;Cookies and Online Advertising&quot; section below for more details.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect to:</p>
          <ul className="list-disc pl-6">
            <li>Respond to your inquiries and fulfill your requests</li>
            <li>Send you information about our products, services, and pilot programs</li>
            <li>Improve our website and user experience</li>
            <li>Analyze usage trends and measure the effectiveness of our content</li>
            <li>Comply with applicable legal requirements</li>
          </ul>

          <h2>Cookies and Online Advertising</h2>
          <p>
            When you visit or log in to our website, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you, including by association with your email or home address. We (or service providers on our behalf) may then send communications and marketing to these email or home addresses. You may opt out of receiving this advertising by visiting{" "}
            <a href="https://app.retention.com/optout" target="_blank" rel="noopener noreferrer">
              https://app.retention.com/optout
            </a>
            .
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services that collect, monitor, and analyze visitor data to help us understand how our Site is used and to improve our marketing efforts. These third-party service providers have their own privacy policies addressing how they use your information.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf (such as email delivery, analytics, and marketing), subject to confidentiality obligations. We may also disclose your information if required by law or to protect our rights.
          </p>

          <h2>Data Security</h2>
          <p>
            We use reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>You may:</p>
          <ul className="list-disc pl-6">
            <li>Opt out of marketing emails by following the unsubscribe instructions in those emails</li>
            <li>
              Opt out of cookie-based advertising by visiting{" "}
              <a href="https://app.retention.com/optout" target="_blank" rel="noopener noreferrer">
                https://app.retention.com/optout
              </a>
            </li>
            <li>
              Contact us at any time to request access to, correction of, or deletion of your personal information
            </li>
          </ul>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please{" "}
            <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
