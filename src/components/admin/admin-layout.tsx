"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
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
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SessionUser {
  id: string
  email: string
  name: string | null
  role: "USER" | "ADMIN"
}

interface AdminLayoutProps {
  lang: string
  user: SessionUser
  children: React.ReactNode
}

export function AdminLayout({ lang, user, children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("dashboard")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null)

  // Update active item based on current pathname
  useEffect(() => {
    if (pathname?.includes("/admin/blogs")) {
      setActiveItem("blogs")
    } else if (pathname?.includes("/admin/events")) {
      setActiveItem("events")
    } else if (pathname?.includes("/admin/dashboard")) {
      setActiveItem("dashboard")
    }
  }, [pathname])

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
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: `/${lang}/admin/dashboard` },
    { id: "blogs", label: "Blogs", icon: BookOpen, href: `/${lang}/admin/blogs` },
    { id: "events", label: "Events", icon: Calendar, href: `/${lang}/admin/events` },
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Left Sidebar */}
      <motion.aside
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-[#2c2b2b] flex flex-col fixed left-0 top-0 h-full z-40"
        style={{ overflow: "visible" }}
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
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="search-bar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-3 border-b border-[#2c2b2b]/50 overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#2c2b2b]/50 border border-[#2c2b2b]/50 rounded-lg pl-10 pr-3 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#b92025]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <nav className="py-4">
            {navItems.map((item, index) => {
              const isActive = activeItem === item.id
              const isHovered = hoveredItem === item.id
              
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={(e) => {
                    setHoveredItem(item.id)
                    if (!isSidebarOpen) {
                      // Find the button element within the container
                      const button = e.currentTarget.querySelector('button')
                      if (button) {
                        const rect = button.getBoundingClientRect()
                        setTooltipPosition({
                          top: rect.top + rect.height / 10 + 1,
                          left: rect.right + 10,
                        })
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null)
                    setTooltipPosition(null)
                  }}
                >
                  <Link href={item.href}>
                    <motion.button
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={navItemVariants}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors relative ${
                        isActive
                          ? "bg-[#2c2b2b]/50 text-white"
                          : "text-white/70 hover:text-white hover:bg-[#2c2b2b]/30"
                      } ${!isSidebarOpen ? "justify-center" : ""}`}
                      whileHover={{ 
                        x: isSidebarOpen ? 4 : 0,
                        scale: !isSidebarOpen ? 1.1 : 1
                      }}
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
                        className="flex-shrink-0"
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <AnimatePresence>
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm font-medium whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </Link>

                  {/* Hover Tooltip - Shown when sidebar is collapsed */}
                  <AnimatePresence>
                    {isHovered && !isSidebarOpen && hoveredItem === item.id && tooltipPosition && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.9 }}
                        transition={{ 
                          duration: 0.15, 
                          ease: [0.4, 0, 0.2, 1],
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                        className="fixed z-[100] pointer-events-none whitespace-nowrap"
                        style={{
                          left: `${tooltipPosition.left}px`,
                          top: `${tooltipPosition.top}px`,
                          transform: "translateY(-50%)",
                        }}
                      >
                        <div className="bg-[#2c2b2b] text-white rounded-md shadow-2xl border border-[#2c2b2b]/70 px-3 py-2 relative">
                          <div className="text-sm font-semibold text-white">
                            {item.label}
                          </div>
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-[#2c2b2b] border-b-[6px] border-b-transparent" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>
        </div>

        {/* User Profile/Logout */}
        <motion.div
          className="border-t border-[#2c2b2b]/50 p-4 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <motion.button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center gap-3 text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={isSidebarOpen ? undefined : "Logout"}
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
                  className="flex-1 text-left min-w-0"
                >
                  <div className="text-sm font-medium truncate">
                    {user.name || "User"}
                  </div>
                  <div className="text-xs text-white/50 truncate">{user.email}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex-shrink-0">
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
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={contentVariants}
        className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden"
      >
        {children}
      </motion.div>
    </div>
  )
}

