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
import { useParams, useRouter } from "next/navigation"

interface Question {
  id: number
  type: "single" | "multiple" | "text" | "scale"
  question: string
  options?: string[]
  required: boolean
}

interface QuestionnaireData {
  [key: string]: Question[]
}

export default function QuestionnairePage() {
  const params = useParams()
  const router = useRouter()
  const condition = params.condition as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: any }>({})
  const [isCompleted, setIsCompleted] = useState(false)

  // Mock questionnaire data - in real app this would come from API
  const questionnaireData: QuestionnaireData = {
    "common-cold": [
      {
        id: 1,
        type: "single",
        question: "How long have you been experiencing symptoms?",
        options: ["Less than 24 hours", "1-3 days", "4-7 days", "More than a week"],
        required: true,
      },
      {
        id: 2,
        type: "multiple",
        question: "Which of the following symptoms are you experiencing?",
        options: ["Runny nose", "Stuffy nose", "Sneezing", "Sore throat", "Cough", "Mild headache", "Low-grade fever"],
        required: true,
      },
      { id: 3, type: "scale", question: "On a scale of 1-10, how severe is your overall discomfort?", required: true },
      {
        id: 4,
        type: "single",
        question: "Do you have a fever?",
        options: ["No fever", "Low-grade fever (99-100°F)", "Moderate fever (101-102°F)", "High fever (103°F+)"],
        required: true,
      },
      {
        id: 5,
        type: "single",
        question: "Are you experiencing any chest congestion?",
        options: ["No", "Mild", "Moderate", "Severe"],
        required: true,
      },
      // ... continuing with more questions to reach 50
      {
        id: 6,
        type: "single",
        question: "How is your appetite?",
        options: ["Normal", "Slightly decreased", "Significantly decreased", "No appetite"],
        required: true,
      },
      {
        id: 7,
        type: "single",
        question: "Are you experiencing any body aches?",
        options: ["None", "Mild", "Moderate", "Severe"],
        required: true,
      },
      {
        id: 8,
        type: "single",
        question: "How is your energy level?",
        options: ["Normal", "Slightly tired", "Very tired", "Exhausted"],
        required: true,
      },
      {
        id: 9,
        type: "single",
        question: "Are you experiencing any nausea?",
        options: ["No", "Mild", "Moderate", "Severe"],
        required: true,
      },
      {
        id: 10,
        type: "single",
        question: "How is your sleep quality?",
        options: ["Normal", "Slightly disturbed", "Very disturbed", "Unable to sleep"],
        required: true,
      },
      // Adding more questions to demonstrate the 50-question system
      {
        id: 11,
        type: "single",
        question: "Do you have any difficulty breathing?",
        options: ["No difficulty", "Mild difficulty", "Moderate difficulty", "Severe difficulty"],
        required: true,
      },
      {
        id: 12,
        type: "single",
        question: "Are you experiencing any dizziness?",
        options: ["No", "Mild", "Moderate", "Severe"],
        required: true,
      },
      {
        id: 13,
        type: "single",
        question: "How is your sense of taste?",
        options: ["Normal", "Slightly altered", "Significantly altered", "Complete loss"],
        required: true,
      },
      {
        id: 14,
        type: "single",
        question: "How is your sense of smell?",
        options: ["Normal", "Slightly altered", "Significantly altered", "Complete loss"],
        required: true,
      },
      {
        id: 15,
        type: "single",
        question: "Are you experiencing any ear pain or pressure?",
        options: ["No", "Mild", "Moderate", "Severe"],
        required: true,
      },
      // Continue pattern for remaining questions...
      { id: 16, type: "text", question: "Please describe any other symptoms you're experiencing:", required: false },
      {
        id: 17,
        type: "single",
        question: "Have you been in contact with anyone who had similar symptoms?",
        options: ["No", "Yes, within last 3 days", "Yes, within last week", "Yes, more than a week ago"],
        required: true,
      },
      {
        id: 18,
        type: "single",
        question: "Are you taking any medications for these symptoms?",
        options: [
          "No medications",
          "Over-the-counter pain relievers",
          "Decongestants",
          "Cough suppressants",
          "Multiple medications",
        ],
        required: true,
      },
      {
        id: 19,
        type: "single",
        question: "Do you have any known allergies?",
        options: [
          "No known allergies",
          "Seasonal allergies",
          "Food allergies",
          "Medication allergies",
          "Multiple allergies",
        ],
        required: true,
      },
      {
        id: 20,
        type: "single",
        question: "How would you rate your overall health normally?",
        options: ["Excellent", "Good", "Fair", "Poor"],
        required: true,
      },
      // Continuing to build up to 50 questions...
      {
        id: 21,
        type: "single",
        question: "Are you experiencing any skin rashes or irritation?",
        options: ["No", "Mild rash", "Moderate rash", "Severe rash"],
        required: true,
      },
      {
        id: 22,
        type: "single",
        question: "How is your voice?",
        options: ["Normal", "Slightly hoarse", "Very hoarse", "Lost voice"],
        required: true,
      },
      {
        id: 23,
        type: "single",
        question: "Are you experiencing any eye symptoms?",
        options: ["No symptoms", "Watery eyes", "Red eyes", "Itchy eyes", "Multiple eye symptoms"],
        required: true,
      },
      {
        id: 24,
        type: "single",
        question: "How often are you coughing?",
        options: ["No cough", "Occasional", "Frequent", "Constant"],
        required: true,
      },
      {
        id: 25,
        type: "single",
        question: "Is your cough producing any phlegm?",
        options: ["No phlegm", "Clear phlegm", "Yellow/green phlegm", "Blood-tinged phlegm"],
        required: true,
      },
      // Adding final questions to reach closer to 50
      {
        id: 26,
        type: "single",
        question: "Are you experiencing any abdominal discomfort?",
        options: ["No", "Mild", "Moderate", "Severe"],
        required: true,
      },
      {
        id: 27,
        type: "single",
        question: "How is your concentration?",
        options: ["Normal", "Slightly impaired", "Moderately impaired", "Severely impaired"],
        required: true,
      },
      {
        id: 28,
        type: "single",
        question: "Are you experiencing any muscle weakness?",
        options: ["No weakness", "Mild weakness", "Moderate weakness", "Severe weakness"],
        required: true,
      },
      {
        id: 29,
        type: "single",
        question: "How is your mood?",
        options: ["Normal", "Slightly irritable", "Moderately irritable", "Very irritable"],
        required: true,
      },
      {
        id: 30,
        type: "single",
        question: "Are you experiencing any joint pain?",
        options: ["No pain", "Mild pain", "Moderate pain", "Severe pain"],
        required: true,
      },
      // Final set of questions
      {
        id: 31,
        type: "single",
        question: "How is your hydration level?",
        options: ["Well hydrated", "Slightly dehydrated", "Moderately dehydrated", "Severely dehydrated"],
        required: true,
      },
      {
        id: 32,
        type: "single",
        question: "Are you experiencing any chills?",
        options: ["No chills", "Mild chills", "Moderate chills", "Severe chills"],
        required: true,
      },
      {
        id: 33,
        type: "single",
        question: "How is your recovery progressing?",
        options: ["Getting better", "Staying the same", "Getting worse", "Unsure"],
        required: true,
      },
      {
        id: 34,
        type: "single",
        question: "Have you had similar symptoms before?",
        options: ["Never", "Rarely", "Occasionally", "Frequently"],
        required: true,
      },
      {
        id: 35,
        type: "single",
        question: "Are you concerned about your symptoms?",
        options: ["Not concerned", "Slightly concerned", "Moderately concerned", "Very concerned"],
        required: true,
      },
      // Completing the questionnaire with comprehensive health assessment
      {
        id: 36,
        type: "single",
        question: "Do you smoke or use tobacco products?",
        options: ["No", "Occasionally", "Regularly", "Heavy use"],
        required: true,
      },
      {
        id: 37,
        type: "single",
        question: "How much water are you drinking daily?",
        options: ["Less than 4 glasses", "4-6 glasses", "7-8 glasses", "More than 8 glasses"],
        required: true,
      },
      {
        id: 38,
        type: "single",
        question: "Are you getting adequate rest?",
        options: ["Yes, plenty of rest", "Some rest", "Little rest", "No rest"],
        required: true,
      },
      {
        id: 39,
        type: "single",
        question: "How is your stress level?",
        options: ["Low stress", "Moderate stress", "High stress", "Extreme stress"],
        required: true,
      },
      {
        id: 40,
        type: "single",
        question: "Are you following any treatment recommendations?",
        options: ["No treatment", "Home remedies", "Over-the-counter medications", "Prescribed medications"],
        required: true,
      },
      {
        id: 41,
        type: "single",
        question: "How long do you expect recovery to take?",
        options: ["1-2 days", "3-5 days", "1 week", "More than 1 week"],
        required: true,
      },
      {
        id: 42,
        type: "single",
        question: "Are you able to work or perform daily activities?",
        options: ["Yes, normally", "With some difficulty", "With great difficulty", "Unable to work"],
        required: true,
      },
      {
        id: 43,
        type: "single",
        question: "Have you consulted any healthcare provider?",
        options: ["No", "Planning to", "Yes, recently", "Yes, multiple times"],
        required: true,
      },
      {
        id: 44,
        type: "single",
        question: "Are you experiencing any unusual symptoms?",
        options: ["No unusual symptoms", "Some unusual symptoms", "Many unusual symptoms", "Very concerning symptoms"],
        required: true,
      },
      {
        id: 45,
        type: "single",
        question: "How would you rate your immune system normally?",
        options: ["Very strong", "Strong", "Average", "Weak"],
        required: true,
      },
      {
        id: 46,
        type: "single",
        question: "Are you taking any supplements or vitamins?",
        options: ["No supplements", "Basic vitamins", "Immune boosters", "Multiple supplements"],
        required: true,
      },
      {
        id: 47,
        type: "single",
        question: "How is your exercise routine affected?",
        options: ["No change", "Slightly reduced", "Significantly reduced", "Completely stopped"],
        required: true,
      },
      {
        id: 48,
        type: "single",
        question: "Are you following any dietary changes?",
        options: ["No changes", "Eating lighter", "Specific diet", "Unable to eat normally"],
        required: true,
      },
      {
        id: 49,
        type: "single",
        question: "How confident are you in your self-assessment?",
        options: ["Very confident", "Somewhat confident", "Not very confident", "Not confident at all"],
        required: true,
      },
      {
        id: 50,
        type: "text",
        question: "Is there anything else you'd like to add about your condition?",
        required: false,
      },
    ],
    // Add more conditions with their respective 50 questions
    "seasonal-allergies": [
      {
        id: 1,
        type: "single",
        question: "When did your symptoms start?",
        options: ["Today", "Yesterday", "This week", "Longer than a week"],
        required: true,
      },
      {
        id: 2,
        type: "multiple",
        question: "Which allergy symptoms are you experiencing?",
        options: ["Sneezing", "Runny nose", "Itchy eyes", "Watery eyes", "Nasal congestion", "Scratchy throat"],
        required: true,
      },
      // ... continue with 48 more allergy-specific questions
      { id: 50, type: "text", question: "Any additional information about your allergies?", required: false },
    ],
    // Add more conditions as needed
  }

  const questions = questionnaireData[condition] || []
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
    // In real app, this would submit to API and redirect to results
    router.push(`/results/${condition}?answers=${encodeURIComponent(JSON.stringify(answers))}`)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Questionnaire Not Found</h2>
            <p className="text-muted-foreground mb-4">The questionnaire for "{condition}" is not available yet.</p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Questionnaire Complete!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for completing the {condition.replace("-", " ")} assessment. We're analyzing your responses to
              provide personalized recommendations.
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
            <h1 className="text-2xl font-bold text-foreground capitalize">{condition.replace("-", " ")} Assessment</h1>
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
                  <span>1 (Mild)</span>
                  <span>10 (Severe)</span>
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
                This assessment is for informational purposes only and should not replace professional medical advice.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
