import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'

export const metadata = {
    title: 'Pricing - MoodifyMe',
    description: 'Simple, transparent pricing for MoodifyMe - Your Emotion-Based Daily Planner',
}

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started with mood tracking',
        features: [
            'Daily mood tracking',
            'Basic task suggestions',
            'Weekly analytics',
            '7-day mood history',
            'Community chat access',
        ],
        cta: 'Get Started',
        href: '/signup',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$9',
        period: 'per month',
        description: 'For those serious about emotional wellness',
        features: [
            'Everything in Free',
            'Unlimited mood history',
            'Advanced analytics & insights',
            'AI-powered recommendations',
            'Private journal with encryption',
            'Zen Mode breathing exercises',
            'Priority support',
            'Export your data',
        ],
        cta: 'Start Free Trial',
        href: '/signup?plan=pro',
        popular: true,
    },
    {
        name: 'Team',
        price: '$29',
        period: 'per month',
        description: 'For organizations caring for employee wellness',
        features: [
            'Everything in Pro',
            'Up to 50 team members',
            'Team wellness dashboard',
            'Anonymous aggregate insights',
            'Admin controls',
            'Custom integrations',
            'Dedicated support',
            'HIPAA compliance ready',
        ],
        cta: 'Contact Sales',
        href: '/contact',
        popular: false,
    },
]

export default function PricingPage() {
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
                        <h1 className="text-4xl font-bold text-foreground">Pricing</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start free and upgrade as you grow. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-2xl border ${plan.popular
                                ? 'border-primary bg-primary/5 shadow-xl'
                                : 'border-border bg-card'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                    <span className="text-muted-foreground">/{plan.period}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={plan.href}
                                className={`block w-full py-3 rounded-xl text-center font-medium transition-colors ${plan.popular
                                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-sm text-muted-foreground">
                    <p>All plans include a 14-day free trial. No credit card required.</p>
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
