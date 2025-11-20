"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  CheckCircle2,
  XCircle,
  Clock as ClockIcon,
  Loader2,
} from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useToast } from "@/hooks/use-toast"

// Helper function to format date
function formatDateString(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

interface Registration {
  id: string
  firstName: string
  lastName: string
  email: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "WAITLISTED"
  registeredAt: Date
  confirmedAt: Date | null
  cancelledAt: Date | null
  adminNotes: string | null
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
    category: string
    color: string
    coverImage: string | null
    heroImage: string | null
    capacity: number | null
    registeredCount: number
    registrationRequired: boolean
    registrations: Registration[]
    author: {
      id: string
      name: string | null
      email: string
    }
  }
}

export function EventDetailClient({ lang, event }: EventDetailClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState<Registration[]>(event.registrations)
  const [isLoading, setIsLoading] = useState(false)

  const fetchRegistrations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/events/${event.id}/registrations`)
      const data = await response.json()
      if (data.success) {
        setRegistrations(data.registrations)
      }
    } catch (error) {
      console.error("Error fetching registrations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (regId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/events/${event.id}/registrations/${regId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update registration")
      }

      toast({
        title: "Status Updated",
        description: "Registration status has been updated successfully",
      })

      // Refresh registrations
      await fetchRegistrations()
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "An error occurred while updating the registration",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: {
        icon: ClockIcon,
        bg: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Pending",
      },
      CONFIRMED: {
        icon: CheckCircle2,
        bg: "bg-green-100 text-green-800 border-green-200",
        label: "Confirmed",
      },
      CANCELLED: {
        icon: XCircle,
        bg: "bg-red-100 text-red-800 border-red-200",
        label: "Cancelled",
      },
      WAITLISTED: {
        icon: ClockIcon,
        bg: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Waitlisted",
      },
    }
    return badges[status as keyof typeof badges] || badges.PENDING
  }

  const formatTime = (time: string | null) => {
    if (!time) return ""
    // Format time string (HH:mm) to readable format
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const confirmedCount = registrations.filter((r) => r.status === "CONFIRMED").length
  const pendingCount = registrations.filter((r) => r.status === "PENDING").length
  const cancelledCount = registrations.filter((r) => r.status === "CANCELLED").length

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push(`/${lang}/admin/events`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#2c2b2b]" />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-[#2c2b2b]">{event.title}</h1>
                {event.subtitle && (
                  <p className="text-[#2c2b2b]/70 mt-1">{event.subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => router.push(`/${lang}/admin/events/${event.id}/edit`)}
              className="flex items-center gap-2 bg-[#b92025] hover:bg-[#7d1416] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Event
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <Reveal>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#b92025] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#2c2b2b]">
                        {formatDateString(event.startDate)}
                        {event.endDate && event.startDate.toDateString() !== event.endDate.toDateString() && (
                          <> - {formatDateString(event.endDate)}</>
                        )}
                      </div>
                      {(event.startTime || event.endTime) && (
                        <div className="text-sm text-[#2c2b2b]/70">
                          {event.startTime && formatTime(event.startTime)}
                          {event.endTime && <> - {formatTime(event.endTime)}</>}
                          {event.timezone && ` (${event.timezone})`}
                        </div>
                      )}
                    </div>
                  </div>

                  {event.locationType !== "ONLINE" && event.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#b92025] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#2c2b2b]">{event.address}</div>
                        {(event.city || event.province || event.country) && (
                          <div className="text-sm text-[#2c2b2b]/70">
                            {[event.city, event.province, event.country].filter(Boolean).join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {event.locationType === "ONLINE" && event.meetingLink && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#b92025] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#2c2b2b]">Online Event</div>
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#b92025] hover:underline"
                        >
                          {event.meetingLink}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#b92025] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#2c2b2b]">
                        {event.registeredCount} registered
                        {event.capacity && <> / {event.capacity} capacity</>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar - Registration Stats */}
          <div className="lg:col-span-1">
            <Reveal>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 sticky top-4">
                <h3 className="text-lg font-bold text-[#2c2b2b] mb-4">Registration Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#2c2b2b]/70">Total</span>
                    <span className="text-lg font-bold text-[#2c2b2b]">{registrations.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#2c2b2b]/70">Confirmed</span>
                    <span className="text-lg font-bold text-green-600">{confirmedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#2c2b2b]/70">Pending</span>
                    <span className="text-lg font-bold text-yellow-600">{pendingCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#2c2b2b]/70">Cancelled</span>
                    <span className="text-lg font-bold text-red-600">{cancelledCount}</span>
                  </div>
                  {event.capacity && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#2c2b2b]/70">Remaining</span>
                        <span className="text-lg font-bold text-[#2c2b2b]">
                          {Math.max(0, event.capacity - confirmedCount)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Registrations List */}
        <Reveal>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2c2b2b]">Attendees ({registrations.length})</h2>
              <button
                onClick={fetchRegistrations}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#2c2b2b] hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Refresh"
                )}
              </button>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-[#2c2b2b]/70">No registrations yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2c2b2b]">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2c2b2b]">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2c2b2b]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2c2b2b]">Registered</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#2c2b2b]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => {
                      const statusBadge = getStatusBadge(registration.status)
                      const StatusIcon = statusBadge.icon

                      return (
                        <tr key={registration.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-semibold text-[#2c2b2b]">
                              {registration.firstName} {registration.lastName}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-[#2c2b2b]/70">{registration.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${statusBadge.bg}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusBadge.label}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-[#2c2b2b]/70">
                              {formatDateString(registration.registeredAt)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              {registration.status !== "CONFIRMED" && (
                                <button
                                  onClick={() => handleStatusChange(registration.id, "CONFIRMED")}
                                  className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 hover:bg-green-200 rounded transition-colors"
                                >
                                  Confirm
                                </button>
                              )}
                              {registration.status !== "CANCELLED" && (
                                <button
                                  onClick={() => handleStatusChange(registration.id, "CANCELLED")}
                                  className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 hover:bg-red-200 rounded transition-colors"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

