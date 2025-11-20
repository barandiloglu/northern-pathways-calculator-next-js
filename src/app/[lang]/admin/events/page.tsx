import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { EventsClient } from "./events-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function AdminEventsPage({ params }: PageProps) {
  const { lang } = await params

  // Fetch all events with author
  const events = await prisma.event.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return <EventsClient lang={lang} events={events} />
}

