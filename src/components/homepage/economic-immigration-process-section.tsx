"use client"

import { motion } from "framer-motion"
import { Shield, Target, FileEdit, ArrowRight } from "lucide-react"
import Link from "next/link"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface EconomicImmigrationProcessSectionProps {
  lang: Locale
}

export function EconomicImmigrationProcessSection({ lang }: EconomicImmigrationProcessSectionProps) {
  const t = getTranslations(lang)

  const steps = [
    {
      step: "1",
      icon: Shield,
      title: t("economicImmigration.process.assessment.title"),
      description: t("economicImmigration.process.assessment.description"),
      buttonText: t("economicImmigration.cta.button"),
      buttonLink: "https://www.northernpathways.ca/pre-assessment-form",
      buttonExternal: true,
    },
    {
      step: "2",
      icon: Target,
      title: t("economicImmigration.process.profileCreation.title"),
      description: t("economicImmigration.process.profileCreation.description"),
      buttonText: t("economicImmigration.cta.button"),
      buttonLink: "https://www.northernpathways.ca/pre-assessment-form",
      buttonExternal: true,
    },
    {
      step: "3",
      icon: FileEdit,
      title: t("economicImmigration.process.postITA.title"),
      description: t("economicImmigration.process.postITA.description"),
      buttonText: t("economicImmigration.cta.button"),
      buttonLink: "https://www.northernpathways.ca/pre-assessment-form",
      buttonExternal: true,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("economicImmigration.process.title")}
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t("economicImmigration.process.subtitle")}
          </p>
        </motion.div>

        {/* Steps with Animated Arrows */}
        <div className="relative max-w-6xl mx-auto">
          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.8, ease: "easeOut" }}
                className="text-center relative group flex flex-col"
              >
                {/* Step Number */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index + 0.2, duration: 0.6 }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="w-16 h-16 bg-white text-brand-red rounded-full text-2xl font-bold flex items-center justify-center shadow-2xl border-4 border-white/20"
                    >
                      {item.step}
                    </motion.div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-16 h-16 bg-white rounded-full blur-xl opacity-50 -z-10" />
                  </div>
                </motion.div>

                {/* Main Card */}
                <motion.div
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10 mt-8 group-hover:bg-white/15 transition-all duration-500 flex-1 flex flex-col"
                >
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.6 }
                    }}
                    className="w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl flex-shrink-0"
                  >
                    <item.icon className="h-10 w-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index + 0.4, duration: 0.6 }}
                      className="text-2xl font-bold mb-4"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index + 0.5, duration: 0.6 }}
                      className="text-white/90 leading-relaxed text-lg flex-1 mb-6"
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Button */}
                  {item.buttonExternal ? (
                    <a href={item.buttonLink} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white text-brand-red px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>{item.buttonText}</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </a>
                  ) : (
                    <Link href={item.buttonLink}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white text-brand-red px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>{item.buttonText}</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </Link>
                  )}

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full opacity-30"
                  />
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/30 rounded-full opacity-30"
                  />
                </motion.div>

                {/* Animated Arrow Between Steps */}
                {index < 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index + 0.8, duration: 0.6 }}
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                  >
                    <div className="relative">
                      {/* Main Arrow */}
                      <motion.div
                        animate={{ 
                          x: [0, 10, 0],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-white/30"
                      >
                        <ArrowRight className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      {/* Arrow Trail Effect */}
                      <motion.div
                        animate={{ 
                          x: [0, 20, 0],
                          opacity: [0, 0.5, 0]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: "easeOut" 
                        }}
                        className="absolute inset-0 w-16 h-16 bg-white/20 rounded-full blur-sm"
                      />
                      
                      {/* Floating Particles */}
                      <motion.div
                        animate={{ 
                          x: [0, 30, 0],
                          y: [0, -20, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeOut",
                          delay: 0.5
                        }}
                        className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"
                      />
                      <motion.div
                        animate={{ 
                          x: [0, 25, 0],
                          y: [0, 20, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeOut",
                          delay: 1.0
                        }}
                        className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

