"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Network, Info, CheckCircle, XCircle, Lightbulb } from "lucide-react"
import { useLeaderboard } from "./leaderboard-context"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { allMatchPairs } from "./concept-data"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ConceptMatchingGameProps {
  onBack: () => void
  playerName: string
}

interface MatchItem {
  id: number
  term: string
  concept: string
  category: string
  difficulty: "سهل" | "متوسط" | "صعب"
  description: string
  termId: string
  conceptId: string
  matched: boolean
  selected: boolean
  isHinted?: boolean
}

export default function ConceptMatchingGame({ onBack, playerName }: ConceptMatchingGameProps) {
  const [items, setItems] = useState<MatchItem[]>([])
  const [difficulty, setDifficulty] = useState<"سهل" | "متوسط" | "صعب">("سهل")
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [hints, setHints] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { addScore } = useLeaderboard()

  useEffect(() => {
    initializeGame()
  }, [difficulty])
  
  useEffect(() => {
    // Check if game is complete
    if (items.length > 0 && items.every(item => item.matched)) {
      setGameComplete(true)
      handleSaveScore()
    }
  }, [items])

  const initializeGame = () => {
    // استخدام الوقت الحالي كبذرة عشوائية لضمان تغير الترتيب في كل مرة
    const timestamp = Date.now().toString()
    
    // تصفية الأزواج حسب المستوى
    const filteredPairs = allMatchPairs
      .filter((pair) => {
        if (difficulty === "سهل") return pair.difficulty === "سهل"
        if (difficulty === "متوسط") return pair.difficulty === "سهل" || pair.difficulty === "متوسط"
        return true
      })
    
    // استخدام خوارزمية فيشر-ييتس للخلط (Fisher-Yates shuffle)
    const shuffleArray = (array: typeof allMatchPairs) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        // خلط أكثر عشوائية باستخدام timestamp كجزء من البذرة
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }
    
    // خلط الأزواج ثم اختيار العدد المناسب حسب المستوى
    const shuffledPairs = shuffleArray(filteredPairs)
      .slice(0, difficulty === "سهل" ? 6 : difficulty === "متوسط" ? 8 : 10)

    // إنشاء عناصر المطابقة
    const newItems = shuffledPairs.map((pair) => ({
      ...pair,
      termId: `term-${pair.id}-${timestamp.substring(0, 5)}`, // إضافة جزء من الطابع الزمني للمعرف
      conceptId: `concept-${pair.id}-${timestamp.substring(5, 10)}`,
      matched: false,
      selected: false,
    }))

    setItems(newItems)
    setMaxScore(newItems.length)
    setScore(0)
    setAttempts(0)
    setHints(3)
    setGameComplete(false)
    setStartTime(new Date())
  }

  const handleSaveScore = () => {
    if (startTime) {
      const endTime = new Date()
      const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      const difficultyMultiplier = difficulty === "صعب" ? 3 : difficulty === "متوسط" ? 2 : 1
      const percentage = Math.min(100, Math.round((score / maxScore) * 100))

      addScore({
        playerName,
        game: "matching",
        score,
        maxScore,
        percentage,
        details: {
          difficulty,
          timeBonus: timeTaken,
          attempts,
          hintsUsed: 3 - hints,
        },
      })
    }
  }

  const handleItemClick = (itemId: string) => {
    // If item already matched, do nothing
    const isMatched = items.some(item => 
      (item.termId === itemId || item.conceptId === itemId) && item.matched
    )
    
    if (isMatched) return
    
    if (!selectedItem) {
      // First selection
      setSelectedItem(itemId)
      
      // Update selected status
      setItems(prev => prev.map(item => 
        item.termId === itemId || item.conceptId === itemId
          ? { ...item, selected: true }
          : item
      ))
    } else {
      // Second selection
      const firstItem = items.find(
        item => item.termId === selectedItem || item.conceptId === selectedItem
      )
      
      const secondItem = items.find(
        item => item.termId === itemId || item.conceptId === itemId
      )
      
      if (!firstItem || !secondItem) {
        setSelectedItem(null)
        return
      }
      
      // Increment attempts counter
      setAttempts(prev => prev + 1)
      
      // Check if it's a match (same id)
      const isMatch = firstItem.id === secondItem.id
      
      if (isMatch) {
        // It's a match!
        setScore(prev => prev + 1)
        setItems(prev => prev.map(item => 
          item.id === firstItem.id
            ? { ...item, matched: true, selected: false }
            : { ...item, selected: false }
        ))
        
        // Show positive feedback
        setFeedbackMessage(`أحسنت! لقد ربطت "${firstItem.term}" بـ "${firstItem.concept}" بشكل صحيح.`)
        setShowFeedback(true)
        setTimeout(() => setShowFeedback(false), 3000)
      } else {
        // Not a match
        setItems(prev => prev.map(item => ({ ...item, selected: false })))
        
        // Show negative feedback
        setFeedbackMessage("حاول مرة أخرى. هذا الربط غير صحيح.")
        setShowFeedback(true)
        setTimeout(() => setShowFeedback(false), 3000)
      }
      
      // Reset selection
      setSelectedItem(null)
    }
  }
  
  const useHint = () => {
    if (hints > 0) {
      // Find an unmatched pair
      const unmatchedItems = items.filter(item => !item.matched)
      if (unmatchedItems.length > 0) {
        // Pick a random unmatched item
        const randomItem = unmatchedItems[Math.floor(Math.random() * unmatchedItems.length)]
        
        // Highlight both the term and concept
        setItems(prev => prev.map(item => 
          item.id === randomItem.id
            ? { ...item, isHinted: true }
            : item
        ))
        
        // Show hint message
        setFeedbackMessage(`تلميح: حاول الربط بين "${randomItem.term}" و "${randomItem.concept}"`)
        setShowFeedback(true)
        setTimeout(() => {
          setShowFeedback(false)
          // Remove highlight after feedback disappears
          setItems(prev => prev.map(item => 
            item.id === randomItem.id
              ? { ...item, isHinted: false }
              : item
          ))
        }, 5000)
        
        setHints(hints - 1)
      }
    } else {
      setFeedbackMessage("لقد استنفدت جميع التلميحات المتاحة!")
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 3000)
    }
  }

  const resetGame = () => {
    initializeGame()
  }

  const getDifficultyColor = (itemDifficulty: "سهل" | "متوسط" | "صعب") => {
    switch (itemDifficulty) {
      case "سهل":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "متوسط":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "صعب":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return ""
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "تطوير الويب":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "البرمجة":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "قواعد البيانات":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "الشبكات":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "البنية التحتية":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "الأمان":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30"
      case "التخزين":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "التكامل":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
      case "أدوات التطوير":
        return "bg-teal-500/20 text-teal-400 border-teal-500/30"
      case "الذكاء الاصطناعي":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      case "علم البيانات":
        return "bg-lime-500/20 text-lime-400 border-lime-500/30"
      case "التشغيل":
        return "bg-sky-500/20 text-sky-400 border-sky-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (gameComplete) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 relative overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Button onClick={onBack} variant="ghost" className="mb-4 text-white hover:text-green-300">
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للقائمة
          </Button>

          <Card className="text-center backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <Network className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-2">أحسنت!</CardTitle>
              <div className="text-lg text-green-300 mb-4">
                لقد أكملت تحدي شبكة المفاهيم التقنية بنجاح
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-white">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-sm text-gray-300">النتيجة</div>
                  <div className="text-2xl font-bold">
                    {score} / {maxScore}
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-sm text-gray-300">المستوى</div>
                  <div className="text-2xl font-bold">{difficulty}</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-sm text-gray-300">المحاولات</div>
                  <div className="text-2xl font-bold">{attempts}</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-sm text-gray-300">التلميحات المستخدمة</div>
                  <div className="text-2xl font-bold">{3 - hints}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={resetGame}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium"
                >
                  تحدي آخر
                </Button>
                <Button
                  onClick={onBack}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
                >
                  العودة للقائمة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="p-4 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={onBack} variant="ghost" className="text-white hover:text-green-300">
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للقائمة
          </Button>

          <Dialog open={showHelp} onOpenChange={setShowHelp}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Info className="w-4 h-4 ml-2" />
                تعليمات اللعبة
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-green-500/30 text-white" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-lg text-green-400">كيفية اللعب</DialogTitle>
                <DialogDescription className="text-gray-300 pt-4">
                  كيفية ربط المصطلحات التقنية باستخداماتها:
                </DialogDescription>
                <div className="mt-4">
                  <ul className="space-y-2 list-disc pr-4 text-gray-300">
                    <li>انقر على مصطلح تقني من العمود الأيمن.</li>
                    <li>ثم انقر على الاستخدام المناسب له من العمود الأيسر.</li>
                    <li>عند الربط الصحيح، سيتم تمييز الزوج المتطابق بلون أخضر.</li>
                    <li>حاول ربط جميع المفاهيم التقنية باستخداماتها الصحيحة.</li>
                    <li>يمكنك استخدام التلميحات لمساعدتك (لديك 3 تلميحات فقط).</li>
                  </ul>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Network className="w-8 h-8 text-green-400" />
              <CardTitle className="text-2xl text-white">شبكة المفاهيم التقنية</CardTitle>
            </div>
            <div className="text-center text-gray-300 mb-6">
              قم بربط كل مصطلح تقني بالاستخدام الصحيح له من خلال النقر على العناصر المتطابقة
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={() => setDifficulty("سهل")}
                variant={difficulty === "سهل" ? "default" : "outline"}
                className={
                  difficulty === "سهل" 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-700/30 transform hover:scale-105 transition-all duration-300" 
                    : "border-green-500/30 text-white bg-white/5 backdrop-blur-sm hover:bg-green-500/10 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300"
                }
              >
                <div className="flex items-center gap-2">
                  {difficulty === "سهل" && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                  سهل
                </div>
              </Button>
              <Button
                onClick={() => setDifficulty("متوسط")}
                variant={difficulty === "متوسط" ? "default" : "outline"}
                className={
                  difficulty === "متوسط" 
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-700/30 transform hover:scale-105 transition-all duration-300" 
                    : "border-yellow-500/30 text-white bg-white/5 backdrop-blur-sm hover:bg-yellow-500/10 hover:border-yellow-400/50 transform hover:scale-105 transition-all duration-300"
                }
              >
                <div className="flex items-center gap-2">
                  {difficulty === "متوسط" && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                  متوسط
                </div>
              </Button>
              <Button
                onClick={() => setDifficulty("صعب")}
                variant={difficulty === "صعب" ? "default" : "outline"}
                className={
                  difficulty === "صعب" 
                    ? "bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold shadow-lg shadow-red-700/30 transform hover:scale-105 transition-all duration-300" 
                    : "border-red-500/30 text-white bg-white/5 backdrop-blur-sm hover:bg-red-500/10 hover:border-red-400/50 transform hover:scale-105 transition-all duration-300"
                }
              >
                <div className="flex items-center gap-2">
                  {difficulty === "صعب" && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                  صعب
                </div>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress indicator */}
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-high-contrast">
                    شبكة مطابقة المفاهيم التقنية
                  </h2>
                  <div className="flex items-center gap-2">
                   
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowHelp(true)}
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-full w-9 h-9 transition-all duration-300 hover:shadow-md hover:shadow-cyan-800/30"
                    >
                      <Info className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onBack}
                      className="text-high-contrast hover:text-white hover:bg-white/10 rounded-full w-9 h-9 transition-all duration-300 hover:shadow-md hover:shadow-white/20"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-300">
                التقدم: <span className="font-bold text-white">{score}</span> من{" "}
                <span className="font-bold text-white">{maxScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={hints === 0}
                  onClick={useHint}
                  className={`
                    ${hints > 0 ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20' : 'bg-gray-800/30'} 
                    border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30 
                    transform hover:scale-105 transition-all duration-300 
                    shadow-md hover:shadow-yellow-600/20 font-medium px-4 py-2 rounded-md
                    ${hints === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className={`w-4 h-4 ${hints > 0 ? 'text-yellow-300 animate-pulse' : 'text-gray-400'}`} />
                    <span>{hints} تلميحات</span>
                  </div>
                </Button>
                
                <Button 
                  onClick={resetGame} 
                  variant="outline" 
                  size="sm" 
                  className="
                    bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                    border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 
                    transform hover:scale-105 transition-all duration-300 
                    shadow-md hover:shadow-cyan-600/20 font-medium px-4 py-2 rounded-md
                  "
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    <span>إعادة اللعبة</span>
                  </div>
                </Button>
              </div>
            </div>
            
            <Progress value={(score / maxScore) * 100} className="h-2 mb-6" />
            
            {/* Feedback message */}
            {showFeedback && (
              <div className={`p-2 rounded-md mb-4 text-center ${feedbackMessage.includes("أحسنت") ? "bg-green-500/20 text-green-300" : "bg-amber-500/20 text-amber-300"}`}>
                {feedbackMessage.includes("أحسنت") ? <CheckCircle className="inline-block w-4 h-4 ml-1" /> : <XCircle className="inline-block w-4 h-4 ml-1" />}
                {feedbackMessage}
              </div>
            )}
            
            {/* Matching game grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4" ref={containerRef}>
              {/* Terms Column */}
              <div className="space-y-4">
                <h3 className="text-center text-white text-lg font-medium mb-4">المصطلحات التقنية</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.termId}
                      onClick={() => handleItemClick(item.termId)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                        item.matched 
                          ? "bg-green-500/20 border-green-500/50 text-green-300" 
                          : item.selected && selectedItem === item.termId
                          ? "bg-blue-500/30 border-blue-500/50 text-blue-300" 
                          : item.isHinted
                          ? "bg-yellow-500/30 border-yellow-500/50 text-yellow-300 animate-pulse"
                          : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.term}</span>
                        <Badge variant="outline" className={`${getCategoryColor(item.category)} text-xs`}>
                          {item.category}
                        </Badge>
                      </div>
                      {item.matched && (
                        <div className="text-xs mt-2 text-green-300/70">{item.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Concepts Column */}
              <div className="space-y-4">
                <h3 className="text-center text-white text-lg font-medium mb-4">المفاهيم والاستخدامات</h3>
                <div className="space-y-2">
                  {/* Shuffle concepts for display */}
                  {[...items]
                    .sort(() => Math.random() - 0.5)
                    .map((item) => (
                      <div
                        key={item.conceptId}
                        onClick={() => handleItemClick(item.conceptId)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                          item.matched 
                            ? "bg-green-500/20 border-green-500/50 text-green-300" 
                            : item.selected && selectedItem === item.conceptId
                            ? "bg-blue-500/30 border-blue-500/50 text-blue-300" 
                            : item.isHinted
                            ? "bg-yellow-500/30 border-yellow-500/50 text-yellow-300 animate-pulse"
                            : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{item.concept}</span>
                          <Badge variant="outline" className={`${getDifficultyColor(item.difficulty)} text-xs`}>
                            {item.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
