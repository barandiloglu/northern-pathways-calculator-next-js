import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"
import Link from "next/link"
import { AnimatedHero } from "@/components/animated-hero"
import { Reveal } from "@/components/reveal"
import { HelpCircle, Clock } from "lucide-react"
import { EconomicImmigrationProcessSection } from "@/components/homepage/economic-immigration-process-section"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function EconomicImmigrationPage({ params }: PageProps) {
  const { lang } = await params
  const t = getTranslations(lang)

  const otherPathways = [
    {
      title: t("economicImmigration.otherPathways.pnp.title"),
      description: t("economicImmigration.otherPathways.pnp.description"),
    },
    {
      title: t("economicImmigration.otherPathways.selfEmployed.title"),
      description: t("economicImmigration.otherPathways.selfEmployed.description"),
    },
    {
      title: t("economicImmigration.otherPathways.startupVisa.title"),
      description: t("economicImmigration.otherPathways.startupVisa.description"),
    },
    {
      title: t("economicImmigration.otherPathways.newPathways.title"),
      description: t("economicImmigration.otherPathways.newPathways.description"),
    },
    {
      title: t("economicImmigration.otherPathways.agrifood.title"),
      description: t("economicImmigration.otherPathways.agrifood.description"),
    },
    {
      title: t("economicImmigration.otherPathways.atlantic.title"),
      description: t("economicImmigration.otherPathways.atlantic.description"),
    },
  ]


  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
          <AnimatedHero
            title={t("economicImmigration.hero.title")}
            subtitle={t("economicImmigration.hero.subtitle")}
          />
        </div>
      </section>

      {/* Express Entry Introduction */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                {t("economicImmigration.expressEntry.title")}
              </h2>
              <p className="text-lg text-[#2c2b2b]/80 leading-relaxed">
                {t("economicImmigration.expressEntry.description")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Federal Skilled Worker (FSW) Section */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("economicImmigration.expressEntryLabel")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("economicImmigration.fsw.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("economicImmigration.fsw.description1")}</p>
                  <p>{t("economicImmigration.fsw.description2")}</p>
                </div>
              </div>
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Service Image]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("economicImmigration.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("economicImmigration.fsw.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("economicImmigration.fsw.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("economicImmigration.fsw.keyPoint.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("economicImmigration.fsw.keyPoint.description")}
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

      {/* Federal Skilled Trades (FST) Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <Reveal delay={0.1} className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Service Image]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("economicImmigration.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("economicImmigration.fst.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("economicImmigration.fst.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("economicImmigration.fst.language.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("economicImmigration.fst.language.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="order-1 lg:order-2">
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("economicImmigration.expressEntryLabel")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("economicImmigration.fst.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("economicImmigration.fst.description1")}</p>
                  <p>{t("economicImmigration.fst.description2")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Canadian Experience Class (CEC) Section */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("economicImmigration.expressEntryLabel")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("economicImmigration.cec.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed">
                  <p>{t("economicImmigration.cec.description1")}</p>
                  <p>{t("economicImmigration.cec.description2")}</p>
                </div>
              </div>
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Service Image]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("economicImmigration.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("economicImmigration.cec.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("economicImmigration.cec.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("economicImmigration.cec.keyBenefit.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("economicImmigration.cec.keyBenefit.description")}
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

      {/* Other Immigration Pathways Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                {t("economicImmigration.otherPathways.title")}
              </h2>
              <p className="text-lg text-[#2c2b2b]/80 leading-relaxed">
                {t("economicImmigration.otherPathways.description")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherPathways.map((pathway, index) => (
                <Reveal key={index} delay={0.1 * (index + 1)}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                      [Service Image]
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2c2b2b] mb-3">
                        {pathway.title}
                      </h3>
                      <p className="text-sm text-[#2c2b2b]/80 leading-relaxed mb-4">
                        {pathway.description}
                      </p>
                      <button className="w-full px-4 py-2 border-2 border-brand-red text-brand-red rounded-lg font-semibold hover:bg-brand-red hover:text-white transition-colors">
                        {t("economicImmigration.otherPathways.learnMore")}
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Process Section */}
      <EconomicImmigrationProcessSection lang={lang} />

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

