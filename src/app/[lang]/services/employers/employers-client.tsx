"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"
import Link from "next/link"
import { AnimatedHero } from "@/components/animated-hero"
import { Reveal } from "@/components/reveal"
import { ArrowDown, Clock, FileEdit, Plus } from "lucide-react"
import { EmployersProcessSection } from "@/components/homepage/employers-process-section"

interface EmployersPageClientProps {
  lang: Locale
}

export function EmployersPageClient({ lang }: EmployersPageClientProps) {
  const t = getTranslations(lang)
  const [expandedItem, setExpandedItem] = useState<number | null>(null) // All items start closed

  const employerServices = [
    {
      icon: ArrowDown,
      title: t("employers.services.fillSkillGaps.title"),
      description: t("employers.services.fillSkillGaps.description"),
    },
    {
      icon: Clock,
      title: t("employers.services.ensureCompliance.title"),
      description: t("employers.services.ensureCompliance.description"),
    },
    {
      icon: FileEdit,
      title: t("employers.services.retainTalent.title"),
      description: t("employers.services.retainTalent.description"),
    },
  ]

  const solutionsHubItems = [
    {
      id: 0,
      title: t("employers.solutionsHub.lmia.title"),
      description: t("employers.solutionsHub.lmia.description"),
      services: [
        t("employers.solutionsHub.lmia.service1"),
        t("employers.solutionsHub.lmia.service2"),
        t("employers.solutionsHub.lmia.service3"),
        t("employers.solutionsHub.lmia.service4"),
      ],
    },
    {
      id: 1,
      title: t("employers.solutionsHub.lmiaExempt.title"),
      description: t("employers.solutionsHub.lmiaExempt.description"),
      streams: [
        {
          title: t("employers.solutionsHub.lmiaExempt.ict.title"),
          description: t("employers.solutionsHub.lmiaExempt.ict.description"),
        },
        {
          title: t("employers.solutionsHub.lmiaExempt.francophone.title"),
          description: t("employers.solutionsHub.lmiaExempt.francophone.description"),
        },
        {
          title: t("employers.solutionsHub.lmiaExempt.postDoc.title"),
          description: t("employers.solutionsHub.lmiaExempt.postDoc.description"),
        },
        {
          title: t("employers.solutionsHub.lmiaExempt.obligations.title"),
          description: t("employers.solutionsHub.lmiaExempt.obligations.description"),
        },
      ],
    },
    {
      id: 2,
      title: t("employers.solutionsHub.compliance.title"),
      description: t("employers.solutionsHub.compliance.description"),
      helpItems: [
        t("employers.solutionsHub.compliance.help1"),
        t("employers.solutionsHub.compliance.help2"),
        t("employers.solutionsHub.compliance.help3"),
        t("employers.solutionsHub.compliance.help4"),
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
          <AnimatedHero
            title={t("employers.hero.title")}
            subtitle={t("employers.hero.subtitle")}
          />
        </div>
      </section>

      {/* Navigating Labour Shortages Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("employers.overview")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("employers.labourShortages.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("employers.labourShortages.description1")}</p>
                  <p>{t("employers.labourShortages.description2")}</p>
                </div>
              </div>
              <Reveal delay={0.1}>
                <div className="bg-[#f9f9f9] rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-[#2c2b2b] mb-6">
                    {t("employers.services.title")}
                  </h3>
                  <div className="space-y-6">
                    {employerServices.map((service, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full border-2 border-brand-red flex items-center justify-center bg-white">
                            <service.icon className="h-6 w-6 text-brand-red" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2c2b2b] mb-1">
                            {service.title}
                          </h4>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Employer Solutions Hub Section */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                {t("employers.solutionsHub.title")}
              </h2>
              <p className="text-lg text-[#2c2b2b]/80 leading-relaxed">
                {t("employers.solutionsHub.description")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-4xl mx-auto space-y-4">
              {solutionsHubItems.map((item, index) => {
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
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-gray-400">
                          {String(item.id + 1).padStart(2, "0")}
                        </span>
                        <h3 className={`text-xl font-bold ${isExpanded ? "text-brand-red" : "text-[#2c2b2b]"}`}>
                          {item.title}
                        </h3>
                      </div>
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
                            <p className="text-[#2c2b2b]/80 leading-relaxed mb-4">
                              {item.description}
                            </p>
                            
                            {item.services && (
                              <>
                                <div className="font-semibold text-[#2c2b2b] mb-2">
                                  {t("employers.solutionsHub.lmia.servicesTitle")}:
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-[#2c2b2b]/80">
                                  {item.services.map((service, idx) => (
                                    <li key={idx}>{service}</li>
                                  ))}
                                </ul>
                              </>
                            )}

                            {item.streams && (
                              <div className="space-y-4">
                                {item.streams.map((stream, idx) => (
                                  <div key={idx}>
                                    <div className="font-semibold text-[#2c2b2b] mb-1">
                                      {stream.title}
                                    </div>
                                    <p className="text-sm text-[#2c2b2b]/80">
                                      {stream.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {item.helpItems && (
                              <>
                                <div className="font-semibold text-[#2c2b2b] mb-2">
                                  {t("employers.solutionsHub.compliance.helpTitle")}:
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-[#2c2b2b]/80">
                                  {item.helpItems.map((helpItem, idx) => (
                                    <li key={idx}>{helpItem}</li>
                                  ))}
                                </ul>
                              </>
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

      {/* Our Process Section */}
      <EmployersProcessSection lang={lang} />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-tr from-brand-red to-brand-maroon text-white text-center shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold">{t("employers.cta.title")}</h3>
              <Link
                href="https://www.northernpathways.ca/pre-assessment-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-6 items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-semibold transition-all"
              >
                {t("employers.cta.button")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

