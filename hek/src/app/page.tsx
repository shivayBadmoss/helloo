'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { 
  Brain, 
  Network, 
  Coins, 
  Shield, 
  Users, 
  TrendingUp,
  Zap,
  Globe,
  Lock,
  Award
} from 'lucide-react'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const router = useRouter()

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsConnected(true)
    setWalletAddress('0x1234...5678')
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
  }

  const handleGetStarted = () => {
    router.push('/tasks')
  }

  const handleBrowseModels = () => {
    router.push('/marketplace')
  }

  const handleStartTraining = () => {
    router.push('/tasks')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Decentralized AI Model
            <span className="text-blue-600"> Training & Marketplace</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Turn AI models into community-trained, tradable on-chain assets. 
            Contribute compute, earn rewards, and build the future of collaborative AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={handleStartTraining}>
              <Zap className="mr-2 h-5 w-5" />
              Start Training
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={handleBrowseModels}>
              <Globe className="mr-2 h-5 w-5" />
              Browse Models
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => router.push('/training')}>
              <Brain className="mr-2 h-5 w-5" />
              ML Lab
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Why Choose FederAI Chain?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Real ML Training</CardTitle>
                <CardDescription>
                  Train actual machine learning models using TensorFlow.js with custom architectures, hyperparameters, and real-time progress tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Network className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Federated Learning</CardTitle>
                <CardDescription>
                  Train models collaboratively without sharing raw data. Privacy-preserving 
                  ML that keeps your data secure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Coins className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Token Rewards</CardTitle>
                <CardDescription>
                  Earn FEDAI tokens for contributing compute and improving model accuracy. 
                  Fair compensation for your computational resources.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>On-Chain Verification</CardTitle>
                <CardDescription>
                  Every contribution is recorded on the blockchain. Transparent, 
                  tamper-proof records of all training activities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Model NFTs</CardTitle>
                <CardDescription>
                  Trained models become unique NFTs with provenance. Trade, 
                  sell, or license your AI models on the marketplace.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Royalty System</CardTitle>
                <CardDescription>
                  Contributors earn ongoing royalties from model sales. 
                  Fair revenue sharing for the entire training community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track model performance, contribution quality, and earnings. 
                  Data-driven insights for all participants.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            How It Works
          </h3>
          
          <Tabs defaultValue="creator" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="creator">Model Creator</TabsTrigger>
              <TabsTrigger value="contributor">Contributor</TabsTrigger>
              <TabsTrigger value="buyer">Model Buyer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="creator" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>For Model Creators</CardTitle>
                  <CardDescription>
                    Launch AI training tasks and build collaborative models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Create Training Task</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Define your ML task, dataset, target accuracy, and reward pool
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Monitor Training Progress</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Track contributions and model accuracy improvements in real-time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Mint Model NFT</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Once target accuracy is reached, mint your model as an NFT with contributor royalties
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contributor" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>For Contributors</CardTitle>
                  <CardDescription>
                    Contribute compute power and earn rewards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <span className="text-green-600 dark:text-green-300 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Join Training Tasks</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Browse available tasks and contribute your compute resources
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <span className="text-green-600 dark:text-green-300 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Train Locally</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Download task config and train models on your data using federated learning
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <span className="text-green-600 dark:text-green-300 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Earn Rewards</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Receive immediate rewards and ongoing royalties from model sales
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="buyer" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>For Model Buyers</CardTitle>
                  <CardDescription>
                    Access high-quality, community-trained AI models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Browse Marketplace</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Discover models by accuracy, domain, and community ratings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Purchase Models</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Buy model NFTs using FEDAI tokens with full provenance tracking
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Deploy & Use</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Download model weights and deploy locally or via our API gateway
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-300">Active Models</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-slate-600 dark:text-slate-300">Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10M+</div>
              <div className="text-slate-600 dark:text-slate-300">FEDAI Tokens Distributed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Join the AI Revolution?
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Start contributing to decentralized AI training today
          </p>
          <Button size="lg" className="text-lg px-8" onClick={handleGetStarted}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">FederAI Chain</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              © 2024 FederAI Chain. Building the future of decentralized AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}