'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatasetViewer } from './DatasetViewer'
import { 
  Brain, 
  Play, 
  Settings, 
  Database, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Zap,
  Eye
} from 'lucide-react'

interface TrainingConfig {
  taskType: string
  modelType: string
  hyperparameters: {
    learningRate: number
    batchSize: number
    epochs: number
    dropoutRate: number
  }
  datasetConfig: {
    numSamples: number
    numFeatures?: number
    numClasses?: number
    vocabSize?: number
    maxLength?: number
  }
}

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

interface MLTrainingInterfaceProps {
  onTrainingComplete?: (result: TrainingResult) => void
}

export function MLTrainingInterface({ onTrainingComplete }: MLTrainingInterfaceProps) {
  const [config, setConfig] = useState<TrainingConfig>({
    taskType: 'classification',
    modelType: 'dense',
    hyperparameters: {
      learningRate: 0.001,
      batchSize: 32,
      epochs: 50,
      dropoutRate: 0.2
    },
    datasetConfig: {
      numSamples: 1000,
      numFeatures: 10,
      numClasses: 3
    }
  })

  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingResult, setTrainingResult] = useState<TrainingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDatasetViewer, setShowDatasetViewer] = useState(false)

  const startTraining = async () => {
    try {
      setIsTraining(true)
      setTrainingProgress(0)
      setError(null)
      setTrainingResult(null)

      const response = await fetch('/api/train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      const result: TrainingResult = await response.json()

      if (result.success) {
        setTrainingResult(result)
        setTrainingProgress(100)
        onTrainingComplete?.(result)
      } else {
        setError(result.message || 'Training failed')
      }
    } catch (err) {
      setError('Network error during training')
      console.error('Training error:', err)
    } finally {
      setIsTraining(false)
    }
  }

  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const keys = path.split('.')
      const newConfig = { ...prev }
      let current: any = newConfig
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  const TaskTypeSelector = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="taskType">Task Type</Label>
        <Select value={config.taskType} onValueChange={(value) => updateConfig('taskType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select task type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="classification">Classification</SelectItem>
            <SelectItem value="regression">Regression</SelectItem>
            <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="modelType">Model Architecture</Label>
        <Select value={config.modelType} onValueChange={(value) => updateConfig('modelType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select model type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dense">Dense Neural Network</SelectItem>
            <SelectItem value="cnn">Convolutional Neural Network</SelectItem>
            <SelectItem value="rnn">Recurrent Neural Network</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const DatasetConfig = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Database className="h-5 w-5" />
          Dataset Configuration
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowDatasetViewer(true)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Dataset
        </Button>
      </div>
      
      <div>
        <Label htmlFor="numSamples">Number of Samples</Label>
        <Input
          id="numSamples"
          type="number"
          value={config.datasetConfig.numSamples}
          onChange={(e) => updateConfig('datasetConfig.numSamples', parseInt(e.target.value))}
          min="100"
          max="10000"
          step="100"
        />
      </div>

      {config.taskType === 'classification' && (
        <>
          <div>
            <Label htmlFor="numFeatures">Number of Features</Label>
            <Input
              id="numFeatures"
              type="number"
              value={config.datasetConfig.numFeatures}
              onChange={(e) => updateConfig('datasetConfig.numFeatures', parseInt(e.target.value))}
              min="1"
              max="100"
            />
          </div>
          <div>
            <Label htmlFor="numClasses">Number of Classes</Label>
            <Input
              id="numClasses"
              type="number"
              value={config.datasetConfig.numClasses}
              onChange={(e) => updateConfig('datasetConfig.numClasses', parseInt(e.target.value))}
              min="2"
              max="10"
            />
          </div>
        </>
      )}

      {config.taskType === 'regression' && (
        <div>
          <Label htmlFor="numFeatures">Number of Features</Label>
          <Input
            id="numFeatures"
            type="number"
            value={config.datasetConfig.numFeatures}
            onChange={(e) => updateConfig('datasetConfig.numFeatures', parseInt(e.target.value))}
            min="1"
            max="100"
          />
        </div>
      )}

      {config.taskType === 'sentiment' && (
        <>
          <div>
            <Label htmlFor="vocabSize">Vocabulary Size</Label>
            <Input
              id="vocabSize"
              type="number"
              value={config.datasetConfig.vocabSize}
              onChange={(e) => updateConfig('datasetConfig.vocabSize', parseInt(e.target.value))}
              min="100"
              max="10000"
              step="100"
            />
          </div>
          <div>
            <Label htmlFor="maxLength">Maximum Sequence Length</Label>
            <Input
              id="maxLength"
              type="number"
              value={config.datasetConfig.maxLength}
              onChange={(e) => updateConfig('datasetConfig.maxLength', parseInt(e.target.value))}
              min="10"
              max="200"
            />
          </div>
        </>
      )}
    </div>
  )

  const HyperparameterConfig = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Settings className="h-5 w-5" />
        Hyperparameters
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Learning Rate</Label>
          <span className="text-sm text-slate-500">{config.hyperparameters.learningRate}</span>
        </div>
        <Slider
          value={[config.hyperparameters.learningRate]}
          onValueChange={([value]) => updateConfig('hyperparameters.learningRate', value)}
          min={0.0001}
          max={0.1}
          step={0.0001}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Batch Size</Label>
          <span className="text-sm text-slate-500">{config.hyperparameters.batchSize}</span>
        </div>
        <Slider
          value={[config.hyperparameters.batchSize]}
          onValueChange={([value]) => updateConfig('hyperparameters.batchSize', value)}
          min={8}
          max={128}
          step={8}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Epochs</Label>
          <span className="text-sm text-slate-500">{config.hyperparameters.epochs}</span>
        </div>
        <Slider
          value={[config.hyperparameters.epochs]}
          onValueChange={([value]) => updateConfig('hyperparameters.epochs', value)}
          min={10}
          max={200}
          step={10}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Dropout Rate</Label>
          <span className="text-sm text-slate-500">{config.hyperparameters.dropoutRate}</span>
        </div>
        <Slider
          value={[config.hyperparameters.dropoutRate]}
          onValueChange={([value]) => updateConfig('hyperparameters.dropoutRate', value)}
          min={0}
          max={0.5}
          step={0.05}
          className="w-full"
        />
      </div>
    </div>
  )

  const TrainingResults = () => {
    if (!trainingResult) return null

    const { modelSummary, trainingHistory } = trainingResult

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <h3 className="text-lg font-semibold">Training Complete!</h3>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Model Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Architecture:</span> {modelSummary?.architecture}
              </div>
              <div>
                <span className="font-semibold">Task Type:</span> {modelSummary?.taskType}
              </div>
              <div>
                <span className="font-semibold">Total Parameters:</span> {modelSummary?.totalParams?.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Layers:</span> {modelSummary?.layers}
              </div>
              <div>
                <span className="font-semibold">Final Accuracy:</span> {(modelSummary?.finalAccuracy * 100).toFixed(2)}%
              </div>
              <div>
                <span className="font-semibold">Final Loss:</span> {modelSummary?.finalLoss?.toFixed(4)}
              </div>
              <div>
                <span className="font-semibold">Training Time:</span> {(modelSummary?.trainingTime / 1000).toFixed(1)}s
              </div>
              <div>
                <span className="font-semibold">Epochs Trained:</span> {modelSummary?.epochsTrained}
              </div>
            </div>
          </CardContent>
        </Card>

        {trainingHistory && trainingHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Final Training Progress</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Best Accuracy:</span> {Math.max(...trainingHistory.map(h => h.valAccuracy || 0)).toFixed(4)}
                  </div>
                  <div>
                    <span className="font-semibold">Best Loss:</span> {Math.min(...trainingHistory.map(h => h.valLoss)).toFixed(4)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            ML Model Training Interface
          </CardTitle>
          <CardDescription>
            Train real machine learning models with TensorFlow.js. Configure your model architecture, hyperparameters, and dataset.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="space-y-6">
              <TaskTypeSelector />
              <DatasetConfig />
              <HyperparameterConfig />
              
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={startTraining} 
                  disabled={isTraining}
                  className="flex-1"
                >
                  {isTraining ? (
                    <>
                      <Zap className="mr-2 h-4 w-4 animate-pulse" />
                      Training...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Training
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              {isTraining && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 animate-pulse text-blue-500" />
                    <h3 className="text-lg font-semibold">Training in Progress</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training Progress</span>
                      <span>{trainingProgress}%</span>
                    </div>
                    <Progress value={trainingProgress} className="h-2" />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your model is currently training. This may take a few minutes depending on the configuration.
                      You can monitor the progress in real-time.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {!isTraining && !trainingResult && (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">
                    Ready to Train
                  </h3>
                  <p className="text-slate-500">
                    Configure your model settings and click "Start Training" to begin.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results">
              {error && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <TrainingResults />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Dataset Viewer Modal */}
      {showDatasetViewer && (
        <DatasetViewer
          taskType={config.taskType}
          datasetConfig={config.datasetConfig}
          onClose={() => setShowDatasetViewer(false)}
        />
      )}
    </div>
  )
}