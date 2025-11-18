"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, Clock } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"

interface BlogPostClientProps {
  lang: string
  slug: string
}

// Hardcoded blog post data - will be replaced with database fetch
const getBlogPost = (slug: string) => {
  const posts: Record<string, any> = {
    "top-5-mistakes-express-entry-profile": {
      title: "Top 5 Mistakes to Avoid on Your Express Entry Profile",
      subtitle: "An incomplete or inaccurate profile is the most common reason for a rejected application. Here's what to watch out for to ensure your profile is perfect.",
      author: {
        name: "Burcu Akyol",
        initials: "NP",
        avatar: "/logo.png"
      },
      date: "17 Nov 2025",
      categories: ["Express Entry", "PNP"],
      readTime: "7 min read",
      heroImage: "/placeholder-hero.jpg",
      tableOfContents: [
        { id: "introduction", title: "Introduction", level: 1 },
        { id: "miscalculating-crs", title: "1. Miscalculating CRS Points", level: 1 },
        { id: "incorrect-noc", title: "2. Incorrect NOC/TEER Code", level: 1 },
        { id: "missing-documents", title: "3. Missing or Invalid Documents", level: 1 },
        { id: "conclusion", title: "Conclusion", level: 1 }
      ],
      content: [
        {
          type: "heading",
          id: "introduction",
          level: 1,
          text: "Introduction"
        },
        {
          type: "paragraph",
          text: "Creating an Express Entry profile is the first step toward Canadian permanent residency, but many applicants make critical mistakes that can delay or derail their application. This guide covers the top 5 mistakes to avoid when creating your profile."
        },
        {
          type: "heading",
          id: "miscalculating-crs",
          level: 1,
          text: "1. Miscalculating CRS Points"
        },
        {
          type: "paragraph",
          text: "The Comprehensive Ranking System (CRS) score determines your ranking in the Express Entry pool. Many applicants overestimate their points, leading to disappointment when they don't receive an Invitation to Apply (ITA)."
        },
        {
          type: "subheading",
          text: "How to Avoid This:"
        },
        {
          type: "paragraph",
          text: "Use the official CRS calculator on the IRCC website. Double-check your language test scores, education credentials assessment, and work experience calculations. Remember that points can change based on your spouse's credentials and language abilities."
        },
        {
          type: "heading",
          id: "incorrect-noc",
          level: 1,
          text: "2. Incorrect NOC/TEER Code"
        },
        {
          type: "paragraph",
          text: "Selecting the wrong National Occupational Classification (NOC) or TEER code is a common mistake that can result in your application being refused. Your job title doesn't always match the NOC code - it's your actual duties that matter."
        },
        {
          type: "subheading",
          text: "How to Avoid This:"
        },
        {
          type: "paragraph",
          text: "Do not just pick a code based on your job title. You must read the official NOC website, compare your actual day-to-day duties, and ensure your reference letter *proves* you performed those tasks."
        },
        {
          type: "heading",
          id: "missing-documents",
          level: 1,
          text: "3. Missing or Invalid Documents"
        },
        {
          type: "paragraph",
          text: "When you receive an ITA, you have only 60 days to submit a perfect application. Many applicants realize too late that their documents are missing or expired."
        },
        {
          type: "list",
          items: [
            "Police Certificates: You need a certificate from *every* country you have lived in for 6 months or more in a row since the age of 18. These can take months to obtain.",
            "Language Tests: Your test results must be valid (less than 2 years old) on the day you submit your eAPR.",
            "Proof of Funds: The bank letter must be on official letterhead, show an average balance for the last 6 months, and list any outstanding debts. A simple bank statement is not enough."
          ]
        },
        {
          type: "paragraph",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        },
        {
          type: "heading",
          id: "conclusion",
          level: 1,
          text: "Conclusion: When in Doubt, Ask an Expert"
        },
        {
          type: "paragraph",
          text: "Your Express Entry profile is the foundation of your Canadian immigration journey. Mistakes here can cost you time, money, and potentially your chance at permanent residency. If you're unsure about any part of your profile, consider consulting with a Regulated Canadian Immigration Consultant (RCIC)."
        },
        {
          type: "paragraph",
          text: "An RCIC can review your profile, verify your CRS points, ensure your NOC code is correct, and help you prepare all necessary documents before you submit. Book a consultation today for peace of mind."
        }
      ]
    }
  }
  return posts[slug] || null
}

