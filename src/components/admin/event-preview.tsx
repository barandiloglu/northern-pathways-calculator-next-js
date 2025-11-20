"use client"

import React, { memo } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"

interface TipTapJSON {
  type: string
  content?: TipTapJSON[]
  attrs?: Record<string, any>
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
}

interface EventPreviewProps {
  title: string
  subtitle: string | null
  description: string | null // TipTap JSON string
  startDate: string
  endDate: string | null
  startTime: string | null
  endTime: string | null
  timezone: string | null
  locationType: "IN_PERSON" | "ONLINE" | "HYBRID"
  address: string | null
  city: string | null
  province: string | null
  country: string | null
  meetingLink: string | null
  type: string
  category: "WEBINAR" | "WORKSHOP" | "QNA" | "NETWORKING" | "OTHER"
  color: "BLUE" | "RED"
  coverImage: string | null
  heroImage: string | null
  featuredImage: string | null
  whatToExpect: string[] | null
  dressCode: string | null
  specialNotes: string | null
  capacity?: number | null
  registeredCount?: number
  authorName?: string | null
  authorEmail?: string
}

function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

function formatTime(startTime: string | null, endTime: string | null, timezone: string | null): string {
  if (!startTime) return ""
  if (endTime) {
    return `${startTime} - ${endTime} ${timezone || ""}`.trim()
  }
  return `${startTime} ${timezone || ""}`.trim()
}

function getEventStatus(
  startDate: string,
  endDate: string | null
): "upcoming" | "today" | "past" | "full" | "cancelled" {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : start
  const now = new Date()
  const todayStart = new Date(now.setHours(0, 0, 0, 0))
  const todayEnd = new Date(now.setHours(23, 59, 59, 999))

  // Check if today
  if (start >= todayStart && start <= todayEnd) {
    return "today"
  }

  // Check if past
  if (end < now) {
    return "past"
  }

  return "upcoming"
}

