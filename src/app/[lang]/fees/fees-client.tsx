"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Locale } from "@/lib/i18n-config"
import { Reveal } from "@/components/reveal"
import { Plus } from "lucide-react"
import Link from "next/link"

interface FeesPageClientProps {
  lang: Locale
}

interface PricingCard {
  title: string
  price: string
  services: string[]
  additionalCosts?: string[]
}

interface FeeItem {
  id: string
  title: string
  singleApplicant: PricingCard
  familyApplication: PricingCard
  note?: string
}

export function FeesPageClient({ lang }: FeesPageClientProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const feeItems: FeeItem[] = [
    {
      id: "express-entry",
      title: "Express Entry",
      singleApplicant: {
        title: "Single Applicant",
        price: "C$5,000",
        services: [
          "Authorized Representation",
          "Express Entry Profile Submission",
          "Personalized Document List",
          "Secure Cloud-Based Data Collection",
          "Letter Templates",
          "Email and Phone Support",
          "Completion of All Relevant Forms",
          "Representative's Submission Letter",
          "Submission of eAPR via IRCC Portal",
        ],
      },
      familyApplication: {
        title: "Family Application",
        price: "C$6,000",
        services: [
          "Authorized Representation",
          "Express Entry Profile Submission",
          "Personalized Document List",
          "Secure Cloud-Based Data Collection",
          "Letter Templates",
          "Email and Phone Support",
          "Completion of All Relevant Forms",
          "Representative's Submission Letter",
          "Submission of eAPR via IRCC Portal",
        ],
        additionalCosts: [
          "+C$500 for common-law partner",
          "+C$400 for each additional dependant",
        ],
      },
    },
    {
      id: "pnp",
      title: "Provincial Nominee Programs (PNP)",
      singleApplicant: {
        title: "Single Applicant",
        price: "C$4,500",
        services: [
          "Initial Eligibility Assessment for PNP",
          "Provincial Expression of Interest (EOI) Submission",
          "Personalized Document List for Provincial Stage",
          "Preparation of Provincial Nomination Application",
          "Liaison with Provincial Immigration Officers",
          "Guidance for Federal PR Application post-nomination",
          "Email and Phone Support",
        ],
      },
      familyApplication: {
        title: "Family Application",
        price: "C$5,500",
        services: [
          "Initial Eligibility Assessment for PNP",
          "Provincial Expression of Interest (EOI) Submission",
          "Personalized Document List for Provincial Stage",
          "Preparation of Provincial Nomination Application",
          "Liaison with Provincial Immigration Officers",
          "Guidance for Federal PR Application post-nomination",
          "Email and Phone Support",
        ],
        additionalCosts: [
          "+C$450 for common-law partner",
          "+C$350 for each additional dependant",
        ],
      },
      note: "*Note: Fees for some specific PNP Entrepreneur streams may vary significantly. Please inquire for a custom quote.",
    },
    {
      id: "family-sponsorship",
      title: "Family Sponsorship",
      singleApplicant: {
        title: "Spousal/Common-law (Inland)",
        price: "C$4,000",
        services: [
          "Sponsor & Principal Applicant Assessment",
          "Application for Permanent Residence (Inland)",
          "Open Work Permit Application (concurrent)",
          "Document Checklist & Review",
          "Support for Interview Preparation",
          "Submission of Application Package",
        ],
      },
      familyApplication: {
        title: "Spousal/Common-law (Outland)",
        price: "C$4,500",
        services: [
          "Sponsor & Principal Applicant Assessment",
          "Application for Permanent Residence (Outland)",
          "Document Checklist & Review",
          "Support for Interview Preparation",
          "Submission of Application Package",
          "Guidance on Visitor Visa (if applicable)",
        ],
      },
      note: "Additional fee for adding dependent children: +C$300 per child.",
    },
    {
      id: "study-permits",
      title: "Study Permits",
      singleApplicant: {
        title: "New Study Permit",
        price: "C$1,800",
        services: [
          "Eligibility Assessment & School Guidance",
          "Application for Study Permit",
          "Document Checklist & Review",
          "Letter of Explanation Drafting",
          "Submission of Application",
          "Post-Graduate Work Permit Guidance",
        ],
      },
      familyApplication: {
        title: "Study Permit Extension / Restoration",
        price: "C$1,200",
        services: [
          "Eligibility Assessment for Extension/Restoration",
          "Application for Study Permit Extension/Restoration",
          "Document Checklist & Review",
          "Letter of Explanation Drafting",
          "Submission of Application",
          "Guidance on Maintaining Status",
        ],
      },
      note: "Fee for concurrent Spousal Open Work Permit: +C$500.",
    },
    {
      id: "work-permits",
      title: "Work Permits",
      singleApplicant: {
        title: "Employer-Specific Work Permit",
        price: "C$2,500",
        services: [
          "Eligibility Assessment",
          "LMIA-exempt or LMIA-based WP Application",
          "Document Checklist & Review",
          "Employer Compliance Portal Registration (if needed)",
          "Job Offer Review",
          "Submission of Application",
        ],
      },
      familyApplication: {
        title: "Open Work Permit",
        price: "C$1,800",
        services: [
          "Eligibility Assessment (e.g., PGWP, Spousal OWP)",
          "Application for Open Work Permit",
          "Document Checklist & Review",
          "Letter of Explanation Drafting",
          "Submission of Application",
          "Guidance on Rights as a Worker",
        ],
      },
      note: "Fee for LMIA applications (employer-side): Custom Quote.",
    },
    {
      id: "citizenship",
      title: "Citizenship",
      singleApplicant: {
        title: "Single Applicant",
        price: "C$2,000",
        services: [
          "Eligibility Assessment (Physical Presence)",
          "Citizenship Application (Adult)",
          "Document Checklist & Review",
          "Language & Test Preparation Guidance",
          "Submission of Application",
          "Guidance on Oath Ceremony",
        ],
      },
      familyApplication: {
        title: "Family Application",
        price: "C$2,800",
        services: [
          "Eligibility Assessment for all family members",
          "Citizenship Application (Adults & Minors)",
          "Document Checklist & Review",
          "Language & Test Preparation Guidance",
          "Submission of Applications",
          "Guidance on Oath Ceremony",
        ],
        additionalCosts: [
          "+C$300 for each additional adult (18+)",
          "+C$200 for each minor child (under 18)",
        ],
      },
    },
  ]

  return (
    <div className="bg-white">
      {/* Understanding Our Fee Structure */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  Understanding Our Fee Structure
                </h2>
                <p className="text-[#2c2b2b]/80 leading-relaxed mb-6">
                  At Northern Pathways, we believe in clear and transparent pricing. Our professional fees cover the extensive work performed by our Regulated Canadian Immigration Consultants (RCICs) to ensure your application is accurate, complete, and submitted effectively.
                </p>
                <p className="text-[#2c2b2b]/80 leading-relaxed mb-6">
                  Please note the following:
                </p>
                <ul className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-1">•</span>
                    <span>
                      Professional fees are solely for the services performed by our RCICs and do not include government processing fees (IRCC fees), medical examination costs, language proficiency tests, notary fees, or translation expenses. You can find applicable IRCC fees on the official{" "}
                      <Link
                        href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/fee.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-red font-semibold hover:underline"
                      >
                        IRCC website here.
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-1">•</span>
                    <span>
                      Fees may vary based on the complexity of your case, such as applications involving common-law partners, complex work experience, or specific Provincial Nominee Program requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-1">•</span>
                    <span>
                      The fees listed below are for a single applicant. For family applications or more detailed quotes, please fill out our{" "}
                      <Link
                        href="https://www.northernpathways.ca/pre-assessment-form"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-red font-semibold hover:underline"
                      >
                        pre-assessment form.
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-1">•</span>
                    <span>
                      If you reside in Canada, applicable taxes will be added to the professional fees.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fees Accordion */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="max-w-5xl mx-auto space-y-4">
              {feeItems.map((item, index) => {
                const isExpanded = expandedItem === item.id

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-brand-red/30 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <h3 className={`text-xl font-bold ${isExpanded ? "text-brand-red" : "text-[#2c2b2b]"}`}>
                        {item.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <Plus className="h-6 w-6 text-brand-red" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                              {/* Single Applicant Card */}
                              <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
                                <div className="bg-brand-maroon text-white px-6 py-3">
                                  <h4 className="font-bold text-lg">{item.singleApplicant.title}</h4>
                                </div>
                                <div className="p-6">
                                  <div className="mb-6">
                                    <div className="text-2xl font-bold text-brand-red">
                                      <span className="text-lg text-gray-500">C$</span>
                                      {item.singleApplicant.price.replace("C$", "")}
                                    </div>
                                  </div>
                                  <ul className="space-y-2 text-sm text-[#2c2b2b]/80">
                                    {item.singleApplicant.services.map((service, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-brand-red mt-1">•</span>
                                        <span>{service}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Family Application Card */}
                              <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
                                <div className="bg-brand-maroon text-white px-6 py-3">
                                  <h4 className="font-bold text-lg">{item.familyApplication.title}</h4>
                                </div>
                                <div className="p-6">
                                  <div className="mb-6">
                                    <div className="text-2xl font-bold text-brand-red">
                                      <span className="text-lg text-gray-500">C$</span>
                                      {item.familyApplication.price.replace("C$", "")}
                                    </div>
                                  </div>
                                  <ul className="space-y-2 text-sm text-[#2c2b2b]/80 mb-4">
                                    {item.familyApplication.services.map((service, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-brand-red mt-1">•</span>
                                        <span>{service}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  {item.familyApplication.additionalCosts && (
                                    <div className="pt-4 border-t border-gray-200">
                                      {item.familyApplication.additionalCosts.map((cost, idx) => (
                                        <p key={idx} className="text-sm text-brand-red font-semibold">
                                          {cost}
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {item.note && (
                              <p className="text-sm text-[#2c2b2b]/70 mt-4 italic">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

