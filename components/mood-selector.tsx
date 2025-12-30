"use client"

import { Button } from "@/components/ui/button"

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const moods = [
    { emoji: "😊", label: "Happy", color: "from-amber-400 to-orange-400" },
    { emoji: "😢", label: "Sad", color: "from-blue-400 to-indigo-400" },
    { emoji: "😠", label: "Angry", color: "from-red-400 to-rose-500" },
    { emoji: "😰", label: "Anxious", color: "from-purple-400 to-violet-500" },
    { emoji: "😴", label: "Tired", color: "from-slate-400 to-gray-500" },
    { emoji: "🤗", label: "Excited", color: "from-pink-400 to-rose-400" },
    { emoji: "😌", label: "Calm", color: "from-emerald-400 to-teal-500" },
    { emoji: "🤔", label: "Thoughtful", color: "from-cyan-400 to-blue-500" },
    { emoji: "😍", label: "Loved", color: "from-rose-400 to-pink-500" },
    { emoji: "😎", label: "Confident", color: "from-yellow-400 to-amber-500" },
    { emoji: "🥺", label: "Vulnerable", color: "from-violet-400 to-purple-500" },
    { emoji: "🤯", label: "Overwhelmed", color: "from-orange-400 to-red-500" },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {moods.map((mood, index) => (
        <button
          key={mood.emoji}
          onClick={() => onMoodSelect(mood.emoji)}
          className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-background border-2 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Gradient Background on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />

          {/* Emoji */}
          <span className="text-4xl group-hover:scale-125 transition-transform duration-300 relative z-10">
            {mood.emoji}
          </span>

          {/* Label */}
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
            {mood.label}
          </span>

          {/* Selection Ring (hidden until hover) */}
          <div className={`absolute inset-0 rounded-2xl ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity`} />
        </button>
      ))}
    </div>
  )
}
