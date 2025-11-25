"use client"

import { motion } from "framer-motion"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface TestimonialsSectionProps {
  lang: Locale
}

export function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const t = getTranslations(lang)

  const testimonials = [
    {
      text: t("home.testimonials.testimonial1.text"),
      client: t("home.testimonials.testimonial1.client"),
    },
    {
      text: t("home.testimonials.testimonial2.text"),
      client: t("home.testimonials.testimonial2.client"),
    },
    {
      text: t("home.testimonials.testimonial3.text"),
      client: t("home.testimonials.testimonial3.client"),
    },
  ]

  return (
    <section className="py-20 bg-[#f9f9f9]">
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
            {t("home.testimonials.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-lg border-l-4 border-brand-red relative"
            >
              <p className="text-gray-600 italic leading-relaxed mb-6 text-base md:text-lg">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-[#2c2b2b] font-semibold">
                {testimonial.client}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

