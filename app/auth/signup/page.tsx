"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Mail, Phone, Shield, User, Globe } from "lucide-react"
import Link from "next/link"

type SignupStep = "contact" | "otp" | "language" | "details"

export default function SignupPage() {
  const [step, setStep] = useState<SignupStep>("contact")
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [contact, setContact] = useState("")
  const [otp, setOtp] = useState("")
  const [language, setLanguage] = useState("")
  const [userDetails, setUserDetails] = useState({
    name: "",
    gender: "",
    age: "",
    medicalHistory: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!contact.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
      console.log(`[v0] OTP sent to ${contact}`)
    }, 1500)
  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("language")
      console.log(`[v0] OTP verified: ${otp}`)
    }, 1500)
  }

  const handleLanguageSelection = () => {
    if (!language) return
    setStep("details")
  }

  const handleCompleteSignup = async () => {
    if (!userDetails.name || !userDetails.gender || !userDetails.age) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log(`[v0] Signup completed:`, { contact, language, userDetails })
      window.location.href = "/onboarding"
    }, 2000)
  }

  const renderContactStep = () => (
    <>
      <div className="flex gap-2 mb-4">
        <Button
          variant={contactMethod === "email" ? "default" : "outline"}
          size="sm"
          onClick={() => setContactMethod("email")}
          className="flex-1"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        <Button
          variant={contactMethod === "phone" ? "default" : "outline"}
          size="sm"
          onClick={() => setContactMethod("phone")}
          className="flex-1"
        >
          <Phone className="h-4 w-4 mr-2" />
          Phone
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="text-card-foreground">
          {contactMethod === "email" ? "Email Address" : "Phone Number"}
        </Label>
        <Input
          id="contact"
          type={contactMethod === "email" ? "email" : "tel"}
          placeholder={contactMethod === "email" ? "Enter your email" : "Enter your phone number"}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="bg-input border-border text-foreground"
        />
      </div>

      <Button
        onClick={handleSendOTP}
        disabled={!contact.trim() || isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? "Sending..." : "Send OTP"}
      </Button>
    </>
  )

  const renderOTPStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="otp" className="text-card-foreground">
          Verification Code
        </Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="bg-input border-border text-foreground text-center text-lg tracking-widest"
        />
      </div>

      <Button
        onClick={handleVerifyOTP}
        disabled={otp.length !== 6 || isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? "Verifying..." : "Verify Code"}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => setStep("contact")}
        className="w-full text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {contactMethod} entry
      </Button>
    </>
  )

  const renderLanguageStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="language" className="text-card-foreground">
          Preferred Language
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="bg-input border-border text-foreground">
            <SelectValue placeholder="Select your preferred language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
            <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
            <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
            <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
            <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
            <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleLanguageSelection}
        disabled={!language}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => setStep("otp")}
        className="w-full text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to verification
      </Button>
    </>
  )

  const renderDetailsStep = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground">
            Full Name *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={userDetails.name}
            onChange={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value }))}
            className="bg-input border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-card-foreground">
            Gender *
          </Label>
          <Select
            value={userDetails.gender}
            onValueChange={(value) => setUserDetails((prev) => ({ ...prev, gender: value }))}
          >
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-card-foreground">
            Age *
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={userDetails.age}
            onChange={(e) => setUserDetails((prev) => ({ ...prev, age: e.target.value }))}
            className="bg-input border-border text-foreground"
            min="1"
            max="120"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medical-history" className="text-card-foreground">
            Medical History (Optional)
          </Label>
          <Textarea
            id="medical-history"
            placeholder="Any existing medical conditions, allergies, or medications..."
            value={userDetails.medicalHistory}
            onChange={(e) => setUserDetails((prev) => ({ ...prev, medicalHistory: e.target.value }))}
            className="bg-input border-border text-foreground min-h-[80px]"
          />
        </div>
      </div>

      <Button
        onClick={handleCompleteSignup}
        disabled={!userDetails.name || !userDetails.gender || !userDetails.age || isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? "Creating Account..." : "Complete Signup"}
      </Button>

      <Button
        variant="ghost"
        onClick={() => setStep("language")}
        className="w-full text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to language selection
      </Button>
    </>
  )

  const getStepIcon = () => {
    switch (step) {
      case "contact":
      case "otp":
        return <Shield className="h-8 w-8 text-primary" />
      case "language":
        return <Globe className="h-8 w-8 text-primary" />
      case "details":
        return <User className="h-8 w-8 text-primary" />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case "contact":
        return "Create Account"
      case "otp":
        return "Verify Your Account"
      case "language":
        return "Choose Language"
      case "details":
        return "Complete Your Profile"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case "contact":
        return "Enter your email or phone number to get started"
      case "otp":
        return `We've sent a verification code to your ${contactMethod}`
      case "language":
        return "Select your preferred language for the best experience"
      case "details":
        return "Tell us a bit about yourself to personalize your experience"
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">{getStepIcon()}</div>
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">{getStepTitle()}</CardTitle>
          <p className="text-muted-foreground">{getStepDescription()}</p>

          {/* Progress indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {["contact", "otp", "language", "details"].map((stepName, index) => (
                <div
                  key={stepName}
                  className={`w-2 h-2 rounded-full ${
                    stepName === step
                      ? "bg-primary"
                      : ["contact", "otp", "language", "details"].indexOf(step) > index
                        ? "bg-primary/50"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "contact" && renderContactStep()}
          {step === "otp" && renderOTPStep()}
          {step === "language" && renderLanguageStep()}
          {step === "details" && renderDetailsStep()}

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
