"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  BookOpen,
  Calendar, 
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  ChevronRight,
  MoreVertical
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  const router = useRouter()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("dashboard")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      
      toast({
        variant: "success",
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })

      setTimeout(() => {
        router.push(`/${lang}/login`)
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: "An error occurred while logging out. Please try again.",
      })
    }
  }

  const getUserInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return user.email[0].toUpperCase()
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "events", label: "Events", icon: Calendar },
  ]

  const sidebarVariants = {
    open: { width: 256 },
    closed: { width: 80 },
  }

  const contentVariants = {
    open: { marginLeft: 256 },
    closed: { marginLeft: 80 },
  }

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Left Sidebar */}
      <motion.aside
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-[#2c2b2b] flex flex-col fixed left-0 top-0 h-full z-40"
      >
        {/* Logo/Header */}
        <motion.div 
          className="h-16 flex items-center justify-between px-4 border-b border-[#2c2b2b]/50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/${lang}`} className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 bg-[#b92025] rounded flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white text-xs font-bold">NP</span>
                  </motion.div>
                  <span className="text-white text-sm font-semibold">Northern Pathways</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 bg-[#b92025] rounded flex items-center justify-center mx-auto"
              >
                <span className="text-white text-xs font-bold">NP</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white/70 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="px-4 py-3 border-b border-[#2c2b2b]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.input
                  key="search-input"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#2c2b2b]/50 border border-[#2c2b2b]/50 rounded-lg pl-10 pr-3 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#b92025]"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = activeItem === item.id
            return (
              <motion.button
                key={item.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors relative ${
                  isActive
                    ? "bg-[#2c2b2b]/50 text-white"
                    : "text-white/70 hover:text-white hover:bg-[#2c2b2b]/30"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#b92025]"
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                </motion.div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </nav>

        {/* User Profile/Logout */}
        <motion.div 
          className="border-t border-[#2c2b2b]/50 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <motion.button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="w-8 h-8 bg-[#b92025] rounded-full flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-white text-xs font-semibold">
                {getUserInitials()}
              </span>
            </motion.div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  key="user-info"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 text-left"
                >
                  <div className="text-sm font-medium">
                    {user.name || "User"}
                  </div>
                  <div className="text-xs text-white/50">{user.email}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {isLoggingOut ? (
                <motion.svg
                  key="spinner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    opacity: { duration: 0.2 },
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" }
                  }}
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </motion.svg>
              ) : (
                <motion.div
                  key="logout-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ x: 2 }}
                >
                  <LogOut className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <motion.div 
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={contentVariants}
        className="flex-1 flex flex-col"
      >
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
      </motion.div>

      {/* Right Sidebar */}
      <motion.aside 
        className="w-64 bg-[#f9f9f9] border-l border-gray-200 overflow-y-auto hidden xl:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="p-6">
          <motion.div 
            className="h-5 w-32 bg-gray-200 rounded mb-6 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item} 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + item * 0.05 }}
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
        </div>
      </motion.aside>
    </div>
  )
}

