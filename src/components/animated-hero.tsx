"use client"

import { motion } from "framer-motion"

interface AnimatedHeroProps {
  title: string
  subtitle?: string
}

export function AnimatedHero({ title, subtitle }: AnimatedHeroProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2c2b2b]"
      >
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-[#2c2b2b]/70"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}


