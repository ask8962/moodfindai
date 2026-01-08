import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Smile, Calendar, BarChart3, MessageCircle, BookOpen, Brain, Sparkles, Wind } from 'lucide-react'

export const metadata = {
    title: 'Features - MoodifyMe',
    description: 'Discover the powerful features of MoodifyMe - Your Emotion-Based Daily Planner',
}

const features = [
    {
        icon: Smile,
        title: 'Mood Tracking',
        description: 'Log your daily emotions with beautiful emoji-based mood selection. Track patterns over time to better understand your emotional well-being.',
        gradient: 'from-yellow-500 to-orange-500',
    },
    {
        icon: Calendar,
        title: 'Smart Task Planning',
        description: 'Get personalized task recommendations based on your current mood. Our AI suggests activities that match your emotional state.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: BarChart3,
        title: 'Analytics Dashboard',
        description: 'Visualize your mood trends with beautiful charts. Understand patterns and gain insights into your emotional journey.',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: MessageCircle,
        title: 'MoodBuddy Chat',
        description: 'Connect with others experiencing similar emotions. Share and support each other in a safe, anonymous environment.',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        icon: BookOpen,
        title: 'Daily Journal',
        description: 'Express your thoughts with our beautiful journaling feature. Link entries to your moods for deeper self-reflection.',
        gradient: 'from-indigo-500 to-violet-500',
    },
    {
        icon: Brain,
        title: 'AI Insights',
        description: 'Receive intelligent insights about your mood patterns. Our AI helps you identify triggers and positive influences.',
        gradient: 'from-rose-500 to-red-500',
    },
    {
        icon: Sparkles,
        title: 'Achievement System',
        description: 'Stay motivated with streaks and achievements. Celebrate your consistency and emotional growth milestones.',
        gradient: 'from-amber-500 to-yellow-500',
    },
    {
        icon: Wind,
        title: 'Zen Mode',
        description: 'Access guided breathing exercises when feeling anxious. The 4-7-8 breathing technique helps you find calm.',
        gradient: 'from-teal-500 to-cyan-500',
    },
]

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </Link>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="relative w-12 h-12 overflow-hidden rounded-xl shadow-lg shadow-primary/25">
                            <Image
                                src="/logo.png"
                                alt="MoodifyMe Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground">Features</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to understand, track, and improve your emotional well-being.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/signup"
                        className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                        Get Started Free
                    </Link>
                </div>
            </main>

            <footer className="border-t border-border mt-12">
                <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MoodifyMe. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
