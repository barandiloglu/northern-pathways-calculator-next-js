import { type Locale } from "@/lib/i18n-config"
import { BlogClient } from "./blog-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function BlogsPage({ params }: PageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen">
      <BlogClient lang={lang} />
    </div>
  )
}

