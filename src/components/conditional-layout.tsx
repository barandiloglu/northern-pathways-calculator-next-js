"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Footer } from "./footer"
import { type Locale } from "@/lib/i18n-config"

interface ConditionalLayoutProps {
  children: React.ReactNode
  lang: Locale
}

export function ConditionalLayout({ children, lang }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isLoginPage = pathname?.includes("/login")
  const isAdminPage = pathname?.includes("/admin/")

  return (
    <>
      {!isLoginPage && !isAdminPage && <Header lang={lang} />}
      <main className={isLoginPage || isAdminPage ? "min-h-screen" : "pt-16 sm:pt-20 md:pt-24"}>
        {children}
      </main>
      {!isLoginPage && !isAdminPage && <Footer lang={lang} />}
    </>
  )
}

