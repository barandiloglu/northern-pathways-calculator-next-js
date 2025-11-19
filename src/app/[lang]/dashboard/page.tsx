import { redirect } from "next/navigation"
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
    redirect(`/${lang}/login`)
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <DashboardClient lang={lang} user={user} />
    </div>
  )
}

