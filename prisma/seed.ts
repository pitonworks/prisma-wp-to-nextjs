const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Delete existing data
  await prisma.review.deleteMany()
  await prisma.order.deleteMany()
  await prisma.theme.deleteMany()
  await prisma.user.deleteMany()

  // Create sample themes
  const themes = [
    {
      name: 'Modern Portfolio',
      description: 'A clean and modern portfolio theme perfect for showcasing your work.',
      longDescription: 'This theme is designed for creative professionals who want to showcase their work in a clean and modern way. Features include a responsive gallery, smooth animations, and customizable sections.',
      price: 49.99,
      category: 'Portfolio',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1000&auto=format&fit=crop',
      features: JSON.stringify([
        'Responsive Design',
        'Portfolio Gallery',
        'Blog Section',
        'Contact Form',
        'SEO Optimized'
      ]),
      screenshots: JSON.stringify([
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1000&auto=format&fit=crop'
      ]),
      demoUrl: 'https://demo.example.com/modern-portfolio',
      rating: 4.5,
      sales: 150
    },
    {
      name: 'E-commerce Pro',
      description: 'A full-featured e-commerce theme with everything you need to start selling online.',
      longDescription: 'Built for online stores, this theme includes product galleries, shopping cart, checkout process, and inventory management. Perfect for any size of online store.',
      price: 79.99,
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
      features: JSON.stringify([
        'Product Gallery',
        'Shopping Cart',
        'Secure Checkout',
        'Inventory Management',
        'Mobile Responsive'
      ]),
      screenshots: JSON.stringify([
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
      ]),
      demoUrl: 'https://demo.example.com/ecommerce-pro',
      rating: 4.8,
      sales: 280
    },
    {
      name: 'Business Elite',
      description: 'Professional theme for corporate websites with a modern and trustworthy design.',
      longDescription: 'Perfect for businesses looking to establish a strong online presence. Includes team sections, service showcases, and testimonial features.',
      price: 59.99,
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
      features: JSON.stringify([
        'Team Section',
        'Service Showcase',
        'Testimonials',
        'Contact Forms',
        'Newsletter Integration'
      ]),
      screenshots: JSON.stringify([
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
      ]),
      demoUrl: 'https://demo.example.com/business-elite',
      rating: 4.6,
      sales: 200
    },
    {
      name: 'Restaurant Deluxe',
      description: 'Premium theme for restaurants, cafes, and food businesses.',
      longDescription: 'Showcase your culinary delights with style. Includes menu layouts, reservation system, and food gallery features.',
      price: 69.99,
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
      features: JSON.stringify([
        'Menu Management',
        'Reservation System',
        'Food Gallery',
        'Online Ordering',
        'Events Calendar'
      ]),
      screenshots: JSON.stringify([
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=1000&auto=format&fit=crop'
      ]),
      demoUrl: 'https://demo.example.com/restaurant-deluxe',
      rating: 4.7,
      sales: 175
    },
    {
      name: 'Creative Blog',
      description: 'Modern and minimalist blog theme for creative writers.',
      longDescription: 'Perfect for bloggers who want to focus on content. Features clean typography and excellent readability.',
      price: 44.99,
      category: 'Blog',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop',
      features: JSON.stringify([
        'Multiple Blog Layouts',
        'Reading Time Estimation',
        'Social Sharing',
        'Newsletter Integration',
        'Dark Mode Support'
      ]),
      screenshots: JSON.stringify([
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop'
      ]),
      demoUrl: 'https://demo.example.com/creative-blog',
      rating: 4.4,
      sales: 220
    },
    {
      name: 'Real Estate Pro',
      description: 'Professional theme for real estate agencies and property listings.',
      longDescription: 'Showcase your properties with advanced search features and virtual tour integration.',
      price: 89.99,
      category: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
      features: JSON.stringify([
        'Property Listings',
        'Advanced Search',
        'Virtual Tours',
        'Agent Profiles',
        'Mortgage Calculator'
      ]),
      screenshots: JSON.stringify([
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1000&auto=format&fit=crop'
      ]),
      demoUrl: 'https://demo.example.com/real-estate-pro',
      rating: 4.9,
      sales: 165
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