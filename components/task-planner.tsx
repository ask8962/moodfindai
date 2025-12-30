"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Sparkles, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRealtimeTasks } from "@/hooks/use-realtime-data"
import { useMobile } from "@/hooks/use-mobile"

interface TaskPlannerProps {
  currentMood: string | null
}

export default function TaskPlanner({ currentMood }: TaskPlannerProps) {
  const { user } = useAuth()
  const { tasks, loading } = useRealtimeTasks(currentMood || undefined)
  const [newTask, setNewTask] = useState("")
  const [adding, setAdding] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  const moodSuggestions: Record<string, string[]> = {
    "😊": ["Call a friend", "Go for a walk", "Try a new recipe", "Listen to upbeat music"],
    "😢": ["Practice self-care", "Write in journal", "Watch a comfort movie", "Take a warm bath"],
    "😠": ["Do some exercise", "Practice deep breathing", "Clean or organize", "Listen to calming music"],
    "😰": ["Practice meditation", "Do breathing exercises", "Take a short walk", "Listen to calming sounds"],
    "😴": ["Take a power nap", "Do light stretching", "Drink some tea", "Read a book"],
    "🤗": ["Start a new project", "Plan something fun", "Connect with friends", "Try something creative"],
    "😌": ["Practice mindfulness", "Do yoga", "Read a book", "Enjoy nature"],
    "🤔": ["Plan your goals", "Learn something new", "Organize your thoughts", "Research a topic"],
    "😍": ["Express gratitude", "Share your joy", "Create something beautiful", "Help someone"],
    "😎": ["Take on a challenge", "Network with others", "Present your ideas", "Lead a project"],
    "🥺": ["Practice self-compassion", "Reach out for support", "Do gentle activities", "Practice gratitude"],
    "🤯": ["Break tasks into smaller steps", "Practice prioritization", "Take breaks", "Ask for help"],
  }

  const addTask = async () => {
    if (!user || !newTask.trim() || !currentMood) return

    setAdding(true)
    try {
      await addDoc(collection(db, "tasks"), {
        userId: user.uid,
        title: newTask.trim(),
        completed: false,
        mood: currentMood,
        createdAt: new Date(),
      })

      setNewTask("")
      toast({
        title: "Task added!",
        description: "Your task has been added to your list.",
      })
    } catch (error) {
      console.error("Error adding task:", error)
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAdding(false)
    }
  }

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { completed })
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId))
      toast({
        title: "Task deleted",
        description: "Your task has been removed.",
      })
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const addSuggestedTask = async (suggestion: string) => {
    if (!user || !currentMood) return

    try {
      await addDoc(collection(db, "tasks"), {
        userId: user.uid,
        title: suggestion,
        completed: false,
        mood: currentMood,
        createdAt: new Date(),
      })

      toast({
        title: "Suggested task added!",
        description: "The suggested task has been added to your list.",
      })
    } catch (error) {
      console.error("Error adding suggested task:", error)
    }
  }

  if (loading) {
    return (
      <Card className="card-premium border-border">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-5 bg-muted rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-premium border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Smart Task Planner
          {currentMood && <span className="text-2xl ml-2">{currentMood}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Add New Task */}
        <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="h-11 bg-background border-border focus:border-primary"
            disabled={!currentMood}
          />
          <Button
            onClick={addTask}
            disabled={!newTask.trim() || !currentMood || adding}
            className="h-11 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            {isMobile && <span className="ml-2">Add</span>}
          </Button>
        </div>

        {!currentMood && (
          <div className="text-center py-4 px-6 rounded-xl bg-muted/50 border border-border">
            <Lightbulb className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              Select your mood first to get personalized task suggestions!
            </p>
          </div>
        )}

        {/* Mood-based Suggestions */}
        {currentMood && moodSuggestions[currentMood] && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Suggested for your mood:</h4>
            <div className="grid grid-cols-1 gap-2">
              {moodSuggestions[currentMood].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => addSuggestedTask(suggestion)}
                  className="justify-start text-left h-10 border-border hover:bg-primary/5 hover:border-primary/50 transition-colors"
                >
                  <Plus className="w-3 h-3 mr-2 text-primary" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Your tasks {currentMood && `for ${currentMood} mood`}:
          </h4>
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No tasks yet. Add some tasks to get started!
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border group">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked) => toggleTask(task.id, checked as boolean)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className={`flex-1 ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {task.title}
                  </span>
                  <span className="text-lg">{task.mood}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
