"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLeaderboard } from "./leaderboard-context"

interface Item {
  id: number
  text: string
  category: string
}

interface DragDropDemoProps {
  onBack: () => void
  playerName: string
}

export default function DragDropDemo({ onBack, playerName }: DragDropDemoProps) {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: "HTML", category: "available" },
    { id: 2, text: "CSS", category: "available" },
    { id: 3, text: "JavaScript", category: "available" },
    { id: 4, text: "React", category: "available" },
    { id: 5, text: "Node.js", category: "available" },
  ])

  const [draggedItem, setDraggedItem] = useState<Item | null>(null)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds game time
  const [startTime, setStartTime] = useState<Date | null>(null)

  const { addScore } = useLeaderboard()

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameComplete) {
      endGame()
    }
  }, [timeLeft, gameComplete])

  const handleDragStart = (item: Item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetCategory: string) => {
    e.preventDefault()
    if (draggedItem) {
      setItems(items.map(item => 
        item.id === draggedItem.id 
          ? { ...item, category: targetCategory }
          : item
      ))
      
      // Add points for successful drag and drop
      setScore(prev => prev + 10)
      
      // Check if all items are in the selected category
      const updatedItems = items.map(item => 
        item.id === draggedItem.id 
          ? { ...item, category: targetCategory }
          : item
      )
      
      if (updatedItems.every(item => item.category === "selected")) {
        setGameComplete(true)
        endGame()
      }
    }
    setDraggedItem(null)
  }

  const getItemsByCategory = (category: string) => {
    return items.filter(item => item.category === category)
  }

  const startGame = () => {
    setItems(items.map(item => ({ ...item, category: "available" })))
    setScore(0)
    setGameComplete(false)
    setTimeLeft(60)
    setStartTime(new Date())
  }

  const endGame = () => {
    setGameComplete(true)
    if (startTime) {
      const timeBonus = Math.max(0, timeLeft * 2) // 2 points per second remaining
      const finalScore = score + timeBonus
      
      addScore({
        playerName,
        game: "ui-design",
        score: finalScore,
        maxScore: 100,
        percentage: Math.min(100, Math.round((finalScore / 100) * 100)),
        details: {
          timeBonus,
          accuracy: Math.round((score / 50) * 100),
          attempts: items.length,
          difficulty: "متوسط"
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">تجربة السحب والإفلات</CardTitle>
            {!gameComplete && (
              <div className="flex justify-between items-center text-white">
                <div>النقاط: {score}</div>
                <div>الوقت المتبقي: {timeLeft} ثانية</div>
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
              <>
                <div className="grid grid-cols-2 gap-4">
                  {/* العناصر المتاحة */}
                  <div
                    className="p-4 rounded-lg bg-white/5 border border-white/10 min-h-[200px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "available")}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">العناصر المتاحة</h3>
                    <div className="space-y-2">
                      {getItemsByCategory("available").map(item => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item)}
                          className="p-2 bg-white/10 rounded cursor-move text-white hover:bg-white/20 transition-colors"
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* العناصر المختارة */}
                  <div
                    className="p-4 rounded-lg bg-white/5 border border-white/10 min-h-[200px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "selected")}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">العناصر المختارة</h3>
                    <div className="space-y-2">
                      {getItemsByCategory("selected").map(item => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item)}
                          className="p-2 bg-white/10 rounded cursor-move text-white hover:bg-white/20 transition-colors"
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-white/70 mb-4">
                    اسحب العناصر من القائمة اليمنى إلى القائمة اليسرى
                    <br />
                    احصل على نقاط إضافية عن كل عنصر تنقله بنجاح
                  </p>
                  <Button
                    onClick={startGame}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    إعادة تعيين
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 