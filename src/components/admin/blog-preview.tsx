"use client"

import React, { memo } from "react"
import { Clock } from "lucide-react"

interface ContentBlock {
  type: string
  text?: string
  content?: string
  title?: string
  id?: string
  level?: number
  items?: string[]
}

interface TipTapJSON {
  type: string
  content?: TipTapJSON[]
  attrs?: Record<string, any>
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
}

interface BlogPreviewProps {
  title: string
  subtitle: string | null
  description: string | null
  content: ContentBlock[]
  tipTapContent?: TipTapJSON | null
  heroImage: string | null
  categories: string[]
  readTime: string | null
  tableOfContents: any[] | null
  authorName?: string
  authorEmail?: string
}

function getUserInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  if (email) {
    return email[0].toUpperCase()
  }
  return "NP"
}

// Render TipTap JSON node with formatting marks
function renderTipTapNode(node: TipTapJSON): React.ReactNode {
  if (node.type === "text") {
    let textNode: React.ReactNode = node.text || ""

    // Apply marks in correct order (apply link last, then underline, then italic, then bold)
    // This ensures proper nesting: <strong><em><u><a>text</a></u></em></strong>
    if (node.marks && node.marks.length > 0) {
      // Sort marks: link should be innermost, then underline, italic, bold
      const sortedMarks = [...node.marks].sort((a, b) => {
        const order: Record<string, number> = { link: 0, underline: 1, italic: 2, bold: 3 }
        return (order[a.type] || 99) - (order[b.type] || 99)
      })

      sortedMarks.forEach((mark) => {
        if (mark.type === "bold") {
          textNode = <strong>{textNode}</strong>
        } else if (mark.type === "italic") {
          textNode = <em>{textNode}</em>
        } else if (mark.type === "underline") {
          textNode = <u>{textNode}</u>
        } else if (mark.type === "link") {
          textNode = (
            <a
              href={mark.attrs?.href || "#"}
              className="text-[#b92025] underline cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {textNode}
            </a>
          )
        }
      })
    }

    return textNode
  }

  if (node.type === "paragraph") {
    if (!node.content || node.content.length === 0) return null
    return (
      <p className="text-[#2c2b2b]/80 leading-relaxed mb-6 text-base md:text-lg">
        {node.content.map((child, index) => (
          <React.Fragment key={index}>{renderTipTapNode(child)}</React.Fragment>
        ))}
      </p>
    )
  }

  if (node.type === "heading") {
    const level = node.attrs?.level || 1
    const HeadingTag = `h${Math.min(6, Math.max(1, level))}` as keyof React.JSX.IntrinsicElements
    
    if (!node.content || node.content.length === 0) return null
    
    // Different sizes for different heading levels - matching actual blog post styling
    // H1 is bigger than H2 since it wasn't in the hardcoded version
    const headingClasses: Record<number, string> = {
      1: "text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c2b2b] mt-10 mb-6 first:mt-0",
      2: "text-2xl md:text-3xl font-bold text-[#2c2b2b] mt-10 mb-6 first:mt-0",
      3: "text-xl font-semibold text-[#2c2b2b] mt-8 mb-4",
      4: "text-lg font-semibold text-[#2c2b2b] mt-8 mb-4",
      5: "text-base font-semibold text-[#2c2b2b] mt-8 mb-4",
      6: "text-base font-semibold text-[#2c2b2b] mt-8 mb-4",
    }
    
    const className = headingClasses[level] || headingClasses[1]
    
    return (
      <HeadingTag className={className}>
        {node.content.map((child, index) => (
          <React.Fragment key={index}>{renderTipTapNode(child)}</React.Fragment>
        ))}
      </HeadingTag>
    )
  }

  if (node.type === "bulletList" || node.type === "orderedList") {
    const ListTag = node.type === "orderedList" ? "ol" : "ul"
    if (!node.content || node.content.length === 0) return null

    return (
      <ListTag
        className={`${
          node.type === "orderedList" ? "list-decimal" : "list-disc"
        } list-outside ml-6 space-y-3 mb-6 text-[#2c2b2b]/80 text-base md:text-lg`}
      >
        {node.content.map((listItem, index) => {
          if (listItem.type === "listItem" && listItem.content) {
            return (
              <li key={index} className="leading-relaxed pl-2">
                {listItem.content.map((itemNode, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    {renderTipTapNode(itemNode)}
                  </React.Fragment>
                ))}
              </li>
            )
          }
          return null
        })}
      </ListTag>
    )
  }

  if (node.content) {
    return (
      <>
        {node.content.map((child, index) => (
          <React.Fragment key={index}>{renderTipTapNode(child)}</React.Fragment>
        ))}
      </>
    )
  }

  return null
}

