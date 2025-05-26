"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLeaderboard } from "./leaderboard-context"
import { ArrowRight, Layout, Palette, Type, Image, Box, Layers, Check, X, Info, Copy, Trash2, Github } from "lucide-react"
import React from "react"

interface UIElement {
  id: string
  type: "header" | "text" | "image" | "button" | "input" | "card" | "navbar" | "footer" | "sidebar"
  label: string
  icon: React.ReactNode
  content: string
  style: {
    color?: string
    backgroundColor?: string
    fontSize?: string
    padding?: string
    margin?: string
    borderRadius?: string
    width?: string
    height?: string
    display?: string
    flexDirection?: 'row' | 'column' | undefined
    justifyContent?: string
    alignItems?: string
    textAlign?: 'left' | 'center' | 'right' | undefined
  }
}

interface UIDesignGameProps {
  onBack: () => void
  playerName: string
}

export default function UIDesignGame({ onBack, playerName }: UIDesignGameProps) {
  const { addScore } = useLeaderboard()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [gameComplete, setGameComplete] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [draggedElement, setDraggedElement] = useState<UIElement | null>(null)
  const [placedElements, setPlacedElements] = useState<UIElement[]>([])
  const [showTutorial, setShowTutorial] = useState(true)
  const [selectedElement, setSelectedElement] = useState<UIElement | null>(null)
  const [availableElements, setAvailableElements] = useState<UIElement[]>([
    {
      id: "header1",
      type: "header",
      label: "عنوان رئيسي",
      icon: <Type className="w-4 h-4" />,
      content: "مرحباً بك في موقعنا",
      style: {
        fontSize: "2rem",
        color: "#ffffff"
      }
    },
    {
      id: "text1",
      type: "text",
      label: "نص وصفي",
      icon: <Type className="w-4 h-4" />,
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة",
      style: {
        fontSize: "1rem",
        color: "#e2e8f0"
      }
    },
    {
      id: "button1",
      type: "button",
      label: "زر",
      icon: <Box className="w-4 h-4" />,
      content: "انقر هنا",
      style: {
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem"
      }
    },
    {
      id: "input1",
      type: "input",
      label: "حقل إدخال",
      icon: <Box className="w-4 h-4" />,
      content: "أدخل نصاً هنا...",
      style: {
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: "0.5rem",
        borderRadius: "0.375rem"
      }
    },
    {
      id: "card1",
      type: "card",
      label: "بطاقة",
      icon: <Layers className="w-4 h-4" />,
      content: "محتوى البطاقة",
      style: {
        backgroundColor: "#1e293b",
        padding: "1rem",
        borderRadius: "0.5rem"
      }
    },
    {
      id: "navbar1",
      type: "navbar",
      label: "شريط التنقل",
      icon: <Layout className="w-4 h-4" />,
      content: "الرئيسية | الخدمات | عنا | اتصل بنا",
      style: {
        backgroundColor: "#1e293b",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
    {
      id: "footer1",
      type: "footer",
      label: "تذييل الصفحة",
      icon: <Layout className="w-4 h-4" />,
      content: "© 2024 جميع الحقوق محفوظة",
      style: {
        backgroundColor: "#1e293b",
        padding: "1rem",
        textAlign: "center"
      }
    },
    {
      id: "sidebar1",
      type: "sidebar",
      label: "القائمة الجانبية",
      icon: <Layout className="w-4 h-4" />,
      content: "القائمة 1\nالقائمة 2\nالقائمة 3",
      style: {
        backgroundColor: "#1e293b",
        padding: "1rem",
        width: "200px",
        height: "100%"
      }
    }
  ])

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameComplete) {
      endGame()
    }
  }, [timeLeft, gameComplete])

  const handleDragStart = (element: UIElement) => {
    setDraggedElement(element)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedElement) {
      const newElement = { ...draggedElement, id: `${draggedElement.type}-${Date.now()}` }
      setPlacedElements([...placedElements, newElement])
      setAvailableElements(availableElements.filter(el => el.id !== draggedElement.id))
      setDraggedElement(null)
      setScore(prev => prev + 10) // 10 points for each placed element
    }
  }

  const handleElementStyleChange = (id: string, style: Partial<UIElement["style"]>) => {
    setPlacedElements(prev =>
      prev.map(el =>
        el.id === id ? { ...el, style: { ...el.style, ...style } } : el
      )
    )
    setScore(prev => prev + 5) // 5 points for each style change
  }

  const handleElementSelect = (element: UIElement) => {
    setSelectedElement(element)
  }

  const handleElementDelete = (id: string) => {
    setPlacedElements(prev => prev.filter(el => el.id !== id))
    setSelectedElement(null)
  }

  const handleElementDuplicate = (element: UIElement) => {
    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`
    }
    setPlacedElements(prev => [...prev, newElement])
    setScore(prev => prev + 10)
  }

  const startGame = () => {
    setScore(0)
    setGameComplete(false)
    setTimeLeft(300)
    setStartTime(new Date())
    setPlacedElements([])
    setAvailableElements([
      {
        id: "header1",
        type: "header",
        label: "عنوان رئيسي",
        icon: <Type className="w-4 h-4" />,
        content: "مرحباً بك في موقعنا",
        style: {
          fontSize: "2rem",
          color: "#ffffff"
        }
      },
      {
        id: "text1",
        type: "text",
        label: "نص وصفي",
        icon: <Type className="w-4 h-4" />,
        content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة",
        style: {
          fontSize: "1rem",
          color: "#e2e8f0"
        }
      },
      {
        id: "button1",
        type: "button",
        label: "زر",
        icon: <Box className="w-4 h-4" />,
        content: "انقر هنا",
        style: {
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem"
        }
      },
      {
        id: "input1",
        type: "input",
        label: "حقل إدخال",
        icon: <Box className="w-4 h-4" />,
        content: "أدخل نصاً هنا...",
        style: {
          backgroundColor: "#1e293b",
          color: "#ffffff",
          padding: "0.5rem",
          borderRadius: "0.375rem"
        }
      },
      {
        id: "card1",
        type: "card",
        label: "بطاقة",
        icon: <Layers className="w-4 h-4" />,
        content: "محتوى البطاقة",
        style: {
          backgroundColor: "#1e293b",
          padding: "1rem",
          borderRadius: "0.5rem"
        }
      },
      {
        id: "navbar1",
        type: "navbar",
        label: "شريط التنقل",
        icon: <Layout className="w-4 h-4" />,
        content: "الرئيسية | الخدمات | عنا | اتصل بنا",
        style: {
          backgroundColor: "#1e293b",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      },
      {
        id: "footer1",
        type: "footer",
        label: "تذييل الصفحة",
        icon: <Layout className="w-4 h-4" />,
        content: "© 2024 جميع الحقوق محفوظة",
        style: {
          backgroundColor: "#1e293b",
          padding: "1rem",
          textAlign: "center"
        }
      },
      {
        id: "sidebar1",
        type: "sidebar",
        label: "القائمة الجانبية",
        icon: <Layout className="w-4 h-4" />,
        content: "القائمة 1\nالقائمة 2\nالقائمة 3",
        style: {
          backgroundColor: "#1e293b",
          padding: "1rem",
          width: "200px",
          height: "100%"
        }
      }
    ])
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
        maxScore: 1000,
        percentage: Math.min(100, Math.round((finalScore / 1000) * 100)),
        details: {
          elementsPlaced: placedElements.length,
          styleChanges: score - (placedElements.length * 10),
          timeBonus
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للقائمة
              </Button>
              <CardTitle className="text-2xl text-center text-white">لعبة تصميم واجهات المستخدم</CardTitle>
              <Button onClick={() => setShowTutorial(true)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Info className="w-4 h-4 ml-2" />
                المساعدة
              </Button>
            </div>
            {!gameComplete && (
              <div className="flex justify-between items-center text-white mt-4">
                <div>النقاط: {score}</div>
                <div>الوقت المتبقي: {timeLeft} ثانية</div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {showTutorial ? (
              <div className="text-center space-y-4 p-6">
                <h3 className="text-xl text-white">مرحباً بك في لعبة تصميم واجهات المستخدم!</h3>
                <div className="text-white/70 space-y-2 text-right">
                  <p>• اسحب العناصر من القائمة اليمنى إلى منطقة التصميم</p>
                  <p>• اضغط على أي عنصر لتخصيص خصائصه</p>
                  <p>• استخدم أزرار التنسيق لتغيير مظهر العناصر</p>
                  <p>• احصل على نقاط إضافية عند إضافة عناصر جديدة وتخصيصها</p>
                  <p>• حاول إنشاء تصميم جميل ومتناسق!</p>
                </div>
                <Button onClick={() => setShowTutorial(false)} className="bg-purple-600 hover:bg-purple-700">
                  ابدأ التصميم
                </Button>
              </div>
            ) : gameComplete ? (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available Elements */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">العناصر المتاحة</h3>
                  <div className="space-y-2">
                    {availableElements.map(element => (
                      <div
                        key={element.id}
                        draggable
                        onDragStart={() => handleDragStart(element)}
                        className="p-3 bg-white/5 border border-white/20 rounded-lg cursor-move hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-white">
                          {element.icon}
                          <span>{element.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design Canvas */}
                <div
                  className="md:col-span-2 min-h-[500px] bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <h3 className="text-white font-medium mb-4">منطقة التصميم</h3>
                  <div className="space-y-4">
                    {placedElements.map(element => (
                      <div
                        key={element.id}
                        className={`p-4 bg-white/10 rounded-lg cursor-pointer transition-all ${
                          selectedElement?.id === element.id ? 'ring-2 ring-purple-500' : ''
                        }`}
                        style={element.style}
                        onClick={() => handleElementSelect(element)}
                      >
                        {element.content}
                        {selectedElement?.id === element.id && (
                          <div className="mt-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementStyleChange(element.id, { fontSize: "1.5rem" })}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Type className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementStyleChange(element.id, { color: "#ffffff" })}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Palette className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementStyleChange(element.id, { backgroundColor: "#1e293b" })}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Layout className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementStyleChange(element.id, { width: "200px" })}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Box className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementStyleChange(element.id, { height: "100px" })}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Box className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementStyleChange(element.id, { borderRadius: "0.5rem" })}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Box className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementDuplicate(element)}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleElementDelete(element.id)}
                              className="border-white/20 text-white hover:bg-white/10 shadow-md"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Developer Credits Footer */}
        <div className="mt-4 text-center text-white/50 text-sm">
          <p>تم تطوير هذا التطبيق بواسطة</p>
          <a 
            href="https://github.com/CODE-NAME-IN-B" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            CODE-NAME-IN-B
          </a>
          <p className="mt-1">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  )
} 