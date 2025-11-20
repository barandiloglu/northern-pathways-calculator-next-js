"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Facebook, Twitter, Linkedin, Mail, Phone, Globe, Play } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { EventRegistrationModal } from "@/components/events/event-registration-modal"

interface TipTapJSON {
  type: string
  content?: TipTapJSON[]
  attrs?: Record<string, any>
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
}

interface EventDetailClientProps {
  lang: string
  event: {
    id: string
    slug: string
    title: string
    subtitle: string | null
    description: string | null
    startDate: Date
    endDate: Date | null
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
    whatToExpect: any
    dressCode: string | null
    specialNotes: string | null
    capacity: number | null
    registeredCount: number
    registrationRequired: boolean
    registrationUrl: string | null
    registrationDeadline: Date | null
    coverImage: string | null
    heroImage: string | null
    featuredImage: string | null
    photos: any
    videos: any
    calendarUrl: string | null
    author: {
      id: string
      name: string | null
      email: string
    } | null
  }
}

function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

function formatTime(startTime: string | null, endTime: string | null, timezone: string | null): string {
  if (!startTime) return ""
  if (endTime) {
    return `${startTime} - ${endTime} ${timezone || ""}`.trim()
  }
  return `${startTime} ${timezone || ""}`.trim()
}

function formatFullAddress(address: string | null, city: string | null, province: string | null, country: string | null): string {
  const parts = [address, city, province, country].filter(Boolean)
  return parts.join(", ")
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

function renderTipTapContent(content: string): React.ReactNode {
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content
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
        {content}
      </p>
    )
  }
}

