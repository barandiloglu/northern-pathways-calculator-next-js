import { NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

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

    const { id } = await params

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id },
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    // Delete the event
    await prisma.event.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("Event deletion error:", error)
    return NextResponse.json(
      { error: "An error occurred while deleting the event" },
      { status: 500 }
    )
  }
}

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

    const { id } = await params
    const body = await request.json()

    const {
      slug,
      title,
      subtitle,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      timezone,
      locationType,
      address,
      city,
      province,
      country,
      meetingLink,
      type,
      category,
      color,
      whatToExpect,
      dressCode,
      specialNotes,
      capacity,
      registrationRequired,
      registrationUrl,
      registrationDeadline,
      coverImage,
      heroImage,
      featuredImage,
      photos,
      videos,
      status,
      featured,
      publishedAt,
      metaTitle,
      metaDescription,
      metaKeywords,
      language,
      calendarUrl,
    } = body

    // Validate required fields
    if (!slug || !title || !startDate) {
      return NextResponse.json(
        { error: "Slug, title, and start date are required" },
        { status: 400 }
      )
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    // Check if slug already exists for another event
    if (slug !== existingEvent.slug) {
      const slugConflict = await prisma.event.findUnique({
        where: { slug },
      })

      if (slugConflict) {
        return NextResponse.json(
          { error: "An event with this slug already exists" },
          { status: 400 }
        )
      }
    }

    // Update the event
    const event = await prisma.event.update({
      where: { id },
      data: {
        slug,
        title,
        subtitle: subtitle || null,
        description: description || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        startTime: startTime || null,
        endTime: endTime || null,
        timezone: timezone || "EST",
        locationType: locationType || "ONLINE",
        address: address || null,
        city: city || null,
        province: province || null,
        country: country || null,
        meetingLink: meetingLink || null,
        type: type || "Online Webinar",
        category: category || "WEBINAR",
        color: color || "BLUE",
        whatToExpect: whatToExpect ? (whatToExpect as any) : null,
        dressCode: dressCode || null,
        specialNotes: specialNotes || null,
        capacity: capacity || null,
        registrationRequired: registrationRequired || false,
        registrationUrl: registrationUrl || null,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        coverImage: coverImage || null,
        heroImage: heroImage || null,
        featuredImage: featuredImage || null,
        photos: photos ? (photos as any) : null,
        videos: videos ? (videos as any) : null,
        status: status || "DRAFT",
        featured: featured || false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        language: language || "en",
        calendarUrl: calendarUrl || null,
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

    return NextResponse.json({
      success: true,
      event,
    })
  } catch (error) {
    console.error("Event update error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", {
      errorMessage,
      error,
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      { error: "An error occurred while updating the event", details: errorMessage },
      { status: 500 }
    )
  }
}

