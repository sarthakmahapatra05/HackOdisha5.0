"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, Users, Clock, Search, Calendar, AlertTriangle, CheckCircle, Eye, MessageSquare } from "lucide-react"

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [patients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 32,
      lastCheck: "2024-01-15",
      status: "urgent",
      symptoms: "Chest pain, shortness of breath",
      riskLevel: "high",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      lastCheck: "2024-01-14",
      status: "reviewed",
      symptoms: "Headache, fatigue",
      riskLevel: "medium",
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 45,
      lastCheck: "2024-01-13",
      status: "pending",
      symptoms: "Back pain, muscle stiffness",
      riskLevel: "low",
    },
  ])

  const [consultations] = useState([
    { id: 1, patient: "Sarah Wilson", time: "10:00 AM", type: "Follow-up", status: "scheduled" },
    { id: 2, patient: "Robert Brown", time: "11:30 AM", type: "Initial", status: "in-progress" },
    { id: 3, patient: "Emily Davis", time: "2:00 PM", type: "Urgent", status: "scheduled" },
  ])

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "reviewed":
        return "bg-green-100 text-green-800"
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
            <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Manage patients and review symptom analyses</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <UserCheck className="h-4 w-4 mr-2" />
            Doctor
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Urgent Cases</p>
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
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
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
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="consultations">Today's Consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            {/* Patient Search */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Search className="h-5 w-5 text-primary" />
                  Patient Search & Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search patients by name, symptoms, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="space-y-3">
                  {patients.map((patient) => (
                    <Card key={patient.id} className="bg-accent border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-foreground">{patient.name}</h4>
                              <Badge className={getRiskBadgeColor(patient.riskLevel)}>{patient.riskLevel} risk</Badge>
                              <Badge className={getStatusBadgeColor(patient.status)}>{patient.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Age: {patient.age} | Last Check: {patient.lastCheck}
                            </p>
                            <p className="text-sm text-foreground">
                              <strong>Symptoms:</strong> {patient.symptoms}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact
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

          <TabsContent value="consultations" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultations.map((consultation) => (
                    <Card key={consultation.id} className="bg-accent border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-semibold text-foreground">{consultation.patient}</h4>
                              <Badge variant={consultation.status === "in-progress" ? "default" : "secondary"}>
                                {consultation.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {consultation.time} - {consultation.type} Consultation
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant={consultation.status === "in-progress" ? "default" : "outline"} size="sm">
                              {consultation.status === "in-progress" ? "Continue" : "Start"}
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
        </Tabs>
      </div>
    </div>
  )
}
