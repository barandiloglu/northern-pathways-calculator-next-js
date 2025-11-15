"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface EducationPartnerSectionProps {
  lang: Locale
}

export function EducationPartnerSection({ lang }: EducationPartnerSectionProps) {
  const t = getTranslations(lang)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c2b2b] mb-8">
            {t("home.educationPartner.title")}
          </h2>
          
          {/* EduPathways Logo/Partner Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-brand-lightGray rounded-2xl p-12 shadow-lg border border-gray-200"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Logo Placeholder with Icon */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2c2b2b]">
                    {t("home.educationPartner.partnerName")}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {t("home.educationPartner.subtitle")}
                  </p>
                </div>
              </div>
              
              {/* Placeholder for actual logo image */}
              <div className="mt-4">
                <div className="bg-white rounded-lg p-8 min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-sm">
                    [EduPathways Logo Placeholder]
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

