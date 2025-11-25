'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PlusCircle, Upload, Brain, DollarSign, Target } from 'lucide-react'

interface TaskFormData {
  title: string
  description: string
  datasetUri: string
  targetAccuracy: string
  rewardPool: string
  modelType: string
}

interface CreateTaskFormProps {
  onSubmit: (taskData: TaskFormData) => void
  isLoading?: boolean
}

export function CreateTaskForm({ onSubmit, isLoading = false }: CreateTaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    datasetUri: '',
    targetAccuracy: '',
    rewardPool: '',
    modelType: '',
  })

  const [errors, setErrors] = useState<Partial<TaskFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.datasetUri.trim()) {
      newErrors.datasetUri = 'Dataset URI is required'
    }
    if (!formData.targetAccuracy || parseFloat(formData.targetAccuracy) <= 0 || parseFloat(formData.targetAccuracy) > 1) {
      newErrors.targetAccuracy = 'Target accuracy must be between 0 and 1'
    }
    if (!formData.rewardPool || parseFloat(formData.rewardPool) <= 0) {
      newErrors.rewardPool = 'Reward pool must be greater than 0'
    }
    if (!formData.modelType) {
      newErrors.modelType = 'Model type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Create New Training Task
        </CardTitle>
        <CardDescription>
          Launch a new federated learning task and invite contributors to help train your AI model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="e.g., Medical Image Classification for Disease Detection"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your task, the problem you're solving, and what kind of data contributors should expect..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelType">Model Type</Label>
            <Select value={formData.modelType} onValueChange={(value) => handleInputChange('modelType', value)}>
              <SelectTrigger className={errors.modelType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image_classification">Image Classification</SelectItem>
                <SelectItem value="nlp_classification">Text Classification</SelectItem>
                <SelectItem value="regression">Regression</SelectItem>
                <SelectItem value="object_detection">Object Detection</SelectItem>
                <SelectItem value="sentiment_analysis">Sentiment Analysis</SelectItem>
                <SelectItem value="recommendation">Recommendation System</SelectItem>
                <SelectItem value="time_series">Time Series Forecasting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.modelType && (
              <p className="text-sm text-red-500">{errors.modelType}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="datasetUri">Dataset URI</Label>
            <div className="flex gap-2">
              <Input
                id="datasetUri"
                placeholder="ipfs://Qm... or https://example.com/dataset"
                value={formData.datasetUri}
                onChange={(e) => handleInputChange('datasetUri', e.target.value)}
                className={errors.datasetUri ? 'border-red-500' : ''}
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {errors.datasetUri && (
              <p className="text-sm text-red-500">{errors.datasetUri}</p>
            )}
            <p className="text-sm text-slate-500">
              Provide a URI where contributors can access the dataset information
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAccuracy" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Target Accuracy
              </Label>
              <Input
                id="targetAccuracy"
                type="number"
                step="0.01"
                min="0"
                max="1"
                placeholder="0.95"
                value={formData.targetAccuracy}
                onChange={(e) => handleInputChange('targetAccuracy', e.target.value)}
                className={errors.targetAccuracy ? 'border-red-500' : ''}
              />
              {errors.targetAccuracy && (
                <p className="text-sm text-red-500">{errors.targetAccuracy}</p>
              )}
              <p className="text-sm text-slate-500">0.0 to 1.0 (e.g., 0.95 for 95%)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rewardPool" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Reward Pool (FEDAI)
              </Label>
              <Input
                id="rewardPool"
                type="number"
                step="0.01"
                min="0"
                placeholder="1000"
                value={formData.rewardPool}
                onChange={(e) => handleInputChange('rewardPool', e.target.value)}
                className={errors.rewardPool ? 'border-red-500' : ''}
              />
              {errors.rewardPool && (
                <p className="text-sm text-red-500">{errors.rewardPool}</p>
              )}
              <p className="text-sm text-slate-500">Total tokens to distribute</p>
            </div>
          </div>

          {formData.targetAccuracy && formData.rewardPool && (
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p><strong>Estimated rewards:</strong></p>
                  <p>• Each 1% improvement: ~{(parseFloat(formData.rewardPool) * 0.1).toFixed(2)} FEDAI</p>
                  <p>• Contributors earn ongoing royalties from model sales</p>
                  <p>• Platform fee: 2.5% of all marketplace transactions</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Creating Task...' : 'Create Task'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setFormData({
              title: '',
              description: '',
              datasetUri: '',
              targetAccuracy: '',
              rewardPool: '',
              modelType: '',
            })}>
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}