// Render TipTap JSON node with formatting marks
function renderTipTapNode(node: TipTapJSON): React.ReactNode {
  if (node.type === "text") {
    let textNode: React.ReactNode = node.text || ""

    // Apply marks in correct order
    if (node.marks && node.marks.length > 0) {
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

function renderTipTapContent(description: string): React.ReactNode {
  try {
    const parsed = typeof description === "string" ? JSON.parse(description) : description
    if (parsed && parsed.content) {
      return (
        <>
          {parsed.content.map((node: TipTapJSON, index: number) => (
            <React.Fragment key={index}>{renderTipTapNode(node)}</React.Fragment>
          ))}
        </>
      )
    }
    return null
  } catch {
    // Fallback: render as plain text if not valid JSON
    return (
      <p className="text-[#2c2b2b]/80 leading-relaxed mb-4 text-base md:text-lg">
        {description}
      </p>
    )
  }
}

export const EventPreview = memo(function EventPreview({
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
  coverImage,
  heroImage,
  featuredImage,
  whatToExpect,
  dressCode,
  specialNotes,
  capacity,
  registeredCount,
  authorName,
  authorEmail,
}: EventPreviewProps) {
  const eventStatus = getEventStatus(startDate, endDate)
  const fullAddress = address
    ? [address, city, province, country].filter(Boolean).join(", ")
    : null

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Preview Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
        <h3 className="text-lg font-bold text-[#2c2b2b]">Preview</h3>
        <p className="text-sm text-[#2c2b2b]/60 mt-1">This is how your event will appear</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Event Card Preview - Similar to Events Listing Page */}
        <div>
          <h4 className="text-sm font-semibold text-[#2c2b2b] mb-3">Event Card Preview</h4>
          <div className="rounded-xl min-h-[280px] flex flex-col shadow-lg relative overflow-hidden">
            {/* Background Image */}
            {coverImage || heroImage || featuredImage ? (
              <div className="absolute inset-0">
                <Image
                  src={coverImage || heroImage || featuredImage || ""}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                {/* Subtle gradient overlay only at the bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
            ) : (
              <div
                className={`absolute inset-0 ${
                  color === "BLUE" ? "bg-[#2c2b2b]" : "bg-[#b92025]"
                }`}
              />
            )}

            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  eventStatus === "upcoming"
                    ? "bg-green-500 text-white"
                    : eventStatus === "today"
                    ? "bg-yellow-500 text-white"
                    : eventStatus === "past"
                    ? "bg-gray-400 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {eventStatus === "upcoming"
                  ? "Upcoming"
                  : eventStatus === "today"
                  ? "Today"
                  : "Past"}
              </span>
            </div>

            {/* Event Details - compact bottom section, showing more image */}
            <div className="absolute inset-x-0 bottom-0 z-10">
              {/* Subtle gradient backdrop only at the very bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 via-black/50 to-transparent rounded-b-xl" />
              
              {/* Compact text section */}
              <div className="relative p-4 md:p-5">
                <div className="space-y-1.5">
                  {/* Date and Time on same line if space allows */}
                  <div className="flex flex-wrap items-center gap-3 text-white drop-shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                      <p className="text-xs md:text-sm font-medium">
                        {formatDate(startDate)}
                      </p>
                    </div>
                    {(startTime || endTime) && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                        <p className="text-xs md:text-sm">
                          {formatTime(startTime, endTime, timezone)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Address - only show if exists */}
                  {fullAddress && (
                    <div className="flex items-center gap-1.5 text-white/95 drop-shadow-lg">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <p className="text-xs md:text-sm line-clamp-1">
                        {fullAddress}
                      </p>
                    </div>
                  )}
                  
                  {/* Title - compact */}
                  <h4 className="text-white text-base md:text-lg font-bold drop-shadow-lg leading-tight">
                    {title}
                  </h4>
                  
                  {/* Event Type and Attendees on same line if capacity exists */}
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-white/95 text-xs md:text-sm drop-shadow-lg">
                      {type}
                    </p>
                    {capacity && (
                      <div className="flex items-center gap-1.5 text-white/90 drop-shadow-lg">
                        <Users className="h-3.5 w-3.5 flex-shrink-0" />
                        <p className="text-xs md:text-sm">
                          {(registeredCount || 0)} / {capacity}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Preview - Similar to Event Detail Page */}
        <div>
          <h4 className="text-sm font-semibold text-[#2c2b2b] mb-3">Event Detail Preview</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Hero Image */}
            {heroImage && (
              <div className="w-full h-48 bg-[#2c2b2b] relative overflow-hidden">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="600px"
                />
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#2c2b2b]">
                {title || "Event Title"}
              </h1>

              {subtitle && (
                <p className="text-lg text-[#2c2b2b]/70">{subtitle}</p>
              )}

              {/* Metadata */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#b92025] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#2c2b2b]/60">Date And Time</p>
                      <p className="text-[#2c2b2b] font-medium">{formatDate(startDate)}</p>
                    </div>
                  </div>
                  {(startTime || endTime) && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-[#b92025] flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#2c2b2b]/60">Time</p>
                        <p className="text-[#2c2b2b] font-medium">
                          {formatTime(startTime, endTime, timezone)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {fullAddress && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#b92025] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#2c2b2b]/60">Address</p>
                      <p className="text-[#2c2b2b] font-medium">{fullAddress}</p>
                    </div>
                  </div>
                )}

                {locationType === "ONLINE" && meetingLink && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#b92025] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#2c2b2b]/60">Meeting Link</p>
                      <a
                        href={meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#b92025] hover:underline font-medium"
                      >
                        Join Online Event
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {description && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#2c2b2b] mb-4">
                    Event Details
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {renderTipTapContent(description)}
                  </div>
                </div>
              )}

              {/* What to Expect */}
              {whatToExpect && whatToExpect.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#2c2b2b] mb-4">
                    What to Expect:
                  </h2>
                  <ul className="space-y-3">
                    {whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#b92025] mt-1">•</span>
                        <span className="text-[#2c2b2b]/80 text-base md:text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dress Code */}
              {dressCode && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#2c2b2b] mb-4">
                    Dress Code:
                  </h2>
                  <p className="text-[#2c2b2b]/80 leading-relaxed text-base md:text-lg">
                    {dressCode}
                  </p>
                </div>
              )}

              {/* Special Notes */}
              {specialNotes && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#2c2b2b] mb-4">
                    Special Notes:
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {renderTipTapContent(specialNotes)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

