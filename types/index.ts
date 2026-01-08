// Mood Types
export interface MoodEntry {
    id: string
    userId: string
    mood: string
    date: string
    timestamp: Date
}

export type MoodEmoji =
    | "😊" | "😢" | "😠" | "😰" | "😴" | "🤗"
    | "😌" | "🤔" | "😍" | "😎" | "🥺" | "🤯"

export interface MoodSuggestion {
    emoji: MoodEmoji
    label: string
    color: string
}

// Task Types
export interface Task {
    id: string
    userId: string
    title: string
    completed: boolean
    mood: string
    createdAt: Date
}

export interface TasksByMood {
    total: number
    completed: number
}

// Journal Types
export interface JournalEntry {
    id: string
    userId: string
    title: string
    content: string
    mood: string
    createdAt: Date
}

// Chat Types
export interface ChatMessage {
    id: string
    message: string
    userName: string
    timestamp: Date
    userId: string
}

// User Types
export interface UserPreferences {
    notifications: boolean
    theme: 'light' | 'dark' | 'system'
    moodReminders: boolean
}

export interface UserProfile {
    uid: string
    email: string
    displayName: string
    createdAt: Date
    lastLogin: Date
    preferences: UserPreferences
}

// Achievement Types
export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    progress: number
    total: number
}

// Stats Types
export interface QuickStats {
    weeklyMoods: number
    completedTasks: number
    journalEntries: number
    moodBuddies: number
}

export interface MoodDistribution {
    mood: string
    count: number
    percentage: number
}

export interface TaskCompletion {
    mood: string
    completionRate: number
    total: number
    completed: number
}

export interface MoodTrendData {
    date: string
    moodScore: number
    mood: string
}

// API Response Types
export interface FirebaseTimestamp {
    toDate: () => Date
}

export interface FirestoreDocument<T> {
    id: string
    data: () => T
}
