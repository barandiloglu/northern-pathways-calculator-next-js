"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  Star, 
  CheckCircle,
  Shield,
  Clock,
  Globe,
  FileText,
  Target
} from "lucide-react"

import { Footer } from "@/components/footer"
import { LatestDraws } from "@/components/latest-draws"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8 pt-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 shadow-xl relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0  rounded-full opacity-50"
            />
            <img 
              src="/logo.png" 
              alt="Northern Pathways Logo" 
              className="h-12 w-12 text-white relative z-10 object-contain"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2F2E2E] mb-6 leading-tight"
          >
            Your Path to
            <span className="block text-[#B92025]">Canada Starts Here</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Professional immigration assessment tools for Express Entry and Federal Skilled Worker Program. 
            Get accurate scores and expert guidance for your Canadian immigration journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/crs-calculator">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#B92025] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-3 text-lg"
              >
                <Calculator className="h-5 w-5" />
                <span>CRS Calculator</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link href="/fswp-calculator">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#B92025] text-[#B92025] hover:bg-[#B92025] hover:text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-3 text-lg"
              >
                <Target className="h-5 w-5" />
                <span>FSWP Calculator</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: Users, label: "Multi-Language", value: "EN/TR", color: "from-blue-500 to-blue-600" },
            { icon: Shield, label: "Secure", value: "100% Safe", color: "from-green-500 to-green-600" },
            { icon: Clock, label: "Real-time", value: "Live Data", color: "from-purple-500 to-purple-600" },
            { icon: Award, label: "Accurate", value: "Official", color: "from-orange-500 to-orange-600" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.6 }
                }}
                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}
              >
                <stat.icon className="h-10 w-10 text-white" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                className="text-3xl font-bold text-[#2F2E2E] mb-3"
              >
                {stat.value}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                className="text-gray-600 font-medium text-lg"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <motion.div variants={cardVariants} className="group flex flex-col">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#B92025]/20 flex-1 flex flex-col">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-xl mb-6 flex-shrink-0"
              >
                <Calculator className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[#2F2E2E] mb-4">Accurate CRS Calculations</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Get precise Comprehensive Ranking System scores based on current IRCC guidelines and immigration criteria
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="group flex flex-col">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#B92025]/20 flex-1 flex flex-col">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-xl mb-6 flex-shrink-0"
              >
                <FileText className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[#2F2E2E] mb-4">FSWP Assessment</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Comprehensive Federal Skilled Worker Program evaluation with detailed scoring breakdown
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="group flex flex-col">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#B92025]/20 flex-1 flex flex-col">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-xl mb-6 flex-shrink-0"
              >
                <Globe className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[#2F2E2E] mb-4">Bilingual Support</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Available in English and Turkish for maximum accessibility and user convenience
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Latest Express Entry Draws Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <LatestDraws />
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#B92025] to-red-700 rounded-full mb-8 shadow-2xl"
            >
              <Target className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-[#2F2E2E] mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Simple steps to calculate your immigration score and assess your eligibility
            </motion.p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Animated Background Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: 2.0, duration: 1.0 }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl" />
              <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl" />
            </motion.div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                { 
                  step: "1", 
                  icon: FileText, 
                  title: "Fill Your Details", 
                  description: "Enter your personal information, education, work experience, and language scores",
                  color: "from-blue-500 to-blue-600",
                  delay: 1.7
                },
                { 
                  step: "2", 
                  icon: Calculator, 
                  title: "Get Your Score", 
                  description: "Our system calculates your CRS or FSWP score based on official criteria",
                  color: "from-[#B92025] to-red-700",
                  delay: 1.9
                },
                { 
                  step: "3", 
                  icon: Target, 
                  title: "Plan Your Path", 
                  description: "Understand your eligibility and get guidance for your immigration journey",
                  color: "from-green-500 to-green-600",
                  delay: 2.1
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: item.delay, duration: 0.8, ease: "easeOut" }}
                  className="text-center relative group flex flex-col"
                >
                  {/* Floating Step Number */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: item.delay + 0.2, duration: 0.6 }}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 text-white rounded-full text-2xl font-bold flex items-center justify-center shadow-2xl border-4 border-white"
                      >
                        {item.step}
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-full blur-xl opacity-50 -z-10" />
                    </div>
                  </motion.div>

                  {/* Main Card */}
                  <motion.div
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 relative z-10 mt-8 group-hover:shadow-3xl transition-all duration-500 flex-1 flex flex-col"
                  >
                    {/* Icon Container with Animation */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.6 }
                      }}
                      className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl flex-shrink-0`}
                    >
                      <item.icon className="h-10 w-10 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay + 0.4, duration: 0.6 }}
                        className="text-2xl font-bold text-[#2F2E2E] mb-6"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay + 0.5, duration: 0.6 }}
                        className="text-gray-600 leading-relaxed text-lg flex-1"
                      >
                        {item.description}
                      </motion.p>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30"
                    />
                    <motion.div
                      animate={{ 
                        y: [0, 10, 0],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                      className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
                    />
                  </motion.div>

                  {/* Animated Arrow Between Steps */}
                  {index < 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: item.delay + 0.8, duration: 0.6 }}
                      className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20"
                    >
                      <div className="relative">
                        {/* Main Arrow */}
                        <motion.div
                          animate={{ 
                            x: [0, 10, 0],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-full flex items-center justify-center shadow-xl"
                        >
                          <ArrowRight className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        {/* Arrow Trail Effect */}
                        <motion.div
                          animate={{ 
                            x: [0, 20, 0],
                            opacity: [0, 0.5, 0]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeOut" 
                          }}
                          className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-full blur-sm"
                        />
                        
                        {/* Floating Particles */}
                        <motion.div
                          animate={{ 
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeOut",
                            delay: 0.5
                          }}
                          className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            x: [0, 25, 0],
                            y: [0, 20, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeOut",
                            delay: 1.0
                          }}
                          className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Decorative Element */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-center mt-16"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B92025] to-red-700 rounded-full shadow-xl"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.7, duration: 0.6 }}
                className="text-lg text-gray-600 mt-4 font-medium"
              >
                Ready to get started? Choose your calculator below!
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#B92025] to-red-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-black/10"
            />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 shadow-xl"
              >
                <Star className="h-10 w-10 text-white" />
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Start Your Journey?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed"
              >
                Use our comprehensive calculators to assess your eligibility for Canadian immigration and take the first step towards your dream
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/crs-calculator">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#B92025] px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-3 text-lg"
                  >
                    <Calculator className="h-5 w-5" />
                    <span>Start CRS Calculator</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                <Link href="/fswp-calculator">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#B92025] transition-all duration-200 flex items-center space-x-3 text-lg"
                  >
                    <Target className="h-5 w-5" />
                    <span>Try FSWP Calculator</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
