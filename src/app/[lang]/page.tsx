"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { LatestDraws } from "@/components/latest-draws"
import { FloatingDrawsButton } from "@/components/floating-draws-button"
import { HeroSection } from "@/components/homepage/hero-section"
import { SolutionsSection } from "@/components/homepage/solutions-section"
import { CommitmentSection } from "@/components/homepage/commitment-section"
import { ApplicationProcessSection } from "@/components/homepage/application-process-section"
import { AboutSection } from "@/components/homepage/about-section"
import { TestimonialsSection } from "@/components/homepage/testimonials-section"
import { ToolsSection } from "@/components/homepage/tools-section"
import { FAQSection } from "@/components/homepage/faq-section"
import { EducationPartnerSection } from "@/components/homepage/education-partner-section"
import { useParams } from "next/navigation"
import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"

export default function HomePage() {
  const params = useParams()
  const lang = (params?.lang as Locale) || 'en'
  const t = getTranslations(lang)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f9f9f9]">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Floating Draws Button */}
      <FloatingDrawsButton />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection lang={lang} />

        {/* Solutions Section */}
        <SolutionsSection lang={lang} />

        {/* Commitment Section */}
        <CommitmentSection lang={lang} />

        {/* Application Process Section */}
        <ApplicationProcessSection lang={lang} />

        {/* About Section */}
        <AboutSection lang={lang} />

        {/* Testimonials Section */}
        <TestimonialsSection lang={lang} />

        {/* Tools Section */}
        <ToolsSection lang={lang} />

        {/* FAQ Section */}
        <FAQSection lang={lang} />

        {/* Education Partner Section */}
        <EducationPartnerSection lang={lang} />
      </main>
      <Footer />
    </div>
  )
}
