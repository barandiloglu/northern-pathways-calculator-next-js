"use client"

import { motion } from "framer-motion"
import {
  Bell,
  ChevronRight,
  MoreVertical
} from "lucide-react"

interface SessionUser {
  id: string
  email: string
  name: string | null
  role: "USER" | "ADMIN"
}

interface DashboardClientProps {
  lang: string
  user: SessionUser
}

export function DashboardClient({ lang, user }: DashboardClientProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  }

  return (
    <>
      {/* Top Header */}
      <motion.header
        className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="bg-[#b92025] hover:bg-[#7d1416] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Active
          </motion.button>
          <motion.button
            className="bg-gray-100 hover:bg-gray-200 text-[#2c2b2b] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          <motion.button
            className="relative p-2 text-[#2c2b2b] hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
            <motion.span
              className="absolute top-1 right-1 w-2 h-2 bg-[#b92025] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <motion.button
                  className="text-gray-400 hover:text-[#2c2b2b] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Middle Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {[1, 2].map((item, index) => (
            <motion.div
              key={item}
              custom={index + 3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <motion.button
                  className="text-gray-400 hover:text-[#2c2b2b] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-6">
                {/* Chart Placeholder */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (index + 3) * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full border-8 border-gray-200 border-t-[#b92025] border-r-[#b92025] flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#2c2b2b]">75%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </motion.div>
                </motion.div>
                {/* List */}
                <div className="flex-1 space-y-3">
                  {[1, 2, 3, 4].map((listItem) => (
                    <motion.div
                      key={listItem}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 3) * 0.1 + listItem * 0.05 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-gray-300 rounded-full"
                        whileHover={{ scale: 1.5 }}
                      />
                      <div className="h-3 flex-1 bg-gray-200 rounded animate-pulse" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Wide Card */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            <motion.button
              className="text-gray-400 hover:text-[#2c2b2b] transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 5 * 0.1 + item * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <motion.div
                  className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                />
                <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  )
}
