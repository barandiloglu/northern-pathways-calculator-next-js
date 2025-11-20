import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { BlogsClient } from "./blogs-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function AdminBlogsPage({ params }: PageProps) {
  const { lang } = await params

  // Fetch all blogs with author and categories
  const blogs = await prisma.blogPost.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  })

  return <BlogsClient lang={lang} blogs={blogs} />
}

