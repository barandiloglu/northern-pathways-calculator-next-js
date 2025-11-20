import { NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET all registrations for an event (admin only)
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id },
      select: { id: true, title: true },
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    // Get all registrations for the event
    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId: id },
      orderBy: {
        registeredAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      registrations,
      count: registrations.length,
    })
  } catch (error) {
    console.error("Fetch registrations error:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching registrations" },
      { status: 500 }
    )
  }
}

