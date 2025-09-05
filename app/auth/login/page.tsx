"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Phone, Shield } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [step, setStep] = useState<"input" | "otp">("input")
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [contact, setContact] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!contact.trim()) return

    setIsLoading(true)
    // Mock OTP sending - in real app this would call an API
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
      console.log(`[v0] OTP sent to ${contact}`)
    }, 1500)
  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) return

    setIsLoading(true)
    // Mock OTP verification - in real app this would verify with backend
    setTimeout(() => {
      setIsLoading(false)
      console.log(`[v0] OTP verified: ${otp}`)
      // Redirect to dashboard or home
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            {step === "input" ? "Login to SymptoCare" : "Verify OTP"}
          </CardTitle>
          <p className="text-muted-foreground">
            {step === "input"
              ? "Enter your email or phone number to continue"
              : `We've sent a verification code to your ${contactMethod}`}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "input" ? (
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
          ) : (
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
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setStep("input")}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {contactMethod} entry
              </Button>
            </>
          )}

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
