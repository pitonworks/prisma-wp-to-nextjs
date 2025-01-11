'use client'

import { motion } from 'framer-motion'
import { FiLayout, FiSmartphone, FiShoppingCart, FiSearch, FiSettings, FiLock, FiGlobe, FiAward } from 'react-icons/fi'

const features = [
  {
    icon: FiLayout,
    title: 'Responsive Design',
    description: 'All our themes are fully responsive and look great on any device, from mobile to desktop.'
  },
  {
    icon: FiSmartphone,
    title: 'Mobile First',
    description: 'Built with a mobile-first approach to ensure optimal performance on smartphones and tablets.'
  },
  {
    icon: FiShoppingCart,
    title: 'E-commerce Ready',
    description: 'Integrated with WooCommerce for a seamless online shopping experience.'
  },
  {
    icon: FiSearch,
    title: 'SEO Optimized',
    description: 'Built with SEO best practices to help your website rank better in search engines.'
  },
  {
    icon: FiSettings,
    title: 'Easy Customization',
    description: 'Intuitive customization options that make it easy to adjust your site to your needs.'
  },
  {
    icon: FiLock,
    title: 'Security First',
    description: 'Built with security in mind, following WordPress security best practices.'
  },
  {
    icon: FiGlobe,
    title: 'Multi-language',
    description: 'Ready for translation and compatible with popular translation plugins.'
  },
  {
    icon: FiAward,
    title: 'Premium Support',
    description: 'Dedicated support team to help you with any questions or issues.'
  }
]

export default function FeaturesPage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="mx-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Your Website
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Our themes come packed with features to help you build the perfect website
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Choose from our collection of premium themes and start building your website today.
              </p>
              <a
                href="/themes"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Browse Themes
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 