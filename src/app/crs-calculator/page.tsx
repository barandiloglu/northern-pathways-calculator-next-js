"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calculator, 
  User, 
  BookOpen, 
  Briefcase, 
  Globe, 
  Heart, 
  Award, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ChevronDown,

  Star,
  TrendingUp,


  Users,
  GraduationCap,
  Languages,
  Building2,
  FileText,
  Plus,
  X
} from "lucide-react"

import { Footer } from "@/components/footer"
import { calculateCRSScore, CRSFormData } from "@/utils/calculateCRSScore"
import { DrawsModal } from "@/components/draws-modal"
import {
  yesNoOptions,
  maritalStatusOptions,
  ageOptions,
  educationLevelOptions,
  canadianCredentialLevelOptions,


  getSpouseLangTestOptions,
  getLanguageScoreOptions,
  workExperienceOptions,

} from "@/data/crsOptions"

export default function CRSCalculatorPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("age")
  const [showResults, setShowResults] = useState(false)
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false)
  const [showDrawsModal, setShowDrawsModal] = useState(false)
  const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false)
  const [crsScore, setCrsScore] = useState<number>(0)
  const [scoreBreakdown, setScoreBreakdown] = useState<Record<string, unknown>>({})
  
  // Refs for auto-scrolling to conditional questions
  const canadianCredentialRef = useRef<HTMLDivElement | null>(null)
  const firstLanguageScoresRef = useRef<HTMLDivElement | null>(null)
  const secondLanguageScoresRef = useRef<HTMLDivElement | null>(null)
  const spouseLanguageScoresRef = useRef<HTMLDivElement | null>(null)
  const formContainerRef = useRef<HTMLDivElement | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  
  const [formData, setFormData] = useState<CRSFormData>({
    maritalStatus: "",
    partnerStatus: "",
    movingStatus: "",
    age: "",
    educationLevel: "",
    canadianEducationStudy: "",
    canadianCredentialLevel: "",
    firstLangTest: "",
    firstLangSpeaking: "",
    firstLangListening: "",
    firstLangReading: "",
    firstLangWriting: "",
    secondLangTest: "",
    secondLangSpeaking: "",
    secondLangListening: "",
    secondLangReading: "",
    secondLangWriting: "",
    canadianWorkExperience: "",
    foreignWorkExperience: "",
    certificateOfQualification: "",
    provincialNomination: "",
    jobOffer: "",
    nocJobOffer: "",
    siblingInCanada: "",
    spouseEducationLevel: "",
    spouseCanadianWorkExperience: "",
    spouseLangTest: "",
    spouseLangSpeaking: "",
    spouseLangListening: "",
    spouseLangReading: "",
    spouseLangWriting: ""
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle escape key for modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showDetailedBreakdown) {
          setShowDetailedBreakdown(false)
        }
        if (showMissingFieldsModal) {
          setShowMissingFieldsModal(false)
        }
      }
    }

    if (showDetailedBreakdown || showMissingFieldsModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showDetailedBreakdown, showMissingFieldsModal])

  // Handle body overflow for missing fields modal
  useEffect(() => {
    if (showMissingFieldsModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showMissingFieldsModal])

  // Auto-scroll to conditional questions when they appear
  useEffect(() => {
    const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current && formContainerRef.current) {
        const container = formContainerRef.current
        const element = ref.current
        
        // Calculate the scroll position to center the element in the container
        const containerRect = container.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const scrollTop = container.scrollTop + (elementRect.top - containerRect.top) - (containerRect.height / 2) + (elementRect.height / 2)
        
        // Smooth scroll to the element
        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        })
        
        // Add a subtle highlight effect
        element.style.transition = 'box-shadow 0.3s ease-in-out'
        element.style.boxShadow = '0 0 0 3px rgba(185, 32, 37, 0.3)'
        setTimeout(() => {
          element.style.boxShadow = ''
        }, 2000)
      }
    }

    // Auto-scroll based on form changes
    if (formData.canadianEducationStudy === "yes" && formData.canadianCredentialLevel === "") {
      // Small delay to ensure the element is rendered
      setTimeout(() => scrollToElement(canadianCredentialRef), 100)
    }
    
    if (formData.firstLangTest && formData.firstLangSpeaking === "") {
      setTimeout(() => scrollToElement(firstLanguageScoresRef), 100)
    }
    
    if (formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable" && formData.secondLangSpeaking === "") {
      setTimeout(() => scrollToElement(secondLanguageScoresRef), 100)
    }
    
    if (formData.spouseLangTest && formData.spouseLangTest !== "none_or_not_applicable" && formData.spouseLangSpeaking === "") {
      setTimeout(() => scrollToElement(spouseLanguageScoresRef), 100)
    }
  }, [formData.canadianEducationStudy, formData.firstLangTest, formData.secondLangTest, formData.spouseLangTest, formData.canadianCredentialLevel, formData.firstLangSpeaking, formData.secondLangSpeaking, formData.spouseLangSpeaking])

  const getFormProgress = () => {
    let completedFields = 0
    let totalFields = 0

    // Age (always required)
    totalFields++
    if (formData.age !== "") completedFields++

    // Marital Status (always required)
    totalFields++
    if (formData.maritalStatus !== "") completedFields++

    // Spouse Details (only if married/common-law)
    if (isMarriedOrCommonLaw()) {
      totalFields++
      if (formData.partnerStatus !== "") completedFields++
      totalFields++
      if (formData.movingStatus !== "") completedFields++
    }

    // Education (always required)
    totalFields++
    if (formData.educationLevel !== "") completedFields++
    totalFields++
    if (formData.canadianEducationStudy !== "") completedFields++
    if (formData.canadianEducationStudy === "yes") {
      totalFields++
      if (formData.canadianCredentialLevel !== "") completedFields++
    }

    // First Language (always required)
    totalFields++
    if (formData.firstLangTest !== "") completedFields++
    totalFields++
    if (formData.firstLangSpeaking !== "") completedFields++
    totalFields++
    if (formData.firstLangListening !== "") completedFields++
    totalFields++
    if (formData.firstLangReading !== "") completedFields++
    totalFields++
    if (formData.firstLangWriting !== "") completedFields++

    // Second Language (optional)
    totalFields++
    if (formData.secondLangTest !== "") completedFields++
    if (formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable" && formData.secondLangTest !== "") {
      totalFields++
      if (formData.secondLangSpeaking !== "") completedFields++
      totalFields++
      if (formData.secondLangListening !== "") completedFields++
      totalFields++
      if (formData.secondLangReading !== "") completedFields++
      totalFields++
      if (formData.secondLangWriting !== "") completedFields++
    }

    // Work Experience (always required)
    totalFields++
    if (formData.canadianWorkExperience !== "") completedFields++
    totalFields++
    if (formData.foreignWorkExperience !== "") completedFields++

    // Additional Factors (always required)
    totalFields++
    if (formData.provincialNomination !== "") completedFields++
    totalFields++
    if (formData.siblingInCanada !== "") completedFields++
    totalFields++
    if (formData.certificateOfQualification !== "") completedFields++

    // Spouse Factors (only if married/common-law and spouse is moving)
    if (isMarriedOrCommonLaw() && isSpouseMoving()) {
      totalFields++
      if (formData.spouseEducationLevel !== "") completedFields++
      totalFields++
      if (formData.spouseCanadianWorkExperience !== "") completedFields++
      totalFields++
      if (formData.spouseLangTest !== "") completedFields++
      if (formData.spouseLangTest && formData.spouseLangTest !== "none_or_not_applicable") {
        totalFields++
        if (formData.spouseLangSpeaking !== "") completedFields++
        totalFields++
        if (formData.spouseLangListening !== "") completedFields++
        totalFields++
        if (formData.spouseLangReading !== "") completedFields++
        totalFields++
        if (formData.spouseLangWriting !== "") completedFields++
      }
    }

    return { completedFields, totalFields }
  }

  const isFormComplete = () => {
    // Check basic required fields
    if (!formData.maritalStatus || !formData.age || !formData.educationLevel) {
      return false
    }
    
    // Check Canadian education fields
    if (!formData.canadianEducationStudy) {
      return false
    }
    if (formData.canadianEducationStudy === "yes" && !formData.canadianCredentialLevel) {
      return false
    }
    
    // Check first language fields
    if (!formData.firstLangTest || !formData.firstLangSpeaking || 
        !formData.firstLangListening || !formData.firstLangReading || !formData.firstLangWriting) {
      return false
    }
    
    // Check second language test field (always required)
    if (!formData.secondLangTest) {
      return false
    }
    
    // Check second language scores if a test is selected (not "none_or_not_applicable")
    if (formData.secondLangTest !== "none_or_not_applicable") {
      if (!formData.secondLangSpeaking || !formData.secondLangListening || 
          !formData.secondLangReading || !formData.secondLangWriting) {
        return false
      }
    }
    
    // Check work experience fields
    if (!formData.canadianWorkExperience || !formData.foreignWorkExperience) {
      return false
    }
    
    // Check additional factors fields
    if (!formData.provincialNomination || !formData.siblingInCanada || !formData.certificateOfQualification) {
      return false
    }
    
    // Check spouse details if married/common-law
    if (isMarriedOrCommonLaw()) {
      if (!formData.partnerStatus || !formData.movingStatus) {
        return false
      }
      
      // Check spouse factors if spouse is moving
      if (isSpouseMoving()) {
        if (!formData.spouseEducationLevel || !formData.spouseCanadianWorkExperience || !formData.spouseLangTest) {
          return false
        }
        
        // Check spouse language scores if language test is selected
        if (formData.spouseLangTest && formData.spouseLangTest !== "none_or_not_applicable") {
          if (!formData.spouseLangSpeaking || !formData.spouseLangListening || 
              !formData.spouseLangReading || !formData.spouseLangWriting) {
            return false
          }
        }
      }
    }
    
    return true
  }

  const isSectionComplete = (sectionId: string) => {
    switch (sectionId) {
      case "age":
        return formData.age !== ""
      case "marital":
        return formData.maritalStatus !== ""
      case "spouse":
        return isMarriedOrCommonLaw() && formData.partnerStatus !== "" && formData.movingStatus !== ""
      case "education":
        if (formData.educationLevel === "") return false
        if (formData.canadianEducationStudy === "") return false
        if (formData.canadianEducationStudy === "yes" && formData.canadianCredentialLevel === "") return false
        return true
      case "language":
        // First language is required
        if (formData.firstLangTest === "" || 
            formData.firstLangSpeaking === "" || 
            formData.firstLangListening === "" || 
            formData.firstLangReading === "" || 
            formData.firstLangWriting === "") {
          return false
        }
        
        // Second language test is required
        if (formData.secondLangTest === "") {
          return false
        }
        
        // If second language test is selected (not "none_or_not_applicable"), all scores must be filled
        if (formData.secondLangTest !== "none_or_not_applicable") {
          if (formData.secondLangSpeaking === "" || 
              formData.secondLangListening === "" || 
              formData.secondLangReading === "" || 
              formData.secondLangWriting === "") {
            return false
          }
        }
        
        return true
      case "work":
        return formData.canadianWorkExperience !== "" && formData.foreignWorkExperience !== ""
      case "additional":
        return formData.provincialNomination !== "" && formData.siblingInCanada !== "" && formData.certificateOfQualification !== ""
      case "spouseFactors":
        return isMarriedOrCommonLaw() && isSpouseMoving() && formData.spouseEducationLevel !== "" && 
               formData.spouseCanadianWorkExperience !== "" && 
               formData.spouseLangTest !== ""
      default:
        return false
    }
  }

  const updateFormData = (field: keyof CRSFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // If marital status changes and user is on spouse sections, redirect to education section
      if (field === "maritalStatus") {
        const isCurrentlyMarried = value === "married" || value === "common_law"
        const wasPreviouslyMarried = prev.maritalStatus === "married" || prev.maritalStatus === "common_law"
        
        if (wasPreviouslyMarried && !isCurrentlyMarried && (activeSection === "spouse" || activeSection === "spouseFactors")) {
          setActiveSection("education")
        }
        
        // Reset spouse data if no longer married/common-law
        if (!isCurrentlyMarried) {
          newData.spouseEducationLevel = ""
          newData.spouseCanadianWorkExperience = ""
          newData.spouseLangTest = ""
          newData.spouseLangSpeaking = ""
          newData.spouseLangListening = ""
          newData.spouseLangReading = ""
          newData.spouseLangWriting = ""
          // Reset spouse details fields
          newData.partnerStatus = ""
          newData.movingStatus = ""
        }
      }
      
      // If partner status changes, reset moving status and spouse factors
      if (field === "partnerStatus") {
        if (value === "yes") {
          // If spouse is now a citizen, reset moving status and spouse factors
          newData.movingStatus = ""
          newData.spouseEducationLevel = ""
          newData.spouseCanadianWorkExperience = ""
          newData.spouseLangTest = ""
          newData.spouseLangSpeaking = ""
          newData.spouseLangListening = ""
          newData.spouseLangReading = ""
          newData.spouseLangWriting = ""
          
          // Redirect away from spouse factors section if currently there
          if (activeSection === "spouseFactors") {
            setActiveSection("education")
          }
        }
      }
      
      // If moving status changes and user is on spouseFactors section, redirect to education section
      if (field === "movingStatus") {
        const isCurrentlyMoving = value === "yes"
        const wasPreviouslyMoving = prev.movingStatus === "yes"
        
        if (wasPreviouslyMoving && !isCurrentlyMoving && activeSection === "spouseFactors") {
          setActiveSection("education")
        }
        
        // Reset spouse factors data if spouse is no longer moving
        if (!isCurrentlyMoving) {
          newData.spouseEducationLevel = ""
          newData.spouseCanadianWorkExperience = ""
          newData.spouseLangTest = ""
          newData.spouseLangSpeaking = ""
          newData.spouseLangListening = ""
          newData.spouseLangReading = ""
          newData.spouseLangWriting = ""
          // Don't reset spouse details fields - they should keep their values
        }
      }
      
      // Job offer logic removed - field no longer in Additional Factors section
      
      // If first language test changes, reset first language scores
      if (field === "firstLangTest") {
        newData.firstLangSpeaking = ""
        newData.firstLangListening = ""
        newData.firstLangReading = ""
        newData.firstLangWriting = ""
      }
      
      // If second language test changes, reset second language scores
      if (field === "secondLangTest") {
        newData.secondLangSpeaking = ""
        newData.secondLangListening = ""
        newData.secondLangReading = ""
        newData.secondLangWriting = ""
      }
      
      // If spouse language test changes, reset spouse language scores
      if (field === "spouseLangTest") {
        newData.spouseLangSpeaking = ""
        newData.spouseLangListening = ""
        newData.spouseLangReading = ""
        newData.spouseLangWriting = ""
      }
      
      return newData
    })
  }

  const calculateScore = () => {
    const { total, breakdown } = calculateCRSScore(formData)
    setCrsScore(total)
    setScoreBreakdown(breakdown)
    setShowResults(true)
    
    // Scroll to results after a short delay to ensure rendering
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 100)
  }

  const isMarriedOrCommonLaw = () => {
    return formData.maritalStatus === "married" || formData.maritalStatus === "common_law"
  }

  const isSpouseMoving = () => {
    return formData.partnerStatus === "no" && formData.movingStatus === "yes"
  }

  const sections = [
    { id: "age", title: "Age", icon: User, color: "blue", emoji: "👤" },
    { id: "marital", title: "Marital Status", icon: Users, color: "red", emoji: "💑" },
    ...(isMarriedOrCommonLaw() ? [{ id: "spouse", title: "Spouse Details", icon: Heart, color: "pink", emoji: "❤️", isNew: true }] : []),
    { id: "education", title: "Education", icon: GraduationCap, color: "green", emoji: "🎓" },
    { id: "language", title: "Language Proficiency", icon: Languages, color: "purple", emoji: "🗣️" },
    { id: "work", title: "Work Experience", icon: Building2, color: "orange", emoji: "💼" },
    { id: "additional", title: "Additional Factors", icon: Plus, color: "indigo", emoji: "⭐" },
    ...(isMarriedOrCommonLaw() && isSpouseMoving() ? [{ id: "spouseFactors", title: "Spouse Factors", icon: FileText, color: "teal", emoji: "📋", isNew: true }] : [])
  ]

  const getSectionStyles = (sectionId: string, isActive: boolean) => {
    if (!isActive) {
      return "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent"
    }
    
    const section = sections.find(s => s.id === sectionId)
    if (!section) return ""
    
    const colorMap: { [key: string]: string } = {
      red: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg border-2 border-red-500",
      pink: "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg border-2 border-pink-500",
      blue: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-2 border-blue-500",
      green: "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg border-2 border-green-500",
      purple: "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border-2 border-purple-500",
      orange: "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg border-2 border-orange-500",
      indigo: "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg border-2 border-indigo-500",
      teal: "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg border-2 border-teal-500"
    }
    
    return colorMap[section.color] || colorMap.red
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </main>



      <Footer />
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex flex-col">
      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Hero Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 shadow-xl overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Northern Pathways Logo" 
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#B92025] via-red-700 to-[#2F2E2E] bg-clip-text text-transparent mb-2 sm:mb-3"
          >
            CRS Score Calculator
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm sm:text-base text-[#2F2E2E] max-w-2xl mx-auto leading-relaxed px-2 mb-4"
          >
            Calculate your Comprehensive Ranking System score for Express Entry to Canada. 
            Complete each section to get your personalized CRS score.
          </motion.p>

          {/* Latest Draws Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            <button
              onClick={() => setShowDrawsModal(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#B92025] to-red-700 hover:from-red-700 hover:to-[#B92025] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <TrendingUp className="h-5 w-5" />
              <span>View Latest Express Entry Draws</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Calculator Form - Enhanced Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Mobile Navigation - Horizontal Scrollable */}
          <motion.div variants={itemVariants} className="lg:hidden mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <h3 className="text-base font-bold text-[#2F2E2E] mb-3 px-1">Assessment Sections</h3>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <AnimatePresence mode="popLayout">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1],
                          delay: index * 0.08
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -10, 
                        scale: 0.95,
                        transition: {
                          duration: 0.3,
                          ease: [0.4, 0, 1, 1]
                        }
                      }}
                      layout
                      onClick={() => setActiveSection(section.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${getSectionStyles(section.id, activeSection === section.id)}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        minHeight: "44px",
                        transformOrigin: "center"
                      }}
                    >
                      <motion.span 
                        className={`text-base ${activeSection === section.id ? 'drop-shadow-sm' : ''}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: index * 0.08 + 0.1
                        }}
                      >
                        {section.emoji}
                      </motion.span>
                      <motion.span 
                        className={`font-medium text-xs sm:text-sm flex-1 text-left whitespace-nowrap ${activeSection === section.id ? 'text-white font-semibold' : 'text-[#2F2E2E]'}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.4, 0, 0.2, 1],
                          delay: index * 0.08 + 0.15
                        }}
                      >
                        {section.title}
                        {section.isNew && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className={`ml-2 px-1.5 py-0.5 text-xs font-bold rounded-full ${
                              activeSection === section.id 
                                ? 'bg-white text-pink-600' 
                                : 'bg-pink-500 text-white'
                            }`}
                          >
                            NEW
                          </motion.span>
                        )}
                      </motion.span>
                      <div className="w-4 h-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {isSectionComplete(section.id) ? (
                            <motion.div
                              key={`${section.id}-completed`}
                              initial={{ scale: 0, rotate: -180, opacity: 0 }}
                              animate={{ scale: 1, rotate: 0, opacity: 1 }}
                              exit={{ scale: 0, rotate: 180, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "backOut" }}
                              className="text-green-500"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key={`${section.id}-pending`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="text-amber-500"
                            >
                              <div className="w-3 h-3 border-2 border-amber-400 rounded-full border-t-transparent animate-spin" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Desktop Sidebar Navigation - Hidden on Mobile */}
            <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 sticky top-20 h-[650px] overflow-y-auto">
                <h3 className="text-lg font-bold text-[#2F2E2E] mb-4">Assessment Sections</h3>
                <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {sections.map((section, index) => (
                                                  <motion.button
                            key={section.id}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0, 
                              scale: 1,
                              transition: {
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1],
                                delay: index * 0.08
                              }
                            }}
                            exit={{ 
                              opacity: 0, 
                              y: -10, 
                              scale: 0.95,
                              transition: {
                                duration: 0.3,
                                ease: [0.4, 0, 1, 1]
                              }
                            }}
                            layout
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${getSectionStyles(section.id, activeSection === section.id)}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ 
                              height: "48px",
                              transformOrigin: "center"
                            }}
                          >
                                                   <motion.span 
                            className={`text-lg ${activeSection === section.id ? 'drop-shadow-sm' : ''}`}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              duration: 0.6, 
                              ease: [0.34, 1.56, 0.64, 1],
                              delay: index * 0.08 + 0.1
                            }}
                          >
                            {section.emoji}
                          </motion.span>
                          <motion.span 
                            className={`font-medium text-sm flex-1 text-left ${activeSection === section.id ? 'text-white font-semibold' : 'text-[#2F2E2E]'}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              ease: [0.4, 0, 0.2, 1],
                              delay: index * 0.08 + 0.15
                            }}
                          >
                            {section.title}
                            {section.isNew && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className={`ml-2 px-1.5 py-0.5 text-xs font-bold rounded-full ${
                                  activeSection === section.id 
                                    ? 'bg-white text-pink-600' 
                                    : 'bg-pink-500 text-white'
                                }`}
                              >
                                NEW
                              </motion.span>
                            )}
                          </motion.span>
                         <div className="w-6 h-6 flex items-center justify-center">
                           <AnimatePresence mode="wait">
                             {isSectionComplete(section.id) ? (
                               <motion.div
                                 key={`${section.id}-completed`}
                                 initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                 animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                 exit={{ scale: 0, rotate: 180, opacity: 0 }}
                                 transition={{ duration: 0.4, ease: "backOut" }}
                                 className="text-green-500"
                               >
                                 <CheckCircle className="h-5 w-5" />
                               </motion.div>
                             ) : (
                               <motion.div
                                 key={`${section.id}-pending`}
                                 initial={{ scale: 0, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 exit={{ scale: 0, opacity: 0 }}
                                 transition={{ duration: 0.3, ease: "easeOut" }}
                                 className="text-amber-500"
                               >
                                 <div className="w-4 h-4 border-2 border-amber-400 rounded-full border-t-transparent animate-spin" />
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                       </motion.button>
                     ))}
                   </AnimatePresence>
                 </div>
               </div>
             </motion.div>

            {/* Main Form - Enhanced with Better Spacing */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-6 shadow-lg border border-gray-100 min-h-[500px] lg:h-[650px] flex flex-col">
                <div ref={formContainerRef} className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeSection === "marital" && (
                    <motion.div
                      key="marital"
                      data-section="marital"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-[#B92025] rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Marital Status</h2>
                      </div>

                      <div className="grid grid-cols-1 gap-4 px-1">
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            What is your marital status? *
                          </label>
                          <select
                            value={formData.maritalStatus}
                            onChange={(e) => updateFormData("maritalStatus", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B92025] focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select marital status</option>
                            {maritalStatusOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                                     {activeSection === "spouse" && isMarriedOrCommonLaw() && (
                     <motion.div
                       key="spouse"
                       data-section="spouse"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="space-y-3"
                     >
                       <div className="flex items-center space-x-3 mb-4">
                         <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                           <Heart className="h-4 w-4 text-white" />
                         </div>
                         <h2 className="text-xl font-bold text-[#2F2E2E]">Spouse Details</h2>
                       </div>

                                              <div className="grid grid-cols-1 gap-4 px-1">
                         <div>
                           <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                             Is your spouse or common-law partner a citizen or permanent resident of Canada?
                           </label>
                            <select
                              value={formData.partnerStatus}
                              onChange={(e) => updateFormData("partnerStatus", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select partner status</option>
                              {yesNoOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                              ))}
                            </select>
                          </div>

                          {/* Only show the moving question if spouse is not a citizen/permanent resident */}
                          <AnimatePresence mode="wait">
                            {formData.partnerStatus === "no" && (
                              <motion.div
                                key="moving-question"
                                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ 
                                  duration: 0.4, 
                                  ease: [0.4, 0, 0.2, 1]
                                }}
                              >
                                <div>
                                  <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                                    Will your spouse or common-law partner come with you to Canada?
                                  </label>
                                  <select
                                    value={formData.movingStatus}
                                    onChange={(e) => updateFormData("movingStatus", e.target.value)}
                                    className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all duration-200 text-base"
                                  >
                                    <option value="">Select moving status</option>
                                    {yesNoOptions.map(option => (
                                      <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                  </select>
                                  
                                  {/* Scroll indicator for spouse factors section */}
                                  <AnimatePresence mode="wait">
                                    {formData.movingStatus === "yes" && (
                                      <motion.div
                                        key="scroll-indicator"
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="mt-2 flex items-center space-x-2 text-xs text-pink-600"
                                      >
                                        <ChevronDown className="h-3 w-3 animate-bounce" />
                                        <span>Spouse factors section available</span>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                       </div>
                     </motion.div>
                   )}

                  {activeSection === "age" && (
                    <motion.div
                      key="age"
                      data-section="age"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Age</h2>
                      </div>

                                              <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            How old are you? *
                          </label>
                        <select
                          value={formData.age}
                          onChange={(e) => updateFormData("age", e.target.value)}
                          className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-base"
                        >
                          <option value="">Select your age</option>
                          {ageOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "education" && (
                    <motion.div
                      key="education"
                      data-section="education"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Education</h2>
                      </div>

                      <div className="px-1">
                        <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                          What is your level of education? *
                        </label>
                        <select
                          value={formData.educationLevel}
                          onChange={(e) => updateFormData("educationLevel", e.target.value)}
                          className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-base"
                        >
                          <option value="">Select education level</option>
                          {educationLevelOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        
                        <div className="mt-4 p-3 sm:p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                          <ul className="text-sm text-gray-700 space-y-2 sm:space-y-3">
                            <li className="flex items-start">
                              <span className="text-blue-500 mr-2 sm:mr-3 text-base sm:text-lg">•</span>
                              <span className="text-xs sm:text-sm">To get points for your foreign credential, you must obtain an Educational Credential Assessment (ECA) report. This report must verify that your foreign credential is valid and equivalent to a Canadian credential.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-500 mr-2 sm:mr-3 text-base sm:text-lg">•</span>
                              <span className="text-xs sm:text-sm">If you completed your studies at a private DLI (designated learning institution) in Canada and the program does not qualify for a post-graduation work permit, it is not considered &apos;Canadian education&apos; for the purpose of earning additional points for Canadian education. However, your education may still be eligible for education points.</span>
                            </li>
                          </ul>
                        </div>

                                                  {/* Canadian Education Question */}
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            Have you earned a Canadian degree, diploma or certificate?
                          </label>
                          <select
                            value={formData.canadianEducationStudy}
                            onChange={(e) => updateFormData("canadianEducationStudy", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select an option</option>
                            {yesNoOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          {/* Scroll indicator for Canadian credential question */}
                          {formData.canadianEducationStudy === "yes" && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 flex items-center space-x-2 text-xs text-blue-600"
                            >
                              <ChevronDown className="h-3 w-3 animate-bounce" />
                              <span>Additional question below</span>
                            </motion.div>
                          )}

                          {/* Canadian Education Description */}
                          <div className="mt-3 p-3 sm:p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                            <h4 className="text-sm font-medium text-amber-800 mb-2">To confirm eligibility, please ensure the following criteria are met:</h4>
                            <ul className="text-xs text-amber-700 space-y-1.5">
                              <li className="flex items-start">
                                <span className="text-amber-500 mr-2 text-sm">•</span>
                                <span>Your program of study must qualify for a post-graduation work permit.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-amber-500 mr-2 text-sm">•</span>
                                <span>Courses in English or French as a Second Language should constitute less than half of your curriculum.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-amber-500 mr-2 text-sm">•</span>
                                <span>Your education must not have been funded by a scholarship or grant that obligates you to apply your skills and knowledge in your home country post-graduation.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-amber-500 mr-2 text-sm">•</span>
                                <span>Your institution of study must be located within Canada; studies at international branch campuses do not qualify.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-amber-500 mr-2 text-sm">•</span>
                                <span>You must have been enrolled as a full-time student for a minimum of eight months, with the exception of those who completed their studies or training (either in full or partially) between March 2020 and August 2022.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-amber-500 mr-2 text-sm">•</span>
                                <span>A physical presence in Canada for at least eight months is required, unless your study or training completion (whole or part) falls between March 2020 and August 2022.</span>
                              </li>
                            </ul>
                          </div>

                          {/* Canadian Credential Level Question - Only show if user selects "yes" */}
                          {formData.canadianEducationStudy === "yes" && (
                            <div ref={canadianCredentialRef} className="mt-4">
                              <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                                Choose the best answer to describe your Canadian education.
                              </label>
                              <select
                                value={formData.canadianCredentialLevel}
                                onChange={(e) => updateFormData("canadianCredentialLevel", e.target.value)}
                                className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-base"
                              >
                                <option value="">Select credential level</option>
                                {canadianCredentialLevelOptions.map(option => (
                                  <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "language" && (
                    <motion.div
                      key="language"
                      data-section="language"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 mb-5">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Language Proficiency</h2>
                      </div>

                      {/* Mobile-First Language Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3">
                        {/* First Language Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-4 sm:p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">1</span>
                            </div>
                            <h3 className="text-sm font-semibold text-blue-800">First Official Language</h3>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs font-medium text-[#2F2E2E] mb-1">
                                Which language test have you taken, or do you plan to take? *
                              </label>
                              <select
                                value={formData.firstLangTest}
                                onChange={(e) => updateFormData("firstLangTest", e.target.value)}
                                className="w-full px-3 py-2 sm:py-1.5 text-base sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                              >
                                <option value="">Select a language test</option>
                                {/* Show all tests if no second language is selected or if "none or not applicable" is selected */}
                                {(!formData.secondLangTest || formData.secondLangTest === "none_or_not_applicable") && (
                                  <>
                                    <option value="celpip_g">CELPIP-General (English)</option>
                                    <option value="ielts_g">IELTS General Training (English)</option>
                                    <option value="pte_core">PTE Core (English)</option>
                                    <option value="tef_canada">TEF Canada (French)</option>
                                    <option value="tcf_canada">TCF Canada (French)</option>
                                  </>
                                )}
                                {/* Show only English tests if French test is selected in second language */}
                                {(formData.secondLangTest === "tef_canada" || formData.secondLangTest === "tcf_canada") && (
                                  <>
                                    <option value="celpip_g">CELPIP-General (English)</option>
                                    <option value="ielts_g">IELTS General Training (English)</option>
                                    <option value="pte_core">PTE Core (English)</option>
                                  </>
                                )}
                                {/* Show only French tests if English test is selected in second language */}
                                {(formData.secondLangTest === "celpip_g" || formData.secondLangTest === "ielts_g" || formData.secondLangTest === "pte_core") && (
                                  <>
                                    <option value="tef_canada">TEF Canada (French)</option>
                                    <option value="tcf_canada">TCF Canada (French)</option>
                                  </>
                                )}
                              </select>
                              
                              {/* Scroll indicator for first language scores */}
                              {formData.firstLangTest && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-2 flex items-center space-x-2 text-xs text-blue-600"
                                >
                                  <ChevronDown className="h-3 w-3 animate-bounce" />
                                  <span>Language scores below</span>
                                </motion.div>
                              )}
                              
                              <div className="mt-2 p-2 bg-blue-50 border-l-3 border-blue-400 rounded-r-md">
                                <div className="text-xs text-gray-700 space-y-2">
                                  <p>
                                    <span className="text-blue-500 font-medium">Official Languages:</span> English and French are Canada&apos;s official languages. Applicants are required to submit language test results that are less than two years old for all programs, regardless of whether English or French is their first language.
                                  </p>
                                  <p>
                                    <span className="text-blue-500 font-medium">Test Choice:</span> You may choose any language test and indicate the scores you have taken or anticipate taking.
                                  </p>
                                </div>
                              </div>
                            </div>

                                                        <div className="min-h-[120px]">
                              <AnimatePresence mode="wait">
                                {formData.firstLangTest && (
                                  <motion.div
                                    ref={firstLanguageScoresRef}
                                    key="first-language-scores"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <h4 className="text-sm font-semibold text-blue-700 mb-2">Language Scores</h4>
                                    <div className="grid grid-cols-2 gap-3 sm:gap-2">
                                      {["listening", "speaking", "reading", "writing"].map((skill, index) => (
                                        <motion.div 
                                          key={skill}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                          <label className="block text-xs font-medium text-[#2F2E2E] mb-1 capitalize">
                                            {skill} *
                                          </label>
                                          <select
                                            value={formData[`firstLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof CRSFormData]}
                                            onChange={(e) => updateFormData(`firstLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof CRSFormData, e.target.value)}
                                            className="w-full px-3 py-2 sm:py-1.5 text-sm sm:text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                          >
                                            {getLanguageScoreOptions(formData.firstLangTest, skill).map(option => (
                                              <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                          </select>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        {/* Second Language Section */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">2</span>
                            </div>
                            <h3 className="text-sm font-semibold text-green-800">Second Official Language</h3>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs font-medium text-[#2F2E2E] mb-1">
                                Which language test have you taken, or are you considering, for your second foreign language?
                              </label>
                              <select
                                value={formData.secondLangTest}
                                onChange={(e) => updateFormData("secondLangTest", e.target.value)}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                              >
                                <option value="">Select a language test</option>
                                <option value="none_or_not_applicable">None / Not Applicable</option>
                                {/* Show all tests if no first language is selected */}
                                {!formData.firstLangTest && (
                                  <>
                                    <option value="celpip_g">CELPIP-General (English)</option>
                                    <option value="ielts_g">IELTS General Training (English)</option>
                                    <option value="pte_core">PTE Core (English)</option>
                                    <option value="tef_canada">TEF Canada (French)</option>
                                    <option value="tcf_canada">TCF Canada (French)</option>
                                  </>
                                )}
                                {/* Show only French tests if English test is selected in first language */}
                                {(formData.firstLangTest === "celpip_g" || formData.firstLangTest === "ielts_g" || formData.firstLangTest === "pte_core") && (
                                  <>
                                    <option value="tef_canada">TEF Canada (French)</option>
                                    <option value="tcf_canada">TCF Canada (French)</option>
                                  </>
                                )}
                                {/* Show only English tests if French test is selected in first language */}
                                {(formData.firstLangTest === "tef_canada" || formData.firstLangTest === "tcf_canada") && (
                                  <>
                                    <option value="celpip_g">CELPIP-General (English)</option>
                                    <option value="ielts_g">IELTS General Training (English)</option>
                                    <option value="pte_core">PTE Core (English)</option>
                                  </>
                                )}
                              </select>
                              
                              {/* Scroll indicator for second language scores */}
                              {formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable" && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-2 flex items-center space-x-2 text-xs text-green-600"
                                >
                                  <ChevronDown className="h-3 w-3 animate-bounce" />
                                  <span>Language scores below</span>
                                </motion.div>
                              )}
                            </div>

                            <div className="min-h-[120px]">
                              <AnimatePresence mode="wait">
                                {formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable" && (
                                  <motion.div
                                    ref={secondLanguageScoresRef}
                                    key="second-language-scores"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                  <h4 className="text-sm font-semibold text-green-700 mb-2">Language Scores</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {["listening", "speaking", "reading", "writing"].map((skill, index) => (
                                      <motion.div 
                                        key={skill}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                      >
                                        <label className="block text-xs font-medium text-[#2F2E2E] mb-1 capitalize">
                                          {skill}
                                        </label>
                                        <select
                                          value={formData[`secondLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof CRSFormData]}
                                          onChange={(e) => updateFormData(`secondLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof CRSFormData, e.target.value)}
                                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        >
                                          {getLanguageScoreOptions(formData.secondLangTest, skill).map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                          ))}
                                        </select>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "work" && (
                    <motion.div
                      key="work"
                      data-section="work"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Work Experience</h2>
                      </div>

                      <div className="space-y-4 px-1">
                        {/* Canadian Work Experience */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            In the last ten years, how many years of paid skilled work experience have you gained in Canada? This work experience does not have to be related to your field of study, can be in different NOC codes and does not have to be continuous. (Please do not include self-employment or student work) *
                          </label>
                          <select
                            value={formData.canadianWorkExperience}
                            onChange={(e) => updateFormData("canadianWorkExperience", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select experience</option>
                            {workExperienceOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          <div className="mt-2 p-3 bg-purple-50 border-l-3 border-purple-400 rounded-r-md">
                            <div className="text-xs text-gray-700 space-y-2">
                              <div className="space-y-1">
                                <p><span className="text-purple-500 font-medium">Hours Calculation:</span></p>
                                <ul className="ml-4 space-y-1">
                                  <li>• Working thirty hours per week for 12 months equates to one year of full-time work, totaling 1,560 hours.</li>
                                  <li>• If you work fifteen hours per week for twenty-four months, it also corresponds to one year of full-time work, comprising 1,560 hours.</li>
                                  <li>• You have the flexibility to hold as many part-time jobs as necessary to fulfill this requirement.</li>
                                  <li>• If you work thirty hours per week for twelve months but across multiple jobs, it still amounts to one year of full-time employment, equaling 1,560 hours.</li>
                                  <li>• Any hours worked beyond thirty hours per week will not be considered towards meeting this requirement.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Foreign Work Experience */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            In the last 10 years, how many total years of foreign skilled work experience do you have?
                          </label>
                          <select
                            value={formData.foreignWorkExperience}
                            onChange={(e) => updateFormData("foreignWorkExperience", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select experience</option>
                            {workExperienceOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          <div className="mt-2 p-3 bg-purple-50 border-l-3 border-purple-400 rounded-r-md">
                            <div className="text-xs text-gray-700 space-y-2">

                              <p>
                                <span className="text-purple-500 font-medium">Eligibility Tip:</span> If you do not have one year or more of Canadian work experience, at least one year of your foreign work experience must be continuous and in the same NOC code.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "additional" && (
                    <motion.div
                      key="additional"
                      data-section="additional"
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Additional Factors</h2>
                      </div>

                      <div className="space-y-4 px-1">
                        {/* Sibling in Canada */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            Do you or your spouse or common-law partner (if they will accompany you to Canada) have at least one brother or sister living in Canada who is a citizen or permanent resident and who is at least 18 years old?
                          </label>
                          <select
                            value={formData.siblingInCanada}
                            onChange={(e) => updateFormData("siblingInCanada", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select option</option>
                            {yesNoOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Certificate of Qualification */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            Do you have a certificate of qualification from a Canadian province or territory?
                          </label>
                          <select
                            value={formData.certificateOfQualification}
                            onChange={(e) => updateFormData("certificateOfQualification", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select option</option>
                            {yesNoOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          <div className="mt-2 p-3 bg-orange-50 border-l-3 border-orange-400 rounded-r-md">
                            <div className="text-xs text-gray-700 space-y-2">
                              <p>
                                <span className="text-orange-500 font-medium">Definition:</span> A certificate of qualification shows that a person is qualified to work in a particular skilled trade in Canada. This means they passed a certification test and meet all the requirements to do their job in that province or territory.
                              </p>
                            </div>
                          </div>
                        </div>



                        {/* Provincial Nomination */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            Do you have a nomination certificate from a province or territory?
                          </label>
                          <select
                            value={formData.provincialNomination}
                            onChange={(e) => updateFormData("provincialNomination", e.target.value)}
                            className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-200 text-base"
                          >
                            <option value="">Select option</option>
                            {yesNoOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          <div className="mt-2 p-3 bg-orange-50 border-l-3 border-orange-400 rounded-r-md">
                            <p className="text-xs text-gray-700">
                              <span className="text-orange-500 font-medium">Note:</span> A provincial nomination certificate is issued by a Canadian province or territory through their Provincial Nominee Program (PNP). This gives you 600 additional points and virtually guarantees an invitation to apply.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                                     {activeSection === "spouseFactors" && isMarriedOrCommonLaw() && isSpouseMoving() && (
                     <motion.div
                       key="spouseFactors"
                       data-section="spouseFactors"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="space-y-3"
                     >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2E2E2E]">Spouse Factors</h2>
                      </div>

                      <div className="space-y-4 px-1">
                        {/* Spouse Education */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            What is the highest level of education for which your spouse or common-law partner has?
                          </label>
                          <select
                            value={formData.spouseEducationLevel}
                            onChange={(e) => updateFormData("spouseEducationLevel", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select education level</option>
                            {educationLevelOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          <div className="mt-2 p-3 bg-blue-50 border-l-3 border-blue-400 rounded-r-md">
                            <div className="text-xs text-gray-700 space-y-2">
                              <p>
                                <span className="text-blue-500 font-medium">Points Available:</span> Your spouse&apos;s education can earn you up to 10 additional CRS points. Higher education levels provide more points.
                              </p>
                              <p>
                                <span className="text-blue-500 font-medium">ECA Requirement:</span> To get points for your spouse&apos;s foreign credential, they must obtain an Educational Credential Assessment (ECA) report. This report must verify that their foreign credential is valid and equivalent to a Canadian credential.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Spouse Canadian Work Experience */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            In the last ten years, how many years of paid skilled work experience has your spouse or common-law partner gained in Canada? This work experience does not have to be related to their field of study, can be in different NOC codes and does not have to be continuous. (Please do not include self-employment or student work)
                          </label>
                          <select
                            value={formData.spouseCanadianWorkExperience}
                            onChange={(e) => updateFormData("spouseCanadianWorkExperience", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select experience</option>
                            {workExperienceOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          <div className="mt-2 p-3 bg-purple-50 border-l-3 border-purple-400 rounded-r-md">
                            <div className="text-xs text-gray-700 space-y-2">

                              <div className="space-y-1">
                                <p><span className="text-purple-500 font-medium">Hours Calculation:</span></p>
                                <ul className="ml-4 space-y-1">
                                  <li>• Working thirty hours per week for 12 months equates to one year of full-time work, totaling 1,560 hours.</li>
                                  <li>• If you work fifteen hours per week for twenty-four months, it also corresponds to one year of full-time work, comprising 1,560 hours.</li>
                                  <li>• You have the flexibility to hold as many part-time jobs as necessary to fulfill this requirement.</li>
                                  <li>• If you work thirty hours per week for twelve months but across multiple jobs, it still amounts to one year of full-time employment, equaling 1,560 hours.</li>
                                  <li>• Any hours worked beyond thirty hours per week will not be considered towards meeting this requirement.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Spouse Language Test */}
                        <div>
                          <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                            Which language test have your spouse or common-law partner taken, or planning to take? *
                          </label>
                          <select
                            value={formData.spouseLangTest}
                            onChange={(e) => updateFormData("spouseLangTest", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select language test</option>
                            {getSpouseLangTestOptions().map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          
                          {/* Scroll indicator for spouse language scores */}
                          {formData.spouseLangTest && formData.spouseLangTest !== "none_or_not_applicable" && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 flex items-center space-x-2 text-xs text-green-600"
                            >
                              <ChevronDown className="h-3 w-3 animate-bounce" />
                              <span>Language scores below</span>
                            </motion.div>
                          )}
                          
                          <div className="mt-2 p-3 bg-green-50 border-l-3 border-green-400 rounded-r-md">
                            <div className="text-xs text-gray-700 space-y-2">
                              <p>
                                <span className="text-green-500 font-medium">Official Languages:</span> English and French are Canada's official languages. Applicants are required to submit language test results that are less than two years old for all programs, regardless of whether English or French is their first language.
                              </p>
                              <p>
                                <span className="text-green-500 font-medium">Test Choice:</span> Your spouse may choose any language test and indicate the scores they have taken or anticipate taking.
                              </p>
                            </div>
                          </div>

                                                     <div className="min-h-[120px]">
                             <AnimatePresence mode="wait">
                               {formData.spouseLangTest && formData.spouseLangTest !== "none_or_not_applicable" && (
                                 <motion.div
                                   ref={spouseLanguageScoresRef}
                                   key="spouse-language-scores"
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -10 }}
                                   transition={{ duration: 0.3 }}
                                   className="mt-4"
                                 >
                                   <h4 className="text-sm font-semibold text-green-700 mb-3">Language Scores</h4>
                                   <div className="grid grid-cols-2 gap-3">
                                     {["listening", "speaking", "reading", "writing"].map((skill, index) => (
                                       <motion.div 
                                         key={skill}
                                         initial={{ opacity: 0, x: -10 }}
                                         animate={{ opacity: 1, x: 0 }}
                                         transition={{ duration: 0.3, delay: index * 0.05 }}
                                       >
                                         <label className="block text-sm font-medium text-[#2F2E2E] mb-1 capitalize">
                                           {skill}
                                         </label>
                                         <select
                                           value={formData[`spouseLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof CRSFormData] as string}
                                           onChange={(e) => updateFormData(`spouseLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof CRSFormData, e.target.value)}
                                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200"
                                           required
                                         >
                                           {getLanguageScoreOptions(formData.spouseLangTest, skill).map(option => (
                                             <option key={option.value} value={option.value}>{option.label}</option>
                                           ))}
                                         </select>
                                       </motion.div>
                                     ))}
                                   </div>
                                 </motion.div>
                               )}
                             </AnimatePresence>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Fallback for spouse sections when not married/common-law */}
                  {activeSection === "spouse" && !isMarriedOrCommonLaw() && (
                    <motion.div
                      key="spouse-fallback"
                      data-section="spouse"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2F2E2E]">Spouse Details</h2>
                      </div>
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">This section is only available for married or common-law applicants.</p>
                        <p className="text-sm text-gray-500">Please update your marital status to &quot;Married&quot; or &quot;Common-law&quot; to access spouse-related questions.</p>
                      </div>
                    </motion.div>
                  )}

                                     {activeSection === "spouseFactors" && (!isMarriedOrCommonLaw() || !isSpouseMoving()) && (
                     <motion.div
                       key="spouseFactors-fallback"
                       data-section="spouseFactors"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="space-y-4"
                     >
                       <div className="flex items-center space-x-3 mb-4">
                         <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                           <FileText className="h-4 w-4 text-white" />
                         </div>
                         <h2 className="text-xl font-bold text-[#2F2E2E]">Spouse Factors</h2>
                       </div>
                       <div className="text-center py-8">
                         {!isMarriedOrCommonLaw() ? (
                           <>
                             <p className="text-gray-600 mb-4">This section is only available for married or common-law applicants.</p>
                             <p className="text-sm text-gray-500">Please update your marital status to &quot;Married&quot; or &quot;Common-law&quot; to access spouse-related questions.</p>
                           </>
                         ) : (
                           <>
                             <p className="text-gray-600 mb-4">This section is only available when your spouse is moving to Canada.</p>
                             <p className="text-sm text-gray-500">Please update your spouse&apos;s moving status to &quot;Yes&quot; in the Spouse Details section.</p>
                           </>
                         )}
                       </div>
                     </motion.div>
                   )}
                </AnimatePresence>
                </div>

                {/* Navigation Buttons - Positioned at Bottom */}
                <div className="flex justify-between items-center mt-auto pt-4 sm:pt-6 border-t border-gray-200">
                  {/* Previous Button - Only show if not on first section */}
                  {activeSection !== "age" && (
                    <motion.button
                      onClick={() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection)
                        if (currentIndex > 0) {
                          setActiveSection(sections[currentIndex - 1].id)
                        }
                      }}
                      className="px-3 sm:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ← Previous
                    </motion.button>
                  )}
                  
                  {/* Invisible spacer when Previous button is hidden */}
                  {activeSection === "age" && <div className="w-20 sm:w-24"></div>}

                  {/* Next Button - Smart visibility logic */}
                  {(() => {
                    // Don't show Next button on Additional Factors if not married/common-law
                    if (activeSection === "additional" && !isMarriedOrCommonLaw()) {
                      return null
                    }
                    
                    // Don't show Next button on Spouse Factors (it's the last section when visible)
                    if (activeSection === "spouseFactors") {
                      return null
                    }
                    
                    // Don't show Next button on Additional Factors if married/common-law but spouse is NOT moving
                    if (activeSection === "additional" && isMarriedOrCommonLaw() && !isSpouseMoving()) {
                      return null
                    }
                    
                    // Show Next button for all other cases
                    return (
                      <motion.button
                        onClick={() => {
                          const currentIndex = sections.findIndex(s => s.id === activeSection)
                          if (currentIndex < sections.length - 1) {
                            setActiveSection(sections[currentIndex + 1].id)
                          }
                        }}
                        className="px-3 sm:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 bg-[#B92025] text-white hover:bg-red-700 hover:shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Next →
                      </motion.button>
                    )
                  })()}
                  
                  {/* Invisible spacer when Next button is hidden */}
                  {(() => {
                    if (activeSection === "additional" && !isMarriedOrCommonLaw()) return <div className="w-20 sm:w-24"></div>
                    if (activeSection === "spouseFactors") return <div className="w-20 sm:w-24"></div>
                    if (activeSection === "additional" && isMarriedOrCommonLaw() && !isSpouseMoving()) return <div className="w-24"></div>
                    return null
                  })()}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calculate Button - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 text-center"
          >
            {(() => {
              const progress = getFormProgress()
              const isFormComplete = progress.totalFields > 0 && progress.completedFields === progress.totalFields
              return (
                <>
                  <motion.button
                    onClick={calculateScore}
                    disabled={!isFormComplete}
                    className={`px-4 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 flex items-center space-x-2 sm:space-x-3 mx-auto ${
                      isFormComplete
                        ? "bg-gradient-to-r from-[#B92025] to-red-700 text-white hover:shadow-xl hover:scale-105 shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileHover={isFormComplete ? { scale: 1.05, y: -2 } : {}}
                    whileTap={isFormComplete ? { scale: 0.98 } : {}}
                  >
                    <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="whitespace-nowrap">Calculate My CRS Score</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>
                  
                  {!isFormComplete && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        opacity: { duration: 0.3 },
                        height: { duration: 0.4, ease: "easeInOut" }
                      }}
                      className="text-gray-600 mt-2 text-center overflow-hidden"
                    >
                      <div className="flex items-center justify-center space-x-2 text-xs mb-2">
                        <AlertCircle className="h-3 w-3 text-orange-500" />
                        <span>Please complete all form sections ({progress.completedFields}/{progress.totalFields} fields completed)</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        Form progress: {Math.round((progress.completedFields / progress.totalFields) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        <button
                          onClick={() => setShowMissingFieldsModal(true)}
                          className="inline-flex items-center space-x-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-amber-700 hover:text-amber-800 transition-all duration-200 font-medium text-xs"
                        >
                          <AlertCircle className="h-3 w-3" />
                          <span>View Missing Fields</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )
            })()}
          </motion.div>

          {/* Results Display */}
          {showResults && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#B92025] to-red-700 px-6 py-6 text-white text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your CRS Score Results</h2>
                  <p className="text-red-100 text-sm sm:text-base">Comprehensive Ranking System Score Breakdown</p>
                </div>

                {/* Total Score */}
                <div className="px-6 py-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-[#B92025] to-red-700 text-white shadow-2xl mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{crsScore}</div>
                      <div className="text-sm opacity-90">Points</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Total CRS Score</h3>
                  <p className="text-gray-600 text-sm">
                    {crsScore >= 600 ? "🎉 Excellent! You have a very competitive score." :
                     crsScore >= 500 ? "👍 Good! You have a competitive score." :
                     crsScore >= 400 ? "⚠️ Fair. Consider improving your profile." :
                     "📝 Below average. Focus on improving key areas."}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="px-6 py-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Score Breakdown</h4>
                    <button
                      onClick={() => {
                        console.log("Detailed breakdown button clicked");
                        console.log("Current showDetailedBreakdown state:", showDetailedBreakdown);
                        setShowDetailedBreakdown(true);
                        console.log("Setting showDetailedBreakdown to true");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Detailed Breakdown</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Core Human Capital */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-blue-800">Core Human Capital</h5>
                        <span className="text-2xl font-bold text-blue-600">{scoreBreakdown.core || 0}</span>
                      </div>
                      <div className="space-y-1 text-xs text-blue-700">
                        <div>Age: {scoreBreakdown.coreBreakdown?.age || 0}</div>
                        <div>Education: {scoreBreakdown.coreBreakdown?.education || 0}</div>
                        <div>Language: {scoreBreakdown.coreBreakdown?.firstLang || 0}</div>
                        <div>2nd Language: {scoreBreakdown.coreBreakdown?.secondLang || 0}</div>
                        <div>Work Exp: {scoreBreakdown.coreBreakdown?.canadianExp || 0}</div>
                      </div>
                    </div>

                    {/* Spouse Factors */}
                    <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-pink-800">Spouse Factors</h5>
                        <span className="text-2xl font-bold text-pink-600">{scoreBreakdown.spouse || 0}</span>
                      </div>
                      <div className="space-y-1 text-xs text-pink-700">
                        <div>Education: {scoreBreakdown.spouseBreakdown?.education || 0}</div>
                        <div>Work Exp: {scoreBreakdown.spouseBreakdown?.work || 0}</div>
                        <div>Language: {scoreBreakdown.spouseBreakdown?.language || 0}</div>
                      </div>
                    </div>

                    {/* Skill Transferability */}
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-green-800">Skill Transferability</h5>
                        <span className="text-2xl font-bold text-green-600">{scoreBreakdown.transfer || 0}</span>
                      </div>
                      <div className="space-y-1 text-xs text-green-700">
                                        <div>Edu+Lang: {scoreBreakdown.transferBreakdown?.eduLang || 0}</div>
                <div>Edu+Work: {scoreBreakdown.transferBreakdown?.eduCanExp || 0}</div>
                <div>Part 1 Total (capped at 50): {Math.min(50, (scoreBreakdown.transferBreakdown?.eduLang || 0) + (scoreBreakdown.transferBreakdown?.eduCanExp || 0))}</div>
                <div>Foreign+Lang: {scoreBreakdown.transferBreakdown?.foreignLang || 0}</div>
                <div>Foreign+Work: {scoreBreakdown.transferBreakdown?.foreignCanExp || 0}</div>
                <div>Part 2 Total (capped at 50): {Math.min(50, (scoreBreakdown.transferBreakdown?.foreignLang || 0) + (scoreBreakdown.transferBreakdown?.foreignCanExp || 0))}</div>
                <div>Cert+Lang: {scoreBreakdown.transferBreakdown?.certCombo || 0}</div>
                      </div>
                    </div>

                    {/* Additional Factors */}
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-purple-800">Additional Factors</h5>
                        <span className="text-2xl font-bold text-purple-600">{scoreBreakdown.additional || 0}</span>
                      </div>
                      <div className="space-y-1 text-xs text-purple-700">
                        <div>Canadian Edu: {scoreBreakdown.additionalBreakdown?.canadianEducation || 0}</div>
                        <div>Provincial Nom: {scoreBreakdown.additionalBreakdown?.nomination || 0}</div>
                        <div>Sibling: {scoreBreakdown.additionalBreakdown?.sibling || 0}</div>
                        <div>Certificate: {scoreBreakdown.additionalBreakdown?.certificateOfQualification || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowResults(false)}
                    className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-600 text-white hover:bg-gray-700 hover:shadow-md"
                  >
                    Hide Results
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false)
                      setFormData({
                        maritalStatus: "",
                        partnerStatus: "",
                        movingStatus: "",
                        age: "",
                        educationLevel: "",
                        canadianEducationStudy: "",
                        canadianCredentialLevel: "",
                        firstLangTest: "",
                        firstLangSpeaking: "",
                        firstLangListening: "",
                        firstLangReading: "",
                        firstLangWriting: "",
                        secondLangTest: "",
                        secondLangSpeaking: "",
                        secondLangListening: "",
                        secondLangReading: "",
                        secondLangWriting: "",
                        canadianWorkExperience: "",
                        foreignWorkExperience: "",
                        certificateOfQualification: "",
                        provincialNomination: "",
                        jobOffer: "",
                        nocJobOffer: "",
                        siblingInCanada: "",
                        spouseEducationLevel: "",
                        spouseCanadianWorkExperience: "",
                        spouseLangTest: "",
                        spouseLangSpeaking: "",
                        spouseLangListening: "",
                        spouseLangReading: "",
                        spouseLangWriting: ""
                      })
                      setActiveSection("age")
                    }}
                    className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 bg-[#B92025] text-white hover:bg-red-700 hover:shadow-md"
                  >
                    Calculate New Score
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Sticky Progress Bar - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-50"
      >
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-4">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Form Progress</h3>
              <span className="text-xs sm:text-sm text-gray-600">
                {(() => {
                  const progress = getFormProgress()
                  return `${progress.completedFields} / ${progress.totalFields} fields`
                })()}
              </span>
            </div>
            <div className="flex-1 max-w-md mx-0 sm:mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-[#B92025] to-red-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(() => {
                    const progress = getFormProgress()
                    return progress.totalFields > 0 ? (progress.completedFields / progress.totalFields) * 100 : 0
                  })()}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-right">
              {(() => {
                const progress = getFormProgress()
                return progress.totalFields > 0 ? Math.round((progress.completedFields / progress.totalFields) * 100) : 0
              })()}% Complete
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Detailed Score Breakdown Modal */}
      <AnimatePresence>
        {showDetailedBreakdown && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowDetailedBreakdown(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowDetailedBreakdown(false)
              }
            }}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-gray-200 relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
              initial={{ 
                opacity: 0, 
                scale: 0.9, 
                y: 50 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                y: 50 
              }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#B92025] via-red-600 to-red-700 px-8 py-6 text-white relative">
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Detailed CRS Score Breakdown</h2>
                    <p className="text-red-100 text-sm mt-1">Comprehensive point-by-point analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailedBreakdown(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1">
              {/* Score Summary Banner */}
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#B92025] to-red-600 text-white shadow-lg mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  >
                    <span className="text-3xl font-bold">{crsScore}</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Total CRS Score</h3>
                  <p className="text-gray-600">
                    {crsScore >= 600 ? "🎉 Excellent! You have a very competitive score." :
                     crsScore >= 500 ? "👍 Good! You have a competitive score." :
                     crsScore >= 400 ? "⚠️ Fair. Consider improving your profile." :
                     "📝 Below average. Focus on improving key areas."}
                  </p>
                </div>
              </motion.div>

                              <motion.div 
                className="grid grid-cols-1 xl:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Section A: Core Human Capital */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                      <h3 className="text-xl font-bold">Core Human Capital</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Age */}
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Age</p>
                            <p className="text-sm text-gray-600">Points based on your age</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{scoreBreakdown.coreBreakdown?.age || 0}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Education Level</p>
                            <p className="text-sm text-gray-600">Your highest education credential</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{scoreBreakdown.coreBreakdown?.education || 0}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>

                      {/* Canadian Work Experience */}
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Canadian Work Experience</p>
                            <p className="text-sm text-gray-600">Skilled work in Canada</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{scoreBreakdown.coreBreakdown?.canadianExp || 0}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>

                      {/* First Language */}
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Languages className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">First Official Language</p>
                              <p className="text-sm text-gray-600">Primary language proficiency</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{scoreBreakdown.coreBreakdown?.firstLang || 0}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Speaking:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.firstLang || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Listening:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.firstLang || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reading:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.firstLang || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Writing:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.firstLang || 0) / 4)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Second Language */}
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Globe className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Second Official Language</p>
                              <p className="text-sm text-gray-600">Secondary language proficiency</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{scoreBreakdown.coreBreakdown?.secondLang || 0}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Speaking:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.secondLang || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Listening:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.secondLang || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reading:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.secondLang || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Writing:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.coreBreakdown?.secondLang || 0) / 4)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section Total */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">Section A Total</span>
                          <span className="text-3xl font-bold">{scoreBreakdown.core || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section B: Spouse Factors */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-gradient-to-r from-pink-600 to-pink-700 px-6 py-4 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">B</span>
                      </div>
                      <h3 className="text-xl font-bold">Spouse Factors</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Spouse Education */}
                      <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl border border-pink-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-pink-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Spouse Education</p>
                            <p className="text-sm text-gray-600">Spouse&apos;s education level</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-pink-600">{scoreBreakdown.spouseBreakdown?.education || 0}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>

                      {/* Spouse Work Experience */}
                      <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl border border-pink-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-pink-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Spouse Work Experience</p>
                            <p className="text-sm text-gray-600">Spouse&apos;s Canadian work</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-pink-600">{scoreBreakdown.spouseBreakdown?.work || 0}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>

                      {/* Spouse Language */}
                      <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                              <Languages className="h-4 w-4 text-pink-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Spouse Language</p>
                              <p className="text-sm text-gray-600">Spouse&apos;s language skills</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-pink-600">{scoreBreakdown.spouseBreakdown?.language || 0}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Speaking:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.spouseBreakdown?.language || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Listening:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.spouseBreakdown?.language || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reading:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.spouseBreakdown?.language || 0) / 4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Writing:</span>
                            <span className="font-medium">{Math.floor((scoreBreakdown.spouseBreakdown?.language || 0) / 4)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section Total */}
                      <motion.div 
                        className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-4 rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">Section B Total</span>
                          <span className="text-3xl font-bold">{scoreBreakdown.spouse || 0}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Section C: Skill Transferability */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden xl:col-span-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">C</span>
                      </div>
                      <h3 className="text-xl font-bold">Skill Transferability</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 text-lg mb-4">Education & Language Combinations</h4>
                        
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">Education + Language</span>
                            <span className="text-xl font-bold text-green-600">{scoreBreakdown.transferBreakdown?.eduLang || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Combination of education level and language proficiency</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">Education + Canadian Work</span>
                            <span className="text-xl font-bold text-green-600">{scoreBreakdown.transferBreakdown?.eduCanExp || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Combination of education and Canadian work experience</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Subtotal (Max 50)</span>
                            <span className="text-2xl font-bold">{Math.min(50, (scoreBreakdown.transferBreakdown?.eduLang || 0) + (scoreBreakdown.transferBreakdown?.eduCanExp || 0))}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 text-lg mb-4">Work Experience Combinations</h4>
                        
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">Foreign Work + Language</span>
                            <span className="text-xl font-bold text-green-600">{scoreBreakdown.transferBreakdown?.foreignLang || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Combination of foreign work and language skills</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">Foreign + Canadian Work</span>
                            <span className="text-xl font-bold text-green-600">{scoreBreakdown.transferBreakdown?.foreignCanExp || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Combination of foreign and Canadian work experience</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Subtotal (Max 50)</span>
                            <span className="text-2xl font-bold">{Math.min(50, (scoreBreakdown.transferBreakdown?.foreignLang || 0) + (scoreBreakdown.transferBreakdown?.foreignCanExp || 0))}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certificate of Qualification */}
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">Certificate of Qualification</span>
                            <p className="text-sm text-gray-600">Additional points for trade certification</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{scoreBreakdown.transferBreakdown?.certCombo || 0}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    </div>

                    {/* Section Total */}
                    <motion.div 
                      className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.4, type: "spring" }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">Section C Total (Max 100)</span>
                        <span className="text-3xl font-bold">{scoreBreakdown.transfer || 0}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Section D: Additional Factors */}
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden xl:col-span-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">D</span>
                        </div>
                        <h3 className="text-xl font-bold">Additional Factors</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="font-medium text-gray-800">Sibling in Canada</span>
                            </div>
                            <span className="text-xl font-bold text-purple-600">{scoreBreakdown.additionalBreakdown?.sibling || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Brother or sister living in Canada</p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Languages className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="font-medium text-gray-800">French Language</span>
                            </div>
                            <span className="text-xl font-bold text-purple-600">{scoreBreakdown.additionalBreakdown?.frenchLanguage || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">French language proficiency bonus</p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <GraduationCap className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="font-medium text-gray-800">Canadian Education</span>
                            </div>
                            <span className="text-xl font-bold text-purple-600">{scoreBreakdown.additionalBreakdown?.canadianEducation || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Post-secondary education in Canada</p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Star className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="font-medium text-gray-800">Provincial Nomination</span>
                            </div>
                            <span className="text-xl font-bold text-purple-600">{scoreBreakdown.additionalBreakdown?.nomination || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600">Province/territory nomination certificate</p>
                        </div>
                      </div>
                    </div>

                    {/* Section Total */}
                    <motion.div 
                      className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0, duration: 0.4, type: "spring" }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">Section D Total</span>
                        <span className="text-3xl font-bold">{scoreBreakdown.additional || 0}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Final Score Summary */}
              <motion.div 
                className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Final CRS Score Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{scoreBreakdown.core || 0}</div>
                      <div className="text-sm text-gray-600">Core Human Capital</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600 mb-1">{scoreBreakdown.spouse || 0}</div>
                      <div className="text-sm text-gray-600">Spouse Factors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{scoreBreakdown.transfer || 0}</div>
                      <div className="text-sm text-gray-600">Skill Transferability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{scoreBreakdown.additional || 0}</div>
                      <div className="text-sm text-gray-600">Additional Factors</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-4xl font-bold text-[#B92025] mb-2">{crsScore}</div>
                    <div className="text-lg text-gray-600">Total Comprehensive Ranking System Score</div>
                  </div>
                </div>
              </motion.div>

              {/* Score Improvement Tips */}
              <motion.div 
                className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-800 mb-2">🚀 Score Improvement Tips</h3>
                  <p className="text-amber-700">Based on your current scores, here are ways to increase your CRS points:</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - High Impact Tips */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-amber-800 text-lg mb-3">High Impact Improvements</h4>
                    
                    {/* Language Improvement */}
                    {scoreBreakdown.coreBreakdown?.firstLang < 136 && (
                      <motion.div 
                        className="p-4 bg-amber-100 rounded-xl border border-amber-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0, duration: 0.4 }}
                        whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span className="font-medium text-amber-800">Improve First Language</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          Current: {scoreBreakdown.coreBreakdown?.firstLang || 0} points | Target: 136 points
                        </p>
                        <p className="text-xs text-amber-600">
                          • Study for IELTS/CELPIP to achieve CLB 9+ (Speaking 7+, Listening 8+, Reading 7+, Writing 7+)
                          • Focus on your weakest skill first
                          • Practice with official test materials
                        </p>
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          Potential gain: +{136 - (scoreBreakdown.coreBreakdown?.firstLang || 0)} points
                        </div>
                      </motion.div>
                    )}

                    {/* Second Language */}
                    {scoreBreakdown.coreBreakdown?.secondLang < 22 && (
                      <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span className="font-medium text-amber-800">Learn Second Language</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          Current: {scoreBreakdown.coreBreakdown?.secondLang || 0} points | Target: 22 points
                        </p>
                        <p className="text-xs text-amber-600">
                          • Study French to achieve CLB 5+ in all skills
                          • Take TEF Canada or TCF Canada
                          • Focus on basic conversational skills
                        </p>
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          Potential gain: +{22 - (scoreBreakdown.coreBreakdown?.secondLang || 0)} points
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {scoreBreakdown.coreBreakdown?.education < 150 && (
                      <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span className="font-medium text-amber-800">Higher Education</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          Current: {scoreBreakdown.coreBreakdown?.education || 0} points | Target: 150 points
                        </p>
                        <p className="text-xs text-amber-600">
                          • Pursue a Master&apos;s or PhD degree
                          • Get ECA for foreign credentials
                          • Consider Canadian education programs
                        </p>
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          Potential gain: +{150 - (scoreBreakdown.coreBreakdown?.education || 0)} points
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Medium Impact Tips */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-amber-800 text-lg mb-3">Medium Impact Improvements</h4>
                    
                    {/* Work Experience */}
                    {scoreBreakdown.coreBreakdown?.canadianExp < 80 && (
                      <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span className="font-medium text-amber-800">Canadian Work Experience</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          Current: {scoreBreakdown.coreBreakdown?.canadianExp || 0} points | Target: 80 points
                        </p>
                        <p className="text-xs text-amber-600">
                          • Work in Canada for 3+ years in skilled positions
                          • Ensure NOC code matches your skills
                          • Document all work experience properly
                        </p>
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          Potential gain: +{80 - (scoreBreakdown.coreBreakdown?.canadianExp || 0)} points
                        </div>
                      </div>
                    )}

                    {/* Provincial Nomination */}
                    {scoreBreakdown.additionalBreakdown?.nomination === 0 && (
                      <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span className="font-medium text-amber-800">Provincial Nomination</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          Current: 0 points | Target: 600 points
                        </p>
                        <p className="text-xs text-amber-600">
                          • Research PNP programs in your target province
                          • Check eligibility for Express Entry streams
                          • Build connections in your target province
                        </p>
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          Potential gain: +600 points (guaranteed invitation!)
                        </div>
                      </div>
                    )}

                    {/* Certificate of Qualification */}
                    {scoreBreakdown.transferBreakdown?.certCombo === 0 && (
                      <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span className="font-medium text-amber-800">Trade Certification</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          Current: 0 points | Target: 50 points
                        </p>
                        <p className="text-xs text-amber-600">
                          • Get certified in a skilled trade
                          • Research Red Seal trades
                          • Complete apprenticeship programs
                        </p>
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          Potential gain: +50 points
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <motion.div 
                  className="mt-6 p-4 bg-amber-200 rounded-xl border border-amber-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                >
                  <h4 className="font-semibold text-amber-800 text-lg mb-3">Quick Actions You Can Take Today</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-amber-800">
                      <div className="font-medium mb-1">📚 Study Resources</div>
                      <div className="text-xs text-amber-700">• Download IELTS/CELPIP practice apps</div>
                      <div className="text-xs text-amber-700">• Join language learning communities</div>
                    </div>
                    <div className="text-amber-800">
                      <div className="font-medium mb-1">💼 Career Planning</div>
                      <div className="text-xs text-amber-700">• Research in-demand NOC codes</div>
                      <div className="text-xs text-amber-700">• Network with Canadian professionals</div>
                    </div>
                    <div className="text-amber-800">
                      <div className="font-medium mb-1">🎯 Goal Setting</div>
                      <div className="text-xs text-amber-700">• Set 3-month improvement targets</div>
                      <div className="text-xs text-amber-700">• Track your progress monthly</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Modal Footer */}
            <motion.div 
              className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              <div className="text-sm text-gray-500">
                💡 This breakdown shows exactly how your CRS score is calculated
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Close button clicked')
                    setShowDetailedBreakdown(false)
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Back to Results button clicked')
                    setShowDetailedBreakdown(false)
                    // Scroll to top of results
                    setTimeout(() => {
                      if (resultsRef.current) {
                        resultsRef.current.scrollIntoView({ behavior: 'smooth' })
                      }
                    }, 100)
                  }}
                  className="px-6 py-3 bg-[#B92025] text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Back to Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Latest Draws Modal */}
      <DrawsModal 
        isOpen={showDrawsModal} 
        onClose={() => setShowDrawsModal(false)} 
      />

      {/* Missing Fields Modal */}
      <AnimatePresence>
        {showMissingFieldsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMissingFieldsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Missing Fields Summary</h3>
                      <p className="text-sm text-gray-600">Complete these fields to calculate your CRS score</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMissingFieldsModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 overflow-y-auto max-h-[60vh]">
                {(() => {
                  // Group missing fields by sections
                  const missingSections: Record<string, { title: string; icon: string; color: string; fields: string[]; sectionId: string }> = {
                    basic: {
                      title: "Basic Information",
                      icon: "👤",
                      color: "blue",
                      sectionId: "age",
                      fields: []
                    },
                    spouse: {
                      title: "Spouse Details",
                      icon: "💑",
                      color: "pink",
                      sectionId: "spouse",
                      fields: []
                    },
                    education: {
                      title: "Education",
                      icon: "🎓",
                      color: "green",
                      sectionId: "education",
                      fields: []
                    },
                    language: {
                      title: "Language Proficiency",
                      icon: "🗣️",
                      color: "purple",
                      sectionId: "language",
                      fields: []
                    },
                    work: {
                      title: "Work Experience",
                      icon: "💼",
                      color: "orange",
                      sectionId: "work",
                      fields: []
                    },
                    additional: {
                      title: "Additional Factors",
                      icon: "⭐",
                      color: "indigo",
                      sectionId: "additional",
                      fields: []
                    },
                    spouseFactors: {
                      title: "Spouse Factors",
                      icon: "📋",
                      color: "teal",
                      sectionId: "spouseFactors",
                      fields: []
                    }
                  };

                  // Check basic fields
                  if (!formData.age) missingSections.basic.fields.push("Age");
                  if (!formData.maritalStatus) missingSections.basic.fields.push("Marital Status");

                  // Check spouse details
                  if (isMarriedOrCommonLaw()) {
                    if (!formData.partnerStatus) missingSections.spouse.fields.push("Partner Status");
                    if (!formData.movingStatus) missingSections.spouse.fields.push("Moving Status");
                  }

                  // Check education
                  if (!formData.educationLevel) missingSections.education.fields.push("Education Level");
                  if (!formData.canadianEducationStudy) missingSections.education.fields.push("Canadian Education Question");
                  if (formData.canadianEducationStudy === "yes" && !formData.canadianCredentialLevel) {
                    missingSections.education.fields.push("Canadian Credential Level");
                  }

                  // Check language
                  if (!formData.firstLangTest) missingSections.language.fields.push("First Language Test");
                  if (!formData.firstLangSpeaking) missingSections.language.fields.push("First Language Speaking");
                  if (!formData.firstLangListening) missingSections.language.fields.push("First Language Listening");
                  if (!formData.firstLangReading) missingSections.language.fields.push("First Language Reading");
                  if (!formData.firstLangWriting) missingSections.language.fields.push("First Language Writing");
                  if (!formData.secondLangTest) missingSections.language.fields.push("Second Language Test");
                  
                  // Check second language scores if a test is selected
                  if (formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable") {
                    if (!formData.secondLangSpeaking) missingSections.language.fields.push("Second Language Speaking");
                    if (!formData.secondLangListening) missingSections.language.fields.push("Second Language Listening");
                    if (!formData.secondLangReading) missingSections.language.fields.push("Second Language Reading");
                    if (!formData.secondLangWriting) missingSections.language.fields.push("Second Language Writing");
                  }

                  // Check work experience
                  if (!formData.canadianWorkExperience) missingSections.work.fields.push("Canadian Work Experience");
                  if (!formData.foreignWorkExperience) missingSections.work.fields.push("Foreign Work Experience");

                  // Check additional factors
                  if (!formData.provincialNomination) missingSections.additional.fields.push("Provincial Nomination");
                  if (!formData.siblingInCanada) missingSections.additional.fields.push("Sibling in Canada");
                  if (!formData.certificateOfQualification) missingSections.additional.fields.push("Certificate of Qualification");

                  // Check spouse factors
                  if (isMarriedOrCommonLaw() && isSpouseMoving()) {
                    if (!formData.spouseEducationLevel) missingSections.spouseFactors.fields.push("Spouse Education Level");
                    if (!formData.spouseCanadianWorkExperience) missingSections.spouseFactors.fields.push("Spouse Canadian Work Experience");
                    if (!formData.spouseLangTest) missingSections.spouseFactors.fields.push("Spouse Language Test");
                    
                    if (formData.spouseLangTest && formData.spouseLangTest !== "none_or_not_applicable") {
                      if (!formData.spouseLangSpeaking) missingSections.spouseFactors.fields.push("Spouse Language Speaking");
                      if (!formData.spouseLangListening) missingSections.spouseFactors.fields.push("Spouse Language Listening");
                      if (!formData.spouseLangReading) missingSections.spouseFactors.fields.push("Spouse Language Reading");
                      if (!formData.spouseLangWriting) missingSections.spouseFactors.fields.push("Spouse Language Writing");
                    }
                  }

                  // Filter out sections with no missing fields
                  const sectionsWithMissingFields = Object.entries(missingSections).filter(([, section]) => section.fields.length > 0);

                  if (sectionsWithMissingFields.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <div className="text-green-500 text-4xl mb-4">✅</div>
                        <div className="text-green-700 font-bold text-xl mb-2">All Required Fields Completed!</div>
                        <div className="text-green-600 text-sm mb-4">You can now calculate your CRS score</div>
                        <button
                          onClick={() => {
                            setShowMissingFieldsModal(false)
                            calculateScore()
                          }}
                          className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-200"
                        >
                          Calculate My Score
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="text-orange-500 text-2xl mb-2">⚠️</div>
                        <div className="text-orange-700 font-bold text-lg mb-1">Missing Fields Found</div>
                        <div className="text-gray-600 text-sm">Click on any section below to automatically navigate to it and complete the missing fields</div>
                        <div className="text-amber-600 text-xs mt-2 font-medium">💡 Each section will be highlighted and centered in the form</div>
                      </div>
                      
                      {sectionsWithMissingFields.map(([sectionKey, section]) => (
                        <motion.div
                          key={sectionKey}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="p-4 rounded-xl border-2 border-gray-200 hover:border-amber-300 bg-gradient-to-r from-gray-50 to-white hover:from-amber-50 hover:to-orange-50 transition-all duration-200 cursor-pointer group"
                          onClick={() => {
                            setActiveSection(section.sectionId)
                            setShowMissingFieldsModal(false)
                            // Scroll to the specific section with better positioning
                            setTimeout(() => {
                              if (formContainerRef.current) {
                                const container = formContainerRef.current
                                const sectionElement = container.querySelector(`[data-section="${section.sectionId}"]`)
                                
                                if (sectionElement) {
                                  // Scroll to the section element with better positioning
                                  const containerRect = container.getBoundingClientRect()
                                  const elementRect = sectionElement.getBoundingClientRect()
                                  
                                  // Calculate scroll position to center the section in the viewport
                                  const sectionHeight = elementRect.height
                                  const containerHeight = containerRect.height
                                  const scrollTop = container.scrollTop + (elementRect.top - containerRect.top) - (containerHeight / 2) + (sectionHeight / 2)
                                  
                                  container.scrollTo({
                                    top: Math.max(0, scrollTop),
                                    behavior: 'smooth'
                                  })
                                  
                                  // Add a highlight effect to the section
                                  const htmlElement = sectionElement as HTMLElement
                                  htmlElement.style.transition = 'box-shadow 0.3s ease-in-out'
                                  htmlElement.style.boxShadow = '0 0 0 3px rgba(185, 32, 37, 0.3)'
                                  setTimeout(() => {
                                    htmlElement.style.boxShadow = ''
                                  }, 2000)
                                } else {
                                  // Fallback: scroll to form container
                                  container.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  })
                                }
                              }
                            }, 150)
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{section.icon}</span>
                              <div>
                                <h4 className="font-bold text-gray-800 text-lg group-hover:text-amber-800 transition-colors">
                                  {section.title}
                                </h4>
                                <div className="text-sm text-gray-600">
                                  <strong className="text-amber-600">{section.fields.length}</strong> field{section.fields.length === 1 ? '' : 's'} missing
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-amber-600 group-hover:text-amber-700 transition-colors">
                              <span className="text-sm font-medium">Navigate to {section.title}</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                              <strong>Missing:</strong> {section.fields.join(", ")}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    💡 Complete all fields to get your accurate CRS score
                  </div>
                  <button
                    onClick={() => setShowMissingFieldsModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
