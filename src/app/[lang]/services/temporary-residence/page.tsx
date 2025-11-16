import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"
import Link from "next/link"
import { AnimatedHero } from "@/components/animated-hero"
import { Reveal } from "@/components/reveal"
import { ApplicationProcessSection } from "@/components/homepage/application-process-section"
import { HelpCircle, Clock } from "lucide-react"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function TemporaryResidencePage({ params }: PageProps) {
  const { lang } = await params
  const t = getTranslations(lang)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
          <AnimatedHero
            title={t("temporaryResidence.hero.title")}
            subtitle={t("temporaryResidence.hero.subtitle")}
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                {t("temporaryResidence.intro.title")}
              </h2>
              <p className="text-lg text-[#2c2b2b]/80 leading-relaxed">
                {t("temporaryResidence.intro.description")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Study Permits Section */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("temporaryResidence.serviceOverview")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("temporaryResidence.studyPermits.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("temporaryResidence.studyPermits.description1")}</p>
                  <p>{t("temporaryResidence.studyPermits.description2")}</p>
                </div>
              </div>
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Image Placeholder]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("temporaryResidence.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("temporaryResidence.studyPermits.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("temporaryResidence.studyPermits.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("temporaryResidence.studyPermits.processingTimes.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("temporaryResidence.studyPermits.processingTimes.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Work Permits Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <Reveal delay={0.1} className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Image Placeholder]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("temporaryResidence.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("temporaryResidence.workPermits.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("temporaryResidence.workPermits.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("temporaryResidence.workPermits.keyTip.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("temporaryResidence.workPermits.keyTip.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="order-1 lg:order-2">
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("temporaryResidence.serviceOverview")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("temporaryResidence.workPermits.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("temporaryResidence.workPermits.description1")}</p>
                  <p>{t("temporaryResidence.workPermits.description2")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Visitor & Super Visas Section */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("temporaryResidence.serviceOverview")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("temporaryResidence.visitorVisas.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("temporaryResidence.visitorVisas.description1")}</p>
                  <p>{t("temporaryResidence.visitorVisas.description2")}</p>
                </div>
              </div>
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Image Placeholder]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("temporaryResidence.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("temporaryResidence.visitorVisas.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("temporaryResidence.visitorVisas.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("temporaryResidence.visitorVisas.superVisaRequirement.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("temporaryResidence.visitorVisas.superVisaRequirement.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Process Section */}
      <ApplicationProcessSection lang={lang} />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-tr from-brand-red to-brand-maroon text-white text-center shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold">Ready to Start Your Journey?</h3>
              <Link
                href="https://www.northernpathways.ca/pre-assessment-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-6 items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-semibold transition-all"
              >
                Book a consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

