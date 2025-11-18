"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Facebook, Twitter, Linkedin, Mail, Phone, Globe, Play } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

interface EventDetailClientProps {
  lang: string
  slug: string
}

interface EventDetail {
  id: string
  title: string
  date: string
  time: string
  timezone: string
  address: string
  description: string
  whatToExpect: string[]
  dressCode: string
  specialNotes: string
  category: string
  type: string
  heroImage: string
  photos: string[]
  videos: { thumbnail: string; url: string }[]
  calendarUrl: string
}

// Hardcoded event data - will be replaced with database fetch
const getEventDetail = (slug: string): EventDetail | null => {
  const events: Record<string, EventDetail> = {
    "northern-pathways-annual-dinner-party": {
      id: "1",
      title: "Northern Pathways Annual Dinner Party",
      date: "Saturday, Feb 23, 2026",
      time: "5:00 PM - 11:00 PM",
      timezone: "EST",
      address: "123 Pathways Ave, Toronto, ON",
      description: `We are hosting our annual dinner party exclusively for our valued clients, partners, and friends. This special evening celebrates a decade of helping individuals and families achieve their Canadian dreams. Join us for an evening of fine dining, meaningful conversations, and networking.

The event will be held at a beautiful, historic venue in downtown Toronto. We've prepared a gourmet three-course meal, live music, and special addresses from our lead consultants who will share insights into the latest developments in Canadian immigration.

Spaces are limited, so please RSVP by February 10th to secure your attendance.`,
      whatToExpect: [
        "Gourmet three-course dinner and drinks",
        "Live musical entertainment",
        "Networking opportunities with professionals and fellow immigrants",
        "Insights from Northern Pathways experts",
        "A celebratory atmosphere!"
      ],
      dressCode: "Cocktail attire is recommended. We encourage you to dress elegantly for a memorable evening.",
      specialNotes: "Please note that this is an invite-only event. If you have received an invitation and require any special accommodations or have dietary restrictions, kindly inform us in advance so we can ensure your comfort and enjoyment.",
      category: "networking",
      type: "In-Person Event",
      heroImage: "/event-hero.jpg",
      photos: ["/event-photo-1.jpg", "/event-photo-2.jpg", "/event-photo-3.jpg"],
      videos: [
        { thumbnail: "/event-video-thumb.jpg", url: "https://youtube.com/watch?v=example" }
      ],
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Northern+Pathways+Annual+Dinner+Party&dates=20260223T220000Z/20260224T040000Z&details=Annual+dinner+party+for+valued+clients+and+partners&location=123+Pathways+Ave,+Toronto,+ON"
    }
  }
  return events[slug] || null
}

export function EventDetailClient({ lang, slug }: EventDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const event = getEventDetail(slug)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2c2b2b] mb-4">Event Not Found</h1>
          <Link href={`/${lang}/events`} className="text-brand-red hover:underline">
            Return to Events
          </Link>
        </div>
      </div>
    )
  }

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
    window.open(event.calendarUrl, "_blank")
  }

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
        <div className="w-full h-64 md:h-96 bg-[#2c2b2b] flex items-center justify-center">
          <span className="text-white text-lg md:text-2xl">Event Hero Image</span>
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
                        <p className="text-[#2c2b2b] font-medium">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-brand-red flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#2c2b2b]/60">Time</p>
                        <p className="text-[#2c2b2b] font-medium">{event.time} {event.timezone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-brand-red flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#2c2b2b]/60">Address</p>
                      <p className="text-[#2c2b2b] font-medium">{event.address}</p>
                    </div>
                  </div>
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
              <Reveal delay={0.3}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                    Event Details
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {event.description.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-[#2c2b2b]/80 leading-relaxed mb-4 text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* What to Expect */}
              <Reveal delay={0.4}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-4">
                    What to Expect:
                  </h2>
                  <ul className="space-y-3">
                    {event.whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-brand-red mt-1">•</span>
                        <span className="text-[#2c2b2b]/80 text-base md:text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Dress Code */}
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

              {/* Special Notes */}
              {event.specialNotes && (
                <Reveal delay={0.6}>
                  <div className="mb-8">
                    <p className="text-[#2c2b2b]/80 leading-relaxed text-base md:text-lg">
                      {event.specialNotes}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* Event Photos and Videos */}
              <Reveal delay={0.7}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2c2b2b] mb-6">
                    Event Photos And Videos
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {event.photos.map((photo, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedImage(photo)}
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${
                          index % 3 === 0 ? "bg-brand-red" : "bg-[#2c2b2b]"
                        } flex items-center justify-center`}
                      >
                        <span className="text-white font-semibold">Photo {index + 1}</span>
                      </motion.div>
                    ))}
                    {event.videos.map((video, index) => (
                      <motion.div
                        key={`video-${index}`}
                        whileHover={{ scale: 1.02 }}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer bg-[#2c2b2b] flex items-center justify-center relative group"
                      >
                        <Play className="h-12 w-12 text-white absolute z-10" />
                        <span className="text-white font-semibold">Video Thumbnail</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Subscribe Now */}
                <Reveal delay={0.2}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">
                      Subscribe Now
                    </h3>
                    <button
                      onClick={handleAddToCalendar}
                      className="w-full px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-brand-maroon transition-all duration-200 mb-4"
                    >
                      Click to Add to your calendar
                    </button>
                    
                    {/* Register Button (Optional - can be added based on event type) */}
                    <button
                      className="w-full px-6 py-3 bg-white border-2 border-brand-red text-brand-red rounded-lg font-semibold hover:bg-brand-red hover:text-white transition-all duration-200 mb-4"
                    >
                      Register Now
                    </button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-[#2c2b2b]/60">OR</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-[#2c2b2b]/70 mb-4">
                        Scan QR with your phone and you will be subscribed automatically
                      </p>
                      <div className="flex justify-center p-4 bg-white rounded-lg border border-gray-200">
                        <QRCodeSVG value={event.calendarUrl} size={150} />
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Contact Information */}
                <Reveal delay={0.3}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#2c2b2b] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">NP</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2c2b2b]">Northern Pathways</h4>
                        <p className="text-sm text-[#2c2b2b]/60">Immigration Consulting</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-brand-red flex-shrink-0" />
                        <span className="text-sm text-[#2c2b2b]">Phone: (123) 456-7890</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-brand-red flex-shrink-0" />
                        <span className="text-sm text-[#2c2b2b]">Email: info@northernpathways.ca</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-brand-red flex-shrink-0" />
                        <span className="text-sm text-[#2c2b2b]">Website: northernpathways.ca</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            src={selectedImage}
            alt="Event photo"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  )
}

