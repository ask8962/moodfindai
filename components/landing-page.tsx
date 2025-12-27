"use client"

import { Button } from "@/components/ui/button"
import { Brain, Heart, Users, TrendingUp, MessageCircle, BookOpen, Menu, X, ArrowRight, Check, Sparkles, Star, Quote } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Simple, intuitive mood logging that helps you understand your emotional patterns over time.",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "Smart Planning",
      description: "AI-powered task suggestions that adapt to your current emotional state for better productivity.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Progress Insights",
      description: "Beautiful visualizations that reveal your emotional trends and celebrate your growth.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others on similar journeys in a safe, supportive environment.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: MessageCircle,
      title: "MoodBuddy Chat",
      description: "An AI companion that listens, understands, and helps you process your emotions.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: BookOpen,
      title: "Digital Journal",
      description: "A private space to reflect, write, and document your thoughts and memories.",
      gradient: "from-indigo-500 to-blue-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Mindfulness Coach",
      content: "MoodifyMe has transformed how I understand my emotional patterns. The insights are incredibly valuable.",
      avatar: "S",
      rating: 5,
    },
    {
      name: "James L.",
      role: "Software Developer",
      content: "As someone who struggles with work-life balance, this app helps me stay grounded and focused.",
      avatar: "J",
      rating: 5,
    },
    {
      name: "Emily R.",
      role: "Graduate Student",
      content: "The mood-based task suggestions are genius. I'm finally working with my emotions, not against them.",
      avatar: "E",
      rating: 5,
    },
  ]

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Moods Tracked" },
    { value: "4.9", label: "App Rating" },
    { value: "98%", label: "Satisfaction" },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
        }`}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MoodifyMe</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-slide-down">
              <div className="flex flex-col gap-3">
                <Link
                  href="#features"
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <div className="flex flex-col gap-2 pt-3 border-t border-border">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-primary text-primary-foreground">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient orbs */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: "1s" }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Your emotional wellness companion</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight animate-slide-up">
              Plan your day{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">based on how</span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">you feel</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              MoodifyMe helps you understand your emotions and optimize your daily routine.
              Track moods, plan tasks, and grow emotionally—all in one beautiful app.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-base font-medium shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                  Start for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-14 text-base font-medium border-2 hover:bg-muted">
                  See how it works
                </Button>
              </Link>
            </div>

            {/* Social Proof Mini */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex -space-x-3">
                {["bg-gradient-to-br from-rose-400 to-pink-500", "bg-gradient-to-br from-violet-400 to-purple-500", "bg-gradient-to-br from-blue-400 to-cyan-500", "bg-gradient-to-br from-emerald-400 to-teal-500"].map((gradient, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full ${gradient} border-2 border-background flex items-center justify-center text-white text-xs font-medium shadow-lg`}>
                    {["S", "J", "E", "M"][i]}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Loved by <span className="font-semibold text-foreground">50,000+</span> users
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 md:mt-24 relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative mx-auto max-w-4xl">
              {/* Main Card */}
              <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser-like header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
                      moodify.me/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-background to-muted/30">
                  {/* Welcome */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Welcome back, Sarah 👋</h3>
                      <p className="text-sm text-muted-foreground">How are you feeling today?</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                        7 day streak 🔥
                      </div>
                    </div>
                  </div>

                  {/* Mood Selection */}
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-center gap-3 md:gap-4">
                      {["😊", "😌", "🤗", "😎", "🤔", "😴"].map((emoji, i) => (
                        <button
                          key={i}
                          className={`text-2xl md:text-3xl p-2 md:p-3 rounded-xl transition-all hover:scale-110 ${i === 0 ? "bg-primary/10 ring-2 ring-primary scale-110" : "hover:bg-muted"
                            }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "This Week", value: "7 logs", icon: "📊" },
                      { label: "Mood Score", value: "8.5/10", icon: "⭐" },
                      { label: "Tasks Done", value: "23", icon: "✅" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
                        <div className="text-xl mb-1">{stat.icon}</div>
                        <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="hidden lg:block absolute -left-16 top-1/3 bg-card border border-border rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Task completed!</p>
                    <p className="text-xs text-muted-foreground">Morning meditation</p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -right-12 top-1/2 bg-card border border-border rounded-xl p-4 shadow-xl animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">😊</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Mood logged</p>
                    <p className="text-xs text-muted-foreground">Feeling happy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Everything you need to thrive
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, powerful tools designed to help you understand and improve your emotional well-being.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Loved by thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our community has to say about their emotional wellness journey.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Start Free Today
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Ready to transform your{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              emotional wellness
            </span>
            ?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join 50,000+ people who have transformed their daily routine with MoodifyMe. Start your journey for free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-base font-medium shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-500" />
              Free forever plan
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-500" />
              No credit card required
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">MoodifyMe</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your emotional wellness companion for a better daily life.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MoodifyMe. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
