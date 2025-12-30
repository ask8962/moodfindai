"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Wind, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ZenModeProps {
    isOpen: boolean
    onClose: () => void
    autoTriggered?: boolean
}

type BreathingPhase = "inhale" | "hold" | "exhale" | "idle"

// 4-7-8 Breathing Technique Timing (in seconds)
const INHALE_DURATION = 4
const HOLD_DURATION = 7
const EXHALE_DURATION = 8
const TOTAL_CYCLE = INHALE_DURATION + HOLD_DURATION + EXHALE_DURATION

export default function ZenMode({ isOpen, onClose, autoTriggered = false }: ZenModeProps) {
    const [phase, setPhase] = useState<BreathingPhase>("idle")
    const [countdown, setCountdown] = useState(0)
    const [cycles, setCycles] = useState(0)
    const [isActive, setIsActive] = useState(false)

    const getPhaseText = () => {
        switch (phase) {
            case "inhale":
                return "Breathe In"
            case "hold":
                return "Hold"
            case "exhale":
                return "Breathe Out"
            default:
                return "Get Ready"
        }
    }

    const getPhaseColor = () => {
        switch (phase) {
            case "inhale":
                return "from-blue-400 to-cyan-400"
            case "hold":
                return "from-purple-400 to-pink-400"
            case "exhale":
                return "from-emerald-400 to-teal-400"
            default:
                return "from-indigo-400 to-purple-400"
        }
    }

    const startBreathing = useCallback(() => {
        setIsActive(true)
        setPhase("inhale")
        setCountdown(INHALE_DURATION)
    }, [])

    const stopBreathing = useCallback(() => {
        setIsActive(false)
        setPhase("idle")
        setCountdown(0)
    }, [])

    // Breathing cycle logic
    useEffect(() => {
        if (!isActive) return

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Transition to next phase
                    if (phase === "inhale") {
                        setPhase("hold")
                        return HOLD_DURATION
                    } else if (phase === "hold") {
                        setPhase("exhale")
                        return EXHALE_DURATION
                    } else if (phase === "exhale") {
                        setCycles((c) => c + 1)
                        setPhase("inhale")
                        return INHALE_DURATION
                    }
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isActive, phase])

    // Auto-start when opened
    useEffect(() => {
        if (isOpen && !isActive) {
            const timeout = setTimeout(() => {
                startBreathing()
            }, 1500)
            return () => clearTimeout(timeout)
        }
    }, [isOpen, isActive, startBreathing])

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            stopBreathing()
            setCycles(0)
        }
    }, [isOpen, stopBreathing])

    // Circle scale based on phase
    const getCircleScale = () => {
        switch (phase) {
            case "inhale":
                return 1.5
            case "hold":
                return 1.5
            case "exhale":
                return 1
            default:
                return 1
        }
    }

    // Animation duration based on phase
    const getAnimationDuration = () => {
        switch (phase) {
            case "inhale":
                return INHALE_DURATION
            case "hold":
                return 0.5 // Quick pulse
            case "exhale":
                return EXHALE_DURATION
            default:
                return 1
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Floating particles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/10 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* Ambient gradient orbs */}
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Close button */}
                    <motion.button
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <X className="w-6 h-6" />
                    </motion.button>

                    {/* Cycle counter */}
                    <motion.div
                        className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white z-10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-pink-400" />
                            <span className="text-sm font-medium">{cycles} cycles completed</span>
                        </div>
                    </motion.div>

                    {/* Main content */}
                    <div className="relative flex flex-col items-center gap-12 z-10">
                        {/* Title */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {autoTriggered && (
                                <motion.p
                                    className="text-white/60 text-sm mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    Take a moment to calm your mind
                                </motion.p>
                            )}
                            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                                Zen Mode
                                <Sparkles className="w-8 h-8 text-purple-400" />
                            </h1>
                            <p className="text-white/60 mt-2">4-7-8 Breathing Technique</p>
                        </motion.div>

                        {/* Breathing circle */}
                        <div className="relative flex items-center justify-center">
                            {/* Outer glow ring */}
                            <motion.div
                                className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r ${getPhaseColor()} opacity-20 blur-xl`}
                                animate={{
                                    scale: getCircleScale() * 1.2,
                                }}
                                transition={{
                                    duration: getAnimationDuration(),
                                    ease: phase === "hold" ? "easeInOut" : "easeOut",
                                }}
                            />

                            {/* Main breathing circle */}
                            <motion.div
                                className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} shadow-2xl flex items-center justify-center`}
                                animate={{
                                    scale: getCircleScale(),
                                    boxShadow:
                                        phase === "hold"
                                            ? [
                                                "0 0 60px rgba(168, 85, 247, 0.4)",
                                                "0 0 80px rgba(168, 85, 247, 0.6)",
                                                "0 0 60px rgba(168, 85, 247, 0.4)",
                                            ]
                                            : "0 0 60px rgba(168, 85, 247, 0.4)",
                                }}
                                transition={{
                                    duration: getAnimationDuration(),
                                    ease: phase === "hold" ? "easeInOut" : "easeOut",
                                    boxShadow: phase === "hold" ? { duration: 2, repeat: Infinity } : { duration: 0.5 },
                                }}
                            >
                                {/* Inner content */}
                                <div className="text-center text-white">
                                    <motion.div
                                        key={phase}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center"
                                    >
                                        <Wind className="w-8 h-8 mb-2 opacity-80" />
                                        <p className="text-2xl md:text-3xl font-bold">{getPhaseText()}</p>
                                        {isActive && (
                                            <motion.p
                                                className="text-5xl md:text-6xl font-bold mt-2"
                                                key={countdown}
                                                initial={{ scale: 1.2, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {countdown}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Rotating ring */}
                            <motion.div
                                className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-white/10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
                            </motion.div>
                        </div>

                        {/* Phase indicator dots */}
                        <div className="flex items-center gap-4">
                            {["inhale", "hold", "exhale"].map((p) => (
                                <motion.div
                                    key={p}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${phase === p ? "bg-white/20" : "bg-white/5"
                                        } transition-colors`}
                                    animate={{
                                        scale: phase === p ? 1.05 : 1,
                                    }}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${phase === p ? "bg-white" : "bg-white/40"
                                            }`}
                                    />
                                    <span className={`text-sm capitalize ${phase === p ? "text-white" : "text-white/40"}`}>
                                        {p === "inhale" && `${INHALE_DURATION}s`}
                                        {p === "hold" && `${HOLD_DURATION}s`}
                                        {p === "exhale" && `${EXHALE_DURATION}s`}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Controls */}
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {!isActive ? (
                                <Button
                                    onClick={startBreathing}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl border border-white/20"
                                >
                                    Start Breathing
                                </Button>
                            ) : (
                                <Button
                                    onClick={stopBreathing}
                                    variant="outline"
                                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-xl border border-white/20"
                                >
                                    Pause
                                </Button>
                            )}
                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-xl border border-white/20"
                            >
                                I'm Feeling Better
                            </Button>
                        </motion.div>

                        {/* Technique info */}
                        <motion.p
                            className="text-white/40 text-sm text-center max-w-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            The 4-7-8 technique helps reduce anxiety and promotes relaxation.
                            <br />
                            Try completing 4 cycles for best results.
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
