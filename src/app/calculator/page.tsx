"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, ChevronDown, ChevronRight, AlertTriangle, CheckCircle, X, TrendingUp } from "lucide-react"

import { Footer } from "@/components/footer"
import { DrawsModal } from "@/components/draws-modal"
import { 
  AssessmentForm, 
  languageTestOptions, 
  maritalStatusOptions, 
  educationLevelOptions,
  workExperienceOptions,
  nocLevelOptions,
  languageTestPoints,
  agePoints,
  educationPoints,
  caWorkExperiencePoints,
  foreignWorkExperiencePoints,
  spouseEducationPoints,
  spouseWorkExperiencePoints
} from "@/lib/data"

export default function CalculatorPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<AssessmentForm>({
    // Personal Information
    maritalStatus: "",
    spouseStatus: "",
    spouseMoving: "",
    age: 25,
    
    // Education
    educationLevel: "",
    caEducation: "",
    caEducationLevel: "",
    
    // Language
    firstLanguageTest: "",
    firstLanguageScores: {
      speaking: "",
      listening: "",
      reading: "",
      writing: ""
    },
    secondLanguageTest: "",
    secondLanguageScores: {
      speaking: "",
      listening: "",
      reading: "",
      writing: ""
    },
    
    // Work Experience
    caWorkExperience: "",
    foreignWorkExperience: "",
    
    // Additional Points
    jobOffer: "",
    jobOfferNOC: "",
    nomination: "",
    siblings: "",
    
    // Spouse Information
    spouseEducation: "",
    spouseWorkExperience: "",
    spouseLanguageTest: "",
    spouseLanguageScores: {
      speaking: "",
      listening: "",
      reading: "",
      writing: ""
    }
  })

  const [showResults, setShowResults] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [showDrawsModal, setShowDrawsModal] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("personal")

  const updateFormData = (field: keyof AssessmentForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateLanguageScores = (language: 'first' | 'second' | 'spouse', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${language}LanguageScores`]: {
        ...prev[`${language}LanguageScores` as keyof AssessmentForm] as any,
        [field]: value
      }
    }))
  }

  const calculateScore = () => {
    let totalScore = 0
    const breakdown: { category: string; points: number }[] = []

    // Age points
    const ageScore = agePoints[formData.age] || 0
    totalScore += ageScore
    breakdown.push({ category: "Age", points: ageScore })

    // Education points
    const educationScore = educationPoints[formData.educationLevel] || 0
    totalScore += educationScore
    breakdown.push({ category: "Education", points: educationScore })

    // Language points (first language)
    if (formData.firstLanguageTest && formData.firstLanguageScores) {
      const testPoints = languageTestPoints[formData.firstLanguageTest]
      if (testPoints) {
        let languageScore = 0
        Object.entries(formData.firstLanguageScores).forEach(([skill, score]) => {
          const skillPoints = testPoints[skill as keyof typeof testPoints]
          const pointEntry = skillPoints.find(p => p.score === score)
          if (pointEntry) {
            languageScore += pointEntry.points
          }
        })
        totalScore += languageScore
        breakdown.push({ category: "First Language", points: languageScore })
      }
    }

    // Canadian work experience
    const caWorkScore = caWorkExperiencePoints[formData.caWorkExperience] || 0
    totalScore += caWorkScore
    breakdown.push({ category: "Canadian Work Experience", points: caWorkScore })

    // Foreign work experience
    const foreignWorkScore = foreignWorkExperiencePoints[formData.foreignWorkExperience] || 0
    totalScore += foreignWorkScore
    breakdown.push({ category: "Foreign Work Experience", points: foreignWorkScore })

    // Spouse education
    const spouseEducationScore = spouseEducationPoints[formData.spouseEducation] || 0
    totalScore += spouseEducationScore
    breakdown.push({ category: "Spouse Education", points: spouseEducationScore })

    // Spouse work experience
    const spouseWorkScore = spouseWorkExperiencePoints[formData.spouseWorkExperience] || 0
    totalScore += spouseWorkScore
    breakdown.push({ category: "Spouse Work Experience", points: spouseWorkScore })

    return { totalScore, breakdown }
  }

  const { totalScore, breakdown } = calculateScore()

  const sections = [
    { id: "personal", title: "Personal Information", icon: "👤" },
    { id: "education", title: "Education", icon: "🎓" },
    { id: "language", title: "Language Ability", icon: "🗣️" },
    { id: "work", title: "Work Experience", icon: "💼" },
    { id: "additional", title: "Additional Points", icon: "➕" },
    { id: "spouse", title: "Spouse Information", icon: "💑" }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            CRS Score Calculator
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Calculate your Comprehensive Ranking System score for Express Entry
          </p>

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

        {/* Disclaimer */}
        <AnimatePresence>
          {showDisclaimer && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 relative">
                <button
                  onClick={() => setShowDisclaimer(false)}
                  className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-800"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      {t("legalDisclaimer")}
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      {t("legalDisclaimerText")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg bg-card"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{section.icon}</span>
                      <span className="font-semibold">{section.title}</span>
                    </div>
                    {expandedSection === section.id ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t p-6"
                      >
                        {section.id === "personal" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("maritalStatusQuestion")}
                              </label>
                              <select
                                value={formData.maritalStatus}
                                onChange={(e) => updateFormData("maritalStatus", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {maritalStatusOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("ageQuestion")}
                              </label>
                              <input
                                type="number"
                                min="17"
                                max="45"
                                value={formData.age}
                                onChange={(e) => updateFormData("age", parseInt(e.target.value))}
                                className="w-full p-3 border rounded-lg bg-background"
                              />
                            </div>
                          </div>
                        )}

                        {section.id === "education" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("educationStatusQuestion")}
                              </label>
                              <select
                                value={formData.educationLevel}
                                onChange={(e) => updateFormData("educationLevel", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {educationLevelOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {section.id === "language" && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("languageQuestionFirst")}
                              </label>
                              <select
                                value={formData.firstLanguageTest}
                                onChange={(e) => updateFormData("firstLanguageTest", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {languageTestOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            {formData.firstLanguageTest && (
                              <div className="grid grid-cols-2 gap-4">
                                {Object.entries(formData.firstLanguageScores).map(([skill, score]) => (
                                  <div key={skill}>
                                    <label className="block text-sm font-medium mb-2">
                                      {t(skill as keyof typeof t)}
                                    </label>
                                    <select
                                      value={score}
                                      onChange={(e) => updateLanguageScores('first', skill, e.target.value)}
                                      className="w-full p-3 border rounded-lg bg-background"
                                    >
                                      <option value="">{t("select")}</option>
                                      {languageTestPoints[formData.firstLanguageTest]?.[skill as keyof typeof languageTestPoints[string]]?.map((point) => (
                                        <option key={point.score} value={point.score}>
                                          {point.score}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {section.id === "work" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("caWorkExperienceQuestion")}
                              </label>
                              <select
                                value={formData.caWorkExperience}
                                onChange={(e) => updateFormData("caWorkExperience", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {workExperienceOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("foreignWorkExperienceQuestion")}
                              </label>
                              <select
                                value={formData.foreignWorkExperience}
                                onChange={(e) => updateFormData("foreignWorkExperience", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {workExperienceOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {section.id === "additional" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("additionalPointDescription")}
                              </label>
                              <select
                                value={formData.jobOffer}
                                onChange={(e) => updateFormData("jobOffer", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                <option value="yes">{t("yes")}</option>
                                <option value="no">{t("no")}</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("nominationQuestion")}
                              </label>
                              <select
                                value={formData.nomination}
                                onChange={(e) => updateFormData("nomination", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                <option value="yes">{t("yes")}</option>
                                <option value="no">{t("no")}</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {section.id === "spouse" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("spouseEducationQuestion")}
                              </label>
                              <select
                                value={formData.spouseEducation}
                                onChange={(e) => updateFormData("spouseEducation", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {educationLevelOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {t("spouseWorkStatus")}
                              </label>
                              <select
                                value={formData.spouseWorkExperience}
                                onChange={(e) => updateFormData("spouseWorkExperience", e.target.value)}
                                className="w-full p-3 border rounded-lg bg-background"
                              >
                                <option value="">{t("select")}</option>
                                {workExperienceOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border rounded-lg bg-card p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/logo.png" 
                      alt="Northern Pathways Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{t("totalScore")}</h2>
                  <div className="text-4xl font-bold gradient-text">
                    {totalScore}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {breakdown.map((item) => (
                    <div key={item.category} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                      <span className="font-semibold">{item.points}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowResults(true)}
                  className="w-full button-primary"
                >
                  {t("calculate")}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Minimum CRS score for recent draws: ~470-550
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Latest Draws Modal */}
      <DrawsModal 
        isOpen={showDrawsModal} 
        onClose={() => setShowDrawsModal(false)} 
      />

      <Footer />
    </div>
  )
}
