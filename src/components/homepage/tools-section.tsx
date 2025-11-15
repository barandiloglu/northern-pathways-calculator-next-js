"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface ToolsSectionProps {
  lang: Locale
}

export function ToolsSection({ lang }: ToolsSectionProps) {
  const t = getTranslations(lang)
  const [activeTab, setActiveTab] = useState<"crs" | "fswp">("crs")

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
              {t("home.tools.label")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-[#2c2b2b] leading-tight"
            >
              {t("home.tools.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {t("home.tools.description")}
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
                  className="bg-brand-red hover:bg-brand-maroon text-white px-8 py-4 rounded-lg font-semibold text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  {t("home.newHero.bookConsultation")}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Tabs & Tool Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab("crs")}
                className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
                  activeTab === "crs"
                    ? "text-brand-red"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t("home.tools.tabs.crs")}
                {activeTab === "crs" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("fswp")}
                className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
                  activeTab === "fswp"
                    ? "text-brand-red"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t("home.tools.tabs.fswp")}
                {activeTab === "fswp" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                  />
                )}
              </button>
            </div>

            {/* Tool Card */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#2c2b2b] mb-4">
                    {activeTab === "crs"
                      ? t("home.tools.crsCard.title")
                      : t("home.tools.fswpCard.title")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <p className="text-gray-600 leading-relaxed">
                      {activeTab === "crs"
                        ? t("home.tools.crsCard.description")
                        : t("home.tools.fswpCard.description")}
                    </p>
                    <div className="bg-brand-lightGray rounded-lg flex items-center justify-center min-h-[120px]">
                      <span className="text-gray-400 text-sm">
                        [Tool Image Placeholder]
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={activeTab === "crs" ? `/${lang}/crs-calculator` : `/${lang}/fswp-calculator`}>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-brand-lightGray hover:bg-gray-200 text-[#2c2b2b] px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    {t("home.tools.useTool")}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

