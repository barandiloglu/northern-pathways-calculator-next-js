"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Calendar, Users, Award, X, ExternalLink } from "lucide-react"
import { 
  DrawData, 
  formatDrawDate, 
  getDrawTrend 
} from "@/lib/draw-data-fetcher"

interface DrawsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DrawsModal({ isOpen, onClose }: DrawsModalProps) {
  const [drawData, setDrawData] = useState<DrawData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from the new API endpoint
  useEffect(() => {
    if (isOpen) {
      fetchDrawData()
    }
  }, [isOpen])

  const fetchDrawData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/express-entry')
      if (!response.ok) {
        throw new Error('Failed to fetch draw data')
      }
      
      const result = await response.json()
      if (!result.ok) {
        throw new Error(result.error || 'API returned error')
      }
      
      // Transform the API response to match our DrawData interface
      const transformedData = result.rounds.map((round: any) => ({
        roundNumber: round.round,
        date: round.date,
        roundType: round.type,
        invitationsIssued: round.invitations || 'N/A',
        crsScore: round.crsCutoff || 'N/A'
      }))
      
      setDrawData(transformedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      console.error('Error fetching draw data:', err)
    } finally {
      setIsLoading(false)
    }
  }

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

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[98vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#B92025] to-red-700 p-4 sm:p-6 text-white flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold">Latest Express Entry Draws</h2>
                  <p className="text-white/90 text-xs sm:text-sm">Most recent invitation rounds</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 mx-auto sm:mx-0"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm mt-3 sm:mt-4 space-y-2 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center space-x-2 justify-center sm:justify-start">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </span>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium mx-auto sm:mx-0 w-fit ${
                  isLoading ? 'bg-gray-100 text-gray-800' : 
                  error ? 'bg-red-100 text-red-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {isLoading ? 'Loading...' : error ? 'Error' : 'Live Data'}
                </span>
              </div>
              
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200 justify-center sm:justify-start text-xs sm:text-sm"
              >
                <span>View official data</span>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B92025] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading latest draw data...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-8">
                <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-4">
                  <p className="font-medium">Error loading data</p>
                  <p className="text-sm">{error}</p>
                </div>
                <button
                  onClick={fetchDrawData}
                  className="bg-[#B92025] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
              )}

            {/* Content when data is loaded */}
            {!isLoading && !error && drawData.length > 0 && (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 border border-blue-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">Latest CRS Score</p>
                    <p className="text-lg sm:text-xl font-bold text-blue-900">{drawData[0]?.crsScore || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-green-600 font-medium">Total Invitations</p>
                    <p className="text-lg sm:text-xl font-bold text-green-900">
                      {drawData.reduce((sum, draw) => sum + parseInt(draw.invitationsIssued.replace(',', '')), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 border border-purple-200 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-purple-600 font-medium">Latest Draw</p>
                    <p className="text-base sm:text-lg font-bold text-purple-900">
                      {drawData[0] ? formatDrawDate(drawData[0].date) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block sm:hidden space-y-3 mb-4">
              {drawData.map((draw, index) => {
                const previousScore = index < drawData.length - 1 ? drawData[index + 1].crsScore : draw.crsScore
                const trend = getDrawTrend(draw.crsScore, previousScore)
                
                return (
                  <div
                    key={draw.roundNumber}
                    className="bg-gray-50 rounded-xl p-3 border border-gray-200"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-base font-bold text-[#B92025]">
                        #{draw.roundNumber}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getRoundTypeColor(draw.roundType)}`}>
                        {draw.roundType}
                      </span>
                    </div>
                    
                    {/* CRS Score - Prominent */}
                    <div className="text-center mb-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Award className="h-4 w-4 text-[#B92025]" />
                        <span className="text-xl font-bold text-[#B92025]">
                          {draw.crsScore}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">CRS Score</p>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {formatDrawDate(draw.date)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {draw.invitationsIssued}
                        </span>
                      </div>
                    </div>
                    
                    {/* Trend */}
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-center space-x-1">
                        <span className={`text-sm font-semibold ${trend.color}`}>
                          {trend.icon}
                        </span>
                        <span className={`text-xs font-medium ${trend.color}`}>
                          {trend.trend === 'stable' ? 'No change' : trend.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Round #</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Date</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Type</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Invitations</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">CRS Score</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {drawData.map((draw, index) => {
                    const previousScore = index < drawData.length - 1 ? drawData[index + 1].crsScore : draw.crsScore
                    const trend = getDrawTrend(draw.crsScore, previousScore)
                    
                    return (
                      <tr
                        key={draw.roundNumber}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-3 px-3">
                          <span className="font-mono text-base font-bold text-[#B92025]">
                            #{draw.roundNumber}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="font-medium text-gray-900 text-sm">
                              {formatDrawDate(draw.date)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getRoundTypeColor(draw.roundType)}`}>
                            {draw.roundType}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span className="font-medium text-gray-900 text-sm">
                              {draw.invitationsIssued}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-[#B92025]" />
                            <span className="text-lg font-bold text-[#B92025]">
                              {draw.crsScore}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <span className={`text-base font-semibold ${trend.color}`}>
                              {trend.icon}
                            </span>
                            <span className={`text-xs font-medium ${trend.color}`}>
                              {trend.trend === 'stable' ? 'No change' : trend.trend}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="text-xs sm:text-sm text-yellow-800">
                <p className="font-medium mb-2">Data Source</p>
                <p>
                  This information is sourced from the Government of Canada&apos;s official Express Entry rounds page. 
                  For the most up-to-date and official information, please visit the 
                  <a 
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-900 ml-1"
                  >
                    official website
                  </a>.
                </p>
              </div>
            </div>
              </>
            )}
          </div>

          {/* Footer - Fixed at Bottom */}
          <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Use this information to understand current CRS score requirements
              </p>
              <button
                onClick={onClose}
                className="bg-[#B92025] hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base mx-auto sm:mx-0 w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
