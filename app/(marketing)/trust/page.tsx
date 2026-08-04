import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import type { FaqItem } from "@/lib/types"

export const metadata: Metadata = {
  title: "Trust and Compliance: Synthetic Patients, No PHI, and What We Haven't Certified",
  description:
    "ClinicalSim is a training and assessment tool, not a diagnostic device, so no FDA clearance is required. Every patient in every case is synthetic, authored from the clinical literature rather than patient records, so no protected health information enters the platform. SOC 2 and HIPAA certification are on our funded roadmap and are not yet in place.",
  openGraph: {
    title: "Trust and Compliance | ClinicalSim.ai",
    description:
      "Synthetic patients, so no PHI and nothing to de-identify. Versioned and locked cases and rubrics. Consent-gated learner voice data. SOC 2 and HIPAA on the roadmap, not yet in place.",
    url: "https://clinicalsim.ai/trust",
  },
  twitter: {
    title: "Trust and Compliance | ClinicalSim.ai",
    description:
      "What ClinicalSim does with data, and what it hasn't certified yet. Stated plainly, because a security questionnaire will ask.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/trust",
  },
}

const LAST_UPDATED = "2026-08-04"

const trustFaqs: FaqItem[] = [
  {
    question: "Does ClinicalSim need FDA clearance?",
    answer:
      "No. ClinicalSim is a training and assessment tool for clinician communication, not a diagnostic device, so no FDA clearance is required. The platform produces no patient-facing output and makes no diagnostic or treatment recommendation, and it is not a clinical documentation tool.",
  },
  {
    question: "Does any protected health information enter the platform?",
    answer:
      "No. Every patient in every ClinicalSim case is synthetic, authored from the clinical literature rather than from patient records, so no protected health information enters the platform and there is nothing to de-identify.",
  },
  {
    question: "Is ClinicalSim SOC 2 or HIPAA certified?",
    answer:
      "Not yet. SOC 2 and HIPAA certification are on our funded roadmap and are not in place today. The reason that matters less than it usually would is that the platform holds no protected health information, because every patient in every case is synthetic.",
  },
  {
    question: "What happens to a learner's voice recording?",
    answer:
      "Learner voice data is consent-gated, learners can request erasure, and our AI vendors are contractually barred from training on the data. A recording exists to generate that learner's feedback.",
  },
  {
    question: "Can a program reproduce a score after the fact?",
    answer:
      "Yes. Published cases, rubrics, and scoring prompts are versioned and locked, so a program can point to the exact version a learner was assessed against and a score from months ago can be reproduced rather than reconstructed.",
  },
  {
    question:
      "Does ClinicalSim price malpractice risk or benchmark our institution against others?",
    answer:
      "No. Risk pricing and cross-institution benchmarking are later phases of our roadmap, not features available today. What the platform produces now is per-learner, timestamped, rubric-scored practice records.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "FAQPage" as const,
  mainEntity: trustFaqs.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  })),
}

