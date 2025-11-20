import { type Locale } from "@/lib/i18n-config"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { NewBlogClient } from "./new-blog-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function NewBlogPage({ params }: PageProps) {
  const { lang } = await params
  const user = await getSessionUser()

  if (!user) {
    redirect(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/admin/blogs/new`)}`)
  }

  // Fetch categories for selection
  const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
  })

  return (
    <NewBlogClient
      lang={lang}
      categories={categories}
      authorName={user.name}
      authorEmail={user.email}
    />
  )
}

