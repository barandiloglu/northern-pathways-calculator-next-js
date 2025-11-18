"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface PreAssessmentModalProps {
  isOpen: boolean
  onClose: () => void
}

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, baseUrl: string) => void
  }
}

export function PreAssessmentModal({ isOpen, onClose }: PreAssessmentModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Load JotForm script
  useEffect(() => {
    if (isOpen) {
      // Check if script already exists
      let script1: HTMLScriptElement | null = document.querySelector('script[src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"]') as HTMLScriptElement
      
      if (!script1) {
        script1 = document.createElement("script")
        script1.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        script1.async = true
        document.body.appendChild(script1)
      }

      // Wait for script to load, then initialize
      const initJotForm = () => {
        if (window.jotformEmbedHandler) {
          window.jotformEmbedHandler("iframe[id='JotFormIFrame-212148606229252']", "https://form.jotform.com/")
        } else {
          setTimeout(initJotForm, 100)
        }
      }

      if (script1) {
        // Check if script is already loaded
        if (window.jotformEmbedHandler) {
          initJotForm()
        } else {
          script1.addEventListener("load", initJotForm)
        }
      } else {
        initJotForm()
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.4,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h2 className="text-xl font-bold">Pre-Assessment Form</h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe
                    id="JotFormIFrame-212148606229252"
                    title="Pre-Assessment Form"
                    onLoad={() => window.parent.scrollTo(0, 0)}
                    allowTransparency={true}
                    allow="geolocation; microphone; camera; fullscreen; payment"
                    src="https://form.jotform.com/212148606229252"
                    frameBorder="0"
                    style={{
                      minWidth: "100%",
                      maxWidth: "100%",
                      height: "539px",
                      border: "none",
                    }}
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

