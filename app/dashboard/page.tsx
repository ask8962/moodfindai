"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import MoodSelector from "@/components/mood-selector"
import TaskPlanner from "@/components/task-planner"
import QuickStats from "@/components/quick-stats"
import RecentJournals from "@/components/recent-journals"
import MoodTunes from "@/components/mood-tunes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Sun, Cloud, Moon, Flame, Zap, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
  const { user } = useAuth()
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [todayMoodLogged, setTodayMoodLogged] = useState(false)
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState({ text: "Hello", icon: Sun })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
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

  const GreetingIcon = greeting.icon

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="flex flex-col items-center gap-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.p
            className="text-lg font-medium text-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading your dashboard...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Floating Gradient Orbs with Parallax */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Decorative Icons */}
        <motion.div
          className="absolute top-1/4 right-1/4 opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 opacity-20"
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Zap className="w-6 h-6 text-amber-500" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-10 opacity-20"
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Sparkles className="w-10 h-10 text-purple-500" />
        </motion.div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Welcome Header with Animation */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-1">
            <motion.div
              className="flex items-center gap-2 text-muted-foreground text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GreetingIcon className="w-4 h-4" />
              <span>{greeting.text}</span>
            </motion.div>
            <motion.h1
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              Welcome back, {user?.displayName?.split(" ")[0] || "there"} 👋
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              How are you feeling today? Let's plan your day around your emotions.
            </motion.p>
          </div>

          {/* Animated Streak Badge */}
          <motion.div
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 border border-orange-500/30 rounded-2xl backdrop-blur-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.3)" }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Flame className="w-6 h-6 text-orange-500" />
            </motion.div>
            <span className="text-sm font-bold text-foreground">7 day streak 🔥</span>
          </motion.div>
        </motion.div>

        {/* Mood Selection Card with 3D Effect */}
        <AnimatePresence mode="wait">
          {!todayMoodLogged ? (
            <motion.div
              key="mood-selector"
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Card className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-card/90 via-card/80 to-card/60 border border-white/10 shadow-2xl">
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <CardHeader className="relative border-b border-white/10 pb-4">
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <span>How are you feeling today?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 relative">
                  <MoodSelector onMoodSelect={handleMoodSelect} />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="mood-logged"
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Card className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-card/90 via-card/80 to-card/60 border border-white/10 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <motion.div
                        className="relative"
                        animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <motion.div
                          className="text-7xl"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                        >
                          {currentMood}
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center border-4 border-background shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.3 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      </motion.div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Today's mood</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                          Feeling {getMoodLabel(currentMood || "")}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          Logged successfully • Come back tomorrow!
                        </p>
                      </div>
                    </div>

                    {/* Mood Tip */}
                    <div className="hidden md:block max-w-xs">
                      <div className="p-5 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20 backdrop-blur-xl">
                        <p className="text-sm text-foreground font-medium">
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <QuickStats currentMood={currentMood} />
        </motion.div>

        {/* Mood Tunes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <MoodTunes currentMood={currentMood} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <TaskPlanner currentMood={currentMood} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <RecentJournals />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
