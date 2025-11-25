import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const sellerId = searchParams.get('sellerId')
    
    const listings = await db.marketplaceListing.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(sellerId && { sellerId }),
      },
      include: {
        modelNft: {
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
                reputationScore: true,
              },
            },
            reviews: {
              select: {
                rating: true,
                comment: true,
              },
            },
            _count: {
              select: {
                purchases: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    // Calculate average rating for each model
    const listingsWithRatings = listings.map(listing => {
      const reviews = listing.modelNft.reviews
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0
      
      return {
        ...listing,
        modelNft: {
          ...listing.modelNft,
          averageRating: avgRating,
          reviewCount: reviews.length,
        },
      }
    })
    
    return NextResponse.json({ listings: listingsWithRatings })
  } catch (error) {
    console.error('Error fetching marketplace listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch marketplace listings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      modelNftId,
      sellerId,
      price,
    } = body
    
    // Validate required fields
    if (!modelNftId || !sellerId || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if the model NFT exists and is owned by the seller
    const modelNft = await db.modelNft.findUnique({
      where: { id: modelNftId },
    })
    
    if (!modelNft) {
      return NextResponse.json(
        { error: 'Model NFT not found' },
        { status: 404 }
      )
    }
    
    if (modelNft.currentOwnerId !== sellerId) {
      return NextResponse.json(
        { error: 'You are not the owner of this model NFT' },
        { status: 403 }
      )
    }
    
    // Create the marketplace listing
    const listing = await db.marketplaceListing.create({
      data: {
        modelNftId,
        sellerId,
        price: parseFloat(price),
        status: 'ACTIVE',
      },
      include: {
        modelNft: {
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
        },
        seller: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    })
    
    // Update the model NFT to mark it as listed
    await db.modelNft.update({
      where: { id: modelNftId },
      data: {
        isListed: true,
        price: parseFloat(price),
      },
    })
    
    return NextResponse.json({ listing }, { status: 201 })
  } catch (error) {
    console.error('Error creating marketplace listing:', error)
    return NextResponse.json(
      { error: 'Failed to create marketplace listing' },
      { status: 500 }
    )
  }
}