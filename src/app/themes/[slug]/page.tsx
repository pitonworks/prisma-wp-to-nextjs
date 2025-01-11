import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Bu veriyi gerçek bir API'den alacaksınız
const theme = {
  id: 1,
  name: 'Modern Portfolio',
  description: 'Perfect for creative professionals and agencies. Showcase your work with style and elegance.',
  image: '/themes/modern-portfolio.jpg',
  price: '$59',
  category: 'Portfolio',
  features: [
    'Responsive Design',
    'Portfolio Grid & Masonry',
    'Project Case Studies',
    'Blog Integration',
    'Contact Form'
  ],
  demoUrl: '#',
  rating: 4.8,
  sales: 1250,
  longDescription: `
    Create a stunning portfolio website with our Modern Portfolio theme. Perfect for creative professionals, agencies, photographers, and anyone who wants to showcase their work in style.
    
    This theme comes with everything you need to create a professional portfolio website, including multiple portfolio layouts, case study templates, blog support, and a contact form.
  `,
  screenshots: [
    '/themes/modern-portfolio/screenshot-1.jpg',
    '/themes/modern-portfolio/screenshot-2.jpg',
    '/themes/modern-portfolio/screenshot-3.jpg'
  ],
  technicalDetails: {
    wordPressVersion: '6.0+',
    lastUpdate: '2024-01-10',
    documentation: 'Comprehensive PDF & Video',
    support: '6 months included',
    frameworks: ['Bootstrap 5', 'jQuery'],
    browsers: ['Chrome', 'Firefox', 'Safari', 'Edge']
  }
}

export default function ThemeDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/themes" className="text-gray-500 hover:text-gray-700">
                Themes
              </Link>
            </li>
            <li>
              <span className="text-gray-300 px-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">{theme.name}</li>
          </ol>
        </nav>

        {/* Theme Header */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="aspect-h-3 aspect-w-4 rounded-lg overflow-hidden">
              <Image
                src={theme.image}
                alt={theme.name}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {theme.screenshots.map((screenshot, index) => (
                <div key={index} className="aspect-h-3 aspect-w-4 rounded-lg overflow-hidden">
                  <Image
                    src={screenshot}
                    alt={`${theme.name} screenshot ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Theme info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{theme.name}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Theme information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{theme.price}</p>
            </div>

            {/* Rating */}
            <div className="mt-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(theme.rating) ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {theme.rating} ({theme.sales} reviews)
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{theme.longDescription}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <ul className="mt-4 space-y-3">
                {theme.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Details */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900">Technical Details</h3>
              <dl className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">WordPress Version</dt>
                  <dd className="text-gray-900">{theme.technicalDetails.wordPressVersion}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Last Update</dt>
                  <dd className="text-gray-900">{theme.technicalDetails.lastUpdate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Documentation</dt>
                  <dd className="text-gray-900">{theme.technicalDetails.documentation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Support</dt>
                  <dd className="text-gray-900">{theme.technicalDetails.support}</dd>
                </div>
              </dl>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col space-y-4">
              <button className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Purchase Now
              </button>
              <button className="flex-1 bg-gray-100 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Live Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 