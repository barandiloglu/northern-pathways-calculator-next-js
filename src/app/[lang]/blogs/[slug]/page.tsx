import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { BlogPostClient } from "./blog-post-client"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    select: {
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      title: true,
      subtitle: true,
      description: true,
      featuredImage: true,
      heroImage: true,
    },
  })

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  // Use metaTitle if available, otherwise fall back to title
  const title = post.metaTitle || post.title
  // Use metaDescription if available, otherwise fall back to description or subtitle
  const description =
    post.metaDescription || post.description || post.subtitle || undefined

  // Parse keywords if available
  const keywords = post.metaKeywords
    ? post.metaKeywords.split(",").map((k) => k.trim())
    : undefined

  // Get the base URL for Open Graph images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const imageUrl = post.featuredImage || post.heroImage || undefined
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${baseUrl}${imageUrl}`
    : undefined

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: fullImageUrl ? [{ url: fullImageUrl }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: fullImageUrl ? [fullImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return <BlogPostClient lang={lang} post={post} />
}

