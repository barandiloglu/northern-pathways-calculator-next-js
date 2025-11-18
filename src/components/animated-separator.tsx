"use client"

import { motion } from "framer-motion"

export function AnimatedSeparator() {
  return (
    <section className="bg-gradient-to-b from-white via-[#f9f9f9] to-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-brand-red to-transparent flex-1 max-w-xs"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="w-3 h-3 rounded-full bg-brand-red flex-shrink-0"
          />
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-brand-red to-transparent flex-1 max-w-xs"
          />
        </div>
      </div>
    </section>
  )
}

