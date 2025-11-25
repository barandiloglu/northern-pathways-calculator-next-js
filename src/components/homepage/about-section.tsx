"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram } from "lucide-react"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface AboutSectionProps {
  lang: Locale
}

export function AboutSection({ lang }: AboutSectionProps) {
  const t = getTranslations(lang)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2c2b2b] mb-6">
            {t("home.about.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.about.mission")}
          </p>
        </motion.div>

        {/* Consultant Profile */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative pl-4 sm:pl-6 md:pl-8"
          >
            {/* Red Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-2">
                  {t("home.about.consultant.name")}
                </h3>
                <p className="text-brand-red font-semibold">
                  {t("home.about.consultant.title")}
                </p>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t("home.about.consultant.bio1")}</p>
                <p>{t("home.about.consultant.bio2")}</p>
              </div>

              {/* Social Media */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/company/northern-pathways-immigration-consulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-[#2c2b2b] hover:text-brand-red transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/northernpathways/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-[#2c2b2b] hover:text-brand-red transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-lightGray rounded-xl aspect-[4/5] flex items-center justify-center"
          >
            <span className="text-gray-400 text-sm">[Image Placeholder]</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

