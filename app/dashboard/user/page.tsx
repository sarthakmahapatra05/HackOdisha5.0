"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Stethoscope, Clock, Heart, Activity, Calendar, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

export default function UserDashboard() {
  const [symptomText, setSymptomText] = useState("")
  const [recentSymptoms] = useState([
    { id: 1, symptoms: "Headache, fatigue", date: "2024-01-15", status: "analyzed" },
    { id: 2, symptoms: "Cough, fever", date: "2024-01-10", status: "pending" },
    { id: 3, symptoms: "Stomach pain", date: "2024-01-05", status: "completed" },
  ])

  const analyzeSymptoms = () => {
    if (!symptomText.trim()) return
    console.log(`[v0] Analyzing symptoms: ${symptomText}`)
    // In real app, this would call the symptom analysis API
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
            <p className="text-muted-foreground">Track your health and manage symptoms</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <User className="h-4 w-4 mr-2" />
            Patient
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Stethoscope className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Checks</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold text-foreground">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Symptom Check */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                Quick Symptom Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your current symptoms..."
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                className="min-h-[100px] bg-input border-border text-foreground"
              />
              <Button
                onClick={analyzeSymptoms}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!symptomText.trim()}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Analyze Symptoms
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Recent Symptom Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSymptoms.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.symptoms}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.status === "completed" ? "default" : item.status === "analyzed" ? "secondary" : "outline"
                      }
                      className={
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "analyzed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Heart className="h-5 w-5 text-primary" />
              Health Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Overall Health Score</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Symptom Resolution Rate</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Health Monitoring Consistency</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
