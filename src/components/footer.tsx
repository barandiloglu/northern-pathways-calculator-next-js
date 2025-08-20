"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin } from "lucide-react"
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
    <footer className="bg-gradient-to-br from-[#2F2E2E] via-[#1a1a1a] to-[#2F2E2E] text-white">
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
              <div className="w-64 h-64 rounded-lg overflow-hidden">
                <img 
                  src="/logoFooter.png" 
                  alt="Northern Pathways Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Professional immigration assessment tools and expert guidance for your Canadian immigration journey.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#B92025] flex-shrink-0" />
                <div className="text-gray-300">
                  <p>5200 Yonge Street, 2nd floor</p>
                  <p>North York, ON, M2N 5P6</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#B92025] flex-shrink-0" />
                <div className="text-gray-300">
                  <p>info@northernpathways.ca</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[#B92025] flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
            <div className="space-y-4">
              <Link href="/" className="block text-gray-300 hover:text-[#B92025] transition-colors duration-200">
                Home
              </Link>
              <Link href="/crs-calculator" className="block text-gray-300 hover:text-[#B92025] transition-colors duration-200">
                CRS Calculator
              </Link>
              <Link href="/fswp-calculator" className="block text-gray-300 hover:text-[#B92025] transition-colors duration-200">
                FSWP Calculator
              </Link>
              <Link href="https://www.northernpathways.ca/pre-assessment-form" className="block text-gray-300 hover:text-[#B92025] transition-colors duration-200">
                Pre-Assessment
              </Link>
            </div>
            
            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                             <div className="flex space-x-4">
                 <a 
                   href="https://www.linkedin.com/company/northern-pathways-immigration-consulting" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-10 h-10 bg-[#B92025] rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                   title="LinkedIn"
                 >
                   <Linkedin className="h-5 w-5 text-white" />
                 </a>
                 <div className="flex flex-col items-center">
                   <a 
                     href="https://www.instagram.com/northernpathways/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-10 h-10 bg-[#B92025] rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                     title="Instagram (English)"
                   >
                     <Instagram className="h-5 w-5 text-white" />
                   </a>
                   <span className="text-xs text-gray-300 mt-1">EN</span>
                 </div>
                 <div className="flex flex-col items-center">
                   <a 
                     href="https://www.instagram.com/kanadadayeniyasam/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-10 h-10 bg-[#B92025] rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                     title="Instagram (Turkish)"
                   >
                     <Instagram className="h-5 w-5 text-white" />
                   </a>
                   <span className="text-xs text-gray-300 mt-1">TR</span>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.1061436558025!2d-79.41612312269132!3d43.77065544482439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d6dfd6df371%3A0x7f86b41781a6cfd6!2s5200%20Yonge%20St%2C%20North%20York%2C%20ON%20M2N%205P6!5e0!3m2!1sen!2sca!4v1755658607861!5m2!1sen!2sca"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Northern Pathways Immigration Consulting Location"
                className="w-full h-80"
              />
            </div>
            
            {/* Notice */}
            <div className="mt-6 p-4 bg-[#B92025]/10 border border-[#B92025]/20 rounded-lg">
              <p className="text-sm text-gray-300 text-center">
                <strong>Please note:</strong> We do not accept walk-in appointments. 
                Kindly book your consultation in advance.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Northern Pathways Immigration Consulting Inc. All Rights Reserved.
            </div>
            
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
