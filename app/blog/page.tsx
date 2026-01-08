import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'Blog - MoodifyMe',
    description: 'Articles and insights on emotional wellness from MoodifyMe',
}

const posts = [
    {
        title: 'Understanding the Science Behind Mood Tracking',
        excerpt: 'Discover how consistent mood tracking can reveal patterns that help you understand your emotional triggers and improve overall well-being.',
        date: 'January 5, 2026',
        category: 'Wellness',
        slug: 'science-behind-mood-tracking',
    },
    {
        title: '5 Breathing Techniques for Instant Calm',
        excerpt: 'Learn powerful breathing exercises, including the 4-7-8 technique, that can help you manage anxiety and stress in any situation.',
        date: 'January 2, 2026',
        category: 'Mental Health',
        slug: 'breathing-techniques-for-calm',
    },
    {
        title: 'How Your Mood Affects Productivity',
        excerpt: 'Research shows that aligning tasks with your emotional state can significantly boost productivity. Here\'s how to leverage this insight.',
        date: 'December 28, 2025',
        category: 'Productivity',
        slug: 'mood-affects-productivity',
    },
    {
        title: 'The Power of Daily Journaling',
        excerpt: 'Journaling isn\'t just for writers. Learn how a simple daily practice can transform your self-awareness and emotional intelligence.',
        date: 'December 20, 2025',
        category: 'Self-Care',
        slug: 'power-of-daily-journaling',
    },
    {
        title: 'Building Emotional Resilience in Challenging Times',
        excerpt: 'Strategies and techniques to strengthen your emotional resilience and navigate life\'s inevitable ups and downs with grace.',
        date: 'December 15, 2025',
        category: 'Mental Health',
        slug: 'building-emotional-resilience',
    },
    {
        title: 'Why Community Matters for Mental Wellness',
        excerpt: 'Humans are social creatures. Explore the science behind why connection with others is essential for our emotional health.',
        date: 'December 10, 2025',
        category: 'Community',
        slug: 'community-matters-mental-wellness',
    },
]

export default function BlogPage() {
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
                        <h1 className="text-4xl font-bold text-foreground">Blog</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights, tips, and stories about emotional wellness and personal growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article
                            key={index}
                            className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </span>
                            </div>
                            <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                            <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                                Read more
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </article>
                    ))}
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
