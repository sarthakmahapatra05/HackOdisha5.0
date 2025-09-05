"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  User,
  Heart,
  MessageCircle,
  Share2,
  Menu,
  X,
  Plus,
  ImageIcon,
  Video,
  Smile,
  TrendingUp,
  Users,
  Award,
  Target,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function FitGramPage() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [postText, setPostText] = useState("")
  const [activeTab, setActiveTab] = useState("feed")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock data for social posts with enhanced content
  const posts = [
    {
      id: 1,
      user: { name: "Sarah M.", avatar: "/woman-profile.png", initials: "SM", verified: true },
      content:
        "Just completed my morning workout! 💪 Feeling energized and ready for the day. My joint pain has been much better since starting the new routine. #HealthJourney #MorningMotivation",
      image: "/workout-gym.png",
      likes: 24,
      comments: 8,
      shares: 3,
      timeAgo: "2h ago",
      tags: ["Fitness", "Joint Health", "Morning Routine"],
    },
    {
      id: 2,
      user: { name: "Mike R.", avatar: "/man-profile.png", initials: "MR", verified: false },
      content:
        "Tracking my sleep patterns this week 📊 Notice I feel much better when I get 7+ hours. Anyone else seeing similar patterns? Would love to hear your experiences! #SleepHealth #Wellness",
      likes: 18,
      comments: 12,
      shares: 5,
      timeAgo: "4h ago",
      tags: ["Sleep", "Health Tracking", "Wellness"],
    },
    {
      id: 3,
      user: { name: "Emma L.", avatar: "/diverse-woman-smiling.png", initials: "EL", verified: true },
      content:
        "Meal prep Sunday! 🥗 Focusing on anti-inflammatory foods this week to help with my symptoms. Lots of colorful veggies and omega-3 rich foods. Recipe sharing in comments!",
      image: "/healthy-meal-prep.png",
      likes: 31,
      comments: 15,
      shares: 8,
      timeAgo: "6h ago",
      tags: ["Nutrition", "Meal Prep", "Anti-inflammatory"],
    },
  ]

  const trendingTopics = [
    { name: "Morning Routines", posts: 234 },
    { name: "Sleep Tracking", posts: 189 },
    { name: "Healthy Recipes", posts: 156 },
    { name: "Mental Health", posts: 143 },
    { name: "Fitness Goals", posts: 128 },
  ]

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Enhanced Top Navigation */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-foreground hover:bg-accent transition-all duration-200"
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary professional-heading">FitGram</h1>
              <Badge variant="secondary" className="text-xs">
                Community
              </Badge>
            </div>

            <div
              className={`flex items-center gap-2 transition-all duration-300 ${isNavOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
            >
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              1.2k Online
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Trending & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-card-foreground flex items-center gap-2 professional-heading">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Trending Topics
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={topic.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm professional-heading">#{topic.name}</p>
                      <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold professional-heading">Your Health Journey</h4>
                    <p className="text-sm text-muted-foreground professional-body">Track progress with the community</p>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Target className="h-4 w-4 mr-2" />
                    Set Goals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-sm">
                <TabsTrigger value="feed" className="professional-body">
                  Feed
                </TabsTrigger>
                <TabsTrigger value="create" className="professional-body">
                  Create Post
                </TabsTrigger>
                <TabsTrigger value="community" className="professional-body">
                  Community
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {/* Enhanced Create Post Section */}
                <Card className="bg-card/80 backdrop-blur-sm border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          You
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <Textarea
                          placeholder="Share your health journey, fitness wins, or wellness tips with the community..."
                          value={postText}
                          onChange={(e) => setPostText(e.target.value)}
                          className="min-h-[100px] resize-none bg-input/50 border-border text-foreground placeholder:text-muted-foreground professional-body"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleImageUpload} className="bg-transparent">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Photo
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Video className="h-4 w-4 mr-2" />
                              Video
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Smile className="h-4 w-4 mr-2" />
                              Mood
                            </Button>
                          </div>
                          <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={!postText.trim()}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => console.log(e.target.files)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Social Feed */}
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card
                      key={post.id}
                      className="bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                {post.user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-card-foreground professional-heading">
                                  {post.user.name}
                                </p>
                                {post.user.verified && <Award className="h-4 w-4 text-primary" />}
                              </div>
                              <p className="text-sm text-muted-foreground professional-body">{post.timeAgo}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <p className="text-card-foreground leading-relaxed professional-body">{post.content}</p>

                        {post.tags && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {post.image && (
                          <div className="rounded-xl overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post content"
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <Heart className="h-5 w-5 mr-2" />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <MessageCircle className="h-5 w-5 mr-2" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Share2 className="h-5 w-5 mr-2" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="create">
                <Card className="bg-card/80 backdrop-blur-sm border-border">
                  <CardHeader>
                    <h3 className="text-xl font-semibold professional-heading">Create New Post</h3>
                    <p className="text-muted-foreground professional-body">
                      Share your health journey with the community
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Textarea
                      placeholder="What's your health story today?"
                      className="min-h-[200px] professional-body"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                        <ImageIcon className="h-6 w-6" />
                        <span className="text-xs">Add Photo</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                        <Video className="h-6 w-6" />
                        <span className="text-xs">Add Video</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                        <Activity className="h-6 w-6" />
                        <span className="text-xs">Log Activity</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                        <Target className="h-6 w-6" />
                        <span className="text-xs">Set Goal</span>
                      </Button>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Publish Post
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card/80 backdrop-blur-sm border-border">
                    <CardHeader>
                      <h3 className="font-semibold professional-heading">Community Stats</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="professional-body">Active Members</span>
                        <Badge variant="secondary">1,234</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="professional-body">Posts Today</span>
                        <Badge variant="secondary">89</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="professional-body">Success Stories</span>
                        <Badge variant="secondary">156</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/80 backdrop-blur-sm border-border">
                    <CardHeader>
                      <h3 className="font-semibold professional-heading">Featured Members</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {posts.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{post.user.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium professional-heading">{post.user.name}</p>
                            <p className="text-xs text-muted-foreground">{post.likes} likes this week</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
