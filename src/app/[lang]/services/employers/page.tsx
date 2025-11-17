import { type Locale } from "@/lib/i18n-config"
import { EmployersPageClient } from "./employers-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function EmployersPage({ params }: PageProps) {
  const { lang } = await params
  return <EmployersPageClient lang={lang} />
}
