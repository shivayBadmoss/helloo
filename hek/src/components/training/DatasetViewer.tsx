'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Database, 
  Download, 
  Eye,
  FileText,
  BarChart3,
  AlertCircle
} from 'lucide-react'

interface DatasetViewerProps {
  taskType: string
  datasetConfig: {
    numSamples: number
    numFeatures?: number
    numClasses?: number
    vocabSize?: number
    maxLength?: number
  }
  onClose: () => void
}

export function DatasetViewer({ taskType, datasetConfig, onClose }: DatasetViewerProps) {
  const [activeTab, setActiveTab] = useState('preview')
  
  // Generate sample data based on task type
  const generateSampleData = () => {
    switch (taskType) {
      case 'classification':
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          features: Array.from({ length: datasetConfig.numFeatures || 10 }, () => 
            Math.round(Math.random() * 100)
          ),
          label: Math.floor(Math.random() * (datasetConfig.numClasses || 3))
        }))
      
      case 'regression':
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          features: Array.from({ length: datasetConfig.numFeatures || 10 }, () => 
            Math.round(Math.random() * 1000)
          ),
          target: Math.round(Math.random() * 1000)
        }))
      
      case 'sentiment':
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          text: [
            "This product is amazing! I love it so much.",
            "Terrible customer service, would not recommend.",
            "Average quality, nothing special but works.",
            "Outstanding performance, exceeded my expectations!",
            "Poor packaging, product arrived damaged.",
            "Great value for money, very satisfied.",
            "Disappointing experience, won't purchase again.",
            "Excellent build quality, highly recommend.",
            "Fast shipping and great communication."
          ][i],
          sentiment: i < 5 ? 1 : 0
        }))
      
      default:
        return []
    }
  }

  const sampleData = generateSampleData()

  const DatasetPreview = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sample Data Preview</h3>
        <Badge variant="outline">
          {sampleData.length} samples
        </Badge>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-medium">ID</th>
                {taskType === 'sentiment' ? (
                  <>
                    <th className="px-4 py-2 text-left font-medium">Text Sample</th>
                    <th className="px-4 py-2 text-left font-medium">Sentiment</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2 text-left font-medium">Features</th>
                    <th className="px-4 py-2 text-left font-medium">
                      {taskType === 'classification' ? 'Label' : 'Target'}
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900' : ''}>
                  <td className="px-4 py-2 border-t">{row.id}</td>
                  {taskType === 'sentiment' ? (
                    <>
                      <td className="px-4 py-2 border-t max-w-xs truncate" title={row.text}>
                        {row.text}
                      </td>
                      <td className="px-4 py-2 border-t">
                        <Badge variant={row.sentiment === 1 ? 'default' : 'secondary'}>
                          {row.sentiment === 1 ? 'Positive' : 'Negative'}
                        </Badge>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border-t">
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          [{row.features.join(', ')}]
                        </code>
                      </td>
                      <td className="px-4 py-2 border-t font-mono">
                        {row.label || row.target}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> This is sample data for demonstration purposes. 
            In a real federated learning scenario, each participant would train on their own private data 
            and only share model updates, not the raw data.
          </div>
        </div>
      </div>
    </div>
  )

  const DatasetStats = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dataset Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{datasetConfig.numSamples.toLocaleString()}</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">Total Samples</div>
        </div>
        
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {taskType === 'sentiment' ? '2' : datasetConfig.numFeatures || 10}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {taskType === 'sentiment' ? 'Sentiments' : 'Features'}
          </div>
        </div>
        
        {taskType !== 'sentiment' && (
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {taskType === 'classification' ? datasetConfig.numClasses || 3 : 'Continuous'}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              {taskType === 'classification' ? 'Classes' : 'Target Type'}
            </div>
          </div>
        )}
        
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {taskType === 'sentiment' ? `${datasetConfig.maxLength || 50} words` : 'Normalized'}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {taskType === 'sentiment' ? 'Max Length' : 'Data Format'}
          </div>
        </div>
      </div>
    </div>
  )

  const DatasetFormat = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Data Format</h3>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">File Structure</h4>
          <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
{`dataset_${taskType}/
├── train/
│   ├── features.csv
│   └── labels.csv
├── validation/
│   ├── features.csv
│   └── labels.csv
└── metadata.json`}
          </pre>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">CSV Format</h4>
          {taskType === 'sentiment' ? (
            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
{`text,sentiment
"This product is amazing!",1
"Terrible customer service.",0
"Average quality, nothing special.",1`}
            </pre>
          ) : (
            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
{`feature_1,feature_2,...,feature_n,label
0.5,0.3,0.8,...,0.2,1
0.1,0.6,0.9,...,0.7,2
0.8,0.2,0.5,...,0.1,0`}
            </pre>
          )}
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Database className="h-4 w-4 text-green-600 mt-0.5" />
          <div className="text-sm text-green-800 dark:text-green-200">
            <strong>Ready for Federated Learning:</strong> This dataset is structured for privacy-preserving 
            distributed training where each participant trains locally and shares only model updates.
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Dataset Viewer</h2>
            <Badge variant="outline">{taskType}</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="format" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Format
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-4">
              <DatasetPreview />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-4">
              <DatasetStats />
            </TabsContent>
            
            <TabsContent value="format" className="mt-4">
              <DatasetFormat />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-end gap-3 p-6 border-t bg-slate-50 dark:bg-slate-800">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Sample
          </Button>
        </div>
      </div>
    </div>
  )
}