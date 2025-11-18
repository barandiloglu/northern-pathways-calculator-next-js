"use client"

import { useEffect } from "react"

export function BookConsultationClient() {
  useEffect(() => {
    // Load Acuity Scheduling embed script
    let script: HTMLScriptElement | null = document.querySelector('script[src="https://embed.acuityscheduling.com/js/embed.js"]') as HTMLScriptElement
    
    if (!script) {
      script = document.createElement("script")
      script.src = "https://embed.acuityscheduling.com/js/embed.js"
      script.type = "text/javascript"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 md:p-6 bg-gray-50">
              <div className="bg-white rounded-lg overflow-hidden">
                <iframe
                  src="https://app.acuityscheduling.com/schedule.php?owner=18417971&ref=embedded_csp"
                  title="Schedule Appointment"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  allow="payment"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

