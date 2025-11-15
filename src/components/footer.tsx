"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <footer className="bg-gradient-to-r from-brand-red via-brand-maroon to-brand-maroon text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">Northern Pathways</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                Expert guidance for your immigration needs. We help you navigate the path to your new life in Canada.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/northern-pathways-immigration-consulting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/northernpathways/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
            <div className="space-y-4">
              <Link href="/en" className="block text-white/90 hover:text-white transition-colors duration-200">
                Services
              </Link>
              <Link href="/en" className="block text-white/90 hover:text-white transition-colors duration-200">
                Why Us
              </Link>
              <Link href="/en" className="block text-white/90 hover:text-white transition-colors duration-200">
                About Us
              </Link>
              <Link href="/en" className="block text-white/90 hover:text-white transition-colors duration-200">
                Testimonials
              </Link>
              <Link href="/en/crs-calculator" className="block text-white/90 hover:text-white transition-colors duration-200">
                Tools
              </Link>
              <Link href="/en" className="block text-white/90 hover:text-white transition-colors duration-200">
                FAQ
              </Link>
            </div>
          </motion.div>

          {/* Contact Us */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-white mb-1">Address:</p>
                <div className="text-white/90">
                  <p>5200 Yonge Street, 2nd floor</p>
                  <p>North York, ON, M2N 5P6, Canada</p>
                </div>
              </div>
              
              <div>
                <p className="font-bold text-white mb-1">Hours:</p>
                <p className="text-white/90">Mon - Fri: 9:00 AM - 5:00 PM EST</p>
              </div>
              
              <div>
                <p className="font-bold text-white mb-1">Email:</p>
                <a href="mailto:info@northernpathways.ca" className="text-white/90 hover:text-white transition-colors">
                  info@northernpathways.ca
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-full h-px bg-white/20"></div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-white/80 text-sm">
            © 2025 Northern Pathways Immigration Consulting. All Rights Reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
