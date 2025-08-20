"use client"

import { useEffect, useState } from "react"

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Prevent hydration mismatch by only rendering children after client-side hydration
  if (!isClient) {
    return null
  }

  return <>{children}</>
}
