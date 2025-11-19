import { type Locale } from "@/lib/i18n-config"
import { LoginClient } from "./login-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function LoginPage({ params }: PageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <LoginClient lang={lang} />
    </div>
  )
}

