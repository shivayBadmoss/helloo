'use client'

import { useState } from 'react'
import { MLTrainingInterface } from '@/components/training/MLTrainingInterface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Database,
  Settings,
  Play,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

interface TrainingResult {
  success: boolean
  modelId?: string
  modelPath?: string
  modelSummary?: {
    architecture: string
    taskType: string
    totalParams: number
    inputShape: number[]
    outputShape: number[]
    layers: number
    finalAccuracy: number
    finalLoss: number
    trainingTime: number
    epochsTrained: number
  }
  trainingHistory?: Array<{
    epoch: number
    loss: number
    accuracy?: number
    mae?: number
    valLoss: number
    valAccuracy?: number
    valMae?: number
    time: number
  }>
  message?: string
}

export default function TrainingPage() {
  const [recentTrainings, setRecentTrainings] = useState<TrainingResult[]>([])

  const handleTrainingComplete = (result: TrainingResult) => {
    if (result.success) {
      setRecentTrainings(prev => [result, ...prev.slice(0, 4)]) // Keep last 5 trainings
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ML Model Training</h1>
          <Badge className="bg-green-100 text-green-800">
            Live Training
          </Badge>
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Train real machine learning models using TensorFlow.js with custom architectures and hyperparameters.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MLTrainingInterface onTrainingComplete={handleTrainingComplete} />
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Training Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Task Types</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Model Architectures</span>
                <Badge variant="secondary">5+</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Max Samples</span>
                <Badge variant="secondary">10K</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">GPU Acceleration</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Supported Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Supported Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Classification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Regression</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Sentiment Analysis</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trainings */}
          {recentTrainings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Trainings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTrainings.map((training, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {training.modelSummary?.architecture} Model
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {training.modelSummary?.taskType}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>Accuracy: {(training.modelSummary?.finalAccuracy * 100).toFixed(1)}%</div>
                      <div>Loss: {training.modelSummary?.finalLoss?.toFixed(4)}</div>
                      <div>Params: {training.modelSummary?.totalParams?.toLocaleString()}</div>
                      <div>Time: {(training.modelSummary?.trainingTime / 1000).toFixed(1)}s</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>1. <strong>Choose Task Type:</strong> Select classification, regression, or sentiment analysis</p>
                <p>2. <strong>Configure Dataset:</strong> Set sample size and parameters</p>
                <p>3. <strong>Adjust Hyperparameters:</strong> Fine-tune learning rate, batch size, epochs</p>
                <p>4. <strong>Start Training:</strong> Watch your model learn in real-time</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}