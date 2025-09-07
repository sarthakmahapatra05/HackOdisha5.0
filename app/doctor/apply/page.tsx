"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"

export default function DoctorApplicationPage() {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    education: {
      medicalDegree: "",
      university: "",
      graduationYear: "",
      additionalCertifications: "",
    },
    professional: {
      licenseNumber: "",
      yearsOfExperience: "",
      currentPractice: "",
      specializations: [] as string[],
      previousExperience: "",
    },
    documents: {
      medicalLicense: null as File | null,
      degreeCertificate: null as File | null,
      experienceCertificate: null as File | null,
      identityProof: null as File | null,
    },
    agreement: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const specializations = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Gynecology",
    "Ophthalmology",
    "ENT",
    "Gastroenterology",
    "Pulmonology",
    "Endocrinology",
  ]

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        specializations: checked
          ? [...prev.professional.specializations, specialization]
          : prev.professional.specializations.filter((s) => s !== specialization),
      },
    }))
  }

  const handleFileUpload = (field: keyof typeof formData.documents, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const user = await getCurrentUser()
      if (!user) {
        alert("You must be logged in to submit the application.")
        setIsSubmitting(false)
        return
      }

      // Prepare documents URLs or placeholders (assuming upload handled elsewhere)
      const documents = {
        medicalLicense: formData.documents.medicalLicense ? formData.documents.medicalLicense.name : null,
        degreeCertificate: formData.documents.degreeCertificate ? formData.documents.degreeCertificate.name : null,
        experienceCertificate: formData.documents.experienceCertificate ? formData.documents.experienceCertificate.name : null,
        identityProof: formData.documents.identityProof ? formData.documents.identityProof.name : null,
      }

      // Insert application into doctor_applications table
      const { error } = await supabase.from("doctor_applications").insert({
        user_id: user.id,
        license_number: formData.professional.licenseNumber,
        specialization: formData.professional.specializations.join(", "),
        experience_years: parseInt(formData.professional.yearsOfExperience) || 0,
        documents: documents,
        status: "pending",
      })

      if (error) {
        throw error
      }

      alert("Application submitted successfully! You will receive a confirmation email shortly.")
    } catch (error: any) {
      alert("Failed to submit application: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Application</h1>
          <p className="text-muted-foreground">
            Join SymptoCare as a healthcare professional. Complete the application form below.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && <div className={`h-1 w-24 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Personal Info</span>
            <span>Education</span>
            <span>Professional</span>
            <span>Documents</span>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Educational Background"}
              {currentStep === 3 && "Professional Details"}
              {currentStep === 4 && "Document Upload"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.personalInfo.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.personalInfo.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, city: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.personalInfo.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, state: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Educational Background */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medicalDegree">Medical Degree *</Label>
                  <Select
                    value={formData.education.medicalDegree}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: { ...prev.education, medicalDegree: value },
                      }))
                    }
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select your medical degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mbbs">MBBS</SelectItem>
                      <SelectItem value="md">MD</SelectItem>
                      <SelectItem value="ms">MS</SelectItem>
                      <SelectItem value="dm">DM</SelectItem>
                      <SelectItem value="mch">MCh</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="university">University/Institution *</Label>
                  <Input
                    id="university"
                    value={formData.education.university}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: { ...prev.education, university: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    min="1950"
                    max="2024"
                    value={formData.education.graduationYear}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: { ...prev.education, graduationYear: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="additionalCertifications">Additional Certifications</Label>
                  <Textarea
                    id="additionalCertifications"
                    placeholder="List any additional certifications, fellowships, or specialized training"
                    value={formData.education.additionalCertifications}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: { ...prev.education, additionalCertifications: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Professional Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber">Medical License Number *</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.professional.licenseNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          professional: { ...prev.professional, licenseNumber: e.target.value },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                    <Input
                      id="yearsOfExperience"
                      type="number"
                      min="0"
                      value={formData.professional.yearsOfExperience}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          professional: { ...prev.professional, yearsOfExperience: e.target.value },
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="currentPractice">Current Practice/Hospital *</Label>
                  <Input
                    id="currentPractice"
                    value={formData.professional.currentPractice}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        professional: { ...prev.professional, currentPractice: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <Label>Specializations *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec}
                          checked={formData.professional.specializations.includes(spec)}
                          onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                        />
                        <Label htmlFor={spec} className="text-sm">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="previousExperience">Previous Experience</Label>
                  <Textarea
                    id="previousExperience"
                    placeholder="Describe your previous work experience, achievements, and any relevant background"
                    value={formData.professional.previousExperience}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        professional: { ...prev.professional, previousExperience: e.target.value },
                      }))
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: "medicalLicense", label: "Medical License", required: true },
                    { key: "degreeCertificate", label: "Degree Certificate", required: true },
                    { key: "experienceCertificate", label: "Experience Certificate", required: false },
                    { key: "identityProof", label: "Identity Proof", required: true },
                  ].map(({ key, label, required }) => (
                    <div key={key} className="space-y-2">
                      <Label>
                        {label} {required && "*"}
                      </Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(key as keyof typeof formData.documents, file)
                          }}
                          className="hidden"
                          id={key}
                        />
                        <label htmlFor={key} className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {formData.documents[key as keyof typeof formData.documents]?.name ||
                              "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreement"
                    checked={formData.agreement}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreement: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="agreement" className="text-sm">
                    I agree to the terms and conditions and confirm that all information provided is accurate *
                  </Label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="bg-transparent border-border text-foreground hover:bg-accent"
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreement || isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Application Review Process</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your application will be reviewed by our medical board within 5-7 business days</li>
                  <li>• We may contact you for additional information or verification</li>
                  <li>• Once approved, you'll receive login credentials and access to the doctor portal</li>
                  <li>• All documents must be clear, legible, and valid</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
