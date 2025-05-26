"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Trophy, User, GraduationCap, Cpu, Network, Github, LogOut, Shield, Layout } from "lucide-react"
import QuizGame from "@/components/quiz-game"
import ConceptMatchingGame from "@/components/concept-matching-game"
import FlappyTechGame from "@/components/flappy-tech-game"
import Leaderboard from "@/components/leaderboard"
import { LeaderboardProvider } from "@/components/leaderboard-context"
import CyberSecurityGame from "@/components/cyber-security-game"
import UIDesignGame from "@/components/ui-design-game"
import PlayerNameModal from "@/components/player-name-modal"

type GameType = "register" | "menu" | "quiz" | "matching" | "flappy" | "cyber-security" | "ui-design" | "leaderboard"

function TechEducationGames() {
  const [currentGame, setCurrentGame] = useState<GameType>("register")
  const [playerName, setPlayerName] = useState("")
  const [registeredName, setRegisteredName] = useState("")

  // Load saved name on mount
  useEffect(() => {
    const savedName = localStorage.getItem("techGamePlayerName")
    if (savedName) {
      setRegisteredName(savedName)
      setCurrentGame("menu")
    }
  }, [])

  const handleNameSubmit = (name: string) => {
    if (name.trim()) {
      setRegisteredName(name.trim())
      localStorage.setItem("techGamePlayerName", name.trim())
      setCurrentGame("menu")
    }
  }

  const handleNameChange = () => {
    setCurrentGame("register")
    setPlayerName(registeredName)
  }

  const handleLogout = () => {
    // حذف اسم اللاعب من التخزين المحلي
    localStorage.removeItem("techGamePlayerName")
    // إعادة تعيين حالة التطبيق
    setRegisteredName("")
    setPlayerName("")
    setCurrentGame("register")
  }

  const renderGame = () => {
    switch (currentGame) {
      case "register":
        return <PlayerNameModal
          isOpen={true}
          onSubmit={handleNameSubmit}
          title="مرحباً بك في منصة الألعاب التعليمية"
          description="أدخل اسمك للبدء في رحلة التعلم التفاعلي"
        />
      case "menu":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">منصة الألعاب التعليمية</h1>
                <p className="text-gray-300">تعلم تقنية المعلومات بطريقة تفاعلية وممتعة</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quiz Game Card */}
                <Card
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-sm border-blue-500/30 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/25"
                  onClick={() => setCurrentGame("quiz")}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Brain className="w-12 h-12 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                      تحدي الاختبار التقني
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      اختبر معرفتك في مجال تقنية المعلومات من خلال أسئلة متنوعة ومتدرجة في الصعوبة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      ابدأ التحدي
                    </Button>
                  </CardContent>
                </Card>

                {/* Matching Game Card */}
                <Card
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-sm border-green-500/30 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/25"
                  onClick={() => setCurrentGame("matching")}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Network className="w-12 h-12 text-green-400 group-hover:text-green-300 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                    <CardTitle className="text-white group-hover:text-green-300 transition-colors">
                      شبكة المفاهيم التقنية
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      ربط المفاهيم والمصطلحات التقنية مع تعريفاتها الصحيحة لبناء شبكة معرفية متكاملة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      ابدأ الربط
                    </Button>
                  </CardContent>
                </Card>

                {/* Flappy Tech Game Card */}
                <Card
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-orange-900/50 to-amber-900/50 backdrop-blur-sm border-orange-500/30 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/25"
                  onClick={() => setCurrentGame("flappy")}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Cpu className="w-12 h-12 text-orange-400 group-hover:text-orange-300 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-pulse"></div>
                    </div>
                    <CardTitle className="text-white group-hover:text-orange-300 transition-colors">
                      مغامرة الكود الطائر
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      تحكم في الكود الطائر وتجنب العقبات لتحقيق أعلى النقاط في هذه المغامرة المثيرة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                      ابدأ المغامرة
                    </Button>
                  </CardContent>
                </Card>

                {/* Cyber Security Game Card */}
                <Card
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-red-900/50 to-rose-900/50 backdrop-blur-sm border-red-500/30 hover:border-red-400/50 hover:shadow-2xl hover:shadow-red-500/25"
                  onClick={() => setCurrentGame("cyber-security")}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Shield className="w-12 h-12 text-red-400 group-hover:text-red-300 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-pulse"></div>
                    </div>
                    <CardTitle className="text-white group-hover:text-red-300 transition-colors">
                      تحدي الأمن السيبراني
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      اختبر معرفتك في مجال الأمن السيبراني وحماية المعلومات من خلال سلسلة من التحديات
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white">
                      ابدأ التحدي
                    </Button>
                  </CardContent>
                </Card>

                {/* UI Design Game Card */}
                <Card
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/30 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/25"
                  onClick={() => setCurrentGame("ui-design")}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Layout className="w-12 h-12 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                      تصميم واجهات المستخدم
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      صمم واجهات مستخدم جميلة وتفاعلية باستخدام تقنيات السحب والإفلات
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      ابدأ التصميم
                    </Button>
                  </CardContent>
                </Card>

                {/* Leaderboard Card */}
                <Card
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-yellow-900/50 to-amber-900/50 backdrop-blur-sm border-yellow-500/30 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/25"
                  onClick={() => setCurrentGame("leaderboard")}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Trophy className="w-12 h-12 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full animate-pulse"></div>
                    </div>
                    <CardTitle className="text-white group-hover:text-yellow-300 transition-colors">
                      قاعة المتميزين
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      اعرض إنجازاتك وتنافس مع زملائك في الكلية لتحقيق أعلى النقاط والمراكز المتقدمة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white">
                      عرض الترتيب
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">{registeredName}</span>
                </div>
                <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/CODE-NAME-IN-B"
                        target="_blank"
                        rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                      >
                    <Github className="w-4 h-4" />
                        CODE-NAME-IN-B
                      </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      case "quiz":
        return <QuizGame onBack={() => setCurrentGame("menu")} playerName={registeredName} />
      case "matching":
        return <ConceptMatchingGame onBack={() => setCurrentGame("menu")} playerName={registeredName} />
      case "flappy":
        return <FlappyTechGame onBack={() => setCurrentGame("menu")} playerName={registeredName} />
      case "cyber-security":
        return <CyberSecurityGame onBack={() => setCurrentGame("menu")} playerName={registeredName} />
      case "ui-design":
        return <UIDesignGame onBack={() => setCurrentGame("menu")} playerName={registeredName} />
      case "leaderboard":
        return <Leaderboard onBack={() => setCurrentGame("menu")} />
    }
  }

  return <LeaderboardProvider>{renderGame()}</LeaderboardProvider>
}

export default TechEducationGames
