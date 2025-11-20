"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EventPreview } from "@/components/admin/event-preview"
import { RichTextEditor } from "@/components/admin/rich-text-editor"

interface Event {
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
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "ARCHIVED"
  featured: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  language: string
  calendarUrl: string | null
  author: {
    id: string
    name: string | null
    email: string
  }
}

interface EditEventClientProps {
  lang: string
  event: Event
  authorName?: string | null
  authorEmail?: string
}

export function EditEventClient({ lang, event, authorName, authorEmail }: EditEventClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [metaTitleManuallyEdited, setMetaTitleManuallyEdited] = useState(
    !!event.metaTitle && event.metaTitle !== event.title
  )
  const [tipTapDescription, setTipTapDescription] = useState<any>(null)
  const [tipTapSpecialNotes, setTipTapSpecialNotes] = useState<any>(null)
  const [whatToExpectItems, setWhatToExpectItems] = useState<string[]>([])
  const [newWhatToExpectItem, setNewWhatToExpectItem] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [newPhoto, setNewPhoto] = useState("")
  const [videos, setVideos] = useState<Array<{ thumbnail: string; url: string }>>([])
  const [newVideo, setNewVideo] = useState({ thumbnail: "", url: "" })
  const [isInitialized, setIsInitialized] = useState(false)

  const formatDateTimeLocal = (date: Date | null) => {
    if (!date) return ""
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const formatDateLocal = (date: Date | null) => {
    if (!date) return ""
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const [formData, setFormData] = useState({
    slug: event.slug,
    title: event.title,
    subtitle: event.subtitle || "",
    description: event.description || "",
    startDate: formatDateLocal(event.startDate),
    endDate: event.endDate ? formatDateLocal(event.endDate) : "",
    startTime: event.startTime || "",
    endTime: event.endTime || "",
    timezone: event.timezone || "EST",
    locationType: event.locationType,
    address: event.address || "",
    city: event.city || "",
    province: event.province || "",
    country: event.country || "",
    meetingLink: event.meetingLink || "",
    type: event.type,
    category: event.category,
    color: event.color,
    dressCode: event.dressCode || "",
    specialNotes: event.specialNotes || "",
    capacity: event.capacity?.toString() || "",
    registrationRequired: event.registrationRequired,
    registrationUrl: event.registrationUrl || "",
    registrationDeadline: event.registrationDeadline ? formatDateLocal(event.registrationDeadline) : "",
    coverImage: event.coverImage || "",
    heroImage: event.heroImage || "",
    featuredImage: event.featuredImage || "",
    status: event.status,
    featured: event.featured,
    metaTitle: event.metaTitle || event.title,
    metaDescription: event.metaDescription || "",
    metaKeywords: event.metaKeywords || "",
    language: event.language,
    calendarUrl: event.calendarUrl || "",
  })

  // Initialize arrays from existing data
  useEffect(() => {
    if (!isInitialized) {
      // Initialize TipTap description
      if (event.description) {
        try {
          const parsed = typeof event.description === "string" ? JSON.parse(event.description) : event.description
          if (parsed && parsed.type === "doc") {
            setTipTapDescription(parsed)
          } else {
            // If description is plain text, convert to TipTap format
            setTipTapDescription({
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: event.description }],
                },
              ],
            })
          }
        } catch {
          // If parsing fails, treat as plain text
          setTipTapDescription({
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: event.description }],
              },
            ],
          })
        }
      } else {
        setTipTapDescription({
          type: "doc",
          content: [],
        })
      }

      // Initialize TipTap special notes
      if (event.specialNotes) {
        try {
          const parsed = typeof event.specialNotes === "string" ? JSON.parse(event.specialNotes) : event.specialNotes
          if (parsed && parsed.type === "doc") {
            setTipTapSpecialNotes(parsed)
          } else {
            // If specialNotes is plain text, convert to TipTap format
            setTipTapSpecialNotes({
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: event.specialNotes }],
                },
              ],
            })
          }
        } catch {
          // If parsing fails, treat as plain text
          setTipTapSpecialNotes({
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: event.specialNotes }],
              },
            ],
          })
        }
      } else {
        setTipTapSpecialNotes({
          type: "doc",
          content: [],
        })
      }

      if (event.whatToExpect && Array.isArray(event.whatToExpect)) {
        setWhatToExpectItems(event.whatToExpect)
      }
      if (event.photos && Array.isArray(event.photos)) {
        setPhotos(event.photos)
      }
      if (event.videos && Array.isArray(event.videos)) {
        setVideos(event.videos)
      }
      setIsInitialized(true)
    }
  }, [event.description, event.whatToExpect, event.photos, event.videos, isInitialized])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      if (name === "metaTitle") {
        if (value === "") {
          setMetaTitleManuallyEdited(false)
          setFormData((prev) => ({
            ...prev,
            metaTitle: prev.title,
          }))
          return
        } else {
          setMetaTitleManuallyEdited(true)
        }
      }
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value

    setFormData((prev) => {
      const newSlug = generateSlug(title)
      const newMetaTitle = metaTitleManuallyEdited ? prev.metaTitle : title

      return {
        ...prev,
        title,
        slug: newSlug,
        metaTitle: newMetaTitle,
      }
    })
  }

  const addWhatToExpectItem = () => {
    if (newWhatToExpectItem.trim()) {
      setWhatToExpectItems([...whatToExpectItems, newWhatToExpectItem.trim()])
      setNewWhatToExpectItem("")
    }
  }

  const removeWhatToExpectItem = (index: number) => {
    setWhatToExpectItems(whatToExpectItems.filter((_, i) => i !== index))
  }

  const addPhoto = () => {
    if (newPhoto.trim()) {
      setPhotos([...photos, newPhoto.trim()])
      setNewPhoto("")
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const addVideo = () => {
    if (newVideo.url.trim()) {
      setVideos([...videos, { ...newVideo }])
      setNewVideo({ thumbnail: "", url: "" })
    }
  }

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Ensure arrays are up to date
      const finalWhatToExpect = whatToExpectItems.length > 0 ? whatToExpectItems : null
      const finalPhotos = photos.length > 0 ? photos : null
      const finalVideos = videos.length > 0 ? videos : null

      const response = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          description: tipTapDescription ? JSON.stringify(tipTapDescription) : null,
          specialNotes: tipTapSpecialNotes ? JSON.stringify(tipTapSpecialNotes) : null,
          coverImage: formData.coverImage || null,
          startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
          endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          registrationDeadline: formData.registrationDeadline
            ? new Date(formData.registrationDeadline).toISOString()
            : null,
          whatToExpect: finalWhatToExpect,
          photos: finalPhotos,
          videos: finalVideos,
          publishedAt: formData.status === "PUBLISHED" && !event.publishedAt
            ? new Date().toISOString()
            : formData.status === "PUBLISHED"
            ? event.publishedAt?.toISOString() || new Date().toISOString()
            : null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update event")
      }

      toast({
        variant: "success",
        title: "Event Updated",
        description: "Your event has been updated successfully.",
      })

      setTimeout(() => {
        router.push(`/${lang}/admin/events`)
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Error updating event:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update event",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Header */}
      <motion.header
        className="bg-white border-b border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              onClick={() => router.push(`/${lang}/admin/events`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-[#2c2b2b]" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-extrabold text-[#2c2b2b]">Edit Event</h1>
              <p className="text-[#2c2b2b]/70 mt-1">Update your event information</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Form */}
      <div className="container mx-auto px-6 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    readOnly
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-[#2c2b2b]/70 font-mono text-sm cursor-not-allowed"
                    placeholder="event-slug"
                  />
                  <p className="text-xs text-[#2c2b2b]/60 mt-1">
                    URL-friendly version of the title (auto-generated from title, cannot be edited)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Optional subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Description</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#b92025] focus-within:border-transparent">
                    <RichTextEditor
                      content={tipTapDescription ? JSON.stringify(tipTapDescription) : JSON.stringify({ type: "doc", content: [] })}
                      onChange={(tipTapJSON) => {
                        setTipTapDescription(tipTapJSON)
                      }}
                      placeholder="Start writing the event description..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Date & Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Start Time</label>
                  <input
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="2:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">End Time</label>
                  <input
                    type="text"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="4:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Timezone</label>
                  <input
                    type="text"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="EST"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Location</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Location Type
                  </label>
                  <select
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="ONLINE">Online</option>
                    <option value="IN_PERSON">In-Person</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>

                {formData.locationType !== "ONLINE" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                        placeholder="123 Main St"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                          placeholder="Toronto"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Province</label>
                        <input
                          type="text"
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                          placeholder="ON"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                          placeholder="Canada"
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.locationType !== "IN_PERSON" && (
                  <div>
                    <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Meeting Link</label>
                    <input
                      type="url"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Online Webinar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="WEBINAR">Webinar</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="QNA">Q&A</option>
                    <option value="NETWORKING">Networking</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Color</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="BLUE">Blue</option>
                    <option value="RED">Red</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">What to Expect</label>
                <div className="space-y-2">
                  {whatToExpectItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...whatToExpectItems]
                          updated[index] = e.target.value
                          setWhatToExpectItems(updated)
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      />
                      <button
                        type="button"
                        onClick={() => removeWhatToExpectItem(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newWhatToExpectItem}
                      onChange={(e) => setNewWhatToExpectItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addWhatToExpectItem()
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="Add item..."
                    />
                    <button
                      type="button"
                      onClick={addWhatToExpectItem}
                      className="px-4 py-2 bg-[#b92025] text-white rounded-lg hover:bg-[#7d1416] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Dress Code</label>
                <textarea
                  name="dressCode"
                  value={formData.dressCode}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  placeholder="Optional dress code information"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Special Notes</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#b92025] focus-within:border-transparent">
                  <RichTextEditor
                    content={tipTapSpecialNotes ? JSON.stringify(tipTapSpecialNotes) : JSON.stringify({ type: "doc", content: [] })}
                    onChange={(tipTapJSON) => {
                      setTipTapSpecialNotes(tipTapJSON)
                    }}
                    placeholder="Add any special notes or instructions for attendees..."
                  />
                </div>
              </div>
            </div>

            {/* Registration */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Registration</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#b92025] border-gray-300 rounded focus:ring-[#b92025]"
                  />
                  <label className="text-sm font-semibold text-[#2c2b2b]">
                    Registration Required
                  </label>
                </div>

                {formData.registrationRequired && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Capacity</label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                        placeholder="Maximum attendees"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                        Registration URL
                      </label>
                      <input
                        type="url"
                        name="registrationUrl"
                        value={formData.registrationUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                        Registration Deadline
                      </label>
                      <input
                        type="date"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Media */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Media</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Cover Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="https://example.com/cover-image.jpg"
                  />
                  <p className="text-xs text-[#2c2b2b]/60 mt-1">
                    This image will be displayed on the event card in the listing page
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      name="heroImage"
                      value={formData.heroImage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Photos</label>
                <div className="space-y-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="url"
                        value={photo}
                        onChange={(e) => {
                          const updated = [...photos]
                          updated[index] = e.target.value
                          setPhotos(updated)
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={newPhoto}
                      onChange={(e) => setNewPhoto(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addPhoto()
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="Photo URL..."
                    />
                    <button
                      type="button"
                      onClick={addPhoto}
                      className="px-4 py-2 bg-[#b92025] text-white rounded-lg hover:bg-[#7d1416] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Videos</label>
                <div className="space-y-2">
                  {videos.map((video, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-2">
                      <input
                        type="url"
                        value={video.url}
                        onChange={(e) => {
                          const updated = [...videos]
                          updated[index].url = e.target.value
                          setVideos(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                        placeholder="Video URL"
                      />
                      <input
                        type="url"
                        value={video.thumbnail}
                        onChange={(e) => {
                          const updated = [...videos]
                          updated[index].thumbnail = e.target.value
                          setVideos(updated)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                        placeholder="Thumbnail URL"
                      />
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="border border-gray-300 rounded-lg p-4 space-y-2">
                    <input
                      type="url"
                      value={newVideo.url}
                      onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="Video URL"
                    />
                    <input
                      type="url"
                      value={newVideo.thumbnail}
                      onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                      placeholder="Thumbnail URL"
                    />
                    <button
                      type="button"
                      onClick={addVideo}
                      className="w-full px-4 py-2 bg-[#b92025] text-white rounded-lg hover:bg-[#7d1416] transition-colors"
                    >
                      Add Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#b92025] border-gray-300 rounded focus:ring-[#b92025]"
                  />
                  <label className="text-sm font-semibold text-[#2c2b2b]">Featured Event</label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">Calendar URL</label>
                  <input
                    type="url"
                    name="calendarUrl"
                    value={formData.calendarUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Google Calendar URL"
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="SEO title (defaults to event title)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="SEO description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <motion.button
                type="button"
                onClick={() => router.push(`/${lang}/admin/events`)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-[#2c2b2b] font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-[#b92025] hover:bg-[#7d1416] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Event
                  </>
                )}
              </motion.button>
            </div>
              </div>
            </form>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4">
              <EventPreview
                title={formData.title}
                subtitle={formData.subtitle || null}
                description={tipTapDescription ? JSON.stringify(tipTapDescription) : null}
                startDate={formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString()}
                endDate={formData.endDate ? new Date(formData.endDate).toISOString() : null}
                startTime={formData.startTime || null}
                endTime={formData.endTime || null}
                timezone={formData.timezone || null}
                locationType={formData.locationType}
                address={formData.address || null}
                city={formData.city || null}
                province={formData.province || null}
                country={formData.country || null}
                meetingLink={formData.meetingLink || null}
                type={formData.type}
                category={formData.category}
                color={formData.color}
                coverImage={formData.coverImage || null}
                heroImage={formData.heroImage || null}
                featuredImage={formData.featuredImage || null}
                whatToExpect={whatToExpectItems.length > 0 ? whatToExpectItems : null}
                dressCode={formData.dressCode || null}
                specialNotes={tipTapSpecialNotes ? JSON.stringify(tipTapSpecialNotes) : null}
                capacity={formData.capacity ? parseInt(formData.capacity) : null}
                registeredCount={event.registeredCount}
                authorName={authorName || null}
                authorEmail={authorEmail}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

