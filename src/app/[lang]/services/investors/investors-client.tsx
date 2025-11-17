"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { type Locale } from "@/lib/i18n-config"
import { Reveal } from "@/components/reveal"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface InvestorsPageClientProps {
  lang: Locale
}

interface NavigationItem {
  id: string
  label: string
}

export function InvestorsPageClient({ lang }: InvestorsPageClientProps) {
  const [activeSection, setActiveSection] = useState<string>("business-immigration")
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const navigationItems: NavigationItem[] = [
    { id: "business-immigration", label: "Business Immigration" },
    { id: "startup-visa", label: "Start-up Visa Program" },
    { id: "pnp-entrepreneur", label: "PNP Entrepreneur Streams" },
    { id: "self-employed", label: "Self-Employed Persons" },
    { id: "how-we-help", label: "How We Can Help" },
  ]

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150 // Offset for header and padding

      // Find which section is currently in view
      let currentSection = navigationItems[0].id

      for (let i = 0; i < navigationItems.length; i++) {
        const sectionId = navigationItems[i].id
        const section = sectionRefs.current[sectionId]
        
        if (section) {
          const sectionTop = section.offsetTop
          
          if (scrollPosition >= sectionTop - 100) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    handleScroll() // Check on mount

    return () => window.removeEventListener("scroll", onScroll)
  }, [navigationItems])

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId]
    if (section) {
      const headerOffset = 120
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      
      // Update active section immediately for better UX
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sticky Sidebar Navigation */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 z-10 bg-[#f9f9f9] rounded-xl p-6 border border-gray-200 transition-all duration-300">
              <h3 className="text-sm font-bold text-[#2c2b2b] uppercase tracking-wider mb-4">
                ON THIS PAGE
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white text-brand-red font-semibold shadow-sm border-l-4 border-brand-red"
                          : "text-[#2c2b2b] hover:bg-white/50 hover:text-brand-red"
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Business Immigration Section */}
            <section
              id="business-immigration"
              ref={(el) => { sectionRefs.current["business-immigration"] = el }}
              className="mb-16 scroll-mt-24"
            >
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  Canada's Business Immigration Pathways
                </h2>
                <div className="space-y-4 text-[#2c2b2b]/80 leading-relaxed mb-6">
                  <p>
                    Canada offers various programs for entrepreneurs and investors to obtain permanent residence by establishing or buying a business, expanding existing operations, or as a self-employed person. These programs aim to attract innovative individuals who can contribute to the Canadian economy and create jobs.
                  </p>
                  <p>
                    Business immigration can be complex, with each program having specific requirements and criteria. We provide custom quotes after an initial consultation, and our team can help you navigate these pathways to find the best fit for your goals.
                  </p>
                </div>
                <Link
                  href="https://www.northernpathways.ca/pre-assessment-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-maroon text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Book a Consultation
                </Link>
              </Reveal>
            </section>

            {/* Start-up Visa Program Section */}
            <section
              id="startup-visa"
              ref={(el) => { sectionRefs.current["startup-visa"] = el }}
              className="mb-16 scroll-mt-24"
            >
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  Start-up Visa Program
                </h2>
                <p className="text-[#2c2b2b]/80 leading-relaxed mb-6">
                  Canada's Start-up Visa Program targets immigrant entrepreneurs with the skills and potential to build innovative businesses in Canada that can create jobs for Canadians and compete on a global scale.
                </p>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-brand-red mb-4">
                    Key Requirements:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2c2b2b]">Qualifying Business:</span>
                        <span className="text-[#2c2b2b]/80"> You must own and manage at least 10% of the voting rights in the business, and no other person can hold more than 50% of the voting rights.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2c2b2b]">Letter of Support:</span>
                        <span className="text-[#2c2b2b]/80"> You must have a letter of support from a designated organization (venture capital fund, angel investor group, or business incubator).</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2c2b2b]">Language Proficiency:</span>
                        <span className="text-[#2c2b2b]/80"> Minimum CLB 5 in English or French in all four language abilities (reading, writing, speaking, listening).</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2c2b2b]">Settlement Funds:</span>
                        <span className="text-[#2c2b2b]/80"> Proof of sufficient funds to support yourself and your dependents upon arrival in Canada.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <p className="text-[#2c2b2b]/80 leading-relaxed">
                  Eligible applicants can apply for a temporary work permit while waiting for a permanent residence decision, allowing them to start their business in Canada sooner.
                </p>
              </Reveal>
            </section>

            {/* PNP Entrepreneur Streams Section */}
            <section
              id="pnp-entrepreneur"
              ref={(el) => { sectionRefs.current["pnp-entrepreneur"] = el }}
              className="mb-16 scroll-mt-24"
            >
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  PNP Entrepreneur Streams
                </h2>
                <p className="text-[#2c2b2b]/80 leading-relaxed mb-6">
                  Most Canadian provinces offer entrepreneur immigration streams under their Provincial Nominee Programs (PNPs) to attract business owners and investors to boost local economies. These programs are ideal for those willing to commit to a province's economic growth.
                </p>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-brand-red mb-4">
                    Typical Requirements:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-[#2c2b2b]/80">Establish and actively manage a business within the province.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-[#2c2b2b]/80">Meet specific investment and job creation criteria.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-[#2c2b2b]/80">Have a minimum personal net worth.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-[#2c2b2b]/80">Operate the business for a set period before becoming eligible for nomination.</span>
                    </li>
                  </ul>
                </div>
                <p className="text-[#2c2b2b]/80 leading-relaxed">
                  Successful applicants receive a Provincial Nominee Certificate, which they can use to apply for permanent residence. This is a rewarding pathway for those committed to contributing to a specific province's economy.
                </p>
              </Reveal>
            </section>

            {/* Self-Employed Persons Section */}
            <section
              id="self-employed"
              ref={(el) => { sectionRefs.current["self-employed"] = el }}
              className="mb-16 scroll-mt-24"
            >
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  Self-Employed Persons Program
                </h2>
                <p className="text-[#2c2b2b]/80 leading-relaxed mb-6">
                  The Self-Employed Persons Program allows individuals to immigrate to Canada permanently as a self-employed person. Applicants must have relevant experience in cultural activities or athletics and intend to make a significant contribution to the cultural or athletic life of Canada.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">Important Note:</p>
                      <p className="text-yellow-700 text-sm">
                        As of April 30, 2024, the intake for the Self-Employed Persons Program has been paused until 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* How We Can Help Section */}
            <section
              id="how-we-help"
              ref={(el) => { sectionRefs.current["how-we-help"] = el }}
              className="mb-16 scroll-mt-24"
            >
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-6">
                  How We Can Help
                </h2>
                <p className="text-[#2c2b2b]/80 leading-relaxed mb-6">
                  Navigating business immigration is complex. Our team provides tailored support to help you identify the most suitable program for your goals, prepare a strong application, and ensure your business plan aligns with the program's specific criteria and legal requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="text-[#2c2b2b]/80">Comprehensive consultation to assess your eligibility and business concept.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="text-[#2c2b2b]/80">Guidance on developing a viable and compliant business plan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="text-[#2c2b2b]/80">Assistance with obtaining letters of support from designated organizations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="text-[#2c2b2b]/80">Meticulous preparation of your application package.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="text-[#2c2b2b]/80">Support with work permit applications to get your business started.</span>
                  </li>
                </ul>
              </Reveal>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

