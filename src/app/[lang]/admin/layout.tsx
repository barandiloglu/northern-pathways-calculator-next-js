import { redirect } from "next/navigation"
import { type Locale } from "@/lib/i18n-config"
import { getSessionUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"

interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}

export default async function AdminLayoutWrapper({ children, params }: AdminLayoutProps) {
  const { lang } = await params
  const user = await getSessionUser()

  if (!user) {
    redirect(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/admin`)}`)
  }

  return <AdminLayout lang={lang} user={user}>{children}</AdminLayout>
}

