import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const { name, email, password } = data

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const updates: any = {}
    
    if (name) updates.name = name
    if (email) updates.email = email
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updates.password = hashedPassword
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: updates,
    })

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 