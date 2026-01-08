"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Target, Heart } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [moodData, setMoodData] = useState<any[]>([])
  const [taskData, setTaskData] = useState<any[]>([])
  const [moodDistribution, setMoodDistribution] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchAnalyticsData()
    }
  }, [user])

  const fetchAnalyticsData = async () => {
    if (!user) return

    try {
      // Fetch mood data for the last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const moodsQuery = query(collection(db, "moods"), where("userId", "==", user.uid))
      const moodsSnapshot = await getDocs(moodsQuery)

      // Process mood data for charts
      const moodsByDate: Record<string, string[]> = {}
      const moodCounts: Record<string, number> = {}

      moodsSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        const date = data.date
        const mood = data.mood

        if (!moodsByDate[date]) {
          moodsByDate[date] = []
        }
        moodsByDate[date].push(mood)

        moodCounts[mood] = (moodCounts[mood] || 0) + 1
      })

      // Create mood trend data
      const moodTrendData = Object.entries(moodsByDate).map(([date, moods]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        moodScore: calculateMoodScore(moods[0]),
        mood: moods[0],
      }))

      // Create mood distribution data
      const distributionData = Object.entries(moodCounts).map(([mood, count]) => ({
        mood,
        count,
        percentage: Math.round((count / moodsSnapshot.size) * 100),
      }))

      // Fetch task completion data
      const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid))
      const tasksSnapshot = await getDocs(tasksQuery)

      const tasksByMood: Record<string, { total: number; completed: number }> = {}
      tasksSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        const mood = data.mood

        if (!tasksByMood[mood]) {
          tasksByMood[mood] = { total: 0, completed: 0 }
        }

        tasksByMood[mood].total++
        if (data.completed) {
          tasksByMood[mood].completed++
        }
      })

      const taskCompletionData = Object.entries(tasksByMood).map(([mood, stats]) => ({
        mood,
        completionRate: Math.round((stats.completed / stats.total) * 100) || 0,
        total: stats.total,
        completed: stats.completed,
      }))

      setMoodData(moodTrendData)
      setTaskData(taskCompletionData)
      setMoodDistribution(distributionData)
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateMoodScore = (mood: string): number => {
    const moodScores: Record<string, number> = {
      "😊": 8,
      "🤗": 9,
      "😍": 9,
      "😎": 8,
      "😌": 7,
      "🤔": 6,
      "😢": 3,
      "😰": 4,
      "🥺": 4,
      "😠": 2,
      "😴": 5,
      "🤯": 3,
    }
    return moodScores[mood] || 5
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-white/10 rounded w-1/4"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-80 bg-white/10 rounded"></div>
            <div className="h-80 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Analytics Dashboard</h1>
        <p className="text-gray-300 text-lg">Insights into your emotional patterns and productivity trends</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Avg Mood Score</p>
                <p className="text-2xl font-bold text-white">
                  {moodData.length > 0
                    ? (moodData.reduce((sum, item) => sum + item.moodScore, 0) / moodData.length).toFixed(1)
                    : "0"}
                </p>
              </div>
              <Heart className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Days Tracked</p>
                <p className="text-2xl font-bold text-white">{moodData.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Avg Completion</p>
                <p className="text-2xl font-bold text-white">
                  {taskData.length > 0
                    ? Math.round(taskData.reduce((sum, item) => sum + item.completionRate, 0) / taskData.length)
                    : 0}
                  %
                </p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Mood Trend</p>
                <p className="text-2xl font-bold text-green-400">
                  {moodData.length > 1 && moodData[moodData.length - 1].moodScore > moodData[0].moodScore ? "↗" : "→"}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Mood Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {moodData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <XAxis
                      dataKey="date"
                      stroke="#6b7280"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0, 10]}
                      stroke="#6b7280"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                      itemStyle={{ color: '#a78bfa' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="moodScore"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#a78bfa', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p>No mood data yet</p>
                  <p className="text-sm">Start logging moods to see your patterns</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Task Completion by Mood</CardTitle>
          </CardHeader>
          <CardContent>
            {taskData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskData}>
                    <XAxis
                      dataKey="mood"
                      stroke="#6b7280"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Target className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <p>No task data yet</p>
                  <p className="text-sm">Add tasks to see productivity insights</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {moodDistribution.length > 0 ? (
              <div className="p-3 rounded-lg bg-purple-600/10 border border-purple-600/20">
                <p className="text-sm text-purple-300">
                  <strong>Most Common Mood:</strong> {moodDistribution[0]?.mood} ({moodDistribution[0]?.percentage}% of
                  the time)
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
                <p className="text-sm text-blue-300">
                  <strong>Getting Started:</strong> Start logging your daily moods to see personalized insights here!
                </p>
              </div>
            )}

            <div className="p-3 rounded-lg bg-green-600/10 border border-green-600/20">
              <p className="text-sm text-green-300">
                <strong>Tip:</strong> Regular mood tracking helps identify patterns and improve emotional awareness.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
