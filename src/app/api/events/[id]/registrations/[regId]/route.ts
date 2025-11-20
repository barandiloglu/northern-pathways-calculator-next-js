import { NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string; regId: string }>
}

// PUT - Update registration status (admin only)
export async function PUT(
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

    const { id, regId } = await params
    const body = await request.json()
    const { status, adminNotes } = body

    // Validate status if provided
    if (status && !["PENDING", "CONFIRMED", "CANCELLED", "WAITLISTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    // Check if registration exists
    const registration = await prisma.eventRegistration.findUnique({
      where: { id: regId },
      include: {
        event: {
          select: {
            id: true,
            capacity: true,
            registeredCount: true,
          },
        },
      },
    })

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      )
    }

    // Verify registration belongs to the event
    if (registration.eventId !== id) {
      return NextResponse.json(
        { error: "Registration does not belong to this event" },
        { status: 400 }
      )
    }

    const oldStatus = registration.status
    const newStatus = status || oldStatus

    // Prepare update data
    const updateData: any = {}
    if (status) {
      updateData.status = newStatus
      
      // Update timestamps based on status
      if (newStatus === "CONFIRMED" && oldStatus !== "CONFIRMED") {
        updateData.confirmedAt = new Date()
      }
      if (newStatus === "CANCELLED" && oldStatus !== "CANCELLED") {
        updateData.cancelledAt = new Date()
        // Decrement registeredCount if cancelling
        await prisma.event.update({
          where: { id },
          data: {
            registeredCount: {
              decrement: 1,
            },
          },
        })
      }
      // If moving from CANCELLED to another status, increment count
      if (oldStatus === "CANCELLED" && newStatus !== "CANCELLED") {
        await prisma.event.update({
          where: { id },
          data: {
            registeredCount: {
              increment: 1,
            },
          },
        })
      }
    }
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes
    }

    // Update registration
    const updatedRegistration = await prisma.eventRegistration.update({
      where: { id: regId },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      registration: updatedRegistration,
      message: "Registration updated successfully",
    })
  } catch (error) {
    console.error("Update registration error:", error)
    return NextResponse.json(
      { error: "An error occurred while updating the registration" },
      { status: 500 }
    )
  }
}

// DELETE - Cancel/delete registration (admin only)
export async function DELETE(
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

    const { id, regId } = await params

    // Check if registration exists
    const registration = await prisma.eventRegistration.findUnique({
      where: { id: regId },
      select: {
        id: true,
        eventId: true,
        status: true,
      },
    })

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      )
    }

    // Verify registration belongs to the event
    if (registration.eventId !== id) {
      return NextResponse.json(
        { error: "Registration does not belong to this event" },
        { status: 400 }
      )
    }

    // Decrement registeredCount if status was not already cancelled
    if (registration.status !== "CANCELLED") {
      await prisma.event.update({
        where: { id },
        data: {
          registeredCount: {
            decrement: 1,
          },
        },
      })
    }

    // Delete registration
    await prisma.eventRegistration.delete({
      where: { id: regId },
    })

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    })
  } catch (error) {
    console.error("Delete registration error:", error)
    return NextResponse.json(
      { error: "An error occurred while deleting the registration" },
      { status: 500 }
    )
  }
}

