"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return
    // Defer to allow layout paints before scrolling
    const scrollInstant = () => {
      try {
        // Scroll window
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
        // Also reset the root scrolling element/body just in case
        const root = document.scrollingElement || document.documentElement
        root.scrollTo({ top: 0, left: 0, behavior: "auto" })
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      } catch {
        // no-op
      }
    }

    // Run after paint
    const id = requestAnimationFrame(scrollInstant)
    // Fallback after a tick (covers some mobile browsers)
    const timeout = setTimeout(scrollInstant, 0)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(timeout)
    }
  }, [pathname])

  return null
}


