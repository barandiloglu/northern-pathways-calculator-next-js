import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { firstName, lastName, email } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check if event exists and is published
    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        status: true,
        registrationRequired: true,
        capacity: true,
        registeredCount: true,
        registrationDeadline: true,
        startDate: true,
      },
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    // Check if event is published
    if (event.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Event is not available for registration" },
        { status: 400 }
      )
    }

    // Check if registration is required
    if (!event.registrationRequired) {
      return NextResponse.json(
        { error: "Registration is not required for this event" },
        { status: 400 }
      )
    }

    // Check if registration deadline has passed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return NextResponse.json(
        { error: "Registration deadline has passed" },
        { status: 400 }
      )
    }

    // Check if event has capacity and is full
    if (event.capacity && event.registeredCount >= event.capacity) {
      return NextResponse.json(
        { error: "Event is full" },
        { status: 400 }
      )
    }

    // Check if user is already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_email: {
          eventId: id,
          email: email.toLowerCase().trim(),
        },
      },
    })

    if (existingRegistration) {
      if (existingRegistration.status === "CANCELLED") {
        // Allow re-registration if previous was cancelled
      } else {
        return NextResponse.json(
          { error: "You are already registered for this event" },
          { status: 400 }
        )
      }
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        status: "PENDING",
      },
    })

    // Update event registeredCount
    await prisma.event.update({
      where: { id },
      data: {
        registeredCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      registration,
      message: "Registration submitted successfully",
    })
  } catch (error: any) {
    console.error("Registration error:", error)

    // Handle unique constraint violation (duplicate email)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "An error occurred while processing your registration" },
      { status: 500 }
    )
  }
}

