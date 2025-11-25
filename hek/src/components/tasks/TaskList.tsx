'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatasetViewer } from '../training/DatasetViewer'
import CodeSpace from '../contribution/CodeSpace'
import { 
  Brain, 
  Users, 
  DollarSign, 
  Target, 
  Clock,
  Play,
  Eye,
  TrendingUp,
  Award
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

interface TaskListProps {
  tasks: Task[]
  onStartTask?: (taskId: string) => void
  onViewTask?: (taskId: string) => void
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  ACTIVE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

const statusLabels = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export function TaskList({ tasks, onStartTask, onViewTask }: TaskListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all')
  const [showDatasetViewer, setShowDatasetViewer] = useState(false)
  const [showCodeSpace, setShowCodeSpace] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status.toLowerCase() === filter
  })

  const handleViewDataset = (task: Task) => {
    setSelectedTask(task)
    setShowDatasetViewer(true)
  }

  const handleContribute = (task: Task) => {
    setSelectedTask(task)
    setShowCodeSpace(true)
  }

  const TaskCard = ({ task }: { task: Task }) => {
    const progress = (task.currentAccuracy / task.targetAccuracy) * 100
    const isCompleted = task.status === 'COMPLETED'
    const isActive = task.status === 'ACTIVE'

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {task.description}
              </CardDescription>
            </div>
            <Badge className={statusColors[task.status]}>
              {statusLabels[task.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-slate-500" />
              <span>Target: {(task.targetAccuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-slate-500" />
              <span>Current: {(task.currentAccuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-500" />
              <span>Reward: {task.rewardPool.toFixed(0)} FEDAI</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-500" />
              <span>{task._count.contributions} contributors</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Training Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Brain className="h-4 w-4" />
              <span>{task.creator.name}</span>
              <Badge variant="outline" className="text-xs">
                {task.creator.reputationScore.toFixed(1)} rep
              </Badge>
            </div>
            <div className="flex gap-2">
              {onViewTask && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewTask(task.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDataset(task)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Dataset
              </Button>
              {isActive && onStartTask && (
                <Button
                  size="sm"
                  onClick={() => handleContribute(task)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Contribute
                </Button>
              )}
              {isCompleted && task._count.modelNfts > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onViewTask(task.id)}
                >
                  <Award className="h-4 w-4 mr-1" />
                  View Models
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Tasks</h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Brain className="h-4 w-4" />
          <span>{filteredTasks.length} tasks available</span>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Brain className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  No tasks found
                </h3>
                <p className="text-slate-500">
                  {filter === 'all' 
                    ? 'No training tasks available yet. Be the first to create one!'
                    : `No ${filter} tasks found. Try checking other categories.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Dataset Viewer Modal */}
      {showDatasetViewer && selectedTask && (
        <DatasetViewer
          taskType="classification" // Default task type
          datasetConfig={{
            numSamples: 1000,
            numFeatures: 10,
            numClasses: 3
          }}
          onClose={() => setShowDatasetViewer(false)}
        />
      )}
      
      {/* CodeSpace Modal */}
      {showCodeSpace && (
        <CodeSpace
          isOpen={showCodeSpace}
          onClose={() => setShowCodeSpace(false)}
        />
      )}
    </div>
  )
}