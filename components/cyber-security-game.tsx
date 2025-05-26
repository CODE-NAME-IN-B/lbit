"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cyberSecurityQuestions } from "@/data/questions-repository"
import { useLeaderboard } from "./leaderboard-context"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: string
  explanation: string
  usedIn?: string[]
}

interface CyberSecurityGameProps {
  onBack: () => void
  playerName: string
}

export default function CyberSecurityGame({ onBack, playerName }: CyberSecurityGameProps) {
  const [questions, setQuestions] = useState(cyberSecurityQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds per question
  const [startTime, setStartTime] = useState<Date | null>(null)

  const { addScore } = useLeaderboard()

  useEffect(() => {
    // Shuffle questions on component mount
    const shuffledQuestions = [...cyberSecurityQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameComplete) {
      handleNextQuestion()
    }
  }, [timeLeft, gameComplete])

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.options[currentQuestion.correct]
    
    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 2) // 2 points per second remaining
      setScore(prev => prev + 10 + timeBonus)
      handleNextQuestion()
    } else {
      endGame()
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setTimeLeft(60)
    } else {
      endGame()
    }
  }

  const startGame = () => {
    const shuffledQuestions = [...cyberSecurityQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setGameComplete(false)
    setTimeLeft(60)
    setStartTime(new Date())
  }

  const endGame = () => {
    setGameComplete(true)
    if (startTime) {
    addScore({
      playerName,
      game: "cyber-security",
      score,
        maxScore: questions.length * 10,
        percentage: Math.min(100, Math.round((score / (questions.length * 10)) * 100)),
        details: {
          questionsAnswered: currentQuestionIndex + 1,
          totalQuestions: questions.length,
          accuracy: Math.round((score / ((currentQuestionIndex + 1) * 10)) * 100),
          difficulty: "متوسط"
        }
      })
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                العودة للقائمة
              </Button>
              <CardTitle className="text-2xl text-center text-white">لعبة الأمن السيبراني</CardTitle>
              <div className="w-24"></div> {/* Spacer for alignment */}
            </div>
            {!gameComplete && (
              <div className="flex justify-between items-center text-white mt-4">
                <div>النقاط: {score}</div>
                <div>الوقت المتبقي: {timeLeft} ثانية</div>
                <div>السؤال {currentQuestionIndex + 1} من {questions.length}</div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {gameComplete ? (
              <div className="text-center space-y-4">
                <h3 className="text-xl text-white">انتهت اللعبة!</h3>
                <p className="text-white/70">النقاط النهائية: {score}</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
                    العب مرة أخرى
                  </Button>
                  <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    العودة للقائمة
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-xl text-white text-center">
                  {currentQuestion.question}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, index) => (
                              <Button
                                key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full bg-white/10 hover:bg-white/20 text-white text-lg py-6"
                    >
                      {option}
                              </Button>
                            ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
