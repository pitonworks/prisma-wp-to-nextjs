import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sort = searchParams.get('sort')
    const query = searchParams.get('q')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    console.log('API Request:', { category, sort, query, limit })

    // Build where clause
    const where: any = {}
    if (category && category !== 'All') {
      where.category = category
    }
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ]
    }

    // Build orderBy
    let orderBy: any = { createdAt: 'desc' }
    switch (sort) {
      case 'price_asc':
        orderBy = { price: 'asc' }
        break
      case 'price_desc':
        orderBy = { price: 'desc' }
        break
      case 'popular':
        orderBy = { sales: 'desc' }
        break
    }

    console.log('Prisma Query:', { where, orderBy, take: limit })

    const themes = await prisma.theme.findMany({
      where,
      orderBy,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        image: true,
        rating: true,
        sales: true,
      },
    })

    console.log(`Found ${themes.length} themes`)

    return NextResponse.json({ 
      themes,
      success: true 
    })
  } catch (error) {
    console.error('Detailed error:', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ 
        error: `Database error: ${error.message}`,
        code: error.code,
        success: false
      }, { 
        status: 500 
      })
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json({ 
        error: 'Database initialization error',
        success: false
      }, { 
        status: 500 
      })
    }

    return NextResponse.json({ 
      error: 'Failed to fetch themes',
      success: false
    }, { 
      status: 500 
    })
  }
} 