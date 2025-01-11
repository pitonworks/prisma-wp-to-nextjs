'use client'

import { motion } from 'framer-motion'
import { FiUsers, FiTrendingUp, FiAward, FiThumbsUp, FiStar, FiTrendingDown, FiCheckCircle, FiGlobe } from 'react-icons/fi'
import Image from 'next/image'

const stats = [
  {
    title: "Customer Satisfaction",
    value: 95,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Growth Rate",
    value: 85,
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Theme Performance",
    value: 90,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Support Response",
    value: 98,
    color: "from-pink-500 to-pink-600"
  }
]

const features = [
  {
    icon: FiUsers,
    title: "Active Users",
    description: "Over 50,000 active users trust our themes for their websites",
    stats: "50K+"
  },
  {
    icon: FiTrendingUp,
    title: "Monthly Growth",
    description: "Consistent growth in theme downloads and user adoption",
    stats: "25%"
  },
  {
    icon: FiAward,
    title: "Awards Won",
    description: "Recognition for design excellence and innovation",
    stats: "15+"
  },
  {
    icon: FiThumbsUp,
    title: "Positive Reviews",
    description: "Highly rated themes with excellent user feedback",
    stats: "10K+"
  },
  {
    icon: FiStar,
    title: "Theme Rating",
    description: "Average rating across all our premium themes",
    stats: "4.9/5"
  }
]

const achievements = [
  {
    year: "2023",
    title: "Best WordPress Theme Provider",
    description: "Recognized for exceptional theme quality and customer service",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2022",
    title: "Innovation in Web Design",
    description: "Awarded for bringing creative solutions to WordPress themes",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2021",
    title: "Customer Choice Award",
    description: "Voted #1 theme provider by WordPress community",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
  }
]

const globalStats = [
  {
    region: "North America",
    users: "25K+",
    growth: "+45%"
  },
  {
    region: "Europe",
    users: "15K+",
    growth: "+35%"
  },
  {
    region: "Asia",
    users: "10K+",
    growth: "+55%"
  }
]

const CircularProgress = ({ value, color }: { value: number, color: string }) => {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="72"
          cy="72"
        />
        <circle
          className="text-blue-500"
          style={{ backgroundImage: `linear-gradient(to right, ${color})` }}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="72"
          cy="72"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-3xl font-bold">{value}%</span>
      </div>
    </div>
  )
}

export default function StatisticsPage() {
  return (
    <div className="py-8 bg-gray-50">
      {/* Header Section */}
      <div className="mx-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Our Performance Metrics
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Track our growth and success through comprehensive statistics and performance indicators.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bars Section */}
      <div className="mx-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all"
                >
                  <CircularProgress value={stat.value} color={stat.color} />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">{stat.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Grid Section */}
      <div className="mx-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {feature.stats}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements Timeline Section */}
      <div className="mx-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      fill
                      className="rounded-xl object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <div className="text-sm font-semibold text-blue-600 mb-2">{achievement.year}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global Presence Section */}
      <div className="mx-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Global Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {globalStats.map((stat, index) => (
                <motion.div
                  key={stat.region}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl text-white hover:bg-opacity-20 transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4">{stat.region}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold mb-1">{stat.users}</div>
                      <div className="text-sm opacity-80">Active Users</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{stat.growth}</div>
                      <div className="text-sm opacity-80">Annual Growth</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 