import { NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")

    const where: any = {}
    if (status) {
      where.status = status
    }
    if (category) {
      where.category = category
    }

    const events = await prisma.event.findMany({
      where,
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
        startDate: "asc",
      },
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Events fetch error:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching events" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

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

    // Check if slug already exists
    const existingEvent = await prisma.event.findUnique({
      where: { slug },
    })

    if (existingEvent) {
      return NextResponse.json(
        { error: "An event with this slug already exists" },
        { status: 400 }
      )
    }

    // Create the event
    const event = await prisma.event.create({
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
        registeredCount: 0,
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
        authorId: user.id,
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
    console.error("Event creation error:", error)
    return NextResponse.json(
      { error: "An error occurred while creating the event" },
      { status: 500 }
    )
  }
}

