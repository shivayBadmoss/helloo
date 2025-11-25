'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Search, 
  Filter,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  Award,
  ShoppingCart,
  Eye,
  Heart
} from 'lucide-react'

interface ModelNft {
  id: string
  tokenId: string
  name: string
  description: string
  modelType: string
  accuracy: number
  trainingRounds: number
  ipfsUri: string
  metadataUri: string
  price: number
  isListed: boolean
  createdAt: string
  averageRating: number
  reviewCount: number
  task: {
    id: string
    title: string
    description: string
  }
  creator: {
    id: string
    name: string
    walletAddress: string
  }
  _count: {
    purchases: number
  }
}

interface MarketplaceListing {
  id: string
  price: number
  status: string
  createdAt: string
  modelNft: ModelNft
  seller: {
    id: string
    name: string
    walletAddress: string
    reputationScore: number
  }
}

export default function MarketplacePage() {
  const router = useRouter()
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedModel, setSelectedModel] = useState<ModelNft | null>(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/marketplace')
      const data = await response.json()
      if (data.listings) {
        setListings(data.listings)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuyModel = async (listingId: string) => {
    try {
      // Redirect to buy page with the model ID
      router.push(`/buy?id=${listingId}`)
    } catch (error) {
      console.error('Error navigating to buy page:', error)
      alert('Failed to navigate to purchase page. Please try again.')
    }
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.modelNft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.modelNft.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || listing.modelNft.modelType === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price
      case 'price_high':
        return b.price - a.price
      case 'rating':
        return b.modelNft.averageRating - a.modelNft.averageRating
      case 'popular':
        return b.modelNft._count.purchases - a.modelNft._count.purchases
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const ModelCard = ({ listing }: { listing: MarketplaceListing }) => {
    const { modelNft } = listing
    const seller = modelNft.currentOwner
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{modelNft.name}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {modelNft.description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              {modelNft.modelType.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(modelNft.averageRating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
              <span className="text-sm text-slate-500 ml-1">
                {modelNft.averageRating.toFixed(1)} ({modelNft.reviewCount})
              </span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {modelNft.accuracy.toFixed(3)} accuracy
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-slate-500" />
              <span>{modelNft.trainingRounds} rounds</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-500" />
              <span>{modelNft._count.purchases} sold</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {listing.price.toFixed(0)} FEDAI
              </div>
              <div className="text-xs text-slate-500">
                by {seller?.name || 'Unknown'}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedModel(modelNft)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                size="sm"
                onClick={() => handleBuyModel(listing.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ModelDetails = ({ model }: { model: ModelNft }) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedModel(null)}>
            ← Back to Marketplace
          </Button>
          <Badge variant="outline">
            {model.modelType.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  {model.name}
                </CardTitle>
                <CardDescription>
                  Created by {model.creator.name} • {new Date(model.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-slate-600 dark:text-slate-300">{model.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Training Task</h3>
                  <p className="text-slate-600 dark:text-slate-300">{model.task.title}</p>
                  <p className="text-sm text-slate-500">{model.task.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600">Accuracy</h4>
                    <p className="text-2xl font-bold">{(model.accuracy * 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Training Rounds</h4>
                    <p className="text-2xl font-bold">{model.trainingRounds}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Marketplace Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {model.price.toFixed(0)} FEDAI
                  </div>
                  <p className="text-slate-500">Current Price</p>
                </div>

                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(model.averageRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-2">
                    {model.averageRating.toFixed(1)} ({model.reviewCount} reviews)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{model._count.purchases}</div>
                    <div className="text-slate-500">Purchases</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{model.isListed ? 'Listed' : 'Not Listed'}</div>
                    <div className="text-slate-500">Status</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => router.push(`/buy?id=${model.id}`)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Token ID</span>
                  <span className="font-mono text-sm">{model.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Model Type</span>
                  <span>{model.modelType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>IPFS URI</span>
                  <span className="font-mono text-sm truncate max-w-[200px]">
                    {model.ipfsUri}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Model Marketplace</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Discover and purchase high-quality, community-trained AI models
        </p>
      </div>

      {selectedModel ? (
        <ModelDetails model={selectedModel} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="image_classification">Image Classification</SelectItem>
                <SelectItem value="nlp_classification">Text Classification</SelectItem>
                <SelectItem value="regression">Regression</SelectItem>
                <SelectItem value="object_detection">Object Detection</SelectItem>
                <SelectItem value="sentiment_analysis">Sentiment Analysis</SelectItem>
                <SelectItem value="recommendation">Recommendation</SelectItem>
                <SelectItem value="time_series">Time Series</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-slate-300 mx-auto mb-4 animate-pulse" />
              <p className="text-slate-500">Loading marketplace...</p>
            </div>
          ) : sortedListings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Award className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  No models found
                </h3>
                <p className="text-slate-500">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your filters or search terms'
                    : 'No models are currently available in the marketplace'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedListings.map(listing => (
                <ModelCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}