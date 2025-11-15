"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface HeroSectionProps {
  lang: Locale
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = getTranslations(lang)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#f9f9f9]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-maroon rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Consultant Photo with Overlay Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              {/* Interactive Card - Positioned on left side, outside photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="absolute left-4 md:-left-8 top-8 z-20 w-full max-w-sm md:max-w-md"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    rotate: -6,
                    transition: { duration: 0.3 }
                  }}
                  className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-100"
                >
                  {/* RCIC Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -top-4 -left-4 bg-brand-red text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10"
                  >
                    RCIC
                  </motion.div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Sparkles className="h-5 w-5 text-brand-red" />
                      <p className="text-lg font-medium">
                        {t("home.newHero.cardTitle")}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                    >
                      <input
                        type="text"
                        placeholder={t("home.newHero.cardPlaceholder")}
                        readOnly
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-700 placeholder-gray-400 bg-gray-50 cursor-default"
                        tabIndex={-1}
                        aria-label="Visualization input (display only)"
                      />
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-2 -right-2 w-20 h-20 bg-brand-red rounded-full blur-2xl opacity-30 -z-10"
                  />
                </motion.div>
              </motion.div>
              
              {/* Consultant Photo Placeholder */}
              <div className="aspect-[3/4] bg-brand-lightGray rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">[Consultant Photo Placeholder]</span>
                </div>
              </div>
              
              {/* Badges/Logos - Positioned at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg z-10"
              >
                <div className="text-xs font-semibold text-[#2c2b2b]">RCIC-IRB</div>
                <div className="w-px h-6 bg-gray-300" />
                <div className="text-xs font-semibold text-[#2c2b2b]">CAPIC</div>
                <div className="w-px h-6 bg-gray-300" />
                <div className="text-xs font-semibold text-[#2c2b2b]">AC CP</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2c2b2b] leading-tight">
                {t("home.newHero.title")}{" "}
                <span className="text-brand-red">Here</span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-600 italic leading-relaxed"
              >
                {t("home.newHero.tagline")}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-gray-600 leading-relaxed max-w-2xl"
              >
                {t("home.newHero.description")}
              </motion.p>
            </motion.div>

            {/* Credentials Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-[#2c2b2b] mb-3">
                {t("home.newHero.consultant.name")}
              </h3>
              <p className="text-brand-red font-semibold mb-4">
                {t("home.newHero.consultant.title")}
              </p>
              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>• {t("home.newHero.consultant.credential1")}</li>
                <li>• {t("home.newHero.consultant.credential2")}</li>
                <li>• {t("home.newHero.consultant.credential3")}</li>
                <li>• {t("home.newHero.consultant.credential4")}</li>
                <li>• {t("home.newHero.consultant.credential5")}</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4 italic">
                {t("home.newHero.consultant.teamDescription")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="https://www.northernpathways.ca/pre-assessment-form" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-red hover:bg-brand-maroon text-white px-8 py-4 rounded-lg font-semibold text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {t("home.newHero.bookConsultation")}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <Link href={`/${lang}/crs-calculator`}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-8 py-4 rounded-lg font-semibold text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {t("home.newHero.exploreServices")}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

