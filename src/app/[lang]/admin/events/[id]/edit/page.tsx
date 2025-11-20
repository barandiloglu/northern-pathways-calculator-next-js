import { type Locale } from "@/lib/i18n-config"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import { EditEventClient } from "./edit-event-client"

interface PageProps {
  params: Promise<{ lang: Locale; id: string }>
}

export default async function EditEventPage({ params }: PageProps) {
  const { lang, id } = await params
  const user = await getSessionUser()

  if (!user) {
    redirect(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/admin/events/${id}/edit`)}`)
  }

  // Fetch the event
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
    },
  })

  if (!event) {
    notFound()
  }

  return (
    <EditEventClient
      lang={lang}
      event={event}
      authorName={user.name}
      authorEmail={user.email}
    />
  )
}

