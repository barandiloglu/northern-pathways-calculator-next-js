"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"

interface BlogClientProps {
  lang: string
}

interface BlogPost {
  id: string
  title: string
  description: string
  category: string
  date: string
  image?: string
  slug: string
}

interface Category {
  name: string
  count: number
}

// Hardcoded blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Mistakes to Avoid on Your Profile",
    description: "An incomplete or inaccurate profile is the most common reason for a rejected application. Here's what to watch out for...",
    category: "Express Entry",
    date: "November 17, 2025",
    slug: "top-5-mistakes-express-entry-profile"
  },
  {
    id: "2",
    title: "Guide to Writing a Strong Letter of Explanation",
    description: "Your Letter of Explanation (LOE) is your chance to speak directly to the visa officer. We explain how to make it count.",
    category: "Study Permits",
    date: "November 10, 2025",
    slug: "guide-strong-letter-explanation"
  },
  {
    id: "3",
    title: "Understanding the Latest OINP Draw",
    description: "Ontario just held a new draw for tech and healthcare workers. See if you qualify and what it means for your application.",
    category: "PNP",
    date: "November 3, 2025",
    slug: "understanding-latest-oinp-draw"
  },
  {
    id: "4",
    title: "Inland vs. Outland Spousal Sponsorship",
    description: "Choosing the right sponsorship stream is critical. We break down the pros and cons of applying from inside or outside Canada.",
    category: "Sponsorship",
    date: "October 27, 2025",
    slug: "inland-vs-outland-spousal-sponsorship"
  },
  {
    id: "5",
    title: "How to Prepare for the Canadian Citizenship Test",
    description: "The final step! We've compiled our top tips and resources to help you study effectively and pass the test with confidence.",
    category: "Citizenship",
    date: "October 20, 2025",
    slug: "prepare-canadian-citizenship-test"
  },
  {
    id: "6",
    title: "What is a Labour Market Impact Assessment (LMIA)?",
    description: "The LMIA is a complex but crucial document for many work permits. Learn what it is and why your employer might need one.",
    category: "Work Permits",
    date: "October 13, 2025",
    slug: "what-is-lmia-labour-market-impact-assessment"
  }
]

const categories: Category[] = [
  { name: "Express Entry", count: 12 },
  { name: "Provincial Nominee Programs (PNP)", count: 8 },
  { name: "Study Permits", count: 7 },
  { name: "Work Permits", count: 5 },
  { name: "Family Sponsorship", count: 10 },
  { name: "Citizenship", count: 4 },
  { name: "Business & Investors", count: 3 }
]

export function BlogClient({ lang }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Featured posts (most recent 3)
  const featuredPosts = blogPosts.slice(0, 3)

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality will be implemented later
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <Reveal key={post.id} delay={index * 0.1}>
                  <Link href={`/${lang}/blogs/${post.slug}`}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                    >
                      {/* Image Placeholder */}
                      <div className="w-full h-48 bg-[#2c2b2b] flex items-center justify-center">
                        <span className="text-white text-sm">[Placeholder]</span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category Tag */}
                        <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-semibold rounded-full mb-3 w-fit">
                          {post.category}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#2c2b2b] mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#2c2b2b]/70 text-sm leading-relaxed flex-1 line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                    </motion.article>
                  </Link>
                </Reveal>
              ))}
            </div>
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
                          {/* Image Placeholder */}
                          <div className="w-20 h-20 bg-[#2c2b2b] flex items-center justify-center flex-shrink-0 rounded">
                            <span className="text-white text-xs">Img</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#2c2b2b]/60 mb-1">
                              {post.date}
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

