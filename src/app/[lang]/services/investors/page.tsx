import { type Locale } from "@/lib/i18n-config"
import { AnimatedHero } from "@/components/animated-hero"
import { InvestorsPageClient } from "./investors-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function InvestorsPage({ params }: PageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
          <AnimatedHero
            title="Investors & Entrepreneurs"
            subtitle="Bringing your business vision to Canada."
          />
        </div>
      </section>

      <InvestorsPageClient lang={lang} />
    </div>
  )
}

