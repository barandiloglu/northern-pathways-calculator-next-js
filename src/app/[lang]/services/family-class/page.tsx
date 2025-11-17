import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"
import Link from "next/link"
import { AnimatedHero } from "@/components/animated-hero"
import { Reveal } from "@/components/reveal"
import { HelpCircle, Clock } from "lucide-react"
import { FamilyClassProcessSection } from "@/components/homepage/family-class-process-section"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function FamilyClassPage({ params }: PageProps) {
  const { lang } = await params
  const t = getTranslations(lang)

  const otherFamilySponsorships = [
    {
      title: t("familyClass.otherFamilySponsorships.parentGrandparent.title"),
      description: t("familyClass.otherFamilySponsorships.parentGrandparent.description"),
    },
    {
      title: t("familyClass.otherFamilySponsorships.dependentChild.title"),
      description: t("familyClass.otherFamilySponsorships.dependentChild.description"),
    },
    {
      title: t("familyClass.otherFamilySponsorships.otherEligibleRelatives.title"),
      description: t("familyClass.otherFamilySponsorships.otherEligibleRelatives.description"),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
          <AnimatedHero
            title={t("familyClass.hero.title")}
            subtitle={t("familyClass.hero.subtitle")}
          />
        </div>
      </section>

      {/* Spousal and Common-Law Partner Sponsorship Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-red font-bold mb-2">
                  {t("familyClass.serviceOverview")}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  {t("familyClass.spousalSponsorship.title")}
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed mb-6">
                  <p>{t("familyClass.spousalSponsorship.description")}</p>
                </div>
                
                {/* Inland Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#2c2b2b] mb-3">
                    {t("familyClass.spousalSponsorship.inland.title")}
                  </h3>
                  <p className="text-[#2c2b2b]/80 leading-relaxed">
                    {t("familyClass.spousalSponsorship.inland.description")}
                  </p>
                </div>

                {/* Outland Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#2c2b2b] mb-3">
                    {t("familyClass.spousalSponsorship.outland.title")}
                  </h3>
                  <p className="text-[#2c2b2b]/80 leading-relaxed">
                    {t("familyClass.spousalSponsorship.outland.description")}
                  </p>
                </div>
              </div>
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                    [Image of a Couple]
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      {t("familyClass.usefulInfo.title")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("familyClass.spousalSponsorship.whoFor.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("familyClass.spousalSponsorship.whoFor.description")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#2c2b2b] mb-1">
                            {t("familyClass.spousalSponsorship.keyPoint.title")}
                          </div>
                          <p className="text-sm text-[#2c2b2b]/80">
                            {t("familyClass.spousalSponsorship.keyPoint.description")}
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

      {/* Other Family Sponsorships Section */}
      <section className="bg-[#f9f9f9]">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                {t("familyClass.otherFamilySponsorships.title")}
              </h2>
              <p className="text-lg text-[#2c2b2b]/80 leading-relaxed">
                {t("familyClass.otherFamilySponsorships.description")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {otherFamilySponsorships.map((sponsorship, index) => (
                <Reveal key={index} delay={0.1 * (index + 1)}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                      [Service Image]
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2c2b2b] mb-3">
                        {sponsorship.title}
                      </h3>
                      <p className="text-sm text-[#2c2b2b]/80 leading-relaxed mb-4">
                        {sponsorship.description}
                      </p>
                      <button className="w-full px-4 py-2 border-2 border-brand-red text-brand-red rounded-lg font-semibold hover:bg-brand-red hover:text-white transition-colors">
                        {t("familyClass.otherFamilySponsorships.learnMore")}
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
      <FamilyClassProcessSection lang={lang} />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-tr from-brand-red to-brand-maroon text-white text-center shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold">{t("familyClass.cta.title")}</h3>
              <Link
                href="https://www.northernpathways.ca/pre-assessment-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-6 items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-semibold transition-all"
              >
                {t("familyClass.cta.button")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

