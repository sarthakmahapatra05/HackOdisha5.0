"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ChevronLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"

interface Question {
  id: number
  text: string
  answer: string
}

interface QuestionnaireProps {
  params: {
    condition: string
  }
}

export default function QuestionnairePage({ params }: QuestionnaireProps) {
  const { condition } = params
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()
  const router = useRouter()

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      setError(null)
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        const prompt = `You are a medical assistant. Generate a list of 10 relevant yes/no questions to diagnose the condition: "${condition.replace(/-/g, " ")}". Provide the questions as a numbered list.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = await response.text()

        const parsedQuestions = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line, index) => {
            // Remove numbering if present
            const questionText = line.replace(/^\d+\.?\s*/, "")
            return { id: index + 1, text: questionText, answer: "" }
          })

        setQuestions(parsedQuestions)
      } catch (err) {
        setError("Failed to load questions. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [condition])

  const handleAnswerChange = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answer: value } : q))
    )
  }

  const handleSubmit = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        alert("You must be logged in to submit the questionnaire.")
        return
      }

      // Save questionnaire responses to database
      const { error } = await supabase.from("questionnaire_responses").insert({
        user_id: user.id,
        condition: condition.replace(/-/g, " "),
        responses: questions.map(q => ({
          question: q.text,
          answer: q.answer
        })),
        submitted_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      alert("Thank you for completing the questionnaire! Your responses have been saved.")
      router.push("/")
    } catch (error: any) {
      alert("Failed to submit questionnaire: " + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-2"
      >
        <ChevronLeft className="h-5 w-5" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-4 capitalize">{condition.replace(/-/g, " ")}</h1>

      {loading && <p>Loading questions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-6 max-w-3xl"
        >
          {questions.map((q) => (
            <Card key={q.id} className="bg-card border-border">
              <CardHeader>
                <h2 className="text-lg font-semibold">{q.id}. {q.text}</h2>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`answer-${q.id}`}
                      value="Yes"
                      checked={q.answer === "Yes"}
                      onChange={() => handleAnswerChange(q.id, "Yes")}
                      required
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`answer-${q.id}`}
                      value="No"
                      checked={q.answer === "No"}
                      onChange={() => handleAnswerChange(q.id, "No")}
                      required
                    />
                    No
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Answers
          </Button>
        </form>
      )}
    </div>
  )
}
