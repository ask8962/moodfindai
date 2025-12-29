"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { differenceInCalendarDays, parseISO, startOfDay, subDays } from "date-fns"

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    progress: number
    total: number
}

export function useStreaks() {
    const { user } = useAuth()
    const [currentStreak, setCurrentStreak] = useState(0)
    const [longestStreak, setLongestStreak] = useState(0)
    const [totalLogs, setTotalLogs] = useState(0)
    const [loading, setLoading] = useState(true)
    const [achievements, setAchievements] = useState<Achievement[]>([])

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        const fetchStreakData = async () => {
            try {
                const moodsRef = collection(db, "moods")
                // Get all moods for the user (we need them to calculate streaks properly)
                // In a real production app with thousands of logs, we might want to paginate or aggregate this
                const q = query(
                    moodsRef,
                    where("userId", "==", user.uid),
                    orderBy("date", "desc")
                )

                const snapshot = await getDocs(q)
                const dates = snapshot.docs.map(doc => doc.data().date).sort().reverse() // Newest first

                setTotalLogs(dates.length)

                // Calculate Streak
                let streak = 0
                const today = startOfDay(new Date())
                const yesterday = subDays(today, 1)

                // Remove duplicates just in case
                const uniqueDates = Array.from(new Set(dates))

                if (uniqueDates.length > 0) {
                    const latestLogDate = parseISO(uniqueDates[0])

                    // If the latest log is today or yesterday, the streak is alive
                    if (differenceInCalendarDays(today, latestLogDate) <= 1) {
                        streak = 1
                        for (let i = 0; i < uniqueDates.length - 1; i++) {
                            const current = parseISO(uniqueDates[i])
                            const next = parseISO(uniqueDates[i + 1])

                            if (differenceInCalendarDays(current, next) === 1) {
                                streak++
                            } else {
                                break
                            }
                        }
                    }
                }

                setCurrentStreak(streak)
                // Note: Longest streak calculation would be more complex, skipping for now or setting same as current for MVP if current is high
                setLongestStreak(streak) // Simplified for MVP

                // Calculate Achievements
                const newAchievements: Achievement[] = [
                    {
                        id: "first_step",
                        title: "First Step",
                        description: "Log your first mood",
                        icon: "🌱",
                        unlocked: snapshot.size >= 1,
                        progress: Math.min(snapshot.size, 1),
                        total: 1
                    },
                    {
                        id: "three_day",
                        title: "Consistency",
                        description: "Log your mood for 3 days in a row",
                        icon: "🔥",
                        unlocked: streak >= 3,
                        progress: Math.min(streak, 3),
                        total: 3
                    },
                    {
                        id: "week_warrior",
                        title: "Week Warrior",
                        description: "7 day streak! You're on fire!",
                        icon: "🏆",
                        unlocked: streak >= 7,
                        progress: Math.min(streak, 7),
                        total: 7
                    },
                    {
                        id: "reflection_master",
                        title: "Reflection Master",
                        description: "Log 30 total moods",
                        icon: "🧘",
                        unlocked: snapshot.size >= 30,
                        progress: Math.min(snapshot.size, 30),
                        total: 30
                    }
                ]

                setAchievements(newAchievements)

            } catch (error) {
                console.error("Error calculating streaks:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStreakData()
    }, [user])

    return { currentStreak, longestStreak, totalLogs, achievements, loading }
}
