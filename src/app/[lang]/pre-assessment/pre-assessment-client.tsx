"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, baseUrl: string) => void
  }
}

export function PreAssessmentClient() {
  useEffect(() => {
    // Load JotForm script
    let script1: HTMLScriptElement | null = document.querySelector('script[src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"]') as HTMLScriptElement
    
    if (!script1) {
      script1 = document.createElement("script")
      script1.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
      script1.async = true
      document.body.appendChild(script1)
    }

    // Wait for script to load, then initialize
    const initJotForm = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler("iframe[id='JotFormIFrame-212148606229252']", "https://form.jotform.com/")
      } else {
        setTimeout(initJotForm, 100)
      }
    }

    if (script1) {
      // Check if script is already loaded
      if (window.jotformEmbedHandler) {
        initJotForm()
      } else {
        script1.addEventListener("load", initJotForm)
      }
    } else {
      initJotForm()
    }
  }, [])

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 md:p-6 bg-gray-50">
              <div className="bg-white rounded-lg overflow-hidden">
                <iframe
                  id="JotFormIFrame-212148606229252"
                  title="Pre-Assessment Form"
                  allowTransparency={true}
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://form.jotform.com/212148606229252"
                  frameBorder="0"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    height: "539px",
                    border: "none",
                  }}
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