export function BlogPostClient({ lang, slug }: BlogPostClientProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const contentRefs = useRef<Record<string, HTMLDivElement>>({})

  const post = getBlogPost(slug)

  // Scroll spy for table of contents
  useEffect(() => {
    if (!post) return
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    const refs = contentRefs.current
    Object.values(refs).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(refs).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [post])

  const scrollToSection = (id: string) => {
    const element = contentRefs.current[id]
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2c2b2b] mb-4">Post Not Found</h1>
          <Link href={`/${lang}/blogs`} className="text-brand-red hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2c2b2b] mb-4">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-[#2c2b2b]/70 mb-8">
                {post.subtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      <section className="w-full">
        <div className="w-full h-64 md:h-96 bg-[#2c2b2b] flex items-center justify-center">
          <span className="text-white text-lg md:text-2xl">Blog Post Hero Image</span>
        </div>
      </section>

      {/* Author and Metadata Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2c2b2b] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{post.author.initials}</span>
              </div>
              <div>
                <p className="font-bold text-[#2c2b2b] text-base">{post.author.name}</p>
                <p className="text-sm text-[#2c2b2b]/60">Published {post.date}</p>
              </div>
            </div>

            {/* Categories and Read Time */}
            <div className="flex items-center gap-2 flex-wrap">
              {post.categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-brand-red text-white text-xs font-semibold rounded-full"
                >
                  {category}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-gray-200 text-[#2c2b2b] text-xs font-semibold rounded-full flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Table of Contents - Left Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <Reveal delay={0.1}>
                  <div>
                    <h3 className="text-sm font-bold text-[#2c2b2b] uppercase tracking-wider mb-6">
                      TABLE OF CONTENTS
                    </h3>
                    <nav className="space-y-1">
                      {post.tableOfContents.map((item: { id: string; title: string; level: number }) => {
                        const isActive = activeSection === item.id
                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left flex items-center justify-between gap-3 py-2.5 px-2 rounded transition-all duration-200 group ${
                              isActive
                                ? "text-brand-red font-semibold"
                                : "text-[#2c2b2b] hover:text-brand-red"
                            }`}
                          >
                            <span className="text-sm flex-1">{item.title}</span>
                            <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${
                              isActive ? "text-brand-red" : "text-[#2c2b2b]/40 group-hover:text-brand-red"
                            }`} />
                          </button>
                        )
                      })}
                    </nav>
                  </div>
                </Reveal>
              </div>
            </aside>

            {/* Main Content - Right Column */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <Reveal delay={0.2}>
                <article className="prose prose-lg max-w-none">
                  {post.content.map((block: any, index: number) => {
                    if (block.type === "heading") {
                      const HeadingTag = `h${block.level + 1}` as keyof React.JSX.IntrinsicElements
                      return (
                        <div
                          key={index}
                          id={block.id}
                          ref={(el) => {
                            if (el) contentRefs.current[block.id] = el
                          }}
                          className="scroll-mt-24"
                        >
                          <HeadingTag className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mt-10 mb-6 first:mt-0">
                            {block.text}
                          </HeadingTag>
                        </div>
                      )
                    }

                    if (block.type === "subheading") {
                      return (
                        <h3 key={index} className="text-xl font-semibold text-[#2c2b2b] mt-8 mb-4">
                          {block.text}
                        </h3>
                      )
                    }

                    if (block.type === "paragraph") {
                      return (
                        <p
                          key={index}
                          className="text-[#2c2b2b]/80 leading-relaxed mb-6 text-base md:text-lg"
                        >
                          {block.text}
                        </p>
                      )
                    }

                    if (block.type === "list") {
                      return (
                        <ul key={index} className="list-disc list-inside space-y-3 mb-6 text-[#2c2b2b]/80 text-base md:text-lg">
                          {block.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    return null
                  })}
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

