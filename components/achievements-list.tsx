"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { Achievement } from "@/hooks/use-streaks"

interface AchievementsListProps {
    achievements: Achievement[]
    loading?: boolean
}

export default function AchievementsList({ achievements, loading }: AchievementsListProps) {
    if (loading) {
        return (
            <Card className="card-premium border-border">
                <CardHeader>
                    <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted rounded-xl animate-pulse"></div>
                    ))}
                </CardContent>
            </Card>
        )
    }

    const unlockedCount = achievements.filter(a => a.unlocked).length

    return (
        <Card className="card-premium border-border overflow-hidden">
            <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Achievements
                    </CardTitle>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                        {unlockedCount} / {achievements.length} Unlocked
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 flex items-center gap-4 transition-colors ${achievement.unlocked
                                    ? "bg-gradient-to-r from-primary/5 to-transparent"
                                    : "bg-muted/20 grayscale opacity-80"
                                }`}
                        >
                            {/* Icon / Badge */}
                            <div className={`
                relative flex items-center justify-center w-12 h-12 rounded-full text-2xl shadow-sm
                ${achievement.unlocked ? "bg-background border border-border" : "bg-muted text-muted-foreground border border-transparent"}
              `}>
                                {achievement.unlocked ? achievement.icon : <Lock className="w-5 h-5" />}

                                {achievement.unlocked && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-center">
                                    <h4 className={`font-medium text-sm ${achievement.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                                        {achievement.title}
                                    </h4>
                                    {achievement.unlocked && <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Unlocked</span>}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">{achievement.description}</p>

                                {/* Progress for locked items */}
                                {!achievement.unlocked && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex justify-between text-[10px] text-muted-foreground">
                                            <span>Progress</span>
                                            <span>{achievement.progress}/{achievement.total}</span>
                                        </div>
                                        <Progress value={(achievement.progress / achievement.total) * 100} className="h-1" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
