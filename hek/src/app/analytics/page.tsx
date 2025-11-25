'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Brain,
  Activity,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Filter
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalModels: number
    activeTasks: number
    totalUsers: number
    totalRevenue: number
    growthRate: number
  }
  models: {
    id: string
    name: string
    accuracy: number
    contributions: number
    revenue: number
    status: 'active' | 'training' | 'completed'
    lastUpdated: string
  }[]
  tasks: {
    id: string
    title: string
    participants: number
    progress: number
    reward: number
    status: 'active' | 'completed' | 'pending'
    deadline: string
  }[]
  users: {
    id: string
    name: string
    contributions: number
    reputation: number
    joinedAt: string
    lastActive: string
  }[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock analytics data
        const mockData: AnalyticsData = {
          overview: {
            totalModels: 156,
            activeTasks: 23,
            totalUsers: 1247,
            totalRevenue: 45678,
            growthRate: 23.5
          },
          models: [
            {
              id: '1',
              name: 'Image Classification v2.1',
              accuracy: 94.2,
              contributions: 47,
              revenue: 2340,
              status: 'active',
              lastUpdated: '2024-01-15'
            },
            {
              id: '2',
              name: 'Sentiment Analysis Pro',
              accuracy: 89.7,
              contributions: 32,
              revenue: 1890,
              status: 'training',
              lastUpdated: '2024-01-14'
            },
            {
              id: '3',
              name: 'Fraud Detection Model',
              accuracy: 96.8,
              contributions: 28,
              revenue: 3120,
              status: 'completed',
              lastUpdated: '2024-01-13'
            }
          ],
          tasks: [
            {
              id: '1',
              title: 'Medical Image Classification',
              participants: 89,
              progress: 67,
              reward: 5000,
              status: 'active',
              deadline: '2024-02-01'
            },
            {
              id: '2',
              title: 'Financial Risk Assessment',
              participants: 124,
              progress: 89,
              reward: 7500,
              status: 'active',
              deadline: '2024-01-25'
            },
            {
              id: '3',
              title: 'Customer Sentiment Analysis',
              participants: 56,
              progress: 100,
              reward: 3200,
              status: 'completed',
              deadline: '2024-01-20'
            }
          ],
          users: [
            {
              id: '1',
              name: 'Alice Johnson',
              contributions: 23,
              reputation: 4.7,
              joinedAt: '2023-11-15',
              lastActive: '2024-01-15'
            },
            {
              id: '2',
              name: 'Bob Smith',
              contributions: 18,
              reputation: 4.3,
              joinedAt: '2023-12-01',
              lastActive: '2024-01-14'
            },
            {
              id: '3',
              name: 'Carol Williams',
              contributions: 31,
              reputation: 4.9,
              joinedAt: '2023-10-20',
              lastActive: '2024-01-15'
            }
          ]
        }
        
        setAnalyticsData(mockData)
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeRange])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'training':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'training':
        return 'Training'
      case 'completed':
        return 'Completed'
      case 'pending':
        return 'Pending'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No Analytics Data
          </h3>
          <p className="text-slate-500">
            Unable to load analytics data. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Monitor platform performance and user engagement
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
              <TabsTrigger value="1y">1 Year</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <Brain className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalModels}</div>
            <p className="text-xs text-slate-500">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.activeTasks}</div>
            <p className="text-xs text-slate-500">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                +8% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-slate-500">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                +{analyticsData.overview.growthRate}% growth
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                +18% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Models
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>
                Track model accuracy, contributions, and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.models.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{model.name}</h4>
                        <Badge className={getStatusColor(model.status)}>
                          {getStatusLabel(model.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <span>Accuracy: {model.accuracy}%</span>
                        <span>Contributions: {model.contributions}</span>
                        <span>Revenue: ${model.revenue}</span>
                        <span>Last updated: {model.lastUpdated}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Progress</CardTitle>
              <CardDescription>
                Monitor active training tasks and participant engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{task.title}</h4>
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-600 mb-2">
                        <span>Participants: {task.participants}</span>
                        <span>Reward: ${task.reward}</span>
                        <span>Deadline: {task.deadline}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{task.progress}% complete</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Track user contributions and platform engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{user.name}</h4>
                        <Badge variant="outline">
                          Reputation: {user.reputation}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <span>Contributions: {user.contributions}</span>
                        <span>Joined: {user.joinedAt}</span>
                        <span>Last active: {user.lastActive}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>
                  System health and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>System Uptime</span>
                    <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Response Time</span>
                    <span className="font-semibold">245ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Training Success Rate</span>
                    <span className="font-semibold">97.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Daily Active Users</span>
                    <span className="font-semibold">342</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>
                  Income sources and distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Model Sales</span>
                    <span className="font-semibold">$28,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Task Fees</span>
                    <span className="font-semibold">$12,230</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Commission</span>
                    <span className="font-semibold">$4,998</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Other</span>
                    <span className="font-semibold">$0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}