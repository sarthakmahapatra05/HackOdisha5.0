"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  type: "single" | "multiple" | "text" | "scale"
  question: string
  options?: string[]
  required: boolean
}

export default function AsthmaQuestionnaire() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: any }>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      type: "single",
      question: "How long have you been experiencing breathing difficulties?",
      options: ["Less than 1 week", "1-4 weeks", "1-6 months", "More than 6 months"],
      required: true,
    },
    {
      id: 2,
      type: "multiple",
      question: "Which breathing symptoms are you currently experiencing?",
      options: [
        "Wheezing",
        "Shortness of breath",
        "Chest tightness",
        "Persistent cough",
        "Difficulty sleeping due to breathing",
      ],
      required: true,
    },
    {
      id: 3,
      type: "scale",
      question: "On a scale of 1-10, how would you rate your current breathing difficulty?",
      required: true,
    },
    {
      id: 4,
      type: "single",
      question: "When do your symptoms typically occur?",
      options: ["Morning", "Evening", "During exercise", "All day"],
      required: true,
    },
    {
      id: 5,
      type: "single",
      question: "Do you have a family history of asthma or allergies?",
      options: ["No family history", "Distant relatives", "Parents or siblings", "Multiple family members"],
      required: true,
    },
    // Continue with remaining 45 questions...
    {
      id: 6,
      type: "single",
      question: "How often do you use a rescue inhaler?",
      options: ["Never", "Rarely", "Weekly", "Daily"],
      required: true,
    },
    {
      id: 7,
      type: "single",
      question: "Do you experience wheezing sounds when breathing?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 8,
      type: "single",
      question: "How is your exercise tolerance?",
      options: ["Normal", "Slightly limited", "Moderately limited", "Severely limited"],
      required: true,
    },
    {
      id: 9,
      type: "single",
      question: "Do you experience chest tightness?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 10,
      type: "single",
      question: "How often do you cough?",
      options: ["Never", "Occasionally", "Daily", "Constantly"],
      required: true,
    },
    // Adding more comprehensive asthma questions...
    {
      id: 11,
      type: "single",
      question: "Is your cough productive (with phlegm)?",
      options: ["No cough", "Dry cough", "Some phlegm", "Lots of phlegm"],
      required: true,
    },
    {
      id: 12,
      type: "single",
      question: "Do you wake up at night due to breathing problems?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 13,
      type: "multiple",
      question: "Which triggers worsen your symptoms?",
      options: ["Cold air", "Exercise", "Allergens", "Stress", "Smoke", "Strong odors"],
      required: true,
    },
    {
      id: 14,
      type: "single",
      question: "Do you have seasonal allergies?",
      options: ["No", "Mild", "Moderate", "Severe"],
      required: true,
    },
    {
      id: 15,
      type: "single",
      question: "How is your peak flow reading (if you measure it)?",
      options: ["Don't measure", "Normal", "Below normal", "Significantly low"],
      required: true,
    },
    {
      id: 16,
      type: "single",
      question: "Do you take daily asthma medications?",
      options: ["No medications", "Rescue inhaler only", "Daily controller", "Multiple medications"],
      required: true,
    },
    {
      id: 17,
      type: "single",
      question: "How often do you see a doctor for asthma?",
      options: ["Never", "When symptoms worsen", "Regularly", "Frequently"],
      required: true,
    },
    {
      id: 18,
      type: "single",
      question: "Do you experience symptoms with weather changes?",
      options: ["Never", "Rarely", "Sometimes", "Always"],
      required: true,
    },
    {
      id: 19,
      type: "single",
      question: "How do you feel after using your rescue inhaler?",
      options: ["Don't use one", "Complete relief", "Some relief", "Little relief"],
      required: true,
    },
    {
      id: 20,
      type: "single",
      question: "Do you have eczema or skin allergies?",
      options: ["No", "Mild", "Moderate", "Severe"],
      required: true,
    },
    {
      id: 21,
      type: "single",
      question: "How is your voice affected?",
      options: ["Normal", "Occasionally hoarse", "Frequently hoarse", "Always hoarse"],
      required: true,
    },
    {
      id: 22,
      type: "single",
      question: "Do you experience fatigue due to breathing problems?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 23,
      type: "single",
      question: "How do pets affect your symptoms?",
      options: ["No effect", "Mild worsening", "Moderate worsening", "Severe worsening"],
      required: true,
    },
    {
      id: 24,
      type: "single",
      question: "Do you smoke or are you exposed to secondhand smoke?",
      options: ["No exposure", "Occasional exposure", "Regular exposure", "Heavy exposure"],
      required: true,
    },
    {
      id: 25,
      type: "single",
      question: "How do dust or dust mites affect you?",
      options: ["No effect", "Mild symptoms", "Moderate symptoms", "Severe symptoms"],
      required: true,
    },
    {
      id: 26,
      type: "single",
      question: "Do you experience anxiety related to breathing difficulties?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 27,
      type: "single",
      question: "How is your sleep quality?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    {
      id: 28,
      type: "single",
      question: "Do you use a spacer with your inhaler?",
      options: ["Don't use inhaler", "No spacer", "Sometimes", "Always"],
      required: true,
    },
    {
      id: 29,
      type: "single",
      question: "How often do you need emergency care for breathing problems?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 30,
      type: "single",
      question: "Do you have gastroesophageal reflux (GERD)?",
      options: ["No", "Mild", "Moderate", "Severe"],
      required: true,
    },
    {
      id: 31,
      type: "single",
      question: "How do strong emotions affect your breathing?",
      options: ["No effect", "Mild effect", "Moderate effect", "Severe effect"],
      required: true,
    },
    {
      id: 32,
      type: "single",
      question: "Do you experience symptoms with certain foods?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 33,
      type: "single",
      question: "How is your overall fitness level?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    {
      id: 34,
      type: "single",
      question: "Do you use air purifiers or filters at home?",
      options: ["Yes, regularly", "Sometimes", "Rarely", "Never"],
      required: true,
    },
    {
      id: 35,
      type: "single",
      question: "How do cleaning products affect your breathing?",
      options: ["No effect", "Mild irritation", "Moderate irritation", "Severe irritation"],
      required: true,
    },
    {
      id: 36,
      type: "single",
      question: "Do you monitor your symptoms with a diary or app?",
      options: ["Yes, regularly", "Sometimes", "Rarely", "Never"],
      required: true,
    },
    {
      id: 37,
      type: "single",
      question: "How well do you understand your asthma triggers?",
      options: ["Very well", "Somewhat", "Limited understanding", "Not at all"],
      required: true,
    },
    {
      id: 38,
      type: "single",
      question: "Do you have an asthma action plan?",
      options: ["Yes, written plan", "Verbal instructions", "Some guidance", "No plan"],
      required: true,
    },
    {
      id: 39,
      type: "single",
      question: "How do you feel about your current asthma control?",
      options: ["Very well controlled", "Well controlled", "Poorly controlled", "Very poorly controlled"],
      required: true,
    },
    {
      id: 40,
      type: "single",
      question: "Do you experience symptoms during menstrual cycles (if applicable)?",
      options: ["Not applicable", "No change", "Mild worsening", "Significant worsening"],
      required: true,
    },
    {
      id: 41,
      type: "single",
      question: "How do you manage stress related to asthma?",
      options: ["Very well", "Well", "Poorly", "Very poorly"],
      required: true,
    },
    {
      id: 42,
      type: "single",
      question: "Do you participate in pulmonary rehabilitation?",
      options: ["Yes, currently", "Previously", "Considering it", "Never"],
      required: true,
    },
    {
      id: 43,
      type: "single",
      question: "How do you rate your inhaler technique?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    {
      id: 44,
      type: "single",
      question: "Do you experience side effects from asthma medications?",
      options: ["No side effects", "Mild side effects", "Moderate side effects", "Severe side effects"],
      required: true,
    },
    {
      id: 45,
      type: "single",
      question: "How motivated are you to improve asthma management?",
      options: ["Very motivated", "Somewhat motivated", "Slightly motivated", "Not motivated"],
      required: true,
    },
    {
      id: 46,
      type: "single",
      question: "Do you have support from family/friends for asthma management?",
      options: ["Strong support", "Some support", "Limited support", "No support"],
      required: true,
    },
    {
      id: 47,
      type: "single",
      question: "How does asthma affect your daily activities?",
      options: ["No impact", "Mild impact", "Moderate impact", "Severe impact"],
      required: true,
    },
    {
      id: 48,
      type: "single",
      question: "Do you avoid certain activities due to asthma?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 49,
      type: "single",
      question: "How concerned are you about your breathing symptoms?",
      options: ["Not concerned", "Slightly concerned", "Moderately concerned", "Very concerned"],
      required: true,
    },
    {
      id: 50,
      type: "text",
      question: "Please share any additional information about your asthma or breathing concerns:",
      required: false,
    },
  ]

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const submitQuestionnaire = () => {
    router.push(`/results/asthma?answers=${encodeURIComponent(JSON.stringify(answers))}`)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Asthma Assessment Complete!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for completing the asthma assessment. We're analyzing your responses to provide personalized
              recommendations.
            </p>
            <Button onClick={submitQuestionnaire} className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Asthma Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground text-lg">{currentQ.question}</CardTitle>
            {currentQ.required && <p className="text-sm text-muted-foreground">* This question is required</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQ.type === "single" && currentQ.options && (
              <RadioGroup value={currentAnswer || ""} onValueChange={(value) => handleAnswer(currentQ.id, value)}>
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-foreground">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === "multiple" && currentQ.options && (
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${index}`}
                      checked={currentAnswer?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        const newAnswer = currentAnswer || []
                        if (checked) {
                          handleAnswer(currentQ.id, [...newAnswer, option])
                        } else {
                          handleAnswer(
                            currentQ.id,
                            newAnswer.filter((item: string) => item !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`option-${index}`} className="text-foreground">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {currentQ.type === "scale" && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 (No Difficulty)</span>
                  <span>10 (Severe Difficulty)</span>
                </div>
                <RadioGroup
                  value={currentAnswer?.toString() || ""}
                  onValueChange={(value) => handleAnswer(currentQ.id, Number.parseInt(value))}
                  className="flex justify-between"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div key={num} className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value={num.toString()} id={`scale-${num}`} />
                      <Label htmlFor={`scale-${num}`} className="text-xs">
                        {num}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {currentQ.type === "text" && (
              <Textarea
                placeholder="Please provide details..."
                value={currentAnswer || ""}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                className="bg-input border-border text-foreground"
              />
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="bg-transparent border-border text-foreground hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={currentQ.required && !currentAnswer}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>
                This asthma assessment is for informational purposes only and should not replace professional medical
                advice.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
