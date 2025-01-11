const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Delete existing records
  await prisma.review.deleteMany()
  await prisma.order.deleteMany()
  await prisma.theme.deleteMany()
  await prisma.user.deleteMany()

  const themes = [
    {
      name: 'Modern Portfolio',
      description: 'Elegant and minimalist portfolio theme for creative professionals',
      longDescription: 'Showcase your work with style using our Modern Portfolio theme. Perfect for designers, photographers, and creative professionals who want to make a lasting impression.',
      price: 59,
      category: 'Portfolio',
      sales: 120,
      image: '/images/themes/fox.png',
      screenshots: [
        '/images/themes/fox1.png',
        '/images/themes/fox2.png',
        '/images/themes/fox3.png',
        '/images/themes/fox4.png',
        '/images/themes/fox5.png'
      ],
      features: [
        'Responsive design',
        'Portfolio grid and masonry layouts',
        'Project case study templates',
        'Blog integration',
        'Contact form with validation'
      ]
    },
    {
      name: 'E-Commerce Pro',
      description: 'Feature-rich e-commerce theme for online stores',
      longDescription: 'Launch your online store with our comprehensive E-Commerce Pro theme. Built with performance and conversion in mind.',
      price: 79,
      category: 'E-commerce',
      sales: 85,
      image: '/images/themes/tiger.png',
      screenshots: [
        '/images/themes/python.png',
        '/images/themes/python1.png',
        '/images/themes/python2.png'
      ],
      features: [
        'Product quick view',
        'Advanced filtering and sorting',
        'Wishlist functionality',
        'Multiple payment gateways',
        'Inventory management'
      ]
    },
    {
      name: 'Blog Master',
      description: 'Professional blogging theme with modern features',
      longDescription: 'Take your blog to the next level with our Blog Master theme. Designed for serious bloggers who value readability and engagement.',
      price: 49,
      category: 'Blog',
      sales: 200,
      image: '/images/themes/bear.png',
      screenshots: [
        '/images/themes/bear1.png',
        '/images/themes/bear2.png'
      ],
      features: [
        'Multiple blog layouts',
        'Reading time estimation',
        'Related posts',
        'Newsletter integration',
        'Social sharing buttons'
      ]
    },
    {
      name: 'Corporate Elite',
      description: 'Premium theme for business and corporate websites',
      longDescription: 'Present your business professionally with our Corporate Elite theme. Perfect for companies of all sizes.',
      price: 69,
      category: 'Corporate',
      sales: 150,
      image: '/images/themes/hawk.png',
      screenshots: [
        '/images/themes/hawk1.png',
        '/images/themes/desktop.png'
      ],
      features: [
        'Service showcases',
        'Team member profiles',
        'Testimonial carousel',
        'Case studies section',
        'Integrated appointment booking'
      ]
    },
    {
      name: 'Restaurant Hub',
      description: 'Specialized theme for restaurants and cafes',
      longDescription: 'Showcase your culinary delights with our Restaurant Hub theme. Designed specifically for restaurants, cafes, and food businesses.',
      price: 59,
      category: 'Restaurant',
      sales: 95,
      image: '/images/themes/octopus.png',
      screenshots: [
        '/images/themes/shell.png',
        '/images/themes/shell1.png'
      ],
      features: [
        'Menu management',
        'Table reservations',
        'Food gallery',
        'Special offers section',
        'Integration with food delivery services'
      ]
    },
    {
      name: 'Real Estate Pro',
      description: 'Comprehensive theme for real estate agencies',
      longDescription: 'Showcase your properties effectively with our Real Estate Pro theme. Perfect for real estate agents and agencies.',
      price: 89,
      category: 'Real Estate',
      sales: 75,
      image: '/images/themes/elephant.png',
      screenshots: [
        '/images/themes/elephant1.png',
        '/images/themes/elephant3.png'
      ],
      features: [
        'Property listings',
        'Advanced property search',
        'Virtual tours integration',
        'Agent profiles',
        'Mortgage calculator'
      ]
    }
  ]

  for (const theme of themes) {
    await prisma.theme.create({
      data: theme
    })
  }

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 