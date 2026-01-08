"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: string
  createdAt: Date
}

export default function RecentJournals() {
  const { user } = useAuth()
  const [journals, setJournals] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchRecentJournals()
    }
  }, [user])

  const fetchRecentJournals = async () => {
    if (!user) return

    try {
      const journalsQuery = query(
        collection(db, "journal"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(3)
      )
      const querySnapshot = await getDocs(journalsQuery)
      const journalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as JournalEntry[]

      setJournals(journalsData)
    } catch (error) {
      console.error("Error fetching journals:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <Card className="card-premium border-border">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-5 bg-muted rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-premium border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Recent Journals
          </div>
          <Link href="/dashboard/journal">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-1" />
              New Entry
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {journals.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">No journal entries yet</p>
            <Link href="/dashboard/journal">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Write Your First Entry
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {journals.map((journal) => (
              <div
                key={journal.id}
                className="p-4 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground truncate flex-1">{journal.title}</h4>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-lg">{journal.mood}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(journal.createdAt)}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">{journal.content}</p>
              </div>
            ))}
            <Link href="/dashboard/journal">
              <Button variant="outline" className="w-full border-border hover:bg-muted">
                View All Entries
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
