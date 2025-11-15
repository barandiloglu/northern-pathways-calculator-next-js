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

  const navItems = [
    { href: `/${lang}`, label: "Home", icon: Home },
    { href: `/${lang}#services`, label: "Services", icon: Briefcase },
    { href: `/${lang}#why-us`, label: "Why Us", icon: Award },
    { href: `/${lang}#about`, label: "About Us", icon: Users },
    { href: `/${lang}#testimonials`, label: "Testimonials", icon: MessageSquare },
  ]

  const toolsItems = [
    { href: `/${lang}/crs-calculator`, label: "CRS Calculator", icon: Calculator },
    { href: `/${lang}/fswp-calculator`, label: "FSWP Calculator", icon: FileText },
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            <div className="h-16 md:h-20 w-40 bg-white/20 rounded animate-pulse" />
            <div className="hidden md:flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-20 bg-white/20 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
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
          ? "bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon shadow-lg" 
          : "bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 gap-4">
          {/* Div - Logo/Icon */}
          <motion.div variants={itemVariants} className="flex items-center flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center group">
              <div className="h-16 md:h-20 w-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logoFooter.png" 
                  alt="Northern Pathways Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Div - Nav Items */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
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
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
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
                {pathname.includes('calculator') && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Wrench className="h-4 w-4" />
                <span className="relative z-10">Tools</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${toolsHover ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {toolsHover && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] z-50"
                  >
                    {toolsItems.map((tool) => {
                      const isActive = pathname === tool.href
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className={`flex items-center gap-3 px-4 py-2 font-medium transition-colors duration-200 ${
                            isActive
                              ? "bg-brand-red text-white"
                              : "text-[#2c2b2b] hover:bg-red-50 hover:text-brand-red"
                          }`}
                        >
                          <tool.icon className="h-4 w-4" />
                          <span>{tool.label}</span>
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Div - Contact Us and Language Selection */}
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

          {/* Mobile Menu Button and Language Switcher */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher currentLang={lang} />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
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
                  >
                    <Menu className="h-6 w-6" />
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
                  const isActive = pathname === item.href || (item.href === `/${lang}` && pathname === `/${lang}`)
                  
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}

                {/* Tools Mobile */}
                <div className="space-y-1 pl-3 border-l-2 border-white/20 ml-3">
                  <div className="text-white/70 text-sm font-semibold px-3 py-2">Tools</div>
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
                </div>

                {/* Contact Us Mobile */}
                <a
                  href="https://www.northernpathways.ca/pre-assessment-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg font-semibold transition-all duration-200"
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
