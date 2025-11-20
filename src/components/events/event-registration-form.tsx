"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EventRegistrationFormProps {
  eventId: string
  eventTitle: string
  capacity: number | null
  registeredCount: number
  onRegistrationSuccess?: () => void
}

export function EventRegistrationForm({
  eventId,
  eventTitle,
  capacity,
  registeredCount,
  onRegistrationSuccess,
}: EventRegistrationFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setIsSuccess(true)
      toast({
        title: "Registration Successful!",
        description: "You have successfully registered for this event.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      })

      // Call success callback if provided
      if (onRegistrationSuccess) {
        onRegistrationSuccess()
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred while processing your registration",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFull = capacity !== null && registeredCount >= capacity

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#2c2b2b] mb-4">Register for Event</h3>

      {isFull ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-[#2c2b2b]/80 font-semibold">
            This event is full. Registrations are no longer available.
          </p>
        </div>
      ) : isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
        >
          <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-green-800 mb-2">
            Registration Successful!
          </p>
          <p className="text-sm text-green-700">
            You have successfully registered for this event. We'll send you a confirmation email shortly.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-[#2c2b2b] mb-2">
              First Name <span className="text-[#b92025]">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-[#2c2b2b] mb-2">
              Last Name <span className="text-[#b92025]">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#2c2b2b] mb-2">
              Email <span className="text-[#b92025]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your email"
            />
          </div>

          {capacity && (
            <p className="text-sm text-[#2c2b2b]/60">
              {capacity - registeredCount} spots remaining
            </p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-[#b92025] hover:bg-[#7d1416] text-white rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Now"
            )}
          </motion.button>
        </form>
      )}
    </div>
  )
}

