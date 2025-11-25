import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')
    const id = searchParams.get('id')
    
    if (walletAddress) {
      const user = await db.user.findUnique({
        where: { walletAddress },
        include: {
          createdTasks: {
            select: {
              id: true,
              title: true,
              status: true,
              currentAccuracy: true,
              targetAccuracy: true,
              createdAt: true,
            },
          },
          contributions: {
            include: {
              task: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          modelNfts: {
            include: {
              task: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          contributorShares: {
            include: {
              modelNft: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              createdTasks: true,
              contributions: true,
              modelNfts: true,
              purchases: true,
            },
          },
        },
      })
      
      return NextResponse.json({ user })
    }
    
    if (id) {
      const user = await db.user.findUnique({
        where: { id },
        include: {
          createdTasks: {
            select: {
              id: true,
              title: true,
              status: true,
              currentAccuracy: true,
              targetAccuracy: true,
              createdAt: true,
            },
          },
          contributions: {
            include: {
              task: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          modelNfts: {
            include: {
              task: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          _count: {
            select: {
              createdTasks: true,
              contributions: true,
              modelNfts: true,
              purchases: true,
            },
          },
        },
      })
      
      return NextResponse.json({ user })
    }
    
    // Get all users with basic info
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        walletAddress: true,
        reputationScore: true,
        totalEarnings: true,
        createdAt: true,
        _count: {
          select: {
            createdTasks: true,
            contributions: true,
            modelNfts: true,
          },
        },
      },
      orderBy: {
        reputationScore: 'desc',
      },
    })
    
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, walletAddress } = body
    
    // Validate required fields
    if (!name || !email || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email },
          { walletAddress },
        ],
      },
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or wallet address already exists' },
        { status: 409 }
      )
    }
    
    // Create the user
    const user = await db.user.create({
      data: {
        name,
        email,
        walletAddress,
        reputationScore: 0,
        totalEarnings: 0,
      },
    })
    
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}