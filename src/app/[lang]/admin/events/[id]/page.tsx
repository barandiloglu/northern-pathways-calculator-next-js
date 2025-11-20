import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EventDetailClient } from "./event-detail-client"

interface PageProps {
  params: Promise<{ lang: Locale; id: string }>
}

export default async function AdminEventDetailPage({ params }: PageProps) {
  const { lang, id } = await params

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      registrations: {
        orderBy: {
          registeredAt: "desc",
        },
      },
    },
  })

  if (!event) {
    notFound()
  }

  return <EventDetailClient lang={lang} event={event} />
}

