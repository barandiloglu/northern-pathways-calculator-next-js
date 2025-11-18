"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Clock, MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"
import Link from "next/link"

interface EventsClientProps {
  lang: string
}

interface Event {
  id: string
  title: string
  date: string
  time?: string
  timezone?: string
  address?: string
  type: string
  category: "all" | "webinar" | "workshop" | "qna"
  color: "blue" | "red"
  slug: string
  status?: "upcoming" | "today" | "past" | "full" | "cancelled"
}

// Hardcoded events data
const events: Event[] = [
  {
    id: "1",
    title: "Express Entry: Live Q&A",
    date: "December 10, 2025",
    time: "2:00 PM",
    timezone: "EST",
    type: "Online Webinar",
    category: "qna",
    color: "blue",
    slug: "express-entry-live-qa",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Student Visa Workshop: Avoid Refusals",
    date: "December 15, 2025",
    time: "3:00 PM",
    timezone: "EST",
    type: "Online Webinar",
    category: "workshop",
    color: "red",
    slug: "student-visa-workshop",
    status: "upcoming"
  },
  {
    id: "3",
    title: "OINP Tech Draw: What You Need to Know",
    date: "December 20, 2025",
    time: "1:00 PM",
    timezone: "EST",
    type: "Live Q&A Session",
    category: "qna",
    color: "blue",
    slug: "oinp-tech-draw",
    status: "upcoming"
  },
  {
    id: "4",
    title: "Spousal Sponsorship: Inland vs. Outland",
    date: "January 5, 2026",
    time: "4:00 PM",
    timezone: "EST",
    type: "Online Webinar",
    category: "webinar",
    color: "red",
    slug: "spousal-sponsorship-inland-outland",
    status: "upcoming"
  },
  {
    id: "5",
    title: "Startup Visa: Ask Me Anything",
    date: "January 12, 2026",
    time: "2:30 PM",
    timezone: "EST",
    type: "Live Q&A Session",
    category: "qna",
    color: "blue",
    slug: "startup-visa-ama",
    status: "upcoming"
  },
  {
    id: "6",
    title: "Navigating PGWP & PR Pathways",
    date: "January 18, 2026",
    time: "3:30 PM",
    timezone: "EST",
    type: "Student Workshop",
    category: "workshop",
    color: "red",
    slug: "pgwp-pr-pathways",
    status: "upcoming"
  },
  {
    id: "7",
    title: "Northern Pathways Annual Dinner Party",
    date: "February 23, 2026",
    time: "5:00 PM - 11:00 PM",
    timezone: "EST",
    address: "123 Pathways Ave, Toronto, ON",
    type: "In-Person Event",
    category: "webinar",
    color: "blue",
    slug: "northern-pathways-annual-dinner-party",
    status: "upcoming"
  }
]

const filterOptions = [
  { id: "all", label: "All Events" },
  { id: "webinar", label: "Upcoming Webinars" },
  { id: "workshop", label: "Workshops" },
  { id: "qna", label: "Live Q&A Sessions" }
]

type SortOption = "date-asc" | "date-desc" | "title-asc"

export function EventsClient({ lang }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("date-asc")
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false)

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events

    // Filter by category
    if (activeFilter !== "all") {
      filtered = filtered.filter(event => event.category === activeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter past events
    if (!showPastEvents) {
      // For now, assume all events are upcoming
      // In production, you'd check actual dates
      filtered = filtered.filter(event => event.status !== "past")
    }

    // Sort events
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return sorted
  }, [activeFilter, searchQuery, sortBy, showPastEvents])

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
                    className={`rounded-xl p-8 min-h-[320px] md:min-h-[360px] flex flex-col shadow-lg cursor-pointer transition-all duration-300 relative ${
                      event.color === "blue"
                        ? "bg-[#2c2b2b]"
                        : "bg-brand-red"
                    }`}
                  >
                    {/* Status Badge */}
                    {event.status && (
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.status === "upcoming" ? "bg-green-500 text-white" :
                          event.status === "today" ? "bg-yellow-500 text-white" :
                          event.status === "full" ? "bg-orange-500 text-white" :
                          event.status === "cancelled" ? "bg-gray-500 text-white" :
                          "bg-gray-400 text-white"
                        }`}>
                          {event.status === "upcoming" ? "Upcoming" :
                           event.status === "today" ? "Today" :
                           event.status === "full" ? "Full" :
                           event.status === "cancelled" ? "Cancelled" : ""}
                        </span>
                      </div>
                    )}

                    {/* Event Label */}
                    <div className="mb-auto">
                      <h3 className="text-5xl md:text-6xl font-bold text-white mb-8">
                        Event
                      </h3>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="h-4 w-4" />
                        <p className="text-sm md:text-base font-medium">
                          {event.date}
                        </p>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-2 text-white/90">
                          <Clock className="h-4 w-4" />
                          <p className="text-sm md:text-base">
                            {event.time} {event.timezone}
                          </p>
                        </div>
                      )}
                      {event.address && (
                        <div className="flex items-center gap-2 text-white/90">
                          <MapPin className="h-4 w-4" />
                          <p className="text-sm md:text-base">
                            {event.address}
                          </p>
                        </div>
                      )}
                      <h4 className="text-white text-lg md:text-xl font-bold mt-2">
                        {event.title}
                      </h4>
                      <p className="text-white/90 text-sm md:text-base">
                        {event.type}
                      </p>
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

