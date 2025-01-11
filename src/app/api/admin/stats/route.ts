import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get total sales
    const orders = await prisma.order.findMany({
      where: {
        status: 'COMPLETED',
      },
      select: {
        price: true,
      },
    })
    const totalSales = orders.reduce((sum, order) => sum + order.price, 0)

    // Get total themes
    const totalThemes = await prisma.theme.count()

    // Get total users
    const totalUsers = await prisma.user.count()

    // Get total orders
    const totalOrders = await prisma.order.count()

    return NextResponse.json({
      totalSales,
      totalThemes,
      totalUsers,
      totalOrders,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 