"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"
import { Reveal } from "@/components/reveal"
import { 
  Calendar, 
  FileEdit, 
  BookOpen, 
  CheckCircle2, 
  Vote, 
  Globe, 
  Shield, 
  Plane, 
  Briefcase, 
  Baby,
  Plus,
  ArrowRight
} from "lucide-react"

interface CitizenshipPageClientProps {
  lang: Locale
}

export function CitizenshipPageClient({ lang }: CitizenshipPageClientProps) {
  const t = getTranslations(lang)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const helpYouItems = [
    {
      icon: Calendar,
      title: "Eligibility Assessment",
      description: "We perform a detailed review of your time in Canada, language skills, and background to ensure you meet all requirements before you apply.",
    },
    {
      icon: FileEdit,
      title: "Application Preparation",
      description: "We meticulously prepare and review your application, ensuring all forms are accurate and all supporting documents are included to avoid delays.",
    },
    {
      icon: BookOpen,
      title: "Test & Interview Coaching",
      description: "We provide you with resources, study guides, and coaching to help you confidently pass the Canadian citizenship test and prepare for your interview.",
    },
  ]

  const requirements = [
    "Must have valid Permanent Resident (PR) status in Canada.",
    "Must have been physically present in Canada for at least 1,095 days (3 years) within the last 5 years.",
    "Must demonstrate proficiency in English or French (if aged 18-54).",
    "Must pass a citizenship test on Canada's history, values, and institutions (if aged 18-54).",
    "Must be in good standing and not have any prohibitions, such as a criminal record.",
  ]

  const benefits = [
    {
      icon: Vote,
      title: "Participate in Democracy",
      description: "Citizens can vote in elections and run for public office, giving them a voice in shaping Canada's leadership.",
    },
    {
      icon: Globe,
      title: "Hold a Canadian Passport",
      description: "Enjoy visa-free travel to 187 destinations and access to consular support when traveling abroad.",
    },
    {
      icon: Shield,
      title: "Secure & Stable Status",
      description: "Citizenship is permanent and does not require you to meet residency obligations to maintain your status.",
    },
    {
      icon: Plane,
      title: "Unrestricted Entry",
      description: "Citizens are guaranteed the right to live, work, and travel in Canada without risk of losing their status.",
    },
    {
      icon: Briefcase,
      title: "Exclusive Career Paths",
      description: "Certain government and high-security career opportunities are available only to Canadian citizens.",
    },
    {
      icon: Baby,
      title: "Pass to Future Generations",
      description: "Citizens can pass their status to children born abroad, unlike permanent residents.",
    },
  ]

  const faqs = [
    {
      question: "How long does the citizenship application process take?",
      answer: "Processing times can vary, but as of late 2024, applications are typically processed within 12 to 24 months. We can give you the most current estimate during your consultation.",
    },
    {
      question: "Can my children apply for citizenship with me?",
      answer: "Yes, children under 18 can apply at the same time as a parent, provided they are also permanent residents. They do not need to meet the same physical presence requirements and are not required to take the citizenship test.",
    },
    {
      question: "What happens if I fail the citizenship test?",
      answer: "If you do not pass the test on your first attempt, you will be scheduled for a second test. If you also fail the second attempt, you will be scheduled for an interview with a citizenship officer to assess your knowledge. We provide comprehensive coaching to help you pass the first time.",
    },
    {
      question: "Does time spent as a student or worker count?",
      answer: "Yes, time spent in Canada as a temporary resident (like on a study or work permit) before becoming a permanent resident can count as a half-day, up to a maximum of 365 days, towards your physical presence requirement.",
    },
  ]

  return (
    <>
      {/* The Final Step to Your New Home */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-red mb-6">
                  The Final Step to Your New Home
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>
                    Becoming a Canadian citizen is the final step in your journey to fully integrating into Canadian life. It is a significant milestone that goes beyond permanent residency, offering stability, security, and new opportunities.
                  </p>
                  <p>
                    It grants you the right to vote, access to one of the world's strongest passports, and a permanent, secure connection to Canada. Our team is here to guide you through this final and most important application.
                  </p>
                </div>
                <a
                  href="https://www.northernpathways.ca/pre-assessment-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-6 items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-maroon text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Start Your Application
                </a>
              </div>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <div className="bg-[#f9f9f9] rounded-2xl shadow-xl h-96 flex items-center justify-center">
                  <span className="text-gray-400">[Image Placeholder]</span>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How We Help You */}
      <section className="bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon text-white py-20">
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
              How We Help You
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Our citizenship service is a complete package, designed to give you confidence at every stage.
            </p>
          </motion.div>

          {/* Steps with Animated Arrows */}
          <div className="relative max-w-6xl mx-auto">
            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-8 relative">
              {helpYouItems.map((item, index) => (
                <motion.div
                  key={index}
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
                        {index + 1}
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
                    <a href="https://www.northernpathways.ca/pre-assessment-form" target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white text-brand-red px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>Start Your Application</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </a>

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

      {/* Who Can Apply? */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <Reveal delay={0.1} className="order-2 lg:order-1">
                <div className="bg-[#f9f9f9] rounded-2xl shadow-xl h-96 flex items-center justify-center">
                  <span className="text-gray-400">[Image Placeholder]</span>
                </div>
              </Reveal>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-red mb-6">
                  Who Can Apply?
                </h2>
                <p className="text-lg text-[#2c2b2b]/80 leading-relaxed mb-6">
                  Applicants may qualify for Canadian citizenship if they meet the following key requirements. Our team will verify each one with you.
                </p>
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-[#2c2b2b]/80 leading-relaxed">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Become a Canadian Citizen? */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                Why Become a Canadian Citizen?
              </h2>
              <p className="text-lg text-[#2c2b2b]/80 leading-relaxed">
                Canadian citizenship comes with unique privileges and responsibilities that distinguish it from permanent residency:
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2c2b2b] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#2c2b2b]/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => {
                const isExpanded = expandedFAQ === index

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-brand-red/30 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFAQ(isExpanded ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <h3 className={`text-xl font-bold ${isExpanded ? "text-brand-red" : "text-[#2c2b2b]"}`}>
                        {faq.question}
                      </h3>
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
                            <p className="text-[#2c2b2b]/80 leading-relaxed">
                              {faq.answer}
                            </p>
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
    </>
  )
}

