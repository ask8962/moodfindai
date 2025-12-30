"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Calendar, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: string
  createdAt: Date
}

export default function JournalPage() {
  const { user } = useAuth()
  const [journals, setJournals] = useState<JournalEntry[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchJournals()
      fetchTodayMood()
    }
  }, [user])

  const fetchTodayMood = async () => {
    if (!user) return

    const today = new Date().toISOString().split("T")[0]
    const moodRef = doc(db, "moods", `${user.uid}_${today}`)

    try {
      const moodDoc = await getDoc(moodRef)
      if (moodDoc.exists()) {
        setCurrentMood(moodDoc.data().mood)
      }
    } catch (error) {
      console.error("Error fetching today mood:", error)
    }
  }

  const fetchJournals = async () => {
    if (!user) return

    try {
      const journalsQuery = query(collection(db, "journal"), where("userId", "==", user.uid))
      const querySnapshot = await getDocs(journalsQuery)
      const journalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as JournalEntry[]

      // Sort by date on client side
      journalsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

      setJournals(journalsData)
    } catch (error) {
      console.error("Error fetching journals:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveJournal = async () => {
    if (!user || !newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const docRef = await addDoc(collection(db, "journal"), {
        userId: user.uid,
        title: newTitle.trim(),
        content: newContent.trim(),
        mood: currentMood || "📝",
        createdAt: new Date(),
      })

      const newJournal: JournalEntry = {
        id: docRef.id,
        title: newTitle.trim(),
        content: newContent.trim(),
        mood: currentMood || "📝",
        createdAt: new Date(),
      }

      setJournals([newJournal, ...journals])
      setNewTitle("")
      setNewContent("")

      toast({
        title: "Journal saved!",
        description: "Your journal entry has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving journal:", error)
      toast({
        title: "Error",
        description: "Failed to save journal entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-white/10 rounded w-1/4"></div>
          <div className="h-64 bg-white/10 rounded"></div>
          <div className="space-y-4">
            <div className="h-32 bg-white/10 rounded"></div>
            <div className="h-32 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Daily Journal</h1>
        <p className="text-gray-300 text-lg">Reflect on your day and connect your thoughts with your emotions</p>
      </div>

      {/* New Journal Entry */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-400" />
            New Journal Entry
            {currentMood && (
              <Badge variant="outline" className="border-purple-400/50 text-purple-300">
                Today's mood: {currentMood}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Give your entry a title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
          <Textarea
            placeholder="What's on your mind today? How are you feeling? What happened that made you feel this way?"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px]"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">{!currentMood && "Log your mood first to link it with this entry"}</p>
            <Button
              onClick={saveJournal}
              disabled={saving || !newTitle.trim() || !newContent.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              {saving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          Your Journal Entries
        </h2>

        {journals.length === 0 ? (
          <Card className="glass-effect border-white/10">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No entries yet</h3>
              <p className="text-gray-400 mb-6">Start journaling to track your thoughts and emotions over time.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {journals.map((journal) => (
              <Card key={journal.id} className="glass-effect border-white/10 hover:border-white/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{journal.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(journal.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          Mood: {journal.mood}
                        </div>
                      </div>
                    </div>
                    <div className="text-3xl ml-4">{journal.mood}</div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{journal.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
