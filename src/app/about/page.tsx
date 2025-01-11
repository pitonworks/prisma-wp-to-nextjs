'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiUsers, FiAward, FiThumbsUp } from 'react-icons/fi'

const stats = [
  {
    icon: FiUsers,
    value: '10K+',
    label: 'Happy Customers'
  },
  {
    icon: FiAward,
    value: '100+',
    label: 'Premium Themes'
  },
  {
    icon: FiThumbsUp,
    value: '99%',
    label: 'Satisfaction Rate'
  }
]

export default function AboutPage() {
  return (
    <div className="py-12 bg-gray-50">
      {/* Hero Section */}
      <div className="mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                About ThemeStore
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                We're passionate about creating beautiful, functional WordPress themes that help businesses and individuals succeed online.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="mt-12 mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Founded in 2020, ThemeStore started with a simple mission: to make professional web design accessible to everyone. We believe that every business, regardless of size, deserves a beautiful and functional website.
                </p>
                <p className="mt-4">
                  Our team of passionate designers and developers work tirelessly to create WordPress themes that not only look great but also deliver exceptional performance and user experience.
                </p>
                <p className="mt-4">
                  Today, we're proud to serve thousands of customers worldwide, helping them build their online presence with our premium WordPress themes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Browse our collection of premium WordPress themes and find the perfect one for your website.
              </p>
              <Link
                href="/themes"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                View Themes
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 