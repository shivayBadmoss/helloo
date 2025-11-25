import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simulate federated learning training
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, contributorId, rounds = 5 } = body
    
    if (!taskId || !contributorId) {
      return NextResponse.json(
        { error: 'Missing taskId or contributorId' },
        { status: 400 }
      )
    }
    
    // Get the task
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: {
        contributions: {
          where: { contributorId },
          orderBy: { roundNumber: 'desc' },
          take: 1,
        },
      },
    })
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }
    
    const lastContribution = task.contributions[0]
    const startRound = lastContribution ? lastContribution.roundNumber + 1 : 1
    
    const results = []
    
    // Simulate training rounds
    for (let round = startRound; round <= startRound + rounds - 1; round++) {
      // Simulate training time (1-3 seconds)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      // Simulate improvement (random between 0.5% and 3%)
      const improvement = 0.005 + Math.random() * 0.025 // 0.5% to 3%
      const improvementBp = improvement * 10000 // Convert to basis points
      
      // Generate mock IPFS URI for model update
      const modelUpdateUri = `ipfs://QmMock${round}${Date.now()}`
      
      // Create contribution record
      const contribution = await db.contribution.create({
        data: {
          taskId,
          contributorId,
          roundNumber: round,
          improvementBp,
          modelUpdateUri,
          rewardAmount: improvement * task.rewardPool * 0.1,
          status: 'APPROVED',
        },
      })
      
      // Update task accuracy
      const newAccuracy = Math.min(task.currentAccuracy + improvement, 0.999) // Cap at 99.9%
      await db.task.update({
        where: { id: taskId },
        data: {
          currentAccuracy: newAccuracy,
          status: newAccuracy >= task.targetAccuracy ? 'COMPLETED' : 'ACTIVE',
        },
      })
      
      // Create training round record
      await db.trainingRound.create({
        data: {
          taskId,
          roundNumber: round,
          globalAccuracy: newAccuracy,
          participantCount: 1, // In real scenario, this would be actual count
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      })
      
      results.push({
        round,
        improvement: improvementBp,
        newAccuracy,
        modelUpdateUri,
        contributionId: contribution.id,
      })
      
      // Update task reference for next iteration
      task.currentAccuracy = newAccuracy
      
      // Check if target accuracy reached
      if (newAccuracy >= task.targetAccuracy) {
        break
      }
    }
    
    return NextResponse.json({
      success: true,
      taskId,
      contributorId,
      results,
      finalAccuracy: task.currentAccuracy,
      targetReached: task.currentAccuracy >= task.targetAccuracy,
    })
  } catch (error) {
    console.error('Error in federated learning simulation:', error)
    return NextResponse.json(
      { error: 'Failed to simulate federated learning' },
      { status: 500 }
    )
  }
}

// Get simulation status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Missing taskId' },
        { status: 400 }
      )
    }
    
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: {
        trainingRounds: {
          orderBy: { roundNumber: 'asc' },
        },
        contributions: {
          include: {
            contributor: {
              select: {
                id: true,
                name: true,
                walletAddress: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      task,
      trainingProgress: {
        currentAccuracy: task.currentAccuracy,
        targetAccuracy: task.targetAccuracy,
        progress: (task.currentAccuracy / task.targetAccuracy) * 100,
        roundsCompleted: task.trainingRounds.length,
        totalContributions: task.contributions.length,
      },
    })
  } catch (error) {
    console.error('Error fetching simulation status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch simulation status' },
      { status: 500 }
    )
  }
}