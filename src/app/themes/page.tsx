'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Metadata } from 'next'

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

export const metadata: Metadata = {
  title: 'WordPress Themes',
  description: 'Browse our collection of premium WordPress themes. Find the perfect theme for your website.',
  openGraph: {
    title: 'WordPress Themes | Prisma Themes',
    description: 'Browse our collection of premium WordPress themes. Find the perfect theme for your website.',
    images: [
      {
        url: '/themes/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prisma Themes Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Themes | Prisma Themes',
    description: 'Browse our collection of premium WordPress themes. Find the perfect theme for your website.',
    images: ['/themes/twitter-image.jpg'],
  },
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('category') || 'All'
    const sort = searchParams.get('sort') || 'newest'
    const query = searchParams.get('q') || ''

    setSelectedCategory(category)
    setSortBy(sort)
    setSearchQuery(query)

    fetchThemes(category, sort, query)
  }, [searchParams])

  const fetchThemes = async (category: string, sort: string, query: string) => {
    try {
      const params = new URLSearchParams()
      if (category !== 'All') params.append('category', category)
      if (sort !== 'newest') params.append('sort', sort)
      if (query) params.append('q', query)

      const response = await fetch(`/api/themes?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch themes')
      const data = await response.json()
      setThemes(data.themes)
    } catch (error) {
      console.error('Error fetching themes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/themes?${params.toString()}`)
  }

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    if (sort === 'newest') {
      params.delete('sort')
    } else {
      params.set('sort', sort)
    }
    router.push(`/themes?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (!searchQuery) {
      params.delete('q')
    } else {
      params.set('q', searchQuery)
    }
    router.push(`/themes?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WordPress Themes</h1>
          <p className="mt-2 text-gray-600">
            Discover our collection of premium WordPress themes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <form onSubmit={handleSearch}>
                <label htmlFor="search" className="sr-only">
                  Search themes
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Search themes..."
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                name="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/themes/${theme.id}`}
              className="group"
            >
              <div className="bg-white shadow rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    width={600}
                    height={338}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {theme.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {theme.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${theme.price}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.714 1.35-7.858L.72 7.012l7.88-1.145L10 0l2.4 5.867 7.88 1.145-5.56 5.429 1.35 7.858z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">
                          {theme.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {theme.sales} sales
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 