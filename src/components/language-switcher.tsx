"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { locales, type Locale } from "@/lib/i18n-config"

interface LanguageSwitcherProps {
  currentLang: Locale
}

const languageFlags: Record<Locale, string> = {
  en: 'gb',
  tr: 'tr',
}

const languageNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const switchLanguage = (newLang: Locale) => {
    if (newLang === currentLang) {
      setIsOpen(false)
      return
    }
    
    // Get current path without language prefix
    let pathWithoutLang = pathname.replace(`/${currentLang}`, '') || '/'
    // Ensure path starts with /
    if (!pathWithoutLang.startsWith('/')) {
      pathWithoutLang = '/' + pathWithoutLang
    }
    const newPath = `/${newLang}${pathWithoutLang}`
    
    // Refresh the page to the new language route
    window.location.href = newPath
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2.5 bg-brand-red hover:bg-brand-maroon text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <span className={`fi fi-${languageFlags[currentLang]} rounded-sm`} style={{ fontSize: '1rem' }} />
        <span className="uppercase text-sm font-semibold">{currentLang}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[120px]"
            >
              {locales.map((lang, index) => {
                const isActive = currentLang === lang
                return (
                  <motion.button
                    key={lang}
                    onClick={() => switchLanguage(lang)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-center gap-3 ${
                      isActive
                        ? 'bg-brand-red text-white'
                        : 'text-[#2c2b2b] hover:bg-red-50 hover:text-brand-red'
                    }`}
                  >
                    <span 
                      className={`fi fi-${languageFlags[lang]} rounded-sm flex-shrink-0`} 
                      style={{ fontSize: '1.5rem' }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold uppercase">{lang}</span>
                      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {languageNames[lang]}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

