'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateTaskForm } from '@/components/tasks/CreateTaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { 
  Brain, 
  Plus, 
  List, 
  Play,
  Eye,
  ArrowLeft,
  Users,
  TrendingUp,
  DollarSign,
  Target
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  datasetUri: string
  targetAccuracy: number
  currentAccuracy: number
  rewardPool: number
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  creator: {
    id: string
    name: string
    walletAddress: string
    reputationScore: number
  }
  _count: {
    contributions: number
    modelNfts: number
  }
}

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState('browse')
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/tasks')
      const data = await response.json()
      if (data.tasks) {
        setTasks(data.tasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTask = async (taskData: any) => {
    try {
      setIsCreatingTask(true)
      
      // Get or create user (in a real app, this would come from wallet connection)
      const userId = 'user_123' // Mock user ID
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskData,
          creatorId: userId,
        }),
      })
      
      const data = await response.json()
      
      if (data.task) {
        // Refresh tasks list
        await fetchTasks()
        // Switch to browse tab
        setActiveTab('browse')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsCreatingTask(false)
    }
  }

  const handleStartTask = async (taskId: string) => {
    try {
      // Get the task details
      const task = tasks.find(t => t.id === taskId)
      if (!task) return
      
      // Simulate starting federated learning
      const userId = 'user_123' // Mock user ID
      
      const response = await fetch('/api/simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId,
          contributorId: userId,
          rounds: 3, // Simulate 3 training rounds
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Refresh tasks to show updated progress
        await fetchTasks()
        // Show success message or redirect to training page
        alert(`Training completed! Final accuracy: ${(data.finalAccuracy * 100).toFixed(2)}%`)
      }
    } catch (error) {
      console.error('Error starting task:', error)
      alert('Failed to start training. Please try again.')
    }
  }

  const handleViewTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      setSelectedTask(task)
      setActiveTab('details')
    }
  }

  const TaskDetails = ({ task }: { task: Task }) => {
    const progress = (task.currentAccuracy / task.targetAccuracy) * 100
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setActiveTab('browse')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>
          <Badge className={
            task.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
            task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
            task.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }>
            {task.status}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              {task.title}
            </CardTitle>
            <CardDescription>
              Created by {task.creator.name} • {new Date(task.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-slate-600 dark:text-slate-300">{task.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Training Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Accuracy</span>
                    <span>{(task.currentAccuracy * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Accuracy</span>
                    <span>{(task.targetAccuracy * 100).toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500">{progress.toFixed(1)}% complete</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Task Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Reward Pool
                    </span>
                    <span>{task.rewardPool.toFixed(0)} FEDAI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Contributors
                    </span>
                    <span>{task._count.contributions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Models Created
                    </span>
                    <span>{task._count.modelNfts}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              {task.status === 'ACTIVE' && (
                <Button onClick={() => handleStartTask(task.id)}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Training
                </Button>
              )}
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Dataset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Training Tasks</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Create and contribute to federated learning tasks
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Browse Tasks
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Task
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Task Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-8">
          <TaskList 
            tasks={tasks}
            onStartTask={handleStartTask}
            onViewTask={handleViewTask}
          />
        </TabsContent>

        <TabsContent value="create" className="mt-8">
          <CreateTaskForm 
            onSubmit={handleCreateTask}
            isLoading={isCreatingTask}
          />
        </TabsContent>

        <TabsContent value="details" className="mt-8">
          {selectedTask ? (
            <TaskDetails task={selectedTask} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Eye className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  No Task Selected
                </h3>
                <p className="text-slate-500">
                  Select a task from the browse tab to view details
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}