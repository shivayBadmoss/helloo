'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { 
  Code, 
  FileText, 
  MessageSquare, 
  GitBranch, 
  Terminal,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Users
} from 'lucide-react'

interface CodeSpaceProps {
  isOpen: boolean
  onClose: () => void
}

interface ContributionTemplate {
  id: string
  name: string
  description: string
  template: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface ContributionExample {
  title: string
  description: string
  type: 'bugfix' | 'feature' | 'improvement' | 'documentation'
  status: 'open' | 'in-progress' | 'completed'
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function CodeSpace({ isOpen, onClose }: CodeSpaceProps) {
  const [activeTab, setActiveTab] = useState('editor')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [code, setCode] = useState('')
  const [fileName, setFileName] = useState('')
  const [description, setDescription] = useState('')
  const [contributionType, setContributionType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contributionTemplates: ContributionTemplate[] = [
    {
      id: 'model-improvement',
      name: 'Model Improvement',
      description: 'Enhance existing ML models with better algorithms or optimizations',
      template: `// Model Improvement Template
import { db } from '@/lib/db'

/**
 * Model Improvement: [Your Model Name]
 * 
 * Description: [Brief description of your improvement]
 * 
 * Expected Benefits:
 * - [Benefit 1]
 * - [Benefit 2]
 * - [Benefit 3]
 */

export class ImprovedModel {
  constructor() {
    // Initialize your improved model
  }

  async train(data: any[]) {
    // Implement your training logic
    throw new Error('Training logic not implemented')
  }

  async predict(input: any) {
    // Implement your prediction logic
    throw new Error('Prediction logic not implemented')
  }

  evaluate(testData: any[]) {
    // Implement evaluation metrics
    throw new Error('Evaluation logic not implemented')
  }
}

// Export your improved model
export default ImprovedModel`,
      language: 'typescript',
      difficulty: 'intermediate'
    },
    {
      id: 'data-preprocessing',
      name: 'Data Preprocessing',
      description: 'Add new data preprocessing utilities and transformations',
      template: `// Data Preprocessing Template
/**
 * Data Preprocessing Utility
 * 
 * Description: [Describe your preprocessing function]
 * 
 * Input: [Describe input format]
 * Output: [Describe output format]
 */

export interface PreprocessingConfig {
  // Define your configuration options
  normalize?: boolean
  removeOutliers?: boolean
  fillMissing?: 'mean' | 'median' | 'mode' | 'drop'
}

export function preprocessData(data: any[], config: PreprocessingConfig) {
  // Implement your preprocessing logic
  let processedData = [...data]

  // Example: Normalization
  if (config.normalize) {
    // Add normalization logic
  }

  // Example: Outlier removal
  if (config.removeOutliers) {
    // Add outlier removal logic
  }

  // Example: Missing value handling
  if (config.fillMissing) {
    // Add missing value handling logic
  }

  return processedData
}

// Export additional helper functions
export { }`,
      language: 'typescript',
      difficulty: 'beginner'
    },
    {
      id: 'ui-component',
      name: 'UI Component',
      description: 'Create new UI components for the ML platform',
      template: `'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ComponentNameProps {
  // Define your component props
  title?: string
  data?: any[]
}

export default function ComponentName({ 
  title = 'Default Title',
  data = []
}: ComponentNameProps) {
  const [state, setState] = useState()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Component description
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your component JSX */}
        <div className="space-y-4">
          <p>Your component content here</p>
          <Button onClick={() => {}}>
            Action Button
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}`,
      language: 'typescript',
      difficulty: 'beginner'
    },
    {
      id: 'api-endpoint',
      name: 'API Endpoint',
      description: 'Add new API endpoints for ML functionality',
      template: `import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Implement GET logic
    const data = await db.example.findMany()
    
    return NextResponse.json({ 
      success: true, 
      data 
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.requiredField) {
      return NextResponse.json(
        { success: false, error: 'Missing required field' },
        { status: 400 }
      )
    }

    // Implement POST logic
    const result = await db.example.create({
      data: body
    })

    return NextResponse.json({ 
      success: true, 
      data: result 
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}`,
      language: 'typescript',
      difficulty: 'intermediate'
    }
  ]

  const contributionExamples: ContributionExample[] = [
    {
      title: 'Add Support for Custom Loss Functions',
      description: 'Implement ability to define and use custom loss functions in neural network training',
      type: 'feature',
      status: 'open',
      difficulty: 'medium'
    },
    {
      title: 'Fix Memory Leak in Data Loading',
      description: 'Resolve memory consumption issue when loading large datasets for training',
      type: 'bugfix',
      status: 'in-progress',
      difficulty: 'hard'
    },
    {
      title: 'Improve Model Evaluation Dashboard',
      description: 'Add more comprehensive metrics and visualizations to the model evaluation interface',
      type: 'improvement',
      status: 'open',
      difficulty: 'easy'
    },
    {
      title: 'Add API Documentation',
      description: 'Create comprehensive API documentation with examples and best practices',
      type: 'documentation',
      status: 'open',
      difficulty: 'easy'
    }
  ]

  const handleTemplateSelect = (templateId: string) => {
    const template = contributionTemplates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setCode(template.template)
      setFileName(`${template.id}.ts`)
    }
  }

  const handleSubmitContribution = async () => {
    if (!code || !fileName || !description || !contributionType) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call to submit contribution
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Contribution submitted successfully! Our team will review it soon.')
      
      // Reset form
      setCode('')
      setFileName('')
      setDescription('')
      setContributionType('')
      setSelectedTemplate('')
      
    } catch (error) {
      alert('Failed to submit contribution. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Contribute to ML Platform
          </DialogTitle>
          <DialogDescription>
            Share your code, ideas, and improvements with the community
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code Editor
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="guidelines" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contribution-type">Contribution Type</Label>
                  <Select value={contributionType} onValueChange={setContributionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contribution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bugfix">Bug Fix</SelectItem>
                      <SelectItem value="feature">New Feature</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                      <SelectItem value="test">Test Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="file-name">File Name</Label>
                  <Input
                    id="file-name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="example: my-contribution.ts"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your contribution and its benefits..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitContribution}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Contribution
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="code">Code</Label>
                <Textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here or select a template..."
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contributionTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge className={getDifficultyColor(template.difficulty)}>
                        {template.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.language}</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contributionExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(example.difficulty)}>
                          {example.difficulty}
                        </Badge>
                        <Badge className={getStatusColor(example.status)}>
                          {example.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{example.type}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={example.status !== 'open'}
                      >
                        {example.status === 'open' ? 'Start Working' : 'In Progress'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Contribution Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Code Quality</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Follow TypeScript best practices</li>
                      <li>• Include proper error handling</li>
                      <li>• Add comments for complex logic</li>
                      <li>• Ensure code is testable</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Testing</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Write unit tests for new features</li>
                      <li>• Test edge cases and error conditions</li>
                      <li>• Ensure existing tests still pass</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Documentation</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Update relevant documentation</li>
                      <li>• Include usage examples</li>
                      <li>• Document API changes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Review Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Submission</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• All contributions are reviewed</li>
                      <li>• Response within 3-5 business days</li>
                      <li>• Feedback will be provided</li>
                      <li>• Revisions may be requested</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Recognition</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Contributors are acknowledged</li>
                      <li>• Top contributors featured</li>
                      <li>• Contribution badges awarded</li>
                      <li>• Community recognition</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Support</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Mentorship available</li>
                      <li>• Code review assistance</li>
                      <li>• Technical guidance</li>
                      <li>• Community forum</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Terminal className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-semibold">Developer Forum</h4>
                    <p className="text-sm text-gray-600">Get help and discuss ideas</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold">Discord Community</h4>
                    <p className="text-sm text-gray-600">Real-time chat and support</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <GitBranch className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-semibold">GitHub Discussions</h4>
                    <p className="text-sm text-gray-600">Feature requests and issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}