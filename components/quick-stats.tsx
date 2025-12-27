"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Calendar, Users } from "lucide-react"

interface QuickStatsProps {
  currentMood: string | null
}

export default function QuickStats({ currentMood }: QuickStatsProps) {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    weeklyMoods: 0,
    completedTasks: 0,
    journalEntries: 0,
    moodBuddies: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    if (!user) return

    try {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      // Weekly moods
      const moodsQuery = query(
        collection(db, "moods"),
        where("userId", "==", user.uid),
        where("timestamp", ">=", weekAgo),
      )
      const moodsSnapshot = await getDocs(moodsQuery)

      // Completed tasks
      const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid), where("completed", "==", true))
      const tasksSnapshot = await getDocs(tasksQuery)

      // Journal entries
      const journalQuery = query(
        collection(db, "journal"),
        where("userId", "==", user.uid),
        where("createdAt", ">=", weekAgo),
      )
      const journalSnapshot = await getDocs(journalQuery)

      setStats({
        weeklyMoods: moodsSnapshot.size,
        completedTasks: tasksSnapshot.size,
        journalEntries: journalSnapshot.size,
        moodBuddies: Math.floor(Math.random() * 50) + 10, // Simulated for demo
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Weekly Moods",
      value: stats.weeklyMoods,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Tasks Completed",
      value: stats.completedTasks,
      icon: Target,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Journal Entries",
      value: stats.journalEntries,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "MoodBuddies",
      value: stats.moodBuddies,
      icon: Users,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="card-premium border-border">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="card-premium border-border hover:-translate-y-0.5 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
