"use client"

import { motion } from "framer-motion"
import { Shield, MapPin, Edit } from "lucide-react"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface CommitmentSectionProps {
  lang: Locale
}

export function CommitmentSection({ lang }: CommitmentSectionProps) {
  const t = getTranslations(lang)

  const commitments = [
    {
      icon: Shield,
      number: "100%",
      title: t("home.commitment.regulated.title"),
      description: t("home.commitment.regulated.description"),
    },
    {
      icon: MapPin,
      number: "One-on-One",
      title: t("home.commitment.personalized.title"),
      description: t("home.commitment.personalized.description"),
    },
    {
      icon: Edit,
      number: "Zero",
      title: t("home.commitment.transparent.title"),
      description: t("home.commitment.transparent.description"),
    },
  ]

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
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c2b2b] mb-6">
            {t("home.commitment.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.commitment.subtitle")}
          </p>
        </motion.div>

        {/* Feature Blocks */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-16 max-w-8xl mx-auto">
          {commitments.map((commitment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="flex items-start gap-4"
            >
              {/* Left Side - Icon and Vertical Line */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-brand-red rounded-full flex items-center justify-center shadow-md"
                >
                  <commitment.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" strokeWidth={2.5} />
                </motion.div>
                
                {/* Vertical Line - extends downward from icon */}
                <div className="w-px h-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px] bg-gray-300 mt-2" />
              </div>

              {/* Right Side - Number, Title, Description */}
              <div className="flex-1 space-y-3 pt-1 min-w-0">
                {/* Number/Percentage */}
                <div>
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-red block leading-tight break-words">
                    {commitment.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2c2b2b]">
                  {commitment.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

