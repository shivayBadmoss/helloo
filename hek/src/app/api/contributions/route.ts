import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    const contributorId = searchParams.get('contributorId')
    
    const contributions = await db.contribution.findMany({
      where: {
        ...(taskId && { taskId }),
        ...(contributorId && { contributorId }),
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            targetAccuracy: true,
            currentAccuracy: true,
          },
        },
        contributor: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
            reputationScore: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json({ contributions })
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      taskId,
      contributorId,
      roundNumber,
      improvementBp,
      modelUpdateUri,
    } = body
    
    // Validate required fields
    if (!taskId || !contributorId || !roundNumber || !improvementBp || !modelUpdateUri) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get the task to calculate reward
    const task = await db.task.findUnique({
      where: { id: taskId },
    })
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }
    
    // Calculate reward based on improvement and task reward pool
    const rewardAmount = (improvementBp / 10000) * task.rewardPool * 0.1 // 10% of reward pool per 1% improvement
    
    // Create the contribution
    const contribution = await db.contribution.create({
      data: {
        taskId,
        contributorId,
        roundNumber,
        improvementBp: parseFloat(improvementBp),
        modelUpdateUri,
        rewardAmount,
        status: 'PENDING',
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            targetAccuracy: true,
            currentAccuracy: true,
          },
        },
        contributor: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    })
    
    // Update task current accuracy
    const newAccuracy = task.currentAccuracy + (improvementBp / 10000)
    await db.task.update({
      where: { id: taskId },
      data: {
        currentAccuracy: newAccuracy,
        status: newAccuracy >= task.targetAccuracy ? 'COMPLETED' : 'ACTIVE',
      },
    })
    
    return NextResponse.json({ contribution }, { status: 201 })
  } catch (error) {
    console.error('Error creating contribution:', error)
    return NextResponse.json(
      { error: 'Failed to create contribution' },
      { status: 500 }
    )
  }
}