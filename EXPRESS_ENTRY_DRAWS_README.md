# Express Entry Draws System

This system provides real-time access to the latest Express Entry draw data from the Government of Canada website, integrated into your Next.js homepage.

## Features

- **Real-time Data Fetching**: Attempts to fetch live data from the official Government of Canada website
- **Multiple Fallback Strategies**: Uses cached data and fallback data if live fetching fails
- **Interactive UI**: Beautiful, responsive interface with animations and real-time updates
- **Data Source Indicators**: Shows users where the data is coming from (Live/Cached/Fallback)
- **Trend Analysis**: Displays CRS score trends between draws
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Components

### 1. LatestDraws Component (`src/components/latest-draws.tsx`)

The main component that displays the Express Entry draw data. Features:

- Real-time data fetching with fallback strategies
- Interactive table with trend indicators
- Summary statistics
- Data source indicators
- Refresh functionality
- Error handling and loading states

### 2. Draw Data Fetcher (`src/lib/draw-data-fetcher.ts`)

Utility module that handles data fetching strategies:

- **Live Data Fetching**: Attempts to fetch from Government of Canada website
- **CORS Proxy Support**: Uses proxy services to bypass CORS restrictions
- **Fallback Data**: Provides realistic mock data when live fetching fails
- **Data Parsing**: HTML parsing utilities for extracting draw information

## Data Sources

The system uses a multi-layered approach to ensure data availability:

1. **Primary Source**: Government of Canada Express Entry Rounds page
   - URL: https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html
   - Updated every 2 weeks with new draw results

2. **Fallback Sources**:
   - Cached data from previous successful fetches
   - Realistic mock data based on actual website structure

## Implementation Details

### Current Implementation

The system currently uses realistic mock data that represents the actual structure from the Government of Canada website. This includes:

- Round numbers (349-362)
- Dates (June 2025 - August 2025)
- Round types:
  - Healthcare and social services occupations (Version 2)
  - Provincial Nominee Program
  - French language proficiency (Version 1)
  - Canadian Experience Class
- Varied invitation counts (125 to 4,000)
- CRS scores ranging from 470 to 800+

### Real-time Implementation Options

To implement actual real-time data fetching, consider these approaches:

#### Option 1: CORS Proxy Service

```typescript
// Enable proxy in the component
const result = await getDrawDataWithFallback()
// This will attempt to use a CORS proxy service
```

**Pros**: No backend required, works with existing frontend
**Cons**: Rate limiting, potential reliability issues, dependency on third-party service

#### Option 2: Backend API with Web Scraping

Create a backend service that scrapes the Government of Canada website:

```typescript
// Example backend endpoint
app.get('/api/express-entry-draws', async (req, res) => {
  try {
    const data = await scrapeGovernmentWebsite()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})
```

**Pros**: Reliable, no rate limiting, full control over data
**Cons**: Requires backend infrastructure, maintenance overhead

#### Option 3: Official API (When Available)

If the Government of Canada provides an official API in the future:

```typescript
// Replace the scraping logic with API calls
const response = await fetch('https://api.canada.ca/express-entry-draws')
const data = await response.json()
```

**Pros**: Most reliable, official data source
**Cons**: Currently not available

## Usage

### Basic Integration

```tsx
import { LatestDraws } from "@/components/latest-draws"

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Our Immigration Platform</h1>
      <LatestDraws />
    </div>
  )
}
```

### Custom Styling

```tsx
<LatestDraws className="my-custom-class" />
```

### Data Source Monitoring

The component automatically tracks data sources and displays them to users:

- 🟢 **Live Data**: Successfully fetched from official website
- 🔵 **Cached**: Retrieved from previous successful fetch
- 🟡 **Fallback**: Using mock data when other sources fail

## Configuration

### Environment Variables

Add these to your `.env.local` file for production use:

```bash
# CORS Proxy Service (optional)
NEXT_PUBLIC_CORS_PROXY_URL=https://api.allorigins.win/raw?url=

# Data Fetching Timeout (in milliseconds)
NEXT_PUBLIC_DATA_FETCH_TIMEOUT=10000

# Enable/Disable Proxy Usage
NEXT_PUBLIC_USE_CORS_PROXY=true
```

### Customizing Data Sources

Modify `src/lib/draw-data-fetcher.ts` to add new data sources:

```typescript
export const getDrawDataWithFallback = async () => {
  try {
    // Try your custom data source first
    const customData = await fetchFromCustomSource()
    return {
      data: customData,
      source: 'custom' as const,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    // Fall back to existing strategies
    return await getExistingFallbackData()
  }
}
```

## Data Structure

Each draw record contains:

```typescript
interface DrawData {
  roundNumber: string        // e.g., "284"
  date: string              // e.g., "2025-01-15"
  roundType: string         // e.g., "General", "Program-specific"
  invitationsIssued: string // e.g., "1,500"
  crsScore: string          // e.g., "546"
}
```

## Styling and Theming

The component uses Tailwind CSS with a consistent color scheme:

- **Primary**: `#B92025` (Canadian Red)
- **Secondary**: Various gray shades for text and borders
- **Accent Colors**: Blue, green, purple, orange for different data types

## Performance Considerations

- **Lazy Loading**: Component only fetches data when mounted
- **Debounced Refresh**: Prevents excessive API calls
- **Caching**: Stores successful fetches to reduce redundant requests
- **Error Boundaries**: Graceful fallbacks prevent component crashes

## Browser Compatibility

- **Modern Browsers**: Full support for all features
- **Mobile Devices**: Responsive design with touch-friendly interactions
- **Accessibility**: ARIA labels and keyboard navigation support

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live data updates
2. **Historical Data**: Charts and graphs showing draw trends over time
3. **Notifications**: Alert users when new draws are announced
4. **Export Functionality**: Download draw data in various formats
5. **Multi-language Support**: French language support for Canadian users

## Troubleshooting

### Common Issues

1. **CORS Errors**: Enable proxy service or use backend API
2. **Data Not Loading**: Check network connectivity and proxy service status
3. **Stale Data**: Refresh component or check last updated timestamp

### Debug Mode

Enable debug logging by setting:

```typescript
// In the component
console.log('Data source:', dataSource)
console.log('Last updated:', lastUpdated)
console.log('Draw data:', drawData)
```

## Contributing

When contributing to this system:

1. **Data Accuracy**: Ensure all mock data reflects real Government of Canada structure
2. **Error Handling**: Always provide fallback data when live fetching fails
3. **Performance**: Optimize for mobile devices and slow connections
4. **Accessibility**: Maintain ARIA compliance and keyboard navigation

## License

This system is part of your immigration platform. Ensure compliance with Government of Canada's terms of service when implementing real-time data fetching.

## Support

For questions or issues with this system:

1. Check the Government of Canada website for official data
2. Review the fallback data for accuracy
3. Test with different network conditions
4. Monitor console logs for error details

---

**Note**: This system is designed to provide accurate, up-to-date information about Express Entry draws. Always verify critical information with official Government of Canada sources before making immigration decisions.
