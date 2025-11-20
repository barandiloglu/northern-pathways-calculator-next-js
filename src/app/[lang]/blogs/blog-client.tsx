"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"
import Image from "next/image"

interface BlogClientProps {
  lang: string
  blogPosts: Array<{
    id: string
    slug: string
    title: string
    subtitle: string | null
    description: string | null
    featuredImage: string | null
    heroImage: string | null
    publishedAt: Date | null
    createdAt: Date
    featured: boolean
    tags: string[]
    categories: Array<{
      id: string
      name: string
      slug: string
    }>
  }>
  categories: Array<{
    name: string
    count: number
  }>
}

interface Category {
  name: string
  count: number
}

function formatDate(date: Date | string | null): string {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

export function BlogClient({ lang, blogPosts, categories }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Featured posts (featured flag first, then most recent)
  const featuredPosts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => {
      // If both are featured or neither, sort by date
      if ((a.featured && b.featured) || (!a.featured && !b.featured)) {
        const dateA = a.publishedAt || a.createdAt
        const dateB = b.publishedAt || b.createdAt
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      }
      // Featured posts first
      return a.featured ? -1 : 1
    })
    return sorted.slice(0, 3)
  }, [blogPosts])

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts

    const query = searchQuery.toLowerCase()
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.subtitle?.toLowerCase().includes(query) ||
        post.categories.some((cat) => cat.name.toLowerCase().includes(query)) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
    )
  }, [blogPosts, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by filteredPosts which updates automatically with searchQuery
  }

  return (
    <div className="bg-white">
      {/* Hero Section with Search */}
      <section className="relative overflow-hidden bg-[#f9f9f9]">
        <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              {/* Blog Tag */}
              <div className="inline-block px-4 py-1.5 bg-brand-red text-white text-sm font-bold rounded mb-4">
                Blog
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2c2b2b] mb-4">
                Northern Pathways Blog
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-[#2c2b2b]/70 mb-8">
                The latest insights, updates, and stories on Canadian immigration from our expert consultants.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#2c2b2b]/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-[#2c2b2b]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-brand-maroon transition-all duration-200 whitespace-nowrap"
                >
                  Find Now
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content - Articles */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-8">
                Recent Articles
              </h2>
            </Reveal>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#2c2b2b]/60 text-lg">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredPosts.map((post, index) => (
                  <Reveal key={post.id} delay={index * 0.1}>
                    <Link href={`/${lang}/blogs/${post.slug}`}>
                      <motion.article
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                      >
                        {/* Image */}
                        <div className="w-full h-48 bg-[#2c2b2b] relative overflow-hidden">
                          {post.featuredImage || post.heroImage ? (
                            <Image
                              src={post.featuredImage || post.heroImage || ""}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-white text-sm">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Category Tags */}
                          {post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.categories.slice(0, 2).map((category) => (
                                <span
                                  key={category.id}
                                  className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-semibold rounded-full"
                                >
                                  {category.name}
                                </span>
                              ))}
                              {post.categories.length > 2 && (
                                <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-semibold rounded-full">
                                  +{post.categories.length - 2}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-bold text-[#2c2b2b] mb-3 line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[#2c2b2b]/70 text-sm leading-relaxed flex-1 line-clamp-3 mb-3">
                            {post.description || post.subtitle || ""}
                          </p>

                          {/* Date */}
                          {post.publishedAt && (
                            <p className="text-xs text-[#2c2b2b]/50 mt-auto">
                              {formatDate(post.publishedAt)}
                            </p>
                          )}
                        </div>
                      </motion.article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Featured Posts */}
              <Reveal delay={0.2}>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c2b2b] mb-6">
                    Featured Posts
                  </h3>
                  <div className="space-y-4">
                    {featuredPosts.map((post, index) => (
                      <Link key={post.id} href={`/${lang}/blogs/${post.slug}`}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 4 }}
                          className="flex gap-4 group cursor-pointer"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 bg-[#2c2b2b] flex items-center justify-center flex-shrink-0 rounded relative overflow-hidden">
                            {post.featuredImage || post.heroImage ? (
                              <Image
                                src={post.featuredImage || post.heroImage || ""}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-white text-xs">No Img</span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#2c2b2b]/60 mb-1">
                              {formatDate(post.publishedAt || post.createdAt)}
                            </p>
                            <h4 className="text-sm font-semibold text-[#2c2b2b] group-hover:text-brand-red transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Categories */}
              <Reveal delay={0.3}>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c2b2b] mb-6">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <Link
                          href={`/${lang}/blogs?category=${encodeURIComponent(category.name)}`}
                          className="flex items-center justify-between group cursor-pointer py-2"
                        >
                          <span className="text-[#2c2b2b] group-hover:text-brand-red transition-colors">
                            {category.name}
                          </span>
                          <span className="text-[#2c2b2b]/60 text-sm">
                            ({category.count})
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

