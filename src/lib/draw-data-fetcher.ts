// Utility functions for fetching Express Entry draw data
// This module provides different approaches to get real-time data

export interface DrawData {
  roundNumber: string
  date: string
  roundType: string
  invitationsIssued: string
  crsScore: string
}

export interface PaginationOptions {
  page?: number
  limit?: number
}

export interface DrawDataResponse {
  data: DrawData[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  source: 'real-time' | 'cached' | 'fallback'
  lastUpdated: string
}

export interface FetchOptions {
  useProxy?: boolean
  proxyUrl?: string
  timeout?: number
  pagination?: PaginationOptions
}

// Pagination utility functions
export const paginateData = (data: DrawData[], page: number = 1, limit: number = 25): {
  paginatedData: DrawData[]
  pagination: DrawDataResponse['pagination']
} => {
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / limit)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedData = data.slice(startIndex, endIndex)
  
  return {
    paginatedData,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    }
  }
}

// Hardcoded data removed for testing - now returns empty array
// This forces the app to use real-time parsing from Canada.ca
export const getLatestDrawData = (): DrawData[] => {
  return []
}

// Function to fetch data from our internal API endpoint
export const fetchDrawDataFromAPI = async (): Promise<DrawData[]> => {
  try {
    const response = await fetch('/api/express-entry', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (!result.ok) {
      throw new Error(result.error || 'API returned error')
    }
    
    // Transform the API response to match our DrawData interface
    return result.rounds.map((round: any) => ({
      roundNumber: round.round,
      date: round.date,
      roundType: round.type,
      invitationsIssued: round.invitations || 'N/A',
      crsScore: round.crsCutoff || 'N/A'
    }))
  } catch (error) {
    console.error('Error fetching draw data from API:', error)
    // Return empty array for testing
    return []
  }
}

// HTML parsing functions for the Canada.ca Express Entry website
export const parseDrawDataFromHTML = async (html: string): Promise<DrawData[]> => {
  try {
    // Dynamic import for cheerio to avoid require() in client components
    const cheerio = await import('cheerio')
    const $ = cheerio.load(html)
    
    const draws: DrawData[] = []
    
    // Find all table rows in the tbody
    $('tbody tr').each((index: number, element: any) => {
      const $row = $(element)
      const cells = $row.find('td')
      
      if (cells.length >= 5) {
        // Extract data from each cell
        const $roundNumberCell = $(cells[0])
        const $dateCell = $(cells[1])
        const $roundTypeCell = $(cells[2])
        const $invitationsCell = $(cells[3])
        const $crsCell = $(cells[4])
        
        // Extract round number from the first cell (might be a link or empty)
        let roundNumber = ''
        const $roundLink = $roundNumberCell.find('a')
        if ($roundLink.length > 0) {
          // Extract number from href or text content
          const href = $roundLink.attr('href') || ''
          const text = $roundLink.text().trim()
          const match = href.match(/(\d+)/) || text.match(/(\d+)/)
          roundNumber = match ? match[1] : ''
        } else {
          const cellText = $roundNumberCell.text().trim()
          // If the cell is empty, we'll generate a round number based on the date
          if (cellText) {
            roundNumber = cellText
          } else {
            // Generate a round number based on the date (fallback)
            const dateStr = $dateCell.attr('data-order') || $dateCell.text().trim()
            if (dateStr) {
              // Use date as a fallback identifier
              roundNumber = dateStr.replace(/-/g, '')
            }
          }
        }
        
        // Extract date - use data-order attribute if available, otherwise text content
        const dateOrder = $dateCell.attr('data-order')
        const date = dateOrder || $dateCell.text().trim()
        
        // Extract other fields
        const roundType = $roundTypeCell.text().trim()
        const invitationsIssued = $invitationsCell.text().trim()
        const crsScore = $crsCell.text().trim()
        
        // Only add if we have essential data
        if (roundNumber && date && roundType) {
          draws.push({
            roundNumber,
            date,
            roundType,
            invitationsIssued,
            crsScore
          })
        }
      }
    })
    
    return draws
  } catch (error) {
    console.error('Error parsing HTML:', error)
    return []
  }
}

// Function to fetch HTML from Canada.ca website
export const fetchHTMLFromCanadaCa = async (): Promise<string> => {
  try {
    const response = await fetch('https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.text()
  } catch (error) {
    console.error('Error fetching HTML from Canada.ca:', error)
    throw error
  }
}

// Function to fetch JSON data directly from Canada.ca (if available)
export const fetchDrawDataFromCanadaCaJSON = async (): Promise<DrawData[]> => {
  try {
    // Try to fetch the JSON data directly from the endpoint
    const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      throw new Error(`JSON fetch failed with status: ${response.status}`)
    }
    
    const jsonData = await response.json()
    
    // Parse the JSON structure based on the website's data mapping
    if (jsonData.rounds && Array.isArray(jsonData.rounds)) {
      return jsonData.rounds.map((round: any) => ({
        roundNumber: round.drawNumberURL ? round.drawNumberURL.match(/(\d+)/)?.[1] || '' : '',
        date: round.drawDate || round.drawDateFull || '',
        roundType: round.drawName || '',
        invitationsIssued: round.drawSize || '',
        crsScore: round.drawCRS || ''
      })).filter((draw: DrawData) => draw.date && draw.roundType)
    }
    
    return []
  } catch (error) {
    console.error('Error fetching JSON from Canada.ca:', error)
    throw error
  }
}

// Function to fetch and parse draw data from Canada.ca website
export const fetchDrawDataFromCanadaCa = async (options?: PaginationOptions): Promise<DrawData[]> => {
  try {
    // First try to fetch JSON data directly (more reliable)
    try {
      const jsonData = await fetchDrawDataFromCanadaCaJSON()
      if (jsonData.length > 0) {
        // Apply pagination if options provided
        if (options) {
          const { paginatedData } = paginateData(jsonData, options.page, options.limit)
          return paginatedData
        }
        return jsonData
      }
    } catch (jsonError) {
      console.log('JSON fetch failed, trying HTML parsing:', jsonError)
    }
    
    // Fallback to HTML parsing
    const html = await fetchHTMLFromCanadaCa()
    const parsedData = await parseDrawDataFromHTML(html)
    
    // Apply pagination if options provided
    if (options && parsedData.length > 0) {
      const { paginatedData } = paginateData(parsedData, options.page, options.limit)
      return paginatedData
    }
    
    return parsedData
  } catch (error) {
    console.error('Error fetching draw data from Canada.ca:', error)
    // Return empty array for testing
    return []
  }
}

// Function to simulate real-time data updates
export const simulateRealTimeUpdates = (): Promise<DrawData[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Return empty array for testing
      resolve([])
    }, 800)
  })
}

