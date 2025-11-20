import { type Locale } from "@/lib/i18n-config"
import { prisma } from "@/lib/prisma"
import { EventsClient } from "./events-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function EventsPage({ params }: PageProps) {
  const { lang } = await params

  // Fetch published events
  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      language: lang,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      description: true,
      startDate: true,
      endDate: true,
      startTime: true,
      endTime: true,
      timezone: true,
      locationType: true,
      address: true,
      city: true,
      province: true,
      country: true,
      meetingLink: true,
      type: true,
      category: true,
      color: true,
      coverImage: true,
      heroImage: true,
      featuredImage: true,
      status: true,
      featured: true,
      publishedAt: true,
      createdAt: true,
      capacity: true,
      registeredCount: true,
    },
    orderBy: {
      startDate: "asc",
    },
  })

  return (
    <div className="min-h-screen">
      <EventsClient lang={lang} events={events} />
    </div>
  )
}

