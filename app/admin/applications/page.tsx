"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

interface DoctorApplication {
  id: string
  fullName: string
  email: string
  phone: string
  specializations: string[]
  experience: number
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  university: string
  degree: string
  licenseNumber: string
}

export default function AdminApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<DoctorApplication | null>(null)

  // Mock data
  const applications: DoctorApplication[] = [
    {
      id: "1",
      fullName: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+91 9876543210",
      specializations: ["Cardiology", "General Medicine"],
      experience: 8,
      status: "pending",
      submittedAt: "2024-01-15",
      university: "AIIMS Delhi",
      degree: "MD",
      licenseNumber: "MH12345",
    },
    {
      id: "2",
      fullName: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 9876543211",
      specializations: ["Neurology"],
      experience: 12,
      status: "approved",
      submittedAt: "2024-01-10",
      university: "PGI Chandigarh",
      degree: "DM",
      licenseNumber: "DL67890",
    },
    {
      id: "3",
      fullName: "Dr. Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543212",
      specializations: ["Pediatrics", "General Medicine"],
      experience: 5,
      status: "rejected",
      submittedAt: "2024-01-08",
      university: "KEM Hospital Mumbai",
      degree: "MBBS",
      licenseNumber: "MH54321",
    },
  ]

  const filteredApplications = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleStatusUpdate = (applicationId: string, newStatus: "approved" | "rejected") => {
    // In real app, this would make an API call
    console.log(`Updating application ${applicationId} to ${newStatus}`)
    alert(`Application ${newStatus} successfully!`)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <Link href="/dashboard/admin" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Applications</h1>
          <p className="text-muted-foreground">Review and manage doctor applications for SymptoCare platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-card-foreground">Applications</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-4">
                    {filteredApplications.map((application) => (
                      <Card
                        key={application.id}
                        className={`cursor-pointer transition-colors hover:bg-accent ${
                          selectedApplication?.id === application.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-card-foreground">{application.fullName}</h3>
                            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {application.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Stethoscope className="h-3 w-3" />
                              {application.specializations.join(", ")}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4 mt-4">
                    {filteredApplications
                      .filter((app) => app.status === "pending")
                      .map((application) => (
                        <Card
                          key={application.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            selectedApplication?.id === application.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedApplication(application)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-card-foreground">{application.fullName}</h3>
                              <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {application.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-3 w-3" />
                                {application.specializations.join(", ")}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent value="approved" className="space-y-4 mt-4">
                    {filteredApplications
                      .filter((app) => app.status === "approved")
                      .map((application) => (
                        <Card
                          key={application.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            selectedApplication?.id === application.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedApplication(application)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-card-foreground">{application.fullName}</h3>
                              <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {application.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-3 w-3" />
                                {application.specializations.join(", ")}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent value="rejected" className="space-y-4 mt-4">
                    {filteredApplications
                      .filter((app) => app.status === "rejected")
                      .map((application) => (
                        <Card
                          key={application.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            selectedApplication?.id === application.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedApplication(application)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-card-foreground">{application.fullName}</h3>
                              <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {application.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-3 w-3" />
                                {application.specializations.join(", ")}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Application Details */}
          <div>
            {selectedApplication ? (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Application Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">{selectedApplication.fullName}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {selectedApplication.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {selectedApplication.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        {selectedApplication.degree} - {selectedApplication.university}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        License: {selectedApplication.licenseNumber}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {selectedApplication.experience} years experience
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedApplication.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Status</h4>
                    <Badge className={getStatusColor(selectedApplication.status)}>{selectedApplication.status}</Badge>
                  </div>

                  {selectedApplication.status === "pending" && (
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleStatusUpdate(selectedApplication.id, "approved")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve Application
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(selectedApplication.id, "rejected")}
                        variant="destructive"
                        className="w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject Application
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select an application to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
