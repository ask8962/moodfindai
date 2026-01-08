import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Terms of Service - MoodifyMe',
    description: 'Terms of Service for MoodifyMe - Emotion-Based Daily Planner',
}

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
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

            {/* Main Content */}
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
                    <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
                </div>

                <p className="text-sm text-muted-foreground mb-8">
                    Last updated: January 8, 2026
                </p>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using MoodifyMe ("the Service"), you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            MoodifyMe is an emotion-based daily planning application that helps users track their moods,
                            receive personalized task recommendations, and maintain a private journal. The Service is
                            provided for personal, non-commercial use.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            To use certain features of the Service, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>Provide accurate and complete information when creating your account</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Be responsible for all activities that occur under your account</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">4. User Content</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You retain ownership of any content you submit to the Service, including mood logs,
                            journal entries, and tasks. By using the Service, you grant us a limited license to
                            store and process this content solely for the purpose of providing the Service to you.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You agree not to:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>Use the Service for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to the Service or its systems</li>
                            <li>Interfere with or disrupt the Service</li>
                            <li>Upload malicious code or content</li>
                            <li>Harass or harm other users in the community chat feature</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">6. Disclaimer of Warranties</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The Service is provided "as is" without warranties of any kind. MoodifyMe is not a
                            substitute for professional mental health advice, diagnosis, or treatment. If you are
                            experiencing a mental health crisis, please contact a qualified healthcare provider.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To the maximum extent permitted by law, MoodifyMe shall not be liable for any indirect,
                            incidental, special, consequential, or punitive damages resulting from your use of the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">8. Changes to Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to modify these Terms at any time. We will notify users of
                            significant changes by posting a notice on the Service. Your continued use of the
                            Service after such changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have questions about these Terms, please contact us at support@moodifyme.app.
                        </p>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-12">
                <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MoodifyMe. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
