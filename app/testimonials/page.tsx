import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'

export const metadata = {
    title: 'Testimonials - MoodifyMe',
    description: 'See what our users say about MoodifyMe - Your Emotion-Based Daily Planner',
}

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Product Designer',
        avatar: '👩‍💻',
        content: 'MoodifyMe has completely changed how I approach my day. Understanding my emotional patterns helps me schedule creative work when I am at my best.',
        rating: 5,
    },
    {
        name: 'Marcus Johnson',
        role: 'Software Engineer',
        avatar: '👨‍💼',
        content: 'The Zen Mode feature is a lifesaver during stressful deadlines. The 4-7-8 breathing exercises help me reset and refocus.',
        rating: 5,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Therapist',
        avatar: '👩‍⚕️',
        content: 'I recommend MoodifyMe to my clients as a complementary tool. The journaling and mood tracking features are beautifully designed.',
        rating: 5,
    },
    {
        name: 'David Kim',
        role: 'Entrepreneur',
        avatar: '🧑‍💼',
        content: 'As someone who struggles with work-life balance, the mood-based task suggestions have helped me prioritize self-care.',
        rating: 5,
    },
    {
        name: 'Lisa Thompson',
        role: 'Teacher',
        avatar: '👩‍🏫',
        content: 'The analytics dashboard gave me insights I never had before. I noticed I am happiest on days I exercise - now I make it a priority!',
        rating: 5,
    },
    {
        name: 'James Wilson',
        role: 'HR Manager',
        avatar: '👨‍💻',
        content: 'We use MoodifyMe Team for our organization. The anonymous aggregate insights help us support employee wellness without compromising privacy.',
        rating: 5,
    },
]

export default function TestimonialsPage() {
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
                        <h1 className="text-4xl font-bold text-foreground">Testimonials</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of users who have transformed their emotional wellness journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/signup"
                        className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                        Join Our Community
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
