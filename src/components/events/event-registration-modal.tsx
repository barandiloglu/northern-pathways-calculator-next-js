"use client"

import { useState, Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: string
  eventTitle: string
  capacity: number | null
  registeredCount: number
  onRegistrationSuccess?: () => void
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
  capacity,
  registeredCount,
  onRegistrationSuccess,
}: EventRegistrationModalProps) {
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

      // Don't auto-close - let user close manually after reading success message
      // Don't call onRegistrationSuccess here - we'll call it when user closes the modal
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

  const handleClose = () => {
    if (!isSubmitting) {
      // If success, call the callback before closing to refresh the page
      if (isSuccess && onRegistrationSuccess) {
        onRegistrationSuccess()
      }
      
      onClose()
      // Reset success state after modal animation completes
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        })
      }, 300)
    }
  }

  const isFull = capacity !== null && registeredCount >= capacity

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isSuccess ? undefined : handleClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            style={{ cursor: isSuccess ? "default" : "pointer" }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#2c2b2b]">
                  {isSuccess ? "Registration Complete" : "Register for Event"}
                </h2>
                {!isSuccess && (
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5 text-[#2c2b2b]" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
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
                    transition={{ duration: 0.3 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        delay: 0.1 
                      }}
                    >
                      <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    </motion.div>
                    <p className="text-sm font-semibold text-green-800 mb-2">
                      Registration Successful!
                    </p>
                    <p className="text-sm text-green-700 mb-4">
                      You have successfully registered for this event. We'll send you a confirmation email shortly.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-sm"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="modal-firstName" className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                        First Name <span className="text-[#b92025]">*</span>
                      </label>
                      <input
                        type="text"
                        id="modal-firstName"
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
                      <label htmlFor="modal-lastName" className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                        Last Name <span className="text-[#b92025]">*</span>
                      </label>
                      <input
                        type="text"
                        id="modal-lastName"
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
                      <label htmlFor="modal-email" className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                        Email <span className="text-[#b92025]">*</span>
                      </label>
                      <input
                        type="email"
                        id="modal-email"
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

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-[#2c2b2b] rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-[#b92025] hover:bg-[#7d1416] text-white rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Register"
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

