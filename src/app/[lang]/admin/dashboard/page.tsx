import { type Locale } from "@/lib/i18n-config"
import { getSessionUser } from "@/lib/auth"
import { DashboardClient } from "./dashboard-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function DashboardPage({ params }: PageProps) {
  const { lang } = await params
  const user = await getSessionUser()

  if (!user) {
    return null
  }

  return <DashboardClient lang={lang} user={user} />
}

