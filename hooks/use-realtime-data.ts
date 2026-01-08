"use client"

import { useState, useEffect } from "react"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import type { MoodEntry, Task, ChatMessage } from "@/types"

export function useRealtimeMoods() {
  const { user } = useAuth()
  const [moods, setMoods] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "moods"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc"),
      limit(30)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const moodsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        })) as MoodEntry[]
        setMoods(moodsData)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching moods:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [user])

  return { moods, loading }
}

export function useRealtimeTasks(moodFilter?: string) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    let q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    if (moodFilter) {
      q = query(
        collection(db, "tasks"),
        where("userId", "==", user.uid),
        where("mood", "==", moodFilter),
        orderBy("createdAt", "desc")
      )
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Task[]
        setTasks(tasksData)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching tasks:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [user, moodFilter])

  return { tasks, loading }
}

export function useRealtimeChat(mood: string) {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!mood) return

    const q = query(collection(db, "chat"), where("mood", "==", mood), orderBy("timestamp", "asc"), limit(100))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }))
        setMessages(messagesData)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching messages:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [mood])

  return { messages, loading }
}
