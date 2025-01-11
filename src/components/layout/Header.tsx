'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="w-full border-b border-gray-100/20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center"
      >
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Piton Themes
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/themes" className="text-gray-600 hover:text-blue-600 transition-colors">
            Themes
          </Link>
          <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </header>
  )
} 