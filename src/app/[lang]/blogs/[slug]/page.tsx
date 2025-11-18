import { type Locale } from "@/lib/i18n-config"
import { BlogPostClient } from "./blog-post-client"

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params

  return <BlogPostClient lang={lang} slug={slug} />
}

