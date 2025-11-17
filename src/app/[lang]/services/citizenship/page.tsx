import { type Locale } from "@/lib/i18n-config"
import { AnimatedHero } from "@/components/animated-hero"
import { Reveal } from "@/components/reveal"
import { CitizenshipPageClient } from "./citizenship-client"
import { CitizenshipProcessSection } from "@/components/homepage/citizenship-process-section"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function CitizenshipPage({ params }: PageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
          <AnimatedHero
            title="Canadian Citizenship"
            subtitle="Your final step on the journey to becoming Canadian."
          />
        </div>
      </section>

      <CitizenshipPageClient lang={lang} />

      {/* Our Process Section */}
      <CitizenshipProcessSection lang={lang} />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-tr from-brand-red to-brand-maroon text-white text-center shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold">Ready to Start Your Application?</h3>
              <a
                href="https://www.northernpathways.ca/pre-assessment-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-6 items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-semibold transition-all"
              >
                Start Your Application
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

