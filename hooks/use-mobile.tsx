"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export function useOrientation() {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape")
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)

    return () => {
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [])

  return orientation
}
