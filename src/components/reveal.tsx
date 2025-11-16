"use client"

import { motion, type Variants, useInView } from "framer-motion"
import { type PropsWithChildren, useEffect, useRef, useState } from "react"

interface RevealProps extends PropsWithChildren {
  className?: string
  delay?: number
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px", once: true })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (inView) setShow(true)
  }, [inView])

  // Fallback: if something prevents IntersectionObserver from firing,
  // reveal after a short delay when landing near the top.
  useEffect(() => {
    const id = setTimeout(() => {
      if (!show && typeof window !== "undefined" && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9) setShow(true)
      }
    }, 200)
    return () => clearTimeout(id)
  }, [show])

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}


