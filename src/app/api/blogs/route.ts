import { NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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
      content,
      tableOfContents,
      heroImage,
      featuredImage,
      readTime,
      publishedAt,
      status,
      featured,
      metaTitle,
      metaDescription,
      metaKeywords,
      language,
      categoryIds,
      tags,
    } = body

    // Validate required fields
    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "Slug, title, and content are required" },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: "A blog post with this slug already exists" },
        { status: 400 }
      )
    }

    // Process tags - convert comma-separated string to array and clean
    const tagsArray = tags
      ? typeof tags === "string"
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : Array.isArray(tags)
        ? tags.map((tag) => (typeof tag === "string" ? tag.trim() : tag)).filter((tag) => tag.length > 0)
        : []
      : []

    // Create the blog post
    const blogPost = await prisma.blogPost.create({
      data: {
        slug,
        title,
        subtitle: subtitle || null,
        description: description || null,
        content: content as any,
        tableOfContents: tableOfContents ? (tableOfContents as any) : null,
        heroImage: heroImage || null,
        featuredImage: featuredImage || null,
        readTime: readTime || null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        status: status || "DRAFT",
        featured: featured || false,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        language: language || "en",
        authorId: user.id,
        categories: categoryIds && categoryIds.length > 0
          ? {
              connect: categoryIds.map((id: string) => ({ id })),
            }
          : undefined,
        tags: tagsArray,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
      },
    })

    return NextResponse.json({
      success: true,
      blogPost,
    })
  } catch (error) {
    console.error("Blog creation error:", error)
    return NextResponse.json(
      { error: "An error occurred while creating the blog post" },
      { status: 500 }
    )
  }
}

