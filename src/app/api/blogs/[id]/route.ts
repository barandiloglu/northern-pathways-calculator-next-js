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

    // Check if blog post exists
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
    })

    if (!blogPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    // Delete the blog post
    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    })
  } catch (error) {
    console.error("Blog deletion error:", error)
    return NextResponse.json(
      { error: "An error occurred while deleting the blog post" },
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

    // Check if blog post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    // Check if slug already exists for another post
    if (slug !== existingPost.slug) {
      const slugConflict = await prisma.blogPost.findUnique({
        where: { slug },
      })

      if (slugConflict) {
        return NextResponse.json(
          { error: "A blog post with this slug already exists" },
          { status: 400 }
        )
      }
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

    // Ensure categoryIds is an array
    const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : []

    // Prepare update data
    const updateData: any = {
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
      tags: tagsArray,
    }

    // Update categories relation
    updateData.categories = {
      set: categoryIdsArray.map((categoryId: string) => ({ id: categoryId })),
    }

    // Update the blog post
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
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
    console.error("Blog update error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", {
      errorMessage,
      error,
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      { error: "An error occurred while updating the blog post", details: errorMessage },
      { status: 500 }
    )
  }
}

