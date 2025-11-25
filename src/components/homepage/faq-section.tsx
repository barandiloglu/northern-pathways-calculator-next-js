"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface FAQSectionProps {
  lang: Locale
}

export function FAQSection({ lang }: FAQSectionProps) {
  const t = getTranslations(lang)
  const [activeQuestion, setActiveQuestion] = useState<number>(0)

  const faqs = [
    {
      question: t("home.faq.questions.q1"),
      answer: t("home.faq.answers.a1"),
    },
    {
      question: t("home.faq.questions.q2"),
      answer: t("home.faq.answers.a2"),
    },
    {
      question: t("home.faq.questions.q3"),
      answer: t("home.faq.answers.a3"),
    },
    {
      question: t("home.faq.questions.q4"),
      answer: t("home.faq.answers.a4"),
    },
    {
      question: t("home.faq.questions.q5"),
      answer: t("home.faq.answers.a5"),
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
            {t("home.faq.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.faq.subtitle")}
          </p>
        </motion.div>

        {/* FAQ Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column - Questions List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            {faqs.map((faq, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveQuestion(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  activeQuestion === index
                    ? "bg-[#2c2b2b] text-white"
                    : "bg-white text-[#2c2b2b] hover:bg-gray-50"
                }`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold">{faq.question}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Column - Answer Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#2c2b2b] text-white rounded-xl p-4 md:p-6 lg:p-8 shadow-xl min-h-[200px] md:min-h-[300px] flex flex-col justify-between"
              >
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  {faqs[activeQuestion].answer}
                </p>
                <p className="text-sm text-gray-300 italic">
                  - {t("home.faq.attribution")}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

