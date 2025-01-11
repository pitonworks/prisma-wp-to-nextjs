import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sort = searchParams.get('sort')
    const query = searchParams.get('q')

    // Build where clause
    const where: any = {}
    if (category && category !== 'All') {
      where.category = category
    }
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
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

    const themes = await prisma.theme.findMany({
      where,
      orderBy,
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

    return NextResponse.json({ themes })
  } catch (error) {
    console.error('Error fetching themes:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 