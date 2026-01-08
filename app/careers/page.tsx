import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin, Clock, Heart, Users, Sparkles, Code } from 'lucide-react'

export const metadata = {
    title: 'Careers - MoodifyMe',
    description: 'Join the MoodifyMe team and help build the future of emotional wellness',
}

const positions = [
    {
        title: 'Senior Frontend Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Help us build beautiful, accessible interfaces that make emotional wellness engaging and intuitive.',
    },
    {
        title: 'Product Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        description: 'Design experiences that help millions of users understand and improve their emotional well-being.',
    },
    {
        title: 'Backend Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Build scalable, secure systems that power our mood tracking and analytics features.',
    },
    {
        title: 'Data Scientist',
        department: 'Data',
        location: 'Remote',
        type: 'Full-time',
        description: 'Develop AI models that provide personalized insights and recommendations to our users.',
    },
    {
        title: 'Customer Success Manager',
        department: 'Support',
        location: 'Remote',
        type: 'Full-time',
        description: 'Help our users get the most out of MoodifyMe while gathering feedback to improve our product.',
    },
]

const benefits = [
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and mental wellness support' },
    { icon: Users, title: 'Remote First', description: 'Work from anywhere in the world with flexible hours' },
    { icon: Sparkles, title: 'Growth Budget', description: '$2,000 annual budget for learning and development' },
    { icon: Code, title: 'Latest Tech', description: 'Modern tools and equipment to do your best work' },
]

export default function CareersPage() {
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
                        <h1 className="text-4xl font-bold text-foreground">Careers</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join our mission to make emotional wellness accessible to everyone.
                    </p>
                </div>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Why Work With Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-6 rounded-xl border border-border bg-card text-center">
                                <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Open Positions</h2>
                    <div className="space-y-4">
                        {positions.map((position, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{position.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{position.description}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {position.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {position.type}
                                            </span>
                                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                                {position.department}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-16 text-center p-8 rounded-2xl bg-primary/5 border border-primary/20">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Don't see a perfect fit?</h3>
                    <p className="text-muted-foreground mb-6">
                        We're always looking for talented people. Send us your resume and we'll keep you in mind.
                    </p>
                    <button className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
                        Send General Application
                    </button>
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
