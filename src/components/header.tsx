"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  Calculator,
  User,
  BookOpen,
  Award
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: Calculator },
    { href: "/fswp-calculator", label: "FSWP Calculator", icon: User },
    { href: "/crs-calculator", label: "CRS Calculator", icon: BookOpen },
    { href: "https://www.northernpathways.ca/pre-assessment-form", label: "Pre-Assessment", external: true, icon: Award },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="hidden md:flex space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg" 
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-44 h-44 sm:w-48 sm:h-48 md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-64 xl:h-64 rounded-lg overflow-hidden p-1 sm:p-2">
                <img 
                  src="/logoNavBar.png" 
                  alt="Northern Pathways Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const isExternal = item.external
              
              if (isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#B92025] text-white shadow-lg"
                        : "text-[#2F2E2E] hover:bg-red-50 hover:text-[#B92025]"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                )
              }
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#B92025] text-white shadow-lg"
                      : "text-[#2F2E2E] hover:bg-red-50 hover:text-[#B92025]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2F2E2E] hover:bg-red-50 hover:text-[#B92025] transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  const isExternal = item.external
                  
                  if (isExternal) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-[#B92025] text-white shadow-lg"
                            : "text-[#2F2E2E] hover:bg-red-50 hover:text-[#B92025]"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </a>
                    )
                  }
                  
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#B92025] text-white shadow-lg"
                          : "text-[#2F2E2E] hover:bg-red-50 hover:text-[#B92025]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
