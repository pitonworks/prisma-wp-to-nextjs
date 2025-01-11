import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const { themeId, price } = data

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        themeId,
        price,
        status: 'PENDING',
      },
    })

    // In a real application, you would integrate with a payment provider here
    // For now, we'll just mark the order as completed
    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: 'COMPLETED',
      },
    })

    return NextResponse.json({ order: updatedOrder })
  } catch (error) {
    console.error('Error creating order:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        theme: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 