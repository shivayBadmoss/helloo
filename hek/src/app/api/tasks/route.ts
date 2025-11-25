import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const creatorId = searchParams.get('creatorId')
    
    const tasks = await db.task.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(creatorId && { creatorId }),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
            reputationScore: true,
          },
        },
        _count: {
          select: {
            contributions: true,
            modelNfts: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      datasetUri,
      targetAccuracy,
      rewardPool,
      creatorId,
    } = body
    
    // Validate required fields
    if (!title || !description || !datasetUri || !targetAccuracy || !rewardPool || !creatorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create the task
    const task = await db.task.create({
      data: {
        title,
        description,
        datasetUri,
        targetAccuracy: parseFloat(targetAccuracy),
        rewardPool: parseFloat(rewardPool),
        creatorId,
        status: 'PENDING',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    })
    
    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}