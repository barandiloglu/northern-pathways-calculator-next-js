import { type Locale } from "@/lib/i18n-config"
import { EventsClient } from "./events-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function EventsPage({ params }: PageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen">
      <EventsClient lang={lang} />
    </div>
  )
}

