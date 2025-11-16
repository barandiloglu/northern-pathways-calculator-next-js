import { getTranslations } from "@/lib/i18n"
import { type Locale } from "@/lib/i18n-config"
import Link from "next/link"
import { Suspense } from "react"
import { AnimatedHero } from "@/components/animated-hero"
import { Reveal } from "@/components/reveal"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params
  const t = getTranslations(lang)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24">
          <AnimatedHero
            title="About Northern Pathways"
            subtitle="Your trusted partners on the journey to Canada."
          />
        </div>
      </section>

      {/* Mission / Vision alternating */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20 space-y-16 md:space-y-24">
          {/* Mission */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal delay={0.05}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-red">Our Mission</h2>
                  <p className="mt-4 text-[#2c2b2b]/80 leading-relaxed">
                    We are immigrants ourselves, each of us at a different stage in our journey,
                    and we understand what it means to navigate complex systems while building a life
                    from the ground up. You&apos;ll never be just a file number. Our team brings care,
                    lived experience, and deep respect for your goals.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-xl h-64 md:h-72 w-full flex items-center justify-center text-gray-400">
                  [Company Mission Image]
                </div>
              </Reveal>
            </div>
          </Reveal>

          {/* Vision */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-xl h-64 md:h-72 w-full flex items-center justify-center text-gray-400 order-1 md:order-none">
                  [Company Vision Image]
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-red">Our Vision</h2>
                  <p className="mt-4 text-[#2c2b2b]/80 leading-relaxed">
                    To be a leading Canadian immigration consulting firm, known for integrity,
                    expertise, and a client-focused approach. We aim to turn aspirations into reality,
                    building a stronger, more diverse Canada.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-[#213142] text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { k: "10+", l: "Years of Experience" },
                { k: "500+", l: "Happy Clients" },
                { k: "98%", l: "Success Rate" },
                { k: "15+", l: "Countries Served" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 0.05}>
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold">{s.k}</div>
                    <div className="mt-1 text-white/80 text-sm md:text-base">{s.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b]">Meet Our Team</h2>
              <p className="mt-4 text-[#2c2b2b]/70">
                We are a team of dedicated, regulated professionals passionate about helping you succeed.
              </p>
            </div>
          </Reveal>

          {/* Lead profile */}
          <Reveal>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal delay={0.05}>
                <div className="rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-xl h-72 md:h-80 w-full flex items-center justify-center text-gray-400">
                  [Burcu&apos;s Photo]
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#2c2b2b]">Burcu Akyol</h3>
                  <div className="mt-1 font-semibold text-brand-red">
                    Founder, RCIC-IRB, Adjunct Professor at Queen&apos;s University
                  </div>
                  <p className="mt-4 text-[#2c2b2b]/80 leading-relaxed">
                    Burcu is the heart behind Northern Pathways. Known for sharp attention to detail,
                    high energy, and a deep commitment to doing things the right way. She also serves
                    on CAPIC&apos;s Board of Directors.
                  </p>
                  <div className="mt-6 flex gap-3 text-xs">
                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-[#2c2b2b] font-semibold">RCIC-IRB</span>
                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-[#2c2b2b] font-semibold">CAPIC</span>
                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-[#2c2b2b] font-semibold">AC CP</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>

          {/* Secondary lead */}
          <Reveal>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal delay={0.05}>
                <div className="order-2 md:order-none">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#2c2b2b]">Tugsel Akyol</h3>
                  <div className="mt-1 font-semibold text-brand-red">
                    Education and Career Consultant
                  </div>
                  <p className="mt-4 text-[#2c2b2b]/80 leading-relaxed">
                    With 25+ years of human resources experience, Tugsel brings clarity and
                    direction to training and development. Founder of our solution partner,
                    EduPathways Canada.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-xl h-72 md:h-80 w-full flex items-center justify-center text-gray-400 order-1 md:order-none">
                  [Tugsel&apos;s Photo]
                </div>
              </Reveal>
            </div>
          </Reveal>

          {/* Core team grid (placeholders) */}
          <div className="mt-16">
            <h3 className="text-center text-2xl md:text-3xl font-extrabold text-[#2c2b2b]">Our Core Team</h3>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Dilsat Harika Eke", title: "Client Relations Manager" },
                { name: "Seda Karaca", title: "Case Processing Lead" },
                { name: "Seyda Can Goklerinoglu", title: "Finance Officer" },
                { name: "Baran Diloglu", title: "[Placeholder Title, e.g., Case Analyst]" },
                { name: "Yiğit Pala", title: "[Placeholder Title, e.g., Marketing Specialist]" },
              ].map((member) => (
                <Reveal key={member.name}>
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <div className="h-44 bg-gradient-to-b from-gray-100 to-gray-50 w-full flex items-center justify-center text-gray-400">
                      [{member.name.split(" ")[0]}'s Photo]
                    </div>
                    <div className="p-6">
                      <div className="text-lg font-extrabold text-[#2c2b2b]">{member.name}</div>
                      <div className="text-brand-red font-semibold text-sm mt-1">{member.title}</div>
                      <p className="mt-3 text-sm text-[#2c2b2b]/75">
                        Placeholder bio. Please add professional details and contributions for this team member.
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

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

