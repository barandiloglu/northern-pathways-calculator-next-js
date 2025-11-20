import { type Locale } from "@/lib/i18n-config"
import { getSessionUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewEventClient } from "./new-event-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function NewEventPage({ params }: PageProps) {
  const { lang } = await params
  const user = await getSessionUser()

  if (!user) {
    redirect(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/admin/events/new`)}`)
  }

  return (
    <NewEventClient
      lang={lang}
      authorName={user.name}
      authorEmail={user.email}
    />
  )
}

