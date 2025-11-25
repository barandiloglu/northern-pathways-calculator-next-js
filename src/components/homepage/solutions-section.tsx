"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ArrowRight } from "lucide-react"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface SolutionsSectionProps {
  lang: Locale
}

export function SolutionsSection({ lang }: SolutionsSectionProps) {
  const t = getTranslations(lang)
  const [expandedService, setExpandedService] = useState<number>(-1)

  const services = [
    {
      id: 0,
      title: t("home.solutions.services.expressEntry.title"),
      description: t("home.solutions.services.expressEntry.description"),
      link: `/${lang}/crs-calculator`,
    },
    {
      id: 1,
      title: t("home.solutions.services.pnp.title"),
      description: t("home.solutions.services.pnp.description"),
      link: "#",
    },
    {
      id: 2,
      title: t("home.solutions.services.familySponsorship.title"),
      description: t("home.solutions.services.familySponsorship.description"),
      link: "#",
    },
    {
      id: 3,
      title: t("home.solutions.services.studyPermits.title"),
      description: t("home.solutions.services.studyPermits.description"),
      link: "#",
    },
    {
      id: 4,
      title: t("home.solutions.services.workPermits.title"),
      description: t("home.solutions.services.workPermits.description"),
      link: "#",
    },
    {
      id: 5,
      title: t("home.solutions.services.citizenship.title"),
      description: t("home.solutions.services.citizenship.description"),
      link: "#",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-brand-red font-semibold text-sm uppercase tracking-wider"
            >
              {t("home.solutions.label")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2c2b2b] leading-tight"
            >
              {t("home.solutions.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-600 leading-relaxed"
            >
              {t("home.solutions.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href="https://www.northernpathways.ca/pre-assessment-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-red hover:bg-brand-maroon text-white px-4 py-3 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg rounded-lg font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  {t("home.newHero.bookConsultation")}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {services.map((service, index) => {
              const isExpanded = expandedService === service.id

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-brand-red/30 transition-colors"
                >
                  <button
                    onClick={() => setExpandedService(isExpanded ? -1 : service.id)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-400">
                        {String(service.id + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#2c2b2b]">
                        {service.title}
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
                        <div className="px-6 pb-6 space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <p className="text-gray-600 leading-relaxed">
                              {service.description}
                            </p>
                            <div className="bg-brand-lightGray rounded-lg flex items-center justify-center min-h-[120px]">
                              <span className="text-gray-400 text-sm">
                                [Image Placeholder]
                              </span>
                            </div>
                          </div>
                          <a href={service.link}>
                            <motion.button
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              className="bg-brand-lightGray hover:bg-gray-200 text-[#2c2b2b] px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                              {t("home.solutions.learnMore")}
                              <ArrowRight className="h-4 w-4" />
                            </motion.button>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

