"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
    const lastUpdated = "December 30, 2024"

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-3xl mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="relative w-12 h-12 overflow-hidden rounded-xl shadow-lg shadow-primary/25">
                        <Image
                            src="/logo.png"
                            alt="MoodifyMe Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
                        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
                    </div>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Welcome to MoodifyMe ("we," "our," or "us"). We are committed to protecting your privacy
                            and ensuring you have a positive experience using our emotional wellness application.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you use our mobile application.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>

                        <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Personal Information</h3>
                        <p className="text-muted-foreground leading-relaxed mb-2">
                            When you create an account, we may collect:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li>Name and email address</li>
                            <li>Profile information (if you sign in with Google)</li>
                            <li>Account preferences</li>
                        </ul>

                        <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Mood and Wellness Data</h3>
                        <p className="text-muted-foreground leading-relaxed mb-2">
                            To provide our services, we collect:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li>Daily mood entries and emotional logs</li>
                            <li>Journal entries you choose to write</li>
                            <li>Task completion data</li>
                            <li>Usage patterns and app interaction data</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-2">
                            We use your information to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li>Provide and personalize the MoodifyMe experience</li>
                            <li>Generate insights and mood analytics</li>
                            <li>Suggest tasks and activities based on your emotional state</li>
                            <li>Improve our services and develop new features</li>
                            <li>Communicate important updates about the app</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Data Storage and Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Your data is stored securely using Google Firebase, which provides industry-standard
                            encryption and security measures. We implement appropriate technical and organizational
                            measures to protect your personal information against unauthorized access, alteration,
                            disclosure, or destruction.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                        <p className="text-muted-foreground leading-relaxed mb-2">
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li><strong>Google Firebase</strong> - For authentication and data storage</li>
                            <li><strong>Google Analytics</strong> - For understanding app usage (anonymized)</li>
                            <li><strong>Spotify API</strong> - For music recommendations (optional feature)</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            Each of these services has their own privacy policy governing their use of your data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
                        <p className="text-muted-foreground leading-relaxed mb-2">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Delete your account and all associated data</li>
                            <li>Export your data in a portable format</li>
                            <li>Opt out of non-essential communications</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Data Retention</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We retain your personal information for as long as your account is active or as needed
                            to provide you services. If you delete your account, we will delete your personal data
                            within 30 days, except where we are required to retain it for legal purposes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Children's Privacy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            MoodifyMe is not intended for children under 13 years of age. We do not knowingly
                            collect personal information from children under 13. If you are a parent or guardian
                            and believe your child has provided us with personal information, please contact us.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes
                            by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-muted-foreground mt-2">
                            <strong>Email:</strong> privacy@moodifyme.app<br />
                            <strong>App:</strong> MoodifyMe
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                        © {new Date().getFullYear()} MoodifyMe. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    )
}
