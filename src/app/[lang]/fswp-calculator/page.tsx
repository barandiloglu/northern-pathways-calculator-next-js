"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calculator, 
  User, 
 
 
  Globe, 
  Heart, 
 
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

import { calculateFSWPScore, FSWPFormData } from "@/utils/calculateFSWPScore"
import { DrawsModal } from "@/components/draws-modal"

export default function FSWPCalculatorPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("language")
  const [showResults, setShowResults] = useState(false)
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false)
  const [showDrawsModal, setShowDrawsModal] = useState(false)
  const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false)
  const [fswpScore, setFswpScore] = useState<number>(0)
  const [scoreBreakdown, setScoreBreakdown] = useState<Record<string, unknown>>({})
  
  // Refs for auto-scrolling to conditional questions
  const firstLanguageScoresRef = useRef<HTMLDivElement | null>(null)
  const secondLanguageScoresRef = useRef<HTMLDivElement | null>(null)
  const spouseLanguageScoresRef = useRef<HTMLDivElement | null>(null)
  const formContainerRef = useRef<HTMLDivElement | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  
  const [formData, setFormData] = useState<FSWPFormData>({
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
    educationLevel: "",
    workExperience: "",
    age: "",
    jobOffer: "",
    canadianEducation: "",
    canadianWorkExperience: "",
    maritalStatus: "",
    spouseCitizen: "",
    spouseAccompanying: "",
    spouseWorkExperience: "",
    spouseCanadianEducation: "",
    spouseLanguageTest: "",
    spouseLanguageSpeaking: "",
    spouseLanguageListening: "",
    spouseLanguageReading: "",
    spouseLanguageWriting: "",
    relativesInCanada: "",
    adaptabilityFactors: []
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

  // Auto-scroll to newly appeared fields
  useEffect(() => {
    if (formData.firstLangTest && firstLanguageScoresRef.current) {
      setTimeout(() => {
        firstLanguageScoresRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        })
      }, 100)
    }
  }, [formData.firstLangTest])

  useEffect(() => {
    if (formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable" && secondLanguageScoresRef.current) {
      setTimeout(() => {
        secondLanguageScoresRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        })
      }, 100)
    }
  }, [formData.secondLangTest])

  useEffect(() => {
    if (formData.spouseLanguageTest && formData.spouseLanguageTest !== "none_or_not_applicable" && spouseLanguageScoresRef.current) {
      setTimeout(() => {
        spouseLanguageScoresRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        })
      }, 100)
    }
  }, [formData.spouseLanguageTest])

  // Auto-scroll when spouse section appears
  useEffect(() => {
    if ((formData.maritalStatus === "married" || formData.maritalStatus === "common_law") && formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        })
      }, 100)
    }
  }, [formData.maritalStatus])

  // Auto-scroll when spouse factors section appears
  useEffect(() => {
    if (formData.spouseAccompanying === "yes" && formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        })
      }, 100)
    }
  }, [formData.spouseAccompanying])

  // Show notification when new sections become available
  useEffect(() => {
    if (formData.maritalStatus === "married" || formData.maritalStatus === "common_law") {
      // You could add a toast notification here if you have a toast system
      console.log("New section available: Spouse Details")
    }
  }, [formData.maritalStatus])

  useEffect(() => {
    if (formData.spouseAccompanying === "yes") {
      // You could add a toast notification here if you have a toast system
      console.log("New section available: Spouse Factors")
    }
  }, [formData.spouseAccompanying])

  const getFormProgress = () => {
    let completedFields = 0
    let totalFields = 0

    // Language Skills (always required)
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
    if (formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable") {
      totalFields++
      if (formData.secondLangSpeaking !== "") completedFields++
      totalFields++
      if (formData.secondLangListening !== "") completedFields++
      totalFields++
      if (formData.secondLangReading !== "") completedFields++
      totalFields++
      if (formData.secondLangWriting !== "") completedFields++
    }

    // Education (always required)
    totalFields++
    if (formData.educationLevel !== "") completedFields++

    // Work Experience (always required)
    totalFields++
    if (formData.workExperience !== "") completedFields++

    // Age (always required)
    totalFields++
    if (formData.age !== "") completedFields++

    // Marital Status (always required)
    totalFields++
    if (formData.maritalStatus !== "") completedFields++

    // Spouse Details (only if married/common-law)
    if (formData.maritalStatus === "married" || formData.maritalStatus === "common_law") {
      totalFields++
      if (formData.spouseCitizen !== "") completedFields++
      if (formData.spouseCitizen === "no") {
        totalFields++
        if (formData.spouseAccompanying !== "") completedFields++
        if (formData.spouseAccompanying === "yes") {
          totalFields++
          if (formData.spouseWorkExperience !== "") completedFields++
          totalFields++
          if (formData.spouseCanadianEducation !== "") completedFields++
          totalFields++
          if (formData.spouseLanguageTest !== "") completedFields++
          if (formData.spouseLanguageTest && formData.spouseLanguageTest !== "none_or_not_applicable") {
            totalFields++
            if (formData.spouseLanguageSpeaking !== "") completedFields++
            totalFields++
            if (formData.spouseLanguageListening !== "") completedFields++
            totalFields++
            if (formData.spouseLanguageReading !== "") completedFields++
            totalFields++
            if (formData.spouseLanguageWriting !== "") completedFields++
          }
        }
      }
    }

    // Additional Factors (optional)
    totalFields++
    if (formData.jobOffer !== "") completedFields++
    totalFields++
    if (formData.canadianEducation !== "") completedFields++
    totalFields++
    if (formData.canadianWorkExperience !== "") completedFields++
    totalFields++
    if (formData.relativesInCanada !== "") completedFields++

    return { completedFields, totalFields }
  }

  const isFormValid = () => {
    // Check required fields
    if (!formData.firstLangTest || !formData.firstLangSpeaking || !formData.firstLangListening || 
        !formData.firstLangReading || !formData.firstLangWriting || !formData.educationLevel || 
        !formData.workExperience || !formData.age || !formData.maritalStatus) {
      return false
    }
    
    // Check second language scores if a test is selected (not "none_or_not_applicable")
    if (formData.secondLangTest && formData.secondLangTest !== "none_or_not_applicable") {
      if (!formData.secondLangSpeaking || !formData.secondLangListening || 
          !formData.secondLangReading || !formData.secondLangWriting) {
        return false
      }
    }
    
    // Check spouse details if married or common-law
    if (formData.maritalStatus === "married" || formData.maritalStatus === "common_law") {
      if (!formData.spouseCitizen) {
        return false
      }
      if (formData.spouseCitizen === "no" && !formData.spouseAccompanying) {
        return false
      }
      if (formData.spouseCitizen === "no" && formData.spouseAccompanying === "yes" && !formData.spouseWorkExperience) {
        return false
      }
    }
    
    return true
  }

  const isSectionComplete = (sectionId: string) => {
    switch (sectionId) {
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
      case "education":
        return formData.educationLevel !== ""
      case "work":
        return formData.workExperience !== ""
      case "age":
        return formData.age !== ""
      case "marital":
        return formData.maritalStatus !== ""
      case "spouse":
        if (formData.spouseCitizen === "") return false
        if (formData.spouseCitizen === "no" && formData.spouseAccompanying === "") return false
        // The spouse section is complete when basic spouse info is filled
        // Detailed spouse factors are handled in the spouseFactors section
        return true
      case "spouseFactors":
        // This section only appears when spouse is accompanying, so validate all required fields
        if (formData.spouseWorkExperience === "") return false
        if (formData.spouseCanadianEducation === "") return false
        if (formData.spouseLanguageTest === "") return false
        if (formData.spouseLanguageTest !== "none_or_not_applicable") {
          if (formData.spouseLanguageSpeaking === "" || 
              formData.spouseLanguageListening === "" || 
              formData.spouseLanguageReading === "" || 
              formData.spouseLanguageWriting === "") {
            return false
          }
        }
        return true
      case "additional":
        // Additional factors are optional, but if any are filled, they should be complete
        // Check if any additional factors have been started but not completed
        const hasStartedJobOffer = formData.jobOffer !== ""
        const hasStartedCanadianEducation = formData.canadianEducation !== ""
        const hasStartedCanadianWork = formData.canadianWorkExperience !== ""
        const hasStartedRelatives = formData.relativesInCanada !== ""
        
        // If any field has been started, all should be completed
        if (hasStartedJobOffer || hasStartedCanadianEducation || hasStartedCanadianWork || hasStartedRelatives) {
          if (formData.jobOffer === "" || formData.canadianEducation === "" || 
              formData.canadianWorkExperience === "" || formData.relativesInCanada === "") {
            return false
          }
          // All fields are filled, so section is complete
          return true
        }
        
        // No fields have been started, so section is not complete
        return false
      default:
        return false
    }
  }

  const updateFormData = (field: keyof FSWPFormData, value: string | string[]) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
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
      if (field === "spouseLanguageTest") {
        newData.spouseLanguageSpeaking = ""
        newData.spouseLanguageListening = ""
        newData.spouseLanguageReading = ""
        newData.spouseLanguageWriting = ""
      }
      
      // If marital status changes from married/common-law to something else, reset spouse fields
      if (field === "maritalStatus" && (value !== "married" && value !== "common_law")) {
        newData.spouseCitizen = ""
        newData.spouseAccompanying = ""
        newData.spouseWorkExperience = ""
        newData.spouseCanadianEducation = ""
        newData.spouseLanguageTest = ""
        newData.spouseLanguageSpeaking = ""
        newData.spouseLanguageListening = ""
        newData.spouseLanguageReading = ""
        newData.spouseLanguageWriting = ""
      }
      
      // If spouse is no longer accompanying, reset spouse factors fields
      if (field === "spouseAccompanying" && value !== "yes") {
        newData.spouseWorkExperience = ""
        newData.spouseCanadianEducation = ""
        newData.spouseLanguageTest = ""
        newData.spouseLanguageSpeaking = ""
        newData.spouseLanguageListening = ""
        newData.spouseLanguageReading = ""
        newData.spouseLanguageWriting = ""
      }
      
      return newData
    })

    // If marital status changes from married/common-law to something else, navigate away from spouse section
    if (field === "maritalStatus" && (value !== "married" && value !== "common_law") && activeSection === "spouse") {
      setActiveSection("marital")
    }
    
    // If spouse is no longer accompanying, navigate away from spouse factors section
    if (field === "spouseAccompanying" && value !== "yes" && activeSection === "spouseFactors") {
      setActiveSection("spouse")
    }
  }

  const calculateScore = () => {
    const { total, breakdown } = calculateFSWPScore(formData)
    setFswpScore(total)
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

  const sections = useMemo(() => [
    { id: "language", title: "Language Skills", icon: Languages, color: "blue", emoji: "🗣️" },
    { id: "education", title: "Education", icon: GraduationCap, color: "green", emoji: "🎓" },
    { id: "work", title: "Work Experience", icon: Building2, color: "purple", emoji: "💼" },
    { id: "age", title: "Age", icon: User, color: "orange", emoji: "👤" },
    { id: "marital", title: "Marital Status", icon: Heart, color: "pink", emoji: "💕" },
    ...(formData.maritalStatus === "married" || formData.maritalStatus === "common_law" ? [{ id: "spouse", title: "Spouse Details", icon: Heart, color: "pink", emoji: "❤️" }] : []),
    ...(formData.maritalStatus === "married" || formData.maritalStatus === "common_law") && formData.spouseCitizen === "no" && formData.spouseAccompanying === "yes" ? [{ id: "spouseFactors", title: "Spouse Factors", icon: FileText, color: "teal", emoji: "📋" }] : [],
    { id: "additional", title: "Additional Factors", icon: Plus, color: "indigo", emoji: "⭐" }
  ], [formData.maritalStatus, formData.spouseCitizen, formData.spouseAccompanying])

  const getSectionStyles = (sectionId: string, isActive: boolean) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg border-2 border-red-500"
    
    // Special highlighting for spouse sections
    const isSpouseSection = sectionId === "spouse" || sectionId === "spouseFactors"
    const highlightClass = isSpouseSection ? "ring-2 ring-pink-400 ring-opacity-75 shadow-pink-200 shadow-lg" : ""
    
    if (!isActive) {
      const baseInactive = "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent"
      return isSpouseSection ? `${baseInactive} ${highlightClass}` : baseInactive
    }
    
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
    
    const baseActive = colorMap[section.color] || colorMap.red
    return isSpouseSection ? `${baseActive} ${highlightClass}` : baseActive
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
                FSWP Score Calculator
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm sm:text-base text-[#2F2E2E] max-w-2xl mx-auto leading-relaxed px-2 mb-4"
          >
                Calculate your Federal Skilled Worker Program (FSWP) points and see if you meet the minimum requirements for Canadian immigration.
            Complete each section to get your personalized FSWP score.
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
                        {(section as any).isNew && (
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
                          {(section as any).isNew && (
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

                        {/* Warning Message */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-xs font-semibold text-red-800 mb-0.5">Important Notice</h4>
                              <p className="text-xs text-red-700">
                                <strong>Warning: Below CLB 7 - Not eligible to apply</strong>
                              </p>
                            </div>
                          </div>
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
                                  <option value="">Select language test</option>
                                  {/* Show all tests if no second language is selected or if "none or not applicable" is selected */}
                                  {(!formData.secondLangTest || formData.secondLangTest === "none_or_not_applicable") && (
                                    <>
                                      <option value="celpip">CELPIP-G</option>
                                      <option value="ielts">IELTS</option>
                                      <option value="pte">PTE Core</option>
                                      <option value="tef">TEF Canada</option>
                                      <option value="tcf">TCF Canada</option>
                                    </>
                                  )}
                                  {/* Show only English tests if French test is selected in second language */}
                                  {(formData.secondLangTest === "tef" || formData.secondLangTest === "tcf") && (
                                    <>
                                      <option value="celpip">CELPIP-G</option>
                                      <option value="ielts">IELTS</option>
                                      <option value="pte">PTE Core</option>
                                    </>
                                  )}
                                  {/* Show only French tests if English test is selected in second language */}
                                  {(formData.secondLangTest === "celpip" || formData.secondLangTest === "ielts" || formData.secondLangTest === "pte") && (
                                    <>
                                      <option value="tef">TEF Canada</option>
                                      <option value="tcf">TCF Canada</option>
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
                                      key="first-language-scores"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.3 }}
                                      ref={firstLanguageScoresRef}
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
                                              value={formData[`firstLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof FSWPFormData] as string}
                                              onChange={(e) => updateFormData(`firstLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof FSWPFormData, e.target.value)}
                                              className="w-full px-3 py-2 sm:py-1.5 text-sm sm:text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                              required
                                            >
                                              <option value="">Select score</option>
                                                                                     {formData.firstLangTest === "celpip" && (
                                         <>
                                           <option value="10-12">10-12 (CLB 10)</option>
                                           <option value="9">9 (CLB 9)</option>
                                           <option value="8">8 (CLB 8)</option>
                                           <option value="7">7 (CLB 7)</option>
                                         </>
                                       )}
                                                                                     {formData.firstLangTest === "ielts" && (
                                         <>
                                           {skill === "speaking" && (
                                             <>
                                               <option value="7.5-9.0">7.5-9.0 (CLB 10)</option>
                                               <option value="7.0">7.0 (CLB 9)</option>
                                               <option value="6.5">6.5 (CLB 8)</option>
                                               <option value="6.0">6.0 (CLB 7)</option>
                                             </>
                                           )}
                                           {skill === "listening" && (
                                             <>
                                               <option value="8.5-9.0">8.5-9.0 (CLB 10)</option>
                                               <option value="8.0">8.0 (CLB 9)</option>
                                               <option value="7.5">7.5 (CLB 8)</option>
                                               <option value="6.0-7.0">6.0-7.0 (CLB 7)</option>
                                             </>
                                           )}
                                           {skill === "reading" && (
                                             <>
                                               <option value="8.0-9.0">8.0-9.0 (CLB 10)</option>
                                               <option value="7.0-7.5">7.0-7.5 (CLB 9)</option>
                                               <option value="6.5">6.5 (CLB 8)</option>
                                               <option value="6.0">6.0 (CLB 7)</option>
                                             </>
                                           )}
                                           {skill === "writing" && (
                                             <>
                                               <option value="7.5-9.0">7.5-9.0 (CLB 10)</option>
                                               <option value="7.0">7.0 (CLB 9)</option>
                                               <option value="6.5">6.5 (CLB 8)</option>
                                               <option value="6.0">6.0 (CLB 7)</option>
                                             </>
                                           )}
                                         </>
                                       )}
                                                                                     {formData.firstLangTest === "pte" && (
                                         <>
                                           {skill === "speaking" && (
                                             <>
                                               <option value="89+">89+ (CLB 10)</option>
                                               <option value="84-88">84-88 (CLB 9)</option>
                                               <option value="76-83">76-83 (CLB 8)</option>
                                               <option value="68-75">68-75 (CLB 7)</option>
                                             </>
                                           )}
                                           {skill === "listening" && (
                                             <>
                                               <option value="89+">89+ (CLB 10)</option>
                                               <option value="82-88">82-88 (CLB 9)</option>
                                               <option value="71-81">71-81 (CLB 8)</option>
                                               <option value="60-70">60-70 (CLB 7)</option>
                                             </>
                                           )}
                                           {skill === "reading" && (
                                             <>
                                               <option value="88+">88+ (CLB 10)</option>
                                               <option value="78-87">78-87 (CLB 9)</option>
                                               <option value="69-77">69-77 (CLB 8)</option>
                                               <option value="60-68">60-68 (CLB 7)</option>
                                             </>
                                           )}
                                           {skill === "writing" && (
                                             <>
                                               <option value="90">90 (CLB 10)</option>
                                               <option value="88-89">88-89 (CLB 9)</option>
                                               <option value="79-87">79-87 (CLB 8)</option>
                                               <option value="69-78">69-78 (CLB 7)</option>
                                             </>
                                           )}
                                         </>
                                       )}
                                                                                     {formData.firstLangTest === "tef" && (
                                         <>
                                           {skill === "speaking" && (
                                             <>
                                               <option value="556-699">556-699</option>
                                               <option value="518-555">518-555</option>
                                               <option value="494-517">494-517</option>
                                               <option value="456-493">456-493</option>
                                             </>
                                           )}
                                           {skill === "listening" && (
                                             <>
                                               <option value="546-699">546-699</option>
                                               <option value="503-545">503-545</option>
                                               <option value="462-502">462-502</option>
                                               <option value="434-461">434-461</option>
                                             </>
                                           )}
                                           {skill === "reading" && (
                                             <>
                                               <option value="546-699">546-699</option>
                                               <option value="503-545">503-545</option>
                                               <option value="462-502">462-502</option>
                                               <option value="434-461">434-461</option>
                                             </>
                                           )}
                                           {skill === "writing" && (
                                             <>
                                               <option value="558-699">558-699</option>
                                               <option value="512-557">512-557</option>
                                               <option value="472-511">472-511</option>
                                               <option value="428-471">428-471</option>
                                             </>
                                           )}
                                         </>
                                       )}
                                                                                     {formData.firstLangTest === "tcf" && (
                                         <>
                                           {skill === "speaking" && (
                                             <>
                                               <option value="16-20">16-20</option>
                                               <option value="14-15">14-15</option>
                                               <option value="12-13">12-13</option>
                                               <option value="10-11">10-11</option>
                                             </>
                                           )}
                                           {skill === "listening" && (
                                             <>
                                               <option value="549-699">549-699</option>
                                               <option value="523-548">523-548</option>
                                               <option value="503-522">503-522</option>
                                               <option value="458-502">458-502</option>
                                             </>
                                           )}
                                           {skill === "reading" && (
                                             <>
                                               <option value="549-699">549-699</option>
                                               <option value="524-548">524-548</option>
                                               <option value="499-523">499-523</option>
                                               <option value="453-498">453-498</option>
                                             </>
                                           )}
                                           {skill === "writing" && (
                                             <>
                                               <option value="16-20">16-20</option>
                                               <option value="14-15">14-15</option>
                                               <option value="12-13">12-13</option>
                                               <option value="10-11">10-11</option>
                                             </>
                                           )}
                                         </>
                                       )}
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
                                  <option value="">Select language test</option>
                                  <option value="none_or_not_applicable">None or not applicable</option>
                                  {/* Show all tests if no first language is selected */}
                                  {!formData.firstLangTest && (
                                    <>
                                      <option value="celpip">CELPIP-G</option>
                                      <option value="ielts">IELTS</option>
                                      <option value="pte">PTE Core</option>
                                      <option value="tef">TEF Canada</option>
                                      <option value="tcf">TCF Canada</option>
                                    </>
                                  )}
                                  {/* Show only French tests if English test is selected in first language */}
                                  {(formData.firstLangTest === "celpip" || formData.firstLangTest === "ielts" || formData.firstLangTest === "pte") && (
                                    <>
                                      <option value="tef">TEF Canada</option>
                                      <option value="tcf">TCF Canada</option>
                                    </>
                                  )}
                                  {/* Show only English tests if French test is selected in first language */}
                                  {(formData.firstLangTest === "tef" || formData.firstLangTest === "tcf") && (
                                    <>
                                      <option value="celpip">CELPIP-G</option>
                                      <option value="ielts">IELTS</option>
                                      <option value="pte">PTE Core</option>
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
                                      key="second-language-scores"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.3 }}
                                      ref={secondLanguageScoresRef}
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
                                            value={formData[`secondLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof FSWPFormData] as string}
                                            onChange={(e) => updateFormData(`secondLang${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof FSWPFormData, e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                          >
                                            <option value="">Select score</option>
                                                                                    {formData.secondLangTest === "celpip" && (
                                          <>
                                            <option value="10-12">10-12 (CLB 10)</option>
                                            <option value="9">9 (CLB 9)</option>
                                            <option value="8">8 (CLB 8)</option>
                                            <option value="7">7 (CLB 7)</option>
                                          </>
                                        )}
                                                                                    {formData.secondLangTest === "ielts" && (
                                          <>
                                            {skill === "speaking" && (
                                              <>
                                                <option value="7.5-9.0">7.5-9.0 (CLB 10)</option>
                                                <option value="7.0">7.0 (CLB 9)</option>
                                                <option value="6.5">6.5 (CLB 8)</option>
                                                <option value="6.0">6.0 (CLB 7)</option>
                                              </>
                                            )}
                                            {skill === "listening" && (
                                              <>
                                                <option value="8.5-9.0">8.5-9.0 (CLB 10)</option>
                                                <option value="8.0">8.0 (CLB 9)</option>
                                                <option value="7.5">7.5 (CLB 8)</option>
                                                <option value="6.0-7.0">6.0-7.0 (CLB 7)</option>
                                              </>
                                            )}
                                            {skill === "reading" && (
                                              <>
                                                <option value="8.0-9.0">8.0-9.0 (CLB 10)</option>
                                                <option value="7.0-7.5">7.0-7.5 (CLB 9)</option>
                                                <option value="6.5">6.5 (CLB 8)</option>
                                                <option value="6.0">6.0 (CLB 7)</option>
                                              </>
                                            )}
                                            {skill === "writing" && (
                                              <>
                                                <option value="7.5-9.0">7.5-9.0 (CLB 10)</option>
                                                <option value="7.0">7.0 (CLB 9)</option>
                                                <option value="6.5">6.5 (CLB 8)</option>
                                                <option value="6.0">6.0 (CLB 7)</option>
                                              </>
                                            )}
                                          </>
                                        )}
                                                                                    {formData.secondLangTest === "pte" && (
                                          <>
                                            {skill === "speaking" && (
                                              <>
                                                <option value="89+">89+ (CLB 10)</option>
                                                <option value="84-88">84-88 (CLB 9)</option>
                                                <option value="76-83">76-83 (CLB 8)</option>
                                                <option value="68-75">68-75 (CLB 7)</option>
                                              </>
                                            )}
                                            {skill === "listening" && (
                                              <>
                                                <option value="89+">89+ (CLB 10)</option>
                                                <option value="82-88">82-88 (CLB 9)</option>
                                                <option value="71-81">71-81 (CLB 8)</option>
                                                <option value="60-70">60-70 (CLB 7)</option>
                                              </>
                                            )}
                                            {skill === "reading" && (
                                              <>
                                                <option value="88+">88+ (CLB 10)</option>
                                                <option value="78-87">78-87 (CLB 9)</option>
                                                <option value="69-77">69-77 (CLB 8)</option>
                                                <option value="60-68">60-68 (CLB 7)</option>
                                              </>
                                            )}
                                            {skill === "writing" && (
                                              <>
                                                <option value="90">90 (CLB 10)</option>
                                                <option value="88-89">88-89 (CLB 9)</option>
                                                <option value="79-87">79-87 (CLB 8)</option>
                                                <option value="69-78">69-78 (CLB 7)</option>
                                              </>
                                            )}
                                          </>
                                        )}
                                        {formData.secondLangTest === "tef" && (
                                          <>
                                            {skill === "speaking" && (
                                              <>
                                                <option value="556-699">556-699</option>
                                                <option value="518-555">518-555</option>
                                                <option value="494-517">494-517</option>
                                                <option value="456-493">456-493</option>
                                              </>
                                            )}
                                            {skill === "listening" && (
                                              <>
                                                <option value="546-699">546-699</option>
                                                <option value="503-545">503-545</option>
                                                <option value="462-502">462-502</option>
                                                <option value="434-461">434-461</option>
                                              </>
                                            )}
                                            {skill === "reading" && (
                                              <>
                                                <option value="546-699">546-699</option>
                                                <option value="503-545">503-545</option>
                                                <option value="462-502">462-502</option>
                                                <option value="434-461">434-461</option>
                                              </>
                                            )}
                                            {skill === "writing" && (
                                              <>
                                                <option value="558-699">558-699</option>
                                                <option value="512-557">512-557</option>
                                                <option value="472-511">472-511</option>
                                                <option value="428-471">428-471</option>
                                              </>
                                            )}
                                          </>
                                        )}
                                        {formData.secondLangTest === "tcf" && (
                                          <>
                                            {skill === "speaking" && (
                                              <>
                                                <option value="16-20">16-20</option>
                                                <option value="14-15">14-15</option>
                                                <option value="12-13">12-13</option>
                                                <option value="10-11">10-11</option>
                                              </>
                                            )}
                                            {skill === "listening" && (
                                              <>
                                                <option value="549-699">549-699</option>
                                                <option value="523-548">523-548</option>
                                                <option value="503-522">503-522</option>
                                                <option value="458-502">458-502</option>
                                              </>
                                            )}
                                            {skill === "reading" && (
                                              <>
                                                <option value="549-699">549-699</option>
                                                <option value="524-548">524-548</option>
                                                <option value="499-523">499-523</option>
                                                <option value="453-498">453-498</option>
                                              </>
                                            )}
                                            {skill === "writing" && (
                                              <>
                                                <option value="16-20">16-20</option>
                                                <option value="14-15">14-15</option>
                                                <option value="12-13">12-13</option>
                                                <option value="10-11">10-11</option>
                                              </>
                                            )}
                                          </>
                                        )}
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

                    {activeSection === "education" && (
                      <motion.div
                        key="education"
                        data-section="education"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-white" />
                          </div>
                          <h2 className="text-xl font-bold text-[#2F2E2E]">Education</h2>
            </div>

                        <div className="grid grid-cols-1 gap-4 px-1">
                <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              What is your level of education? *
                  </label>
                  <select
                    value={formData.educationLevel}
                              onChange={(e) => updateFormData("educationLevel", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200 text-base"
                  >
                    <option value="">Select education level</option>
                              <option value="high_school">High school</option>
                              <option value="one_year_program">One-year program at a university, college, trade or technical school, or other institute</option>
                              <option value="two_year_program">Two-year program at a university, college, trade or technical school, or other institute</option>
                              <option value="bachelor">Bachelor&apos;s degree / Three or more year program at a university, college, trade or other institute</option>
                              <option value="two_or_more_certificates">Two or more certificates, diplomas or degrees. One must be for a program of three or more years</option>
                              <option value="masters">Master&apos;s degree, or professional degree needed to practice in a licensed profession</option>
                              <option value="doctoral">Doctoral level university degree (PhD)</option>
                  </select>
                  
                  {/* ECA Information */}
                  <div className="mt-4 p-3 sm:p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <ul className="text-sm text-gray-700 space-y-2 sm:space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 sm:mr-3 text-base sm:text-lg">•</span>
                        <span className="text-xs sm:text-sm">To get points for your foreign credential, you must obtain an Educational Credential Assessment (ECA) report. This report must verify that your foreign credential is valid and equivalent to a Canadian credential.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 sm:mr-3 text-base sm:text-lg">•</span>
                        <span className="text-xs sm:text-sm">If you completed your studies at a private DLI (designated learning institution) in Canada and the program does not qualify for a post-graduation work permit, it is not considered &apos;Canadian education&apos; for the purpose of earning additional points for Canadian education. However, your education may still be eligible for education points.</span>
                      </li>
                    </ul>
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
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          <h2 className="text-xl font-bold text-[#2F2E2E]">Work Experience</h2>
            </div>

                        <div className="grid grid-cols-1 gap-4 px-1">
                <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Work Experience *
                  </label>
                  <select
                    value={formData.workExperience}
                              onChange={(e) => updateFormData("workExperience", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 text-base"
                  >
                    <option value="">Select work experience</option>
                    <option value="1_year">1 year</option>
                    <option value="2-3_years">2-3 years</option>
                    <option value="4-5_years">4-5 years</option>
                    <option value="6_years_or_more">6 years or more</option>
                  </select>
                  
                  {/* Work Experience Information */}
                  <div className="mt-4 p-3 sm:p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <div className="text-sm text-gray-700 space-y-3">
                      <p>
                        You can get points based on the duration of your full-time paid work experience (at least 30 hours per week, or the equivalent amount of part-time work [e.g. 15 hours per week for 24 months]) in a skilled occupation listed under Training, Education, Experience, and Responsibilities (TEER) categories 0, 1, 2, or 3 of the 2021 National Occupational Classification (NOC).
                      </p>
                      <p>To get selection factor points, your work experience can be:</p>
                      <ul className="ml-4 space-y-1">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 text-sm">•</span>
                          <span>Either in Canada or abroad.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 text-sm">•</span>
                          <span>Gained while you were studying.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 text-sm">•</span>
                          <span>Obtained while being self-employed.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <h2 className="text-xl font-bold text-[#2F2E2E]">Age</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 px-1">
                <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              How old are you? *
                  </label>
                  <select
                    value={formData.age}
                              onChange={(e) => updateFormData("age", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select age range</option>
                              <option value="17_less">17 years of age or less</option>
                              <option value="18-35">18-35 years of age</option>
                              <option value="36">36 years of age</option>
                              <option value="37">37 years of age</option>
                              <option value="38">38 years of age</option>
                              <option value="39">39 years of age</option>
                              <option value="40">40 years of age</option>
                              <option value="41">41 years of age</option>
                              <option value="42">42 years of age</option>
                              <option value="43">43 years of age</option>
                              <option value="44">44 years of age</option>
                              <option value="45">45 years of age</option>
                              <option value="46">46 years of age</option>
                              <option value="47_more">47 years of age or more</option>
                  </select>
                </div>
            </div>
          </motion.div>
                    )}

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
                          <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                            <Heart className="h-4 w-4 text-white" />
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
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select marital status</option>
                              <option value="single">Single</option>
                              <option value="married">Married</option>
                              <option value="common_law">Common-law</option>
                              <option value="divorced_separated">Divorced/Separated</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSection === "spouse" && (
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
                              value={formData.spouseCitizen}
                              onChange={(e) => updateFormData("spouseCitizen", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
                            
                            {/* Scroll indicator for spouse accompanying question */}
                            {formData.spouseCitizen === "no" && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 flex items-center space-x-2 text-xs text-pink-600"
                              >
                                <ChevronDown className="h-3 w-3 animate-bounce" />
                                <span>Additional question below</span>
                              </motion.div>
                            )}
                          </div>

                                                        {formData.spouseCitizen === "no" && (
                                <div>
                                  <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                                    Will your spouse or common-law partner come with you to Canada?
                                  </label>
                                  <select
                                    value={formData.spouseAccompanying}
                                    onChange={(e) => updateFormData("spouseAccompanying", e.target.value)}
                                    className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all duration-200 text-base"
                                  >
                                    <option value="">Select option</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                  </select>
                                  
                                  {/* Scroll indicator for spouse factors section */}
                                  {formData.spouseAccompanying === "yes" && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="mt-2 flex items-center space-x-2 text-xs text-pink-600"
                                    >
                                      <ChevronDown className="h-3 w-3 animate-bounce" />
                                      <span>Spouse factors section available</span>
                                    </motion.div>
                                  )}
                                </div>
                              )}
                        </div>
                      </motion.div>
                    )}

                    {activeSection === "spouseFactors" && (
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
                          <h2 className="text-xl font-bold text-[#2F2E2E]">Spouse Factors</h2>
                        </div>

                        <div className="space-y-4 px-1">
                          {/* Spouse Canadian Work Experience */}
                          <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              In the last ten years, how many years of skilled work experience in Canada does your spouse/common-law partner have?
                            </label>
                            <select
                              value={formData.spouseWorkExperience}
                              onChange={(e) => updateFormData("spouseWorkExperience", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="none_or_less_than_year">None or less than a year</option>
                              <option value="1_year_or_more">1 year or more</option>
                            </select>
                          </div>

                          {/* Spouse Canadian Education */}
                          <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Has your spouse or your partner completed at least 2 academic years of full-time study (in a minimum 2-year program) in Canada?
                            </label>
                            <select
                              value={formData.spouseCanadianEducation}
                              onChange={(e) => updateFormData("spouseCanadianEducation", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
                          </div>

                          {/* Spouse Language Test */}
                          <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Which language test have your spouse or common-law partner taken, or planning to take?
                            </label>
                            <select
                              value={formData.spouseLanguageTest}
                              onChange={(e) => updateFormData("spouseLanguageTest", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select language test</option>
                              <option value="celpip_g">CELPIP-G</option>
                              <option value="ielts_g">IELTS</option>
                              <option value="pte_core">PTE Core</option>
                              <option value="tef_canada">TEF Canada</option>
                              <option value="tcf_canada">TCF Canada</option>
                              <option value="none_or_not_applicable">None or not applicable</option>
                            </select>

                            {/* Scroll indicator for spouse language scores */}
                            {formData.spouseLanguageTest && formData.spouseLanguageTest !== "none_or_not_applicable" && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 flex items-center space-x-2 text-xs text-teal-600"
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

                            <div className="min-h-[120px]">
                              <AnimatePresence mode="wait">
                                {formData.spouseLanguageTest && formData.spouseLanguageTest !== "none_or_not_applicable" && (
                                  <motion.div
                                    key="spouse-language-scores"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    ref={spouseLanguageScoresRef}
                                    className="mt-4"
                                  >
                                    <h4 className="text-sm font-semibold text-teal-700 mb-3">Language Scores</h4>
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
                                            value={formData[`spouseLanguage${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof FSWPFormData] as string}
                                            onChange={(e) => updateFormData(`spouseLanguage${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof FSWPFormData, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                                          >
                                            <option value="">Select score</option>
                                            {formData.spouseLanguageTest === "celpip_g" && (
                                              <>
                                                <option value="10-12">10-12 (CLB 10)</option>
                                                <option value="9">9 (CLB 9)</option>
                                                <option value="8">8 (CLB 8)</option>
                                                <option value="7">7 (CLB 7)</option>
                                                <option value="6">6 (CLB 6)</option>
                                                <option value="5">5 (CLB 5)</option>
                                                <option value="4">4 (CLB 4)</option>
                                                <option value="M 0-3">M (0-3)</option>
                                              </>
                                            )}
                                            {formData.spouseLanguageTest === "ielts_g" && (
                                              <>
                                                {skill === "speaking" && (
                                                  <>
                                                    <option value="7.5-9.0">7.5-9.0 (CLB 10)</option>
                                                    <option value="7.0">7.0 (CLB 9)</option>
                                                    <option value="6.5">6.5 (CLB 8)</option>
                                                    <option value="6.0">6.0 (CLB 7)</option>
                                                    <option value="5.5">5.5 (CLB 6)</option>
                                                    <option value="5.0">5.0 (CLB 5)</option>
                                                    <option value="4.5">4.5 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "listening" && (
                                                  <>
                                                    <option value="8.5-9.0">8.5-9.0 (CLB 10)</option>
                                                    <option value="8.0">8.0 (CLB 9)</option>
                                                    <option value="7.5">7.5 (CLB 8)</option>
                                                    <option value="6.0-7.0">6.0-7.0 (CLB 7)</option>
                                                    <option value="5.5">5.5 (CLB 6)</option>
                                                    <option value="5.0">5.0 (CLB 5)</option>
                                                    <option value="4.5">4.5 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "reading" && (
                                                  <>
                                                    <option value="8.0-9.0">8.0-9.0 (CLB 10)</option>
                                                    <option value="7.0-7.5">7.0-7.5 (CLB 9)</option>
                                                    <option value="6.5">6.5 (CLB 8)</option>
                                                    <option value="6.0">6.0 (CLB 7)</option>
                                                    <option value="5.5">5.5 (CLB 6)</option>
                                                    <option value="5.0">5.0 (CLB 5)</option>
                                                    <option value="4.5">4.5 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "writing" && (
                                                  <>
                                                    <option value="7.5-9.0">7.5-9.0 (CLB 10)</option>
                                                    <option value="7.0">7.0 (CLB 9)</option>
                                                    <option value="6.5">6.5 (CLB 8)</option>
                                                    <option value="6.0">6.0 (CLB 7)</option>
                                                    <option value="5.5">5.5 (CLB 6)</option>
                                                    <option value="5.0">5.0 (CLB 5)</option>
                                                    <option value="4.5">4.5 (CLB 4)</option>
                                                  </>
                                                )}
                                              </>
                                            )}
                                            {formData.spouseLanguageTest === "pte_core" && (
                                              <>
                                                {skill === "speaking" && (
                                                  <>
                                                    <option value="89+">89+ (CLB 10)</option>
                                                    <option value="84-88">84-88 (CLB 9)</option>
                                                    <option value="76-83">76-83 (CLB 8)</option>
                                                    <option value="68-75">68-75 (CLB 7)</option>
                                                    <option value="60-67">60-67 (CLB 6)</option>
                                                    <option value="51-59">51-59 (CLB 5)</option>
                                                    <option value="42-50">42-50 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "listening" && (
                                                  <>
                                                    <option value="89+">89+ (CLB 10)</option>
                                                    <option value="82-88">82-88 (CLB 9)</option>
                                                    <option value="71-81">71-81 (CLB 8)</option>
                                                    <option value="60-70">60-70 (CLB 7)</option>
                                                    <option value="51-59">51-59 (CLB 6)</option>
                                                    <option value="42-50">42-50 (CLB 5)</option>
                                                    <option value="33-41">33-41 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "reading" && (
                                                  <>
                                                    <option value="88+">88+ (CLB 10)</option>
                                                    <option value="78-87">78-87 (CLB 9)</option>
                                                    <option value="69-77">69-77 (CLB 8)</option>
                                                    <option value="60-68">60-68 (CLB 7)</option>
                                                    <option value="51-59">51-59 (CLB 6)</option>
                                                    <option value="42-50">42-50 (CLB 5)</option>
                                                    <option value="33-41">33-41 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "writing" && (
                                                  <>
                                                    <option value="90">90 (CLB 10)</option>
                                                    <option value="88-89">88-89 (CLB 9)</option>
                                                    <option value="79-87">79-87 (CLB 8)</option>
                                                    <option value="69-78">69-78 (CLB 7)</option>
                                                    <option value="60-68">60-68 (CLB 6)</option>
                                                    <option value="51-59">51-59 (CLB 5)</option>
                                                    <option value="42-50">42-50 (CLB 4)</option>
                                                  </>
                                                )}
                                              </>
                                            )}
                                            {formData.spouseLanguageTest === "tef_canada" && (
                                              <>
                                                {skill === "speaking" && (
                                                  <>
                                                    <option value="556-699">556-699 (CLB 10)</option>
                                                    <option value="518-555">518-555 (CLB 9)</option>
                                                    <option value="494-517">494-517 (CLB 8)</option>
                                                    <option value="456-493">456-493 (CLB 7)</option>
                                                    <option value="420-455">420-455 (CLB 6)</option>
                                                    <option value="393-419">393-419 (CLB 5)</option>
                                                    <option value="371-392">371-392 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "listening" && (
                                                  <>
                                                    <option value="546-699">546-699 (CLB 10)</option>
                                                    <option value="503-545">503-545 (CLB 9)</option>
                                                    <option value="462-502">462-502 (CLB 8)</option>
                                                    <option value="434-461">434-461 (CLB 7)</option>
                                                    <option value="398-433">398-433 (CLB 6)</option>
                                                    <option value="371-397">371-397 (CLB 5)</option>
                                                    <option value="342-370">342-370 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "reading" && (
                                                  <>
                                                    <option value="546-699">546-699 (CLB 10)</option>
                                                    <option value="503-545">503-545 (CLB 9)</option>
                                                    <option value="462-502">462-502 (CLB 8)</option>
                                                    <option value="434-461">434-461 (CLB 7)</option>
                                                    <option value="398-433">398-433 (CLB 6)</option>
                                                    <option value="371-397">371-397 (CLB 5)</option>
                                                    <option value="342-370">342-370 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "writing" && (
                                                  <>
                                                    <option value="558-699">558-699 (CLB 10)</option>
                                                    <option value="512-557">512-557 (CLB 9)</option>
                                                    <option value="472-511">472-511 (CLB 8)</option>
                                                    <option value="428-471">428-471 (CLB 7)</option>
                                                    <option value="393-427">393-427 (CLB 6)</option>
                                                    <option value="366-392">366-392 (CLB 5)</option>
                                                    <option value="342-365">342-365 (CLB 4)</option>
                                                  </>
                                                )}
                                              </>
                                            )}
                                            {formData.spouseLanguageTest === "tcf_canada" && (
                                              <>
                                                {skill === "speaking" && (
                                                  <>
                                                    <option value="16-20">16-20 (CLB 10)</option>
                                                    <option value="14-15">14-15 (CLB 9)</option>
                                                    <option value="12-13">12-13 (CLB 8)</option>
                                                    <option value="10-11">10-11 (CLB 7)</option>
                                                    <option value="8-9">8-9 (CLB 6)</option>
                                                    <option value="6-7">6-7 (CLB 5)</option>
                                                    <option value="4-5">4-5 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "listening" && (
                                                  <>
                                                    <option value="549-699">549-699 (CLB 10)</option>
                                                    <option value="523-548">523-548 (CLB 9)</option>
                                                    <option value="503-522">503-522 (CLB 8)</option>
                                                    <option value="458-502">458-502 (CLB 7)</option>
                                                    <option value="398-457">398-457 (CLB 6)</option>
                                                    <option value="369-397">369-397 (CLB 5)</option>
                                                    <option value="331-368">331-368 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "reading" && (
                                                  <>
                                                    <option value="549-699">549-699 (CLB 10)</option>
                                                    <option value="524-548">524-548 (CLB 9)</option>
                                                    <option value="499-523">499-523 (CLB 8)</option>
                                                    <option value="453-498">453-498 (CLB 7)</option>
                                                    <option value="406-452">406-452 (CLB 6)</option>
                                                    <option value="375-405">375-405 (CLB 5)</option>
                                                    <option value="342-374">342-374 (CLB 4)</option>
                                                  </>
                                                )}
                                                {skill === "writing" && (
                                                  <>
                                                    <option value="16-20">16-20 (CLB 10)</option>
                                                    <option value="14-15">14-15 (CLB 9)</option>
                                                    <option value="12-13">12-13 (CLB 8)</option>
                                                    <option value="10-11">10-11 (CLB 7)</option>
                                                    <option value="8-9">8-9 (CLB 6)</option>
                                                    <option value="6-7">6-7 (CLB 5)</option>
                                                    <option value="4-5">4-5 (CLB 4)</option>
                                                  </>
                                                )}
                                              </>
                                            )}
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

                    {activeSection === "additional" && (
            <motion.div
                        key="additional"
                        data-section="additional"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <Plus className="h-4 w-4 text-white" />
                </div>
                          <h2 className="text-xl font-bold text-[#2F2E2E]">Additional Factors</h2>
              </div>

                        <div className="grid grid-cols-1 gap-4 px-1">
                          <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Do you have a valid job offer supported by a Labour Market Impact Assessment (LMIA)?{" "}
                              <a 
                                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/job-offer.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                              >
                                (If needed)
                              </a>
                            </label>
                            
                            {/* Job Offer Information */}
                            <div className="mb-3 p-3 sm:p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                              <div className="text-sm text-gray-700">
                                <p>
                                  Please{" "}
                                  <a 
                                    href="https://www.northernpathways.ca/pre-assessment-form"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-800 underline font-medium cursor-pointer"
                                  >
                                    contact us
                                  </a>{" "}
                                  for an assessment to verify if your job offer qualifies for points.
                                </p>
                              </div>
                            </div>
                            
                            <select
                              value={formData.jobOffer}
                              onChange={(e) => updateFormData("jobOffer", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Have you completed at least 2 academic years of full-time study (in a minimum 2-year program) in Canada?
                            </label>
                            <select
                              value={formData.canadianEducation}
                              onChange={(e) => updateFormData("canadianEducation", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
        </div>
                          
                                              <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Canadian Work Experience
                            </label>
                            
                            {/* Canadian Work Experience Information */}
                            <div className="mb-3 p-3 sm:p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                              <div className="text-sm text-gray-700">
                                <p>
                                  In a job categorized under TEER 0, 1, 2, or 3 of the NOC, and either holding a valid work permit or being authorized to work in Canada.
                                </p>
                              </div>
                            </div>
                            
                            <select
                              value={formData.canadianWorkExperience}
                              onChange={(e) => updateFormData("canadianWorkExperience", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="none_or_less_than_year">None or less than a year</option>
                              <option value="1_year_or_more">1 year or more</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#2F2E2E] mb-2">
                              Do you or your spouse or common-law partner have a relative who is living in Canada, 18 years or older, and a Canadian citizen or permanent resident?
                            </label>
                            
                            {/* Relatives Information */}
                            <div className="mb-3 p-3 sm:p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                              <div className="text-sm text-gray-700">
                                <p className="mb-2">This relative must be one of the following:</p>
                                <ul className="ml-4 space-y-1">
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Parent</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Grandparent</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Child</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Grandchild</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Your or your spouse&apos;s sibling (child of your or your spouse&apos;s parent)</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Your or your spouse&apos;s aunt or uncle (by blood or marriage)</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2 text-sm">•</span>
                                    <span>Your or your spouse&apos;s niece or nephew</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            <select
                              value={formData.relativesInCanada}
                              onChange={(e) => updateFormData("relativesInCanada", e.target.value)}
                              className="w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 text-base"
                            >
                              <option value="">Select option</option>
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons - Positioned at Bottom */}
                <div className="flex justify-between items-center mt-auto pt-4 sm:pt-6 border-t border-gray-200">
                  {/* Previous Button - Only show if not on first section */}
                  {activeSection !== "language" && (
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
                  {activeSection === "language" && <div className="w-20 sm:w-24"></div>}

                  {/* Next Button - Show for all sections except the last one */}
                  {activeSection !== "additional" && (
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
                  )}
                  
                  {/* Invisible spacer when Next button is hidden */}
                  {activeSection === "additional" && <div className="w-20 sm:w-24"></div>}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

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
                  <span className="whitespace-nowrap">Calculate My FSWP Score</span>
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
                    <div className="text-xs text-gray-500 mb-2">
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

        {/* Results Section */}
        {showResults && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#B92025] to-red-700 px-6 py-6 text-white text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your FSWP Score Results</h2>
                <p className="text-red-100 text-sm sm:text-base">Federal Skilled Worker Program Score Breakdown</p>
              </div>

              {/* Total Score */}
              <div className="px-6 py-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-[#B92025] to-red-700 text-white shadow-2xl mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{fswpScore}</div>
                    <div className="text-sm opacity-90">Points</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Total FSWP Score</h3>
                <p className="text-gray-600 text-sm">
                  {fswpScore >= 67 ? "🎉 Excellent! You meet the minimum requirements for FSWP." :
                   fswpScore >= 60 ? "👍 Good! You're close to meeting the requirements." :
                   fswpScore >= 50 ? "⚠️ Fair. Consider improving your profile to reach 67 points." :
                   "📝 Below average. Focus on improving key areas to reach the minimum 67 points."}
                </p>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> You need a minimum of 67 points to be eligible for the Federal Skilled Worker Program.
                  </p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Score Breakdown</h4>
                  <button
                    onClick={() => setShowDetailedBreakdown(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Detailed Breakdown</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Core Factors */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-blue-800">Core Factors</h5>
                      <span className="text-2xl font-bold text-blue-600">{(scoreBreakdown.core as number) || 0}</span>
                    </div>
                    <div className="space-y-1 text-xs text-blue-700">
                      <div>Language: {(scoreBreakdown.language as number) || 0}</div>
                      <div>Education: {(scoreBreakdown.education as number) || 0}</div>
                      <div>Work Experience: {(scoreBreakdown.experience as number) || 0}</div>
                      <div>Age: {(scoreBreakdown.age as number) || 0}</div>
                    </div>
                  </div>

                  {/* Language Skills */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-green-800">Language Skills</h5>
                      <span className="text-2xl font-bold text-green-600">{(scoreBreakdown.language as number) || 0}</span>
                    </div>
                    <div className="space-y-1 text-xs text-green-700">
                      <div>Speaking: {(scoreBreakdown.languageBreakdown as any)?.speaking || 0}</div>
                      <div>Listening: {(scoreBreakdown.languageBreakdown as any)?.listening || 0}</div>
                      <div>Reading: {(scoreBreakdown.languageBreakdown as any)?.reading || 0}</div>
                      <div>Writing: {(scoreBreakdown.languageBreakdown as any)?.writing || 0}</div>
                      <div>2nd Language: {(scoreBreakdown.secondLanguage as number) || 0}</div>
                    </div>
                  </div>

                  {/* Additional Factors */}
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-purple-800">Additional Factors</h5>
                      <span className="text-2xl font-bold text-purple-600">{(scoreBreakdown.additional as number) || 0}</span>
                    </div>
                    <div className="space-y-1 text-xs text-purple-700">
                      <div>Canadian Education: {(scoreBreakdown.canadianEducation as number) || 0}</div>
                      <div>Canadian Work: {(scoreBreakdown.canadianWorkExperience as number) || 0}</div>
                      <div>Spouse Education: {(scoreBreakdown.spouseCanadianEducation as number) || 0}</div>
                      <div>Spouse Work: {(scoreBreakdown.spouseWorkExperience as number) || 0}</div>
                      <div>Spouse Language: {(scoreBreakdown.spouseLanguage as number) || 0}</div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-indigo-800">Education</h5>
                      <span className="text-2xl font-bold text-indigo-600">{(scoreBreakdown.education as number) || 0}</span>
                    </div>
                    <div className="space-y-1 text-xs text-indigo-700">
                      <div>Highest Level: {(scoreBreakdown.education as number) || 0} points</div>
                      <div>Canadian Education: +{(scoreBreakdown.canadianEducation as number) || 0} bonus</div>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-orange-800">Work Experience</h5>
                      <span className="text-2xl font-bold text-orange-600">{(scoreBreakdown.experience as number) || 0}</span>
                    </div>
                    <div className="space-y-1 text-xs text-orange-700">
                      <div>Foreign Experience: {(scoreBreakdown.experience as number) || 0} points</div>
                      <div>Canadian Experience: +{(scoreBreakdown.canadianWorkExperience as number) || 0} bonus</div>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-pink-800">Age</h5>
                      <span className="text-2xl font-bold text-pink-600">{(scoreBreakdown.age as number) || 0}</span>
                    </div>
                    <div className="space-y-1 text-xs text-pink-700">
                      <div>Age Points: {(scoreBreakdown.age as number) || 0} points</div>
                      <div>Maximum: 12 points</div>
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
                      spouseCitizen: "",
                      spouseAccompanying: "",
                      age: "",
                      educationLevel: "",
                      canadianEducation: "",
                      workExperience: "",
                      canadianWorkExperience: "",
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
                      spouseWorkExperience: "",
                      spouseCanadianEducation: "",
                      spouseLanguageTest: "",
                      spouseLanguageSpeaking: "",
                      spouseLanguageListening: "",
                      spouseLanguageReading: "",
                      spouseLanguageWriting: "",
                      relativesInCanada: "",
                      jobOffer: "",
                      adaptabilityFactors: []
                    })
                    setActiveSection("maritalStatus")
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 bg-[#B92025] text-white hover:bg-red-700 hover:shadow-md"
                >
                  Calculate New Score
                </button>
              </div>
            </div>
          </motion.div>
        )}
              </main>

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
                      <h2 className="text-2xl font-bold">Detailed FSWP Score Breakdown</h2>
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
                      <span className="text-3xl font-bold">{fswpScore}</span>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Total FSWP Score</h3>
                    <p className="text-gray-600">
                      {fswpScore >= 67 ? "🎉 Excellent! You meet the minimum FSWP requirement." :
                       fswpScore >= 50 ? "👍 Good! You're close to meeting requirements." :
                       fswpScore >= 30 ? "⚠️ Fair. Consider improving your profile." :
                       "📝 Below average. Focus on improving key areas."}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* General */}
                  <motion.div 
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold">General</h3>
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
                            <div className="text-2xl font-bold text-blue-600">{(scoreBreakdown.age as number) || 0}</div>
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
                            <div className="text-2xl font-bold text-blue-600">{(scoreBreakdown.education as number) || 0}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>

                        {/* Work Experience */}
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Building2 className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Work Experience</p>
                              <p className="text-sm text-gray-600">Skilled work experience abroad</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{(scoreBreakdown.experience as number) || 0}</div>
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
                              <div className="text-2xl font-bold text-blue-600">{(scoreBreakdown.language as number) || 0}</div>
                              <div className="text-xs text-gray-500">points</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Speaking:</span>
                              <span className="font-medium">{(scoreBreakdown.languageBreakdown as any)?.speaking || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Listening:</span>
                              <span className="font-medium">{(scoreBreakdown.languageBreakdown as any)?.listening || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reading:</span>
                              <span className="font-medium">{(scoreBreakdown.languageBreakdown as any)?.reading || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Writing:</span>
                              <span className="font-medium">{(scoreBreakdown.languageBreakdown as any)?.writing || 0}</span>
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
                              <div className="text-2xl font-bold text-blue-600">{(scoreBreakdown.secondLanguage as number) || 0}</div>
                              <div className="text-xs text-gray-500">points</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Speaking:</span>
                              <span className="font-medium">{Math.floor(((scoreBreakdown.secondLanguage as number) || 0) / 4)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Listening:</span>
                              <span className="font-medium">{Math.floor(((scoreBreakdown.secondLanguage as number) || 0) / 4)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reading:</span>
                              <span className="font-medium">{Math.floor(((scoreBreakdown.secondLanguage as number) || 0) / 4)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Writing:</span>
                              <span className="font-medium">{Math.floor(((scoreBreakdown.secondLanguage as number) || 0) / 4)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Section Total */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">General Total</span>
                            <span className="text-3xl font-bold">{(scoreBreakdown.core as number) || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>



                  {/* Additional Factors */}
                  <motion.div 
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-white">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold">Additional Factors</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 text-lg mb-4">Canadian Experience</h4>
                          
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Canadian Education</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.canadianEducation as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Post-secondary education in Canada</p>
                          </div>

                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <Building2 className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Canadian Work Experience</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.canadianWorkExperience as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Skilled work experience in Canada</p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 text-lg mb-4">Other Factors</h4>
                          
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <Users className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Relatives in Canada</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.adaptability as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Family members living in Canada</p>
                          </div>

                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <Star className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Job Offer</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.jobOffer as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Valid job offer with LMIA</p>
                          </div>


                        </div>
                      </div>

                      {/* Spouse Factors Group */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 text-lg mb-4">Spouse Factors</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {/* Spouse Canadian Education */}
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Canadian Education</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.spouseCanadianEducation as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">2+ years of study in Canada</p>
                          </div>

                          {/* Spouse Work Experience */}
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <Building2 className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Work Experience</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.spouseWorkExperience as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Canadian work experience</p>
                          </div>

                          {/* Spouse Language */}
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <Languages className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">Language Skills</span>
                              </div>
                              <span className="text-xl font-bold text-indigo-600">{(scoreBreakdown.spouseLanguage as number) || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Language proficiency</p>
                          </div>
                        </div>
                      </div>

                      {/* Section Total */}
                      <motion.div 
                        className="mt-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold">Additional Factors Total</span>
                            {(scoreBreakdown.additionalRaw as number) > 10 && (
                              <span className="text-xs text-gray-100 mt-1">
                                Raw total: {(scoreBreakdown.additionalRaw as number)} (capped at 10)
                              </span>
                            )}
                          </div>
                          <span className="text-3xl font-bold">{(scoreBreakdown.additional as number) || 0}</span>
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
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Final FSWP Score Summary</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{(scoreBreakdown.core as number) || 0}</div>
                        <div className="text-sm text-gray-600">General</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">{(scoreBreakdown.additional as number) || 0}</div>
                        <div className="text-sm text-gray-600">Additional Factors</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="text-4xl font-bold text-[#B92025] mb-2">{fswpScore}</div>
                      <div className="text-lg text-gray-600">Total Federal Skilled Worker Program Score</div>
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
                    <p className="text-amber-700">Based on your current scores, here are ways to increase your FSWP points:</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - High Impact Tips */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-amber-800 text-lg mb-3">High Impact Improvements</h4>
                      
                      {/* Language Improvement */}
                      {(scoreBreakdown.language as number) < 24 && (
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
                            Current: {(scoreBreakdown.language as number) || 0} points | Target: 24 points
                          </p>
                          <p className="text-xs text-amber-600">
                            • Study for IELTS/CELPIP to achieve CLB 7+ in all skills
                            • Focus on your weakest skill first
                            • Practice with official test materials
                          </p>
                          <div className="mt-2 text-xs font-medium text-amber-700">
                            Potential gain: +{24 - ((scoreBreakdown.language as number) || 0)} points
                          </div>
                        </motion.div>
                      )}

                      {/* Second Language */}
                      {(scoreBreakdown.secondLanguage as number) < 4 && (
                        <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <span className="font-medium text-amber-800">Learn Second Language</span>
                          </div>
                          <p className="text-sm text-amber-700 mb-2">
                            Current: {(scoreBreakdown.secondLanguage as number) || 0} points | Target: 4 points
                          </p>
                          <p className="text-xs text-amber-600">
                            • Study French to achieve CLB 5+ in all skills
                            • Take TEF Canada or TCF Canada
                            • Focus on basic conversational skills
                          </p>
                          <div className="mt-2 text-xs font-medium text-amber-700">
                            Potential gain: +{4 - ((scoreBreakdown.secondLanguage as number) || 0)} points
                          </div>
                        </div>
                      )}

                      {/* Education */}
                      {(scoreBreakdown.education as number) < 25 && (
                        <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <span className="font-medium text-amber-800">Higher Education</span>
                          </div>
                          <p className="text-sm text-amber-700 mb-2">
                            Current: {(scoreBreakdown.education as number) || 0} points | Target: 25 points
                          </p>
                          <p className="text-xs text-amber-600">
                            • Pursue a PhD degree
                            • Get ECA for foreign credentials
                            • Consider Canadian education programs
                          </p>
                          <div className="mt-2 text-xs font-medium text-amber-700">
                            Potential gain: +{25 - ((scoreBreakdown.education as number) || 0)} points
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Medium Impact Tips */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-amber-800 text-lg mb-3">Medium Impact Improvements</h4>
                      
                                             {/* Work Experience */}
                       {(scoreBreakdown.experience as number) < 15 && (
                         <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                           <div className="flex items-center space-x-3 mb-2">
                             <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                               <span className="text-white text-xs font-bold">!</span>
                             </div>
                             <span className="font-medium text-amber-800">Work Experience</span>
                           </div>
                           <p className="text-sm text-amber-700 mb-2">
                             Current: {(scoreBreakdown.experience as number) || 0} points | Target: 15 points
                           </p>
                           <p className="text-xs text-amber-600">
                             • Work for 6+ years in skilled positions
                             • Ensure NOC code matches your skills
                             • Document all work experience properly
                           </p>
                           <div className="mt-2 text-xs font-medium text-amber-700">
                             Potential gain: +{15 - ((scoreBreakdown.experience as number) || 0)} points
                           </div>
                         </div>
                       )}

                      {/* Canadian Work Experience */}
                      {(scoreBreakdown.canadianWorkExperience as number) === 0 && (
                        <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <span className="font-medium text-amber-800">Canadian Work Experience</span>
                          </div>
                          <p className="text-sm text-amber-700 mb-2">
                            Current: 0 points | Target: 10 points
                          </p>
                          <p className="text-xs text-amber-600">
                            • Work in Canada for 1+ years in skilled positions
                            • Ensure NOC code matches your skills
                            • Get proper work permits
                          </p>
                          <div className="mt-2 text-xs font-medium text-amber-700">
                            Potential gain: +10 points
                          </div>
                        </div>
                      )}

                      {/* Canadian Education */}
                      {(scoreBreakdown.canadianEducation as number) === 0 && (
                        <div className="p-4 bg-amber-100 rounded-xl border border-amber-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <span className="font-medium text-amber-800">Canadian Education</span>
                          </div>
                          <p className="text-sm text-amber-700 mb-2">
                            Current: 0 points | Target: 5 points
                          </p>
                          <p className="text-xs text-amber-600">
                            • Study in Canada for 2+ years
                            • Complete post-secondary programs
                            • Get recognized credentials
                          </p>
                          <div className="mt-2 text-xs font-medium text-amber-700">
                            Potential gain: +5 points
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
                  💡 This breakdown shows exactly how your FSWP score is calculated
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

      {/* Sticky Form Progress Bar at Bottom */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-3">
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
                  className="bg-gradient-to-r from-[#B92025] to-red-700 h-2 rounded-full"
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
                      <p className="text-sm text-gray-600">Complete these fields to calculate your FSWP score</p>
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
                    language: {
                      title: "Language Skills",
                      icon: "🗣️",
                      color: "green",
                      sectionId: "language",
                      fields: []
                    },
                    education: {
                      title: "Education",
                      icon: "🎓",
                      color: "green",
                      sectionId: "education",
                      fields: []
                    },
                    work: {
                      title: "Work Experience",
                      icon: "💼",
                      color: "purple",
                      sectionId: "work",
                      fields: []
                    },
                    age: {
                      title: "Age",
                      icon: "👤",
                      color: "orange",
                      sectionId: "age",
                      fields: []
                    },
                    marital: {
                      title: "Marital Status",
                      icon: "💑",
                      color: "pink",
                      sectionId: "marital",
                      fields: []
                    },
                    spouse: {
                      title: "Spouse Details",
                      icon: "❤️",
                      color: "pink",
                      sectionId: "spouse",
                      fields: []
                    },
                    spouseFactors: {
                      title: "Spouse Factors",
                      icon: "📋",
                      color: "teal",
                      sectionId: "spouseFactors",
                      fields: []
                    },
                    additional: {
                      title: "Additional Factors",
                      icon: "⭐",
                      color: "indigo",
                      sectionId: "additional",
                      fields: []
                    }
                  };

                  // Check language fields
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

                  // Check education
                  if (!formData.educationLevel) missingSections.education.fields.push("Education Level");

                  // Check work experience
                  if (!formData.workExperience) missingSections.work.fields.push("Work Experience");

                  // Check age
                  if (!formData.age) missingSections.age.fields.push("Age");

                  // Check marital status
                  if (!formData.maritalStatus) missingSections.marital.fields.push("Marital Status");

                  // Check spouse details
                  if (formData.maritalStatus === "married" || formData.maritalStatus === "common_law") {
                    if (!formData.spouseCitizen) missingSections.spouse.fields.push("Spouse Citizen Status");
                    if (formData.spouseCitizen === "no") {
                      if (!formData.spouseAccompanying) missingSections.spouse.fields.push("Spouse Accompanying");
                      if (formData.spouseAccompanying === "yes") {
                        if (!formData.spouseWorkExperience) missingSections.spouseFactors.fields.push("Spouse Work Experience");
                        if (!formData.spouseCanadianEducation) missingSections.spouseFactors.fields.push("Spouse Canadian Education");
                        if (!formData.spouseLanguageTest) missingSections.spouseFactors.fields.push("Spouse Language Test");
                        
                        if (formData.spouseLanguageTest && formData.spouseLanguageTest !== "none_or_not_applicable") {
                          if (!formData.spouseLanguageSpeaking) missingSections.spouseFactors.fields.push("Spouse Language Speaking");
                          if (!formData.spouseLanguageListening) missingSections.spouseFactors.fields.push("Spouse Language Listening");
                          if (!formData.spouseLanguageReading) missingSections.spouseFactors.fields.push("Spouse Language Reading");
                          if (!formData.spouseLanguageWriting) missingSections.spouseFactors.fields.push("Spouse Language Writing");
                        }
                      }
                    }
                  }

                  // Check additional factors
                  if (!formData.jobOffer) missingSections.additional.fields.push("Job Offer");
                  if (!formData.canadianEducation) missingSections.additional.fields.push("Canadian Education");
                  if (!formData.canadianWorkExperience) missingSections.additional.fields.push("Canadian Work Experience");
                  if (!formData.relativesInCanada) missingSections.additional.fields.push("Relatives in Canada");

                  // Filter out sections with no missing fields
                  const sectionsWithMissingFields = Object.entries(missingSections).filter(([, section]) => section.fields.length > 0);

                  if (sectionsWithMissingFields.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <div className="text-green-500 text-4xl mb-4">✅</div>
                        <div className="text-green-700 font-bold text-xl mb-2">All Required Fields Completed!</div>
                        <div className="text-green-600 text-sm mb-4">You can now calculate your FSWP score</div>
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
                    💡 Complete all fields to get your accurate FSWP score
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

    </div>
  )
}

