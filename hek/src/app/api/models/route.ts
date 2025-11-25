import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    const creatorId = searchParams.get('creatorId')
    const currentOwnerId = searchParams.get('currentOwnerId')
    
    const models = await db.modelNft.findMany({
      where: {
        ...(taskId && { taskId }),
        ...(creatorId && { creatorId }),
        ...(currentOwnerId && { currentOwnerId }),
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
        currentOwner: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
        contributorShares: {
          include: {
            contributor: {
              select: {
                id: true,
                name: true,
                walletAddress: true,
              },
            },
          },
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            reviewer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            purchases: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    // Calculate average rating for each model
    const modelsWithRatings = models.map(model => {
      const reviews = model.reviews
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0
      
      return {
        ...model,
        averageRating: avgRating,
        reviewCount: reviews.length,
      }
    })
    
    return NextResponse.json({ models: modelsWithRatings })
  } catch (error) {
    console.error('Error fetching models:', error)
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      taskId,
      name,
      description,
      modelType,
      accuracy,
      trainingRounds,
      ipfsUri,
      metadataUri,
      creatorId,
      contributorShares,
    } = body
    
    // Validate required fields
    if (!taskId || !name || !description || !modelType || !accuracy || !trainingRounds || !ipfsUri || !metadataUri || !creatorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Generate a unique token ID (in a real implementation, this would come from the blockchain)
    const tokenId = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create the model NFT
    const modelNft = await db.modelNft.create({
      data: {
        tokenId,
        taskId,
        name,
        description,
        modelType,
        accuracy: parseFloat(accuracy),
        trainingRounds: parseInt(trainingRounds),
        ipfsUri,
        metadataUri,
        creatorId,
        currentOwnerId: creatorId,
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    })
    
    // Create contributor shares if provided
    if (contributorShares && contributorShares.length > 0) {
      await db.contributorShare.createMany({
        data: contributorShares.map((share: any) => ({
          modelNftId: modelNft.id,
          contributorId: share.contributorId,
          sharePercentage: parseFloat(share.sharePercentage),
        })),
      })
    }
    
    return NextResponse.json({ modelNft }, { status: 201 })
  } catch (error) {
    console.error('Error creating model NFT:', error)
    return NextResponse.json(
      { error: 'Failed to create model NFT' },
      { status: 500 }
    )
  }
}