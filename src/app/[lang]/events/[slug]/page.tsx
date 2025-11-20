import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { EventDetailClient } from "./event-detail-client"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { lang, slug } = await params

  const event = await prisma.event.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      language: lang,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  if (!event) {
    notFound()
  }

  return <EventDetailClient lang={lang} event={event} />
}

