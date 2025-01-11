'use client'

import { motion as m, useScroll, useTransform } from 'framer-motion'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiFilter, FiMaximize2, FiDownload, FiHeart, FiShoppingCart, FiGithub, FiTwitter, FiFacebook, FiMail, FiPhone, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

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
  success: boolean
  error?: string
}

// Testimonials data moved outside component to ensure consistency
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "The customization options are incredible. I was able to create exactly what I envisioned for my client's website."
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    content: "The support team is amazing. They helped me set up my e-commerce site quickly and efficiently."
  },
  {
    name: "Emily Davis",
    role: "Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "Performance is outstanding. My blog loads faster than ever, and my readers love the clean design."
  }
]

// Statistics data moved outside component
const statistics = [
  { label: "Happy Customers", value: "10,000+" },
  { label: "Themes Sold", value: "50,000+" },
  { label: "Average Rating", value: "4.9/5" },
  { label: "Support Tickets Resolved", value: "99.9%" }
]

// Quick Search Component
const QuickSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-8"
    >
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search themes..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            suppressHydrationWarning
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
    </m.div>
  )
}

// Theme Preview Modal
const ThemePreview = ({ theme, isOpen, onClose }: { theme: Theme | null, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen || !theme) return null

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{theme.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Image
          src={theme.image}
          alt={theme.name}
          width={800}
          height={450}
          className="rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">{theme.description}</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiShoppingCart /> Buy Now - ${theme.price}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FiHeart /> Add to Wishlist
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FiDownload /> Live Demo
          </button>
        </div>
      </m.div>
    </m.div>
  )
}

