import { type Locale } from "@/lib/i18n-config"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import { EditBlogClient } from "./edit-blog-client"

interface PageProps {
  params: Promise<{ lang: Locale; id: string }>
}

export default async function EditBlogPage({ params }: PageProps) {
  const { lang, id } = await params
  const user = await getSessionUser()

  if (!user) {
    redirect(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/admin/blogs/${id}/edit`)}`)
  }

  // Fetch the blog post
  const blogPost = await prisma.blogPost.findUnique({
    where: { id },
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

  if (!blogPost) {
    notFound()
  }

  // Fetch all categories for selection
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <EditBlogClient
      lang={lang}
      blogPost={blogPost}
      categories={categories}
      authorName={user.name}
      authorEmail={user.email}
    />
  )
}

