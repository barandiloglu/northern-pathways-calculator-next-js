import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { BlogClient } from "./blog-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function BlogsPage({ params }: PageProps) {
  const { lang } = await params

  // Fetch published blog posts
  const blogPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      language: lang,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      description: true,
      featuredImage: true,
      heroImage: true,
      publishedAt: true,
      createdAt: true,
      featured: true,
      tags: true,
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  })

  // Fetch all categories with post counts
  const categories = await prisma.blogCategory.findMany({
    include: {
      posts: {
        where: {
          status: "PUBLISHED",
          language: lang,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })

  const categoriesWithCounts = categories.map((category) => ({
    name: category.name,
    count: category.posts.length,
  }))

  return (
    <div className="min-h-screen">
      <BlogClient lang={lang} blogPosts={blogPosts} categories={categoriesWithCounts} />
    </div>
  )
}