// Theme Comparison Tool
const ThemeComparison = ({ themes }: { themes: Theme[] }) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])

  const toggleTheme = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : prev.length < 3
          ? [...prev, themeId]
          : prev
    )
  }

  const selectedThemesData = themes.filter(theme => selectedThemes.includes(theme.id))

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 max-w-4xl mx-auto"
    >
      <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Compare Themes</h3>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto font-medium">
        Select up to three themes to compare their features, pricing, and performance metrics side by side.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => toggleTheme(theme.id)}
            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
              selectedThemes.includes(theme.id)
                ? 'border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
      {selectedThemesData.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100/20">
                  <th className="py-4 px-6 text-left text-gray-500 font-semibold">Feature</th>
                  {selectedThemesData.map(theme => (
                    <th key={theme.id} className="py-4 px-6 text-left">
                      <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {theme.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100/20">
                  <td className="py-4 px-6 font-medium text-gray-700">Price</td>
                  {selectedThemesData.map(theme => (
                    <td key={theme.id} className="py-4 px-6">
                      <span className="font-bold text-blue-600">${theme.price}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100/20">
                  <td className="py-4 px-6 font-medium text-gray-700">Rating</td>
                  {selectedThemesData.map(theme => (
                    <td key={theme.id} className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600">{theme.rating}</span>
                        <span className="text-gray-600">/5</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(theme.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100/20">
                  <td className="py-4 px-6 font-medium text-gray-700">Sales</td>
                  {selectedThemesData.map(theme => (
                    <td key={theme.id} className="py-4 px-6">
                      <span className="font-bold text-blue-600">{theme.sales.toLocaleString()}</span>
                      <span className="text-gray-600 text-sm ml-1">copies</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </m.div>
  )
}

// Parallax Background Component
const ParallaxBackground = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  
  return (
    <m.div
      ref={ref}
      style={{ y, opacity }}
      className="absolute inset-0 -z-10"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/50 to-blue-900/90" />
    </m.div>
  )
}

// Floating Elements Animation
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => {
  return (
    <m.div
      animate={{
        y: [0, -10, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay
        }
      }}
    >
      {children}
    </m.div>
  )
}

interface FloatingCircle {
  width: number;
  height: number;
  background: string;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

// Add slider images data
const themeGallery = [
  {
    url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    alt: "Modern Portfolio Theme"
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    alt: "E-commerce Theme"
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Business Theme"
  },
  {
    url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    alt: "Creative Blog Theme"
  }
]

// Add ImageSlider component
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % themeGallery.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + themeGallery.length) % themeGallery.length)
  }

  return (
    <div className="relative w-full max-w-5xl h-[500px] mx-auto mb-8">
      <m.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full rounded-xl overflow-hidden"
      >
        <Image
          src={themeGallery[currentIndex].url}
          alt={themeGallery[currentIndex].alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </m.div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {themeGallery.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [featuredThemes, setFeaturedThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [floatingCircles, setFloatingCircles] = useState<FloatingCircle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return;

    // Initialize floating circles with deterministic values
    const circles = Array.from({ length: 20 }, (_, i) => ({
      width: 100 + ((i * 300) % 400),
      height: 100 + ((i * 300) % 400),
      background: `radial-gradient(circle, rgba(${(i * 50) % 255}, ${(i * 70) % 255}, ${(i * 90) % 255}, 0.4) 0%, transparent 70%)`,
      left: (i * 5) % 100,
      top: (i * 5) % 100,
      animationDelay: i * 0.5,
      animationDuration: 10 + (i % 10)
    }));
    setFloatingCircles(circles);
  }, [mounted])

  useEffect(() => {
    if (!mounted) return;

    const fetchFeaturedThemes = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/themes?sort=popular&limit=3')
        
        if (!response.ok) {
          throw new Error('Failed to fetch themes')
        }
        
        const data: ApiResponse = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch themes')
        }
        
        setFeaturedThemes(data.themes)
      } catch (error) {
        console.error('Error fetching featured themes:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch themes')
        setFeaturedThemes([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedThemes()
  }, [mounted])

  const handleSearch = async (query: string) => {
    if (!mounted) return;
    
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/themes?query=${query}&limit=3`)
      if (!response.ok) throw new Error('Failed to fetch themes')
      const data: ApiResponse = await response.json()
      if (!data.success) throw new Error(data.error || 'Failed to fetch themes')
      setFeaturedThemes(data.themes)
    } catch (error) {
      console.error('Error searching themes:', error)
      setError(error instanceof Error ? error.message : 'Failed to search themes')
      setFeaturedThemes([])
    } finally {
      setLoading(false)
    }
  }

  const openPreview = (theme: Theme) => {
    if (!mounted) return;
    setSelectedTheme(theme)
    setIsPreviewOpen(true)
  }

  // Wrap the main content in a client-side only component
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
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-slow" />
        {mounted && (
          <div className="absolute inset-0">
            {floatingCircles.map((circle, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-overlay filter blur-xl animate-float"
                style={{
                  width: `${circle.width}px`,
                  height: `${circle.height}px`,
                  background: circle.background,
                  left: `${circle.left}%`,
                  top: `${circle.top}%`,
                  animationDelay: `${circle.animationDelay}s`,
                  animationDuration: `${circle.animationDuration}s`
                }}
              />
            ))}
          </div>
        )}
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

          {/* Hero Section */}
          <div className="relative px-8 py-24 border-b border-gray-100/20 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-pink-900/80 mix-blend-overlay" />
              <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>
            <div className="relative max-w-5xl mx-auto text-center">
              <m.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
              >
                Piton Themes
              </m.h1>
              <m.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Discover beautifully designed, fully customizable and SEO-optimized website themes that help your website stand out from the crowd.
              </m.p>
              <m.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center gap-4"
              >
                <Link 
                  href="/themes" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Browse Themes
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Contact Us
                </Link>
              </m.div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-8 py-6">
            <QuickSearch onSearch={handleSearch} />
          </div>

          {/* Featured Themes */}
          <div className="px-8 py-12 border-t border-gray-100/20">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Featured Themes</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto font-medium">
              Discover our handpicked collection of premium website themes, crafted with attention to detail and optimized for performance. Each theme is designed to provide the perfect foundation for your next project.
            </p>
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : featuredThemes.length === 0 ? (
              <div className="text-center text-gray-600">No themes found</div>
            ) : (
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredThemes.map((theme) => (
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
                      <button
                        onClick={() => openPreview(theme)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <FiMaximize2 className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{theme.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{theme.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${theme.price}</span>
                        <button
                          onClick={() => openPreview(theme)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            )}
          </div>

          {/* Theme Comparison */}
          {!loading && !error && featuredThemes.length > 0 && (
            <div className="px-8 py-12 border-t border-gray-100/20">
              <ThemeComparison themes={featuredThemes} />
            </div>
          )}

          {/* Features Section */}
          <div className="px-8 py-12 border-t border-gray-100/20 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Our Themes?
              </h2>
              <p className="text-xl font-medium text-gray-800 mb-2">
                Crafted for Excellence, Designed for Success
              </p>
              <p className="text-gray-600">
                Our WordPress themes are built with modern design principles, optimized performance, and exceptional user experience in mind.
              </p>
            </div>

            <ImageSlider />

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">
                  <FiMaximize2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Responsive Design</h3>
                <p className="text-gray-600">
                  Perfectly optimized for all devices and screen sizes, ensuring your website looks stunning everywhere.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-purple-600 mb-4">
                  <FiFilter className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Customization</h3>
                <p className="text-gray-600">
                  Intuitive customization options that let you create your perfect website without coding knowledge.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-pink-600 mb-4">
                  <FiHeart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Premium Support</h3>
                <p className="text-gray-600">
                  Dedicated support team ready to help you with any questions or customization needs.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-green-600 mb-4">
                  <FiGithub className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">SEO Optimized</h3>
                <p className="text-gray-600">
                  Built with search engine optimization in mind, helping your website rank higher in search results.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-orange-600 mb-4">
                  <FiShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">E-commerce Ready</h3>
                <p className="text-gray-600">
                  Fully compatible with WooCommerce, making it easy to set up and manage your online store.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-teal-600 mb-4">
                  <FiMail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Regular Updates</h3>
                <p className="text-gray-600">
                  Continuous updates and improvements to ensure compatibility with the latest WordPress versions.
                </p>
              </m.div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="px-8 py-12 border-t border-gray-100/20 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-blue-600/5">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their experience with our themes.
            </p>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.content}</p>
                </m.div>
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="relative overflow-hidden border-t border-gray-100/20">
            <ParallaxBackground />
            <div className="relative px-8 py-12">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {statistics.map((stat, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center text-white"
                  >
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </m.div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-100/20 bg-gradient-to-br from-white/50 via-white/30 to-blue-50/50">
            <div className="px-8 py-12">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stay Updated</h2>
                <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest themes and exclusive offers.</p>
                <form className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    suppressHydrationWarning
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="px-8 py-12 border-t border-gray-100/20 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Piton Themes
              </h2>
              <p className="text-xl text-center text-gray-600 mb-12">
                Crafting Digital Excellence from Turkey and Cyprus
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-gray-800">Our Story</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Founded with a vision to revolutionize digital experiences, Piton Themes has emerged as a leading force in website development and design. With offices in Eskişehir, Turkey and Lefkoşa, Cyprus, we bring together the best of both worlds - Turkish innovation and Mediterranean creativity.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our team of expert developers and designers specializes in creating cutting-edge website themes that combine aesthetic excellence with technical perfection. We're proud to serve clients globally while maintaining our roots in Turkish and Cypriot tech innovation.
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-gray-800">Advanced Technology Projects</h3>
                  <div className="space-y-4">
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">AI-Powered Theme Customization</h4>
                      <p className="text-gray-600">Implementing advanced AI algorithms for intelligent theme personalization</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">Cloud-Native Architecture</h4>
                      <p className="text-gray-600">Developing scalable, high-performance themes using modern cloud technologies</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">Advanced E-commerce Solutions</h4>
                      <p className="text-gray-600">Creating sophisticated online shopping experiences with cutting-edge features</p>
                    </div>
                  </div>
                </m.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FiMail className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-800 font-medium">info@pitonthemes.com</p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FiPhone className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-800 font-medium">+90 533 820 51 49</p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-800 font-medium">Eskişehir, Turkey</p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-800 font-medium">Lefkoşa, Cyprus</p>
                </m.div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </m.div>
      </div>

      {/* Theme Preview Modal */}
      <ThemePreview
        theme={selectedTheme}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </main>
  )
}