export default function TrustPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai Trust and Compliance",
            description:
              "How ClinicalSim handles data: a training and assessment tool rather than a diagnostic device, synthetic patients so no protected health information enters the platform, versioned and locked cases and rubrics, consent-gated learner voice data, and SOC 2 and HIPAA certification on the funded roadmap.",
            url: "https://clinicalsim.ai/trust",
            dateModified: LAST_UPDATED,
            publisher: {
              "@type": "Organization",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://clinicalsim.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Trust and Compliance",
                item: "https://clinicalsim.ai/trust",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Trust and Compliance</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-4 text-cs-dark-blue">
            Trust, data handling, and{" "}
            <span className="font-medium">what we haven&apos;t certified yet</span>
          </h1>

          <p className="text-sm text-cs-dark-gray font-light mb-6">
            Last updated: August 2026
          </p>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-4 max-w-3xl">
            Hospital privacy offices, IRBs, and procurement teams all ask the
            same handful of questions before a pilot starts. This page answers
            them in one place, including the one answer that is a no.
          </p>

          <div className="rounded-xl border-l-4 border-cs-electric bg-cs-dark-blue px-6 py-5 max-w-3xl">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              <span className="font-medium">Key takeaway:</span> every patient
              in every ClinicalSim case is synthetic, authored from the clinical
              literature rather than from patient records, so no protected
              health information enters the platform and there is nothing to
              de-identify. SOC 2 and HIPAA certification are on our funded
              roadmap and are not yet in place.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* 1. Regulatory posture */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            1. What ClinicalSim is, in{" "}
            <span className="text-cs-dark-blue font-medium">regulatory terms</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            ClinicalSim is a training and assessment tool for clinician
            communication, not a diagnostic device, so no FDA clearance is
            required. The platform produces no patient-facing output, makes no
            diagnostic or treatment recommendation, and is not a clinical
            documentation tool.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            What it produces is a rubric-scored record of how a clinician
            handled a simulated conversation, mapped to a published competency
            framework such as the ACGME Milestones 2.0.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 2. Synthetic patients */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            2. Every patient is{" "}
            <span className="text-cs-dark-blue font-medium">synthetic</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Every patient in every ClinicalSim case is authored from the
            clinical literature, not adapted from a real chart. There is no
            de-identification step in our pipeline because there is nothing to
            de-identify.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            That decision predates any compliance argument. A case written from
            the literature can be versioned, reviewed, and reasoned about by the
            physicians who authored it, and a case derived from a real encounter
            cannot. How cases get built is documented on our{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors"
            >
              methodology page
            </Link>
            .
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 3. Versioned and locked */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            3. Cases, rubrics, and scoring prompts are{" "}
            <span className="text-cs-dark-blue font-medium">versioned and locked</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            Once a case is published, its case text, its rubric, and its scoring
            prompts are versioned and locked. A program can point to the exact
            version a learner was assessed against, and a score from six months
            ago can be reproduced rather than re-litigated. Nothing about a
            published assessment changes underneath a learner after the fact,
            which matters most in remediation, where a score may end up in a due
            process file.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 4. Learner voice data */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            4. Learner{" "}
            <span className="text-cs-dark-blue font-medium">voice data</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Learners speak their side of the conversation out loud, which makes
            their voice data the one genuinely sensitive thing the platform
            holds. Collection is consent-gated, learners can request erasure,
            and our AI vendors are contractually barred from training on the
            data.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            A learner&apos;s recording exists to generate that learner&apos;s
            feedback. Our privacy policy covers visitors to this website;
            learner data inside the product is governed by the institutional
            agreement and by the practices on this page.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 5. What we have not certified */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            5. What we{" "}
            <span className="text-cs-dark-blue font-medium">haven&apos;t certified</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            SOC 2 and HIPAA certification are on our funded roadmap and are not
            in place today. We would rather write that here than let a vendor
            security questionnaire assume otherwise, and the reason it matters
            less than it usually would is section 2: the platform holds no
            protected health information, because every patient is synthetic.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Two other things we don&apos;t claim. ClinicalSim does not price
            malpractice risk and does not benchmark one institution against
            another, and both are later phases of our roadmap rather than
            features you can buy. And ClinicalSim does not replace a
            standardized patient program, it extends one.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            We also don&apos;t claim our scoring is more accurate or more valid
            than a faculty member&apos;s read. We don&apos;t have the validation
            data to say that, and we won&apos;t claim it until we do.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 6. FAQ */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            6. Questions we get from{" "}
            <span className="text-cs-dark-blue font-medium">
              privacy and procurement reviewers
            </span>
          </h2>

          <div className="space-y-6">
            {trustFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-cs-gray/50 rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                      {faq.question}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            If your security review needs something this page doesn&apos;t cover, ask us.
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            We&apos;ll tell you what exists and what doesn&apos;t. You can also
            read how cases get built on our methodology page, or how we handle
            website data in our privacy policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Contact us
              </Button>
            </Link>
            <Link href="/methodology">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Read the methodology
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
