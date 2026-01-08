import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata = {
    title: 'Security - MoodifyMe',
    description: 'Learn about how MoodifyMe protects your data and privacy',
}

const securityFeatures = [
    {
        icon: Lock,
        title: 'End-to-End Encryption',
        description: 'Your personal data, including journal entries and mood logs, is encrypted both in transit and at rest using AES-256 encryption.',
    },
    {
        icon: Shield,
        title: 'Secure Authentication',
        description: 'We use Firebase Authentication with support for email, Google, and other secure OAuth providers. Your password is never stored in plain text.',
    },
    {
        icon: Eye,
        title: 'Privacy by Design',
        description: 'We collect only the data necessary to provide our service. Your emotional data is never sold or shared with third parties.',
    },
    {
        icon: Server,
        title: 'Secure Infrastructure',
        description: 'Our application runs on Google Cloud Platform with automatic security updates, DDoS protection, and 99.9% uptime SLA.',
    },
]

const certifications = [
    'SOC 2 Type II Compliant',
    'GDPR Compliant',
    'CCPA Compliant',
    'HIPAA Ready (Team Plan)',
]

export default function SecurityPage() {
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
                    <h1 className="text-3xl font-bold text-foreground">Security</h1>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    At MoodifyMe, we understand that your emotional data is deeply personal. That's why security
                    and privacy are at the core of everything we build. Here's how we protect your information.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Security Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {securityFeatures.map((feature, index) => (
                            <div key={index} className="p-6 rounded-xl border border-border bg-card">
                                <feature.icon className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Compliance & Certifications</h2>
                    <div className="p-6 rounded-xl border border-border bg-card">
                        <ul className="space-y-3">
                            {certifications.map((cert, index) => (
                                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Your Data Rights</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong className="text-foreground">Access:</strong> You can export all your data at any time from your account settings.</li>
                            <li><strong className="text-foreground">Deletion:</strong> You can delete your account and all associated data permanently.</li>
                            <li><strong className="text-foreground">Portability:</strong> Your data exports are in standard JSON format for easy portability.</li>
                            <li><strong className="text-foreground">Control:</strong> You decide what to track and what to share in community features.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8 p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Report a Vulnerability</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                If you discover a security vulnerability, please report it responsibly to our security team.
                                We appreciate your help in keeping MoodifyMe safe for everyone.
                            </p>
                            <a
                                href="mailto:security@moodifyme.app"
                                className="text-sm text-primary font-medium hover:underline"
                            >
                                security@moodifyme.app
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border mt-12">
                <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MoodifyMe. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
