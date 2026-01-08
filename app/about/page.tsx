import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Sparkles, Users, Globe } from 'lucide-react'

export const metadata = {
    title: 'About - MoodifyMe',
    description: 'Learn about MoodifyMe and our mission to improve emotional wellness',
}

const values = [
    {
        icon: Heart,
        title: 'Empathy First',
        description: 'We believe understanding emotions is the foundation of personal growth and better relationships.',
    },
    {
        icon: Sparkles,
        title: 'Simplicity',
        description: 'Complex emotions deserve simple tools. We design for clarity and ease of use.',
    },
    {
        icon: Users,
        title: 'Community',
        description: 'Emotional wellness is not a solo journey. We foster supportive connections.',
    },
    {
        icon: Globe,
        title: 'Accessibility',
        description: 'Mental wellness tools should be available to everyone, everywhere.',
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-primary/25">
                        <Image
                            src="/logo.png"
                            alt="MoodifyMe Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">About MoodifyMe</h1>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            MoodifyMe was born from a simple belief: understanding your emotions is the first step
                            to living a more fulfilling life. We're on a mission to make emotional wellness accessible,
                            engaging, and actionable for everyone.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Founded in 2024, MoodifyMe started as a personal project to help track daily emotions.
                            What began as a simple mood tracker evolved into a comprehensive emotional wellness platform
                            that combines mood tracking, intelligent task planning, and community support.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Today, thousands of users trust MoodifyMe to help them understand their emotional patterns,
                            improve productivity, and connect with others who share similar experiences.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <div key={index} className="p-6 rounded-xl border border-border bg-card">
                                    <value.icon className="w-8 h-8 text-primary mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Join Us</h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            We're always looking for passionate people to join our team. If you believe in our mission
                            and want to make a difference in people's lives, check out our careers page.
                        </p>
                        <Link
                            href="/careers"
                            className="inline-flex items-center px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                        >
                            View Open Positions
                        </Link>
                    </section>
                </div>
            </main>

            <footer className="border-t border-border mt-12">
                <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MoodifyMe. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