export const BlogPreview = memo(function BlogPreview({
  title,
  subtitle,
  description,
  content,
  tipTapContent,
  heroImage,
  categories,
  readTime,
  tableOfContents,
  authorName,
  authorEmail,
}: BlogPreviewProps) {
  const authorInitials = getUserInitials(authorName, authorEmail)
  const authorDisplayName = authorName || authorEmail || "Author"
  const hasContent = content && content.length > 0 && content.some(
    (block) =>
      (block.type === "paragraph" && (block.content || block.text)) ||
      (block.type === "heading" && (block.text || block.content || block.title)) ||
      (block.type === "list" && block.items && block.items.length > 0)
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Preview Label */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <h3 className="text-sm font-semibold text-[#2c2b2b]">Preview</h3>
      </div>

      {/* Preview Content - Scrollable */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-white">
            <div className="container mx-auto px-4 pt-8 pb-6 md:pt-12 md:pb-8">
              <div className="text-center max-w-4xl mx-auto">
                {title ? (
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2c2b2b] mb-4">
                    {title}
                  </h1>
                ) : (
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2c2b2b]/30 mb-4 italic">
                    Blog Post Title
                  </h1>
                )}
                {subtitle ? (
                  <p className="text-base md:text-lg text-[#2c2b2b]/70 mb-6">
                    {subtitle}
                  </p>
                ) : (
                  subtitle === null && title && (
                    <p className="text-base md:text-lg text-[#2c2b2b]/30 mb-6 italic">
                      Optional subtitle
                    </p>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Hero Image */}
          {heroImage ? (
            <section className="w-full">
              <div className="w-full h-48 md:h-64 bg-[#2c2b2b] overflow-hidden">
                <img
                  src={heroImage}
                  alt={title || "Blog post hero"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.parentElement!.innerHTML = '<span class="text-white text-sm">Image failed to load</span>'
                  }}
                />
              </div>
            </section>
          ) : (
            <section className="w-full">
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center border-t border-b border-gray-200">
                <span className="text-gray-400 text-xs">Hero Image Preview</span>
              </div>
            </section>
          )}

          {/* Author and Metadata Section */}
          <section className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2c2b2b] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{authorInitials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#2c2b2b] text-sm">{authorDisplayName}</p>
                    <p className="text-xs text-[#2c2b2b]/60">Published date</p>
                  </div>
                </div>

                {/* Categories and Read Time */}
                <div className="flex items-center gap-2 flex-wrap">
                  {categories.length > 0 ? (
                    categories.map((category: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#b92025] text-white text-xs font-semibold rounded-full"
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-[#2c2b2b]/40 text-xs font-semibold rounded-full">
                      Category
                    </span>
                  )}
                  {readTime ? (
                    <span className="px-2 py-1 bg-gray-200 text-[#2c2b2b] text-xs font-semibold rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {readTime}
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-[#2c2b2b]/40 text-xs font-semibold rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Read time
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Area */}
          <section className="bg-white">
            <div className="container mx-auto px-4 py-6 md:py-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Table of Contents - Left Sidebar */}
                {tableOfContents && tableOfContents.length > 0 ? (
                  <aside className="lg:col-span-1 order-2 lg:order-1">
                    <div className="lg:sticky lg:top-4">
                      <div>
                        <h3 className="text-xs font-bold text-[#2c2b2b] uppercase tracking-wider mb-4">
                          TABLE OF CONTENTS
                        </h3>
                        <nav className="space-y-1">
                          {tableOfContents.map(
                            (item: { id: string; title: string; level: number }, index: number) => (
                              <div
                                key={index}
                                className="w-full text-left py-2 px-2 text-xs text-[#2c2b2b]"
                              >
                                {item.title}
                              </div>
                            )
                          )}
                        </nav>
                      </div>
                    </div>
                  </aside>
                ) : null}

                {/* Main Content - Right Column */}
                <div
                  className={
                    tableOfContents && tableOfContents.length > 0
                      ? "lg:col-span-3 order-1 lg:order-2"
                      : "lg:col-span-4"
                  }
                >
                  <article className="prose prose-sm max-w-none">
                    {tipTapContent && tipTapContent.content && tipTapContent.content.length > 0 ? (
                      tipTapContent.content.map((node, index) => (
                        <React.Fragment key={index}>{renderTipTapNode(node)}</React.Fragment>
                      ))
                    ) : hasContent ? (
                      content.map((block: any, index: number) => {
                        if (block.type === "heading") {
                          const level = block.level || 1
                          const HeadingTag = `h${Math.min(6, Math.max(1, level))}` as keyof React.JSX.IntrinsicElements
                          const blockId = block.id || `heading-${index}`
                          
                          // Different sizes for different heading levels - matching actual blog post styling
                          // H1 is bigger than H2 since it wasn't in the hardcoded version
                          const headingClasses: Record<number, string> = {
                            1: "text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c2b2b] mt-10 mb-6 first:mt-0",
                            2: "text-2xl md:text-3xl font-bold text-[#2c2b2b] mt-10 mb-6 first:mt-0",
                            3: "text-xl font-semibold text-[#2c2b2b] mt-8 mb-4",
                            4: "text-lg font-semibold text-[#2c2b2b] mt-8 mb-4",
                            5: "text-base font-semibold text-[#2c2b2b] mt-8 mb-4",
                            6: "text-base font-semibold text-[#2c2b2b] mt-8 mb-4",
                          }
                          
                          const className = headingClasses[level] || headingClasses[1]
                          
                          return (
                            <div key={index} id={blockId} className="scroll-mt-24">
                              <HeadingTag className={className}>
                                {block.text || block.content || block.title}
                              </HeadingTag>
                            </div>
                          )
                        }

                        if (block.type === "subheading") {
                          return (
                            <h3
                              key={index}
                              className="text-xl font-semibold text-[#2c2b2b] mt-8 mb-4"
                            >
                              {block.text || block.content}
                            </h3>
                          )
                        }

                        if (block.type === "paragraph") {
                          const text = block.text || block.content || ""
                          if (!text.trim()) return null
                          return (
                            <p
                              key={index}
                              className="text-[#2c2b2b]/80 leading-relaxed mb-6 text-base md:text-lg"
                            >
                              {text}
                            </p>
                          )
                        }

                         if (block.type === "list") {
                           const items = block.items || block.content || []
                           if (!Array.isArray(items) || items.length === 0) return null
                           return (
                             <ul
                               key={index}
                               className="list-disc list-outside ml-2 space-y-3 mb-6 text-[#2c2b2b]/80 text-base md:text-lg"
                             >
                               {items.map((item: string, itemIndex: number) => (
                                 <li key={itemIndex} className="leading-relaxed pl-2">
                                   {item}
                                 </li>
                               ))}
                             </ul>
                           )
                         }

                        return null
                      })
                    ) : (
                      <p className="text-[#2c2b2b]/40 italic text-sm md:text-base">
                        Start writing your content above to see the preview...
                      </p>
                    )}
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
})