export function EventDetailClient({ lang, event }: EventDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Check out this event: ${event.title}`

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(shareText + " " + shareUrl)}`
    }
    
    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }
  }

  const handleAddToCalendar = () => {
    if (event.calendarUrl) {
      window.open(event.calendarUrl, "_blank")
    }
  }

  const whatToExpectItems = Array.isArray(event.whatToExpect) ? event.whatToExpect : []
  const photos = Array.isArray(event.photos) ? event.photos : []
  const videos = Array.isArray(event.videos) ? event.videos : []
  const fullAddress = formatFullAddress(event.address, event.city, event.province, event.country)

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/${lang}/events`}
            className="inline-flex items-center gap-2 text-[#2c2b2b]/70 hover:text-brand-red transition-colors"
          >
            <span>←</span>
            <span>Back to Events</span>
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      <section className="w-full">
        <div className="w-full h-64 md:h-96 bg-[#2c2b2b] relative overflow-hidden">
          {event.coverImage || event.heroImage ? (
            <Image
              src={event.coverImage || event.heroImage || ""}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-lg md:text-2xl">Event Hero Image</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Event Title */}
              <Reveal>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2c2b2b] mb-6">
                  {event.title}
                </h1>
                {event.subtitle && (
                  <p className="text-xl text-[#2c2b2b]/70 mb-6">{event.subtitle}</p>
                )}
              </Reveal>

              {/* Event Metadata */}
              <Reveal delay={0.1}>
                <div className="space-y-4 mb-8">
                  {/* Date and Time */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#2c2b2b]/60">Date And Time</p>
                        <p className="text-[#2c2b2b] font-medium">{formatDate(event.startDate)}</p>
                      </div>
                    </div>
                    {(event.startTime || event.endTime) && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-brand-red flex-shrink-0" />
                        <div>
                          <p className="text-sm text-[#2c2b2b]/60">Time</p>
                          <p className="text-[#2c2b2b] font-medium">
                            {formatTime(event.startTime, event.endTime, event.timezone)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Address or Meeting Link */}
                  {event.locationType === "IN_PERSON" && fullAddress && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#2c2b2b]/60">Address</p>
                        <p className="text-[#2c2b2b] font-medium">{fullAddress}</p>
                      </div>
                    </div>
                  )}

                  {event.locationType === "ONLINE" && event.meetingLink && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#2c2b2b]/60">Meeting Link</p>
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-red hover:underline font-medium"
                        >
                          Join Online Event
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Social Share Icons */}
              <Reveal delay={0.2}>
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5 text-[#2c2b2b]" />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5 text-[#2c2b2b]" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-[#2c2b2b]" />
                  </button>
                  <button
                    onClick={() => handleShare("email")}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share via Email"
                  >
                    <Mail className="h-5 w-5 text-[#2c2b2b]" />
                  </button>
                </div>
              </Reveal>

              {/* Event Details */}
              {event.description && (
                <Reveal delay={0.3}>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                      Event Details
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      {renderTipTapContent(event.description)}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* What to Expect */}
              {whatToExpectItems.length > 0 && (
                <Reveal delay={0.4}>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                      What to Expect:
                    </h2>
                    <ul className="space-y-3">
                      {whatToExpectItems.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-brand-red mt-1">•</span>
                          <span className="text-[#2c2b2b]/80 text-base md:text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Dress Code */}
              {event.dressCode && (
                <Reveal delay={0.5}>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                      Dress Code:
                    </h2>
                    <p className="text-[#2c2b2b]/80 leading-relaxed text-base md:text-lg">
                      {event.dressCode}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* Special Notes */}
              {event.specialNotes && (
                <Reveal delay={0.6}>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                      Special Notes:
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      {renderTipTapContent(event.specialNotes)}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Photo Gallery */}
              {photos.length > 0 && (
                <Reveal delay={0.7}>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                      Photos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {photos.map((photo: string, index: number) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => setSelectedImage(photo)}
                        >
                          <Image
                            src={photo}
                            alt={`Event photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Videos */}
              {videos.length > 0 && (
                <Reveal delay={0.8}>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                      Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos.map((video: { thumbnail?: string; url?: string }, index: number) => (
                        <motion.div
                          key={`video-${index}`}
                          whileHover={{ scale: 1.02 }}
                          className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            if (video.url) {
                              window.open(video.url, "_blank")
                            }
                          }}
                        >
                          {video.thumbnail ? (
                            <Image
                              src={video.thumbnail}
                              alt={`Event video ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#2c2b2b] flex items-center justify-center">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Subscribe Now Card */}
              <Reveal delay={0.3}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 sticky top-4 shadow-sm">
                  <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">Subscribe Now</h3>
                  
                  {/* Calendar Button */}
                  {event.calendarUrl && (
                    <button
                      onClick={handleAddToCalendar}
                      className="w-full text-center px-6 py-3 bg-brand-red hover:bg-[#7d1416] text-white rounded-lg font-semibold transition-colors mb-4"
                    >
                      Click to Add to your calendar
                    </button>
                  )}

                  {/* Register Button */}
                  {event.registrationRequired && (
                    <motion.button
                      onClick={() => setIsRegistrationModalOpen(true)}
                      className="block w-full text-center px-6 py-3 bg-white border-2 border-brand-red text-brand-red hover:bg-gray-50 rounded-lg font-semibold transition-colors mb-4"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 4px 12px rgba(185, 32, 37, 0.15)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 
                      }}
                    >
                      Register Now
                    </motion.button>
                  )}

                  {/* QR Code Section */}
                  {event.calendarUrl && (
                    <>
                      {/* OR Separator */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white px-2 text-[#2c2b2b]/60">OR</span>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4">
                        <QRCodeSVG value={event.calendarUrl} size={150} className="mb-3" />
                        <p className="text-sm text-[#2c2b2b]/70 text-center">
                          Scan QR with your phone and you will be subscribed automatically
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Reveal>

              {/* Northern Pathways Contact Card */}
              <Reveal delay={0.4}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Logo */}
                    <div className="w-12 h-12 bg-[#2c2b2b] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">NP</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#2c2b2b] mb-1">
                        Northern Pathways
                      </h3>
                      <p className="text-sm text-[#2c2b2b]/60">
                        Immigration Consulting
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <a href="tel:+1234567890" className="text-[#2c2b2b] hover:text-brand-red transition-colors text-sm">
                        Phone: (123) 456-7890
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <a href="mailto:info@northernpathways.ca" className="text-[#2c2b2b] hover:text-brand-red transition-colors text-sm">
                        Email: info@northernpathways.ca
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <a href="https://www.northernpathways.ca" target="_blank" rel="noopener noreferrer" className="text-[#2c2b2b] hover:text-brand-red transition-colors text-sm">
                        Website: northernpathways.ca
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <Image
              src={selectedImage}
              alt="Event photo"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {event.registrationRequired && (
        <EventRegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          eventId={event.id}
          eventTitle={event.title}
          capacity={event.capacity}
          registeredCount={event.registeredCount}
          onRegistrationSuccess={() => {
            // Refresh page to update registered count
            window.location.reload()
          }}
        />
      )}
    </div>
  )
}
