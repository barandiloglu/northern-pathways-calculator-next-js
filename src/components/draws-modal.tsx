"use client"

import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, X } from "lucide-react"
import { LatestDraws } from "./latest-draws"

interface DrawsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DrawsModal({ isOpen, onClose }: DrawsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[98vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B92025] to-red-700 p-4 sm:p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Latest Express Entry Draws</h2>
                    <p className="text-white/90 text-xs sm:text-sm">Most recent invitation rounds</p>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Content - LatestDraws Component */}
            <div className="flex-1 overflow-y-auto">
              <LatestDraws className="border-0 shadow-none rounded-none" hideHeader={true} />
            </div>

            {/* Footer - Fixed at Bottom */}
            <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  Use this information to understand current CRS score requirements
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#B92025] hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base mx-auto sm:mx-0 w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
