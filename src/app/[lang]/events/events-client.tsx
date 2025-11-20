"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"
import Image from "next/image"

interface EventsClientProps {
  lang: string
  events: Array<{
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
    coverImage: string | null
    heroImage: string | null
    featuredImage: string | null
    status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "ARCHIVED"
    featured: boolean
    publishedAt: Date | null
    createdAt: Date
    capacity: number | null
    registeredCount: number
  }>
}

const filterOptions = [
  { id: "all", label: "All Events" },
  { id: "WEBINAR", label: "Upcoming Webinars" },
  { id: "WORKSHOP", label: "Workshops" },
  { id: "QNA", label: "Live Q&A Sessions" },
  { id: "NETWORKING", label: "Networking" },
  { id: "OTHER", label: "Other" },
]

type SortOption = "date-asc" | "date-desc" | "title-asc"

function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

function formatTime(time: string | null, endTime: string | null, timezone: string | null): string {
  if (!time) return ""
  if (endTime) {
    return `${time} - ${endTime} ${timezone || ""}`.trim()
  }
  return `${time} ${timezone || ""}`.trim()
}

function getEventStatus(
  startDate: Date | string,
  endDate: Date | string | null,
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "ARCHIVED",
  capacity: number | null,
  registeredCount: number
): "upcoming" | "today" | "past" | "full" | "cancelled" {
  if (status === "CANCELLED") return "cancelled"
  
  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  const end = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : start
  const now = new Date()
  const todayStart = new Date(now.setHours(0, 0, 0, 0))
  const todayEnd = new Date(now.setHours(23, 59, 59, 999))
  
  // Check if full
  if (capacity && registeredCount >= capacity) {
    return "full"
  }
  
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

function getCategorySlug(category: string): string {
  const map: Record<string, string> = {
    WEBINAR: "webinar",
    WORKSHOP: "workshop",
    QNA: "qna",
    NETWORKING: "networking",
    OTHER: "other",
  }
  return map[category] || "all"
}

export function EventsClient({ lang, events }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("date-asc")
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false)

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.map((event) => ({
      ...event,
      eventStatus: getEventStatus(
        event.startDate,
        event.endDate,
        event.status,
        event.capacity,
        event.registeredCount
      ),
    }))

    // Filter by category
    if (activeFilter !== "all") {
      filtered = filtered.filter((event) => event.category === activeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.subtitle?.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.type.toLowerCase().includes(query)
      )
    }

    // Filter past events
    if (!showPastEvents) {
      filtered = filtered.filter((event) => event.eventStatus !== "past")
    }

    // Sort events
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "date-desc":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return sorted
  }, [events, activeFilter, searchQuery, sortBy, showPastEvents])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2c2b2b] mb-4">
                Find Your Next Event
              </h1>
              <p className="text-lg md:text-xl text-[#2c2b2b]/70 mb-8">
                Stay updated with our upcoming webinars, workshops, and community meetups.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#2c2b2b]/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-[#2c2b2b]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Reveal delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveFilter(option.id)}
                    className={`px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-200 ${
                      activeFilter === option.id
                        ? "bg-brand-red text-white shadow-md"
                        : "bg-white text-[#2c2b2b] hover:bg-gray-50 shadow-sm border border-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Sort and View Options */}
              <div className="flex items-center gap-4 justify-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-sm text-[#2c2b2b] bg-white"
                >
                  <option value="date-asc">Sort: Date (Upcoming First)</option>
                  <option value="date-desc">Sort: Date (Newest First)</option>
                  <option value="title-asc">Sort: Title (A-Z)</option>
                </select>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPastEvents}
                    onChange={(e) => setShowPastEvents(e.target.checked)}
                    className="w-4 h-4 text-brand-red focus:ring-brand-red border-gray-300 rounded"
                  />
                  <span className="text-sm text-[#2c2b2b]">Show Past Events</span>
                </label>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Events Grid */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredAndSortedEvents.map((event, index) => (
              <Reveal key={event.id} delay={index * 0.1}>
                <Link href={`/${lang}/events/${event.slug}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="rounded-xl min-h-[320px] md:min-h-[360px] flex flex-col shadow-lg cursor-pointer transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Background Image */}
                    {event.coverImage || event.heroImage || event.featuredImage ? (
                      <div className="absolute inset-0">
                        <Image
                          src={event.coverImage || event.heroImage || event.featuredImage || ""}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Subtle gradient overlay only at the bottom for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      </div>
                    ) : (
                      <div
                        className={`absolute inset-0 ${
                          event.color === "BLUE" ? "bg-[#2c2b2b]" : "bg-[#b92025]"
                        }`}
                      />
                    )}

                    {/* Status Badge */}
                    {event.eventStatus && (
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                            event.eventStatus === "upcoming"
                              ? "bg-green-500 text-white"
                              : event.eventStatus === "today"
                              ? "bg-yellow-500 text-white"
                              : event.eventStatus === "full"
                              ? "bg-orange-500 text-white"
                              : event.eventStatus === "cancelled"
                              ? "bg-gray-500 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {event.eventStatus === "upcoming"
                            ? "Upcoming"
                            : event.eventStatus === "today"
                            ? "Today"
                            : event.eventStatus === "full"
                            ? "Full"
                            : event.eventStatus === "cancelled"
                            ? "Cancelled"
                            : "Past"}
                        </span>
                      </div>
                    )}

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
                                {formatDate(event.startDate)}
                              </p>
                            </div>
                            {(event.startTime || event.endTime) && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                                <p className="text-xs md:text-sm">
                                  {formatTime(event.startTime, event.endTime, event.timezone)}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {/* Address - only show if exists */}
                          {event.address && (
                            <div className="flex items-center gap-1.5 text-white/95 drop-shadow-lg">
                              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                              <p className="text-xs md:text-sm line-clamp-1">
                                {event.address}
                              </p>
                            </div>
                          )}
                          
                          {/* Title - compact */}
                          <h4 className="text-white text-base md:text-lg font-bold drop-shadow-lg leading-tight">
                            {event.title}
                          </h4>
                          
                          {/* Event Type and Attendees on same line if capacity exists */}
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-white/95 text-xs md:text-sm drop-shadow-lg">
                              {event.type}
                            </p>
                            {event.capacity && (
                              <div className="flex items-center gap-1.5 text-white/90 drop-shadow-lg">
                                <Users className="h-3.5 w-3.5 flex-shrink-0" />
                                <p className="text-xs md:text-sm">
                                  {event.registeredCount} / {event.capacity}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedEvents.length === 0 && (
            <Reveal>
              <div className="text-center py-16">
                <p className="text-[#2c2b2b]/60 text-lg">
                  {searchQuery 
                    ? `No events found matching "${searchQuery}".`
                    : "No events found for this category."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-brand-red hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </Reveal>
          )}

          {/* Results Count */}
          {filteredAndSortedEvents.length > 0 && (
            <div className="text-center mt-8">
              <p className="text-[#2c2b2b]/60 text-sm">
                Showing {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

