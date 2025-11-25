import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Create sample users
    const users = await Promise.all([
      db.user.create({
        data: {
          name: 'Alice Chen',
          email: 'alice@example.com',
          walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
          reputationScore: 4.5,
          totalEarnings: 1250.50,
        },
      }),
      db.user.create({
        data: {
          name: 'Bob Smith',
          email: 'bob@example.com',
          walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
          reputationScore: 4.2,
          totalEarnings: 980.25,
        },
      }),
      db.user.create({
        data: {
          name: 'Carol Davis',
          email: 'carol@example.com',
          walletAddress: '0x567890abcdef1234567890abcdef1234567890ab',
          reputationScore: 4.8,
          totalEarnings: 2100.75,
        },
      }),
    ])

    // Create sample tasks
    const tasks = await Promise.all([
      db.task.create({
        data: {
          title: 'Medical Image Classification for Disease Detection',
          description: 'Train a CNN model to classify medical images for early disease detection. Dataset includes X-rays, MRIs, and CT scans with labeled conditions.',
          datasetUri: 'ipfs://QmMedicalDataset123456789',
          targetAccuracy: 0.95,
          currentAccuracy: 0.87,
          rewardPool: 5000,
          status: 'ACTIVE',
          creatorId: users[0].id,
        },
      }),
      db.task.create({
        data: {
          title: 'Sentiment Analysis for Financial News',
          description: 'Develop an NLP model to analyze sentiment in financial news articles and social media posts for market prediction.',
          datasetUri: 'ipfs://QmFinancialNewsDataset987654321',
          targetAccuracy: 0.92,
          currentAccuracy: 0.89,
          rewardPool: 3000,
          status: 'ACTIVE',
          creatorId: users[1].id,
        },
      }),
      db.task.create({
        data: {
          title: 'Crop Yield Prediction for Sustainable Agriculture',
          description: 'Build a regression model to predict crop yields based on weather patterns, soil conditions, and satellite imagery.',
          datasetUri: 'ipfs://QmAgricultureDataset555666777',
          targetAccuracy: 0.88,
          currentAccuracy: 0.91,
          rewardPool: 2500,
          status: 'COMPLETED',
          creatorId: users[2].id,
        },
      }),
    ])

    // Create sample contributions
    const contributions = await Promise.all([
      db.contribution.create({
        data: {
          taskId: tasks[0].id,
          contributorId: users[1].id,
          roundNumber: 1,
          improvementBp: 250, // 2.5% improvement
          modelUpdateUri: 'ipfs://QmModelUpdate111111',
          rewardAmount: 125,
          status: 'APPROVED',
        },
      }),
      db.contribution.create({
        data: {
          taskId: tasks[0].id,
          contributorId: users[2].id,
          roundNumber: 2,
          improvementBp: 180, // 1.8% improvement
          modelUpdateUri: 'ipfs://QmModelUpdate222222',
          rewardAmount: 90,
          status: 'APPROVED',
        },
      }),
      db.contribution.create({
        data: {
          taskId: tasks[1].id,
          contributorId: users[0].id,
          roundNumber: 1,
          improvementBp: 320, // 3.2% improvement
          modelUpdateUri: 'ipfs://QmModelUpdate333333',
          rewardAmount: 96,
          status: 'APPROVED',
        },
      }),
    ])

    // Create sample model NFTs
    const modelNfts = await Promise.all([
      db.modelNft.create({
        data: {
          tokenId: 'token_001',
          taskId: tasks[2].id,
          name: 'AgriPredict Pro v1.0',
          description: 'Advanced crop yield prediction model trained on multi-modal agricultural data with 91% accuracy.',
          modelType: 'regression',
          accuracy: 0.91,
          trainingRounds: 12,
          ipfsUri: 'ipfs://QmAgriPredictModel111',
          metadataUri: 'ipfs://QmAgriPredictMetadata111',
          creatorId: users[2].id,
          currentOwnerId: users[2].id,
          price: 750,
          isListed: true,
        },
      }),
      db.modelNft.create({
        data: {
          tokenId: 'token_002',
          taskId: tasks[0].id,
          name: 'MediClassify Health v2.1',
          description: 'Medical image classification model for disease detection with high accuracy on diverse imaging modalities.',
          modelType: 'image_classification',
          accuracy: 0.87,
          trainingRounds: 8,
          ipfsUri: 'ipfs://QmMediClassifyModel222',
          metadataUri: 'ipfs://QmMediClassifyMetadata222',
          creatorId: users[0].id,
          currentOwnerId: users[0].id,
          price: 1200,
          isListed: true,
        },
      }),
    ])

    // Create sample marketplace listings
    const listings = await Promise.all([
      db.marketplaceListing.create({
        data: {
          modelNftId: modelNfts[0].id,
          sellerId: users[2].id,
          price: 750,
          status: 'ACTIVE',
        },
      }),
      db.marketplaceListing.create({
        data: {
          modelNftId: modelNfts[1].id,
          sellerId: users[0].id,
          price: 1200,
          status: 'ACTIVE',
        },
      }),
    ])

    // Create sample reviews
    await Promise.all([
      db.review.create({
        data: {
          modelNftId: modelNfts[0].id,
          reviewerId: users[0].id,
          rating: 5,
          comment: 'Excellent model! Very accurate predictions and easy to integrate.',
        },
      }),
      db.review.create({
        data: {
          modelNftId: modelNfts[0].id,
          reviewerId: users[1].id,
          rating: 4,
          comment: 'Great performance, though requires some preprocessing for optimal results.',
        },
      }),
    ])

    // Create sample contributor shares
    await Promise.all([
      db.contributorShare.create({
        data: {
          modelNftId: modelNfts[0].id,
          contributorId: users[0].id,
          sharePercentage: 15,
          totalEarned: 112.50,
        },
      }),
      db.contributorShare.create({
        data: {
          modelNftId: modelNfts[0].id,
          contributorId: users[1].id,
          sharePercentage: 10,
          totalEarned: 75.00,
        },
      }),
    ])

    // Create sample training rounds
    await Promise.all([
      db.trainingRound.create({
        data: {
          taskId: tasks[0].id,
          roundNumber: 1,
          globalAccuracy: 0.85,
          participantCount: 3,
          status: 'COMPLETED',
          completedAt: new Date(Date.now() - 86400000), // 1 day ago
        },
      }),
      db.trainingRound.create({
        data: {
          taskId: tasks[0].id,
          roundNumber: 2,
          globalAccuracy: 0.87,
          participantCount: 4,
          status: 'COMPLETED',
          completedAt: new Date(Date.now() - 43200000), // 12 hours ago
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Sample data created successfully',
      data: {
        users: users.length,
        tasks: tasks.length,
        contributions: contributions.length,
        modelNfts: modelNfts.length,
        listings: listings.length,
      },
    })
  } catch (error) {
    console.error('Error creating sample data:', error)
    return NextResponse.json(
      { error: 'Failed to create sample data' },
      { status: 500 }
    )
  }
}