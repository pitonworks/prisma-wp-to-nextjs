'use client'

import { motion as m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiMaximize2 } from 'react-icons/fi'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Theme {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  sales: number
}

interface ApiResponse {
  themes: Theme[]
  error?: string
}

const categories = [
  'All',
  'Portfolio',
  'E-commerce',
  'Blog',
  'Corporate',
  'Restaurant',
  'Real Estate',
]

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Most Popular', value: 'popular' },
]

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return;

    const fetchThemes = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/themes')
        if (!response.ok) throw new Error('Failed to fetch themes')
        const data = await response.json()
        setThemes(data.themes)
      } catch (error) {
        console.error('Error fetching themes:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch themes')
      } finally {
        setLoading(false)
      }
    }

    fetchThemes()
  }, [mounted])

  if (!mounted) {
    return (
      <main className="min-h-screen p-4 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-slow" />
      </div>

      {/* Main Container */}
      <div className="container mx-auto p-4">
        {/* Main Content Box */}
        <m.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <Header />

          {/* Themes Content */}
          <div className="px-8 py-12">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Website Themes
              </h1>
              <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Browse our collection of premium website themes. Each theme is crafted with attention to detail, 
                optimized for performance, and designed to help your website stand out.
              </p>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search themes..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    suppressHydrationWarning
                    autoComplete="off"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <FiFilter />
                  Filter
                </button>
              </div>

              {/* Themes Grid */}
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-600">{error}</div>
              ) : themes.length === 0 ? (
                <div className="text-center text-gray-600">No themes found</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {themes.map((theme) => (
                    <m.div
                      key={theme.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={theme.image}
                          alt={theme.name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                        <Link
                          href={`/themes/${theme.id}`}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        >
                          <FiMaximize2 className="w-6 h-6" />
                        </Link>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{theme.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{theme.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${theme.price}
                          </span>
                          <Link
                            href={`/themes/${theme.id}`}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </m.div>
      </div>
    </main>
  )
} 