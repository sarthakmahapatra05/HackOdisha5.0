"use client```tsx file=\"app/chat/page.tsx"
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Send,
  Paperclip,
  Phone,
  Video,
  Calendar,
  Clock,
  MessageSquare,
  Search,
  MoreVertical,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "user" | "doctor"
  content: string
  timestamp: Date
  type: "text" | "file" | "report"
  status: "sent" | "delivered" | "read"
}

interface Doctor {
  id: string
  name: string
  specialization: string
  avatar: string
  status: "online" | "offline" | "busy"
  rating: number
  experience: number
}

interface ChatRoom {
  id: string
  doctorId: string
  doctorName: string
  doctorSpecialization: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  status: "active" | "closed"
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

  // Mock data
  useEffect(() => {
    const mockDoctors: Doctor[] = [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        specialization: "Cardiology",
        avatar: "/woman-profile.png",
        status: "online",
        rating: 4.8,
        experience: 8,
      },
      {
        id: "2",
        name: "Dr. Rajesh Kumar",
        specialization: "Neurology",
        avatar: "/man-profile.png",
        status: "online",
        rating: 4.9,
        experience: 12,
      },
      {
        id: "3",
        name: "Dr. Priya Sharma",
        specialization: "General Medicine",
        avatar: "/diverse-woman-smiling.png",
        status: "busy",
        rating: 4.7,
        experience: 6,
      },
    ]

    const mockChatRooms: ChatRoom[] = [
      {
        id: "1",
        doctorId: "1",
        doctorName: "Dr. Sarah Johnson",
        doctorSpecialization: "Cardiology",
        lastMessage: "I've reviewed your symptoms. Let's schedule a follow-up.",
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
        unreadCount: 2,
        status: "active",
      },
      {
        id: "2",
        doctorId: "2",
        doctorName: "Dr. Rajesh Kumar",
        doctorSpecialization: "Neurology",
        lastMessage: "The test results look normal. Continue with the prescribed medication.",
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unreadCount: 0,
        status: "active",
      },
    ]

    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "user",
        senderName: "You",
        senderType: "user",
        content: "Hello Dr. Johnson, I completed the symptom assessment and wanted to discuss the results with you.",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        type: "text",
        status: "read",
      },
      {
        id: "2",
        senderId: "1",
        senderName: "Dr. Sarah Johnson",
        senderType: "doctor",
        content:
          "Hello! I've received your assessment report. Your symptoms do indicate some concern, especially the chest discomfort you mentioned. Can you tell me more about when this started?",
        timestamp: new Date(Date.now() - 40 * 60 * 1000),
        type: "text",
        status: "read",
      },
      {
        id: "3",
        senderId: "user",
        senderName: "You",
        senderType: "user",
        content: "It started about 3 days ago, usually after physical activity. The pain is mild but persistent.",
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
        type: "text",
        status: "read",
      },
      {
        id: "4",
        senderId: "1",
        senderName: "Dr. Sarah Johnson",
        senderType: "doctor",
        content:
          "I've reviewed your symptoms. Let's schedule a follow-up appointment for a more detailed examination. In the meantime, please avoid strenuous activities.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: "text",
        status: "delivered",
      },
    ]

    setAvailableDoctors(mockDoctors)
    setChatRooms(mockChatRooms)
    if (mockChatRooms.length > 0) {
      setSelectedChat(mockChatRooms[0].id)
      setMessages(mockMessages)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      senderName: "You",
      senderType: "user",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sent",
    }

    setMessages((prev) => [...prev, message])
    const userMessage = newMessage
    setNewMessage("")

    // Generate AI response
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const prompt = `You are a doctor named ${selectedChatRoom?.doctorName || "Dr. AI"} specializing in ${selectedChatRoom?.doctorSpecialization || "General Medicine"}. Respond to the patient's message as a helpful and professional doctor. Patient message: "${userMessage}"`
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChatRoom?.doctorId || "1",
        senderName: selectedChatRoom?.doctorName || "Dr. AI",
        senderType: "doctor",
        content: text,
        timestamp: new Date(),
        type: "text",
        status: "sent",
      }
      setMessages((prev) => [...prev, doctorResponse])
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChatRoom?.doctorId || "1",
        senderName: selectedChatRoom?.doctorName || "Dr. AI",
        senderType: "doctor",
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
        type: "text",
        status: "sent",
      }
      setMessages((prev) => [...prev, errorResponse])
    }
  }

  const startNewChat = (doctorId: string) => {
    const doctor = availableDoctors.find((d) => d.id === doctorId)
    if (!doctor) return

    const newChatRoom: ChatRoom = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      lastMessage: "Chat started",
      lastMessageTime: new Date(),
      unreadCount: 0,
      status: "active",
    }

    setChatRooms((prev) => [newChatRoom, ...prev])
    setSelectedChat(newChatRoom.id)
    setMessages([])
  }

  const filteredDoctors = availableDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSpecialization === "all" || doctor.specialization === filterSpecialization
    return matchesSearch && matchesFilter
  })

  const selectedChatRoom = chatRooms.find((room) => room.id === selectedChat)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCircle className="h-3 w-3 text-gray-500" />
      case "read":
        return <CheckCircle className="h-3 w-3 text-primary" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Medical Consultation</h1>
          <p className="text-muted-foreground">Connect with healthcare professionals for personalized care</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-card-foreground text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {chatRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedChat(room.id)}
                      className={`p-3 cursor-pointer hover:bg-accent transition-colors ${
                        selectedChat === room.id ? "bg-accent border-r-2 border-primary" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/woman-profile.png" />
                            <AvatarFallback>
                              {room.doctorName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor("online")}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-card-foreground truncate">{room.doctorName}</h3>
                            {room.unreadCount > 0 && (
                              <Badge className="bg-primary text-primary-foreground text-xs">{room.unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{room.doctorSpecialization}</p>
                          <p className="text-sm text-muted-foreground truncate">{room.lastMessage}</p>
                          <p className="text-xs text-muted-foreground">
                            {room.lastMessageTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            {selectedChatRoom ? (
              <Card className="bg-card border-border h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/woman-profile.png" />
                          <AvatarFallback>
                            {selectedChatRoom.doctorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor("online")}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{selectedChatRoom.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">{selectedChatRoom.doctorSpecialization}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Link href="/appointments">
                        <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderType === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${message.senderType === "user" ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.senderType === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div
                          className={`flex items-center gap-1 mt-1 ${message.senderType === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {message.senderType === "user" && getMessageStatusIcon(message.status)}
                        </div>
                      </div>
                      {message.senderType === "doctor" && (
                        <Avatar className="h-8 w-8 order-1 mr-2">
                          <AvatarImage src="/woman-profile.png" />
                          <AvatarFallback>
                            {message.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                        className="min-h-[40px] max-h-[120px] resize-none bg-input border-border"
                      />
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-card border-border h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">Choose a conversation or start a new one with a doctor</p>
                </div>
              </Card>
            )}
          </div>

          {/* Available Doctors Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-card-foreground text-lg">Available Doctors</CardTitle>
                <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Filter by specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredDoctors.map((doctor) => (
                    <div key={doctor.id} className="p-3 hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(doctor.status)}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-card-foreground truncate">{doctor.name}</h3>
                          <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>★ {doctor.rating}</span>
                            <span>•</span>
                            <span>{doctor.experience}y exp</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startNewChat(doctor.id)}
                          size="sm"
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        <Link href="/appointments" className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-transparent border-border text-foreground hover:bg-accent"
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            Book
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
