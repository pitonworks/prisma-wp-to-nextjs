import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const theme = await prisma.theme.findUnique({
      where: {
        id: params.id,
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!theme) {
      return new NextResponse('Theme not found', { status: 404 })
    }

    // Add technical details and other metadata
    const themeWithDetails = {
      ...theme,
      technicalDetails: {
        framework: 'Next.js 14',
        responsive: true,
        browserSupport: ['Chrome', 'Firefox', 'Safari', 'Edge'],
        lastUpdate: new Date().toLocaleDateString(),
      },
      screenshots: [
        '/themes/modern-portfolio-1.jpg',
        '/themes/modern-portfolio-2.jpg',
        '/themes/modern-portfolio-3.jpg',
      ],
      features: [
        'Responsive Design',
        'SEO Optimized',
        'Fast Loading',
        'Modern UI/UX',
        'Easy Customization',
        'Regular Updates',
      ],
    }

    return NextResponse.json({ theme: themeWithDetails })
  } catch (error) {
    console.error('Error fetching theme:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 