'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop',
    bio: 'John has over 15 years of experience in web development and WordPress theme design.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Sarah Johnson',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop',
    bio: 'Sarah brings creative vision to life with her exceptional design skills and attention to detail.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Michael Chen',
    role: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=250&auto=format&fit=crop',
    bio: 'Michael specializes in creating efficient and scalable WordPress themes.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Emily Brown',
    role: 'Support Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop',
    bio: 'Emily ensures our customers receive the best possible support and assistance.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'David Wilson',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
    bio: 'David focuses on creating intuitive and user-friendly interfaces for our themes.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Lisa Anderson',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    bio: 'Lisa helps spread the word about our amazing themes and builds our community.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  }
]

export default function TeamPage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="mx-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                The talented people behind our successful WordPress themes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                      >
                        <FiTwitter className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                      >
                        <FiLinkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.github}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                      >
                        <FiGithub className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join the Team Section */}
      <div className="mt-12 mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
              <p className="text-xl text-gray-600 mb-8">
                We're always looking for talented individuals to join our team. Check out our open positions!
              </p>
              <a
                href="/careers"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                View Openings
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 