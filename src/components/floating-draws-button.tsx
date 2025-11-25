"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, Calendar, ExternalLink, RefreshCw } from "lucide-react"
import { LatestDraws } from "./latest-draws"

export function FloatingDrawsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [wiggleTrigger, setWiggleTrigger] = useState(0)
  const [showGlow, setShowGlow] = useState(false)

  // Show glow effects 0.3s after button appears (2.3 seconds total delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGlow(true)
    }, 2300)
    return () => clearTimeout(timer)
  }, [])

  // Periodic wiggle animation every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggleTrigger((prev) => prev + 1)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Floating Button - Bottom Right Corner */}
      <div
        className={`fixed bottom-6 right-6 z-40 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Energy Burst Effect - Quick expanding burst */}
        {showGlow && (
          <>
            {/* Initial Energy Burst */}
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.2, 1.8],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                times: [0, 0.3, 1],
              }}
              className="absolute inset-0 rounded-full bg-brand-red/40 blur-xl pointer-events-none"
              style={{ transformOrigin: "center" }}
            />
            {/* Secondary Burst */}
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.8, 1.5],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: "easeOut",
                times: [0, 0.3, 1],
              }}
              className="absolute inset-0 rounded-full bg-brand-red/30 blur-lg pointer-events-none"
              style={{ transformOrigin: "center" }}
            />
            {/* Tertiary Burst */}
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1.3],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeOut",
                times: [0, 0.3, 1],
              }}
              className="absolute inset-0 rounded-full bg-brand-red/20 blur-md pointer-events-none"
              style={{ transformOrigin: "center" }}
            />
          </>
        )}

        {/* Base Glow - Settles after burst */}
        {showGlow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0.8, 1, 1],
              boxShadow: [
                "0 0 25px rgba(185, 32, 37, 0.4)",
                "0 0 40px rgba(185, 32, 37, 0.6)",
                "0 0 25px rgba(185, 32, 37, 0.4)",
              ],
            }}
            transition={{
              opacity: {
                delay: 0.4,
                duration: 0.6,
                ease: "easeOut",
                times: [0, 0.5, 1],
              },
              scale: {
                delay: 0.4,
                duration: 0.6,
                ease: "easeOut",
              },
              boxShadow: {
                delay: 1,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ transformOrigin: "center" }}
          />
        )}

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: wiggleTrigger > 0 ? [0, -4, 4, -4, 4, 0] : 0,
          }}
          transition={{
            delay: 2,
            type: "spring",
            stiffness: 300,
            damping: 20,
            rotate: wiggleTrigger > 0 ? {
              duration: 0.6,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            } : undefined,
          }}
          whileHover={{
            scale: 1.15,
            y: -4,
          }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-brand-red to-brand-maroon text-white p-4 sm:p-5 rounded-full shadow-[0_10px_40px_rgba(185,32,37,0.5),0_0_20px_rgba(185,32,37,0.3)] transition-all duration-300 flex items-center gap-3 group overflow-visible"
          style={{ transformOrigin: "center" }}
          aria-label="View Latest Express Entry Draws"
        >
          {/* Shine Effect */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: ["-100%", "200%"],
              opacity: 1,
            }}
            transition={{
              delay: 2.6,
              opacity: {
                delay: 2.6,
                duration: 0.4,
                ease: "easeOut",
              },
              x: {
                delay: 3,
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            style={{ borderRadius: "inherit" }}
          />

          {/* Continuous Pulse Animation */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              delay: 2,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-white/10"
          />

          {/* Notification Badge - Positioned outside button */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 2.5,
              type: "spring",
              stiffness: 500,
            }}
            className="absolute -top-2 -right-2 bg-white text-brand-red text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-50 border-2 border-brand-red"
          >
            LIVE
          </motion.div>

          <div className="relative z-10">
            <TrendingUp className="h-6 w-6" />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-white rounded-full -z-10"
            />
          </div>
          <div className="hidden sm:flex flex-col items-start relative z-10">
            <span className="font-bold text-sm leading-tight">Latest</span>
            <span className="font-semibold text-xs leading-tight">Draws</span>
          </div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-3 bg-[#2c2b2b] text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-50"
            >
              View Latest Express Entry Draws
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2c2b2b]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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

            {/* Panel - Slides up from bottom on desktop, full screen on mobile */}
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
              className="fixed top-0 left-0 right-0 bottom-0 md:top-auto md:bottom-0 z-50 bg-gradient-to-r from-brand-red to-brand-maroon md:bg-white rounded-b-3xl md:rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient - Sticky on mobile */}
              <div className="bg-gradient-to-r from-brand-red to-brand-maroon text-white p-4 md:p-6 flex items-center justify-between relative flex-shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl">Latest Express Entry Draws</h3>
                    <p className="text-xs md:text-sm text-white/90">Real-time immigration draw information</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.button>
                </div>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto min-h-0 md:p-6 md:bg-white pb-6 md:pb-6" style={{ WebkitOverflowScrolling: 'touch' }}>
                <LatestDraws hideHeader />
              </div>

              {/* Footer with quick actions */}
              <div className="border-t border-white/20 md:border-gray-200 p-3 md:p-4 bg-transparent md:bg-gray-50 flex items-center justify-between flex-shrink-0">
                <div className="text-xs md:text-sm text-white md:text-gray-600">
                  Stay updated with the latest immigration draws
                </div>
                <motion.button
                  onClick={() => {
                    const event = new Event('refresh-draws')
                    window.dispatchEvent(event)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 hover:bg-white/30 md:bg-brand-red md:hover:bg-brand-maroon text-white rounded-lg font-semibold text-xs md:text-sm transition-colors"
                >
                  <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
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
