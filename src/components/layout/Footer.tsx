import Link from 'next/link'
import { FiGithub, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-lg border-t border-gray-100/20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Piton Themes
            </Link>
            <p className="mt-4 text-gray-600">
              Premium WordPress themes for your success. Beautifully designed, fully customizable, and SEO-optimized.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/themes" className="text-gray-600 hover:text-blue-600 transition-colors">WordPress Themes</Link></li>
              <li><Link href="/plugins" className="text-gray-600 hover:text-blue-600 transition-colors">Plugins</Link></li>
              <li><Link href="/templates" className="text-gray-600 hover:text-blue-600 transition-colors">Templates</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link href="/documentation" className="text-gray-600 hover:text-blue-600 transition-colors">Documentation</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">Community</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Piton Themes. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 