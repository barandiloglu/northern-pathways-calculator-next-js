"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, Calendar, ExternalLink, RefreshCw } from "lucide-react"
import { LatestDraws } from "./latest-draws"

export function FloatingDrawsButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button - Bottom Right Corner */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        className={`fixed bottom-6 right-6 z-40 bg-brand-red hover:bg-brand-maroon text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-3 group ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <TrendingUp className="h-6 w-6" />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white rounded-full -z-10"
          />
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="font-bold text-sm leading-tight">Latest</span>
          <span className="font-semibold text-xs leading-tight">Draws</span>
        </div>
      </motion.button>

      {/* Expanded Draws Panel - Slide up from bottom */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />

            {/* Panel - Slides up from bottom */}
            <motion.div
              initial={{ 
                y: "100%",
                opacity: 0
              }}
              animate={{ 
                y: 0,
                opacity: 1
              }}
              exit={{ 
                y: "100%",
                opacity: 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-brand-red to-brand-maroon text-white p-6 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Latest Express Entry Draws</h3>
                    <p className="text-sm text-white/90">Real-time immigration draw information</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <LatestDraws hideHeader />
              </div>

              {/* Footer with quick actions */}
              <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Stay updated with the latest immigration draws
                </div>
                <motion.button
                  onClick={() => {
                    const event = new Event('refresh-draws')
                    window.dispatchEvent(event)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-maroon text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