// Function to get data with different strategies
export const getDrawDataWithFallback = async (options?: PaginationOptions): Promise<DrawDataResponse> => {
  const page = options?.page || 1
  const limit = options?.limit || 25
  
  try {
    // Try to fetch from Canada.ca website first (most up-to-date)
    // Always fetch full data first to ensure consistent pagination calculation
    const fullData = await fetchDrawDataFromCanadaCa()
    if (fullData.length > 0) {
      // Calculate pagination from full data
      const { paginatedData, pagination } = paginateData(fullData, page, limit)
      
      return {
        data: paginatedData,
        pagination,
        source: 'real-time',
        lastUpdated: new Date().toISOString()
      }
    }
  } catch (error) {
    console.log('Canada.ca fetch failed, trying API fallback:', error)
  }

  try {
    // Try to fetch from our internal API as fallback
    const apiData = await fetchDrawDataFromAPI()
    const { paginatedData, pagination } = paginateData(apiData, page, limit)
    
    return {
      data: paginatedData,
      pagination,
      source: 'cached',
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    // Return empty data for testing
    const { pagination } = paginateData([], page, limit)
    return {
      data: [],
      pagination,
      source: 'fallback',
      lastUpdated: new Date().toISOString()
    }
  }
}

// Convenience function to get first page with 25 items
export const getFirstPageDrawData = async (): Promise<DrawDataResponse> => {
  return getDrawDataWithFallback({ page: 1, limit: 25 })
}

// Utility function to format dates consistently
export const formatDrawDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

// Utility function to get trend information
export const getDrawTrend = (currentScore: string, previousScore: string) => {
  try {
    const current = parseInt(currentScore)
    const previous = parseInt(previousScore)
    
    if (current < previous) return { trend: 'down', color: 'text-green-600', icon: '↓', change: previous - current }
    if (current > previous) return { trend: 'up', color: 'text-red-600', icon: '↑', change: current - previous }
    return { trend: 'stable', color: 'text-gray-600', icon: '→', change: 0 }
  } catch (error) {
    return { trend: 'stable', color: 'text-gray-600', icon: '→', change: 0 }
  }
}

// Test function to validate HTML parsing with sample data
export const testHTMLParsing = (): void => {
  const sampleHTML = `
    <table>
      <tbody>
        <tr>
          <td></td>
          <td data-order="2025-09-03" class="sorting_1">September 3, 2025</td>
          <td>Canadian Experience Class</td>
          <td>1,000</td>
          <td>534</td>
        </tr>
        <tr>
          <td></td>
          <td data-order="2025-09-02" class="sorting_1">September 2, 2025</td>
          <td>Provincial Nominee Program</td>
          <td>249</td>
          <td>772</td>
        </tr>
        <tr>
          <td></td>
          <td data-order="2025-08-19" class="sorting_1">August 19, 2025</td>
          <td>Healthcare and social services occupations (Version 2)</td>
          <td>2,500</td>
          <td>470</td>
        </tr>
      </tbody>
    </table>
  `
  
  const parsedData = parseDrawDataFromHTML(sampleHTML)
  console.log('Parsed test data:', parsedData)
  
  // Expected results based on the sample HTML
  const expectedResults = [
    {
      roundNumber: '',
      date: '2025-09-03',
      roundType: 'Canadian Experience Class',
      invitationsIssued: '1,000',
      crsScore: '534'
    },
    {
      roundNumber: '',
      date: '2025-09-02',
      roundType: 'Provincial Nominee Program',
      invitationsIssued: '249',
      crsScore: '772'
    },
    {
      roundNumber: '',
      date: '2025-08-19',
      roundType: 'Healthcare and social services occupations (Version 2)',
      invitationsIssued: '2,500',
      crsScore: '470'
    }
  ]
  
  console.log('Expected results:', expectedResults)
  console.log('Parsing test passed:', JSON.stringify(parsedData) === JSON.stringify(expectedResults))
}

// Export types for use in other components
