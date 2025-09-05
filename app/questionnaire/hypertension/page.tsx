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

export default function HypertensionQuestionnaire() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: any }>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      type: "single",
      question: "When was your blood pressure last measured?",
      options: ["Within the last week", "Within the last month", "Within the last 6 months", "More than 6 months ago"],
      required: true,
    },
    {
      id: 2,
      type: "single",
      question: "What was your most recent blood pressure reading?",
      options: [
        "Normal (less than 120/80)",
        "Elevated (120-129/less than 80)",
        "Stage 1 (130-139/80-89)",
        "Stage 2 (140/90 or higher)",
      ],
      required: true,
    },
    {
      id: 3,
      type: "multiple",
      question: "Which symptoms are you currently experiencing?",
      options: ["Headaches", "Dizziness", "Chest pain", "Shortness of breath", "Nosebleeds", "Vision changes"],
      required: true,
    },
    {
      id: 4,
      type: "scale",
      question: "On a scale of 1-10, how would you rate your current stress level?",
      required: true,
    },
    {
      id: 5,
      type: "single",
      question: "Do you have a family history of high blood pressure?",
      options: ["No family history", "Distant relatives", "Parents or siblings", "Multiple family members"],
      required: true,
    },
    {
      id: 6,
      type: "single",
      question: "How often do you experience headaches?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 7,
      type: "single",
      question: "Do you experience dizziness or lightheadedness?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 8,
      type: "single",
      question: "How is your current weight status?",
      options: ["Underweight", "Normal weight", "Overweight", "Obese"],
      required: true,
    },
    {
      id: 9,
      type: "single",
      question: "How often do you exercise?",
      options: ["Daily", "3-4 times per week", "1-2 times per week", "Rarely or never"],
      required: true,
    },
    {
      id: 10,
      type: "single",
      question: "How much salt do you consume in your diet?",
      options: ["Very little", "Moderate amount", "High amount", "Very high amount"],
      required: true,
    },
    {
      id: 11,
      type: "single",
      question: "Do you smoke or use tobacco products?",
      options: ["Never", "Former smoker", "Occasional", "Regular"],
      required: true,
    },
    {
      id: 12,
      type: "single",
      question: "How often do you drink alcohol?",
      options: ["Never", "Occasionally", "Regularly", "Daily"],
      required: true,
    },
    {
      id: 13,
      type: "single",
      question: "How is your sleep quality?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    {
      id: 14,
      type: "single",
      question: "Do you experience chest pain or discomfort?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 15,
      type: "single",
      question: "How often do you feel short of breath?",
      options: ["Never", "With heavy exertion", "With mild exertion", "At rest"],
      required: true,
    },
    {
      id: 16,
      type: "single",
      question: "Do you take any medications for blood pressure?",
      options: ["No medications", "One medication", "Two medications", "Three or more medications"],
      required: true,
    },
    {
      id: 17,
      type: "single",
      question: "How well do you manage stress?",
      options: ["Very well", "Well", "Poorly", "Very poorly"],
      required: true,
    },
    {
      id: 18,
      type: "single",
      question: "Do you monitor your blood pressure at home?",
      options: ["Yes, regularly", "Sometimes", "Rarely", "Never"],
      required: true,
    },
    {
      id: 19,
      type: "single",
      question: "How often do you eat processed or fast foods?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 20,
      type: "single",
      question: "Do you experience heart palpitations?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 21,
      type: "single",
      question: "How is your kidney function?",
      options: ["Normal", "Slightly impaired", "Moderately impaired", "Severely impaired"],
      required: true,
    },
    {
      id: 22,
      type: "single",
      question: "Do you have diabetes?",
      options: ["No", "Pre-diabetes", "Type 1 diabetes", "Type 2 diabetes"],
      required: true,
    },
    {
      id: 23,
      type: "single",
      question: "How often do you experience nosebleeds?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 24,
      type: "single",
      question: "Do you experience vision changes or blurred vision?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 25,
      type: "single",
      question: "How is your energy level throughout the day?",
      options: ["High energy", "Normal energy", "Low energy", "Very low energy"],
      required: true,
    },
    {
      id: 26,
      type: "single",
      question: "Do you experience swelling in your legs or ankles?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 27,
      type: "single",
      question: "How often do you feel anxious or worried?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 28,
      type: "single",
      question: "Do you have high cholesterol?",
      options: ["No", "Borderline high", "High", "Very high"],
      required: true,
    },
    {
      id: 29,
      type: "single",
      question: "How much caffeine do you consume daily?",
      options: ["None", "1-2 cups coffee", "3-4 cups coffee", "More than 4 cups"],
      required: true,
    },
    {
      id: 30,
      type: "single",
      question: "Do you experience irregular heartbeat?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 31,
      type: "single",
      question: "How often do you see a healthcare provider?",
      options: ["Regularly", "Annually", "When needed", "Rarely"],
      required: true,
    },
    {
      id: 32,
      type: "single",
      question: "Do you take any supplements or vitamins?",
      options: ["No supplements", "Basic vitamins", "Heart-specific supplements", "Multiple supplements"],
      required: true,
    },
    {
      id: 33,
      type: "single",
      question: "How is your work-life balance?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    {
      id: 34,
      type: "single",
      question: "Do you experience memory problems or confusion?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 35,
      type: "single",
      question: "How much water do you drink daily?",
      options: ["Less than 4 glasses", "4-6 glasses", "7-8 glasses", "More than 8 glasses"],
      required: true,
    },
    {
      id: 36,
      type: "single",
      question: "Do you experience muscle cramps or weakness?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 37,
      type: "single",
      question: "How is your mood generally?",
      options: ["Very positive", "Positive", "Neutral", "Negative"],
      required: true,
    },
    {
      id: 38,
      type: "single",
      question: "Do you have sleep apnea or snoring problems?",
      options: ["No", "Mild snoring", "Moderate snoring", "Diagnosed sleep apnea"],
      required: true,
    },
    {
      id: 39,
      type: "single",
      question: "How often do you eat fruits and vegetables?",
      options: ["Daily", "Most days", "Sometimes", "Rarely"],
      required: true,
    },
    {
      id: 40,
      type: "single",
      question: "Do you experience frequent urination?",
      options: ["No", "Mild increase", "Moderate increase", "Significant increase"],
      required: true,
    },
    {
      id: 41,
      type: "single",
      question: "How is your sexual health?",
      options: ["No issues", "Minor issues", "Moderate issues", "Significant issues"],
      required: true,
    },
    {
      id: 42,
      type: "single",
      question: "Do you experience ringing in your ears (tinnitus)?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 43,
      type: "single",
      question: "How motivated are you to make lifestyle changes?",
      options: ["Very motivated", "Somewhat motivated", "Slightly motivated", "Not motivated"],
      required: true,
    },
    {
      id: 44,
      type: "single",
      question: "Do you have support from family/friends for health management?",
      options: ["Strong support", "Some support", "Limited support", "No support"],
      required: true,
    },
    {
      id: 45,
      type: "single",
      question: "How much do you know about hypertension?",
      options: ["Very knowledgeable", "Somewhat knowledgeable", "Limited knowledge", "No knowledge"],
      required: true,
    },
    {
      id: 46,
      type: "single",
      question: "Do you experience cold hands or feet?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 47,
      type: "single",
      question: "How is your overall quality of life?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    {
      id: 48,
      type: "single",
      question: "Do you experience frequent infections?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      required: true,
    },
    {
      id: 49,
      type: "single",
      question: "How concerned are you about your blood pressure?",
      options: ["Not concerned", "Slightly concerned", "Moderately concerned", "Very concerned"],
      required: true,
    },
    {
      id: 50,
      type: "text",
      question: "Please share any additional information about your blood pressure or cardiovascular health:",
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
    router.push(`/results/hypertension?answers=${encodeURIComponent(JSON.stringify(answers))}`)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Hypertension Assessment Complete!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for completing the hypertension assessment. We're analyzing your responses to provide
              personalized recommendations.
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
            <h1 className="text-2xl font-bold text-foreground">Hypertension Assessment</h1>
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
                  <span>1 (Very Low)</span>
                  <span>10 (Very High)</span>
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
                This hypertension assessment is for informational purposes only and should not replace professional
                medical advice.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
