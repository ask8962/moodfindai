"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import MoodSelector from "@/components/mood-selector"
import TaskPlanner from "@/components/task-planner"
import QuickStats from "@/components/quick-stats"
import RecentJournals from "@/components/recent-journals"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Sun, Cloud, Moon, Flame } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [todayMoodLogged, setTodayMoodLogged] = useState(false)
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState({ text: "Hello", icon: Sun })

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting({ text: "Good morning", icon: Sun })
    } else if (hour < 17) {
      setGreeting({ text: "Good afternoon", icon: Cloud })
    } else {
      setGreeting({ text: "Good evening", icon: Moon })
    }

    if (user) {
      checkTodayMood()
    }
  }, [user])

  const checkTodayMood = async () => {
    if (!user) return

    const today = new Date().toISOString().split("T")[0]
    const moodRef = doc(db, "moods", `${user.uid}_${today}`)

    try {
      const moodDoc = await getDoc(moodRef)
      if (moodDoc.exists()) {
        setCurrentMood(moodDoc.data().mood)
        setTodayMoodLogged(true)
      }
    } catch (error) {
      console.error("Error checking today mood:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoodSelect = async (mood: string) => {
    if (!user) return

    const today = new Date().toISOString().split("T")[0]
    const moodRef = doc(db, "moods", `${user.uid}_${today}`)

    try {
      await setDoc(moodRef, {
        userId: user.uid,
        mood,
        date: today,
        timestamp: new Date(),
      })

      setCurrentMood(mood)
      setTodayMoodLogged(true)
    } catch (error) {
      console.error("Error saving mood:", error)
    }
  }

  const getMoodLabel = (mood: string) => {
    const labels: Record<string, string> = {
      "😊": "Happy",
      "😢": "Sad",
      "😠": "Angry",
      "😰": "Anxious",
      "😴": "Tired",
      "🤗": "Excited",
      "😌": "Calm",
      "🤔": "Thoughtful",
      "😍": "Loved",
      "😎": "Confident",
      "🥺": "Vulnerable",
      "🤯": "Overwhelmed",
    }
    return labels[mood] || "Good"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-ping" />
          </div>
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const GreetingIcon = greeting.icon

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <GreetingIcon className="w-4 h-4" />
            <span>{greeting.text}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome back, {user?.displayName?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-muted-foreground">
            How are you feeling today? Let's plan your day around your emotions.
          </p>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-full">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-foreground">7 day streak</span>
        </div>
      </div>

      {/* Mood Selection */}
      {!todayMoodLogged ? (
        <Card className="card-premium border-border overflow-hidden relative">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />

          <CardHeader className="relative border-b border-border">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 relative">
            <MoodSelector onMoodSelect={handleMoodSelect} />
          </CardContent>
        </Card>
      ) : (
        <Card className="card-premium border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="text-6xl animate-bounce" style={{ animationDuration: "2s" }}>{currentMood}</div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-background">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Today's mood</p>
                  <p className="text-2xl font-bold text-foreground">Feeling {getMoodLabel(currentMood || "")}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Logged successfully • Come back tomorrow!
                  </p>
                </div>
              </div>

              {/* Mood-based message */}
              <div className="hidden md:block max-w-xs">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-sm text-foreground">
                    {currentMood === "😊" && "Great mood! Perfect time to tackle challenging tasks."}
                    {currentMood === "😌" && "Calm and centered. A good day for mindful activities."}
                    {currentMood === "😴" && "Take it easy today. Focus on restful activities."}
                    {currentMood === "🤗" && "Your energy is high! Share it with others."}
                    {currentMood === "🤔" && "Reflective mood. Great for planning and learning."}
                    {!["😊", "😌", "😴", "🤗", "🤔"].includes(currentMood || "") && "Check your suggested tasks below!"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <QuickStats currentMood={currentMood} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Task Planner */}
        <TaskPlanner currentMood={currentMood} />

        {/* Recent Journals */}
        <RecentJournals />
      </div>
    </div>
  )
}
