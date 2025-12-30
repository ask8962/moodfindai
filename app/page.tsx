"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import LandingPage from "@/components/landing-page"
import LoadingSpinner from "@/components/loading-spinner"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (user) {
    return <LoadingSpinner />
  }

  return <LandingPage />
}
