"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  Home,
  Briefcase,
  Award,
  Users,
  MessageSquare,
  Wrench,
  Calculator,
  FileText,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { type Locale } from "@/lib/i18n-config"
import { getTranslations } from "@/lib/i18n"

interface HeaderProps {
  lang: Locale
}

export function Header({ lang }: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [toolsHover, setToolsHover] = useState(false)
  const [servicesHover, setServicesHover] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset expandable sections when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileServicesOpen(false)
      setIsMobileToolsOpen(false)
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { href: `/${lang}`, label: "Home", icon: Home },
    { href: `/${lang}#services`, label: "Services", icon: Briefcase, isDropdown: true },
    { href: `/${lang}#why-us`, label: "Why Us", icon: Award },
    { href: `/${lang}/about`, label: "About Us", icon: Users },
    { href: `/${lang}#testimonials`, label: "Testimonials", icon: MessageSquare },
  ]

  const toolsItems = [
    { href: `/${lang}/crs-calculator`, label: "CRS Calculator", icon: Calculator },
    { href: `/${lang}/fswp-calculator`, label: "FSWP Calculator", icon: FileText },
  ]

  const servicesItems = [
    { href: `/${lang}#economic-immigration`, label: "Economic Immigration", icon: Briefcase },
    { href: `/${lang}#family-class`, label: "Family Class", icon: Users },
    { href: `/${lang}/services/temporary-residence`, label: "Temporary Residence", icon: Home },
    { href: `/${lang}#employers`, label: "Employers", icon: Briefcase },
    { href: `/${lang}#citizenship`, label: "Citizenship", icon: Award },
    { href: `/${lang}#investors`, label: "Investors", icon: FileText },
  ]

  const containerVariants = {
    hidden: { opacity: 1, y: 0 }, // Start visible on mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0,
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 1, y: 0 }, // Start visible on mobile
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  }

  if (!mounted) {
    return (
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon"
        style={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            <div className="h-16 md:h-20 w-40 bg-white/20 rounded animate-pulse" />
            <div className="hidden md:flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-20 bg-white/20 rounded animate-pulse" />
              ))}
            </div>
            <div className="md:hidden flex items-center gap-2">
              <div className="h-8 w-16 bg-white/20 rounded animate-pulse" />
              <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      variants={containerVariants}
      initial="visible"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon shadow-lg" 
          : "bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon"
      }`}
      style={{ 
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        display: 'block'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 gap-2 md:gap-4">
          {/* Div 1 - Logo/Icon */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center flex-shrink-0"
            style={{ opacity: 1 }}
          >
            <Link href={`/${lang}`} className="flex items-center group">
              <div className="h-14 md:h-20 w-auto max-w-[140px] md:max-w-none min-w-[80px] md:min-w-[100px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logoFooter.png" 
                  alt="Northern Pathways Logo" 
                  className="h-full w-full object-contain"
                  loading="eager"
                  style={{ opacity: 1 }}
                />
              </div>
            </Link>
          </motion.div>

          {/* Div 2 - Nav Items (Desktop only) */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              // Handle Services with dropdown
              if (item.label === "Services") {
                const isServicesActive = pathname.includes('/services/')
                return (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesHover(true)}
                    onMouseLeave={() => setServicesHover(false)}
                  >
                    <Link
                      href={`/${lang}#services`}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                        isServicesActive
                          ? "text-white"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <motion.span
                        className="absolute left-0 right-0 bottom-0 h-px bg-white"
                        initial={false}
                        style={{ transformOrigin: "50% 50%" }}
                        animate={isServicesActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                      />
                      <Briefcase className="h-4 w-4" />
                      <span className="relative z-10">Services</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesHover ? 'rotate-180' : ''}`} />
                    </Link>

              <AnimatePresence>
                {servicesHover && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[260px]"
                  >
                    <div className="py-2">
                      {servicesItems.map((service, index) => {
                        const isActive = pathname === service.href
                        return (
                          <motion.div
                            key={service.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <Link
                              href={service.href}
                              className={`group relative flex items-center gap-3 px-5 py-3 font-semibold transition-all duration-200 ${
                                isActive
                                  ? "bg-gradient-to-r from-brand-red to-brand-maroon text-white"
                                  : "text-[#2c2b2b] hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-brand-red"
                              }`}
                            >
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                                className={`flex-shrink-0 ${
                                  isActive ? "text-white" : "text-brand-red group-hover:text-brand-red"
                                }`}
                              >
                                <service.icon className="h-5 w-5" />
                              </motion.div>
                              <span className="text-sm">{service.label}</span>
                              {isActive && (
                                <motion.span
                                  className="absolute left-4 right-4 bottom-0 h-px bg-white/70"
                                  initial={false}
                                  style={{ transformOrigin: "50% 50%" }}
                                  animate={{ opacity: 1, scaleX: 1 }}
                                  transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon" />
                  </motion.div>
                )}
              </AnimatePresence>
                  </div>
                )
              }
              
              // Regular nav items
              const isActive = pathname === item.href || (item.href === `/${lang}` && pathname === `/${lang}`)
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-white"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                   <motion.span
                     className="absolute left-0 right-0 bottom-0 h-px bg-white"
                     initial={false}
                     style={{ transformOrigin: "50% 50%" }}
                     animate={isActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                     transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                   />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}

            {/* Tools with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsHover(true)}
              onMouseLeave={() => setToolsHover(false)}
            >
              <Link
                href={`/${lang}#tools`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                  pathname.includes('calculator')
                    ? "text-white"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                 <motion.span
                   className="absolute left-0 right-0 bottom-0 h-px bg-white"
                   initial={false}
                   style={{ transformOrigin: "50% 50%" }}
                   animate={pathname.includes('calculator') ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                   transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                 />
                <Wrench className="h-4 w-4" />
                <span className="relative z-10">Tools</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${toolsHover ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {toolsHover && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[240px]"
                  >
                    <div className="py-2">
                      {toolsItems.map((tool, index) => {
                        const isActive = pathname === tool.href
                        return (
                          <motion.div
                            key={tool.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <Link
                              href={tool.href}
                              className={`group relative flex items-center gap-3 px-5 py-3 font-semibold transition-all duration-200 ${
                                isActive
                                  ? "bg-gradient-to-r from-brand-red to-brand-maroon text-white"
                                  : "text-[#2c2b2b] hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-brand-red"
                              }`}
                            >
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                                className={`flex-shrink-0 ${
                                  isActive ? "text-white" : "text-brand-red group-hover:text-brand-red"
                                }`}
                              >
                                <tool.icon className="h-5 w-5" />
                              </motion.div>
                              <span className="text-sm">{tool.label}</span>
                              <motion.span
                                className="absolute left-4 right-4 bottom-0 h-px bg-white/70"
                                initial={false}
                                style={{ transformOrigin: "50% 50%" }}
                                animate={isActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                                transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                              />
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                    
                    {/* Decorative bottom accent */}
                    <div className="h-1 bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Div 2 - Empty space on mobile (prevents logo from blocking) */}
          <div className="flex-1 md:hidden" />

          {/* Div 3 - Contact Us and Language Selection (Desktop) */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Contact Us Button */}
            <a
              href="https://www.northernpathways.ca/pre-assessment-form"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span>Contact Us</span>
            </a>

            <LanguageSwitcher currentLang={lang} />
          </motion.div>

          {/* Div 3 - Language Switcher and Menu Button (Mobile) */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-2 md:hidden flex-shrink-0"
            style={{ opacity: 1 }}
          >
            <div className="flex-shrink-0">
              <LanguageSwitcher currentLang={lang} />
            </div>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 w-10 h-10 flex items-center justify-center flex-shrink-0"
              aria-label="Toggle menu"
              style={{ opacity: 1 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ opacity: 1 }}
                  >
                    <Menu className="h-6 w-6" style={{ opacity: 1 }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
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
            className="md:hidden bg-brand-maroon border-t border-brand-red/30 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  // Handle Services with dropdown
                  if (item.label === "Services") {
                    const isServicesActive = pathname.includes('/services/')
                    return (
                      <div key={item.label}>
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen((open) => !open)}
                          className={`flex w-full items-center justify-between gap-3 p-3 rounded-lg font-medium transition-all duration-200 relative ${
                            isServicesActive
                              ? "text-white"
                              : "text-white/90 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <motion.span
                            className="absolute left-0 right-0 bottom-0 h-px bg-white"
                            initial={false}
                            style={{ transformOrigin: "50% 50%" }}
                            animate={isServicesActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                            transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                          />
                          <div className="flex items-center gap-3 relative z-10">
                            <Briefcase className="h-5 w-5" />
                            <span>Services</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 relative z-10 ${
                              isMobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-1 pl-8"
                            >
                              {servicesItems.map((service) => {
                                const isActive = pathname === service.href
                                return (
                                  <Link
                                    key={service.href}
                                    href={service.href}
                                    className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 relative ${
                                      isActive
                                        ? "text-white"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <motion.span
                                      className="absolute left-0 right-0 bottom-0 h-px bg-white"
                                      initial={false}
                                      style={{ transformOrigin: "50% 50%" }}
                                      animate={isActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                                      transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                                    />
                                    <service.icon className="h-5 w-5 relative z-10" />
                                    <span className="relative z-10">{service.label}</span>
                                  </Link>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }
                  
                  // Regular nav items
                  const isActive = pathname === item.href || (item.href === `/${lang}` && pathname === `/${lang}`)
                  
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="relative inline-block">
                        {item.label}
                        <motion.span
                          className="absolute left-0 right-0 bottom-0 h-px bg-white"
                          initial={false}
                          style={{ transformOrigin: "50% 50%" }}
                          animate={isActive ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                          transition={{ type: "spring", stiffness: 360, damping: 28, duration: 0.3 }}
                        />
                      </span>
                    </Link>
                  )
                })}

                {/* Tools Mobile (expandable) */}
                <button
                  type="button"
                  onClick={() => setIsMobileToolsOpen((open) => !open)}
                  className="flex w-full items-center justify-between gap-3 p-3 rounded-lg font-medium transition-all duration-200 text-white/90 hover:bg-white/10 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <Wrench className="h-5 w-5" />
                    <span>Tools</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMobileToolsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isMobileToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1 pl-8"
                    >
                      {toolsItems.map((tool) => {
                        const isActive = pathname === tool.href
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "text-white/90 hover:bg-white/10 hover:text-white"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <tool.icon className="h-5 w-5" />
                            <span>{tool.label}</span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Contact Us Mobile */}
                <a
                  href="https://www.northernpathways.ca/pre-assessment-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
