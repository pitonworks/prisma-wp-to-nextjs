'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Theme {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export default function Home() {
  const [featuredThemes, setFeaturedThemes] = useState<Theme[]>([])

  useEffect(() => {
    const fetchFeaturedThemes = async () => {
      try {
        const response = await fetch('/api/themes?sort=popular&limit=3')
        const data = await response.json()
        setFeaturedThemes(data.themes)
      } catch (error) {
        console.error('Error fetching featured themes:', error)
      }
    }

    fetchFeaturedThemes()
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/themes/desktop.png"
            alt="Background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium WordPress Themes
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            Discover our collection of modern, responsive, and feature-rich WordPress themes.
            Perfect for any type of website.
          </p>
          <div className="mt-10">
            <Link
              href="/themes"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Browse Themes
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Themes */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Themes
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Our most popular and highly-rated WordPress themes
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredThemes.map((theme) => (
              <Link
                key={theme.id}
                href={`/themes/${theme.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <Image
                      src={theme.image}
                      alt={theme.name}
                      fill
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
                    <div className="mt-4">
                      <span className="text-lg font-bold text-gray-900">
                        ${theme.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/themes"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Themes
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Themes?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Responsive Design</h3>
              <p className="mt-2 text-gray-600">
                All our themes are fully responsive and look great on any device.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Fast Performance</h3>
              <p className="mt-2 text-gray-600">
                Optimized code and assets for lightning-fast loading speeds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Premium Support</h3>
              <p className="mt-2 text-gray-600">
                Dedicated support team to help you with any questions or issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
