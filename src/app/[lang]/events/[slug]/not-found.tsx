import Link from "next/link"
import { type Locale } from "@/lib/i18n-config"
import { defaultLocale } from "@/lib/i18n-config"

interface NotFoundProps {
  params?: Promise<{ lang: Locale; slug?: string }>
}

export default async function NotFound({ params }: NotFoundProps = {}) {
  let lang: Locale = defaultLocale
  
  if (params) {
    try {
      const resolvedParams = await params
      if (resolvedParams?.lang) {
        lang = resolvedParams.lang
      }
    } catch {
      // If params is invalid, use default locale
      lang = defaultLocale
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2c2b2b] mb-4">
          Event Not Found
        </h1>
        <p className="text-lg text-[#2c2b2b]/70 mb-8 max-w-md mx-auto">
          The event you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          href={`/${lang}/events`}
          className="inline-block px-6 py-3 bg-[#b92025] text-white rounded-lg font-semibold hover:bg-[#7d1416] transition-colors"
        >
          Return to Events
        </Link>
      </div>
    </div>
  )
}

