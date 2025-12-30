"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface ChatMessage {
  id: string
  message: string
  userName: string
  timestamp: Date
  userId: string
}

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Fetch messages in real-time
  useEffect(() => {
    const messagesQuery = query(collection(db, "chat"), orderBy("timestamp", "asc"), limit(100))

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        })) as ChatMessage[]

        setMessages(messagesData)
        setLoading(false)

        // Scroll to bottom when new messages arrive
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      },
      (error) => {
        console.error("Error fetching messages:", error)
        toast({
          title: "Error",
          description: "Failed to load chat messages. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [toast])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return

    setSending(true)
    try {
      await addDoc(collection(db, "chat"), {
        message: newMessage.trim(),
        userName: user.displayName || "Anonymous User",
        timestamp: new Date(),
        userId: user.uid,
      })

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">MoodifyMe Chat</h1>
        <p className="text-gray-300 text-lg">Connect with others and share your thoughts in our community chat</p>
      </div>

      {/* Chat Interface */}
      <Card className="glass-effect border-white/10">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              <span>Community Chat</span>
            </div>
            <div className="text-sm text-gray-400">{messages.length} messages</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages Container */}
          <div className="h-[500px] md:h-[600px] overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No messages yet. Be the first to start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.userId === user?.uid ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                      message.userId === user?.uid ? "bg-purple-600 text-white" : "bg-white/10 text-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium">
                        {message.userId === user?.uid ? "You" : message.userName}
                      </span>
                      <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-white/10 p-4">
            <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isMobile && sendMessage()}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                disabled={sending || !user}
              />
              <Button
                onClick={sendMessage}
                disabled={sending || !newMessage.trim() || !user}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
