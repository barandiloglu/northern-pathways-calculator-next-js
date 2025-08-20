"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Calendar, Users, Award, RefreshCw, AlertCircle, ExternalLink, Info, Globe } from "lucide-react"
import { 
  DrawData, 
  getDrawDataWithFallback, 
  formatDrawDate, 
  getDrawTrend 
} from "@/lib/draw-data-fetcher"

interface LatestDrawsProps {
  className?: string
}

export function LatestDraws({ className = "" }: LatestDrawsProps) {
  const [drawData, setDrawData] = useState<DrawData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | "Never">("Never")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dataSource, setDataSource] = useState<'real-time' | 'cached' | 'fallback'>('fallback')

  const fetchDrawData = async () => {
    try {
      setIsRefreshing(true)
      setError(null)
      
      // Use the utility function to get data with fallback strategies
      const result = await getDrawDataWithFallback()
      
      setDrawData(result.data)
      setLastUpdated(result.lastUpdated)
      setDataSource(result.source)
    } catch (err) {
      setError("Failed to fetch latest draw data. Please try again later.")
      console.error("Error fetching draw data:", err)
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    if (!isRefreshing) {
      await fetchDrawData()
    }
  }

  useEffect(() => {
    fetchDrawData()
  }, [])

  const getRoundTypeColor = (type: string) => {
    const lowerType = type.toLowerCase()
    
    if (lowerType.includes('healthcare') || lowerType.includes('social services')) {
      return 'bg-green-100 text-green-800 border-green-200'
    } else if (lowerType.includes('provincial nominee') || lowerType.includes('pnp')) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    } else if (lowerType.includes('french language') || lowerType.includes('french proficiency')) {
      return 'bg-blue-100 text-blue-800 border-blue-200'
    } else if (lowerType.includes('canadian experience') || lowerType.includes('cec')) {
      return 'bg-orange-100 text-orange-800 border-orange-200'
    } else if (lowerType.includes('general')) {
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    } else if (lowerType.includes('federal skilled')) {
      return 'bg-red-100 text-red-800 border-red-200'
    } else if (lowerType.includes('federal skilled trades')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-8 ${className}`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#B92025] to-red-700 rounded-full mb-4 sm:mb-6">
            <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F2E2E] mb-3 sm:mb-4">Latest Express Entry Draws</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Fetching the most recent draw results...</p>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#B92025]"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-8 ${className}`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-4 sm:mb-6">
            <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F2E2E] mb-3 sm:mb-4">Latest Express Entry Draws</h2>
          <p className="text-red-600 mb-4 sm:mb-6 text-sm sm:text-base">{error}</p>
          
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="bg-[#B92025] hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto disabled:opacity-50 text-sm sm:text-base"
          >
            <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Try Again'}</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B92025] to-red-700 p-4 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">Latest Express Entry Draws</h2>
              <p className="text-white/90 text-base sm:text-lg">Most recent invitation rounds</p>
            </div>
          </div>
          
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 mx-auto sm:mx-0 text-sm sm:text-base"
          >
            <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="flex items-center space-x-2 justify-center sm:justify-start">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </span>
            
            <span className="flex items-center space-x-2 justify-center sm:justify-start">
              <Globe className="h-4 w-4" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                dataSource === 'real-time' 
                  ? 'bg-green-100 text-green-800' 
                  : dataSource === 'cached' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {dataSource === 'real-time' ? 'Live Data' : dataSource === 'cached' ? 'Cached' : 'Fallback'}
              </span>
            </span>
          </div>
          
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200 justify-center sm:justify-start text-sm"
          >
            <span>View official data</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Draw Data - Mobile Cards / Desktop Table */}
      <div className="p-4 sm:p-8">
        {/* Mobile Cards View */}
        <div className="block sm:hidden space-y-4">
          <AnimatePresence>
            {drawData.map((draw, index) => {
              const previousScore = index < drawData.length - 1 ? drawData[index + 1].crsScore : draw.crsScore
              const trend = getDrawTrend(draw.crsScore, previousScore)
              
              return (
                <motion.div
                  key={draw.roundNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-lg font-bold text-[#B92025]">
                      #{draw.roundNumber}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getRoundTypeColor(draw.roundType)}`}>
                      {draw.roundType}
                    </span>
                  </div>
                  
                  {/* CRS Score - Prominent */}
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Award className="h-5 w-5 text-[#B92025]" />
                      <span className="text-2xl font-bold text-[#B92025]">
                        {draw.crsScore}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">CRS Score</p>
                  </div>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {formatDrawDate(draw.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {draw.invitationsIssued}
                      </span>
                    </div>
                  </div>
                  
                  {/* Trend */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2">
                      <span className={`text-lg font-semibold ${trend.color}`}>
                        {trend.icon}
                      </span>
                      <span className={`text-sm font-medium ${trend.color}`}>
                        {trend.trend === 'stable' ? 'No change' : trend.trend}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Round #</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Invitations</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">CRS Score</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {drawData.map((draw, index) => {
                  const previousScore = index < drawData.length - 1 ? drawData[index + 1].crsScore : draw.crsScore
                  const trend = getDrawTrend(draw.crsScore, previousScore)
                  
                  return (
                    <motion.tr
                      key={draw.roundNumber}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-lg font-bold text-[#B92025]">
                          #{draw.roundNumber}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {formatDrawDate(draw.date)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getRoundTypeColor(draw.roundType)}`}>
                          {draw.roundType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {draw.invitationsIssued}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-[#B92025]" />
                          <span className="text-2xl font-bold text-[#B92025]">
                            {draw.crsScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-semibold ${trend.color}`}>
                            {trend.icon}
                          </span>
                          <span className={`text-sm font-medium ${trend.color}`}>
                            {trend.trend === 'stable' ? 'No change' : trend.trend}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-blue-600 font-medium">Latest CRS Score</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">{drawData[0]?.crsScore || 'N/A'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 sm:p-6 border border-green-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-green-600 font-medium">Total Invitations</p>
                <p className="text-xl sm:text-2xl font-bold text-green-900">
                  {drawData.reduce((sum, draw) => sum + parseInt(draw.invitationsIssued.replace(',', '')), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 border border-purple-200 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-purple-600 font-medium">Latest Draw</p>
                <p className="text-base sm:text-lg font-bold text-purple-900">
                  {drawData[0] ? formatDrawDate(drawData[0].date) : 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 sm:p-6 border border-orange-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-orange-600 font-medium mb-2">Draw Frequency</p>
                <p className="text-orange-900 text-sm sm:text-base">
                  Express Entry draws typically occur every 2 weeks, usually on Wednesdays. 
                  The exact schedule may vary based on IRCC's operational needs.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 sm:p-6 border border-indigo-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-indigo-600 font-medium mb-2">CRS Score Range</p>
                <p className="text-indigo-900 text-sm sm:text-base">
                  CRS scores typically range from 400-600+ points. Higher scores increase 
                  your chances of receiving an Invitation to Apply (ITA).
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-yellow-800">
              <p className="font-medium mb-1">Data Source & Updates</p>
              <p>
                This information is sourced from the Government of Canada's official Express Entry rounds page. 
                For the most up-to-date and official information, please visit the 
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-900 ml-1"
                >
                  official website
                </a>.
                <br />
                <span className="mt-2 inline-block">
                  <strong>Current Data Source:</strong> {dataSource === 'real-time' ? 'Live data from Government of Canada website' : dataSource === 'cached' ? 'Cached data from official source' : 'Fallback data (updated periodically)'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
