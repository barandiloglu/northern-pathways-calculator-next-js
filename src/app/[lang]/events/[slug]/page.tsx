import { type Locale } from "@/lib/i18n-config"
import { EventDetailClient } from "./event-detail-client"

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { lang, slug } = await params

  return <EventDetailClient lang={lang} slug={slug} />
}

