"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, Clock } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"

interface BlogAuthor {
  id: string
  name: string | null
  email: string
}

interface BlogCategory {
  id: string
  name: string
  slug: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string | null
  content: any // JSON array
  tableOfContents: any | null // JSON array
  heroImage: string | null
  featuredImage: string | null
  readTime: string | null
  publishedAt: Date | string | null
  createdAt: Date | string
  author: BlogAuthor
  categories: BlogCategory[]
  tags: string[]
}

interface BlogPostClientProps {
  lang: string
  post: BlogPost
}

function getUserInitials(name: string | null, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  return email[0].toUpperCase()
}

function formatDate(date: Date | string | null): string {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateObj)
}

export function BlogPostClient({ lang, post }: BlogPostClientProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const contentRefs = useRef<Record<string, HTMLDivElement>>({})

  // Transform database content to component format
  const content = Array.isArray(post.content) ? post.content : []
  const tableOfContents = Array.isArray(post.tableOfContents)
    ? post.tableOfContents
    : []
  const categories = post.categories.map((cat) => cat.name)
  const authorInitials = getUserInitials(post.author.name, post.author.email)

  // Scroll spy for table of contents
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
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
  }, [])

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
              {post.subtitle && (
              <p className="text-lg md:text-xl text-[#2c2b2b]/70 mb-8">
                {post.subtitle}
              </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      {post.heroImage && (
      <section className="w-full">
          <div className="w-full h-64 md:h-96 bg-[#2c2b2b] overflow-hidden">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
        </div>
      </section>
      )}

      {/* Author and Metadata Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2c2b2b] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{authorInitials}</span>
              </div>
              <div>
                <p className="font-bold text-[#2c2b2b] text-base">
                  {post.author.name || post.author.email}
                </p>
                {post.publishedAt && (
                  <p className="text-sm text-[#2c2b2b]/60">
                    Published {formatDate(post.publishedAt)}
                  </p>
                )}
              </div>
            </div>

            {/* Categories and Read Time */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.length > 0 &&
                categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-brand-red text-white text-xs font-semibold rounded-full"
                >
                  {category}
                </span>
              ))}
              {post.readTime && (
              <span className="px-3 py-1.5 bg-gray-200 text-[#2c2b2b] text-xs font-semibold rounded-full flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Table of Contents - Left Sidebar */}
            {tableOfContents.length > 0 && (
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-4 lg:self-start">
                <Reveal delay={0.1}>
                  <div>
                    <h3 className="text-sm font-bold text-[#2c2b2b] uppercase tracking-wider mb-6">
                      TABLE OF CONTENTS
                    </h3>
                    <nav className="space-y-1">
                        {tableOfContents.map(
                          (item: { id: string; title: string; level: number }) => {
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
                                <ChevronDown
                                  className={`h-4 w-4 flex-shrink-0 transition-transform ${
                                    isActive
                                      ? "text-brand-red"
                                      : "text-[#2c2b2b]/40 group-hover:text-brand-red"
                                  }`}
                                />
                          </button>
                        )
                          }
                        )}
                    </nav>
                  </div>
                </Reveal>
              </div>
            </aside>
            )}

            {/* Main Content - Right Column */}
            <div
              className={
                tableOfContents.length > 0
                  ? "lg:col-span-3 order-1 lg:order-2"
                  : "lg:col-span-4"
              }
            >
              <Reveal delay={0.2}>
                <article className="prose prose-lg max-w-none">
                  {content.length > 0 ? (
                    content.map((block: any, index: number) => {
                    if (block.type === "heading") {
                        const HeadingTag = `h${(block.level || 1) + 1}` as keyof React.JSX.IntrinsicElements
                        const blockId = block.id || `heading-${index}`
                      return (
                        <div
                          key={index}
                            id={blockId}
                          ref={(el) => {
                              if (el) contentRefs.current[blockId] = el
                          }}
                          className="scroll-mt-24"
                        >
                          <HeadingTag className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mt-10 mb-6 first:mt-0">
                              {block.text || block.content || block.title}
                          </HeadingTag>
                        </div>
                      )
                    }

                    if (block.type === "subheading") {
                      return (
                          <h3
                            key={index}
                            className="text-xl font-semibold text-[#2c2b2b] mt-8 mb-4"
                          >
                            {block.text || block.content}
                        </h3>
                      )
                    }

                    if (block.type === "paragraph") {
                      return (
                        <p
                          key={index}
                          className="text-[#2c2b2b]/80 leading-relaxed mb-6 text-base md:text-lg"
                        >
                            {block.text || block.content}
                        </p>
                      )
                    }

                    if (block.type === "list") {
                        const items = block.items || block.content || []
                      return (
                          <ul
                            key={index}
                            className="list-disc list-inside space-y-3 mb-6 text-[#2c2b2b]/80 text-base md:text-lg"
                          >
                            {items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    return null
                    })
                  ) : (
                    <p className="text-[#2c2b2b]/60">No content available.</p>
                  )}
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

