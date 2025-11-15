import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "../globals.css"
import { Header } from "@/components/header"
import { isValidLocale, defaultLocale } from "@/lib/i18n-config"
import { notFound } from "next/navigation"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: "Northern Pathways - Immigration Assessment Tools",
  description: "Professional immigration assessment tools for Express Entry and Federal Skilled Worker Program",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params
  
  if (!isValidLocale(lang)) {
    notFound()
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={montserrat.variable} suppressHydrationWarning>
        <Header lang={lang} />
        <main className="pt-28">
          {children}
        </main>
      </body>
    </html>
  )
}

