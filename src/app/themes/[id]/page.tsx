'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

interface Theme {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  category: string
  features: string[]
  screenshots: string[]
  demoUrl: string
  technicalDetails: {
    framework: string
    responsive: boolean
    browserSupport: string[]
    lastUpdate: string
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const theme = await prisma.theme.findUnique({
    where: { id: params.id },
  })

  if (!theme) {
    return {
      title: 'Theme Not Found',
      description: 'The requested theme could not be found.',
    }
  }

  return {
    title: `${theme.name} - WordPress Theme`,
    description: theme.description,
    openGraph: {
      title: `${theme.name} - WordPress Theme`,
      description: theme.description,
      images: [
        {
          url: theme.image,
          width: 1200,
          height: 630,
          alt: theme.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${theme.name} - WordPress Theme`,
      description: theme.description,
      images: [theme.image],
    },
  }
}

export default function ThemeDetail({ params }: { params: { id: string } }) {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch(`/api/themes/${params.id}`)
        if (!response.ok) throw new Error('Theme not found')
        const data = await response.json()
        setTheme(data.theme)
      } catch (error) {
        console.error('Error fetching theme:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTheme()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!theme) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Theme not found</h1>
        <Link
          href="/themes"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Back to themes
        </Link>
      </div>
    )
  }

  const handlePurchase = async () => {
    if (!session) {
      router.push('/signin')
      return
    }

    // Implement purchase logic here
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          themeId: theme.id,
          price: theme.price,
        }),
      })

      if (!response.ok) throw new Error('Failed to create order')

      const data = await response.json()
      router.push(`/dashboard?tab=orders&order=${data.order.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
      // Show error message to user
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Theme Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{theme.name}</h1>
              <p className="text-gray-600 mb-6">{theme.description}</p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-gray-900">${theme.price}</span>
                <button
                  onClick={handlePurchase}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Purchase Now
                </button>
              </div>
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {theme.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <Image
                  src={theme.screenshots[0]}
                  alt={`${theme.name} preview`}
                  width={800}
                  height={450}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Theme Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">{theme.longDescription}</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Framework</dt>
                  <dd className="mt-1 text-sm text-gray-900">{theme.technicalDetails.framework}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Responsive</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {theme.technicalDetails.responsive ? 'Yes' : 'No'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Browser Support</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {theme.technicalDetails.browserSupport.join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Update</dt>
                  <dd className="mt-1 text-sm text-gray-900">{theme.technicalDetails.lastUpdate}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theme.screenshots.map((screenshot, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <Image
                  src={screenshot}
                  alt={`${theme.name} screenshot ${index + 1}`}
                  width={400}
                  height={225}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 