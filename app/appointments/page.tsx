"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, User, MapPin, Phone, Video, Search } from "lucide-react"
import Link from "next/link"

interface Doctor {
  id: string
  name: string
  specialization: string
  avatar: string
  rating: number
  experience: number
  consultationFee: number
  availableSlots: string[]
  location: string
}

interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  doctorSpecialization: string
  date: string
  time: string
  type: "in-person" | "video" | "phone"
  status: "upcoming" | "completed" | "cancelled"
  reason: string
}

export default function AppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video" | "phone">("video")
  const [reason, setReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("all")
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Mock data
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      avatar: "/woman-profile.png",
      rating: 4.8,
      experience: 8,
      consultationFee: 150,
      availableSlots: ["09:00", "10:30", "14:00", "15:30", "17:00"],
      location: "Heart Care Center, Mumbai",
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialization: "Neurology",
      avatar: "/man-profile.png",
      rating: 4.9,
      experience: 12,
      consultationFee: 200,
      availableSlots: ["10:00", "11:30", "13:00", "16:00", "18:00"],
      location: "Neuro Clinic, Delhi",
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialization: "General Medicine",
      avatar: "/diverse-woman-smiling.png",
      rating: 4.7,
      experience: 6,
      consultationFee: 100,
      availableSlots: ["09:30", "11:00", "14:30", "16:30", "18:30"],
      location: "City Hospital, Bangalore",
    },
  ]

  const myAppointments: Appointment[] = [
    {
      id: "1",
      doctorId: "1",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialization: "Cardiology",
      date: "2024-01-20",
      time: "14:00",
      type: "video",
      status: "upcoming",
      reason: "Follow-up consultation for chest pain assessment",
    },
    {
      id: "2",
      doctorId: "2",
      doctorName: "Dr. Rajesh Kumar",
      doctorSpecialization: "Neurology",
      date: "2024-01-15",
      time: "10:00",
      type: "in-person",
      status: "completed",
      reason: "Headache and dizziness evaluation",
    },
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSpecialization === "all" || doctor.specialization === filterSpecialization
    return matchesSearch && matchesFilter
  })

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason.trim()) {
      alert("Please fill in all required fields")
      return
    }

    // In real app, this would make an API call
    alert(`Appointment booked successfully with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`)
    setShowBookingForm(false)
    setSelectedDoctor(null)
    setSelectedDate("")
    setSelectedTime("")
    setReason("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "in-person":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  // Generate next 7 days for date selection
  const getAvailableDates = () => {
    const dates = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Appointments</h1>
          <p className="text-muted-foreground">Book and manage your medical appointments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Appointments */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-card-foreground">My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myAppointments.map((appointment) => (
                    <Card key={appointment.id} className="bg-accent border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/woman-profile.png" />
                              <AvatarFallback>
                                {appointment.doctorName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-card-foreground">{appointment.doctorName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.doctorSpecialization}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            {getTypeIcon(appointment.type)}
                            {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                          </div>
                        </div>

                        <p className="text-sm text-foreground mt-2">{appointment.reason}</p>

                        {appointment.status === "upcoming" && (
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                              Join Call
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-border text-foreground hover:bg-accent"
                            >
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-border text-foreground hover:bg-accent"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Doctors */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-card-foreground">Available Doctors</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-input border-border w-48"
                      />
                    </div>
                    <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                      <SelectTrigger className="bg-input border-border w-40">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="General Medicine">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="bg-accent border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>★ {doctor.rating}</span>
                              <span>•</span>
                              <span>{doctor.experience}y exp</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {doctor.location}
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Consultation Fee:</span>
                            <span className="font-semibold text-card-foreground">₹{doctor.consultationFee}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedDoctor(doctor)
                            setShowBookingForm(true)
                          }}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Book Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form Sidebar */}
          <div>
            {showBookingForm && selectedDoctor ? (
              <Card className="bg-card border-border sticky top-6">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Book Appointment</CardTitle>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedDoctor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedDoctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{selectedDoctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date">Select Date *</Label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Choose date" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableDates().map((date) => (
                          <SelectItem key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time">Select Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Choose time" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDoctor.availableSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Consultation Type</Label>
                    <Select
                      value={appointmentType}
                      onValueChange={(value: "in-person" | "video" | "phone") => setAppointmentType(value)}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="reason">Reason for Visit *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Describe your symptoms or reason for consultation..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Consultation Fee:</span>
                      <span className="font-semibold">₹{selectedDoctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Platform Fee:</span>
                      <span>₹20</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
                      <span>Total:</span>
                      <span>₹{selectedDoctor.consultationFee + 20}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleBookAppointment}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Confirm Booking
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowBookingForm(false)}
                      className="w-full bg-transparent border-border text-foreground hover:bg-accent"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Book an Appointment</h3>
                  <p className="text-muted-foreground">Select a doctor to schedule your consultation</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
