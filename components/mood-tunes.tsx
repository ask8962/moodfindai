"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Headphones, ExternalLink } from "lucide-react"

interface MoodTunesProps {
    currentMood: string | null
}

// Curated Spotify Hindi playlist IDs mapped to moods
// Using user's custom Hindi playlists
const moodPlaylists: Record<string, { playlistId: string; name: string; description: string }> = {
    "😊": {
        playlistId: "5cfIZWLbFP5bn9C7UfxLbI", // Falling in Love playlist
        name: "Happy Vibes",
        description: "Top Hindi hits to match your happy mood!",
    },
    "😢": {
        playlistId: "2sOMIgioNPngXojcOuR4tn", // User's Sad Songs playlist
        name: "Dard Bhare Gaane",
        description: "Sad Hindi songs for when you're feeling low.",
    },
    "😠": {
        playlistId: "3SwdC5JTvQHXm6he11YCPK", // User's Angry playlist
        name: "Gussa Nikalo",
        description: "High energy tracks to release your anger!",
    },
    "😰": {
        playlistId: "5cfIZWLbFP5bn9C7UfxLbI", // Falling in Love playlist
        name: "Sukoon",
        description: "Soothing melodies to ease your mind.",
    },
    "😴": {
        playlistId: "5cfIZWLbFP5bn9C7UfxLbI", // Falling in Love playlist
        name: "Neend Bhari Raatein",
        description: "Soft songs for peaceful rest.",
    },
    "🤗": {
        playlistId: "53eoIY0uOKegEeiawKlyl5", // User's Flirting/Excited playlist
        name: "Party Mode",
        description: "Excited? Let's party with these beats!",
    },
    "😌": {
        playlistId: "5cfIZWLbFP5bn9C7UfxLbI", // Falling in Love playlist
        name: "Shanti",
        description: "Calm Hindi melodies for peaceful vibes.",
    },
    "🤔": {
        playlistId: "5cfIZWLbFP5bn9C7UfxLbI", // Falling in Love playlist
        name: "Sochne Ka Time",
        description: "Music for when you're deep in thought.",
    },
    "😍": {
        playlistId: "5cfIZWLbFP5bn9C7UfxLbI", // User's Falling in Love playlist
        name: "Ishq Wala Love",
        description: "Romantic Hindi gaane for your heart.",
    },
    "😎": {
        playlistId: "50VOtSZZtpUmSEazsNBBL6", // User's Confident playlist
        name: "Desi Swag",
        description: "Feel unstoppable with these confident vibes!",
    },
    "🥺": {
        playlistId: "2sOMIgioNPngXojcOuR4tn", // User's Sad Songs playlist
        name: "Dil Se",
        description: "Emotional gaane for tender moments.",
    },
    "🤯": {
        playlistId: "50VOtSZZtpUmSEazsNBBL6", // User's Overwhelmed playlist
        name: "Chill Karo",
        description: "Calm down with these vibes.",
    },
}

// Default playlist - User's Hindi playlist
const defaultPlaylist = {
    playlistId: "5cfIZWLbFP5bn9C7UfxLbI",
    name: "Hindi Hits",
    description: "Popular Hindi songs to brighten your day.",
}

export default function MoodTunes({ currentMood }: MoodTunesProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const playlist = currentMood && moodPlaylists[currentMood]
        ? moodPlaylists[currentMood]
        : defaultPlaylist

    const embedUrl = `https://open.spotify.com/embed/playlist/${playlist.playlistId}?utm_source=generator&theme=0`
    const openUrl = `https://open.spotify.com/playlist/${playlist.playlistId}`

    return (
        <Card className="card-premium border-border overflow-hidden">
            <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Music className="w-5 h-5 text-white" />
                        </div>
                        Mood Tunes
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">🇮🇳 Hindi</span>
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {/* Playlist Info */}
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {currentMood && (
                                <div className="text-3xl">{currentMood}</div>
                            )}
                            <div>
                                <h3 className="font-semibold text-foreground">{playlist.name}</h3>
                                <p className="text-sm text-muted-foreground">{playlist.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="border-border"
                            >
                                <Headphones className="w-4 h-4 mr-2" />
                                {isExpanded ? "Collapse" : "Expand"}
                            </Button>
                            <a
                                href={openUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="sm" className="bg-[#1DB954] hover:bg-[#1ed760] text-white">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open Spotify
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Spotify Embed */}
                <div className={`transition-all duration-300 ${isExpanded ? "h-[352px]" : "h-[152px]"}`}>
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-b-lg"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
