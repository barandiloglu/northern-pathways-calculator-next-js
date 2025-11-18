"use client"

import { useState, useEffect } from "react"
import { type Locale } from "@/lib/i18n-config"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface InvestorsPageClientProps {
  lang: Locale
}

interface NavigationItem {
  id: string
  label: string
}

export function InvestorsPageClient({ lang }: InvestorsPageClientProps) {
  const [activeSection, setActiveSection] = useState<string>("intro")

  const navigationItems: NavigationItem[] = [
    { id: "intro", label: "Business Immigration" },
    { id: "startup-visa", label: "Start-up Visa Program" },
    { id: "pnp-streams", label: "PNP Entrepreneur Streams" },
    { id: "self-employed", label: "Self-Employed Persons" },
    { id: "how-we-help", label: "How We Can Help" },
  ]

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-card section')
      const navLinks = document.querySelectorAll('.sticky-nav ul li a')
      
      if (sections.length === 0 || navLinks.length === 0) return

      let current = ''

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id') || ''
        }
      })

      navLinks.forEach((link) => {
        const anchor = link as HTMLAnchorElement
        anchor.classList.remove('active')
        if (anchor.getAttribute('href') === `#${current}`) {
          anchor.classList.add('active')
        }
      })

      setActiveSection(current || navigationItems[0].id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run on page load

    return () => window.removeEventListener('scroll', handleScroll)
  }, [navigationItems])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 120
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="bg-[#f8f8f8]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16">
          {/* Left-hand Sticky Navigation */}
          <aside className="sticky-nav">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h4 className="text-base font-bold uppercase tracking-wider text-[#2c3e50] mb-4 pb-2 border-b-2 border-gray-200">
                On This Page
              </h4>
              <nav>
                <ul className="space-y-0">
                  {navigationItems.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.id)
                          }}
                          className={`block py-3 pl-4 text-[#555] font-semibold text-[0.95rem] border-l-[3px] transition-all duration-200 ${
                            isActive
                              ? "text-brand-red border-l-brand-red bg-white"
                              : "border-l-transparent hover:text-brand-red hover:bg-white"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Right-hand Content Card */}
          <article className="content-card">
            {/* Section 1: Introduction */}
            <section id="intro" className="mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-6">
                Canada's Business Immigration Pathways
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed mb-6">
                <p>
                  Canada offers several programs for entrepreneurs and investors to obtain permanent residence by establishing or buying a business, expanding existing operations, or as a self-employed person. These programs are designed to attract innovative individuals who can contribute to the Canadian economy and create jobs.
                </p>
                <p>
                  Since business immigration has a more complex and ever-evolving nature, we provide custom quotes after an initial consultation. Our team can help you navigate these intricate pathways.
                </p>
              </div>
              <Link
                href={`/${lang}/book-consultation`}
                className="inline-block px-8 py-3 bg-brand-red hover:bg-[#9c1a1f] text-white rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Book a Consultation
              </Link>
            </section>

            {/* Section 2: Start-up Visa */}
            <section id="startup-visa" className="mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-6">
                Start-up Visa Program
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                Canada's Start-up Visa Program targets immigrant entrepreneurs with the skills and potential to build innovative businesses in Canada that can create jobs for Canadians and compete on a global scale.
              </p>
              <h3 className="text-xl font-bold text-brand-red mb-4 mt-8">
                Key Requirements:
              </h3>
              <ul className="space-y-3 mb-6 ml-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <div className="text-[#555]">
                    <strong className="text-[#2c3e50]">Qualifying Business:</strong> You must demonstrate active and ongoing management of your business from within Canada. You must hold at least 10% of the voting rights, and the combined ownership between you and a designated organization must be over 50%.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <div className="text-[#555]">
                    <strong className="text-[#2c3e50]">Letter of Support:</strong> You must have a letter of support from a designated organization (a venture capital fund, angel investor group, or business incubator).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <div className="text-[#555]">
                    <strong className="text-[#2c3e50]">Language Proficiency:</strong> You must meet the minimum language requirements in English or French (CLB 5).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <div className="text-[#555]">
                    <strong className="text-[#2c3e50]">Settlement Funds:</strong> You must prove you have sufficient funds to support yourself and your dependents upon arrival.
                  </div>
                </li>
              </ul>
              <p className="text-[#555] leading-relaxed">
                After applying for permanent residence, eligible applicants can also apply for a temporary work permit to start building their business in Canada while waiting for a decision.
              </p>
            </section>

            {/* Section 3: PNP Streams */}
            <section id="pnp-streams" className="mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-6">
                PNP Entrepreneur Streams
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                Most Canadian provinces offer entrepreneur immigration streams under their Provincial Nominee Programs (PNPs). These programs are designed to attract business owners and investors who are committed to starting or managing businesses in specific regions, often outside of major cities, to boost local economies.
              </p>
              <h3 className="text-xl font-bold text-brand-red mb-4 mt-8">
                Typical Requirements:
              </h3>
              <ul className="space-y-3 mb-6 ml-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Establish and actively manage a business within the province.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Meet specific investment and job creation criteria.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Have a minimum personal net worth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Operate the business for a set period before becoming eligible for nomination.</span>
                </li>
              </ul>
              <p className="text-[#555] leading-relaxed">
                Applicants who successfully meet the program criteria receive a Provincial Nominee Certificate, which allows them to apply to the Federal government for permanent residence. This is a rewarding pathway for those willing to commit to a province's economic growth.
              </p>
            </section>

            {/* Section 4: Self-Employed */}
            <section id="self-employed" className="mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-6">
                Self-Employed Persons Program
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                The Self-Employed Persons Program allows individuals to immigrate to Canada permanently as a self-employed person. Applicants must have relevant experience in cultural activities or athletics and intend to make a significant contribution to the cultural or athletic life of Canada.
              </p>
              <div className="bg-[#fff8e1] border border-[#ffe5b9] border-l-[5px] border-l-[#ffb300] p-6 rounded-r-lg my-6">
                <p className="text-[#6d4c00] font-semibold mb-0">
                  <strong className="text-[#593e00]">Important Note:</strong> As of April 30, 2024, the intake for the Self-Employed Persons Program has been paused until 2026.
                </p>
              </div>
            </section>

            {/* Section 5: How We Help */}
            <section id="how-we-help" className="mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-6">
                How We Can Help
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                Navigating business immigration is complex. Our team provides tailored support to help you identify the most suitable program for your goals, prepare a strong application, and ensure your business plan aligns with the program's specific criteria and legal requirements.
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Comprehensive consultation to assess your eligibility and business concept.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Guidance on developing a viable and compliant business plan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Assistance with obtaining letters of support from designated organizations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Meticulous preparation of your application package.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-[#555]">Support with work permit applications to get your business started.</span>
                </li>
              </ul>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}

