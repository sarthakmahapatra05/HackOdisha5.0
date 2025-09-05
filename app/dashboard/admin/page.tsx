"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  Database,
  Activity,
  TrendingUp,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [systemStats] = useState({
    totalUsers: 1247,
    totalDoctors: 89,
    activeUsers: 892,
    systemUptime: "99.9%",
    dailyAnalyses: 156,
    pendingReviews: 23,
  })

  const [recentUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@email.com", role: "user", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Dr. Smith", email: "smith@hospital.com", role: "doctor", status: "active", joinDate: "2024-01-14" },
    { id: 3, name: "Bob Wilson", email: "bob@email.com", role: "user", status: "pending", joinDate: "2024-01-13" },
  ])

  const [systemLogs] = useState([
    { id: 1, type: "info", message: "System backup completed successfully", timestamp: "2024-01-15 10:30:00" },
    { id: 2, type: "warning", message: "High server load detected", timestamp: "2024-01-15 09:15:00" },
    { id: 3, type: "error", message: "Failed login attempt from suspicious IP", timestamp: "2024-01-15 08:45:00" },
  ])

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "doctor":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">System management and analytics</p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Shield className="h-4 w-4 mr-2" />
            Administrator
          </Badge>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-xl font-bold text-foreground">{systemStats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doctors</p>
                  <p className="text-xl font-bold text-foreground">{systemStats.totalDoctors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-xl font-bold text-foreground">{systemStats.activeUsers}</p>
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
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-xl font-bold text-foreground">{systemStats.systemUptime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Analyses</p>
                  <p className="text-xl font-bold text-foreground">{systemStats.dailyAnalyses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold text-foreground">{systemStats.pendingReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">System Analytics</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search users by name, email, or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">Add User</Button>
                </div>

                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <Card key={user.id} className="bg-accent border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-foreground">{user.name}</h4>
                              <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {user.email} | Joined: {user.joinDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              {user.status === "active" ? "Suspend" : "Activate"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Usage Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Daily Active Users</span>
                      <span className="text-lg font-bold text-foreground">892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Symptom Analyses Today</span>
                      <span className="text-lg font-bold text-foreground">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Doctor Consultations</span>
                      <span className="text-lg font-bold text-foreground">43</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">System Response Time</span>
                      <span className="text-lg font-bold text-foreground">1.2s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Database className="h-5 w-5 text-primary" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Database Status</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">API Status</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Storage Usage</span>
                      <span className="text-sm text-foreground">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Memory Usage</span>
                      <span className="text-sm text-foreground">45%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Settings className="h-5 w-5 text-primary" />
                  System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemLogs.map((log) => (
                    <Card key={log.id} className="bg-accent border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <Badge className={getLogTypeColor(log.type)}>{log.type}</Badge>
                              <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                            </div>
                            <p className="text-sm text-foreground">{log.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
