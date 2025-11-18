import { type Locale } from "@/lib/i18n-config"
import { InvestorsPageClient } from "./investors-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function InvestorsPage({ params }: PageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-red mb-4">
              Investors & Entrepreneurs
            </h1>
            <p className="text-lg md:text-xl text-[#555] font-normal max-w-2xl mx-auto">
              Bringing your business vision to Canada.
            </p>
          </div>
        </div>
      </section>

      <InvestorsPageClient lang={lang} />
    </div>
  )
}
